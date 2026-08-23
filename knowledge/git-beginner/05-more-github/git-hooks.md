---
title: "Git Hooks — Tự động kiểm tra trước khi push"
slug: "git-git-hooks"
summary: "CI đỏ mỗi tuần vì ai đó quên lint: gắn script vào pre-commit/pre-push để chặn lỗi ngay trên máy — kèm giới hạn hooks không đi qua Git và cách bù bằng husky."
tags: ['git', 'hooks', 'automation', 'quality']
prerequisites: ['git-commit', 'git-actions']
related: ['git-actions', 'git-rebase-merge-squash']
next: ""
previous: "git-markdown"
difficulty: beginner
read_time: "10 phút"
learning_outcomes:
  - Hiểu vòng đời hook: pre-commit, commit-msg, pre-push chạy lúc nào.
  - Viết một pre-commit hook chặn file .env và chạy lint staged.
  - Biết hooks không được push qua Git → giải pháp repo-level (husky/core.hooksPath).
knowledge_gap: "T tưởng hook cài cho cả team — hook nằm trong .git cục bộ, không chia sẻ qua push."
---

# Git Hooks — Tự động kiểm tra trước khi push

> **Bối cảnh:** Tuần thứ ba. Lần thứ hai trong tuần, CI đỏ vì ai đó push code chưa lint. An than: *"Lỗi này đáng bị chặn ngay trên máy chứ không phải chờ CI 3 phút sau mới biết."* Câu trả lời: **Git Hooks**.

## Hooks là gì?

Hooks là các **script Git tự gọi tại thời điểm xác định** của vòng đời: trước khi tạo commit, sau khi viết message, trước khi push... Chúng nằm trong `.git/hooks/` của từng repo local. Git giao sẵn các mẫu tên `.sample` ở đó — xóa đuôi `.sample` là kích hoạt.

Ba hook dùng nhiều nhất:

| Hook | Chạy khi nào | Dùng để |
|---|---|---|
| `pre-commit` | Trước khi commit được ghi | Lint/format code staged, chặn file cấm |
| `commit-msg` | Sau khi bạn gõ message | Kiểm tra format message (vd Conventional Commits) |
| `pre-push` | Trước khi push lên remote | Chạy test nhanh cuối cùng |

Nếu hook thoát với mã lỗi (non-zero), **toàn bộ thao tác bị hủy** — đây chính là cơ chế "chặn cửa".

## Bước từng bước: pre-commit cho task-board

**Bước 1** — tạo file `.git/hooks/pre-commit`:

```bash
#!/bin/sh
# Chặn secret và chạy lint trên file staged

if git diff --cached --name-only | grep -q '^\.env$'; then
  echo "✖ .env không được phép commit!"
  exit 1
fi

npx eslint $(git diff --cached --name-only --diff-filter=ACM | grep '\.js$')
```

**Bước 2** — cấp quyền thực thi:

```bash
chmod +x .git/hooks/pre-commit
```

**Bước 3** — trải nghiệm bị chặn:

```bash
git add .env
git commit -m "oops"
```

Output:

```text
✖ .env không được phép commit!
```

Commit không xảy ra. Hook vừa cứu bạn khỏi sự cố như lần `.env` bay lên GitHub ở Module 03.

## Giới hạn số một: hooks KHÔNG đi qua Git

Thư mục `.git/` không được version control — nghĩa là hook của bạn **không tự xuất hiện trên máy đồng nghiệp** khi họ pull. Đây là điểm bối rối nhất với người mới.

Giải pháp chuẩn trong dự án Node — dùng **husky** quản lý hooks theo repo:

```bash
npm install --save-dev husky
npx husky init
echo "npx eslint \$(git diff --cached --name-only)" > .husky/pre-commit
```

Husky đặt `core.hooksPath` trỏ về folder `.husky/` **trong repo** → hook đi cùng code, mọi người `npm install` là có đủ. Các hệ sinh thái khác có tương đương (pre-commit framework cho Python...).

> [!TIP]
> Phân vai rõ hai tầng phòng thủ: **hooks = chặn nhanh trên máy cá nhân** (phản hồi tức thì); **GitHub Actions = cổng bắt buộc tập trung** (không ai tắt được). Hooks có thể bị bỏ qua (`--no-verify`) nên CI vẫn phải tồn tại.

## Quy tắc thiết kế hook tốt

- **Nhanh**: pre-commit chạy hàng chục lần/ngày — chỉ lint file staged, đừng nhồi cả bộ test nặng (đưa xuống pre-push).
- **Sửa giúp thay vì chỉ chặn**: formatter (prettier) tự sửa rồi stage lại dễ chịu hơn "đỏ lòe bắt tự sửa tay".
- **Bỏ qua được khi cần khẩn cấp**: `git commit --no-verify` tồn tại cho tình huống thật sự gấp — nhưng đừng thành thói quen.

## Sai lầm thường gặp

- Đặt logic hook phức tạp trong `.git/hooks` rồi mất sạch khi re-clone — chuyển sang husky/core.hooksPath ngay từ đầu.
- Nhét toàn bộ test suite vào pre-commit → mỗi commit chờ 5 phút, cả team tìm cách vô hiệu hóa hook.
- Tưởng hook của mình chạy cho mọi người — nó chỉ sống trên máy bạn.

## References

- [Pro Git 8.3: Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [githooks docs](https://git-scm.com/docs/githooks)
- [Husky](https://typicode.github.io/husky/)

## Học tiếp

Chúc mừng — bạn đã đi hết lộ trình Git & GitHub Beginner! Quay lại [bản đồ domain](../index.md) xem lộ trình chi tiết tiếp theo (roadmap.sh/git-github) hoặc ôn lại module còn lơ mơ.
