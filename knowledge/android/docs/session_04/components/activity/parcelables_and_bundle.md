---
id: android.component.activity.parcelables_and_bundle
title: Parcelables & Bundle
summary: Bundle là container key-value tự serialize nội dung thành Parcel để dữ liệu vượt qua biên giới giữa các component (qua Binder IPC); Parcelable là interface giúp một object tự đóng gói vào Parcel và mở gói ngược lại. Bài giải thích vì sao Android buộc phải serialize, khi nào dùng Bundle thay vì SharedViewModel, cách viết Parcelable thủ công và bằng @Parcelize, so sánh với Serializable, và giới hạn Binder transaction buffer dẫn tới TransactionTooLargeException.
status: published
difficulty: intermediate
depth: deep-dive
estimated_reading_time: 25 phút
tags: [android, parcelable, serializable, bundle, intent, ipc, binder, parcelize, savedstatehandle, viewmodel]
prerequisites: [android.component.activity.lifecycle, android.component.activity.state_changes, android.component.activity.task_and_backstack]
related: [android.intent.explicit, android.component.activity.state_changes]
learning_outcomes:
  - Giải thích được bản chất Bundle, cơ chế Binder IPC và vì sao Android buộc phải serialize dữ liệu khi truyền giữa các component.
  - Biết khi nào dùng Intent extras/Bundle và khi nào dùng SharedViewModel.
  - Triển khai được Parcelable thủ công và bằng @Parcelize để truyền object.
  - Phân biệt được Parcelable và Serializable về cơ chế và hiệu năng.
  - Xử lý được TransactionTooLargeException dựa trên giới hạn Binder transaction buffer.
knowledge_gap: >
  Không hiểu bản chất Bundle sẽ khiến developer truyền dữ liệu sai cách: dùng Serializable gây chậm, truyền object quá lớn gây TransactionTooLargeException crash ở production, hoặc dùng Bundle cho những thứ lẽ ra phải nằm trong SharedViewModel — vừa lãng phí vừa khó bảo trì. Cảm giác "truyền thế nào cũng được" sẽ phá vỡ kiến trúc khi app lớn lên.
---

# Parcelables & Bundle

## Vấn đề cần giải quyết

Bạn có một Activity A cần đưa dữ liệu cho Activity B. Bạn viết:

```kotlin
startActivity(Intent(this, DetailActivity::class.java).apply {
    putExtra("product_id", productId)
})
```

Nó chạy. Nhưng nếu bạn đưa nguyên cả object `Product` thay vì chỉ `product_id`, bạn bắt đầu gặp:

- **TransactionTooLargeException** — app crash ngay lúc `startActivity()` hoặc lúc `onSaveInstanceState()`.
- **Chậm khó hiểu** — code vẫn chạy nhưng Activity mới mở lâu, máy giật.
- **BadParcelableException / ClassNotFoundException** — object không serialize được hoặc thay đổi sau khi cài đặt.
- **Data mất khi xoay màn hình / process bị kill** — lưu state sai chỗ.

Câu hỏi cốt lõi của bài này không phải "dùng hàm nào", mà là:

> Vì sao Android buộc phải serialize dữ liệu khi truyền giữa các component? Khi nào Bundle là lựa chọn đúng, và khi nào SharedViewModel mới là câu trả lời?

## Sau khi học xong

- Giải thích được bản chất Bundle, cơ chế Binder IPC và vì sao Android buộc phải serialize dữ liệu khi truyền giữa các component.
- Biết khi nào dùng Intent extras/Bundle và khi nào dùng SharedViewModel.
- Triển khai được Parcelable thủ công và bằng @Parcelize để truyền object.
- Phân biệt được Parcelable và Serializable về cơ chế và hiệu năng.
- Xử lý được TransactionTooLargeException dựa trên giới hạn Binder transaction buffer.

## Bundle và Parcelable là gì?

**Bundle** là một container key-value (`Map`), có khả năng tự **serialize** (đóng gói thành byte) toàn bộ nội dung của nó sang dạng **Parcel** để vượt qua biên giới giữa các thành phần.

**Parcelable** là interface do Android thiết kế để một object tự biết cách "đóng gói" mình thành dữ liệu nhị phân (Parcel) và "mở gói" ngược lại. Nó tối ưu cho Binder IPC — không dùng reflection, không sinh object trung gian.

Mental model: Bundle là một **kiện hàng gửi qua bưu điện** (`system_server`). Thứ được gửi đi là kiện đã đóng gói, không phải chính món đồ: người nhận mở kiện và có một bản sao của riêng mình. Chỉ món đồ biết tự đóng gói (Parcelable) mới cho vào kiện được, và mỗi process chỉ có một kho trung chuyển sức chứa cố định, dùng chung cho mọi kiện đang trên đường đi (Binder transaction buffer).

## Cách hoạt động

### Bundle gửi bản sao, chỉ nhận kiểu đã đăng ký

Hai tính chất quyết định mọi thứ còn lại:

1. **Nó là bản sao (copy), không phải tham chiếu.** Bundle serialize dữ liệu thành byte rồi mới gửi đi. Activity B nhận một bản dữ liệu **độc lập** — sửa trong B không ảnh hưởng A, và ngược lại.
2. **Nó chỉ chấp nhận những kiểu đã được đăng ký.** Bạn không thể `putExtra()` một object bất kỳ — object đó phải implement `Parcelable` (hoặc `Serializable`).

Đây là lý do Android không cho truyền object trực tiếp như gọi hàm trong cùng process: nơi nhận dữ liệu **không đảm bảo nằm cùng process** với nơi gửi.

#### Nơi Bundle xuất hiện trong thực tế

| Vị trí | Vai trò |
|--------|---------|
| `Intent.putExtra()` | Truyền tham số khi `startActivity()` / `startService()` / gửi Broadcast |
| `Fragment.arguments` | Truyền tham số khi tạo Fragment (bắt buộc qua Bundle, không có constructor kèm data) |
| `onSaveInstanceState(outState)` | Lưu UI state để khôi phục khi Activity bị destroy |
| `SavedStateHandle` | ViewModel lưu state, sống sót qua process death |
| `rememberSaveable` (Compose) | Lưu state của composable vào cùng saved state Bundle; object tự định nghĩa cần `@Parcelize` hoặc `Saver` |

Ba dòng cuối là các API lưu state: chúng đều ghi vào saved state Bundle nên chịu chung giới hạn kích thước ở bài này. Chọn API nào cho loại dữ liệu nào ở [State Changes](state_changes.md), mục "Chọn công cụ nào? — Bản đồ quyết định".

### Vì sao phải serialize: Binder IPC

Câu trả lời nằm ở cách các component giao tiếp với nhau: **qua Binder IPC**.

Khi bạn gọi `startActivity()`, Activity A không tự gọi hàm của Activity B. Nó gửi yêu cầu cho **`system_server`** (một process riêng của hệ điều hành), và `system_server` quyết định khởi chạy Activity B trong app. Trong chuyến đi A → system_server → B này, dữ liệu phải được **đóng gói thành byte** để đi qua biên giới process:

```mermaid
sequenceDiagram
    participant A as Activity A (app process)
    participant Binder as Binder Transaction Buffer
    participant AMS as system_server (AMS)
    participant Target as Activity B (app process)

    A->>A: Intent + Bundle → serialize thành Parcel
    A->>Binder: ghi Parcel vào buffer (giới hạn ~1MB/process)
    A->>AMS: Binder IPC: "launch Activity B, đây là extras"
    AMS->>AMS: kiểm tra quyền, sắp xếp task
    AMS->>Target: Binder IPC: "onCreate, đây là extras"
    Target->>Target: deserialize Parcel → Bundle → đọc getStringExtra()
```
<!-- dd: parcel-binder -->

Chính vì phải đi qua biên giới này, dữ liệu:

- **Phải được serialize** — nên phải là kiểu đã biết cách serialize (`Parcelable`/`Serializable`).
- **Có giới hạn kích thước** — vì phải ghi vào buffer có giới hạn (~1MB cho toàn process).
- **Là bản sao** — byte được truyền đi, không phải reference.

Nếu Android đơn giản truyền reference như lời gọi hàm thông thường, nó sẽ phá vỡ mô hình "mỗi app là một process" — nền tảng bảo mật và ổn định của Android.

#### Ưu điểm của Bundle so với cách truyền trực tiếp

- **Hoạt động cả khi 2 component khác process** (2 app, app ↔ system) — vốn là thiết kế mặc định của Android.
- **Không tạo reference ngầm** — Bundle không giữ Activity cũ trong bộ nhớ, tránh memory leak.
- **Sống sót qua process death** — dữ liệu trong Bundle có thể được hệ thống lưu lại và trao lại khi Activity được tạo lại.

### Bundle hỗ trợ những kiểu dữ liệu nào

| Nhóm | Method tương ứng |
|------|------------------|
| Primitive | `putInt`, `putLong`, `putBoolean`, `putFloat`, `putDouble`, `putByte`, `putChar`, `putShort` |
| String | `putString`, `putCharSequence` |
| Array primitive | `putIntArray`, `putStringArray`, `putLongArray`, `putParcelableArray`... |
| List | `putStringArrayList`, `putIntegerArrayList`, `putParcelableArrayList` |
| Object | `putParcelable`, `putSerializable` |
| Bundle | `putBundle` (bundle lồng nhau) |

**Điểm mấu chốt:** để đưa một object vào Bundle, object đó phải implement `Parcelable` (hoặc `Serializable`, nhưng chậm hơn — xem phần so sánh bên dưới). Đây chính là lý do Topic này có hai nửa: **Bundle** (container) và **Parcelable** (khả năng đóng gói của object).

### Parcelable: object tự đóng gói vào Parcel

Hai khái niệm cần phân biệt:

- **`Parcel`** — vùng nhớ nhị phân chứa dữ liệu đã serialize. Là phương tiện vận chuyển.
- **`Parcelable`** — interface mà object implement để có khả năng tự viết/đọc vào/ra `Parcel`.

#### Ví dụ: viết Parcelable thủ công cho sản phẩm (để hiểu bản chất)

Một class `Parcelable` cần 3 phần: `writeToParcel()` (đóng gói), `describeContents()` (mô tả content), và `CREATOR` (mở gói):

```kotlin
class Product(
    val id: Long,
    val name: String,
    val price: Double
) : Parcelable {

    override fun writeToParcel(dest: Parcel, flags: Int) {
        dest.writeLong(id)
        dest.writeString(name)
        dest.writeDouble(price)
    }

    override fun describeContents(): Int = 0

    companion object {
        @JvmField
        val CREATOR = object : Parcelable.Creator<Product> {
            override fun createFromParcel(parcel: Parcel): Product =
                Product(
                    id = parcel.readLong(),
                    name = parcel.readString() ?: "",
                    price = parcel.readDouble()
                )

            override fun newArray(size: Int): Array<Product?> = arrayOfNulls(size)
        }
    }
}
```

**Quy tắc vàng:** thứ tự trong `writeToParcel` **phải khớp tuyệt đối** với thứ tự trong `createFromParcel`. Đây là nguồn gốc của rất nhiều bug khó tìm khi sửa model — bạn thêm một field nhưng quên sửa cả hai chỗ.

Nhược điểm rõ ràng: mỗi class phải viết ~20 dòng boilerplate, và dễ sai khi model thay đổi. Giải pháp cho Kotlin là `@Parcelize`.

### @Parcelize — cách viết Parcelable hiện đại

```kotlin
// build.gradle.kts
plugins {
    id("kotlin-parcelize")
}
```

```kotlin
@Parcelize
data class Product(
    val id: Long,
    val name: String,
    val price: Double,
    val tags: List<String>
) : Parcelable
```

Compiler sinh toàn bộ `writeToParcel` và `CREATOR` lúc build — không reflection, hiệu năng tương đương viết tay, nhưng không còn lỗi lệch thứ tự.

`@Parcelize` tự xử lý được: primitive, `String`, `Enum`, các class `Parcelable` lồng nhau, `List`/`Set`/`Map`/`Array` (với element là kiểu hỗ trợ).

#### Ví dụ: sự kiện có field kiểu `Date`

**Khi cần kiểu không hỗ trợ** (ví dụ `java.util.Date`), dùng `@TypeParceler`:

```kotlin
@Parcelize
data class Event(
    val name: String,
    @TypeParceler<Date, DateParceler>()
    val date: Date
) : Parcelable

object DateParceler : Parceler<Date> {
    override fun create(parcel: Parcel): Date = Date(parcel.readLong())
    override fun Date.write(parcel: Parcel, flags: Int) {
        parcel.writeLong(time)
    }
}
```

### Giới hạn kích thước — Binder Transaction Buffer

Đây là giới hạn mà đa số crash ngoài đời thực đến từ. Binder transaction buffer có **kích thước cố định, hiện là 1MB, dùng chung cho toàn bộ process** — không phải 1MB cho mỗi lần truyền.

#### Ba con số cần phân biệt

Các bài viết thường đưa ra nhiều ngưỡng khác nhau (1MB, 500KB, 50KB). Theo docs chỉ có một giới hạn cứng, hai con số còn lại là khuyến nghị:

| Con số | Là gì | Vượt thì sao |
|--------|-------|--------------|
| **1MB** | Giới hạn cứng của Binder transaction buffer, dùng chung cho mọi transaction đang diễn ra của process (`startActivity`, saved state, mọi lời gọi tới system service) | Ném `TransactionTooLargeException` |
| **Vài KB** | Khuyến nghị cho dữ liệu gửi qua Intent extras | Tăng nguy cơ chạm giới hạn 1MB |
| **Dưới 50KB** | Khuyến nghị cho saved state (`onSaveInstanceState`, `SavedStateHandle`, `rememberSaveable`), vì system process phải giữ bản này suốt thời gian người dùng còn quay lại được Activity, kể cả khi process của app đã bị kill | Tốn bộ nhớ hệ thống, serialize chậm trên main thread, tăng nguy cơ chạm giới hạn 1MB |

Không có ngưỡng 500KB nào trong docs. Khi thiết kế, hãy dùng hai con số khuyến nghị; con số 1MB chỉ giải thích vì sao app crash.

#### Hệ quả nghiêm trọng

Intent extras, `savedInstanceState`, Fragment arguments, và **mọi Binder transaction đang diễn ra đồng thời trong cùng process đều chia sẻ buffer này**. Một Bundle chỉ nằm trong bộ nhớ thì không chiếm buffer; nó chỉ tính vào buffer trong lúc đang được gửi qua Binder. Nghĩa là:

- Nhiều transaction chạy cùng lúc (ví dụ `startActivity()` trùng thời điểm saved state của một màn hình khác đang được gửi đi, hoặc nhiều lời gọi tới system service) có thể cộng lại vượt ngưỡng, dù từng transaction riêng lẻ không lớn.
- Crash thường bùng ra **không phải lúc bạn `putExtra()`**, mà lúc **Activity vừa xuống background và Bundle từ `onSaveInstanceState()` được gửi sang `system_server`** — rất khó reproduce ở development.

```kotlin
// ❌ Crash tiềm tàng — list hàng nghìn item qua Intent
intent.putParcelableArrayListExtra("all_products", ArrayList(thousandProducts))
// TransactionTooLargeException

// ✅ Đúng — chỉ truyền định danh, màn hình đích tự query
intent.putExtra("product_id", productId)
```

#### Cách phát hiện

Từ Android 7.0 (API 24), vượt giới hạn sẽ ném `TransactionTooLargeException` dạng runtime exception (app crash); các phiên bản trước chỉ log warning trong logcat. Vì vậy hãy chủ động đo kích thước Bundle khi debug:

```kotlin
override fun onSaveInstanceState(outState: Bundle) {
    super.onSaveInstanceState(outState)
    outState.putInt("scroll_position", scrollPosition)
    logBundleSize(outState) // helper debug
}

private fun logBundleSize(bundle: Bundle) {
    val parcel = Parcel.obtain()
    try {
        bundle.writeToParcel(parcel, 0)
        val size = parcel.dataSize()
        Log.d("BundleSize", "size = $size bytes")
    } finally {
        parcel.recycle()
    }
}
```

#### Cách fix

| Tình huống | Giải pháp |
|------------|-----------|
| List lớn truyền qua Intent | Chỉ truyền ID/query → màn hình đích tự load lại từ database/API |
| Bitmap trong Bundle | Lưu ra file, truyền URI/file path |
| RecyclerView nhiều item | Chỉ lưu `scroll_position` + điều kiện query, không lưu dữ liệu |
| Fragment arguments chứa data lớn | SharedViewModel scoped theo Activity |
| Ứng dụng cần chuyển khối dữ liệu lớn giữa 2 màn hình | Cơ chế khác: Repository / singleton / SavedStateHandle — không qua Bundle. Cache trong RAM (singleton) mất khi process bị kill, nên màn hình đích phải load lại được từ nguồn bền (Room, file) |

## Ví dụ thực tế

### Mở màn hình chi tiết sản phẩm từ danh sách

Tình huống chuẩn: app mua sắm, màn hình `ProductListScreen` mở `ProductDetailScreen`. Luồng chạy:

1. Model `Product` là `@Parcelize`: compiler sinh sẵn code đóng gói, nên `Product` là Parcelable và cho vào Bundle được.
2. `ProductListActivity` gọi `putExtra(EXTRA_PRODUCT, product)` rồi `startActivity()`: Bundle của Intent được serialize thành Parcel.
3. Parcel đi qua Binder transaction buffer tới `system_server` để xử lý launch. Nếu buffer dùng chung của process bị vượt, lời gọi ném `TransactionTooLargeException`.
4. `ProductDetailActivity` đọc extra bằng `getParcelableExtra()` (overload kèm `Class` từ API 33): Parcel được deserialize thành một object `Product` mới, độc lập với object bên gửi.
5. Màn hình đích chỉ dùng `id` để ViewModel load dữ liệu chi tiết.

Sơ đồ dưới vẽ đúng các bước trên theo tên node: (1) là nhánh `Product là Parcelable?`, (2) là `serialize thành Parcel`, (3) là `Binder Transaction Buffer` và hai nhánh của nó, (4) là `getParcelableExtra` → `deserialize`, (5) là node cuối.

```mermaid
flowchart TD
    A[ProductListActivity] -->|putExtra product Parcelable| B{Product là Parcelable?}
    B -->|Yes| C[serialize thành Parcel]
    B -->|No| D[Compiler error / BadParcelableException]
    C --> E[Binder Transaction Buffer]
    E -->|dưới 1MB| F[system_server xử lý launch]
    E -->|quá 1MB| G[TransactionTooLargeException - crash]
    F --> H[ProductDetailActivity]
    H --> I[getParcelableExtra Product::class]
    I --> J[deserialize Parcel về object]
    J --> K[ViewModel nhận id, load dữ liệu chi tiết]
```
<!-- dd: parcel-split-a -->
<!-- dd: parcel-split-b -->

Sơ đồ đơn giản hoá nhánh "dưới/quá 1MB": 1MB là sức chứa của cả buffer dùng chung, nên transaction này có thể crash dù nhỏ hơn 1MB nếu các transaction khác đang chiếm buffer (mục "Ba con số cần phân biệt").

Model là @Parcelize:

```kotlin
// data/model/Product.kt
// (1) Compiler sinh writeToParcel/CREATOR
@Parcelize
data class Product(
    val id: Long,
    val name: String,
    val price: Double,
    val imageUrl: String
) : Parcelable
```

Activity A gửi dữ liệu:

```kotlin
// ProductListActivity.kt
private fun openDetail(product: Product) {
    val intent = Intent(this, ProductDetailActivity::class.java).apply {
        putExtra(EXTRA_PRODUCT, product) // (2) Parcelable → tự serialize
    }
    startActivity(intent) // (3) Parcel đi qua Binder tới system_server
}

companion object {
    const val EXTRA_PRODUCT = "extra_product"
}
```

Activity B nhận dữ liệu (chú ý API version):

```kotlin
// ProductDetailActivity.kt
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // (4) Deserialize Parcel thành một Product mới
    val product: Product? = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        intent.getParcelableExtra(EXTRA_PRODUCT, Product::class.java)
    } else {
        @Suppress("DEPRECATION")
        intent.getParcelableExtra(EXTRA_PRODUCT)
    }

    product?.let { viewModel.loadDetail(it.id) } // (5)
}
```

> [!TIP]
> `getParcelableExtra()` (không có class) bị deprecated ở API 33. Luôn dùng overload kèm `Class` khi `minSdk >= 33`, và giữ branch cũ cho máy thấp hơn — hoặc gọi `IntentCompat.getParcelableExtra(intent, EXTRA_PRODUCT, Product::class.java)` của AndroidX Core để bỏ hẳn nhánh `if`.

**Kết quả:** `ProductDetailActivity` nhận một bản sao `Product` độc lập với object bên `ProductListActivity`; kiểm tra bằng cách log `product` trong `onCreate()` của màn hình đích, và đo kích thước Bundle bằng `logBundleSize()` ở mục "Cách phát hiện" nếu nghi ngờ extra quá lớn.

### Trả kết quả về màn hình trước

Chiều ngược lại (B trả kết quả về A, ví dụ địa chỉ giao hàng vừa chọn) dùng **Activity Result API**: A đăng ký `registerForActivityResult(ActivityResultContracts.StartActivityForResult())`, B gọi `setResult(RESULT_OK, Intent().putExtra(...))` rồi `finish()`. Kết quả cũng đi qua Bundle nên chịu cùng giới hạn kích thước.

## So sánh với các cách tiếp cận khác

### Bundle vs SharedViewModel — Khi nào dùng cái nào

Đây là lựa chọn kiến trúc quan trọng nhất khi truyền dữ liệu trong app MVVM. Không có "cái nào luôn đúng" — phụ thuộc quan hệ giữa 2 màn hình.

> [!IMPORTANT]
> SharedViewModel chỉ chia sẻ được giữa các màn hình dùng chung một `ViewModelStoreOwner`: các Fragment/destination trong **cùng một Activity** (hoặc cùng nav graph). Hai **Activity khác nhau không dùng chung được ViewModel**. Nếu A và B là hai Activity, dữ liệu đi qua Intent extras (gửi đi) và Activity Result API (trả về), hoặc cả hai cùng đọc một nguồn chung như Repository/Room.

| Tiêu chí | Bundle / Intent extras | SharedViewModel |
|----------|------------------------|-----------------|
| Dữ liệu | Bản sao (copy) | Tham chiếu (shared instance) |
| Vòng đời | Theo Activity mục tiêu | Theo scope (Activity / Fragment) |
| Process death | Sống sót (nếu dùng đúng cách) | Mất (trừ khi SavedStateHandle) |
| Kích thước | Buffer ~1MB dùng chung cả process; nên giữ vài KB | Không giới hạn theo bundle (nhưng là bộ nhớ RAM) |
| Phụ thuộc | Component không cần biết nhau về lifecycle | Phải cùng một Activity/Fragment scope |
| Khi quay lại màn hình cũ | State cũ được giữ nguyên qua backstack | Shared VM vẫn giữ state |

#### Khi nào dùng Bundle (Intent extras)

- **Màn hình B độc lập, không cần đồng bộ liên tục với A.** Ví dụ: mở màn hình chi tiết sản phẩm từ danh sách.
- **Dữ liệu là định danh (ID), query string, flag.** Nhỏ, đơn giản, không cần sống lâu.
- **Component có thể khác process** (gọi từ Notification, Shortcut, Deep Link) — lúc này SharedViewModel không tồn tại.

#### Khi nào dùng SharedViewModel

- **Hai màn hình cùng chia sẻ một nguồn dữ liệu "sống"** (đang load, đang cập nhật), ví dụ: màn hình danh sách → màn hình lọc cùng đọc `ProductFilterState` trong một `ProductListViewModel` scoped theo Activity.
- **Dữ liệu lớn** (list, bitmap, kết quả xử lý) — đưa vào Bundle là mời `TransactionTooLargeException`.
- **Cần đồng bộ hai chiều** — màn hình B đổi dữ liệu, màn hình A phản ứng ngay khi quay lại.
- **Fragment ↔ Fragment trong cùng Activity** — dùng ViewModel scoped theo Activity là pattern chuẩn, không nên đẩy qua Bundle.

#### Quyết định nhanh trong 30 giây

```text
Dữ liệu nhỏ (ID/flag/query) và B độc lập với A?
  └── ✅ Bundle / Intent extras + @Parcelize

Dữ liệu lớn, cần đồng bộ, hoặc A và B là Fragment cùng Activity?
  └── ✅ SharedViewModel

Cần sống sót khi process bị kill?
  └── ✅ Bundle (via SavedStateHandle hoặc onSaveInstanceState)
```

### Parcelable vs Serializable

`Serializable` là interface marker của Java — bạn chỉ cần `implements Serializable`, còn lại JVM dùng **reflection** để tự động quét toàn bộ field và serialize. Nghe có vẻ tiện, nhưng trên Android nó đắt:

| Tiêu chí | Serializable (Java) | Parcelable (Android) |
|----------|--------------------|----------------------|
| Cơ chế | Reflection (runtime) | Manual code / sinh lúc compile |
| Tốc độ | Chậm (~10x so với Parcelable) | Nhanh |
| Object tạm | Tạo nhiều object trung gian → GC pressure | Không |
| Boilerplate | Không cần | Nhiều nếu viết tay (nhưng @Parcelize xử lý) |
| Mục đích | Serialize để lưu trữ (disk, network) | Binder IPC giữa components |
| Kết quả serialize | Có versioning, nhiều metadata | Nhị phân gọn, không versioning |

```kotlin
// ❌ Đừng dùng Serializable để truyền giữa component — chậm, tạo GC pressure
data class User(val name: String) : Serializable

// ✅ Dùng Parcelable — nhanh, tối ưu cho IPC
@Parcelize
data class User(val name: String) : Parcelable
```

**Vậy Serializable dùng khi nào?** Khi cần lưu trữ lâu dài (ghi vào file, gửi qua mạng, cache) — ví dụ object đi qua Retrofit/Gson thường serialize bằng JSON, không phải Bundle. Trong truyền nội bộ Android, Parcelable luôn thắng.

Chiều ngược lại cũng cần nhớ: `Parcel` **không phải** cơ chế serialize đa dụng. Docs khuyến cáo không bao giờ ghi dữ liệu `Parcel` xuống đĩa hay gửi qua mạng, vì định dạng nhị phân của nó chỉ dành cho IPC và có thể khác nhau giữa các phiên bản.

## Khi nào nên và không nên dùng

### Nên dùng Bundle / Parcelable

- Truyền định danh, tham số nhỏ, flag khi mở Activity/Fragment/Service.
- Khởi tạo Fragment với `arguments` (luôn luôn — đây là cơ chế bắt buộc).
- Lưu state qua `onSaveInstanceState` / `SavedStateHandle` để sống sót qua process death.
- Component có thể được gọi từ ngoài app (Deep Link, Notification).

### Không nên dùng Bundle

- **Dữ liệu lớn** — docs khuyến nghị Intent extras chỉ ở mức vài KB và saved state dưới 50KB; vượt xa mức đó là nguy cơ TransactionTooLargeException.
- **Dữ liệu cần đồng bộ hai chiều giữa các màn hình** — dùng SharedViewModel.
- **Dữ liệu quan trọng cần lưu lâu dài** — dùng Room/DataStore, không phải Bundle (Bundle có thể bị mất nếu hệ thống kill process mà không lưu state).
- **Object có tham chiếu vòng hoặc nguồn tài nguyên nặng** (Connection, Handler, View) — không thể serialize.

## Sai lầm thường gặp

### 1. Truyền nguyên cả object thay vì ID

Đúng là object `Product` nhỏ có thể truyền qua Parcelable. Nhưng nếu object là một "aggregate" chứa cả list con, bitmap, hoặc dữ liệu mà màn hình đích cần load tươi từ nguồn, thì truyền ID và load lại luôn đúng hơn — đảm bảo dữ liệu mới nhất và tránh vượt buffer.

### 2. Dùng Serializable thay vì Parcelable

```kotlin
// ❌ data class User(val name: String) : Serializable
// ✅ @Parcelize data class User(val name: String) : Parcelable
```

### 3. Lệch thứ tự write/read trong Parcelable thủ công

```kotlin
// writeToParcel: id → name
// createFromParcel: name → id  ← BUG! dữ liệu tráo ngược
```

Nếu bạn đang dùng manual Parcelable, hãy cân nhắc chuyển sang `@Parcelize` để loại bỏ hẳn lớp lỗi này.

### 4. Quên xử lý nullable trong Parcelable thủ công

`readString()` trả null, còn `readInt()`/`readLong()` không xử lý null. Với manual, cần flag đánh dấu null. Với `@Parcelize`, nullable được xử lý tự động.

### 5. Lưu dữ liệu lớn vào savedInstanceState

```kotlin
// ❌ Sai — lưu cả danh sách sản phẩm vào Bundle
outState.putParcelableArrayList("products", ArrayList(allProducts))

// ✅ Đúng — ViewModel giữ dữ liệu, Bundle chỉ lưu state UI
outState.putString("search_query", currentQuery)
outState.putInt("selected_tab", selectedTabIndex)
```

### 6. Tin rằng SharedViewModel giải quyết được process death

SharedViewModel cũng là ViewModel nên mất khi process bị kill; dữ liệu cần sống qua process death phải đi qua `SavedStateHandle` hoặc Room. Chi tiết ở [State Changes](state_changes.md), mục "Khi nào dữ liệu bị mất? — 3 tình huống cần phân biệt".

### 7. Đọc extra bằng sai giao thức

```kotlin
// Bên gửi: Product là Parcelable
intent.putExtra(EXTRA_PRODUCT, product)

// ❌ Bên nhận đọc bằng getSerializableExtra: Bundle bắt ClassCastException,
// ghi cảnh báo sai kiểu vào logcat và trả về null. Không crash, nhưng dữ liệu "biến mất".
val wrong = intent.getSerializableExtra(EXTRA_PRODUCT)

// ✅ Bên nhận dùng cùng giao thức với bên gửi
val product = IntentCompat.getParcelableExtra(intent, EXTRA_PRODUCT, Product::class.java)
```

Lỗi này khó thấy vì app vẫn chạy: chỉ có màn hình hiện trống. Khi một extra luôn trả về `null`, kiểm tra logcat có dòng cảnh báo sai kiểu của `Bundle` không.

## Lịch sử phát triển

- **API 1 (Android 1.0):** `Bundle`, `Parcel`, `Parcelable` và `Intent.getParcelableExtra(String)` có từ API level đầu tiên; Intent extras dựa trên Bundle ngay từ đầu.
- **API 15 (Android 4.0.3):** thêm `TransactionTooLargeException`, exception báo Binder transaction không vừa buffer.
- **Android 7.0 (API 24):** vượt giới hạn buffer ném `TransactionTooLargeException` dạng runtime exception; các phiên bản trước chỉ log warning trong logcat.
- **Kotlin 1.4.20:** generator Parcelable tách khỏi `kotlin-android-extensions` (bị deprecated) sang plugin riêng `kotlin-parcelize`; annotation `@Parcelize` chuyển sang package `kotlinx.parcelize`.
- **Android 13 (API 33):** thêm overload type-safe `getParcelableExtra(String, Class)` và `getSerializableExtra(String, Class)`; overload không có `Class` bị deprecated.
- **AndroidX Core 1.10.0 (04/2023):** thêm `IntentCompat.getParcelableExtra(Intent, String, Class)`, cho dùng API type-safe trên mọi API level.

## Kết nối hệ thống

- **Tiên quyết:** [Activity Lifecycle](lifecycle.md), [Activity State Changes](state_changes.md) — nơi Bundle được dùng để lưu/khôi phục state, và [Task and Backstack](task_and_backstack.md) — ngữ cảnh Activity được tạo/hủy khi truyền Intent.
- **Liên quan:**
  - [Explicit Intents](../../intent/explicit_intents.md) — Intent là phương tiện vận chuyển Bundle.
  - [Push data and send event via Intent](../../intent/push_data_event.md) — các cách đưa dữ liệu vào Intent.
  - [Handle Intent](../../intent/handle_intent.md) — trích xuất extras và nhận kết quả bằng Activity Result API.
- **Học tiếp:**
  - 6.4 ViewModel (chưa có bài) — SavedStateHandle và cách dữ liệu Bundle đi vào ViewModel.
  - [FragmentManager](../fragment/fragment_manager.md) — Fragment arguments.

## Nguồn tham khảo

- [Parcelable and Bundle — Android Developers](https://developer.android.com/guide/components/activities/parcelables-and-bundles)
- [Parcelable — Android Developers Reference](https://developer.android.com/reference/android/os/Parcelable)
- [Bundle — Android Developers Reference](https://developer.android.com/reference/android/os/Bundle)
- [Parcel (API 1) — Android Developers Reference](https://developer.android.com/reference/android/os/Parcel)
- [Intent (getParcelableExtra, getSerializableExtra: API 1, overload kèm Class từ API 33) — Android Developers Reference](https://developer.android.com/reference/android/content/Intent)
- [IntentCompat — Android Developers Reference](https://developer.android.com/reference/androidx/core/content/IntentCompat)
- [Core release notes (1.10.0) — Android Developers](https://developer.android.com/jetpack/androidx/releases/core)
- [Get a result from an activity — Android Developers](https://developer.android.com/training/basics/intents/result)
- [TransactionTooLargeException — Android Developers Reference](https://developer.android.com/reference/android/os/TransactionTooLargeException)
- [Save UI states (giới hạn của saved state) — Android Developers](https://developer.android.com/topic/libraries/architecture/saving-states)
- [Pass data between destinations (Navigation Safe Args) — Android Developers](https://developer.android.com/guide/navigation/use-graph/pass-data)
- [ViewModel overview — Android Developers](https://developer.android.com/topic/libraries/architecture/viewmodel)
- [Parceler & TypeParceler — Kotlin Parcelize Docs](https://kotlinlang.org/docs/parcelize.html)
- [What's new in Kotlin 1.4.20 (plugin kotlin-parcelize) — Kotlin Docs](https://kotlinlang.org/docs/whatsnew1420.html)
