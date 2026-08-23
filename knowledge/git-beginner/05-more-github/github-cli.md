---
title: "GitHub CLI — Thao tác GitHub từ terminal"
slug: "git-cli"
summary: "Một ngày làm việc của bạn chỉ với gh: tạo PR, theo dõi checks, checkout PR đồng nghiệp để test, merge — phân biệt rõ việc của git và gh."
tags: ['github', 'cli', 'gh', 'tooling']
prerequisites: ['git-github-account', 'git-pull-request']
related: ['git-actions', 'git-remote-push']
next: "git-markdown"
previous: "git-actions"
difficulty: beginner
read_time: "9 phút"
learning_outcomes:
  - Cài gh, đăng nhập một lần bằng gh auth login.
  - Tạo - theo dõi - merge PR ngay trong terminal.
  - Dùng gh pr checkout để test code PR của người khác.
knowledge_gap: "Nhầm gh với git — gh commit không tồn tại; quản lý repo vẫn là việc của git."
---

# GitHub CLI — Thao tác GitHub từ terminal

> **Bối cảnh:** An quan sát bạn suốt buổi sáng: push → mở tab web → tạo PR → quay lại terminal → lại mở web xem CI... *"Cài `gh` đi. Đỡ phải nhảy múa giữa hai cửa sổ."*

## Phân biệt git và gh — một lần cho đủ

| | git | gh |
|---|---|---|
| Quản lý | Repository (commit, branch) | Nền tảng GitHub (PR, issue, release) |
| Offline | Có | Không |
| Ví dụ | `git commit`, `git branch` | `gh pr create`, `gh issue list` |

Hai công cụ bổ sung, không thay thế nhau.

## Bước 1: Cài và đăng nhập

```bash
brew install gh        # macOS (Windows: winget install GitHub.cli)
gh auth login
```

Trả lời vài câu hướng dẫn (GitHub.com → SSH → Login with browser). Xác nhận:

```bash
gh auth status
```

```text
github.com
  ✓ Logged in to github.com account hazu (keyring)
```

`gh` nhận biết repo hiện tại qua remote `origin` — luôn đứng đúng thư mục dự án.

## Bước 2: Một ngày làm việc chỉ với gh

**Sáng — tạo PR cho tính năng export:**

```bash
gh pr create --title "Add CSV export for task list" --fill
```

Output:

```text
Creating pull request for feature/export into main in an-dev/task-board

https://github.com/an-dev/task-board/pull/42
```

`--fill` tự điền tiêu đề/nội dung từ commit message.

**Theo dõi CI không cần mở web:**

```bash
gh pr checks 42
```

```text
✓ test   12s   https://github.com/an-dev/task-board/actions/runs/123
```

**Chiều — review PR của Chi:**

```bash
gh pr list                       # PR đang mở trong repo
gh pr checkout 41                # kéo code PR #41 về máy chạy thử
npm test                         # test trên máy mình trước khi comment
gh pr diff 41                    # xem nhanh diff trong terminal
gh pr review 41 --approve -b "LGTM, filter hoạt động tốt"
```

`checkout` là lệnh đáng giá nhất quy trình review — test code người khác mà họ không cần làm gì thêm.

**Cuối ngày — merge khi được approve:**

```bash
gh pr merge 42 --squash --delete-branch
```

Squash-merge + xóa nhánh remote + local một phát ăn ngay.

## Bộ lệnh phụ hay dùng

```bash
gh repo clone an-dev/task-board    # ngắn hơn git clone full-url
gh issue create -t "Bug: ..." -b "Mô tả"
gh browse                          # mở trang repo hiện tại trên web
gh release create v1.1.0           # tạo release kèm tag
```

## Khi nào vẫn nên dùng web?

Review thảo luận dài, chỉnh sửa mô tả phức tạp, cấu hình repo — giao diện web vẫn tiện hơn. `gh` mạnh nhất ở các thao tác **lặp lại hàng giờ**: create/check/merge PR.

> [!TIP]
> Quy trình review chuẩn của team task-board giờ là: `gh pr list` → `gh pr checkout <số>` → chạy thử → `gh pr review`. Mọi thứ nằm trong một terminal.

## Sai lầm thường gặp

- Gõ `gh commit` — không tồn tại; commit là việc của `git`.
- Chưa `auth login` đã gõ lệnh → mọi thứ báo lỗi xác thực.
- `gh pr merge` mà chưa nhìn `gh pr checks` — tiện quá hóa bỏ qua cửa kiểm tra.

## References

- [GitHub CLI manual](https://cli.github.com/manual/)
- [GitHub Docs: Using GitHub CLI](https://docs.github.com/en/github-cli/github-cli/about-github-cli)

## Học tiếp

[Markdown](markdown.md) — viết README tử tế cho task-board trước khi mở nguồn.
