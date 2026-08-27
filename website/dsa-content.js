/* ============================================================
   Knowledge OS — DSA Module Content
   ============================================================ */

const DSA_CONTENT = {
  'dsa-encounter': {
    title: 'Gặp gỡ Giải thuật',
    summary: 'Lời giới thiệu dẫn dắt người học bước vào thế giới giải thuật đầy ắp tính logic và vẻ đẹp tinh tế.',
    tags: ['dsa', 'intro'],
    domain: 'Algorithms',
    module: 'Chương 1: Làm quen với Giải thuật',
    prerequisites: [],
    related: ['dsa-everywhere'],
    updatedAt: '2026-07-16',
    readTime: '2 phút',
    content: `
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/chapter_introduction.jpg" alt="Gặp gỡ Giải thuật" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<div class="callout callout-note">
  <span class="callout-icon">✨</span>
  <div class="callout-body">
    <p>Một cô bé nhảy múa uyển chuyển, hòa quyện cùng các dòng dữ liệu, tà váy của cô bay bổng theo giai điệu của các giải thuật.</p>
    <p>Cô ấy mời bạn cùng nhảy múa. Hãy theo sát từng bước chân của cô và bước vào thế giới giải thuật đầy ắp tính logic và vẻ đẹp tinh tế.</p>
  </div>
</div>
`,
    originalContent: `
# Encounter with Algorithms

![Encounter with Algorithms](../assets/covers/chapter_introduction.jpg)

!!! abstract

    A young girl dances gracefully, intertwined with data, her skirt flowing with the melody of algorithms.

    She invites you to dance with her. Follow her steps closely and enter the world of algorithms, full of logic and beauty.
`
  },
  'dsa-what-is': {
    title: '1.2 Cấu trúc dữ liệu & Giải thuật là gì',
    summary: 'Định nghĩa cơ bản về Giải thuật (Algorithm) và Cấu trúc dữ liệu (Data Structure), mối quan hệ mật thiết giữa chúng và bài học về sự đánh đổi (Trade-off) trong thiết kế.',
    tags: ['dsa', 'intro'],
    domain: 'Algorithms',
    module: 'Chương 1: Làm quen với Giải thuật',
    prerequisites: ['dsa-everywhere'],
    related: ['dsa-intro-summary'],
    updatedAt: '2026-07-16',
    readTime: '5 phút',
    content: `
<h2>1.2.1 Định nghĩa Giải thuật (Algorithm)</h2>
<p>Một <strong>Giải thuật (Algorithm)</strong> là một tập hợp các chỉ thị hoặc các bước thao tác nhằm giải quyết một bài toán cụ thể trong một lượng thời gian hữu hạn. Một giải thuật tiêu chuẩn cần đáp ứng ba đặc điểm chính:</p>
<ul>
  <li><strong>Bài toán được xác định rõ ràng:</strong> Có định nghĩa rõ ràng về dữ liệu đầu vào (Input) và kết quả mong muốn đầu ra (Output).</li>
  <li><strong>Tính khả thi:</strong> Có thể hoàn thành trong số bước, lượng thời gian và dung lượng bộ nhớ hữu hạn.</li>
  <li><strong>Tính xác định:</strong> Mỗi bước có ý nghĩa rõ ràng và nhất quán. Dưới cùng một điều kiện đầu vào và vận hành, giải thuật luôn cho ra một kết quả đầu ra giống nhau.</li>
</ul>

<h2>1.2.2 Định nghĩa Cấu trúc dữ liệu (Data Structure)</h2>
<p>Một <strong>Cấu trúc dữ liệu (Data Structure)</strong> là một phương thức tổ chức và lưu trữ dữ liệu trong máy tính, bao gồm bản thân dữ liệu, mối quan hệ giữa các phần tử dữ liệu và các hàm/phương thức hoạt động trên chúng. Các cấu trúc dữ liệu được thiết kế nhằm đạt được các mục tiêu sau:</p>
<ul>
  <li><strong>Tối ưu không gian:</strong> Chiếm dụng bộ nhớ (RAM/Disk) ít nhất có thể.</li>
  <li><strong>Tối ưu tốc độ thao tác:</strong> Các hành vi truy cập (Access), thêm (Insert), xóa (Delete), cập nhật (Update) phải diễn ra nhanh nhất có thể.</li>
  <li><strong>Biểu diễn logic rõ ràng:</strong> Cung cấp cấu trúc thông tin trực quan giúp các giải thuật vận hành một cách hiệu quả.</li>
</ul>

<div class="callout callout-warn">
  <span class="callout-icon">⚠️</span>
  <div class="callout-body">
    <strong>Thiết kế Cấu trúc dữ liệu là một quá trình đánh đổi (Trade-off) liên tục:</strong>
    Không có cấu trúc dữ liệu nào là tối ưu cho mọi bài toán. Khi cải tiến ở khía cạnh này, chúng ta thường phải chấp nhận thỏa hiệp ở khía cạnh khác.
    <ul>
      <li><strong>Array (Mảng) vs. Linked List (Danh sách liên kết):</strong> Linked List cho phép thêm và xóa phần tử cực kỳ nhanh chóng nhưng phải hy sinh tốc độ truy cập ngẫu nhiên (Random Access) siêu nhanh của Array.</li>
      <li><strong>Linked List vs. Graph (Đồ thị):</strong> Graph biểu diễn các mối quan hệ logic phức tạp, đa chiều hơn nhiều so với Linked List nhưng đòi hỏi dung lượng bộ nhớ lớn hơn rất nhiều để lưu các đỉnh và cạnh.</li>
    </ul>
  </div>
</div>

<h2>1.2.3 Mối quan hệ hữu cơ giữa Cấu trúc dữ liệu và Giải thuật</h2>
<p>Cấu trúc dữ liệu và giải thuật luôn gắn bó khăng khít và bổ trợ cho nhau:</p>
<ul>
  <li><strong>Cấu trúc dữ liệu là nền tảng:</strong> Nó cung cấp cho giải thuật các khối thông tin được tổ chức sẵn và các phương thức thao tác cơ bản.</li>
  <li><strong>Giải thuật thổi hồn vào cấu trúc dữ liệu:</strong> Bản thân cấu trúc dữ liệu chỉ là các ngăn chứa thông tin tĩnh; giải thuật mang đến logic điều khiển, vận hành thông tin để tạo ra lời giải cho bài toán.</li>
  <li><strong>Mối quan hệ hiệu năng:</strong> Cùng một giải thuật có thể hoạt động trên nhiều cấu trúc dữ liệu khác nhau, nhưng lựa chọn cấu trúc dữ liệu phù hợp chính là chìa khóa để giải quyết bài toán hiệu quả nhất.</li>
</ul>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/relationship_between_data_structure_and_algorithm.png" alt="Mối quan hệ giữa cấu trúc dữ liệu và giải thuật" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>1.2.3.1 Phép ẩn dụ: Trò chơi lắp ráp Lego</h3>
<p>Chúng ta có thể hình dung Cấu trúc dữ liệu và Giải thuật giống như bộ trò chơi lắp ráp Lego. Ngoài các mảnh ghép nhiều hình thù khác nhau (các khối dữ liệu), bộ đồ chơi luôn đi kèm một cuốn sách hướng dẫn chi tiết từng bước lắp ráp (giải thuật). Làm theo hướng dẫn, ta sẽ thu được mô hình đẹp mắt.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/assembling_blocks.png" alt="Lắp ráp Lego" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<table style="width:100%; border-collapse:collapse; font-size:14px; margin:1.5em 0; border: 1px solid var(--border-color);">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Cấu trúc dữ liệu & Giải thuật</th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Trò chơi lắp ráp Lego</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">Dữ liệu đầu vào (Input data)</td>
      <td style="padding:10px 15px; color:var(--text-muted);">Các mảnh ghép rời rạc nằm trong hộp</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">Cấu trúc dữ liệu (Data structure)</td>
      <td style="padding:10px 15px; color:var(--text-muted);">Hình dáng, kích thước và cơ chế khớp nối giữa các mảnh ghép</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">Giải thuật (Algorithm)</td>
      <td style="padding:10px 15px; color:var(--text-muted);">Từng bước hướng dẫn lắp ráp ghi trong sách hướng dẫn</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">Dữ liệu đầu ra (Output data)</td>
      <td style="padding:10px 15px; color:var(--text-muted);">Mô hình hoàn chỉnh cuối cùng</td>
    </tr>
  </tbody>
</table>

<div class="callout callout-note">
  <span class="callout-icon">ℹ️</span>
  <div class="callout-body">
    Cấu trúc dữ liệu và giải thuật hoàn toàn độc lập với các ngôn ngữ lập trình cụ thể. Đây là lý do tại sao kiến thức cốt lõi này luôn đúng cho dù bạn viết code bằng Python, Java, C++, Kotlin hay JavaScript.
  </div>
</div>

<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <strong>Cách gọi rút gọn thông dụng:</strong> Trong các cuộc thảo luận thực tế, chúng ta thường rút gọn cụm từ "Cấu trúc dữ liệu và Giải thuật" thành "Giải thuật". Ví dụ, các bài toán giải thuật nổi tiếng trên LeetCode thực chất đang kiểm tra kiến thức của cả hai mảng: cấu trúc dữ liệu lẫn giải thuật.
  </div>
</div>
`,
    originalContent: `
# What Is an Algorithm

## Algorithm Definition

An <u>algorithm</u> is a set of instructions or operational steps that solves a specific problem within a finite amount of time. It has the following characteristics.

- The problem is well-defined, with clear input and output definitions.
- It is feasible and can be completed with finite steps, time, and memory.
- Each step has a definite meaning, and under the same input and operating conditions, the output is always the same.

## Data Structure Definition

A <u>data structure</u> is a way of organizing and storing data, including the data itself, the relationships between data elements, and the methods used to operate on them. It has the following design objectives.

- Occupy as little space as possible to save computer memory.
- Data operations should be as fast as possible, covering data access, addition, deletion, update, etc.
- Provide a concise data representation and logical information so that algorithms can run efficiently.

**Data structure design is a process full of trade-offs**. If we want to achieve improvements in one aspect, we often need to make compromises in another aspect. Here are two examples.

- Compared to arrays, linked lists are more convenient for data addition and deletion operations but sacrifice data access speed.
- Compared to linked lists, graphs provide richer logical information but require larger memory space.

## The Relationship Between Data Structures and Algorithms

As shown in the figure below, data structures and algorithms are highly related and tightly coupled, specifically manifested in the following three aspects.

- Data structures are the foundation of algorithms. Data structures provide algorithms with structured storage of data and methods for operating on data.
- Algorithms breathe life into data structures. Data structures themselves only store data information; combined with algorithms, they can solve specific problems.
- Algorithms can usually be implemented based on different data structures, but execution efficiency may vary greatly. Choosing the appropriate data structure is key.

![The relationship between data structures and algorithms](what_is_dsa.assets/relationship_between_data_structure_and_algorithm.png)

Data structures and algorithms are like assembling building blocks as shown in the figure below. A set of building blocks, in addition to containing many parts, also comes with detailed assembly instructions. By following the instructions step by step, we can assemble an exquisite building block model.

![Assembling blocks](what_is_dsa.assets/assembling_blocks.png)

The detailed correspondence between the two is shown in the table below.

<p align="center"> Table <id> &nbsp; Comparing data structures and algorithms to assembling building blocks </p>

| Data structures and algorithms | Assembling building blocks                                        |
| ------------------------------ | ------------------------------------------------------------------ |
| Input data                     | Unassembled building blocks                                        |
| Data structure                 | Organization form of building blocks, including shape, size, connection method, etc. |
| Algorithm                      | A series of operational steps to assemble the blocks into the target form |
| Output data                    | Building block model                                               |

It is worth noting that data structures and algorithms are independent of programming languages. That is why this book can provide implementations in multiple programming languages.

!!! tip "Conventional abbreviation"

    In actual discussions, we usually abbreviate "data structures and algorithms" as "algorithms". For example, the well-known LeetCode algorithm problems actually examine knowledge of both data structures and algorithms.
`
  },
  'dsa-everywhere': {
    title: '1.1 Giải thuật ở khắp mọi nơi',
    summary: 'Khám phá cách chúng ta vô tình sử dụng các giải thuật kinh điển như Tìm kiếm nhị phân (Binary Search), Sắp xếp chèn (Insertion Sort) và Tham lam (Greedy) trong cuộc sống hàng ngày.',
    tags: ['dsa', 'intro'],
    domain: 'Algorithms',
    module: 'Chương 1: Làm quen với Giải thuật',
    prerequisites: ['dsa-encounter'],
    related: ['dsa-what-is'],
    updatedAt: '2026-07-16',
    readTime: '5 phút',
    content: `
<p>Khi nghe thuật ngữ <strong>Algorithm (Giải thuật)</strong>, chúng ta thường nghĩ ngay đến toán học phức tạp. Tuy nhiên, rất nhiều giải thuật thực chất chỉ dựa trên logic cơ bản và xuất hiện ở mọi ngóc ngách trong cuộc sống hàng ngày của chúng ta.</p>
<p>Có một sự thật thú vị: <strong>Bạn đã học và áp dụng rất nhiều giải thuật mà không hề nhận ra.</strong> Hãy cùng điểm qua ba ví dụ thực tế dưới đây để thấy giải thuật gần gũi như thế nào.</p>

<h2>1.1.1 Ví dụ 1: Tra cứu từ điển giấy (Tìm kiếm nhị phân - Binary Search)</h2>
<p>Trong một cuốn từ điển giấy tiếng Anh, các từ được sắp xếp theo thứ tự bảng chữ cái. Giả sử bạn cần tìm một từ bắt đầu bằng chữ cái <strong>R</strong>. Bạn sẽ làm thế nào?</p>
<ol>
  <li>Mở từ điển ở khoảng giữa và xem từ đầu tiên của trang đó; giả sử từ đó bắt đầu bằng chữ cái <strong>M</strong>.</li>
  <li>Vì chữ <strong>R</strong> đứng sau <strong>M</strong> trong bảng chữ cái, bạn có thể bỏ qua hoàn toàn nửa đầu cuốn từ điển và thu hẹp phạm vi tìm kiếm vào nửa sau.</li>
  <li>Lặp lại bước 1 và 2 đối với nửa sau cuốn sách cho đến khi bạn tìm thấy đúng trang chứa từ bắt đầu bằng chữ <strong>R</strong>.</li>
</ol>

<div class="interactive-widget-wrapper" id="binary-search-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'binary-search-wrapper', 'tab-images')">📸 Minh họa từng bước</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'binary-search-wrapper', 'tab-interactive'); initBinarySearchDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  
  <div class="widget-tab-content active" data-tab="tab-images">
    <div class="slider-container">
      <div class="slider-slides">
        <div class="slide active" data-step="1">
          <img src="dsa-assets/binary_search_dictionary_step1.png" alt="Bước 1" />
          <p class="slide-caption"><strong>Bước 1:</strong> Mở từ điển ở giữa (trang chữ M). R đứng sau M, loại bỏ nửa bên trái (A-M).</p>
        </div>
        <div class="slide" data-step="2">
          <img src="dsa-assets/binary_search_dictionary_step2.png" alt="Bước 2" />
          <p class="slide-caption"><strong>Bước 2:</strong> Tìm tiếp ở nửa sau. Mở giữa (trang chữ T). R đứng trước T, loại bỏ nửa bên phải (T-Z).</p>
        </div>
        <div class="slide" data-step="3">
          <img src="dsa-assets/binary_search_dictionary_step3.png" alt="Bước 3" />
          <p class="slide-caption"><strong>Bước 3:</strong> Mở trang ở giữa phân đoạn còn lại (trang chữ P). R đứng sau P, loại bỏ nửa bên trái (P-Q).</p>
        </div>
        <div class="slide" data-step="4">
          <img src="dsa-assets/binary_search_dictionary_step4.png" alt="Bước 4" />
          <p class="slide-caption"><strong>Bước 4:</strong> Mở trang ở giữa phân đoạn còn lại (trang chữ R). Đã tìm thấy đúng chữ R!</p>
        </div>
        <div class="slide" data-step="5">
          <img src="dsa-assets/binary_search_dictionary_step5.png" alt="Bước 5" />
          <p class="slide-caption"><strong>Kết quả:</strong> Bằng cách chia đôi phạm vi tìm kiếm ở mỗi bước, ta tìm ra trang cần tìm rất nhanh chóng.</p>
        </div>
      </div>
      <div class="slider-controls">
        <button class="slider-btn" onclick="prevSlide('binary-search-wrapper')">◀ Trước</button>
        <span class="slider-indicator">Bước 1 / 5</span>
        <button class="slider-btn" onclick="nextSlide('binary-search-wrapper')">Sau ▶</button>
      </div>
    </div>
  </div>
  
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div class="dictionary-simulator">
      <p style="margin-bottom: 12px; font-size: 14px;"><strong>Nhiệm vụ:</strong> Tìm chữ cái <span id="bs-target-char" style="color: var(--accent-rose); font-weight: bold; font-size: 18px;">R</span> trong bảng chữ cái bên dưới bằng cách chia đôi.</p>
      
      <div class="letters-grid" id="bs-letters-container">
        <!-- Nạp động bằng JS -->
      </div>
      
      <div class="simulator-controls" style="margin-top: 15px; display: flex; gap: 10px; justify-content: center;">
        <button class="control-btn" id="bs-btn-prev" onclick="stepBinarySearchDemo('prev')" disabled>◀ Quay lại</button>
        <button class="control-btn" id="bs-btn-next" onclick="stepBinarySearchDemo('next')">Chia đôi tiếp theo ▶</button>
        <button class="control-btn btn-secondary" onclick="initBinarySearchDemo()">Reset</button>
      </div>
      <div class="simulator-status" id="bs-status-text" style="margin-top: 12px; font-size: 14px; text-align: center; color: var(--text-secondary);">
        Nhấp "Chia đôi tiếp theo" để bắt đầu chia đôi.
      </div>
    </div>
  </div>
</div>

<p>Hành động tra cứu từ điển quen thuộc này chính là giải thuật <strong>Binary Search (Tìm kiếm nhị phân)</strong> nổi tiếng.
<ul>
  <li>Ở góc độ <strong>Cấu trúc dữ liệu:</strong> Cuốn từ điển đóng vai trò là một <strong>Array (Mảng)</strong> đã được sắp xếp thứ tự.</li>
  <li>Ở góc độ <strong>Giải thuật:</strong> Các bước thu hẹp phạm vi tìm kiếm chính là giải thuật <strong>Tìm kiếm nhị phân</strong>.</li>
</ul>
</p>

<h2>1.1.2 Ví dụ 2: Sắp xếp quân bài trên tay (Sắp xếp chèn - Insertion Sort)</h2>
<p>Khi chơi bài tây, để dễ nhìn, chúng ta thường sắp xếp các quân bài trên tay theo thứ tự tăng dần:</p>
<ol>
  <li>Chia các quân bài thành hai phần: phần <strong>đã sắp xếp</strong> (bên trái) và phần <strong>chưa sắp xếp</strong> (bên phải). Ban đầu, coi quân bài ngoài cùng bên trái đã được sắp xếp.</li>
  <li>Rút một quân bài từ phần chưa sắp xếp, so sánh và chèn nó vào vị trí thích hợp trong phần đã sắp xếp.</li>
  <li>Lặp lại bước 2 cho đến khi không còn quân bài nào ở phần chưa sắp xếp.</li>
</ol>

<div class="interactive-widget-wrapper" id="insertion-sort-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'insertion-sort-wrapper', 'tab-static')">📸 Ảnh minh họa</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'insertion-sort-wrapper', 'tab-interactive'); initInsertionSortDemo()">⚡ Mô phỏng sắp xếp</button>
  </div>
  
  <div class="widget-tab-content active" data-tab="tab-static">
    <div style="text-align: center; margin: 1em 0;">
      <img src="dsa-assets/playing_cards_sorting.png" alt="Sắp xếp quân bài" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
    </div>
  </div>
  
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div class="card-simulator">
      <p style="margin-bottom: 12px; font-size: 14px;">Mô phỏng sắp xếp bộ bài <code>[5, 2, 9, 1, 6]</code> tăng dần bằng <strong>Insertion Sort</strong>.</p>
      
      <div class="cards-container" id="is-cards-container" style="display: flex; justify-content: center; gap: 12px; margin: 20px 0; height: 110px; align-items: flex-end;">
        <!-- Nạp động bằng JS -->
      </div>
      
      <div class="simulator-controls" style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;">
        <button class="control-btn" id="is-btn-step" onclick="stepInsertionSortDemo()">Rút và chèn quân tiếp theo ▶</button>
        <button class="control-btn btn-secondary" onclick="initInsertionSortDemo()">Reset</button>
      </div>
      <div class="simulator-status" id="is-status-text" style="margin-top: 12px; font-size: 14px; text-align: center; color: var(--text-secondary);">
        Nhấp "Rút và chèn quân tiếp theo" để thực hiện sắp xếp từng bước.
      </div>
    </div>
  </div>
</div>

<p>Quy trình sắp xếp quân bài này chính là nguyên lý của giải thuật <strong>Insertion Sort (Sắp xếp chèn)</strong>. Đây là một giải thuật cực kỳ hiệu quả đối với các tập dữ liệu nhỏ và thường được sử dụng làm lõi tối ưu hóa trong các hàm sắp xếp tích hợp của nhiều ngôn ngữ lập trình.</p>

<h2>1.1.3 Ví dụ 3: Thối tiền thừa siêu thị (Giải thuật tham lam - Greedy Algorithm)</h2>
<p>Giả sử bạn mua hàng hết 69.000đ tại siêu thị. Bạn đưa cho thu ngân tờ 100.000đ, họ cần thối lại cho bạn 31.000đ. Quy trình thối tiền thường diễn ra như sau:</p>
<ol>
  <li>Các mệnh giá tiền nhỏ hơn 31.000đ hiện có là: 20.000đ, 10.000đ, 5.000đ, 2.000đ, 1.000đ.</li>
  <li>Thu ngân rút tờ tiền có mệnh giá lớn nhất có thể và nhỏ hơn 31.000đ, đó là tờ <strong>20.000đ</strong> (còn thiếu 31.000đ - 20.000đ = 11.000đ).</li>
  <li>Tiếp tục chọn tờ tiền lớn nhất có thể cho số tiền còn thiếu, đó là tờ <strong>10.000đ</strong> (còn thiếu 11.000đ - 10.000đ = 1.000đ).</li>
  <li>Chọn tờ tiền lớn nhất có thể tiếp theo, đó là tờ <strong>1.000đ</strong> (còn thiếu 1.000đ - 1.000đ = 0đ).</li>
  <li>Hoàn tất quá trình thối tiền với kết quả gồm: 1 tờ 20.000đ, 1 tờ 10.000đ và 1 tờ 1.000đ.</li>
</ol>

<div class="interactive-widget-wrapper" id="greedy-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'greedy-wrapper', 'tab-static')">📸 Ảnh minh họa</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'greedy-wrapper', 'tab-interactive')">⚡ Máy tính thối tiền lẻ</button>
  </div>
  
  <div class="widget-tab-content active" data-tab="tab-static">
    <div style="text-align: center; margin: 1em 0;">
      <img src="dsa-assets/greedy_change.png" alt="Thối tiền thừa siêu thị" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
    </div>
  </div>
  
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div class="greedy-simulator" style="text-align: center;">
      <div style="display: flex; gap: 10px; margin-bottom: 15px; justify-content: center; align-items: center; flex-wrap: wrap;">
        <label for="greedy-amount-input" style="font-size: 14px; font-weight: 500;">Nhập số tiền cần thối (1 - 99 nghìn):</label>
        <input type="number" id="greedy-amount-input" value="31" min="1" max="99" style="width: 70px; padding: 6px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: var(--bg-overlay); color: var(--text-primary); text-align: center; font-size: 14px;" />
        <button class="control-btn" onclick="runGreedyDemo()">Thối tiền lẻ</button>
      </div>
      
      <div id="greedy-result-receipt" class="receipt-container" style="background: rgba(255, 255, 255, 0.02); border: 1px dashed var(--border); border-radius: var(--radius-md); padding: 15px; max-width: 320px; margin: 15px auto 0 auto; display: none; text-align: left;">
        <!-- Nạp động bằng JS -->
      </div>
    </div>
  </div>
</div>

<p>Bằng cách luôn chọn phương án tốt nhất ở mỗi bước nhỏ (rút mệnh giá lớn nhất có thể), chúng ta thu được kết quả tối ưu cho toàn bộ bài toán. Trong lập trình, cách tiếp cận này được gọi là <strong>Greedy Algorithm (Giải thuật tham lam)</strong>.</p>

<h2>1.1.4 Từ Đời sống vào Máy tính</h2>
<p>Từ việc nấu ăn theo công thức đến việc phóng tàu vũ trụ, hầu hết mọi quy trình giải quyết vấn đề đều liên quan đến giải thuật. Nhờ có máy tính, chúng ta có thể lưu trữ các cấu trúc dữ liệu trong bộ nhớ (RAM) và viết mã nguồn (Code) điều khiển CPU/GPU thực thi các giải thuật. Điều này cho phép con người số hóa và giải quyết các vấn đề phức tạp trong đời sống thực tế với tốc độ cực nhanh và hiệu quả vượt trội.</p>

<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    Nếu bạn thấy các thuật ngữ như cấu trúc dữ liệu, giải thuật, mảng hay tìm kiếm nhị phân nghe vẫn còn mơ hồ, đừng lo lắng. Cuốn sách này sẽ dẫn dắt bạn từng bước nhỏ để làm quen và làm chủ chúng!
  </div>
</div>
`,
    originalContent: `
# Algorithms Are Everywhere

When we hear the term "algorithm," we naturally think of mathematics. However, many algorithms do not involve complex mathematics but rely more on basic logic, which can be seen everywhere in our daily lives.

Before we formally explore algorithms, here's an interesting fact worth sharing: **you have already learned many algorithms without realizing it, and you are used to applying them in daily life**. Let me give a few specific examples to illustrate this point.

**Example 1: Looking Up a Dictionary**. In an English dictionary, words are listed alphabetically. Assuming we're searching for a word that starts with the letter $r$, this is typically done in the following way:

1. Open the dictionary to about halfway and check the first word on that page; suppose it starts with the letter $m$.
2. Since $r$ comes after $m$ in the alphabet, the first half can be ignored and the search space is narrowed down to the second half.
3. Repeat steps \`1.\` and \`2.\` until you find the page where the word starts with $r$.

=== "<1>"
    ![Process of looking up a dictionary](algorithms_are_everywhere.assets/binary_search_dictionary_step1.png)

=== "<2>"
    ![Binary search in dictionary step 2](algorithms_are_everywhere.assets/binary_search_dictionary_step2.png)

=== "<3>"
    ![Binary search in dictionary step 3](algorithms_are_everywhere.assets/binary_search_dictionary_step3.png)

=== "<4>"
    ![Binary search in dictionary step 4](algorithms_are_everywhere.assets/binary_search_dictionary_step4.png)

=== "<5>"
    ![Binary search in dictionary step 5](algorithms_are_everywhere.assets/binary_search_dictionary_step5.png)

Looking up a dictionary, an essential skill for elementary school students is actually the famous "Binary Search" algorithm. From a data structure perspective, we can consider the dictionary as a sorted "array"; from an algorithmic perspective, the series of actions taken to look up a word in the dictionary can be viewed as the algorithm "Binary Search."

**Example 2: Organizing Playing Cards**. When playing cards, we need to arrange the cards in our hands in ascending order, as shown in the following process.

1. Divide the playing cards into "ordered" and "unordered" sections, assuming initially the leftmost card is already in order.
2. Take out a card from the unordered section and insert it into the correct position in the ordered section; after this, the leftmost two cards are in order.
3. Repeat step \`2\` until all cards are in order.

![Process of sorting a deck of cards](algorithms_are_everywhere.assets/playing_cards_sorting.png)

The above method of organizing playing cards is essentially the "Insertion Sort" algorithm, which is very efficient for small datasets. Many programming languages' built-in sorting implementations use insertion sort internally.

**Example 3: Making Change**. Assume making a purchase of $69$ at a supermarket. If you give the cashier $100$, they will need to provide you with $31$ in change. This process can be clearly understood as illustrated in the figure below.

1. The available denominations smaller than $31$ are $1$, $5$, $10$, and $20$.
2. Take out the largest $20$ from the options, leaving $31 - 20 = 11$.
3. Take out the largest $10$ from the remaining options, leaving $11 - 10 = 1$.
4. Take out the largest $1$ from the remaining options, leaving $1 - 1 = 0$.
5. Complete change-making, the solution is $20 + 10 + 1 = 31$.

![Process of making change](algorithms_are_everywhere.assets/greedy_change.png)

In the steps above, we choose what seems to be the best option at each stage by using the largest denomination available, which leads to an effective way to make change. From a data structures and algorithms perspective, this approach is known as a "Greedy" algorithm.

From cooking a meal to interstellar travel, almost all problem-solving involves algorithms. The advent of computers allows us to store data structures in memory and write code to call the CPU and GPU to execute algorithms. In this way, we can transfer real-life problems to computers and solve various complex issues in a more efficient way.

!!! tip

    If concepts such as data structures, algorithms, arrays, and binary search still feel only half-familiar, keep reading. This book will guide you into the world of data structures and algorithms.
`
  },
  'dsa-intro-summary': {
    title: '1.3 Tóm tắt & Hỏi đáp',
    summary: 'Tóm tắt kiến thức chương 1 và giải đáp thắc mắc về giá trị thực tế của việc học giải thuật đối với lập trình viên.',
    tags: ['dsa', 'intro'],
    domain: 'Algorithms',
    module: 'Chương 1: Làm quen với Giải thuật',
    prerequisites: ['dsa-what-is'],
    related: [],
    updatedAt: '2026-07-16',
    readTime: '6 phút',
    content: `
<h2>1.3.1 Tóm tắt Kiến thức Cốt lõi</h2>
<ul>
  <li><strong>Giải thuật hiện hữu quanh ta:</strong> Giải thuật không phải là kiến thức xa vời hay hàn lâm. Bạn đã và đang áp dụng chúng một cách vô thức để giải quyết các vấn đề thường nhật.</li>
  <li><strong>Tìm kiếm nhị phân (Binary Search):</strong> Bản chất của tra từ điển giấy chính là tìm kiếm nhị phân, thể hiện tư duy cốt lõi <strong>Chia để trị (Divide and Conquer)</strong>.</li>
  <li><strong>Sắp xếp chèn (Insertion Sort):</strong> Thao tác xếp bài tây tương tự giải thuật sắp xếp chèn, cực kỳ hiệu quả khi xử lý lượng dữ liệu nhỏ.</li>
  <li><strong>Giải thuật tham lam (Greedy Algorithm):</strong> Nguyên lý thối tiền lẻ siêu thị là giải thuật tham lam, luôn ưu tiên lựa chọn tối ưu nhất tại mỗi bước để đạt kết quả tốt nhất.</li>
  <li><strong>Định nghĩa cốt lõi:</strong> Giải thuật là một tập hợp các chỉ thị hoặc bước thao tác nhằm giải quyết một bài toán cụ thể trong một lượng thời gian hữu hạn, còn cấu trúc dữ liệu là cách thức tổ chức và lưu trữ dữ liệu trong máy tính.</li>
  <li><strong>Mối liên kết hữu cơ:</strong> Giải thuật là các bước hướng dẫn giải quyết bài toán, còn cấu trúc dữ liệu là cách tổ chức thông tin. Cấu trúc dữ liệu là nền tảng, giải thuật là phần hồn giúp dữ liệu "sống dậy" và tạo ra giá trị.</li>
  <li><strong>Phép ẩn dụ Lego:</strong> Dữ liệu là các viên gạch Lego, cách các viên gạch liên kết là cấu trúc dữ liệu, các bước lắp ghép là giải thuật, và mô hình hoàn thiện chính là sản phẩm đầu ra (Output).</li>
</ul>

<h2>1.3.2 Hỏi & Đáp (Q&A)</h2>
<p><strong>Hỏi: Là một lập trình viên, tôi hiếm khi phải tự viết các giải thuật này trong công việc hàng ngày. Hầu hết các giải thuật phổ biến đều đã được tối ưu và đóng gói sẵn trong thư viện của ngôn ngữ lập trình. Có phải công việc của tôi chưa đủ phức tạp để cần tới giải thuật?</strong></p>
<p><strong>Trả lời:</strong></p>
<p>Nếu chúng ta ví các kỹ năng công việc cụ thể (sử dụng framework, viết API, cấu hình database) là <strong>"chiêu thức"</strong> trong võ thuật, thì các môn cơ sở ngành như Cấu trúc dữ liệu & Giải thuật chính là <strong>"nội công"</strong>.</p>
<p>Ý nghĩa thực sự của việc học giải thuật không phải để bạn "tự phát minh lại bánh xe" (code lại từ đầu các thuật toán sắp xếp hay tìm kiếm), mà là để xây dựng <strong>tư duy phản biện và khả năng đưa ra quyết định kỹ thuật chính xác</strong> khi giải quyết vấn đề. Hãy xem một ví dụ đơn giản:</p>

<div class="callout callout-note">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <strong>Bài toán chọn thuật toán sắp xếp (Sort):</strong>
    Mọi ngôn ngữ lập trình đều cung cấp hàm sắp xếp tích hợp (built-in sort):
    <ul>
      <li><strong>Nếu không học giải thuật:</strong> Bạn chỉ đơn giản là truyền dữ liệu vào hàm sắp xếp đó. Chương trình chạy ổn, không có lỗi, và bạn hài lòng.</li>
      <li><strong>Nếu đã học giải thuật:</strong> Bạn biết rằng hàm sắp xếp mặc định thường có độ phức tạp thời gian trung bình là $O(n \\log n)$. Tuy nhiên, nếu dữ liệu của bạn có đặc thù riêng (ví dụ: danh sách mã số sinh viên hoặc số điện thoại có độ dài cố định), bạn có thể chọn áp dụng <strong>Radix Sort (Sắp xếp theo cơ số)</strong> để tối ưu thời gian chạy xuống $O(nk)$ (với $k$ là số chữ số). Khi lượng dữ liệu lên tới hàng triệu bản ghi, sự thay đổi này sẽ tiết kiệm lượng lớn tài nguyên CPU và cải thiện đáng kể trải nghiệm người dùng.</li>
    </ul>
  </div>
</div>

<p>Trong kỹ nghệ phần mềm, rất ít bài toán có đáp án hoàn hảo duy nhất, đa số chỉ dừng lại ở mức "đủ tốt" (trade-off). Độ khó của một bài toán phụ thuộc rất nhiều vào thế giới quan và chiều sâu kiến thức của người giải nó. Người có nền tảng tư duy giải thuật vững chắc sẽ luôn nhìn ra các góc khuất hiệu năng và đưa ra phương án thiết kế hệ thống thanh thoát hơn.</p>
`,
    originalContent: `
# Summary

### Key Review

- Algorithms are ubiquitous in daily life and are not some distant, esoteric body of knowledge. In fact, we have already learned many algorithms unconsciously and use them to solve problems big and small in life.
- The principle of looking up a dictionary is consistent with the binary search algorithm. Binary search embodies the important algorithmic idea of divide and conquer.
- The process of organizing playing cards is very similar to the insertion sort algorithm. Insertion sort is suitable for sorting small datasets.
- The steps of making change are essentially a greedy algorithm, where the best choice is made at each step based on the current situation.
- An algorithm is a set of instructions or operational steps that solves a specific problem within a finite amount of time, while a data structure is a way of organizing and storing data in a computer.
- Data structures and algorithms are closely connected. Data structures are the foundation of algorithms, and algorithms breathe life into data structures.
- We can compare data structures and algorithms to assembling building blocks. The blocks represent data, the way they are shaped and connected represents the data structure, and the steps used to assemble them correspond to the algorithm.

### Q & A

**Q**: As a programmer, I have never used algorithms to solve problems in my daily work. Common algorithms are already encapsulated by programming languages and can be used directly. Does this mean that the problems in our work have not yet reached the level where algorithms are needed?

If we compare specific work skills to "techniques" in martial arts, then fundamental subjects should be more like "internal skills".

I believe the significance of learning algorithms (and other fundamental subjects) is not that you will need to implement them from scratch at work, but that the knowledge you gain enables you to make sound professional judgments when solving problems, thereby improving the overall quality of your work. Here is a simple example. Every programming language has a built-in sorting function:

- If we have not studied data structures and algorithms, we might simply feed any given data to this sorting function. It runs smoothly with good performance, and there doesn't seem to be any problem.
- But if we have studied algorithms, we would know that the time complexity of the built-in sorting function is $O(n \\log n)$. However, if the given data consists of integers with a fixed number of digits (such as student IDs), we can use the more efficient "radix sort", reducing the time complexity to $O(nk)$, where $k$ is the number of digits. When the data volume is very large, the saved running time can create significant value (reduced costs, improved experience, etc.).

In engineering, many problems are difficult to solve optimally, and many others are only solved "well enough." The difficulty of a problem depends, on the one hand, on the nature of the problem itself and, on the other hand, on the knowledge of the person examining it. The more complete a person's knowledge and the more experience they have, the deeper their analysis will be, and the more elegantly the problem can be solved.
`
  },
  'dsa-complexity-index': {
    title: 'Phân tích Độ phức tạp',
    summary: 'Giới thiệu về phân tích độ phức tạp - bản hướng dẫn không-thời gian trong vũ trụ bao la của giải thuật.',
    tags: ['dsa', 'complexity'],
    domain: 'Algorithms',
    module: 'Chương 2: Phân tích Độ phức tạp',
    prerequisites: [],
    related: ['dsa-performance'],
    updatedAt: '2026-07-17',
    readTime: '2 phút',
    content: `
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/chapter_complexity_analysis.jpg" alt="Phân tích Độ phức tạp" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<div class="callout callout-note">
  <span class="callout-icon">✨</span>
  <div class="callout-body">
    <p>Phân tích độ phức tạp giống như một bản hướng dẫn không-thời gian trong vũ trụ bao la của giải thuật.</p>
    <p>Nó dẫn dắt chúng ta khám phá sâu vào hai chiều kích thước của thời gian và không gian, tìm kiếm những giải pháp thanh thoát hơn.</p>
  </div>
</div>
`,
    originalContent: `
# Complexity Analysis

![Complexity analysis](../assets/covers/chapter_complexity_analysis.jpg)

!!! abstract

    Complexity analysis is like a space-time guide in the vast universe of algorithms.

    It leads us to explore deeply within the two dimensions of time and space, seeking more elegant solutions.
`
  },
  'dsa-performance': {
    title: '2.1 Algorithm Efficiency Evaluation (Đánh giá Hiệu năng Giải thuật)',
    summary: 'Tìm hiểu hai phương pháp đánh giá hiệu năng giải thuật: Đo lường thực tế (Actual Testing) và Phân tích lý thuyết (Theoretical Estimation).',
    tags: ['dsa', 'complexity'],
    domain: 'Algorithms',
    module: 'Chương 2: Phân tích Độ phức tạp',
    prerequisites: ['dsa-what-is'],
    related: ['dsa-iteration-recursion'],
    updatedAt: '2026-07-16',
    readTime: '6 phút',
    content: `
<h2>2.1.1 Mục tiêu của Thiết kế Giải thuật</h2>
<p>Trong thiết kế giải thuật, chúng ta hướng tới hai mục tiêu theo thứ tự:</p>
<ol>
  <li><strong>Tìm ra giải pháp cho bài toán</strong>: Giải thuật phải thu được kết quả chính xác trong phạm vi đầu vào quy định.</li>
  <li><strong>Tìm giải pháp tối ưu</strong>: Có thể tồn tại nhiều cách giải quyết và chúng ta muốn chọn giải thuật hiệu quả nhất.</li>
</ol>
<p>Nói cách khác, với tiền đề là giải quyết được bài toán, hiệu năng giải thuật đã trở thành tiêu chí đánh giá hàng đầu để đo lường chất lượng của một giải thuật. Hiệu năng giải thuật bao gồm hai chiều kích thước:</p>
<ul>
  <li><strong>Time Efficiency (Hiệu quả thời gian)</strong>: Thời gian chạy của giải thuật.</li>
  <li><strong>Space Efficiency (Hiệu quả không gian)</strong>: Dung lượng bộ nhớ mà giải thuật tiêu thụ.</li>
</ul>
<p>Nói ngắn gọn, <strong>mục tiêu của chúng ta là thiết kế cấu trúc dữ liệu và giải thuật vừa "nhanh" vừa "tiết kiệm bộ nhớ"</strong>. Việc đánh giá hiệu năng giải thuật một cách hiệu quả là vô cùng quan trọng, vì chỉ khi đó chúng ta mới có thể so sánh các giải thuật khác nhau và định hướng quá trình thiết kế, tối ưu hóa giải thuật.</p>
<p>Các phương pháp đánh giá hiệu năng chủ yếu được chia thành hai loại: thực nghiệm thực tế và ước lượng lý thuyết.</p>

<h2>2.1.2 Phương pháp 1: Thực nghiệm thực tế (Actual Testing)</h2>
<p>Phương pháp trực tiếp nhất để so sánh giải thuật A và giải thuật B là chạy chúng trên máy tính và đo lường thời gian chạy cũng như dung lượng bộ nhớ. Mặc dù phản ánh hành vi thực tế, cách này có hai hạn chế lớn:</p>
<ul>
  <li><strong>Khó loại bỏ nhiễu từ môi trường kiểm thử</strong>: Cấu hình phần cứng ảnh hưởng mạnh tới hiệu năng. Ví dụ, một giải thuật song song hóa tốt sẽ chạy nhanh hơn trên CPU nhiều nhân; một thuật toán đọc ghi bộ nhớ liên tục sẽ hưởng lợi từ RAM tốc độ cao. Kết quả đo trên máy này có thể không đúng trên máy khác. Điều này đồng nghĩa chúng ta cần kiểm thử trên nhiều máy khác nhau rồi tính hiệu năng trung bình, điều này không thực tế.</li>
  <li><strong>Đo lường đầy đủ tốn nhiều tài nguyên</strong>: Hiệu năng giải thuật thay đổi theo kích thước dữ liệu đầu vào. Với lượng dữ liệu nhỏ thuật toán A có thể nhanh hơn B, nhưng với lượng dữ liệu lớn thì ngược lại. Do đó, để có được kết luận thuyết phục, chúng ta cần kiểm thử trên dữ liệu đầu vào ở nhiều quy mô khác nhau, đòi hỏi lượng lớn tài nguyên tính toán.</li>
</ul>

<h2>2.1.3 Phương pháp 2: Ước lượng lý thuyết (Theoretical Estimation)</h2>
<p>Để khắc phục các nhược điểm trên, chúng ta sử dụng phương pháp phân tích lý thuyết gọi là <strong>Asymptotic Complexity Analysis (Phân tích độ phức tạp tiệm cận)</strong>, gọi tắt là <strong>Complexity Analysis (Phân tích độ phức tạp)</strong>.</p>
<p>Phân tích độ phức tạp phản ánh mối quan hệ giữa tài nguyên thời gian, không gian mà giải thuật cần và quy mô dữ liệu đầu vào. <strong>Nó mô tả xu hướng tăng trưởng của tài nguyên thời gian và không gian mà giải thuật tiêu thụ khi kích thước dữ liệu đầu vào tăng lên</strong>. Định nghĩa này hơi cồng kềnh, nên ta có thể chia nhỏ thành ba điểm chính để hiểu rõ hơn:</p>
<ul>
  <li>"Tài nguyên thời gian và không gian" lần lượt tương ứng với <strong>Time Complexity (Độ phức tạp thời gian)</strong> và <strong>Space Complexity (Độ phức tạp không gian)</strong>.</li>
  <li>"Khi kích thước dữ liệu đầu vào tăng lên" nghĩa là độ phức tạp phản ánh mối quan hệ giữa hiệu năng chạy của giải thuật và quy mô dữ liệu đầu vào.</li>
  <li>"Xu hướng tăng trưởng của thời gian và không gian" cho thấy phân tích độ phức tạp không tập trung vào giá trị cụ thể của thời gian chạy hay dung lượng chiếm dụng (ví dụ: 12 ms hay 5 MB), mà tập trung vào <strong>tốc độ tăng trưởng</strong> "nhanh" đến đâu của thời gian hoặc không gian đó.</li>
</ul>
<p><strong>Phân tích độ phức tạp khắc phục được các nhược điểm của phương pháp thực nghiệm thực tế</strong>, thể hiện ở các khía cạnh sau:</p>
<ul>
  <li>Không cần thực sự chạy code, giúp thân thiện với môi trường và tiết kiệm năng lượng hơn.</li>
  <li>Hoàn toàn độc lập với môi trường kiểm thử, kết quả phân tích áp dụng được cho mọi nền tảng chạy.</li>
  <li>Có thể phản ánh hiệu năng giải thuật ở các quy mô dữ liệu khác nhau, đặc biệt là hiệu năng giải thuật khi dữ liệu lớn.</li>
</ul>

<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    Nếu bạn vẫn còn cảm thấy mơ hồ về khái niệm độ phức tạp, đừng lo lắng — chúng ta sẽ giới thiệu chi tiết hơn ở các phần tiếp theo.
  </div>
</div>

<p>Phân tích độ phức tạp cung cấp cho chúng ta một "thước đo" để đánh giá hiệu năng giải thuật, cho phép chúng ta đo lường tài nguyên thời gian và không gian cần thiết để thực thi một giải thuật, đồng thời so sánh hiệu năng giữa các giải thuật khác nhau.</p>
<p>Độ phức tạp là một khái niệm toán học, có thể khiến người mới học cảm thấy trừu tượng và khó nắm bắt. Xét theo góc độ đó, phân tích độ phức tạp có thể không phải là chủ đề phù hợp nhất để giới thiệu đầu tiên. Tuy nhiên, khi bàn về đặc điểm của một cấu trúc dữ liệu hay giải thuật cụ thể, rất khó để tránh việc phân tích tốc độ chạy và mức sử dụng bộ nhớ của nó.</p>
<p>Tóm lại, trước khi đi sâu vào cấu trúc dữ liệu và giải thuật, <strong>bạn nên xây dựng một sự hiểu biết sơ bộ về phân tích độ phức tạp để có thể tự phân tích độ phức tạp của các giải thuật đơn giản</strong>.</p>
`,
    originalContent: `
# Algorithm Efficiency Evaluation

In algorithm design, we pursue the following two levels of objectives sequentially.

1. **Finding a solution to the problem**: The algorithm must reliably obtain the correct solution within the specified input range.
2. **Seeking the optimal solution**: Multiple solutions may exist for the same problem, and we hope to find an algorithm that is as efficient as possible.

In other words, under the premise of being able to solve the problem, algorithm efficiency has become the primary evaluation criterion for measuring the quality of algorithms. It includes the following two dimensions.

- **Time efficiency**: The length of time the algorithm runs.
- **Space efficiency**: The size of memory space the algorithm occupies.

In short, **our goal is to design data structures and algorithms that are "both fast and memory-efficient"**. Effectively evaluating algorithm efficiency is crucial, because only in this way can we compare various algorithms and guide the algorithm design and optimization process.

Efficiency evaluation methods are mainly divided into two types: actual testing and theoretical estimation.

## Actual Testing

Suppose we now have algorithm \`A\` and algorithm \`B\`, both of which can solve the same problem, and we need to compare their efficiency. The most direct method is to run them on a computer and measure their running time and memory usage. This evaluation approach can reflect real-world behavior, but it also has considerable limitations.

On one hand, **it is difficult to eliminate interference factors from the testing environment**. Hardware configuration affects algorithmic performance. For example, if an algorithm has a high degree of parallelism, it is more suitable for running on multi-core CPUs; if an algorithm performs memory-intensive operations, it will benefit more from high-performance memory. In other words, the test results of an algorithm on different machines may be inconsistent. This means we need to test on various machines and calculate average efficiency, which is impractical.

On the other hand, **conducting complete testing is very resource-intensive**. As the input data volume changes, the algorithm will exhibit different efficiencies. For example, when the input data volume is small, the running time of algorithm \`A\` is shorter than algorithm \`B\`; but when the input data volume is large, the test results may be exactly the opposite. Therefore, to obtain convincing conclusions, we need to test input data of various scales, which requires a large amount of computational resources.

## Theoretical Estimation

Since actual testing has considerable limitations, we can consider evaluating algorithm efficiency through theoretical calculation. This estimation method is called <u>asymptotic complexity analysis</u>, or <u>complexity analysis</u> for short.

Complexity analysis can reflect the relationship between the time and space resources required for algorithm execution and the input data scale. **It describes the growth trend of the time and space required for algorithm execution as the input data scale increases**. This definition is a bit cumbersome, so we can break it down into three key points to understand.

- "Time and space resources" correspond to <u>time complexity</u> and <u>space complexity</u>, respectively.
- "As the input data scale increases" means that complexity reflects the relationship between algorithm running efficiency and input data scale.
- "Growth trend of time and space" indicates that complexity analysis focuses not on the specific values of running time or occupied space, but on how "fast" time or space grows.

**Complexity analysis overcomes the drawbacks of the actual testing method**, reflected in the following aspects.

- It does not need to actually run the code, making it more environmentally friendly and energy-efficient.
- It is independent of the testing environment, and the analysis results are applicable to all running platforms.
- It can reflect algorithm efficiency at different data volumes, especially algorithm performance at large data volumes.

!!! tip

    If you are still confused about the concept of complexity, don't worry—we will introduce it in detail in subsequent chapters.

Complexity analysis provides us with a "ruler" for evaluating algorithm efficiency, allowing us to measure the time and space resources required to execute a certain algorithm and compare the efficiency between different algorithms.

Complexity is a mathematical concept that may feel abstract and challenging for beginners. From this perspective, complexity analysis may not be the most suitable topic to introduce first. However, when we discuss the characteristics of a certain data structure or algorithm, it is difficult to avoid analyzing its running speed and space usage.

In summary, it is recommended that before diving deep into data structures and algorithms, **you first establish a preliminary understanding of complexity analysis so that you can analyze the complexity of simple algorithms**.
`
  },
  'dsa-iteration-recursion': {
    title: '2.2 Iteration and Recursion (Vòng lặp và Đệ quy)',
    summary: 'So sánh hai cấu trúc điều khiển cơ bản để thực hiện các công việc lặp đi lặp lại trong chương trình.',
    tags: ['dsa', 'complexity'],
    domain: 'Algorithms',
    module: 'Chương 2: Phân tích Độ phức tạp',
    prerequisites: ['dsa-performance'],
    related: ['dsa-time-complexity', 'dsa-space-complexity'],
    updatedAt: '2026-07-16',
    readTime: '12 phút',
    content: `
<h2>2.2.1 Khái niệm cơ bản</h2>
<p>Trong giải thuật, việc thực hiện lặp đi lặp lại một tác vụ là rất phổ biến. Có hai cấu trúc điều khiển cơ bản để lập trình hành vi lặp lại này: <strong>Iteration (Vòng lặp)</strong> và <strong>Recursion (Đệ quy)</strong>.</p>

<h2>2.2.2 Vòng lặp (Iteration)</h2>
<p><strong>Iteration (Vòng lặp)</strong> là cấu trúc lặp đi lặp lại một đoạn mã nguồn dưới một điều kiện nhất định cho đến khi điều kiện đó không còn thỏa mãn.</p>

<h3>2.2.2.1 Vòng lặp For (For Loop)</h3>
<p>Vòng lặp <code>for</code> phù hợp nhất khi chúng ta đã biết trước số lần lặp.</p>
<p>Hàm sau tính tổng $1 + 2 + \\dots + n$ bằng vòng lặp <code>for</code>:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int forLoop(int n) {
        int res = 0;
        // Sum 1, 2, ..., n-1, n
        for (int i = 1; i &lt;= n; i++) {
            res += i;
        }
        return res;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun forLoop(n: Int): Int {
    var res = 0
    // Sum 1, 2, ..., n-1, n
    for (i in 1..n) {
        res += i
    }
    return res
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func forLoop(n: Int) -&gt; Int {
    var res = 0
    // Sum 1, 2, ..., n-1, n
    for i in 1 ... n {
        res += i
    }
    return res
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int forLoop(int n) {
  int res = 0;
  // Sum 1, 2, ..., n-1, n
  for (int i = 1; i &lt;= n; i++) {
    res += i;
  }
  return res;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def for_loop(n: int) -&gt; int:
    """for loop"""
    res = 0
    # Sum 1, 2, ..., n-1, n
    for i in range(1, n + 1):
        res += i
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int forLoop(int n) {
    int res = 0;
    // Sum 1, 2, ..., n-1, n
    for (int i = 1; i &lt;= n; ++i) {
        res += i;
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int ForLoop(int n) {
        int res = 0;
        // Sum 1, 2, ..., n-1, n
        for (int i = 1; i &lt;= n; i++) {
            res += i;
        }
        return res;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func forLoop(n int) int {
	res := 0
	// Sum 1, 2, ..., n-1, n
	for i := 1; i &lt;= n; i++ {
		res += i
	}
	return res
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function forLoop(n) {
    let res = 0;
    // Sum 1, 2, ..., n-1, n
    for (let i = 1; i &lt;= n; i++) {
        res += i;
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function forLoop(n: number): number {
    let res = 0;
    // Sum 1, 2, ..., n-1, n
    for (let i = 1; i &lt;= n; i++) {
        res += i;
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn for_loop(n: i32) -&gt; i32 {
    let mut res = 0;
    // Sum 1, 2, ..., n-1, n
    for i in 1..=n {
        res += i;
    }
    res
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int forLoop(int n) {
    int res = 0;
    // Sum 1, 2, ..., n-1, n
    for (int i = 1; i &lt;= n; i++) {
        res += i;
    }
    return res;
}</code></pre></div></div></div>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/iteration.png" alt="Sơ đồ khối hàm tính tổng bằng vòng lặp" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>2.2.2.2 Vòng lặp While (While Loop)</h3>
<p>Vòng lặp <code>while</code> có tính linh hoạt cao hơn vòng lặp <code>for</code> vì điều kiện lặp có thể được tùy biến phức tạp hơn ở mỗi bước lặp.</p>
<p>Hàm tính tổng $1 + 2 + \\dots + n$ bằng vòng lặp <code>while</code>:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int whileLoop(int n) {
        int res = 0;
        int i = 1; // Initialize condition variable
        // Sum 1, 2, ..., n-1, n
        while (i &lt;= n) {
            res += i;
            i++; // Update condition variable
        }
        return res;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun whileLoop(n: Int): Int {
    var res = 0
    var i = 1 // Initialize condition variable
    // Sum 1, 2, ..., n-1, n
    while (i &lt;= n) {
        res += i
        i++ // Update condition variable
    }
    return res
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func whileLoop(n: Int) -&gt; Int {
    var res = 0
    var i = 1 // Initialize condition variable
    // Sum 1, 2, ..., n-1, n
    while i &lt;= n {
        res += i
        i += 1 // Update condition variable
    }
    return res
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int whileLoop(int n) {
  int res = 0;
  int i = 1; // Initialize condition variable
  // Sum 1, 2, ..., n-1, n
  while (i &lt;= n) {
    res += i;
    i++; // Update condition variable
  }
  return res;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def while_loop(n: int) -&gt; int:
    """while loop"""
    res = 0
    i = 1  # Initialize condition variable
    # Sum 1, 2, ..., n-1, n
    while i &lt;= n:
        res += i
        i += 1  # Update condition variable
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int whileLoop(int n) {
    int res = 0;
    int i = 1; // Initialize condition variable
    // Sum 1, 2, ..., n-1, n
    while (i &lt;= n) {
        res += i;
        i++; // Update condition variable
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int WhileLoop(int n) {
        int res = 0;
        int i = 1; // Initialize condition variable
        // Sum 1, 2, ..., n-1, n
        while (i &lt;= n) {
            res += i;
            i += 1; // Update condition variable
        }
        return res;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func whileLoop(n int) int {
	res := 0
	// Initialize condition variable
	i := 1
	// Sum 1, 2, ..., n-1, n
	for i &lt;= n {
		res += i
		// Update condition variable
		i++
	}
	return res
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function whileLoop(n) {
    let res = 0;
    let i = 1; // Initialize condition variable
    // Sum 1, 2, ..., n-1, n
    while (i &lt;= n) {
        res += i;
        i++; // Update condition variable
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function whileLoop(n: number): number {
    let res = 0;
    let i = 1; // Initialize condition variable
    // Sum 1, 2, ..., n-1, n
    while (i &lt;= n) {
        res += i;
        i++; // Update condition variable
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn while_loop(n: i32) -&gt; i32 {
    let mut res = 0;
    let mut i = 1; // Initialize condition variable

    // Sum 1, 2, ..., n-1, n
    while i &lt;= n {
        res += i;
        i += 1; // Update condition variable
    }
    res
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int whileLoop(int n) {
    int res = 0;
    int i = 1; // Initialize condition variable
    // Sum 1, 2, ..., n-1, n
    while (i &lt;= n) {
        res += i;
        i++; // Update condition variable
    }
    return res;
}</code></pre></div></div></div>

<p>Ví dụ sau đây cập nhật biến điều kiện $i$ hai lần mỗi vòng lặp, việc này khó thực hiện thuận tiện bằng vòng lặp <code>for</code>:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int whileLoopII(int n) {
        int res = 0;
        int i = 1; // Initialize condition variable
        // Sum 1, 4, 10, ...
        while (i &lt;= n) {
            res += i;
            // Update condition variable
            i++;
            i *= 2;
        }
        return res;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun whileLoopII(n: Int): Int {
    var res = 0
    var i = 1 // Initialize condition variable
    // Sum 1, 4, 10, ...
    while (i &lt;= n) {
        res += i
        // Update condition variable
        i++
        i *= 2
    }
    return res
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func whileLoopII(n: Int) -&gt; Int {
    var res = 0
    var i = 1 // Initialize condition variable
    // Sum 1, 4, 10, ...
    while i &lt;= n {
        res += i
        // Update condition variable
        i += 1
        i *= 2
    }
    return res
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int whileLoopII(int n) {
  int res = 0;
  int i = 1; // Initialize condition variable
  // Sum 1, 4, 10, ...
  while (i &lt;= n) {
    res += i;
    // Update condition variable
    i++;
    i *= 2;
  }
  return res;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def while_loop_ii(n: int) -&gt; int:
    """while loop (two updates)"""
    res = 0
    i = 1  # Initialize condition variable
    # Sum 1, 4, 10, ...
    while i &lt;= n:
        res += i
        # Update condition variable
        i += 1
        i *= 2
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int whileLoopII(int n) {
    int res = 0;
    int i = 1; // Initialize condition variable
    // Sum 1, 4, 10, ...
    while (i &lt;= n) {
        res += i;
        // Update condition variable
        i++;
        i *= 2;
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int WhileLoopII(int n) {
        int res = 0;
        int i = 1; // Initialize condition variable
        // Sum 1, 4, 10, ...
        while (i &lt;= n) {
            res += i;
            // Update condition variable
            i += 1; 
            i *= 2;
        }
        return res;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func whileLoopII(n int) int {
	res := 0
	// Initialize condition variable
	i := 1
	// Sum 1, 4, 10, ...
	for i &lt;= n {
		res += i
		// Update condition variable
		i++
		i *= 2
	}
	return res
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function whileLoopII(n) {
    let res = 0;
    let i = 1; // Initialize condition variable
    // Sum 1, 4, 10, ...
    while (i &lt;= n) {
        res += i;
        // Update condition variable
        i++;
        i *= 2;
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function whileLoopII(n: number): number {
    let res = 0;
    let i = 1; // Initialize condition variable
    // Sum 1, 4, 10, ...
    while (i &lt;= n) {
        res += i;
        // Update condition variable
        i++;
        i *= 2;
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn while_loop_ii(n: i32) -&gt; i32 {
    let mut res = 0;
    let mut i = 1; // Initialize condition variable

    // Sum 1, 4, 10, ...
    while i &lt;= n {
        res += i;
        // Update condition variable
        i += 1;
        i *= 2;
    }
    res
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int whileLoopII(int n) {
    int res = 0;
    int i = 1; // Initialize condition variable
    // Sum 1, 4, 10, ...
    while (i &lt;= n) {
        res += i;
        // Update condition variable
        i++;
        i *= 2;
    }
    return res;
}</code></pre></div></div></div>

<h3>2.2.2.3 Vòng lặp lồng nhau (Nested Loop)</h3>
<p>Chúng ta có thể lồng một vòng lặp này bên trong một vòng lặp khác. Khi lồng hai vòng lặp <code>for</code>, số lần thực thi các phép toán sẽ tỷ lệ thuận với $n^2$ (quan hệ bình phương):</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static String nestedForLoop(int n) {
        StringBuilder res = new StringBuilder();
        // Loop i = 1, 2, ..., n-1, n
        for (int i = 1; i &lt;= n; i++) {
            // Loop j = 1, 2, ..., n-1, n
            for (int j = 1; j &lt;= n; j++) {
                res.append("(" + i + ", " + j + "), ");
            }
        }
        return res.toString();
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun nestedForLoop(n: Int): String {
    val res = StringBuilder()
    // Loop i = 1, 2, ..., n-1, n
    for (i in 1..n) {
        // Loop j = 1, 2, ..., n-1, n
        for (j in 1..n) {
            res.append(" ($i, $j), ")
        }
    }
    return res.toString()
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func nestedForLoop(n: Int) -&gt; String {
    var res = ""
    // Loop i = 1, 2, ..., n-1, n
    for i in 1 ... n {
        // Loop j = 1, 2, ..., n-1, n
        for j in 1 ... n {
            res.append("(\(i), \(j)), ")
        }
    }
    return res
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>String nestedForLoop(int n) {
  String res = "";
  // Loop i = 1, 2, ..., n-1, n
  for (int i = 1; i &lt;= n; i++) {
    // Loop j = 1, 2, ..., n-1, n
    for (int j = 1; j &lt;= n; j++) {
      res += "($i, $j), ";
    }
  }
  return res;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def nested_for_loop(n: int) -&gt; str:
    """Nested for loop"""
    res = ""
    # Loop i = 1, 2, ..., n-1, n
    for i in range(1, n + 1):
        # Loop j = 1, 2, ..., n-1, n
        for j in range(1, n + 1):
            res += f"({i}, {j}), "
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>string nestedForLoop(int n) {
    ostringstream res;
    // Loop i = 1, 2, ..., n-1, n
    for (int i = 1; i &lt;= n; ++i) {
        // Loop j = 1, 2, ..., n-1, n
        for (int j = 1; j &lt;= n; ++j) {
            res &lt;&lt; "(" &lt;&lt; i &lt;&lt; ", " &lt;&lt; j &lt;&lt; "), ";
        }
    }
    return res.str();
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    string NestedForLoop(int n) {
        StringBuilder res = new();
        // Loop i = 1, 2, ..., n-1, n
        for (int i = 1; i &lt;= n; i++) {
            // Loop j = 1, 2, ..., n-1, n
            for (int j = 1; j &lt;= n; j++) {
                res.Append($"({i}, {j}), ");
            }
        }
        return res.ToString();
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func nestedForLoop(n int) string {
	res := ""
	// Loop i = 1, 2, ..., n-1, n
	for i := 1; i &lt;= n; i++ {
		for j := 1; j &lt;= n; j++ {
			// Loop j = 1, 2, ..., n-1, n
			res += fmt.Sprintf("(%d, %d), ", i, j)
		}
	}
	return res
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function nestedForLoop(n) {
    let res = '';
    // Loop i = 1, 2, ..., n-1, n
    for (let i = 1; i &lt;= n; i++) {
        // Loop j = 1, 2, ..., n-1, n
        for (let j = 1; j &lt;= n; j++) {
            res += \`(\${i}, \${j}), \`;
        }
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function nestedForLoop(n: number): string {
    let res = '';
    // Loop i = 1, 2, ..., n-1, n
    for (let i = 1; i &lt;= n; i++) {
        // Loop j = 1, 2, ..., n-1, n
        for (let j = 1; j &lt;= n; j++) {
            res += \`(\${i}, \${j}), \`;
        }
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn nested_for_loop(n: i32) -&gt; String {
    let mut res = vec![];
    // Loop i = 1, 2, ..., n-1, n
    for i in 1..=n {
        // Loop j = 1, 2, ..., n-1, n
        for j in 1..=n {
            res.push(format!("({}, {}), ", i, j));
        }
    }
    res.join("")
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>char *nestedForLoop(int n) {
    // n * n is the number of points, "(i, j), " string max length is 6+10*2, plus extra space for null character \0
    int size = n * n * 26 + 1;
    char *res = malloc(size * sizeof(char));
    // Loop i = 1, 2, ..., n-1, n
    for (int i = 1; i &lt;= n; i++) {
        // Loop j = 1, 2, ..., n-1, n
        for (int j = 1; j &lt;= n; j++) {
            char tmp[26];
            snprintf(tmp, sizeof(tmp), "(%d, %d), ", i, j);
            strncat(res, tmp, size - strlen(res) - 1);
        }
    }
    return res;
}</code></pre></div></div></div>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/nested_iteration.png" alt="Sơ đồ khối vòng lặp lồng nhau" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>2.2.3 Đệ quy (Recursion)</h2>
<p><strong>Recursion (Đệ quy)</strong> là một chiến lược giải thuật giải quyết bài toán bằng cách gọi lại chính hàm đó. Quá trình đệ quy gồm hai pha:</p>
<ol>
  <li><strong>Descend (Đi xuống / Gọi đệ quy)</strong>: Chương trình liên tục gọi chính nó sâu hơn với các tham số nhỏ hơn hoặc đơn giản hơn, cho đến khi đạt "điều kiện dừng".</li>
  <li><strong>Ascend (Đi lên / Quay lui thu kết quả)</strong>: Sau khi chạm điều kiện dừng, chương trình trả về từng tầng để tích lũy kết quả thu được.</li>
</ol>
<p>Mã nguồn đệ quy cơ bản có 3 yếu tố:</p>
<ul>
  <li><strong>Termination Condition (Điều kiện dừng)</strong>: Quyết định khi nào dừng pha "đi xuống" để bắt đầu pha "đi lên".</li>
  <li><strong>Recursive Call (Gọi đệ quy)</strong>: Gọi lại chính hàm đó với tham số nhỏ hơn.</li>
  <li><strong>Return Value (Giá trị trả về)</strong>: Trả kết quả của tầng hiện tại lên tầng cha.</li>
</ul>

<p>Hàm tính tổng $1 + 2 + \\dots + n$ bằng đệ quy:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int recur(int n) {
        // Termination condition
        if (n == 1)
            return 1;
        // Recurse: recursive call
        int res = recur(n - 1);
        // Return: return result
        return n + res;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun recur(n: Int): Int {
    // Termination condition
    if (n == 1)
        return 1
    // Descend: recursive call
    val res = recur(n - 1)
    // Return: return result
    return n + res
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func recur(n: Int) -&gt; Int {
    // Termination condition
    if n == 1 {
        return 1
    }
    // Recurse: recursive call
    let res = recur(n: n - 1)
    // Return: return result
    return n + res
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int recur(int n) {
  // Termination condition
  if (n == 1) return 1;
  // Recurse: recursive call
  int res = recur(n - 1);
  // Return: return result
  return n + res;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def recur(n: int) -&gt; int:
    """Recursion"""
    # Termination condition
    if n == 1:
        return 1
    # Recurse: recursive call
    res = recur(n - 1)
    # Return: return result
    return n + res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int recur(int n) {
    // Termination condition
    if (n == 1)
        return 1;
    // Recurse: recursive call
    int res = recur(n - 1);
    // Return: return result
    return n + res;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int Recur(int n) {
        // Termination condition
        if (n == 1)
            return 1;
        // Recurse: recursive call
        int res = Recur(n - 1);
        // Return: return result
        return n + res;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func recur(n int) int {
	// Termination condition
	if n == 1 {
		return 1
	}
	// Recurse: recursive call
	res := recur(n - 1)
	// Return: return result
	return n + res
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function recur(n) {
    // Termination condition
    if (n === 1) return 1;
    // Recurse: recursive call
    const res = recur(n - 1);
    // Return: return result
    return n + res;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function recur(n: number): number {
    // Termination condition
    if (n === 1) return 1;
    // Recurse: recursive call
    const res = recur(n - 1);
    // Return: return result
    return n + res;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn recur(n: i32) -&gt; i32 {
    // Termination condition
    if n == 1 {
        return 1;
    }
    // Recurse: recursive call
    let res = recur(n - 1);
    // Return: return result
    n + res
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int recur(int n) {
    // Termination condition
    if (n == 1)
        return 1;
    // Recurse: recursive call
    int res = recur(n - 1);
    // Return: return result
    return n + res;
}</code></pre></div></div></div>

<div class="interactive-widget-wrapper" id="recur-iter-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'recur-iter-wrapper', 'tab-images')">📸 Minh họa</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'recur-iter-wrapper', 'tab-interactive'); initRecurIterDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  
  <div class="widget-tab-content active" data-tab="tab-images">
    <div style="text-align: center; margin: 1.5em 0;">
      <img src="dsa-assets/recursion_sum.png" alt="Quá trình thực thi đệ quy" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
    </div>
  </div>
  
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div class="widget-layout" style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1.5rem; background: rgba(255,255,255,0.02); border-radius: var(--radius-md); border: 1px solid var(--border);">
      
      <div style="display: flex; gap: 1.5rem; align-items: center; justify-content: center; flex-wrap: wrap;">
        <span style="font-weight: 500;">Chọn giá trị n (1 - 5):</span>
        <div style="display: flex; gap: 0.5rem;">
          <input type="number" id="ri-n-input" value="4" min="1" max="5" style="width: 60px; padding: 6px 10px; background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 4px; color: var(--text-primary); text-align: center; font-weight: bold;" />
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="control-btn btn-secondary" onclick="startRiDemo('iteration')" id="ri-btn-iter" style="padding: 6px 12px; background: var(--accent-indigo); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Chạy Vòng lặp (Iteration)</button>
          <button class="control-btn btn-secondary" onclick="startRiDemo('recursion')" id="ri-btn-recur" style="padding: 6px 12px; background: var(--accent-fuchsia); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Chạy Đệ quy (Recursion)</button>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: space-between;">
        <!-- Left Side: Simulator Visual -->
        <div style="flex: 1; min-width: 280px; display: flex; flex-direction: column; gap: 1rem; border: 1px solid rgba(255,255,255,0.05); padding: 1rem; border-radius: 6px; background: rgba(0,0,0,0.15);">
          <h4 style="margin: 0; color: var(--text-primary); text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem;" id="ri-visual-title">Trực quan mô phỏng</h4>
          <div id="ri-visualization-container" style="min-height: 200px; display: flex; flex-direction: column-reverse; justify-content: center; align-items: center; gap: 0.5rem; transition: all 0.3s ease;">
            <!-- Frames represented here dynamically -->
          </div>
        </div>

        <!-- Right Side: State details -->
        <div style="flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 1rem; border: 1px solid rgba(255,255,255,0.05); padding: 1rem; border-radius: 6px; background: rgba(0,0,0,0.15);">
          <h4 style="margin: 0; color: var(--text-primary); text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem;">Trạng thái & Mã nguồn</h4>
          <div id="ri-code-container" style="font-family: monospace; font-size: 13px; background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.05); color: var(--text-secondary); min-height: 100px; white-space: pre-wrap;">
            <!-- Interactive state text & pseudo code highlights -->
          </div>
        </div>
      </div>

      <!-- Control simulation step buttons -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1rem;">
        <span id="ri-status-text" style="font-size: 13px; color: var(--text-muted);">Hãy chọn n và nhấn nút bắt đầu để xem cơ chế hoạt động.</span>
        <div style="display: flex; gap: 0.5rem;">
          <button class="control-btn btn-secondary" id="ri-btn-prev" onclick="stepRiDemo('prev')" style="padding: 6px 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: var(--text-secondary); border-radius: 4px; cursor: pointer;" disabled>◀ Quay lại</button>
          <button class="control-btn btn-secondary" id="ri-btn-next" onclick="stepRiDemo('next')" style="padding: 6px 12px; background: var(--accent-emerald); border: none; color: white; border-radius: 4px; cursor: pointer; font-weight: 500;" disabled>Bước tiếp theo ▶</button>
        </div>
      </div>
      
    </div>
  </div>
</div>

<p>Mặc dù xét về mặt tính toán, <strong>Iteration (Vòng lặp)</strong> và <strong>Recursion (Đệ quy)</strong> có thể cho ra cùng một kết quả, nhưng chúng đại diện cho hai hệ tư duy hoàn toàn khác nhau trong cách tiếp cận và giải quyết vấn đề.</p>
<ul>
  <li><strong>Iteration (Vòng lặp)</strong>: Giải quyết bài toán theo hướng "từ dưới lên" (bottom-up). Bắt đầu từ các bước cơ bản nhất, các bước này được thực thi hoặc tích lũy lặp đi lặp lại cho đến khi hoàn thành nhiệm vụ.</li>
  <li><strong>Recursion (Đệ quy)</strong>: Giải quyết bài toán theo hướng "từ trên xuống" (top-down). Bài toán gốc được phân rã thành các bài toán con nhỏ hơn có cùng dạng với bài toán gốc. Các bài toán con này tiếp tục được phân rã thành các bài toán con nhỏ hơn nữa cho đến khi chạm tới trường hợp cơ sở (nơi lời giải đã được biết).</li>
</ul>
<p>Lấy lại ví dụ hàm tính tổng ở trên, đặt bài toán là $f(n) = 1 + 2 + \\dots + n$.</p>
<ul>
  <li><strong>Iteration (Vòng lặp)</strong>: Mô phỏng quá trình cộng tổng bằng vòng lặp, duyệt từ $1$ đến $n$, thực hiện phép cộng tổng ở mỗi vòng để thu được $f(n)$.</li>
  <li><strong>Recursion (Đệ quy)</strong>: Phân rã bài toán thành bài toán con $f(n) = n + f(n-1)$, tiếp tục phân rã (đệ quy) cho đến khi kết thúc tại trường hợp cơ sở $f(1) = 1$.</li>
</ul>

<h3>2.2.3.1 Ngăn xếp cuộc gọi (Call Stack)</h3>
<p>Mỗi khi một hàm đệ quy gọi lại chính nó, hệ thống sẽ cấp phát bộ nhớ cho lần gọi hàm mới để lưu trữ các biến cục bộ, địa chỉ gọi hàm và các thông tin khác. Điều này dẫn đến hai hệ quả:</p>
<ul>
  <li>Dữ liệu ngữ cảnh của hàm được lưu trong một vùng nhớ gọi là <strong>không gian khung ngăn xếp (stack frame space)</strong>, vùng này chỉ được giải phóng sau khi hàm trả về. Do đó, <strong>đệ quy thường tiêu tốn nhiều bộ nhớ hơn vòng lặp</strong>.</li>
  <li>Việc gọi hàm đệ quy phát sinh thêm chi phí xử lý. Do đó, <strong>đệ quy thường kém hiệu quả về thời gian hơn vòng lặp</strong>.</li>
</ul>
<p>Như minh họa trong hình dưới đây, trước khi điều kiện dừng được kích hoạt, có $n$ hàm đệ quy chưa trả về tồn tại đồng thời, với <strong>độ sâu đệ quy là $n$</strong>.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/recursion_sum_depth.png" alt="Độ sâu ngăn xếp cuộc gọi đệ quy" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Trong thực tế, độ sâu đệ quy cho phép của các ngôn ngữ lập trình thường bị giới hạn, và đệ quy quá sâu có thể dẫn đến lỗi tràn ngăn xếp (stack overflow).</p>

<h3>2.2.3.2 Đệ quy đuôi (Tail Recursion)</h3>
<p>Nếu lời gọi đệ quy là thao tác cuối cùng trước khi hàm trả về, nó được gọi là <strong>Tail Recursion (Đệ quy đuôi)</strong>. Nhiều compiler có thể tối ưu hóa đệ quy đuôi thành vòng lặp thông thường để tiết kiệm không gian ngăn xếp bộ nhớ (stack frame):</p>
<ul>
  <li><strong>Đệ quy thông thường</strong>: Khi hàm trả về tầng trước đó, nó cần tiếp tục thực thi mã lệnh, do đó hệ thống cần lưu lại ngữ cảnh gọi hàm của tầng trước.</li>
  <li><strong>Đệ quy đuôi</strong>: Lời gọi đệ quy là thao tác cuối cùng trước khi hàm trả về, nghĩa là sau khi quay về tầng trước, không cần thực thi thêm thao tác nào khác, nên hệ thống không cần lưu lại ngữ cảnh của hàm ở tầng trước.</li>
</ul>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int tailRecur(int n, int res) {
        // Termination condition
        if (n == 0)
            return res;
        // Tail recursive call
        return tailRecur(n - 1, res + n);
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>tailrec fun tailRecur(n: Int, res: Int): Int {
    // Add tailrec keyword to enable tail recursion optimization
    // Termination condition
    if (n == 0)
        return res
    // Tail recursive call
    return tailRecur(n - 1, res + n)
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func tailRecur(n: Int, res: Int) -&gt; Int {
    // Termination condition
    if n == 0 {
        return res
    }
    // Tail recursive call
    return tailRecur(n: n - 1, res: res + n)
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int tailRecur(int n, int res) {
  // Termination condition
  if (n == 0) return res;
  // Tail recursive call
  return tailRecur(n - 1, res + n);
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def tail_recur(n, res):
    """Tail recursion"""
    # Termination condition
    if n == 0:
        return res
    # Tail recursive call
    return tail_recur(n - 1, res + n)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int tailRecur(int n, int res) {
    // Termination condition
    if (n == 0)
        return res;
    // Tail recursive call
    return tailRecur(n - 1, res + n);
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int TailRecur(int n, int res) {
        // Termination condition
        if (n == 0)
            return res;
        // Tail recursive call
        return TailRecur(n - 1, res + n);
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func tailRecur(n int, res int) int {
	// Termination condition
	if n == 0 {
		return res
	}
	// Tail recursive call
	return tailRecur(n-1, res+n)
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function tailRecur(n, res) {
    // Termination condition
    if (n === 0) return res;
    // Tail recursive call
    return tailRecur(n - 1, res + n);
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function tailRecur(n: number, res: number): number {
    // Termination condition
    if (n === 0) return res;
    // Tail recursive call
    return tailRecur(n - 1, res + n);
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn tail_recur(n: i32, res: i32) -&gt; i32 {
    // Termination condition
    if n == 0 {
        return res;
    }
    // Tail recursive call
    tail_recur(n - 1, res + n)
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int tailRecur(int n, int res) {
    // Termination condition
    if (n == 0)
        return res;
    // Tail recursive call
    return tailRecur(n - 1, res + n);
}</code></pre></div></div></div>

<p>Quá trình thực thi của đệ quy đuôi được minh họa trong hình dưới đây. So sánh đệ quy thông thường và đệ quy đuôi, ta thấy phép cộng tổng được thực hiện ở những thời điểm khác nhau.</p>
<ul>
  <li><strong>Đệ quy thông thường</strong>: Phép cộng tổng được thực hiện trong quá trình "đi lên" (ascending), cần thêm một phép cộng sau mỗi lần một tầng trả về.</li>
  <li><strong>Đệ quy đuôi</strong>: Phép cộng tổng được thực hiện trong quá trình "đi xuống" (descending); quá trình "đi lên" chỉ cần trả về tuần tự qua từng tầng.</li>
</ul>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/tail_recursion_sum.png" alt="Quá trình thực thi đệ quy đuôi" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    Lưu ý rằng nhiều trình biên dịch hoặc trình thông dịch không hỗ trợ tối ưu hóa đệ quy đuôi. Ví dụ, Python mặc định không hỗ trợ tối ưu hóa đệ quy đuôi, vì vậy dù một hàm được viết ở dạng đệ quy đuôi, nó vẫn có thể gặp lỗi tràn ngăn xếp.
  </div>
</div>

<h3>2.2.3.3 Cây đệ quy (Recursion Tree)</h3>
<p>Khi xử lý các bài toán giải thuật liên quan đến "chia để trị" (divide and conquer), đệ quy thường mang lại cách tiếp cận trực quan hơn và mã nguồn dễ đọc hơn so với vòng lặp. Hãy lấy "dãy số Fibonacci" làm ví dụ.</p>
<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    Cho một dãy số Fibonacci $0, 1, 1, 2, 3, 5, 8, 13, \\dots$, hãy tìm số thứ $n$ trong dãy.
  </div>
</div>
<p>Gọi số thứ $n$ của dãy Fibonacci là $f(n)$. Ta có thể dễ dàng rút ra hai kết luận:</p>
<ul>
  <li>Hai số đầu tiên của dãy là $f(1) = 0$ và $f(2) = 1$.</li>
  <li>Mỗi số trong dãy bằng tổng hai số liền trước nó, tức là $f(n) = f(n - 1) + f(n - 2)$.</li>
</ul>
<p>Dựa theo công thức truy hồi để thực hiện các lời gọi đệ quy, với hai số đầu tiên làm điều kiện dừng, ta có thể viết mã đệ quy như sau. Gọi <code>fib(n)</code> sẽ cho ta số thứ $n$ của dãy Fibonacci:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int fib(int n) {
        // Termination condition f(1) = 0, f(2) = 1
        if (n == 1 || n == 2)
            return n - 1;
        // Recursive call f(n) = f(n-1) + f(n-2)
        int res = fib(n - 1) + fib(n - 2);
        // Return result f(n)
        return res;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun fib(n: Int): Int {
    // Termination condition f(1) = 0, f(2) = 1
    if (n == 1 || n == 2)
        return n - 1
    // Recursive call f(n) = f(n-1) + f(n-2)
    val res = fib(n - 1) + fib(n - 2)
    // Return result f(n)
    return res
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func fib(n: Int) -&gt; Int {
    // Termination condition f(1) = 0, f(2) = 1
    if n == 1 || n == 2 {
        return n - 1
    }
    // Recursive call f(n) = f(n-1) + f(n-2)
    let res = fib(n: n - 1) + fib(n: n - 2)
    // Return result f(n)
    return res
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int fib(int n) {
  // Termination condition f(1) = 0, f(2) = 1
  if (n == 1 || n == 2) return n - 1;
  // Recursive call f(n) = f(n-1) + f(n-2)
  int res = fib(n - 1) + fib(n - 2);
  // Return result f(n)
  return res;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def fib(n: int) -&gt; int:
    """Fibonacci sequence: recursion"""
    # Termination condition f(1) = 0, f(2) = 1
    if n == 1 or n == 2:
        return n - 1
    # Recursive call f(n) = f(n-1) + f(n-2)
    res = fib(n - 1) + fib(n - 2)
    # Return result f(n)
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int fib(int n) {
    // Termination condition f(1) = 0, f(2) = 1
    if (n == 1 || n == 2)
        return n - 1;
    // Recursive call f(n) = f(n-1) + f(n-2)
    int res = fib(n - 1) + fib(n - 2);
    // Return result f(n)
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int Fib(int n) {
        // Termination condition f(1) = 0, f(2) = 1
        if (n == 1 || n == 2)
            return n - 1;
        // Recursive call f(n) = f(n-1) + f(n-2)
        int res = Fib(n - 1) + Fib(n - 2);
        // Return result f(n)
        return res;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func fib(n int) int {
	// Termination condition f(1) = 0, f(2) = 1
	if n == 1 || n == 2 {
		return n - 1
	}
	// Recursive call f(n) = f(n-1) + f(n-2)
	res := fib(n-1) + fib(n-2)
	// Return result f(n)
	return res
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function fib(n) {
    // Termination condition f(1) = 0, f(2) = 1
    if (n === 1 || n === 2) return n - 1;
    // Recursive call f(n) = f(n-1) + f(n-2)
    const res = fib(n - 1) + fib(n - 2);
    // Return result f(n)
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function fib(n: number): number {
    // Termination condition f(1) = 0, f(2) = 1
    if (n === 1 || n === 2) return n - 1;
    // Recursive call f(n) = f(n-1) + f(n-2)
    const res = fib(n - 1) + fib(n - 2);
    // Return result f(n)
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn fib(n: i32) -&gt; i32 {
    // Termination condition f(1) = 0, f(2) = 1
    if n == 1 || n == 2 {
        return n - 1;
    }
    // Recursive call f(n) = f(n-1) + f(n-2)
    let res = fib(n - 1) + fib(n - 2);
    // Return result
    res
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int fib(int n) {
    // Termination condition f(1) = 0, f(2) = 1
    if (n == 1 || n == 2)
        return n - 1;
    // Recursive call f(n) = f(n-1) + f(n-2)
    int res = fib(n - 1) + fib(n - 2);
    // Return result f(n)
    return res;
}</code></pre></div></div></div>

<p>Quan sát đoạn mã trên, hàm thực hiện hai lời gọi đệ quy trong một lượt, <strong>nghĩa là một lời gọi sẽ sinh ra hai nhánh gọi con</strong>. Như minh họa trong hình dưới đây, việc gọi đệ quy lặp đi lặp lại này cuối cùng tạo ra một <strong>cây đệ quy (recursion tree)</strong> với $n$ tầng.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/recursion_tree.png" alt="Cây đệ quy tính số Fibonacci" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Về bản chất, đệ quy thể hiện tư duy "phân rã bài toán thành các bài toán con nhỏ hơn", và chiến lược chia để trị này đóng vai trò then chốt.</p>
<ul>
  <li>Ở góc độ giải thuật, nhiều chiến lược giải thuật quan trọng như tìm kiếm, sắp xếp, quay lui, chia để trị và quy hoạch động đều áp dụng trực tiếp hoặc gián tiếp lối tư duy này.</li>
  <li>Ở góc độ cấu trúc dữ liệu, đệ quy đặc biệt phù hợp để xử lý các bài toán liên quan đến danh sách liên kết, cây và đồ thị, vì chúng rất thích hợp để phân tích bằng tư duy chia để trị.</li>
</ul>

<h2>2.2.4 So sánh hai phương pháp</h2>
<p>Tổng kết lại nội dung trên, như bảng dưới đây, vòng lặp và đệ quy khác nhau về cách triển khai, hiệu năng và khả năng ứng dụng.</p>
<table style="width:100%; border-collapse:collapse; font-size:14px; margin:1.5em 0; border: 1px solid var(--border-color);">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;"></th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Iteration (Vòng lặp)</th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Recursion (Đệ quy)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">Cách triển khai</td>
      <td style="padding:10px 15px; color:var(--text-muted);">Cấu trúc vòng lặp</td>
      <td style="padding:10px 15px; color:var(--text-muted);">Hàm tự gọi lại chính nó</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">Hiệu quả thời gian</td>
      <td style="padding:10px 15px; color:var(--text-muted);">Thường hiệu quả hơn, không có chi phí gọi hàm</td>
      <td style="padding:10px 15px; color:var(--text-muted);">Mỗi lời gọi hàm phát sinh thêm chi phí</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">Sử dụng bộ nhớ</td>
      <td style="padding:10px 15px; color:var(--text-muted);">Thường sử dụng lượng bộ nhớ cố định</td>
      <td style="padding:10px 15px; color:var(--text-muted);">Các lời gọi hàm tích lũy có thể chiếm nhiều không gian khung ngăn xếp</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">Bài toán phù hợp</td>
      <td style="padding:10px 15px; color:var(--text-muted);">Phù hợp với các tác vụ lặp đơn giản, mã nguồn trực quan, dễ đọc</td>
      <td style="padding:10px 15px; color:var(--text-muted);">Phù hợp phân rã bài toán con, như cây, đồ thị, chia để trị, quay lui..., cấu trúc mã nguồn ngắn gọn, rõ ràng</td>
    </tr>
  </tbody>
</table>

<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    Nếu bạn thấy nội dung tiếp theo khó hiểu, có thể quay lại đọc sau khi đã học chương "Ngăn xếp (Stack)".
  </div>
</div>

<p>Mối quan hệ nội tại giữa vòng lặp và đệ quy là gì? Lấy lại ví dụ hàm đệ quy ở trên, phép cộng tổng được thực hiện trong giai đoạn "đi lên" của đệ quy. Điều này có nghĩa là hàm được gọi trước lại là hàm hoàn thành phép cộng tổng sau cùng, <strong>và cơ chế hoạt động này tương tự với nguyên lý "vào sau ra trước" (LIFO) của ngăn xếp (stack)</strong>.</p>
<p>Trên thực tế, các thuật ngữ đệ quy như "ngăn xếp cuộc gọi" (call stack) và "không gian khung ngăn xếp" (stack frame space) đã ngầm gợi ý mối quan hệ mật thiết giữa đệ quy và ngăn xếp.</p>
<ol>
  <li><strong>Đi xuống (Descend)</strong>: Khi một hàm được gọi, hệ thống cấp phát một khung ngăn xếp mới trên "ngăn xếp cuộc gọi" cho hàm đó để lưu trữ các biến cục bộ, tham số, địa chỉ trả về và các dữ liệu khác của hàm.</li>
  <li><strong>Đi lên (Ascend)</strong>: Khi hàm hoàn tất thực thi và trả về, khung ngăn xếp tương ứng sẽ bị loại bỏ khỏi "ngăn xếp cuộc gọi", khôi phục lại môi trường thực thi của hàm trước đó.</li>
</ol>
<p>Do đó, <strong>chúng ta có thể dùng một ngăn xếp tường minh (explicit stack) để mô phỏng hành vi của ngăn xếp cuộc gọi</strong>, từ đó chuyển đổi đệ quy thành dạng vòng lặp:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int forLoopRecur(int n) {
        // Use an explicit stack to simulate the system call stack
        Stack&lt;Integer&gt; stack = new Stack&lt;&gt;();
        int res = 0;
        // Recurse: recursive call
        for (int i = n; i &gt; 0; i--) {
            // Simulate "recurse" with "push"
            stack.push(i);
        }
        // Return: return result
        while (!stack.isEmpty()) {
            // Simulate "return" with "pop"
            res += stack.pop();
        }
        // res = 1+2+3+...+n
        return res;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun forLoopRecur(n: Int): Int {
    // Use an explicit stack to simulate the system call stack
    val stack = Stack&lt;Int&gt;()
    var res = 0
    // Recurse: recursive call
    for (i in n downTo 0) {
        // Simulate "recurse" with "push"
        stack.push(i)
    }
    // Return: return result
    while (stack.isNotEmpty()) {
        // Simulate "return" with "pop"
        res += stack.pop()
    }
    // res = 1+2+3+...+n
    return res
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func forLoopRecur(n: Int) -&gt; Int {
    // Use an explicit stack to simulate the system call stack
    var stack: [Int] = []
    var res = 0
    // Recurse: recursive call
    for i in (1 ... n).reversed() {
        // Simulate "recurse" with "push"
        stack.append(i)
    }
    // Return: return result
    while !stack.isEmpty {
        // Simulate "return" with "pop"
        res += stack.removeLast()
    }
    // res = 1+2+3+...+n
    return res
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int forLoopRecur(int n) {
  // Use an explicit stack to simulate the system call stack
  List&lt;int&gt; stack = [];
  int res = 0;
  // Recurse: recursive call
  for (int i = n; i &gt; 0; i--) {
    // Simulate "recurse" with "push"
    stack.add(i);
  }
  // Return: return result
  while (!stack.isEmpty) {
    // Simulate "return" with "pop"
    res += stack.removeLast();
  }
  // res = 1+2+3+...+n
  return res;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def for_loop_recur(n: int) -&gt; int:
    """Simulate recursion using iteration"""
    # Use an explicit stack to simulate the system call stack
    stack = []
    res = 0
    # Recurse: recursive call
    for i in range(n, 0, -1):
        # Simulate "recurse" with "push"
        stack.append(i)
    # Return: return result
    while stack:
        # Simulate "return" with "pop"
        res += stack.pop()
    # res = 1+2+3+...+n
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int forLoopRecur(int n) {
    // Use an explicit stack to simulate the system call stack
    stack&lt;int&gt; stack;
    int res = 0;
    // Recurse: recursive call
    for (int i = n; i &gt; 0; i--) {
        // Simulate "recurse" with "push"
        stack.push(i);
    }
    // Return: return result
    while (!stack.empty()) {
        // Simulate "return" with "pop"
        res += stack.top();
        stack.pop();
    }
    // res = 1+2+3+...+n
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int ForLoopRecur(int n) {
        // Use an explicit stack to simulate the system call stack
        Stack&lt;int&gt; stack = new();
        int res = 0;
        // Recurse: recursive call
        for (int i = n; i &gt; 0; i--) {
            // Simulate "recurse" with "push"
            stack.Push(i);
        }
        // Return: return result
        while (stack.Count &gt; 0) {
            // Simulate "return" with "pop"
            res += stack.Pop();
        }
        // res = 1+2+3+...+n
        return res;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func forLoopRecur(n int) int {
	// Use an explicit stack to simulate the system call stack
	stack := list.New()
	res := 0
	// Recurse: recursive call
	for i := n; i &gt; 0; i-- {
		// Simulate "recurse" with "push"
		stack.PushBack(i)
	}
	// Return: return result
	for stack.Len() != 0 {
		// Simulate "return" with "pop"
		res += stack.Back().Value.(int)
		stack.Remove(stack.Back())
	}
	// res = 1+2+3+...+n
	return res
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function forLoopRecur(n) {
    // Use an explicit stack to simulate the system call stack
    const stack = [];
    let res = 0;
    // Recurse: recursive call
    for (let i = n; i &gt; 0; i--) {
        // Simulate "recurse" with "push"
        stack.push(i);
    }
    // Return: return result
    while (stack.length) {
        // Simulate "return" with "pop"
        res += stack.pop();
    }
    // res = 1+2+3+...+n
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function forLoopRecur(n: number): number {
    // Use an explicit stack to simulate the system call stack
    const stack: number[] = [];
    let res: number = 0;
    // Recurse: recursive call
    for (let i = n; i &gt; 0; i--) {
        // Simulate "recurse" with "push"
        stack.push(i);
    }
    // Return: return result
    while (stack.length) {
        // Simulate "return" with "pop"
        res += stack.pop();
    }
    // res = 1+2+3+...+n
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn for_loop_recur(n: i32) -&gt; i32 {
    // Use an explicit stack to simulate the system call stack
    let mut stack = Vec::new();
    let mut res = 0;
    // Recurse: recursive call
    for i in (1..=n).rev() {
        // Simulate "recurse" with "push"
        stack.push(i);
    }
    // Return: return result
    while !stack.is_empty() {
        // Simulate "return" with "pop"
        res += stack.pop().unwrap();
    }
    // res = 1+2+3+...+n
    res
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int forLoopRecur(int n) {
    int stack[1000]; // Use a large array to simulate the stack
    int top = -1;    // Stack top index
    int res = 0;
    // Recurse: recursive call
    for (int i = n; i &gt; 0; i--) {
        // Simulate "recurse" with "push"
        stack[1 + top++] = i;
    }
    // Return: return result
    while (top &gt;= 0) {
        // Simulate "return" with "pop"
        res += stack[top--];
    }
    // res = 1+2+3+...+n
    return res;
}</code></pre></div></div></div>

<p>Quan sát đoạn mã trên, khi đệ quy được chuyển thành vòng lặp, mã nguồn trở nên phức tạp hơn. Mặc dù vòng lặp và đệ quy có thể chuyển đổi qua lại lẫn nhau trong nhiều trường hợp, nhưng việc này có thể không đáng để thực hiện vì hai lý do sau:</p>
<ul>
  <li>Mã nguồn sau khi chuyển đổi có thể khó hiểu hơn và kém dễ đọc hơn.</li>
  <li>Đối với một số bài toán phức tạp, việc mô phỏng hành vi ngăn xếp cuộc gọi của hệ thống có thể rất khó khăn.</li>
</ul>
<p>Tóm lại, <strong>việc lựa chọn giữa vòng lặp và đệ quy phụ thuộc vào bản chất của từng bài toán cụ thể</strong>. Trong thực hành lập trình, việc cân nhắc ưu và nhược điểm của cả hai để chọn ra phương pháp phù hợp theo từng ngữ cảnh là vô cùng quan trọng.</p>
`,
    originalContent: `
# Iteration and Recursion

In algorithms, repeatedly executing a task is very common and closely related to complexity analysis. Therefore, before introducing time complexity and space complexity, let's first understand how to implement repeated task execution in programs, namely the two basic program control structures: iteration and recursion.

## Iteration

<u>Iteration</u> is a control structure for repeatedly executing a task. In iteration, a program repeatedly executes a segment of code under certain conditions until those conditions are no longer satisfied.

### For Loop

The \`for\` loop is one of the most common forms of iteration, **suitable for use when the number of iterations is known in advance**.

The following function implements the summation $1 + 2 + \\dots + n$ using a \`for\` loop, with the result stored in the variable \`res\`. Note that in Python, \`range(a, b)\` corresponds to a "left-closed, right-open" interval, with the traversal range being $a, a + 1, \\dots, b-1$:

\`\`\`src
[file]{iteration}-[class]{}-[func]{for_loop}
\`\`\`

The figure below shows the flowchart of this summation function.

![Flowchart of the summation function](iteration_and_recursion.assets/iteration.png)

The number of operations in this summation function is proportional to the input data size $n$, or has a "linear relationship". In fact, **time complexity describes precisely this "linear relationship"**. Related content will be introduced in detail in the next section.

### While Loop

Similar to the \`for\` loop, the \`while\` loop is also a method for implementing iteration. In a \`while\` loop, the program first checks the condition in each round; if the condition is true, it continues execution, otherwise it ends the loop.

Below we use a \`while\` loop to implement the summation $1 + 2 + \\dots + n$:

\`\`\`src
[file]{iteration}-[class]{}-[func]{while_loop}
\`\`\`

**The \`while\` loop has greater flexibility than the \`for\` loop**. In a \`while\` loop, we can freely design the initialization and update steps of the condition variable.

For example, in the following code, the condition variable $i$ is updated twice per round, which is not convenient to implement using a \`for\` loop:

\`\`\`src
[file]{iteration}-[class]{}-[func]{while_loop_ii}
\`\`\`

Overall, **\`for\` loops have more compact code, while \`while\` loops are more flexible**; both can implement iterative structures. The choice of which to use should be determined based on the requirements of the specific problem.

### Nested Loops

We can nest one loop structure inside another. Below is an example using \`for\` loops:

\`\`\`src
[file]{iteration}-[class]{}-[func]{nested_for_loop}
\`\`\`

The figure below shows the flowchart of this nested loop.

![Flowchart of nested loops](iteration_and_recursion.assets/nested_iteration.png)

In this case, the number of operations of the function is proportional to $n^2$, or the algorithm's running time has a "quadratic relationship" with the input data size $n$.

We can continue adding nested loops, where each additional level of nesting can be viewed as an increase in dimensionality, raising the time complexity to a "cubic relationship", a "quartic relationship", and so on.

## Recursion

<u>Recursion</u> is an algorithmic strategy that solves problems by having a function call itself. It mainly consists of two phases.

1. **Descend**: The program continuously calls itself deeper, usually passing in smaller or more simplified parameters, until reaching a "termination condition".
2. **Ascend**: After triggering the "termination condition", the program returns layer by layer from the deepest recursive function, aggregating the result of each layer.

From an implementation perspective, recursive code mainly consists of three elements.

1. **Termination condition**: Used to determine when to switch from "descending" to "ascending".
2. **Recursive call**: Corresponds to "descending", where the function calls itself, usually with smaller or more simplified parameters.
3. **Return result**: Corresponds to "ascending", returning the result of the current recursion level to the previous layer.

Observe the following code. We only need to call the function \`recur(n)\` to complete the calculation of $1 + 2 + \\dots + n$:

\`\`\`src
[file]{recursion}-[class]{}-[func]{recur}
\`\`\`

The figure below shows the recursive process of this function.

![Recursive process of the summation function](iteration_and_recursion.assets/recursion_sum.png)

Although from a computational perspective, iteration and recursion can achieve the same results, **they represent two completely different paradigms for thinking about and solving problems**.

- **Iteration**: Solves problems "bottom-up". Starting from the most basic steps, these steps are then repeatedly executed or accumulated until the task is complete.
- **Recursion**: Solves problems "top-down". The original problem is decomposed into smaller subproblems that have the same form as the original problem. These subproblems continue to be decomposed into even smaller subproblems until reaching the base case (where the solution is known).

Taking the above summation function as an example, let the problem be $f(n) = 1 + 2 + \\dots + n$.

- **Iteration**: Simulates the summation process in a loop, traversing from $1$ to $n$, performing the summation operation in each round to obtain $f(n)$.
- **Recursion**: Decomposes the problem into the subproblem $f(n) = n + f(n-1)$, continuously decomposing (recursively) until terminating at the base case $f(1) = 1$.

### Call Stack

Each time a recursive function calls itself, the system allocates memory for the newly invoked function to store local variables, call addresses, and other information. This leads to two consequences.

- The function's context data is stored in a memory area called "stack frame space", which is not released until the function returns. Therefore, **recursion usually consumes more memory space than iteration**.
- Recursive function calls incur additional overhead. **Therefore, recursion is usually less time-efficient than loops**.

As shown in the figure below, before the termination condition is triggered, there are $n$ unreturned recursive functions existing simultaneously, with a **recursion depth of $n$**.

![Recursion call depth](iteration_and_recursion.assets/recursion_sum_depth.png)

In practice, the recursion depth allowed by programming languages is usually limited, and excessively deep recursion may lead to stack overflow errors.

### Tail Recursion

Interestingly, **if a function makes the recursive call as the very last step before returning**, the compiler or interpreter may optimize it so that its space efficiency is comparable to iteration. This case is called <u>tail recursion</u>.

- **Regular recursion**: When a function returns to the previous level, it needs to continue executing code, so the system needs to save the context of the previous layer's call.
- **Tail recursion**: The recursive call is the last operation before the function returns, meaning that after returning to the previous level, there is no need to continue executing other operations, so the system does not need to save the context of the previous layer's function.

Taking the calculation of $1 + 2 + \\dots + n$ as an example, we can set the result variable \`res\` as a function parameter to implement tail recursion:

\`\`\`src
[file]{recursion}-[class]{}-[func]{tail_recur}
\`\`\`

The execution process of tail recursion is shown in the figure below. Comparing regular recursion and tail recursion, the summation operation is performed at different points.

- **Regular recursion**: The summation operation is performed during the "ascending" process, requiring an additional summation operation after each layer returns.
- **Tail recursion**: The summation operation is performed during the "descending" process; the "ascending" process only needs to return layer by layer.

![Tail recursion process](iteration_and_recursion.assets/tail_recursion_sum.png)

!!! tip

    Please note that many compilers or interpreters do not support tail recursion optimization. For example, Python does not support tail recursion optimization by default, so even if a function is in tail recursive form, it may still encounter stack overflow issues.

### Recursion Tree

When dealing with algorithmic problems related to "divide and conquer", recursion often provides a more intuitive approach and more readable code than iteration. Taking the "Fibonacci sequence" as an example.

!!! question

    Given a Fibonacci sequence $0, 1, 1, 2, 3, 5, 8, 13, \\dots$, find the $n$-th number in the sequence.

Let the $n$-th number of the Fibonacci sequence be $f(n)$. Two conclusions can be easily obtained.

- The first two numbers of the sequence are $f(1) = 0$ and $f(2) = 1$.
- Each number in the sequence is the sum of the previous two numbers, i.e., $f(n) = f(n - 1) + f(n - 2)$.

Following the recurrence relation to make recursive calls, with the first two numbers as termination conditions, we can write the recursive code. Calling \`fib(n)\` will give us the $n$-th number of the Fibonacci sequence:

\`\`\`src
[file]{recursion}-[class]{}-[func]{fib}
\`\`\`

Observing the above code, we make two recursive calls within the function, **meaning that one call produces two call branches**. As shown in the figure below, this repeated recursive calling eventually produces a <u>recursion tree</u> with $n$ levels.

![Recursion tree of the Fibonacci sequence](iteration_and_recursion.assets/recursion_tree.png)

Fundamentally, recursion embodies the paradigm of "decomposing a problem into smaller subproblems", and this divide-and-conquer strategy is crucial.

- From an algorithmic perspective, many important algorithmic strategies such as searching, sorting, backtracking, divide and conquer, and dynamic programming directly or indirectly apply this way of thinking.
- From a data structure perspective, recursion is naturally suited for handling problems related to linked lists, trees, and graphs, because they are well-suited for analysis using divide-and-conquer thinking.

## Comparison of the Two

Summarizing the above content, as shown in the table below, iteration and recursion differ in implementation, performance, and applicability.

<p align="center"> Table <id> &nbsp; Comparison of iteration and recursion characteristics </p>

|                | Iteration                                                | Recursion                                                                              |
| -------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Implementation | Loop structure                                           | Function calls itself                                                                  |
| Time efficiency | Generally more efficient, no function call overhead      | Each function call incurs overhead                                                     |
| Memory usage   | Usually uses a fixed amount of memory space              | Accumulated function calls may use a large amount of stack frame space                 |
| Suitable problems | Suitable for simple loop tasks, with intuitive and readable code | Suitable for subproblem decomposition, such as trees, graphs, divide and conquer, backtracking, etc., with concise and clear code structure |

!!! tip

    If you find the following content difficult to understand, you can review it after reading the "Stack" chapter.

What is the intrinsic relationship between iteration and recursion? Taking the above recursive function as an example, the summation operation is performed during the "ascending" phase of recursion. This means that the function called first actually completes its summation operation last, **and this working mechanism is similar to the "last-in, first-out" principle of stacks**.

In fact, recursive terminology such as "call stack" and "stack frame space" already hints at the close relationship between recursion and stacks.

1. **Descend**: When a function is called, the system allocates a new stack frame on the "call stack" for that function to store the function's local variables, parameters, return address, and other data.
2. **Ascend**: When the function completes execution and returns, the corresponding stack frame is removed from the "call stack", restoring the execution environment of the previous function.

Therefore, **we can use an explicit stack to simulate the behavior of the call stack**, thus transforming recursion into iterative form:

\`\`\`src
[file]{recursion}-[class]{}-[func]{for_loop_recur}
\`\`\`

Observing the above code, when recursion is transformed into iteration, the code becomes more complex. Although iteration and recursion can be converted into each other in many cases, it may not be worthwhile to do so for the following two reasons.

- The transformed code may be more difficult to understand and less readable.
- For some complex problems, simulating the behavior of the system call stack can be very difficult.

In summary, **choosing between iteration and recursion depends on the nature of the specific problem**. In programming practice, it is crucial to weigh the pros and cons of both and choose the appropriate method based on the context.
`
  },
  'dsa-time-complexity': {
    title: '2.3 Time Complexity (Độ phức tạp Thời gian)',
    summary: 'Đánh giá tốc độ thực thi của giải thuật bằng Big-O notation, tìm hiểu các cấp độ phức tạp phổ biến từ O(1) đến O(n!).',
    tags: ['dsa', 'complexity'],
    domain: 'Algorithms',
    module: 'Chương 2: Phân tích Độ phức tạp',
    prerequisites: ['dsa-iteration-recursion'],
    related: ['dsa-space-complexity'],
    updatedAt: '2026-07-16',
    readTime: '15 phút',
    content: `
<h2>2.3.1 Giới thiệu về Time Complexity</h2>
<p>Thời gian chạy (runtime) có thể phản ánh trực quan và chính xác hiệu năng của một giải thuật. Nếu muốn ước lượng chính xác thời gian chạy của một đoạn mã, chúng ta cần làm gì?</p>
<ol>
  <li><strong>Xác định nền tảng chạy</strong>, bao gồm cấu hình phần cứng, ngôn ngữ lập trình, môi trường hệ thống, v.v., vì các yếu tố này đều ảnh hưởng đến hiệu năng thực thi mã.</li>
  <li><strong>Đánh giá thời gian chạy cần thiết cho từng loại phép toán</strong>, ví dụ phép cộng <code>+</code> cần 1 ns, phép nhân <code>*</code> cần 10 ns, thao tác in <code>print()</code> cần 5 ns, v.v.</li>
  <li><strong>Đếm tất cả các phép toán trong mã</strong>, rồi cộng dồn thời gian thực thi của tất cả các phép toán để có được tổng thời gian chạy.</li>
</ol>
<p>Ví dụ, trong đoạn mã sau, kích thước dữ liệu đầu vào là $n$:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>// On a certain running platform
void algorithm(int n) {
    int a = 2;  // 1 ns
    a = a + 1;  // 1 ns
    a = a * 2;  // 10 ns
    // Loop n times
    for (int i = 0; i &lt; n; i++) {  // 1 ns
        System.out.println(0);     // 5 ns
    }
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>// On a certain running platform
fun algorithm(n: Int) {
    var a = 2 // 1 ns
    a = a + 1 // 1 ns
    a = a * 2 // 10 ns
    // Loop n times
    for (i in 0..&lt;n) {  // 1 ns
        println(0)      // 5 ns
    }
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>// On a certain running platform
func algorithm(n: Int) {
    var a = 2 // 1 ns
    a = a + 1 // 1 ns
    a = a * 2 // 10 ns
    // Loop n times
    for _ in 0 ..&lt; n { // 1 ns
        print(0) // 5 ns
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>// On a certain running platform
void algorithm(int n) {
  int a = 2; // 1 ns
  a = a + 1; // 1 ns
  a = a * 2; // 10 ns
  // Loop n times
  for (int i = 0; i &lt; n; i++) { // 1 ns
    print(0); // 5 ns
  }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code># On a certain running platform
def algorithm(n: int):
    a = 2      # 1 ns
    a = a + 1  # 1 ns
    a = a * 2  # 10 ns
    # Loop n times
    for _ in range(n):  # 1 ns
        print(0)        # 5 ns</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>// On a certain running platform
void algorithm(int n) {
    int a = 2;  // 1 ns
    a = a + 1;  // 1 ns
    a = a * 2;  // 10 ns
    // Loop n times
    for (int i = 0; i &lt; n; i++) {  // 1 ns
        cout &lt;&lt; 0 &lt;&lt; endl;         // 5 ns
    }
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>// On a certain running platform
void Algorithm(int n) {
    int a = 2;  // 1 ns
    a = a + 1;  // 1 ns
    a = a * 2;  // 10 ns
    // Loop n times
    for (int i = 0; i &lt; n; i++) {  // 1 ns
        Console.WriteLine(0);      // 5 ns
    }
}</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>// On a certain running platform
func algorithm(n int) {
	a := 2     // 1 ns
	a = a + 1  // 1 ns
	a = a * 2  // 10 ns
	// Loop n times
	for i := 0; i &lt; n; i++ {  // 1 ns
		fmt.Println(a)        // 5 ns
	}
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>// On a certain running platform
function algorithm(n) {
    var a = 2; // 1 ns
    a = a + 1; // 1 ns
    a = a * 2; // 10 ns
    // Loop n times
    for(let i = 0; i &lt; n; i++) { // 1 ns
        console.log(0); // 5 ns
    }
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>// On a certain running platform
function algorithm(n: number): void {
    var a: number = 2; // 1 ns
    a = a + 1; // 1 ns
    a = a * 2; // 10 ns
    // Loop n times
    for(let i = 0; i &lt; n; i++) { // 1 ns
        console.log(0); // 5 ns
    }
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>// On a certain running platform
fn algorithm(n: i32) {
    let mut a = 2;      // 1 ns
    a = a + 1;          // 1 ns
    a = a * 2;          // 10 ns
    // Loop n times
    for _ in 0..n {     // 1 ns
        println!("{}", 0);  // 5 ns
    }
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>// On a certain running platform
void algorithm(int n) {
    int a = 2;  // 1 ns
    a = a + 1;  // 1 ns
    a = a * 2;  // 10 ns
    // Loop n times
    for (int i = 0; i &lt; n; i++) {   // 1 ns
        printf("%d", 0);            // 5 ns
    }
}</code></pre></div></div></div>
<p>Theo phương pháp trên, ta có thể tính được thời gian chạy của giải thuật là $(6n + 12)$ ns:</p>
$$
1 + 1 + 10 + (1 + 5) \\times n = 6n + 12
$$
<p>Tuy nhiên trong thực tế, <strong>việc cố gắng đếm chính xác thời gian chạy của một giải thuật vừa không thực tế vừa khó khả thi</strong>. Thứ nhất, chúng ta không muốn ràng buộc thời gian ước lượng vào một nền tảng chạy cụ thể, vì giải thuật cần chạy được trên nhiều nền tảng khác nhau. Thứ hai, rất khó để biết chính xác thời gian chạy của từng loại phép toán, điều này khiến quá trình ước lượng trở nên cực kỳ khó khăn.</p>

<h2>2.3.2 Đếm xu hướng tăng trưởng thời gian</h2>
<p>Phân tích độ phức tạp thời gian <strong>không đếm thời gian chạy thực tế của giải thuật, mà đếm xu hướng tăng trưởng của thời gian chạy khi khối lượng dữ liệu tăng lên</strong>.</p>
<p>Khái niệm "xu hướng tăng trưởng thời gian" khá trừu tượng; hãy cùng tìm hiểu qua một ví dụ. Giả sử kích thước dữ liệu đầu vào là $n$, và cho ba giải thuật <code>A</code>, <code>B</code>, <code>C</code>:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>// Time complexity of algorithm A: constant order
void algorithm_A(int n) {
    System.out.println(0);
}
// Time complexity of algorithm B: linear order
void algorithm_B(int n) {
    for (int i = 0; i &lt; n; i++) {
        System.out.println(0);
    }
}
// Time complexity of algorithm C: constant order
void algorithm_C(int n) {
    for (int i = 0; i &lt; 1000000; i++) {
        System.out.println(0);
    }
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>// Time complexity of algorithm A: constant order
fun algoritm_A(n: Int) {
    println(0)
}
// Time complexity of algorithm B: linear order
fun algorithm_B(n: Int) {
    for (i in 0..&lt;n){
        println(0)
    }
}
// Time complexity of algorithm C: constant order
fun algorithm_C(n: Int) {
    for (i in 0..&lt;1000000) {
        println(0)
    }
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>// Time complexity of algorithm A: constant order
func algorithmA(n: Int) {
    print(0)
}

// Time complexity of algorithm B: linear order
func algorithmB(n: Int) {
    for _ in 0 ..&lt; n {
        print(0)
    }
}

// Time complexity of algorithm C: constant order
func algorithmC(n: Int) {
    for _ in 0 ..&lt; 1_000_000 {
        print(0)
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>// Time complexity of algorithm A: constant order
void algorithmA(int n) {
  print(0);
}
// Time complexity of algorithm B: linear order
void algorithmB(int n) {
  for (int i = 0; i &lt; n; i++) {
    print(0);
  }
}
// Time complexity of algorithm C: constant order
void algorithmC(int n) {
  for (int i = 0; i &lt; 1000000; i++) {
    print(0);
  }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code># Time complexity of algorithm A: constant order
def algorithm_A(n: int):
    print(0)
# Time complexity of algorithm B: linear order
def algorithm_B(n: int):
    for _ in range(n):
        print(0)
# Time complexity of algorithm C: constant order
def algorithm_C(n: int):
    for _ in range(1000000):
        print(0)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>// Time complexity of algorithm A: constant order
void algorithm_A(int n) {
    cout &lt;&lt; 0 &lt;&lt; endl;
}
// Time complexity of algorithm B: linear order
void algorithm_B(int n) {
    for (int i = 0; i &lt; n; i++) {
        cout &lt;&lt; 0 &lt;&lt; endl;
    }
}
// Time complexity of algorithm C: constant order
void algorithm_C(int n) {
    for (int i = 0; i &lt; 1000000; i++) {
        cout &lt;&lt; 0 &lt;&lt; endl;
    }
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>// Time complexity of algorithm A: constant order
void AlgorithmA(int n) {
    Console.WriteLine(0);
}
// Time complexity of algorithm B: linear order
void AlgorithmB(int n) {
    for (int i = 0; i &lt; n; i++) {
        Console.WriteLine(0);
    }
}
// Time complexity of algorithm C: constant order
void AlgorithmC(int n) {
    for (int i = 0; i &lt; 1000000; i++) {
        Console.WriteLine(0);
    }
}</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>// Time complexity of algorithm A: constant order
func algorithm_A(n int) {
    fmt.Println(0)
}
// Time complexity of algorithm B: linear order
func algorithm_B(n int) {
    for i := 0; i &lt; n; i++ {
        fmt.Println(0)
    }
}
// Time complexity of algorithm C: constant order
func algorithm_C(n int) {
    for i := 0; i &lt; 1000000; i++ {
        fmt.Println(0)
    }
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>// Time complexity of algorithm A: constant order
function algorithm_A(n) {
    console.log(0);
}
// Time complexity of algorithm B: linear order
function algorithm_B(n) {
    for (let i = 0; i &lt; n; i++) {
        console.log(0);
    }
}
// Time complexity of algorithm C: constant order
function algorithm_C(n) {
    for (let i = 0; i &lt; 1000000; i++) {
        console.log(0);
    }
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>// Time complexity of algorithm A: constant order
function algorithm_A(n: number): void {
    console.log(0);
}
// Time complexity of algorithm B: linear order
function algorithm_B(n: number): void {
    for (let i = 0; i &lt; n; i++) {
        console.log(0);
    }
}
// Time complexity of algorithm C: constant order
function algorithm_C(n: number): void {
    for (let i = 0; i &lt; 1000000; i++) {
        console.log(0);
    }
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>// Time complexity of algorithm A: constant order
fn algorithm_A(n: i32) {
    println!("{}", 0);
}
// Time complexity of algorithm B: linear order
fn algorithm_B(n: i32) {
    for _ in 0..n {
        println!("{}", 0);
    }
}
// Time complexity of algorithm C: constant order
fn algorithm_C(n: i32) {
    for _ in 0..1000000 {
        println!("{}", 0);
    }
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>// Time complexity of algorithm A: constant order
void algorithm_A(int n) {
    printf("%d", 0);
}
// Time complexity of algorithm B: linear order
void algorithm_B(int n) {
    for (int i = 0; i &lt; n; i++) {
        printf("%d", 0);
    }
}
// Time complexity of algorithm C: constant order
void algorithm_C(int n) {
    for (int i = 0; i &lt; 1000000; i++) {
        printf("%d", 0);
    }
}</code></pre></div></div></div>
<p>Hình dưới đây thể hiện độ phức tạp thời gian của ba giải thuật trên.</p>
<ul>
  <li>Giải thuật <code>A</code> chỉ có $1$ thao tác in, và thời gian chạy của giải thuật không tăng khi $n$ tăng. Ta gọi độ phức tạp thời gian của giải thuật này là "cấp độ hằng số" (constant order).</li>
  <li>Trong giải thuật <code>B</code>, thao tác in cần lặp $n$ lần, và thời gian chạy của giải thuật tăng tuyến tính khi $n$ tăng. Độ phức tạp thời gian của giải thuật này được gọi là "cấp độ tuyến tính" (linear order).</li>
  <li>Trong giải thuật <code>C</code>, thao tác in cần lặp $1000000$ lần. Mặc dù thời gian chạy rất lâu, nhưng nó không phụ thuộc vào kích thước dữ liệu đầu vào $n$. Do đó, độ phức tạp thời gian của <code>C</code> giống với <code>A</code>, vẫn là "cấp độ hằng số".</li>
</ul>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/time_complexity_simple_example.png" alt="Xu hướng tăng trưởng thời gian của giải thuật A, B và C" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>So với việc đếm trực tiếp thời gian chạy của giải thuật, phân tích độ phức tạp thời gian có những đặc điểm gì?</p>
<ul>
  <li><strong>Độ phức tạp thời gian có thể đánh giá hiệu năng giải thuật một cách hiệu quả</strong>. Ví dụ, thời gian chạy của giải thuật <code>B</code> tăng tuyến tính; khi $n > 1$ nó chậm hơn giải thuật <code>A</code>, và khi $n > 1000000$ nó chậm hơn giải thuật <code>C</code>. Trên thực tế, chỉ cần kích thước dữ liệu đầu vào $n$ đủ lớn, một giải thuật có độ phức tạp "cấp độ hằng số" sẽ luôn vượt trội hơn một giải thuật có độ phức tạp "cấp độ tuyến tính", đây chính xác là ý nghĩa của xu hướng tăng trưởng thời gian.</li>
  <li><strong>Phương pháp suy ra độ phức tạp thời gian đơn giản hơn nhiều</strong>. Rõ ràng, nền tảng chạy và các loại phép toán tính toán đều không liên quan đến xu hướng tăng trưởng của thời gian chạy giải thuật. Do đó, trong phân tích độ phức tạp thời gian, chúng ta chỉ đơn giản coi thời gian thực thi của tất cả các phép toán là cùng một "đơn vị thời gian", giản lược việc "theo dõi thời gian chạy của từng phép toán" thành "đếm số lượng phép toán", giúp giảm đáng kể độ khó của việc ước lượng.</li>
  <li><strong>Độ phức tạp thời gian cũng có những hạn chế nhất định</strong>. Ví dụ, mặc dù giải thuật <code>A</code> và <code>C</code> có cùng độ phức tạp thời gian, nhưng thời gian chạy thực tế của chúng khác nhau đáng kể. Tương tự, mặc dù giải thuật <code>B</code> có độ phức tạp thời gian cao hơn <code>C</code>, nhưng khi kích thước dữ liệu đầu vào $n$ nhỏ, giải thuật <code>B</code> rõ ràng vượt trội hơn <code>C</code>. Trong những trường hợp như vậy, thường rất khó để đánh giá hiệu năng giải thuật chỉ dựa vào độ phức tạp thời gian. Tất nhiên, dù có những vấn đề trên, phân tích độ phức tạp vẫn là phương pháp hiệu quả và phổ biến nhất để đánh giá hiệu năng giải thuật.</li>
</ul>

<h2>2.3.3 Giới hạn trên tiệm cận của hàm số</h2>
<p>Cho một hàm số với kích thước đầu vào $n$:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>void algorithm(int n) {
    int a = 1;  // +1
    a = a + 1;  // +1
    a = a * 2;  // +1
    // Loop n times
    for (int i = 0; i &lt; n; i++) { // +1 (i++ is executed each round)
        System.out.println(0);    // +1
    }
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun algorithm(n: Int) {
    var a = 1 // +1
    a = a + 1 // +1
    a = a * 2 // +1
    // Loop n times
    for (i in 0..&lt;n) { // +1 (i++ is executed each round)
        println(0) // +1
    }
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func algorithm(n: Int) {
    var a = 1 // +1
    a = a + 1 // +1
    a = a * 2 // +1
    // Loop n times
    for _ in 0 ..&lt; n { // +1
        print(0) // +1
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void algorithm(int n) {
  int a = 1; // +1
  a = a + 1; // +1
  a = a * 2; // +1
  // Loop n times
  for (int i = 0; i &lt; n; i++) { // +1 (i++ is executed each round)
    print(0); // +1
  }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def algorithm(n: int):
    a = 1      # +1
    a = a + 1  # +1
    a = a * 2  # +1
    # Loop n times
    for i in range(n):  # +1
        print(0)        # +1</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>void algorithm(int n) {
    int a = 1;  // +1
    a = a + 1;  // +1
    a = a * 2;  // +1
    // Loop n times
    for (int i = 0; i &lt; n; i++) { // +1 (i++ is executed each round)
        cout &lt;&lt; 0 &lt;&lt; endl;    // +1
    }
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>void Algorithm(int n) {
    int a = 1;  // +1
    a = a + 1;  // +1
    a = a * 2;  // +1
    // Loop n times
    for (int i = 0; i &lt; n; i++) {   // +1 (i++ is executed each round)
        Console.WriteLine(0);   // +1
    }
}</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func algorithm(n int) {
    a := 1      // +1
    a = a + 1   // +1
    a = a * 2   // +1
    // Loop n times
    for i := 0; i &lt; n; i++ {   // +1
        fmt.Println(a)         // +1
    }
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function algorithm(n) {
    var a = 1; // +1
    a += 1; // +1
    a *= 2; // +1
    // Loop n times
    for(let i = 0; i &lt; n; i++){ // +1 (i++ is executed each round)
        console.log(0); // +1
    }
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function algorithm(n: number): void{
    var a: number = 1; // +1
    a += 1; // +1
    a *= 2; // +1
    // Loop n times
    for(let i = 0; i &lt; n; i++){ // +1 (i++ is executed each round)
        console.log(0); // +1
    }
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn algorithm(n: i32) {
    let mut a = 1;   // +1
    a = a + 1;      // +1
    a = a * 2;      // +1

    // Loop n times
    for _ in 0..n { // +1 (i++ is executed each round)
        println!("{}", 0); // +1
    }
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>void algorithm(int n) {
    int a = 1;  // +1
    a = a + 1;  // +1
    a = a * 2;  // +1
    // Loop n times
    for (int i = 0; i &lt; n; i++) {   // +1 (i++ is executed each round)
        printf("%d", 0);            // +1
    }
}</code></pre></div></div></div>
<p>Gọi số lượng phép toán của giải thuật là một hàm theo kích thước dữ liệu đầu vào $n$, ký hiệu là $T(n)$. Khi đó số lượng phép toán của hàm trên là:</p>
$$
T(n) = 3 + 2n
$$
<p>$T(n)$ là một hàm tuyến tính, cho thấy xu hướng tăng trưởng thời gian chạy của nó là tuyến tính, do đó độ phức tạp thời gian của nó là cấp độ tuyến tính.</p>
<p>Ta ký hiệu độ phức tạp thời gian cấp độ tuyến tính là $O(n)$. Ký hiệu toán học này được gọi là <strong>ký hiệu Big-$O$ (Big-O notation)</strong>, đại diện cho <strong>giới hạn trên tiệm cận (asymptotic upper bound)</strong> của hàm $T(n)$.</p>
<p>Phân tích độ phức tạp thời gian về bản chất là tính giới hạn trên tiệm cận của "số lượng phép toán $T(n)$", điều này có một định nghĩa toán học rõ ràng.</p>

<div class="callout callout-note">
  <span class="callout-icon">📝</span>
  <div class="callout-body">
    <strong>Giới hạn trên tiệm cận của hàm số</strong><br/>
    Nếu tồn tại các số thực dương $c$ và $n_0$ sao cho với mọi $n > n_0$, ta có $T(n) \\le c \\cdot f(n)$, thì $f(n)$ có thể được coi là giới hạn trên tiệm cận của $T(n)$, ký hiệu là $T(n) = O(f(n))$.
  </div>
</div>

<p>Như minh họa trong hình dưới đây, việc tính giới hạn trên tiệm cận chính là tìm một hàm $f(n)$ sao cho khi $n$ tiến tới vô cùng, $T(n)$ và $f(n)$ ở cùng một mức độ tăng trưởng, chỉ khác nhau bởi một hệ số hằng số $c$.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/asymptotic_upper_bound.png" alt="Giới hạn trên tiệm cận của một hàm số" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>2.3.4 Phương pháp suy luận</h2>
<p>Ý tưởng về giới hạn trên tiệm cận có phần mang tính toán học. Nếu bạn cảm thấy chưa hiểu trọn vẹn, đừng lo lắng. Chúng ta có thể nắm vững phương pháp suy luận trước, rồi dần dần hiểu được ý nghĩa toán học của nó qua quá trình luyện tập liên tục.</p>
<p>Theo định nghĩa, sau khi xác định được $f(n)$, ta có thể thu được độ phức tạp thời gian $O(f(n))$. Vậy làm thế nào để xác định giới hạn trên tiệm cận $f(n)$? Nhìn chung, việc này được chia thành hai bước: đầu tiên đếm số lượng phép toán, sau đó xác định giới hạn trên tiệm cận.</p>

<h3>2.3.4.1 Bước 1: Đếm số lượng phép toán</h3>
<p>Đối với mã nguồn, hãy đếm từ trên xuống dưới, từng dòng một. Tuy nhiên, vì hệ số hằng số $c$ trong $c \\cdot f(n)$ ở trên có thể lớn tùy ý, nên <strong>các hệ số và số hạng hằng số trong số lượng phép toán $T(n)$ đều có thể bỏ qua</strong>. Dựa theo nguyên tắc này, ta có thể tổng kết các kỹ thuật đơn giản hóa việc đếm sau đây.</p>
<ol>
  <li><strong>Bỏ qua các hằng số trong $T(n)$</strong>. Vì chúng đều không phụ thuộc vào $n$, nên không ảnh hưởng đến độ phức tạp thời gian.</li>
  <li><strong>Bỏ qua tất cả các hệ số</strong>. Ví dụ, lặp $2n$ lần, $5n + 1$ lần, v.v., đều có thể đơn giản hóa thành $n$ lần, vì hệ số đứng trước $n$ không ảnh hưởng đến độ phức tạp thời gian.</li>
  <li><strong>Dùng phép nhân cho các vòng lặp lồng nhau</strong>. Tổng số lượng phép toán bằng tích của số lượng phép toán ở vòng lặp ngoài và vòng lặp trong, mỗi tầng vòng lặp vẫn có thể áp dụng riêng kỹ thuật \`1.\` và \`2.\`.</li>
</ol>
<p>Cho một hàm số, ta có thể dùng các kỹ thuật trên để đếm số lượng phép toán:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>void algorithm(int n) {
    int a = 1;  // +0 (Technique 1)
    a = a + n;  // +0 (Technique 1)
    // +n (Technique 2)
    for (int i = 0; i &lt; 5 * n + 1; i++) {
        System.out.println(0);
    }
    // +n*n (Technique 3)
    for (int i = 0; i &lt; 2 * n; i++) {
        for (int j = 0; j &lt; n + 1; j++) {
            System.out.println(0);
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun algorithm(n: Int) {
    var a = 1   // +0 (Technique 1)
    a = a + n   // +0 (Technique 1)
    // +n (Technique 2)
    for (i in 0..&lt;5 * n + 1) {
        println(0)
    }
    // +n*n (Technique 3)
    for (i in 0..&lt;2 * n) {
        for (j in 0..&lt;n + 1) {
            println(0)
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func algorithm(n: Int) {
    var a = 1 // +0 (Technique 1)
    a = a + n // +0 (Technique 1)
    // +n (Technique 2)
    for _ in 0 ..&lt; (5 * n + 1) {
        print(0)
    }
    // +n*n (Technique 3)
    for _ in 0 ..&lt; (2 * n) {
        for _ in 0 ..&lt; (n + 1) {
            print(0)
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void algorithm(int n) {
  int a = 1; // +0 (Technique 1)
  a = a + n; // +0 (Technique 1)
  // +n (Technique 2)
  for (int i = 0; i &lt; 5 * n + 1; i++) {
    print(0);
  }
  // +n*n (Technique 3)
  for (int i = 0; i &lt; 2 * n; i++) {
    for (int j = 0; j &lt; n + 1; j++) {
      print(0);
    }
  }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def algorithm(n: int):
    a = 1      # +0 (Technique 1)
    a = a + n  # +0 (Technique 1)
    # +n (Technique 2)
    for i in range(5 * n + 1):
        print(0)
    # +n*n (Technique 3)
    for i in range(2 * n):
        for j in range(n + 1):
            print(0)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>void algorithm(int n) {
    int a = 1;  // +0 (Technique 1)
    a = a + n;  // +0 (Technique 1)
    // +n (Technique 2)
    for (int i = 0; i &lt; 5 * n + 1; i++) {
        cout &lt;&lt; 0 &lt;&lt; endl;
    }
    // +n*n (Technique 3)
    for (int i = 0; i &lt; 2 * n; i++) {
        for (int j = 0; j &lt; n + 1; j++) {
            cout &lt;&lt; 0 &lt;&lt; endl;
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>void Algorithm(int n) {
    int a = 1;  // +0 (Technique 1)
    a = a + n;  // +0 (Technique 1)
    // +n (Technique 2)
    for (int i = 0; i &lt; 5 * n + 1; i++) {
        Console.WriteLine(0);
    }
    // +n*n (Technique 3)
    for (int i = 0; i &lt; 2 * n; i++) {
        for (int j = 0; j &lt; n + 1; j++) {
            Console.WriteLine(0);
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func algorithm(n int) {
    a := 1     // +0 (Technique 1)
    a = a + n  // +0 (Technique 1)
    // +n (Technique 2)
    for i := 0; i &lt; 5 * n + 1; i++ {
        fmt.Println(0)
    }
    // +n*n (Technique 3)
    for i := 0; i &lt; 2 * n; i++ {
        for j := 0; j &lt; n + 1; j++ {
            fmt.Println(0)
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function algorithm(n) {
    let a = 1;  // +0 (Technique 1)
    a = a + n;  // +0 (Technique 1)
    // +n (Technique 2)
    for (let i = 0; i &lt; 5 * n + 1; i++) {
        console.log(0);
    }
    // +n*n (Technique 3)
    for (let i = 0; i &lt; 2 * n; i++) {
        for (let j = 0; j &lt; n + 1; j++) {
            console.log(0);
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function algorithm(n: number): void {
    let a = 1;  // +0 (Technique 1)
    a = a + n;  // +0 (Technique 1)
    // +n (Technique 2)
    for (let i = 0; i &lt; 5 * n + 1; i++) {
        console.log(0);
    }
    // +n*n (Technique 3)
    for (let i = 0; i &lt; 2 * n; i++) {
        for (let j = 0; j &lt; n + 1; j++) {
            console.log(0);
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn algorithm(n: i32) {
    let mut a = 1;     // +0 (Technique 1)
    a = a + n;        // +0 (Technique 1)

    // +n (Technique 2)
    for i in 0..(5 * n + 1) {
        println!("{}", 0);
    }

    // +n*n (Technique 3)
    for i in 0..(2 * n) {
        for j in 0..(n + 1) {
            println!("{}", 0);
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>void algorithm(int n) {
    int a = 1;  // +0 (Technique 1)
    a = a + n;  // +0 (Technique 1)
    // +n (Technique 2)
    for (int i = 0; i &lt; 5 * n + 1; i++) {
        printf("%d", 0);
    }
    // +n*n (Technique 3)
    for (int i = 0; i &lt; 2 * n; i++) {
        for (int j = 0; j &lt; n + 1; j++) {
            printf("%d", 0);
        }
    }
}</code></pre></div></div></div>
<p>Công thức dưới đây cho thấy kết quả đếm trước và sau khi áp dụng các kỹ thuật trên; cả hai đều suy ra độ phức tạp thời gian $O(n^2)$.</p>
$$
\\begin{aligned}
T(n) & = 2n(n + 1) + (5n + 1) + 2 & \\text{Đếm đầy đủ (-.-|||)} \\newline
& = 2n^2 + 7n + 3 \\newline
T(n) & = n^2 + n & \\text{Đếm rút gọn (o.O)}
\\end{aligned}
$$

<h3>2.3.4.2 Bước 2: Xác định giới hạn trên tiệm cận</h3>
<p><strong>Độ phức tạp thời gian được quyết định bởi số hạng bậc cao nhất trong $T(n)$</strong>. Điều này là vì khi $n$ tiến tới vô cùng, số hạng bậc cao nhất sẽ đóng vai trò chi phối, còn ảnh hưởng của các số hạng khác có thể bỏ qua.</p>
<p>Bảng dưới đây trình bày một số ví dụ, trong đó một vài giá trị được phóng đại để nhấn mạnh kết luận rằng "hệ số không thể làm lay chuyển bậc". Khi $n$ tiến tới vô cùng, các hằng số này trở nên không đáng kể.</p>
<table style="width:100%; border-collapse:collapse; font-size:14px; margin:1.5em 0; border: 1px solid var(--border-color);">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Số lượng phép toán $T(n)$</th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Độ phức tạp thời gian $O(f(n))$</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">$100000$</td>
      <td style="padding:10px 15px; color:var(--text-muted);">$O(1)$</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">$3n + 2$</td>
      <td style="padding:10px 15px; color:var(--text-muted);">$O(n)$</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">$2n^2 + 3n + 2$</td>
      <td style="padding:10px 15px; color:var(--text-muted);">$O(n^2)$</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">$n^3 + 10000n^2$</td>
      <td style="padding:10px 15px; color:var(--text-muted);">$O(n^3)$</td>
    </tr>
    <tr style="border-bottom:1px solid var(--border-color);">
      <td style="padding:10px 15px; color:var(--text-secondary);">$2^n + 10000n^{10000}$</td>
      <td style="padding:10px 15px; color:var(--text-muted);">$O(2^n)$</td>
    </tr>
  </tbody>
</table>

<h2>2.3.5 Các cấp độ phức tạp thời gian phổ biến</h2>
<p>Giả sử kích thước dữ liệu đầu vào là $n$, các cấp độ phức tạp thời gian phổ biến được minh họa trong hình dưới đây (sắp xếp theo thứ tự từ thấp đến cao):</p>
$$
\\begin{aligned}
& O(1) < O(\\log n) < O(n) < O(n \\log n) < O(n^2) < O(2^n) < O(n!) \\newline
& \\text{Hằng số} < \\text{Logarit} < \\text{Tuyến tính} < \\text{Tuyến tính-logarit} < \\text{Bình phương} < \\text{Lũy thừa} < \\text{Giai thừa}
\\end{aligned}
$$

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/time_complexity_common_types.png" alt="Các cấp độ phức tạp thời gian phổ biến" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>2.3.5.1 Độ phức tạp hằng số $O(1)$</h3>
<p>Số lượng phép toán không phụ thuộc vào kích thước dữ liệu đầu vào $n$:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int constant(int n) {
        int count = 0;
        int size = 100000;
        for (int i = 0; i &lt; size; i++)
            count++;
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun constant(n: Int): Int {
    var count = 0
    val size = 100000
    for (i in 0..&lt;size)
        count++
    return count
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func constant(n: Int) -&gt; Int {
    var count = 0
    let size = 100_000
    for _ in 0 ..&lt; size {
        count += 1
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int constant(int n) {
  int count = 0;
  int size = 100000;
  for (var i = 0; i &lt; size; i++) {
    count++;
  }
  return count;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def constant(n: int) -&gt; int:
    """Constant order"""
    count = 0
    size = 100000
    for _ in range(size):
        count += 1
    return count</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int constant(int n) {
    int count = 0;
    int size = 100000;
    for (int i = 0; i &lt; size; i++)
        count++;
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int Constant(int n) {
        int count = 0;
        int size = 100000;
        for (int i = 0; i &lt; size; i++)
            count++;
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func constant(n int) int {
	count := 0
	size := 100000
	for i := 0; i &lt; size; i++ {
		count++
	}
	return count
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function constant(n) {
    let count = 0;
    const size = 100000;
    for (let i = 0; i &lt; size; i++) count++;
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function constant(n: number): number {
    let count = 0;
    const size = 100000;
    for (let i = 0; i &lt; size; i++) count++;
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn constant(n: i32) -&gt; i32 {
    _ = n;
    let mut count = 0;
    let size = 100_000;
    for _ in 0..size {
        count += 1;
    }
    count
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int constant(int n) {
    int count = 0;
    int size = 100000;
    int i = 0;
    for (int i = 0; i &lt; size; i++) {
        count++;
    }
    return count;
}</code></pre></div></div></div>

<h3>2.3.5.2 Độ phức tạp tuyến tính $O(n)$</h3>
<p>Số lượng phép toán tăng tuyến tính theo kích thước dữ liệu $n$, thường xuất hiện trong các vòng lặp đơn để duyệt qua mảng:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int linear(int n) {
        int count = 0;
        for (int i = 0; i &lt; n; i++)
            count++;
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun linear(n: Int): Int {
    var count = 0
    for (i in 0..&lt;n)
        count++
    return count
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func linear(n: Int) -&gt; Int {
    var count = 0
    for _ in 0 ..&lt; n {
        count += 1
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int linear(int n) {
  int count = 0;
  for (var i = 0; i &lt; n; i++) {
    count++;
  }
  return count;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def linear(n: int) -&gt; int:
    """Linear order"""
    count = 0
    for _ in range(n):
        count += 1
    return count</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int linear(int n) {
    int count = 0;
    for (int i = 0; i &lt; n; i++)
        count++;
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int Linear(int n) {
        int count = 0;
        for (int i = 0; i &lt; n; i++)
            count++;
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func linear(n int) int {
	count := 0
	for i := 0; i &lt; n; i++ {
		count++
	}
	return count
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function linear(n) {
    let count = 0;
    for (let i = 0; i &lt; n; i++) count++;
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function linear(n: number): number {
    let count = 0;
    for (let i = 0; i &lt; n; i++) count++;
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn linear(n: i32) -&gt; i32 {
    let mut count = 0;
    for _ in 0..n {
        count += 1;
    }
    count
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int linear(int n) {
    int count = 0;
    for (int i = 0; i &lt; n; i++) {
        count++;
    }
    return count;
}</code></pre></div></div></div>

<p>Các thao tác như duyệt mảng và duyệt danh sách liên kết đều có độ phức tạp thời gian $O(n)$, trong đó $n$ là độ dài của mảng hoặc danh sách liên kết:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int arrayTraversal(int[] nums) {
        int count = 0;
        // Number of iterations is proportional to the array length
        for (int num : nums) {
            count++;
        }
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun arrayTraversal(nums: IntArray): Int {
    var count = 0
    // Number of iterations is proportional to the array length
    for (num in nums) {
        count++
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func arrayTraversal(nums: [Int]) -&gt; Int {
    var count = 0
    // Number of iterations is proportional to the array length
    for _ in nums {
        count += 1
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int arrayTraversal(List&lt;int&gt; nums) {
  int count = 0;
  // Number of iterations is proportional to the array length
  for (var _num in nums) {
    count++;
  }
  return count;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def array_traversal(nums: list[int]) -&gt; int:
    """Linear order (traversing array)"""
    count = 0
    # Number of iterations is proportional to the array length
    for num in nums:
        count += 1
    return count</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int arrayTraversal(vector&lt;int&gt; &amp;nums) {
    int count = 0;
    // Number of iterations is proportional to the array length
    for (int num : nums) {
        count++;
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int ArrayTraversal(int[] nums) {
        int count = 0;
        // Number of iterations is proportional to the array length
        foreach (int num in nums) {
            count++;
        }
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func arrayTraversal(nums []int) int {
	count := 0
	// Number of iterations is proportional to the array length
	for range nums {
		count++
	}
	return count
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function arrayTraversal(nums) {
    let count = 0;
    // Number of iterations is proportional to the array length
    for (let i = 0; i &lt; nums.length; i++) {
        count++;
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function arrayTraversal(nums: number[]): number {
    let count = 0;
    // Number of iterations is proportional to the array length
    for (let i = 0; i &lt; nums.length; i++) {
        count++;
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn array_traversal(nums: &amp;[i32]) -&gt; i32 {
    let mut count = 0;
    // Number of iterations is proportional to the array length
    for _ in nums {
        count += 1;
    }
    count
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int arrayTraversal(int *nums, int n) {
    int count = 0;
    // Number of iterations is proportional to the array length
    for (int i = 0; i &lt; n; i++) {
        count++;
    }
    return count;
}</code></pre></div></div></div>

<p>Cần lưu ý rằng <strong>kích thước dữ liệu đầu vào $n$ cần được xác định tùy theo loại dữ liệu đầu vào</strong>. Ví dụ, trong ví dụ đầu tiên, biến $n$ chính là kích thước dữ liệu đầu vào; còn trong ví dụ thứ hai, độ dài mảng $n$ mới là kích thước dữ liệu.</p>

<h3>2.3.5.3 Độ phức tạp bình phương $O(n^2)$</h3>
<p>Thường xuất hiện trong các thuật toán có hai vòng lặp lồng nhau duyệt qua dữ liệu, ví dụ thuật toán sắp xếp nổi bọt (Bubble Sort):</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int quadratic(int n) {
        int count = 0;
        // Number of iterations is quadratically related to the data size n
        for (int i = 0; i &lt; n; i++) {
            for (int j = 0; j &lt; n; j++) {
                count++;
            }
        }
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun quadratic(n: Int): Int {
    var count = 0
    // Number of iterations is quadratically related to the data size n
    for (i in 0..&lt;n) {
        for (j in 0..&lt;n) {
            count++
        }
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func quadratic(n: Int) -&gt; Int {
    var count = 0
    // Number of iterations is quadratically related to the data size n
    for _ in 0 ..&lt; n {
        for _ in 0 ..&lt; n {
            count += 1
        }
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int quadratic(int n) {
  int count = 0;
  // Number of iterations is quadratically related to the data size n
  for (int i = 0; i &lt; n; i++) {
    for (int j = 0; j &lt; n; j++) {
      count++;
    }
  }
  return count;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def quadratic(n: int) -&gt; int:
    """Quadratic order"""
    count = 0
    # Number of iterations is quadratically related to the data size n
    for i in range(n):
        for j in range(n):
            count += 1
    return count</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int quadratic(int n) {
    int count = 0;
    // Number of iterations is quadratically related to the data size n
    for (int i = 0; i &lt; n; i++) {
        for (int j = 0; j &lt; n; j++) {
            count++;
        }
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int Quadratic(int n) {
        int count = 0;
        // Number of iterations is quadratically related to the data size n
        for (int i = 0; i &lt; n; i++) {
            for (int j = 0; j &lt; n; j++) {
                count++;
            }
        }
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func quadratic(n int) int {
	count := 0
	// Number of iterations is quadratically related to the data size n
	for i := 0; i &lt; n; i++ {
		for j := 0; j &lt; n; j++ {
			count++
		}
	}
	return count
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function quadratic(n) {
    let count = 0;
    // Number of iterations is quadratically related to the data size n
    for (let i = 0; i &lt; n; i++) {
        for (let j = 0; j &lt; n; j++) {
            count++;
        }
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function quadratic(n: number): number {
    let count = 0;
    // Number of iterations is quadratically related to the data size n
    for (let i = 0; i &lt; n; i++) {
        for (let j = 0; j &lt; n; j++) {
            count++;
        }
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn quadratic(n: i32) -&gt; i32 {
    let mut count = 0;
    // Number of iterations is quadratically related to the data size n
    for _ in 0..n {
        for _ in 0..n {
            count += 1;
        }
    }
    count
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int quadratic(int n) {
    int count = 0;
    // Number of iterations is quadratically related to the data size n
    for (int i = 0; i &lt; n; i++) {
        for (int j = 0; j &lt; n; j++) {
            count++;
        }
    }
    return count;
}</code></pre></div></div></div>

<p>Hình dưới đây so sánh độ phức tạp thời gian hằng số, tuyến tính và bình phương.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/time_complexity_constant_linear_quadratic.png" alt="Độ phức tạp thời gian của các cấp độ hằng số, tuyến tính và bình phương" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Lấy sắp xếp nổi bọt (bubble sort) làm ví dụ, vòng lặp ngoài thực thi $n - 1$ lần, còn vòng lặp trong thực thi $n-1, n-2, \\dots, 2, 1$ lần, trung bình $n / 2$ lần, cho ra độ phức tạp thời gian $O((n - 1) n / 2) = O(n^2)$:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int bubbleSort(int[] nums) {
        int count = 0; // Counter
        // Outer loop: unsorted range is [0, i]
        for (int i = nums.length - 1; i &gt; 0; i--) {
            // Inner loop: swap the largest element in the unsorted range [0, i] to the rightmost end of that range
            for (int j = 0; j &lt; i; j++) {
                if (nums[j] &gt; nums[j + 1]) {
                    // Swap nums[j] and nums[j + 1]
                    int tmp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = tmp;
                    count += 3; // Element swap includes 3 unit operations
                }
            }
        }
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun bubbleSort(nums: IntArray): Int {
    var count = 0 // Counter
    // Outer loop: unsorted range is [0, i]
    for (i in nums.size - 1 downTo 1) {
        // Inner loop: swap the largest element in the unsorted range [0, i] to the rightmost end of that range
        for (j in 0..&lt;i) {
            if (nums[j] &gt; nums[j + 1]) {
                // Swap nums[j] and nums[j + 1]
                val temp = nums[j]
                nums[j] = nums[j + 1]
                nums[j + 1] = temp
                count += 3 // Element swap includes 3 unit operations
            }
        }
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func bubbleSort(nums: inout [Int]) -&gt; Int {
    var count = 0 // Counter
    // Outer loop: unsorted range is [0, i]
    for i in nums.indices.dropFirst().reversed() {
        // Inner loop: swap the largest element in the unsorted range [0, i] to the rightmost end of that range
        for j in 0 ..&lt; i {
            if nums[j] &gt; nums[j + 1] {
                // Swap nums[j] and nums[j + 1]
                let tmp = nums[j]
                nums[j] = nums[j + 1]
                nums[j + 1] = tmp
                count += 3 // Element swap includes 3 unit operations
            }
        }
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int bubbleSort(List&lt;int&gt; nums) {
  int count = 0; // Counter
  // Outer loop: unsorted range is [0, i]
  for (var i = nums.length - 1; i &gt; 0; i--) {
    // Inner loop: swap the largest element in the unsorted range [0, i] to the rightmost end of that range
    for (var j = 0; j &lt; i; j++) {
      if (nums[j] &gt; nums[j + 1]) {
        // Swap nums[j] and nums[j + 1]
        int tmp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = tmp;
        count += 3; // Element swap includes 3 unit operations
      }
    }
  }
  return count;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def bubble_sort(nums: list[int]) -&gt; int:
    """Quadratic order (bubble sort)"""
    count = 0  # Counter
    # Outer loop: unsorted range is [0, i]
    for i in range(len(nums) - 1, 0, -1):
        # Inner loop: swap the largest element in the unsorted range [0, i] to the rightmost end of that range
        for j in range(i):
            if nums[j] &gt; nums[j + 1]:
                # Swap nums[j] and nums[j + 1]
                tmp: int = nums[j]
                nums[j] = nums[j + 1]
                nums[j + 1] = tmp
                count += 3  # Element swap includes 3 unit operations
    return count</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int bubbleSort(vector&lt;int&gt; &amp;nums) {
    int count = 0; // Counter
    // Outer loop: unsorted range is [0, i]
    for (int i = nums.size() - 1; i &gt; 0; i--) {
        // Inner loop: swap the largest element in the unsorted range [0, i] to the rightmost end of that range
        for (int j = 0; j &lt; i; j++) {
            if (nums[j] &gt; nums[j + 1]) {
                // Swap nums[j] and nums[j + 1]
                int tmp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = tmp;
                count += 3; // Element swap includes 3 unit operations
            }
        }
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int BubbleSort(int[] nums) {
        int count = 0;  // Counter
        // Outer loop: unsorted range is [0, i]
        for (int i = nums.Length - 1; i &gt; 0; i--) {
            // Inner loop: swap the largest element in the unsorted range [0, i] to the rightmost end of that range
            for (int j = 0; j &lt; i; j++) {
                if (nums[j] &gt; nums[j + 1]) {
                    // Swap nums[j] and nums[j + 1]
                    (nums[j + 1], nums[j]) = (nums[j], nums[j + 1]);
                    count += 3;  // Element swap includes 3 unit operations
                }
            }
        }
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func bubbleSort(nums []int) int {
	count := 0 // Counter
	// Outer loop: unsorted range is [0, i]
	for i := len(nums) - 1; i &gt; 0; i-- {
		// Inner loop: swap the largest element in the unsorted range [0, i] to the rightmost end of that range
		for j := 0; j &lt; i; j++ {
			if nums[j] &gt; nums[j+1] {
				// Swap nums[j] and nums[j + 1]
				tmp := nums[j]
				nums[j] = nums[j+1]
				nums[j+1] = tmp
				count += 3 // Element swap includes 3 unit operations
			}
		}
	}
	return count
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function bubbleSort(nums) {
    let count = 0; // Counter
    // Outer loop: unsorted range is [0, i]
    for (let i = nums.length - 1; i &gt; 0; i--) {
        // Inner loop: swap the largest element in the unsorted range [0, i] to the rightmost end of that range
        for (let j = 0; j &lt; i; j++) {
            if (nums[j] &gt; nums[j + 1]) {
                // Swap nums[j] and nums[j + 1]
                let tmp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = tmp;
                count += 3; // Element swap includes 3 unit operations
            }
        }
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function bubbleSort(nums: number[]): number {
    let count = 0; // Counter
    // Outer loop: unsorted range is [0, i]
    for (let i = nums.length - 1; i &gt; 0; i--) {
        // Inner loop: swap the largest element in the unsorted range [0, i] to the rightmost end of that range
        for (let j = 0; j &lt; i; j++) {
            if (nums[j] &gt; nums[j + 1]) {
                // Swap nums[j] and nums[j + 1]
                let tmp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = tmp;
                count += 3; // Element swap includes 3 unit operations
            }
        }
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn bubble_sort(nums: &amp;mut [i32]) -&gt; i32 {
    let mut count = 0; // Counter

    // Outer loop: unsorted range is [0, i]
    for i in (1..nums.len()).rev() {
        // Inner loop: swap the largest element in the unsorted range [0, i] to the rightmost end of that range
        for j in 0..i {
            if nums[j] &gt; nums[j + 1] {
                // Swap nums[j] and nums[j + 1]
                let tmp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = tmp;
                count += 3; // Element swap includes 3 unit operations
            }
        }
    }
    count
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int bubbleSort(int *nums, int n) {
    int count = 0; // Counter
    // Outer loop: unsorted range is [0, i]
    for (int i = n - 1; i &gt; 0; i--) {
        // Inner loop: swap the largest element in the unsorted range [0, i] to the rightmost end of that range
        for (int j = 0; j &lt; i; j++) {
            if (nums[j] &gt; nums[j + 1]) {
                // Swap nums[j] and nums[j + 1]
                int tmp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = tmp;
                count += 3; // Element swap includes 3 unit operations
            }
        }
    }
    return count;
}</code></pre></div></div></div>

<h3>2.3.5.4 Độ phức tạp lũy thừa $O(2^n)$</h3>
<p>Thường xuất hiện trong các hàm đệ quy phân nhánh đôi mà không được tối ưu hóa bộ nhớ đệm (caching), ví dụ tính số Fibonacci theo cách đệ quy thông thường:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int exponential(int n) {
        int count = 0, base = 1;
        // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
        for (int i = 0; i &lt; n; i++) {
            for (int j = 0; j &lt; base; j++) {
                count++;
            }
            base *= 2;
        }
        // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun exponential(n: Int): Int {
    var count = 0
    var base = 1
    // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
    for (i in 0..&lt;n) {
        for (j in 0..&lt;base) {
            count++
        }
        base *= 2
    }
    // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
    return count
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func exponential(n: Int) -&gt; Int {
    var count = 0
    var base = 1
    // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
    for _ in 0 ..&lt; n {
        for _ in 0 ..&lt; base {
            count += 1
        }
        base *= 2
    }
    // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
    return count
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int exponential(int n) {
  int count = 0, base = 1;
  // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
  for (var i = 0; i &lt; n; i++) {
    for (var j = 0; j &lt; base; j++) {
      count++;
    }
    base *= 2;
  }
  // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
  return count;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def exponential(n: int) -&gt; int:
    """Exponential order (loop implementation)"""
    count = 0
    base = 1
    # Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
    for _ in range(n):
        for _ in range(base):
            count += 1
        base *= 2
    # count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
    return count</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int exponential(int n) {
    int count = 0, base = 1;
    // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
    for (int i = 0; i &lt; n; i++) {
        for (int j = 0; j &lt; base; j++) {
            count++;
        }
        base *= 2;
    }
    // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int Exponential(int n) {
        int count = 0, bas = 1;
        // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
        for (int i = 0; i &lt; n; i++) {
            for (int j = 0; j &lt; bas; j++) {
                count++;
            }
            bas *= 2;
        }
        // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func exponential(n int) int {
	count, base := 0, 1
	// Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
	for i := 0; i &lt; n; i++ {
		for j := 0; j &lt; base; j++ {
			count++
		}
		base *= 2
	}
	// count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
	return count
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function exponential(n) {
    let count = 0,
        base = 1;
    // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
    for (let i = 0; i &lt; n; i++) {
        for (let j = 0; j &lt; base; j++) {
            count++;
        }
        base *= 2;
    }
    // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function exponential(n: number): number {
    let count = 0,
        base = 1;
    // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
    for (let i = 0; i &lt; n; i++) {
        for (let j = 0; j &lt; base; j++) {
            count++;
        }
        base *= 2;
    }
    // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn exponential(n: i32) -&gt; i32 {
    let mut count = 0;
    let mut base = 1;
    // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
    for _ in 0..n {
        for _ in 0..base {
            count += 1
        }
        base *= 2;
    }
    // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
    count
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int exponential(int n) {
    int count = 0;
    int bas = 1;
    // Cells divide into two every round, forming sequence 1, 2, 4, 8, ..., 2^(n-1)
    for (int i = 0; i &lt; n; i++) {
        for (int j = 0; j &lt; bas; j++) {
            count++;
        }
        bas *= 2;
    }
    // count = 1 + 2 + 4 + 8 + .. + 2^(n-1) = 2^n - 1
    return count;
}</code></pre></div></div></div>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/time_complexity_exponential.png" alt="Độ phức tạp thời gian cấp độ lũy thừa" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Trong các giải thuật thực tế, độ phức tạp lũy thừa thường xuất hiện trong các hàm đệ quy. Ví dụ, đoạn mã dưới đây thực hiện phân nhánh đôi một cách đệ quy, và dừng lại sau $n$ lần phân nhánh:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int expRecur(int n) {
        if (n == 1)
            return 1;
        return expRecur(n - 1) + expRecur(n - 1) + 1;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun expRecur(n: Int): Int {
    if (n == 1) {
        return 1
    }
    return expRecur(n - 1) + expRecur(n - 1) + 1
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func expRecur(n: Int) -&gt; Int {
    if n == 1 {
        return 1
    }
    return expRecur(n: n - 1) + expRecur(n: n - 1) + 1
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int expRecur(int n) {
  if (n == 1) return 1;
  return expRecur(n - 1) + expRecur(n - 1) + 1;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def exp_recur(n: int) -&gt; int:
    """Exponential order (recursive implementation)"""
    if n == 1:
        return 1
    return exp_recur(n - 1) + exp_recur(n - 1) + 1</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int expRecur(int n) {
    if (n == 1)
        return 1;
    return expRecur(n - 1) + expRecur(n - 1) + 1;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int ExpRecur(int n) {
        if (n == 1) return 1;
        return ExpRecur(n - 1) + ExpRecur(n - 1) + 1;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func expRecur(n int) int {
	if n == 1 {
		return 1
	}
	return expRecur(n-1) + expRecur(n-1) + 1
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function expRecur(n) {
    if (n === 1) return 1;
    return expRecur(n - 1) + expRecur(n - 1) + 1;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function expRecur(n: number): number {
    if (n === 1) return 1;
    return expRecur(n - 1) + expRecur(n - 1) + 1;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn exp_recur(n: i32) -&gt; i32 {
    if n == 1 {
        return 1;
    }
    exp_recur(n - 1) + exp_recur(n - 1) + 1
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int expRecur(int n) {
    if (n == 1)
        return 1;
    return expRecur(n - 1) + expRecur(n - 1) + 1;
}</code></pre></div></div></div>

<p>Tốc độ tăng trưởng của độ phức tạp lũy thừa rất nhanh, thường gặp trong các phương pháp vét cạn (brute force, quay lui, v.v.). Với các bài toán có quy mô dữ liệu lớn, độ phức tạp lũy thừa là không thể chấp nhận được và thường cần giải quyết bằng quy hoạch động hoặc giải thuật tham lam.</p>

<h3>2.3.5.5 Độ phức tạp logarit $O(\\log n)$</h3>
<p>Thường xuất hiện trong các giải thuật chia đôi không gian tìm kiếm sau mỗi bước, ví dụ giải thuật tìm kiếm nhị phân (Binary Search):</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int logarithmic(int n) {
        int count = 0;
        while (n &gt; 1) {
            n = n / 2;
            count++;
        }
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun logarithmic(n: Int): Int {
    var n1 = n
    var count = 0
    while (n1 &gt; 1) {
        n1 /= 2
        count++
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func logarithmic(n: Int) -&gt; Int {
    var count = 0
    var n = n
    while n &gt; 1 {
        n = n / 2
        count += 1
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int logarithmic(int n) {
  int count = 0;
  while (n &gt; 1) {
    n = n ~/ 2;
    count++;
  }
  return count;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def logarithmic(n: int) -&gt; int:
    """Logarithmic order (loop implementation)"""
    count = 0
    while n &gt; 1:
        n = n / 2
        count += 1
    return count</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int logarithmic(int n) {
    int count = 0;
    while (n &gt; 1) {
        n = n / 2;
        count++;
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int Logarithmic(int n) {
        int count = 0;
        while (n &gt; 1) {
            n /= 2;
            count++;
        }
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func logarithmic(n int) int {
	count := 0
	for n &gt; 1 {
		n = n / 2
		count++
	}
	return count
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function logarithmic(n) {
    let count = 0;
    while (n &gt; 1) {
        n = n / 2;
        count++;
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function logarithmic(n: number): number {
    let count = 0;
    while (n &gt; 1) {
        n = n / 2;
        count++;
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn logarithmic(mut n: i32) -&gt; i32 {
    let mut count = 0;
    while n &gt; 1 {
        n = n / 2;
        count += 1;
    }
    count
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int logarithmic(int n) {
    int count = 0;
    while (n &gt; 1) {
        n = n / 2;
        count++;
    }
    return count;
}</code></pre></div></div></div>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/time_complexity_logarithmic.png" alt="Độ phức tạp thời gian cấp độ logarit" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Tương tự cấp độ lũy thừa, cấp độ logarit cũng thường xuất hiện trong các hàm đệ quy. Đoạn mã dưới đây tạo thành một cây đệ quy có chiều cao $\\log_2 n$:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int logRecur(int n) {
        if (n &lt;= 1)
            return 0;
        return logRecur(n / 2) + 1;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun logRecur(n: Int): Int {
    if (n &lt;= 1)
        return 0
    return logRecur(n / 2) + 1
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func logRecur(n: Int) -&gt; Int {
    if n &lt;= 1 {
        return 0
    }
    return logRecur(n: n / 2) + 1
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int logRecur(int n) {
  if (n &lt;= 1) return 0;
  return logRecur(n ~/ 2) + 1;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def log_recur(n: int) -&gt; int:
    """Logarithmic order (recursive implementation)"""
    if n &lt;= 1:
        return 0
    return log_recur(n / 2) + 1</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int logRecur(int n) {
    if (n &lt;= 1)
        return 0;
    return logRecur(n / 2) + 1;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int LogRecur(int n) {
        if (n &lt;= 1) return 0;
        return LogRecur(n / 2) + 1;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func logRecur(n int) int {
	if n &lt;= 1 {
		return 0
	}
	return logRecur(n/2) + 1
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function logRecur(n) {
    if (n &lt;= 1) return 0;
    return logRecur(n / 2) + 1;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function logRecur(n: number): number {
    if (n &lt;= 1) return 0;
    return logRecur(n / 2) + 1;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn log_recur(n: i32) -&gt; i32 {
    if n &lt;= 1 {
        return 0;
    }
    log_recur(n / 2) + 1
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int logRecur(int n) {
    if (n &lt;= 1)
        return 0;
    return logRecur(n / 2) + 1;
}</code></pre></div></div></div>

<p>Độ phức tạp logarit thường xuất hiện trong các giải thuật dựa trên chiến lược chia để trị, phản ánh tư duy liên tục chia nhỏ bài toán để đơn giản hóa nó. Tốc độ tăng trưởng của nó rất chậm, và là độ phức tạp thời gian lý tưởng chỉ đứng sau cấp độ hằng số.</p>

<h3>2.3.5.6 Độ phức tạp tuyến tính - logarit $O(n \\log n)$</h3>
<p>Cấp độ này xuất hiện nhiều trong các giải thuật sắp xếp tối ưu như sắp xếp nhanh (Quick Sort) hoặc sắp xếp trộn (Merge Sort):</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int linearLogRecur(int n) {
        if (n &lt;= 1)
            return 1;
        int count = linearLogRecur(n / 2) + linearLogRecur(n / 2);
        for (int i = 0; i &lt; n; i++) {
            count++;
        }
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun linearLogRecur(n: Int): Int {
    if (n &lt;= 1)
        return 1
    var count = linearLogRecur(n / 2) + linearLogRecur(n / 2)
    for (i in 0..&lt;n) {
        count++
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func linearLogRecur(n: Int) -&gt; Int {
    if n &lt;= 1 {
        return 1
    }
    var count = linearLogRecur(n: n / 2) + linearLogRecur(n: n / 2)
    for _ in stride(from: 0, to: n, by: 1) {
        count += 1
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int linearLogRecur(int n) {
  if (n &lt;= 1) return 1;
  int count = linearLogRecur(n ~/ 2) + linearLogRecur(n ~/ 2);
  for (var i = 0; i &lt; n; i++) {
    count++;
  }
  return count;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def linear_log_recur(n: int) -&gt; int:
    """Linearithmic order"""
    if n &lt;= 1:
        return 1
    # Divide into two, the scale of subproblems is reduced by half
    count = linear_log_recur(n // 2) + linear_log_recur(n // 2)
    # Current subproblem contains n operations
    for _ in range(n):
        count += 1
    return count</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int linearLogRecur(int n) {
    if (n &lt;= 1)
        return 1;
    int count = linearLogRecur(n / 2) + linearLogRecur(n / 2);
    for (int i = 0; i &lt; n; i++) {
        count++;
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int LinearLogRecur(int n) {
        if (n &lt;= 1) return 1;
        int count = LinearLogRecur(n / 2) + LinearLogRecur(n / 2);
        for (int i = 0; i &lt; n; i++) {
            count++;
        }
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func linearLogRecur(n int) int {
	if n &lt;= 1 {
		return 1
	}
	count := linearLogRecur(n/2) + linearLogRecur(n/2)
	for i := 0; i &lt; n; i++ {
		count++
	}
	return count
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function linearLogRecur(n) {
    if (n &lt;= 1) return 1;
    let count = linearLogRecur(n / 2) + linearLogRecur(n / 2);
    for (let i = 0; i &lt; n; i++) {
        count++;
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function linearLogRecur(n: number): number {
    if (n &lt;= 1) return 1;
    let count = linearLogRecur(n / 2) + linearLogRecur(n / 2);
    for (let i = 0; i &lt; n; i++) {
        count++;
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn linear_log_recur(n: i32) -&gt; i32 {
    if n &lt;= 1 {
        return 1;
    }
    let mut count = linear_log_recur(n / 2) + linear_log_recur(n / 2);
    for _ in 0..n {
        count += 1;
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int linearLogRecur(int n) {
    if (n &lt;= 1)
        return 1;
    int count = linearLogRecur(n / 2) + linearLogRecur(n / 2);
    for (int i = 0; i &lt; n; i++) {
        count++;
    }
    return count;
}</code></pre></div></div></div>

<p>Hình dưới đây minh họa cách độ phức tạp tuyến tính - logarit hình thành. Mỗi tầng của cây nhị phân có tổng cộng $n$ phép toán, và cây có $\\log_2 n + 1$ tầng, cho ra độ phức tạp thời gian $O(n \\log n)$.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/time_complexity_logarithmic_linear.png" alt="Độ phức tạp thời gian cấp độ tuyến tính - logarit" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Các giải thuật sắp xếp phổ biến thường có độ phức tạp thời gian $O(n \\log n)$, ví dụ sắp xếp nhanh (Quick Sort), sắp xếp trộn (Merge Sort) và sắp xếp vun đống (Heap Sort).</p>

<h3>2.3.5.7 Độ phức tạp giai thừa $O(n!)$</h3>
<p>Đây là tốc độ tăng trưởng cực kỳ nhanh, xuất hiện khi giải bài toán tìm mọi hoán vị của một tập hợp:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int factorialRecur(int n) {
        if (n == 0)
            return 1;
        int count = 0;
        // Split from 1 into n
        for (int i = 0; i &lt; n; i++) {
            count += factorialRecur(n - 1);
        }
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun factorialRecur(n: Int): Int {
    if (n == 0)
        return 1
    var count = 0
    // Split from 1 into n
    for (i in 0..&lt;n) {
        count += factorialRecur(n - 1)
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func factorialRecur(n: Int) -&gt; Int {
    if n == 0 {
        return 1
    }
    var count = 0
    // Split from 1 into n
    for _ in 0 ..&lt; n {
        count += factorialRecur(n: n - 1)
    }
    return count
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int factorialRecur(int n) {
  if (n == 0) return 1;
  int count = 0;
  // Split from 1 into n
  for (var i = 0; i &lt; n; i++) {
    count += factorialRecur(n - 1);
  }
  return count;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def factorial_recur(n: int) -&gt; int:
    """Factorial order (recursive implementation)"""
    if n == 0:
        return 1
    count = 0
    # Split from 1 into n
    for _ in range(n):
        count += factorial_recur(n - 1)
    return count</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int factorialRecur(int n) {
    if (n == 0)
        return 1;
    int count = 0;
    // Split from 1 into n
    for (int i = 0; i &lt; n; i++) {
        count += factorialRecur(n - 1);
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int FactorialRecur(int n) {
        if (n == 0) return 1;
        int count = 0;
        // Split from 1 into n
        for (int i = 0; i &lt; n; i++) {
            count += FactorialRecur(n - 1);
        }
        return count;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func factorialRecur(n int) int {
	if n == 0 {
		return 1
	}
	count := 0
	// Split from 1 into n
	for i := 0; i &lt; n; i++ {
		count += factorialRecur(n - 1)
	}
	return count
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function factorialRecur(n) {
    if (n === 0) return 1;
    let count = 0;
    // Split from 1 into n
    for (let i = 0; i &lt; n; i++) {
        count += factorialRecur(n - 1);
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function factorialRecur(n: number): number {
    if (n === 0) return 1;
    let count = 0;
    // Split from 1 into n
    for (let i = 0; i &lt; n; i++) {
        count += factorialRecur(n - 1);
    }
    return count;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn factorial_recur(n: i32) -&gt; i32 {
    if n == 0 {
        return 1;
    }
    let mut count = 0;
    // Split from 1 into n
    for _ in 0..n {
        count += factorial_recur(n - 1);
    }
    count
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int factorialRecur(int n) {
    if (n == 0)
        return 1;
    int count = 0;
    for (int i = 0; i &lt; n; i++) {
        count += factorialRecur(n - 1);
    }
    return count;
}</code></pre></div></div></div>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/time_complexity_factorial.png" alt="Độ phức tạp thời gian cấp độ giai thừa" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Cần lưu ý rằng vì khi $n \\geq 4$ luôn có $n! > 2^n$, nên độ phức tạp giai thừa tăng trưởng nhanh hơn độ phức tạp lũy thừa, và cũng không thể chấp nhận được với các giá trị $n$ lớn.</p>

<h2>2.3.6 Trường hợp tốt nhất, xấu nhất và trung bình</h2>
<p>Hiệu năng giải thuật có thể thay đổi tùy thuộc vào sự phân bố cụ thể của dữ liệu đầu vào. Ví dụ, trong bài toán tìm kiếm tuyến tính:</p>
<ul>
  <li><strong>Best-case Time Complexity (Trường hợp tốt nhất)</strong>: Phần tử cần tìm nằm ở ngay đầu mảng ($O(1)$).</li>
  <li><strong>Worst-case Time Complexity (Trường hợp xấu nhất)</strong>: Phần tử nằm ở cuối mảng hoặc không tồn tại ($O(n)$). Đây là độ phức tạp thực tế quan trọng nhất vì nó đảm bảo an toàn cho hệ thống.</li>
  <li><strong>Average-case Time Complexity (Trường hợp trung bình)</strong>: Kỳ vọng số bước thực thi trên mọi phân bố dữ liệu đầu vào.</li>
</ul>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int findOne(int[] nums) {
        for (int i = 0; i &lt; nums.length; i++) {
            // When element 1 is at the head of the array, best time complexity O(1) is achieved
            // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
            if (nums[i] == 1)
                return i;
        }
        return -1;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun findOne(nums: Array&lt;Int?&gt;): Int {
    for (i in nums.indices) {
        // When element 1 is at the head of the array, best time complexity O(1) is achieved
        // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
        if (nums[i] == 1)
            return i
    }
    return -1
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func findOne(nums: [Int]) -&gt; Int {
    for i in nums.indices {
        // When element 1 is at the head of the array, best time complexity O(1) is achieved
        // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
        if nums[i] == 1 {
            return i
        }
    }
    return -1
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int findOne(List&lt;int&gt; nums) {
  for (var i = 0; i &lt; nums.length; i++) {
    // When element 1 is at the head of the array, best time complexity O(1) is achieved
    // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
    if (nums[i] == 1) return i;
  }

  return -1;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def find_one(nums: list[int]) -&gt; int:
    """Find the index of number 1 in array nums"""
    for i in range(len(nums)):
        # When element 1 is at the head of the array, best time complexity O(1) is achieved
        # When element 1 is at the tail of the array, worst time complexity O(n) is achieved
        if nums[i] == 1:
            return i
    return -1</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int findOne(vector&lt;int&gt; &amp;nums) {
    for (int i = 0; i &lt; nums.size(); i++) {
        // When element 1 is at the head of the array, best time complexity O(1) is achieved
        // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
        if (nums[i] == 1)
            return i;
    }
    return -1;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int FindOne(int[] nums) {
        for (int i = 0; i &lt; nums.Length; i++) {
            // When element 1 is at the head of the array, best time complexity O(1) is achieved
            // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
            if (nums[i] == 1)
                return i;
        }
        return -1;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func findOne(nums []int) int {
	for i := 0; i &lt; len(nums); i++ {
		// When element 1 is at the head of the array, best time complexity O(1) is achieved
		// When element 1 is at the tail of the array, worst time complexity O(n) is achieved
		if nums[i] == 1 {
			return i
		}
	}
	return -1
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function findOne(nums) {
    for (let i = 0; i &lt; nums.length; i++) {
        // When element 1 is at the head of the array, best time complexity O(1) is achieved
        // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
        if (nums[i] === 1) {
            return i;
        }
    }
    return -1;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function findOne(nums: number[]): number {
    for (let i = 0; i &lt; nums.length; i++) {
        // When element 1 is at the head of the array, best time complexity O(1) is achieved
        // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
        if (nums[i] === 1) {
            return i;
        }
    }
    return -1;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn find_one(nums: &amp;[i32]) -&gt; Option&lt;usize&gt; {
    for i in 0..nums.len() {
        // When element 1 is at the head of the array, best time complexity O(1) is achieved
        // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
        if nums[i] == 1 {
            return Some(i);
        }
    }
    None
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int findOne(int *nums, int n) {
    for (int i = 0; i &lt; n; i++) {
        // When element 1 is at the head of the array, best time complexity O(1) is achieved
        // When element 1 is at the tail of the array, worst time complexity O(n) is achieved
        if (nums[i] == 1)
            return i;
    }
    return -1;
}</code></pre></div></div></div>
`,
    originalContent: `
# Time Complexity

Runtime can intuitively and accurately reflect the efficiency of an algorithm. If we want to accurately estimate the runtime of a piece of code, how should we proceed?

1. **Determine the running platform**, including hardware configuration, programming language, system environment, etc., as these factors all affect code execution efficiency.
2. **Evaluate the runtime required for various computational operations**, for example, an addition operation \`+\` requires 1 ns, a multiplication operation \`*\` requires 10 ns, a print operation \`print()\` requires 5 ns, etc.
3. **Count all computational operations in the code**, and sum the execution times of all operations to obtain the runtime.

For example, in the following code, the input data size is $n$:

=== "Python"

    \`\`\`python title=""
    # On a certain running platform
    def algorithm(n: int):
        a = 2      # 1 ns
        a = a + 1  # 1 ns
        a = a * 2  # 10 ns
        # Loop n times
        for _ in range(n):  # 1 ns
            print(0)        # 5 ns
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    // On a certain running platform
    void algorithm(int n) {
        int a = 2;  // 1 ns
        a = a + 1;  // 1 ns
        a = a * 2;  // 10 ns
        // Loop n times
        for (int i = 0; i < n; i++) {  // 1 ns
            cout << 0 << endl;         // 5 ns
        }
    }
    \`\`\`

=== "Java"

    \`\`\`java title=""
    // On a certain running platform
    void algorithm(int n) {
        int a = 2;  // 1 ns
        a = a + 1;  // 1 ns
        a = a * 2;  // 10 ns
        // Loop n times
        for (int i = 0; i < n; i++) {  // 1 ns
            System.out.println(0);     // 5 ns
        }
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    // On a certain running platform
    void Algorithm(int n) {
        int a = 2;  // 1 ns
        a = a + 1;  // 1 ns
        a = a * 2;  // 10 ns
        // Loop n times
        for (int i = 0; i < n; i++) {  // 1 ns
            Console.WriteLine(0);      // 5 ns
        }
    }
    \`\`\`

=== "Go"

    \`\`\`go title=""
    // On a certain running platform
    func algorithm(n int) {
        a := 2     // 1 ns
        a = a + 1  // 1 ns
        a = a * 2  // 10 ns
        // Loop n times
        for i := 0; i < n; i++ {  // 1 ns
            fmt.Println(a)        // 5 ns
        }
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    // On a certain running platform
    func algorithm(n: Int) {
        var a = 2 // 1 ns
        a = a + 1 // 1 ns
        a = a * 2 // 10 ns
        // Loop n times
        for _ in 0 ..< n { // 1 ns
            print(0) // 5 ns
        }
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    // On a certain running platform
    function algorithm(n) {
        var a = 2; // 1 ns
        a = a + 1; // 1 ns
        a = a * 2; // 10 ns
        // Loop n times
        for(let i = 0; i < n; i++) { // 1 ns
            console.log(0); // 5 ns
        }
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    // On a certain running platform
    function algorithm(n: number): void {
        var a: number = 2; // 1 ns
        a = a + 1; // 1 ns
        a = a * 2; // 10 ns
        // Loop n times
        for(let i = 0; i < n; i++) { // 1 ns
            console.log(0); // 5 ns
        }
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    // On a certain running platform
    void algorithm(int n) {
      int a = 2; // 1 ns
      a = a + 1; // 1 ns
      a = a * 2; // 10 ns
      // Loop n times
      for (int i = 0; i < n; i++) { // 1 ns
        print(0); // 5 ns
      }
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    // On a certain running platform
    fn algorithm(n: i32) {
        let mut a = 2;      // 1 ns
        a = a + 1;          // 1 ns
        a = a * 2;          // 10 ns
        // Loop n times
        for _ in 0..n {     // 1 ns
            println!("{}", 0);  // 5 ns
        }
    }
    \`\`\`

=== "C"

    \`\`\`c title=""
    // On a certain running platform
    void algorithm(int n) {
        int a = 2;  // 1 ns
        a = a + 1;  // 1 ns
        a = a * 2;  // 10 ns
        // Loop n times
        for (int i = 0; i < n; i++) {   // 1 ns
            printf("%d", 0);            // 5 ns
        }
    }
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    // On a certain running platform
    fun algorithm(n: Int) {
        var a = 2 // 1 ns
        a = a + 1 // 1 ns
        a = a * 2 // 10 ns
        // Loop n times
        for (i in 0..<n) {  // 1 ns
            println(0)      // 5 ns
        }
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    # On a certain running platform
    def algorithm(n)
        a = 2       # 1 ns
        a = a + 1   # 1 ns
        a = a * 2   # 10 ns
        # Loop n times
        (0...n).each do # 1 ns
            puts 0      # 5 ns
        end
    end
    \`\`\`

According to the above method, the algorithm's runtime can be obtained as $(6n + 12)$ ns:

$$
1 + 1 + 10 + (1 + 5) \\times n = 6n + 12
$$

In reality, however, **trying to count an algorithm's exact runtime is neither practical nor realistic**. First, we do not want to tie the estimated time to the running platform, because algorithms need to run on many different platforms. Second, it is difficult to know the runtime of each type of operation, which makes the estimation process extremely difficult.

## Counting Time Growth Trends

Time complexity analysis does not count the algorithm's runtime, **but rather counts the growth trend of the algorithm's runtime as the data volume increases**.

The concept of "time growth trend" is rather abstract; let us understand it through an example. Suppose the input data size is $n$, and given three algorithms \`A\`, \`B\`, and \`C\`:

=== "Python"

    \`\`\`python title=""
    # Time complexity of algorithm A: constant order
    def algorithm_A(n: int):
        print(0)
    # Time complexity of algorithm B: linear order
    def algorithm_B(n: int):
        for _ in range(n):
            print(0)
    # Time complexity of algorithm C: constant order
    def algorithm_C(n: int):
        for _ in range(1000000):
            print(0)
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    // Time complexity of algorithm A: constant order
    void algorithm_A(int n) {
        cout << 0 << endl;
    }
    // Time complexity of algorithm B: linear order
    void algorithm_B(int n) {
        for (int i = 0; i < n; i++) {
            cout << 0 << endl;
        }
    }
    // Time complexity of algorithm C: constant order
    void algorithm_C(int n) {
        for (int i = 0; i < 1000000; i++) {
            cout << 0 << endl;
        }
    }
    \`\`\`

=== "Java"

    \`\`\`java title=""
    // Time complexity of algorithm A: constant order
    void algorithm_A(int n) {
        System.out.println(0);
    }
    // Time complexity of algorithm B: linear order
    void algorithm_B(int n) {
        for (int i = 0; i < n; i++) {
            System.out.println(0);
        }
    }
    // Time complexity of algorithm C: constant order
    void algorithm_C(int n) {
        for (int i = 0; i < 1000000; i++) {
            System.out.println(0);
        }
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    // Time complexity of algorithm A: constant order
    void AlgorithmA(int n) {
        Console.WriteLine(0);
    }
    // Time complexity of algorithm B: linear order
    void AlgorithmB(int n) {
        for (int i = 0; i < n; i++) {
            Console.WriteLine(0);
        }
    }
    // Time complexity of algorithm C: constant order
    void AlgorithmC(int n) {
        for (int i = 0; i < 1000000; i++) {
            Console.WriteLine(0);
        }
    }
    \`\`\`

=== "Go"

    \`\`\`go title=""
    // Time complexity of algorithm A: constant order
    func algorithm_A(n int) {
        fmt.Println(0)
    }
    // Time complexity of algorithm B: linear order
    func algorithm_B(n int) {
        for i := 0; i < n; i++ {
            fmt.Println(0)
        }
    }
    // Time complexity of algorithm C: constant order
    func algorithm_C(n int) {
        for i := 0; i < 1000000; i++ {
            fmt.Println(0)
        }
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    // Time complexity of algorithm A: constant order
    func algorithmA(n: Int) {
        print(0)
    }

    // Time complexity of algorithm B: linear order
    func algorithmB(n: Int) {
        for _ in 0 ..< n {
            print(0)
        }
    }

    // Time complexity of algorithm C: constant order
    func algorithmC(n: Int) {
        for _ in 0 ..< 1_000_000 {
            print(0)
        }
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    // Time complexity of algorithm A: constant order
    function algorithm_A(n) {
        console.log(0);
    }
    // Time complexity of algorithm B: linear order
    function algorithm_B(n) {
        for (let i = 0; i < n; i++) {
            console.log(0);
        }
    }
    // Time complexity of algorithm C: constant order
    function algorithm_C(n) {
        for (let i = 0; i < 1000000; i++) {
            console.log(0);
        }
    }

    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    // Time complexity of algorithm A: constant order
    function algorithm_A(n: number): void {
        console.log(0);
    }
    // Time complexity of algorithm B: linear order
    function algorithm_B(n: number): void {
        for (let i = 0; i < n; i++) {
            console.log(0);
        }
    }
    // Time complexity of algorithm C: constant order
    function algorithm_C(n: number): void {
        for (let i = 0; i < 1000000; i++) {
            console.log(0);
        }
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    // Time complexity of algorithm A: constant order
    void algorithmA(int n) {
      print(0);
    }
    // Time complexity of algorithm B: linear order
    void algorithmB(int n) {
      for (int i = 0; i < n; i++) {
        print(0);
      }
    }
    // Time complexity of algorithm C: constant order
    void algorithmC(int n) {
      for (int i = 0; i < 1000000; i++) {
        print(0);
      }
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    // Time complexity of algorithm A: constant order
    fn algorithm_A(n: i32) {
        println!("{}", 0);
    }
    // Time complexity of algorithm B: linear order
    fn algorithm_B(n: i32) {
        for _ in 0..n {
            println!("{}", 0);
        }
    }
    // Time complexity of algorithm C: constant order
    fn algorithm_C(n: i32) {
        for _ in 0..1000000 {
            println!("{}", 0);
        }
    }
    \`\`\`

=== "C"

    \`\`\`c title=""
    // Time complexity of algorithm A: constant order
    void algorithm_A(int n) {
        printf("%d", 0);
    }
    // Time complexity of algorithm B: linear order
    void algorithm_B(int n) {
        for (int i = 0; i < n; i++) {
            printf("%d", 0);
        }
    }
    // Time complexity of algorithm C: constant order
    void algorithm_C(int n) {
        for (int i = 0; i < 1000000; i++) {
            printf("%d", 0);
        }
    }
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    // Time complexity of algorithm A: constant order
    fun algoritm_A(n: Int) {
        println(0)
    }
    // Time complexity of algorithm B: linear order
    fun algorithm_B(n: Int) {
        for (i in 0..<n){
            println(0)
        }
    }
    // Time complexity of algorithm C: constant order
    fun algorithm_C(n: Int) {
        for (i in 0..<1000000) {
            println(0)
        }
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    # Time complexity of algorithm A: constant order
    def algorithm_A(n)
        puts 0
    end

    # Time complexity of algorithm B: linear order
    def algorithm_B(n)
        (0...n).each { puts 0 }
    end

    # Time complexity of algorithm C: constant order
    def algorithm_C(n)
        (0...1_000_000).each { puts 0 }
    end
    \`\`\`

The figure below shows the time complexity of the above three algorithm functions.

- Algorithm \`A\` has only $1$ print operation, and the algorithm's runtime does not grow as $n$ increases. We call the time complexity of this algorithm "constant order".
- In algorithm \`B\`, the print operation needs to loop $n$ times, and the algorithm's runtime grows linearly as $n$ increases. The time complexity of this algorithm is called "linear order".
- In algorithm \`C\`, the print operation needs to loop $1000000$ times. Although the runtime is very long, it is independent of the input data size $n$. Therefore, the time complexity of \`C\` is the same as \`A\`, still "constant order".

![Time growth trends of algorithms A, B, and C](time_complexity.assets/time_complexity_simple_example.png)

Compared to directly counting the algorithm's runtime, what are the characteristics of time complexity analysis?

- **Time complexity can effectively evaluate algorithm efficiency**. For example, the runtime of algorithm \`B\` grows linearly; when $n > 1$ it is slower than algorithm \`A\`, and when $n > 1000000$ it is slower than algorithm \`C\`. In fact, as long as the input data size $n$ is sufficiently large, an algorithm with "constant order" complexity will always be superior to one with "linear order" complexity, which is precisely the meaning of time growth trend.
- **The derivation method for time complexity is simpler**. Obviously, the running platform and the types of computational operations are both unrelated to the growth trend of the algorithm's runtime. Therefore, in time complexity analysis, we can simply treat the execution time of all computational operations as the same "unit time", reducing "tracking the runtime of each operation" to "counting the number of operations", which greatly reduces the difficulty of estimation.
- **Time complexity also has certain limitations**. For example, although algorithms \`A\` and \`C\` have the same time complexity, their actual runtimes differ significantly. Similarly, although algorithm \`B\` has a higher time complexity than \`C\`, when the input data size $n$ is small, algorithm \`B\` is clearly superior to algorithm \`C\`. In such cases, it is often difficult to judge the efficiency of algorithms based solely on time complexity. Of course, despite the above issues, complexity analysis remains the most effective and commonly used method for evaluating algorithm efficiency.

## Asymptotic Upper Bound of Functions

Given a function with input size $n$:

=== "Python"

    \`\`\`python title=""
    def algorithm(n: int):
        a = 1      # +1
        a = a + 1  # +1
        a = a * 2  # +1
        # Loop n times
        for i in range(n):  # +1
            print(0)        # +1
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    void algorithm(int n) {
        int a = 1;  // +1
        a = a + 1;  // +1
        a = a * 2;  // +1
        // Loop n times
        for (int i = 0; i < n; i++) { // +1 (i++ is executed each round)
            cout << 0 << endl;    // +1
        }
    }
    \`\`\`

=== "Java"

    \`\`\`java title=""
    void algorithm(int n) {
        int a = 1;  // +1
        a = a + 1;  // +1
        a = a * 2;  // +1
        // Loop n times
        for (int i = 0; i < n; i++) { // +1 (i++ is executed each round)
            System.out.println(0);    // +1
        }
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    void Algorithm(int n) {
        int a = 1;  // +1
        a = a + 1;  // +1
        a = a * 2;  // +1
        // Loop n times
        for (int i = 0; i < n; i++) {   // +1 (i++ is executed each round)
            Console.WriteLine(0);   // +1
        }
    }
    \`\`\`

=== "Go"

    \`\`\`go title=""
    func algorithm(n int) {
        a := 1      // +1
        a = a + 1   // +1
        a = a * 2   // +1
        // Loop n times
        for i := 0; i < n; i++ {   // +1
            fmt.Println(a)         // +1
        }
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    func algorithm(n: Int) {
        var a = 1 // +1
        a = a + 1 // +1
        a = a * 2 // +1
        // Loop n times
        for _ in 0 ..< n { // +1
            print(0) // +1
        }
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    function algorithm(n) {
        var a = 1; // +1
        a += 1; // +1
        a *= 2; // +1
        // Loop n times
        for(let i = 0; i < n; i++){ // +1 (i++ is executed each round)
            console.log(0); // +1
        }
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    function algorithm(n: number): void{
        var a: number = 1; // +1
        a += 1; // +1
        a *= 2; // +1
        // Loop n times
        for(let i = 0; i < n; i++){ // +1 (i++ is executed each round)
            console.log(0); // +1
        }
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    void algorithm(int n) {
      int a = 1; // +1
      a = a + 1; // +1
      a = a * 2; // +1
      // Loop n times
      for (int i = 0; i < n; i++) { // +1 (i++ is executed each round)
        print(0); // +1
      }
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    fn algorithm(n: i32) {
        let mut a = 1;   // +1
        a = a + 1;      // +1
        a = a * 2;      // +1

        // Loop n times
        for _ in 0..n { // +1 (i++ is executed each round)
            println!("{}", 0); // +1
        }
    }
    \`\`\`

=== "C"

    \`\`\`c title=""
    void algorithm(int n) {
        int a = 1;  // +1
        a = a + 1;  // +1
        a = a * 2;  // +1
        // Loop n times
        for (int i = 0; i < n; i++) {   // +1 (i++ is executed each round)
            printf("%d", 0);            // +1
        }
    }
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    fun algorithm(n: Int) {
        var a = 1 // +1
        a = a + 1 // +1
        a = a * 2 // +1
        // Loop n times
        for (i in 0..<n) { // +1 (i++ is executed each round)
            println(0) // +1
        }
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    def algorithm(n)
        a = 1       # +1
        a = a + 1   # +1
        a = a * 2   # +1
        # Loop n times
        (0...n).each do # +1
            puts 0      # +1
        end
    end
    \`\`\`

Let the number of operations of the algorithm be a function of the input data size $n$, denoted as $T(n)$. Then the number of operations of the above function is:

$$
T(n) = 3 + 2n
$$

$T(n)$ is a linear function, indicating that its runtime growth trend is linear, and therefore its time complexity is linear order.

We denote the time complexity of linear order as $O(n)$. This mathematical symbol is called <u>big-$O$ notation</u>, representing the <u>asymptotic upper bound</u> of the function $T(n)$.

Time complexity analysis essentially calculates the asymptotic upper bound of "the number of operations $T(n)$", which has a clear mathematical definition.

!!! note "Asymptotic upper bound of functions"

    If there exist positive real numbers $c$ and $n_0$ such that for all $n > n_0$, we have $T(n) \\leq c \\cdot f(n)$, then $f(n)$ can be considered as an asymptotic upper bound of $T(n)$, denoted as $T(n) = O(f(n))$.

As shown in the figure below, calculating the asymptotic upper bound is to find a function $f(n)$ such that when $n$ tends to infinity, $T(n)$ and $f(n)$ are at the same growth level, differing only by a constant coefficient $c$.

![Asymptotic upper bound of a function](time_complexity.assets/asymptotic_upper_bound.png)

## Derivation Method

The idea of an asymptotic upper bound is somewhat mathematical. If you feel you haven't fully understood it, don't worry. We can first master the derivation method, and gradually grasp its mathematical meaning through continuous practice.

According to the definition, after determining $f(n)$, we can obtain the time complexity $O(f(n))$. So how do we determine the asymptotic upper bound $f(n)$? Overall, it is divided into two steps: first count the number of operations, then determine the asymptotic upper bound.

### Step 1: Count the Number of Operations

For code, count from top to bottom line by line. However, since the constant coefficient $c$ in $c \\cdot f(n)$ above can be of any size, **coefficients and constant terms in the number of operations $T(n)$ can all be ignored**. According to this principle, the following counting simplification techniques can be summarized.

1. **Ignore constants in $T(n)$**. Because they are all independent of $n$, they do not affect time complexity.
2. **Omit all coefficients**. For example, looping $2n$ times, $5n + 1$ times, etc., can all be simplified as $n$ times, because the coefficient before $n$ does not affect time complexity.
3. **Use multiplication for nested loops**. The total number of operations equals the product of the number of operations in the outer and inner loops, with each layer of loop still able to apply techniques \`1.\` and \`2.\` separately.

Given a function, we can use the above techniques to count the number of operations:

=== "Python"

    \`\`\`python title=""
    def algorithm(n: int):
        a = 1      # +0 (Technique 1)
        a = a + n  # +0 (Technique 1)
        # +n (Technique 2)
        for i in range(5 * n + 1):
            print(0)
        # +n*n (Technique 3)
        for i in range(2 * n):
            for j in range(n + 1):
                print(0)
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    void algorithm(int n) {
        int a = 1;  // +0 (Technique 1)
        a = a + n;  // +0 (Technique 1)
        // +n (Technique 2)
        for (int i = 0; i < 5 * n + 1; i++) {
            cout << 0 << endl;
        }
        // +n*n (Technique 3)
        for (int i = 0; i < 2 * n; i++) {
            for (int j = 0; j < n + 1; j++) {
                cout << 0 << endl;
            }
        }
    }
    \`\`\`

=== "Java"

    \`\`\`java title=""
    void algorithm(int n) {
        int a = 1;  // +0 (Technique 1)
        a = a + n;  // +0 (Technique 1)
        // +n (Technique 2)
        for (int i = 0; i < 5 * n + 1; i++) {
            System.out.println(0);
        }
        // +n*n (Technique 3)
        for (int i = 0; i < 2 * n; i++) {
            for (int j = 0; j < n + 1; j++) {
                System.out.println(0);
            }
        }
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    void Algorithm(int n) {
        int a = 1;  // +0 (Technique 1)
        a = a + n;  // +0 (Technique 1)
        // +n (Technique 2)
        for (int i = 0; i < 5 * n + 1; i++) {
            Console.WriteLine(0);
        }
        // +n*n (Technique 3)
        for (int i = 0; i < 2 * n; i++) {
            for (int j = 0; j < n + 1; j++) {
                Console.WriteLine(0);
            }
        }
    }
    \`\`\`

=== "Go"

    \`\`\`go title=""
    func algorithm(n int) {
        a := 1     // +0 (Technique 1)
        a = a + n  // +0 (Technique 1)
        // +n (Technique 2)
        for i := 0; i < 5 * n + 1; i++ {
            fmt.Println(0)
        }
        // +n*n (Technique 3)
        for i := 0; i < 2 * n; i++ {
            for j := 0; j < n + 1; j++ {
                fmt.Println(0)
            }
        }
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    func algorithm(n: Int) {
        var a = 1 // +0 (Technique 1)
        a = a + n // +0 (Technique 1)
        // +n (Technique 2)
        for _ in 0 ..< (5 * n + 1) {
            print(0)
        }
        // +n*n (Technique 3)
        for _ in 0 ..< (2 * n) {
            for _ in 0 ..< (n + 1) {
                print(0)
            }
        }
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    function algorithm(n) {
        let a = 1;  // +0 (Technique 1)
        a = a + n;  // +0 (Technique 1)
        // +n (Technique 2)
        for (let i = 0; i < 5 * n + 1; i++) {
            console.log(0);
        }
        // +n*n (Technique 3)
        for (let i = 0; i < 2 * n; i++) {
            for (let j = 0; j < n + 1; j++) {
                console.log(0);
            }
        }
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    function algorithm(n: number): void {
        let a = 1;  // +0 (Technique 1)
        a = a + n;  // +0 (Technique 1)
        // +n (Technique 2)
        for (let i = 0; i < 5 * n + 1; i++) {
            console.log(0);
        }
        // +n*n (Technique 3)
        for (let i = 0; i < 2 * n; i++) {
            for (let j = 0; j < n + 1; j++) {
                console.log(0);
            }
        }
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    void algorithm(int n) {
      int a = 1; // +0 (Technique 1)
      a = a + n; // +0 (Technique 1)
      // +n (Technique 2)
      for (int i = 0; i < 5 * n + 1; i++) {
        print(0);
      }
      // +n*n (Technique 3)
      for (int i = 0; i < 2 * n; i++) {
        for (int j = 0; j < n + 1; j++) {
          print(0);
        }
      }
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    fn algorithm(n: i32) {
        let mut a = 1;     // +0 (Technique 1)
        a = a + n;        // +0 (Technique 1)

        // +n (Technique 2)
        for i in 0..(5 * n + 1) {
            println!("{}", 0);
        }

        // +n*n (Technique 3)
        for i in 0..(2 * n) {
            for j in 0..(n + 1) {
                println!("{}", 0);
            }
        }
    }
    \`\`\`

=== "C"

    \`\`\`c title=""
    void algorithm(int n) {
        int a = 1;  // +0 (Technique 1)
        a = a + n;  // +0 (Technique 1)
        // +n (Technique 2)
        for (int i = 0; i < 5 * n + 1; i++) {
            printf("%d", 0);
        }
        // +n*n (Technique 3)
        for (int i = 0; i < 2 * n; i++) {
            for (int j = 0; j < n + 1; j++) {
                printf("%d", 0);
            }
        }
    }
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    fun algorithm(n: Int) {
        var a = 1   // +0 (Technique 1)
        a = a + n   // +0 (Technique 1)
        // +n (Technique 2)
        for (i in 0..<5 * n + 1) {
            println(0)
        }
        // +n*n (Technique 3)
        for (i in 0..<2 * n) {
            for (j in 0..<n + 1) {
                println(0)
            }
        }
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    def algorithm(n)
        a = 1       # +0 (Technique 1)
        a = a + n   # +0 (Technique 1)
        # +n (Technique 2)
        (0...(5 * n + 1)).each do { puts 0 }
        # +n*n (Technique 3)
        (0...(2 * n)).each do
            (0...(n + 1)).each do { puts 0 }
        end
    end
    \`\`\`

The following formula shows the counting results before and after using the above techniques; both derive a time complexity of $O(n^2)$.

$$
\\begin{aligned}
T(n) & = 2n(n + 1) + (5n + 1) + 2 & \\text{Complete count (-.-|||)} \\newline
& = 2n^2 + 7n + 3 \\newline
T(n) & = n^2 + n & \\text{Simplified count (o.O)}
\\end{aligned}
$$

### Step 2: Determine the Asymptotic Upper Bound

**Time complexity is determined by the highest-order term in $T(n)$**. This is because as $n$ tends to infinity, the highest-order term will play a dominant role, and the influence of other terms can be ignored.

The table below shows some examples, where some exaggerated values are used to emphasize the conclusion that "coefficients cannot shake the order". When $n$ tends to infinity, these constants become insignificant.

<p align="center"> Table <id> &nbsp; Time complexities corresponding to different numbers of operations </p>

| Number of Operations $T(n)$ | Time Complexity $O(f(n))$ |
| ---------------------- | -------------------- |
| $100000$               | $O(1)$               |
| $3n + 2$               | $O(n)$               |
| $2n^2 + 3n + 2$        | $O(n^2)$             |
| $n^3 + 10000n^2$       | $O(n^3)$             |
| $2^n + 10000n^{10000}$ | $O(2^n)$             |

## Common Types

Let the input data size be $n$. Common time complexity types are shown in the figure below (arranged in order from low to high).

$$
\\begin{aligned}
& O(1) < O(\\log n) < O(n) < O(n \\log n) < O(n^2) < O(2^n) < O(n!) \\newline
& \\text{Constant} < \\text{Logarithmic} < \\text{Linear} < \\text{Linearithmic} < \\text{Quadratic} < \\text{Exponential} < \\text{Factorial}
\\end{aligned}
$$

![Common time complexity types](time_complexity.assets/time_complexity_common_types.png)

### Constant Order $O(1)$

The number of operations in constant order is independent of the input data size $n$, meaning it does not change as $n$ changes.

In the following function, although the value of \`size\` may be large, it is independent of the input data size $n$, so the time complexity remains $O(1)$:

\`\`\`src
[file]{time_complexity}-[class]{}-[func]{constant}
\`\`\`

### Linear Order $O(n)$

The number of operations in linear order grows linearly relative to the input data size $n$. Linear order typically appears in single-layer loops:

\`\`\`src
[file]{time_complexity}-[class]{}-[func]{linear}
\`\`\`

Operations such as traversing arrays and traversing linked lists have a time complexity of $O(n)$, where $n$ is the length of the array or linked list:

\`\`\`src
[file]{time_complexity}-[class]{}-[func]{array_traversal}
\`\`\`

It is worth noting that **the input data size $n$ should be determined according to the type of input data**. For example, in the first example, the variable $n$ is the input data size; in the second example, the array length $n$ is the data size.

### Quadratic Order $O(n^2)$

The number of operations in quadratic order grows quadratically relative to the input data size $n$. Quadratic order typically appears in nested loops, where both the outer and inner loops have a time complexity of $O(n)$, resulting in an overall time complexity of $O(n^2)$:

\`\`\`src
[file]{time_complexity}-[class]{}-[func]{quadratic}
\`\`\`

The figure below compares constant order, linear order, and quadratic order time complexities.

![Time complexities of constant, linear, and quadratic orders](time_complexity.assets/time_complexity_constant_linear_quadratic.png)

Taking bubble sort as an example, the outer loop executes $n - 1$ times, and the inner loop executes $n-1$, $n-2$, $\\dots$, $2$, $1$ times, averaging $n / 2$ times, resulting in a time complexity of $O((n - 1) n / 2) = O(n^2)$:

\`\`\`src
[file]{time_complexity}-[class]{}-[func]{bubble_sort}
\`\`\`

### Exponential Order $O(2^n)$

Biological "cell division" is a typical example of exponential order growth: the initial state is $1$ cell, after one round of division it becomes $2$, after two rounds it becomes $4$, and so on; after $n$ rounds of division there are $2^n$ cells.

The figure below and the following code simulate the cell division process, with a time complexity of $O(2^n)$. Note that the input $n$ represents the number of division rounds, and the return value \`count\` represents the total number of divisions.

\`\`\`src
[file]{time_complexity}-[class]{}-[func]{exponential}
\`\`\`

![Time complexity of exponential order](time_complexity.assets/time_complexity_exponential.png)

In actual algorithms, exponential order often appears in recursive functions. For example, in the following code, it recursively splits in two, stopping after $n$ splits:

\`\`\`src
[file]{time_complexity}-[class]{}-[func]{exp_recur}
\`\`\`

Exponential order growth is very rapid and is common in exhaustive methods (brute force search, backtracking, etc.). For problems with large data scales, exponential order is unacceptable and typically requires dynamic programming or greedy algorithms to solve.

### Logarithmic Order $O(\\log n)$

In contrast to exponential order, logarithmic order reflects the situation of "reducing to half each round". Let the input data size be $n$. Since it is reduced to half each round, the number of loops is $\\log_2 n$, which is the inverse function of $2^n$.

The figure below and the following code simulate the process of "reducing to half each round", with a time complexity of $O(\\log_2 n)$, abbreviated as $O(\\log n)$:

\`\`\`src
[file]{time_complexity}-[class]{}-[func]{logarithmic}
\`\`\`

![Time complexity of logarithmic order](time_complexity.assets/time_complexity_logarithmic.png)

Like exponential order, logarithmic order also commonly appears in recursive functions. The following code forms a recursion tree of height $\\log_2 n$:

\`\`\`src
[file]{time_complexity}-[class]{}-[func]{log_recur}
\`\`\`

Logarithmic order commonly appears in algorithms based on the divide-and-conquer strategy, reflecting the idea of repeatedly splitting a problem and simplifying it. It grows slowly and is the ideal time complexity second only to constant order.

!!! tip "What is the base of $O(\\log n)$?"

    To be precise, "dividing into $m$" corresponds to a time complexity of $O(\\log_m n)$. And through the logarithmic base change formula, we can obtain time complexities with different bases that are equal:

    $$
    O(\\log_m n) = O(\\log_k n / \\log_k m) = O(\\log_k n)
    $$

    That is to say, the base $m$ can be converted without affecting the complexity. Therefore, we usually omit the base $m$ and denote logarithmic order simply as $O(\\log n)$.

### Linearithmic Order $O(n \\log n)$

Linearithmic order commonly appears in nested loops, where the time complexities of the two layers of loops are $O(\\log n)$ and $O(n)$ respectively. The relevant code is as follows:

\`\`\`src
[file]{time_complexity}-[class]{}-[func]{linear_log_recur}
\`\`\`

The figure below shows how linearithmic order is generated. Each level of the binary tree has a total of $n$ operations, and the tree has $\\log_2 n + 1$ levels, resulting in a time complexity of $O(n \\log n)$.

![Time complexity of linearithmic order](time_complexity.assets/time_complexity_logarithmic_linear.png)

Mainstream sorting algorithms typically have a time complexity of $O(n \\log n)$, such as quicksort, merge sort, and heap sort.

### Factorial Order $O(n!)$

Factorial order corresponds to the mathematical "permutation" problem. Given $n$ distinct elements, find all possible permutation schemes; the number of schemes is:

$$
n! = n \\times (n - 1) \\times (n - 2) \\times \\dots \\times 2 \\times 1
$$

Factorials are typically implemented using recursion. As shown in the figure below and the following code, the first level splits into $n$ branches, the second level splits into $n - 1$ branches, and so on, until the $n$-th level when splitting stops:

\`\`\`src
[file]{time_complexity}-[class]{}-[func]{factorial_recur}
\`\`\`

![Time complexity of factorial order](time_complexity.assets/time_complexity_factorial.png)

Note that because when $n \\geq 4$ we always have $n! > 2^n$, factorial order grows faster than exponential order, and is also unacceptable for large $n$.

## Worst, Best, and Average Time Complexities

**The time efficiency of an algorithm is often not fixed, but is related to the distribution of the input data**. Suppose we input an array \`nums\` of length $n$, where \`nums\` consists of numbers from $1$ to $n$, with each number appearing only once, but the element order is randomly shuffled. The task is to return the index of element $1$. We can draw the following conclusions.

- When \`nums = [?, ?, ..., 1]\`, i.e., when the last element is $1$, it requires a complete traversal of the array, **reaching worst-case time complexity $O(n)$**.
- When \`nums = [1, ?, ?, ...]\`, i.e., when the first element is $1$, no matter how long the array is, there is no need to continue traversing, **reaching best-case time complexity $\\Omega(1)$**.

The "worst-case time complexity" corresponds to the function's asymptotic upper bound, denoted using big-$O$ notation. Correspondingly, the "best-case time complexity" corresponds to the function's asymptotic lower bound, denoted using $\\Omega$ notation:

\`\`\`src
[file]{worst_best_time_complexity}-[class]{}-[func]{find_one}
\`\`\`

It is worth noting that we rarely use best-case time complexity in practice, because it can usually only be achieved with a very small probability and may be somewhat misleading. **The worst-case time complexity is more practical because it gives a safety value for efficiency**, allowing us to use the algorithm with confidence.

From the above example, we can see that both worst-case and best-case time complexities arise only under particular input distributions, which may occur with very low probability and may not truly reflect the algorithm's running efficiency. In contrast, **average time complexity can reflect the algorithm's running efficiency under random input data**, denoted using the $\\Theta$ notation.

For some algorithms, we can simply derive the average case under random data distribution. For example, in the above example, since the input array is shuffled, the probability of element $1$ appearing at any index is equal, so the algorithm's average number of loops is half the array length $n / 2$, giving an average time complexity of $\\Theta(n / 2) = \\Theta(n)$.

But for more complex algorithms, calculating average time complexity is often quite difficult, because it is hard to analyze the overall mathematical expectation under data distribution. In this case, we usually use worst-case time complexity as the criterion for judging algorithm efficiency.

!!! question "Why is the $\\Theta$ symbol rarely seen?"

    This may be because the $O$ symbol is too catchy, so we often use it to represent average time complexity. But strictly speaking, this practice is not standard. In this book and other materials, if you encounter expressions like "average time complexity $O(n)$", please understand it directly as $\\Theta(n)$.
`
  },
  'dsa-space-complexity': {
    title: '2.4 Space Complexity (Độ phức tạp Không gian)',
    summary: 'Tìm hiểu lượng bộ nhớ mà giải thuật tiêu thụ trong quá trình thực thi, bao gồm bộ nhớ dữ liệu tạm thời và không gian ngăn xếp.',
    tags: ['dsa', 'complexity'],
    domain: 'Algorithms',
    module: 'Chương 2: Phân tích Độ phức tạp',
    prerequisites: ['dsa-iteration-recursion'],
    related: ['dsa-time-complexity'],
    updatedAt: '2026-07-16',
    readTime: '12 phút',
    content: `
<h2>2.4.1 Không gian liên quan đến Giải thuật</h2>
<p><strong>Space Complexity (Độ phức tạp không gian)</strong> đo lường xu hướng tăng trưởng của lượng bộ nhớ mà thuật toán chiếm dụng khi kích thước dữ liệu $n$ tăng lên. Khái niệm này rất giống với độ phức tạp thời gian, ngoại trừ việc "thời gian chạy" được thay bằng "dung lượng bộ nhớ chiếm dụng".</p>
<p>Bộ nhớ được thuật toán sử dụng trong quá trình thực thi chủ yếu gồm các loại sau:</p>
<ul>
  <li><strong>Input Space (Không gian đầu vào)</strong>: Dùng để lưu trữ dữ liệu đầu vào của thuật toán.</li>
  <li><strong>Temporary Space (Không gian tạm thời)</strong>: Dùng để lưu trữ biến, đối tượng, ngữ cảnh hàm và các dữ liệu khác trong quá trình thực thi thuật toán.</li>
  <li><strong>Output Space (Không gian đầu ra)</strong>: Dùng để lưu trữ dữ liệu đầu ra của thuật toán.</li>
</ul>
<p>Nhìn chung, phạm vi thống kê độ phức tạp không gian là "không gian tạm thời" cộng với "không gian đầu ra".</p>
<p>Không gian tạm thời có thể được chia nhỏ hơn thành ba phần:</p>
<ul>
  <li><strong>Temporary Data (Dữ liệu tạm thời)</strong>: Dùng để lưu các hằng số, biến, đối tượng, v.v. trong quá trình thực thi thuật toán.</li>
  <li><strong>Stack Frame Space (Không gian khung ngăn xếp)</strong>: Dùng để lưu ngữ cảnh dữ liệu của các hàm được gọi. Hệ thống tạo một khung ngăn xếp ở đỉnh ngăn xếp mỗi khi một hàm được gọi, và không gian khung ngăn xếp này được giải phóng sau khi hàm trả về.</li>
  <li><strong>Instruction Space (Không gian lệnh)</strong>: Dùng để lưu các lệnh chương trình đã biên dịch, thường bị bỏ qua trong thống kê thực tế.</li>
</ul>
<p>Khi phân tích độ phức tạp không gian của một chương trình, <strong>chúng ta thường xét ba phần: dữ liệu tạm thời, không gian khung ngăn xếp, và dữ liệu đầu ra</strong>, như minh họa trong hình dưới đây.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/space_types.png" alt="Các loại không gian bộ nhớ trong giải thuật" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Đoạn mã liên quan như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Class */
class Node {
    int val;
    Node next;
    Node(int x) { val = x; }
}

/* Function */
int function() {
    // Perform some operations...
    return 0;
}

int algorithm(int n) {        // Input data
    final int a = 0;          // Temporary data (constant)
    int b = 0;                // Temporary data (variable)
    Node node = new Node(0);  // Temporary data (object)
    int c = function();       // Stack frame space (function call)
    return a + b + c;         // Output data
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Class */
class Node(var _val: Int) {
    var next: Node? = null
}

/* Function */
fun function(): Int {
    // Perform some operations...
    return 0
}

fun algorithm(n: Int): Int { // Input data
    val a = 0                // Temporary data (constant)
    var b = 0                // Temporary data (variable)
    val node = Node(0)       // Temporary data (object)
    val c = function()       // Stack frame space (function call)
    return a + b + c         // Output data
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>/* Class */
class Node {
    var val: Int
    var next: Node?

    init(x: Int) {
        val = x
    }
}

/* Function */
func function() -&gt; Int {
    // Perform some operations...
    return 0
}

func algorithm(n: Int) -&gt; Int { // Input data
    let a = 0             // Temporary data (constant)
    var b = 0             // Temporary data (variable)
    let node = Node(x: 0) // Temporary data (object)
    let c = function()    // Stack frame space (function call)
    return a + b + c      // Output data
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>/* Class */
class Node {
  int val;
  Node next;
  Node(this.val, [this.next]);
}

/* Function */
int function() {
  // Perform some operations...
  return 0;
}

int algorithm(int n) {  // Input data
  const int a = 0;      // Temporary data (constant)
  int b = 0;            // Temporary data (variable)
  Node node = Node(0);  // Temporary data (object)
  int c = function();   // Stack frame space (function call)
  return a + b + c;     // Output data
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class Node:
    """Class"""
    def __init__(self, x: int):
        self.val: int = x              # Node value
        self.next: Node | None = None  # Reference to the next node

def function() -&gt; int:
    """Function"""
    # Perform some operations...
    return 0

def algorithm(n) -&gt; int:  # Input data
    A = 0                 # Temporary data (constant, usually represented by uppercase letters)
    b = 0                 # Temporary data (variable)
    node = Node(0)        # Temporary data (object)
    c = function()        # Stack frame space (function call)
    return A + b + c      # Output data</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Structure */
struct Node {
    int val;
    Node *next;
    Node(int x) : val(x), next(nullptr) {}
};

/* Function */
int func() {
    // Perform some operations...
    return 0;
}

int algorithm(int n) {        // Input data
    const int a = 0;          // Temporary data (constant)
    int b = 0;                // Temporary data (variable)
    Node* node = new Node(0); // Temporary data (object)
    int c = func();           // Stack frame space (function call)
    return a + b + c;         // Output data
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>/* Class */
class Node(int x) {
    int val = x;
    Node next;
}

/* Function */
int Function() {
    // Perform some operations...
    return 0;
}

int Algorithm(int n) {        // Input data
    const int a = 0;          // Temporary data (constant)
    int b = 0;                // Temporary data (variable)
    Node node = new(0);       // Temporary data (object)
    int c = Function();       // Stack frame space (function call)
    return a + b + c;         // Output data
}</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>/* Structure */
type node struct {
    val  int
    next *node
}

/* Create node structure */
func newNode(val int) *node {
    return &amp;node{val: val}
}

/* Function */
func function() int {
    // Perform some operations...
    return 0
}

func algorithm(n int) int { // Input data
    const a = 0             // Temporary data (constant)
    b := 0                  // Temporary data (variable)
    newNode(0)              // Temporary data (object)
    c := function()         // Stack frame space (function call)
    return a + b + c        // Output data
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Class */
class Node {
    val;
    next;
    constructor(val) {
        this.val = val === undefined ? 0 : val; // Node value
        this.next = null;                       // Reference to the next node
    }
}

/* Function */
function constFunc() {
    // Perform some operations
    return 0;
}

function algorithm(n) {       // Input data
    const a = 0;              // Temporary data (constant)
    let b = 0;                // Temporary data (variable)
    const node = new Node(0); // Temporary data (object)
    const c = constFunc();    // Stack frame space (function call)
    return a + b + c;         // Output data
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>/* Class */
class Node {
    val: number;
    next: Node | null;
    constructor(val?: number) {
        this.val = val === undefined ? 0 : val; // Node value
        this.next = null;                       // Reference to the next node
    }
}

/* Function */
function constFunc(): number {
    // Perform some operations
    return 0;
}

function algorithm(n: number): number { // Input data
    const a = 0;                        // Temporary data (constant)
    let b = 0;                          // Temporary data (variable)
    const node = new Node(0);           // Temporary data (object)
    const c = constFunc();              // Stack frame space (function call)
    return a + b + c;                   // Output data
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>use std::rc::Rc;
use std::cell::RefCell;

/* Structure */
struct Node {
    val: i32,
    next: Option&lt;Rc&lt;RefCell&lt;Node&gt;&gt;&gt;,
}

/* Create Node structure */
impl Node {
    fn new(val: i32) -&gt; Self {
        Self { val: val, next: None }
    }
}

/* Function */
fn function() -&gt; i32 {
    // Perform some operations...
    return 0;
}

fn algorithm(n: i32) -&gt; i32 {       // Input data
    const a: i32 = 0;               // Temporary data (constant)
    let mut b = 0;                  // Temporary data (variable)
    let node = Node::new(0);        // Temporary data (object)
    let c = function();             // Stack frame space (function call)
    return a + b + c;               // Output data
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>/* Function */
int func() {
    // Perform some operations...
    return 0;
}

int algorithm(int n) { // Input data
    const int a = 0;   // Temporary data (constant)
    int b = 0;         // Temporary data (variable)
    int c = func();    // Stack frame space (function call)
    return a + b + c;  // Output data
}</code></pre></div></div></div>

<h2>2.4.2 Phương pháp tính toán</h2>
<p>Phương pháp tính độ phức tạp không gian nhìn chung tương tự như độ phức tạp thời gian, chỉ khác ở chỗ đại lượng đo lường chuyển từ "số lượng phép toán" sang "dung lượng không gian sử dụng".</p>
<p>Khác với độ phức tạp thời gian, <strong>chúng ta thường chỉ tập trung vào độ phức tạp không gian trong trường hợp xấu nhất</strong>. Điều này là vì bộ nhớ là một yêu cầu cứng, và chúng ta phải đảm bảo có đủ bộ nhớ dự phòng cho mọi dữ liệu đầu vào.</p>
<p>Quan sát đoạn mã dưới đây. Ở đây, "trường hợp xấu nhất" trong độ phức tạp không gian trường hợp xấu nhất mang hai ý nghĩa.</p>
<ol>
  <li><strong>Dựa trên dữ liệu đầu vào tệ nhất</strong>: Khi $n < 10$, độ phức tạp không gian là $O(1)$; nhưng khi $n > 10$, mảng <code>nums</code> được khởi tạo chiếm $O(n)$ không gian, nên độ phức tạp không gian trường hợp xấu nhất là $O(n)$.</li>
  <li><strong>Dựa trên mức đỉnh bộ nhớ trong quá trình thực thi giải thuật</strong>: Ví dụ, trước khi thực thi dòng cuối cùng, chương trình chiếm $O(1)$ không gian; khi khởi tạo mảng <code>nums</code>, chương trình chiếm $O(n)$ không gian, nên độ phức tạp không gian trường hợp xấu nhất là $O(n)$.</li>
</ol>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>void algorithm(int n) {
    int a = 0;                   // O(1)
    int[] b = new int[10000];    // O(1)
    if (n &gt; 10)
        int[] nums = new int[n]; // O(n)
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun algorithm(n: Int) {
    val a = 0                    // O(1)
    val b = IntArray(10000)      // O(1)
    if (n &gt; 10) {
        val nums = IntArray(n)   // O(n)
    }
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func algorithm(n: Int) {
    let a = 0 // O(1)
    let b = Array(repeating: 0, count: 10000) // O(1)
    if n &gt; 10 {
        let nums = Array(repeating: 0, count: n) // O(n)
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void algorithm(int n) {
  int a = 0;                            // O(1)
  List&lt;int&gt; b = List.filled(10000, 0);  // O(1)
  if (n &gt; 10) {
    List&lt;int&gt; nums = List.filled(n, 0); // O(n)
  }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def algorithm(n: int):
    a = 0               # O(1)
    b = [0] * 10000     # O(1)
    if n &gt; 10:
        nums = [0] * n  # O(n)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>void algorithm(int n) {
    int a = 0;               // O(1)
    vector&lt;int&gt; b(10000);    // O(1)
    if (n &gt; 10)
        vector&lt;int&gt; nums(n); // O(n)
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>void Algorithm(int n) {
    int a = 0;                   // O(1)
    int[] b = new int[10000];    // O(1)
    if (n &gt; 10) {
        int[] nums = new int[n]; // O(n)
    }
}</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func algorithm(n int) {
    a := 0                      // O(1)
    b := make([]int, 10000)     // O(1)
    var nums []int
    if n &gt; 10 {
        nums := make([]int, n)  // O(n)
    }
    fmt.Println(a, b, nums)
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function algorithm(n) {
    const a = 0;                   // O(1)
    const b = new Array(10000);    // O(1)
    if (n &gt; 10) {
        const nums = new Array(n); // O(n)
    }
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function algorithm(n: number): void {
    const a = 0;                   // O(1)
    const b = new Array(10000);    // O(1)
    if (n &gt; 10) {
        const nums = new Array(n); // O(n)
    }
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn algorithm(n: i32) {
    let a = 0;                              // O(1)
    let b = [0; 10000];                     // O(1)
    if n &gt; 10 {
        let nums = vec![0; n as usize];     // O(n)
    }
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>void algorithm(int n) {
    int a = 0;               // O(1)
    int b[10000];            // O(1)
    if (n &gt; 10)
        int nums[n] = {0};   // O(n)
}</code></pre></div></div></div>
<p><strong>Đối với các hàm đệ quy, cần phải tính cả không gian khung ngăn xếp</strong>. Quan sát đoạn mã dưới đây:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>int function() {
    // Perform some operations
    return 0;
}
/* Loop has space complexity of O(1) */
void loop(int n) {
    for (int i = 0; i &lt; n; i++) {
        function();
    }
}
/* Recursion has space complexity of O(n) */
void recur(int n) {
    if (n == 1) return;
    recur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun function(): Int {
    // Perform some operations
    return 0
}
/* Loop has space complexity of O(1) */
fun loop(n: Int) {
    for (i in 0..&lt;n) {
        function()
    }
}
/* Recursion has space complexity of O(n) */
fun recur(n: Int) {
    if (n == 1) return
    return recur(n - 1)
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>@discardableResult
func function() -&gt; Int {
    // Perform some operations
    return 0
}

/* Loop has space complexity of O(1) */
func loop(n: Int) {
    for _ in 0 ..&lt; n {
        function()
    }
}

/* Recursion has space complexity of O(n) */
func recur(n: Int) {
    if n == 1 {
        return
    }
    recur(n: n - 1)
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int function() {
  // Perform some operations
  return 0;
}
/* Loop has space complexity of O(1) */
void loop(int n) {
  for (int i = 0; i &lt; n; i++) {
    function();
  }
}
/* Recursion has space complexity of O(n) */
void recur(int n) {
  if (n == 1) return;
  recur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def function() -&gt; int:
    # Perform some operations
    return 0

def loop(n: int):
    """Loop has space complexity of O(1)"""
    for _ in range(n):
        function()

def recur(n: int):
    """Recursion has space complexity of O(n)"""
    if n == 1:
        return
    return recur(n - 1)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int func() {
    // Perform some operations
    return 0;
}
/* Loop has space complexity of O(1) */
void loop(int n) {
    for (int i = 0; i &lt; n; i++) {
        func();
    }
}
/* Recursion has space complexity of O(n) */
void recur(int n) {
    if (n == 1) return;
    recur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>int Function() {
    // Perform some operations
    return 0;
}
/* Loop has space complexity of O(1) */
void Loop(int n) {
    for (int i = 0; i &lt; n; i++) {
        Function();
    }
}
/* Recursion has space complexity of O(n) */
int Recur(int n) {
    if (n == 1) return 1;
    return Recur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func function() int {
    // Perform some operations
    return 0
}

/* Loop has space complexity of O(1) */
func loop(n int) {
    for i := 0; i &lt; n; i++ {
        function()
    }
}

/* Recursion has space complexity of O(n) */
func recur(n int) {
    if n == 1 {
        return
    }
    recur(n - 1)
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function constFunc() {
    // Perform some operations
    return 0;
}
/* Loop has space complexity of O(1) */
function loop(n) {
    for (let i = 0; i &lt; n; i++) {
        constFunc();
    }
}
/* Recursion has space complexity of O(n) */
function recur(n) {
    if (n === 1) return;
    return recur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function constFunc(): number {
    // Perform some operations
    return 0;
}
/* Loop has space complexity of O(1) */
function loop(n: number): void {
    for (let i = 0; i &lt; n; i++) {
        constFunc();
    }
}
/* Recursion has space complexity of O(n) */
function recur(n: number): void {
    if (n === 1) return;
    return recur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn function() -&gt; i32 {
    // Perform some operations
    return 0;
}
/* Loop has space complexity of O(1) */
fn loop_(n: i32) {
    for _ in 0..n {
        function();
    }
}
/* Recursion has space complexity of O(n) */
fn recur(n: i32) {
    if n == 1 {
        return;
    }
    recur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int func() {
    // Perform some operations
    return 0;
}
/* Loop has space complexity of O(1) */
void loop(int n) {
    for (int i = 0; i &lt; n; i++) {
        func();
    }
}
/* Recursion has space complexity of O(n) */
void recur(int n) {
    if (n == 1) return;
    recur(n - 1);
}</code></pre></div></div></div>
<p>Độ phức tạp thời gian của cả hai hàm <code>loop()</code> và <code>recur()</code> đều là $O(n)$, nhưng độ phức tạp không gian của chúng khác nhau.</p>
<ul>
  <li>Hàm <code>loop()</code> gọi <code>function()</code> $n$ lần trong một vòng lặp. Ở mỗi lần lặp, <code>function()</code> trả về và giải phóng không gian khung ngăn xếp của nó, nên độ phức tạp không gian vẫn là $O(1)$.</li>
  <li>Hàm đệ quy <code>recur()</code> có $n$ thực thể <code>recur()</code> chưa trả về tồn tại đồng thời trong quá trình thực thi, do đó chiếm dụng $O(n)$ không gian khung ngăn xếp.</li>
</ul>

<h2>2.4.3 Các cấp độ phức tạp không gian phổ biến</h2>
<p>Giả sử kích thước dữ liệu đầu vào là $n$, hình dưới đây thể hiện các cấp độ phức tạp không gian phổ biến (sắp xếp theo thứ tự từ thấp đến cao):</p>
$$
\\begin{aligned}
& O(1) < O(\\log n) < O(n) < O(n^2) < O(2^n) \\newline
& \\text{Hằng số} < \\text{Logarit} < \\text{Tuyến tính} < \\text{Bình phương} < \\text{Lũy thừa}
\\end{aligned}
$$

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/space_complexity_common_types.png" alt="Các cấp độ phức tạp không gian phổ biến" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>2.4.3.1 Không gian hằng số $O(1)$</h3>

<p>Thuật toán chỉ sử dụng một số lượng biến cố định độc lập với kích thước dữ liệu đầu vào $n$:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static void constant(int n) {
        // Constants, variables, objects occupy O(1) space
        final int a = 0;
        int b = 0;
        int[] nums = new int[10000];
        ListNode node = new ListNode(0);
        // Variables in the loop occupy O(1) space
        for (int i = 0; i &lt; n; i++) {
            int c = 0;
        }
        // Functions in the loop occupy O(1) space
        for (int i = 0; i &lt; n; i++) {
            function();
        }
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun constant(n: Int) {
    // Constants, variables, objects occupy O(1) space
    val a = 0
    var b = 0
    val nums = Array(10000) { 0 }
    val node = ListNode(0)
    // Variables in the loop occupy O(1) space
    for (i in 0..&lt;n) {
        val c = 0
    }
    // Functions in the loop occupy O(1) space
    for (i in 0..&lt;n) {
        function()
    }
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func constant(n: Int) {
    // Constants, variables, objects occupy O(1) space
    let a = 0
    var b = 0
    let nums = Array(repeating: 0, count: 10000)
    let node = ListNode(x: 0)
    // Variables in the loop occupy O(1) space
    for _ in 0 ..&lt; n {
        let c = 0
    }
    // Functions in the loop occupy O(1) space
    for _ in 0 ..&lt; n {
        function()
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void constant(int n) {
  // Constants, variables, objects occupy O(1) space
  final int a = 0;
  int b = 0;
  List&lt;int&gt; nums = List.filled(10000, 0);
  ListNode node = ListNode(0);
  // Variables in the loop occupy O(1) space
  for (var i = 0; i &lt; n; i++) {
    int c = 0;
  }
  // Functions in the loop occupy O(1) space
  for (var i = 0; i &lt; n; i++) {
    function();
  }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def constant(n: int):
    """Constant order"""
    # Constants, variables, objects occupy O(1) space
    a = 0
    nums = [0] * 10000
    node = ListNode(0)
    # Variables in the loop occupy O(1) space
    for _ in range(n):
        c = 0
    # Functions in the loop occupy O(1) space
    for _ in range(n):
        function()</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>void constant(int n) {
    // Constants, variables, objects occupy O(1) space
    const int a = 0;
    int b = 0;
    vector&lt;int&gt; nums(10000);
    ListNode node(0);
    // Variables in the loop occupy O(1) space
    for (int i = 0; i &lt; n; i++) {
        int c = 0;
    }
    // Functions in the loop occupy O(1) space
    for (int i = 0; i &lt; n; i++) {
        func();
    }
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    void Constant(int n) {
        // Constants, variables, objects occupy O(1) space
        int a = 0;
        int b = 0;
        int[] nums = new int[10000];
        ListNode node = new(0);
        // Variables in the loop occupy O(1) space
        for (int i = 0; i &lt; n; i++) {
            int c = 0;
        }
        // Functions in the loop occupy O(1) space
        for (int i = 0; i &lt; n; i++) {
            Function();
        }
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func constant(n int) {
    // Constants, variables, objects occupy O(1) space
    const a = 0
    b := 0
    nums := make([]int, 10000)
    node := newNode(0)
    // Variables in the loop occupy O(1) space
    var c int
    for i := 0; i &lt; n; i++ {
        c = 0
    }
    // Functions in the loop occupy O(1) space
    for i := 0; i &lt; n; i++ {
        function()
    }
    b += 0
    c += 0
    nums[0] = 0
    node.val = 0
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function constant(n) {
    // Constants, variables, objects occupy O(1) space
    const a = 0;
    const b = 0;
    const nums = new Array(10000);
    const node = new ListNode(0);
    // Variables in the loop occupy O(1) space
    for (let i = 0; i &lt; n; i++) {
        const c = 0;
    }
    // Functions in the loop occupy O(1) space
    for (let i = 0; i &lt; n; i++) {
        constFunc();
    }
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function constant(n: number): void {
    // Constants, variables, objects occupy O(1) space
    const a = 0;
    const b = 0;
    const nums = new Array(10000);
    const node = new ListNode(0);
    // Variables in the loop occupy O(1) space
    for (let i = 0; i &lt; n; i++) {
        const c = 0;
    }
    // Functions in the loop occupy O(1) space
    for (let i = 0; i &lt; n; i++) {
        constFunc();
    }
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn constant(n: i32) {
    // Constants, variables, objects occupy O(1) space
    const A: i32 = 0;
    let b = 0;
    let nums = vec![0; 10000];
    let node = ListNode::new(0);
    // Variables in the loop occupy O(1) space
    for i in 0..n {
        let c = 0;
    }
    // Functions in the loop occupy O(1) space
    for i in 0..n {
        function();
    }
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>void constant(int n) {
    // Constants, variables, objects occupy O(1) space
    const int a = 0;
    int b = 0;
    int nums[1000];
    ListNode *node = newListNode(0);
    free(node);
    // Variables in the loop occupy O(1) space
    for (int i = 0; i &lt; n; i++) {
        int c = 0;
    }
    // Functions in the loop occupy O(1) space
    for (int i = 0; i &lt; n; i++) {
        func();
    }
}</code></pre></div></div></div>

<h3>2.4.3.2 Không gian tuyến tính $O(n)$</h3>
<p>Thuật toán khởi tạo các mảng hoặc danh sách có kích thước tỷ lệ thuận với dữ liệu đầu vào, hoặc có độ sâu đệ quy gọi hàm tỷ lệ thuận với $n$:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static void linear(int n) {
        // Array of length n uses O(n) space
        int[] nums = new int[n];
        // A list of length n occupies O(n) space
        List&lt;ListNode&gt; nodes = new ArrayList&lt;&gt;();
        for (int i = 0; i &lt; n; i++) {
            nodes.add(new ListNode(i));
        }
        // A hash table of length n occupies O(n) space
        Map&lt;Integer, String&gt; map = new HashMap&lt;&gt;();
        for (int i = 0; i &lt; n; i++) {
            map.put(i, String.valueOf(i));
        }
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun linear(n: Int) {
    // Array of length n uses O(n) space
    val nums = Array(n) { 0 }
    // A list of length n occupies O(n) space
    val nodes = mutableListOf&lt;ListNode&gt;()
    for (i in 0..&lt;n) {
        nodes.add(ListNode(i))
    }
    // A hash table of length n occupies O(n) space
    val map = mutableMapOf&lt;Int, String&gt;()
    for (i in 0..&lt;n) {
        map[i] = i.toString()
    }
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func linear(n: Int) {
    // Array of length n uses O(n) space
    let nums = Array(repeating: 0, count: n)
    // A list of length n occupies O(n) space
    let nodes = (0 ..&lt; n).map { ListNode(x: $0) }
    // A hash table of length n occupies O(n) space
    let map = Dictionary(uniqueKeysWithValues: (0 ..&lt; n).map { ($0, "\($0)") })
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void linear(int n) {
  // Array of length n uses O(n) space
  List&lt;int&gt; nums = List.filled(n, 0);
  // A list of length n occupies O(n) space
  List&lt;ListNode&gt; nodes = [];
  for (var i = 0; i &lt; n; i++) {
    nodes.add(ListNode(i));
  }
  // A hash table of length n occupies O(n) space
  Map&lt;int, String&gt; map = HashMap();
  for (var i = 0; i &lt; n; i++) {
    map.putIfAbsent(i, () =&gt; i.toString());
  }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def linear(n: int):
    """Linear order"""
    # A list of length n occupies O(n) space
    nums = [0] * n
    # A hash table of length n occupies O(n) space
    hmap = dict[int, str]()
    for i in range(n):
        hmap[i] = str(i)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>void linear(int n) {
    // Array of length n uses O(n) space
    vector&lt;int&gt; nums(n);
    // A list of length n occupies O(n) space
    vector&lt;ListNode&gt; nodes;
    for (int i = 0; i &lt; n; i++) {
        nodes.push_back(ListNode(i));
    }
    // A hash table of length n occupies O(n) space
    unordered_map&lt;int, string&gt; map;
    for (int i = 0; i &lt; n; i++) {
        map[i] = to_string(i);
    }
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    void Linear(int n) {
        // Array of length n uses O(n) space
        int[] nums = new int[n];
        // A list of length n occupies O(n) space
        List&lt;ListNode&gt; nodes = [];
        for (int i = 0; i &lt; n; i++) {
            nodes.Add(new ListNode(i));
        }
        // A hash table of length n occupies O(n) space
        Dictionary&lt;int, string&gt; map = [];
        for (int i = 0; i &lt; n; i++) {
            map.Add(i, i.ToString());
        }
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func linear(n int) {
    // Array of length n uses O(n) space
    _ = make([]int, n)
    // A list of length n occupies O(n) space
    var nodes []*node
    for i := 0; i &lt; n; i++ {
        nodes = append(nodes, newNode(i))
    }
    // A hash table of length n occupies O(n) space
    m := make(map[int]string, n)
    for i := 0; i &lt; n; i++ {
        m[i] = strconv.Itoa(i)
    }
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function linear(n) {
    // Array of length n uses O(n) space
    const nums = new Array(n);
    // A list of length n occupies O(n) space
    const nodes = [];
    for (let i = 0; i &lt; n; i++) {
        nodes.push(new ListNode(i));
    }
    // A hash table of length n occupies O(n) space
    const map = new Map();
    for (let i = 0; i &lt; n; i++) {
        map.set(i, i.toString());
    }
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function linear(n: number): void {
    // Array of length n uses O(n) space
    const nums = new Array(n);
    // A list of length n occupies O(n) space
    const nodes: ListNode[] = [];
    for (let i = 0; i &lt; n; i++) {
        nodes.push(new ListNode(i));
    }
    // A hash table of length n occupies O(n) space
    const map = new Map();
    for (let i = 0; i &lt; n; i++) {
        map.set(i, i.toString());
    }
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn linear(n: i32) {
    // Array of length n uses O(n) space
    let mut nums = vec![0; n as usize];
    // A list of length n occupies O(n) space
    let mut nodes = Vec::new();
    for i in 0..n {
        nodes.push(ListNode::new(i))
    }
    // A hash table of length n occupies O(n) space
    let mut map = HashMap::new();
    for i in 0..n {
        map.insert(i, i.to_string());
    }
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>void linear(int n) {
    // Array of length n uses O(n) space
    int *nums = malloc(sizeof(int) * n);
    free(nums);

    // A list of length n occupies O(n) space
    ListNode **nodes = malloc(sizeof(ListNode *) * n);
    for (int i = 0; i &lt; n; i++) {
        nodes[i] = newListNode(i);
    }
    // Memory release
    for (int i = 0; i &lt; n; i++) {
        free(nodes[i]);
    }
    free(nodes);

    // A hash table of length n occupies O(n) space
    HashTable *h = NULL;
    for (int i = 0; i &lt; n; i++) {
        HashTable *tmp = malloc(sizeof(HashTable));
        tmp-&gt;key = i;
        tmp-&gt;val = i;
        HASH_ADD_INT(h, key, tmp);
    }

    // Memory release
    HashTable *curr, *tmp;
    HASH_ITER(hh, h, curr, tmp) {
        HASH_DEL(h, curr);
        free(curr);
    }
}</code></pre></div></div></div>

<p>Ví dụ đệ quy tuyến tính sử dụng không gian ngăn xếp $O(n)$:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static void linearRecur(int n) {
        System.out.println("Recursion n = " + n);
        if (n == 1)
            return;
        linearRecur(n - 1);
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun linearRecur(n: Int) {
    println("Recursion n = $n")
    if (n == 1)
        return
    linearRecur(n - 1)
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func linearRecur(n: Int) {
    print("Recursion n = \(n)")
    if n == 1 {
        return
    }
    linearRecur(n: n - 1)
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void linearRecur(int n) {
  print('Recursion n = $n');
  if (n == 1) return;
  linearRecur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def linear_recur(n: int):
    """Linear order (recursive implementation)"""
    print("Recursion n =", n)
    if n == 1:
        return
    linear_recur(n - 1)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>void linearRecur(int n) {
    cout &lt;&lt; "Recursion n = " &lt;&lt; n &lt;&lt; endl;
    if (n == 1)
        return;
    linearRecur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    void LinearRecur(int n) {
        Console.WriteLine("Recursion n = " + n);
        if (n == 1) return;
        LinearRecur(n - 1);
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func spaceLinearRecur(n int) {
	fmt.Println("Recursion n =", n)
	if n == 1 {
		return
	}
	spaceLinearRecur(n - 1)
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function linearRecur(n) {
    console.log(\`Recursion n = \${n}\`);
    if (n === 1) return;
    linearRecur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function linearRecur(n: number): void {
    console.log(\`Recursion n = \${n}\`);
    if (n === 1) return;
    linearRecur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn linear_recur(n: i32) {
    println!("Recursion n = {}", n);
    if n == 1 {
        return;
    };
    linear_recur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>void linearRecur(int n) {
    printf("Recursion n = %d\r\n", n);
    if (n == 1)
        return;
    linearRecur(n - 1);
}</code></pre></div></div></div>

<p>Như minh họa trong hình dưới đây, độ sâu đệ quy của hàm này là $n$, nghĩa là có $n$ hàm <code>linear_recur()</code> chưa trả về tồn tại đồng thời tại một thời điểm, sử dụng $O(n)$ không gian khung ngăn xếp:</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/space_complexity_recursive_linear.png" alt="Độ phức tạp không gian cấp độ tuyến tính sinh ra bởi hàm đệ quy" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>2.4.3.3 Không gian bình phương $O(n^2)$</h3>
<p>Thuật toán khởi tạo ma trận hai chiều có kích thước $n \\times n$ để lưu trữ dữ liệu tính toán:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static void quadratic(int n) {
        // Matrix uses O(n^2) space
        int[][] numMatrix = new int[n][n];
        // 2D list uses O(n^2) space
        List&lt;List&lt;Integer&gt;&gt; numList = new ArrayList&lt;&gt;();
        for (int i = 0; i &lt; n; i++) {
            List&lt;Integer&gt; tmp = new ArrayList&lt;&gt;();
            for (int j = 0; j &lt; n; j++) {
                tmp.add(0);
            }
            numList.add(tmp);
        }
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun quadratic(n: Int) {
    // Matrix uses O(n^2) space
    val numMatrix = arrayOfNulls&lt;Array&lt;Int&gt;?&gt;(n)
    // 2D list uses O(n^2) space
    val numList = mutableListOf&lt;MutableList&lt;Int&gt;&gt;()
    for (i in 0..&lt;n) {
        val tmp = mutableListOf&lt;Int&gt;()
        for (j in 0..&lt;n) {
            tmp.add(0)
        }
        numList.add(tmp)
    }
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func quadratic(n: Int) {
    // 2D list uses O(n^2) space
    let numList = Array(repeating: Array(repeating: 0, count: n), count: n)
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void quadratic(int n) {
  // Matrix uses O(n^2) space
  List&lt;List&lt;int&gt;&gt; numMatrix = List.generate(n, (_) =&gt; List.filled(n, 0));
  // 2D list uses O(n^2) space
  List&lt;List&lt;int&gt;&gt; numList = [];
  for (var i = 0; i &lt; n; i++) {
    List&lt;int&gt; tmp = [];
    for (int j = 0; j &lt; n; j++) {
      tmp.add(0);
    }
    numList.add(tmp);
  }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def quadratic(n: int):
    """Quadratic order"""
    # A 2D list occupies O(n^2) space
    num_matrix = [[0] * n for _ in range(n)]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>void quadratic(int n) {
    // 2D list uses O(n^2) space
    vector&lt;vector&lt;int&gt;&gt; numMatrix;
    for (int i = 0; i &lt; n; i++) {
        vector&lt;int&gt; tmp;
        for (int j = 0; j &lt; n; j++) {
            tmp.push_back(0);
        }
        numMatrix.push_back(tmp);
    }
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    void Quadratic(int n) {
        // Matrix uses O(n^2) space
        int[,] numMatrix = new int[n, n];
        // 2D list uses O(n^2) space
        List&lt;List&lt;int&gt;&gt; numList = [];
        for (int i = 0; i &lt; n; i++) {
            List&lt;int&gt; tmp = [];
            for (int j = 0; j &lt; n; j++) {
                tmp.Add(0);
            }
            numList.Add(tmp);
        }
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func quadratic(n int) {
    // Matrix uses O(n^2) space
    numMatrix := make([][]int, n)
    for i := 0; i &lt; n; i++ {
        numMatrix[i] = make([]int, n)
    }
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function quadratic(n) {
    // Matrix uses O(n^2) space
    const numMatrix = Array(n)
        .fill(null)
        .map(() =&gt; Array(n).fill(null));
    // 2D list uses O(n^2) space
    const numList = [];
    for (let i = 0; i &lt; n; i++) {
        const tmp = [];
        for (let j = 0; j &lt; n; j++) {
            tmp.push(0);
        }
        numList.push(tmp);
    }
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function quadratic(n: number): void {
    // Matrix uses O(n^2) space
    const numMatrix = Array(n)
        .fill(null)
        .map(() =&gt; Array(n).fill(null));
    // 2D list uses O(n^2) space
    const numList = [];
    for (let i = 0; i &lt; n; i++) {
        const tmp = [];
        for (let j = 0; j &lt; n; j++) {
            tmp.push(0);
        }
        numList.push(tmp);
    }
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn quadratic(n: i32) {
    // Matrix uses O(n^2) space
    let num_matrix = vec![vec![0; n as usize]; n as usize];
    // 2D list uses O(n^2) space
    let mut num_list = Vec::new();
    for i in 0..n {
        let mut tmp = Vec::new();
        for j in 0..n {
            tmp.push(0);
        }
        num_list.push(tmp);
    }
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>void quadratic(int n) {
    // 2D list uses O(n^2) space
    int **numMatrix = malloc(sizeof(int *) * n);
    for (int i = 0; i &lt; n; i++) {
        int *tmp = malloc(sizeof(int) * n);
        for (int j = 0; j &lt; n; j++) {
            tmp[j] = 0;
        }
        numMatrix[i] = tmp;
    }

    // Memory release
    for (int i = 0; i &lt; n; i++) {
        free(numMatrix[i]);
    }
    free(numMatrix);
}</code></pre></div></div></div>

<p>Như minh họa trong hình dưới đây, độ sâu đệ quy của hàm này là $n$, nghĩa là có $n$ hàm <code>quadratic_recur()</code> chưa trả về tồn tại đồng thời, và một mảng được khởi tạo trong mỗi lần gọi đệ quy với độ dài lần lượt là $n$, $n-1$, $\\dots$, $2$, $1$, độ dài trung bình là $n / 2$, do đó tổng thể chiếm dụng $O(n^2)$ không gian:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static int quadraticRecur(int n) {
        if (n &lt;= 0)
            return 0;
        // Array nums has lengths n, n-1, ..., 2, 1
        int[] nums = new int[n];
        System.out.println("Recursion n = " + n + ", nums length = " + nums.length);
        return quadraticRecur(n - 1);
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>tailrec fun quadraticRecur(n: Int): Int {
    if (n &lt;= 0)
        return 0
    // Array nums has lengths n, n-1, ..., 2, 1
    val nums = Array(n) { 0 }
    println("Recursion n = $n, nums length = \${nums.size}")
    return quadraticRecur(n - 1)
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func quadraticRecur(n: Int) -&gt; Int {
    if n &lt;= 0 {
        return 0
    }
    // Array nums has lengths n, n-1, ..., 2, 1
    let nums = Array(repeating: 0, count: n)
    print("Recursion n = \(n), nums length = \(nums.count)")
    return quadraticRecur(n: n - 1)
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int quadraticRecur(int n) {
  if (n &lt;= 0) return 0;
  List&lt;int&gt; nums = List.filled(n, 0);
  print('Recursion n = $n, nums length = \${nums.length}');
  return quadraticRecur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def quadratic_recur(n: int) -&gt; int:
    """Quadratic order (recursive implementation)"""
    if n &lt;= 0:
        return 0
    # Array nums has lengths n, n-1, ..., 2, 1
    nums = [0] * n
    return quadratic_recur(n - 1)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>int quadraticRecur(int n) {
    if (n &lt;= 0)
        return 0;
    vector&lt;int&gt; nums(n);
    cout &lt;&lt; "Recursion n = " &lt;&lt; n &lt;&lt; ", nums length = " &lt;&lt; nums.size() &lt;&lt; endl;
    return quadraticRecur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    int QuadraticRecur(int n) {
        if (n &lt;= 0) return 0;
        int[] nums = new int[n];
        Console.WriteLine("Recursion n = " + n + ", nums length = " + nums.Length);
        return QuadraticRecur(n - 1);
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func spaceQuadraticRecur(n int) int {
    if n &lt;= 0 {
        return 0
    }
    nums := make([]int, n)
    fmt.Printf("Recursion n = %d, nums length = %d \n", n, len(nums))
    return spaceQuadraticRecur(n - 1)
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function quadraticRecur(n) {
    if (n &lt;= 0) return 0;
    const nums = new Array(n);
    console.log(\`Recursion n = \${n}, nums length = \${nums.length}\`);
    return quadraticRecur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function quadraticRecur(n: number): number {
    if (n &lt;= 0) return 0;
    const nums = new Array(n);
    console.log(\`Recursion n = \${n}, nums length = \${nums.length}\`);
    return quadraticRecur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn quadratic_recur(n: i32) -&gt; i32 {
    if n &lt;= 0 {
        return 0;
    };
    // Array nums has lengths n, n-1, ..., 2, 1
    let nums = vec![0; n as usize];
    println!("Recursion n = {}, nums length = {}", n, nums.len());
    return quadratic_recur(n - 1);
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>int quadraticRecur(int n) {
    if (n &lt;= 0)
        return 0;
    int *nums = malloc(sizeof(int) * n);
    printf("Recursion n = %d, nums length = %d\r\n", n, n);
    int res = quadraticRecur(n - 1);
    free(nums);
    return res;
}</code></pre></div></div></div>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/space_complexity_recursive_quadratic.png" alt="Độ phức tạp không gian cấp độ bình phương sinh ra bởi hàm đệ quy" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>2.4.3.4 Không gian lũy thừa $O(2^n)$</h3>
<p>Cấp độ lũy thừa thường xuất hiện trong cây nhị phân. Hãy quan sát hình dưới đây: một "cây nhị phân đầy đủ" (full binary tree) với $n$ tầng có $2^n - 1$ nút, chiếm dụng $O(2^n)$ không gian:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>    static TreeNode buildTree(int n) {
        if (n == 0)
            return null;
        TreeNode root = new TreeNode(0);
        root.left = buildTree(n - 1);
        root.right = buildTree(n - 1);
        return root;
    }</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>fun buildTree(n: Int): TreeNode? {
    if (n == 0)
        return null
    val root = TreeNode(0)
    root.left = buildTree(n - 1)
    root.right = buildTree(n - 1)
    return root
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func buildTree(n: Int) -&gt; TreeNode? {
    if n == 0 {
        return nil
    }
    let root = TreeNode(x: 0)
    root.left = buildTree(n: n - 1)
    root.right = buildTree(n: n - 1)
    return root
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>TreeNode? buildTree(int n) {
  if (n == 0) return null;
  TreeNode root = TreeNode(0);
  root.left = buildTree(n - 1);
  root.right = buildTree(n - 1);
  return root;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def build_tree(n: int) -&gt; TreeNode | None:
    """Exponential order (build a full binary tree)"""
    if n == 0:
        return None
    root = TreeNode(0)
    root.left = build_tree(n - 1)
    root.right = build_tree(n - 1)
    return root</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>TreeNode *buildTree(int n) {
    if (n == 0)
        return nullptr;
    TreeNode *root = new TreeNode(0);
    root-&gt;left = buildTree(n - 1);
    root-&gt;right = buildTree(n - 1);
    return root;
}</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>    TreeNode? BuildTree(int n) {
        if (n == 0) return null;
        TreeNode root = new(0) {
            left = BuildTree(n - 1),
            right = BuildTree(n - 1)
        };
        return root;
    }</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>func buildTree(n int) *TreeNode {
    if n == 0 {
        return nil
    }
    root := NewTreeNode(0)
    root.Left = buildTree(n - 1)
    root.Right = buildTree(n - 1)
    return root
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>function buildTree(n) {
    if (n === 0) return null;
    const root = new TreeNode(0);
    root.left = buildTree(n - 1);
    root.right = buildTree(n - 1);
    return root;
}</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>function buildTree(n: number): TreeNode | null {
    if (n === 0) return null;
    const root = new TreeNode(0);
    root.left = buildTree(n - 1);
    root.right = buildTree(n - 1);
    return root;
}</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>fn build_tree(n: i32) -&gt; Option&lt;Rc&lt;RefCell&lt;TreeNode&gt;&gt;&gt; {
    if n == 0 {
        return None;
    };
    let root = TreeNode::new(0);
    root.borrow_mut().left = build_tree(n - 1);
    root.borrow_mut().right = build_tree(n - 1);
    return Some(root);
}</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>TreeNode *buildTree(int n) {
    if (n == 0)
        return NULL;
    TreeNode *root = newTreeNode(0);
    root-&gt;left = buildTree(n - 1);
    root-&gt;right = buildTree(n - 1);
    return root;
}</code></pre></div></div></div>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/space_complexity_exponential.png" alt="Độ phức tạp không gian cấp độ lũy thừa sinh ra bởi cây nhị phân đầy đủ" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>2.4.3.5 Không gian logarit $O(\\log n)$</h3>
<p>Cấp độ logarit thường xuất hiện trong các giải thuật chia để trị (divide and conquer). Ví dụ, với sắp xếp trộn (Merge Sort): cho một mảng đầu vào có độ dài $n$, mỗi lần đệ quy sẽ chia đôi mảng từ điểm giữa, tạo thành một cây đệ quy có chiều cao $\\log n$, sử dụng $O(\\log n)$ không gian khung ngăn xếp.</p>
<p>Một ví dụ khác là chuyển đổi một số thành chuỗi. Cho một số nguyên dương $n$, nó có $\\lfloor \log_{10} n \\rfloor + 1$ chữ số, tức là độ dài chuỗi tương ứng là $\\lfloor \log_{10} n \\rfloor + 1$, do đó độ phức tạp không gian là $O(\log_{10} n + 1) = O(\\log n)$.</p>

<h2>2.4.4 Đánh đổi Thời gian lấy Không gian</h2>
<p>Trong điều kiện lý tưởng, chúng ta mong muốn cả độ phức tạp thời gian và độ phức tạp không gian của một giải thuật đều đạt mức tối ưu. Tuy nhiên trong thực tế, việc tối ưu hóa đồng thời cả độ phức tạp thời gian và độ phức tạp không gian thường rất khó khăn.</p>
<p><strong>Việc giảm độ phức tạp thời gian thường phải đánh đổi bằng việc tăng độ phức tạp không gian, và ngược lại</strong>. Hy sinh không gian bộ nhớ để cải thiện tốc độ thực thi được gọi là "đánh đổi không gian lấy thời gian" (trading space for time); ngược lại được gọi là "đánh đổi thời gian lấy không gian" (trading time for space).</p>
<p>Việc lựa chọn cách tiếp cận nào phụ thuộc vào khía cạnh nào chúng ta coi trọng hơn. Trong phần lớn trường hợp, thời gian quý giá hơn không gian, nên "đánh đổi không gian lấy thời gian" thường là chiến lược phổ biến hơn. Tất nhiên, khi khối lượng dữ liệu rất lớn, việc kiểm soát độ phức tạp không gian cũng rất quan trọng.</p>
`,
    originalContent: `
# Space Complexity

<u>Space complexity</u> measures the growth trend of memory space occupied by an algorithm as the data size increases. This concept is very similar to time complexity, except that "running time" is replaced with "occupied memory space".

## Algorithm-Related Space

The memory space used by an algorithm during execution mainly includes the following types.

- **Input space**: Used to store the input data of the algorithm.
- **Temporary space**: Used to store variables, objects, function contexts, and other data during the algorithm's execution.
- **Output space**: Used to store the output data of the algorithm.

In general, the scope of space complexity statistics is "temporary space" plus "output space".

Temporary space can be further divided into three parts.

- **Temporary data**: Used to save various constants, variables, objects, etc., during the algorithm's execution.
- **Stack frame space**: Used to save the context data of called functions. The system creates a stack frame at the top of the stack each time a function is called, and the stack frame space is released after the function returns.
- **Instruction space**: Used to save compiled program instructions, which are usually ignored in actual statistics.

When analyzing the space complexity of a program, **we usually consider three parts: temporary data, stack frame space, and output data**, as shown in the following figure.

![Algorithm-related space](space_complexity.assets/space_types.png)

The related code is as follows:

=== "Python"

    \`\`\`python title=""
    class Node:
        """Class"""
        def __init__(self, x: int):
            self.val: int = x              # Node value
            self.next: Node | None = None  # Reference to the next node

    def function() -> int:
        """Function"""
        # Perform some operations...
        return 0

    def algorithm(n) -> int:  # Input data
        A = 0                 # Temporary data (constant, usually represented by uppercase letters)
        b = 0                 # Temporary data (variable)
        node = Node(0)        # Temporary data (object)
        c = function()        # Stack frame space (function call)
        return A + b + c      # Output data
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    /* Structure */
    struct Node {
        int val;
        Node *next;
        Node(int x) : val(x), next(nullptr) {}
    };

    /* Function */
    int func() {
        // Perform some operations...
        return 0;
    }

    int algorithm(int n) {        // Input data
        const int a = 0;          // Temporary data (constant)
        int b = 0;                // Temporary data (variable)
        Node* node = new Node(0); // Temporary data (object)
        int c = func();           // Stack frame space (function call)
        return a + b + c;         // Output data
    }
    \`\`\`

=== "Java"

    \`\`\`java title=""
    /* Class */
    class Node {
        int val;
        Node next;
        Node(int x) { val = x; }
    }

    /* Function */
    int function() {
        // Perform some operations...
        return 0;
    }

    int algorithm(int n) {        // Input data
        final int a = 0;          // Temporary data (constant)
        int b = 0;                // Temporary data (variable)
        Node node = new Node(0);  // Temporary data (object)
        int c = function();       // Stack frame space (function call)
        return a + b + c;         // Output data
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    /* Class */
    class Node(int x) {
        int val = x;
        Node next;
    }

    /* Function */
    int Function() {
        // Perform some operations...
        return 0;
    }

    int Algorithm(int n) {        // Input data
        const int a = 0;          // Temporary data (constant)
        int b = 0;                // Temporary data (variable)
        Node node = new(0);       // Temporary data (object)
        int c = Function();       // Stack frame space (function call)
        return a + b + c;         // Output data
    }
    \`\`\`

=== "Go"

    \`\`\`go title=""
    /* Structure */
    type node struct {
        val  int
        next *node
    }

    /* Create node structure */
    func newNode(val int) *node {
        return &node{val: val}
    }

    /* Function */
    func function() int {
        // Perform some operations...
        return 0
    }

    func algorithm(n int) int { // Input data
        const a = 0             // Temporary data (constant)
        b := 0                  // Temporary data (variable)
        newNode(0)              // Temporary data (object)
        c := function()         // Stack frame space (function call)
        return a + b + c        // Output data
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    /* Class */
    class Node {
        var val: Int
        var next: Node?

        init(x: Int) {
            val = x
        }
    }

    /* Function */
    func function() -> Int {
        // Perform some operations...
        return 0
    }

    func algorithm(n: Int) -> Int { // Input data
        let a = 0             // Temporary data (constant)
        var b = 0             // Temporary data (variable)
        let node = Node(x: 0) // Temporary data (object)
        let c = function()    // Stack frame space (function call)
        return a + b + c      // Output data
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    /* Class */
    class Node {
        val;
        next;
        constructor(val) {
            this.val = val === undefined ? 0 : val; // Node value
            this.next = null;                       // Reference to the next node
        }
    }

    /* Function */
    function constFunc() {
        // Perform some operations
        return 0;
    }

    function algorithm(n) {       // Input data
        const a = 0;              // Temporary data (constant)
        let b = 0;                // Temporary data (variable)
        const node = new Node(0); // Temporary data (object)
        const c = constFunc();    // Stack frame space (function call)
        return a + b + c;         // Output data
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    /* Class */
    class Node {
        val: number;
        next: Node | null;
        constructor(val?: number) {
            this.val = val === undefined ? 0 : val; // Node value
            this.next = null;                       // Reference to the next node
        }
    }

    /* Function */
    function constFunc(): number {
        // Perform some operations
        return 0;
    }

    function algorithm(n: number): number { // Input data
        const a = 0;                        // Temporary data (constant)
        let b = 0;                          // Temporary data (variable)
        const node = new Node(0);           // Temporary data (object)
        const c = constFunc();              // Stack frame space (function call)
        return a + b + c;                   // Output data
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    /* Class */
    class Node {
      int val;
      Node next;
      Node(this.val, [this.next]);
    }

    /* Function */
    int function() {
      // Perform some operations...
      return 0;
    }

    int algorithm(int n) {  // Input data
      const int a = 0;      // Temporary data (constant)
      int b = 0;            // Temporary data (variable)
      Node node = Node(0);  // Temporary data (object)
      int c = function();   // Stack frame space (function call)
      return a + b + c;     // Output data
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    use std::rc::Rc;
    use std::cell::RefCell;

    /* Structure */
    struct Node {
        val: i32,
        next: Option<Rc<RefCell<Node>>>,
    }

    /* Create Node structure */
    impl Node {
        fn new(val: i32) -> Self {
            Self { val: val, next: None }
        }
    }

    /* Function */
    fn function() -> i32 {
        // Perform some operations...
        return 0;
    }

    fn algorithm(n: i32) -> i32 {       // Input data
        const a: i32 = 0;               // Temporary data (constant)
        let mut b = 0;                  // Temporary data (variable)
        let node = Node::new(0);        // Temporary data (object)
        let c = function();             // Stack frame space (function call)
        return a + b + c;               // Output data
    }
    \`\`\`

=== "C"

    \`\`\`c title=""
    /* Function */
    int func() {
        // Perform some operations...
        return 0;
    }

    int algorithm(int n) { // Input data
        const int a = 0;   // Temporary data (constant)
        int b = 0;         // Temporary data (variable)
        int c = func();    // Stack frame space (function call)
        return a + b + c;  // Output data
    }
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    /* Class */
    class Node(var _val: Int) {
        var next: Node? = null
    }

    /* Function */
    fun function(): Int {
        // Perform some operations...
        return 0
    }

    fun algorithm(n: Int): Int { // Input data
        val a = 0                // Temporary data (constant)
        var b = 0                // Temporary data (variable)
        val node = Node(0)       // Temporary data (object)
        val c = function()       // Stack frame space (function call)
        return a + b + c         // Output data
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    ### Class ###
    class Node
        attr_accessor :val      # Node value
        attr_accessor :next     # Reference to the next node

        def initialize(x)
            @val = x
        end
    end

    ### Function ###
    def function
        # Perform some operations...
        0
    end

    ### Algorithm ###
    def algorithm(n)        # Input data
        a = 0               # Temporary data (constant)
        b = 0               # Temporary data (variable)
        node = Node.new(0)  # Temporary data (object)
        c = function        # Stack frame space (function call)
        a + b + c           # Output data
    end
    \`\`\`

## Calculation Method

The calculation method for space complexity is roughly the same as for time complexity, except that what we measure changes from the "number of operations" to the "amount of space used".

Unlike time complexity, **we usually only focus on the worst-case space complexity**. This is because memory space is a hard requirement, and we must ensure that sufficient memory space is reserved for all input data.

Observe the following code. Here, "worst case" in worst-case space complexity has two meanings.

1. **Based on the worst input data**: When $n < 10$, the space complexity is $O(1)$; but when $n > 10$, the initialized array \`nums\` occupies $O(n)$ space, so the worst-case space complexity is $O(n)$.
2. **Based on the peak memory during algorithm execution**: For example, before executing the last line, the program occupies $O(1)$ space; when initializing the array \`nums\`, the program occupies $O(n)$ space, so the worst-case space complexity is $O(n)$.

=== "Python"

    \`\`\`python title=""
    def algorithm(n: int):
        a = 0               # O(1)
        b = [0] * 10000     # O(1)
        if n > 10:
            nums = [0] * n  # O(n)
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    void algorithm(int n) {
        int a = 0;               // O(1)
        vector<int> b(10000);    // O(1)
        if (n > 10)
            vector<int> nums(n); // O(n)
    }
    \`\`\`

=== "Java"

    \`\`\`java title=""
    void algorithm(int n) {
        int a = 0;                   // O(1)
        int[] b = new int[10000];    // O(1)
        if (n > 10)
            int[] nums = new int[n]; // O(n)
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    void Algorithm(int n) {
        int a = 0;                   // O(1)
        int[] b = new int[10000];    // O(1)
        if (n > 10) {
            int[] nums = new int[n]; // O(n)
        }
    }
    \`\`\`

=== "Go"

    \`\`\`go title=""
    func algorithm(n int) {
        a := 0                      // O(1)
        b := make([]int, 10000)     // O(1)
        var nums []int
        if n > 10 {
            nums := make([]int, n)  // O(n)
        }
        fmt.Println(a, b, nums)
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    func algorithm(n: Int) {
        let a = 0 // O(1)
        let b = Array(repeating: 0, count: 10000) // O(1)
        if n > 10 {
            let nums = Array(repeating: 0, count: n) // O(n)
        }
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    function algorithm(n) {
        const a = 0;                   // O(1)
        const b = new Array(10000);    // O(1)
        if (n > 10) {
            const nums = new Array(n); // O(n)
        }
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    function algorithm(n: number): void {
        const a = 0;                   // O(1)
        const b = new Array(10000);    // O(1)
        if (n > 10) {
            const nums = new Array(n); // O(n)
        }
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    void algorithm(int n) {
      int a = 0;                            // O(1)
      List<int> b = List.filled(10000, 0);  // O(1)
      if (n > 10) {
        List<int> nums = List.filled(n, 0); // O(n)
      }
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    fn algorithm(n: i32) {
        let a = 0;                              // O(1)
        let b = [0; 10000];                     // O(1)
        if n > 10 {
            let nums = vec![0; n as usize];     // O(n)
        }
    }
    \`\`\`

=== "C"

    \`\`\`c title=""
    void algorithm(int n) {
        int a = 0;               // O(1)
        int b[10000];            // O(1)
        if (n > 10)
            int nums[n] = {0};   // O(n)
    }
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    fun algorithm(n: Int) {
        val a = 0                    // O(1)
        val b = IntArray(10000)      // O(1)
        if (n > 10) {
            val nums = IntArray(n)   // O(n)
        }
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    def algorithm(n)
        a = 0                           # O(1)
        b = Array.new(10000)            # O(1)
        nums = Array.new(n) if n > 10   # O(n)
    end
    \`\`\`

**In recursive functions, it is necessary to count the stack frame space**. Observe the following code:

=== "Python"

    \`\`\`python title=""
    def function() -> int:
        # Perform some operations
        return 0

    def loop(n: int):
        """Loop has space complexity of O(1)"""
        for _ in range(n):
            function()

    def recur(n: int):
        """Recursion has space complexity of O(n)"""
        if n == 1:
            return
        return recur(n - 1)
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    int func() {
        // Perform some operations
        return 0;
    }
    /* Loop has space complexity of O(1) */
    void loop(int n) {
        for (int i = 0; i < n; i++) {
            func();
        }
    }
    /* Recursion has space complexity of O(n) */
    void recur(int n) {
        if (n == 1) return;
        recur(n - 1);
    }
    \`\`\`

=== "Java"

    \`\`\`java title=""
    int function() {
        // Perform some operations
        return 0;
    }
    /* Loop has space complexity of O(1) */
    void loop(int n) {
        for (int i = 0; i < n; i++) {
            function();
        }
    }
    /* Recursion has space complexity of O(n) */
    void recur(int n) {
        if (n == 1) return;
        recur(n - 1);
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    int Function() {
        // Perform some operations
        return 0;
    }
    /* Loop has space complexity of O(1) */
    void Loop(int n) {
        for (int i = 0; i < n; i++) {
            Function();
        }
    }
    /* Recursion has space complexity of O(n) */
    int Recur(int n) {
        if (n == 1) return 1;
        return Recur(n - 1);
    }
    \`\`\`

=== "Go"

    \`\`\`go title=""
    func function() int {
        // Perform some operations
        return 0
    }

    /* Loop has space complexity of O(1) */
    func loop(n int) {
        for i := 0; i < n; i++ {
            function()
        }
    }

    /* Recursion has space complexity of O(n) */
    func recur(n int) {
        if n == 1 {
            return
        }
        recur(n - 1)
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    @discardableResult
    func function() -> Int {
        // Perform some operations
        return 0
    }

    /* Loop has space complexity of O(1) */
    func loop(n: Int) {
        for _ in 0 ..< n {
            function()
        }
    }

    /* Recursion has space complexity of O(n) */
    func recur(n: Int) {
        if n == 1 {
            return
        }
        recur(n: n - 1)
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    function constFunc() {
        // Perform some operations
        return 0;
    }
    /* Loop has space complexity of O(1) */
    function loop(n) {
        for (let i = 0; i < n; i++) {
            constFunc();
        }
    }
    /* Recursion has space complexity of O(n) */
    function recur(n) {
        if (n === 1) return;
        return recur(n - 1);
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    function constFunc(): number {
        // Perform some operations
        return 0;
    }
    /* Loop has space complexity of O(1) */
    function loop(n: number): void {
        for (let i = 0; i < n; i++) {
            constFunc();
        }
    }
    /* Recursion has space complexity of O(n) */
    function recur(n: number): void {
        if (n === 1) return;
        return recur(n - 1);
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    int function() {
      // Perform some operations
      return 0;
    }
    /* Loop has space complexity of O(1) */
    void loop(int n) {
      for (int i = 0; i < n; i++) {
        function();
      }
    }
    /* Recursion has space complexity of O(n) */
    void recur(int n) {
      if (n == 1) return;
      recur(n - 1);
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    fn function() -> i32 {
        // Perform some operations
        return 0;
    }
    /* Loop has space complexity of O(1) */
    fn loop(n: i32) {
        for i in 0..n {
            function();
        }
    }
    /* Recursion has space complexity of O(n) */
    fn recur(n: i32) {
        if n == 1 {
            return;
        }
        recur(n - 1);
    }
    \`\`\`

=== "C"

    \`\`\`c title=""
    int func() {
        // Perform some operations
        return 0;
    }
    /* Loop has space complexity of O(1) */
    void loop(int n) {
        for (int i = 0; i < n; i++) {
            func();
        }
    }
    /* Recursion has space complexity of O(n) */
    void recur(int n) {
        if (n == 1) return;
        recur(n - 1);
    }
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    fun function(): Int {
        // Perform some operations
        return 0
    }
    /* Loop has space complexity of O(1) */
    fun loop(n: Int) {
        for (i in 0..<n) {
            function()
        }
    }
    /* Recursion has space complexity of O(n) */
    fun recur(n: Int) {
        if (n == 1) return
        return recur(n - 1)
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    def function
        # Perform some operations
        0
    end

    ### Loop has space complexity of O(1) ###
    def loop(n)
        (0...n).each { function }
    end

    ### Recursion has space complexity of O(n) ###
    def recur(n)
        return if n == 1
        recur(n - 1)
    end
    \`\`\`

The time complexity of both functions \`loop()\` and \`recur()\` is $O(n)$, but their space complexities are different.

- The function \`loop()\` calls \`function()\` $n$ times in a loop. In each iteration, \`function()\` returns and releases its stack frame space, so the space complexity remains $O(1)$.
- The recursive function \`recur()\` has $n$ unreturned \`recur()\` instances existing simultaneously during execution, thus occupying $O(n)$ stack frame space.

## Common Types

Let the input data size be $n$. The following figure shows common types of space complexity (arranged from low to high).

$$
\\begin{aligned}
& O(1) < O(\\log n) < O(n) < O(n^2) < O(2^n) \\newline
& \\text{Constant} < \\text{Logarithmic} < \\text{Linear} < \\text{Quadratic} < \\text{Exponential}
\\end{aligned}
$$

![Common types of space complexity](space_complexity.assets/space_complexity_common_types.png)

### Constant Order $O(1)$

Constant order is common for constants, variables, and objects whose number is independent of the input data size $n$.

It should be noted that memory occupied by initializing variables or calling functions in a loop is released when entering the next iteration, so it does not accumulate space, and the space complexity remains $O(1)$:

\`\`\`src
[file]{space_complexity}-[class]{}-[func]{constant}
\`\`\`

### Linear Order $O(n)$

Linear order is common in arrays, linked lists, stacks, queues, etc., where the number of elements is proportional to $n$:

\`\`\`src
[file]{space_complexity}-[class]{}-[func]{linear}
\`\`\`

As shown in the following figure, the recursion depth of this function is $n$, meaning that there are $n$ unreturned \`linear_recur()\` functions existing simultaneously, using $O(n)$ stack frame space:

\`\`\`src
[file]{space_complexity}-[class]{}-[func]{linear_recur}
\`\`\`

![Linear order space complexity generated by recursive function](space_complexity.assets/space_complexity_recursive_linear.png)

### Quadratic Order $O(n^2)$

Quadratic order is common in matrices and graphs, where the number of elements is quadratically related to $n$:

\`\`\`src
[file]{space_complexity}-[class]{}-[func]{quadratic}
\`\`\`

As shown in the following figure, the recursion depth of this function is $n$, and an array is initialized in each recursive function with lengths of $n$, $n-1$, $\\dots$, $2$, $1$, with an average length of $n / 2$, thus occupying $O(n^2)$ space overall:

\`\`\`src
[file]{space_complexity}-[class]{}-[func]{quadratic_recur}
\`\`\`

![Quadratic order space complexity generated by recursive function](space_complexity.assets/space_complexity_recursive_quadratic.png)

### Exponential Order $O(2^n)$

Exponential order is common in binary trees. Observe the following figure: a "full binary tree" with $n$ levels has $2^n - 1$ nodes, occupying $O(2^n)$ space:

\`\`\`src
[file]{space_complexity}-[class]{}-[func]{build_tree}
\`\`\`

![Exponential order space complexity generated by full binary tree](space_complexity.assets/space_complexity_exponential.png)

### Logarithmic Order $O(\\log n)$

Logarithmic order is common in divide-and-conquer algorithms. For example, merge sort: given an input array of length $n$, each recursion divides the array in half from the midpoint, forming a recursion tree of height $\\log n$, using $O(\\log n)$ stack frame space.

Another example is converting a number to a string. Given a positive integer $n$, it has $\\lfloor \\log_{10} n \\rfloor + 1$ digits, i.e., the corresponding string length is $\\lfloor \\log_{10} n \\rfloor + 1$, so the space complexity is $O(\\log_{10} n + 1) = O(\\log n)$.

## Trading Time for Space

Ideally, we hope that both the time complexity and space complexity of an algorithm can reach optimal. However, in practice, optimizing both time complexity and space complexity simultaneously is usually very difficult.

**Reducing time complexity usually comes at the cost of increasing space complexity, and vice versa**. Sacrificing memory space to improve execution speed is called "trading space for time"; the reverse is called "trading time for space".

The choice of which approach depends on which aspect we value more. In most cases, time is more precious than space, so "trading space for time" is usually the more common strategy. Of course, when the data volume is very large, controlling space complexity is also very important.
`
  },
  'dsa-complexity-summary': {
    title: '2.5 Tóm tắt & Hỏi đáp',
    summary: 'Tóm tắt kiến thức chương 2 về phân tích độ phức tạp thời gian, không gian và các câu hỏi đáp liên quan.',
    tags: ['dsa', 'complexity'],
    domain: 'Algorithms',
    module: 'Chương 2: Phân tích Độ phức tạp',
    prerequisites: ['dsa-space-complexity'],
    related: [],
    updatedAt: '2026-07-17',
    readTime: '6 phút',
    content: `
<h2>2.5.1 Tóm tắt Kiến thức Cốt lõi</h2>

<h3>2.5.1.1 Đánh giá Hiệu năng Giải thuật</h3>
<ul>
  <li><strong>Hiệu quả thời gian (Time efficiency)</strong> và <strong>Hiệu quả không gian (Space efficiency)</strong> là hai tiêu chí cơ bản để đo lường hiệu năng của giải thuật.</li>
  <li>Chúng ta có thể đánh giá hiệu năng bằng <strong>Thực nghiệm thực tế</strong>, nhưng phương pháp này khó loại bỏ nhiễu từ môi trường kiểm thử và tiêu tốn nhiều tài nguyên tính toán.</li>
  <li><strong>Phân tích độ phức tạp</strong> khắc phục được các hạn chế trên. Kết quả phân tích áp dụng được cho mọi nền tảng chạy và phản ánh chi tiết hiệu năng giải thuật ở các quy mô dữ liệu khác nhau.</li>
</ul>

<h3>2.5.1.2 Độ phức tạp Thời gian (Time Complexity)</h3>
<ul>
  <li>Độ phức tạp thời gian dùng để đo lường <strong>xu hướng tăng trưởng của thời gian chạy</strong> khi quy mô dữ liệu $n$ tăng lên. Nó đánh giá hiệu quả giải thuật một cách khách quan nhưng có thể kém trực quan trong một số trường hợp (ví dụ: khi dữ liệu nhỏ hoặc khi hai thuật toán có cùng độ phức tạp nhưng hằng số thực thi khác nhau).</li>
  <li>Độ phức tạp trong trường hợp xấu nhất được biểu diễn bằng ký hiệu <strong>Big-O (O lớn)</strong>, tương ứng với giới hạn trên tiệm cận của hàm số, phản ánh mức độ tăng trưởng của số lượng phép toán $T(n)$ khi $n$ tiến tới vô cùng.</li>
  <li>Quá trình suy ra độ phức tạp thời gian gồm hai bước: đầu tiên là <strong>đọc và đếm số lượng phép toán</strong>, sau đó <strong>xác định giới hạn trên tiệm cận</strong>.</li>
  <li>Các cấp độ phức tạp thời gian phổ biến xếp từ thấp đến cao gồm: $O(1)$, $O(\\log n)$, $O(n)$, $O(n \\log n)$, $O(n^2)$, $O(2^n)$, và $O(n!)$.</li>
  <li>Hiệu năng của một số giải thuật không cố định mà phụ thuộc vào sự phân bố của dữ liệu đầu vào. Do đó, độ phức tạp được chia thành: <strong>Trường hợp xấu nhất (Worst-case)</strong>, <strong>Trường hợp tốt nhất (Best-case)</strong>, và <strong>Trường hợp trung bình (Average-case)</strong>. Độ phức tạp trường hợp tốt nhất ít khi được sử dụng vì dữ liệu đầu vào thường phải thỏa mãn cấu hình đặc thù cực kỳ hiếm gặp.</li>
  <li><strong>Độ phức tạp trung bình</strong> phản ánh hiệu năng chạy của giải thuật dưới dữ liệu ngẫu nhiên, sát nhất với hiệu năng thực tế. Việc tính toán độ phức tạp trung bình đòi hỏi phân tích xác suất phân bố của dữ liệu và kỳ vọng toán học tương ứng.</li>
</ul>

<h3>2.5.1.3 Độ phức tạp Không gian (Space Complexity)</h3>
<ul>
  <li>Tương tự như độ phức tạp thời gian, độ phức tạp không gian dùng để đo lường <strong>xu hướng tăng trưởng của không gian bộ nhớ sử dụng</strong> khi quy mô dữ liệu $n$ tăng lên.</li>
  <li>Bộ nhớ sử dụng khi chạy giải thuật được chia thành ba loại: <strong>Không gian đầu vào (Input space)</strong>, <strong>Không gian tạm thời (Temporary space)</strong>, và <strong>Không gian đầu ra (Output space)</strong>. Thông thường, không gian đầu vào không được tính vào độ phức tạp không gian. Không gian tạm thời gồm: dữ liệu tạm thời, không gian ngăn xếp (stack frame), và không gian chứa lệnh thực thi; trong đó không gian ngăn xếp thường chỉ ảnh hưởng tới độ phức tạp không gian của các hàm đệ quy.</li>
  <li>Chúng ta thường chỉ tập trung vào <strong>Độ phức tạp không gian trong trường hợp xấu nhất</strong>, tức là lượng không gian bộ nhớ tối đa mà giải thuật tiêu thụ dưới dữ liệu và đường chạy tệ nhất.</li>
  <li>Các cấp độ phức tạp không gian phổ biến từ thấp đến cao gồm: $O(1)$, $O(\\log n)$, $O(n)$, $O(n^2)$, và $O(2^n)$.</li>
</ul>

<h2>2.5.2 Hỏi & Đáp (Q&A)</h2>
<p><strong>Hỏi: Độ phức tạp không gian của đệ quy đuôi (Tail Recursion) có phải là $O(1)$ không?</strong></p>
<p><strong>Trả lời:</strong> Về mặt lý thuyết, không gian bộ nhớ của hàm đệ quy đuôi có thể được tối ưu hóa xuống hằng số $O(1)$. Tuy nhiên, hầu hết các ngôn ngữ lập trình phổ biến (như Java, Python, C++, Go, C#, v.v.) không tự động tối ưu hóa đệ quy đuôi, do đó độ phức tạp không gian của đệ quy đuôi trong đa số môi trường chạy thực tế vẫn giữ mức $O(n)$.</p>

<p><strong>Hỏi: Sự khác biệt giữa hai thuật ngữ Hàm (Function) và Phương thức (Method) is là gì?</strong></p>
<p><strong>Trả lời:</strong> Một <strong>Hàm (Function)</strong> có thể được thực thi độc lập, với tất cả các tham số đầu vào được truyền một cách tường minh. Một <strong>Phương thức (Method)</strong> luôn gắn liền với một đối tượng (Object), được ràng buộc ngầm định với đối tượng đang gọi nó, và có thể truy cập, thao tác trực tiếp trên dữ liệu nội tại của thể hiện lớp (Class Instance).</p>
<ul>
  <li><strong>Ngôn ngữ C</strong> là ngôn ngữ lập trình thủ tục không có khái niệm hướng đối tượng, vì vậy nó chỉ có hàm. Tuy nhiên, chúng ta có thể mô phỏng lập trình hướng đối tượng bằng cách tạo các cấu trúc dữ liệu (<code>struct</code>), và các hàm nhận con trỏ struct đóng vai trò tương tự phương pháp.</li>
  <li><strong>Java và C#</strong> là ngôn ngữ hướng đối tượng thuần túy, tất cả các khối mã nguồn đều phải nằm trong Class dưới dạng các phương thức. Các phương thức tĩnh (<code>static methods</code>) hoạt động như hàm vì chúng liên kết với Class chứ không phải với cụ thể một thực thể đối tượng nào, do đó không truy cập trực tiếp được dữ liệu thực thể.</li>
  <li><strong>C++ và Python</strong> hỗ trợ cả hai mô hình lập trình: vừa có hàm tự do (độc lập), vừa có phương thức hướng đối tượng (gắn vào class/object).</li>
</ul>

<p><strong>Hỏi: Biểu đồ biểu diễn "các loại độ phức tạp không gian phổ biến" có phản ánh kích thước bộ nhớ tuyệt đối không?</strong></p>
<p><strong>Trả lời:</strong> Không, biểu đồ chỉ thể hiện xu hướng tăng trưởng (Growth trends) chứ không phải kích thước bộ nhớ vật lý tuyệt đối. Giả sử khi $n = 8$, bạn có thể thấy giá trị trên các đường cong không khớp chính xác với kết quả hàm toán học. Điều này là do mỗi đường cong đã được cộng hoặc nhân thêm một hằng số thực tế để thu nhỏ/nén phạm vi hiển thị lại cho dễ nhìn và cân đối trực quan. Trong thực tế, vì chúng ta không biết hằng số tiêu hao cụ thể của từng phương thức bộ nhớ, chúng ta thường không thể chọn giải pháp tối ưu cho những trường hợp cực nhỏ như $n = 8$ chỉ dựa vào phân tích độ phức tạp. Nhưng với $n = 8^5$, lựa chọn sẽ trở nên cực kỳ rõ ràng vì lúc này xu hướng tăng trưởng là yếu tố thống trị hoàn toàn hiệu năng.</p>

<p><strong>Hỏi: Có trường hợp nào mà trong thực tế chúng ta chủ động hy sinh thời gian để tiết kiệm không gian bộ nhớ (hoặc ngược lại) không?</strong></p>
<p><strong>Trả lời:</strong> Có, đây là quá trình đánh đổi không-thời gian phổ biến trong lập trình:</p>
<ul>
  <li><strong>Đánh đổi không gian lấy thời gian (Sacrificing space for time):</strong> Là trường hợp phổ biến nhất. Ví dụ với index trong cơ sở dữ liệu, chúng ta chọn xây dựng các cấu trúc cây B+ hoặc bảng Hash. Hành vi này chiếm dụng thêm rất nhiều dung lượng bộ nhớ/đĩa để đổi lấy tốc độ truy vấn cực nhanh ở mức $O(\\log n)$ hoặc $O(1)$.</li>
  <li><strong>Đánh đổi thời gian lấy không gian (Sacrificing time for space):</strong> Thường gặp trong các hệ thống nhúng, thiết bị IoT hoặc các thiết bị di động có dung lượng RAM bị giới hạn ngặt nghèo. Kỹ sư có thể từ bỏ việc sử dụng các cấu trúc dữ liệu tốn bộ nhớ như bảng Hash hay cây tìm kiếm, thay vào đó chấp nhận quét tuần tự trên mảng tĩnh để tiết kiệm từng byte bộ nhớ, dù thời gian tìm kiếm sẽ giảm xuống $O(n)$.</li>
</ul>
`,
    originalContent: `
# Summary

### Key Review

**Algorithm Efficiency Assessment**

- Time efficiency and space efficiency are the two primary evaluation metrics for measuring algorithm performance.
- We can evaluate algorithm efficiency through actual testing, but it is difficult to eliminate the influence of the testing environment, and it consumes substantial computational resources.
- Complexity analysis can overcome the limitations of actual testing. Its results apply across running platforms, and it can reveal algorithm efficiency under different data scales.

**Time Complexity**

- Time complexity is used to measure the trend of algorithm runtime as data volume increases. It can effectively evaluate algorithm efficiency, but it may be less informative in certain situations, such as when the input data volume is small or when time complexities are identical, making it impossible to precisely compare algorithm efficiency.
- Worst-case time complexity is represented using Big $O$ notation, corresponding to the asymptotic upper bound of a function, reflecting the growth level of the number of operations $T(n)$ as $n$ approaches positive infinity.
- Deriving time complexity involves two steps: first, counting the number of operations, then determining the asymptotic upper bound.
- Common time complexities arranged from low to high include $O(1)$, $O(\\log n)$, $O(n)$, $O(n \\log n)$, $O(n^2)$, $O(2^n)$, and $O(n!)$.
- The time complexity of some algorithms is not fixed, but rather depends on the distribution of input data. Time complexity is divided into worst-case, best-case, and average-case time complexity. Best-case time complexity is rarely used because input data generally needs to satisfy strict conditions to achieve the best case.
- Average time complexity reflects the algorithm's runtime efficiency under random data input, and is closest to the algorithm's performance in practical applications. Calculating average time complexity requires analyzing the input data distribution and the resulting mathematical expectation.

**Space Complexity**

- Space complexity serves a similar purpose to time complexity, used to measure the trend of algorithm memory usage as data volume increases.
- The memory space related to algorithm execution can be divided into input space, temporary space, and output space. Typically, input space is not included in space complexity calculations. Temporary space can be divided into temporary data, stack frame space, and instruction space, where stack frame space usually affects space complexity only in recursive functions.
- We typically only focus on worst-case space complexity, which is the space complexity of an algorithm under worst-case input data and worst-case runtime.
- Common space complexities arranged from low to high include $O(1)$, $O(\\log n)$, $O(n)$, $O(n^2)$, and $O(2^n)$.

### Q & A

**Q**: Is the space complexity of tail recursion $O(1)$?

Theoretically, the space complexity of tail recursive functions can be optimized to $O(1)$. However, most programming languages (such as Java, Python, C++, Go, C#, etc.) do not support automatic tail recursion optimization, so the space complexity is generally considered to be $O(n)$.

**Q**: What is the difference between the terms function and method?

A <u>function</u> can be executed independently, with all parameters passed explicitly. A <u>method</u> is associated with an object, is implicitly bound to the object that invokes it, and can operate on data contained in class instances.

The following examples use several common programming languages for illustration.

- C is a procedural programming language without object-oriented concepts, so it only has functions. However, we can simulate object-oriented programming by creating structures (struct), and functions associated with structures are equivalent to methods in other programming languages.
- Java and C# are object-oriented programming languages where code blocks (methods) are typically part of a class. Static methods behave like functions because they are bound to the class and cannot access specific instance variables.
- C++ and Python support both procedural programming (functions) and object-oriented programming (methods).

**Q**: Does the diagram for "common space complexity types" reflect the absolute size of occupied space?

No, the diagram shows space complexity, which reflects growth trends rather than the absolute size of occupied space.

Assuming $n = 8$, you might find that the values of each curve do not correspond to the functions. This is because each curve contains a constant term used to compress the value range into a visually comfortable range.

In practice, because we generally do not know the "constant-term" cost of each method, we usually cannot choose the optimal solution for cases like $n = 8$ based on complexity alone. But for $n = 8^5$, the choice is straightforward, because the growth trend already dominates.

**Q**: Are there situations where algorithms are designed to sacrifice time (or space) based on actual use cases?

In practical applications, most situations choose to sacrifice space for time. For example, with database indexes, we typically choose to build B+ trees or hash indexes, occupying substantial memory space in exchange for efficient queries of $O(\\log n)$ or even $O(1)$.

In scenarios where space resources are precious, time may be sacrificed for space. For example, in embedded development, device memory is precious, and engineers may forgo using hash tables and choose to use array sequential search to save memory usage, at the cost of slower searches.
`
  },
  'dsa-structures-index': {
    title: 'Cấu trúc dữ liệu',
    summary: 'Lời giới thiệu dẫn dắt vào chương Cấu trúc dữ liệu — bản thiết kế để tổ chức dữ liệu một cách trật tự, làm nền tảng cho mọi giải thuật.',
    tags: ['dsa', 'structures'],
    domain: 'Algorithms',
    module: 'Chương 3: Cấu trúc dữ liệu cơ bản',
    prerequisites: ['dsa-complexity-summary'],
    related: ['dsa-classification'],
    updatedAt: '2026-07-18',
    readTime: '1 phút',
    content: `
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/chapter_data_structure.jpg" alt="Cấu trúc dữ liệu" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<div class="callout callout-note">
  <span class="callout-icon">✨</span>
  <div class="callout-body">
    <p>Cấu trúc dữ liệu giống như một khung sườn vững chãi và đa dạng.</p>
    <p>Nó cung cấp bản thiết kế cho việc tổ chức dữ liệu một cách trật tự, và trên nền tảng đó, giải thuật mới có thể hồi sinh và phát huy sức mạnh của mình.</p>
  </div>
</div>
`,
    originalContent: `
# Data Structures

![Data structures](../assets/covers/chapter_data_structure.jpg)

!!! abstract

    Data structures are like a sturdy and diverse framework.

    It provides a blueprint for the orderly organization of data, upon which algorithms come to life.
`
  },
  'dsa-classification': {
    title: '3.1 Classification of Data Structures (Phân loại Cấu trúc Dữ liệu)',
    summary: 'Tìm hiểu hai cách phân loại cấu trúc dữ liệu chính: theo Cấu trúc logic (tuyến tính, phi tuyến) và Cấu trúc vật lý trong bộ nhớ RAM.',
    tags: ['dsa', 'structures'],
    domain: 'Algorithms',
    module: 'Chương 3: Cấu trúc dữ liệu cơ bản',
    prerequisites: ['dsa-structures-index'],
    related: ['dsa-basic-types'],
    updatedAt: '2026-07-18',
    readTime: '6 phút',
    content: `
<p>Các cấu trúc dữ liệu phổ biến bao gồm mảng, danh sách liên kết, ngăn xếp, hàng đợi, bảng băm, cây, đống và đồ thị. Chúng ta có thể phân loại chúng theo hai chiều kích: "cấu trúc logic" (logical structure) và "cấu trúc vật lý" (physical structure).</p>

<h2>3.1.1 Cấu trúc logic: Tuyến tính và Phi tuyến</h2>
<p><strong>Cấu trúc logic thể hiện mối quan hệ logic giữa các phần tử dữ liệu.</strong> Trong mảng và danh sách liên kết, dữ liệu được sắp xếp theo một trật tự nhất định, thể hiện mối quan hệ tuyến tính giữa các phần tử; còn trong cây, dữ liệu được sắp xếp theo thứ bậc từ trên xuống dưới, thể hiện mối quan hệ tổ tiên - hậu duệ; đồ thị thì được cấu thành từ các đỉnh (node) và cạnh (edge), phản ánh mối quan hệ mạng lưới phức tạp.</p>
<p>Như hình minh họa dưới đây, cấu trúc logic có thể được chia thành hai nhóm lớn: "tuyến tính" và "phi tuyến". Cấu trúc tuyến tính trực quan hơn, cho biết dữ liệu được sắp xếp tuyến tính về mặt quan hệ logic; cấu trúc phi tuyến thì ngược lại, được sắp xếp không theo tuyến tính.</p>
<ul>
  <li><strong>Cấu trúc dữ liệu tuyến tính (Linear data structure)</strong>: Mảng, Danh sách liên kết, Ngăn xếp, Hàng đợi, Bảng băm, trong đó các phần tử có quan hệ tuần tự một-đối-một.</li>
  <li><strong>Cấu trúc dữ liệu phi tuyến (Non-linear data structure)</strong>: Cây, Đống, Đồ thị, Bảng băm.</li>
</ul>
<p>Cấu trúc dữ liệu phi tuyến có thể được chia nhỏ hơn nữa thành cấu trúc dạng cây và cấu trúc dạng mạng.</p>
<ul>
  <li><strong>Cấu trúc dạng cây (Tree structure)</strong>: Cây, Đống, Bảng băm, trong đó các phần tử có quan hệ một-nhiều.</li>
  <li><strong>Cấu trúc dạng mạng (Network structure)</strong>: Đồ thị, trong đó các phần tử có quan hệ nhiều-nhiều.</li>
</ul>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/classification_logic_structure.png" alt="Cấu trúc dữ liệu tuyến tính và phi tuyến" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>3.1.2 Cấu trúc vật lý: Liên tục và Phân tán</h2>
<p><strong>Khi một chương trình giải thuật chạy, dữ liệu được xử lý chủ yếu được lưu trữ trong bộ nhớ (memory).</strong> Hình dưới đây minh họa một thanh RAM máy tính, trong đó mỗi ô vuông đen chứa một không gian bộ nhớ. Ta có thể hình dung bộ nhớ như một bảng tính Excel khổng lồ, trong đó mỗi ô (cell) có thể lưu trữ một lượng dữ liệu nhất định.</p>
<p><strong>Hệ thống truy cập dữ liệu tại vị trí đích thông qua địa chỉ bộ nhớ (memory address).</strong> Như hình minh họa dưới đây, máy tính gán cho mỗi ô trong bảng tính một con số theo những quy tắc nhất định, đảm bảo mỗi không gian bộ nhớ có một địa chỉ bộ nhớ duy nhất. Nhờ có các địa chỉ này, chương trình mới có thể truy cập dữ liệu trong bộ nhớ.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/computer_memory_location.png" alt="Thanh bộ nhớ, không gian bộ nhớ, địa chỉ bộ nhớ" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Cần lưu ý rằng việc so sánh bộ nhớ với một bảng tính Excel chỉ là một phép ẩn dụ đơn giản hóa. Cách vận hành thực tế của bộ nhớ phức tạp hơn nhiều, liên quan đến các khái niệm như không gian địa chỉ (address space), quản lý bộ nhớ (memory management), cơ chế cache, bộ nhớ ảo (virtual memory) và bộ nhớ vật lý (physical memory).</p>
  </div>
</div>

<p>Bộ nhớ là tài nguyên dùng chung cho mọi chương trình. Khi một khối bộ nhớ bị một chương trình chiếm dụng, nó thường không thể được chương trình khác sử dụng đồng thời. <strong>Do đó, trong thiết kế cấu trúc dữ liệu và giải thuật, tài nguyên bộ nhớ là một yếu tố cần cân nhắc quan trọng.</strong> Ví dụ, lượng bộ nhớ đỉnh (peak memory) mà một giải thuật chiếm dụng không nên vượt quá lượng bộ nhớ trống còn lại của hệ thống; nếu thiếu các khối bộ nhớ lớn liên tục, thì cấu trúc dữ liệu được chọn phải có khả năng được lưu trữ trong các không gian bộ nhớ phân tán.</p>
<p>Như hình minh họa dưới đây, <strong>cấu trúc vật lý phản ánh cách dữ liệu được lưu trữ trong bộ nhớ máy tính.</strong> Nó có thể được chia thành lưu trữ không gian liên tục (mảng) và lưu trữ không gian phân tán (danh sách liên kết). Ở tầng thấp, cấu trúc vật lý quyết định cách dữ liệu được truy cập, cập nhật, chèn và xóa. Hai loại cấu trúc vật lý này thể hiện các đặc tính bổ sung cho nhau về hiệu quả thời gian và hiệu quả không gian.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/classification_phisical_structure.png" alt="Lưu trữ không gian liên tục và lưu trữ không gian phân tán" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Điều đáng chú ý là <strong>mọi cấu trúc dữ liệu đều được triển khai dựa trên mảng, danh sách liên kết, hoặc sự kết hợp của cả hai.</strong> Ví dụ, ngăn xếp và hàng đợi có thể được triển khai bằng cả mảng lẫn danh sách liên kết; trong khi việc triển khai bảng băm có thể bao gồm cả mảng lẫn danh sách liên kết.</p>
<ul>
  <li><strong>Có thể triển khai dựa trên mảng</strong>: Ngăn xếp, hàng đợi, bảng băm, cây, đống, đồ thị, ma trận, tensor (mảng có số chiều $\\geq 3$), v.v.</li>
  <li><strong>Có thể triển khai dựa trên danh sách liên kết</strong>: Ngăn xếp, hàng đợi, bảng băm, cây, đống, đồ thị, v.v.</li>
</ul>
<p>Sau khi khởi tạo, danh sách liên kết vẫn có thể điều chỉnh độ dài của nó trong quá trình chương trình thực thi, vì vậy nó còn được gọi là <strong>"cấu trúc dữ liệu động" (dynamic data structure)</strong>. Sau khi khởi tạo, độ dài của mảng không thể thay đổi, vì vậy nó còn được gọi là <strong>"cấu trúc dữ liệu tĩnh" (static data structure)</strong>. Cần lưu ý rằng mảng có thể thay đổi độ dài bằng cách cấp phát lại bộ nhớ, do đó vẫn giữ được một mức độ linh hoạt nhất định.</p>

<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Nếu bạn cảm thấy khó hiểu về cấu trúc vật lý, chúng tôi khuyến khích bạn đọc trước chương tiếp theo (Mảng và Danh sách liên kết), sau đó quay lại xem lại phần này.</p>
  </div>
</div>
`,
    originalContent: `
# Classification of Data Structures

Common data structures include arrays, linked lists, stacks, queues, hash tables, trees, heaps, and graphs. They can be classified from two dimensions: "logical structure" and "physical structure".

## Logical Structure: Linear and Non-Linear

**Logical structure reveals the logical relationships between data elements**. In arrays and linked lists, data is arranged in a certain order, embodying linear relationships between elements; while in trees, data is arranged hierarchically from top to bottom, showing parent-descendant relationships; graphs are composed of nodes and edges, reflecting complex network relationships.

As shown in the figure below, logical structures can be divided into two major categories: "linear" and "non-linear". Linear structures are more intuitive, indicating that data is linearly arranged in logical relationships; non-linear structures are the opposite, arranged non-linearly.

- **Linear data structures**: Arrays, linked lists, stacks, queues, hash tables, where elements have a one-to-one sequential relationship.
- **Non-linear data structures**: Trees, heaps, graphs, hash tables.

Non-linear data structures can be further divided into tree structures and network structures.

- **Tree structures**: Trees, heaps, hash tables, where elements have a one-to-many relationship.
- **Network structures**: Graphs, where elements have a many-to-many relationship.

![Linear and non-linear data structures](classification_of_data_structure.assets/classification_logic_structure.png)

## Physical Structure: Contiguous and Dispersed

**When an algorithm program runs, the data being processed is mainly stored in memory**. The figure below shows a computer memory stick, where each black square contains a memory space. We can imagine memory as a huge Excel spreadsheet, where each cell can store a certain amount of data.

**The system accesses data at the target location through memory addresses**. As shown in the figure below, the computer assigns a number to each cell in the spreadsheet according to specific rules, ensuring that each memory space has a unique memory address. With these addresses, the program can access data in memory.

![Memory stick, memory space, memory address](classification_of_data_structure.assets/computer_memory_location.png)

!!! tip

    It should be noted that comparing memory to an Excel spreadsheet is only a simplified analogy. The actual workings of memory are much more complex, involving concepts such as address space, memory management, cache mechanisms, virtual memory, and physical memory.

Memory is a shared resource for all programs. When a block of memory is occupied by a program, it usually cannot be used by other programs at the same time. **Therefore, in the design of data structures and algorithms, memory resources are an important consideration**. For example, the peak memory occupied by an algorithm should not exceed the remaining free memory of the system; if there is a lack of contiguous large memory blocks, then the data structure chosen must be able to be stored in dispersed memory spaces.

As shown in the figure below, **physical structure reflects the way data is stored in computer memory**. It can be divided into contiguous-space storage (arrays) and dispersed-space storage (linked lists). At a low level, physical structure determines how data is accessed, updated, inserted, and deleted. These two physical structures exhibit complementary characteristics in terms of time efficiency and space efficiency.

![Contiguous space storage and dispersed space storage](classification_of_data_structure.assets/classification_phisical_structure.png)

It is worth noting that **all data structures are implemented based on arrays, linked lists, or a combination of both**. For example, stacks and queues can be implemented using either arrays or linked lists; while the implementation of hash tables may include both arrays and linked lists.

- **Can be implemented based on arrays**: Stacks, queues, hash tables, trees, heaps, graphs, matrices, tensors (arrays with dimensions $\\geq 3$), etc.
- **Can be implemented based on linked lists**: Stacks, queues, hash tables, trees, heaps, graphs, etc.

After initialization, linked lists can still adjust their length during program execution, so they are also called "dynamic data structures". After initialization, the length of arrays cannot be changed, so they are also called "static data structures". It is worth noting that arrays can change length by reallocating memory, thus retaining a limited degree of flexibility.

!!! tip

    If you find it difficult to understand physical structure, it is recommended to read the next chapter first, and then review this section.
`
  },
  'dsa-basic-types': {
    title: '3.2 Basic Data Types (Kiểu Dữ liệu Cơ bản)',
    summary: 'Tìm hiểu các kiểu dữ liệu cơ bản của máy tính như Số nguyên, Số thực, Ký tự, Boolean và mối quan hệ giữa kiểu dữ liệu với cấu trúc dữ liệu.',
    tags: ['dsa', 'structures'],
    domain: 'Algorithms',
    module: 'Chương 3: Cấu trúc dữ liệu cơ bản',
    prerequisites: ['dsa-classification'],
    related: ['dsa-number-encoding', 'dsa-character-encoding'],
    updatedAt: '2026-07-18',
    readTime: '7 phút',
    content: `
<h2>3.2.1 Kiểu dữ liệu cơ bản là gì?</h2>
<p>Khi nói về dữ liệu được lưu trữ trong máy tính, chúng ta thường nghĩ đến nhiều dạng khác nhau như văn bản, hình ảnh, video, âm thanh, mô hình 3D, v.v. Mặc dù các loại dữ liệu này được tổ chức theo những cách khác nhau, chúng đều được cấu thành từ các kiểu dữ liệu cơ bản (basic data type).</p>
<p><strong>Kiểu dữ liệu cơ bản là những kiểu mà CPU có thể trực tiếp thao tác</strong>, và chúng được sử dụng trực tiếp trong giải thuật, chủ yếu bao gồm:</p>
<ul>
  <li>Kiểu số nguyên (Integer): <code>byte</code>, <code>short</code>, <code>int</code>, <code>long</code>.</li>
  <li>Kiểu số thực dấu phẩy động (Floating-point): <code>float</code>, <code>double</code>, dùng để biểu diễn số thập phân.</li>
  <li>Kiểu ký tự (Character): <code>char</code>, dùng để biểu diễn chữ cái, dấu câu, thậm chí cả biểu tượng cảm xúc (emoji) trong nhiều ngôn ngữ khác nhau.</li>
  <li>Kiểu luận lý (Boolean): <code>bool</code>, dùng để biểu diễn phán đoán "đúng" và "sai".</li>
</ul>
<p><strong>Các kiểu dữ liệu cơ bản được lưu trữ dưới dạng nhị phân trong máy tính.</strong> Một chữ số nhị phân là một bit. Trong hầu hết các hệ điều hành hiện đại, $1$ byte gồm $8$ bit.</p>
<p>Miền giá trị của các kiểu dữ liệu cơ bản phụ thuộc vào kích thước không gian mà chúng chiếm dụng. Dưới đây là ví dụ sử dụng ngôn ngữ Java.</p>
<ul>
  <li>Kiểu số nguyên <code>byte</code> chiếm $1$ byte = $8$ bit, và có thể biểu diễn $2^{8}$ con số.</li>
  <li>Kiểu số nguyên <code>int</code> chiếm $4$ byte = $32$ bit, và có thể biểu diễn $2^{32}$ con số.</li>
</ul>
<p>Bảng dưới đây liệt kê dung lượng chiếm dụng, miền giá trị và giá trị mặc định của các kiểu dữ liệu cơ bản trong Java. Bạn không cần phải ghi nhớ bảng này, chỉ cần hiểu sơ lược và tra cứu lại khi cần.</p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin:1em 0;">
  <thead>
    <tr style="border-bottom:1px solid #30363d;text-align:left;">
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Kiểu</th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Ký hiệu</th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Dung lượng</th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Giá trị nhỏ nhất</th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Giá trị lớn nhất</th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Giá trị mặc định</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;" rowspan="4">Số nguyên</td>
      <td style="padding:8px 12px;color:#e6edf3;"><code>byte</code></td>
      <td style="padding:8px 12px;color:#8b949e;">1 byte</td>
      <td style="padding:8px 12px;color:#e6edf3;">$-2^7$ ($-128$)</td>
      <td style="padding:8px 12px;color:#e6edf3;">$2^7 - 1$ ($127$)</td>
      <td style="padding:8px 12px;color:#e6edf3;">$0$</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;"><code>short</code></td>
      <td style="padding:8px 12px;color:#8b949e;">2 bytes</td>
      <td style="padding:8px 12px;color:#e6edf3;">$-2^{15}$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$2^{15} - 1$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$0$</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;"><code>int</code></td>
      <td style="padding:8px 12px;color:#8b949e;">4 bytes</td>
      <td style="padding:8px 12px;color:#e6edf3;">$-2^{31}$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$2^{31} - 1$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$0$</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;"><code>long</code></td>
      <td style="padding:8px 12px;color:#8b949e;">8 bytes</td>
      <td style="padding:8px 12px;color:#e6edf3;">$-2^{63}$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$2^{63} - 1$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$0$</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;" rowspan="2">Số thực</td>
      <td style="padding:8px 12px;color:#e6edf3;"><code>float</code></td>
      <td style="padding:8px 12px;color:#8b949e;">4 bytes</td>
      <td style="padding:8px 12px;color:#e6edf3;">$1.175 \\times 10^{-38}$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$3.403 \\times 10^{38}$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$0.0\\text{f}$</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;"><code>double</code></td>
      <td style="padding:8px 12px;color:#8b949e;">8 bytes</td>
      <td style="padding:8px 12px;color:#e6edf3;">$2.225 \\times 10^{-308}$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$1.798 \\times 10^{308}$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$0.0$</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;">Ký tự</td>
      <td style="padding:8px 12px;color:#e6edf3;"><code>char</code></td>
      <td style="padding:8px 12px;color:#8b949e;">2 bytes</td>
      <td style="padding:8px 12px;color:#e6edf3;">$0$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$2^{16} - 1$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$0$</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;color:#e6edf3;">Luận lý</td>
      <td style="padding:8px 12px;color:#e6edf3;"><code>bool</code></td>
      <td style="padding:8px 12px;color:#8b949e;">1 byte</td>
      <td style="padding:8px 12px;color:#e6edf3;">$\\text{false}$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$\\text{true}$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$\\text{false}$</td>
    </tr>
  </tbody>
</table>

<p>Xin lưu ý rằng bảng trên áp dụng riêng cho các kiểu dữ liệu cơ bản của Java. Mỗi ngôn ngữ lập trình có định nghĩa kiểu riêng, dung lượng chiếm dụng, miền giá trị và giá trị mặc định của chúng có thể khác nhau.</p>
<ul>
  <li>Trong Python, kiểu số nguyên <code>int</code> có thể có kích thước tùy ý, chỉ bị giới hạn bởi bộ nhớ khả dụng; kiểu số thực <code>float</code> là số dấu phẩy động 64-bit độ chính xác kép; không tồn tại kiểu <code>char</code>, một ký tự đơn thực chất là một chuỗi <code>str</code> có độ dài 1.</li>
  <li>C và C++ không quy định rõ ràng kích thước của các kiểu dữ liệu cơ bản, chúng thay đổi tùy theo cách triển khai và nền tảng. Bảng trên tuân theo <a href="https://en.cppreference.com/w/cpp/language/types#Properties" target="_blank" rel="noopener noreferrer">mô hình dữ liệu (data model)</a> LP64, được sử dụng trong các hệ điều hành Unix 64-bit bao gồm Linux và macOS.</li>
  <li>Kích thước của ký tự <code>char</code> là 1 byte trong C và C++, còn ở hầu hết các ngôn ngữ lập trình khác thì phụ thuộc vào phương thức mã hóa ký tự cụ thể, chi tiết xem tại phần "Mã hóa Ký tự".</li>
  <li>Mặc dù việc biểu diễn một giá trị luận lý chỉ cần 1 bit ($0$ hoặc $1$), nó thường được lưu trữ dưới dạng 1 byte trong bộ nhớ. Điều này là vì CPU của các máy tính hiện đại thường sử dụng 1 byte làm đơn vị bộ nhớ nhỏ nhất có thể định địa chỉ.</li>
</ul>

<h2>3.2.2 Mối quan hệ giữa Kiểu dữ liệu và Cấu trúc dữ liệu</h2>
<p>Vậy, mối quan hệ giữa kiểu dữ liệu cơ bản và cấu trúc dữ liệu là gì? Chúng ta đã biết rằng cấu trúc dữ liệu là những cách thức tổ chức và lưu trữ dữ liệu trong máy tính. Ở đây, trọng tâm nằm ở "cấu trúc" (structure), chứ không phải "dữ liệu" (data).</p>
<p>Nếu muốn biểu diễn "một dãy số", chúng ta tự nhiên nghĩ đến việc dùng mảng (array). Đó là vì cấu trúc tuyến tính của mảng có thể biểu diễn mối quan hệ liền kề và trật tự của các con số, nhưng nội dung được lưu trữ là số nguyên <code>int</code>, số thực <code>float</code>, hay ký tự <code>char</code> thì không liên quan gì đến "cấu trúc dữ liệu".</p>
<p>Nói cách khác, <strong>kiểu dữ liệu cơ bản cung cấp "loại nội dung" của dữ liệu, còn cấu trúc dữ liệu cung cấp "phương thức tổ chức" của dữ liệu</strong>. Ví dụ, trong đoạn mã dưới đây, chúng ta sử dụng cùng một cấu trúc dữ liệu (mảng) để lưu trữ và biểu diễn nhiều kiểu dữ liệu cơ bản khác nhau, bao gồm <code>int</code>, <code>float</code>, <code>char</code>, <code>bool</code>, v.v.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="csharp" onclick="switchCodeTab(event, 'csharp')">C#</button><button class="code-tab-btn" data-lang="go" onclick="switchCodeTab(event, 'go')">Go</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="typescript" onclick="switchCodeTab(event, 'typescript')">TypeScript</button><button class="code-tab-btn" data-lang="rust" onclick="switchCodeTab(event, 'rust')">Rust</button><button class="code-tab-btn" data-lang="c" onclick="switchCodeTab(event, 'c')">C</button><button class="code-tab-btn" data-lang="ruby" onclick="switchCodeTab(event, 'ruby')">Ruby</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>// Khởi tạo mảng bằng nhiều kiểu dữ liệu cơ bản khác nhau
int[] numbers = new int[5];
float[] decimals = new float[5];
char[] characters = new char[5];
boolean[] bools = new boolean[5];</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>// Khởi tạo mảng bằng nhiều kiểu dữ liệu cơ bản khác nhau
val numbers = IntArray(5)
val decinals = FloatArray(5)
val characters = CharArray(5)
val bools = BooleanArray(5)</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>// Khởi tạo mảng bằng nhiều kiểu dữ liệu cơ bản khác nhau
let numbers = Array(repeating: 0, count: 5)
let decimals = Array(repeating: 0.0, count: 5)
let characters: [Character] = Array(repeating: "a", count: 5)
let bools = Array(repeating: false, count: 5)</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>// Khởi tạo mảng bằng nhiều kiểu dữ liệu cơ bản khác nhau
List&lt;int&gt; numbers = List.filled(5, 0);
List&lt;double&gt; decimals = List.filled(5, 0.0);
List&lt;String&gt; characters = List.filled(5, 'a');
List&lt;bool&gt; bools = List.filled(5, false);</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code># Khởi tạo mảng bằng nhiều kiểu dữ liệu cơ bản khác nhau
numbers: list[int] = [0] * 5
decimals: list[float] = [0.0] * 5
# Trong Python, ký tự thực chất là chuỗi có độ dài 1
characters: list[str] = ['0'] * 5
bools: list[bool] = [False] * 5
# List trong Python có thể tự do lưu trữ nhiều kiểu dữ liệu cơ bản và tham chiếu đối tượng khác nhau
data = [0, 0.0, 'a', False, ListNode(0)]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>// Khởi tạo mảng bằng nhiều kiểu dữ liệu cơ bản khác nhau
int numbers[5];
float decimals[5];
char characters[5];
bool bools[5];</code></pre></div><div class="code-tab-content" data-lang="csharp"><pre data-lang="csharp"><code>// Khởi tạo mảng bằng nhiều kiểu dữ liệu cơ bản khác nhau
int[] numbers = new int[5];
float[] decimals = new float[5];
char[] characters = new char[5];
bool[] bools = new bool[5];</code></pre></div><div class="code-tab-content" data-lang="go"><pre data-lang="go"><code>// Khởi tạo mảng bằng nhiều kiểu dữ liệu cơ bản khác nhau
var numbers = [5]int{}
var decimals = [5]float64{}
var characters = [5]byte{}
var bools = [5]bool{}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>// Mảng trong JavaScript có thể tự do lưu trữ nhiều kiểu dữ liệu cơ bản và đối tượng khác nhau
const array = [0, 0.0, 'a', false];</code></pre></div><div class="code-tab-content" data-lang="typescript"><pre data-lang="typescript"><code>// Khởi tạo mảng bằng nhiều kiểu dữ liệu cơ bản khác nhau
const numbers: number[] = [];
const characters: string[] = [];
const bools: boolean[] = [];</code></pre></div><div class="code-tab-content" data-lang="rust"><pre data-lang="rust"><code>// Khởi tạo mảng bằng nhiều kiểu dữ liệu cơ bản khác nhau
let numbers: Vec&lt;i32&gt; = vec![0; 5];
let decimals: Vec&lt;f32&gt; = vec![0.0; 5];
let characters: Vec&lt;char&gt; = vec!['0'; 5];
let bools: Vec&lt;bool&gt; = vec![false; 5];</code></pre></div><div class="code-tab-content" data-lang="c"><pre data-lang="c"><code>// Khởi tạo mảng bằng nhiều kiểu dữ liệu cơ bản khác nhau
int numbers[10];
float decimals[10];
char characters[10];
bool bools[10];</code></pre></div></div></div>
`,
    originalContent: `
# Basic Data Types

When we talk about data stored in computers, we think of various forms such as text, images, videos, audio, 3D models, and more. Although these kinds of data are organized in different ways, they are all composed of various basic data types.

**Basic data types are types that the CPU can directly operate on**, and they are directly used in algorithms, mainly including the following.

- Integer types \`byte\`, \`short\`, \`int\`, \`long\`.
- Floating-point types \`float\`, \`double\`, used to represent decimal numbers.
- Character type \`char\`, used to represent letters, punctuation marks, and even emojis in various languages.
- Boolean type \`bool\`, used to represent "yes" and "no" judgments.

**Basic data types are stored in binary form in computers**. A binary digit is one bit. In most modern operating systems, $1$ byte consists of $8$ bits.

The range of values for basic data types depends on the size of the space they occupy. Below is an example using Java.

- Integer type \`byte\` occupies $1$ byte = $8$ bits, and can represent $2^{8}$ numbers.
- Integer type \`int\` occupies $4$ bytes = $32$ bits, and can represent $2^{32}$ numbers.

The following table lists the space occupied, value ranges, and default values of various basic data types in Java. You don't need to memorize this table; a general understanding is sufficient, and you can refer to it when needed.

<p align="center"> Table <id> &nbsp; Space occupied and value ranges of basic data types </p>

| Type       | Symbol   | Space Occupied | Minimum Value            | Maximum Value           | Default Value  |
| ---------- | -------- | -------------- | ------------------------ | ------------------------ | -------------- |
| Integer    | \`byte\`   | 1 byte         | $-2^7$ ($-128$)          | $2^7 - 1$ ($127$)       | $0$            |
|            | \`short\`  | 2 bytes        | $-2^{15}$                | $2^{15} - 1$            | $0$            |
|            | \`int\`    | 4 bytes        | $-2^{31}$                | $2^{31} - 1$            | $0$            |
|            | \`long\`   | 8 bytes        | $-2^{63}$                | $2^{63} - 1$            | $0$            |
| Float      | \`float\`  | 4 bytes        | $1.175 \\times 10^{-38}$  | $3.403 \\times 10^{38}$  | $0.0\\text{f}$  |
|            | \`double\` | 8 bytes        | $2.225 \\times 10^{-308}$ | $1.798 \\times 10^{308}$ | $0.0$          |
| Character  | \`char\`   | 2 bytes        | $0$                      | $2^{16} - 1$            | $0$            |
| Boolean    | \`bool\`   | 1 byte         | $\\text{false}$           | $\\text{true}$           | $\\text{false}$ |

Please note that the table above applies specifically to Java's basic data types. Each programming language has its own type definitions, and their space usage, value ranges, and default values may vary.

- In Python, the integer type \`int\` can be of any size, limited only by available memory; the floating-point type \`float\` is double-precision 64-bit; there is no \`char\` type, a single character is actually a string \`str\` of length 1.
- C and C++ do not explicitly specify the size of basic data types, which varies by implementation and platform. The above table follows the LP64 [data model](https://en.cppreference.com/w/cpp/language/types#Properties), which is used in Unix 64-bit operating systems including Linux and macOS.
- The size of character \`char\` is 1 byte in C and C++, and in most programming languages it depends on the specific character encoding method, as detailed in the "Character Encoding" section.
- Even though representing a boolean value requires only 1 bit ($0$ or $1$), it is usually stored as 1 byte in memory. This is because modern computer CPUs typically use 1 byte as the minimum addressable memory unit.

So, what is the relationship between basic data types and data structures? We know that data structures are ways of organizing and storing data in computers. Here, the emphasis is on the "structure", not the "data".

If we want to represent "a row of numbers", we naturally think of using an array. This is because the linear structure of an array can represent the adjacency and order relationships of numbers, but whether the stored content is integer \`int\`, floating-point \`float\`, or character \`char\` is unrelated to the "data structure".

In other words, **basic data types provide the "content type" of data, while data structures provide the "organization method" of data**. For example, in the following code, we use the same data structure (array) to store and represent different basic data types, including \`int\`, \`float\`, \`char\`, \`bool\`, etc.

=== "Python"

    \`\`\`python title=""
    # Initialize arrays using various basic data types
    numbers: list[int] = [0] * 5
    decimals: list[float] = [0.0] * 5
    # In Python, characters are actually strings of length 1
    characters: list[str] = ['0'] * 5
    bools: list[bool] = [False] * 5
    # Python lists can freely store various basic data types and object references
    data = [0, 0.0, 'a', False, ListNode(0)]
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    // Initialize arrays using various basic data types
    int numbers[5];
    float decimals[5];
    char characters[5];
    bool bools[5];
    \`\`\`

=== "Java"

    \`\`\`java title=""
    // Initialize arrays using various basic data types
    int[] numbers = new int[5];
    float[] decimals = new float[5];
    char[] characters = new char[5];
    boolean[] bools = new boolean[5];
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    // Initialize arrays using various basic data types
    int[] numbers = new int[5];
    float[] decimals = new float[5];
    char[] characters = new char[5];
    bool[] bools = new bool[5];
    \`\`\`

=== "Go"

    \`\`\`go title=""
    // Initialize arrays using various basic data types
    var numbers = [5]int{}
    var decimals = [5]float64{}
    var characters = [5]byte{}
    var bools = [5]bool{}
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    // Initialize arrays using various basic data types
    let numbers = Array(repeating: 0, count: 5)
    let decimals = Array(repeating: 0.0, count: 5)
    let characters: [Character] = Array(repeating: "a", count: 5)
    let bools = Array(repeating: false, count: 5)
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    // JavaScript arrays can freely store various basic data types and objects
    const array = [0, 0.0, 'a', false];
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    // Initialize arrays using various basic data types
    const numbers: number[] = [];
    const characters: string[] = [];
    const bools: boolean[] = [];
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    // Initialize arrays using various basic data types
    List<int> numbers = List.filled(5, 0);
    List<double> decimals = List.filled(5, 0.0);
    List<String> characters = List.filled(5, 'a');
    List<bool> bools = List.filled(5, false);
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    // Initialize arrays using various basic data types
    let numbers: Vec<i32> = vec![0; 5];
    let decimals: Vec<f32> = vec![0.0; 5];
    let characters: Vec<char> = vec!['0'; 5];
    let bools: Vec<bool> = vec![false; 5];
    \`\`\`

=== "C"

    \`\`\`c title=""
    // Initialize arrays using various basic data types
    int numbers[10];
    float decimals[10];
    char characters[10];
    bool bools[10];
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    // Initialize arrays using various basic data types
    val numbers = IntArray(5)
    val decinals = FloatArray(5)
    val characters = CharArray(5)
    val bools = BooleanArray(5)
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    # Ruby lists can freely store various basic data types and object references
    data = [0, 0.0, 'a', false, ListNode(0)]
    \`\`\`

??? pythontutor "Visualized Execution"

    https://pythontutor.com/render.html#code=class%20ListNode%3A%0A%20%20%20%20%22%22%22%E9%93%BE%E8%A1%A8%E8%8A%82%E7%82%B9%E7%B1%BB%22%22%22%0A%20%20%20%20def%20__init__%28self,%20val%3A%20int%29%3A%0A%20%20%20%20%20%20%20%20self.val%3A%20int%20%3D%20val%20%20%23%20%E8%8A%82%E7%82%B9%E5%80%BC%0A%20%20%20%20%20%20%20%20self.next%3A%20ListNode%20%7C%20None%20%3D%20None%20%20%23%20%E5%90%8E%E7%BB%A7%E8%8A%82%E7%82%B9%E5%BC%95%E7%94%A8%0A%0A%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E4%BD%BF%E7%94%A8%E5%A4%9A%E7%A7%8D%E5%9F%BA%E6%9C%AC%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E6%9D%A5%E5%88%9D%E5%A7%8B%E5%8C%96%E6%95%B0%E7%BB%84%0A%20%20%20%20numbers%20%3D%20%5B0%5D%20*%205%0A%20%20%20%20decimals%20%3D%20%5B0.0%5D%20*%205%0A%20%20%20%20%23%20Python%20%E7%9A%84%E5%AD%97%E7%AC%A6%E5%AE%9E%E9%99%85%E4%B8%8A%E6%98%AF%E9%95%BF%E5%BA%A6%E4%B8%BA%201%20%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2%0A%20%20%20%20characters%20%3D%20%5B'0'%5D%20*%205%0A%20%20%20%20bools%20%3D%20%5BFalse%5D%20*%205%0A%20%20%20%20%23%20Python%20%E7%9A%84%E5%88%97%E8%A1%A8%E5%8F%AF%E4%BB%A5%E8%87%AA%E7%94%B1%E5%AD%98%E5%82%A8%E5%90%84%E7%A7%8D%E5%9F%BA%E6%9C%AC%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E5%92%8C%E5%AF%B9%E8%B1%A1%E5%BC%95%E7%94%A8%0A%20%20%20%20data%20%3D%20%5B0,%200.0,%20'a',%20False,%20ListNode%280%29%5D&cumulative=false&curInstr=12&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false
`
  },
  'dsa-number-encoding': {
    title: '3.3 Number Encoding * (Mã hóa Số)',
    summary: 'Tìm hiểu Dấu-Độ lớn, Bù 1, Bù 2 và lý do máy tính lưu trữ số nguyên bằng Bù 2, cùng cách mã hóa số thực dấu phẩy động theo chuẩn IEEE 754.',
    tags: ['dsa', 'structures'],
    domain: 'Algorithms',
    module: 'Chương 3: Cấu trúc dữ liệu cơ bản',
    prerequisites: ['dsa-basic-types'],
    related: ['dsa-character-encoding'],
    updatedAt: '2026-07-18',
    readTime: '10 phút',
    content: `
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Trong cuốn sách này, các chương được đánh dấu bằng dấu hoa thị * là phần đọc thêm (tùy chọn). Nếu bạn eo hẹp thời gian hoặc cảm thấy khó, bạn có thể bỏ qua chúng trước và quay lại sau khi đã hoàn thành các chương thiết yếu.</p>
  </div>
</div>

<h2>3.3.1 Biểu diễn Dấu-Độ lớn, Bù 1 và Bù 2</h2>
<p>Trong bảng ở mục trước, chúng ta nhận thấy tất cả các kiểu số nguyên đều có thể biểu diễn nhiều hơn một số âm so với số dương. Ví dụ, miền giá trị của <code>byte</code> là $[-128, 127]$. Hiện tượng này khá phản trực giác, và nguyên nhân sâu xa nằm ở các cách biểu diễn dấu-độ lớn (sign-magnitude), bù 1 (1's complement) và bù 2 (2's complement).</p>
<p>Trước tiên, cần lưu ý rằng <strong>các con số được lưu trữ trong máy tính dưới dạng "bù 2" (2's complement)</strong>. Trước khi phân tích lý do, hãy cùng định nghĩa ba khái niệm này.</p>
<ul>
  <li><strong>Dấu-Độ lớn (Sign-magnitude)</strong>: Ta coi bit cao nhất của biểu diễn nhị phân của một số là bit dấu, trong đó $0$ đại diện cho số dương và $1$ đại diện cho số âm, các bit còn lại biểu diễn giá trị tuyệt đối của số đó.</li>
  <li><strong>Bù 1 (1's complement)</strong>: Bù 1 của một số dương giống hệt như dạng dấu-độ lớn của nó. Đối với số âm, bù 1 thu được bằng cách đảo ngược tất cả các bit trừ bit dấu của dạng dấu-độ lớn tương ứng.</li>
  <li><strong>Bù 2 (2's complement)</strong>: Bù 2 của một số dương giống hệt như dạng dấu-độ lớn của nó. Đối với số âm, bù 2 thu được bằng cách lấy bù 1 rồi cộng thêm $1$.</li>
</ul>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/1s_2s_complement.png" alt="Chuyển đổi giữa dấu-độ lớn, bù 1 và bù 2" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p><u>Dấu-độ lớn</u>, tuy trực quan nhất, nhưng lại có một số hạn chế. Một mặt, <strong>dạng dấu-độ lớn của số âm không thể sử dụng trực tiếp trong các phép toán</strong>. Ví dụ, tính $1 + (-2)$ theo dạng dấu-độ lớn cho ra kết quả $-3$, rõ ràng là sai.</p>

$$
\\begin{aligned}
& 1 + (-2) \\newline
& \\rightarrow 0000 \\; 0001 + 1000 \\; 0010 \\newline
& = 1000 \\; 0011 \\newline
& \\rightarrow -3
\\end{aligned}
$$

<p>Để giải quyết vấn đề này, máy tính đã giới thiệu <u>bù 1</u>. Nếu ta chuyển dạng dấu-độ lớn sang bù 1 trước rồi tính $1 + (-2)$ theo bù 1, sau đó chuyển kết quả ngược lại về dạng dấu-độ lớn, ta sẽ thu được kết quả chính xác là $-1$.</p>

$$
\\begin{aligned}
& 1 + (-2) \\newline
& \\rightarrow 0000 \\; 0001 \\; \\text{(Dấu-độ lớn)} + 1000 \\; 0010 \\; \\text{(Dấu-độ lớn)} \\newline
& = 0000 \\; 0001 \\; \\text{(Bù 1)} + 1111  \\; 1101 \\; \\text{(Bù 1)} \\newline
& = 1111 \\; 1110 \\; \\text{(Bù 1)} \\newline
& = 1000 \\; 0001 \\; \\text{(Dấu-độ lớn)} \\newline
& \\rightarrow -1
\\end{aligned}
$$

<p>Mặt khác, <strong>dạng dấu-độ lớn của số không có hai cách biểu diễn, $+0$ và $-0$</strong>. Điều này có nghĩa là số không tương ứng với hai mã nhị phân khác nhau, có thể gây ra sự mơ hồ. Ví dụ, trong các phép so sánh điều kiện, nếu chúng ta không phân biệt số không dương và số không âm, nó có thể dẫn đến kết quả phán đoán sai. Nếu muốn xử lý sự mơ hồ giữa số không dương và âm, chúng ta cần thêm các phép toán kiểm tra bổ sung, điều này có thể làm giảm hiệu suất tính toán của máy tính.</p>

$$
\\begin{aligned}
+0 & \\rightarrow 0000 \\; 0000 \\newline
-0 & \\rightarrow 1000 \\; 0000
\\end{aligned}
$$

<p>Giống như dấu-độ lớn, bù 1 cũng gặp vấn đề mơ hồ giữa số không dương và âm. Do đó, máy tính tiếp tục giới thiệu <u>bù 2</u>. Hãy cùng quan sát quá trình chuyển đổi số không âm từ dấu-độ lớn sang bù 1 rồi sang bù 2:</p>

$$
\\begin{aligned}
-0 \\rightarrow \\; & 1000 \\; 0000 \\; \\text{(Dấu-độ lớn)} \\newline
= \\; & 1111 \\; 1111 \\; \\text{(Bù 1)} \\newline
= 1 \\; & 0000 \\; 0000 \\; \\text{(Bù 2)} \\newline
\\end{aligned}
$$

<p>Việc cộng thêm $1$ vào bù 1 của số không âm tạo ra một số nhớ (carry), nhưng vì kiểu <code>byte</code> chỉ dài 8 bit, số $1$ tràn ra bit thứ 9 sẽ bị loại bỏ. Nói cách khác, <strong>bù 2 của số không âm là $0000 \\; 0000$, giống hệt với bù 2 của số không dương</strong>. Điều này có nghĩa là trong biểu diễn bù 2, chỉ tồn tại duy nhất một số không, và sự mơ hồ giữa số không dương và âm được giải quyết triệt để.</p>

<p>Còn một câu hỏi cuối cùng: miền giá trị của kiểu <code>byte</code> là $[-128, 127]$, vậy số âm dư ra $-128$ đến từ đâu? Ta để ý rằng mọi số nguyên trong khoảng $[-127, +127]$ đều có dạng dấu-độ lớn, bù 1 và bù 2 tương ứng, và dấu-độ lớn với bù 2 có thể chuyển đổi qua lại lẫn nhau.</p>

<p>Tuy nhiên, <strong>bù 2 $1000 \\; 0000$ là một trường hợp ngoại lệ, nó không có dạng dấu-độ lớn tương ứng</strong>. Theo phương pháp chuyển đổi, ta thu được dạng dấu-độ lớn của bù 2 này là $0000 \\; 0000$. Điều này rõ ràng mâu thuẫn vì dạng dấu-độ lớn này đại diện cho số $0$, và bù 2 của nó lẽ ra phải là chính nó. Máy tính quy ước rằng bù 2 đặc biệt $1000 \\; 0000$ này đại diện cho $-128$. Thực tế, kết quả của phép tính $(-1) + (-127)$ theo bù 2 chính là $-128$.</p>

$$
\\begin{aligned}
& (-127) + (-1) \\newline
& \\rightarrow 1111 \\; 1111 \\; \\text{(Dấu-độ lớn)} + 1000 \\; 0001 \\; \\text{(Dấu-độ lớn)} \\newline
& = 1000 \\; 0000 \\; \\text{(Bù 1)} + 1111  \\; 1110 \\; \\text{(Bù 1)} \\newline
& = 1000 \\; 0001 \\; \\text{(Bù 2)} + 1111  \\; 1111 \\; \\text{(Bù 2)} \\newline
& = 1000 \\; 0000 \\; \\text{(Bù 2)} \\newline
& \\rightarrow -128
\\end{aligned}
$$

<p>Bạn có thể nhận thấy rằng tất cả các phép tính ở trên đều là phép cộng. Điều này gợi ý một sự thật quan trọng: <strong>các mạch phần cứng bên trong máy tính chủ yếu được thiết kế dựa trên phép cộng</strong>. Đó là vì phép cộng dễ triển khai trên phần cứng hơn so với các phép toán khác (như nhân, chia, trừ), dễ song song hóa hơn, và có tốc độ tính toán nhanh hơn.</p>

<p>Xin lưu ý, điều này không có nghĩa là máy tính chỉ có thể thực hiện phép cộng. <strong>Bằng cách kết hợp phép cộng với một số phép toán logic cơ bản, máy tính có thể triển khai nhiều phép toán khác</strong>. Ví dụ, tính phép trừ $a - b$ có thể được chuyển thành tính phép cộng $a + (-b)$; tính phép nhân và chia có thể được chuyển thành tính nhiều phép cộng hoặc trừ liên tiếp.</p>

<p>Giờ đây chúng ta có thể tóm tắt lý do tại sao máy tính sử dụng bù 2: với biểu diễn bù 2, máy tính có thể sử dụng cùng một mạch điện và phép toán để xử lý phép cộng của cả số dương lẫn số âm, mà không cần thiết kế mạch phần cứng đặc biệt cho phép trừ hay xử lý riêng sự mơ hồ giữa số không dương và âm. Điều này đơn giản hóa đáng kể việc thiết kế phần cứng và cải thiện hiệu suất.</p>

<p>Thiết kế của bù 2 rất tinh vi và khéo léo. Do giới hạn về độ dài, chúng ta sẽ dừng lại ở đây. Bạn đọc quan tâm được khuyến khích tìm hiểu sâu hơn.</p>

<h2>3.3.2 Mã hóa Số thực Dấu phẩy động</h2>
<p>Bạn đọc tinh ý có thể đã nhận ra: <code>int</code> và <code>float</code> có cùng độ dài, đều là 4 byte, nhưng tại sao <code>float</code> lại có miền giá trị lớn hơn <code>int</code> rất nhiều? Điều này khá phản trực giác vì lẽ ra <code>float</code> cần biểu diễn số thập phân, nên miền giá trị phải nhỏ hơn mới đúng.</p>
<p>Thực tế, <strong>đây là vì số thực dấu phẩy động <code>float</code> sử dụng một phương thức biểu diễn khác</strong>. Hãy ký hiệu một số nhị phân 32-bit là:</p>

$$
b_{31} b_{30} b_{29} \\ldots b_2 b_1 b_0
$$

<p>Theo chuẩn IEEE 754, một <code>float</code> 32-bit gồm ba phần sau.</p>
<ul>
  <li>Bit dấu $\\mathrm{S}$: chiếm 1 bit, tương ứng với $b_{31}$.</li>
  <li>Bit số mũ $\\mathrm{E}$: chiếm 8 bit, tương ứng với $b_{30} b_{29} \\ldots b_{23}$.</li>
  <li>Bit phần định trị $\\mathrm{N}$: chiếm 23 bit, tương ứng với $b_{22} b_{21} \\ldots b_0$.</li>
</ul>
<p>Phương pháp tính giá trị tương ứng của <code>float</code> nhị phân là:</p>

$$
\\text {val} = (-1)^{b_{31}} \\times 2^{\\left(b_{30} b_{29} \\ldots b_{23}\\right)_2-127} \\times\\left(1 . b_{22} b_{21} \\ldots b_0\\right)_2
$$

<p>Chuyển sang thập phân, công thức tính là:</p>

$$
\\text {val}=(-1)^{\\mathrm{S}} \\times 2^{\\mathrm{E} -127} \\times (1 + \\mathrm{N})
$$

<p>Miền giá trị của từng thành phần là:</p>

$$
\\begin{aligned}
\\mathrm{S} \\in & \\{ 0, 1\\}, \\quad \\mathrm{E} \\in \\{ 1, 2, \\dots, 254 \\} \\newline
(1 + \\mathrm{N}) = & (1 + \\sum_{i=1}^{23} b_{23-i} 2^{-i}) \\subset [1, 2 - 2^{-23}]
\\end{aligned}
$$

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/ieee_754_float.png" alt="Ví dụ tính toán float theo chuẩn IEEE 754" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Quan sát hình trên, với dữ liệu ví dụ $\\mathrm{S} = 0$, $\\mathrm{E} = 124$, $\\mathrm{N} = 2^{-2} + 2^{-3} = 0.375$, ta có:</p>

$$
\\text { val } = (-1)^0 \\times 2^{124 - 127} \\times (1 + 0.375) = 0.171875
$$

<p>Giờ đây chúng ta có thể trả lời câu hỏi ban đầu: <strong>biểu diễn của <code>float</code> bao gồm bit số mũ, dẫn đến miền giá trị lớn hơn <code>int</code> rất nhiều</strong>. Theo phép tính trên, số dương lớn nhất mà <code>float</code> có thể biểu diễn là $2^{254 - 127} \\times (2 - 2^{-23}) \\approx 3.4 \\times 10^{38}$, và số âm nhỏ nhất có thể thu được bằng cách đảo bit dấu.</p>

<p><strong>Mặc dù số thực dấu phẩy động <code>float</code> mở rộng miền giá trị, tác dụng phụ của nó là hy sinh độ chính xác</strong>. Kiểu số nguyên <code>int</code> sử dụng toàn bộ 32 bit để biểu diễn số, và các con số được phân bố đều nhau; tuy nhiên, do sự tồn tại của bit số mũ, giá trị của số thực <code>float</code> càng lớn thì khoảng cách giữa hai số liền kề có xu hướng càng lớn.</p>

<p>Như bảng dưới đây, bit số mũ $\\mathrm{E} = 0$ và $\\mathrm{E} = 255$ có ý nghĩa đặc biệt, <strong>được dùng để biểu diễn số không, vô cực, $\\mathrm{NaN}$, v.v.</strong></p>

<table style="width:100%;border-collapse:collapse;font-size:14px;margin:1em 0;">
  <thead>
    <tr style="border-bottom:1px solid #30363d;text-align:left;">
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Bit số mũ E</th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Bit phần định trị N = 0</th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Bit phần định trị N ≠ 0</th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Công thức tính</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;">$0$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$\\pm 0$</td>
      <td style="padding:8px 12px;color:#e6edf3;">Số không chuẩn hóa (Subnormal Number)</td>
      <td style="padding:8px 12px;color:#e6edf3;">$(-1)^{\\mathrm{S}} \\times 2^{-126} \\times (0.\\mathrm{N})$</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;">$1, 2, \\dots, 254$</td>
      <td style="padding:8px 12px;color:#e6edf3;">Số chuẩn hóa (Normal Number)</td>
      <td style="padding:8px 12px;color:#e6edf3;">Số chuẩn hóa (Normal Number)</td>
      <td style="padding:8px 12px;color:#e6edf3;">$(-1)^{\\mathrm{S}} \\times 2^{(\\mathrm{E} -127)} \\times (1.\\mathrm{N})$</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;color:#e6edf3;">$255$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$\\pm \\infty$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$\\mathrm{NaN}$</td>
      <td style="padding:8px 12px;color:#e6edf3;"></td>
    </tr>
  </tbody>
</table>

<p>Đáng chú ý là các số không chuẩn hóa (subnormal number) cải thiện đáng kể độ chính xác của số thực dấu phẩy động. Số dương chuẩn hóa nhỏ nhất là $2^{-126}$, và số dương không chuẩn hóa nhỏ nhất là $2^{-126} \\times 2^{-23}$.</p>

<p>Kiểu số thực độ chính xác kép <code>double</code> cũng sử dụng phương thức biểu diễn tương tự <code>float</code>, sẽ không được trình bày chi tiết ở đây.</p>
`,
    originalContent: `
# Number Encoding *

!!! tip

    In this book, chapters marked with an asterisk * are optional readings. If you are short on time or find them challenging, you may skip these initially and return to them after completing the essential chapters.

## Sign-Magnitude, 1's Complement, and 2's Complement

In the table from the previous section, we found that all integer types can represent one more negative number than positive numbers. For example, the \`byte\` range is $[-128, 127]$. This phenomenon is counterintuitive, and its underlying cause lies in sign-magnitude, 1's complement, and 2's complement representations.

First, it should be noted that **numbers are stored in computers in the form of "2's complement"**. Before analyzing the reasons for this, let's first define these three concepts.

- **Sign-magnitude**: We treat the highest bit of the binary representation of a number as the sign bit, where $0$ represents a positive number and $1$ represents a negative number, and the remaining bits represent the value of the number.
- **1's complement**: The 1's complement of a positive number is the same as its sign-magnitude. For a negative number, the 1's complement is obtained by inverting all bits except the sign bit of its sign-magnitude.
- **2's complement**: The 2's complement of a positive number is the same as its sign-magnitude. For a negative number, the 2's complement is obtained by adding $1$ to its 1's complement.

The figure below shows the conversion methods among sign-magnitude, 1's complement, and 2's complement.

![Conversions among sign-magnitude, 1's complement, and 2's complement](number_encoding.assets/1s_2s_complement.png)

<u>Sign-magnitude</u>, although the most intuitive, has some limitations. On one hand, **the sign-magnitude of negative numbers cannot be directly used in operations**. For example, calculating $1 + (-2)$ in sign-magnitude yields $-3$, which is clearly incorrect.

$$
\\begin{aligned}
& 1 + (-2) \\newline
& \\rightarrow 0000 \\; 0001 + 1000 \\; 0010 \\newline
& = 1000 \\; 0011 \\newline
& \\rightarrow -3
\\end{aligned}
$$

To solve this problem, computers introduced <u>1's complement</u>. If we first convert sign-magnitude to 1's complement and calculate $1 + (-2)$ in 1's complement, then convert the result back to sign-magnitude, we can obtain the correct result of $-1$.

$$
\\begin{aligned}
& 1 + (-2) \\newline
& \\rightarrow 0000 \\; 0001 \\; \\text{(Sign-magnitude)} + 1000 \\; 0010 \\; \\text{(Sign-magnitude)} \\newline
& = 0000 \\; 0001 \\; \\text{(1's complement)} + 1111  \\; 1101 \\; \\text{(1's complement)} \\newline
& = 1111 \\; 1110 \\; \\text{(1's complement)} \\newline
& = 1000 \\; 0001 \\; \\text{(Sign-magnitude)} \\newline
& \\rightarrow -1
\\end{aligned}
$$

On the other hand, **the sign-magnitude of the number zero has two representations, $+0$ and $-0$**. This means that the number zero corresponds to two different binary encodings, which may cause ambiguity. For example, in conditional judgments, if we don't distinguish between positive zero and negative zero, it may lead to incorrect judgment results. If we want to handle the ambiguity of positive and negative zero, we need to introduce additional judgment operations, which may reduce the computational efficiency of the computer.

$$
\\begin{aligned}
+0 & \\rightarrow 0000 \\; 0000 \\newline
-0 & \\rightarrow 1000 \\; 0000
\\end{aligned}
$$

Like sign-magnitude, 1's complement also has the problem of positive and negative zero ambiguity. Therefore, computers further introduced <u>2's complement</u>. Let's first observe the conversion process of negative zero from sign-magnitude to 1's complement to 2's complement:

$$
\\begin{aligned}
-0 \\rightarrow \\; & 1000 \\; 0000 \\; \\text{(Sign-magnitude)} \\newline
= \\; & 1111 \\; 1111 \\; \\text{(1's complement)} \\newline
= 1 \\; & 0000 \\; 0000 \\; \\text{(2's complement)} \\newline
\\end{aligned}
$$

Adding $1$ to the 1's complement of negative zero produces a carry, but since the \`byte\` type has a length of only 8 bits, the $1$ that overflows to the 9th bit is discarded. That is to say, **the 2's complement of negative zero is $0000 \\; 0000$, which is the same as the 2's complement of positive zero**. This means that in 2's complement representation, there is only one zero, and the positive and negative zero ambiguity is thus resolved.

One last question remains: the range of the \`byte\` type is $[-128, 127]$, so where does the extra negative number $-128$ come from? We notice that all integers in the interval $[-127, +127]$ have corresponding sign-magnitude, 1's complement, and 2's complement, and sign-magnitude and 2's complement can be converted to each other.

However, **the 2's complement $1000 \\; 0000$ is an exception, and it does not have a corresponding sign-magnitude**. According to the conversion method, we get that the sign-magnitude of this 2's complement is $0000 \\; 0000$. This is clearly contradictory because this sign-magnitude represents the number $0$, and its 2's complement should be itself. The computer specifies that this special 2's complement $1000 \\; 0000$ represents $-128$. In fact, the result of calculating $(-1) + (-127)$ in 2's complement is $-128$.

$$
\\begin{aligned}
& (-127) + (-1) \\newline
& \\rightarrow 1111 \\; 1111 \\; \\text{(Sign-magnitude)} + 1000 \\; 0001 \\; \\text{(Sign-magnitude)} \\newline
& = 1000 \\; 0000 \\; \\text{(1's complement)} + 1111  \\; 1110 \\; \\text{(1's complement)} \\newline
& = 1000 \\; 0001 \\; \\text{(2's complement)} + 1111  \\; 1111 \\; \\text{(2's complement)} \\newline
& = 1000 \\; 0000 \\; \\text{(2's complement)} \\newline
& \\rightarrow -128
\\end{aligned}
$$

You may have noticed that all the above calculations are addition operations. This hints at an important fact: **the hardware circuits inside computers are mainly designed based on addition operations**. This is because addition operations are simpler to implement in hardware compared to other operations (such as multiplication, division, and subtraction), easier to parallelize, and have faster operation speeds.

Please note that this does not mean that computers can only perform addition. **By combining addition with some basic logical operations, computers can implement various other mathematical operations**. For example, calculating the subtraction $a - b$ can be converted to calculating the addition $a + (-b)$; calculating multiplication and division can be converted to calculating multiple additions or subtractions.

We can now summarize why computers use 2's complement: with 2's complement representation, computers can use the same circuits and operations to handle the addition of positive and negative numbers, without designing special hardware circuits for subtraction or separately handling the ambiguity of positive and negative zero. This greatly simplifies hardware design and improves efficiency.

The design of 2's complement is very ingenious. Due to space limitations, we will stop here. Interested readers are encouraged to explore further.

## Floating-Point Number Encoding

Careful readers may have noticed: \`int\` and \`float\` have the same length, both are 4 bytes, but why does \`float\` have a much larger range than \`int\`? This is very counterintuitive because it stands to reason that \`float\` needs to represent decimals, so the range should be smaller.

In fact, **this is because floating-point number \`float\` uses a different representation method**. Let's denote a 32-bit binary number as:

$$
b_{31} b_{30} b_{29} \\ldots b_2 b_1 b_0
$$

According to the IEEE 754 standard, a 32-bit \`float\` consists of the following three parts.

- Sign bit $\\mathrm{S}$: occupies 1 bit, corresponding to $b_{31}$.
- Exponent bit $\\mathrm{E}$: occupies 8 bits, corresponding to $b_{30} b_{29} \\ldots b_{23}$.
- Fraction bit $\\mathrm{N}$: occupies 23 bits, corresponding to $b_{22} b_{21} \\ldots b_0$.

The calculation method for the value corresponding to the binary \`float\` is:

$$
\\text {val} = (-1)^{b_{31}} \\times 2^{\\left(b_{30} b_{29} \\ldots b_{23}\\right)_2-127} \\times\\left(1 . b_{22} b_{21} \\ldots b_0\\right)_2
$$

Converted to decimal, the calculation formula is:

$$
\\text {val}=(-1)^{\\mathrm{S}} \\times 2^{\\mathrm{E} -127} \\times (1 + \\mathrm{N})
$$

The range of each component is:

$$
\\begin{aligned}
\\mathrm{S} \\in & \\{ 0, 1\\}, \\quad \\mathrm{E} \\in \\{ 1, 2, \\dots, 254 \\} \\newline
(1 + \\mathrm{N}) = & (1 + \\sum_{i=1}^{23} b_{23-i} 2^{-i}) \\subset [1, 2 - 2^{-23}]
\\end{aligned}
$$

![Calculation example of float under IEEE 754 standard](number_encoding.assets/ieee_754_float.png)

Observing the figure above, given example data $\\mathrm{S} = 0$, $\\mathrm{E} = 124$, $\\mathrm{N} = 2^{-2} + 2^{-3} = 0.375$, we have:

$$
\\text { val } = (-1)^0 \\times 2^{124 - 127} \\times (1 + 0.375) = 0.171875
$$

Now we can answer the initial question: **the representation of \`float\` includes an exponent bit, resulting in a range far greater than \`int\`**. According to the above calculation, the maximum positive number that \`float\` can represent is $2^{254 - 127} \\times (2 - 2^{-23}) \\approx 3.4 \\times 10^{38}$, and the minimum negative number can be obtained by switching the sign bit.

**Although floating-point number \`float\` expands the range, its side effect is sacrificing precision**. The integer type \`int\` uses all 32 bits to represent numbers, and the numbers are evenly distributed; however, due to the existence of the exponent bit, the larger the value of floating-point number \`float\`, the larger the difference between two adjacent numbers tends to be.

As shown in the table below, exponent bits $\\mathrm{E} = 0$ and $\\mathrm{E} = 255$ have special meanings, **used to represent zero, infinity, $\\mathrm{NaN}$, etc.**

<p align="center"> Table <id> &nbsp; Meaning of exponent bits </p>

| Exponent Bit E     | Fraction Bit $\\mathrm{N} = 0$ | Fraction Bit $\\mathrm{N} \\ne 0$ | Calculation Formula                                                    |
| ------------------ | ----------------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| $0$                | $\\pm 0$                       | Subnormal Number                | $(-1)^{\\mathrm{S}} \\times 2^{-126} \\times (0.\\mathrm{N})$              |
| $1, 2, \\dots, 254$ | Normal Number                 | Normal Number                   | $(-1)^{\\mathrm{S}} \\times 2^{(\\mathrm{E} -127)} \\times (1.\\mathrm{N})$ |
| $255$              | $\\pm \\infty$                  | $\\mathrm{NaN}$                  |                                                                        |

It is worth noting that subnormal numbers significantly improve the precision of floating-point numbers. The smallest positive normal number is $2^{-126}$, and the smallest positive subnormal number is $2^{-126} \\times 2^{-23}$.

Double-precision \`double\` also uses a representation method similar to \`float\`, which will not be elaborated here.
`
  },
  'dsa-character-encoding': {
    title: '3.4 Character Encoding * (Mã hóa Ký tự)',
    summary: 'Tìm hiểu các chuẩn mã hóa ký tự từ ASCII, GBK đến chuẩn mã hóa toàn cầu Unicode với các định dạng UTF-8, UTF-16 và cách các ngôn ngữ lập trình xử lý chuỗi.',
    tags: ['dsa', 'structures'],
    domain: 'Algorithms',
    module: 'Chương 3: Cấu trúc dữ liệu cơ bản',
    prerequisites: ['dsa-basic-types'],
    related: ['dsa-number-encoding'],
    updatedAt: '2026-07-18',
    readTime: '10 phút',
    content: `
<p>Trong máy tính, mọi dữ liệu đều được lưu trữ dưới dạng nhị phân, và ký tự <code>char</code> cũng không ngoại lệ. Để biểu diễn ký tự, chúng ta cần thiết lập một "bộ ký tự" (character set) định nghĩa mối quan hệ một-đối-một giữa mỗi ký tự và các con số nhị phân. Có bộ ký tự, máy tính có thể chuyển đổi số nhị phân thành ký tự bằng cách tra bảng.</p>

<h2>3.4.1 Bộ ký tự ASCII</h2>
<p><u>Mã ASCII</u> là bộ ký tự sớm nhất, tên đầy đủ là American Standard Code for Information Interchange (Chuẩn Mã hóa Trao đổi Thông tin Hoa Kỳ). Nó sử dụng 7 bit nhị phân (7 bit thấp của một byte) để biểu diễn một ký tự, và có thể biểu diễn tối đa 128 ký tự khác nhau. Như hình dưới đây, mã ASCII bao gồm chữ cái tiếng Anh hoa và thường, các chữ số 0 ~ 9, một số dấu câu, và một số ký tự điều khiển (như xuống dòng và tab).</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/ascii_table.png" alt="Mã ASCII" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Tuy nhiên, <strong>mã ASCII chỉ có thể biểu diễn tiếng Anh</strong>. Cùng với sự toàn cầu hóa của máy tính, một bộ ký tự có tên <u>EASCII</u> có thể biểu diễn nhiều ngôn ngữ hơn đã xuất hiện. Nó mở rộng từ nền tảng 7-bit của ASCII lên 8 bit, và có thể biểu diễn 256 ký tự khác nhau.</p>
<p>Trên toàn thế giới, hàng loạt bộ ký tự EASCII phù hợp với các khu vực khác nhau đã lần lượt xuất hiện. 128 ký tự đầu tiên của các bộ ký tự này được thống nhất là mã ASCII, còn 128 ký tự cuối được định nghĩa khác nhau để phù hợp với nhu cầu của các ngôn ngữ khác nhau.</p>

<h2>3.4.2 Bộ ký tự GBK</h2>
<p>Sau đó, người ta nhận ra rằng <strong>EASCII vẫn không thể cung cấp đủ ký tự cho nhiều ngôn ngữ</strong>. Ví dụ, có gần một trăm nghìn chữ Hán, và vài nghìn chữ được sử dụng trong đời sống hàng ngày. Năm 1980, Cục Tiêu chuẩn hóa Quốc gia Trung Quốc phát hành bộ ký tự <u>GB2312</u>, bao gồm 6.763 chữ Hán, về cơ bản đáp ứng nhu cầu xử lý tiếng Trung của máy tính.</p>
<p>Tuy nhiên, GB2312 không thể xử lý một số ký tự hiếm và chữ Hán phồn thể (chữ Hán truyền thống). Bộ ký tự <u>GBK</u> là phần mở rộng dựa trên GB2312, bao gồm tổng cộng 21.886 chữ Hán. Trong lược đồ mã hóa GBK, ký tự ASCII được biểu diễn bằng một byte, còn chữ Hán được biểu diễn bằng hai byte.</p>

<h2>3.4.3 Bộ ký tự Unicode</h2>
<p>Cùng với sự phát triển mạnh mẽ của công nghệ máy tính, các bộ ký tự và chuẩn mã hóa nở rộ, kéo theo nhiều vấn đề. Một mặt, các bộ ký tự này thường chỉ định nghĩa ký tự cho một ngôn ngữ cụ thể và không thể hoạt động bình thường trong môi trường đa ngôn ngữ. Mặt khác, tồn tại nhiều chuẩn bộ ký tự cho cùng một ngôn ngữ, và nếu hai máy tính sử dụng các chuẩn mã hóa khác nhau, hiện tượng ký tự lỗi (garbled text) sẽ xuất hiện khi truyền tải thông tin.</p>
<p>Các nhà nghiên cứu thời đó đã nghĩ: <strong>nếu phát hành một bộ ký tự đủ hoàn chỉnh để bao gồm tất cả ngôn ngữ và ký hiệu trên thế giới, liệu điều đó có giải quyết được vấn đề trong môi trường đa ngôn ngữ và loại bỏ hiện tượng ký tự lỗi hay không?</strong> Được thúc đẩy bởi ý tưởng này, một bộ ký tự lớn và toàn diện — Unicode — đã ra đời.</p>
<p><u>Unicode</u>, hay Mã thống nhất, về mặt lý thuyết có thể chứa hơn một triệu ký tự. Nó cam kết đưa các ký tự từ khắp nơi trên thế giới vào một bộ ký tự thống nhất, cung cấp một bộ ký tự phổ quát để xử lý và hiển thị văn bản của nhiều ngôn ngữ khác nhau, giảm thiểu vấn đề ký tự lỗi gây ra bởi các chuẩn mã hóa khác nhau. Kể từ khi phát hành vào năm 1991, Unicode đã liên tục mở rộng để bao gồm các ngôn ngữ và ký tự mới. Tính đến tháng 9 năm 2022, Unicode đã bao gồm 149.186 ký tự, bao gồm chữ viết, ký hiệu, và cả biểu tượng cảm xúc (emoji) từ nhiều ngôn ngữ khác nhau.</p>
<p>Là một bộ ký tự phổ quát, về bản chất Unicode gán cho mỗi ký tự một "điểm mã" (code point) duy nhất, có miền giá trị từ U+0000 đến U+10FFFF, tạo thành một không gian đánh số ký tự thống nhất. Tuy nhiên, <strong>Unicode không quy định cách lưu trữ các điểm mã ký tự này trong máy tính</strong>. Chúng ta không khỏi đặt câu hỏi: khi các điểm mã Unicode có độ dài khác nhau xuất hiện đồng thời trong một văn bản, hệ thống phân tích ký tự như thế nào? Ví dụ, với một mã hóa có độ dài 2 byte, làm sao hệ thống xác định đó là một ký tự 2 byte hay hai ký tự 1 byte?</p>
<p>Đối với vấn đề trên, <strong>một giải pháp đơn giản là lưu trữ tất cả ký tự dưới dạng mã hóa có độ dài bằng nhau</strong>. Như hình dưới đây, mỗi ký tự trong "Hello" chiếm 1 byte, và mỗi ký tự trong "算法" (giải thuật) chiếm 2 byte. Chúng ta có thể mã hóa tất cả ký tự trong "Hello 算法" với độ dài 2 byte bằng cách đệm thêm số 0 vào các bit cao. Bằng cách này, hệ thống có thể phân tích một ký tự sau mỗi 2 byte và khôi phục nội dung của cụm từ này.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/unicode_hello_algo.png" alt="Ví dụ mã hóa Unicode" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Tuy nhiên, mã ASCII đã chứng minh với chúng ta rằng mã hóa tiếng Anh chỉ cần 1 byte. Nếu áp dụng lược đồ trên, kích thước văn bản tiếng Anh sẽ gấp đôi so với khi dùng mã hóa ASCII, rất lãng phí không gian bộ nhớ. Do đó, chúng ta cần một phương thức mã hóa Unicode hiệu quả hơn.</p>

<h2>3.4.4 Mã hóa UTF-8</h2>
<p>Hiện nay, UTF-8 đã trở thành phương thức mã hóa Unicode được sử dụng rộng rãi nhất trên thế giới. <strong>Đây là mã hóa có độ dài biến thiên</strong>, sử dụng từ 1 đến 4 byte để biểu diễn một ký tự, tùy thuộc vào độ phức tạp của ký tự. Ký tự ASCII chỉ cần 1 byte, chữ cái Latin và Hy Lạp cần 2 byte, chữ Hán thông dụng cần 3 byte, và một số ký tự hiếm khác cần 4 byte.</p>
<p>Quy tắc mã hóa của UTF-8 không phức tạp, có thể chia thành hai trường hợp sau.</p>
<ul>
  <li>Đối với ký tự 1 byte, đặt bit cao nhất là $0$, và đặt 7 bit còn lại là điểm mã Unicode. Đáng chú ý, ký tự ASCII chiếm 128 điểm mã đầu tiên trong bộ ký tự Unicode. Nói cách khác, <strong>mã hóa UTF-8 tương thích ngược với mã ASCII</strong>. Điều này có nghĩa chúng ta có thể dùng UTF-8 để phân tích văn bản mã ASCII rất cũ.</li>
  <li>Đối với ký tự có độ dài $n$ byte (với $n > 1$), đặt $n$ bit cao nhất của byte đầu tiên là $1$, và đặt bit thứ $(n + 1)$ là $0$; kể từ byte thứ hai trở đi, đặt 2 bit cao nhất của mỗi byte là $10$; sử dụng toàn bộ các bit còn lại để điền điểm mã Unicode của ký tự.</li>
</ul>
<p>Hình dưới đây cho thấy mã hóa UTF-8 tương ứng của "Hello 算法". Có thể quan sát thấy, vì $n$ bit cao nhất đều được đặt là $1$, hệ thống có thể xác định độ dài ký tự là $n$ bằng cách đếm số bit $1$ dẫn đầu.</p>
<p>Nhưng tại sao lại đặt 2 bit cao nhất của tất cả các byte còn lại là $10$? Thực tế, $10$ này có thể đóng vai trò như một ký hiệu kiểm tra. Giả sử hệ thống bắt đầu phân tích văn bản từ một byte sai, $10$ ở đầu byte có thể giúp hệ thống nhanh chóng xác định sự bất thường.</p>
<p>Lý do sử dụng $10$ làm ký hiệu kiểm tra là vì theo quy tắc mã hóa UTF-8, không thể có chuyện 2 bit cao nhất của một ký tự là $10$. Kết luận này có thể được chứng minh bằng phản chứng: giả sử 2 bit cao nhất của một ký tự là $10$, nghĩa là độ dài ký tự đó là $1$, tương ứng với mã ASCII. Tuy nhiên, bit cao nhất của mã ASCII phải là $0$, mâu thuẫn với giả thiết.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/utf-8_hello_algo.png" alt="Ví dụ mã hóa UTF-8" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Ngoài UTF-8, các phương thức mã hóa phổ biến khác còn bao gồm hai loại sau.</p>
<ul>
  <li><strong>Mã hóa UTF-16</strong>: Sử dụng 2 hoặc 4 byte để biểu diễn một ký tự. Tất cả ký tự ASCII và các ký tự không phải tiếng Anh thông dụng khác được biểu diễn bằng 2 byte; một số ít ký tự cần dùng 4 byte. Đối với ký tự 2 byte, mã hóa UTF-16 bằng chính điểm mã Unicode.</li>
  <li><strong>Mã hóa UTF-32</strong>: Mỗi ký tự dùng 4 byte. Điều này có nghĩa UTF-32 chiếm nhiều không gian hơn UTF-8 và UTF-16, đặc biệt với văn bản có tỷ lệ ký tự ASCII cao.</li>
</ul>
<p>Xét về góc độ chiếm dụng không gian lưu trữ, dùng UTF-8 để biểu diễn ký tự tiếng Anh rất hiệu quả vì chỉ cần 1 byte; dùng mã hóa UTF-16 cho một số ký tự không phải tiếng Anh (như tiếng Trung) sẽ hiệu quả hơn vì chỉ cần 2 byte, trong khi UTF-8 có thể cần đến 3 byte.</p>
<p>Xét về góc độ tương thích, UTF-8 có tính phổ quát tốt nhất, và nhiều công cụ, thư viện ưu tiên hỗ trợ UTF-8.</p>

<h2>3.4.5 Mã hóa Ký tự trong các Ngôn ngữ Lập trình</h2>
<p>Đối với nhiều ngôn ngữ lập trình trong quá khứ, chuỗi (string) trong quá trình chương trình thực thi sử dụng mã hóa nội bộ như UTF-16 hoặc UTF-32. Dưới các biểu diễn này, chúng ta thường có thể xử lý chuỗi giống như mảng, và cách tiếp cận này có những ưu điểm sau.</p>
<ul>
  <li><strong>Truy cập ngẫu nhiên</strong>: Chuỗi mã hóa UTF-16 có thể dễ dàng truy cập ngẫu nhiên. UTF-8 là mã hóa có độ dài biến thiên. Để tìm ký tự thứ $i$, chúng ta cần duyệt từ đầu chuỗi đến ký tự thứ $i$, cần thời gian $O(n)$.</li>
  <li><strong>Đếm ký tự</strong>: Tương tự truy cập ngẫu nhiên, tính độ dài của chuỗi mã hóa UTF-16 cũng là thao tác $O(1)$. Tuy nhiên, tính độ dài của chuỗi mã hóa UTF-8 cần duyệt toàn bộ chuỗi.</li>
  <li><strong>Thao tác chuỗi</strong>: Nhiều thao tác chuỗi (như tách, nối, chèn, xóa, v.v.) trên chuỗi mã hóa UTF-16 dễ thực hiện hơn. Thực hiện các thao tác này trên chuỗi mã hóa UTF-8 thường cần thêm các phép tính bổ sung để đảm bảo không tạo ra mã hóa UTF-8 không hợp lệ.</li>
</ul>
<p>Trên thực tế, việc thiết kế lược đồ mã hóa ký tự cho các ngôn ngữ lập trình là một chủ đề rất thú vị liên quan đến nhiều yếu tố.</p>
<ul>
  <li>Kiểu <code>String</code> của Java sử dụng mã hóa UTF-16, với mỗi ký tự chiếm 2 byte. Điều này là vì khi mới thiết kế ngôn ngữ Java, người ta tin rằng 16 bit là đủ để biểu diễn tất cả các ký tự có thể có. Tuy nhiên, đây là một phán đoán sai lầm. Sau đó, đặc tả Unicode đã mở rộng vượt quá 16 bit, vì vậy các ký tự trong Java hiện nay có thể được biểu diễn bởi một cặp giá trị 16-bit (gọi là "surrogate pair" - cặp thay thế).</li>
  <li>Chuỗi của JavaScript và TypeScript sử dụng mã hóa UTF-16 vì lý do tương tự Java. Khi Netscape lần đầu giới thiệu ngôn ngữ JavaScript vào năm 1995, Unicode vẫn còn trong giai đoạn phát triển sơ khai, và lúc đó, sử dụng mã hóa 16-bit là đủ để biểu diễn mọi ký tự Unicode.</li>
  <li>C# sử dụng mã hóa UTF-16 chủ yếu vì nền tảng .NET được thiết kế bởi Microsoft, và nhiều công nghệ của Microsoft (bao gồm hệ điều hành Windows) sử dụng rộng rãi mã hóa UTF-16.</li>
</ul>
<p>Do việc đánh giá thấp số lượng ký tự của các ngôn ngữ lập trình trên, chúng buộc phải áp dụng phương pháp "surrogate pair" để biểu diễn các ký tự Unicode có độ dài vượt quá 16 bit. Đây là một sự thỏa hiệp bất đắc dĩ. Một mặt, trong các chuỗi chứa surrogate pair, một ký tự có thể chiếm 2 byte hoặc 4 byte, do đó mất đi ưu điểm của mã hóa độ dài cố định. Mặt khác, xử lý surrogate pair đòi hỏi thêm mã nguồn, làm tăng độ phức tạp và khó khăn khi gỡ lỗi (debug) trong lập trình.</p>
<p>Vì những lý do trên, một số ngôn ngữ lập trình đã đề xuất các lược đồ mã hóa khác nhau.</p>
<ul>
  <li>Kiểu <code>str</code> của Python sử dụng mã hóa Unicode và áp dụng biểu diễn chuỗi linh hoạt, trong đó độ dài ký tự lưu trữ phụ thuộc vào điểm mã Unicode lớn nhất trong chuỗi. Nếu tất cả ký tự trong chuỗi là ký tự ASCII, mỗi ký tự chiếm 1 byte; nếu có ký tự vượt quá phạm vi ASCII nhưng vẫn nằm trong Mặt phẳng Đa ngôn ngữ Cơ bản (Basic Multilingual Plane - BMP), mỗi ký tự chiếm 2 byte; nếu có ký tự vượt quá BMP, mỗi ký tự chiếm 4 byte.</li>
  <li>Kiểu <code>string</code> của ngôn ngữ Go sử dụng mã hóa UTF-8 nội bộ. Go cũng cung cấp kiểu <code>rune</code>, dùng để biểu diễn một điểm mã Unicode đơn lẻ.</li>
  <li>Kiểu <code>str</code> và <code>String</code> của ngôn ngữ Rust sử dụng mã hóa UTF-8 nội bộ. Rust cũng cung cấp kiểu <code>char</code> để biểu diễn một điểm mã Unicode đơn lẻ.</li>
</ul>
<p>Cần lưu ý rằng nội dung thảo luận ở trên là về cách chuỗi được lưu trữ trong các ngôn ngữ lập trình, <strong>điều này khác với cách chuỗi được lưu trữ trong tệp tin hoặc truyền tải qua mạng</strong>. Trong lưu trữ tệp tin hoặc truyền tải mạng, chúng ta thường mã hóa chuỗi thành định dạng UTF-8 để đạt được khả năng tương thích và hiệu quả không gian tối ưu.</p>
`,
    originalContent: `
# Character Encoding *

In computers, all data is stored in binary form, and character \`char\` is no exception. To represent characters, we need to establish a "character set" that defines a one-to-one correspondence between each character and binary numbers. With a character set, computers can convert binary numbers to characters by looking up the table.

## ASCII Character Set

<u>ASCII code</u> is the earliest character set, with the full name American Standard Code for Information Interchange. It uses 7 binary bits (the lower 7 bits of one byte) to represent a character, and can represent a maximum of 128 different characters. As shown in the figure below, ASCII code includes uppercase and lowercase English letters, numbers 0 ~ 9, some punctuation marks, and some control characters (such as newline and tab).

![ASCII code](character_encoding.assets/ascii_table.png)

However, **ASCII code can only represent English**. With the globalization of computers, a character set called <u>EASCII</u> that can represent more languages emerged. It expands from the 7-bit basis of ASCII to 8 bits, and can represent 256 different characters.

Worldwide, a batch of EASCII character sets suitable for different regions have appeared successively. The first 128 characters of these character sets are unified as ASCII code, and the last 128 characters are defined differently to adapt to the needs of different languages.

## GBK Character Set

Later, people found that **EASCII still could not provide enough characters for many languages**. For example, there are nearly one hundred thousand Chinese characters, and several thousand are used in everyday life. In 1980, the China National Standardization Administration released the <u>GB2312</u> character set, which included 6,763 Chinese characters, basically meeting the needs of computer processing for Chinese.

However, GB2312 cannot handle some rare characters and traditional Chinese characters. The <u>GBK</u> character set is an extension based on GB2312, which includes a total of 21,886 Chinese characters. In the GBK encoding scheme, ASCII characters are represented using one byte, and Chinese characters are represented using two bytes.

## Unicode Character Set

With the vigorous development of computer technology, character sets and encoding standards flourished, which brought many problems. On the one hand, these character sets generally only define characters for specific languages and cannot work normally in multilingual environments. On the other hand, multiple character set standards exist for the same language, and if two computers use different encoding standards, garbled characters will appear during information transmission.

Researchers of that era thought: **If a sufficiently complete character set were released to include all languages and symbols in the world, wouldn't that solve problems in cross-language environments and eliminate garbled text**? Driven by this idea, a large and comprehensive character set, Unicode, was born.

<u>Unicode</u>, or Unified Code, can theoretically accommodate over one million characters. It is committed to including characters from around the world into a unified character set, providing a universal character set to handle and display various language texts, reducing garbled character problems caused by different encoding standards. Since its release in 1991, Unicode has continuously expanded to include new languages and characters. As of September 2022, Unicode has included 149,186 characters, including characters, symbols, and even emojis from various languages.

As a universal character set, Unicode essentially assigns each character a unique "code point" (character identifier), whose range is U+0000 to U+10FFFF, forming a unified character numbering space. However, **Unicode does not specify how to store these character code points in computers**. We can't help but ask: when Unicode code points of multiple lengths appear simultaneously in a text, how does the system parse the characters? For example, given an encoding with a length of 2 bytes, how does the system determine whether it is one 2-byte character or two 1-byte characters?

For the above problem, **a straightforward solution is to store all characters as equal-length encodings**. As shown in the figure below, each character in "Hello" occupies 1 byte, and each character in "算法" (algorithm) occupies 2 bytes. We can encode all characters in "Hello 算法" as 2 bytes in length by padding the high bits with 0. In this way, the system can parse one character every 2 bytes and restore the content of this phrase.

![Unicode encoding example](character_encoding.assets/unicode_hello_algo.png)

However, ASCII code has already proven to us that encoding English only requires 1 byte. If the above scheme is adopted, the size of English text will be twice that under ASCII encoding, which is very wasteful of memory space. Therefore, we need a more efficient Unicode encoding method.

## UTF-8 Encoding

Currently, UTF-8 has become the most widely used Unicode encoding method internationally. **It is a variable-length encoding** that uses 1 to 4 bytes to represent a character, depending on the complexity of the character. ASCII characters only require 1 byte, Latin and Greek letters require 2 bytes, commonly used Chinese characters require 3 bytes, and some other rare characters require 4 bytes.

The encoding rules of UTF-8 are not complicated and can be divided into the following two cases.

- For 1-byte characters, set the highest bit to $0$, and set the remaining 7 bits to the Unicode code point. It is worth noting that ASCII characters occupy the first 128 code points in the Unicode character set. That is to say, **UTF-8 encoding is backward compatible with ASCII code**. This means we can use UTF-8 to parse very old ASCII code text.
- For characters with a length of $n$ bytes (where $n > 1$), set the highest $n$ bits of the first byte to $1$, and set the $(n + 1)$-th bit to $0$; starting from the second byte, set the highest 2 bits of each byte to $10$; use all remaining bits to fill in the Unicode code point of the character.

The figure below shows the UTF-8 encoding corresponding to "Hello 算法". It can be observed that since the highest $n$ bits are all set to $1$, the system can determine that the character length is $n$ by counting the leading $1$ bits.

But why set the highest 2 bits of all other bytes to $10$? In fact, this $10$ can serve as a check symbol. Assuming the system starts parsing text from an incorrect byte, the $10$ at the beginning of the byte can help the system quickly determine an anomaly.

The reason for using $10$ as a check symbol is that under UTF-8 encoding rules, it is impossible for a character's highest two bits to be $10$. This conclusion can be proven by contradiction: assuming the highest two bits of a character are $10$, it means the length of the character is $1$, corresponding to ASCII code. However, the highest bit of ASCII code should be $0$, which contradicts the assumption.

![UTF-8 encoding example](character_encoding.assets/utf-8_hello_algo.png)

In addition to UTF-8, common encoding methods also include the following two.

- **UTF-16 encoding**: Uses 2 or 4 bytes to represent a character. All ASCII characters and commonly used non-English characters are represented with 2 bytes; a few characters need to use 4 bytes. For 2-byte characters, UTF-16 encoding is equal to the Unicode code point.
- **UTF-32 encoding**: Every character uses 4 bytes. This means that UTF-32 takes up more space than UTF-8 and UTF-16, especially for text with a high proportion of ASCII characters.

From the perspective of storage space occupation, using UTF-8 to represent English characters is very efficient because it only requires 1 byte; using UTF-16 encoding for some non-English characters (such as Chinese) will be more efficient because it only requires 2 bytes, while UTF-8 may require 3 bytes.

From a compatibility perspective, UTF-8 has the best universality, and many tools and libraries support UTF-8 first.

## Character Encoding in Programming Languages

For many programming languages in the past, strings during program execution used internal encodings such as UTF-16 or UTF-32. Under these representations, we can often treat strings like arrays during processing, and this approach has the following advantages.

- **Random access**: UTF-16 encoded strings can be easily accessed randomly. UTF-8 is a variable-length encoding. To find the $i$-th character, we need to traverse from the beginning of the string to the $i$-th character, which requires $O(n)$ time.
- **Character counting**: Similar to random access, calculating the length of a UTF-16 encoded string is also an $O(1)$ operation. However, calculating the length of a UTF-8 encoded string requires traversing the entire string.
- **String operations**: Many string operations (such as splitting, joining, inserting, deleting, etc.) on UTF-16 encoded strings are easier to perform. Performing these operations on UTF-8 encoded strings usually requires additional calculations to ensure that invalid UTF-8 encoding is not generated.

In fact, the design of character encoding schemes for programming languages is a very interesting topic involving many factors.

- Java's \`String\` type uses UTF-16 encoding, with each character occupying 2 bytes. This is because at the beginning of Java language design, people believed that 16 bits were sufficient to represent all possible characters. However, this was an incorrect judgment. Later, the Unicode specification expanded beyond 16 bits, so characters in Java may now be represented by a pair of 16-bit values (called "surrogate pairs").
- The strings of JavaScript and TypeScript use UTF-16 encoding for reasons similar to Java. When Netscape first introduced the JavaScript language in 1995, Unicode was still in its early stages of development, and at that time, using 16-bit encoding was sufficient to represent all Unicode characters.
- C# uses UTF-16 encoding mainly because the .NET platform was designed by Microsoft, and many of Microsoft's technologies (including the Windows operating system) extensively use UTF-16 encoding.

Due to the underestimation of character quantities by the above programming languages, they had to adopt the "surrogate pair" method to represent Unicode characters with lengths exceeding 16 bits. This is a reluctant compromise. On the one hand, in strings containing surrogate pairs, one character may occupy 2 bytes or 4 bytes, thus losing the advantage of fixed-length encoding. On the other hand, handling surrogate pairs requires additional code, which increases the complexity and difficulty of debugging in programming.

For the above reasons, some programming languages have proposed different encoding schemes.

- Python's \`str\` uses Unicode encoding and adopts a flexible string representation where the stored character length depends on the largest Unicode code point in the string. If all characters in the string are ASCII characters, each character occupies 1 byte; if there are characters exceeding the ASCII range but all within the Basic Multilingual Plane (BMP), each character occupies 2 bytes; if there are characters exceeding the BMP, each character occupies 4 bytes.
- Go language's \`string\` type uses UTF-8 encoding internally. Go language also provides the \`rune\` type, which is used to represent a single Unicode code point.
- Rust language's \`str\` and \`String\` types use UTF-8 encoding internally. Rust also provides the \`char\` type for representing a single Unicode code point.

It should be noted that the above discussion is about how strings are stored in programming languages, **which is different from how strings are stored in files or transmitted over networks**. In file storage or network transmission, we usually encode strings into UTF-8 format to achieve optimal compatibility and space efficiency.
`
  },
  'dsa-structures-summary': {
    title: '3.5 Tóm tắt & Hỏi đáp',
    summary: 'Tóm tắt kiến thức chương 3 về phân loại cấu trúc dữ liệu, kiểu dữ liệu cơ bản, mã hóa số và mã hóa ký tự, kèm theo phần Hỏi đáp thường gặp.',
    tags: ['dsa', 'structures', 'summary'],
    domain: 'Algorithms',
    module: 'Chương 3: Cấu trúc dữ liệu cơ bản',
    prerequisites: ['dsa-character-encoding'],
    related: [],
    updatedAt: '2026-07-18',
    readTime: '9 phút',
    content: `
<h2>3.5.1 Tóm tắt Kiến thức Cốt lõi</h2>
<ul>
  <li>Cấu trúc dữ liệu có thể được phân loại theo hai góc nhìn: cấu trúc logic và cấu trúc vật lý. Cấu trúc logic mô tả mối quan hệ logic giữa các phần tử dữ liệu, còn cấu trúc vật lý mô tả cách dữ liệu được lưu trữ trong bộ nhớ máy tính.</li>
  <li>Các cấu trúc logic phổ biến bao gồm cấu trúc tuyến tính, dạng cây và dạng mạng. Chúng ta thường phân loại cấu trúc dữ liệu thành tuyến tính (mảng, danh sách liên kết, ngăn xếp, hàng đợi) và phi tuyến (cây, đồ thị, đống) dựa trên cấu trúc logic của chúng. Việc triển khai bảng băm có thể liên quan đến cả cấu trúc dữ liệu tuyến tính lẫn phi tuyến.</li>
  <li>Khi chương trình chạy, dữ liệu được lưu trữ trong bộ nhớ máy tính. Mỗi không gian bộ nhớ có một địa chỉ bộ nhớ tương ứng, và chương trình truy cập dữ liệu thông qua các địa chỉ bộ nhớ này.</li>
  <li>Cấu trúc vật lý chủ yếu được chia thành lưu trữ không gian liên tục (mảng) và lưu trữ không gian phân tán (danh sách liên kết). Mọi cấu trúc dữ liệu đều được triển khai bằng mảng, danh sách liên kết, hoặc sự kết hợp của cả hai.</li>
  <li>Các kiểu dữ liệu cơ bản trong máy tính bao gồm số nguyên <code>byte</code>, <code>short</code>, <code>int</code>, <code>long</code>, số thực dấu phẩy động <code>float</code>, <code>double</code>, ký tự <code>char</code>, và luận lý <code>bool</code>. Miền giá trị của chúng phụ thuộc vào kích thước không gian chiếm dụng và phương thức biểu diễn.</li>
  <li>Dấu-độ lớn, bù 1 và bù 2 là ba phương pháp mã hóa số trong máy tính, và chúng có thể chuyển đổi qua lại lẫn nhau. Bit cao nhất của dạng dấu-độ lớn là bit dấu, các bit còn lại biểu diễn giá trị của số.</li>
  <li>Số nguyên được lưu trữ trong máy tính dưới dạng bù 2. Với biểu diễn bù 2, máy tính có thể xử lý đồng nhất phép cộng của cả số dương lẫn số âm, mà không cần thiết kế mạch phần cứng đặc biệt cho phép trừ, và không có sự mơ hồ giữa số không dương và âm.</li>
  <li>Mã hóa số thực dấu phẩy động gồm 1 bit dấu, 8 bit số mũ, và 23 bit phần định trị. Do có bit số mũ, miền giá trị của số thực dấu phẩy động lớn hơn nhiều so với số nguyên, đổi lại là sự hy sinh về độ chính xác.</li>
  <li>ASCII là bộ ký tự tiếng Anh sớm nhất, độ dài 1 byte, chứa tổng cộng 128 ký tự. GBK là bộ ký tự tiếng Trung thông dụng, chứa hơn 20.000 chữ Hán. Unicode cam kết cung cấp một chuẩn bộ ký tự hoàn chỉnh, thu thập ký tự từ nhiều ngôn ngữ trên khắp thế giới, từ đó giải quyết vấn đề ký tự lỗi gây ra bởi các phương thức mã hóa ký tự không đồng nhất.</li>
  <li>UTF-8 là phương thức mã hóa Unicode phổ biến nhất và có khả năng tương thích tuyệt vời. Đây là phương thức mã hóa có độ dài biến thiên với khả năng mở rộng tốt, cải thiện hiệu quả không gian lưu trữ. UTF-16 và UTF-32 là các phương thức mã hóa Unicode phổ biến khác. Khi mã hóa chữ Hán, UTF-16 chiếm ít không gian hơn UTF-8. Các ngôn ngữ lập trình như Java và C# mặc định sử dụng mã hóa UTF-16.</li>
</ul>

<h2>3.5.2 Hỏi & Đáp</h2>
<p><strong>Hỏi: Tại sao bảng băm chứa cả cấu trúc dữ liệu tuyến tính lẫn phi tuyến?</strong></p>
<p><strong>Trả lời:</strong> Cấu trúc nền tảng của bảng băm là một mảng. Để giải quyết xung đột băm (hash collision), chúng ta có thể sử dụng "phương pháp nối chuỗi" (chaining, sẽ được thảo luận ở phần "Xung đột băm" sau): mỗi ô (bucket) trong mảng trỏ đến một danh sách liên kết, danh sách này có thể được chuyển đổi thành cây (thường là cây đỏ-đen) khi độ dài danh sách vượt quá một ngưỡng nhất định.</p>
<p>Từ góc độ lưu trữ, cấu trúc nền tảng của bảng băm là một mảng, trong đó mỗi ô có thể chứa một giá trị, một danh sách liên kết, hoặc một cây. Do đó, bảng băm có thể chứa cả cấu trúc dữ liệu tuyến tính (mảng, danh sách liên kết) lẫn cấu trúc dữ liệu phi tuyến (cây).</p>

<p><strong>Hỏi: Độ dài của kiểu <code>char</code> có phải là 1 byte không?</strong></p>
<p><strong>Trả lời:</strong> Độ dài của kiểu <code>char</code> được quyết định bởi phương thức mã hóa mà ngôn ngữ lập trình sử dụng. Ví dụ, Java, JavaScript, TypeScript và C# đều sử dụng mã hóa UTF-16 (để lưu trữ điểm mã Unicode), do đó kiểu <code>char</code> có độ dài 2 byte.</p>

<p><strong>Hỏi: Việc gọi các cấu trúc dữ liệu dựa trên mảng là "cấu trúc dữ liệu tĩnh" có gây mơ hồ không? Ngăn xếp cũng có thể thực hiện các thao tác "động" như đẩy (push) và lấy ra (pop).</strong></p>
<p><strong>Trả lời:</strong> Ngăn xếp thực sự có thể triển khai các thao tác dữ liệu động, nhưng cấu trúc dữ liệu vẫn là "tĩnh" (độ dài cố định). Mặc dù các cấu trúc dữ liệu dựa trên mảng có thể thêm hoặc xóa phần tử một cách động, dung lượng của chúng vẫn cố định. Nếu lượng dữ liệu vượt quá kích thước đã cấp phát trước, một mảng mới lớn hơn cần được tạo ra, và nội dung của mảng cũ phải được sao chép sang mảng mới.</p>

<p><strong>Hỏi: Khi xây dựng một ngăn xếp (hàng đợi), kích thước của nó không được chỉ định. Tại sao chúng vẫn là "cấu trúc dữ liệu tĩnh"?</strong></p>
<p><strong>Trả lời:</strong> Trong các ngôn ngữ lập trình bậc cao, chúng ta không cần tự tay chỉ định dung lượng ban đầu của ngăn xếp (hàng đợi); lớp (class) sẽ tự động xử lý việc này. Ví dụ, dung lượng ban đầu của <code>ArrayList</code> trong Java thường là 10. Ngoài ra, thao tác mở rộng cũng được tự động triển khai. Xem chi tiết tại phần "List" ở chương sau.</p>

<p><strong>Hỏi: Phương pháp chuyển đổi từ dấu-độ lớn sang bù 2 là "đảo bit rồi cộng 1". Vậy chuyển đổi từ bù 2 sang dấu-độ lớn lẽ ra phải là phép toán ngược "trừ 1 rồi đảo bit". Tuy nhiên, bù 2 cũng có thể được chuyển đổi sang dấu-độ lớn thông qua "đảo bit rồi cộng 1". Tại sao lại như vậy?</strong></p>
<p><strong>Trả lời:</strong> Đó là vì việc chuyển đổi qua lại giữa dấu-độ lớn và bù 2 thực chất là quá trình tính toán "phần bù" (complement). Hãy định nghĩa phần bù trước: giả sử $a + b = c$, thì ta nói $a$ là phần bù của $b$ đối với $c$, và ngược lại, $b$ là phần bù của $a$ đối với $c$.</p>
<p>Cho một số nhị phân $n = 4$ bit là $0010$, nếu ta coi số này là dạng dấu-độ lớn (bỏ qua bit dấu), thì bù 2 của nó có thể thu được thông qua "đảo bit rồi cộng 1":</p>

$$
0010 \\rightarrow 1101 \\rightarrow 1110
$$

<p>Ta thấy rằng tổng của dấu-độ lớn và bù 2 là $0010 + 1110 = 10000$, nghĩa là bù 2 $1110$ là "phần bù" của dấu-độ lớn $0010$ đối với $10000$. <strong>Điều này có nghĩa "đảo bit rồi cộng 1" ở trên thực chất là quá trình tính phần bù đối với $10000$.</strong></p>
<p>Vậy, "phần bù" của bù 2 $1110$ đối với $10000$ là gì? Ta vẫn có thể dùng "đảo bit rồi cộng 1" để thu được nó:</p>

$$
1110 \\rightarrow 0001 \\rightarrow 0010
$$

<p>Nói cách khác, dấu-độ lớn và bù 2 là "phần bù" của nhau đối với $10000$, vì vậy "chuyển từ dấu-độ lớn sang bù 2" và "chuyển từ bù 2 sang dấu-độ lớn" có thể được triển khai bằng cùng một phép toán (đảo bit rồi cộng 1).</p>
<p>Tất nhiên, chúng ta cũng có thể dùng phép toán ngược để tìm dạng dấu-độ lớn của bù 2 $1110$, tức là "trừ 1 rồi đảo bit":</p>

$$
1110 \\rightarrow 1101 \\rightarrow 0010
$$

<p>Tóm lại, cả "đảo bit rồi cộng 1" và "trừ 1 rồi đảo bit" đều là tính phần bù đối với $10000$, và chúng tương đương nhau.</p>
<p>Về bản chất, phép toán "đảo bit" thực chất là tìm phần bù đối với $1111$ (vì "dấu-độ lớn + bù 1 = 1111" luôn đúng); và cộng thêm 1 vào bù 1 sẽ cho ra bù 2, chính là phần bù đối với $10000$.</p>
<p>Ở trên sử dụng $n = 4$ làm ví dụ, và có thể tổng quát hóa cho số nhị phân với số bit bất kỳ.</p>
`,
    originalContent: `
# Summary

### Key Review

- Data structures can be classified from two perspectives: logical structure and physical structure. Logical structure describes the logical relationships between data elements, while physical structure describes how data is stored in computer memory.
- Common logical structures include linear, tree-like, and network structures. We typically classify data structures as linear (arrays, linked lists, stacks, queues) and non-linear (trees, graphs, heaps) based on their logical structure. The implementation of hash tables may involve both linear and non-linear data structures.
- When a program runs, data is stored in computer memory. Each memory space has a corresponding memory address, and the program accesses data through these memory addresses.
- Physical structures are primarily divided into contiguous space storage (arrays) and dispersed space storage (linked lists). All data structures are implemented using arrays, linked lists, or a combination of both.
- Basic data types in computers include integers \`byte\`, \`short\`, \`int\`, \`long\`, floating-point numbers \`float\`, \`double\`, characters \`char\`, and booleans \`bool\`. Their value ranges depend on the size of space they occupy and their representation method.
- Sign-magnitude, 1's complement, and 2's complement are three methods for encoding numbers in computers, and they can be converted into each other. The most significant bit of sign-magnitude is the sign bit, and the remaining bits represent the value of the number.
- Integers are stored in computers in 2's complement form. Under 2's complement representation, computers can treat the addition of positive and negative numbers uniformly, without needing to design special hardware circuits for subtraction, and there is no ambiguity of positive and negative zero.
- The encoding of floating-point numbers consists of 1 sign bit, 8 exponent bits, and 23 fraction bits. Due to the exponent bits, the range of floating-point numbers is much larger than that of integers, at the cost of sacrificing precision.
- ASCII is the earliest English character set, with a length of 1 byte, containing a total of 128 characters. GBK is a commonly used Chinese character set, containing over 20,000 Chinese characters. Unicode is committed to providing a complete character set standard, collecting characters from various languages around the world, thereby solving the garbled text problem caused by inconsistent character encoding methods.
- UTF-8 is the most popular Unicode encoding method and has excellent compatibility. It is a variable-length encoding method with good scalability, effectively improving storage space efficiency. UTF-16 and UTF-32 are common Unicode encoding methods. When encoding Chinese characters, UTF-16 occupies less space than UTF-8. Programming languages such as Java and C# use UTF-16 encoding by default.

### Q & A

**Q**: Why do hash tables contain both linear and non-linear data structures?

The underlying structure of a hash table is an array. To resolve hash collisions, we may use "chaining" (discussed in the subsequent "Hash Collision" section): each bucket in the array points to a linked list, which may be converted to a tree (usually a red-black tree) when the list length exceeds a certain threshold.

From a storage perspective, the underlying structure of a hash table is an array, where each bucket slot may contain a value, a linked list, or a tree. Therefore, hash tables may contain both linear data structures (arrays, linked lists) and non-linear data structures (trees).

**Q**: Is the length of the \`char\` type 1 byte?

The length of the \`char\` type is determined by the encoding method used by the programming language. For example, Java, JavaScript, TypeScript, and C# all use UTF-16 encoding (to store Unicode code points), so the \`char\` type has a length of 2 bytes.

**Q**: Is there ambiguity in referring to array-based data structures as "static data structures"? Stacks can also perform "dynamic" operations such as push and pop.

Stacks can indeed implement dynamic data operations, but the data structure is still "static" (fixed length). Although array-based data structures can dynamically add or remove elements, their capacity is fixed. If the data volume exceeds the pre-allocated size, a new larger array needs to be created, and the contents of the old array must be copied to the new array.

**Q**: When constructing a stack (queue), its size is not specified. Why are they "static data structures"?

In high-level programming languages, we do not need to manually specify the initial capacity of a stack (queue); the class handles this automatically. For example, the initial capacity of Java's \`ArrayList\` is typically 10. Additionally, the expansion operation is also automatically implemented. See the subsequent "List" section for details.

**Q**: The method of converting sign-magnitude to 2's complement is "first negate then add 1". So converting 2's complement to sign-magnitude should be the inverse operation "first subtract 1 then negate". However, 2's complement can also be converted to sign-magnitude through "first negate then add 1". Why is this?

This is because the mutual conversion between sign-magnitude and 2's complement is actually the process of computing the "complement". Let us first define the complement: assuming $a + b = c$, then we say that $a$ is the complement of $b$ to $c$, and conversely, $b$ is the complement of $a$ to $c$.

Given an $n = 4$ bit binary number $0010$, if we treat this number as sign-magnitude (ignoring the sign bit), then its 2's complement can be obtained through "first negate then add 1":

$$
0010 \\rightarrow 1101 \\rightarrow 1110
$$

We find that the sum of sign-magnitude and 2's complement is $0010 + 1110 = 10000$, which means the 2's complement $1110$ is the "complement" of sign-magnitude $0010$ to $10000$. **This means the above "first negate then add 1" is actually the process of computing the complement to $10000$**.

So, what is the "complement" of 2's complement $1110$ to $10000$? We can still use "first negate then add 1" to obtain it:

$$
1110 \\rightarrow 0001 \\rightarrow 0010
$$

In other words, sign-magnitude and 2's complement are each other's "complement" to $10000$, so "sign-magnitude to 2's complement" and "2's complement to sign-magnitude" can be implemented using the same operation (first negate then add 1).

Of course, we can also use the inverse operation to find the sign-magnitude of 2's complement $1110$, that is, "first subtract 1 then negate":

$$
1110 \\rightarrow 1101 \\rightarrow 0010
$$

In summary, both "first negate then add 1" and "first subtract 1 then negate" are computing the complement to $10000$, and they are equivalent.

Essentially, the "negate" operation is actually finding the complement to $1111$ (because "sign-magnitude + 1's complement = 1111" always holds); and adding 1 to the 1's complement yields the 2's complement, which is the complement to $10000$.

The above uses $n = 4$ as an example, and it can be generalized to binary numbers of any number of bits.
`
  },
};
