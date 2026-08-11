---
trigger: always_on
---

# Rule: Agent Collaboration

## Mục đích

Tài liệu này định nghĩa cách các AI Agent cộng tác trong Knowledge OS.

Mục tiêu là đảm bảo mọi Agent có thể làm việc độc lập nhưng vẫn duy trì tính nhất quán của toàn bộ hệ thống.

---

# Triết lý

AI Agent không cộng tác trực tiếp với nhau.

AI Agent cộng tác thông qua Knowledge Repository.

Repository là nguồn dữ liệu chung.

Repository là nơi lưu trạng thái của hệ thống.

---

# Single Source of Truth

Mọi Agent đều phải sử dụng cùng một nguồn dữ liệu.

Không lưu trạng thái riêng.

Không tự duy trì bản sao của dữ liệu.

Không tạo nguồn dữ liệu thứ hai.

---

# Độc lập

Mỗi Agent cần có:

- Trách nhiệm rõ ràng.
- Đầu vào rõ ràng.
- Đầu ra rõ ràng.

Một Agent không nên thực hiện nhiều vai trò khác nhau.

---

# Chuyên môn hóa

Mỗi Agent chỉ nên giải quyết một nhóm nhiệm vụ.

Ví dụ:

Knowledge Agent

↓

Sinh Lesson

Diagram Agent

↓

Sinh Diagram

Quiz Agent

↓

Sinh Quiz

Review Agent

↓

Đánh giá chất lượng

Không tạo Agent đa năng nếu không thật sự cần.

---

# Context

Mọi Agent đều phải:

- Đọc Rule.
- Đọc Context.
- Đọc Repository.

trước khi tạo hoặc chỉnh sửa nội dung.

Không đưa ra quyết định nếu thiếu ngữ cảnh quan trọng.

---

# Không sửa ngoài phạm vi

Agent chỉ được chỉnh sửa các tài nguyên thuộc phạm vi nhiệm vụ của mình.

Ví dụ:

Diagram Agent

↓

Không chỉnh sửa Lesson.

Quiz Agent

↓

Không chỉnh sửa Diagram.

Review Agent

↓

Không tự ý tạo nội dung mới.

---

# Không ghi đè

Nếu nhiều Agent cùng làm việc trên một Topic.

Agent cần:

- Đọc phiên bản mới nhất.
- Kiểm tra thay đổi.
- Chỉ cập nhật phần mình chịu trách nhiệm.

Không ghi đè công việc của Agent khác.

---

# Tái sử dụng

Trước khi tạo mới:

AI cần kiểm tra:

- Đã tồn tại Resource chưa?
- Có thể mở rộng Resource hiện tại không?
- Có thể tham chiếu thay vì tạo mới không?

Ưu tiên tái sử dụng.

---

# Chất lượng

Nếu Agent phát hiện:

- Thiếu Metadata.
- Sai Rule.
- Sai Markdown.
- Sai Frontmatter.

Agent cần báo cáo hoặc đề xuất sửa.

Không bỏ qua lỗi.

---

# Giải thích

Nếu Agent đưa ra quyết định quan trọng.

Agent cần giải thích:

- Lý do.
- Phạm vi ảnh hưởng.
- Trade-off.

---

# Khả năng phục hồi

Nếu Agent gặp lỗi.

Không được để Repository ở trạng thái không nhất quán.

Ưu tiên:

- Không thay đổi.
- Hoặc thay đổi hoàn chỉnh.

Không để trạng thái dở dang.

---

# Mục tiêu cuối cùng

Các AI Agent cần hoạt động như một nhóm biên tập viên.

Mỗi Agent chịu trách nhiệm cho một phần của Repository.

Mọi Agent cùng hướng tới việc xây dựng một kho tri thức:

- Chính xác.
- Nhất quán.
- Có cấu trúc.
- Dễ mở rộng.
- Dễ bảo trì.