---
id: android.component.fragment.state_changes
title: Fragment State Changes
summary: Fragment State Changes là các tình huống khiến Fragment bị tạo lại hoặc chỉ mất View (configuration change, process death, vào backstack, bị remove), cùng cách FragmentManager lưu và khôi phục state của từng Fragment qua các tình huống đó. Bài đi vào phần riêng của Fragment, gồm arguments, scope của ViewModel (viewModels, activityViewModels), SavedStateHandle nhận arguments, và vì sao setRetainInstance bị deprecated.
status: published
difficulty: intermediate
depth: deep-dive
estimated_reading_time: 20 phút
tags: [android, fragment, state, configuration-change, viewmodel, savedstatehandle, arguments]
prerequisites: [android.component.fragment.lifecycle, android.component.activity.state_changes]
related: [android.component.fragment.fragment_manager, android.component.activity.parcelables_and_bundle]
learning_outcomes:
  - Phân biệt được các tình huống Fragment bị recreate và hành vi tương ứng.
  - Giải thích được sự khác biệt giữa Arguments, onSaveInstanceState và ViewModel trong Fragment.
  - Áp dụng được SavedStateHandle để survive process death.
  - Phân biệt được viewModels() vs activityViewModels() và chọn đúng scope.
  - Nhận diện được setRetainInstance đã deprecated và giải pháp thay thế.
knowledge_gap: >
  Không hiểu cơ chế recreate của Fragment dẫn đến mất dữ liệu form khi xoay màn hình, duplicate network call khi Configuration Change, crash khi process bị kill do không lưu state đúng cách.
---

# Fragment State Changes

## Vấn đề cần giải quyết

Fragment thừa hưởng vấn đề Configuration Change từ Activity: **khi xoay màn hình, đổi ngôn ngữ, hoặc thay đổi font size — Fragment bị destroy và tạo lại**.

Nhưng Fragment có thêm những tình huống phức tạp hơn Activity:
- Fragment bị destroy view nhưng instance vẫn sống (backstack)
- Fragment có `arguments` Bundle tồn tại xuyên suốt vòng đời
- Fragment có thể dùng ViewModel scope theo Activity hoặc scope theo chính nó
- `setRetainInstance(true)` từng là giải pháp phổ biến nhưng đã **deprecated**

Nếu không hiểu rõ những cơ chế này, bạn sẽ:
- Mất dữ liệu form khi xoay màn hình
- Gọi network request trùng lặp sau mỗi configuration change
- Crash khi process bị kill vì không lưu state quan trọng

## Sau khi học xong

- Phân biệt được các tình huống Fragment bị recreate và hành vi tương ứng.
- Giải thích được sự khác biệt giữa Arguments, onSaveInstanceState và ViewModel trong Fragment.
- Áp dụng được SavedStateHandle để survive process death.
- Phân biệt được viewModels() vs activityViewModels() và chọn đúng scope.
- Nhận diện được setRetainInstance đã deprecated và giải pháp thay thế.

## Fragment State Changes là gì?

**Fragment State Changes** là các tình huống khiến Fragment bị tạo lại hoặc chỉ mất View (configuration change, process death, vào backstack, bị remove), cùng cách **FragmentManager** lưu và khôi phục state của từng Fragment qua các tình huống đó.

Mental model, dùng lại từ [Fragment Lifecycle](lifecycle.md): Fragment instance là **cái khung**, View là **bức tranh lồng trong khung**. Vào backstack thì chỉ bức tranh bị thay, cái khung giữ nguyên; configuration change và process death thay luôn cả cái khung, FragmentManager dựng khung mới từ state đã lưu. Dữ liệu chỉ còn nếu nằm ngoài cái khung cũ: `arguments` và saved state (FragmentManager chuyển sang khung mới), ViewModel (giữ qua configuration change, mất khi process chết).

Vì sao Activity bị recreate, khác biệt giữa configuration change và process death, cơ chế của ViewModel và `SavedStateHandle` là kiến thức chung, nằm ở [Activity State Changes](../activity/state_changes.md). Bài này chỉ đi vào phần riêng của Fragment.

## Cách hoạt động

### Các tình huống Fragment bị recreate

```mermaid
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
```
<!-- dd: fsc-cases -->

#### Chi tiết từng tình huống

| Tình huống | Fragment instance | View | Arguments | savedInstanceState | ViewModel |
|---|---|---|---|---|---|
| **Configuration Change** | Destroy → New | Destroy → New | ✅ Giữ | ✅ Có data | ✅ Giữ |
| **Process Death** | Destroy → New | Destroy → New | ✅ Giữ | ✅ Có data | ❌ Mất |
| **Back từ Backstack** | Giữ nguyên | Destroy → New | ✅ Giữ | null | ✅ Giữ |
| **Remove** | Destroy | Destroy | Mất | Mất | Mất |

> [!IMPORTANT]
> **Arguments luôn được bảo toàn** qua mọi tình huống recreate (Configuration Change, Process Death). Đây là lý do bạn phải truyền dữ liệu khởi tạo qua `arguments` Bundle thay vì constructor parameter.

### Ba công cụ lưu state

#### 1. Arguments (Bundle khởi tạo)

Arguments là Bundle gắn vào Fragment **trước khi** Fragment được add vào FragmentManager. Nó tồn tại xuyên suốt vòng đời Fragment.

```kotlin
// Tạo Fragment với Arguments
val fragment = ProductDetailFragment().apply {
    arguments = Bundle().apply {
        putString("product_id", "SKU-12345")
        putString("source", "search")
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
    
    // Đọc arguments — an toàn, tồn tại xuyên recreate
    private val productId: String by lazy {
        requireArguments().getString("product_id")!!
    }
}
```

**Khi nào dùng:** Truyền dữ liệu khởi tạo (ID, filter params, config) khi tạo Fragment. Tương tự Intent extras của Activity.

**Giới hạn:** Chỉ chứa kiểu Bundle hỗ trợ (primitive, `String`, `Parcelable`…). Arguments được lưu cùng saved state của Fragment nên phải nhỏ như saved state; ngưỡng và lý do ở [Parcelables and Bundle](../activity/parcelables_and_bundle.md), mục "Ba con số cần phân biệt".

#### 2. ViewModel (In-memory state)

ViewModel tồn tại qua Configuration Change nhưng **mất khi Process Death**. Cơ chế giữ ViewModel qua xoay màn hình và cách load dữ liệu ban đầu không bị lặp ở [Activity State Changes](../activity/state_changes.md), mục "ViewModel: giữ dữ liệu business qua configuration change" và mục "Sai lầm thường gặp", phần 3 "Fetch API trong onCreate mỗi lần recreate". Phần riêng của Fragment: `by viewModels()` tự đưa `arguments` vào `SavedStateHandle`, nên ViewModel đọc được ID mà Fragment không phải chuyển tay.

```kotlin
class ProductDetailFragment : Fragment(R.layout.fragment_product_detail) {

    // Scope theo Fragment — mỗi instance Fragment có ViewModel riêng.
    // by viewModels() đưa arguments ("product_id") vào SavedStateHandle của ViewModel.
    // Không gọi hàm load dữ liệu trong onCreate: sau xoay màn hình onCreate chạy lại → fetch lặp.
    // (ViewModel có repository trong constructor cần factory hoặc Hilt, học ở 6.4 ViewModel, chưa có bài)
    private val viewModel: ProductDetailViewModel by viewModels()
}

class ProductDetailViewModel(
    savedStateHandle: SavedStateHandle,
    private val repository: ProductRepository
) : ViewModel() {
    private val productId: String = checkNotNull(savedStateHandle["product_id"])

    // Load lười: chỉ gọi API khi Fragment bắt đầu collect, không launch trong init
    val product: StateFlow<Product?> =
        flow { emit(repository.getProduct(productId)) }
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), initialValue = null)
}
```

**Khi nào dùng:** Mọi dữ liệu UI cần survive qua configuration change: network responses, processed lists, UI state.

#### 3. SavedStateHandle (Survive Process Death)

SavedStateHandle kết hợp ưu điểm của ViewModel (reactive) và savedInstanceState (survive process death). Cơ chế lưu/khôi phục ở [Activity State Changes](../activity/state_changes.md), mục "SavedStateHandle: lưu user input quan trọng qua process death"; trong Fragment cách dùng giống hệt Activity.

```kotlin
class ProductDetailViewModel(
    private val savedStateHandle: SavedStateHandle
) : ViewModel() {

    // Tự động restore khi process death
    val searchQuery = savedStateHandle.getStateFlow("query", "")

    fun updateQuery(query: String) {
        savedStateHandle["query"] = query
    }
}
```

```kotlin
// Trong Fragment — SavedStateHandle tự động được inject
private val viewModel: ProductDetailViewModel by viewModels()
```

**Khi nào dùng:** Dữ liệu người dùng nhập (search query, form input, scroll position, selected tab) cần survive cả process death.

> [!NOTE]
> **`onSaveInstanceState(outState)` của Fragment** vẫn tồn tại như Activity: FragmentManager gọi nó khi host Activity lưu state, và Bundle được trả lại ở `onCreate`/`onCreateView`/`onViewCreated`/`onViewStateRestored`. View có `android:id` trong layout của Fragment tự lưu state của chính nó như ở Activity ([Activity State Changes](../activity/state_changes.md), mục "onSaveInstanceState: transient UI state (View/XML)"). Khác biệt của Fragment: khi chỉ View bị destroy (Fragment vào backstack), FragmentManager giữ state của view hierarchy và trả lại khi View được tạo lại, nên text đang gõ vẫn còn khi người dùng bấm Back quay về.

### Ma trận quyết định: chọn đúng công cụ

```mermaid
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
```
<!-- dd: fsc-decide -->

| Loại dữ liệu | Công cụ | Ví dụ |
|---|---|---|
| ID, config, filter params | **Arguments** | `product_id`, `category`, `isEditing` |
| Network response, processed data | **ViewModel** | Danh sách sản phẩm, user profile |
| User input, UI state nhỏ | **SavedStateHandle** | Search query, selected tab, scroll position |
| Large data + cần survive process death | **ViewModel + SavedStateHandle** | Cache key trong SavedStateHandle, data trong ViewModel, re-fetch khi null |

### ViewModel scoping: viewModels() vs activityViewModels()

Fragment có thể chọn scope cho ViewModel:

```kotlin
class FragmentA : Fragment() {
    // Scope theo Fragment — ViewModel riêng cho Fragment này
    private val viewModel: MyViewModel by viewModels()
    
    // Scope theo Activity — chia sẻ với tất cả Fragment trong Activity
    private val sharedViewModel: SharedViewModel by activityViewModels()
    
    // Scope theo Navigation Graph — chia sẻ trong cùng nav graph
    private val navViewModel: NavViewModel by navGraphViewModels(R.id.main_nav_graph)
}
```

```mermaid
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
```
<!-- dd: fsc-scopes -->

**Quy tắc chọn scope:**
- `viewModels()` — Dữ liệu thuộc riêng Fragment (product detail, form data)
- `activityViewModels()` — Dữ liệu chia sẻ giữa các Fragment (selected item, auth state)
- `navGraphViewModels()` — Dữ liệu chia sẻ trong một luồng navigation cụ thể (checkout flow)

## Ví dụ thực tế

### Form sửa profile: giữ draft qua xoay màn hình và process death

Fragment sửa profile có hai ô tên và email, nút Lưu chỉ bật khi dữ liệu hợp lệ. Draft người dùng đang gõ phải còn nguyên sau xoay màn hình và sau process death. Draft là user input nhỏ, nên theo ma trận quyết định nó nằm trong `SavedStateHandle` của ViewModel scope theo Fragment (`by viewModels()`). Luồng chạy:

1. `onViewCreated`: tạo binding, collect `uiState` trong `repeatOnLifecycle(STARTED)` của `viewLifecycleOwner`.
2. Người dùng gõ tên hoặc email: `doAfterTextChanged` gọi `updateName`/`updateEmail`, ViewModel ghi giá trị vào `SavedStateHandle`.
3. `getStateFlow()` phát giá trị mới, `combine` tạo `EditProfileState` (kèm `isValid`); UI chỉ `setText` khi khác giá trị đang hiển thị, rồi bật/tắt nút Lưu.
4. Xoay màn hình: `onDestroyView` gán `_binding = null` (View chết trước Fragment instance); Fragment instance và View được tạo mới, ViewModel giữ nguyên; `onViewCreated` collect lại và nhận ngay draft hiện tại.
5. Process death: ViewModel mất, nhưng dữ liệu của `SavedStateHandle` nằm trong saved state mà FragmentManager đã lưu; khi mở lại app, ViewModel mới đọc lại `name` và `email`.

```mermaid
sequenceDiagram
    participant User
    participant F as EditProfileFragment
    participant VM as EditProfileViewModel
    participant SSH as SavedStateHandle

    F->>VM: (1) onViewCreated() → collect uiState (viewLifecycleOwner)
    User->>F: Gõ tên / email
    F->>VM: (2) doAfterTextChanged → updateName() / updateEmail()
    VM->>SSH: (2) ghi "name", "email"
    SSH-->>VM: (3) getStateFlow phát giá trị mới → combine
    VM-->>F: (3) EditProfileState → setText nếu khác, btnSave.isEnabled
    User->>F: Xoay màn hình
    F->>F: (4) onDestroyView() → _binding = null
    Note over F,VM: (4) Fragment + View mới, ViewModel cũ
    F->>VM: (4) onViewCreated() → collect lại, nhận draft hiện tại
    Note over VM,SSH: (5) Process death: ViewModel mất, saved state còn
    F->>VM: (5) ViewModel MỚI, SavedStateHandle khôi phục "name", "email"
```

```kotlin
class EditProfileFragment : Fragment(R.layout.fragment_edit_profile) {

    // ViewModel với SavedStateHandle — survive cả process death
    private val viewModel: EditProfileViewModel by viewModels()

    private var _binding: FragmentEditProfileBinding? = null
    private val binding get() = _binding!!

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = FragmentEditProfileBinding.bind(view)  // (1) và (4): mỗi View mới một binding mới

        // (4) Restore UI state từ ViewModel (survive config change)
        // (5) SavedStateHandle bên trong ViewModel giữ draft data (survive process death)
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.uiState.collect { state ->
                    // (3) Chỉ setText khi khác: tránh vòng lặp với doAfterTextChanged và con trỏ nhảy về đầu
                    if (binding.etName.text.toString() != state.name) binding.etName.setText(state.name)
                    if (binding.etEmail.text.toString() != state.email) binding.etEmail.setText(state.email)
                    binding.btnSave.isEnabled = state.isValid
                }
            }
        }

        // (2) Lưu user input vào ViewModel (auto-save draft)
        binding.etName.doAfterTextChanged { text ->
            viewModel.updateName(text.toString())
        }

        binding.etEmail.doAfterTextChanged { text ->
            viewModel.updateEmail(text.toString())
        }
    }

    override fun onDestroyView() {
        _binding = null  // (4)
        super.onDestroyView()
    }
}
```

```kotlin
class EditProfileViewModel(
    private val savedStateHandle: SavedStateHandle
) : ViewModel() {

    // (5) Draft data — survive process death
    // (3) Mỗi lần "name" hoặc "email" đổi, combine tạo state mới
    val uiState: StateFlow<EditProfileState> = combine(
        savedStateHandle.getStateFlow("name", ""),
        savedStateHandle.getStateFlow("email", "")
    ) { name, email ->
        EditProfileState(
            name = name,
            email = email,
            isValid = name.isNotBlank() && email.contains("@")
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), EditProfileState())

    fun updateName(name: String) { savedStateHandle["name"] = name }  // (2)
    fun updateEmail(email: String) { savedStateHandle["email"] = email }  // (2)
}
```

**Kết quả:** sau khi xoay màn hình, và sau khi kill process rồi mở lại app, hai ô tên và email hiện đúng draft đang gõ, nút Lưu giữ đúng trạng thái bật/tắt.

> [!TIP]
> **Test Process Death:** cách test giống Activity (`adb shell am kill`, và giới hạn của "Don't keep activities"), xem [Activity State Changes](../activity/state_changes.md), mục "Process Death — hiểu và test". Với Fragment, kiểm tra thêm Fragment trong backstack: sau khi mở lại app, bấm Back phải về đúng Fragment trước với đủ state.

## So sánh với Activity State Changes

Cơ chế cốt lõi giống nhau: cả Activity lẫn Fragment đều bị destroy/recreate khi Configuration Change, đều dùng `onSaveInstanceState` / `SavedStateHandle` để survive Process Death, đều dựa vào ViewModel để giữ dữ liệu qua xoay màn hình. Bạn đã học phần này ở topic 4.2.1.2 [Activity State Changes](../activity/state_changes.md).

| Đặc điểm | Activity (4.2.1.2) | Fragment (4.2.2.2) |
|---|---|---|
| Số vòng đời | 1 (Activity) | 2 (Fragment + View) |
| View có bị destroy riêng? | Không | Có — vào backstack thì View destroy, instance sống |
| Dữ liệu khởi tạo | Intent extras | `arguments` Bundle |
| LifecycleOwner để observe | `this` | `viewLifecycleOwner` |
| ViewModel scope | Scope theo Activity | `viewModels()` (theo Fragment) / `activityViewModels()` (theo Activity) |
| Ai lưu state khi recreate | Hệ thống | FragmentManager lưu & khôi phục từng Fragment + backstack |
| Survive process death | SavedStateHandle / Bundle | SavedStateHandle / Bundle (giống) |
| Giải pháp cũ đã deprecated | Không có | `setRetainInstance` (deprecated từ AndroidX Fragment 1.3.0) |

**Điểm thực chiến quan trọng nhất:** với Activity, hệ thống quản lý `savedInstanceState` của Activity; với Fragment, **FragmentManager** chịu trách nhiệm lưu/khôi phục state của mọi Fragment đang quản lý (kể cả Fragment nằm trong backstack). Khi xoay màn hình, FragmentManager tự khôi phục đúng Fragment đang hiển thị — bạn chỉ cần lo phần dữ liệu (`arguments`, ViewModel, `SavedStateHandle`), không cần tự tay khôi phục Fragment instance.

## Sai lầm thường gặp

### 1. Dùng constructor parameter để truyền data

`class MyFragment(val userId: String)` sẽ crash khi system recreate Fragment vì system gọi **no-args constructor**.

**Cách sửa:** Dùng `arguments` Bundle hoặc SafeArgs (Jetpack Navigation).

### 2. Dùng activityViewModels() cho data chỉ cần tạm thời

ViewModel scope theo Activity tồn tại cho đến khi Activity bị destroy. Nếu Fragment chỉ cần data tạm thời mà dùng `activityViewModels()`, data sẽ chiếm bộ nhớ suốt vòng đời Activity.

**Cách sửa:** Chỉ dùng `activityViewModels()` cho data thực sự cần chia sẻ. Dùng `viewModels()` cho data riêng.

### 3. Lưu dữ liệu lớn vào SavedStateHandle

SavedStateHandle ghi vào saved state Bundle nên chịu cùng khuyến nghị kích thước (xem [Activity State Changes](../activity/state_changes.md), mục "onSaveInstanceState: transient UI state (View/XML)"). Không lưu bitmap, large list, hoặc complex object.

**Cách sửa:** Lưu key/ID trong SavedStateHandle, re-fetch data khi restore.

## Lịch sử phát triển

- **Android 3.0 (API 11):** `setArguments()` và `setRetainInstance()` có từ API level 11 trong `android.app.Fragment`. Bản Fragment của framework bị deprecated từ API 28, thay bằng Fragment của AndroidX.
- **09/2019 (Fragment 1.1.0):** `fragment-ktx` thêm hai property delegate `by viewModels()` (ViewModel theo Fragment) và `by activityViewModels()` (ViewModel theo Activity).
- **01/2020 (Fragment 1.2.0):** `SavedStateViewModelFactory` thành factory mặc định khi dùng `by viewModels()`, `by activityViewModels()` hoặc constructor `ViewModelProvider` với Fragment (từ bản 1.2.0-alpha02, 08/2019); cùng lúc Lifecycle ViewModel SavedState 1.0.0 ra mắt `SavedStateHandle` (chi tiết ở [Activity State Changes](../activity/state_changes.md), mục "Lịch sử phát triển").
- **02/2021 (Fragment 1.3.0):** `setRetainInstance()` bị deprecated (từ bản 1.3.0-alpha01, 03/2020).

### setRetainInstance: deprecated và thay thế

Trước đây, `setRetainInstance(true)` cho phép Fragment instance tồn tại qua configuration change (Activity bị recreate nhưng Fragment instance giữ nguyên). Cách này đã **deprecated từ AndroidX Fragment 1.3.0** (API 28 là mốc deprecate `android.app.Fragment` của framework, không phải `setRetainInstance` của AndroidX).

**Lý do deprecated:**
- Gây rối loạn lifecycle: Fragment instance sống nhưng host Activity mới, context cũ bị leak
- Không tương thích với Navigation Component
- ViewModel đã giải quyết hoàn toàn nhu cầu retain data qua configuration change

Release notes của Fragment 1.3.0 nêu lý do: ViewModel là API riêng để giữ state, gắn được với Activity, Fragment và Navigation graph, nên Fragment không cần được retain nữa và tránh được một nguồn leak phổ biến.

**Thay thế:** Dùng `ViewModel` cho mọi trường hợp cần retain data.

## Kết nối hệ thống

- **Tiên quyết:**
  - [Fragment Lifecycle](lifecycle.md): hai vòng đời Fragment và View, chuyện gì xảy ra khi Fragment vào backstack.
  - [Activity State Changes](../activity/state_changes.md) — nền tảng mà Fragment State Changes thừa hưởng: vì sao recreate, configuration change với process death, cơ chế ViewModel và `SavedStateHandle`.
- **Học tiếp:**
  - [FragmentManager](fragment_manager.md) — transaction (`add`/`replace`/`remove`), backstack, và cách FragmentManager lưu/khôi phục state của từng Fragment.
  - [Dialog and DialogFragment](dialog_and_dialogfragment.md) — màn hình dialog có vòng đời riêng và cách lưu state khi rotate.
- **Liên quan:**
  - [Parcelables and Bundle](../activity/parcelables_and_bundle.md): kiểu dữ liệu và giới hạn kích thước của `arguments` và saved state.
  - 6.4 ViewModel (chưa có bài): factory, Hilt, `viewModelScope`.

## Nguồn tham khảo

- [Save UI States - Android Developers](https://developer.android.com/topic/libraries/architecture/saving-states)
- [ViewModel Overview - Android Developers](https://developer.android.com/topic/libraries/architecture/viewmodel)
- [SavedStateHandle - Android Developers](https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-savedstate)
- [Fragment Arguments (setArguments) - Android Developers](https://developer.android.com/reference/androidx/fragment/app/Fragment#setArguments(android.os.Bundle))
- [Fragment (setRetainInstance deprecated) - Android Developers](https://developer.android.com/reference/androidx/fragment/app/Fragment)
- [android.app.Fragment (setArguments, setRetainInstance: API 11; deprecated API 28) - Android Developers](https://developer.android.com/reference/android/app/Fragment)
- [Fragment release notes (1.1.0: by viewModels/activityViewModels, 1.2.0: SavedStateViewModelFactory mặc định, 1.3.0: setRetainInstance deprecated) - Android Developers](https://developer.android.com/jetpack/androidx/releases/fragment)
- [Parcelables and bundles (giới hạn kích thước) - Android Developers](https://developer.android.com/guide/components/activities/parcelables-and-bundles)
- [Activity lifecycle / state changes - Android Developers](https://developer.android.com/guide/components/activities/activity-lifecycle)
