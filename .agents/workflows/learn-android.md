---
description: Quy trình tạo bài học chuyên sâu cho từng Topic Android. Đảm bảo nội dung có hệ thống, chiều sâu, minh họa cụ thể, và kết nối tri thức.
---

# Workflow: Learn Android

## Mục đích

Định nghĩa quy trình xây dựng tri thức Android chuyên sâu cho Knowledge OS.

Workflow này dùng để tạo ra một hệ thống tri thức Android có cấu trúc, có chiều sâu và có khả năng kết nối giữa các Topic.

Mục tiêu không phải là viết Android Documentation hay ghi nhớ APIs, mà là giúp Android Developers hiểu cách Android thực sự hoạt động khi phát triển ứng dụng.

Mỗi Topic cần giúp người học hiểu:

- Khái niệm đó là gì.
- Nó được sinh ra để giải quyết vấn đề gì.
- Khi nào nên và không nên sử dụng.
- Android xử lý nó như thế nào trong quá trình build, runtime hoặc publishing.
- Các cách tiếp cận khác nhau để giải quyết cùng một vấn đề.
- Ưu điểm, nhược điểm và những trade-offs cần lưu ý.
- Nó được sử dụng như thế nào trong các Android projects thực tế.
- Nó liên kết như thế nào với các thành phần khác trong hệ sinh thái Android.
- Những gì thực sự xảy ra phía sau khi Android Developer viết code.

Workflow hướng đến việc xây dựng kiến thức nền tảng và tư duy hệ thống dành cho Android Developers.

---

## Khi nào sử dụng

- Tạo Topic Android mới.
- Bổ sung hoặc nâng cấp Topic hiện có.
- Mở rộng Android Knowledge Graph.

---

## Input

| Tham số | Mô tả |
|--------|--------|
| topic_keyword | Topic cần xây dựng |
| android_mkdocs.yml | Bản đồ tri thức Android |

---

## Output

Một Topic chỉ được xem là hoàn thành khi sinh ra đầy đủ các artifacts sau:

1. Markdown Source (Single Source of Truth)
2. Website Source Code (`android-content.js`)
3. Metadata
4. Website Assets có thể render trên Knowledge OS

---

## Topic Scope

Người dùng có thể cung cấp thêm mục tiêu học tập của Topic.
Ví dụ:

- Tôi muốn hiểu Java trong Android.
- Tôi muốn hiểu Flow khi sử dụng trong Clean Architecture.
- Tôi muốn hiểu APK và AAB từ góc độ build & publish.
- Tôi muốn hiểu CameraX trong Compose.

Nếu người dùng cung cấp learning goals, hãy ưu tiên trả lời các câu hỏi liên quan trước, đồng thời bổ sung các kiến thức nền tảng cần thiết để Topic được hoàn chỉnh.

ví dụ:
Topic: Kotlin Flow

Learning Goal:

Tôi muốn hiểu Flow trong Android từ cách sử dụng, cơ chế hoạt động, so sánh với các giải pháp khác và best practices trong thực tế.

Use Learn Android Workflow.

# Workflow

## Bước 1 - Topic Discovery

Xác định:

- Topic thuộc module nào của Android.
- Prerequisites Topics.
- Related Topics.
- Downstream Topics.

Topic phải được đặt đúng vị trí trong Android Knowledge Graph.

---

## Bước 2 - Learner Curiosity Discovery

Trước khi nghiên cứu Topic, hãy xác định:

> Nếu một Android Developer chủ động tìm kiếm Topic này, họ thực sự muốn biết điều gì?

Liệt kê từ 5 - 15 câu hỏi quan trọng nhất mà người học có khả năng quan tâm.

Ví dụ:

```text
Topic: Kotlin Flow

- Flow là gì?
- Tại sao phải dùng Flow?
- Flow giải quyết vấn đề gì?
- Khi nào nên dùng Flow?
- Flow hoạt động như thế nào?
- Có những loại Flow nào?
- Flow khác LiveData như thế nào?
- Flow khác RxJava như thế nào?
- StateFlow khác SharedFlow như thế nào?
- Flow có những nhược điểm gì?
- Flow được dùng ở đâu trong Android Architecture?
- Những lỗi thường gặp khi sử dụng Flow?
```

Không được viết nội dung trước khi hoàn thành bước này.

---

## Bước 3 - Knowledge Discovery

Trước khi nghiên cứu Topic, hãy trả lời:

- Tại sao Topic này tồn tại?
- Nó giải quyết vấn đề gì?
- Android xử lý nó như thế nào?
- Những thành phần nào của Android có liên quan?
- Có những cách tiếp cận nào khác?
- Những limitations và trade-offs là gì?
- Nó được sử dụng như thế nào trong thực tế?

Ưu tiên giải thích:

- Android Context.
- Build Flow.
- Runtime Flow.
- Publishing Flow.
- Internal Mechanisms.
- Real World Usage.

Không tập trung vào việc liệt kê APIs.

---

## Bước 4 - Research

Nghiên cứu Topic theo các góc nhìn sau:

- Concept.
- Android Context.
- Problem Solving.
- Build / Runtime Flow.
- Real World Usage.
- Trade-offs.
- Common Mistakes.
- Similar Technologies.
- Internal Mechanisms.
- Advanced & Deep Dive.
- System Connections.

Nội dung cần đủ sâu để Android Developers hiểu được:

- Cách Android hoạt động.
- Cách Android xử lý code và resources.
- Cách các thành phần trong Android liên kết với nhau.

---

## Bước 5 - Generate Topic Artifacts

Không sử dụng template cố định cho tất cả các Topic.

AI được phép tổ chức nội dung phù hợp với bản chất của từng Topic.

Tuy nhiên, một Topic cần trả lời được hầu hết các câu hỏi sau (nếu phù hợp):

- What is it?
- Why does it exist?
- What problem does it solve?
- When should I use it?
- When should I avoid it?
- How do I use it?
- How does it work?
- What are the different approaches?
- What are the trade-offs?
- What are the limitations?
- What are the common mistakes?
- How does it compare with similar technologies?
- How is it used in real-world Android projects?
- What should I learn next?

### Required Artifacts

#### 1. Markdown Source

Single Source of Truth chứa toàn bộ nội dung của Topic.

#### 2. Website Source Code

Tạo entry tương ứng trong:

```text
website/android-content.js
```

Bao gồm:

- Title
- Summary
- Tags
- Metadata
- HTML Content
- Related Topics
- Prerequisites
- Updated Date
- Reading Time

#### 3. Metadata

Bao gồm:

- Topic ID
- Status
- Difficulty
- Reading Time
- Learning Outcomes
- Knowledge Gap
- Related Topics
- Prerequisites
- Module Information

Không được bỏ qua Metadata.

---

## Bước 6 - Generate Website Assets

Chuyển đổi Topic thành các assets phục vụ website.

### Required Website Assets

#### HTML Content

- Chuyển đổi đầy đủ từ Markdown sang HTML.
- Không được bỏ sót nội dung.

#### Diagrams

Sử dụng diagrams khi cần thiết để minh họa:

- Build Flow.
- Runtime Flow.
- Architecture.
- Lifecycle.
- Data Flow.
- Component Relationships.
- Comparisons.

#### Code Blocks

- Có syntax highlighting.
- Có `data-lang` tương ứng.

#### Callouts

Ví dụ:

```text
callout-note
callout-tip
callout-warning
callout-success
```

#### Tables

- Render chính xác trên website.

Publishing website assets là bắt buộc và không được bỏ qua.

---

## Bước 7 - Verify

Topic đạt yêu cầu nếu:

- Trả lời được những câu hỏi mà Android Developers thực sự quan tâm.
- Có ví dụ thực tế.
- Có diagrams khi cần thiết.
- Có liên kết hệ thống.
- Hiển thị đúng trên website.
- Metadata hợp lệ.
- Verify script chạy PASS.

---

## Quality Checklist

### Nội dung

- Giải thích bản chất của Topic.
- Giải thích vấn đề mà Topic giải quyết.
- Giải thích Android Context.
- Có Real World Usage.
- Có Trade-offs.
- Có Common Mistakes.
- Có Similar Technologies.
- Có Deep Dive khi cần thiết.

### Metadata

- Có Topic ID hợp lệ.
- Có Status hợp lệ.
- Có Difficulty.
- Có Estimated Reading Time.
- Có Learning Outcomes.
- Có Knowledge Gap.
- Có System Connections.

### Minh họa

- Có diagrams cho các khái niệm phức tạp.
- Có bảng so sánh khi cần.
- Có minh họa Build Flow hoặc Runtime Flow nếu phù hợp.

### Kết nối hệ thống

- Có Prerequisites.
- Có Related Topics.
- Có Downstream Topics.
- Sử dụng Topic ID để liên kết.

### Kỹ thuật

- Markdown Source tồn tại.
- Entry JS đầy đủ.
- Website render chính xác.
- Verify script chạy PASS.

---

## Completion Rules

Một Topic được xem là FAILED nếu thiếu bất kỳ artifact nào sau đây:

- Markdown Source.
- Website Source Code.
- Metadata.
- HTML Content.
- Website Assets.

Thiếu bất kỳ artifact nào đồng nghĩa với việc Topic chưa hoàn thành.

---

## Knowledge Writing Rules

You are NOT writing Android documentation.

You are building foundational Android knowledge for Android Developers.

Always answer the questions that Android Developers naturally ask when learning a Topic.

Prioritize:

- Concept.
- Android Context.
- Problem Solving.
- Real World Usage.
- Build Flow.
- Runtime Flow.
- Trade-offs.
- Similar Technologies.
- Internal Mechanisms.
- System Connections.
- Advanced Knowledge.

Do NOT focus on:

- Memorizing APIs.
- Copying Android Documentation.
- Explaining compiler internals before explaining the concept.

Deep dive knowledge should only be introduced after readers understand the bigger picture.

---

## Success Criteria

Một Topic được xem là thành công khi người đọc có thể nói:

> "Giờ mình đã thực sự hiểu Topic này hoạt động như thế nào trong Android và biết khi nào nên sử dụng nó."

---

## Related Rules

- 01-system-thinking.md
- 04-content-architecture.md
- 05-markdown-standard.md
- 07-writing-style.md
- 08-code-standard.md
- 10-quality-standard.md