---
description: Cấu trúc chuẩn cho một Lesson.
---

# Template: Lesson

## Mục đích

Định nghĩa cấu trúc chuẩn của một Lesson trong Knowledge OS. Đây là khung duy nhất: rule 07 (thứ tự trình bày), rule 10 (độ đầy đủ) và các workflow tạo bài đều theo khung này.

Template này chỉ mô tả cấu trúc, không chứa nội dung mẫu.

- Section đánh dấu **(bắt buộc)** phải có, đúng tên, theo thứ tự dưới đây.
- Section **(tuỳ chọn)** chỉ thêm khi Topic cần.
- Bên trong mỗi section, cách chia `###` tuỳ theo bản chất của Topic.
- Frontmatter theo profile của domain trong rule 06. Khối dưới đây là profile Android.

## Cấu trúc

```markdown
---
id:
title:
summary:
status: drafting
difficulty:
depth:
estimated_reading_time:
tags: []
prerequisites: []
related: []
learning_outcomes:
  -
knowledge_gap: >
---

# {Tên khái niệm}

## Vấn đề cần giải quyết
<!-- (bắt buộc) Vấn đề tổng quát mà kiến thức giải quyết, không gắn vào một app cụ thể.
     Có thể kèm một đoạn code ngắn cho thấy vấn đề lộ ra thế nào. -->

## Sau khi học xong
<!-- (bắt buộc) Danh sách giống hệt learning_outcomes trong frontmatter. -->

## {Tên khái niệm} là gì?
<!-- (bắt buộc) Định nghĩa chuẩn duy nhất của bài: 1–2 câu nêu bản chất + tối đa một mental model.
     summary, outcomes, các phần sau và tổng kết đều phải khớp định nghĩa này. -->

## Cách hoạt động
<!-- (bắt buộc) Chia theo từng phần kiến thức chính. -->

### {Phần kiến thức 1}

#### Ví dụ: {bài toán}
<!-- Bài toán hợp nhất với phần kiến thức này (1–2 câu)
     → Luồng chạy (các bước đánh số + sơ đồ Mermaid cùng số, khi code có logic)
     → Code (ghi rõ file/class, comment // (n) khớp bước)
     → Kết quả (kiểm chứng thế nào) -->

### {Phần kiến thức 2}

#### Ví dụ: {bài toán}
<!-- Có thể là bài toán khác với phần trước. -->

## Deep Dive: {chủ đề}
<!-- (tuỳ chọn) Cơ chế bên trong cho người muốn hiểu sâu; bài vẫn đọc hiểu được nếu bỏ qua. -->

## Ví dụ thực tế
<!-- (bắt buộc) 2–3 bài toán thường gặp; code đầy đủ cho bài toán chính. -->

## So sánh với các cách tiếp cận khác
<!-- (tuỳ chọn) Khi có giải pháp thay thế phổ biến. -->

## Khi nào nên và không nên dùng
<!-- (bắt buộc với Topic là công cụ/kỹ thuật; bỏ được với Topic thuần khái niệm hoặc trang tổng quan) -->

## Sai lầm thường gặp
<!-- (bắt buộc) Phản ví dụ: code sai, lỗi lộ ra thế nào, cách sửa. -->

## Trade-offs
<!-- (tuỳ chọn) Chi phí, giới hạn, điều phải đánh đổi. -->

## Lịch sử phát triển
<!-- (bắt buộc) Các mốc version/API chính và vì sao thiết kế thay đổi.
     Được đặt ngay sau "{Tên khái niệm} là gì?" khi lịch sử cần để hiểu thiết kế hiện tại. -->

## Kết nối hệ thống
<!-- (bắt buộc) Topic tiên quyết, Topic liên quan, học tiếp ở đâu (theo nav).
     Topic chưa có bài: ghi "{số mục} {tên} (chưa có bài)", không link. -->

## Developer Curiosity Checklist
<!-- (tuỳ chọn) Câu hỏi tự kiểm tra, trả lời được bằng nội dung trong bài. -->

## Tham khảo
<!-- (bắt buộc khi bài có khẳng định dựa trên tài liệu ngoài) Official Docs, RFC, source code. -->
```

## Kiểm tra

- Android: `node tools/verify-android-topics.js` kiểm tra frontmatter và 7 section bắt buộc (Vấn đề cần giải quyết, Sau khi học xong, Cách hoạt động, Ví dụ thực tế, Sai lầm thường gặp, Kết nối hệ thống, Lịch sử phát triển). Mục "{Tên khái niệm} là gì?" bắt buộc theo rule 07, review kiểm tra bằng tay.
- Domain khác: bài mới dùng khung section này, frontmatter theo profile của domain; bài cũ chuyển dần khi được viết lại.
