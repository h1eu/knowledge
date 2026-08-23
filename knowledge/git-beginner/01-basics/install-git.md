---
title: "Cài đặt Git"
slug: "git-install-git"
summary: "Cài Git theo hệ điều hành, cấu hình user.name/user.email đúng email GitHub, kiểm tra bằng output thật — nhiệm vụ đầu tiên ngày onboard."
tags: ['git', 'install', 'setup']
prerequisites: ['git-what-is-git']
related: ['git-github-account', 'git-init']
next: "git-github-account"
previous: "git-what-is-git"
difficulty: beginner
read_time: "7 phút"
learning_outcomes:
  - Cài Git và xác nhận bằng git --version.
  - Cấu hình user.name / user.email khớp email tài khoản GitHub.
  - Đặt branch mặc định là main và trình soạn thảo commit.
knowledge_gap: "Email cấu hình lệch email GitHub — commit vẫn chạy nhưng contribution graph không tính công của bạn."
---

# Cài đặt Git

> **Bối cảnh:** Task đầu tiên An giao: *"Cài Git, cấu hình định danh dùng email công ty, xong gửi mình output `git config --list` để check."* Làm đúng bài này là hoàn thành task.

## Bước 1: Cài đặt theo hệ điều hành

### macOS

```bash
brew install git
```

### Windows

Tải tại [git-scm.com/downloads/win](https://git-scm.com/downloads/win), giữ nguyên tùy chọn mặc định. Trình cài kèm **Git Bash** — hãy dùng nó cho mọi bài trong khóa học để output thống nhất.

### Linux (Ubuntu/Debian)

```bash
sudo apt install git
```

### Kiểm tra cài đặt

```bash
git --version
```

Output mong đợi:

```text
git version 2.46.0
```

Thấy số phiên bản là thành công. Nếu báo `command not found`, cài chưa ăn — khởi động lại terminal rồi thử lại.

## Bước 2: Cấu hình định danh bắt buộc

Mỗi commit được gắn tên + email tác giả. Chưa khai báo thì commit đầu tiên sẽ bị từ chối:

```bash
git config --global user.name "Hazu Nguyen"
git config --global user.email "hazu@congty.vn"
```

Hai điểm hiểu đúng:

- **Email nên trùng email tài khoản GitHub** để commits được tính vào contribution graph của bạn.
- `--global` áp cho mọi repo trên máy. Repo riêng cần email khác (vd dự án open source dùng email cá nhân): chạy lại lệnh **không có** `--global` ngay trong repo đó.

## Bước 3: Hai cấu hình nên đặt ngay

```bash
git config --global init.defaultBranch main
git config --global core.editor "code --wait"
```

- Dòng 1: branch mặc định là `main` thay vì `master` cũ — khớp quy ước GitHub hiện nay.
- Dòng 2: VS Code làm trình soạn thảo commit message.

## Bước 4: Kiểm tra toàn bộ (gửi An)

```bash
git config --list --global
```

Output mong đợi:

```text
user.name=Hazu Nguyen
user.email=hazu@congty.vn
init.defaultbranch=main
core.editor=code --wait
```

## Sai lầm thường gặp

- Quên bước 2 → commit đầu tiên bị từ chối với lỗi `Please tell me who you are`. Đọc message, chạy lại lệnh config là xong.
- Gõ thiếu `--global` rồi tưởng cấu hình không ăn — không có flag thì chỉ áp dụng repo hiện tại.
- Windows dùng CMD thay Git Bash — nhiều ví dụ sau này (SSH, đường dẫn `~`) sẽ lệch.

## References

- [Pro Git 1.5: First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
- [Git config docs](https://git-scm.com/docs/git-config)

## Học tiếp

[Tạo tài khoản GitHub](github-account.md) — đăng ký tài khoản và thiết lập SSH key để máy nói chuyện được với GitHub.
