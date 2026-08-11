---
description: Quy trình đưa một Topic từ trạng thái soạn thảo sang trạng thái công bố chính thức.
---

# Workflow: Publish Topic

## Mục đích

Định nghĩa quy trình xác nhận và công bố một Topic sau khi đã hoàn thành soạn thảo và rà soát.

## Khi nào sử dụng

- Khi một Topic đã hoàn thành Workflow Create Topic hoặc Update Topic.
- Khi một Topic đã được Review và đạt yêu cầu chất lượng.
- Khi cần đưa nội dung từ trạng thái nháp sang trạng thái chính thức trong Repository.

## Input

- Topic đã hoàn thành soạn thảo.
- Kết quả từ Workflow Review Topic.

## Output

- Topic được cập nhật trạng thái công bố trong Frontmatter.
- Topic sẵn sàng hiển thị trên Website.

## Các bước thực hiện

1. Xác nhận Topic đã trải qua Workflow Review Topic.
2. Kiểm tra toàn bộ Resource liên quan (Lesson, Diagram, Quiz, Flashcard, Reference) đã đầy đủ.
3. Kiểm tra Frontmatter hợp lệ theo chuẩn Frontmatter.
4. Kiểm tra liên kết nội bộ (Prerequisite, Related, Next, Previous) hoạt động đúng.
5. Cập nhật trạng thái công bố trong Frontmatter.
6. Ghi nhận thay đổi vào Git với lịch sử rõ ràng.
7. Bàn giao để con người xác nhận lần cuối trước khi công bố.

## Điều kiện hoàn thành

- Topic đã vượt qua Review Topic mà không còn lỗi nghiêm trọng.
- Toàn bộ liên kết nội bộ hợp lệ.
- Frontmatter đầy đủ và chính xác.
- Con người đã xác nhận công bố.

## Các Rule cần tuân thủ

- 06-frontmatter-standard.md
- 09-agent-collaboration.md
- 10-quality-standard.md
