---
description: Cách tư duy khi thiết kế một Diagram trực quan hóa kiến thức.
---

# Playbook: Design Diagram

## Tư duy

Diagram tồn tại để giúp người học nhìn thấy mối quan hệ mà văn bản khó truyền tải.

Một Diagram tốt phải phản ánh đúng cấu trúc thực tế, không đơn giản hóa sai bản chất.

## Best Practices

- Chọn loại Diagram phù hợp với nội dung (Flowchart cho luồng xử lý, Sequence cho tương tác theo thời gian, State cho vòng đời, Architecture cho cấu trúc hệ thống).
- Giới hạn số lượng thành phần trong một Diagram để tránh rối mắt.
- Đặt tên node hoặc thành phần rõ ràng, nhất quán với thuật ngữ trong Lesson.
- Chỉ thể hiện thông tin cần thiết cho mục tiêu minh họa.
- Đảm bảo Diagram không mâu thuẫn với nội dung Lesson liên quan.

## Các bước suy nghĩ

1. Diagram này cần trả lời câu hỏi gì cho người học?
2. Loại Diagram nào phù hợp nhất để trả lời câu hỏi đó?
3. Các thành phần chính cần xuất hiện là gì?
4. Mối quan hệ giữa các thành phần là gì (tuần tự, phân cấp, trạng thái, phụ thuộc)?
5. Có thông tin nào nên lược bỏ để Diagram dễ đọc hơn không?

## Checklist

- [ ] Loại Diagram có phù hợp với nội dung cần thể hiện không?
- [ ] Diagram có dễ đọc, không quá nhiều thành phần không?
- [ ] Tên thành phần có nhất quán với thuật ngữ trong Lesson không?
- [ ] Diagram có mâu thuẫn với nội dung Lesson không?
- [ ] Diagram có được viết bằng Mermaid theo chuẩn Markdown không?

## Lỗi thường gặp

- Chọn sai loại Diagram, ví dụ dùng Flowchart cho quan hệ trạng thái.
- Nhồi quá nhiều chi tiết khiến Diagram khó đọc.
- Đặt tên thành phần không nhất quán với nội dung Lesson.
- Sử dụng Diagram để trang trí thay vì hỗ trợ giải thích.

## Tiêu chí đánh giá

- Diagram giúp người học hiểu nhanh hơn so với chỉ đọc văn bản.
- Diagram chính xác, nhất quán với Lesson.
- Diagram đủ đơn giản để dễ đọc nhưng đủ chi tiết để không gây hiểu nhầm.
