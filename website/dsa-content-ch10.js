/* ============================================================
   Knowledge OS — DSA Module: Chương 10 - Tìm kiếm (Searching)
   ============================================================ */

Object.assign(DSA_CONTENT, {

  'dsa-searching-index': {
    title: 'Tìm kiếm (Searching)',
    summary: 'Giới thiệu về các thuật toán Tìm kiếm: từ Tìm kiếm nhị phân (Binary Search) trên dữ liệu đã sắp xếp, đến chiến lược đánh đổi Không gian lấy Thời gian bằng Hashing.',
    tags: ['dsa', 'searching', 'binary-search', 'algorithm'],
    domain: 'Algorithms',
    module: 'Chương 10: Tìm kiếm',
    prerequisites: ['dsa-graph-summary'],
    related: ['dsa-binary-search'],
    updatedAt: '2026-07-19',
    readTime: '1 phút',
    content: `
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/chapter_searching.jpg" alt="Tìm kiếm" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<div class="callout callout-note">
  <span class="callout-icon">✨</span>
  <div class="callout-body">
    <p>Tìm kiếm (Searching) là một cuộc phiêu lưu vào những điều chưa biết: đôi khi ta phải len lỏi qua từng ngóc ngách của một không gian đầy bí ẩn, đôi khi ta lại có thể khóa mục tiêu chỉ trong chớp mắt.</p>
    <p>Trong hành trình khám phá này, mỗi lần tìm kiếm đều có thể mang lại một câu trả lời bất ngờ.</p>
  </div>
</div>
`,
    originalContent: `# Searching

![Searching](../assets/covers/chapter_searching.jpg)

!!! abstract

    Searching is an adventure into the unknown, where we may need to traverse every corner of the mysterious space, or we may be able to quickly lock onto the target.

    In this journey of discovery, each exploration may yield an unexpected answer.
`
  },

  'dsa-binary-search': {
    title: '10.1 Tìm kiếm Nhị phân (Binary Search)',
    summary: 'Thuật toán Tìm kiếm nhị phân trên mảng đã sắp xếp: cách hoạt động bằng khoảng đóng và khoảng trái đóng phải mở, độ phức tạp O(log n), ưu điểm và hạn chế.',
    tags: ['dsa', 'searching', 'binary-search', 'divide-and-conquer'],
    domain: 'Algorithms',
    module: 'Chương 10: Tìm kiếm',
    prerequisites: ['dsa-searching-index'],
    related: ['dsa-binary-search-insertion'],
    updatedAt: '2026-07-19',
    readTime: '12 phút',
    content: `
<h2>10.1.1 Tìm kiếm Nhị phân là gì?</h2>
<p><u>Tìm kiếm nhị phân (Binary Search)</u> là một thuật toán tìm kiếm hiệu quả dựa trên chiến lược chia để trị. Nó tận dụng tính chất <em>đã được sắp xếp</em> của dữ liệu để giảm phạm vi tìm kiếm đi một nửa sau mỗi vòng lặp, cho tới khi tìm thấy phần tử mục tiêu hoặc khoảng tìm kiếm trở thành rỗng.</p>
<div class="callout callout-question">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một mảng <code>nums</code> có độ dài $n$ với các phần tử được sắp xếp tăng dần và không có phần tử trùng lặp. Hãy tìm và trả về chỉ mục của phần tử <code>target</code> trong mảng. Nếu mảng không chứa phần tử này, trả về $-1$. Ví dụ minh họa được thể hiện trong hình bên dưới.</p>
  </div>
</div>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_search_example.png" alt="Dữ liệu ví dụ cho Tìm kiếm nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Như hình minh họa bên dưới, đầu tiên ta khởi tạo hai con trỏ $i = 0$ và $j = n - 1$, lần lượt trỏ tới phần tử đầu tiên và cuối cùng của mảng, đại diện cho khoảng tìm kiếm $[0, n - 1]$. Lưu ý dấu ngoặc vuông biểu thị một <strong>khoảng đóng</strong>, tức bao gồm cả các giá trị biên.</p>
<p>Tiếp theo, thực hiện lặp lại hai bước sau:</p>
<ol>
  <li>Tính chỉ mục giữa $m = \\lfloor {(i + j) / 2} \\rfloor$, trong đó $\\lfloor \\: \\rfloor$ biểu thị phép làm tròn xuống.</li>
  <li>So sánh <code>nums[m]</code> và <code>target</code>, dẫn tới ba trường hợp:
    <ol>
      <li>Khi <code>nums[m] &lt; target</code>, điều đó có nghĩa <code>target</code> nằm trong khoảng $[m + 1, j]$, do đó thực hiện $i = m + 1$.</li>
      <li>Khi <code>nums[m] &gt; target</code>, điều đó có nghĩa <code>target</code> nằm trong khoảng $[i, m - 1]$, do đó thực hiện $j = m - 1$.</li>
      <li>Khi <code>nums[m] = target</code>, điều đó có nghĩa đã tìm thấy <code>target</code>, do đó trả về chỉ mục $m$.</li>
    </ol>
  </li>
</ol>
<p>Nếu mảng không chứa phần tử mục tiêu, khoảng tìm kiếm cuối cùng sẽ trở thành rỗng. Trong trường hợp này, trả về $-1$.</p>

<div class="interactive-widget-wrapper" id="binary-search-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img loading="lazy" src="dsa-assets/binary_search_step1.png" alt="Bước 1" style="max-width:100%;" /><p class="slide-caption">Khởi tạo $i$, $j$ lần lượt trỏ tới phần tử đầu và cuối của mảng, đại diện cho khoảng đóng $[i, j]$.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_step2.png" alt="Bước 2" style="max-width:100%;" /><p class="slide-caption">Tính chỉ mục giữa $m = (i + j) / 2 = 4$.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_step3.png" alt="Bước 3" style="max-width:100%;" /><p class="slide-caption">Vì <code>nums[m] &gt; target</code> (12 &gt; 6) nên thực hiện $j = m - 1 = 3$ để thu hẹp khoảng tìm kiếm.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_step4.png" alt="Bước 4" style="max-width:100%;" /><p class="slide-caption">Tính chỉ mục giữa $m = (i + j) / 2 = 1$.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_step5.png" alt="Bước 5" style="max-width:100%;" /><p class="slide-caption">Vì <code>nums[m] &lt; target</code> (3 &lt; 6) nên thực hiện $i = m + 1 = 2$ để thu hẹp khoảng tìm kiếm.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_step6.png" alt="Bước 6" style="max-width:100%;" /><p class="slide-caption">Tính chỉ mục giữa $m = (i + j) / 2 = 2$.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_step7.png" alt="Bước 7" style="max-width:100%;" /><p class="slide-caption">Vì <code>nums[m] == target</code> (6 == 6) nên trả về chỉ mục $m = 2$.</p></div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('binary-search-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 7</span>
      <button class="slider-btn" onclick="nextSlide('binary-search-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>

<p>Cần lưu ý rằng do cả $i$ và $j$ đều có kiểu <code>int</code>, <strong>$i + j$ có thể vượt quá phạm vi biểu diễn của kiểu <code>int</code></strong>. Để tránh tràn số nguyên (integer overflow), ta thường dùng công thức $m = \\lfloor {i + (j - i) / 2} \\rfloor$ để tính chỉ mục giữa.</p>
<p>Đoạn mã minh họa như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Tìm kiếm nhị phân (khoảng đóng cả hai đầu) */
static int binarySearch(int[] nums, int target) {
    // Khởi tạo khoảng đóng [0, n-1], tức i, j trỏ tới phần tử đầu và cuối của mảng
    int i = 0, j = nums.length - 1;
    // Lặp, thoát khi khoảng tìm kiếm rỗng (rỗng khi i &gt; j)
    while (i &lt;= j) {
        int m = i + (j - i) / 2; // Tính chỉ mục giữa m
        if (nums[m] &lt; target) // target nằm trong khoảng [m+1, j]
            i = m + 1;
        else if (nums[m] &gt; target) // target nằm trong khoảng [i, m-1]
            j = m - 1;
        else // Đã tìm thấy target, trả về chỉ mục của nó
            return m;
    }
    // Không tìm thấy target, trả về -1
    return -1;
}
</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func binarySearch(nums: [Int], target: Int) -&gt; Int {
    // Initialize closed interval [0, n-1], i.e., i, j point to the first and last elements of the array
    var i = nums.startIndex
    var j = nums.endIndex - 1
    // Loop, exit when the search interval is empty (empty when i &gt; j)
    while i &lt;= j {
        let m = i + (j - i) / 2 // Calculate the midpoint index m
        if nums[m] &lt; target { // This means target is in the interval [m+1, j]
            i = m + 1
        } else if nums[m] &gt; target { // This means target is in the interval [i, m-1]
            j = m - 1
        } else { // Found the target element, return its index
            return m
        }
    }
    // Target element not found, return -1
    return -1
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int binarySearch(List&lt;int&gt; nums, int target) {
  // Initialize closed interval [0, n-1], i.e., i, j point to the first and last elements of the array
  int i = 0, j = nums.length - 1;
  // Loop, exit when the search interval is empty (empty when i &gt; j)
  while (i &lt;= j) {
    int m = i + (j - i) ~/ 2; // Calculate the midpoint index m
    if (nums[m] &lt; target) {
      // This means target is in the interval [m+1, j]
      i = m + 1;
    } else if (nums[m] &gt; target) {
      // This means target is in the interval [i, m-1]
      j = m - 1;
    } else {
      // Found the target element, return its index
      return m;
    }
  }
  // Target element not found, return -1
  return -1;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def binary_search(nums: list[int], target: int) -&gt; int:
    """Tìm kiếm nhị phân (khoảng đóng)"""
    # Khởi tạo khoảng đóng [0, n-1], tức i, j trỏ tới phần tử đầu và cuối của mảng
    i, j = 0, len(nums) - 1
    # Lặp, thoát khi khoảng tìm kiếm rỗng (rỗng khi i &gt; j)
    while i &lt;= j:
        m = i + (j - i) // 2  # Tính chỉ mục giữa m
        if nums[m] &lt; target:
            i = m + 1  # target nằm trong khoảng [m+1, j]
        elif nums[m] &gt; target:
            j = m - 1  # target nằm trong khoảng [i, m-1]
        else:
            return m  # Đã tìm thấy target, trả về chỉ mục của nó
    return -1  # Không tìm thấy target, trả về -1
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm kiếm nhị phân (khoảng đóng cả hai đầu) */
int binarySearch(vector&lt;int&gt; &amp;nums, int target) {
    // Khởi tạo khoảng đóng [0, n-1], tức i, j trỏ tới phần tử đầu và cuối của mảng
    int i = 0, j = nums.size() - 1;
    // Lặp, thoát khi khoảng tìm kiếm rỗng (rỗng khi i &gt; j)
    while (i &lt;= j) {
        int m = i + (j - i) / 2; // Tính chỉ mục giữa m
        if (nums[m] &lt; target)    // target nằm trong khoảng [m+1, j]
            i = m + 1;
        else if (nums[m] &gt; target) // target nằm trong khoảng [i, m-1]
            j = m - 1;
        else // Đã tìm thấy target, trả về chỉ mục của nó
            return m;
    }
    // Không tìm thấy target, trả về -1
    return -1;
}
</code></pre></div></div></div>
<p><strong>Độ phức tạp thời gian là $O(\\log n)$</strong>: Trong vòng lặp tìm kiếm nhị phân, khoảng tìm kiếm giảm đi một nửa sau mỗi vòng, do đó số lần lặp là $\\log_2 n$.</p>
<p><strong>Độ phức tạp không gian là $O(1)$</strong>: Các con trỏ $i$ và $j$ sử dụng không gian với kích thước không đổi.</p>

<h2>10.1.2 Các cách biểu diễn khoảng</h2>
<p>Ngoài khoảng đóng đã đề cập ở trên, một cách biểu diễn khoảng phổ biến khác là khoảng "trái đóng phải mở" (left-closed right-open), được định nghĩa là $[0, n)$, nghĩa là biên trái được bao gồm trong khi biên phải bị loại trừ. Theo cách biểu diễn này, khoảng $[i, j)$ là rỗng khi $i = j$.</p>
<p>Ta có thể triển khai một thuật toán tìm kiếm nhị phân với chức năng tương tự dựa trên cách biểu diễn này:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Tìm kiếm nhị phân (khoảng trái đóng phải mở) */
static int binarySearchLCRO(int[] nums, int target) {
    // Khởi tạo khoảng trái đóng phải mở [0, n), tức i, j trỏ tới phần tử đầu và phần tử cuối+1
    int i = 0, j = nums.length;
    // Lặp, thoát khi khoảng tìm kiếm rỗng (rỗng khi i = j)
    while (i &lt; j) {
        int m = i + (j - i) / 2; // Tính chỉ mục giữa m
        if (nums[m] &lt; target) // target nằm trong khoảng [m+1, j)
            i = m + 1;
        else if (nums[m] &gt; target) // target nằm trong khoảng [i, m)
            j = m;
        else // Đã tìm thấy target, trả về chỉ mục của nó
            return m;
    }
    // Không tìm thấy target, trả về -1
    return -1;
}
</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func binarySearchLCRO(nums: [Int], target: Int) -&gt; Int {
    // Initialize left-closed right-open interval [0, n), i.e., i, j point to the first element and last element+1
    var i = nums.startIndex
    var j = nums.endIndex
    // Loop, exit when the search interval is empty (empty when i = j)
    while i &lt; j {
        let m = i + (j - i) / 2 // Calculate the midpoint index m
        if nums[m] &lt; target { // This means target is in the interval [m+1, j)
            i = m + 1
        } else if nums[m] &gt; target { // This means target is in the interval [i, m)
            j = m
        } else { // Found the target element, return its index
            return m
        }
    }
    // Target element not found, return -1
    return -1
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int binarySearchLCRO(List&lt;int&gt; nums, int target) {
  // Initialize left-closed right-open interval [0, n), i.e., i, j point to the first element and last element+1
  int i = 0, j = nums.length;
  // Loop, exit when the search interval is empty (empty when i = j)
  while (i &lt; j) {
    int m = i + (j - i) ~/ 2; // Calculate the midpoint index m
    if (nums[m] &lt; target) {
      // This means target is in the interval [m+1, j)
      i = m + 1;
    } else if (nums[m] &gt; target) {
      // This means target is in the interval [i, m)
      j = m;
    } else {
      // Found the target element, return its index
      return m;
    }
  }
  // Target element not found, return -1
  return -1;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def binary_search_lcro(nums: list[int], target: int) -&gt; int:
    """Tìm kiếm nhị phân (khoảng nửa đóng nửa mở, trái đóng phải mở)"""
    # Khởi tạo khoảng nửa đóng nửa mở [0, n), tức i, j trỏ tới phần tử đầu và phần tử cuối+1
    i, j = 0, len(nums)
    # Lặp, thoát khi khoảng tìm kiếm rỗng (rỗng khi i = j)
    while i &lt; j:
        m = (i + j) // 2  # Tính chỉ mục giữa m
        if nums[m] &lt; target:
            i = m + 1  # target nằm trong khoảng [m+1, j)
        elif nums[m] &gt; target:
            j = m  # target nằm trong khoảng [i, m)
        else:
            return m  # Đã tìm thấy target, trả về chỉ mục của nó
    return -1  # Không tìm thấy target, trả về -1
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm kiếm nhị phân (khoảng trái đóng phải mở) */
int binarySearchLCRO(vector&lt;int&gt; &amp;nums, int target) {
    // Khởi tạo khoảng trái đóng phải mở [0, n), tức i, j trỏ tới phần tử đầu và phần tử cuối+1
    int i = 0, j = nums.size();
    // Lặp, thoát khi khoảng tìm kiếm rỗng (rỗng khi i = j)
    while (i &lt; j) {
        int m = i + (j - i) / 2; // Tính chỉ mục giữa m
        if (nums[m] &lt; target)    // target nằm trong khoảng [m+1, j)
            i = m + 1;
        else if (nums[m] &gt; target) // target nằm trong khoảng [i, m)
            j = m;
        else // Đã tìm thấy target, trả về chỉ mục của nó
            return m;
    }
    // Không tìm thấy target, trả về -1
    return -1;
}
</code></pre></div></div></div>
<p>Như hình minh họa bên dưới, dưới hai cách biểu diễn khoảng, việc khởi tạo, điều kiện lặp, và thao tác thu hẹp khoảng của thuật toán tìm kiếm nhị phân đều khác nhau.</p>
<p>Do cả biên trái và biên phải trong biểu diễn "khoảng đóng" đều được định nghĩa là đóng, các thao tác thu hẹp khoảng thông qua con trỏ $i$ và $j$ cũng đối xứng với nhau. Điều này khiến nó ít gây lỗi hơn, <strong>vì vậy cách tiếp cận "khoảng đóng" thường được khuyến nghị sử dụng</strong>.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_search_ranges.png" alt="Hai cách định nghĩa khoảng" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>10.1.3 Ưu điểm và Hạn chế</h2>
<p>Tìm kiếm nhị phân có hiệu suất tốt cả về thời gian lẫn không gian.</p>
<ul>
  <li>Tìm kiếm nhị phân có hiệu quả thời gian cao. Với khối lượng dữ liệu lớn, độ phức tạp thời gian logarit có ưu thế đáng kể. Ví dụ, khi kích thước dữ liệu $n = 2^{20}$, tìm kiếm tuyến tính cần $2^{20} = 1048576$ lần lặp, trong khi tìm kiếm nhị phân chỉ cần $\\log_2 2^{20} = 20$ lần lặp.</li>
  <li>Tìm kiếm nhị phân không cần thêm không gian. So với các thuật toán tìm kiếm cần thêm không gian (như tìm kiếm dựa trên hash), tìm kiếm nhị phân tiết kiệm không gian hơn.</li>
</ul>
<p>Tuy nhiên, tìm kiếm nhị phân không phù hợp với mọi tình huống, chủ yếu vì các lý do sau:</p>
<ul>
  <li>Tìm kiếm nhị phân chỉ áp dụng được cho dữ liệu <strong>đã được sắp xếp</strong>. Nếu dữ liệu đầu vào chưa được sắp xếp, việc sắp xếp riêng để dùng tìm kiếm nhị phân sẽ phản tác dụng, vì các thuật toán sắp xếp thường có độ phức tạp thời gian $O(n \\log n)$, cao hơn cả tìm kiếm tuyến tính lẫn tìm kiếm nhị phân. Với các trường hợp thường xuyên chèn phần tử, việc duy trì mảng đã sắp xếp đòi hỏi chèn phần tử vào vị trí cụ thể với độ phức tạp thời gian $O(n)$, cũng rất tốn kém.</li>
  <li>Tìm kiếm nhị phân chỉ áp dụng được cho <strong>Mảng (Array)</strong>. Tìm kiếm nhị phân yêu cầu truy cập phần tử không liên tục, theo kiểu nhảy cóc, và kiểu truy cập này kém hiệu quả trong danh sách liên kết, khiến nó không phù hợp với danh sách liên kết hoặc các cấu trúc dữ liệu dựa trên danh sách liên kết.</li>
  <li>Với khối lượng dữ liệu nhỏ, tìm kiếm tuyến tính hoạt động tốt hơn. Trong tìm kiếm tuyến tính, mỗi vòng chỉ cần 1 phép so sánh; trong khi tìm kiếm nhị phân cần 1 phép cộng, 1 phép chia, 1-3 phép so sánh, và 1 phép cộng (trừ), tổng cộng 4-6 đơn vị phép toán. Do đó, khi khối lượng dữ liệu $n$ nhỏ, tìm kiếm tuyến tính thực sự nhanh hơn tìm kiếm nhị phân.</li>
</ul>

<h2>10.1.4 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="binary-search-ops-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'binary-search-ops-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'binary-search-ops-wrapper', 'tab-interactive'); initBinarySearchOpsDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem từng bước tìm kiếm nhị phân với mảng <code>[1, 3, 6, 8, 12, 15, 23, 26, 31, 35]</code>, target = <code>6</code> (giống ví dụ mã nguồn thực tế).</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="binary-search-ops-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="binary-search-ops-btn-autorun" class="control-btn" onclick="autoRunBinarySearchOps()">▶ Auto Run</button>
      <button id="binary-search-ops-btn-step" class="control-btn btn-secondary" onclick="stepBinarySearchOps()">Bước tiếp theo ▶</button>
      <button id="binary-search-ops-btn-pause" class="control-btn btn-secondary" onclick="pauseRunBinarySearchOps()" disabled>⏸ Dừng</button>
      <button id="binary-search-ops-btn-reset" class="control-btn btn-secondary" onclick="initBinarySearchOpsDemo()">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="400" max="2000" value="900" step="200" oninput="setBinarySearchOpsSpeed(this.value)" /> <span id="binary-search-ops-speed-label">900ms</span>
    </div>
    <div id="binary-search-ops-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>
`,
    originalContent: `# Binary Search

<u>Binary search</u> is an efficient search algorithm based on the divide-and-conquer strategy. It leverages the sorted order of the data to reduce the search range by half in each round until the target element is found or the search interval becomes empty.

!!! question

    Given an array \`nums\` of length $n$ with elements arranged in ascending order and no duplicates, search for and return the index of element \`target\` in the array. If the array does not contain the element, return $-1$. An example is shown in the figure below.

![Binary search example data](binary_search.assets/binary_search_example.png)

As shown in the figure below, we first initialize pointers $i = 0$ and $j = n - 1$, pointing to the first and last elements of the array respectively, representing the search interval $[0, n - 1]$. Note that square brackets denote a closed interval, which includes the boundary values themselves.

Next, perform the following two steps in a loop:

1. Calculate the midpoint index $m = \\lfloor {(i + j) / 2} \\rfloor$, where $\\lfloor \\: \\rfloor$ denotes the floor operation.
2. Compare \`nums[m]\` and \`target\`, which results in three cases:
    1. When \`nums[m] < target\`, it indicates that \`target\` is in the interval $[m + 1, j]$, so execute $i = m + 1$.
    2. When \`nums[m] > target\`, it indicates that \`target\` is in the interval $[i, m - 1]$, so execute $j = m - 1$.
    3. When \`nums[m] = target\`, it indicates that \`target\` has been found, so return index $m$.

If the array does not contain the target element, the search interval will eventually become empty. In this case, return $-1$.

=== "<1>"
    ![Binary search process](binary_search.assets/binary_search_step1.png)

=== "<2>"
    ![binary_search_step2](binary_search.assets/binary_search_step2.png)

=== "<3>"
    ![binary_search_step3](binary_search.assets/binary_search_step3.png)

=== "<4>"
    ![binary_search_step4](binary_search.assets/binary_search_step4.png)

=== "<5>"
    ![binary_search_step5](binary_search.assets/binary_search_step5.png)

=== "<6>"
    ![binary_search_step6](binary_search.assets/binary_search_step6.png)

=== "<7>"
    ![binary_search_step7](binary_search.assets/binary_search_step7.png)

It's worth noting that since both $i$ and $j$ are of \`int\` type, **$i + j$ may exceed the range of the \`int\` type**. To avoid integer overflow, we typically use the formula $m = \\lfloor {i + (j - i) / 2} \\rfloor$ to calculate the midpoint.

The code is shown below:

\`\`\`src
[file]{binary_search}-[class]{}-[func]{binary_search}
\`\`\`

**Time complexity is $O(\\log n)$**: In the binary search loop, the interval is reduced by half each round, so the number of iterations is $\\log_2 n$.

**Space complexity is $O(1)$**: Pointers $i$ and $j$ use constant-size space.

## Interval Representation Methods

In addition to the closed interval mentioned above, another common interval representation is the "left-closed right-open" interval, defined as $[0, n)$, meaning that the left boundary is inclusive while the right boundary is exclusive. Under this representation, the interval $[i, j)$ is empty when $i = j$.

We can implement a binary search algorithm with the same functionality based on this representation:

\`\`\`src
[file]{binary_search}-[class]{}-[func]{binary_search_lcro}
\`\`\`

As shown in the figure below, under the two interval representations, the initialization, loop condition, and interval narrowing operations of the binary search algorithm are all different.

Since both the left and right boundaries in the "closed interval" representation are defined as closed, the operations to narrow the interval through pointers $i$ and $j$ are also symmetric. This makes it less error-prone, **so the "closed interval" approach is generally recommended**.

![Two interval definitions](binary_search.assets/binary_search_ranges.png)

## Advantages and Limitations

Binary search offers good performance in both time and space.

- Binary search has high time efficiency. With large data volumes, the logarithmic time complexity has significant advantages. For example, when the data size $n = 2^{20}$, linear search requires $2^{20} = 1048576$ iterations, while binary search only needs $\\log_2 2^{20} = 20$ iterations.
- Binary search requires no extra space. Compared to searching algorithms that require additional space (such as hash-based search), binary search is more space-efficient.

However, binary search is not suitable for all situations, mainly for the following reasons:

- Binary search is only applicable to sorted data. If the input data is unsorted, sorting specifically to use binary search would be counterproductive, as sorting algorithms typically have a time complexity of $O(n \\log n)$, which is higher than both linear search and binary search. For scenarios with frequent element insertions, keeping the array sorted requires inserting elements at specific positions with a time complexity of $O(n)$, which is also very expensive.
- Binary search is only applicable to arrays. Binary search requires non-contiguous, jump-style access to elements, and this kind of access is inefficient in linked lists, making it unsuitable for linked lists or linked-list-based data structures.
- For small data volumes, linear search performs better. In linear search, each round requires only 1 comparison operation; while in binary search, it requires 1 addition, 1 division, 1-3 comparison operations, and 1 addition (subtraction), totaling 4-6 unit operations. Therefore, when the data volume $n$ is small, linear search is actually faster than binary search.
`
  },

  'dsa-binary-search-insertion': {
    title: '10.2 Vị trí chèn trong Tìm kiếm Nhị phân',
    summary: 'Ứng dụng Binary Search để tìm vị trí thích hợp chèn một phần tử mới vào mảng đã sắp xếp. Xử lý trường hợp mảng có phần tử trùng lặp.',
    tags: ['dsa', 'searching', 'binary-search', 'insertion'],
    domain: 'Algorithms',
    module: 'Chương 10: Tìm kiếm',
    prerequisites: ['dsa-binary-search'],
    related: ['dsa-binary-search-edge'],
    updatedAt: '2026-07-19',
    readTime: '10 phút',
    content: `
<p>Tìm kiếm nhị phân không chỉ có thể dùng để tìm kiếm phần tử mục tiêu, mà còn có thể giải quyết nhiều bài toán biến thể, chẳng hạn như tìm vị trí chèn của một phần tử mục tiêu.</p>

<h2>10.2.1 Trường hợp không có phần tử trùng lặp</h2>
<div class="callout callout-question">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một mảng <code>nums</code> đã sắp xếp có độ dài $n$ và một phần tử <code>target</code>, trong đó mảng không có phần tử trùng lặp. Hãy chèn <code>target</code> vào <code>nums</code> sao cho vẫn giữ được thứ tự sắp xếp. Nếu <code>target</code> đã tồn tại trong mảng, chèn nó vào bên trái. Trả về chỉ mục của <code>target</code> sau khi chèn. Ví dụ minh họa bên dưới.</p>
  </div>
</div>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_search_insertion_example.png" alt="Ví dụ dữ liệu vị trí chèn Tìm kiếm nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Nếu muốn tái sử dụng đoạn mã tìm kiếm nhị phân ở bài trước, ta cần trả lời hai câu hỏi sau.</p>
<p><strong>Câu hỏi 1</strong>: Khi mảng chứa <code>target</code>, chỉ mục vị trí chèn có giống với chỉ mục của phần tử đó không?</p>
<p>Bài toán yêu cầu chèn <code>target</code> vào bên trái các phần tử bằng nó, nghĩa là <code>target</code> mới được chèn sẽ thay thế vị trí của <code>target</code> gốc. Nói cách khác, <strong>khi mảng chứa <code>target</code>, chỉ mục vị trí chèn chính là chỉ mục của <code>target</code> đó</strong>.</p>
<p><strong>Câu hỏi 2</strong>: Khi mảng không chứa <code>target</code>, chỉ mục vị trí chèn là gì?</p>
<p>Để phân tích sâu hơn, hãy xem xét quá trình tìm kiếm nhị phân: khi <code>nums[m] &lt; target</code>, $i$ di chuyển, nghĩa là con trỏ $i$ đang tiến gần tới các phần tử lớn hơn hoặc bằng <code>target</code>. Tương tự, con trỏ $j$ luôn tiến gần tới các phần tử nhỏ hơn hoặc bằng <code>target</code>.</p>
<p>Do đó, khi tìm kiếm nhị phân kết thúc, $i$ chắc chắn trỏ tới phần tử đầu tiên lớn hơn <code>target</code>, và $j$ chắc chắn trỏ tới phần tử đầu tiên nhỏ hơn <code>target</code>. <strong>Từ đó suy ra, khi mảng không chứa <code>target</code>, chỉ mục chèn chính là $i$</strong>. Đoạn mã minh họa như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Tìm kiếm nhị phân vị trí chèn (không có phần tử trùng lặp) */
static int binarySearchInsertionSimple(int[] nums, int target) {
    int i = 0, j = nums.length - 1; // Khởi tạo khoảng đóng [0, n-1]
    while (i &lt;= j) {
        int m = i + (j - i) / 2; // Tính chỉ mục giữa m
        if (nums[m] &lt; target) {
            i = m + 1; // target nằm trong khoảng [m+1, j]
        } else if (nums[m] &gt; target) {
            j = m - 1; // target nằm trong khoảng [i, m-1]
        } else {
            return m; // Tìm thấy target, trả về vị trí chèn m
        }
    }
    // Không tìm thấy target, trả về vị trí chèn i
    return i;
}
</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func binarySearchInsertionSimple(nums: [Int], target: Int) -&gt; Int {
    // Initialize closed interval [0, n-1]
    var i = nums.startIndex
    var j = nums.endIndex - 1
    while i &lt;= j {
        let m = i + (j - i) / 2 // Calculate the midpoint index m
        if nums[m] &lt; target {
            i = m + 1 // target is in the interval [m+1, j]
        } else if nums[m] &gt; target {
            j = m - 1 // target is in the interval [i, m-1]
        } else {
            return m // Found target, return insertion point m
        }
    }
    // Target not found, return insertion point i
    return i
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int binarySearchInsertionSimple(List&lt;int&gt; nums, int target) {
  int i = 0, j = nums.length - 1; // Initialize closed interval [0, n-1]
  while (i &lt;= j) {
    int m = i + (j - i) ~/ 2; // Calculate the midpoint index m
    if (nums[m] &lt; target) {
      i = m + 1; // target is in the interval [m+1, j]
    } else if (nums[m] &gt; target) {
      j = m - 1; // target is in the interval [i, m-1]
    } else {
      return m; // Found target, return insertion point m
    }
  }
  // Target not found, return insertion point i
  return i;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def binary_search_insertion_simple(nums: list[int], target: int) -&gt; int:
    """Tìm kiếm nhị phân vị trí chèn (không có phần tử trùng lặp)"""
    i, j = 0, len(nums) - 1  # Khởi tạo khoảng đóng [0, n-1]
    while i &lt;= j:
        m = i + (j - i) // 2  # Tính chỉ mục giữa m
        if nums[m] &lt; target:
            i = m + 1  # target nằm trong khoảng [m+1, j]
        elif nums[m] &gt; target:
            j = m - 1  # target nằm trong khoảng [i, m-1]
        else:
            return m  # Tìm thấy target, trả về vị trí chèn m
    # Không tìm thấy target, trả về vị trí chèn i
    return i
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm kiếm nhị phân vị trí chèn (không có phần tử trùng lặp) */
int binarySearchInsertionSimple(vector&lt;int&gt; &amp;nums, int target) {
    int i = 0, j = nums.size() - 1; // Khởi tạo khoảng đóng [0, n-1]
    while (i &lt;= j) {
        int m = i + (j - i) / 2; // Tính chỉ mục giữa m
        if (nums[m] &lt; target) {
            i = m + 1; // target nằm trong khoảng [m+1, j]
        } else if (nums[m] &gt; target) {
            j = m - 1; // target nằm trong khoảng [i, m-1]
        } else {
            return m; // Tìm thấy target, trả về vị trí chèn m
        }
    }
    // Không tìm thấy target, trả về vị trí chèn i
    return i;
}
</code></pre></div></div></div>
<h2>10.2.2 Trường hợp có phần tử trùng lặp</h2>
<div class="callout callout-question">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Dựa trên bài toán trước, giả sử mảng có thể chứa các phần tử trùng lặp, mọi thứ khác giữ nguyên.</p>
  </div>
</div>
<p>Giả sử có nhiều phần tử <code>target</code> trong mảng. Tìm kiếm nhị phân thông thường chỉ có thể trả về chỉ mục của một <code>target</code> bất kỳ, <strong>và không thể xác định có bao nhiêu phần tử <code>target</code> nằm bên trái và bên phải phần tử đó</strong>.</p>
<p>Bài toán yêu cầu chèn phần tử mục tiêu vào vị trí ngoài cùng bên trái, <strong>vì vậy ta cần tìm chỉ mục của <code>target</code> ngoài cùng bên trái trong mảng</strong>. Một cách tiếp cận trực tiếp ban đầu là làm theo các bước như hình bên dưới:</p>
<ol>
  <li>Thực hiện tìm kiếm nhị phân để lấy chỉ mục của một <code>target</code> bất kỳ, ký hiệu là $k$.</li>
  <li>Bắt đầu từ chỉ mục $k$, thực hiện duyệt tuyến tính sang trái, và trả về khi tìm thấy <code>target</code> ngoài cùng bên trái.</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_search_insertion_naive.png" alt="Tìm kiếm tuyến tính vị trí chèn khi có phần tử trùng lặp" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Mặc dù cách này hoạt động, nhưng nó bao gồm tìm kiếm tuyến tính, dẫn tới độ phức tạp thời gian $O(n)$. Khi mảng chứa nhiều phần tử <code>target</code> trùng lặp, cách này rất kém hiệu quả.</p>
<p>Bây giờ hãy xem xét việc mở rộng đoạn mã tìm kiếm nhị phân. Như hình bên dưới, quy trình tổng thể vẫn giữ nguyên: trong mỗi vòng lặp, đầu tiên ta tính chỉ mục giữa $m$, sau đó so sánh <code>target</code> với <code>nums[m]</code>, dẫn tới các trường hợp sau:</p>
<ul>
  <li>Khi <code>nums[m] &lt; target</code> hoặc <code>nums[m] &gt; target</code>, nghĩa là chưa tìm thấy <code>target</code>, do đó sử dụng thao tác thu hẹp khoảng tiêu chuẩn của tìm kiếm nhị phân để <strong>đưa con trỏ $i$ và $j$ tiến gần hơn tới <code>target</code></strong>.</li>
  <li>Khi <code>nums[m] == target</code>, nghĩa là các phần tử nhỏ hơn <code>target</code> nằm trong khoảng $[i, m - 1]$, do đó dùng $j = m - 1$ để thu hẹp khoảng, từ đó <strong>đưa con trỏ $j$ tiến gần hơn tới các phần tử nhỏ hơn <code>target</code></strong>.</li>
</ul>
<p>Sau khi vòng lặp hoàn tất, $i$ trỏ tới <code>target</code> ngoài cùng bên trái, và $j$ trỏ tới phần tử đầu tiên nhỏ hơn <code>target</code>, <strong>do đó chỉ mục $i$ chính là vị trí chèn</strong>.</p>

<div class="interactive-widget-wrapper" id="binary-search-insertion-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img loading="lazy" src="dsa-assets/binary_search_insertion_step1.png" alt="Bước 1" style="max-width:100%;" /><p class="slide-caption">Khởi tạo $i$, $j$ lần lượt trỏ tới phần tử đầu và cuối của mảng, đại diện cho khoảng đóng $[i, j]$.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_insertion_step2.png" alt="Bước 2" style="max-width:100%;" /><p class="slide-caption">Tính chỉ mục giữa $m = (i + j) / 2 = 4$.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_insertion_step3.png" alt="Bước 3" style="max-width:100%;" /><p class="slide-caption">Vì <code>nums[m] == target</code> (6 == 6) nên thực hiện $j = m - 1 = 3$ để tiếp tục thu hẹp về bên trái.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_insertion_step4.png" alt="Bước 4" style="max-width:100%;" /><p class="slide-caption">Tính chỉ mục giữa $m = (i + j) / 2 = 1$.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_insertion_step5.png" alt="Bước 5" style="max-width:100%;" /><p class="slide-caption">Vì <code>nums[m] &lt; target</code> (3 &lt; 6) nên thực hiện $i = m + 1 = 2$.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_insertion_step6.png" alt="Bước 6" style="max-width:100%;" /><p class="slide-caption">Tính chỉ mục giữa $m = (i + j) / 2 = 2$.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_insertion_step7.png" alt="Bước 7" style="max-width:100%;" /><p class="slide-caption">Vì <code>nums[m] == target</code> (6 == 6) nên thực hiện $j = m - 1 = 1$ để tiếp tục thu hẹp.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/binary_search_insertion_step8.png" alt="Bước 8" style="max-width:100%;" /><p class="slide-caption">Không còn thỏa điều kiện lặp $i \\le j$ (vì $i=2 &gt; j=1$). Thoát vòng lặp, trả về chỉ mục $i = 2$ — đây chính là vị trí chèn.</p></div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('binary-search-insertion-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 8</span>
      <button class="slider-btn" onclick="nextSlide('binary-search-insertion-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>

<p>Quan sát đoạn mã sau: hai nhánh <code>nums[m] &gt; target</code> và <code>nums[m] == target</code> thực hiện cùng một thao tác, nên có thể gộp lại.</p>
<p>Dù vậy, ta vẫn có thể giữ nguyên các nhánh điều kiện tách biệt, vì logic sẽ rõ ràng và dễ đọc hơn.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Tìm kiếm nhị phân vị trí chèn (có phần tử trùng lặp) */
static int binarySearchInsertion(int[] nums, int target) {
    int i = 0, j = nums.length - 1; // Khởi tạo khoảng đóng [0, n-1]
    while (i &lt;= j) {
        int m = i + (j - i) / 2; // Tính chỉ mục giữa m
        if (nums[m] &lt; target) {
            i = m + 1; // target nằm trong khoảng [m+1, j]
        } else if (nums[m] &gt; target) {
            j = m - 1; // target nằm trong khoảng [i, m-1]
        } else {
            j = m - 1; // Phần tử đầu tiên nhỏ hơn target nằm trong khoảng [i, m-1]
        }
    }
    // Trả về vị trí chèn i
    return i;
}
</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int binarySearchInsertion(List&lt;int&gt; nums, int target) {
  int i = 0, j = nums.length - 1; // Initialize closed interval [0, n-1]
  while (i &lt;= j) {
    int m = i + (j - i) ~/ 2; // Calculate the midpoint index m
    if (nums[m] &lt; target) {
      i = m + 1; // target is in the interval [m+1, j]
    } else if (nums[m] &gt; target) {
      j = m - 1; // target is in the interval [i, m-1]
    } else {
      j = m - 1; // The first element less than target is in the interval [i, m-1]
    }
  }
  // Return insertion point i
  return i;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def binary_search_insertion(nums: list[int], target: int) -&gt; int:
    """Tìm kiếm nhị phân vị trí chèn (có phần tử trùng lặp)"""
    i, j = 0, len(nums) - 1  # Khởi tạo khoảng đóng [0, n-1]
    while i &lt;= j:
        m = i + (j - i) // 2  # Tính chỉ mục giữa m
        if nums[m] &lt; target:
            i = m + 1  # target nằm trong khoảng [m+1, j]
        elif nums[m] &gt; target:
            j = m - 1  # target nằm trong khoảng [i, m-1]
        else:
            j = m - 1  # Phần tử đầu tiên nhỏ hơn target nằm trong khoảng [i, m-1]
    # Trả về vị trí chèn i
    return i
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm kiếm nhị phân vị trí chèn (có phần tử trùng lặp) */
int binarySearchInsertion(vector&lt;int&gt; &amp;nums, int target) {
    int i = 0, j = nums.size() - 1; // Khởi tạo khoảng đóng [0, n-1]
    while (i &lt;= j) {
        int m = i + (j - i) / 2; // Tính chỉ mục giữa m
        if (nums[m] &lt; target) {
            i = m + 1; // target nằm trong khoảng [m+1, j]
        } else if (nums[m] &gt; target) {
            j = m - 1; // target nằm trong khoảng [i, m-1]
        } else {
            j = m - 1; // Phần tử đầu tiên nhỏ hơn target nằm trong khoảng [i, m-1]
        }
    }
    // Trả về vị trí chèn i
    return i;
}
</code></pre></div></div></div>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Đoạn mã trong bài này sử dụng xuyên suốt cách tiếp cận "khoảng đóng". Bạn đọc quan tâm có thể tự triển khai theo cách "trái đóng phải mở".</p>
  </div>
</div>
<p>Nhìn chung, tìm kiếm nhị phân về bản chất chỉ đơn giản là việc thiết lập các mục tiêu tìm kiếm riêng biệt cho con trỏ $i$ và $j$. Mục tiêu đó có thể là một phần tử cụ thể (như <code>target</code>) hoặc một phạm vi phần tử (như các phần tử nhỏ hơn <code>target</code>).</p>
<p>Ở mỗi vòng lặp của tìm kiếm nhị phân, con trỏ $i$ và $j$ dần tiến gần tới mục tiêu đã đặt ra từ trước. Cuối cùng, chúng hoặc tìm ra đáp án, hoặc dừng lại sau khi vượt qua ranh giới của nhau.</p>
`,
    originalContent: `# Binary Search Insertion Point

Binary search can be used not only to search for target elements, but also to solve many variant problems, such as finding the insertion position of a target element.

## Case Without Duplicate Elements

!!! question

    Given a sorted array \`nums\` of length $n$ and an element \`target\`, where the array contains no duplicate elements, insert \`target\` into \`nums\` while maintaining its sorted order. If \`target\` already exists in the array, insert it to its left. Return the index of \`target\` after insertion. An example is shown below.

![Binary search insertion point example data](binary_search_insertion.assets/binary_search_insertion_example.png)

If we want to reuse the binary search code from the previous section, we need to answer the following two questions.

**Question 1**: When the array contains \`target\`, is the insertion point index the same as that element's index?

The problem requires inserting \`target\` to the left of equal elements, which means the newly inserted \`target\` replaces the position of the original \`target\`. In other words, **when the array contains \`target\`, the insertion point index is the index of that \`target\`**.

**Question 2**: When the array does not contain \`target\`, what is the insertion point index?

To analyze this further, consider the binary search process: when \`nums[m] < target\`, $i$ moves, meaning that pointer $i$ is approaching elements greater than or equal to \`target\`. Similarly, pointer $j$ is always approaching elements less than or equal to \`target\`.

Therefore, when the binary search ends, $i$ must point to the first element greater than \`target\`, and $j$ must point to the first element less than \`target\`. **It follows that when the array does not contain \`target\`, the insertion index is $i$**. The code is shown below:

\`\`\`src
[file]{binary_search_insertion}-[class]{}-[func]{binary_search_insertion_simple}
\`\`\`

## Case with Duplicate Elements

!!! question

    Based on the previous problem, assume the array may contain duplicate elements, with everything else remaining the same.

Suppose there are multiple \`target\` elements in the array. Ordinary binary search can only return the index of one \`target\`, **and cannot determine how many \`target\` elements are to the left and right of that element**.

The problem requires inserting the target element at the leftmost position, **so we need to find the index of the leftmost \`target\` in the array**. A straightforward initial approach is to follow the steps shown in the figure below:

1. Perform binary search to obtain the index of any \`target\`, denoted as $k$.
2. Starting from index $k$, perform linear traversal to the left, and return when the leftmost \`target\` is found.

![Linear search for insertion point of duplicate elements](binary_search_insertion.assets/binary_search_insertion_naive.png)

Although this method works, it includes linear search, resulting in a time complexity of $O(n)$. When the array contains many duplicate \`target\` elements, this method is very inefficient.

Now consider extending the binary search code. As shown in the figure below, the overall process remains unchanged: in each iteration, we first compute the midpoint index $m$, then compare \`target\` with \`nums[m]\`, leading to the following cases:

- When \`nums[m] < target\` or \`nums[m] > target\`, it means \`target\` has not been found yet, so use the standard interval-shrinking operation of binary search to **move pointers $i$ and $j$ closer to \`target\`**.
- When \`nums[m] == target\`, it means elements less than \`target\` are in the interval $[i, m - 1]$, so use $j = m - 1$ to shrink the interval, thereby **moving pointer $j$ closer to elements less than \`target\`**.

After the loop completes, $i$ points to the leftmost \`target\`, and $j$ points to the first element less than \`target\`, **so index $i$ is the insertion point**.

=== "<1>"
    ![Steps for binary search insertion point of duplicate elements](binary_search_insertion.assets/binary_search_insertion_step1.png)

=== "<2>"
    ![binary_search_insertion_step2](binary_search_insertion.assets/binary_search_insertion_step2.png)

=== "<3>"
    ![binary_search_insertion_step3](binary_search_insertion.assets/binary_search_insertion_step3.png)

=== "<4>"
    ![binary_search_insertion_step4](binary_search_insertion.assets/binary_search_insertion_step4.png)

=== "<5>"
    ![binary_search_insertion_step5](binary_search_insertion.assets/binary_search_insertion_step5.png)

=== "<6>"
    ![binary_search_insertion_step6](binary_search_insertion.assets/binary_search_insertion_step6.png)

=== "<7>"
    ![binary_search_insertion_step7](binary_search_insertion.assets/binary_search_insertion_step7.png)

=== "<8>"
    ![binary_search_insertion_step8](binary_search_insertion.assets/binary_search_insertion_step8.png)

Observe the following code: the branches \`nums[m] > target\` and \`nums[m] == target\` perform the same operation, so they can be merged.

Even so, we can still keep the conditional branches expanded, as the logic is clearer and more readable.

\`\`\`src
[file]{binary_search_insertion}-[class]{}-[func]{binary_search_insertion}
\`\`\`

!!! tip

    The code in this section uses the "closed interval" approach throughout. Interested readers can implement the "left-closed, right-open" approach themselves.

Overall, binary search is simply a matter of setting separate search targets for pointers $i$ and $j$. The target may be a specific element (such as \`target\`) or a range of elements (such as elements less than \`target\`).

With each iteration of binary search, pointers $i$ and $j$ gradually approach their preset targets. Ultimately, they either find the answer or stop after crossing the boundary.
`
  },

  'dsa-binary-search-edge': {
    title: '10.3 Tìm kiếm Biên (Boundary Search)',
    summary: 'Cách ứng dụng Binary Search để tìm ranh giới trái (phần tử đầu tiên) và ranh giới phải (phần tử cuối cùng) của một giá trị trong mảng có nhiều phần tử trùng lặp.',
    tags: ['dsa', 'searching', 'binary-search', 'boundary'],
    domain: 'Algorithms',
    module: 'Chương 10: Tìm kiếm',
    prerequisites: ['dsa-binary-search-insertion'],
    related: ['dsa-hash-optimization'],
    updatedAt: '2026-07-19',
    readTime: '8 phút',
    content: `
<h2>10.3.1 Tìm Ranh giới Trái (Left Boundary)</h2>
<div class="callout callout-question">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một mảng <code>nums</code> đã sắp xếp có độ dài $n$, có thể chứa các phần tử trùng lặp, hãy trả về chỉ mục xuất hiện ngoài cùng bên trái của <code>target</code>. Nếu mảng không chứa <code>target</code>, trả về $-1$.</p>
  </div>
</div>
<p>Nhớ lại phương pháp tìm vị trí chèn bằng tìm kiếm nhị phân. Sau khi tìm kiếm hoàn tất, $i$ trỏ tới <code>target</code> ngoài cùng bên trái, <strong>vì vậy việc tìm vị trí chèn về bản chất chính là tìm chỉ mục của <code>target</code> ngoài cùng bên trái</strong>.</p>
<p>Xem xét việc triển khai tìm kiếm ranh giới trái bằng hàm tìm vị trí chèn. Lưu ý rằng mảng có thể không chứa <code>target</code>, điều này có thể dẫn tới hai trường hợp sau:</p>
<ul>
  <li>Chỉ mục vị trí chèn $i$ nằm ngoài phạm vi mảng.</li>
  <li>Phần tử <code>nums[i]</code> không bằng <code>target</code>.</li>
</ul>
<p>Khi một trong hai tình huống này xảy ra, chỉ cần trả về $-1$. Đoạn mã minh họa như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Tìm kiếm nhị phân ranh giới trái nhất của target */
static int binarySearchLeftEdge(int[] nums, int target) {
    // Tương đương với việc tìm vị trí chèn của target
    int i = binary_search_insertion.binarySearchInsertion(nums, target);
    // Không tìm thấy target, trả về -1
    if (i == nums.length || nums[i] != target) {
        return -1;
    }
    // Tìm thấy target, trả về chỉ mục i
    return i;
}
</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func binarySearchLeftEdge(nums: [Int], target: Int) -&gt; Int {
    // Equivalent to finding the insertion point of target
    let i = binarySearchInsertion(nums: nums, target: target)
    // Target not found, return -1
    if i == nums.endIndex || nums[i] != target {
        return -1
    }
    // Found target, return index i
    return i
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int binarySearchLeftEdge(List&lt;int&gt; nums, int target) {
  // Equivalent to finding the insertion point of target
  int i = binarySearchInsertion(nums, target);
  // Target not found, return -1
  if (i == nums.length || nums[i] != target) {
    return -1;
  }
  // Found target, return index i
  return i;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def binary_search_left_edge(nums: list[int], target: int) -&gt; int:
    """Tìm kiếm nhị phân ranh giới trái nhất của target"""
    # Tương đương với việc tìm vị trí chèn của target
    i = binary_search_insertion(nums, target)
    # Không tìm thấy target, trả về -1
    if i == len(nums) or nums[i] != target:
        return -1
    # Tìm thấy target, trả về chỉ mục i
    return i
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm kiếm nhị phân ranh giới trái nhất của target */
int binarySearchLeftEdge(vector&lt;int&gt; &amp;nums, int target) {
    // Tương đương với việc tìm vị trí chèn của target
    int i = binarySearchInsertion(nums, target);
    // Không tìm thấy target, trả về -1
    if (i == nums.size() || nums[i] != target) {
        return -1;
    }
    // Tìm thấy target, trả về chỉ mục i
    return i;
}
</code></pre></div></div></div>
<h2>10.3.2 Tìm Ranh giới Phải (Right Boundary)</h2>
<p>Vậy làm sao để tìm <code>target</code> ngoài cùng bên phải? Cách trực tiếp nhất là sửa đoạn mã và thay thế thao tác thu hẹp con trỏ trong trường hợp <code>nums[m] == target</code>. Đoạn mã này được lược bỏ ở đây; bạn đọc quan tâm có thể tự triển khai.</p>
<p>Dưới đây chúng ta giới thiệu hai cách tiếp cận khéo léo hơn.</p>

<h3>10.3.2.1 Tái sử dụng Tìm kiếm Ranh giới Trái</h3>
<p>Thực tế, ta có thể dùng hàm tìm <code>target</code> ngoài cùng bên trái để tìm <code>target</code> ngoài cùng bên phải. Phương pháp cụ thể là: <strong>chuyển bài toán tìm <code>target</code> ngoài cùng bên phải thành tìm <code>target + 1</code> ngoài cùng bên trái</strong>.</p>
<p>Như hình minh họa bên dưới, sau khi tìm kiếm hoàn tất, con trỏ $i$ trỏ tới <code>target + 1</code> ngoài cùng bên trái (nếu tồn tại), trong khi $j$ trỏ tới <code>target</code> ngoài cùng bên phải, <strong>do đó ta có thể trả về $j$</strong>.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_search_right_edge_by_left_edge.png" alt="Chuyển đổi tìm ranh giới phải thành tìm ranh giới trái" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Lưu ý rằng vị trí chèn trả về là $i$, nên ta cần trừ đi $1$ để có được $j$:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Tìm kiếm nhị phân ranh giới phải nhất của target */
static int binarySearchRightEdge(int[] nums, int target) {
    // Chuyển thành tìm ranh giới trái nhất của target + 1
    int i = binary_search_insertion.binarySearchInsertion(nums, target + 1);
    // j trỏ tới target phải nhất, i trỏ tới phần tử đầu tiên lớn hơn target
    int j = i - 1;
    // Không tìm thấy target, trả về -1
    if (j == -1 || nums[j] != target) {
        return -1;
    }
    // Tìm thấy target, trả về chỉ mục j
    return j;
}
</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func binarySearchRightEdge(nums: [Int], target: Int) -&gt; Int {
    // Convert to finding the leftmost target + 1
    let i = binarySearchInsertion(nums: nums, target: target + 1)
    // j points to the rightmost target, i points to the first element greater than target
    let j = i - 1
    // Target not found, return -1
    if j == -1 || nums[j] != target {
        return -1
    }
    // Found target, return index j
    return j
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int binarySearchRightEdge(List&lt;int&gt; nums, int target) {
  // Convert to finding the leftmost target + 1
  int i = binarySearchInsertion(nums, target + 1);
  // j points to the rightmost target, i points to the first element greater than target
  int j = i - 1;
  // Target not found, return -1
  if (j == -1 || nums[j] != target) {
    return -1;
  }
  // Found target, return index j
  return j;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def binary_search_right_edge(nums: list[int], target: int) -&gt; int:
    """Tìm kiếm nhị phân ranh giới phải nhất của target"""
    # Chuyển thành tìm ranh giới trái nhất của target + 1
    i = binary_search_insertion(nums, target + 1)
    # j trỏ tới target phải nhất, i trỏ tới phần tử đầu tiên lớn hơn target
    j = i - 1
    # Không tìm thấy target, trả về -1
    if j == -1 or nums[j] != target:
        return -1
    # Tìm thấy target, trả về chỉ mục j
    return j
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm kiếm nhị phân ranh giới phải nhất của target */
int binarySearchRightEdge(vector&lt;int&gt; &amp;nums, int target) {
    // Chuyển thành tìm ranh giới trái nhất của target + 1
    int i = binarySearchInsertion(nums, target + 1);
    // j trỏ tới target phải nhất, i trỏ tới phần tử đầu tiên lớn hơn target
    int j = i - 1;
    // Không tìm thấy target, trả về -1
    if (j == -1 || nums[j] != target) {
        return -1;
    }
    // Tìm thấy target, trả về chỉ mục j
    return j;
}
</code></pre></div></div></div>
<h3>10.3.2.2 Chuyển thành Tìm kiếm Phần tử</h3>
<p>Ta biết rằng khi mảng không chứa <code>target</code>, $i$ và $j$ cuối cùng sẽ trỏ tới phần tử đầu tiên lớn hơn và phần tử đầu tiên nhỏ hơn <code>target</code> tương ứng.</p>
<p>Do đó, như hình minh họa bên dưới, ta có thể xây dựng một phần tử không tồn tại trong mảng để tìm ranh giới trái và phải.</p>
<ul>
  <li>Tìm <code>target</code> ngoài cùng bên trái: có thể chuyển thành tìm <code>target - 0.5</code> và trả về con trỏ $i$.</li>
  <li>Tìm <code>target</code> ngoài cùng bên phải: có thể chuyển thành tìm <code>target + 0.5</code> và trả về con trỏ $j$.</li>
</ul>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_search_edge_by_element.png" alt="Chuyển đổi tìm ranh giới thành tìm kiếm phần tử" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Đoạn mã được lược bỏ ở đây, nhưng hai điểm sau đáng được lưu ý:</p>
<ul>
  <li>Vì mảng đã cho không chứa giá trị thập phân, ta không cần lo lắng về cách xử lý trường hợp bằng nhau.</li>
  <li>Vì phương pháp này đưa vào số thập phân, biến <code>target</code> trong hàm cần được đổi sang kiểu số thực (Python không cần thay đổi này).</li>
</ul>

<h2>10.3.3 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="binary-search-edge-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'binary-search-edge-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'binary-search-edge-wrapper', 'tab-interactive'); initBinarySearchEdgeDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem cách tái sử dụng hàm tìm vị trí chèn nhằm tìm Ranh giới Trái và Ranh giới Phải của <code>target = 6</code> trên mảng <code>[1, 3, 6, 6, 6, 6, 6, 10, 12, 15]</code>.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div style="display:flex; gap:8px; padding: 0.5em 0;">
      <button class="control-btn" id="binary-search-edge-mode-left" onclick="setBinarySearchEdgeMode('left')">Ranh giới Trái</button>
      <button class="control-btn btn-secondary" id="binary-search-edge-mode-right" onclick="setBinarySearchEdgeMode('right')">Ranh giới Phải</button>
    </div>
    <div id="binary-search-edge-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="binary-search-edge-btn-autorun" class="control-btn" onclick="autoRunBinarySearchEdge()">▶ Auto Run</button>
      <button id="binary-search-edge-btn-step" class="control-btn btn-secondary" onclick="stepBinarySearchEdge()">Bước tiếp theo ▶</button>
      <button id="binary-search-edge-btn-pause" class="control-btn btn-secondary" onclick="pauseRunBinarySearchEdge()" disabled>⏸ Dừng</button>
      <button id="binary-search-edge-btn-reset" class="control-btn btn-secondary" onclick="initBinarySearchEdgeDemo()">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="400" max="2000" value="900" step="200" oninput="setBinarySearchEdgeSpeed(this.value)" /> <span id="binary-search-edge-speed-label">900ms</span>
    </div>
    <div id="binary-search-edge-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Chọn chế độ rồi nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu.</div>
  </div>
</div>
`,
    originalContent: `# Binary Search Boundaries

## Finding the Left Boundary

!!! question

    Given a sorted array \`nums\` of length $n$ that may contain duplicate elements, return the index of the leftmost occurrence of \`target\`. If the array does not contain \`target\`, return $-1$.

Recall the method for finding the insertion point with binary search. After the search completes, $i$ points to the leftmost \`target\`, **so finding the insertion point is essentially finding the index of the leftmost \`target\`**.

Consider implementing the left boundary search using the insertion point finding function. Note that the array may not contain \`target\`, which could result in the following two cases:

- The insertion point index $i$ is out of bounds.
- The element \`nums[i]\` is not equal to \`target\`.

When either of these situations occurs, simply return $-1$. The code is shown below:

\`\`\`src
[file]{binary_search_edge}-[class]{}-[func]{binary_search_left_edge}
\`\`\`

## Finding the Right Boundary

So how do we find the rightmost \`target\`? The most direct approach is to modify the code and replace the pointer shrinking operation in the \`nums[m] == target\` case. The code is omitted here; interested readers can implement it themselves.

Below we introduce two more clever methods.

### Reusing Left Boundary Search

In fact, we can use the function for finding the leftmost \`target\` to find the rightmost \`target\`. The specific method is: **convert finding the rightmost \`target\` into finding the leftmost \`target + 1\`**.

As shown in the figure below, after the search completes, the pointer $i$ points to the leftmost \`target + 1\` (if it exists), while $j$ points to the rightmost \`target\`, **so we can return $j$**.

![Converting right boundary search to left boundary search](binary_search_edge.assets/binary_search_right_edge_by_left_edge.png)

Note that the returned insertion point is $i$, so we need to subtract $1$ from it to obtain $j$:

\`\`\`src
[file]{binary_search_edge}-[class]{}-[func]{binary_search_right_edge}
\`\`\`

### Converting to Element Search

We know that when the array does not contain \`target\`, $i$ and $j$ will eventually point to the first elements greater than and less than \`target\`, respectively.

Therefore, as shown in the figure below, we can construct an element that does not exist in the array to find the left and right boundaries.

- Finding the leftmost \`target\`: This can be converted to finding \`target - 0.5\` and returning the pointer $i$.
- Finding the rightmost \`target\`: This can be converted to finding \`target + 0.5\` and returning the pointer $j$.

![Converting boundary search to element search](binary_search_edge.assets/binary_search_edge_by_element.png)

The code is omitted here, but the following two points are worth noting:

- Since the given array does not contain decimal values, we do not need to worry about how to handle equality.
- Because this method introduces decimals, the variable \`target\` in the function needs to be changed to a floating-point type (Python does not require this change).
`
  },

  'dsa-hash-optimization': {
    title: '10.4 Tối ưu hóa bằng Hashing (Hash-Based Search)',
    summary: 'Phương pháp đổi Không gian lấy Thời gian: Dùng Hash Table để tối ưu hóa tìm kiếm tuyến tính từ O(N^2) xuống O(N). Bài toán Two Sum.',
    tags: ['dsa', 'searching', 'hash-table', 'two-sum'],
    domain: 'Algorithms',
    module: 'Chương 10: Tìm kiếm',
    prerequisites: ['dsa-binary-search-edge'],
    related: ['dsa-searching-revisited'],
    updatedAt: '2026-07-19',
    readTime: '7 phút',
    content: `
<p>Trong các bài toán thuật toán, <strong>ta thường giảm độ phức tạp thời gian của thuật toán bằng cách thay thế tìm kiếm tuyến tính bằng tìm kiếm dựa trên hash</strong>. Hãy cùng dùng một bài toán thuật toán để hiểu sâu hơn về điều này.</p>
<div class="callout callout-question">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một mảng số nguyên <code>nums</code> và một giá trị mục tiêu <code>target</code>, tìm hai phần tử trong mảng có tổng bằng <code>target</code>, và trả về chỉ mục của chúng. Bất kỳ lời giải nào cũng được chấp nhận.</p>
  </div>
</div>

<h2>10.4.1 Tìm kiếm tuyến tính: Đánh đổi Thời gian lấy Không gian</h2>
<p>Xem xét việc duyệt trực tiếp qua tất cả các tổ hợp có thể. Như hình minh họa bên dưới, ta dùng hai vòng lặp lồng nhau và kiểm tra ở mỗi vòng lặp xem tổng của hai số nguyên có bằng <code>target</code> hay không. Nếu có, trả về chỉ mục của chúng.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/two_sum_brute_force.png" alt="Lời giải tìm kiếm tuyến tính cho Two Sum" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Đoạn mã minh họa như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Cách 1: Duyệt vét cạn (Brute force) */
static int[] twoSumBruteForce(int[] nums, int target) {
    int size = nums.length;
    // Hai vòng lặp lồng nhau, độ phức tạp thời gian là O(n^2)
    for (int i = 0; i &lt; size - 1; i++) {
        for (int j = i + 1; j &lt; size; j++) {
            if (nums[i] + nums[j] == target)
                return new int[] { i, j };
        }
    }
    return new int[0];
}
</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func twoSumBruteForce(nums: [Int], target: Int) -&gt; [Int] {
    // Two nested loops, time complexity is O(n^2)
    for i in nums.indices.dropLast() {
        for j in nums.indices.dropFirst(i + 1) {
            if nums[i] + nums[j] == target {
                return [i, j]
            }
        }
    }
    return [0]
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>List&lt;int&gt; twoSumBruteForce(List&lt;int&gt; nums, int target) {
  int size = nums.length;
  // Two nested loops, time complexity is O(n^2)
  for (var i = 0; i &lt; size - 1; i++) {
    for (var j = i + 1; j &lt; size; j++) {
      if (nums[i] + nums[j] == target) return [i, j];
    }
  }
  return [0];
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def two_sum_brute_force(nums: list[int], target: int) -&gt; list[int]:
    """Cách 1: Duyệt vét cạn (Brute force)"""
    # Hai vòng lặp lồng nhau, độ phức tạp thời gian là O(n^2)
    for i in range(len(nums) - 1):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Cách 1: Duyệt vét cạn (Brute force) */
vector&lt;int&gt; twoSumBruteForce(vector&lt;int&gt; &amp;nums, int target) {
    int size = nums.size();
    // Hai vòng lặp lồng nhau, độ phức tạp thời gian là O(n^2)
    for (int i = 0; i &lt; size - 1; i++) {
        for (int j = i + 1; j &lt; size; j++) {
            if (nums[i] + nums[j] == target)
                return {i, j};
        }
    }
    return {};
}
</code></pre></div></div></div>
<p>Phương pháp này có độ phức tạp thời gian $O(n^2)$ và độ phức tạp không gian $O(1)$, khiến nó rất tốn thời gian với đầu vào lớn.</p>

<h2>10.4.2 Tìm kiếm dựa trên Hash: Đánh đổi Không gian lấy Thời gian</h2>
<p>Xem xét việc sử dụng một Hash Table với key là các phần tử của mảng và value là chỉ mục của chúng. Duyệt qua mảng và thực hiện các bước như hình bên dưới ở mỗi vòng lặp:</p>
<ol>
  <li>Kiểm tra xem số <code>target - nums[i]</code> có nằm trong Hash Table không. Nếu có, trả về ngay chỉ mục của hai phần tử này.</li>
  <li>Thêm cặp key-value <code>nums[i]</code> và chỉ mục <code>i</code> vào Hash Table.</li>
</ol>

<div class="interactive-widget-wrapper" id="two-sum-hashtable-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img loading="lazy" src="dsa-assets/two_sum_hashtable_step1.png" alt="Bước 1" style="max-width:100%;" /><p class="slide-caption">Với $i=0$, <code>nums[0]=2</code>: $13 - 2 = 11$ không có trong <code>map</code> → thêm phần tử $2$ vào <code>map</code>.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/two_sum_hashtable_step2.png" alt="Bước 2" style="max-width:100%;" /><p class="slide-caption">Với $i=1$, <code>nums[1]=7</code>: $13 - 7 = 6$ không có trong <code>map</code> → thêm phần tử $7$ vào <code>map</code>.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/two_sum_hashtable_step3.png" alt="Bước 3" style="max-width:100%;" /><p class="slide-caption">Với $i=2$, <code>nums[2]=11</code>: $13 - 11 = 2$ đã có trong <code>map</code> → trả về tổ hợp chỉ mục $[0, 2]$.</p></div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('two-sum-hashtable-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 3</span>
      <button class="slider-btn" onclick="nextSlide('two-sum-hashtable-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>

<p>Cách triển khai được thể hiện bên dưới và chỉ cần một vòng lặp duy nhất:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Cách 2: Dùng Hash Table hỗ trợ */
static int[] twoSumHashTable(int[] nums, int target) {
    int size = nums.length;
    // Hash Table hỗ trợ, độ phức tạp không gian là O(n)
    Map&lt;Integer, Integer&gt; dic = new HashMap&lt;&gt;();
    // Một vòng lặp duy nhất, độ phức tạp thời gian là O(n)
    for (int i = 0; i &lt; size; i++) {
        if (dic.containsKey(target - nums[i])) {
            return new int[] { dic.get(target - nums[i]), i };
        }
        dic.put(nums[i], i);
    }
    return new int[0];
}
</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func twoSumHashTable(nums: [Int], target: Int) -&gt; [Int] {
    // Auxiliary hash table, space complexity is O(n)
    var dic: [Int: Int] = [:]
    // Single loop, time complexity is O(n)
    for i in nums.indices {
        if let j = dic[target - nums[i]] {
            return [j, i]
        }
        dic[nums[i]] = i
    }
    return [0]
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>List&lt;int&gt; twoSumHashTable(List&lt;int&gt; nums, int target) {
  int size = nums.length;
  // Auxiliary hash table, space complexity is O(n)
  Map&lt;int, int&gt; dic = HashMap();
  // Single loop, time complexity is O(n)
  for (var i = 0; i &lt; size; i++) {
    if (dic.containsKey(target - nums[i])) {
      return [dic[target - nums[i]]!, i];
    }
    dic.putIfAbsent(nums[i], () =&gt; i);
  }
  return [0];
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def two_sum_hash_table(nums: list[int], target: int) -&gt; list[int]:
    """Cách 2: Dùng Hash Table hỗ trợ"""
    # Hash Table hỗ trợ, độ phức tạp không gian là O(n)
    dic = {}
    # Một vòng lặp duy nhất, độ phức tạp thời gian là O(n)
    for i in range(len(nums)):
        if target - nums[i] in dic:
            return [dic[target - nums[i]], i]
        dic[nums[i]] = i
    return []
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Cách 2: Dùng Hash Table hỗ trợ */
vector&lt;int&gt; twoSumHashTable(vector&lt;int&gt; &amp;nums, int target) {
    int size = nums.size();
    // Hash Table hỗ trợ, độ phức tạp không gian là O(n)
    unordered_map&lt;int, int&gt; dic;
    // Một vòng lặp duy nhất, độ phức tạp thời gian là O(n)
    for (int i = 0; i &lt; size; i++) {
        if (dic.find(target - nums[i]) != dic.end()) {
            return {dic[target - nums[i]], i};
        }
        dic.emplace(nums[i], i);
    }
    return {};
}
</code></pre></div></div></div>
<p>Phương pháp này giảm độ phức tạp thời gian từ $O(n^2)$ xuống $O(n)$ nhờ tìm kiếm dựa trên hash, cải thiện đáng kể hiệu suất thời gian chạy.</p>
<p>Vì cần duy trì thêm một Hash Table, độ phức tạp không gian là $O(n)$. <strong>Tuy nhiên, phương pháp này mang lại sự đánh đổi thời gian-không gian cân bằng hơn tổng thể, khiến nó trở thành lời giải tối ưu cho bài toán này</strong>.</p>

<h2>10.4.3 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="two-sum-hash-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'two-sum-hash-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'two-sum-hash-wrapper', 'tab-interactive'); initTwoSumHashDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem cách xây dựng Hash Table cho <code>nums = [2, 7, 11, 15]</code>, <code>target = 13</code>.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="two-sum-hash-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="two-sum-hash-btn-autorun" class="control-btn" onclick="autoRunTwoSumHash()">▶ Auto Run</button>
      <button id="two-sum-hash-btn-step" class="control-btn btn-secondary" onclick="stepTwoSumHash()">Bước tiếp theo ▶</button>
      <button id="two-sum-hash-btn-pause" class="control-btn btn-secondary" onclick="pauseRunTwoSumHash()" disabled>⏸ Dừng</button>
      <button id="two-sum-hash-btn-reset" class="control-btn btn-secondary" onclick="initTwoSumHashDemo()">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="400" max="2000" value="900" step="200" oninput="setTwoSumHashSpeed(this.value)" /> <span id="two-sum-hash-speed-label">900ms</span>
    </div>
    <div id="two-sum-hash-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu.</div>
  </div>
</div>
`,
    originalContent: `# Hash Optimization Strategy

In algorithm problems, **we often reduce the time complexity of algorithms by replacing linear search with hash-based search**. Let's use an algorithm problem to deepen our understanding.

!!! question

    Given an integer array \`nums\` and a target value \`target\`, find two elements in the array whose sum is \`target\`, and return their indices. Any solution will do.

## Linear Search: Trading Time for Space

Consider directly traversing all possible combinations. As shown in the figure below, we use nested loops and check in each iteration whether the sum of two integers is \`target\`. If so, return their indices.

![Linear search solution for two sum](replace_linear_by_hashing.assets/two_sum_brute_force.png)

The code is shown below:

\`\`\`src
[file]{two_sum}-[class]{}-[func]{two_sum_brute_force}
\`\`\`

This method has a time complexity of $O(n^2)$ and a space complexity of $O(1)$, making it very time-consuming on large inputs.

## Hash-Based Search: Trading Space for Time

Consider using a hash table whose keys are array elements and whose values are their indices. Traverse the array and perform the steps shown in the figure below in each iteration:

1. Check if the number \`target - nums[i]\` is in the hash table. If so, directly return the indices of these two elements.
2. Add the key-value pair \`nums[i]\` and index \`i\` to the hash table.

=== "<1>"
    ![Hash table solution for two sum](replace_linear_by_hashing.assets/two_sum_hashtable_step1.png)

=== "<2>"
    ![two_sum_hashtable_step2](replace_linear_by_hashing.assets/two_sum_hashtable_step2.png)

=== "<3>"
    ![two_sum_hashtable_step3](replace_linear_by_hashing.assets/two_sum_hashtable_step3.png)

The implementation is shown below and requires only a single loop:

\`\`\`src
[file]{two_sum}-[class]{}-[func]{two_sum_hash_table}
\`\`\`

This method reduces the time complexity from $O(n^2)$ to $O(n)$ through hash-based search, greatly improving runtime efficiency.

Since an additional hash table needs to be maintained, the space complexity is $O(n)$. **Nevertheless, this method offers a more balanced overall time-space trade-off, making it the optimal solution to this problem**.
`
  },

  'dsa-searching-revisited': {
    title: '10.5 Duyệt lại các Thuật toán Tìm kiếm',
    summary: 'Nhìn lại một cách hệ thống các thuật toán Tìm kiếm: Tìm kiếm Vét cạn (Linear/BFS/DFS) và Tìm kiếm Thích ứng (Binary/Hash/Tree), so sánh hiệu quả và cách lựa chọn phương pháp phù hợp.',
    tags: ['dsa', 'searching', 'comparison', 'algorithm'],
    domain: 'Algorithms',
    module: 'Chương 10: Tìm kiếm',
    prerequisites: ['dsa-hash-optimization'],
    related: ['dsa-searching-summary'],
    updatedAt: '2026-07-19',
    readTime: '8 phút',
    content: `
<p><u>Thuật toán tìm kiếm (Searching algorithms)</u> được dùng để tìm kiếm một hoặc một nhóm phần tử thỏa mãn điều kiện cụ thể trong các cấu trúc dữ liệu (như mảng, danh sách liên kết, cây, hoặc đồ thị).</p>
<p>Thuật toán tìm kiếm có thể được chia thành hai loại sau đây dựa trên cách tiếp cận triển khai:</p>
<ul>
  <li><strong>Định vị phần tử mục tiêu bằng cách duyệt qua cấu trúc dữ liệu</strong>, chẳng hạn như duyệt mảng, danh sách liên kết, cây, và đồ thị.</li>
  <li><strong>Đạt được việc tra cứu phần tử hiệu quả bằng cách tận dụng cách dữ liệu được tổ chức hoặc thông tin đã biết trước về dữ liệu</strong>, chẳng hạn như tìm kiếm nhị phân, tìm kiếm dựa trên hash, và tìm kiếm cây tìm kiếm nhị phân.</li>
</ul>
<p>Vì các chủ đề này đã được giới thiệu ở các chương trước, thuật toán tìm kiếm hẳn đã trở nên quen thuộc với chúng ta. Trong phần này, ta sẽ nhìn lại chúng từ một góc độ hệ thống hơn.</p>

<h2>10.5.1 Tìm kiếm Vét cạn (Brute-Force Search)</h2>
<p>Tìm kiếm vét cạn định vị phần tử mục tiêu bằng cách duyệt qua từng phần tử của cấu trúc dữ liệu.</p>
<ul>
  <li>"Tìm kiếm tuyến tính (Linear search)" áp dụng cho các cấu trúc dữ liệu tuyến tính như mảng và danh sách liên kết. Nó bắt đầu từ một đầu của cấu trúc dữ liệu và truy cập lần lượt từng phần tử cho tới khi tìm thấy phần tử mục tiêu hoặc đạt tới đầu kia mà không tìm thấy.</li>
  <li>"Tìm kiếm theo chiều rộng (Breadth-first search)" và "Tìm kiếm theo chiều sâu (Depth-first search)" là hai chiến lược duyệt cho đồ thị và cây. Tìm kiếm theo chiều rộng bắt đầu từ nút khởi đầu và tìm kiếm theo từng lớp, thăm các nút từ gần đến xa. Tìm kiếm theo chiều sâu bắt đầu từ nút khởi đầu, đi theo một đường dẫn tới cuối, sau đó quay lui và thử các đường dẫn khác cho tới khi toàn bộ cấu trúc dữ liệu được duyệt qua.</li>
</ul>
<p>Ưu điểm của tìm kiếm vét cạn là nó đơn giản và có tính tổng quát tốt, <strong>không yêu cầu tiền xử lý dữ liệu hay cấu trúc dữ liệu bổ sung</strong>.</p>
<p>Tuy nhiên, <strong>độ phức tạp thời gian của các thuật toán này là $O(n)$</strong>, trong đó $n$ là số lượng phần tử, do đó hiệu suất kém khi xử lý khối lượng dữ liệu lớn.</p>

<h2>10.5.2 Tìm kiếm Thích ứng (Adaptive Search)</h2>
<p>Tìm kiếm thích ứng tận dụng các tính chất của chính dữ liệu (như thứ tự sắp xếp) để tối ưu hóa quá trình tìm kiếm và định vị phần tử mục tiêu hiệu quả hơn.</p>
<ul>
  <li>"Tìm kiếm nhị phân (Binary search)" sử dụng tính có thứ tự của dữ liệu để đạt được việc tìm kiếm hiệu quả, chỉ áp dụng cho mảng.</li>
  <li>"Tìm kiếm dựa trên hash (Hash-based search)" sử dụng Hash Table để lưu trữ dữ liệu có thể tìm kiếm dưới dạng cặp key-value, từ đó cho phép tra cứu hiệu quả.</li>
  <li>"Tìm kiếm cây (Tree search)" hoạt động trên các cấu trúc cây cụ thể (như cây tìm kiếm nhị phân), nhanh chóng loại trừ các nút bằng cách so sánh giá trị nút để định vị phần tử mục tiêu.</li>
</ul>
<p>Ưu điểm của các thuật toán này là hiệu quả cao, <strong>với độ phức tạp thời gian đạt tới $O(\\log n)$ hoặc thậm chí $O(1)$</strong>.</p>
<p>Tuy nhiên, <strong>việc sử dụng các thuật toán này thường yêu cầu tiền xử lý dữ liệu</strong>. Ví dụ, tìm kiếm nhị phân yêu cầu sắp xếp trước mảng, trong khi tìm kiếm dựa trên hash và tìm kiếm cây đều yêu cầu cấu trúc dữ liệu bổ sung, và việc duy trì các cấu trúc dữ liệu này cũng đòi hỏi thêm chi phí thời gian và không gian.</p>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Các thuật toán tìm kiếm thích ứng thường được gọi là thuật toán tra cứu (lookup algorithms), <strong>chủ yếu được dùng để nhanh chóng lấy ra phần tử mục tiêu trong các cấu trúc dữ liệu cụ thể</strong>.</p>
  </div>
</div>

<h2>10.5.3 Lựa chọn Phương pháp Tìm kiếm</h2>
<p>Với một tập dữ liệu kích thước $n$, ta có thể dùng tìm kiếm tuyến tính, tìm kiếm nhị phân, tìm kiếm cây, tìm kiếm dựa trên hash, và các phương pháp khác để tìm kiếm phần tử mục tiêu. Nguyên lý hoạt động của từng phương pháp được thể hiện trong hình bên dưới.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/searching_algorithms.png" alt="Nhiều chiến lược tìm kiếm" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Hiệu quả và đặc điểm của các phương pháp này được tổng hợp trong bảng dưới đây.</p>
<p style="text-align:center; font-size: 0.9em; color: var(--text-secondary);">Bảng: So sánh hiệu quả các thuật toán tìm kiếm</p>
<table style="width:100%; border-collapse:collapse; margin:1.5em 0; border: 1px solid var(--border-color); font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px;"></th>
      <th style="padding:10px;">Tìm kiếm tuyến tính</th>
      <th style="padding:10px;">Tìm kiếm nhị phân</th>
      <th style="padding:10px;">Tìm kiếm cây</th>
      <th style="padding:10px;">Tìm kiếm bằng Hash</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><strong>Tìm phần tử</strong></td><td style="padding:10px;">$O(n)$</td><td style="padding:10px;">$O(\\log n)$</td><td style="padding:10px;">$O(\\log n)$</td><td style="padding:10px;">$O(1)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><strong>Chèn phần tử</strong></td><td style="padding:10px;">$O(1)$</td><td style="padding:10px;">$O(n)$</td><td style="padding:10px;">$O(\\log n)$</td><td style="padding:10px;">$O(1)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><strong>Xóa phần tử</strong></td><td style="padding:10px;">$O(n)$</td><td style="padding:10px;">$O(n)$</td><td style="padding:10px;">$O(\\log n)$</td><td style="padding:10px;">$O(1)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><strong>Không gian phụ trợ</strong></td><td style="padding:10px;">$O(1)$</td><td style="padding:10px;">$O(1)$</td><td style="padding:10px;">$O(n)$</td><td style="padding:10px;">$O(n)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><strong>Tiền xử lý dữ liệu</strong></td><td style="padding:10px;">/</td><td style="padding:10px;">Sắp xếp $O(n \\log n)$</td><td style="padding:10px;">Xây cây $O(n \\log n)$</td><td style="padding:10px;">Xây Hash Table $O(n)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><strong>Dữ liệu có thứ tự</strong></td><td style="padding:10px;">Không</td><td style="padding:10px;">Có</td><td style="padding:10px;">Có</td><td style="padding:10px;">Không</td></tr>
  </tbody>
</table>
<p>Việc lựa chọn thuật toán tìm kiếm còn phụ thuộc vào khối lượng dữ liệu, yêu cầu hiệu suất tìm kiếm, tần suất truy vấn và cập nhật dữ liệu, v.v.</p>

<p><strong>Tìm kiếm tuyến tính</strong></p>
<ul>
  <li>Tính tổng quát tốt, không yêu cầu thao tác tiền xử lý dữ liệu. Nếu chỉ cần truy vấn dữ liệu một lần, việc tiền xử lý mà ba phương pháp còn lại yêu cầu có thể mất thời gian lâu hơn cả bản thân tìm kiếm tuyến tính.</li>
  <li>Phù hợp với khối lượng dữ liệu nhỏ, nơi độ phức tạp thời gian ít ảnh hưởng tới hiệu suất.</li>
  <li>Phù hợp với các trường hợp có tần suất cập nhật dữ liệu cao, vì phương pháp này không yêu cầu bảo trì dữ liệu bổ sung nào.</li>
</ul>

<p><strong>Tìm kiếm nhị phân</strong></p>
<ul>
  <li>Phù hợp với tập dữ liệu lớn, với hiệu suất ổn định và độ phức tạp thời gian trường hợp xấu nhất là $O(\\log n)$.</li>
  <li>Khối lượng dữ liệu không thể quá lớn, vì việc lưu trữ mảng yêu cầu không gian bộ nhớ liên tục.</li>
  <li>Không phù hợp với các trường hợp chèn và xóa dữ liệu thường xuyên, vì việc duy trì mảng đã sắp xếp có chi phí cao.</li>
</ul>

<p><strong>Tìm kiếm dựa trên Hash</strong></p>
<ul>
  <li>Phù hợp với các trường hợp yêu cầu hiệu suất truy vấn cao, với độ phức tạp thời gian trung bình $O(1)$.</li>
  <li>Không phù hợp với các trường hợp yêu cầu dữ liệu có thứ tự hoặc tìm kiếm theo phạm vi, vì Hash Table không thể duy trì dữ liệu theo thứ tự sắp xếp.</li>
  <li>Phụ thuộc nhiều vào hàm hash và chiến lược xử lý va chạm hash, có rủi ro đáng kể về suy giảm hiệu suất.</li>
  <li>Không phù hợp với khối lượng dữ liệu quá lớn, vì Hash Table cần thêm không gian để giảm thiểu va chạm và từ đó cung cấp hiệu suất truy vấn tốt.</li>
</ul>

<p><strong>Tìm kiếm Cây</strong></p>
<ul>
  <li>Phù hợp với các tập dữ liệu khổng lồ, vì các nút cây được lưu trữ không liên tục trong bộ nhớ.</li>
  <li>Phù hợp với các trường hợp cần duy trì dữ liệu có thứ tự hoặc thực hiện tìm kiếm theo phạm vi.</li>
  <li>Trong quá trình chèn và xóa nút liên tục, cây tìm kiếm nhị phân có thể trở nên lệch (skewed), làm suy giảm độ phức tạp thời gian xuống $O(n)$.</li>
  <li>Nếu dùng cây AVL hoặc cây đỏ-đen, mọi thao tác đều có thể chạy ổn định ở thời gian $O(\\log n)$, mặc dù việc duy trì cân bằng cây làm phát sinh thêm chi phí.</li>
</ul>
`,
    originalContent: `# Searching Algorithms Revisited

<u>Searching algorithms</u> are used to search for one or a group of elements that meet specific conditions in data structures (such as arrays, linked lists, trees, or graphs).

Searching algorithms can be divided into the following two categories based on their implementation approach:

- **Locating target elements by traversing the data structure**, such as traversing arrays, linked lists, trees, and graphs.
- **Achieving efficient element lookup by leveraging the way data is organized or prior information about the data**, such as binary search, hash-based search, and binary search tree search.

As these topics have already been introduced in earlier chapters, searching algorithms should already be familiar to us. In this section, we revisit them from a more systematic perspective.

## Brute-Force Search

Brute-force search locates target elements by traversing each element of the data structure.

- "Linear search" is applicable to linear data structures such as arrays and linked lists. It starts from one end of the data structure and accesses elements one by one until the target element is found or the other end is reached without finding the target element.
- "Breadth-first search" and "depth-first search" are two traversal strategies for graphs and trees. Breadth-first search starts from the initial node and searches layer by layer, visiting nodes from near to far. Depth-first search starts from the initial node, follows a path to the end, then backtracks and tries other paths until the entire data structure is traversed.

The advantage of brute-force search is that it is simple and has good generality, **requiring no data preprocessing or additional data structures**.

However, **the time complexity of such algorithms is $O(n)$**, where $n$ is the number of elements, so performance is poor when dealing with large amounts of data.

## Adaptive Search

Adaptive search leverages properties of the data itself (such as sorted order) to optimize the search process and locate target elements more efficiently.

- "Binary search" uses the orderliness of data to achieve efficient searching, applicable only to arrays.
- "Hash-based search" uses hash tables to store searchable data as key-value pairs, thereby enabling efficient queries.
- "Tree search" operates on specific tree structures (such as binary search trees), quickly ruling out nodes by comparing node values to locate the target element.

The advantage of such algorithms is high efficiency, **with time complexity reaching $O(\\log n)$ or even $O(1)$**.

However, **using these algorithms often requires data preprocessing**. For example, binary search requires pre-sorting the array, while hash-based search and tree search both require additional data structures, and maintaining these data structures also requires extra time and space overhead.

!!! tip

    Adaptive search algorithms are often called lookup algorithms, **mainly used to quickly retrieve target elements in specific data structures**.

## Search Method Selection

Given a dataset of size $n$, we can use linear search, binary search, tree search, hash-based search, and other methods to search for the target element. The working principles of each method are shown in the figure below.

![Multiple search strategies](searching_algorithm_revisited.assets/searching_algorithms.png)

The efficiency and characteristics of these methods are summarized in the table below.

<p align="center"> Table <id> &nbsp; Comparison of search algorithm efficiency </p>

|                    | Linear search | Binary search         | Tree search                 | Hash-based search          |
| ------------------ | ------------- | --------------------- | --------------------------- | -------------------------- |
| Search element     | $O(n)$        | $O(\\log n)$           | $O(\\log n)$                 | $O(1)$                     |
| Insert element     | $O(1)$        | $O(n)$                | $O(\\log n)$                 | $O(1)$                     |
| Delete element     | $O(n)$        | $O(n)$                | $O(\\log n)$                 | $O(1)$                     |
| Extra space        | $O(1)$        | $O(1)$                | $O(n)$                      | $O(n)$                     |
| Data preprocessing | /             | Sorting $O(n \\log n)$ | Tree building $O(n \\log n)$ | Hash table building $O(n)$ |
| Data ordered       | Unordered     | Ordered               | Ordered                     | Unordered                  |

The choice of search algorithm also depends on data volume, search performance requirements, data query and update frequency, etc.

**Linear search**

- Good generality, requiring no data preprocessing operations. If we need to query the data only once, the preprocessing required by the other three methods can take longer than the linear search itself.
- Suitable for small data volumes, where time complexity has less impact on efficiency.
- Suitable for scenarios with high data update frequency, as this method does not require any additional data maintenance.

**Binary search**

- Suitable for large datasets, with stable performance and a worst-case time complexity of $O(\\log n)$.
- Data volume cannot be too large, as storing arrays requires contiguous memory space.
- Not suitable for scenarios with frequent data insertion and deletion, as maintaining a sorted array has high overhead.

**Hash-based search**

- Suitable for scenarios with high query performance requirements, with an average time complexity of $O(1)$.
- Not suitable for scenarios requiring ordered data or range searches, as hash tables cannot maintain the data in sorted order.
- High dependence on hash functions and hash collision handling strategies, with significant risk of performance degradation.
- Not suitable for excessively large data volumes, as hash tables require extra space to minimize collisions and thus provide good query performance.

**Tree search**

- Suitable for massive datasets, as tree nodes are stored non-contiguously in memory.
- Suitable for scenarios that require maintaining ordered data or performing range searches.
- During continuous node insertion and deletion, binary search trees may become skewed, degrading time complexity to $O(n)$.
- If AVL trees or red-black trees are used, all operations can consistently run in $O(\\log n)$ time, though maintaining tree balance adds extra overhead.
`
  },

  'dsa-searching-summary': {
    title: '10.6 Tóm tắt & Hỏi đáp',
    summary: 'Tổng hợp lại các phương pháp tìm kiếm (Linear, Binary, Hash, Tree) và so sánh đặc tính để chọn thuật toán phù hợp.',
    tags: ['dsa', 'searching', 'summary'],
    domain: 'Algorithms',
    module: 'Chương 10: Tìm kiếm',
    prerequisites: ['dsa-searching-revisited'],
    related: [],
    updatedAt: '2026-07-19',
    readTime: '5 phút',
    content: `
<h2>Điểm lại kiến thức chính</h2>
<ul>
  <li>Tìm kiếm nhị phân dựa vào dữ liệu có thứ tự và tìm kiếm bằng cách liên tục chia đôi khoảng tìm kiếm. Nó yêu cầu dữ liệu đầu vào phải được sắp xếp và chỉ áp dụng cho mảng hoặc các cấu trúc dữ liệu dựa trên mảng.</li>
  <li>Tìm kiếm vét cạn định vị dữ liệu bằng cách duyệt qua cấu trúc dữ liệu. Tìm kiếm tuyến tính áp dụng cho mảng và danh sách liên kết, trong khi tìm kiếm theo chiều rộng và tìm kiếm theo chiều sâu áp dụng cho đồ thị và cây. Các thuật toán này có tính áp dụng rộng và không cần tiền xử lý dữ liệu, nhưng độ phức tạp thời gian tương đối cao là $O(n)$.</li>
  <li>Tìm kiếm dựa trên hash, tìm kiếm cây, và tìm kiếm nhị phân là các phương pháp tìm kiếm hiệu quả có thể nhanh chóng định vị phần tử mục tiêu trong các cấu trúc dữ liệu cụ thể. Các thuật toán này có hiệu suất rất cao với độ phức tạp thời gian đạt tới $O(\\log n)$ hoặc thậm chí $O(1)$, nhưng thường yêu cầu thêm cấu trúc dữ liệu bổ sung.</li>
  <li>Trong thực tế, ta cần phân tích các yếu tố như quy mô dữ liệu, yêu cầu hiệu suất tìm kiếm, tần suất truy vấn và cập nhật dữ liệu để chọn phương pháp tìm kiếm phù hợp.</li>
  <li>Tìm kiếm tuyến tính phù hợp với tập dữ liệu nhỏ hoặc dữ liệu được cập nhật thường xuyên; tìm kiếm nhị phân phù hợp với tập dữ liệu lớn đã sắp xếp; tìm kiếm dựa trên hash phù hợp khi cần hiệu suất truy vấn cao và không cần tìm kiếm theo phạm vi; tìm kiếm cây phù hợp với tập dữ liệu động lớn cần duy trì thứ tự và hỗ trợ tìm kiếm theo phạm vi.</li>
  <li>Thay thế tìm kiếm tuyến tính bằng tìm kiếm dựa trên hash là một chiến lược thường được dùng để tối ưu hóa thời gian chạy, giảm độ phức tạp thời gian từ $O(n)$ xuống $O(1)$.</li>
</ul>
`,
    originalContent: `# Summary

### Key Review

- Binary search relies on ordered data and searches by repeatedly halving the search interval. It requires the input data to be sorted and applies only to arrays or array-based data structures.
- Brute-force search locates data by traversing the data structure. Linear search applies to arrays and linked lists, while breadth-first search and depth-first search apply to graphs and trees. These algorithms are broadly applicable and require no data preprocessing, but their relatively high time complexity is $O(n)$.
- Hash-based search, tree search, and binary search are efficient search methods that can quickly locate target elements in specific data structures. Such algorithms are highly efficient with time complexity reaching $O(\\log n)$ or even $O(1)$, but typically require additional data structures.
- In practice, we need to analyze factors such as data scale, search performance requirements, and data query and update frequency to choose the appropriate search method.
- Linear search is suitable for small datasets or data that is updated frequently; binary search is suitable for large sorted datasets; hash-based search is suitable when high query efficiency is required and range queries are unnecessary; tree search is suitable for large dynamic datasets that must maintain order and support range queries.
- Replacing linear search with hash-based search is a commonly used strategy to optimize runtime, reducing time complexity from $O(n)$ to $O(1)$.
`
  }

});
