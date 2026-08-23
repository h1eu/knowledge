---
title: "Cứu hộ — Tìm lại commit đã mất"
slug: "git-rescue-reflog"
summary: "Lỡ tay reset --hard mất nửa ngày code: git reflog ghi lại mọi di chuyển của HEAD, tìm hash và khôi phục — kèm cứu branch bị xóa."
tags: ['git', 'reflog', 'recovery', 'debug']
prerequisites: ['git-revert-hard-reset']
related: ['git-stash', 'git-repo-performance']
next: "git-repo-performance"
previous: "git-flow"
difficulty: beginner
read_time: "11 phút"
learning_outcomes:
  - Dùng reflog tìm commit "biến mất" và khôi phục bằng reset/branch.
  - Cứu nhánh bị xóa nhầm trước khi GC dọn.
  - Hiểu cửa sổ an toàn mặc định (~90 ngày) và giới hạn của reflog.
knowledge_gap: "Tưởng reset --hard = mất trắng vĩnh viễn nên panic re-clone, tự tay hủy cơ hội cứu."
---

# Cứu hộ — Tìm lại commit đã mất

> **Bối cảnh:** Sự cố cá nhân đầu tiên: bạn muốn gỡ commit rác trên nhánh `feature/export` nhưng gõ nhầm:

```bash
git reset --hard HEAD~3     # định gỡ 1... lại gỡ 3
```

Ba commit — **nửa ngày làm việc** — biến mất khỏi `git log`. Tim đập nhanh. Đừng re-clone, đừng panic. Git có nhật ký đen: **reflog**.

## Nguyên lý: Git không xóa ngay

`reset` chỉ di chuyển con trỏ branch; các commit cũ vẫn nằm nguyên trong kho object `.git`. Chúng thành "mồ côi" (dangling) và chỉ bị dọn vĩnh viễn bởi garbage collection — mặc định sau khoảng **90 ngày**. Cửa sổ đó là mạng sống của bạn.

## Bước 1: Mở nhật ký HEAD

```bash
git reflog
```

Output:

```text
1a2b3c4 (HEAD -> feature/export) feature/export@{0}: reset: moving to HEAD~3
f9e8d7c feature/export@{1}: commit: Add export to CSV button
c5d6e7f feature/export@{2}: commit: Handle empty selection
a3b4c5d feature/export@{3}: commit: Start export feature
```

Đọc dòng từ dưới lên: ba commit quý giá (`a3b4c5d`, `c5d6e7f`, `f9e8d7c`) vẫn nằm đây. Hash của đỉnh trước khi lỡ tay là `f9e8d7c`.

## Bước 2: Khôi phục

```bash
git reset --hard f9e8d7c
```

Output:

```text
HEAD is now at f9e8d7c Add export to CSV button
```

Xong. Kiểm tra `git log --oneline -4` — cả ba commit trở về như chưa có chuyện gì.

> [!NOTE]
> `reset --hard` để khôi phục an toàn vì working directory hiện không có thay đổi quý giá nào cần giữ. Nếu đang có sửa đổi dở dang khác, dùng `git branch rescue f9e8d7c` — tạo nhánh neo lấy commit trước đã, xử lý phần còn lại sau.

## Tình huống 2: Branch bị xóa nhầm

Bạn chạy `git branch -D feature/filter` (chưa merge!). Nhánh biến mất nhưng commit vẫn trong reflog:

```bash
git reflog | grep filter      # tìm hash cuối cùng của nhánh đó
git switch -c feature/filter <hash>   # dựng lại nhánh tại đúng chỗ
```

## Tình huống 3: Commit từng nằm ở stash rồi bị drop

Reflog cũng theo dõi stash:

```bash
git fsck --unreachable | grep commit    # liệt kê commit mồ côi mọi nguồn
git show <hash>                          # soi nội dung từng cái
git stash apply <hash>                   # hồi sinh nếu đúng món cần
```

## Giới hạn phải biết thẳng thắn

- Reflog là **nhật ký cục bộ** — không được push đi đâu. Máy mới clone không có nó.
- Cửa sổ ~90 ngày với commit thường, ~30 ngày với unreachable — đừng để sự cố ngủ đông quá lâu.
- Nếu commit **chưa từng được commit** (chỉ là file sửa dở) thì reset --hard xóa thật — thứ duy nhất không cứu được qua reflog; stash trước khi làm việc nguy hiểm.

## Sai lầm thường gặp

- Panic rồi `rm -rf` thư mục + re-clone → tự tay phá kho dữ liệu chứa mọi chứng cứ cứu hộ.
- Chạy `git gc --prune=now` khi đang hoảng loạn dọn ổ đĩa → đốt cửa sổ 90 ngày ngay lập tức.
- Coi reflog là backup — nó là nhật ký sự cố, không thay thế push đều đặn lên remote.

## References

- [Pro Git 7.x: Data Recovery](https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified#_data_recovery)
- [git-reflog docs](https://git-scm.com/docs/git-reflog)

## Học tiếp

[Repository phình to](repo-performance.md) — sự cố tiếp theo: An báo repo task-board nặng bất thường.
