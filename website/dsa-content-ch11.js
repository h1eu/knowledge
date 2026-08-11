/* ============================================================
   Knowledge OS — DSA Module: Chương 11 - Sắp xếp (Sorting)
   ============================================================ */

Object.assign(DSA_CONTENT, {

  'dsa-sorting-index': {
    title: 'Sắp xếp (Sorting)',
    summary: 'Chương này giới thiệu về các thuật toán sắp xếp kinh điển, từ cơ bản (Selection, Bubble, Insertion) đến nâng cao (Quick, Merge, Heap) và các thuật toán không dùng so sánh (Bucket, Counting, Radix).',
    tags: ['dsa', 'sorting', 'algorithm'],
    domain: 'Algorithms',
    module: 'Chương 11: Sắp xếp',
    prerequisites: ['dsa-searching-summary'],
    related: ['dsa-sorting-algorithms'],
    updatedAt: '2026-07-19',
    readTime: '1 phút',
    content: `
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/chapter_sorting.jpg" alt="Sắp xếp" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<div class="callout callout-note">
  <span class="callout-icon">✨</span>
  <div class="callout-body">
    <p>Sắp xếp (Sorting) giống như một chiếc chìa khóa thần kỳ, biến sự hỗn loạn thành trật tự, giúp chúng ta hiểu và xử lý dữ liệu hiệu quả hơn.</p>
    <p>Từ thứ tự tăng dần đơn giản đến các lược đồ phân loại phức tạp hơn, sắp xếp bộc lộ vẻ đẹp hài hòa của dữ liệu.</p>
  </div>
</div>
`,
    originalContent: `# Sorting

![Sorting](../assets/covers/chapter_sorting.jpg)

!!! abstract

    Sorting is like a magic key that transforms chaos into order, enabling us to understand and process data more efficiently.

    From simple ascending order to more complex classification schemes, sorting reveals the harmonious beauty of data.
`
  },

  'dsa-sorting-algorithms': {
    title: '11.1 Tổng quan Thuật toán Sắp xếp',
    summary: 'Hiểu về các tiêu chí đánh giá một thuật toán sắp xếp: Hiệu suất thời gian, Tính tại chỗ (In-place), Tính ổn định (Stability), Khả năng thích ứng (Adaptability) và Dựa trên so sánh hay không.',
    tags: ['dsa', 'sorting', 'theory'],
    domain: 'Algorithms',
    module: 'Chương 11: Sắp xếp',
    prerequisites: ['dsa-sorting-index'],
    related: ['dsa-selection-sort'],
    updatedAt: '2026-07-19',
    readTime: '7 phút',
    content: `
<p>Một <u>thuật toán sắp xếp (sorting algorithm)</u> sắp xếp một tập dữ liệu theo một thứ tự cụ thể. Thuật toán sắp xếp có ứng dụng rộng rãi vì dữ liệu có thứ tự thường có thể được tìm kiếm, phân tích và xử lý hiệu quả hơn.</p>
<p>Như hình minh họa bên dưới, dữ liệu được sắp xếp có thể là số nguyên, số thực dấu phẩy động, ký tự, chuỗi, v.v. Quy tắc sắp xếp có thể được định nghĩa tùy theo nhu cầu, chẳng hạn theo thứ tự số học, thứ tự ASCII, hoặc một quy tắc tùy chỉnh.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/sorting_examples.png" alt="Ví dụ về kiểu dữ liệu và tiêu chí sắp xếp" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>11.1.1 Các Chiều kích Đánh giá</h2>
<p><strong>Hiệu suất thực thi (Execution efficiency)</strong>: Chúng ta kỳ vọng độ phức tạp thời gian của thuật toán sắp xếp càng thấp càng tốt, với tổng số phép toán càng nhỏ (giảm hằng số nhân trong độ phức tạp thời gian). Với khối lượng dữ liệu lớn, hiệu suất thực thi đặc biệt quan trọng.</p>
<p><strong>Tính tại chỗ (In-place property)</strong>: Đúng như tên gọi, <u>sắp xếp tại chỗ (in-place sorting)</u> đạt được việc sắp xếp bằng cách thao tác trực tiếp trên mảng gốc mà không cần thêm mảng phụ trợ, nhờ đó tiết kiệm bộ nhớ. Thông thường, sắp xếp tại chỗ có ít thao tác di chuyển dữ liệu hơn và chạy nhanh hơn.</p>
<p><strong>Tính ổn định (Stability)</strong>: <u>Sắp xếp ổn định (stable sorting)</u> đảm bảo rằng thứ tự tương đối của các phần tử bằng nhau trong mảng không thay đổi sau khi sắp xếp hoàn tất.</p>
<p>Sắp xếp ổn định là điều kiện cần cho các trường hợp sắp xếp nhiều cấp độ. Giả sử ta có một bảng lưu thông tin sinh viên, trong đó cột 1 và cột 2 lần lượt là tên và tuổi. Trong trường hợp này, <u>sắp xếp không ổn định (unstable sorting)</u> có thể khiến tính có thứ tự của dữ liệu đầu vào bị mất:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="shell" onclick="switchCodeTab(event, 'shell')">shell</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="shell"><pre data-lang="shell"><code># Dữ liệu đầu vào được sắp xếp theo tên
# (tên, tuổi)
  (&#39;A&#39;, 19)
  (&#39;B&#39;, 18)
  (&#39;C&#39;, 21)
  (&#39;D&#39;, 19)
  (&#39;E&#39;, 23)

# Giả sử ta dùng một thuật toán sắp xếp không ổn định để sắp xếp danh sách theo tuổi.
# Trong kết quả, vị trí tương đối của (&#39;D&#39;, 19) và (&#39;A&#39;, 19) thay đổi,
# nên tính chất dữ liệu đầu vào được sắp theo tên đã bị mất.
  (&#39;B&#39;, 18)
  (&#39;D&#39;, 19)
  (&#39;A&#39;, 19)
  (&#39;C&#39;, 21)
  (&#39;E&#39;, 23)
</code></pre></div></div></div>
<p><strong>Khả năng thích ứng (Adaptability)</strong>: <u>Sắp xếp thích ứng (adaptive sorting)</u> có thể tận dụng thông tin thứ tự sẵn có trong dữ liệu đầu vào để giảm khối lượng tính toán, đạt hiệu suất thời gian tốt hơn. Độ phức tạp thời gian tốt nhất của các thuật toán sắp xếp thích ứng thường tốt hơn độ phức tạp thời gian trung bình.</p>
<p><strong>Dựa trên so sánh hoặc không so sánh (Comparison-based or non-comparison)</strong>: <u>Sắp xếp dựa trên so sánh (comparison-based sorting)</u> dựa vào các toán tử so sánh ($<$, $=$, $>$) để xác định thứ tự tương đối của các phần tử, từ đó sắp xếp toàn bộ mảng, với độ phức tạp thời gian tối ưu về mặt lý thuyết là $O(n \\log n)$. <u>Sắp xếp không so sánh (non-comparison sorting)</u> không dùng toán tử so sánh và có thể đạt độ phức tạp thời gian $O(n)$, nhưng tính linh hoạt tương đối hạn chế.</p>

<h2>11.1.2 Thuật toán Sắp xếp Lý tưởng</h2>
<p><strong>Nhanh, tại chỗ, ổn định, thích ứng, và áp dụng rộng rãi</strong>. Rõ ràng, cho đến nay chưa có thuật toán sắp xếp nào kết hợp được tất cả các đặc điểm này. Do đó, khi lựa chọn thuật toán sắp xếp, cần quyết định dựa trên đặc điểm cụ thể của dữ liệu và yêu cầu của bài toán.</p>
<p>Tiếp theo, chúng ta sẽ xem xét các thuật toán sắp xếp khác nhau và phân tích ưu nhược điểm của chúng dựa trên các chiều kích đánh giá ở trên.</p>
`,
    originalContent: `# Sorting Algorithm

A <u>sorting algorithm</u> arranges a set of data in a specific order. Sorting algorithms have extensive applications because ordered data can usually be searched, analyzed, and processed more efficiently.

As shown in the figure below, the data being sorted can be integers, floating-point numbers, characters, strings, and so on. The sorting rule can be defined as needed, such as numerical order, ASCII order, or a custom rule.

![Data type and criterion examples](sorting_algorithm.assets/sorting_examples.png)

## Evaluation Dimensions

**Execution efficiency**: We expect the time complexity of sorting algorithms to be as low as possible, with a smaller total number of operations (reducing the constant factor in time complexity). For large data volumes, execution efficiency is particularly important.

**In-place property**: As the name implies, <u>in-place sorting</u> achieves sorting by operating directly on the original array without requiring additional auxiliary arrays, thus saving memory. Typically, in-place sorting involves fewer data movement operations and runs faster.

**Stability**: <u>Stable sorting</u> ensures that the relative order of equal elements in the array does not change after sorting is completed.

Stable sorting is a necessary condition for multi-level sorting scenarios. Suppose we have a table storing student information, where column 1 and column 2 are name and age, respectively. In this case, <u>unstable sorting</u> may cause the ordered nature of the input data to be lost:

\`\`\`shell
# The input data is sorted by name
# (name, age)
  ('A', 19)
  ('B', 18)
  ('C', 21)
  ('D', 19)
  ('E', 23)

# Suppose we use an unstable sorting algorithm to sort the list by age.
# In the result, the relative positions of ('D', 19) and ('A', 19) change,
# so the property that the input data is sorted by name is lost.
  ('B', 18)
  ('D', 19)
  ('A', 19)
  ('C', 21)
  ('E', 23)
\`\`\`

**Adaptability**: <u>Adaptive sorting</u> can utilize the existing order information in the input data to reduce the amount of computation, achieving better time efficiency. The best-case time complexity of adaptive sorting algorithms is typically better than the average time complexity.

**Comparison-based or non-comparison**: <u>Comparison-based sorting</u> relies on comparison operators ($<$, $=$, $>$) to determine the relative order of elements, thereby sorting the entire array, with a theoretical optimal time complexity of $O(n \\log n)$. <u>Non-comparison sorting</u> does not use comparison operators and can achieve a time complexity of $O(n)$, but its versatility is relatively limited.

## Ideal Sorting Algorithm

**Fast, in-place, stable, adaptive, and broadly applicable**. Clearly, no sorting algorithm has been discovered to date that combines all of these characteristics. Therefore, when selecting a sorting algorithm, it is necessary to decide based on the specific characteristics of the data and the requirements of the problem.

Next, we will examine various sorting algorithms and analyze their advantages and disadvantages based on the evaluation dimensions above.
`
  },

  'dsa-selection-sort': {
    title: '11.2 Sắp xếp Chọn (Selection Sort)',
    summary: 'Thuật toán Sắp xếp chọn: mỗi vòng chọn phần tử nhỏ nhất trong khoảng chưa sắp xếp. Độ phức tạp O(n^2), tại chỗ nhưng không ổn định.',
    tags: ['dsa', 'sorting', 'selection-sort'],
    domain: 'Algorithms',
    module: 'Chương 11: Sắp xếp',
    prerequisites: ['dsa-sorting-algorithms'],
    related: ['dsa-bubble-sort'],
    updatedAt: '2026-07-19',
    readTime: '8 phút',
    content: `
<p><u>Sắp xếp chọn (Selection sort)</u> hoạt động rất đơn giản: ở mỗi vòng, nó chọn phần tử nhỏ nhất trong khoảng chưa sắp xếp và đặt nó vào cuối khoảng đã sắp xếp.</p>
<p>Giả sử mảng có độ dài $n$. Quy trình của sắp xếp chọn được thể hiện trong hình bên dưới.</p>
<ol>
  <li>Ban đầu, tất cả các phần tử đều chưa được sắp xếp, tức khoảng (chỉ mục) chưa sắp xếp là $[0, n-1]$.</li>
  <li>Chọn phần tử nhỏ nhất trong khoảng $[0, n-1]$ và hoán đổi nó với phần tử tại chỉ mục $0$. Sau khi hoàn tất, phần tử đầu tiên của mảng đã được sắp xếp.</li>
  <li>Chọn phần tử nhỏ nhất trong khoảng $[1, n-1]$ và hoán đổi nó với phần tử tại chỉ mục $1$. Sau khi hoàn tất, 2 phần tử đầu tiên của mảng đã được sắp xếp.</li>
  <li>Tiếp tục như vậy. Sau $n - 1$ vòng chọn và hoán đổi, $n - 1$ phần tử đầu tiên của mảng đã được sắp xếp.</li>
  <li>Phần tử duy nhất còn lại chắc chắn là lớn nhất, nên không cần sắp xếp thêm và mảng đã được sắp xếp.</li>
</ol>

<div class="interactive-widget-wrapper" id="selection-sort-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img src="dsa-assets/selection_sort_step1.png" alt="Bước 1" style="max-width:100%;" /><p class="slide-caption">Bước 1: khởi tạo, khoảng chưa sắp xếp là toàn bộ mảng.</p></div>
    <div class="slide"><img src="dsa-assets/selection_sort_step2.png" alt="Bước 2" style="max-width:100%;" /><p class="slide-caption">Bước 2.</p></div>
    <div class="slide"><img src="dsa-assets/selection_sort_step3.png" alt="Bước 3" style="max-width:100%;" /><p class="slide-caption">Bước 3.</p></div>
    <div class="slide"><img src="dsa-assets/selection_sort_step4.png" alt="Bước 4" style="max-width:100%;" /><p class="slide-caption">Bước 4.</p></div>
    <div class="slide"><img src="dsa-assets/selection_sort_step5.png" alt="Bước 5" style="max-width:100%;" /><p class="slide-caption">Bước 5.</p></div>
    <div class="slide"><img src="dsa-assets/selection_sort_step6.png" alt="Bước 6" style="max-width:100%;" /><p class="slide-caption">Bước 6.</p></div>
    <div class="slide"><img src="dsa-assets/selection_sort_step7.png" alt="Bước 7" style="max-width:100%;" /><p class="slide-caption">Bước 7.</p></div>
    <div class="slide"><img src="dsa-assets/selection_sort_step8.png" alt="Bước 8" style="max-width:100%;" /><p class="slide-caption">Bước 8.</p></div>
    <div class="slide"><img src="dsa-assets/selection_sort_step9.png" alt="Bước 9" style="max-width:100%;" /><p class="slide-caption">Bước 9.</p></div>
    <div class="slide"><img src="dsa-assets/selection_sort_step10.png" alt="Bước 10" style="max-width:100%;" /><p class="slide-caption">Bước 10.</p></div>
    <div class="slide"><img src="dsa-assets/selection_sort_step11.png" alt="Bước 11" style="max-width:100%;" /><p class="slide-caption">Bước 11: hoàn tất, mảng đã được sắp xếp.</p></div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('selection-sort-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 11</span>
      <button class="slider-btn" onclick="nextSlide('selection-sort-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>

<p>Trong đoạn mã, ta dùng $k$ để theo dõi phần tử nhỏ nhất trong khoảng chưa sắp xếp:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def selection_sort(nums: list[int]):
    """Sắp xếp chọn"""
    n = len(nums)
    # Vòng lặp ngoài: khoảng chưa sắp xếp là [i, n-1]
    for i in range(n - 1):
        # Vòng lặp trong: tìm phần tử nhỏ nhất trong khoảng chưa sắp xếp
        k = i
        for j in range(i + 1, n):
            if nums[j] &lt; nums[k]:
                k = j  # Ghi nhớ chỉ mục của phần tử nhỏ nhất
        # Hoán đổi phần tử nhỏ nhất với phần tử đầu tiên của khoảng chưa sắp xếp
        nums[i], nums[k] = nums[k], nums[i]
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Sắp xếp chọn */
void selectionSort(vector&lt;int&gt; &amp;nums) {
    int n = nums.size();
    // Vòng lặp ngoài: khoảng chưa sắp xếp là [i, n-1]
    for (int i = 0; i &lt; n - 1; i++) {
        // Vòng lặp trong: tìm phần tử nhỏ nhất trong khoảng chưa sắp xếp
        int k = i;
        for (int j = i + 1; j &lt; n; j++) {
            if (nums[j] &lt; nums[k])
                k = j; // Ghi nhớ chỉ mục của phần tử nhỏ nhất
        }
        // Hoán đổi phần tử nhỏ nhất với phần tử đầu tiên của khoảng chưa sắp xếp
        swap(nums[i], nums[k]);
    }
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Sắp xếp chọn */
static void selectionSort(int[] nums) {
    int n = nums.length;
    // Vòng lặp ngoài: khoảng chưa sắp xếp là [i, n-1]
    for (int i = 0; i &lt; n - 1; i++) {
        // Vòng lặp trong: tìm phần tử nhỏ nhất trong khoảng chưa sắp xếp
        int k = i;
        for (int j = i + 1; j &lt; n; j++) {
            if (nums[j] &lt; nums[k])
                k = j; // Ghi nhớ chỉ mục của phần tử nhỏ nhất
        }
        // Hoán đổi phần tử nhỏ nhất với phần tử đầu tiên của khoảng chưa sắp xếp
        int temp = nums[i];
        nums[i] = nums[k];
        nums[k] = temp;
    }
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Sắp xếp chọn */
function selectionSort(nums) {
    let n = nums.length;
    // Vòng lặp ngoài: khoảng chưa sắp xếp là [i, n-1]
    for (let i = 0; i &lt; n - 1; i++) {
        // Vòng lặp trong: tìm phần tử nhỏ nhất trong khoảng chưa sắp xếp
        let k = i;
        for (let j = i + 1; j &lt; n; j++) {
            if (nums[j] &lt; nums[k]) {
                k = j; // Ghi nhớ chỉ mục của phần tử nhỏ nhất
            }
        }
        // Hoán đổi phần tử nhỏ nhất với phần tử đầu tiên của khoảng chưa sắp xếp
        [nums[i], nums[k]] = [nums[k], nums[i]];
    }
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Sắp xếp chọn */
fun selectionSort(nums: IntArray) {
    val n = nums.size
    // Vòng lặp ngoài: khoảng chưa sắp xếp là [i, n-1]
    for (i in 0..&lt;n - 1) {
        var k = i
        // Vòng lặp trong: tìm phần tử nhỏ nhất trong khoảng chưa sắp xếp
        for (j in i + 1..&lt;n) {
            if (nums[j] &lt; nums[k])
                k = j // Ghi nhớ chỉ mục của phần tử nhỏ nhất
        }
        // Hoán đổi phần tử nhỏ nhất với phần tử đầu tiên của khoảng chưa sắp xếp
        val temp = nums[i]
        nums[i] = nums[k]
        nums[k] = temp
    }
}
</code></pre></div></div></div>
<h2>11.2.1 Đặc điểm Thuật toán</h2>
<ul>
  <li><strong>Độ phức tạp thời gian $O(n^2)$, không thích ứng</strong>: Vòng lặp ngoài có tổng cộng $n - 1$ vòng. Độ dài khoảng chưa sắp xếp ở vòng đầu tiên là $n$, và độ dài khoảng chưa sắp xếp ở vòng cuối cùng là $2$. Tức là các vòng của vòng lặp ngoài chứa vòng lặp trong với $n$, $n - 1$, $\\dots$, $3$, và $2$ lần lặp, tổng cộng là $\\frac{(n - 1)(n + 2)}{2}$.</li>
  <li><strong>Độ phức tạp không gian $O(1)$, sắp xếp tại chỗ</strong>: Con trỏ $i$ và $j$ sử dụng một lượng không gian phụ trợ không đổi.</li>
  <li><strong>Sắp xếp không ổn định</strong>: Như hình bên dưới, phần tử <code>nums[i]</code> có thể bị hoán đổi sang bên phải của một phần tử bằng nó, khiến thứ tự tương đối của chúng thay đổi.</li>
</ul>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/selection_sort_instability.png" alt="Ví dụ tính không ổn định của sắp xếp chọn" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>11.2.2 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="selection-sort-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'selection-sort-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'selection-sort-wrapper', 'tab-interactive'); initSortDemo('selection-sort-wrapper', SORT_FRAMES_SELECTIONSORT)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem từng bước sắp xếp chọn trên mảng <code>[4, 1, 3, 1, 5, 2]</code>.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="selection-sort-wrapper-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="selection-sort-wrapper-btn-autorun" class="control-btn" onclick="autoRunSortDemo('selection-sort-wrapper')">▶ Auto Run</button>
      <button id="selection-sort-wrapper-btn-step" class="control-btn btn-secondary" onclick="stepSortDemo('selection-sort-wrapper')">Bước tiếp theo ▶</button>
      <button id="selection-sort-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunSortDemo('selection-sort-wrapper')" disabled>⏸ Dừng</button>
      <button id="selection-sort-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initSortDemo('selection-sort-wrapper', SORT_FRAMES_SELECTIONSORT)">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setSortDemoSpeed('selection-sort-wrapper', this.value)" /> <span id="selection-sort-wrapper-speed-label">700ms</span>
    </div>
    <div id="selection-sort-wrapper-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu.</div>
  </div>
</div>
`,
    originalContent: `# Selection Sort

<u>Selection sort</u> works very simply: in each round, it selects the smallest element from the unsorted interval and places it at the end of the sorted interval.

Assume the array has length $n$. The procedure of selection sort is shown in the figure below.

1. Initially, all elements are unsorted, i.e., the unsorted (index) interval is $[0, n-1]$.
2. Select the smallest element in the interval $[0, n-1]$ and swap it with the element at index $0$. After completion, the first element of the array is sorted.
3. Select the smallest element in the interval $[1, n-1]$ and swap it with the element at index $1$. After completion, the first 2 elements of the array are sorted.
4. And so on. After $n - 1$ rounds of selection and swapping, the first $n - 1$ elements of the array are sorted.
5. The only remaining element must be the largest, so no further sorting is needed and the array is sorted.

=== "<1>"
    ![Selection sort steps](selection_sort.assets/selection_sort_step1.png)

=== "<2>"
    ![selection_sort_step2](selection_sort.assets/selection_sort_step2.png)

=== "<3>"
    ![selection_sort_step3](selection_sort.assets/selection_sort_step3.png)

=== "<4>"
    ![selection_sort_step4](selection_sort.assets/selection_sort_step4.png)

=== "<5>"
    ![selection_sort_step5](selection_sort.assets/selection_sort_step5.png)

=== "<6>"
    ![selection_sort_step6](selection_sort.assets/selection_sort_step6.png)

=== "<7>"
    ![selection_sort_step7](selection_sort.assets/selection_sort_step7.png)

=== "<8>"
    ![selection_sort_step8](selection_sort.assets/selection_sort_step8.png)

=== "<9>"
    ![selection_sort_step9](selection_sort.assets/selection_sort_step9.png)

=== "<10>"
    ![selection_sort_step10](selection_sort.assets/selection_sort_step10.png)

=== "<11>"
    ![selection_sort_step11](selection_sort.assets/selection_sort_step11.png)

In the code, we use $k$ to track the smallest element within the unsorted interval:

\`\`\`src
[file]{selection_sort}-[class]{}-[func]{selection_sort}
\`\`\`

## Algorithm Characteristics

- **Time complexity $O(n^2)$, non-adaptive sorting**: The outer loop has $n - 1$ rounds in total. The length of the unsorted interval in the first round is $n$, and the length of the unsorted interval in the last round is $2$. That is, the rounds of the outer loop contain inner loops with $n$, $n - 1$, $\\dots$, $3$, and $2$ iterations, summing to $\\frac{(n - 1)(n + 2)}{2}$.
- **Space complexity $O(1)$, in-place sorting**: Pointers $i$ and $j$ use a constant amount of extra space.
- **Unstable sorting**: As shown in the figure below, element \`nums[i]\` may be swapped to the right of an element equal to it, causing a change in their relative order.

![Selection sort non-stability example](selection_sort.assets/selection_sort_instability.png)
`
  },

  'dsa-bubble-sort': {
    title: '11.3 Sắp xếp Nổi bọt (Bubble Sort)',
    summary: 'Thuật toán Sắp xếp nổi bọt: liên tục so sánh và hoán đổi các phần tử liền kề. Tối ưu bằng cờ flag để đạt O(n) trong trường hợp tốt nhất.',
    tags: ['dsa', 'sorting', 'bubble-sort'],
    domain: 'Algorithms',
    module: 'Chương 11: Sắp xếp',
    prerequisites: ['dsa-selection-sort'],
    related: ['dsa-insertion-sort'],
    updatedAt: '2026-07-19',
    readTime: '8 phút',
    content: `
<p><u>Sắp xếp nổi bọt (Bubble sort)</u> sắp xếp một mảng bằng cách liên tục so sánh và hoán đổi các phần tử liền kề. Quá trình này giống như bong bóng nổi từ đáy lên đỉnh, do đó có tên gọi sắp xếp nổi bọt.</p>
<p>Như hình bên dưới, quá trình "nổi bọt" có thể được mô phỏng bằng cách hoán đổi phần tử: bắt đầu từ đầu bên trái của mảng và duyệt sang phải, so sánh từng cặp phần tử liền kề, và nếu "phần tử trái > phần tử phải" thì hoán đổi chúng. Sau khi duyệt xong, phần tử lớn nhất được chuyển tới đầu bên phải của mảng.</p>

<div class="interactive-widget-wrapper" id="bubble-sort-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img src="dsa-assets/bubble_operation_step1.png" alt="Bước 1" style="max-width:100%;" /><p class="slide-caption">Mô phỏng "nổi bọt" bằng cách hoán đổi phần tử — bước 1.</p></div>
    <div class="slide"><img src="dsa-assets/bubble_operation_step2.png" alt="Bước 2" style="max-width:100%;" /><p class="slide-caption">Bước 2.</p></div>
    <div class="slide"><img src="dsa-assets/bubble_operation_step3.png" alt="Bước 3" style="max-width:100%;" /><p class="slide-caption">Bước 3.</p></div>
    <div class="slide"><img src="dsa-assets/bubble_operation_step4.png" alt="Bước 4" style="max-width:100%;" /><p class="slide-caption">Bước 4.</p></div>
    <div class="slide"><img src="dsa-assets/bubble_operation_step5.png" alt="Bước 5" style="max-width:100%;" /><p class="slide-caption">Bước 5.</p></div>
    <div class="slide"><img src="dsa-assets/bubble_operation_step6.png" alt="Bước 6" style="max-width:100%;" /><p class="slide-caption">Bước 6.</p></div>
    <div class="slide"><img src="dsa-assets/bubble_operation_step7.png" alt="Bước 7" style="max-width:100%;" /><p class="slide-caption">Bước 7: phần tử lớn nhất đã nổi lên đầu bên phải.</p></div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('bubble-sort-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 7</span>
      <button class="slider-btn" onclick="nextSlide('bubble-sort-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>

<h2>11.3.1 Quy trình Thuật toán</h2>
<p>Giả sử mảng có độ dài $n$. Các bước của sắp xếp nổi bọt được thể hiện trong hình bên dưới.</p>
<ol>
  <li>Đầu tiên, thực hiện "nổi bọt" trên $n$ phần tử, <strong>hoán đổi phần tử lớn nhất của mảng vào đúng vị trí của nó</strong>.</li>
  <li>Tiếp theo, thực hiện "nổi bọt" trên $n - 1$ phần tử còn lại, <strong>hoán đổi phần tử lớn thứ hai vào đúng vị trí của nó</strong>.</li>
  <li>Tiếp tục như vậy. Sau $n - 1$ vòng "nổi bọt", <strong>$n - 1$ phần tử lớn nhất đều đã được hoán đổi vào đúng vị trí của chúng</strong>.</li>
  <li>Phần tử duy nhất còn lại chắc chắn là phần tử nhỏ nhất, không cần sắp xếp, vậy nên việc sắp xếp mảng đã hoàn tất.</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/bubble_sort_overview.png" alt="Quy trình sắp xếp nổi bọt" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Đoạn mã ví dụ như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def bubble_sort(nums: list[int]):
    """Sắp xếp nổi bọt"""
    n = len(nums)
    # Vòng lặp ngoài: khoảng chưa sắp xếp là [0, i]
    for i in range(n - 1, 0, -1):
        # Vòng lặp trong: đẩy phần tử lớn nhất trong khoảng [0, i] về cuối khoảng đó
        for j in range(i):
            if nums[j] &gt; nums[j + 1]:
                # Hoán đổi nums[j] và nums[j + 1]
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
</code></pre></div></div></div>
<h2>11.3.2 Tối ưu hóa Hiệu suất</h2>
<p>Ta có thể quan sát thấy rằng nếu không có hoán đổi nào xảy ra trong một vòng "nổi bọt", mảng đã được sắp xếp và thuật toán có thể trả về ngay lập tức. Do đó, ta có thể thêm một cờ <code>flag</code> để phát hiện tình huống này và dừng lại ngay khi nó xảy ra.</p>
<p>Sau khi tối ưu này, độ phức tạp thời gian trường hợp xấu nhất và trung bình của sắp xếp nổi bọt vẫn là $O(n^2)$; tuy nhiên, khi mảng đầu vào đã được sắp xếp sẵn, độ phức tạp thời gian trường hợp tốt nhất trở thành $O(n)$.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def bubble_sort(nums: list[int]):
    """Sắp xếp nổi bọt"""
    n = len(nums)
    # Vòng lặp ngoài: khoảng chưa sắp xếp là [0, i]
    for i in range(n - 1, 0, -1):
        # Vòng lặp trong: đẩy phần tử lớn nhất trong khoảng [0, i] về cuối khoảng đó
        for j in range(i):
            if nums[j] &gt; nums[j + 1]:
                # Hoán đổi nums[j] và nums[j + 1]
                nums[j], nums[j + 1] = nums[j + 1], nums[j]


def bubble_sort_with_flag(nums: list[int]):
    """Sắp xếp nổi bọt (tối ưu bằng flag)"""
    n = len(nums)
    # Vòng lặp ngoài: khoảng chưa sắp xếp là [0, i]
    for i in range(n - 1, 0, -1):
        flag = False  # Khởi tạo flag
        # Vòng lặp trong: đẩy phần tử lớn nhất trong khoảng [0, i] về cuối khoảng đó
        for j in range(i):
            if nums[j] &gt; nums[j + 1]:
                # Hoán đổi nums[j] và nums[j + 1]
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
                flag = True  # Ghi nhận có hoán đổi
        if not flag:
            break  # Vòng "nổi bọt" này không có hoán đổi nào, thoát ngay
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Sắp xếp nổi bọt */
void bubbleSort(vector&lt;int&gt; &amp;nums) {
    // Vòng lặp ngoài: khoảng chưa sắp xếp là [0, i]
    for (int i = nums.size() - 1; i &gt; 0; i--) {
        // Vòng lặp trong: đẩy phần tử lớn nhất trong khoảng [0, i] về cuối khoảng đó
        for (int j = 0; j &lt; i; j++) {
            if (nums[j] &gt; nums[j + 1]) {
                // Hoán đổi nums[j] và nums[j + 1]
                swap(nums[j], nums[j + 1]);
            }
        }
    }
}

/* Sắp xếp nổi bọt (tối ưu bằng flag) */
void bubbleSortWithFlag(vector&lt;int&gt; &amp;nums) {
    // Vòng lặp ngoài: khoảng chưa sắp xếp là [0, i]
    for (int i = nums.size() - 1; i &gt; 0; i--) {
        bool flag = false; // Khởi tạo flag
        // Vòng lặp trong: đẩy phần tử lớn nhất trong khoảng [0, i] về cuối khoảng đó
        for (int j = 0; j &lt; i; j++) {
            if (nums[j] &gt; nums[j + 1]) {
                swap(nums[j], nums[j + 1]);
                flag = true; // Ghi nhận có hoán đổi
            }
        }
        if (!flag)
            break; // Vòng "nổi bọt" này không có hoán đổi nào, thoát ngay
    }
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Sắp xếp nổi bọt */
static void bubbleSort(int[] nums) {
    // Vòng lặp ngoài: khoảng chưa sắp xếp là [0, i]
    for (int i = nums.length - 1; i &gt; 0; i--) {
        // Vòng lặp trong: đẩy phần tử lớn nhất trong khoảng [0, i] về cuối khoảng đó
        for (int j = 0; j &lt; i; j++) {
            if (nums[j] &gt; nums[j + 1]) {
                int tmp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = tmp;
            }
        }
    }
}

/* Sắp xếp nổi bọt (tối ưu bằng flag) */
static void bubbleSortWithFlag(int[] nums) {
    // Vòng lặp ngoài: khoảng chưa sắp xếp là [0, i]
    for (int i = nums.length - 1; i &gt; 0; i--) {
        boolean flag = false; // Khởi tạo flag
        for (int j = 0; j &lt; i; j++) {
            if (nums[j] &gt; nums[j + 1]) {
                int tmp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = tmp;
                flag = true; // Ghi nhận có hoán đổi
            }
        }
        if (!flag)
            break; // Vòng "nổi bọt" này không có hoán đổi nào, thoát ngay
    }
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Sắp xếp nổi bọt */
function bubbleSort(nums) {
    // Vòng lặp ngoài: khoảng chưa sắp xếp là [0, i]
    for (let i = nums.length - 1; i &gt; 0; i--) {
        // Vòng lặp trong: đẩy phần tử lớn nhất trong khoảng [0, i] về cuối khoảng đó
        for (let j = 0; j &lt; i; j++) {
            if (nums[j] &gt; nums[j + 1]) {
                let tmp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = tmp;
            }
        }
    }
}

/* Sắp xếp nổi bọt (tối ưu bằng flag) */
function bubbleSortWithFlag(nums) {
    // Vòng lặp ngoài: khoảng chưa sắp xếp là [0, i]
    for (let i = nums.length - 1; i &gt; 0; i--) {
        let flag = false; // Khởi tạo flag
        for (let j = 0; j &lt; i; j++) {
            if (nums[j] &gt; nums[j + 1]) {
                let tmp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = tmp;
                flag = true; // Ghi nhận có hoán đổi
            }
        }
        if (!flag) break; // Vòng "nổi bọt" này không có hoán đổi nào, thoát ngay
    }
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Sắp xếp nổi bọt */
fun bubbleSort(nums: IntArray) {
    // Vòng lặp ngoài: khoảng chưa sắp xếp là [0, i]
    for (i in nums.size - 1 downTo 1) {
        // Vòng lặp trong: đẩy phần tử lớn nhất trong khoảng [0, i] về cuối khoảng đó
        for (j in 0..&lt;i) {
            if (nums[j] &gt; nums[j + 1]) {
                val temp = nums[j]
                nums[j] = nums[j + 1]
                nums[j + 1] = temp
            }
        }
    }
}

/* Sắp xếp nổi bọt (tối ưu bằng flag) */
fun bubbleSortWithFlag(nums: IntArray) {
    // Vòng lặp ngoài: khoảng chưa sắp xếp là [0, i]
    for (i in nums.size - 1 downTo 1) {
        var flag = false // Khởi tạo flag
        for (j in 0..&lt;i) {
            if (nums[j] &gt; nums[j + 1]) {
                val temp = nums[j]
                nums[j] = nums[j + 1]
                nums[j + 1] = temp
                flag = true // Ghi nhận có hoán đổi
            }
        }
        if (!flag) break // Vòng "nổi bọt" này không có hoán đổi nào, thoát ngay
    }
}
</code></pre></div></div></div>
<h2>11.3.3 Đặc điểm Thuật toán</h2>
<ul>
  <li><strong>Độ phức tạp thời gian $O(n^2)$; thích ứng</strong>: Trong các vòng "nổi bọt" liên tiếp, phần đã duyệt của mảng có độ dài $n - 1$, $n - 2$, $\\dots$, $2$, $1$, tổng cộng $(n - 1) n / 2$. Sau khi thêm tối ưu <code>flag</code>, độ phức tạp thời gian trường hợp tốt nhất có thể đạt $O(n)$.</li>
  <li><strong>Độ phức tạp không gian $O(1)$, sắp xếp tại chỗ</strong>: Con trỏ $i$ và $j$ sử dụng một lượng không gian phụ trợ không đổi.</li>
  <li><strong>Sắp xếp ổn định</strong>: Các phần tử bằng nhau không bị hoán đổi trong quá trình "nổi bọt".</li>
</ul>

<h2>11.3.4 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="bubble-sort-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'bubble-sort-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'bubble-sort-wrapper', 'tab-interactive'); initSortDemo('bubble-sort-wrapper', SORT_FRAMES_BUBBLESORT)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem từng bước sắp xếp nổi bọt (có tối ưu flag) trên mảng <code>[4, 1, 3, 1, 5, 2]</code>.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="bubble-sort-wrapper-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="bubble-sort-wrapper-btn-autorun" class="control-btn" onclick="autoRunSortDemo('bubble-sort-wrapper')">▶ Auto Run</button>
      <button id="bubble-sort-wrapper-btn-step" class="control-btn btn-secondary" onclick="stepSortDemo('bubble-sort-wrapper')">Bước tiếp theo ▶</button>
      <button id="bubble-sort-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunSortDemo('bubble-sort-wrapper')" disabled>⏸ Dừng</button>
      <button id="bubble-sort-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initSortDemo('bubble-sort-wrapper', SORT_FRAMES_BUBBLESORT)">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setSortDemoSpeed('bubble-sort-wrapper', this.value)" /> <span id="bubble-sort-wrapper-speed-label">700ms</span>
    </div>
    <div id="bubble-sort-wrapper-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu.</div>
  </div>
</div>
`,
    originalContent: `# Bubble Sort

<u>Bubble sort</u> sorts an array by continuously comparing and swapping adjacent elements. This process resembles bubbles rising from the bottom to the top, hence the name bubble sort.

As shown in the figure below, the bubbling process can be simulated using element swaps: starting from the leftmost end of the array and traversing to the right, compare each pair of adjacent elements, and if "left element > right element", swap them. After the traversal is complete, the largest element is moved to the rightmost end of the array.

=== "<1>"
    ![Simulating bubble sort using element swaps](bubble_sort.assets/bubble_operation_step1.png)

=== "<2>"
    ![bubble_operation_step2](bubble_sort.assets/bubble_operation_step2.png)

=== "<3>"
    ![bubble_operation_step3](bubble_sort.assets/bubble_operation_step3.png)

=== "<4>"
    ![bubble_operation_step4](bubble_sort.assets/bubble_operation_step4.png)

=== "<5>"
    ![bubble_operation_step5](bubble_sort.assets/bubble_operation_step5.png)

=== "<6>"
    ![bubble_operation_step6](bubble_sort.assets/bubble_operation_step6.png)

=== "<7>"
    ![bubble_operation_step7](bubble_sort.assets/bubble_operation_step7.png)

## Algorithm Flow

Assume the array has length $n$. The steps of bubble sort are shown in the figure below.

1. First, perform "bubbling" on $n$ elements, **swapping the largest element of the array to its correct position**.
2. Next, perform "bubbling" on the remaining $n - 1$ elements, **swapping the second largest element to its correct position**.
3. And so on. After $n - 1$ rounds of "bubbling", **the largest $n - 1$ elements have all been swapped to their correct positions**.
4. The only remaining element must be the smallest element, requiring no sorting, so the array sorting is complete.

![Bubble sort flow](bubble_sort.assets/bubble_sort_overview.png)

Example code is as follows:

\`\`\`src
[file]{bubble_sort}-[class]{}-[func]{bubble_sort}
\`\`\`

## Efficiency Optimization

We can observe that if no swaps occur during a round of "bubbling", the array is already sorted and the algorithm can return immediately. Therefore, we can add a flag \`flag\` to detect this situation and terminate as soon as it occurs.

After this optimization, the worst-case and average-case time complexities of bubble sort remain $O(n^2)$; however, when the input array is already sorted, the best-case time complexity becomes $O(n)$.

\`\`\`src
[file]{bubble_sort}-[class]{}-[func]{bubble_sort_with_flag}
\`\`\`

## Algorithm Characteristics

- **Time complexity is $O(n^2)$; adaptive**: In successive rounds of "bubbling", the traversed portion of the array has lengths $n - 1$, $n - 2$, $\\dots$, $2$, $1$, for a total of $(n - 1) n / 2$. After introducing the \`flag\` optimization, the best-case time complexity can reach $O(n)$.
- **Space complexity of $O(1)$, in-place sorting**: Pointers $i$ and $j$ use a constant amount of extra space.
- **Stable sorting**: Equal elements are not swapped during "bubbling".
`
  },

  'dsa-insertion-sort': {
    title: '11.4 Sắp xếp Chèn (Insertion Sort)',
    summary: 'Thuật toán Sắp xếp chèn: chọn phần tử cơ sở và chèn vào đúng vị trí trong phần đã sắp xếp. Vì sao Insertion Sort thường được ưu tiên hơn Bubble/Selection Sort dù cùng O(n^2).',
    tags: ['dsa', 'sorting', 'insertion-sort'],
    domain: 'Algorithms',
    module: 'Chương 11: Sắp xếp',
    prerequisites: ['dsa-bubble-sort'],
    related: ['dsa-quick-sort'],
    updatedAt: '2026-07-19',
    readTime: '8 phút',
    content: `
<p><u>Sắp xếp chèn (Insertion sort)</u> là một thuật toán sắp xếp đơn giản, hoạt động rất giống với quá trình sắp xếp thủ công một bộ bài.</p>
<p>Cụ thể, ta chọn một phần tử cơ sở (base) từ phần chưa sắp xếp, so sánh nó lần lượt với các phần tử trong phần đã sắp xếp ở bên trái, và chèn nó vào đúng vị trí.</p>
<p>Hình bên dưới minh họa cách một phần tử được chèn vào mảng. Gọi phần tử cơ sở là <code>base</code>. Ta cần dịch tất cả các phần tử giữa chỉ mục mục tiêu và <code>base</code> sang phải một vị trí, sau đó gán <code>base</code> vào chỉ mục mục tiêu.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/insertion_operation.png" alt="Thao tác chèn đơn lẻ" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>11.4.1 Quy trình Thuật toán</h2>
<p>Quy trình tổng thể của sắp xếp chèn được thể hiện trong hình bên dưới.</p>
<ol>
  <li>Ban đầu, phần tử đầu tiên của mảng đã được sắp xếp.</li>
  <li>Chọn phần tử thứ hai của mảng làm <code>base</code>, và sau khi chèn nó vào đúng vị trí, <strong>2 phần tử đầu tiên của mảng đã được sắp xếp</strong>.</li>
  <li>Chọn phần tử thứ ba làm <code>base</code>, và sau khi chèn nó vào đúng vị trí, <strong>3 phần tử đầu tiên của mảng đã được sắp xếp</strong>.</li>
  <li>Tiếp tục như vậy. Ở vòng cuối cùng, chọn phần tử cuối cùng làm <code>base</code>, và sau khi chèn nó vào đúng vị trí, <strong>tất cả các phần tử đã được sắp xếp</strong>.</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/insertion_sort_overview.png" alt="Quy trình sắp xếp chèn" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Đoạn mã ví dụ như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def insertion_sort(nums: list[int]):
    """Sắp xếp chèn"""
    # Vòng lặp ngoài: khoảng đã sắp xếp là [0, i-1]
    for i in range(1, len(nums)):
        base = nums[i]
        j = i - 1
        # Vòng lặp trong: chèn base vào đúng vị trí trong khoảng đã sắp xếp [0, i-1]
        while j &gt;= 0 and nums[j] &gt; base:
            nums[j + 1] = nums[j]  # Dịch nums[j] sang phải một vị trí
            j -= 1
        nums[j + 1] = base  # Gán base vào đúng vị trí
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Sắp xếp chèn */
void insertionSort(vector&lt;int&gt; &amp;nums) {
    // Vòng lặp ngoài: khoảng đã sắp xếp là [0, i-1]
    for (int i = 1; i &lt; nums.size(); i++) {
        int base = nums[i], j = i - 1;
        // Vòng lặp trong: chèn base vào đúng vị trí trong khoảng đã sắp xếp [0, i-1]
        while (j &gt;= 0 &amp;&amp; nums[j] &gt; base) {
            nums[j + 1] = nums[j]; // Dịch nums[j] sang phải một vị trí
            j--;
        }
        nums[j + 1] = base; // Gán base vào đúng vị trí
    }
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Sắp xếp chèn */
static void insertionSort(int[] nums) {
    // Vòng lặp ngoài: khoảng đã sắp xếp là [0, i-1]
    for (int i = 1; i &lt; nums.length; i++) {
        int base = nums[i], j = i - 1;
        // Vòng lặp trong: chèn base vào đúng vị trí trong khoảng đã sắp xếp [0, i-1]
        while (j &gt;= 0 &amp;&amp; nums[j] &gt; base) {
            nums[j + 1] = nums[j]; // Dịch nums[j] sang phải một vị trí
            j--;
        }
        nums[j + 1] = base;        // Gán base vào đúng vị trí
    }
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Sắp xếp chèn */
function insertionSort(nums) {
    // Vòng lặp ngoài: khoảng đã sắp xếp là [0, i-1]
    for (let i = 1; i &lt; nums.length; i++) {
        let base = nums[i],
            j = i - 1;
        // Vòng lặp trong: chèn base vào đúng vị trí trong khoảng đã sắp xếp [0, i-1]
        while (j &gt;= 0 &amp;&amp; nums[j] &gt; base) {
            nums[j + 1] = nums[j]; // Dịch nums[j] sang phải một vị trí
            j--;
        }
        nums[j + 1] = base; // Gán base vào đúng vị trí
    }
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Sắp xếp chèn */
fun insertionSort(nums: IntArray) {
    // Vòng lặp ngoài: khoảng đã sắp xếp là [0, i-1]
    for (i in nums.indices) {
        val base = nums[i]
        var j = i - 1
        // Vòng lặp trong: chèn base vào đúng vị trí trong khoảng đã sắp xếp [0, i-1]
        while (j &gt;= 0 &amp;&amp; nums[j] &gt; base) {
            nums[j + 1] = nums[j] // Dịch nums[j] sang phải một vị trí
            j--
        }
        nums[j + 1] = base        // Gán base vào đúng vị trí
    }
}
</code></pre></div></div></div>
<h2>11.4.2 Đặc điểm Thuật toán</h2>
<ul>
  <li><strong>Độ phức tạp thời gian $O(n^2)$, sắp xếp thích ứng</strong>: Trong trường hợp xấu nhất, các thao tác chèn cần lần lượt $n - 1$, $n-2$, $\\dots$, $2$, và $1$ lần lặp, tổng cộng $(n - 1) n / 2$, nên độ phức tạp thời gian là $O(n^2)$. Khi dữ liệu đã được sắp xếp sẵn, mỗi thao tác chèn kết thúc sớm. Khi mảng đầu vào đã hoàn toàn được sắp xếp, sắp xếp chèn đạt độ phức tạp thời gian tốt nhất $O(n)$.</li>
  <li><strong>Độ phức tạp không gian $O(1)$, sắp xếp tại chỗ</strong>: Con trỏ $i$ và $j$ sử dụng một lượng không gian phụ trợ không đổi.</li>
  <li><strong>Sắp xếp ổn định</strong>: Trong quá trình chèn, ta đặt các phần tử vào bên phải của các phần tử bằng nó, nên thứ tự tương đối của chúng không đổi.</li>
</ul>

<h2>11.4.3 Ưu điểm của Sắp xếp Chèn</h2>
<p>Độ phức tạp thời gian của sắp xếp chèn là $O(n^2)$, trong khi độ phức tạp thời gian của sắp xếp nhanh mà ta sẽ học tiếp theo là $O(n \\log n)$. Mặc dù sắp xếp chèn có độ phức tạp thời gian cao hơn, <strong>nó thường nhanh hơn trên các tập dữ liệu nhỏ</strong>.</p>
<p>Kết luận này tương tự như kết luận về khi nào tìm kiếm tuyến tính và tìm kiếm nhị phân có thể áp dụng được. Các thuật toán như sắp xếp nhanh, với độ phức tạp $O(n \\log n)$, là các thuật toán sắp xếp chia để trị và thường liên quan tới nhiều phép toán nguyên thủy hơn. Khi tập dữ liệu nhỏ, giá trị của $n^2$ và $n \\log n$ tương đối gần nhau, nên độ phức tạp tiệm cận không chiếm ưu thế; thay vào đó, số phép toán nguyên thủy mỗi vòng mới là yếu tố quyết định.</p>
<p>Trên thực tế, các hàm sắp xếp có sẵn của nhiều ngôn ngữ lập trình (như Java) sử dụng sắp xếp chèn. Ý tưởng chung là: với mảng lớn, dùng các thuật toán sắp xếp chia để trị như sắp xếp nhanh; với mảng ngắn, dùng trực tiếp sắp xếp chèn.</p>
<p>Mặc dù sắp xếp nổi bọt, sắp xếp chọn, và sắp xếp chèn đều có độ phức tạp thời gian $O(n^2)$, trong thực tế, <strong>sắp xếp chèn được sử dụng thường xuyên hơn đáng kể so với sắp xếp nổi bọt và sắp xếp chọn</strong>, chủ yếu vì các lý do sau.</p>
<ul>
  <li>Sắp xếp nổi bọt được triển khai thông qua hoán đổi phần tử, đòi hỏi một biến tạm và liên quan tới 3 phép toán nguyên thủy; sắp xếp chèn được triển khai thông qua gán phần tử và chỉ cần 1 phép toán nguyên thủy. Do đó, <strong>sắp xếp nổi bọt thường có chi phí tính toán cao hơn sắp xếp chèn</strong>.</li>
  <li>Sắp xếp chọn có độ phức tạp thời gian $O(n^2)$ trong mọi trường hợp. <strong>Nếu cho một tập dữ liệu đã được sắp xếp một phần, sắp xếp chèn thường hiệu quả hơn sắp xếp chọn</strong>.</li>
  <li>Sắp xếp chọn không ổn định và không thể áp dụng cho sắp xếp nhiều cấp độ.</li>
</ul>

<h2>11.4.4 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="insertion-sort-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'insertion-sort-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'insertion-sort-wrapper', 'tab-interactive'); initSortDemo('insertion-sort-wrapper', SORT_FRAMES_INSERTIONSORT)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem từng bước sắp xếp chèn trên mảng <code>[4, 1, 3, 1, 5, 2]</code>.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="insertion-sort-wrapper-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="insertion-sort-wrapper-btn-autorun" class="control-btn" onclick="autoRunSortDemo('insertion-sort-wrapper')">▶ Auto Run</button>
      <button id="insertion-sort-wrapper-btn-step" class="control-btn btn-secondary" onclick="stepSortDemo('insertion-sort-wrapper')">Bước tiếp theo ▶</button>
      <button id="insertion-sort-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunSortDemo('insertion-sort-wrapper')" disabled>⏸ Dừng</button>
      <button id="insertion-sort-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initSortDemo('insertion-sort-wrapper', SORT_FRAMES_INSERTIONSORT)">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setSortDemoSpeed('insertion-sort-wrapper', this.value)" /> <span id="insertion-sort-wrapper-speed-label">700ms</span>
    </div>
    <div id="insertion-sort-wrapper-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu.</div>
  </div>
</div>
`,
    originalContent: `# Insertion Sort

<u>Insertion sort</u> is a simple sorting algorithm that works very similarly to the process of manually sorting a deck of cards.

Specifically, we select a base element from the unsorted portion, compare it one by one with the elements in the sorted portion to its left, and insert it into the correct position.

The figure below illustrates how an element is inserted into an array. Let the base element be \`base\`. We need to shift all elements between the target index and \`base\` one position to the right, and then assign \`base\` to the target index.

![Single insertion operation](insertion_sort.assets/insertion_operation.png)

## Algorithm Flow

The overall flow of insertion sort is shown in the figure below.

1. Initially, the first element of the array is already sorted.
2. Select the second element of the array as \`base\`, and after inserting it into the correct position, **the first 2 elements of the array are sorted**.
3. Select the third element as \`base\`, and after inserting it into the correct position, **the first 3 elements of the array are sorted**.
4. And so on. In the last round, select the last element as \`base\`, and after inserting it into the correct position, **all elements are sorted**.

![Insertion sort flow](insertion_sort.assets/insertion_sort_overview.png)

Example code is as follows:

\`\`\`src
[file]{insertion_sort}-[class]{}-[func]{insertion_sort}
\`\`\`

## Algorithm Characteristics

- **Time complexity of $O(n^2)$, adaptive sorting**: In the worst case, the insertion operations require $n - 1$, $n-2$, $\\dots$, $2$, and $1$ iterations, respectively, summing to $(n - 1) n / 2$, so the time complexity is $O(n^2)$. When the data is already sorted, each insertion operation terminates early. When the input array is completely sorted, insertion sort achieves its best-case time complexity of $O(n)$.
- **Space complexity of $O(1)$, in-place sorting**: Pointers $i$ and $j$ use a constant amount of extra space.
- **Stable sorting**: During insertion, we place elements to the right of equal elements, so their relative order is unchanged.

## Advantages of Insertion Sort

The time complexity of insertion sort is $O(n^2)$, while the time complexity of quick sort, which we will learn about next, is $O(n \\log n)$. Although insertion sort has a higher time complexity, **it is usually faster on small datasets**.

This conclusion is similar to the one about when linear search and binary search are applicable. Algorithms such as quick sort, with $O(n \\log n)$ complexity, are divide-and-conquer sorting algorithms and often involve more primitive operations. When the dataset is small, the values of $n^2$ and $n \\log n$ are relatively close, so asymptotic complexity does not dominate; instead, the number of primitive operations per round becomes the deciding factor.

In fact, the built-in sorting functions of many programming languages (such as Java) use insertion sort. The general idea is: for large arrays, use divide-and-conquer sorting algorithms such as quick sort; for short arrays, use insertion sort directly.

Although bubble sort, selection sort, and insertion sort all have a time complexity of $O(n^2)$, in actual situations, **insertion sort is used significantly more frequently than bubble sort and selection sort**, mainly for the following reasons.

- Bubble sort is implemented through element swaps, which require a temporary variable and involve 3 primitive operations; insertion sort is implemented through element assignment and requires only 1 primitive operation. Therefore, **bubble sort usually has higher computational overhead than insertion sort**.
- Selection sort has a time complexity of $O(n^2)$ in any case. **If given a set of partially ordered data, insertion sort is usually more efficient than selection sort**.
- Selection sort is unstable and cannot be applied to multi-level sorting.
`
  },

  'dsa-quick-sort': {
    title: '11.5 Sắp xếp Nhanh (Quick Sort)',
    summary: 'Thuật toán Sắp xếp nhanh dựa trên chia để trị: phân vùng lính canh (sentinel partitioning), tối ưu chọn pivot bằng số trung vị, và tối ưu độ sâu đệ quy xuống O(log n).',
    tags: ['dsa', 'sorting', 'quick-sort', 'divide-and-conquer'],
    domain: 'Algorithms',
    module: 'Chương 11: Sắp xếp',
    prerequisites: ['dsa-insertion-sort'],
    related: ['dsa-merge-sort'],
    updatedAt: '2026-07-19',
    readTime: '15 phút',
    content: `
<p><u>Sắp xếp nhanh (Quick sort)</u> là một thuật toán sắp xếp hiệu quả và được sử dụng rộng rãi, dựa trên chiến lược chia để trị.</p>
<p>Thao tác cốt lõi của sắp xếp nhanh là "phân vùng lính canh" (sentinel partitioning), mục tiêu của nó là chọn một phần tử làm "pivot", di chuyển tất cả các phần tử nhỏ hơn pivot sang bên trái nó, và di chuyển tất cả các phần tử lớn hơn pivot sang bên phải nó. Cụ thể, quy trình được thể hiện trong hình bên dưới.</p>
<ol>
  <li>Chọn phần tử ngoài cùng bên trái làm pivot, và khởi tạo hai con trỏ <code>i</code> và <code>j</code> tại hai đầu của mảng.</li>
  <li>Vào vòng lặp. Ở mỗi vòng, dùng <code>i</code> (<code>j</code>) để tìm phần tử đầu tiên lớn hơn (nhỏ hơn) pivot, sau đó hoán đổi hai phần tử đó.</li>
  <li>Lặp lại bước <code>2.</code> cho đến khi <code>i</code> và <code>j</code> gặp nhau, sau đó hoán đổi pivot vào vị trí ranh giới giữa hai mảng con.</li>
</ol>

<div class="interactive-widget-wrapper" id="quick-sort-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img src="dsa-assets/pivot_division_step1.png" alt="Bước 1" style="max-width:100%;" /><p class="slide-caption">Các bước phân vùng lính canh — bước 1.</p></div>
    <div class="slide"><img src="dsa-assets/pivot_division_step2.png" alt="Bước 2" style="max-width:100%;" /><p class="slide-caption">Bước 2.</p></div>
    <div class="slide"><img src="dsa-assets/pivot_division_step3.png" alt="Bước 3" style="max-width:100%;" /><p class="slide-caption">Bước 3.</p></div>
    <div class="slide"><img src="dsa-assets/pivot_division_step4.png" alt="Bước 4" style="max-width:100%;" /><p class="slide-caption">Bước 4.</p></div>
    <div class="slide"><img src="dsa-assets/pivot_division_step5.png" alt="Bước 5" style="max-width:100%;" /><p class="slide-caption">Bước 5.</p></div>
    <div class="slide"><img src="dsa-assets/pivot_division_step6.png" alt="Bước 6" style="max-width:100%;" /><p class="slide-caption">Bước 6.</p></div>
    <div class="slide"><img src="dsa-assets/pivot_division_step7.png" alt="Bước 7" style="max-width:100%;" /><p class="slide-caption">Bước 7.</p></div>
    <div class="slide"><img src="dsa-assets/pivot_division_step8.png" alt="Bước 8" style="max-width:100%;" /><p class="slide-caption">Bước 8.</p></div>
    <div class="slide"><img src="dsa-assets/pivot_division_step9.png" alt="Bước 9" style="max-width:100%;" /><p class="slide-caption">Bước 9: pivot đã ở đúng vị trí ranh giới.</p></div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('quick-sort-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 9</span>
      <button class="slider-btn" onclick="nextSlide('quick-sort-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>

<p>Sau khi phân vùng lính canh, mảng gốc được chia thành ba phần: mảng con trái, pivot, và mảng con phải, sao cho "mọi phần tử trong mảng con trái $\\leq$ pivot $\\leq$ mọi phần tử trong mảng con phải". Do đó, ta chỉ cần sắp xếp tiếp hai mảng con này.</p>
<div class="callout callout-note">
  <span class="callout-icon">📌</span>
  <div class="callout-body">
    <p><strong>Chiến lược chia để trị của sắp xếp nhanh</strong></p>
    <p>Bản chất của phân vùng lính canh là đơn giản hóa bài toán sắp xếp một mảng dài thành bài toán sắp xếp hai mảng ngắn hơn.</p>
  </div>
</div>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def partition(self, nums: list[int], left: int, right: int) -&gt; int:
    """Phân vùng lính canh (Sentinel partition)"""
    # Dùng nums[left] làm pivot
    i, j = left, right
    while i &lt; j:
        while i &lt; j and nums[j] &gt;= nums[left]:
            j -= 1  # Tìm từ phải sang trái phần tử đầu tiên nhỏ hơn pivot
        while i &lt; j and nums[i] &lt;= nums[left]:
            i += 1  # Tìm từ trái sang phải phần tử đầu tiên lớn hơn pivot
        # Hoán đổi hai phần tử
        nums[i], nums[j] = nums[j], nums[i]
    # Hoán đổi pivot vào ranh giới giữa hai mảng con
    nums[i], nums[left] = nums[left], nums[i]
    return i  # Trả về chỉ mục của pivot
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Phân vùng lính canh (Sentinel partition) */
int partition(vector&lt;int&gt; &amp;nums, int left, int right) {
    // Dùng nums[left] làm pivot
    int i = left, j = right;
    while (i &lt; j) {
        while (i &lt; j &amp;&amp; nums[j] &gt;= nums[left])
            j--;                // Tìm từ phải sang trái phần tử đầu tiên nhỏ hơn pivot
        while (i &lt; j &amp;&amp; nums[i] &lt;= nums[left])
            i++;                // Tìm từ trái sang phải phần tử đầu tiên lớn hơn pivot
        swap(nums[i], nums[j]); // Hoán đổi hai phần tử
    }
    swap(nums[i], nums[left]);  // Hoán đổi pivot vào ranh giới giữa hai mảng con
    return i;                   // Trả về chỉ mục của pivot
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Phân vùng lính canh (Sentinel partition) */
static int partition(int[] nums, int left, int right) {
    // Dùng nums[left] làm pivot
    int i = left, j = right;
    while (i &lt; j) {
        while (i &lt; j &amp;&amp; nums[j] &gt;= nums[left])
            j--;          // Tìm từ phải sang trái phần tử đầu tiên nhỏ hơn pivot
        while (i &lt; j &amp;&amp; nums[i] &lt;= nums[left])
            i++;          // Tìm từ trái sang phải phần tử đầu tiên lớn hơn pivot
        swap(nums, i, j); // Hoán đổi hai phần tử
    }
    swap(nums, i, left);  // Hoán đổi pivot vào ranh giới giữa hai mảng con
    return i;             // Trả về chỉ mục của pivot
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Phân vùng lính canh (Sentinel partition) */
partition(nums, left, right) {
    // Dùng nums[left] làm pivot
    let i = left,
        j = right;
    while (i &lt; j) {
        while (i &lt; j &amp;&amp; nums[j] &gt;= nums[left]) {
            j -= 1; // Tìm từ phải sang trái phần tử đầu tiên nhỏ hơn pivot
        }
        while (i &lt; j &amp;&amp; nums[i] &lt;= nums[left]) {
            i += 1; // Tìm từ trái sang phải phần tử đầu tiên lớn hơn pivot
        }
        this.swap(nums, i, j); // Hoán đổi hai phần tử
    }
    this.swap(nums, i, left); // Hoán đổi pivot vào ranh giới giữa hai mảng con
    return i; // Trả về chỉ mục của pivot
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Phân vùng lính canh (Sentinel partition) */
fun partition(nums: IntArray, left: Int, right: Int): Int {
    // Dùng nums[left] làm pivot
    var i = left
    var j = right
    while (i &lt; j) {
        while (i &lt; j &amp;&amp; nums[j] &gt;= nums[left])
            j--           // Tìm từ phải sang trái phần tử đầu tiên nhỏ hơn pivot
        while (i &lt; j &amp;&amp; nums[i] &lt;= nums[left])
            i++           // Tìm từ trái sang phải phần tử đầu tiên lớn hơn pivot
        swap(nums, i, j)  // Hoán đổi hai phần tử
    }
    swap(nums, i, left)   // Hoán đổi pivot vào ranh giới giữa hai mảng con
    return i              // Trả về chỉ mục của pivot
}
</code></pre></div></div></div>
<h2>11.5.1 Quy trình Thuật toán</h2>
<p>Quy trình tổng thể của sắp xếp nhanh được thể hiện trong hình bên dưới.</p>
<ol>
  <li>Đầu tiên, thực hiện một lần "phân vùng lính canh" trên mảng gốc để có mảng con trái và mảng con phải chưa sắp xếp.</li>
  <li>Sau đó, đệ quy thực hiện "phân vùng lính canh" trên mảng con trái và mảng con phải tương ứng.</li>
  <li>Tiếp tục đệ quy cho đến khi độ dài mảng con là 1, lúc đó việc sắp xếp toàn bộ mảng đã hoàn tất.</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/quick_sort_overview.png" alt="Quy trình sắp xếp nhanh" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def quick_sort(self, nums: list[int], left: int, right: int):
    """Sắp xếp nhanh"""
    # Dừng đệ quy khi độ dài mảng con là 1
    if left &gt;= right:
        return
    # Phân vùng lính canh
    pivot = self.partition(nums, left, right)
    # Đệ quy xử lý mảng con trái và mảng con phải
    self.quick_sort(nums, left, pivot - 1)
    self.quick_sort(nums, pivot + 1, right)
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Sắp xếp nhanh */
void quickSort(vector&lt;int&gt; &amp;nums, int left, int right) {
    // Dừng đệ quy khi độ dài mảng con là 1
    if (left &gt;= right)
        return;
    // Phân vùng lính canh
    int pivot = partition(nums, left, right);
    // Đệ quy xử lý mảng con trái và mảng con phải
    quickSort(nums, left, pivot - 1);
    quickSort(nums, pivot + 1, right);
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Sắp xếp nhanh */
public static void quickSort(int[] nums, int left, int right) {
    // Dừng đệ quy khi độ dài mảng con là 1
    if (left &gt;= right)
        return;
    // Phân vùng lính canh
    int pivot = partition(nums, left, right);
    // Đệ quy xử lý mảng con trái và mảng con phải
    quickSort(nums, left, pivot - 1);
    quickSort(nums, pivot + 1, right);
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Sắp xếp nhanh */
quickSort(nums, left, right) {
    // Dừng đệ quy khi độ dài mảng con là 1
    if (left &gt;= right) return;
    // Phân vùng lính canh
    const pivot = this.partition(nums, left, right);
    // Đệ quy xử lý mảng con trái và mảng con phải
    this.quickSort(nums, left, pivot - 1);
    this.quickSort(nums, pivot + 1, right);
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Sắp xếp nhanh */
fun quickSort(nums: IntArray, left: Int, right: Int) {
    // Dừng đệ quy khi độ dài mảng con là 1
    if (left &gt;= right) return
    // Phân vùng lính canh
    val pivot = partition(nums, left, right)
    // Đệ quy xử lý mảng con trái và mảng con phải
    quickSort(nums, left, pivot - 1)
    quickSort(nums, pivot + 1, right)
}
</code></pre></div></div></div>
<h2>11.5.2 Đặc điểm Thuật toán</h2>
<ul>
  <li><strong>Độ phức tạp thời gian $O(n \\log n)$, không thích ứng</strong>: Trung bình, phân vùng lính canh tạo ra $\\log n$ tầng đệ quy, và tổng số lần lặp vòng lặp thực hiện ở mỗi tầng là $n$, nên độ phức tạp thời gian tổng thể là $O(n \\log n)$. Trong trường hợp xấu nhất, mỗi vòng phân vùng lính canh chia một mảng độ dài $n$ thành các mảng con độ dài $0$ và $n - 1$. Độ sâu đệ quy khi đó đạt tới $n$, với $n$ lần lặp vòng lặp ở mỗi tầng, cho độ phức tạp thời gian tổng thể là $O(n^2)$.</li>
  <li><strong>Độ phức tạp không gian $O(n)$, sắp xếp tại chỗ</strong>: Trong trường hợp mảng đầu vào hoàn toàn bị đảo ngược, độ sâu đệ quy xấu nhất đạt tới $n$, sử dụng $O(n)$ không gian ngăn xếp (stack frame). Thao tác sắp xếp được thực hiện trên mảng gốc mà không cần thêm mảng phụ trợ.</li>
  <li><strong>Sắp xếp không ổn định</strong>: Ở bước cuối cùng của phân vùng lính canh, pivot có thể bị hoán đổi sang bên phải của một phần tử bằng nó.</li>
</ul>

<h2>11.5.3 Vì sao Sắp xếp Nhanh lại Nhanh</h2>
<p>Đúng như tên gọi, sắp xếp nhanh có ưu thế hiệu suất rõ ràng. Mặc dù độ phức tạp thời gian trung bình của nó giống với "sắp xếp trộn" và "sắp xếp vun đống", sắp xếp nhanh thường nhanh hơn trong thực tế vì các lý do sau.</p>
<ul>
  <li><strong>Trường hợp xấu nhất khó xảy ra</strong>: Mặc dù độ phức tạp thời gian xấu nhất của sắp xếp nhanh là $O(n^2)$ và hiệu suất của nó khó dự đoán hơn sắp xếp trộn, sắp xếp nhanh chạy với thời gian $O(n \\log n)$ trong đại đa số trường hợp.</li>
  <li><strong>Hiệu quả bộ nhớ đệm (cache) cao</strong>: Trong quá trình phân vùng lính canh, hệ thống có thể nạp toàn bộ mảng con vào cache, nên việc truy cập phần tử tương đối hiệu quả. Ngược lại, các thuật toán như "sắp xếp vun đống" yêu cầu truy cập phần tử không liên tục nên không có ưu thế này.</li>
  <li><strong>Hằng số nhỏ</strong>: Trong ba thuật toán trên, sắp xếp nhanh thực hiện ít phép so sánh, gán, và hoán đổi nhất. Điều này tương tự lý do vì sao "sắp xếp chèn" nhanh hơn "sắp xếp nổi bọt".</li>
</ul>

<h2>11.5.4 Tối ưu Pivot</h2>
<p><strong>Sắp xếp nhanh có thể trở nên kém hiệu quả về thời gian với một số đầu vào nhất định</strong>. Xem xét ví dụ cực đoan trong đó mảng đầu vào được sắp xếp giảm dần hoàn toàn. Vì ta chọn phần tử ngoài cùng bên trái làm pivot, sau khi phân vùng lính canh hoàn tất, pivot bị hoán đổi ra ngoài cùng bên phải của mảng, để lại mảng con trái độ dài $n - 1$ và mảng con phải độ dài $0$. Nếu tiếp tục đệ quy như vậy, mỗi vòng phân vùng lính canh tạo ra một mảng con độ dài $0$, chiến lược chia để trị bị phá vỡ, và sắp xếp nhanh suy biến gần giống "sắp xếp nổi bọt".</p>
<p>Để giảm khả năng xảy ra tình huống này, <strong>ta có thể tối ưu chiến lược chọn pivot dùng trong phân vùng lính canh</strong>. Ví dụ, ta có thể chọn pivot ngẫu nhiên. Tuy nhiên, nếu không may mắn và liên tục chọn phải pivot kém, hiệu suất vẫn có thể không như ý.</p>
<p>Cần lưu ý rằng các ngôn ngữ lập trình thường tạo ra "số giả ngẫu nhiên" (pseudo-random numbers). Nếu ta xây dựng một trường hợp kiểm thử cụ thể nhằm vào dãy giả ngẫu nhiên đó, sắp xếp nhanh vẫn có thể bị suy giảm hiệu suất.</p>
<p>Để cải thiện hơn nữa, ta có thể chọn ba phần tử ứng viên từ mảng, thường là phần tử đầu, cuối, và giữa, <strong>và dùng số trung vị của ba phần tử này làm pivot</strong>. Điều này làm tăng đáng kể khả năng pivot "không quá nhỏ cũng không quá lớn". Ta cũng có thể chọn nhiều phần tử ứng viên hơn để cải thiện thêm độ ổn định của thuật toán. Với phương pháp này, xác suất độ phức tạp thời gian suy biến xuống $O(n^2)$ giảm đi đáng kể.</p>
<p>Đoạn mã ví dụ như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def median_three(self, nums: list[int], left: int, mid: int, right: int) -&gt; int:
    """Chọn số trung vị của 3 phần tử ứng viên"""
    l, m, r = nums[left], nums[mid], nums[right]
    if (l &lt;= m &lt;= r) or (r &lt;= m &lt;= l):
        return mid  # m nằm giữa l và r
    if (m &lt;= l &lt;= r) or (r &lt;= l &lt;= m):
        return left  # l nằm giữa m và r
    return right

def partition(self, nums: list[int], left: int, right: int) -&gt; int:
    """Phân vùng lính canh (dùng số trung vị của 3)"""
    # Chọn số trung vị của 3 phần tử ứng viên
    med = self.median_three(nums, left, (left + right) // 2, right)
    # Hoán đổi số trung vị vào vị trí ngoài cùng bên trái của mảng
    nums[left], nums[med] = nums[med], nums[left]
    # Dùng nums[left] làm pivot
    i, j = left, right
    while i &lt; j:
        while i &lt; j and nums[j] &gt;= nums[left]:
            j -= 1
        while i &lt; j and nums[i] &lt;= nums[left]:
            i += 1
        nums[i], nums[j] = nums[j], nums[i]
    nums[i], nums[left] = nums[left], nums[i]
    return i
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Chọn số trung vị của 3 phần tử ứng viên */
int medianThree(vector&lt;int&gt; &amp;nums, int left, int mid, int right) {
    int l = nums[left], m = nums[mid], r = nums[right];
    if ((l &lt;= m &amp;&amp; m &lt;= r) || (r &lt;= m &amp;&amp; m &lt;= l))
        return mid; // m nằm giữa l và r
    if ((m &lt;= l &amp;&amp; l &lt;= r) || (r &lt;= l &amp;&amp; l &lt;= m))
        return left; // l nằm giữa m và r
    return right;
}

/* Phân vùng lính canh (dùng số trung vị của 3) */
int partition(vector&lt;int&gt; &amp;nums, int left, int right) {
    // Chọn số trung vị của 3 phần tử ứng viên
    int med = medianThree(nums, left, (left + right) / 2, right);
    // Hoán đổi số trung vị vào vị trí ngoài cùng bên trái của mảng
    swap(nums[left], nums[med]);
    // Dùng nums[left] làm pivot
    int i = left, j = right;
    while (i &lt; j) {
        while (i &lt; j &amp;&amp; nums[j] &gt;= nums[left])
            j--;
        while (i &lt; j &amp;&amp; nums[i] &lt;= nums[left])
            i++;
        swap(nums[i], nums[j]);
    }
    swap(nums[i], nums[left]);
    return i;
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Chọn số trung vị của 3 phần tử ứng viên */
static int medianThree(int[] nums, int left, int mid, int right) {
    int l = nums[left], m = nums[mid], r = nums[right];
    if ((l &lt;= m &amp;&amp; m &lt;= r) || (r &lt;= m &amp;&amp; m &lt;= l))
        return mid; // m nằm giữa l và r
    if ((m &lt;= l &amp;&amp; l &lt;= r) || (r &lt;= l &amp;&amp; l &lt;= m))
        return left; // l nằm giữa m và r
    return right;
}

/* Phân vùng lính canh (dùng số trung vị của 3) */
static int partition(int[] nums, int left, int right) {
    // Chọn số trung vị của 3 phần tử ứng viên
    int med = medianThree(nums, left, (left + right) / 2, right);
    // Hoán đổi số trung vị vào vị trí ngoài cùng bên trái của mảng
    swap(nums, left, med);
    // Dùng nums[left] làm pivot
    int i = left, j = right;
    while (i &lt; j) {
        while (i &lt; j &amp;&amp; nums[j] &gt;= nums[left])
            j--;
        while (i &lt; j &amp;&amp; nums[i] &lt;= nums[left])
            i++;
        swap(nums, i, j);
    }
    swap(nums, i, left);
    return i;
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Chọn số trung vị của 3 phần tử ứng viên */
medianThree(nums, left, mid, right) {
    let l = nums[left], m = nums[mid], r = nums[right];
    // m nằm giữa l và r
    if ((l &lt;= m &amp;&amp; m &lt;= r) || (r &lt;= m &amp;&amp; m &lt;= l)) return mid;
    // l nằm giữa m và r
    if ((m &lt;= l &amp;&amp; l &lt;= r) || (r &lt;= l &amp;&amp; l &lt;= m)) return left;
    return right;
}

/* Phân vùng lính canh (dùng số trung vị của 3) */
partition(nums, left, right) {
    // Chọn số trung vị của 3 phần tử ứng viên
    let med = this.medianThree(nums, left, Math.floor((left + right) / 2), right);
    // Hoán đổi số trung vị vào vị trí ngoài cùng bên trái của mảng
    this.swap(nums, left, med);
    // Dùng nums[left] làm pivot
    let i = left, j = right;
    while (i &lt; j) {
        while (i &lt; j &amp;&amp; nums[j] &gt;= nums[left]) j--;
        while (i &lt; j &amp;&amp; nums[i] &lt;= nums[left]) i++;
        this.swap(nums, i, j);
    }
    this.swap(nums, i, left);
    return i;
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Chọn số trung vị của 3 phần tử ứng viên */
fun medianThree(nums: IntArray, left: Int, mid: Int, right: Int): Int {
    val l = nums[left]
    val m = nums[mid]
    val r = nums[right]
    if ((m in l..r) || (m in r..l))
        return mid  // m nằm giữa l và r
    if ((l in m..r) || (l in r..m))
        return left // l nằm giữa m và r
    return right
}

/* Phân vùng lính canh (dùng số trung vị của 3) */
fun partitionMedian(nums: IntArray, left: Int, right: Int): Int {
    // Chọn số trung vị của 3 phần tử ứng viên
    val med = medianThree(nums, left, (left + right) / 2, right)
    // Hoán đổi số trung vị vào vị trí ngoài cùng bên trái của mảng
    swap(nums, left, med)
    // Dùng nums[left] làm pivot
    var i = left
    var j = right
    while (i &lt; j) {
        while (i &lt; j &amp;&amp; nums[j] &gt;= nums[left])
            j--
        while (i &lt; j &amp;&amp; nums[i] &lt;= nums[left])
            i++
        swap(nums, i, j)
    }
    swap(nums, i, left)
    return i
}
</code></pre></div></div></div>
<h2>11.5.5 Tối ưu Độ sâu Đệ quy</h2>
<p><strong>Sắp xếp nhanh cũng có thể tốn nhiều không gian hơn với một số đầu vào nhất định</strong>. Xem xét một mảng đầu vào đã được sắp xếp hoàn toàn. Gọi độ dài của mảng con hiện tại trong đệ quy là $m$. Mỗi vòng phân vùng lính canh tạo ra mảng con trái độ dài $0$ và mảng con phải độ dài $m - 1$, nghĩa là mỗi lần gọi đệ quy chỉ giảm kích thước bài toán đi một phần tử. Cây đệ quy do đó có thể đạt chiều cao $n - 1$, cần $O(n)$ không gian ngăn xếp.</p>
<p>Để ngăn các khung ngăn xếp (stack frame) tích lũy, ta có thể so sánh độ dài của hai mảng con sau mỗi vòng phân vùng lính canh, <strong>và chỉ đệ quy trên mảng con ngắn hơn</strong>. Vì mảng con ngắn hơn có độ dài tối đa $n / 2$, phương pháp này đảm bảo độ sâu đệ quy không vượt quá $\\log n$, giảm độ phức tạp không gian xấu nhất xuống $O(\\log n)$. Đoạn mã được thể hiện bên dưới:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def quick_sort(self, nums: list[int], left: int, right: int):
    """Sắp xếp nhanh (tối ưu độ sâu đệ quy)"""
    # Dừng khi độ dài mảng con là 1
    while left &lt; right:
        # Thao tác phân vùng lính canh
        pivot = self.partition(nums, left, right)
        # Chỉ đệ quy trên mảng con NGẮN HƠN trong hai mảng con
        if pivot - left &lt; right - pivot:
            self.quick_sort(nums, left, pivot - 1)  # Đệ quy sắp xếp mảng con trái
            left = pivot + 1  # Khoảng chưa sắp xếp còn lại là [pivot + 1, right]
        else:
            self.quick_sort(nums, pivot + 1, right)  # Đệ quy sắp xếp mảng con phải
            right = pivot - 1  # Khoảng chưa sắp xếp còn lại là [left, pivot - 1]
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Sắp xếp nhanh (tối ưu độ sâu đệ quy) */
void quickSort(vector&lt;int&gt; &amp;nums, int left, int right) {
    // Dừng khi độ dài mảng con là 1
    while (left &lt; right) {
        // Thao tác phân vùng lính canh
        int pivot = partition(nums, left, right);
        // Chỉ đệ quy trên mảng con NGẮN HƠN trong hai mảng con
        if (pivot - left &lt; right - pivot) {
            quickSort(nums, left, pivot - 1); // Đệ quy sắp xếp mảng con trái
            left = pivot + 1;                 // Khoảng chưa sắp xếp còn lại là [pivot + 1, right]
        } else {
            quickSort(nums, pivot + 1, right); // Đệ quy sắp xếp mảng con phải
            right = pivot - 1;                 // Khoảng chưa sắp xếp còn lại là [left, pivot - 1]
        }
    }
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Sắp xếp nhanh (tối ưu độ sâu đệ quy) */
public static void quickSort(int[] nums, int left, int right) {
    // Dừng khi độ dài mảng con là 1
    while (left &lt; right) {
        // Thao tác phân vùng lính canh
        int pivot = partition(nums, left, right);
        // Chỉ đệ quy trên mảng con NGẮN HƠN trong hai mảng con
        if (pivot - left &lt; right - pivot) {
            quickSort(nums, left, pivot - 1); // Đệ quy sắp xếp mảng con trái
            left = pivot + 1; // Khoảng chưa sắp xếp còn lại là [pivot + 1, right]
        } else {
            quickSort(nums, pivot + 1, right); // Đệ quy sắp xếp mảng con phải
            right = pivot - 1; // Khoảng chưa sắp xếp còn lại là [left, pivot - 1]
        }
    }
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Sắp xếp nhanh (tối ưu độ sâu đệ quy) */
quickSort(nums, left, right) {
    // Dừng khi độ dài mảng con là 1
    while (left &lt; right) {
        // Thao tác phân vùng lính canh
        let pivot = this.partition(nums, left, right);
        // Chỉ đệ quy trên mảng con NGẮN HƠN trong hai mảng con
        if (pivot - left &lt; right - pivot) {
            this.quickSort(nums, left, pivot - 1); // Đệ quy sắp xếp mảng con trái
            left = pivot + 1; // Khoảng chưa sắp xếp còn lại là [pivot + 1, right]
        } else {
            this.quickSort(nums, pivot + 1, right); // Đệ quy sắp xếp mảng con phải
            right = pivot - 1; // Khoảng chưa sắp xếp còn lại là [left, pivot - 1]
        }
    }
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Sắp xếp nhanh (tối ưu độ sâu đệ quy) */
fun quickSortTailCall(nums: IntArray, left: Int, right: Int) {
    // Dừng khi độ dài mảng con là 1
    var l = left
    var r = right
    while (l &lt; r) {
        // Thao tác phân vùng lính canh
        val pivot = partition(nums, l, r)
        // Chỉ đệ quy trên mảng con NGẮN HƠN trong hai mảng con
        if (pivot - l &lt; r - pivot) {
            quickSort(nums, l, pivot - 1) // Đệ quy sắp xếp mảng con trái
            l = pivot + 1 // Khoảng chưa sắp xếp còn lại là [pivot + 1, right]
        } else {
            quickSort(nums, pivot + 1, r) // Đệ quy sắp xếp mảng con phải
            r = pivot - 1 // Khoảng chưa sắp xếp còn lại là [left, pivot - 1]
        }
    }
}
</code></pre></div></div></div>
<h2>11.5.6 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="quick-sort-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'quick-sort-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'quick-sort-wrapper', 'tab-interactive'); initSortDemo('quick-sort-wrapper', SORT_FRAMES_QUICKSORT)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem từng bước sắp xếp nhanh (phiên bản cơ bản) trên mảng <code>[2, 4, 1, 0, 3, 5]</code>. Ô màu cam là pivot của vòng phân vùng hiện tại.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="quick-sort-wrapper-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="quick-sort-wrapper-btn-autorun" class="control-btn" onclick="autoRunSortDemo('quick-sort-wrapper')">▶ Auto Run</button>
      <button id="quick-sort-wrapper-btn-step" class="control-btn btn-secondary" onclick="stepSortDemo('quick-sort-wrapper')">Bước tiếp theo ▶</button>
      <button id="quick-sort-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunSortDemo('quick-sort-wrapper')" disabled>⏸ Dừng</button>
      <button id="quick-sort-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initSortDemo('quick-sort-wrapper', SORT_FRAMES_QUICKSORT)">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setSortDemoSpeed('quick-sort-wrapper', this.value)" /> <span id="quick-sort-wrapper-speed-label">700ms</span>
    </div>
    <div id="quick-sort-wrapper-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu.</div>
  </div>
</div>
`,
    originalContent: `# Quick Sort

<u>Quick sort</u> is an efficient and widely used sorting algorithm based on the divide-and-conquer strategy.

The core operation of quick sort is "sentinel partitioning", whose goal is to select an element as the "pivot", move all elements smaller than the pivot to its left, and move all elements larger than the pivot to its right. Specifically, the process is shown in the figure below.

1. Select the leftmost element as the pivot, and initialize two pointers \`i\` and \`j\` at the two ends of the array.
2. Enter a loop. In each round, use \`i\` (\`j\`) to find the first element larger (smaller) than the pivot, and then swap the two elements.
3. Repeat step \`2.\` until \`i\` and \`j\` meet, then swap the pivot into the boundary position between the two sub-arrays.

=== "<1>"
    ![Sentinel partitioning steps](quick_sort.assets/pivot_division_step1.png)

=== "<2>"
    ![pivot_division_step2](quick_sort.assets/pivot_division_step2.png)

=== "<3>"
    ![pivot_division_step3](quick_sort.assets/pivot_division_step3.png)

=== "<4>"
    ![pivot_division_step4](quick_sort.assets/pivot_division_step4.png)

=== "<5>"
    ![pivot_division_step5](quick_sort.assets/pivot_division_step5.png)

=== "<6>"
    ![pivot_division_step6](quick_sort.assets/pivot_division_step6.png)

=== "<7>"
    ![pivot_division_step7](quick_sort.assets/pivot_division_step7.png)

=== "<8>"
    ![pivot_division_step8](quick_sort.assets/pivot_division_step8.png)

=== "<9>"
    ![pivot_division_step9](quick_sort.assets/pivot_division_step9.png)

After sentinel partitioning, the original array is divided into three parts: the left sub-array, the pivot, and the right sub-array, such that "any element in the left sub-array $\\leq$ the pivot $\\leq$ any element in the right sub-array". Therefore, we only need to sort the two sub-arrays next.

!!! note "Divide-and-conquer strategy of quick sort"

    The essence of sentinel partitioning is to simplify the sorting problem of a longer array into the sorting problems of two shorter arrays.

\`\`\`src
[file]{quick_sort}-[class]{quick_sort}-[func]{partition}
\`\`\`

## Algorithm Flow

The overall flow of quick sort is shown in the figure below.

1. First, perform one "sentinel partitioning" on the original array to obtain the unsorted left sub-array and right sub-array.
2. Then, recursively perform "sentinel partitioning" on the left sub-array and right sub-array respectively.
3. Continue recursively until the sub-array length is 1, at which point sorting of the entire array is complete.

![Quick sort flow](quick_sort.assets/quick_sort_overview.png)

\`\`\`src
[file]{quick_sort}-[class]{quick_sort}-[func]{quick_sort}
\`\`\`

## Algorithm Characteristics

- **Time complexity of $O(n \\log n)$, non-adaptive sorting**: On average, sentinel partitioning produces $\\log n$ recursive levels, and the total number of loop iterations across each level is $n$, so the overall time complexity is $O(n \\log n)$. In the worst case, each round of sentinel partitioning splits an array of length $n$ into sub-arrays of lengths $0$ and $n - 1$. The recursion depth then reaches $n$, with $n$ loop iterations at each level, yielding an overall time complexity of $O(n^2)$.
- **Space complexity of $O(n)$, in-place sorting**: In the case where the input array is completely reversed, the worst recursive depth reaches $n$, using $O(n)$ stack frame space. The sorting operation is performed on the original array without the aid of an additional array.
- **Unstable sorting**: In the last step of sentinel partitioning, the pivot may be swapped to the right of an equal element.

## Why Is Quick Sort Fast

As the name suggests, quick sort has clear efficiency advantages. Although its average time complexity is the same as that of "merge sort" and "heap sort", quick sort is usually faster in practice for the following reasons.

- **The worst case is unlikely to occur**: Although the worst-case time complexity of quick sort is $O(n^2)$ and its performance is less predictable than that of merge sort, quick sort runs in $O(n \\log n)$ time in the vast majority of cases.
- **High cache efficiency**: During sentinel partitioning, the system can load the entire sub-array into cache, so accessing elements is relatively efficient. By contrast, algorithms such as "heap sort" require non-contiguous access to elements and therefore do not enjoy this advantage.
- **Small constant factors**: Among the three algorithms above, quick sort performs the fewest comparisons, assignments, and swaps in total. This is similar to why "insertion sort" is faster than "bubble sort".

## Pivot Optimization

**Quick sort can become less time-efficient for certain inputs**. Consider an extreme example in which the input array is in completely descending order. Because we choose the leftmost element as the pivot, once sentinel partitioning is complete, the pivot is swapped to the far right of the array, leaving a left sub-array of length $n - 1$ and a right sub-array of length $0$. If this continues recursively, each round of sentinel partitioning produces one sub-array of length $0$, the divide-and-conquer strategy breaks down, and quick sort degenerates into an approximation of "bubble sort".

To reduce the chance of this happening, **we can optimize the pivot selection strategy used in sentinel partitioning**. For example, we can choose a pivot at random. However, if we are unlucky and repeatedly pick poor pivots, performance can still be unsatisfactory.

It should be noted that programming languages usually generate "pseudo-random numbers". If we construct a specific test case against a pseudo-random sequence, quick sort can still suffer degraded performance.

To improve further, we can choose three candidate elements from the array, usually the first, last, and middle elements, **and use the median of the three as the pivot**. This greatly increases the chance that the pivot is "neither too small nor too large". We can also choose more candidate elements to further improve the robustness of the algorithm. With this method, the probability that the time complexity degrades to $O(n^2)$ is significantly reduced.

Example code is as follows:

\`\`\`src
[file]{quick_sort}-[class]{quick_sort_median}-[func]{partition}
\`\`\`

## Recursive Depth Optimization

**Quick sort may also use more space for certain inputs**. Consider a fully sorted input array. Let the length of the current sub-array in the recursion be $m$. Each round of sentinel partitioning produces a left sub-array of length $0$ and a right sub-array of length $m - 1$, which means each recursive call reduces the problem size by only one element. The recursion tree can therefore reach a height of $n - 1$, requiring $O(n)$ stack-frame space.

To prevent stack frames from accumulating, we can compare the lengths of the two sub-arrays after each round of sentinel partitioning, **and recurse only on the shorter one**. Because the shorter sub-array has length at most $n / 2$, this method ensures that the recursion depth does not exceed $\\log n$, reducing the worst-case space complexity to $O(\\log n)$. The code is shown below:

\`\`\`src
[file]{quick_sort}-[class]{quick_sort_tail_call}-[func]{quick_sort}
\`\`\`
`
  },

  'dsa-merge-sort': {
    title: '11.6 Sắp xếp Trộn (Merge Sort)',
    summary: 'Thuật toán Sắp xếp trộn dựa trên chia để trị: giai đoạn chia đệ quy và giai đoạn trộn. Độ phức tạp O(n log n), ổn định nhưng không tại chỗ. Ứng dụng cho Danh sách liên kết.',
    tags: ['dsa', 'sorting', 'merge-sort', 'divide-and-conquer'],
    domain: 'Algorithms',
    module: 'Chương 11: Sắp xếp',
    prerequisites: ['dsa-quick-sort'],
    related: ['dsa-heap-sort'],
    updatedAt: '2026-07-19',
    readTime: '10 phút',
    content: `
<p><u>Sắp xếp trộn (Merge sort)</u> là một thuật toán sắp xếp dựa trên chiến lược chia để trị, gồm hai giai đoạn "chia" và "trộn" như hình bên dưới.</p>
<ol>
  <li><strong>Giai đoạn chia (Divide)</strong>: Đệ quy chia mảng tại điểm giữa, đưa bài toán sắp xếp một mảng dài về bài toán sắp xếp các mảng ngắn hơn.</li>
  <li><strong>Giai đoạn trộn (Merge)</strong>: Khi một mảng con có độ dài 1, dừng chia và bắt đầu trộn, liên tục kết hợp các mảng con đã sắp xếp bên trái và phải thành một mảng dài hơn đã sắp xếp cho tới khi hoàn tất.</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/merge_sort_overview.png" alt="Giai đoạn chia và trộn của sắp xếp trộn" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>11.6.1 Quy trình Thuật toán</h2>
<p>Như hình bên dưới, "giai đoạn chia" đệ quy chia mảng từ điểm giữa thành hai mảng con theo hướng từ trên xuống.</p>
<ol>
  <li>Tính điểm giữa <code>mid</code> của mảng, đệ quy chia mảng con trái (khoảng <code>[left, mid]</code>) và mảng con phải (khoảng <code>[mid + 1, right]</code>).</li>
  <li>Lặp lại bước <code>1.</code> một cách đệ quy cho đến khi mảng con có độ dài 1.</li>
</ol>
<p>"Giai đoạn trộn" kết hợp mảng con trái và phải thành một mảng đã sắp xếp theo hướng từ dưới lên. Lưu ý rằng việc trộn bắt đầu từ các mảng con độ dài 1, vì vậy mọi mảng con tham gia giai đoạn này đều đã được sắp xếp sẵn.</p>

<div class="interactive-widget-wrapper" id="merge-sort-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img src="dsa-assets/merge_sort_step1.png" alt="Bước 1" style="max-width:100%;" /><p class="slide-caption">Các bước sắp xếp trộn — bước 1.</p></div>
    <div class="slide"><img src="dsa-assets/merge_sort_step2.png" alt="Bước 2" style="max-width:100%;" /><p class="slide-caption">Bước 2.</p></div>
    <div class="slide"><img src="dsa-assets/merge_sort_step3.png" alt="Bước 3" style="max-width:100%;" /><p class="slide-caption">Bước 3.</p></div>
    <div class="slide"><img src="dsa-assets/merge_sort_step4.png" alt="Bước 4" style="max-width:100%;" /><p class="slide-caption">Bước 4.</p></div>
    <div class="slide"><img src="dsa-assets/merge_sort_step5.png" alt="Bước 5" style="max-width:100%;" /><p class="slide-caption">Bước 5.</p></div>
    <div class="slide"><img src="dsa-assets/merge_sort_step6.png" alt="Bước 6" style="max-width:100%;" /><p class="slide-caption">Bước 6.</p></div>
    <div class="slide"><img src="dsa-assets/merge_sort_step7.png" alt="Bước 7" style="max-width:100%;" /><p class="slide-caption">Bước 7.</p></div>
    <div class="slide"><img src="dsa-assets/merge_sort_step8.png" alt="Bước 8" style="max-width:100%;" /><p class="slide-caption">Bước 8.</p></div>
    <div class="slide"><img src="dsa-assets/merge_sort_step9.png" alt="Bước 9" style="max-width:100%;" /><p class="slide-caption">Bước 9.</p></div>
    <div class="slide"><img src="dsa-assets/merge_sort_step10.png" alt="Bước 10" style="max-width:100%;" /><p class="slide-caption">Bước 10: hoàn tất, mảng đã được trộn và sắp xếp.</p></div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('merge-sort-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 10</span>
      <button class="slider-btn" onclick="nextSlide('merge-sort-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>

<p>Thứ tự đệ quy của sắp xếp trộn nhất quán với duyệt hậu thứ tự (post-order traversal) của một cây nhị phân.</p>
<ul>
  <li><strong>Duyệt hậu thứ tự</strong>: Trước tiên đệ quy duyệt cây con trái, sau đó đệ quy duyệt cây con phải, và cuối cùng xử lý nút gốc.</li>
  <li><strong>Sắp xếp trộn</strong>: Trước tiên đệ quy xử lý mảng con trái, sau đó đệ quy xử lý mảng con phải, và cuối cùng thực hiện trộn.</li>
</ul>
<p>Cách triển khai sắp xếp trộn được thể hiện trong đoạn mã bên dưới. Lưu ý rằng khoảng cần trộn trong <code>nums</code> là <code>[left, right]</code>, trong khi khoảng tương ứng trong <code>tmp</code> là <code>[0, right - left]</code>.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def merge(nums: list[int], left: int, mid: int, right: int):
    """Trộn mảng con trái và mảng con phải"""
    # Khoảng mảng con trái là [left, mid], khoảng mảng con phải là [mid+1, right]
    # Tạo mảng tạm tmp để lưu kết quả trộn
    tmp = [0] * (right - left + 1)
    # Khởi tạo chỉ mục bắt đầu của mảng con trái và phải
    i, j, k = left, mid + 1, 0
    # Khi cả hai mảng con vẫn còn phần tử, so sánh và sao chép phần tử nhỏ hơn vào mảng tạm
    while i &lt;= mid and j &lt;= right:
        if nums[i] &lt;= nums[j]:
            tmp[k] = nums[i]
            i += 1
        else:
            tmp[k] = nums[j]
            j += 1
        k += 1
    # Sao chép các phần tử còn lại của mảng con trái và phải vào mảng tạm
    while i &lt;= mid:
        tmp[k] = nums[i]
        i += 1
        k += 1
    while j &lt;= right:
        tmp[k] = nums[j]
        j += 1
        k += 1
    # Sao chép các phần tử từ mảng tạm tmp trở lại mảng gốc nums ở khoảng tương ứng
    for k in range(0, len(tmp)):
        nums[left + k] = tmp[k]


def merge_sort(nums: list[int], left: int, right: int):
    """Sắp xếp trộn"""
    # Điều kiện dừng
    if left &gt;= right:
        return  # Dừng đệ quy khi độ dài mảng con là 1
    # Giai đoạn chia
    mid = (left + right) // 2  # Tính điểm giữa
    merge_sort(nums, left, mid)  # Đệ quy xử lý mảng con trái
    merge_sort(nums, mid + 1, right)  # Đệ quy xử lý mảng con phải
    # Giai đoạn trộn
    merge(nums, left, mid, right)
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Trộn mảng con trái và mảng con phải */
void merge(vector&lt;int&gt; &amp;nums, int left, int mid, int right) {
    // Khoảng mảng con trái là [left, mid], khoảng mảng con phải là [mid+1, right]
    // Tạo mảng tạm tmp để lưu kết quả trộn
    vector&lt;int&gt; tmp(right - left + 1);
    // Khởi tạo chỉ mục bắt đầu của mảng con trái và phải
    int i = left, j = mid + 1, k = 0;
    // Khi cả hai mảng con vẫn còn phần tử, so sánh và sao chép phần tử nhỏ hơn vào mảng tạm
    while (i &lt;= mid &amp;&amp; j &lt;= right) {
        if (nums[i] &lt;= nums[j])
            tmp[k++] = nums[i++];
        else
            tmp[k++] = nums[j++];
    }
    // Sao chép các phần tử còn lại của mảng con trái và phải vào mảng tạm
    while (i &lt;= mid) {
        tmp[k++] = nums[i++];
    }
    while (j &lt;= right) {
        tmp[k++] = nums[j++];
    }
    // Sao chép các phần tử từ mảng tạm tmp trở lại mảng gốc nums ở khoảng tương ứng
    for (k = 0; k &lt; tmp.size(); k++) {
        nums[left + k] = tmp[k];
    }
}

/* Sắp xếp trộn */
void mergeSort(vector&lt;int&gt; &amp;nums, int left, int right) {
    // Điều kiện dừng
    if (left &gt;= right)
        return; // Dừng đệ quy khi độ dài mảng con là 1
    // Giai đoạn chia
    int mid = left + (right - left) / 2; // Tính điểm giữa
    mergeSort(nums, left, mid);      // Đệ quy xử lý mảng con trái
    mergeSort(nums, mid + 1, right); // Đệ quy xử lý mảng con phải
    // Giai đoạn trộn
    merge(nums, left, mid, right);
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Trộn mảng con trái và mảng con phải */
static void merge(int[] nums, int left, int mid, int right) {
    // Khoảng mảng con trái là [left, mid], khoảng mảng con phải là [mid+1, right]
    // Tạo mảng tạm tmp để lưu kết quả trộn
    int[] tmp = new int[right - left + 1];
    // Khởi tạo chỉ mục bắt đầu của mảng con trái và phải
    int i = left, j = mid + 1, k = 0;
    // Khi cả hai mảng con vẫn còn phần tử, so sánh và sao chép phần tử nhỏ hơn vào mảng tạm
    while (i &lt;= mid &amp;&amp; j &lt;= right) {
        if (nums[i] &lt;= nums[j])
            tmp[k++] = nums[i++];
        else
            tmp[k++] = nums[j++];
    }
    // Sao chép các phần tử còn lại của mảng con trái và phải vào mảng tạm
    while (i &lt;= mid) {
        tmp[k++] = nums[i++];
    }
    while (j &lt;= right) {
        tmp[k++] = nums[j++];
    }
    // Sao chép các phần tử từ mảng tạm tmp trở lại mảng gốc nums ở khoảng tương ứng
    for (k = 0; k &lt; tmp.length; k++) {
        nums[left + k] = tmp[k];
    }
}

/* Sắp xếp trộn */
static void mergeSort(int[] nums, int left, int right) {
    // Điều kiện dừng
    if (left &gt;= right)
        return; // Dừng đệ quy khi độ dài mảng con là 1
    // Giai đoạn chia
    int mid = left + (right - left) / 2; // Tính điểm giữa
    mergeSort(nums, left, mid); // Đệ quy xử lý mảng con trái
    mergeSort(nums, mid + 1, right); // Đệ quy xử lý mảng con phải
    // Giai đoạn trộn
    merge(nums, left, mid, right);
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Trộn mảng con trái và mảng con phải */
function merge(nums, left, mid, right) {
    // Khoảng mảng con trái là [left, mid], khoảng mảng con phải là [mid+1, right]
    // Tạo mảng tạm tmp để lưu kết quả trộn
    const tmp = new Array(right - left + 1);
    // Khởi tạo chỉ mục bắt đầu của mảng con trái và phải
    let i = left, j = mid + 1, k = 0;
    // Khi cả hai mảng con vẫn còn phần tử, so sánh và sao chép phần tử nhỏ hơn vào mảng tạm
    while (i &lt;= mid &amp;&amp; j &lt;= right) {
        if (nums[i] &lt;= nums[j]) {
            tmp[k++] = nums[i++];
        } else {
            tmp[k++] = nums[j++];
        }
    }
    // Sao chép các phần tử còn lại của mảng con trái và phải vào mảng tạm
    while (i &lt;= mid) {
        tmp[k++] = nums[i++];
    }
    while (j &lt;= right) {
        tmp[k++] = nums[j++];
    }
    // Sao chép các phần tử từ mảng tạm tmp trở lại mảng gốc nums ở khoảng tương ứng
    for (k = 0; k &lt; tmp.length; k++) {
        nums[left + k] = tmp[k];
    }
}

/* Sắp xếp trộn */
function mergeSort(nums, left, right) {
    // Điều kiện dừng
    if (left &gt;= right) return; // Dừng đệ quy khi độ dài mảng con là 1
    // Giai đoạn chia
    let mid = Math.floor(left + (right - left) / 2); // Tính điểm giữa
    mergeSort(nums, left, mid); // Đệ quy xử lý mảng con trái
    mergeSort(nums, mid + 1, right); // Đệ quy xử lý mảng con phải
    // Giai đoạn trộn
    merge(nums, left, mid, right);
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Trộn mảng con trái và mảng con phải */
fun merge(nums: IntArray, left: Int, mid: Int, right: Int) {
    // Khoảng mảng con trái là [left, mid], khoảng mảng con phải là [mid+1, right]
    // Tạo mảng tạm tmp để lưu kết quả trộn
    val tmp = IntArray(right - left + 1)
    // Khởi tạo chỉ mục bắt đầu của mảng con trái và phải
    var i = left
    var j = mid + 1
    var k = 0
    // Khi cả hai mảng con vẫn còn phần tử, so sánh và sao chép phần tử nhỏ hơn vào mảng tạm
    while (i &lt;= mid &amp;&amp; j &lt;= right) {
        if (nums[i] &lt;= nums[j])
            tmp[k++] = nums[i++]
        else
            tmp[k++] = nums[j++]
    }
    // Sao chép các phần tử còn lại của mảng con trái và phải vào mảng tạm
    while (i &lt;= mid) {
        tmp[k++] = nums[i++]
    }
    while (j &lt;= right) {
        tmp[k++] = nums[j++]
    }
    // Sao chép các phần tử từ mảng tạm tmp trở lại mảng gốc nums ở khoảng tương ứng
    for (l in tmp.indices) {
        nums[left + l] = tmp[l]
    }
}

/* Sắp xếp trộn */
fun mergeSort(nums: IntArray, left: Int, right: Int) {
    // Điều kiện dừng
    if (left &gt;= right) return  // Dừng đệ quy khi độ dài mảng con là 1
    // Giai đoạn chia
    val mid = left + (right - left) / 2 // Tính điểm giữa
    mergeSort(nums, left, mid) // Đệ quy xử lý mảng con trái
    mergeSort(nums, mid + 1, right) // Đệ quy xử lý mảng con phải
    // Giai đoạn trộn
    merge(nums, left, mid, right)
}
</code></pre></div></div></div>
<h2>11.6.2 Đặc điểm Thuật toán</h2>
<ul>
  <li><strong>Độ phức tạp thời gian là $O(n \\log n)$; không thích ứng</strong>: Giai đoạn chia tạo ra cây đệ quy chiều cao $\\log n$, và tổng số thao tác thực hiện khi trộn ở mỗi tầng là $n$, nên độ phức tạp thời gian tổng thể là $O(n \\log n)$.</li>
  <li><strong>Độ phức tạp không gian là $O(n)$; không phải sắp xếp tại chỗ</strong>: Độ sâu đệ quy là $\\log n$, sử dụng $O(\\log n)$ không gian ngăn xếp. Thao tác trộn cần một mảng phụ trợ, sử dụng thêm $O(n)$ không gian.</li>
  <li><strong>Sắp xếp ổn định</strong>: Trong quá trình trộn, thứ tự tương đối của các phần tử bằng nhau không đổi.</li>
</ul>

<h2>11.6.3 Sắp xếp Danh sách liên kết</h2>
<p>Đối với danh sách liên kết, sắp xếp trộn có ưu thế đáng kể so với các thuật toán sắp xếp khác, <strong>và có thể giảm độ phức tạp không gian của bài toán sắp xếp xuống $O(1)$</strong>.</p>
<ul>
  <li><strong>Giai đoạn chia</strong>: Có thể dùng vòng lặp thay vì đệ quy để chia danh sách liên kết, từ đó loại bỏ không gian ngăn xếp mà đệ quy sử dụng.</li>
  <li><strong>Giai đoạn trộn</strong>: Trong danh sách liên kết, việc chèn và xóa nút chỉ cần cập nhật con trỏ, nên giai đoạn trộn (trộn hai danh sách liên kết ngắn đã sắp xếp thành một danh sách dài hơn đã sắp xếp) không cần tạo thêm danh sách liên kết mới.</li>
</ul>
<p>Chi tiết triển khai khá phức tạp, bạn đọc quan tâm có thể tham khảo thêm tài liệu liên quan để tìm hiểu.</p>

<h2>11.6.4 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="merge-sort-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'merge-sort-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'merge-sort-wrapper', 'tab-interactive'); initSortDemo('merge-sort-wrapper', SORT_FRAMES_MERGESORT)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem từng bước trộn (giai đoạn merge) trên mảng <code>[7, 3, 2, 6, 0, 1, 5, 4]</code>. Vùng highlight là đoạn đang được trộn ở bước hiện tại.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="merge-sort-wrapper-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="merge-sort-wrapper-btn-autorun" class="control-btn" onclick="autoRunSortDemo('merge-sort-wrapper')">▶ Auto Run</button>
      <button id="merge-sort-wrapper-btn-step" class="control-btn btn-secondary" onclick="stepSortDemo('merge-sort-wrapper')">Bước tiếp theo ▶</button>
      <button id="merge-sort-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunSortDemo('merge-sort-wrapper')" disabled>⏸ Dừng</button>
      <button id="merge-sort-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initSortDemo('merge-sort-wrapper', SORT_FRAMES_MERGESORT)">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setSortDemoSpeed('merge-sort-wrapper', this.value)" /> <span id="merge-sort-wrapper-speed-label">700ms</span>
    </div>
    <div id="merge-sort-wrapper-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu.</div>
  </div>
</div>
`,
    originalContent: `# Merge Sort

<u>Merge sort</u> is a sorting algorithm based on a divide-and-conquer strategy, consisting of the "divide" and "merge" phases shown in the figure below.

1. **Divide phase**: Recursively split the array at the midpoint, reducing the problem of sorting a long array to the problem of sorting shorter arrays.
2. **Merge phase**: When a sub-array has length 1, stop dividing and start merging, continuously combining the shorter sorted sub-arrays on the left and right into a longer sorted array until the process is complete.

![Divide and merge phases of merge sort](merge_sort.assets/merge_sort_overview.png)

## Algorithm Flow

As shown in the figure below, the "divide phase" recursively splits the array from the midpoint into two sub-arrays from top to bottom.

1. Calculate the array midpoint \`mid\`, recursively divide the left sub-array (interval \`[left, mid]\`) and right sub-array (interval \`[mid + 1, right]\`).
2. Repeat step \`1.\` recursively until a sub-array has length 1.

The "merge phase" merges the left and right sub-arrays into a sorted array from bottom to top. Note that merging starts from sub-arrays of length 1, so every sub-array involved in this phase is already sorted.

=== "<1>"
    ![Merge sort steps](merge_sort.assets/merge_sort_step1.png)

=== "<2>"
    ![merge_sort_step2](merge_sort.assets/merge_sort_step2.png)

=== "<3>"
    ![merge_sort_step3](merge_sort.assets/merge_sort_step3.png)

=== "<4>"
    ![merge_sort_step4](merge_sort.assets/merge_sort_step4.png)

=== "<5>"
    ![merge_sort_step5](merge_sort.assets/merge_sort_step5.png)

=== "<6>"
    ![merge_sort_step6](merge_sort.assets/merge_sort_step6.png)

=== "<7>"
    ![merge_sort_step7](merge_sort.assets/merge_sort_step7.png)

=== "<8>"
    ![merge_sort_step8](merge_sort.assets/merge_sort_step8.png)

=== "<9>"
    ![merge_sort_step9](merge_sort.assets/merge_sort_step9.png)

=== "<10>"
    ![merge_sort_step10](merge_sort.assets/merge_sort_step10.png)

The recursive order of merge sort is consistent with the post-order traversal of a binary tree.

- **Post-order traversal**: First recursively traverse the left subtree, then recursively traverse the right subtree, and finally process the root node.
- **Merge sort**: First recursively process the left sub-array, then recursively process the right sub-array, and finally perform the merge.

The implementation of merge sort is shown in the code below. Note that the interval to be merged in \`nums\` is \`[left, right]\`, while the corresponding interval in \`tmp\` is \`[0, right - left]\`.

\`\`\`src
[file]{merge_sort}-[class]{}-[func]{merge_sort}
\`\`\`

## Algorithm Characteristics

- **Time complexity is $O(n \\log n)$; merge sort is non-adaptive**: The divide phase produces a recursion tree of height $\\log n$, and the total number of operations performed during merging at each level is $n$, so the overall time complexity is $O(n \\log n)$.
- **Space complexity is $O(n)$; merge sort is not in-place**: The recursion depth is $\\log n$, which uses $O(\\log n)$ stack-frame space. The merge operation requires an auxiliary array, which uses $O(n)$ additional space.
- **Stable sort**: During merging, the relative order of equal elements remains unchanged.

## Linked List Sorting

For linked lists, merge sort has significant advantages over other sorting algorithms, **and it can reduce the space complexity of the sorting task to $O(1)$**.

- **Divide phase**: Iteration can be used instead of recursion to split the linked list, thereby eliminating the stack-frame space used by recursion.
- **Merge phase**: In linked lists, node insertion and deletion require only pointer updates, so the merge phase (merging two short sorted linked lists into one longer sorted linked list) does not require creating an additional linked list.

The specific implementation details are quite complex, and interested readers can consult related materials for learning.
`
  },

  'dsa-heap-sort': {
    title: '11.7 Sắp xếp Vun đống (Heap Sort)',
    summary: 'Thuật toán Sắp xếp vun đống dựa trên cấu trúc Heap: xây Max-Heap rồi lặp lại hoán đổi đỉnh-đáy + sift down. Độ phức tạp O(n log n), tại chỗ nhưng không ổn định.',
    tags: ['dsa', 'sorting', 'heap-sort'],
    domain: 'Algorithms',
    module: 'Chương 11: Sắp xếp',
    prerequisites: ['dsa-merge-sort'],
    related: ['dsa-bucket-sort'],
    updatedAt: '2026-07-19',
    readTime: '8 phút',
    content: `
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Trước khi đọc mục này, vui lòng đảm bảo bạn đã hoàn thành chương "Heap".</p>
  </div>
</div>
<p><u>Sắp xếp vun đống (Heap sort)</u> là một thuật toán sắp xếp hiệu quả dựa trên cấu trúc dữ liệu heap. Ta có thể triển khai sắp xếp vun đống bằng cách dùng các thao tác xây heap và xóa phần tử đã giới thiệu trước đó.</p>
<ol>
  <li>Nhập mảng và xây một Min-Heap, lúc này phần tử nhỏ nhất nằm ở đỉnh heap.</li>
  <li>Liên tục thực hiện thao tác xóa phần tử và ghi lại các phần tử đã xóa theo thứ tự để có được một dãy sắp xếp tăng dần.</li>
</ol>
<p>Mặc dù phương pháp trên khả thi, nó cần thêm một mảng để lưu các phần tử đã lấy ra, khá lãng phí không gian. Trong thực tế, ta thường dùng một cách triển khai thanh lịch hơn.</p>

<h2>11.7.1 Quy trình Thuật toán</h2>
<p>Giả sử độ dài mảng là $n$. Quy trình của sắp xếp vun đống được thể hiện trong hình bên dưới.</p>
<ol>
  <li>Nhập mảng và xây một Max-Heap. Sau khi hoàn tất, phần tử lớn nhất nằm ở đỉnh heap.</li>
  <li>Hoán đổi phần tử đỉnh heap (phần tử đầu tiên) với phần tử đáy heap (phần tử cuối cùng). Sau khi hoán đổi xong, giảm độ dài heap đi $1$ và tăng số lượng phần tử đã sắp xếp lên $1$.</li>
  <li>Bắt đầu từ phần tử đỉnh heap, thực hiện thao tác heapify từ trên xuống (sift down). Sau khi heapify hoàn tất, tính chất heap được khôi phục.</li>
  <li>Lặp lại bước <code>2.</code> và <code>3.</code> Sau $n - 1$ vòng, mảng đã được sắp xếp.</li>
</ol>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Thực tế, thao tác xóa phần tử cũng bao gồm các bước <code>2.</code> và <code>3.</code>, cộng thêm bước xóa phần tử.</p>
  </div>
</div>

<div class="interactive-widget-wrapper" id="heap-sort-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img src="dsa-assets/heap_sort_step1.png" alt="Bước 1" style="max-width:100%;" /><p class="slide-caption">Các bước sắp xếp vun đống — bước 1.</p></div>
    <div class="slide"><img src="dsa-assets/heap_sort_step2.png" alt="Bước 2" style="max-width:100%;" /><p class="slide-caption">Bước 2.</p></div>
    <div class="slide"><img src="dsa-assets/heap_sort_step3.png" alt="Bước 3" style="max-width:100%;" /><p class="slide-caption">Bước 3.</p></div>
    <div class="slide"><img src="dsa-assets/heap_sort_step4.png" alt="Bước 4" style="max-width:100%;" /><p class="slide-caption">Bước 4.</p></div>
    <div class="slide"><img src="dsa-assets/heap_sort_step5.png" alt="Bước 5" style="max-width:100%;" /><p class="slide-caption">Bước 5.</p></div>
    <div class="slide"><img src="dsa-assets/heap_sort_step6.png" alt="Bước 6" style="max-width:100%;" /><p class="slide-caption">Bước 6.</p></div>
    <div class="slide"><img src="dsa-assets/heap_sort_step7.png" alt="Bước 7" style="max-width:100%;" /><p class="slide-caption">Bước 7.</p></div>
    <div class="slide"><img src="dsa-assets/heap_sort_step8.png" alt="Bước 8" style="max-width:100%;" /><p class="slide-caption">Bước 8.</p></div>
    <div class="slide"><img src="dsa-assets/heap_sort_step9.png" alt="Bước 9" style="max-width:100%;" /><p class="slide-caption">Bước 9.</p></div>
    <div class="slide"><img src="dsa-assets/heap_sort_step10.png" alt="Bước 10" style="max-width:100%;" /><p class="slide-caption">Bước 10.</p></div>
    <div class="slide"><img src="dsa-assets/heap_sort_step11.png" alt="Bước 11" style="max-width:100%;" /><p class="slide-caption">Bước 11.</p></div>
    <div class="slide"><img src="dsa-assets/heap_sort_step12.png" alt="Bước 12" style="max-width:100%;" /><p class="slide-caption">Bước 12: hoàn tất, mảng đã được sắp xếp.</p></div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('heap-sort-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 12</span>
      <button class="slider-btn" onclick="nextSlide('heap-sort-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>

<p>Trong đoạn mã bên dưới, ta dùng cùng hàm <code>sift_down()</code> để heapify từ trên xuống như trong chương "Heap". Cần lưu ý rằng vì độ dài heap giảm khi phần tử lớn nhất được trích xuất, ta cần thêm một tham số độ dài $n$ vào <code>sift_down()</code> để chỉ định độ dài hiệu lực hiện tại của heap. Đoạn mã như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def sift_down(nums: list[int], n: int, i: int):
    """Độ dài heap là n, heapify nút i từ trên xuống"""
    while True:
        # Xác định nút lớn nhất trong i, l, r, ký hiệu là ma
        l = 2 * i + 1
        r = 2 * i + 2
        ma = i
        if l &lt; n and nums[l] &gt; nums[ma]:
            ma = l
        if r &lt; n and nums[r] &gt; nums[ma]:
            ma = r
        # Nếu nút i là lớn nhất hoặc chỉ mục l, r vượt ngoài phạm vi, không cần heapify tiếp, thoát
        if ma == i:
            break
        # Hoán đổi hai nút
        nums[i], nums[ma] = nums[ma], nums[i]
        # Vòng lặp heapify đi xuống
        i = ma


def heap_sort(nums: list[int]):
    """Sắp xếp vun đống"""
    # Thao tác xây heap: heapify tất cả các nút trừ lá
    for i in range(len(nums) // 2 - 1, -1, -1):
        sift_down(nums, len(nums), i)
    # Trích xuất phần tử lớn nhất từ heap và lặp lại tổng cộng n-1 vòng
    for i in range(len(nums) - 1, 0, -1):
        # Hoán đổi nút gốc với nút lá ngoài cùng bên phải (hoán đổi phần tử đầu và cuối)
        nums[0], nums[i] = nums[i], nums[0]
        # Bắt đầu heapify nút gốc, từ trên xuống
        sift_down(nums, i, 0)
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Độ dài heap là n, heapify nút i từ trên xuống */
void siftDown(vector&lt;int&gt; &amp;nums, int n, int i) {
    while (true) {
        // Nếu nút i là lớn nhất hoặc chỉ mục l, r vượt ngoài phạm vi, không cần heapify tiếp, thoát
        int l = 2 * i + 1;
        int r = 2 * i + 2;
        int ma = i;
        if (l &lt; n &amp;&amp; nums[l] &gt; nums[ma])
            ma = l;
        if (r &lt; n &amp;&amp; nums[r] &gt; nums[ma])
            ma = r;
        if (ma == i) {
            break;
        }
        // Hoán đổi hai nút
        swap(nums[i], nums[ma]);
        // Vòng lặp heapify đi xuống
        i = ma;
    }
}

/* Sắp xếp vun đống */
void heapSort(vector&lt;int&gt; &amp;nums) {
    // Thao tác xây heap: heapify tất cả các nút trừ lá
    for (int i = nums.size() / 2 - 1; i &gt;= 0; --i) {
        siftDown(nums, nums.size(), i);
    }
    // Trích xuất phần tử lớn nhất từ heap và lặp lại tổng cộng n-1 vòng
    for (int i = nums.size() - 1; i &gt; 0; --i) {
        // Hoán đổi nút gốc với nút lá ngoài cùng bên phải
        swap(nums[0], nums[i]);
        // Bắt đầu heapify nút gốc, từ trên xuống
        siftDown(nums, i, 0);
    }
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Độ dài heap là n, heapify nút i từ trên xuống */
public static void siftDown(int[] nums, int n, int i) {
    while (true) {
        int l = 2 * i + 1;
        int r = 2 * i + 2;
        int ma = i;
        if (l &lt; n &amp;&amp; nums[l] &gt; nums[ma])
            ma = l;
        if (r &lt; n &amp;&amp; nums[r] &gt; nums[ma])
            ma = r;
        // Nếu nút i là lớn nhất hoặc chỉ mục l, r vượt ngoài phạm vi, không cần heapify tiếp, thoát
        if (ma == i)
            break;
        // Hoán đổi hai nút
        int temp = nums[i];
        nums[i] = nums[ma];
        nums[ma] = temp;
        // Vòng lặp heapify đi xuống
        i = ma;
    }
}

/* Sắp xếp vun đống */
public static void heapSort(int[] nums) {
    // Thao tác xây heap: heapify tất cả các nút trừ lá
    for (int i = nums.length / 2 - 1; i &gt;= 0; i--) {
        siftDown(nums, nums.length, i);
    }
    // Trích xuất phần tử lớn nhất từ heap và lặp lại tổng cộng n-1 vòng
    for (int i = nums.length - 1; i &gt; 0; i--) {
        int tmp = nums[0];
        nums[0] = nums[i];
        nums[i] = tmp;
        // Bắt đầu heapify nút gốc, từ trên xuống
        siftDown(nums, i, 0);
    }
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Độ dài heap là n, heapify nút i từ trên xuống */
function siftDown(nums, n, i) {
    while (true) {
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        let ma = i;
        if (l &lt; n &amp;&amp; nums[l] &gt; nums[ma]) {
            ma = l;
        }
        if (r &lt; n &amp;&amp; nums[r] &gt; nums[ma]) {
            ma = r;
        }
        // Nếu nút i là lớn nhất hoặc chỉ mục l, r vượt ngoài phạm vi, không cần heapify tiếp, thoát
        if (ma === i) {
            break;
        }
        // Hoán đổi hai nút
        [nums[i], nums[ma]] = [nums[ma], nums[i]];
        // Vòng lặp heapify đi xuống
        i = ma;
    }
}

/* Sắp xếp vun đống */
function heapSort(nums) {
    // Thao tác xây heap: heapify tất cả các nút trừ lá
    for (let i = Math.floor(nums.length / 2) - 1; i &gt;= 0; i--) {
        siftDown(nums, nums.length, i);
    }
    // Trích xuất phần tử lớn nhất từ heap và lặp lại tổng cộng n-1 vòng
    for (let i = nums.length - 1; i &gt; 0; i--) {
        [nums[0], nums[i]] = [nums[i], nums[0]];
        // Bắt đầu heapify nút gốc, từ trên xuống
        siftDown(nums, i, 0);
    }
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Độ dài heap là n, heapify nút i từ trên xuống */
fun siftDown(nums: IntArray, n: Int, li: Int) {
    var i = li
    while (true) {
        val l = 2 * i + 1
        val r = 2 * i + 2
        var ma = i
        if (l &lt; n &amp;&amp; nums[l] &gt; nums[ma])
            ma = l
        if (r &lt; n &amp;&amp; nums[r] &gt; nums[ma])
            ma = r
        // Nếu nút i là lớn nhất hoặc chỉ mục l, r vượt ngoài phạm vi, không cần heapify tiếp, thoát
        if (ma == i)
            break
        // Hoán đổi hai nút
        val temp = nums[i]
        nums[i] = nums[ma]
        nums[ma] = temp
        // Vòng lặp heapify đi xuống
        i = ma
    }
}

/* Sắp xếp vun đống */
fun heapSort(nums: IntArray) {
    // Thao tác xây heap: heapify tất cả các nút trừ lá
    for (i in nums.size / 2 - 1 downTo 0) {
        siftDown(nums, nums.size, i)
    }
    // Trích xuất phần tử lớn nhất từ heap và lặp lại tổng cộng n-1 vòng
    for (i in nums.size - 1 downTo 1) {
        val temp = nums[0]
        nums[0] = nums[i]
        nums[i] = temp
        // Bắt đầu heapify nút gốc, từ trên xuống
        siftDown(nums, i, 0)
    }
}
</code></pre></div></div></div>
<h2>11.7.2 Đặc điểm Thuật toán</h2>
<ul>
  <li><strong>Độ phức tạp thời gian là $O(n \\log n)$; không thích ứng</strong>: Xây heap tốn thời gian $O(n)$. Trích xuất phần tử lớn nhất từ heap tốn thời gian $O(\\log n)$, và điều này lặp lại tổng cộng $n - 1$ vòng.</li>
  <li><strong>Độ phức tạp không gian là $O(1)$; sắp xếp tại chỗ</strong>: Vài biến con trỏ sử dụng $O(1)$ không gian. Hoán đổi phần tử và heapify đều được thực hiện trên mảng gốc.</li>
  <li><strong>Sắp xếp không ổn định</strong>: Khi hoán đổi phần tử đỉnh heap và đáy heap, vị trí tương đối của các phần tử bằng nhau có thể thay đổi.</li>
</ul>

<h2>11.7.3 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="heap-sort-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'heap-sort-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'heap-sort-wrapper', 'tab-interactive'); initSortDemo('heap-sort-wrapper', SORT_FRAMES_HEAPSORT)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem từng bước xây Max-Heap rồi trích xuất phần tử lớn nhất lặp lại, trên mảng <code>[4, 1, 3, 1, 5, 2]</code>.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="heap-sort-wrapper-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="heap-sort-wrapper-btn-autorun" class="control-btn" onclick="autoRunSortDemo('heap-sort-wrapper')">▶ Auto Run</button>
      <button id="heap-sort-wrapper-btn-step" class="control-btn btn-secondary" onclick="stepSortDemo('heap-sort-wrapper')">Bước tiếp theo ▶</button>
      <button id="heap-sort-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunSortDemo('heap-sort-wrapper')" disabled>⏸ Dừng</button>
      <button id="heap-sort-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initSortDemo('heap-sort-wrapper', SORT_FRAMES_HEAPSORT)">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setSortDemoSpeed('heap-sort-wrapper', this.value)" /> <span id="heap-sort-wrapper-speed-label">700ms</span>
    </div>
    <div id="heap-sort-wrapper-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu.</div>
  </div>
</div>
`,
    originalContent: `# Heap Sort

!!! tip

    Before reading this section, please ensure you have completed the "Heap" chapter.

<u>Heap sort</u> is an efficient sorting algorithm based on the heap data structure. We can implement heap sort using the heap construction and element removal operations introduced earlier.

1. Input the array and build a min-heap, at which point the smallest element is at the heap top.
2. Continuously perform element removal operations and record the removed elements in order to obtain a sequence sorted in ascending order.

Although the above method is feasible, it requires an additional array to save the popped elements, which is quite wasteful of space. In practice, we usually use a more elegant implementation method.

## Algorithm Flow

Assume the array length is $n$. The flow of heap sort is shown in the figure below.

1. Input the array and build a max-heap. After completion, the largest element is at the heap top.
2. Swap the heap top element (first element) with the heap bottom element (last element). After the swap is complete, reduce the heap length by $1$ and increase the count of sorted elements by $1$.
3. Starting from the heap top element, perform a top-to-bottom heapify operation (sift down). After heapify is complete, the heap property is restored.
4. Repeat steps \`2.\` and \`3.\` After $n - 1$ rounds, the array is sorted.

!!! tip

    In fact, the element removal operation also includes steps \`2.\` and \`3.\`, with the additional step of removing the element.

=== "<1>"
    ![Heap sort steps](heap_sort.assets/heap_sort_step1.png)

=== "<2>"
    ![heap_sort_step2](heap_sort.assets/heap_sort_step2.png)

=== "<3>"
    ![heap_sort_step3](heap_sort.assets/heap_sort_step3.png)

=== "<4>"
    ![heap_sort_step4](heap_sort.assets/heap_sort_step4.png)

=== "<5>"
    ![heap_sort_step5](heap_sort.assets/heap_sort_step5.png)

=== "<6>"
    ![heap_sort_step6](heap_sort.assets/heap_sort_step6.png)

=== "<7>"
    ![heap_sort_step7](heap_sort.assets/heap_sort_step7.png)

=== "<8>"
    ![heap_sort_step8](heap_sort.assets/heap_sort_step8.png)

=== "<9>"
    ![heap_sort_step9](heap_sort.assets/heap_sort_step9.png)

=== "<10>"
    ![heap_sort_step10](heap_sort.assets/heap_sort_step10.png)

=== "<11>"
    ![heap_sort_step11](heap_sort.assets/heap_sort_step11.png)

=== "<12>"
    ![heap_sort_step12](heap_sort.assets/heap_sort_step12.png)

In the code below, we use the same \`sift_down()\` function for top-to-bottom heapify as in the "Heap" chapter. It is worth noting that since the heap length decreases as the largest element is extracted, we need to add a length parameter $n$ to \`sift_down()\` to specify the current effective length of the heap. The code is as follows:

\`\`\`src
[file]{heap_sort}-[class]{}-[func]{heap_sort}
\`\`\`

## Algorithm Characteristics

- **Time complexity is $O(n \\log n)$; heap sort is non-adaptive**: Heap construction takes $O(n)$ time. Extracting the largest element from the heap takes $O(\\log n)$ time, and this is repeated for a total of $n - 1$ rounds.
- **Space complexity is $O(1)$; heap sort is in-place**: A few pointer variables use $O(1)$ space. Element swapping and heapify are both performed on the original array.
- **Unstable sorting**: When swapping the heap top element and heap bottom element, the relative positions of equal elements may change.
`
  },

  'dsa-bucket-sort': {
    title: '11.8 Sắp xếp Xô (Bucket Sort)',
    summary: 'Thuật toán Sắp xếp xô — thuật toán không so sánh đầu tiên: phân phối dữ liệu vào các bucket, sắp xếp riêng từng bucket rồi nối kết quả. Cách đạt phân phối đều để tối ưu về O(n).',
    tags: ['dsa', 'sorting', 'bucket-sort'],
    domain: 'Algorithms',
    module: 'Chương 11: Sắp xếp',
    prerequisites: ['dsa-heap-sort'],
    related: ['dsa-counting-sort'],
    updatedAt: '2026-07-19',
    readTime: '8 phút',
    content: `
<p>Các thuật toán sắp xếp đã thảo luận trước đó đều là thuật toán sắp xếp dựa trên so sánh, sắp xếp bằng cách so sánh thứ tự tương đối của các phần tử. Độ phức tạp thời gian của các thuật toán này không thể vượt qua $O(n \\log n)$. Tiếp theo, ta sẽ khám phá một số thuật toán sắp xếp không so sánh, có độ phức tạp thời gian có thể tuyến tính.</p>
<p><u>Sắp xếp xô (Bucket sort)</u> là một ứng dụng điển hình của chiến lược chia để trị. Nó hoạt động bằng cách tạo ra một dãy các bucket có thứ tự, mỗi bucket tương ứng với một phạm vi dữ liệu, và phân phối dữ liệu đều vào chúng. Các phần tử trong mỗi bucket sau đó được sắp xếp riêng. Cuối cùng, tất cả các bucket được nối lại theo thứ tự.</p>

<h2>11.8.1 Quy trình Thuật toán</h2>
<p>Xem xét một mảng độ dài $n$, các phần tử của nó là số thực dấu phẩy động trong khoảng $[0, 1)$. Quy trình của sắp xếp xô được thể hiện trong hình bên dưới.</p>
<ol>
  <li>Khởi tạo $k$ bucket và phân phối $n$ phần tử vào $k$ bucket đó.</li>
  <li>Sắp xếp riêng từng bucket (ở đây ta dùng hàm sắp xếp có sẵn của ngôn ngữ lập trình).</li>
  <li>Nối kết quả theo thứ tự từ bucket nhỏ nhất tới lớn nhất.</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/bucket_sort_overview.png" alt="Quy trình thuật toán sắp xếp xô" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Đoạn mã như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def bucket_sort(nums: list[float]):
    """Sắp xếp xô (bucket)"""
    # Khởi tạo k = n/2 bucket, kỳ vọng phân bổ 2 phần tử mỗi bucket
    k = len(nums) // 2
    buckets = [[] for _ in range(k)]
    # 1. Phân phối các phần tử của mảng vào các bucket
    for num in nums:
        # Dữ liệu đầu vào nằm trong khoảng [0, 1), dùng num * k để ánh xạ sang chỉ mục [0, k-1]
        i = int(num * k)
        # Thêm num vào bucket i
        buckets[i].append(num)
    # 2. Sắp xếp riêng từng bucket
    for bucket in buckets:
        # Dùng hàm sắp xếp có sẵn, cũng có thể thay bằng thuật toán sắp xếp khác
        bucket.sort()
    # 3. Duyệt các bucket để nối kết quả
    i = 0
    for bucket in buckets:
        for num in bucket:
            nums[i] = num
            i += 1
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Sắp xếp xô (bucket) */
void bucketSort(vector&lt;float&gt; &amp;nums) {
    // Khởi tạo k = n/2 bucket, kỳ vọng phân bổ 2 phần tử mỗi bucket
    int k = nums.size() / 2;
    vector&lt;vector&lt;float&gt;&gt; buckets(k);
    // 1. Phân phối các phần tử của mảng vào các bucket
    for (float num : nums) {
        // Dữ liệu đầu vào nằm trong khoảng [0, 1), dùng num * k để ánh xạ sang chỉ mục [0, k-1]
        int i = num * k;
        // Thêm num vào bucket i
        buckets[i].push_back(num);
    }
    // 2. Sắp xếp riêng từng bucket
    for (vector&lt;float&gt; &amp;bucket : buckets) {
        // Dùng hàm sắp xếp có sẵn, cũng có thể thay bằng thuật toán sắp xếp khác
        sort(bucket.begin(), bucket.end());
    }
    // 3. Duyệt các bucket để nối kết quả
    int i = 0;
    for (vector&lt;float&gt; &amp;bucket : buckets) {
        for (float num : bucket) {
            nums[i++] = num;
        }
    }
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Sắp xếp xô (bucket) */
static void bucketSort(float[] nums) {
    // Khởi tạo k = n/2 bucket, kỳ vọng phân bổ 2 phần tử mỗi bucket
    int k = nums.length / 2;
    List&lt;List&lt;Float&gt;&gt; buckets = new ArrayList&lt;&gt;();
    for (int i = 0; i &lt; k; i++) {
        buckets.add(new ArrayList&lt;&gt;());
    }
    // 1. Phân phối các phần tử của mảng vào các bucket
    for (float num : nums) {
        // Dữ liệu đầu vào nằm trong khoảng [0, 1), dùng num * k để ánh xạ sang chỉ mục [0, k-1]
        int i = (int) (num * k);
        // Thêm num vào bucket i
        buckets.get(i).add(num);
    }
    // 2. Sắp xếp riêng từng bucket
    for (List&lt;Float&gt; bucket : buckets) {
        // Dùng hàm sắp xếp có sẵn, cũng có thể thay bằng thuật toán sắp xếp khác
        Collections.sort(bucket);
    }
    // 3. Duyệt các bucket để nối kết quả
    int i = 0;
    for (List&lt;Float&gt; bucket : buckets) {
        for (float num : bucket) {
            nums[i++] = num;
        }
    }
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Sắp xếp xô (bucket) */
function bucketSort(nums) {
    // Khởi tạo k = n/2 bucket, kỳ vọng phân bổ 2 phần tử mỗi bucket
    const k = nums.length / 2;
    const buckets = [];
    for (let i = 0; i &lt; k; i++) {
        buckets.push([]);
    }
    // 1. Phân phối các phần tử của mảng vào các bucket
    for (const num of nums) {
        // Dữ liệu đầu vào nằm trong khoảng [0, 1), dùng num * k để ánh xạ sang chỉ mục [0, k-1]
        const i = Math.floor(num * k);
        // Thêm num vào bucket i
        buckets[i].push(num);
    }
    // 2. Sắp xếp riêng từng bucket
    for (const bucket of buckets) {
        // Dùng hàm sắp xếp có sẵn, cũng có thể thay bằng thuật toán sắp xếp khác
        bucket.sort((a, b) =&gt; a - b);
    }
    // 3. Duyệt các bucket để nối kết quả
    let i = 0;
    for (const bucket of buckets) {
        for (const num of bucket) {
            nums[i++] = num;
        }
    }
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Sắp xếp xô (bucket) */
fun bucketSort(nums: FloatArray) {
    // Khởi tạo k = n/2 bucket, kỳ vọng phân bổ 2 phần tử mỗi bucket
    val k = nums.size / 2
    val buckets = mutableListOf&lt;MutableList&lt;Float&gt;&gt;()
    for (i in 0..&lt;k) {
        buckets.add(mutableListOf())
    }
    // 1. Phân phối các phần tử của mảng vào các bucket
    for (num in nums) {
        // Dữ liệu đầu vào nằm trong khoảng [0, 1), dùng num * k để ánh xạ sang chỉ mục [0, k-1]
        val i = (num * k).toInt()
        // Thêm num vào bucket i
        buckets[i].add(num)
    }
    // 2. Sắp xếp riêng từng bucket
    for (bucket in buckets) {
        // Dùng hàm sắp xếp có sẵn, cũng có thể thay bằng thuật toán sắp xếp khác
        bucket.sort()
    }
    // 3. Duyệt các bucket để nối kết quả
    var i = 0
    for (bucket in buckets) {
        for (num in bucket) {
            nums[i++] = num
        }
    }
}
</code></pre></div></div></div>
<h2>11.8.2 Đặc điểm Thuật toán</h2>
<p>Sắp xếp xô phù hợp để xử lý các tập dữ liệu rất lớn. Ví dụ, giả sử đầu vào chứa 1 triệu phần tử, và bộ nhớ hạn chế khiến hệ thống không thể nạp tất cả cùng lúc. Trong trường hợp đó, dữ liệu có thể được chia thành 1000 bucket, mỗi bucket có thể được sắp xếp riêng, và kết quả sau đó được nối lại.</p>
<ul>
  <li><strong>Độ phức tạp thời gian là $O(n + k)$</strong>: Giả sử các phần tử được phân phối đều trên các bucket, mỗi bucket chứa $\\frac{n}{k}$ phần tử. Nếu sắp xếp một bucket tốn thời gian $O(\\frac{n}{k} \\log\\frac{n}{k})$, thì sắp xếp tất cả các bucket tốn thời gian $O(n \\log\\frac{n}{k})$. <strong>Khi số lượng bucket $k$ tương đối lớn, độ phức tạp thời gian tiến gần tới $O(n)$</strong>. Việc nối kết quả yêu cầu duyệt qua tất cả các bucket và phần tử, tốn thời gian $O(n + k)$. Trong trường hợp xấu nhất, tất cả dữ liệu được đặt vào một bucket duy nhất, và sắp xếp bucket đó tốn thời gian $O(n^2)$.</li>
  <li><strong>Độ phức tạp không gian là $O(n + k)$, và sắp xếp xô không phải sắp xếp tại chỗ</strong>: Nó cần thêm không gian cho $k$ bucket và tổng cộng $n$ phần tử.</li>
  <li>Việc sắp xếp xô có ổn định hay không phụ thuộc vào việc thuật toán sắp xếp các phần tử trong bucket có ổn định hay không.</li>
</ul>

<h2>11.8.3 Cách Đạt được Phân phối Đều</h2>
<p>Về lý thuyết, sắp xếp xô có thể đạt độ phức tạp thời gian $O(n)$. <strong>Điều then chốt là phân phối các phần tử đều trên các bucket</strong>, vì dữ liệu thực tế thường không được phân phối đồng đều. Ví dụ, giả sử ta muốn chia đều tất cả sản phẩm trên Taobao vào 10 bucket theo khoảng giá, nhưng phân phối giá lại không đều: có rất nhiều sản phẩm giá dưới 100 tệ và rất ít sản phẩm giá trên 1000 tệ. Nếu khoảng giá được chia đều thành 10 khoảng, số lượng sản phẩm trong các bucket sẽ chênh lệch rất lớn.</p>
<p>Để đạt được phân phối đồng đều hơn, trước tiên ta có thể chọn một ranh giới thô và chia dữ liệu thành 3 bucket. <strong>Sau đó, các bucket chứa nhiều sản phẩm hơn có thể được chia tiếp thành 3 bucket nữa cho tới khi số lượng phần tử trong tất cả các bucket gần bằng nhau</strong>.</p>
<p>Như hình bên dưới, phương pháp này về bản chất xây dựng một cây đệ quy với mục tiêu làm cho các nút lá càng cân bằng càng tốt. Tất nhiên, dữ liệu không nhất thiết phải chia thành 3 bucket ở mỗi vòng; chiến lược phân chia cụ thể có thể được chọn linh hoạt dựa trên đặc điểm của dữ liệu.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/scatter_in_buckets_recursively.png" alt="Chia bucket đệ quy" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Nếu ta biết trước phân phối xác suất của giá sản phẩm, <strong>ta có thể thiết lập ranh giới giá cho mỗi bucket theo phân phối đó</strong>. Đáng chú ý, phân phối dữ liệu không cần được đo lường chính xác; nó cũng có thể được xấp xỉ bằng một mô hình xác suất được chọn phù hợp với đặc điểm của dữ liệu.</p>
<p>Như hình bên dưới, ta giả sử giá sản phẩm tuân theo phân phối chuẩn, điều này cho phép ta thiết lập hợp lý các khoảng giá để phân phối đều sản phẩm vào từng bucket.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/scatter_in_buckets_distribution.png" alt="Chia bucket dựa trên phân phối xác suất" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>11.8.4 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="bucket-sort-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'bucket-sort-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'bucket-sort-wrapper', 'tab-interactive'); initSortDemo('bucket-sort-wrapper', SORT_FRAMES_BUCKETSORT)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem từng bước phân phối, sắp xếp riêng, và nối kết quả trên mảng <code>[0.49, 0.96, 0.82, 0.09, 0.57, 0.43, 0.91, 0.75, 0.15, 0.37]</code> với 5 bucket.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="bucket-sort-wrapper-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="bucket-sort-wrapper-btn-autorun" class="control-btn" onclick="autoRunSortDemo('bucket-sort-wrapper')">▶ Auto Run</button>
      <button id="bucket-sort-wrapper-btn-step" class="control-btn btn-secondary" onclick="stepSortDemo('bucket-sort-wrapper')">Bước tiếp theo ▶</button>
      <button id="bucket-sort-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunSortDemo('bucket-sort-wrapper')" disabled>⏸ Dừng</button>
      <button id="bucket-sort-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initSortDemo('bucket-sort-wrapper', SORT_FRAMES_BUCKETSORT)">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setSortDemoSpeed('bucket-sort-wrapper', this.value)" /> <span id="bucket-sort-wrapper-speed-label">700ms</span>
    </div>
    <div id="bucket-sort-wrapper-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu.</div>
  </div>
</div>
`,
    originalContent: `# Bucket Sort

The sorting algorithms discussed earlier are all comparison-based sorting algorithms, which sort by comparing the relative order of elements. The time complexity of such algorithms cannot beat $O(n \\log n)$. Next, we will explore several non-comparison sorting algorithms, whose time complexity can be linear.

<u>Bucket sort</u> is a typical application of the divide-and-conquer strategy. It works by creating a sequence of ordered buckets, each corresponding to a data range, and distributing the data evenly among them. The elements within each bucket are then sorted separately. Finally, all buckets are merged in order.

## Algorithm Flow

Consider an array of length $n$, whose elements are floating-point numbers in the range $[0, 1)$. The flow of bucket sort is shown in the figure below.

1. Initialize $k$ buckets and distribute the $n$ elements into the $k$ buckets.
2. Sort each bucket separately (here we use the built-in sorting function of the programming language).
3. Merge the results in order from smallest to largest bucket.

![Bucket sort algorithm flow](bucket_sort.assets/bucket_sort_overview.png)

The code is as follows:

\`\`\`src
[file]{bucket_sort}-[class]{}-[func]{bucket_sort}
\`\`\`

## Algorithm Characteristics

Bucket sort is suitable for processing very large datasets. For example, suppose the input contains 1 million elements, and limited memory prevents the system from loading all of them at once. In that case, the data can be divided into 1000 buckets, each bucket can be sorted separately, and the results can then be merged.

- **Time complexity is $O(n + k)$**: Assuming the elements are evenly distributed across the buckets, each bucket contains $\\frac{n}{k}$ elements. If sorting a single bucket takes $O(\\frac{n}{k} \\log\\frac{n}{k})$ time, then sorting all buckets takes $O(n \\log\\frac{n}{k})$ time. **When the number of buckets $k$ is relatively large, the time complexity approaches $O(n)$**. Merging the results requires traversing all buckets and elements, which takes $O(n + k)$ time. In the worst case, all data is placed into a single bucket, and sorting that bucket takes $O(n^2)$ time.
- **Space complexity is $O(n + k)$, and bucket sort is not in-place**: It requires extra space for $k$ buckets and a total of $n$ elements.
- Whether bucket sort is stable depends on whether the algorithm for sorting elements within buckets is stable.

## How to Achieve Even Distribution

In theory, bucket sort can achieve $O(n)$ time complexity. **The key is to distribute the elements evenly across the buckets**, because real-world data is often not uniformly distributed. For example, suppose we want to divide all products on Taobao evenly into 10 buckets by price range, but the price distribution is uneven: there are many products priced below 100 yuan and very few priced above 1000 yuan. If the price range is divided evenly into 10 intervals, the numbers of products in the buckets will differ greatly.

To achieve a more even distribution, we can first choose a rough boundary and partition the data into 3 buckets. **After that, buckets containing more products can be further divided into 3 buckets until the numbers of elements in all buckets are roughly equal**.

As shown in the figure below, this method essentially builds a recursion tree whose goal is to make the leaf nodes as balanced as possible. Of course, the data does not have to be split into 3 buckets in every round; the specific partitioning strategy can be chosen flexibly based on the characteristics of the data.

![Recursively dividing buckets](bucket_sort.assets/scatter_in_buckets_recursively.png)

If we know the probability distribution of product prices in advance, **we can set the price boundaries for each bucket according to that distribution**. Notably, the data distribution does not need to be measured exactly; it can also be approximated with a probability model chosen to fit the characteristics of the data.

As shown in the figure below, we assume that product prices follow a normal distribution, which allows us to reasonably set price intervals to evenly distribute products to each bucket.

![Dividing buckets based on probability distribution](bucket_sort.assets/scatter_in_buckets_distribution.png)
`
  },

  'dsa-counting-sort': {
    title: '11.9 Sắp xếp Đếm (Counting Sort)',
    summary: 'Thuật toán Sắp xếp đếm: đếm số lần xuất hiện của phần tử, dùng tổng tiền tố để hỗ trợ sắp xếp ổn định trên đối tượng. Phù hợp khi phạm vi giá trị nhỏ nhưng số lượng phần tử lớn.',
    tags: ['dsa', 'sorting', 'counting-sort'],
    domain: 'Algorithms',
    module: 'Chương 11: Sắp xếp',
    prerequisites: ['dsa-bucket-sort'],
    related: ['dsa-radix-sort'],
    updatedAt: '2026-07-19',
    readTime: '8 phút',
    content: `
<p><u>Sắp xếp đếm (Counting sort)</u> sắp xếp bằng cách đếm số lần xuất hiện của các phần tử và thường được áp dụng cho mảng số nguyên.</p>

<h2>11.9.1 Triển khai Đơn giản</h2>
<p>Hãy bắt đầu với một ví dụ đơn giản. Cho mảng <code>nums</code> độ dài $n$, trong đó các phần tử đều là "số nguyên không âm", quy trình tổng thể của sắp xếp đếm được thể hiện trong hình bên dưới.</p>
<ol>
  <li>Duyệt mảng để tìm số lớn nhất, ký hiệu là $m$, sau đó tạo một mảng phụ trợ <code>counter</code> độ dài $m + 1$.</li>
  <li><strong>Dùng <code>counter</code> để đếm số lần mỗi số xuất hiện trong <code>nums</code></strong>, trong đó <code>counter[num]</code> lưu số lần xuất hiện của <code>num</code>. Việc này đơn giản: duyệt <code>nums</code> (ký hiệu số hiện tại là <code>num</code>) và tăng <code>counter[num]</code> lên $1$ mỗi lần.</li>
  <li><strong>Vì các chỉ mục của <code>counter</code> tự nhiên đã có thứ tự, các số về cơ bản đã được sắp xếp</strong>. Tiếp theo, duyệt <code>counter</code> và ghi các số trở lại <code>nums</code> theo thứ tự tăng dần dựa trên số lần xuất hiện của chúng.</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/counting_sort_overview.png" alt="Quy trình sắp xếp đếm" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Đoạn mã như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def counting_sort_naive(nums: list[int]):
    """Sắp xếp đếm"""
    # Triển khai đơn giản, không dùng để sắp xếp đối tượng được
    # 1. Đếm phần tử lớn nhất m trong mảng
    m = 0
    for num in nums:
        m = max(m, num)
    # 2. Đếm số lần xuất hiện của mỗi số
    # counter[num] biểu thị số lần xuất hiện của num
    counter = [0] * (m + 1)
    for num in nums:
        counter[num] += 1
    # 3. Duyệt counter, ghi từng phần tử trở lại mảng gốc nums
    i = 0
    for num in range(m + 1):
        for _ in range(counter[num]):
            nums[i] = num
            i += 1
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Sắp xếp đếm */
// Triển khai đơn giản, không dùng để sắp xếp đối tượng được
void countingSortNaive(vector&lt;int&gt; &amp;nums) {
    // 1. Đếm phần tử lớn nhất m trong mảng
    int m = 0;
    for (int num : nums) {
        m = max(m, num);
    }
    // 2. Đếm số lần xuất hiện của mỗi số
    // counter[num] biểu thị số lần xuất hiện của num
    vector&lt;int&gt; counter(m + 1, 0);
    for (int num : nums) {
        counter[num]++;
    }
    // 3. Duyệt counter, ghi từng phần tử trở lại mảng gốc nums
    int i = 0;
    for (int num = 0; num &lt; m + 1; num++) {
        for (int j = 0; j &lt; counter[num]; j++, i++) {
            nums[i] = num;
        }
    }
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Sắp xếp đếm */
// Triển khai đơn giản, không dùng để sắp xếp đối tượng được
static void countingSortNaive(int[] nums) {
    // 1. Đếm phần tử lớn nhất m trong mảng
    int m = 0;
    for (int num : nums) {
        m = Math.max(m, num);
    }
    // 2. Đếm số lần xuất hiện của mỗi số
    int[] counter = new int[m + 1];
    for (int num : nums) {
        counter[num]++;
    }
    // 3. Duyệt counter, ghi từng phần tử trở lại mảng gốc nums
    int i = 0;
    for (int num = 0; num &lt; m + 1; num++) {
        for (int j = 0; j &lt; counter[num]; j++, i++) {
            nums[i] = num;
        }
    }
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Sắp xếp đếm */
// Triển khai đơn giản, không dùng để sắp xếp đối tượng được
function countingSortNaive(nums) {
    // 1. Đếm phần tử lớn nhất m trong mảng
    let m = Math.max(...nums);
    // 2. Đếm số lần xuất hiện của mỗi số
    const counter = new Array(m + 1).fill(0);
    for (const num of nums) {
        counter[num]++;
    }
    // 3. Duyệt counter, ghi từng phần tử trở lại mảng gốc nums
    let i = 0;
    for (let num = 0; num &lt; m + 1; num++) {
        for (let j = 0; j &lt; counter[num]; j++, i++) {
            nums[i] = num;
        }
    }
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Sắp xếp đếm */
// Triển khai đơn giản, không dùng để sắp xếp đối tượng được
fun countingSortNaive(nums: IntArray) {
    // 1. Đếm phần tử lớn nhất m trong mảng
    var m = 0
    for (num in nums) {
        m = max(m, num)
    }
    // 2. Đếm số lần xuất hiện của mỗi số
    val counter = IntArray(m + 1)
    for (num in nums) {
        counter[num]++
    }
    // 3. Duyệt counter, ghi từng phần tử trở lại mảng gốc nums
    var i = 0
    for (num in 0..&lt;m + 1) {
        var j = 0
        while (j &lt; counter[num]) {
            nums[i] = num
            j++
            i++
        }
    }
}
</code></pre></div></div></div>
<div class="callout callout-note">
  <span class="callout-icon">📌</span>
  <div class="callout-body">
    <p><strong>Mối liên hệ giữa sắp xếp đếm và sắp xếp xô</strong></p>
    <p>Xét theo góc độ sắp xếp xô, mỗi chỉ mục của mảng đếm <code>counter</code> có thể được xem như một bucket, và quá trình đếm có thể xem là việc phân phối phần tử vào bucket tương ứng của chúng. Về bản chất, sắp xếp đếm là một trường hợp đặc biệt của sắp xếp xô cho dữ liệu số nguyên.</p>
  </div>
</div>

<h2>11.9.2 Triển khai Đầy đủ</h2>
<p>Bạn đọc tinh ý có thể đã nhận thấy rằng <strong>nếu đầu vào là các đối tượng, bước <code>3.</code> ở trên sẽ không còn hoạt động nữa</strong>. Giả sử đầu vào là các đối tượng sản phẩm và ta muốn sắp xếp chúng theo giá (một biến thành viên của lớp); thuật toán trên chỉ có thể tạo ra thứ tự sắp xếp của chính các mức giá.</p>
<p>Vậy làm sao để có được thứ tự sắp xếp của dữ liệu gốc? Trước tiên ta tính tổng tiền tố (prefix sum) của <code>counter</code>. Đúng như tên gọi, tổng tiền tố tại chỉ mục <code>i</code>, <code>prefix[i]</code>, bằng tổng các phần tử từ chỉ mục <code>0</code> đến <code>i</code>:</p>
<div style="overflow-x:auto; margin:1em 0;">
$$
\\text{prefix}[i] = \\sum_{j=0}^i \\text{counter[j]}
$$
</div>
<p><strong>Tổng tiền tố có một cách diễn giải rõ ràng: <code>prefix[num] - 1</code> cho chỉ mục xuất hiện cuối cùng của phần tử <code>num</code> trong mảng kết quả <code>res</code></strong>. Thông tin này rất quan trọng vì nó cho ta biết mỗi phần tử nên được đặt ở đâu trong mảng kết quả. Tiếp theo, ta duyệt ngược mảng gốc <code>nums</code>, và với mỗi phần tử <code>num</code>, thực hiện hai bước sau.</p>
<ol>
  <li>Đặt <code>num</code> vào chỉ mục <code>prefix[num] - 1</code> của mảng <code>res</code>.</li>
  <li>Giảm tổng tiền tố <code>prefix[num]</code> đi $1$ để có được chỉ mục cho lần đặt <code>num</code> tiếp theo.</li>
</ol>
<p>Sau khi duyệt xong, mảng <code>res</code> chứa kết quả đã sắp xếp, và cuối cùng <code>res</code> được dùng để ghi đè mảng gốc <code>nums</code>. Quy trình sắp xếp đếm đầy đủ được thể hiện trong hình bên dưới.</p>

<div class="interactive-widget-wrapper" id="counting-sort-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img src="dsa-assets/counting_sort_step1.png" alt="Bước 1" style="max-width:100%;" /><p class="slide-caption">Các bước sắp xếp đếm — bước 1.</p></div>
    <div class="slide"><img src="dsa-assets/counting_sort_step2.png" alt="Bước 2" style="max-width:100%;" /><p class="slide-caption">Bước 2.</p></div>
    <div class="slide"><img src="dsa-assets/counting_sort_step3.png" alt="Bước 3" style="max-width:100%;" /><p class="slide-caption">Bước 3.</p></div>
    <div class="slide"><img src="dsa-assets/counting_sort_step4.png" alt="Bước 4" style="max-width:100%;" /><p class="slide-caption">Bước 4.</p></div>
    <div class="slide"><img src="dsa-assets/counting_sort_step5.png" alt="Bước 5" style="max-width:100%;" /><p class="slide-caption">Bước 5.</p></div>
    <div class="slide"><img src="dsa-assets/counting_sort_step6.png" alt="Bước 6" style="max-width:100%;" /><p class="slide-caption">Bước 6.</p></div>
    <div class="slide"><img src="dsa-assets/counting_sort_step7.png" alt="Bước 7" style="max-width:100%;" /><p class="slide-caption">Bước 7.</p></div>
    <div class="slide"><img src="dsa-assets/counting_sort_step8.png" alt="Bước 8" style="max-width:100%;" /><p class="slide-caption">Bước 8: hoàn tất, res chứa kết quả đã sắp xếp.</p></div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('counting-sort-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 8</span>
      <button class="slider-btn" onclick="nextSlide('counting-sort-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>

<p>Cách triển khai sắp xếp đếm được thể hiện bên dưới:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def counting_sort(nums: list[int]):
    """Sắp xếp đếm"""
    # Triển khai đầy đủ, có thể sắp xếp đối tượng và là thuật toán ổn định
    # 1. Đếm phần tử lớn nhất m trong mảng
    m = max(nums)
    # 2. Đếm số lần xuất hiện của mỗi số
    # counter[num] biểu thị số lần xuất hiện của num
    counter = [0] * (m + 1)
    for num in nums:
        counter[num] += 1
    # 3. Tính tổng tiền tố của counter, chuyển "số lần xuất hiện" thành "chỉ mục cuối"
    # counter[num]-1 là chỉ mục cuối cùng mà num xuất hiện trong res
    for i in range(m):
        counter[i + 1] += counter[i]
    # 4. Duyệt ngược nums, đặt từng phần tử vào mảng kết quả res
    # Khởi tạo mảng res để ghi kết quả
    n = len(nums)
    res = [0] * n
    for i in range(n - 1, -1, -1):
        num = nums[i]
        res[counter[num] - 1] = num  # Đặt num vào chỉ mục tương ứng
        counter[num] -= 1  # Giảm tổng tiền tố đi 1, được chỉ mục kế tiếp để đặt num
    # Dùng mảng kết quả res để ghi đè mảng gốc nums
    for i in range(n):
        nums[i] = res[i]
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Sắp xếp đếm */
// Triển khai đầy đủ, có thể sắp xếp đối tượng và là thuật toán ổn định
void countingSort(vector&lt;int&gt; &amp;nums) {
    // 1. Đếm phần tử lớn nhất m trong mảng
    int m = 0;
    for (int num : nums) {
        m = max(m, num);
    }
    // 2. Đếm số lần xuất hiện của mỗi số
    vector&lt;int&gt; counter(m + 1, 0);
    for (int num : nums) {
        counter[num]++;
    }
    // 3. Tính tổng tiền tố của counter, chuyển "số lần xuất hiện" thành "chỉ mục cuối"
    for (int i = 0; i &lt; m; i++) {
        counter[i + 1] += counter[i];
    }
    // 4. Duyệt ngược nums, đặt từng phần tử vào mảng kết quả res
    int n = nums.size();
    vector&lt;int&gt; res(n);
    for (int i = n - 1; i &gt;= 0; i--) {
        int num = nums[i];
        res[counter[num] - 1] = num; // Đặt num vào chỉ mục tương ứng
        counter[num]--;              // Giảm tổng tiền tố đi 1
    }
    // Dùng mảng kết quả res để ghi đè mảng gốc nums
    nums = res;
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Sắp xếp đếm */
// Triển khai đầy đủ, có thể sắp xếp đối tượng và là thuật toán ổn định
static void countingSort(int[] nums) {
    // 1. Đếm phần tử lớn nhất m trong mảng
    int m = 0;
    for (int num : nums) {
        m = Math.max(m, num);
    }
    // 2. Đếm số lần xuất hiện của mỗi số
    int[] counter = new int[m + 1];
    for (int num : nums) {
        counter[num]++;
    }
    // 3. Tính tổng tiền tố của counter, chuyển "số lần xuất hiện" thành "chỉ mục cuối"
    for (int i = 0; i &lt; m; i++) {
        counter[i + 1] += counter[i];
    }
    // 4. Duyệt ngược nums, đặt từng phần tử vào mảng kết quả res
    int n = nums.length;
    int[] res = new int[n];
    for (int i = n - 1; i &gt;= 0; i--) {
        int num = nums[i];
        res[counter[num] - 1] = num; // Đặt num vào chỉ mục tương ứng
        counter[num]--; // Giảm tổng tiền tố đi 1
    }
    // Dùng mảng kết quả res để ghi đè mảng gốc nums
    for (int i = 0; i &lt; n; i++) {
        nums[i] = res[i];
    }
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Sắp xếp đếm */
// Triển khai đầy đủ, có thể sắp xếp đối tượng và là thuật toán ổn định
function countingSort(nums) {
    // 1. Đếm phần tử lớn nhất m trong mảng
    let m = Math.max(...nums);
    // 2. Đếm số lần xuất hiện của mỗi số
    const counter = new Array(m + 1).fill(0);
    for (const num of nums) {
        counter[num]++;
    }
    // 3. Tính tổng tiền tố của counter, chuyển "số lần xuất hiện" thành "chỉ mục cuối"
    for (let i = 0; i &lt; m; i++) {
        counter[i + 1] += counter[i];
    }
    // 4. Duyệt ngược nums, đặt từng phần tử vào mảng kết quả res
    const n = nums.length;
    const res = new Array(n);
    for (let i = n - 1; i &gt;= 0; i--) {
        const num = nums[i];
        res[counter[num] - 1] = num; // Đặt num vào chỉ mục tương ứng
        counter[num]--; // Giảm tổng tiền tố đi 1
    }
    // Dùng mảng kết quả res để ghi đè mảng gốc nums
    for (let i = 0; i &lt; n; i++) {
        nums[i] = res[i];
    }
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Sắp xếp đếm */
// Triển khai đầy đủ, có thể sắp xếp đối tượng và là thuật toán ổn định
fun countingSort(nums: IntArray) {
    // 1. Đếm phần tử lớn nhất m trong mảng
    var m = 0
    for (num in nums) {
        m = max(m, num)
    }
    // 2. Đếm số lần xuất hiện của mỗi số
    val counter = IntArray(m + 1)
    for (num in nums) {
        counter[num]++
    }
    // 3. Tính tổng tiền tố của counter, chuyển "số lần xuất hiện" thành "chỉ mục cuối"
    for (i in 0..&lt;m) {
        counter[i + 1] += counter[i]
    }
    // 4. Duyệt ngược nums, đặt từng phần tử vào mảng kết quả res
    val n = nums.size
    val res = IntArray(n)
    for (i in n - 1 downTo 0) {
        val num = nums[i]
        res[counter[num] - 1] = num // Đặt num vào chỉ mục tương ứng
        counter[num]-- // Giảm tổng tiền tố đi 1
    }
    // Dùng mảng kết quả res để ghi đè mảng gốc nums
    for (i in 0..&lt;n) {
        nums[i] = res[i]
    }
}
</code></pre></div></div></div>
<h2>11.9.3 Đặc điểm Thuật toán</h2>
<ul>
  <li><strong>Độ phức tạp thời gian là $O(n + m)$, không thích ứng</strong>: Duyệt <code>nums</code> và <code>counter</code> đều tốn thời gian tuyến tính. Nhìn chung, khi $n \\gg m$, độ phức tạp thời gian tiến gần tới $O(n)$.</li>
  <li><strong>Độ phức tạp không gian là $O(n + m)$, không phải sắp xếp tại chỗ</strong>: Dùng các mảng <code>res</code> và <code>counter</code> độ dài lần lượt $n$ và $m$.</li>
  <li><strong>Sắp xếp ổn định</strong>: Vì các phần tử được điền vào <code>res</code> theo thứ tự "phải sang trái", duyệt ngược <code>nums</code> có thể tránh làm thay đổi vị trí tương đối của các phần tử bằng nhau, nhờ đó đạt được sắp xếp ổn định. Thực tế, duyệt xuôi <code>nums</code> cũng có thể cho kết quả sắp xếp đúng, nhưng kết quả sẽ không ổn định.</li>
</ul>

<h2>11.9.4 Hạn chế</h2>
<p>Đến đây, bạn có thể nghĩ sắp xếp đếm khá tinh xảo vì nó đạt được việc sắp xếp hiệu quả chỉ bằng cách đếm số lần xuất hiện. Tuy nhiên, các điều kiện tiên quyết để dùng sắp xếp đếm khá chặt chẽ.</p>
<p><strong>Sắp xếp đếm chỉ áp dụng được cho số nguyên không âm</strong>. Để áp dụng nó cho các kiểu dữ liệu khác, bạn phải đảm bảo chúng có thể được chuyển đổi thành số nguyên không âm mà không làm thay đổi thứ tự tương đối của các phần tử. Ví dụ, với mảng số nguyên chứa số âm, bạn có thể cộng thêm một hằng số vào mọi số để dịch chúng vào phạm vi không âm, rồi dịch ngược lại sau khi sắp xếp.</p>
<p><strong>Sắp xếp đếm phù hợp với các trường hợp có nhiều phần tử nhưng phạm vi giá trị nhỏ</strong>. Ví dụ, trong tình huống ở trên, $m$ không thể quá lớn; nếu không nó sẽ tiêu tốn quá nhiều không gian. Và khi $n \\ll m$, sắp xếp đếm tốn thời gian $O(m)$, có thể chậm hơn các thuật toán sắp xếp có độ phức tạp thời gian $O(n \\log n)$.</p>

<h2>11.9.5 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="counting-sort-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'counting-sort-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'counting-sort-wrapper', 'tab-interactive'); initSortDemo('counting-sort-wrapper', SORT_FRAMES_COUNTINGSORT)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem từng bước đếm, tính tổng tiền tố, và đặt phần tử vào <code>res</code> (phiên bản ổn định) trên mảng <code>[1, 0, 1, 2, 0, 4, 0, 2, 2, 4]</code>.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="counting-sort-wrapper-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="counting-sort-wrapper-btn-autorun" class="control-btn" onclick="autoRunSortDemo('counting-sort-wrapper')">▶ Auto Run</button>
      <button id="counting-sort-wrapper-btn-step" class="control-btn btn-secondary" onclick="stepSortDemo('counting-sort-wrapper')">Bước tiếp theo ▶</button>
      <button id="counting-sort-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunSortDemo('counting-sort-wrapper')" disabled>⏸ Dừng</button>
      <button id="counting-sort-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initSortDemo('counting-sort-wrapper', SORT_FRAMES_COUNTINGSORT)">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setSortDemoSpeed('counting-sort-wrapper', this.value)" /> <span id="counting-sort-wrapper-speed-label">700ms</span>
    </div>
    <div id="counting-sort-wrapper-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu.</div>
  </div>
</div>
`,
    originalContent: `# Counting Sort

<u>Counting sort</u> sorts by counting the occurrences of elements and is typically applied to integer arrays.

## Simple Implementation

Let's start with a simple example. Given an array \`nums\` of length $n$, where the elements are all "non-negative integers", the overall flow of counting sort is shown in the figure below.

1. Traverse the array to find the largest number, denoted as $m$, and then create an auxiliary array \`counter\` of length $m + 1$.
2. **Use \`counter\` to count how many times each number appears in \`nums\`**, where \`counter[num]\` stores the number of occurrences of \`num\`. This is simple: traverse \`nums\` (denote the current number by \`num\`) and increment \`counter[num]\` by $1$ each time.
3. **Because the indices of \`counter\` are naturally ordered, the numbers are effectively already sorted**. Next, traverse \`counter\` and write the numbers back into \`nums\` in ascending order according to their occurrence counts.

![Counting sort flow](counting_sort.assets/counting_sort_overview.png)

The code is as follows:

\`\`\`src
[file]{counting_sort}-[class]{}-[func]{counting_sort_naive}
\`\`\`

!!! note "Connection between counting sort and bucket sort"

    From the perspective of bucket sort, each index of the counting array \`counter\` can be viewed as a bucket, and the counting process can be seen as distributing elements into their corresponding buckets. Essentially, counting sort is a special case of bucket sort for integer data.

## Complete Implementation

Observant readers may have noticed that **if the input consists of objects, step \`3.\` above no longer works**. Suppose the input consists of product objects and we want to sort them by price (a member variable of the class); the above algorithm can only produce the sorted order of the prices themselves.

So how can we obtain the sorted order of the original data? We first compute the prefix sums of \`counter\`. As the name suggests, the prefix sum at index \`i\`, \`prefix[i]\`, equals the sum of the elements from index \`0\` through \`i\`:

$$
\\text{prefix}[i] = \\sum_{j=0}^i \\text{counter[j]}
$$

**The prefix sum has a clear interpretation: \`prefix[num] - 1\` gives the index of the last occurrence of element \`num\` in the result array \`res\`**. This information is crucial because it tells us where each element should be placed in the result array. Next, we traverse the original array \`nums\` in reverse, and for each element \`num\`, perform the following two steps.

1. Place \`num\` at index \`prefix[num] - 1\` of the array \`res\`.
2. Decrease the prefix sum \`prefix[num]\` by $1$ to get the index for the next placement of \`num\`.

After the traversal is complete, the array \`res\` contains the sorted result, and finally \`res\` is used to overwrite the original array \`nums\`. The complete counting sort flow is shown in the figure below.

=== "<1>"
    ![Counting sort steps](counting_sort.assets/counting_sort_step1.png)

=== "<2>"
    ![counting_sort_step2](counting_sort.assets/counting_sort_step2.png)

=== "<3>"
    ![counting_sort_step3](counting_sort.assets/counting_sort_step3.png)

=== "<4>"
    ![counting_sort_step4](counting_sort.assets/counting_sort_step4.png)

=== "<5>"
    ![counting_sort_step5](counting_sort.assets/counting_sort_step5.png)

=== "<6>"
    ![counting_sort_step6](counting_sort.assets/counting_sort_step6.png)

=== "<7>"
    ![counting_sort_step7](counting_sort.assets/counting_sort_step7.png)

=== "<8>"
    ![counting_sort_step8](counting_sort.assets/counting_sort_step8.png)

The counting sort implementation is shown below:

\`\`\`src
[file]{counting_sort}-[class]{}-[func]{counting_sort}
\`\`\`

## Algorithm Characteristics

- **Time complexity is $O(n + m)$, and counting sort is non-adaptive**: Traversing \`nums\` and \`counter\` both takes linear time. In general, when $n \\gg m$, the time complexity approaches $O(n)$.
- **Space complexity of $O(n + m)$, non-in-place sorting**: Uses arrays \`res\` and \`counter\` of lengths $n$ and $m$ respectively.
- **Stable sorting**: Since elements are filled into \`res\` in a "right-to-left" order, traversing \`nums\` in reverse can avoid changing the relative positions of equal elements, thereby achieving stable sorting. In fact, traversing \`nums\` in forward order can also yield correct sorting results, but the result would be unstable.

## Limitations

At this point, you might think counting sort is quite ingenious because it achieves efficient sorting simply by counting occurrences. However, the prerequisites for using counting sort are fairly restrictive.

**Counting sort is only applicable to non-negative integers**. To apply it to other types of data, you must ensure that they can be converted to non-negative integers without changing the relative ordering of the elements. For example, for an integer array containing negative numbers, you can first add a constant to every number to shift them into the non-negative range, and then shift them back after sorting.

**Counting sort is well suited to cases with many elements but a small value range**. For example, in the above scenario, $m$ cannot be too large; otherwise, it consumes too much space. And when $n \\ll m$, counting sort takes $O(m)$ time, which may be slower than sorting algorithms with $O(n \\log n)$ time complexity.
`
  },

  'dsa-radix-sort': {
    title: '11.10 Sắp xếp Cơ số (Radix Sort)',
    summary: 'Thuật toán Sắp xếp cơ số: sắp xếp lần lượt theo từng chữ số (từ thấp đến cao) bằng sắp xếp đếm, mở rộng khả năng của Counting Sort cho phạm vi giá trị lớn hơn.',
    tags: ['dsa', 'sorting', 'radix-sort'],
    domain: 'Algorithms',
    module: 'Chương 11: Sắp xếp',
    prerequisites: ['dsa-counting-sort'],
    related: ['dsa-sorting-summary'],
    updatedAt: '2026-07-19',
    readTime: '7 phút',
    content: `
<p>Mục trước đã giới thiệu sắp xếp đếm, phù hợp khi số lượng phần tử $n$ lớn nhưng phạm vi giá trị $m$ nhỏ. Giả sử ta cần sắp xếp $n = 10^6$ mã số sinh viên, mỗi mã là một số 8 chữ số. Khi đó phạm vi giá trị $m = 10^8$ rất lớn. Dùng sắp xếp đếm sẽ đòi hỏi một lượng bộ nhớ lớn, trong khi sắp xếp cơ số tránh được vấn đề này.</p>
<p><u>Sắp xếp cơ số (Radix sort)</u> dựa trên cùng ý tưởng cốt lõi như sắp xếp đếm: nó cũng sắp xếp bằng cách đếm số lần xuất hiện. Dựa trên đó, sắp xếp cơ số tận dụng mối quan hệ vị trí giữa các chữ số và sắp xếp từng chữ số một để có được kết quả cuối cùng.</p>

<h2>11.10.1 Quy trình Thuật toán</h2>
<p>Lấy dữ liệu mã số sinh viên làm ví dụ, giả sử chữ số thấp nhất là chữ số thứ $1$ và chữ số cao nhất là chữ số thứ $8$. Quy trình của sắp xếp cơ số được thể hiện trong hình bên dưới.</p>
<ol>
  <li>Khởi tạo chữ số $k = 1$.</li>
  <li>Thực hiện "sắp xếp đếm" trên chữ số thứ $k$ của các mã số sinh viên. Sau khi hoàn tất, dữ liệu sẽ được sắp xếp từ nhỏ đến lớn theo chữ số thứ $k$.</li>
  <li>Tăng $k$ lên $1$, sau đó quay lại bước <code>2.</code> và tiếp tục lặp cho đến khi tất cả các chữ số đã được sắp xếp, lúc đó quy trình kết thúc.</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/radix_sort_overview.png" alt="Quy trình thuật toán sắp xếp cơ số" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Tiếp theo, hãy xem đoạn mã. Với một số $x$ ở cơ số $d$, chữ số thứ $k$ của nó, $x_k$, có thể được tính bằng công thức sau:</p>
<div style="overflow-x:auto; margin:1em 0;">
$$
x_k = \\lfloor\\frac{x}{d^{k-1}}\\rfloor \\bmod d
$$
</div>
<p>Trong đó, $\\lfloor a \\rfloor$ biểu thị làm tròn xuống số thực dấu phẩy động $a$, và $\\bmod \\: d$ biểu thị lấy phần dư khi chia cho $d$. Với dữ liệu mã số sinh viên, $d = 10$ và $k \\in [1, 8]$.</p>
<p>Ngoài ra, ta cần chỉnh sửa một chút đoạn mã sắp xếp đếm để nó sắp xếp dựa trên chữ số thứ $k$ của số:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def digit(num: int, exp: int) -&gt; int:
    """Lấy chữ số thứ k của phần tử num, với exp = 10^(k-1)"""
    # Truyền exp thay vì k để tránh phải tính lũy thừa nhiều lần (tốn kém)
    return (num // exp) % 10


def counting_sort_digit(nums: list[int], exp: int):
    """Sắp xếp đếm (dựa trên chữ số thứ k của nums)"""
    # Phạm vi chữ số thập phân là 0~9, do đó cần mảng bucket độ dài 10
    counter = [0] * 10
    n = len(nums)
    # Đếm số lần xuất hiện của các chữ số 0~9
    for i in range(n):
        d = digit(nums[i], exp)  # Lấy chữ số thứ k của nums[i], ký hiệu là d
        counter[d] += 1  # Đếm số lần xuất hiện của chữ số d
    # Tính tổng tiền tố, chuyển "số lần xuất hiện" thành "chỉ mục mảng"
    for i in range(1, 10):
        counter[i] += counter[i - 1]
    # Duyệt ngược, dựa vào thống kê bucket, đặt từng phần tử vào res
    res = [0] * n
    for i in range(n - 1, -1, -1):
        d = digit(nums[i], exp)
        j = counter[d] - 1  # Lấy chỉ mục j cho d trong mảng
        res[j] = nums[i]  # Đặt phần tử hiện tại vào chỉ mục j
        counter[d] -= 1  # Giảm số đếm của d đi 1
    # Dùng res để ghi đè mảng gốc nums
    for i in range(n):
        nums[i] = res[i]


def radix_sort(nums: list[int]):
    """Sắp xếp cơ số"""
    # Lấy phần tử lớn nhất của mảng, dùng để xác định số chữ số tối đa
    m = max(nums)
    # Duyệt từ chữ số thấp nhất đến cao nhất
    exp = 1
    while exp &lt;= m:
        # Thực hiện sắp xếp đếm trên chữ số thứ k của các phần tử mảng
        # k = 1 -&gt; exp = 1
        # k = 2 -&gt; exp = 10
        # tức exp = 10^(k-1)
        counting_sort_digit(nums, exp)
        exp *= 10
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Lấy chữ số thứ k của phần tử num, với exp = 10^(k-1) */
int digit(int num, int exp) {
    // Truyền exp thay vì k để tránh phải tính lũy thừa nhiều lần (tốn kém)
    return (num / exp) % 10;
}

/* Sắp xếp đếm (dựa trên chữ số thứ k của nums) */
void countingSortDigit(vector&lt;int&gt; &amp;nums, int exp) {
    // Phạm vi chữ số thập phân là 0~9, do đó cần mảng bucket độ dài 10
    vector&lt;int&gt; counter(10, 0);
    int n = nums.size();
    // Đếm số lần xuất hiện của các chữ số 0~9
    for (int i = 0; i &lt; n; i++) {
        int d = digit(nums[i], exp); // Lấy chữ số thứ k của nums[i], ký hiệu là d
        counter[d]++;                // Đếm số lần xuất hiện của chữ số d
    }
    // Tính tổng tiền tố, chuyển "số lần xuất hiện" thành "chỉ mục mảng"
    for (int i = 1; i &lt; 10; i++) {
        counter[i] += counter[i - 1];
    }
    // Duyệt ngược, dựa vào thống kê bucket, đặt từng phần tử vào res
    vector&lt;int&gt; res(n, 0);
    for (int i = n - 1; i &gt;= 0; i--) {
        int d = digit(nums[i], exp);
        int j = counter[d] - 1; // Lấy chỉ mục j cho d trong mảng
        res[j] = nums[i];       // Đặt phần tử hiện tại vào chỉ mục j
        counter[d]--;           // Giảm số đếm của d đi 1
    }
    // Dùng res để ghi đè mảng gốc nums
    for (int i = 0; i &lt; n; i++)
        nums[i] = res[i];
}

/* Sắp xếp cơ số */
void radixSort(vector&lt;int&gt; &amp;nums) {
    // Lấy phần tử lớn nhất của mảng, dùng để xác định số chữ số tối đa
    int m = *max_element(nums.begin(), nums.end());
    // Duyệt từ chữ số thấp nhất đến cao nhất
    for (int exp = 1; exp &lt;= m; exp *= 10)
        // Thực hiện sắp xếp đếm trên chữ số thứ k của các phần tử mảng
        countingSortDigit(nums, exp);
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Lấy chữ số thứ k của phần tử num, với exp = 10^(k-1) */
static int digit(int num, int exp) {
    // Truyền exp thay vì k để tránh phải tính lũy thừa nhiều lần (tốn kém)
    return (num / exp) % 10;
}

/* Sắp xếp đếm (dựa trên chữ số thứ k của nums) */
static void countingSortDigit(int[] nums, int exp) {
    // Phạm vi chữ số thập phân là 0~9, do đó cần mảng bucket độ dài 10
    int[] counter = new int[10];
    int n = nums.length;
    // Đếm số lần xuất hiện của các chữ số 0~9
    for (int i = 0; i &lt; n; i++) {
        int d = digit(nums[i], exp); // Lấy chữ số thứ k của nums[i], ký hiệu là d
        counter[d]++;                // Đếm số lần xuất hiện của chữ số d
    }
    // Tính tổng tiền tố, chuyển "số lần xuất hiện" thành "chỉ mục mảng"
    for (int i = 1; i &lt; 10; i++) {
        counter[i] += counter[i - 1];
    }
    // Duyệt ngược, dựa vào thống kê bucket, đặt từng phần tử vào res
    int[] res = new int[n];
    for (int i = n - 1; i &gt;= 0; i--) {
        int d = digit(nums[i], exp);
        int j = counter[d] - 1; // Lấy chỉ mục j cho d trong mảng
        res[j] = nums[i];       // Đặt phần tử hiện tại vào chỉ mục j
        counter[d]--;           // Giảm số đếm của d đi 1
    }
    // Dùng res để ghi đè mảng gốc nums
    for (int i = 0; i &lt; n; i++)
        nums[i] = res[i];
}

/* Sắp xếp cơ số */
static void radixSort(int[] nums) {
    // Lấy phần tử lớn nhất của mảng, dùng để xác định số chữ số tối đa
    int m = Integer.MIN_VALUE;
    for (int num : nums)
        if (num &gt; m)
            m = num;
    // Duyệt từ chữ số thấp nhất đến cao nhất
    for (int exp = 1; exp &lt;= m; exp *= 10) {
        // Thực hiện sắp xếp đếm trên chữ số thứ k của các phần tử mảng
        countingSortDigit(nums, exp);
    }
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Lấy chữ số thứ k của phần tử num, với exp = 10^(k-1) */
function digit(num, exp) {
    // Truyền exp thay vì k để tránh phải tính lũy thừa nhiều lần (tốn kém)
    return Math.floor(num / exp) % 10;
}

/* Sắp xếp đếm (dựa trên chữ số thứ k của nums) */
function countingSortDigit(nums, exp) {
    // Phạm vi chữ số thập phân là 0~9, do đó cần mảng bucket độ dài 10
    const counter = new Array(10).fill(0);
    const n = nums.length;
    // Đếm số lần xuất hiện của các chữ số 0~9
    for (let i = 0; i &lt; n; i++) {
        const d = digit(nums[i], exp); // Lấy chữ số thứ k của nums[i], ký hiệu là d
        counter[d]++; // Đếm số lần xuất hiện của chữ số d
    }
    // Tính tổng tiền tố, chuyển "số lần xuất hiện" thành "chỉ mục mảng"
    for (let i = 1; i &lt; 10; i++) {
        counter[i] += counter[i - 1];
    }
    // Duyệt ngược, dựa vào thống kê bucket, đặt từng phần tử vào res
    const res = new Array(n).fill(0);
    for (let i = n - 1; i &gt;= 0; i--) {
        const d = digit(nums[i], exp);
        const j = counter[d] - 1; // Lấy chỉ mục j cho d trong mảng
        res[j] = nums[i]; // Đặt phần tử hiện tại vào chỉ mục j
        counter[d]--; // Giảm số đếm của d đi 1
    }
    // Dùng res để ghi đè mảng gốc nums
    for (let i = 0; i &lt; n; i++) {
        nums[i] = res[i];
    }
}

/* Sắp xếp cơ số */
function radixSort(nums) {
    // Lấy phần tử lớn nhất của mảng, dùng để xác định số chữ số tối đa
    let m = Math.max(...nums);
    // Duyệt từ chữ số thấp nhất đến cao nhất
    for (let exp = 1; exp &lt;= m; exp *= 10) {
        // Thực hiện sắp xếp đếm trên chữ số thứ k của các phần tử mảng
        countingSortDigit(nums, exp);
    }
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Lấy chữ số thứ k của phần tử num, với exp = 10^(k-1) */
fun digit(num: Int, exp: Int): Int {
    // Truyền exp thay vì k để tránh phải tính lũy thừa nhiều lần (tốn kém)
    return (num / exp) % 10
}

/* Sắp xếp đếm (dựa trên chữ số thứ k của nums) */
fun countingSortDigit(nums: IntArray, exp: Int) {
    // Phạm vi chữ số thập phân là 0~9, do đó cần mảng bucket độ dài 10
    val counter = IntArray(10)
    val n = nums.size
    // Đếm số lần xuất hiện của các chữ số 0~9
    for (i in 0..&lt;n) {
        val d = digit(nums[i], exp) // Lấy chữ số thứ k của nums[i], ký hiệu là d
        counter[d]++                // Đếm số lần xuất hiện của chữ số d
    }
    // Tính tổng tiền tố, chuyển "số lần xuất hiện" thành "chỉ mục mảng"
    for (i in 1..9) {
        counter[i] += counter[i - 1]
    }
    // Duyệt ngược, dựa vào thống kê bucket, đặt từng phần tử vào res
    val res = IntArray(n)
    for (i in n - 1 downTo 0) {
        val d = digit(nums[i], exp)
        val j = counter[d] - 1 // Lấy chỉ mục j cho d trong mảng
        res[j] = nums[i]       // Đặt phần tử hiện tại vào chỉ mục j
        counter[d]--           // Giảm số đếm của d đi 1
    }
    // Dùng res để ghi đè mảng gốc nums
    for (i in 0..&lt;n)
        nums[i] = res[i]
}

/* Sắp xếp cơ số */
fun radixSort(nums: IntArray) {
    // Lấy phần tử lớn nhất của mảng, dùng để xác định số chữ số tối đa
    var m = Int.MIN_VALUE
    for (num in nums) if (num &gt; m) m = num
    var exp = 1
    // Duyệt từ chữ số thấp nhất đến cao nhất
    while (exp &lt;= m) {
        // Thực hiện sắp xếp đếm trên chữ số thứ k của các phần tử mảng
        countingSortDigit(nums, exp)
        exp *= 10
    }
}
</code></pre></div></div></div>
<div class="callout callout-question">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Vì sao bắt đầu sắp xếp từ chữ số thấp nhất?</strong></p>
    <p>Trong các lượt sắp xếp liên tiếp, lượt sau ghi đè kết quả của lượt trước. Ví dụ, nếu lượt đầu tiên cho ra $a < b$ nhưng lượt thứ hai cho ra $a > b$, thì kết quả của lượt thứ hai sẽ chiếm ưu thế. Vì các chữ số bậc cao có mức ưu tiên cao hơn các chữ số bậc thấp, ta nên sắp xếp các chữ số thấp trước rồi mới đến các chữ số cao.</p>
  </div>
</div>

<h2>11.10.2 Đặc điểm Thuật toán</h2>
<p>So với sắp xếp đếm, sắp xếp cơ số phù hợp với phạm vi giá trị lớn hơn, <strong>nhưng chỉ khi dữ liệu có thể được biểu diễn bằng một số chữ số cố định và số chữ số đó không quá lớn</strong>. Ví dụ, số thực dấu phẩy động không phù hợp với sắp xếp cơ số vì số chữ số $k$ có thể quá lớn, có khả năng dẫn tới độ phức tạp thời gian $O(nk) \\gg O(n^2)$.</p>
<ul>
  <li><strong>Độ phức tạp thời gian là $O(nk)$, không thích ứng</strong>: Gọi số lượng phần tử là $n$, các giá trị được biểu diễn ở cơ số $d$, và số chữ số tối đa là $k$. Sắp xếp đếm trên một chữ số tốn thời gian $O(n + d)$, nên sắp xếp tất cả $k$ chữ số tốn thời gian $O((n + d)k)$. Trong thực tế, $d$ và $k$ thường tương đối nhỏ, nên độ phức tạp thời gian tổng thể tiến gần tới $O(n)$.</li>
  <li><strong>Độ phức tạp không gian là $O(n + d)$, không phải sắp xếp tại chỗ</strong>: Giống sắp xếp đếm, sắp xếp cơ số cần các mảng phụ trợ <code>res</code> và <code>counter</code> độ dài lần lượt $n$ và $d$.</li>
  <li><strong>Sắp xếp ổn định</strong>: Khi sắp xếp đếm ổn định, sắp xếp cơ số cũng ổn định; khi sắp xếp đếm không ổn định, sắp xếp cơ số không thể đảm bảo kết quả sắp xếp đúng.</li>
</ul>

<h2>11.10.3 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="radix-sort-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'radix-sort-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'radix-sort-wrapper', 'tab-interactive'); initSortDemo('radix-sort-wrapper', SORT_FRAMES_RADIXSORT)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem từng bước sắp xếp cơ số (theo chữ số hàng đơn vị → hàng trăm) trên mảng <code>[536, 110, 429, 348, 818, 89, 724, 305, 832, 638]</code> (dùng số 3 chữ số để dễ minh họa).</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="radix-sort-wrapper-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="radix-sort-wrapper-btn-autorun" class="control-btn" onclick="autoRunSortDemo('radix-sort-wrapper')">▶ Auto Run</button>
      <button id="radix-sort-wrapper-btn-step" class="control-btn btn-secondary" onclick="stepSortDemo('radix-sort-wrapper')">Bước tiếp theo ▶</button>
      <button id="radix-sort-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunSortDemo('radix-sort-wrapper')" disabled>⏸ Dừng</button>
      <button id="radix-sort-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initSortDemo('radix-sort-wrapper', SORT_FRAMES_RADIXSORT)">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setSortDemoSpeed('radix-sort-wrapper', this.value)" /> <span id="radix-sort-wrapper-speed-label">700ms</span>
    </div>
    <div id="radix-sort-wrapper-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu.</div>
  </div>
</div>
`,
    originalContent: `# Radix Sort

The previous section introduced counting sort, which is suitable when the number of items $n$ is large but the value range $m$ is small. Suppose we need to sort $n = 10^6$ student IDs, each of which is an 8-digit number. Then the value range $m = 10^8$ is very large. Using counting sort would require a large amount of memory, whereas radix sort avoids this problem.

<u>Radix sort</u> is based on the same core idea as counting sort: it also sorts by counting occurrences. Building on this, radix sort exploits the positional relationship among digits and sorts them one digit at a time to obtain the final result.

## Algorithm Flow

Taking student ID data as an example, assume the lowest digit is the $1$st digit and the highest digit is the $8$th digit. The flow of radix sort is shown in the figure below.

1. Initialize the digit $k = 1$.
2. Perform "counting sort" on the $k$th digit of the student IDs. After completion, the data will be sorted from smallest to largest according to the $k$th digit.
3. Increase $k$ by $1$, then return to step \`2.\` and continue iterating until all digits are sorted, at which point the process ends.

![Radix sort algorithm flow](radix_sort.assets/radix_sort_overview.png)

Next, let us look at the code. For a number $x$ in base $d$, its $k$th digit $x_k$ can be obtained with the following formula:

$$
x_k = \\lfloor\\frac{x}{d^{k-1}}\\rfloor \\bmod d
$$

Here, $\\lfloor a \\rfloor$ denotes rounding the floating-point number $a$ down, and $\\bmod \\: d$ denotes taking the remainder modulo $d$. For student ID data, $d = 10$ and $k \\in [1, 8]$.

Additionally, we need to slightly modify the counting sort code to make it sort based on the $k$th digit of the number:

\`\`\`src
[file]{radix_sort}-[class]{}-[func]{radix_sort}
\`\`\`

!!! question "Why start sorting from the lowest digit?"

    In successive sorting passes, a later pass overrides the result of an earlier one. For example, if the first pass yields $a < b$ but the second yields $a > b$, then the result of the second pass prevails. Because higher-order digits have higher priority than lower-order digits, we should sort the lower digits first and then the higher digits.

## Algorithm Characteristics

Compared with counting sort, radix sort is suitable for larger value ranges, **but only when the data can be represented with a fixed number of digits and that digit count is not too large**. For example, floating-point numbers are not well suited to radix sort because the digit count $k$ can be too large, potentially leading to time complexity $O(nk) \\gg O(n^2)$.

- **Time complexity of $O(nk)$, non-adaptive sorting**: Let the number of items be $n$, let the values be represented in base $d$, and let the maximum number of digits be $k$. Counting sort on one digit takes $O(n + d)$ time, so sorting all $k$ digits takes $O((n + d)k)$ time. In practice, $d$ and $k$ are usually relatively small, so the overall time complexity approaches $O(n)$.
- **Space complexity of $O(n + d)$, non-in-place sorting**: Same as counting sort, radix sort requires auxiliary arrays \`res\` and \`counter\` of lengths $n$ and $d$.
- **Stable sort**: When counting sort is stable, radix sort is also stable; when counting sort is unstable, radix sort cannot guarantee correct sorting results.
`
  },

  'dsa-sorting-summary': {
    title: '11.11 Tóm tắt & Hỏi đáp',
    summary: 'Tổng hợp lại 9 thuật toán sắp xếp đã học, so sánh hiệu suất/ổn định/tại chỗ/thích ứng, và giải đáp các câu hỏi thường gặp về tính ổn định, phân vùng lính canh, và trường hợp suy biến.',
    tags: ['dsa', 'sorting', 'summary'],
    domain: 'Algorithms',
    module: 'Chương 11: Sắp xếp',
    prerequisites: ['dsa-radix-sort'],
    related: [],
    updatedAt: '2026-07-19',
    readTime: '8 phút',
    content: `
<h2>Điểm lại kiến thức chính</h2>
<ul>
  <li>Sắp xếp nổi bọt đạt được việc sắp xếp bằng cách hoán đổi các phần tử liền kề. Bằng cách thêm một cờ để cho phép trả về sớm, ta có thể tối ưu độ phức tạp thời gian trường hợp tốt nhất của sắp xếp nổi bọt xuống $O(n)$.</li>
  <li>Ở mỗi vòng, sắp xếp chèn chèn một phần tử từ phần chưa sắp xếp vào đúng vị trí của nó trong phần đã sắp xếp. Mặc dù sắp xếp chèn có độ phức tạp thời gian $O(n^2)$, nó vẫn rất phổ biến cho các tác vụ sắp xếp nhỏ vì mỗi thao tác tương đối nhẹ.</li>
  <li>Sắp xếp nhanh dựa vào phân vùng lính canh. Trong phân vùng lính canh, việc liên tục chọn phải pivot tệ nhất có thể làm suy giảm độ phức tạp thời gian xuống $O(n^2)$. Chọn pivot dựa trên số trung vị hoặc pivot ngẫu nhiên có thể giảm xác suất suy biến này. Bằng cách đệ quy trên mảng con ngắn hơn trước, ta có thể giảm hiệu quả độ sâu đệ quy và tối ưu độ phức tạp không gian xuống $O(\\log n)$.</li>
  <li>Sắp xếp trộn gồm hai giai đoạn: chia và trộn, thường thể hiện chiến lược chia để trị. Trong sắp xếp trộn, sắp xếp một mảng cần tạo các mảng phụ trợ, với độ phức tạp không gian $O(n)$; tuy nhiên, độ phức tạp không gian khi sắp xếp danh sách liên kết có thể được tối ưu xuống $O(1)$.</li>
  <li>Sắp xếp xô gồm ba bước: phân phối dữ liệu vào bucket, sắp xếp trong bucket, và nối kết quả. Nó cũng thể hiện chiến lược chia để trị và phù hợp với khối lượng dữ liệu rất lớn. Chìa khóa của sắp xếp xô là phân phối dữ liệu đều.</li>
  <li>Sắp xếp đếm là một trường hợp đặc biệt của sắp xếp xô, đạt được việc sắp xếp bằng cách đếm số lần xuất hiện của dữ liệu. Sắp xếp đếm phù hợp với các trường hợp khối lượng dữ liệu lớn nhưng phạm vi dữ liệu hạn chế, và yêu cầu dữ liệu có thể chuyển đổi thành số nguyên dương.</li>
  <li>Sắp xếp cơ số đạt được việc sắp xếp dữ liệu bằng cách sắp xếp từng chữ số một, yêu cầu dữ liệu có thể được biểu diễn dưới dạng số có số chữ số cố định.</li>
  <li>Nhìn chung, ta hy vọng tìm được một thuật toán sắp xếp vừa hiệu quả, vừa ổn định, vừa tại chỗ, vừa thích ứng. Tuy nhiên, cũng như các cấu trúc dữ liệu và thuật toán khác, không thuật toán sắp xếp nào có thể thỏa mãn tất cả các tiêu chí này cùng lúc. Trong thực tế, ta cần chọn thuật toán sắp xếp phù hợp dựa trên đặc điểm của dữ liệu.</li>
  <li>Hình bên dưới so sánh các thuật toán sắp xếp phổ biến về hiệu suất, tính ổn định, tính tại chỗ, và khả năng thích ứng.</li>
</ul>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/sorting_algorithms_comparison.png" alt="So sánh các thuật toán sắp xếp" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>Hỏi & Đáp</h2>
<p><strong>Hỏi</strong>: Trong tình huống nào thì tính ổn định của thuật toán sắp xếp là cần thiết?</p>
<p>Trong thực tế, ta có thể sắp xếp dựa trên một thuộc tính nhất định của đối tượng. Ví dụ, sinh viên có hai thuộc tính: tên và chiều cao. Ta muốn thực hiện sắp xếp nhiều cấp: trước tiên sắp theo tên để có <code>(A, 180) (B, 185) (C, 170) (D, 170)</code>; sau đó sắp theo chiều cao. Vì thuật toán sắp xếp không ổn định, ta có thể nhận được <code>(D, 170) (C, 170) (A, 180) (B, 185)</code>.</p>
<p>Ta có thể thấy sinh viên D và C đã đổi chỗ cho nhau, phá vỡ thứ tự theo tên, điều này không phải điều ta mong muốn.</p>
<p><strong>Hỏi</strong>: Có thể hoán đổi thứ tự "tìm từ phải sang trái" và "tìm từ trái sang phải" trong phân vùng lính canh không?</p>
<p>Không thể. Khi ta dùng phần tử ngoài cùng bên trái làm pivot, ta phải "tìm từ phải sang trái" trước rồi mới "tìm từ trái sang phải". Kết luận này có phần phản trực giác; hãy cùng phân tích lý do.</p>
<p>Bước cuối cùng của phân vùng lính canh <code>partition()</code> là hoán đổi <code>nums[left]</code> và <code>nums[i]</code>. Sau khi hoán đổi hoàn tất, các phần tử bên trái pivot đều phải <code>&lt;=</code> pivot, <strong>điều này đòi hỏi <code>nums[left] &gt;= nums[i]</code> phải đúng trước lần hoán đổi cuối cùng</strong>. Giả sử ta tìm "từ trái sang phải" trước, thì nếu không tìm được phần tử lớn hơn pivot, <strong>ta sẽ thoát vòng lặp khi <code>i == j</code>, lúc đó có thể <code>nums[j] == nums[i] &gt; nums[left]</code></strong>. Nói cách khác, thao tác hoán đổi cuối cùng sẽ hoán đổi một phần tử lớn hơn pivot vào vị trí ngoài cùng bên trái của mảng, khiến phân vùng lính canh thất bại.</p>
<p>Ví dụ, cho mảng <code>[0, 0, 0, 0, 1]</code>, nếu ta tìm "từ trái sang phải" trước, mảng sau phân vùng lính canh sẽ là <code>[1, 0, 0, 0, 0]</code>, điều này không đúng.</p>
<p>Với cùng lý luận, nếu ta chọn <code>nums[right]</code> làm pivot, thứ tự sẽ bị đảo ngược: ta phải "tìm từ trái sang phải" trước.</p>
<p><strong>Hỏi</strong>: Về việc tối ưu độ sâu đệ quy trong sắp xếp nhanh, vì sao chọn mảng ngắn hơn có thể đảm bảo độ sâu đệ quy không vượt quá $\\log n$?</p>
<p>Độ sâu đệ quy là số lần gọi đệ quy chưa trả về. Mỗi vòng phân vùng lính canh chia mảng gốc thành hai mảng con. Sau khi tối ưu này, mảng con được chọn để tiếp tục đệ quy có độ dài tối đa bằng một nửa độ dài mảng gốc. Trong trường hợp xấu nhất, nếu luôn dài bằng một nửa, độ sâu đệ quy cuối cùng là $\\log n$.</p>
<p>Xem lại sắp xếp nhanh gốc, ta có thể liên tục đệ quy trên mảng dài hơn. Trong trường hợp xấu nhất, đó sẽ là $n$, $n - 1$, $\\dots$, $2$, $1$, với độ sâu đệ quy là $n$. Tối ưu độ sâu đệ quy có thể tránh được tình huống này.</p>
<p><strong>Hỏi</strong>: Khi tất cả các phần tử trong mảng bằng nhau, độ phức tạp thời gian của sắp xếp nhanh có phải là $O(n^2)$ không? Nên xử lý trường hợp suy biến này như thế nào?</p>
<p>Đúng vậy. Trong trường hợp này, mảng có thể được chia thành ba phần thông qua phân vùng lính canh: nhỏ hơn, bằng, và lớn hơn pivot. Sau đó ta chỉ đệ quy trên phần nhỏ hơn và phần lớn hơn. Với cách tiếp cận này, một mảng có tất cả phần tử bằng nhau có thể được sắp xếp chỉ trong một vòng phân vùng lính canh.</p>
<p><strong>Hỏi</strong>: Vì sao độ phức tạp thời gian trường hợp xấu nhất của sắp xếp xô là $O(n^2)$?</p>
<p>Trong trường hợp xấu nhất, tất cả các phần tử được phân phối vào cùng một bucket. Nếu ta dùng thuật toán $O(n^2)$ để sắp xếp các phần tử này, độ phức tạp thời gian sẽ là $O(n^2)$.</p>
`,
    originalContent: `# Summary

### Key Review

- Bubble sort achieves sorting by swapping adjacent elements. By adding a flag to enable early return, we can optimize the best-case time complexity of bubble sort to $O(n)$.
- In each round, insertion sort inserts an element from the unsorted portion into its correct position in the sorted portion. Although insertion sort has a time complexity of $O(n^2)$, it remains very popular for small sorting tasks because each operation is relatively lightweight.
- Quick sort relies on sentinel partitioning. In sentinel partitioning, repeatedly choosing the worst possible pivot can degrade the time complexity to $O(n^2)$. Choosing a median-based pivot or a random pivot can reduce the probability of this degradation. By recursing on the shorter subarray first, we can effectively reduce the recursion depth and optimize the space complexity to $O(\\log n)$.
- Merge sort includes two phases: divide and merge, which typically embody the divide-and-conquer strategy. In merge sort, sorting an array requires creating auxiliary arrays, with a space complexity of $O(n)$; however, the space complexity of sorting a linked list can be optimized to $O(1)$.
- Bucket sort consists of three steps: distributing data into buckets, sorting within buckets, and merging results. It also embodies the divide-and-conquer strategy and is suitable for very large data volumes. The key to bucket sort is distributing data evenly.
- Counting sort is a special case of bucket sort, which achieves sorting by counting the number of occurrences of data. Counting sort is suitable for situations where the data volume is large but the data range is limited, and requires that data can be converted to positive integers.
- Radix sort achieves data sorting by sorting digit by digit, requiring that data can be represented as fixed-digit numbers.
- Overall, we hope to find a sorting algorithm that is efficient, stable, in-place, and adaptive. However, as with other data structures and algorithms, no sorting algorithm can satisfy all of these criteria at the same time. In practice, we need to choose the appropriate sorting algorithm based on the characteristics of the data.
- The figure below compares mainstream sorting algorithms in terms of efficiency, stability, in-place property, and adaptability.

![Sorting algorithm comparison](summary.assets/sorting_algorithms_comparison.png)

### Q & A

**Q**: In what situations is the stability of sorting algorithms necessary?

In reality, we may sort based on a certain attribute of objects. For example, students have two attributes: name and height. We want to implement multi-level sorting: first sort by name to get \`(A, 180) (B, 185) (C, 170) (D, 170)\`; then sort by height. Because the sorting algorithm is unstable, we may get \`(D, 170) (C, 170) (A, 180) (B, 185)\`.

We can see that students D and C have swapped positions, destroying the ordering by name, which is not what we want.

**Q**: Can the order of "searching from right to left" and "searching from left to right" in sentinel partitioning be swapped?

No. When we use the leftmost element as the pivot, we must first "search from right to left" and then "search from left to right". This conclusion is somewhat counterintuitive; let's analyze the reason.

The last step of sentinel partitioning \`partition()\` is to swap \`nums[left]\` and \`nums[i]\`. After the swap is complete, the elements to the left of the pivot are all \`<=\` the pivot, **which requires that \`nums[left] >= nums[i]\` must hold before the last swap**. Suppose we first "search from left to right", then if we cannot find an element larger than the pivot, **we will exit the loop when \`i == j\`, at which point it may be that \`nums[j] == nums[i] > nums[left]\`**. In other words, the last swap operation will swap an element larger than the pivot to the leftmost end of the array, causing sentinel partitioning to fail.

For example, given the array \`[0, 0, 0, 0, 1]\`, if we first "search from left to right", the array after sentinel partitioning is \`[1, 0, 0, 0, 0]\`, which is incorrect.

By the same reasoning, if we select \`nums[right]\` as the pivot, the order is reversed: we must first "search from left to right".

**Q**: Regarding the optimization of recursion depth in quick sort, why can selecting the shorter array ensure that the recursion depth does not exceed $\\log n$?

Recursion depth is the number of recursive calls that have not yet returned. Each round of sentinel partitioning divides the original array into two sub-arrays. After this optimization, the sub-array selected for further recursion is at most half the length of the original array. In the worst case, if it is always half as long, the final recursion depth is $\\log n$.

Reviewing the original quick sort, we may continuously recurse on the longer array. In the worst case, it would be $n$, $n - 1$, $\\dots$, $2$, $1$, with a recursion depth of $n$. Recursion depth optimization can avoid this situation.

**Q**: When all elements in the array are equal, is the time complexity of quick sort $O(n^2)$? How should this degenerate case be handled?

Yes. In this case, the array can be partitioned into three parts through sentinel partitioning: less than, equal to, and greater than the pivot. We then recurse only on the less-than and greater-than parts. With this approach, an array whose elements are all equal can be sorted in just one round of sentinel partitioning.

**Q**: Why is the worst-case time complexity of bucket sort $O(n^2)$?

In the worst case, all elements are distributed into the same bucket. If we use an $O(n^2)$ algorithm to sort these elements, the time complexity will be $O(n^2)$.
`
  }

});
