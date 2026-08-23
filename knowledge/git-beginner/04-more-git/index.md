---
title: "Module 04: More Git"
slug: "git-more-git-index"
summary: "Tuần hai: hộp công cụ kiểm soát lịch sử — hoàn tác an toàn, dọn commit bằng rebase/squash, stash, cherry-pick, Git Flow, cứu hộ reflog và quản lý repo phình to."
tags: ['git', 'workflow', 'recovery']
difficulty: beginner
read_time: "4 phút"
learning_outcomes:
  - Chọn đúng công cụ hoàn tác theo tình huống đã push hay chưa.
  - Dọn lịch sử nhánh cá nhân bằng rebase -i / squash.
  - Tự cứu mình khỏi reset --hard và branch bị xóa bằng reflog.
knowledge_gap: "Học lệnh rời rạc mà không có quy tắc tổng 'lịch sử chia sẻ chỉ được thêm' → dùng rebase/reset sai chỗ."
---

# Module 04: More Git

**Bối cảnh:** Tuần thứ hai tại task-board. Bạn đã quen nhịp PR; giờ là lúc đối mặt các tình huống thật: commit lỗi đã lên main, lịch sử WIP xấu xí, bị gọi fix gấp giữa chừng, và lần đầu lỡ tay mất code.

## Quy tắc xuyên suốt cả module

> **Lịch sử đã chia sẻ (push) thì chỉ được THÊM vào. Lịch sử riêng tư thì được VIẾT LẠI.**

Mọi công cụ dưới đây đều quy về quy tắc này:

```mermaid
graph TD
    A["Sai commit<br/>đã push?"] -->|"Revert"| B["Commit ngược<br/>an toàn"]
    A -->|"Chưa push"| C["Reset --hard<br/>quay ngược cục bộ"]
    D["6 commit WIP<br/>xấu xí"] --> E["Rebase -i / Squash<br/>viết lại gọn"]
    F["Bị gọi fix gấp<br/>giữa chừng việc"] --> G["Stash<br/>ngăn xếp tạm"]
    H["Chỉ cần 1 commit<br/>từ branch khác"] --> I["Cherry-pick"]
    J["Team cần quy trình<br/>release chính thức"] --> K["Git Flow"]
    L["Reset --hard mất code!"] --> M["Reflog cứu hộ<br/>(90 ngày cửa sổ sống)"]
```

## Nội dung module

1. [Revert & Hard Reset](revert-hard-reset.md) — commit của bạn làm vỡ trang board.
2. [Rebase vs Merge vs Squash](rebase-merge-squash.md) — 6 commit WIP phải dọn trước khi merge.
3. [git stash](stash.md) — bị gọi fix gấp Safari giữa chừng filter.
4. [git cherry-pick](cherry-pick.md) — vá nóng fix timezone lên release/1.0.
5. [Git Flow](git-flow.md) — team chọn mô hình phân nhánh chính thức.
6. [Cứu hộ — reflog](rescue-reflog.md) — bạn lỡ reset --hard mất nửa ngày code.
7. [Repository phình to](repo-performance.md) — 300MB PSD trong lịch sử.

## Tiêu chí hoàn thành

- Revert một commit trên main kèm tham chiếu issue, không force push.
- Squash một chuỗi commit WIP thành message sạch bằng `rebase -i`.
- Khôi phục thành công một "commit đã mất" từ reflog trong môi trường luyện tập.

## Học tiếp

Kỹ năng Git đã đủ dùng — giờ nâng cấp nền tảng cộng tác: [Module 05: More GitHub](../05-more-github/index.md).
