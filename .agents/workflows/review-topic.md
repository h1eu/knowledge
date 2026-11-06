---
description: Quy trình rà soát chất lượng một Topic trước khi publish hoặc sau khi refactor.
---

# Workflow: Review Topic

## Mục đích

Định nghĩa quy trình rà soát một Topic để xác định Topic đã đạt Quality Standard hay cần chỉnh sửa thêm.

Workflow này là bước bắt buộc trước Workflow Publish Topic và sau Workflow Refactor Topic.

## Khi nào sử dụng

- Khi một Topic vừa được tạo bởi Workflow Learn Android, Practical Topic hoặc DSA Hello.
- Khi một Topic vừa được tái cấu trúc bởi Workflow Refactor Topic.
- Khi người dùng yêu cầu đánh giá chất lượng một Topic hiện có.

## Input

- Topic cần rà soát (Markdown Source và entry Website tương ứng nếu có).
- Các Topic liên quan (Prerequisite, Related, Next) để đối chiếu.

## Output

- Báo cáo rà soát, liệt kê vấn đề theo mức độ Critical, Major, Minor.
- Đề xuất chỉnh sửa cụ thể cho từng vấn đề.
- Kết luận: sẵn sàng publish, hoặc cần chỉnh sửa (kèm lý do).

## Các bước thực hiện

1. Đọc toàn bộ Markdown Source của Topic trước khi đánh giá.
2. Đánh giá theo Playbook Review Content (`.agents/playbooks/review-content.md`): chính xác kỹ thuật trước, hình thức sau.
3. Đối chiếu với các Topic liên quan để phát hiện mâu thuẫn hoặc trùng lặp.
   - **Định nghĩa nhất quán**: tìm định nghĩa chuẩn ở mục "X là gì?", rồi so với summary, learning outcomes, các phần giải thích, callout, chú thích diagram, tổng kết. Chỗ nào diễn đạt khác nghĩa hoặc dùng mental model khác là lỗi Major. Cùng khái niệm định nghĩa khác Topic gốc cũng là Major.
   - **Kiến thức và ví dụ tách bạch**: phần kiến thức (vấn đề, định nghĩa, cách hoạt động, outcomes) có tổng quát, đứng được mà không cần bối cảnh ví dụ không? Ví dụ có đúng bài toán kiến thức đó giải quyết, chạy được, minh hoạ đúng phần vừa giải thích không? Kiến thức bị đóng khung quanh một app cụ thể hoặc ví dụ gượng ép là Major; tên gọi thiếu nghĩa là Minor.
   - **Luồng chạy**: mỗi đoạn code có logic (rẽ nhánh, gọi qua nhiều tầng, chuyển thread, đổi trạng thái) có giải thích từng bước và sơ đồ luồng chạy đặt trước code không, số bước có khớp comment không? Thiếu là Major; số bước lệch là Minor.
4. Kiểm tra Frontmatter theo Frontmatter Standard và liên kết nội bộ (id/slug tồn tại).
5. Kiểm tra entry Website (nếu domain có website) khớp với Markdown Source: tiêu đề, metadata, nội dung không thiếu phần nào.
6. Chạy verify script của domain nếu có (ví dụ `node tools/verify-android-topics.js --id=<id>`, `node tools/verify-ios-topics.js`, `node tools/check_content_escapes.js`).
7. Lập báo cáo theo mức độ Critical, Major, Minor.
8. Bàn giao báo cáo để con người quyết định.

## Phân loại mức độ

- **Critical**: sai kiến thức, code sai, mất nội dung so với nguồn, website không render được.
- **Major**: thiếu phần bắt buộc (vấn đề, cách hoạt động, sai lầm thường gặp...), metadata sai, liên kết hỏng, Markdown và Website lệch nhau.
- **Minor**: diễn đạt, thuật ngữ chưa nhất quán, định dạng.

## Điều kiện hoàn thành

- Toàn bộ checklist trong Playbook Review Content đã được đánh giá.
- Mọi vấn đề đều có mức độ và đề xuất chỉnh sửa cụ thể.
- Không tự ý sửa nội dung nếu người dùng chỉ yêu cầu rà soát.

## Các Rule cần tuân thủ

- 05-markdown-standard.md
- 06-frontmatter-standard.md
- 07-writing-style.md
- 10-quality-standard.md
