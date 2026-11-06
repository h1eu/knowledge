---
description: Thông tin nền về công nghệ được sử dụng trong dự án.
---

# Context: Tech Stack

## Giới thiệu

Tài liệu này mô tả các công nghệ hiện đang được sử dụng để xây dựng và vận hành Knowledge OS.

Đây là thông tin tham khảo, có thể thay đổi theo thời gian mà không ảnh hưởng đến kiến trúc tri thức của dự án. Khi đổi công cụ thật, cập nhật tài liệu này trong cùng thay đổi.

## Định dạng nội dung

- Markdown (GitHub Flavored Markdown) với frontmatter YAML. Không dùng MDX.
- Sơ đồ nguồn: Mermaid trong Markdown.
- Mục lục: `map/<domain>_mkdocs.yml` (định dạng nav của MkDocs, dùng làm mục lục; repo không build bằng MkDocs).

## Quản lý phiên bản

- Git. Commit trên branch riêng, merge vào `main` khi được duyệt.
- Pre-commit hook: `git config core.hooksPath tools/githooks`, chạy `tools/check_content_escapes.js`.

## Nền tảng hiển thị

- Website tĩnh HTML/CSS/JS thuần trong `website/`, không framework, không bước build.
- Mỗi domain một trang (`android.html`, `dsa.html`…) và một hoặc nhiều file nội dung `<domain>-content*.js`. Sidebar ở `KNOWLEDGE_DATA` trong `website/app.js`.
- Sơ đồ hiển thị: SVG vẽ tay trong `website/diagrams/` (skill `.agents/skills/diagram-design`, bản light sinh bằng `tools/gen-dd-light.py`); sơ đồ tương tác Archify trong `website/archify/` (skill cục bộ `.claude/skills/archify`).
- Deploy: GitHub Actions `.github/workflows/static.yml` chạy `check_content_escapes.js` rồi đưa thư mục `website/` lên GitHub Pages khi push `main`.

## Công cụ hỗ trợ (`tools/`)

| Việc | Công cụ |
|---|---|
| Sinh nội dung website | `gen_git_content.js`, `gen_oodp_content.js` |
| Đồng bộ Markdown → website | `sync_android_session.js` (Android), `sync_leetcode.py` (metadata LeetCode) |
| Kiểm tra | `verify-android-topics.js`, `verify-ios-topics.js`, `verify-chapters.js` (DSA), `verify_leetcode_sync.py`, `check_content_escapes.js` |
| Kiểm tra trang chạy thật | Puppeteer (có sẵn trong `node_modules`) |

Script Node chỉ dùng thư viện lõi của Node trừ khi ghi rõ; script Python chạy bằng `python3`.

## AI Agent

- Claude Code: `CLAUDE.md`, lệnh trong `.claude/commands/`, skill trong `.claude/skills/`.
- OpenCode: `opencode.json`.
- Cả hai đọc chung rule, workflow, template, playbook trong `.agents/`.
