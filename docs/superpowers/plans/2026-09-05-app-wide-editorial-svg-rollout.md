# Rollout editorial SVG toàn app — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redraw 135 Mermaid blocks còn lại thành inline SVG editorial (skill diagram-design, skin Knowledge OS), trang nào xong trang đó đẹp ngay, Mermaid runtime giữ nguyên cho trang chưa làm.

**Architecture:** Mỗi diagram = 2 file nguồn (`website/diagrams/<slug>-dark.html`, `<slug>.html`) + inline cả 2 SVG vào `*-content.js` trong khung `.dd-diagram` (CSS toggle sáng/tối đã có trong `style.css`), Mermaid gốc giữ trong comment fallback. Không đụng ảnh PNG tĩnh, không commit khi chưa được yêu cầu.

**Tech Stack:** Inline SVG thủ công (không lib), Mermaid extract IR (`mermaid_extract.py`), `self_check.py`, Node `--check`, CSS variables theo 6 themes.

**Spec:** skill `diagram-design` SKILL.md §0–§12 + style-guide đã onboard 2026-09-05 từ `website/style.css` (snapshot gốc `~/.diagram-design/profiles/default.md`). Đã kiểm chứng 2 lần: pilot ios-stack (1 diagram) + activity-overview (5 diagrams).

## Global Constraints

- Không commit khi chưa được yêu cầu — để working tree cho chủ repo duyệt.
- Mỗi SVG pass `self_check.py` + taste gate §9 + `node --check` file content.
- 6 themes: dark/glacier/catppuccin ↔ light/editorial/matcha qua `.dd-svg-dark/.dd-svg-light` (đã có trong `style.css`, không sửa).
- Không xóa Mermaid runtime, fallback comment, ảnh tĩnh trong đợt này.
- Label tiếng Việt giữ nguyên nghĩa kỹ thuật; audience engineer.
- Slug file nguồn: `<topic>-<kebab>[-n]`, dark thêm `-dark`; SVG id prefix theo slug file.

## File Map (đã chốt)

- Tạo: `website/diagrams/<slug>-dark.html`, `<slug>.html` (nguồn standalone).
- Tạo 1 lần: `tools/gen-dd-light.py` (swap dark→light, tái sinh byte-identical).
- Sửa: `website/android-content.js` (105 blocks còn lại), `ios-content.js` (11), `git-content.js` (13, escaped-quote), `flutter-content.js` (6).
- Không sửa: `app.js`, `style.css`, `*.png`, `skills-lock.json`.

## Phase 0 — Setup

- [ ] Task 0.1: lưu profile `knowledge-os` vào `~/.diagram-design/profiles/knowledge-os.md` (verb `save` theo `profiles.md`, đã được chủ repo đồng ý).
- [ ] Task 0.2: tạo `tools/gen-dd-light.py` từ bảng swap 19 cặp màu + `slug-dark-`→`slug-`; chạy tái sinh `act-*.html` + `ios-stack*.html`, `diff` phải rỗng.
- [ ] Task 0.3: map 105 blocks android còn lại vào topic (script in `block# → topicId + loại + nodes/edges`) → danh sách batch A1..A11 (~10 blocks/batch theo topic liền kề).

## Phase 1 — Android flowchart trong budget (batch A1–A7)

- [ ] Step 1: extract — `mermaid_extract.py` từng block, ghi IR.
- [ ] Step 2: chốt dials (format svg, size doc-inline/doc-wide, detail giữ nguyên, audience engineer), nêu trong tin nhắn.
- [ ] Step 3: vẽ `<slug>-dark.html` theo type-flowchart (oval đầu/cuối, diamond ≤3 exit, elbow r=8, focal 1 node, legend đáy, id prefix).
- [ ] Step 4: sinh light bằng `tools/gen-dd-light.py`, `self_check.py` cả 2 phải OK.
- [ ] Step 5: inline vào content file (khung `.dd-diagram` + fallback comment), `node --check` pass.
- [ ] Step 6 (chủ repo): mở trang kiểm tra bằng mắt → OK mới sang batch sau.

## Phase 2 — Android sequence (35 blocks, batch A8–A10)

- [ ] Đọc `references/type-sequence.md` trước batch đầu (skill bắt buộc).
- [ ] Cap ≤5 lifelines, ≤1 combined fragment; vượt → tách overview + detail + fidelity ledger.

## Phase 3 — Android over-budget + extractor-gap (batch A11–A12)

- [ ] 22 blocks >9 nodes/>12 edges (đầu bảng android#47 18n/14e): tách overview + detail.
- [ ] 9 blocks `malformed edge` (do `direction TB` + tiêu đề subgraph): dựng IR thủ công.

## Phase 4 — ios (11) + git (13) + flutter (6) (batch B1–B3)

- [ ] git dùng regex escaped-quote khi thay thế.

## Phase 5 — Đóng đợt (chưa làm, cần quyết định riêng)

- Xóa fallback comment / gỡ Mermaid runtime khi 100% chuyển xong.

## Rủi ro

1. Chữ tràn node — công thức width đã kiểm chứng + duyệt mắt mỗi batch; revert = `git checkout <file>`.
2. Diagram vượt budget — tách + ledger, không nhồi.
3. Mất toolbar zoom ở diagram đã chuyển — chấp nhận; ngoại lệ giữ Mermaid ghi rõ trong batch.
