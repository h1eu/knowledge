---
trigger: always_on
---

# Rule: Content Architecture

## Mục đích

Tài liệu này định nghĩa mô hình tổ chức tri thức của Knowledge OS.

Mọi nội dung trong hệ thống phải được tổ chức theo cùng một kiến trúc nhằm đảm bảo:

- Dễ tìm kiếm.
- Dễ học.
- Dễ mở rộng.
- Dễ bảo trì.
- Dễ tái sử dụng.
- Dễ sinh nội dung bằng AI.

Đây là chuẩn chung cho toàn bộ Repository.

---

# Triết lý

Knowledge OS không phải là nơi lưu trữ các bài viết.

Knowledge OS là nơi xây dựng một hệ thống tri thức.

Mọi tài liệu đều phải có:

- Vị trí rõ ràng.
- Vai trò rõ ràng.
- Quan hệ rõ ràng.
- Mục đích rõ ràng.

Không tạo các bài viết tồn tại độc lập.

Mỗi nội dung phải là một phần của toàn bộ hệ thống tri thức.

---

# Kiến trúc phân cấp

Tri thức được tổ chức theo các cấp sau:

```
Domain
    ↓
Module
    ↓
Topic
    ↓
Resources
```

Trong đó:

- Domain là phạm vi kiến thức lớn.
- Module là nhóm kiến thức.
- Topic là chủ đề học tập.
- Resources là các tài nguyên phục vụ Topic.

---

# Domain

Domain là cấp cao nhất của hệ thống.

Ví dụ:

- Backend
- Frontend
- Mobile
- DevOps
- AI
- Database
- Cloud
- System Design

Một Domain hoạt động độc lập với Domain khác.

Việc bổ sung Domain mới không được ảnh hưởng đến các Domain hiện có.

---

# Module

Module là nhóm kiến thức trong một Domain.

Ví dụ:

Backend

- Spring
- Java
- Kotlin
- Redis
- Kafka

Android

- Compose
- Kotlin
- Coroutines
- Navigation

Module giúp tổ chức nội dung.

Module không phải là bài học.

---

# Topic

Topic là đơn vị học tập trung tâm của hệ thống.

Người học sẽ học theo Topic.

AI cũng tạo nội dung xoay quanh Topic.

Ví dụ:

Compose State

Coroutine Scope

StateFlow

JWT Authentication

Redis Cache

Một Topic chỉ nên giải thích một khái niệm chính.

Nếu nội dung quá lớn thì cần chia thành nhiều Topic nhỏ hơn, theo quy trình ở mục "Topic và mục lục".

---

# Topic và mục lục

Mục lục (`nav` trong `map/<domain>_mkdocs.yml`) là bản đồ Topic của domain.

## Một mục lá là một Topic

- Mỗi mục lá trong `nav` ứng với đúng một file Markdown và một Topic. Đường dẫn file phải đúng đường dẫn khai báo trong `nav`.
- Tiêu đề của mục, kể cả phần trong ngoặc, là phạm vi của Topic. Ví dụ "Push data and send event via Intent" bao gồm cả phần gửi event; "Networking (Request API, Handle event network, Handle connection state)" phải trả lời đủ ba ý đó.
- Kiến thức có mục riêng trong `nav` thì thuộc về mục đó, kể cả khi mục đó nằm ở Session sau hoặc chưa có bài.
- File `index.md` của Session/Module là trang tổng quan, không bắt buộc có trong `nav`. Trang tổng quan muốn hiện trong mục lục thì đặt số `<session>.0` (ví dụ `5.0 Session 05 Overview`).

## Khi nào Topic quá lớn

Đề xuất tách khi có một trong các dấu hiệu:

- `estimated_reading_time` vượt khoảng 30 phút.
- Topic giải thích từ hai khái niệm chính trở lên, mỗi khái niệm có định nghĩa và cách hoạt động riêng.
- Người học cần học các phần theo thứ tự khác nhau hoặc ở các thời điểm khác nhau.

Bài dài vì code lặp hoặc vì giải thích lại kiến thức của Topic khác thì không tách: gom kiến thức về Topic gốc (mục "Single Source of Truth") rồi rút gọn.

## Cách tách

Tách Topic là thay đổi `nav`, nên phải được con người duyệt trước.

1. Đề xuất cấu trúc mới theo dạng mục con dưới cùng số (ví dụ `4.2.3.3` → `4.2.3.3.1`, `4.2.3.3.2`), để không đổi số của các mục khác.
2. Nêu phạm vi ảnh hưởng: `nav`, file và `id` mới, entry và alias trên website, sidebar `app.js`, `prerequisites`/`related` của các Topic khác.
3. Chờ duyệt. Trong lúc chờ, giữ một file và chia section rõ ràng theo từng khái niệm.
4. Sau khi tách, Topic cũ giữ `id` của phần chính; các phần mới nhận `id` mới; website thêm alias để link cũ không hỏng.

---

# Resource

Resource là tài nguyên thuộc về Topic.

Một Topic có thể bao gồm:

- Lesson
- Example
- Diagram
- Quiz
- Flashcard
- Reference
- Image
- Asset

Topic là trung tâm.

Resource chỉ phục vụ Topic.

---

# Lesson

Lesson là nội dung chính.

Lesson mô tả:

- Khái niệm.
- Bản chất.
- Cách hoạt động.
- Ví dụ.
- Lưu ý.

Lesson không nên chứa quá nhiều chủ đề.

---

# Example

Example chỉ phục vụ minh họa.

Một Example có thể được sử dụng cho nhiều Topic.

Không nhúng các Project lớn vào Lesson.

---

# Diagram

Diagram giúp trực quan hóa.

Diagram không thay thế Lesson.

Diagram nên có khả năng tái sử dụng.

---

# Quiz

Quiz chỉ đánh giá mức độ hiểu.

Quiz không chứa kiến thức mới.

---

# Flashcard

Flashcard hỗ trợ ghi nhớ.

Flashcard được sinh từ Lesson.

Không thay thế Lesson.

---

# Reference

Reference là nguồn tham khảo.

Ưu tiên:

- Official Documentation
- RFC
- Whitepaper
- Research Paper

Không sử dụng Reference không rõ nguồn gốc.

---

# Quan hệ giữa các Topic

Topic không tồn tại độc lập.

Quan hệ được khai báo trong frontmatter bằng `id` (định nghĩa field ở rule 06):

- `prerequisites`: Topic cần học trước.
- `related`: Topic liên quan, kể cả giải pháp thay thế hoặc mở rộng.
- `downstream`: chỉ dùng trong trang tổng quan (`index.md`), liệt kê Topic bắt đầu học.

Thứ tự trước/sau (Previous/Next) lấy từ thứ tự trong `nav`, không khai báo trong frontmatter.

Ví dụ: Coroutine Scope có `prerequisites: [Coroutine]`, `related: [Flow]`; StateFlow đứng sau nó trong `nav`.

Chỉ khai báo `id` đã tồn tại. Topic chưa có bài thì nhắc trong nội dung (ví dụ "xem 8.4.3 Coroutines (chưa có bài)"), không đưa vào frontmatter.

Mọi Topic đều nên có khả năng liên kết.

---

# Single Source of Truth

Một kiến thức chỉ tồn tại một lần.

Không sao chép nội dung.

Nếu nhiều Topic cùng sử dụng một kiến thức thì tham chiếu.

Không tạo nhiều phiên bản của cùng một Lesson.

## Chọn Topic gốc

Khi một kiến thức đang được giải thích ở nhiều Topic, Topic gốc là Topic mà tiêu đề trong `nav` nói về kiến thức đó. Ví dụ Room Flow và InvalidationTracker thuộc "Async Transactions & Flow", Parcelable thuộc "Parcelables (Serialization) and Bundle". Không có mục nào khớp thì chọn Topic đứng trước trong `nav` và ghi lý do.

## Gộp trước, xoá sau

Khi chuyển một đoạn trùng về Topic gốc:

1. So đoạn đó với Topic gốc. Ý nào Topic gốc chưa có thì đưa sang Topic gốc trước.
2. Ở Topic phụ, thay đoạn đó bằng một tóm tắt ngắn (1–2 câu, đúng định nghĩa của Topic gốc) và link sang Topic gốc.
3. Nếu kiến thức thuộc một mục `nav` chưa có bài, tạo file đúng đường dẫn `nav` với `status: drafting`, kèm entry website, rồi mới chuyển. Không để kiến thức chỉ nằm ở chỗ người học không đọc được.

Không xoá kiến thức chỉ vì nó trùng: phải chắc nó còn tồn tại ở Topic gốc.

---

# Tái sử dụng

Ưu tiên tái sử dụng:

- Diagram
- Example
- Image
- Asset
- Reference

Không tạo tài nguyên mới nếu tài nguyên hiện có đáp ứng được.

---

# Kiến trúc thư mục

Repository cần phản ánh cấu trúc tri thức.

Không tổ chức theo giao diện.

Không tổ chức theo URL.

Không tổ chức theo menu của website.

Thư mục phải phản ánh mô hình kiến thức, tức là đường dẫn khai báo trong `nav` của Map Layer.

---

# Đặt tên

Tên Domain, Module và Topic cần:

- Ngắn gọn.
- Dễ hiểu.
- Nhất quán.
- Không viết tắt nếu không phổ biến.

Ưu tiên sử dụng thuật ngữ kỹ thuật chuẩn.

---

# Khả năng mở rộng

Kiến trúc phải cho phép bổ sung:

- Domain mới.
- Module mới.
- Topic mới.
- Resource mới.

mà không cần thay đổi cấu trúc hiện có.

---

# Không phụ thuộc công nghệ

Kiến trúc tri thức phải độc lập với:

- Framework.
- Frontend.
- Search Engine.
- AI Model.
- Công cụ Build.

Việc thay đổi công nghệ không được làm thay đổi cách tổ chức tri thức.

---

# Mục tiêu cuối cùng

Knowledge OS hướng tới việc xây dựng một Knowledge Repository có khả năng phát triển lâu dài.

Mọi nội dung phải:

- Có vị trí rõ ràng.
- Có cấu trúc rõ ràng.
- Có mối quan hệ rõ ràng.
- Có khả năng tái sử dụng.
- Có khả năng mở rộng.

AI Agent cần ưu tiên duy trì chất lượng của kiến trúc tri thức trước khi tạo thêm nội dung mới.