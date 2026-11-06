---
id: android.component.broadcast.overview
title: Broadcast Receiver
summary: Broadcast Receiver là Application Component cho phép app lắng nghe và phản ứng với broadcast do hệ thống hoặc app khác phát đi (mô hình pub/sub ở cấp hệ điều hành). Bài phân biệt Static và Dynamic Receiver, các giới hạn từ Android 8 đến Android 14, security, cách thay LocalBroadcastManager bằng Flow, và khi nào dùng WorkManager hoặc NetworkCallback thay cho broadcast.
status: published
difficulty: intermediate
depth: deep-dive
estimated_reading_time: 35 phút
tags: [android, broadcast-receiver, static-receiver, dynamic-receiver, local-broadcast, hilt, mvvm, mvi, clean-architecture, security, background]
prerequisites: [android.component.activity.overview, android.component.activity.lifecycle, android.intent.filters]
related: [android.component.service.overview, android.intent.explicit]
downstream: [android.component.content_provider]
learning_outcomes:
  - Giải thích được bản chất Broadcast Receiver (cơ chế pub/sub của hệ điều hành) và vòng đời ngắn của nó.
  - Phân biệt được Static Receiver và Dynamic Receiver, biết khi nào dùng loại nào và các giới hạn từ Android 8 đến Android 14.
  - Triển khai được Dynamic Receiver đúng cách (ContextCompat.registerReceiver với cờ export, đăng ký và huỷ theo lifecycle) trong MVVM với Hilt.
  - Biết khi nào nên dùng WorkManager, NetworkCallback hoặc Flow/SharedFlow thay vì Broadcast Receiver.
  - Xử lý được các lỗi phổ biến như lỗ hổng bảo mật, leak do quên unregister, ANR trên main thread.
knowledge_gap: >
  Nhiều developer hiểu Broadcast Receiver theo kiểu "đăng ký lắng nghe sự kiện toàn hệ thống",
  nhưng bỏ qua việc Android 8+ đã cắt hầu hết Static Receiver cho implicit broadcast,
  không biết Dynamic Receiver cần unregister đúng nơi để tránh leak,
  và thường dùng Broadcast để giao tiếp nội bộ trong khi Flow/EventBus là lựa chọn tốt hơn nhiều.
---

# Broadcast Receiver

## 1. Nó là gì và vì sao nó tồn tại?

**Broadcast Receiver** là một **Application Component** cho phép ứng dụng **lắng nghe và phản ứng với các sự kiện (broadcast)** được phát đi bởi hệ thống hoặc các ứng dụng khác.

Hãy nghĩ về nó như một **radio receiver**: hệ thống (hoặc app khác) phát đi một tín hiệu trên một "kênh" nhất định (một Intent với một Action cụ thể), và bất kỳ ai đang "dò" kênh đó sẽ nhận được tín hiệu đó.

### Vấn đề nó giải quyết

Trong một hệ sinh thái Android, nhiều thứ xảy ra độc lập với ứng dụng của bạn:

- Pin sắp hết
- Mạng vừa kết nối lại
- Thiết bị vừa được khởi động
- Một file vừa được download xong
- SMS mới đến

Không có Broadcast Receiver, ứng dụng của bạn **không có cách nào biết** những sự kiện này xảy ra — trừ khi bạn liên tục polling (rất tốn pin và tài nguyên). Broadcast Receiver giải quyết vấn đề này theo mô hình **pub/sub (publish-subscribe)** ở cấp độ hệ điều hành.

---

## 2. Broadcast Receiver hoạt động như thế nào?

### Lifecycle: Cực kỳ ngắn

Đây là điều quan trọng nhất cần hiểu về Broadcast Receiver:

> Một Broadcast Receiver chỉ "sống" trong thời gian thực thi hàm `onReceive()`. Sau khi `onReceive()` kết thúc, Receiver có thể bị GC bất cứ lúc nào.

```text
Intent được gửi đi
        ↓
Android tìm Receiver phù hợp
        ↓
Tạo instance Receiver (nếu cần)
        ↓
Gọi onReceive(context, intent)   ← Receiver "sống" ở đây
        ↓
onReceive() kết thúc
        ↓
Receiver "chết" — không còn tham chiếu nào được giữ
```

### Thread và thời gian giới hạn

- **`onReceive()` luôn chạy trên Main Thread (UI Thread)** theo mặc định.
- Android giới hạn tối đa **10 giây** để `onReceive()` hoàn thành.
- Nếu vượt quá 10 giây → **ANR (Application Not Responding)**.

```kotlin
// ❌ ĐỪNG làm điều này trong onReceive()
override fun onReceive(context: Context, intent: Intent) {
    val data = fetchDataFromNetwork() // Block main thread → ANR
}
```

Vì lifecycle cực ngắn, bạn **không thể** bắt đầu một coroutine bình thường hoặc AsyncTask bên trong `onReceive()` và mong chờ nó hoàn thành: sau khi `onReceive()` trả về, hệ thống có thể kill cả process. Tài liệu chính thức cũng cảnh báo việc tạo thread hoặc start background service từ `onReceive()`. Việc ngắn (dưới 10 giây) thì dùng `goAsync()`; việc nặng thì schedule job qua **WorkManager** (hoặc `JobScheduler`).

### goAsync() — Khi cần thêm thời gian

Nếu bạn cần làm gì đó bất đồng bộ nhỏ ngay trong Receiver:

```kotlin
class NetworkReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val pendingResult = goAsync() // Báo cho Android "chưa xong đâu"

        CoroutineScope(Dispatchers.IO).launch {
            try {
                // Công việc bất đồng bộ ngắn (< 10 giây)
                processNetworkChange(intent)
            } finally {
                pendingResult.finish() // Báo Android "xong rồi"
            }
        }
    }
}
```

> **Cảnh báo:** `goAsync()` vẫn có giới hạn 10 giây. Không dùng cho tác vụ dài. Dùng WorkManager cho tác vụ dài.

---

## 3. Static Receiver vs Dynamic Receiver

### So sánh tổng quan

| Tiêu chí | Static Receiver | Dynamic Receiver |
|---|---|---|
| Khai báo ở đâu | `AndroidManifest.xml` | Trong code (Activity/Fragment/Service) |
| App có cần đang chạy? | Không (Android có thể khởi động process) | Có — chỉ nhận khi component đang active |
| Còn nhận sau Android 8+? | **Chỉ với explicit và một số system broadcast** | Có |
| Khi nào dùng | Boot completed, SMS, Phone call | Sạc pin, screen on/off (chỉ khi app đang mở) |
| Nguy cơ leak | Không | **Có** nếu quên unregister |

### Static Receiver — Khai báo trong Manifest

```xml
<!-- AndroidManifest.xml -->
<receiver
    android:name=".receiver.BootReceiver"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED" />
    </intent-filter>
</receiver>
```

```kotlin
// BootReceiver.kt
class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED) {
            // Alarm đặt bằng AlarmManager bị xoá khi thiết bị khởi động lại → đặt lại.
            // (Job của WorkManager thì KHÔNG cần: WorkManager tự lưu và lên lịch lại sau reboot.)
            // onReceive phải ngắn → giao việc đọc DB và đặt lại alarm cho WorkManager
            WorkManager.getInstance(context)
                .enqueueUniqueWork(
                    RescheduleRemindersWorker.UNIQUE_NAME,
                    ExistingWorkPolicy.REPLACE,
                    OneTimeWorkRequestBuilder<RescheduleRemindersWorker>().build()
                )
        }
    }
}
```

> **Lưu ý:** Cần permission `RECEIVE_BOOT_COMPLETED` trong Manifest. `BOOT_COMPLETED` là protected broadcast, chỉ hệ thống gửi được, nên để `exported="true"` như tài liệu khuyến nghị cho receiver nghe broadcast hệ thống vẫn an toàn (xem mục 8.1).

### Dynamic Receiver — Đăng ký trong code

```kotlin
// PowerConnectionReceiver.kt
class PowerConnectionReceiver(
    private val onChargingChanged: (Boolean) -> Unit
) : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
            Intent.ACTION_POWER_CONNECTED -> onChargingChanged(true)
            Intent.ACTION_POWER_DISCONNECTED -> onChargingChanged(false)
        }
    }
}
```

#### Đăng ký và hủy đăng ký đúng cách

Luôn đảm bảo `register` và `unregister` ở cùng cặp lifecycle:

```kotlin
// Activity
class MainActivity : AppCompatActivity() {
    private val powerReceiver = PowerConnectionReceiver { isCharging ->
        // Cập nhật UI, vd hiện gợi ý "Đang sạc: có thể tải video chất lượng cao"
    }

    override fun onStart() {
        super.onStart()
        val filter = IntentFilter().apply {
            addAction(Intent.ACTION_POWER_CONNECTED)
            addAction(Intent.ACTION_POWER_DISCONNECTED)
        }
        // Android 14+ (targetSdk 34): receiver đăng ký bằng context phải chọn
        // RECEIVER_EXPORTED hoặc RECEIVER_NOT_EXPORTED. Nghe broadcast hệ thống → EXPORTED.
        ContextCompat.registerReceiver(this, powerReceiver, filter, ContextCompat.RECEIVER_EXPORTED)
    }

    override fun onStop() {
        super.onStop()
        unregisterReceiver(powerReceiver) // ← Bắt buộc!
    }
}
```

> **Lưu ý Android 13/14 với Dynamic Receiver:**
> - Từ Android 14 (targetSdk 34), `registerReceiver()` **bắt buộc** truyền cờ `RECEIVER_EXPORTED` hoặc `RECEIVER_NOT_EXPORTED` (trừ receiver chỉ nhận system broadcast), nếu không sẽ ném `SecurityException`. Dùng `ContextCompat.registerReceiver()` để có cùng API trên mọi version. `RECEIVER_NOT_EXPORTED` vẫn nhận được một số system broadcast và broadcast của chính app, nhưng không nhận broadcast từ app đặc quyền (Bluetooth, telephony).
> - Từ Android 14, khi app ở trạng thái **cached**, hệ thống hoãn các system broadcast ít quan trọng (vd `ACTION_SCREEN_ON`) gửi tới receiver đăng ký bằng context, và chỉ giao khi app thoát khỏi trạng thái cached.
> - Theo dõi mạng thì **không** dùng `CONNECTIVITY_ACTION` (deprecated từ API 28) và `activeNetworkInfo` (deprecated từ API 29): dùng `ConnectivityManager.registerDefaultNetworkCallback()` (xem mục 6).

---

## 4. Giới hạn của Android 8+ (API 26) — Implicit Broadcast Restrictions

Từ Android 8.0 (Oreo), Google đã **cấm hầu hết Static Receiver nhận implicit broadcasts** để cải thiện hiệu năng và tuổi thọ pin.

### Nguyên nhân

Nếu 50 ứng dụng trên thiết bị đều đăng ký lắng nghe `CONNECTIVITY_CHANGE` qua Manifest, mỗi khi mạng thay đổi, Android phải khởi động 50 process. Điều này gây lãng phí tài nguyên nghiêm trọng.

### Implicit Broadcast nào vẫn còn hoạt động với Static Receiver?

Một số broadcast **được miễn trừ** (exempted) vẫn hoạt động với Static Receiver:

- `ACTION_BOOT_COMPLETED`
- `ACTION_LOCKED_BOOT_COMPLETED`
- `ACTION_MY_PACKAGE_REPLACED`
- `ACTION_NEW_OUTGOING_CALL`
- `SMS_RECEIVED`
- `WAP_PUSH_RECEIVED`

Danh sách đầy đủ: [developer.android.com/guide/components/broadcast-exceptions](https://developer.android.com/guide/components/broadcast-exceptions)

> **Không** có trong danh sách miễn trừ: `ACTION_POWER_CONNECTED`/`ACTION_POWER_DISCONNECTED`, `CONNECTIVITY_ACTION`... Static Receiver khai báo các action này sẽ không nhận được gì trên Android 8+; chỉ Dynamic Receiver nhận được (khi app đang chạy).

### Giải pháp thay thế

```text
Static Receiver cho CONNECTIVITY_CHANGE (Android 8+)
            ↓
        Bị chặn!
            ↓
   Dynamic Receiver (CONNECTIVITY_ACTION đã deprecated từ API 28)
   hoặc tốt hơn
   NetworkCallback (ConnectivityManager.registerDefaultNetworkCallback)
```
<!-- dd: br-blocked -->

---

## 5. LocalBroadcastManager — Deprecated và thay thế

### LocalBroadcastManager là gì?

`LocalBroadcastManager` là utility class của AndroidX cho phép gửi và nhận broadcast **chỉ trong nội bộ ứng dụng** (không qua hệ thống).

```kotlin
// Gửi
LocalBroadcastManager.getInstance(context)
    .sendBroadcast(Intent("com.example.REFRESH_DATA"))

// Nhận
LocalBroadcastManager.getInstance(this)
    .registerReceiver(receiver, IntentFilter("com.example.REFRESH_DATA"))
```

### Vì sao nó deprecated?

`LocalBroadcastManager` bị deprecated từ artifact **`androidx.localbroadcastmanager` 1.1.0** (2019) vì:

1. **Không phải giải pháp tốt cho giao tiếp component**: Nó chỉ là wrapper của BroadcastReceiver — vẫn có overhead của Intent và Receiver creation.
2. **Không type-safe**: Mọi dữ liệu phải serialize vào Intent extras → dễ lỗi runtime.
3. **Có giải pháp tốt hơn nhiều** trong Kotlin ecosystem.

### Thay thế LocalBroadcastManager

| Use case | Giải pháp thay thế |
|---|---|
| ViewModel ↔ UI | `StateFlow` / `LiveData` |
| Giữa các ViewModel | `SharedViewModel` / `SharedFlow` |
| Giữa các màn hình (navigation) | `SavedStateHandle` |
| Giữa các layer (Repository → ViewModel) | `Flow` / `SharedFlow` |
| Broadcast toàn app (one-to-many) | `SharedFlow` với replay=0 |

**Ví dụ thay thế: `SharedFlow` thay vì `LocalBroadcastManager`**

```kotlin
// AppEventBus.kt — Singleton dạng object (hoặc class @Singleton inject qua Hilt)
object AppEventBus {
    private val _events = MutableSharedFlow<AppEvent>(extraBufferCapacity = 64)
    val events: SharedFlow<AppEvent> = _events.asSharedFlow()

    suspend fun emit(event: AppEvent) = _events.emit(event)
}

sealed class AppEvent {
    object RefreshData : AppEvent()
    data class ShowError(val message: String) : AppEvent()
}

// ViewModel phát sự kiện
viewModelScope.launch {
    AppEventBus.emit(AppEvent.RefreshData)
}

// ViewModel nhận sự kiện
viewModelScope.launch {
    AppEventBus.events
        .filterIsInstance<AppEvent.RefreshData>()
        .collect { handleRefresh() }
}
```

---

## 6. Triển khai thực chiến trong MVVM + Clean Architecture + Hilt

### Bài toán: Theo dõi trạng thái mạng

Use case phổ biến nhất: App cần biết khi nào mạng mất/khôi phục để retry API call hoặc hiển thị banner offline.

### Kiến trúc

```text
NetworkConnectivityObserver (Data Layer)
        ↓ Flow<ConnectivityStatus>
NetworkRepository (Domain Layer)
        ↓
NetworkStatusViewModel (Presentation Layer)
        ↓
Activity/Fragment (UI Layer)
```
<!-- dd: br-observer -->

#### Data Layer: NetworkConnectivityObserver

```kotlin
// domain/connectivity/ConnectivityObserver.kt
interface ConnectivityObserver {
    fun observe(): Flow<ConnectivityStatus>

    enum class ConnectivityStatus { Available, Unavailable, Losing, Lost }
}
```

```kotlin
// data/connectivity/NetworkConnectivityObserver.kt
class NetworkConnectivityObserver @Inject constructor(
    @ApplicationContext private val context: Context
) : ConnectivityObserver {

    private val connectivityManager =
        context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

    override fun observe(): Flow<ConnectivityObserver.ConnectivityStatus> = callbackFlow {
        val callback = object : ConnectivityManager.NetworkCallback() {
            override fun onAvailable(network: Network) {
                trySend(ConnectivityObserver.ConnectivityStatus.Available)
            }
            override fun onLosing(network: Network, maxMsToLive: Int) {
                trySend(ConnectivityObserver.ConnectivityStatus.Losing)
            }
            override fun onLost(network: Network) {
                trySend(ConnectivityObserver.ConnectivityStatus.Lost)
            }
            override fun onUnavailable() {
                trySend(ConnectivityObserver.ConnectivityStatus.Unavailable)
            }
        }

        // Theo dõi network MẶC ĐỊNH: onLost chỉ báo khi app thật sự không còn network mặc định.
        // (registerNetworkCallback(request) báo onLost cho TỪNG network, vd mất Wi-Fi
        // trong khi vẫn còn 4G → báo offline sai)
        connectivityManager.registerDefaultNetworkCallback(callback)

        awaitClose { connectivityManager.unregisterNetworkCallback(callback) }
    }.distinctUntilChanged()
}
```

> **Lưu ý:** Mục này **không dùng BroadcastReceiver**: đây là phương án thay thế hiện đại cho `CONNECTIVITY_ACTION`. `NetworkCallback` không đi qua broadcast; `ConnectivityService` của hệ thống gọi callback trực tiếp vào app qua Binder. Flow wrapper giúp nó type-safe và dễ test.

#### DI Module

```kotlin
// di/ConnectivityModule.kt
@Module
@InstallIn(SingletonComponent::class)
abstract class ConnectivityModule {

    @Binds
    @Singleton
    abstract fun bindConnectivityObserver(
        impl: NetworkConnectivityObserver
    ): ConnectivityObserver
}
```

#### Presentation Layer: ViewModel

```kotlin
// presentation/NetworkStatusViewModel.kt
@HiltViewModel
class NetworkStatusViewModel @Inject constructor(
    private val connectivityObserver: ConnectivityObserver
) : ViewModel() {

    val connectivityStatus: StateFlow<ConnectivityObserver.ConnectivityStatus> =
        connectivityObserver.observe()
            .stateIn(
                scope = viewModelScope,
                started = SharingStarted.WhileSubscribed(5000),
                initialValue = ConnectivityObserver.ConnectivityStatus.Unavailable
            )
}
```

#### UI Layer: Fragment với MVI

Nếu dùng MVI, bạn sẽ map network status thành một phần của **UiState**:

```kotlin
// MVI State
data class HomeUiState(
    val posts: List<Post> = emptyList(),
    val isLoading: Boolean = false,
    val isOffline: Boolean = false,
    val errorMessage: String? = null
)

// HomeViewModel với MVI
@HiltViewModel
class HomeViewModel @Inject constructor(
    private val connectivityObserver: ConnectivityObserver,
    private val getPostsUseCase: GetPostsUseCase
) : ViewModel() {

    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    init {
        observeConnectivity()
        loadPosts()
    }

    private fun observeConnectivity() {
        viewModelScope.launch {
            connectivityObserver.observe().collect { status ->
                _uiState.update { state ->
                    state.copy(
                        isOffline = status != ConnectivityObserver.ConnectivityStatus.Available
                    )
                }
                // Auto-retry khi mạng khôi phục
                if (status == ConnectivityObserver.ConnectivityStatus.Available) {
                    loadPosts()
                }
            }
        }
    }

    private fun loadPosts() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true) }
            getPostsUseCase()
                .onSuccess { posts ->
                    _uiState.update { it.copy(posts = posts, isLoading = false) }
                }
                .onFailure { error ->
                    _uiState.update { it.copy(errorMessage = error.message, isLoading = false) }
                }
        }
    }
}
```

```kotlin
// HomeFragment.kt
@AndroidEntryPoint
class HomeFragment : Fragment() {
    private val viewModel: HomeViewModel by viewModels()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.uiState.collect { state ->
                    binding.offlineBanner.isVisible = state.isOffline
                    binding.progressBar.isVisible = state.isLoading
                    // ...
                }
            }
        }
    }
}
```

### Luồng hoạt động (Flow Simulation)

```text
Mạng bị ngắt (Network Lost)
        ↓
ConnectivityManager phát NetworkCallback.onLost()
        ↓
callbackFlow trySend(ConnectivityStatus.Lost)
        ↓
Flow<ConnectivityStatus> emit → ViewModel collect
        ↓
_uiState.update { isOffline = true }
        ↓
StateFlow<HomeUiState> emit → Fragment collect
        ↓
offlineBanner.isVisible = true (hiển thị banner)

Mạng khôi phục (Network Available)
        ↓
ConnectivityManager phát NetworkCallback.onAvailable()
        ↓
Flow emit ConnectivityStatus.Available
        ↓
ViewModel: isOffline = false + gọi loadPosts()
        ↓
offlineBanner.isVisible = false (ẩn banner)
```
<!-- dd: br-offline -->

---

## 7. Ví dụ 2: Broadcast Receiver thực sự cần thiết — Boot Receiver + WorkManager

### Bài toán: Đặt lại alarm nhắc uống thuốc sau khi thiết bị khởi động lại

Alarm đặt bằng `AlarmManager` bị hệ thống xoá khi thiết bị tắt/khởi động lại, nên app phải tự đặt lại khi nhận `BOOT_COMPLETED`. Ngược lại, job của **WorkManager không cần** BootReceiver: WorkManager lưu work vào database và tự lên lịch lại sau reboot.

```kotlin
// receiver/BootReceiver.kt
class BootReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action != Intent.ACTION_BOOT_COMPLETED &&
            intent.action != Intent.ACTION_MY_PACKAGE_REPLACED) return

        // onReceive chạy trên main thread và phải xong nhanh:
        // giao việc đọc DB + đặt lại alarm cho WorkManager
        WorkManager.getInstance(context).enqueueUniqueWork(
            RescheduleRemindersWorker.UNIQUE_NAME,
            ExistingWorkPolicy.REPLACE,
            OneTimeWorkRequestBuilder<RescheduleRemindersWorker>().build()
        )
    }
}
```

> **Lưu ý Hilt:** Receiver ở đây không cần inject gì. Nếu cần inject vào BroadcastReceiver, annotate receiver với `@AndroidEntryPoint` (Application cũng phải dùng `@HiltAndroidApp`). Worker dùng `@HiltWorker` cần cấu hình `HiltWorkerFactory` cho WorkManager.

```kotlin
// worker/RescheduleRemindersWorker.kt
@HiltWorker
class RescheduleRemindersWorker @AssistedInject constructor(
    @Assisted context: Context,
    @Assisted params: WorkerParameters,
    private val reminderRepository: ReminderRepository,
    private val reminderScheduler: ReminderScheduler // bọc AlarmManager
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        // Đọc các lần nhắc sắp tới từ Room rồi đặt lại từng alarm
        reminderRepository.getUpcomingReminders().forEach { reminder ->
            reminderScheduler.schedule(reminder) // AlarmManager.setAndAllowWhileIdle(...)
        }
        return Result.success()
    }

    companion object {
        const val UNIQUE_NAME = "reschedule_reminders"
    }
}
```

```xml
<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

<!-- Nghe broadcast hệ thống → exported="true" (BOOT_COMPLETED là protected broadcast,
     app khác không giả mạo được) -->
<receiver
    android:name=".receiver.BootReceiver"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED" />
        <action android:name="android.intent.action.MY_PACKAGE_REPLACED" />
    </intent-filter>
</receiver>
```

---

## 8. Security — Bảo mật với Broadcast Receiver

Broadcast Receiver là một **bề mặt tấn công (attack surface)** tiềm ẩn nếu không cấu hình đúng.

### 8.1 `android:exported` — Quan trọng từ Android 12+

Từ Android 12 (API 31), mọi receiver có `<intent-filter>` **bắt buộc phải khai báo** `android:exported`:

```xml
<!-- ✅ Đúng — Chỉ nhận broadcast từ nội bộ app -->
<receiver
    android:name=".receiver.InternalReceiver"
    android:exported="false">
    ...
</receiver>

<!-- ✅ Đúng — Nhận broadcast từ hệ thống hoặc app khác -->
<receiver
    android:name=".receiver.BootReceiver"
    android:exported="true">
    ...
</receiver>
```

> **`exported` với system broadcast:** broadcast do chính hệ thống (system UID) gửi, như `BOOT_COMPLETED`, vẫn tới được receiver `exported="false"`. Nhưng một số system broadcast đến từ app đặc quyền (Bluetooth, telephony) không chạy dưới UID hệ thống, nên receiver `exported="false"` sẽ không nhận được. Vì vậy tài liệu chính thức khuyên: receiver nghe broadcast từ **hệ thống hoặc app khác** thì đặt `exported="true"`, kết hợp kiểm tra action trong `onReceive()` và permission khi cần.

> **Rule of thumb:** Luôn dùng `exported="false"` trừ khi bạn có lý do rõ ràng cần nhận từ bên ngoài.

### 8.2 Permission — Hạn chế ai được gửi broadcast đến receiver của bạn

```xml
<!-- Chỉ app có permission này mới gửi được -->
<receiver
    android:name=".receiver.SecureReceiver"
    android:exported="true"
    android:permission="com.example.SEND_SECURE_BROADCAST">
    <intent-filter>
        <action android:name="com.example.SECURE_ACTION" />
    </intent-filter>
</receiver>
```

### 8.3 Gửi broadcast có bảo vệ

Khi gửi broadcast, bạn có thể chỉ định permission để giới hạn ai nhận được:

```kotlin
// Gửi broadcast — chỉ receiver có permission này mới nhận được
context.sendBroadcast(
    Intent("com.example.SECURE_ACTION"),
    "com.example.RECEIVE_SECURE_BROADCAST" // receiverPermission
)
```

### 8.4 Không đặt dữ liệu nhạy cảm trong broadcast

```kotlin
// ❌ Không làm — dữ liệu có thể bị app khác intercept
val intent = Intent("com.example.USER_LOGGED_IN")
intent.putExtra("token", "my_secret_jwt_token")
context.sendBroadcast(intent)

// ✅ Nên làm — chỉ báo hiệu sự kiện, dữ liệu lấy qua secure channel
val intent = Intent("com.example.USER_LOGGED_IN")
context.sendBroadcast(intent, "com.example.RECEIVE_AUTH_EVENTS")
```

### 8.5 Validate Intent trong onReceive()

```kotlin
override fun onReceive(context: Context, intent: Intent) {
    // Validate action trước khi xử lý
    if (intent.action != Intent.ACTION_BOOT_COMPLETED) return

    // Validate extras nếu có
    val payload = intent.getStringExtra("payload") ?: return
    if (!isValidPayload(payload)) return

    // Xử lý an toàn
    processBootCompleted(context)
}
```

---

## 9. So sánh: Broadcast Receiver vs WorkManager vs Kotlin Flow

Đây là câu hỏi thực tế: **Khi nào dùng cái nào?**

### Bảng so sánh

| Tiêu chí | Broadcast Receiver | WorkManager | Kotlin Flow |
|---|---|---|---|
| **App cần đang chạy?** | Không (static) / Có (dynamic) | Không | **Có** |
| **Xử lý nền lâu dài?** | ❌ (max 10s) | ✅ (hỗ trợ chuỗi job) | ❌ |
| **Phạm vi** | System-wide / App-wide | App-level | In-process |
| **Guaranteed execution?** | Không | ✅ (persist across reboot) | Không |
| **Type-safe?** | ❌ (Intent extras) | Một phần (Data) | ✅ |
| **Testability** | Khó | Dễ (TestDriver) | Dễ |
| **Battery impact** | Cao (static) / Thấp (dynamic) | Tối ưu tốt | Thấp |

### Khi nào dùng Broadcast Receiver

✅ Dùng khi bạn cần **phản ứng với sự kiện hệ thống** mà không có API thay thế:
- `ACTION_BOOT_COMPLETED` — đặt lại alarm của `AlarmManager` sau reboot (job WorkManager tự được lên lịch lại)
- `ACTION_MY_PACKAGE_REPLACED` — migrate data sau update
- `SMS_RECEIVED` — xử lý SMS trong OTP flow
- ~~`ACTION_POWER_CONNECTED` — bắt đầu sync khi sạc~~: không nhận được qua Manifest từ Android 8 (không có trong danh sách miễn trừ). Muốn sync khi sạc, dùng WorkManager với `setRequiresCharging(true)`

### Khi nào dùng WorkManager thay vì Broadcast Receiver

✅ Dùng WorkManager khi:
- Cần chạy tác vụ **dài hơn 10 giây** (upload, download, sync)
- Cần **đảm bảo task chạy** dù app bị kill hay thiết bị restart
- Cần **constraints** (chỉ chạy khi có wifi, pin đủ...)
- Cần **chain tasks** (Task A → Task B → Task C)

```text
Use case: "Upload ảnh khi có WiFi, ngay cả khi user đóng app"
        ↓
Broadcast Receiver ❌ (không thể đảm bảo, max 10s)
WorkManager ✅ (persist, constraint-aware, guaranteed)
```
<!-- dd: br-upload -->

### Khi nào dùng Flow thay vì LocalBroadcastManager

✅ Dùng Flow khi:
- Giao tiếp **trong cùng một process** (ViewModel ↔ Repository, Fragment ↔ Fragment)
- Cần **reactive stream** với operator (map, filter, combine...)
- Cần **type-safety** và dễ test

```text
Use case: "Repository thông báo cho ViewModel khi data cache expired"
        ↓
LocalBroadcastManager ❌ (deprecated, không type-safe)
Flow/SharedFlow ✅ (type-safe, reactive, testable)
```
<!-- dd: br-flow -->

---

## 10. Các lỗi phổ biến và cách tránh

### Lỗi 1: Memory Leak — Quên unregister Dynamic Receiver

```kotlin
// ❌ Lỗi thường gặp
class BadActivity : AppCompatActivity() {
    private val receiver = NetworkReceiver()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        registerReceiver(receiver, IntentFilter(...))
        // Không có unregister → memory leak!
    }
}

// ✅ Đúng — Unregister ở đúng lifecycle counterpart
class GoodActivity : AppCompatActivity() {
    private val receiver = NetworkReceiver()

    override fun onStart() {
        super.onStart()
        registerReceiver(receiver, IntentFilter(...))
    }

    override fun onStop() {
        super.onStop()
        unregisterReceiver(receiver)
    }
}
```

### Lỗi 2: Làm việc nặng trong onReceive()

```kotlin
// ❌ Block main thread → ANR sau 10 giây
override fun onReceive(context: Context, intent: Intent) {
    uploadFilesToServer() // Tác vụ nặng
}

// ✅ Delegate sang WorkManager
override fun onReceive(context: Context, intent: Intent) {
    WorkManager.getInstance(context)
        .enqueue(OneTimeWorkRequestBuilder<UploadWorker>().build())
}
```

### Lỗi 3: Dùng Static Receiver cho implicit broadcast trên Android 8+

```xml
<!-- ❌ Sẽ không hoạt động trên Android 8+ -->
<receiver android:name=".NetworkReceiver">
    <intent-filter>
        <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
    </intent-filter>
</receiver>
```

```kotlin
// ✅ Dùng Dynamic Receiver hoặc NetworkCallback thay thế
val request = NetworkRequest.Builder()
    .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    .build()
connectivityManager.registerNetworkCallback(request, networkCallback)
```

### Lỗi 4: Không khai báo exported trên Android 12+

```xml
<!-- ❌ Cài đặt thất bại trên Android 12+ (INSTALL_PARSE_FAILED_MANIFEST_MALFORMED) -->
<receiver android:name=".MyReceiver">
    <intent-filter>...</intent-filter>
</receiver>

<!-- ✅ Phải khai báo rõ -->
<receiver android:name=".MyReceiver" android:exported="false">
    <intent-filter>...</intent-filter>
</receiver>
```

---

## 11. Testing Broadcast Receiver

### Test Static Receiver với Robolectric

```kotlin
@RunWith(RobolectricTestRunner::class)
class BootReceiverTest {

    private lateinit var context: Context

    @Before
    fun setup() {
        context = ApplicationProvider.getApplicationContext()
        // WorkManager phải được khởi tạo bản test trước khi gọi getInstance()
        WorkManagerTestInitHelper.initializeTestWorkManager(context)
    }

    @Test
    fun `onReceive BOOT_COMPLETED should enqueue reschedule work`() {
        BootReceiver().onReceive(context, Intent(Intent.ACTION_BOOT_COMPLETED))

        val workInfos = WorkManager.getInstance(context)
            .getWorkInfosForUniqueWork(RescheduleRemindersWorker.UNIQUE_NAME)
            .get()

        assertThat(workInfos).isNotEmpty()
    }
}
```

### Test Dynamic Receiver Behavior qua ViewModel

Test logic trong ViewModel dễ hơn nhiều khi bạn tách flow qua `ConnectivityObserver`:

```kotlin
@OptIn(ExperimentalCoroutinesApi::class)
class HomeViewModelTest {

    @get:Rule val mainDispatcherRule = MainDispatcherRule()

    // Fake implementation
    private val fakeConnectivityObserver = FakeConnectivityObserver()
    private lateinit var viewModel: HomeViewModel

    @Before
    fun setup() {
        viewModel = HomeViewModel(fakeConnectivityObserver, FakeGetPostsUseCase())
    }

    @Test
    fun `when network lost, isOffline should be true`() = runTest {
        fakeConnectivityObserver.emit(ConnectivityObserver.ConnectivityStatus.Lost)

        val state = viewModel.uiState.value
        assertThat(state.isOffline).isTrue()
    }
}

class FakeConnectivityObserver : ConnectivityObserver {
    private val _statusFlow = MutableSharedFlow<ConnectivityObserver.ConnectivityStatus>()

    suspend fun emit(status: ConnectivityObserver.ConnectivityStatus) {
        _statusFlow.emit(status)
    }

    override fun observe() = _statusFlow
}
```

---

## 12. Tư duy hệ thống — Vị trí trong Clean Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  Activity / Fragment                                     │
│  ↑ collect StateFlow<UiState>                           │
│  ViewModel (MVVM) / MVI Store                           │
└─────────────────────────────────────────────────────────┘
                          ↑ inject
┌─────────────────────────────────────────────────────────┐
│                     Domain Layer                         │
│  ConnectivityObserver (interface)                       │
│  ReminderRepository (interface)                         │
│  GetPostsUseCase                                        │
└─────────────────────────────────────────────────────────┘
                          ↑ implement
┌─────────────────────────────────────────────────────────┐
│                      Data Layer                          │
│  NetworkConnectivityObserver  ← bọc NetworkCallback    │
│  ReminderScheduler            ← bọc AlarmManager       │
│  BootReceiver                 → enqueue Worker         │
└─────────────────────────────────────────────────────────┘
                    ↑ system events
┌─────────────────────────────────────────────────────────┐
│                    Android System                        │
│  NetworkCallback / BroadcastReceiver                    │
└─────────────────────────────────────────────────────────┘
```
<!-- dd: br-arch -->

**Nguyên tắc quan trọng trong kiến trúc:**

1. **Broadcast Receiver chỉ là entry point** — nhận sự kiện từ hệ thống và ngay lập tức delegate xuống domain/data layer. Không bao giờ đặt business logic trong Receiver.
2. **Domain layer không biết đến Broadcast** — interface `ConnectivityObserver` hoàn toàn độc lập với implementation chi tiết.
3. **ViewModel không import bất kỳ Android broadcast API** — chỉ làm việc với `Flow` và interface, giúp test dễ dàng.

---

## 13. Nên học tiếp gì?

Sau khi nắm vững Broadcast Receiver, bạn nên tìm hiểu:

- **WorkManager** — quản lý background work phức tạp hơn, guaranteed execution
- **Intent và Intent Filter** — cơ chế routing của Broadcast
- **Foreground Service** — khi cần chạy nền nhưng user cần biết (music player, location tracking)
- **ConnectivityManager.NetworkCallback** — API hiện đại hơn để theo dõi mạng

---

## References

- [Android Developers — Broadcast overview](https://developer.android.com/guide/components/broadcasts)
- [Android Developers — Implicit Broadcast Exceptions (Android 8+)](https://developer.android.com/guide/components/broadcast-exceptions)
- [Android Developers — BroadcastReceiver](https://developer.android.com/reference/android/content/BroadcastReceiver)
- [AndroidX LocalBroadcastManager deprecation](https://developer.android.com/reference/androidx/localbroadcastmanager/content/LocalBroadcastManager)
- [Android Developers — WorkManager](https://developer.android.com/topic/libraries/architecture/workmanager)
- [Kotlin Coroutines — SharedFlow](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-shared-flow/)
- [Hilt — Inject into Android classes](https://developer.android.com/training/dependency-injection/hilt-android)
- [Android Developers — Broadcasts (RECEIVER_EXPORTED, Android 14 cached apps)](https://developer.android.com/develop/background-work/background-tasks/broadcasts)
- [Android 14 behavior changes](https://developer.android.com/about/versions/14/behavior-changes-14)
- [ConnectivityManager — CONNECTIVITY_ACTION (deprecated)](https://developer.android.com/reference/android/net/ConnectivityManager#CONNECTIVITY_ACTION)
- [Persistent work with WorkManager](https://developer.android.com/develop/background-work/background-tasks/persistent)
