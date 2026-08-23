---
title: "Module 01: Version Control Foundations"
slug: "git-basics-index"
summary: "Ngày đầu onboard: hiểu trong 15 phút VCS giải quyết vấn đề gì, cài Git, cấu hình định danh và kết nối GitHub bằng SSH — đủ để bắt đầu Module 02."
tags: ['git', 'github', 'vcs', 'foundations']
difficulty: beginner
read_time: "5 phút"
learning_outcomes:
  - Giải thích được Git khác GitHub bằng một câu.
  - Cài đặt Git và cấu hình định danh thành công trên máy cá nhân.
  - Kết nối máy với GitHub bằng SSH key.
knowledge_gap: "Người mới thường học thuộc lệnh mà không hiểu ba vùng trạng thái — gốc rễ của mọi bối rối sau này."
---

# Module 01: Version Control Foundations

**Bối cảnh:** Hôm nay là ngày đầu bạn vào team `task-board`. An gửi cho bạn link repo và nói: *"Cài Git đi, xong nhắn mình cái SSH key."* Module này giúp bạn hoàn thành đúng hai việc đó — và hiểu vừa đủ để không bỡ ngỡ ở các module sau.

## Nội dung module

1. [Version Control System là gì?](version-control-systems.md) — vấn đề nó giải quyết, trong 10 phút đọc.
2. [Git là gì & vì sao nên dùng?](what-is-git.md) — kèm mô hình 3 vùng trạng thái dùng xuyên suốt khóa học.
3. [Cài đặt Git](install-git.md) — từng bước theo hệ điều hành, có output đối chiếu.
4. [Tạo tài khoản GitHub](github-account.md) — đăng ký, thiết lập SSH key, xác thực thành công.

## Tiêu chí hoàn thành

- Chạy được `git --version` và `git config --list` thấy đúng thông tin của mình.
- Chạy được `ssh -T git@github.com` và nhận lời chào xác thực thành công.

## Học tiếp

Hoàn thành xong, chuyển sang [Module 02: Basic Git Usage](../02-basic-git-usage/index.md) — nơi bạn nhận task đầu tiên: khởi tạo repo và commit đầu tiên.

## References

- [Pro Git book (official)](https://git-scm.com/book/en/v2) — chương 1 & 2
- [GitHub Docs: Connecting with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
