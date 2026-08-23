---
title: "git add — Đưa thay đổi vào Staging"
slug: "git-add"
summary: "Đưa file đầu tiên qua cửa staging: vì sao Git cần bước trung gian, output git status trước/sau khi add, và quy tắc 'add lại nếu sửa tiếp'."
tags: ['git', 'add', 'staging']
prerequisites: ['git-init', 'git-what-is-git']
related: ['git-commit', 'git-reset-unstage']
next: "git-commit"
previous: "git-init"
difficulty: beginner
read_time: "8 phút"
learning_outcomes:
  - Đọc được git status phân biệt untracked / unstaged / staged.
  - Dùng git add cho một file, nhiều file, và -p từng phần.
  - Nhớ quy tắc: add chụp nội dung tại thời điểm đó.
knowledge_gap: "Sửa tiếp sau khi add mà không add lại → commit thiếu thay đổi, lỗi lặp lại hàng ngày của người mới."
---

# git add — Đưa thay đổi vào Staging

> **Bối cảnh:** Bạn vừa sửa `index.html` (thêm khối task mới) và chỉnh `styles.css` cho khối đó. Chạy thử `git commit` — Git từ chối:

```text
nothing added to commit but untracked files present
```

Vì sao? Vì thay đổi chưa đi qua cửa trung gian: **Staging Area**.

## Vì sao cần cửa trung gian?

Một commit tốt chứa **những thay đổi liên quan với nhau**. Buổi làm việc thật bạn thường sửa lung tung: fix bug A, chỉnh typo, thêm log debug. Staging là bàn chọn món — bạn quyết định *đúng những gì* đi vào commit sắp tới, phần còn lại chờ lần sau. Đây là lý do lịch sử dự án có thể sạch thay vì một đống "update lung tung".

## Bước 1: Xem trạng thái trước khi add

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
```

Màu đỏ (terminal thật) = **Untracked**: Git thấy file nhưng chưa quản lý nội dung.

## Bước 2: Add từng file theo nhóm ý nghĩa

Bạn muốn tách hai việc thành hai commit: cấu trúc HTML trước, style sau. Add riêng từng file:

```bash
git add index.html
```

Kiểm tra lại:

```bash
git status
```

Output:

```text
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   index.html

Untracked files:
        styles.css
```

`index.html` chuyển sang mục xanh **Changes to be committed** — nó đã ở Staging Area. `styles.css` vẫn đứng ngoài.

## Bước 3: Các biến thể hay dùng

```bash
git add styles.css      # thêm tiếp file thứ hai
git add .               # mọi thay đổi từ thư mục hiện hành xuống
git add -p              # chọn tương tác từng đoạn (hunk) trong file
```

`-p` đáng giá khi một file chứa cả thay đổi muốn commit và cả log debug muốn bỏ lại: Git hỏi `Stage this hunk [y,n,q,a,d]?` cho từng đoạn, bạn trả lời y/n.

## Quy tắc vàng: add chụp ảnh tại thời điểm đó

Thí nghiệm 60 giây:

```bash
echo "<!-- draft -->" >> index.html   # sửa tiếp SAU khi đã add
git status
```

Output sẽ hiện `index.html` ở **cả hai** mục: bản cũ staged (xanh) + bản sửa mới unstaged (đỏ). Commit lúc này chỉ lấy bản cũ. Phải `git add index.html` lần nữa để cập nhật.

> [!TIP]
> Thói quen an toàn: chạy `git status` ngay trước mỗi lần commit. Nó là màn hình tổng hợp duy nhất nói cho bạn biết điều gì sẽ vào commit.

## Sai lầm thường gặp

- Sửa tiếp rồi quên add lại → commit thiếu code, đồng đội pull về bị lỗi.
- Gõ `git add .` từ nhầm thư mục (vd home) → kéo cả hệ thống vào staging; luôn kiểm tra `pwd` trước.
- Nhầm ba cờ: `-A` toàn repo, `.` thư mục hiện hành, `-u` chỉ file đã track (bỏ qua file mới).

## References

- [Pro Git 2.2: Recording Changes](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
- [git-add docs](https://git-scm.com/docs/git-add)

## Học tiếp

[git commit — Ghi snapshot vào lịch sử](git-commit.md): hai file đã sẵn sàng trên bàn chọn món.
