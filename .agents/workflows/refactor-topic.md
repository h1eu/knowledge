---
description: Quy trình tái cấu trúc một Topic hiện có mà không thay đổi bản chất kiến thức.
---

# Workflow: Refactor Topic

## Mục đích

Định nghĩa quy trình cải thiện cấu trúc, cách trình bày hoặc tổ chức của một Topic hiện có mà không làm thay đổi bản chất kiến thức đã được xác nhận.

## Khi nào sử dụng

- Khi một Topic đã lỗi thời về cấu trúc nhưng nội dung kiến thức vẫn còn đúng.
- Khi một Topic quá lớn và cần tách thành nhiều Topic nhỏ hơn.
- Khi phát hiện trùng lặp nội dung giữa nhiều Topic.
- Khi cần đồng bộ Topic với Rule hoặc Template mới nhất.

## Input

- Topic cần tái cấu trúc.
- Rule và Template hiện hành.
- Lý do cần tái cấu trúc.

## Output

- Topic được tổ chức lại theo đúng Content Architecture và Template hiện hành.
- Không có kiến thức bị mất hoặc thay đổi ý nghĩa trong quá trình tái cấu trúc.

## Các bước thực hiện

1. Đọc toàn bộ nội dung hiện có của Topic, cả Markdown lẫn entry website.
2. Nếu entry website có nội dung mà Markdown không có: đưa phần đó về Markdown trước (rule 00, "Presentation Layer"). Từ đây Markdown là bản đầy đủ nhất.
3. Xác định vấn đề cần cải thiện (cấu trúc, độ dài, trùng lặp, không nhất quán).
4. Đối chiếu với phạm vi của Topic trong `nav` (rule 04, "Topic và mục lục"), Content Architecture và Template hiện hành.
5. Lập kế hoạch tái cấu trúc (tách Topic, gộp Section, cập nhật Frontmatter...) và nêu phạm vi ảnh hưởng theo rule 03. Kế hoạch có tách Topic hoặc đổi `nav` thì dừng lại chờ con người duyệt.
6. Chuyển kiến thức trùng về Topic gốc theo nguyên tắc "gộp trước, xoá sau" (rule 04, "Single Source of Truth").
7. Thực hiện thay đổi từng bước nhỏ, có thể kiểm chứng. Mỗi bước sửa Markdown và website trong cùng một thay đổi.
8. Đảm bảo không làm thay đổi bản chất kiến thức đã có.
9. Cập nhật lại các liên kết nội bộ bị ảnh hưởng (link trong bài, `prerequisites`/`related`, alias website).
10. Chạy script verify của domain và Workflow Review Topic (`.agents/workflows/review-topic.md`) sau khi tái cấu trúc.
11. Bàn giao để con người xác nhận.

## Điều kiện hoàn thành

- Cấu trúc mới tuân thủ Content Architecture và Template hiện hành.
- Không có kiến thức bị mất hoặc sai lệch so với bản gốc.
- Toàn bộ liên kết nội bộ vẫn hợp lệ sau khi tái cấu trúc.
- Con người đã xác nhận kết quả tái cấu trúc.

## Các Rule cần tuân thủ

- 01-system-thinking.md
- 03-risk-analysis.md
- 04-content-architecture.md
- 10-quality-standard.md
