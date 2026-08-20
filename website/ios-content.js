/* ============================================================
   Knowledge OS — iOS Module: Content & Knowledge Base
   ============================================================ */

const IOS_CONTENT = {};

Object.assign(IOS_CONTENT, {

  'ios-session-01-overview': {
    title: 'Session 01: Ngôn ngữ, Quản lý Bộ nhớ & Runtime trong iOS',
    summary: 'Tổng quan nền tảng cốt lõi của iOS Developer: Objective-C vs Swift, Kiến trúc bộ nhớ Stack - Heap - Queue, Automatic Reference Counting (ARC) và cơ chế Objective-C Runtime.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '30 phút',
    depth: 'deep-dive',
    tags: ['ios', 'swift', 'objc', 'memory', 'runtime', 'arc'],
    domain: 'iOS Development',
    module: 'Session 01: Languages, Memory & Runtime',
    prerequisites: [],
    related: ['ios-swift-closures', 'ios-mrc-arc-retain', 'ios-runtime-messaging'],
    learningOutcomes: [
      'Nắm vững sự tiến hóa từ Objective-C/C++ sang Swift và cơ chế Toll-Free Bridging.',
      'Hiểu rõ sự khác biệt giữa Stack, Heap, Value Type và Reference Type trong Swift/iOS.',
      'Nắm vững cơ chế ARC (Strong, Weak, Unowned) và cách phòng chống Retain Cycles.',
      'Giải thích được cách thức Objective-C Runtime xử lý Message Dispatch và Method Swizzling.'
    ],
    knowledgeGap: 'Nhiều lập trình viên chỉ dùng cú pháp Swift mà không hiểu bản chất quản lý bộ nhớ bên dưới hoặc cơ chế Dynamic Messaging của Cocoa Runtime, dẫn đến rò rỉ bộ nhớ (memory leaks) và khó debug các lỗi crash sâu.',
    updatedAt: '2026-08-19',
    readTime: '30 phút',
    content: `
<h2>Bản chất nền tảng của hệ sinh thái iOS</h2>
<p>Phát triển iOS không chỉ đơn thuần là viết code giao diện, mà đòi hỏi sự thấu hiểu sâu sắc về kiến trúc runtime bên dưới của Apple — nơi mà <strong>Objective-C Runtime</strong> và <strong>Swift ABI</strong> cùng chung sống và vận hành trên nền <strong>Darwin / XNU Kernel</strong>.</p>

<div class="mermaid">
graph TD
    subgraph "Language & Syntax Layer"
        Swift["Swift 5.x / 6.0<br/>(Type Safety, Value Semantics)"]
        ObjC["Objective-C / C++<br/>(Dynamic Messaging)"]
    end

    subgraph "Execution & Memory Model"
        ARC["ARC Engine<br/>(Reference Counting)"]
        Runtime["Obj-C Runtime / Swift Metadata<br/>(Dynamic Dispatch, Swizzling)"]
        Memory["Stack (Values) / Heap (Objects)"]
    end

    subgraph "Framework Layer"
        Foundation["Foundation / CoreFoundation<br/>(Toll-Free Bridging)"]
        UIKit["UIKit & CoreGraphics"]
    end

    Swift --> Runtime
    ObjC --> Runtime
    Runtime --> ARC
    ARC --> Memory
    Memory --> Foundation
    Foundation --> UIKit
</div>

<h2>Nội dung trọng tâm của Session 01</h2>
<ul>
  <li><strong>1.1 Languages:</strong> So sánh Objective-C (Blocks, KVC/KVO, Toll-Free Bridging) với Swift hiện đại (Closures, Generics, Protocol-Oriented Programming).</li>
  <li><strong>1.2 Memory Management:</strong> Phân tích Stack vs Heap, Value vs Reference Type, MRC vs ARC, Retain Cycles và cơ chế AutoReleasePool.</li>
  <li><strong>1.3 Runtime:</strong> Cơ chế gửi tin nhắn (<code>objc_msgSend</code>), Dynamic Method Resolution, Forwarding Invocation và Method Swizzling.</li>
</ul>

<h2>Roadmap học tập đề xuất</h2>
<p>Bắt đầu từ việc nắm vững mô hình bộ nhớ Stack/Heap và sự khác biệt giữa <code>struct</code> và <code>class</code>, sau đó đi sâu vào ARC để viết code không bị leak, cuối cùng tìm hiểu Runtime để làm chủ các kỹ thuật nâng cao và xử lý bug hóc búa.</p>
`
  },

  'ios-swift-for-kotlin-devs': {
    title: 'Swift for Kotlin Developers: Cú pháp & Thực chiến iOS',
    summary: 'Cẩm nang thực chiến chuyển đổi từ Kotlin sang Swift dành cho Android Developer — Nắm vững toàn bộ cú pháp nền tảng (biến, hàm, tuples, properties, initializers, optionals, struct/class, ARC, closures, generics, error handling, concurrency) theo chuẩn Apple để code SwiftUI ngay.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['ios', 'swift', 'kotlin', 'migration', 'syntax', 'android-to-ios', 'uikit', 'swiftui', 'arc', 'optionals'],
    domain: 'iOS Development',
    module: 'Session 01: Languages, Memory & Runtime',
    prerequisites: [],
    related: ['ios-swift-closures', 'ios-swift-initializers', 'ios-swift-protocols-structs', 'ios-mrc-arc-retain'],
    learningOutcomes: [
      'Nắm vững toàn bộ cú pháp nền tảng Swift: let/var, Type Inference, Tuples, Range, Properties, Initializers, Access Control, typealias.',
      'Hiểu sâu sự khác biệt giữa ARC (Swift) và Garbage Collection (Kotlin/JVM) để tránh Memory Leak với [weak self].',
      'Làm chủ hệ thống Argument Labels, inout, mutating và Optional Handling với guard let/if let/try?/try!.',
      'Phân biệt Value Types (struct) vs Reference Types (class/data class) và khi nào dùng struct hay class.',
      'Sử dụng thành thạo Closures, Generics, Error Handling, async/await và viết code UIKit/SwiftUI chuẩn Apple ngay sau khi học xong.'
    ],
    knowledgeGap: 'Kotlin dev thường mắc bẫy đem nguyên tư duy Reference Type (class + GC) sang Swift, dẫn đến Retain Cycles trong closures, crash khi dùng Force Unwrap (!) và quên Argument Label khi gọi hàm.',
    updatedAt: '2026-08-20',
    readTime: '35 phút',
    content: `
<h2>Mental Model: Bản đồ chuyển đổi tư duy</h2>
<p>Cả Kotlin và Swift đều là ngôn ngữ hiện đại, type-safe và null-safe. Tuy nhiên, <strong>kiến trúc thực thi bên dưới có sự khác biệt cốt tử</strong> mà nếu không nắm vững sẽ gây ra lỗi crash và rò rỉ bộ nhớ nghiêm trọng:</p>

<div class="mermaid">
graph TD
    subgraph "Kotlin / Android"
        K1["val / var"]
        K2["Null: T? + Smart Cast (x != null)"]
        K3["Data Model: data class (Reference Type)"]
        K4["Memory: JVM Garbage Collector"]
        K5["OOP: Class + Interface"]
        K6["Async: Coroutines (suspend / Flow)"]
    end

    subgraph "Swift / iOS"
        S1["let / var"]
        S2["Null: Optional + guard let / if let / ??"]
        S3["Data Model: struct (Value Type, Copy-on-Write)"]
        S4["Memory: ARC (weak self trong closure)"]
        S5["POP: Protocol + Struct + Extension"]
        S6["Async: async/await + Task + @MainActor"]
    end

    K1 -.-> S1
    K2 -.-> S2
    K3 -.-> S3
    K4 -.-> S4
    K5 -.-> S5
    K6 -.-> S6
</div>

<h2>1. Khai báo Biến, Hằng & String Interpolation</h2>

<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Kotlin</th>
      <th style="text-align:left;padding:10px;">Swift</th>
      <th style="text-align:left;padding:10px;">Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>val x = 10</code></td>
      <td style="padding:10px;"><code>let x = 10</code></td>
      <td style="padding:10px;">Hằng số. Swift: bất biến hoàn toàn với struct (Deep Immutability)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>var x = 10</code></td>
      <td style="padding:10px;"><code>var x = 10</code></td>
      <td style="padding:10px;">Biến số, có thể gán lại</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>"Xin chào $name"</code></td>
      <td style="padding:10px;"><code>"Xin chào \(name)"</code></td>
      <td style="padding:10px;">String Interpolation, Swift dùng cú pháp <code>\(expression)</code></td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>Boolean</code> / <code>Unit</code></td>
      <td style="padding:10px;"><code>Bool</code> / <code>Void</code></td>
      <td style="padding:10px;">Tên kiểu rút gọn hơn trong Swift</td>
    </tr>
  </tbody>
</table>

<pre><code class="language-swift">let appName: String = "Knowledge OS"  // Hằng số — Type annotation tường minh
let version = 2.0                       // Type Inference: Double

var counter: Int = 0
counter += 1

// String Interpolation
let name = "Hazu"
let age = 25
let greeting = "Xin chào \(name), năm sau bạn \(age + 1) tuổi"

// Multiline String
let multiline = """
    Dòng 1
    Dòng 2
    """
</code></pre>

<h2>2. Optionals: Bỏ tư duy Smart Cast, Làm chủ guard let & if let</h2>
<p>Trong Swift, <code>Optional</code> là một enum thực sự: <code>case none</code> (nil) và <code>case some(Wrapped)</code>. Swift <strong>không có Smart Cast</strong> sau <code>if (x != nil)</code> như Kotlin — bạn phải unwrap tường minh.</p>

<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Kotlin</th>
      <th style="text-align:left;padding:10px;">Swift tương đương</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>email?.length</code></td>
      <td style="padding:10px;"><code>email?.count</code> (Optional Chaining)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>email ?: "default"</code></td>
      <td style="padding:10px;"><code>email ?? "default"</code> (Nil-Coalescing)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>if (x != null) { ... }</code></td>
      <td style="padding:10px;"><code>if let x = x { ... }</code> (Optional Binding)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>val id = id ?: return</code></td>
      <td style="padding:10px;"><code>guard let id = id else { return }</code> (Early Exit)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>email!!</code> (NPE)</td>
      <td style="padding:10px;"><code>email!</code> (Fatal Error / Crash — hạn chế tối đa)</td>
    </tr>
  </tbody>
</table>

<div class="mermaid">
flowchart TD
    Start["Bắt đầu hàm"] --> Check{"guard let token = userToken else"}
    Check -- "token == nil" --> Fail["Log lỗi / Alert UI\n-> return / throw"]
    Check -- "token != nil" --> Unwrap["token là non-optional trong toàn bộ scope phía dưới"]
    Unwrap --> Logic["Xử lý API / Business Logic với token"]
</div>

<pre><code class="language-swift">func submitOrder(productId: String?, quantity: Int?) {
    // Kiểm tra đồng thời nhiều optionals + điều kiện logic
    guard let productId = productId,
          let quantity = quantity, quantity > 0 else {
        print("Dữ liệu đầu vào không hợp lệ!")
        return // BẮT BUỘC return, throw hoặc break
    }
    // Từ đây: productId và quantity là non-optional
    print("Đặt hàng \(productId) x\(quantity)")
}
</code></pre>

<h2>3. Hàm & Argument Labels (Cú pháp đặc trưng của Swift)</h2>
<p>Mỗi tham số Swift có thể có <strong>Argument Label</strong> (nhãn khi gọi — đọc như câu tiếng Anh) và <strong>Parameter Name</strong> (tên biến dùng trong thân hàm). Đây là điểm cú pháp khác biệt lớn nhất so với Kotlin.</p>

<pre><code class="language-swift">// 1. Nhãn ngoài (to) vs tên trong (recipient)
func sendNotification(to recipient: String, message: String, isUrgent: Bool = false) {
    print("Gửi tới \(recipient): \(message)")
}
// Khi gọi — đọc như câu tiếng Anh:
sendNotification(to: "user_123", message: "Họp lúc 9h")
sendNotification(to: "user_123", message: "Báo động!", isUrgent: true)

// 2. Bỏ nhãn bằng '_' — giống phong cách Kotlin/C
func sum(_ a: Int, _ b: Int) -> Int { return a + b }
let total = sum(10, 20)

// 3. inout — sửa trực tiếp biến gốc (truyền bằng &)
func swapValues(_ a: inout Int, _ b: inout Int) {
    let temp = a; a = b; b = temp
}
var x = 10, y = 20
swapValues(&x, &y) // x: 20, y: 10
</code></pre>

<h2>4. data class (Kotlin) vs struct (Swift): Value Type Semantics</h2>
<p>Trong Kotlin, <code>data class</code> là <strong>Reference Type</strong> (phân bổ trên Heap, truyền theo con trỏ tham chiếu). Trong Swift, <code>struct</code> là <strong>Value Type</strong> — khi gán hoặc truyền vào hàm, nó <strong>sao chép giá trị độc lập</strong>.</p>

<div class="mermaid">
graph LR
    subgraph "Kotlin: Reference Type"
        u1k["var u1 = User('Alice')"] --> heap["User('Alice') trên Heap"]
        u2k["var u2 = u1"] --> heap
        note1["u2.name = 'Bob' => u1.name cũng thành 'Bob'!"]
    end
    subgraph "Swift: Value Type (Struct)"
        u1s["var u1 = User('Alice')"] --> mem1["Bản copy 1: Alice"]
        u2s["var u2 = u1"] --> mem2["Bản copy 2: Alice (độc lập)"]
        note2["u2.name = 'Bob' => u1.name vẫn là 'Alice'"]
    end
</div>

<pre><code class="language-swift">struct Product: Equatable, Identifiable {
    let id: String
    var name: String
    var price: Double

    // Phương thức sửa đổi thuộc tính bên trong struct PHẢI có từ khoá 'mutating'
    mutating func applyDiscount(percentage: Double) {
        price = price * (1.0 - percentage / 100.0)
    }
}

var p1 = Product(id: "1", name: "iPhone 15", price: 999.0)
var p2 = p1           // SAO CHÉP ĐỘC LẬP ngay lập tức
p2.applyDiscount(percentage: 10.0)

print(p1.price)       // 999.0 — Không bị ảnh hưởng
print(p2.price)       // 899.1
</code></pre>

<blockquote style="border-left:4px solid var(--accent);padding:12px 16px;margin:1.5rem 0;background:var(--surface-raised);">
  <strong>Quy tắc vàng:</strong> Mặc định luôn dùng <code>struct</code> cho Models, ViewState, DTO, Entity. Chỉ dùng <code>class</code> khi cần chia sẻ trạng thái dùng chung (ViewModel, Service, Manager) hoặc kế thừa UIKit class (<code>UIViewController</code>, <code>UIView</code>).
</blockquote>

<h2>5. Collections thực chiến (Array, Dictionary, Set)</h2>
<p>Swift không phân chia <code>List</code> / <code>MutableList</code>. Tính mutable được kiểm soát bằng <code>let</code> (Immutable) hoặc <code>var</code> (Mutable).</p>

<pre><code class="language-swift">// Array
let immutable: [String] = ["Swift", "Kotlin"] // Không thể append/remove
var mutableArr = ["Swift", "Kotlin"]
mutableArr.append("Dart")

// Higher-order functions — dùng $0 thay cho 'it'
let numbers = [1, 2, 3, 4, 5]
let doubled  = numbers.map    { $0 * 2 }
let evens    = numbers.filter { $0 % 2 == 0 }
let total    = numbers.reduce(0) { $0 + $1 }

// compactMap: lọc bỏ nil (cực kỳ hay dùng)
let strings  = ["1", "2", "abc", "4"]
let ints     = strings.compactMap { Int($0) }  // [1, 2, 4]

// Dictionary — truy cập key luôn trả về Optional (Int?)
let scores: [String: Int] = ["Alice": 95, "Bob": 80]
if let aliceScore = scores["Alice"] {
    print("Điểm Alice: \(aliceScore)")
}
let bobScore = scores["Bob"] ?? 0    // Nil-Coalescing
</code></pre>

<h2>6. Rẽ nhánh & Pattern Matching: when vs switch</h2>
<p><code>switch</code> trong Swift là <strong>Exhaustive</strong> (phải vét cạn hoặc có <code>default</code>), <strong>không bị fall-through</strong> (không cần <code>break</code>), và hỗ trợ Pattern Matching cực mạnh với Enum có Associated Values.</p>

<pre><code class="language-swift">enum ViewState {
    case loading
    case success(items: [String])
    case error(code: Int, message: String)
}

func render(state: ViewState) {
    switch state {
    case .loading:
        showLoading(true)

    case .success(let items):
        displayList(items)

    // Pattern Matching kết hợp điều kiện where
    case .error(code: 401, _):
        redirectToLogin()

    case .error(let code, let message) where code >= 500:
        showServerError(message)

    case .error(_, let message):
        showError(message)
    }
}
</code></pre>

<h2>7. Closures & Bẫy bộ nhớ ARC [weak self]</h2>
<p>Kotlin dùng JVM Garbage Collector — chu trình tham chiếu vòng vẫn được dọn dẹp tự động. Swift dùng <strong>ARC</strong> — nếu <code>self</code> giữ closure và closure capture <code>self</code> mạnh (strong), tạo ra <strong>Retain Cycle</strong>: đối tượng không bao giờ được giải phóng khỏi RAM.</p>

<div class="mermaid">
graph LR
    subgraph "Retain Cycle (Memory Leak)"
        VM1["ViewModel"] -- "strong ref" --> CB1["Closure Callback"]
        CB1 -- "capture self (strong)" --> VM1
    end
    subgraph "Giải pháp: [weak self]"
        VM2["ViewModel"] -- "strong ref" --> CB2["Closure Callback"]
        CB2 -. "weak ref (không tăng RC)" .-> VM2
    end
</div>

<pre><code class="language-swift">class UserViewModel {
    var onStateChanged: ((String) -> Void)?
    var userName = ""

    func fetchProfile() {
        ApiService.shared.getUser { [weak self] result in
            // self là Optional lúc này (UserViewModel?)
            guard let self = self else { return }
            switch result {
            case .success(let user):
                self.userName = user.name
                self.onStateChanged?(self.userName)
            case .failure(let error):
                print("Lỗi: \(error)")
            }
        }
    }

    deinit {
        print("UserViewModel đã được giải phóng an toàn!")
    }
}
</code></pre>

<h2>8. Protocol-Oriented Programming (POP) & Extensions</h2>
<p>Trong Swift, <code>protocol</code> tương đương <code>interface</code> Kotlin. Kết hợp với <code>extension</code>, bạn có thể thêm Default Implementation và mở rộng bất kỳ kiểu dữ liệu nào — kể cả kiểu của Apple (<code>String</code>, <code>Int</code>, <code>UIView</code>).</p>

<pre><code class="language-swift">// 1. Định nghĩa Protocol
protocol BaseViewProtocol: AnyObject {
    func showLoading()
    func hideLoading()
    func showError(message: String)
}

// 2. Default Implementation qua Protocol Extension
extension BaseViewProtocol {
    func showError(message: String) {
        print("Alert mặc định: \(message)")
    }
}

// 3. Mở rộng kiểu sẵn có — không cần chạm vào source gốc
extension String {
    var isValidEmail: Bool {
        return self.contains("@") && self.contains(".")
    }
}
print("hazu@ios.dev".isValidEmail) // true
</code></pre>

<h2>9. Property Observers: willSet & didSet (Đặc sản UIKit)</h2>
<p>Tương đương <code>Delegates.observable</code> hay custom setter trong Kotlin. Trong UIKit, <code>didSet</code> là pattern chuẩn để cập nhật UI tự động khi data thay đổi:</p>

<pre><code class="language-swift">class ProductCell: UITableViewCell {
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var priceLabel: UILabel!

    // Khi gán cell.product = newProduct, didSet tự động update UI
    var product: Product? {
        didSet {
            guard let product = product else { return }
            titleLabel.text = product.name
            priceLabel.text = String(format: "$%.2f", product.price)
        }
    }
}
</code></pre>

<h2>10. Swift Concurrency vs Kotlin Coroutines</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Khái niệm</th>
      <th style="text-align:left;padding:10px;">Kotlin Coroutines</th>
      <th style="text-align:left;padding:10px;">Swift Concurrency</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;">Hàm bất đồng bộ</td>
      <td style="padding:10px;"><code>suspend fun fetch(): User</code></td>
      <td style="padding:10px;"><code>func fetch() async throws -> User</code></td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;">Điểm gọi chờ</td>
      <td style="padding:10px;"><code>val user = fetchUser()</code></td>
      <td style="padding:10px;"><code>let user = try await fetchUser()</code></td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;">Tạo Scope</td>
      <td style="padding:10px;"><code>lifecycleScope.launch { ... }</code></td>
      <td style="padding:10px;"><code>Task { ... }</code></td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;">Main Thread</td>
      <td style="padding:10px;"><code>withContext(Dispatchers.Main)</code></td>
      <td style="padding:10px;"><code>@MainActor</code> (annotation trên class/func)</td>
    </tr>
  </tbody>
</table>

<pre><code class="language-swift">func loadUserData(userId: String) async throws -> User {
    let (data, _) = try await URLSession.shared.data(from: URL(string: "https://api.example.com/users/\(userId)")!)
    return try JSONDecoder().decode(User.self, from: data)
}

// Gọi trong UIViewController:
Task { @MainActor in
    do {
        let user = try await loadUserData(userId: "123")
        self.updateUI(with: user)
    } catch {
        self.showError(error.localizedDescription)
    }
}
</code></pre>

<h2>11. Quick Cheat Sheet: Kotlin → Swift</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:13px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:8px;">Nhu cầu</th>
      <th style="text-align:left;padding:8px;">Kotlin</th>
      <th style="text-align:left;padding:8px;">Swift</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Hằng số</td><td style="padding:8px;"><code>val x = 10</code></td><td style="padding:8px;"><code>let x = 10</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Ép kiểu an toàn</td><td style="padding:8px;"><code>obj as? String</code></td><td style="padding:8px;"><code>obj as? String</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Ép kiểu bắt buộc</td><td style="padding:8px;"><code>obj as String</code></td><td style="padding:8px;"><code>obj as! String</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Kiểm tra kiểu</td><td style="padding:8px;"><code>if (x is String)</code></td><td style="padding:8px;"><code>if x is String</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Giá trị mặc định khi null</td><td style="padding:8px;"><code>str ?: "default"</code></td><td style="padding:8px;"><code>str ?? "default"</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Early return khi null</td><td style="padding:8px;"><code>val id = id ?: return</code></td><td style="padding:8px;"><code>guard let id = id else { return }</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Kiểm tra rỗng</td><td style="padding:8px;"><code>list.isEmpty()</code></td><td style="padding:8px;"><code>list.isEmpty</code> (Property)</td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Vòng lặp Range</td><td style="padding:8px;"><code>for i in 0 until 5</code></td><td style="padding:8px;"><code>for i in 0..&lt;5</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Lambda shorthand</td><td style="padding:8px;"><code>it</code></td><td style="padding:8px;"><code>$0</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">In ra console</td><td style="padding:8px;"><code>println("...")</code></td><td style="padding:8px;"><code>print("...")</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Singleton</td><td style="padding:8px;"><code>object AppManager</code></td><td style="padding:8px;"><code>class AppManager { static let shared = AppManager(); private init() {} }</code></td></tr>
    <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px;">Lazy init</td><td style="padding:8px;"><code>val x by lazy { ... }</code></td><td style="padding:8px;"><code>lazy var x = ...</code></td></tr>
  </tbody>
</table>

<h2>12. 5 Bẫy cú pháp Kotlin Dev dễ mắc nhất</h2>
<ol style="line-height:2.2;">
  <li><strong>Quên Argument Label khi gọi hàm:</strong> <code>login("hazu", "123")</code> sẽ compile error. Phải viết <code>login(username: "hazu", password: "123")</code>.</li>
  <li><strong>Khai báo <code>class</code> cho mọi Model:</strong> Mặc định dùng <code>struct</code>. Chỉ dùng <code>class</code> khi cần chia sẻ trạng thái chung hoặc kế thừa UIKit.</li>
  <li><strong>Quên <code>[weak self]</code> trong Closure bất đồng bộ:</strong> Luôn dùng <code>[weak self]</code> khi closure có thể sống lâu hơn <code>self</code>.</li>
  <li><strong>Lạm dụng Force Unwrap <code>!</code>:</strong> Dùng <code>guard let</code>, <code>if let</code>, hoặc <code>??</code>. Hạn chế <code>!</code> tối đa để tránh crash runtime.</li>
  <li><strong>So sánh Struct bằng <code>==</code> mà quên <code>Equatable</code>:</strong> Thêm <code>: Equatable</code> vào khai báo struct để compiler tự tổng hợp hàm so sánh.</li>
</ol>
`
  },

  'ios-mrc-arc-retain': {
    title: 'MRC, ARC & Phòng chống Retain Cycle',
    summary: 'Phân tích chuyên sâu về cơ chế quản lý bộ nhớ trong iOS: Từ Manual Reference Counting (MRC) đến Automatic Reference Counting (ARC). Hiểu rõ Strong, Weak, Unowned và giải quyết Retain Cycle.',
    status: 'published',
    difficulty: 'advanced',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['ios', 'memory', 'arc', 'retain-cycle', 'weak', 'unowned'],
    domain: 'iOS Development',
    module: 'Session 01: Languages, Memory & Runtime',
    prerequisites: ['ios-session-01-overview', 'ios-stack-queue-heap'],
    related: ['ios-autoreleasepool', 'ios-swift-closures'],
    learningOutcomes: [
      'Hiểu rõ nguyên lý hoạt động của Reference Counter trong heap object.',
      'Phân biệt chính xác Strong, Weak và Unowned Reference trong Swift.',
      'Nhận diện và phá vỡ Retain Cycle trong Closures, Delegate Pattern và Timer/Notification.',
      'Sử dụng Memory Graph Debugger và Instruments Leaks để phát hiện rò rỉ bộ nhớ.'
    ],
    knowledgeGap: 'Lạm dụng unowned gây crash do dangling pointer, hoặc quên capture list [weak self] trong closure bất đồng bộ gây giữ chặt ViewController trong bộ nhớ.',
    updatedAt: '2026-08-19',
    readTime: '35 phút',
    content: `
<h2>Vấn đề cần giải quyết</h2>
<p>Trong môi trường di động với tài nguyên bộ nhớ hạn chế (RAM từ 3GB - 8GB), nếu các object tham chiếu vòng chéo lẫn nhau (Retain Cycle), bộ đếm tham chiếu (Reference Count) không bao giờ về 0, dẫn đến <strong>Memory Leak</strong>. Hậu quả là thiết bị bị tụt pin, giật lag và hệ thống (Jetsam) sẽ chủ động kill ứng dụng (OOM Crash).</p>

<h2>Cơ chế hoạt động của ARC</h2>
<p>ARC là một tính năng của <strong>Clang Compiler</strong> kết hợp với <strong>Swift Runtime</strong>. Trình biên dịch sẽ tự động chèn các lời gọi <code>retain</code> (tăng count) và <code>release</code> (giảm count) vào đúng thời điểm mã thực thi.</p>

<div class="mermaid">
flowchart LR
    A["Object Allocation<br/>(RC = 1)"] --> B["Strong Reference Added<br/>(RC = 2)"]
    B --> C["Strong Reference Removed<br/>(RC = 1)"]
    C --> D["Last Strong Ref Removed<br/>(RC = 0)"]
    D --> E["deinit called"]
    E --> F["Memory Deallocated"]
</div>

<h2>Strong vs Weak vs Unowned Reference</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Kiểu tham chiếu</th>
      <th style="text-align:left;padding:10px;">Ảnh hưởng RC</th>
      <th style="text-align:left;padding:10px;">Tính chất Optional</th>
      <th style="text-align:left;padding:10px;">Khi đối tượng bị giải phóng</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><strong>Strong</strong></td>
      <td style="padding:10px;">Tăng RC lên +1</td>
      <td style="padding:10px;">Không bắt buộc</td>
      <td style="padding:10px;">Giữ object luôn tồn tại</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><strong>Weak</strong></td>
      <td style="padding:10px;">Không tăng RC (0)</td>
      <td style="padding:10px;">Bắt buộc là Optional (<code>var</code>)</td>
      <td style="padding:10px;">Tự động set về <code>nil</code> (Zeroing weak reference)</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><strong>Unowned</strong></td>
      <td style="padding:10px;">Không tăng RC (0)</td>
      <td style="padding:10px;">Non-optional (hoặc unowned optional)</td>
      <td style="padding:10px;">Không set về nil. Truy cập sau khi free sẽ gây <strong>Crash (Trap)</strong></td>
    </tr>
  </tbody>
</table>

<h2>Code minh họa: Retain Cycle trong Closure & Cách xử lý</h2>
<pre><code class="language-swift">// ❌ SAI: Retain Cycle giữa ViewController và NetworkService closure
class ProfileViewController: UIViewController {
    var networkService = NetworkService()
    var username: String = "John"

    override func viewDidLoad() {
        super.viewDidLoad()
        networkService.fetchData { [self] data in
            // self giữ networkService, networkService giữ closure, closure giữ strong self
            self.updateUI(data)
        }
    }
}

//  ĐÚNG: Sử dụng Capture List [weak self]
class ProfileViewController: UIViewController {
    var networkService = NetworkService()
    var username: String = "John"

    override func viewDidLoad() {
        super.viewDidLoad()
        networkService.fetchData { [weak self] data in
            guard let self = self else { return }
            self.updateUI(data)
        }
    }
}
</code></pre>
`
  },

  'ios-runtime-messaging': {
    title: 'Objective-C Runtime & Message Dispatch',
    summary: 'Cơ chế cốt lõi phía sau Objective-C và khả năng dynamic của iOS: objc_msgSend, Method Resolution, Fast Forwarding và Normal Forwarding.',
    status: 'published',
    difficulty: 'advanced',
    estimatedReadingTime: '25 phút',
    depth: 'deep-dive',
    tags: ['ios', 'runtime', 'objc', 'msgsend', 'swizzling'],
    domain: 'iOS Development',
    module: 'Session 01: Languages, Memory & Runtime',
    prerequisites: ['ios-session-01-overview'],
    related: ['ios-mrc-arc-retain'],
    learningOutcomes: [
      'Hiểu bản chất lời gọi hàm trong Objective-C: gửi tin nhắn thay vì gọi trực tiếp con trỏ hàm.',
      'Nắm vững 3 giai đoạn xử lý của Message Forwarding khi không tìm thấy selector.',
      'Biết cách ứng dụng Method Swizzling để hook phương thức phục vụ logging/analytics an toàn.'
    ],
    knowledgeGap: 'Nhiều kỹ sư không hiểu lý do vì sao một method gọi bị crash "unrecognized selector sent to instance" và cách can thiệp runtime an toàn.',
    updatedAt: '2026-08-19',
    readTime: '25 phút',
    content: `
<h2>Bản chất của Message Sending trong iOS</h2>
<p>Trong C++ hoặc Swift (Static Dispatch), khi gọi hàm <code>object.method()</code>, compiler xác định địa chỉ hàm tại thời điểm build (vtable hoặc direct pointer). Trong Objective-C, mọi lời gọi hàm đều được chuyển thành:</p>
<pre><code class="language-objc">objc_msgSend(receiver, selector, arg1, arg2, ...);
</code></pre>

<div class="mermaid">
flowchart TD
    A["objc_msgSend(receiver, @selector(doWork))"] --> B{"Tìm thấy method trong Cache / Dispatch Table?"}
    B -- Có --> C["Thực thi IMP con trỏ hàm"]
    B -- Không --> D["1. Dynamic Method Resolution<br/>(resolveInstanceMethod:)"]
    D -- Đã xử lý --> C
    D -- Không --> E["2. Fast Forwarding<br/>(forwardingTargetForSelector:)"]
    E -- Có Target khác --> F["Gửi tin nhắn sang Target mới"]
    E -- Không --> G["3. Normal Forwarding<br/>(methodSignatureForSelector: & forwardInvocation:)"]
    G -- Xử lý xong --> H["Hoàn tất"]
    G -- Không --> I["Crash: unrecognized selector sent to instance"]
</div>

<h2>Method Swizzling (Đổi ruột phương thức tại Runtime)</h2>
<p>Method Swizzling cho phép hoán đổi con trỏ <code>IMP</code> của hai selector trong quá trình runtime:</p>
<pre><code class="language-swift">extension UIViewController {
    static let swizzleViewWillAppear: Void = {
        let originalSelector = #selector(viewWillAppear(_:))
        let swizzledSelector = #selector(custom_viewWillAppear(_:))

        guard let originalMethod = class_getInstanceMethod(UIViewController.self, originalSelector),
              let swizzledMethod = class_getInstanceMethod(UIViewController.self, swizzledSelector) else { return }

        method_exchangeImplementations(originalMethod, swizzledMethod)
    }()

    @objc func custom_viewWillAppear(_ animated: Bool) {
        // Gọi lại custom_viewWillAppear nhưng thực chất là gọi original do đã swizzle!
        self.custom_viewWillAppear(animated)
        print("📊 [Analytics Tracker] Screen presented: \\(type(of: self))")
    }
}
</code></pre>
`
  },

  'ios-uikit-autolayout': {
    title: 'UIKit Foundation & AutoLayout Mastery',
    summary: 'Xây dựng giao diện iOS thích ứng linh hoạt: Cơ chế Cassowary Algorithm, Constraint Priorities, Content Compression Resistance, Intrinsic Content Size và tối ưu Layout Performance.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '30 phút',
    depth: 'deep-dive',
    tags: ['ios', 'uikit', 'autolayout', 'constraints', 'cassowary'],
    domain: 'iOS Development',
    module: 'Session 02: Lifecycle, UIKit & Controls',
    prerequisites: ['ios-session-02-overview'],
    related: ['ios-uiviewcontroller', 'ios-app-lifecycle'],
    learningOutcomes: [
      'Thấu hiểu công thức tuyến tính của AutoLayout: view1.attribute = multiplier * view2.attribute + constant.',
      'Giải thích cơ chế Content Hugging Priority (CHP) và Content Compression Resistance Priority (CCRP).',
      'Xử lý triệt để xung đột constraint (Unsatisfiable Constraints) và Ambiguous Layout.',
      'Hiểu chu kỳ Layout: updateConstraints -> layoutSubviews -> drawRect.'
    ],
    knowledgeGap: 'Xung đột constraint hoặc layout giật lag do gọi layoutSubviews/setNeedsLayout không đúng chu kỳ hiển thị của RunLoop.',
    updatedAt: '2026-08-19',
    readTime: '30 phút',
    content: `
<h2>Bản chất toán học của AutoLayout</h2>
<p>AutoLayout không đặt vị trí tĩnh theo tọa độ pixel (Frame), mà giải hệ phương trình tuyến tính dựa trên <strong>Thuật toán Cassowary</strong>:</p>
<pre><code class="language-swift">view1.attribute1 = view2.attribute2 * multiplier + constant
</code></pre>

<h2>Content Hugging vs Content Compression Resistance</h2>
<ul>
  <li><strong>Content Hugging Priority (CHP):</strong> "Đừng kéo giãn tôi ra!" — Quyết định độ ưu tiên ngăn không cho View phình to hơn kích thước nội tại (<code>intrinsicContentSize</code>).</li>
  <li><strong>Content Compression Resistance Priority (CCRP):</strong> "Đừng bóp nghẹt tôi!" — Quyết định độ ưu tiên ngăn không cho View bị co nhỏ hơn nội dung bên trong (tránh bị cắt chữ <code>...</code>).</li>
</ul>

<div class="mermaid">
graph LR
    subgraph "Intrinsic Content Size"
        Text["Label Text Content"]
    end
    CHP["Content Hugging (Chống kéo dãn)"] --> Text
    CCRP["Compression Resistance (Chống co nhỏ)"] --> Text
</div>
`
  },

  'ios-gcd-dispatch-queue': {
    title: 'Grand Central Dispatch (GCD) & Lập trình Concurrency',
    summary: 'Lập trình đa luồng hiện đại trong iOS: Serial vs Concurrent Queue, Sync vs Async, DispatchGroup, DispatchWorkItem, Semaphore và phòng chống Deadlock.',
    status: 'published',
    difficulty: 'advanced',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['ios', 'gcd', 'concurrency', 'multithreading', 'deadlock', 'semaphore'],
    domain: 'iOS Development',
    module: 'Session 04: GCD, Concurrency & OOP/POP',
    prerequisites: ['ios-session-01-overview'],
    related: ['ios-threads-synchronization'],
    learningOutcomes: [
      'Phân biệt rõ ràng giữa Sync vs Async (cơ chế block thread) và Serial vs Concurrent (cơ chế phân phối task).',
      'Tránh 100% lỗi Deadlock kinh điển khi gọi DispatchQueue.main.sync trên main thread.',
      'Áp dụng DispatchGroup và Semaphore để đồng bộ hóa nhiều luồng API bất đồng bộ.',
      'Sử dụng DispatchBarrier để giải quyết bài toán Reader-Writer Lock an toàn cho đa luồng.'
    ],
    knowledgeGap: 'Nhầm lẫn giữa Concurrency và Parallelism, gây race conditions hoặc nghẽn main thread dẫn đến giật frame (dropped frames).',
    updatedAt: '2026-08-19',
    readTime: '35 phút',
    content: `
<h2>Nguyên lý cốt lõi của GCD</h2>
<p>GCD trừu tượng hóa khái niệm quản lý Thread trực tiếp bằng <strong>Dispatch Queues</strong>. Bạn chỉ cần đưa Block công việc vào Queue, hệ thống sẽ tự động cấp phát và tái sử dụng Thread Pool tối ưu nhất cho CPU.</p>

<div class="mermaid">
flowchart TD
    subgraph "Queue Types"
        Main["DispatchQueue.main<br/>(Serial, UI Thread)"]
        Global["DispatchQueue.global(qos:)<br/>(Concurrent, Background)"]
        Custom["Custom DispatchQueue<br/>(Serial or Concurrent)"]
    end

    subgraph "Execution Modes"
        Sync["sync: Chặn luồng hiện tại cho tới khi hoàn tất"]
        Async["async: Trả quyền thực thi ngay lập tức, chạy song song"]
    end

    Global --> Async
    Async --> Main
</div>

<h2>QoS (Quality of Service) Levels</h2>
<ol>
  <li><strong>.userInteractive:</strong> Tác vụ tương tác trực tiếp UI, vẽ animation (Ưu tiên cao nhất).</li>
  <li><strong>.userInitiated:</strong> Tác vụ người dùng yêu cầu tức thì (vd: click mở file).</li>
  <li><strong>.default:</strong> Mức tiêu chuẩn khi không cấu hình QoS.</li>
  <li><strong>.utility:</strong> Tác vụ tốn thời gian kèm tiến độ (vd: download file lớn, import dữ liệu).</li>
  <li><strong>.background:</strong> Tác vụ chạy ngầm vô hình (vd: indexing, sync dữ liệu).</li>
</ol>
`
  },

  'ios-arch-mvvm-clean': {
    title: 'Kiến trúc iOS: MVC, MVVM, Clean Architecture & Coordinator',
    summary: 'Xây dựng mã nguồn iOS chuẩn mực: Tách biệt trách nhiệm, dễ kiểm thử (Testability), khả năng mở rộng với MVVM, Clean Swift (VIPER) và điều hướng luồng với Coordinator Pattern.',
    status: 'published',
    difficulty: 'advanced',
    estimatedReadingTime: '40 phút',
    depth: 'deep-dive',
    tags: ['ios', 'architecture', 'mvvm', 'clean-architecture', 'coordinator', 'viper'],
    domain: 'iOS Development',
    module: 'Session 07: Targets, Architecture & Access Control',
    prerequisites: ['ios-cocoa-mvc'],
    related: ['ios-swiftui-state-dataflow'],
    learningOutcomes: [
      'Khắc phục Massive View Controller (MVC) bằng MVVM và Coordinator.',
      'Thiết lập luồng Data Binding hai chiều với Combine, Closure hoặc RxSwift.',
      'Tổ chức dự án theo Clean Architecture 3 tầng: Presentation, Domain và Data layer.',
      'Viết Unit Test độc lập cho ViewModel và UseCase mà không cần khởi tạo UIKit.'
    ],
    knowledgeGap: 'Nhét toàn bộ logic gọi API, parse JSON, format chuỗi và chuyển màn hình vào trong UIViewController.',
    updatedAt: '2026-08-19',
    readTime: '40 phút',
    content: `
<h2>Vấn đề của Apple MVC: "Massive View Controller"</h2>
<p>Trong kiến trúc MVC nguyên bản của Apple, <code>UIViewController</code> vừa nắm giữ View hierarchy, vừa xử lý User Interaction, vừa gọi Network, vừa quản lý Navigation. Hậu quả là class phình to hàng nghìn dòng, không thể test được logic.</p>

<div class="mermaid">
graph LR
    subgraph "MVVM + Coordinator Flow"
        View["ViewController<br/>(Chỉ render UI & nhận input)"]
        VM["ViewModel<br/>(Biến đổi dữ liệu & State)"]
        Coord["Coordinator<br/>(Quản lý chuyển màn hình)"]
        UseCase["UseCase / Repository<br/>(Nghiệp vụ cốt lõi)"]
    end

    View -->|User Action| VM
    VM -->|Data Binding / State| View
    View -->|Yêu cầu chuyển màn| Coord
    VM -->|Yêu cầu dữ liệu| UseCase
</div>
`
  },

  'ios-swiftui-state-dataflow': {
    title: 'SwiftUI Data Flow: @State, @Binding, @StateObject, @ObservedObject & @Environment',
    summary: 'Làm chủ mô hình quản lý trạng thái khai báo trong SwiftUI: Phân biệt nguồn chân lý duy nhất (Single Source of Truth), vòng đời StateObject vs ObservedObject và truyền dữ liệu qua View Hierarchy.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '35 phút',
    depth: 'deep-dive',
    tags: ['ios', 'swiftui', 'state', 'binding', 'stateobject', 'environmentobject'],
    domain: 'iOS Development',
    module: 'SwiftUI: Declarative UI & Data Flow',
    prerequisites: ['ios-swiftui-essentials'],
    related: ['ios-arch-mvvm-clean'],
    learningOutcomes: [
      'Hiểu rõ nguyên lý: UI là hàm của State (UI = f(State)).',
      'Phân biệt khi nào dùng @StateObject (sở hữu vòng đời) và @ObservedObject (chỉ nhận reference từ ngoài).',
      'Sử dụng @Binding để truyền quyền sửa đổi dữ liệu cho subview mà không nhân bản state.',
      'Ứng dụng @Environment và @EnvironmentObject cho Global State toàn bộ ứng dụng.'
    ],
    knowledgeGap: 'Dùng @ObservedObject để khởi tạo đối tượng khiến ViewModel bị tạo lại liên tục mỗi khi cha Re-render, gây mất state và rò rỉ network calls.',
    updatedAt: '2026-08-19',
    readTime: '35 phút',
    content: `
<h2>Triết lý: Single Source of Truth trong SwiftUI</h2>
<p>Khác với UIKit (Imperative — bạn tự tìm view và thay đổi text), SwiftUI là <strong>Declarative</strong>. Bạn mô tả giao diện dựa trên State. Khi State thay đổi, SwiftUI tự động so sánh (diffing) và render lại phần giao diện cần thiết.</p>

<div class="mermaid">
graph TD
    State["@State / @StateObject<br/>(Source of Truth)"] -->|Data Binding $val| Binding["@Binding<br/>(Child Views)"]
    State -->|Render| UI["SwiftUI Body (View)"]
    User["User Interaction"] -->|Cập nhật| State
</div>

<h2>Bảng phân loại Property Wrappers</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border);">
      <th style="text-align:left;padding:10px;">Wrapper</th>
      <th style="text-align:left;padding:10px;">Kiểu dữ liệu</th>
      <th style="text-align:left;padding:10px;">Vòng đời (Lifecycle)</th>
      <th style="text-align:left;padding:10px;">Mục đích sử dụng</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>@State</code></td>
      <td style="padding:10px;">Value types (Struct, Int, String)</td>
      <td style="padding:10px;">Gắn liền với View hiện tại</td>
      <td style="padding:10px;">Trạng thái nội bộ của riêng View</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>@Binding</code></td>
      <td style="padding:10px;">Mọi kiểu dữ liệu</td>
      <td style="padding:10px;">Không sở hữu (Reference to State)</td>
      <td style="padding:10px;">Đọc/Ghi ngược lại State của cha</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>@StateObject</code></td>
      <td style="padding:10px;">ObservableObject (Class)</td>
      <td style="padding:10px;">Tạo 1 lần duy nhất, giữ qua Re-render</td>
      <td style="padding:10px;">Khởi tạo ViewModel tại View sở hữu</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>@ObservedObject</code></td>
      <td style="padding:10px;">ObservableObject (Class)</td>
      <td style="padding:10px;">Phụ thuộc đối tượng truyền vào</td>
      <td style="padding:10px;">Nhận ViewModel từ bên ngoài truyền vào</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px;"><code>@EnvironmentObject</code></td>
      <td style="padding:10px;">ObservableObject (Class)</td>
      <td style="padding:10px;">Toàn bộ cây View phân nhánh</td>
      <td style="padding:10px;">Dữ liệu dùng chung (Theme, User Session)</td>
    </tr>
  </tbody>
</table>
`
  },

  'ios-publish-release-management': {
    title: 'Quy trình Release App Store & Phased Release',
    summary: 'Từ mã nguồn đến App Store: Chuẩn bị chứng chỉ (Certificates), Provisioning Profiles, Archive & Upload, vượt qua App Review và triển khai Phased Release an toàn.',
    status: 'published',
    difficulty: 'intermediate',
    estimatedReadingTime: '25 phút',
    depth: 'deep-dive',
    tags: ['ios', 'appstore', 'release', 'certificates', 'testflight'],
    domain: 'iOS Development',
    module: 'Publish Store: Review, Release & Maintenance',
    prerequisites: ['ios-cicd-fastlane'],
    related: ['ios-analytics-crashlytics'],
    learningOutcomes: [
      'Phân biệt rõ Developer Certificate, Distribution Certificate và Provisioning Profiles.',
      'Sử dụng Fastlane để tự động hóa quy trình Archive, Signing và Upload lên App Store Connect.',
      'Áp dụng chiến lược Phased Release (7 ngày) để kiểm soát rủi ro crash trên diện rộng.',
      'Xử lý hiệu quả các trường hợp bị Apple Reject phổ biến (Guideline 2.1, 4.3, 5.1.1).'
    ],
    knowledgeGap: 'Thiếu kiến thức quản lý Code Signing và Release strategy khiến quá trình phát hành bị trì hoãn hoặc gặp sự cố nghiêm trọng ảnh hưởng toàn bộ người dùng.',
    updatedAt: '2026-08-19',
    readTime: '25 phút',
    content: `
<h2>Quy trình phát hành chuẩn trên iOS</h2>
<div class="mermaid">
flowchart LR
    A["Code Freeze & Testing"] --> B["TestFlight Internal / External"]
    B --> C["App Store Connect Metadata"]
    C --> D["Submit for Review"]
    D --> E{"Apple Review Status"}
    E -- Approved --> F["Phased Release (1% -> 100% in 7 days)"]
    E -- Rejected --> G["Fix & Submit Resolution"]
</div>

<h2>Chiến lược Phased Release (7 Ngày)</h2>
<p>Tính năng Phased Release của App Store cho phép phát hành bản cập nhật dần dần theo tỷ lệ phần trăm người dùng tự động update:</p>
<ul>
  <li><strong>Ngày 1:</strong> 1% người dùng</li>
  <li><strong>Ngày 2:</strong> 2% người dùng</li>
  <li><strong>Ngày 3:</strong> 5% người dùng</li>
  <li><strong>Ngày 4:</strong> 10% người dùng</li>
  <li><strong>Ngày 5:</strong> 20% người dùng</li>
  <li><strong>Ngày 6:</strong> 50% người dùng</li>
  <li><strong>Ngày 7:</strong> 100% người dùng</li>
</ul>
<p>Nếu Crashlytics phát hiện tỷ lệ crash tăng đột biến ở ngày 1 hoặc 2, lập tức bấm <strong>Pause Phased Release</strong> để sửa lỗi mà không làm ảnh hưởng 99% người dùng còn lại.</p>
`
  }

});
