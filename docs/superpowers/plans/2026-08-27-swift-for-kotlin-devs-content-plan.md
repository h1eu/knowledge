# Content Plan: Deep Rewrite "Swift for Kotlin Devs" (1.1.3.1)

> **For agentic workers:** Thực hiện plan này task-by-task theo thứ tự. Mỗi task tương ứng một (nhóm) section của file `ios/docs/session_01/languages/swift/swift_for_kotlin_devs.md`. Steps dùng checkbox (`- [ ]`) để tracking.

**Goal:** Nâng cấp Topic 1.1.3.1 từ "bảng so sánh cú pháp" thành bài học giải thích **bản chất** (mechanism, memory model, design rationale) cho từng phần cú pháp Swift, phục vụ dev Android học nhanh mà hiểu sâu.

**Architecture:** Giữ nguyên cấu trúc 20 section đã duyệt + frontmatter. Với mỗi section, mở rộng 3 lớp nội dung: (1) Bản chất — cơ chế nằm dưới cú pháp, (2) Ví dụ thực chiến kèm giải thích kết quả, (3) Trade-off/sai lầm. Giữ format tabs `=== "Kotlin"` / `=== "Swift"` (content không thụt lề) và mọi code block phải có ngôn ngữ.

**Tech Stack:** Markdown + Mermaid + MkDocs Material content tabs. Tham chiếu: Swift Book (docs.swift.org), Swift API Design Guidelines, kotlinx.serialization docs.

**Spec:** Thiết kế đã duyệt trong hội thoại 2026-08-27 (viết lại hoàn toàn, ~45 phút, bổ sung 6 mục: defer, failable init, Equatable/Hashable, static vs companion, scope functions, Codable).

## Global Constraints

- File duy nhất: `ios/docs/session_01/languages/swift/swift_for_kotlin_devs.md`. Không sửa `map/ios_mkdocs.yml`, không tạo file mới.
- Giữ nguyên các field frontmatter: `slug`, `related`, `domain`, `module`, `topic`, `status`. Chỉ được mở rộng `learning_outcomes` và `summary`.
- Tab content KHÔNG thụt lề (dòng `=== "X"` rồi code fence ở cột 0) — theo convention `dart_for_kotlin_devs.md`.
- Một file một H1; heading tăng tuần tự; mọi code fence khai báo ngôn ngữ; Mermaid dùng cho luồng/trạng thái/cấu trúc.
- Ngôn ngữ: tiếng Việt, thuật ngữ giữ tiếng Anh lần đầu xuất hiện có giải thích ngắn.
- Mỗi section phải trả lời: **Nó là gì → vì sao tồn tại (thiết kế ngôn ngữ) → cơ chế bộ nhớ/biển diễn (nếu có) → khi nào dùng / không dùng → sai lầm Kotlin dev**.
- Link nội bộ dùng đường dẫn tương đối như bản hiện tại (`closures.md`, `initializers.md`, `generics.md`, `../../memory_management/value_reference_type.md`).

---

### Task 1: Mở đầu — "Vấn đề" + "Mental Model" có chiều sâu thiết kế ngôn ngữ

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `Vấn đề cần giải quyết` + `Mental Model`

**Nội dung lý thuyết phải viết:**

- Sau 5 bẫy hiện có, thêm subsection ngắn **"Vì sao hai ngôn ngữ khác nhau đến vậy?"** giải thích nguồn gốc khác biệt (không phải liệt kê thêm bẫy):
  - Kotlin sinh ra trên JVM: mọi object nằm trên Heap, GC quản lý vòng đời, ngôn ngữ tối ưu cho interop với Java.
  - Swift sinh ra cho native LLVM: tối ưu không có GC — vì vậy Value Type được đặt làm mặc định, ARC thay GC, compiler chịu trách nhiệm an toàn thay vì runtime.
  - Hệ quả: khác biệt cú pháp chỉ là **bề mặt**; khác biệt **memory model** là gốc của cả 5 bẫy. Đây là câu chủ đề xuyên suốt bài.
- Câu chốt chuyển tiếp: "Mỗi section dưới đây sẽ chỉ ra cơ chế bộ nhớ đứng sau cú pháp."

**Mermaid Mental Model — mở rộng:**
- Giữ graph K1–K7 → S1–S7 hiện tại, thêm 2 node nền móng bên dưới: `K0["Runtime: JVM + GC"]` → `S0["Runtime: Native + ARC"]` với chú thích "gốc của mọi khác biệt".
- Thêm caption sau diagram: 1 đoạn giải thích đọc diagram (2 dòng).

**Tiêu chí hoàn thành:**
- [x] Đọc xong phần mở đầu, người học hiểu gốc rễ khác biệt là memory model/runtime, không chỉ cú pháp.
- [x] 5 bẫy giữ nguyên nhưng mỗi bẫy có 1 câu "gốc rễ" trỏ về memory model.
- [x] Mermaid hợp lệ (render được), có node runtime nền móng.

---

### Task 2: §1 Biến, Hằng, Kiểu — cơ chế binding vs value

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 1. Biến, Hằng, Kiểu & String Interpolation`

**Nội dung lý thuyết phải viết:**

- **Bản chất `let`/`val` là khóa CỦA GÌ?** Bảng 2 chiều: khóa *binding* (không gán lại được) vs khóa *value* (không sửa property được). Kotlin `val` chỉ khóa binding. Swift `let`:
  - với `struct`/`enum`: khóa cả value (deep immutability) — vì assignment là **copy**;
  - với `class`: chỉ khóa binding giống `val`.
  - Đặt bảng này thay bảng hiện tại (thêm hàng `let user: UserClass`, `val user: UserClass`).
- **Value Semantics** (định nghĩa lần đầu trong bài): sau phép gán, hai biến là hai thế giới độc lập. Đây là khái niệm nền cho §6, §10 — nói rõ "sẽ quay lại ở §6".
- **Type Inference khác nhau ở đâu:** Swift nghiêng hơn về Double literal (`9.5` là Double, không có kiểu mặc định Float); Int là platform-width (64-bit); **arithmetic overflow: Swift TRAP (crash) còn Kotlin WRAP (quay vòng)** — thêm ví dụ 2 dòng minh họa `Int.max + 1` cần `&+` để wrap. Đây là kiến thức lý thuyết thật, dev Android sẽ không ngờ tới.
- **String là Value Type** trong Swift (copy khi gán) vs String immutable reference trong Kotlin; interpolation `\(expr)` gọi `description` — tương đương `toString()`.

**Code ví dụ phải có:**
- Bảng khóa binding/value với 4 hàng (val struct-like, val class, let struct, let class).
- Overflow: `let x = Int.max + 1 // ❌ crash` + `let y = Int.max &+ 1 // wrap, số âm`.
- Giữ các ví dụ tabs Kotlin/Swift hiện có (đúng, không cần đổi).

**Tiêu chí hoàn thành:**
- [x] Có bảng 4 hàng phân biệt khóa binding vs khóa value.
- [x] Có định nghĩa Value Semantics + forward-reference sang §6.
- [x] Có ví dụ overflow trap vs wrap.
- [x] Giải thích tại sao `let struct` khóa cả property (cơ chế copy), không chỉ "nó bị khóa".

---

### Task 3: §2 Hàm & Argument Labels — design rationale

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 2. Hàm & Argument Labels`

**Nội dung lý thuyết phải viết:**

- **Vì sao Swift tách Argument Label / Parameter Name?** Trích nguyên tắc API Design Guidelines: call site phải đọc như câu tiếng Anh; tên hàm + label tạo thành ngữ pháp (`move(from:to:)`). Kotlin giải quyết cùng vấn đề bằng cách đọc tên hàm dài (`sendNotificationToUser`).
- **Function Type là first-class:** biến, tham số, return kiểu hàm `((Int) -> Int)` — Kotlin cũng làm được nhưng cú pháp `(Int) -> Int` giống nhau, chỉ cần 1 ví dụ ngắn để chuyển tiếp sang closure (§14).
- **Cơ chế `inout`:** giải thích **copy-in copy-out** — giá trị được copy vào hàm, copy ra khi return (không phải pass-by-reference thật như C); hệ quả: không dùng được với property của struct trong closure async, và `&` là dấu hiệu compiler kiểm tra exclusivity. 1 đoạn ngắn 4-5 câu + ví dụ giữ nguyên.
- **Nested function + capture:** 3 dòng cho thấy hàm định nghĩa trong hàm truy cập biến cục bộ — cầu nối sang closure §14.

**Code ví dụ phải có:**
- Giữ ví dụ 3 dạng label hiện có (đúng).
- Ví dụ function type: `let operation: (Int, Int) -> Int = { $0 + $1 }` đối chiếu `val operation: (Int, Int) -> Int`.
- Giữ ví dụ `swapNumbers` + thêm comment cơ chế copy-in copy-out.

**Tiêu chí hoàn thành:**
- [x] Có đoạn rationale trỏ về API Design Guidelines (kèm link Nguồn tham khảo đã có).
- [x] Giải thích cơ chế inout là copy-in copy-out, không phải reference thật.
- [x] Có ví dụ function type first-class.
- [x] Có nested function ngắn dẫn link sang §14.

---

### Task 4: §3 Tuples, Range, Control Flow, `defer`

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 3. Tuples, Range, Control Flow & defer`

**Nội dung lý thuyết phải viết:**

- **Tuple là Product Type không có identity:** không có tên type, không conform `Codable`/`Equatable` qua conformance — so sánh với `Pair<A,B>` của Kotlin; quy tắc "quá 3 trường → struct" giữ nguyên nhưng thêm lý do: API tuple khó tái sử dụng vì type không có tên (structural typing).
- **Range là type thật:** `Range<Int>` (half-open) vs `ClosedRange<Int>` là 2 type khác nhau; lý do half-open mặc định: đếm đúng số phần tử, ghép với index 0-based, không overflow; `contains`, `~=` dùng trong case pattern.
- **`guard` là hợp đồng scope:** cơ chế thật — `guard` ép block `else` phải exit scope (return/throw/continue/break), nhờ đó compiler **biết chắc** biến đã unwrap ở đoạn code dưới; khác `if let` chỉ unwrap trong block. Đây là lý do duy nhất guard "làm phẳng code" — giải thích bằng cơ chế không phải cảm tính.
- **`defer` cơ chế:** chạy **ngược thứ tự khai báo** (LIFO, như stack dọn dẹp); KHÔNG được `return`/`break`/`throw` bên trong defer; defer chạy cả khi throw — bảng đối chiếu `try/finally` Kotlin: vị trí khai báo (gần acquire vs xa), số đường thoát được bảo vệ, nguy cơ quên.

**Code ví dụ phải có:**
- Giữ các ví dụ hiện có + thêm:
  ```swift
  // defer chạy LIFO:
  func demo() {
      defer { print("1") }
      defer { print("2") }
      print("3")
  } // in: 3, 2, 1
  ```
- Ví dụ `if case`/`~=` không cần ở đây (thuộc §12).

**Tiêu chí hoàn thành:**
- [x] Tuple có lý do "structural typing, không có tên type".
- [x] Range giải thích 2 type + lý do half-open.
- [x] `guard` giải thích bằng hợp đồng scope + compiler knowledge, không phải "đẹp hơn".
- [x] `defer` có ví dụ LIFO + bảng so với try/finally.

---

### Task 5: §4 Properties — cơ chế lưu trữ vs tính toán

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 4. Properties`

**Nội dung lý thuyết phải viết:**

- **3 loại property theo cách có giá trị:** Stored (có ô nhớ riêng) / Computed (không ô nhớ, tính mỗi lần truy cập — không cache) / Type property (`static` — thuộc type). Thêm dòng: computed property truy cập trong vòng lặp nóng sẽ tính lại mỗi lần — nếu đắt thì cache vào stored property.
- **`lazy var` khác `by lazy` Kotlin thế nào:** Swift `lazy` KHÔNG thread-safe (truy cập từ nhiều thread có thể chạy closure 2 lần), Kotlin `by lazy` mặc định `SYNCHRONIZED`. Đây là bẫy thật — ghi rõ. `lazy` bắt buộc `var` vì giá trị thay đổi từ nil-placeholder thành giá trị thật.
- **Property Observers cơ chế:** `willSet`/`didSet` KHÔNG chạy trong `init` (lúc khởi tạo chưa tính là "quan sát được"), chạy cả khi gán giá trị bằng nhau; `newValue`/`oldValue` là keyword ẩn; dùng nhiều nhất cho UI sync trong UIKit.
- **`static let` là lazy + thread-safe tự động** (được runtime đảm bảo, tương đương `dispatch_once` cũ) — forward-reference sang §7.

**Code ví dụ phải có:**
- Giữ ví dụ `ProductCard` hiện có.
- Thêm ví dụ minh họa lazy không thread-safe (pseudo-comment: "// ❌ 2 thread có thể chạy closure đồng thời") và static let thread-safe.

**Tiêu chí hoàn thành:**
- [x] Phân loại 3 loại property theo cơ chế có/không ô nhớ.
- [x] Nêu rõ lazy Swift không thread-safe vs by lazy Kotlin SYNCHRONIZED.
- [x] Nêu 2 quy tắc observers: không chạy trong init, chạy cả khi giá trị bằng.
- [x] Có forward-reference static let thread-safe sang §7.

---

### Task 6: §5 Optionals — Optional là enum, không phải null

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 5. Optionals`

**Nội dung lý thuyết phải viết:**

- **Bản chất Optional là enum** (giữ code enum hiện có) — nhưng mở rộng: đây là **Sum Type / tagged union**: giá trị hoặc là `none` hoặc là `some(Wrapped)`. Khác `null` của Kotlin (con trỏ đặc biệt trên reference) ở chỗ: Optional là **giá trị bọc bình thường**, mọi công cụ của enum (switch, map) dùng được; compiler ép xử lý case none trước khi dùng — không còn lớp bug NPE.
- **Bảng đầy đủ 6 công cụ unwrap** (hiện chỉ nêu 4): `if let`, `guard let`, `??`, optional chaining `?.`, force `!` (khi nào chấp nhận được), `map`/`flatMap` trên Optional. Mỗi tool 1 dòng + khi nào dùng.
- **Nested Optional `Int??`** — bẫy kinh điển: `["key": 1]["key"]` kiểu `Int?` nhưng `dict.map` trả `Int??`; giải thích phẳng thế nào bằng `flatMap`/pattern `case .some(.some(let v))`. 1 ví dụ ngắn.
- **Vì sao Swift không có Smart Cast như Kotlin:** property có thể bị thread khác đổi giữa lúc check và lúc dùng; Swift chỉ promotion cho `let` cục bộ (Swift 5.7+ `if let email`). Kotlin có cùng giới hạn (chỉ smart cast val/immutable) — chỉ rõ điều này để dev Kotlin thấy quen.
- **IUO (Implicitly Unwrapped Optional `T!`):** khi nào gặp (IBOutlet, ObjC interop), vì sao nguy hiểm, quy tắc "chỉ dùng khi lifecycle đảm bảo non-nil".
- **`init?` vs `throws` init:** bảng chọn — `init?` khi lỗi đơn giản/binary; `throws` khi cần báo lý do; giữ ví dụ `init?(dict:)` hiện có.

**Code ví dụ phải có:**
```swift
// Nested Optional - Lưu ý: Dictionary subscript đã trả Optional sẵn,
// phải dùng Optional bọc ngoài để tạo Int?? (Ruling 2026-08-27: snippet gốc
// dùng d.map trên dict thường - sai, đã sửa)
let d: [String: Int]? = ["a": 1]
let v = d.map { $0["a"] }     // Int?? - Optional(Optional(1))
let flat = d.flatMap { $0["a"] } // Int?
```
- Bảng 6 công cụ unwrap (cột: Tool | Cú pháp | Kết quả | Khi nào dùng).

**Tiêu chí hoàn thành:**
- [x] Giải thích Optional = sum type, khác null-pointer ở mức mô hình.
- [x] Bảng 6 công cụ unwrap đầy đủ.
- [x] Có ví dụ nested optional + cách phẳng.
- [x] Giải thích vì sao không có smart cast (thread-safety + mutable property).
- [x] Có IUO + quy tắc dùng.
- [x] Có bảng init? vs throws init.

---

### Task 7: §6 Models struct vs class — memory model

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 6. Models`

**Nội dung lý thuyết phải viết:**

- **Cơ chế bộ nhớ thật:** struct nhỏ nằm trên Stack (inline), class luôn trên Heap qua reference; gán struct = memcpy (rẻ với struct nhỏ), gán class = copy con trỏ 8 byte. Collection (`Array`/`Dictionary`/`String`) là struct nhưng dữ liệu lớn nằm Heap với **Copy-on-Write (COW)**: copy chỉ tạo khi có ai đó **viết** — giải thích vì sao gán mảng lớn vẫn rẻ. Forward-reference: chi tiết COW ở §10 và Topic 1.2.2.
- **Định danh (identity):** `===` chỉ có nghĩa với class; struct không có identity — hai struct cùng giá trị là một. Đây là tiêu chí chọn loại: cần identity chia sẻ → class; cần độc lập → struct.
- **`Equatable`/`Hashable` cơ chế synthesis:** compiler tự sinh khi TẤT CẢ stored properties conform; tự sinh `==` so từng property (giống data class equals), `hash(into:)` gộp hasher; tự khai báo `static func ==` sẽ **mất** synthesis — bẫy khi tự viết thiếu trường.
- **`mutating` cơ chế:** không phải "cho phép sửa" — mà là **thay self bằng bản copy mới** (compiler pass `inout self`); vì thế không gọi được từ `let`, và không gọi được trong closure capture self của struct.
- Bảng quyết định struct vs class (hiện có) + thêm hàng "Copy mỗi lần gán có đắt không?" → struct nhỏ rẻ; mảng lớn có COW.

**Code ví dụ phải có:**
```swift
// COW minh họa
var a = Array(repeating: 0, count: 1_000_000)
var b = a        // rẻ: chưa copy (chỉ tăng ref count nội bộ)
b[0] = 1         // LÚC NÀY mới copy thật - a không đổi
```
- Giữ ví dụ Product hiện có + ví dụ `===` chỉ với class.

**Tiêu chí hoàn thành:**
- [x] Giải thích Stack vs Heap + memcpy vs con trỏ.
- [x] Giải thích COW và vì sao gán collection lớn vẫn rẻ.
- [x] Giải thích identity `===` như tiêu chí chọn loại.
- [x] Cơ chế synthesis Equatable/Hashable + bẫy mất synthesis khi tự viết ==.
- [x] Giải thích mutating = thay self, không phải "mở khóa".

---

### Task 8: §7 Singleton, static/class vs companion object

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 7. Singleton, static/class Members & companion object`

**Nội dung lý thuyết phải viết:**

- **`static` trong Swift là property/method của METATYPE:** truy cập qua tên type; **cả `static let` lẫn `static var` đều lazy + thread-safe** (Swift Book: type properties là lazily initialized, đảm bảo bởi runtime — Ruling 2026-08-27: claim cũ "static var KHÔNG lazy" sai, đã sửa).
- **`static` vs `class` keyword:** `class` cho phép **override ở subclass** (chỉ có nghĩa với class); `static` là `class final`. Kotlin: mọi method companion không override được — nên mặc định dùng `static`, chỉ chuyển `class` khi thiết kế kế thừa.
- **`companion object` là một object instance thật** (có thể implement interface, có tên); `static` Swift không phải instance — nếu cần polymorphism ở "static" level thì dùng `static let shared = SomeImplementation()`.
- **Singleton cơ chế:** `static let shared` + `private init()` — giải thích vì sao lazy + thread-safe là của runtime, không cần double-checked locking; Kotlin `object` tương đương nhưng khởi tạo khi lần đầu chạm class.
- **Trade-off singleton:** global state khó test, dependency ẩn — khuyến nghị inject qua init khi viết code mới (kiến trúc), ngắn gọn 3 câu.

**Code ví dụ phải có:**
- Giữ ví dụ AppConfig/ApiClient hiện có.
- Thêm ví dụ `class` override:
  ```swift
  class Handler { class func kind() -> String { "base" } }
  class HttpHandler: Handler { override class func kind() -> String { "http" } }
  ```

**Tiêu chí hoàn thành:**
- [x] static vs class giải thích qua khả năng override.
- [x] Nêu companion là instance thật vs static là metatype member.
- [x] Giải thích lazy + thread-safe của static let là runtime đảm bảo.
- [x] Có trade-off singleton về testability.

---

### Task 9: §8 Scope Functions

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 8. Scope Functions`

**Nội dung lý thuyết phải viết:**

- **Vì sao Swift không có scope functions:** triết lý tường minh — mỗi scope function của Kotlin có ~2-3 ngữ nghĩa chồng lấn (`let` vừa null-check vừa transform vừa side-effect), Swift tách thành các công cụ riêng có tên rõ. Frame: "Kotlin tối ưu viết nhanh, Swift tối ưu đọc lại sau 6 tháng".
- **Bảng mapping giữ nguyên** nhưng thêm cột "Bản chất Swift equivalent" (Optional Binding / init + IIFE / computed property / câu lệnh).
- **IIFE là pattern chính thức thay `apply`:** giải thích IIFE = immediately-invoked closure, dùng trong SwiftUI/UIKit thực chiến để configure view khi khai báo; nhược điểm: không hover-rename được như method.
- **`with` của Kotlin:** mapping sang method hoặc `performAs` pattern — 1 ví dụ ngắn.
- Cảnh báo giữ nguyên: đừng nhái scope functions bằng extension — viết theo phong cách Swift.

**Code ví dụ phải có:**
- Giữ ví dụ hiện có + thêm 1 ví dụ thực chiến SwiftUI IIFE:
  ```swift
  private let spinner: UIActivityIndicatorView = {
      let s = UIActivityIndicatorView(style: .large)
      s.hidesWhenStopped = true
      return s
  }()
  ```

**Tiêu chí hoàn thành:**
- [x] Có lý do thiết kế (triết lý tường minh) chứ không chỉ "không có".
- [x] Bảng mapping có cột bản chất.
- [x] Có ví dụ IIFE thực chiến UIKit/SwiftUI.

---

### Task 10: §9 Codable

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 9. Codable vs kotlinx.serialization`

**Nội dung lý thuyết phải viết:**

- **Cơ chế hoạt động:** `Codable` là protocol rỗng; compiler **synthesize** `init(from:)` và `encode(to:)` từ `CodingKeys`; không reflection — giống kotlinx (compile-time codegen), khác Gson (runtime reflection). Đây là lý do decode nhanh và crash sớm nếu sai kiểu.
- **Vấn đề default value:** Kotlin `@Serializable` dùng default property value; Swift synthesize **đòi đủ field non-optional** — 3 cách xử lý: (1) property optional, (2) custom `init(from:)` với `decodeIfPresent`, (3) `decodeIfPresent ?? default`. Đưa code mẫu cách (3) — pattern phổ biến nhất.
- **CodingKeys khi nào cần:** tên field lệch; có thể ẩn property không decode bằng cách bỏ khỏi CodingKeys.
- **Strategies bảng:** keyDecodingStrategy (convertFromSnakeCase), dateDecodingStrategy (iso8601, secondsSince1970), dataDecodingStrategy (base64) — mỗi dòng 1 trường hợp thật.
- **Giới hạn:** không decode `[String: Any]` (dùng struct hoặc `JSONSerialization`); enum decode bằng RawRepresentable; nested container chỉ khi JSON lồng sâu.

**Code ví dụ phải có:**
```swift
// Default value - pattern phổ biến nhất
struct Settings: Codable {
    var theme: String
    var notifications: Bool

    enum CodingKeys: String, CodingKey { case theme, notifications }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        theme = try c.decodeIfPresent(String.self, forKey: .theme) ?? "light"
        notifications = try c.decodeIfPresent(Bool.self, forKey: .notifications) ?? true
    }
}
```
- Giữ ví dụ User/CodingKeys hiện có + bảng strategies.

**Tiêu chí hoàn thành:**
- [x] Giải thích synthesize không reflection (so kotlinx vs Gson).
- [x] Có 3 cách xử lý default value + code pattern `decodeIfPresent ??`.
- [x] Bảng strategies với trường hợp thật.
- [x] Nêu giới hạn [String: Any].

---

### Task 11: §10 Collections

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 10. Collections`

**Nội dung lý thuyết phải viết:**

- **COW áp dụng cho collections** (mở từ §6): Array/Dictionary/Set/String đều struct + COW; hệ quả hiệu năng: pass `let` mảng vào hàm = gần như miễn phí; `isKnownUniquelyReferenced` là cơ chế nội bộ kiểm tra "chỉ mình ta giữ" (nêu tên, không đào sâu).
- **Index invalidation:** `for i in 0..<arr.count { arr.remove(at: i) }` — bẫy vòng lặp xóa; cách đúng `removeAll(where:)` hoặc duyệt ngược. 1 ví dụ ngắn.
- **Dictionary subscript trả Optional:** thêm `dict["key", default: 0]` (tương đương `getOrDefault`), `dict.updateValue`, `dict["k"]!` khi chắc chắn.
- **compactMap vs flatMap:** `compactMap` = `mapNotNull`; `flatMap` Swift giờ là flatten của Sequence — phân biệt 2 tên vì Kotlin dùng 1 tên `flatMap` cho cả hai ngữ nghĩa.
- **Sequence vs Collection:** Sequence = duyệt một lần (lazy có thể), Collection = index + duyệt nhiều lần — 2 câu, đủ để đọc signature chuẩn.

**Code ví dụ phải có:**
```swift
// Bẫy xóa trong loop
var nums = [1, 2, 3, 4]
// for i in 0..<nums.count { nums.remove(at: i) } // ❌ skip phần tử
nums.removeAll(where: { $0 % 2 == 0 }) // ✅
```
- Giữ ví dụ tabs hiện có + thêm `default:` subscript.

**Tiêu chí hoàn thành:**
- [x] COW cho collections + hệ quả hiệu năng.
- [x] Ví dụ index invalidation + cách đúng.
- [x] `dict["k", default:]` xuất hiện.
- [x] Phân biệt compactMap vs flatMap vs mapNotNull Kotlin.
- [x] 2 câu Sequence vs Collection.

---

### Task 12: §11 switch + §12 Enum/Generics/Access

**Files:**
- Modify: `swift_for_kotlin_devs.md` — sections `## 11` và `## 12`

**Nội dung lý thuyết phải viết:**

**§11 switch:**
- **Không implicit fallthrough** (khác Java/C): mỗi case tự break; `fallthrough` phải viết tường minh và hiếm khi hợp lý.
- **Pattern matching là hệ thống pattern, không chỉ switch:** value binding `let`, `where`, tuple pattern `(0, 0)`, `if case` (switch 1 case không cần hàm), `for case` lọc trong loop. `switch` chỉ là 1 trong các nơi dùng pattern — mở rộng tư duy từ `when` của Kotlin.
- **Enum + associated values = Sum Type:** so với sealed class Kotlin — cùng năng lực nhưng: Swift enum là value type (copy rẻ, dùng trong SwiftUI state), compiler ép exhaustive, associated value ẩn trong case (kể tên khi destructure).

**§12:**
- **Enum mở rộng:** raw value (`enum Planet: Int`, `.init(rawValue:)` trả Optional), `CaseIterable` (tương đương `values()`), `indirect` recursive enum (cây AST) — ví dụ ngắn LinkedList enum; `allCases`.
- **Generics cơ chế:** Swift compile-time specialization (mônomorphization, không type erasure như JVM generics) — ví dụ `Array<Int>` giữ nguyên kiểu tại runtime; Kotlin bị erasure nên `List<Int>::class` không tồn tại; hệ quả: Swift generics không cần `reified`/`inline` như Kotlin.
- **Associated Type (PAT):** protocol có associatedtype là cơ chế "generic protocol" — Kotlin phải dùng generic interface; ví dụ `protocol Container { associatedtype Item }` 5 dòng, link sang 1.1.3.4/1.1.3.5.
- **Access Control rationale:** `internal` mặc định vì "một app = một module"; `open` tồn tại vì Swift class mặc định final (khác Kotlin cũng final class nhưng không có từ khóa phân tầng public/open) — bảng giữ nguyên + thêm hàng `final class` ≈ `class` Kotlin (final mặc định).

**Code ví dụ phải có:**
```swift
// if case - switch 1 nhánh
if case .success(let user) = result { display(user) }
// for case
for case .error(let code, _) in events where code >= 500 { alert(code) }

// indirect enum - recursive
indirect enum Node {
    case value(Int)
    case next(Node)
}
```
```kotlin
// Kotlin generics erasure
fun <T> check(obj: Any) = obj is List<Int> // ❌ cannot check erased type
```
```swift
// Swift giữ nguyên type
let ok = [1, 2] is Array<Int> // ✅ true - không erasure
```

**Tiêu chí hoàn thành:**
- [x] switch: nêu fallthrough + hệ thống pattern (if case, for case).
- [x] Enum = sum type so sealed class, kèm raw value/CaseIterable/indirect.
- [x] Generics: monomorphization vs erasure + 2 ví dụ đối chiếu.
- [x] PAT 1 ví dụ + link sibling.
- [x] Bảng access control có hàng final.

---

### Task 13: §13 Error Handling

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 13`

**Nội dung lý thuyết phải viết:**

- **`throws` KHÔNG phải exception:** cơ chế thật — hàm throw thực chất **return một giá trị đặc biệt** (error được mang trên register/return path), không unwinding stack như Java/Kotlin; vì thế chi phí throw chỉ khi có lỗi, try đường happy zero-cost. Đây là kiến thức cốt lõi dev Kotlin sẽ không đoán được.
- **Checked-errors middle ground:** Kotlin unchecked mọi exception; Java checked quá mức bị loại; Swift chọn: bắt buộc khai báo `throws` + caller bắt buộc `try` — compiler ghi nhớ nhưng caller được 3 lựa chọn (do/catch, try?, try!). Bảng 3 lựa chọn + hệ quả.
- **`rethrows`:** hàm chỉ throw khi closure tham số throw — 1 ví dụ ngắn (map signature).
- **`Result` vs do/catch:** khi nào dùng Result (API callback, cần model hóa kết quả như value), khi nào do/catch (flow tuyến tính) — với async/await, Result giảm vai trò còn kiểm soát error path thủ công.
- Giữ ví dụ AppError/do-catch hiện có.

**Code ví dụ phải có:**
```swift
// rethrows - chỉ throw khi closure throw
func customMap<T>(_ transform: (Int) throws -> T) rethrows -> [T] { ... }
```

**Tiêu chí hoàn thành:**
- [x] Giải thích cơ chế throw = return path, không unwinding.
- [x] Bảng 3 lựa chọn try với hệ quả từng loại.
- [x] Có rethrows + ví dụ.
- [x] Nêu khi nào Result vs do/catch.

---

### Task 14: §14 Closures + §15 Initializers (tổng quan có chiều sâu vừa đủ)

**Files:**
- Modify: `swift_for_kotlin_devs.md` — sections `## 14`, `## 15`

**Nội dung lý thuyết phải viết:**

**§14 Closures:**
- Thêm cơ chế **capture là by-reference** (Swift closure capture biến chứ không copy giá trị — như Kotlin lambda capture val): ví dụ counter closure tăng biến ngoài; khác biệt `weak` chỉ liên quan **reference type**, capture `let` struct không tạo cycle — quy tắc nhận diện cycle: "cycle chỉ xảy ra khi 2 bên đều reference type".
- **@escaping vs non-escaping:** non-escaping (mặc định) sống không quá lời gọi — compiler tối ưu; @escaping sống lâu hơn (lưu vào property/async) — mới cần `[weak self]`. Bảng 2 cột.
- Giữ mermaid retain cycle + ví dụ ViewModel; link 1.1.3.2 giữ nguyên.

**§15 Initializers:**
- Thêm **two-phase initialization** 2 câu: phase 1 khởi tạo tất cả stored property của class mình; phase 2 tùy chỉnh; lý do `self` không dùng được trước khi mọi property có giá trị — giải thích lỗi "Return from initializer without initializing all stored properties" thường gặp.
- Memberwise init biến mất khi viết init riêng — thêm vào 1 câu (bẫy nhỏ).
- Link 1.1.3.3 giữ nguyên.

**Code ví dụ phải có:**
```swift
// Capture by reference
var count = 0
let inc = { count += 1 }
inc(); inc()
print(count) // 2

// non-escaping vs escaping
func now(_ work: () -> Void) { work() }            // non-escaping
func later(_ work: @escaping () -> Void) { work() } // sống lâu hơn - cần weak self
```

**Tiêu chí hoàn thành:**
- [x] Capture by-reference + quy tắc "cycle cần 2 bên reference type".
- [x] Bảng @escaping vs non-escaping gắn với weak self.
- [x] Two-phase init + bẫy mất memberwise init.

---

### Task 15: §16 Concurrency

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 16`

**Nội dung lý thuyết phải viết:**

- **Structured Concurrency:** Task có cấu trúc cha-con — hủy Task cha tự hủy con (như coroutine scope của Kotlin); khác GCD cũ (fire-and-forget). Bảng mở rộng hiện có + thêm hàng `async let` vs `async {}` parallel.
- **Cancellation là hợp tác:** `Task.cancel()` không ngắt giữa chừng — code phải tự check `Task.isCancelled` / `try Task.checkCancellation()`; khác Job.cancel Kotlin (suspension point cũng là cancellation point) — thực ra giống nhau ở điểm "cooperative", nói rõ để dev Kotlin không mong ngắt cứng.
- **Actor & @MainActor:** actor = tham chiếu có hàng đợi (serial execution) — bảo vệ mutable state khỏi data race; @MainActor = actor main thread; so với `Dispatchers.Main` + `withContext`: compiler kiểm tra isolation thay vì tự nhớ chuyển thread.
- **@Sendable / Sendable:** kiểm tra compile-time dữ liệu băng qua ranh giới concurrency — Kotlin tương đương không có (chỉ kỷ luật); nêu ngắn vì sẽ gặp warning khi capture mutable state.
- Giữ ví dụ hiện có + thêm 1 ví dụ actor ngắn:
  ```swift
  actor Counter {
      private var value = 0
      func increment() { value += 1 }
  }
  ```

**Tiêu chí hoàn thành:**
- [x] Structured concurrency cha-con + so coroutine scope.
- [x] Cooperative cancellation giải thích đúng (giống Kotlin, không ngắt cứng).
- [x] Actor/@MainActor vs Dispatchers bằng cơ chế isolation.
- [x] Nêu Sendable 1-2 câu.
- [x] Ví dụ actor.

---

### Task 16: §17 Cheat sheet + §18 Bẫy + §19 System Thinking

**Files:**
- Modify: `swift_for_kotlin_devs.md` — sections `## 17`, `## 18`, `## 19`

**Nội dung phải viết:**

- **§17 Cheat sheet:** thêm các hàng mới từ các task trên: `Int.max + 1` (trap vs wrap), `dict["k", default: 0]` vs `getOrDefault`, `removeAll(where:)` vs `removeIf`, `CaseIterable` vs `values()`, `actor` vs `Mutex/synchronized`, IUO `T!` (—). Giữ các hàng cũ.
- **§18 Bẫy:** nâng mỗi bẫy từ "mệnh lệnh" thành "bẫy + cơ chế gốc" (1 câu vì sao) — ví dụ bẫy 4 `!`: "vì `!` là ép Optional enum về `.some`, nil thì crash runtime thay vì lỗi compile". Thêm bẫy: (11) quên `@escaping` warning hoặc nhầm non-escaping, (12) mutate collection khi đang duyệt (index invalidation).
- **§19 System Thinking:** giữ nguyên diagram + 3 bullet, chỉ cập nhật bullet "Mở rộng" trỏ đúng các section mới (Closures §14, Initializers §15, Memory 1.2).

**Tiêu chí hoàn thành:**
- [x] Cheat sheet có ≥5 hàng mới.
- [x] Mỗi bẫy có 1 câu cơ chế gốc.
- [x] §19 nhất quán với cấu trúc mới.

---

### Task 17: §20 Bài tập + Frontmatter + Nguồn tham khảo

**Files:**
- Modify: `swift_for_kotlin_devs.md` — section `## 20`, frontmatter, `## Nguồn tham khảo`

**Nội dung phải viết:**

- **Bài tập:** giữ 5 bài hiện có, nâng Bài 5 (Codable) yêu cầu thêm: viết custom `init(from:)` với `decodeIfPresent ?? default` (khớp Task 10); thêm Bài 6 — Actor/Concurrency: viết `actor Inventory { private var stock: [String: Int] }` với `func reserve(_ id: String) -> Bool` an toàn data race, chạy 2 Task song song gọi reserve cùng lúc, chứng minh không oversell; Tiêu chí pass: giải thích vì sao actor tránh race mà không cần lock.
- **Frontmatter:** cập nhật `learning_outcomes` thêm 2 dòng: giải thích COW và identity khi chọn struct/class; viết actor an toàn data race. Cập nhật `summary` nhắc thêm "COW, actor". Cập nhật `estimated_reading_time` nếu tổng độ dài vượt đáng kể (ước lượng lại: ~55-60 phút, ghi "55 phút").
- **Nguồn tham khảo:** thêm: [Swift Evolution - Sendable](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0302-concurrentvalue-and-nominal-sendable.md) hoặc trang actors chính thức (chọn link docs.swift.org actors), giữ các link cũ, thêm [Swift Book - Opaque/Generics] nếu PAT được nêu.

**Tiêu chí hoàn thành:**
- [x] Bài 5 nâng cấp + có Bài 6 actor với tiêu chí pass.
- [x] Frontmatter: learning_outcomes + summary + reading time cập nhật.
- [x] Nguồn tham khảo có link actors/ official docs.

---

### Task 18: Verification tổng thể

**Files:**
- Verify: `swift_for_kotlin_devs.md`

**Steps:**

- [ ] **Kiểm tra cấu trúc Markdown:** 1 H1, heading tăng tuần tự không nhảy cấp.
  Run: `rg -n '^#{1,4} ' ios/docs/session_01/languages/swift/swift_for_kotlin_devs.md`
  Expected: 1 dòng `# `, các `##`/`###` tuần tự.

- [ ] **Kiểm tra code fence:** tổng số fence chẵn, mọi fence mở có ngôn ngữ.
  Run: `rg -c '^```[a-z]'` và `rg -c '^```$'` — số block mở (có lang) + đóng khớp nhau.

- [ ] **Kiểm tra tabs convention:** dòng `=== "X"` theo sau bởi dòng trống rồi fence ở cột 0; không còn fence thụt lề.
  Run: `rg -n '^    ```' ios/docs/session_01/languages/swift/swift_for_kotlin_devs.md`
  Expected: không có kết quả.

- [ ] **Kiểm tra frontmatter YAML hợp lệ + field giữ nguyên:** slug, related, domain, module, topic, status không đổi so với bản trước (dùng git diff).

- [ ] **Kiểm tra link nội bộ tồn tại:** `closures.md`, `initializers.md`, `generics.md`, `value_reference_type.md` là đường dẫn hợp lý trong repo (closures/initializers/generics chưa tồn tại — được phép, vì map đã khai báo; ghi chú trong review).

- [ ] **Self-review nội dung theo playbook review-content:** đọc toàn bộ, đối chiếu checklist Quality Standard (chính xác, bản chất trước ví dụ, không lặp kiến thức sibling).

- [ ] **Commit:** `git add ios/docs/session_01/languages/swift/swift_for_kotlin_devs.md && git commit -m "docs(ios): deepen 1.1.3.1 swift for kotlin devs - mechanisms & rationale"` (chỉ khi người dùng yêu cầu commit).

## Self-Review của plan

1. **Spec coverage:** 6 mục bổ sung (defer→Task 4, failable init→Task 6, Equatable/Hashable→Task 7, static/companion→Task 8, scope functions→Task 9, Codable→Task 10) đều có task. Giữ ~45 phút: reading time sẽ nêu lại 55 phút ở Task 17 vì độ sâu tăng — người dùng đã chọn "nội dung chi tiết hơn" nên trade-off chấp nhận được.
2. **Placeholder scan:** không có TBD; mọi task liệt kê nội dung cụ thể + code.
3. **Nhất quán:** các khái niệm xuyên suốt (Value Semantics Task 2 → 6 → 10; COW Task 6 → 10 → 11; capture Task 3 → 14; escaping Task 14 → 15) được forward-reference đúng thứ tự.

---

## Addendum: Tăng chiều sâu lý thuyết (2026-08-27 — theo yêu cầu người dùng)

Áp dụng cho TẤT CẢ task nội dung (Task 1–17), ưu tiên cao hơn text gốc khi xung đột:

**A1. Quy tắc xuyên suốt:** Mỗi section, ngay trước ví dụ code, phải có mục `### Cơ chế bên dưới` (3–8 câu) giải thích cách compiler/runtime thực hiện — đặt bản chất trước cú pháp. Mỗi cơ chế phải tự hỏi "Kotlin xử lý điểm này thế nào?" và trả lời trong cùng đoạn.

**A2. Bổ sung theo task:**

- **Task 2:** thêm 2 câu String UTF-8 + Small String Optimization (chuỗi ngắn lưu trực tiếp trong struct, không cấp phát Heap); 1 câu memory layout `Int`/`Bool`.
- **Task 3:** thêm 2 câu compiler có thể **inline non-escaping closure** — abstraction zero-cost, lý do Swift để non-escaping làm mặc định (Kotlin lambda luôn heap-allocated nếu capture).
- **Task 5:** thêm cơ chế observers là **syntactic sugar cho setter** (compiler sinh setter gọi observer); stored property có offset cố định trong layout.
- **Task 6:** thêm 3 câu **memory layout của Optional**: payload + tag byte (extra byte hoặc spare bits), không boxing — vì sao Optional<String> đắt hơn String 1 byte chứ không phải allocation; quy tắc promotion của Swift 5.7 chi tiết (chỉ `let` cục bộ và extension cùng file).
- **Task 7:** thêm đoạn 4–6 câu **witness table vs vtable**: struct conform protocol dùng witness table tĩnh (có thể specialization), class dùng vtable qua isa pointer — đây là lý do POP nhanh hơn inheritance và là cầu nối sang 1.1.3.5; struct layout inline, class layout = isa + refcount + fields.
- **Task 9:** thêm 2–3 câu triết lý **function composition** — Swift khuyến khích pipeline data qua method chain + free functions thay vì scope-nesting.
- **Task 10:** thêm 2 câu synthesized conformance là **codegen tĩnh** (kiểm tra bằng `swiftc -emit-ir` không cần thiết — chỉ nêu "sinh code tại compile time, không metadata runtime").
- **Task 12:** giữ witness table (đã dời về Task 7); thêm 2 câu **enum layout**: associated values + discriminant byte, vì sao enum với case lớn vẫn rẻ (size = max case).
- **Task 13:** thêm 2 câu Swift ABI: error mang trên register/return path, stack trace rẻ hơn Java exception (không capture stacktrace khi throw) — Kotlin exception capture stack trace lúc construct nên đắt.
- **Task 15:** thêm 3 câu **cooperative thread pool**: width = số core, blocking vì vậy là độc (không block thread hệ thống nhưng chiếm slot pool); Task priority (userInitiated/utility/background) so với CoroutineContext.
- **Task 17:** reading time cập nhật 60 phút (lý thuyết tăng).

**A3. Khi mâu thuẫn giữa số mục và độ sâu:** ưu tiên độ sâu — được phép gộp mục nhỏ (ví dụ gộp 12.3+12.4) nhưng không được cắt lý thuyết A2.
