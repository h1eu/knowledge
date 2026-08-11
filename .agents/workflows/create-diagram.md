---
description: Quy trình tạo mới một Diagram minh họa cho một Topic.
---

# Workflow: Create Diagram

## Mục đích

Định nghĩa quy trình tạo một Diagram nhằm hỗ trợ trực quan hóa kiến thức cho một Topic.

## Khi nào sử dụng

- Khi một Topic có kiến trúc, luồng xử lý hoặc vòng đời cần trực quan hóa.
- Khi nội dung dạng văn bản khó truyền tải mối quan hệ giữa các thành phần.
- Khi cần cập nhật lại một Diagram đã lỗi thời.

## Input

- Topic cần minh họa.
- Nội dung Lesson liên quan (nếu đã có).
- Loại quan hệ hoặc luồng cần thể hiện (kiến trúc, tuần tự, trạng thái, luồng dữ liệu...).

## Output

- Một file Diagram mới theo đúng cấu trúc trong Template Diagram.
- Diagram được liên kết với Topic tương ứng.

## Các bước thực hiện

1. Xác định Topic cần Diagram.
2. Xác định loại Diagram phù hợp (Flowchart, Sequence, State, Architecture...).
3. Xác định các thành phần chính cần thể hiện.
4. Xác định mối quan hệ giữa các thành phần.
5. Áp dụng Template Diagram để tạo cấu trúc file.
6. Xây dựng Diagram bằng Mermaid.
7. Đối chiếu Diagram với nội dung Lesson để đảm bảo không mâu thuẫn.
8. Liên kết Diagram với Topic tương ứng.
9. Bàn giao để con người xác nhận.

## Điều kiện hoàn thành

- Diagram phản ánh đúng nội dung của Topic.
- Diagram không mâu thuẫn với Lesson.
- Diagram sử dụng Mermaid theo đúng chuẩn Markdown.
- Diagram đã được con người xác nhận.

## Các Rule cần tuân thủ

- 04-content-architecture.md
- 05-markdown-standard.md
- 10-quality-standard.md
