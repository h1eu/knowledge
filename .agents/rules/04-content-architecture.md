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

Nếu nội dung quá lớn thì cần chia thành nhiều Topic nhỏ hơn.

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

Một Topic có thể có:

- Prerequisite
- Related
- Next
- Previous
- Alternative
- Extension

Ví dụ:

Coroutine Scope

Prerequisite

↓

Coroutine

Related

↓

Flow

Next

↓

StateFlow

Mọi Topic đều nên có khả năng liên kết.

---

# Single Source of Truth

Một kiến thức chỉ tồn tại một lần.

Không sao chép nội dung.

Nếu nhiều Topic cùng sử dụng một kiến thức thì tham chiếu.

Không tạo nhiều phiên bản của cùng một Lesson.

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

Không tổ chức theo menu.

Thư mục phải phản ánh mô hình kiến thức.

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