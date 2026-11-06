---
description: Bảng thuật ngữ nền tảng được sử dụng xuyên suốt dự án.
---

# Context: Terminology

## Giới thiệu

Tài liệu này liệt kê các thuật ngữ cốt lõi được sử dụng thống nhất trong toàn bộ Knowledge OS, giúp AI Agent hiểu đúng ngữ nghĩa khi đọc Rule, Workflow, Playbook hoặc nội dung tri thức.

## Thuật ngữ

**Domain**
Phạm vi kiến thức lớn nhất trong hệ thống, ví dụ Backend, Frontend, Mobile.

**Module**
Nhóm kiến thức thuộc một Domain.

**Topic**
Đơn vị học tập trung tâm, giải thích một khái niệm chính.

**Resource**
Tài nguyên thuộc về một Topic, bao gồm Lesson, Example, Diagram, Quiz, Flashcard, Reference.

**Lesson**
Nội dung giải thích chính của một Topic.

**Roadmap**
Lộ trình học tập được sắp xếp qua nhiều Topic.

**Frontmatter**
Metadata mô tả một tài liệu, đặt ở đầu file Markdown.

**Knowledge Graph**
Mạng lưới quan hệ giữa các Topic, bao gồm Prerequisite, Related, Next, Previous, Alternative, Extension.

**AI Agent**
Thành phần tự động hỗ trợ tạo, rà soát hoặc mở rộng nội dung, hoạt động dựa trên Rule, Workflow, Playbook, Template, Prompt và Context.

**Session**
Nhóm Topic cấp cao nhất trong mục lục của một domain (ví dụ Session 04: Android Manifest & Application Components). Thường ứng với một thư mục `session_<NN>/`.

**Mục lục (nav)**
Phần `nav` trong `map/<domain>_mkdocs.yml`: bản đồ Topic của domain, do con người sở hữu. Mỗi mục lá là một file và một Topic (rule 04).

**Số mục (chapter number)**
Số đánh trước tiêu đề trong `nav` (ví dụ `4.2.1.1`), cho biết vị trí của Topic. Trang tổng quan của Session dùng số `<NN>.0`.

**Topic gốc**
Topic giải thích đầy đủ một kiến thức; các Topic khác chỉ tóm tắt và link sang (rule 04, "Single Source of Truth").

**Profile frontmatter**
Bộ field frontmatter mà một domain dùng (rule 06).

**Entry**
Một bài trên website: object `'<key>': { … content: \`…\` }` trong `website/<domain>-content.js`.

**Alias**
Dòng `CONTENT['<id>'] = CONTENT['<key>']` cho phép tra entry bằng `id` trong frontmatter khi key web khác `id`.

**Marker sơ đồ**
Comment đặt ngay sau khối Mermaid để website thay Mermaid bằng sơ đồ đã vẽ: `<!-- dd: <slug> -->` (SVG diagram-design) hoặc `<!-- archify: <slug> | <tiêu đề> -->` (Archify).

**Kiến thức dùng trước**
Kiến thức thuộc Session sau mà một bài buộc phải dùng ở mức tối thiểu (rule 07).

## Ghi chú

Khi xuất hiện thuật ngữ mới có tính nền tảng, cần bổ sung vào tài liệu này để duy trì một nguồn định nghĩa thống nhất.
