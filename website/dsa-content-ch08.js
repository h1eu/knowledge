/* ============================================================
   Knowledge OS — DSA Module: Chương 8 - Heap (Đống)
   ============================================================ */

Object.assign(DSA_CONTENT, {

  'dsa-heap-index': {
    title: 'Heap',
    summary: 'Giới thiệu về cấu trúc dữ liệu Heap (Đống), một dạng đặc biệt của Cây nhị phân hoàn chỉnh thường dùng để triển khai Hàng đợi ưu tiên (Priority Queue).',
    tags: ['dsa', 'heap', 'priority-queue'],
    domain: 'Algorithms',
    module: 'Chương 8: Heap',
    prerequisites: ['dsa-tree-summary'],
    related: ['dsa-heap'],
    updatedAt: '2026-07-19',
    readTime: '1 phút',
    content: `
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/chapter_heap.jpg" alt="Heap" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<div class="callout callout-note">
  <span class="callout-icon">✨</span>
  <div class="callout-body">
    <p>Heap giống như những đỉnh núi, nhấp nhô lớp này qua lớp khác, mỗi ngọn một hình dáng riêng biệt.</p>
    <p>Các đỉnh núi cao thấp khác nhau, nhưng đỉnh cao nhất luôn là thứ thu hút ánh nhìn đầu tiên.</p>
  </div>
</div>
`,
    originalContent: `
# Heap

![Heap](../assets/covers/chapter_heap.jpg)

!!! abstract

    Heaps are like mountain peaks, rising layer upon layer, each with a distinct shape.

    The peaks rise and fall at varying heights, yet the tallest peak always catches the eye first.

`
  },

  'dsa-heap': {
    title: '8.1 Cấu trúc dữ liệu Heap',
    summary: 'Tìm hiểu về Heap (Max Heap, Min Heap), mối liên hệ giữa Heap và Hàng đợi ưu tiên (Priority Queue), cách lưu trữ Heap bằng mảng và các thao tác thêm/xóa phần tử.',
    tags: ['dsa', 'heap', 'min-heap', 'max-heap'],
    domain: 'Algorithms',
    module: 'Chương 8: Heap',
    prerequisites: ['dsa-heap-index'],
    related: ['dsa-build-heap'],
    updatedAt: '2026-07-19',
    readTime: '18 phút',
    content: `
<p><strong>Heap (Đống)</strong> là một cây nhị phân hoàn chỉnh thỏa mãn những điều kiện cụ thể, và chủ yếu được chia thành hai loại như trong hình dưới đây.</p>
<ul>
  <li><strong>Min Heap (Đống nhỏ nhất)</strong>: Giá trị của bất kỳ nút nào cũng $\\leq$ giá trị của các nút con của nó.</li>
  <li><strong>Max Heap (Đống lớn nhất)</strong>: Giá trị của bất kỳ nút nào cũng $\\geq$ giá trị của các nút con của nó.</li>
</ul>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/min_heap_and_max_heap.png" alt="Min Heap và Max Heap" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Vì là một trường hợp đặc biệt của cây nhị phân hoàn chỉnh, Heap có các đặc điểm sau.</p>
<ul>
  <li>Các nút ở tầng dưới cùng được điền từ trái sang phải, các tầng còn lại đều được điền đầy đủ.</li>
  <li>Ta gọi nút gốc của cây nhị phân là "đỉnh đống (heap top)", còn nút tận cùng bên phải ở tầng dưới cùng gọi là "đáy đống (heap bottom)".</li>
  <li>Đối với Max Heap (Min Heap), giá trị của phần tử đỉnh đống (nút gốc) luôn là phần tử lớn nhất (nhỏ nhất).</li>
</ul>

<h2>8.1.1 Các thao tác Heap phổ biến</h2>
<p>Cần lưu ý rằng nhiều ngôn ngữ lập trình cung cấp sẵn <strong>hàng đợi ưu tiên (priority queue)</strong>, một cấu trúc dữ liệu trừu tượng được định nghĩa là một hàng đợi mà các phần tử của nó được sắp xếp theo mức độ ưu tiên.</p>
<p>Trên thực tế, <strong>Heap thường được dùng để triển khai Priority Queue, trong đó Max Heap tương ứng với Priority Queue mà các phần tử được lấy ra theo thứ tự giảm dần</strong>. Dưới góc độ sử dụng, ta có thể coi "hàng đợi ưu tiên" và "heap" là những cấu trúc dữ liệu tương đương. Do đó, cuốn sách này không phân biệt đặc biệt giữa hai khái niệm và gọi chung chúng là "heap".</p>
<p>Các thao tác heap phổ biến được trình bày trong bảng dưới đây, tên phương thức cụ thể cần xác định tùy theo ngôn ngữ lập trình.</p>
<p align="center">Bảng &nbsp; Hiệu suất của các thao tác trên Heap</p>
<table style="width:100%; border-collapse:collapse; margin:1.5em 0; border: 1px solid var(--border-color);">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px; font-weight:600;">Tên phương thức</th>
      <th style="padding:10px; font-weight:600;">Mô tả</th>
      <th style="padding:10px; font-weight:600;">Độ phức tạp thời gian</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><code>push()</code></td><td style="padding:10px;">Thêm một phần tử vào heap</td><td style="padding:10px;">$O(\\log n)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><code>pop()</code></td><td style="padding:10px;">Xóa phần tử ở đỉnh heap</td><td style="padding:10px;">$O(\\log n)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><code>peek()</code></td><td style="padding:10px;">Truy cập phần tử ở đỉnh heap (giá trị lớn/nhỏ nhất của Max/Min Heap)</td><td style="padding:10px;">$O(1)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><code>size()</code></td><td style="padding:10px;">Lấy số lượng phần tử trong heap</td><td style="padding:10px;">$O(1)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><code>isEmpty()</code></td><td style="padding:10px;">Kiểm tra heap có rỗng hay không</td><td style="padding:10px;">$O(1)$</td></tr>
  </tbody>
</table>
<p>Trong các ứng dụng thực tế, ta có thể trực tiếp sử dụng lớp heap (hoặc lớp priority queue) mà ngôn ngữ lập trình cung cấp sẵn.</p>
<p>Tương tự như khái niệm "tăng dần" và "giảm dần" trong các thuật toán sắp xếp, ta có thể triển khai việc chuyển đổi giữa "Min Heap" và "Max Heap" bằng cách thiết lập một cờ (<code>flag</code>) hoặc sửa đổi <code>Comparator</code>. Đoạn mã như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>import heapq

# Khởi tạo Min Heap
min_heap, flag = [], 1
# Khởi tạo Max Heap
max_heap, flag = [], -1

# Module heapq của Python mặc định triển khai Min Heap
# Ta có thể nhân phần tử với -1 trước khi đưa vào heap, điều này đảo ngược quan hệ lớn/nhỏ, từ đó triển khai được Max Heap
# Trong ví dụ này, flag = 1 tương ứng Min Heap, flag = -1 tương ứng Max Heap

# Đẩy phần tử vào heap
heapq.heappush(max_heap, flag * 1)
heapq.heappush(max_heap, flag * 3)
heapq.heappush(max_heap, flag * 2)
heapq.heappush(max_heap, flag * 5)
heapq.heappush(max_heap, flag * 4)

# Lấy đỉnh heap
peek: int = flag * max_heap[0]  # 5

# Xóa đỉnh heap
# Các phần tử bị xóa sẽ tạo thành một dãy giảm dần
val = flag * heapq.heappop(max_heap)  # 5
val = flag * heapq.heappop(max_heap)  # 4
val = flag * heapq.heappop(max_heap)  # 3
val = flag * heapq.heappop(max_heap)  # 2
val = flag * heapq.heappop(max_heap)  # 1

# Lấy kích thước heap
size: int = len(max_heap)

# Kiểm tra heap rỗng
is_empty: bool = not max_heap

# Xây dựng heap từ một danh sách có sẵn
min_heap: list[int] = [1, 3, 2, 5, 4]
heapq.heapify(min_heap)
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Khởi tạo heap */
// Khởi tạo Min Heap
priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; minHeap;
// Khởi tạo Max Heap
priority_queue&lt;int, vector&lt;int&gt;, less&lt;int&gt;&gt; maxHeap;

/* Đẩy phần tử vào heap */
maxHeap.push(1);
maxHeap.push(3);
maxHeap.push(2);
maxHeap.push(5);
maxHeap.push(4);

/* Lấy đỉnh heap */
int peek = maxHeap.top(); // 5

/* Xóa đỉnh heap */
// Các phần tử bị xóa sẽ tạo thành một dãy giảm dần
maxHeap.pop(); // 5
maxHeap.pop(); // 4
maxHeap.pop(); // 3
maxHeap.pop(); // 2
maxHeap.pop(); // 1

/* Lấy kích thước heap */
int size = maxHeap.size();

/* Kiểm tra heap rỗng */
bool isEmpty = maxHeap.empty();

/* Xây dựng heap từ một danh sách có sẵn */
vector&lt;int&gt; input{1, 3, 2, 5, 4};
priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; minHeap(input.begin(), input.end());
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Khởi tạo heap */
// Khởi tạo Min Heap
Queue&lt;Integer&gt; minHeap = new PriorityQueue&lt;&gt;();
// Khởi tạo Max Heap (dùng lambda expression để sửa Comparator)
Queue&lt;Integer&gt; maxHeap = new PriorityQueue&lt;&gt;((a, b) -&gt; b - a);

/* Đẩy phần tử vào heap */
maxHeap.offer(1);
maxHeap.offer(3);
maxHeap.offer(2);
maxHeap.offer(5);
maxHeap.offer(4);

/* Lấy đỉnh heap */
int peek = maxHeap.peek(); // 5

/* Xóa đỉnh heap */
// Các phần tử bị xóa sẽ tạo thành một dãy giảm dần
peek = maxHeap.poll(); // 5
peek = maxHeap.poll(); // 4
peek = maxHeap.poll(); // 3
peek = maxHeap.poll(); // 2
peek = maxHeap.poll(); // 1

/* Lấy kích thước heap */
int size = maxHeap.size();

/* Kiểm tra heap rỗng */
boolean isEmpty = maxHeap.isEmpty();

/* Xây dựng heap từ một danh sách có sẵn */
minHeap = new PriorityQueue&lt;&gt;(Arrays.asList(1, 3, 2, 5, 4));
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>// JavaScript không cung cấp sẵn class Heap
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Khởi tạo heap */
// Khởi tạo Min Heap
var minHeap = PriorityQueue&lt;Int&gt;()
// Khởi tạo Max Heap (dùng lambda expression để sửa Comparator)
val maxHeap = PriorityQueue { a: Int, b: Int -&gt; b - a }

/* Đẩy phần tử vào heap */
maxHeap.offer(1)
maxHeap.offer(3)
maxHeap.offer(2)
maxHeap.offer(5)
maxHeap.offer(4)

/* Lấy đỉnh heap */
var peek = maxHeap.peek() // 5

/* Xóa đỉnh heap */
// Các phần tử bị xóa sẽ tạo thành một dãy giảm dần
peek = maxHeap.poll() // 5
peek = maxHeap.poll() // 4
peek = maxHeap.poll() // 3
peek = maxHeap.poll() // 2
peek = maxHeap.poll() // 1

/* Lấy kích thước heap */
val size = maxHeap.size

/* Kiểm tra heap rỗng */
val isEmpty = maxHeap.isEmpty()

/* Xây dựng heap từ một danh sách có sẵn */
minHeap = PriorityQueue(mutableListOf(1, 3, 2, 5, 4))
</code></pre></div></div></div>

<h2>8.1.2 Triển khai Heap</h2>
<p>Đoạn triển khai dưới đây là dành cho Max Heap. Muốn chuyển thành Min Heap, chỉ cần đảo ngược toàn bộ logic so sánh liên quan đến thứ tự (ví dụ: thay $\\geq$ bằng $\\leq$). Bạn đọc quan tâm có thể tự mình thử triển khai.</p>

<h3>8.1.2.1 Lưu trữ và biểu diễn Heap</h3>
<p>Như đã đề cập trong chương "Cây nhị phân", cây nhị phân hoàn chỉnh rất phù hợp để biểu diễn bằng mảng. Vì Heap là một dạng cây nhị phân hoàn chỉnh, <strong>ta sẽ dùng mảng để lưu trữ Heap</strong>.</p>
<p>Khi biểu diễn cây nhị phân bằng mảng, các phần tử đại diện cho giá trị nút, còn chỉ số đại diện cho vị trí của nút trong cây nhị phân. <strong>Quan hệ cha - con được biểu diễn thông qua công thức ánh xạ chỉ số</strong>.</p>
<p>Như hình minh họa dưới đây, cho một chỉ số $i$, chỉ số của nút con trái là $2i + 1$, chỉ số của nút con phải là $2i + 2$, và chỉ số của nút cha là $(i - 1) / 2$ (chia lấy phần nguyên, làm tròn xuống). Khi chỉ số vượt quá giới hạn, điều đó cho biết đây là một nút rỗng hoặc nút không tồn tại.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/representation_of_heap.png" alt="Biểu diễn và lưu trữ Heap" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Ta có thể đóng gói công thức ánh xạ chỉ số thành các hàm để tiện sử dụng về sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def left(self, i: int) -&gt; int:
    """Lấy chỉ số của nút con trái"""
    return 2 * i + 1

def right(self, i: int) -&gt; int:
    """Lấy chỉ số của nút con phải"""
    return 2 * i + 2

def parent(self, i: int) -&gt; int:
    """Lấy chỉ số của nút cha"""
    return (i - 1) // 2  # Chia lấy phần nguyên (làm tròn xuống)
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Lấy chỉ số của nút con trái */
int left(int i) {
    return 2 * i + 1;
}

/* Lấy chỉ số của nút con phải */
int right(int i) {
    return 2 * i + 2;
}

/* Lấy chỉ số của nút cha */
int parent(int i) {
    return (i - 1) / 2; // Chia lấy phần nguyên (làm tròn xuống)
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Lấy chỉ số của nút con trái */
private int left(int i) {
    return 2 * i + 1;
}

/* Lấy chỉ số của nút con phải */
private int right(int i) {
    return 2 * i + 2;
}

/* Lấy chỉ số của nút cha */
private int parent(int i) {
    return (i - 1) / 2; // Chia lấy phần nguyên (làm tròn xuống)
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Lấy chỉ số của nút con trái */
#left(i) {
    return 2 * i + 1;
}

/* Lấy chỉ số của nút con phải */
#right(i) {
    return 2 * i + 2;
}

/* Lấy chỉ số của nút cha */
#parent(i) {
    return Math.floor((i - 1) / 2); // Chia lấy phần nguyên (làm tròn xuống)
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Lấy chỉ số của nút con trái */
private fun left(i: Int): Int {
    return 2 * i + 1
}

/* Lấy chỉ số của nút con phải */
private fun right(i: Int): Int {
    return 2 * i + 2
}

/* Lấy chỉ số của nút cha */
private fun parent(i: Int): Int {
    return (i - 1) / 2 // Chia lấy phần nguyên (làm tròn xuống)
}
</code></pre></div></div></div>

<h3>8.1.2.2 Truy cập đỉnh Heap</h3>
<p>Đỉnh đống chính là nút gốc của cây nhị phân, cũng đồng thời là phần tử đầu tiên của danh sách:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def peek(self) -&gt; int:
    """Truy cập đỉnh heap"""
    return self.max_heap[0]
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Truy cập đỉnh heap */
int peek() {
    return maxHeap[0];
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Truy cập đỉnh heap */
public int peek() {
    return maxHeap.get(0);
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Truy cập đỉnh heap */
peek() {
    return this.#maxHeap[0];
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Truy cập đỉnh heap */
fun peek(): Int {
    return maxHeap[0]
}
</code></pre></div></div></div>

<h3>8.1.2.3 Chèn phần tử vào Heap</h3>
<p>Cho một phần tử <code>val</code>, trước tiên ta thêm nó vào đáy heap. Sau khi chèn, vì <code>val</code> có thể lớn hơn các phần tử khác trong heap, tính chất heap có thể bị phá vỡ. <strong>Do đó, ta cần khôi phục tính chất heap dọc theo đường đi từ nút vừa chèn đến nút gốc</strong>. Thao tác này gọi là "heapify".</p>
<p>Bắt đầu từ nút vừa chèn, ta <strong>thực hiện heapify từ dưới lên trên</strong>. Như hình minh họa dưới đây, ta so sánh nút vừa chèn với nút cha của nó, nếu nút vừa chèn lớn hơn thì hoán đổi chúng. Ta lặp lại quá trình này từ dưới lên trên cho đến khi vượt qua nút gốc hoặc gặp một nút không cần hoán đổi nữa.</p>
<div class="interactive-widget-wrapper" id="heap-push-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img src="dsa-assets/heap_push_step1.png" alt="heap_push_step1" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 1</p></div>
    <div class="slide"><img src="dsa-assets/heap_push_step2.png" alt="heap_push_step2" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 2</p></div>
    <div class="slide"><img src="dsa-assets/heap_push_step3.png" alt="heap_push_step3" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 3</p></div>
    <div class="slide"><img src="dsa-assets/heap_push_step4.png" alt="heap_push_step4" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 4</p></div>
    <div class="slide"><img src="dsa-assets/heap_push_step5.png" alt="heap_push_step5" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 5</p></div>
    <div class="slide"><img src="dsa-assets/heap_push_step6.png" alt="heap_push_step6" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 6</p></div>
    <div class="slide"><img src="dsa-assets/heap_push_step7.png" alt="heap_push_step7" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 7</p></div>
    <div class="slide"><img src="dsa-assets/heap_push_step8.png" alt="heap_push_step8" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 8</p></div>
    <div class="slide"><img src="dsa-assets/heap_push_step9.png" alt="heap_push_step9" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 9</p></div>
    <div class="slider-controls">
      <button class="control-btn" onclick="prevSlide('heap-push-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 9</span>
      <button class="control-btn" onclick="nextSlide('heap-push-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Với tổng cộng $n$ nút, chiều cao cây là $O(\\log n)$. Do đó, số lần lặp tối đa của thao tác heapify là $O(\\log n)$, <strong>làm cho độ phức tạp thời gian của thao tác chèn phần tử là $O(\\log n)$</strong>. Đoạn mã như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def sift_up(self, i: int):
    """Bắt đầu từ nút i, heapify từ dưới lên trên"""
    while True:
        # Lấy nút cha của nút i
        p = self.parent(i)
        # Khi "vượt qua nút gốc" hoặc "nút không cần sửa chữa nữa" thì kết thúc heapify
        if p &lt; 0 or self.max_heap[i] &lt;= self.max_heap[p]:
            break
        # Hoán đổi hai nút
        self.swap(i, p)
        # Vòng lặp heapify hướng lên trên
        i = p
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Bắt đầu từ nút i, heapify từ dưới lên trên */
void siftUp(int i) {
    while (true) {
        // Lấy nút cha của nút i
        int p = parent(i);
        // Khi "vượt qua nút gốc" hoặc "nút không cần sửa chữa nữa" thì kết thúc heapify
        if (p &lt; 0 || maxHeap[i] &lt;= maxHeap[p])
            break;
        // Hoán đổi hai nút
        swap(maxHeap[i], maxHeap[p]);
        // Vòng lặp heapify hướng lên trên
        i = p;
    }
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Bắt đầu từ nút i, heapify từ dưới lên trên */
private void siftUp(int i) {
    while (true) {
        // Lấy nút cha của nút i
        int p = parent(i);
        // Khi "vượt qua nút gốc" hoặc "nút không cần sửa chữa nữa" thì kết thúc heapify
        if (p &lt; 0 || maxHeap.get(i) &lt;= maxHeap.get(p))
            break;
        // Hoán đổi hai nút
        swap(i, p);
        // Vòng lặp heapify hướng lên trên
        i = p;
    }
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Bắt đầu từ nút i, heapify từ dưới lên trên */
#siftUp(i) {
    while (true) {
        // Lấy nút cha của nút i
        const p = this.#parent(i);
        // Khi "vượt qua nút gốc" hoặc "nút không cần sửa chữa nữa" thì kết thúc heapify
        if (p &lt; 0 || this.#maxHeap[i] &lt;= this.#maxHeap[p]) break;
        // Hoán đổi hai nút
        this.#swap(i, p);
        // Vòng lặp heapify hướng lên trên
        i = p;
    }
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Bắt đầu từ nút i, heapify từ dưới lên trên */
private fun siftUp(it: Int) {
    var i = it
    while (true) {
        // Lấy nút cha của nút i
        val p = parent(i)
        // Khi "vượt qua nút gốc" hoặc "nút không cần sửa chữa nữa" thì kết thúc heapify
        if (p &lt; 0 || maxHeap[i] &lt;= maxHeap[p]) break
        // Hoán đổi hai nút
        swap(i, p)
        // Vòng lặp heapify hướng lên trên
        i = p
    }
}
</code></pre></div></div></div>

<h3>8.1.2.4 Xóa đỉnh Heap</h3>
<p>Đỉnh đống chính là nút gốc của cây nhị phân, cũng là phần tử đầu tiên của danh sách. Nếu ta xóa trực tiếp phần tử đầu tiên khỏi danh sách, chỉ số của tất cả các nút trong cây nhị phân sẽ thay đổi, khiến việc khôi phục bằng heapify sau đó trở nên khó khăn. Để giảm thiểu sự thay đổi chỉ số của các phần tử, ta thực hiện theo các bước sau.</p>
<ol>
  <li>Hoán đổi phần tử ở đỉnh đống với phần tử ở đáy đống (hoán đổi nút gốc với nút lá tận cùng bên phải).</li>
  <li>Sau khi hoán đổi, xóa đáy đống khỏi danh sách (lưu ý rằng do đã hoán đổi, ta thực chất đang xóa phần tử vốn là đỉnh đống ban đầu).</li>
  <li>Bắt đầu từ nút gốc, <strong>thực hiện heapify từ trên xuống dưới</strong>.</li>
</ol>
<p>Như hình minh họa dưới đây, <strong>hướng của "heapify từ trên xuống dưới" ngược lại với "heapify từ dưới lên trên"</strong>. Ta so sánh giá trị của nút gốc với hai nút con của nó, rồi hoán đổi với nút con lớn nhất. Sau đó lặp lại thao tác này cho đến khi vượt qua một nút lá hoặc gặp một nút không cần hoán đổi nữa.</p>
<div class="interactive-widget-wrapper" id="heap-pop-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img src="dsa-assets/heap_pop_step1.png" alt="heap_pop_step1" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 1</p></div>
    <div class="slide"><img src="dsa-assets/heap_pop_step2.png" alt="heap_pop_step2" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 2</p></div>
    <div class="slide"><img src="dsa-assets/heap_pop_step3.png" alt="heap_pop_step3" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 3</p></div>
    <div class="slide"><img src="dsa-assets/heap_pop_step4.png" alt="heap_pop_step4" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 4</p></div>
    <div class="slide"><img src="dsa-assets/heap_pop_step5.png" alt="heap_pop_step5" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 5</p></div>
    <div class="slide"><img src="dsa-assets/heap_pop_step6.png" alt="heap_pop_step6" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 6</p></div>
    <div class="slide"><img src="dsa-assets/heap_pop_step7.png" alt="heap_pop_step7" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 7</p></div>
    <div class="slide"><img src="dsa-assets/heap_pop_step8.png" alt="heap_pop_step8" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 8</p></div>
    <div class="slide"><img src="dsa-assets/heap_pop_step9.png" alt="heap_pop_step9" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 9</p></div>
    <div class="slide"><img src="dsa-assets/heap_pop_step10.png" alt="heap_pop_step10" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 10</p></div>
    <div class="slider-controls">
      <button class="control-btn" onclick="prevSlide('heap-pop-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 10</span>
      <button class="control-btn" onclick="nextSlide('heap-pop-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Tương tự thao tác chèn phần tử, độ phức tạp thời gian của thao tác xóa đỉnh heap cũng là $O(\\log n)$. Đoạn mã như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def sift_down(self, i: int):
    """Bắt đầu từ nút i, heapify từ trên xuống dưới"""
    while True:
        # Tìm nút có giá trị lớn nhất trong số i, l, r, gọi là ma
        l, r, ma = self.left(i), self.right(i), i
        if l &lt; self.size() and self.max_heap[l] &gt; self.max_heap[ma]:
            ma = l
        if r &lt; self.size() and self.max_heap[r] &gt; self.max_heap[ma]:
            ma = r
        # Nếu nút i là lớn nhất hoặc chỉ số l, r vượt biên, không cần heapify tiếp, thoát
        if ma == i:
            break
        # Hoán đổi hai nút
        self.swap(i, ma)
        # Vòng lặp heapify hướng xuống dưới
        i = ma
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Bắt đầu từ nút i, heapify từ trên xuống dưới */
void siftDown(int i) {
    while (true) {
        // Nếu nút i là lớn nhất hoặc chỉ số l, r vượt biên, không cần heapify tiếp, thoát
        int l = left(i), r = right(i), ma = i;
        if (l &lt; size() &amp;&amp; maxHeap[l] &gt; maxHeap[ma])
            ma = l;
        if (r &lt; size() &amp;&amp; maxHeap[r] &gt; maxHeap[ma])
            ma = r;
        // Hoán đổi hai nút
        if (ma == i)
            break;
        swap(maxHeap[i], maxHeap[ma]);
        // Vòng lặp heapify hướng xuống dưới
        i = ma;
    }
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Bắt đầu từ nút i, heapify từ trên xuống dưới */
private void siftDown(int i) {
    while (true) {
        // Nếu nút i là lớn nhất hoặc chỉ số l, r vượt biên, không cần heapify tiếp, thoát
        int l = left(i), r = right(i), ma = i;
        if (l &lt; size() &amp;&amp; maxHeap.get(l) &gt; maxHeap.get(ma))
            ma = l;
        if (r &lt; size() &amp;&amp; maxHeap.get(r) &gt; maxHeap.get(ma))
            ma = r;
        // Hoán đổi hai nút
        if (ma == i)
            break;
        // Hoán đổi hai nút
        swap(i, ma);
        // Vòng lặp heapify hướng xuống dưới
        i = ma;
    }
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Bắt đầu từ nút i, heapify từ trên xuống dưới */
#siftDown(i) {
    while (true) {
        // Nếu nút i là lớn nhất hoặc chỉ số l, r vượt biên, không cần heapify tiếp, thoát
        const l = this.#left(i),
            r = this.#right(i);
        let ma = i;
        if (l &lt; this.size() &amp;&amp; this.#maxHeap[l] &gt; this.#maxHeap[ma]) ma = l;
        if (r &lt; this.size() &amp;&amp; this.#maxHeap[r] &gt; this.#maxHeap[ma]) ma = r;
        // Hoán đổi hai nút
        if (ma === i) break;
        // Hoán đổi hai nút
        this.#swap(i, ma);
        // Vòng lặp heapify hướng xuống dưới
        i = ma;
    }
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Bắt đầu từ nút i, heapify từ trên xuống dưới */
private fun siftDown(it: Int) {
    var i = it
    while (true) {
        // Nếu nút i là lớn nhất hoặc chỉ số l, r vượt biên, không cần heapify tiếp, thoát
        val l = left(i)
        val r = right(i)
        var ma = i
        if (l &lt; size() &amp;&amp; maxHeap[l] &gt; maxHeap[ma]) ma = l
        if (r &lt; size() &amp;&amp; maxHeap[r] &gt; maxHeap[ma]) ma = r
        // Hoán đổi hai nút
        if (ma == i) break
        // Hoán đổi hai nút
        swap(i, ma)
        // Vòng lặp heapify hướng xuống dưới
        i = ma
    }
}
</code></pre></div></div></div>

<div class="interactive-widget-wrapper" id="heap-ops-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'heap-ops-wrapper', 'tab-static')">📸 Tóm tắt</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'heap-ops-wrapper', 'tab-interactive'); initHeapOpsDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="text-align:center; color:var(--text-secondary); font-size:14px;">Xem tab "Mô phỏng tương tác" để theo dõi toàn bộ quá trình push(1, 3, 2, 5, 4) rồi pop() trên một Max Heap, hiển thị đồng thời dạng cây và dạng mảng.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="heap-ops-tree" style="min-height:190px;"></div>
    <div id="heap-ops-array" style="display:flex; gap:6px; justify-content:center; flex-wrap:wrap; margin:12px 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:10px; justify-content:center; margin:12px 0; flex-wrap:wrap;">
      <button id="heap-ops-btn-autorun" class="control-btn" onclick="autoRunHeapOps()">▶ Auto Run</button>
      <button id="heap-ops-btn-step" class="control-btn" onclick="stepHeapOps()">Bước tiếp theo ▶</button>
      <button id="heap-ops-btn-pause" class="control-btn btn-secondary" onclick="pauseRunHeapOps()" disabled>⏸ Dừng</button>
      <button id="heap-ops-btn-reset" class="control-btn btn-secondary" onclick="initHeapOpsDemo()">↺ Reset</button>
    </div>
    <div id="heap-ops-speed-control" style="text-align:center; margin-bottom:10px;">
      Tốc độ: <input type="range" min="200" max="2000" value="800" step="200" oninput="setHeapOpsSpeed(this.value)" /> <span id="heap-ops-speed-label">800ms</span>
    </div>
    <div id="heap-ops-status" class="simulator-status" style="text-align:center; min-height:24px;">
      Nhấp "Auto Run" hoặc "Bước tiếp theo" để mô phỏng push(1), push(3), push(2), push(5), push(4) rồi pop() trên Max Heap.
    </div>
  </div>
</div>

<h2>8.1.3 Ứng dụng phổ biến của Heap</h2>
<ul>
  <li><strong>Hàng đợi ưu tiên (Priority Queue)</strong>: Heap thường là cấu trúc dữ liệu được ưu tiên lựa chọn để triển khai Priority Queue. Độ phức tạp thời gian của cả thao tác thêm vào lẫn lấy ra đều là $O(\\log n)$, còn thao tác xây dựng heap có độ phức tạp $O(n)$, khiến các thao tác này trở nên rất hiệu quả.</li>
  <li><strong>Heap Sort</strong>: Cho một tập dữ liệu, ta có thể xây dựng heap từ chúng rồi liên tục thực hiện thao tác xóa phần tử để thu được dữ liệu đã sắp xếp. Tuy nhiên, ta thường dùng một cách tiếp cận thanh lịch hơn để triển khai Heap Sort, chi tiết được trình bày trong chương "Sắp xếp".</li>
  <li><strong>Lấy ra $k$ phần tử lớn nhất</strong>: Đây là một bài toán thuật toán kinh điển, đồng thời cũng là một ứng dụng tiêu biểu, chẳng hạn như chọn ra 10 tin tức thịnh hành hàng đầu trên Weibo Hot Search hay 10 sản phẩm bán chạy nhất.</li>
</ul>
`,
    originalContent: `
# Heap

A <u>heap</u> is a complete binary tree that satisfies specific conditions and can be mainly categorized into two types, as shown in the figure below.

- <u>min heap</u>: The value of any node $\\leq$ the values of its child nodes.
- <u>max heap</u>: The value of any node $\\geq$ the values of its child nodes.

![Min heap and max heap](heap.assets/min_heap_and_max_heap.png)

As a special case of a complete binary tree, heaps have the following characteristics.

- The bottom layer nodes are filled from left to right, and nodes in other layers are fully filled.
- We call the root node of the binary tree the "heap top" and the bottom-rightmost node the "heap bottom."
- For max heaps (min heaps), the value of the heap top element (root node) is the largest (smallest).

## Common Heap Operations

It should be noted that many programming languages provide a <u>priority queue</u>, an abstract data structure defined as a queue whose elements are ordered by priority.

In fact, **heaps are typically used to implement priority queues, with max heaps corresponding to priority queues where elements are dequeued in descending order**. From a usage perspective, we can regard "priority queue" and "heap" as equivalent data structures. Therefore, this book does not make a special distinction between the two and uniformly refers to them as "heap."

Common heap operations are shown in the table below, and method names need to be determined based on the programming language.

<p align="center"> Table <id> &nbsp; Efficiency of Heap Operations </p>

| Method name | Description                                                       | Time complexity |
| ----------- | ----------------------------------------------------------------- | --------------- |
| \`push()\`    | Insert an element into the heap                                   | $O(\\log n)$     |
| \`pop()\`     | Remove the heap top element                                       | $O(\\log n)$     |
| \`peek()\`    | Access the heap top element (max/min value for max/min heap)     | $O(1)$          |
| \`size()\`    | Get the number of elements in the heap                            | $O(1)$          |
| \`isEmpty()\` | Check if the heap is empty                                        | $O(1)$          |

In practical applications, we can directly use the heap class (or priority queue class) provided by programming languages.

Similar to "ascending order" and "descending order" in sorting algorithms, we can implement conversion between "min heap" and "max heap" by setting a \`flag\` or modifying the \`Comparator\`. The code is as follows:

=== "Python"

    \`\`\`python title="heap.py"
    # Initialize a min heap
    min_heap, flag = [], 1
    # Initialize a max heap
    max_heap, flag = [], -1

    # Python's heapq module implements a min heap by default
    # Consider negating elements before pushing them to the heap, which inverts the size relationship and thus implements a max heap
    # In this example, flag = 1 corresponds to a min heap, flag = -1 corresponds to a max heap

    # Push elements into the heap
    heapq.heappush(max_heap, flag * 1)
    heapq.heappush(max_heap, flag * 3)
    heapq.heappush(max_heap, flag * 2)
    heapq.heappush(max_heap, flag * 5)
    heapq.heappush(max_heap, flag * 4)

    # Get the heap top element
    peek: int = flag * max_heap[0] # 5

    # Remove the heap top element
    # The removed elements will form a descending sequence
    val = flag * heapq.heappop(max_heap) # 5
    val = flag * heapq.heappop(max_heap) # 4
    val = flag * heapq.heappop(max_heap) # 3
    val = flag * heapq.heappop(max_heap) # 2
    val = flag * heapq.heappop(max_heap) # 1

    # Get the heap size
    size: int = len(max_heap)

    # Check if the heap is empty
    is_empty: bool = not max_heap

    # Build a heap from an input list
    min_heap: list[int] = [1, 3, 2, 5, 4]
    heapq.heapify(min_heap)
    \`\`\`

=== "C++"

    \`\`\`cpp title="heap.cpp"
    /* Initialize a heap */
    // Initialize a min heap
    priority_queue<int, vector<int>, greater<int>> minHeap;
    // Initialize a max heap
    priority_queue<int, vector<int>, less<int>> maxHeap;

    /* Push elements into the heap */
    maxHeap.push(1);
    maxHeap.push(3);
    maxHeap.push(2);
    maxHeap.push(5);
    maxHeap.push(4);

    /* Get the heap top element */
    int peek = maxHeap.top(); // 5

    /* Remove the heap top element */
    // The removed elements will form a descending sequence
    maxHeap.pop(); // 5
    maxHeap.pop(); // 4
    maxHeap.pop(); // 3
    maxHeap.pop(); // 2
    maxHeap.pop(); // 1

    /* Get the heap size */
    int size = maxHeap.size();

    /* Check if the heap is empty */
    bool isEmpty = maxHeap.empty();

    /* Build a heap from an input list */
    vector<int> input{1, 3, 2, 5, 4};
    priority_queue<int, vector<int>, greater<int>> minHeap(input.begin(), input.end());
    \`\`\`

=== "Java"

    \`\`\`java title="heap.java"
    /* Initialize a heap */
    // Initialize a min heap
    Queue<Integer> minHeap = new PriorityQueue<>();
    // Initialize a max heap (use lambda expression to modify Comparator)
    Queue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);

    /* Push elements into the heap */
    maxHeap.offer(1);
    maxHeap.offer(3);
    maxHeap.offer(2);
    maxHeap.offer(5);
    maxHeap.offer(4);

    /* Get the heap top element */
    int peek = maxHeap.peek(); // 5

    /* Remove the heap top element */
    // The removed elements will form a descending sequence
    peek = maxHeap.poll(); // 5
    peek = maxHeap.poll(); // 4
    peek = maxHeap.poll(); // 3
    peek = maxHeap.poll(); // 2
    peek = maxHeap.poll(); // 1

    /* Get the heap size */
    int size = maxHeap.size();

    /* Check if the heap is empty */
    boolean isEmpty = maxHeap.isEmpty();

    /* Build a heap from an input list */
    minHeap = new PriorityQueue<>(Arrays.asList(1, 3, 2, 5, 4));
    \`\`\`

=== "C#"

    \`\`\`csharp title="heap.cs"
    /* Initialize a heap */
    // Initialize a min heap
    PriorityQueue<int, int> minHeap = new();
    // Initialize a max heap (use lambda expression to modify Comparer)
    PriorityQueue<int, int> maxHeap = new(Comparer<int>.Create((x, y) => y.CompareTo(x)));

    /* Push elements into the heap */
    maxHeap.Enqueue(1, 1);
    maxHeap.Enqueue(3, 3);
    maxHeap.Enqueue(2, 2);
    maxHeap.Enqueue(5, 5);
    maxHeap.Enqueue(4, 4);

    /* Get the heap top element */
    int peek = maxHeap.Peek();//5

    /* Remove the heap top element */
    // The removed elements will form a descending sequence
    peek = maxHeap.Dequeue();  // 5
    peek = maxHeap.Dequeue();  // 4
    peek = maxHeap.Dequeue();  // 3
    peek = maxHeap.Dequeue();  // 2
    peek = maxHeap.Dequeue();  // 1

    /* Get the heap size */
    int size = maxHeap.Count;

    /* Check if the heap is empty */
    bool isEmpty = maxHeap.Count == 0;

    /* Build a heap from an input list */
    minHeap = new PriorityQueue<int, int>([(1, 1), (3, 3), (2, 2), (5, 5), (4, 4)]);
    \`\`\`

=== "Go"

    \`\`\`go title="heap.go"
    // In Go, we can construct a max heap of integers by implementing heap.Interface
    // Implementing heap.Interface also requires implementing sort.Interface
    type intHeap []any

    // Push implements the heap.Interface method for pushing an element into the heap
    func (h *intHeap) Push(x any) {
        // Push and Pop use pointer receiver as parameters
        // because they not only adjust the slice contents but also modify the slice length
        *h = append(*h, x.(int))
    }

    // Pop implements the heap.Interface method for popping the heap top element
    func (h *intHeap) Pop() any {
        // The element to be removed is stored at the end
        last := (*h)[len(*h)-1]
        *h = (*h)[:len(*h)-1]
        return last
    }

    // Len is a sort.Interface method
    func (h *intHeap) Len() int {
        return len(*h)
    }

    // Less is a sort.Interface method
    func (h *intHeap) Less(i, j int) bool {
        // To implement a min heap, change this to a less-than sign
        return (*h)[i].(int) > (*h)[j].(int)
    }

    // Swap is a sort.Interface method
    func (h *intHeap) Swap(i, j int) {
        (*h)[i], (*h)[j] = (*h)[j], (*h)[i]
    }

    // Top gets the heap top element
    func (h *intHeap) Top() any {
        return (*h)[0]
    }

    /* Driver Code */
    func TestHeap(t *testing.T) {
        /* Initialize a heap */
        // Initialize a max heap
        maxHeap := &intHeap{}
        heap.Init(maxHeap)
        /* Push elements into the heap */
        // Call heap.Interface methods to add elements
        heap.Push(maxHeap, 1)
        heap.Push(maxHeap, 3)
        heap.Push(maxHeap, 2)
        heap.Push(maxHeap, 4)
        heap.Push(maxHeap, 5)

        /* Get the heap top element */
        top := maxHeap.Top()
        fmt.Printf("Heap top element is %d\\n", top)

        /* Remove the heap top element */
        // Call heap.Interface methods to remove elements
        heap.Pop(maxHeap) // 5
        heap.Pop(maxHeap) // 4
        heap.Pop(maxHeap) // 3
        heap.Pop(maxHeap) // 2
        heap.Pop(maxHeap) // 1

        /* Get the heap size */
        size := len(*maxHeap)
        fmt.Printf("Number of heap elements is %d\\n", size)

        /* Check if the heap is empty */
        isEmpty := len(*maxHeap) == 0
        fmt.Printf("Is the heap empty? %t\\n", isEmpty)
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title="heap.swift"
    /* Initialize a heap */
    // Swift's Heap type supports both max heaps and min heaps, and requires importing swift-collections
    var heap = Heap<Int>()

    /* Push elements into the heap */
    heap.insert(1)
    heap.insert(3)
    heap.insert(2)
    heap.insert(5)
    heap.insert(4)

    /* Get the heap top element */
    var peek = heap.max()!

    /* Remove the heap top element */
    peek = heap.removeMax() // 5
    peek = heap.removeMax() // 4
    peek = heap.removeMax() // 3
    peek = heap.removeMax() // 2
    peek = heap.removeMax() // 1

    /* Get the heap size */
    let size = heap.count

    /* Check if the heap is empty */
    let isEmpty = heap.isEmpty

    /* Build a heap from an input list */
    let heap2 = Heap([1, 3, 2, 5, 4])
    \`\`\`

=== "JS"

    \`\`\`javascript title="heap.js"
    // JavaScript does not provide a built-in Heap class
    \`\`\`

=== "TS"

    \`\`\`typescript title="heap.ts"
    // TypeScript does not provide a built-in Heap class
    \`\`\`

=== "Dart"

    \`\`\`dart title="heap.dart"
    // Dart does not provide a built-in Heap class
    \`\`\`

=== "Rust"

    \`\`\`rust title="heap.rs"
    use std::collections::BinaryHeap;
    use std::cmp::Reverse;

    /* Initialize a heap */
    // Initialize a min heap
    let mut min_heap = BinaryHeap::<Reverse<i32>>::new();
    // Initialize a max heap
    let mut max_heap = BinaryHeap::new();

    /* Push elements into the heap */
    max_heap.push(1);
    max_heap.push(3);
    max_heap.push(2);
    max_heap.push(5);
    max_heap.push(4);

    /* Get the heap top element */
    let peek = max_heap.peek().unwrap();  // 5

    /* Remove the heap top element */
    // The removed elements will form a descending sequence
    let peek = max_heap.pop().unwrap();   // 5
    let peek = max_heap.pop().unwrap();   // 4
    let peek = max_heap.pop().unwrap();   // 3
    let peek = max_heap.pop().unwrap();   // 2
    let peek = max_heap.pop().unwrap();   // 1

    /* Get the heap size */
    let size = max_heap.len();

    /* Check if the heap is empty */
    let is_empty = max_heap.is_empty();

    /* Build a heap from an input list */
    let min_heap = BinaryHeap::from(vec![Reverse(1), Reverse(3), Reverse(2), Reverse(5), Reverse(4)]);
    \`\`\`

=== "C"

    \`\`\`c title="heap.c"
    // C does not provide a built-in Heap class
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="heap.kt"
    /* Initialize a heap */
    // Initialize a min heap
    var minHeap = PriorityQueue<Int>()
    // Initialize a max heap (use lambda expression to modify Comparator)
    val maxHeap = PriorityQueue { a: Int, b: Int -> b - a }

    /* Push elements into the heap */
    maxHeap.offer(1)
    maxHeap.offer(3)
    maxHeap.offer(2)
    maxHeap.offer(5)
    maxHeap.offer(4)

    /* Get the heap top element */
    var peek = maxHeap.peek() // 5

    /* Remove the heap top element */
    // The removed elements will form a descending sequence
    peek = maxHeap.poll() // 5
    peek = maxHeap.poll() // 4
    peek = maxHeap.poll() // 3
    peek = maxHeap.poll() // 2
    peek = maxHeap.poll() // 1

    /* Get the heap size */
    val size = maxHeap.size

    /* Check if the heap is empty */
    val isEmpty = maxHeap.isEmpty()

    /* Build a heap from an input list */
    minHeap = PriorityQueue(mutableListOf(1, 3, 2, 5, 4))
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="heap.rb"
    # Ruby does not provide a built-in Heap class
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=import%20heapq%0A%0A%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E5%B0%8F%E9%A1%B6%E5%A0%86%0A%20%20%20%20min_heap,%20flag%20%3D%20%5B%5D,%201%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E5%A4%A7%E9%A1%B6%E5%A0%86%0A%20%20%20%20max_heap,%20flag%20%3D%20%5B%5D,%20-1%0A%20%20%20%20%0A%20%20%20%20%23%20Python%20%E7%9A%84%20heapq%20%E6%A8%A1%E5%9D%97%E9%BB%98%E8%AE%A4%E5%AE%9E%E7%8E%B0%E5%B0%8F%E9%A1%B6%E5%A0%86%0A%20%20%20%20%23%20%E8%80%83%E8%99%91%E5%B0%86%E2%80%9C%E5%85%83%E7%B4%A0%E5%8F%96%E8%B4%9F%E2%80%9D%E5%90%8E%E5%86%8D%E5%85%A5%E5%A0%86%EF%BC%8C%E8%BF%99%E6%A0%B7%E5%B0%B1%E5%8F%AF%E4%BB%A5%E5%B0%86%E5%A4%A7%E5%B0%8F%E5%85%B3%E7%B3%BB%E9%A2%A0%E5%80%92%EF%BC%8C%E4%BB%8E%E8%80%8C%E5%AE%9E%E7%8E%B0%E5%A4%A7%E9%A1%B6%E5%A0%86%0A%20%20%20%20%23%20%E5%9C%A8%E6%9C%AC%E7%A4%BA%E4%BE%8B%E4%B8%AD%EF%BC%8Cflag%20%3D%201%20%E6%97%B6%E5%AF%B9%E5%BA%94%E5%B0%8F%E9%A1%B6%E5%A0%86%EF%BC%8Cflag%20%3D%20-1%20%E6%97%B6%E5%AF%B9%E5%BA%94%E5%A4%A7%E9%A1%B6%E5%A0%86%0A%20%20%20%20%0A%20%20%20%20%23%20%E5%85%83%E7%B4%A0%E5%85%A5%E5%A0%86%0A%20%20%20%20heapq.heappush%28max_heap,%20flag%20*%201%29%0A%20%20%20%20heapq.heappush%28max_heap,%20flag%20*%203%29%0A%20%20%20%20heapq.heappush%28max_heap,%20flag%20*%202%29%0A%20%20%20%20heapq.heappush%28max_heap,%20flag%20*%205%29%0A%20%20%20%20heapq.heappush%28max_heap,%20flag%20*%204%29%0A%20%20%20%20%0A%20%20%20%20%23%20%E8%8E%B7%E5%8F%96%E5%A0%86%E9%A1%B6%E5%85%83%E7%B4%A0%0A%20%20%20%20peek%20%3D%20flag%20*%20max_heap%5B0%5D%20%23%205%0A%20%20%20%20%0A%20%20%20%20%23%20%E5%A0%86%E9%A1%B6%E5%85%83%E7%B4%A0%E5%87%BA%E5%A0%86%0A%20%20%20%20%23%20%E5%87%BA%E5%A0%86%E5%85%83%E7%B4%A0%E4%BC%9A%E5%BD%A2%E6%88%90%E4%B8%80%E4%B8%AA%E4%BB%8E%E5%A4%A7%E5%88%B0%E5%B0%8F%E7%9A%84%E5%BA%8F%E5%88%97%0A%20%20%20%20val%20%3D%20flag%20*%20heapq.heappop%28max_heap%29%20%23%205%0A%20%20%20%20val%20%3D%20flag%20*%20heapq.heappop%28max_heap%29%20%23%204%0A%20%20%20%20val%20%3D%20flag%20*%20heapq.heappop%28max_heap%29%20%23%203%0A%20%20%20%20val%20%3D%20flag%20*%20heapq.heappop%28max_heap%29%20%23%202%0A%20%20%20%20val%20%3D%20flag%20*%20heapq.heappop%28max_heap%29%20%23%201%0A%20%20%20%20%0A%20%20%20%20%23%20%E8%8E%B7%E5%8F%96%E5%A0%86%E5%A4%A7%E5%B0%8F%0A%20%20%20%20size%20%3D%20len%28max_heap%29%0A%20%20%20%20%0A%20%20%20%20%23%20%E5%88%A4%E6%96%AD%E5%A0%86%E6%98%AF%E5%90%A6%E4%B8%BA%E7%A9%BA%0A%20%20%20%20is_empty%20%3D%20not%20max_heap%0A%20%20%20%20%0A%20%20%20%20%23%20%E8%BE%93%E5%85%A5%E5%88%97%E8%A1%A8%E5%B9%B6%E5%BB%BA%E5%A0%86%0A%20%20%20%20min_heap%20%3D%20%5B1,%203,%202,%205,%204%5D%0A%20%20%20%20heapq.heapify%28min_heap%29&cumulative=false&curInstr=3&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

## Implementation of the Heap

The following implementation is for a max heap. To convert it to a min heap, simply reverse all comparison logic related to ordering (for example, replace $\\geq$ with $\\leq$). Interested readers are encouraged to implement this on their own.

### Heap Storage and Representation

As mentioned in the "Binary Tree" chapter, complete binary trees are well-suited for array representation. Since heaps are a type of complete binary tree, **we will use arrays to store heaps**.

When representing a binary tree with an array, elements represent node values, and indexes represent node positions in the binary tree. **Parent-child relationships are represented through index-mapping formulas**.

As shown in the figure below, given an index $i$, the index of its left child is $2i + 1$, the index of its right child is $2i + 2$, and the index of its parent is $(i - 1) / 2$ (floor division). When an index is out of bounds, it indicates a null node or that the node does not exist.

![Representation and storage of heaps](heap.assets/representation_of_heap.png)

We can encapsulate the index mapping formula into functions for convenient subsequent use:

\`\`\`src
[file]{my_heap}-[class]{max_heap}-[func]{parent}
\`\`\`

### Accessing the Heap Top Element

The heap top element is the root node of the binary tree, which is also the first element of the list:

\`\`\`src
[file]{my_heap}-[class]{max_heap}-[func]{peek}
\`\`\`

### Inserting an Element Into the Heap

Given an element \`val\`, we first add it to the bottom of the heap. After insertion, because \`val\` may be larger than other elements in the heap, the heap property may be violated. **Therefore, we need to restore the heap property along the path from the inserted node to the root**. This operation is called <u>heapify</u>.

Starting from the inserted node, **perform heapify from bottom to top**. As shown in the figure below, we compare the inserted node with its parent, and if the inserted node is larger, we swap them. We continue this process from bottom to top until we move past the root or reach a node that no longer needs to be swapped.

=== "<1>"
    ![Steps of inserting an element into the heap](heap.assets/heap_push_step1.png)

=== "<2>"
    ![heap_push_step2](heap.assets/heap_push_step2.png)

=== "<3>"
    ![heap_push_step3](heap.assets/heap_push_step3.png)

=== "<4>"
    ![heap_push_step4](heap.assets/heap_push_step4.png)

=== "<5>"
    ![heap_push_step5](heap.assets/heap_push_step5.png)

=== "<6>"
    ![heap_push_step6](heap.assets/heap_push_step6.png)

=== "<7>"
    ![heap_push_step7](heap.assets/heap_push_step7.png)

=== "<8>"
    ![heap_push_step8](heap.assets/heap_push_step8.png)

=== "<9>"
    ![heap_push_step9](heap.assets/heap_push_step9.png)

Given a total of $n$ nodes, the tree height is $O(\\log n)$. Thus, the number of loop iterations in the heapify operation is at most $O(\\log n)$, **making the time complexity of the element insertion operation $O(\\log n)$**. The code is as follows:

\`\`\`src
[file]{my_heap}-[class]{max_heap}-[func]{sift_up}
\`\`\`

### Removing the Heap Top Element

The heap top element is the root node of the binary tree, which is the first element of the list. If we directly remove the first element from the list, all node indexes in the binary tree would change, making subsequent repair with heapify difficult. To minimize changes in element indexes, we use the following steps.

1. Swap the heap top element with the heap bottom element (swap the root node with the rightmost leaf node).
2. After swapping, remove the heap bottom from the list (note that since we've swapped, we're actually removing the original heap top element).
3. Starting from the root node, **perform heapify from top to bottom**.

As shown in the figure below, **the direction of "top-to-bottom heapify" is opposite to "bottom-to-top heapify"**. We compare the root node's value with its two children and swap it with the largest child. Then loop this operation until we pass a leaf node or encounter a node that doesn't need swapping.

=== "<1>"
    ![Steps of removing the heap top element](heap.assets/heap_pop_step1.png)

=== "<2>"
    ![heap_pop_step2](heap.assets/heap_pop_step2.png)

=== "<3>"
    ![heap_pop_step3](heap.assets/heap_pop_step3.png)

=== "<4>"
    ![heap_pop_step4](heap.assets/heap_pop_step4.png)

=== "<5>"
    ![heap_pop_step5](heap.assets/heap_pop_step5.png)

=== "<6>"
    ![heap_pop_step6](heap.assets/heap_pop_step6.png)

=== "<7>"
    ![heap_pop_step7](heap.assets/heap_pop_step7.png)

=== "<8>"
    ![heap_pop_step8](heap.assets/heap_pop_step8.png)

=== "<9>"
    ![heap_pop_step9](heap.assets/heap_pop_step9.png)

=== "<10>"
    ![heap_pop_step10](heap.assets/heap_pop_step10.png)

Similar to the element insertion operation, the time complexity of the heap top element removal operation is also $O(\\log n)$. The code is as follows:

\`\`\`src
[file]{my_heap}-[class]{max_heap}-[func]{sift_down}
\`\`\`

## Common Applications of Heaps

- **Priority queue**: Heaps are typically the preferred data structure for implementing priority queues. The time complexity of both enqueue and dequeue operations is $O(\\log n)$, and heap construction has a time complexity of $O(n)$, making these operations highly efficient.
- **Heap sort**: Given a set of data, we can build a heap with them and then continuously perform element removal operations to obtain sorted data. However, we usually use a more elegant approach to implement heap sort, as detailed in the "Heap Sort" chapter.
- **Getting the largest $k$ elements**: This is a classic algorithm problem and also a typical application, such as selecting the top 10 trending news items for Weibo Hot Search or the top 10 best-selling products.

`
  },

  'dsa-build-heap': {
    title: '8.2 Xây dựng Heap (Build Heap)',
    summary: 'Phân tích cách tối ưu hóa quá trình xây dựng Heap từ một mảng dữ liệu với độ phức tạp O(n) thay vì O(n log n).',
    tags: ['dsa', 'heap', 'heapify'],
    domain: 'Algorithms',
    module: 'Chương 8: Heap',
    prerequisites: ['dsa-heap'],
    related: ['dsa-top-k'],
    updatedAt: '2026-07-19',
    readTime: '12 phút',
    content: `
<p>Trong một số trường hợp, ta muốn xây dựng một heap từ toàn bộ các phần tử của một danh sách, và quá trình này được gọi là "thao tác xây dựng heap (heap construction operation)".</p>

<h2>8.2.1 Triển khai bằng cách chèn phần tử</h2>
<p>Trước tiên ta tạo một heap rỗng, sau đó duyệt qua danh sách, lần lượt thực hiện "thao tác chèn phần tử" cho từng phần tử. Nghĩa là thêm phần tử vào cuối heap rồi thực hiện heapify "từ dưới lên trên" cho phần tử đó.</p>
<p>Mỗi lần một phần tử được chèn vào heap, độ dài của heap tăng thêm một. Vì các nút được thêm vào cây nhị phân tuần tự từ trên xuống dưới, nên heap được xây dựng "từ trên xuống dưới".</p>
<p>Cho $n$ phần tử, mỗi thao tác chèn một phần tử mất thời gian $O(\\log n)$, do đó độ phức tạp thời gian của phương pháp xây dựng heap này là $O(n \\log n)$.</p>

<h2>8.2.2 Triển khai bằng duyệt Heapify</h2>
<p>Trên thực tế, ta có thể triển khai một phương pháp xây dựng heap hiệu quả hơn chỉ với hai bước.</p>
<ol>
  <li>Thêm toàn bộ các phần tử của danh sách vào heap giữ nguyên như ban đầu, lúc này tính chất heap chưa được thỏa mãn.</li>
  <li>Duyệt heap theo thứ tự ngược lại (ngược với duyệt theo tầng), lần lượt thực hiện heapify "từ trên xuống dưới" cho từng nút không phải là nút lá.</li>
</ol>
<p><strong>Sau khi heapify một nút, cây con có gốc là nút đó trở thành một sub-heap hợp lệ</strong>. Vì ta duyệt theo thứ tự ngược lại, heap được xây dựng "từ dưới lên trên".</p>
<p>Sở dĩ chọn duyệt theo thứ tự ngược lại là vì điều đó đảm bảo các cây con bên dưới nút hiện tại đã là các sub-heap hợp lệ, nên việc heapify nút hiện tại mới thực sự có hiệu quả.</p>
<p>Đáng chú ý là <strong>vì các nút lá không có con, nên chúng vốn dĩ đã là các sub-heap hợp lệ và không cần heapify</strong>. Như trong đoạn mã dưới đây, nút không phải nút lá cuối cùng chính là nút cha của nút cuối cùng; ta bắt đầu từ nút đó và heapify trong khi duyệt ngược lại:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def __init__(self, nums: list[int]):
    """Hàm khởi tạo, xây dựng heap dựa trên danh sách đầu vào"""
    # Thêm các phần tử của danh sách vào heap giữ nguyên như ban đầu
    self.max_heap = nums
    # Heapify hóa tất cả các nút, ngoại trừ nút lá
    for i in range(self.parent(self.size() - 1), -1, -1):
        self.sift_down(i)
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Hàm khởi tạo, xây dựng heap dựa trên danh sách đầu vào */
MaxHeap(vector&lt;int&gt; nums) {
    // Thêm các phần tử của danh sách vào heap giữ nguyên như ban đầu
    maxHeap = nums;
    // Heapify hóa tất cả các nút, ngoại trừ nút lá
    for (int i = parent(size() - 1); i &gt;= 0; i--) {
        siftDown(i);
    }
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Hàm khởi tạo, xây dựng heap dựa trên danh sách đầu vào */
public MaxHeap(List&lt;Integer&gt; nums) {
    // Thêm các phần tử của danh sách vào heap giữ nguyên như ban đầu
    maxHeap = new ArrayList&lt;&gt;(nums);
    // Heapify hóa tất cả các nút, ngoại trừ nút lá
    for (int i = parent(size() - 1); i &gt;= 0; i--) {
        siftDown(i);
    }
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Hàm khởi tạo, xây dựng heap rỗng hoặc từ danh sách đầu vào */
constructor(nums) {
    // Thêm các phần tử của danh sách vào heap giữ nguyên như ban đầu
    this.#maxHeap = nums === undefined ? [] : [...nums];
    // Heapify hóa tất cả các nút, ngoại trừ nút lá
    for (let i = this.#parent(this.size() - 1); i &gt;= 0; i--) {
        this.#siftDown(i);
    }
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Hàm khởi tạo, xây dựng heap dựa trên danh sách đầu vào */
init {
    // Thêm các phần tử của danh sách vào heap giữ nguyên như ban đầu
    maxHeap.addAll(nums!!)
    // Heapify hóa tất cả các nút, ngoại trừ nút lá
    for (i in parent(size() - 1) downTo 0) {
        siftDown(i)
    }
}
</code></pre></div></div></div>

<div class="interactive-widget-wrapper" id="build-heap-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'build-heap-wrapper', 'tab-static')">📸 Tóm tắt</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'build-heap-wrapper', 'tab-interactive'); initBuildHeapDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="text-align:center; color:var(--text-secondary); font-size:14px;">Xem tab "Mô phỏng tương tác" để theo dõi quá trình xây dựng Max Heap từ mảng chưa sắp xếp [4, 2, 8, 1, 9, 5, 3] bằng cách heapify từ dưới lên trên (duyệt ngược, bỏ qua nút lá).</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="build-heap-tree" style="min-height:190px;"></div>
    <div id="build-heap-array" style="display:flex; gap:6px; justify-content:center; flex-wrap:wrap; margin:12px 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:10px; justify-content:center; margin:12px 0; flex-wrap:wrap;">
      <button id="build-heap-btn-autorun" class="control-btn" onclick="autoRunBuildHeap()">▶ Auto Run</button>
      <button id="build-heap-btn-step" class="control-btn" onclick="stepBuildHeap()">Bước tiếp theo ▶</button>
      <button id="build-heap-btn-pause" class="control-btn btn-secondary" onclick="pauseRunBuildHeap()" disabled>⏸ Dừng</button>
      <button id="build-heap-btn-reset" class="control-btn btn-secondary" onclick="initBuildHeapDemo()">↺ Reset</button>
    </div>
    <div id="build-heap-speed-control" style="text-align:center; margin-bottom:10px;">
      Tốc độ: <input type="range" min="200" max="2000" value="800" step="200" oninput="setBuildHeapSpeed(this.value)" /> <span id="build-heap-speed-label">800ms</span>
    </div>
    <div id="build-heap-status" class="simulator-status" style="text-align:center; min-height:24px;">
      Nhấp "Auto Run" hoặc "Bước tiếp theo" để xây dựng Max Heap từ mảng [4, 2, 8, 1, 9, 5, 3].
    </div>
  </div>
</div>

<h2>8.2.3 Phân tích độ phức tạp</h2>
<p>Tiếp theo, hãy thử suy ra độ phức tạp thời gian của phương pháp xây dựng heap thứ hai này.</p>
<ul>
  <li>Giả sử cây nhị phân hoàn chỉnh có $n$ nút, khi đó số nút lá là $(n + 1) / 2$, trong đó $/$ là phép chia lấy phần nguyên. Do đó, số nút cần heapify là $(n - 1) / 2$.</li>
  <li>Trong quá trình heapify "từ trên xuống dưới", mỗi nút có thể chìm xuống tối đa đến một nút lá, vì vậy số lần lặp tối đa chính là chiều cao của cây nhị phân, $\\log n$.</li>
</ul>
<p>Nhân hai giá trị này với nhau, ta được độ phức tạp thời gian của quá trình xây dựng heap là $O(n \\log n)$. <strong>Tuy nhiên, ước lượng này không chính xác vì nó không tính đến đặc điểm cây nhị phân có số nút ở các tầng dưới nhiều hơn hẳn so với các tầng trên</strong>.</p>
<p>Hãy thực hiện một phép tính chính xác hơn. Để đơn giản hóa việc phân tích, giả sử ta có một "cây nhị phân hoàn hảo (perfect binary tree)" với $n$ nút và chiều cao $h$; giả định này không ảnh hưởng đến tính đúng đắn của kết quả.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/heapify_operations_count.png" alt="Số lượng nút ở mỗi tầng của một cây nhị phân hoàn hảo" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Như hình minh họa ở trên, số lần lặp tối đa của thao tác heapify "từ trên xuống dưới" của một nút bằng khoảng cách từ nút đó đến một nút lá, và đó chính xác là chiều cao của nút. Do đó, ta có thể tính tổng "số lượng nút $\\times$ chiều cao nút" ở mỗi tầng để <strong>thu được tổng số lần lặp heapify của toàn bộ các nút</strong>.</p>
<p>$$
T(h) = 2^0h + 2^1(h-1) + 2^2(h-2) + \\dots + 2^{(h-1)}\\times1
$$</p>
<p>Để đơn giản hóa biểu thức trên cần một chút đại số dãy số ở cấp phổ thông. Trước tiên, nhân $T(h)$ với $2$, ta được:</p>
<p>$$
\\begin{aligned}
T(h) & = 2^0h + 2^1(h-1) + 2^2(h-2) + \\dots + 2^{h-1}\\times1 \\newline
2 T(h) & = 2^1h + 2^2(h-1) + 2^3(h-2) + \\dots + 2^{h}\\times1 \\newline
\\end{aligned}
$$</p>
<p>Sử dụng phép trừ giữa hai tổng đã dịch chuyển, lấy phương trình thứ nhất $T(h)$ trừ cho phương trình thứ hai $2 T(h)$, ta được:</p>
<p>$$
2T(h) - T(h) = T(h) = -2^0h + 2^1 + 2^2 + \\dots + 2^{h-1} + 2^h
$$</p>
<p>Quan sát biểu thức trên, ta thấy $T(h)$ là một cấp số nhân, có thể tính trực tiếp bằng công thức tổng, cho ra độ phức tạp thời gian là:</p>
<p>$$
\\begin{aligned}
T(h) & = 2 \\frac{1 - 2^h}{1 - 2} - h \\newline
& = 2^{h+1} - h - 2 \\newline
& = O(2^h)
\\end{aligned}
$$</p>
<p>Hơn nữa, một cây nhị phân hoàn hảo với chiều cao $h$ có $n = 2^{h+1} - 1$ nút, vì vậy độ phức tạp là $O(2^h) = O(n)$. Phép suy luận này cho thấy <strong>độ phức tạp thời gian của việc xây dựng một heap từ một danh sách đầu vào là $O(n)$, một kết quả cực kỳ hiệu quả</strong>.</p>
`,
    originalContent: `
# Heap Construction Operation

In some cases, we want to build a heap using all elements of a list, and this process is called "heap construction operation."

## Implementing with Element Insertion

We first create an empty heap, then iterate through the list, performing the "element insertion operation" on each element in sequence. This means appending the element to the end of the heap and then performing "bottom-to-top" heapify on that element.

Each time an element is inserted into the heap, the heap's length increases by one. Since nodes are added to the binary tree sequentially from top to bottom, the heap is constructed "from top to bottom."

Given $n$ elements, each element's insertion operation takes $O(\\log{n})$ time, so the time complexity of this heap construction method is $O(n \\log n)$.

## Implementing Through Heapify Traversal

In fact, we can implement a more efficient heap construction method in two steps.

1. Add all elements of the list as-is to the heap, at which point the heap property is not yet satisfied.
2. Traverse the heap in reverse order (reverse of level-order traversal), performing "top-to-bottom heapify" on each non-leaf node in sequence.

**After heapifying a node, the subtree rooted at that node becomes a valid sub-heap**. Since we traverse in reverse order, the heap is constructed "from bottom to top."

The reason for choosing reverse-order traversal is that it ensures the subtrees beneath the current node are already valid sub-heaps, so heapifying the current node is effective.

It's worth noting that **since leaf nodes have no children, they are naturally valid sub-heaps and do not require heapification**. As shown in the code below, the last non-leaf node is the parent of the last node; we start from that node and heapify while traversing in reverse order:

\`\`\`src
[file]{my_heap}-[class]{max_heap}-[func]{__init__}
\`\`\`

## Complexity Analysis

Next, let's attempt to derive the time complexity of this second heap construction method.

- Assuming the complete binary tree has $n$ nodes, then the number of leaf nodes is $(n + 1) / 2$, where $/$ is floor division. Therefore, the number of nodes that need heapification is $(n - 1) / 2$.
- In the top-to-bottom heapify process, each node can sink at most to a leaf node, so the maximum number of iterations is the height of the binary tree, $\\log n$.

Multiplying these two together, we get a time complexity of $O(n \\log n)$ for the heap construction process. **However, this estimate is not accurate because it doesn't account for the property that binary trees have far more nodes at lower levels than at upper levels**.

Let's perform a more accurate calculation. To simplify the analysis, assume a "perfect binary tree" with $n$ nodes and height $h$; this assumption does not affect the correctness of the result.

![Node count at each level of a perfect binary tree](build_heap.assets/heapify_operations_count.png)

As shown in the figure above, the maximum number of iterations for a node's "top-to-bottom heapify" equals the distance from that node to a leaf node, which is precisely the node's height. Therefore, we can sum the "number of nodes $\\times$ node height" at each level to **obtain the total number of heapify iterations for all nodes**.

$$
T(h) = 2^0h + 2^1(h-1) + 2^2(h-2) + \\dots + 2^{(h-1)}\\times1
$$

Simplifying the expression above requires some high-school sequence algebra. First, multiply $T(h)$ by $2$ to get:

$$
\\begin{aligned}
T(h) & = 2^0h + 2^1(h-1) + 2^2(h-2) + \\dots + 2^{h-1}\\times1 \\newline
2 T(h) & = 2^1h + 2^2(h-1) + 2^3(h-2) + \\dots + 2^{h}\\times1 \\newline
\\end{aligned}
$$

Using subtraction of shifted sums, subtract the first equation $T(h)$ from the second equation $2 T(h)$ to get:

$$
2T(h) - T(h) = T(h) = -2^0h + 2^1 + 2^2 + \\dots + 2^{h-1} + 2^h
$$

Observing the above expression, we find that $T(h)$ is a geometric series, which can be calculated directly using the sum formula, yielding a time complexity of:

$$
\\begin{aligned}
T(h) & = 2 \\frac{1 - 2^h}{1 - 2} - h \\newline
& = 2^{h+1} - h - 2 \\newline
& = O(2^h)
\\end{aligned}
$$

Furthermore, a perfect binary tree with height $h$ has $n = 2^{h+1} - 1$ nodes, so the complexity is $O(2^h) = O(n)$. This derivation shows that **the time complexity of building a heap from an input list is $O(n)$, which is highly efficient**.

`
  },

  'dsa-top-k': {
    title: '8.3 Bài toán Top-k',
    summary: 'Bài toán kinh điển: Tìm k phần tử lớn nhất/nhỏ nhất trong một danh sách chưa được sắp xếp. So sánh các cách tiếp cận: Duyệt mảng, Sắp xếp và sử dụng Heap.',
    tags: ['dsa', 'heap', 'top-k', 'algorithm'],
    domain: 'Algorithms',
    module: 'Chương 8: Heap',
    prerequisites: ['dsa-build-heap'],
    related: ['dsa-heap-summary'],
    updatedAt: '2026-07-19',
    readTime: '12 phút',
    content: `
<div class="callout callout-question">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một mảng chưa sắp xếp <code>nums</code> có độ dài $n$. Hãy trả về $k$ phần tử lớn nhất trong mảng đó.</p>
  </div>
</div>
<p>Với bài toán này, trước tiên ta sẽ giới thiệu hai cách giải tương đối đơn giản, sau đó là một giải pháp hiệu quả hơn dựa trên heap.</p>

<h2>8.3.1 Cách 1: Chọn lọc lặp lại</h2>
<p>Ta có thể thực hiện $k$ vòng duyệt như minh họa trong hình dưới đây, mỗi vòng trích ra phần tử lớn thứ $1, 2, \\dots, k$, với độ phức tạp thời gian $O(nk)$.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/top_k_traversal.png" alt="Duyệt mảng để tìm k phần tử lớn nhất" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Phương pháp này chỉ phù hợp khi $k \\ll n$, vì khi $k$ tiệm cận $n$, độ phức tạp thời gian tiến gần đến $O(n^2)$, khiến nó trở nên rất kém hiệu quả.</p>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Khi $k = n$, ta có thể thu được một dãy đã sắp xếp hoàn chỉnh, điều này tương đương với thuật toán "Selection Sort".</p>
  </div>
</div>

<h2>8.3.2 Cách 2: Sắp xếp</h2>
<p>Như minh họa trong hình dưới đây, ta có thể sắp xếp mảng <code>nums</code> trước, sau đó trả về $k$ phần tử ngoài cùng bên phải, với độ phức tạp thời gian $O(n \\log n)$.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/top_k_sorting.png" alt="Sắp xếp để tìm k phần tử lớn nhất" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Rõ ràng, phương pháp này làm nhiều việc hơn mức cần thiết, vì ta chỉ cần tìm $k$ phần tử lớn nhất chứ không cần sắp xếp toàn bộ các phần tử còn lại.</p>

<h2>8.3.3 Cách 3: Sử dụng Heap</h2>
<p>Ta có thể giải bài toán Top-k hiệu quả hơn bằng cách sử dụng heap, như minh họa trong hình dưới đây.</p>
<ol>
  <li>Khởi tạo một Min Heap, trong đó đỉnh heap là phần tử nhỏ nhất.</li>
  <li>Trước tiên, đưa $k$ phần tử đầu tiên của mảng vào heap theo thứ tự.</li>
  <li>Bắt đầu từ phần tử thứ $(k + 1)$, nếu phần tử hiện tại lớn hơn đỉnh heap, xóa đỉnh heap và đưa phần tử hiện tại vào heap.</li>
  <li>Sau khi duyệt xong, heap chứa $k$ phần tử lớn nhất.</li>
</ol>
<div class="interactive-widget-wrapper" id="top-k-heap-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img src="dsa-assets/top_k_heap_step1.png" alt="top_k_heap_step1" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 1</p></div>
    <div class="slide"><img src="dsa-assets/top_k_heap_step2.png" alt="top_k_heap_step2" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 2</p></div>
    <div class="slide"><img src="dsa-assets/top_k_heap_step3.png" alt="top_k_heap_step3" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 3</p></div>
    <div class="slide"><img src="dsa-assets/top_k_heap_step4.png" alt="top_k_heap_step4" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 4</p></div>
    <div class="slide"><img src="dsa-assets/top_k_heap_step5.png" alt="top_k_heap_step5" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 5</p></div>
    <div class="slide"><img src="dsa-assets/top_k_heap_step6.png" alt="top_k_heap_step6" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 6</p></div>
    <div class="slide"><img src="dsa-assets/top_k_heap_step7.png" alt="top_k_heap_step7" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 7</p></div>
    <div class="slide"><img src="dsa-assets/top_k_heap_step8.png" alt="top_k_heap_step8" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 8</p></div>
    <div class="slide"><img src="dsa-assets/top_k_heap_step9.png" alt="top_k_heap_step9" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 9</p></div>
    <div class="slider-controls">
      <button class="control-btn" onclick="prevSlide('top-k-heap-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 9</span>
      <button class="control-btn" onclick="nextSlide('top-k-heap-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Đoạn mã ví dụ như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def top_k_heap(nums: list[int], k: int) -&gt; list[int]:
    """Dựa vào heap để tìm k phần tử lớn nhất trong mảng"""
    # Khởi tạo Min Heap
    heap = []
    # Đưa k phần tử đầu tiên của mảng vào heap
    for i in range(k):
        heapq.heappush(heap, nums[i])
    # Bắt đầu từ phần tử thứ (k+1), duy trì độ dài heap luôn là k
    for i in range(k, len(nums)):
        # Nếu phần tử hiện tại lớn hơn đỉnh heap, đỉnh heap rời khỏi heap, phần tử hiện tại vào heap
        if nums[i] &gt; heap[0]:
            heapq.heappop(heap)
            heapq.heappush(heap, nums[i])
    return heap
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Dựa vào heap để tìm k phần tử lớn nhất trong mảng */
priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; topKHeap(vector&lt;int&gt; &amp;nums, int k) {
    // Module heapq của Python mặc định triển khai Min Heap
    priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; heap;
    // Đưa k phần tử đầu tiên của mảng vào heap
    for (int i = 0; i &lt; k; i++) {
        heap.push(nums[i]);
    }
    // Bắt đầu từ phần tử thứ (k+1), duy trì độ dài heap luôn là k
    for (int i = k; i &lt; nums.size(); i++) {
        // Nếu phần tử hiện tại lớn hơn đỉnh heap, đỉnh heap rời khỏi heap, phần tử hiện tại vào heap
        if (nums[i] &gt; heap.top()) {
            heap.pop();
            heap.push(nums[i]);
        }
    }
    return heap;
}
</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Dựa vào heap để tìm k phần tử lớn nhất trong mảng */
static Queue&lt;Integer&gt; topKHeap(int[] nums, int k) {
    // Module heapq của Python mặc định triển khai Min Heap
    Queue&lt;Integer&gt; heap = new PriorityQueue&lt;Integer&gt;();
    // Đưa k phần tử đầu tiên của mảng vào heap
    for (int i = 0; i &lt; k; i++) {
        heap.offer(nums[i]);
    }
    // Bắt đầu từ phần tử thứ (k+1), duy trì độ dài heap luôn là k
    for (int i = k; i &lt; nums.length; i++) {
        // Nếu phần tử hiện tại lớn hơn đỉnh heap, đỉnh heap rời khỏi heap, phần tử hiện tại vào heap
        if (nums[i] &gt; heap.peek()) {
            heap.poll();
            heap.offer(nums[i]);
        }
    }
    return heap;
}
</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Phần tử vào Min Heap (mô phỏng bằng Max Heap đã đổi dấu) */
function pushMinHeap(maxHeap, val) {
    // Đảo dấu phần tử
    maxHeap.push(-val);
}

/* Phần tử rời khỏi Min Heap */
function popMinHeap(maxHeap) {
    // Đảo dấu phần tử
    return -maxHeap.pop();
}

/* Truy cập đỉnh Min Heap */
function peekMinHeap(maxHeap) {
    // Đảo dấu phần tử
    return -maxHeap.peek();
}

/* Trích xuất phần tử từ Min Heap */
function getMinHeap(maxHeap) {
    // Đảo dấu phần tử
    return maxHeap.getMaxHeap().map((num) =&gt; -num);
}

/* Dựa vào heap để tìm k phần tử lớn nhất trong mảng */
function topKHeap(nums, k) {
    // Module heapq của Python mặc định triển khai Min Heap
    // Lưu ý: ta đảo dấu tất cả phần tử trong heap để mô phỏng Min Heap bằng Max Heap
    const maxHeap = new MaxHeap([]);
    // Đưa k phần tử đầu tiên của mảng vào heap
    for (let i = 0; i &lt; k; i++) {
        pushMinHeap(maxHeap, nums[i]);
    }
    // Bắt đầu từ phần tử thứ (k+1), duy trì độ dài heap luôn là k
    for (let i = k; i &lt; nums.length; i++) {
        // Nếu phần tử hiện tại lớn hơn đỉnh heap, đỉnh heap rời khỏi heap, phần tử hiện tại vào heap
        if (nums[i] &gt; peekMinHeap(maxHeap)) {
            popMinHeap(maxHeap);
            pushMinHeap(maxHeap, nums[i]);
        }
    }
    // Trả về các phần tử trong heap
    return getMinHeap(maxHeap);
}
</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Dựa vào heap để tìm k phần tử lớn nhất trong mảng */
fun topKHeap(nums: IntArray, k: Int): Queue&lt;Int&gt; {
    // Module heapq của Python mặc định triển khai Min Heap
    val heap = PriorityQueue&lt;Int&gt;()
    // Đưa k phần tử đầu tiên của mảng vào heap
    for (i in 0..&lt;k) {
        heap.offer(nums[i])
    }
    // Bắt đầu từ phần tử thứ (k+1), duy trì độ dài heap luôn là k
    for (i in k..&lt;nums.size) {
        // Nếu phần tử hiện tại lớn hơn đỉnh heap, đỉnh heap rời khỏi heap, phần tử hiện tại vào heap
        if (nums[i] &gt; heap.peek()) {
            heap.poll()
            heap.offer(nums[i])
        }
    }
    return heap
}
</code></pre></div></div></div>
<p>Tổng cộng có $n$ vòng thêm và xóa phần tử trên heap được thực hiện, với độ dài tối đa của heap là $k$, do đó độ phức tạp thời gian là $O(n \\log k)$. Phương pháp này rất hiệu quả; khi $k$ nhỏ, độ phức tạp thời gian gần tiệm cận $O(n)$; khi $k$ lớn, độ phức tạp thời gian không vượt quá $O(n \\log n)$.</p>
<p>Ngoài ra, phương pháp này còn rất phù hợp với luồng dữ liệu động (Data Stream). Khi có dữ liệu mới đến, ta có thể liên tục duy trì các phần tử trong heap, cho phép cập nhật động $k$ phần tử lớn nhất.</p>

<div class="interactive-widget-wrapper" id="top-k-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'top-k-wrapper', 'tab-static')">📸 Tóm tắt</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'top-k-wrapper', 'tab-interactive'); initTopKDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="text-align:center; color:var(--text-secondary); font-size:14px;">Xem tab "Mô phỏng tương tác" để theo dõi cách tìm 3 phần tử lớn nhất trong mảng [1, 7, 6, 3, 2] bằng Min Heap kích thước k = 3.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="top-k-nums" style="display:flex; gap:6px; justify-content:center; flex-wrap:wrap; margin-bottom:10px;"></div>
    <div id="top-k-heap" style="display:flex; gap:6px; justify-content:center; flex-wrap:wrap; margin:12px 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:10px; justify-content:center; margin:12px 0; flex-wrap:wrap;">
      <button id="top-k-btn-autorun" class="control-btn" onclick="autoRunTopK()">▶ Auto Run</button>
      <button id="top-k-btn-step" class="control-btn" onclick="stepTopK()">Bước tiếp theo ▶</button>
      <button id="top-k-btn-pause" class="control-btn btn-secondary" onclick="pauseRunTopK()" disabled>⏸ Dừng</button>
      <button id="top-k-btn-reset" class="control-btn btn-secondary" onclick="initTopKDemo()">↺ Reset</button>
    </div>
    <div id="top-k-speed-control" style="text-align:center; margin-bottom:10px;">
      Tốc độ: <input type="range" min="200" max="2000" value="800" step="200" oninput="setTopKSpeed(this.value)" /> <span id="top-k-speed-label">800ms</span>
    </div>
    <div id="top-k-status" class="simulator-status" style="text-align:center; min-height:24px;">
      Nhấp "Auto Run" hoặc "Bước tiếp theo" để tìm Top-3 phần tử lớn nhất trong [1, 7, 6, 3, 2] bằng Min Heap.
    </div>
  </div>
</div>
`,
    originalContent: `
# Top-k Problem

!!! question

    Given an unordered array \`nums\` of length $n$, return the largest $k$ elements in the array.

For this problem, we will first introduce two relatively straightforward solutions, followed by a more efficient heap-based solution.

## Method 1: Iterative Selection

We can perform $k$ rounds of traversal as shown in the figure below, extracting the $1^{st}$, $2^{nd}$, $\\dots$, $k^{th}$ largest elements in each round, with a time complexity of $O(nk)$.

This method is only suitable when $k \\ll n$, because when $k$ is close to $n$, the time complexity approaches $O(n^2)$, making it very inefficient.

![Traversing to find the largest k elements](top_k.assets/top_k_traversal.png)

!!! tip

    When $k = n$, we can obtain a complete sorted sequence, which is equivalent to the "selection sort" algorithm.

## Method 2: Sorting

As shown in the figure below, we can first sort the array \`nums\`, then return the rightmost $k$ elements, with a time complexity of $O(n \\log n)$.

Clearly, this method does more work than necessary, because we only need to find the largest $k$ elements rather than sort the other elements.

![Sorting to find the largest k elements](top_k.assets/top_k_sorting.png)

## Method 3: Heap

We can solve the Top-k problem more efficiently with a heap, as shown in the figure below.

1. Initialize a min heap, where the heap top element is the smallest.
2. First, insert the first $k$ elements of the array into the heap in sequence.
3. Starting from the $(k + 1)^{th}$ element, if the current element is greater than the heap top element, remove the heap top element and insert the current element into the heap.
4. After traversal is complete, the heap contains the largest $k$ elements.

=== "<1>"
    ![Finding the largest k elements using a heap](top_k.assets/top_k_heap_step1.png)

=== "<2>"
    ![top_k_heap_step2](top_k.assets/top_k_heap_step2.png)

=== "<3>"
    ![top_k_heap_step3](top_k.assets/top_k_heap_step3.png)

=== "<4>"
    ![top_k_heap_step4](top_k.assets/top_k_heap_step4.png)

=== "<5>"
    ![top_k_heap_step5](top_k.assets/top_k_heap_step5.png)

=== "<6>"
    ![top_k_heap_step6](top_k.assets/top_k_heap_step6.png)

=== "<7>"
    ![top_k_heap_step7](top_k.assets/top_k_heap_step7.png)

=== "<8>"
    ![top_k_heap_step8](top_k.assets/top_k_heap_step8.png)

=== "<9>"
    ![top_k_heap_step9](top_k.assets/top_k_heap_step9.png)

Example code is as follows:

\`\`\`src
[file]{top_k}-[class]{}-[func]{top_k_heap}
\`\`\`

A total of $n$ rounds of heap insertions and removals are performed, with the heap's maximum length being $k$, so the time complexity is $O(n \\log k)$. This method is very efficient; when $k$ is small, the time complexity approaches $O(n)$; when $k$ is large, the time complexity does not exceed $O(n \\log n)$.

Additionally, this method is well suited to dynamic data streams. As new data arrives, we can continuously maintain the elements in the heap, enabling dynamic updates to the largest $k$ elements.

`
  },

  'dsa-heap-summary': {
    title: '8.4 Tóm tắt & Hỏi đáp',
    summary: 'Tóm tắt kiến thức cốt lõi về Heap, khác biệt giữa Heap trong Cấu trúc dữ liệu và Heap Memory Allocation.',
    tags: ['dsa', 'heap', 'summary'],
    domain: 'Algorithms',
    module: 'Chương 8: Heap',
    prerequisites: ['dsa-top-k'],
    related: [],
    updatedAt: '2026-07-19',
    readTime: '4 phút',
    content: `
<h2>Ôn tập trọng điểm</h2>
<ul>
  <li>Heap là một cây nhị phân hoàn chỉnh. Tùy thuộc vào tính chất mà nó thỏa mãn, heap có thể được phân loại là Max Heap hoặc Min Heap. Phần tử đỉnh của Max Heap (Min Heap) là phần tử lớn nhất (nhỏ nhất).</li>
  <li>Priority Queue (Hàng đợi ưu tiên) là một hàng đợi mà các phần tử được lấy ra theo mức độ ưu tiên, và nó thường được triển khai bằng heap.</li>
  <li>Các thao tác heap phổ biến cùng độ phức tạp thời gian tương ứng bao gồm: chèn một phần tử $O(\\log n)$, xóa phần tử ở đỉnh $O(\\log n)$, và truy cập phần tử ở đỉnh $O(1)$.</li>
  <li>Cây nhị phân hoàn chỉnh rất phù hợp để biểu diễn bằng mảng, nên ta thường dùng mảng để lưu trữ heap.</li>
  <li>Các thao tác Heapify được dùng để duy trì tính chất heap, và được sử dụng trong cả thao tác chèn lẫn xóa phần tử.</li>
  <li>Việc xây dựng heap từ $n$ phần tử đầu vào có thể được tối ưu xuống còn $O(n)$, một kết quả rất hiệu quả.</li>
  <li>Top-k là một bài toán thuật toán kinh điển, có thể được giải hiệu quả bằng heap với độ phức tạp thời gian $O(n \\log k)$.</li>
</ul>

<h2>Hỏi &amp; Đáp</h2>
<p><strong>Hỏi: Thuật ngữ "heap" trong Cấu trúc dữ liệu có phải là cùng một khái niệm với "heap" trong quản lý bộ nhớ không?</strong></p>
<p>Chúng không hề giống nhau; đây chỉ là một sự trùng hợp về tên gọi. Trong hệ thống máy tính, heap là một phần của bộ cấp phát bộ nhớ động, và các chương trình có thể sử dụng nó để lưu trữ dữ liệu trong thời gian chạy. Một chương trình có thể yêu cầu một lượng bộ nhớ heap nhất định để lưu trữ các cấu trúc phức tạp như đối tượng và mảng. Khi dữ liệu không còn cần thiết nữa, chương trình phải giải phóng bộ nhớ đó để tránh rò rỉ bộ nhớ (memory leak). So với bộ nhớ ngăn xếp (stack memory), bộ nhớ heap đòi hỏi được quản lý và sử dụng cẩn thận hơn; xử lý không đúng cách có thể dẫn đến các vấn đề như rò rỉ bộ nhớ và con trỏ treo (dangling pointer).</p>
`,
    originalContent: `
# Summary

### Key Review

- A heap is a complete binary tree. Depending on the property it satisfies, it can be classified as either a max heap or a min heap. The top element of a max heap (min heap) is the largest (smallest) element.
- A priority queue is a queue in which elements are dequeued according to priority, and it is typically implemented using a heap.
- Common heap operations and their corresponding time complexities include inserting an element $O(\\log n)$, removing the top element $O(\\log n)$, and accessing the top element $O(1)$.
- Complete binary trees are well-suited for array representation, so we typically use arrays to store heaps.
- Heapify operations are used to maintain the heap property and are employed in both element insertion and removal operations.
- Building a heap from $n$ input elements can be optimized to $O(n)$, which is highly efficient.
- Top-k is a classic algorithmic problem that can be solved efficiently using a heap, with a time complexity of $O(n \\log k)$.

### Q & A

**Q**: Does the term "heap" in data structures mean the same thing as "heap" in memory management?

They are not the same concept; they simply share the same name. In computer systems, the heap is part of dynamic memory allocation, and programs can use it to store data at runtime. A program can request a certain amount of heap memory to store complex structures such as objects and arrays. When the data is no longer needed, the program must release that memory to prevent memory leaks. Compared with stack memory, heap memory requires more careful management and use; improper handling can lead to problems such as memory leaks and dangling pointers.

`
  },

});
