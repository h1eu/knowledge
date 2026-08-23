---
title: "Lộ secret — Xử lý khẩn cấp & phòng ngừa"
slug: "git-security-secrets"
summary: ".env của bạn lỡ push lên GitHub: quy trình xử lý 4 bước theo đúng thứ tự (revoke trước, dọn lịch sử sau), công cụ quét secret và thói quen phòng bệnh."
tags: ['security', 'secrets', 'github', 'incident']
prerequisites: ['git-gitignore', 'git-remote-push']
related: ['git-gitignore', 'git-revert-hard-reset']
next: "git-revert-hard-reset"
previous: "git-oss-licenses"
difficulty: beginner
read_time: "11 phút"
learning_outcomes:
  - Thực hiện đúng thứ tự xử lý khi lộ secret: revoke → rotate → dọn code → dọn lịch sử.
  - Hiểu vì sao xóa file ở commit mới không xóa được secret khỏi lịch sử.
  - Thiết lập phòng ngừa: .env.example, secret scanning, gitleaks pre-commit.
knowledge_gap: "Xóa .env ở commit mới rồi tưởng đã an toàn — key cũ vẫn nằm trong lịch sử và các bản fork/clone."
---

# Lộ secret — Xử lý khẩn cấp & phòng ngừa

> **Bối cảnh:** Sự cố thật đầu tiên của bạn: trong lúc vội, bạn `git add .` rồi push — `.env` chứa `STRIPE_KEY=sk_live_...` bay lên repo public của task-board. Chi nhắn ngay trong 2 phút: *"Thấy key của mày trên GitHub kìa."*

## Nguyên tắc số một: coi như đã lộ

Ngay khi secret xuất hiện trên GitHub public (thậm chí private có nhiều người access), hãy giả định **bot thu thập key đã quét được trong vài phút**. Mọi bước khác đều xếp sau hai việc:

> [!WARNING]
> Thứ tự xử lý sai phổ biến nhất là dọn git trước, revoke sau. Revoke/rotate phải là việc ĐẦU TIÊN — dọn repo không vô hiệu hóa key đã bị sao chép.

## Quy trình 4 bước đúng thứ tự

**Bước 1 — Revoke/rotate key NGAY LẬP TỨC** (trang dashboard nhà cung cấp): Stripe → Developers → API keys → Roll. Key mới sinh ra, key cũ chết. Việc này độc lập với Git.

**Bước 2 — Dọn code hiện tại:** xóa `.env` khỏi thư mục làm việc nếu cần, thêm vào `.gitignore` (nếu chưa), thay bằng `.env.example` chỉ chứa tên biến:

```text
# .env.example — copy thành .env và điền giá trị thật
STRIPE_KEY=
DATABASE_URL=
```

```bash
git add .env.example .gitignore
git rm --cached .env        # gỡ khỏi index, giữ file cục bộ
git commit -m "Remove leaked credentials from tracking"
```

**Bước 3 — Dọn lịch sử** (chỉ sau bước 1): file vẫn nằm trong commit cũ — ai clone đủ sâu vẫn đọc được. Công cụ chính thức:

```bash
git filter-repo --path .env --invert-paths
```

(`git filter-repo` viết lại toàn bộ lịch sử loại bỏ file; team cần force-push đồng loạt + mọi người re-clone. Với task-board, An thực hiện và thông báo cả nhóm.)

**Bước 4 — Rà soát thiệt hại:** kiểm tra log sử dụng key trên dashboard xem có request lạ giữa thời điểm lộ và revoke không.

## Phòng ngừa — để sự cố không lặp lại

**1. Secret scanning của GitHub**: Settings → Code security → bật Secret scanning. GitHub tự phát hiện pattern key của AWS/Stripe... và cảnh báo.

**2. Chặn từ cửa staging — gitleaks pre-commit:**

```bash
# quét staged changes trước mỗi commit
gitleaks protect --staged
```

Gắn vào hook (chi tiết cơ chế hook ở bài Git Hooks, Module 05) thì commit chứa key bị chặn ngay trên máy.

**3. Thói quen add có chủ đích**: `git add <file-cụ-thể>` thay vì `git add .` — chính là bài học từ Module 02. `add .` trong lúc vội là cổng vào của 90% sự cố lộ secret.

**4. Ký commit với GPG / SSH signing** (nâng cao, tùy chọn): xác minh tác giả thật của commit — tránh ai đó giả mạo tên bạn đẩy code. Cấu hình qua [GitHub Docs: Commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification).

## Sai lầm thường gặp

- Rotate xong nhưng quên key nằm ở **fork, clone của đồng nghiệp, CI variable** — rà hết các nơi lưu trữ.
- Tưởng private repo là chỗ kín — secret trong private vẫn lộ khi repo chuyển public hoặc member rời đi mang theo clone.
- Xử lý xong không viết postmortem ngắn cho team — cùng một bẫy sẽ tái diễn với người khác.

## References

- [GitHub Docs: Secret scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)
- [gitleaks](https://github.com/gitleaks/gitleaks)
- [Pro Git 7.x: Rewriting History](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)

## Học tiếp

Sự cố khép lại. Sang [Module 04](../04-more-git/index.md) với [Revert & Hard Reset](../04-more-git/revert-hard-reset.md) — hộp công cụ hoàn tác mà An dùng để dọn lịch sử.
