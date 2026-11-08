---
description: Quy trình tạo mới một Diagram minh họa cho một Topic.
---

# Workflow: Create Diagram

## Mục đích

Định nghĩa quy trình tạo một Diagram nhằm hỗ trợ trực quan hóa kiến thức cho một Topic.

## Khi nào sử dụng

- Khi một Topic có kiến trúc, luồng xử lý hoặc vòng đời cần trực quan hóa.
- Khi nội dung dạng văn bản khó truyền tải mối quan hệ giữa các thành phần.
- Khi cần cập nhật lại một Diagram đã lỗi thời.

## Input

- Topic cần minh họa.
- Nội dung Lesson liên quan (nếu đã có).
- Loại quan hệ hoặc luồng cần thể hiện (kiến trúc, tuần tự, trạng thái, luồng dữ liệu...).

## Output

- Một file Diagram mới theo đúng cấu trúc trong Template Diagram.
- Diagram được liên kết với Topic tương ứng.

## Các bước thực hiện

1. Xác định Topic cần Diagram.
2. Xác định loại Diagram phù hợp (Flowchart, Sequence, State, Architecture...).
3. Xác định các thành phần chính cần thể hiện.
4. Xác định mối quan hệ giữa các thành phần.
5. Áp dụng Template Diagram để tạo cấu trúc file.
6. Xây dựng Diagram bằng Mermaid trong Markdown (nguồn gốc). Website render Mermaid bằng JS nên mặc định không cần làm gì thêm. Chỉ với sơ đồ tổng quan ít thay đổi (rule 05) mới vẽ lại thành SVG bằng skill `.agents/skills/diagram-design` (theo `references/import-mermaid.md`, viewBox rộng 800, cấu trúc file như `website/diagrams/act-data-dark.html`): ghi `website/diagrams/<slug>-dark.html`, sinh bản light bằng `python3 tools/gen-dd-light.py website/diagrams/<slug>-dark.html`, kiểm tra bằng `python3 .agents/skills/diagram-design/scripts/self_check.py`. Đặt `<!-- dd: <slug> -->` ngay sau khối Mermaid, và trong content JS thay `<div class="mermaid">` bằng khối `<div class="dd-diagram" data-dd="<slug>">` chứa SVG dark (`dd-svg dd-svg-dark`) và light (`dd-svg dd-svg-light`).
7. Nếu sơ đồ có nhiều bước hoặc nhiều thành phần mà người đọc cần lần theo, làm thêm bản tương tác bằng Archify (xem mục bên dưới).
8. Đối chiếu Diagram với nội dung Lesson để đảm bảo không mâu thuẫn.
9. Liên kết Diagram với Topic tương ứng.
10. Bàn giao để con người xác nhận.

## Bản tương tác bằng Archify

Archify là skill cài cục bộ tại `.claude/skills/archify` (v3.2.0, không commit). Nếu chưa có, cài lại bằng cách lấy thư mục `archify/` từ tag `v3.2.0` của `https://github.com/tt-a1i/archify`. Luôn đọc `.claude/skills/archify/SKILL.md` trước khi viết sơ đồ.

1. Chọn loại: `architecture` (thành phần và ranh giới), `sequence` (chuỗi lời gọi), `dataflow` (luồng dữ liệu qua các giai đoạn), `lifecycle` (trạng thái)...
2. Viết file nguồn `<docs>/<session>/diagrams/<slug>.archify.json`:
   - `meta.output`: `website/archify/<domain>/<slug>.html`.
   - Nội dung bằng tiếng Việt, giữ nguyên tên API/công nghệ. Không đặt `meta.locale` (viewer chưa có bản tiếng Việt nên các nút điều khiển giữ tiếng Anh).
   - Ghi đè nhãn legend sang tiếng Việt qua `meta.legend.entries`, đúng với ý nghĩa thực của từng loại đường/node.
3. Chạy từ root repo:

   ```bash
   ARCHIFY_UPDATE_CHECK_DISABLED=1 node .claude/skills/archify/bin/archify.mjs finalize <type> <file>.archify.json website/archify/<domain>/<slug>.html --quality showcase --out-dir .archify/<slug>
   ```

   Lần chạy sau dùng `--out-dir .archify/<slug>/review-<n>`. Chỉ coi là xong khi cả 4 bước `validate`, `deliver`, `check`, `browser-check` đều pass.
4. Trong Markdown, ngay sau khối Mermaid tương ứng, thêm `<!-- archify: <slug> | <tiêu đề> -->`.
5. Trong file content JS của website, **thay** khối `<div class="mermaid">` tương ứng bằng khối nhúng (nếu sơ đồ không có Mermaid đi kèm thì đặt đúng vị trí trong bài):

   ```html
   <div class="archify-embed" data-src="archify/<domain>/<slug>.html" data-title="<tiêu đề>">
     <a class="archify-full" href="archify/<domain>/<slug>.html" target="_blank" rel="noopener">Mở toàn màn hình ↗</a>
   </div>
   ```

   `enhanceArchifyEmbeds()` trong `website/app.js` tự chèn iframe (`?embed=1&theme=...`), tải lười khi cuộn tới, tự khớp chiều cao và nạp lại khi người đọc đổi theme.
6. Mở trang, kiểm tra sơ đồ hiện đúng ở cả giao diện sáng và tối.

Không commit `.archify/` (receipt tạm) và `website/archify/**/*.delivery.json` (chứa đường dẫn tuyệt đối của máy); cả hai đã có trong `.gitignore`.

## Điều kiện hoàn thành

- Diagram phản ánh đúng nội dung của Topic.
- Diagram không mâu thuẫn với Lesson.
- Diagram sử dụng Mermaid theo đúng chuẩn Markdown.
- Nếu có bản Archify: `finalize` pass, file JSON nguồn nằm cạnh Markdown, comment đánh dấu và khối nhúng website đặt đúng chỗ.
- Diagram đã được con người xác nhận.

## Các Rule cần tuân thủ

- 04-content-architecture.md
- 05-markdown-standard.md
- 10-quality-standard.md
