---
trigger: always_on
---

# Rule: Code Standard

## Mục đích

Tài liệu này định nghĩa tiêu chuẩn phát triển mã nguồn của Knowledge OS.

Mục tiêu là xây dựng một hệ thống:

- Dễ đọc.
- Dễ bảo trì.
- Dễ mở rộng.
- Dễ kiểm thử.
- Dễ cộng tác giữa các AI Agent.

Code cần phục vụ kiến trúc của hệ thống trước khi phục vụ nhu cầu triển khai.

Phạm vi: mã nguồn của website (`website/`) và công cụ (`tools/`). Code ví dụ trong bài học theo rule 07 và `.agents/playbooks/write-example.md`.

---

# Triết lý

Code tồn tại để phục vụ tri thức.

Không để tri thức phụ thuộc vào code.

Website chỉ là nơi hiển thị nội dung.

Code không phải nguồn dữ liệu của hệ thống.

---

# Đơn giản

Ưu tiên giải pháp đơn giản nhất.

Không thêm abstraction nếu chưa thật sự cần.

Không tối ưu hóa sớm.

Không thêm framework hoặc thư viện chỉ vì "có thể sẽ cần".

---

# Khả năng đọc

Code được viết cho con người đọc trước khi được máy tính thực thi.

Ưu tiên:

- Rõ ràng.
- Dễ hiểu.
- Có chủ đích.

Không viết code quá thông minh.

---

# Một trách nhiệm

Mỗi:

- Function
- Component
- Module
- Utility

chỉ nên có một trách nhiệm chính.

Nếu một thành phần xử lý nhiều nhiệm vụ khác nhau, cần xem xét tách nhỏ.

---

# Đặt tên

Tên cần phản ánh đúng mục đích.

Ưu tiên:

- Danh từ cho dữ liệu.
- Động từ cho hành động.
- Không viết tắt nếu không phổ biến.

Tên phải giúp người đọc hiểu mà không cần xem phần triển khai.

---

# Tránh lặp lại

Không sao chép logic.

Nếu nhiều nơi cùng thực hiện một nhiệm vụ, hãy trích xuất thành thành phần dùng chung.

Ưu tiên tái sử dụng trước khi tạo mới.

---

# Cấu trúc

Cấu trúc thư mục phải phản ánh kiến trúc của hệ thống.

Không tổ chức theo sở thích cá nhân.

Không tổ chức theo giao diện.

Ưu tiên tổ chức theo chức năng.

---

# Phụ thuộc

Giảm phụ thuộc giữa các Module.

Ưu tiên:

- Coupling thấp.
- Cohesion cao.

Không tạo phụ thuộc vòng.

---

# Thành phần dùng chung

Chỉ trích xuất thành phần dùng chung khi:

- Đã xuất hiện nhu cầu thực tế.
- Có khả năng tái sử dụng.

Không trích xuất chỉ để giảm số dòng code.

---

# Cấu hình

Ưu tiên Convention over Configuration.

Chỉ thêm cấu hình khi thật sự cần.

---

# Xử lý lỗi

Mọi lỗi cần:

- Có thông báo rõ ràng.
- Có khả năng xác định nguyên nhân.
- Không làm hệ thống rơi vào trạng thái không xác định.

Không bỏ qua Exception.

---

# Logging

Log cần phục vụ việc:

- Debug.
- Theo dõi.
- Phân tích.

Không log dữ liệu không cần thiết.

Không log thông tin nhạy cảm.

---

# Hiệu năng

Không tối ưu sớm.

Chỉ tối ưu khi:

- Có số liệu.
- Có vấn đề thực tế.
- Có thể chứng minh lợi ích.

Không đánh đổi khả năng đọc chỉ để tăng hiệu năng không đáng kể.

---

# Công nghệ

Code không được phụ thuộc trực tiếp vào:

- Markdown Structure
- Taxonomy
- Nội dung cụ thể

Website chỉ xử lý dữ liệu đã được chuẩn hóa.

Không hardcode dữ liệu tri thức trong Source Code.

Hiện trạng: các file `website/<domain>-content.js` và sidebar `KNOWLEDGE_DATA` trong `website/app.js` vẫn chứa tri thức và mục lục viết sẵn (rule 00, "Presentation Layer"). Cho tới khi có generator cho mọi domain:

- File do generator sinh (`git-content.js`, `oodp-content.js`) không sửa tay; sửa Markdown rồi chạy generator.
- File sửa tay: không thêm tri thức chỉ có ở website; mọi nội dung phải có trong Markdown trước.
- Logic hiển thị (render callout, thay Mermaid bằng SVG, embed Archify) nằm trong code website hoặc script đồng bộ, không nằm trong nội dung.
- Công cụ mới ưu tiên đọc Markdown và sinh ra website, thay vì thêm một nơi sửa tay mới.

---

# Bẫy kỹ thuật của website

- Nội dung bài nằm trong template literal JS: `${` sẽ bị thực thi, `\` bị nuốt (`\(` thành `(`). Phải escape thành `\${` và `\\`. Kiểm tra: `node tools/check_content_escapes.js` (chạy trong pre-commit hook và CI).
- Sau khi sửa file JS của website: `node -c website/<file>.js`, rồi mở trang bằng Puppeteer (có sẵn trong `node_modules`) để chắc không có lỗi runtime.
- Alias `CONTENT['<id>'] = CONTENT['<key>']` phải đặt sau định nghĩa entry mà nó trỏ tới.

---

# Khả năng mở rộng

Mọi thay đổi nên:

- Dễ bổ sung.
- Dễ thay thế.
- Dễ refactor.

Không thiết kế cho mọi trường hợp có thể xảy ra.

Thiết kế cho nhu cầu hiện tại và khả năng mở rộng hợp lý.

---

# Kiểm thử

Code nên được thiết kế để có thể kiểm thử.

Logic nghiệp vụ cần tách khỏi giao diện khi phù hợp.

Ưu tiên các thành phần có thể kiểm thử độc lập.

---

# Mục tiêu cuối cùng

Mã nguồn của Knowledge OS cần:

- Đơn giản.
- Nhất quán.
- Có cấu trúc.
- Dễ đọc.
- Dễ bảo trì.
- Dễ mở rộng.

Code chỉ là công cụ để phục vụ tri thức, không phải trung tâm của hệ thống.