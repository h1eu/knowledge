---
title: "git reset — Rút thay đổi khỏi Staging"
slug: "git-reset-unstage"
summary: "Lỡ add nhầm file ghi chú cá nhân: unstage an toàn bằng git restore --staged, bảng phân biệt soft/mixed/hard và vùng nguy hiểm của --hard."
tags: ['git', 'reset', 'restore', 'staging']
prerequisites: ['git-commit']
related: ['git-add', 'git-revert-hard-reset']
next: "git-gitignore"
previous: "git-commit"
difficulty: beginner
read_time: "9 phút"
learning_outcomes:
  - Unstage file bằng git restore --staged không mất code.
  - Tra bảng soft/mixed/hard để chọn đúng chế độ.
  - Gọi tên tình huống duy nhất khiến --hard nguy hiểm.
knowledge_gap: "Nhầm restore --staged (chỉ unstage) với restore thường (xóa luôn sửa đổi trong thư mục)."
---

# git reset — Rút thay đổi khỏi Staging

> **Bối cảnh:** Bạn vừa `git add .` cho gọn — rồi nhớ ra folder có `notes.txt` chứa ghi chú lương thưởng cá nhân. Tuyệt đối không được vào commit. Cần rút nó ra **mà không mất nội dung**.

## Bước 1: Xác nhận tình trạng

```bash
git status
```

Output (rút gọn):

```text
Changes to be committed:
        new file:   index.html
        new file:   notes.txt      <- kẻ xâm nhập
```

## Bước 2: Unstage bằng git restore --staged

```bash
git restore --staged notes.txt
```

Output: im lặng (thành công). Kiểm tra lại:

```bash
git status
```

```text
Changes to be committed:
        new file:   index.html

Untracked files:
        notes.txt
```

`notes.txt` rời staging, trở về untracked — **nội dung file vẫn nguyên trên đĩa**. Commit tiếp theo sẽ không còn dấu vết của nó.

Cú pháp cũ tương đương vẫn gặp trong tài liệu cũ: `git reset HEAD notes.txt`. Hãy dùng `restore --staged` — tên lệnh mô tả đúng hành động.

> [!WARNING]
> Phân biệt hai anh em dễ nhầm nhất với người mới:
>
> | Lệnh | Tác động |
> |---|---|
> | `git restore --staged <file>` | Chỉ kéo ra khỏi staging, giữ sửa đổi |
> | `git restore <file>` | **Xóa luôn sửa đổi**, trả file về commit cuối |

## Bước 3: Hiểu git reset đầy đủ — ba chế độ

`git restore --staged` thực chất là bản chuyên biệt hóa của `git reset`. Khi cần gỡ cả **commit** (không chỉ file), reset hiện đủ ba mức:

Giả sử đang ở commit C3, muốn quay về C2:

| Chế độ | HEAD | Staging | Working Directory |
|---|---|---|---|
| `--soft` | về C2 | giữ C3 | giữ C3 |
| `--mixed` (mặc định) | về C2 | xóa theo C2 | giữ C3 |
| `--hard` | về C2 | xóa theo C2 | **xóa theo C2** |

```bash
git reset --soft HEAD~1    # gỡ commit cuối; code vẫn staged, sửa message rồi commit lại
git reset --mixed HEAD~1   # gỡ commit + unstage; code còn nguyên trong thư mục
git reset --hard HEAD~1    # gỡ commit VÀ xóa sạch thay đổi — đọc cảnh báo dưới trước!
```

`HEAD~1` nghĩa là "commit ngay trước commit hiện tại".

> [!WARNING]
> `--hard` là chế độ duy nhất phá hủy công việc chưa commit. Trước khi chạy bất kỳ lệnh nào chứa `--hard`: mọi thứ quý giá phải đã commit hoặc stash. Và nếu lỡ tay rồi — đừng hoảng, Module 04 có bài riêng cứu hộ bằng reflog.

## Khi nào dùng gì — cheat sheet

| Tình huống | Lệnh |
|---|---|
| Add nhầm file, muốn chọn lại staging | `git restore --staged <file>` |
| Commit cuối viết tách chưa đẹp, muốn làm lại | `reset --soft HEAD~1` |
| Muốn bỏ hẳn thử nghiệm sai cục bộ | `reset --hard` sau khi cân nhắc |
| Viết lại lịch sử đã push lên chung | KHÔNG dùng reset — xem bài Revert ở Module 04 |

## Sai lầm thường gặp

- Chạy nhầm `git restore <file>` (thiếu `--staged`) → mất trắng công sửa trong ngày.
- `reset --hard` trên branch đã push rồi force push đè → lịch sử team vỡ.
- Sợ reset vì tưởng nó xóa code — mặc định `--mixed` không mất một dòng nào.

## References

- [Pro Git 2.4: Undoing Things](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things)
- [git-restore docs](https://git-scm.com/docs/git-restore)

## Học tiếp

[.gitignore — Loại trừ file khỏi Git](gitignore.md): cách chặn vĩnh viễn để `notes.txt`, `.env` không bao giờ lọt vào staging.
