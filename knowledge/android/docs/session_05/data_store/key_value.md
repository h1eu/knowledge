---
id: android.data_store.key_value
title: Key-Value Storage (SharedPreferences & DataStore)
summary: Key-Value Storage lưu một lượng nhỏ dữ liệu đơn giản dạng cặp key → value trong một file riêng của app, nạp cả file vào RAM khi đọc lần đầu. Bài giải thích cơ chế bên trong SharedPreferences và DataStore, khi nào dùng mỗi loại, triển khai chuẩn MVVM + Hilt + Coroutine/Flow cho cả XML và Compose, cùng testing, security và migration.
status: published
difficulty: intermediate
depth: deep-dive
estimated_reading_time: 45 phút
tags: [android, datastore, shared-preferences, key-value, preferences-datastore, proto-datastore, hilt, mvvm, flow, coroutines]
prerequisites:
  - android.languages.kotlin
  - android.component.activity.lifecycle
  - android.session05.overview
related:
  - android.data_store.room_architecture
  - android.languages.kotlin
learning_outcomes:
  - Giải thích được bản chất Key-Value Storage và vị trí của nó trong hệ sinh thái lưu trữ Android.
  - Giải thích được cơ chế bên trong SharedPreferences (file XML nạp vào RAM, apply vs commit) và các rủi ro gây mất dữ liệu hoặc ANR.
  - Giải thích được cơ chế bên trong DataStore (file .preferences_pb, xử lý tuần tự, atomic write, Flow).
  - Phân biệt được SharedPreferences và DataStore, biết khi nào dùng và khi nào tránh key-value storage.
  - Triển khai được Preferences DataStore trong MVVM + Hilt + Coroutine/Flow, kèm mã hóa dữ liệu nhạy cảm, test trên JVM và migration từ SharedPreferences.
knowledge_gap: >
  Nắm sai bản chất SharedPreferences dẫn đến ANR khi file XML lớn, mất token khi process bị giết giữa chừng ghi apply(), lưu dữ liệu nhạy cảm dạng plaintext, khai báo nhiều DataStore trỏ cùng một file gây crash, và gọi edit không qua coroutine làm UI block.
---

# Key-Value Storage (SharedPreferences & DataStore)

## Vấn đề cần giải quyết

App của bạn có một nhóm dữ liệu rất nhỏ nhưng sống dai: token đăng nhập, username, cờ "đã xem hướng dẫn lần đầu", theme user chọn, số lần mở app, ngôn ngữ hiển thị. Những dữ liệu này:

- **Nhỏ** — vài byte đến vài KB, không phải hàng nghìn dòng.
- **Không cần truy vấn** — không bao giờ cần `WHERE`, `JOIN`, `ORDER BY`.
- **Cần tồn tại sau khi tắt app** — không được mất khi process bị giết.
- **Cần đọc ngay khi app khởi động** — ví dụ biết ngay user đã đăng nhập hay chưa để quyết định hiển thị màn hình nào.

Lưu bằng database (Room) thì quá nặng nề cho việc này. Lưu bằng file thủ công thì phải tự lo serialization, đồng bộ ghi, đọc lại. Lưu bằng biến trong bộ nhớ thì mất khi app bị giết.

> [!NOTE]
> Key-Value Storage giải quyết chính xác bài toán này: lưu **một lượng nhỏ dữ liệu dạng cặp khóa → giá trị (key → value)**, được hệ điều hành/framework lo phần ghi xuống ổ đĩa, tự khôi phục khi mở lại app.

## Sau khi học xong

- Giải thích được bản chất Key-Value Storage và vị trí của nó trong hệ sinh thái lưu trữ Android.
- Giải thích được cơ chế bên trong SharedPreferences (file XML nạp vào RAM, apply vs commit) và các rủi ro gây mất dữ liệu hoặc ANR.
- Giải thích được cơ chế bên trong DataStore (file .preferences_pb, xử lý tuần tự, atomic write, Flow).
- Phân biệt được SharedPreferences và DataStore, biết khi nào dùng và khi nào tránh key-value storage.
- Triển khai được Preferences DataStore trong MVVM + Hilt + Coroutine/Flow, kèm mã hóa dữ liệu nhạy cảm, test trên JVM và migration từ SharedPreferences.

## Key-Value Storage là gì?

Key-Value Storage là mô hình lưu trữ trong đó mỗi dữ liệu được xác định bằng một **key** (khóa, dạng String) duy nhất và lưu một **value** (giá trị) tương ứng:

```text
"user_token"   -> "eyJhbGciOiJIUzI1NiJ9..."
"first_launch" -> true
"theme"        -> "dark"
"launch_count" -> 12
```

Trên Android, toàn bộ các cặp key-value của một tập được lưu trong **một file riêng của app** (file XML với SharedPreferences, file `.preferences_pb` với DataStore).

**Mental model:** một `Map<String, giá trị đơn giản>` được chép xuống một file. Lần đọc đầu nạp cả file vào RAM, mỗi lần ghi lại ghi lại cả file. Mọi giới hạn của key-value (chỉ truy cập theo key, không lưu dữ liệu lớn) đều suy ra từ hình ảnh này.

## Cách hoạt động

### Các giải pháp Key-Value trong Android

Trong hệ sinh thái Android tồn tại ba giải pháp chính cho bài toán key-value:

1. **SharedPreferences** — giải pháp cổ điển, có từ API 1, vẫn hoạt động nhưng có nhiều hạn chế về mặt kỹ thuật.
2. **DataStore** (Preferences DataStore) — giải pháp hiện đại từ Jetpack, được Google khuyến nghị thay thế SharedPreferences, tích hợp sâu với coroutine và Flow.
3. **MMKV (Tencent)** — giải pháp bên thứ ba, hiệu năng rất cao nhờ memory-map, dùng khi cần tốc độ đọc/ghi cực nhanh (game, app nhạy hiệu năng).

Bài này tập trung vào hai cái đầu — là kiến thức chuẩn của lộ trình. MMKV được nhắc để bạn biết nó tồn tại khi gặp trong các dự án thực tế.

> [!NOTE]
> **Kiến thức dùng trước.** Phần DataStore dùng tối thiểu hai kiến thức của Session sau:
> - Coroutine (`suspend`, `launch`): chạy code bất đồng bộ không chặn main thread, học ở 8.4.3 Coroutines (chưa có bài).
> - `Flow`: luồng dữ liệu phát giá trị mới mỗi khi nguồn thay đổi, học ở 7.1.4.2 Flow (chưa có bài).

### Đặc điểm của mô hình key-value

- **Truy cập theo khóa**: muốn đọc dữ liệu phải biết key. Không có khái niệm tìm kiếm, sắp xếp, lọc.
- **Không có cấu trúc quan hệ**: không liên kết giữa các mục với nhau.
- **Giá trị đơn giản**: chỉ phù hợp kiểu dữ liệu nguyên thủy (String, Int, Long, Float, Boolean, Set\<String\>). Không phù hợp object phức tạp (muốn lưu object phải tự serialize sang String/JSON).
- **Toàn bộ được nạp vào bộ nhớ**: ở lần đọc đầu tiên, toàn bộ tập key-value được nạp từ đĩa vào RAM, sau đó truy cập trong RAM; mỗi lần ghi lại ghi lại toàn bộ file. Điều này nói lên lý do "không lưu dữ liệu lớn" — xem phần giới hạn.

### SharedPreferences hoạt động như thế nào?

#### Bản chất

SharedPreferences lưu toàn bộ dữ liệu trong **một file XML** nằm trong vùng private của app, tại đường dẫn:

```text
/data/data/<package_name>/shared_prefs/<tên_file>.xml
```

Ví dụ file `user_prefs.xml` thực tế trên đĩa:

```xml
<?xml version='1.0' encoding='utf-8' standalone='yes' ?>
<map>
    <string name="user_token">eyJhbGciOiJIUzI1NiJ9...</string>
    <boolean name="first_launch" value="true" />
    <string name="theme">dark</string>
    <int name="launch_count" value="12" />
</map>
```

#### Cơ chế hoạt động

```mermaid
flowchart TB
    subgraph App ["App"]
        A[Gọi getSharedPreferences] --> B[Singleton trong memory<br/>giữ toàn bộ map key-value]
        B --> C[Đọc: prefs.getString key]
        B --> D[Ghi: prefs.edit putX]
    end
    subgraph Disk ["Ổ đĩa"]
        F[File XML trên shared_prefs]
    end
    A -->|lần đầu: đọc toàn bộ file XML| F
    D -->|apply/commit: ghi lại toàn bộ file| F
    C -->|đọc từ memory, không chạm đĩa| B
```
<!-- dd: ds-sharedprefs -->

- **Lần đầu truy cập**: file XML được đọc toàn bộ, parse thành một `Map` trong bộ nhớ, giữ nguyên cho tới khi app chết. Mọi thao tác đọc sau đó **không chạm ổ đĩa** — chỉ đọc từ RAM. Đây là lý do đọc SharedPreferences nhanh nhưng **lần đầu tiên có thể chậm** nếu file to.
- **Ghi**: mọi thay đổi chỉ sửa trên bản `Map` trong RAM trước, sau đó mới quyết định ghi xuống đĩa qua `apply()` hoặc `commit()`.

#### apply() vs commit()

| Đặc điểm | `apply()` | `commit()` |
|---|---|---|
| Trả về | `void` — ghi không đồng bộ | `Boolean` — kết quả ghi thành công hay không |
| Thread | Ghi xuống đĩa trên một thread nền nội bộ (hàng đợi `QueuedWork`) | **Ghi ngay trên thread đang gọi**, chặn đến khi xong |
| Trạng thái bộ nhớ | Cập nhật bộ nhớ **ngay lập tức**, các đọc sau thấy giá trị mới | Cập nhật bộ nhớ ngay |
| Lỗi | Lỗi ghi đĩa không được báo | Trả `false` khi ghi thất bại |
| UI thread | Không chặn lúc gọi, **nhưng** các lần `apply()` chưa ghi xong sẽ **chặn main thread** khi Activity/Service chuyển trạng thái (start/stop) — nguồn ANR phổ biến | **Nguy hiểm** — nếu gọi trên UI thread sẽ block UI khi file lớn |

> [!TIP]
> **Nguyên tắc thực tế**: nếu buộc phải dùng SharedPreferences, ưu tiên `apply()` khi không cần kết quả ghi; chỉ dùng `commit()` (trên background thread) khi thực sự cần biết dữ liệu đã lên đĩa. `apply()` vẫn có thể gây ANR: framework chờ mọi lần ghi đang dở hoàn tất trước khi Activity/Service đổi trạng thái, và việc chờ này chạy trên main thread. Gọi `apply()` dày đặc với file lớn là công thức gây ANR — một lý do Google khuyên chuyển sang DataStore.

#### Ghi mất dữ liệu — vấn đề nghiêm trọng nhất

Với `apply()`, hệ thống ghi file XML trên background. Nếu **process của app bị giết ngay sau khi gọi `apply()`** (user giết app, crash, hệ thống thu hồi process), phần ghi đĩa chưa kịp hoàn thành thì dữ liệu mới **bị mất**, dù bộ nhớ đã có giá trị mới.

Điều này đặc biệt nguy hiểm với dữ liệu quan trọng như token, cờ trạng thái. DataStore ra đời có một trong những mục tiêu quan trọng nhất là loại bỏ rủi ro này — xem phần cơ chế transaction của DataStore.

#### Vì sao SharedPreferences "không an toàn" trong thế giới hiện đại

1. **Đọc chặn UI thread**: lần truy cập đầu tiên phải chờ đọc và parse xong toàn bộ file XML; việc parse chạy trên một thread nền của framework nhưng thread gọi `getX()` bị chặn trong lúc chờ — nếu là UI thread, app giật.
2. **Không hỗ trợ nhiều process**: docs ghi rõ SharedPreferences không hỗ trợ dùng chung giữa nhiều process; `OnSharedPreferenceChangeListener` chỉ báo thay đổi trong cùng process và phải tự giữ tham chiếu mạnh tới listener.
3. **Không an toàn khi nhiều nơi ghi cùng lúc**: hai `Editor` cùng ghi có thể ghi đè nhau.
4. **Không có type safety**: đọc sai kiểu (gọi `getString` với key đang lưu `Int`) ném `ClassCastException` lúc chạy — compiler không bắt được, lỗi chỉ lộ ra khi đúng nhánh code đó chạy.
5. **Ghi mất dữ liệu** khi process bị giết giữa chừng.
6. **Không tích hợp coroutine/Flow**: muốn lắng nghe thay đổi phải tự quản lý listener thủ công.

### DataStore hoạt động như thế nào?

DataStore là thư viện Jetpack của Google, thay thế SharedPreferences, được xây dựng trên **coroutine và Flow**:

- **Preferences DataStore**: lưu dạng key-value, gần giống SharedPreferences nhưng mạnh hơn.
- **Proto DataStore**: lưu dữ liệu có cấu trúc phức tạp hơn dùng Protocol Buffers (cần học ở bước nâng cao — bài này giới thiệu để bạn biết sự tồn tại).

```mermaid
flowchart TB
    DS[DataStore - Jetpack] --> PDS[Preferences DataStore<br/>key-value như SharedPreferences]
    DS --> PRDS[Proto DataStore<br/>Protocol Buffers, có schema]
```
<!-- dd: ds-types -->

#### Cơ chế hoạt động bên trong

DataStore lưu dữ liệu trong một file nhị phân tên là `*.preferences_pb` (Protocol Buffers), nằm tại:

```text
/data/data/<package_name>/files/datastore/user_prefs.preferences_pb
```

Khác biệt cốt lõi nằm ở cách ghi:

```mermaid
sequenceDiagram
    participant App as "App (bất kỳ coroutine)"
    participant DS as "DataStore (Singleton)"
    participant Worker as "Worker (coroutine tuần tự)"
    participant Disk as "File .preferences_pb"
    App->>DS: edit { prefs[KEY] = value }
    DS->>Worker: gửi tác vụ ghi vào hàng đợi
    Worker->>Disk: ghi file mới tạm (tối ưu)<br/>rồi rename thành file chính
    Worker-->>DS: thông báo xong
    DS-->>App: luồng Flow phát dữ liệu mới<br/>cho mọi collector
```
<!-- dd: ds-write -->

- **Đơn luồng xử lý (single actor)**: mọi tác vụ đọc ghi đều đi qua một coroutine duy nhất xử lý tuần tự. Hai tác vụ ghi đồng thời **không bao giờ** ghi đè nhau — cái sau chờ cái trước hoàn thành. Đây chính là thứ SharedPreferences không làm được.
- **Ghi an toàn (atomic write)**: DataStore ghi nội dung mới vào file tạm, sau đó **rename nguyên tử** (atomic rename) thành file chính. Nếu app bị giết giữa chừng, hoặc file hỏng vì bất kỳ lý do gì, file cũ vẫn nguyên vẹn — **không mất dữ liệu đã ghi trước đó**.
- **Đọc là Flow**: mỗi lần có thay đổi, toàn bộ collector nhận dữ liệu mới tự động. Không cần listener thủ công.
- **Chống hỏng file**: nếu DataStore phát hiện file hỏng khi đọc (corrupted), nó ném `IOException` — bạn bắt lỗi này và quyết định xóa file hỏng (xem phần triển khai).

#### Xử lý lỗi ghi khi app bị giết

```mermaid
flowchart TD
    A[App gọi edit ghi token] --> B[DataStore ghi file tạm]
    B --> C{Rename nguyên tử thành công?}
    C -->|Có| D[Dữ liệu an toàn trên đĩa]
    C -->|Không - app bị giết giữa chừng| E[File cũ vẫn nguyên vẹn<br/>không mất dữ liệu trước đó]
    E --> F[Lần chạy sau: đọc dữ liệu từ file cũ hợp lệ]
```
<!-- dd: ds-atomic -->

Đây là lý do DataStore không có vấn đề "ghi mất dữ liệu" như SharedPreferences `apply()` — thiết kế atomic rename đảm bảo hoặc là file mới hoàn chỉnh, hoặc file cũ còn nguyên. Không bao giờ có trạng thái "nửa file".

#### Preferences DataStore vs Proto DataStore

| Tiêu chí | Preferences DataStore | Proto DataStore |
|---|---|---|
| Cấu trúc | Key-value tự do, không khai báo schema | Có schema định nghĩa bằng `.proto` file |
| Type safety | Thấp (key tự khai báo, không kiểm tra kiểu toàn cục) | Cao (tự sinh code từ schema, đọc ghi đúng kiểu bắt buộc) |
| Phù hợp | Dữ liệu nhỏ, linh hoạt, ít thay đổi cấu trúc | Dữ liệu có cấu trúc cố định, cần versioning schema |
| Độ phức tạp | Thấp — học nhanh | Cao — phải học Protocol Buffers |
| Thay thế cho | SharedPreferences | Config phức tạp, model nhỏ |

> [!TIP]
> **Khuyến nghị**: 90% nhu cầu key-value của một app thương mại (token, setting, cờ trạng thái) dùng Preferences DataStore là đủ. Proto DataStore chỉ cân nhắc khi dữ liệu có cấu trúc nghiêm túc cần schema. Bài này đi sâu Preferences DataStore.

### So sánh SharedPreferences vs DataStore

| Tiêu chí | SharedPreferences | DataStore (Preferences) |
|---|---|---|
| Ghi mất dữ liệu | Có thể mất khi process bị giết | Không — atomic write |
| Ghi đồng thời | Không an toàn, dễ ghi đè | An toàn — tuần tự qua actor |
| Async | Blocking (`commit`) hoặc best-effort (`apply`) | Coroutine + Flow |
| Theo dõi thay đổi | Listener thủ công | Flow, UI tự cập nhật |
| Block UI thread | Có thể (lần đọc đầu) | Không |
| Type safety | Không | Không (key có kiểu nhưng không có schema; chỉ Proto DataStore mới đảm bảo type safety) |
| Hỗ trợ Google khuyến nghị | Cũ, không còn khuyến nghị | Hiện đại, được khuyến nghị |
| Hỗ trợ test | Khó (phụ thuộc Android) | Dễ (chạy trong JVM test) |
| File lưu trữ | XML | `.preferences_pb` (nhị phân) |

## Ví dụ thực tế

Bài toán chính là lưu phiên đăng nhập bằng Preferences DataStore, tách đúng tầng UI - ViewModel - Repository. Các bài toán sau dùng lại cùng các lớp đó: chống crash khi file hỏng, bảo vệ token, chuyển dữ liệu cũ từ SharedPreferences, test và debug.

> [!NOTE]
> **Kiến thức dùng trước.** Ngoài coroutine và `Flow` (đã ghi ở mục "Các giải pháp Key-Value trong Android"), ví dụ dùng tối thiểu:
> - `StateFlow` (`stateIn`, `collectAsStateWithLifecycle`): luồng giữ giá trị mới nhất để UI đọc, học ở 7.1.4.2 Flow (chưa có bài).
> - `ViewModel` (`viewModelScope`): giữ trạng thái của màn hình, học ở [ViewModel](../../session_06/viewmodel.md); cách tách UI - ViewModel - Repository học ở 7.2.3 MVVM (chưa có bài).
> - Hilt (`@Module`, `@Provides`, `@HiltViewModel`, `hiltViewModel()`): tự tạo và truyền dependency, học ở 7.1.5.3 Hilt (chưa có bài).
> - Jetpack Compose (`@Composable`): viết UI bằng Kotlin, xem [Jetpack Compose Overview](../../jetpack_compose_ui/overview.md).

### Lưu phiên đăng nhập: MVVM + Hilt + Coroutine/Flow

Bài toán: sau khi đăng nhập thành công, app lưu token; màn hình tự chuyển sang màn hình chính, và lần mở app sau vẫn biết user đã đăng nhập mà không cần đăng nhập lại.

Luồng chạy khi user đăng nhập xong:

1. UI gọi `viewModel.saveSession(token)`.
2. ViewModel mở coroutine bằng `viewModelScope.launch` và gọi `prefsRepository.saveToken(token)`.
3. Repository gọi `dataStore.edit { prefs[USER_TOKEN] = token }`.
4. DataStore ghi file mới rồi atomic rename thành `user_prefs.preferences_pb` (cơ chế ở mục "Xử lý lỗi ghi khi app bị giết"), sau đó báo xong.
5. DataStore phát dữ liệu mới qua `dataStore.data`; Repository `map` ra token.
6. Flow `userToken` của Repository emit token mới cho ViewModel.
7. ViewModel tính `isLoggedIn = (token != null)` = `true`; UI đang collect `isLoggedIn` nên render màn hình chính.

**Mô phỏng luồng dữ liệu khi đọc — Ghi token → UI cập nhật** (các mũi tên đi đúng thứ tự 7 bước trên, từ trên xuống):

```mermaid
sequenceDiagram
    participant UI as "LoginScreen (Compose/XML)"
    participant VM as LoginViewModel
    participant Repo as UserPreferencesRepository
    participant DS as DataStore
    participant File as user_prefs.preferences_pb

    UI->>VM: saveSession("abc123")
    VM->>Repo: viewModelScope.launch { saveToken }
    Repo->>DS: edit { prefs[USER_TOKEN] = "abc123" }
    DS->>File: ghi file mới + atomic rename
    File-->>DS: xong
    DS-->>Repo: phát dữ liệu mới qua Flow
    Repo-->>VM: userToken Flow emit "abc123"
    VM-->>UI: isLoggedIn = (token != null) = true<br/>UI render màn hình chính
```
<!-- dd: ds-login -->

**Điểm mấu chốt để hiểu**: bạn **không bao giờ tự gọi lại** để lấy dữ liệu sau khi ghi. Ghi xong, DataStore tự đẩy dữ liệu mới qua Flow, Flow qua Repository, `stateIn` cập nhật StateFlow, UI tự render. Đây là sức mạnh của DataStore so với SharedPreferences — với SharedPreferences bạn phải tự đọc lại và tự notify.

#### Thêm dependency

```kotlin
// app/build.gradle.kts
dependencies {
    implementation("androidx.datastore:datastore-preferences:1.1.1")

    // Đã có trong project dùng MVVM + Hilt:
    implementation("androidx.lifecycle:lifecycle-viewmodel-ktx:2.8.x")
    implementation("com.google.dagger:hilt-android:2.5x")
    kapt("com.google.dagger:hilt-compiler:2.5x")
}
```

> [!NOTE]
> **Lưu ý phiên bản**: kiểm tra phiên bản mới nhất tại [developer.android.com/jetpack/androidx/releases/datastore](https://developer.android.com/jetpack/androidx/releases/datastore). Code trong bài dùng `1.1.1` — là phiên bản ổn định phổ biến tại thời điểm viết.

#### Khai báo keys và DataStore

Tạo file `UserPreferences.kt` — nơi duy nhất định nghĩa tên file và toàn bộ keys:

```kotlin
package com.example.app.data.local

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

// Singleton DataStore cho toàn app — khai báo ở top-level, một lần duy nhất.
// Không để `private`: DataModule (file khác) cần import property này.
val Context.userDataStore: DataStore<Preferences> by preferencesDataStore(
    name = "user_prefs"
)

object PrefsKeys {
    val USER_TOKEN = stringPreferencesKey("user_token")
    val DARK_MODE = booleanPreferencesKey("dark_mode")
    val FIRST_LAUNCH = booleanPreferencesKey("first_launch")
}
```

> [!TIP]
> **Tip**: tên file `user_prefs` chỉ khai báo **một lần** ở cấp top-level. Khai báo lại `preferencesDataStore` với cùng tên ở nơi khác sẽ gây crash. Đây là lỗi phổ biến đầu tiên — xem phần Sai lầm thường gặp.

#### Repository — đọc ghi duy nhất một nơi

```kotlin
package com.example.app.data.repository

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import com.example.app.data.local.PrefsKeys
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

// Interface: ViewModel chỉ phụ thuộc vào đây, test thay bằng Fake
interface UserPreferencesRepository {
    val userToken: Flow<String?>
    val isDarkMode: Flow<Boolean>
    suspend fun saveToken(token: String)
    suspend fun setDarkMode(enabled: Boolean)
    suspend fun clearSession()
}

// Bản thật: nhận DataStore (không nhận Context) — dễ test trên JVM
class DataStoreUserPreferencesRepository(
    private val dataStore: DataStore<Preferences>
) : UserPreferencesRepository {
    // (5) Đọc — Flow: UI sẽ tự cập nhật khi dữ liệu đổi
    override val userToken: Flow<String?> = dataStore.data
        .map { prefs -> prefs[PrefsKeys.USER_TOKEN] }

    override val isDarkMode: Flow<Boolean> = dataStore.data
        .map { prefs -> prefs[PrefsKeys.DARK_MODE] ?: false }

    // (3) Ghi — suspend, gọi từ coroutine
    override suspend fun saveToken(token: String) {
        dataStore.edit { prefs ->
            prefs[PrefsKeys.USER_TOKEN] = token
        }
    }

    override suspend fun setDarkMode(enabled: Boolean) {
        dataStore.edit { prefs ->
            prefs[PrefsKeys.DARK_MODE] = enabled
        }
    }

    override suspend fun clearSession() {
        dataStore.edit { prefs ->
            prefs.remove(PrefsKeys.USER_TOKEN)
        }
    }
}
```

**Tại sao phải qua Repository mà không gọi DataStore trực tiếp trong ViewModel?**

- ViewModel không nên biết chi tiết "dữ liệu lưu ở đâu" (DataStore, Room, network). Repository là ranh giới này.
- Dễ test: khi test ViewModel, chỉ cần fake Repository, không cần DataStore thật.
- Khi đổi cơ chế lưu (DataStore → nơi khác), chỉ sửa Repository, ViewModel không đổi.

#### Hilt module — cung cấp DataStore và Repository

```kotlin
package com.example.app.di

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import com.example.app.data.local.userDataStore
import com.example.app.data.repository.DataStoreUserPreferencesRepository
import com.example.app.data.repository.UserPreferencesRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DataModule {

    @Provides
    @Singleton
    fun provideUserDataStore(
        @ApplicationContext context: Context
    ): DataStore<Preferences> = context.userDataStore

    @Provides
    @Singleton
    fun provideUserPreferencesRepository(
        dataStore: DataStore<Preferences>
    ): UserPreferencesRepository = DataStoreUserPreferencesRepository(dataStore)
}
```

> [!NOTE]
> **Lưu ý**: Repository chỉ phụ thuộc `DataStore<Preferences>` thay vì `Context` — giảm phụ thuộc, test JVM chỉ cần tạo một DataStore trỏ vào file tạm. `userDataStore` (extension property) chỉ được truy cập trong Hilt provider; mọi nơi khác nhận `DataStore` hoặc `UserPreferencesRepository` qua inject.

#### ViewModel — đọc bằng StateFlow, ghi bằng coroutine

```kotlin
package com.example.app.ui.login

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.app.data.repository.UserPreferencesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class LoginViewModel @Inject constructor(
    private val prefsRepository: UserPreferencesRepository
) : ViewModel() {

    // (6) Đọc: Flow từ DataStore -> StateFlow để UI observe
    val userToken: StateFlow<String?> = prefsRepository.userToken
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = null
        )

    // (7) Suy ra từ token đã lưu (một nguồn sự thật): mở lại app vẫn đúng trạng thái
    val isLoggedIn: StateFlow<Boolean> = prefsRepository.userToken
        .map { token -> token != null }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = false
        )

    fun saveSession(token: String) {
        viewModelScope.launch {
            prefsRepository.saveToken(token) // (2) DataStore phát token mới -> isLoggedIn tự thành true
        }
    }

    fun logout() {
        viewModelScope.launch {
            prefsRepository.clearSession()   // token bị xoá -> isLoggedIn tự thành false
        }
    }
}
```

#### UI — Jetpack Compose

```kotlin
@Composable
fun LoginScreen(viewModel: LoginViewModel = hiltViewModel()) {
    // (7) UI collect isLoggedIn, tự render lại khi giá trị đổi
    val isLoggedIn by viewModel.isLoggedIn.collectAsStateWithLifecycle()

    if (isLoggedIn) {
        HomeScreen()
    } else {
        LoginForm(
            // (1) đăng nhập xong -> lưu phiên
            onLoginClick = { token -> viewModel.saveSession(token) }
        )
    }
}
```

#### UI — XML (View hệ thống)

```kotlin
@AndroidEntryPoint // bắt buộc để Hilt cấp @HiltViewModel cho Activity
class LoginActivity : AppCompatActivity() {

    private val viewModel: LoginViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        // (7) Đọc token ngay khi mở app — quyết định màn hình nào.
        // repeatOnLifecycle: chỉ collect khi Activity ở STARTED, tự dừng khi xuống background
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.userToken.collect { token ->
                    if (token != null) {
                        startActivity(Intent(this@LoginActivity, HomeActivity::class.java))
                        finish()
                    }
                }
            }
        }
    }

    private fun onLoginClick(token: String) {
        viewModel.saveSession(token) // (1)
    }
}
```

> [!NOTE]
> **Chú ý thời điểm đọc**: với kiến trúc chuẩn, việc "mở app thấy màn hình nào" nên được quyết định ngay khi app khởi động (splash/logic trước khi render). Đọc `userToken` trong ViewModel và `collect` trong UI là cách chuẩn — không đọc đồng bộ trong `onCreate` kiểu cũ.

**Kết quả:** bấm đăng nhập thì `isLoggedIn` thành `true` và UI chuyển sang màn hình chính mà không có dòng code đọc lại nào; tắt hẳn app rồi mở lại, `isLoggedIn` lại thành `true` ngay khi DataStore đọc xong file `user_prefs.preferences_pb`; gọi `logout()` thì token bị xoá và UI quay về form đăng nhập.

### Chống crash khi file hỏng (IOException)

DataStore ném `IOException` khi file bị hỏng. Trong file dữ liệu key-value, xử lý chuẩn là **xóa file hỏng và đọc lại từ đầu**:

```kotlin
// Thay cho khai báo ở UserPreferences.kt (vẫn chỉ một khai báo duy nhất cho file này)
val Context.userDataStore: DataStore<Preferences> by preferencesDataStore(
    name = "user_prefs",
    corruptionHandler = ReplaceFileCorruptionHandler { exception ->
        // File hỏng -> trả Preferences trống, DataStore tự tạo lại
        emptyPreferences()
    }
)
```

Với trường hợp muốn giữ log để điều tra, xem [DataStore corruption handling](https://developer.android.com/topic/libraries/architecture/datastore#handling-corruption).

### Security — token và dữ liệu nhạy cảm

> [!IMPORTANT]
> **Nguyên tắc số một**: không bao giờ lưu **dữ liệu nhạy cảm dạng plaintext** vào SharedPreferences/DataStore thường.

Cấp độ xử lý tùy độ nhạy cảm:

1. **Không nhạy cảm** (theme, ngôn ngữ, cờ): DataStore thường.
2. **Nhạy cảm nhưng không tối mật** (token đăng nhập): mã hóa — dùng `EncryptedSharedPreferences` (thư viện `androidx.security:security-crypto`) hoặc tự mã hóa bằng Android Keystore rồi lưu ciphertext vào DataStore.
3. **Tối mật** (mật khẩu, khóa API, refresh token dài hạn): cân nhắc **không lưu trên thiết bị** hoặc dùng giải pháp bảo mật mạnh hơn (Keystore + mã hóa bất đối xứng, secure element).

Ví dụ cấu hình EncryptedSharedPreferences:

```kotlin
// Cần dependency: androidx.security:security-crypto
val masterKey = MasterKey.Builder(context)
    .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
    .build()

val encryptedPrefs = EncryptedSharedPreferences.create(
    context,
    "secure_prefs",
    masterKey,
    EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
    EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
)
```

> [!WARNING]
> **Lưu ý về security**: toàn bộ API của `security-crypto` (gồm `EncryptedSharedPreferences`, `MasterKey`) đã bị deprecate từ bản 1.1.0-alpha07 (9/4/2025) — xem [release notes](https://developer.android.com/jetpack/androidx/releases/security) và [thảo luận chính thức](https://issuetracker.google.com/issues/286337100) trước khi quyết định cho project mới. Hướng thay thế được khuyến nghị: mã hóa bằng Android Keystore trực tiếp, hoặc lưu token trong hệ thống xác thực riêng (ví dụ: credential của các dịch vụ như Firebase Auth).

Ngoài mã hóa, đừng quên: **tên key không nên chứa dữ liệu nhạy cảm** và **không log giá trị token** khi debug.

### Migration từ SharedPreferences sang DataStore

Google cung cấp `SharedPreferencesMigration` để chuyển dữ liệu tự động:

```kotlin
// Thay cho khai báo ở UserPreferences.kt (vẫn chỉ một khai báo duy nhất cho file này)
val Context.userDataStore by preferencesDataStore(
    name = "user_prefs",
    // Migration: đọc hết dữ liệu từ SharedPreferences cũ vào DataStore
    // rồi xóa file SharedPreferences cũ
    produceMigrations = { context ->
        listOf(
            SharedPreferencesMigration(context, "old_shared_prefs_name")
        )
    }
)
```

**Cách hiểu cơ chế**:

1. Lần đầu DataStore chạy, nó đọc toàn bộ file XML cũ (`old_shared_prefs_name.xml`).
2. Chuyển toàn bộ key-value sang file `.preferences_pb` mới.
3. Xóa file SharedPreferences cũ.
4. Từ đó, code mới đọc ghi hoàn toàn trên DataStore.

> [!TIP]
> **Tip migration thực tế**: nếu app đã phát hành và user đang có dữ liệu, migration tự động này là cách an toàn nhất — không cần viết code chuyển đổi thủ công. Kiểm tra kỹ trên bản build có dữ liệu cũ trước khi phát hành.

### Testing

#### Unit Test Repository với DataStore thật trên JVM

DataStore chạy được trong JVM test (không cần thiết bị) — đây là lợi thế lớn so với SharedPreferences:

```kotlin
class UserPreferencesRepositoryTest {

    private lateinit var dataStore: DataStore<Preferences>
    private lateinit var repository: UserPreferencesRepository

    @Before
    fun setUp() {
        // DataStore trỏ vào thư mục tạm — không đụng dữ liệu thật của app
        val tempDir = Files.createTempDirectory("datastore-test").toFile()
        dataStore = PreferenceDataStoreFactory.create(
            scope = CoroutineScope(UnconfinedTestDispatcher()),
            produceFile = { tempDir.resolve("test.preferences_pb") }
        )
        repository = DataStoreUserPreferencesRepository(dataStore)
    }

    @Test
    fun test_saveToken_saveAndReadBack() = runTest {
        repository.saveToken("abc123")

        val token = repository.userToken.first()
        assertEquals("abc123", token)
    }

    @Test
    fun test_clearSession_removesToken() = runTest {
        repository.saveToken("abc123")
        repository.clearSession()

        val token = repository.userToken.first()
        assertNull(token)
    }
}
```

> [!TIP]
> **Tip test**: `runTest` (từ `kotlinx-coroutines-test`) là cách chuẩn để test suspend function. `UnconfinedTestDispatcher` giúp DataStore chạy trong test scope thay vì scope mặc định.

#### Test ViewModel bằng fake Repository

```kotlin
// Fake hiện thực interface (class Kotlin mặc định là final, không kế thừa được)
class FakeUserPreferencesRepository : UserPreferencesRepository {
    private val _token = MutableStateFlow<String?>(null)
    private val _darkMode = MutableStateFlow(false)
    override val userToken: Flow<String?> = _token
    override val isDarkMode: Flow<Boolean> = _darkMode

    override suspend fun saveToken(token: String) { _token.value = token }
    override suspend fun setDarkMode(enabled: Boolean) { _darkMode.value = enabled }
    override suspend fun clearSession() { _token.value = null }
}

@OptIn(ExperimentalCoroutinesApi::class)
class LoginViewModelTest {
    // viewModelScope chạy trên Dispatchers.Main — trên JVM phải thay bằng test dispatcher
    @Before
    fun setUp() { Dispatchers.setMain(UnconfinedTestDispatcher()) }

    @After
    fun tearDown() { Dispatchers.resetMain() }

    @Test
    fun test_saveSession_updatesLoginState() = runTest {
        val vm = LoginViewModel(FakeUserPreferencesRepository())
        // WhileSubscribed: StateFlow chỉ chạy khi có subscriber -> tạo collector nền cho test
        backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) { vm.userToken.collect {} }
        backgroundScope.launch(UnconfinedTestDispatcher(testScheduler)) { vm.isLoggedIn.collect {} }

        vm.saveSession("abc123")

        assertEquals(true, vm.isLoggedIn.value)
        assertEquals("abc123", vm.userToken.value)
    }
}
```

### Debug — xem dữ liệu đã lưu

Trên thiết bị/máy ảo, dùng **Device File Explorer** trong Android Studio (View → Tool Windows → Device File Explorer):

```text
data/data/com.example.app/files/datastore/user_prefs.preferences_pb
data/data/com.example.app/shared_prefs/user_prefs.xml   (nếu còn SharedPreferences)
```

File `.preferences_pb` là nhị phân — không đọc được trực tiếp như XML. Cách debug hiệu quả:

- **Log tại nơi đọc**: log giá trị Flow phát ra khi thu thập (đừng log token thật trong production).
- **Bật logging DataStore** trong debug: thêm log trong `edit` block để xem dữ liệu đang ghi gì.
- **Kiểm tra qua app**: viết màn hình debug hiển thị toàn bộ key-value hiện có.

## So sánh với các cách tiếp cận khác

### Vị trí trong hệ sinh thái lưu trữ Android

| Giải pháp | Loại dữ liệu phù hợp | Có truy vấn? | Async? |
|---|---|---|---|
| Biến trong bộ nhớ (RAM) | Dữ liệu tạm trong phiên chạy | Không | Không |
| SharedPreferences | Key-value nhỏ | Không | Không (blocking) |
| DataStore | Key-value nhỏ | Không | Có (Flow, suspend) |
| Room (SQLite) | Dữ liệu có cấu trúc, quan hệ, số lượng lớn | Có | Có |
| File / CacheDir | Nội dung thô: ảnh, JSON lớn, PDF | Không | Tùy |

Nguyên tắc chọn: **dữ liệu càng có cấu trúc và càng lớn thì càng phải đi xuống phía dưới bảng**. Key-value chỉ thích hợp hàng trên cùng.

## Khi nào nên và không nên dùng

### Nên dùng Key-Value Storage

- Token đăng nhập, refresh token (đã mã hóa — xem phần Security).
- Cài đặt UI: theme sáng/tối, ngôn ngữ, cỡ chữ.
- Cờ trạng thái: đã xem onboarding, đã tặng quà lần đầu.
- Bộ đếm nhỏ: số lần mở app, lần đánh giá gần nhất.
- Cache nhỏ không quan trọng: câu trả lời cuối của một trường nhập.

### Không nên dùng Key-Value Storage

- **Dữ liệu lớn**: toàn bộ file được nạp vào RAM và ghi lại nguyên file mỗi lần sửa — lưu 10MB vào DataStore sẽ làm app chậm. > 100KB-1MB nên cân nhắc Room hoặc file.
- **Dữ liệu cần truy vấn**: tìm kiếm, sắp xếp, lọc — đó là việc của Room.
- **Dữ liệu quan hệ**: giỏ hàng, danh sách đơn hàng.
- **Dữ liệu nhạy cảm ở dạng plaintext**: mật khẩu, token không mã hóa — phải dùng EncryptedSharedPreferences hoặc Keystore (xem Security).
- **Dữ liệu chỉ cần trong phiên làm việc**: không cần bền vững thì để RAM (ViewModel, cache layer).

## Sai lầm thường gặp

### 1. Khai báo `preferencesDataStore` nhiều lần với cùng tên file

```kotlin
// SAI — crash: "There are multiple DataStores active for the same file"
private val Context.userDataStore: DataStore<Preferences> by preferencesDataStore(name = "user_prefs")
private val Context.userDataStore2: DataStore<Preferences> by preferencesDataStore(name = "user_prefs")
```

**Đúng**: khai báo một lần duy nhất ở top-level (như phần triển khai), mọi nơi khác inject qua Hilt.

### 2. Gọi `edit` trên UI thread mà không qua coroutine

```kotlin
// SAI — suspend function gọi ngoài coroutine sẽ không compile được
fun save(token: String) {
    dataStore.edit { it[KEY] = token }   // Compile error: suspend function
}

// ĐÚNG — luôn chạy trong viewModelScope / lifecycleScope
fun save(token: String) {
    viewModelScope.launch {
        dataStore.edit { it[KEY] = token }
    }
}
```

### 3. Đọc dữ liệu bằng `.first()` ở nhiều nơi thay vì observe Flow

Nếu bạn cần "đọc một lần", `.first()` là hợp lệ — nhưng nếu bạn dùng nó để đồng bộ UI sau khi ghi, bạn sẽ rơi vào bug "UI không cập nhật". Luôn ưu tiên `collect`/`stateIn`.

### 4. Lưu object lớn vào key-value bằng cách serialize JSON

```kotlin
// SAI — gói nguyên 1 model lớn vào key-value
prefs[USER_PROFILE] = Gson().toJson(largeProfileObject)

// ĐÚNG — dữ liệu có cấu trúc lớn phải dùng Room
```

### 5. Quên xử lý IOException khi đọc

```kotlin
// SAI — không chống crash khi file hỏng
val token = dataStore.data.map { it[KEY] }.first()

// ĐÚNG — bắt IOException (file hỏng) hoặc dùng corruptionHandler
try {
    val token = dataStore.data.map { it[KEY] }.first()
} catch (e: IOException) {
    Log.e(TAG, "DataStore corrupt", e)
}
```

### 6. Lưu mật khẩu/token dạng plaintext

Đã trình bày ở phần Security — lưu plaintext token là lỗ hổng nghiêm trọng, app bị audit bảo mật sẽ bị từ chối.

**Cách sửa:** chọn cách lưu theo cấp độ nhạy cảm ở mục "Security — token và dữ liệu nhạy cảm": mã hoá token trước khi lưu, dữ liệu tối mật thì cân nhắc không lưu trên thiết bị.

### 7. Giữ SharedPreferences cũ "chỉ để đỡ phải đổi"

Project mới luôn dùng DataStore. Project cũ: migration dần (xem mục "Migration từ SharedPreferences sang DataStore"), không xây thêm code mới trên SharedPreferences.

## Lịch sử phát triển

- **API 1:** `SharedPreferences` cùng `SharedPreferences.Editor` và `commit()` có từ phiên bản Android đầu tiên.
- **API 9 (Android 2.3):** thêm `Editor.apply()`, ghi vào bộ nhớ ngay và ghi xuống đĩa bất đồng bộ, không báo lỗi.
- **API 11:** thêm `Editor.putStringSet()`, kiểu `Set<String>` trong danh sách giá trị đơn giản ở đầu bài.
- **API 23:** `Context.MODE_MULTI_PROCESS` bị deprecated vì không hoạt động ổn định trên một số phiên bản và không có cơ chế hoà giải ghi đồng thời giữa các process; docs khuyên dùng cách quản lý dữ liệu liên process rõ ràng như `ContentProvider`.
- **05/2019 (security-crypto 1.0.0-alpha01):** ra mắt `EncryptedSharedPreferences`, tự mã hoá cả key lẫn value của SharedPreferences; bản 1.0.0 stable phát hành 21/04/2021.
- **02/09/2020 (DataStore 1.0.0-alpha01):** Jetpack DataStore ra đời với mục tiêu thay thế SharedPreferences, xây trên coroutine và Flow, gồm hai bản Preferences DataStore và Proto DataStore.
- **01/2021 (DataStore 1.0.0-alpha06):** `preferencesKey<T>()` được thay bằng các hàm theo kiểu (`intPreferencesKey`, `stringPreferencesKey`…) dùng trong bài.
- **24/02/2021 (DataStore 1.0.0-alpha07):** property delegate khai báo ở top-level thay cho `Context.createDataStore`; DataStore bắt đầu ném exception khi có nhiều DataStore cùng hoạt động trên một file (sai lầm số 1).
- **04/08/2021 (DataStore 1.0.0):** bản stable đầu tiên.
- **17/04/2024 (DataStore 1.1.0):** hỗ trợ nhiều process cùng truy cập một file (kèm quan sát thay đổi giữa các process), interface `Storage` để tuỳ biến cách lưu, và dùng được trong Kotlin Multiplatform.
- **09/04/2025 (security-crypto 1.1.0-alpha07):** deprecate toàn bộ API, khuyên dùng API của nền tảng và Android Keystore trực tiếp; bản 1.1.0 stable (30/07/2025) giữ trạng thái deprecated này.
- **10/2026:** bản DataStore stable mới nhất khi rà soát bài là 1.3.0 (21/10/2026); ví dụ trong bài vẫn dùng 1.1.1.

Vì sao thiết kế đổi như vậy: các hạn chế ở mục "Vì sao SharedPreferences "không an toàn" trong thế giới hiện đại" nằm ngay trong API (đọc ghi đồng bộ, `apply()` không báo lỗi, không dùng được giữa nhiều process), nên Google làm thư viện mới thay vì vá SharedPreferences. Theo release notes, DataStore lưu dữ liệu bất đồng bộ, nhất quán và theo transaction để khắc phục phần lớn nhược điểm của SharedPreferences.

## Kết nối hệ thống

### Vị trí trong hệ thống (System Thinking)

Key-Value Storage không tồn tại độc lập — nó là một phần của **Data Layer** trong kiến trúc MVVM/Clean Architecture:

```mermaid
flowchart TB
    subgraph UI_Layer ["Presentation Layer"]
        UI[Activity / Composable]
        VM[ViewModel]
    end
    subgraph Domain ["Domain Layer"]
        UC[UseCase]
    end
    subgraph Data ["Data Layer"]
        REPO[Repository Interface]
        IMPL[RepositoryImpl]
        KV[Key-Value Storage<br/>SharedPreferences / DataStore]
        ROOM[Room Database]
        NET[Remote API]
    end
    UI --> VM --> UC --> REPO --> IMPL
    IMPL --> KV
    IMPL --> ROOM
    IMPL --> NET
```
<!-- dd: ds-arch -->

Vai trò của nó trong tổng thể:

- **Lưu dữ liệu phiên & cấu hình**: token, session, setting — dữ liệu mà mọi UseCase cần biết khi xử lý nghiệp vụ (ví dụ: UseCase gọi API cần kèm token).
- **Cache nhanh**: dữ liệu không quan trọng được đọc nhanh hơn network gấp nhiều lần — giúp app phản hồi ngay cả khi offline.
- **Tách khỏi UI**: ViewModel không bao giờ đụng trực tiếp DataStore — mọi thứ qua Repository. Khi đổi cơ chế lưu trữ, UI và ViewModel không đổi.

Tương tác với các tầng khác: Data Layer cung cấp `Flow` cho ViewModel; ViewModel biến thành `StateFlow` cho UI. Đây là luồng dữ liệu một chiều chuẩn MVVM — điều mà SharedPreferences (callback, thiếu Flow) không hỗ trợ tự nhiên.

### Topic liên quan

- **Tiên quyết:**
  - [Kotlin](../../session_01/languages/kotlin.md): ngôn ngữ của mọi ví dụ trong bài.
  - [Activity Lifecycle](../../session_04/components/activity/lifecycle.md): `apply()` chặn main thread đúng lúc Activity/Service đổi trạng thái; `repeatOnLifecycle(STARTED)` trong ví dụ XML.
  - [Session 05 Overview](../overview.md): vị trí của key-value giữa các cách lưu dữ liệu trong Session 05.
- **Liên quan:**
  - [File Permissions](../../session_02/file_permissions.md), mục "Android sandbox: mỗi app là một user Linux": vì sao `/data/data/<package_name>/` là vùng private của app, nơi chứa cả `shared_prefs/` lẫn `files/datastore/`.
  - [Working with Thread](../working_with_thread.md): main thread và ANR, gốc của rủi ro khi SharedPreferences đọc lần đầu hoặc chờ `apply()` trên UI thread.
  - [Content Provider](../../session_04/components/content_provider.md): cách chia sẻ dữ liệu giữa các process mà docs khuyên thay cho `MODE_MULTI_PROCESS`.
- **Học tiếp:**
  - [5.1.2 Relational Database (Room Architecture)](room_architecture.md) — khi dữ liệu không còn là key-value mà cần truy vấn.
  - [ViewModel](../../session_06/viewmodel.md) — cách quản lý StateFlow/Flow trong vòng đời ViewModel, `stateIn` chi tiết.
  - 7.2.3 MVVM và 7.2.5 Clean Architecture (chưa có bài) — chuẩn hóa Data Layer, Repository pattern sâu hơn.
  - 8.4.3 Coroutines và 7.1.4.2 Flow (chưa có bài) — hiểu sâu actor, channel, cách Flow hoạt động bên trong.
  - 7.1.5.3 Hilt (chưa có bài) — cách Hilt cấp `DataStore` và Repository dạng Singleton như `DataModule`.
  - [Unit Testing](../../coding_analyst_and_testing/unit_testing.md) — viết test cho Repository và ViewModel như phần Testing.
  - **Proto DataStore** — nâng cao khi cần schema nghiêm túc.

## Nguồn tham khảo

- [DataStore — Android Developers](https://developer.android.com/topic/libraries/architecture/datastore)
- [DataStore releases (1.0.0-alpha01, alpha06, alpha07, 1.0.0, 1.1.0, 1.3.0) — Android Developers](https://developer.android.com/jetpack/androidx/releases/datastore)
- [Preferences DataStore — Android Developers](https://developer.android.com/topic/libraries/architecture/datastore#preferences-datastore)
- [DataStore corruption handling — Android Developers](https://developer.android.com/topic/libraries/architecture/datastore#handling-corruption)
- [SharedPreferences — Android Developers](https://developer.android.com/reference/android/content/SharedPreferences)
- [SharedPreferences.Editor (commit API 1, apply API 9, putStringSet API 11) — Android Developers](https://developer.android.com/reference/android/content/SharedPreferences.Editor)
- [Context.MODE_MULTI_PROCESS (deprecated API 23) — Android Developers](https://developer.android.com/reference/android/content/Context#MODE_MULTI_PROCESS)
- [SharedPreferencesImpl.java (đọc file trên thread nền, `awaitLoadedLocked()` chặn thread gọi) — Android Open Source Project](https://android.googlesource.com/platform/frameworks/base/+/refs/heads/main/core/java/android/app/SharedPreferencesImpl.java)
- [Data and file storage overview — Android Developers](https://developer.android.com/training/data-storage)
- [Hilt dependency injection — Android Developers](https://developer.android.com/training/dependency-injection/hilt-android)
- [Testing coroutines — Kotlin](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-test/)
- [security-crypto issue tracker — Google](https://issuetracker.google.com/issues/286337100)
- [SharedPreferences.Editor#apply() — Android Developers](https://developer.android.com/reference/android/content/SharedPreferences.Editor#apply())
- [Security library releases (security-crypto 1.0.0-alpha01, 1.0.0, 1.1.0-alpha07, 1.1.0) — Android Developers](https://developer.android.com/jetpack/androidx/releases/security)
- [Visibility modifiers — Kotlin](https://kotlinlang.org/docs/visibility-modifiers.html)
