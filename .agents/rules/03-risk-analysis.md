---
trigger: always_on
---

# Rule: Risk Analysis

## Mục đích

Tài liệu này định nghĩa quy trình phân tích rủi ro trước khi AI thực hiện bất kỳ thay đổi nào.

Mục tiêu là giảm thiểu các thay đổi gây ảnh hưởng ngoài mong muốn, bảo vệ tính ổn định của hệ thống và duy trì khả năng mở rộng lâu dài.

AI không chỉ thực hiện yêu cầu.

AI có trách nhiệm nhận diện, đánh giá và cảnh báo các rủi ro trước khi đưa ra giải pháp.

---

# Nguyên tắc

Không tồn tại thay đổi nào là hoàn toàn không có rủi ro.

Mọi thay đổi đều cần được đánh giá trước khi thực hiện.

Nếu không phát hiện được rủi ro, AI cần tự đánh giá lại thay vì mặc định rằng thay đổi đó an toàn.

---

# Quy trình phân tích rủi ro

Trước khi thực hiện thay đổi, AI cần tự đánh giá theo trình tự:

1. Xác định thay đổi.
2. Xác định phạm vi ảnh hưởng.
3. Xác định các thành phần liên quan.
4. Xác định các rủi ro có thể xảy ra.
5. Đánh giá mức độ nghiêm trọng.
6. Đề xuất phương án giảm thiểu.
7. Đánh giá khả năng khôi phục nếu thay đổi thất bại.

Không bỏ qua bất kỳ bước nào.

---

# Phân tích phạm vi ảnh hưởng

AI cần xem xét toàn bộ hệ thống thay vì chỉ tập trung vào file đang chỉnh sửa.

Ví dụ các thành phần cần kiểm tra:

- Cấu trúc thư mục
- Markdown
- Frontmatter
- Metadata
- Knowledge Graph
- Navigation
- Sidebar
- Search
- URL
- Internal Link
- Related Topics
- SEO
- Build Process
- Rendering
- Agent khác
- Script
- CI/CD
- Tài liệu liên quan

Nếu thay đổi có thể ảnh hưởng đến các thành phần trên, cần nêu rõ.

---

# Phân loại rủi ro

AI nên phân loại rủi ro theo các nhóm sau.

## Rủi ro dữ liệu

Ví dụ:

- Mất dữ liệu.
- Trùng lặp dữ liệu.
- Sai metadata.
- Sai liên kết.
- Sai taxonomy.

---

## Rủi ro kiến trúc

Ví dụ:

- Phá vỡ cấu trúc hiện tại.
- Tăng coupling.
- Giảm khả năng mở rộng.
- Tăng độ phức tạp.

---

## Rủi ro nội dung

Ví dụ:

- Nội dung không nhất quán.
- Trùng lặp kiến thức.
- Sai thuật ngữ.
- Sai liên kết.
- Thiếu tham chiếu.

---

## Rủi ro giao diện

Ví dụ:

- Điều hướng sai.
- Link hỏng.
- Layout lỗi.
- Không render được Markdown.
- Không tương thích MDX.

---

## Rủi ro hiệu năng

Ví dụ:

- Build chậm hơn.
- Search chậm.
- Bundle tăng.
- Render chậm.

---

## Rủi ro bảo trì

Ví dụ:

- Khó mở rộng.
- Khó đọc.
- Khó refactor.
- Tăng chi phí bảo trì.

---

# Đánh giá mức độ rủi ro

AI nên phân loại mức độ:

## Thấp

Ảnh hưởng nhỏ.

Có thể khôi phục dễ dàng.

Không ảnh hưởng kiến trúc.

---

## Trung bình

Ảnh hưởng nhiều thành phần.

Cần kiểm tra sau khi thay đổi.

Có thể phát sinh lỗi nếu triển khai không đúng.

---

## Cao

Ảnh hưởng đến kiến trúc.

Ảnh hưởng dữ liệu.

Ảnh hưởng nhiều Agent.

Ảnh hưởng Build hoặc Website.

Cần được cân nhắc kỹ trước khi thực hiện.

---

# Biện pháp giảm thiểu

Khi phát hiện rủi ro, AI cần đề xuất:

- Giải pháp thay thế.
- Các bước giảm thiểu.
- Phương án triển khai an toàn hơn.
- Các bước kiểm tra sau thay đổi.
- Kế hoạch khôi phục nếu cần.

Không chỉ nêu rủi ro mà không đưa ra hướng xử lý.

---

# Nguyên tắc thay đổi

Ưu tiên thay đổi nhỏ.

Ưu tiên thay đổi từng bước.

Ưu tiên thay đổi có thể kiểm chứng.

Không thực hiện thay đổi lớn nếu có thể chia thành nhiều bước nhỏ hơn.

---

# Bảo vệ dữ liệu

Không thực hiện thay đổi có nguy cơ:

- Mất dữ liệu.
- Ghi đè dữ liệu.
- Xóa dữ liệu.
- Thay đổi cấu trúc dữ liệu.

nếu chưa đánh giá đầy đủ tác động.

---

# Cảnh báo

Nếu phát hiện thay đổi có khả năng:

- Phá vỡ kiến trúc.
- Gây lỗi Build.
- Gây lỗi Render.
- Gây mất dữ liệu.
- Gây lỗi Search.
- Gây lỗi Navigation.
- Làm giảm khả năng mở rộng.

AI cần cảnh báo rõ ràng trước khi tiếp tục.

Không được bỏ qua chỉ vì yêu cầu của người dùng.

---

# Tính đảo ngược

Ưu tiên các thay đổi có thể:

- Hoàn tác.
- Khôi phục.
- So sánh.
- Kiểm chứng.

Hạn chế các thay đổi khó phục hồi.

---

# Mục tiêu cuối cùng

AI cần giúp hệ thống:

- An toàn hơn.
- Ổn định hơn.
- Dễ bảo trì hơn.
- Dễ mở rộng hơn.
- Ít rủi ro hơn.

Mọi thay đổi đều phải hướng tới việc giảm rủi ro cho toàn bộ hệ thống, không chỉ giải quyết yêu cầu trước mắt.