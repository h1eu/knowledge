---
trigger: always_on
---

# Rule: Frontmatter Standard

## Mục đích

Tài liệu này định nghĩa chuẩn Frontmatter cho toàn bộ Knowledge OS.

Frontmatter là metadata của nội dung.

Frontmatter giúp:

- Mô tả nội dung.
- Phân loại nội dung.
- Điều hướng.
- Tìm kiếm.
- Sinh Navigation.
- Sinh Roadmap.
- Sinh Knowledge Graph.

Frontmatter không chứa nội dung bài học.

---

# Nguyên tắc

Frontmatter là một hợp đồng (Contract) giữa:

- Nội dung.
- Website.
- AI Agent.
- Công cụ Build.

Mọi thành phần phải tuân thủ cùng một cấu trúc.

Không tự ý thêm hoặc thay đổi field nếu chưa được định nghĩa.

---

# Single Source of Truth

Một thông tin chỉ được khai báo một lần.

Không lặp lại metadata trong nội dung bài viết.

Không lưu cùng một dữ liệu ở nhiều field khác nhau.

---

# Metadata chỉ mô tả

Frontmatter chỉ dùng để mô tả bài viết.

Không chứa:

- Nội dung bài học.
- HTML.
- Markdown.
- JSX.
- Logic.

---

# Tối giản

Chỉ khai báo metadata thực sự cần thiết.

Không thêm field chỉ vì "có thể sẽ dùng".

Mỗi field đều phải có mục đích rõ ràng.

---

# Cấu trúc ổn định

Một field đã được sử dụng thì cần duy trì tính tương thích.

Không đổi tên field nếu chưa đánh giá tác động.

Không thay đổi kiểu dữ liệu nếu chưa thật sự cần.

---

# Chuẩn dữ liệu

Mỗi field chỉ nên có một kiểu dữ liệu.

Ví dụ:

- String
- Number
- Boolean
- Array
- Date

Không sử dụng nhiều kiểu dữ liệu cho cùng một field.

---

# Đặt tên Field

Tên field cần:

- Ngắn gọn.
- Rõ nghĩa.
- Viết bằng tiếng Anh.
- Dùng snake_case trong Markdown (`learning_outcomes`, `estimated_reading_time`). Khi đưa sang website JS thì dùng camelCase (`learningOutcomes`, `estimatedReadingTime`).

Không sử dụng viết tắt khó hiểu.

Ví dụ tốt:

- title
- summary
- learning_outcomes
- knowledge_gap

Ví dụ không tốt:

- desc
- txt
- info
- t

---

# Danh mục Field

Mỗi field sử dụng trong hệ thống phải được định nghĩa tại đây. Mỗi domain dùng một bộ field (profile) ở mục "Profile theo domain"; không dùng field ngoài profile của domain đó.

## Field của Topic (profile Android)

Thứ tự khai báo đúng như bảng.

| Field | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `id` | String | Có | Duy nhất toàn repo. Dạng `android.<module>.<topic>` (ít nhất 3 đoạn, chữ thường, `_` giữa từ), ví dụ `android.component.activity.lifecycle`. Đã công bố thì không đổi. |
| `title` | String | Có | Tên khái niệm, trùng H1 của bài. |
| `summary` | String | Có | 1–2 câu, khớp định nghĩa chuẩn ở mục "X là gì?" (rule 07). |
| `status` | Enum | Có | `planned` \| `drafting` \| `reviewing` \| `published` \| `deprecated` \| `archived`. Chỉ con người chuyển sang `published`. |
| `difficulty` | Enum | Có | `beginner` \| `intermediate` \| `advanced`. |
| `depth` | Enum | Có | `overview` \| `standard` \| `deep-dive`. |
| `estimated_reading_time` | String | Có | Dạng `<số> phút`, ví dụ `25 phút`. Quá khoảng 30 phút là dấu hiệu cần tách (rule 04). |
| `tags` | Array of String | Có | kebab-case, chữ thường. Tag đầu là domain (`android`). |
| `prerequisites` | Array of `id` | Có (có thể `[]`) | Chỉ `id` đã tồn tại. |
| `related` | Array of `id` | Có (có thể `[]`) | Chỉ `id` đã tồn tại. |
| `downstream` | Array of `id` | Chỉ ở `index.md` | Topic để bắt đầu học trong Session/Module. |
| `learning_outcomes` | Array of String | Có | 3–5 mục. Mỗi mục bắt đầu bằng một trong: Giải thích được, Xử lý được, Debug được, Biết khi nào, Phân biệt được, Triển khai được, Áp dụng được, Thiết kế được, Tối ưu được, Nhận diện được. Phải giống hệt danh sách trong section "Sau khi học xong". |
| `knowledge_gap` | String (folded `>`) | Có | Hậu quả cụ thể nếu không nắm kiến thức, ít nhất một câu. |
| `quality_gate` | Object | Không | Các khoá `depth`, `correctness`, `examples`, `diagrams`, `system_links`, mỗi khoá nhận `none` \| `partial` \| `complete`. |

Không dùng trong profile Android: `slug`, `domain`, `module`, `topic`, `authors`, `date`, `next`, `previous`. Domain và module suy ra từ `id` và vị trí trong `nav`; thứ tự trước/sau lấy từ `nav`.

Công cụ kiểm tra: `node tools/verify-android-topics.js`. Khi sửa danh mục này thì sửa script trong cùng thay đổi, và ngược lại.

Mẫu:

```yaml
---
id: android.component.activity.lifecycle
title: Activity Lifecycle
summary: Vòng đời Activity là chuỗi trạng thái mà hệ thống đưa Activity đi qua …
status: reviewing
difficulty: intermediate
depth: deep-dive
estimated_reading_time: 25 phút
tags: [android, activity, lifecycle]
prerequisites: []
related: [android.component.activity.state_changes]
learning_outcomes:
  - Giải thích được …
  - Phân biệt được …
  - Áp dụng được …
knowledge_gap: >
  Không nắm vòng đời dẫn tới …
---
```

## Profile theo domain

Các domain có generator hoặc script đọc frontmatter theo bộ field riêng; không đổi profile nếu chưa sửa công cụ tương ứng.

| Domain | Field | Định danh | Công cụ đọc |
|---|---|---|---|
| Android | Như bảng trên | `id` | `tools/verify-android-topics.js`, `tools/sync_android_session.js` |
| Git | `title, slug, summary, tags, difficulty, read_time, prerequisites, related, next, previous, learning_outcomes, knowledge_gap` | `slug` | `tools/gen_git_content.js` |
| Design Principles | `title, slug, summary, domain, module, tags, difficulty, depth, prerequisites, related` | `slug` | `tools/gen_oodp_content.js` |
| iOS, Flutter | `title, slug, summary, domain, module, topic, status, difficulty, estimated_reading_time, tags, prerequisites, related, learning_outcomes` | `slug` | Sửa tay |
| LeetCode | `title, slug, summary, leetcode_id, url, difficulty, level, pattern, tags, topic_tags` | `slug` | `tools/sync_leetcode.py` |

Domain mới dùng profile Android (đầy đủ và có script kiểm tra). Chuyển một domain cũ sang profile Android là thay đổi cấu trúc dữ liệu, cần đánh giá theo rule 03 và được duyệt.

## topic_tags

- Kiểu dữ liệu: Array of String.
- Mục đích: phân loại bài theo tag chủ đề chính thức của LeetCode.
- Giá trị: slug chuẩn của LeetCode (ví dụ `array`, `hash-table`, `two-pointers`, `dynamic-programming`).
- Nguồn dữ liệu: đồng bộ từ LeetCode GraphQL API thông qua công cụ sync chính thức.
- Phân biệt với `tags`: `tags` mô tả ngữ cảnh nội bộ của Repository (pattern, level, difficulty), `topic_tags` mô tả taxonomy gốc của LeetCode.
- Bài viết không thuộc LeetCode không cần field này.

---

# Nội dung Field

Metadata cần:

- Chính xác.
- Nhất quán.
- Có thể kiểm chứng.

Không tạo metadata mơ hồ.

---

# Quan hệ

Metadata tham chiếu nội dung khác bằng định danh của domain (`id` với Android, `slug` với các domain còn lại), không bằng đường dẫn file.

Chỉ tham chiếu định danh đã tồn tại. Topic chưa có bài thì nhắc trong nội dung bài, không đưa vào frontmatter.

Link trong nội dung bài viết theo rule 05, mục "Liên kết".

---

# Giá trị mặc định

Nếu một field có giá trị mặc định thì nên để hệ thống tự sinh.

Không ghi lại giá trị mặc định trong mọi bài viết.

---

# Mở rộng

Nếu cần bổ sung field mới:

- Đánh giá nhu cầu.
- Đánh giá tác động.
- Cập nhật chuẩn Frontmatter.
- Cập nhật Website.
- Cập nhật AI Agent.

Không tự ý tạo field mới trong một bài viết.

---

# Tính ổn định

Website phải có khả năng hoạt động nếu metadata không đầy đủ.

AI nên bổ sung metadata còn thiếu khi có thể.

Không để thiếu các field bắt buộc.

---

# Kiểm tra

AI cần kiểm tra:

- Thiếu field bắt buộc.
- Sai kiểu dữ liệu.
- Sai định dạng.
- Giá trị không hợp lệ.
- Trùng slug.
- Metadata không nhất quán.

---

# Không phụ thuộc công nghệ

Frontmatter không chứa thông tin dành riêng cho website hay một công cụ cụ thể (key entry JS, class CSS, icon, thứ tự sidebar).

Metadata mô tả nội dung.

Không mô tả giao diện.

---

# Mục tiêu cuối cùng

Frontmatter cần:

- Chính xác.
- Nhất quán.
- Tối giản.
- Có khả năng mở rộng.
- Dễ xử lý tự động.

Frontmatter là Contract của toàn bộ Knowledge Repository.