/* ============================================================
   Knowledge OS — Android Module: Content
   ============================================================ */

const ANDROID_CONTENT = {};

Object.assign(ANDROID_CONTENT, {

  'activity-lifecycle': {
    title: 'Activity Lifecycle',
    summary: 'Vòng đời Activity và hệ sinh thái AndroidX Lifecycle Libraries. Hiểu cơ chế LifecycleOwner, LifecycleRegistry, lifecycleScope, repeatOnLifecycle, ProcessLifecycleOwner và cách áp dụng vào app one-activity MVVM/Clean.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['android', 'activity', 'lifecycle', 'lifecycle-owner', 'lifecycle-scope', 'repeat-on-lifecycle', 'process-lifecycle-owner', 'lifecycle-service'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: [],
    related: ['activity-state-changes', 'fragment-lifecycle', 'activity-task-backstack'],
    learningOutcomes: [
      'Giải thích được cơ chế LifecycleOwner, LifecycleRegistry và LifecycleObserver trong Jetpack Lifecycle.',
      'Phân biệt được Lifecycle.State và Lifecycle.Event cùng mối quan hệ với Activity callbacks.',
      'Áp dụng được lifecycleScope, repeatOnLifecycle và flowWithLifecycle để collect Flow an toàn.',
      'Triển khai được ProcessLifecycleOwner và LifecycleService để xử lý Application-level lifecycle.',
      'Thiết kế được lifecycle-aware components trong app one-activity MVVM/Clean.'
    ],
    knowledgeGap: 'Không nắm cơ chế Lifecycle Library dẫn đến collect Flow sai lifecycle gây memory leak, coroutine chạy khi Activity đã destroy, app không phát hiện được trạng thái foreground/background, và logic lặp lại thủ công trên callback dễ sai và khó bảo trì.',
    updatedAt: '2026-08-03',
    readTime: '35 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Android không cho phép app tự quyết định thời điểm tồn tại. Hệ thống có thể hủy Activity bất kỳ lúc nào để giải phóng bộ nhớ, và app phải phản ứng đúng theo từng giai đoạn vòng đời.</p>
<p>Nếu xử lý lifecycle sai, app sẽ gặp:</p>
<ul>
  <li><strong>Memory leak</strong> — giữ reference đến Activity đã destroy qua callback bất đồng bộ.</li>
  <li><strong>Crash</strong> — cập nhật View khi Activity không còn tồn tại.</li>
  <li><strong>Lãng phí tài nguyên</strong> — sensor, network, location vẫn hoạt động khi app ở background.</li>
  <li><strong>Logic lặp lại</strong> — mỗi Activity phải tự đăng ký/hủy listener trong callback, dễ sót, khó test.</li>
</ul>
<p>Vấn đề sâu hơn: logic lifecycle thường nằm rải rác trong <code>onResume()</code>/<code>onPause()</code> của Activity. Khi app có nhiều nguồn tài nguyên (location, analytics, camera), các callback trở nên khổng lồ và không thể tái sử dụng.</p>
<p>AndroidX Lifecycle Library ra đời để giải quyết đúng vấn đề này: <strong>tách logic lifecycle khỏi Activity</strong>, cho phép component tự quản lý vòng đời của chính nó.</p>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được cơ chế LifecycleOwner, LifecycleRegistry và LifecycleObserver trong Jetpack Lifecycle.</li>
  <li>Phân biệt được Lifecycle.State và Lifecycle.Event cùng mối quan hệ với Activity callbacks.</li>
  <li>Áp dụng được lifecycleScope, repeatOnLifecycle và flowWithLifecycle để collect Flow an toàn.</li>
  <li>Triển khai được ProcessLifecycleOwner và LifecycleService để xử lý Application-level lifecycle.</li>
  <li>Thiết kế được lifecycle-aware components trong app one-activity MVVM/Clean.</li>
</ul>

<h2>Activity Lifecycle là gì?</h2>
<p>Activity Lifecycle là tập hợp các <strong>callback method</strong> hệ thống gọi khi Activity chuyển trạng thái: <code>onCreate</code>, <code>onStart</code>, <code>onResume</code>, <code>onPause</code>, <code>onStop</code>, <code>onDestroy</code>.</p>
<p>Ý nghĩa cốt lõi: <strong>hệ thống điều khiển vòng đời, app chỉ phản ứng</strong>. Developer không quyết định khi nào Activity bị hủy — developer quyết định làm gì ở từng thời điểm.</p>

<h3>Lifecycle States</h3>
<p>Jetpack định nghĩa 5 trạng thái:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">State</th>
      <th style="padding:8px 12px;text-align:left;">Visible</th>
      <th style="padding:8px 12px;text-align:left;">Interactive</th>
      <th style="padding:8px 12px;text-align:left;">Ý nghĩa</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">INITIALIZED</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Object đã tạo, chưa gọi onCreate</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">CREATED</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Đã khởi tạo, chưa visible</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">STARTED</td><td style="padding:8px 12px;">Có</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Visible nhưng chưa foreground</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">RESUMED</td><td style="padding:8px 12px;">Có</td><td style="padding:8px 12px;">Có</td><td style="padding:8px 12px;">Foreground, đang tương tác</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">DESTROYED</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Bị hủy hoàn toàn</td></tr>
  </tbody>
</table>

<div class="mermaid">
flowchart LR
    A[Advertiser - trả tiền] -->|Đăng ký campaign| B[Ad Network - AdMob]
    B -->|Trả ad request qua đấu giá| C[SDK trong app của bạn]
    C -->|Hiển thị| D[Người dùng]
    D -->|Tương tác click/install| E[Advertiser đạt mục tiêu]
    E -->|Trả revenue| B
    B -->|Chia phần cho publisher| F[Bạn - Publisher]

    style B fill:#2196F3,stroke:#1565C0,color:#fff
    style F fill:#FFA000,stroke:#E65100,color:#fff
</div>

<h3>7 Callbacks</h3>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Callback</th>
      <th style="padding:8px 12px;text-align:left;">Đi từ → Đến</th>
      <th style="padding:8px 12px;text-align:left;">Vai trò chính</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>onCreate</code></td><td style="padding:8px 12px;">INITIALIZED → CREATED</td><td style="padding:8px 12px;">Khởi tạo View, đọc Intent extras</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>onStart</code></td><td style="padding:8px 12px;">CREATED → STARTED</td><td style="padding:8px 12px;">Visible, đăng ký receiver liên quan UI</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>onResume</code></td><td style="padding:8px 12px;">STARTED → RESUMED</td><td style="padding:8px 12px;">Foreground, bắt đầu camera/sensor</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>onPause</code></td><td style="padding:8px 12px;">RESUMED → STARTED</td><td style="padding:8px 12px;">Mất focus, dừng thao tác nhẹ</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>onStop</code></td><td style="padding:8px 12px;">STARTED → CREATED</td><td style="padding:8px 12px;">Không visible, giải phóng tài nguyên</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>onRestart</code></td><td style="padding:8px 12px;">—</td><td style="padding:8px 12px;">Quay lại từ stopped state</td></tr>
    <tr><td style="padding:8px 12px;"><code>onDestroy</code></td><td style="padding:8px 12px;">CREATED → DESTROYED</td><td style="padding:8px 12px;">Cleanup cuối cùng</td></tr>
  </tbody>
</table>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><code>onPause()</code> phải chạy nhanh — Activity tiếp theo chỉ <code>onResume()</code> sau khi Activity hiện tại <code>onPause()</code> xong. Thao tác nặng (save database) phải để trong <code>onStop()</code>.</div></div>

<h2>Vì sao cần AndroidX Lifecycle Library?</h2>
<p>Trước Jetpack, mọi logic lifecycle nằm trong Activity:</p>
<pre data-lang="kotlin"><code>class LocationActivity : AppCompatActivity() {
    override fun onResume() {
        super.onResume()
        locationClient.startTracking()
        analytics.onScreenVisible()
        cameraSource.start()
    }

    override fun onPause() {
        super.onPause()
        locationClient.stopTracking()
        analytics.onScreenHidden()
        cameraSource.stop()
    }
}</code></pre>
<p>Vấn đề:</p>
<ul>
  <li>Activity phải biết chi tiết của <strong>mọi</strong> component → coupling cao.</li>
  <li>Thêm component mới → phải sửa Activity.</li>
  <li>Không tái sử dụng được logic giữa các màn hình.</li>
  <li>Khó test vì logic gắn chặt vào Activity.</li>
</ul>
<p>Lifecycle Library giải quyết bằng mô hình <strong>Observer</strong>: Activity (hoặc Fragment) là <code>LifecycleOwner</code> phát event. Component đăng ký là <code>LifecycleObserver</code>, tự nhận event và tự xử lý. Activity không cần biết component làm gì.</p>

<h2>Cách hoạt động — Bộ ba cốt lõi</h2>

<h3>LifecycleOwner, Lifecycle, LifecycleObserver</h3>
<p>Ba interface tạo nên toàn bộ hệ thống:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Interface</th>
      <th style="padding:8px 12px;text-align:left;">Vai trò</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;"><code>LifecycleOwner</code></td><td style="padding:8px 12px;">Đối tượng <strong>có</strong> vòng đời (Activity, Fragment). Trả về <code>Lifecycle</code> qua <code>getLifecycle()</code>.</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;"><code>Lifecycle</code></td><td style="padding:8px 12px;">Đối tượng <strong>mô tả</strong> trạng thái hiện tại và phát event cho observer.</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;"><code>LifecycleObserver</code></td><td style="padding:8px 12px;">Đối tượng <strong>lắng nghe</strong> event, được <code>addObserver()</code> đăng ký vào <code>Lifecycle</code>.</td></tr>
  </tbody>
</table>
<p>Activity của bạn đã implement sẵn <code>LifecycleOwner</code>:</p>
<pre data-lang="kotlin"><code>class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lifecycle.addObserver(LocationTracker(this))
        // Không cần gọi start/stop thủ công — LocationTracker tự xử lý
    }
}</code></pre>

<h3>Lifecycle.State vs Lifecycle.Event</h3>
<ul>
  <li><strong>State</strong> là trạng thái hiện tại: <code>CREATED</code>, <code>STARTED</code>, <code>RESUMED</code>, <code>DESTROYED</code>.</li>
  <li><strong>Event</strong> là sự kiện chuyển đổi: <code>ON_CREATE</code>, <code>ON_START</code>, <code>ON_RESUME</code>, <code>ON_PAUSE</code>, <code>ON_STOP</code>, <code>ON_DESTROY</code>, <code>ON_ANY</code>.</li>
</ul>
<p>Event tạo ra State. Đây là điểm nhiều developer nhầm lẫn.</p>

<h3>LifecycleRegistry — Cơ chế dispatch bên trong</h3>
<p><code>LifecycleRegistry</code> là lớp triển khai <code>Lifecycle</code> dùng bởi <code>ComponentActivity</code> và <code>Fragment</code>. Khi Activity gọi <code>onResume()</code>, nội bộ nó gọi <code>handleLifecycleEvent(ON_RESUME)</code> trên registry, registry cập nhật state thành <code>RsequenceDiagram
    participant App as App của bạn
    participant AdMob as AdMob Server
    participant Adv1 as Advertiser A
    participant Adv2 as Advertiser B
    participant Adv3 as Advertiser C

    App->>AdMob: Gửi ad request (ad unit, device info, context)
    AdMob->>Adv1: Mời đấu giá
    AdMob->>Adv2: Mời đấu giá
    AdMob->>Adv3: Mời đấu giá
    Adv1-->>AdMob: Trả giá $0.50
    Adv2-->>AdMob: Trả giá $0.75
    Adv3-->>AdMob: Trả giá $0.60
    AdMob->>AdMob: Chọn Advertiser B (cao nhất)
    AdMob-->>App: Trả về ad của Advertiser B
    App->>App: Hiển thị ad
    Note over App,AdMob: Nếu user click: Advertiser B trả $0.75, AdMob giữ ~30%, bạn nhận ~70%)
    LR-&gt;&gt;LR: cập nhật state = RESUMED
    LR-&gt;&gt;Obs: onResume(owner)
    Obs--&gt;&gt;Act: component tự xử lý
</div>
<p>Chính vì cơ chế này, khi bạn thêm observer trong <code>onCreate()</code>, observer sẽ <strong>tự động</strong> nhận <code>ON_START</code> và <code>ON_RESUME</code> ngay sau đó — Activity không cần gọi lại bằng tay.</p>

<h3>DefaultLifecycleObserver vs LifecycleEventObserver</h3>
<ul>
  <li><code>DefaultLifecycleObserver</code> (khuyến nghị từ Lifecycle 2.4+): có sẵn method riêng cho từng event (<code>onStart</code>, <code>onResume</code>...).</li>
  <li><code>LifecycleEventObserver</code> (trước đây <code>@OnLifecycleEvent</code>): nhận mọi event trong một callback <code>onStateChanged</code>, phải tự <code>when(event)</code>.</li>
</ul>
<p>Dùng <code>DefaultLifecycleObserver</code> để code rõ ràng, dễ test.</p>
<pre data-lang="kotlin"><code>class LocationTracker(
    private val locationClient: LocationClient
) : DefaultLifecycleObserver {

    override fun onStart(owner: LifecycleOwner) {
        locationClient.startTracking()
    }

    override fun onStop(owner: LifecycleOwner) {
        locationClient.stopTracking()
    }
}</code></pre>

<h2>Cách hoạt động — Coroutines với Lifecycle</h2>
<p>Thư viện <code>lifecycle-runtime-ktx</code> cung cấp công cụ chạy coroutine <strong>gắn với vòng đời</strong> — coroutine tự hủy khi lifecycle bị hủy, không cần <code>cancel()</code> thủ công.</p>

<h3>lifecycleScope</h3>
<p><code>lifecycleScope</code> là <code>CoroutineScope</code> mặc định của <code>LifecycleOwner</code>. Coroutine trong scope này <strong>tự hủy khi lifecycle đạt <code>DESTROYED</code></strong> (tức Activity destroyed).</p>
<pre data-lang="kotlin"><code>// MainActivity
lifecycleScope.launch {
    val data = repository.fetchData()   // Activity destroy → tự cancel
    textView.text = data.name           // Không bao giờ chạy sau destroy
}</code></pre>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Vì sao không dùng <code>GlobalScope</code>?</strong> <code>GlobalScope</code> không bao giờ tự hủy. Nếu Activity destroy mà coroutine vẫn chạy và sau đó cập nhật View → crash hoặc leak.</div></div>

<h3>repeatOnLifecycle</h3>
<p><code>repeatOnLifecycle(state)</code> chạy block <strong>khi lifecycle đạt ít nhất state chỉ định</strong>, và tự <strong>hủy khi rời state đó</strong>. Khi lifecycle quay lại state, block chạy lại.</p>
<p>Đây là pattern chuẩn để collect Flow — chỉ nhận dữ liệu khi màn hình đang visible:</p>
flowchart TB
    App[App của bạn] -->|Ad Request| AdMob[AdMob Mediation]
    AdMob -->|Hỏi giá| Network1[AdMob Network]
    AdMob -->|Hỏi giá| Network2[Meta Audience Network]
    AdMob -->|Hỏi giá| Network3[AppLovin]
    AdMob -->|Hỏi giá| Network4[Unity Ads]
    
    Network1 -.->| $0.50| AdMob
    Network2 -.->| $0.80| AdMob
    Network3 -.->| $0.65| AdMob
    Network4 -.->| $0.70| AdMob
    
    AdMob -->|Chọn Meta| App F as StateFlow

    S-&gt;&gt;R: launch block
    Note over R,F: Activity đạt STARTED
    R-&gt;&gt;F: bắt đầu collect
    F--&gt;&gt;R: emit(state)
    R--&gt;&gt;UI: cập nhật UI
    Note over R,F: Activity rời STARTED (background)
    R-&gt;&gt;R: hủy collect
    Note over R,F: Activity quay lại foreground
    R-&gt;&gt;F: collect lại từ đầu
</div>

<h3>flowWithLifecycle</h3>
<p><code>flowWithLifecycle(lifecycle, state)</code> là operator trên <code>Flow</code> — flow chỉ <strong>emit khi lifecycle đạt ít nhất state</strong>, tự dừng khi rời state:</p>
<pre data-lang="kotlin"><code>lifecycleScope.launch {
    viewModel.uiState
        .flowWithLifecycle(lifecycle, Lifecycle.State.STARTED)
        .collect { state -> render(state) }
}</code></pre>
<p><code>repeatOnLifecycle</code> và <code>flowWithLifecycle</code> giải quyết cùng bài toán. <code>repeatOnLifecycle</code> linh hoạt hơn khi block có nhiều bước; <code>flowWithLifecycle</code> ngắn gọn khi chỉ cần filter một flow.</p>

<h2>Cách hoạt động — Application-level Lifecycle</h2>
<p>Activity lifecycle chỉ bao phủ một màn hình. Khi cần biết <strong>toàn bộ app</strong> đang ở foreground hay background (ví dụ: chặn screenshot, cập nhật badge, đếm thời gian dùng app), dùng <code>lifecycle-process</code>.</p>

<h3>ProcessLifecycleOwner</h3>
<p><code>ProcessLifecycleOwner</code> là <code>LifecycleOwner</code> đại diện cho <strong>toàn bộ process của app</strong>. Nó phát <code>ON_START</code> khi app chuyển lên foreground, <code>ON_STOP</code> khi app xuống background.</p>
<pre data-lang="gradle"><code>implementation("androidx.lifecycle:lifecycle-process:2.9.4")</code></pre>
<pre data-lang="kotlin"><code>// Application class hoặc component bất kỳ
ProcessLifecycleOwner.get().lifecycle.addObserver(object : DefaultLifecycleObserver {
    override fun onStart(owner: LifecycleOwner) {
        // App lên foreground
    }

    override fun onStop(owner: LifecycleOwner) {
        // App xuống background
    }
})</code></pre>
<p><strong>Điểm mạnh:</strong> hoạt động đúng với mọi trường hợp (chuyển app, nhận cuộc gọi, mở màn hình lock) vì nó theo dõi tất cả Activity trong process.</p>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Giới hạn:</strong> <code>ProcessLifecycleOwner</code> chỉ phân biệt foreground/background, <strong>không</strong> phân biệt được Activity cụ thể nào đang hiển thị. Cần thông tin chi tiết từng màn hình → dùng Activity/Fragment lifecycle.</div></div>

<h3>LifecycleService</h3>
<p><code>LifecycleService</code> là <code>Service</code> được bọc thêm <code>LifecycleOwner</code>, giúp component trong Service cũng lifecycle-aware:</p>
<pre data-lang="gradle"><code>implementation("androidx.lifecycle:lifecycle-service:2.9.4")</code></pre>
<pre data-lang="kotlin"><code>class UploadService : LifecycleService() {
    override fun onCreate() {
        super.onCreate()
        // Service lifecycle: ON_CREATE → ON_START (khi onStartCommand) → ON_DESTROY
        lifecycleScope.launch {
            // Coroutine tự hủy khi Service destroyed
        }
    }
}</code></pre>
<p><strong>Khi nào dùng:</strong> Service chạy nền dài (upload, sync) cần quản lý tài nguyên theo vòng đời của chính Service. Khi đó <code>lifecycleScope</code> và <code>repeatOnLifecycle</code> hoạt động bình thường như trong Activity.</p>

<h3>viewModelScope</h3>
<p><code>viewModelScope</code> (thư viện <code>lifecycle-viewmodel-ktx</code>) là scope của <code>ViewModel</code> — coroutine tự hủy khi ViewModel bị clear (Activity thực sự finish, không phải khi xoay màn hình):</p>
<pre data-lang="kotlin"><code>class MainViewModel(
    private val repository: ProductRepository
) : ViewModel() {

    val products: StateFlow&lt;UiState&gt; = repository.products
        .map { UiState.Success(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), UiState.Loading)
}</code></pre>
<p><strong>Phân biệt scope:</strong></p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Scope</th>
      <th style="padding:8px 12px;text-align:left;">Chủ sở hữu</th>
      <th style="padding:8px 12px;text-align:left;">Tự hủy khi</th>
      <th style="padding:8px 12px;text-align:left;">Dùng cho</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>lifecycleScope</code></td><td style="padding:8px 12px;">Activity/Fragment</td><td style="padding:8px 12px;">Lifecycle bị DESTROYED</td><td style="padding:8px 12px;">Thu thập dữ liệu vào UI</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>viewModelScope</code></td><td style="padding:8px 12px;">ViewModel</td><td style="padding:8px 12px;">ViewModel bị clear</td><td style="padding:8px 12px;">Logic nghiệp vụ, lấy dữ liệu</td></tr>
    <tr><td style="padding:8px 12px;"><code>ProcessLifecycleOwner</code></td><td style="padding:8px 12px;">Toàn app</td><td style="padding:8px 12px;">Không (process)</td><td style="padding:8px 12px;">Theo dõi foreground/background</td></tr>
  </tbody>
</table>

<h2>Cách hoạt động — Compose với Lifecycle</h2>
<p>Trong Compose, dùng <code>collectAsStateWithLifecycle</code> thay vì <code>collectAsState</code> — flow <strong>tự dừng khi app xuống background</strong>, tiết kiệm tài nguyên:</p>
<pre data-lang="gradle"><code>implementation("androidx.lifecycle:lifecycle-runtime-compose:2.9.4")</code></pre>
<pre data-lang="kotlin"><code>@Composable
fun ProductListScreen(
    viewModel: ProductViewModel = viewModel()
) {
    // Chỉ collect khi lifecycle >= STARTED, tự dừng khi background
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    when (val state = uiState) {
        is UiState.Loading -> LoadingIndicator()
        is UiState.Success -> ProductList(state.products)
        is UiState.Error -> ErrorMessage(state.message)
    }
}</code></pre>
<p>Ngoài ra <code>lifecycle-runtime-compose</code> (2.7.0+) cung cấp:</p>
<ul>
  <li><code>LifecycleEventEffect(ON_RESUME) { }</code> — chạy block đúng một event (analytics, logging).</li>
  <li><code>LifecycleStartEffect(key) { onStopOrDispose { } }</code> — cặp start/stop cho tài nguyên cần dọn khi mất STARTED.</li>
  <li><code>LifecycleResumeEffect</code> — tương tự nhưng gắn với <code>ON_RESUME</code>/<code>ON_PAUSE</code>, dùng cho camera, animation.</li>
</ul>

<h2>Ví dụ thực tế — App One-Activity MVVM/Clean</h2>
<p>Đây là cách một app one-activity MVVM/Clean tích hợp đầy đủ lifecycle libraries.</p>

<h3>Bước 1: Khai báo dependencies</h3>
<pre data-lang="gradle"><code>dependencies {
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.9.4")
    implementation("androidx.lifecycle:lifecycle-viewmodel-ktx:2.9.4")
    implementation("androidx.lifecycle:lifecycle-process:2.9.4")
    implementation("androidx.lifecycle:lifecycle-service:2.9.4")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.9.4")
}</code></pre>

<h3>Bước 2: Component tự quản lý tài nguyên theo Activity lifecycle</h3>
<p><code>TrackingCoordinator</code> theo dõi location và analytics, <strong>tự đăng ký/hủy</strong> dựa trên lifecycle:</p>
<pre data-lang="kotlin"><code>class TrackingCoordinator(
    private val locationClient: LocationClient,
    private val analytics: Analytics
) : DefaultLifecycleObserver {

    override fun onStart(owner: LifecycleOwner) {
        locationClient.startTracking()   // Chỉ khi màn hình visible
    }

    override fun onStop(owner: LifecycleOwner) {
        locationClient.stopTracking()    // App background → dừng, tiết kiệm pin
    }
}</code></pre>
<pre data-lang="kotlin"><code>class MainActivity : AppCompatActivity() {
    private val tracking by lazy {
        TrackingCoordinator(App.locationClient, App.analytics)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lifecycle.addObserver(tracking)
    }
}</code></pre>

<h3>Bước 3: Collect StateFlow đúng lifecycle trong Compose</h3>
<pre data-lang="kotlin"><code>@Composable
fun HomeScreen(
    viewModel: HomeViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    // Cập nhật state ngay khi ViewModel phát — Compose tự quản lý lifecycle
    HomeContent(state = uiState, onRetry = viewModel::load)
}</code></pre>

<h3>Bước 4: Detect app foreground/background ở Application level</h3>
<pre data-lang="kotlin"><code>class AppLifecycleObserver : DefaultLifecycleObserver {

    override fun onStart(owner: LifecycleOwner) {
        // App lên foreground: cập nhật badge, đổi trạng thái sẵn sàng
    }

    override fun onStop(owner: LsequenceDiagram
    participant App as Ứng dụng (SDK)
    participant GMS as Google Play Services
    participant ADM as AdMob Server
    participant Net as Ad Networks khác (Mediation)

    App->>GMS: MobileAds.initialize(context) - khởi tạo SDK
    Note over App,GMS: Khởi tạo 1 lần trong Application.onCreate

    App->>GMS: Tạo AdRequest và load (banner/interstitial/rewarded)
    GMS->>ADM: Gửi request kèm context (device, app, ad unit)
    ADM->>ADM: Đấu giá real-time chọn ad phù hợp
    ADM-->>Net: Nếu mediation, hỏi các network khác
    Net-->>ADM: Trả giá + ad
    ADM-->>GMS: Trả về ad (hoặc lỗi)
    GMS-->>App: Callback onAstateDiagram-v2
    [*] --> NOT_READY
    NOT_READY --> LOADING: load(AdRequest)
    LOADING --> LOADED: onAdLoaded
    LOADING --> FAILED: onAdFailedToLoad
    LOADED --> FAILED: expired
    LOADED --> SHOWN: show()
    SHOWN --> [*]: onAdDismissedFullScreenContentrmaid">
sequenceDiagram
    participant U as User
    participant A as MainActivity
    participant VM as HomeViewModel
    participant C as TrackingCoordinator
    participant P as ProcessLifecycleOwner

    U-&gt;&gt;A: Mở app
    A-&gt;&gt;P: Activity start
    P-&gt;&gt;P: ON_START (app foreground)
    A-&gt;&gt;A: lifecycle.addObserver(TrackingCoordinator)
    A-&gt;&gt;C: nhận ON_START
    C-&gt;&gt;C: bắt đầu tracking location
    A-&gt;&gt;A: lifecycleScope.launch
    A-&gt;&gt;VM: collect uiState (repeatOnLifecycle STARTED)
    VM--&gt;&gt;A: emit Success(products)
    A--&gt;&gt;U: hiển thị danh sách
</div>

<h2>Khi nào nên dùng — Khi nào không nên dùng</h2>

<h3>Nên dùng</h3>
<ul>
  <li><strong><code>lifecycleScope</code></strong>: mọi coroutine cập nhật UI trong Activity/Fragment.</li>
  <li><strong><code>repeatOnLifecycle(STARTED)</code> / <code>collectAsStateWithLifecycle</code></strong>: mọi Flow cần collect theo lifecycle.</li>
  <li><strong><code>DefaultLifecycleObserver</code></strong>: component quản lý tài nguyên (location, camera, sensor, analytics).</li>
  <li><strong><code>ProcessLifecycleOwner</code></strong>: cần biết app ở foreground/background.</li>
  <li><strong><code>viewModelScope</code></strong>: mọi logic nghiệp vụ trong ViewModel.</li>
</ul>

<h3>Không nên dùng</h3>
<ul>
  <li><strong><code>ProcessLifecycleOwner</code></strong>: chỉ cần trạng thái của một màn hình — dùng Activity lifecycle.</li>
  <li><strong><code>LifecycleService</code></strong>: Service không cần tài nguyên theo lifecycle — dùng Service thường cho đơn giản.</li>
  <li><strong><code>repeatOnLifecycle</code></strong> thay cho <code>viewModelScope</code>: không nên để logic nghiệp vụ phụ thuộc lifecycle UI — ViewModel phải lấy dữ liệu độc lập.</li>
  <li><strong><code>flowWithLifecycle</code></strong> cho dữ liệu cần update liên tục ở background (tracking upload): nếu app cần gửi dữ liệu khi background, phải dùng kênh khác (WorkManager), không dùng flow UI.</li>
</ul>

<h2>Sai lầm thường gặp</h2>

<h3>1. Collect Flow bằng lifecycleScope.launch không có repeatOnLifecycle</h3>
<pre data-lang="kotlin"><code>// ❌ Sai — collect chạy liên tục kể cả khi Activity background
lifecycleScope.launch {
    viewModel.uiState.collect { state -> render(state) }
}

// ✅ Đúng — chỉ collect khi Activity STARTED
lifecycleScope.launch {
    repeatOnLifecycle(Lifecycle.State.STARTED) {
        viewModel.uiState.collect { state -> render(state) }
    }
}</code></pre>
<p><code>lifecycleScope</code> chỉ tự hủy khi DESTROYED, không tự dừng khi background. Dữ liệu vẫn chảy và cập nhật View khi app không hiển thị → lãng phí tài nguyên, thậm chí cập nhật UI nhảy loạn.</p>

<h3>2. Dùng GlobalScope hoặc scope tự tạo cho UI</h3>
<pre data-lang="kotlin"><code>// ❌ Sai — coroutine không tự hủy, Activity destroy vẫn chạy
GlobalScope.launch {
    val data = api.fetchData()
    textView.text = data.name
}

// ✅ Đúng — lifecycleScope tự hủy khi destroy
lifecycleScope.launch {
    val data = api.fetchData()
    textView.text = data.name
}</code></pre>

<h3>3. Nhầm lẫn giữa lifecycleScope và viewModelScope</h3>
<p>Đặt logic lấy dữ liệu trong <code>lifecycleScope</code> → data bị gọi lại mỗi lần Activity recreate (xoay màn hình). Dữ liệu phải nằm trong ViewModel (<code>viewModelScope</code>), UI chỉ thu thập.</p>

<h3>4. Dùng launchWhenStarted (đã deprecated)</h3>
<p><code>launchWhenStarted</code> đã bị thay thế bởi <code>repeatOnLifecycle</code> vì behavior không đúng: coroutine vẫn <strong>tồn tại</strong> trong background, chỉ tạm dừng. <code>repeatOnLifecycle</code> hủy hẳn và chạy lại từ đầu khi quay lại — đúng semantic "bắt đầu thu thập mới".</p>

<h3>5. Thêm observer sau khi lifecycle đã qua event</h3>
<p>Nếu <code>addObserver</code> được gọi khi Activity đã ở <code>RESUMED</code>, registry sẽ <strong>bù lại</strong> bằng cách gọi observer lần lượt <code>ON_CREATE → ON_START → ON_RESUME</code> để đồng bộ trạng thái. Đừng cố đăng ký sớm trong <code>onResume()</code> — không cần thiết và gây nhầm lẫn.</p>

<h3>6. Tin rằng ProcessLifecycleOwner có thể thay thế từng màn hình</h3>
<p><code>ProcessLifecycleOwner</code> chỉ nói "app foreground hay không". Nếu cần biết Activity nào đang hiển thị để đẩy event riêng → dùng lifecycle của Activity, không dùng process owner.</p>

<h2>Lịch sử phát triển</h2>
<ul>
  <li><strong>Android 1.0</strong>: 7 callback Activity cơ bản ra đời cùng framework.</li>
  <li><strong>2017 — Architecture Components 1.0</strong>: giới thiệu <code>LifecycleOwner</code>, <code>LifecycleObserver</code>, <code>LifecycleRegistry</code>, <code>@OnLifecycleEvent</code>.</li>
  <li><strong>2019 — Lifecycle 2.2</strong>: thêm <code>lifecycleScope</code> (coroutine theo lifecycle).</li>
  <li><strong>2021 — Lifecycle 2.4</strong>: <code>DefaultLifecycleObserver</code> thay thế <code>@OnLifecycleEvent</code> (deprecated); thêm <code>repeatOnLifecycle</code>; <code>launchWhenX</code> bắt đầu bị đánh dấu deprecated.</li>
  <li><strong>2023 — Lifecycle 2.7</strong>: <code>collectAsStateWithLifecycle</code>, <code>LifecycleEventEffect</code>, <code>LifecycleStartEffect</code>, <code>LifecycleResumeEffect</code> trong <code>lifecycle-runtime-compose</code>.</li>
  <li><strong>Hiện tại (2.9.x)</strong>: <code>repeatOnLifecycle</code> là pattern chuẩn; <code>launchWhenX</code> đã bị deprecated hoàn toàn.</li>
</ul>

<h2>Kết nối hệ thống</h2>
<ul>
  <li><strong>Prerequisites</strong>: Không có (Topic cơ bản của Android Components).</li>
  <li><strong>Related Topics</strong>: <code>Activity State Changes</code> — cách Activity destroy/recreate và lưu state. <code>Fragment Lifecycle</code> — lifecycle tương tự nhưng có thêm View lifecycle. <code>Task and Backstack</code> — cách Activity xếp chồng trong task.</li>
  <li><strong>Downstream Topics</strong>: <code>Activity State Changes</code> — khi nào state cần lưu/khôi phục.</li>
</ul>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/topic/libraries/architecture/lifecycle" target="_blank" rel="noopener">Handling lifecycles with lifecycle-aware components — Android Developers</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/coroutines" target="_blank" rel="noopener">Use Kotlin coroutines with lifecycle-aware components — Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/components/activities/process-lifecycle" target="_blank" rel="noopener">Processes and app lifecycle — Android Developers</a></li>
  <li><a href="https://developer.android.com/develop/ui/compose/libraries/lifecycle" target="_blank" rel="noopener">Lifecycle in Jetpack Compose — Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/components/activities/activity-lifecycle" target="_blank" rel="noopener">Activity Lifecycle Overview — Android Developers</a></li>
  <li><a href="https://developer.android.com/reference/androidx/lifecycle/ProcessLifecycleOwner" target="_blank" rel="noopener">ProcessLifecycleOwner — Android Developers Reference</a></li>
  <li><a href="https://developer.android.com/reference/androidx/lifecycle/LifecycleService" target="_blank" rel="noopener">LifecycleService — Android Developers Reference</a></li>
  <li><a href="https://developer.android.com/reference/androidx/lifecycle/LifecycleRegistry" target="_blank" rel="noopener">LifecycleRegistry — Android Developers Reference</a></li>
</ul>
    `
  },

  'android.languages.java_android': {
    title: 'Java Android trong Hệ sinh thái Android',
    summary: 'Nền tảng ngôn ngữ khởi nguồn của Android SDK. Hiểu rõ kiến trúc biên dịch Java, sự khác biệt giữa JVM (Stack-based) và ART/Dalvik (Register-based), Java Desugaring internals, memory leak do inner class và Java-Kotlin Interoperability.',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '30 phút',
    depth: 'deep-dive',
    tags: ['android', 'java', 'JVM', 'ART', 'dalvik', 'desugaring', 'interop'],
    domain: 'Android',
    module: 'Session 01: Ngôn ngữ & Gói ứng dụng',
    prerequisites: [],
    related: ['android.languages.kotlin', 'android.languages.jni', 'android.output_packages.apk_files'],
    learningOutcomes: [
      'Giải thích được luồng biên dịch Java từ bytecode .class qua D8/R8 sang register-based opcode .dex chạy trên ART.',
      'Phân biệt được sự khác biệt bản chất giữa Stack-based JVM và Register-based Dalvik/ART Virtual Machine.',
      'Xử lý được rò rỉ bộ nhớ (Memory Leak) tạo ra bởi Anonymous Inner Classes và Handler trong Java.',
      'Biết khi nào dùng Java Desugaring (coreLibraryDesugaring) để backport tính năng Java 8+ trên Android OS đời cũ.',
      'Phân biệt được Platform Types trong Java-Kotlin Interop để phòng tránh NullPointerException ở runtime.',
      'Cấu hình đúng Gradle compileOptions và coreLibraryDesugaring cho Java Android project.'
    ],
    knowledgeGap: 'Thiếu hiểu biết về Java Android khiến lập trình viên bất lực khi đọc mã nguồn AOSP Framework (AMS, WMS), gặp sự cố rò rỉ bộ nhớ nghiêm trọng do implicit reference trong Inner Class, và dễ bị crash NullPointerException khi tương tác giữa Kotlin và Java legacy code.',
    updatedAt: '2026-07-23',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Khi Andy Rubin và nhóm sáng lập khởi chạy dự án Android năm 2003 (sau đó được Google mua lại năm 2005), hệ điều hành di động đối mặt với thách thức sinh tử: <strong>Làm sao thu hút hàng triệu lập trình viên xây dựng ứng dụng trên một phần cứng cực kỳ giới hạn về RAM (16MB - 64MB) và CPU (200MHz)?</strong></p>
<p>Nếu Android chọn C/C++ làm ngôn ngữ ứng dụng chính:</p>
<ul>
  <li>Tốc độ phát triển cực chậm, lập trình viên phải tự quản lý bộ nhớ (<code>malloc</code>/<code>free</code>), dẫn đến rủi ro crash ứng dụng tràn RAM (<code>Segmentation Fault</code>) liên tục.</li>
  <li>Ứng dụng phải biên dịch lại cho từng kiến trúc CPU (ARM, x86, MIPS), phá vỡ mục tiêu hệ sinh thái mở.</li>
</ul>
<p>Năm 2007, Google chọn Java. Tuy nhiên, thay vì sử dụng tiêu chuẩn Java SE với Java Virtual Machine (JVM) của Sun Microsystems, Google đã tự thiết kế lại toàn bộ Execution Runtime bằng cách tạo ra <strong>Dalvik VM</strong> (sau này là <strong>ART</strong>).</p>
<p>Nếu không nắm vững Java Android bản chất:</p>
<ul>
  <li><strong>Không thể đọc mã nguồn Android Framework (AOSP)</strong> — 80% tầng Android OS Framework (<code>ActivityManagerService</code>, <code>WindowManagerService</code>, <code>PackageManagerService</code>) được viết bằng Java và C++.</li>
  <li><strong>Gặp thảm họa Rò rỉ bộ nhớ (Memory Leak)</strong> — Các lớp ẩn danh (Anonymous Inner Class) và <code>Handler</code> trong Java tự động giữ một tham chiếu ngầm (<em>implicit reference</em>) tới Outer Class (Activity/Fragment), khiến Garbage Collector không thể thu hồi Activity khi đã destroyed.</li>
  <li><strong>Rủi ro Crash NullPointerException (NPE) khi Java-Kotlin Interop</strong> — Khi Kotlin gọi code Java không có annotation <code>@Nullable</code>/<code>@NonNull</code>, Kotlin Compiler sẽ gán kiểu <strong>Platform Type</strong> (<code>T!</code>), vô hiệu hóa cơ chế Null Safety compile-time.</li>
</ul>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được luồng biên dịch Java từ bytecode <code>.class</code> qua D8/R8 sang register-based opcode <code>.dex</code> chạy trên ART.</li>
  <li>Phân biệt được sự khác biệt bản chất giữa Stack-based JVM và Register-based Dalvik/ART Virtual Machine.</li>
  <li>Xử lý được rò rỉ bộ nhớ (Memory Leak) tạo ra bởi Anonymous Inner Classes và Handler trong Java.</li>
  <li>Biết khi nào dùng Java Desugaring (<code>coreLibraryDesugaring</code>) để backport tính năng Java 8+ trên Android OS đời cũ.</li>
  <li>Phân biệt được Platform Types trong Java-Kotlin Interop để phòng tránh NullPointerException ở runtime.</li>
  <li>Cấu hình đúng Gradle <code>compileOptions</code> và <code>coreLibraryDesugaring</code> cho Java Android project.</li>
</ul>

<h2>Java Android là gì?</h2>
<p><strong>Java Android</strong> là việc sử dụng ngôn ngữ lập trình Java kết hợp với <strong>Android SDK (Software Development Kit)</strong> để xây dựng ứng dụng di động chạy trên nền tảng Android.</p>
<p>Điểm mấu chốt cần hiểu: Java Android <strong>không phải</strong> Java SE (Standard Edition) chạy trên JVM thông thường.</p>

<h3>Mental Model: Java SE vs Java Android</h3>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Đặc tính</th>
      <th style="padding:8px 12px;text-align:left;">Java SE (Desktop/Server)</th>
      <th style="padding:8px 12px;text-align:left;">Java Android</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Runtime</td>
      <td style="padding:8px 12px;">JVM (Java Virtual Machine)</td>
      <td style="padding:8px 12px;">ART (Android Runtime) / Dalvik VM</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Kiến trúc VM</td>
      <td style="padding:8px 12px;">Stack-based</td>
      <td style="padding:8px 12px;">Register-based</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Executable</td>
      <td style="padding:8px 12px;"><code>.class</code> → <code>.jar</code> / <code>.war</code></td>
      <td style="padding:8px 12px;"><code>.class</code> → <code>.dex</code> → <code>.apk</code> / <code>.aab</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">UI Framework</td>
      <td style="padding:8px 12px;"><code>java.awt.*</code>, <code>javax.swing.*</code></td>
      <td style="padding:8px 12px;"><code>android.widget.*</code>, <code>android.view.*</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Thư viện chuẩn</td>
      <td style="padding:8px 12px;">Full Java SE API</td>
      <td style="padding:8px 12px;">Subset của Java SE + Android SDK API</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;font-weight:600;">Garbage Collector</td>
      <td style="padding:8px 12px;">G1 GC, ZGC (high throughput)</td>
      <td style="padding:8px 12px;">Concurrent Copying GC (low latency, mobile-optimized)</td>
    </tr>
  </tbody>
</table>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Lưu ý:</strong> Khi nói "viết Java cho Android", thực chất bạn viết Java syntax, nhưng code sẽ chạy trên một runtime engine hoàn toàn khác biệt so với JVM trên máy tính.</div></div>

<h2>Cách hoạt động</h2>

<h3>1. JVM (Stack-based) vs ART/Dalvik (Register-based)</h3>
<p>Mô hình ảo hóa của Java Standard Edition (JVM) và Android Virtual Machine (ART/Dalvik) hoàn toàn khác biệt ở cấp độ kiến trúc phần cứng giả lập:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Đặc tính</th>
      <th style="padding:8px 12px;text-align:left;">JVM (Java SE)</th>
      <th style="padding:8px 12px;text-align:left;">Dalvik / ART (Android)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Kiến trúc VM</td>
      <td style="padding:8px 12px;">Stack-based (Dựa trên Operand Stack)</td>
      <td style="padding:8px 12px;">Register-based (Dựa trên thanh ghi ảo)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Định dạng Executable</td>
      <td style="padding:8px 12px;">Nhiều tập tin <code>.class</code> phân tán</td>
      <td style="padding:8px 12px;">Một tập tin hợp nhất <code>classes.dex</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Kích thước Opcode</td>
      <td style="padding:8px 12px;">1 Byte (256 instructions)</td>
      <td style="padding:8px 12px;">16-bit / 32-bit variable length</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Số lượng lệnh thực thi</td>
      <td style="padding:8px 12px;">Nhiều lệnh hơn (phải push/pop liên tục)</td>
      <td style="padding:8px 12px;">Ít hơn 30-50% số lệnh so với JVM</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;font-weight:600;">Mức tiêu thụ RAM</td>
      <td style="padding:8px 12px;">Cao (nhiều stack frame overhead)</td>
      <td style="padding:8px 12px;">Thấp (tối ưu cho Mobile)</td>
    </tr>
  </tbody>
</table>

<h4>Tại sao Register-based nhanh hơn trên Mobile?</h4>
<p>CPU thật sự trên điện thoại (ARM) sử dụng kiến trúc register. Khi Virtual Machine cũng dùng register-based instructions, việc mapping từ virtual register sang physical register sẽ hiệu quả hơn, giảm số lần truy cập bộ nhớ stack.</p>

<h4>So sánh Bytecode cấp độ Assembly: Phép cộng <code>a = b + c</code></h4>
<p><strong>JVM (Stack-based Execution)</strong> — Cần 4 câu lệnh và 4 lần truy cập bộ nhớ stack:</p>
<pre data-lang="bytecode"><code>iload_1          ; Push giá trị b vào Operand Stack
iload_2          ; Push giá trị c vào Operand Stack
iadd             ; Pop 2 giá trị, cộng lại, push kết quả vào Stack
istore_3         ; Pop kết quả từ Stack lưu vào biến a (slot 3)</code></pre>

<p><strong>Dalvik / ART (Register-based Execution)</strong> — Chỉ cần 1 câu lệnh duy nhất:</p>
<pre data-lang="bytecode"><code>add-int v0, v1, v2   ; Lấy thanh ghi v1 + v2, ghi trực tiếp kết quả vào thanh ghi v0</code></pre>

<div style="text-align:center;margin:1.5em 0;">
  <div style="display:inline-block;background:var(--bg-card,#161b22);border:1px solid var(--border,#30363d);border-radius:12px;padding:1.5em;font-family:monospace;font-size:13px;line-height:2.0;text-align:left;">
    <div style="display:flex;gap:2em;flex-wrap:wrap;justify-content:center;">
      <div style="border:1px dashed #30363d;padding:12px 16px;border-radius:8px;">
        <div style="text-align:center;font-weight:bold;color:#d29922;margin-bottom:8px;">JVM Stack-based (4 steps)</div>
        <div style="color:#8b949e;">1. Push b → Stack</div>
        <div style="color:#8b949e;">2. Push c → Stack</div>
        <div style="color:#8b949e;">3. iadd (Pop &amp; Add)</div>
        <div style="color:#8b949e;">4. Store result → a</div>
      </div>
      <div style="border:1px dashed #30363d;padding:12px 16px;border-radius:8px;">
        <div style="text-align:center;font-weight:bold;color:#3fb950;margin-bottom:8px;">ART Register-based (1 step)</div>
        <div style="color:#58a6ff;font-weight:600;">add-int v0, v1, v2</div>
        <div style="color:#8b949e;font-size:12px;margin-top:4px;">Single instruction, zero stack access</div>
      </div>
    </div>
  </div>
</div>

<h3>2. Luồng biên dịch Android Java: Từ <code>.java</code> đến <code>.dex</code></h3>
<p>Quá trình dịch code Java trên Android không dừng lại ở tệp <code>.class</code> như trên máy tính thông thường:</p>

<div style="text-align:center;margin:1.5em 0;">
  <div style="display:inline-block;background:var(--bg-card,#161b22);border:1px solid var(--border,#30363d);border-radius:12px;padding:1.5em;font-family:monospace;font-size:13px;line-height:2;text-align:left;">
    <div><span style="color:#79c0ff;font-weight:600;">1. Source Code (.java)</span> → <span style="color:#d29922;">javac</span> → <span style="color:#79c0ff;">Bytecode (.class)</span></div>
    <div><span style="color:#79c0ff;font-weight:600;">2. Bytecode (.class)</span> → <span style="color:#d29922;">D8 / R8 &amp; Desugaring</span> → <span style="color:#7546c8;font-weight:bold;">classes.dex</span></div>
    <div><span style="color:#7546c8;font-weight:bold;">3. classes.dex</span> → <span style="color:#d29922;">Packaging</span> → <span style="color:#34d399;font-weight:bold;">APK / AAB</span></div>
    <div><span style="color:#34d399;font-weight:bold;">4. ART Runtime Execution</span> → <span style="color:#8b949e;">AOT (Install time) + JIT (Runtime)</span></div>
  </div>
</div>

<ol>
  <li><strong>Java Compiler (<code>javac</code>)</strong>: Chuyển đổi mã nguồn <code>.java</code> thành Java Bytecode chuẩn dạng <code>.class</code>. Bước này giống hệt Java SE.</li>
  <li><strong>D8 / R8 Compiler</strong>:
    <ul>
      <li><strong>D8</strong>: Đọc các tệp <code>.class</code>, gộp toàn bộ Constant Pools trùng lặp từ hàng trăm class thành một Constant Pool duy nhất. Chuyển đổi từ Stack-based instructions sang Register-based Dalvik Bytecode (<code>.dex</code>).</li>
      <li><strong>R8</strong>: Thay thế ProGuard, thực hiện toàn bộ chức năng của D8 cộng thêm code shrinking, obfuscation và optimization.</li>
    </ul>
  </li>
  <li><strong>Desugaring</strong>: Chuyển đổi các tính năng cú pháp Java 8+ thành bytecode tương thích với các Android OS cũ hơn.</li>
</ol>

<h3>3. Java Desugaring — Backport Java 8+ cho Android cũ</h3>
<h4>Vấn đề: API Level Fragmentation</h4>
<p>Android có hàng trăm phiên bản OS đang hoạt động đồng thời. Thiết bị chạy Android 5.0 (API 21) không có sẵn các class như <code>java.time.LocalDate</code> hay <code>java.util.stream.Stream</code> — những API chỉ tồn tại trên JVM 8+ nhưng chưa được đưa vào Android runtime cũ.</p>

<h4>Hai tầng Desugaring</h4>
<p><strong>Tầng 1 — Syntactic Desugaring (D8 tự xử lý):</strong></p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tính năng Java 8+</th>
      <th style="padding:8px 12px;text-align:left;">Cách D8 desugar</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Lambda expressions</td>
      <td style="padding:8px 12px;">Sinh ra anonymous inner class tương đương</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Method references</td>
      <td style="padding:8px 12px;">Chuyển thành static method call</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Default interface methods</td>
      <td style="padding:8px 12px;">Copy method body vào implementing class</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;"><code>try-with-resources</code></td>
      <td style="padding:8px 12px;">Chuyển thành <code>try-finally</code> block</td>
    </tr>
  </tbody>
</table>

<p><strong>Tầng 2 — Core Library Desugaring (cần cấu hình thêm):</strong></p>
<p>Backport toàn bộ Java 8+ API (<code>java.time.*</code>, <code>java.util.stream.*</code>, <code>java.util.Optional</code>) cho thiết bị cũ bằng cách nhúng một thư viện hỗ trợ vào APK:</p>
<pre data-lang="groovy"><code>// build.gradle (Module: app)
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
        // BẬT Core Library Desugaring
        coreLibraryDesugaringEnabled true
    }
}

dependencies {
    // Thư viện backport java.time, java.util.stream cho API &lt; 26
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:2.1.4'
}</code></pre>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Cảnh báo:</strong> Nếu không bật <code>coreLibraryDesugaringEnabled</code> mà gọi <code>java.time.LocalDate.now()</code> trên thiết bị Android 7.0 (API 24) trở xuống, ứng dụng sẽ crash với <code>NoClassDefFoundError</code> ngay khi runtime cố tìm class <code>LocalDate</code>.</div></div>

<h3>4. ART Runtime Execution</h3>
<p>Khi ứng dụng được cài đặt và chạy trên thiết bị, ART thực thi <code>.dex</code> bytecode qua cơ chế kết hợp:</p>

<h4>Dalvik VM (Android 1.0 — 4.4): JIT thuần túy</h4>
<ul>
  <li><strong>JIT (Just-In-Time)</strong>: Mỗi lần chạy, Dalvik VM biên dịch bytecode <code>.dex</code> sang mã máy ngay tại thời điểm thực thi.</li>
  <li><strong>Nhược điểm</strong>: Tốn CPU và pin mỗi lần khởi chạy app. App mở chậm.</li>
</ul>

<h4>ART (Android 5.0+): AOT + JIT + Profile-Guided</h4>
<ul>
  <li><strong>AOT (Ahead-Of-Time)</strong>: Khi cài đặt app, ART biên dịch toàn bộ <code>.dex</code> thành mã máy (<code>.oat</code> / <code>.art</code> files). App mở nhanh hơn vì code đã sẵn sàng.</li>
  <li><strong>JIT (Android 7.0+)</strong>: ART kết hợp lại JIT để giảm thời gian cài đặt. JIT biên dịch các đoạn code "hot" (chạy thường xuyên) và ghi lại <strong>profile</strong>.</li>
  <li><strong>Profile-Guided Compilation</strong>: Dựa trên profile thu thập từ JIT, ART biên dịch AOT chỉ những method thực sự được dùng (khi thiết bị idle và đang sạc).</li>
</ul>

<h4>ART Garbage Collector</h4>
<p>ART sử dụng <strong>Concurrent Copying GC</strong> được thiết kế riêng cho mobile:</p>
<ul>
  <li><strong>Concurrent</strong>: GC chạy song song với application threads, giảm thiểu Stop-The-World pause (thường &lt; 1ms).</li>
  <li><strong>Generational</strong>: Chia Heap thành Young Generation (đối tượng mới) và Old Generation (đối tượng sống lâu).</li>
  <li><strong>Compacting</strong>: Sau khi thu hồi, GC dồn các object lại gần nhau để giảm memory fragmentation — quan trọng trên thiết bị có RAM hạn chế.</li>
</ul>

<h2>Ví dụ thực tế</h2>

<h3>1. Thảm họa Memory Leak với Implicit Outer Reference</h3>
<p>Trong Java, mọi <strong>Non-Static Inner Class</strong> và <strong>Anonymous Inner Class</strong> luôn âm thầm giữ một pointer <code>OuterClass.this</code>.</p>
<pre data-lang="java"><code>// ❌ BAD PRACTICE: Gây rò rỉ bộ nhớ Activity nghiêm trọng!
public class ProfileActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        // Anonymous Runnable giữ ngầm định tham chiếu đến ProfileActivity.this
        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                updateUI();
            }
        }, 10000);
    }

    private void updateUI() { /* ... */ }
}</code></pre>

<h4>Điều gì xảy ra dưới bộ nhớ khi người dùng xoay màn hình?</h4>
<ol>
  <li>Người dùng bấm Back hoặc xoay màn hình sau 1 giây.</li>
  <li>Android OS gọi <code>onDestroy()</code> trên <code>ProfileActivity</code>.</li>
  <li><code>Handler</code> trong <code>Looper</code> vẫn giữ <code>Runnable</code>. <code>Runnable</code> lại giữ ngầm <code>ProfileActivity.this</code>.</li>
  <li><strong>GC</strong> duyệt cây đối tượng (GC Root) → Thấy <code>ProfileActivity</code> vẫn được tham chiếu → <strong>Không thể thu hồi!</strong></li>
  <li>Kết quả: Toàn bộ View Hierarchy (RAM vài MB đến vài chục MB) bị kẹt lại trong bộ nhớ.</li>
</ol>

<div style="text-align:center;margin:1.5em 0;">
  <div style="display:inline-block;background:var(--bg-card,#161b22);border:1px solid var(--border,#30363d);border-radius:12px;padding:1.5em;font-family:monospace;font-size:13px;line-height:2;text-align:left;">
    <div><span style="color:#f85149;font-weight:600;">GC Root (Main Looper)</span> → <span style="color:#d29922;">Handler</span> → <span style="color:#d29922;">Anonymous Runnable</span></div>
    <div style="padding-left:2em;"><span style="color:#d29922;">↳</span> <span style="color:#8b949e;">implicit reference →</span> <span style="color:#f85149;font-weight:bold;">ProfileActivity (DESTROYED) → View Hierarchy (LEAKED!)</span></div>
  </div>
</div>

<h4>Giải pháp chuẩn: Static Inner Class + WeakReference</h4>
<pre data-lang="java"><code>// ✅ GOOD PRACTICE: Giải phóng hoàn toàn Memory Leak
public class ProfileActivity extends AppCompatActivity {

    private final MyHandler mHandler = new MyHandler(this);

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mHandler.removeCallbacksAndMessages(null);
    }

    // Static Inner Class KHÔNG giữ implicit reference tới Outer Class
    private static class MyHandler extends Handler {
        private final WeakReference&lt;ProfileActivity&gt; mActivityRef;

        MyHandler(ProfileActivity activity) {
            super(Looper.getMainLooper());
            mActivityRef = new WeakReference&lt;&gt;(activity);
        }

        @Override
        public void handleMessage(Message msg) {
            ProfileActivity activity = mActivityRef.get();
            if (activity != null &amp;&amp; !activity.isFinishing() &amp;&amp; !activity.isDestroyed()) {
                activity.updateUI();
            }
        }
    }

    private void updateUI() { /* Safe UI Update */ }
}</code></pre>
<div class="callout callout-success"><span class="callout-icon">✅</span><div class="callout-body"><strong>Tại sao giải pháp này hoạt động:</strong> <code>static class</code> không giữ implicit reference. <code>WeakReference</code> cho phép GC thu hồi Activity. <code>removeCallbacksAndMessages(null)</code> dọn dẹp message queue khi Activity bị destroy.</div></div>

<h3>2. Cạm bẫy Java-Kotlin Interop: Platform Types &amp; Nullability</h3>
<p>Khi gọi mã Java từ Kotlin, nếu mã Java không được đánh dấu Annotation Nullability:</p>
<pre data-lang="java"><code>// Java Repository (Legacy) — KHÔNG CÓ ANNOTATION
public class UserRepository {
    public String getUserName(int userId) {
        if (userId &lt;= 0) return null;
        return "Alex";
    }
}</code></pre>
<pre data-lang="kotlin"><code>// Kotlin Code
val repo = UserRepository()
val name = repo.getUserName(-1) // Kiểu: String! (Platform Type)

// Kotlin Compiler KHÔNG bắt buộc check null!
// Runtime crash: NullPointerException!
println(name.length)</code></pre>

<h4>Tại sao Platform Type nguy hiểm?</h4>
<p>Khi Kotlin nhìn thấy <code>String!</code> (Platform Type), nó <strong>không biết</strong> giá trị có thể null hay không. Kotlin Compiler sẽ không báo lỗi compile-time, không ép check null, âm thầm cho gọi <code>.length</code> → <code>NullPointerException</code> ở runtime.</p>

<h4>Giải pháp: Nullability Annotations</h4>
<pre data-lang="java"><code>import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class UserRepository {
    @Nullable // Kotlin hiểu: String?
    public String getUserName(int userId) {
        if (userId &lt;= 0) return null;
        return "Alex";
    }

    @NonNull // Kotlin hiểu: String (không nullable)
    public String getDefaultName() {
        return "Guest";
    }
}</code></pre>

<h3>3. Cấu hình Gradle cho Java Android Project</h3>
<pre data-lang="groovy"><code>// build.gradle (Module: app)
plugins {
    id 'com.android.application'
}

android {
    namespace 'com.example.myapp'
    compileSdk 34

    defaultConfig {
        applicationId "com.example.myapp"
        minSdk 21
        targetSdk 34
        multiDexEnabled true
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
        coreLibraryDesugaringEnabled true
    }
}

dependencies {
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:2.1.4'
    implementation 'androidx.appcompat:appcompat:1.7.0'
    implementation 'androidx.annotation:annotation:1.9.1'
}</code></pre>

<h2>Sai lầm thường gặp</h2>
<ul>
  <li><strong>Cho rằng Java trên Android giống hệt Java SE</strong> — Android Java không có AWT/Swing, không chạy <code>.jar</code> trực tiếp, và sử dụng GC riêng được tinh chỉnh cho mobile.</li>
  <li><strong>Lạm dụng Anonymous Callbacks cho Async Tasks</strong> — Dùng <code>AsyncTask</code> (đã deprecated từ API 30) bằng anonymous class trong Activity dẫn tới Memory Leak và Crash khi Activity bị recreate.</li>
  <li><strong>Bỏ qua Java Desugaring khi cấu hình Gradle</strong> — Không bật <code>coreLibraryDesugaringEnabled</code> gây crash <code>NoClassDefFoundError</code> trên thiết bị Android cũ.</li>
  <li><strong>Không thêm Nullability Annotations</strong> — Gây Platform Types khi Kotlin gọi vào, dẫn đến NPE ở runtime.</li>
  <li><strong>Sử dụng <code>Serializable</code> thay vì <code>Parcelable</code></strong> — <code>Serializable</code> dùng reflection, chậm gấp 10 lần so với <code>Parcelable</code> trên Android.</li>
  <li><strong>Giữ Activity reference trong Singleton/static field</strong> — Giữ toàn bộ Activity trong bộ nhớ vĩnh viễn. Luôn dùng <code>applicationContext</code> khi cần context trong singleton.</li>
</ul>

<h2>Trade-offs khi chọn Java cho Android</h2>
<h3>Ưu điểm</h3>
<ul>
  <li><strong>Tốc độ biên dịch nhanh</strong> — Java compiler đơn giản hơn Kotlin compiler (ít bước static analysis hơn). Incremental build Java có thể nhanh hơn trong dự án lớn.</li>
  <li><strong>Tương thích 100% với AOSP</strong> — Toàn bộ Android SDK, System Services và mã nguồn mở AOSP đều viết bằng Java.</li>
  <li><strong>Tài nguyên học tập phong phú</strong> — Hàng triệu hướng dẫn, ví dụ và thư viện Java Android tích lũy từ 2007.</li>
  <li><strong>Không cần migration cost</strong> — Các dự án legacy Java lớn không cần chi phí chuyển đổi sang Kotlin.</li>
</ul>
<h3>Nhược điểm</h3>
<ul>
  <li><strong>Cú pháp dài dòng (Boilerplate)</strong> — Phải viết Getters, Setters, <code>equals()</code>, <code>hashCode()</code> thủ công. Kotlin giải quyết bằng <code>data class</code>.</li>
  <li><strong>Thiếu tính năng hiện đại</strong> — Không có Coroutines, Extension Functions, Smart Casts, Sealed Classes.</li>
  <li><strong>Null Safety hoàn toàn không có</strong> — Mọi reference type đều có thể null.</li>
  <li><strong>Không còn là ưu tiên của Google</strong> — Từ 2019, tài liệu và Jetpack libraries đều ưu tiên Kotlin. Compose chỉ hỗ trợ Kotlin.</li>
</ul>

<h3>So sánh nhanh Java vs Kotlin trên Android</h3>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tiêu chí</th>
      <th style="padding:8px 12px;text-align:left;">Java</th>
      <th style="padding:8px 12px;text-align:left;">Kotlin</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Null Safety</td>
      <td style="padding:8px 12px;">Không có (mọi biến có thể null)</td>
      <td style="padding:8px 12px;">Có (<code>String</code> vs <code>String?</code>)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Coroutines</td>
      <td style="padding:8px 12px;">Không (phải dùng Thread/RxJava)</td>
      <td style="padding:8px 12px;">Có (structured concurrency)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Data Class</td>
      <td style="padding:8px 12px;">Viết thủ công 50+ dòng</td>
      <td style="padding:8px 12px;">1 dòng <code>data class User(...)</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Extension Functions</td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Có</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Jetpack Compose</td>
      <td style="padding:8px 12px;">Không hỗ trợ</td>
      <td style="padding:8px 12px;">Hỗ trợ đầy đủ</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Google khuyến nghị</td>
      <td style="padding:8px 12px;">Legacy support</td>
      <td style="padding:8px 12px;">First-class, Kotlin-first</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Build Speed</td>
      <td style="padding:8px 12px;">Nhanh hơn</td>
      <td style="padding:8px 12px;">Chậm hơn (do KAPT/KSP)</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;">AOSP Compatibility</td>
      <td style="padding:8px 12px;">100%</td>
      <td style="padding:8px 12px;">100% (interop)</td>
    </tr>
  </tbody>
</table>

<h2>Lịch sử phát triển</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Phiên bản Android</th>
      <th style="padding:8px 12px;text-align:left;">Java hỗ trợ</th>
      <th style="padding:8px 12px;text-align:left;">Runtime Engine</th>
      <th style="padding:8px 12px;text-align:left;">Đặc điểm nổi bật</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Android 1.0 — 4.4</td>
      <td style="padding:8px 12px;">Java 5 / 6</td>
      <td style="padding:8px 12px;">Dalvik VM</td>
      <td style="padding:8px 12px;">JIT Compilation, kiến trúc Bytecode <code>.dex</code>.</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Android 5.0 — 6.0</td>
      <td style="padding:8px 12px;">Java 7</td>
      <td style="padding:8px 12px;">ART</td>
      <td style="padding:8px 12px;">Giới thiệu ART với AOT Ahead-Of-Time compilation.</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Android 7.0 — 11</td>
      <td style="padding:8px 12px;">Java 8 Desugaring</td>
      <td style="padding:8px 12px;">ART (JIT + AOT)</td>
      <td style="padding:8px 12px;">Hỗ trợ Lambda, Stream API qua D8 desugaring.</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;">Android 12 — 15+</td>
      <td style="padding:8px 12px;">Java 11 / 17</td>
      <td style="padding:8px 12px;">ART Core Modularized</td>
      <td style="padding:8px 12px;">Cập nhật ART độc lập qua Google Play System Updates.</td>
    </tr>
  </tbody>
</table>

<h2>Edge Cases</h2>
<h3>Multidex: Giới hạn 64K Methods</h3>
<p>Mỗi file <code>.dex</code> chỉ có thể tham chiếu tối đa 65,536 methods. Khi vượt quá:</p>
<ul>
  <li>Build tool tự động tách ra nhiều file <code>.dex</code> (<code>classes.dex</code>, <code>classes2.dex</code>).</li>
  <li>Trên Android 5.0+ (ART): Multidex được hỗ trợ native.</li>
  <li>Trên Android 4.4 trở xuống (Dalvik): Cần thêm <code>androidx.multidex:multidex</code> và extends <code>MultiDexApplication</code>.</li>
</ul>

<h3>ProGuard/R8 loại bỏ quá nhiều code</h3>
<p>Khi bật minification bằng R8, nếu không cấu hình <code>proguard-rules.pro</code> đúng cách, R8 có thể xóa các class/method được gọi qua reflection (JSON serialization, JNI calls), gây crash <code>ClassNotFoundException</code> ở runtime.</p>

<h2>Kết nối hệ thống</h2>
<ul>
  <li><strong>Prerequisites</strong>: Cấu trúc hệ điều hành máy tính cơ bản (Stack vs Heap memory, Process, Thread).</li>
  <li><strong>Related Topics</strong>:
    <ul>
      <li><code>android.languages.kotlin</code>: Ngôn ngữ First-Class kế thừa và tương tác trực tiếp với Java.</li>
      <li><code>android.languages.jni</code>: Cầu nối giữa Java/ART với mã nguồn C/C++.</li>
      <li><code>android.output_packages.apk_files</code>: Nơi chứa tập tin <code>classes.dex</code> sau khi biên dịch Java.</li>
    </ul>
  </li>
  <li><strong>Downstream Topics</strong>:
    <ul>
      <li><code>android.component.activity.lifecycle</code>: Nơi các Java Object references cần được dọn dẹp để tránh Memory Leak.</li>
    </ul>
  </li>
</ul>

<h2>Developer Curiosity Checklist</h2>
<ol>
  <li><strong>Why was this created?</strong> Để mang lại ngôn ngữ hướng đối tượng an toàn bộ nhớ, đa nền tảng cho hệ điều hành di động mở đầu tiên năm 2007.</li>
  <li><strong>What problem does it solve?</strong> Giải quyết rủi ro Memory Leak thủ công (<code>malloc</code>/<code>free</code>) của C/C++ và khả năng portable trên nhiều phần cứng.</li>
  <li><strong>What happens if it doesn't exist?</strong> Android Framework (AOSP) không có tầng ngôn ngữ cấp cao để kết nối kernel C/C++ với ứng dụng người dùng.</li>
  <li><strong>How does Android implement it internally?</strong> <code>javac</code> → <code>.class</code> → <code>D8/R8</code> → <code>.dex</code> → ART với JIT/AOT profile compilation.</li>
  <li><strong>What misconceptions do developers have?</strong> Nghĩ Java Android chạy trên JVM tiêu chuẩn và giống hệt Java SE.</li>
  <li><strong>What trade-offs does it introduce?</strong> Tốn RAM cho GC so với native C/C++, nhưng phát triển nhanh hơn. Kotlin hiện đại hơn nhưng Java cần cho AOSP/legacy.</li>
  <li><strong>What are the edge cases?</strong> 64K Method Limit và <code>NoClassDefFoundError</code> do thiếu Desugaring.</li>
  <li><strong>What are the real-world problems?</strong> Memory Leak qua Anonymous Handlers và NPE khi interop với Kotlin.</li>
  <li><strong>How is it connected to the Android system?</strong> Ngôn ngữ gốc của toàn bộ AOSP System Services (<code>AMS</code>, <code>WMS</code>, <code>PMS</code>).</li>
  <li><strong>What should developers learn next?</strong> <code>android.languages.kotlin</code> để khai thác Null Safety và Coroutines.</li>
</ol>

    `
  },

  'session-01-overview': {
    title: 'Session 01 Overview: Ngôn ngữ & Gói ứng dụng',
    summary: 'Tổng quan kiến thức nền móng về các ngôn ngữ phát triển Android (Java, Kotlin, JNI) và cơ chế đóng gói, xuất bản ứng dụng (APK, AAB).',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '5 phút',
    depth: 'overview',
    tags: ['android', 'session01', 'overview', 'languages', 'build'],
    domain: 'Android',
    module: 'Session 01: Ngôn ngữ & Gói ứng dụng',
    prerequisites: [],
    related: ['android.languages.java_android', 'android.languages.kotlin', 'android.languages.jni', 'android.output_packages.apk_files', 'android.output_packages.aab_files'],
    learningOutcomes: [
      'Nắm bắt lộ trình phát triển ngôn ngữ trên Android từ Java đến Kotlin và Native C++.',
      'Hiểu rõ sự khác biệt giữa hai định dạng đóng gói APK truyền thống và Android App Bundle (AAB).',
      'Định hướng thứ tự học tập hiệu quả trong Session 01.'
    ],
    knowledgeGap: 'Bỏ qua phần tổng quan sẽ khiến học viên mất cái nhìn toàn cục về mối liên hệ giữa cú pháp ngôn ngữ, trình biên dịch bytecode và định dạng xuất bản gói ứng dụng.',
    updatedAt: '2026-07-22',
    content: `
<h2>Tổng quan Session 01</h2>
<p>Session 01 là bước đệm đầu tiên và quan trọng nhất trong lộ trình làm chủ phát triển ứng dụng Android OS. Nơi đây cung cấp cái nhìn toàn diện về <strong>Lập trình ngôn ngữ</strong> và <strong>Quy trình đóng gói phần mềm</strong>.</p>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1em;margin:1.5em 0;">
  <div style="background:var(--bg-card,#161b22);border:1px solid var(--border,#30363d);border-radius:10px;padding:1.2em;">
    <h3 style="margin-top:0;color:#58a6ff;">1. Ngôn ngữ Lập trình</h3>
    <ul style="padding-left:1.2em;margin-bottom:0;">
      <li><strong>Java Android</strong> — Nền tảng khởi đầu, AOSP Framework.</li>
      <li><strong>Kotlin Core</strong> — Ngôn ngữ First-Class hiện đại, Null Safety.</li>
      <li><strong>JNI & C/C++ Native</strong> — Giao tiếp native hiệu năng cao qua NDK.</li>
    </ul>
  </div>
  <div style="background:var(--bg-card,#161b22);border:1px solid var(--border,#30363d);border-radius:10px;padding:1.2em;">
    <h3 style="margin-top:0;color:#3fb950;">2. Gói Ứng dụng & Xuất bản</h3>
    <ul style="padding-left:1.2em;margin-bottom:0;">
      <li><strong>Gói ứng dụng APK</strong> — Cấu trúc ZIP, DEX, Signature Schemes.</li>
      <li><strong>Android App Bundle (AAB)</strong> — Dynamic Delivery, Split APKs.</li>
    </ul>
  </div>
</div>
    `
  },

  'session-05-overview': {
    title: 'Session 05 Overview: Data Store, Thread & Networking',
    summary: 'Tổng quan Session 05 — ba trụ cột làm nên ứng dụng Android thực tế: Data Store (SharedPreferences, DataStore, Room), Working with Thread và Networking. Hiểu vị trí của session trong lộ trình, mối liên hệ giữa các topic, điều kiện tiên quyết từ Session 01-04 và nền tảng nó tạo ra cho các session sau.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '20 phút',
    depth: 'overview',
    tags: ['android', 'session05', 'overview', 'data-store', 'room', 'datastore', 'shared-preferences', 'threading', 'networking'],
    domain: 'Android',
    module: 'Session 05: Data Store, Thread & Networking',
    prerequisites: ['android.languages.kotlin', 'manifest-tags', 'activity-lifecycle'],
    related: ['android.languages.kotlin', 'activity-lifecycle'],
    learningOutcomes: [
      'Nắm được vị trí của Session 05 trong lộ trình học và vai trò bắc cầu của nó sang Session 06-08.',
      'Chọn đúng công cụ lưu trữ: DataStore cho key-value, Room cho dữ liệu có cấu trúc.',
      'Hiểu vì sao không được chạy việc nặng trên UI thread và cách chuyển sang background thread.',
      'Nắm nguyên lý gọi API, xử lý lỗi mạng và theo dõi trạng thái kết nối.',
      'Xác định được thứ tự học và mối liên hệ giữa 5.1 Data Store, 5.2 Thread, 5.3 Networking.'
    ],
    knowledgeGap: 'Bỏ qua phần tổng quan khiến người học mất cái nhìn toàn cục về luồng dữ liệu của một app thực tế, dẫn đến chọn sai công cụ lưu trữ, dính ANR vì không hiểu thread, và mù mờ về xử lý lỗi mạng.',
    updatedAt: '2026-08-06',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Sau Session 01-04, bạn đã biết viết một app có UI (Activity, Fragment), khai báo nó trong Manifest và giao tiếp giữa các màn hình bằng Intent. Nhưng app mới chỉ là <strong>vỏ bọc</strong>: màn hình chạy được nhưng chưa có gì để làm.</p>
<p>Một app Android thực tế xoay quanh ba câu hỏi lớn:</p>
<ol>
  <li><strong>Dữ liệu ở đâu?</strong> — Đăng nhập xong, token lưu ở đâu? Danh sách sản phẩm tải về rồi, lần sau mở app có cần tải lại không? Đó là bài toán <strong>Data Store</strong>.</li>
  <li><strong>Việc nặng chạy ở đâu?</strong> — Ghi 1.000 dòng vào database, parse JSON lớn, nén ảnh... chạy trên UI thread sẽ đóng băng app. Đó là bài toán <strong>Working with Thread</strong>.</li>
  <li><strong>Dữ liệu lấy từ đâu?</strong> — App không thể tự biết giá mới nhất, tin tức mới nhất. Phải gọi lên server qua HTTP. Đó là bài toán <strong>Networking</strong>.</li>
</ol>
<p>Session 05 trả lời cả ba câu hỏi này. Nó là <strong>trái tim kỹ thuật</strong> của mọi app thương mại thực tế — không có session này, bạn chỉ viết được demo, không viết được product.</p>
<pre data-lang="text"><code>Session 05 = Dữ liệu (Data Store) + Xử lý (Thread) + Truyền tải (Networking)</code></pre>
<p>Nếu bỏ qua session này, bạn sẽ gặp những lỗi kinh điển của lập trình viên mới: app crash vì chạy việc nặng trên UI thread, mất dữ liệu khi user tắt app, đọc ghi database sai cách làm app chậm dần, và mù mờ về luồng request API.</p>

<h2>Vị trí Session 05 trong lộ trình</h2>
<div class="mermaid">
flowchart LR
    subgraph NenTang ["Đã học (Session 01-04)"]
        S01[Session 01<br/>Ngôn ngữ &amp; Gói ứng dụng]
        S02[Session 02<br/>Hệ điều hành &amp; Process]
        S03[Session 03<br/>Phần cứng &amp; Kernel]
        S04[Session 04<br/>Manifest &amp; Components]
    end

    subgraph HienTai ["Session 05 (bài này)"]
        S05[Data Store + Thread + Networking]
    end

    subgraph TiepTheo ["Sẽ học"]
        S06[Session 06<br/>LiveData, ViewModel, Paging]
        S07[Session 07<br/>Pattern &amp; Architecture]
        S08[Session 08<br/>Retrofit, Coroutines, RxJava]
    end

    S01 --> S02 --> S03 --> S04 --> S05
    S05 --> S06 --> S07 --> S08
</div>
<p>Vai trò của Session 05 trong lộ trình:</p>
<ul>
  <li><strong>Kế thừa</strong>: dùng Kotlin (Session 01), hiểu app chạy trong process/quyền (Session 02), biết Activity/Fragment là gì (Session 04).</li>
  <li><strong>Bắc cầu</strong>: đây là session đầu tiên làm việc với <strong>dữ liệu thật</strong> và <strong>tác vụ bất đồng bộ</strong> — hai khái niệm mà mọi session sau (LiveData, ViewModel, Paging, Retrofit, Coroutines, RxJava) đều xây dựng lên trên.</li>
  <li><strong>Khởi động tư duy async</strong>: lần đầu bạn đối mặt với callback, background thread, và câu hỏi "kết quả trả về khi nào?". Tư duy này được đào sâu ở Session 08 (Coroutines, RxJava).</li>
</ul>

<h2>Session 05 học những gì?</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Phần</th>
      <th style="padding:8px 12px;text-align:left;">Topic</th>
      <th style="padding:8px 12px;text-align:left;">Câu hỏi trả lời</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">5.1 Data Store</td><td style="padding:8px 12px;">Key-Value Storage</td><td style="padding:8px 12px;">Lưu dữ liệu nhỏ dạng cặp khóa-giá trị bằng gì?</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">5.1 Data Store</td><td style="padding:8px 12px;">Relational Database (Room)</td><td style="padding:8px 12px;">Lưu dữ liệu có cấu trúc, quan hệ, truy vấn phức tạp bằng gì?</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">5.1 Data Store</td><td style="padding:8px 12px;">Advanced Room</td><td style="padding:8px 12px;">App đã phát hành mà thay đổi database thì sao? Truy vấn nhanh hơn thế nào?</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">5.1 Data Store</td><td style="padding:8px 12px;">Async Transactions &amp; Flow</td><td style="padding:8px 12px;">Đọc ghi database trong thread nào cho đúng, và theo dõi dữ liệu tự động như thế nào?</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">5.2 Working with Thread</td><td style="padding:8px 12px;">Thread</td><td style="padding:8px 12px;">Việc nặng (IO, tính toán) chạy ở đâu để UI không đóng băng?</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">5.3 Networking</td><td style="padding:8px 12px;">Networking</td><td style="padding:8px 12px;">Gọi API như thế nào, xử lý mất mạng, và theo dõi trạng thái kết nối ra sao?</td></tr>
  </tbody>
</table>

<h3>5.1 Data Store — Dữ liệu ở đâu?</h3>
<p>Đây là phần lớn nhất và quan trọng nhất của Session 05, gồm 4 topic đi từ đơn giản đến phức tạp.</p>

<h4>5.1.1 Key-Value Storage (SharedPreferences &amp; DataStore)</h4>
<p><strong>Vấn đề cần giải quyết</strong>: lưu một lượng nhỏ dữ liệu đơn giản dạng khóa → giá trị: token đăng nhập, cờ "đã xem hướng dẫn lần đầu", theme đã chọn, số lần mở app. Không cần truy vấn phức tạp.</p>
<p><strong>Bản chất</strong>: một file XML (SharedPreferences) hoặc file protobuf/Preferences DataStore chứa toàn bộ cặp khóa-giá trị. Đọc toàn bộ vào bộ nhớ khi cần.</p>
<p><strong>Khi nào dùng</strong>:</p>
<ul>
  <li>Nên: token, session, cài đặt UI, cache nhỏ, dữ liệu không cần truy vấn.</li>
  <li>Không nên: dữ liệu lớn, dữ liệu cần tìm kiếm/sắp xếp, dữ liệu quan hệ.</li>
</ul>
<p><strong>Điểm mấu chốt khi code</strong> (DataStore — bản thay thế hiện đại của SharedPreferences):</p>
<pre data-lang="kotlin"><code>// DataStore: an toàn với coroutine, tự theo dõi thay đổi qua Flow
val Context.dataStore by preferencesDataStore(name = "user_prefs")

val USER_TOKEN = stringPreferencesKey("user_token")

// Ghi
suspend fun saveToken(token: String) {
    context.dataStore.edit { prefs ->
        prefs[USER_TOKEN] = token
    }
}

// Đọc — trả về Flow, UI tự cập nhật khi dữ liệu đổi
val tokenFlow: Flow&lt;String?&gt; = context.dataStore.data
    .map { prefs -&gt; prefs[USER_TOKEN] }</code></pre>

<h4>5.1.2 Relational Database (Room)</h4>
<p><strong>Vấn đề cần giải quyết</strong>: lưu dữ liệu có cấu trúc, số lượng lớn, cần truy vấn theo nhiều điều kiện: danh sách sản phẩm, lịch sử đơn hàng, hồ sơ người dùng. SharedPreferences không làm được.</p>
<p><strong>Bản chất</strong>: Room là <strong>ORM (Object-Relational Mapping)</strong> bọc trên SQLite — bạn khai báo Entity, DAO, Database, Room tự sinh code SQLite. Kiểm tra lỗi truy vấn ngay lúc <strong>biên dịch</strong> (compile-time) thay vì lúc chạy.</p>
<p><strong>Khi nào dùng</strong>: dữ liệu có cấu trúc, cần truy vấn (WHERE, JOIN, ORDER BY), dữ liệu offline-first (app chính là database).</p>
<p><strong>Điểm mấu chốt khi code</strong>:</p>
<pre data-lang="kotlin"><code>@Entity(tableName = "products")
data class Product(
    @PrimaryKey val id: Int,
    val name: String,
    val price: Double
)

@Dao
interface ProductDao {
    @Query("SELECT * FROM products WHERE price &gt; :minPrice ORDER BY price DESC")
    suspend fun getExpensiveProducts(minPrice: Double): List&lt;Product&gt;
}

@Database(entities = [Product::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun productDao(): ProductDao
}</code></pre>

<h4>5.1.3 Advanced Room (Migration &amp; Indexing)</h4>
<p><strong>Vấn đề cần giải quyết</strong>: app đã phát hành, user đã có database cũ (version 1). Bạn thêm cột, thêm bảng cho bản update (version 2). Nếu không xử lý, app của user sẽ <strong>crash</strong> vì schema không khớp. Đồng thời truy vấn chậm dần khi dữ liệu lớn.</p>
<p><strong>Bản chất</strong>: hai kỹ thuật:</p>
<ul>
  <li><strong>Migration</strong>: dạy Room cách chuyển database từ version cũ sang mới, giữ nguyên dữ liệu user.</li>
  <li><strong>Indexing</strong>: đánh index cho cột hay dùng trong WHERE/JOIN để truy vấn không quét toàn bộ bảng.</li>
</ul>
<p><strong>Điểm mấu chốt khi code</strong>:</p>
<pre data-lang="kotlin"><code>val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(db: SupportSQLiteDatabase) {
        db.execSQL("ALTER TABLE products ADD COLUMN stock_count INTEGER NOT NULL DEFAULT 0")
    }
}

// Đăng ký khi build database
Room.databaseBuilder(context, AppDatabase::class.java, "app.db")
    .addMigrations(MIGRATION_1_2)
    .build()

// Index cho cột truy vấn thường xuyên
@Entity(
    tableName = "products",
    indices = [Index(value = ["category_id"])]
)
data class Product(...)</code></pre>

<h4>5.1.4 Async Transactions &amp; Flow</h4>
<p><strong>Vấn đề cần giải quyết</strong>: database là tài nguyên dùng chung và là điểm chậm. Ghi trên UI thread → app đơ. Ghi cùng lúc từ nhiều nơi → dữ liệu hỏng. Ngoài ra, UI cần <strong>tự cập nhật</strong> khi database thay đổi thay vì phải tự hỏi lại.</p>
<p><strong>Bản chất</strong>: Room tích hợp sẵn coroutine (suspend, Flow) — đọc ghi luôn chạy trên background thread, và DAO có thể trả về <code>Flow</code> để UI nhận dữ liệu mới mỗi khi bảng thay đổi.</p>
<p><strong>Điểm mấu chốt khi code</strong>:</p>
<pre data-lang="kotlin"><code>// Đọc theo dõi tự động — mỗi lần bảng products đổi, Flow emit lại
@Query("SELECT * FROM products")
fun observeAllProducts(): Flow&lt;List&lt;Product&gt;&gt;

// Ghi trong transaction — đảm bảo toàn vẹn khi ghi nhiều bảng
@Transaction
suspend fun checkout(cartItems: List&lt;CartItem&gt;, total: Double) {
    // Các thao tác trong đây chạy trong một transaction
    // Nếu một bước fail, toàn bộ rollback
}</code></pre>

<h3>5.2 Working with Thread — Việc nặng chạy ở đâu?</h3>
<p><strong>Vấn đề cần giải quyết</strong>: UI thread (main thread) chịu trách nhiệm vẽ màn hình. Nếu nó bận xử lý việc khác quá lâu (&gt; 16ms mỗi frame), app đóng băng (jank) và nếu lâu hơn 5 giây thì <strong>ANR (Application Not Responding)</strong> — hệ thống hỏi user "đóng hay chờ?".</p>
<p><strong>Bản chất</strong>: thread là đơn vị thực thi trong process. App có UI thread (chỉ được cập nhật UI ở đây) và cần các background thread cho việc IO/tính toán nặng.</p>
<p><strong>Khi nào dùng</strong>:</p>
<ul>
  <li>Phải dùng background thread: đọc ghi database, gọi API, đọc file, parse JSON, nén ảnh.</li>
  <li>Không dùng background thread: cập nhật View, thao tác nhanh trong bộ nhớ.</li>
</ul>
<p><strong>Điểm mấu chốt khi code</strong> (cách truyền thống — Session 08 sẽ thay thế bằng Coroutines):</p>
<pre data-lang="kotlin"><code>// Sai: gọi API trên UI thread → ANR
fun loadDataBad() {
    val result = api.fetchData()   // NetworkOnMainThreadException hoặc ANR
    textView.text = result
}

// Đúng: chạy trên background thread, trả kết quả về UI thread
fun loadDataGood() {
    Thread {
        val result = api.fetchData()
        runOnUiThread {
            textView.text = result
        }
    }.start()
}</code></pre>

<h3>5.3 Networking — Dữ liệu lấy từ đâu?</h3>
<p><strong>Vấn đề cần giải quyết</strong>: app cần dữ liệu từ server: danh sách sản phẩm, giá mới, tin tức. Đồng thời mạng không phải lúc nào cũng có — phải xử lý request thất bại, timeout, mất kết nối và biết khi nào mạng khôi phục để gọi lại.</p>
<p><strong>Bản chất</strong>: Networking trong Session 05 gồm 3 mảng:</p>
<ol>
  <li><strong>Request API</strong> — gửi HTTP request, nhận response (dùng thư viện như Retrofit/OkHttp, được học sâu ở Session 08; ở đây học nguyên lý request-response).</li>
  <li><strong>Handle event network</strong> — xử lý thành công/thất bại: retry, timeout, hiển thị lỗi thân thiện.</li>
  <li><strong>Handle connection state</strong> — theo dõi trạng thái mạng (Wifi/4G/offline) qua ConnectivityManager, phản hồi UI tương ứng (ví dụ: offline banner).</li>
</ol>
<p><strong>Khi nào dùng</strong>: app nào hiển thị dữ liệu không nằm sẵn trong app — gần như mọi app thương mại.</p>
<p><strong>Điểm mấu chốt khi code</strong> (theo dõi trạng thái mạng):</p>
<pre data-lang="kotlin"><code>val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

// Đăng ký lắng nghe thay đổi kết nối
val networkCallback = object : ConnectivityManager.NetworkCallback() {
    override fun onAvailable(network: Network) {
        // Mạng có — gọi lại API bị fail trước đó
    }

    override fun onLost(network: Network) {
        // Mất mạng — hiển thị offline banner, dừng retry
    }
}

connectivityManager.registerDefaultNetworkCallback(networkCallback)</code></pre>

<h2>Mối liên hệ giữa ba phần</h2>
<p>Ba phần không tồn tại độc lập — chúng kết hợp thành luồng dữ liệu chuẩn của một app:</p>
<div class="mermaid">
flowchart TB
    UI[UI Thread - hiển thị] -->|yêu cầu dữ liệu| VM[Logic app]
    VM -->|gọi API| NET[Networking 5.3]
    NET -->|response: JSON| THREAD[Background Thread 5.2]
    THREAD -->|parse, ghi vào cache| ROOM[Room Database 5.1]
    ROOM -->|Flow - tự động đẩy dữ liệu mới| UI
    NET -->|mất mạng?| STATE[Connection State 5.3]
    STATE -->|offline → đọc cache| ROOM
</div>
<p>Ví dụ thực tế — app thương mại điện tử:</p>
<ol>
  <li>User mở app, mạng có → <strong>Networking (5.3)</strong> gọi API lấy danh sách sản phẩm.</li>
  <li>Response JSON được parse trên <strong>background thread (5.2)</strong> — không block UI.</li>
  <li>Dữ liệu được lưu vào <strong>Room (5.1)</strong> làm cache offline.</li>
  <li>UI lắng nghe <strong>Flow từ Room (5.1.4)</strong> — tự cập nhật mỗi khi có dữ liệu mới, kể cả khi đang offline.</li>
</ol>

<h2>Điều kiện tiên quyết từ Session 01-04</h2>
<p>Trước khi bắt đầu Session 05, bạn cần nắm:</p>
<ul>
  <li><strong>Kotlin căn bản</strong> (Session 01): class, data class, interface, lambda, extension function. Room và code networking đều viết bằng Kotlin.</li>
  <li><strong>Manifest &amp; Activity</strong> (Session 04): hiểu được Activity/Fragment là gì — vì bạn sẽ đọc ghi database ngay trong các thành phần này. Đặc biệt nắm lifecycle (onCreate/onDestroy) để biết thời điểm khởi tạo/hủy tài nguyên.</li>
  <li><strong>Process &amp; app chạy thế nào</strong> (Session 02): hữu ích để hiểu vì sao app bị giết khi ở background — liên quan trực tiếp đến việc dữ liệu có bị mất hay không.</li>
</ul>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Nếu chưa vững Kotlin, hãy ôn lại <code>android.languages.kotlin</code> trước — toàn bộ session này là Kotlin.</div></div>

<h2>Sau khi học xong Session 05, bạn làm được gì?</h2>
<ul>
  <li>Chọn đúng công cụ lưu trữ: DataStore cho key-value, Room cho dữ liệu có cấu trúc.</li>
  <li>Viết được Entity/DAO/Database, migration an toàn khi nâng version, index cho truy vấn nhanh.</li>
  <li>Đọc ghi database không block UI, theo dõi dữ liệu tự động bằng Flow.</li>
  <li>Hiểu vì sao không được chạy việc nặng trên UI thread và cách chuyển sang background thread.</li>
  <li>Gọi API, xử lý lỗi mạng, và phản ứng với trạng thái kết nối (online/offline).</li>
</ul>

<h2>Nền tảng cho các session tiếp theo</h2>
<p>Session 05 là nền tảng bắt buộc cho những thứ bạn sẽ học sau:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Session sau</th>
      <th style="padding:8px 12px;text-align:left;">Phụ thuộc vào Session 05 như thế nào</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">Session 06 — LiveData, ViewModel, Paging</td><td style="padding:8px 12px;">Paging tải dữ liệu từ Room từng trang; ViewModel là nơi điều phối đọc ghi.</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">Session 07 — Pattern &amp; Architecture</td><td style="padding:8px 12px;">MVVM/Clean Architecture tổ chức Data Layer — mà Room/DataStore/Network là Data Layer thật sự.</td></tr>
    <tr><td style="padding:8px 12px;font-weight:600;">Session 08 — Retrofit, Coroutines, RxJava</td><td style="padding:8px 12px;">Retrofit thay lớp Networking thô bằng thư viện chuẩn; Coroutines thay thread thủ công bằng cơ chế hiện đại — khái niệm async đã quen từ 5.2.</td></tr>
  </tbody>
</table>

<h2>Thứ tự học đề xuất</h2>
<div class="mermaid">
flowchart LR
    KV[5.1.1<br/>Key-Value] --> RM[5.1.2<br/>Room cơ bản]
    RM --> AR[5.1.3<br/>Room nâng cao]
    AR --> AT[5.1.4<br/>Async &amp; Flow]
    AT --> TH[5.2<br/>Working with Thread]
    TH --> NT[5.3<br/>Networking]
</div>
<ol>
  <li><strong>5.1.1 → 5.1.2</strong>: đi từ lưu trữ đơn giản đến database thật sự — hiểu vì sao cần Room sau khi chạm trần giới hạn của Key-Value.</li>
  <li><strong>5.1.2 → 5.1.3 → 5.1.4</strong>: trong Room, học cách dùng cơ bản trước, rồi mới tới migration/index, cuối cùng là async/Flow — vì 5.1.4 giả định bạn đã biết DAO là gì.</li>
  <li><strong>5.1 → 5.2</strong>: hiểu database chậm → mới hiểu vì sao cần thread.</li>
  <li><strong>5.2 → 5.3</strong>: networking luôn cần chạy trên background thread — 5.2 cho bạn công cụ đó.</li>
</ol>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Đừng học thuộc API.</strong> Session 05 có nhiều class, annotation (Entity, Dao, Query, Migration, Index...). Mục tiêu không phải nhớ hết — mục tiêu là hiểu <strong>bản chất</strong>: dữ liệu nên nằm ở đâu, việc nặng chạy ở đâu, dữ liệu đến từ đâu. Cú pháp cụ thể tra cứu khi cần.</div></div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Đừng bỏ qua phần Thread.</strong> Nhiều người học vội nhảy thẳng vào Room/Networking rồi dính ANR, crash, bug dữ liệu lẫn lộn vì không hiểu thread. 5.2 tuy ngắn nhưng là gốc của mọi vấn đề async sau này.</div></div>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/training/data-storage" target="_blank" rel="noopener">Data and file storage overview — Android Developers</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/datastore" target="_blank" rel="noopener">DataStore — Android Developers</a></li>
  <li><a href="https://developer.android.com/training/data-storage/room" target="_blank" rel="noopener">Room persistence library — Android Developers</a></li>
  <li><a href="https://developer.android.com/training/data-storage/room/migrating-db-versions" target="_blank" rel="noopener">Room migrations — Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/components/processes-and-threads" target="_blank" rel="noopener">Processes and threads overview — Android Developers</a></li>
  <li><a href="https://developer.android.com/reference/android/net/ConnectivityManager" target="_blank" rel="noopener">ConnectivityManager — Android Developers</a></li>
  <li><a href="https://developer.android.com/training/data-storage/room/async-query" target="_blank" rel="noopener">Support for coroutines in Room — Android Developers</a></li>
</ul>
    `
  },

  'android.languages.kotlin': {
    title: 'Kotlin trong Phát triển Ứng dụng Android',
    summary: 'Ngôn ngữ First-Class chính thức cho Android. Tìm hiểu bản chất Null Safety bytecode intrinsics, Extension Functions dưới dạng static call, Inline Functions / Reified types, và kỹ thuật Java Interop nâng cao.',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '25 phút',
    depth: 'deep-dive',
    tags: ['android', 'kotlin', 'null-safety', 'inline', 'extension-functions', 'interop'],
    domain: 'Android',
    module: 'Session 01: Ngôn ngữ & Gói ứng dụng',
    prerequisites: ['android.languages.java_android'],
    related: ['android.languages.jni', 'android.output_packages.apk_files'],
    learningOutcomes: [
      'Giải thích được cơ chế Null Safety của Kotlin dưới cấp độ bytecode thông qua Intrinsics.checkNotNull.',
      'Phân biệt được cơ chế biên dịch của Extension Functions, Inline Functions và Reified Type Parameters.',
      'Xử lý được tương tác hai chiều với Java (Java Interop) sử dụng @JvmStatic, @JvmOverloads và @JvmField.',
      'Biết khi nào dùng inline functions để tránh overhead tạo đối tượng Lambda và khi nào nên tránh để không phình Bytecode.'
    ],
    knowledgeGap: 'Không hiểu sâu bản chất biên dịch của Kotlin sẽ khiến lập trình viên lạm dụng inline functions gây phình file DEX, bị crash bối rối khi interop với Java code, và viết mã Kotlin bằng tư duy "Java chuyển cú pháp" làm lãng phí sức mạnh của ngôn ngữ.',
    updatedAt: '2026-07-22',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Trước năm 2017, Java là ngôn ngữ thống trị trên Android nhưng tồn tại những hạn chế như thảm họa NullPointerException, mã nguồn dài dòng (verbosity) và thiếu các tính năng lập trình chức năng hiện đại.</p>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được cơ chế Null Safety của Kotlin và cách tránh NullPointerException ở compile-time.</li>
  <li>Triển khai được Extension Functions và High-Order Functions để tối ưu hóa mã nguồn.</li>
  <li>Xử lý được tương tác hai chiều với Java (Java Interop) sử dụng các Annotation Kotlin chuẩn.</li>
  <li>Biết khi nào dùng inline functions và reified type parameters trong Kotlin.</li>
</ul>

<h2>Kotlin là gì?</h2>
<p><strong>Kotlin</strong> là ngôn ngữ tĩnh (statically typed), hiện đại chạy trên JVM được JetBrains phát triển và Google lựa chọn làm ngôn ngữ <strong>Kotlin-First</strong> chính thức cho Android.</p>

<h2>Cách hoạt động</h2>
<h3>1. Hệ thống Null Safety</h3>
<p>Kotlin phân biệt giữa Non-Nullable Type (<code>String</code>) và Nullable Type (<code>String?</code>) ở cấp độ Compiler.</p>

<h3>2. Cơ chế Extension Functions</h3>
<p>Extension Functions được <code>kotlinc</code> biên dịch thành các hàm <code>public static final</code> trong Java Bytecode, nhận instance làm tham số đầu tiên.</p>

<h2>Ví dụ thực tế</h2>
<pre data-lang="kotlin"><code>data class UserProfile(val id: String, val name: String, val email: String? = null)

fun Context.showToast(message: String) {
    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}

fun process(context: Context, user: UserProfile) {
    user.email?.let { email ->
        context.showToast("Email: $email")
    } ?: run {
        context.showToast("Không có email")
    }
}</code></pre>

<h2>Nâng cao</h2>
<p>Dùng từ khóa <code>inline</code> và <code>reified</code> để tránh tạo ra đối tượng Function tạm thời và giữ thông tin kiểu dữ liệu Generic tại runtime:</p>
<pre data-lang="kotlin"><code>inline fun &lt;reified T : Activity&gt; Context.launchActivity() {
    startActivity(Intent(this, T::class.java))
}</code></pre>

<h2>Sai lầm thường gặp</h2>
<ul>
  <li>Lạm dụng Not-Null Assertion Operator (<code>!!</code>) gây crash bất ngờ.</li>
  <li>Lồng quá nhiều Scope Functions (<code>let</code>, <code>apply</code>, <code>also</code>, <code>with</code>) làm rối mã nguồn.</li>
</ul>

<h2>Lịch sử phát triển</h2>
<p>Google I/O 2017 công bố hỗ trợ Kotlin → Google I/O 2019 chính thức chuyển sang Kotlin-First → Jetpack Compose 1.0 (2021) viết hoàn toàn bằng Kotlin.</p>

<h2>Kết nối hệ thống</h2>
<ul>
  <li><strong>Prerequisites</strong>: <code>android.languages.java_android</code></li>
  <li><strong>Related Topics</strong>: <code>android.languages.jni</code>, <code>android.output_packages.apk_files</code></li>
</ul>
    `
  },

  'android.languages.jni': {
    title: 'JNI & C/C++ Native Code trong Android',
    summary: 'Giao tiếp hiệu năng cao giữa Java/Kotlin và mã nguồn C/C++ native qua Java Native Interface (JNI), NDK, CMake, RegisterNatives, và cơ chế quản lý bộ nhớ Native vs Managed Heap.',
    status: 'published',
    difficulty: 'advanced',
    estimatedReadingTime: '25 phút',
    depth: 'deep-dive',
    tags: ['android', 'jni', 'cpp', 'ndk', 'cmake', 'native', 'memory'],
    domain: 'Android',
    module: 'Session 01: Ngôn ngữ & Gói ứng dụng',
    prerequisites: ['android.languages.java_android', 'android.languages.kotlin'],
    related: ['android.output_packages.apk_files', 'android.output_packages.aab_files'],
    learningOutcomes: [
      'Giải thích được kiến trúc Java Native Interface (JNI) và chi phí chuyển đổi ngữ cảnh (Context Switching Overhead) giữa Managed Heap và Native Heap.',
      'Phân biệt được cơ chế đăng ký hàm Native tĩnh (Name Mangling) và đăng ký hàm động (RegisterNatives).',
      'Xử lý được rò rỉ bộ nhớ JNI Reference Leaks (Local Reference Table limit 512 entries vs Global Reference).',
      'Triển khai được liên kết mã nguồn C/C++ với Android NDK và CMake trong môi trường Android Studio.'
    ],
    knowledgeGap: 'Không hiểu sâu JNI sẽ khiến lập trình viên lạm dụng Native code gây chậm ứng dụng do JNI Call Overhead, gặp rủi ro crash ứng dụng ngắt ngập (SIGSEGV) không thể catch bằng try-catch Kotlin/Java, và bị lọt rò rỉ bộ nhớ nghiêm trọng trong Local Reference Table.',
    updatedAt: '2026-07-22',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Nhiều bài toán xử lý tính toán cực nặng (xử lý hình ảnh, video, mã hóa bảo mật, AI/ML inference) yêu cầu hiệu năng native của C/C++ mà Garbage Collector của Java/Kotlin không đáp ứng tốt.</p>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được kiến trúc Java Native Interface (JNI) và luồng gọi phương thức giữa Java/Kotlin và C/C++.</li>
  <li>Triển khai được liên kết C/C++ native vào dự án Android sử dụng NDK và CMake.</li>
  <li>Xử lý được rò rỉ bộ nhớ native và JNI Reference Leaks.</li>
  <li>Phân biệt được khi nào nên sử dụng C/C++ Native Code.</li>
</ul>

<h2>JNI & Native Code là gì?</h2>
<p><strong>JNI (Java Native Interface)</strong> là cầu nối chuẩn cho phép Java/Kotlin giao tiếp với thư viện C/C++ native được biên dịch bởi Android NDK.</p>

<h2>Cách hoạt động</h2>
<p>Con trỏ <code>JNIEnv* env</code> đại diện cho môi trường JNI của thread. Tên hàm C++ tuân theo quy tắc Name Mangling: <code>Java_Package_Class_Method</code>.</p>

<h2>Ví dụ thực tế</h2>
<pre data-lang="cpp"><code>#include &lt;jni.h&gt;
#include &lt;string&gt;

extern "C" JNIEXPORT jstring JNICALL
Java_com_example_knowledgeos_MainActivity_stringFromJNI(JNIEnv* env, jobject thiz) {
    return env-&gt;NewStringUTF("Hello từ C++ Native Code!");
}</code></pre>

<h2>Nâng cao</h2>
<p>Cần xóa Local Reference thủ công trong vòng lặp lớn bằng <code>env-&gt;DeleteLocalRef(str)</code> để tránh tràn JNI Local Reference Table (tối đa 512 refs).</p>

<h2>Sai lầm thường gặp</h2>
<ul>
  <li>Dùng con trỏ <code>JNIEnv*</code> trên thread khác chưa được <code>AttachCurrentThread()</code>.</li>
  <li>Quên cấu hình ABI Filters cho các dòng chip CPU khác nhau.</li>
</ul>

<h2>Lịch sử phát triển</h2>
<p>Từ <code>ndk-build</code> (Android.mk) cũ sang <code>CMake</code> và <code>LLVM Clang</code> hiện đại được tích hợp trực tiếp vào Android Studio.</p>

<h2>Kết nối hệ thống</h2>
<ul>
  <li><strong>Prerequisites</strong>: <code>android.languages.java_android</code>, <code>android.languages.kotlin</code></li>
  <li><strong>Related Topics</strong>: <code>android.output_packages.apk_files</code>, <code>android.output_packages.aab_files</code></li>
</ul>
    `
  },

  'android.output_packages.apk_files': {
    title: 'Gói ứng dụng APK (Android Package)',
    summary: 'Cấu trúc chi tiết file APK, cơ chế biên dịch Binary XML, resources.arsc, APK Signature Schemes v1 đến v4, và kỹ thuật tối ưu bộ nhớ mmap với zipalign 4-byte boundary.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '25 phút',
    depth: 'deep-dive',
    tags: ['android', 'apk', 'zipalign', 'signature', 'binary-xml', 'resources-arsc', 'dex'],
    domain: 'Android',
    module: 'Session 01: Ngôn ngữ & Gói ứng dụng',
    prerequisites: ['android.languages.java_android', 'android.languages.kotlin'],
    related: ['android.output_packages.aab_files', 'android.languages.jni'],
    learningOutcomes: [
      'Giải thích được cấu trúc giải nén của một file APK tiêu chuẩn và vai trò của từng thành phần (classes.dex, resources.arsc, Binary XML).',
      'Phân biệt được sự tiến hóa của APK Signature Schemes từ v1 (JAR signing), v2 (Signing Block), v3 (Key Rotation) đến v4 (fs-verity).',
      'Giải thích được cơ chế tối ưu bộ nhớ RAM của zipalign dựa trên kỹ thuật Memory Mapping (mmap) 4-byte boundary alignment.',
      'Xử lý được các sự cố biên dịch APK common như INSTALL_FAILED_INVALID_APK hay INSTALL_PARSE_FAILED_NO_CERTIFICATES.'
    ],
    knowledgeGap: 'Thiếu hiểu biết về cấu trúc APK sẽ khiến lập trình viên bất lực khi tối ưu dung lượng app, không hiểu tại sao zipalign giúp tiết kiệm RAM, lúng túng khi xử lý lỗi signing v1/v2/v3/v4 trên các thiết bị Android OS khác nhau, và dễ bị lỗ hổng bảo mật khi phân tích Reverse Engineering.',
    updatedAt: '2026-07-22',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Ứng dụng Android cần được đóng gói thành tập tin cài đặt chuẩn APK chứa toàn bộ bytecode <code>classes.dex</code>, tài nguyên biên dịch và chữ ký xác thực.</p>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được cấu trúc chi tiết bên trong một file APK sau khi giải nén ZIP.</li>
  <li>Phân biệt được sự khác nhau giữa các cơ chế ký APK Signature Scheme v1, v2, v3, và v4.</li>
  <li>Xử lý được lỗi 64K Method Limit (Multidex).</li>
  <li>Hiểu được vai trò của công cụ zipalign.</li>
</ul>

<h2>APK là gì?</h2>
<p><strong>APK (Android Package)</strong> thực chất là một tập tin nén định dạng ZIP chứa <code>AndroidManifest.xml</code>, <code>classes.dex</code>, <code>res/</code>, <code>resources.arsc</code>, <code>lib/</code> và <code>META-INF/</code>.</p>

<h2>Cách hoạt động</h2>
<h3>Các chuẩn Ký APK Signature Scheme</h3>
<ul>
  <li><strong>v1 (JAR Signature)</strong>: Ký từng file riêng lẻ trong APK.</li>
  <li><strong>v2 (Whole-file)</strong>: Ký toàn bộ file APK ZIP, bảo mật tuyệt đối và verify cực nhanh.</li>
  <li><strong>v3 (Key Rotation)</strong>: Hỗ trợ thay đổi Private Key của app.</li>
  <li><strong>v4 (Streaming)</strong>: Hỗ trợ cài đặt ứng dụng siêu tốc qua ADB Incremental.</li>
</ul>

<h2>Ví dụ thực tế</h2>
<pre data-lang="kotlin"><code>android {
    signingConfigs {
        create("release") {
            storeFile = file("my-release-key.jks")
            storePassword = System.getenv("KEYSTORE_PASSWORD")
            keyAlias = "my-alias"
            keyPassword = System.getenv("KEY_PASSWORD")
            enableV1Signing = true
            enableV2Signing = true
        }
    }
}</code></pre>

<h2>Nâng cao</h2>
<p>Công cụ <code>zipalign</code> giúp sắp xếp tài nguyên chưa nén theo ranh giới 4-byte, cho phép hệ điều hành dùng <code>mmap()</code> đọc trực tiếp từ APK vào RAM mà không cần copy bộ nhớ.</p>

<h2>Sai lầm thường gặp</h2>
<ul>
  <li>Làm mất file Keystore (<code>.jks</code>) khiến không thể cập nhật ứng dụng.</li>
  <li>Chạy <code>zipalign</code> SAU KHI ký v1 làm hỏng chữ ký.</li>
</ul>

<h2>Lịch sử phát triển</h2>
<p>Từ APK v1 đơn giản đến APK v2/v3/v4 và sự ra đời của Android App Bundle (AAB).</p>

<h2>Kết nối hệ thống</h2>
<ul>
  <li><strong>Prerequisites</strong>: <code>android.languages.java_android</code>, <code>android.languages.kotlin</code></li>
  <li><strong>Related Topics</strong>: <code>android.output_packages.aab_files</code>, <code>android.languages.jni</code></li>
</ul>
    `
  },

  'android.output_packages.aab_files': {
    title: 'Android App Bundle (AAB) & Dynamic Delivery',
    summary: 'Định dạng xuất bản hiện đại của Google Play. Tìm hiểu cơ chế bundletool, Proto-format, Split APKs (ABI, Density, Language), Dynamic Feature Modules (DFM), SplitCompat internals và Play App Signing.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '25 phút',
    depth: 'deep-dive',
    tags: ['android', 'aab', 'app-bundle', 'dynamic-delivery', 'bundletool', 'split-apk', 'play-app-signing'],
    domain: 'Android',
    module: 'Session 01: Ngôn ngữ & Gói ứng dụng',
    prerequisites: ['android.languages.java_android', 'android.languages.kotlin', 'android.output_packages.apk_files'],
    related: ['android.languages.jni'],
    learningOutcomes: [
      'Giải thích được sự khác biệt bản chất giữa định dạng APK nguyên khối và Android App Bundle (AAB).',
      'Giải thích được cơ chế tạo Split APKs của bundletool (Language, Density, ABI splits) để giảm 35% dung lượng tải app.',
      'Triển khai được kiến trúc Dynamic Feature Modules (DFM) và nạp module thời điểm chạy (Runtime Loading) với SplitCompat.',
      'Xử lý được luồng kiểm thử ứng dụng AAB cục bộ sử dụng công cụ bundletool CLI.'
    ],
    knowledgeGap: 'Không nắm vững AAB và Dynamic Delivery khiến lập trình viên lãng phí dung lượng ứng dụng, gặp sự cố ClassNotFoundException khi truy cập Dynamic Feature Modules ở runtime, bất lực trong việc test AAB cục bộ mà không qua Play Console, và bối rối với cơ chế bảo mật của Play App Signing.',
    updatedAt: '2026-07-22',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Universal APK truyền thống phải chứa toàn bộ mã native C++, tài nguyên màn hình và ngôn ngữ của mọi thiết bị, làm dung lượng ứng dụng phình to lãng phí.</p>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được sự khác nhau cốt lõi giữa Android App Bundle (AAB) và APK truyền thống.</li>
  <li>Phân tích được cơ chế Dynamic Delivery và Split APKs của Google Play.</li>
  <li>Triển khai được Dynamic Feature Modules để tải module tính năng theo yêu cầu (On-Demand).</li>
  <li>Hiểu được vai trò của Play App Signing và cách quản lý App Signing Key.</li>
</ul>

<h2>AAB là gì?</h2>
<p><strong>Android App Bundle (AAB)</strong> là định dạng xuất bản không thể cài đặt trực tiếp. Google Play dựa trên AAB để sinh ra các <strong>Split APKs</strong> tối ưu riêng cho từng thiết bị.</p>

<h2>Cách hoạt động</h2>
<h3>Cơ chế Split APKs & Dynamic Delivery</h3>
<p>Google Play sinh ra Base APK + ABI Split APK + Density Split APK + Language Split APK tương ứng với thiết bị tải về, giúp giảm 20-50% dung lượng.</p>

<h2>Ví dụ thực tế</h2>
<pre data-lang="kotlin"><code>// Base Module build.gradle.kts
android {
    dynamicFeatures += setOf(":features:ar_camera")
}</code></pre>

<h2>Nâng cao</h2>
<p>Sử dụng công cụ <code>bundletool</code> để tạo tập tin <code>.apks</code> và cài đặt thử nghiệm AAB local qua ADB command line.</p>

<h2>Sai lầm thường gặp</h2>
<ul>
  <li>Thử dùng <code>adb install</code> trực tiếp tập tin <code>.aab</code> (phải qua <code>bundletool</code>).</li>
  <li>Không phân biệt được Upload Key và App Signing Key.</li>
</ul>

<h2>Lịch sử phát triển</h2>
<p>Giới thiệu năm 2018 và chính thức bắt buộc cho tất cả ứng dụng mới trên Google Play từ tháng 8/2021.</p>

<h2>Kết nối hệ thống</h2>
<ul>
  <li><strong>Prerequisites</strong>: <code>android.output_packages.apk_files</code></li>
  <li><strong>Related Topics</strong>: <code>android.languages.java_android</code>, <code>android.languages.kotlin</code></li>
</ul>
    `
  }

});

// Direct Key Aliases
ANDROID_CONTENT['android.component.activity.lifecycle'] = ANDROID_CONTENT['activity-lifecycle'];
ANDROID_CONTENT['java-android'] = ANDROID_CONTENT['android.languages.java_android'];
ANDROID_CONTENT['kotlin-core'] = ANDROID_CONTENT['android.languages.kotlin'];
ANDROID_CONTENT['jni-cpp'] = ANDROID_CONTENT['android.languages.jni'];
ANDROID_CONTENT['apk-files'] = ANDROID_CONTENT['android.output_packages.apk_files'];
ANDROID_CONTENT['aab-files'] = ANDROID_CONTENT['android.output_packages.aab_files'];
ANDROID_CONTENT['android.session01.overview'] = ANDROID_CONTENT['session-01-overview'];



Object.assign(ANDROID_CONTENT, {
  'ss01-lang-kotlin': {
    title: 'Kotlin trong Android',
    summary: 'Trình biên dịch Kotlinc, cơ chế Null Safety, quá trình tương tác chéo với Java (Interoperability) và những điều quan trọng cần biết khi dùng Kotlin cho Android.',
    status: 'draft',
    tags: ['Language', 'Kotlin', 'Compiler', 'Null Safety', 'Coroutines'],
    domain: 'Android',
    module: 'Session 01: Languages',
    prerequisites: ['java-in-android'],
    related: ['coroutines', 'jetpack-compose'],
    updatedAt: '2026-07-23',
    readTime: '15 phút',
    content: `
<h2>1. Bản chất: Kotlin chạy như thế nào trên Android?</h2>
<p>Một trong những lầm tưởng phổ biến nhất là: <em>"Kotlin chạy trên một máy ảo Kotlin riêng"</em> hoặc <em>"Android có một hệ điều hành mới dành cho Kotlin"</em>.</p>
<p>Thực tế: <strong>Không hề có máy ảo Kotlin riêng biệt trên Android</strong>. Kotlin (trên Android) chia sẻ chung nền tảng Runtime (ART) hoàn toàn giống như Java.</p>

<h3>Trình biên dịch (Kotlinc) là chìa khóa</h3>
<p>Sự khác biệt lớn nhất giữa Kotlin và Java nằm ở <strong>Trình biên dịch (Compiler)</strong>. Trình biên dịch <code>kotlinc</code> đóng vai trò chuyển mã nguồn Kotlin (<code>.kt</code>) thành mã Bytecode tiêu chuẩn của Java (<code>.class</code>).</p>

<div class="mermaid">
graph TD
    A[Source Code Kotlin .kt] -->|kotlinc| B(Java Bytecode .class)
    C[Source Code Java .java] -->|javac| B
    B -->|D8 / R8 Compiler| D(Dalvik Bytecode .dex)
    D -->|APK/AAB| E[Thiết bị Android]
    E -->|ART / Dalvik Runtime| F[Machine Code]
    
    classDef kotlin fill:#7f52ff,stroke:#333,stroke-width:2px,color:#fff;
    classDef java fill:#e69138,stroke:#333,stroke-width:2px,color:#fff;
    classDef output fill:#20c997,stroke:#333,stroke-width:2px,color:#fff;
    
    A:::kotlin
    C:::java
    D:::output
</div>

<p><strong>Tại sao điều này quan trọng?</strong><br>
Bởi vì <code>kotlinc</code> biên dịch ra mã tương thích với JVM, nên Android (Dalvik/ART) không cần biết mã gốc được viết bằng Kotlin hay Java. ART chỉ đọc và chạy file <code>.dex</code>. Nhờ thiết kế này:</p>
<ol>
<li>Bạn có thể sử dụng tất cả các thư viện viết bằng Java trong project Kotlin.</li>
<li>Không cần thiết bị người dùng phải cập nhật Android OS mới nhất để chạy được Kotlin.</li>
<li>Kích thước APK không bị đội lên quá lớn (chỉ tăng một chút do kèm theo Kotlin Standard Library).</li>
</ol>

<h2>2. Kotlin giải quyết vấn đề gì của Java?</h2>

<h3>2.1. Null Safety (Loại bỏ Billion Dollar Mistake)</h3>
<p>Lỗi phổ biến nhất làm crash app Android viết bằng Java là <code>NullPointerException</code> (NPE). Trong Java, bất kỳ Object nào cũng có thể là <code>null</code>.</p>
<p><strong>Kotlin giải quyết bằng cách nào?</strong><br>
Kotlin bắt buộc bạn phải khai báo rõ ràng một biến có thể <code>null</code> hay không ngay ở cấp độ ngôn ngữ. Nếu một biến không được đánh dấu <code>?</code>, <strong>Compiler sẽ không cho phép bạn gán <code>null</code> vào nó</strong>.</p>
<pre><code class="language-kotlin">var name: String = "John"
// name = null // Compiler Error: Null can not be a value of a non-null type String

var nullableName: String? = "John"
nullableName = null // Hợp lệ
</code></pre>

<div class="callout-note">
  <strong>Cơ chế đằng sau Null Safety</strong><br/>
  Khi biên dịch sang Java Bytecode, biến Kotlin không-thể-null (<code>String</code>) sẽ được <code>kotlinc</code> dịch thành biến Java bình thường kèm theo Annotation <code>@NotNull</code>. Còn biến có-thể-null (<code>String?</code>) được dịch thành <code>@Nullable</code>. <br/>
  Đồng thời, compiler sẽ tự động chèn các câu lệnh kiểm tra (ví dụ: <code>Intrinsics.checkNotNullParameter(...)</code>) vào đầu hàm để ném ra ngoại lệ <code>IllegalArgumentException</code> sớm nếu một thư viện Java nào đó cố tình truyền <code>null</code> vào biến không-thể-null của Kotlin.
</div>

<h3>2.2. Boilerplate Code (Giảm thiểu mã dư thừa)</h3>
<p>Java yêu cầu quá nhiều mã để định nghĩa cấu trúc dữ liệu cơ bản (Getters, Setters, <code>equals()</code>, <code>hashCode()</code>, <code>toString()</code>). Kotlin cung cấp <strong>Data Classes</strong>.</p>
<pre><code class="language-kotlin">// Chỉ 1 dòng code trong Kotlin
data class User(val id: Int, val name: String)
</code></pre>
<p><strong>Điều gì xảy ra ở phía sau?</strong><br>
Khi bạn dùng từ khóa <code>data</code>, trình biên dịch <code>kotlinc</code> sẽ <strong>tự động sinh ra</strong> toàn bộ các hàm getter, setter, <code>equals</code>, <code>hashCode</code>, <code>toString</code> và <code>copy</code> ở mã Bytecode. Bạn viết ít code hơn, nhưng số lượng mã máy được sinh ra (và số lượng method) tương đương với Java.</p>

<h3>2.3. Bất đồng bộ (Concurrency) với Coroutines</h3>
<p>Xử lý luồng (Threading) trong Java bằng <code>AsyncTask</code> (đã deprecated) hay <code>RxJava</code> đòi hỏi nhiều code phức tạp (Callbacks hell) hoặc vòng đời học tập (learning curve) quá dốc.</p>
<p>Kotlin giới thiệu <strong>Coroutines</strong> - lập trình bất đồng bộ viết như mã đồng bộ (sequential-style).</p>
<div class="callout-tip">
  <strong>Coroutines không phải là một Thread mới.</strong> Chúng chạy <em>bên trên</em> các Thread hiện có, giống như những tác vụ siêu nhẹ. Hàng ngàn coroutines có thể chạy trên một Thread mà không làm tràn bộ nhớ (OOM). Chi tiết sâu hơn sẽ được học ở <strong>Session 08: Coroutines</strong>.
</div>

<h2>3. Khả năng tương tác chéo (Interoperability)</h2>
<p>Một trong những lý do Google chọn Kotlin là vì nó tương tác 100% hai chiều với Java (100% Interoperability). Bạn có thể có cả file <code>.java</code> và <code>.kt</code> trong cùng một project.</p>

<h3>3.1. Gọi Java từ Kotlin</h3>
<p>Hoạt động gần như tự nhiên, vì Kotlin xem Getter/Setter của Java như là Property.</p>
<pre><code class="language-java">// User.java
public class User {
    private String name;
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
</code></pre>
<pre><code class="language-kotlin">// MainActivity.kt
val user = User()
user.name = "Android" // Kotlin tự động gọi setName() và getName() của Java
</code></pre>

<h3>3.2. Gọi Kotlin từ Java</h3>
<p>Kotlin biên dịch ra Bytecode nên Java có thể gọi nó. Tuy nhiên, một số tính năng đặc thù của Kotlin (như Default parameters, hay hàm nằm ngoài class) cần các Annotation đặc biệt để Java gọi dễ dàng hơn.</p>
<pre><code class="language-kotlin">// Utils.kt (File name)
fun doSomething(id: Int, name: String = "Default") { ... }
</code></pre>
<pre><code class="language-java">// Java code gọi Kotlin code
UtilsKt.doSomething(1, "Text"); 
// Nếu muốn Java gọi được hàm có tham số mặc định, 
// bên Kotlin phải thêm @JvmOverloads trước hàm doSomething.
</code></pre>

<h2>4. Annotation Processing: Từ KAPT đến KSP</h2>
<p>Trong Android, các thư viện như Room, Dagger/Hilt, Glide sử dụng Annotation Processing để tự động sinh code.</p>
<ul>
<li>Trong Java: Sử dụng <strong>APT</strong> (Annotation Processing Tool).</li>
<li>Trong Kotlin: APT của Java không hiểu được mã Kotlin. Do đó Kotlin tạo ra <strong>KAPT</strong> (Kotlin Annotation Processing Tool).</li>
</ul>
<p><strong>Vấn đề của KAPT:</strong><br>
KAPT hoạt động bằng cách sinh ra các lớp Java Stub (các lớp vỏ rỗng) từ mã Kotlin, sau đó đưa cho APT của Java xử lý. Việc phải tạo ra Stubs làm cho quá trình Build bị chậm đi đáng kể (tăng Build Time).</p>
<p><strong>Giải pháp KSP (Kotlin Symbol Processing):</strong><br>
KSP được Google ra mắt để thay thế KAPT. KSP chạy trực tiếp trên mã Kotlin, không cần phải tạo ra các Java Stubs. Nó nhanh hơn KAPT tới 2 lần.</p>
<div class="callout-warning">
  Khi setup dự án mới (có dùng Room, Hilt, Moshi...), <strong>luôn ưu tiên sử dụng KSP thay vì KAPT</strong> để tối ưu hóa thời gian build.
</div>

<h2>5. Những nhược điểm (Trade-offs) cần lưu ý</h2>
<p>Không có giải pháp nào là hoàn hảo. Khi chọn Kotlin thay vì Java, bạn chấp nhận các đánh đổi:</p>
<ol>
<li><strong>Build Time (Thời gian biên dịch):</strong> Trình biên dịch <code>kotlinc</code> thực hiện rất nhiều việc (kiểm tra kiểu, suy luận kiểu, sinh code cho inline functions, data classes), điều này làm Clean Build của Kotlin chậm hơn Java thuần từ 15-20%.</li>
<li><strong>Kích thước APK:</strong> Việc sử dụng Kotlin sẽ nhúng thêm <code>kotlin-stdlib</code> vào APK của bạn. Mặc dù R8 làm rất tốt việc loại bỏ code dư thừa (Dead code elimination), APK/AAB xuất ra vẫn có thể nhỉnh hơn một chút.</li>
<li><strong>Overhead của tính năng ngầm định:</strong> Các tính năng như <code>Delegated Properties</code> (ví dụ <code>by lazy</code>) hoặc <code>High-order functions</code> có thể sinh ra thêm các đối tượng trung gian ở Bytecode nếu bạn không sử dụng chúng kèm theo từ khóa <code>inline</code>. Điều này có thể ảnh hưởng nhỏ đến bộ nhớ nếu lạm dụng trong các vòng lặp lớn.</li>
</ol>

<h2>6. Tổng kết: Bạn cần học những gì ở Kotlin cho Android?</h2>
<p>Nếu chuyển từ Java hoặc ngôn ngữ khác sang Kotlin để làm Android, đây là <strong>Checklist cốt lõi</strong> bạn phải nắm vững thay vì học lan man:</p>
<ul>
<li>[ ] <strong>Variable & Null Safety:</strong> <code>val</code>, <code>var</code>, <code>?</code>, <code>!!</code>, <code>?.</code>, <code>?:</code> (Elvis operator).</li>
<li>[ ] <strong>Functions & Lambdas:</strong> Higher-Order Functions, Inline Functions (cách nó giảm overhead).</li>
<li>[ ] <strong>Classes & Types:</strong> Data Classes, Sealed Classes / Sealed Interfaces (để quản lý State trong UI), Enum.</li>
<li>[ ] <strong>Extensions:</strong> Extension Functions (Cách thêm hàm vào một Class mà không cần kế thừa - Ví dụ thêm hàm <code>dpToPx()</code> vào class <code>Int</code>).</li>
<li>[ ] <strong>Delegation:</strong> <code>by lazy</code> (Khởi tạo muộn), <code>by viewModels()</code> trong Fragment/Activity.</li>
<li>[ ] <strong>Collections API:</strong> <code>map</code>, <code>filter</code>, <code>reduce</code>, <code>flatMap</code> (làm việc với danh sách mạnh mẽ hơn Java Streams).</li>
<li>[ ] <strong>Coroutines & Flow:</strong> <code>suspend</code>, <code>Dispatchers</code>, <code>StateFlow</code>, <code>SharedFlow</code>. (Bắt buộc phải nắm để thao tác Network/Database).</li>
</ul>
<div class="callout-tip">
  <strong>Học tiếp ở đâu?</strong><br>
  Khác với Java Write-Once-Run-Anywhere (Viết một lần chạy mọi nơi thông qua JVM), Kotlin hiện đang tiến tới <strong>Kotlin Multiplatform (KMP)</strong> - cho phép chia sẻ Business Logic giữa Android, iOS, Desktop và Web (sử dụng Kotlin/Native và Kotlin/JS). Nếu bạn đã thành thạo Kotlin trên Android, KMP là bước đi tự nhiên tiếp theo.
</div>
`
  },

  'build-types': {
    title: 'Build Types',
    summary: 'Hiểu sâu về Build Types trong Gradle/AGP để quản lý các môi trường build (dev, staging, prod), cơ chế hoạt động, buildConfigField, initWith và ứng dụng vào CI/CD cùng Firebase App Distribution.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '30 phút',
    depth: 'deep-dive',
    tags: ['android', 'build', 'gradle', 'agp', 'build-types', 'buildconfigfield', 'proguard', 'ci-cd', 'firebase'],
    domain: 'Android',
    module: 'Session 04: Android Manifest - Package, build, gradle',
    prerequisites: ['apk-files', 'aab-files'],
    related: ['flavor', 'plugin'],
    learningOutcomes: [
      'Giải thích được vai trò của Gradle, AGP và file build.gradle.kts trong dự án Android.',
      'Phân biệt được Build Types, Product Flavors và biết khi nào dùng loại nào.',
      'Mô tả được Build Flow: merge source sets, sinh BuildConfig, minify R8/ProGuard, signing.',
      'Cấu hình được các Build Type (dev, staging, release) với signing, minify, applicationIdSuffix.',
      'Sử dụng được buildConfigField để tách biến môi trường khỏi source code.',
      'Áp dụng được initWith để kế thừa cấu hình giữa các Build Type.',
      'Đặt tên được file output APK/AAB theo từng môi trường build.',
      'Kết hợp được Build Type với CI/CD và Firebase App Distribution.'
    ],
    knowledgeGap: 'Nhầm lẫn Build Types với Product Flavors dẫn đến cấu hình sai signing hoặc minify cho bản release, gây lỗi khi phát hành hoặc lọt log debug ra production. Không hiểu cách Gradle/AGP hoạt động khiến khó gỡ lỗi khi build fail và không biết cách tách biến môi trường theo từng Build Type.',
    updatedAt: '2026-08-02',
    readTime: '30 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Trong quá trình phát triển một ứng dụng Android, bạn không chỉ tạo ra một phiên bản duy nhất. Bạn cần:</p>
<ul>
  <li>Một phiên bản để Developer lập trình, có thể debug, build nhanh, log lỗi chi tiết.</li>
  <li>Một phiên bản để QA/Tester kiểm thử nội bộ trên môi trường server giả lập (Staging/QA).</li>
  <li>Một phiên bản hoàn chỉnh để phát hành lên Google Play (Production) — phiên bản này cần được mã hóa, nén code, loại bỏ log để bảo mật và tối ưu dung lượng.</li>
</ul>
<p>Nếu không có một cơ chế quản lý, bạn sẽ phải liên tục thay đổi code (ví dụ: đổi URL server, bật/tắt biến <code>DEBUG</code>, thay đổi chữ ký chứng chỉ - signing config) mỗi khi muốn tạo ra một phiên bản khác nhau. Điều này rất dễ dẫn đến sai sót (ví dụ: quên tắt log khi release app).</p>
<p>Android cung cấp <strong>Build Types</strong> để giải quyết bài toán này.</p>

<h2>Nền tảng cần biết trước: Gradle, AGP và build.gradle.kts</h2>
<p>Trước khi đi sâu vào Build Type, cần hiểu rõ bốn khái niệm nền tảng mà bài viết này sử dụng xuyên suốt.</p>

<h3>Gradle là gì?</h3>
<p><strong>Gradle</strong> là một hệ thống build (build system) tổng quát, viết bằng Groovy/Kotlin, dùng để tự động hóa quá trình biên dịch, đóng gói và triển khai phần mềm. Nó không chỉ dành cho Android — bạn có thể dùng Gradle để build bất kỳ dự án nào.</p>
<p>Gradle hoạt động dựa trên <strong>Task Graph</strong> (đồ thị nhiệm vụ): mỗi công việc là một Task, các Task có quan hệ phụ thuộc nhau. Khi bạn chạy <code>./gradlew assembleDebug</code>, Gradle sẽ tính toán thứ tự các Task cần chạy dựa trên graph này.</p>

<h3>AGP (Android Gradle Plugin) là gì?</h3>
<p><strong>AGP</strong> là một plugin của Gradle dành riêng cho Android. Nó mở rộng Gradle để hiểu được:</p>
<ul>
  <li>Cấu trúc dự án Android (source sets, manifest, resources...).</li>
  <li>Cách biên dịch Kotlin/Java thành APK/AAB.</li>
  <li>Cách ký (signing) và tối ưu hóa (R8/ProGuard).</li>
</ul>
<p>Nói cách khác: <strong>Gradle là "bộ máy", AGP là "bộ chuyển đổi" giúp bộ máy đó hiểu cách build Android.</strong></p>

<h3>build.gradle.kts là gì?</h3>
<p><code>build.gradle.kts</code> là file cấu hình của dự án, viết bằng <strong>Kotlin DSL</strong> (Domain-Specific Language). Có hai cấp:</p>
<ul>
  <li><code>build.gradle.kts</code> ở <strong>project root</strong>: khai báo plugin, dependency, version.</li>
  <li><code>build.gradle.kts</code> ở <strong>module app</strong>: nơi khai báo <code>android { }</code> block — đây là nơi cấu hình Build Types.</li>
</ul>

<h3>Mối quan hệ giữa chúng</h3>
<div class="mermaid">
flowchart LR
    A[Gradle] -->|nạp| B[AGP]
    B -->|đọc| C[build.gradle.kts]
    C -->|khai báo| D[android block: cấu hình buildTypes]
    D -->|sinh ra| E[Task Graph]
    E -->|thực thi| F[APK / AAB]
</div>

<div class="callout-note">
  Nếu bạn đã biết Kotlin + Java nhưng chưa biết Gradle, hãy hiểu đơn giản: Gradle là "máy build", AGP là "bộ hướng dẫn Android cho Gradle", và <code>build.gradle.kts</code> là "bản thiết kế" mà bạn viết.
</div>

<h2>Build Type là gì?</h2>
<p><strong>Build Type</strong> (Loại bản dựng) là các cấu hình xây dựng ứng dụng ở các <strong>giai đoạn khác nhau trong vòng đời phát triển</strong> của ứng dụng.</p>
<p>Build Type định nghĩa <strong>cách thức</strong> mà ứng dụng được build và đóng gói: có cho phép debug không, sử dụng khóa ký (signing key) nào, có tối ưu hóa mã nguồn (minify) không, hay có gắn thêm hậu tố vào tên gói (application ID suffix) hay không.</p>
<p>Theo mặc định, Gradle cấu hình sẵn hai Build Type:</p>
<ol>
  <li><code>debug</code>: Dành cho lúc lập trình. Không minify code, được ký bằng debug key mặc định, hỗ trợ debug đầy đủ.</li>
  <li><code>release</code>: Dành cho lúc phát hành. Thường được minify (ProGuard/R8), ký bằng release key của riêng bạn, không cho phép debug.</li>
</ol>

<h2>Build Type hoạt động như thế nào (Build Flow)?</h2>
<p>Khi bạn thực thi một lệnh Gradle (ví dụ: <code>./gradlew assembleDebug</code>), Android Gradle Plugin (AGP) sẽ thực hiện luồng công việc:</p>
<ol>
  <li><strong>Khởi tạo và cấu hình:</strong> Đọc <code>build.gradle.kts</code> để thu thập thông tin Build Type.</li>
  <li><strong>Hợp nhất mã nguồn (Merge Source Sets):</strong> AGP tự động kết hợp mã nguồn (<code>src/main</code>) với mã nguồn cụ thể của Build Type (<code>src/debug</code> hoặc <code>src/release</code>). Cấu hình của Build Type ghi đè lên cấu hình ở main.</li>
  <li><strong>Sinh code tự động:</strong> Sinh ra file <code>BuildConfig.java</code> dựa trên các <code>buildConfigField</code>.</li>
  <li><strong>Biên dịch:</strong> Biên dịch Kotlin/Java thành bytecode.</li>
  <li><strong>Tối ưu hóa (R8/ProGuard):</strong> (Thường chỉ áp dụng cho <code>release</code>/<code>staging</code>) Làm rối, loại bỏ code thừa.</li>
  <li><strong>Đóng gói và Ký:</strong> Đóng gói thành APK/AAB và ký bằng <code>signingConfig</code>.</li>
</ol>

<div class="mermaid">
flowchart TD
    A[Mã nguồn chung src/main] --> C{AGP Merge}
    B[Mã nguồn Build Type src/debug hoặc src/release] --> C
    
    C --> D[Sinh BuildConfig.java]
    D --> E[Biên dịch Java/Kotlin]
    E --> F{R8/ProGuard Minify?}
    
    F -- Nếu true --> G[Tối ưu & Làm rối code]
    F -- Nếu false --> H[Bỏ qua Minify]
    
    G --> I[Đóng gói APK/AAB]
    H --> I
    
    I --> J[Ký ứng dụng Signing Config]
    J --> K((Hoàn thành))
</div>

<h2>Phân biệt Build Types và Product Flavors</h2>
<ul>
  <li><strong>Build Types (Cách build):</strong> Đại diện cho các <strong>giai đoạn phát triển</strong> (Debug, Staging, QA, Release). Quyết định <em>cách</em> ứng dụng được tạo ra.</li>
  <li><strong>Product Flavors (Cái gì được build):</strong> Đại diện cho các <strong>phiên bản sản phẩm</strong> (Free, Paid, Enterprise). Quyết định <em>nội dung</em> ứng dụng.</li>
</ul>

<div class="callout-tip">
  <strong>Quy tắc ngón tay cái:</strong> Nếu thay đổi cấu hình mà người dùng cuối không quan tâm (khóa ký, R8, log debug), đó là <strong>Build Type</strong>. Nếu thay đổi tính năng, icon, server URL cho đối tượng khách hàng khác nhau, đó thường là <strong>Flavor</strong>. URL máy chủ thay đổi giữa dev/staging/prod là của Build Type, URL cho khách hàng là của Flavor.
</div>

<h2>Các thuộc tính quan trọng của một Build Type</h2>
<p>Trước khi cấu hình, cần nắm các thuộc tính hay dùng nhất:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Thuộc tính</th>
      <th style="padding:8px 12px;text-align:left;">Ý nghĩa</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>isDebuggable</code></td>
      <td style="padding:8px 12px;">Cho phép debug (true/false). Bản <code>release</code> phải là <code>false</code>.</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>isMinifyEnabled</code></td>
      <td style="padding:8px 12px;">Bật R8/ProGuard để làm rối, rút gọn code.</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>isShrinkResources</code></td>
      <td style="padding:8px 12px;">Loại bỏ tài nguyên không dùng tới. Thường bật cùng minify.</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>applicationIdSuffix</code></td>
      <td style="padding:8px 12px;">Thêm hậu tố vào application ID (ví dụ <code>.dev</code>). Giúp cài nhiều bản cùng lúc.</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>versionNameSuffix</code></td>
      <td style="padding:8px 12px;">Thêm hậu tố vào version name hiển thị.</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>signingConfig</code></td>
      <td style="padding:8px 12px;">Khóa ký cho bản build.</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>proguardFiles</code></td>
      <td style="padding:8px 12px;">Danh sách file rules cho R8/ProGuard.</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>buildConfigField</code></td>
      <td style="padding:8px 12px;">Khai báo biến tĩnh trong <code>BuildConfig.java</code>.</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>manifestPlaceholders</code></td>
      <td style="padding:8px 12px;">Truyền biến vào AndroidManifest.xml.</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;"><code>initWith</code></td>
      <td style="padding:8px 12px;">Kế thừa toàn bộ cấu hình từ một Build Type khác.</td>
    </tr>
  </tbody>
</table>

<h2>buildConfigField: Vì sao nên khai báo biến môi trường ở đây?</h2>
<p><strong>buildConfigField</strong> là cách để bạn khai báo một biến tĩnh trong file <code>BuildConfig.java</code> được sinh tự động bởi AGP. Sau khi build, bạn có thể đọc biến này trong code như <code>BuildConfig.BASE_URL</code>.</p>

<h3>Vì sao nên dùng buildConfigField thay vì hardcode?</h3>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tiêu chí</th>
      <th style="padding:8px 12px;text-align:left;">Hardcode trong source</th>
      <th style="padding:8px 12px;text-align:left;">buildConfigField</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Đổi URL theo môi trường</td>
      <td style="padding:8px 12px;">Phải sửa code, build lại</td>
      <td style="padding:8px 12px;">Tự động đổi theo Build Type</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Lọt secret ra ngoài</td>
      <td style="padding:8px 12px;">Có thể bị đọc trong APK</td>
      <td style="padding:8px 12px;">Vẫn có thể bị đọc (xem lưu ý)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Tách biệt config</td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">Có, tập trung ở 1 nơi</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Build theo môi trường</td>
      <td style="padding:8px 12px;">Không đổi được nếu không sửa code</td>
      <td style="padding:8px 12px;">Đổi được khi chọn Build Type</td>
    </tr>
  </tbody>
</table>

<div class="callout-warning">
  <strong>Lưu ý bảo mật:</strong> <code>BuildConfigField</code> <strong>không phải</strong> là nơi lưu secret thật sự an toàn. Mọi giá trị trong <code>BuildConfig</code> đều nằm trong APK và có thể bị đọc ngược (decompile). Chỉ đặt ở đây các cấu hình "không nhạy cảm" như BASE_URL, endpoint, feature flag. Mật khẩu, API key nhạy cảm phải nằm ở phía server hoặc qua kiến trúc bảo mật riêng (ví dụ Backend proxy, Play Integrity).
</div>

<h3>Cách khai báo và sử dụng</h3>
<p>Trong <code>build.gradle.kts</code>:</p>
<pre data-lang="kotlin"><code>buildTypes {
    getByName("debug") {
        buildConfigField("String", "BASE_URL", "\\"https://dev.api.example.com/\\"")
        buildConfigField("boolean", "IS_LOGGING_ENABLED", "true")
    }
    getByName("release") {
        buildConfigField("String", "BASE_URL", "\\"https://api.example.com/\\"")
        buildConfigField("boolean", "IS_LOGGING_ENABLED", "false")
    }
}</code></pre>

<p>Trong code Kotlin:</p>
<pre data-lang="kotlin"><code>object AppConfig {
    val baseUrl: String = BuildConfig.BASE_URL
    val isLoggingEnabled: Boolean = BuildConfig.IS_LOGGING_ENABLED
}</code></pre>

<div class="callout-tip">
  <strong>AGP 8.0 trở đi:</strong> <code>BuildConfig</code> <strong>mặc định bị tắt</strong> để tăng tốc build. Bạn phải bật lại bằng cách thêm vào <code>android { }</code> block:
  <pre data-lang="kotlin"><code>buildFeatures {
    buildConfig = true
}</code></pre>
</div>

<h2>initWith: Kế thừa cấu hình giữa các Build Type</h2>
<p><strong>initWith</strong> cho phép một Build Type kế thừa toàn bộ cấu hình từ một Build Type khác, sau đó ghi đè các thuộc tính cần thiết.</p>
<p>Ví dụ điển hình: Build Type <code>staging</code> cần giống hệt <code>release</code> (bật R8, dùng proguard, ký release) nhưng khác URL server.</p>
<pre data-lang="kotlin"><code>buildTypes {
    getByName("release") {
        isMinifyEnabled = true
        isShrinkResources = true
        proguardFiles(...)
        signingConfig = signingConfigs.getByName("release")
    }
    create("staging") {
        // Kế thừa toàn bộ cấu hình từ release
        initWith(getByName("release"))
        // Sau đó ghi đè những gì cần khác
        applicationIdSuffix = ".staging"
        buildConfigField("String", "BASE_URL", "\\"https://staging.api.example.com/\\"")
        signingConfig = signingConfigs.getByName("staging")
        isDebuggable = true
    }
}</code></pre>
<div class="callout-note">
  <code>initWith</code> giúp tránh lặp lại code. Nhưng thứ tự khai báo quan trọng: <code>initWith</code> phải gọi <strong>trước</strong> khi ghi đè các thuộc tính khác, vì mỗi dòng sau sẽ thay thế giá trị đã kế thừa.
</div>

<h2>Ứng dụng thực tế: Cấu hình 3 môi trường Dev / Staging / Production</h2>
<p>Trong thực tế dự án lớn, <code>debug</code> và <code>release</code> là không đủ. Đội ngũ QA cần một môi trường giống <code>release</code> nhất có thể để test (có Minify/ProGuard) nhưng ứng dụng vẫn trỏ về máy chủ Staging, và có thể cài song song với app Production trên cùng một điện thoại.</p>

<pre data-lang="kotlin"><code>android {
    // 1. Cấu hình Signing (Bảo mật)
    signingConfigs {
        create("staging") {
            storeFile = file("staging-keystore.jks")
            storePassword = "staging_password"
            keyAlias = "staging_key"
            keyPassword = "staging_password"
        }
        create("release") {
            storeFile = file("release-keystore.jks")
            storePassword = System.getenv("RELEASE_STORE_PASSWORD")
            keyAlias = System.getenv("RELEASE_KEY_ALIAS")
            keyPassword = System.getenv("RELEASE_KEY_PASSWORD")
        }
    }

    // 2. Bật BuildConfig để dùng buildConfigField
    buildFeatures {
        buildConfig = true
    }

    buildTypes {
        // Build Type mặc định cho Dev
        getByName("debug") {
            applicationIdSuffix = ".dev"
            versionNameSuffix = "-DEV"
            buildConfigField("String", "BASE_URL", "\\"https://dev.api.example.com/\\"")
            isDebuggable = true
        }
        
        // Build Type cho môi trường Staging/QA
        create("staging") {
            applicationIdSuffix = ".staging" // Cài song song 2 app
            versionNameSuffix = "-STG"
            initWith(getByName("release")) // Kế thừa từ release
            buildConfigField("String", "BASE_URL", "\\"https://staging.api.example.com/\\"")
            signingConfig = signingConfigs.getByName("staging")
            isDebuggable = true 
        }

        // Build Type cho Production
        getByName("release") {
            buildConfigField("String", "BASE_URL", "\\"https://api.example.com/\\"")
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("release")
        }
    }
}</code></pre>

<div class="callout-note">
  Bằng cách cấu hình <code>applicationIdSuffix</code>, bạn có thể cài cả 3 app: <code>com.example.app.dev</code>, <code>com.example.app.staging</code>, và <code>com.example.app</code> lên cùng một điện thoại!
</div>

<h3>Đặt tên file output theo môi trường</h3>
<p>Mặc định, file APK/AAB sẽ có tên kiểu <code>app-debug.apk</code>, <code>app-staging-release.apk</code>... Muốn đặt tên rõ ràng hơn theo môi trường, dùng <code>setProperty("archivesBaseName", ...)</code> hoặc chỉnh <code>applicationVariants</code>:</p>

<p><strong>Cách 1</strong> — Đặt tên gốc trong <code>defaultConfig</code>:</p>
<pre data-lang="kotlin"><code>android {
    defaultConfig {
        // Tên file output sẽ là: MyApp-dev.apk, MyApp-staging.apk, MyApp-release.apk
        setProperty("archivesBaseName", "MyApp")
    }
}</code></pre>

<p><strong>Cách 2</strong> — Tùy biến hoàn toàn tên file theo từng variant:</p>
<pre data-lang="kotlin"><code>android {
    applicationVariants.all {
        val variant = this
        outputs.all {
            val output = this as com.android.build.gradle.internal.api.BaseVariantOutputImpl
            output.outputFileName = "MyApp-\${variant.name}-\${variant.versionName}.apk"
        }
    }
}</code></pre>
<div class="callout-note">
  Tên <code>variant.name</code> sẽ là <code>debug</code>, <code>staging</code> hoặc <code>release</code> (hoặc <code>stagingRelease</code>... khi kết hợp Flavor + Build Type). Kết quả với cách 2: <code>MyApp-staging-1.0.0-STG.apk</code>.
</div>

<h2>Quản lý ProGuard và R8 Rule cho từng môi trường</h2>
<p>Khi bật <code>isMinifyEnabled = true</code>, R8 (công cụ biên dịch thế hệ mới của Android thay thế ProGuard) sẽ tiến hành làm rối mã (obfuscate) và loại bỏ các class/method không dùng tới.</p>

<h3>Cách 1: Sử dụng thư mục Source Sets</h3>
<p>Android liên kết các file trong thư mục mang tên Build Type. Bạn có thể tổ chức rule cho <code>staging</code> riêng.</p>
<pre data-lang="kotlin"><code>buildTypes {
    create("staging") {
        isMinifyEnabled = true
        proguardFiles(
            getDefaultProguardFile("proguard-android-optimize.txt"), 
            "proguard-rules.pro",
            "src/staging/proguard-rules-staging.pro" // Rule cụ thể
        )
    }
}</code></pre>

<h3>Cách 2: Quản lý R8 Rules theo Library</h3>
<p>Nếu viết thư viện (Android Library), hãy gói <code>consumerProguardFiles</code> vào thư viện. Nó sẽ tự động áp dụng (propagate) lên các Build Type sử dụng nó.</p>
<pre data-lang="kotlin"><code>android {
    defaultConfig {
        consumerProguardFiles("consumer-rules.pro")
    }
}</code></pre>

<h2>Kết hợp Build Type với CI/CD</h2>
<p>Build Type là nền tảng để tự động hóa quá trình build trong pipeline CI/CD (Continuous Integration / Continuous Delivery). Ý tưởng chính: CI đọc cùng một <code>build.gradle.kts</code> và chạy lệnh Gradle tương ứng với môi trường.</p>
<p>Ví dụ với <strong>GitHub Actions</strong>:</p>
<pre data-lang="yaml"><code>name: Android CI

on:
  push:
    branches: [main, staging, dev]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '17'
      - name: Grant execute permission for gradlew
        run: chmod +x gradlew
      - name: Build Staging APK
        run: ./gradlew assembleStaging
      - name: Upload APK artifact
        uses: actions/upload-artifact@v4
        with:
          name: staging-apk
          path: app/build/outputs/apk/staging/*.apk</code></pre>
<div class="callout-note">
  Lệnh build tương ứng từng Build Type:
  <ul>
    <li><code>./gradlew assembleDebug</code> → bản debug</li>
    <li><code>./gradlew assembleStaging</code> → bản staging</li>
    <li><code>./gradlew assembleRelease</code> → bản release</li>
  </ul>
  Nếu bạn đã khai báo <strong>Flavor + Build Type</strong> thì tên task có dạng <code>assembleFreeRelease</code>, <code>assemblePaidStaging</code>...
</div>

<h2>Phân phối bản build cho QA bằng Firebase App Distribution</h2>
<p><strong>Firebase App Distribution</strong> (trước đây là Firebase App Tester) cho phép bạn đẩy file APK/AAB lên Firebase để tester tải về trực tiếp trên điện thoại — rất hợp khi cần giao bản staging cho QA.</p>

<h3>Bước 1: Thêm plugin Firebase App Distribution</h3>
<p>Trong <code>build.gradle.kts</code> (project root — block <code>plugins</code>):</p>
<pre data-lang="kotlin"><code>plugins {
    id("com.android.application") version "8.x" apply false
    id("com.google.firebase.appdistribution") version "4.x" apply false
}</code></pre>
<p>Trong <code>build.gradle.kts</code> (module app):</p>
<pre data-lang="kotlin"><code>plugins {
    id("com.android.application")
    id("com.google.firebase.appdistribution")
}</code></pre>

<h3>Bước 2: Cấu hình nhóm tester cho từng Build Type</h3>
<pre data-lang="kotlin"><code>buildTypes {
    create("staging") {
        // ... cấu hình signing, minify như trên ...
        
        firebaseAppDistribution {
            groups = "qa-team"          // Nhóm tester nhận bản staging
            releaseNotes = "Bản staging mới - cập nhật API"
            serviceCredentialsFile = System.getenv("FIREBASE_CREDENTIALS_FILE")
        }
    }
    getByName("release") {
        firebaseAppDistribution {
            groups = "release-reviewers"
            releaseNotes = "Bản release chuẩn bị phát hành"
            serviceCredentialsFile = System.getenv("FIREBASE_CREDENTIALS_FILE")
        }
    }
}</code></pre>

<h3>Bước 3: Đẩy bản build lên Firebase</h3>
<pre data-lang="bash"><code># Build staging và đẩy lên Firebase cho nhóm qa-team
./gradlew assembleStaging appDistributionUploadStaging</code></pre>
<div class="callout-note">
  <code>serviceCredentialsFile</code> nên đọc từ <strong>biến môi trường</strong> (như ví dụ trên) chứ không hardcode đường dẫn, để tránh lộ credential khi commit lên Git. File credential thường là JSON của Service Account từ Firebase Console.
</div>
<div class="callout-tip">
  <strong>Kết hợp CI/CD + Firebase App Distribution:</strong> thay vì chạy tay, bạn có thể để pipeline CI (GitHub Actions, GitLab CI, Jenkins...) tự động chạy <code>appDistributionUploadStaging</code> mỗi khi có commit mới trên nhánh <code>staging</code>. Đây là pattern phổ biến để QA luôn có bản mới nhất mà không cần developer build thủ công.
</div>

<h2>Trade-offs và Common Mistakes</h2>
<ol>
  <li><strong>Test QA trên bản <code>debug</code>:</strong> QA test trên <code>debug</code>, nhưng release chạy <code>release</code> có R8, gây ra Crash do Not Found Method bị xóa nhầm (thường xảy ra với Reflection hoặc Gson/Moshi). <strong>Giải pháp:</strong> Tạo môi trường <code>staging</code> bật R8 để QA test.</li>
  <li><strong>Hardcode mật khẩu Keystore:</strong> Chèn cứng mật khẩu trong <code>build.gradle.kts</code>. <strong>Giải pháp:</strong> Dùng Environment Variables hoặc <code>local.properties</code>.</li>
  <li><strong>Lạm dụng Build Types:</strong> Dùng Build Type để định nghĩa giao diện (<code>redTheme</code>, <code>blueTheme</code>). <strong>Giải pháp:</strong> Dùng Product Flavors cho biến thể nội dung.</li>
  <li><strong>Quên bật <code>buildConfig = true</code>:</strong> Với AGP 8+, dùng <code>BuildConfig.BASE_URL</code> mà quên khai báo <code>buildFeatures { buildConfig = true }</code> sẽ báo lỗi không tìm thấy field. <strong>Giải pháp:</strong> Bật <code>buildConfig</code> khi dùng <code>buildConfigField</code>.</li>
  <li><strong>Đặt secret thật sự vào <code>buildConfigField</code>:</strong> Dù không hiển thị trên UI, mọi giá trị BuildConfig vẫn nằm trong APK và có thể bị decompile. <strong>Giải pháp:</strong> Chỉ đặt config không nhạy cảm; secret phải nằm ở server.</li>
</ol>

<h2>Tổng kết</h2>
<p>Build Type giúp hệ thống hóa quy trình từ lúc viết code đến lúc ra mắt sản phẩm. Việc thiết lập đúng đắn các biến môi trường, khóa ký, cấu hình minification không chỉ giúp tự động hóa qua hệ thống CI/CD, mà còn cứu lập trình viên khỏi vô số lỗi ngớ ngẩn do "quên đổi URL" hay "quên tắt Log" trước khi tung app lên store.</p>

<h3>Lộ trình học tiếp</h3>
<ul>
  <li><strong>Product Flavors</strong> — để quản lý các phiên bản sản phẩm (Free/Paid/Enterprise) kết hợp cùng Build Type.</li>
  <li><strong>Gradle Plugin</strong> — hiểu cách AGP và các plugin khác được khai báo và nạp.</li>
  <li><strong>APK / AAB</strong> — hiểu định dạng output mà Build Type tạo ra.</li>
</ul>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/build/build-variants">Android Developers — Configure build variants</a></li>
  <li><a href="https://developer.android.com/build/build-types">Android Developers — Configure build types</a></li>
  <li><a href="https://developer.android.com/build/releases/gradle-plugin#build-config">Android Developers — BuildConfig</a></li>
  <li><a href="https://docs.gradle.org/current/userguide/what_is_gradle.html">Gradle Documentation — Build System</a></li>
  <li><a href="https://firebase.google.com/docs/app-distribution">Firebase App Distribution</a></li>
  <li><a href="https://developer.android.com/build/shrink-code">Android Developers — Shrink your code and resources</a></li>
</ul>
`
  },

  'flavor': {
    title: 'Flavor',
    summary: 'Hiểu sâu về Product Flavor trong Gradle/AGP để tạo nhiều bản build khác nhau từ một mã nguồn duy nhất, kết hợp Build Type thành Build Variant, tách code/resources theo flavor, flavorDimensions, matchingFallbacks và ứng dụng vào CI/CD cùng multi-store.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['android', 'gradle', 'agp', 'flavor', 'product-flavors', 'flavor-dimensions', 'build-variants', 'source-sets', 'buildconfigfield', 'ci-cd'],
    domain: 'Android',
    module: 'Session 04: Android Manifest - Package, build, gradle',
    prerequisites: ['build-types', 'apk-files', 'aab-files'],
    related: ['plugin'],
    learningOutcomes: [
      'Giải thích được Product Flavor là gì và vì sao nó tồn tại.',
      'Phân biệt được Build Types và Product Flavors cùng lúc nào dùng loại nào.',
      'Mô tả được cơ chế Build Variant, flavorDimensions và thứ tự merge Source Set.',
      'Cấu hình được productFlavors, flavorDimensions, applicationId, versionName theo Kotlin DSL.',
      'Tách được code và resources (strings, colors, icon) theo từng flavor.',
      'Sử dụng được buildConfigField và BuildConfig.FLAVOR để phân biệt flavor trong code.',
      'Áp dụng được matchingFallbacks khi kết hợp app module với library module.',
      'Kết hợp được Flavor với CI/CD và đa cửa hàng (multi-store).'
    ],
    knowledgeGap: 'Nhầm lẫn giữa Build Types và Product Flavors dẫn đến việc cấu hình sai mô hình build variant, không tách được code/resource theo flavor, hoặc sinh ra quá nhiều variant không kiểm soát. Không hiểu cơ chế flavorDimensions và merge source set khiến dễ gây lỗi trùng resource, sai applicationId và build fail khi kết hợp library module.',
    updatedAt: '2026-08-02',
    readTime: '35 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Trong một dự án Android thực tế, rất hiếm khi bạn chỉ phát hành <strong>một</strong> sản phẩm duy nhất. Cùng một mã nguồn, bạn thường phải tạo ra nhiều phiên bản khác nhau:</p>
<ul>
  <li><strong>Theo giai đoạn phát triển:</strong> bản cho Developer (dev), bản cho QA test (staging), bản phát hành (production).</li>
  <li><strong>Theo nội dung sản phẩm:</strong> bản miễn phí (free) và bản trả phí (paid), bản cho đối tác (white-label) có logo và màu sắc riêng.</li>
  <li><strong>Theo kênh phân phối:</strong> bản Google Play, bản Samsung Store, bản dành cho thị trường Trung Quốc.</li>
</ul>
<p>Nếu chỉ dùng <strong>Build Types</strong> (đã học ở topic 4.1.1.1), bạn mới giải quyết được phần "cách build" (debug/release, có minify hay không, ký khóa nào). Nhưng bạn <strong>không thể</strong> tách nội dung như: bản free không có màn hình nâng cấp, bản trả phí có tất cả tính năng, mỗi khách hàng một màu sắc riêng.</p>
<p>Nếu bạn cứ copy nguyên một project để làm phiên bản thứ hai, bạn sẽ gặp thảm họa bảo trì:</p>
<ul>
  <li>Sửa một bug phải sửa ở 3 project khác nhau.</li>
  <li>Các phiên bản dần dần lệch nhau không thể gộp lại.</li>
  <li>Khó nâng cấp, khó theo dõi, build chậm.</li>
</ul>
<p><strong>Android cung cấp Product Flavor để giải quyết bài toán "nhiều phiên bản sản phẩm từ một mã nguồn duy nhất".</strong></p>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được Product Flavor là gì và vì sao nó tồn tại.</li>
  <li>Phân biệt được Build Types và Product Flavors cùng lúc nào dùng loại nào.</li>
  <li>Mô tả được cơ chế Build Variant, flavorDimensions và thứ tự merge Source Set.</li>
  <li>Cấu hình được productFlavors, flavorDimensions, applicationId, versionName theo Kotlin DSL.</li>
  <li>Tách được code và resources (strings, colors, icon) theo từng flavor.</li>
  <li>Sử dụng được buildConfigField và BuildConfig.FLAVOR để phân biệt flavor trong code.</li>
  <li>Áp dụng được matchingFallbacks khi kết hợp app module với library module.</li>
  <li>Kết hợp được Flavor với CI/CD và đa cửa hàng (multi-store).</li>
</ul>

<h2>Nền tảng cần biết trước: Gradle, AGP và Build Types</h2>
<p>Bài này giả định bạn đã nắm các khái niệm từ topic <strong>Build Types</strong>:</p>
<ul>
  <li><strong>Gradle</strong> là hệ thống build dựa trên Task Graph.</li>
  <li><strong>AGP</strong> (Android Gradle Plugin) là plugin giúp Gradle hiểu cách build Android.</li>
  <li><strong>Build Type</strong> định nghĩa <em>cách</em> ứng dụng được build ở từng giai đoạn (debug, release, staging).</li>
</ul>
<p>Nếu cần ôn lại, hãy đọc topic <strong>4.1.1.1 Build Types</strong>. Dưới đây chỉ tóm tắt mối quan hệ nền tảng:</p>
<div class="mermaid">
flowchart LR
    A[Gradle] -->|nạp| B[AGP]
    B -->|đọc| C[build.gradle.kts]
    C -->|khai báo| D[productFlavors + buildTypes]
    D -->|kết hợp| E[Build Variant]
    E -->|thực thi task| F[APK / AAB]
</div>

<h2>Product Flavor là gì?</h2>
<p><strong>Product Flavor</strong> (Loại sản phẩm) là một <strong>biến thể của ứng dụng</strong> mà bạn định nghĩa trong <code>productFlavors</code> block của <code>build.gradle.kts</code>. Mỗi flavor đại diện cho một "phiên bản sản phẩm" riêng biệt với cùng mã nguồn gốc.</p>
<p>Mỗi flavor có thể định nghĩa lại:</p>
<ul>
  <li><code>applicationId</code> (tên gói) — giúp cài song song hai phiên bản trên cùng một máy.</li>
  <li><code>versionName</code> / <code>versionCode</code>.</li>
  <li><code>buildConfigField</code> — biến môi trường, cờ bật/tắt tính năng.</li>
  <li><code>manifestPlaceholders</code> — biến chèn vào <code>AndroidManifest.xml</code>.</li>
  <li>Source Set riêng: code, resources, assets, manifest riêng.</li>
</ul>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Mental model đơn giản:</strong> Build Type trả lời câu hỏi <em>"Ứng dụng được build ở giai đoạn nào?"</em> (debug/release). Product Flavor trả lời câu hỏi <em>"Phiên bản sản phẩm này dành cho ai, chứa những gì?"</em> (free/paid/enterprise/dev/prod).</div></div>

<h2>Vì sao cần Product Flavor?</h2>
<p>Product Flavor tồn tại vì một lý do duy nhất: <strong>tạo nhiều phiên bản sản phẩm từ một mã nguồn duy nhất</strong>, giúp:</p>
<ul>
  <li><strong>Giảm chi phí bảo trì:</strong> sửa một chỗ, tất cả flavor đều có thay đổi.</li>
  <li><strong>Tách nội dung hợp lý:</strong> code chung đặt ở <code>src/main</code>, code riêng đặt ở <code>src/&lt;flavor&gt;</code>.</li>
  <li><strong>Phát hành độc lập:</strong> mỗi flavor có applicationId riêng nên có thể lên store độc lập hoặc cài song song để QA.</li>
  <li><strong>Tự động hóa:</strong> CI/CD có thể build hàng loạt flavor bằng lệnh <code>assemble</code> tương ứng.</li>
</ul>

<h2>Phân biệt Build Types và Product Flavors</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tiêu chí</th>
      <th style="padding:8px 12px;text-align:left;">Build Types</th>
      <th style="padding:8px 12px;text-align:left;">Product Flavors</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Câu hỏi</td>
      <td style="padding:8px 12px;"><em>Cách</em> build ra sao?</td>
      <td style="padding:8px 12px;"><em>Cái gì</em> được build?</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Ví dụ</td>
      <td style="padding:8px 12px;"><code>debug</code>, <code>release</code>, <code>staging</code></td>
      <td style="padding:8px 12px;"><code>free</code>, <code>paid</code>, <code>dev</code>, <code>prod</code></td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Thay đổi gì</td>
      <td style="padding:8px 12px;">Minify, signing, log, khả năng debug</td>
      <td style="padding:8px 12px;">applicationId, tính năng, icon, màu sắc, server</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Người dùng có thấy không</td>
      <td style="padding:8px 12px;">Không (không nên thấy)</td>
      <td style="padding:8px 12px;">Có (đây là sản phẩm họ dùng)</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;">Vai trò trong variant</td>
      <td style="padding:8px 12px;">Kết hợp cùng flavor tạo variant</td>
      <td style="padding:8px 12px;">Kết hợp cùng build type tạo variant</td>
    </tr>
  </tbody>
</table>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Quy tắc ngón tay cái:</strong> Nếu thay đổi mà người dùng cuối <strong>không nên quan tâm</strong> (có debug không, ký khóa nào) → <strong>Build Type</strong>. Nếu thay đổi mà người dùng <strong>sẽ thấy và so sánh</strong> (tên app, icon, tính năng, server cho từng khách hàng) → <strong>Flavor</strong>.</div></div>

<h2>Cơ chế hoạt động: Build Variant</h2>
<p><strong>Build Variant</strong> là kết quả kết hợp của <strong>một Product Flavor</strong> với <strong>một Build Type</strong>.</p>
<p>Công thức:</p>
<p><code>Build Variant = Product Flavor × Build Type</code></p>
<p>Ví dụ với 2 flavor (<code>free</code>, <code>paid</code>) và 2 build type (<code>debug</code>, <code>release</code>), bạn có <strong>4 build variant</strong>:</p>
<pre data-lang="text"><code>freeDebug     → bản miễn phí, cho dev chạy debug
freeRelease   → bản miễn phí, phát hành
paidDebug     → bản trả phí, cho dev chạy debug
paidRelease   → bản trả phí, phát hành</code></pre>
<p>Mỗi variant có <strong>tên task build riêng</strong>: <code>assembleFreeDebug</code>, <code>assembleFreeRelease</code>, <code>assemblePaidDebug</code>, <code>assemblePaidRelease</code>.</p>
<div class="mermaid">
flowchart TD
    subgraph Flavors["Product Flavors"]
        F1[free]
        F2[paid]
    end
    subgraph BuildTypes["Build Types"]
        B1[debug]
        B2[release]
    end

    F1 --> V1[freeDebug]
    F1 --> V2[freeRelease]
    F2 --> V3[paidDebug]
    F2 --> V4[paidRelease]

    B1 --> V1
    B1 --> V3
    B2 --> V2
    B2 --> V4

    V1 --> O1[APK / AAB]
    V2 --> O1
    V3 --> O1
    V4 --> O1
</div>

<h2>flavorDimensions: Vì sao cần khai báo dimension?</h2>
<p>Khi bạn chỉ có <strong>một nhóm flavor</strong> (ví dụ free/paid), bạn không cần <code>flavorDimensions</code>. Nhưng khi bạn có <strong>nhiều chiều phân loại cùng lúc</strong>, Gradle bắt buộc bạn khai báo <code>flavorDimensions</code>.</p>
<p>Ví dụ: app vừa phân loại theo <strong>môi trường</strong> (dev/prod), vừa phân loại theo <strong>kênh phân phối</strong> (gplay/samsung). Mỗi chiều là một <code>flavorDimension</code>:</p>
<pre data-lang="kotlin"><code>android {
    flavorDimensions += listOf("environment", "store")

    productFlavors {
        create("dev") { dimension = "environment" }
        create("prod") { dimension = "environment" }
        create("gplay") { dimension = "store" }
        create("samsung") { dimension = "store" }
    }
}</code></pre>
<p>Số variant bây giờ = số flavor của mỗi dimension nhân với nhau, rồi nhân với build type:</p>
<pre data-lang="text"><code>2 (environment) × 2 (store) × 2 (build type) = 8 variant</code></pre>
<div class="callout callout-warning"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Cảnh báo:</strong> số lượng variant tăng theo cấp số nhân (<code>n_dim1 × n_dim2 × n_buildtype</code>). Càng nhiều dimension, Gradle Sync càng lâu và thời gian build toàn bộ càng tăng. Chỉ thêm dimension khi thật sự cần tách độc lập hai trục phân loại.</div></div>

<h2>Khai báo Product Flavor cơ bản trong build.gradle.kts</h2>
<p>Đây là cấu hình tối thiểu — tách 2 phiên bản sản phẩm <code>free</code> và <code>paid</code>:</p>
<pre data-lang="kotlin"><code>android {
    productFlavors {
        create("free") {
            applicationId = "com.example.myapp.free"
            versionName = "1.0.0-free"
            buildConfigField("String", "PRODUCT", "\\"free\\"")
        }
        create("paid") {
            applicationId = "com.example.myapp.paid"
            versionName = "1.0.0-paid"
            buildConfigField("String", "PRODUCT", "\\"paid\\"")
        }
    }
}</code></pre>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><code>applicationId</code> của từng flavor thường kế thừa <code>applicationId</code> trong <code>defaultConfig</code>, sau đó ghi đè bằng hậu tố <code>.free</code>, <code>.paid</code>. Nhờ đó hai bản có thể cài song song trên cùng một máy để QA so sánh.</div></div>

<h2>Source Sets theo Flavor</h2>
<p>Một trong những sức mạnh lớn nhất của Flavor là <strong>Source Set riêng</strong>.</p>
<p>Mặc định, mọi code/resource chung nằm ở <code>src/main/</code>. Mỗi flavor có thư mục riêng tên theo flavor:</p>
<pre data-lang="text"><code>app/
 ├── src/
 │   ├── main/            ← code + resource chung cho mọi flavor
 │   │   ├── java/com/example/myapp/
 │   │   └── res/
 │   ├── free/            ← chỉ dành cho flavor free
 │   │   ├── java/com/example/myapp/
 │   │   └── res/
 │   ├── paid/            ← chỉ dành cho flavor paid
 │   │   ├── java/com/example/myapp/
 │   │   └── res/
 │   ├── debug/           ← source set theo build type (đã học ở Build Types)
 │   └── release/</code></pre>

<h3>Thứ tự merge Source Set (quan trọng!)</h3>
<p>Khi build một variant, AGP gộp nhiều source set lại. <strong>Nguồn sau ghi đè nguồn trước.</strong> Thứ tự ưu tiên từ cao đến thấp:</p>
<pre data-lang="text"><code>src/&lt;flavor&gt;&lt;BuildType&gt;/     (cao nhất — ví dụ freeDebug/)
src/&lt;BuildType&gt;/             (ví dụ debug/)
src/&lt;flavor&gt;/                (ví dụ free/)
src/&lt;flavorDimension&gt;/       (chỉ khi có dimension)
src/main/                    (thấp nhất — nền tảng chung)</code></pre>
<div class="mermaid">
flowchart TD
    M[src/main\nCode + Resource chung] --> M2{Merge theo variant}
    F[src/free\nChỉ riêng flavor free] --> M2
    B[src/debug\nChỉ riêng build type debug] --> M2
    FB[src/freeDebug\nƯu tiên cao nhất] --> M2
    M2 -->|Nguồn sau ghi đè nguồn trước| V[freeDebug variant]
</div>
<div class="callout callout-warning"><span class="callout-icon">⚠️</span><div class="callout-body">Nếu cùng một file resource tồn tại ở <code>src/main</code> và <code>src/free</code>, AGP sẽ ưu tiên file ở <code>src/free</code>. Nhưng <strong>không được</strong> để <em>cùng một tên class</em> (ví dụ cùng package <code>MainActivity.kt</code>) xuất hiện ở nhiều source set cùng lúc — bạn sẽ gặp lỗi duplicate class. Một file code chỉ được tồn tại ở một source set.</div></div>

<h2>Tách Code theo Flavor</h2>
<p>Khi bạn muốn mỗi flavor có logic riêng, đặt file code vào source set của flavor đó.</p>
<p>Ví dụ: flavor <code>free</code> hiển thị quảng cáo, flavor <code>paid</code> thì không. Tạo interface chung trong <code>main</code>, hai triển khai riêng:</p>
<pre data-lang="kotlin"><code>// src/main/java/com/example/myapp/feature/AdsProvider.kt (chung)
interface AdsProvider {
    fun showBanner()
}</code></pre>
<pre data-lang="kotlin"><code>// src/free/java/com/example/myapp/feature/AdsProvider.kt (chỉ có trong flavor free)
class FreeAdsProvider : AdsProvider {
    override fun showBanner() {
        // Hiển thị banner quảng cáo
    }
}</code></pre>
<pre data-lang="kotlin"><code>// src/paid/java/com/example/myapp/feature/AdsProvider.kt (chỉ có trong flavor paid)
class PaidAdsProvider : AdsProvider {
    override fun showBanner() {
        // Không có quảng cáo
    }
}</code></pre>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Class nằm trong source set của flavor nào chỉ được biên dịch khi build flavor đó. Đây là cách sạch nhất để "có/không có" tính năng theo từng phiên bản sản phẩm, thay vì rải rác câu <code>if (BuildConfig.FLAVOR == "free")</code>.</div></div>

<h2>Tách Resources theo Flavor</h2>
<h3>strings.xml theo từng flavor</h3>
<p>Đặt file <code>strings.xml</code> cùng tên ở cả <code>src/main</code> và <code>src/free</code>, <code>src/paid</code>:</p>
<pre data-lang="text"><code>src/main/res/values/strings.xml   → app_name = "MyApp"
src/free/res/values/strings.xml   → app_name = "MyApp Free"
src/paid/res/values/strings.xml   → app_name = "MyApp Pro"</code></pre>
<p>Khi build flavor <code>free</code>, tên app hiển thị là <strong>MyApp Free</strong>. Resource này không cần viết thêm code — AGP tự chọn theo quy tắc merge ở trên.</p>
<h3>Icon, màu sắc, logo riêng</h3>
<p>Cũng tương tự: đặt <code>mipmap</code>, <code>drawable</code>, <code>values/colors.xml</code> vào thư mục resource của từng flavor để mỗi phiên bản sản phẩm có giao diện riêng (white-label).</p>

<h2>buildConfigField theo Flavor</h2>
<p>Bên cạnh build type, bạn có thể khai báo <code>buildConfigField</code> theo flavor. Đây là nơi lý tưởng để đặt <strong>server URL theo từng phiên bản sản phẩm</strong>:</p>
<pre data-lang="kotlin"><code>android {
    productFlavors {
        create("dev") {
            buildConfigField("String", "API_BASE_URL", "\\"https://dev.api.example.com/\\"")
            buildConfigField("boolean", "ENABLE_ANALYTICS", "false")
        }
        create("prod") {
            buildConfigField("String", "API_BASE_URL", "\\"https://api.example.com/\\"")
            buildConfigField("boolean", "ENABLE_ANALYTICS", "true")
        }
    }
}</code></pre>
<p>Trong code:</p>
<pre data-lang="kotlin"><code>object AppConfig {
    val apiBaseUrl: String = BuildConfig.API_BASE_URL
    val isAnalyticsEnabled: Boolean = BuildConfig.ENABLE_ANALYTICS
}</code></pre>
<div class="callout callout-warning"><span class="callout-icon">⚠️</span><div class="callout-body">Như Build Types đã nhấn mạnh: <code>buildConfigField</code> <strong>không phải</strong> nơi an toàn để chứa secret. Mọi giá trị trong <code>BuildConfig</code> đều có thể bị decompile từ APK. Chỉ đặt config không nhạy cảm (URL, feature flag).</div></div>

<h2>BuildConfig.FLAVOR: Đọc tên flavor trong code</h2>
<p>AGP tự sinh hằng số <code>BuildConfig.FLAVOR</code> chứa tên flavor hiện tại:</p>
<pre data-lang="kotlin"><code>Log.d("Flavor", "Đang chạy bản: \${BuildConfig.FLAVOR}")</code></pre>
<p>Khi bạn có nhiều dimension, mỗi dimension được sinh một hằng số riêng theo tên dimension:</p>
<pre data-lang="kotlin"><code>// flavorDimensions = ["environment", "store"]
// flavor dev + gplay
BuildConfig.FLAVOR_environment  // "dev"
BuildConfig.FLAVOR_store        // "gplay"</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">Ưu tiên dùng <code>buildConfigField</code> hoặc source set riêng thay vì rải rác <code>if (BuildConfig.FLAVOR == ...)</code> trong code chính. Kiểm tra <code>FLAVOR</code> chỉ phù hợp cho các tình huống nhỏ, tạm thời, không nằm trong luồng nghiệp vụ chính.</div></div>

<h2>Ứng dụng thực tế 1: Tách môi trường setup bằng Flavor</h2>
<p>Đây là bài toán bạn đặt ra: <strong>tạo nhiều bản build dựa trên môi trường setup</strong>.</p>
<p>Có hai cách tiếp cận phổ biến:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Cách</th>
      <th style="padding:8px 12px;text-align:left;">Mô tả</th>
      <th style="padding:8px 12px;text-align:left;">Phù hợp khi</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Dùng Build Type cho môi trường</td>
      <td style="padding:8px 12px;"><code>debug</code>/<code>staging</code>/<code>release</code> là môi trường</td>
      <td style="padding:8px 12px;">Mọi phiên bản sản phẩm đều dùng chung môi trường</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;">Dùng Flavor cho môi trường</td>
      <td style="padding:8px 12px;"><code>dev</code>/<code>staging</code>/<code>prod</code> là flavor</td>
      <td style="padding:8px 12px;">Cần mỗi môi trường có applicationId riêng, cài song song, hoặc kết hợp với trục sản phẩm</td>
    </tr>
  </tbody>
</table>
<p>Khi bạn cần QA cài đồng thời bản <strong>dev</strong> và bản <strong>prod</strong> trên cùng một máy (mỗi bản một <code>applicationId</code>), Flavor là lựa chọn phù hợp.</p>
<pre data-lang="kotlin"><code>android {
    // Bật BuildConfig để dùng buildConfigField
    buildFeatures {
        buildConfig = true
    }

    flavorDimensions += "environment"

    productFlavors {
        create("dev") {
            dimension = "environment"
            applicationId = "com.example.myapp.dev"
            versionNameSuffix = "-DEV"
            buildConfigField("String", "API_BASE_URL", "\\"https://dev.api.example.com/\\"")
            buildConfigField("String", "API_KEY", "\\"dev_key_not_secret\\"")
        }
        create("staging") {
            dimension = "environment"
            applicationId = "com.example.myapp.staging"
            versionNameSuffix = "-STG"
            buildConfigField("String", "API_BASE_URL", "\\"https://staging.api.example.com/\\"")
            buildConfigField("String", "API_KEY", "\\"staging_key_not_secret\\"")
        }
        create("prod") {
            dimension = "environment"
            applicationId = "com.example.myapp"
            buildConfigField("String", "API_BASE_URL", "\\"https://api.example.com/\\"")
            buildConfigField("String", "API_KEY", "\\"prod_key_not_secret\\"")
        }
    }
}</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">API key "không nhạy cảm" ở trên chỉ là config. Key thật phải lấy từ server hoặc qua kiến trúc bảo mật riêng (Backend proxy, Play Integrity) — không bao giờ đặt secret trong <code>buildConfigField</code>.</div></div>

<h2>Ứng dụng thực tế 2: Kết hợp Flavor môi trường + Flavor sản phẩm + Build Type</h2>
<p>Khi dự án vừa cần tách môi trường vừa cần tách sản phẩm (free/paid), ta dùng <strong>2 dimension + build types</strong>:</p>
<pre data-lang="kotlin"><code>android {
    flavorDimensions += listOf("environment", "version")

    productFlavors {
        // Trục môi trường
        create("dev") { dimension = "environment" }
        create("prod") { dimension = "environment" }

        // Trục phiên bản sản phẩm
        create("free") {
            dimension = "version"
            applicationId = "com.example.myapp.free"
        }
        create("paid") {
            dimension = "version"
            applicationId = "com.example.myapp.paid"
        }
    }
}</code></pre>
<p>Số variant:</p>
<pre data-lang="text"><code>dev × free × debug  = devFreeDebug
dev × free × release = devFreeRelease
dev × paid × debug  = devPaidDebug
dev × paid × release = devPaidRelease
prod × free × debug = prodFreeDebug
prod × free × release = prodFreeRelease
prod × paid × debug = prodPaidDebug
prod × paid × release = prodPaidRelease</code></pre>
<p>Tên task build tương ứng: <code>./gradlew assembleProdPaidRelease</code>, <code>./gradlew assembleDevFreeDebug</code>...</p>

<h2>matchingFallbacks: Khi app module kết hợp với library module</h2>
<p>Khi project của bạn có <strong>library module</strong> (Android Library) và library đó cũng định nghĩa flavor riêng, app phải khai báo <strong><code>matchingFallbacks</code></strong> để Gradle biết flavor của app tương ứng với flavor nào của library.</p>
<p>Ví dụ: library có flavor <code>minimal</code>/<code>full</code>, app có flavor <code>free</code>/<code>paid</code>. App khai báo:</p>
<pre data-lang="kotlin"><code>android {
    productFlavors {
        create("free") {
            matchingFallbacks += listOf("minimal")
        }
        create("paid") {
            matchingFallbacks += listOf("full")
        }
    }
}</code></pre>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Nếu không có <code>matchingFallbacks</code>, Gradle báo lỗi tương tự <em>"Flavor 'free' doesn't match flavors of module :library"</em> khi build. <code>matchingFallbacks</code> cũng dùng để map flavor app với flavor của một app khác trong cùng build.</div></div>

<h2>Kết hợp Flavor với CI/CD</h2>
<p>Flavor là nền tảng để CI tự động build nhiều phiên bản. Với <strong>GitHub Actions</strong>, bạn có thể dùng matrix build để chạy song song các flavor:</p>
<pre data-lang="yaml"><code>name: Android Build Flavors

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        flavor: [dev, staging, prod]
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '17'
      - name: Grant execute permission
        run: chmod +x gradlew
      - name: Build APK
        run: ./gradlew assemble\$\{{ matrix.flavor }}Release
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: apk-\$\{{ matrix.flavor }}
          path: app/build/outputs/apk/\$\{{ matrix.flavor }}/release/*.apk</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">Lệnh build tương ứng:
<ul>
  <li><code>./gradlew assembleDevRelease</code> → bản dev release</li>
  <li><code>./gradlew assembleProdDebug</code> → bản prod debug</li>
  <li><code>./gradlew assembleProdPaidRelease</code> → bản prod paid release</li>
</ul>
Với 2 dimension, tên task là <code>assemble&lt;Dimension1&gt;&lt;Dimension2&gt;&lt;BuildType&gt;</code> — ví dụ <code>assembleProdPaidRelease</code>.</div></div>

<h2>Kết hợp Flavor với đa cửa hàng (Multi-store)</h2>
<p>Khi phát hành app trên nhiều cửa hàng (Google Play, Samsung Store, Huawei AppGallery), mỗi nơi có thể yêu cầu applicationId hoặc SDK riêng. Dùng dimension <code>store</code>:</p>
<pre data-lang="kotlin"><code>android {
    flavorDimensions += "store"

    productFlavors {
        create("gplay") {
            dimension = "store"
            // Google Play: có thể dùng Dynamic Delivery / Play Billing
        }
        create("samsung") {
            dimension = "store"
            applicationId = "com.example.myapp.samsung"
            // Samsung: có thể thêm Galaxy Store SDK qua source set samsung
        }
    }
}</code></pre>
<p>Kết hợp với CI/CD, pipeline có thể build và upload từng flavor về đúng store:</p>
<pre data-lang="yaml"><code>- name: Build &amp; Deploy gplay
  run: ./gradlew assembleGplayRelease
- name: Build &amp; Deploy samsung
  run: ./gradlew assembleSamsungRelease</code></pre>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Mỗi store thường yêu cầu một keystore / signing config riêng. Có thể gán <code>signingConfig</code> khác nhau trong từng flavor, hoặc trong từng build type release.</div></div>

<h2>Trade-offs và Common Mistakes (Những sai lầm thường gặp)</h2>
<ol>
  <li><strong>Dùng Build Type để tách nội dung sản phẩm:</strong> Định nghĩa <code>buildTypes { create("free")... }</code>, <code>create("paid")...</code> để đổi icon/màu. Đây là dùng sai mục đích — Build Type quyết định <em>cách build</em>, Flavor mới quyết định <em>nội dung</em>. Hậu quả: không tách được source set theo sản phẩm, variant lộn xộn.</li>
  <li><strong>Quên khai báo <code>flavorDimensions</code> khi có nhiều trục flavor:</strong> Gradle báo lỗi cấu hình ngay khi sync. Luôn khai báo dimension khi có từ 2 nhóm flavor trở lên.</li>
  <li><strong>Tạo quá nhiều dimension:</strong> Mỗi dimension nhân số variant lên. 3 dimension × 3 flavor mỗi cái × 2 build type = 18 variant → build toàn bộ rất lâu. Chỉ thêm dimension khi thật sự cần.</li>
  <li><strong>Đặt cùng một class vào nhiều source set:</strong> Ví dụ đặt <code>MainActivity.kt</code> cả ở <code>main</code> và <code>free</code> → lỗi duplicate class khi merge. Một class chỉ thuộc một source set.</li>
  <li><strong>Quên <code>matchingFallbacks</code> khi dùng library có flavor:</strong> Build fail với lỗi flavor mismatch. Khai báo <code>matchingFallbacks</code> trong từng flavor của app.</li>
  <li><strong>Đặt secret vào <code>buildConfigField</code>:</strong> API key, mật khẩu bị decompile từ APK. Chỉ đặt config không nhạy cảm.</li>
  <li><strong>Quên bật <code>buildConfig = true</code>:</strong> Với AGP 8+, dùng <code>BuildConfig.API_BASE_URL</code> mà chưa bật <code>buildFeatures { buildConfig = true }</code> sẽ báo lỗi không tìm thấy field.</li>
  <li><strong>Nhầm tên task build:</strong> Tên task là <code>assemble&lt;Flavor&gt;&lt;BuildType&gt;</code> (ghi hoa chữ cái đầu, không có dấu phân cách). <code>assemblefreeRelease</code> sai → phải <code>assembleFreeRelease</code>.</li>
</ol>

<h2>Tổng kết</h2>
<p>Product Flavor cho phép bạn tạo <strong>nhiều phiên bản sản phẩm từ một mã nguồn duy nhất</strong>: tách code, resources, applicationId, biến môi trường theo từng flavor. Kết hợp với Build Type, bạn có <strong>Build Variant</strong> — mỗi variant là một sản phẩm build hoàn chỉnh, có task build riêng, dễ tự động hóa trong CI/CD và đa cửa hàng.</p>
<p>Nắm được <code>flavorDimensions</code>, thứ tự merge source set và <code>matchingFallbacks</code> là đủ để bạn xử lý mọi tình huống thực tế: từ tách môi trường dev/staging/prod đến tách sản phẩm free/paid và phân phối đa store.</p>

<h3>Lộ trình học tiếp</h3>
<ul>
  <li><strong>Gradle Plugin</strong> — hiểu cách AGP và các plugin được khai báo, nạp và ảnh hưởng tới build.</li>
  <li><strong>APK / AAB</strong> — hiểu định dạng output mà mỗi build variant tạo ra và cách đóng gói.</li>
</ul>

<h2>Kết nối hệ thống</h2>
<p>Trong kiến trúc dự án Android thực tế (MVVM/Clean Architecture), Flavor nằm ở tầng <strong>build configuration</strong> — ngoài mã nguồn nghiệp vụ:</p>
<ul>
  <li><strong>UI layer</strong> (Activity, Compose): đọc cấu hình từ <code>BuildConfig</code> hoặc DI container (Hilt/Koin) mà không quan tâm flavor nào.</li>
  <li><strong>Domain layer</strong> (UseCase, Model): hoàn toàn độc lập, không bao giờ chạm <code>BuildConfig</code>.</li>
  <li><strong>Data layer</strong> (Repository, API): nhận <code>API_BASE_URL</code> từ config do flavor/build type sinh ra — nơi duy nhất biết flavor.</li>
</ul>
<p>Tách biệt này giúp việc đổi flavor không phá vỡ logic nghiệp vụ: bạn chỉ cần chọn đúng variant để build, phần còn lại của hệ thống tự hoạt động với đúng cấu hình.</p>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/build/build-variants">Android Developers — Configure build variants</a></li>
  <li><a href="https://developer.android.com/build/gradle-configure">Android Developers — Configure product flavors</a></li>
  <li><a href="https://developer.android.com/build/build-types">Android Developers — Build types</a></li>
  <li><a href="https://developer.android.com/build/releases/gradle-plugin#build-config">Android Developers — BuildConfig</a></li>
  <li><a href="https://developer.android.com/build/dependencies">Android Developers — Dependency configuration (matchingFallbacks)</a></li>
  <li><a href="https://docs.gradle.org/current/userguide/working_with_flavors.html">Gradle Documentation — Product flavors</a></li>
  <li><a href="https://developer.android.com/build/shrink-code">Android Developers — Shrink your code and resources</a></li>
</ul>
`
  },

  'plugin': {
    title: 'Plugin (AGP)',
    summary: 'Hiểu sâu về Plugin trong Gradle và AGP (Android Gradle Plugin) — vai trò của AGP trong hệ sinh thái build Android, các loại plugin Android, cơ chế hoạt động 3 phase của Gradle, cách khai báo và nạp plugin (plugins block, apply false, version catalog), so sánh với Maven, cấu hình cho đơn module / multi-module / library, và khi nào cần tự viết custom Gradle plugin.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['android', 'gradle', 'agp', 'plugin', 'gradle-plugin', 'android-gradle-plugin', 'kotlin-dsl', 'multi-module', 'version-catalog', 'custom-plugin', 'maven'],
    domain: 'Android',
    module: 'Session 04: Android Manifest - Package, build, gradle',
    prerequisites: ['apk-files', 'aab-files', 'build-types'],
    related: ['flavor'],
    learningOutcomes: [
      'Giải thích được Plugin trong Gradle là gì và vì sao cần plugin để build Android.',
      'Phân biệt được các loại plugin Android của AGP (application, library, test, dynamic-feature).',
      'Giải thích được cơ chế hoạt động của AGP trong 3 phase của Gradle.',
      'Triển khai được cách khai báo và nạp plugin theo chuẩn (plugins block, apply false, version catalog).',
      'Áp dụng được AGP cho đơn module, multi-module và library cùng so sánh với Maven.',
      'Nhận diện được khi nào cần viết custom Gradle plugin và triển khai được một convention plugin cơ bản.'
    ],
    knowledgeGap: 'Nhầm lẫn giữa Gradle và AGP khiến developer không biết lỗi build nằm ở tầng nào (cấu hình Gradle hay cấu hình Android), không nạp được plugin đúng cách, khai báo trùng/thiếu plugin trong multi-module, hoặc hardcode version plugin gây khó nâng cấp. Không hiểu cơ chế plugin cũng khiến việc tự viết plugin để chuẩn hóa build logic giữa các module trở nên bất khả thi.',
    updatedAt: '2026-08-02',
    readTime: '35 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Khi mở một dự án Android lên, bạn thấy hàng loạt file cấu hình: <code>settings.gradle.kts</code>, <code>build.gradle.kts</code> ở root, <code>build.gradle.kts</code> ở module <code>app</code>, cùng khối khai báo <code>android { ... }</code> trông như "ma thuật". Nhưng nếu tự dựng một dự án từ đầu hoặc gặp lỗi build, bạn sẽ nhận ra một câu hỏi lớn:</p>
<p><strong>Gradle vốn chỉ biết biên dịch code Java/Kotlin thông thường. Vậy ai dạy Gradle biết cách biên dịch Android</strong> — đọc <code>AndroidManifest.xml</code>, gộp resources, sinh file <code>R.java</code>, đóng gói thành APK/AAB, ký số, làm rối code với R8?</p>
<p>Câu trả lời nằm ở <strong>Plugin</strong>, và cụ thể với Android là <strong>AGP (Android Gradle Plugin)</strong>.</p>
<p>Nếu không hiểu Plugin và AGP, bạn sẽ gặp những vấn đề thực tế:</p>
<ul>
  <li>Không biết sửa lỗi khi Gradle báo <em>"Plugin with id 'com.android.application' not found"</em>.</li>
  <li>Khai báo plugin ở sai file (root thay vì module, hoặc ngược lại) khiến plugin không được áp dụng.</li>
  <li>Trong project <strong>multi-module</strong>, khai báo plugin trùng lặp hoặc thiếu <code>apply false</code> làm build chậm hoặc lỗi.</li>
  <li>Hardcode phiên bản AGP rải rác, khi nâng cấp thì mỗi nơi một version dẫn đến lỗi khó chịu.</li>
  <li>Không tách được logic build dùng chung cho nhiều module khi dự án lớn dần.</li>
</ul>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được Plugin trong Gradle là gì và vì sao cần plugin để build Android.</li>
  <li>Phân biệt được các loại plugin Android của AGP (application, library, test, dynamic-feature).</li>
  <li>Mô tả được AGP hoạt động như thế nào trong 3 phase của Gradle.</li>
  <li>Triển khai được cách khai báo và nạp plugin theo chuẩn (plugins block, apply false, version catalog).</li>
  <li>Áp dụng được AGP cho đơn module, multi-module và library cùng so sánh với Maven.</li>
  <li>Nhận diện được khi nào cần viết custom Gradle plugin và triển khai được một convention plugin cơ bản.</li>
</ul>

<h2>Nền tảng cần biết trước</h2>
<p>Bài này giả định bạn đã nắm các khái niệm từ topic <strong>4.1.1.1 Build Types</strong>:</p>
<ul>
  <li><strong>Gradle</strong> là một hệ thống build tổng quát dựa trên <strong>Task Graph</strong> (đồ thị nhiệm vụ).</li>
  <li><strong>AGP</strong> là plugin giúp Gradle hiểu cách build Android.</li>
  <li><strong>build.gradle.kts</strong> là file cấu hình viết bằng <strong>Kotlin DSL</strong>.</li>
</ul>
<p>Nếu cần ôn lại, hãy đọc topic Build Types. Trong bài này chúng ta đi sâu vào chính AGP — thứ đứng giữa Gradle và code Android.</p>

<h2>Plugin trong Gradle là gì?</h2>
<p><strong>Plugin</strong> (thành phần bổ trợ) là một gói logic có thể tái sử dụng, đóng gói những công việc lặp lại của quá trình build thành các đơn vị độc lập.</p>
<p>Một plugin Gradle có thể:</p>
<ul>
  <li><strong>Thêm Task mới</strong> vào task graph (ví dụ <code>assembleRelease</code>, <code>lint</code>, <code>test</code>).</li>
  <li><strong>Thêm extension (DSL block)</strong> để bạn cấu hình trong build script (ví dụ <code>android { ... }</code>).</li>
  <li><strong>Thêm dependency</strong> mặc định hoặc cấu hình source set.</li>
  <li><strong>Mở rộng</strong> hành vi của các plugin khác đã được áp dụng.</li>
</ul>
<p>Nói đơn giản: <strong>plugin là "kiến thức build" được đóng gói lại.</strong> Gradle cung cấp bộ máy (execution engine), còn các plugin mang tri thức chuyên ngành.</p>
<div class="mermaid">
flowchart LR
    G[Gradle Engine\nBộ máy build] -->|nạp| P[Plugin\nKiến thức build]
    P -->|áp dụng| E[Extensions + Tasks]
    E -->|sinh ra| T[Task Graph]
    T -->|thực thi| O[Output: APK / AAR / báo cáo]
</div>
<div class="callout-note">
  Gradle có plugin <strong>core</strong> (đi kèm sẵn, ví dụ <code>java</code>, <code>maven-publish</code>) và plugin <strong>cộng đồng / thứ ba</strong> (phải khai báo mới nạp). AGP thuộc nhóm thứ ba — nó không nằm trong Gradle, mà do Google phát hành riêng.
</div>

<h2>AGP là gì?</h2>
<p><strong>AGP (Android Gradle Plugin)</strong> là plugin chính thức của Google, giúp Gradle hiểu và build được dự án Android. AGP chịu trách nhiệm toàn bộ chuỗi công việc Android:</p>
<ul>
  <li>Đọc và merge <strong>AndroidManifest.xml</strong>.</li>
  <li>Xử lý <strong>resources</strong> (thư mục <code>res/</code>) qua AAPT2, sinh file <strong><code>R.java</code></strong>.</li>
  <li>Biên dịch Kotlin/Java thành DEX cho máy ảo Android.</li>
  <li>Hợp nhất source set theo Build Type / Flavor (đã học ở 2 topic trước).</li>
  <li>Sinh <strong>BuildConfig</strong>, hỗ trợ <strong>ViewBinding / DataBinding</strong>.</li>
  <li>Chạy <strong>R8/ProGuard</strong> để rút gọn và làm rối code.</li>
  <li><strong>Đóng gói</strong> APK / AAB và <strong>ký số</strong> (signing).</li>
</ul>
<div class="mermaid">
flowchart LR
    G[Gradle] -->|hiểu cấu trúc Android| AGP[AGP]
    AGP -->|đọc| M[AndroidManifest + res]
    AGP -->|biên dịch| C[Kotlin / Java]
    AGP -->|tối ưu| R8[R8 / ProGuard]
    AGP -->|đóng gói + ký| O[APK / AAB]
</div>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Mental model:</strong> Gradle giống "cỗ máy chạy task", AGP giống "bộ hướng dẫn Android" cắm vào cỗ máy đó. Bạn cấu hình qua <code>android { ... }</code> — đây chính là extension mà AGP đăng ký vào build script.</div></div>

<h2>Có những loại plugin Android nào?</h2>
<p>AGP cung cấp nhiều plugin khác nhau tùy theo loại module. Mỗi module trong project khai báo <strong>đúng một</strong> plugin AGP tương ứng:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Plugin ID</th>
      <th style="padding:8px 12px;text-align:left;">Loại module</th>
      <th style="padding:8px 12px;text-align:left;">Sinh output</th>
      <th style="padding:8px 12px;text-align:left;">Dùng khi</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;"><code>com.android.application</code></td>
      <td style="padding:8px 12px;">App</td>
      <td style="padding:8px 12px;">APK / AAB</td>
      <td style="padding:8px 12px;">Module là ứng dụng cài lên thiết bị</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;"><code>com.android.library</code></td>
      <td style="padding:8px 12px;">Thư viện</td>
      <td style="padding:8px 12px;">AAR</td>
      <td style="padding:8px 12px;">Module là thư viện để app hoặc module khác dùng</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;"><code>com.android.test</code></td>
      <td style="padding:8px 12px;">Test</td>
      <td style="padding:8px 12px;">APK test</td>
      <td style="padding:8px 12px;">Module chuyên chạy test cho một module khác</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;"><code>com.android.dynamic-feature</code></td>
      <td style="padding:8px 12px;">Tính năng động</td>
      <td style="padding:8px 12px;">APK feature</td>
      <td style="padding:8px 12px;">Module tính năng theo mô hình Dynamic Delivery</td>
    </tr>
  </tbody>
</table>
<pre data-lang="kotlin"><code>// app/build.gradle.kts — module ứng dụng
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}</code></pre>
<pre data-lang="kotlin"><code>// library/build.gradle.kts — module thư viện
plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
}</code></pre>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Một module <strong>không được</strong> áp dụng đồng thời <code>com.android.application</code> và <code>com.android.library</code> — Gradle sẽ báo lỗi conflict. Chọn đúng plugin theo vai trò của module.</div></div>

<h2>Cách hoạt động: AGP trong 3 phase của Gradle</h2>
<p>Gradle chia quá trình build thành <strong>3 phase</strong>, và AGP tham gia chủ yếu ở phase 2:</p>
<h3>1. Initialization (Khởi tạo)</h3>
<p>Gradle đọc <code>settings.gradle.kts</code> để biết có những project/module nào (root + các module được <code>include</code>). Giai đoạn này quyết định <strong>cấu trúc cây project</strong>.</p>
<h3>2. Configuration (Cấu hình)</h3>
<p>Gradle đọc <code>build.gradle.kts</code> của <strong>từng module</strong>, và tại đây <strong>AGP được áp dụng</strong>: đăng ký extension <code>android { }</code>, đọc toàn bộ cấu hình (buildTypes, flavors, dependencies...), rồi <strong>sinh ra toàn bộ Task và Task Graph</strong> cho module đó. Phase này không biên dịch gì cả — chỉ "lập kế hoạch".</p>
<h3>3. Execution (Thực thi)</h3>
<p>Gradle nhận lệnh (ví dụ <code>./gradlew assembleDebug</code>), chọn đúng Task trong graph và chạy theo thứ tự phụ thuộc. AGP điều phối các Task Android: merge resources → biên dịch → dex → package → signing.</p>
<div class="mermaid">
sequenceDiagram
    participant Dev as Developer
    participant Gradle as Gradle Engine
    participant AGP as AGP

    Dev->>Gradle: ./gradlew assembleDebug
    Gradle->>Gradle: Phase 1: đọc settings.gradle.kts (liệt kê module)
    Gradle->>AGP: Phase 2: áp dụng plugin vào module app
    AGP->>AGP: đọc android{} + sinh toàn bộ Task & Task Graph
    Gradle->>Gradle: Phase 3: chạy assembleDebug theo graph
    AGP->>AGP: merge manifest/res → compile → dex → package → signing
    AGP-->>Gradle: app-debug.apk
    Gradle-->>Dev: Build SUCCESSFUL
</div>
<div class="callout-note">
  Điểm cốt lõi để gỡ lỗi: <strong>lỗi ở phase Configuration</strong> thường là lỗi cấu hình (sai DSL, thiếu plugin, sai phiên bản) và xuất hiện gần như ngay khi chạy lệnh. <strong>Lỗi ở phase Execution</strong> là lỗi trong lúc build (biên dịch fail, trùng resource, thiếu dependency).
</div>

<h2>Khai báo và nạp plugin đúng chuẩn</h2>
<h3>plugins block — cách hiện đại</h3>
<p>Từ Gradle 4.10+, cách chuẩn là khai báo plugin trong block <code>plugins</code>. Gradle sẽ tự <strong>resolve</strong> (tải về) plugin từ repository được cấu hình ở <code>settings.gradle.kts</code>.</p>
<pre data-lang="kotlin"><code>// app/build.gradle.kts
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}</code></pre>

<h3>apply false ở root — dùng cho multi-module</h3>
<p>Khi project có <strong>nhiều module</strong> cùng dùng một plugin (ví dụ <code>com.android.library</code>), bạn nên khai báo plugin ở <strong>root</strong> với <code>apply false</code>. Nghĩa là: Gradle tải plugin về (để các module con dùng chung phiên bản), nhưng <strong>không áp dụng</strong> vào root project.</p>
<pre data-lang="kotlin"><code>// build.gradle.kts (root)
plugins {
    id("com.android.application") version "8.5.2" apply false
    id("com.android.library") version "8.5.2" apply false
    id("org.jetbrains.kotlin.android") version "2.0.20" apply false
}</code></pre>
<p>Sau đó mỗi module con chỉ khai báo <code>id(...)</code> <strong>không kèm version</strong>:</p>
<pre data-lang="kotlin"><code>// feature:cart/build.gradle.kts
plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
}</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">Nhờ <code>apply false</code>, tất cả module dùng <strong>cùng một phiên bản plugin</strong>, tránh cảnh "module A dùng AGP 8.5, module B dùng AGP 8.4" gây lỗi ngầm. Đây là quy tắc vàng của multi-module.</div></div>

<h3>Version Catalog (libs.versions.toml) — quản lý phiên bản tập trung</h3>
<p>Thay vì rải version trong từng module, Gradle cho phép tập trung vào file <code>gradle/libs.versions.toml</code>:</p>
<pre data-lang="toml"><code># gradle/libs.versions.toml
[versions]
agp = "8.5.2"
kotlin = "2.0.20"

[libraries]
# ... các dependency ...

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }</code></pre>
<pre data-lang="kotlin"><code>// root build.gradle.kts
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
}</code></pre>
<pre data-lang="kotlin"><code>// app/build.gradle.kts
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}</code></pre>
<div class="callout-note">
  Version Catalog là chuẩn được Google khuyến nghị từ AGP 7+. Khi nâng cấp phiên bản, bạn chỉ cần sửa <strong>một chỗ</strong> trong <code>libs.versions.toml</code>.
</div>

<h3>settings.gradle.kts — nơi cấu hình plugin repository</h3>
<p><code>settings.gradle.kts</code> khai báo nơi Gradle tìm plugin (plugin repositories):</p>
<pre data-lang="kotlin"><code>// settings.gradle.kts
pluginManagement {
    repositories {
        google()   // AGP và các plugin của Google
        mavenCentral()
        gradlePluginPortal() // plugin cộng đồng
    }
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "MyShop"
include(":app")
include(":core:network")
include(":core:designsystem")
include(":feature:cart")</code></pre>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Lỗi <em>"Plugin with id 'com.android.application' not found"</em> hầu hết là do quên khai báo repository <code>google()</code> trong <code>pluginManagement</code>, hoặc khai báo phiên bản sai vị trí (không có trong <code>plugins</code> block).</div></div>

<h2>AGP so với Maven</h2>
<p>Khi nhắc đến build tool, nhiều lập trình viên từng làm Java sẽ so sánh với <strong>Maven</strong>. Đây là hai triết lý khác nhau, và Android chọn Gradle vì lý do rõ ràng:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tiêu chí</th>
      <th style="padding:8px 12px;text-align:left;">Maven</th>
      <th style="padding:8px 12px;text-align:left;">Gradle (+ AGP)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Cấu hình</td>
      <td style="padding:8px 12px;">XML (<code>pom.xml</code>) — cứng nhắc</td>
      <td style="padding:8px 12px;">Build script (Groovy/Kotlin DSL) — chạy được code</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Mô hình build</td>
      <td style="padding:8px 12px;"><strong>Vòng đời cố định</strong> (lifecycle: compile → test → package)</td>
      <td style="padding:8px 12px;"><strong>Task Graph</strong> — tự do, chỉ chạy task cần thiết</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Plugin</td>
      <td style="padding:8px 12px;">Đóng gói bằng Maven plugin</td>
      <td style="padding:8px 12px;">Plugin Gradle (script / binary)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Tính năng Android</td>
      <td style="padding:8px 12px;">Không có plugin chính thức mạnh (dựa cộng đồng, lỗi thời)</td>
      <td style="padding:8px 12px;"><strong>AGP chính thức</strong> từ Google, cập nhật liên tục</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Tăng tốc build</td>
      <td style="padding:8px 12px;">Hạn chế</td>
      <td style="padding:8px 12px;"><strong>Incremental build</strong>, caching, configuration cache</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Hỗ trợ đa ngôn ngữ</td>
      <td style="padding:8px 12px;">Chủ yếu Java</td>
      <td style="padding:8px 12px;">Java, Kotlin, Android, Kotlin Multiplatform...</td>
    </tr>
  </tbody>
</table>
<p><strong>Vì sao Android không dùng Maven?</strong> Android cần một build tool linh hoạt để xử lý: hàng loạt build variant (Flavor × Build Type), nhiều module tách nhau, tối ưu tài nguyên, ký số linh hoạt. Maven với vòng đời cứng nhắc và thiếu plugin Android chính thức không đáp ứng được. Google đã chọn Gradle ngay từ đầu và duy trì cho đến nay.</p>
<div class="callout-note">
  Nếu bạn từng quen Maven: khái niệm gần nhất của "lifecycle" trong Gradle là <strong>task graph</strong> — bạn vẫn có các task tương đương (<code>compileDebugKotlin</code>, <code>packageDebug</code>) nhưng Gradle tự tính thứ tự chạy và chỉ chạy phần đã thay đổi.
</div>

<h2>Phiên bản AGP tương thích Gradle và JDK</h2>
<p>Mỗi phiên bản AGP yêu cầu một phiên bản <strong>Gradle</strong> và <strong>JDK</strong> tối thiểu tương ứng. Google duy trì bảng tương thích chính thức — bạn không cần nhớ, chỉ cần tra cứu khi nâng cấp:</p>
<ul>
  <li>Bảng tương thích <strong>AGP ↔ Gradle ↔ JDK</strong>: <a href="https://developer.android.com/build/releases/gradle-plugin">Android Developers — Android Gradle plugin release notes</a></li>
  <li>Phiên bản Gradle đang dùng: chạy <code>./gradlew --version</code></li>
  <li>Phiên bản AGP: xem khai báo trong <code>build.gradle.kts</code> root hoặc <code>libs.versions.toml</code></li>
</ul>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Khi nâng cấp Android Studio lên bản mới, Studio thường <strong>nhắc</strong> nâng AGP kèm theo. Nâng AGP mà không nâng Gradle/JDK tương ứng sẽ gặp lỗi <em>"AGP X requires Gradle Y"</em> khi sync. Luôn kiểm tra bảng tương thích trước khi nâng cấp.</div></div>

<h2>Ví dụ thực tế: Cấu hình AGP cho đơn module, multi-module và library</h2>
<h3>Đơn module (single module)</h3>
<p>Cấu trúc đơn giản nhất: một module <code>app</code> duy nhất. Toàn bộ cấu hình Android nằm trong <code>app/build.gradle.kts</code>:</p>
<pre data-lang="kotlin"><code>// app/build.gradle.kts
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.example.myapp"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.myapp"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
}</code></pre>

<h3>Multi-module</h3>
<p>Project tách thành nhiều module, mỗi module một <code>build.gradle.kts</code>. Module app <code>implementation</code> phụ thuộc module khác:</p>
<pre data-lang="kotlin"><code>// app/build.gradle.kts
dependencies {
    implementation(project(":core:network"))
    implementation(project(":feature:cart"))
}</code></pre>
<pre data-lang="kotlin"><code>// core/network/build.gradle.kts
plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.example.core.network"
    compileSdk = 34

    defaultConfig {
        minSdk = 24
        // library KHÔNG có applicationId
    }
}</code></pre>
<div class="callout-note">
  Module <code>com.android.library</code> <strong>không có</strong> <code>applicationId</code> (vì không phải app độc lập), và output là file <strong><code>.aar</code></strong> (Android Archive) thay vì APK.
</div>

<h3>Library được tái sử dụng ngoài project (AAR + publish)</h3>
<p>Nếu library của bạn được nhiều dự án khác dùng, bạn publish nó lên repository (Maven Central, private repo...). Cấu hình cơ bản:</p>
<pre data-lang="kotlin"><code>// core/network/build.gradle.kts
plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
    id("maven-publish")
}

publishing {
    publications {
        register&lt;MavenPublication&gt;("release") {
            afterEvaluate {
                from(components["release"])
            }
        }
    }
}</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">Trong thực tế, module <code>:core:designsystem</code> (UI kit), <code>:core:data</code>, <code>:feature:*</code> đều là <code>com.android.library</code>. Chỉ module <code>:app</code> là <code>com.android.application</code>.</div></div>

<h2>Khi nào cần tự viết custom Gradle plugin?</h2>
<p>Bạn <strong>không nên</strong> vội viết custom plugin. Hãy viết khi có <strong>nhu cầu thực tế</strong> lặp lại giữa nhiều module hoặc nhiều dự án:</p>
<p><strong>Nên viết khi:</strong></p>
<ul>
  <li>Nhiều module lặp lại cùng một khối cấu hình <code>android { }</code> (compileSdk, minSdk, signing, proguard) → dùng <strong>Convention Plugin</strong>.</li>
  <li>Nhiều dự án dùng chung logic build (sinh version, publish, chạy task kiểm tra) → đóng gói thành plugin.</li>
  <li>Cần thêm task tùy chỉnh vào build (sinh mã, tải file, generate config).</li>
</ul>
<p><strong>Chưa nên viết khi:</strong></p>
<ul>
  <li>Mới 1 module, logic build ít — thêm lớp abstraction sẽ làm build khó đọc hơn.</li>
  <li>Chưa chắc logic có tái sử dụng hay không — hãy đợi đến lần lặp lại thứ hai.</li>
</ul>
<h3>Convention Plugin — pattern phổ biến nhất</h3>
<p>Convention Plugin là cách gói toàn bộ cấu hình dùng chung vào một plugin, giúp module chỉ cần một dòng:</p>
<pre data-lang="kotlin"><code>// build-logic/src/main/kotlin/AndroidLibraryConventionPlugin.kt
import com.android.build.gradle.LibraryExtension
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.kotlin.dsl.configure

class AndroidLibraryConventionPlugin : Plugin&lt;Project&gt; {
    override fun apply(target: Project) {
        with(target) {
            pluginManager.apply("com.android.library")
            pluginManager.apply("org.jetbrains.kotlin.android")

            extensions.configure&lt;LibraryExtension&gt;("android") {
                compileSdk = 34
                defaultConfig {
                    minSdk = 24
                }
            }
        }
    }
}</code></pre>
<p>Trong <code>build-logic</code>, đăng ký plugin qua file đặc tả:</p>
<pre data-lang="kotlin"><code>// build-logic/build.gradle.kts
plugins {
    \`kotlin-dsl\`
    \`java-gradle-plugin\`
}

gradlePlugin {
    plugins {
        create("androidLibraryConvention") {
            id = "myconvention.android.library"
            implementationClass = "AndroidLibraryConventionPlugin"
        }
    }
}</code></pre>
<p>Module thư viện chỉ cần:</p>
<pre data-lang="kotlin"><code>// core/network/build.gradle.kts
plugins {
    id("myconvention.android.library")
}</code></pre>
<div class="callout-note">
  <code>build-logic</code> thường được khai báo như một module trong <code>settings.gradle.kts</code> bằng cách <code>includeBuild("build-logic")</code>. Cách này đơn giản hơn việc publish plugin ra ngoài, và là chuẩn mà Google khuyến nghị cho multi-module lớn.
</div>

<h2>Trade-offs và Common Mistakes (Những sai lầm thường gặp)</h2>
<ol>
  <li><strong>Hardcode phiên bản plugin rải rác nhiều file:</strong> Khi nâng cấp phải sửa nhiều nơi, dễ sót dẫn đến lỗi ngầm. <strong>Giải pháp:</strong> dùng <code>apply false</code> ở root + Version Catalog (<code>libs.versions.toml</code>).</li>
  <li><strong>Khai báo plugin sai file:</strong> Khai báo <code>com.android.application</code> ở root mà quên <code>apply false</code> → plugin áp dụng vào cả root project, hoặc module con khai báo version riêng gây xung đột. <strong>Giải pháp:</strong> root khai báo có version + <code>apply false</code>, module con khai báo không version.</li>
  <li><strong>Quên <code>google()</code> trong pluginManagement:</strong> Gradle không tìm thấy AGP → lỗi <em>"Plugin with id 'com.android.application' not found"</em>. <strong>Giải pháp:</strong> khai báo <code>google()</code> trong <code>pluginManagement.repositories</code>.</li>
  <li><strong>Nâng AGP mà quên nâng Gradle/JDK:</strong> Lỗi yêu cầu phiên bản khi sync. <strong>Giải pháp:</strong> tra bảng tương thích trên trang release notes của AGP trước khi nâng.</li>
  <li><strong>Áp dụng cả application lẫn library cho một module:</strong> Gradle báo conflict. <strong>Giải pháp:</strong> mỗi module chỉ dùng một plugin AGP đúng vai trò.</li>
  <li><strong>Multi-module mà không dùng convention plugin:</strong> Mỗi module copy-paste khối <code>android { }</code> → sửa một chỗ phải sửa tất cả, dễ lệch nhau. <strong>Giải pháp:</strong> trích xuất Convention Plugin khi gặp nhu cầu lặp lại thực sự.</li>
  <li><strong>Dùng cách cũ <code>apply plugin: 'com.android.application'</code>:</strong> Vẫn chạy nhưng không được hưởng phiên bản tập trung, dễ thiếu version. <strong>Giải pháp:</strong> chuyển sang <code>plugins { id(...) }</code>.</li>
</ol>

<h2>Kết nối hệ thống</h2>
<p>Trong kiến trúc dự án Android thực tế (multi-module, Clean Architecture), AGP và Plugin nằm ở tầng <strong>build configuration</strong> — bên ngoài mã nguồn nghiệp vụ:</p>
<ul>
  <li><strong>UI / Domain / Data layer</strong> (module <code>:feature:*</code>, <code>:core:*</code>): hoàn toàn không quan tâm build bằng plugin nào. Chúng chỉ khai báo plugin trong <code>build.gradle.kts</code> để module biên dịch đúng loại (app hay library).</li>
  <li><strong>Build layer</strong> (root, <code>build-logic</code>, <code>libs.versions.toml</code>): nơi duy nhất quyết định AGP version, convention, task build, signing. Đây là nơi bạn làm việc khi nói "cấu hình build".</li>
  <li><strong>CI/CD</strong> (GitHub Actions, Jenkins): gọi các task do AGP sinh ra (<code>assembleRelease</code>, <code>bundleRelease</code>) — nếu bạn nắm plugin, bạn biết chính xác task nào tồn tại.</li>
</ul>
<p>Tách biệt này giúp việc nâng cấp build tool không chạm vào logic nghiệp vụ: bạn sửa AGP version, convention plugin, còn các module vẫn giữ nguyên code.</p>

<h2>Lịch sử phát triển</h2>
<p>AGP được phát hành song song với Gradle từ năm 2013. Điểm mốc quan trọng nhất gần đây:</p>
<ul>
  <li><strong>AGP 7.0 (2021):</strong> bắt đầu đòi <strong>JDK 11</strong>, Kotlin DSL là lựa chọn ưu tiên.</li>
  <li><strong>AGP 8.0 (2023):</strong> yêu cầu <strong>Gradle 8.0+ và JDK 17</strong>; <code>BuildConfig</code> mặc định <strong>tắt</strong> (phải bật <code>buildFeatures { buildConfig = true }</code>); tăng tốc build, cải thiện configuration cache.</li>
  <li><strong>AGP 8.x hiện tại:</strong> tiếp tục siết yêu cầu toolchain, khuyến nghị Version Catalog và convention plugin.</li>
</ul>
<p>Bạn không cần nhớ bảng phiên bản — hãy tra cứu trang <a href="https://developer.android.com/build/releases/gradle-plugin">AGP release notes</a> mỗi khi nâng cấp để biết AGP ↔ Gradle ↔ JDK tương ứng.</p>

<h2>Tổng kết</h2>
<p>Plugin là cách Gradle đóng gói "kiến thức build". Với Android, <strong>AGP</strong> chính là plugin quan trọng nhất: nó dạy Gradle hiểu manifest, resources, biên dịch Kotlin/Java thành DEX, tối ưu R8 và đóng gói APK/AAB.</p>
<p>Ba điều cốt lõi để làm việc tốt với AGP:</p>
<ol>
  <li><strong>Khai báo đúng nơi:</strong> root khai báo có version + <code>apply false</code>, module con khai báo không version. Dùng Version Catalog để tập trung phiên bản.</li>
  <li><strong>Hiểu 3 phase của Gradle:</strong> Configuration phase sinh task graph (đây là nơi lỗi cấu hình xuất hiện), Execution phase chạy build thật.</li>
  <li><strong>Chọn đúng plugin AGP:</strong> <code>com.android.application</code> cho app, <code>com.android.library</code> cho thư viện. Khi build logic lặp lại giữa nhiều module, trích xuất thành Convention Plugin.</li>
</ol>
<p>Nắm được AGP, bạn đọc được build script như đọc code bình thường — và gỡ lỗi build không còn là "ma thuật".</p>

<h3>Lộ trình học tiếp</h3>
<ul>
  <li><strong>4.1.1.2 Flavor</strong> — kết hợp với Build Type tạo Build Variant, và hiểu cách AGP merge source set theo flavor.</li>
  <li><strong>4.1.1.1 Build Types</strong> — cách AGP quản lý debug/release, signing, minify qua buildTypes.</li>
  <li><strong>Version Catalog &amp; convention plugin</strong> — nếu bạn làm multi-module lớn, đây là nâng cấp tự nhiên tiếp theo.</li>
  <li><strong>CI/CD (Session 11)</strong> — tận dụng các task AGP trong pipeline build.</li>
</ul>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/build/releases/gradle-plugin">Android Developers — Android Gradle plugin release notes (bảng tương thích AGP/Gradle/JDK)</a></li>
  <li><a href="https://developer.android.com/build">Android Developers — Configure your build</a></li>
  <li><a href="https://developer.android.com/build/multi-module">Android Developers — Multi-module projects</a></li>
  <li><a href="https://developer.android.com/build/customizing-components">Android Developers — Custom Gradle plugin / build logic</a></li>
  <li><a href="https://developer.android.com/build/migrate-to-catalog">Android Developers — Version Catalog &amp; plugins</a></li>
  <li><a href="https://docs.gradle.org/current/userguide/plugins.html">Gradle Documentation — Introduction to Gradle plugins</a></li>
  <li><a href="https://docs.gradle.org/current/userguide/custom_plugins.html">Gradle Documentation — Writing custom Gradle plugins</a></li>
  <li><a href="https://docs.gradle.org/current/userguide/version_catalogs.html">Gradle Documentation — Version catalogs</a></li>
</ul>
`
  }
});

Object.assign(ANDROID_CONTENT, {

  'manifest-tags': {
    title: 'Manifest Tags',
    summary: 'Hiểu sâu AndroidManifest.xml và toàn bộ thẻ tag cốt lõi (manifest, application, activity, service, receiver, provider, permission) — ý nghĩa từng thuộc tính, cơ chế Manifest Merger khi build, cách hệ thống (PMS/AMS) xử lý manifest lúc cài đặt và runtime, quy tắc android:exported, giới hạn implicit broadcast, khai báo permission, và những lỗi manifest thường gặp trong project thực tế.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '40 phút',
    depth: 'deep-dive',
    tags: ['android', 'manifest', 'androidmanifest', 'application', 'activity', 'service', 'receiver', 'provider', 'permission', 'intent-filter', 'exported', 'manifest-merger', 'package-manager', 'ams'],
    domain: 'Android',
    module: 'Session 04: Android Manifest',
    prerequisites: ['apk-files', 'aab-files', 'build-types', 'flavor', 'plugin'],
    related: ['activity-lifecycle', 'android-service', 'android-broadcast-receiver', 'intent-explicit', 'intent-filters'],
    learningOutcomes: [
      'Giải thích được vai trò của AndroidManifest.xml và vòng đời của nó từ lúc build, cài đặt đến runtime.',
      'Phân biệt được ý nghĩa và thuộc tính quan trọng của từng thẻ manifest: application, activity, service, receiver, provider, permission.',
      'Giải thích được cơ chế Manifest Merger và cách dùng tools: namespace để kiểm soát merge.',
      'Áp dụng được quy tắc android:exported cho từng component theo từng phiên bản Android.',
      'Triển khai được khai báo và kiểm tra permission đúng chuẩn, phân biệt normal, dangerous và signature.'
    ],
    knowledgeGap: 'Không hiểu AndroidManifest.xml dẫn đến các lỗi ngầm nghiêm trọng: component không được khai báo khiến app crash lúc chạy, quên android:exported gây lỗi trên Android 12+, khai báo sai authorities của ContentProvider gây crash khi cài đặt, cấu hình minify mà không khai báo reflection, hoặc khai báo permission thừa gây từ chối trên Google Play. Không hiểu Manifest Merger cũng khiến developer không biết vì sao một thẻ xuất hiện trong manifest cuối cùng mà mình không hề viết.',
    updatedAt: '2026-08-03',
    readTime: '40 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Mỗi ứng dụng Android, trước khi có thể chạy trên thiết bị, <strong>bắt buộc</strong> phải khai báo mình là ai và có thể làm gì với hệ điều hành. Nơi duy nhất chứa những khai báo này là file <strong><code>AndroidManifest.xml</code></strong> nằm ở root của module <code>app</code>.</p>
<p>Nếu không hiểu Manifest, bạn sẽ gặp những lỗi thực tế khó chịu:</p>
<ul>
  <li>Viết xong một Activity nhưng <strong>quên khai báo</strong> trong Manifest → app crash ngay khi mở với <code>ActivityNotFoundException</code>.</li>
  <li>Nâng cấp lên <strong>Android 12 (API 31)</strong> thì app <strong>crash ngay lập tức</strong> vì thiếu <code>android:exported</code>.</li>
  <li>Khai báo <code>&lt;provider&gt;</code> trùng <code>authorities</code> với app khác → <strong>không cài được app</strong>.</li>
  <li>Đăng ký một Broadcast Receiver trong Manifest để lắng nghe <code>CONNECTIVITY_CHANGE</code> nhưng <strong>không bao giờ nhận được sự kiện</strong> (từ Android 8.0+).</li>
  <li>Khai báo quá nhiều permission → bị <strong>Google Play từ chối</strong> vì chính sách quyền riêng tư.</li>
  <li>Cấu hình <code>minifyEnabled = true</code> nhưng không khai báo <code>proguard-rules</code> → app crash chỉ ở bản release.</li>
</ul>
<p>Bài này giúp bạn hiểu bản chất từng thẻ tag trong Manifest để biết <strong>khai báo cái gì, vì sao, và khi nào</strong>, thay vì mở file Manifest rồi đoán mò.</p>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được vai trò của AndroidManifest.xml và vòng đời của nó từ lúc build, cài đặt đến runtime.</li>
  <li>Phân biệt được ý nghĩa và thuộc tính quan trọng của từng thẻ manifest: application, activity, service, receiver, provider, permission.</li>
  <li>Giải thích được cơ chế Manifest Merger và cách dùng tools: namespace để kiểm soát merge.</li>
  <li>Áp dụng được quy tắc android:exported cho từng component theo từng phiên bản Android.</li>
  <li>Triển khai được khai báo và kiểm tra permission đúng chuẩn, phân biệt normal, dangerous và signature.</li>
</ul>

<h2>Nền tảng cần biết trước</h2>
<p>Bài này giả định bạn đã nắm các kiến thức từ Session 01 và các topic 4.1.1:</p>
<ul>
  <li><strong>APK / AAB</strong> (Session 01) — Manifest là một trong những file được đóng gói vào APK, được biên dịch sang binary XML bằng AAPT2.</li>
  <li><strong>Build Types / Flavor / Plugin</strong> (4.1.1) — Manifest của bạn không đứng một mình: nó bị <strong>merge</strong> với manifest của thư viện và của từng build variant trong lúc build.</li>
  <li><strong>Kotlin</strong> (Session 01) — để đọc hiểu các ví dụ khai báo Application class, Service, Provider bằng code.</li>
</ul>
<p>Nếu cần ôn lại, hãy đọc các topic nêu trên. Trong bài này, chúng ta tập trung vào <strong>chính file Manifest</strong> — hợp đồng giữa app và hệ điều hành.</p>

<h2>AndroidManifest.xml là gì?</h2>
<p><strong><code>AndroidManifest.xml</code></strong> là file mô tả metadata của ứng dụng. Nó khai báo với hệ điều hành Android:</p>
<ul>
  <li><strong>Ứng dụng là ai</strong> — package name, application ID, version code, version name.</li>
  <li><strong>Ứng dụng gồm những component nào</strong> — Activity, Service, Broadcast Receiver, Content Provider.</li>
  <li><strong>Ứng dụng cần những quyền gì</strong> — <code>&lt;uses-permission&gt;</code> và <code>&lt;permission&gt;</code> (tự định nghĩa).</li>
  <li><strong>Ứng dụng phù hợp với thiết bị nào</strong> — <code>&lt;uses-feature&gt;</code>, <code>&lt;uses-sdk&gt;</code>.</li>
  <li><strong>Điểm vào của ứng dụng</strong> — activity nào là launcher (màn hình khởi động).</li>
</ul>
<p>Nói đơn giản: <strong>Manifest là "giấy khai sinh" và "giấy phép hoạt động" của app.</strong> Không có manifest, hệ điều hành không biết app tồn tại, không thể khởi chạy component nào, không cấp quyền gì cả.</p>
<div class="mermaid">
flowchart LR
    A[AndroidManifest.xml] --> B[Khai báo application\nlabel, icon, theme]
    A --> C[Khai báo components\nactivity, service, receiver, provider]
    A --> D[Khai báo permissions\nuses-permission, permission]
    A --> E[Khai báo device\nuses-feature, uses-sdk]
    B --> F[OS biết app là ai]
    C --> G[OS biết khởi chạy cái gì]
    D --> H[OS biết cấp quyền gì]
    E --> I[OS biết app chạy ở đâu]
</div>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Trước đây, thuộc tính <code>package</code> được khai báo trong thẻ <code>&lt;manifest&gt;</code>. Từ <strong>AGP 7.3+</strong> và đặc biệt là <strong>AGP 8.0</strong>, <code>package</code> trong manifest đã bị <strong>loại bỏ</strong> — package/namespace được khai báo trong <code>build.gradle.kts</code> qua thuộc tính <code>namespace</code>. Điều này tách biệt <strong>namespace Java</strong> (quản lý <code>R</code> class, BuildConfig) với <strong>applicationId</strong> (định danh trên Google Play).</div></div>

<h2>Cách hoạt động: Vòng đời của Manifest từ build đến runtime</h2>
<p>Để hiểu các thẻ tag, trước tiên bạn cần biết manifest đi qua <strong>3 giai đoạn</strong> trong vòng đời:</p>

<h3>Giai đoạn 1: Build (Manifest Merger)</h3>
<p>Khi build, AGP <strong>không chỉ dùng một manifest</strong>. Nó gộp (merge) tối đa <strong>ba loại manifest</strong> lại với nhau:</p>
<ol>
  <li><strong>Main manifest</strong> — file <code>src/main/AndroidManifest.xml</code> của module app.</li>
  <li><strong>Build variant manifest</strong> — <code>src/debug/AndroidManifest.xml</code>, <code>src/release/AndroidManifest.xml</code>, hoặc <code>src/&lt;flavor&gt;/AndroidManifest.xml</code> (nếu có).</li>
  <li><strong>Library manifest</strong> — mỗi thư viện (AAR) bạn <code>implementation</code> đều kèm một manifest bên trong; các khai báo của chúng (permission, provider của library...) được merge vào.</li>
</ol>
<p>Thứ tự ưu tiên khi xung đột: <strong>build variant &gt; main &gt; library</strong>.</p>
<div class="mermaid">
flowchart LR
    M1[src/main/AndroidManifest.xml] --> MERGE
    M2[src/debug/AndroidManifest.xml] --> MERGE
    M3[Library manifests\nAAR] --> MERGE
    MERGE[Manifest Merger] --> OUT[AndroidManifest.xml\nđã gộp, build vào APK]
    MERGE --> REPORT[manifest-merger-report.txt\nghi lại thao tác merge]
</div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Mỗi khi build, AGP sinh file báo cáo merge tại <code>app/build/outputs/logs/manifest-merger-report.txt</code>. Khi gặp khai báo "ma" không biết từ đâu ra, hãy mở file này để xem thao tác merge cụ thể. Đây là kỹ năng debug manifest quan trọng nhất.</div></div>

<h3>Giai đoạn 2: Cài đặt (PackageManagerService parse)</h3>
<p>Khi app được cài đặt, <strong>PackageManagerService (PMS)</strong> — một service hệ thống nằm trong <code>system_server</code> — đọc binary AndroidManifest từ APK/AAB và <strong>parse toàn bộ khai báo</strong>:</p>
<ul>
  <li>Đăng ký tất cả Activity, Service, Receiver, Provider vào cơ sở dữ liệu nội bộ của hệ thống.</li>
  <li>Kiểm tra và ghi nhận danh sách permission app yêu cầu.</li>
  <li>Kiểm tra xung đột: <code>authorities</code> trùng, signature conflict...</li>
</ul>
<p>Từ lúc này, hệ thống "biết" app tồn tại và biết mỗi component nằm ở đâu.</p>

<h3>Giai đoạn 3: Runtime (AMS + PackageManager)</h3>
<p>Lúc chạy, <strong>ActivityManagerService (AMS)</strong> và <strong>PackageManager</strong> sử dụng dữ liệu đã parse ở giai đoạn 2 để:</p>
<ul>
  <li><strong>Resolve Intent</strong> — khi bạn gọi <code>startActivity(intent)</code>, AMS tìm component phù hợp trong danh sách đã đăng ký.</li>
  <li><strong>Kiểm tra permission</strong> — trước khi cho phép gọi, hệ thống kiểm tra quyền đã khai báo và được cấp.</li>
  <li><strong>Khởi chạy component</strong> — tạo process, gọi <code>onCreate()</code> của Activity/Service/Provider...</li>
</ul>
<div class="mermaid">
sequenceDiagram
    participant App as App
    participant PMS as PackageManagerService
    participant AMS as ActivityManagerService
    participant Zygote as Zygote (new process)

    Note over PMS: Giai đoạn 2: lúc cài đặt
    PMS->>PMS: Parse AndroidManifest.xml binary
    PMS->>PMS: Đăng ký components + permissions

    Note over App,AMS: Giai đoạn 3: lúc chạy
    App->>AMS: startActivity(intent) / startService()
    AMS->>PMS: Resolve intent → tìm component đã đăng ký
    AMS->>AMS: Kiểm tra permission + exported
    AMS->>Zygote: Fork process mới (nếu chưa có)
    Zygote->>App: ActivityThread chạy → gọi component.onCreate()
</div>

<h2>Cấu trúc tổng quan của Manifest</h2>
<p>Một manifest điển hình có cấu trúc cây như sau:</p>
<pre data-lang="xml"><code>&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"&gt;

    &lt;uses-sdk android:minSdkVersion="24" android:targetSdkVersion="34" /&gt;
    &lt;uses-permission android:name="android.permission.INTERNET" /&gt;

    &lt;application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/Theme.MyApp"
        android:name=".MyApplication"
        android:supportsRtl="true"
        android:allowBackup="true"&gt;

        &lt;activity android:name=".MainActivity" android:exported="true"&gt;
            &lt;intent-filter&gt;
                &lt;action android:name="android.intent.action.MAIN" /&gt;
                &lt;category android:name="android.intent.category.LAUNCHER" /&gt;
            &lt;/intent-filter&gt;
        &lt;/activity&gt;

        &lt;service android:name=".MyForegroundService"
            android:exported="false"
            android:foregroundServiceType="dataSync" /&gt;

        &lt;receiver android:name=".BootReceiver"
            android:exported="false"&gt;
            &lt;intent-filter&gt;
                &lt;action android:name="android.intent.action.BOOT_COMPLETED" /&gt;
            &lt;/intent-filter&gt;
        &lt;/receiver&gt;

        &lt;provider android:name=".MyContentProvider"
            android:authorities="com.example.myapp.provider"
            android:exported="false" /&gt;
    &lt;/application&gt;
&lt;/manifest&gt;</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Mental model:</strong> thẻ <code>&lt;manifest&gt;</code> là gốc, thẻ <code>&lt;application&gt;</code> là "thân cây" chứa các component, và mỗi component là một "nhánh". Permission, uses-sdk, uses-feature là các khai báo độc lập ở cấp manifest.</div></div>

<h2>Thẻ &lt;manifest&gt;</h2>
<p>Thẻ gốc chứa toàn bộ file. Hai khai báo <strong>quan trọng nhất</strong> ở thẻ này:</p>
<pre data-lang="xml"><code>&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"&gt;</code></pre>
<table>
  <thead>
    <tr><th>Thuộc tính</th><th>Ý nghĩa</th></tr>
  </thead>
  <tbody>
    <tr><td><code>xmlns:android</code></td><td>Khai báo namespace Android. Không có namespace này, không thuộc tính <code>android:*</code> nào hoạt động.</td></tr>
    <tr><td><code>xmlns:tools</code></td><td>Khai báo namespace <code>tools</code> — dùng riêng cho <strong>Manifest Merger</strong> (xem phần dưới), không ảnh hưởng runtime.</td></tr>
    <tr><td><code>android:versionCode</code></td><td>Số nguyên tăng dần mỗi lần release (hiển thị không thấy, chỉ để hệ thống/Google Play so sánh).</td></tr>
    <tr><td><code>android:versionName</code></td><td>Chuỗi hiển thị cho người dùng (ví dụ <code>1.2.0</code>).</td></tr>
    <tr><td><code>android:installLocation</code></td><td>Nơi app được cài: <code>internalOnly</code>, <code>auto</code>, <code>preferExternal</code>.</td></tr>
  </tbody>
</table>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Thực tế hiện đại: <code>versionCode</code> và <code>versionName</code> <strong>thường được khai báo trong <code>build.gradle.kts</code></strong> (khối <code>defaultConfig</code>), và AGP tự chèn vào manifest khi build. Vì vậy trong source manifest bạn hiếm khi thấy chúng — điều này cũng do <code>package</code> đã chuyển sang <code>namespace</code>.</div></div>

<h3>Khi nào cần thêm thuộc tính vào &lt;manifest&gt;?</h3>
<ul>
  <li><strong>Khi ứng dụng cần phiên bản/định danh cụ thể</strong> được kiểm soát theo build variant (qua <code>buildConfigField</code> hoặc <code>manifestPlaceholders</code>).</li>
  <li><strong>Khi ứng dụng cần cài lên thẻ nhớ ngoài</strong> (<code>installLocation</code>).</li>
  <li>Hầu hết trường hợp: bạn <strong>không cần</strong> đụng tới thẻ <code>&lt;manifest&gt;</code> ngoài 2 dòng namespace.</li>
</ul>

<h2>Thẻ &lt;application&gt;</h2>
<p>Thẻ <code>&lt;application&gt;</code> khai báo <strong>cấu hình chung cho toàn bộ app</strong>. Đây là thẻ cha chứa mọi component.</p>

<h3>Các thuộc tính quan trọng nhất</h3>
<pre data-lang="xml"><code>&lt;application
    android:name=".MyApplication"
    android:label="@string/app_name"
    android:icon="@mipmap/ic_launcher"
    android:theme="@style/Theme.MyApp"
    android:supportsRtl="true"
    android:allowBackup="true"
    android:usesCleartextTraffic="false"
    android:fullBackupContent="@xml/backup_rules"
    android:networkSecurityConfig="@xml/network_security_config"&gt;
&lt;/application&gt;</code></pre>
<table>
  <thead>
    <tr><th>Thuộc tính</th><th>Ý nghĩa</th><th>Khi nào dùng</th></tr>
  </thead>
  <tbody>
    <tr><td><code>android:name</code></td><td>Tên lớp <code>Application</code> (khởi tạo trước mọi component).</td><td>Khi cần init toàn cục (DI, analytics...) ngay khi process start.</td></tr>
    <tr><td><code>android:label</code></td><td>Tên hiển thị của app (đặt dưới icon).</td><td>Luôn khai báo. Ưu tiên dùng resource <code>@string</code>.</td></tr>
    <tr><td><code>android:icon</code></td><td>Icon của app.</td><td>Luôn khai báo.</td></tr>
    <tr><td><code>android:theme</code></td><td>Theme mặc định cho mọi Activity không khai báo theme riêng.</td><td>Luôn khai báo.</td></tr>
    <tr><td><code>android:supportsRtl</code></td><td>Hỗ trợ giao diện RTL (tiếng Ả Rập, Hebrew).</td><td><code>true</code> nếu app hỗ trợ đa ngôn ngữ.</td></tr>
    <tr><td><code>android:allowBackup</code></td><td>Cho phép hệ thống backup dữ liệu app lên cloud.</td><td><code>false</code> nếu app chứa dữ liệu nhạy cảm (mặc định <code>true</code>).</td></tr>
    <tr><td><code>android:usesCleartextTraffic</code></td><td>Cho phép HTTP (không mã hóa).</td><td>Mặc định <code>false</code> từ API 28. Chỉ bật khi dev/staging.</td></tr>
    <tr><td><code>android:networkSecurityConfig</code></td><td>Cấu hình bảo mật network chi tiết.</td><td>Khi cần cho phép một số domain dùng HTTP.</td></tr>
    <tr><td><code>android:hardwareAccelerated</code></td><td>Bật tăng tốc phần cứng cho vẽ UI.</td><td>Mặc định <code>true</code> từ API 14, hiếm khi cần sửa.</td></tr>
    <tr><td><code>android:largeHeap</code></td><td>Xin heap lớn hơn từ hệ thống.</td><td>Chỉ khi app cần xử lý ảnh lớn; dùng sai dễ bị kill.</td></tr>
  </tbody>
</table>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><code>android:allowBackup="true"</code> là mặc định của hệ thống. Với app chứa dữ liệu nhạy cảm (token, dữ liệu cá nhân), Google Play <strong>yêu cầu khai báo tường minh</strong> <code>android:allowBackup="false"</code> hoặc cung cấp <code>android:fullBackupContent</code>/<code>android:dataExtractionRules</code>. Đây là một trong những lý do app bị từ chối hoặc bị yêu cầu cập nhật chính sách.</div></div>

<h3>Application class (android:name)</h3>
<p>Khi app process được khởi tạo, hệ thống tạo instance của lớp <code>Application</code> <strong>trước mọi Activity/Service/Receiver/Provider</strong>. Đây là nơi lý tưởng để init Singleton, DI container, analytics:</p>
<pre data-lang="kotlin"><code>class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        // Khởi tạo DI, Crashlytics, mặc định toàn cục...
        initializeDependencyInjection()
        initializeAnalytics()
    }
}</code></pre>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><code>Application.onCreate()</code> chạy trên <strong>main thread</strong>. Không làm việc nặng ở đây (network, đọc file lớn) — sẽ làm chậm thời điểm app bắt đầu hoạt động và dễ gây ANR.</div></div>

<h2>Thẻ &lt;activity&gt;</h2>
<p>Activity là component <strong>duy nhất có giao diện</strong> (UI). Mỗi màn hình trong app đều là một Activity. <strong>Mọi Activity bạn viết đều phải được khai báo</strong> trong Manifest, nếu không app sẽ crash với <code>ActivityNotFoundException</code>.</p>

<h3>Khai báo cơ bản</h3>
<pre data-lang="xml"><code>&lt;activity
    android:name=".MainActivity"
    android:exported="true"
    android:launchMode="singleTask"
    android:screenOrientation="portrait"
    android:configChanges="orientation|screenSize"
    android:windowSoftInputMode="adjustResize"
    android:theme="@style/Theme.MyApp.Splash"
    android:taskAffinity="com.example.special"&gt;

    &lt;intent-filter&gt;
        &lt;action android:name="android.intent.action.MAIN" /&gt;
        &lt;category android:name="android.intent.category.LAUNCHER" /&gt;
    &lt;/intent-filter&gt;
&lt;/activity&gt;</code></pre>

<h3>Thuộc tính quan trọng</h3>
<table>
  <thead>
    <tr><th>Thuộc tính</th><th>Ý nghĩa</th><th>Lưu ý</th></tr>
  </thead>
  <tbody>
    <tr><td><code>android:name</code></td><td>Tên class Activity (dùng <code>.MainActivity</code> để ngắn — AGP tự nối với namespace).</td><td>Bắt buộc.</td></tr>
    <tr><td><code>android:exported</code></td><td>Cho phép component khác (app khác/hệ thống) gọi Activity này không.</td><td><strong>Bắt buộc khai báo rõ từ Android 12 (API 31)</strong> nếu có <code>&lt;intent-filter&gt;</code>.</td></tr>
    <tr><td><code>android:launchMode</code></td><td><code>standard</code>, <code>singleTop</code>, <code>singleTask</code>, <code>singleInstance</code>.</td><td>Quyết định Activity được tạo lại hay dùng lại.</td></tr>
    <tr><td><code>android:screenOrientation</code></td><td>Ép hướng màn hình (<code>portrait</code>, <code>landscape</code>, <code>fullSensor</code>...).</td><td>Ép cứng <code>portrait</code> thường không được khuyến nghị với tablet/foldable.</td></tr>
    <tr><td><code>android:configChanges</code></td><td>Liệt kê config mà app tự xử lý, không recreate.</td><td>Dùng sai dễ mất logic lifecycle.</td></tr>
    <tr><td><code>android:windowSoftInputMode</code></td><td>Cách xử lý bàn phím ảo (<code>adjustResize</code>, <code>adjustPan</code>, <code>stateHidden</code>...).</td><td>Cần thiết khi màn hình có EditText.</td></tr>
    <tr><td><code>android:taskAffinity</code></td><td>Nhóm task mà Activity thuộc về.</td><td>Dùng cho luồng singleTask đặc biệt (splash→main...).</td></tr>
    <tr><td><code>android:permission</code></td><td>Yêu cầu caller phải có permission mới gọi được.</td><td>Bảo vệ Activity của app khác truy cập.</td></tr>
    <tr><td><code>android:process</code></td><td>Chạy Activity trong process riêng (<code>:remote</code>).</td><td>Hiếm dùng; tăng chi phí bộ nhớ.</td></tr>
    <tr><td><code>android:noHistory</code></td><td>Loại Activity khỏi back stack khi rời đi.</td><td>Dùng cho splash, login thành công.</td></tr>
    <tr><td><code>android:theme</code></td><td>Theme riêng cho Activity (ghi đè theme application).</td><td>Dùng cho splash screen (theme với nền đúng màu).</td></tr>
  </tbody>
</table>

<h3>android:exported — quy tắc quan trọng nhất từ Android 12</h3>
<p><code>android:exported</code> xác định <strong>app khác hoặc hệ thống có được phép khởi chạy component này không</strong>.</p>
<ul>
  <li><strong><code>exported="true"</code></strong>: bất kỳ app nào (có đủ permission) cũng có thể gọi. <strong>Bắt buộc</strong> cho Activity có <code>&lt;intent-filter&gt;</code> MAIN/LAUNCHER, hoặc component muốn nhận implicit intent từ hệ thống/app khác.</li>
  <li><strong><code>exported="false"</code></strong>: chỉ app của mình (hoặc app cùng UID) gọi được. <strong>Bắt buộc</strong> cho component chỉ dùng nội bộ.</li>
</ul>
<div class="mermaid">
flowchart TD
    A[Có intent-filter không?] -->|Có| B[exported=true\nComponent công khai cho hệ thống/app khác]
    A -->|Không| C[exported=false\nComponent nội bộ]
    B --> D[Android 12+ bắt buộc khai báo rõ\nnếu không manifest merger sẽ báo lỗi]
    C --> E[Không bắt buộc nhưng nên khai báo rõ]
</div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Từ <strong>Android 12 (API 31)</strong>, nếu một Activity/Service/Receiver có <code>&lt;intent-filter&gt;</code> mà <strong>không khai báo <code>android:exported</code></strong>, quá trình build sẽ <strong>fail</strong> với lỗi: <em>"android:exported needs to be explicitly specified for element &lt;activity&gt;..."</em>. Đây là lỗi phổ biến nhất khi mọi người nâng <code>targetSdk</code> lên 31+.<br/><br/>Về bảo mật: khai báo <code>exported="true"</code> cho component không cần thiết là <strong>lỗ hổng</strong> — app khác có thể khởi chạy màn hình của bạn, gọi service, gửi dữ liệu vào provider. Luôn đặt <code>exported="false"</code> trừ khi có lý do thực sự.</div></div>

<h3>Khi nào nên dùng launchMode nào?</h3>
<table>
  <thead>
    <tr><th>launchMode</th><th>Hành vi</th><th>Dùng khi</th></tr>
  </thead>
  <tbody>
    <tr><td><code>standard</code></td><td>Mỗi intent tạo Activity mới trong task hiện tại.</td><td>Mặc định, 95% trường hợp.</td></tr>
    <tr><td><code>singleTop</code></td><td>Nếu Activity đã ở <strong>đỉnh</strong> stack thì dùng lại, không tạo mới.</td><td>Notification → mở đúng Activity đang hiển thị (tránh trùng lặp).</td></tr>
    <tr><td><code>singleTask</code></td><td>Dùng lại Activity đã tồn tại trong task, hủy mọi Activity trên nó.</td><td>Launcher screen, main screen (tránh stack chồng nhiều bản).</td></tr>
    <tr><td><code>singleInstance</code></td><td>Activity chạy trong task riêng, chỉ mình nó.</td><td>Rất hiếm (ví dụ alarm, call screen).</td></tr>
  </tbody>
</table>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Đừng dùng <code>launchMode</code> như "công cụ chống trùng Activity". Với project hiện đại, hãy ưu tiên <strong>single-top declaration + Intent flags</strong> (<code>FLAG_ACTIVITY_SINGLE_TOP</code>, <code>FLAG_ACTIVITY_CLEAR_TOP</code>) hoặc để <strong>Jetpack Navigation</strong> tự xử lý back stack. <code>launchMode</code> khai trong manifest là cấu hình tĩnh, khó kiểm soát theo luồng.</div></div>

<h3>Intent Filter — cách hệ thống tìm Activity</h3>
<p><code>&lt;intent-filter&gt;</code> khai báo <strong>những implicit intent mà Activity này chấp nhận</strong>. Hệ thống dùng nó để resolve khi có intent không chỉ định tường minh class.</p>
<pre data-lang="xml"><code>&lt;activity android:name=".ShareActivity" android:exported="true"&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="android.intent.action.SEND" /&gt;
        &lt;category android:name="android.intent.category.DEFAULT" /&gt;
        &lt;data android:mimeType="text/plain" /&gt;
    &lt;/intent-filter&gt;
&lt;/activity&gt;</code></pre>
<p>Một intent-filter phải có <strong>tối thiểu 1 <code>&lt;action&gt;</code></strong> và <strong>1 <code>&lt;category&gt;</code></strong>. Để Activity trở thành launcher (màn hình chính), cần cặp:</p>
<pre data-lang="xml"><code>&lt;intent-filter&gt;
    &lt;action android:name="android.intent.action.MAIN" /&gt;
    &lt;category android:name="android.intent.category.LAUNCHER" /&gt;
&lt;/intent-filter&gt;</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">Nếu Activity có <code>&lt;intent-filter&gt;</code> thì bắt buộc thêm <code>&lt;category android:name="android.intent.category.DEFAULT" /&gt;</code> để hệ thống chấp nhận implicit intent (category DEFAULT là mặc định trong mọi <code>startActivity</code> ngầm). Nếu không, Activity không bao giờ được resolve từ implicit intent.</div></div>

<h2>Thẻ &lt;service&gt;</h2>
<p>Service là component chạy <strong>nền</strong> (background), không có giao diện. Nó được dùng cho công việc dài hạn như phát nhạc, đồng bộ dữ liệu, theo dõi vị trí.</p>

<h3>Khai báo cơ bản</h3>
<pre data-lang="xml"><code>&lt;service
    android:name=".MyForegroundService"
    android:exported="false"
    android:foregroundServiceType="dataSync"
    android:permission="android.permission.FOREGROUND_SERVICE_DATA_SYNC" /&gt;</code></pre>
<table>
  <thead>
    <tr><th>Thuộc tính</th><th>Ý nghĩa</th><th>Lưu ý</th></tr>
  </thead>
  <tbody>
    <tr><td><code>android:name</code></td><td>Tên class Service.</td><td>Bắt buộc.</td></tr>
    <tr><td><code>android:exported</code></td><td>App khác có <code>bindService()</code>/<code>startService()</code> được không.</td><td><code>false</code> khi chỉ nội bộ.</td></tr>
    <tr><td><code>android:foregroundServiceType</code></td><td>Loại Foreground Service (<code>mediaPlayback</code>, <code>location</code>, <code>dataSync</code>, <code>camera</code>...).</td><td><strong>Bắt buộc từ Android 14 (API 34)</strong> khi chạy Foreground Service.</td></tr>
    <tr><td><code>android:permission</code></td><td>Permission yêu cầu khi app khác bind/start service này.</td><td>Bảo vệ service khỏi truy cập ngoài.</td></tr>
    <tr><td><code>android:process</code></td><td>Chạy service trong process riêng.</td><td>Hiếm dùng.</td></tr>
    <tr><td><code>android:stopWithTask</code></td><td>Service có bị stop khi user rời app không.</td><td>Mặc định <code>true</code>; đặt <code>false</code> nếu muốn tiếp tục.</td></tr>
    <tr><td><code>android:isolatedProcess</code></td><td>Chạy service trong process cách ly, không có quyền app.</td><td>Bảo mật cao, hiếm dùng.</td></tr>
  </tbody>
</table>

<h3>Intent Filter cho Service</h3>
<p>Service có <code>&lt;intent-filter&gt;</code> khi muốn được <strong>gọi ngầm</strong> qua implicit intent (ví dụ media player xử lý <code>ACTION_PLAY</code>):</p>
<pre data-lang="xml"><code>&lt;service android:name=".MusicService" android:exported="false"
    android:foregroundServiceType="mediaPlayback"&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="androidx.media3.session.MediaSessionService" /&gt;
    &lt;/intent-filter&gt;
&lt;/service&gt;</code></pre>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Service thường được gọi bằng <strong>explicit intent</strong> (chỉ định class). Chỉ cần <code>&lt;intent-filter&gt;</code> khi bạn thực sự muốn service nhận implicit intent — thường là để service của bạn trở thành "provider" cho một API hệ thống (media, speech recognition...).</div></div>

<h3>Foreground Service và ràng buộc từng phiên bản</h3>
<p>Foreground Service (FGS) là service chạy nền nhưng <strong>phải hiển thị Notification</strong> để người dùng biết. Ràng buộc ngày càng chặt:</p>
<ul>
  <li><strong>Android 8 (API 26):</strong> mọi service chạy nền phải là FGS nếu muốn chạy lâu; background service thuần bị giới hạn.</li>
  <li><strong>Android 14 (API 34):</strong> bắt buộc khai báo <code>android:foregroundServiceType</code> + phải có permission tương ứng (<code>FOREGROUND_SERVICE_DATA_SYNC</code>, <code>FOREGROUND_SERVICE_LOCATION</code>...).</li>
  <li><strong>Android 15 (API 35):</strong> giới hạn thời gian chạy tối đa 6 giờ cho FGS dataSync/mediaProcessing.</li>
</ul>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Từ Android 14, nếu Service chạy foreground mà <strong>thiếu <code>android:foregroundServiceType</code></strong> trong manifest, hệ thống sẽ ném <code>MissingForegroundServiceTypeException</code> và crash. Luôn khai báo type + permission đi kèm.</div></div>

<h2>Thẻ &lt;receiver&gt;</h2>
<p>Broadcast Receiver lắng nghe và phản ứng với <strong>broadcast intent</strong> từ hệ thống hoặc app khác (ví dụ: máy khởi động xong, mạng đổi, pin yếu).</p>

<h3>Khai báo cơ bản</h3>
<pre data-lang="xml"><code>&lt;receiver
    android:name=".BootReceiver"
    android:exported="false"
    android:enabled="true"&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="android.intent.action.BOOT_COMPLETED" /&gt;
    &lt;/intent-filter&gt;
&lt;/receiver&gt;</code></pre>
<table>
  <thead>
    <tr><th>Thuộc tính</th><th>Ý nghĩa</th></tr>
  </thead>
  <tbody>
    <tr><td><code>android:name</code></td><td>Tên class Receiver.</td></tr>
    <tr><td><code>android:exported</code></td><td>App khác/hệ thống gửi broadcast vào receiver này được không.</td></tr>
    <tr><td><code>android:enabled</code></td><td>Receiver có được hệ thống instantiate không.</td></tr>
    <tr><td><code>android:permission</code></td><td>Broadcast phải kèm permission mới được nhận.</td></tr>
  </tbody>
</table>

<h3>Static Receiver (khai báo trong Manifest) — giới hạn từ Android 8</h3>
<p>Có hai cách đăng ký receiver: <strong>static</strong> (trong Manifest) và <strong>dynamic</strong> (trong code qua <code>registerReceiver()</code>).</p>
<ul>
  <li><strong>Static receiver</strong>: được khởi động bởi hệ thống ngay cả khi app đang chạy nền. Nhưng từ <strong>Android 8 (API 26)</strong>, hầu hết <strong>implicit broadcast</strong> (không phải explicit) bị chặn với receiver static, nhằm tiết kiệm pin và tài nguyên.</li>
  <li><strong>Dynamic receiver</strong>: đăng ký trong code, chỉ nhận broadcast khi app đang chạy (hoặc ở foreground), không bị giới hạn implicit nhưng phải <code>unregisterReceiver()</code> để tránh leak.</li>
</ul>
<pre data-lang="kotlin"><code>class MainActivity : AppCompatActivity() {
    private val receiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            // Xử lý broadcast khi app đang chạy
        }
    }

    override fun onStart() {
        super.onStart()
        registerReceiver(receiver, IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION))
    }

    override fun onStop() {
        unregisterReceiver(receiver)  // Bắt buộc, tránh memory leak
        super.onStop()
    }
}</code></pre>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Lỗi phổ biến nhất:</strong> đăng ký static receiver trong Manifest để lắng nghe <code>CONNECTIVITY_CHANGE</code>, <code>BATTERY_CHANGED</code>, <code>SCREEN_ON</code>... rồi không bao giờ nhận được sự kiện trên Android 8+. Các broadcast này <strong>bị hệ thống chặn</strong> đối với receiver static. Giải pháp: dùng dynamic receiver khi app chạy, hoặc chuyển sang <strong>WorkManager</strong> cho công việc cần thực thi khi bị trigger bởi mạng/battery.</div></div>

<h3>Các broadcast vẫn được phép với static receiver (danh sách trắng)</h3>
<p>Một số broadcast hệ thống vẫn được phép đăng ký static, ví dụ:</p>
<ul>
  <li><code>ACTION_BOOT_COMPLETED</code> — máy khởi động xong.</li>
  <li><code>ACTION_PACKAGE_ADDED</code> / <code>ACTION_PACKAGE_REMOVED</code> — cài/gỡ app.</li>
  <li><code>ACTION_MY_PACKAGE_REPLACED</code> — app được cập nhật.</li>
  <li><code>ACTION_TIME_CHANGED</code>, <code>ACTION_TIMEZONE_CHANGED</code>.</li>
  <li><code>ACTION_LOCALE_CHANGED</code>.</li>
  <li><code>ACTION_BATTERY_LOW</code>, <code>ACTION_POWER_CONNECTED</code> / <code>DISCONNECTED</code>.</li>
  <li><code>ACTION_HEADSET_PLUG</code>.</li>
</ul>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Để nhận <code>BOOT_COMPLETED</code>, app cần <code>&lt;uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" /&gt;</code>. Ngoài ra, từ Android 11+ còn phải khai báo <code>&lt;queries&gt;</code> hoặc dùng explicit intent để nhìn thấy các package khác (Package Visibility).</div></div>

<h2>Thẻ &lt;provider&gt;</h2>
<p>Content Provider là "cổng giao tiếp dữ liệu có kiểm soát" giữa các app và với hệ thống (Contacts, MediaStore, CallLog...). App của bạn triển khai provider để chia sẻ dữ liệu an toàn.</p>

<h3>Khai báo cơ bản</h3>
<pre data-lang="xml"><code>&lt;provider
    android:name=".MyContentProvider"
    android:authorities="com.example.myapp.provider"
    android:exported="false"
    android:grantUriPermissions="true"
    android:readPermission="com.example.myapp.permission.READ_DATA"
    android:writePermission="com.example.myapp.permission.WRITE_DATA" /&gt;</code></pre>
<table>
  <thead>
    <tr><th>Thuộc tính</th><th>Ý nghĩa</th><th>Lưu ý</th></tr>
  </thead>
  <tbody>
    <tr><td><code>android:name</code></td><td>Tên class ContentProvider.</td><td>Bắt buộc.</td></tr>
    <tr><td><code>android:authorities</code></td><td><strong>Định danh duy nhất</strong> của provider, kiểu <code>com.example.app.provider</code>.</td><td><strong>Bắt buộc.</strong> Không được trùng giữa các app.</td></tr>
    <tr><td><code>android:exported</code></td><td>App khác có truy cập provider được không.</td><td><code>false</code> = nội bộ, <code>true</code> = chia sẻ ra ngoài.</td></tr>
    <tr><td><code>android:grantUriPermissions</code></td><td>Có thể tạm cấp quyền URI (via Intent grant) không.</td><td><code>true</code> khi provider trả file/URI cho app khác.</td></tr>
    <tr><td><code>android:readPermission</code> / <code>writePermission</code></td><td>Permission cần có để đọc/ghi.</td><td>Kiểm soát truy cập chi tiết.</td></tr>
    <tr><td><code>android:permission</code></td><td>Permission chung cho mọi thao tác.</td><td>Dùng chung cho cả đọc và ghi.</td></tr>
  </tbody>
</table>

<h3>Vì sao trùng authorities gây crash khi cài đặt?</h3>
<p><code>authorities</code> phải <strong>duy nhất trên toàn hệ thống</strong>. Khi cài đặt, PackageManagerService kiểm tra: nếu một app khác đã chiếm cùng <code>authorities</code>, quá trình cài đặt <strong>thất bại</strong> với lỗi:</p>
<blockquote><p><em>"Package com.example.app: provider com.example.myapp.provider already registered"</em> hoặc <em>"INSTALL_FAILED_CONFLICTING_PROVIDER"</em>.</p></blockquote>
<div class="mermaid">
flowchart LR
    A[App cài đặt] --> B[PMS parse manifest]
    B --> C{authorities trùng\nvới app đã cài?}
    C -->|Không trùng| D[App cài đặt thành công]
    C -->|Trùng| E[INSTALL_FAILED_CONFLICTING_PROVIDER]
    E --> F[Phải đổi authorities\ntrước khi cài lại]
</div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Lỗi debug kinh điển:</strong> bạn cài 2 app debug (debug &amp; release) hoặc 2 flavor lên cùng thiết bị, cả hai đều khai báo cùng <code>authorities</code> → app thứ hai không cài được. <strong>Giải pháp:</strong> dùng <code>applicationId + ".provider"</code> làm authorities, hoặc dùng <code>manifestPlaceholders</code> để mỗi build variant có authorities riêng.</div></div>

<h3>Sử dụng manifestPlaceholders để tránh trùng authorities</h3>
<p>Trong <code>build.gradle.kts</code>:</p>
<pre data-lang="kotlin"><code>defaultConfig {
    applicationId = "com.example.myapp"
    manifestPlaceholders["providerAuthority"] = "\${applicationId}.provider"
}</code></pre>
<p>Trong Manifest:</p>
<pre data-lang="xml"><code>&lt;provider
    android:name=".MyContentProvider"
    android:authorities="\${providerAuthority}"
    android:exported="false" /&gt;</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">Nhờ placeholder, mỗi flavor/variant (debug, release, staging...) tự có <code>authorities</code> khác nhau vì <code>applicationId</code> khác nhau — hết cảnh trùng provider khi cài nhiều bản cùng lúc.</div></div>

<h2>Thẻ &lt;uses-permission&gt; và &lt;permission&gt;</h2>

<h3>&lt;uses-permission&gt; — xin quyền từ hệ thống</h3>
<p>Khai báo quyền mà app cần để truy cập tài nguyên được bảo vệ (Internet, camera, vị trí, danh bạ...):</p>
<pre data-lang="xml"><code>&lt;uses-permission android:name="android.permission.INTERNET" /&gt;
&lt;uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /&gt;
&lt;uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"
    android:maxSdkVersion="30" /&gt;</code></pre>
<table>
  <thead>
    <tr><th>Thuộc tính</th><th>Ý nghĩa</th></tr>
  </thead>
  <tbody>
    <tr><td><code>android:name</code></td><td>Tên permission (từ hệ thống hoặc từ app khác).</td></tr>
    <tr><td><code>android:maxSdkVersion</code></td><td>Chỉ xin permission tối đa đến API nào (thường để xin legacy permission cho bản cũ).</td></tr>
  </tbody>
</table>

<h3>Các loại permission (protection level)</h3>
<table>
  <thead>
    <tr><th>Loại</th><th>Cấp tự động</th><th>Ví dụ</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>normal</strong></td><td>Hệ thống tự cấp lúc cài đặt, không hỏi người dùng.</td><td><code>INTERNET</code>, <code>ACCESS_NETWORK_STATE</code>, <code>VIBRATE</code></td></tr>
    <tr><td><strong>dangerous</strong></td><td>Cần <strong>runtime permission</strong> (Android 6.0+/API 23+): hiện dialog hỏi người dùng lúc chạy.</td><td><code>CAMERA</code>, <code>RECORD_AUDIO</code>, <code>ACCESS_FINE_LOCATION</code>, <code>READ_CONTACTS</code></td></tr>
    <tr><td><strong>signature</strong></td><td>Chỉ cấp cho app ký cùng signature.</td><td>Các API hệ thống, giao tiếp app cùng nhà phát hành.</td></tr>
  </tbody>
</table>
<div class="mermaid">
flowchart TD
    P[App khai báo uses-permission] --> T{Loại permission?}
    T -->|normal| A[Hệ thống tự cấp\nlúc cài đặt]
    T -->|dangerous| B[Runtime permission\nAPI 23+: dialog hỏi người dùng]
    T -->|signature| C[Chỉ app cùng signature\ntự động cấp]
    B --> D[App gọi requestPermissions hoặc\nActivityResultContracts.RequestPermission]
</div>

<h3>Runtime permission — khai báo thôi chưa đủ</h3>
<p>Với permission <strong>dangerous</strong>, khai báo trong Manifest là <strong>điều kiện cần nhưng chưa đủ</strong>. App phải <strong>hỏi người dùng lúc chạy</strong>:</p>
<pre data-lang="kotlin"><code>private val locationPermissionLauncher =
    registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
        if (granted) {
            startLocationUpdates()
        } else {
            // Xử lý từ chối
        }
    }

fun requestLocationPermission() {
    if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
        == PackageManager.PERMISSION_GRANTED
    ) {
        startLocationUpdates()
    } else {
        locationPermissionLauncher.launch(Manifest.permission.ACCESS_FINE_LOCATION)
    }
}</code></pre>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Best practice:</strong> khai báo <strong>đúng</strong> permission cần dùng, không khai báo thừa. Mỗi permission thừa là một rào cản niềm tin với người dùng và là lý do Google Play từ chối/giới hạn app. Ví dụ: app chỉ đọc mạng thì dùng <code>ACCESS_NETWORK_STATE</code> + <code>INTERNET</code>, không cần <code>READ_PHONE_STATE</code>.</div></div>

<h3>&lt;permission&gt; — tự định nghĩa quyền</h3>
<p>Khi app của bạn muốn bảo vệ component hoặc dữ liệu bằng <strong>quyền do chính mình định nghĩa</strong> (component trong app, hoặc chia sẻ cho app khác cùng signature):</p>
<pre data-lang="xml"><code>&lt;permission
    android:name="com.example.myapp.permission.READ_DATA"
    android:protectionLevel="signature"
    android:label="@string/perm_read_data_label"
    android:description="@string/perm_read_data_desc" /&gt;</code></pre>
<p>Sau đó dùng trong provider/service/activity:</p>
<pre data-lang="xml"><code>&lt;provider
    android:name=".MyContentProvider"
    android:authorities="com.example.myapp.provider"
    android:exported="true"
    android:readPermission="com.example.myapp.permission.READ_DATA" /&gt;</code></pre>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Với quyền <strong>signature</strong>, chỉ những app ký cùng keystore mới được cấp. Đây là cách chuẩn để các app trong cùng một hệ sinh thái (cùng công ty) chia sẻ dữ liệu an toàn mà không để lọt ra app khác.</div></div>

<h2>&lt;uses-feature&gt; và &lt;queries&gt;</h2>

<h3>&lt;uses-feature&gt; — khai báo yêu cầu phần cứng</h3>
<p>Khai báo thiết bị cần có tính năng phần cứng gì thì app mới hoạt động đúng:</p>
<pre data-lang="xml"><code>&lt;uses-feature
    android:name="android.hardware.camera"
    android:required="true" /&gt;
&lt;uses-feature
    android:name="android.hardware.location.gps"
    android:required="false" /&gt;</code></pre>
<ul>
  <li><code>required="true"</code> → Google Play <strong>không cho</strong> thiết bị thiếu tính năng này cài app.</li>
  <li><code>required="false"</code> → app vẫn cài được, nhưng phải tự kiểm tra tính năng lúc chạy.</li>
</ul>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Khai báo một số permission sẽ <strong>ngầm đòi</strong> uses-feature tương ứng (ví dụ <code>CAMERA</code> permission → ngầm yêu cầu camera). Nếu app chỉ dùng camera "nếu có", phải khai báo <code>&lt;uses-feature android:name="android.hardware.camera" android:required="false" /&gt;</code> để Google Play không chặn thiết bị không có camera.</div></div>

<h3>&lt;queries&gt; — Package Visibility từ Android 11</h3>
<p>Từ <strong>Android 11 (API 30)</strong>, app không "nhìn thấy" các package khác trừ khi khai báo. Nếu app cần <code>queryIntentActivities()</code> hoặc <code>resolveActivity()</code> để tìm app xử lý intent, phải khai báo <code>&lt;queries&gt;</code>:</p>
<pre data-lang="xml"><code>&lt;queries&gt;
    &lt;intent&gt;
        &lt;action android:name="android.intent.action.SEND" /&gt;
        &lt;data android:mimeType="text/plain" /&gt;
    &lt;/intent&gt;
    &lt;package android:name="com.example.targetapp" /&gt;
&lt;/queries&gt;</code></pre>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Không khai báo <code>&lt;queries&gt;</code> khi cần <code>resolveActivity()</code> → hàm <strong>luôn trả về <code>null</code></strong> trên Android 11+, gây crash hoặc chặn luồng "share/chọn app". Lỗi này rất khó phát hiện vì chỉ xảy ra trên thiết bị Android 11+.</div></div>

<h2>Thẻ &lt;meta-data&gt;</h2>
<p>Cho phép khai báo dữ liệu key-value tùy ý trong Manifest, được các <strong>thư viện đọc lúc runtime</strong> (Google Maps API key, Firebase, thư viện SDK...):</p>
<pre data-lang="xml"><code>&lt;application&gt;
    &lt;meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="\${MAPS_API_KEY}" /&gt;
&lt;/application&gt;</code></pre>
<pre data-lang="xml"><code>&lt;activity android:name=".MainActivity"&gt;
    &lt;meta-data
        android:name="android.nfc.meta_data"
        android:value="true" /&gt;
&lt;/activity&gt;</code></pre>
<p>Ứng dụng có thể đọc <code>&lt;meta-data&gt;</code> trong code:</p>
<pre data-lang="kotlin"><code>val ai = packageManager.getApplicationInfo(packageName, PackageManager.GET_META_DATA)
val apiKey = ai.metaData?.getString("com.google.android.geo.API_KEY")</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">Giá trị <code>\${MAPS_API_KEY}</code> là <strong>manifestPlaceholder</strong> được thay lúc build — cho phép debug dùng key riêng, release dùng key khác mà không hardcode secret trong source code.</div></div>

<h2>Manifest Merger và tools: namespace</h2>
<p>Đây là phần <strong>quan trọng nhất để debug manifest</strong>. Khi có xung đột giữa main manifest và library manifest, bạn dùng namespace <code>tools</code> để kiểm soát kết quả merge.</p>

<h3>tools:replace — ghi đè thuộc tính</h3>
<p>Khi library khai báo <code>android:label</code> khác và bạn muốn main manifest ghi đè:</p>
<pre data-lang="xml"><code>&lt;application
    android:label="@string/app_name"
    android:icon="@mipmap/ic_launcher"
    tools:replace="android:label, android:icon" /&gt;</code></pre>

<h3>tools:remove — xóa khai báo từ library</h3>
<pre data-lang="xml"><code>&lt;uses-permission
    android:name="com.some.library.permission.UNNECESSARY"
    tools:remove="android:name" /&gt;</code></pre>

<h3>tools:node — kiểm soát toàn bộ node</h3>
<ul>
  <li><code>tools:node="merge"</code> — mặc định, gộp thuộc tính.</li>
  <li><code>tools:node="replace"</code> — thay toàn bộ node từ library.</li>
  <li><code>tools:node="remove"</code> — xóa node.</li>
</ul>
<pre data-lang="xml"><code>&lt;application tools:node="replace"&gt;
    &lt;!-- Toàn bộ application thay thế cấu hình từ library --&gt;
&lt;/application&gt;</code></pre>

<h3>Lỗi merge điển hình</h3>
<blockquote><p><em>"Attribute application@label value=(@string/app_name) from AndroidManifest.xml is also present at [library] value=(...)"</em></p></blockquote>
<p><strong>Nguyên nhân:</strong> thư viện khai báo cùng thuộc tính với main manifest. <strong>Giải pháp:</strong> thêm <code>tools:replace</code> cho thuộc tính đó.</p>
<pre data-lang="xml"><code>&lt;application
    android:label="@string/app_name"
    tools:replace="android:label" /&gt;</code></pre>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Khi gặp lỗi merge, AGP báo chính xác hai bên xung đột (main manifest vs library nào). Đừng vội xóa library — hãy đọc thông báo để xác định thuộc tính nào cần <code>tools:replace</code>.</div></div>

<h2>Khi nào không nên lạm dụng Manifest</h2>
<p>Manifest giải quyết rất nhiều vấn đề, nhưng <strong>không phải là nơi cho mọi thứ</strong>:</p>
<table>
  <thead>
    <tr><th>Việc</th><th>Nên làm ở Manifest?</th><th>Vì sao</th></tr>
  </thead>
  <tbody>
    <tr><td>Khai báo component</td><td>✅ Bắt buộc</td><td>Hệ thống cần biết để khởi chạy.</td></tr>
    <tr><td>Khai báo permission cần dùng</td><td>✅ Bắt buộc</td><td>Hệ thống kiểm soát truy cập.</td></tr>
    <tr><td>Version, package</td><td>❌ Không nên</td><td>Đã chuyển sang <code>build.gradle.kts</code> (<code>namespace</code>, <code>versionCode</code>...).</td></tr>
    <tr><td>Cấu hình môi trường theo flavor</td><td>⚠️ Hạn chế</td><td>Ưu tiên <code>buildConfigField</code>/<code>resValue</code>/placeholder thay vì nhiều manifest.</td></tr>
    <tr><td>Logic runtime, khởi tạo nặng</td><td>❌ Không nên</td><td>Đưa vào <code>Application.onCreate()</code> hoặc DI container, không đặt cấu hình tĩnh ở manifest.</td></tr>
    <tr><td>Chống trùng Activity</td><td>⚠️ Hạn chế</td><td>Ưu tiên Intent flags / Navigation component thay vì <code>launchMode</code> cứng.</td></tr>
  </tbody>
</table>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">Quy tắc chung: <strong>Manifest khai báo "app là gì"</strong>, <code>build.gradle.kts</code> cấu hình "build như thế nào". Nếu thấy mình đang viết cấu hình biến môi trường vào manifest, hãy chuyển sang placeholder/buildConfigField.</div></div>

<h2>Ví dụ thực tế: Manifest hoàn chỉnh cho app multi-feature</h2>
<p>Đây là ví dụ một manifest thực tế của app có: launcher, màn hình chi tiết nhận share, foreground service đồng bộ, receiver khởi động, provider chia sẻ dữ liệu, và runtime permission.</p>
<pre data-lang="xml"><code>&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"&gt;

    &lt;!-- Permission normal --&gt;
    &lt;uses-permission android:name="android.permission.INTERNET" /&gt;
    &lt;uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" /&gt;

    &lt;!-- Permission dangerous → phải xin runtime --&gt;
    &lt;uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /&gt;
    &lt;uses-permission android:name="android.permission.POST_NOTIFICATIONS" /&gt;

    &lt;!-- Permission cần cho foreground service --&gt;
    &lt;uses-permission android:name="android.permission.FOREGROUND_SERVICE" /&gt;
    &lt;uses-permission android:name="android.permission.FOREGROUND_SERVICE_DATA_SYNC" /&gt;

    &lt;!-- Receiver BOOT_COMPLETED --&gt;
    &lt;uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" /&gt;

    &lt;application
        android:name=".MyApplication"
        android:allowBackup="false"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/Theme.MyApp"
        tools:replace="android:label"&gt;

        &lt;!-- Launcher --&gt;
        &lt;activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTask"&gt;
            &lt;intent-filter&gt;
                &lt;action android:name="android.intent.action.MAIN" /&gt;
                &lt;category android:name="android.intent.category.LAUNCHER" /&gt;
            &lt;/intent-filter&gt;
        &lt;/activity&gt;

        &lt;!-- Nhận chia sẻ văn bản từ app khác --&gt;
        &lt;activity
            android:name=".ShareActivity"
            android:exported="true"
            android:theme="@style/Theme.MyApp.Translucent"&gt;
            &lt;intent-filter&gt;
                &lt;action android:name="android.intent.action.SEND" /&gt;
                &lt;category android:name="android.intent.category.DEFAULT" /&gt;
                &lt;data android:mimeType="text/plain" /&gt;
            &lt;/intent-filter&gt;
        &lt;/activity&gt;

        &lt;!-- Foreground service đồng bộ --&gt;
        &lt;service
            android:name=".SyncService"
            android:exported="false"
            android:foregroundServiceType="dataSync" /&gt;

        &lt;!-- Receiver khởi động --&gt;
        &lt;receiver
            android:name=".BootReceiver"
            android:enabled="true"
            android:exported="false"&gt;
            &lt;intent-filter&gt;
                &lt;action android:name="android.intent.action.BOOT_COMPLETED" /&gt;
            &lt;/intent-filter&gt;
        &lt;/receiver&gt;

        &lt;!-- Provider nội bộ, authorities theo applicationId --&gt;
        &lt;provider
            android:name=".DataProvider"
    android:authorities="\${providerAuthority}"
            android:exported="false" /&gt;

        &lt;!-- API key cho Maps library --&gt;
        &lt;meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="\${MAPS_API_KEY}" /&gt;
    &lt;/application&gt;
&lt;/manifest&gt;</code></pre>
<p>Với <code>build.gradle.kts</code> tương ứng:</p>
<pre data-lang="kotlin"><code>android {
    namespace = "com.example.myapp"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.myapp"
        minSdk = 24
        targetSdk = 34
    manifestPlaceholders["providerAuthority"] = "\${applicationId}.provider"
        manifestPlaceholders["MAPS_API_KEY"] = project.findProperty("mapsApiKey") as String? ?: ""
    }
}</code></pre>

<h3>Phân tích luồng: người dùng share link vào app</h3>
<div class="mermaid">
sequenceDiagram
    participant User as Người dùng
    participant System as Android System
    participant PMS as PackageManager
    participant Share as ShareActivity

    User->>System: Bấm "Share" trên Chrome → chọn app của bạn
    System->>PMS: Resolve ACTION_SEND + mimeType text/plain
    PMS->>System: Tìm activity có intent-filter khớp + exported=true
    System->>Share: startActivity(intent) với ACTION_SEND
    Share->>Share: onNewIntent → xử lý text được share
</div>

<h2>Trade-offs và Common Mistakes (Sai lầm thường gặp)</h2>
<ol>
  <li><strong>Quên khai báo component trong Manifest:</strong> Activity/Service/Receiver/Provider không khai báo → crash khi gọi (<code>ActivityNotFoundException</code>). <strong>Giải pháp:</strong> luôn kiểm tra manifest sau khi tạo component mới.</li>
  <li><strong>Thiếu <code>android:exported</code> trên Android 12+:</strong> build fail. <strong>Giải pháp:</strong> khai báo rõ <code>exported</code> cho mọi component có intent-filter; <code>false</code> cho nội bộ.</li>
  <li><strong>Khai báo <code>exported="true"</code> cho component nội bộ:</strong> lỗ hổng bảo mật — app khác gọi được Activity/Service/Provider của bạn. <strong>Giải pháp:</strong> mặc định <code>false</code>, chỉ mở khi thực sự cần.</li>
  <li><strong>Static receiver nghe broadcast bị chặn (API 26+):</strong> receiver không bao giờ được gọi. <strong>Giải pháp:</strong> dùng dynamic receiver khi app chạy, hoặc WorkManager; chỉ đăng ký static cho broadcast thuộc danh sách trắng.</li>
  <li><strong>Trùng <code>authorities</code> giữa các app/flavor:</strong> không cài được app (<code>INSTALL_FAILED_CONFLICTING_PROVIDER</code>). <strong>Giải pháp:</strong> authorities theo <code>applicationId</code> qua manifestPlaceholder.</li>
  <li><strong>Khai báo permission thừa:</strong> app bị Google Play giới hạn/từ chối, người dùng mất niềm tin. <strong>Giải pháp:</strong> chỉ khai báo đúng permission cần; dùng <code>android:maxSdkVersion</code> cho permission chỉ cần ở bản cũ.</li>
  <li><strong><code>allowBackup="true"</code> cho app nhạy cảm:</strong> dữ liệu bị backup lên cloud của Google. <strong>Giải pháp:</strong> đặt <code>false</code> hoặc cấu hình <code>dataExtractionRules</code>/<code>fullBackupContent</code>.</li>
  <li><strong>Dùng <code>launchMode</code> để giải quyết vấn đề back stack:</strong> cứng nhắc, khó theo luồng. <strong>Giải pháp:</strong> ưu tiên Intent flags + Navigation component.</li>
  <li><strong>Không đọc <code>manifest-merger-report.txt</code> khi gặp khai báo "ma":</strong> mất thời gian truy tìm nguồn gốc thẻ lạ. <strong>Giải pháp:</strong> mở file report để xem thao tác merge.</li>
  <li><strong>Thiếu <code>&lt;queries&gt;</code> trên Android 11+:</strong> <code>resolveActivity()</code> trả <code>null</code>, app không tìm được app xử lý intent. <strong>Giải pháp:</strong> khai báo <code>&lt;queries&gt;</code> với intent/package cần.</li>
  <li><strong>Foreground Service thiếu <code>foregroundServiceType</code> (Android 14+):</strong> crash <code>MissingForegroundServiceTypeException</code>. <strong>Giải pháp:</strong> khai báo type + permission tương ứng.</li>
  <li><strong>Ép <code>screenOrientation="portrait"</code> cho mọi màn hình:</strong> trải nghiệm kém trên tablet/foldable. <strong>Giải pháp:</strong> dùng <code>unset</code>/<code>fullSensor</code>, hoặc responsive layout.</li>
</ol>

<h2>Kết nối hệ thống</h2>

<h3>Vị trí của Manifest trong kiến trúc dự án</h3>
<p>Trong một dự án Android thực tế (multi-module, Clean Architecture), Manifest nằm ở <strong>tầng ứng dụng (app layer)</strong> — nơi duy nhất giao tiếp trực tiếp với hệ điều hành:</p>
<ul>
  <li><strong>App module (<code>:app</code>):</strong> chứa manifest chính, khai báo launcher, Application class, các component public. Đây là nơi hệ thống "nhìn thấy" toàn bộ app.</li>
  <li><strong>Feature/Domain/Data module (<code>:feature:*</code>, <code>:core:*</code>):</strong> mỗi module library có <strong>manifest riêng bên trong AAR</strong>, khai báo component và permission của riêng module. Những manifest này <strong>tự động merge</strong> vào manifest app khi build.</li>
  <li><strong>Hệ điều hành:</strong> PMS (cài đặt) và AMS (runtime) là hai phía tiêu thụ dữ liệu manifest.</li>
</ul>
<div class="mermaid">
flowchart TB
    subgraph App[App Module - :app]
        MAIN[AndroidManifest.xml\ncomponent public, Application]
    end
    subgraph Feature[Feature/Core Modules - AAR]
        L1[manifest của :feature:cart]
        L2[manifest của :core:network]
    end
    MAIN --> MERGE[Manifest Merger\nlúc build]
    L1 --> MERGE
    L2 --> MERGE
    MERGE --> APK[APK/AAB\nAndroidManifest binary]
    APK --> PMS[PackageManagerService\nlúc cài đặt]
    APK --> AMS[ActivityManagerService\nlúc runtime]
</div>

<h3>Tương tác với các tầng khác</h3>
<ul>
  <li><strong>UI (Activity/Fragment):</strong> Activity phải được khai báo, có <code>exported</code> đúng, intent-filter hợp lý thì navigation và deep link mới hoạt động.</li>
  <li><strong>Background (Service/WorkManager):</strong> Service phải khai báo đúng <code>foregroundServiceType</code>; WorkManager tự đăng ký component của nó qua manifest của thư viện.</li>
  <li><strong>Data (Provider/Room):</strong> Room tự khai báo provider của mình (dùng để lưu schema) — đó là lý do bạn thấy provider "lạ" trong manifest đã merge. <code>authorities</code> của Room cũng sinh theo applicationId.</li>
  <li><strong>Domain logic:</strong> hoàn toàn không phụ thuộc manifest — Manifest là ranh giới giữa code nghiệp vụ và hệ điều hành.</li>
</ul>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Room:</strong> thư viện Room tự thêm một <code>&lt;provider&gt;</code> vào manifest để lưu schema database. Nếu bạn thấy <code>androidx.room.RoomOpenHelper</code> trong manifest đã merge, đó là từ thư viện — đừng xóa. Đây là minh chứng rõ nhất cho cơ chế Manifest Merger.</div></div>

<h2>Lịch sử phát triển</h2>
<ul>
  <li><strong>Android 1.0:</strong> Manifest ra đời cùng platform, khai báo package, component, permission.</li>
  <li><strong>Android 6.0 (API 23, 2015):</strong> giới thiệu <strong>Runtime Permission</strong> — permission dangerous không còn cấp tự động lúc cài mà hỏi người dùng lúc chạy. Khai báo manifest vẫn bắt buộc.</li>
  <li><strong>Android 7.0 (API 24):</strong> <code>android:dataExtractionRules</code> phục vụ backup riêng theo version.</li>
  <li><strong>Android 8.0 (API 26, 2017):</strong> giới hạn <strong>implicit broadcast</strong> cho static receiver; bắt buộc Foreground Service khi chạy nền lâu.</li>
  <li><strong>AGP 7.3 (2022):</strong> <code>package</code> trong manifest bắt đầu deprecated, chuyển sang <code>namespace</code> trong build script.</li>
  <li><strong>Android 12 (API 31, 2021):</strong> <strong>bắt buộc <code>android:exported</code></strong> khi component có intent-filter.</li>
  <li><strong>AGP 8.0 (2023):</strong> loại bỏ <code>package</code> khỏi manifest — chỉ còn <code>namespace</code>.</li>
  <li><strong>Android 14 (API 34, 2023):</strong> bắt buộc <code>android:foregroundServiceType</code>; quy định quyền notification <code>POST_NOTIFICATIONS</code> là runtime permission.</li>
  <li><strong>Android 15 (API 35, 2024):</strong> giới hạn thời gian chạy tối đa cho một số loại Foreground Service; siết thêm quyền riêng tư.</li>
</ul>

<h2>Tổng kết</h2>
<p>AndroidManifest.xml là <strong>hợp đồng giữa app và hệ điều hành</strong>: khai báo app là ai, gồm những component nào, cần quyền gì, và phù hợp với thiết bị nào.</p>
<p>Ba điều cốt lõi để làm việc tốt với Manifest:</p>
<ol>
  <li><strong>Khai báo đủ, đúng, ít:</strong> mọi component phải có trong manifest; <code>exported</code> đặt <code>false</code> theo mặc định; permission chỉ khai báo cái thực sự dùng.</li>
  <li><strong>Hiểu Manifest Merger:</strong> manifest cuối cùng là kết quả gộp từ main + variant + library. Gặp khai báo lạ, mở <code>manifest-merger-report.txt</code>; kiểm soát xung đột bằng <code>tools:replace</code>/<code>tools:remove</code>.</li>
  <li><strong>Cập nhật theo phiên bản:</strong> quy tắc <code>exported</code> (Android 12+), implicit broadcast (Android 8+), <code>foregroundServiceType</code> (Android 14+) là những ràng buộc mà manifest phải tuân thủ theo từng API level.</li>
</ol>
<p>Nắm được Manifest, bạn đọc được "giấy khai sinh" của mọi app Android — và biết chính xác hệ thống nhìn thấy gì ở app của mình.</p>

<h3>Lộ trình học tiếp</h3>
<ul>
  <li><strong>4.2.1 Activity</strong> — lifecycle, task &amp; back stack, hiểu sâu về component được khai báo ở manifest.</li>
  <li><strong>4.2.3 Android Service</strong> — triển khai started/bound/foreground service, kết nối với <code>foregroundServiceType</code>.</li>
  <li><strong>4.2.4 Broadcast Receiver</strong> — static vs dynamic receiver, giới hạn implicit broadcast.</li>
  <li><strong>4.2.5 Content Provider</strong> — triển khai provider, quyền đọc/ghi, chia sẻ dữ liệu.</li>
  <li><strong>4.2.6 Intent</strong> — explicit/implicit intent, intent filter, cách hệ thống resolve component.</li>
</ul>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/guide/topics/manifest/manifest-intro">Android Developers — App Manifest Overview</a></li>
  <li><a href="https://developer.android.com/guide/topics/manifest/application-element">Android Developers — Application element</a></li>
  <li><a href="https://developer.android.com/guide/topics/manifest/activity-element">Android Developers — Activity element</a></li>
  <li><a href="https://developer.android.com/guide/topics/manifest/service-element">Android Developers — Service element</a></li>
  <li><a href="https://developer.android.com/guide/topics/manifest/receiver-element">Android Developers — Receiver element</a></li>
  <li><a href="https://developer.android.com/guide/topics/manifest/provider-element">Android Developers — Provider element</a></li>
  <li><a href="https://developer.android.com/build/manage-manifests">Android Developers — Manifest Merger</a></li>
  <li><a href="https://developer.android.com/build/manifest-merger">Android Developers — Manifest merger reference (tools: replace/remove)</a></li>
  <li><a href="https://developer.android.com/guide/topics/permissions/overview">Android Developers — Permissions overview</a></li>
  <li><a href="https://developer.android.com/guide/topics/permissions/navigation">Android Developers — Runtime permissions</a></li>
  <li><a href="https://developer.android.com/develop/background-work/services/fgs">Android Developers — Foreground service types (Android 14+)</a></li>
  <li><a href="https://developer.android.com/training/package-visibility">Android Developers — Package visibility on Android 11+</a></li>
  <li><a href="https://developer.android.com/about/versions/12/behavior-changes-12#exported">Android Developers — android:exported requirement on Android 12+</a></li>
</ul>
`
  }
});

Object.assign(ANDROID_CONTENT, {

  'activity-state-changes': {
    title: 'Activity State Changes',
    summary: 'Xử lý State Changes thực chiến — hiểu vì sao Activity bị destroy/recreate, phân biệt configuration change với process death, và áp dụng đúng bộ công cụ ViewModel, SavedStateHandle, onSaveInstanceState, rememberSaveable cho từng loại dữ liệu trong project thực tế.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '30 phút',
    depth: 'deep-dive',
    tags: ['android', 'activity', 'state', 'configuration-change', 'process-death', 'viewmodel', 'savedstatehandle', 'bundle', 'composestate'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['activity-lifecycle'],
    related: ['activity-parcelables-bundle', 'viewmodel', 'compose-state'],
    learningOutcomes: [
      'Giải thích được vì sao Android phải destroy/recreate Activity khi configuration change.',
      'Phân biệt được configuration change và process death về hành vi, dữ liệu bị mất và cách test.',
      'Chọn đúng công cụ lưu state (ViewModel, SavedStateHandle, onSaveInstanceState, rememberSaveable) cho từng loại dữ liệu.',
      'Triển khai được luồng lưu/khôi phục state trong app MVVM bằng cả View (XML) và Jetpack Compose.',
      'Tránh được các lỗi phổ biến: fetch API lặp, TransactionTooLargeException, lạm dụng android:configChanges.'
    ],
    knowledgeGap: 'Không hiểu State Changes sẽ khiến ứng dụng mất dữ liệu khi xoay màn hình, mất luôn cả state quan trọng khi process bị kill, fetch API lặp lại gây lãng phí băng thông, và phải dùng android:configChanges như "miếng vá" thay vì xử lý đúng bản chất.',
    updatedAt: '2026-08-03',
    readTime: '30 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Bạn đang điền form đặt hàng: đã chọn 2 sản phẩm, nhập xong số điện thoại, chọn đúng giao hàng nhanh. Đang định bấm "Đặt hàng" thì xoay điện thoại sang ngang.</p>
<p>Kết quả: toàn bộ form trống trơn, danh sách sản phẩm quay về đầu trang, giao diện flash trắng rồi load lại API từ con số 0.</p>
<p>Nguyên nhân không phải "app lỗi". Đây là <strong>hành vi mặc định của Android</strong>: khi màn hình xoay, Activity bị <strong>destroy hoàn toàn rồi tạo lại từ đầu</strong>. Nếu không chủ động lưu state thì mọi thứ trong Activity instance cũ đều biến mất.</p>
<p>Bài viết này dạy bạn: hiểu vì sao điều đó xảy ra, phân biệt các tình huống mất dữ liệu, và chọn đúng công cụ lưu state cho từng loại dữ liệu trong project thực tế.</p>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được vì sao Android destroy/recreate Activity khi configuration change.</li>
  <li>Phân biệt được configuration change và process death.</li>
  <li>Chọn đúng ViewModel / SavedStateHandle / onSaveInstanceState / rememberSaveable cho từng loại dữ liệu.</li>
  <li>Triển khai được luồng lưu/khôi phục state trong app MVVM bằng cả XML và Compose.</li>
  <li>Tránh được fetch API lặp, TransactionTooLargeException, lạm dụng android:configChanges.</li>
</ul>

<h2>Nó là gì? — Vì sao Activity bị destroy/recreate?</h2>
<p>State Changes là tập hợp các sự kiện khiến Android <strong>thay đổi trạng thái tồn tại của Activity</strong>, trong đó quan trọng nhất là <strong>Configuration Change</strong> và <strong>Process Death</strong>.</p>

<h3>Configuration Change</h3>
<p>Configuration Change là sự thay đổi cấu hình thiết bị mà Android cho rằng ảnh hưởng tới tài nguyên đang hiển thị (layout, drawable, string, theme...). Khi xảy ra, Android <strong>bắt buộc</strong> tải lại tài nguyên phù hợp với cấu hình mới.</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Configuration</th>
      <th style="padding:8px 12px;text-align:left;">Trigger</th>
      <th style="padding:8px 12px;text-align:left;">Ví dụ thực tế</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;"><code>orientation</code></td>
      <td style="padding:8px 12px;">Xoay màn hình</td>
      <td style="padding:8px 12px;">Portrait → Landscape</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;"><code>screenSize</code></td>
      <td style="padding:8px 12px;">Thay đổi kích thước</td>
      <td style="padding:8px 12px;">Gập mở màn hình fold, multi-window</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;"><code>locale</code></td>
      <td style="padding:8px 12px;">Đổi ngôn ngữ</td>
      <td style="padding:8px 12px;">Tiếng Anh → Tiếng Việt</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;"><code>uiMode</code></td>
      <td style="padding:8px 12px;">Đổi theme</td>
      <td style="padding:8px 12px;">Light → Dark mode</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;"><code>fontScale</code></td>
      <td style="padding:8px 12px;">Đổi cỡ chữ</td>
      <td style="padding:8px 12px;">Normal → Large</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;"><code>keyboard</code></td>
      <td style="padding:8px 12px;">Gắn/ngắt bàn phím ngoài</td>
      <td style="padding:8px 12px;">Kết nối bluetooth keyboard</td>
    </tr>
  </tbody>
</table>

<h3>Vì sao phải "destroy rồi tạo lại"?</h3>
<p>Khi orientation thay đổi, hệ thống cần tải <code>layout-land/</code>, drawable theo density mới, string theo locale mới, theme theo uiMode mới. Cách đơn giản và chắc chắn nhất để mọi tài nguyên được reload đúng là <strong>tạo lại Activity từ đầu bằng <code>onCreate()</code></strong>.</p>

<div class="mermaid">
flowchart TD
    A["Activity đang RESUME<br/>hiển thị với config cũ"] --> B["Xoay màn hình / đổi theme /<br/>đổi ngôn ngữ..."]
    B --> C["onPause() → onStop()"]
    C --> D["onSaveInstanceState()<br/>Cơ hội lưu state vào Bundle"]
    D --> E["onDestroy()<br/>Instance cũ bị hủy"]
    E --> F["onCreate(savedInstanceState)<br/>Instance mới, Bundle có thể không null"]
    F --> G["onStart() → onRestoreInstanceState() → onResume()"]
    G --> H["Activity RESUME với config mới"]
</div>

<p><strong>Điểm mấu chốt:</strong> <code>onSaveInstanceState()</code> là cơ hội DUY NHẤT để giữ lại dữ liệu xuyên qua cú destroy/recreate này. Những gì không lưu vào Bundle thì mất.</p>
<div class="callout callout-note"><span class="callout-icon">📝</span><div class="callout-body">Từ API 28+, <code>onSaveInstanceState()</code> luôn được gọi <strong>sau</strong> <code>onStop()</code>. Trước API 28 thứ tự có thể khác. Với hầu hết app hiện tại (minSdk ≥ 21), hãy giả định thứ tự là <code>onPause → onStop → onSaveInstanceState</code>.</div></div>

<h2>Khi nào dữ liệu bị mất? — 3 tình huống cần phân biệt</h2>
<p>Không phải lúc nào Activity biến mất cũng giống nhau. Bạn phải phân biệt <strong>3 tình huống</strong> vì mỗi loại đòi hỏi công cụ khác nhau:</p>

<h3>1. Configuration Change — dữ liệu mất, app vẫn "sống"</h3>
<ul>
  <li>Activity destroy/recreate nhưng <strong>process vẫn chạy</strong>.</li>
  <li>ViewModel <strong>sống sót</strong> (được giữ lại qua <code>NonConfigurationInstances</code>).</li>
  <li>Bundle trong <code>onSaveInstanceState()</code> được khôi phục.</li>
  <li>Dữ liệu nào không thuộc ViewModel và không nằm trong Bundle thì mất.</li>
</ul>

<h3>2. Process Death — toàn bộ app chết</h3>
<ul>
  <li>System kill toàn bộ process (thiếu bộ nhớ, ép buộc dừng...).</li>
  <li>ViewModel <strong>biến mất</strong>, static/singleton <strong>reset về 0</strong>.</li>
  <li>Bundle đã lưu qua <code>onSaveInstanceState()</code> vẫn được hệ thống <strong>giữ lại và khôi phục</strong> khi người dùng quay lại app.</li>
  <li><code>onDestroy()</code> <strong>không đảm bảo</strong> được gọi.</li>
</ul>

<h3>3. Người dùng thoát hẳn (bấm Back / finish)</h3>
<ul>
  <li>Activity finish vĩnh viễn, không ai cần khôi phục.</li>
  <li><code>onSaveInstanceState()</code> <strong>không được gọi</strong>.</li>
  <li>Không nên lưu state — dữ liệu cần giữ lâu dài phải đi vào <strong>Room / DataStore</strong> (persistent), không phải state management.</li>
</ul>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tiêu chí</th>
      <th style="padding:8px 12px;text-align:left;">Configuration Change</th>
      <th style="padding:8px 12px;text-align:left;">Process Death</th>
      <th style="padding:8px 12px;text-align:left;">User quits (Back)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Process có chết không?</td>
      <td style="padding:8px 12px;">❌</td>
      <td style="padding:8px 12px;">✅</td>
      <td style="padding:8px 12px;">✅</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">ViewModel</td>
      <td style="padding:8px 12px;">✅ Sống</td>
      <td style="padding:8px 12px;">❌ Mất</td>
      <td style="padding:8px 12px;">❌ Mất</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Bundle (savedState)</td>
      <td style="padding:8px 12px;">✅ Khôi phục</td>
      <td style="padding:8px 12px;">✅ Khôi phục</td>
      <td style="padding:8px 12px;">Không cần</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">onSaveInstanceState</td>
      <td style="padding:8px 12px;">✅ Gọi</td>
      <td style="padding:8px 12px;">✅ Gọi (nếu có cơ hội)</td>
      <td style="padding:8px 12px;">❌ Không gọi</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;">Cách phòng thủ</td>
      <td style="padding:8px 12px;">ViewModel + Bundle</td>
      <td style="padding:8px 12px;">Bundle / SavedStateHandle</td>
      <td style="padding:8px 12px;">Room / DataStore</td>
    </tr>
  </tbody>
</table>

<h2>Chọn công cụ nào? — Bản đồ quyết định</h2>
<p>Trước khi vào code, ghi nhớ nguyên tắc lựa chọn sau:</p>
<pre data-lang="text"><code>Dữ liệu cần xử lý
    │
    ├── Dữ liệu lâu dài (giỏ hàng, profile, settings)?
    │       └── ✅ Room / DataStore  ← KHÔNG phải state management
    │
    ├── Dữ liệu load từ network/database (danh sách sản phẩm)?
    │       └── ✅ ViewModel  ← sống qua config change, load lại nếu process death
    │
    ├── User input quan trọng (search query, filter, tab, step trong form)?
    │       └── ✅ SavedStateHandle (Compose) / onSaveInstanceState (XML)
    │
    └── Dữ liệu lớn (list, bitmap)?
            └── ✅ ViewModel + chỉ lưu ID vào Bundle để load lại sau process death</code></pre>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tiêu chí</th>
      <th style="padding:8px 12px;text-align:left;">ViewModel</th>
      <th style="padding:8px 12px;text-align:left;">SavedStateHandle</th>
      <th style="padding:8px 12px;text-align:left;">onSaveInstanceState</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Survive config change</td>
      <td style="padding:8px 12px;">✅</td>
      <td style="padding:8px 12px;">✅</td>
      <td style="padding:8px 12px;">✅</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Survive process death</td>
      <td style="padding:8px 12px;">❌</td>
      <td style="padding:8px 12px;">✅</td>
      <td style="padding:8px 12px;">✅</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Giới hạn kích thước</td>
      <td style="padding:8px 12px;">Không</td>
      <td style="padding:8px 12px;">~1MB Bundle</td>
      <td style="padding:8px 12px;">~1MB Bundle</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;">Cần Parcelable/Serializable</td>
      <td style="padding:8px 12px;">❌</td>
      <td style="padding:8px 12px;">✅</td>
      <td style="padding:8px 12px;">✅</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;">Phù hợp cho</td>
      <td style="padding:8px 12px;">Business data, API response, dữ liệu lớn</td>
      <td style="padding:8px 12px;">State quan trọng, kích thước nhỏ</td>
      <td style="padding:8px 12px;">Transient UI state (XML)</td>
    </tr>
  </tbody>
</table>

<h2>Triển khai step-by-step trong project thực tế</h2>
<p>Lấy bối cảnh cụ thể: một app <strong>mua sắm</strong> (giống các app thương mại điện tử thực tế). Màn hình chính là <code>ProductListScreen</code> — có ô <strong>search</strong>, <strong>filter theo category</strong>, danh sách sản phẩm load từ API, và <strong>cart</strong> hiển thị số lượng. Yêu cầu: xoay màn hình và process death đều không được làm mất trải nghiệm người dùng.</p>

<h3>Bước 1: ViewModel — giữ dữ liệu business qua configuration change</h3>
<p>Loại dữ liệu nguy hiểm nhất khi xoay màn hình là <strong>kết quả API</strong>. Nếu fetch lại trong <code>onCreate</code>, mỗi lần xoay màn hình là một lần gọi lại mạng. ViewModel giải quyết điều này: nó sống sót qua config change nên dữ liệu được giữ nguyên, code chỉ gọi API <strong>đúng một lần</strong>.</p>
<pre data-lang="kotlin"><code>class ProductListViewModel(
    private val repository: ProductRepository
) : ViewModel() {

    private val _products = MutableStateFlow&lt;List&lt;Product&gt;&gt;(emptyList())
    val products: StateFlow&lt;List&lt;Product&gt;&gt; = _products.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow&lt;Boolean&gt; = _isLoading.asStateFlow()

    init {
        loadProducts() // Chỉ chạy 1 lần khi ViewModel được TẠO MỚI
    }

    private fun loadProducts() {
        viewModelScope.launch {
            _isLoading.value = true
            runCatching { repository.getProducts() }
                .onSuccess { _products.value = it }
                .onFailure { /* show error state */ }
            _isLoading.value = false
        }
    }
}</code></pre>
<p><strong>Điều cốt lõi để hiểu:</strong> ViewModel sống sót qua config change nhờ <code>ViewModelStore</code> được lưu vào <code>NonConfigurationInstances</code> — một object mà <code>ActivityThread</code> giữ lại khi recreate Activity. Khi Activity mới tạo, nó lấy lại chính <code>ViewModelStore</code> cũ. Vì vậy <strong><code>init</code> chỉ chạy một lần</strong>, không chạy lại khi xoay màn hình.</p>

<div class="mermaid">
sequenceDiagram
    participant U as Người dùng
    participant A as Activity
    participant VM as ViewModel
    participant R as Repository/API
    U->>A: Mở màn hình
    A->>VM: ViewModel được tạo
    VM->>R: getProducts() (lần 1)
    R-->>VM: Kết quả
    U->>A: Xoay màn hình
    A--x A: Activity cũ destroy
    Note over A,VM: ViewModelStore KHÔNG bị hủy<br/>(lưu trong NonConfigurationInstances)
    A->>VM: Activity mới lấy lại ViewModel cũ
    Note over VM,R: Không gọi API lại — dữ liệu vẫn còn
    U->>A: Process bị kill (thiếu RAM)
    A--x VM: ViewModel biến mất cùng process
    A->>VM: ViewModel TẠO MỚI → gọi API lại (lần 2)
</div>

<h3>Bước 2: SavedStateHandle — lưu user input quan trọng, survive process death</h3>
<p>ViewModel giải quyết config change nhưng <strong>chết theo process</strong>. Search query hay bước form đang nhập là dữ liệu người dùng đã đánh máy — để mất là trải nghiệm cực tệ. Đây là chỗ dùng <strong>SavedStateHandle</strong>: nó nằm trong ViewModel nhưng tự động serialize vào Bundle qua <code>onSaveInstanceState()</code>, nên <strong>sống sót cả process death</strong>.</p>
<pre data-lang="kotlin"><code>class ProductListViewModel(
    private val repository: ProductRepository,
    private val savedStateHandle: SavedStateHandle
) : ViewModel() {

    // Auto-save/restore qua process death
    val searchQuery: StateFlow&lt;String&gt; =
        savedStateHandle.getStateFlow("search_query", "")

    val selectedCategory: StateFlow&lt;String&gt; =
        savedStateHandle.getStateFlow("selected_category", "all")

    fun onSearchQueryChanged(query: String) {
        savedStateHandle["search_query"] = query
    }

    fun onCategorySelected(category: String) {
        savedStateHandle["selected_category"] = category
    }
}</code></pre>
<p><strong>Cơ chế:</strong> SavedStateHandle dùng <code>onSaveInstanceState()</code> của Activity để lưu dữ liệu vào Bundle. Sau process death, hệ thống khôi phục Bundle, tạo ViewModel mới và <strong>đổ lại dữ liệu vào SavedStateHandle</strong> — dữ liệu trở về như chưa từng mất.</p>

<h3>Bước 3: onSaveInstanceState — transient UI state (View/XML)</h3>
<p>Trong View system, ngoài ViewModel, bạn vẫn cần xử lý các <strong>transient UI state</strong> thuộc riêng Activity: vị trí scroll của <code>RecyclerView</code>, tab đang chọn, vị trí cursor. Công cụ là <code>onSaveInstanceState()</code> / <code>onRestoreInstanceState()</code>.</p>
<pre data-lang="kotlin"><code>class ProductListActivity : AppCompatActivity() {

    private lateinit var binding: ActivityProductListBinding
    private var selectedTab = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityProductListBinding.inflate(layoutInflater)
        setContentView(binding.root)

        selectedTab = savedInstanceState?.getInt("selected_tab") ?: 0
        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        if (savedInstanceState != null) {
            binding.recyclerView.layoutManager
                ?.onRestoreInstanceState(savedInstanceState.getParcelable("recycler_scroll"))
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putInt("selected_tab", selectedTab)
        outState.putParcelable(
            "recycler_scroll",
            binding.recyclerView.layoutManager?.onSaveInstanceState()
        )
    }
}</code></pre>
<p><strong>Khi nào được gọi:</strong></p>
<ul>
  <li>Configuration change → <strong>luôn gọi</strong></li>
  <li>User bấm Home (Activity có thể bị kill sau đó) → <strong>luôn gọi</strong></li>
  <li>User bấm Back / finish → <strong>không gọi</strong></li>
</ul>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Giới hạn Bundle (quan trọng):</strong> Bundle được truyền qua Binder IPC, giới hạn ~1MB cho toàn bộ process. Không lưu Bitmap, danh sách lớn hay toàn bộ API response vào Bundle — sẽ dính <code>TransactionTooLargeException</code> và crash. Chỉ lưu ID/giá trị nhỏ, dữ liệu lớn để trong ViewModel hoặc load lại từ database.</div></div>

<h3>Bước 4: Compose — rememberSaveable thay cho Bundle</h3>
<p>Trong Jetpack Compose, <code>rememberSaveable</code> tương đương <code>onSaveInstanceState</code> — dữ liệu sống qua cả config change lẫn process death, còn <code>remember</code> chỉ sống qua recomposition.</p>
<pre data-lang="kotlin"><code>@Composable
fun ProductListScreen(viewModel: ProductListViewModel) {
    // ✅ Survive config change + process death (tự lưu vào Bundle)
    var searchQuery by rememberSaveable { mutableStateOf("") }

    // ✅ Cùng hiệu quả khi là thành viên của SavedStateHandle trong ViewModel
    val category by viewModel.selectedCategory.collectAsStateWithLifecycle()

    // ❌ Chỉ survive recomposition — mất ngay khi Activity recreate
    var scrollOffset by remember { mutableStateOf(0) }

    // Dữ liệu API — ViewModel giữ, KHÔNG dùng rememberSaveable
    val products by viewModel.products.collectAsStateWithLifecycle()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
    ) {
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            label = { Text("Tìm sản phẩm") }
        )
        products.forEach { product ->
            ProductRow(product = product)
        }
    }
}</code></pre>
<div class="callout callout-note"><span class="callout-icon">📝</span><div class="callout-body"><strong>Lưu ý với custom object:</strong> <code>rememberSaveable</code> cũng giới hạn bởi Bundle. Với object tự định nghĩa, cần implement <code>Saver</code> hoặc <code>@Parcelize</code>. Nếu không, app sẽ crash khi cố lưu object không Serializable/Parcelable.</div></div>

<h3>Bước 5: Tránh fetch API lặp lại</h3>
<p>Lỗi kinh điển: gọi API trong <code>onCreate</code> nhưng không kiểm tra, nên mỗi lần xoay màn hình là một lần gọi lại mạng.</p>
<pre data-lang="kotlin"><code>// ❌ SAI — fetch lại mỗi lần config change
class ProductListActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Mỗi lần xoay màn hình, Activity tạo mới → gọi lại API
        viewModel.loadProducts()
    }
}

// ✅ ĐÚNG — fetch 1 lần khi ViewModel được tạo
class ProductListViewModel(
    private val repository: ProductRepository
) : ViewModel() {
    init {
        loadProducts() // Chỉ chạy khi ViewModel TẠO MỚI (không chạy khi xoay màn hình)
    }
}</code></pre>

<h3>Bước 6: android:configChanges — ngoại lệ cho trường hợp đặc biệt</h3>
<p>Bạn có thể khai báo trong Manifest để <strong>ngăn</strong> Android destroy Activity khi một số configuration change nhất định xảy ra:</p>
<pre data-lang="xml"><code>&lt;activity
    android:name=".VideoPlayerActivity"
    android:configChanges="orientation|screenSize|screenLayout" /&gt;</code></pre>
<p>Khi khai báo, Android gọi <code>onConfigurationChanged()</code> thay vì destroy/recreate:</p>
<pre data-lang="kotlin"><code>override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) {
        playerView.resizeMode = RESIZE_MODE_FIT  // tự xử lý layout
    }
}</code></pre>
<p><strong>Khi nào nên dùng:</strong></p>
<ul>
  <li>Video player — không muốn interrupt playback</li>
  <li>Game — không muốn mất game state</li>
  <li>Map — không muốn reset camera position</li>
</ul>
<p><strong>Khi nào KHÔNG nên dùng:</strong></p>
<ul>
  <li>App thông thường — bạn phải tự xử lý toàn bộ việc tải lại layout/string/drawable</li>
  <li>Khi cần layout riêng cho landscape</li>
</ul>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Cảnh báo:</strong> <code>android:configChanges</code> chỉ "né" config change, KHÔNG giải quyết process death. Dùng nó như miếng vá cho mất state là <strong>sai gốc rễ</strong> — bạn vẫn phải làm đúng ViewModel + SavedStateHandle, và còn thêm gánh nặng tự quản lý resource. Hãy coi nó là ngoại lệ hiếm hoi, không phải thói quen.</div></div>

<h2>Process Death — hiểu và test</h2>
<p>Cách duy nhất để biết app có sống sót qua process death hay không là <strong>test thật</strong>, vì xoay màn hình KHÔNG test được process death.</p>
<pre data-lang="bash"><code># Đưa app về background trước (bấm Home), sau đó:
adb shell am kill com.example.shoppingapp</code></pre>
<p>Hoặc trong Android Studio: chạy app → bấm Home → <strong>Logcat panel → Terminate Application</strong> → mở lại app từ Recent Apps. App phải khôi phục về đúng màn hình và trạng thái trước khi bị kill.</p>
<p><strong>Quy tắc kiểm tra mọi màn hình:</strong></p>
<ol>
  <li>Điền dữ liệu / cuộn danh sách / mở tab.</li>
  <li>Bấm Home → kill process → mở lại.</li>
  <li>UI phải đúng như trước: search query, filter, scroll, dữ liệu đã load.</li>
</ol>

<h2>Sai lầm thường gặp</h2>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>1. Chỉ test xoay màn hình, bỏ qua process death</strong> — ViewModel "che" lỗi khi xoay màn hình, nên mọi thứ có vẻ OK. Nhưng sau process death, ViewModel mất → mất search query, mất bước form. Luôn test bằng <code>am kill</code>.</div></div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>2. Lưu dữ liệu lớn vào Bundle</strong> — List sản phẩm vài trăm item hoặc Bitmap vào Bundle sẽ crash <code>TransactionTooLargeException</code>. Chỉ lưu ID, load lại từ database. Dữ liệu lớn để trong ViewModel.</div></div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>3. Fetch API trong onCreate mỗi lần recreate</strong> — Tạo ViewModel mới mỗi lần xoay màn hình, gọi mạng lại vô ích, làm UI flash và tốn băng thông. Fetch trong <code>init</code> của ViewModel.</div></div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>4. Dùng android:configChanges để "fix" mất state</strong> — Không giải quyết được process death, còn phá vỡ cơ chế resource reload của hệ thống. Xử lý đúng bản chất bằng ViewModel + SavedStateHandle.</div></div>
<div class="callout callout-note"><span class="callout-icon">📝</span><div class="callout-body"><strong>5. Không phân biệt transient state và persistent data</strong> — Search query đang gõ là transient (SavedStateHandle), còn giỏ hàng phải là persistent (Room/DataStore). Lẫn lộn hai loại này làm logic lưu trữ vừa thừa vừa thiếu.</div></div>

<h2>Tư duy hệ thống — vị trí trong MVVM/Clean Architecture</h2>
<div class="mermaid">
flowchart TB
    subgraph UI["UI Layer"]
        SC["Composable / Activity + XML<br/>rememberSaveable / onSaveInstanceState<br/>(transient UI state)"]
    end
    subgraph VM["ViewModel Layer"]
        VV["ViewModel + SavedStateHandle<br/>(business state, survive config change<br/>+ process death)"]
    end
    subgraph Data["Data Layer"]
        REPO["Repository (load lại từ network/database<br/>sau process death)"]
        DB["Room / DataStore<br/>(persistent data)"]
    end
    SC -- "collect StateFlow<br/>bounded by lifecycle" --> VV
    VV -- "lưu state quan trọng" --> VV
    VV --> REPO
    REPO --> DB
</div>
<p>State Changes không phải việc của riêng UI. Trong kiến trúc đúng:</p>
<ul>
  <li><strong>UI Layer</strong> chỉ giữ transient UI state (scroll, input đang hiển thị) qua <code>rememberSaveable</code>/<code>onSaveInstanceState</code>.</li>
  <li><strong>ViewModel</strong> là nơi duy nhất giữ business state, dùng <code>SavedStateHandle</code> cho dữ liệu quan trọng cần sống qua process death.</li>
  <li><strong>Data Layer</strong> chịu trách nhiệm "load lại" dữ liệu bất cứ khi nào được hỏi — vì vậy sau process death, Repository chỉ việc đọc lại từ network/database.</li>
</ul>

<h2>References</h2>
<ul>
  <li><a href="https://developer.android.com/topic/libraries/architecture/saving-states">Android Developers — Save UI states</a></li>
  <li><a href="https://developer.android.com/guide/components/activities/activity-lifecycle">Android Developers — Activity lifecycle / state changes</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/viewmodel">Android Developers — ViewModel overview</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/saving-states#process_can_recreate_an_activity">Android Developers — Handle process death</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/viewmodel-savedstate">Android Developers — SavedStateHandle</a></li>
</ul>

<h2>Học tiếp</h2>
<ul>
  <li><strong>Parcelables and Bundle</strong> — cơ chế serialize dữ liệu qua Binder, giới hạn kích thước.</li>
  <li><strong>ViewModel</strong> — chi tiết về <code>viewModelScope</code>, <code>SavedStateHandle</code>, factory.</li>
  <li><strong>Compose State Management</strong> — <code>remember</code>, <code>rememberSaveable</code>, <code>mutableStateOf</code> và Saver.</li>
  <li><strong>Fragment State Changes</strong> — cách Fragment lưu/khôi phục state riêng.</li>
</ul>
    `
  },

  'activity-task-backstack': {
    title: 'Task and Back Stack',
    summary: 'Hiểu Task, Back Stack, 5 Launch Modes, Intent Flags, taskAffinity và cách áp dụng đúng cho Notification, Deep Link, Login/Logout và Single Activity (Compose/XML) trong project thực tế.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '30 phút',
    depth: 'standard',
    tags: ['android', 'activity', 'task', 'backstack', 'launch-mode', 'intent-flags', 'navigation', 'deeplink'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['activity-lifecycle', 'activity-state-changes'],
    related: ['intent-explicit', 'intent-filters', 'fragment-manager'],
    learningOutcomes: [
      'Giải thích được khái niệm Task và Back Stack cùng luồng push/pop của Activity.',
      'Phân biệt được 5 Launch Modes và chọn đúng cho từng tình huống thực tế.',
      'Áp dụng được Intent Flags để kiểm soát navigation (clear stack, fresh start, no history).',
      'Xử lý được Notification và Deep Link mở Activity với Back Stack đúng.',
      'Nhận diện được các lỗi navigation phổ biến như duplicate Activity và Back button sai hướng.'
    ],
    knowledgeGap: 'Không hiểu Task và Back Stack sẽ khiến ứng dụng có hành vi navigation bất thường: duplicate Activity khi nhấn notification, Back button không quay về đúng nơi, Activity chồng chất trong stack gây lãng phí bộ nhớ, và deep link phá vỡ trải nghiệm điều hướng.',
    updatedAt: '2026-08-03',
    readTime: '30 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Khi người dùng mở app, di chuyển giữa các màn hình, nhấn Back, mở notification hoặc click deep link — Android phải trả lời một loạt câu hỏi:</p>
<ul>
  <li>Activity nào đang hiển thị?</li>
  <li>Nhấn Back thì quay về đâu, hay thoát app?</li>
  <li>Mở lại một Activity đã tồn tại — reuse hay tạo instance mới?</li>
  <li>Notification / deep link có phá vỡ luồng điều hướng hiện tại không?</li>
  <li>Khi nào một Activity bị loại khỏi bộ nhớ?</li>
</ul>
<p>Nếu không hiểu cơ chế này, app sẽ gặp các lỗi điều hướng rất khó chịu:</p>
<ul>
  <li>Nhấn notification 3 lần → có 3 màn giống hệt nhau chồng lên nhau.</li>
  <li>Mở deep link → nhấn Back lại ra ngoài app thay vì về Home.</li>
  <li>Sau login, nhấn Back → quay lại màn Login cũ đáng lẽ phải biến mất.</li>
  <li>Activity chồng chất trong stack → tốn RAM, giảm hiệu năng.</li>
</ul>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Task và Back Stack chính là cơ chế hệ thống quản lý những câu hỏi này.</strong> Hiểu nó, bạn không cần "thử nghiệm" để biết Back sẽ đi về đâu.</div></div>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được khái niệm Task và Back Stack cùng luồng push/pop của Activity.</li>
  <li>Phân biệt được 5 Launch Modes và chọn đúng cho từng tình huống thực tế.</li>
  <li>Áp dụng được Intent Flags để kiểm soát navigation (clear stack, fresh start, no history).</li>
  <li>Xử lý được Notification và Deep Link mở Activity với Back Stack đúng.</li>
  <li>Nhận diện được các lỗi navigation phổ biến như duplicate Activity và Back button sai hướng.</li>
</ul>

<h2>Task và Back Stack là gì?</h2>
<p><strong>Task</strong> là một tập hợp các Activity mà người dùng tương tác khi thực hiện một công việc (như: duyệt sản phẩm → xem chi tiết → thanh toán). Các Activity trong Task được xếp theo cấu trúc <strong>stack</strong> (LIFO — Last In, First Out) gọi là <strong>Back Stack</strong>.</p>
<div class="mermaid">
flowchart TD
    subgraph Task["Task 1 — Back Stack (LIFO)"]
        direction TB
        C["ActivityC (top)"]
        B["ActivityB"]
        A["ActivityA (root)"]
        C --- B --- A
    end
    C -. "đang hiển thị" .-> U["Người dùng"]
</div>
<p>Các quy tắc cốt lõi:</p>
<ul>
  <li><strong>Mở Activity mới</strong> → push lên đỉnh stack.</li>
  <li><strong>Nhấn Back</strong> → pop Activity trên đỉnh và destroy nó, Activity phía dưới hiện lên.</li>
  <li><strong>Nhấn Home</strong> → Task được đưa về background nhưng <strong>không bị hủy</strong>.</li>
  <li><strong>Chọn lại app từ Recents</strong> → Task được đưa về foreground nguyên trạng.</li>
  <li>Mỗi Task xuất hiện như <strong>một entry riêng trong Recents</strong> (danh sách app gần đây).</li>
</ul>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Điểm dễ nhầm:</strong> Back Stack chỉ chứa <strong>Activity</strong>, không phải Fragment hay Screen. Trong app Single Activity, các màn hình là Fragment/Composable và có Back Stack <em>riêng</em> do thư viện Navigation quản lý — sẽ rõ ở ví dụ cuối bài.</div></div>

<h2>Cách hoạt động — Activity di chuyển trong Back Stack</h2>
<div class="mermaid">
sequenceDiagram
    participant U as User
    participant A as ActivityA
    participant B as ActivityB
    participant C as ActivityC

    U->>A: Mở app (push A)
    Note over A: Stack: [A]
    A->>B: startActivity(B)
    Note over B: Stack: [A, B]
    B->>C: startActivity(C)
    Note over C: Stack: [A, B, C]
    U->>C: Nhấn Back
    C->>C: finish() + destroy
    Note over C: Stack: [A, B]
    B-->>U: hiển thị lại
</div>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Hành động</th>
      <th style="padding:8px 12px;text-align:left;">Kết quả</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>startActivity()</code></td><td style="padding:8px 12px;">Push Activity mới lên top</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Back (nút hệ thống)</td><td style="padding:8px 12px;">Pop Activity top + destroy</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Back ở root Activity</td><td style="padding:8px 12px;">Task về background hoặc finish (tùy cấu hình)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Home</td><td style="padding:8px 12px;">Task về background, giữ nguyên stack</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Recents → chọn app</td><td style="padding:8px 12px;">Đưa Task về foreground</td></tr>
    <tr><td style="padding:8px 12px;">System kill process</td><td style="padding:8px 12px;">Activity bị destroy, <strong>metadata stack được giữ</strong> — mở lại sẽ phục hồi</td></tr>
  </tbody>
</table>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Điểm mấu chốt:</strong> Back Stack là dữ liệu hệ thống theo dõi được, còn Activity instance có thể bị destroy/recreate tùy bộ nhớ. Khi process bị kill, hệ thống vẫn nhớ <em>cấu trúc</em> của stack để khôi phục khi mở lại app.</div></div>

<h2>Cách hoạt động — 5 Launch Modes</h2>
<p>Launch Mode quyết định cách Activity mới <strong>được thêm vào Back Stack</strong>: tạo mới hay tái sử dụng instance đã tồn tại. Khai báo trong <code>AndroidManifest.xml</code>:</p>
<pre data-lang="xml"><code>&lt;activity
    android:name=".DetailActivity"
    android:launchMode="singleTop" /&gt;</code></pre>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Mode</th>
      <th style="padding:8px 12px;text-align:left;">Nhiều instance?</th>
      <th style="padding:8px 12px;text-align:left;">Task mới?</th>
      <th style="padding:8px 12px;text-align:left;">Clear stack?</th>
      <th style="padding:8px 12px;text-align:left;">onNewIntent?</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>standard</code></td><td style="padding:8px 12px;">✅</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Không</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>singleTop</code></td><td style="padding:8px 12px;">✅ (nếu không ở top)</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Khi ở top</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>singleTask</code></td><td style="padding:8px 12px;">❌</td><td style="padding:8px 12px;">Có thể</td><td style="padding:8px 12px;">✅</td><td style="padding:8px 12px;">Khi đã tồn tại</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>singleInstance</code></td><td style="padding:8px 12px;">❌</td><td style="padding:8px 12px;">✅ Luôn</td><td style="padding:8px 12px;">N/A</td><td style="padding:8px 12px;">Khi đã tồn tại</td></tr>
    <tr><td style="padding:8px 12px;"><code>singleInstancePerTask</code> (API 31+)</td><td style="padding:8px 12px;">1 per task</td><td style="padding:8px 12px;">✅</td><td style="padding:8px 12px;">✅</td><td style="padding:8px 12px;">Khi đã tồn tại</td></tr>
  </tbody>
</table>

<h3>standard (mặc định)</h3>
<p>Mỗi lần launch → <strong>tạo instance mới</strong> và push lên top. Lựa chọn an toàn nhất cho phần lớn màn hình.</p>
<pre data-lang="text"><code>Launch A → [A]
Launch A → [A, A]
Launch B → [A, A, B]</code></pre>

<h3>singleTop</h3>
<p>Nếu Activity <strong>đã ở top of stack</strong> → không tạo mới, chỉ gọi <code>onNewIntent()</code>. Nếu không ở top → tạo mới bình thường.</p>
<pre data-lang="text"><code>Stack: [A, B, C]
Launch C (singleTop) → [A, B, C]        ← C nhận onNewIntent()
Launch B (singleTop) → [A, B, C, B]     ← B không ở top → tạo mới</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">Dùng <code>singleTop</code> cho Search screen, màn nhận notification, deep link vào chính màn đang hiển thị — giúp tránh duplicate.</div></div>

<h3>singleTask</h3>
<p><strong>Một instance duy nhất trong hệ thống.</strong> Nếu Activity đã tồn tại trong một Task: đưa Task về foreground, <strong>xóa toàn bộ Activity phía trên</strong>, gọi <code>onNewIntent()</code>.</p>
<div class="mermaid">
flowchart LR
    subgraph Truoc["Trước"]
        direction TB
        S1["A (top)"]
        S2["B"]
        S3["C"]
        S1 --- S2 --- S3
    end
    Truoc -->|"launch A (singleTask)"| Sau
    subgraph Sau["Sau"]
        direction TB
        R1["A (nhận onNewIntent)"]
    end
</div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Cảnh báo:</strong> nếu Activity có <code>taskAffinity</code> khác mặc định, <code>singleTask</code> sẽ tạo <strong>Task mới</strong>. Hành vi phụ thuộc cả taskAffinity, không chỉ launchMode.</div></div>

<h3>singleInstance</h3>
<p>Giống <code>singleTask</code>, nhưng Activity <strong>chiếm riêng một Task</strong> — không Activity nào khác được vào Task đó.</p>
<pre data-lang="text"><code>Launch A (standard)       → Task 1: [A]
Launch B (singleInstance) → Task 2: [B]   ← Task riêng
Launch C (standard)       → Task 1: [A, C] ← C vào Task 1, không vào Task 2</code></pre>
<p><strong>Dùng khi:</strong> rất hiếm — app launcher, màn incoming call, hoặc màn cần cách ly hoàn toàn.</p>

<h3>singleInstancePerTask (API 31+)</h3>
<p>Cho phép <strong>một instance cho mỗi Task</strong> (thay vì một instance toàn hệ thống). Phù hợp với multi-window, mỗi window/task có instance riêng.</p>

<h3>Quy tắc chọn nhanh</h3>
<div class="mermaid">
flowchart TD
    Q{"Activity có cần<br/>nhận intent mới khi<br/>đang hiển thị?"} -->|Không| Std["standard"]
    Q -->|Có| Q2{"Có thể đã có nhiều<br/>instance trong stack?"}
    Q2 -->|Không| Top["singleTop"]
    Q2 -->|Có| Q3{"Cần làm gốc của Task?"}
    Q3 -->|Có| Task["singleTask"]
    Q3 -->|Không, cần cách ly| Inst["singleInstance"]
</div>

<h2>Cách hoạt động — Intent Flags</h2>
<p>Intent Flags kiểm soát hành vi navigation <strong>tại thời điểm launch</strong> — linh hoạt hơn launchMode cố định trong Manifest, vì quyết định nằm ở nơi gọi, không nằm trong cấu hình tĩnh.</p>

<h3>FLAG_ACTIVITY_NEW_TASK</h3>
<p>Launch Activity trong <strong>Task mới</strong> (hoặc đưa Task chứa Activity đã tồn tại về foreground).</p>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Bắt buộc</strong> khi <code>startActivity()</code> từ non-Activity context (Service, BroadcastReceiver, Application) — những context này không có Task để push Activity vào.</div></div>
<pre data-lang="kotlin"><code>val intent = Intent(context, MainActivity::class.java).apply {
    flags = Intent.FLAG_ACTIVITY_NEW_TASK
}
context.startActivity(intent)</code></pre>

<h3>FLAG_ACTIVITY_CLEAR_TOP</h3>
<p>Nếu Activity đã tồn tại trong stack → <strong>destroy tất cả Activity phía trên</strong> nó, rồi đưa Activity đó lên top.</p>
<pre data-lang="kotlin"><code>// Stack hiện tại: [A, B, C, D]
val intent = Intent(this, ActivityA::class.java).apply {
    flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
}
startActivity(intent)
// Kết quả: [A]  ← B, C, D bị destroy</code></pre>
<p>Mặc định Activity A cũng bị destroy rồi tạo lại. Kết hợp <code>FLAG_ACTIVITY_SINGLE_TOP</code> để <strong>tái sử dụng instance</strong> và nhận <code>onNewIntent()</code>:</p>
<pre data-lang="kotlin"><code>flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
// Stack: [A] — A nhận onNewIntent(), không bị recreate</code></pre>

<h3>FLAG_ACTIVITY_CLEAR_TASK</h3>
<p><strong>Xóa toàn bộ Task</strong> trước khi launch Activity mới. Phải kết hợp với <code>FLAG_ACTIVITY_NEW_TASK</code>.</p>
<pre data-lang="kotlin"><code>// Sau khi login thành công — xóa toàn bộ login stack
val intent = Intent(this, HomeActivity::class.java).apply {
    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
}
startActivity(intent)</code></pre>

<h3>FLAG_ACTIVITY_SINGLE_TOP</h3>
<p>Tương đương runtime của <code>launchMode="singleTop"</code>.</p>

<h3>FLAG_ACTIVITY_NO_HISTORY</h3>
<p>Activity <strong>không được lưu vào Back Stack</strong> — khi rời đi, Activity bị destroy ngay.</p>
<pre data-lang="kotlin"><code>// Splash screen — user không thể Back vào
val intent = Intent(this, SplashActivity::class.java).apply {
    flags = Intent.FLAG_ACTIVITY_NO_HISTORY
}</code></pre>

<h3>Bảng kết hợp flags thường dùng</h3>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Pattern</th>
      <th style="padding:8px 12px;text-align:left;">Flags</th>
      <th style="padding:8px 12px;text-align:left;">Use case</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Clear to root</td><td style="padding:8px 12px;"><code>CLEAR_TOP or SINGLE_TOP</code></td><td style="padding:8px 12px;">Quay về Home, xóa màn trung gian</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Fresh start</td><td style="padding:8px 12px;"><code>NEW_TASK or CLEAR_TASK</code></td><td style="padding:8px 12px;">Sau login/logout</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">No back</td><td style="padding:8px 12px;"><code>NO_HISTORY</code></td><td style="padding:8px 12px;">Splash, màn xác nhận thanh toán</td></tr>
    <tr><td style="padding:8px 12px;">Từ Service</td><td style="padding:8px 12px;"><code>NEW_TASK</code></td><td style="padding:8px 12px;">Notification click (khi không dùng TaskStackBuilder)</td></tr>
  </tbody>
</table>

<h2>Cách hoạt động — taskAffinity</h2>
<p><code>taskAffinity</code> quyết định Activity "thuộc về" Task có tên gì. Mặc định = <code>applicationId</code> — mọi Activity của app nằm cùng một Task.</p>
<pre data-lang="xml"><code>&lt;activity
    android:name=".settings.SettingsActivity"
    android:taskAffinity="com.example.app.settings"
    android:launchMode="singleTask" /&gt;</code></pre>
<p>Khi <code>taskAffinity</code> khác mặc định <strong>và</strong> kết hợp <code>singleTask</code>/<code>FLAG_ACTIVITY_NEW_TASK</code>, Activity tạo <strong>Task riêng</strong> → xuất hiện thành <strong>entry riêng trong Recents</strong>.</p>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Dùng khi:</strong> app có luồng độc lập muốn hiển thị riêng trong Recents (ví dụ: widget điều khiển, màn settings nổi). Đây là trường hợp hiếm — đa số app chỉ cần một Task.</div></div>

<h2>Ví dụ thực tế — từng bước tích hợp</h2>

<h3>Bước 1: Notification mở Activity với đúng Back Stack</h3>
<p><strong>Vấn đề:</strong> user nhấn notification → mở <code>DetailActivity</code> trực tiếp. Nhấn Back → thoát hẳn app, không quay về Home.</p>
<p><strong>Giải pháp:</strong> dùng <code>TaskStackBuilder</code> để tạo <strong>synthetic back stack</strong> — nói với hệ thống rằng <code>DetailActivity</code> nằm trên <code>MainActivity</code>, dù Main chưa hề được mở.</p>
<pre data-lang="kotlin"><code>val resultIntent = Intent(context, DetailActivity::class.java).apply {
    putExtra("item_id", itemId)
}

val pendingIntent = TaskStackBuilder.create(context).apply {
    addParentStack(DetailActivity::class.java)  // tự thêm MainActivity (parent)
    addNextIntent(resultIntent)                 // thêm DetailActivity lên trên
}.getPendingIntent(
    0,
    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
)

NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_notification)
    .setContentTitle("Có đơn hàng mới")
    .setContentIntent(pendingIntent)
    .setAutoCancel(true)
    .build()</code></pre>
<div class="mermaid">
sequenceDiagram
    participant Notif as Notification
    participant TSB as TaskStackBuilder
    participant Main as MainActivity
    participant Detail as DetailActivity

    Notif->>TSB: addParentStack + addNextIntent
    TSB-->>Notif: PendingIntent chứa stack [Main, Detail]
    Notif->>Main: user click → mở Task mới
    Main->>Detail: push Detail lên trên
    Note over Main,Detail: Back Stack: [Main, Detail]
    Detail->>Main: Back → về Main (không thoát app)
</div>
<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><code>android:parentActivityName</code> khai báo trong Manifest là thứ <code>addParentStack</code> dựa vào để biết parent của Activity.</div></div>

<h3>Bước 2: Deep Link với Navigation Component</h3>
<p><strong>Vấn đề:</strong> deep link (<code>https://shop.com/product/123</code>) thường tạo Task mới với stack chỉ có một Activity → Back ra ngoài app.</p>
<p><strong>Giải pháp:</strong> khai báo deep link trong Navigation Graph — Navigation <strong>tự dựng back stack</strong> về start destination trước khi đi đến đích.</p>
<pre data-lang="xml"><code>&lt;!-- navigation/nav_graph.xml --&gt;
&lt;navigation android:id="@+id/nav_graph" app:startDestination="@id/homeScreen"&gt;
    &lt;fragment
        android:id="@+id/productDetailScreen"
        android:name="com.example.shop.ProductDetailFragment"&gt;
        &lt;deepLink
            app:uri="https://shop.com/product/{productId}" /&gt;
    &lt;/fragment&gt;
&lt;/navigation&gt;</code></pre>
<pre data-lang="xml"><code>&lt;!-- Manifest: cho MainActivity (singleTask) nhận deep link --&gt;
&lt;activity
    android:name=".MainActivity"
    android:launchMode="singleTask"&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="android.intent.action.VIEW" /&gt;
        &lt;category android:name="android.intent.category.DEFAULT" /&gt;
        &lt;category android:name="android.intent.category.BROWSABLE" /&gt;
        &lt;data android:scheme="https" android:host="shop.com" /&gt;
    &lt;/intent-filter&gt;
&lt;/activity&gt;</code></pre>
<div class="mermaid">
sequenceDiagram
    participant User as User
    participant Act as MainActivity
    participant Nav as NavController
    participant Home as HomeScreen
    participant Detail as ProductDetail

    User->>Act: click https://shop.com/product/123
    Act->>Nav: handleDeepLink (tự gọi trên start destination)
    Nav->>Home: dựng back stack về start destination
    Home->>Detail: navigate đến đích
    Note over Home,Detail: Back Stack ảo: [Home, ProductDetail]
    Detail->>Home: Back → về Home (không thoát app)
</div>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Mẹo thực tế:</strong> với App Links (verified), dùng <code>android:autoVerify="true"</code> trong intent-filter để mở trực tiếp bằng deep link; với deep link không verified, user được hỏi chọn app mở.</div></div>

<h3>Bước 3: Login / Logout — Fresh Start</h3>
<p><strong>Vấn đề:</strong> sau login thành công, nhấn Back phải thoát app, <strong>không được quay lại màn Login</strong>.</p>
<pre data-lang="kotlin"><code>// LoginActivity → HomeActivity
fun onLoginSuccess() {
    val intent = Intent(this, HomeActivity::class.java).apply {
        flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
    }
    startActivity(intent)
    // Không cần finish() — CLEAR_TASK đã xóa toàn bộ stack cũ
}</code></pre>
<div class="mermaid">
sequenceDiagram
    participant Login as LoginActivity
    participant Home as HomeActivity
    participant Stack as Back Stack

    Note over Stack: [Login]
    Login->>Home: NEW_TASK | CLEAR_TASK
    Home->>Stack: CLEAR_TASK xóa [Login]
    Home->>Stack: push Home → [Home]
    Note over Stack: [Home] — Back → thoát app, không thấy Login
</div>

<h3>Bước 4: Single Activity + Compose/XML — Back Stack ảo</h3>
<p>Trong app Single Activity, <strong>Back Stack của hệ thống chỉ có 1 Activity</strong>. Navigation giữ <strong>Back Stack ảo</strong> của riêng nó bên trong <code>NavHostFragment</code>.</p>
<div class="mermaid">
flowchart TD
    subgraph System["Back Stack hệ thống"]
        Act["MainActivity (duy nhất)"]
    end
    subgraph Nav["Back Stack ảo trong NavHost"]
        direction TB
        N1["HomeScreen"]
        N2["ProductDetail"]
        N3["Checkout"]
        N1 --- N2 --- N3
    end
    Act -. "chứa" .-> Nav
</div>
<p>Vì vậy trong app Single Activity:</p>
<ul>
  <li><strong>Không cần (và không nên) đụng tới launchMode/intent flags</strong> cho từng màn hình — Navigation lo toàn bộ.</li>
  <li>Nhấn Back hệ thống → Navigation pop screen trong NavHost; khi NavHost rỗng → hệ thống nhận lại Back và quyết định thoát app.</li>
  <li><strong>Ngoại lệ khi vẫn cần Task &amp; Back Stack:</strong> mở app từ Notification, deep link, hoặc mở Activity khác (dùng <code>singleTask</code> cho MainActivity) — chính là các Bước 1–3 ở trên.</li>
</ul>
<pre data-lang="kotlin"><code>// Compose — Navigation tự quản lý back stack ảo
@Composable
fun AppNavHost() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "home") {
        composable("home") { HomeScreen(onOpenDetail = { id -&gt;
            navController.navigate("product/$id")
        }) }
        composable(
            "product/{id}",
            deepLinks = listOf(
                navDeepLink { uriPattern = "https://shop.com/product/{id}" }
            )
        ) { ProductDetailScreen() }
    }
}

// Compose: Back → pop màn hình, hoặc tự quyết định khi không còn màn nào
BackHandler(enabled = navController.previousBackStackEntry != null) {
    navController.popBackStack()
}</code></pre>

<h2>Khi nào nên dùng — Khi nào không nên dùng</h2>

<h3>Nên dùng</h3>
<ul>
  <li><strong><code>standard</code></strong> — mặc định cho hầu hết màn hình; mỗi navigation context độc lập.</li>
  <li><strong><code>singleTop</code></strong> — màn nhận notification/deep link khi có thể đã mở (Search, Detail).</li>
  <li><strong><code>singleTask</code></strong> — Main/Home làm gốc Task; kết hợp deep link vào app.</li>
  <li><strong><code>CLEAR_TASK | NEW_TASK</code></strong> — sau login/logout để reset toàn bộ stack.</li>
  <li><strong><code>TaskStackBuilder</code> / Navigation deep link</strong> — mọi thứ mở app từ ngoài (notification, link).</li>
  <li><strong>Single Activity + Navigation</strong> — chuẩn hiện đại cho toàn bộ luồng trong app.</li>
</ul>

<h3>Không nên dùng</h3>
<ul>
  <li><strong><code>singleInstance</code></strong> — hầu như không cần; gây quản lý Task phức tạp, khó dự đoán.</li>
  <li><strong><code>singleTask</code> cho từng màn hình con</strong> — chỉ dùng cho gốc Task, không dùng cho màn detail.</li>
  <li><strong>Intent flags thay cho Navigation</strong> trong app Single Activity — trộn hai hệ thống back stack dễ tạo trạng thái khó debug.</li>
  <li><strong><code>FLAG_ACTIVITY_NEW_TASK</code> khi đã có Activity context</strong> — không cần thiết, chỉ bắt buộc từ non-Activity context.</li>
</ul>

<h2>Sai lầm thường gặp</h2>

<h3>1. Lạm dụng singleTask / singleInstance</h3>
<p>90% trường hợp <code>standard</code> là đủ. <code>singleTask</code>/<code>singleInstance</code> làm hành vi navigation khó đoán (Task chuyển foreground bất ngờ, clear stack không mong muốn). Dùng chúng chỉ khi thật sự cần "một instance duy nhất làm gốc".</p>

<h3>2. Không xử lý onNewIntent</h3>
<p>Khi Activity nhận intent mới qua <code>singleTop</code>/<code>singleTask</code>, nếu không cập nhật UI trong <code>onNewIntent()</code>, màn hình vẫn hiển thị dữ liệu cũ.</p>
<pre data-lang="kotlin"><code>// ❌ Thiếu xử lý — intent mới bị bỏ qua
override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
}

// ✅ Đúng — cập nhật intent và load lại dữ liệu
override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    setIntent(intent)  // để getIntent() trả đúng intent mới
    val itemId = intent.getLongExtra("item_id", -1L)
    loadItem(itemId)
}</code></pre>

<h3>3. Không tạo Back Stack cho notification / deep link</h3>
<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body">User mở notification → <code>DetailActivity</code>, nhấn Back → thoát app thay vì về Home. Luôn dùng <code>TaskStackBuilder</code> (XML) hoặc để Navigation dựng back stack (Compose/XML + Navigation).</div></div>

<h3>4. Nhầm lẫn giữa finish() và Back</h3>
<p><code>finish()</code> destroy Activity hiện tại và quay về Activity dưới trong stack — giống Back. Nhưng nếu Activity là <strong>root</strong> của Task, finish → Task bị kết thúc. Dùng <code>CLEAR_TASK</code> khi cần xóa nhiều màn cùng lúc.</p>

<h3>5. Nhầm lẫn Back Stack của hệ thống với Back Stack của Navigation</h3>
<p>Khi đã chuyển sang Single Activity + Navigation, đừng thêm launchMode vào từng Fragment/composable — hai hệ thống back stack hoạt động khác nhau, trộn lẫn sẽ rất khó debug.</p>

<h2>Lịch sử phát triển</h2>
<ul>
  <li><strong>Android 1.0</strong>: khái niệm Task &amp; Back Stack xuất hiện cùng nền tảng; launchMode <code>standard</code>, <code>singleTop</code>, <code>singleTask</code>, <code>singleInstance</code>.</li>
  <li><strong>Android 1.6</strong>: <code>android:taskAffinity</code>, <code>allowTaskReparenting</code> bổ sung để kiểm soát việc chuyển Task.</li>
  <li><strong>Android 5.0 (API 21)</strong>: Recents chuyển sang <strong>Document-centric</strong> — mỗi Task là một document riêng; <code>FLAG_ACTIVITY_NEW_DOCUMENT</code> giới thiệu.</li>
  <li><strong>Android 12 (API 31)</strong>: thêm <code>singleInstancePerTask</code>; tăng cường kiểm soát việc tạo Task từ deep link.</li>
  <li><strong>Hiện tại</strong>: Navigation Component (Compose/XML) trở thành chuẩn, dịch chuyển phần lớn quản lý back stack từ Activity sang thư viện.</li>
</ul>

<h2>Kết nối hệ thống</h2>
<ul>
  <li><strong>Prerequisites</strong>: <code>Activity Lifecycle</code> — hiểu callback khi Activity push/pop. <code>Activity State Changes</code> — cách state được lưu/khôi phục khi Activity bị destroy.</li>
  <li><strong>Related Topics</strong>: <code>Explicit Intents</code> — startActivity mở Activity trong Task. <code>Intent Filters</code> — cơ chế hệ thống chọn Activity nhận intent (deep link). <code>FragmentManager</code> — back stack của Fragment, khái niệm tương tự ở mức Fragment.</li>
  <li><strong>Downstream Topics</strong>: <code>FragmentManager</code> — quản lý back stack ảo trong single Activity.</li>
</ul>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/guide/components/activities/tasks-and-back-stack" target="_blank" rel="noopener">Tasks and the back stack — Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/components/activities/launch-mode" target="_blank" rel="noopener">Activity launch modes — Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/navigation" target="_blank" rel="noopener">Navigation Component — Android Developers</a></li>
  <li><a href="https://developer.android.com/training/app-links/deep-linking" target="_blank" rel="noopener">Create deep links to app content — Android Developers</a></li>
  <li><a href="https://developer.android.com/reference/android/app/TaskStackBuilder" target="_blank" rel="noopener">TaskStackBuilder — Android Developers Reference</a></li>
  <li><a href="https://developer.android.com/reference/android/app/PendingIntent" target="_blank" rel="noopener">PendingIntent — Android Developers Reference</a></li>
  <li><a href="https://developer.android.com/guide/components/recents" target="_blank" rel="noopener">Recents &amp; Documents — Android Developers</a></li>
</ul>
    `
  },

  'activity-parcelables-bundle': {
    title: 'Parcelables & Bundle',
    summary: 'Hiểu bản chất Bundle và Parcelable trong Android, vì sao Android dùng chúng để truyền dữ liệu giữa các component, khi nào nên dùng thay vì SharedViewModel, cách viết Parcelable thủ công và @Parcelize, giới hạn Binder transaction buffer và cách tránh TransactionTooLargeException.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '25 phút',
    depth: 'deep-dive',
    tags: ['android', 'parcelable', 'serializable', 'bundle', 'intent', 'ipc', 'binder', 'parcelize', 'savedstatehandle', 'viewmodel'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['activity-lifecycle', 'activity-state-changes', 'activity-task-backstack'],
    related: ['intent-explicit', 'intent-push-data', 'activity-state-changes'],
    learningOutcomes: [
      'Giải thích được bản chất Bundle và vì sao Android buộc phải serialize dữ liệu khi truyền giữa các component.',
      'Quyết định được khi nào dùng Intent extras/Bundle và khi nào dùng SharedViewModel.',
      'Viết được Parcelable thủ công và sử dụng @Parcelize để truyền object.',
      'Phân biệt được Parcelable và Serializable về cơ chế và hiệu năng.',
      'Xác định được giới hạn Binder transaction buffer và cách fix TransactionTooLargeException.',
      'Triển khai đúng luồng truyền dữ liệu trong app MVVM thực tế.'
    ],
    knowledgeGap: 'Không hiểu bản chất Bundle sẽ khiến developer truyền dữ liệu sai cách: dùng Serializable gây chậm, truyền object quá lớn gây TransactionTooLargeException crash ở production, hoặc dùng Bundle cho những thứ lẽ ra phải nằm trong SharedViewModel — vừa lãng phí vừa khó bảo trì.',
    updatedAt: '2026-08-03',
    readTime: '25 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Bạn có một Activity A cần đưa dữ liệu cho Activity B. Bạn viết:</p>
<pre data-lang="kotlin"><code>startActivity(Intent(this, DetailActivity::class.java).apply {
    putExtra("product_id", productId)
})</code></pre>
<p>Nó chạy. Nhưng nếu bạn đưa nguyên cả object <code>Product</code> thay vì chỉ <code>product_id</code>, bạn bắt đầu gặp:</p>
<ul>
  <li><strong>TransactionTooLargeException</strong> — app crash ngay lúc <code>startActivity()</code> hoặc lúc <code>onSaveInstanceState()</code>.</li>
  <li><strong>Chậm khó hiểu</strong> — code vẫn chạy nhưng Activity mới mở lâu, máy giật.</li>
  <li><strong>BadParcelableException / ClassNotFoundException</strong> — object không serialize được hoặc thay đổi sau khi cài đặt.</li>
  <li><strong>Data mất khi xoay màn hình / process bị kill</strong> — lưu state sai chỗ.</li>
</ul>
<p>Câu hỏi cốt lõi của bài này không phải "dùng hàm nào", mà là:</p>
<blockquote>Vì sao Android buộc phải serialize dữ liệu khi truyền giữa các component? Khi nào Bundle là lựa chọn đúng, và khi nào SharedViewModel mới là câu trả lời?</blockquote>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được bản chất Bundle và cơ chế Binder IPC.</li>
  <li>Quyết định được Bundle vs SharedViewModel theo đúng tình huống.</li>
  <li>Viết được Parcelable thủ công và dùng <code>@Parcelize</code>.</li>
  <li>Xác định và fix được TransactionTooLargeException.</li>
  <li>Áp dụng đúng luồng truyền dữ liệu trong app MVVM.</li>
</ul>

<h2>Bundle là gì? — Bản chất</h2>
<p><strong>Bundle</strong> là một container key-value (<code>Map</code>), có khả năng tự <strong>serialize</strong> (đóng gói thành byte) toàn bộ nội dung của nó sang dạng <strong>Parcel</strong> để vượt qua biên giới giữa các thành phần.</p>
<p>Hai tính chất quyết định mọi thứ còn lại:</p>
<ul>
  <li><strong>Nó là bản sao (copy), không phải tham chiếu.</strong> Bundle serialize dữ liệu thành byte rồi mới gửi đi. Activity B nhận một bản dữ liệu <strong>độc lập</strong> — sửa trong B không ảnh hưởng A, và ngược lại.</li>
  <li><strong>Nó chỉ chấp nhận những kiểu đã được đăng ký.</strong> Bạn không thể <code>putExtra()</code> một object bất kỳ — object đó phải implement <code>Parcelable</code> (hoặc <code>Serializable</code>).</li>
</ul>
<p>Đây là lý do Android không cho truyền object trực tiếp như gọi hàm trong cùng process: nơi nhận dữ liệu <strong>không đảm bảo nằm cùng process</strong> với nơi gửi.</p>

<h3>Nơi Bundle xuất hiện trong thực tế</h3>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Vị trí</th>
      <th style="padding:8px 12px;text-align:left;">Vai trò</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>Intent.putExtra()</code></td><td style="padding:8px 12px;">Truyền tham số khi <code>startActivity()</code> / <code>startService()</code> / gửi Broadcast</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>Fragment.arguments</code></td><td style="padding:8px 12px;">Truyền tham số khi tạo Fragment (bắt buộc qua Bundle, không có constructor kèm data)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>onSaveInstanceState(outState)</code></td><td style="padding:8px 12px;">Lưu UI state để khôi phục khi Activity bị destroy</td></tr>
    <tr><td style="padding:8px 12px;"><code>SavedStateHandle</code></td><td style="padding:8px 12px;">ViewModel lưu state, sống sót qua process death</td></tr>
  </tbody>
</table>

<h2>Vì sao Android dùng Bundle để truyền dữ liệu?</h2>
<p>Câu trả lời nằm ở cách các component giao tiếp với nhau: <strong>qua Binder IPC</strong>.</p>
<p>Khi bạn gọi <code>startActivity()</code>, Activity A không tự gọi hàm của Activity B. Nó gửi yêu cầu cho <strong><code>system_server</code></strong> (một process riêng của hệ điều hành), và <code>system_server</code> quyết định khởi chạy Activity B trong app. Trong chuyến đi A → system_server → B này, dữ liệu phải được <strong>đóng gói thành byte</strong> để đi qua biên giới process:</p>
<div class="mermaid">
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
</div>
<p>Chính vì phải đi qua biên giới này, dữ liệu:</p>
<ul>
  <li><strong>Phải được serialize</strong> — nên phải là kiểu đã biết cách serialize (<code>Parcelable</code>/<code>Serializable</code>).</li>
  <li><strong>Có giới hạn kích thước</strong> — vì phải ghi vào buffer có giới hạn (~1MB cho toàn process).</li>
  <li><strong>Là bản sao</strong> — byte được truyền đi, không phải reference.</li>
</ul>
<p>Nếu Android đơn giản truyền reference như lời gọi hàm thông thường, nó sẽ phá vỡ mô hình "mỗi app là một process" — nền tảng bảo mật và ổn định của Android.</p>

<h3>Ưu điểm của Bundle so với cách truyền trực tiếp</h3>
<ul>
  <li><strong>Hoạt động cả khi 2 component khác process</strong> (2 app, app ↔ system) — vốn là thiết kế mặc định của Android.</li>
  <li><strong>Không tạo reference ngầm</strong> — Bundle không giữ Activity cũ trong bộ nhớ, tránh memory leak.</li>
  <li><strong>Sống sót qua process death</strong> — dữ liệu trong Bundle có thể được hệ thống lưu lại và trao lại khi Activity được tạo lại.</li>
</ul>

<h2>Bundle vs SharedViewModel — Khi nào dùng cái nào</h2>
<p>Đây là lựa chọn kiến trúc quan trọng nhất khi truyền dữ liệu trong app MVVM. Không có "cái nào luôn đúng" — phụ thuộc quan hệ giữa 2 màn hình.</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tiêu chí</th>
      <th style="padding:8px 12px;text-align:left;">Bundle / Intent extras</th>
      <th style="padding:8px 12px;text-align:left;">SharedViewModel</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Dữ liệu</td><td style="padding:8px 12px;">Bản sao (copy)</td><td style="padding:8px 12px;">Tham chiếu (shared instance)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Vòng đời</td><td style="padding:8px 12px;">Theo Activity mục tiêu</td><td style="padding:8px 12px;">Theo scope (Activity / Fragment)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Process death</td><td style="padding:8px 12px;">Sống sót (nếu dùng đúng cách)</td><td style="padding:8px 12px;">Mất (trừ khi SavedStateHandle)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Kích thước</td><td style="padding:8px 12px;">Giới hạn ~1MB</td><td style="padding:8px 12px;">Không giới hạn theo bundle (nhưng là bộ nhớ RAM)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Phụ thuộc</td><td style="padding:8px 12px;">Component không cần biết nhau về lifecycle</td><td style="padding:8px 12px;">Phải cùng một Activity/Fragment scope</td></tr>
    <tr><td style="padding:8px 12px;">Quay lại màn hình cũ</td><td style="padding:8px 12px;">State cũ giữ nguyên qua backstack</td><td style="padding:8px 12px;">Shared VM vẫn giữ state</td></tr>
  </tbody>
</table>

<h3>Khi nào dùng Bundle (Intent extras)</h3>
<ul>
  <li><strong>Màn hình B độc lập, không cần đồng bộ liên tục với A.</strong> Ví dụ: mở màn hình chi tiết sản phẩm từ danh sách.</li>
  <li><strong>Dữ liệu là định danh (ID), query string, flag.</strong> Nhỏ, đơn giản, không cần sống lâu.</li>
  <li><strong>Component có thể khác process</strong> (gọi từ Notification, Shortcut, Deep Link) — lúc này SharedViewModel không tồn tại.</li>
</ul>

<h3>Khi nào dùng SharedViewModel</h3>
<ul>
  <li><strong>Hai màn hình cùng chia sẻ một nguồn dữ liệu "sống"</strong> (đang load, đang cập nhật), ví dụ: màn hình danh sách → màn hình lọc cùng đọc <code>ProductFilterState</code> trong một <code>ProductListViewModel</code> scoped theo Activity.</li>
  <li><strong>Dữ liệu lớn</strong> (list, bitmap, kết quả xử lý) — đưa vào Bundle là mời <code>TransactionTooLargeException</code>.</li>
  <li><strong>Cần đồng bộ hai chiều</strong> — màn hình B đổi dữ liệu, màn hình A phản ứng ngay khi quay lại.</li>
  <li><strong>Fragment ↔ Fragment trong cùng Activity</strong> — dùng ViewModel scoped theo Activity là pattern chuẩn, không nên đẩy qua Bundle.</li>
</ul>

<h3>Quyết định nhanh trong 30 giây</h3>
<pre data-lang="text"><code>Dữ liệu nhỏ (ID/flag/query) và B độc lập với A?
  └── ✅ Bundle / Intent extras + @Parcelize

Dữ liệu lớn, cần đồng bộ, hoặc A và B là Fragment cùng Activity?
  └── ✅ SharedViewModel

Cần sống sót khi process bị kill?
  └── ✅ Bundle (via SavedStateHandle hoặc onSaveInstanceState)</code></pre>

<h2>Bundle hỗ trợ những kiểu dữ liệu nào</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Nhóm</th>
      <th style="padding:8px 12px;text-align:left;">Method tương ứng</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Primitive</td><td style="padding:8px 12px;"><code>putInt</code>, <code>putLong</code>, <code>putBoolean</code>, <code>putFloat</code>, <code>putDouble</code>, <code>putByte</code>, <code>putChar</code>, <code>putShort</code></td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">String</td><td style="padding:8px 12px;"><code>putString</code>, <code>putCharSequence</code></td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Array primitive</td><td style="padding:8px 12px;"><code>putIntArray</code>, <code>putStringArray</code>, <code>putLongArray</code>, <code>putParcelableArray</code>...</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">List</td><td style="padding:8px 12px;"><code>putStringArrayList</code>, <code>putIntegerArrayList</code>, <code>putParcelableArrayList</code></td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Object</td><td style="padding:8px 12px;"><code>putParcelable</code>, <code>putSerializable</code></td></tr>
    <tr><td style="padding:8px 12px;">Bundle</td><td style="padding:8px 12px;"><code>putBundle</code> (bundle lồng nhau)</td></tr>
  </tbody>
</table>
<p><strong>Điểm mấu chốt:</strong> để đưa một object vào Bundle, object đó <strong>bắt buộc</strong> phải implement <code>Parcelable</code>. Đây chính là lý do Topic này có hai nửa: <strong>Bundle</strong> (container) và <strong>Parcelable</strong> (khả năng đóng gói của object).</p>

<h2>Parcelable là gì?</h2>
<p><strong>Parcelable</strong> là interface do Android thiết kế để một object tự biết cách "đóng gói" mình thành dữ liệu nhị phân (Parcel) và "mở gói" ngược lại. Nó tối ưu cho Binder IPC — không dùng reflection, không sinh object trung gian.</p>
<p>Hai khái niệm cần phân biệt:</p>
<ul>
  <li><strong><code>Parcel</code></strong> — vùng nhớ nhị phân chứa dữ liệu đã serialize. Là phương tiện vận chuyển.</li>
  <li><strong><code>Parcelable</code></strong> — interface mà object implement để có khả năng tự viết/đọc vào/ra <code>Parcel</code>.</li>
</ul>

<h3>Viết Parcelable thủ công (để hiểu bản chất)</h3>
<p>Một class <code>Parcelable</code> cần 3 phần: <code>writeToParcel()</code> (đóng gói), <code>describeContents()</code> (mô tả content), và <code>CREATOR</code> (mở gói):</p>
<pre data-lang="kotlin"><code>class Product(
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
        val CREATOR = object : Parcelable.Creator&lt;Product&gt; {
            override fun createFromParcel(parcel: Parcel): Product =
                Product(
                    id = parcel.readLong(),
                    name = parcel.readString() ?: "",
                    price = parcel.readDouble()
                )

            override fun newArray(size: Int): Array&lt;Product?&gt; = arrayOfNulls(size)
        }
    }
}</code></pre>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Quy tắc vàng:</strong> thứ tự trong <code>writeToParcel</code> <strong>phải khớp tuyệt đối</strong> với thứ tự trong <code>createFromParcel</code>. Đây là nguồn gốc của rất nhiều bug khó tìm khi sửa model — bạn thêm một field nhưng quên sửa cả hai chỗ.</div></div>
<p>Nhược điểm rõ ràng: mỗi class phải viết ~20 dòng boilerplate, và dễ sai khi model thay đổi. Giải pháp cho Kotlin là <code>@Parcelize</code>.</p>

<h3>@Parcelize — cách viết Parcelable hiện đại</h3>
<pre data-lang="kotlin"><code>// build.gradle.kts
plugins {
    id("kotlin-parcelize")
}</code></pre>
<pre data-lang="kotlin"><code>@Parcelize
data class Product(
    val id: Long,
    val name: String,
    val price: Double,
    val tags: List&lt;String&gt;
) : Parcelable</code></pre>
<p>Compiler sinh toàn bộ <code>writeToParcel</code> và <code>CREATOR</code> lúc build — không reflection, hiệu năng tương đương viết tay, nhưng không còn lỗi lệch thứ tự.</p>
<p><code>@Parcelize</code> tự xử lý được: primitive, <code>String</code>, <code>Enum</code>, các class <code>Parcelable</code> lồng nhau, <code>List</code>/<code>Set</code>/<code>Map</code>/<code>Array</code> (với element là kiểu hỗ trợ).</p>
<p><strong>Khi cần kiểu không hỗ trợ</strong> (ví dụ <code>java.util.Date</code>), dùng <code>@TypeParceler</code>:</p>
<pre data-lang="kotlin"><code>@Parcelize
data class Event(
    val name: String,
    @TypeParceler&lt;Date, DateParceler&gt;()
    val date: Date
) : Parcelable

object DateParceler : Parceler&lt;Date&gt; {
    override fun create(parcel: Parcel): Date = Date(parcel.readLong())
    override fun Date.write(parcel: Parcel, flags: Int) {
        parcel.writeLong(time)
    }
}</code></pre>

<h2>Parcelable vs Serializable</h2>
<p><code>Serializable</code> là interface marker của Java — bạn chỉ cần <code>implements Serializable</code>, còn lại JVM dùng <strong>reflection</strong> để tự động quét toàn bộ field và serialize. Nghe có vẻ tiện, nhưng trên Android nó đắt:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tiêu chí</th>
      <th style="padding:8px 12px;text-align:left;">Serializable (Java)</th>
      <th style="padding:8px 12px;text-align:left;">Parcelable (Android)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Cơ chế</td><td style="padding:8px 12px;">Reflection (runtime)</td><td style="padding:8px 12px;">Manual code / sinh lúc compile</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Tốc độ</td><td style="padding:8px 12px;">Chậm (~10x so với Parcelable)</td><td style="padding:8px 12px;">Nhanh</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Object tạm</td><td style="padding:8px 12px;">Tạo nhiều object trung gian → GC pressure</td><td style="padding:8px 12px;">Không</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Boilerplate</td><td style="padding:8px 12px;">Không cần</td><td style="padding:8px 12px;">Nhiều nếu viết tay (nhưng @Parcelize xử lý)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Mục đích</td><td style="padding:8px 12px;">Serialize để lưu trữ (disk, network)</td><td style="padding:8px 12px;">Binder IPC giữa components</td></tr>
    <tr><td style="padding:8px 12px;">Kết quả serialize</td><td style="padding:8px 12px;">Có versioning, nhiều metadata</td><td style="padding:8px 12px;">Nhị phân gọn, không versioning</td></tr>
  </tbody>
</table>
<pre data-lang="kotlin"><code>// ❌ Đừng dùng Serializable để truyền giữa component — chậm, tạo GC pressure
data class User(val name: String) : Serializable

// ✅ Dùng Parcelable — nhanh, tối ưu cho IPC
@Parcelize
data class User(val name: String) : Parcelable</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Vậy Serializable dùng khi nào?</strong> Khi cần lưu trữ lâu dài (ghi vào file, gửi qua mạng, cache) — ví dụ object đi qua Retrofit/Gson thường serialize bằng JSON, không phải Bundle. Trong truyền nội bộ Android, Parcelable luôn thắng.</div></div>

<h2>Giới hạn kích thước — Binder Transaction Buffer</h2>
<p>Đây là giới hạn mà đa số crash ngoài đời thực đến từ. Binder transaction buffer có <strong>giới hạn khoảng 1MB cho toàn bộ process</strong> — không phải 1MB cho mỗi lần truyền.</p>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Intent extras, <code>savedInstanceState</code>, Fragment arguments, và <strong>mọi IPC khác trong cùng process đều chia sẻ buffer này</strong>. Màn hình đang giữ Bundle lớn trong <code>savedInstanceState</code> thì ngay cả <code>startActivity()</code> với dữ liệu nhỏ cũng có thể vượt ngưỡng. Crash thường bùng ra <strong>không phải lúc bạn <code>putExtra()</code></strong>, mà lúc một Activity khác đang nằm trong background gọi <code>onSaveInstanceState()</code> — rất khó reproduce.</div></div>
<pre data-lang="kotlin"><code>// ❌ Crash tiềm tàng — list hàng nghìn item qua Intent
intent.putParcelableArrayListExtra("all_products", ArrayList(thousandProducts))
// TransactionTooLargeException

// ✅ Đúng — chỉ truyền định danh, màn hình đích tự query
intent.putExtra("product_id", productId)</code></pre>

<h3>Cách phát hiện</h3>
<p>Từ API 26+, hệ thống log warning khi transaction gần giới hạn:</p>
<pre data-lang="text"><code>W/ActivityThread: Bundle stats: [total size: 524288 bytes]</code></pre>
<p>Debug bằng cách đo trực tiếp kích thước Bundle:</p>
<pre data-lang="kotlin"><code>override fun onSaveInstanceState(outState: Bundle) {
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
}</code></pre>

<h3>Cách fix</h3>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tình huống</th>
      <th style="padding:8px 12px;text-align:left;">Giải pháp</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">List lớn truyền qua Intent</td><td style="padding:8px 12px;">Chỉ truyền ID/query → màn hình đích tự load lại từ database/API</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Bitmap trong Bundle</td><td style="padding:8px 12px;">Lưu ra file, truyền URI/file path</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">RecyclerView nhiều item</td><td style="padding:8px 12px;">Chỉ lưu <code>scroll_position</code> + điều kiện query, không lưu dữ liệu</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Fragment arguments chứa data lớn</td><td style="padding:8px 12px;">SharedViewModel scoped theo Activity</td></tr>
    <tr><td style="padding:8px 12px;">Khối dữ liệu lớn giữa 2 màn hình</td><td style="padding:8px 12px;">Cơ chế khác: Repository / singleton / SavedStateHandle — không qua Bundle</td></tr>
  </tbody>
</table>

<h2>Triển khai thực tế trong app MVVM</h2>
<p>Tình huống chuẩn: app mua sắm, màn hình <code>ProductListScreen</code> mở <code>ProductDetailScreen</code>. Ta thực hiện theo 3 bước.</p>

<h3>Bước 1: Model là @Parcelize</h3>
<pre data-lang="kotlin"><code>// data/model/Product.kt
@Parcelize
data class Product(
    val id: Long,
    val name: String,
    val price: Double,
    val imageUrl: String
) : Parcelable</code></pre>

<h3>Bước 2: Activity A gửi dữ liệu</h3>
<pre data-lang="kotlin"><code>// ProductListActivity.kt
private fun openDetail(product: Product) {
    val intent = Intent(this, ProductDetailActivity::class.java).apply {
        putExtra(EXTRA_PRODUCT, product) // Parcelable → tự serialize
    }
    startActivity(intent)
}

companion object {
    const val EXTRA_PRODUCT = "extra_product"
}</code></pre>

<h3>Bước 3: Activity B nhận dữ liệu (chú ý API version)</h3>
<pre data-lang="kotlin"><code>// ProductDetailActivity.kt
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val product: Product? = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        intent.getParcelableExtra(EXTRA_PRODUCT, Product::class.java)
    } else {
        @Suppress("DEPRECATION")
        intent.getParcelableExtra(EXTRA_PRODUCT)
    }

    product?.let { viewModel.loadDetail(it.id) }
}</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><code>getParcelableExtra()</code> (không có class) bị deprecated ở API 33. Luôn dùng overload kèm <code>Class</code> khi <code>minSdk &gt;= 33</code>, và giữ branch cũ cho máy thấp hơn.</div></div>

<h3>Flow mô phỏng toàn bộ luồng</h3>
<div class="mermaid">
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
</div>

<h2>Khi nào nên dùng — Khi nào không nên dùng</h2>

<h3>Nên dùng Bundle / Parcelable</h3>
<ul>
  <li>Truyền định danh, tham số nhỏ, flag khi mở Activity/Fragment/Service.</li>
  <li>Khởi tạo Fragment với <code>arguments</code> (luôn luôn — đây là cơ chế bắt buộc).</li>
  <li>Lưu state qua <code>onSaveInstanceState</code> / <code>SavedStateHandle</code> để sống sót qua process death.</li>
  <li>Component có thể được gọi từ ngoài app (Deep Link, Notification).</li>
</ul>

<h3>Không nên dùng Bundle</h3>
<ul>
  <li><strong>Dữ liệu lớn</strong> (&gt; 500KB) — nguy cơ TransactionTooLargeException.</li>
  <li><strong>Dữ liệu cần đồng bộ hai chiều giữa các màn hình</strong> — dùng SharedViewModel.</li>
  <li><strong>Dữ liệu quan trọng cần lưu lâu dài</strong> — dùng Room/DataStore, không phải Bundle (Bundle có thể bị mất nếu hệ thống kill process mà không lưu state).</li>
  <li><strong>Object có tham chiếu vòng hoặc nguồn tài nguyên nặng</strong> (Connection, Handler, View) — không thể serialize.</li>
</ul>

<h2>Sai lầm thường gặp</h2>

<h3>1. Truyền nguyên cả object thay vì ID</h3>
<p>Đúng là object <code>Product</code> nhỏ có thể truyền qua Parcelable. Nhưng nếu object là một "aggregate" chứa cả list con, bitmap, hoặc dữ liệu mà màn hình đích cần load tươi từ nguồn, thì truyền ID và load lại luôn đúng hơn — đảm bảo dữ liệu mới nhất và tránh vượt buffer.</p>

<h3>2. Dùng Serializable thay vì Parcelable</h3>
<pre data-lang="kotlin"><code>// ❌ data class User(val name: String) : Serializable
// ✅ @Parcelize data class User(val name: String) : Parcelable</code></pre>

<h3>3. Lệch thứ tự write/read trong Parcelable thủ công</h3>
<pre data-lang="kotlin"><code>// writeToParcel: id → name
// createFromParcel: name → id  ← BUG! dữ liệu tráo ngược</code></pre>
<p>Nếu bạn đang dùng manual Parcelable, hãy cân nhắc chuyển sang <code>@Parcelize</code> để loại bỏ hẳn lớp lỗi này.</p>

<h3>4. Quên xử lý nullable trong Parcelable thủ công</h3>
<p><code>readString()</code> trả null, còn <code>readInt()</code>/<code>readLong()</code> không xử lý null. Với manual, cần flag đánh dấu null. Với <code>@Parcelize</code>, nullable được xử lý tự động.</p>

<h3>5. Lưu dữ liệu lớn vào savedInstanceState</h3>
<pre data-lang="kotlin"><code>// ❌ Sai — lưu cả danh sách sản phẩm vào Bundle
outState.putParcelableArrayList("products", ArrayList(allProducts))

// ✅ Đúng — ViewModel giữ dữ liệu, Bundle chỉ lưu state UI
outState.putString("search_query", currentQuery)
outState.putInt("selected_tab", selectedTabIndex)</code></pre>

<h3>6. Tin rằng SharedViewModel giải quyết được process death</h3>
<p>SharedViewModel mất trắng khi process bị kill. Nếu dữ liệu cần tồn tại qua process death, phải kết hợp <code>SavedStateHandle</code> (lưu qua Bundle nội bộ) hoặc Room. Hiểu đúng giới hạn này giúp bạn không ngạc nhiên khi app bị hệ thống kill ở background rồi khôi phục màn hình trống.</p>

<h2>Kết nối hệ thống</h2>
<ul>
  <li><strong>Prerequisites</strong>: <code>Activity Lifecycle</code> và <code>Activity State Changes</code> — nơi Bundle được dùng để lưu/khôi phục state. <code>Task and Backstack</code> — ngữ cảnh Activity được tạo/hủy khi truyền Intent.</li>
  <li><strong>Related Topics</strong>: <code>Explicit Intents</code> — Intent là phương tiện vận chuyển Bundle. <code>Push data and send event via Intent</code> — các cách đưa dữ liệu vào Intent.</li>
  <li><strong>Downstream Topics</strong>: <code>ViewModel</code> — SavedStateHandle và cách dữ liệu Bundle đi vào ViewModel. <code>FragmentManager</code> — Fragment arguments.</li>
</ul>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/guide/components/activities/parcelables-and-bundles" target="_blank" rel="noopener">Parcelable and Bundle — Android Developers</a></li>
  <li><a href="https://developer.android.com/reference/android/os/Parcelable" target="_blank" rel="noopener">Parcelable — Android Developers Reference</a></li>
  <li><a href="https://developer.android.com/reference/android/os/Bundle" target="_blank" rel="noopener">Bundle — Android Developers Reference</a></li>
  <li><a href="https://developer.android.com/reference/android/os/TransactionTooLargeException" target="_blank" rel="noopener">TransactionTooLargeException — Android Developers Reference</a></li>
  <li><a href="https://developer.android.com/guide/navigation/use-graph/pass-data" target="_blank" rel="noopener">Pass data between destinations (Navigation Safe Args) — Android Developers</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/viewmodel" target="_blank" rel="noopener">ViewModel overview — Android Developers</a></li>
  <li><a href="https://kotlinlang.org/docs/parcelize.html" target="_blank" rel="noopener">Parceler &amp; TypeParceler — Kotlin Parcelize Docs</a></li>
</ul>
    `
  },

  'activity-overview': {
    title: 'Activity Overview',
    summary: 'Activity là component trung tâm của Android. Tìm hiểu bản chất Activity là gì, vì sao nó tồn tại, vị trí của nó trong kiến trúc MVVM, cách nó tương tác với các component Android khác (Intent, Fragment, Service, BroadcastReceiver, ContentProvider) và Jetpack (ViewModel, ViewBinding, DataBinding).',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '20 phút',
    depth: 'overview',
    tags: ['android', 'activity', 'component', 'ui', 'intent', 'fragment', 'service', 'broadcast-receiver', 'content-provider', 'viewmodel', 'viewbinding', 'databinding', 'mvvm'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['manifest-tags'],
    related: ['activity-lifecycle', 'activity-state-changes', 'activity-task-backstack', 'activity-parcelables-bundle'],
    learningOutcomes: [
      'Giải thích được bản chất Activity là gì và vì sao nó không chỉ là một "màn hình".',
      'Mô tả được vị trí của Activity trong kiến trúc MVVM và Clean Architecture.',
      'Phân biệt được cách Activity tương tác với từng component Android khác.',
      'Kết hợp được Activity với ViewModel, ViewBinding, DataBinding theo chuẩn thực chiến.',
      'Biết khi nào nên dùng Activity, khi nào nên dùng Single-Activity Architecture.'
    ],
    knowledgeGap: 'Xem Activity như một "Màn hình" đơn thuần khiến người học nhồi nhét mọi logic vào Activity (God Object), không hiểu được vai trò trung tâm của nó trong hệ sinh thái component và cách hệ điều hành điều phối. Khi nội dung phát triển, họ không biết component nào đảm nhận nhiệm vụ nào và kiến trúc dễ sụp đổ.',
    updatedAt: '2026-08-03',
    readTime: '20 phút',
    content: `<h2>Vấn đề cần giải quyết</h2>
<p>Khi một Android developer bắt đầu làm quen với hệ sinh thái Android, câu hỏi đầu tiên gần như luôn là:</p>
<blockquote>"Activity là gì, và tại sao mọi app Android đều cần nó?"</blockquote>
<p>Nhưng ngay sau đó là một loạt câu hỏi khó hơn nhiều:</p>
<ul>
  <li>Nó khác gì so với một màn hình (Screen) đơn thuần?</li>
  <li>Vì sao tôi phải khai báo nó trong <code>AndroidManifest.xml</code>?</li>
  <li>Activity giữ vai trò gì khi app của tôi dùng MVVM, ViewModel, ViewBinding?</li>
  <li>Khi nào thì dùng Activity, khi nào dùng Fragment, khi nào dùng Compose?</li>
</ul>
<p>Nếu chỉ trả lời bằng câu "Activity là một màn hình", bạn sẽ sớm gặp thất bại: nhồi nhét logic vào Activity cho đến khi nó trở thành một file hàng ngàn dòng không thể test, không hiểu vì sao Activity bị hệ điều hành giết, và không biết chia việc cho các component khác như Service, BroadcastReceiver, ContentProvider.</p>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được bản chất Activity là gì và vì sao nó không chỉ là một "màn hình".</li>
  <li>Mô tả được vị trí của Activity trong kiến trúc MVVM và Clean Architecture.</li>
  <li>Phân biệt được cách Activity tương tác với từng component Android khác.</li>
  <li>Kết hợp được Activity với ViewModel, ViewBinding, DataBinding theo chuẩn thực chiến.</li>
  <li>Biết khi nào nên dùng Activity, khi nào nên dùng Single-Activity Architecture.</li>
</ul>

<h2>Activity là gì?</h2>
<p>Theo định nghĩa chính thức của hệ điều hành, <strong>Activity là một entry point</strong> (điểm bắt đầu) để hệ thống và người dùng tương tác với ứng dụng.</p>
<div class="mermaid">
flowchart LR
    User[Người dùng] --> A[Activity]
    OS[Android OS] -->|"khởi chạy qua Intent"| A
    A -->|"vẽ lên"| W[Window]
    A -->|"nhận sự kiện"| W
</div>
<p>Khác với ứng dụng desktop/web có một hàm <code>main()</code> duy nhất, ứng dụng Android có thể được khởi chạy từ <strong>nhiều điểm khác nhau</strong>:</p>
<ul>
  <li>Bấm icon app trên Launcher → mở <code>MainActivity</code>.</li>
  <li>Bấm vào một notification → mở trực tiếp <code>ChatActivity</code>.</li>
  <li>Bấm một link deep link → mở <code>ProductDetailActivity</code> trong app của bạn.</li>
</ul>
<p>Mỗi điểm vào đó chính là một Activity. Activity cung cấp một <strong>Window</strong> (cửa sổ) để ứng dụng vẽ UI lên và nhận các sự kiện tương tác (touch, swipe, phím bấm).</p>
<div class="callout callout-info"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Cách hiểu đúng nhất:</strong> Activity không phải là màn hình. Nó là một <strong>điểm vào + một cửa sổ</strong> do hệ điều hành điều phối. Màn hình mà bạn nhìn thấy được vẽ bởi View/Fragment/Compose bên trong Activity.</div></div>

<h2>Vì sao Activity tồn tại?</h2>
<p>Activity giải quyết 3 bài toán mà hệ điều hành phải xử lý:</p>
<p><strong>1. Đa điểm vào (Multiple Entry Points)</strong></p>
<p>Ứng dụng không chỉ được mở từ một nơi. Launcher, notification, deep link, app khác gọi qua Intent đều cần một "địa chỉ" để khởi chạy đúng màn hình. Activity là địa chỉ đó.</p>
<p><strong>2. Quản lý tài nguyên hệ điều hành</strong></p>
<p>Hệ điều hành cần biết chính xác <strong>màn hình nào đang hiển thị</strong> để phân bổ tài nguyên (bộ nhớ, CPU) và giết app chạy ngầm khi thiếu RAM. Nó dùng Activity để theo dõi điều này — không phải dùng process hay service.</p>
<p><strong>3. Điều hướng có hệ thống (Task &amp; Back Stack)</strong></p>
<p>Android cần một cơ chế để người dùng đi sâu, quay lại, và quay về màn hình chính một cách nhất quán. Activity được tổ chức trong <strong>Task</strong> và <strong>Back Stack</strong> để đảm bảo hành vi phím Back luôn hợp lý.</p>

<h2>Vị trí trong kiến trúc MVVM</h2>
<p>Trong một ứng dụng thực chiến theo MVVM / Clean Architecture, Activity nằm ở <strong>Presentation Layer</strong>, đóng vai trò là <strong>View</strong>.</p>
<div class="mermaid">
flowchart TD
    OS[Android OS] -->|Intent| A[Activity - View]
    A -->|"lắng nghe StateFlow/LiveData"| VM[ViewModel]
    VM -->|"gọi UseCase"| U[Use Case]
    U -->|"lấy dữ liệu"| R[Repository]
    R -->|"API / DB / SharedPreferences"| S[(Data Source)]
    A -->|"render"| UI[ViewBinding / Compose]

    style A fill:#4CAF50,stroke:#388E3C,stroke-width:2px,color:#fff
    style VM fill:#2196F3,stroke:#1976D2,stroke-width:2px,color:#fff
</div>
<p>Vai trò cụ thể của Activity trong hệ thống:</p>
<ol>
  <li><strong>Host</strong> — container chứa UI (Fragment/Compose) và Window.</li>
  <li><strong>Lifecycle Owner</strong> — cung cấp vòng đời để ViewModel và các thành phần khác biết khi nào cần hủy, dừng công việc.</li>
  <li><strong>Context Provider</strong> — cung cấp <code>Context</code> để truy cập tài nguyên, database, system service.</li>
  <li><strong>Router</strong> — nhận Intent từ hệ điều hành/app khác và quyết định hiển thị gì.</li>
</ol>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Nguyên tắc quan trọng:</strong> <strong>Activity càng mỏng càng tốt.</strong> Activity chỉ nên nhận State từ ViewModel và render ra UI. Toàn bộ logic nghiệp vụ nằm trong ViewModel + UseCase + Repository.</div></div>

<h2>Activity tương tác với các component Android khác</h2>
<p>Đây là phần cốt lõi của bài viết. Activity không hoạt động một mình — nó là trung tâm kết nối hầu hết các component của hệ sinh thái Android.</p>
<div class="mermaid">
flowchart LR
    A[Activity] -->|"gửi/nhận"| I[Intent]
    A -->|"host"| F[Fragment]
    A -->|"bind/start"| S[Service]
    A -->|"đăng ký/nhận"| B[BroadcastReceiver]
    A -->|"truy cập"| P[ContentProvider]
    A -->|"quan sát"| VM[ViewModel]
    A -->|"render"| VB[ViewBinding / DataBinding]

    style A fill:#4CAF50,stroke:#388E3C,stroke-width:2px,color:#fff
</div>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Component</th>
      <th style="padding:8px 12px;text-align:left;">Quan hệ với Activity</th>
      <th style="padding:8px 12px;text-align:left;">Nhiệm vụ trong project</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Intent</td>
      <td style="padding:8px 12px;">Khởi chạy Activity, truyền dữ liệu giữa Activity</td>
      <td style="padding:8px 12px;">Điều hướng màn hình, gọi app khác</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Fragment</td>
      <td style="padding:8px 12px;">Được Activity host (chứa)</td>
      <td style="padding:8px 12px;">Chia UI thành module tái sử dụng</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Service</td>
      <td style="padding:8px 12px;">Activity khởi động/liên kết để chạy tác vụ nền</td>
      <td style="padding:8px 12px;">Tải file, chơi nhạc, sync data</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">BroadcastReceiver</td>
      <td style="padding:8px 12px;">Activity đăng ký để nhận sự kiện</td>
      <td style="padding:8px 12px;">Lắng nghe battery low, network change</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">ContentProvider</td>
      <td style="padding:8px 12px;">Activity truy cập dữ liệu qua URI</td>
      <td style="padding:8px 12px;">Chia sẻ dữ liệu giữa các app</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">ViewModel</td>
      <td style="padding:8px 12px;">Activity quan sát state, sống sót qua config change</td>
      <td style="padding:8px 12px;">Giữ dữ liệu UI, tách logic khỏi View</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;font-weight:600;">ViewBinding/DataBinding</td>
      <td style="padding:8px 12px;">Activity dùng để truy cập View an toàn</td>
      <td style="padding:8px 12px;">Thay thế <code>findViewById</code></td>
    </tr>
  </tbody>
</table>

<h3>1. Activity và Intent</h3>
<p><strong>Intent là "tấm vé" để hệ điều hành biết cần khởi chạy Activity nào.</strong> Khi bạn gọi <code>startActivity(intent)</code>, hệ điều hành sẽ kiểm tra <code>AndroidManifest.xml</code>, khởi tạo Activity đích và đưa nó lên màn hình.</p>
<pre data-lang="kotlin"><code>val intent = Intent(this, DetailActivity::class.java).apply {
    putExtra(DetailActivity.EXTRA_ID, itemId)
}
startActivity(intent)</code></pre>
<p>Activity đích nhận dữ liệu qua <code>intent</code>:</p>
<pre data-lang="kotlin"><code>val itemId = intent.getIntExtra(EXTRA_ID, -1)</code></pre>
<p>Intent cũng là cơ chế để <strong>app khác mở Activity của bạn</strong> (deep linking, share, camera...). Chi tiết nằm trong topic về Intent.</p>

<h3>2. Activity và Fragment</h3>
<p>Activity là <strong>host</strong> của Fragment. Một Activity có thể chứa nhiều Fragment, và Fragment được quản lý bởi <code>FragmentManager</code> do Activity sở hữu.</p>
<div class="mermaid">
flowchart TD
    A[MainActivity] -->|"FragmentManager"| FM
    FM --> F1[HomeFragment]
    FM --> F2[DetailFragment]
    FM --> F3[ProfileFragment]
</div>
<p>Trong kiến trúc hiện đại, Fragment là đơn vị màn hình, Activity chỉ là khung chứa duy nhất.</p>

<h3>3. Activity và Service</h3>
<p>Activity <strong>khởi động hoặc liên kết</strong> Service để chạy công việc nền không cần UI:</p>
<ul>
  <li><code>startService()</code> — chạy tác vụ nền độc lập (tải file).</li>
  <li><code>bindService()</code> — liên kết để gọi hàm và nhận kết quả (chơi nhạc, lấy vị trí).</li>
</ul>
<p>Activity cần <strong>ngừng công việc</strong> khi lifecycle của nó kết thúc để tránh tốn tài nguyên. Đây là lý do nên dùng <code>WorkManager</code> cho tác vụ phải hoàn tất dù Activity bị hủy.</p>

<h3>4. Activity và BroadcastReceiver</h3>
<p>Activity <strong>đăng ký</strong> BroadcastReceiver để lắng nghe sự kiện hệ thống hoặc sự kiện nội bộ app:</p>
<pre data-lang="kotlin"><code>val receiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        // Cập nhật UI khi có sự kiện
    }
}
registerReceiver(receiver, IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION))</code></pre>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Receiver đăng ký trong Activity phải được hủy trong <code>onPause()</code> hoặc <code>onStop()</code>, nếu không sẽ gây <strong>memory leak</strong> và nhận sự kiện khi Activity không còn hiển thị.</div></div>

<h3>5. Activity và ContentProvider</h3>
<p>Activity truy cập dữ liệu chia sẻ (contact, media, hoặc dữ liệu app khác) qua ContentProvider bằng URI và <code>ContentResolver</code>:</p>
<pre data-lang="kotlin"><code>val cursor = contentResolver.query(
    ContactsContract.Contacts.CONTENT_URI,
    projection, null, null, null
)</code></pre>
<p>Trong kiến trúc MVVM, Activity không gọi ContentResolver trực tiếp — việc này nằm trong Repository, và Activity chỉ hiển thị kết quả qua ViewModel.</p>

<h3>6. Activity và Jetpack (ViewModel, ViewBinding, DataBinding)</h3>
<p>Đây là cách phối hợp chuẩn trong project thực tế hiện nay:</p>
<ul>
  <li><strong>ViewModel</strong> giữ dữ liệu và logic UI. Nó <strong>sống sót qua xoay màn hình</strong> (configuration change), trong khi Activity bị destroy và tạo lại.</li>
  <li><strong>ViewBinding</strong> sinh class binding từ XML layout, giúp truy cập View an toàn, không cần <code>findViewById</code>.</li>
  <li><strong>DataBinding</strong> nâng cấp ViewBinding bằng khả năng binding dữ liệu trực tiếp vào layout XML.</li>
</ul>
<p>Xem cách phối hợp cụ thể trong phần "Triển khai thực chiến" dưới đây.</p>

<h2>Khi nào nên dùng, khi nào không?</h2>
<h3>Nên dùng Activity</h3>
<ul>
  <li>Là <strong>entry point</strong> của ứng dụng — mọi app có UI đều cần ít nhất 1 Activity.</li>
  <li>Cần màn hình <strong>độc lập, điều hướng qua Intent</strong>, hoặc muốn app khác có thể mở (deep link, share).</li>
  <li>Cần một <strong>Window riêng</strong> — ví dụ Activity trong multi-window/split-screen.</li>
</ul>
<h3>Không nên lạm dụng Activity</h3>
<ul>
  <li><strong>Không tạo 1 Activity cho mỗi màn hình</strong> nếu các màn hình chia sẻ dữ liệu chung. Kiến trúc hiện đại dùng <strong>Single-Activity Architecture</strong>: 1 Activity duy nhất + Fragment/Navigation Compose.</li>
  <li><strong>Không nhồi logic nghiệp vụ</strong> vào Activity — đẩy xuống ViewModel/UseCase/Repository.</li>
</ul>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Khi nào chọn gì?</strong><br/>- App mới, hiện đại → <strong>Single-Activity</strong> + Navigation Compose (hoặc Fragment).<br/>- Chức năng độc lập, phải gọi từ ngoài app → tách riêng <strong>Activity</strong> với Intent Filter.<br/>- UI phức tạp cần tái sử dụng theo màn hình → Fragment.<br/>- UI hoàn toàn theo dữ liệu, ít phụ thuộc lifecycle → Jetpack Compose.</div></div>

<h2>Trade-offs</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tiêu chí</th>
      <th style="padding:8px 12px;text-align:left;">Nhiều Activity</th>
      <th style="padding:8px 12px;text-align:left;">Single-Activity</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Chia sẻ dữ liệu giữa màn hình</td>
      <td style="padding:8px 12px;">Khó — phải truyền qua Intent/Bundle</td>
      <td style="padding:8px 12px;">Dễ — dùng chung ViewModel cấp Activity</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Hiệu ứng chuyển màn hình</td>
      <td style="padding:8px 12px;">Phụ thuộc hệ thống</td>
      <td style="padding:8px 12px;">Kiểm soát tốt hơn</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Quản lý lifecycle</td>
      <td style="padding:8px 12px;">Nhiều Activity, nhiều điểm phải theo dõi</td>
      <td style="padding:8px 12px;">1 điểm duy nhất, tập trung</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Chi phí khởi tạo</td>
      <td style="padding:8px 12px;">Mỗi Activity khởi tạo Window riêng</td>
      <td style="padding:8px 12px;">Chỉ 1 Window</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;font-weight:600;">Được gọi từ app khác</td>
      <td style="padding:8px 12px;">Dễ — Intent Filter</td>
      <td style="padding:8px 12px;">Cần xử lý routing thủ công</td>
    </tr>
  </tbody>
</table>
<p>Không có lựa chọn nào tuyệt đối đúng. Chọn dựa trên <strong>nhu cầu chia sẻ dữ liệu</strong> và <strong>mức độ tích hợp với hệ thống</strong> của ứng dụng.</p>

<h2>Sai lầm thường gặp</h2>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Fat Activity (God Object):</strong><br/>Nhét toàn bộ logic (gọi API, lưu database, validate form, xử lý UI) vào Activity.<br/><strong>Hậu quả:</strong> file dài hàng ngàn dòng, không thể unit test, dễ crash khi xoay màn hình vì Activity bị destroy và recreate.<br/><strong>Giải pháp:</strong> đẩy logic vào <code>ViewModel</code>, giao tiếp qua <code>StateFlow</code>/<code>LiveData</code>. Activity chỉ nhận State và render.</div></div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Memory Leak qua Context:</strong><br/>Truyền Activity Context (<code>this</code>) vào singleton, background thread, hoặc object sống lâu hơn Activity.<br/><strong>Hậu quả:</strong> Activity bị destroy nhưng rác không thu hồi được vì vẫn bị giữ reference.<br/><strong>Giải pháp:</strong> dùng <code>applicationContext</code> cho việc không liên quan UI.</div></div>
<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Quên khai báo Activity trong Manifest:</strong><br/>Mọi Activity phải khai báo trong <code>AndroidManifest.xml</code>. Nếu quên, app crash ngay với <code>ActivityNotFoundException</code>.<br/>Kể từ Android 12 (API 31), bắt buộc khai báo rõ <code>android:exported</code>.</div></div>
<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Xử lý trạng thái ngay trong Activity:</strong><br/>Lưu dữ liệu tạm trong Activity khiến dữ liệu mất khi xoay màn hình.<br/><strong>Giải pháp:</strong> trạng thái UI nằm trong <code>ViewModel</code> (sống qua config change); dữ liệu cần khôi phục sau khi process bị kill dùng <code>SavedStateHandle</code> / <code>onSaveInstanceState</code>.</div></div>

<h2>Tư duy hệ thống</h2>
<p>Trong một project thực tế theo Clean Architecture, Activity chỉ chiếm một phần rất nhỏ:</p>
<div class="mermaid">
flowchart TD
    A[Activity - View] --> VM[ViewModel]
    VM --> UC[UseCase]
    UC --> R[Repository]
    R --> DS[(Room / Retrofit / DataStore)]
</div>
<p><strong>Nguyên tắc phụ thuộc:</strong> dữ liệu chảy một chiều từ Data → ViewModel → Activity. Activity <strong>không bao giờ</strong> gọi thẳng Repository hay API. Điều này giúp bạn:</p>
<ul>
  <li>Test ViewModel độc lập, không cần Activity.</li>
  <li>Thay thế toàn bộ UI (ViewBinding → Compose) mà không đụng vào logic.</li>
  <li>Giữ Activity mỏng, dễ bảo trì, dễ mở rộng khi app phát triển.</li>
</ul>

<h2>Học tiếp gì?</h2>
<p>Activity Overview chỉ là điểm bắt đầu. Để hiểu sâu và làm chủ Activity, hãy học theo thứ tự:</p>
<ol>
  <li><strong>Activity Lifecycle</strong> — nền tảng bắt buộc: vòng đời, từng callback, khi nào Activity bị hủy.</li>
  <li><strong>Activity State Changes</strong> — cách giữ trạng thái qua xoay màn hình, <code>onSaveInstanceState</code>.</li>
  <li><strong>Task and Backstack</strong> — cách Android điều phối Activity trong Task, Launch Mode, Intent Flags.</li>
  <li><strong>Parcelables and Bundle</strong> — cách truyền dữ liệu giữa Activity an toàn và hiệu quả.</li>
</ol>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/guide/components/activities/intro-activities" target="_blank">Introduction to Activities - Android Developers</a></li>
  <li><a href="https://developer.android.com/reference/android/app/Activity" target="_blank">Activity API Reference</a></li>
  <li><a href="https://developer.android.com/topic/architecture" target="_blank">Guide to App Architecture - Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/components/activities/system-packages" target="_blank">Activities and the system - Android Developers</a></li>
</ul>
`
  },

  'fragment-overview': {
    title: 'Fragment Overview',
    summary: 'Hiểu bản chất Fragment, vì sao nó là đơn vị màn hình trong Single-Activity Architecture, phân biệt trách nhiệm với Activity, và đi từ FragmentManager đến Jetpack Navigation Component trong kiến trúc MVVM (Kotlin, ViewBinding).',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '18 phút',
    depth: 'overview',
    tags: ['android', 'fragment', 'ui', 'single-activity', 'navigation', 'viewbinding', 'mvvm'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['activity-overview'],
    related: ['fragment-lifecycle', 'fragment-state-changes', 'fragment-manager', 'fragment-dialog'],
    learningOutcomes: [
      'Giải thích được bản chất Fragment là gì và vì sao nó là đơn vị màn hình trong Single-Activity Architecture.',
      'Phân biệt được trách nhiệm giữa Activity (khung chứa) và Fragment (UI module).',
      'Triển khai được Fragment với ViewBinding đúng chuẩn, không gây memory leak.',
      'Biết khi nào dùng FragmentManager thủ công và khi nào dùng Jetpack Navigation Component.',
      'Nhận diện được các lỗi phổ biến khi quản lý Fragment trong project thực tế.'
    ],
    knowledgeGap: 'Xem Fragment giống hệt Activity khiến người học nhồi logic vào Fragment, dùng sai lifecycle gây memory leak, hoặc quản lý transaction thủ công lộn xộn dẫn đến crash khi xoay màn hình. Không phân biệt được khi nào dùng FragmentManager so với Jetpack Navigation dẫn đến kiến trúc điều hướng khó bảo trì.',
    updatedAt: '2026-08-03',
    readTime: '18 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Bạn đang xây dựng một ứng dụng Android theo mô hình <strong>Single Activity + nhiều Fragment</strong>. Câu hỏi đầu tiên gần như luôn là:</p>
<blockquote>
<p>"Fragment là gì, và vì sao tôi phải chia màn hình ra thành từng Fragment thay vì tạo nhiều Activity?"</p>
</blockquote>
<p>Ngay sau đó là một loạt câu hỏi khó hơn:</p>
<ul>
  <li>Trách nhiệm của Activity và Fragment khác nhau thế nào?</li>
  <li>Làm sao để thêm Fragment vào màn hình, điều hướng qua lại giữa chúng?</li>
  <li>Fragment kết hợp với ViewModel, ViewBinding trong MVVM ra sao cho chuẩn?</li>
  <li>Khi nào dùng <code>FragmentManager</code> thủ công, khi nào dùng Jetpack Navigation?</li>
</ul>
<p>Nếu không hiểu bản chất, bạn sẽ nhồi logic vào Fragment, quản lý chuyển trang thủ công lộn xộn, và app dễ crash khi xoay màn hình hoặc rò rỉ bộ nhớ.</p>

<h2>Sau khi học xong</h2>
<ul>
  <li>Giải thích được bản chất Fragment là gì và vì sao nó là đơn vị màn hình trong Single-Activity Architecture.</li>
  <li>Phân biệt được trách nhiệm giữa Activity (khung chứa) và Fragment (UI module).</li>
  <li>Triển khai được Fragment với ViewBinding đúng chuẩn, không gây memory leak.</li>
  <li>Biết khi nào dùng FragmentManager thủ công và khi nào dùng Jetpack Navigation Component.</li>
  <li>Nhận diện được các lỗi phổ biến khi quản lý Fragment trong project thực tế.</li>
</ul>

<h2>Fragment là gì?</h2>
<p><strong>Fragment</strong> là một khối UI và logic độc lập, có <strong>vòng đời riêng</strong>, được "nhúng" (host) vào bên trong một <code>Activity</code> (hoặc một Fragment khác).</p>
<p>Một cách hình dung trực quan:</p>
<blockquote>
<p>Nếu Activity là một <strong>cái cửa sổ</strong> (Window), thì Fragment là những <strong>tấm panel</strong> có thể tháo lắp, ghép vào cửa sổ đó. Bạn có thể thay panel này bằng panel khác mà không cần đóng cửa sổ.</p>
</blockquote>
<div class="mermaid">
flowchart LR
    Act[Activity — Cửa sổ] -->|chứa| F1[Fragment A — Panel 1]
    Act -->|chứa| F2[Fragment B — Panel 2]
    Act -->|chứa| F3[Fragment C — Panel 3]
</div>
<p>Ba đặc điểm cốt lõi:</p>
<ul>
  <li><strong>Không thể sống độc lập:</strong> Fragment bắt buộc phải nằm trong một Activity/Fragment khác. Nó không có entry point như Activity.</li>
  <li><strong>Có vòng đời riêng:</strong> Fragment sở hữu vòng đời riêng, được hệ thống điều phối theo vòng đời của Activity host, và phức tạp hơn Activity vì còn tách riêng vòng đời của View.</li>
  <li><strong>Có thể tái sử dụng:</strong> Cùng một Fragment có thể được dùng ở nhiều Activity, hoặc hiển thị nhiều lần trong một màn hình (multi-pane trên tablet).</li>
</ul>
<div class="callout callout-info"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Cách hiểu đúng nhất:</strong> Fragment không phải là một "màn hình" độc lập. Nó là một <strong>đơn vị UI có vòng đời, được host trong Activity</strong>. Trong kiến trúc hiện đại, mỗi màn hình của app là một Fragment, và Activity chỉ là khung chứa duy nhất.</div></div>

<h2>Vì sao Fragment tồn tại?</h2>
<h3>1. Giải quyết bài toán màn hình lớn (Tablet, Foldable)</h3>
<p>Fragment ra đời từ Android 3.0 (Honeycomb) để xử lý UI trên tablet. Một màn hình tablet có thể hiển thị song song <strong>Danh sách (trái)</strong> và <strong>Chi tiết (phải)</strong>. Với Activity, bạn phải viết 2 Activity riêng cho 2 trường hợp (phone vs tablet). Với Fragment, bạn chỉ cần 2 Fragment dùng chung, và ghép chúng lại trên tablet.</p>
<div class="mermaid">
flowchart TB
    subgraph Phone[Điện thoại — 1 Fragment mỗi lúc]
        A1[Danh sách] --> A2[Chi tiết]
    end

    subgraph Tablet[Tablet — 2 Fragment song song]
        B1[Danh sách] & B2[Chi tiết]
    end
</div>
<h3>2. Là nền tảng của Single-Activity Architecture</h3>
<p>Việc tạo một Activity rất đắt đỏ (Window riêng, khởi tạo hệ thống). Chuyển đổi giữa các Fragment thì nhẹ và mượt hơn nhiều. Google khuyến nghị các app hiện đại chỉ dùng <strong>1 Activity duy nhất</strong> làm container, mọi màn hình là Fragment.</p>
<h3>3. Quản lý vòng đời và điều hướng có hệ thống</h3>
<p>Fragment được quản lý bởi <code>FragmentManager</code>, giúp hệ thống xử lý tự động việc tạo/hủy UI, lưu/khôi phục trạng thái khi xoay màn hình, và quản lý backstack khi điều hướng.</p>

<h2>Phân biệt trách nhiệm Activity và Fragment</h2>
<table>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">Tiêu chí</td><td style="padding:8px 12px;font-weight:600;">Activity</td><td style="padding:8px 12px;font-weight:600;">Fragment</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">Vai trò</td><td style="padding:8px 12px;"><strong>Khung chứa</strong> (container) cấu hình toàn cục</td><td style="padding:8px 12px;"><strong>UI module</strong> của từng màn hình/tính năng</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">Entry point</td><td style="padding:8px 12px;">Có — được khai báo trong Manifest</td><td style="padding:8px 12px;">Không — phải được host</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">Vòng đời</td><td style="padding:8px 12px;">1 vòng đời duy nhất</td><td style="padding:8px 12px;">2 vòng đời (Fragment + View)</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">Điều hướng</td><td style="padding:8px 12px;">Qua <code>Intent</code>, quản lý bởi Task/Back Stack</td><td style="padding:8px 12px;">Qua <code>FragmentManager</code>/Navigation, backstack riêng</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">Tái sử dụng</td><td style="padding:8px 12px;">Khó</td><td style="padding:8px 12px;">Dễ — dùng lại ở nhiều nơi</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">Trong Single-Activity</td><td style="padding:8px 12px;">Chỉ 1 cái duy nhất</td><td style="padding:8px 12px;">Nhiều cái — mỗi màn hình một Fragment</td></tr>
</table>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Nguyên tắc thực chiến:</strong> Activity càng <strong>mỏng</strong> càng tốt — chỉ cấu hình Theme, Window insets, xử lý back chung. Toàn bộ giao diện và logic của từng màn hình nằm trong Fragment + ViewModel.</div></div>

<h2>Khi nào nên dùng, khi nào không?</h2>
<h3>Nên dùng Fragment</h3>
<ul>
  <li>Xây app theo <strong>Single-Activity Architecture</strong> — gần như mọi app UI hiện đại.</li>
  <li>Giao diện cần điều hướng: <strong>Bottom Navigation</strong>, <strong>ViewPager/Tabs</strong>, <strong>Navigation Drawer</strong>.</li>
  <li>Cần <strong>tái sử dụng UI</strong> giữa nhiều màn hình hoặc giữa phone/tablet (adaptive layout).</li>
  <li>Cần màn hình con có vòng đời riêng như dialog, bottom sheet (<code>DialogFragment</code>, <code>BottomSheetDialogFragment</code>).</li>
</ul>
<h3>Không nên lạm dụng Fragment</h3>
<ul>
  <li>App viết hoàn toàn bằng <strong>Jetpack Compose</strong> — đã có <code>@Composable</code> thay thế, không cần Fragment.</li>
  <li>Màn hình quá đơn giản, không tái sử dụng, không cần quản lý lifecycle riêng.</li>
  <li>Fragment <strong>quá lớn</strong> (hàng ngàn dòng) — khi đó cần tách thành nhiều Fragment nhỏ hơn, không phải nhồi thêm.</li>
</ul>
<h3>Giải pháp thay thế</h3>
<table>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">Nhu cầu</td><td style="padding:8px 12px;font-weight:600;">Lựa chọn</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">UI theo dữ liệu, ít lifecycle, hiện đại</td><td style="padding:8px 12px;">Jetpack Compose</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Màn hình độc lập, gọi từ app khác</td><td style="padding:8px 12px;">Activity + Intent</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Chỉ cần 1 khối UI nhỏ, không điều hướng</td><td style="padding:8px 12px;"><code>View</code> / custom view</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Điều hướng nhiều màn hình, cần backstack</td><td style="padding:8px 12px;">Fragment + Navigation Component</td></tr>
</table>

<h2>Fragment trong kiến trúc MVVM</h2>
<p>Trong kiến trúc MVVM / Clean Architecture, Fragment nằm ở <strong>Presentation Layer</strong>, đóng vai trò là <strong>View</strong>:</p>
<ul>
  <li><strong>Fragment:</strong> render UI, gửi sự kiện người dùng lên ViewModel, quan sát <code>StateFlow</code>/<code>LiveData</code>.</li>
  <li><strong>ViewModel:</strong> giữ trạng thái và logic UI, <strong>sống sót qua xoay màn hình</strong>.</li>
  <li><strong>Shared ViewModel (scoped theo Activity):</strong> chia sẻ dữ liệu giữa các Fragment mà không cần truyền qua Bundle phức tạp.</li>
</ul>
<div class="mermaid">
flowchart TD
    Act[Host Activity] -->|FragmentManager| FA[Fragment A — Danh sách]
    Act -->|FragmentManager| FB[Fragment B — Chi tiết]

    FA -->|quan sát StateFlow| VM[Shared ViewModel]
    FB -->|quan sát StateFlow| VM

    VM -->|gọi UseCase| R[Repository]
    R -->|đọc/ghi| DS[(Data Source)]

    style Act fill:#1976D2,stroke:#0D47A1,stroke-width:2px,color:#fff
    style FA fill:#4CAF50,stroke:#388E3C,stroke-width:2px,color:#fff
    style FB fill:#4CAF50,stroke:#388E3C,stroke-width:2px,color:#fff
    style VM fill:#FF9800,stroke:#F57C00,stroke-width:2px,color:#fff
</div>

<h2>Cách hoạt động bên trong: Ai quản lý Fragment?</h2>
<p>Fragment không tự quản lý chính mình. Mọi việc thêm, thay thế, remove, xử lý lifecycle và backstack đều do <strong>FragmentManager</strong> đảm nhiệm.</p>
<div class="mermaid">
flowchart TD
    Act[Activity] -->|sở hữu| FM[FragmentManager]
    FM -->|add/replace/remove| F1[Fragment A]
    FM -->|quản lý| F2[Fragment B]
    FM -->|điều phối| LS[Lifecycle của từng Fragment]
    FM -->|lưu/khôi phục| ST[State khi xoay màn hình]

    style Act fill:#1976D2,stroke:#0D47A1,color:#fff
    style FM fill:#FF9800,stroke:#F57C00,color:#fff
    style F1 fill:#4CAF50,stroke:#388E3C,color:#fff
    style F2 fill:#4CAF50,stroke:#388E3C,color:#fff
</div>
<p>Khi bạn gọi <code>supportFragmentManager.beginTransaction()...commit()</code> (hoặc Navigation Component làm giùm), FragmentManager sẽ:</p>
<ol>
  <li>Khởi tạo Fragment instance.</li>
  <li>Gọi lifecycle callbacks theo thứ tự (<code>onCreate</code> → <code>onCreateView</code> → <code>onViewCreated</code> → ...).</li>
  <li>Nhúng View của Fragment vào container trong Activity.</li>
  <li>Lưu trạng thái vào backstack nếu bạn yêu cầu.</li>
</ol>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Jetpack Navigation Component là abstraction trên FragmentManager.</strong> Nó tự động quản lý transaction, backstack, truyền argument (SafeArgs) và animation. Hiểu FragmentManager giúp bạn hiểu vì sao Navigation hoạt động được.</div></div>

<h2>Triển khai thực chiến</h2>
<p>Có hai cách dùng Fragment trong project thực tế. Hãy đi từ <strong>FragmentManager</strong> để hiểu bản chất, rồi chuyển sang <strong>Jetpack Navigation</strong> — chuẩn production.</p>

<h3>Con đường 1: FragmentManager — hiểu bản chất</h3>
<h4>Bước 1: Chuẩn bị container trong Activity</h4>
<p><code>activity_main.xml</code> chỉ cần một thẻ <code>FragmentContainerView</code> trống làm chỗ chứa:</p>
<pre data-lang="xml"><code>&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;androidx.fragment.app.FragmentContainerView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/fragment_container"
    android:layout_width="match_parent"
    android:layout_height="match_parent" /&gt;</code></pre>

<h4>Bước 2: Tạo Fragment với ViewBinding</h4>
<p>Khác với Activity (<code>setContentView</code> trong <code>onCreate</code>), Fragment vẽ UI ở <code>onCreateView</code> và bind logic ở <code>onViewCreated</code>:</p>
<pre data-lang="kotlin"><code>class HomeFragment : Fragment(R.layout.fragment_home) {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = FragmentHomeBinding.bind(view)

        binding.tvTitle.text = "Màn hình Home"
        binding.btnNext.setOnClickListener {
            // Điều hướng sang màn hình khác
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null // Bắt buộc để tránh memory leak
    }
}</code></pre>

<h4>Bước 3: Nhúng Fragment bằng transaction</h4>
<pre data-lang="kotlin"><code>class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Chỉ thêm khi savedInstanceState == null để tránh thêm đè khi xoay màn hình
        if (savedInstanceState == null) {
            supportFragmentManager.beginTransaction()
                .setReorderingAllowed(true)
                .add(R.id.fragment_container, HomeFragment())
                .commit()
        }
    }
}</code></pre>

<h4>Mô phỏng luồng nhúng Fragment</h4>
<div class="mermaid">
sequenceDiagram
    participant User
    participant Act as MainActivity
    participant FM as FragmentManager
    participant F as HomeFragment

    User->>Act: Mở app
    Act->>FM: beginTransaction().add(R.id.container, HomeFragment()).commit()
    FM->>F: onCreate() → onCreateView() → onViewCreated()
    F->>Act: View của Fragment xuất hiện trong container
    User->>F: Tương tác (click, input)
</div>

<h3>Con đường 2: Jetpack Navigation — chuẩn production</h3>
<h4>Bước 1: Khai báo dependency trong build.gradle.kts</h4>
<pre data-lang="kotlin"><code>dependencies {
    implementation("androidx.navigation:navigation-fragment-ktx:2.8.9")
    implementation("androidx.navigation:navigation-ui-ktx:2.8.9")
}</code></pre>

<h4>Bước 2: Tạo nav_graph.xml — bản đồ các màn hình</h4>
<p>Mỗi màn hình là một <code>&lt;fragment&gt;</code> trong graph, liên kết với nhau bằng <code>&lt;action&gt;</code>:</p>
<pre data-lang="xml"><code>&lt;navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/nav_graph"
    app:startDestination="@id/homeFragment"&gt;

    &lt;fragment
        android:id="@+id/homeFragment"
        android:name="com.example.shop.ui.home.HomeFragment"
        android:label="Trang chủ"&gt;

        &lt;action
            android:id="@+id/action_home_to_detail"
            app:destination="@id/detailFragment" /&gt;
    &lt;/fragment&gt;

    &lt;fragment
        android:id="@+id/detailFragment"
        android:name="com.example.shop.ui.detail.DetailFragment"
        android:label="Chi tiết" /&gt;
&lt;/navigation&gt;</code></pre>

<h4>Bước 3: Gắn NavHostFragment vào Activity</h4>
<pre data-lang="xml"><code>&lt;androidx.fragment.app.FragmentContainerView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/nav_host_fragment"
    android:name="androidx.navigation.fragment.NavHostFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:defaultNavHost="true"
    app:navGraph="@navigation/nav_graph" /&gt;</code></pre>

<h4>Bước 4: Điều hướng từ Fragment</h4>
<pre data-lang="kotlin"><code>class HomeFragment : Fragment(R.layout.fragment_home) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = FragmentHomeBinding.bind(view)

        binding.btnNext.setOnClickListener {
            // Navigation tự lo transaction + backstack + animation
            findNavController().navigate(R.id.action_home_to_detail)
        }
    }
}</code></pre>

<h4>Mô phỏng luồng điều hướng với Navigation</h4>
<div class="mermaid">
sequenceDiagram
    participant User
    participant HF as HomeFragment
    participant NC as NavController
    participant NF as NavHostFragment
    participant DF as DetailFragment

    User->>HF: Click "Xem chi tiết"
    HF->>NC: navigate(R.id.action_home_to_detail)
    NC->>NF: Thực thi action → khởi tạo DetailFragment
    NF->>DF: onCreate() → onCreateView() → onViewCreated()
    Note over NC: HomeFragment được đưa vào backstack
    User->>DF: Nhấn Back
    NC->>NF: Pop backstack → hiện lại HomeFragment
</div>

<h2>Trade-offs</h2>
<h3>FragmentManager vs Jetpack Navigation</h3>
<table>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">Tiêu chí</td><td style="padding:8px 12px;font-weight:600;">FragmentManager</td><td style="padding:8px 12px;font-weight:600;">Jetpack Navigation</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Độ phức tạp</td><td style="padding:8px 12px;">Thủ công từng transaction</td><td style="padding:8px 12px;">Khai báo bằng XML, tự động</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Backstack</td><td style="padding:8px 12px;">Tự quản lý, dễ sai</td><td style="padding:8px 12px;">Tự động, an toàn</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Truyền dữ liệu</td><td style="padding:8px 12px;"><code>arguments</code> thủ công</td><td style="padding:8px 12px;"><strong>SafeArgs</strong> — kiểm tra kiểu lúc compile</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Animation chuyển cảnh</td><td style="padding:8px 12px;">Tự viết</td><td style="padding:8px 12px;">Khai báo trong graph</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Dùng khi nào</td><td style="padding:8px 12px;">Hiểu bản chất, trường hợp đặc biệt</td><td style="padding:8px 12px;"><strong>Mặc định cho app thực tế</strong></td></tr>
</table>
<h3>Fragment vs Compose</h3>
<table>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;font-weight:600;">Tiêu chí</td><td style="padding:8px 12px;font-weight:600;">Fragment + View</td><td style="padding:8px 12px;font-weight:600;">Jetpack Compose</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">UI khai báo</td><td style="padding:8px 12px;">XML</td><td style="padding:8px 12px;">Kotlin <code>@Composable</code></td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Đường cong học</td><td style="padding:8px 12px;">Dài, nhiều khái niệm cũ</td><td style="padding:8px 12px;">Hiện đại, ít boilerplate</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Tái sử dụng</td><td style="padding:8px 12px;">Tốt, đã kiểm chứng nhiều năm</td><td style="padding:8px 12px;">Tốt, đang là tương lai</td></tr>
  <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Dùng khi nào</td><td style="padding:8px 12px;">Codebase hiện có, cần View-based libs</td><td style="padding:8px 12px;">App mới, ưu tiên hiện đại</td></tr>
</table>

<h2>Sai lầm thường gặp</h2>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>ViewBinding Memory Leak:</strong><br/>Vòng đời View của Fragment có thể bị hủy và tạo lại (đưa vào backstack, xoay màn hình) trong khi instance Fragment vẫn sống.<br/><strong>Hậu quả:</strong> Không gán <code>_binding = null</code> trong <code>onDestroyView()</code> → GC không dọn được View cũ, rò rỉ bộ nhớ.<br/><strong>Giải pháp:</strong> Luôn gán <code>_binding = null</code> trong <code>onDestroyView()</code>, và gán <code>binding.recyclerView.adapter = null</code> khi có RecyclerView.</div></div>

<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Truyền dữ liệu bằng Constructor thay vì Arguments:</strong><br/><code>HomeFragment(val id: Int)</code> sẽ <strong>crash</strong> khi hệ điều hành tự khôi phục Fragment (sau khi process bị kill hoặc xoay màn hình) vì nó gọi constructor rỗng.<br/><strong>Giải pháp:</strong> Truyền dữ liệu qua <code>Bundle</code> (arguments) hoặc dùng <strong>SafeArgs</strong> (Navigation) hoặc <strong>Shared ViewModel</strong>.</div></div>

<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Thêm đè Fragment khi xoay màn hình:</strong><br/>Nếu gọi <code>beginTransaction().add(...)</code> không kiểm tra <code>savedInstanceState</code>, mỗi lần xoay màn hình sẽ thêm một bản Fragment chồng lên nhau.<br/><strong>Giải pháp:</strong> Chỉ add khi <code>savedInstanceState == null</code>, hoặc dùng Navigation Component (đã xử lý sẵn).</div></div>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Nhồi logic vào Fragment (Fat Fragment):</strong><br/>Để toàn bộ logic (gọi API, lưu DB, validate) trong Fragment.<br/><strong>Hậu quả:</strong> Khó test, dễ crash khi xoay màn hình.<br/><strong>Giải pháp:</strong> Đẩy logic xuống ViewModel/Repository. Fragment chỉ nhận State và render.</div></div>

<h2>Tư duy hệ thống</h2>
<p>Trong một dự án Clean Architecture, Fragment chỉ là một lớp mỏng ở Presentation Layer:</p>
<div class="mermaid">
flowchart TD
    F[Fragment — View] -->|gửi sự kiện| VM[ViewModel]
    VM -->|StateFlow| F
    VM --> UC[UseCase]
    UC --> R[Repository]
    R --> DS[(Room / Retrofit / DataStore)]
</div>
<p><strong>Nguyên tắc phụ thuộc:</strong> dữ liệu chảy một chiều <code>Data → ViewModel → Fragment</code>. Fragment <strong>không bao giờ</strong> gọi thẳng Repository hay API. Nhờ đó:</p>
<ul>
  <li>ViewModel test được độc lập, không cần Fragment.</li>
  <li>Thay toàn bộ UI (View → Compose) mà không đụng logic.</li>
  <li>Fragment luôn mỏng, dễ bảo trì.</li>
</ul>

<h2>Học tiếp gì?</h2>
<p>Fragment Overview là điểm vào của module Fragment. Để làm chủ, hãy học theo thứ tự:</p>
<ol>
  <li><strong>Fragment Lifecycle</strong> — nền tảng bắt buộc: phân biệt Fragment Lifecycle và View Lifecycle, dùng đúng <code>viewLifecycleOwner</code>.</li>
  <li><strong>Fragment State Changes</strong> — giữ trạng thái qua xoay màn hình, <code>onSaveInstanceState</code>, <code>SavedStateHandle</code>.</li>
  <li><strong>FragmentManager</strong> — hiểu sâu transaction, add/replace/remove, backstack, commit strategy.</li>
  <li><strong>Dialog and DialogFragment</strong> — màn hình dialog/bottom sheet có vòng đời riêng.</li>
</ol>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/guide/fragments" target="_blank">Fragments - Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/fragments/create" target="_blank">Create a fragment - Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/navigation/get-started" target="_blank">Get started with Jetpack Navigation - Android Developers</a></li>
  <li><a href="https://developer.android.com/topic/architecture" target="_blank">Guide to App Architecture - Android Developers</a></li>
</ul>
    `
  }

});

Object.assign(ANDROID_CONTENT, {

  'fragment-lifecycle': {
    title: '4.2.2.1 Fragment Lifecycle',
    summary: 'Hiểu sâu Fragment Lifecycle với 2 lớp vòng đời (Fragment vs View), callback flow khi navigate, backstack, cách dùng viewLifecycleOwner đúng cách, và phân biệt lifecycle show/hide (tab) so với replace trong app Single-Activity.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '24 phút',
    depth: 'deep-dive',
    tags: ['android', 'fragment', 'lifecycle', 'viewlifecycleowner', 'backstack', 'multi-tab', 'single-activity'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['activity-lifecycle', 'fragment-overview'],
    related: ['fragment-state-changes', 'fragment-manager'],
    learningOutcomes: [
      'Giải thích được toàn bộ Fragment Lifecycle callbacks và thứ tự gọi.',
      'Phân biệt được Fragment Lifecycle và View Lifecycle — điểm khác biệt cốt lõi so với Activity.',
      'Sử dụng đúng viewLifecycleOwner khi observe LiveData/Flow trong Fragment.',
      'Xác định được callback nào phù hợp để khởi tạo, bind data, giải phóng tài nguyên.',
      'Hiểu được lifecycle behavior khi Fragment bị đưa vào backstack.',
      'Phân biệt được lifecycle của show/hide (tab) so với replace (điều hướng sâu) trong app Single-Activity.'
    ],
    knowledgeGap: 'Không phân biệt Fragment Lifecycle và View Lifecycle dẫn đến memory leak khi observe LiveData bằng `this` thay vì `viewLifecycleOwner`, crash khi truy cập view sau onDestroyView, và duplicate observer khi Fragment quay lại từ backstack.',
    updatedAt: '2026-07-29',
    readTime: '20 phút',
    content: `
<h2>1. Vấn đề cần giải quyết</h2>
<p>Activity có <strong>một vòng đời duy nhất</strong>: từ <code>onCreate</code> đến <code>onDestroy</code>. Khi Activity bị destroy, toàn bộ UI đi theo.</p>
<p>Fragment thì khác. Fragment <strong>tách biệt sự tồn tại của chính nó</strong> (Fragment instance) và <strong>sự tồn tại của giao diện</strong> (View). Đây là điểm khác biệt cốt lõi tạo ra phần lớn bug và memory leak trong Android development.</p>
<p>Tình huống điển hình:</p>
<ul>
  <li>Bạn mở Fragment A → navigate sang Fragment B → Fragment A bị đưa vào <strong>backstack</strong></li>
  <li><strong>View của Fragment A bị destroy</strong> (để giải phóng bộ nhớ), nhưng <strong>Fragment A instance vẫn sống</strong> trong backstack</li>
  <li>Khi nhấn Back, Fragment A được khôi phục → View được tạo lại, nhưng Fragment instance vẫn là cái cũ</li>
</ul>
<p>Nếu không hiểu cơ chế này, bạn sẽ:</p>
<ul>
  <li>Observe LiveData bằng <code>this</code> → duplicate observer mỗi lần quay lại</li>
  <li>Truy cập <code>binding</code> sau <code>onDestroyView</code> → crash</li>
  <li>Không cleanup resource → memory leak</li>
</ul>

<h2>2. Fragment Lifecycle Callbacks — Toàn cảnh</h2>
<p>Fragment có nhiều callback hơn Activity vì phải xử lý thêm quá trình tạo/hủy View riêng biệt.</p>
<div class="mermaid">
stateDiagram-v2
    [*] --> onAttach: Fragment gắn vào Activity
    onAttach --> onCreate: Khởi tạo Fragment instance
    onCreate --> onCreateView: Tạo View hierarchy
    onCreateView --> onViewCreated: View đã sẵn sàng
    onViewCreated --> onStart: Visible cho user
    onStart --> onResume: Interactive

    onResume --> onPause: Mất focus
    onPause --> onStop: Không visible
    onStop --> onDestroyView: Hủy View (backstack)
    onDestroyView --> onCreateView: Quay lại từ backstack
    onDestroyView --> onDestroy: Hủy Fragment
    onDestroy --> onDetach: Tách khỏi Activity
    onDetach --> [*]
</div>

<h3>Ý nghĩa từng Callback</h3>
<table>
  <thead>
    <tr><th>Callback</th><th>Khi nào được gọi</th><th>Nên làm gì</th></tr>
  </thead>
  <tbody>
    <tr><td><code>onAttach(context)</code></td><td>Fragment gắn vào Activity/parent</td><td>Lấy reference đến Activity nếu cần (hiếm khi dùng)</td></tr>
    <tr><td><code>onCreate(...)</code></td><td>Khởi tạo Fragment instance</td><td>Khởi tạo ViewModel, nhận arguments, restore saved state</td></tr>
    <tr><td><code>onCreateView(...)</code></td><td>Tạo View hierarchy</td><td>Inflate layout (hoặc truyền layout qua constructor)</td></tr>
    <tr><td><code>onViewCreated(...)</code></td><td>View đã được tạo xong</td><td><strong>Callback quan trọng nhất</strong>: Bind data, setup listeners, observe LiveData/Flow</td></tr>
    <tr><td><code>onStart()</code></td><td>Fragment visible</td><td>Hiếm khi cần override</td></tr>
    <tr><td><code>onResume()</code></td><td>Fragment interactive (có focus)</td><td>Bắt đầu animation, camera, sensor</td></tr>
    <tr><td><code>onPause()</code></td><td>Mất focus (dialog overlay...)</td><td>Tạm dừng animation, camera</td></tr>
    <tr><td><code>onStop()</code></td><td>Không còn visible</td><td>Dừng heavy operations</td></tr>
    <tr><td><code>onDestroyView()</code></td><td>View bị hủy (backstack hoặc remove)</td><td><strong>Bắt buộc</strong>: Cleanup binding, adapter references</td></tr>
    <tr><td><code>onDestroy()</code></td><td>Fragment instance bị hủy</td><td>Cleanup final resources</td></tr>
    <tr><td><code>onDetach()</code></td><td>Tách khỏi Activity</td><td>Hiếm khi cần override</td></tr>
  </tbody>
</table>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Quy tắc 80/20:</strong> Trong thực tế, bạn chỉ cần override 3 callbacks: <code>onCreate</code> (ViewModel), <code>onViewCreated</code> (UI logic), và <code>onDestroyView</code> (cleanup binding). Các callback còn lại rất hiếm khi cần.</div></div>

<h2>3. View Lifecycle — Điểm khác biệt cốt lõi</h2>
<p>Đây là khái niệm <strong>không tồn tại trong Activity</strong> và là nguồn gốc của phần lớn bug Fragment.</p>

<h3>Hai Lifecycle trong một Fragment</h3>
<div class="mermaid">
flowchart LR
    subgraph FL["Fragment Lifecycle (this)"]
        direction TB
        A[onCreate] --> B[onCreateView]
        B --> C[onViewCreated]
        C --> D[onStart]
        D --> E[onResume]
        E --> F[onPause]
        F --> G[onStop]
        G --> H[onDestroyView]
        H --> I[onDestroy]
    end

    subgraph VL["View Lifecycle (viewLifecycleOwner)"]
        direction TB
        V1["INITIALIZED<br/>(onCreateView)"] --> V2["CREATED<br/>(onViewCreated)"]
        V2 --> V3["STARTED<br/>(onStart)"]
        V3 --> V4["RESUMED<br/>(onResume)"]
        V4 --> V5["STARTED<br/>(onPause)"]
        V5 --> V6["CREATED<br/>(onStop)"]
        V6 --> V7["DESTROYED<br/>(onDestroyView)"]
    end

    style FL fill:#1976D2,stroke:#0D47A1,color:#fff
    style VL fill:#4CAF50,stroke:#388E3C,color:#fff
</div>

<p><strong>Fragment Lifecycle (<code>this</code>):</strong> Kéo dài từ <code>onAttach</code> đến <code>onDetach</code>. Fragment instance tồn tại trong bộ nhớ suốt khoảng này.</p>
<p><strong>View Lifecycle (<code>viewLifecycleOwner</code>):</strong> Chỉ tồn tại từ <code>onCreateView</code> đến <code>onDestroyView</code>. Mỗi lần Fragment quay lại từ backstack, một View Lifecycle mới được tạo, nhưng Fragment Lifecycle không thay đổi.</p>

<h3>Tại sao cần phân biệt?</h3>
<p>Khi bạn observe LiveData hoặc collect Flow, bạn cần chọn đúng LifecycleOwner:</p>
<pre data-lang="kotlin"><code>// ❌ SAI — Dùng Fragment lifecycle (this)
// Observer KHÔNG bị remove khi view bị destroy (backstack)
// → Mỗi lần quay lại, thêm 1 observer mới → duplicate updates
viewModel.users.observe(this) { users -&gt;
    binding.recyclerView.adapter = UsersAdapter(users)
}

// ✅ ĐÚNG — Dùng View lifecycle (viewLifecycleOwner)
// Observer tự động bị remove khi view destroy
// → Quay lại từ backstack, observer mới được tạo, không duplicate
viewModel.users.observe(viewLifecycleOwner) { users -&gt;
    binding.recyclerView.adapter = UsersAdapter(users)
}</code></pre>

<p>Tương tự cho Flow:</p>
<pre data-lang="kotlin"><code>// ✅ ĐÚNG — collect trong viewLifecycleOwner scope
viewLifecycleOwner.lifecycleScope.launch {
    viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
        viewModel.uiState.collect { state -&gt;
            updateUI(state)
        }
    }
}</code></pre>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Quy tắc vàng:</strong> Bất kỳ operation nào liên quan đến <strong>View</strong> (observe, bind, click listener, adapter) đều phải dùng <code>viewLifecycleOwner</code>. Chỉ dùng <code>this</code> (Fragment lifecycle) cho những thứ không liên quan đến View (ví dụ: log analytics event).</div></div>

<h2>4. Lifecycle khi Fragment trong Backstack</h2>
<p>Khi Fragment bị đưa vào backstack (ví dụ: navigate từ A sang B bằng <code>replace</code> + <code>addToBackStack</code>), chuỗi callback xảy ra khác với khi Fragment bị remove hoàn toàn.</p>

<div class="mermaid">
sequenceDiagram
    participant A as Fragment A
    participant FM as FragmentManager
    participant B as Fragment B

    Note over A: Đang hiển thị (RESUMED)
    FM->>A: onPause()
    FM->>A: onStop()
    FM->>A: onDestroyView()
    Note over A: View bị hủy, nhưng instance CÒN SỐNG
    FM->>B: onAttach() → onCreate()
    FM->>B: onCreateView() → onViewCreated()
    FM->>B: onStart() → onResume()
    Note over B: Đang hiển thị

    Note over B: User nhấn Back
    FM->>B: onPause() → onStop()
    FM->>B: onDestroyView() → onDestroy() → onDetach()
    Note over B: Bị hủy hoàn toàn

    FM->>A: onCreateView()
    FM->>A: onViewCreated()
    FM->>A: onStart() → onResume()
    Note over A: View được TẠO LẠI, instance vẫn là cũ
</div>

<h2>5. Triển khai thực tế — Fragment chuẩn Production</h2>
<h3>Pattern hoàn chỉnh</h3>
<pre data-lang="kotlin"><code>class ProductListFragment : Fragment(R.layout.fragment_product_list) {

    // ViewModel — khởi tạo bằng delegate, tồn tại theo Fragment lifecycle
    private val viewModel: ProductListViewModel by viewModels()

    // ViewBinding — phải nullable vì View lifecycle ngắn hơn Fragment lifecycle
    private var _binding: FragmentProductListBinding? = null
    private val binding get() = _binding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Chỉ thực hiện 1 lần khi Fragment instance được tạo
        // Không liên quan đến View
        val categoryId = arguments?.getString("category_id")
        viewModel.loadProducts(categoryId)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = FragmentProductListBinding.bind(view)

        // Setup UI components
        val adapter = ProductAdapter { product -&gt;
            // Navigate to detail
        }
        binding.recyclerView.adapter = adapter

        // Observe data — PHẢI dùng viewLifecycleOwner
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.products.collect { products -&gt;
                    adapter.submitList(products)
                }
            }
        }
    }

    override fun onDestroyView() {
        // Cleanup TRƯỚC khi gọi super
        // Tránh memory leak từ RecyclerView adapter giữ reference đến views
        binding.recyclerView.adapter = null
        _binding = null
        super.onDestroyView()
    }
}</code></pre>

<h2>6. Ứng dụng đa tab / Single-Activity — show/hide giữ View sống</h2>
<p>Trong app Single-Activity, Bottom Navigation chứa nhiều tab, mỗi tab là một Fragment. Khi chuyển tab bạn có <strong>hai cách</strong>, và chúng kích hoạt lifecycle <strong>khác nhau hoàn toàn</strong>:</p>
<table>
  <thead>
    <tr><th>Hành vi</th><th><code>replace</code></th><th><code>show</code> / <code>hide</code></th></tr>
  </thead>
  <tbody>
    <tr><td>Fragment cũ nhận callback đến đâu?</td><td><code>onDestroyView</code></td><td><code>onStop</code> (dừng ở đó)</td></tr>
    <tr><td>View cũ</td><td>Bị hủy</td><td>Giữ nguyên</td></tr>
    <tr><td>Quay lại tab</td><td><code>onCreateView</code> → <code>onViewCreated</code> lại từ đầu</td><td>Chỉ <code>onStart</code> → <code>onResume</code></td></tr>
    <tr><td>State UI (scroll, input)</td><td>Mất → phải lưu/restore</td><td>Giữ nguyên</td></tr>
    <tr><td>Observer trong <code>viewLifecycleOwner</code></td><td>Bị remove</td><td>Vẫn hoạt động</td></tr>
    <tr><td>Khi nào dùng</td><td>Điều hướng sâu (list → detail)</td><td>Bottom nav / tab cố định</td></tr>
  </tbody>
</table>

<div class="mermaid">
sequenceDiagram
    participant User
    participant FM as FragmentManager
    participant TabA as Fragment Home (đang hiện)
    participant TabB as Fragment Profile (ẩn)

    User->>FM: Chuyển tab Home → Profile
    FM->>TabA: onPause()
    FM->>TabA: onStop()
    Note over TabA: View VẪN SỐNG (không onDestroyView)
    FM->>TabB: onStart()
    FM->>TabB: onResume()
    Note over TabB: View cũ được tái sử dụng
</div>

<pre data-lang="kotlin"><code>// MainActivity — Single-Activity với Bottom Navigation
class MainActivity : AppCompatActivity() {

    private lateinit var currentTab: Fragment

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // System tự restore các Fragment khi quay lại — đừng add lại nếu đã có state
        if (savedInstanceState == null) {
            currentTab = HomeFragment()
            supportFragmentManager.beginTransaction()
                .add(R.id.fragment_container, currentTab, "home")
                .commit()
        }
    }

    // Chuyển tab dùng show/hide để GIỮ View sống
    private fun switchTab(target: Fragment) {
        supportFragmentManager.beginTransaction().apply {
            if (target == currentTab) return
            hide(currentTab)
            if (!target.isAdded) {
                add(R.id.fragment_container, target)
            } else {
                show(target)
            }
        }.commit()
        currentTab = target
    }
}</code></pre>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Vì sao show/hide giữ được state?</strong> Vì <code>hide()</code> chỉ đưa Fragment về mức <code>STARTED</code>/<code>STOPPED</code>, không phải <code>DESTROYED</code>. View và instance đều sống → <code>viewLifecycleOwner</code> vẫn hoạt động, observer không bị remove, scroll position của RecyclerView được giữ nguyên.</div></div>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Đừng nhầm hai tình huống:</strong><br/><strong>Điều hướng sâu</strong> (list → detail): dùng <code>replace</code> — View cũ nên bị hủy để tiết kiệm bộ nhớ.<br/><strong>Chuyển tab cố định</strong> (Bottom Nav): dùng <code>show</code>/<code>hide</code> — View nên sống để không load lại data mỗi lần đổi tab.<br/><br/>Dùng sai chiều sẽ gây: <code>replace</code> cho tab → app lag + mất state mỗi lần đổi; <code>show</code>/<code>hide</code> cho điều hướng sâu → nhiều Fragment chồng lên nhau, tốn bộ nhớ.</div></div>

<h2>7. So sánh Fragment Lifecycle vs Activity Lifecycle</h2>
<table>
  <thead>
    <tr><th>Đặc điểm</th><th>Activity</th><th>Fragment</th></tr>
  </thead>
  <tbody>
    <tr><td>Số lượng Lifecycle</td><td>1</td><td>2 (Fragment + View)</td></tr>
    <tr><td>LifecycleOwner cho observe</td><td><code>this</code></td><td><code>viewLifecycleOwner</code></td></tr>
    <tr><td>View có thể bị hủy riêng?</td><td>Không</td><td>Có (backstack)</td></tr>
    <tr><td>Callback tạo View</td><td><code>setContentView</code> trong <code>onCreate</code></td><td><code>onCreateView</code> / <code>onViewCreated</code></td></tr>
    <tr><td>Cleanup binding</td><td>Không cần</td><td><strong>Bắt buộc</strong> trong <code>onDestroyView</code></td></tr>
    <tr><td>Tồn tại khi view bị hủy?</td><td>Không áp dụng</td><td>Có (trong backstack)</td></tr>
  </tbody>
</table>

<h2>8. Trade-offs &amp; Pitfalls</h2>
<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Memory Leak — observe bằng <code>this</code>:</strong><br/>Đây là lỗi phổ biến nhất. Nếu bạn gọi <code>viewModel.data.observe(this, observer)</code>, observer <strong>không bị remove</strong> khi view bị destroy (backstack). Mỗi lần <code>onViewCreated</code> được gọi lại, bạn thêm thêm một observer mới. Kết quả: UI update nhiều lần, memory leak, và có thể crash.<br/><strong>Fix:</strong> Luôn dùng <code>viewLifecycleOwner</code>.</div></div>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Truy cập binding sau onDestroyView:</strong><br/>Nếu bạn có callback bất đồng bộ (delay, network callback) trả về sau khi view đã bị destroy, <code>binding</code> sẽ là <code>null</code> (vì bạn đã gán <code>_binding = null</code>). Nếu dùng <code>binding!!</code> → crash <code>NullPointerException</code>.<br/><strong>Fix:</strong> Dùng <code>viewLifecycleOwner.lifecycleScope</code> — coroutine tự cancel khi view destroy. Hoặc kiểm tra <code>_binding != null</code> trước khi truy cập.</div></div>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>RecyclerView Adapter leak:</strong><br/>RecyclerView giữ strong reference đến Adapter, Adapter giữ reference đến ViewHolder, ViewHolder giữ reference đến View. Nếu không set <code>recyclerView.adapter = null</code> trong <code>onDestroyView</code>, toàn bộ chuỗi này sẽ không được GC thu hồi khi Fragment trong backstack.<br/><strong>Fix:</strong> Gán <code>binding.recyclerView.adapter = null</code> trong <code>onDestroyView()</code>, <strong>trước</strong> <code>_binding = null</code>.</div></div>

<h2>9. Nên học tiếp</h2>
<p>Fragment Lifecycle là nền tảng. Hai chủ đề kế tiếp đào sâu vào các khía cạnh bạn cần khi xây app thực tế:</p>
<ul>
  <li><strong><a href="#" onclick="openTopic('fragment-state-changes'); return false;">Fragment State Changes</a></strong> — lưu &amp; khôi phục state khi xoay màn hình, Process Death: <code>arguments</code>, ViewModel, <code>SavedStateHandle</code>. Đây là phần bạn cần sau khi nắm rõ lifecycle vì recreate luôn đi kèm lifecycle.</li>
  <li><strong><a href="#" onclick="openTopic('fragment-manager'); return false;">FragmentManager</a></strong> — transaction (<code>add</code>/<code>replace</code>/<code>remove</code>), backstack, commit strategy. Nguồn gốc của cách <code>show</code>/<code>hide</code> ở trên vận hành.</li>
</ul>

<h2>10. Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/guide/fragments/lifecycle" target="_blank">Fragment Lifecycle - Android Developers</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/lifecycle" target="_blank">Handling Lifecycles with Lifecycle-Aware Components</a></li>
</ul>
    `
  },

  'fragment-state-changes': {
    title: '4.2.2.2 Fragment State Changes',
    summary: 'Hiểu cơ chế Fragment bị recreate, phân biệt Configuration Change vs Process Death, và sử dụng đúng Arguments, ViewModel, SavedStateHandle để bảo toàn dữ liệu.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '20 phút',
    depth: 'deep-dive',
    tags: ['android', 'fragment', 'state', 'configuration-change', 'viewmodel', 'savedstatehandle', 'arguments'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['fragment-lifecycle', 'activity-state-changes'],
    related: ['fragment-manager', 'activity-parcelables-bundle'],
    learningOutcomes: [
      'Phân biệt được các tình huống Fragment bị recreate và hành vi tương ứng.',
      'Giải thích được sự khác biệt giữa Arguments, onSaveInstanceState và ViewModel trong Fragment.',
      'Áp dụng được SavedStateHandle để survive process death.',
      'Phân biệt được viewModels() vs activityViewModels() và chọn đúng scope.',
      'Nhận diện được setRetainInstance đã deprecated và giải pháp thay thế.'
    ],
    knowledgeGap: 'Không hiểu cơ chế recreate của Fragment dẫn đến mất dữ liệu form khi xoay màn hình, duplicate network call khi Configuration Change, crash khi process bị kill do không lưu state đúng cách.',
    updatedAt: '2026-08-04',
    readTime: '20 phút',
    content: `
<h2>1. Vấn đề cần giải quyết</h2>
<p>Fragment thừa hưởng vấn đề Configuration Change từ Activity: <strong>khi xoay màn hình, đổi ngôn ngữ, hoặc thay đổi font size — Fragment bị destroy và tạo lại</strong>.</p>
<p>Nhưng Fragment có thêm những tình huống phức tạp hơn Activity:</p>
<ul>
  <li>Fragment bị destroy view nhưng instance vẫn sống (backstack)</li>
  <li>Fragment có <code>arguments</code> Bundle tồn tại xuyên suốt vòng đời</li>
  <li>Fragment có thể dùng ViewModel scope theo Activity hoặc scope theo chính nó</li>
  <li><code>setRetainInstance(true)</code> từng là giải pháp phổ biến nhưng đã <strong>deprecated</strong></li>
</ul>

<h2>2. Sau khi học xong</h2>
<ul>
  <li>Phân biệt được các tình huống Fragment bị recreate và hành vi tương ứng.</li>
  <li>Giải thích được sự khác biệt giữa Arguments, onSaveInstanceState và ViewModel trong Fragment.</li>
  <li>Áp dụng được SavedStateHandle để survive process death.</li>
  <li>Phân biệt được viewModels() vs activityViewModels() và chọn đúng scope.</li>
  <li>Nhận diện được setRetainInstance đã deprecated và giải pháp thay thế.</li>
</ul>

<h2>3. Các tình huống Fragment bị Recreate</h2>
<div class="mermaid">
flowchart TD
    A[Fragment đang chạy] --> B{Tình huống?}
    
    B --> C[Configuration Change<br/>Xoay màn hình, đổi locale]
    B --> D[Process Death<br/>Hệ thống kill app ở background]
    B --> E[Back từ Backstack<br/>User nhấn Back]
    B --> F[Fragment bị Remove<br/>FragmentTransaction.remove]

    C --> C1[Fragment destroy + recreate<br/>savedInstanceState ≠ null<br/>arguments ĐƯỢC giữ]
    D --> D1[Fragment destroy + recreate<br/>savedInstanceState ≠ null<br/>arguments ĐƯỢC giữ<br/>ViewModel BỊ MẤT]
    E --> E1[Chỉ View bị recreate<br/>Fragment instance KHÔNG đổi<br/>ViewModel CÒN]
    F --> F1[Fragment bị hủy hoàn toàn<br/>Mọi thứ bị mất]

    style C fill:#FF9800,stroke:#F57C00,color:#fff
    style D fill:#f44336,stroke:#d32f2f,color:#fff
    style E fill:#4CAF50,stroke:#388E3C,color:#fff
    style F fill:#9E9E9E,stroke:#757575,color:#fff
</div>

<h3>Chi tiết từng tình huống</h3>
<table>
  <thead>
    <tr><th>Tình huống</th><th>Fragment instance</th><th>View</th><th>Arguments</th><th>savedInstanceState</th><th>ViewModel</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Configuration Change</strong></td><td>Destroy → New</td><td>Destroy → New</td><td>✅ Giữ</td><td>✅ Có data</td><td>✅ Giữ</td></tr>
    <tr><td><strong>Process Death</strong></td><td>Destroy → New</td><td>Destroy → New</td><td>✅ Giữ</td><td>✅ Có data</td><td>❌ Mất</td></tr>
    <tr><td><strong>Back từ Backstack</strong></td><td>Giữ nguyên</td><td>Destroy → New</td><td>✅ Giữ</td><td>null</td><td>✅ Giữ</td></tr>
    <tr><td><strong>Remove</strong></td><td>Destroy</td><td>Destroy</td><td>Mất</td><td>Mất</td><td>Mất</td></tr>
  </tbody>
</table>

<div class="callout callout-info"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Arguments luôn được bảo toàn</strong> qua mọi tình huống recreate (Configuration Change, Process Death). Đây là lý do bạn phải truyền dữ liệu khởi tạo qua <code>arguments</code> Bundle thay vì constructor parameter.</div></div>

<h2>4. Ba công cụ lưu State</h2>
<h3>1. Arguments (Bundle khởi tạo)</h3>
<p>Arguments là Bundle gắn vào Fragment <strong>trước khi</strong> Fragment được add vào FragmentManager. Nó tồn tại xuyên suốt vòng đời Fragment.</p>
<pre data-lang="kotlin"><code>// Tạo Fragment với Arguments
val fragment = ProductDetailFragment().apply {
    arguments = Bundle().apply {
        putString("product_id", "SKU-12345")
    }
}

// Hoặc dùng companion object pattern
class ProductDetailFragment : Fragment(R.layout.fragment_product_detail) {
    companion object {
        fun newInstance(productId: String) = ProductDetailFragment().apply {
            arguments = Bundle().apply {
                putString("product_id", productId)
            }
        }
    }
    
    private val productId: String by lazy {
        requireArguments().getString("product_id")!!
    }
}</code></pre>
<p><strong>Khi nào dùng:</strong> Truyền dữ liệu khởi tạo (ID, filter params, config). Giới hạn ~1MB cho toàn bộ transaction buffer.</p>

<h3>2. ViewModel (In-memory state)</h3>
<p>ViewModel tồn tại qua Configuration Change nhưng <strong>mất khi Process Death</strong>.</p>
<pre data-lang="kotlin"><code>class ProductDetailFragment : Fragment(R.layout.fragment_product_detail) {
    // Scope theo Fragment — mỗi instance Fragment có ViewModel riêng
    private val viewModel: ProductDetailViewModel by viewModels()
}</code></pre>

<h3>3. SavedStateHandle (Survive Process Death)</h3>
<p>SavedStateHandle kết hợp ưu điểm của ViewModel (reactive) và savedInstanceState (survive process death).</p>
<pre data-lang="kotlin"><code>class ProductDetailViewModel(
    private val savedStateHandle: SavedStateHandle
) : ViewModel() {
    val searchQuery = savedStateHandle.getStateFlow("query", "")
    fun updateQuery(query: String) {
        savedStateHandle["query"] = query
    }
}</code></pre>

<h2>5. Ma trận quyết định — Chọn đúng công cụ</h2>
<div class="mermaid">
flowchart TD
    A[Cần lưu dữ liệu gì?] --> B{Data khởi tạo<br/>từ bên ngoài?}
    B -->|Có| C[Arguments Bundle]
    
    B -->|Không| D{Cần survive<br/>Process Death?}
    D -->|Không| E{Data nặng?<br/>List, Object lớn}
    E -->|Có| F[ViewModel]
    E -->|Không| F
    
    D -->|Có| G{Data nhỏ và<br/>serializable?}
    G -->|Có| H[SavedStateHandle]
    G -->|Không| I[ViewModel + SavedStateHandle<br/>Cache key trong SavedStateHandle<br/>Data trong ViewModel]

    style C fill:#2196F3,stroke:#1565C0,color:#fff
    style F fill:#4CAF50,stroke:#388E3C,color:#fff
    style H fill:#FF9800,stroke:#F57C00,color:#fff
    style I fill:#9C27B0,stroke:#7B1FA2,color:#fff
</div>
<table>
  <thead>
    <tr><th>Loại dữ liệu</th><th>Công cụ</th><th>Ví dụ</th></tr>
  </thead>
  <tbody>
    <tr><td>ID, config, filter params</td><td><strong>Arguments</strong></td><td><code>product_id</code>, <code>category</code></td></tr>
    <tr><td>Network response, processed data</td><td><strong>ViewModel</strong></td><td>Danh sách sản phẩm, user profile</td></tr>
    <tr><td>User input, UI state nhỏ</td><td><strong>SavedStateHandle</strong></td><td>Search query, selected tab</td></tr>
    <tr><td>Large data + survive process death</td><td><strong>ViewModel + SavedStateHandle</strong></td><td>Cache key trong SavedStateHandle, data trong ViewModel</td></tr>
  </tbody>
</table>

<h2>6. ViewModel Scoping — viewModels() vs activityViewModels()</h2>
<p>Fragment có thể chọn scope cho ViewModel:</p>
<pre data-lang="kotlin"><code>class FragmentA : Fragment() {
    // Scope theo Fragment — ViewModel riêng cho Fragment này
    private val viewModel: MyViewModel by viewModels()
    
    // Scope theo Activity — chia sẻ với tất cả Fragment trong Activity
    private val sharedViewModel: SharedViewModel by activityViewModels()
    
    // Scope theo Navigation Graph — chia sẻ trong cùng nav graph
    private val navViewModel: NavViewModel by navGraphViewModels(R.id.main_nav_graph)
}</code></pre>
<div class="mermaid">
flowchart TD
    subgraph Activity
        subgraph "activityViewModels() scope"
            SVM[SharedViewModel]
        end
        
        subgraph FragA["Fragment A"]
            VMA[viewModels<br/>ViewModel A]
        end
        
        subgraph FragB["Fragment B"]
            VMB[viewModels<br/>ViewModel B]
        end
        
        FragA -.->|access| SVM
        FragB -.->|access| SVM
    end

    style SVM fill:#FF9800,stroke:#F57C00,color:#fff
    style VMA fill:#4CAF50,stroke:#388E3C,color:#fff
    style VMB fill:#4CAF50,stroke:#388E3C,color:#fff
</div>
<p><strong>Quy tắc chọn scope:</strong></p>
<ul>
  <li><code>viewModels()</code> — Dữ liệu thuộc riêng Fragment (product detail, form data)</li>
  <li><code>activityViewModels()</code> — Dữ liệu chia sẻ giữa các Fragment (selected item, auth state)</li>
  <li><code>navGraphViewModels()</code> — Dữ liệu chia sẻ trong một luồng navigation cụ thể (checkout flow)</li>
</ul>

<h2>7. setRetainInstance — Deprecated và thay thế</h2>
<p>Trước đây, <code>setRetainInstance(true)</code> cho phép Fragment instance tồn tại qua configuration change (Activity bị recreate nhưng Fragment instance giữ nguyên). Cách này đã <strong>deprecated từ API 28</strong>.</p>
<p><strong>Lý do deprecated:</strong></p>
<ul>
  <li>Gây rối loạn lifecycle: Fragment instance sống nhưng host Activity mới, context cũ bị leak</li>
  <li>Không tương thích với Navigation Component</li>
  <li>ViewModel đã giải quyết hoàn toàn nhu cầu retain data qua configuration change</li>
</ul>
<p><strong>Thay thế:</strong> Dùng <code>ViewModel</code> cho mọi trường hợp cần retain data.</p>

<h2>8. Triển khai thực tế — Fragment với đầy đủ State Management</h2>
<pre data-lang="kotlin"><code>class EditProfileFragment : Fragment(R.layout.fragment_edit_profile) {

    // ViewModel với SavedStateHandle — survive cả process death
    private val viewModel: EditProfileViewModel by viewModels()

    private var _binding: FragmentEditProfileBinding? = null
    private val binding get() = _binding!!

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = FragmentEditProfileBinding.bind(view)

        // Restore UI state từ ViewModel (survive config change)
        // SavedStateHandle bên trong ViewModel giữ draft data (survive process death)
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.uiState.collect { state -&gt;
                    binding.etName.setText(state.name)
                    binding.etEmail.setText(state.email)
                    binding.btnSave.isEnabled = state.isValid
                }
            }
        }

        // Lưu user input vào ViewModel (auto-save draft)
        binding.etName.doAfterTextChanged { text -&gt;
            viewModel.updateName(text.toString())
        }

        binding.etEmail.doAfterTextChanged { text -&gt;
            viewModel.updateEmail(text.toString())
        }
    }

    override fun onDestroyView() {
        _binding = null
        super.onDestroyView()
    }
}</code></pre>
<pre data-lang="kotlin"><code>class EditProfileViewModel(
    private val savedStateHandle: SavedStateHandle
) : ViewModel() {

    // Draft data — survive process death
    val uiState: StateFlow&lt;EditProfileState&gt; = combine(
        savedStateHandle.getStateFlow("name", ""),
        savedStateHandle.getStateFlow("email", "")
    ) { name, email -&gt;
        EditProfileState(
            name = name,
            email = email,
            isValid = name.isNotBlank() &amp;&amp; email.contains("@")
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), EditProfileState())

    fun updateName(name: String) { savedStateHandle["name"] = name }
    fun updateEmail(email: String) { savedStateHandle["email"] = email }
}</code></pre>

<h2>9. So sánh với Activity State Changes</h2>
<p>Cơ chế cốt lõi giống nhau: cả Activity lẫn Fragment đều bị destroy/recreate khi Configuration Change, đều dùng <code>onSaveInstanceState</code> / SavedStateHandle để survive Process Death, đều dựa vào ViewModel để giữ dữ liệu qua xoay màn hình. Bạn đã học phần này ở topic <strong>4.2.1.2 Activity State Changes</strong>.</p>
<table>
  <thead>
    <tr><th>Đặc điểm</th><th>Activity (4.2.1.2)</th><th>Fragment (4.2.2.2)</th></tr>
  </thead>
  <tbody>
    <tr><td>Số vòng đời</td><td>1 (Activity)</td><td>2 (Fragment + View)</td></tr>
    <tr><td>View có bị destroy riêng?</td><td>Không</td><td>Có — vào backstack thì View destroy, instance sống</td></tr>
    <tr><td>Dữ liệu khởi tạo</td><td>Intent extras</td><td><code>arguments</code> Bundle</td></tr>
    <tr><td>LifecycleOwner để observe</td><td><code>this</code></td><td><code>viewLifecycleOwner</code></td></tr>
    <tr><td>ViewModel scope</td><td>Scope theo Activity</td><td><code>viewModels()</code> (theo Fragment) / <code>activityViewModels()</code> (theo Activity)</td></tr>
    <tr><td>Ai lưu state khi recreate</td><td>Hệ thống</td><td>FragmentManager lưu &amp; khôi phục từng Fragment + backstack</td></tr>
    <tr><td>Survive process death</td><td>SavedStateHandle / Bundle</td><td>SavedStateHandle / Bundle (giống)</td></tr>
    <tr><td>Giải pháp cũ đã deprecated</td><td>—</td><td><code>setRetainInstance</code> (deprecated từ API 28)</td></tr>
  </tbody>
</table>
<p><strong>Điểm thực chiến quan trọng nhất:</strong> với Activity, hệ thống quản lý <code>savedInstanceState</code> của Activity; với Fragment, <strong>FragmentManager</strong> chịu trách nhiệm lưu/khôi phục state của mọi Fragment đang quản lý (kể cả Fragment nằm trong backstack). Khi xoay màn hình, FragmentManager tự khôi phục đúng Fragment đang hiển thị — bạn chỉ cần lo phần dữ liệu (arguments, ViewModel, SavedStateHandle), không cần tự tay khôi phục Fragment instance.</p>

<h2>10. Trade-offs &amp; Pitfalls</h2>
<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Không dùng constructor parameter để truyền data:</strong><br/><code>class MyFragment(val userId: String)</code> sẽ crash khi system recreate Fragment vì system gọi <strong>no-args constructor</strong>.<br/><strong>Fix:</strong> Dùng <code>arguments</code> Bundle hoặc SafeArgs (Jetpack Navigation).</div></div>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>activityViewModels() leak concern:</strong><br/>ViewModel scope theo Activity tồn tại cho đến khi Activity bị destroy. Nếu Fragment chỉ cần data tạm thời mà dùng <code>activityViewModels()</code>, data sẽ chiếm bộ nhớ suốt vòng đời Activity.<br/><strong>Fix:</strong> Chỉ dùng <code>activityViewModels()</code> cho data thực sự cần chia sẻ. Dùng <code>viewModels()</code> cho data riêng.</div></div>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>SavedStateHandle giới hạn size:</strong><br/>SavedStateHandle lưu qua <code>onSaveInstanceState</code> → giới hạn ~1MB cho toàn bộ Bundle. Không lưu bitmap, large list, hoặc complex object.<br/><strong>Fix:</strong> Lưu key/ID trong SavedStateHandle, re-fetch data khi restore.</div></div>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Test Process Death dễ dàng:</strong><br/>Android Studio → "Don't Keep Activities" (Developer Options) mô phỏng một phần process death. Để test chính xác hơn: mở app → nhấn Home → chạy <code>adb shell am kill &lt;package_name&gt;</code> → mở lại app từ Recent.</div></div>

<h2>11. Nên học tiếp</h2>
<ul>
  <li><strong><a href="#" onclick="openTopic('fragment-manager'); return false;">FragmentManager</a></strong> — transaction (<code>add</code>/<code>replace</code>/<code>remove</code>), backstack, và cách FragmentManager lưu/khôi phục state của từng Fragment.</li>
  <li><strong><a href="#" onclick="openTopic('fragment-dialog'); return false;">Dialog and DialogFragment</a></strong> — màn hình dialog có vòng đời riêng và cách lưu state khi rotate.</li>
  <li><strong><a href="#" onclick="openTopic('activity-state-changes'); return false;">Activity State Changes</a></strong> — nền tảng mà Fragment State Changes thừa hưởng.</li>
</ul>

<h2>12. Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/topic/libraries/architecture/saving-states" target="_blank">Save UI States - Android Developers</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/viewmodel" target="_blank">ViewModel Overview - Android Developers</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-savedstate" target="_blank">SavedStateHandle - Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/fragments/communicate#fragment-result" target="_blank">Fragment Arguments - Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/components/activities/activity-lifecycle" target="_blank">Activity lifecycle / state changes - Android Developers</a></li>
</ul>
    `
  },

  'fragment-manager': {
    title: '4.2.2.3 FragmentManager',
    summary: 'Hiểu bản chất FragmentManager - thành phần trung tâm quản lý vòng đời Fragment, điều hướng Back Stack và giao tiếp giữa các Fragment trong ứng dụng Android.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['android', 'fragment', 'fragment-manager', 'navigation', 'mvvm'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['fragment-lifecycle', 'fragment-state-changes'],
    related: ['navigation-component', 'activity-lifecycle'],
    learningOutcomes: [
      'Giải thích được vai trò và cơ chế hoạt động của FragmentManager trong hệ thống Fragment.',
      'Phân biệt được FragmentTransaction, Back Stack và các chiến lược commit.',
      'Áp dụng được các pattern giao tiếp giữa các Fragment (Shared ViewModel, Fragment Result API).',
      'Triển khai được Child Fragment cho các trường hợp nested navigation.',
      'So sánh được FragmentManager với Navigation Component và biết khi nào dùng cái nào.',
      'Áp dụng được best practices để tránh các lỗi phổ biến khi làm việc với FragmentManager.'
    ],
    knowledgeGap: 'Không hiểu FragmentManager dẫn đến crash IllegalStateException khi commit sau onSaveInstanceState, Fragment overlapping khi dùng sai add/replace, memory leak do communication sai pattern, và không kiểm soát được Back Stack trong các trường hợp phức tạp.',
    updatedAt: '2026-08-04',
    readTime: '35 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Fragment không tự quản lý chính mình. Nó không thể tự thêm vào UI, tự thay thế Fragment khác, hay tự quay lại Fragment trước. Tất cả những thao tác này đều cần một "người quản lý" — đó chính là <strong>FragmentManager</strong>.</p>
<p>FragmentManager giải quyết 3 vấn đề cốt lõi:</p>
<ul>
  <li><strong>Tách biệt trách nhiệm quản lý</strong> — Activity không cần biết chi tiết về vòng đời của từng Fragment.</li>
  <li><strong>Cung cấp API thống nhất</strong> — FragmentTransaction thay thế cho việc thao tác View trực tiếp.</li>
  <li><strong>Tự động xử lý cấu hình thay đổi</strong> — Lưu trữ và khôi phục trạng thái Fragment khi Activity bị destroy/recreate.</li>
</ul>
<p>Hiểu FragmentManager là nền tảng để hiểu tại sao Jetpack Navigation Component hoạt động được — bởi Navigation Component là abstraction layer phía trên FragmentManager.</p>

<h2>FragmentManager là gì?</h2>
<p>FragmentManager là thành phần trung tâm trong hệ thống Fragment của Android, chịu trách nhiệm:</p>
<ul>
  <li><strong>Quản lý vòng đời</strong> của tất cả Fragment trong Activity.</li>
  <li><strong>Thực hiện các thao tác</strong> (thêm, xóa, thay thế, ẩn/hiện) thông qua FragmentTransaction.</li>
  <li><strong>Quản lý Back Stack</strong> — điều hướng ngược qua các Fragment.</li>
  <li><strong>Tìm kiếm Fragment</strong> theo ID hoặc tag.</li>
  <li><strong>Phối hợp với Activity</strong> để đồng bộ trạng thái khi cấu hình thay đổi (rotation, dark mode...).</li>
</ul>
<p>FragmentManager không phải là một class bạn tự khởi tạo. Nó được cung cấp bởi Activity hoặc Fragment cha thông qua:</p>
<pre data-lang="kotlin"><code>// Trong Activity
val fragmentManager = supportFragmentManager

// Trong Fragment (để quản lý Child Fragment)
val childFragmentManager = childFragmentManager

// Trong Fragment (để truy cập FragmentManager của Activity cha)
val parentFragmentManager = parentFragmentManager</code></pre>

<h2>Cơ chế hoạt động</h2>
<div class="mermaid">
graph TB
    A[Activity] --> B[FragmentManager]
    B --> C[Fragment 1]
    B --> D[Fragment 2]
    B --> E[Fragment 3]
    B --> F[Back Stack]
    F --> G[Transaction 1]
    F --> H[Transaction 2]
    
    B --> I[FragmentLifecycleCallbacks]
    I --> J[Observer 1]
    I --> K[Observer 2]
    
    style B fill:#e1f5ff
    style F fill:#fff4e1
</div>
<p>FragmentManager hoạt động như một <strong>trung gian</strong> giữa Activity và các Fragment:</p>
<ol>
  <li><strong>Activity</strong> yêu cầu FragmentManager thực hiện thao tác (thêm Fragment, chuyển Fragment...).</li>
  <li><strong>FragmentManager</strong> tạo FragmentTransaction, thực thi thao tác.</li>
  <li><strong>FragmentManager</strong> cập nhật Back Stack nếu cần.</li>
  <li><strong>FragmentManager</strong> đồng bộ vòng đời của tất cả Fragment với Activity.</li>
</ol>

<h3>Vòng đời phối hợp</h3>
<div class="mermaid">
sequenceDiagram
    participant A as Activity
    participant FM as FragmentManager
    participant F as Fragment
    
    A->>FM: onCreate()
    FM->>F: onAttach()
    FM->>F: onCreate()
    FM->>F: onCreateView()
    FM->>F: onViewCreated()
    FM->>F: onStart()
    FM->>F: onResume()
    
    Note over A,F: Activity running
    
    A->>FM: onPause()
    FM->>F: onPause()
    A->>FM: onStop()
    FM->>F: onStop()
    A->>FM: onDestroy()
    FM->>F: onDestroyView()
    FM->>F: onDestroy()
    FM->>F: onDetach()
</div>
<p>FragmentManager gọi các callback vòng đời của Fragment <strong>theo đúng thứ tự</strong> và <strong>đồng bộ với Activity</strong>. Nếu Activity ở trạng thái <code>RESUMED</code>, Fragment cũng sẽ ở <code>RESUMED</code>.</p>

<h2>FragmentTransaction - Thao tác với Fragment</h2>
<p>FragmentTransaction là một <strong>đối tượng mô tả một loạt thao tác</strong> sẽ thực hiện trên Fragment. Nó tuân theo pattern <strong>Builder</strong> và <strong>Command</strong>.</p>
<pre data-lang="kotlin"><code>supportFragmentManager.beginTransaction()
    .add(R.id.container, ProfileFragment())
    .addToBackStack(null)
    .commit()</code></pre>
<p>Mỗi FragmentTransaction có thể chứa nhiều thao tác:</p>
<ul>
  <li><code>add()</code>: Thêm Fragment vào container.</li>
  <li><code>replace()</code>: Xóa Fragment cũ, thêm Fragment mới.</li>
  <li><code>remove()</code>: Xóa Fragment khỏi container.</li>
  <li><code>hide()</code>: Ẩn Fragment (không xóa khỏi bộ nhớ).</li>
  <li><code>show()</code>: Hiển thị Fragment đã ẩn.</li>
  <li><code>attach()</code>: Attach Fragment đã detach.</li>
  <li><code>detach()</code>: Detach Fragment (xóa View, giữ instance).</li>
  <li><code>setReorderingAllowed(true)</code>: Cho phép tối ưu thứ tự thực thi.</li>
</ul>

<h3>add vs replace - Khi nào dùng cái nào?</h3>
<pre data-lang="kotlin"><code>// add: Fragment cũ VẪN CÒN dưới Fragment mới (stacking)
supportFragmentManager.beginTransaction()
    .add(R.id.container, FragmentB())
    .addToBackStack(null)
    .commit()

// replace: Fragment cũ BỊ XÓA, Fragment mới thay thế
supportFragmentManager.beginTransaction()
    .replace(R.id.container, FragmentB())
    .addToBackStack(null)
    .commit()</code></pre>
<p><strong>Quy tắc thực tế:</strong> Trong 95% trường hợp navigation, dùng <code>replace</code> + <code>addToBackStack</code>. Dùng <code>add</code> chỉ khi bạn cần multiple Fragment visible đồng thời (ví dụ: multi-pane layout trên tablet).</p>

<h3>Commit Strategies - Chọn đúng cách commit</h3>
<pre data-lang="kotlin"><code>// Cách 1: Commit thông thường
fragmentManager.beginTransaction()
    .replace(R.id.container, fragment)
    .commit()

// Cách 2: Commit cho phép mất trạng thái
fragmentManager.beginTransaction()
    .replace(R.id.container, fragment)
    .commitAllowingStateLoss()

// Cách 3: Commit và chờ kết quả (synchronous)
fragmentManager.beginTransaction()
    .replace(R.id.container, fragment)
    .commitNow()</code></pre>
<p><strong>Khi nào dùng cái nào?</strong></p>
<ul>
  <li><code>commit()</code>: Mặc định, an toàn. Thao tác được thực hiện bất đồng bộ trong message queue.</li>
  <li><code>commitAllowingStateLoss()</code>: Dùng khi Activity đã save state (ví dụ: trong <code>onSaveInstanceState()</code>). Chấp nhận mất trạng thái nếu Activity bị kill.</li>
  <li><code>commitNow()</code>: Thực thi đồng bộ. Hữu ích khi cần Fragment đã sẵn sàng ngay sau khi commit.</li>
</ul>

<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>IllegalStateException: Can not perform this action after onSaveInstanceState</strong><br/>Xảy ra khi bạn gọi <code>commit()</code> sau khi Activity đã gọi <code>onSaveInstanceState()</code> (ví dụ: trong callback từ network request trả về khi app ở background).<br/><strong>Fix:</strong> Kiểm tra <code>isStateSaved</code> trước khi commit, hoặc dùng <code>commitAllowingStateLoss()</code> cho non-critical updates.</div></div>

<h2>Back Stack - Điều hướng ngược</h2>
<p>Back Stack là một <strong>ngăn xếp các FragmentTransaction</strong>. Khi người dùng nhấn Back, FragmentManager sẽ <strong>pop</strong> transaction gần nhất ra khỏi Back Stack và <strong>đảo ngược</strong> thao tác.</p>
<div class="mermaid">
graph LR
    A[Transaction 1] --> B[Transaction 2]
    B --> C[Transaction 3]
    C --> D[Top of Stack]
    
    style D fill:#ff6b6b
    style A fill:#51cf66
</div>

<h3>addToBackStack()</h3>
<pre data-lang="kotlin"><code>supportFragmentManager.beginTransaction()
    .replace(R.id.container, ProfileFragment())
    .addToBackStack("profile")  // Tag để nhận diện
    .commit()</code></pre>
<p><strong>Quan trọng</strong>: <code>addToBackStack()</code> chỉ lưu <strong>transaction</strong>, không lưu <strong>Fragment instance</strong>. Khi pop, FragmentManager sẽ <strong>đảo ngược</strong> thao tác:</p>
<ul>
  <li>Nếu transaction là <code>add()</code> → pop sẽ <code>remove()</code>.</li>
  <li>Nếu transaction là <code>replace()</code> → pop sẽ khôi phục Fragment cũ.</li>
  <li>Nếu transaction là <code>remove()</code> → pop sẽ <code>add()</code> lại.</li>
</ul>

<h3>popBackStack()</h3>
<pre data-lang="kotlin"><code>// Pop 1 transaction
supportFragmentManager.popBackStack()

// Pop đến tag cụ thể
supportFragmentManager.popBackStack("profile", 0)

// Pop đến tag, bao gồm cả tag đó
supportFragmentManager.popBackStack("profile", POP_BACK_STACK_INCLUSIVE)

// Pop đến ID
supportFragmentManager.popBackStack(transactionId, 0)</code></pre>

<h3>Ví dụ thực tế: Bottom Navigation với Back Stack</h3>
<pre data-lang="kotlin"><code>class MainActivity : AppCompatActivity() {
    
    private var currentFragment: Fragment? = null
    
    fun navigateTo(fragment: Fragment, tag: String) {
        val fragmentManager = supportFragmentManager
        val existingFragment = fragmentManager.findFragmentByTag(tag)
        
        if (existingFragment == null) {
            // Fragment chưa tồn tại → thêm mới
            fragmentManager.beginTransaction()
                .hide(currentFragment!!)
                .add(R.id.container, fragment, tag)
                .commit()
        } else {
            // Fragment đã tồn tại → chỉ hide/show
            fragmentManager.beginTransaction()
                .hide(currentFragment!!)
                .show(existingFragment)
                .commit()
        }
        
        currentFragment = existingFragment ?: fragment
    }
}</code></pre>
<p><strong>Tại sao không dùng <code>addToBackStack()</code> trong trường hợp này?</strong></p>
<p>Vì Bottom Navigation cần <strong>giữ trạng thái</strong> của tất cả tab. Nếu dùng <code>addToBackStack()</code>, khi nhấn Back sẽ pop Fragment ra khỏi Back Stack, làm mất trạng thái.</p>
<p>Thay vào đó, ta dùng <code>hide()</code>/<code>show()</code> để <strong>giữ Fragment trong bộ nhớ</strong> nhưng không hiển thị.</p>

<h2>Communication - Giao tiếp giữa các Fragment</h2>

<h3>Pattern 1: Shared ViewModel (Khuyến nghị)</h3>
<p>Đây là pattern <strong>chuẩn mực</strong> trong MVVM. Các Fragment chia sẻ cùng một ViewModel thông qua Activity scope.</p>
<pre data-lang="kotlin"><code>// SharedViewModel.kt
class SharedViewModel : ViewModel() {
    private val _selectedItem = MutableStateFlow&lt;Item?&gt;(null)
    val selectedItem: StateFlow&lt;Item?&gt; = _selectedItem
    
    fun selectItem(item: Item) {
        _selectedItem.value = item
    }
}

// ListFragment.kt
class ListFragment : Fragment() {
    private val viewModel: SharedViewModel by activityViewModels()
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        viewLifecycleOwner.lifecycleScope.launch {
            viewModel.selectedItem.collect { item ->
                // Xử lý khi item được chọn
            }
        }
        
        binding.recyclerView.setOnItemClickListener { item ->
            viewModel.selectItem(item)
        }
    }
}

// DetailFragment.kt
class DetailFragment : Fragment() {
    private val viewModel: SharedViewModel by activityViewModels()
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        viewLifecycleOwner.lifecycleScope.launch {
            viewModel.selectedItem.collect { item ->
                item?.let { displayDetail(it) }
            }
        }
    }
}</code></pre>
<p><strong>Ưu điểm</strong>:</p>
<ul>
  <li>Fragment không cần biết về nhau.</li>
  <li>Dữ liệu được quan sát (observable), tự động cập nhật.</li>
  <li>Dễ test, dễ bảo trì.</li>
</ul>

<h3>Pattern 2: Fragment Result API (Cho one-time event)</h3>
<p>Dùng khi Fragment A cần <strong>gửi kết quả</strong> cho Fragment B (ví dụ: chọn ảnh, chọn file).</p>
<pre data-lang="kotlin"><code>// FragmentA.kt - Gửi kết quả
class FragmentA : Fragment() {
    
    fun onItemSelected(item: Item) {
        setFragmentResult("requestKey", bundleOf("item" to item))
        findNavController().popBackStack()
    }
}

// FragmentB.kt - Nhận kết quả
class FragmentB : Fragment() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setFragmentResultListener("requestKey") { requestKey, bundle ->
            val item = bundle.getParcelable&lt;Item&gt;("item")
            // Xử lý kết quả
        }
    }
}</code></pre>
<p><strong>Khi nào dùng?</strong></p>
<ul>
  <li>One-time event (chọn ảnh, chọn file, confirm dialog).</li>
  <li>Fragment không cần quan sát liên tục.</li>
  <li>Kết quả được gửi qua Bundle (phải Parcelable/Serializable).</li>
</ul>

<h3>Pattern 3: Interface Callback (Legacy)</h3>
<p>Pattern cũ, không khuyến nghị trong project mới.</p>
<pre data-lang="kotlin"><code>// FragmentA.kt
class FragmentA : Fragment() {
    
    interface OnItemSelectedListener {
        fun onItemSelected(item: Item)
    }
    
    private var listener: OnItemSelectedListener? = null
    
    override fun onAttach(context: Context) {
        super.onAttach(context)
        listener = context as? OnItemSelectedListener
            ?: throw ClassCastException("$context must implement OnItemSelectedListener")
    }
    
    fun onItemClick(item: Item) {
        listener?.onItemSelected(item)
    }
}</code></pre>
<p><strong>Nhược điểm</strong>:</p>
<ul>
  <li>Fragment phụ thuộc vào Activity (coupling cao).</li>
  <li>Không tái sử dụng được.</li>
  <li>Khó test.</li>
</ul>

<h2>Child Fragment - Fragment lồng nhau</h2>
<p>Child Fragment là Fragment được <strong>quản lý bởi Fragment khác</strong> thay vì Activity. FragmentManager của Fragment cha được gọi là <code>childFragmentManager</code>.</p>
<div class="mermaid">
graph TB
    A[Activity] --> B[FragmentManager]
    B --> C[Parent Fragment]
    C --> D[ChildFragmentManager]
    D --> E[Child Fragment 1]
    D --> F[Child Fragment 2]
    
    style C fill:#e1f5ff
    style D fill:#fff4e1
</div>

<h3>Khi nào dùng Child Fragment?</h3>
<p><strong>Trường hợp 1: ViewPager2 với TabLayout</strong></p>
<pre data-lang="kotlin"><code>class ParentFragment : Fragment() {
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        val adapter = ViewPagerAdapter(childFragmentManager, lifecycle)
        binding.viewPager.adapter = adapter
        
        TabLayoutMediator(binding.tabLayout, binding.viewPager) { tab, position ->
            tab.text = when (position) {
                0 -> "Tab 1"
                1 -> "Tab 2"
                else -> "Tab 3"
            }
        }.attach()
    }
}</code></pre>

<p><strong>Trường hợp 2: Nested Navigation</strong></p>
<p>Khi một phần của màn hình có navigation riêng (ví dụ: tab "Profile" có sub-tab "Posts", "Photos", "Videos").</p>
<pre data-lang="kotlin"><code>class ProfileFragment : Fragment() {
    
    fun navigateToPosts() {
        childFragmentManager.beginTransaction()
            .replace(R.id.profile_container, PostsFragment())
            .addToBackStack(null)
            .commit()
    }
}</code></pre>

<h3>Lưu ý quan trọng</h3>
<ul>
  <li><strong>Vòng đời</strong>: Child Fragment bị ảnh hưởng bởi vòng đời của Parent Fragment. Khi Parent bị destroy, Child cũng bị destroy.</li>
  <li><strong>Back Stack</strong>: Child Fragment có Back Stack riêng. Khi nhấn Back, Child Back Stack được pop trước, sau đó mới đến Parent Back Stack.</li>
  <li><strong>Communication</strong>: Child Fragment nên giao tiếp với Parent Fragment thông qua Shared ViewModel hoặc Fragment Result API.</li>
</ul>

<h2>So sánh FragmentManager vs Navigation Component</h2>
<table>
  <thead>
    <tr><th>Tiêu chí</th><th>FragmentManager</th><th>Navigation Component</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Learning curve</strong></td><td>Thấp, API đơn giản</td><td>Trung bình, cần hiểu NavGraph, NavHost</td></tr>
    <tr><td><strong>Type safety</strong></td><td>Không (dùng tag/id string)</td><td>Có (dùng Safe Args plugin)</td></tr>
    <tr><td><strong>Deep linking</strong></td><td>Tự implement</td><td>Hỗ trợ sẵn</td></tr>
    <tr><td><strong>Back Stack management</strong></td><td>Thủ công</td><td>Tự động, có thể customize</td></tr>
    <tr><td><strong>Animation</strong></td><td>Thủ công</td><td>Hỗ trợ sẵn trong XML</td></tr>
    <tr><td><strong>Testing</strong></td><td>Khó (phụ thuộc Activity)</td><td>Dễ hơn (có TestNavHostController)</td></tr>
    <tr><td><strong>Modularization</strong></td><td>Khó</td><td>Dễ (dynamic feature module)</td></tr>
    <tr><td><strong>Compose support</strong></td><td>Không</td><td>Có (Navigation Compose)</td></tr>
    <tr><td><strong>Boilerplate</strong></td><td>Nhiều</td><td>Ít</td></tr>
  </tbody>
</table>

<h3>Khi nào dùng FragmentManager?</h3>
<ul>
  <li>Project nhỏ, ít màn hình.</li>
  <li>Cần kiểm soát chi tiết Back Stack.</li>
  <li>Không muốn thêm dependency.</li>
  <li>Đang maintain codebase cũ.</li>
</ul>

<h3>Khi nào dùng Navigation Component?</h3>
<ul>
  <li>Project lớn, nhiều màn hình.</li>
  <li>Cần deep linking.</li>
  <li>Làm việc với team lớn, cần type safety.</li>
  <li>Dùng Compose.</li>
  <li>Cần modularization.</li>
</ul>

<h2>FragmentManager trong XML vs Compose</h2>

<h3>XML (Traditional View System)</h3>
<pre data-lang="kotlin"><code>class MainActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        if (savedInstanceState == null) {
            supportFragmentManager.beginTransaction()
                .add(R.id.container, HomeFragment())
                .commit()
        }
    }
}</code></pre>

<h3>Compose (Navigation Compose)</h3>
<p>Trong Compose, bạn <strong>không dùng FragmentManager trực tiếp</strong>. Thay vào đó, dùng <strong>Navigation Compose</strong> - một thư viện điều hướng dành riêng cho Compose.</p>
<pre data-lang="kotlin"><code>@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    
    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            HomeScreen(onNavigateToDetail = { itemId ->
                navController.navigate("detail/$itemId")
            })
        }
        
        composable(
            route = "detail/{itemId}",
            arguments = listOf(navArgument("itemId") { type = NavType.StringType })
        ) { backStackEntry ->
            val itemId = backStackEntry.arguments?.getString("itemId")
            DetailScreen(itemId = itemId)
        }
    }
}</code></pre>

<h2>Best Practices</h2>
<ol>
  <li><strong>Luôn dùng <code>commit()</code> thay vì <code>commitAllowingStateLoss()</code></strong> — trừ khi thật sự cần.</li>
  <li><strong>Dùng <code>setReorderingAllowed(true)</code> cho nhiều thao tác</strong> — cho phép FragmentManager tối ưu thứ tự thực thi.</li>
  <li><strong>Luôn dùng Shared ViewModel cho communication</strong> — tránh coupling cao giữa các Fragment.</li>
  <li><strong>Dùng <code>viewLifecycleOwner</code> thay vì <code>this</code> khi observe LiveData/Flow</strong> — tránh memory leak.</li>
  <li><strong>Tránh nested Fragment quá sâu</strong> — gây khó debug và kiểm soát Back Stack.</li>
</ol>

<h2>Common Mistakes</h2>
<h3>1. Transaction đã commit sau <code>onSaveInstanceState()</code></h3>
<pre data-lang="kotlin"><code>// Lỗi
override fun onSaveInstanceState(outState: Bundle) {
    super.onSaveInstanceState(outState)
    
    // Crash: IllegalStateException
    supportFragmentManager.beginTransaction()
        .replace(R.id.container, fragment)
        .commit()
}</code></pre>
<p><strong>Giải pháp</strong>: Dùng <code>commitAllowingStateLoss()</code> nếu chấp nhận mất trạng thái, hoặc delay transaction đến <code>onResume()</code>.</p>

<h3>2. Memory leak do retain Fragment</h3>
<pre data-lang="kotlin"><code>// Lỗi
class MyFragment : Fragment() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        retainInstance = true  // Deprecated, không dùng
    }
}</code></pre>
<p><strong>Giải pháp</strong>: Dùng <code>ViewModel</code> với <code>SavedStateHandle</code> để lưu trữ dữ liệu.</p>

<h3>3. Không handle Back Stack đúng cách</h3>
<pre data-lang="kotlin"><code>// Lỗi
override fun onBackPressed() {
    if (supportFragmentManager.backStackEntryCount > 0) {
        supportFragmentManager.popBackStack()
    } else {
        super.onBackPressed()
    }
}</code></pre>
<p><strong>Giải pháp</strong>: Dùng <code>OnBackPressedDispatcher</code> (AndroidX Activity 1.1+):</p>
<pre data-lang="kotlin"><code>class MainActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        onBackPressedDispatcher.addCallback(this) {
            if (!supportFragmentManager.popBackStackImmediate()) {
                isEnabled = false
                onBackPressedDispatcher.onBackPressed()
            }
        }
    }
}</code></pre>

<h2>Performance Considerations</h2>
<ol>
  <li><strong>Tránh tạo Fragment không cần thiết</strong> — tái sử dụng Fragment nếu đã tồn tại.</li>
  <li><strong>Dùng <code>hide()</code>/<code>show()</code> thay vì <code>replace()</code> cho Bottom Navigation</strong> — giữ trạng thái của tất cả tab.</li>
  <li><strong>Lazy initialization cho Child Fragment</strong> — chỉ tạo khi cần, không tạo sẵn trong <code>onCreate()</code>.</li>
</ol>

<h2>System Thinking - Vị trí trong kiến trúc</h2>
<div class="mermaid">
graph TB
    subgraph Presentation Layer
        A[Activity] --> B[FragmentManager]
        B --> C[Fragment]
        C --> D[ViewModel]
        D --> E[UI State]
    end
    
    subgraph Domain Layer
        E --> F[UseCase]
        F --> G[Domain Model]
    end
    
    subgraph Data Layer
        G --> H[Repository]
        H --> I[DataSource]
    end
    
    style B fill:#e1f5ff
</div>
<p><strong>Vai trò của FragmentManager</strong>:</p>
<ul>
  <li><strong>Presentation Layer</strong>: Quản lý vòng đời Fragment, điều hướng Back Stack.</li>
  <li><strong>Không thuộc Domain Layer</strong>: FragmentManager không nên xuất hiện trong UseCase hay Domain Model.</li>
  <li><strong>Không thuộc Data Layer</strong>: FragmentManager không nên biết về Repository hay DataSource.</li>
</ul>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/reference/androidx/fragment/app/FragmentManager" target="_blank" rel="noopener">FragmentManager - Android Developers</a></li>
  <li><a href="https://developer.android.com/reference/androidx/fragment/app/FragmentTransaction" target="_blank" rel="noopener">FragmentTransaction - Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/navigation" target="_blank" rel="noopener">Navigation Component - Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/fragments" target="_blank" rel="noopener">Fragment best practices - Android Developers</a></li>
  <li><a href="https://developer.android.com/jetpack/compose/navigation" target="_blank" rel="noopener">Jetpack Navigation Compose - Android Developers</a></li>
</ul>
    `
  },

  'fragment-dialog': {
    title: '4.2.2.4 Dialog and DialogFragment',
    summary: 'Hiểu bản chất Dialog và DialogFragment - cách tạo dialog an toàn với lifecycle, xử lý rotation, giao tiếp với Fragment/Activity, và triển khai BottomSheetDialogFragment trong ứng dụng Android hiện đại.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['android', 'fragment', 'dialog', 'dialogfragment', 'bottomsheet', 'fragment-result-api'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['fragment-lifecycle', 'fragment-manager'],
    related: ['fragment-state-changes', 'navigation-component'],
    learningOutcomes: [
      'Giải thích được tại sao DialogFragment an toàn hơn AlertDialog truyền thống.',
      'Hiểu được lifecycle của DialogFragment và cách FragmentManager quản lý dialog.',
      'Triển khai được DialogFragment với custom layout và BottomSheetDialogFragment.',
      'Áp dụng được Fragment Result API để giao tiếp giữa dialog và Fragment/Activity cha.',
      'So sánh được DialogFragment với Navigation Component Dialog và biết khi nào dùng cái nào.',
      'Triển khai được dialog trong Compose (AlertDialog, Dialog, ModalBottomSheet).'
    ],
    knowledgeGap: 'Dùng AlertDialog trực tiếp trong Fragment/Activity mà không hiểu lifecycle sẽ gây window leak khi xoay màn hình, crash khi truy cập context bị destroy, và mất dialog state khi configuration change. Không biết Fragment Result API dẫn đến coupling cao giữa dialog và Activity/Fragment.',
    updatedAt: '2026-08-04',
    readTime: '35 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Dialog là cửa sổ nhỏ xuất hiện phía trước màn hình hiện tại, dùng để:</p>
<ul>
  <li>Hiển thị thông báo quan trọng.</li>
  <li>Yêu cầu xác nhận từ người dùng.</li>
  <li>Thu thập input ngắn (chọn ngày, chọn thời gian, nhập liệu).</li>
  <li>Hiển thị menu tùy chọn.</li>
</ul>

<h3>Vấn đề với AlertDialog truyền thống</h3>
<p>Trước khi có DialogFragment, lập trình viên thường dùng <code>AlertDialog</code> trực tiếp:</p>
<pre data-lang="kotlin"><code>// Cách cũ - KHÔNG khuyến nghị
AlertDialog.Builder(this)
    .setTitle("Xác nhận")
    .setMessage("Bạn có chắc chắn muốn xóa?")
    .setPositiveButton("Xóa") { _, _ -> deleteItem() }
    .setNegativeButton("Hủy", null)
    .show()</code></pre>

<p><strong>Vấn đề:</strong></p>
<ul>
  <li><strong>Mất dialog khi rotation</strong>: Activity bị destroy và recreate, dialog biến mất.</li>
  <li><strong>Không thể khôi phục trạng thái</strong>: Nếu dialog có input (checkbox, text field), dữ liệu bị mất.</li>
  <li><strong>Khó quản lý lifecycle</strong>: Dialog không có lifecycle rõ ràng, dễ gây memory leak.</li>
  <li><strong>Không tái sử dụng được</strong>: Mỗi nơi cần dialog phải viết lại code.</li>
  <li><strong>Crash khi Activity đã destroy</strong>: Nếu callback được gọi sau khi Activity bị destroy.</li>
</ul>

<h3>DialogFragment ra đời để giải quyết vấn đề gì?</h3>
<p>DialogFragment kết hợp <strong>sức mạnh của Fragment</strong> với <strong>giao diện của Dialog</strong>:</p>
<ul>
  <li><strong>Tự động xử lý rotation</strong>: FragmentManager tự động khôi phục dialog.</li>
  <li><strong>Lifecycle rõ ràng</strong>: Có đầy đủ callback vòng đời như Fragment.</li>
  <li><strong>Tái sử dụng được</strong>: Đóng gói logic dialog vào một class riêng.</li>
  <li><strong>Giao tiếp an toàn</strong>: Dùng Fragment Result API hoặc Shared ViewModel.</li>
  <li><strong>Quản lý bởi FragmentManager</strong>: Nhất quán với cách quản lý Fragment khác.</li>
</ul>

<h2>DialogFragment là gì?</h2>
<p>DialogFragment là một <strong>Fragment đặc biệt</strong> được hiển thị dưới dạng dialog. Nó:</p>
<ul>
  <li>Kế thừa từ <code>Fragment</code> (không phải <code>Dialog</code>).</li>
  <li>Được quản lý bởi <code>FragmentManager</code>.</li>
  <li>Có lifecycle đầy đủ như Fragment.</li>
  <li>Tự động xử lý configuration changes (rotation, dark mode...).</li>
</ul>

<h3>Kiến trúc tổng thể</h3>
<div class="mermaid">
graph TB
    A[Activity] --> B[FragmentManager]
    B --> C[DialogFragment]
    C --> D[Dialog Window]
    D --> E[Dialog View]
    
    C --> F[Lifecycle Callbacks]
    F --> G[onCreateDialog]
    F --> H[onCreateView]
    F --> I[onStart/onStop]
    
    style C fill:#e1f5ff
    style D fill:#fff4e1
</div>
<p>DialogFragment tạo ra một <strong>Window riêng</strong> (Dialog Window) nằm trên Window của Activity. Window này chứa View của dialog.</p>

<h2>Lifecycle của DialogFragment</h2>

<h3>So sánh với Fragment thông thường</h3>
<div class="mermaid">
sequenceDiagram
    participant FM as FragmentManager
    participant DF as DialogFragment
    participant D as Dialog
    
    FM->>DF: onAttach()
    FM->>DF: onCreate()
    FM->>DF: onCreateDialog()
    Note over DF,D: Tạo Dialog instance
    FM->>DF: onCreateView()
    Note over DF,D: Inflate layout (nếu dùng custom view)
    FM->>DF: onViewCreated()
    FM->>DF: onStart()
    DF->>D: dialog.show()
    Note over D: Dialog hiển thị
    
    Note over DF,D: User tương tác
    
    FM->>DF: onPause()
    D->>D: dialog.hide()
    FM->>DF: onStop()
    FM->>DF: onDestroyView()
    FM->>DF: onDestroy()
    FM->>DF: onDetach()
</div>

<h3>Các callback quan trọng</h3>

<p><strong>1. onCreateDialog()</strong></p>
<ul>
  <li>Được gọi để tạo Dialog instance.</li>
  <li>Trả về <code>Dialog</code> (thường là <code>AlertDialog</code>).</li>
  <li>Chỉ gọi <strong>một lần</strong> khi DialogFragment được tạo.</li>
</ul>
<pre data-lang="kotlin"><code>override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
    return AlertDialog.Builder(requireContext())
        .setTitle("Xác nhận")
        .setMessage("Bạn có chắc chắn?")
        .setPositiveButton("OK") { _, _ -> }
        .create()
}</code></pre>

<p><strong>2. onCreateView()</strong></p>
<ul>
  <li>Được gọi nếu bạn muốn dùng <strong>custom layout</strong> cho dialog.</li>
  <li>Không cần thiết nếu chỉ dùng <code>onCreateDialog()</code>.</li>
</ul>
<pre data-lang="kotlin"><code>override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
): View? {
    return inflater.inflate(R.layout.dialog_custom, container, false)
}</code></pre>

<p><strong>3. onStart() và onStop()</strong></p>
<ul>
  <li><code>onStart()</code>: Dialog hiển thị.</li>
  <li><code>onStop()</code>: Dialog ẩn (không phải destroy).</li>
  <li>Dùng để đăng ký/hủy listener.</li>
</ul>

<h3>Lifecycle khi rotation</h3>
<div class="mermaid">
sequenceDiagram
    participant DF as DialogFragment
    participant FM as FragmentManager
    
    Note over DF: Screen rotation
    DF->>DF: onSaveInstanceState()
    DF->>DF: onDestroyView()
    DF->>DF: onDestroy()
    DF->>DF: onDetach()
    
    Note over FM: FragmentManager khôi phục
    FM->>DF: onAttach()
    FM->>DF: onCreate()
    FM->>DF: onCreateView()
    FM->>DF: onViewCreated()
    FM->>DF: onStart()
    Note over DF: Dialog tự động hiển thị lại
</div>
<p>FragmentManager <strong>tự động khôi phục</strong> DialogFragment sau rotation. Dialog sẽ hiển thị lại mà không cần code thêm.</p>

<h2>AlertDialog trong DialogFragment</h2>

<h3>Cách 1: Dùng onCreateDialog() (Khuyến nghị)</h3>
<pre data-lang="kotlin"><code>class ConfirmDeleteDialog : DialogFragment() {
    
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        return AlertDialog.Builder(requireContext())
            .setTitle("Xác nhận xóa")
            .setMessage("Bạn có chắc chắn muốn xóa item này?")
            .setPositiveButton("Xóa") { _, _ ->
                // Xử lý khi nhấn Xóa
                onConfirmDelete()
            }
            .setNegativeButton("Hủy") { dialog, _ ->
                dialog.dismiss()
            }
            .create()
    }
    
    private fun onConfirmDelete() {
        // Logic xóa
        dismiss()
    }
}</code></pre>

<p><strong>Cách hiển thị:</strong></p>
<pre data-lang="kotlin"><code>// Trong Activity hoặc Fragment
ConfirmDeleteDialog().show(supportFragmentManager, "confirm_delete")</code></pre>

<h3>Cách 2: Dùng onCreateView() cho custom layout</h3>
<pre data-lang="kotlin"><code>class CustomInputDialog : DialogFragment() {
    
    private var _binding: DialogCustomInputBinding? = null
    private val binding get() = _binding!!
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = DialogCustomInputBinding.inflate(inflater, container, false)
        return binding.root
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        binding.btnSubmit.setOnClickListener {
            val input = binding.etInput.text.toString()
            onSubmit(input)
        }
        
        binding.btnCancel.setOnClickListener {
            dismiss()
        }
    }
    
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
    
    private fun onSubmit(input: String) {
        // Xử lý input
        dismiss()
    }
}</code></pre>

<h2>BottomSheetDialogFragment</h2>

<h3>BottomSheetDialogFragment là gì?</h3>
<p>BottomSheetDialogFragment là DialogFragment hiển thị dialog <strong>từ dưới lên</strong> (bottom sheet). Phù hợp cho:</p>
<ul>
  <li>Menu tùy chọn.</li>
  <li>Form nhập liệu.</li>
  <li>Hiển thị chi tiết nhanh.</li>
  <li>Filter, sort options.</li>
</ul>

<h3>Triển khai BottomSheetDialogFragment</h3>
<pre data-lang="kotlin"><code>class FilterBottomSheet : BottomSheetDialogFragment() {
    
    private var _binding: BottomSheetFilterBinding? = null
    private val binding get() = _binding!!
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = BottomSheetFilterBinding.inflate(inflater, container, false)
        return binding.root
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        setupListeners()
    }
    
    private fun setupListeners() {
        binding.btnApply.setOnClickListener {
            val filters = getSelectedFilters()
            onApplyFilters(filters)
            dismiss()
        }
        
        binding.btnCancel.setOnClickListener {
            dismiss()
        }
    }
    
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
    
    private fun getSelectedFilters(): Filters {
        // Lấy filter đã chọn
        return Filters()
    }
    
    private fun onApplyFilters(filters: Filters) {
        // Áp dụng filter
    }
}</code></pre>

<p><strong>Cách hiển thị:</strong></p>
<pre data-lang="kotlin"><code>FilterBottomSheet().show(supportFragmentManager, "filter_bottom_sheet")</code></pre>

<h3>Customizing BottomSheet behavior</h3>
<pre data-lang="kotlin"><code>class CustomBottomSheet : BottomSheetDialogFragment() {
    
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val dialog = super.onCreateDialog(savedInstanceState) as BottomSheetDialog
        
        dialog.setOnShowListener {
            val bottomSheet = dialog.findViewById&lt;View&gt;(
                com.google.android.material.R.id.design_bottom_sheet
            )
            
            // Set behavior
            val behavior = BottomSheetBehavior.from(bottomSheet as View)
            behavior.peekHeight = 400 // Chiều cao khi peek
            behavior.state = BottomSheetBehavior.STATE_EXPANDED
            
            // Disable drag
            // behavior.isDraggable = false
        }
        
        return dialog
    }
}</code></pre>

<h2>Communication - Giao tiếp với Dialog</h2>

<h3>Pattern 1: Fragment Result API (Khuyến nghị)</h3>
<p>Đây là pattern <strong>hiện đại và an toàn nhất</strong> để dialog trả kết quả cho Fragment/Activity cha.</p>
<pre data-lang="kotlin"><code>// ConfirmDeleteDialog.kt
class ConfirmDeleteDialog : DialogFragment() {
    
    companion object {
        const val REQUEST_KEY = "confirm_delete_request"
        const val RESULT_KEY = "confirmed"
    }
    
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        return AlertDialog.Builder(requireContext())
            .setTitle("Xác nhận xóa")
            .setMessage("Bạn có chắc chắn muốn xóa?")
            .setPositiveButton("Xóa") { _, _ ->
                // Gửi kết quả TRUE
                setFragmentResult(REQUEST_KEY, bundleOf(RESULT_KEY to true))
                dismiss()
            }
            .setNegativeButton("Hủy") { dialog, _ ->
                // Gửi kết quả FALSE
                setFragmentResult(REQUEST_KEY, bundleOf(RESULT_KEY to false))
                dialog.dismiss()
            }
            .create()
    }
}

// Fragment/Activity cha
class ListFragment : Fragment() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Lắng nghe kết quả từ dialog
        setFragmentResultListener(ConfirmDeleteDialog.REQUEST_KEY) { requestKey, bundle ->
            val confirmed = bundle.getBoolean(ConfirmDeleteDialog.RESULT_KEY)
            if (confirmed) {
                deleteItem()
            }
        }
    }
    
    private fun showDeleteConfirmation() {
        ConfirmDeleteDialog().show(childFragmentManager, "confirm_delete")
    }
    
    private fun deleteItem() {
        // Logic xóa
    }
}</code></pre>

<p><strong>Ưu điểm:</strong></p>
<ul>
  <li>Fragment không cần biết về dialog.</li>
  <li>Kết quả được gửi qua Bundle (type-safe).</li>
  <li>Hoạt động đúng ngay cả khi dialog bị dismiss do rotation.</li>
  <li>Không cần interface callback.</li>
</ul>

<h3>Pattern 2: Shared ViewModel</h3>
<p>Dùng khi dialog và Fragment/Activity cha cần <strong>chia sẻ dữ liệu phức tạp</strong>.</p>
<pre data-lang="kotlin"><code>// SharedViewModel.kt
class SharedViewModel : ViewModel() {
    private val _dialogResult = MutableStateFlow&lt;DialogResult?&gt;(null)
    val dialogResult: StateFlow&lt;DialogResult?&gt; = _dialogResult
    
    fun setDialogResult(result: DialogResult) {
        _dialogResult.value = result
    }
    
    fun clearResult() {
        _dialogResult.value = null
    }
}

// ConfirmDialog.kt
class ConfirmDialog : DialogFragment() {
    private val viewModel: SharedViewModel by activityViewModels()
    
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        return AlertDialog.Builder(requireContext())
            .setTitle("Xác nhận")
            .setPositiveButton("OK") { _, _ ->
                viewModel.setDialogResult(DialogResult.Confirmed)
                dismiss()
            }
            .create()
    }
}

// Fragment cha
class ParentFragment : Fragment() {
    private val viewModel: SharedViewModel by activityViewModels()
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        viewLifecycleOwner.lifecycleScope.launch {
            viewModel.dialogResult.collect { result ->
                result?.let {
                    handleResult(it)
                    viewModel.clearResult()
                }
            }
        }
    }
    
    private fun handleResult(result: DialogResult) {
        when (result) {
            is DialogResult.Confirmed -> { /* ... */ }
            is DialogResult.Cancelled -> { /* ... */ }
        }
    }
}</code></pre>

<h3>Pattern 3: Interface Callback (Legacy)</h3>
<p>Pattern cũ, không khuyến nghị trong project mới.</p>
<pre data-lang="kotlin"><code>class ConfirmDialog : DialogFragment() {
    
    interface OnConfirmListener {
        fun onConfirm()
        fun onCancel()
    }
    
    private var listener: OnConfirmListener? = null
    
    override fun onAttach(context: Context) {
        super.onAttach(context)
        listener = when {
            parentFragment is OnConfirmListener -> parentFragment as OnConfirmListener
            context is OnConfirmListener -> context as OnConfirmListener
            else -> throw ClassCastException("$context must implement OnConfirmListener")
        }
    }
    
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        return AlertDialog.Builder(requireContext())
            .setPositiveButton("OK") { _, _ -> listener?.onConfirm() }
            .setNegativeButton("Cancel") { _, _ -> listener?.onCancel() }
            .create()
    }
    
    override fun onDetach() {
        super.onDetach()
        listener = null
    }
}</code></pre>

<p><strong>Nhược điểm:</strong></p>
<ul>
  <li>Coupling cao giữa dialog và Activity/Fragment.</li>
  <li>Khó tái sử dụng.</li>
  <li>Khó test.</li>
</ul>

<h2>Dialog trong Compose</h2>

<h3>AlertDialog trong Compose</h3>
<pre data-lang="kotlin"><code>@Composable
fun ConfirmDeleteDialog(
    onConfirm: () -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Xác nhận xóa") },
        text = { Text("Bạn có chắc chắn muốn xóa item này?") },
        confirmButton = {
            TextButton(onClick = onConfirm) {
                Text("Xóa")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Hủy")
            }
        }
    )
}

// Cách sử dụng
@Composable
fun ListScreen() {
    var showDialog by remember { mutableStateOf(false) }
    
    if (showDialog) {
        ConfirmDeleteDialog(
            onConfirm = {
                // Xóa item
                showDialog = false
            },
            onDismiss = { showDialog = false }
        )
    }
    
    Button(onClick = { showDialog = true }) {
        Text("Xóa")
    }
}</code></pre>

<h3>Custom Dialog trong Compose</h3>
<pre data-lang="kotlin"><code>@Composable
fun CustomInputDialog(
    onDismiss: () -> Unit,
    onSubmit: (String) -> Unit
) {
    var inputText by remember { mutableStateOf("") }
    
    Dialog(onDismissRequest = onDismiss) {
        Surface(
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.padding(16.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text(
                    text = "Nhập tên",
                    style = MaterialTheme.typography.titleLarge
                )
                
                OutlinedTextField(
                    value = inputText,
                    onValueChange = { inputText = it },
                    label = { Text("Tên") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.End
                ) {
                    TextButton(onClick = onDismiss) {
                        Text("Hủy")
                    }
                    Spacer(modifier = Modifier.width(8.dp))
                    Button(onClick = { onSubmit(inputText) }) {
                        Text("Xác nhận")
                    }
                }
            }
        }
    }
}</code></pre>

<h3>ModalBottomSheet trong Compose</h3>
<pre data-lang="kotlin"><code>@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FilterBottomSheet(
    onDismiss: () -> Unit,
    onApply: (Filters) -> Unit
) {
    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = rememberModalBottomSheetState()
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                text = "Bộ lọc",
                style = MaterialTheme.typography.titleLarge
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            // Filter options
            // ...
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                OutlinedButton(
                    onClick = onDismiss,
                    modifier = Modifier.weight(1f)
                ) {
                    Text("Hủy")
                }
                Button(
                    onClick = { onApply(Filters()) },
                    modifier = Modifier.weight(1f)
                ) {
                    Text("Áp dụng")
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}</code></pre>

<h3>So sánh Dialog XML vs Compose</h3>
<table>
  <thead>
    <tr><th>Aspect</th><th>XML (DialogFragment)</th><th>Compose (Dialog/AlertDialog)</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Đơn vị</strong></td><td>Fragment</td><td>Composable function</td></tr>
    <tr><td><strong>State management</strong></td><td>Bundle, ViewModel</td><td>Compose state</td></tr>
    <tr><td><strong>Lifecycle</strong></td><td>Fragment lifecycle</td><td>Composition lifecycle</td></tr>
    <tr><td><strong>Rotation handling</strong></td><td>Tự động (FragmentManager)</td><td>Tự động (rememberSaveable)</td></tr>
    <tr><td><strong>Animation</strong></td><td>XML animation</td><td>AnimatedVisibility, Crossfade</td></tr>
    <tr><td><strong>Customization</strong></td><td>Custom layout</td><td>Composable tree</td></tr>
    <tr><td><strong>Testing</strong></td><td>FragmentScenario</td><td>ComposeTestRule</td></tr>
  </tbody>
</table>

<h2>DialogFragment vs Navigation Component Dialog</h2>

<h3>Navigation Component Dialog</h3>
<p>Navigation Component cung cấp cách hiển thị dialog thông qua NavGraph:</p>
<pre data-lang="xml"><code>&lt;!-- nav_graph.xml --&gt;
&lt;dialog
    android:id="@+id/confirmDialog"
    android:name="com.example.ConfirmDialog"
    android:label="ConfirmDialog" /&gt;</code></pre>

<pre data-lang="kotlin"><code>// Điều hướng đến dialog
findNavController().navigate(R.id.confirmDialog)</code></pre>

<h3>So sánh chi tiết</h3>
<table>
  <thead>
    <tr><th>Tiêu chí</th><th>DialogFragment</th><th>Navigation Dialog</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Learning curve</strong></td><td>Thấp</td><td>Trung bình</td></tr>
    <tr><td><strong>Type safety</strong></td><td>Không</td><td>Có (Safe Args)</td></tr>
    <tr><td><strong>Deep linking</strong></td><td>Tự implement</td><td>Hỗ trợ sẵn</td></tr>
    <tr><td><strong>Back Stack</strong></td><td>FragmentManager</td><td>NavController</td></tr>
    <tr><td><strong>Animation</strong></td><td>Thủ công</td><td>Hỗ trợ sẵn</td></tr>
    <tr><td><strong>Testing</strong></td><td>FragmentScenario</td><td>TestNavHostController</td></tr>
    <tr><td><strong>Boilerplate</strong></td><td>Nhiều</td><td>Ít</td></tr>
    <tr><td><strong>Compose support</strong></td><td>Không</td><td>Có</td></tr>
  </tbody>
</table>

<h3>Khi nào dùng DialogFragment?</h3>
<ul>
  <li>Project nhỏ, ít dialog.</li>
  <li>Cần kiểm soát chi tiết lifecycle.</li>
  <li>Không muốn thêm dependency.</li>
  <li>Đang maintain codebase cũ.</li>
</ul>

<h3>Khi nào dùng Navigation Dialog?</h3>
<ul>
  <li>Project lớn, nhiều dialog.</li>
  <li>Cần deep linking đến dialog.</li>
  <li>Làm việc với team lớn, cần type safety.</li>
  <li>Dùng Compose.</li>
</ul>

<h2>Best Practices</h2>
<ol>
  <li><strong>Luôn dùng Fragment Result API cho communication</strong> — tránh coupling cao giữa dialog và Activity/Fragment.</li>
  <li><strong>Dùng <code>requireContext()</code> thay vì <code>context</code> hoặc <code>activity</code></strong> — tránh NullPointerException.</li>
  <li><strong>Cleanup binding trong <code>onDestroyView()</code></strong> — tránh memory leak.</li>
  <li><strong>Set dialog style trong <code>onCreate()</code></strong> — dùng <code>setStyle()</code> cho full-screen dialog.</li>
  <li><strong>Handle dismiss đúng cách</strong> — override <code>onDismiss()</code> và <code>onCancel()</code> khi cần.</li>
</ol>

<h2>Common Mistakes</h2>

<h3>Lỗi 1: Memory leak do giữ reference đến Activity</h3>
<pre data-lang="kotlin"><code>// Sai
class MyDialog : DialogFragment() {
    private var activity: MainActivity? = null
    
    override fun onAttach(context: Context) {
        super.onAttach(context)
        activity = context as MainActivity  // Memory leak!
    }
}

// Đúng
class MyDialog : DialogFragment() {
    // Dùng Fragment Result API hoặc Shared ViewModel
}</code></pre>

<h3>Lỗi 2: Crash khi dismiss sau khi Activity đã destroy</h3>
<pre data-lang="kotlin"><code>// Sai
fun someCallback() {
    dialog.dismiss()  // Crash nếu Activity đã destroy
}

// Đúng
fun someCallback() {
    if (isAdded && !isDetached) {
        dismiss()
    }
}</code></pre>

<h3>Lỗi 3: Không handle rotation cho custom view</h3>
<pre data-lang="kotlin"><code>// Sai
class CustomDialog : DialogFragment() {
    private var inputText = ""
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        binding.etInput.setText(inputText)
        binding.etInput.addTextChangedListener {
            inputText = it.toString()  // Không lưu khi rotation
        }
    }
}

// Đúng
class CustomDialog : DialogFragment() {
    private var inputText = ""
    
    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putString("input_text", inputText)
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        savedInstanceState?.let {
            inputText = it.getString("input_text", "")
        }
        binding.etInput.setText(inputText)
    }
}</code></pre>

<h2>Performance Considerations</h2>
<ol>
  <li><strong>Tránh tạo DialogFragment không cần thiết</strong> — tái sử dụng dialog nếu đã tồn tại.</li>
  <li><strong>Dùng <code>dismissAllowingStateLoss()</code> cho non-critical dialogs</strong> — dialog không quan trọng, có thể mất nếu Activity bị kill.</li>
  <li><strong>Lazy inflate custom view</strong> — chỉ inflate khi cần, không tạo sẵn trong <code>onCreate()</code>.</li>
</ol>

<h2>System Thinking - Vị trí trong kiến trúc</h2>
<div class="mermaid">
graph TB
    subgraph Presentation Layer
        A[Activity/Fragment] --> B[DialogFragment]
        B --> C[ViewModel]
        C --> D[UI State]
    end
    
    subgraph Domain Layer
        D --> E[UseCase]
        E --> F[Domain Model]
    end
    
    subgraph Data Layer
        F --> G[Repository]
        G --> H[DataSource]
    end
    
    style B fill:#e1f5ff
</div>
<p><strong>Vai trò của DialogFragment</strong>:</p>
<ul>
  <li><strong>Presentation Layer</strong>: Hiển thị dialog, thu thập input từ user.</li>
  <li><strong>Không thuộc Domain Layer</strong>: DialogFragment không nên xuất hiện trong UseCase.</li>
  <li><strong>Không thuộc Data Layer</strong>: DialogFragment không nên biết về Repository.</li>
</ul>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/reference/androidx/fragment/app/DialogFragment" target="_blank" rel="noopener">DialogFragment - Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/topics/ui/dialogs" target="_blank" rel="noopener">Dialogs - Android Developers</a></li>
  <li><a href="https://developer.android.com/reference/com/google/android/material/bottomsheet/BottomSheetDialogFragment" target="_blank" rel="noopener">BottomSheetDialogFragment - Android Developers</a></li>
  <li><a href="https://m3.material.io/components/dialogs" target="_blank" rel="noopener">Material Design - Dialogs</a></li>
  <li><a href="https://developer.android.com/jetpack/compose/elements#dialogs" target="_blank" rel="noopener">Jetpack Compose - Dialogs</a></li>
</ul>
    `
  },

  'android-service': {
    title: '4.2.3.1 Android Service',
    summary: 'Android Service là gì, tất cả các loại Service (Started, Bound, Foreground), khi nào dùng loại nào, và triển khai thực chiến với Coroutines, WorkManager.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '30 phút',
    depth: 'deep-dive',
    tags: ['android', 'service', 'foreground-service', 'bound-service', 'workmanager', 'coroutines', 'background'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['activity-overview', 'activity-lifecycle'],
    related: ['android-broadcast-receiver', 'android-intent'],
    learningOutcomes: [
      'Hiểu bản chất của Android Service và vai trò của nó trong hệ thống.',
      'Phân biệt rõ 3 loại Service: Started, Bound và Foreground, biết khi nào dùng loại nào.',
      'Triển khai được Started Service với Coroutines.',
      'Triển khai được Foreground Service với Notification.',
      'Triển khai được Bound Service với Binder.',
      'Hiểu vì sao WorkManager thường là lựa chọn tốt hơn Service thuần.',
      'Tránh được các lỗi phổ biến: ANR, memory leak, crash do policy Android.'
    ],
    knowledgeGap: 'Xem Service như "chạy ngầm mãi mãi" là hiểu sai bản chất. Android giới hạn chặt chẽ background execution từ Android 8+. Không hiểu các giới hạn này dẫn đến app bị kill, crash, hoặc vi phạm policy Play Store.',
    updatedAt: '2026-07-29',
    readTime: '30 phút',
    content: `
<h2>1. Nó là gì? (What is it?)</h2>
<p><strong>Android Service</strong> là một <strong>Application Component</strong> chạy <strong>không có giao diện người dùng (UI)</strong>. Nó được thiết kế để thực thi các tác vụ chạy nền hoặc phục vụ các component khác trong ứng dụng.</p>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Service không tự động chạy trên một thread riêng.</strong><br/>Mặc định, Service chạy trên <strong>Main Thread (UI Thread)</strong> của ứng dụng. Nếu bạn làm tác vụ nặng (gọi network, đọc file lớn) trực tiếp trong Service mà không dùng Coroutine hoặc Thread, ứng dụng sẽ bị <strong>ANR (Application Not Responding)</strong>.</div></div>

<h2>2. Khi nào dùng & Vấn đề giải quyết? (Why & When to use?)</h2>
<h3>Vấn đề Service giải quyết</h3>
<p>Có những tác vụ cần tiếp tục thực thi <strong>ngay cả khi người dùng rời khỏi màn hình</strong>:</p>
<table>
  <thead><tr><th>Tình huống</th><th>Ví dụ thực tế</th></tr></thead>
  <tbody>
    <tr><td>Phát nhạc nền</td><td>Spotify, YouTube Music</td></tr>
    <tr><td>Tải file / Upload ảnh</td><td>Google Photos sync</td></tr>
    <tr><td>Theo dõi vị trí liên tục</td><td>Google Maps navigation</td></tr>
    <tr><td>Đồng bộ dữ liệu định kỳ</td><td>Email, Calendar sync</td></tr>
    <tr><td>Kết nối thiết bị ngoại vi</td><td>Bluetooth heart rate monitor</td></tr>
  </tbody>
</table>

<h3>Khi nào KHÔNG nên dùng Service thuần?</h3>
<ul>
  <li><strong>Tác vụ một lần, không cần ngay lập tức:</strong> Dùng <strong>WorkManager</strong> (đảm bảo hoàn thành dù app bị kill, hỗ trợ Doze mode, constraint như có WiFi).</li>
  <li><strong>Tác vụ ngắn do người dùng trigger:</strong> Dùng <strong>Coroutine trong ViewModel/Activity</strong> (tác vụ sẽ bị hủy khi người dùng thoát app — đây là hành vi đúng đắn).</li>
  <li><strong>Giao tiếp giữa các phần của cùng một app:</strong> Dùng <strong>Shared ViewModel</strong> hoặc <strong>SharedFlow</strong> thay vì Bound Service.</li>
</ul>

<h3>Bản đồ quyết định: Nên dùng gì?</h3>
<div class="mermaid">
flowchart TD
    Start([Tác vụ nền cần làm]) --> Q1{Người dùng có thể thấy tiến trình?}
    Q1 -- Có --> FG[Foreground Service + Notification]
    Q1 -- Không --> Q2{Cần chạy ngay lập tức?}
    Q2 -- Không --> WM[WorkManager Scheduled Task]
    Q2 -- Có --> Q3{Giao tiếp 2 chiều với UI?}
    Q3 -- Có --> BS[Bound Service]
    Q3 -- Không --> SS[Started Service + Coroutine]
    style FG fill:#FF6B35,stroke:#E55A2B,color:#fff
    style WM fill:#4CAF50,stroke:#388E3C,color:#fff
    style BS fill:#2196F3,stroke:#1565C0,color:#fff
    style SS fill:#9C27B0,stroke:#6A1B9A,color:#fff
</div>

<h2>3. Tư duy hệ thống (System Thinking in Application)</h2>
<div class="mermaid">
flowchart LR
    subgraph UI["Presentation Layer"]
        A[Activity / Fragment]
        VM[ViewModel]
    end
    subgraph SVC["Service Layer"]
        FS[Foreground Service nhạc, GPS, upload]
        BS2[Bound Service Bluetooth, audio engine]
    end
    subgraph BG["Background Layer"]
        WM2[WorkManager sync, backup]
    end
    subgraph Data["Data Layer"]
        Repo[Repository]
        DB[(Room DB)]
        API[Retrofit API]
    end
    A -- bindService / startService --> SVC
    VM -- observe --> A
    FS -- emit events --> VM
    WM2 -- periodic work --> Repo
    BS2 -- Binder IPC --> A
    Repo --> DB
    Repo --> API
    style FS fill:#FF6B35,stroke:#E55A2B,color:#fff
    style WM2 fill:#4CAF50,stroke:#388E3C,color:#fff
    style BS2 fill:#2196F3,stroke:#1565C0,color:#fff
</div>
<div class="callout callout-info"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Nguyên tắc quan trọng:</strong> Service không được biết đến UI. Service chỉ thực thi tác vụ và emit kết quả (qua BroadcastReceiver, Flow, hoặc Binder callback). UI quyết định cách hiển thị kết quả đó.</div></div>

<h2>4. Ba loại Service — So sánh tổng quan</h2>
<table>
  <thead>
    <tr><th>Đặc điểm</th><th>Started Service</th><th>Foreground Service</th><th>Bound Service</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Khởi động bằng</strong></td><td><code>startService()</code></td><td><code>startForeground()</code></td><td><code>bindService()</code></td></tr>
    <tr><td><strong>Lifecycle</strong></td><td>Đến khi <code>stopSelf()</code></td><td>Đến khi dừng thủ công</td><td>Khi có ít nhất 1 client bind</td></tr>
    <tr><td><strong>Notification</strong></td><td>Không</td><td><strong>Bắt buộc</strong></td><td>Không</td></tr>
    <tr><td><strong>Giao tiếp 2 chiều</strong></td><td>Không</td><td>Không</td><td><strong>Có (Binder)</strong></td></tr>
    <tr><td><strong>Bị kill khi thiếu RAM?</strong></td><td>Có thể</td><td><strong>Ưu tiên cao, khó bị kill</strong></td><td>Có thể</td></tr>
    <tr><td><strong>Ví dụ thực tế</strong></td><td>Upload analytics 1 lần</td><td>Phát nhạc, GPS navigation</td><td>Bluetooth, audio engine</td></tr>
  </tbody>
</table>

<h2>5. Vòng đời Service (Lifecycle)</h2>
<div class="mermaid">
stateDiagram-v2
    [*] --> Created : startService() / bindService()
    Created --> Running : onCreate() then onStartCommand() hoặc onBind()
    Running --> Stopped : stopSelf() / stopService() / onUnbind()
    Stopped --> [*] : onDestroy()
</div>

<h3><code>onStartCommand()</code> — Return value quan trọng</h3>
<pre><code data-lang="kotlin">override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    // Quyết định hành vi khi Service bị kill bởi hệ thống:
    return START_STICKY        // Tái tạo Service, intent = null
    // return START_NOT_STICKY // KHÔNG tái tạo Service (tốt cho tác vụ 1 lần)
    // return START_REDELIVER_INTENT // Tái tạo Service, gửi lại intent cũ
}</code></pre>

<div class="callout callout-info"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>START_STICKY</strong> phù hợp cho Media Player (muốn Service sống lại sau khi bị kill).<br/><strong>START_NOT_STICKY</strong> phù hợp cho tác vụ một lần như upload file (không cần chạy lại nếu bị kill giữa chừng).</div></div>

<h2>6. Triển khai thực chiến</h2>

<h3>6.1 Started Service với Coroutine</h3>
<p><strong>Tình huống:</strong> Gửi log analytics lên server sau khi người dùng hoàn thành một session mà không chặn UI.</p>

<div class="mermaid">
sequenceDiagram
    participant UI as Activity
    participant OS as Android OS
    participant Svc as AnalyticsService
    participant API as Backend API
    UI->>OS: startService(AnalyticsService)
    OS->>Svc: onCreate()
    OS->>Svc: onStartCommand(intent)
    Svc->>Svc: launch Coroutine IO dispatcher
    Svc->>API: POST /analytics suspend
    API-->>Svc: 200 OK
    Svc->>Svc: stopSelf() tự dừng
    OS->>Svc: onDestroy()
</div>

<p><strong>AndroidManifest.xml</strong></p>
<pre><code data-lang="xml">&lt;service
    android:name=".service.AnalyticsService"
    android:exported="false" /&gt;</code></pre>

<p><strong>AnalyticsService.kt</strong></p>
<pre><code data-lang="kotlin">import android.app.Service
import android.content.Intent
import android.os.IBinder
import kotlinx.coroutines.*

class AnalyticsService : Service() {

    // Job riêng để có thể cancel khi Service bị destroy
    private val serviceJob = SupervisorJob()
    private val serviceScope = CoroutineScope(Dispatchers.IO + serviceJob)

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val sessionId = intent?.getStringExtra(EXTRA_SESSION_ID) ?: run {
            stopSelf(startId)
            return START_NOT_STICKY
        }

        serviceScope.launch {
            try {
                uploadSessionData(sessionId)
            } catch (e: Exception) {
                // Log lỗi, retry hoặc lưu local để retry sau
            } finally {
                stopSelf(startId) // Báo OS tác vụ này đã xong
            }
        }

        return START_NOT_STICKY
    }

    private suspend fun uploadSessionData(sessionId: String) {
        // analyticsRepository.uploadSession(sessionId)
    }

    override fun onDestroy() {
        super.onDestroy()
        serviceJob.cancel() // Hủy tất cả Coroutine khi Service bị destroy
    }

    companion object {
        const val EXTRA_SESSION_ID = "extra_session_id"

        fun buildIntent(context: android.content.Context, sessionId: String): Intent {
            return Intent(context, AnalyticsService::class.java).apply {
                putExtra(EXTRA_SESSION_ID, sessionId)
            }
        }
    }
}</code></pre>

<p><strong>Cách gọi từ Activity:</strong></p>
<pre><code data-lang="kotlin">val intent = AnalyticsService.buildIntent(context, sessionId = "session_abc123")
context.startService(intent)</code></pre>

<h3>6.2 Foreground Service — Phát nhạc nền</h3>
<p><strong>Tình huống:</strong> Music Player — cần tiếp tục phát nhạc khi người dùng khóa màn hình, hiển thị notification với control (play/pause).</p>

<div class="callout callout-important"><span class="callout-icon">🔴</span><div class="callout-body"><strong>Android 8 (API 26)+:</strong> Background Service bị giới hạn nghiêm ngặt. Nếu app chạy ngầm và cần tiếp tục làm việc lâu dài, <strong>bắt buộc</strong> phải dùng Foreground Service với Notification. Vi phạm sẽ gây <code>IllegalStateException</code>.<br/><strong>Android 14 (API 34)+:</strong> Phải khai báo rõ <code>android:foregroundServiceType</code> trong Manifest.</div></div>

<div class="mermaid">
sequenceDiagram
    participant User
    participant UI as MusicActivity
    participant Svc as MusicPlayerService
    participant OS as Android OS
    User->>UI: Bấm Play
    UI->>OS: startForegroundService(MusicPlayerService)
    OS->>Svc: onCreate()
    OS->>Svc: onStartCommand()
    Svc->>OS: startForeground(NOTIF_ID, notification)
    OS-->>User: Hiển thị Notification
    User->>UI: Bấm Home rời app
    Note over Svc: Service tiếp tục chạy nhờ Foreground
    User->>UI: Bấm Pause trên Notification
    OS->>Svc: onStartCommand(ACTION_PAUSE)
    Svc->>Svc: mediaPlayer.pause()
</div>

<p><strong>AndroidManifest.xml</strong></p>
<pre><code data-lang="xml">&lt;uses-permission android:name="android.permission.FOREGROUND_SERVICE" /&gt;
&lt;uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" /&gt;

&lt;service
    android:name=".service.MusicPlayerService"
    android:foregroundServiceType="mediaPlayback"
    android:exported="false" /&gt;</code></pre>

<p><strong>MusicPlayerService.kt</strong></p>
<pre><code data-lang="kotlin">import android.app.*
import android.content.Intent
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat

class MusicPlayerService : Service() {

    companion object {
        const val CHANNEL_ID = "music_player_channel"
        const val NOTIFICATION_ID = 1001
        const val ACTION_PLAY = "action_play"
        const val ACTION_PAUSE = "action_pause"
        const val ACTION_STOP = "action_stop"
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_PLAY -> {
                startForeground(NOTIFICATION_ID, buildNotification(isPlaying = true))
                playMusic()
            }
            ACTION_PAUSE -> {
                pauseMusic()
                updateNotification(isPlaying = false)
            }
            ACTION_STOP -> {
                stopMusic()
                stopForeground(STOP_FOREGROUND_REMOVE)
                stopSelf()
            }
        }
        return START_STICKY
    }

    private fun buildNotification(isPlaying: Boolean): Notification {
        val pauseIntent = PendingIntent.getService(
            this, 0,
            Intent(this, MusicPlayerService::class.java).apply { action = ACTION_PAUSE },
            PendingIntent.FLAG_IMMUTABLE
        )
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Đang phát: Shape of You")
            .setContentText("Ed Sheeran • Divide")
            .setSmallIcon(android.R.drawable.ic_media_play)
            .addAction(android.R.drawable.ic_media_pause, if (isPlaying) "Tạm dừng" else "Phát", pauseIntent)
            .setOngoing(true) // Người dùng không thể vuốt để xóa notification
            .build()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(CHANNEL_ID, "Trình phát nhạc", NotificationManager.IMPORTANCE_LOW)
            getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        }
    }

    private fun updateNotification(isPlaying: Boolean) {
        getSystemService(NotificationManager::class.java).notify(NOTIFICATION_ID, buildNotification(isPlaying))
    }

    private fun playMusic() { /* MediaPlayer / ExoPlayer logic */ }
    private fun pauseMusic() { /* MediaPlayer / ExoPlayer logic */ }
    private fun stopMusic() { /* MediaPlayer / ExoPlayer logic */ }

    override fun onBind(intent: Intent?): IBinder? = null
}</code></pre>

<p><strong>Cách gọi từ Activity:</strong></p>
<pre><code data-lang="kotlin">val intent = Intent(this, MusicPlayerService::class.java).apply {
    action = MusicPlayerService.ACTION_PLAY
}
// startService() bị chặn từ Android 8+ khi app ở background
// Phải dùng startForegroundService()
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    startForegroundService(intent)
} else {
    startService(intent)
}</code></pre>

<h3>6.3 Bound Service — Kết nối Bluetooth Real-time</h3>
<p><strong>Tình huống:</strong> App đo nhịp tim kết nối với thiết bị Bluetooth. UI cần nhận dữ liệu nhịp tim liên tục, real-time, trong khi app đang mở.</p>

<div class="mermaid">
sequenceDiagram
    participant UI as HeartRateActivity
    participant SC as ServiceConnection
    participant Svc as BluetoothService
    participant BT as Bluetooth Device
    UI->>SC: bindService()
    SC->>Svc: onBind() trả về IBinder
    SC-->>UI: onServiceConnected(binder)
    UI->>Svc: service.startMeasuring()
    loop Mỗi giây
        BT-->>Svc: dữ liệu nhịp tim raw
        Svc->>Svc: parse data
        Svc->>UI: callback.onHeartRateUpdated(bpm)
        UI->>UI: cập nhật UI
    end
    UI->>SC: unbindService() khi Activity bị destroy
    SC->>Svc: onUnbind()
    Svc->>Svc: onDestroy()
</div>

<p><strong>BluetoothHeartRateService.kt</strong></p>
<pre><code data-lang="kotlin">import android.app.Service
import android.content.Intent
import android.os.Binder
import android.os.IBinder

class BluetoothHeartRateService : Service() {

    // Interface để UI nhận callback
    interface HeartRateCallback {
        fun onHeartRateUpdated(bpm: Int)
        fun onConnectionStateChanged(connected: Boolean)
    }

    // Inner Binder — cung cấp reference đến Service
    inner class LocalBinder : Binder() {
        fun getService(): BluetoothHeartRateService = this@BluetoothHeartRateService
    }

    private val binder = LocalBinder()
    private var callback: HeartRateCallback? = null

    override fun onBind(intent: Intent?): IBinder = binder

    fun setCallback(callback: HeartRateCallback) {
        this.callback = callback
    }

    fun startMeasuring() {
        // Kết nối Bluetooth GATT và bắt đầu nhận dữ liệu
        simulateHeartRateData()
    }

    private fun simulateHeartRateData() {
        // Trong thực tế: Bluetooth GATT characteristic callback
        callback?.onHeartRateUpdated(bpm = 75)
    }

    fun stopMeasuring() {
        callback = null
    }

    override fun onUnbind(intent: Intent?): Boolean {
        stopMeasuring()
        return false // false = không gọi onRebind() khi có client mới
    }
}</code></pre>

<p><strong>HeartRateActivity.kt</strong></p>
<pre><code data-lang="kotlin">import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.os.IBinder
import androidx.appcompat.app.AppCompatActivity

class HeartRateActivity : AppCompatActivity(), BluetoothHeartRateService.HeartRateCallback {

    private var heartRateService: BluetoothHeartRateService? = null
    private var isServiceBound = false

    private val serviceConnection = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, binder: IBinder?) {
            val localBinder = binder as BluetoothHeartRateService.LocalBinder
            heartRateService = localBinder.getService()
            heartRateService?.setCallback(this@HeartRateActivity)
            heartRateService?.startMeasuring()
            isServiceBound = true
        }

        override fun onServiceDisconnected(name: ComponentName?) {
            // Gọi khi Service bị hủy đột ngột (crash)
            heartRateService = null
            isServiceBound = false
        }
    }

    override fun onStart() {
        super.onStart()
        // Bind khi Activity bắt đầu hiển thị
        Intent(this, BluetoothHeartRateService::class.java).also { intent ->
            bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE)
        }
    }

    override fun onStop() {
        super.onStop()
        // Unbind khi Activity không còn hiển thị — tránh leak
        if (isServiceBound) {
            unbindService(serviceConnection)
            isServiceBound = false
        }
    }

    // Callback từ Service — chạy trên Main Thread
    override fun onHeartRateUpdated(bpm: Int) {
        runOnUiThread {
            // binding.tvHeartRate.text = "$bpm BPM"
        }
    }

    override fun onConnectionStateChanged(connected: Boolean) { }
}</code></pre>

<h3>6.4 WorkManager — Lựa chọn hiện đại cho background task</h3>
<p><strong>Tình huống:</strong> Backup ảnh lên server mỗi đêm khi có WiFi và đang sạc pin.</p>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>WorkManager</strong> là thư viện Jetpack được Google khuyến nghị cho hầu hết background tasks. Nó hoạt động được trên mọi API level, tôn trọng Doze mode, battery saver, và đảm bảo task hoàn thành ngay cả khi app bị kill hoặc thiết bị restart.</div></div>

<p><strong>BackupWorker.kt</strong></p>
<pre><code data-lang="kotlin">import android.content.Context
import androidx.work.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class BackupWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) { // CoroutineWorker tự động dùng Dispatchers.Default

    override suspend fun doWork(): Result {
        return withContext(Dispatchers.IO) {
            try {
                val userId = inputData.getString(KEY_USER_ID)
                    ?: return@withContext Result.failure(workDataOf("error" to "Missing user ID"))

                // uploadPhotos(userId) — gọi API thực tế
                val uploadedCount = 42 // Kết quả từ API

                Result.success(workDataOf(KEY_UPLOADED_COUNT to uploadedCount))
            } catch (e: Exception) {
                if (runAttemptCount < 3) Result.retry() // Thử lại tối đa 3 lần
                else Result.failure(workDataOf("error" to e.message))
            }
        }
    }

    companion object {
        const val KEY_USER_ID = "key_user_id"
        const val KEY_UPLOADED_COUNT = "key_uploaded_count"
    }
}</code></pre>

<p><strong>Đặt lịch chạy và quan sát trạng thái:</strong></p>
<pre><code data-lang="kotlin">fun scheduleNightlyBackup(context: Context, userId: String) {
    val constraints = Constraints.Builder()
        .setRequiredNetworkType(NetworkType.UNMETERED) // Chỉ chạy khi có WiFi
        .setRequiresCharging(true)                     // Chỉ chạy khi đang sạc
        .build()

    val backupRequest = PeriodicWorkRequestBuilder&lt;BackupWorker&gt;(24, TimeUnit.HOURS)
        .setConstraints(constraints)
        .setInputData(workDataOf(BackupWorker.KEY_USER_ID to userId))
        .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, WorkRequest.MIN_BACKOFF_MILLIS, TimeUnit.MILLISECONDS)
        .build()

    WorkManager.getInstance(context).enqueueUniquePeriodicWork(
        "nightly_photo_backup",          // Unique name để tránh duplicate
        ExistingPeriodicWorkPolicy.KEEP, // Nếu đã có task này, giữ nguyên
        backupRequest
    )
}

// Quan sát trạng thái từ ViewModel:
WorkManager.getInstance(context)
    .getWorkInfosForUniqueWorkLiveData("nightly_photo_backup")
    .observe(this) { workInfos ->
        workInfos.firstOrNull()?.let { info ->
            when (info.state) {
                WorkInfo.State.RUNNING -> { /* Hiển thị progress */ }
                WorkInfo.State.SUCCEEDED -> {
                    val count = info.outputData.getInt(BackupWorker.KEY_UPLOADED_COUNT, 0)
                    // "Đã backup $count ảnh"
                }
                WorkInfo.State.FAILED -> { /* Hiển thị lỗi */ }
                else -> {}
            }
        }
    }</code></pre>

<h2>7. Bảng so sánh tổng hợp: Nên dùng gì?</h2>
<table>
  <thead><tr><th>Kịch bản</th><th>Giải pháp tốt nhất</th><th>Lý do</th></tr></thead>
  <tbody>
    <tr><td>Phát nhạc nền</td><td>Foreground Service</td><td>Cần UI (Notification) + chạy liên tục</td></tr>
    <tr><td>Upload file lớn 1 lần</td><td>Foreground Service</td><td>Cần progress notification</td></tr>
    <tr><td>Sync data mỗi ngày</td><td>WorkManager (Periodic)</td><td>Không cần ngay, cần đảm bảo completion</td></tr>
    <tr><td>Sync data khi có WiFi</td><td>WorkManager + Constraints</td><td>WorkManager xử lý constraint tốt nhất</td></tr>
    <tr><td>Nhận dữ liệu sensor real-time</td><td>Bound Service</td><td>Cần giao tiếp 2 chiều, vòng đời gắn với Activity</td></tr>
    <tr><td>Tác vụ ngắn do user trigger</td><td>Coroutine trong ViewModel</td><td>Không cần Service, đơn giản hơn nhiều</td></tr>
    <tr><td>GPS tracking nền</td><td>Foreground Service</td><td>Cần chạy dù người dùng thoát app</td></tr>
  </tbody>
</table>

<h2>8. Trade-offs & Pitfalls (Lưu ý quan trọng)</h2>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Background Execution Limits (Android 8+):</strong><br/>Từ Android 8 (Oreo), app trong background chỉ có <strong>vài phút</strong> để chạy Service trước khi bị system kill. Cố tình bypass giới hạn này (ví dụ dùng alarm để restart Service liên tục) vi phạm Play Store policy và có thể khiến app bị gỡ bỏ.<br/><strong>Giải pháp:</strong> Dùng Foreground Service nếu cần chạy lâu, hoặc WorkManager cho tác vụ deferrable.</div></div>

<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Service không phải thread riêng — ANR rình rập:</strong><br/>Code trong <code>onStartCommand()</code> chạy trên Main Thread. Bất kỳ thao tác blocking nào (network, file IO, database query nặng) sẽ freeze UI trong 5 giây → ANR.<br/><strong>Giải pháp:</strong> Luôn launch Coroutine với <code>Dispatchers.IO</code> cho các tác vụ blocking trong Service.</div></div>

<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Memory Leak với Bound Service:</strong><br/>Nếu bind trong <code>onStart()</code> nhưng quên <code>unbindService()</code> trong <code>onStop()</code>, Activity context sẽ bị rò rỉ bộ nhớ.<br/><strong>Giải pháp:</strong> Luôn đối xứng: bind ↔ unbind trong cùng cặp lifecycle callback (<code>onStart/onStop</code> hoặc <code>onCreate/onDestroy</code>).</div></div>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Foreground Service Type bắt buộc (Android 14+):</strong><br/>Từ Android 14, phải khai báo <code>android:foregroundServiceType</code> trong Manifest và request permission tương ứng. Không khai báo sẽ gây <code>SecurityException</code> ở runtime.<br/>Các type phổ biến: <code>mediaPlayback</code>, <code>location</code>, <code>dataSync</code>, <code>camera</code>, <code>microphone</code>.</div></div>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>WorkManager vs Service — Câu hỏi để tự hỏi:</strong><br/><em>"Tác vụ này có cần chạy lập tức không?"</em> Nếu không, WorkManager là lựa chọn tốt hơn. WorkManager hiểu Doze mode, battery optimizer, scheduled restart sau device reboot — những thứ mà Service thuần không có.</div></div>

<h2>9. Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/guide/components/services" target="_blank">Services overview — Android Developers</a></li>
  <li><a href="https://developer.android.com/develop/background-work/services/foreground-services" target="_blank">Foreground services — Android Developers</a></li>
  <li><a href="https://developer.android.com/guide/components/bound-services" target="_blank">Bound services overview — Android Developers</a></li>
  <li><a href="https://developer.android.com/develop/background-work/background-tasks" target="_blank">Background work overview — Android Developers</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/workmanager" target="_blank">WorkManager guide — Android Developers</a></li>
  <li><a href="https://developer.android.com/about/versions/oreo/background" target="_blank">Background execution limits (Android 8+)</a></li>
</ul>
    `
  },

  'google-service': {
    title: '4.2.3.2 Google Service',
    summary: 'Google Play Services và Firebase là gì, mối quan hệ giữa chúng, cách tích hợp chuẩn vào project, và triển khai thực chiến FCM, Analytics, Crashlytics, Auth, Remote Config, Firestore, App Distribution, Location, Maps.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '45 phút',
    depth: 'deep-dive',
    tags: ['android', 'google-service', 'google-play-services', 'firebase', 'fcm', 'crashlytics', 'analytics', 'firebase-auth', 'remote-config', 'firestore', 'app-distribution', 'location', 'maps'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['android-service'],
    related: ['android-broadcast-receiver', 'activity-overview'],
    learningOutcomes: [
      'Giải thích được Google Play Services và Firebase là gì, phân biệt rõ hai khái niệm.',
      'Giải thích được vì sao ứng dụng Android thực tế phụ thuộc vào Google Play Services.',
      'Áp dụng được Firebase BoM và google-services.json để tích hợp Firebase vào project chuẩn.',
      'Triển khai được FCM push notification và xử lý đúng foreground/background.',
      'Triển khai được Firebase Analytics, Crashlytics, Remote Config, App Distribution.',
      'Triển khai được Firebase Auth kết hợp Google Sign-In.',
      'Biết khi nào nên đặt Firebase trong Clean Architecture / MVVM.',
      'Nhận diện được các lỗi tích hợp phổ biến: version mismatch, thiếu google-services.json, API Key sai.'
    ],
    knowledgeGap: 'Nhiều người nhầm lẫn Google Play Services với Firebase SDK, không hiểu vì sao app crash trên thiết bị không có GMS. Không nắm được cơ chế GMS tự cập nhật và sự phụ thuộc của Firebase SDK vào GMS dẫn đến lỗi tích hợp, crash runtime, và app bị từ chối trên Play Store.',
    updatedAt: '2026-08-05',
    readTime: '45 phút',
    content: `
<h2>1. Nó là gì? (What is it?)</h2>
<p><strong>Google Service</strong> trong phạm vi Android thường được hiểu theo <strong>hai tầng</strong> khác nhau nhưng gắn bó chặt chẽ:</p>

<h3>1.1 Google Play Services (GMS)</h3>
<p><strong>Google Play Services</strong> là một <strong>framework hệ thống cài sẵn trên thiết bị</strong> (một APK riêng, thường tên gói <code>com.google.android.gms</code>). Nó cung cấp các API nền cho vô số tính năng của Google:</p>
<ul>
  <li>Google Maps</li>
  <li>Location (vị trí)</li>
  <li>Google Sign-In / OAuth</li>
  <li>In-app Billing (thanh toán trong app)</li>
  <li><strong>Nền tảng để các Firebase SDK chạy trên đó</strong></li>
</ul>
<p>GMS <strong>không phải phần của AOSP</strong> (Android mã nguồn mở). Nó là phần mềm độc quyền của Google, được cấp phép cho các nhà sản xuất (OEM) và tự cập nhật qua Google Play Store — không cần người dùng nâng cấp hệ điều hành.</p>

<h3>1.2 Firebase</h3>
<p><strong>Firebase</strong> là một <strong>Backend-as-a-Service (BaaS)</strong> của Google. Phía client là các <strong>SDK</strong> (thư viện) bạn thêm vào project, phía server là hạ tầng đám mây Google đã quản lý sẵn.</p>
<table>
  <thead>
    <tr><th>Sản phẩm Firebase</th><th>Vai trò</th></tr>
  </thead>
  <tbody>
    <tr><td>Firebase Cloud Messaging (FCM)</td><td>Gửi push notification</td></tr>
    <tr><td>Firebase Analytics</td><td>Theo dõi hành vi người dùng</td></tr>
    <tr><td>Firebase Crashlytics</td><td>Báo cáo crash</td></tr>
    <tr><td>Firebase Authentication</td><td>Đăng nhập (email, Google, phone...)</td></tr>
    <tr><td>Cloud Firestore</td><td>Database NoSQL real-time</td></tr>
    <tr><td>Firebase Storage</td><td>Lưu trữ file</td></tr>
    <tr><td>Firebase Remote Config</td><td>Cấu hình app từ xa</td></tr>
    <tr><td>Firebase App Distribution</td><td>Phân phối build test</td></tr>
  </tbody>
</table>

<h3>1.3 Mối quan hệ GMS ↔ Firebase</h3>
<div class="callout callout-info"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Firebase SDK chạy trên nền tảng Google Play Services.</strong> Hầu hết các Firebase SDK (đặc biệt FCM, Dynamic Links, App Check) <strong>yêu cầu thiết bị phải có GMS</strong> mới hoạt động. Cả hai được cấu hình chung qua một file <code>google-services.json</code>.</div></div>

<div class="mermaid">
flowchart LR
    App[Ứng dụng Android] --> GMS[Google Play Services APK hệ thống trên device]
    App --> FB[Firebase SDK FCM, Analytics, Crashlytics...]
    GMS <--> GCloud[Google Cloud Backend]
    FB --> GCloud
    GCloud --> Console[Firebase Console quản lý, theo dõi, gửi thông báo]
    style GMS fill:#2196F3,stroke:#1565C0,color:#fff
    style FB fill:#FFA000,stroke:#E65100,color:#fff
    style GCloud fill:#4CAF50,stroke:#388E3C,color:#fff
</div>

<h2>2. Vì sao tồn tại? Nó giải quyết vấn đề gì? (Why &amp; What problem?)</h2>

<h3>Android thuần (AOSP) thiếu gì?</h3>
<p>Android mã nguồn mở (AOSP) chỉ cung cấp cơ chế lõi: Activity, Service, Broadcast... Nó <strong>không có</strong> dịch vụ vị trí chính xác, bản đồ, danh bạ đám mây, hay hạ tầng push notification đa nền tảng.</p>
<p>Nếu mỗi nhà sản xuất tự làm một bộ dịch vụ riêng, ứng dụng sẽ chạy khác nhau trên từng máy. GMS ra đời để:</p>
<ul>
  <li><strong>Thống nhất API</strong> — nhà phát triển viết một lần, chạy trên mọi máy có GMS.</li>
  <li><strong>Tự cập nhật</strong> — Google cập nhật dịch vụ nền qua Play Store, không cần chờ OEM phát hành bản vá hệ điều hành.</li>
  <li><strong>Là điều kiện để có Play Store</strong> — các OEM muốn cài Google Play Store bắt buộc phải đi kèm GMS.</li>
</ul>

<h3>Firebase giải quyết nỗi đau backend</h3>
<p>Trước Firebase, mọi app muốn có push notification, analytics, hay crash report đều phải <strong>tự xây backend</strong>: viết server, quản lý socket, mở rộng hạ tầng. Firebase loại bỏ toàn bộ phần đó:</p>
<ul>
  <li>Không phải quản lý server.</li>
  <li>Tự mở rộng quy mô.</li>
  <li>Client SDK đã được tối ưu sẵn cho Android.</li>
</ul>

<h2>3. Cách hoạt động bên trong (How does it work?)</h2>

<h3>3.1 Google Play Services: một "system app" giao tiếp qua IPC</h3>
<p>GMS được cài như một <strong>application component hệ thống</strong>. Khi app của bạn gọi <code>GoogleApiClient</code> (hoặc API mới qua <code>Task</code>), thực chất app <strong>bind tới Service của GMS</strong> qua Binder IPC (giống Bound Service trong bài <a href="./android_service.md" target="_blank">Android Service</a>), và GMS thực thi tác vụ rồi trả kết quả về.</p>

<div class="mermaid">
sequenceDiagram
    participant App as Ứng dụng của bạn
    participant OS as Android OS
    participant GMS as Google Play Services
    participant Cloud as Google Cloud

    App->>OS: bindService() tới com.google.android.gms
    OS->>GMS: Kết nối qua Binder (AIDL)
    App->>GMS: Gọi API (vd: getLastLocation())
    GMS->>Cloud: Gọi dịch vụ đám mây Google
    Cloud-->>GMS: Trả dữ liệu
    GMS-->>App: Task&lt;T&gt; hoàn thành
    App->>OS: unbindService()
</div>

<p>Vì GMS tự cập nhật, <strong>version GMS trên máy có thể mới hơn hoặc cũ hơn</strong> so với version mà app bạn biên dịch. Đây là nguồn gốc của lỗi <code>Google Play services is not compatible with your app</code> nếu bạn không xử lý đúng.</p>

<h3>3.2 Firebase SDK: client kết nối backend Google</h3>
<p>Firebase SDK chạy <strong>trong chính process app</strong> của bạn. Nó dùng file <code>google-services.json</code> để biết app thuộc project Firebase nào, sau đó mở kết nối (REST/WebSocket) tới backend:</p>

<div class="mermaid">
flowchart TD
    A[FirebaseApp.initializeApp đọc google-services.json] --> B[FCM/Realtime/DB... SDK khởi tạo]
    B --> C[Nghe sự kiện real-time hoặc đăng ký với server]
    C --> D[Nhận dữ liệu / cập nhật local]
</div>

<p>Khi app bị kill, FCM vẫn có thể hiển thị notification nhờ <strong>cơ chế của hệ điều hành</strong> (qua Google Play Services) — không cần app chạy. Đây là điểm khác biệt cốt lõi so với tự mở socket.</p>

<h2>4. Khi nào nên dùng / không nên dùng? (When to use / avoid?)</h2>

<h3>Bản đồ quyết định</h3>
<div class="mermaid">
flowchart TD
    Start([Bạn cần chức năng gì?]) --> Q1{Cần backend/thông tin đám mây?}
    Q1 -- Có --> Q2{Đã có server riêng và team vận hành?}
    Q2 -- Không --> Firebase[Firebase BaaS]
    Q2 -- Có --> Q3{Real-time / CRUD nhanh + scaling?}
    Q3 -- Có --> Firestore[Firestore hoặc tự build]
    Q1 -- Không --> Q4{Cần vị trí, bản đồ, thanh toán, đăng nhập Google?}
    Q4 -- Có --> GMS[Google Play Services API]
    Q4 -- Không --> Q5{Thiết bị có GMS?}
    Q5 -- Không --> Alt[Giải pháp thay thế: HMS, tự build backend]
    style Firebase fill:#FFA000,stroke:#E65100,color:#fff
    style GMS fill:#2196F3,stroke:#1565C0,color:#fff
    style Firestore fill:#4CAF50,stroke:#388E3C,color:#fff
    style Alt fill:#757575,stroke:#424242,color:#fff
</div>

<h3>Nên dùng</h3>
<table>
  <thead>
    <tr><th>Tình huống</th><th>Giải pháp</th></tr>
  </thead>
  <tbody>
    <tr><td>Gửi push notification tới hàng triệu user</td><td>FCM</td></tr>
    <tr><td>Theo dõi crash, session, hành vi user</td><td>Crashlytics + Analytics</td></tr>
    <tr><td>Xác thực đăng nhập nhanh, không tự build OAuth</td><td>Firebase Auth / Google Sign-In</td></tr>
    <tr><td>App cần real-time dữ liệu, tối ưu thời gian phát triển</td><td>Cloud Firestore</td></tr>
    <tr><td>Bản đồ, định vị, thanh toán trong app</td><td>Google Play Services</td></tr>
  </tbody>
</table>

<h3>Không nên dùng</h3>
<ul>
  <li><strong>Thiết bị không có GMS</strong> (Huawei mới, một số máy Trung Quốc): FCM, Maps, Location của Google <strong>không hoạt động</strong>. Cần dùng Huawei HMS hoặc tự build giải pháp thay thế.</li>
  <li><strong>Yêu cầu kiểm soát dữ liệu chặt chẽ</strong> (GDPR, dữ liệu nhạy cảm nội bộ): Firebase lưu dữ liệu trên cloud của Google, không thể tự host.</li>
  <li><strong>Đã có backend team mạnh + nhu cầu tùy biến sâu</strong>: tự build có thể rẻ và linh hoạt hơn về lâu dài.</li>
  <li><strong>Chỉ cần 1 chức năng đơn giản</strong>: đừng kéo cả Firebase vào, mỗi SDK đều tăng dung lượng APK và số lượng dependency.</li>
</ul>

<h2>5. Tích hợp vào project (Setup chuẩn)</h2>

<h3>Luồng tích hợp</h3>
<div class="mermaid">
flowchart LR
    A[Tạo project trên Firebase Console] --> B[Thêm app Android + package name + SHA-1]
    B --> C[Tải google-services.json vào thư mục app/]
    C --> D[Khai báo Gradle Plugin + Firebase BoM]
    D --> E[Sử dụng các SDK Firebase]
    style A fill:#FFA000,stroke:#E65100,color:#fff
    style C fill:#FFA000,stroke:#E65100,color:#fff
    style D fill:#2196F3,stroke:#1565C0,color:#fff
</div>

<h3>Bước 1 — Tạo project trên Firebase Console</h3>
<p>Vào <a href="https://console.firebase.google.com" target="_blank">console.firebase.google.com</a>, tạo project, thêm app Android với:</p>
<ul>
  <li><strong>Package name</strong> khớp 100% với <code>applicationId</code> trong <code>build.gradle</code>.</li>
  <li><strong>SHA-1</strong> của keystore (dùng cho Google Sign-In và một số tính năng).</li>
</ul>

<div class="callout callout-important"><span class="callout-icon">🔴</span><div class="callout-body"><strong>Package name phải khớp chính xác.</strong> Nếu khai báo sai, app sẽ crash ngay khi khởi động với lỗi: <em>"Default FirebaseApp is not initialized"</em> hoặc <em>"google-services.json is missing"</em>.</div></div>

<h3>Bước 2 — Thêm plugin vào Gradle</h3>
<p><strong>Project-level <code>build.gradle.kts</code> (hoặc <code>settings.gradle.kts</code>):</strong></p>
<pre><code data-lang="kotlin">plugins {
    id("com.google.gms.google-services") version "4.4.2" apply false
}</code></pre>

<p><strong>App-level <code>build.gradle.kts</code>:</strong></p>
<pre><code data-lang="kotlin">plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.gms.google-services")   // Bắt buộc để sinh FirebaseApp từ json
}</code></pre>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Plugin <code>com.google.gms.google-services</code></strong> đọc <code>google-services.json</code> và <strong>tự động sinh</strong> code khởi tạo <code>FirebaseApp</code>. Bạn không cần gọi <code>FirebaseApp.initializeApp()</code> trong code.</div></div>

<h3>Bước 3 — Thêm dependency với Firebase BoM</h3>
<p><strong>Firebase BoM (Bill of Materials)</strong> giúp tất cả SDK Firebase <strong>cùng một version</strong> — tránh lỗi xung đột version (conflict):</p>
<pre><code data-lang="kotlin">dependencies {
    // BoM: quản lý version tập trung
    implementation(platform("com.google.firebase:firebase-bom:33.5.1"))

    // Các SDK — KHÔNG ghi version
    implementation("com.google.firebase:firebase-analytics")
    implementation("com.google.firebase:firebase-messaging")
    implementation("com.google.firebase:firebase-crashlytics")
    implementation("com.google.firebase:firebase-auth")
    implementation("com.google.firebase:firebase-firestore")
    implementation("com.google.firebase:firebase-storage")
    implementation("com.google.firebase:firebase-config-ktx")
    implementation("com.google.android.gms:play-services-location:21.3.0")
    implementation("com.google.android.gms:play-services-maps:19.0.0")
    implementation("com.google.android.libraries.places:places:3.5.0")
}</code></pre>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Không ghi version riêng cho từng SDK Firebase</strong> khi đã dùng BoM. BoM sẽ chọn version tương thích với nhau, hạn chế tối đa <code>Dependency conflict</code> khi build.</div></div>

<h3>Bước 4 — Đảm bảo minSdk</h3>
<p>Firebase yêu cầu <strong>minSdk ≥ 21</strong> (Android 5.0). Kiểm tra trong <code>build.gradle.kts</code>:</p>
<pre><code data-lang="kotlin">defaultConfig {
    minSdk = 21
}</code></pre>

<h2>6. Thực chiến Firebase</h2>

<h3>6.1 FCM — Push Notification</h3>
<p><strong>Tình huống:</strong> Gửi thông báo đơn hàng mới tới người dùng, hiển thị notification cả khi app đang mở lẫn bị kill.</p>

<div class="mermaid">
sequenceDiagram
    participant Server as Backend của bạn
    participant FCM as FCM Server
    participant GMS as Google Play Services
    participant App as Ứng dụng

    App->>FCM: Đăng ký, nhận device token
    App->>Server: Gửi token lên server
    Server->>FCM: Gọi HTTP v1 API (message + token)
    FCM->>GMS: Đẩy message xuống device
    GMS->>App: App đang foreground → onMessageReceived()
    GMS->>OS: App background/kill → hiển thị notification hệ thống
</div>

<p><strong>FirebaseMessagingService</strong> — nhận message:</p>
<pre><code data-lang="kotlin">class OrderMessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        // Token mới được cấp (đăng nhập lại, cài lại app...)
        // Gửi lên server: apiService.uploadFcmToken(token)
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        // Khi app ĐANG foreground — notification hệ thống KHÔNG tự hiện
        val title = remoteMessage.notification?.title ?: "Thông báo"
        val body = remoteMessage.notification?.body ?: remoteMessage.data["body"] ?: ""
        showNotification(title, body)
    }
}</code></pre>

<p><strong>Khai báo trong AndroidManifest.xml:</strong></p>
<pre><code data-lang="xml">&lt;service
    android:name=".data.notification.OrderMessagingService"
    android:exported="false"&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="com.google.firebase.MESSAGING_EVENT" /&gt;
    &lt;/intent-filter&gt;
&lt;/service&gt;</code></pre>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Foreground vs Background:</strong> Khi app ở foreground, <code>onMessageReceived()</code> được gọi và bạn <strong>tự hiển thị notification</strong>. Khi app ở background hoặc bị kill, GMS <strong>tự hiển thị</strong> notification từ payload <code>notification</code> — <code>onMessageReceived()</code> <strong>không được gọi</strong>. Muốn luôn nhận data ở background, gửi <strong>data message</strong> (không có field <code>notification</code>) và để client xử lý trong <code>onMessageReceived()</code>.</div></div>

<h3>6.2 Firebase Analytics &amp; Event Log</h3>
<p><strong>Tình huống:</strong> Theo dõi sự kiện "add_to_cart" để đo hiệu quả chiến dịch.</p>

<p><strong>Gửi sự kiện:</strong></p>
<pre><code data-lang="kotlin">// FirebaseAnalytics là Singleton — lấy qua Application context
private val analytics: FirebaseAnalytics =
    FirebaseAnalytics.getInstance(applicationContext)

fun trackAddToCart(productId: String, price: Double, currency: String) {
    val bundle = Bundle().apply {
        putString(FirebaseAnalytics.Param.ITEM_ID, productId)
        putDouble(FirebaseAnalytics.Param.PRICE, price)
        putString(FirebaseAnalytics.Param.CURRENCY, currency)
    }
    analytics.logEvent(FirebaseAnalytics.Event.ADD_TO_CART, bundle)
}</code></pre>

<p><strong>User property</strong> (thuộc tính người dùng, dùng để phân khúc):</p>
<pre><code data-lang="kotlin">analytics.setUserProperty("user_tier", "premium")</code></pre>

<p><strong>Xem Event Log trong quá trình debug:</strong></p>
<ul>
  <li>Bật <strong>DebugView</strong> trên Firebase Console.</li>
  <li>Xem trực tiếp trong logcat bằng filter:</li>
</ul>
<pre><code data-lang="bash">adb shell setprop debug.firebase.analytics.app &lt;package_name&gt;</code></pre>
<p>Khi đó trong logcat hiện các dòng: <code>I/FA: Event received...</code> với đầy đủ tên sự kiện và tham số.</p>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Event log của Analytics là chìa khóa debug.</strong> Nếu sự kiện bạn gửi không xuất hiện, kiểm tra: đã tắt <strong>data saver</strong>? đã set prop <code>debug.firebase.analytics.app</code>? đã gửi đúng package name khi set prop?</div></div>

<h3>6.3 Crashlytics — Báo cáo crash</h3>
<p><strong>Tình huống:</strong> Bắt crash tự động, kèm log và thông tin người dùng để fix nhanh.</p>

<p><strong>Cấu hình:</strong> Plugin <code>com.google.firebase.crashlytics</code> trong Gradle (thêm dòng <code>id("com.google.firebase.crashlytics")</code> vào <code>plugins</code>).</p>

<p><strong>Tùy biến crash log trong code:</strong></p>
<pre><code data-lang="kotlin">class App : Application() {
    override fun onCreate() {
        super.onCreate()
        // Đăng ký handler crash toàn cục (bắt cả lỗi không gây crash app)
        Thread.setDefaultUncaughtExceptionHandler { thread, throwable ->
            FirebaseCrashlytics.getInstance().recordException(throwable)
        }
    }
}

fun reportUserAction(userId: String) {
    val crashlytics = FirebaseCrashlytics.getInstance()
    crashlytics.setUserId(userId)            // Ai gặp crash
    crashlytics.setCustomKey("last_screen", "checkout") // Đang ở màn nào
    crashlytics.log("User bấm nút 'Thanh toán'")        // Log trước crash
    // → Khi crash xảy ra, các dòng log() này hiện trong báo cáo
}</code></pre>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Debug nhanh Crashlytics:</strong> Bật <strong>Crashlytics NDK</strong> và <strong>Crashlytics debug</strong> để xem crash ngay trên máy test: trong logcat filter <code>Crashlytics</code>. Bản build debug thường hiện log đầy đủ hơn.</div></div>

<h3>6.4 Firebase Auth + Google Sign-In</h3>
<p><strong>Tình huống:</strong> Người dùng đăng nhập bằng tài khoản Google.</p>

<div class="mermaid">
sequenceDiagram
    participant App as Ứng dụng
    participant GMS as Google Sign-In (GMS)
    participant FB as Firebase Auth
    participant GCloud as Google Backend

    App->>GMS: khởi tạo GoogleSignInClient
    App->>App: startActivityForResult(googleSignInIntent)
    GMS-->>App: Trả về GoogleSignInAccount + idToken
    App->>FB: signInWithCredential(GoogleAuthProvider credential)
    FB->>GCloud: Xác thực idToken
    GCloud-->>FB: OK
    FB-->>App: FirebaseUser — đăng nhập thành công
</div>

<p><strong>Code trong ViewModel + Activity (luồng thực chiến):</strong></p>
<pre><code data-lang="kotlin">// --- data/remote/GoogleAuthDataSource.kt ---
class GoogleAuthDataSource(
    private val firebaseAuth: FirebaseAuth
) {
    fun currentUser(): String? = firebaseAuth.currentUser?.uid

    suspend fun signInWithGoogle(idToken: String): Result&lt;String&gt; = runCatching {
        val credential = GoogleAuthProvider.getCredential(idToken, null)
        firebaseAuth.signInWithCredential(credential).await()
        firebaseAuth.currentUser?.uid ?: throw IllegalStateException("Login failed")
    }

    suspend fun signOut() = firebaseAuth.signOut()
}

// --- UI: Activity xử lý luồng Google Sign-In ---
private lateinit var googleSignInClient: GoogleSignInClient

override fun onCreate(savedInstanceState: Bundle?) {
    val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
        .requestIdToken(getString(R.string.default_web_client_id)) // từ google-services.json
        .requestEmail()
        .build()
    googleSignInClient = GoogleSignIn.getClient(this, gso)
}

fun startGoogleSignIn() {
    startActivityForResult(googleSignInClient.signInIntent, RC_SIGN_IN)
}

override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    if (requestCode == RC_SIGN_IN) {
        val task = GoogleSignIn.getSignedInAccountFromIntent(data)
        handleSignInResult(task)
    }
}

private fun handleSignInResult(task: Task&lt;GoogleSignInAccount&gt;) {
    val account = task.getResult(ApiException::class.java)
    val idToken = account.idToken
    if (idToken != null) {
        viewModel.signInWithGoogle(idToken)   // gọi data layer, lưu session
    }
}</code></pre>

<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><code>R.string.default_web_client_id</code> được <strong>tự sinh bởi plugin</strong> <code>google-services</code> từ <code>google-services.json</code>. Nếu bạn xóa <code>google-services.json</code> hoặc không apply plugin, resource này không tồn tại → build lỗi ngay.</div></div>

<h3>6.5 Remote Config — Cấu hình từ xa</h3>
<p><strong>Tình huống:</strong> Bật/tắt tính năng "gợi ý bạn bè" cho một phần người dùng mà không cần phát hành bản update.</p>

<pre><code data-lang="kotlin">// Domain: giao diện đọc config
interface FeatureFlags {
    val showFriendSuggestion: Boolean
}

// Data: RemoteConfigDataSource
class RemoteConfigDataSource : FeatureFlags {
    override val showFriendSuggestion: Boolean
        get() = remoteConfig.getBoolean(KEY_SHOW_FRIEND_SUGGESTION)

    suspend fun fetchAndActivate() {
        val remoteConfig = FirebaseRemoteConfig.getInstance()
        remoteConfig.setDefaultsAsync(
            mapOf(KEY_SHOW_FRIEND_SUGGESTION to false) // giá trị mặc định local
        )
        val settings = FirebaseRemoteConfigSettings.Builder()
            .setMinimumFetchIntervalInSeconds(3600) // fetch tối đa 1h/lần
            .build()
        remoteConfig.setConfigSettingsAsync(settings)
        // fetch + activate: áp dụng giá trị mới từ server
        remoteConfig.fetchAndActivate().await()
    }
}</code></pre>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Luôn khai báo default value local</strong> (<code>setDefaultsAsync</code>) để app không bị null/crash khi chưa kịp fetch hoặc mất mạng.</div></div>

<h3>6.6 Firestore &amp; Storage — Tổng quan</h3>
<p><strong>Tình huống:</strong> Lưu giỏ hàng real-time, đồng bộ offline khi mất mạng.</p>

<p><strong>Firestore (database NoSQL real-time):</strong></p>
<pre><code data-lang="kotlin">// Structure: users/{userId}/cart/{itemId}
data class CartItem(val productId: String, val qty: Int)

// Ghi dữ liệu
val docRef = FirebaseFirestore.getInstance()
    .collection("users")
    .document(userId)
    .collection("cart")
    .document(itemId)

docRef.set(CartItem(productId, qty))

// Lắng nghe real-time + tự động offline persistence
docRef.addSnapshotListener { snapshot, error -&gt;
    if (error != null) return@addSnapshotListener
    // snapshot.toObject(CartItem::class.java) → cập nhật UI
}</code></pre>

<p><strong>Storage (lưu file, ảnh):</strong></p>
<pre><code data-lang="kotlin">// Upload ảnh avatar
val ref = FirebaseStorage.getInstance().reference
    .child("avatars/$userId.jpg")

ref.putFile(uri)
    .addOnSuccessListener { task -&gt;
        // Lấy URL để lưu vào Firestore
    }
    .addOnFailureListener { /* xử lý lỗi */ }</code></pre>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Security Rules là bắt buộc.</strong> Mặc định Firestore/Storage chặn toàn bộ truy cập (đúng, an toàn). Khi deploy rules, đừng mở kiểu <code>if true</code> (cho phép tất cả) — đó là lỗ hổng bảo mật nghiêm trọng, hacker có thể đọc/xóa toàn bộ dữ liệu của bạn.</div></div>

<h3>6.7 App Distribution &amp; Emulator Suite</h3>
<p><strong>Firebase App Distribution</strong> phân phối build test (<code>.apk</code>/<code>.aab</code>) tới tester nhanh, không cần qua Play Console:</p>
<ul>
  <li>Upload qua <strong>Gradle plugin</strong> (<code>com.google.firebase.appdistribution</code>) hoặc CLI.</li>
  <li>Tester nhận link cài, gửi <strong>feedback</strong> (screenshot, crash log) ngay trong app.</li>
  <li>Quản lý tester theo nhóm (QA, team leader, khách hàng demo...).</li>
</ul>

<p><strong>Khác biệt so với Play Console:</strong></p>
<table>
  <thead>
    <tr><th>Tiêu chí</th><th>App Distribution</th><th>Play Console (Internal/Closed testing)</th></tr>
  </thead>
  <tbody>
    <tr><td>Mục đích</td><td>Phân phối build test nhanh</td><td>Phê duyệt trước khi public</td></tr>
    <tr><td>Tốc độ</td><td>Giây, không cần review</td><td>Cần review của Google</td></tr>
    <tr><td>Feedback từ tester</td><td>Có (screenshot, crash)</td><td>Không</td></tr>
    <tr><td>Phiên bản lưu giữ</td><td>Mặc định giữ gần đây</td><td>Không giới hạn</td></tr>
  </tbody>
</table>

<p><strong>Firebase Emulator Suite</strong> — chạy toàn bộ Firebase (Auth, Firestore, Storage, Functions...) <strong>trên máy local</strong> trong lúc phát triển:</p>
<pre><code data-lang="bash">firebase emulators:start   # khởi động emulators từ thư mục dự án</code></pre>

<pre><code data-lang="kotlin">// Khởi tạo app dùng emulator khi debug
if (BuildConfig.DEBUG) {
    FirebaseFirestore.getInstance()
        .useEmulator("10.0.2.2", 8080)   // 10.0.2.2 = host machine từ emulator Android
}</code></pre>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Dùng Emulator Suite trong quá trình phát triển</strong> để <strong>không tốn quota thật</strong> và không làm bẩn dữ liệu production. Chỉ chuyển sang dữ liệu thật khi test tích hợp với backend thật.</div></div>

<h2>7. Thực chiến Google Play Services</h2>

<h3>7.1 Location — FusedLocationProvider</h3>
<p><strong>Tình huống:</strong> Lấy vị trí hiện tại một lần (nhất) để hiển thị trên màn hình chính.</p>

<p><strong>Cấu hình Manifest:</strong></p>
<pre><code data-lang="xml">&lt;uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" /&gt;
&lt;uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /&gt;</code></pre>

<p><strong>Kotlin:</strong></p>
<pre><code data-lang="kotlin">class LocationDataSource(
    private val fusedLocation: FusedLocationProviderClient
) {
    suspend fun getCurrentLocation(): Location? {
        return try {
            val request = LocationRequest.Builder(
                Priority.PRIORITY_HIGH_ACCURACY, 10_000L
            ).build()
            // getCurrentLocation: lấy 1 lần, không cần location listener
            fusedLocation.getCurrentLocation(request, CancellationTokenSource().token).await()
        } catch (e: SecurityException) {
            null // Chưa có quyền — UI phải request permission trước
        }
    }
}</code></pre>

<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Bắt buộc request runtime permission</strong> (<code>ACCESS_FINE_LOCATION</code>) trước khi gọi API, và <strong>khai báo cả hai permission</strong> trong Manifest. Nếu thiếu, app sẽ ném <code>SecurityException</code>.</div></div>

<h3>7.2 Google Maps — Hiển thị bản đồ</h3>
<p><strong>Tình huống:</strong> Hiển thị vị trí cửa hàng trên bản đồ.</p>

<p><strong>Bước 1 — Tạo API Key</strong> trên <a href="https://console.cloud.google.com" target="_blank">Google Cloud Console</a>, enable <strong>Maps SDK for Android</strong>, giới hạn key theo <strong>package name + SHA-1</strong> (best practice).</p>

<p><strong>Bước 2 — Khai báo trong Manifest:</strong></p>
<pre><code data-lang="xml">&lt;meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="AIza...YOUR_KEY" /&gt;</code></pre>

<p><strong>Bước 3 — Hiển thị MapFragment trong Compose hoặc Fragment truyền thống:</strong></p>
<pre><code data-lang="kotlin">// XML: &lt;fragment class="com.google.android.gms.maps.SupportMapFragment" /&gt;

override fun onMapReady(map: GoogleMap) {
    map.uiSettings.isZoomControlsEnabled = true
    map.addMarker(
        MarkerOptions()
            .position(LatLng(21.0285, 105.8542))
            .title("Hà Nội")
    )
    map.moveCamera(
        CameraUpdateFactory.newLatLngZoom(LatLng(21.0285, 105.8542), 15f)
    )
}</code></pre>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>API Key lộ trong source = rủi ro lớn.</strong> Nếu không giới hạn key theo package + SHA-1, kẻ khác có thể trích xuất key từ APK (dễ dàng bằng các công cụ decompile) và sử dụng trục lợi → key bị khóa, chi phí tăng. Luôn giới hạn key trong Cloud Console.</div></div>

<h3>7.3 AdMob — Quảng cáo (dẫn dắt)</h3>
<p>AdMob hiển thị quảng cáo (banner, interstitial, rewarded) qua Google Mobile Ads SDK. Đây là chủ đề riêng có nhiều quy định của Google (policy quảng cáo, hợp đồng) — sẽ được trình bày chi tiết ở topic <strong>4.2.3.3 Advertisements</strong>.</p>

<h2>8. Vị trí trong Clean Architecture / MVVM (Tư duy hệ thống)</h2>
<p>Google Service và Firebase nằm ở <strong>Data Layer</strong> (tầng dữ liệu), bên trong các <code>*DataSource</code>. <strong>Domain Layer chỉ biết interface</strong> — không được biết Firebase là gì. Điều này giúp thay thế Firebase (vd sang HMS hoặc backend riêng) không đụng vào UI.</p>

<div class="mermaid">
flowchart LR
    subgraph UI["Presentation Layer"]
        A[Activity / Compose]
        VM[ViewModel]
    end
    subgraph Domain["Domain Layer"]
        UC[UseCase]
        IF["Interface: NotificationRepository AuthRepository"]
    end
    subgraph Data["Data Layer"]
        REPO[Repository]
        FB["FirebaseDataSource: FCM, Auth, Firestore, Crashlytics, Analytics"]
        GMS["GoogleApiDataSource: Location, Maps"]
    end

    A -- observe --> VM
    VM --> UC
    UC --> IF
    IF --> REPO
    REPO --> FB
    REPO --> GMS

    style IF fill:#7E57C2,stroke:#4527A0,color:#fff
    style FB fill:#FFA000,stroke:#E65100,color:#fff
    style GMS fill:#2196F3,stroke:#1565C0,color:#fff
</div>

<p><strong>Nguyên tắc:</strong></p>
<ul>
  <li>ViewModel gọi <code>UseCase</code> (Domain), không gọi Firebase trực tiếp.</li>
  <li><code>DataSource</code> (Data) bọc mọi API của Firebase/GMS, trả về <strong>model thuần</strong> của app.</li>
  <li>Thay đổi Firebase ↔ HMS chỉ cần viết lại <code>DataSource</code> + đổi DI binding, UI/Domain không đổi.</li>
</ul>

<h2>9. Lỗi thường gặp &amp; Best Practices (Pitfalls)</h2>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Version mismatch / Dependency conflict:</strong> Khi dùng nhiều SDK Firebase với version khác nhau → build lỗi <code>Dependency conflict</code> hoặc crash runtime.<br/><strong>Giải pháp:</strong> Luôn dùng <strong>Firebase BoM</strong> và không ghi version riêng lẻ.</div></div>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Thiếu <code>google-services.json</code> hoặc sai package name:</strong> App crash ngay khi khởi động: <em>"Default FirebaseApp is not initialized in this process"</em>.<br/><strong>Giải pháp:</strong> Đặt đúng file vào <code>app/</code>, khớp <code>package name</code> giữa Console và <code>applicationId</code>.</div></div>

<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>API Key sai hoặc không giới hạn:</strong> Maps/Location trả về lỗi "API key not authorized" hoặc bị trục lợi.<br/><strong>Giải pháp:</strong> Restrict key theo package name + SHA-1 trong Cloud Console.</div></div>

<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Quên permission runtime:</strong> Location, Camera, Microphone... không request quyền → <code>SecurityException</code>.<br/><strong>Giải pháp:</strong> Dùng thư viện permission (vd Accompanist) và kiểm tra <code>checkSelfPermission</code> trước mỗi call.</div></div>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>minSdk &lt; 21:</strong> Firebase SDK yêu cầu minSdk 21 trở lên, build sẽ fail.<br/><strong>Giải pháp:</strong> Set <code>minSdk = 21</code> trong <code>build.gradle.kts</code>.</div></div>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Debug nhanh:</strong> Bật <code>debug.firebase.analytics.app</code> để xem event log; filter <code>Crashlytics</code> trong logcat để xem crash chi tiết; dùng <strong>Firebase Emulator</strong> khi phát triển để không đụng dữ liệu thật.</div></div>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Best practice về dữ liệu:</strong> Luôn giới hạn Security Rules; không gửi dữ liệu nhạy cảm (password, token) lên Analytics/Crashlytics; bật <strong>App Check</strong> cho dữ liệu nhạy cảm.</div></div>

<h2>10. Trade-offs, chi phí &amp; Security</h2>
<table>
  <thead>
    <tr><th>Khía cạnh</th><th>Lợi ích</th><th>Đánh đổi / Lưu ý</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Tốc độ phát triển</strong></td><td>Không phải tự build backend, SDK sẵn sàng</td><td>Phụ thuộc Google, ít kiểm soát</td></tr>
    <tr><td><strong>Chi phí</strong></td><td>Gói miễn phí hào phóng (Spark/Blaze)</td><td>Vượt quota → tốn phí theo usage (Firestore reads/writes, Storage, Functions)</td></tr>
    <tr><td><strong>Khả năng mở rộng</strong></td><td>Tự scale, không cần quản lý server</td><td>Khó chuyển provider khi dữ liệu lớn</td></tr>
    <tr><td><strong>Security</strong></td><td>Auth + Security Rules có sẵn</td><td>Rules cấu hình sai = lộ dữ liệu; dữ liệu trên cloud Google</td></tr>
    <tr><td><strong>Độ phụ thuộc GMS</strong></td><td>GMS phổ biến trên thiết bị có Play Store</td><td>Máy không có GMS (Huawei, Trung Quốc) → cần HMS/thay thế</td></tr>
    <tr><td><strong>Dung lượng APK</strong></td><td>—</td><td>Mỗi SDK Firebase tăng vài trăm KB → cân nhắc chỉ thêm cần thiết</td></tr>
  </tbody>
</table>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Chi phí dự đoán:</strong> Firestore tính tiền theo số lượt đọc/ghi — một app chat có thể đọc/ghi rất nhiều. Theo dõi <strong>Usage</strong> trên Firebase Console thường xuyên để tránh hóa đơn bất ngờ.</div></div>

<h2>11. Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/develop/connectivity/play-services" target="_blank">Google Play Services overview — Android Developers</a></li>
  <li><a href="https://firebase.google.com/docs" target="_blank">Firebase Documentation</a></li>
  <li><a href="https://firebase.google.com/docs/cloud-messaging/android/client" target="_blank">Firebase Cloud Messaging — Android</a></li>
  <li><a href="https://firebase.google.com/docs/analytics/get-started" target="_blank">Firebase Analytics — Android</a></li>
  <li><a href="https://firebase.google.com/docs/crashlytics/get-started?platform=android" target="_blank">Firebase Crashlytics — Android</a></li>
  <li><a href="https://firebase.google.com/docs/auth/android/google-signin" target="_blank">Firebase Authentication — Google Sign-In</a></li>
  <li><a href="https://firebase.google.com/docs/remote-config/get-started?platform=android" target="_blank">Firebase Remote Config — Android</a></li>
  <li><a href="https://firebase.google.com/docs/firestore/quickstart" target="_blank">Cloud Firestore — Android</a></li>
  <li><a href="https://firebase.google.com/docs/app-distribution" target="_blank">Firebase App Distribution</a></li>
  <li><a href="https://firebase.google.com/docs/emulator-suite" target="_blank">Firebase Emulator Suite</a></li>
  <li><a href="https://developer.android.com/develop/sensors-and-location/location/current-location" target="_blank">Google Play services — get current location</a></li>
  <li><a href="https://developers.google.com/maps/documentation/android-sdk/start" target="_blank">Google Maps SDK for Android</a></li>
</ul>
    `
  },

      'advertisements': {
    title: '4.2.3.3 Advertisements',
    summary: 'Hiểu bản chất quảng cáo trên Android, vì sao AdMob và Google Mobile Ads SDK tồn tại, phân biệt Banner/Interstitial/Rewarded/Native Ads, cách tích hợp trong XML lẫn Jetpack Compose theo MVVM/Clean Architecture, và các chú thích vòng đời khi hiển thị ad.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '60 phút',
    depth: 'deep-dive',
    tags: ['android', 'ads', 'admob', 'google-mobile-ads', 'banner', 'interstitial', 'rewarded', 'native-ads', 'mediation', 'monetization', 'mvvm'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['android-service', 'google-service'],
    related: ['activity-lifecycle', 'fragment-lifecycle', 'fragment-manager'],
    learningOutcomes: [
      'Giải thích được bản chất quảng cáo trên Android và vai trò của từng thành phần.',
      'Phân biệt được Banner, Interstitial, Rewarded, Native Ads.',
      'Áp dụng được Google Mobile Ads SDK vào app cả XML lẫn Compose.',
      'Triển khai được quảng cáo trong MVVM/Clean Architecture.',
      'Giải thích được các chú thích về vòng đời khi hiển thị ad.',
      'Nhận diện được các lỗi tích hợp phổ biến và cách debug.'
    ],
    knowledgeGap: 'Nhiều người chỉ biết dán banner lên màn hình, không hiểu luồng đấu giá ad, tải lại ad sai vòng đời gây crash.',
    updatedAt: '2026-08-05',
    readTime: '60 phút',
    content: `
<p># Advertisements</p>

<h2>Vấn đề cần giải quyết</h2>

<p>Người dùng đa số không muốn trả tiền để dùng app. Nhà phát triển cần tiền để duy trì máy chủ, trả lương, phát triển tính năng. Mâu thuẫn này được giải quyết bằng <strong>quảng cáo</strong>: app miễn phí cho user, revenue đến từ advertiser trả tiền cho mỗi lần hiển thị.</p>

<p>Nhưng quảng cáo không đơn giản là "dán một banner lên màn hình". App của bạn chỉ là <strong>một phía</strong> (Publisher). Để có quảng cáo hiển thị, phải có cả một hệ thống gồm:</p>

<li><strong>Advertiser</strong> (advertiser) — người trả tiền để quảng bá sản phẩm/dịch vụ.</li>
<li><strong>Ad Network</strong> (ad network) — trung gian kết nối advertiser với publisher, vận hành real-time bidding.</li>
<li><strong>Publisher</strong> (bạn) — app show ad để kiếm revenue.</li>
<li><strong>SDK</strong> — thư viện chạy trong app để yêu cầu và show ad.</li>

<p>Nếu tự xây toàn bộ hệ thống này thì không khả thi. Bài này giúp bạn hiểu và tích hợp <strong>Google Mobile Ads SDK (AdMob)</strong> — ad network lớn nhất của Google — đúng cách, từ bản chất đến code thực tế.</p>

<h2>Sau khi học xong</h2>

<li>Giải thích được bản chất quảng cáo trên Android và vai trò của từng thành phần (Advertiser, Ad Network, Publisher, SDK).</li>
<li>Phân biệt được Banner, Interstitial, Rewarded, Rewarded Interstitial và Native Ads — khi nào dùng loại nào, ưu nhược điểm từng loại.</li>
<li>Áp dụng được Google Mobile Ads SDK vào app cả View System (XML) lẫn Jetpack Compose.</li>
<li>Triển khai được quảng cáo trong MVVM/Clean Architecture ở đúng tầng, không vi phạm kiến trúc.</li>
<li>Giải thích được các chú thích về lifecycle khi show ad (load/show/destroy đúng thời điểm).</li>
<li>Nhận diện được các lỗi tích hợp phổ biến và cách debug, test ad an toàn.</li>

<h2>Quảng cáo trên Android là gì?</h2>

<strong>Quảng cáo trên Android</strong> là việc một app (Publisher) hiển thị nội dung quảng bá trả phí cho user thông qua một SDK của Ad Network. Phổ biến nhất là <strong>Google AdMob</strong> — nền tảng quản lý quảng cáo của Google, hoạt động dựa trên <strong>Google Mobile Ads SDK</strong>.

<pre data-lang="text"><code>Quảng cáo (Ads) = cầu nối giữa advertiser (trả tiền) và app miễn phí (phục vụ user)
</code></pre>

<h3>Các thành phần tham gia</h3>

<div class="mermaid">
flowchart LR
    A[Advertiser - trả tiền] -->|Đăng ký campaign| B[Ad Network - AdMob]
    B -->|Trả ad request qua đấu giá| C[SDK trong app của bạn]
    C -->|Hiển thị| D[Người dùng]
    D -->|Tương tác click/install| E[Advertiser đạt mục tiêu]
    E -->|Trả revenue| B
    B -->|Chia phần cho publisher| F[Bạn - Publisher]

    style B fill:#2196F3,stroke:#1565C0,color:#fff
    style F fill:#FFA000,stroke:#E65100,color:#fff
</div>

<strong>Chi tiết từng thành phần:</strong>

<strong>Advertiser (Nhà quảng cáo):</strong>
<li>Là công ty/cá nhân muốn quảng bá sản phẩm, dịch vụ.</li>
<li>Trả tiền cho Ad Network theo mô hình:</li>
<p>  - <strong>CPC (Cost Per Click):</strong> trả tiền khi user click vào ad.</p>
<p>  - <strong>CPM (Cost Per Mille):</strong> trả tiền cho mỗi 1000 impression.</p>
<p>  - <strong>CPI (Cost Per Install):</strong> trả tiền khi user cài app qua ad.</p>
<li>Tạo campaign quảng cáo trên Google Ads, đặt budget, chọn target audience.</li>

<strong>Ad Network (Mạng quảng cáo - AdMob):</strong>
<li>Trung gian kết nối advertiser với publisher.</li>
<li>Vận hành <strong>real-time bidding (Real-Time Bidding - RTB)</strong>: mỗi khi có ad request, nhiều advertiser đấu giá, ad trả tiền cao nhất sẽ được hiển thị.</li>
<li>Quản lý payment, report, fraud detection (invalid traffic).</li>
<li>Cung cấp SDK cho publisher tích hợp vào app.</li>

<strong>Publisher (Bạn):</strong>
<li>Tích hợp SDK vào app.</li>
<li>Hiển thị ad để kiếm revenue.</li>
<li>Tuân thủ chính sách của Ad Network (không click fraud, không show ad sai cách...).</li>

<strong>SDK (Google Mobile Ads SDK):</strong>
<li>Thư viện chạy trong app của bạn.</li>
<li>Gửi ad request đến Ad Network.</li>
<li>Nhận ad về và hiển thị.</li>
<li>Theo dõi impression, click, gửi dữ liệu về Ad Network.</li>

<strong>App ID và Ad Unit ID</strong> — hai mã định danh quan trọng:

<li><strong>App ID</strong> (<code>ca-app-pub-XXXX~YYYY</code>) — định danh <strong>app của bạn</strong> trong AdMob, khai báo trong <code>AndroidManifest.xml</code>. Mỗi app chỉ có một App ID.</li>
<li><strong>Ad Unit ID</strong> (<code>ca-app-pub-XXXX/YYYY</code>) — định danh từng <strong>vị trí show ad</strong> trong app. Một app có thể có nhiều Ad Unit ID:</li>
<p>  - <code>ca-app-pub-XXXX/1111</code> — Banner ở màn hình chính.</p>
<p>  - <code>ca-app-pub-XXXX/2222</code> — Interstitial sau khi hoàn thành level.</p>
<p>  - <code>ca-app-pub-XXXX/3333</code> — Rewarded khi user muốn nhận thưởng.</p>

<h2>Vì sao AdMob tồn tại? Nó giải quyết vấn đề gì?</h2>

<h3>Vấn đề khi không có Ad Network</h3>

<p>Nếu không có Ad Network, bạn sẽ phải:</p>

<li><strong>Tự tìm advertiser</strong> — rất khó, cần đội ngũ sales, hợp đồng pháp lý.</li>
<li><strong>Tự xây hệ thống đấu giá</strong> — phức tạp, cần server, thuật toán tối ưu.</li>
<li><strong>Tự quản lý payment</strong> — xử lý tiền từ nhiều nguồn, reconciliation, thuế.</li>
<li><strong>Tự fraud detection</strong> — phát hiện invalid click, invalid impression.</li>
<li><strong>Tự cung cấp nguồn ad</strong> — nếu không có advertiser, app trống trơn.</li>

<p>Tất cả những việc này đòi hỏi nguồn lực khổng lồ, không khả thi với đa số app.</p>

<h3>AdMob giải quyết những gì?</h3>

<strong>1. Nguồn quảng cáo khổng lồ</strong>

<p>AdMob kết nối với hàng nghìn advertiser qua Google Ads — nền tảng quảng cáo lớn nhất thế giới. Bạn không cần tìm advertiser, AdMob tự động cung cấp ad phù hợp với ngữ cảnh app của bạn.</p>

<strong>2. Tự động đấu giá (Ad Auction)</strong>

<p>Mỗi lần app yêu cầu ad, AdMob tổ chức real-time bidding:</p>

<div class="mermaid">
sequenceDiagram
    participant App as App của bạn
    participant AdMob as AdMob Server
    participant Adv1 as Advertiser A
    participant Adv2 as Advertiser B
    participant Adv3 as Advertiser C

    App->>AdMob: Gửi ad request
    AdMob->>Adv1: Mời đấu giá
    AdMob->>Adv2: Mời đấu giá
    AdMob->>Adv3: Mời đấu giá
    Adv1-->>AdMob: Trả giá 0.50
    Adv2-->>AdMob: Trả giá 0.75
    Adv3-->>AdMob: Trả giá 0.60
    AdMob->>AdMob: Chọn Advertiser B
    AdMob-->>App: Trả về ad
    App->>App: Hiển thị ad
</div>

<strong>3. Mediation — tối đa revenue</strong>

<p>AdMob có thể làm trung gian với các ad network khác (Meta Audience Network, AppLovin, Unity Ads...). Khi app yêu cầu ad, AdMob hỏi nhiều network cùng lúc, chọn ad trả tiền cao nhất:</p>

<div class="mermaid">
flowchart TB
    App[App của bạn] -->|Ad Request| AdMob[AdMob Mediation]
    AdMob -->|Hỏi giá| Network1[AdMob Network]
    AdMob -->|Hỏi giá| Network2[Meta Audience Network]
    AdMob -->|Hỏi giá| Network3[AppLovin]
    AdMob -->|Hỏi giá| Network4[Unity Ads]
    
    Network1 -.->| $0.50| AdMob
    Network2 -.->| $0.80| AdMob
    Network3 -.->| $0.65| AdMob
    Network4 -.->| $0.70| AdMob
    
    AdMob -->|Chọn Meta| App
</div>

<strong>4. Thanh toán, report, fraud detection</strong>

<li><strong>Thanh toán:</strong> AdMob tự động chuyển tiền vào tài khoản ngân hàng của bạn hàng tháng (khi đạt ngưỡng tối thiểu $100).</li>
<li><strong>Báo cáo:</strong> Dashboard chi tiết về impression, click, revenue, eCPM (effective Cost Per Mille — revenue trên 1000 impression).</li>
<li><strong>Chống fraud:</strong> Google tự động phát hiện invalid click, invalid impression, bảo vệ advertiser và publisher.</li>

<h2>Cách hoạt động bên trong</h2>

<h3>Luồng yêu cầu ad chi tiết</h3>

<div class="mermaid">
sequenceDiagram
    participant App as Ứng dụng (SDK)
    participant GMS as Google Play Services
    participant ADM as AdMob Server
    participant Net as Ad Networks khác (Mediation)

    App->>GMS: MobileAds.initialize(context) - khởi tạo SDK
    Note over App,GMS: Khởi tạo 1 lần trong Application.onCreate

    App->>GMS: Tạo AdRequest và load (banner/interstitial/rewarded)
    GMS->>ADM: Gửi request kèm context (device, app, ad unit)
    ADM->>ADM: Đấu giá real-time chọn ad phù hợp
    ADM-->>Net: Nếu mediation, hỏi các network khác
    Net-->>ADM: Trả giá + ad
    ADM-->>GMS: Trả về ad (hoặc lỗi)
    GMS-->>App: Callback onAdLoaded / onAdFailedToLoad

    App->>App: Hiển thị ad đúng thời điểm (fullscreen/embedded)
    App->>GMS: Ad cho user tương tác (click)
    GMS-->>ADM: Ghi nhận impression & click
    ADM-->>GMS: Tín dụng revenue cho publisher
</div>

<strong>Chi tiết từng bước:</strong>

<strong>Bước 1: Khởi tạo SDK</strong>

<pre data-lang="kotlin"><code>MobileAds.initialize(this) { initializationStatus ->
    // SDK đã sẵn sàng
}
</code></pre>

<li>Gọi <strong>một lần</strong> trong <code>Application.onCreate()</code>.</li>
<li>SDK tải cấu hình từ AdMob (ad units, mediation config, A/B testing).</li>
<li>Không cần chờ xong mới load ad — SDK tự xếp hàng (queue) các request.</li>

<strong>Bước 2: Tạo AdRequest</strong>

<pre data-lang="kotlin"><code>val adRequest = AdRequest.Builder()
    .addNetworkExtrasBundle(AdMobAdapter::class.java, bundle)  // tùy chọn
    .build()
</code></pre>

<li>AdRequest chứa thông tin về ngữ cảnh: thiết bị, vị trí, nội dung app.</li>
<li>AdMob dùng thông tin này để chọn ad phù hợp (targeting).</li>

<strong>Bước 3: Load ad</strong>

<pre data-lang="kotlin"><code>InterstitialAd.load(context, adUnitId, adRequest) { ad, error ->
    if (error == null) {
        // Ad đã tải xong, có thể show
    } else {
        // Lỗi: no fill, network error, invalid ad unit...
    }
}
</code></pre>

<li>Load <strong>asynchronous</strong> — không block UI thread.</li>
<li>Kết quả trả về qua callback.</li>
<li>Ad có thể không có sẵn (no fill) nếu không có advertiser phù hợp.</li>

<strong>Bước 4: Hiển thị ad</strong>

<pre data-lang="kotlin"><code>ad.show(activity)
</code></pre>

<li>Chỉ show khi Activity ở foreground (RESUMED state).</li>
<li>Fullscreen ad (interstitial, rewarded) chiếm toàn bộ màn hình.</li>
<li>Banner ad hiển thị trong layout.</li>

<strong>Bước 5: Theo dõi tương tác</strong>

<pre data-lang="kotlin"><code>ad.fullScreenContentCallback = object : FullScreenContentCallback() {
    override fun onAdClicked() { /* User click */ }
    override fun onAdDismissedFullScreenContent() { /* Ad đóng */ }
    override fun onAdFailedToShowFullScreenContent(error: AdError) { /* Show lỗi */ }
    override fun onAdImpression() { /* Ad hiển thị */ }
    override fun onAdShowedFullScreenContent() { /* Ad bắt đầu hiển thị */ }
}
</code></pre>

<h3>Vòng đời của một ad</h3>

<div class="mermaid">
stateDiagram-v2
    [*] --> NOT_READY
    NOT_READY --> LOADING: load(AdRequest)
    LOADING --> LOADED: onAdLoaded
    LOADING --> FAILED: onAdFailedToLoad
    LOADED --> FAILED: expired
    LOADED --> SHOWN: show()
    SHOWN --> [*]: onAdDismissedFullScreenContent
</div>

<strong>Điểm mấu chốt:</strong>

<li><strong>Ad tải asynchronous</strong> — SDK không bao giờ block UI thread.</li>
<li><strong>Một ad chỉ dùng được một lần</strong> — sau khi show, phải load ad mới.</li>
<li><strong>Ad có thể expire</strong> — nếu load xong mà không show trong thời gian dài, ad bị hủy.</li>
<li><strong>Callback không synchronous</strong> — <code>onAdLoaded</code> có thể gọi sau vài giây hoặc vài phút.</li>

<h2>Các loại quảng cáo</h2>

<h3>Bảng so sánh chi tiết</h3>

<table>
<thead>
<tr><th>Tiêu chí</th><th>Banner</th><th>Interstitial</th><th>Rewarded</th><th>Rewarded Interstitial</th><th>Native</th></tr>
</thead>
<tbody>
<tr><td><strong>Hình thức</strong></td><td>Thanh nhỏ (320x50, 320x100...)</td><td>Toàn màn hình</td><td>Toàn màn hình</td><td>Toàn màn hình</td><td>Tùy chỉnh layout</td></tr>
<tr><td><strong>Nơi hiển thị</strong></td><td>Gắn trong layout</td><td>Tự động bật lên</td><td>Tự chọn (nút xem)</td><td>Tự chọn</td><td>Nhúng trong list</td></tr>
<tr><td><strong>User tương tác</strong></td><td>Click</td><td>Click hoặc đóng</td><td>Xem hết để nhận thưởng</td><td>Xem + đóng</td><td>Click</td></tr>
<tr><td><strong>Doanh thu (eCPM)</strong></td><td>Thấp ($0.5-2)</td><td>Trung bình ($5-15)</td><td>Cao ($15-30)</td><td>Cao ($15-30)</td><td>Tùy thuộc</td></tr>
<tr><td><strong>UX impact</strong></td><td>Ít xâm lấn</td><td>Xâm lấn vừa</td><td>User tự chọn</td><td>User tự chọn</td><td>Hòa lẫn nội dung</td></tr>
<tr><td><strong>Use case</strong></td><td>App tiện ích, content</td><td>Giữa các màn hình</td><td>Game: coin, lives</td><td>Game level</td><td>Feed content</td></tr>
<tr><td><strong>Implementation</strong></td><td>View trong layout</td><td>Load trước, show sau</td><td>Load trước, show khi user bấm</td><td>Tương tự rewarded</td><td>Bind từng view</td></tr>
</tbody>
</table><h3>Chi tiết từng loại</h3>

<p>#### Banner Ads</p>

<strong>Bản chất:</strong> Banner là một View (thực chất là WebView) hiển thị HTML ad. Nó gắn vào layout của app, luôn hiển thị.

<strong>Kích thước chuẩn:</strong>

<table>
<thead>
<tr><th>Ad Size</th><th>Dimensions (WxH)</th><th>Use case</th></tr>
</thead>
<tbody>
<tr><td>BANNER</td><td>320x50</td><td>Điện thoại, dưới màn hình</td></tr>
<tr><td>LARGE_BANNER</td><td>320x100</td><td>Điện thoại, cao hơn</td></tr>
<tr><td>MEDIUM_RECTANGLE</td><td>300x250</td><td>Tablet, giữa nội dung</td></tr>
<tr><td>FULL_BANNER</td><td>468x60</td><td>Tablet</td></tr>
<tr><td>LEADERBOARD</td><td>728x90</td><td>Tablet, trên cùng</td></tr>
<tr><td>ADAPTIVE_BANNER</td><td>Tự động</td><td>Tự động theo chiều rộng màn hình</td></tr>
</tbody>
</table><strong>Khi nào dùng:</strong>
<li>App cần revenue ổn định, liên tục.</li>
<li>Không muốn làm phiền user quá nhiều.</li>
<li>App có màn hình dài, có chỗ trống dưới cùng.</li>

<strong>Khi nào KHÔNG dùng:</strong>
<li>App có UI chật chội, không có chỗ trống.</li>
<li>App yêu cầu user tập trung cao (game hành động, đọc sách).</li>
<li>App có nhiều màn hình nhỏ, banner sẽ chiếm quá nhiều không gian.</li>

<p>#### Interstitial Ads</p>

<strong>Bản chất:</strong> Interstitial là một Activity fullscreen nội bộ của SDK. Nó không phải View của app, mà là một màn hình riêng được SDK quản lý.

<strong>Đặc điểm:</strong>
<li>Chiếm toàn bộ màn hình.</li>
<li>User phải đóng (nút X) hoặc tương tác (click) để quay lại app.</li>
<li>Một instance chỉ show được một lần.</li>

<strong>Khi nào dùng:</strong>
<li>Ở <strong>natural break point</strong> của flow:</li>
<p>  - Sau khi user hoàn thành level (game).</p>
<p>  - Sau khi user save document (app productivity).</p>
<p>  - Sau khi user xem xong bài viết (app content).</p>
<li>Giữa các màn hình chính (không nên show quá thường xuyên).</li>

<strong>Khi nào KHÔNG dùng:</strong>
<li>Ngay khi mở app (user chưa kịp làm gì).</li>
<li>Khi user đang nhập liệu (đánh máy, điền form).</li>
<li>Khi user đang chơi game hồi căng thẳng.</li>
<li>Quá thường xuyên (mỗi 30 giây một lần) — gây khó chịu, bị gỡ app.</li>

<p>#### Rewarded Ads</p>

<strong>Bản chất:</strong> Rewarded là ad mà user <strong>chủ động chọn xem</strong> để đổi lấy thứ gì đó có giá trị trong app (xu, lives, unlock tính năng).

<strong>Đặc điểm:</strong>
<li>User phải xem hết (hoặc qua thời gian tối thiểu) mới nhận thưởng.</li>
<li>Doanh thu cao nhất vì user tương tác chủ động.</li>
<li>Không được ép buộc — user phải tự bấm nút xem.</li>

<strong>Khi nào dùng:</strong>
<li>Game: xem ad nhận coin, extra lives, unlock skin.</li>
<li>App productivity: xem ad để mở khóa tính năng premium tạm thời.</li>
<li>App content: xem ad để đọc bài viết premium.</li>

<strong>Khi nào KHÔNG dùng:</strong>
<li>Ép buộc user xem ad để dùng tính năng cơ bản (vi phạm policy).</li>
<li>Thưởng không đủ giá trị (user không muốn xem).</li>
<li>App không có cơ chế thưởng rõ ràng.</li>

<p>#### Rewarded Interstitial Ads</p>

<strong>Bản chất:</strong> Kết hợp Interstitial và Rewarded — ad fullscreen tự động hiển thị, nhưng user phải xem hết mới nhận thưởng.

<strong>Khác với Rewarded thông thường:</strong>
<li>Rewarded: user bấm nút để xem.</li>
<li>Rewarded Interstitial: ad tự động hiển thị ở điểm dừng, user phải xem để nhận thưởng.</li>

<strong>Khi nào dùng:</strong>
<li>Game: sau khi hoàn thành level, ad tự động hiện, user xem để nhận bonus.</li>
<li>Flow có nhiều bước, mỗi bước có thưởng.</li>

<p>#### Native Ads</p>

<strong>Bản chất:</strong> Native Ads cho phép customize UI ad để hòa lẫn với UI của app. Bạn tự bind dữ liệu (headline, image, call-to-action) vào layout của mình.

<strong>Đặc điểm:</strong>
<li>Khó phân biệt với nội dung thật.</li>
<li>UX tốt nhất vì ad không phá UI.</li>
<li>Implementation phức tạp nhất — phải tự bind từng view.</li>

<strong>Khi nào dùng:</strong>
<li>Feed content (news, social media).</li>
<li>List items (product list, video list).</li>
<li>Khi muốn ad hòa lẫn tự nhiên.</li>

<strong>Khi nào KHÔNG dùng:</strong>
<li>App đơn giản, không cần customize.</li>
<li>Không có thời gian implement (Native phức tạp hơn Banner nhiều).</li>

<h2>Tích hợp Google Mobile Ads SDK</h2>

<h3>Bước 1: Khai báo dependency</h3>

<pre data-lang="kotlin"><code>// app/build.gradle.kts
plugins {
    id("com.android.application")
    // Không cần plugin đặc biệt cho AdMob (khác với Firebase)
}

dependencies {
    implementation("com.google.android.gms:play-services-ads:23.4.0")
}
</code></pre>

<strong>Lưu ý:</strong>
<li>Version mới nhất kiểm tra tại: https://developers.google.com/admob/android/quick-start</li>
<li>Không cần <code>google-services.json</code> (khác với Firebase).</li>
<li>SDK tự động thêm permissions cần thiết (<code>INTERNET</code>, <code>ACCESS_NETWORK_STATE</code>).</li>

<h3>Bước 2: Khai báo App ID trong Manifest</h3>

<pre data-lang="xml"><code><manifest>
    <application>
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-3940256099942544~3347511713"/>
    </application>
</manifest>
</code></pre>

<strong>Quan trọng:</strong>
<li>Thay <code>ca-app-pub-3940256099942544~3347511713</code> bằng App ID thật của bạn (lấy từ AdMob Console).</li>
<li>Nếu quên khai báo → app crash ngay khi khởi tạo SDK với lỗi: <code>"The Google Mobile Ads SDK was initialized incorrectly"</code>.</li>
<li>Dùng test App ID khi develop: <code>ca-app-pub-3940256099942544~3347511713</code>.</li>

<h3>Bước 3: Khởi tạo SDK một lần</h3>

<pre data-lang="kotlin"><code>class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        // Khởi tạo SDK
        MobileAds.initialize(this) { initializationStatus ->
            // SDK đã sẵn sàng
            // initializationStatus.adapterStatusMap chứa trạng thái của từng ad network
            initializationStatus.adapterStatusMap.forEach { (adapterClass, status) ->
                Log.d("AdMob", "$adapterClass: \${status.state}, \${status.description}")
            }
        }
        
        // Không cần chờ callback xong mới load ad
        // SDK tự xếp hàng các request
    }
}
</code></pre>

<strong>Chi tiết:</strong>
<li><code>MobileAds.initialize()</code> gọi <strong>một lần</strong> trong <code>Application.onCreate()</code>.</li>
<li>Callback <code>initializationStatus</code> trả về trạng thái của từng ad network (AdMob, mediation networks...).</li>
<li>Không cần chờ callback xong mới load ad — SDK tự queue requests.</li>
<li>Khởi tạo càng sớm càng tốt để giảm latency khi load ad đầu tiên.</li>

<h3>Bước 4: Test ads — bắt buộc dùng</h3>

<strong>Tại sao phải dùng test ads?</strong>

<li>AdMob theo dõi mọi ad request.</li>
<li>Nếu bạn dùng ad unit ID thật trong lúc develop, AdMob sẽ ghi nhận impression/click từ developer.</li>
<li>Đây bị coi là <strong>invalid traffic</strong> → tài khoản bị đình chỉ vĩnh viễn.</li>
<li>Không có cách nào khôi phục tài khoản bị banned vì invalid traffic.</li>

<strong>Test Ad Unit IDs (chính thức từ Google):</strong>

<table>
<thead>
<tr><th>Loại</th><th>Test Ad Unit ID</th></tr>
</thead>
<tbody>
<tr><td>Banner</td><td><code>ca-app-pub-3940256099942544/6300978111</code></td></tr>
<tr><td>Interstitial</td><td><code>ca-app-pub-3940256099942544/1033173712</code></td></tr>
<tr><td>Rewarded</td><td><code>ca-app-pub-3940256099942544/5224354917</code></td></tr>
<tr><td>Rewarded Interstitial</td><td><code>ca-app-pub-3940256099942544/5354046379</code></td></tr>
<tr><td>Native</td><td><code>ca-app-pub-3940256099942544/2247696110</code></td></tr>
<tr><td>App Open</td><td><code>ca-app-pub-3940256099942544/9257395921</code></td></tr>
</tbody>
</table><strong>Test App ID:</strong> <code>ca-app-pub-3940256099942544~3347511713</code>

<strong>Cách dùng:</strong>

<pre data-lang="kotlin"><code>// Development - dùng test ad unit ID
val AD_UNIT_ID = if (BuildConfig.DEBUG) {
    "ca-app-pub-3940256099942544/6300978111"  // Test
} else {
    "ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY"  // Production
}
</code></pre>

<strong>Hoặc dùng test device:</strong>

<pre data-lang="kotlin"><code>val adRequest = AdRequest.Builder()
    .addTestDevice("YOUR_TEST_DEVICE_ID")  // Lấy từ logcat khi chạy app
    .build()
</code></pre>

<li>Test device ID hiển thị trong logcat khi bạn chạy app với ad unit ID thật.</li>
<li>AdMob sẽ trả về test ads cho device này, không tính là invalid traffic.</li>

<h2>Banner Ads</h2>

<h3>XML (View System)</h3>

<strong>Layout:</strong>

<pre data-lang="xml"><code><com.google.android.gms.ads.AdView
    android:id="@+id/adView"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="bottom|center_horizontal"
    app:adSize="BANNER"
    app:adUnitId="ca-app-pub-3940256099942544/6300978111"/>
</code></pre>

<strong>Activity:</strong>

<pre data-lang="kotlin"><code>class MainActivity : AppCompatActivity() {

    private lateinit var adView: AdView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        adView = findViewById(R.id.adView)
        adView.loadAd(AdRequest.Builder().build())
    }

    // Quan trọng: phải synchronous lifecycle với Activity
    override fun onPause() {
        adView.pause()  // Dừng load ad, dừng animation/video
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        adView.resume()  // Tiếp tục load ad
    }

    override fun onDestroy() {
        adView.destroy()  // Giải phóng resource, tránh memory leak
        super.onDestroy()
    }
}
</code></pre>

<strong>Chi tiết lifecycle:</strong>

<li><code>pause()</code>: Dừng mọi hoạt động của banner (load ad, animation, video). Gọi khi Activity không còn visible (onPause).</li>
<li><code>resume()</code>: Tiếp tục hoạt động. Gọi khi Activity trở lại foreground (onResume).</li>
<li><code>destroy()</code>: Giải phóng resource (WebView, memory). Gọi khi Activity bị destroy. <strong>Bắt buộc</strong> để tránh memory leak.</li>

<strong>Tại sao phải gọi pause/resume/destroy?</strong>

<li>Banner thực chất là <strong>WebView</strong> hiển thị HTML ad.</li>
<li>Nếu không pause khi app ở background:</li>
<p>  - WebView vẫn chạy → tốn CPU, battery.</p>
<p>  - Video ad vẫn phát → user nghe tiếng quảng cáo khi app bị ẩn.</p>
<p>  - Vi phạm chính sách Google Play (ad không được chạy ngầm).</p>
<li>Nếu không destroy khi Activity bị hủy:</li>
<p>  - WebView vẫn giữ reference đến Context → memory leak.</p>
<p>  - Ad vẫn load → tốn network, battery.</p>

<h3>Jetpack Compose</h3>

<pre data-lang="kotlin"><code>@Composable
fun AdBannerView(
    modifier: Modifier = Modifier,
    adUnitId: String,
    adSize: AdSize = AdSize.BANNER
) {
    AndroidView(
        modifier = modifier,
        factory = { context ->
            AdView(context).apply {
                this.adSize = adSize
                this.adUnitId = adUnitId
                loadAd(AdRequest.Builder().build())
            }
        },
        update = { adView ->
            // Called khi recomposition với tham số mới
            // Thường không cần reload ad trừ khi adUnitId thay đổi
            if (adView.adUnitId != adUnitId) {
                adView.adUnitId = adUnitId
                adView.loadAd(AdRequest.Builder().build())
            }
        },
        onRelease = { adView ->
            // Called khi Composable rời khỏi composition
            adView.destroy()  // Tương đương onDestroy trong View System
        }
    )
}

// Sử dụng
@Composable
fun MainScreen() {
    Box(modifier = Modifier.fillMaxSize()) {
        // Nội dung màn hình
        Column(modifier = Modifier.fillMaxSize()) {
            // ... content ...
        }
        
        // Banner ở dưới cùng
        AdBannerView(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .padding(8.dp),
            adUnitId = "ca-app-pub-3940256099942544/6300978111"
        )
    }
}
</code></pre>

<strong>Chi tiết Compose:</strong>

<li><code>AndroidView</code>: Bridge giữa Compose và View System.</li>
<li><code>factory</code>: Tạo AdView lần đầu. Chỉ gọi một lần.</li>
<li><code>update</code>: Gọi khi recomposition với tham số mới. Kiểm tra <code>adUnitId</code> thay đổi mới reload.</li>
<li><code>onRelease</code>: Gọi khi Composable rời khỏi composition. <strong>Phải gọi <code>destroy()</code></strong> để tránh leak.</li>

<strong>Lưu ý:</strong>

<li>Không nên khởi tạo AdView trong <code>remember {}</code> với lambda không ổn định — có thể tạo lại View gây double load.</li>
<li>Nếu cần pause/resume theo lifecycle, dùng <code>DisposableEffect</code> với <code>LocalLifecycleOwner</code>:</li>

<pre data-lang="kotlin"><code>@Composable
fun AdBannerViewWithLifecycle(
    modifier: Modifier = Modifier,
    adUnitId: String
) {
    val lifecycleOwner = LocalLifecycleOwner.current
    
    AndroidView(
        modifier = modifier,
        factory = { context ->
            AdView(context).apply {
                adSize = AdSize.BANNER
                this.adUnitId = adUnitId
                loadAd(AdRequest.Builder().build())
            }
        },
        onRelease = { it.destroy() }
    )
    
    // Theo dõi lifecycle để pause/resume
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            // Access AdView qua remember hoặc state
            // Khi không thể access trực tiếp, AndroidView tự động handle
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    }
}
</code></pre>

<h2>Interstitial Ads</h2>

<h3>Bản chất</h3>

<p>Interstitial <strong>không phải View gắn layout</strong> — nó là fullscreen activity nội bộ của SDK, quản lý bởi <code>InterstitialAd</code>.</p>

<strong>Đặc điểm:</strong>
<li>Chiếm toàn bộ màn hình.</li>
<li>User phải đóng (nút X) hoặc tương tác (click) để quay lại app.</li>
<li>Một instance chỉ show được một lần.</li>
<li>Load asynchronous, phải load trước khi cần show.</li>

<h3>Load (tải trước khi cần)</h3>

<pre data-lang="kotlin"><code>class MainActivity : AppCompatActivity() {

    private var interstitialAd: InterstitialAd? = null
    private val TAG = "Interstitial"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Load ad ngay khi Activity tạo
        loadInterstitial()
    }

    private fun loadInterstitial() {
        InterstitialAd.load(
            this,
            "ca-app-pub-3940256099942544/1033173712",
            AdRequest.Builder().build(),
            object : InterstitialAdLoadCallback() {
                override fun onAdLoaded(ad: InterstitialAd) {
                    interstitialAd = ad
                    Log.d(TAG, "Ad loaded successfully")
                    
                    // Set callback để theo dõi sự kiện
                    interstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                        override fun onAdClicked() {
                            Log.d(TAG, "Ad clicked")
                        }

                        override fun onAdDismissedFullScreenContent() {
                            Log.d(TAG, "Ad dismissed")
                            // Ad đã đóng → xóa reference và load ad mới
                            interstitialAd = null
                            loadInterstitial()  // Load ad mới cho lần sau
                        }

                        override fun onAdFailedToShowFullScreenContent(error: AdError) {
                            Log.e(TAG, "Ad failed to show: \${error.message}")
                            interstitialAd = null
                        }

                        override fun onAdImpression() {
                            Log.d(TAG, "Ad impression recorded")
                        }

                        override fun onAdShowedFullScreenContent() {
                            Log.d(TAG, "Ad showed fullscreen")
                        }
                    }
                }

                override fun onAdFailedToLoad(error: LoadAdError) {
                    Log.e(TAG, "Ad failed to load: \${error.message}")
                    interstitialAd = null
                    // Không load lại ngay — đợi một thời gian rồi thử lại
                }
            }
        )
    }
}
</code></pre>

<strong>Chi tiết:</strong>

<li><code>InterstitialAd.load()</code>: Bắt đầu load ad asynchronous.</li>
<li><code>InterstitialAdLoadCallback</code>: Callback khi load xong hoặc lỗi.</li>
<li><code>onAdLoaded</code>: Ad đã sẵn sàng, gán vào variable.</li>
<li><code>onAdFailedToLoad</code>: Lỗi (no fill, network error, invalid ad unit).</li>
<li><code>fullScreenContentCallback</code>: Theo dõi sự kiện khi show ad.</li>
<li><strong>Quan trọng:</strong> Trong <code>onAdDismissedFullScreenContent</code>, phải load ad mới vì ad cũ đã dùng xong.</li>

<h3>Show (đúng thời điểm)</h3>

<pre data-lang="kotlin"><code>private fun showInterstitial() {
    // Kiểm tra Activity có ở foreground không
    if (lifecycle.currentState.isAtLeast(Lifecycle.State.RESUMED)) {
        interstitialAd?.let { ad ->
            ad.show(this)  // Show ad
        } ?: run {
            // Chưa có ad sẵn sàng → không show
            Log.d(TAG, "Ad not ready yet")
        }
    } else {
        // Activity không ở foreground → không show
        Log.w(TAG, "Cannot show ad: Activity not in foreground")
    }
}
</code></pre>

<strong>Khi nào gọi <code>showInterstitial()</code>?</strong>

<li>Sau khi user hoàn thành level (game).</li>
<li>Sau khi user save document (app productivity).</li>
<li>Sau khi user xem xong bài viết (app content).</li>
<li><strong>Không</strong> gọi ngay khi mở app.</li>
<li><strong>Không</strong> gọi khi user đang nhập liệu.</li>

<strong>Ví dụ thực tế:</strong>

<pre data-lang="kotlin"><code>class GameActivity : AppCompatActivity() {

    private var interstitialAd: InterstitialAd? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_game)
        
        loadInterstitial()
        
        // Nút "Next Level"
        findViewById<Button>(R.id.btnNextLevel).setOnClickListener {
            goToNextLevel()
        }
    }

    private fun goToNextLevel() {
        // Hiển thị interstitial trước khi chuyển level
        if (interstitialAd != null) {
            showInterstitial()
        } else {
            // Không có ad → chuyển level ngay
            startNextLevel()
        }
    }

    private fun startNextLevel() {
        // Logic chuyển level
        Log.d("Game", "Starting next level")
    }
}
</code></pre>

<h3>Chú thích lifecycle (Interstitial)</h3>

<strong>Load trước, show sau:</strong>
<li>Tải ad khi bắt đầu màn hình/level.</li>
<li>Hiển thị khi user hoàn thành hành động.</li>
<li><strong>Không</strong> vừa load vừa show — ad chưa sẵn sàng sẽ gây lỗi.</li>

<strong>Một ad chỉ dùng một lần:</strong>
<li>Sau khi show, instance ad "chết".</li>
<li>Phải load ad mới trong <code>onAdDismissedFullScreenContent</code>.</li>

<strong>Chỉ show khi Activity ở RESUMED:</strong>
<li>Kiểm tra <code>lifecycle.currentState.isAtLeast(Lifecycle.State.RESUMED)</code>.</li>
<li><strong>Không</strong> show khi Activity đang <code>onPause</code>/<code>onStop</code> (app về background).</li>
<li>SDK có thể crash hoặc vi phạm policy nếu show sai thời điểm.</li>

<strong>Không show quá thường xuyên:</strong>
<li>Mỗi 3-5 phút một lần là hợp lý.</li>
<li>Show mỗi 30 giây → user chán, gỡ app.</li>
<li>Google có thể gỡ app nếu phát hiện ad quá nhiều.</li>

<strong>Xử lý lỗi:</strong>

<table>
<thead>
<tr><th>Error Code</th><th>Ý nghĩa</th><th>Xử lý</th></tr>
</thead>
<tbody>
<tr><td>0</td><td>ERROR_CODE_INTERNAL_ERROR</td><td>Lỗi nội bộ SDK. Thử lại sau.</td></tr>
<tr><td>1</td><td>ERROR_CODE_INVALID_REQUEST</td><td>Ad unit ID sai hoặc request invalid. Kiểm tra config.</td></tr>
<tr><td>2</td><td>ERROR_CODE_NETWORK_ERROR</td><td>Lỗi mạng. Kiểm tra kết nối.</td></tr>
<tr><td>3</td><td>ERROR_CODE_NO_FILL</td><td>Không có ad phù hợp. Bình thường, thử lại sau vài phút.</td></tr>
</tbody>
</table><pre data-lang="kotlin"><code>override fun onAdFailedToLoad(error: LoadAdError) {
    when (error.code) {
        AdRequest.ERROR_CODE_NO_FILL -> {
            // Không có ad → không làm gì, thử lại sau
            Log.d(TAG, "No fill, will retry later")
        }
        AdRequest.ERROR_CODE_NETWORK_ERROR -> {
            // Lỗi mạng → kiểm tra kết nối
            Log.e(TAG, "Network error")
        }
        else -> {
            Log.e(TAG, "Ad failed: \${error.code}")
        }
    }
}
</code></pre>

<h2>Rewarded Ads</h2>

<h3>Bản chất</h3>

<p>Rewarded là ad mà user <strong>chủ động chọn xem</strong> để đổi lấy thứ gì đó có giá trị trong app (xu, lives, unlock tính năng).</p>

<strong>Đặc điểm:</strong>
<li>User phải xem hết (hoặc qua thời gian tối thiểu) mới nhận thưởng.</li>
<li>Doanh thu cao nhất vì user tương tác chủ động.</li>
<li><strong>Không được ép buộc</strong> — user phải tự bấm nút xem.</li>
<li>Một instance chỉ show được một lần.</li>

<h3>Triển khai với MVVM</h3>

<strong>ViewModel:</strong>

<pre data-lang="kotlin"><code>class GameViewModel : ViewModel() {

    private var rewardedAd: RewardedAd? = null

    // State
    private val _coins = MutableStateFlow(100)
    val coins: StateFlow<Int> = _coins.asStateFlow()

    private val _canShowRewardedAd = MutableStateFlow(false)
    val canShowRewardedAd: StateFlow<Boolean> = _canShowRewardedAd.asStateFlow()

    fun loadRewarded(context: Context) {
        RewardedAd.load(
            context,
            "ca-app-pub-3940256099942544/5224354917",
            AdRequest.Builder().build()
        ) { ad, error ->
            if (error == null) {
                rewardedAd = ad
                _canShowRewardedAd.value = true
                
                rewardedAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                    override fun onAdDismissedFullScreenContent() {
                        rewardedAd = null
                        _canShowRewardedAd.value = false
                        loadRewarded(context)  // Load ad mới
                    }

                    override fun onAdFailedToShowFullScreenContent(error: AdError) {
                        rewardedAd = null
                        _canShowRewardedAd.value = false
                    }
                }
            } else {
                _canShowRewardedAd.value = false
            }
        }
    }

    fun showRewarded(activity: Activity, onReward: (Int) -> Unit) {
        rewardedAd?.let { ad ->
            ad.show(activity) { rewardItem ->
                // User xem xong → trao thưởng
                val rewardAmount = rewardItem.amount
                _coins.value += rewardAmount
                onReward(rewardAmount)
            }
        }
    }
}
</code></pre>

<strong>Activity:</strong>

<pre data-lang="kotlin"><code>class GameActivity : AppCompatActivity() {

    private val viewModel: GameViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_game)

        // Load ad
        viewModel.loadRewarded(this)

        // Nút "Watch Ad for Coins"
        findViewById<Button>(R.id.btnWatchAd).setOnClickListener {
            if (viewModel.canShowRewardedAd.value) {
                viewModel.showRewarded(this) { coins ->
                    Toast.makeText(this, "Earned $coins coins!", Toast.LENGTH_SHORT).show()
                }
            } else {
                Toast.makeText(this, "Ad not ready yet", Toast.LENGTH_SHORT).show()
            }
        }

        // Observe coins
        lifecycleScope.launch {
            viewModel.coins.collect { coins ->
                findViewById<TextView>(R.id.tvCoins).text = "Coins: $coins"
            }
        }

        // Observe ad availability
        lifecycleScope.launch {
            viewModel.canShowRewardedAd.collect { canShow ->
                findViewById<Button>(R.id.btnWatchAd).isEnabled = canShow
            }
        }
    }
}
</code></pre>

<h3>Chú thích lifecycle (Rewarded)</h3>

<strong>Reward chỉ trao trong callback <code>onUserEarnedReward</code>:</strong>
<li>Không được tưởng thưởng trước khi ad xem xong.</li>
<li>Callback chỉ gọi khi user xem đủ thời gian yêu cầu.</li>
<li>Nếu user đóng ad giữa chừng → callback không gọi → không có thưởng.</li>

<strong>Không tái sử dụng RewardedAd:</strong>
<li>Mỗi ad một lần show.</li>
<li>Sau khi show, load ad mới trong <code>onAdDismissedFullScreenContent</code>.</li>

<strong>Cơ chế bảo vệ revenue:</strong>
<li>Nếu user đóng ad giữa chừng, callback reward không được gọi.</li>
<li>Đây là cơ chế bảo vệ advertiser — họ chỉ trả tiền khi user xem đủ.</li>
<li>Đừng cố hack (ví dụ: tự gọi reward khi user đóng ad) — vi phạm policy, bị banned.</li>

<strong>UX tốt:</strong>
<li>Hiển thị nút "Watch Ad" rõ ràng.</li>
<li>Cho biết user sẽ nhận được gì (ví dụ: "Watch ad to get 50 coins").</li>
<li>Không ép buộc — user phải tự chọn xem.</li>

<h2>Native Ads</h2>

<h3>Bản chất</h3>

<p>Native Ads cho phép customize UI thông qua template, giúp ad hòa lẫn với UI của app.</p>

<strong>Đặc điểm:</strong>
<li>Khó phân biệt với nội dung thật.</li>
<li>UX tốt nhất vì ad không phá UI.</li>
<li>Implementation phức tạp nhất — phải tự bind từng view.</li>

<h3>Layout XML</h3>

<pre data-lang="xml"><code><!-- layout/native_ad_layout.xml -->
<com.google.android.gms.ads.nativead.NativeAdView
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/native_ad_view"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="16dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <!-- Media (image/video) -->
        <com.google.android.gms.ads.nativead.MediaView
            android:id="@+id/ad_media"
            android:layout_width="match_parent"
            android:layout_height="200dp"/>

        <!-- Headline -->
        <TextView
            android:id="@+id/ad_headline"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="16sp"
            android:textStyle="bold"
            android:layout_marginTop="8dp"/>

        <!-- Body -->
        <TextView
            android:id="@+id/ad_body"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="14sp"
            android:layout_marginTop="4dp"/>

        <!-- Call to action -->
        <Button
            android:id="@+id/ad_call_to_action"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"/>

    </LinearLayout>
</com.google.android.gms.ads.nativead.NativeAdView>
</code></pre>

<h3>Load và bind</h3>

<pre data-lang="kotlin"><code>class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        loadNativeAd()
    }

    private fun loadNativeAd() {
        val adLoader = AdLoader.Builder(this, "ca-app-pub-3940256099942544/2247696110")
            .forNativeAd { nativeAd ->
                // Ad đã load → bind vào layout
                bindNativeAd(nativeAd)
            }
            .withAdListener(object : AdListener() {
                override fun onAdFailedToLoad(error: LoadAdError) {
                    Log.e("NativeAd", "Failed to load: \${error.message}")
                }
            })
            .build()

        adLoader.loadAd(AdRequest.Builder().build())
    }

    private fun bindNativeAd(nativeAd: NativeAd) {
        val adView = layoutInflater.inflate(R.layout.native_ad_layout, null) as NativeAdView

        // Set native ad vào view
        adView.setNativeAd(nativeAd)

        // Bind headline
        adView.headlineView = adView.findViewById(R.id.ad_headline)
        (adView.headlineView as TextView).text = nativeAd.headline

        // Bind body (optional)
        if (nativeAd.body != null) {
            adView.bodyView = adView.findViewById(R.id.ad_body)
            (adView.bodyView as TextView).text = nativeAd.body
            adView.bodyView?.visibility = View.VISIBLE
        } else {
            adView.bodyView?.visibility = View.GONE
        }

        // Bind media
        adView.mediaView = adView.findViewById(R.id.ad_media)

        // Bind call to action
        adView.callToActionView = adView.findViewById(R.id.ad_call_to_action)
        (adView.callToActionView as Button).text = nativeAd.callToAction
        adView.callToActionView?.visibility = View.VISIBLE

        // Add ad view vào layout
        findViewById<LinearLayout>(R.id.adContainer).addView(adView)
    }
}
</code></pre>

<h3>Chú thích</h3>

<strong>Phải bind từng view:</strong>
<li><code>headlineView</code>, <code>bodyView</code>, <code>mediaView</code>, <code>callToActionView</code>...</li>
<li>Gọi <code>adView.setNativeAd(nativeAd)</code> để SDK gắn đúng dữ liệu.</li>

<strong>Destroy khi không dùng:</strong>
<li>Native ad giữ reference đến Context.</li>
<li>Khi Activity bị destroy, phải destroy native ad để tránh leak.</li>

<pre data-lang="kotlin"><code>override fun onDestroy() {
    nativeAd?.destroy()
    super.onDestroy()
}
</code></pre>

<h2>Quảng cáo trong MVVM / Clean Architecture</h2>

<h3>Nguyên tắc</h3>

<p>Quảng cáo có bản chất <strong>gắn với UI và lifecycle Activity</strong> — nó cần <code>Activity</code>/<code>Context</code> để show. Vì vậy:</p>

<strong>Tầng Data:</strong>
<li>AdMob SDK nằm ở Data Layer (hoặc <code>AdManager</code>/<code>AdRepository</code> riêng).</li>
<li>Bọc toàn bộ API của Google.</li>
<li>Trả kết quả thuần (suspend/flow) cho tầng trên.</li>

<strong>Tầng Domain:</strong>
<li>Hoàn toàn không biết ad tồn tại.</li>
<li>UseCase chỉ xử lý nghiệp vụ.</li>

<strong>Tầng Presentation:</strong>
<li>UI quyết định thời điểm show (vì chỉ UI mới biết Activity foreground).</li>
<li>ViewModel điều phối trạng thái.</li>

<h3>Mẫu triển khai</h3>

<strong>Interface:</strong>

<pre data-lang="kotlin"><code>interface AdManager {
    suspend fun loadInterstitial(): Boolean
    fun showInterstitial(activity: Activity)
    suspend fun loadRewarded(): Boolean
    fun showRewarded(activity: Activity, onReward: (Int) -> Unit)
}
</code></pre>

<strong>Implementation:</strong>

<pre data-lang="kotlin"><code>class AdMobAdManager @Inject constructor(
    @ApplicationContext private val context: Context
) : AdManager {

    private var interstitialAd: InterstitialAd? = null
    private var rewardedAd: RewardedAd? = null

    override suspend fun loadInterstitial(): Boolean =
        suspendCoroutine { cont ->
            InterstitialAd.load(context, INTERSTITIAL_ID, AdRequest.Builder().build()) { ad, err ->
                if (err == null) {
                    interstitialAd = ad
                    cont.resume(true)
                } else {
                    cont.resume(false)
                }
            }
        }

    override fun showInterstitial(activity: Activity) {
        if (activity.lifecycle.currentState.isAtLeast(Lifecycle.State.RESUMED)) {
            interstitialAd?.show(activity)
            interstitialAd = null
        }
    }

    override suspend fun loadRewarded(): Boolean =
        suspendCoroutine { cont ->
            RewardedAd.load(context, REWARDED_ID, AdRequest.Builder().build()) { ad, err ->
                if (err == null) {
                    rewardedAd = ad
                    cont.resume(true)
                } else {
                    cont.resume(false)
                }
            }
        }

    override fun showRewarded(activity: Activity, onReward: (Int) -> Unit) {
        if (activity.lifecycle.currentState.isAtLeast(Lifecycle.State.RESUMED)) {
            rewardedAd?.show(activity) { rewardItem ->
                onReward(rewardItem.amount)
            }
            rewardedAd = null
        }
    }
}
</code></pre>

<strong>ViewModel:</strong>

<pre data-lang="kotlin"><code>class GameViewModel(
    private val adManager: AdManager
) : ViewModel() {

    private val _showRewardedEvent = MutableSharedFlow<Boolean>(extraBufferCapacity = 1)
    val showRewardedEvent: SharedFlow<Boolean> = _showRewardedEvent.asSharedFlow()

    private val _rewardGranted = MutableStateFlow(0)
    val rewardGranted: StateFlow<Int> = _rewardGranted.asStateFlow()

    fun onWatchAdForCoinsClicked() {
        _showRewardedEvent.tryEmit(true)
    }

    fun onRewardEarned(coins: Int) {
        _rewardGranted.value += coins
    }
}
</code></pre>

<strong>Activity:</strong>

<pre data-lang="kotlin"><code>class GameActivity : AppCompatActivity() {

    @Inject lateinit var adManager: AdManager
    private val viewModel: GameViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_game)

        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.RESUMED) {
                viewModel.showRewardedEvent.collect { shouldShow ->
                    if (shouldShow) {
                        adManager.showRewarded(this@GameActivity) { coins ->
                            viewModel.onRewardEarned(coins)
                        }
                    }
                }
            }
        }
    }
}
</code></pre>

<h3>Tại sao Ad ở Data Layer?</h3>

<strong>Lý do:</strong>

<p>1. <strong>AdMob SDK là external dependency</strong> — giống như Firebase, Room, Retrofit.</p>
<p>2. <strong>Dễ thay thế</strong> — nếu đổi sang AppLovin, chỉ cần viết lại <code>AdMobAdManager</code>, không đụng UI/Domain.</p>
<p>3. <strong>Dễ test</strong> — mock <code>AdManager</code> interface, test ViewModel mà không cần SDK thật.</p>
<p>4. <strong>Tách biệt trách nhiệm</strong> — UI chỉ lo hiển thị, Data lo tích hợp SDK.</p>

<strong>Không đặt Ad ở Presentation Layer:</strong>
<li>ViewModel không nên biết về AdMob SDK.</li>
<li>Nếu đặt SDK trong ViewModel → khó test, khó thay đổi network.</li>

<strong>Không đặt Ad ở Domain Layer:</strong>
<li>Domain không nên biết về external dependencies.</li>
<li>UseCase chỉ xử lý nghiệp vụ thuần.</li>

<h2>Chú thích hiển thị quảng cáo theo lifecycle app (Lifecycle Guidelines)</h2>

<p>Đây là phần các nhà phát triển hay bỏ qua — dẫn đến crash, leak và bị Google phạt. Tổng hợp toàn bộ quy tắc:</p>

<h3>1. Banner (View gắn layout)</h3>

<strong>Quy tắc:</strong>
<li>Gọi <code>adView.pause()</code> trong <code>onPause</code>.</li>
<li>Gọi <code>adView.resume()</code> trong <code>onResume</code>.</li>
<li>Gọi <code>adView.destroy()</code> trong <code>onDestroy</code>.</li>

<strong>Tại sao:</strong>
<li>Banner là WebView — nếu không pause khi app ở background:</li>
<p>  - WebView vẫn chạy → tốn CPU, battery.</p>
<p>  - Video ad vẫn phát → user nghe tiếng quảng cáo khi app bị ẩn.</p>
<p>  - Vi phạm chính sách Google Play.</p>
<li>Nếu không destroy khi Activity bị hủy:</li>
<p>  - WebView vẫn giữ reference đến Context → memory leak.</p>
<p>  - Ad vẫn load → tốn network, battery.</p>

<strong>Trong Compose:</strong>
<li><code>onRelease</code> callback của <code>AndroidView</code> chính là nơi gọi <code>destroy()</code>.</li>
<li>AndroidView tự động handle pause/resume theo lifecycle.</li>

<strong>Nếu app có nhiều Activity cùng hiển thị banner:</strong>
<li>Chỉ một banner duy nhất nên hoạt động tại một thời điểm.</li>
<li>Khi chuyển Activity, pause banner cũ, resume banner mới.</li>

<h3>2. Interstitial & Rewarded (Fullscreen)</h3>

<strong>Quy tắc:</strong>
<li><strong>Chỉ show khi Activity ở <code>RESUMED</code>.</strong></li>
<li>Kiểm tra bằng <code>lifecycle.currentState.isAtLeast(Lifecycle.State.RESUMED)</code>.</li>
<li>Hoặc dùng <code>repeatOnLifecycle(Lifecycle.State.RESUMED)</code>.</li>

<strong>Tại sao:</strong>
<li>Nếu show khi Activity đang <code>onPause</code>/<code>onStop</code>:</li>
<p>  - SDK có thể crash.</p>
<p>  - Vi phạm chính sách (ad không được hiển thị khi app không ở foreground).</p>
<p>  - User không thấy ad → không có revenue.</p>

<strong>Không show trong <code>onCreate</code>:</strong>
<li>Màn hình chưa sẵn sàng.</li>
<li>Activity chưa visible.</li>
<li>Có thể gây crash hoặc hiển thị sai.</li>

<strong>Không show khi Activity đang bị overlay:</strong>
<li>Dialog đang mở.</li>
<li>Notification drawer đang kéo.</li>
<li>SDK xử lý không chính xác trong các trường hợp này.</li>

<strong>Sau khi đóng fullscreen ad:</strong>
<li>Hệ thống gọi lại <code>onPause</code>/<code>onResume</code> của Activity.</li>
<li>Đừng show ad ngay trong lúc này nếu không cần thiết.</li>
<li>Đợi user thực hiện hành động khác rồi mới show.</li>

<h3>3. Tránh hiển thị trùng lặp</h3>

<strong>Quy tắc:</strong>
<li>Chỉ hiển thị <strong>một fullscreen ad tại một thời điểm</strong>.</li>
<li>Không bao giờ mở interstitial chồng lên rewarded đang hiển thị.</li>

<strong>Tại sao:</strong>
<li>Gây confuse cho user.</li>
<li>SDK có thể crash.</li>
<li>Vi phạm chính sách.</li>

<strong>Cách implement:</strong>

<pre data-lang="kotlin"><code>private var isAdShowing = false

private fun showInterstitial() {
    if (isAdShowing) {
        // Đang có ad hiển thị → không show ad mới
        return
    }
    
    interstitialAd?.let { ad ->
        isAdShowing = true
        ad.show(this)
    }
}

// Trong fullScreenContentCallback
override fun onAdDismissedFullScreenContent() {
    isAdShowing = false
    interstitialAd = null
    loadInterstitial()
}
</code></pre>

<h3>4. Process life</h3>

<strong>Khi app vào background:</strong>
<li>Fullscreen ad đang hiển thị nên được coi như đã đóng.</li>
<li>Đừng giữ reference đến ad cũ.</li>
<li>Không chủ động load ad liên tục ở background.</li>

<strong>Tại sao:</strong>
<li>Load ad ở background → bị AdMob xem là traffic bất thường.</li>
<li>Tốn network, battery.</li>
<li>Ad có thể expire trước khi app trở lại foreground.</li>

<strong>Implement:</strong>

<pre data-lang="kotlin"><code>class MyApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        
        ProcessLifecycleOwner.get().lifecycle.addObserver(object : LifecycleEventObserver {
            override fun onStateChanged(source: LifecycleOwner, event: Lifecycle.Event) {
                when (event) {
                    Lifecycle.Event.ON_STOP -> {
                        // App vào background → dừng load ad
                        AdManager.pauseAdLoading()
                    }
                    Lifecycle.Event.ON_START -> {
                        // App trở lại foreground → tiếp tục load ad
                        AdManager.resumeAdLoading()
                    }
                }
            }
        })
    }
}
</code></pre>

<h3>5. App Open Ads (tùy chọn nâng cao)</h3>

<strong>Bản chất:</strong>
<li>App Open Ad hiển thị mỗi khi app mở lại từ background.</li>
<li>Giống như splash screen nhưng có quảng cáo.</li>

<strong>Implement:</strong>

<pre data-lang="kotlin"><code>class MyApplication : Application() {

    private var appOpenAd: AppOpenAd? = null
    private var isShowingAd = false

    override fun onCreate() {
        super.onCreate()
        
        ProcessLifecycleOwner.get().lifecycle.addObserver(object : LifecycleEventObserver {
            override fun onStateChanged(source: LifecycleOwner, event: Lifecycle.Event) {
                if (event == Lifecycle.Event.ON_START) {
                    // App vừa về foreground → show app open ad (nếu có)
                    if (appOpenAd != null && !isShowingAd) {
                        showAppOpenAd()
                    } else {
                        loadAppOpenAd()
                    }
                }
            }
        })
    }

    private fun loadAppOpenAd() {
        AppOpenAd.load(this, APP_OPEN_AD_ID, AdRequest.Builder().build()) { ad, error ->
            if (error == null) {
                appOpenAd = ad
            }
        }
    }

    private fun showAppOpenAd() {
        if (appOpenAd != null) {
            isShowingAd = true
            appOpenAd?.show(this)
            appOpenAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                override fun onAdDismissedFullScreenContent() {
                    isShowingAd = false
                    appOpenAd = null
                    loadAppOpenAd()
                }
            }
        }
    }
}
</code></pre>

<strong>Cảnh báo:</strong>
<li>App Open Ads có nhiều quy định riêng.</li>
<li>Dễ gây khó chịu nếu show quá thường xuyên.</li>
<li>Chỉ dùng khi thực sự cần và luôn thử nghiệm cẩn thận.</li>
<li>Không show khi user đang thực hiện tác vụ quan trọng.</li>

<h2>So sánh với công nghệ tương tự</h2>

<h3>AdMob so với Ad Networks khác</h3>

<strong>Meta Audience Network (Facebook):</strong>

<table>
<thead>
<tr><th>Tiêu chí</th><th>AdMob</th><th>Meta Audience Network</th></tr>
</thead>
<tbody>
<tr><td><strong>Hệ sinh thái</strong></td><td>Google Ads rộng nhất</td><td>Facebook/Instagram</td></tr>
<tr><td><strong>Fill rate</strong></td><td>Cao (90%+)</td><td>Trung bình (70-80%)</td></tr>
<tr><td><strong>eCPM</strong></td><td>Trung bình</td><td>Cao hơn AdMob 10-20%</td></tr>
<tr><td><strong>Native Ads</strong></td><td>Hỗ trợ tốt</td><td>Hỗ trợ tốt</td></tr>
<tr><td><strong>Rewarded</strong></td><td>Tốt</td><td>Tốt</td></tr>
<tr><td><strong>Mediation</strong></td><td>Có (làm trung tâm)</td><td>Có (qua AdMob)</td></tr>
<tr><td><strong>Phù hợp</strong></td><td>Mọi loại app</td><td>App có user Meta nhiều</td></tr>
</tbody>
</table><strong>Unity Ads:</strong>

<table>
<thead>
<tr><th>Tiêu chí</th><th>AdMob</th><th>Unity Ads</th></tr>
</thead>
<tbody>
<tr><td><strong>Hệ sinh thái</strong></td><td>Google Ads</td><td>Unity Game Engine</td></tr>
<tr><td><strong>Fill rate</strong></td><td>Cao</td><td>Cao (cho game Unity)</td></tr>
<tr><td><strong>eCPM</strong></td><td>Trung bình</td><td>Cao (cho game)</td></tr>
<tr><td><strong>Rewarded</strong></td><td>Tốt</td><td>Rất tốt (game)</td></tr>
<tr><td><strong>Mediation</strong></td><td>Có</td><td>Có</td></tr>
<tr><td><strong>Phù hợp</strong></td><td>Mọi loại app</td><td>Game Unity</td></tr>
</tbody>
</table><strong>AppLovin:</strong>

<table>
<thead>
<tr><th>Tiêu chí</th><th>AdMob</th><th>AppLovin</th></tr>
</thead>
<tbody>
<tr><td><strong>Hệ sinh thái</strong></td><td>Google Ads</td><td>AppLovin MAX</td></tr>
<tr><td><strong>Fill rate</strong></td><td>Cao</td><td>Cao</td></tr>
<tr><td><strong>eCPM</strong></td><td>Trung bình</td><td>Cao</td></tr>
<tr><td><strong>Mediation</strong></td><td>Có</td><td>MAX (rất mạnh)</td></tr>
<tr><td><strong>Phù hợp</strong></td><td>Mọi loại app</td><td>Game, utility</td></tr>
</tbody>
</table><strong>Kết luận:</strong>
<li><strong>AdMob:</strong> Chuẩn cho hầu hết app, fill rate cao, dễ tích hợp.</li>
<li><strong>Meta:</strong> eCPM cao hơn, phù hợp app có user Meta nhiều.</li>
<li><strong>Unity:</strong> Tốt cho game Unity.</li>
<li><strong>AppLovin:</strong> MAX mediation rất mạnh, eCPM cao.</li>

<strong>Best practice:</strong> Dùng <strong>mediation</strong> để kết hợp nhiều network, tối đa revenue.

<h3>AdMob so với tự xây Ad Server</h3>

<table>
<thead>
<tr><th>Tiêu chí</th><th>AdMob</th><th>Ad Server tự xây</th></tr>
</thead>
<tbody>
<tr><td><strong>Chi phí khởi tạo</strong></td><td>Miễn phí</td><td>Tốn server + nhân lực</td></tr>
<tr><td><strong>Nguồn advertiser</strong></td><td>Có sẵn (hàng nghìn)</td><td>Phải tự tìm</td></tr>
<tr><td><strong>Đấu giá</strong></td><td>Tự động (RTB)</td><td>Tự xây thuật toán</td></tr>
<tr><td><strong>Chống fraud</strong></td><td>Google lo</td><td>Tự lo</td></tr>
<tr><td><strong>Thanh toán</strong></td><td>Tự động</td><td>Tự xử lý</td></tr>
<tr><td><strong>Báo cáo</strong></td><td>Dashboard đầy đủ</td><td>Tự xây</td></tr>
<tr><td><strong>Kiểm soát</strong></td><td>Ít (tuân thủ policy Google)</td><td>Toàn quyền</td></tr>
<tr><td><strong>Kết luận</strong></td><td>Chuẩn cho 99% app</td><td>Chỉ app cực lớn (100M+ users)</td></tr>
</tbody>
</table><strong>Khi nào tự xây:</strong>
<li>App có 100M+ users.</li>
<li>Có đội ngũ engineering lớn.</li>
<li>Cần kiểm soát toàn bộ (data, algorithm).</li>
<li>Ví dụ: TikTok, Instagram tự xây ad server.</li>

<strong>Khi nào dùng AdMob:</strong>
<li>App dưới 100M users.</li>
<li>Không muốn đầu tư vào ad infrastructure.</li>
<li>Muốn tập trung vào product, không phải ad tech.</li>

<h3>AdMob so với In-app Purchase (IAP)</h3>

<table>
<thead>
<tr><th>Tiêu chí</th><th>Ad (Quảng cáo)</th><th>IAP (Mua trong app)</th></tr>
</thead>
<tbody>
<tr><td><strong>Doanh thu/user</strong></td><td>Thấp ($0.01-0.1/ngày)</td><td>Cao ($1-100/lần mua)</td></tr>
<tr><td><strong>Tỷ lệ conversion</strong></td><td>100% (ai cũng xem ad)</td><td>2-5% (chỉ少数 mua)</td></tr>
<tr><td><strong>UX</strong></td><td>Xâm lấn (phải xem ad)</td><td>Tốt (user tự chọn mua)</td></tr>
<tr><td><strong>Implementation</strong></td><td>Dễ (tích hợp SDK)</td><td>Phức tạp (Google Play Billing)</td></tr>
<tr><td><strong>Phù hợp</strong></td><td>App miễn phí, user không muốn trả tiền</td><td>App có tính năng premium</td></tr>
</tbody>
</table><strong>Best practice: Kết hợp cả hai</strong>

<li>App free có ad → revenue từ đa số user.</li>
<li>User có thể trả tiền để <strong>tắt quảng cáo</strong> (remove ads) → revenue từ user muốn UX tốt.</li>
<li>Ví dụ: Spotify free có ad, Spotify Premium không có ad.</li>

<strong>Implement:</strong>

<pre data-lang="kotlin"><code>class MainActivity : AppCompatActivity() {

    private val viewModel: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Check nếu user đã mua remove ads
        lifecycleScope.launch {
            viewModel.hasRemoveAds.collect { hasRemoveAds ->
                if (hasRemoveAds) {
                    // Ẩn banner
                    findViewById<AdView>(R.id.adView).visibility = View.GONE
                } else {
                    // Hiển thị banner
                    findViewById<AdView>(R.id.adView).visibility = View.VISIBLE
                }
            }
        }
    }
}
</code></pre>

<h2>Các chính sách quan trọng (Privacy & Compliance)</h2>

<h3>GDPR (Châu Âu)</h3>

<strong>Bản chất:</strong>
<li>GDPR (General Data Protection Regulation) là luật bảo vệ dữ liệu cá nhân của EU.</li>
<li>App phải xin sự đồng ý của user trước khi thu thập dữ liệu để quảng cáo cá nhân hóa.</li>

<strong>Implement với UMP SDK:</strong>

<pre data-lang="kotlin"><code>// 1. Request consent info
val consentInformation = ConsentInformation.getInstance(context)
val params = ConsentRequestParameters.Builder().build()

consentInformation.requestConsentInfoUpdate(context, params, {
    // Consent info đã cập nhật
    if (consentInformation.canRequestAds()) {
        // User đã đồng ý → có thể request ads
        loadAd()
    } else {
        // User chưa đồng ý → hiển thị consent form
        showConsentForm()
    }
}, { error ->
    // Lỗi
    Log.e("Consent", "Error: \${error.message}")
})

// 2. Hiển thị consent form
private fun showConsentForm() {
    val activity = this
    ConsentForm.loadAndShowConsentFormIfRequired(activity) { error ->
        if (error == null) {
            // Form đã đóng
            if (consentInformation.canRequestAds()) {
                loadAd()
            }
        }
    }
}

// 3. Nếu user không đồng ý → dùng non-personalized ads
val request = AdRequest.Builder()
    .setMaxAdContentRating(AdContentRating.G)  // Rating phù hợp trẻ em
    .build()
</code></pre>

<strong>Chi tiết:</strong>
<li><code>canRequestAds()</code>: Trả về true nếu user đã đồng ý hoặc không cần consent.</li>
<li><code>ConsentForm.loadAndShowConsentFormIfRequired()</code>: Tự động hiển thị form nếu cần.</li>
<li>Nếu user không đồng ý → chỉ hiển thị non-personalized ads (ad không dựa trên dữ liệu cá nhân).</li>

<h3>COPPA / Đối tượng trẻ em</h3>

<strong>Bản chất:</strong>
<li>COPPA (Children's Online Privacy Protection Act) là luật bảo vệ trẻ em dưới 13 tuổi ở Mỹ.</li>
<li>Nếu app hướng đến trẻ em, phải tuân thủ COPPA.</li>

<strong>Implement:</strong>

<pre data-lang="kotlin"><code>val request = AdRequest.Builder()
    .tagForChildDirectedTreatment(true)  // App hướng đến trẻ em
    .build()
</code></pre>

<strong>Tác động:</strong>
<li>Google chỉ phục vụ ad an toàn cho trẻ (không có nội dung nhạy cảm).</li>
<li>Không thu thập dữ liệu cá nhân của trẻ.</li>
<li>Doanh thu có thể thấp hơn (ít advertiser target trẻ em).</li>

<h3>Quy tắc Google Play</h3>

<strong>Không được:</strong>
<li>Quảng cáo lừa đảo, nội dung nhạy cảm (sex, bạo lực).</li>
<li>Ép buộc user xem ad (ví dụ: chặn toàn bộ app trừ khi xem ad).</li>
<li>Bắt chước UI hệ thống (fake close button, fake notification).</li>

<strong>Hậu quả:</strong>
<li>App bị từ chối khi submit.</li>
<li>App bị gỡ nếu đã publish.</li>
<li>Tài khoản developer bị banned (khó khôi phục).</li>

<strong>Best practice:</strong>
<li>Đọc kỹ [Google Play Policy](https://support.google.com/googleplay/android-developer/answer/113468).</li>
<li>Test app với policy checker trước khi submit.</li>
<li>Nếu không chắc, hỏi Google trước.</li>

<h2>Sai lầm thường gặp (Pitfalls)</h2>

<h3>1. Quên khai báo App ID trong Manifest</h3>

<strong>Triệu chứng:</strong>
<li>App crash ngay khi khởi tạo SDK.</li>
<li>Logcat: <code>"The Google Mobile Ads SDK was initialized incorrectly"</code>.</li>

<strong>Nguyên nhân:</strong>
<li>Quên thêm <code><meta-data></code> trong <code>AndroidManifest.xml</code>.</li>
<li>Sai App ID.</li>

<strong>Giải pháp:</strong>

<pre data-lang="xml"><code><manifest>
    <application>
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"/>
    </application>
</manifest>
</code></pre>

<h3>2. Dùng Ad Unit ID thật khi test</h3>

<strong>Triệu chứng:</strong>
<li>Tài khoản AdMob bị đình chỉ.</li>
<li>Email từ Google: "Invalid traffic detected".</li>

<strong>Nguyên nhân:</strong>
<li>Dùng ad unit ID thật trong lúc develop.</li>
<li>AdMob ghi nhận impression/click từ developer → invalid traffic.</li>

<strong>Giải pháp:</strong>
<li>Luôn dùng test ad unit ID khi develop.</li>
<li>Chỉ dùng ad unit ID thật khi release.</li>

<pre data-lang="kotlin"><code>val AD_UNIT_ID = if (BuildConfig.DEBUG) {
    "ca-app-pub-3940256099942544/6300978111"  // Test
} else {
    "ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY"  // Production
}
</code></pre>

<h3>3. Show Interstitial ngay khi vừa load xong</h3>

<strong>Triệu chứng:</strong>
<li>User khó chịu.</li>
<li>Tỷ lệ uninstall cao.</li>
<li>Google có thể gỡ app.</li>

<strong>Nguyên nhân:</strong>
<li>Show ad ngay khi app mở hoặc user chưa kịp làm gì.</li>

<strong>Giải pháp:</strong>
<li>Show ở <strong>natural break point</strong> của flow:</li>
<p>  - Sau khi user hoàn thành level.</p>
<p>  - Sau khi user save document.</p>
<p>  - Sau khi user xem xong bài viết.</p>

<h3>4. Không tải lại ad sau khi show</h3>

<strong>Triệu chứng:</strong>
<li>Lần sau user không có ad để xem.</li>
<li>Mất revenue.</li>

<strong>Nguyên nhân:</strong>
<li>Một instance ad chỉ dùng được một lần.</li>
<li>Sau khi show, ad "chết".</li>

<strong>Giải pháp:</strong>

<pre data-lang="kotlin"><code>override fun onAdDismissedFullScreenContent() {
    interstitialAd = null  // Xóa reference
    loadInterstitial()     // Load ad mới
}
</code></pre>

<h3>5. Memory leak banner</h3>

<strong>Triệu chứng:</strong>
<li>App tốn nhiều memory.</li>
<li>Crash OOM (Out Of Memory) sau thời gian dài.</li>

<strong>Nguyên nhân:</strong>
<li>Không gọi <code>adView.destroy()</code> khi Activity bị hủy.</li>
<li>WebView vẫn giữ reference đến Context.</li>

<strong>Giải pháp:</strong>

<pre data-lang="kotlin"><code>override fun onDestroy() {
    adView.destroy()  // Bắt buộc
    super.onDestroy()
}
</code></pre>

<h3>6. Mã lỗi 3 (No fill) không phải bug</h3>

<strong>Triệu chứng:</strong>
<li>Logcat: <code>"Ad failed to load: 3"</code>.</li>
<li>Developer tưởng là lỗi.</li>

<strong>Nguyên nhân:</strong>
<li>Error code 3 = <code>ERROR_CODE_NO_FILL</code>.</li>
<li>Không có ad phù hợp vào thời điểm đó.</li>
<li>Bình thường, không phải bug.</li>

<strong>Giải pháp:</strong>
<li>Xử lý âm thầm (log nhẹ, thử lại sau).</li>
<li>Không hiển thị lỗi cho user.</li>

<pre data-lang="kotlin"><code>override fun onAdFailedToLoad(error: LoadAdError) {
    if (error.code == AdRequest.ERROR_CODE_NO_FILL) {
        Log.d("AdMob", "No fill, will retry later")
    } else {
        Log.e("AdMob", "Ad failed: \${error.code}")
    }
}
</code></pre>

<h2>Debug Techniques</h2>

<h3>1. Bật debug mode</h3>

<pre data-lang="kotlin"><code>// Trước khi initialize SDK
MobileAds.setDebugConfig(
    DebugConfig.Builder()
        .setMediationDebugConfig(MediationDebugConfig.Builder().build())
        .build()
)
</code></pre>

<strong>Tác dụng:</strong>
<li>Log chi tiết về ad request, response.</li>
<li>Hiển thị mediation waterfall.</li>

<h3>2. Kiểm tra logcat</h3>

<pre data-lang="bash"><code>adb logcat -s AdMob
</code></pre>

<strong>Logs quan trọng:</strong>
<li><code>Ad loaded successfully</code> — ad đã tải.</li>
<li><code>Ad failed to load: 3</code> — no fill.</li>
<li><code>Ad impression recorded</code> — ad đã hiển thị.</li>
<li><code>Ad clicked</code> — user click.</li>

<h3>3. AdMob Dashboard</h3>

<li>Truy cập: https://apps.admob.com</li>
<li>Kiểm tra:</li>
<p>  - Impressions, clicks, revenue.</p>
<p>  - Fill rate (tỷ lệ ad request thành công).</p>
<p>  - eCPM (revenue trên 1000 impressions).</p>
<p>  - Ad units performance.</p>

<h3>4. Test với test device</h3>

<pre data-lang="kotlin"><code>val adRequest = AdRequest.Builder()
    .addTestDevice("YOUR_TEST_DEVICE_ID")  // Lấy từ logcat
    .build()
</code></pre>

<strong>Lấy test device ID:</strong>
<li>Chạy app với ad unit ID thật.</li>
<li>Logcat sẽ in: <code>"Use AdRequest.Builder.addTestDevice("XXX") to get test ads"</code>.</li>
<li>Copy device ID và thêm vào AdRequest.</li>

<h2>Performance Considerations</h2>

<h3>1. Giảm latency khi load ad</h3>

<strong>Vấn đề:</strong>
<li>Load ad mất thời gian (1-5 giây).</li>
<li>User phải đợi nếu load khi cần show.</li>

<strong>Giải pháp:</strong>
<li>Load ad <strong>trước</strong> khi cần show.</li>
<li>Ví dụ: load interstitial khi bắt đầu level, show khi hoàn thành level.</li>

<pre data-lang="kotlin"><code>// Load ad khi Activity tạo
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    loadInterstitial()  // Load trước
}

// Show ad khi user hoàn thành level
fun onLevelComplete() {
    showInterstitial()  // Show ngay (ad đã sẵn sàng)
}
</code></pre>

<h3>2. Tránh load ad quá nhiều</h3>

<strong>Vấn đề:</strong>
<li>Load ad liên tục → tốn network, battery.</li>
<li>AdMob có thể xem là invalid traffic.</li>

<strong>Giải pháp:</strong>
<li>Chỉ load ad khi cần.</li>
<li>Không reload ad nếu ad cũ vẫn còn (chưa expire).</li>

<pre data-lang="kotlin"><code>private fun loadInterstitial() {
    // Chỉ load nếu chưa có ad
    if (interstitialAd == null) {
        InterstitialAd.load(...)
    }
}
</code></pre>

<h3>3. Optimize banner refresh rate</h3>

<strong>Vấn đề:</strong>
<li>Banner tự động refresh mỗi 60 giây.</li>
<li>Nếu refresh quá thường xuyên → tốn network.</li>

<strong>Giải pháp:</strong>
<li>Điều chỉnh refresh rate trong AdMob Console.</li>
<li>Hoặc disable auto-refresh, tự control refresh.</li>

<pre data-lang="xml"><code><com.google.android.gms.ads.AdView
    ...
    app:adSize="BANNER"
    app:adUnitId="..."
    app:refreshInterval="30"/>  <!-- Refresh mỗi 30 giây -->
</code></pre>

<h3>4. Memory optimization</h3>

<strong>Vấn đề:</strong>
<li>Banner (WebView) tốn nhiều memory.</li>
<li>Native ad giữ reference đến Context.</li>

<strong>Giải pháp:</strong>
<li>Destroy ad khi không dùng.</li>
<li>Không giữ reference đến ad cũ.</li>

<pre data-lang="kotlin"><code>override fun onDestroy() {
    adView.destroy()
    nativeAd?.destroy()
    interstitialAd = null
    rewardedAd = null
    super.onDestroy()
}
</code></pre>

<h2>Kết nối hệ thống (System Thinking)</h2>

<p>Advertisements nằm ở <strong>Presentation + Data Layer</strong> trong kiến trúc MVVM/Clean:</p>

<strong>Tầng Presentation:</strong>
<li>Activity/Compose quyết định thời điểm show (chỉ khi foreground).</li>
<li>Dùng <code>repeatOnLifecycle</code> để không show sai lúc.</li>
<li>UI phải responsive với ad state (loading, loaded, shown).</li>

<strong>Tầng Data:</strong>
<li><code>AdManager</code>/<code>AdDataSource</code> bọc Google Mobile Ads SDK.</li>
<li>Trả kết quả thuần (suspend/flow) cho tầng trên.</li>
<li>Xử lý retry, error handling.</li>

<strong>Tầng Domain:</strong>
<li>Hoàn toàn không biết quảng cáo tồn tại.</li>
<li>UseCase chỉ xử lý nghiệp vụ.</li>

<strong>Liên hệ với Service:</strong>
<li>Ad SDK chạy trong process app như một service nội bộ.</li>
<li>Tương tự Google Service (FCM, Analytics).</li>
<li>Tải ad qua network, hiển thị qua Activity.</li>

<strong>Liên hệ với Lifecycle:</strong>
<li>Ad phải synchronous với Activity lifecycle.</li>
<li>Pause/resume/destroy đúng thời điểm.</li>
<li>Không show ad khi app ở background.</li>

<h2>Lịch sử phát triển</h2>

<li><strong>2006:</strong> AdMob ra đời, là nền tảng quảng cáo mobile độc lập.</li>
<li><strong>2010:</strong> Google mua lại AdMob với giá $750 triệu.</li>
<li><strong>2014:</strong> Google hợp nhất AdMob với Google Ads, tạo thành nền tảng quảng cáo thống nhất.</li>
<li><strong>2018:</strong> Google Mobile Ads SDK ra đời, thay thế AdMob SDK cũ.</li>
<li><strong>2020:</strong> SDK 20.x+ chuyển sang API callback (<code>InterstitialAd.load</code>) thay vì gọi show trực tiếp.</li>
<li><strong>2021:</strong> UMP SDK ra đời để tuân thủ GDPR/COPPA.</li>
<li><strong>2023:</strong> SDK 23.x với cải thiện performance, mediation.</li>

<h2>Nguồn tham khảo</h2>

<li>[Google AdMob Documentation](https://developers.google.com/admob/android/quick-start) — Official, bắt buộc đọc.</li>
<li>[Android Developers - AdMob](https://developer.android.com/develop/ui/views/admob)</li>
<li>[Google Play Policy - Ads](https://support.google.com/googleplay/android-developer/answer/113468)</li>
<li>[UMP SDK - User Messaging Platform](https://developers.google.com/admob/android/privacy)</li>
<li>[AdMob Mediation](https://developers.google.com/admob/android/mediation)</li>
<li>[AdMob Banner](https://developers.google.com/admob/android/banner)</li>
<li>[AdMob Interstitial](https://developers.google.com/admob/android/interstitial)</li>
<li>[AdMob Rewarded](https://developers.google.com/admob/android/rewarded)</li>
<li>[AdMob Native](https://developers.google.com/admob/android/native/start)</li>
    `
  },

  'android-broadcast-receiver': {

    title: '4.2.4.1 Broadcast Receiver',
    summary: 'Broadcast Receiver là gì, Static vs Dynamic Receiver, LocalBroadcastManager deprecated và thay thế bằng Flow, triển khai thực chiến với MVVM/MVI + Hilt, giới hạn Android 8+, security, và so sánh với WorkManager/Flow.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['android', 'broadcast-receiver', 'static-receiver', 'dynamic-receiver', 'local-broadcast', 'hilt', 'mvvm', 'mvi', 'clean-architecture', 'security', 'background'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['activity-overview', 'activity-lifecycle', 'android-service'],
    related: ['android-service', 'android-intent'],
    learningOutcomes: [
      'Hiểu bản chất Broadcast Receiver và vòng đời cực ngắn của nó.',
      'Phân biệt Static Receiver và Dynamic Receiver, biết khi nào dùng loại nào.',
      'Biết tại sao LocalBroadcastManager deprecated và cách thay thế bằng Flow/SharedFlow.',
      'Triển khai Dynamic Receiver đúng cách trong MVVM/MVI với Hilt.',
      'Nắm rõ các giới hạn background Android 8+ ảnh hưởng đến Static Receiver.',
      'Bảo vệ app trước lỗ hổng bảo mật liên quan đến Broadcast.',
      'Biết khi nào nên dùng WorkManager hoặc Flow thay vì Broadcast Receiver.',
      'Tránh được các lỗi phổ biến: leak, unregister, ANR trên main thread.'
    ],
    knowledgeGap: 'Nhiều developer hiểu Broadcast Receiver theo kiểu "đăng ký lắng nghe sự kiện toàn hệ thống", nhưng bỏ qua Android 8+ đã cắt hầu hết Static Receiver cho implicit broadcast, không biết Dynamic Receiver cần unregister đúng nơi để tránh leak, và thường dùng Broadcast để giao tiếp nội bộ trong khi Flow là lựa chọn tốt hơn nhiều.',
    updatedAt: '2026-07-29',
    readTime: '35 phút',
    content: `
<h2>1. Nó là gì và vì sao nó tồn tại?</h2>
<p><strong>Broadcast Receiver</strong> là một <strong>Application Component</strong> cho phép ứng dụng <strong>lắng nghe và phản ứng với các sự kiện (broadcast)</strong> được phát đi bởi hệ thống hoặc các ứng dụng khác.</p>
<p>Hãy nghĩ về nó như một <strong>radio receiver</strong>: hệ thống phát đi tín hiệu trên một "kênh" (Intent với Action cụ thể), và bất kỳ ai đang "dò" kênh đó sẽ nhận được tín hiệu đó.</p>
<h3>Vấn đề nó giải quyết</h3>
<p>Trong hệ sinh thái Android, nhiều thứ xảy ra độc lập với ứng dụng của bạn: pin sắp hết, mạng vừa kết nối lại, thiết bị vừa khởi động, SMS mới đến... Không có Broadcast Receiver, app <strong>không có cách nào biết</strong> những sự kiện này xảy ra — trừ khi liên tục polling (rất tốn pin). Broadcast Receiver giải quyết điều này theo mô hình <strong>pub/sub</strong> ở cấp độ hệ điều hành.</p>

<h2>2. Broadcast Receiver hoạt động như thế nào?</h2>
<h3>Lifecycle: Cực kỳ ngắn</h3>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Quan trọng nhất cần hiểu:</strong> Một Broadcast Receiver chỉ "sống" trong thời gian thực thi hàm <code>onReceive()</code>. Sau khi <code>onReceive()</code> kết thúc, Receiver có thể bị GC bất cứ lúc nào.</div></div>
<pre><code class="language-text">Intent được gửi đi
        ↓
Android tìm Receiver phù hợp
        ↓
Tạo instance Receiver (nếu cần)
        ↓
Gọi onReceive(context, intent)   ← Receiver "sống" ở đây
        ↓
onReceive() kết thúc
        ↓
Receiver "chết" — không còn tham chiếu nào được giữ</code></pre>

<h3>Thread và thời gian giới hạn</h3>
<ul>
  <li><code>onReceive()</code> luôn chạy trên <strong>Main Thread (UI Thread)</strong> theo mặc định.</li>
  <li>Android giới hạn tối đa <strong>10 giây</strong> để <code>onReceive()</code> hoàn thành.</li>
  <li>Nếu vượt quá 10 giây → <strong>ANR (Application Not Responding)</strong>.</li>
</ul>
<pre><code class="language-kotlin" data-lang="kotlin">// ❌ ĐỪNG làm điều này trong onReceive()
override fun onReceive(context: Context, intent: Intent) {
    val data = fetchDataFromNetwork() // Block main thread → ANR
}</code></pre>

<h3>goAsync() — Khi cần thêm thời gian</h3>
<pre><code class="language-kotlin" data-lang="kotlin">class NetworkReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val pendingResult = goAsync() // Báo cho Android "chưa xong đâu"

        CoroutineScope(Dispatchers.IO).launch {
            try {
                processNetworkChange(intent)
            } finally {
                pendingResult.finish() // Báo Android "xong rồi"
            }
        }
    }
}</code></pre>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Cảnh báo:</strong> <code>goAsync()</code> vẫn có giới hạn 10 giây. Không dùng cho tác vụ dài. Dùng WorkManager cho tác vụ dài.</div></div>

<h2>3. Static Receiver vs Dynamic Receiver</h2>
<table>
  <thead><tr><th>Tiêu chí</th><th>Static Receiver</th><th>Dynamic Receiver</th></tr></thead>
  <tbody>
    <tr><td>Khai báo ở đâu</td><td>AndroidManifest.xml</td><td>Trong code (Activity/Fragment/Service)</td></tr>
    <tr><td>App có cần đang chạy?</td><td>Không (Android có thể khởi động process)</td><td>Có — chỉ nhận khi component đang active</td></tr>
    <tr><td>Còn nhận sau Android 8+?</td><td><strong>Chỉ với explicit và một số system broadcast</strong></td><td>Có</td></tr>
    <tr><td>Khi nào dùng</td><td>Boot completed, SMS, Phone call</td><td>Network change, screen on/off, in-app events</td></tr>
    <tr><td>Nguy cơ leak</td><td>Không</td><td><strong>Có</strong> nếu quên unregister</td></tr>
  </tbody>
</table>

<h3>Static Receiver — Khai báo trong Manifest</h3>
<pre><code class="language-xml" data-lang="xml">&lt;!-- AndroidManifest.xml --&gt;
&lt;receiver
    android:name=".receiver.BootReceiver"
    android:exported="true"&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="android.intent.action.BOOT_COMPLETED" /&gt;
    &lt;/intent-filter&gt;
&lt;/receiver&gt;</code></pre>
<pre><code class="language-kotlin" data-lang="kotlin">// BootReceiver.kt
class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED) {
            // Reschedule WorkManager jobs sau khi thiết bị khởi động lại
            WorkManager.getInstance(context)
                .enqueueUniqueWork(
                    "sync_after_boot",
                    ExistingWorkPolicy.KEEP,
                    OneTimeWorkRequestBuilder&lt;SyncWorker&gt;().build()
                )
        }
    }
}</code></pre>

<h3>Dynamic Receiver — Đăng ký trong code</h3>
<pre><code class="language-kotlin" data-lang="kotlin">// NetworkMonitorReceiver.kt
class NetworkMonitorReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val isConnected = isNetworkAvailable(context)
        // Notify ViewModel/UseCase
    }
}</code></pre>
<h4>Đăng ký và hủy đăng ký đúng cách</h4>
<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body">Luôn đảm bảo <code>register</code> và <code>unregister</code> ở cùng cặp lifecycle counterpart để tránh memory leak.</div></div>
<pre><code class="language-kotlin" data-lang="kotlin">class MainActivity : AppCompatActivity() {
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
}</code></pre>

<h2>4. Giới hạn Android 8+ (API 26) — Implicit Broadcast Restrictions</h2>
<p>Từ Android 8.0 (Oreo), Google đã <strong>cấm hầu hết Static Receiver nhận implicit broadcasts</strong> để cải thiện hiệu năng và tuổi thọ pin.</p>
<h3>Nguyên nhân</h3>
<p>Nếu 50 ứng dụng đều đăng ký lắng nghe <code>CONNECTIVITY_CHANGE</code> qua Manifest, mỗi khi mạng thay đổi Android phải khởi động 50 process — gây lãng phí tài nguyên nghiêm trọng.</p>
<h3>Implicit Broadcast vẫn còn hoạt động với Static Receiver (Exempted)</h3>
<ul>
  <li><code>ACTION_BOOT_COMPLETED</code></li>
  <li><code>ACTION_LOCKED_BOOT_COMPLETED</code></li>
  <li><code>ACTION_MY_PACKAGE_REPLACED</code></li>
  <li><code>ACTION_NEW_OUTGOING_CALL</code></li>
  <li><code>SMS_RECEIVED</code></li>
  <li><code>WAP_PUSH_RECEIVED</code></li>
</ul>
<div class="callout callout-info"><span class="callout-icon">ℹ️</span><div class="callout-body">Danh sách đầy đủ: <a href="https://developer.android.com/guide/components/broadcast-exceptions" target="_blank">developer.android.com/guide/components/broadcast-exceptions</a></div></div>
<h3>Giải pháp thay thế</h3>
<div class="mermaid">
flowchart LR
    A["Static Receiver\nCONNECTIVITY_CHANGE\n(Android 8+)"] -->|Bị chặn!| B{Thay thế}
    B --> C["Dynamic Receiver\n(registerReceiver)"]
    B --> D["NetworkCallback\n(registerNetworkCallback)"]
    style A fill:#f44336,color:#fff
    style C fill:#4CAF50,color:#fff
    style D fill:#2196F3,color:#fff
</div>

<h2>5. LocalBroadcastManager — Deprecated và thay thế</h2>
<h3>LocalBroadcastManager là gì?</h3>
<p>Utility class của AndroidX cho phép gửi và nhận broadcast <strong>chỉ trong nội bộ ứng dụng</strong>.</p>
<pre><code class="language-kotlin" data-lang="kotlin">// Gửi
LocalBroadcastManager.getInstance(context)
    .sendBroadcast(Intent("com.example.REFRESH_DATA"))

// Nhận
LocalBroadcastManager.getInstance(this)
    .registerReceiver(receiver, IntentFilter("com.example.REFRESH_DATA"))</code></pre>

<h3>Vì sao nó deprecated?</h3>
<p><code>LocalBroadcastManager</code> bị deprecated từ <strong>AndroidX Core 1.1.0 (2019)</strong> vì:</p>
<ol>
  <li><strong>Không phải giải pháp tốt</strong> cho giao tiếp component — vẫn có overhead của Intent và Receiver creation.</li>
  <li><strong>Không type-safe</strong> — mọi dữ liệu phải serialize vào Intent extras, dễ lỗi runtime.</li>
  <li><strong>Có giải pháp tốt hơn nhiều</strong> trong Kotlin ecosystem.</li>
</ol>

<h3>Thay thế LocalBroadcastManager</h3>
<table>
  <thead><tr><th>Use case</th><th>Giải pháp thay thế</th></tr></thead>
  <tbody>
    <tr><td>ViewModel ↔ UI</td><td><code>StateFlow</code> / <code>LiveData</code></td></tr>
    <tr><td>Giữa các ViewModel</td><td><code>SharedViewModel</code> / <code>SharedFlow</code></td></tr>
    <tr><td>Giữa các màn hình</td><td><code>SavedStateHandle</code></td></tr>
    <tr><td>Repository → ViewModel</td><td><code>Flow</code> / <code>SharedFlow</code></td></tr>
    <tr><td>Broadcast toàn app (one-to-many)</td><td><code>SharedFlow</code> với replay=0</td></tr>
  </tbody>
</table>

<h4>SharedFlow thay thế LocalBroadcastManager</h4>
<pre><code class="language-kotlin" data-lang="kotlin">// AppEventBus.kt — Singleton qua Hilt
object AppEventBus {
    private val _events = MutableSharedFlow&lt;AppEvent&gt;(extraBufferCapacity = 64)
    val events: SharedFlow&lt;AppEvent&gt; = _events.asSharedFlow()

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
        .filterIsInstance&lt;AppEvent.RefreshData&gt;()
        .collect { handleRefresh() }
}</code></pre>

<h2>6. Triển khai thực chiến — MVVM/MVI + Clean Architecture + Hilt</h2>
<h3>Bài toán: Theo dõi trạng thái mạng</h3>
<p>Use case phổ biến nhất: App cần biết khi nào mạng mất/khôi phục để retry API call hoặc hiển thị banner offline.</p>
<h4>Kiến trúc</h4>
<div class="mermaid">
flowchart TD
    CB["ConnectivityManager\nNetworkCallback"] -->|callbackFlow| OBS["NetworkConnectivityObserver\n(Data Layer)"]
    OBS -->|Flow&lt;ConnectivityStatus&gt;| VM["NetworkStatusViewModel\n(Presentation Layer)"]
    VM -->|StateFlow&lt;UiState&gt;| UI["Activity/Fragment\n(UI Layer)"]
    style CB fill:#FF9800,color:#fff
    style OBS fill:#2196F3,color:#fff
    style VM fill:#9C27B0,color:#fff
    style UI fill:#4CAF50,color:#fff
</div>

<h4>Domain Layer: Interface</h4>
<pre><code class="language-kotlin" data-lang="kotlin">// domain/connectivity/ConnectivityObserver.kt
interface ConnectivityObserver {
    fun observe(): Flow&lt;ConnectivityStatus&gt;

    enum class ConnectivityStatus { Available, Unavailable, Losing, Lost }
}</code></pre>

<h4>Data Layer: Implementation</h4>
<pre><code class="language-kotlin" data-lang="kotlin">// data/connectivity/NetworkConnectivityObserver.kt
class NetworkConnectivityObserver @Inject constructor(
    @ApplicationContext private val context: Context
) : ConnectivityObserver {

    private val connectivityManager =
        context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

    override fun observe(): Flow&lt;ConnectivityObserver.ConnectivityStatus&gt; = callbackFlow {
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
}</code></pre>

<h4>DI Module</h4>
<pre><code class="language-kotlin" data-lang="kotlin">// di/ConnectivityModule.kt
@Module
@InstallIn(SingletonComponent::class)
abstract class ConnectivityModule {
    @Binds
    @Singleton
    abstract fun bindConnectivityObserver(
        impl: NetworkConnectivityObserver
    ): ConnectivityObserver
}</code></pre>

<h4>ViewModel — MVI UiState</h4>
<pre><code class="language-kotlin" data-lang="kotlin">// MVI State
data class HomeUiState(
    val posts: List&lt;Post&gt; = emptyList(),
    val isLoading: Boolean = false,
    val isOffline: Boolean = false,
    val errorMessage: String? = null
)

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val connectivityObserver: ConnectivityObserver,
    private val getPostsUseCase: GetPostsUseCase
) : ViewModel() {

    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow&lt;HomeUiState&gt; = _uiState.asStateFlow()

    init {
        observeConnectivity()
        loadPosts()
    }

    private fun observeConnectivity() {
        viewModelScope.launch {
            connectivityObserver.observe().collect { status -&gt;
                _uiState.update { it.copy(
                    isOffline = status != ConnectivityObserver.ConnectivityStatus.Available
                )}
                if (status == ConnectivityObserver.ConnectivityStatus.Available) {
                    loadPosts() // Auto-retry khi mạng khôi phục
                }
            }
        }
    }
}</code></pre>

<h4>Luồng hoạt động (Flow Simulation)</h4>
<div class="mermaid">
sequenceDiagram
    participant SYS as Android System
    participant CB as NetworkCallback
    participant FLOW as callbackFlow
    participant VM as ViewModel
    participant UI as Fragment

    SYS->>CB: onLost(network)
    CB->>FLOW: trySend(Lost)
    FLOW->>VM: collect → isOffline = true
    VM->>UI: StateFlow emit UiState(isOffline=true)
    UI->>UI: offlineBanner.isVisible = true

    SYS->>CB: onAvailable(network)
    CB->>FLOW: trySend(Available)
    FLOW->>VM: collect → isOffline = false, loadPosts()
    VM->>UI: StateFlow emit UiState(isOffline=false)
    UI->>UI: offlineBanner.isVisible = false
</div>

<h2>7. Ví dụ 2: Boot Receiver + WorkManager (Hilt)</h2>
<pre><code class="language-kotlin" data-lang="kotlin">// receiver/BootReceiver.kt
@AndroidEntryPoint
class BootReceiver : BroadcastReceiver() {

    @Inject
    lateinit var workScheduler: WorkScheduler

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED ||
            intent.action == Intent.ACTION_MY_PACKAGE_REPLACED) {
            workScheduler.schedulePeriodicSync()
        }
    }
}</code></pre>
<pre><code class="language-kotlin" data-lang="kotlin">// domain/scheduler/WorkScheduler.kt
class WorkScheduler @Inject constructor(
    private val workManager: WorkManager
) {
    fun schedulePeriodicSync() {
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build()

        val syncRequest = PeriodicWorkRequestBuilder&lt;DataSyncWorker&gt;(
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
}</code></pre>
<pre><code class="language-xml" data-lang="xml">&lt;uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" /&gt;

&lt;receiver
    android:name=".receiver.BootReceiver"
    android:exported="false"&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="android.intent.action.BOOT_COMPLETED" /&gt;
        &lt;action android:name="android.intent.action.MY_PACKAGE_REPLACED" /&gt;
    &lt;/intent-filter&gt;
&lt;/receiver&gt;</code></pre>

<h2>8. Security — Bảo mật với Broadcast Receiver</h2>
<h3>8.1 android:exported — Quan trọng từ Android 12+</h3>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Từ Android 12 (API 31), mọi receiver có <code>&lt;intent-filter&gt;</code> <strong>bắt buộc phải khai báo</strong> <code>android:exported</code>. Thiếu khai báo → app crash khi install.</div></div>
<pre><code class="language-xml" data-lang="xml">&lt;!-- ✅ Chỉ nhận broadcast từ nội bộ app --&gt;
&lt;receiver android:name=".receiver.InternalReceiver" android:exported="false"&gt;...&lt;/receiver&gt;

&lt;!-- ✅ Nhận từ hệ thống (cần thiết) --&gt;
&lt;receiver android:name=".receiver.BootReceiver" android:exported="true"&gt;...&lt;/receiver&gt;</code></pre>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Rule of thumb:</strong> Luôn dùng <code>exported="false"</code> trừ khi bạn có lý do rõ ràng cần nhận từ bên ngoài.</div></div>

<h3>8.2 Permission — Hạn chế ai được gửi broadcast</h3>
<pre><code class="language-xml" data-lang="xml">&lt;!-- Chỉ app có permission này mới gửi được --&gt;
&lt;receiver
    android:name=".receiver.SecureReceiver"
    android:exported="true"
    android:permission="com.example.SEND_SECURE_BROADCAST"&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="com.example.SECURE_ACTION" /&gt;
    &lt;/intent-filter&gt;
&lt;/receiver&gt;</code></pre>

<h3>8.3 Không đặt dữ liệu nhạy cảm trong broadcast</h3>
<pre><code class="language-kotlin" data-lang="kotlin">// ❌ Không làm — dữ liệu có thể bị app khác intercept
val intent = Intent("com.example.USER_LOGGED_IN")
intent.putExtra("token", "my_secret_jwt_token")
context.sendBroadcast(intent)

// ✅ Nên làm — chỉ báo hiệu sự kiện, dữ liệu lấy qua secure channel
val intent = Intent("com.example.USER_LOGGED_IN")
context.sendBroadcast(intent, "com.example.RECEIVE_AUTH_EVENTS")</code></pre>

<h3>8.4 Validate Intent trong onReceive()</h3>
<pre><code class="language-kotlin" data-lang="kotlin">override fun onReceive(context: Context, intent: Intent) {
    if (intent.action != Intent.ACTION_BOOT_COMPLETED) return
    val payload = intent.getStringExtra("payload") ?: return
    if (!isValidPayload(payload)) return
    processBootCompleted(context)
}</code></pre>

<h2>9. So sánh: Broadcast Receiver vs WorkManager vs Kotlin Flow</h2>
<table>
  <thead><tr><th>Tiêu chí</th><th>Broadcast Receiver</th><th>WorkManager</th><th>Kotlin Flow</th></tr></thead>
  <tbody>
    <tr><td><strong>App cần đang chạy?</strong></td><td>Không (static) / Có (dynamic)</td><td>Không</td><td><strong>Có</strong></td></tr>
    <tr><td><strong>Xử lý nền lâu dài?</strong></td><td>❌ (max 10s)</td><td>✅</td><td>❌</td></tr>
    <tr><td><strong>Phạm vi</strong></td><td>System-wide / App-wide</td><td>App-level</td><td>In-process</td></tr>
    <tr><td><strong>Guaranteed execution?</strong></td><td>Không</td><td>✅ (persist across reboot)</td><td>Không</td></tr>
    <tr><td><strong>Type-safe?</strong></td><td>❌ (Intent extras)</td><td>Một phần (Data)</td><td>✅</td></tr>
    <tr><td><strong>Testability</strong></td><td>Khó</td><td>Dễ (TestDriver)</td><td>Dễ</td></tr>
    <tr><td><strong>Battery impact</strong></td><td>Cao (static) / Thấp (dynamic)</td><td>Tối ưu tốt</td><td>Thấp</td></tr>
  </tbody>
</table>

<h3>Khi nào dùng Broadcast Receiver</h3>
<ul>
  <li><code>ACTION_BOOT_COMPLETED</code> — reschedule job sau reboot ✅</li>
  <li><code>ACTION_MY_PACKAGE_REPLACED</code> — migrate data sau update ✅</li>
  <li><code>SMS_RECEIVED</code> — xử lý SMS trong OTP flow ✅</li>
  <li><code>ACTION_POWER_CONNECTED</code> — bắt đầu sync khi sạc ✅</li>
</ul>
<h3>Khi nào dùng WorkManager</h3>
<div class="mermaid">
flowchart LR
    UC["Upload ảnh khi có WiFi\nngay cả khi user đóng app"] --> BR["Broadcast Receiver ❌\nkhông thể đảm bảo, max 10s"]
    UC --> WM["WorkManager ✅\npersist, constraint-aware, guaranteed"]
    style BR fill:#f44336,color:#fff
    style WM fill:#4CAF50,color:#fff
</div>
<h3>Khi nào dùng Flow</h3>
<div class="mermaid">
flowchart LR
    UC["Repository thông báo ViewModel\nkhi data cache expired"] --> LB["LocalBroadcastManager ❌\ndeprecated, không type-safe"]
    UC --> FL["Flow/SharedFlow ✅\ntype-safe, reactive, testable"]
    style LB fill:#f44336,color:#fff
    style FL fill:#4CAF50,color:#fff
</div>

<h2>10. Các lỗi phổ biến và cách tránh</h2>
<h3>Lỗi 1: Memory Leak — Quên unregister Dynamic Receiver</h3>
<pre><code class="language-kotlin" data-lang="kotlin">// ❌ Lỗi thường gặp — Không có unregister → memory leak!
class BadActivity : AppCompatActivity() {
    private val receiver = NetworkReceiver()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        registerReceiver(receiver, IntentFilter(...))
        // ← Không có unregister!
    }
}

// ✅ Đúng — Unregister ở đúng lifecycle counterpart
class GoodActivity : AppCompatActivity() {
    private val receiver = NetworkReceiver()
    override fun onStart() { super.onStart(); registerReceiver(receiver, IntentFilter(...)) }
    override fun onStop() { super.onStop(); unregisterReceiver(receiver) }
}</code></pre>

<h3>Lỗi 2: Làm việc nặng trong onReceive()</h3>
<pre><code class="language-kotlin" data-lang="kotlin">// ❌ Block main thread → ANR sau 10 giây
override fun onReceive(context: Context, intent: Intent) {
    uploadFilesToServer() // Tác vụ nặng
}

// ✅ Delegate sang WorkManager
override fun onReceive(context: Context, intent: Intent) {
    WorkManager.getInstance(context)
        .enqueue(OneTimeWorkRequestBuilder&lt;UploadWorker&gt;().build())
}</code></pre>

<h3>Lỗi 3: Dùng Static Receiver cho implicit broadcast trên Android 8+</h3>
<pre><code class="language-xml" data-lang="xml">&lt;!-- ❌ Sẽ không hoạt động trên Android 8+ --&gt;
&lt;receiver android:name=".NetworkReceiver"&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="android.net.conn.CONNECTIVITY_CHANGE" /&gt;
    &lt;/intent-filter&gt;
&lt;/receiver&gt;</code></pre>
<pre><code class="language-kotlin" data-lang="kotlin">// ✅ Dùng Dynamic Receiver hoặc NetworkCallback thay thế
val request = NetworkRequest.Builder()
    .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    .build()
connectivityManager.registerNetworkCallback(request, networkCallback)</code></pre>

<h3>Lỗi 4: Không khai báo exported trên Android 12+</h3>
<pre><code class="language-xml" data-lang="xml">&lt;!-- ❌ App sẽ crash khi install trên Android 12+ --&gt;
&lt;receiver android:name=".MyReceiver"&gt;
    &lt;intent-filter&gt;...&lt;/intent-filter&gt;
&lt;/receiver&gt;

&lt;!-- ✅ Phải khai báo rõ --&gt;
&lt;receiver android:name=".MyReceiver" android:exported="false"&gt;
    &lt;intent-filter&gt;...&lt;/intent-filter&gt;
&lt;/receiver&gt;</code></pre>

<h2>11. Testing Broadcast Receiver</h2>
<h3>Test Static Receiver với Robolectric</h3>
<pre><code class="language-kotlin" data-lang="kotlin">@RunWith(RobolectricTestRunner::class)
class BootReceiverTest {
    @Test
    fun \`onReceive BOOT_COMPLETED should schedule WorkManager job\`() {
        val context = ApplicationProvider.getApplicationContext&lt;Application&gt;()
        val receiver = BootReceiver()
        receiver.onReceive(context, Intent(Intent.ACTION_BOOT_COMPLETED))

        val workInfos = WorkManager.getInstance(context)
            .getWorkInfosForUniqueWork("data_sync")
            .get()
        assertThat(workInfos).isNotEmpty()
    }
}</code></pre>

<h3>Test qua Fake ConnectivityObserver (dễ hơn và được khuyến nghị)</h3>
<pre><code class="language-kotlin" data-lang="kotlin">class FakeConnectivityObserver : ConnectivityObserver {
    private val _statusFlow = MutableSharedFlow&lt;ConnectivityObserver.ConnectivityStatus&gt;()
    suspend fun emit(status: ConnectivityObserver.ConnectivityStatus) = _statusFlow.emit(status)
    override fun observe() = _statusFlow
}

@Test
fun \`when network lost, isOffline should be true\`() = runTest {
    val fakeObserver = FakeConnectivityObserver()
    val viewModel = HomeViewModel(fakeObserver, FakeGetPostsUseCase())

    fakeObserver.emit(ConnectivityObserver.ConnectivityStatus.Lost)

    assertThat(viewModel.uiState.value.isOffline).isTrue()
}</code></pre>

<h2>12. Tư duy hệ thống — Vị trí trong Clean Architecture</h2>
<div class="mermaid">
flowchart TD
    subgraph Presentation["Presentation Layer"]
        UI["Activity / Fragment\ncollect StateFlow&lt;UiState&gt;"]
        VM["ViewModel (MVVM) / MVI Store"]
    end
    subgraph Domain["Domain Layer"]
        OBS_I["ConnectivityObserver (interface)"]
        SCH_I["WorkScheduler (interface)"]
    end
    subgraph Data["Data Layer"]
        OBS_IMPL["NetworkConnectivityObserver\nbọc NetworkCallback"]
        SCH_IMPL["WorkSchedulerImpl\nbọc WorkManager"]
        RCV["BootReceiver\ninject WorkScheduler"]
    end
    subgraph System["Android System"]
        CB["NetworkCallback / BroadcastReceiver"]
    end
    UI -->|observe| VM
    VM -->|inject| OBS_I
    OBS_I -->|implement| OBS_IMPL
    SCH_I -->|implement| SCH_IMPL
    RCV -->|inject| SCH_I
    CB -->|system events| OBS_IMPL
    CB -->|system events| RCV
</div>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Nguyên tắc kiến trúc:</strong><br/>1. Broadcast Receiver chỉ là <strong>entry point</strong> — nhận sự kiện và ngay lập tức delegate xuống domain/data layer. Không đặt business logic trong Receiver.<br/>2. Domain layer <strong>không biết đến Broadcast</strong> — interface <code>ConnectivityObserver</code> hoàn toàn độc lập với implementation.<br/>3. ViewModel <strong>không import bất kỳ Android broadcast API</strong> — chỉ làm việc với Flow và interface, giúp test dễ dàng.</div></div>

<h2>13. Nên học tiếp gì?</h2>
<ul>
  <li><strong>WorkManager</strong> — quản lý background work phức tạp, guaranteed execution</li>
  <li><strong>Intent và Intent Filter</strong> — cơ chế routing của Broadcast</li>
  <li><strong>Foreground Service</strong> — chạy nền khi user cần biết (music, location)</li>
  <li><strong>ConnectivityManager.NetworkCallback</strong> — API hiện đại theo dõi mạng</li>
</ul>

<h2>References</h2>
<ul>
  <li><a href="https://developer.android.com/guide/components/broadcasts" target="_blank">Android Developers — Broadcast overview</a></li>
  <li><a href="https://developer.android.com/guide/components/broadcast-exceptions" target="_blank">Android Developers — Implicit Broadcast Exceptions (Android 8+)</a></li>
  <li><a href="https://developer.android.com/reference/android/content/BroadcastReceiver" target="_blank">Android Developers — BroadcastReceiver API</a></li>
  <li><a href="https://developer.android.com/reference/androidx/localbroadcastmanager/content/LocalBroadcastManager" target="_blank">AndroidX LocalBroadcastManager (deprecated)</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/workmanager" target="_blank">Android Developers — WorkManager</a></li>
  <li><a href="https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-shared-flow/" target="_blank">Kotlin — SharedFlow</a></li>
  <li><a href="https://developer.android.com/training/dependency-injection/hilt-android" target="_blank">Hilt — Inject into Android classes</a></li>
</ul>
    `
  },

  'content-provider': {
    title: '4.2.5 Content Provider',
    summary: 'Content Provider là cổng giao tiếp dữ liệu có kiểm soát giữa các ứng dụng. Học cách đọc MediaStore, Contacts bằng Coroutine + Flow, tự tạo Custom Provider an toàn với IPC Binder, và tránh các lỗi ANR, Memory Leak thường gặp.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '25 phút',
    depth: 'deep-dive',
    tags: ['android', 'content-provider', 'ipc', 'mediastore', 'contacts', 'coroutine', 'flow', 'hilt'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['activity-lifecycle', 'android-service'],
    related: ['android-broadcast-receiver', 'android-intent'],
    learningOutcomes: [
      'Hiểu rõ bản chất IPC Binder và vai trò của Content Provider trong sandbox Android.',
      'Truy vấn MediaStore và Contacts Provider bằng Coroutines + Flow đúng cách.',
      'Tự tạo Custom Content Provider với permission kiểm soát access.',
      'Sử dụng ContentObserver + callbackFlow để lắng nghe thay đổi thời gian thực.',
      'Phòng tránh ANR do query trên Main Thread và Memory Leak do quên đóng Cursor.',
      'Biết khi nào nên dùng và không nên dùng Content Provider.'
    ],
    knowledgeGap: 'Nhiều developer viết code query ContentResolver trên Main Thread gây ANR, quên đóng Cursor gây resource leak, hoặc lạm dụng Content Provider cho data nội bộ trong khi Room là giải pháp đúng đắn hơn.',
    updatedAt: '2026-07-30',
    readTime: '25 phút',
    content: `
<h2>1. Nó là gì và vì sao nó tồn tại?</h2>
<p><strong>Content Provider</strong> là một trong 4 Application Component cốt lõi của Android (cùng Activity, Service, Broadcast Receiver). Nó đóng vai trò <strong>cổng giao tiếp dữ liệu có kiểm soát</strong> giữa các ứng dụng và hệ thống.</p>

<h3>Vấn đề nó giải quyết</h3>
<p>Android áp dụng mô hình <strong>sandbox bảo mật nghiêm ngặt</strong>: mỗi app chạy trong một Linux process riêng với User ID riêng. Điều này có nghĩa là:</p>
<ul>
  <li>App A <strong>không thể đọc trực tiếp</strong> file <code>.db</code> hay <code>SharedPreferences</code> của App B</li>
  <li>App của bạn <strong>không thể trực tiếp</strong> truy cập danh bạ, ảnh, lịch của hệ thống</li>
</ul>
<p>Nếu không có cơ chế chuẩn hóa, việc chia sẻ dữ liệu yêu cầu các hack như: ghi file ra <code>external storage</code>, mở socket server nội bộ, hoặc hardcode path database — tất cả đều nguy hiểm và không nhất quán.</p>
<p>Content Provider giải quyết điều này bằng mô hình <strong>client-server chuẩn hóa</strong>:</p>
<ul>
  <li>App sở hữu dữ liệu → triển khai <strong>ContentProvider</strong> (server), kiểm soát ai được đọc/ghi gì</li>
  <li>App cần dữ liệu → dùng <strong>ContentResolver</strong> (client), gửi request theo URI chuẩn</li>
</ul>

<h3>Khi nào nên dùng Content Provider?</h3>
<table>
  <thead><tr><th>Use case</th><th>Nên dùng?</th></tr></thead>
  <tbody>
    <tr><td>Đọc danh bạ/ảnh/lịch từ hệ thống</td><td>✅ Bắt buộc</td></tr>
    <tr><td>Chia sẻ data giữa 2 app cùng công ty</td><td>✅ Phù hợp</td></tr>
    <tr><td>Cung cấp Search Suggestions cho hệ thống</td><td>✅ Phù hợp</td></tr>
    <tr><td>Lưu data nội bộ trong một app</td><td>❌ Dùng Room/DataStore</td></tr>
    <tr><td>Truyền data nhỏ giữa các Activity</td><td>❌ Dùng Intent/Bundle</td></tr>
  </tbody>
</table>

<h2>2. Các khái niệm cốt lõi</h2>
<h3>Content URI — "địa chỉ" của dữ liệu</h3>
<pre><code class="language-text">content://com.android.contacts/contacts/42
  [scheme] [  authority/package  ]  [path] [id]</code></pre>
<ul>
  <li><strong>scheme</strong>: Luôn là <code>content://</code></li>
  <li><strong>authority</strong>: Package name hoặc tên định danh duy nhất của Provider</li>
  <li><strong>path</strong>: Tên bảng hoặc loại dữ liệu (ví dụ: <code>contacts</code>, <code>images</code>)</li>
  <li><strong>id</strong> (tuỳ chọn): ID của một bản ghi cụ thể</li>
</ul>

<h3>ContentResolver — client proxy của hệ thống</h3>
<p><code>ContentResolver</code> là proxy của hệ thống Android. Khi bạn gọi <code>contentResolver.query()</code>, hệ thống tự tìm đúng ContentProvider từ URI và route request đến đó. Bạn <strong>không bao giờ</strong> instantiate ContentProvider trực tiếp.</p>

<h3>Cursor — kết quả truy vấn</h3>
<p>Cursor là con trỏ duyệt qua tập kết quả trả về, giống <code>ResultSet</code> trong JDBC. Cursor giữ tài nguyên hệ thống và <strong>phải được đóng</strong> sau khi dùng xong.</p>

<h2>3. Cơ chế hoạt động bên trong (IPC Binder)</h2>
<p>Đây là phần nhiều developer bỏ qua nhưng rất quan trọng để hiểu tại sao query Content Provider có thể chậm và tại sao phải dùng background thread.</p>
<pre><code class="language-text">App Client              Android System              App Server
----------              --------------              ----------
contentResolver.query()
      ↓
Gửi Binder IPC ─────► ActivityManagerService ────► ContentProvider.query()
                              │                             │
                      Tìm Provider từ URI             Xử lý query
                      Khởi động App Server            trả Cursor
                      nếu chưa chạy                       │
                              ◄──────────────────── Cursor data
      ◄────────────────────────
Cursor (shared memory window)</code></pre>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Tại sao phải dùng background thread:</strong> IPC Binder có overhead đáng kể — đặc biệt khi App Server chưa chạy, Android phải fork process mới. <code>query()</code> <strong>block thread hiện tại</strong> cho đến khi nhận được response. Gọi trên Main Thread → StrictMode exception hoặc ANR.</div></div>

<h2>4. Đọc dữ liệu từ System Provider (Client Side)</h2>
<h3>Ví dụ thực chiến: Đọc danh sách ảnh từ MediaStore</h3>
<p><strong>Bước 1: Khai báo permission trong AndroidManifest.xml</strong></p>
<pre><code class="language-xml" data-lang="xml">&lt;!-- Android ≤ 12 --&gt;
&lt;uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" /&gt;

&lt;!-- Android 13+ (API 33+) — granular media permissions --&gt;
&lt;uses-permission android:name="android.permission.READ_MEDIA_IMAGES" /&gt;</code></pre>

<p><strong>Bước 2: Viết Repository tầng Data</strong></p>
<pre><code class="language-kotlin" data-lang="kotlin">// data/media/MediaRepository.kt
class MediaRepository @Inject constructor(
    @ApplicationContext private val context: Context
) {
    suspend fun fetchImages(): List&lt;MediaImage&gt; = withContext(Dispatchers.IO) {
        val images = mutableListOf&lt;MediaImage&gt;()
        val projection = arrayOf(
            MediaStore.Images.Media._ID,
            MediaStore.Images.Media.DISPLAY_NAME,
            MediaStore.Images.Media.DATE_TAKEN,
            MediaStore.Images.Media.SIZE
        )

        context.contentResolver.query(
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
            projection,
            null,  // selection (WHERE clause)
            null,  // selectionArgs
            "\${MediaStore.Images.Media.DATE_TAKEN} DESC"
        )?.use { cursor -&gt;  // .use {} tự đóng Cursor kể cả khi exception
            val idCol        = cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID)
            val nameCol      = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DISPLAY_NAME)
            val dateTakenCol = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATE_TAKEN)
            val sizeCol      = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.SIZE)

            while (cursor.moveToNext()) {
                val id = cursor.getLong(idCol)
                val contentUri = ContentUris.withAppendedId(
                    MediaStore.Images.Media.EXTERNAL_CONTENT_URI, id
                )
                images += MediaImage(
                    id        = id,
                    uri       = contentUri,
                    name      = cursor.getString(nameCol),
                    dateTaken = cursor.getLong(dateTakenCol),
                    size      = cursor.getLong(sizeCol)
                )
            }
        }
        images
    }
}

data class MediaImage(val id: Long, val uri: Uri, val name: String, val dateTaken: Long, val size: Long)</code></pre>

<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Tránh SQL Injection:</strong> Khi query có filter, <strong>không bao giờ</strong> nối thẳng string vào selection.<br>
❌ <code>query(uri, proj, "display_name = \\'$input\\'", null, null)</code><br>
✅ <code>query(uri, proj, "display_name = ?", arrayOf(input), null)</code></div></div>

<h2>5. Lắng nghe thay đổi thời gian thực (ContentObserver + Flow)</h2>
<p>Người dùng có thể chụp ảnh mới trong khi app đang chạy. <strong>ContentObserver</strong> là cơ chế của Android để theo dõi thay đổi trên một URI. Kết hợp với <code>callbackFlow</code> để tạo reactive stream tự động cleanup:</p>
<pre><code class="language-kotlin" data-lang="kotlin">// data/media/MediaRepository.kt — thêm hàm observe
fun observeImages(): Flow&lt;List&lt;MediaImage&gt;&gt; = callbackFlow {
    trySend(fetchImages()) // Emit lần đầu ngay khi collect

    val observer = object : ContentObserver(Handler(Looper.getMainLooper())) {
        override fun onChange(selfChange: Boolean) {
            trySend(runBlocking(Dispatchers.IO) { fetchImages() })
        }
    }

    context.contentResolver.registerContentObserver(
        MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
        true, // notifyForDescendants — lắng nghe cả subdirectory
        observer
    )

    awaitClose { // Flow bị cancel → unregister để tránh leak
        context.contentResolver.unregisterContentObserver(observer)
    }
}</code></pre>

<p><strong>Sử dụng trong ViewModel:</strong></p>
<pre><code class="language-kotlin" data-lang="kotlin">@HiltViewModel
class GalleryViewModel @Inject constructor(
    private val mediaRepository: MediaRepository
) : ViewModel() {

    val images: StateFlow&lt;List&lt;MediaImage&gt;&gt; = mediaRepository
        .observeImages()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = emptyList()
        )
}</code></pre>

<h4>Luồng hoạt động</h4>
<div class="mermaid">
sequenceDiagram
    participant User as Người dùng
    participant MS as MediaStore (OS)
    participant OBS as ContentObserver
    participant FLOW as callbackFlow
    participant VM as ViewModel
    participant UI as GalleryScreen

    User->>MS: Chụp ảnh mới
    MS->>OBS: onChange() triggered
    OBS->>FLOW: trySend(fetchImages())
    FLOW->>VM: emit List(MediaImage)
    VM->>UI: StateFlow update
    UI->>UI: LazyGrid re-render ảnh mới
</div>

<h2>6. Đọc danh bạ từ ContactsProvider</h2>
<pre><code class="language-kotlin" data-lang="kotlin">// data/contacts/ContactsRepository.kt
suspend fun searchContacts(query: String): List&lt;Contact&gt; = withContext(Dispatchers.IO) {
    val contacts = mutableListOf&lt;Contact&gt;()
    val projection = arrayOf(
        ContactsContract.Contacts._ID,
        ContactsContract.Contacts.DISPLAY_NAME_PRIMARY,
        ContactsContract.Contacts.HAS_PHONE_NUMBER
    )

    context.contentResolver.query(
        ContactsContract.Contacts.CONTENT_URI,
        projection,
        "\${ContactsContract.Contacts.DISPLAY_NAME_PRIMARY} LIKE ?",
        arrayOf("%$query%"),
        "\${ContactsContract.Contacts.DISPLAY_NAME_PRIMARY} ASC"
    )?.use { cursor -&gt;
        val idCol       = cursor.getColumnIndexOrThrow(ContactsContract.Contacts._ID)
        val nameCol     = cursor.getColumnIndexOrThrow(ContactsContract.Contacts.DISPLAY_NAME_PRIMARY)
        val hasPhoneCol = cursor.getColumnIndexOrThrow(ContactsContract.Contacts.HAS_PHONE_NUMBER)

        while (cursor.moveToNext()) {
            if (cursor.getInt(hasPhoneCol) &gt; 0) {
                contacts += Contact(id = cursor.getLong(idCol), name = cursor.getString(nameCol))
            }
        }
    }
    contacts
}</code></pre>

<h2>7. Tự tạo Custom Content Provider (Server Side)</h2>
<p>Kịch bản: Công ty bạn có <strong>App A</strong> (app chính) và <strong>App B</strong> (app companion). App B cần đọc profile user từ database của App A.</p>

<h3>Bước 1: Tạo ContentProvider trong App A</h3>
<pre><code class="language-kotlin" data-lang="kotlin">// provider/UserProvider.kt (App A)
class UserProvider : ContentProvider() {

    companion object {
        const val AUTHORITY = "com.company.appa.provider"
        val CONTENT_URI: Uri = Uri.parse("content://$AUTHORITY/users")

        private val uriMatcher = UriMatcher(UriMatcher.NO_MATCH).apply {
            addURI(AUTHORITY, "users",   1) // content://authority/users
            addURI(AUTHORITY, "users/#", 2) // content://authority/users/42
        }
    }

    override fun onCreate(): Boolean = true // Khởi tạo nhẹ nhất có thể

    override fun query(
        uri: Uri, projection: Array&lt;String&gt;?,
        selection: String?, selectionArgs: Array&lt;String&gt;?, sortOrder: String?
    ): Cursor? {
        context?.checkCallingPermission("com.company.permission.READ_USER")
            ?.takeIf { it != PackageManager.PERMISSION_GRANTED }
            ?.let { throw SecurityException("Missing READ_USER permission") }

        val db = UserDatabase.getInstance(context!!).readableDatabase
        return when (uriMatcher.match(uri)) {
            1 -&gt; db.query("users", projection, selection, selectionArgs, null, null, sortOrder)
            2 -&gt; {
                val id = ContentUris.parseId(uri)
                db.query("users", projection, "_id = ?", arrayOf(id.toString()), null, null, null)
            }
            else -&gt; throw IllegalArgumentException("Unknown URI: $uri")
        }
    }

    override fun getType(uri: Uri): String = when (uriMatcher.match(uri)) {
        1 -&gt; "vnd.android.cursor.dir/vnd.com.company.appa.users"
        2 -&gt; "vnd.android.cursor.item/vnd.com.company.appa.users"
        else -&gt; throw IllegalArgumentException("Unknown URI: $uri")
    }

    override fun insert(uri: Uri, values: ContentValues?): Uri? = null
    override fun update(uri: Uri, values: ContentValues?, selection: String?, selectionArgs: Array&lt;String&gt;?): Int = 0
    override fun delete(uri: Uri, selection: String?, selectionArgs: Array&lt;String&gt;?): Int = 0
}</code></pre>

<h3>Bước 2: Khai báo trong AndroidManifest.xml của App A</h3>
<pre><code class="language-xml" data-lang="xml">&lt;permission
    android:name="com.company.permission.READ_USER"
    android:protectionLevel="signature" /&gt;

&lt;provider
    android:name=".provider.UserProvider"
    android:authorities="com.company.appa.provider"
    android:exported="true"
    android:readPermission="com.company.permission.READ_USER" /&gt;</code></pre>

<div class="callout callout-info"><span class="callout-icon">ℹ️</span><div class="callout-body"><code>android:protectionLevel="signature"</code>: Chỉ app được ký cùng keystore với App A mới được cấp permission này <strong>tự động</strong>, không cần user approve. Đây là cách bảo mật chuẩn cho các app trong cùng hệ sinh thái công ty.</div></div>

<h3>Bước 3: App B khai báo và query</h3>
<pre><code class="language-xml" data-lang="xml">&lt;!-- AndroidManifest.xml của App B --&gt;
&lt;uses-permission android:name="com.company.permission.READ_USER" /&gt;</code></pre>
<pre><code class="language-kotlin" data-lang="kotlin">suspend fun fetchUsersFromAppA(): List&lt;User&gt; = withContext(Dispatchers.IO) {
    val users = mutableListOf&lt;User&gt;()
    val uri = Uri.parse("content://com.company.appa.provider/users")
    context.contentResolver.query(uri, null, null, null, null)?.use { cursor -&gt;
        val idCol   = cursor.getColumnIndexOrThrow("id")
        val nameCol = cursor.getColumnIndexOrThrow("name")
        while (cursor.moveToNext()) {
            users += User(id = cursor.getLong(idCol), name = cursor.getString(nameCol))
        }
    }
    users
}</code></pre>

<h2>8. Sai lầm thường gặp</h2>

<h3>1. Query trên Main Thread</h3>
<pre><code class="language-kotlin" data-lang="kotlin">// ❌ StrictMode exception → ANR trong production
fun onClick() {
    val cursor = contentResolver.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, ...)
}

// ✅ Coroutines + withContext(IO)
fun onClick() {
    viewModelScope.launch {
        val images = repository.fetchImages()
    }
}</code></pre>

<h3>2. Quên đóng Cursor</h3>
<pre><code class="language-kotlin" data-lang="kotlin">// ❌ Resource leak — Cursor giữ file descriptor
val cursor = contentResolver.query(...)
val name = cursor?.getString(0) // cursor không được đóng!

// ✅ .use {} tự động close() kể cả khi exception
contentResolver.query(...)?.use { cursor -&gt;
    val name = cursor.getString(0)
} // close() tự động ở đây</code></pre>

<h3>3. Dùng Content Provider cho data nội bộ (Anti-pattern)</h3>
<pre><code class="language-kotlin" data-lang="kotlin">// ❌ Overhead IPC không cần thiết
class InternalNoteProvider : ContentProvider() { ... }

// ✅ Room + Repository
@Dao interface NoteDao {
    @Query("SELECT * FROM notes ORDER BY created_at DESC")
    fun observeAll(): Flow&lt;List&lt;Note&gt;&gt;
}</code></pre>

<h3>4. exported="true" không có permission</h3>
<pre><code class="language-xml" data-lang="xml">&lt;!-- ❌ Bất kỳ app nào cũng đọc được database --&gt;
&lt;provider android:exported="true" /&gt;

&lt;!-- ✅ Luôn kèm permission --&gt;
&lt;provider
    android:exported="true"
    android:readPermission="com.company.permission.READ_USER" /&gt;</code></pre>

<h2>9. So sánh với các giải pháp thay thế</h2>
<table>
  <thead><tr><th>Giải pháp</th><th>Khi nào dùng</th><th>Trade-off</th></tr></thead>
  <tbody>
    <tr><td>Content Provider</td><td>Chia sẻ tabular data giữa apps, system data</td><td>IPC overhead, setup phức tạp, cần permission</td></tr>
    <tr><td>Room + Repository</td><td>Data nội bộ trong app</td><td>Đơn giản, type-safe, không IPC</td></tr>
    <tr><td>FileProvider</td><td>Chia sẻ file (ảnh, PDF) giữa apps</td><td>Chỉ dùng cho file, không phải tabular data</td></tr>
    <tr><td>SharedFlow</td><td>Event/message nội bộ trong app</td><td>In-memory, không persist qua process death</td></tr>
    <tr><td>Messenger / AIDL</td><td>IPC phức tạp, two-way communication</td><td>Boilerplate nhiều, khó maintain</td></tr>
  </tbody>
</table>

<h2>References</h2>
<ul>
  <li><a href="https://developer.android.com/guide/topics/providers/content-provider-basics" target="_blank">Android Developers — Content Provider basics</a></li>
  <li><a href="https://developer.android.com/guide/topics/providers/content-provider-creating" target="_blank">Android Developers — Creating a Content Provider</a></li>
  <li><a href="https://developer.android.com/reference/android/provider/MediaStore" target="_blank">Android Developers — MediaStore</a></li>
  <li><a href="https://developer.android.com/reference/android/provider/ContactsContract" target="_blank">Android Developers — ContactsContract</a></li>
  <li><a href="https://developer.android.com/reference/androidx/core/content/FileProvider" target="_blank">Android Developers — FileProvider</a></li>
</ul>
    `
  },

  'intent-explicit': {
    title: 'Explicit Intents',
    summary: 'Hiểu bản chất Explicit Intent, cách sử dụng trong XML và Jetpack Compose, cũng như mô hình điều hướng chuẩn trong kiến trúc MVVM.',
    status: 'published',
    difficulty: 'beginner',
    estimatedReadingTime: '10 phút',
    depth: 'standard',
    tags: ['android', 'intent', 'explicit-intent'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['android.component.activity.lifecycle'],
    related: ['android.intent.implicit', 'android.intent.pending_intent'],
    learningOutcomes: [
      'Giải thích được bản chất và cơ chế hoạt động của Explicit Intent.',
      'Triển khai được Explicit Intent trong XML/View truyền thống và Jetpack Compose.',
      'Thiết kế được mô hình điều hướng chuẩn MVVM sử dụng Event-driven navigation.'
    ],
    knowledgeGap: 'Nếu không hiểu Explicit Intent, lập trình viên có thể gọi Context sai cách từ Jetpack Compose, vi phạm Clean Architecture bằng cách đưa Context vào ViewModel, hoặc nhầm lẫn giữa Explicit và Implicit Intent gây lỗi bảo mật hoặc crash khi gọi ứng dụng bên ngoài.',
    updatedAt: '2026-07-31',
    readTime: '10 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Trong Android, một ứng dụng không phải là một khối monolithic chạy từ hàm <code>main()</code> duy nhất. Nó là một tập hợp các Component (Activity, Service, BroadcastReceiver).</p>

<p>Làm thế nào để Component A yêu cầu hệ thống khởi chạy Component B một cách chính xác tuyệt đối? Làm sao để truyền ngữ cảnh (Context) từ chỗ này sang chỗ khác một cách an toàn mà không bị hệ thống nhầm lẫn với Component của app khác?</p>

<p><strong>Explicit Intent</strong> sinh ra để giải quyết vấn đề: <strong>"Tôi biết chính xác đích đến là ai, hãy đưa tôi đến đó ngay lập tức."</strong></p>

<h2>Sau khi học xong</h2>

<ul>
  <li>Giải thích được bản chất và cơ chế hoạt động của Explicit Intent.</li>
  <li>Triển khai được Explicit Intent trong XML/View truyền thống và Jetpack Compose.</li>
  <li>Thiết kế được mô hình điều hướng chuẩn MVVM sử dụng Event-driven navigation.</li>
</ul>

<h2>Explicit Intent là gì?</h2>

<p><strong>Explicit Intent (Intent tường minh)</strong> là loại Intent mà bạn chỉ định <strong>chính xác tên class</strong> (component) sẽ xử lý nó.</p>

<ul>
  <li><strong>Đặc điểm:</strong> Không thông qua bộ lọc (Intent Filter) của hệ thống.</li>
  <li><strong>Phạm vi:</strong> Thường được sử dụng để điều hướng <strong>bên trong cùng một ứng dụng</strong> (vì bạn biết rõ tên class của mình).</li>
  <li><strong>Mục đích:</strong> Khởi chạy Activity khác, start một Service, hoặc gửi một Broadcast đến một Receiver cụ thể.</li>
</ul>

<h2>Cách hoạt động</h2>

<div class="mermaid">
sequenceDiagram
    participant A as Component A (Context)
    participant OS as Android OS (AMS)
    participant B as Target Component B
    
    A->>OS: startActivity(intent)
    Note over OS: Bỏ qua Intent Filter vì đã có tên Class cụ thể
    OS->>B: Khởi tạo và cấp phát tài nguyên cho Target
    B-->>A: Màn hình B hiển thị
</div>

<ol>
  <li><strong>Khởi tạo:</strong> Cung cấp <code>Context</code> hiện tại và <code>Class</code> đích.</li>
  <li><strong>Yêu cầu OS:</strong> Gọi hàm (ví dụ <code>startActivity()</code>). OS (cụ thể là ActivityManagerService - AMS) nhận lệnh.</li>
  <li><strong>Thực thi ngay:</strong> Do đã biết đích danh class, AMS không cần dò tìm trong danh sách các app cài đặt, nó trực tiếp khởi tạo (hoặc đem lên foreground) Component B.</li>
</ol>

<h2>Khi nào nên dùng?</h2>

<ul>
  <li><strong>NÊN:</strong> Khi bạn muốn mở một màn hình khác trong chính app của mình (ví dụ: từ <code>HomeActivity</code> sang <code>ProfileActivity</code>).</li>
  <li><strong>NÊN:</strong> Khi bạn muốn khởi chạy một Background Service của riêng app (ví dụ: <code>DownloadService</code>).</li>
  <li><strong>KHÔNG NÊN:</strong> Khi bạn muốn thực hiện một hành động mở (ví dụ: mở camera, chia sẻ file). Lúc này hãy dùng Implicit Intent.</li>
</ul>

<h2>Ví dụ thực tế</h2>

<h3>1. Cách dùng cơ bản (Môi trường View/XML)</h3>

<p>Nếu bạn code theo phong cách truyền thống (XML + Activity/Fragment):</p>

<pre data-lang="kotlin"><code>// Khởi tạo Explicit Intent
// Tham số 1: Context (thường là 'this' trong Activity, hoặc 'requireContext()' trong Fragment)
// Tham số 2: Tên Class của Component đích
val intent = Intent(this, ProfileActivity::class.java)

// (Tuỳ chọn) Gửi kèm dữ liệu
intent.putExtra("USER_ID", 12345)

// Yêu cầu OS khởi chạy
startActivity(intent)</code></pre>

<h3>2. Sử dụng trong Jetpack Compose</h3>

<p>Jetpack Compose tập trung vào UI, do đó việc gọi Intent cần lấy <code>Context</code> từ CompositionLocal.</p>

<pre data-lang="kotlin"><code>@Composable
fun ProfileButton(userId: Int) {
    // Lấy Context an toàn trong Compose
    val context = LocalContext.current

    Button(onClick = {
        // Tạo và chạy Explicit Intent như bình thường
        val intent = Intent(context, ProfileActivity::class.java).apply {
            putExtra("USER_ID", userId)
        }
        context.startActivity(intent)
    }) {
        Text("Mở Profile")
    }
}</code></pre>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Nhắc nhở:</strong> Trong Compose thuần, người ta thường dùng <strong>Navigation Compose</strong> để chuyển màn hình thay vì dùng Intent mở Activity mới. Explicit Intent trong Compose thường dùng khi bạn cần <strong>rẽ nhánh</strong> sang một luồng legacy (Activity cũ chưa chuyển sang Compose) hoặc gọi một Service.</div></div>

<h3>3. Tư duy hệ thống: Gọi Intent trong MVVM</h3>

<p><strong>Câu hỏi phổ biến:</strong> <em>Ai là người tạo và gọi Intent? ViewModel hay View (Activity/Fragment)?</em></p>

<p><strong>Best Practice:</strong> <strong>ViewModel KHÔNG bao giờ chứa Context (trừ ApplicationContext nhưng cũng nên hạn chế). Do đó, ViewModel KHÔNG bao giờ tạo hay gọi Intent trực tiếp.</strong></p>

<p><strong>Luồng chuẩn:</strong></p>
<ol>
  <li>UI (Button) gửi sự kiện click cho ViewModel.</li>
  <li>ViewModel xử lý logic (nếu có), sau đó đẩy một <code>State</code> hoặc <code>Event</code> (thường dùng <code>SharedFlow</code> hoặc <code>Channel</code>) báo cho UI biết "Hãy chuyển sang màn hình B".</li>
  <li>View (Activity/Fragment/Compose) observe sự kiện này, lấy Context của chính nó và gọi <code>startActivity(Intent(...))</code>.</li>
</ol>

<pre data-lang="kotlin"><code>// 1. ViewModel: Chỉ phát ra sự kiện, KHÔNG biết về Intent
class HomeViewModel : ViewModel() {
    private val _navigationEvent = Channel&lt;NavigationEvent&gt;()
    val navigationEvent = _navigationEvent.receiveAsFlow()

    fun onProfileClicked() {
        viewModelScope.launch {
            _navigationEvent.send(NavigationEvent.NavigateToProfile(userId = 123))
        }
    }
}

// 2. UI (Fragment): Đọc sự kiện và thực thi Intent
viewLifecycleOwner.lifecycleScope.launch {
    viewModel.navigationEvent.collect { event -&gt;
        when (event) {
            is NavigationEvent.NavigateToProfile -&gt; {
                val intent = Intent(requireContext(), ProfileActivity::class.java)
                intent.putExtra("ID", event.userId)
                startActivity(intent)
            }
        }
    }
}</code></pre>

<h2>Sai lầm thường gặp</h2>

<h3>1. Quên khai báo Target Activity trong <code>AndroidManifest.xml</code></h3>
<p>Đây là lỗi phổ biến nhất của người mới học. Nếu gọi Explicit Intent đến một Activity chưa khai báo, ứng dụng sẽ crash ngay lập tức với lỗi <code>ActivityNotFoundException</code>.</p>
<pre data-lang="xml"><code>&lt;!-- ❌ THIẾU KHAI BÁO NÀY SẼ GÂY CRASH --&gt;
&lt;activity android:name=".ProfileActivity" /&gt;</code></pre>

<h3>2. Truyền Activity Context vào ViewModel để gọi <code>startActivity</code></h3>
<p>Để dễ dàng chuyển màn hình, một số developer truyền <code>Activity</code> hoặc <code>Context</code> vào ViewModel. Điều này vi phạm nghiêm trọng kiến trúc MVVM và gây rò rỉ bộ nhớ (Memory Leak) vì ViewModel sống lâu hơn Activity.</p>
<ul>
  <li><strong>Giải pháp:</strong> Sử dụng Event-driven navigation như hướng dẫn ở phần MVVM.</li>
</ul>

<h3>3. Nhầm lẫn giữa Explicit và Implicit Intent khi mở ứng dụng ngoài</h3>
<p>Khi muốn mở một trang web hoặc ứng dụng camera, việc cố gắng chỉ định chính xác class name của Chrome hay Camera mặc định của máy sẽ gây lỗi nếu thiết bị của user không cài app đó hoặc dùng app hãng khác (như Samsung Camera thay vì Google Camera).</p>
<ul>
  <li><strong>Giải pháp:</strong> Sử dụng Implicit Intent với Action và Data để OS tự phân giải.</li>
</ul>

<h2>Lịch sử phát triển</h2>

<ul>
  <li><strong>Android 1.0 (API 1):</strong> Cơ chế Explicit Intent được giới thiệu ngay từ phiên bản đầu tiên của Android, định hình kiến trúc component rời rạc (decoupled components) thông qua Binder IPC.</li>
  <li><strong>Android 8.0 (API 26):</strong> Giới hạn nghiêm ngặt Implicit Broadcast để tiết kiệm pin. Hệ thống khuyến khích chuyển sang dùng Explicit Intent (chỉ định rõ class) đối với các Broadcast Receiver đăng ký trong Manifest để đảm bảo hiệu năng.</li>
  <li><strong>Android 14 (API 34):</strong> Thắt chặt bảo mật. Các ứng dụng khi gửi Explicit Intent đến ứng dụng khác phải đảm bảo ứng dụng đích xuất (export) component đó một cách an toàn, hạn chế các cuộc tấn công tấn công giả mạo component (Component Hijacking).</li>
</ul>

<h2>Kết nối hệ thống</h2>

<ul>
  <li><strong>Prerequisites</strong>: <code>Activity Lifecycle</code> — hiểu vòng đời Activity để gọi Intent đúng thời điểm.</li>
  <li><strong>Related Topics</strong>: <code>Implicit Intents</code> — giải pháp thay thế khi không biết component đích, <code>Pending Intent</code> — ủy quyền thực thi Intent.</li>
  <li><strong>Downstream Topics</strong>: <code>Push data and send event via Intent</code> — cách truyền nhận dữ liệu nâng cao qua Intent.</li>
</ul>
    `
  },  'intent-implicit': {
    title: 'Implicit Intents',
    summary: 'Hiểu cách Implicit Intent hoạt động, cơ chế phân giải (Resolution) của hệ điều hành Android và cách ứng dụng vào các bài toán thực tế như mở web, share text hay gọi điện thoại.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '15 phút',
    depth: 'deep-dive',
    tags: ['android', 'practical'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: [],
    related: [],
    learningOutcomes: [],
    knowledgeGap: '',
    updatedAt: '2026-07-30',
    readTime: '15 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Giả sử ứng dụng của bạn cần chụp một bức ảnh để làm avatar người dùng. Bạn có hai lựa chọn:<br>1. Tự viết toàn bộ giao diện Camera, tự giao tiếp với phần cứng Camera, tự xử lý lưu file. (Quá tốn thời gian, dễ sinh bug).<br>2. "Nhờ" một ứng dụng Camera đã có sẵn trong máy chụp ảnh giùm và trả kết quả về.</p>

<p>Nhưng làm sao bạn biết thiết bị của người dùng đang cài app Camera nào? (Họ dùng app mặc định của Samsung, Xiaomi, hay tải B612 từ Store?). Bạn không thể biết <strong>tên class</strong> của app đích để dùng Explicit Intent.</p>

<strong>Implicit Intent (Intent không tường minh)</strong> ra đời để giải quyết vấn đề: <strong>"Tôi cần một ai đó thực hiện việc này (chụp ảnh), tôi không quan tâm ai làm, miễn là làm được."</strong>

<h2>Implicit Intent là gì?</h2>

<strong>Implicit Intent</strong> là loại Intent mà bạn không truyền tên Component (Class) cụ thể, thay vào đó, bạn khai báo một <strong>Hành động (Action)</strong> và loại <strong>Dữ liệu (Data)</strong> mà hành động đó cần thực thi.

<p>Hệ điều hành Android (cụ thể là <code>PackageManager</code> và <code>ActivityManagerService</code>) sẽ đứng ra làm trung gian: dò tìm toàn bộ các app trong máy xem app nào có khả năng xử lý hành động này, và đưa ra danh sách cho người dùng chọn (hoặc mở ngay nếu chỉ có 1 app xử lý được).</p>

<h2>Cơ chế OS Resolve Implicit Intent</h2>

<p>Khi bạn gọi <code>startActivity(implicitIntent)</code>, quá trình sau sẽ diễn ra dưới hệ thống:</p>

<div class="mermaid">sequenceDiagram
    participant App as Ứng dụng của bạn
    participant OS as Android OS (AMS &amp; PackageManager)
    participant Target as Các App mục tiêu (Camera, Browser...)
    
    App->>OS: startActivity(Action: VIEW, Data: "https://...")
    Note over OS: Quá trình Intent Resolution
    OS->>OS: Quét toàn bộ AndroidManifest.xml của các app đã cài
    OS->>OS: So sánh Intent Filter (Action, Category, Data)
    alt Có 1 App phù hợp
        OS->>Target: Mở App đó ngay lập tức
    else Có nhiều App phù hợp
        OS->>App: Hiển thị Dialog (Chooser) để User chọn
        App-->>Target: Mở App do User chọn
    else Không có App nào
        OS-->>App: Ném ra ActivityNotFoundException!
    end</div>

<p>Đây gọi là quá trình <strong>Intent Resolution</strong> (Phân giải Intent). Hệ thống so sánh 3 thành phần chính:<br>1. <strong>Action:</strong> (VD: <code>ACTION_VIEW</code>, <code>ACTION_SEND</code>, <code>ACTION_DIAL</code>).<br>2. <strong>Data (URI & MIME Type):</strong> (VD: URL web <code>https://...</code>, số điện thoại <code>tel:123</code>, kiểu file <code>image/jpeg</code>).<br>3. <strong>Category:</strong> (Thường mặc định là <code>CATEGORY_DEFAULT</code>).</p>

<h2>Hướng dẫn triển khai thực tế</h2>

<h2>1. Mở một trang Web (Browser)</h2>

<strong>Vấn đề:</strong> Ứng dụng muốn mở link điều khoản sử dụng.

<pre data-lang="kotlin"><code>fun openWebPage(url: String, context: Context) {
    val webpage: Uri = Uri.parse(url)
    val intent = Intent(Intent.ACTION_VIEW, webpage)
    
    // RẤT QUAN TRỌNG: Luôn kiểm tra xem có app nào xử lý được không trước khi start
    // Từ Android 11 (API 30), cần khai báo &lt;queries&gt; trong Manifest để check resolveActivity
    if (intent.resolveActivity(context.packageManager) != null) {
        context.startActivity(intent)
    } else {
        // Hiển thị Toast thông báo người dùng cài trình duyệt
    }
}</code></pre>

<h2>2. Chia sẻ Text (Share Action)</h2>

<strong>Vấn đề:</strong> Muốn người dùng chia sẻ một đoạn văn bản (mã giới thiệu) qua Zalo, Messenger, Email...

<pre data-lang="kotlin"><code>fun shareText(textToShare: String, context: Context) {
    val sendIntent = Intent().apply {
        action = Intent.ACTION_SEND
        putExtra(Intent.EXTRA_TEXT, textToShare)
        type = "text/plain" // Rất quan trọng để OS biết loại dữ liệu
    }

    // Luôn luôn tạo một "Chooser" để hiển thị danh sách app đẹp mắt,
    // thay vì tin tưởng vào app mặc định của người dùng.
    val shareIntent = Intent.createChooser(sendIntent, "Chia sẻ mã qua...")
    context.startActivity(shareIntent)
}</code></pre>

<h2>3. Gửi Email</h2>

<pre data-lang="kotlin"><code>fun composeEmail(addresses: Array&lt;String&gt;, subject: String, context: Context) {
    val intent = Intent(Intent.ACTION_SENDTO).apply {
        data = Uri.parse("mailto:") // Chỉ các app email mới xử lý được
        putExtra(Intent.EXTRA_EMAIL, addresses)
        putExtra(Intent.EXTRA_SUBJECT, subject)
    }
    if (intent.resolveActivity(context.packageManager) != null) {
        context.startActivity(intent)
    }
}</code></pre>

<h2>Các lưu ý / Lỗi thường gặp (Pitfalls)</h2>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Crash <code>ActivityNotFoundException</code></strong><br>Lỗi phổ biến nhất khi dùng Implicit Intent là app bị văng khi không có ứng dụng nào trên thiết bị xử lý được Intent đó (Ví dụ: gọi <code>ACTION_DIAL</code> trên máy tính bảng không có tính năng nghe gọi). <strong>Luôn bọc trong try-catch hoặc dùng <code>resolveActivity</code> trước khi gọi <code>startActivity</code>.</strong></div></div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Package Visibility (Android 11+)</strong><br>Từ Android 11 (API level 30), Google siết chặt quyền riêng tư. Hàm <code>resolveActivity()</code> sẽ luôn trả về <code>null</code> trừ khi bạn khai báo những package hoặc intent mà bạn muốn "nhìn thấy" trong file <code>AndroidManifest.xml</code> qua thẻ <code><queries></code>.</div></div>
<strong>Ví dụ sửa lỗi Package Visibility:</strong>
Trong <code>AndroidManifest.xml</code>:
<pre data-lang="xml"><code>&lt;queries&gt;
    &lt;!-- Cho phép dò tìm các app có khả năng mở URL web --&gt;
    &lt;intent&gt;
        &lt;action android:name="android.intent.action.VIEW" /&gt;
        &lt;data android:scheme="https" /&gt;
    &lt;/intent&gt;
&lt;/queries&gt;</code></pre>

<h2>Tổng kết</h2>

<p>Implicit Intent giúp hệ sinh thái Android trở nên linh hoạt và liên kết mạnh mẽ giữa các ứng dụng với nhau. Khi sử dụng, hãy chú ý cung cấp đúng Action và Data/MIME Type, đồng thời luôn có phương án fallback (xử lý lỗi) trong trường hợp thiết bị người dùng không có ứng dụng phù hợp.</p>
    `
  },
  'intent-filters': {
    title: 'Intent Filters',
    summary: 'Giải thích cấu trúc intent-filter và cơ chế khớp (matching) Action, Category, Data với đầy đủ luật ưu tiên của hệ điều hành; cách cấu hình Share Target, Deep Link, App Links (assetlinks.json), tích hợp MVVM và test bằng adb.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '25 phút',
    depth: 'deep-dive',
    tags: ['android', 'practical'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: ['intent-implicit'],
    related: ['intent-explicit', 'intent-handle', 'intent-push-data'],
    learningOutcomes: [
      'Mô tả được cấu trúc của <intent-filter> gồm action, category, data.',
      'Giải thích được 3 bài test khớp Action, Category, Data và luật riêng của từng loại.',
      'Xác định được cách hệ điều hành chọn app khi nhiều filter trùng khớp (độ ưu tiên, resolution).',
      'Cấu hình được Share Target, Deep Link và App Links (assetlinks.json) cho Activity.',
      'Tích hợp được luồng dữ liệu Intent vào ViewModel theo mô hình MVVM (onNewIntent).',
      'Test được intent filter bằng adb và tránh được các lỗi thường gặp.'
    ],
    knowledgeGap: 'Khai báo intent-filter sai khiến app không bao giờ xuất hiện trong hộp thoại chia sẻ hay mở link, bị ActivityNotFoundException, hoặc hiện sai app gây rác trải nghiệm người dùng; không hiểu luật khớp sẽ tạo filter quá rộng hoặc quá hẹp và không biết cách debug.',
    updatedAt: '2026-07-31',
    readTime: '25 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Ở bài trước (<a href="#" onclick="openTopic('intent-implicit'); return false;">Implicit Intents</a>), hệ điều hành có thể dò tìm app nào "đủ khả năng" xử lý một Intent ngầm (mở link, share text, quét mã...). Câu hỏi đặt ra là: <strong>Làm sao OS biết được app của bạn có khả năng làm những việc đó?</strong></p>

<p>Giả sử bạn làm app thương mại điện tử, user bấm vào link <code>https://shop.com/promo/2026</code> từ tin nhắn Zalo. Ai sẽ mở link này?</p>

<ul>
  <li>Nếu app của bạn <strong>không khai báo gì</strong> → trình duyệt mặc định mở, app bạn biến mất.</li>
  <li>Nếu app của bạn <strong>khai báo Intent Filter đúng</strong> → OS liệt kê cả app bạn lẫn trình duyệt để user chọn.</li>
</ul>

<p><strong>Intent Filter (Bộ lọc Intent)</strong> chính là "tấm biển quảng cáo" bạn treo trước mỗi Component để nói với OS: <em>"Tôi có thể xử lý dạng việc này!"</em> Hiểu sâu cơ chế khớp (matching) của nó quyết định app của bạn có <strong>được liệt kê đúng chỗ</strong> hay <strong>hiện ra lung tung gây khó chịu</strong> cho user.</p>

<h2>Intent Filter là gì?</h2>

<p><strong>Intent Filter</strong> là thẻ <code>&lt;intent-filter&gt;</code> khai báo <strong>bên trong</strong> các Component (<code>&lt;activity&gt;</code>, <code>&lt;service&gt;</code>, <code>&lt;receiver&gt;</code>) trong file <code>AndroidManifest.xml</code>. Nó quy định tập hợp các <strong>Implicit Intent</strong> mà Component đó chấp nhận.</p>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Component <strong>không</strong> khai báo Intent Filter (chỉ có tên class) thì <strong>chỉ có thể</strong> được gọi bằng Explicit Intent (gọi đích danh class).</div></div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Intent Filter KHÔNG phải tường lửa bảo mật.</strong> Nó chỉ giới hạn Implicit Intent. App khác vẫn có thể dùng Explicit Intent để khởi chạy Component <strong>exported</strong> của bạn nếu biết tên package + class.</div></div>

<h2>Khi nào nên / không nên dùng</h2>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tình huống</th>
      <th style="padding:8px 12px;text-align:left;">Dùng Intent Filter?</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">App nhận dữ liệu từ app khác/hệ thống (Share, View file/link, Scan QR, Dial...)</td><td style="padding:8px 12px;">✅ Nên</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">App đăng ký thành handler mặc định cho một loại link (Deep Link / App Links)</td><td style="padding:8px 12px;">✅ Nên</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Điều hướng nội bộ trong app (màn hình A → màn hình B)</td><td style="padding:8px 12px;">❌ Không — dùng Explicit Intent hoặc Navigation Component</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Nhận dữ liệu nhạy cảm / riêng tư</td><td style="padding:8px 12px;">❌ Không — dùng Explicit Intent + Signature Permission</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">"Tôi muốn app hiện ra mọi lúc"</td><td style="padding:8px 12px;">❌ Không — filter càng rộng càng gây rác UX và rủi ro bảo mật</td></tr>
  </tbody>
</table>

<h2>Cấu trúc Intent Filter</h2>

<p>Một <code>&lt;intent-filter&gt;</code> chứa 3 nhóm thành phần + thuộc tính priority:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Thành phần</th>
      <th style="padding:8px 12px;text-align:left;">Mô tả</th>
      <th style="padding:8px 12px;text-align:left;">Ví dụ</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>&lt;action&gt;</code></td><td style="padding:8px 12px;">Hành động Component thực hiện được</td><td style="padding:8px 12px;"><code>android.intent.action.VIEW</code>, <code>android.intent.action.SEND</code></td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>&lt;category&gt;</code></td><td style="padding:8px 12px;">Ngữ cảnh bổ sung</td><td style="padding:8px 12px;"><code>android.intent.category.DEFAULT</code>, <code>BROWSABLE</code></td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>&lt;data&gt;</code></td><td style="padding:8px 12px;">Định dạng dữ liệu chấp nhận</td><td style="padding:8px 12px;">scheme <code>https</code>, host <code>shop.com</code>, mimeType <code>text/plain</code></td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>android:priority</code></td><td style="padding:8px 12px;">Độ ưu tiên khi nhiều filter cùng match (chỉ áp dụng implicit)</td><td style="padding:8px 12px;"><code>-1000</code>..<code>1000</code>, mặc định <code>0</code></td></tr>
  </tbody>
</table>

<h2>Cơ chế khớp (Matching Rules) — Deep-dive</h2>

<p>Để một Implicit Intent kích hoạt được Component, nó phải vượt qua <strong>CẢ 3 bài test</strong> của filter: <strong>Action → Data → Category</strong> (đúng thứ tự kiểm tra trong <code>IntentFilter.match()</code>).</p>

<div class="mermaid">sequenceDiagram
    participant App as Ứng dụng gọi
    participant PM as PackageManager (AMS)
    participant F as Intent Filter của App B

    App->>PM: startActivity(intent ngầm)
    PM->>F: match(action, data, category)
    alt Action + Data + Category đều khớp
        F-->>PM: Khớp! Thêm vào danh sách ứng viên
    else 1 trong 3 test trượt
        F-->>PM: Bỏ qua filter này
    end
    Note over PM: Quét toàn bộ filter trong máy
    alt Không có filter nào khớp
        PM-->>App: Ném ActivityNotFoundException
    else Đúng 1 filter khớp
        PM-->>App: Mở thẳng Component đó
    else Nhiều filter khớp
        PM-->>App: Hiện Chooser dialog (hoặc app mặc định)
    end</div>

<h3>1. Test Action</h3>

<p>Filter khai báo <strong>0 hoặc nhiều</strong> <code>&lt;action&gt;</code>. Luật:</p>

<ul>
  <li><strong>Action trong Intent phải nằm trong danh sách action của filter</strong> thì mới qua.</li>
  <li>⚠️ <strong>Edge case:</strong> Filter <strong>không khai báo action nào</strong> → mọi Intent (có action) đều trượt bài test này. Đây là lỗi "filter chết" cổ điển.</li>
  <li>⚠️ <strong>Edge case ngược:</strong> Intent <strong>không mang action</strong> → vẫn qua được test action <strong>miễn là filter có ít nhất 1 action</strong>.</li>
</ul>

<pre data-lang="xml"><code>&lt;intent-filter&gt;
    &lt;action android:name="android.intent.action.VIEW" /&gt;
    &lt;action android:name="android.intent.action.EDIT" /&gt;
&lt;/intent-filter&gt;</code></pre>

<h3>2. Test Category</h3>

<p>Luật ngược với action:</p>

<ul>
  <li><strong>MỌI category trong Intent phải nằm trong filter.</strong> Filter có thể khai báo <strong>nhiều category hơn</strong> Intent, nhưng <strong>không được thiếu</strong> cái nào Intent có.</li>
  <li>Intent <strong>không có category nào</strong> → luôn pass, bất kể filter khai báo gì.</li>
</ul>

<div class="callout callout-important"><span class="callout-icon">🔴</span><div class="callout-body"><strong>Quy tắc bắt buộc:</strong> Hệ thống <strong>tự động thêm</strong> <code>android.intent.category.DEFAULT</code> vào mọi Implicit Intent gửi qua <code>startActivity()</code>/<code>startActivityForResult()</code>. Vì vậy filter muốn nhận implicit intent <strong>BẮT BUỘC</strong> phải khai báo <code>android.intent.category.DEFAULT</code>. Ngoại lệ duy nhất là Launcher Activity (màn hình chính) dùng <code>CATEGORY_LAUNCHER</code>.</div></div>

<h3>3. Test Data (phức tạp nhất)</h3>

<p><code>&lt;data&gt;</code> có thể chứa: <code>scheme</code>, <code>host</code>, <code>port</code>, <code>path</code> / <code>pathPrefix</code> / <code>pathPattern</code>, <code>mimeType</code>, <code>ssp</code> (scheme specific part). Có hai mặt: <strong>so khớp URI</strong> và <strong>so khớp MIME type</strong>.</p>

<p><strong>So khớp URI</strong> — chỉ so sánh đúng phần filter khai báo:</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Filter khai báo</th>
      <th style="padding:8px 12px;text-align:left;">Intent khớp khi</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Chỉ <code>scheme</code></td><td style="padding:8px 12px;">URI có cùng scheme (bất kể host/path)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>scheme</code> + <code>host</code></td><td style="padding:8px 12px;">URI cùng scheme + host (bất kể path)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;"><code>scheme</code> + <code>host</code> + <code>path</code></td><td style="padding:8px 12px;">URI khớp cả 3 (path có thể dùng wildcard <code>*</code>)</td></tr>
  </tbody>
</table>

<p><strong>So khớp MIME type</strong> — hỗ trợ wildcard subtype: <code>text/*</code> khớp <code>text/plain</code>, <code>text/html</code>; <code>*/*</code> khớp mọi loại.</p>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Scheme, host, path và MIME type đều so khớp <strong>CASE-SENSITIVE</strong> (khác với chuẩn RFC). Luôn dùng <strong>chữ thường</strong>: <code>https</code>, <code>shop.com</code>, <code>text/plain</code>. Dùng chữ hoa là lỗi tinh vi khó debug.</div></div>

<p><strong>4 luật chính thức quyết định match/trượt</strong> (từ Official Docs):</p>

<ol>
  <li>Intent <strong>không URI, không MIME</strong> → pass <strong>chỉ khi</strong> filter cũng không khai báo URI/MIME nào.</li>
  <li>Intent <strong>có URI, không MIME</strong> → pass <strong>chỉ khi</strong> URI khớp filter <strong>VÀ</strong> filter <strong>không</strong> khai báo MIME type.</li>
  <li>Intent <strong>có MIME, không URI</strong> → pass <strong>chỉ khi</strong> filter khai báo đúng MIME đó <strong>VÀ không</strong> khai báo URI format.</li>
  <li>Intent <strong>có cả URI + MIME</strong> → phần MIME phải khớp type trong filter; phần URI khớp khi: URI khớp URI trong filter, <strong>HOẶC</strong> URI là <code>content:</code>/<code>file:</code> và filter chỉ khai báo MIME (hệ thống mặc định cho rằng Component hỗ trợ <code>content:</code>/<code>file:</code> khi filter chỉ có MIME).</li>
</ol>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Hệ quả thực tế:</strong> Nếu bạn muốn app mở được cả 2 loại dữ liệu "link web" và "file cục bộ", đừng dồn chung một filter. Tạo <strong>nhiều filter riêng</strong> — mỗi filter một bộ (action + category + data) khác nhau. Một filter với nhiều <code>&lt;data&gt;</code> nghĩa là "nhận <strong>bất kỳ tổ hợp nào</strong>" của chúng.</div></div>

<h3>Priority &amp; Resolution</h3>

<p>Khi <strong>nhiều filter</strong> cùng khớp, OS sắp xếp theo <code>android:priority</code> (cao hơn thắng, chỉ áp dụng cho implicit intent):</p>

<ul>
  <li><strong>0 filter khớp</strong> → <code>ActivityNotFoundException</code>.</li>
  <li><strong>1 filter khớp</strong> → mở thẳng Component.</li>
  <li><strong>n filter khớp</strong> → hiện <strong>Chooser</strong> (hoặc mở thẳng app mặc định nếu user đã chọn "Luôn luôn").</li>
</ul>

<h2>Hướng dẫn triển khai thực tế</h2>

<h3>Bài toán 1: Nhận "Chia sẻ Text" (Share Target)</h3>

<p>App ghi chú muốn hiện ra khi user Share văn bản từ Chrome/Zalo.</p>

<p><strong>Manifest:</strong></p>

<pre data-lang="xml"><code>&lt;activity
    android:name=".CreateNoteActivity"
    android:exported="true"&gt;

    &lt;intent-filter&gt;
        &lt;action android:name="android.intent.action.SEND" /&gt;
        &lt;category android:name="android.intent.category.DEFAULT" /&gt;
        &lt;data android:mimeType="text/plain" /&gt;
    &lt;/intent-filter&gt;
&lt;/activity&gt;</code></pre>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body">Từ <strong>Android 12 (API 31)</strong>, Component có <code>&lt;intent-filter&gt;</code> phải khai báo <strong><code>android:exported="true"</code></strong> nếu muốn app khác gọi được. Không khai báo → app bị văng <code>SecurityException</code> khi cài/nhận intent.</div></div>

<p><strong>Xử lý trong Activity (theo luật Data rule 3):</strong></p>

<pre data-lang="kotlin"><code>class CreateNoteActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        handleSharedText(intent)
    }

    private fun handleSharedText(intent: Intent?) {
        if (intent?.action != Intent.ACTION_SEND) return
        val sharedText = intent.getStringExtra(Intent.EXTRA_TEXT)
        if (sharedText.isNullOrBlank()) {
            showError()
            return
        }
        viewModel.saveNote(sharedText)
    }
}</code></pre>

<h3>Bài toán 2: Deep Link — mở App từ URL</h3>

<p>User bấm <code>https://shop.com/promo/2026</code> → mở thẳng màn hình khuyến mãi của app.</p>

<p><strong>Manifest:</strong></p>

<pre data-lang="xml"><code>&lt;activity
    android:name=".PromoActivity"
    android:exported="true"&gt;
    &lt;intent-filter&gt;
        &lt;action android:name="android.intent.action.VIEW" /&gt;
        &lt;category android:name="android.intent.category.DEFAULT" /&gt;
        &lt;category android:name="android.intent.category.BROWSABLE" /&gt;
        &lt;data
            android:scheme="https"
            android:host="shop.com"
            android:pathPrefix="/promo" /&gt;
    &lt;/intent-filter&gt;
&lt;/activity&gt;</code></pre>

<p><code>BROWSABLE</code> cho phép intent đến từ trình duyệt web. Lưu ý luật URI: filter khai báo đủ scheme + host + pathPrefix nên chỉ URL <code>https://shop.com/promo/...</code> mới khớp.</p>

<h3>Bài toán 3: App Links — mở thẳng, không hiện chooser</h3>

<p>Deep Link vẫn hiện hộp thoại "Chọn app hay Browser". <strong>App Links</strong> (Android 6.0+) loại bỏ bước này bằng cách <strong>xác minh quyền sở hữu domain</strong>.</p>

<p><strong>Bước 1 — Manifest bật autoVerify:</strong></p>

<pre data-lang="xml"><code>&lt;activity android:name=".PromoActivity" android:exported="true"&gt;
    &lt;intent-filter android:autoVerify="true"&gt;
        &lt;action android:name="android.intent.action.VIEW" /&gt;
        &lt;category android:name="android.intent.category.DEFAULT" /&gt;
        &lt;category android:name="android.intent.category.BROWSABLE" /&gt;
        &lt;data android:scheme="https" android:host="shop.com" /&gt;
    &lt;/intent-filter&gt;
&lt;/activity&gt;</code></pre>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Chỉ có <strong><code>https</code> (và <code>http</code>)</strong> mới được auto-verify. <code>autoVerify</code> đặt trên <strong>mỗi</strong> <code>&lt;intent-filter&gt;</code> muốn xác minh.</div></div>

<p><strong>Bước 2 — Host file <code>assetlinks.json</code> trên server</strong> tại <code>https://shop.com/.well-known/assetlinks.json</code>:</p>

<pre data-lang="json"><code>[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.yourshop.app",
      "sha256_cert_fingerprints": [
        "14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:AD:A6:92:4B:AD:5E:10:0C:7A:98:3C:CD:1A:8D:2F"
      ]
    }
  }
]</code></pre>

<p>Lấy <code>sha256_cert_fingerprints</code> (signing certificate, không phải SHA-1) bằng:</p>

<pre data-lang="bash"><code>keytool -list -v -keystore release.jks -alias your_alias</code></pre>

<p>Sau khi verify thành công, link mở thẳng vào app <strong>không hiện chooser</strong>, và trong <code>dumpsys</code> trạng thái filter hiển thị là <strong>"verified"</strong>. Nếu server chưa có file hoặc fingerprint sai → tự động hạ cấp về Deep Link (vẫn hiện chooser).</p>

<h3>Bài toán 4: Tích hợp MVVM + Deep Link vào project thực tế</h3>

<p><strong>Luồng dữ liệu:</strong> Deep Link → Activity (Presentation) → ViewModel (UI State) → Repository (Data).</p>

<p><strong>Activity xử lý cả 2 đường (cold start + warm start):</strong></p>

<pre data-lang="kotlin"><code>class PromoActivity : AppCompatActivity() {

    private val viewModel: PromoViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Lần đầu tạo: đọc từ onCreate
        handleDeepLink(intent)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        // Activity đang sống: PHẢI setIntent lại để intent mới nhất
        setIntent(intent)
        handleDeepLink(intent)
    }

    private fun handleDeepLink(intent: Intent?) {
        val promoId = intent?.data?.getQueryParameter("promoId")
            ?: intent?.data?.lastPathSegment
        if (promoId != null) viewModel.loadPromo(promoId)
    }
}</code></pre>

<pre data-lang="kotlin"><code>class PromoViewModel(private val repository: PromoRepository) : ViewModel() {

    private val _uiState = MutableStateFlow&lt;PromoUiState&gt;(PromoUiState.Loading)
    val uiState: StateFlow&lt;PromoUiState&gt; = _uiState

    fun loadPromo(promoId: String) {
        viewModelScope.launch {
            _uiState.value = PromoUiState.Loading
            _uiState.value = repository.getPromo(promoId)
                .fold(
                    onSuccess = { PromoUiState.Success(it) },
                    onFailure = { PromoUiState.Error(it.message) }
                )
        }
    }
}</code></pre>

<h2>Các lỗi thường gặp (Pitfalls)</h2>

<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Quên <code>CATEGORY_DEFAULT</code></strong> — Filter có đủ action + data chuẩn nhưng <code>startActivity()</code> vẫn ném <code>ActivityNotFoundException</code>. Hệ thống luôn nhét ngầm <code>CATEGORY_DEFAULT</code> vào implicit intent, filter thiếu nó là trượt test category.</div></div>
<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Khai báo <code>mimeType="*/*"</code></strong> — App hiện ra ở <strong>mọi</strong> hộp thoại Share của máy, gây rác trải nghiệm. Càng tệ hơn, app nhận cả video/ảnh mà bạn không code xử lý → crash lúc runtime.</div></div>
<div class="callout callout-danger"><span class="callout-icon">🛑</span><div class="callout-body"><strong>Quên <code>android:exported</code> (Android 12+)</strong> — App bị văng ngay khi hệ thống cài/intent đầu tiên tới, kèm log <code>SecurityException</code>.</div></div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Filter quá rộng</strong> — Khai <code>scheme="http"</code> trần (không host) nghĩa là app bạn xuất hiện khi mở <strong>mọi</strong> link http trên máy. Luôn kèm <code>host</code> (và lý tưởng là <code>pathPrefix</code>).</div></div>
<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Nhầm Deep Link với App Links</strong> — Không có <code>autoVerify</code> + <code>assetlinks.json</code> thì link vẫn hiện chooser, user phải chọn "Luôn luôn" thủ công.</div></div>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>MIME chỉ <code>text/plain</code> thì đừng mong mở file cục bộ</strong> — Theo rule 4, filter chỉ có MIME mới ngầm hỗ trợ <code>content:</code>/<code>file:</code>. Nếu muốn nhận link https + file PDF, tách <strong>2 filter riêng</strong>.</div></div>

<h2>Testing Intent Filter</h2>

<pre data-lang="bash"><code># 1. Test Deep Link: giả lập user bấm link
adb shell am start -a android.intent.action.VIEW \\
    -d "https://shop.com/promo/2026" com.yourshop.app

# 2. Test Share Target: gửi text như app khác
adb shell am start -a android.intent.action.SEND \\
    --es android.intent.extra.TEXT "Xin chào" -t "text/plain" \\
    com.yourshop.app

# 3. Xem danh sách filter của package (kiểm tra sau khi verify App Links)
adb shell dumpsys package com.yourshop.app | grep -A 20 "Intent Filter"

# 4. Hỏi hệ thống app nào nhận một intent cụ thể
adb shell cmd package query-activities \\
    -a android.intent.action.VIEW -d "https://shop.com/promo/1"</code></pre>

<p><strong>Unit test filter thuần</strong> (không cần thiết bị):</p>

<pre data-lang="kotlin"><code>@Test
fun filterMatchesShareTextIntent() {
    val filter = IntentFilter(Intent.ACTION_SEND).apply {
        addCategory(Intent.CATEGORY_DEFAULT)
        addDataType("text/plain")
    }
    val intent = Intent(Intent.ACTION_SEND).setType("text/plain")

    // Mỗi thành phần phải match (khác hằng số NO_MATCH_*)
    assertNotEquals(IntentFilter.NO_MATCH_ACTION, filter.matchAction(intent.action))
    assertNotEquals(IntentFilter.NO_MATCH_TYPE, filter.matchData(
        intent.type, intent.scheme, intent.data
    ))
    assertTrue(filter.matchCategories(intent.categories) == null)
}</code></pre>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">Từ <strong>Android 11 (API 30)</strong>, để <code>resolveActivity()</code>/<code>queryIntentActivities()</code> nhìn thấy filter của app khác, phải khai báo <code>&lt;queries&gt;</code> trong manifest của app gọi. Đây là cơ chế Package Visibility.</div></div>

<h2>Tư duy hệ thống</h2>

<p>Intent Filter nằm ở <strong>tầng Manifest / Presentation</strong> của kiến trúc — nó chỉ là "cửa ngõ" nhận Intent, <strong>không</strong> chứa logic nghiệp vụ. Pattern chuẩn trong project MVVM / Single-Activity:</p>

<ol>
  <li><strong>Manifest:</strong> khai báo filter (cửa ngõ đón implicit intent).</li>
  <li><strong>Activity:</strong> tối giản — chỉ trích xuất dữ liệu từ <code>intent.data</code>/extras và đẩy xuống ViewModel (<code>onCreate</code> + <code>onNewIntent</code> + <code>setIntent</code>).</li>
  <li><strong>ViewModel:</strong> biến dữ liệu thô thành UI State; chịu trách nhiệm gọi Repository.</li>
  <li><strong>Repository/Data:</strong> nguồn dữ liệu thật sự (API, Room...).</li>
</ol>

<p>Giữ filter hẹp, Activity mỏng, logic nghiệp vụ ở ViewModel/Repository — đây là điểm khác biệt giữa code "chạy được" và code "dễ bảo trì".</p>

<h2>Tổng kết</h2>

<p>Intent Filter là cơ chế phân loại implicit intent của Android: <strong>Action</strong> (làm gì), <strong>Category</strong> (trong ngữ cảnh nào), <strong>Data</strong> (trên dữ liệu gì). Nắm vững 3 bài test — đặc biệt 4 luật Data test và việc so khớp case-sensitive — giúp bạn khai báo filter <strong>đủ hẹp để đúng chỗ, đủ rộng để không sót</strong>, và biết khi nào dùng Deep Link hay nâng cấp lên App Links để trải nghiệm mượt mà hơn.</p>

<h2>Nguồn tham khảo</h2>

<ul>
  <li>Android Developers — <a href="https://developer.android.com/guide/components/intents-filters" target="_blank" rel="noopener">Intents and intent filters</a></li>
  <li>Android Developers — <a href="https://developer.android.com/reference/android/content/IntentFilter" target="_blank" rel="noopener">IntentFilter API reference</a></li>
  <li>Android Developers — <a href="https://developer.android.com/training/app-links" target="_blank" rel="noopener">Handle Android app links</a></li>
  <li>Android Developers — <a href="https://developer.android.com/training/app-links/verify-android-applinks" target="_blank" rel="noopener">Verify Android App Links</a></li>
</ul>
    `
  },
  'intent-push-data': {
    title: 'Truyền dữ liệu và gửi sự kiện qua Intent',
    summary: 'Truyền dữ liệu (Data) và gửi sự kiện (Event) qua Intent giữa các Component. Push data qua Bundle với Primitive types, Serializable/Parcelable. Send event qua Broadcast Intent (sendBroadcast, ordered broadcast) và Activity Result. Kèm giới hạn IPC 1MB, TransactionTooLargeException và Common Mistakes.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '15 phút',
    depth: 'deep-dive',
    tags: ['android', 'practical'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: [],
    related: [],
    learningOutcomes: [],
    knowledgeGap: '',
    updatedAt: '2026-08-01',
    readTime: '15 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Intent trong Android làm hai nhiệm vụ quan trọng:</p>
<ol>
<li><strong>Push Data</strong> — Chở dữ liệu từ Component A (Activity/Fragment/Service) sang Component B.</li>
<li><strong>Send Event</strong> — Gửi tín hiệu báo "một sự kiện đã xảy ra" đến các Component quan tâm, để chúng phản ứng.</li>
</ol>

<p>Hai nhiệm vụ này có bản chất khác nhau:</p>
<ul>
<li><strong>Push Data</strong> hướng tới một đối tượng cụ thể (<code>startActivity</code>, <code>startService</code>). Bạn biết <em>ai</em> sẽ nhận.</li>
<li><strong>Send Event</strong> hướng tới một nhóm không xác định (broadcast). Bạn gửi đi một tín hiệu, và bất kỳ ai đang lắng nghe kênh đó đều nhận được. Sender không cần biết <em>ai</em> sẽ nhận.</li>
</ul>

<p>Nếu bạn nhầm lẫn hai mục đích này, bạn sẽ viết code đúng cú pháp nhưng sai về thiết kế: dùng <code>startActivity</code> để "gửi sự kiện" cho cả hệ thống, hoặc dùng broadcast để "chở một object lớn" từ màn hình này sang màn hình kia.</p>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Vị trí trong Knowledge Graph:</strong> Topic này nằm giữa <strong>4.2.6.4 Handle Intent</strong> (đọc dữ liệu + nhận kết quả) và <strong>4.2.6.6 Pending Intent</strong> (ủy quyền kích hoạt). Phần Send Event liên quan trực tiếp đến <strong>Broadcast Receiver</strong> (4.2.4.1).</div></div>

<h2>1. Push Data — Truyền dữ liệu qua Bundle</h2>

<h3>1.1 Bản chất: Intent + Bundle</h3>

<p>Dữ liệu gửi qua Intent không nằm trực tiếp trên Intent. Nó được chứa trong một đối tượng <strong>Bundle</strong> — một chiếc hộp lưu dữ liệu dạng <strong>Key-Value (Khóa-Giá trị)</strong>.</p>

<p>Khi bạn gọi <code>intent.putExtra(key, value)</code>, Intent sẽ tự động đẩy cặp key-value này vào Bundle bên trong nó:</p>

<pre data-lang="kotlin"><code>val intent = Intent(context, ProductDetailActivity::class.java)
intent.putExtra("PRODUCT_ID", 101)
intent.putExtra("PRODUCT_NAME", "MacBook Pro")
startActivity(intent)</code></pre>

<p>Ở phía nhận, màn hình B lấy dữ liệu ra bằng <code>getIntExtra(key, defaultValue)</code>, <code>getStringExtra(key)</code>, v.v.</p>

<h3>1.2 Truyền Primitive Types</h3>

<p>Int, Long, Float, Boolean, String, Char, Double... được hệ thống hỗ trợ mặc định, không cần bất kỳ khai báo nào:</p>

<pre data-lang="kotlin"><code>// Sender — Activity A
val intent = Intent(this, ProductDetailActivity::class.java).apply {
    putExtra("PRODUCT_ID", 101)
    putExtra("PRODUCT_NAME", "MacBook Pro")
    putExtra("PRICE", 4299.99)
    putExtra("IS_DISCOUNTED", true)
}
startActivity(intent)</code></pre>

<pre data-lang="kotlin"><code>// Receiver — Activity B
val id = intent.getIntExtra("PRODUCT_ID", -1)
val name = intent.getStringExtra("PRODUCT_NAME")
val price = intent.getDoubleExtra("PRICE", 0.0)
val isDiscounted = intent.getBooleanExtra("IS_DISCOUNTED", false)</code></pre>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Best Practice:</strong> Khi truyền giá trị cần kèm giá trị mặc định an toàn (ví dụ <code>-1</code>, <code>null</code>, <code>0</code>) để tránh crash khi key không tồn tại hoặc Intent rỗng.</div></div>

<h3>1.3 Truyền Object: Serializable vs Parcelable</h3>

<p>Khi bạn muốn truyền một đối tượng phức tạp (ví dụ <code>data class User</code>), bạn không thể nhét trực tiếp nó vào Intent. Bạn phải <strong>Serialization</strong> — "phân rã" object thành chuỗi byte, rồi tái tạo lại ở phía nhận.</p>

<p>Trong Android có 2 giao thức chính:</p>

<table>
<thead><tr><th>Tiêu chí</th><th>Serializable (Java)</th><th>Parcelable (Android)</th></tr></thead>
<tbody>
<tr><td>Cách dùng</td><td>Thêm <code>implements Serializable</code></td><td>Kế thừa <code>Parcelable</code> + viết logic ghi/đọc từng thuộc tính</td></tr>
<tr><td>Cơ chế</td><td>Reflection (phân tích object lúc runtime)</td><td>Tự tay ghi/đọc từng field vào Parcel</td></tr>
<tr><td>Tốc độ</td><td>Chậm</td><td>Nhanh (gấp ~10 lần)</td></tr>
<tr><td>Boilerplate</td><td>Không</td><td>Nhiều (nếu không dùng <code>@Parcelize</code>)</td></tr>
<tr><td>Dùng khi</td><td>Object nhỏ, ít truyền, không quan tâm hiệu năng</td><td>Truyền thường xuyên, data lớn, cần nhanh</td></tr>
</tbody>
</table>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Không dùng Serializable cho object phức tạp.</strong> Reflection tạo ra rất nhiều rác bộ nhớ (Garbage), khiến app bị jank nếu truyền liên tục. Trong các project Android thực tế, <strong>Parcelable</strong> là chuẩn.</div></div>

<h3>1.4 Kotlin @Parcelize — Giải pháp tốt nhất</h3>

<p>Kotlin giải quyết hoàn toàn nhược điểm boilerplate của Parcelable bằng plugin <code>kotlin-parcelize</code>:</p>

<pre data-lang="kotlin"><code>// build.gradle.kts
plugins {
    id("kotlin-parcelize")
}</code></pre>

<pre data-lang="kotlin"><code>import android.os.Parcelable
import kotlinx.parcelize.Parcelize

// 1. Tạo Model
@Parcelize
data class Product(
    val id: Int,
    val name: String,
    val price: Double
) : Parcelable

// 2. Push qua Intent
val product = Product(1, "Bàn phím cơ", 1500.0)
val intent = Intent(context, DetailActivity::class.java)
intent.putExtra("EXTRA_PRODUCT", product)
startActivity(intent)</code></pre>

<div class="callout callout-success"><span class="callout-icon">✅</span><div class="callout-body"><code>@Parcelize</code> tự sinh toàn bộ code <code>writeToParcel()</code> và <code>CREATOR</code> cho bạn. Bạn có tốc độ của Parcelable với sự nhàn nhã của Serializable.</div></div>

<h3>1.5 Giới hạn bộ nhớ IPC — TransactionTooLargeException</h3>

<p>Khi bạn truyền Intent từ Component A sang Component B, Intent đó không chạy trực tiếp trong RAM của ứng dụng. Nó phải đi qua <strong>Binder IPC</strong> (Cơ chế giao tiếp liên tiến trình của Android OS).</p>

<div class="mermaid">
flowchart LR
    A[Component A] -->|putExtra + startActivity| B[Intent + Bundle]
    B -->|Binder Transaction Buffer| C[Android OS Binder]
    C -->|TransactionTooLargeException nếu &gt; 1MB| D[Crash]
    C -->|đi qua 1MB| E[Component B]
</div>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Giới hạn 1MB:</strong> Android OS cấp một bộ đệm (Binder Transaction Buffer) kích thước <strong>~1MB</strong> cho tất cả các tiến trình chạy đồng thời. Nếu bạn nhét một List 10.000 user, hoặc Base64 của tấm hình 5MB vào Intent, hệ thống ném ra <code>TransactionTooLargeException</code> và app crash.</div></div>

<p><strong>Cách xử lý khi dữ liệu quá lớn:</strong></p>
<ol>
<li><strong>Chỉ truyền <code>id</code>:</strong> Màn hình B dùng <code>id</code> đó query lại database (Room/SQLite) hoặc cache (Repository/ViewModel).</li>
<li><strong>Dùng Singleton / Repository Cache:</strong> Lưu object trong memory ở phía A, màn hình B lấy ra. (Lưu ý: phải xử lý khi System Kill Process — singleton bị mất, phải load lại từ đĩa.)</li>
<li><strong>Chia nhỏ payload:</strong> Nếu bắt buộc phải chuyển nhiều dữ liệu, xem xét chuyển qua file tạm + đường dẫn, hoặc dùng SharedPreferences/Room.</li>
</ol>

<h2>2. Send Event — Gửi sự kiện qua Broadcast Intent</h2>

<h3>2.1 Bản chất: Mô hình Pub/Sub</h3>

<p><strong>Send Event via Intent</strong> nghĩa là gửi một <strong>Broadcast Intent</strong> — tín hiệu báo "sự kiện X đã xảy ra" — để tất cả các Component đang lắng nghe hành động đó (action) được thông báo và phản ứng.</p>

<p>Đây là mô hình <strong>Publish/Subscribe (Pub/Sub)</strong>:</p>
<ul>
<li><strong>Publisher</strong> gọi <code>sendBroadcast(intent)</code> — không biết ai sẽ nhận, không đợi phản hồi.</li>
<li><strong>Subscriber</strong> đăng ký lắng nghe qua <code>BroadcastReceiver</code> với một <code>IntentFilter</code> chứa action cụ thể.</li>
</ul>

<div class="mermaid">
sequenceDiagram
    participant Pub as Publisher (Activity)
    participant OS as Android OS (AMS)
    participant R1 as Receiver 1
    participant R2 as Receiver 2
    participant R3 as Receiver 3 (không quan tâm)

    Pub->>OS: sendBroadcast(Intent("com.example.REFRESH_DATA"))
    Note over OS: Android tìm receiver có IntentFilter khớp action
    OS->>R1: onReceive(context, intent)
    OS->>R2: onReceive(context, intent)
    Note over R3: Không nhận vì filter không khớp
</div>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Phân biệt với Push Data:</strong> Push Data dùng <code>startActivity</code>/<code>startService</code> (điểm-điểm, một receiver duy nhất). Send Event dùng <code>sendBroadcast</code> (một-nhiều, mọi receiver đăng ký đều nhận).</div></div>

<h3>2.2 Triển khai: sendBroadcast + BroadcastReceiver</h3>

<pre data-lang="kotlin"><code>// Sender — phát sự kiện
const val ACTION_REFRESH_DATA = "com.example.ACTION_REFRESH_DATA"

val intent = Intent(ACTION_REFRESH_DATA).apply {
    setPackage(packageName)      // Chỉ gửi trong app (explicit to app) — chống lộ ra ngoài
    putExtra("SOURCE", "MainActivity")
}
context.sendBroadcast(intent)</code></pre>

<pre data-lang="kotlin"><code>// Receiver — lắng nghe sự kiện
class DataReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action != ACTION_REFRESH_DATA) return
        val source = intent.getStringExtra("SOURCE")
        // Phản ứng với sự kiện: reload data, cập nhật UI...
    }
}</code></pre>

<pre data-lang="kotlin"><code>// Đăng ký (Dynamic Receiver — khuyến nghị cho in-app event)
class MainActivity : AppCompatActivity() {
    private val dataReceiver = DataReceiver()

    override fun onStart() {
        super.onStart()
        registerReceiver(dataReceiver, IntentFilter(ACTION_REFRESH_DATA))
    }

    override fun onStop() {
        super.onStop()
        unregisterReceiver(dataReceiver)  // Bắt buộc, tránh memory leak
    }
}</code></pre>

<h3>2.3 Explicit Broadcast vs Implicit Broadcast</h3>

<table>
<thead><tr><th>Tiêu chí</th><th>Implicit Broadcast</th><th>Explicit Broadcast</th></tr></thead>
<tbody>
<tr><td>Cách khai báo</td><td>Chỉ định <code>action</code></td><td>Chỉ định <code>action</code> + <code>setPackage()</code>/ComponentName</td></tr>
<tr><td>Ai nhận được</td><td>Bất kỳ app nào đăng ký action</td><td>Chỉ app của bạn</td></tr>
<tr><td>Static receiver (Android 8+)</td><td><strong>Bị chặn</strong></td><td>Vẫn hoạt động</td></tr>
<tr><td>Dùng khi</td><td>Sự kiện hệ thống (BOOT_COMPLETED, CONNECTIVITY)</td><td>Sự kiện nội bộ app</td></tr>
<tr><td>Rủi ro bảo mật</td><td>Cao — app khác có thể nhận</td><td>Thấp</td></tr>
</tbody>
</table>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Từ Android 8.0 (API 26), hầu hết Implicit Broadcast bị chặn với Static Receiver</strong> (khai báo trong Manifest). Nếu bạn cần gửi sự kiện nội bộ, luôn dùng <strong>Explicit Broadcast</strong> (<code>setPackage(packageName)</code>) hoặc <strong>Dynamic Receiver</strong> (đăng ký trong code). Chi tiết → xem Topic <strong>4.2.4.1 Broadcast Receiver</strong>.</div></div>

<h3>2.4 Ordered Broadcast — Gửi sự kiện theo thứ tự</h3>

<p>Khi bạn cần nhiều receiver xử lý theo thứ tự ưu tiên (và có thể hủy bỏ sự kiện), dùng <code>sendOrderedBroadcast()</code>:</p>

<pre data-lang="kotlin"><code>context.sendOrderedBroadcast(intent, null)  // null = không yêu cầu permission</code></pre>

<p>Receiver có <code>android:priority</code> cao hơn sẽ nhận trước, có thể gọi <code>abortBroadcast()</code> để chặn các receiver phía sau.</p>

<h3>2.5 Send Event trả kết quả: Activity Result API</h3>

<p>Trường hợp "gửi sự kiện" cần nhận lại kết quả từ Component khác (ví dụ chọn ảnh, nhập text) thuộc <strong>Activity Result API</strong> — đã được trình bày đầy đủ ở Topic <strong>4.2.6.4 Handle Intent</strong>. Tóm tắt nhanh:</p>

<pre data-lang="kotlin"><code>// Sender — đăng ký contract trước
private val pickImageLauncher = registerForActivityResult(
    ActivityResultContracts.StartActivityForResult()
) { result ->
    if (result.resultCode == Activity.RESULT_OK) {
        val uri = result.data?.data
        // Xử lý kết quả
    }
}

// Kích hoạt
pickImageLauncher.launch(Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI))</code></pre>

<h2>3. Trade-offs &amp; Khi nào dùng gì</h2>

<table>
<thead><tr><th>Nhu cầu</th><th>Giải pháp</th><th>Ghi chú</th></tr></thead>
<tbody>
<tr><td>Chuyển màn hình, mang theo vài ID/flag</td><td><code>startActivity</code> + <code>putExtra</code> (primitive)</td><td>Nhanh, đơn giản</td></tr>
<tr><td>Chuyển màn hình, mang theo object</td><td><code>@Parcelize</code> + <code>putExtra</code> (Parcelable)</td><td>Chuẩn, hiệu năng tốt</td></tr>
<tr><td>Gửi sự kiện cho 1 Component cụ thể (biết rõ ai)</td><td>Explicit Intent (startActivity/startService)</td><td>Điểm-điểm</td></tr>
<tr><td>Gửi sự kiện cho nhiều Component (không biết ai)</td><td><code>sendBroadcast</code> + Dynamic Receiver</td><td>Pub/Sub</td></tr>
<tr><td>Cần nhận kết quả trả về</td><td>Activity Result API</td><td>Contract-based</td></tr>
<tr><td>Giao tiếp nội bộ type-safe, reactive</td><td><strong>Flow / SharedFlow / LiveData</strong> (không qua Intent)</td><td>Khuyến nghị hiện đại</td></tr>
</tbody>
</table>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Quy tắc vàng:</strong> Đừng dùng Broadcast Intent để giao tiếp giữa các thành phần <em>trong cùng một app và cùng một process</em>. <code>LocalBroadcastManager</code> đã deprecated; hãy dùng <code>SharedFlow</code>/<code>LiveData</code> (chi tiết ở Topic Broadcast Receiver). Broadcast chỉ nên dùng cho <strong>sự kiện hệ thống</strong> hoặc <strong>giao tiếp cross-app</strong>.</div></div>

<h2>4. Sai lầm thường gặp</h2>

<h3>Lỗi 1: Quên setPackage() khi gửi broadcast nội bộ</h3>
<pre data-lang="kotlin"><code>// App khác cũng có thể lắng nghe action này
context.sendBroadcast(Intent(ACTION_REFRESH_DATA))

// Chỉ app của mình nhận
context.sendBroadcast(Intent(ACTION_REFRESH_DATA).apply { setPackage(packageName) })</code></pre>

<h3>Lỗi 2: Dùng broadcast để chở object/dữ liệu lớn</h3>
<pre data-lang="kotlin"><code>// Tốn kém + không type-safe + có thể crash
context.sendBroadcast(Intent(ACTION_UPDATE).apply {
    putExtra("BIG_LIST", hugeList)   // Vượt 1MB → TransactionTooLargeException
})</code></pre>

<h3>Lỗi 3: Quên unregisterReceiver → Memory Leak</h3>
<pre data-lang="kotlin"><code>// Đăng ký ở onCreate nhưng không hủy → leak
override fun onCreate(...) { registerReceiver(receiver, filter) }

// Luôn unregister ở lifecycle đối ứng
override fun onStop() { unregisterReceiver(receiver) }</code></pre>

<h3>Lỗi 4: Truyền đối tượng không được tái tạo đúng kiểu</h3>
<pre data-lang="kotlin"><code>// Sender dùng Parcelable, Receiver lấy bằng getSerializableExtra → ClassCastException
// Sender/Receiver phải dùng CÙNG giao thức (Parcelable ↔ getParcelableExtra)</code></pre>

<h3>Lỗi 5: Đặt dữ liệu nhạy cảm trong broadcast</h3>
<pre data-lang="kotlin"><code>// Token/SECRET bị app khác intercept (nếu implicit)
context.sendBroadcast(Intent(ACTION_LOGIN).apply {
    putExtra("token", jwtToken)
})
// Chỉ báo hiệu sự kiện, dữ liệu lấy qua secure channel (hoặc setPackage)</code></pre>

<h2>5. Kết nối hệ thống</h2>

<div class="mermaid">
flowchart TD
    U[UiEvent: navigate, show snackbar] -->|trong app| SF[SharedFlow]
    I1[Intent Push Data] -->|startActivity + Bundle| P[Điểm-điểm]
    I2[Intent Send Event] -->|sendBroadcast| M[Một-nhiều]
    P --> PEN[PendingIntent 4.2.6.6: ủy quyền cho OS/Notification]
    M --> BR[Broadcast Receiver 4.2.4.1]
    SYS[System Event: BOOT_COMPLETED...] --> BR
</div>

<ul>
<li><strong>Push Data</strong> là cơ chế vận chuyển dữ liệu điểm-điểm (Intent + Bundle).</li>
<li><strong>Send Event</strong> là cơ chế thông báo sự kiện một-nhiều (Broadcast Intent).</li>
<li>Khi cần bên thứ ba (OS, System UI, Launcher) thay bạn kích hoạt Intent trong tương lai → <strong>PendingIntent</strong>.</li>
</ul>

<h2>Tổng kết</h2>

<p>Hãy nhớ sự khác biệt cốt lõi:</p>
<ul>
<li><strong>Push Data:</strong> <code>startActivity</code> + <code>putExtra</code> (Bundle). Dữ liệu nhỏ, primitive hoặc <code>@Parcelize</code>. Không chở quá 1MB.</li>
<li><strong>Send Event:</strong> <code>sendBroadcast</code> + <code>BroadcastReceiver</code>. Tín hiệu một-nhiều. Nội bộ app → Explicit/Dynamic, không nhét dữ liệu nhạy cảm.</li>
<li>Nếu giao tiếp trong cùng process và cần type-safe → <strong>Flow/SharedFlow</strong> thay vì broadcast.</li>
</ul>

<p>Luôn ưu tiên giải pháp đơn giản nhất: primitive types hoặc ID qua Intent, Parcelable khi buộc phải truyền object, và không bao giờ dùng Intent để chở dữ liệu lớn.</p>
    `
  },
  'intent-handle': {
    title: 'Xử lý Intent và onNewIntent',
    summary: 'Hướng dẫn cách trích xuất dữ liệu từ Intent, nhận kết quả trả về với Activity Result API (cả XML và Compose), và giải phẫu chi tiết vòng đời onNewIntent() khi kết hợp cùng Launch Modes.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '15 phút',
    depth: 'deep-dive',
    tags: ['android', 'practical'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: [],
    related: [],
    learningOutcomes: [],
    knowledgeGap: '',
    updatedAt: '2026-07-30',
    readTime: '15 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Khi một Component (Activity/Fragment) được khởi chạy bởi một Intent, nó cần làm 2 việc chính:<br>1. Đọc dữ liệu (Data/Extras) mà người gọi gửi đến.<br>2. (Tùy chọn) Gửi trả lại kết quả (Result) cho người gọi khi nó làm xong việc.</p>

<p>Đặc biệt, nếu Activity <strong>đang chạy sẵn</strong> và bất ngờ nhận thêm một Intent mới (thay vì bị tạo mới hoàn toàn), chuyện gì sẽ xảy ra? Đó là lúc <code>onNewIntent()</code> xuất hiện và thường gây ra rất nhiều lỗi khó hiểu (bug logic) cho các lập trình viên.</p>

<h2>1. Đọc dữ liệu từ Intent</h2>

<p>Trong <code>onCreate()</code> của Activity, bạn dùng biến <code>intent</code> (tương đương <code>getIntent()</code>) để lấy dữ liệu.</p>

<pre data-lang="kotlin"><code>override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    // Đọc Primitive Type
    val productId = intent.getIntExtra("PRODUCT_ID", -1) // -1 là giá trị mặc định nếu ko tìm thấy key
    val productName = intent.getStringExtra("PRODUCT_NAME")
    
    // Đọc Object (Parcelable) - Từ Android 13 (API 33) trở lên cần truyền Class type
    val product = if (Build.VERSION.SDK_INT &gt;= Build.VERSION_CODES.TIRAMISU) {
        intent.getParcelableExtra("EXTRA_PRODUCT", Product::class.java)
    } else {
        @Suppress("DEPRECATION")
        intent.getParcelableExtra("EXTRA_PRODUCT")
    }
}</code></pre>

<h2>2. Nhận kết quả trả về (Activity Result API)</h2>

<p>Ngày xưa, chúng ta dùng <code>startActivityForResult()</code> và <code>onActivityResult()</code>. Cách này hiện đã bị <strong>Deprecated</strong> vì nó khiến code lộn xộn và dễ gây crash khi Activity bị recreate (System kill).</p>

<p>Chuẩn mới hiện nay là <strong>Activity Result API</strong>.</p>

<h2>Trong môi trường View (XML / Fragment)</h2>

<p>Quy trình chuẩn: Đăng ký một "hợp đồng" (Contract) <strong>trước khi</strong> Activity được STARTED.</p>

<pre data-lang="kotlin"><code>class ProfileActivity : AppCompatActivity() {

// 1. Đăng ký Contract: Muốn khởi chạy một Activity khác và đợi kết quả
    private val getAvatarLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result -&gt;
        if (result.resultCode == Activity.RESULT_OK) {
            val data: Intent? = result.data
            val imageUri = data?.data
            // Cập nhật UI với imageUri
        }
    }

override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        btnChangeAvatar.setOnClickListener {
            // 2. Kích hoạt launcher
            val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
            getAvatarLauncher.launch(intent)
        }
    }
}</code></pre></p>

<h2>Trong môi trường Jetpack Compose</h2>

<p>Compose cung cấp hàm <code>rememberLauncherForActivityResult</code> vô cùng tiện lợi:</p>

<pre data-lang="kotlin"><code>@Composable
fun AvatarPicker() {
    val context = LocalContext.current
    var avatarUri by remember { mutableStateOf&lt;Uri?&gt;(null) }

// 1. Đăng ký Launcher
    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.StartActivityForResult()
    ) { result -&gt;
        if (result.resultCode == Activity.RESULT_OK) {
            avatarUri = result.data?.data
        }
    }

Button(onClick = {
        // 2. Kích hoạt
        val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        launcher.launch(intent)
    }) {
        Text("Chọn Ảnh")
    }
}</code></pre></p>

<p>---</p>

<h2>3. Bí ẩn của onNewIntent() và Launch Modes</h2>

<h2>Sự cố thường gặp</h2>

<p>Giả sử bạn có màn hình <code>NotificationActivity</code>. Khi người dùng đang mở app và đứng sẵn ở màn hình này, có một thông báo Push Notification bắn tới. Họ bấm vào thông báo (chứa Intent đẩy data id=100) -> OS điều hướng họ đến <code>NotificationActivity</code>.</p>

<strong>Lỗi:</strong> Bạn debug và thấy màn hình không cập nhật nội dung của id=100. Nó vẫn hiển thị nội dung cũ. Khi bạn gọi <code>intent.getIntExtra("id", -1)</code>, nó vẫn trả về ID của thông báo cũ từ hôm qua!

<h2>Tại sao lại như vậy?</h2>

<p>Do cấu hình <strong>Launch Mode</strong> trong Manifest, nếu Activity của bạn là <code>singleTop</code>, <code>singleTask</code>, hoặc <code>singleInstance</code>:<br>Khi Component B <strong>đang hiển thị trên cùng</strong> (top of stack) và một Intent mới gọi đến B, hệ điều hành sẽ <strong>KHÔNG tạo ra instance mới</strong> (không gọi <code>onCreate()</code>).</p>

<p>Thay vào đó, nó tái sử dụng instance cũ và chuyển Intent mới vào hàm <code>onNewIntent(intent)</code>.</p>

<div class="mermaid">sequenceDiagram
    participant OS as Android OS
    participant Act as Activity (đang ở Foreground)
    
    Note over OS,Act: Intent mới bay tới (id=100)
    OS->>Act: onPause()
    OS->>Act: onNewIntent(Intent)
    Note right of Act: Nhận Intent mới tại đây!
    OS->>Act: onResume()</div>

<h2>Cái bẫy của getIntent()</h2>

<p>Khi <code>onNewIntent(intent)</code> được gọi, biến <code>intent</code> gốc của Activity (được trả về bởi hàm <code>getIntent()</code>) <strong>KHÔNG tự động cập nhật</strong>. Nó vẫn trỏ vào cái Intent khai sinh ra Activity từ lúc <code>onCreate()</code>.</p>

<strong>Cách xử lý ĐÚNG CHUẨN:</strong>
Bạn BẮT BUỘC phải gọi <code>setIntent(intent)</code> bên trong <code>onNewIntent</code> để ghi đè Intent cũ.

<pre data-lang="kotlin"><code>class NotificationActivity : AppCompatActivity() {

override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Lần đầu tạo Activity, đọc Intent gốc
        handleIntentData(intent)
    }

// Hàm này CHỈ gọi khi Activity ĐANG SỐNG và nhận Intent mới
    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        
        // 1. CẬP NHẬT LẠI INTENT GỐC CỦA ACTIVITY (Cực kỳ quan trọng)
        setIntent(intent) 
        
        // 2. Xử lý dữ liệu mới
        intent?.let { handleIntentData(it) }
    }

private fun handleIntentData(intent: Intent) {
        val notifId = intent.getIntExtra("NOTIF_ID", -1)
        // Load data từ API hoặc hiển thị ra UI theo notifId
    }
}</code></pre></p>

<h2>Phân tích nhanh các Launch Mode ảnh hưởng đến onNewIntent</h2>

<ul>
  <li><strong>standard (mặc định):</strong> Mỗi lần gọi Intent là tạo ra instance mới, gọi <code>onCreate()</code>. Cứ gọi là xếp chồng lên nhau. Khỏi quan tâm <code>onNewIntent</code>.</li>
  <li><strong>singleTop:</strong> Nếu B đang ở <strong>trên cùng</strong> stack -> GỌI <code>onNewIntent()</code>. Nếu B ở dưới A -> Tạo B mới, gọi <code>onCreate()</code>.</li>
  <li><strong>singleTask:</strong> Chỉ có duy nhất 1 B trong toàn bộ Task. Nếu gọi B, mọi Activity nằm trên B bị pop ra khỏi stack (xóa sạch), đưa B lên đỉnh và GỌI <code>onNewIntent()</code>. Cực kỳ hữu dụng cho màn hình Home/Dashboard.</li>
</ul>

<h2>Tổng kết</h2>

<p>Việc hiểu luồng dữ liệu (vào qua <code>onCreate</code> hoặc <code>onNewIntent</code>, ra qua <code>Activity Result API</code>) là cốt lõi để làm chủ ứng dụng Android. Luôn nhớ nguyên tắc vàng: <strong>Nếu dùng Launch Mode để tái sử dụng Activity, bạn phải override <code>onNewIntent()</code> và nhớ gọi <code>setIntent(intent)</code>.</strong></p>
    `
  },
  'intent-pending': {
    title: 'Pending Intent',
    summary: 'Giải mã PendingIntent - cơ chế ủy quyền quyền lực trong Android. Hiểu sâu tại sao Notification và AlarmManager phải dùng PendingIntent, và cách cấu hình Flags (Immutable/Mutable) an toàn.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '15 phút',
    depth: 'deep-dive',
    tags: ['android', 'practical'],
    domain: 'Android',
    module: 'Session 04: Application Components & Intent',
    prerequisites: [],
    related: [],
    learningOutcomes: [],
    knowledgeGap: '',
    updatedAt: '2026-07-30',
    readTime: '15 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Khi bạn hiển thị một thông báo (Notification) lên thanh trạng thái của điện thoại, và người dùng bấm vào đó, bạn muốn mở một màn hình trong app của mình.</p>

<strong>Câu hỏi:</strong> Ai là người lắng nghe sự kiện click đó và kích hoạt Intent? Có phải app của bạn không?

<strong>Trả lời:</strong> KHÔNG. Ứng dụng của bạn có thể đã bị hệ thống kill (tắt hoàn toàn) từ đời nào rồi. Thanh thông báo (Status Bar) thuộc quyền quản lý của <strong>System UI</strong> (Một process riêng biệt của Hệ điều hành).

<p>Vậy làm sao một process của OS (System UI) có thể gọi một Intent mở Activity của app bạn, <strong>dưới tư cách và quyền hạn của chính app bạn</strong> (ngay cả khi app đang không chạy)?</p>

<p>Đó là lý do <strong>PendingIntent</strong> ra đời.</p>

<h2>PendingIntent là gì?</h2>

<strong>PendingIntent</strong> thực chất là một "tờ giấy ủy quyền".

<p>Bạn đóng gói một Intent bình thường vào trong PendingIntent, sau đó đưa nó cho một ứng dụng khác (thường là System OS). Bạn bảo hệ thống rằng: <em>"Hãy cầm tờ giấy ủy quyền này. Khi nào sự kiện X xảy ra (user bấm thông báo, hoặc đến đúng 7h sáng), hãy thực thi cái Intent bên trong tờ giấy này. Và quan trọng nhất: Hãy thực thi nó bằng <strong>chính danh tính và quyền (permissions)</strong> của tôi, chứ không phải của anh."</em></p>

<h2>Cơ chế hoạt động</h2>

<div class="mermaid">sequenceDiagram
    participant App as App của bạn
    participant AMS as ActivityManagerService
    participant System as System UI (Notification) / Alarm
    participant Target as Target Activity
    
    App->>AMS: Tạo PendingIntent(Intent(Mở Màn Hình B))
    AMS-->>App: Trả về Token (PendingIntent)
    
    App->>System: Build Notification + truyền PendingIntent
    Note right of App: Process của App bị Kill
    
    Note over System: ... Một lúc sau ...
    System->>System: User click Notification
    System->>AMS: Gửi lại Token (PendingIntent) để kích hoạt
    Note over AMS: Phân giải Intent dưới quyền của App
    AMS->>Target: Khởi chạy Activity B</div>

<h2>Khi nào phải dùng PendingIntent?</h2>

<ol>
  <li><strong>Notification:</strong> Khi người dùng click vào thông báo (System UI process).</li>
  <li><strong>AlarmManager:</strong> Hẹn giờ chạy một tác vụ trong tương lai (ví dụ báo thức). OS sẽ giữ PendingIntent và kích hoạt nó khi đồng hồ điểm.</li>
  <li><strong>AppWidget (Home Screen Widget):</strong> Khi người dùng tương tác với widget trên màn hình chính (Launcher process).</li>
</ol>

<h2>Hướng dẫn triển khai (Ví dụ Notification)</h2>

<pre data-lang="kotlin"><code>// 1. Tạo Intent bình thường muốn kích hoạt
val intent = Intent(context, NotificationDetailActivity::class.java).apply {
    putExtra("NOTIF_ID", 100)
    // Nếu app đang đóng, intent này sẽ mở app.
    // Nếu app đang mở, cần cờ để tránh tạo 2 màn hình giống nhau (hoặc xử lý ở onNewIntent)
    flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
}

// 2. Đóng gói vào PendingIntent
// RequestCode (ví dụ: 0) dùng để phân biệt các PendingIntent khác nhau
val pendingIntent: PendingIntent = PendingIntent.getActivity(
    context,
    0, // requestCode
    intent,
    PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
)

// 3. Đưa PendingIntent cho System UI qua NotificationCompat
val builder = NotificationCompat.Builder(context, CHANNEL_ID)
    .setSmallIcon(R.drawable.ic_notification)
    .setContentTitle("Tin nhắn mới")
    .setContentText("Bạn có 1 tin nhắn chưa đọc.")
    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
    // Ủy quyền cho System UI kích hoạt pendingIntent khi click
    .setContentIntent(pendingIntent) 
    .setAutoCancel(true)</code></pre></p>

<h2>Bảo mật và Flags (Cực kỳ quan trọng từ Android 12)</h2>

<p>Kể từ Android 12 (API 31), Google <strong>BẮT BUỘC</strong> bạn phải khai báo rõ ràng một PendingIntent là <strong>MUTABLE</strong> (có thể bị sửa đổi) hay <strong>IMMUTABLE</strong> (bất biến). Nếu quên, app sẽ crash ngay lập tức.</p>

<h2>Tại sao lại quan trọng? (Vấn đề bảo mật)</h2>

<p>Khi bạn đưa PendingIntent cho một app thứ 3 (không phải OS), app thứ 3 đó có thể cố tình lôi cái Intent bên trong ra, thay đổi Data/Action của nó để làm việc xấu (dưới danh nghĩa app của bạn).</p>

<h2>1. <code>PendingIntent.FLAG_IMMUTABLE</code> (Nên dùng 99% các trường hợp)</h2>

<p>- <strong>Ý nghĩa:</strong> Intent bên trong bị "đóng băng". Không ai có quyền thêm, bớt, sửa đổi data (<code>extras</code>) của nó trước khi nó được kích hoạt.<br>- <strong>Sử dụng:</strong> Cho Notification mở màn hình bình thường, AlarmManager chạy Service.</p>

<h2>2. <code>PendingIntent.FLAG_MUTABLE</code> (Chỉ dùng khi bắt buộc)</h2>

<p>- <strong>Ý nghĩa:</strong> Cho phép app nhận PendingIntent có quyền "nhét thêm" dữ liệu vào trước khi kích hoạt.<br>- <strong>Ví dụ bắt buộc dùng:</strong> Chức năng <strong>Direct Reply Notification</strong> (Trả lời tin nhắn trực tiếp ngay trên thanh thông báo). System UI cần nhét cái đoạn text người dùng vừa gõ vào Intent của bạn trước khi bắn về app của bạn. Nếu bạn đặt <code>IMMUTABLE</code>, System UI không thể nhét text vào được.</p>

<h2>3. Cờ cập nhật</h2>

<p>Thường dùng kèm với IMMUTABLE/MUTABLE:<br>- <code>FLAG_UPDATE_CURRENT</code>: Nếu đã có một PendingIntent giống hệt tồn tại, hãy giữ nguyên nó nhưng thay thế cái <code>extras</code> bên trong bằng cái mới nhất. Rất hay dùng cho Notification để khi có thông báo mới (cùng ID) thì data truyền đi không bị cũ.</p>

<h2>Tổng kết</h2>

<p>Nhắc đến PendingIntent, hãy nhớ ngay từ khóa <strong>"Ủy quyền"</strong>. Nó là cầu nối an toàn giúp các tiến trình hệ thống (OS, Launcher) có thể thực thi các hành động giùm ứng dụng của bạn ngay cả khi ứng dụng không còn tồn tại trên RAM. Hãy luôn tuân thủ nguyên tắc bảo mật: Mặc định luôn sử dụng <code>FLAG_IMMUTABLE</code> trừ khi có lý do thực sự chính đáng.</p>
    `
  },
  'data-store-key-value': {
    title: 'Key-Value Storage (SharedPreferences & DataStore)',
    summary: 'Hiểu chi tiết Key-Value Storage trong Android: bản chất và cơ chế hoạt động bên trong SharedPreferences lẫn Jetpack DataStore, vì sao DataStore thay thế SharedPreferences, khi nào dùng mỗi loại, triển khai chuẩn MVVM + Hilt + Coroutine/Flow cho cả XML và Compose, cùng testing, security và migration an toàn.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '45 phút',
    depth: 'deep-dive',
    tags: ['android', 'datastore', 'shared-preferences', 'key-value', 'preferences-datastore', 'proto-datastore', 'hilt', 'mvvm', 'flow', 'coroutines'],
    domain: 'Android',
    module: 'Session 05: Data Store, Thread & Networking',
    prerequisites: ['android.languages.kotlin', 'activity-lifecycle', 'session-05-overview'],
    related: ['data-store-room-arch', 'android.languages.kotlin'],
    learningOutcomes: [
      'Giải thích được bản chất Key-Value Storage và vị trí của nó trong hệ sinh thái lưu trữ Android.',
      'Hiểu được cơ chế hoạt động bên trong SharedPreferences (file XML, nạp toàn bộ vào RAM, apply vs commit) và các rủi ro gây mất dữ liệu.',
      'Hiểu được cơ chế hoạt động bên trong DataStore (file .preferences_pb, actor tuần tự, atomic write, Flow).',
      'So sánh chính xác SharedPreferences vs DataStore, biết khi nào dùng và khi nào tránh key-value storage.',
      'Triển khai được Preferences DataStore trong kiến trúc MVVM + Hilt + Coroutine/Flow cho cả XML và Compose.',
      'Áp dụng được các nguyên tắc security (mã hóa dữ liệu nhạy cảm), testing (JVM test với runTest) và migration an toàn từ SharedPreferences sang DataStore.'
    ],
    knowledgeGap: 'Nắm sai bản chất SharedPreferences dẫn đến ANR khi file XML lớn, mất token khi process bị giết giữa chừng ghi apply(), lưu dữ liệu nhạy cảm dạng plaintext, khai báo nhiều DataStore trỏ cùng một file gây crash, và gọi edit không qua coroutine làm UI block.',
    updatedAt: '2026-08-06',
    readTime: '45 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>App của bạn có một nhóm dữ liệu rất nhỏ nhưng sống dai: token đăng nhập, username, cờ "đã xem hướng dẫn lần đầu", theme user chọn, số lần mở app, ngôn ngữ hiển thị. Những dữ liệu này:</p>

<ul>
  <li><strong>Nhỏ</strong> — vài byte đến vài KB, không phải hàng nghìn dòng.</li>
  <li><strong>Không cần truy vấn</strong> — không bao giờ cần <code>WHERE</code>, <code>JOIN</code>, <code>ORDER BY</code>.</li>
  <li><strong>Cần tồn tại sau khi tắt app</strong> — không được mất khi process bị giết.</li>
  <li><strong>Cần đọc ngay khi app khởi động</strong> — ví dụ biết ngay user đã đăng nhập hay chưa để quyết định hiển thị màn hình nào.</li>
</ul>

<p>Lưu bằng database (Room) thì quá nặng nề cho việc này. Lưu bằng file thủ công thì phải tự lo serialization, đồng bộ ghi, đọc lại. Lưu bằng biến trong bộ nhớ thì mất khi app bị giết.</p>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Bản chất:</strong> Key-Value Storage giải quyết chính xác bài toán này: lưu <strong>một lượng nhỏ dữ liệu dạng cặp khóa → giá trị (key → value)</strong>, được hệ điều hành/framework lo phần ghi xuống ổ đĩa, tự khôi phục khi mở lại app.</div></div>

<h2>Key-Value Storage là gì?</h2>

<p>Key-Value Storage là mô hình lưu trữ trong đó mỗi dữ liệu được xác định bằng một <strong>key</strong> (khóa, dạng String) duy nhất và lưu một <strong>value</strong> (giá trị) tương ứng:</p>

<pre data-lang="text"><code>"user_token"   -&gt; "eyJhbGciOiJIUzI1NiJ9..."
"first_launch" -&gt; true
"theme"        -&gt; "dark"
"launch_count" -&gt; 12</code></pre>

<p>Đặc điểm bản chất:</p>

<ul>
  <li><strong>Truy cập theo khóa</strong>: muốn đọc dữ liệu phải biết key. Không có khái niệm tìm kiếm, sắp xếp, lọc.</li>
  <li><strong>Không có cấu trúc quan hệ</strong>: không liên kết giữa các mục với nhau.</li>
  <li><strong>Giá trị đơn giản</strong>: chỉ phù hợp kiểu dữ liệu nguyên thủy (String, Int, Long, Float, Boolean, Set&lt;String&gt;). Không phù hợp object phức tạp (muốn lưu object phải tự serialize sang String/JSON).</li>
  <li><strong>Toàn bộ được nạp vào bộ nhớ</strong>: mỗi lần đọc, toàn bộ tập key-value được nạp từ đĩa vào RAM một lần, sau đó truy cập trong RAM. Điều này nói lên lý do "không lưu dữ liệu lớn" — xem phần giới hạn.</li>
</ul>

<h3>Vị trí trong hệ sinh thái lưu trữ Android</h3>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Giải pháp</th>
      <th style="padding:8px 12px;text-align:left;">Loại dữ liệu phù hợp</th>
      <th style="padding:8px 12px;text-align:left;">Có truy vấn?</th>
      <th style="padding:8px 12px;text-align:left;">Async?</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Biến trong bộ nhớ (RAM)</td><td style="padding:8px 12px;">Dữ liệu tạm trong phiên chạy</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Không</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">SharedPreferences</td><td style="padding:8px 12px;">Key-value nhỏ</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Không (blocking)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">DataStore</td><td style="padding:8px 12px;">Key-value nhỏ</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Có (Flow, suspend)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Room (SQLite)</td><td style="padding:8px 12px;">Dữ liệu có cấu trúc, quan hệ, số lượng lớn</td><td style="padding:8px 12px;">Có</td><td style="padding:8px 12px;">Có</td></tr>
    <tr><td style="padding:8px 12px;">File / CacheDir</td><td style="padding:8px 12px;">Nội dung thô: ảnh, JSON lớn, PDF</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Tùy</td></tr>
  </tbody>
</table>

<p>Nguyên tắc chọn: <strong>dữ liệu càng có cấu trúc và càng lớn thì càng phải đi xuống phía dưới bảng</strong>. Key-value chỉ thích hợp hàng trên cùng.</p>

<h2>Các giải pháp Key-Value trong Android</h2>

<p>Trong hệ sinh thái Android tồn tại ba giải pháp chính cho bài toán key-value:</p>

<ol>
  <li><strong>SharedPreferences</strong> — giải pháp cổ điển, có từ API 1, vẫn hoạt động nhưng có nhiều hạn chế về mặt kỹ thuật.</li>
  <li><strong>DataStore</strong> (Preferences DataStore) — giải pháp hiện đại từ Jetpack, được Google khuyến nghị thay thế SharedPreferences, tích hợp sâu với coroutine và Flow.</li>
  <li><strong>MMKV (Tencent)</strong> — giải pháp bên thứ ba, hiệu năng rất cao nhờ memory-map, dùng khi cần tốc độ đọc/ghi cực nhanh (game, app nhạy hiệu năng).</li>
</ol>

<p>Bài này tập trung vào hai cái đầu — là kiến thức chuẩn của lộ trình. MMKV được nhắc để bạn biết nó tồn tại khi gặp trong các dự án thực tế.</p>

<h2>SharedPreferences hoạt động như thế nào?</h2>

<h3>Bản chất</h3>

<p>SharedPreferences lưu toàn bộ dữ liệu trong <strong>một file XML</strong> nằm trong vùng private của app, tại đường dẫn:</p>

<pre data-lang="text"><code>/data/data/&lt;package_name&gt;/shared_prefs/&lt;tên_file&gt;.xml</code></pre>

<p>Ví dụ file <code>user_prefs.xml</code> thực tế trên đĩa:</p>

<pre data-lang="xml"><code>&lt;?xml version='1.0' encoding='utf-8' standalone='yes' ?&gt;
&lt;map&gt;
    &lt;string name="user_token"&gt;eyJhbGciOiJIUzI1NiJ9...&lt;/string&gt;
    &lt;boolean name="first_launch" value="true" /&gt;
    &lt;string name="theme"&gt;dark&lt;/string&gt;
    &lt;int name="launch_count" value="12" /&gt;
&lt;/map&gt;</code></pre>

<h3>Cơ chế hoạt động</h3>

<div class="mermaid">
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
</div>

<ul>
  <li><strong>Lần đầu truy cập</strong>: file XML được đọc toàn bộ, parse thành một <code>Map</code> trong bộ nhớ, giữ nguyên cho tới khi app chết. Mọi thao tác đọc sau đó <strong>không chạm ổ đĩa</strong> — chỉ đọc từ RAM. Đây là lý do đọc SharedPreferences nhanh nhưng <strong>lần đầu tiên có thể chậm</strong> nếu file to.</li>
  <li><strong>Ghi</strong>: mọi thay đổi chỉ sửa trên bản <code>Map</code> trong RAM trước, sau đó mới quyết định ghi xuống đĩa qua <code>apply()</code> hoặc <code>commit()</code>.</li>
</ul>

<h3>apply() vs commit()</h3>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Đặc điểm</th>
      <th style="padding:8px 12px;text-align:left;">apply()</th>
      <th style="padding:8px 12px;text-align:left;">commit()</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Trả về</td><td style="padding:8px 12px;"><code>void</code> — ghi không đồng bộ</td><td style="padding:8px 12px;"><code>Boolean</code> — kết quả ghi thành công hay không</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Thread</td><td style="padding:8px 12px;">Ghi xuống đĩa trên background thread</td><td style="padding:8px 12px;"><strong>Ghi ngay trên thread đang gọi</strong>, chặn đến khi xong</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Trạng thái bộ nhớ</td><td style="padding:8px 12px;">Cập nhật bộ nhớ <strong>ngay lập tức</strong>, các đọc sau thấy giá trị mới</td><td style="padding:8px 12px;">Cập nhật bộ nhớ ngay</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Lỗi</td><td style="padding:8px 12px;">Lỗi ghi đĩa không được báo</td><td style="padding:8px 12px;">Trả <code>false</code> khi ghi thất bại</td></tr>
    <tr><td style="padding:8px 12px;">UI thread</td><td style="padding:8px 12px;">An toàn (ghi đĩa không chặn UI)</td><td style="padding:8px 12px;"><strong>Nguy hiểm</strong> — nếu gọi trên UI thread sẽ block UI khi file lớn</td></tr>
  </tbody>
</table>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Nguyên tắc thực tế:</strong> luôn dùng <code>apply()</code> khi chỉ cần ghi dữ liệu; chỉ dùng <code>commit()</code> khi bạn thực sự cần biết kết quả ghi (ví dụ: ghi rồi mới cho phép user thoát, cần chắc chắn dữ liệu đã lên đĩa).</div></div>

<h3>Ghi mất dữ liệu — vấn đề nghiêm trọng nhất</h3>

<p>Với <code>apply()</code>, hệ thống ghi file XML trên background. Nếu <strong>process của app bị giết ngay sau khi gọi <code>apply()</code></strong> (user giết app, crash, hệ thống thu hồi process), phần ghi đĩa chưa kịp hoàn thành thì dữ liệu mới <strong>bị mất</strong>, dù bộ nhớ đã có giá trị mới.</p>

<p>Điều này đặc biệt nguy hiểm với dữ liệu quan trọng như token, cờ trạng thái. DataStore ra đời có một trong những mục tiêu quan trọng nhất là loại bỏ rủi ro này — xem phần cơ chế transaction của DataStore.</p>

<h3>Vì sao SharedPreferences "không an toàn" trong thế giới hiện đại</h3>

<ol>
  <li><strong>Đọc chặn UI thread</strong>: lần truy cập đầu tiên phải parse toàn bộ file XML trên thread gọi — nếu là UI thread, app giật.</li>
  <li><strong>Không có cơ chế theo dõi thay đổi chuẩn</strong>: <code>OnSharedPreferenceChangeListener</code> không phân biệt được app process hay app khác (Multi-process) thay đổi, dễ dẫn đến bug phức tạp.</li>
  <li><strong>Không an toàn khi nhiều nơi ghi cùng lúc</strong>: hai <code>Editor</code> cùng ghi có thể ghi đè nhau.</li>
  <li><strong>Không có type safety</strong>: đọc sai kiểu (đọc <code>String</code> khi lưu <code>Int</code>) trả về default value im lặng — bug khó tìm.</li>
  <li><strong>Ghi mất dữ liệu</strong> khi process bị giết giữa chừng.</li>
  <li><strong>Không tích hợp coroutine/Flow</strong>: muốn lắng nghe thay đổi phải tự quản lý listener thủ công.</li>
</ol>

<h2>DataStore là gì?</h2>

<p>DataStore là thư viện Jetpack của Google, thay thế SharedPreferences, được xây dựng trên <strong>coroutine và Flow</strong>:</p>

<ul>
  <li><strong>Preferences DataStore</strong>: lưu dạng key-value, gần giống SharedPreferences nhưng mạnh hơn.</li>
  <li><strong>Proto DataStore</strong>: lưu dữ liệu có cấu trúc phức tạp hơn dùng Protocol Buffers (cần học ở bước nâng cao — bài này giới thiệu để bạn biết sự tồn tại).</li>
</ul>

<div class="mermaid">
flowchart TB
    DS[DataStore - Jetpack] --> PDS[Preferences DataStore<br/>key-value như SharedPreferences]
    DS --> PRDS[Proto DataStore<br/>Protocol Buffers, có schema]
</div>

<h3>Cơ chế hoạt động bên trong</h3>

<p>DataStore lưu dữ liệu trong một file nhị phân tên là <code>*.preferences_pb</code> (Protocol Buffers), nằm tại:</p>

<pre data-lang="text"><code>/data/data/&lt;package_name&gt;/files/datastore/user_prefs.preferences_pb</code></pre>

<p>Khác biệt cốt lõi nằm ở cách ghi:</p>

<div class="mermaid">
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
</div>

<ul>
  <li><strong>Đơn luồng xử lý (single actor)</strong>: mọi tác vụ đọc ghi đều đi qua một coroutine duy nhất xử lý tuần tự. Hai tác vụ ghi đồng thời <strong>không bao giờ</strong> ghi đè nhau — cái sau chờ cái trước hoàn thành. Đây chính là thứ SharedPreferences không làm được.</li>
  <li><strong>Ghi an toàn (atomic write)</strong>: DataStore ghi nội dung mới vào file tạm, sau đó <strong>rename nguyên tử</strong> (atomic rename) thành file chính. Nếu app bị giết giữa chừng, hoặc file hỏng vì bất kỳ lý do gì, file cũ vẫn nguyên vẹn — <strong>không mất dữ liệu đã ghi trước đó</strong>.</li>
  <li><strong>Đọc là Flow</strong>: mỗi lần có thay đổi, toàn bộ collector nhận dữ liệu mới tự động. Không cần listener thủ công.</li>
  <li><strong>Chống hỏng file</strong>: nếu DataStore phát hiện file hỏng khi đọc (corrupted), nó ném <code>IOException</code> — bạn bắt lỗi này và quyết định xóa file hỏng (xem phần triển khai).</li>
</ul>

<h3>Preferences DataStore vs Proto DataStore</h3>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tiêu chí</th>
      <th style="padding:8px 12px;text-align:left;">Preferences DataStore</th>
      <th style="padding:8px 12px;text-align:left;">Proto DataStore</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Cấu trúc</td><td style="padding:8px 12px;">Key-value tự do, không khai báo schema</td><td style="padding:8px 12px;">Có schema định nghĩa bằng <code>.proto</code> file</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Type safety</td><td style="padding:8px 12px;">Thấp (key tự khai báo, không kiểm tra kiểu toàn cục)</td><td style="padding:8px 12px;">Cao (tự sinh code từ schema, đọc ghi đúng kiểu bắt buộc)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Phù hợp</td><td style="padding:8px 12px;">Dữ liệu nhỏ, linh hoạt, ít thay đổi cấu trúc</td><td style="padding:8px 12px;">Dữ liệu có cấu trúc cố định, cần versioning schema</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Độ phức tạp</td><td style="padding:8px 12px;">Thấp — học nhanh</td><td style="padding:8px 12px;">Cao — phải học Protocol Buffers</td></tr>
    <tr><td style="padding:8px 12px;">Thay thế cho</td><td style="padding:8px 12px;">SharedPreferences</td><td style="padding:8px 12px;">Config phức tạp, model nhỏ</td></tr>
  </tbody>
</table>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Khuyến nghị:</strong> 90% nhu cầu key-value của một app thương mại (token, setting, cờ trạng thái) dùng Preferences DataStore là đủ. Proto DataStore chỉ cân nhắc khi dữ liệu có cấu trúc nghiêm túc cần schema. Bài này đi sâu Preferences DataStore.</div></div>

<h2>So sánh SharedPreferences vs DataStore</h2>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Tiêu chí</th>
      <th style="padding:8px 12px;text-align:left;">SharedPreferences</th>
      <th style="padding:8px 12px;text-align:left;">DataStore (Preferences)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Ghi mất dữ liệu</td><td style="padding:8px 12px;">Có thể mất khi process bị giết</td><td style="padding:8px 12px;">Không — atomic write</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Ghi đồng thời</td><td style="padding:8px 12px;">Không an toàn, dễ ghi đè</td><td style="padding:8px 12px;">An toàn — tuần tự qua actor</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Async</td><td style="padding:8px 12px;">Blocking (<code>commit</code>) hoặc best-effort (<code>apply</code>)</td><td style="padding:8px 12px;">Coroutine + Flow</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Theo dõi thay đổi</td><td style="padding:8px 12px;">Listener thủ công</td><td style="padding:8px 12px;">Flow, UI tự cập nhật</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Block UI thread</td><td style="padding:8px 12px;">Có thể (lần đọc đầu)</td><td style="padding:8px 12px;">Không</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Type safety</td><td style="padding:8px 12px;">Không</td><td style="padding:8px 12px;">Một phần (key kiểu rõ ràng)</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Hỗ trợ Google khuyến nghị</td><td style="padding:8px 12px;">Cũ, không còn khuyến nghị</td><td style="padding:8px 12px;">Hiện đại, được khuyến nghị</td></tr>
    <tr style="border-bottom:1px solid #21262d;"><td style="padding:8px 12px;">Hỗ trợ test</td><td style="padding:8px 12px;">Khó (phụ thuộc Android)</td><td style="padding:8px 12px;">Dễ (chạy trong JVM test)</td></tr>
    <tr><td style="padding:8px 12px;">File lưu trữ</td><td style="padding:8px 12px;">XML</td><td style="padding:8px 12px;"><code>.preferences_pb</code> (nhị phân)</td></tr>
  </tbody>
</table>

<h2>Khi nào nên dùng, khi nào không nên dùng</h2>

<h3>Nên dùng Key-Value Storage</h3>

<ul>
  <li>Token đăng nhập, refresh token (đã mã hóa — xem phần Security).</li>
  <li>Cài đặt UI: theme sáng/tối, ngôn ngữ, cỡ chữ.</li>
  <li>Cờ trạng thái: đã xem onboarding, đã tặng quà lần đầu.</li>
  <li>Bộ đếm nhỏ: số lần mở app, lần đánh giá gần nhất.</li>
  <li>Cache nhỏ không quan trọng: câu trả lời cuối của một trường nhập.</li>
</ul>

<h3>Không nên dùng Key-Value Storage</h3>

<ul>
  <li><strong>Dữ liệu lớn</strong>: file bị nạp toàn bộ vào RAM mỗi lần đọc — lưu 10MB vào DataStore sẽ làm app chậm. &gt; 100KB-1MB nên cân nhắc Room hoặc file.</li>
  <li><strong>Dữ liệu cần truy vấn</strong>: tìm kiếm, sắp xếp, lọc — đó là việc của Room.</li>
  <li><strong>Dữ liệu quan hệ</strong>: giỏ hàng, danh sách đơn hàng.</li>
  <li><strong>Dữ liệu nhạy cảm ở dạng plaintext</strong>: mật khẩu, token không mã hóa — phải dùng EncryptedSharedPreferences hoặc Keystore (xem Security).</li>
  <li><strong>Dữ liệu chỉ cần trong phiên làm việc</strong>: không cần bền vững thì để RAM (ViewModel, cache layer).</li>
</ul>

<h2>Triển khai thực tế: MVVM + Hilt + Coroutine/Flow</h2>

<h3>1. Thêm dependency</h3>

<pre data-lang="kotlin"><code>// app/build.gradle.kts
dependencies {
    implementation("androidx.datastore:datastore-preferences:1.1.1")

    // Đã có trong project dùng MVVM + Hilt:
    implementation("androidx.lifecycle:lifecycle-viewmodel-ktx:2.8.x")
    implementation("com.google.dagger:hilt-android:2.5x")
    kapt("com.google.dagger:hilt-compiler:2.5x")
}</code></pre>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Lưu ý phiên bản:</strong> kiểm tra phiên bản mới nhất tại <a href="https://developer.android.com/jetpack/androidx/releases/datastore" target="_blank" rel="noopener">developer.android.com/jetpack/androidx/releases/datastore</a>. Code trong bài dùng <code>1.1.1</code> — là phiên bản ổn định phổ biến tại thời điểm viết.</div></div>

<h3>2. Khai báo keys và DataStore</h3>

<p>Tạo file <code>UserPreferences.kt</code> — nơi duy nhất định nghĩa tên file và toàn bộ keys:</p>

<pre data-lang="kotlin"><code>package com.example.app.data.local

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

// Singleton DataStore cho toàn app — khai báo ở top-level
private val Context.userDataStore: DataStore&lt;Preferences&gt; by preferencesDataStore(
    name = "user_prefs"
)

object PrefsKeys {
    val USER_TOKEN = stringPreferencesKey("user_token")
    val DARK_MODE = booleanPreferencesKey("dark_mode")
    val FIRST_LAUNCH = booleanPreferencesKey("first_launch")
}</code></pre>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Tip:</strong> tên file <code>user_prefs</code> chỉ khai báo <strong>một lần</strong> ở cấp top-level. Khai báo lại <code>preferencesDataStore</code> với cùng tên ở nơi khác sẽ gây crash. Đây là lỗi phổ biến đầu tiên — xem phần Sai lầm thường gặp.</div></div>

<h3>3. Repository — đọc ghi duy nhất một nơi</h3>

<pre data-lang="kotlin"><code>package com.example.app.data.repository

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import com.example.app.data.local.PrefsKeys
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class UserPreferencesRepository(
    private val dataStore: DataStore&lt;Preferences&gt;
) {
    // Đọc — Flow: UI sẽ tự cập nhật khi dữ liệu đổi
    val userToken: Flow&lt;String?&gt; = dataStore.data
        .map { prefs -&gt; prefs[PrefsKeys.USER_TOKEN] }

    val isDarkMode: Flow&lt;Boolean&gt; = dataStore.data
        .map { prefs -&gt; prefs[PrefsKeys.DARK_MODE] ?: false }

    // Ghi — suspend, gọi từ coroutine
    suspend fun saveToken(token: String) {
        dataStore.edit { prefs -&gt;
            prefs[PrefsKeys.USER_TOKEN] = token
        }
    }

    suspend fun setDarkMode(enabled: Boolean) {
        dataStore.edit { prefs -&gt;
            prefs[PrefsKeys.DARK_MODE] = enabled
        }
    }

    suspend fun clearSession() {
        dataStore.edit { prefs -&gt;
            prefs.remove(PrefsKeys.USER_TOKEN)
        }
    }
}</code></pre>

<p><strong>Tại sao phải qua Repository mà không gọi DataStore trực tiếp trong ViewModel?</strong></p>

<ul>
  <li>ViewModel không nên biết chi tiết "dữ liệu lưu ở đâu" (DataStore, Room, network). Repository là ranh giới này.</li>
  <li>Dễ test: khi test ViewModel, chỉ cần fake Repository, không cần DataStore thật.</li>
  <li>Khi đổi cơ chế lưu (DataStore → nơi khác), chỉ sửa Repository, ViewModel không đổi.</li>
</ul>

<h3>4. Hilt module — cung cấp DataStore và Repository</h3>

<pre data-lang="kotlin"><code>package com.example.app.di

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import com.example.app.data.local.userDataStore
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
    ): DataStore&lt;Preferences&gt; = context.userDataStore

    @Provides
    @Singleton
    fun provideUserPreferencesRepository(
        dataStore: DataStore&lt;Preferences&gt;
    ): UserPreferencesRepository = UserPreferencesRepository(dataStore)
}</code></pre>

<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>Kiến trúc:</strong> Repository chỉ phụ thuộc <code>DataStore&lt;Preferences&gt;</code> thay vì <code>Context</code> — giảm phụ thuộc, dễ test JVM hơn. <code>userDataStore</code> (extension property) được truy cập duy nhất trong Hilt provider, sau đó mọi nơi khác nhận <code>DataStore</code> qua inject.</div></div>

<h3>5. ViewModel — đọc bằng StateFlow, ghi bằng coroutine</h3>

<pre data-lang="kotlin"><code>package com.example.app.ui.login

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.app.data.repository.UserPreferencesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class LoginViewModel @Inject constructor(
    private val prefsRepository: UserPreferencesRepository
) : ViewModel() {

    // Đọc: Flow từ DataStore -&gt; StateFlow để UI observe
    val userToken: StateFlow&lt;String?&gt; = prefsRepository.userToken
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = null
        )

    private val _isLoggedIn = MutableStateFlow(false)
    val isLoggedIn: StateFlow&lt;Boolean&gt; = _isLoggedIn.asStateFlow()

    fun saveSession(token: String) {
        viewModelScope.launch {
            prefsRepository.saveToken(token)
            _isLoggedIn.value = true
        }
    }

    fun logout() {
        viewModelScope.launch {
            prefsRepository.clearSession()
            _isLoggedIn.value = false
        }
    }
}</code></pre>

<p><strong>Mô phỏng luồng dữ liệu khi đọc — Ghi token → UI cập nhật:</strong></p>

<div class="mermaid">
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
    VM-->>UI: StateFlow isLoggedIn = true<br/>UI render màn hình chính
</div>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Điểm mấu chốt để hiểu:</strong> bạn <strong>không bao giờ tự gọi lại</strong> để lấy dữ liệu sau khi ghi. Ghi xong, DataStore tự đẩy dữ liệu mới qua Flow, Flow qua Repository, <code>stateIn</code> cập nhật StateFlow, UI tự render. Đây là sức mạnh của DataStore so với SharedPreferences — với SharedPreferences bạn phải tự đọc lại và tự notify.</div></div>

<h3>6. UI — Jetpack Compose</h3>

<pre data-lang="kotlin"><code>@Composable
fun LoginScreen(viewModel: LoginViewModel = hiltViewModel()) {
    val isLoggedIn by viewModel.isLoggedIn.collectAsStateWithLifecycle()

    if (isLoggedIn) {
        HomeScreen()
    } else {
        LoginForm(
            onLoginClick = { token -&gt; viewModel.saveSession(token) }
        )
    }
}</code></pre>

<h3>7. UI — XML (View hệ thống)</h3>

<pre data-lang="kotlin"><code>class LoginActivity : AppCompatActivity() {

    private val viewModel: LoginViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        // Đọc token ngay khi mở app — quyết định màn hình nào
        lifecycleScope.launch {
            viewModel.userToken.collect { token -&gt;
                if (token != null) {
                    startActivity(Intent(this@LoginActivity, HomeActivity::class.java))
                    finish()
                }
            }
        }
    }

    private fun onLoginClick(token: String) {
        viewModel.saveSession(token)
    }
}</code></pre>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Chú ý thời điểm đọc:</strong> với kiến trúc chuẩn, việc "mở app thấy màn hình nào" nên được quyết định ngay khi app khởi động (splash/logic trước khi render). Đọc <code>userToken</code> trong ViewModel và <code>collect</code> trong UI là cách chuẩn — không đọc đồng bộ trong <code>onCreate</code> kiểu cũ.</div></div>

<h3>8. Chống crash khi file hỏng (IOException)</h3>

<p>DataStore ném <code>IOException</code> khi file bị hỏng. Trong file dữ liệu key-value, xử lý chuẩn là <strong>xóa file hỏng và đọc lại từ đầu</strong>:</p>

<pre data-lang="kotlin"><code>val Context.userDataStore: DataStore&lt;Preferences&gt; by preferencesDataStore(
    name = "user_prefs",
    corruptionHandler = ReplaceFileCorruptionHandler { exception -&gt;
        // File hỏng -&gt; trả Preferences trống, DataStore tự tạo lại
        emptyPreferences()
    }
)</code></pre>

<p>Với trường hợp muốn giữ log để điều tra, xem <a href="https://developer.android.com/topic/libraries/architecture/datastore#handling-corruption" target="_blank" rel="noopener">DataStore corruption handling</a>.</p>

<h2>Security — token và dữ liệu nhạy cảm</h2>

<div class="callout callout-danger"><span class="callout-icon">🚫</span><div class="callout-body"><strong>Nguyên tắc số một:</strong> không bao giờ lưu <strong>dữ liệu nhạy cảm dạng plaintext</strong> vào SharedPreferences/DataStore thường.</div></div>

<p>Cấp độ xử lý tùy độ nhạy cảm:</p>

<ol>
  <li><strong>Không nhạy cảm</strong> (theme, ngôn ngữ, cờ): DataStore thường.</li>
  <li><strong>Nhạy cảm nhưng không tối mật</strong> (token đăng nhập): mã hóa — dùng <code>EncryptedSharedPreferences</code> (thư viện <code>androidx.security:security-crypto</code>) hoặc tự mã hóa bằng Android Keystore rồi lưu ciphertext vào DataStore.</li>
  <li><strong>Tối mật</strong> (mật khẩu, khóa API, refresh token dài hạn): cân nhắc <strong>không lưu trên thiết bị</strong> hoặc dùng giải pháp bảo mật mạnh hơn (Keystore + mã hóa bất đối xứng, secure element).</li>
</ol>

<p>Ví dụ cấu hình EncryptedSharedPreferences:</p>

<pre data-lang="kotlin"><code>// Cần dependency: androidx.security:security-crypto
val masterKey = MasterKey.Builder(context)
    .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
    .build()

val encryptedPrefs = EncryptedSharedPreferences.create(
    context,
    "secure_prefs",
    masterKey,
    EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
    EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
)</code></pre>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Lưu ý về security:</strong> <code>security-crypto</code> từng bị Google gắn cờ "not recommended for new projects" vào năm 2024 vì vấn đề bảo trì — hãy đọc <a href="https://issuetracker.google.com/issues/286337100" target="_blank" rel="noopener">thảo luận chính thức</a> trước khi quyết định cho project mới. Hướng thay thế được khuyến nghị: mã hóa bằng Android Keystore trực tiếp, hoặc lưu token trong hệ thống xác thực riêng (ví dụ: credential của các dịch vụ như Firebase Auth).</div></div>

<p>Ngoài mã hóa, đừng quên: <strong>tên key không nên chứa dữ liệu nhạy cảm</strong> và <strong>không log giá trị token</strong> khi debug.</p>

<h2>Xử lý lỗi ghi khi app bị giết</h2>

<div class="mermaid">
flowchart TD
    A[App gọi edit ghi token] --> B[DataStore ghi file tạm]
    B --> C{Rename nguyên tử thành công?}
    C -->|Có| D[Dữ liệu an toàn trên đĩa]
    C -->|Không - app bị giết giữa chừng| E[File cũ vẫn nguyên vẹn<br/>không mất dữ liệu trước đó]
    E --> F[Lần chạy sau: đọc dữ liệu từ file cũ hợp lệ]
</div>

<p>Đây là lý do DataStore không có vấn đề "ghi mất dữ liệu" như SharedPreferences <code>apply()</code> — thiết kế atomic rename đảm bảo hoặc là file mới hoàn chỉnh, hoặc file cũ còn nguyên. Không bao giờ có trạng thái "nửa file".</p>

<h2>Testing</h2>

<h3>Unit Test Repository với DataStore thật trên JVM</h3>

<p>DataStore chạy được trong JVM test (không cần thiết bị) — đây là lợi thế lớn so với SharedPreferences:</p>

<pre data-lang="kotlin"><code>class UserPreferencesRepositoryTest {

    private lateinit var dataStore: DataStore&lt;Preferences&gt;
    private lateinit var repository: UserPreferencesRepository

    @Before
    fun setUp() {
        // DataStore chạy trong test bằng TemporaryFolder — không đụng đĩa thật
        val tempDir = createTempDir()
        dataStore = PreferenceDataStoreFactory.create(
            scope = CoroutineScope(UnconfinedTestDispatcher()),
            produceFile = { tempDir.resolve("test.preferences_pb") }
        )
        repository = UserPreferencesRepository(dataStore)
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
}</code></pre>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Tip test:</strong> <code>runTest</code> (từ <code>kotlinx-coroutines-test</code>) là cách chuẩn để test suspend function. <code>UnconfinedTestDispatcher</code> giúp DataStore chạy trong test scope thay vì scope mặc định.</div></div>

<h3>Test ViewModel bằng fake Repository</h3>

<pre data-lang="kotlin"><code>class FakeUserPreferencesRepository : UserPreferencesRepository(/* fake dataStore */) {
    private val _token = MutableStateFlow&lt;String?&gt;(null)
    override val userToken: Flow&lt;String?&gt; = _token

    override suspend fun saveToken(token: String) {
        _token.value = token
    }
    // ...
}

class LoginViewModelTest {
    @Test
    fun test_saveSession_updatesLoginState() = runTest {
        val vm = LoginViewModel(FakeUserPreferencesRepository())
        vm.saveSession("abc123")

        assertEquals(true, vm.isLoggedIn.value)
        assertEquals("abc123", vm.userToken.value)
    }
}</code></pre>

<h2>Debug — xem dữ liệu đã lưu</h2>

<p>Trên thiết bị/máy ảo, dùng <strong>Device File Explorer</strong> trong Android Studio (View → Tool Windows → Device File Explorer):</p>

<pre data-lang="text"><code>data/data/com.example.app/files/datastore/user_prefs.preferences_pb
data/data/com.example.app/shared_prefs/user_prefs.xml   (nếu còn SharedPreferences)</code></pre>

<p>File <code>.preferences_pb</code> là nhị phân — không đọc được trực tiếp như XML. Cách debug hiệu quả:</p>

<ul>
  <li><strong>Log tại nơi đọc</strong>: log giá trị Flow phát ra khi thu thập (đừng log token thật trong production).</li>
  <li><strong>Bật logging DataStore</strong> trong debug: thêm log trong <code>edit</code> block để xem dữ liệu đang ghi gì.</li>
  <li><strong>Kiểm tra qua app</strong>: viết màn hình debug hiển thị toàn bộ key-value hiện có.</li>
</ul>

<h2>Sai lầm thường gặp</h2>

<h3>1. Khai báo preferencesDataStore nhiều lần với cùng tên file</h3>

<pre data-lang="kotlin"><code>// SAI — crash: "There are multiple DataStores active for the same file"
private val Context.userDataStore: DataStore&lt;Preferences&gt; by preferencesDataStore(name = "user_prefs")
private val Context.userDataStore2: DataStore&lt;Preferences&gt; by preferencesDataStore(name = "user_prefs")</code></pre>

<p><strong>Đúng</strong>: khai báo một lần duy nhất ở top-level (như phần triển khai), mọi nơi khác inject qua Hilt.</p>

<h3>2. Gọi edit trên UI thread mà không qua coroutine</h3>

<pre data-lang="kotlin"><code>// SAI — suspend function gọi ngoài coroutine sẽ không compile được
fun save(token: String) {
    dataStore.edit { it[KEY] = token }   // Compile error: suspend function
}

// ĐÚNG — luôn chạy trong viewModelScope / lifecycleScope
fun save(token: String) {
    viewModelScope.launch {
        dataStore.edit { it[KEY] = token }
    }
}</code></pre>

<h3>3. Đọc dữ liệu bằng .first() ở nhiều nơi thay vì observe Flow</h3>

<p>Nếu bạn cần "đọc một lần", <code>.first()</code> là hợp lệ — nhưng nếu bạn dùng nó để đồng bộ UI sau khi ghi, bạn sẽ rơi vào bug "UI không cập nhật". Luôn ưu tiên <code>collect</code>/<code>stateIn</code>.</p>

<h3>4. Lưu object lớn vào key-value bằng cách serialize JSON</h3>

<pre data-lang="kotlin"><code>// SAI — gói nguyên 1 model lớn vào key-value
prefs[USER_PROFILE] = Gson().toJson(largeProfileObject)

// ĐÚNG — dữ liệu có cấu trúc lớn phải dùng Room</code></pre>

<h3>5. Quên xử lý IOException khi đọc</h3>

<pre data-lang="kotlin"><code>// SAI — không chống crash khi file hỏng
val token = dataStore.data.map { it[KEY] }.first()

// ĐÚNG — bắt IOException (file hỏng) hoặc dùng corruptionHandler
try {
    val token = dataStore.data.map { it[KEY] }.first()
} catch (e: IOException) {
    Log.e(TAG, "DataStore corrupt", e)
}</code></pre>

<h3>6. Lưu mật khẩu/token dạng plaintext</h3>

<p>Đã trình bày ở phần Security — lưu plaintext token là lỗ hổng nghiêm trọng, app bị audit bảo mật sẽ bị từ chối.</p>

<h3>7. Giữ SharedPreferences cũ "chỉ để đỡ phải đổi"</h3>

<p>Project mới luôn dùng DataStore. Project cũ: migration dần (xem bên dưới), không xây thêm code mới trên SharedPreferences.</p>

<h2>Migration từ SharedPreferences sang DataStore</h2>

<p>Google cung cấp <code>SharedPreferencesMigration</code> để chuyển dữ liệu tự động:</p>

<pre data-lang="kotlin"><code>val Context.userDataStore by preferencesDataStore(
    name = "user_prefs",
    // Migration: đọc hết dữ liệu từ SharedPreferences cũ vào DataStore
    // rồi xóa file SharedPreferences cũ
    produceMigrations = { context -&gt;
        listOf(
            SharedPreferencesMigration(context, "old_shared_prefs_name")
        )
    }
)</code></pre>

<p><strong>Cách hiểu cơ chế</strong>:</p>

<ol>
  <li>Lần đầu DataStore chạy, nó đọc toàn bộ file XML cũ (<code>old_shared_prefs_name.xml</code>).</li>
  <li>Chuyển toàn bộ key-value sang file <code>.preferences_pb</code> mới.</li>
  <li>Xóa file SharedPreferences cũ.</li>
  <li>Từ đó, code mới đọc ghi hoàn toàn trên DataStore.</li>
</ol>

<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body"><strong>Tip migration thực tế:</strong> nếu app đã phát hành và user đang có dữ liệu, migration tự động này là cách an toàn nhất — không cần viết code chuyển đổi thủ công. Kiểm tra kỹ trên bản build có dữ liệu cũ trước khi phát hành.</div></div>

<h2>Vị trí trong hệ thống (System Thinking)</h2>

<p>Key-Value Storage không tồn tại độc lập — nó là một phần của <strong>Data Layer</strong> trong kiến trúc MVVM/Clean Architecture:</p>

<div class="mermaid">
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
</div>

<p>Vai trò của nó trong tổng thể:</p>

<ul>
  <li><strong>Lưu dữ liệu phiên &amp; cấu hình</strong>: token, session, setting — dữ liệu mà mọi UseCase cần biết khi xử lý nghiệp vụ (ví dụ: UseCase gọi API cần kèm token).</li>
  <li><strong>Cache nhanh</strong>: dữ liệu không quan trọng được đọc nhanh hơn network gấp nhiều lần — giúp app phản hồi ngay cả khi offline.</li>
  <li><strong>Tách khỏi UI</strong>: ViewModel không bao giờ đụng trực tiếp DataStore — mọi thứ qua Repository. Khi đổi cơ chế lưu trữ, UI và ViewModel không đổi.</li>
</ul>

<p>Tương tác với các tầng khác: Data Layer cung cấp <code>Flow</code> cho ViewModel; ViewModel biến thành <code>StateFlow</code> cho UI. Đây là luồng dữ liệu một chiều chuẩn MVVM — điều mà SharedPreferences (callback, thiếu Flow) không hỗ trợ tự nhiên.</p>

<h2>Học tiếp gì?</h2>

<ul>
  <li><strong>5.1.2 Relational Database (Room)</strong> — khi dữ liệu không còn là key-value mà cần truy vấn.</li>
  <li><strong>Session 06 — LiveData, ViewModel</strong> — cách quản lý StateFlow/Flow trong vòng đời ViewModel, <code>stateIn</code> chi tiết.</li>
  <li><strong>Session 07 — MVVM, Clean Architecture</strong> — chuẩn hóa Data Layer, Repository pattern sâu hơn.</li>
  <li><strong>Session 08 — Coroutines, Flow</strong> — hiểu sâu actor, channel, cách Flow hoạt động bên trong.</li>
  <li><strong>Proto DataStore</strong> — nâng cao khi cần schema nghiêm túc.</li>
</ul>

<h2>References</h2>

<ul>
  <li><a href="https://developer.android.com/topic/libraries/architecture/datastore" target="_blank" rel="noopener">DataStore — Android Developers</a></li>
  <li><a href="https://developer.android.com/jetpack/androidx/releases/datastore" target="_blank" rel="noopener">DataStore releases — Android Developers</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/datastore#preferences-datastore" target="_blank" rel="noopener">Preferences DataStore — Android Developers</a></li>
  <li><a href="https://developer.android.com/topic/libraries/architecture/datastore#handling-corruption" target="_blank" rel="noopener">DataStore corruption handling — Android Developers</a></li>
  <li><a href="https://developer.android.com/reference/android/content/SharedPreferences" target="_blank" rel="noopener">SharedPreferences — Android Developers</a></li>
  <li><a href="https://developer.android.com/training/data-storage" target="_blank" rel="noopener">Data and file storage overview — Android Developers</a></li>
  <li><a href="https://developer.android.com/training/dependency-injection/hilt-android" target="_blank" rel="noopener">Hilt dependency injection — Android Developers</a></li>
  <li><a href="https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-test/" target="_blank" rel="noopener">Testing coroutines — Kotlin</a></li>
  <li><a href="https://issuetracker.google.com/issues/286337100" target="_blank" rel="noopener">security-crypto issue tracker — Google</a></li>
</ul>
    `
  },
  'data-store-room-arch': {
    title: 'Relational Database (Room Architecture)',
    summary: 'Room Database bản chất là gì? Hiểu cách Room giao tiếp với SQLite C API bên dưới và cách triển khai kiến trúc Single Source of Truth để cache data lớn từ API dùng cho offline.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '15 phút',
    depth: 'deep-dive',
    tags: ['android', 'practical'],
    domain: 'Android',
    module: 'Session 05: Data Store & Networking',
    prerequisites: [],
    related: [],
    learningOutcomes: [],
    knowledgeGap: '',
    updatedAt: '2026-07-30',
    readTime: '15 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>DataStore (Key-Value) chỉ dành cho cấu hình đơn giản. Nhưng khi ứng dụng của bạn làm việc với dữ liệu có cấu trúc phức tạp và số lượng lớn: Danh sách 10,000 tin nhắn chat, giỏ hàng thương mại điện tử với hàng chục sản phẩm, hay lưu cache danh sách bài báo để đọc offline.</p>

<p>Để làm được việc này, thiết bị di động cần một Hệ quản trị cơ sở dữ liệu quan hệ (RDBMS). Android đã tích hợp sẵn <strong>SQLite</strong> (viết bằng C) trực tiếp vào nhân hệ điều hành.</p>

<p>Tuy nhiên, sử dụng SQLite API thuần trên Android là một ác mộng:<br>- Bạn phải tự viết câu query SQL dạng <code>String</code> (dễ gõ sai, chỉ biết lỗi khi chạy app - runtime error).<br>- Phải tự map (chuyển đổi) từ con trỏ <code>Cursor</code> sang Object của Java/Kotlin vô cùng dài dòng.<br>- Không hỗ trợ lắng nghe sự thay đổi của Database (Observability) một cách dễ dàng.</p>

<strong>Room Database</strong> sinh ra để giải quyết nỗi đau này.

<h2>Room Database thực chất là gì?</h2>

<p>Room <strong>KHÔNG PHẢI</strong> là một database mới. Nó là một lớp <strong>Abstraction Layer</strong> (Lớp trừu tượng) bọc bên ngoài SQLite.</p>

<p>Nói cách khác, dữ liệu cuối cùng vẫn được lưu vào file <code>.db</code> bằng SQLite C API. Nhưng thay vì bạn phải nói chuyện trực tiếp với SQLite bằng những câu lệnh thô sơ, bạn nói chuyện với Room bằng các Object Kotlin (ORM - Object Relational Mapping). Room sẽ tự động dịch các Object đó thành câu query SQL và ngược lại.</p>

<h2>Vì sao Room an toàn hơn SQLite thuần?</h2>

<p>- <strong>Compile-time verification:</strong> Nếu bạn gõ sai tên cột trong câu query <code>@Query("SELECT * FROM uses")</code> (sai chữ user), Room sẽ báo lỗi <strong>ngay lúc bạn ấn nút Build app</strong>. Bạn không bao giờ bị dính crash khi đem lên Production.<br>- <strong>Tự động Map:</strong> Nó tự động biến kết quả từ DB thành <code>List<User></code>.<br>- <strong>Hỗ trợ Coroutines/Flow:</strong> Truy vấn bất đồng bộ chỉ với từ khóa <code>suspend</code>, hoặc lắng nghe thay đổi tự động với <code>Flow</code>.</p>

<h2>3 Thành phần cốt lõi của Room</h2>

<p>Kiến trúc Room chia làm 3 lớp rất rõ ràng:</p>

<ol>
  <li><strong>Entity (Thực thể):</strong> Các Data Class định nghĩa cấu trúc bảng (Table).</li>
  <li><strong>DAO (Data Access Object):</strong> Interface chứa các hàm để tương tác (CRUD) với dữ liệu. (Lớp mapping).</li>
  <li><strong>Database:</strong> Lớp abstract kết nối Entities và DAOs lại với nhau, quản lý kết nối xuống file SQLite dưới đĩa.</li>
</ol>

<div class="mermaid">graph TD
    App[Ứng dụng / Repository] --> DAO
    DAO --> Database
    Database --> Entity1[Entity: User]
    Database --> Entity2[Entity: Product]
    Database -.-> SQLite[(SQLite C API)]</div>

<h2>Tư duy hệ thống: Single Source of Truth (SSOT)</h2>

<p>Trong kiến trúc hiện đại, Room thường được dùng làm <strong>Nguồn chân lý duy nhất (Single Source of Truth)</strong>.</p>

<p>Nghĩa là: Khi UI yêu cầu dữ liệu, Repository sẽ <strong>KHÔNG</strong> trả data từ API về thẳng cho UI. Thay vào đó:<br>1. Repository fetch data từ API.<br>2. Lưu thẳng data đó vào Room Database.<br>3. UI chỉ <code>collect</code> một cái <code>Flow</code> đang lắng nghe từ Room Database.</p>

<strong>Lợi ích khổng lồ:</strong>
- Ứng dụng <strong>tự động có chế độ Offline</strong>. Nếu mất mạng, UI vẫn hiển thị data đang có trong Room.
- Có mạng lại, API load xong ghi vào Room, Flow tự động "bắn" data mới lên UI mượt mà.

<h2>Hướng dẫn triển khai thực tế (MVVM + Flow)</h2>

<h2>1. Định nghĩa Entity (Table)</h2>

<pre data-lang="kotlin"><code>@Entity(tableName = "articles")<br>data class ArticleEntity(<br>    @PrimaryKey val id: String, // Khóa chính<br>    val title: String,<br>    val content: String,<br>    val timestamp: Long<br>)</code></pre>

<h2>2. Định nghĩa DAO (Query)</h2>

<p>Trọng tâm: Sử dụng <code>Flow</code> cho truy vấn đọc để UI tự động cập nhật, dùng <code>suspend</code> cho thao tác Ghi để chạy ngầm không block Main Thread.</p>

<pre data-lang="kotlin"><code>@Dao
interface ArticleDao {
    // Trả về Flow -&gt; Bất cứ khi nào bảng articles có sự thay đổi, 
    // Flow sẽ tự động emit List mới. UI không cần gọi lại hàm này!
    @Query("SELECT * FROM articles ORDER BY timestamp DESC")
    fun getAllArticles(): Flow&lt;List&lt;ArticleEntity&gt;&gt;

// Insert một list. REPLACE nghĩa là nếu trùng ID thì ghi đè bản mới
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertArticles(articles: List&lt;ArticleEntity&gt;)
    
    @Query("DELETE FROM articles")
    suspend fun clearAll()
}</code></pre></p>

<h2>3. Khởi tạo Database</h2>

<p>Dùng Singleton (qua Hilt/Dagger) để đảm bảo chỉ có 1 instance mở kết nối (kết nối DB rất tốn tài nguyên).</p>

<pre data-lang="kotlin"><code>@Database(entities = [ArticleEntity::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    abstract fun articleDao(): ArticleDao
    
    // Khởi tạo bằng Builder thường đặt trong Dependency Injection module
    // Room.databaseBuilder(context, AppDatabase::class.java, "my_database.db").build()
}</code></pre>

<h2>4. Repository: Mảnh ghép SSOT (Offline First)</h2>

<pre data-lang="kotlin"><code>class ArticleRepository(
    private val api: ArticleApi,
    private val dao: ArticleDao
) {
    // UI Lắng nghe luồng này
    val articles: Flow&lt;List&lt;ArticleEntity&gt;&gt; = dao.getAllArticles()

// Hàm gọi khi user vuốt pull-to-refresh hoặc mở app
    suspend fun syncDataFromApi() {
        try {
            // 1. Lấy từ mạng
            val networkArticles = api.fetchArticles()
            
            // 2. Chuyển đổi DTO -&gt; Entity (nếu cần)
            val entities = networkArticles.map { /<em> mapping </em>/ }
            
            // 3. Ghi vào Room. 
            // Vừa ghi xong, biến 'articles' Flow ở trên sẽ lập tức chớp data mới lên UI!
            dao.insertArticles(entities)
            
        } catch (e: Exception) {
            // Lỗi mạng, không sao cả, UI vẫn đang hiển thị data cũ từ Room
        }
    }
}</code></pre></p>

<h2>Tổng kết</h2>

<p>Room Database không phải để thay thế SQLite, mà nó <strong>nâng cấp trải nghiệm</strong> sử dụng SQLite. Việc kết hợp Room với Kotlin Flow và mô hình <strong>Single Source of Truth</strong> là "tiêu chuẩn vàng" để xây dựng một ứng dụng Android mượt mà, phản hồi nhanh và hoạt động trơn tru cả khi không có kết nối mạng.</p>
    `
  },
  'data-store-room-adv': {
    title: 'Advanced Room (Migration & Indexing)',
    summary: 'Kỹ thuật nâng cao trong Room Database. Hiểu cách viết Migration để bảo toàn dữ liệu người dùng khi cập nhật cấu trúc bảng, và kỹ thuật đánh Index tối ưu tốc độ truy vấn SQLite.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '15 phút',
    depth: 'deep-dive',
    tags: ['android', 'practical'],
    domain: 'Android',
    module: 'Session 05: Data Store & Networking',
    prerequisites: [],
    related: [],
    learningOutcomes: [],
    knowledgeGap: '',
    updatedAt: '2026-07-30',
    readTime: '15 phút',
    content: `
<h2>1. Bài toán Migration (Bảo toàn dữ liệu)</h2>

<h2>Vấn đề cần giải quyết</h2>

<p>Bạn phát hành App version 1. Người dùng đang sử dụng bình thường và đã lưu rất nhiều ghi chú (Notes) vào Room Database.<br>Tháng sau, bạn ra mắt App version 2. Bạn quyết định thêm một tính năng mới, yêu cầu phải thêm cột <code>is_pinned</code> vào bảng <code>notes</code>.</p>

<p>Nếu bạn chỉ sửa Code Entity rồi chạy app: <strong>App sẽ Crash ngay lập tức!</strong></p>

<p>Lý do: Cấu trúc Table khai báo trong Code (Version 2) không khớp với cấu trúc Table đang lưu thực tế trên đĩa của người dùng (Version 1). SQLite không cho phép điều này.</p>

<h2>Giải pháp: Migration</h2>

<p>Để giải quyết, bạn phải viết một kịch bản <strong>Migration</strong> (Di chuyển/Nâng cấp cấu trúc).<br>Migration là việc bạn ra lệnh cho SQLite: <em>"Này, hãy sửa cái bảng cũ, cắm thêm cột này vào cho tôi, và <strong>giữ nguyên dữ liệu cũ</strong> nhé."</em></p>

<h2>Hướng dẫn triển khai (Manual Migration)</h2>

<p>Giả sử nâng cấp từ Version 1 lên Version 2, thêm cột <code>is_pinned</code>.</p>

<strong>Bước 1: Sửa Entity và đổi Version</strong>
<pre data-lang="kotlin"><code>@Entity(tableName = "notes")
data class NoteEntity(
    @PrimaryKey val id: Int,
    val content: String,
    // CỘT MỚI THÊM VÀO
    @ColumnInfo(defaultValue = "0") // Phải có defaultValue để SQLite biết điền gì cho các dòng cũ
    val is_pinned: Boolean 
)

// Tăng version lên 2
@Database(entities = [NoteEntity::class], version = 2) 
abstract class AppDatabase : RoomDatabase() { ... }</code></pre></p>

<strong>Bước 2: Viết kịch bản Migration (SQL thuần)</strong>
<pre data-lang="kotlin"><code>val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(db: SupportSQLiteDatabase) {
        // Dùng câu lệnh ALTER TABLE của SQL để cắm thêm cột
        db.execSQL("ALTER TABLE notes ADD COLUMN is_pinned INTEGER NOT NULL DEFAULT 0")
    }
}</code></pre>

<strong>Bước 3: Nhúng vào Builder</strong>
<pre data-lang="kotlin"><code>Room.databaseBuilder(context, AppDatabase::class.java, "my_db.db")
    .addMigrations(MIGRATION_1_2) // Thêm kịch bản vào đây
    .build()</code></pre>

<div class="callout callout-success"><span class="callout-icon">💡</span><div class="callout-body"><strong>AutoMigration (Từ Room 2.4.0):</strong> Nếu bạn chỉ thêm cột đơn giản, Room hỗ trợ <code>@AutoMigration</code>. Bạn không cần tự viết câu SQL <code>ALTER TABLE</code> nữa, Room sẽ tự Gen cho bạn. Nhưng với những thay đổi phức tạp (đổi tên cột, tách bảng), bạn vẫn bắt buộc phải viết Manual Migration.</div></div>
---

<h2>2. Bài toán Indexing (Tối ưu tốc độ)</h2>

<h2>Vấn đề cần giải quyết</h2>

<p>Bạn có bảng <code>users</code> chứa <strong>1 triệu dòng</strong>.<br>Bạn muốn tìm tất cả những người có họ tên là "Nguyen Van A":<br><code>SELECT * FROM users WHERE full_name = 'Nguyen Van A'</code></p>

<p>Theo mặc định, SQLite sẽ làm hành động <strong>Full Table Scan</strong>: Nó phải lật từng dòng từ dòng 1 đến dòng 1.000.000 để tìm chữ "Nguyen Van A". Việc này vô cùng chậm và tốn CPU.</p>

<h2>Giải pháp: Index (Chỉ mục)</h2>

<p>Index giống như <strong>Mục lục của một cuốn sách</strong>. <br>Thay vì phải lật từng trang sách để tìm một từ, bạn lật ra mục lục ở cuối sách (đã được sắp xếp theo bảng chữ cái ABC), tìm từ đó, và mục lục sẽ chỉ cho bạn chính xác từ đó nằm ở trang số mấy.</p>

<p>Khi bạn đánh Index cho cột <code>full_name</code>, SQLite sẽ ngầm tạo ra một "Bảng mục lục" dạng Tree (B-Tree). Khi tìm kiếm, nó dò trên B-Tree chỉ tốn vài tích tắc (O(log n)), thay vì phải duyệt 1 triệu dòng (O(n)).</p>

<h2>Hướng dẫn triển khai</h2>

<p>Chỉ cần thêm khai báo <code>indices</code> trong Entity:</p>

<pre data-lang="kotlin"><code>@Entity(
    tableName = "users",
    indices = [
        Index(value = ["full_name"]), // Đánh index cho 1 cột tìm kiếm nhiều
        Index(value = ["email"], unique = true) // Đánh index và bắt buộc Email không được trùng nhau
    ]
)
data class UserEntity(
    @PrimaryKey val id: Int,
    val full_name: String,
    val email: String,
    val address: String
)</code></pre>

<h2>Đánh đổi (Trade-off) - Khi nào KHÔNG NÊN đánh Index?</h2>

<p>Đừng bao giờ đánh Index cho TẤT CẢ các cột.</p>

<div class="callout callout-warn"><span class="callout-icon">⚠️</span><div class="callout-body"><strong>Nhược điểm của Index:</strong><br>Mặc dù Index làm tốc độ <strong>Đọc (SELECT)</strong> cực kỳ nhanh, nhưng nó lại làm tốc độ <strong>Ghi (INSERT/UPDATE/DELETE)</strong> chậm đi. <br>Lý do: Cứ mỗi lần bạn chèn thêm 1 User mới vào bảng, SQLite phải tốn thời gian "cập nhật lại cái bảng Mục lục (Index)". <br>Ngoài ra, Index cũng làm file <code>.db</code> nặng hơn (tốn dung lượng lưu trữ).</div></div>
<strong>Best Practice:</strong>
- <strong>NÊN:</strong> Đánh index cho những cột thường xuyên xuất hiện sau chữ <code>WHERE</code> (tìm kiếm/lọc), <code>ORDER BY</code> (sắp xếp).
- <strong>KHÔNG NÊN:</strong> Đánh index cho những bảng quá nhỏ (dưới vài trăm dòng - lật từng trang sách mỏng còn nhanh hơn đi tìm mục lục), hoặc những bảng tần suất ghi/xóa dữ liệu quá nhiều nhưng lại ít khi đọc (Log table).
    `
  },
  'data-store-room-trans': {
    title: 'Async Transactions & Flow',
    summary: 'Giải quyết bài toán ghi dữ liệu phức tạp. Cách gom nhóm nhiều tác vụ bất đồng bộ (Coroutines) vào một Transaction để đảm bảo tính toàn vẹn dữ liệu (ACID) - Thành công tất cả hoặc Hủy toàn bộ.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '15 phút',
    depth: 'deep-dive',
    tags: ['android', 'practical'],
    domain: 'Android',
    module: 'Session 05: Data Store & Networking',
    prerequisites: [],
    related: [],
    learningOutcomes: [],
    knowledgeGap: '',
    updatedAt: '2026-07-30',
    readTime: '15 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>

<p>Trong thực tế dự án, hiếm khi bạn chỉ lưu dữ liệu vào 1 bảng duy nhất. Hãy xét bài toán <strong>Lưu đơn hàng (Checkout)</strong>:<br>1. Bạn phải trừ tiền trong bảng <code>Wallet</code>.<br>2. Bạn thêm 1 dòng vào bảng <code>Orders</code>.<br>3. Bạn thêm 5 dòng vào bảng <code>OrderDetails</code> (chi tiết sản phẩm mua).</p>

<p>Nếu làm theo cách thông thường, bạn chạy 3 hàm <code>insert/update</code> liên tiếp. <br>Nhưng nếu: Trừ tiền thành công, Lưu Order thành công, nhưng đến lúc lưu OrderDetails thì... <strong>Lỗi (điện thoại hết dung lượng hoặc sập nguồn)!</strong></p>

<p>Kết quả: Tiền của User đã bị trừ, Đơn hàng có tạo ra, nhưng không có thông tin sản phẩm. Dữ liệu bị rác, mâu thuẫn.</p>

<h2>Giải pháp: Transaction (Giao dịch)</h2>

<p>Database cung cấp cơ chế Transaction để đảm bảo tính nguyên vẹn (Nguyên lý ACID - All or Nothing). <br>Khi bạn bọc 3 bước trên vào 1 Transaction, hệ thống cam kết: <strong>Hoặc là cả 3 cùng thành công, hoặc nếu lỗi ở bất kỳ bước nào, toàn bộ quá trình sẽ bị Rollback (Quay ngược thời gian), tiền sẽ được cộng lại như chưa có gì xảy ra.</strong></p>

<h2>Vấn đề với Coroutines (Bất đồng bộ)</h2>

<p>Trước đây, khi code bằng Java, code chạy tuần tự nên Transaction rất dễ viết.<br>Nhưng với Kotlin Coroutines, các hàm suspend chạy bất đồng bộ (Thread bị tạm ngưng và nhường chỗ, thậm chí nhảy sang Thread khác). Việc đảm bảo Transaction trên môi trường Multi-threading là cực kỳ phức tạp (vì SQLite lock database theo từng Thread).</p>

<p>May mắn thay, Room Database đã giải quyết triệt để bài toán này cho bạn!</p>

<h2>Hướng dẫn triển khai</h2>

<p>Trong Room DAO, bạn chỉ cần dùng Annotation <code>@Transaction</code> đặt trước một hàm <code>suspend</code>. Room sẽ tự động bọc toàn bộ code bên trong hàm đó vào một Transaction an toàn của SQLite.</p>

<pre data-lang="kotlin"><code>@Dao
interface OrderDao {

// Các hàm lẻ
    @Update
    suspend fun updateWallet(wallet: WalletEntity)

@Insert
    suspend fun insertOrder(order: OrderEntity): Long // Trả về ID vừa tạo

@Insert
    suspend fun insertOrderDetails(details: List&lt;OrderDetailEntity&gt;)

// ==========================================
    // HÀM TRANSACTION GOM NHÓM
    // ==========================================
    @Transaction
    suspend fun processCheckout(
        wallet: WalletEntity, 
        order: OrderEntity, 
        details: List&lt;OrderDetailEntity&gt;
    ) {
        // Bước 1: Trừ tiền
        updateWallet(wallet)

// Bước 2: Tạo order
        val orderId = insertOrder(order)

// Bước 3: Gắn OrderId vào từng detail rồi lưu
        val detailsWithId = details.map { it.copy(orderId = orderId) }
        insertOrderDetails(detailsWithId)
        
        // NẾU CÓ BẤT KỲ EXCEPTION NÀO XẢY RA TRONG KHỐI NÀY, 
        // ROOM SẼ TỰ ĐỘNG ROLLBACK TẤT CẢ!
    }
}</code></pre></p>

<h2>Cách sử dụng trong Repository / ViewModel</h2>

<p>Dưới góc độ ViewModel, bạn chỉ gọi đúng 1 hàm <code>processCheckout</code>. Việc xử lý Transaction nặng nhọc đã được Room ẩn giấu (Encapsulation).</p>

<pre data-lang="kotlin"><code>class CheckoutViewModel(private val dao: OrderDao) : ViewModel() {

fun checkout(cartItems: List&lt;CartItem&gt;) {
        viewModelScope.launch {
            try {
                // Tạo data models...
                val wallet = WalletEntity(balance = 500)
                val order = OrderEntity(total = 100)
                val details = cartItems.map { OrderDetailEntity(...) }

// Gọi hàm Transaction
                dao.processCheckout(wallet, order, details)

// Nếu xuống được dòng này nghĩa là TẤT CẢ đã thành công!
                _uiState.value = CheckoutState.Success

} catch (e: Exception) {
                // Nếu lỗi, Room đã tự động Rollback Database. 
                // Ta chỉ việc báo lỗi lên UI.
                _uiState.value = CheckoutState.Error(e.message)
            }
        }
    }
}</code></pre></p>

<h2>Bonus: Kết hợp Flow lắng nghe nhiều bảng (Relational Fetching)</h2>

<p>Khi bạn muốn hiển thị một Đơn hàng KÈM theo Chi tiết đơn hàng, thay vì viết 2 câu Query rồi tự ghép lại bằng tay, bạn có thể định nghĩa một lớp Data Class bọc (Wrapper) chứa <code>@Relation</code>.</p>

<pre data-lang="kotlin"><code>// Data class này KHÔNG phải là @Entity, nó chỉ dùng để query
data class OrderWithDetails(
    @Embedded val order: OrderEntity, // Lấy toàn bộ info của Order
    
    @Relation(
        parentColumn = "id", // Khóa chính bảng Order
        entityColumn = "orderId" // Khóa ngoại bảng OrderDetail
    )
    val details: List&lt;OrderDetailEntity&gt; // Lấy danh sách Detail tương ứng
)</code></pre>

<strong>Trong DAO:</strong>
<pre data-lang="kotlin"><code>@Dao
interface OrderDao {
    // Phải có @Transaction vì Room chạy ngầm 2 câu query riêng biệt 
    // (1 cho Order, 1 cho Details). Cần Transaction để tránh dữ liệu bị 
    // chênh lệch trong lúc đang query.
    @Transaction
    @Query("SELECT * FROM orders WHERE id = :orderId")
    fun getOrderWithDetailsFlow(orderId: Long): Flow&lt;OrderWithDetails&gt;
}</code></pre>
Lợi ích: Chỉ với 1 Flow, UI của bạn sẽ tự động cập nhật ngay lập tức nếu dữ liệu của bảng <code>Order</code> HOẶC bảng <code>OrderDetail</code> bị thay đổi!

<h2>Tổng kết</h2>

<p>Đừng bao giờ chạy nhiều câu lệnh Insert/Update rời rạc nếu chúng thuộc về cùng một nghiệp vụ (Business Logic). Bọc chúng trong <code>@Transaction</code> để tránh rác dữ liệu. Kết hợp <code>@Transaction</code> cùng <code>suspend</code> và <code>Flow</code> biến Room trở thành công cụ xử lý bất đồng bộ Database mạnh mẽ nhất trên Android hiện nay.</p>
    `
  },

});

// Activity & Fragment topic aliases
ANDROID_CONTENT['android.component.activity.overview'] = ANDROID_CONTENT['activity-overview'];
ANDROID_CONTENT['android.component.fragment.overview'] = ANDROID_CONTENT['fragment-overview'];
ANDROID_CONTENT['android.component.fragment.lifecycle'] = ANDROID_CONTENT['fragment-lifecycle'];
ANDROID_CONTENT['android.component.fragment.state_changes'] = ANDROID_CONTENT['fragment-state-changes'];
ANDROID_CONTENT['android.component.fragment.fragment_manager'] = ANDROID_CONTENT['fragment-manager'];
ANDROID_CONTENT['android.component.fragment.dialog_and_dialogfragment'] = ANDROID_CONTENT['fragment-dialog'];
// Activity topic aliases
ANDROID_CONTENT['android.component.activity.state_changes'] = ANDROID_CONTENT['activity-state-changes'];
ANDROID_CONTENT['android.component.activity.task_and_backstack'] = ANDROID_CONTENT['activity-task-backstack'];
ANDROID_CONTENT['android.component.activity.parcelables_and_bundle'] = ANDROID_CONTENT['activity-parcelables-bundle'];
// Service topic alias
ANDROID_CONTENT['android.component.service.overview'] = ANDROID_CONTENT['android-service'];
ANDROID_CONTENT['android.component.service.google_service'] = ANDROID_CONTENT['google-service'];
// Broadcast Receiver topic alias
ANDROID_CONTENT['android.component.broadcast.overview'] = ANDROID_CONTENT['android-broadcast-receiver'];
// Content Provider topic alias
ANDROID_CONTENT['android.component.content_provider'] = ANDROID_CONTENT['content-provider'];
ANDROID_CONTENT['content_provider'] = ANDROID_CONTENT['content-provider'];

// Intent topic aliases
ANDROID_CONTENT['android.intent.explicit'] = ANDROID_CONTENT['intent-explicit'];

Object.assign(ANDROID_CONTENT, {

  'session-04-overview': {
    title: 'Session 04 Overview',
    summary: 'Tổng quan toàn bộ Session 04 — những gì session này cung cấp: Android Manifest, Build Types/Flavor/Plugin và các Application Components (Activity, Fragment, Services, Broadcast Receiver, Content Provider, Intent).',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '15 phút',
    depth: 'overview',
    tags: ['android', 'overview', 'session-04', 'manifest', 'components', 'intent'],
    domain: 'Android',
    module: 'Session 04: Android Manifest & Application Components',
    prerequisites: [],
    related: ['activity-overview', 'fragment-overview', 'build-types'],
    learningOutcomes: [
      'Hiểu được Session 04 cung cấp những mảng kiến thức nào.',
      'Nắm được vai trò của Android Manifest và nhóm Package/Build/Gradle.',
      'Nhận diện được 6 Application Components chính và trách nhiệm của từng loại.',
      'Biết thứ tự học hợp lý trong Session 04 và kiến thức cần chuẩn bị trước.'
    ],
    knowledgeGap: 'Người học bước vào Android mà không có bản đồ tổng quan dễ bị rối giữa quá nhiều khái niệm (Manifest, Activity, Fragment, Intent...), không biết học cái nào trước và mỗi thành phần đóng vai trò gì trong một ứng dụng hoàn chỉnh.',
    updatedAt: '2026-08-02',
    readTime: '15 phút',
    content: `
<h2>Session này cung cấp những gì?</h2>
<p>Session 04 là <strong>trái tim của Android development</strong>. Trước session này, bạn đã biết ngôn ngữ (Session 01), hệ điều hành (Session 02), phần cứng và kernel (Session 03). Session 04 kết nối tất cả lại: nó dạy bạn cách <strong>khai báo</strong> một ứng dụng với hệ điều hành và cách xây dựng ứng dụng từ các <strong>khối thành phần (Components)</strong> mà Android cung cấp sẵn.</p>
<p>Session 04 được chia thành <strong>2 mảng lớn</strong>:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Mảng</th>
      <th style="padding:8px 12px;text-align:left;">Mô tả</th>
      <th style="padding:8px 12px;text-align:left;">Bạn học được gì</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">4.1 Android Manifest</td>
      <td style="padding:8px 12px;">Khai báo ứng dụng với hệ điều hành + cách đóng gói</td>
      <td style="padding:8px 12px;">Manifest Tags, Build Types, Flavor, Plugin</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">4.2 Application Components</td>
      <td style="padding:8px 12px;">Các khối xây dựng nên ứng dụng</td>
      <td style="padding:8px 12px;">Activity, Fragment, Services, Broadcast Receiver, Content Provider, Intent</td>
    </tr>
  </tbody>
</table>

<h2>4.1 Android Manifest — Khai báo và đóng gói ứng dụng</h2>
<p><strong>Vấn đề:</strong> Hệ điều hành Android cần biết ứng dụng của bạn gồm những gì (màn hình nào, quyền gì, dịch vụ nào) trước khi cho phép nó chạy. Bạn cũng cần biết cách tạo ra các phiên bản app cho các môi trường khác nhau.</p>

<h3>4.1.1 Package, build, gradle</h3>
<ul>
  <li><strong>4.1.1.1 Build Types</strong> — Cấu hình các phiên bản build (debug, staging, release) qua Gradle: URL server khác nhau, bật/tắt log, ký khóa nào. Đây là kiến thức bắt buộc cho mọi dự án thực tế có nhiều môi trường.</li>
  <li><strong>4.1.1.2 Flavor</strong> — Tạo nhiều biến thể sản phẩm (Free/Paid, khách hàng khác nhau) từ cùng một mã nguồn.</li>
  <li><strong>4.1.1.3 Plugin</strong> — Hiểu cách AGP và các plugin Gradle được khai báo, nạp và mở rộng khả năng build.</li>
</ul>

<h3>4.1.2 Manifest Tags</h3>
<p>Học cách khai báo các thành phần trong <code>AndroidManifest.xml</code>: <code>&lt;application&gt;</code>, <code>&lt;activity&gt;</code>, <code>&lt;service&gt;</code>, <code>&lt;receiver&gt;</code>, <code>&lt;provider&gt;</code>, <code>&lt;permission&gt;</code> — và vì sao khai báo đúng là điều kiện tiên quyết để component hoạt động.</p>

<h2>4.2 Application Components — Các khối xây dựng ứng dụng</h2>
<p><strong>Vấn đề:</strong> Một ứng dụng Android không phải là một khối code duy nhất. Nó được tạo nên từ các <strong>component</strong> do hệ điều hành quản lý. Mỗi loại component có một mục đích, vòng đời và cách giao tiếp riêng. Session này dạy bạn sử dụng đúng từng loại.</p>

<h3>Các loại component chính</h3>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
      <th style="padding:8px 12px;text-align:left;">Component</th>
      <th style="padding:8px 12px;text-align:left;">Vai trò</th>
      <th style="padding:8px 12px;text-align:left;">Ví dụ thực tế</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Activity</td>
      <td style="padding:8px 12px;">Màn hình UI mà người dùng tương tác</td>
      <td style="padding:8px 12px;">Màn hình đăng nhập, màn hình chi tiết sản phẩm</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Fragment</td>
      <td style="padding:8px 12px;">Phần UI tái sử dụng bên trong Activity</td>
      <td style="padding:8px 12px;">Panel danh sách + panel chi tiết trên tablet</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Service</td>
      <td style="padding:8px 12px;">Xử lý nền không có giao diện</td>
      <td style="padding:8px 12px;">Phát nhạc, tải file, đồng bộ dữ liệu</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Broadcast Receiver</td>
      <td style="padding:8px 12px;">Lắng nghe sự kiện toàn hệ thống</td>
      <td style="padding:8px 12px;">Nhận tin nhắn, báo pin yếu, sự kiện mạng</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Content Provider</td>
      <td style="padding:8px 12px;">Chia sẻ dữ liệu giữa các ứng dụng</td>
      <td style="padding:8px 12px;">Đọc danh bạ, lịch, chia sẻ dữ liệu với app khác</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;font-weight:600;">Intent</td>
      <td style="padding:8px 12px;">"Tin nhắn" để yêu cầu hành động và truyền dữ liệu giữa các component</td>
      <td style="padding:8px 12px;">Mở màn hình, gọi điện, mở link</td>
    </tr>
  </tbody>
</table>

<h3>Chi tiết từng mảng con</h3>
<ul>
  <li><strong>4.2.1 Activity</strong> — Nền tảng của UI: lifecycle (4.2.1.1), cách phản ứng với state change (4.2.1.2), Task & Back Stack (4.2.1.3), truyền dữ liệu qua Parcelables/Bundle (4.2.1.4).</li>
  <li><strong>4.2.2 Fragment</strong> — UI tái sử dụng và linh hoạt: lifecycle (4.2.2.1), state changes (4.2.2.2), quản lý bằng FragmentManager (4.2.2.3), Dialog và DialogFragment (4.2.2.4).</li>
  <li><strong>4.2.3 Android Services</strong> — Android Service (4.2.3.1), Google Service (4.2.3.2), Advertisements (4.2.3.3).</li>
  <li><strong>4.2.4 Broadcast Receiver</strong> — Lắng nghe và phản hồi sự kiện hệ thống.</li>
  <li><strong>4.2.5 Content Provider</strong> — Chia sẻ và truy cập dữ liệu giữa các ứng dụng.</li>
  <li><strong>4.2.6 Intent</strong> — Ngôn ngữ giao tiếp giữa các component: Explicit (4.2.6.1), Implicit (4.2.6.2), Intent Filters (4.2.6.3), xử lý Intent (4.2.6.4), truyền dữ liệu (4.2.6.5), Pending Intent (4.2.6.6).</li>
</ul>

<h2>Các thành phần tương tác với nhau như thế nào?</h2>
<p>Trong một ứng dụng thực tế, các component phối hợp với nhau liên tục:</p>
<div class="mermaid">
flowchart TD
    U[User] -->|Tương tác| A[Activity]
    A -->|Chứa / Hiển thị| F[Fragment]
    A -->|Khởi động nền| S[Service]
    A -->|Yêu cầu hành động / truyền dữ liệu| I[Intent]
    I -->|Kích hoạt| A2[Activity khác]
    I -->|Kích hoạt| R[Broadcast Receiver]
    A -->|Đọc / ghi dữ liệu| CP[Content Provider]
    S -->|Thông báo kết quả| R
    R -->|Cập nhật| A
</div>
<p><strong>Tóm tắt luồng:</strong> Người dùng tương tác với <code>Activity</code> → Activity dùng <code>Fragment</code> để dựng UI phức tạp → khi cần giao tiếp, mọi component đều thông qua <code>Intent</code> → <code>Service</code> làm việc nền và báo kết quả qua <code>Broadcast Receiver</code> → dữ liệu được truy cập qua <code>Content Provider</code>.</p>

<h2>Nên học theo thứ tự nào?</h2>
<p>Để tránh bị rối, hãy học Session 04 theo thứ tự sau:</p>
<ol>
  <li><strong>4.1.1.1 Build Types</strong> — bắt đầu nhẹ nhàng, học cách build app ở nhiều môi trường.</li>
  <li><strong>4.1.2 Manifest Tags</strong> — hiểu cách khai báo trước khi học từng component.</li>
  <li><strong>4.2.1 Activity</strong> — nền tảng UI, học trước tiên.</li>
  <li><strong>4.2.6 Intent</strong> — học ngay sau Activity vì mọi giao tiếp đều cần Intent.</li>
  <li><strong>4.2.2 Fragment</strong> — sau khi đã rõ Activity.</li>
  <li><strong>4.2.3 Services, 4.2.4 Broadcast Receiver, 4.2.5 Content Provider</strong> — các component nền và chia sẻ dữ liệu.</li>
  <li><strong>4.1.1.2 Flavor, 4.1.1.3 Plugin</strong> — nâng cao, học cuối cùng khi đã quen với build.</li>
</ol>

<h2>Kiến thức nền cần chuẩn bị</h2>
<ul>
  <li><strong>Kotlin cơ bản</strong> (Session 01) — đọc hiểu code component.</li>
  <li><strong>Cách hệ điều hành quản lý tiến trình</strong> (Session 02) — hiểu vì sao component có lifecycle.</li>
  <li><strong>Kiến thức về APK/AAB</strong> (Session 01, phần Output Packages) — hiểu đầu ra của quá trình build.</li>
</ul>

<h2>Tổng kết</h2>
<p>Session 04 cung cấp <strong>toàn bộ bộ khung (framework) để xây dựng một ứng dụng Android hoàn chỉnh</strong>: từ khai báo ứng dụng với hệ điều hành (Manifest), quản lý các phiên bản build (Build Types/Flavor/Plugin), đến 6 loại component và cách chúng giao tiếp qua Intent. Đây là session quan trọng nhất để chuyển từ "biết ngôn ngữ" sang "biết xây app".</p>

<h2>Học tiếp</h2>
<p>Sau khi nắm vững các Application Components, bạn sẽ chuyển sang lưu trữ dữ liệu và networking trong Session 05.</p>

<h2>Nguồn tham khảo</h2>
<ul>
  <li><a href="https://developer.android.com/guide/components/fundamentals">Android Developers — Application Fundamentals</a></li>
  <li><a href="https://developer.android.com/guide/topics/manifest/manifest-intro">Android Developers — App Manifest Overview</a></li>
  <li><a href="https://developer.android.com/build/build-variants">Android Developers — Configure build variants</a></li>
  <li><a href="https://developer.android.com/guide/components/intents-filters">Android Developers — Intent and intent filters</a></li>
</ul>
`
  }
});



