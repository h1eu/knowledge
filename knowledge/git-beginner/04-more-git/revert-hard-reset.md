---
title: "Revert & Hard Reset — Sửa sai an toàn"
slug: "git-revert-hard-reset"
summary: "Commit của bạn làm vỡ trang board trên main: hai triết lý hoàn tác, vì sao revert là chuẩn trên branch chung, và vùng an toàn duy nhất của reset --hard."
tags: ['git', 'revert', 'reset', 'undo']
prerequisites: ['git-reset-unstage']
related: ['git-cherry-pick', 'git-stash']
next: "git-rebase-merge-squash"
previous: "git-security-secrets"
difficulty: beginner
read_time: "10 phút"
learning_outcomes:
  - Hoàn tác commit đã push bằng git revert mà không phá lịch sử.
  - Chọn đúng công cụ theo bảng tình huống.
  - Thuộc quy tắc vàng: lịch sử chia sẻ chỉ được thêm vào.
knowledge_gap: "reset --hard + force push lên branch chung — hủy lịch sử cả team, mọi người pull về đều vỡ."
---

# Revert & Hard Reset — Sửa sai an toàn

> **Bối cảnh:** Sau khi drag-drop được merge, bạn phát hiện commit cuối của mình làm **trắng trang board** trên `main` — lỗi nghiêm trọng, người dùng không thấy gì. An hỏi lại trong nhóm: *"Ai biết undo commit đã push không?"* Bài này chính là câu trả lời.

## Hai triết lý hoàn tác

Cùng mục tiêu "hủy commit X", hai con đường đối lập:

| | git revert | git reset --hard |
|---|---|---|
| Cơ chế | Thêm commit mới **ngược lại** thay đổi | Di chuyển branch ngược như chưa tồn tại |
| Lịch sử | Giữ nguyên + thêm mới | Mất dấu commit cũ |
| An toàn trên branch chung | Có | Không |

## Cách chuẩn trên main: git revert

```bash
git switch main
git pull                      # luôn bắt đầu từ code mới nhất
git log --oneline -3
```

Xác định commit gây lỗi:

```text
9a8b7c6 Fix card shadow on hover          <- commit của bạn gây vỡ trang
7d6e5f4 Merge feature/drag-drop into main
...
```

```bash
git revert 9a8b7c6
```

Output:

```text
[main 1f2e3d4] Revert "Fix card shadow on hover"
 1 file changed, 2 deletions(-)
```

Git tự tính toán **patch ngược** và tạo commit mới. Kiểm tra trang chạy bình thường trở lại rồi push:

```bash
git push
```

Vì sao đây là cách chuẩn? Nhìn log sau đó:

```text
1f2e3d4 Revert "Fix card shadow on hover"   <- có, và tại sao
9a8b7c6 Fix card shadow on hover            <- vẫn còn nguyên
```

Lịch sử kể trọn chuyện "đã sai → đã sửa". Đồng đội pull về **không cần làm gì thêm**. Với task-board, An yêu cầu revert đi kèm issue: `"Revert ... (#34)"` để truy vết được nguyên nhân gốc.

## reset --hard — chỉ cho lịch sử riêng tư

Tình huống hợp lệ duy nhất ở giai đoạn này: commit thử nghiệm **chưa push**, nằm một mình trên nhánh cá nhân:

```bash
git log --oneline -2        # xác nhận commit rác chưa push
git reset --hard HEAD~1     # vứt bỏ nó cùng thay đổi
```

Ba chế độ đầy đủ đã học ở [Module 02](../02-basic-git-usage/git-reset.md): `--soft` giữ staged, `--mixed` (mặc định) giữ working directory, `--hard` xóa sạch.

> [!WARNING]
> `reset --hard` xóa thật sự công việc chưa commit. Nếu lỡ tay chạy trên nhánh có code quý giá — đừng panic: commit vẫn nằm trong kho dữ liệu nội bộ và bài [Cứu hộ bằng reflog](rescue-reflog.md) sẽ lấy lại được trong phần lớn trường hợp.

## Bảng quyết định nhanh

| Tình huống | Công cụ |
|---|---|
| Commit sai **đã push** lên branch chung | `git revert` |
| Commit thử nghiệm local chưa push | `git reset --hard` |
| Gỡ commit cuối để viết lại cục bộ | `reset --soft/mixed HEAD~1` |
| Hủy một merge đã push | `git revert -m 1 <merge-hash>` (đọc kỹ output) |

Quy tắc vàng ghi nhớ cả module: **lịch sử đã chia sẻ thì chỉ được thêm; lịch sử riêng tư thì được viết lại.**

## Sai lầm thường gặp

- Revert xong tưởng commit sai "biến mất" — nó vẫn trong log kèm commit revert; muốn tìm hiểu nguyên nhân vẫn tra được.
- Dùng force push để "dọn" main cho đẹp → đồng đội pull về conflict hàng loạt, CI chết.
- Quên `pull` trước khi revert → revert một trạng thái cũ, đè mất fix mới của người khác.

## References

- [Pro Git 2.4: Undoing Things](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things)
- [Pro Git 7.6: Reset Demystified](https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified)
- [GitHub Docs: Reverting a commit](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/viewing-and-comparing-commits/reverting-a-commit)

## Học tiếp

[Rebase vs Merge vs Squash](rebase-merge-squash.md) — trước khi dọn lịch sử cho người khác đọc, cần phân biệt ba kiểu hợp nhất.
