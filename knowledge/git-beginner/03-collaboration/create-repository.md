---
title: "Tạo Repository trên GitHub"
slug: "git-create-repository"
summary: "Nhìn lại việc An đã làm khi dựng repo task-board: các lựa chọn khởi tạo, public vs private, và ba cách bắt đầu một dự án."
tags: ['github', 'repository']
prerequisites: ['git-github-account', 'git-init']
related: ['git-remote-push', 'git-fork-clone']
next: "git-remote-push"
previous: "git-branches-merge"
difficulty: beginner
read_time: "7 phút"
learning_outcomes:
  - Tạo repository với README/.gitignore/license phù hợp ngay từ đầu.
  - Chọn đúng public/private và hiểu giới hạn bảo mật của private.
  - Nối repo local có sẵn lên GitHub không sinh lịch sử song song.
knowledge_gap: "Để GitHub tự sinh commit rồi init local riêng → hai lịch sử không liên quan, push đầu tiên bị từ chối."
---

# Tạo Repository trên GitHub

> **Bối cảnh:** Quay ngược thời gian một chút: hôm qua, trước khi mời bạn, An đã bấm "Create repository" cho `task-board`. Hiểu những gì An đã chọn giúp bạn tự dựng repo đúng chuẩn khi đến lượt mình dẫn dắt dự án.

## Repository trên GitHub chứa gì?

Không chỉ code — đó là **trụ sở dự án**:

| Thành phần | Vai trò |
|---|---|
| Code + lịch sử Git | Bản sao remote đồng bộ với máy mọi người |
| README | Trang chủ hiển thị mặc định |
| Issues | Danh sách bug/task (An dùng để giao việc) |
| Pull Requests | Hàng đợi review (bạn sẽ dùng liên tục ở bài sau) |

Phân biệt vai trò: **local repo** trên máy bạn là nơi commit diễn ra; **remote repo** trên GitHub là nơi đồng bộ + cộng tác. Hai bên nối nhau qua `git remote` — bài kế tiếp.

## Các lựa chọn khi Create repository

Những gì An đã tick và lý do:

- **Name**: `task-board` — ngắn, chữ thường, gạch nối. Đổi tên sau gây vỡ link nên phải nghĩ kỹ từ đầu.
- **Visibility**: `Private` trong giai đoạn đầu (code công ty), chuyển Public sau nếu mở nguồn.
- **Add a README**: có — trang giới thiệu ngay lập tức.
- **Add .gitignore**: chọn template Node — chặn sẵn `node_modules/`.
- **Choose a license**: bỏ trống lúc đầu (repo private chưa cần); sẽ thêm khi mở nguồn (bài OSS Licenses).
- **KHÔNG** thêm commit nào khác ngoài README — lý do ở phần ba kịch bản dưới đây.

Sau khi tạo xong, An vào Settings → Collaborators → mời username của bạn. Từ lúc này bạn có quyền clone và push (chi tiết quyền xem bài Fork vs Clone).

## Public hay Private?

| Tiêu chí | Public | Private |
|---|---|---|
| Ai thấy | Mọi người | Bạn + collaborator |
| Phù hợp | Open source, portfolio | Code công ty, dự án chưa chín |
| Nhận đóng góp cộng đồng | Có | Không |

> [!WARNING]
> Private **không phải** cơ chế bảo mật cho secret. `.env` lỡ push vào repo private vẫn coi như lộ với bất kỳ ai có access (và cả hệ thống CI). Quy tắc: secret không bao giờ được commit, bất kể visibility.

## Ba kịch bản bắt đầu dự án

**1. Repo đã có trên GitHub (trường hợp của bạn với `task-board`):**

```bash
git clone git@github.com:an-dev/task-board.git
```

**2. Có code local sẵn, nối lên GitHub:**

```bash
cd my-project
git init
git remote add origin git@github.com:you/my-project.git
git push -u origin main
```

**3. Tạo repo trên web nhưng local cũng đã có lịch sử riêng:** đừng để GitHub sinh README — hai dòng lịch sử không liên quan nhau sẽ khiến lần push đầu tiên bị từ chối (non-fast-forward). Một phía phải trống.

## Sai lầm thường gặp

- Đặt tên kiểu `test123` rồi đổi sau → vỡ mọi link tài liệu đang trỏ tới.
- Tick README khi local đã có commit → conflict ngay lần push đầu.
- Coi private là chỗ an toàn cho secret → đọc lại Warning phía trên.

## References

- [GitHub Docs: Creating a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
- [GitHub Docs: Repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility)

## Học tiếp

[Remote & Push](remote-push.md) — nối sandbox của bạn lên GitHub, học cơ chế đồng bộ hai chiều trước khi chạm repo team.
