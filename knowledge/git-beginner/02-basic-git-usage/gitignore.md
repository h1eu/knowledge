---
title: ".gitignore — Loại trừ file khỏi Git"
slug: "git-gitignore"
summary: "Viết .gitignore cho dự án sandbox: cú pháp pattern, bẫy kinh điển file đã track, và xử lý khẩn cấp khi secret lỡ vào commit."
tags: ['git', 'gitignore']
prerequisites: ['git-add']
related: ['git-init', 'git-commit']
next: "git-branches-merge"
previous: "git-reset-unstage"
difficulty: beginner
read_time: "9 phút"
learning_outcomes:
  - Viết .gitignore đúng cho một dự án Node.
  - Giải thích vì sao ignore không tác động lên file đã track, và cách gỡ bằng rm --cached.
  - Biết quy tắc sống còn: secret đã push coi như đã lộ.
knowledge_gap: "Thêm .gitignore sau khi đã commit .env tưởng là an toàn — lịch sử cũ vẫn giữ secret."
---

# .gitignore — Loại trừ file khỏi Git

> **Bối cảnh:** Dự án sandbox bắt đầu dùng npm → folder `node_modules/` nặng 40MB xuất hiện; bạn cũng tạo `.env` chứa `API_KEY=...` của dịch vụ drag-drop. An nhắn gấp: *"Đừng commit hai thứ đó. Viết .gitignore ngay."*

## Bước 1: Tạo .gitignore

Tạo file `.gitignore` ở thư mục gốc:

```text
# Dependencies — cài lại được bằng npm install
node_modules/

# Build output
dist/

# Secrets & môi trường
.env
.env.local

# Hệ điều hành / IDE
.DS_Store
.idea/
```

Kiểm tra hiệu lực:

```bash
git status
```

Output: `node_modules/`, `.env`, `.DS_Store` biến mất khỏi danh sách Untracked — Git giờ "mù" với chúng đúng như yêu cầu.

## Bước 2: Đọc cú pháp pattern

| Pattern | Ý nghĩa |
|---|---|
| `node_modules/` | Bỏ cả thư mục (dấu `/` cuối) |
| `*.log` | Mọi file đuôi .log ở mọi cấp |
| `debug?.txt` | `?` thay 1 ký tự bất kỳ |
| `build/**/temp` | temp ở mọi cấp con của build |
| `!.env.example` | Phủ định — vẫn track file này |

Git đọc từ trên xuống, dòng sau ghi đè dòng trước. Cặp `.env` + `!.env.example` là combo chuẩn: chặn secret thật nhưng vẫn chia sẻ *khung* cấu hình cho đồng đội.

## Bước 3: Hiểu bẫy kinh điển — file đã track thì ignore vô dụng

Thí nghiệm quan trọng nhất bài học:

```bash
echo "temp" > cache.log
git add cache.log && git commit -m "Add cache log"   # lỡ commit
echo "*.log" >> .gitignore                            # giờ mới ignore
git status
```

Output vẫn hiện `modified: cache.log` khi bạn sửa nó! Vì: **.gitignore chỉ áp dụng cho file chưa track**. File đã vào lịch sử thì ignore chỉ là lời hứa suông.

Xử lý đúng khi phát hiện commit nhầm:

```bash
git rm --cached cache.log     # gỡ khỏi index, GIỮ file trên đĩa
git add .gitignore
git commit -m "Stop tracking cache.log and ignore logs"
```

## Secret đã push lên GitHub thì sao?

Quy trình xử lý khẩn cấp đủ sâu để có bài riêng — [Lộ secret: xử lý khẩn cấp](../03-collaboration/security-secrets.md). Ghi nhớ nguyên tắc trước: **xóa file ở commit mới KHÔNG xóa nó khỏi lịch sử cũ**; key từng lộ phải rotate (đổi) ngay lập tức.

## Bước 4: Không tự viết từ đầu

GitHub duy trì bộ mẫu theo ngôn ngữ tại [github.com/github/gitignore](https://github.com/github/gitignore) (Node.gitignore, Python.gitignore...). Khi tạo repo trên web cũng có ô chọn sẵn. Copy mẫu về rồi thêm phần riêng của dự án — đừng tự chế.

## Sai lầm thường gặp

- Thêm ignore mà quên `rm --cached` với file đang track → tưởng không ăn.
- Commit `.env` "tạm thời để đồng đội chạy được" → dùng `.env.example` chứa tên biến, bỏ giá trị thật.
- Quên `/` cuối với thư mục → pattern thành tên file trùng hợp ngẫu nhiên nào đó.

## References

- [Pro Git 2.2: Ignoring Files](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository#_ignoring)
- [gitignore docs + template chính thức](https://git-scm.com/docs/gitignore)

## Học tiếp

[Branch — Tạo và Merge nhánh](branches-merge.md): nhiệm vụ mới từ An — làm tính năng drag-drop mà không được đụng code chính.
