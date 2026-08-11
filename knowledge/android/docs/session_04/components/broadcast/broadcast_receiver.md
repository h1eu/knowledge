---
id: android.component.broadcast.overview
title: Broadcast Receiver
summary: Broadcast Receiver là gì, phân biệt Static vs Dynamic Receiver, LocalBroadcastManager và cách thay thế hiện đại, triển khai thực chiến với MVVM/MVI + Hilt, giới hạn Android 8+, security, và so sánh với WorkManager/Flow.
status: published
difficulty: intermediate
depth: deep-dive
estimated_reading_time: 35 phút
tags: [android, broadcast-receiver, static-receiver, dynamic-receiver, local-broadcast, hilt, mvvm, mvi, clean-architecture, security, background]
prerequisites: [android.component.activity.overview, android.component.activity.lifecycle, android.intent.overview]
related: [android.component.service.overview, android.intent.overview]
downstream: [android.component.content_provider.overview]
learning_outcomes:
  - Hiểu bản chất Broadcast Receiver và vòng đời của nó.
  - Phân biệt Static Receiver và Dynamic Receiver, biết khi nào dùng loại nào.
  - Biết tại sao LocalBroadcastManager deprecated và cách thay thế bằng Flow/SharedFlow.
  - Triển khai Dynamic Receiver đúng cách trong MVVM/MVI với Hilt.
  - Nắm rõ các giới hạn background của Android 8+ ảnh hưởng đến Static Receiver.
  - Bảo vệ app trước các lỗ hổng bảo mật liên quan đến Broadcast.
  - Biết khi nào nên dùng WorkManager hoặc Flow thay vì Broadcast Receiver.
  - Tránh được các lỗi phổ biến: leak, unregister, ANR trên main thread.
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

```
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

Vì lifecycle cực ngắn, bạn **không thể** bắt đầu một coroutine bình thường hoặc AsyncTask bên trong `onReceive()` và mong chờ nó hoàn thành. Nếu cần tác vụ nặng, bạn phải khởi động một **Service** hoặc schedule job qua **WorkManager**.

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
| Khi nào dùng | Boot completed, SMS, Phone call | Network change, screen on/off, in-app events |
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
            // Reschedule WorkManager jobs sau khi thiết bị khởi động lại
            WorkManager.getInstance(context)
                .enqueueUniqueWork(
                    "sync_after_boot",
                    ExistingWorkPolicy.KEEP,
                    OneTimeWorkRequestBuilder<SyncWorker>().build()
                )
        }
    }
}
```

> **Lưu ý:** Cần permission `RECEIVE_BOOT_COMPLETED` trong Manifest.

### Dynamic Receiver — Đăng ký trong code

```kotlin
// NetworkMonitorReceiver.kt
class NetworkMonitorReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val isConnected = isNetworkAvailable(context)
        // Notify ViewModel/UseCase
    }

    private fun isNetworkAvailable(context: Context): Boolean {
        val cm = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        return cm.activeNetworkInfo?.isConnectedOrConnecting == true
    }
}
```

#### Đăng ký và hủy đăng ký đúng cách

Luôn đảm bảo `register` và `unregister` ở cùng cặp lifecycle:

```kotlin
// Activity
class MainActivity : AppCompatActivity() {
    private val networkReceiver = NetworkMonitorReceiver()

    override fun onStart() {
        super.onStart()
        val filter = IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION)
        registerReceiver(networkReceiver, filter)
    }

    override fun onStop() {
        super.onStop()
        unregisterReceiver(networkReceiver) // ← Bắt buộc!
    }
}
```

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

### Giải pháp thay thế

```
Static Receiver cho CONNECTIVITY_CHANGE (Android 8+)
            ↓
        Bị chặn!
            ↓
   Dùng Dynamic Receiver
   hoặc
   NetworkCallback (ConnectivityManager.registerNetworkCallback)
```

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

`LocalBroadcastManager` bị deprecated từ **AndroidX Core 1.1.0** (2019) vì:

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
// AppEventBus.kt — Singleton qua Hilt
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

```
NetworkConnectivityObserver (Data Layer)
        ↓ Flow<ConnectivityStatus>
NetworkRepository (Domain Layer)
        ↓
NetworkStatusViewModel (Presentation Layer)
        ↓
Activity/Fragment (UI Layer)
```

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

        val request = NetworkRequest.Builder()
            .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
            .build()

        connectivityManager.registerNetworkCallback(request, callback)

        awaitClose { connectivityManager.unregisterNetworkCallback(callback) }
    }.distinctUntilChanged()
}
```

> **Lưu ý:** Đây là cách **hiện đại** hơn BroadcastReceiver cho network — dùng `NetworkCallback` thay vì `CONNECTIVITY_ACTION`. Tuy nhiên bên dưới nó vẫn dùng Broadcast. Flow wrapper giúp nó type-safe và dễ test.

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

```
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

---

## 7. Ví dụ 2: Broadcast Receiver thực sự cần thiết — Boot Receiver + WorkManager

### Bài toán: App cần schedule job định kỳ, job bị mất sau khi thiết bị restart

```kotlin
// receiver/BootReceiver.kt
@AndroidEntryPoint // Hilt hỗ trợ inject vào BroadcastReceiver từ Hilt 2.28+
class BootReceiver : BroadcastReceiver() {

    @Inject
    lateinit var workScheduler: WorkScheduler

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED ||
            intent.action == Intent.ACTION_MY_PACKAGE_REPLACED) {
            workScheduler.schedulePeriodicSync()
        }
    }
}
```

> **Lưu ý Hilt:** Để inject vào BroadcastReceiver với Hilt, bạn cần annotate receiver với `@AndroidEntryPoint` và Activity/Application phải cũng dùng Hilt.

```kotlin
// domain/scheduler/WorkScheduler.kt
class WorkScheduler @Inject constructor(
    private val workManager: WorkManager
) {
    fun schedulePeriodicSync() {
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build()

        val syncRequest = PeriodicWorkRequestBuilder<DataSyncWorker>(
            repeatInterval = 15,
            repeatIntervalTimeUnit = TimeUnit.MINUTES
        )
            .setConstraints(constraints)
            .build()

        workManager.enqueueUniquePeriodicWork(
            "data_sync",
            ExistingPeriodicWorkPolicy.KEEP,
            syncRequest
        )
    }
}
```

```xml
<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

<receiver
    android:name=".receiver.BootReceiver"
    android:exported="false">
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

<!-- ✅ Đúng — Nhận từ hệ thống (cần thiết) -->
<receiver
    android:name=".receiver.BootReceiver"
    android:exported="true">
    ...
</receiver>
```

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
- `ACTION_BOOT_COMPLETED` — reschedule job sau reboot
- `ACTION_MY_PACKAGE_REPLACED` — migrate data sau update
- `SMS_RECEIVED` — xử lý SMS trong OTP flow
- `ACTION_POWER_CONNECTED` — bắt đầu sync khi sạc

### Khi nào dùng WorkManager thay vì Broadcast Receiver

✅ Dùng WorkManager khi:
- Cần chạy tác vụ **dài hơn 10 giây** (upload, download, sync)
- Cần **đảm bảo task chạy** dù app bị kill hay thiết bị restart
- Cần **constraints** (chỉ chạy khi có wifi, pin đủ...)
- Cần **chain tasks** (Task A → Task B → Task C)

```
Use case: "Upload ảnh khi có WiFi, ngay cả khi user đóng app"
        ↓
Broadcast Receiver ❌ (không thể đảm bảo, max 10s)
WorkManager ✅ (persist, constraint-aware, guaranteed)
```

### Khi nào dùng Flow thay vì LocalBroadcastManager

✅ Dùng Flow khi:
- Giao tiếp **trong cùng một process** (ViewModel ↔ Repository, Fragment ↔ Fragment)
- Cần **reactive stream** với operator (map, filter, combine...)
- Cần **type-safety** và dễ test

```
Use case: "Repository thông báo cho ViewModel khi data cache expired"
        ↓
LocalBroadcastManager ❌ (deprecated, không type-safe)
Flow/SharedFlow ✅ (type-safe, reactive, testable)
```

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
<!-- ❌ App sẽ crash khi install trên Android 12+ -->
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

    @Test
    fun `onReceive BOOT_COMPLETED should schedule WorkManager job`() {
        val context = ApplicationProvider.getApplicationContext<Application>()
        val receiver = BootReceiver()
        val intent = Intent(Intent.ACTION_BOOT_COMPLETED)

        receiver.onReceive(context, intent)

        val workInfos = WorkManager.getInstance(context)
            .getWorkInfosForUniqueWork("data_sync")
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

```
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
│  WorkScheduler (interface)                              │
│  GetPostsUseCase                                        │
└─────────────────────────────────────────────────────────┘
                          ↑ implement
┌─────────────────────────────────────────────────────────┐
│                      Data Layer                          │
│  NetworkConnectivityObserver  ← bọc NetworkCallback    │
│  WorkSchedulerImpl            ← bọc WorkManager        │
│  BootReceiver                 ← inject WorkScheduler   │
└─────────────────────────────────────────────────────────┘
                    ↑ system events
┌─────────────────────────────────────────────────────────┐
│                    Android System                        │
│  NetworkCallback / BroadcastReceiver                    │
└─────────────────────────────────────────────────────────┘
```

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
