---
title: "Tạo tài khoản GitHub & kết nối SSH"
slug: "git-github-account"
summary: "Đăng ký GitHub, sinh SSH key, đăng public key và xác thực thành công — bước cuối của ngày onboard trước khi chạm vào repo thật."
tags: ['github', 'account', 'ssh']
prerequisites: ['git-what-is-git']
related: ['git-create-repository', 'git-remote-push']
next: "git-init"
previous: "git-install-git"
difficulty: beginner
read_time: "9 phút"
learning_outcomes:
  - Tạo tài khoản GitHub với username chuyên nghiệp.
  - Sinh và đăng SSH key, xác thực bằng ssh -T.
  - Hiểu vì sao private key không bao giờ rời máy.
knowledge_gap: "Đăng key xong vẫn clone bằng HTTPS nên cứ bị hỏi mật khẩu — cần dùng đúng URL dạng SSH."
---

# Tạo tài khoản GitHub & kết nối SSH

> **Bối cảnh:** An nhắn: *"Xong Git chưa? Gửi mình username GitHub để mời vào repo `task-board`."* Bài này giúp bạn có tài khoản + SSH key hoạt động trong 10 phút.

## Vì sao cần GitHub khi Git chạy local được?

Git quản lý phiên bản trên **một máy**. Ba nhu cầu buộc phải có remote (nơi chứa repo trên mạng):

1. **Backup** ngoài ổ cứng cá nhân — máy hỏng không mất lịch sử.
2. **Chia sẻ** repo cho đồng nghiệp (An sẽ mời bạn vào `task-board`).
3. **Cộng tác**: Pull Request, review, CI — tất cả diễn ra trên nền tảng như GitHub.

## Bước 1: Đăng ký

1. Vào [github.com](https://github.com) → Sign up → xác nhận email.
2. Chọn username cẩn thận: nó nằm trong URL (`github.com/username/repo`) và là một phần portfolio nghề nghiệp. Dùng tên ngắn, dễ đọc, chuyên nghiệp.

## Bước 2: Sinh SSH key trên máy

```bash
ssh-keygen -t ed25519 -C "hazu@congty.vn"
```

Nhấn Enter ba lần (chấp nhận đường dẫn mặc định, bỏ passphrase khi mới học). Output mong đợi:

```text
Generating public/private ed25519 key pair.
Your identification has been saved in /Users/you/.ssh/id_ed25519
Your public key has been saved in /Users/you/.ssh/id_ed25519.pub
```

Hai file được tạo:

- `id_ed25519` — **private key**: giữ trên máy, tuyệt đối không gửi ai, không commit.
- `id_ed25519.pub` — **public key**: đây mới là thứ đăng lên GitHub.

## Bước 3: Đăng public key lên GitHub

Copy nội dung public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Output dạng:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... hazu@congty.vn
```

Trên GitHub: **Settings → SSH and GPG keys → New SSH key** → dán toàn bộ dòng trên → Add.

## Bước 4: Xác thực

```bash
ssh -T git@github.com
```

Lần đầu sẽ hỏi fingerprint — gõ `yes`. Output mong đợi:

```text
Hi hazu! You've successfully authenticated, but GitHub does not provide shell access.
```

Thấy lời chào `Hi <username>!` là xong nhiệm vụ ngày onboard. Nhắn username cho An để được mời vào repo.

## Quy ước URL: SSH vs HTTPS

| URL | Khi nào dùng |
|---|---|
| `git@github.com:user/repo.git` | Đã setup SSH (trường hợp của bạn) |
| `https://github.com/user/repo.git` | Máy chưa có key; sẽ hỏi token mỗi lần |

Sau này clone repo `task-board`, nhớ dùng **dạng SSH** thì push/pull mới không hỏi mật khẩu.

## Sai lầm thường gặp

- Đăng nhầm **private** key (file không có `.pub`) lên GitHub — vô hiệu hóa cơ chế bảo mật; nếu lỡ tay, sinh lại cặp key mới ngay.
- Đăng key xong vẫn clone bằng URL HTTPS → cứ bị hỏi mật khẩu. Kiểm tra remote bằng `git remote -v`, sửa bằng `git remote set-url`.
- Bỏ qua xác thực email → commits không hiện avatar, contribution graph trống.

## References

- [GitHub Docs: Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Pro Git 4.3: Generating Your SSH Public Key](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key)

## Học tiếp

Hoàn thành ngày onboard! Chuyển sang [Module 02](../02-basic-git-usage/index.md): bài đầu tiên là [git init — Khởi tạo Repository](../02-basic-git-usage/git-init.md).
