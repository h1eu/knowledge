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

Mỗi Markdown chỉ nên giải thích một Topic.

Không kết hợp nhiều chủ đề lớn trong cùng một file.

Nếu nội dung quá lớn, cần tách thành nhiều Topic.

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

---

# Callout

Sử dụng Callout để nhấn mạnh.

Ví dụ:

- Note
- Warning
- Tip
- Info

Không lạm dụng Callout.

---

# HTML

Không nhúng HTML vào Markdown nếu Markdown hoặc MDX có thể biểu diễn.

Ưu tiên Markdown thuần.

---

# MDX

Chỉ sử dụng MDX khi thật sự cần.

Ví dụ:

- Component tương tác.
- Demo.
- Playground.
- Visualization.

Không chuyển toàn bộ nội dung sang JSX.

---

# Hình ảnh

Hình ảnh chỉ dùng khi:

- Không thể mô tả bằng văn bản.
- Không thể biểu diễn bằng Mermaid.

Mỗi hình cần có alt text.

---

# Liên kết

Ưu tiên liên kết nội bộ.

Không sử dụng URL tuyệt đối nếu có thể dùng liên kết tương đối.

Không tạo liên kết chết.

---

# Thuật ngữ

Thuật ngữ cần nhất quán.

Một khái niệm chỉ nên có một cách gọi trong toàn bộ Repository.

---

# Ví dụ

Ví dụ nên:

- Ngắn.
- Độc lập.
- Có thể chạy.
- Chỉ minh họa đúng nội dung đang học.

Không đưa Project hoàn chỉnh vào Lesson.

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

Markdown không được chứa logic phụ thuộc:

- Next.js
- Astro
- React
- Tailwind

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