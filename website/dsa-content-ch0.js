/* ============================================================
   Knowledge OS — DSA Module: Lời nói đầu (Preface)
   ============================================================ */

Object.assign(DSA_CONTENT, {

  'dsa-about-book': {
    title: 'Về cuốn sách (About This Book)',
    summary: 'Mục tiêu của dự án mã nguồn mở Hello Algo, đối tượng hướng đến và cấu trúc nội dung của toàn bộ tài liệu học cấu trúc dữ liệu và thuật toán.',
    tags: ['dsa', 'hello-algo', 'introduction'],
    domain: 'Algorithms',
    module: 'Lời nói đầu',
    prerequisites: [],
    related: ['dsa-suggestions'],
    updatedAt: '2026-07-18',
    readTime: '5 phút',
    content: `
<h2>Mục tiêu của dự án</h2>
<p>Dự án này hướng đến việc tạo ra một tài liệu hướng dẫn mã nguồn mở, miễn phí và cực kỳ thân thiện cho người mới bắt đầu học Cấu trúc Dữ liệu và Thuật toán (DSA).</p>
<ul>
  <li>Sử dụng hình minh họa động xuyên suốt cuốn sách, biến những khái niệm trừu tượng trở nên dễ hình dung.</li>
  <li>Cung cấp mã nguồn có thể chạy được với 1 click chuột, giúp người đọc vừa học vừa thực hành.</li>
  <li>Tạo ra một cộng đồng thảo luận và cùng nhau tiến bộ.</li>
</ul>

<h2>Đối tượng độc giả</h2>
<p>Nếu bạn là <strong>người mới hoàn toàn</strong> chưa từng học thuật toán, hay đã có chút kinh nghiệm giải bài tập nhưng kiến thức vẫn còn mơ hồ, cuốn sách này được thiết kế riêng cho bạn!</p>
<p>Nếu bạn đã là một "lão làng" về thuật toán, cuốn sách này đóng vai trò như một quyển từ điển tra cứu nhanh. Chúng tôi cũng rất mong nhận được những đóng góp từ bạn để dự án ngày càng hoàn thiện hơn.</p>

<div class="callout callout-success">
  <span class="callout-icon">✅</span>
  <div class="callout-body">
    <p><strong>Yêu cầu tiên quyết:</strong> Bạn chỉ cần nắm được kiến thức lập trình cơ bản của ít nhất một ngôn ngữ (như cách khai báo biến, vòng lặp, câu lệnh điều kiện) là có thể bắt đầu hành trình này.</p>
  </div>
</div>

<h2>Cấu trúc nội dung</h2>
<p>Nội dung của hệ thống được chia làm 3 mảng chính:</p>
<ol>
  <li><strong>Đánh giá độ phức tạp (Complexity Analysis):</strong> Hiểu về Big-O, độ phức tạp Thời gian và Không gian. Đây là thước đo hiệu năng của mọi thuật toán.</li>
  <li><strong>Cấu trúc dữ liệu (Data Structures):</strong> Các cách tổ chức dữ liệu trong bộ nhớ (Mảng, Danh sách liên kết, Stack, Queue, Tree, Heap, Graph, Hash Table).</li>
  <li><strong>Thuật toán (Algorithms):</strong> Các phương pháp giải quyết bài toán (Tìm kiếm, Sắp xếp, Chia để trị, Quay lui, Quy hoạch động, Tham lam).</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/hello_algo_mindmap.png" alt="Sơ đồ tư duy nội dung cuốn sách" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>Lời cảm ơn</h2>
<p>Cuốn sách này là công sức đóng góp không ngừng nghỉ của hàng trăm lập trình viên trên toàn cầu. Một lời cảm ơn sâu sắc tới tất cả những ai đã dành thời gian và tâm huyết để rà soát code, dịch thuật sang nhiều ngôn ngữ, và phát triển công cụ tự động hóa.</p>
`,
    originalContent: `
# About This Book
Target Audience: Beginners to DSA, or experienced folks needing a quick reference.
Prerequisites: Basic programming knowledge in at least one language.
Structure: Complexity Analysis, Data Structures, Algorithms.
Acknowledgements to open-source contributors.
`
  },

  'dsa-suggestions': {
    title: 'Hướng dẫn sử dụng hiệu quả (Suggestions)',
    summary: 'Các quy ước trình bày, cách học bằng hình ảnh động, tầm quan trọng của thực hành viết code và lộ trình học tập tối ưu.',
    tags: ['dsa', 'hello-algo', 'study-guide'],
    domain: 'Algorithms',
    module: 'Lời nói đầu',
    prerequisites: ['dsa-about-book'],
    related: ['dsa-preface-summary'],
    updatedAt: '2026-07-18',
    readTime: '7 phút',
    content: `
<h2>Quy ước trình bày</h2>
<ul>
  <li>Các phần có dấu <code>*</code> ở tiêu đề là phần nâng cao (có thể bỏ qua trong lần đọc đầu tiên).</li>
  <li>Các thuật ngữ quan trọng sẽ được <strong>in đậm</strong>.</li>
  <li>Dự án này mặc định sử dụng quy ước của Python khi giải thích khái niệm (ví dụ: dùng <code>None</code> để chỉ giá trị rỗng).</li>
</ul>

<h2>Học qua hình ảnh động</h2>
<p>So với việc chỉ đọc chữ, hình ảnh động (Animation) mang lại mật độ thông tin cao hơn và dễ hiểu hơn rất nhiều. Trong toàn bộ hệ thống này, <strong>các khái niệm trọng tâm đều được biểu diễn bằng hình ảnh / hoạt ảnh</strong>.</p>
<p>Hãy xem hình ảnh là nguồn giải nghĩa <strong>chính</strong>, còn chữ viết chỉ là phần bổ sung. Cố gắng quan sát từng khung hình để hiểu cơ chế hoạt động của thuật toán trước khi nhảy vào đọc code.</p>

<h2>Thực hành là cốt lõi</h2>
<p>Tuyệt đối không nên học thuật toán chỉ bằng cách "đọc chay". Hãy clone mã nguồn về máy, đặt breakpoint, và chạy thử. Nếu có thời gian, <strong>hãy tự gõ lại từng dòng code</strong>. Cảm giác debug và tìm ra lỗi sai của chính mình mới thực sự là lúc bạn "giác ngộ" thuật toán.</p>
<div class="callout callout-info">
  <span class="callout-icon">💻</span>
  <div class="callout-body">
    <p>Bạn có thể sử dụng Code Tabs trong mỗi bài học để xem cách triển khai bằng Python. Đừng quên chuẩn bị một môi trường lập trình local (như VS Code + Python/Java/C++) để tự chạy thử nghiệm.</p>
  </div>
</div>

<h2>Lộ trình học tập DSA</h2>
<p>Hành trình làm chủ cấu trúc dữ liệu và thuật toán thường trải qua 3 giai đoạn:</p>
<ol>
  <li><strong>Giai đoạn 1: Làm quen (Tài liệu này).</strong> Tìm hiểu về các cấu trúc dữ liệu cơ bản, hiểu cách thuật toán vận hành và đánh giá độ phức tạp.</li>
  <li><strong>Giai đoạn 2: Luyện tập giải bài.</strong> Bắt đầu giải các bài toán trên LeetCode, Codeforces. Hãy đặt mục tiêu giải 100 bài đầu tiên. Đừng nản lòng nếu bạn hay quên cách giải, đó là hiện tượng bình thường. Cứ lặp lại (theo đường cong lãng quên Ebbinghaus), kiến thức sẽ ăn sâu vào não bộ.</li>
  <li><strong>Giai đoạn 3: Xây dựng hệ thống tri thức.</strong> Đọc thêm các bài viết chuyên sâu, học các Pattern (khuôn mẫu) giải quyết bài toán. Thử nghiệm "1 bài nhiều cách giải" hoặc "1 cách giải áp dụng cho nhiều bài".</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/learning_route.png" alt="Lộ trình học tập" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
`,
    originalContent: `
# How to Use This Book
Conventions: * means optional. Bold for keywords.
Animations are primary, text is secondary.
Practice is key. Type out the code yourself.
Learning Route: 1) Introduction (this book), 2) Problem solving (e.g. LeetCode), 3) Knowledge system building.
`
  },

  'dsa-preface-summary': {
    title: 'Tóm tắt (Preface Summary)',
    summary: 'Điểm lại các thông điệp chính từ phần mở đầu của dự án Hello Algo.',
    tags: ['dsa', 'summary'],
    domain: 'Algorithms',
    module: 'Lời nói đầu',
    prerequisites: ['dsa-suggestions'],
    related: ['dsa-complexity-concept'],
    updatedAt: '2026-07-18',
    readTime: '2 phút',
    content: `
<h2>Tóm lược Lời nói đầu</h2>
<ul>
  <li><strong>Đối tượng:</strong> Cuốn sách này hướng đến người mới bắt đầu. Sự kết hợp giữa hình ảnh động và code thực hành giúp giảm bớt rào cản khi tiếp cận môn học khó nhằn này.</li>
  <li><strong>Nội dung:</strong> Gồm 3 phần: Độ phức tạp, Cấu trúc dữ liệu, và Thuật toán.</li>
  <li><strong>Cách học:</strong> Ưu tiên quan sát hình ảnh động để hiểu bản chất trước. Bắt buộc phải thực hành gõ code.</li>
  <li><strong>Tiến trình:</strong> Hệ thống tri thức này tương đương với <strong>Giai đoạn 1</strong> trong lộ trình học. Sau khi hoàn thành, bạn đã sẵn sàng để tiến tới Giai đoạn 2: cày cuốc trên các nền tảng giải thuật (LeetCode, HackerRank,...).</li>
</ul>
<div class="callout callout-note">
  <span class="callout-icon">🚀</span>
  <div class="callout-body">
    <p>Bạn đã sẵn sàng bước vào thế giới của Thuật toán chưa? Hãy tiếp tục với <strong>Chương 2: Đánh giá độ phức tạp</strong> ngay nhé!</p>
  </div>
</div>
`,
    originalContent: `
# Summary
Main audience is beginners.
Content covers complexity, data structures, algorithms.
Practice is the best way to learn programming. Run the source code and type it yourself.
`
  }

});
