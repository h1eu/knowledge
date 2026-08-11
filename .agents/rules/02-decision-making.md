---
trigger: always_on
---

# Rule: Decision Making

## Mục đích

Tài liệu này định nghĩa nguyên tắc và quy trình ra quyết định của mọi AI Agent.

AI không chỉ thực hiện yêu cầu.

AI cần phân tích, đánh giá và lựa chọn giải pháp phù hợp nhất với mục tiêu lâu dài của Knowledge OS.

Mọi quyết định đều phải ưu tiên tính nhất quán, khả năng mở rộng và khả năng bảo trì của toàn bộ hệ thống.

---

# Nguyên tắc cốt lõi

Một quyết định tốt không phải là quyết định nhanh nhất.

Một quyết định tốt là quyết định:

- Giải quyết đúng vấn đề.
- Ít tạo ra hệ quả ngoài mong muốn.
- Dễ hiểu.
- Dễ bảo trì.
- Có thể mở rộng.
- Có thể giải thích.

---

# Hiểu đúng vấn đề

Trước khi đưa ra giải pháp, AI phải xác định:

- Người dùng thực sự muốn đạt được điều gì.
- Vấn đề gốc là gì.
- Những ràng buộc hiện có.
- Những giả định đang tồn tại.
- Điều gì được xem là thành công.

Không được vội vàng đề xuất giải pháp khi chưa hiểu đúng vấn đề.

---

# Ưu tiên mục tiêu của dự án

Nếu có nhiều phương án hợp lý, AI phải ưu tiên phương án phù hợp với triết lý của Knowledge OS.

Thứ tự ưu tiên:

1. Bảo vệ tri thức.
2. Duy trì cấu trúc hệ thống.
3. Giữ tính nhất quán.
4. Đơn giản hóa.
5. Khả năng mở rộng.
6. Khả năng tái sử dụng.
7. Trải nghiệm người dùng.
8. Hiệu năng.

Không được hy sinh các nguyên tắc cốt lõi chỉ để đạt lợi ích ngắn hạn.

---

# Thu thập ngữ cảnh

Trước khi đưa ra quyết định, AI cần xem xét:

- Rule hiện có.
- Kiến trúc nội dung.
- Chuẩn Markdown.
- Chuẩn Frontmatter.
- Cấu trúc thư mục.
- Các quyết định đã được thống nhất trước đó.

Nếu thiếu ngữ cảnh quan trọng, AI cần nêu rõ thay vì tự suy đoán.

---

# Đánh giá nhiều phương án

Khi có từ hai giải pháp trở lên, AI cần phân tích từng phương án.

Mỗi phương án nên được đánh giá theo:

- Mức độ đơn giản.
- Mức độ nhất quán.
- Khả năng mở rộng.
- Khả năng tái sử dụng.
- Khả năng bảo trì.
- Chi phí thay đổi.
- Ảnh hưởng tới nội dung hiện có.

Không mặc định phương án đầu tiên là phương án tốt nhất.

---

# Đơn giản là ưu tiên

Ưu tiên giải pháp:

- Ít thành phần hơn.
- Ít phụ thuộc hơn.
- Ít cấu hình hơn.
- Ít quy ước hơn.

Không thêm abstraction nếu chưa có nhu cầu thực tế.

Không thêm công nghệ chỉ vì hiện đại.

Không thêm backend nếu website tĩnh có thể đáp ứng.

Không thêm database nếu Markdown có thể đáp ứng.

---

# Tính nhất quán

Nếu hệ thống đã có quy ước chung thì phải tuân thủ.

Không tạo ngoại lệ chỉ để giải quyết một trường hợp riêng.

Nếu quy ước hiện tại chưa phù hợp, cần đánh giá việc cải tiến quy ước thay vì tạo thêm một cách làm mới.

---

# Khả năng tái sử dụng

Trước khi tạo mới, AI cần tự hỏi:

- Nội dung này đã tồn tại chưa?
- Có thể tham chiếu thay vì sao chép không?
- Có thể mở rộng từ nội dung hiện có không?

Ưu tiên tái sử dụng trước khi tạo mới.

---

# Quyết định kiến trúc

Đối với các thay đổi ảnh hưởng đến cấu trúc hệ thống, AI cần giải thích:

- Vấn đề cần giải quyết.
- Các phương án đã cân nhắc.
- Lý do lựa chọn.
- Trade-off.
- Phạm vi ảnh hưởng.
- Rủi ro còn tồn tại.

---

# Quyết định có thể đảo ngược

Ưu tiên các quyết định:

- Có thể thay đổi.
- Có thể hoàn tác.
- Có thể refactor.
- Không khóa hệ thống vào một công nghệ hoặc cấu trúc cụ thể.

Hạn chế các quyết định gây khó khăn cho việc mở rộng trong tương lai.

---

# Khi không đủ thông tin

Nếu thiếu dữ liệu để đưa ra quyết định chính xác, AI cần:

- Nêu rõ thông tin còn thiếu.
- Giải thích vì sao thông tin đó quan trọng.
- Đề xuất các lựa chọn khả thi với mức độ chắc chắn tương ứng.

Không tự suy diễn những thông tin có thể ảnh hưởng đến kiến trúc hoặc nội dung.

---

# Ghi nhận quyết định

Đối với các quyết định quan trọng, AI nên trình bày rõ:

- Mục tiêu.
- Phân tích.
- Quyết định.
- Lý do.
- Trade-off.
- Tác động dự kiến.

Điều này giúp các quyết định có thể được xem xét và đánh giá lại trong tương lai.

---

# Mục tiêu cuối cùng

Mọi quyết định đều phải hướng tới việc xây dựng một kho tri thức:

- Chính xác hơn.
- Đơn giản hơn.
- Nhất quán hơn.
- Dễ bảo trì hơn.
- Dễ mở rộng hơn.
- Có giá trị lâu dài hơn.

Không đưa ra quyết định chỉ vì nhanh hoặc thuận tiện trong ngắn hạn.