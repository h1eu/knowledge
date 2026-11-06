---
trigger: always_on
---

# Rule: Writing Style

## Mục đích

Tài liệu này định nghĩa phong cách trình bày nội dung của Knowledge OS.

Mục tiêu không phải là viết hay.

Mục tiêu là giúp người học hiểu đúng bản chất của kiến thức.

Mọi AI Agent tạo nội dung đều phải ưu tiên khả năng học tập thay vì khả năng đọc lướt.

---

# Triết lý

Không viết như Blog.

Không viết như Documentation.

Không viết như AI trả lời câu hỏi.

Hãy viết như một người hướng dẫn đang dạy một kỹ sư.

---

# Người đọc mục tiêu

Người đọc là **developer** muốn học mới, củng cố lại, và hiểu bản chất kiến thức để **dùng được trong công việc**.

Vì vậy mỗi Topic phải trả lời được hai câu:

- "Bản chất của nó là gì, vì sao nó hoạt động như vậy?"
- "Mình áp dụng nó vào app của mình thế nào?"

Bài chỉ có lý thuyết, hoặc chỉ có code mẫu, đều chưa đạt.

---

# Một định nghĩa, một mental model trong mỗi Topic

Mỗi Topic có **đúng một** định nghĩa chuẩn cho khái niệm chính, đặt ở mục "X là gì?":

- 1–2 câu định nghĩa, nêu bản chất (nó *là* gì, không chỉ nó *làm* gì).
- Tối đa một mental model / phép so sánh. Đã chọn thì dùng nó xuyên suốt bài, không đổi sang phép so sánh khác ở phần sau.

Mọi chỗ khác trong Topic phải **khớp** với định nghĩa đó, không được diễn đạt lại theo nghĩa khác:

- `summary` và `learning_outcomes` trong frontmatter.
- Các phần "Cách hoạt động", callout, chú thích Diagram, bảng so sánh.
- Phần tổng kết, Developer Curiosity Checklist, Quiz và Flashcard của Topic.

Không dùng một thuật ngữ trước khi định nghĩa nó trong bài (hoặc liên kết Topic định nghĩa nó). Nếu khái niệm đã được định nghĩa ở Topic khác, dùng lại đúng định nghĩa đó và liên kết tới Topic gốc. Không định nghĩa lại theo cách khác.

---

# Kiến thức tổng quát, ví dụ theo từng kiến thức

Kiến thức (vấn đề, định nghĩa, cách hoạt động, summary, learning outcomes) viết **tổng quát**, không gắn vào một app cụ thể. Ví dụ code tồn tại để **minh hoạ và giải thích luồng chạy** của kiến thức đó.

- Không dùng một app mẫu chung cho cả domain. Mỗi kiến thức áp dụng được cho nhiều bài toán khác nhau; ví dụ chọn **bài toán thực tế hợp nhất với chính kiến thức đó** (Room transaction → đặt hàng; `PendingIntent` → mở màn hình từ thông báo; JNI → xử lý ảnh). Các phần trong một Topic có thể dùng bài toán khác nhau.
- Phần "Vấn đề cần giải quyết" nêu vấn đề **tổng quát** mà kiến thức giải quyết; có thể kèm một đoạn code ngắn cho thấy vấn đề lộ ra thế nào.
- Sau mỗi phần kiến thức chính có thể có một mục `#### Ví dụ: <bài toán>` minh hoạ đúng phần vừa giải thích: bài toán (1–2 câu) → luồng chạy (các bước đánh số + sơ đồ, khi code có logic) → code với comment `// (n)` → kết quả, cách kiểm chứng.
- Không ví dụ nào dùng kiến thức ở phần sau của bài (hoặc chưa có trong Topic tiên quyết), trừ trường hợp ở mục "Kiến thức dùng trước".
- Một kiến thức có nhiều bài toán áp dụng thì phần "Ví dụ thực tế" có thể nêu 2–3 bài toán; chỉ bài toán chính cần code đầy đủ.
- Tên class, biến lấy theo bài toán của ví dụ, có nghĩa trong ngữ cảnh thật (không `foo`, `bar`, `Animal`).

---

# Giải thích bản chất trước

Luôn ưu tiên trả lời:

- Nó là gì?
- Vì sao nó tồn tại?
- Nó giải quyết vấn đề gì?
- Khi nào nên dùng?
- Khi nào không nên dùng?

Không bắt đầu bằng API hoặc Code.

---

# Bắt đầu từ vấn đề

Mỗi bài học nên bắt đầu bằng vấn đề cần giải quyết.

Người học cần hiểu:

"Tại sao phải học kiến thức này?"

trước khi học cách sử dụng.

---

# Từ đơn giản đến phức tạp

Thứ tự trình bày theo khung trong `.agents/templates/lesson.md`:

1. Vấn đề cần giải quyết
2. Sau khi học xong
3. Định nghĩa ("X là gì?")
4. Cách hoạt động, mỗi phần kiến thức kèm `#### Ví dụ:`
5. Ví dụ thực tế
6. Khi nào nên và không nên dùng
7. Sai lầm thường gặp
8. Lịch sử phát triển, Kết nối hệ thống

Template là nơi duy nhất định nghĩa tên và thứ tự section; rule này chỉ giải thích vì sao đi theo thứ tự đó: người học cần biết vì sao phải học, rồi hiểu nó là gì, rồi hiểu nó chạy thế nào, sau cùng mới tới cách dùng và giới hạn.

Không đảo ngược thứ tự nếu không thật sự cần thiết.

---

# Kiến thức dùng trước

Thứ tự Topic theo `nav` đôi khi buộc một bài phải dùng kiến thức của Session sau. Ví dụ, bài Room ở Session 05 cần coroutine, trong khi Coroutines nằm ở 8.4.3.

Khi đó:

- Chỉ dùng phần tối thiểu cần cho ví dụ chạy được (ví dụ một hàm `suspend`, một `Flow.collect`), không giải thích cơ chế của kiến thức đó.
- Lần đầu xuất hiện, ghi một dòng: kiến thức này là gì trong một câu, và nó được học ở mục nào (ví dụ "Coroutine được học ở 8.4.3 Coroutines (chưa có bài)").
- Không đưa `id` của Topic chưa có bài vào `prerequisites`.
- Không đổi sang cách viết cũ hơn (callback, `AsyncTask`) chỉ để tránh kiến thức dùng trước, nếu cách đó không còn được khuyên dùng.

---

# Một khái niệm tại một thời điểm

Mỗi phần chỉ nên giới thiệu một ý tưởng chính.

Nếu xuất hiện khái niệm mới cần giải thích, hãy liên kết đến Topic tương ứng thay vì giải thích sâu ngay trong bài.

---

# Ưu tiên giải thích hơn định nghĩa

Không chỉ đưa ra định nghĩa.

Cần giải thích:

- Ý nghĩa.
- Vai trò.
- Cơ chế.
- Mối quan hệ với các khái niệm khác.

---

# Sử dụng ví dụ đúng thời điểm

Ví dụ chỉ nên xuất hiện sau khi người đọc đã hiểu khái niệm.

Ví dụ dùng để củng cố kiến thức.

Không dùng ví dụ để thay thế giải thích.

---

# Code mô tả logic: giải thích → sơ đồ luồng chạy → code

Khi một đoạn code demo hoặc hướng dẫn mô tả **logic** (luồng xử lý, rẽ nhánh, tương tác giữa các thành phần, chuyển thread, đổi trạng thái), **ưu tiên giải thích** và đi theo thứ tự:

1. **Giải thích bằng lời**: các bước logic được đánh số (1, 2, 3...), nói rõ mỗi bước làm gì và vì sao.
2. **Sơ đồ luồng chạy**: vẽ đúng các bước đó, dùng cùng số thứ tự.
   - Tương tác giữa các thành phần hoặc thread theo thời gian (UI ↔ ViewModel ↔ Repository ↔ API, main thread ↔ background) → sequence diagram.
   - Rẽ nhánh, điều kiện, vòng lặp → flowchart.
   - Thay đổi trạng thái, vòng đời → state diagram.
3. **Code**: chỉ phần cần thiết, comment đánh dấu bước tương ứng (`// (2) ...`) để người đọc dò từ lời, sang sơ đồ, sang code.

Người đọc phải hiểu được luồng chạy chỉ từ phần giải thích và sơ đồ; code là bước cuối để xác nhận.

Không cần sơ đồ cho code không có luồng (khai báo dependency, cấu hình Gradle, một hàm thuần một bước). Sơ đồ viết bằng Mermaid trong Markdown; trên website vẽ lại bằng diagram-design theo rule 05.

---

# Code là công cụ minh họa

Code không phải nội dung chính.

Chỉ đưa vào những đoạn code cần thiết để minh họa cho kiến thức đang học.

Không đưa project hoàn chỉnh: mỗi ví dụ chỉ đưa phần code minh hoạ kiến thức, kèm đủ ngữ cảnh (class, file) để người đọc biết đặt vào đâu.

Không đưa các chi tiết không liên quan.

---

# Diagram hỗ trợ tư duy

Ưu tiên Diagram khi:

- Có nhiều thành phần tương tác.
- Có luồng xử lý.
- Có kiến trúc.
- Có vòng đời.

Không sử dụng Diagram chỉ để trang trí.

---

# Giải thích Trade-off

Nếu một giải pháp có ưu và nhược điểm, cần trình bày đầy đủ.

Không mô tả một công nghệ như giải pháp tốt nhất cho mọi trường hợp.

---

# Chính xác hơn là đơn giản

Nếu phải lựa chọn giữa:

- Đơn giản nhưng sai.
- Chính xác nhưng khó hơn.

Ưu tiên sự chính xác.

Sau đó tìm cách diễn đạt dễ hiểu hơn.

Không hy sinh tính đúng đắn để làm nội dung dễ đọc.

---

# Khuyến khích tư duy

Ưu tiên giúp người học hiểu nguyên lý.

Không khuyến khích học thuộc.

Không đưa ra kết luận mà không giải thích lý do.

---

# Thuật ngữ

Sử dụng thuật ngữ nhất quán trong toàn bộ Repository.

Khi xuất hiện thuật ngữ lần đầu:

- Giữ nguyên thuật ngữ tiếng Anh.
- Giải thích bằng tiếng Việt.

Ví dụ:

StateFlow (Luồng trạng thái)

Sau đó có thể sử dụng trực tiếp thuật ngữ tiếng Anh.

---

# Ngôn ngữ

Toàn bộ nội dung được viết bằng tiếng Việt.

Tên công nghệ, API, framework, class và thuật ngữ chuyên ngành giữ nguyên tiếng Anh.

Không dịch các tên riêng hoặc thuật ngữ đã được sử dụng phổ biến trong ngành.

---

# Không giả định kiến thức

Không giả định người học đã biết các khái niệm liên quan.

Nếu một nội dung yêu cầu kiến thức nền, hãy chỉ rõ hoặc liên kết tới Topic tiên quyết.

---

# Không lặp lại kiến thức

Nếu một nội dung đã được giải thích ở Topic khác, hãy tham chiếu thay vì sao chép.

Một khái niệm chỉ nên có một nơi giải thích đầy đủ.

---

# Mục tiêu cuối cùng

Mọi bài viết cần giúp người học:

- Hiểu bản chất.
- Hiểu mối liên hệ.
- Biết cách áp dụng.
- Biết giới hạn của kiến thức.
- Có khả năng tự mở rộng sau khi học.

Viết để xây dựng tư duy, không chỉ để truyền đạt thông tin.