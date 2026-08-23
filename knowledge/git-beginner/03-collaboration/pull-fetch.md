---
title: "Pull & Fetch — Đồng bộ hàng ngày"
slug: "git-pull-fetch"
summary: "Thói quen đầu buổi: fetch để nhìn trước, pull để hợp nhất ngay — kèm output thật và quy tắc pull --rebase giữ lịch sử tuyến tính."
tags: ['git', 'pull', 'fetch', 'remote']
prerequisites: ['git-remote-push']
related: ['git-merge-conflicts', 'git-rebase-merge-squash']
next: "git-merge-conflicts"
previous: "git-pull-request"
difficulty: beginner
read_time: "8 phút"
learning_outcomes:
  - Phân biệt fetch (chỉ tải về, không đụng code) và pull (fetch + merge).
  - Dùng git log main..origin/main xem trước commit của người khác.
  - Đặt pull.rebase true cho lịch sử tuyến tính.
knowledge_gap: "Để nợ đồng bộ nhiều ngày → conflict dồn thành bài toán lớn khó xử."
---

# Pull & Fetch — Đồng bộ hàng ngày

> **Bối cảnh:** Sáng hôm sau mở máy, `git status` báo:

```text
On branch main
Your branch is behind 'origin/main' by 3 commits, and can be fast-forwarded.
```

Chi đã đẩy 3 commit mới tối qua. Trước khi bắt đầu code, cần đồng bộ — nhưng an toàn thì làm thế nào?

## git fetch — nhìn trước, không động vào code

```bash
git fetch origin
```

Fetch tải mọi commit/branch mới từ remote về **kho nội bộ `.git`**, cập nhật nhánh phản chiếu `origin/main`. Working directory của bạn **không đổi một byte nào**. Giờ có thể thẩm định công việc của Chi:

```bash
git log main..origin/main --oneline
```

Output:

```text
f8g9h0i (origin/main) Add filter by assignee
d4e5f6a Refactor task card component
b2c3d4e Fix timezone bug in due date
```

Xem chi tiết khác biệt:

```bash
git diff main origin/main --stat    # tóm tắt file nào đổi bao nhiêu dòng
```

Fetch = cửa sổ quan sát an toàn. Dùng nó khi đang giữa chừng việc dở dang.

## git pull — fetch rồi hợp nhất luôn

```bash
git pull origin main
```

Output:

```text
Updating b7c8d9e..f8g9h0i
Fast-forward
 board.js     | 28 ++++++++++----
 filters.js   | 64 +++++++++++++++++++++++
 2 files changed, 86 insertions(+), 6 deletions(-)
```

Pull = `fetch` + merge `origin/main` vào nhánh hiện tại. Nhanh, tiện — đánh đổi mất bước "xem trước". Ở đây Git báo `Fast-forward`: bạn chưa có commit riêng trên main nên hợp nhất sạch sẽ.

## Quyết định dùng gì khi nào

| Tình huống | Chọn |
|---|---|
| Giữa chừng sửa dở, chỉ muốn biết tình hình | `fetch` + đọc log/diff |
| Mới mở máy, sẵn sàng nhận code mới | `pull` |
| Trước khi push (tránh bị rejected) | `pull --rebase` rồi push |
| Muốn thử branch mới của đồng nghiệp | `fetch` rồi `git switch ten-nhanh` |

> [!TIP]
> Nhịp chuẩn mỗi ngày: **sáng pull — tối push**. Khoảng cách với remote càng ngắn, conflict càng nhỏ.

## Pull với rebase — lịch sử tuyến tính

Mặc định pull tạo merge commit mỗi lần đồng bộ → log đầy "Merge branch 'main'..." nhiễu. Cấu hình này thay bằng rebase (đặt commit local lên trên cùng commit mới):

```bash
git config --global pull.rebase true
```

Từ giờ mọi pull giữ lịch sử thẳng hàng. Cơ chế bên trong rebase được mổ xẻ ở Module 04.

> [!NOTE]
> Nếu pull bị chặn vì working directory đang bẩn (`error: Your local changes...`) — đó là Git bảo vệ bạn. Commit hoặc stash (bài Stash) trước rồi pull lại.

## Sai lầm thường gặp

- Thấy "behind by X commits" kéo dài cả tuần — nợ đồng bộ trả giá bằng conflict lớn.
- Pull xong thấy merge commit lạ rồi hoảng — đó là hành vi mặc định; dùng `--rebase` nếu team muốn tránh.
- Tưởng pull ghi đè code đang sửa dở — Git chặn trước; không bao giờ mất âm thầm.

## References

- [Pro Git 2.5: Fetching and Pulling](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes#_fetching_and_pulling)
- [git-pull docs](https://git-scm.com/docs/git-pull)

## Học tiếp

[Merge Conflicts](merge-conflicts.md) — hôm nay nó đến thật: bạn và Chi vừa cùng sửa `board.js`.
