---
description: Cấu trúc chuẩn cho một Lesson.
---

# Template: Lesson

## Mục đích

Định nghĩa cấu trúc chuẩn của một Lesson trong Knowledge OS.

Template này chỉ mô tả cấu trúc, không chứa nội dung mẫu.

## Cấu trúc

```markdown
---
title:
slug:
summary:
tags:
prerequisites:
related:
next:
previous:
---

# {Tên khái niệm}

## Vấn đề
<!-- Vấn đề tổng quát mà kiến thức giải quyết; có thể kèm đoạn code ngắn cho thấy vấn đề -->

## Bối cảnh

## {Tên khái niệm} là gì?
<!-- Định nghĩa chuẩn duy nhất của bài: 1–2 câu nêu bản chất + tối đa một mental model.
     Mọi phần sau, summary, outcomes, tổng kết đều phải khớp định nghĩa này. -->

## Cách hoạt động

### {Phần kiến thức 1}

#### Ví dụ: {bài toán}
<!-- Bài toán hợp nhất với phần kiến thức này (1–2 câu)
     → Luồng chạy (các bước đánh số + sơ đồ Mermaid cùng số, khi code có logic)
     → Code (ghi rõ file/class, comment // (n) khớp bước)
     → Kết quả (kiểm chứng thế nào) -->

### {Phần kiến thức 2}

#### Ví dụ: {bài toán}
<!-- Có thể là bài toán khác với phần trước -->

## Ví dụ
<!-- 2–3 bài toán thường gặp; code đầy đủ cho bài toán chính -->

## Trường hợp sử dụng

## Khi không nên dùng

## Sai lầm thường gặp
<!-- Phản ví dụ: code sai, lỗi lộ ra thế nào, cách sửa -->

## Xem thêm
```

Domain Android dùng bộ section bắt buộc của `tools/verify-android-topics.js` ("Vấn đề cần giải quyết", "Sau khi học xong", "Cách hoạt động", "Ví dụ thực tế", "Sai lầm thường gặp", "Kết nối hệ thống", "Lịch sử phát triển"); các mục "Ví dụ: …" là heading con nằm trong "Cách hoạt động".
