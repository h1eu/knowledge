---
trigger: always_on
---

# Rule: Markdown Standard

## Mục đích

Tài liệu này định nghĩa chuẩn viết Markdown cho toàn bộ Knowledge OS.

Markdown không chỉ là định dạng lưu trữ.

Markdown là nguồn dữ liệu chính của hệ thống.

Mọi AI Agent cần tạo Markdown có cấu trúc rõ ràng, dễ đọc, nhất quán và dễ xử lý tự động.

---

# Nguyên tắc

Markdown cần:

- Đơn giản.
- Dễ đọc.
- Dễ bảo trì.
- Dễ parse.
- Dễ chuyển đổi sang các định dạng khác.

Không viết Markdown chỉ để hiển thị đẹp trên Website.

---

# Một file chỉ có một mục tiêu

Mỗi Markdown giải thích đúng một Topic, ứng với một mục lá trong `nav`. Khi nào cần tách và cách tách: rule 04, mục "Topic và mục lục".

---

# Heading

Một file chỉ có một Heading cấp 1.

```md
# JWT Authentication
```

Heading phải phản ánh đúng Topic.

Không sử dụng nhiều Heading cấp 1.

---

# Heading Level

Heading phải tăng tuần tự.

Đúng:

```md
#

##

###
```

Không bỏ qua cấp.

Sai:

```md
#

###

#####
```

---

# Cấu trúc Section

Mỗi Section chỉ nên giải quyết một ý.

Một Section nên:

- Có tiêu đề rõ ràng.
- Có mục tiêu rõ ràng.
- Có nội dung độc lập.

Không tạo các Section quá dài.

---

# Độ dài

Ưu tiên nhiều đoạn ngắn.

Không tạo các đoạn văn quá dài.

Một đoạn chỉ nên truyền đạt một ý chính.

---

# Danh sách

Sử dụng danh sách khi:

- Liệt kê.
- So sánh.
- Các bước.
- Điều kiện.

Không sử dụng danh sách để thay thế đoạn văn.

---

# Bảng

Chỉ sử dụng Table khi cần so sánh dữ liệu.

Không sử dụng Table cho bố cục.

---

# Code Block

Code chỉ dùng để minh họa.

Mọi Code Block cần chỉ rõ ngôn ngữ.

Ví dụ:

```kotlin
val state = remember { mutableStateOf(0) }
```

Không để Code Block không có ngôn ngữ.

---

# Mermaid

Ưu tiên Mermaid khi:

- Sequence Diagram
- Flowchart
- State Diagram
- Class Diagram
- Architecture Diagram

Không sử dụng hình ảnh nếu Mermaid có thể biểu diễn.

Ngoại lệ ở Presentation Layer: website có thể dùng SVG vẽ tay trong `website/diagrams/` (kèm bản `-dark`) để hiển thị đẹp hơn. Khi đó Markdown vẫn giữ Mermaid (hoặc sơ đồ ASCII trong khối ```` ```text ````) làm nguồn gốc, và đặt ngay sau khối đó comment `<!-- dd: <slug> -->`; trên website khối `dd-diagram` (SVG dark + light) thay cho khối đó. Marker đứng một mình (không có khối ngay trước) thì website chỉ chèn SVG. Vẽ bằng skill `.agents/skills/diagram-design`, sinh bản light bằng `python3 tools/gen-dd-light.py website/diagrams/<slug>-dark.html`.

Sơ đồ tương tác (Archify): dùng cho sơ đồ nhiều bước hoặc nhiều thành phần mà người đọc cần bấm vào để lần theo (kiến trúc, chuỗi lời gọi, luồng dữ liệu). Không thay thế Mermaid:

- File nguồn JSON nằm cạnh Markdown: `<docs>/<session>/diagrams/<slug>.archify.json`.
- HTML build ra nằm ở `website/archify/<domain>/<slug>.html` (khoảng 800 KB mỗi file, nên chỉ dùng khi thật sự cần).
- Markdown giữ Mermaid tương ứng, và đặt ngay sau nó một comment đánh dấu: `<!-- archify: <slug> | <tiêu đề> -->`.
- Website đổi comment đó thành khối `.archify-embed` **thay cho** Mermaid ngay trước nó: sơ đồ hiện thẳng trong bài (iframe `loading="lazy"`, tự khớp chiều cao, đổi theo theme của site), kèm link "Mở toàn màn hình".
- Quy trình tạo: `.agents/workflows/create-diagram.md`.

---

# Callout

Sử dụng Callout để nhấn mạnh. Dùng cú pháp alert của GitHub Flavored Markdown, với 5 loại:

```md
> [!NOTE]
> Thông tin bổ sung nên biết.

> [!TIP]
> Mẹo giúp làm tốt hơn.

> [!IMPORTANT]
> Điều bắt buộc phải nắm.

> [!WARNING]
> Điều có thể gây lỗi nếu bỏ qua.

> [!CAUTION]
> Hành động gây hậu quả nghiêm trọng (mất dữ liệu, crash, lỗ hổng bảo mật).
```

Không dùng `> **Lưu ý:**`, `> **Cảnh báo:**` hay `[!DANGER]` cho bài mới; bài cũ chuyển dần khi được viết lại. Blockquote in đậm dạng `> **Giải pháp:**` vẫn dùng được cho đoạn trích dẫn thường, không phải Callout.

Không lạm dụng Callout.

---

# HTML

Không nhúng HTML vào Markdown nếu Markdown có thể biểu diễn.

Ngoại lệ là các comment đánh dấu sơ đồ (`<!-- dd: … -->`, `<!-- archify: … -->`) ở mục Mermaid.

Ưu tiên Markdown thuần.

---

# Hình ảnh

Hình ảnh chỉ dùng khi:

- Không thể mô tả bằng văn bản.
- Không thể biểu diễn bằng Mermaid.

Mỗi hình cần có alt text.

---

# Liên kết

Ưu tiên liên kết nội bộ.

Có hai loại liên kết, mỗi loại một cách viết:

- **Quan hệ trong frontmatter** (`prerequisites`, `related`, `downstream`): dùng `id`, không dùng đường dẫn (rule 06).
- **Link trong nội dung bài**: dùng đường dẫn tương đối tới file `.md` (ví dụ `[Task and Backstack](../activity/task_and_backstack.md)`), để link chạy được cả khi đọc Markdown trực tiếp. Không dùng URL tuyệt đối tới repo hay website.

Topic chưa có bài thì ghi tên và số mục kèm "(chưa có bài)", không tạo link.

Không tạo liên kết chết. Script verify của domain kiểm tra link nội bộ.

---

# Thuật ngữ

Thuật ngữ cần nhất quán.

Một khái niệm chỉ nên có một cách gọi trong toàn bộ Repository.

---

# Ví dụ

Cách viết ví dụ (chọn bài toán, luồng chạy, comment `// (n)`): rule 07 và `.agents/playbooks/write-example.md`. Về mặt Markdown, ví dụ trong phần kiến thức là heading con `#### Ví dụ: <bài toán>`.

---

# Khả năng tái sử dụng

Markdown nên được viết để có thể:

- Render Website.
- Sinh PDF.
- Sinh EPUB.
- Parse bằng AI.
- Index Search.

Không phụ thuộc vào giao diện Website.

---

# Không phụ thuộc nền tảng

Markdown không chứa JavaScript, component, class CSS hay HTML trình bày dành riêng cho website.

Phần trình bày (SVG, widget, embed) do website thêm vào dựa trên marker trong Markdown.

Website chỉ là nơi hiển thị.

---

# Mục tiêu cuối cùng

Mọi Markdown phải:

- Chính xác.
- Rõ ràng.
- Có cấu trúc.
- Dễ đọc.
- Dễ bảo trì.
- Dễ mở rộng.
- Dễ xử lý tự động.

Markdown là tài sản lâu dài của Knowledge OS.