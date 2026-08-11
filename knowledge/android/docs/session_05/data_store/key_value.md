---
title: Key-Value Storage (SharedPreferences & DataStore)
summary: So sánh SharedPreferences cũ và Jetpack DataStore mới. Hiểu nguyên nhân gây ra ANR khi lưu dữ liệu và cách triển khai an toàn với Kotlin Flow trong MVVM.
authors:
  - AI Assistant
date: 2026-07-30
---

# Lưu trữ Key-Value: SharedPreferences vs DataStore

## Vấn đề cần giải quyết

Trong mọi ứng dụng, bạn luôn cần lưu lại những cấu hình nhỏ nhắn để khi người dùng mở lại app, mọi thứ vẫn như cũ. Ví dụ:
- Ghi nhớ trạng thái Đăng nhập (Lưu Auth Token).
- Cài đặt Dark Mode / Light Mode.
- Lần đầu mở app chưa (để show màn hình Onboarding).

Những dữ liệu này quá nhỏ và cấu trúc quá đơn giản (chỉ gồm `Key` (Tên) và `Value` (Giá trị)), nếu tạo cả một Database (SQLite/Room) thì như "dùng dao mổ trâu giết gà", vừa nặng nề vừa chậm.

Giải pháp chuẩn cho bài toán này là lưu trữ Key-Value (File XML hoặc File PB dưới hệ thống).

## SharedPreferences (Quá khứ) vs DataStore (Tương lai)

Suốt hơn 10 năm, Android dùng `SharedPreferences`. Nó lưu dữ liệu vào một file XML (ví dụ: `com.myapp_preferences.xml`). Tuy nhiên, nó chứa quá nhiều nhược điểm chí mạng khiến Google phải tạo ra `Jetpack DataStore` để thay thế.

### Vì sao SharedPreferences bị "ghẻ lạnh"?

1. **Gây lỗi ANR (Application Not Responding):** Mặc dù bạn dùng `apply()` để lưu dữ liệu bất đồng bộ ở background thread, nhưng khi Activity/Service chuẩn bị bị kill, Android OS sẽ ép hàm `apply()` phải hoàn thành xong xuôi trên **Main Thread**. Nếu file XML lớn, Main Thread bị block -> ANR.
2. **Không Type-Safe:** Bạn lưu một số `Int` (tuổi = 25), lúc lấy ra bạn vô tình gõ nhầm hàm `getString("tuổi")` -> Crash ngay lập tức với `ClassCastException`.
3. **Không có cơ chế báo lỗi:** Nếu việc lưu file XML xuống đĩa bị lỗi (đầy bộ nhớ), SharedPreferences âm thầm im lặng. Lần sau mở app ra, dữ liệu đã bay màu mà bạn không biết lý do.

### Jetpack DataStore giải quyết thế nào?

1. **Bất đồng bộ 100% với Coroutines & Flow:** Đọc/Ghi dữ liệu không bao giờ block Main Thread. Không còn nỗi lo ANR.
2. **An toàn kiểu dữ liệu (Type-Safe):** Có 2 loại DataStore. `Preferences DataStore` (dùng key-value giống cũ nhưng an toàn hơn) và `Proto DataStore` (dùng Protocol Buffers, định nghĩa rõ ràng kiểu dữ liệu, bắt lỗi ngay lúc code).
3. **Báo lỗi rõ ràng:** Bắt được các lỗi `IOException` khi thao tác với file.

> [!CAUTION]
> **Quyết định kiến trúc:** Nếu bạn bắt đầu một project mới, hãy **CẤM** sử dụng `SharedPreferences`. Hãy dùng `Preferences DataStore` ngay từ đầu. Nếu project cũ đang dùng SharedPrefs, Google hỗ trợ tool để Migrate (Chuyển đổi) trực tiếp sang DataStore vô cùng dễ dàng.

## Hướng dẫn triển khai (MVVM + Coroutines Flow)

Chúng ta sẽ viết một tính năng nhỏ: Lưu Token đăng nhập và Trạng thái Dark Mode bằng `Preferences DataStore`.

### 1. Cài đặt thư viện (build.gradle)
```groovy
implementation "androidx.datastore:datastore-preferences:1.0.0"
```

### 2. Khởi tạo DataStore an toàn (Top-level)
Khuyến cáo từ Google: Không bao giờ khởi tạo 2 instance của DataStore trỏ về cùng một file, sẽ dẫn đến crash hoặc dữ liệu ghi đè sai. Tốt nhất là tạo nó như một biến top-level hoặc dùng Dependency Injection (Dagger/Hilt) để đảm bảo nó là Singleton.

```kotlin
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore

// Top-level property (Nằm ngoài class)
val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")
```

### 3. Tạo Repository bọc DataStore lại

Trong MVVM, ViewModel không được thao tác trực tiếp với Database hay DataStore. Hãy tạo một Repository.

```kotlin
class SettingsRepository(private val context: Context) {

    // Khai báo các Keys
    private val AUTH_TOKEN_KEY = stringPreferencesKey("auth_token")
    private val DARK_MODE_KEY = booleanPreferencesKey("dark_mode")

    // ĐỌC DỮ LIỆU (Trả về Flow - lắng nghe realtime)
    val authTokenFlow: Flow<String?> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) {
                emit(emptyPreferences()) // Nếu lỗi file, trả về rỗng thay vì crash
            } else {
                throw exception
            }
        }
        .map { preferences ->
            // Lấy giá trị ra, null nếu chưa từng lưu
            preferences[AUTH_TOKEN_KEY]
        }

    val darkModeFlow: Flow<Boolean> = context.dataStore.data
        .map { preferences ->
            preferences[DARK_MODE_KEY] ?: false // Mặc định là false
        }

    // GHI DỮ LIỆU (Phải là suspend function vì thao tác IO)
    suspend fun saveAuthToken(token: String) {
        context.dataStore.edit { preferences ->
            preferences[AUTH_TOKEN_KEY] = token
        }
    }

    suspend fun setDarkMode(isEnabled: Boolean) {
        context.dataStore.edit { preferences ->
            preferences[DARK_MODE_KEY] = isEnabled
        }
    }
}
```

### 4. Sử dụng trong ViewModel

ViewModel chỉ cần `collect` cái Flow từ Repository. Khi dữ liệu dưới DataStore bị thay đổi (bởi bất kỳ ai), Flow sẽ tự động đẩy dữ liệu mới lên ViewModel -> UI tự động cập nhật. Không cần phải gọi hàm "refresh" thủ công!

```kotlin
class SettingsViewModel(
    private val repository: SettingsRepository
) : ViewModel() {

    // UI chỉ cần observe StateFlow này
    val isDarkMode = repository.darkModeFlow
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = false
        )

    fun toggleDarkMode(currentValue: Boolean) {
        viewModelScope.launch {
            repository.setDarkMode(!currentValue)
        }
    }
}
```

## Bonus: Migrate từ SharedPreferences sang DataStore

Nếu app bạn đang có file SharedPrefs cũ tên là `user_prefs`, bạn chỉ cần khai báo như sau, DataStore sẽ **tự động bê toàn bộ dữ liệu** từ SharedPrefs cũ sang file mới của DataStore ở lần chạy đầu tiên, sau đó nó xóa file SharedPrefs cũ đi.

```kotlin
val Context.dataStore by preferencesDataStore(
    name = "settings",
    produceMigrations = { context ->
        listOf(SharedPreferencesMigration(context, "user_prefs"))
    }
)
```

## Tổng kết

Key-Value Storage sinh ra để giải quyết các cấu hình nhỏ gọn. Hãy nói lời tạm biệt với `SharedPreferences` và những cú lỗi ANR ngầm. Việc kết hợp `Preferences DataStore` cùng `Kotlin Flow` và kiến trúc `Repository -> ViewModel` chính là chuẩn mực (Best Practice) hiện đại nhất trong lập trình Android.
