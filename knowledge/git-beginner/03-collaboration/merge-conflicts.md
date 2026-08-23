---
title: "Merge Conflicts — Xử lý xung đột"
slug: "git-merge-conflicts"
summary: "Conflict thật đầu tiên với Chi trên board.js: đọc conflict markers, ba lựa chọn hợp nhất, quy trình add → commit và đường lùi --abort."
tags: ['git', 'merge', 'conflict']
prerequisites: ['git-branches-merge']
related: ['git-pull-fetch', 'git-rebase-merge-squash']
next: "git-oss-licenses"
previous: "git-pull-fetch"
difficulty: beginner
read_time: "11 phút"
learning_outcomes:
  - Đọc hiểu markers <<<<<<< / ======= / >>>>>>>.
  - Giải quyết conflict bằng tay rồi hoàn tất merge đúng trình tự.
  - Biết abort an toàn và ba cách phòng conflict từ gốc.
knowledge_gap: "Chạy git add . mà chưa đọc kỹ conflict → đẩy code hỏng kèm marker lên remote."
---

# Merge Conflicts — Xử lý xung đột

> **Bối cảnh:** Bạn sửa hàm `renderBoard()` để thêm badge đếm task; cùng lúc Chi cũng sửa chính hàm đó cho tính năng filter. Khi bạn `git pull`, màn hình hiện:

```text
CONFLICT (content): Merge conflict in js/board.js
Automatic merge failed; fix conflicts and then commit the result.
```

Bình tĩnh — đây không phải lỗi hệ thống. Git chỉ nói: *"Hai người sửa cùng chỗ, tôi không có quyền chọn thay."*

## Khi nào conflict xảy ra?

Merge **tự động thành công** khi thay đổi nằm ở vùng khác nhau hoặc chỉ một phía đổi. Conflict xuất hiện khi:

- Hai nhánh sửa **cùng dòng, cùng file**, nội dung khác nhau (trường hợp này).
- Một bên xóa file, bên kia sửa file đó.
- Rebase/cherry-pick áp commit đè lên vùng đã bị thay đổi.

## Bước 1: Đọc tình trạng

```bash
git status
```

```text
Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   js/board.js
```

Mục **Unmerged paths** liệt kê các file cần xử lý tay.

## Bước 2: Mở file, đọc markers

Mở `js/board.js` tại vị trí xung đột:

```text
<<<<<<< HEAD
    renderCountBadge(taskList.children.length);
=======
    renderFilterDropdown(tasks);
>>>>>>> origin/main
```

Đọc như bảng đối chất:

| Marker | Ý nghĩa |
|---|---|
| `<<<<<<< HEAD` | Phiên bản phía BẠN (nhánh hiện tại) |
| `=======` | Ranh giới |
| `>>>>>>> origin/main` | Phiên bản phía CHI (code vừa pull) |

## Bước 3: Quyết định nội dung cuối

Ba lựa chọn: giữ của mình / giữ của họ / **hòa trộn cả hai** — ở đây đúng ý nghĩa nghiệp vụ là giữ cả badge lẫn dropdown:

```javascript
    renderCountBadge(taskList.children.length);
    renderFilterDropdown(tasks);
```

Sau khi quyết định, **xóa sạch cả ba dòng marker** — quên xóa là lỗi kinh điển nhất (file vẫn chạy được đến ngày build vỡ).

> [!TIP]
> VS Code hiển thị nút Accept Current Change / Accept Incoming / Accept Both ngay trên vùng conflict — dùng nó giảm đáng kể sai sót marker sót lại.

## Bước 4: Hoàn tất merge

```bash
git add js/board.js
git status     # xác nhận Unmerged paths biến mất
git commit     # Git soạn sẵn message merge, chỉ cần lưu
```

Output:

```text
[main 9a8b7c6] Merge branch 'main' of github.com:an-dev/task-board into main
```

Xong. Lịch sử giờ ghi nhận rõ hai dòng công việc đã hòa vào nhau tại commit nào.

## Đường lùi khi hoảng loạn

Thấy quá rối muốn quay về trạng thái trước khi pull:

```bash
git merge --abort
```

Mọi thứ trở về y nguyên trước đó — không mất gì. Xử lý xong tâm lý, thử lại sau.

## Phòng bệnh thay chữa bệnh

- **Pull mỗi sáng** — conflict nhỏ hàng ngày dễ gấp chục lần conflict dồn tuần.
- Nhánh/PR ngắn hạn, một chủ đề — vòng đời càng ngắn, va chạm càng ít.
- Team chia trách nhiệm theo file/module rõ ràng; hai người sửa cùng file cấu hình lớn là mồi lửa conflict.

## Sai lầm thường gặp

- Chạy `git add .` + commit mà chưa mở file xem conflict → đẩy marker lên remote, đồng đội build vỡ.
- Chọn "Accept Incoming" máy móc cho nhanh → âm thầm xóa mất tính năng của mình.
- Abort mãi không dám giải quyết — nhớ luôn có `--abort`, conflict không cắn người.

## References

- [Pro Git 3.2: Basic Merge Conflicts](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging#_basic_merge_conflicts)
- [GitHub Docs: Resolving a merge conflict](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line)

## Học tiếp

[Giấy phép nguồn mở phổ biến](oss-licenses.md) — An vừa quyết định mở nguồn task-board.
