---
title: "Markdown — Ngôn ngữ viết của GitHub"
slug: "git-markdown"
summary: "Viết README thật cho task-board: cú pháp lõi 15 phút, GitHub Flavored Markdown (task list, table, collapse) và quy tắc xuống dòng hay gãy."
tags: ['markdown', 'github', 'documentation']
prerequisites: ['git-create-repository']
related: ['git-cli', 'git-git-hooks']
next: "git-git-hooks"
previous: "git-cli"
difficulty: beginner
read_time: "10 phút"
learning_outcomes:
  - Dùng thành thạo heading, list, link, bảng, code block có ngôn ngữ.
  - Áp dụng GFM: task list, @mention, auto-link issue, details.
  - Viết README chuẩn bốn phần cho một dự án thật.
knowledge_gap: "Xuống dòng đơn tưởng là đoạn mới — render dính thành một dòng dài bất tận."
---

# Markdown — Ngôn ngữ viết của GitHub

> **Bối cảnh:** Task-board sắp public (đã thêm license ở Module 03). An giao việc cuối cùng trước khi công bố: *"README giờ còn mỗi dòng 'task board app'. Viết lại đi — nó là trang chủ của dự án."*

## Vấn đề mà Markdown giải quyết

Mọi dự án cần văn bản sống cùng code: README, mô tả PR/Issue, tài liệu. Word/PDF không render trên web, không diff được. Markdown là định dạng **viết bằng text thuần nhưng hiển thị đẹp**: mọi file `.md` trên GitHub tự chuyển thành HTML.

## Cú pháp lõi qua chính README task-board

Đây là khung README bạn sẽ viết:

```markdown
# Task Board

Ứng dụng quản lý công việc nhóm: Kanban đơn giản với
kéo thả, lọc theo người thực hiện và xuất CSV.

**Cài đặt**

```bash
npm install
npm run dev
```

**Tính năng**

- Kéo thả sắp xếp thứ tự task
- Lọc theo assignee / trạng thái
- Xuất danh sách ra CSV

**Vấn đề?** Mở [issue mới](../../issues) kèm bước tái hiện.
```

Ba quy tắc hay gãy nhất:

1. **Xuống dòng đơn trong cùng đoạn dính liền** khi render — cần *dòng trống* để tách đoạn.
2. **Code block phải khai báo ngôn ngữ** (```bash, ```javascript...) để có tô màu; thiếu là thành khối chữ đen xì.
3. **Heading không nhảy cấp** (`#` → `###`) — vỡ mục lục tự động GitHub sinh ở góc phải.

## GitHub Flavored Markdown (GFM)

GitHub mở rộng chuẩn gốc bằng các tính năng dùng hằng ngày trong Issue/PR:

**Task list** — checklist tick được ngay trong PR (An dùng để duyệt checklist review):

```markdown
- [x] Thêm filter dropdown
- [x] Persist trạng thái vào URL
- [ ] Viết test cho edge case
```

**Auto-link & mention**: gõ `#12` thành link issue 12; `@an-dev` tag người nhận thông báo. Trong commit message cũng hoạt động — commit fix bug nên nhắc `Fixes #7` để GitHub tự đóng issue khi merge.

**Bảng so sánh** (như các bảng bạn thấy suốt khóa học):

```markdown
| Trạng thái | Ai chịu trách nhiệm |
|---|---|
| To do | — |
| In progress | Tên người đang làm |
```

**Collapse section** — giấu log dài trong bug report:

```markdown
<details>
<summary>Full stack trace</summary>

TypeError: cannot read properties of undefined...
</details>
```

## Cấu trúc README chuẩn bốn phần

Kết quả cuối cùng bạn commit lên repo (qua PR luôn — văn bản cũng phải review):

| Phần | Nội dung |
|---|---|
| Tiêu đề + một câu | Dự án làm gì, cho ai |
| Cài đặt | Lệnh chạy từ zero đến chạy được |
| Sử dụng | Ví dụ ngắn kèm screenshot/GIF nếu có UI |
| Đóng góp + License | Link CONTRIBUTING, loại license |

> [!TIP]
> README là **cửa vào**, không phải toàn bộ tài liệu. Chi tiết kiến trúc, API... tách sang thư mục `docs/` rồi link từ README.

## Sai lầm thường gặp

- Nhúng ảnh bằng đường dẫn máy cá nhân (`C:\Users\...\img.png`) — commit ảnh vào repo, tham chiếu đường dẫn tương đối `docs/screenshot.png`.
- README nghìn dòng — người đọc bỏ giữa chừng; tách bớt sang docs/.
- Quên cập nhật README khi lệnh cài đặt đổi — sai lệch docs còn nguy hiểm hơn thiếu docs.

## References

- [Basic writing and formatting syntax — GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [CommonMark spec](https://commonmark.org/)

## Học tiếp

[Git Hooks](git-hooks.md) — bài cuối: chặn lỗi ngay trên máy trước cả CI.
