---
title: "git init — Khởi tạo Repository"
slug: "git-init"
summary: "Tạo repo luyện tập task-board-sandbox từ thư mục trắng: git init làm gì, thư mục .git chứa gì, và trạng thái untracked ban đầu."
tags: ['git', 'init', 'repository']
prerequisites: ['git-install-git', 'git-what-is-git']
related: ['git-add', 'git-create-repository']
next: "git-add"
previous: "git-github-account"
difficulty: beginner
read_time: "7 phút"
learning_outcomes:
  - Chạy git init và xác nhận bằng git status.
  - Hiểu .git = toàn bộ lịch sử; xóa nó là mất lịch sử chứ không mất code.
  - Phân biệt init (tạo mới) với clone (tải có sẵn).
knowledge_gap: "Tưởng sau init là code an toàn — chưa commit thì chưa có gì nằm trong lịch sử."
---

# git init — Khởi tạo Repository

> **Bối cảnh:** Ngày 2. Bạn tạo thư mục `task-board-sandbox` với ba file ban đầu do soạn sẵn, rồi... không biết làm gì tiếp. An nói: *"Nó chưa phải Git repository đâu. Chạy `git init` đi."*

## Bước 1: Kiểm tra trạng thái hiện tại

```bash
mkdir task-board-sandbox && cd task-board-sandbox
# ... tạo sẵn index.html, styles.css ...
git status
```

Output:

```text
fatal: not a git repository (or any of the parent directories): .git
```

Git thẳng thắn báo: thư mục này chưa được quản lý. Giờ mới đến lượt `init`.

## Bước 2: git init

```bash
git init
```

Output:

```text
Initialized empty Git repository in /Users/you/projects/task-board-sandbox/.git/
```

## git init thực sự làm gì?

Chỉ một việc: **tạo thư mục ẩn `.git`** bên trong dự án. Toàn bộ "ma thuật" của Git nằm ở đó:

| Trong `.git` | Chứa gì |
|---|---|
| objects | Snapshot (nội dung mọi commit) |
| refs | Con trỏ branch, tag |
| HEAD | Vị trí bạn đang đứng |
| index | Staging area |

Ngược lại, các file code (`index.html`, `styles.css`...) vẫn nguyên như cũ. Hai hệ quả quan trọng:

- **Xóa `.git`** = xóa toàn bộ lịch sử, nhưng file làm việc vẫn còn.
- **Chưa commit** = lịch sử chưa có gì; init chỉ dựng sân khấu, chưa lưu vở nào.

## Bước 3: Xem trạng thái sau init

```bash
git status
```

Output:

```text
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html
        styles.css

nothing added to commit but untracked files present (use "git add" to track)
```

Đọc output như tin nhắn của Git: mọi file đang **Untracked** (Git thấy nhưng chưa theo dõi), và nó gợi ý luôn bước tiếp theo — `git add`. Output của bạn sẽ gặp lại liên tục trong cả khóa học.

## init hay clone?

| Lệnh | Dùng khi |
|---|---|
| `git init` | Bắt đầu từ thư mục trống/code chưa có Git (trường hợp này) |
| `git clone <url>` | Tải repo có sẵn kèm lịch sử (sẽ dùng ở Module 03 với repo team) |

Clone tự nối remote sẵn; init thì chưa — đó là việc của `git remote add` ở Module 03.

## Sai lầm thường gặp

- Chạy `git init` ở thư mục sai cấp (vd home directory) → Git quét cả máy. Luôn `cd` vào đúng folder dự án trước.
- Tưởng init xong là an toàn → tắt máy mất code vì chưa commit. Init ≠ lưu.

## References

- [Pro Git 2.1: Getting a Git Repository](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
- [git-init docs](https://git-scm.com/docs/git-init)

## Học tiếp

[git add — Đưa thay đổi vào Staging](git-add.md): đưa `index.html` qua cửa đầu tiên của ba vùng.
