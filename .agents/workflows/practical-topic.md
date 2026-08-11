---
description: Quy trình tạo bài học thực chiến. Bắt đầu bằng việc hỏi nhu cầu (vấn đề, tình huống), sau đó tập trung viết "Nó là gì -> Khi nào dùng -> Code thực tế".
---

# Workflow: Practical Topic

## Mục đích
Tạo ra các bài viết tri thức tập trung tối đa vào tính ứng dụng và thực chiến. 
Thay vì đi sâu vào lý thuyết hệ điều hành (như Android OS Internals, AMS, Binder IPC...), workflow này giúp lập trình viên biết ngay lập tức:
- Khái niệm này là gì?
- Vấn đề cốt lõi nó giải quyết là gì?
- Khi nào thì mang ra dùng trong project?
- Viết code thực tế như thế nào cho chuẩn Best Practices?

## Khi nào sử dụng
- Khi người dùng muốn học một kiến thức mới để áp dụng ngay vào công việc.
- Khi người dùng gọi lệnh `/practical-topic` (hoặc yêu cầu viết theo hướng thực chiến).

## Input
Người dùng có thể cung cấp **Topic Name** (Tên chủ đề) hoặc **Chapter ID** (ví dụ: `4.1.1.1`). 

## Quy trình thực hiện (Strict Order)

### Bước 0: Map định tuyến từ MkDocs (Nếu có Chapter ID)
Nếu người dùng yêu cầu bắt đầu bằng một Chapter ID (ví dụ: `/practical-topic 4.1.1.1`):
1. AI phải tự động đọc file bản đồ: `map/android_mkdocs.yml`.
2. Tìm dòng chứa Chapter ID đó để lấy ra **Tên Topic** và **Đường dẫn file**. (Ví dụ: `4.1.1.1 Build Types: session_04/.../build_types.md`).
3. Xác nhận lại với người dùng: *"Tôi đã lấy được topic **[Tên Topic]** từ chapter **[ID]**, file lưu tại `[Path]`. Bây giờ chúng ta hãy khảo sát nhu cầu nhé!"*

# Bước 1: Khảo sát nhu cầu (Interactive)

Trước khi bắt đầu bất kỳ topic nào, AI PHẢI khảo sát đầy đủ để xây dựng lộ trình phù hợp. Không được sinh tài liệu ngay nếu chưa đủ thông tin.

## 1. Mục tiêu
- Bạn muốn đạt trình độ nào với công nghệ này?
- Bạn học để làm project, đi làm, phỏng vấn hay nghiên cứu?

## 2. Nền tảng hiện tại
- Bạn đã biết những kiến thức liên quan nào?
- Bạn từng dùng công nghệ này chưa?
- Phần nào bạn thấy khó hoặc chưa hiểu?

## 3. Bài toán thực tế
- Bạn muốn dùng công nghệ này cho những loại ứng dụng hoặc use case nào?
- Có project cụ thể nào làm bối cảnh học không?

## 4. Phạm vi học
- Bạn muốn học những phần nào?
- Có framework, thư viện, pattern hoặc công nghệ nào cần kết hợp?

## 5. Độ sâu
- Bạn muốn dừng ở mức sử dụng, hiểu nguyên lý, hay đi sâu vào cách framework hoạt động và source code?

## 6. Cách học
- Bạn muốn học theo lý thuyết, ví dụ thực tế, project, hay kết hợp?

## 7. Yêu cầu với ví dụ code
- Ngôn ngữ, kiến trúc, framework, thư viện mong muốn?
- Có tiêu chuẩn coding hoặc style nào cần tuân theo?

## 8. Điều cần AI luôn phân tích
Mỗi chủ đề phải trả lời:
- Giải quyết vấn đề gì?
- Vì sao nó tồn tại?
- Cách hoạt động bên trong?
- Khi nào nên dùng?
- Khi nào không nên dùng?
- Các giải pháp thay thế?
- Trade-off?
- Best practices?
- Performance?
- Security?
- Testing?
- Debug?
- Sai lầm phổ biến?
- Liên hệ với các chủ đề khác?
- Cách áp dụng trong dự án thực tế?

**Lưu ý:** AI phải DỪNG LẠI và chờ người dùng trả lời hoàn tất bước này trước khi sang Bước 2.

### Bước 2: Thiết kế & Viết Nội dung (Markdown)

#### 2.1: Xác định câu hỏi cốt lõi (Question-Driven Research)

Trước khi nghiên cứu Topic, hãy xác định:

> Nếu một Android Developer chủ động tìm kiếm Topic này, họ thực sự muốn biết điều gì?

Liệt kê từ **tối thiểu 15 câu hỏi quan trọng nhất** mà người học có khả năng quan tâm.

Ví dụ:

```text
Topic: Kotlin Flow

- Flow là gì?
- Tại sao phải dùng Flow?
- Flow giải quyết vấn đề gì?
- Khi nào nên dùng Flow?
- Flow hoạt động như thế nào?
- Có những loại Flow nào?
- Flow khác LiveData như thế nào?
- Flow khác RxJava như thế nào?
- StateFlow khác SharedFlow như thế nào?
- Flow có những nhược điểm gì?
- Flow được dùng ở đâu trong Android Architecture?
- Những lỗi thường gặp khi sử dụng Flow?
```

Danh sách câu hỏi này định hướng toàn bộ nội dung bài viết. Mọi phần trong bài phải phục vụ việc trả lời các câu hỏi đã xác định.

**Lưu ý:** AI phải DỪNG LẠI và chờ người dùng trả lời xác nhận hoàn tất bước này trước khi sang Bước tiếp theo

#### 2.2: Tổ chức nội dung (Flexible Structure)

**Không sử dụng template cố định cho tất cả các Topic.**

AI được phép tổ chức nội dung phù hợp với bản chất của từng Topic.

Tuy nhiên, một Topic cần trả lời được hầu hết các câu hỏi sau (nếu phù hợp):

- **What is it?** — Nó là gì?
- **Why does it exist?** — Vì sao nó tồn tại?
- **What problem does it solve?** — Nó giải quyết vấn đề gì?
- **When should I use it?** — Khi nào nên dùng?
- **When should I avoid it?** — Khi nào không nên dùng?
- **How do I use it?** — Sử dụng như thế nào?
- **How does it work?** — Hoạt động như thế nào?
- **What are the different approaches?** — Có những cách tiếp cận nào?
- **What are the trade-offs?** — Đánh đổi là gì?
- **What are the limitations?** — Giới hạn là gì?
- **What are the common mistakes?** — Lỗi thường gặp?
- **How does it compare with similar technologies?** — So sánh với công nghệ tương tự?
- **How is it used in real-world Android projects?** — Được dùng thế nào trong project thực tế?
- **What should I learn next?** — Nên học tiếp gì?

Không bắt buộc trả lời tất cả. Chọn những câu hỏi phù hợp với bản chất Topic.

Không tự ý dịch 1 số từ ngữ chuyên ngành, ví dụ key-value không nên để là khoá - giá trị

#### 2.3: Hướng dẫn triển khai thực tế & Mô phỏng luồng (Implementation & Flow Simulation)

Mục tiêu là **hướng dẫn cách triển khai vào project thực tế**, không phải dán một khối code dài dòng.

- **Tập trung vào từng bước triển khai (Step-by-Step Guide):** Hướng dẫn rõ cách tích hợp khái niệm vào các tầng kiến trúc (UI, ViewModel, Repository, UseCase...).
- **Hạn chế code dài dòng & boilerplate:** Chỉ đưa snippet ngắn gọn, thể hiện đúng điểm mấu chốt của logic.
- **Ưu tiên code mô phỏng luồng hoạt động:** Sử dụng code dạng mô phỏng (flow breakdown/step-by-step tracing) để minh họa cách dữ liệu/trạng thái dịch chuyển qua từng bước.
- **Minh họa bằng Mermaid:** Sử dụng biểu đồ Mermaid (Sequence Diagram, Flowchart) để trực quan hóa luồng chạy song song với các bước triển khai code.
- **Context thực tế:** Đảm bảo snippet hoặc ví dụ áp dụng đúng ngữ cảnh dự án thật (không dùng `class Animal`, `foo`, `bar`).

#### 2.4: Tư duy hệ thống (Optional)

Phần này **không bắt buộc**. Chỉ thêm khi Topic thực sự cần người đọc hiểu vị trí của nó trong hệ thống lớn hơn.

Nếu có, đặt ở **cuối bài viết** (trước References) và trả lời:
- Thành phần này nằm ở đâu trong tổng thể dự án (ví dụ: kiến trúc MVVM, Clean Architecture)?
- Nó tương tác, tác động đến các module/layer khác (UI, Domain, Data) như thế nào?

#### 2.5: Nguồn tham khảo (References & Citations)

- Bắt buộc trích dẫn nguồn gốc của kiến thức.
- Ưu tiên tuyệt đối các Official Documentation (Android Developers, JetBrains Kotlin Docs, Material Design, RFCs).

### Bước 3: Tích hợp Website (Presentation Layer)
- Tạo/Cập nhật entry trong cấu trúc nội dung của Website (ví dụ: `android-content.js`).
- Đảm bảo HTML được generate đầy đủ từ Markdown.
- Sử dụng triệt để Callouts (Note, Tip, Warning) cho phần Pitfalls.
- Đảm bảo Syntax Highlighting cho Code block (`data-lang`).

### Bước 4: Kiểm chứng (Verify)
- Kiểm tra xem cấu trúc bài đã đúng hướng "What -> When -> Code" chưa.
- Chạy lệnh verify syntax cho file JS website (`node -c <file.js>`).
- **Bắt buộc tự động kiểm tra trang `index.html`** (bằng Puppeteer hoặc test script) để đảm bảo không có lỗi thực thi Javascript (runtime errors) làm crash UI (ví dụ: lỗi nội suy biến `${...}` trong JS template literal).
- Tuyệt đối không sửa Navigation (`mkdocs.yml`), nếu có nghi vấn thì hỏi user.

## Success Criteria
Một Topic tạo bởi workflow này thành công khi: Người đọc đọc xong có thể copy tư duy và cấu trúc code để áp dụng ngay vào task của họ trong 15 phút.