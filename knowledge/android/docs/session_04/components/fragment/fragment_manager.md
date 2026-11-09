---
id: android.component.fragment.fragment_manager
title: FragmentManager
summary: FragmentManager là đối tượng mà mỗi host (Activity hoặc Fragment cha) sở hữu để thêm, xoá, thay thế, ẩn/hiện Fragment qua FragmentTransaction, giữ back stack gồm các transaction đó và đưa từng Fragment đi qua lifecycle đồng bộ với host. Bài giải thích transaction và chiến lược commit, back stack, chuyển tab bằng show/hide, giao tiếp giữa các Fragment, Child Fragment và khi nào chuyển sang Navigation Component.
status: published
difficulty: intermediate
depth: deep-dive
estimated_reading_time: 35 phút
tags: [android, fragment, fragment-manager, navigation, mvvm]
prerequisites: [android.component.fragment.lifecycle, android.component.fragment.state_changes]
related: [android.component.activity.lifecycle, android.component.activity.task_and_backstack]
learning_outcomes:
  - Giải thích được vai trò và cơ chế hoạt động của FragmentManager trong hệ thống Fragment.
  - Phân biệt được FragmentTransaction, Back Stack và các chiến lược commit.
  - Áp dụng được các pattern giao tiếp giữa các Fragment (Shared ViewModel, Fragment Result API) và Child Fragment cho nested navigation.
  - Biết khi nào dùng FragmentManager trực tiếp và khi nào dùng Navigation Component.
  - Nhận diện được các lỗi phổ biến khi làm việc với FragmentManager và cách tránh.
knowledge_gap: >
  Không hiểu FragmentManager dẫn đến crash IllegalStateException khi commit sau onSaveInstanceState, Fragment overlapping khi dùng sai add/replace, memory leak do communication sai pattern, và không kiểm soát được Back Stack trong các trường hợp phức tạp.
---

# FragmentManager

## Vấn đề cần giải quyết

Trước Android 3.0 (API 11), Activity là đơn vị UI duy nhất. Khi cần hiển thị nhiều màn hình trong cùng một Activity, lập trình viên phải:

- Tự quản lý View hierarchy phức tạp.
- Tự xử lý vòng đời của từng phần UI.
- Tự đồng bộ trạng thái khi cấu hình thay đổi.
- Không có cơ chế tái sử dụng UI giữa các Activity.

Fragment chia màn hình thành nhiều phần có vòng đời riêng, nhưng Fragment không tự quản lý chính mình. Nó không thể tự thêm vào UI, tự thay thế Fragment khác, hay tự quay lại Fragment trước. Tất cả những thao tác này đều cần một "người quản lý", đó chính là FragmentManager.

FragmentManager giải quyết 3 vấn đề cốt lõi:

**1. Tách biệt trách nhiệm quản lý**

Activity không cần biết chi tiết về vòng đời của từng Fragment. FragmentManager đảm nhận vai trò "quản lý vòng đời thay mặt Activity".

**2. Cung cấp API thống nhất cho thao tác UI**

Thay vì thao tác View trực tiếp (addView, removeView), FragmentManager cung cấp FragmentTransaction - một API bậc cao, an toàn hơn, có hỗ trợ Back Stack.

**3. Tự động xử lý cấu hình thay đổi**

FragmentManager tự động lưu trữ và khôi phục trạng thái của Fragment khi Activity bị destroy và recreate (do rotation, dark mode...).

Hiểu FragmentManager là nền tảng để hiểu tại sao Jetpack Navigation Component hoạt động được, bởi Navigation Component là abstraction layer phía trên FragmentManager.

## Sau khi học xong

- Giải thích được vai trò và cơ chế hoạt động của FragmentManager trong hệ thống Fragment.
- Phân biệt được FragmentTransaction, Back Stack và các chiến lược commit.
- Áp dụng được các pattern giao tiếp giữa các Fragment (Shared ViewModel, Fragment Result API) và Child Fragment cho nested navigation.
- Biết khi nào dùng FragmentManager trực tiếp và khi nào dùng Navigation Component.
- Nhận diện được các lỗi phổ biến khi làm việc với FragmentManager và cách tránh.

## FragmentManager là gì?

**FragmentManager** là đối tượng mà mỗi host (Activity hoặc Fragment cha) sở hữu để thực hiện thao tác trên các Fragment của nó: thêm, xoá, thay thế, ẩn/hiện qua `FragmentTransaction`, giữ back stack gồm các transaction đó, và đưa từng Fragment đi qua lifecycle đồng bộ với host.

Mental model: FragmentManager là **người giữ sổ giao dịch** của host. Mỗi `FragmentTransaction` là một phiếu ghi nhiều thao tác (`add`, `replace`, `hide`…) được thực hiện cùng nhau; `addToBackStack()` cất phiếu đó vào chồng sổ; nhấn Back là lấy phiếu trên cùng ra và làm ngược từng thao tác trên phiếu. Fragment không tự thêm hay tự gỡ mình, nó chỉ đổi trạng thái theo phiếu mà người giữ sổ thực thi.

## Cách hoạt động

### Kiến trúc tổng thể

FragmentManager là thành phần trung tâm trong hệ thống Fragment của Android, chịu trách nhiệm:

- **Quản lý vòng đời** của tất cả Fragment trong Activity.
- **Thực hiện các thao tác** (thêm, xóa, thay thế, ẩn/hiện) thông qua FragmentTransaction.
- **Quản lý Back Stack** - điều hướng ngược qua các Fragment.
- **Tìm kiếm Fragment** theo ID hoặc tag.
- **Phối hợp với Activity** để đồng bộ trạng thái khi cấu hình thay đổi (rotation, dark mode...).

```mermaid
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
```
<!-- dd: fmg-tree-a -->
<!-- dd: fmg-tree-b -->

FragmentManager hoạt động như một **trung gian** giữa Activity và các Fragment:

1. **Activity** yêu cầu FragmentManager thực hiện thao tác (thêm Fragment, chuyển Fragment...).
2. **FragmentManager** tạo FragmentTransaction, thực thi thao tác.
3. **FragmentManager** cập nhật Back Stack nếu cần.
4. **FragmentManager** đồng bộ vòng đời của tất cả Fragment với Activity.

### Lấy FragmentManager từ Activity hoặc Fragment cha

FragmentManager không phải là một class bạn tự khởi tạo. Nó được cung cấp bởi Activity hoặc Fragment cha thông qua:

```kotlin
// Trong Activity
val fragmentManager = supportFragmentManager

// Trong Fragment (để quản lý Child Fragment)
val childFragmentManager = childFragmentManager

// Trong Fragment (để truy cập FragmentManager của Activity cha)
val parentFragmentManager = parentFragmentManager
```

### Vòng đời phối hợp

FragmentManager đảm bảo vòng đời của Fragment luôn đồng bộ với Activity:

```mermaid
sequenceDiagram
    participant A as Activity
    participant FM as FragmentManager
    participant F as Fragment
    
    A->>FM: onCreate() (Activity CREATED)
    FM->>F: onAttach() → onCreate()
    FM->>F: onCreateView() → onViewCreated()
    Note over F: Tối đa CREATED, chưa vượt Activity
    A->>FM: onStart() (Activity STARTED)
    FM->>F: onStart()
    A->>FM: onResume() (Activity RESUMED)
    FM->>F: onResume()

    Note over A,F: Activity running

    A->>FM: onPause()
    FM->>F: onPause()
    A->>FM: onStop()
    FM->>F: onStop()
    A->>FM: onDestroy()
    FM->>F: onDestroyView() → onDestroy() → onDetach()
```

FragmentManager gọi các callback vòng đời của Fragment **theo đúng thứ tự** và **đồng bộ với Activity**: Fragment không bao giờ ở trạng thái cao hơn Activity chứa nó, nên chỉ lên `STARTED`/`RESUMED` sau khi chính Activity đã `onStart()`/`onResume()`. Nếu Activity ở trạng thái `RESUMED`, Fragment cũng sẽ ở `RESUMED`.

### FragmentTransaction: thao tác với Fragment

#### FragmentTransaction là gì?

FragmentTransaction là một **đối tượng mô tả một loạt thao tác** sẽ thực hiện trên Fragment. Nó tuân theo pattern **Builder** và **Command**.

```kotlin
supportFragmentManager.beginTransaction()
    .add(R.id.container, ProfileFragment())
    .addToBackStack(null)
    .commit()
```

Mỗi FragmentTransaction có thể chứa nhiều thao tác:

- `add()`: Thêm Fragment vào container.
- `replace()`: Xóa Fragment cũ, thêm Fragment mới.
- `remove()`: Xóa Fragment khỏi container.
- `hide()`: Ẩn View của Fragment (không xóa khỏi bộ nhớ, lifecycle không đổi).
- `show()`: Hiển thị Fragment đã ẩn.
- `setMaxLifecycle()`: Giới hạn trạng thái lifecycle cao nhất mà Fragment được lên (ví dụ tab đang ẩn chỉ lên tới `STARTED`).
- `attach()`: Attach Fragment đã detach.
- `detach()`: Detach Fragment (xóa View, giữ instance).
- `setReorderingAllowed(true)`: Cho phép tối ưu thứ tự thực thi.

#### add vs replace - Khi nào dùng cái nào?

```kotlin
// add: Fragment cũ VẪN CÒN dưới Fragment mới (stacking)
supportFragmentManager.beginTransaction()
    .add(R.id.container, FragmentB())
    .addToBackStack(null)
    .commit()

// replace: Fragment cũ BỊ XÓA, Fragment mới thay thế
supportFragmentManager.beginTransaction()
    .replace(R.id.container, FragmentB())
    .addToBackStack(null)
    .commit()
```

**Quy tắc thực tế:** Trong đa số trường hợp navigation, dùng `replace()` + `addToBackStack()`. Chỉ dùng `add()` khi cần nhiều Fragment cùng hiển thị (ví dụ: multi-pane layout trên tablet).

#### Dùng `setReorderingAllowed(true)` cho nhiều thao tác

```kotlin
supportFragmentManager.beginTransaction()
    .setReorderingAllowed(true)
    .hide(currentFragment)
    .add(R.id.container, newFragment)
    .commit()
```

`setReorderingAllowed(true)` cho phép FragmentManager **tối ưu thứ tự thực thi**, tránh việc Fragment bị create/destroy không cần thiết.

#### Commit vs CommitAllowingStateLoss

```kotlin
// Cách 1: Commit thông thường
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
    .commitNow()
```

**Khi nào dùng cái nào?**

- `commit()`: Mặc định, an toàn. Thao tác được thực hiện bất đồng bộ trong message queue.
- `commitAllowingStateLoss()`: Cho phép commit cả **sau** khi Activity đã lưu state (sau `onSaveInstanceState()`), chấp nhận transaction có thể bị mất nếu Activity bị kill rồi khôi phục từ state đã lưu.
- `commitNow()`: Thực thi đồng bộ. Hữu ích khi cần Fragment đã sẵn sàng ngay sau khi commit. Không dùng chung với `addToBackStack()`: `commitNow()` ném `IllegalStateException` nếu transaction đã yêu cầu vào back stack.

#### Animation và Transition

```kotlin
supportFragmentManager.beginTransaction()
    .setCustomAnimations(
        R.anim.slide_in_right,  // enter
        R.anim.slide_out_left,  // exit
        R.anim.slide_in_left,   // popEnter
        R.anim.slide_out_right  // popExit
    )
    .replace(R.id.container, fragment)
    .addToBackStack(null)
    .commit()
```

Animation được áp dụng cho cả 2 chiều:
- **Forward**: Khi thêm Fragment mới (enter/exit).
- **Backward**: Khi pop Fragment khỏi Back Stack (popEnter/popExit).

### Back Stack: điều hướng ngược

#### Back Stack là gì?

Back Stack là một **ngăn xếp các FragmentTransaction**. Khi người dùng nhấn Back, FragmentManager sẽ **pop** transaction gần nhất ra khỏi Back Stack và **đảo ngược** thao tác.

```mermaid
graph LR
    A[Transaction 1] --> B[Transaction 2]
    B --> C[Transaction 3]
    C --> D[Top of Stack]
    
    style D fill:#ff6b6b
    style A fill:#51cf66
```
<!-- dd: fmg-tx -->

#### addToBackStack()

```kotlin
supportFragmentManager.beginTransaction()
    .replace(R.id.container, ProfileFragment())
    .addToBackStack("profile")  // Tag để nhận diện
    .commit()
```

**Quan trọng**: `addToBackStack()` lưu **transaction** (danh sách thao tác để đảo ngược). Fragment bị `replace` không bị hủy: View bị hủy, instance được giữ và dừng ở `CREATED` để khi pop thì gắn lại đúng instance đó. Chi tiết ở [Fragment Lifecycle](lifecycle.md), mục "Lifecycle khi Fragment vào backstack". Khi pop, FragmentManager sẽ **đảo ngược** thao tác:

- Nếu transaction là `add()` → pop sẽ `remove()`.
- Nếu transaction là `replace()` → pop sẽ khôi phục Fragment cũ.
- Nếu transaction là `remove()` → pop sẽ `add()` lại.

#### popBackStack()

```kotlin
// Pop 1 transaction
supportFragmentManager.popBackStack()

// Pop đến tag cụ thể
supportFragmentManager.popBackStack("profile", 0)

// Pop đến tag, bao gồm cả tag đó
supportFragmentManager.popBackStack("profile", POP_BACK_STACK_INCLUSIVE)

// Pop đến ID
supportFragmentManager.popBackStack(transactionId, 0)
```

### Giao tiếp giữa các Fragment

#### Pattern 1: Shared ViewModel (Khuyến nghị)

Đây là pattern **chuẩn mực** trong MVVM. Các Fragment chia sẻ cùng một ViewModel thông qua Activity scope.

```kotlin
// SharedViewModel.kt
class SharedViewModel : ViewModel() {
    private val _selectedItem = MutableStateFlow<Item?>(null)
    val selectedItem: StateFlow<Item?> = _selectedItem
    
    fun selectItem(item: Item) {
        _selectedItem.value = item
    }
}

// ListFragment.kt
class ListFragment : Fragment() {
    private val viewModel: SharedViewModel by activityViewModels()
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.selectedItem.collect { item ->
                    // Xử lý khi item được chọn
                }
            }
        }
        
        // RecyclerView không có setOnItemClickListener: click đi qua callback của Adapter
        binding.recyclerView.adapter = ItemAdapter { item ->
            viewModel.selectItem(item)
        }
    }
}

// DetailFragment.kt
class DetailFragment : Fragment() {
    private val viewModel: SharedViewModel by activityViewModels()
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.selectedItem.collect { item ->
                    item?.let { displayDetail(it) }
                }
            }
        }
    }
}
```

**Ưu điểm**:
- Fragment không cần biết về nhau.
- Dữ liệu được quan sát (observable), tự động cập nhật.
- Dễ test, dễ bảo trì.

#### Pattern 2: Fragment Result API (Cho one-time event)

Dùng khi Fragment A cần **gửi kết quả** cho Fragment B (ví dụ: chọn ảnh, chọn file).

```kotlin
// FragmentA.kt - Gửi kết quả
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
            val item = BundleCompat.getParcelable(bundle, "item", Item::class.java)
            // Xử lý kết quả
        }
    }
}
```

**Khi nào dùng?**
- One-time event (chọn ảnh, chọn file, confirm dialog).
- Fragment không cần quan sát liên tục.
- Kết quả được gửi qua Bundle (phải Parcelable/Serializable).

#### Pattern 3: Interface Callback (Legacy)

Pattern cũ, không khuyến nghị trong project mới.

```kotlin
// FragmentA.kt
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
}
```

**Nhược điểm**:
- Fragment phụ thuộc vào Activity (coupling cao).
- Không tái sử dụng được.
- Khó test.

### Child Fragment: Fragment lồng nhau

#### Child Fragment là gì?

Child Fragment là Fragment được **quản lý bởi Fragment khác** thay vì Activity. FragmentManager của Fragment cha được gọi là `childFragmentManager`.

```mermaid
graph TB
    A[Activity] --> B[FragmentManager]
    B --> C[Parent Fragment]
    C --> D[ChildFragmentManager]
    D --> E[Child Fragment 1]
    D --> F[Child Fragment 2]
    
    style C fill:#e1f5ff
    style D fill:#fff4e1
```
<!-- dd: fmg-child -->

#### Khi nào dùng Child Fragment?

**Trường hợp 1: ViewPager2 với TabLayout**

```kotlin
class ParentFragment : Fragment() {
    
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
}
```

**Trường hợp 2: Nested Navigation**

Khi một phần của màn hình có navigation riêng (ví dụ: tab "Profile" có sub-tab "Posts", "Photos", "Videos").

```kotlin
class ProfileFragment : Fragment() {
    
    fun navigateToPosts() {
        childFragmentManager.beginTransaction()
            .replace(R.id.profile_container, PostsFragment())
            .addToBackStack(null)
            .commit()
    }
}
```

#### Ví dụ: chỉ tạo Child Fragment khi cần

```kotlin
class ParentFragment : Fragment() {
    
    fun showChildFragment() {
        // Tìm bằng tag thay vì giữ field: sau khi xoay, childFragmentManager đã tự khôi phục
        // child, còn field thì về null → add trùng một child nữa
        if (childFragmentManager.findFragmentByTag(CHILD_TAG) == null) {
            childFragmentManager.beginTransaction()
                .add(R.id.child_container, ChildFragment(), CHILD_TAG)
                .commit()
        }
    }

    companion object {
        private const val CHILD_TAG = "child"
    }
}
```

Chỉ tạo Child Fragment khi cần, không tạo sẵn trong `onCreate()`.

#### Lưu ý quan trọng

- **Vòng đời**: Child Fragment bị ảnh hưởng bởi vòng đời của Parent Fragment. Khi Parent bị destroy, Child cũng bị destroy.
- **Back Stack**: Child Fragment có Back Stack riêng. Back chỉ được giao cho back stack của child trước (trước back stack của FragmentManager cha) khi Parent Fragment là **primary navigation fragment** (`setPrimaryNavigationFragment(parent)`; `NavHostFragment` tự làm việc này khi có `app:defaultNavHost="true"`). Nếu không, Back pop back stack của FragmentManager cha, bỏ qua back stack của child.
- **Communication**: Child Fragment nên giao tiếp với Parent Fragment thông qua Shared ViewModel hoặc Fragment Result API.

### FragmentManager trong kiến trúc app

Phần này dùng trước MVVM ([MVVM](../../../session_07/architecture/mvvm.md)) và Clean Architecture ([Clean Architecture](../../../session_07/architecture/clean_architecture.md)): app chia thành Presentation, Domain, Data layer, và mọi phụ thuộc trong code hướng vào Domain: Presentation gọi UseCase, còn Data hiện thực interface `Repository` mà Domain khai báo (mũi tên nét đứt), nên Domain không biết Data tồn tại.

#### FragmentManager trong MVVM + Clean Architecture

```mermaid
graph TB
    subgraph Presentation["Presentation Layer"]
        A[Activity] --> B[FragmentManager]
        B --> C[Fragment]
        C -->|"quan sát UI State"| D[ViewModel]
    end

    subgraph Domain["Domain Layer"]
        F[UseCase]
        R["Repository (interface)"]
        G[Domain Model]
        F --> R
        F --> G
    end

    subgraph Data["Data Layer"]
        H[RepositoryImpl]
        I[DataSource]
        H --> I
    end

    D --> F
    H -.->|"hiện thực"| R

    style B fill:#e1f5ff
```

**Vai trò của FragmentManager**:
- **Presentation Layer**: Quản lý vòng đời Fragment, điều hướng Back Stack.
- **Không thuộc Domain Layer**: FragmentManager không nên xuất hiện trong UseCase hay Domain Model.
- **Không thuộc Data Layer**: FragmentManager không nên biết về Repository hay DataSource.

#### Nguyên tắc Separation of Concerns

```kotlin
// Đúng: FragmentManager chỉ ở Presentation Layer
class HomeFragment : Fragment() {
    private val viewModel: HomeViewModel by viewModels()
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        // FragmentManager ở đây
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.uiState.collect { state ->
                    render(state)
                }
            }
        }
    }
    
    fun navigateToDetail(itemId: String) {
        // FragmentManager điều hướng
        findNavController().navigate(
            HomeFragmentDirections.actionToDetail(itemId)
        )
    }
}

// Sai: FragmentManager xuất hiện ở Domain Layer
class HomeUseCase(
    private val repository: Repository,
    private val fragmentManager: FragmentManager  // KHÔNG NÊN
) {
    suspend fun execute() {
        val data = repository.getData()
        fragmentManager.beginTransaction()  // KHÔNG NÊN
            .replace(R.id.container, DetailFragment())
            .commit()
    }
}
```

#### FragmentManager và Dependency Injection

Hilt là thư viện Dependency Injection, được học ở [Hilt](../../../session_07/design_pattern/di/hilt.md).

```kotlin
@Module
@InstallIn(ActivityComponent::class)
object FragmentModule {

    // @Binds không có thân hàm; tạo object từ code phải dùng @Provides.
    // Hilt cung cấp sẵn Activity trong ActivityComponent.
    @Provides
    fun provideFragmentManager(activity: Activity): FragmentManager =
        (activity as FragmentActivity).supportFragmentManager
}

// Trong Fragment
@AndroidEntryPoint
class HomeFragment : Fragment() {
    
    // Không đặt tên `fragmentManager`: trùng getter final getFragmentManager() của Fragment
    @Inject
    lateinit var activityFragmentManager: FragmentManager
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        // Dùng FragmentManager của Activity đã được inject
        activityFragmentManager.beginTransaction()
            .replace(R.id.container, DetailFragment())
            .commit()
    }
}
```

**Lưu ý**: Chỉ inject `FragmentManager` khi cần thiết. Trong hầu hết trường hợp, dùng `supportFragmentManager` hoặc `childFragmentManager` trực tiếp là đủ.

## Deep Dive: debug FragmentManager

### 1. Log tất cả FragmentTransaction

```kotlin
supportFragmentManager.beginTransaction()
    .replace(R.id.container, fragment)
    .addToBackStack(null)
    .commit()

// Log Back Stack
fun logBackStack() {
    val fragmentManager = supportFragmentManager
    Log.d("BackStack", "Entry count: ${fragmentManager.backStackEntryCount}")
    
    for (i in 0 until fragmentManager.backStackEntryCount) {
        val entry = fragmentManager.getBackStackEntryAt(i)
        Log.d("BackStack", "[$i] ${entry.name} - ${entry.id}")
    }
}
```

### 2. Dùng FragmentLifecycleCallbacks

```kotlin
class MyApplication : Application() {
    
    override fun onCreate() {
        super.onCreate()
        
        registerActivityLifecycleCallbacks(object : ActivityLifecycleCallbacks {
            override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {
                if (activity is AppCompatActivity) {
                    activity.supportFragmentManager.registerFragmentLifecycleCallbacks(
                        object : FragmentManager.FragmentLifecycleCallbacks() {
                            override fun onFragmentCreated(fm: FragmentManager, f: Fragment, savedInstanceState: Bundle?) {
                                Log.d("FragmentLifecycle", "${f.javaClass.simpleName} - onFragmentCreated")
                            }
                            
                            override fun onFragmentResumed(fm: FragmentManager, f: Fragment) {
                                Log.d("FragmentLifecycle", "${f.javaClass.simpleName} - onFragmentResumed")
                            }
                        },
                        true  // true = recursive (bao gồm Child Fragment)
                    )
                }
            }
            // ActivityLifecycleCallbacks là interface: phải override đủ các method còn lại
            override fun onActivityStarted(activity: Activity) {}
            override fun onActivityResumed(activity: Activity) {}
            override fun onActivityPaused(activity: Activity) {}
            override fun onActivityStopped(activity: Activity) {}
            override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {}
            override fun onActivityDestroyed(activity: Activity) {}
        })
    }
}
```

### 3. Debug Back Stack bằng adb

Stetho và Flipper đã ngừng phát triển. Cách gọn hơn là dùng `adb`: lệnh đầu bật log chi tiết của FragmentManager (FragmentManager tôn trọng `Log.isLoggable`), lệnh sau dump Activity đang ở top, gồm danh sách Fragment đã add và Back Stack:

```bash
adb shell setprop log.tag.FragmentManager VERBOSE
adb shell dumpsys activity top
```

## Ví dụ thực tế

### Bottom Navigation: chuyển tab bằng show/hide

Mỗi tab là một Fragment được `add` một lần rồi giữ lại; chuyển tab chỉ là ẩn tab cũ, hiện tab mới. Luồng chạy:

1. Lần đầu mở Activity (`savedInstanceState == null`): add tab Home.
2. Sau khi xoay hoặc process death, FragmentManager đã tự khôi phục các tab, còn field `currentTab` về `null`: tìm lại tab đang hiện trong container. Bỏ bước này thì lần chuyển tab đầu tiên không ẩn tab cũ, hai tab chồng lên nhau.
3. Khi chuyển tab, tìm tab đích theo tag. Chỉ tạo instance mới khi tab chưa từng được add, để không add trùng.
4. Trong **một** transaction: `hide` tab cũ và giới hạn nó ở `STARTED` bằng `setMaxLifecycle`.
5. `add` tab đích nếu là lần đầu, ngược lại `show`.
6. Cho tab đích lên lại `RESUMED` (bỏ giới hạn đặt ở bước 4 lần trước).

```mermaid
flowchart TD
    Create(["MainActivity.onCreate()"]) --> Saved{"savedInstanceState == null?"}
    Saved -- Có --> S1["(1) switchTab(TAG_HOME)"]
    Saved -- Không --> S2["(2) currentTab = tab đang hiện trong container"]
    S2 -.-> Select(["User chọn tab trên BottomNavigationView"])
    Select --> S3
    S1 --> S3["(3) findFragmentByTag(tag), chưa có thì createTab(tag)"]
    S3 --> Same{"target == currentTab?"}
    Same -- Có --> Stop(["return, không tạo transaction"])
    Same -- Không --> S4["(4) currentTab != null: hide + setMaxLifecycle(STARTED)"]
    S4 --> First{"Tab đích chưa từng được add?"}
    First -- Có --> Add["(5) add(R.id.container, target, tag)"]
    First -- Không --> Show["(5) show(target)"]
    Add --> S6["(6) setMaxLifecycle(target, RESUMED)"]
    Show --> S6
    S6 --> Commit["commit(), currentTab = target"]
```

```kotlin
class MainActivity : AppCompatActivity() {

    private var currentTab: Fragment? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        if (savedInstanceState == null) {
            switchTab(TAG_HOME)                                      // (1)
        } else {
            currentTab = supportFragmentManager.fragments            // (2)
                .firstOrNull { it.id == R.id.container && !it.isHidden }
        }

        findViewById<BottomNavigationView>(R.id.bottom_nav).setOnItemSelectedListener { item ->
            switchTab(
                when (item.itemId) {
                    R.id.nav_home -> TAG_HOME
                    R.id.nav_search -> TAG_SEARCH
                    else -> TAG_PROFILE
                }
            )
            true
        }
    }

    private fun switchTab(tag: String) {
        val fragmentManager = supportFragmentManager
        val existing = fragmentManager.findFragmentByTag(tag)        // (3)
        val target = existing ?: createTab(tag)
        if (target == currentTab) return

        fragmentManager.beginTransaction().apply {
            setReorderingAllowed(true)
            currentTab?.let {                                        // (4)
                hide(it)
                setMaxLifecycle(it, Lifecycle.State.STARTED)
            }
            if (existing == null) add(R.id.container, target, tag) else show(target) // (5)
            setMaxLifecycle(target, Lifecycle.State.RESUMED)          // (6)
        }.commit()

        currentTab = target
    }

    private fun createTab(tag: String): Fragment = when (tag) {
        TAG_HOME -> HomeFragment()
        TAG_SEARCH -> SearchFragment()
        else -> ProfileFragment()
    }

    companion object {
        private const val TAG_HOME = "home"
        private const val TAG_SEARCH = "search"
        private const val TAG_PROFILE = "profile"
    }
}
```

**Kết quả:** đổi tab không dựng lại View, scroll position và dữ liệu của từng tab được giữ; tab bị ẩn dừng ở `STARTED`, chỉ tab đang hiện ở `RESUMED`; sau khi xoay, lần chuyển tab đầu tiên vẫn ẩn đúng tab cũ nên không có hai tab chồng lên nhau.

`hide()` không đổi lifecycle của tab bị ẩn; `setMaxLifecycle()` ở bước 4 mới đưa nó xuống `STARTED`. Callback mà từng tab nhận khi bị ẩn/hiện ở [Fragment Lifecycle](lifecycle.md), mục "Đa tab trong app Single-Activity: show/hide giữ View sống".

**Tại sao không dùng `addToBackStack()` trong trường hợp này?**

Vì Bottom Navigation cần **giữ trạng thái** của tất cả tab. Nếu dùng `addToBackStack()`, khi nhấn Back sẽ pop Fragment ra khỏi Back Stack, làm mất trạng thái.

Thay vào đó, ta dùng `hide()`/`show()` để **giữ Fragment trong bộ nhớ** nhưng không hiển thị.

### Mỗi tab có back stack riêng: multiple back stacks

Khi mỗi tab có back stack riêng (tab Home đi sâu list → detail, đổi tab rồi quay lại vẫn ở detail), dùng **multiple back stacks** (Fragment 1.4.0+): `saveBackStack(name)` pop và lưu state của các transaction thuộc tab cũ, `restoreBackStack(name)` khôi phục chúng. Hai hàm này chỉ chạy với transaction có `setReorderingAllowed(true)` và có tên trong `addToBackStack(name)`. Với Navigation Component, `NavigationUI` (`setupWithNavController`) tự làm việc này cho bottom navigation, thay cho show/hide tự viết.

## So sánh với các cách tiếp cận khác

### So sánh FragmentManager vs Navigation Component

#### Navigation Component là gì?

Navigation Component là thư viện của Jetpack, cung cấp API bậc cao để quản lý điều hướng trong ứng dụng. Nó **sử dụng FragmentManager bên dưới**.

#### So sánh chi tiết

| Tiêu chí | FragmentManager | Navigation Component |
|----------|----------------|---------------------|
| **Learning curve** | Thấp, API đơn giản | Trung bình, cần hiểu NavGraph, NavHost |
| **Type safety** | Không (dùng tag/id string) | Có (dùng Safe Args plugin) |
| **Deep linking** | Tự implement | Hỗ trợ sẵn |
| **Back Stack management** | Thủ công | Tự động, có thể customize |
| **Animation** | Thủ công | Hỗ trợ sẵn trong XML |
| **Testing** | `FragmentScenario` test được từng Fragment, nhưng kiểm tra điều hướng phải đọc FragmentManager/back stack | Dễ hơn: `TestNavHostController` cho biết destination hiện tại |
| **Modularization** | Khó | Dễ (dynamic feature module) |
| **Compose support** | Không | Có (Navigation Compose) |
| **Boilerplate** | Nhiều | Ít |

Navigation Component quản lý cả DialogFragment như một destination (`<dialog>`), cùng back stack với các màn hình khác: xem [Dialog and DialogFragment](dialog_and_dialogfragment.md), mục "DialogFragment vs Navigation Component Dialog".

#### Ví dụ so sánh code

**FragmentManager:**

```kotlin
// Điều hướng
supportFragmentManager.beginTransaction()
    .replace(R.id.container, DetailFragment())
    .addToBackStack(null)
    .commit()

// Truyền dữ liệu
val fragment = DetailFragment().apply {
    arguments = bundleOf("itemId" to itemId)
}
supportFragmentManager.beginTransaction()
    .replace(R.id.container, fragment)
    .addToBackStack(null)
    .commit()
```

**Navigation Component:**

```kotlin
// Điều hướng
findNavController().navigate(R.id.action_to_detail)

// Truyền dữ liệu (với Safe Args)
val action = ListFragmentDirections.actionToDetail(itemId)
findNavController().navigate(action)
```

### FragmentManager trong XML vs Compose

Jetpack Compose là UI toolkit khai báo, được học ở Session 09, bắt đầu từ [9.0 Jetpack Compose Overview](../../../jetpack_compose_ui/overview.md).

#### XML (Traditional View System)

```kotlin
class MainActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        if (savedInstanceState == null) {
            supportFragmentManager.beginTransaction()
                .add(R.id.container, HomeFragment())
                .commit()
        }
    }
}
```

#### Compose (Navigation Compose)

Trong Compose, bạn **không dùng FragmentManager trực tiếp**. Thay vào đó, dùng **Navigation Compose** - một thư viện điều hướng dành riêng cho Compose.

```kotlin
@Composable
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
}
```

#### Sự khác biệt cốt lõi

| Aspect | XML (FragmentManager) | Compose (Navigation Compose) |
|--------|----------------------|------------------------------|
| **Đơn vị điều hướng** | Fragment | Composable function |
| **Quản lý trạng thái** | Fragment lifecycle | Compose state + SavedStateHandle |
| **Back Stack** | FragmentTransaction | NavBackStackEntry |
| **Animation** | XML animation | AnimatedContent, Crossfade |
| **Type safety** | Bundle (Parcelable) | NavType trên route string; từ Navigation 2.8.0 có route type-safe bằng Kotlin Serialization (Safe Args chỉ dành cho nav graph XML) |

#### Chuyển từ XML sang Compose

Nếu đang migrate từ XML sang Compose, bạn có thể **dùng chung Fragment và Compose** trong cùng một Activity:

```kotlin
class MainActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Layout chứa cả FragmentContainerView (R.id.fragment_container) và ComposeView (R.id.compose_view).
        // Không gọi setContent { } của Activity: nó thay toàn bộ content view, xoá luôn container của Fragment.
        setContentView(R.layout.activity_main)

        // Fragment XML truyền thống
        if (savedInstanceState == null) {
            supportFragmentManager.beginTransaction()
                .add(R.id.fragment_container, LegacyFragment())
                .commit()
        }

        // Compose trong cùng Activity, gắn vào một ComposeView của layout
        findViewById<ComposeView>(R.id.compose_view).setContent {
            AppNavigation()
        }
    }
}
```

## Khi nào nên và không nên dùng

### Khi nào dùng FragmentManager trực tiếp?

- Project nhỏ, ít màn hình.
- Cần kiểm soát chi tiết Back Stack.
- Không muốn thêm dependency.
- Đang maintain codebase cũ.

### Khi nào dùng Navigation Component?

- Project lớn, nhiều màn hình.
- Cần deep linking.
- Làm việc với team lớn, cần type safety.
- Dùng Compose.
- Cần modularization.

## Sai lầm thường gặp

### 1. Commit transaction sau `onSaveInstanceState()`

```kotlin
// Lỗi
override fun onSaveInstanceState(outState: Bundle) {
    super.onSaveInstanceState(outState)
    
    // Crash: IllegalStateException
    supportFragmentManager.beginTransaction()
        .replace(R.id.container, fragment)
        .commit()
}
```

**Nguyên nhân**: Sau `onSaveInstanceState()`, Activity không cho phép commit transaction vì có thể gây mất trạng thái. Lỗi thường gặp nhất trong thực tế: callback của một network request trả về khi app đã ở background, rồi gọi `commit()`. Crash báo `IllegalStateException: Can not perform this action after onSaveInstanceState`.

**Cách sửa:**
- Kiểm tra `supportFragmentManager.isStateSaved` trước khi commit.
- Dùng `commitAllowingStateLoss()` cho các cập nhật không quan trọng, nếu chấp nhận mất trạng thái.
- Hoặc delay transaction đến `onResume()`.

### 2. Dùng `commitAllowingStateLoss()` làm mặc định

```kotlin
// Đúng
supportFragmentManager.beginTransaction()
    .replace(R.id.container, fragment)
    .commit()

// Sai (trừ khi thật sự cần)
supportFragmentManager.beginTransaction()
    .replace(R.id.container, fragment)
    .commitAllowingStateLoss()
```

`commitAllowingStateLoss()` có thể gây mất trạng thái nếu Activity bị kill. Chỉ dùng khi bạn **chấp nhận rủi ro** (ví dụ: hiển thị dialog không quan trọng).

**Cách sửa:** Luôn dùng `commit()` thay vì `commitAllowingStateLoss()`.

### 3. Dùng `replace` cho tab cố định, `show`/`hide` cho điều hướng sâu

Hai tình huống dễ nhầm:

- **Điều hướng sâu** (list → detail): dùng `replace` — View cũ nên bị hủy để tiết kiệm bộ nhớ.
- **Chuyển tab cố định** (Bottom Nav): dùng `show`/`hide` — View nên sống để không load lại data mỗi lần đổi tab.

Dùng sai chiều sẽ gây: `replace` cho tab → app lag + mất state mỗi lần đổi; `show`/`hide` cho điều hướng sâu → nhiều Fragment chồng lên nhau, tốn bộ nhớ.

`replace()` mỗi lần đổi tab tạo Fragment mới, hủy View cũ, nên tab nào cũng phải inflate và load lại data, mất luôn scroll position.

**Cách sửa:** Với Bottom Navigation, add mỗi tab một lần rồi chuyển bằng `hide()`/`show()` như code ở mục "Bottom Navigation: chuyển tab bằng show/hide" trong phần Ví dụ thực tế: View của các tab được giữ, đổi tab không phải dựng lại gì. Với điều hướng sâu, dùng `replace()` + `addToBackStack()`.

### 4. Memory leak do retain Fragment

```kotlin
// Lỗi
class MyFragment : Fragment() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        retainInstance = true  // Deprecated, không dùng
    }
}
```

`retainInstance = true` giữ Fragment instance khi Activity bị recreate, gây **memory leak** nếu Fragment giữ reference đến Activity hoặc View.

**Cách sửa:** Dùng `ViewModel` với `SavedStateHandle` để lưu trữ dữ liệu.

### 5. Find Fragment bằng ID rồi cast thẳng

```kotlin
// Lỗi
val fragment = supportFragmentManager.findFragmentById(R.id.container)
fragment as MyFragment  // ClassCastException nếu không phải MyFragment

// Đúng
val fragment = supportFragmentManager.findFragmentByTag("my_fragment")
if (fragment is MyFragment) {
    // Xử lý
}
```

**Cách sửa:** Luôn dùng `findFragmentByTag()` với tag rõ ràng. Check type trước khi cast.

### 6. Không handle Back Stack đúng cách

```kotlin
// Lỗi
override fun onBackPressed() {
    if (supportFragmentManager.backStackEntryCount > 0) {
        supportFragmentManager.popBackStack()
    } else {
        super.onBackPressed()
    }
}
```

Vấn đề: Không handle trường hợp có nhiều Back Stack (ví dụ: Bottom Navigation + nested navigation).

**Cách sửa:** Không override `onBackPressed()` (đã deprecated từ API 33) và không tự viết callback pop back stack. FragmentManager của AndroidX đã tự đăng ký callback với `OnBackPressedDispatcher` của Activity: Back pop back stack của nó (và của child thuộc primary navigation fragment), hết back stack thì trả Back về Activity. Callback tự viết kiểu `popBackStackImmediate()` còn làm hỏng predictive back. Chỉ thêm `OnBackPressedCallback` khi cần hành vi riêng, ví dụ hỏi xác nhận trước khi rời form chưa lưu:

```kotlin
class EditProfileFragment : Fragment() {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        // Callback gắn với viewLifecycleOwner: tự gỡ khi View bị hủy
        requireActivity().onBackPressedDispatcher.addCallback(viewLifecycleOwner) {
            showDiscardChangesDialog()
        }
    }
}
```

### 7. Giao tiếp bằng reference trực tiếp tới Fragment khác

```kotlin
// Đúng
class FragmentA : Fragment() {
    private val viewModel: SharedViewModel by activityViewModels()
}

class FragmentB : Fragment() {
    private val viewModel: SharedViewModel by activityViewModels()
}

// Sai (coupling cao)
class FragmentA : Fragment() {
    private lateinit var fragmentB: FragmentB
    
    fun sendData(data: Data) {
        fragmentB.receiveData(data)
    }
}
```

**Cách sửa:** Luôn dùng Shared ViewModel cho communication (hoặc Fragment Result API cho kết quả một lần), như mục "Giao tiếp giữa các Fragment".

### 8. Collect Flow bằng `this` thay vì `viewLifecycleOwner`

```kotlin
// Đúng
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    viewLifecycleOwner.lifecycleScope.launch {
        viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
            viewModel.data.collect { /* ... */ }
        }
    }
}

// Sai (memory leak)
override fun onCreate(savedInstanceState: Bundle?) {
    lifecycleScope.launch {
        viewModel.data.collect { /* ... */ }
    }
}
```

Fragment trong back stack vẫn sống trong khi View đã bị hủy, nên collector gắn với `this` sống lâu hơn View. Vì sao cần cả `viewLifecycleOwner` lẫn `repeatOnLifecycle` ở [Fragment Lifecycle](lifecycle.md), mục "View Lifecycle: vòng đời thứ hai trong Fragment".

**Cách sửa:** Collect trong `viewLifecycleOwner.lifecycleScope` kèm `repeatOnLifecycle(Lifecycle.State.STARTED)`, như phần "Đúng" ở trên. Với LiveData, lỗi tương tự là `observe(this)`; cách sửa là `observe(viewLifecycleOwner)`, xem [LiveData](../../../session_06/livedata.md).

### 9. Tạo Fragment mới mỗi lần điều hướng

```kotlin
// Sai: Tạo Fragment mới mỗi lần
fun navigateToDetail() {
    supportFragmentManager.beginTransaction()
        .replace(R.id.container, DetailFragment())
        .commit()
}

// Đúng: Tái sử dụng Fragment nếu đã tồn tại
fun navigateToDetail() {
    val fragment = supportFragmentManager.findFragmentByTag("detail")
        ?: DetailFragment()
    
    supportFragmentManager.beginTransaction()
        .replace(R.id.container, fragment, "detail")
        .commit()
}
```

**Cách sửa:** Tìm Fragment theo tag trước, chỉ tạo instance mới khi chưa có.

### 10. Nested Fragment quá sâu

```text
// Tránh
Activity
  └─ Fragment A
      └─ Fragment B
          └─ Fragment C
              └─ Fragment D
```

Nested Fragment quá sâu gây:
- Khó debug.
- Vòng đời phức tạp.
- Back Stack khó kiểm soát.

**Cách sửa:** Nếu cần nested navigation, cân nhắc dùng **Navigation Component** với **nested NavGraph**.

## Lịch sử phát triển

- **Android 3.0 (API 11, 2011):** `android.app.FragmentManager` và `FragmentTransaction` ra đời cùng Fragment trong framework. Cả hai bị deprecated từ **API 28**, thay bằng `FragmentManager` của Jetpack (`androidx.fragment.app`) để hành vi đồng nhất trên mọi máy và có Lifecycle.
- **API 24:** bản framework thêm `commitNow()` và `commitNowAllowingStateLoss()`.
- **API 26:** bản framework thêm `setReorderingAllowed()`.
- **09/2019 (Fragment 1.1.0):** thêm `setMaxLifecycle()` trên `FragmentTransaction`, thay cho `setUserVisibleHint()` (deprecated).
- **01/2020 (Fragment 1.2.0):** `FragmentManager.enableDebugLogging()` bị deprecated; FragmentManager tôn trọng `Log.isLoggable()` với tag `FragmentManager`, nên bật log bằng `adb` như mục Deep Dive mà không cần build lại app.
- **02/2021 (Fragment 1.3.0):** thêm Fragment Result API (truyền kết quả giữa hai Fragment qua `FragmentManager`); `setRetainInstance()` bị deprecated.
- **11/2021 (Fragment 1.4.0):** multiple back stacks với `saveBackStack()`, `restoreBackStack()`, `clearBackStack()`.
- **05/2024 (Fragment 1.7.0):** Fragment hỗ trợ predictive back khi dùng `Animator` hoặc AndroidX Transition 1.5.0.
- **Navigation 2.8.0:** Navigation Compose và Navigation Kotlin DSL có route type-safe bằng Kotlin Serialization, tương đương Safe Args của nav graph XML.

## Kết nối hệ thống

- **Tiên quyết:** [Fragment Lifecycle](lifecycle.md) (FragmentManager là thành phần đưa Fragment đi qua các callback, và `addToBackStack` quyết định Fragment dừng ở `onDestroyView` hay bị hủy hẳn) và [Fragment State Changes](state_changes.md) (FragmentManager tự khôi phục Fragment sau xoay màn hình và process death; dữ liệu đi qua `arguments`, ViewModel, `SavedStateHandle`). Nền tảng chung ở [Fragment Overview](index.md).
- **Liên quan:**
  - [Activity Lifecycle](../activity/lifecycle.md): FragmentManager đồng bộ lifecycle của Fragment theo Activity chứa nó.
  - [Task and Backstack](../activity/task_and_backstack.md): back stack của các Activity trong một task, khác với back stack transaction mà FragmentManager giữ bên trong một Activity.
- **Học tiếp:**
  - [Dialog and DialogFragment](dialog_and_dialogfragment.md): DialogFragment được `show()` qua FragmentManager, hoặc khai báo thành `<dialog>` destination của Navigation Component.
  - [ViewModel](../../../session_06/viewmodel.md): ViewModel dùng cho Shared ViewModel giữa các Fragment.
  - [MVVM](../../../session_07/architecture/mvvm.md) và [Clean Architecture](../../../session_07/architecture/clean_architecture.md): vị trí của FragmentManager trong Presentation Layer.
  - [Hilt](../../../session_07/design_pattern/di/hilt.md): inject `FragmentManager` qua `ActivityComponent`.
  - [9.0 Jetpack Compose Overview](../../../jetpack_compose_ui/overview.md): Compose và Navigation Compose, nơi điều hướng không còn đi qua FragmentManager.

## Nguồn tham khảo

- [Android Developers - FragmentManager](https://developer.android.com/reference/androidx/fragment/app/FragmentManager)
- [Android Developers - FragmentTransaction](https://developer.android.com/reference/androidx/fragment/app/FragmentTransaction)
- [Android Developers - Fragment manager (back stack, primary navigation fragment)](https://developer.android.com/guide/fragments/fragmentmanager)
- [Android Developers - Fragment release notes (multiple back stacks, 1.4.0; cùng các mốc 1.1.0, 1.2.0, 1.3.0, 1.7.0 ở Lịch sử phát triển)](https://developer.android.com/jetpack/androidx/releases/fragment)
- [Android Developers - Provide custom back navigation](https://developer.android.com/guide/navigation/custom-back)
- [Android Developers - Navigation Component](https://developer.android.com/guide/navigation)
- [Android Developers - Fragment best practices](https://developer.android.com/guide/fragments)
- [Jetpack Navigation Compose](https://developer.android.com/jetpack/compose/navigation)
- [android.app.FragmentManager (API 11, deprecated API 28) - Android Developers](https://developer.android.com/reference/android/app/FragmentManager)
- [android.app.FragmentTransaction (commitNow API 24, setReorderingAllowed API 26) - Android Developers](https://developer.android.com/reference/android/app/FragmentTransaction)
- [Type safety in Kotlin DSL and Navigation Compose (Navigation 2.8.0) - Android Developers](https://developer.android.com/guide/navigation/design/type-safety)
