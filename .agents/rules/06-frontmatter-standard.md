---
trigger: always_on
---

# Rule: Frontmatter Standard

## Mục đích

Tài liệu này định nghĩa chuẩn Frontmatter cho toàn bộ Knowledge OS.

Frontmatter là metadata của nội dung.

Frontmatter giúp:

- Mô tả nội dung.
- Phân loại nội dung.
- Điều hướng.
- Tìm kiếm.
- Sinh Navigation.
- Sinh Roadmap.
- Sinh Knowledge Graph.

Frontmatter không chứa nội dung bài học.

---

# Nguyên tắc

Frontmatter là một hợp đồng (Contract) giữa:

- Nội dung.
- Website.
- AI Agent.
- Công cụ Build.

Mọi thành phần phải tuân thủ cùng một cấu trúc.

Không tự ý thêm hoặc thay đổi field nếu chưa được định nghĩa.

---

# Single Source of Truth

Một thông tin chỉ được khai báo một lần.

Không lặp lại metadata trong nội dung bài viết.

Không lưu cùng một dữ liệu ở nhiều field khác nhau.

---

# Metadata chỉ mô tả

Frontmatter chỉ dùng để mô tả bài viết.

Không chứa:

- Nội dung bài học.
- HTML.
- Markdown.
- JSX.
- Logic.

---

# Tối giản

Chỉ khai báo metadata thực sự cần thiết.

Không thêm field chỉ vì "có thể sẽ dùng".

Mỗi field đều phải có mục đích rõ ràng.

---

# Cấu trúc ổn định

Một field đã được sử dụng thì cần duy trì tính tương thích.

Không đổi tên field nếu chưa đánh giá tác động.

Không thay đổi kiểu dữ liệu nếu chưa thật sự cần.

---

# Chuẩn dữ liệu

Mỗi field chỉ nên có một kiểu dữ liệu.

Ví dụ:

- String
- Number
- Boolean
- Array
- Date

Không sử dụng nhiều kiểu dữ liệu cho cùng một field.

---

# Đặt tên Field

Tên field cần:

- Ngắn gọn.
- Rõ nghĩa.
- Viết bằng tiếng Anh.
- Dùng snake_case hoặc camelCase và thống nhất toàn bộ hệ thống.

Không sử dụng viết tắt khó hiểu.

Ví dụ tốt:

- title
- slug
- summary
- tags
- authors

Ví dụ không tốt:

- desc
- txt
- info
- t

---

# Danh mục Field

Mỗi field sử dụng trong hệ thống phải được định nghĩa tại đây.

## topic_tags

- Kiểu dữ liệu: Array of String.
- Mục đích: phân loại bài theo tag chủ đề chính thức của LeetCode.
- Giá trị: slug chuẩn của LeetCode (ví dụ `array`, `hash-table`, `two-pointers`, `dynamic-programming`).
- Nguồn dữ liệu: đồng bộ từ LeetCode GraphQL API thông qua công cụ sync chính thức.
- Phân biệt với `tags`: `tags` mô tả ngữ cảnh nội bộ của Repository (pattern, level, difficulty), `topic_tags` mô tả taxonomy gốc của LeetCode.
- Bài viết không thuộc LeetCode không cần field này.

---

# Nội dung Field

Metadata cần:

- Chính xác.
- Nhất quán.
- Có thể kiểm chứng.

Không tạo metadata mơ hồ.

---

# Quan hệ

Nếu metadata tham chiếu nội dung khác thì nên sử dụng:

- slug
- id

Không sử dụng đường dẫn tuyệt đối.

---

# Giá trị mặc định

Nếu một field có giá trị mặc định thì nên để hệ thống tự sinh.

Không ghi lại giá trị mặc định trong mọi bài viết.

---

# Mở rộng

Nếu cần bổ sung field mới:

- Đánh giá nhu cầu.
- Đánh giá tác động.
- Cập nhật chuẩn Frontmatter.
- Cập nhật Website.
- Cập nhật AI Agent.

Không tự ý tạo field mới trong một bài viết.

---

# Tính ổn định

Website phải có khả năng hoạt động nếu metadata không đầy đủ.

AI nên bổ sung metadata còn thiếu khi có thể.

Không để thiếu các field bắt buộc.

---

# Kiểm tra

AI cần kiểm tra:

- Thiếu field bắt buộc.
- Sai kiểu dữ liệu.
- Sai định dạng.
- Giá trị không hợp lệ.
- Trùng slug.
- Metadata không nhất quán.

---

# Không phụ thuộc công nghệ

Frontmatter không được phụ thuộc:

- Next.js
- Astro
- React
- Tailwind
- Search Engine

Metadata mô tả nội dung.

Không mô tả giao diện.

---

# Mục tiêu cuối cùng

Frontmatter cần:

- Chính xác.
- Nhất quán.
- Tối giản.
- Có khả năng mở rộng.
- Dễ xử lý tự động.

Frontmatter là Contract của toàn bộ Knowledge Repository.