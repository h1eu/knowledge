/* ============================================================
   Knowledge OS — DSA Module: Chương 4 - Mảng & Danh sách liên kết
   ============================================================ */

Object.assign(DSA_CONTENT, {
  'dsa-array-linkedlist-index': {
    title: 'Mảng & Danh sách liên kết',
    summary: 'Lời giới thiệu dẫn dắt vào chương Mảng và Danh sách liên kết — hai cấu trúc dữ liệu nền tảng đại diện cho hai cách lưu trữ vật lý.',
    tags: ['dsa', 'array', 'linkedlist'],
    domain: 'Algorithms',
    module: 'Chương 4: Mảng & Danh sách liên kết',
    prerequisites: ['dsa-structures-summary'],
    related: ['dsa-array'],
    updatedAt: '2026-07-18',
    readTime: '1 phút',
    content: `

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/chapter_array_and_linkedlist.jpg" alt="Mảng & Danh sách liên kết" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<div class="callout callout-note">
  <span class="callout-icon">✨</span>
  <div class="callout-body">
    <p>Thế giới của cấu trúc dữ liệu giống như một bức tường gạch vững chắc.</p>
    <p>Những viên gạch của mảng được xếp ngay ngắn, viên nọ ép sát viên kia. Còn những viên gạch của danh sách liên kết thì nằm rải rác khắp nơi, với những sợi dây leo kết nối tự do đan xen qua các khe hở giữa chúng.</p>
  </div>
</div>

`,
    originalContent: `
# Arrays and Linked Lists

![Arrays and Linked Lists](../assets/covers/chapter_array_and_linkedlist.jpg)

!!! abstract

    The world of data structures is like a solid brick wall.

    The bricks of an array are neatly aligned, each pressed tightly against the next. The bricks of a linked list are scattered about, with connecting vines weaving freely through the gaps between them.

`
  },

  'dsa-array': {
    title: '4.1 Array (Mảng)',
    summary: 'Tìm hiểu Mảng (Array) — cấu trúc dữ liệu tuyến tính lưu trữ các phần tử cùng kiểu trong vùng nhớ liên tục, cùng các thao tác cơ bản, ưu nhược điểm và ứng dụng, kèm mô phỏng tương tác chèn/xóa/mở rộng mảng.',
    tags: ['dsa', 'array'],
    domain: 'Algorithms',
    module: 'Chương 4: Mảng & Danh sách liên kết',
    prerequisites: ['dsa-array-linkedlist-index'],
    related: ['dsa-linked-list', 'dsa-list'],
    updatedAt: '2026-07-18',
    readTime: '10 phút',
    content: `

<h2>4.1.1 Định nghĩa Mảng</h2>
<p><strong>Mảng (Array)</strong> là một cấu trúc dữ liệu tuyến tính lưu trữ các phần tử cùng kiểu trong vùng nhớ liên tục. Vị trí của một phần tử trong mảng được gọi là <strong>chỉ mục (index)</strong> của phần tử đó. Hình dưới đây minh họa các khái niệm chính và phương thức lưu trữ của mảng.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/array_definition.png" alt="Định nghĩa và phương thức lưu trữ của mảng" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>4.1.2 Các thao tác phổ biến trên Mảng</h2>

<h3>4.1.2.1 Khởi tạo Mảng</h3>
<p>Chúng ta có thể chọn giữa hai cách khởi tạo mảng tùy theo nhu cầu: có hoặc không có giá trị ban đầu. Khi không chỉ định giá trị ban đầu, hầu hết các ngôn ngữ lập trình sẽ khởi tạo các phần tử mảng về $0$:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code># Khởi tạo mảng
arr: list[int] = [0] * 5  # [ 0, 0, 0, 0, 0 ]
nums: list[int] = [1, 3, 2, 5, 4]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Khởi tạo mảng */
// Lưu trên stack
int arr[5];
int nums[5] = { 1, 3, 2, 5, 4 };
// Lưu trên heap (cần giải phóng bộ nhớ thủ công)
int* arr1 = new int[5];
int* nums1 = new int[5] { 1, 3, 2, 5, 4 };</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Khởi tạo mảng */
int[] arr = new int[5]; // { 0, 0, 0, 0, 0 }
int[] nums = { 1, 3, 2, 5, 4 };</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Khởi tạo mảng */
var arr = new Array(5).fill(0);
var nums = [1, 3, 2, 5, 4];</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Khởi tạo mảng */
var arr = IntArray(5) // { 0, 0, 0, 0, 0 }
var nums = intArrayOf(1, 3, 2, 5, 4)</code></pre></div></div></div>

<h3>4.1.2.2 Truy cập phần tử</h3>
<p>Các phần tử mảng được lưu trữ trong vùng nhớ liên tục, điều này có nghĩa là việc tính toán địa chỉ bộ nhớ của các phần tử mảng rất dễ dàng. Cho trước địa chỉ bộ nhớ của mảng (địa chỉ bộ nhớ của phần tử đầu tiên) và chỉ mục của một phần tử, chúng ta có thể sử dụng công thức như hình dưới đây để tính trực tiếp địa chỉ bộ nhớ của phần tử đó và truy cập nó.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/array_memory_location_calculation.png" alt="Tính toán địa chỉ bộ nhớ của phần tử mảng" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Quan sát hình trên, chúng ta nhận thấy phần tử đầu tiên của mảng có chỉ mục là $0$, điều này có vẻ phản trực giác vì đếm từ $1$ sẽ tự nhiên hơn. Tuy nhiên, xét từ góc độ công thức tính địa chỉ, <strong>chỉ mục thực chất là độ lệch (offset) so với địa chỉ bộ nhớ gốc</strong>. Độ lệch địa chỉ của phần tử đầu tiên là $0$, vì vậy chỉ mục của nó là $0$ là hoàn toàn hợp lý.</p>
<p>Việc truy cập các phần tử trong mảng có hiệu suất rất cao; chúng ta có thể truy cập ngẫu nhiên bất kỳ phần tử nào trong mảng trong thời gian $O(1)$.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def random_access(nums: list[int]) -&gt; int:
    """Truy cập ngẫu nhiên phần tử"""
    # Chọn ngẫu nhiên một chỉ mục trong khoảng [0, len(nums)-1]
    random_index = random.randint(0, len(nums) - 1)
    # Lấy và trả về phần tử ngẫu nhiên
    random_num = nums[random_index]
    return random_num</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Truy cập ngẫu nhiên phần tử */
int randomAccess(int *nums, int size) {
    // Chọn ngẫu nhiên một chỉ mục trong khoảng [0, size)
    int randomIndex = rand() % size;
    // Lấy và trả về phần tử ngẫu nhiên
    int randomNum = nums[randomIndex];
    return randomNum;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Truy cập ngẫu nhiên phần tử */
static int randomAccess(int[] nums) {
    // Chọn ngẫu nhiên một chỉ mục trong khoảng [0, nums.length)
    int randomIndex = ThreadLocalRandom.current().nextInt(0, nums.length);
    // Lấy và trả về phần tử ngẫu nhiên
    int randomNum = nums[randomIndex];
    return randomNum;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Truy cập ngẫu nhiên phần tử */
function randomAccess(nums) {
    // Chọn ngẫu nhiên một chỉ mục trong khoảng [0, nums.length)
    const random_index = Math.floor(Math.random() * nums.length);
    // Lấy và trả về phần tử ngẫu nhiên
    const random_num = nums[random_index];
    return random_num;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Truy cập ngẫu nhiên phần tử */
fun randomAccess(nums: IntArray): Int {
    // Chọn ngẫu nhiên một chỉ mục trong khoảng [0, nums.size)
    val randomIndex = ThreadLocalRandom.current().nextInt(0, nums.size)
    // Lấy và trả về phần tử ngẫu nhiên
    val randomNum = nums[randomIndex]
    return randomNum
}</code></pre></div></div></div>

<h3>4.1.2.3 Chèn phần tử</h3>
<p>Các phần tử mảng được xếp chặt sít nhau trong bộ nhớ, không có khoảng trống thừa giữa chúng để chứa thêm dữ liệu. Như minh họa trong hình dưới đây, nếu chúng ta muốn chèn một phần tử vào giữa mảng, chúng ta cần dịch chuyển tất cả các phần tử phía sau sang phải một vị trí rồi mới gán giá trị tại chỉ mục đó.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/array_insert_element.png" alt="Ví dụ chèn phần tử vào mảng" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Cần lưu ý rằng do độ dài mảng là cố định, việc chèn phần tử chắc chắn sẽ đẩy phần tử cuối cùng ra ngoài mảng. Chúng ta sẽ để giải pháp cho vấn đề này trong phần thảo luận ở mục "List".</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def insert(nums: list[int], num: int, index: int):
    """Chèn phần tử num vào chỉ mục index trong mảng"""
    # Dịch chuyển tất cả phần tử từ chỉ mục index trở đi sang phải một vị trí
    for i in range(len(nums) - 1, index, -1):
        nums[i] = nums[i - 1]
    # Gán num cho phần tử tại chỉ mục index
    nums[index] = num</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Chèn phần tử num vào chỉ mục index trong mảng */
void insert(int *nums, int size, int num, int index) {
    // Dịch chuyển tất cả phần tử từ chỉ mục index trở đi sang phải một vị trí
    for (int i = size - 1; i &gt; index; i--) {
        nums[i] = nums[i - 1];
    }
    // Gán num cho phần tử tại chỉ mục index
    nums[index] = num;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Chèn phần tử num vào chỉ mục index trong mảng */
static void insert(int[] nums, int num, int index) {
    // Dịch chuyển tất cả phần tử từ chỉ mục index trở đi sang phải một vị trí
    for (int i = nums.length - 1; i &gt; index; i--) {
        nums[i] = nums[i - 1];
    }
    // Gán num cho phần tử tại chỉ mục index
    nums[index] = num;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Chèn phần tử num vào chỉ mục index trong mảng */
function insert(nums, num, index) {
    // Dịch chuyển tất cả phần tử từ chỉ mục index trở đi sang phải một vị trí
    for (let i = nums.length - 1; i &gt; index; i--) {
        nums[i] = nums[i - 1];
    }
    // Gán num cho phần tử tại chỉ mục index
    nums[index] = num;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Chèn phần tử num vào chỉ mục index trong mảng */
fun insert(nums: IntArray, num: Int, index: Int) {
    // Dịch chuyển tất cả phần tử từ chỉ mục index trở đi sang phải một vị trí
    for (i in nums.size - 1 downTo index + 1) {
        nums[i] = nums[i - 1]
    }
    // Gán num cho phần tử tại chỉ mục index
    nums[index] = num
}</code></pre></div></div></div>

<h3>4.1.2.4 Xóa phần tử</h3>
<p>Tương tự, như hình dưới đây, để xóa phần tử tại chỉ mục $i$, chúng ta cần dịch chuyển tất cả các phần tử sau chỉ mục $i$ về phía trước một vị trí.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/array_remove_element.png" alt="Ví dụ xóa phần tử khỏi mảng" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Lưu ý rằng sau khi xóa xong, phần tử cuối cùng ban đầu không còn ý nghĩa, vì vậy chúng ta không cần phải sửa đổi nó một cách tường minh.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def remove(nums: list[int], index: int):
    """Xóa phần tử tại chỉ mục index"""
    # Dịch chuyển tất cả phần tử sau chỉ mục index sang trái một vị trí
    for i in range(index, len(nums) - 1):
        nums[i] = nums[i + 1]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Xóa phần tử tại chỉ mục index */
void remove(int *nums, int size, int index) {
    // Dịch chuyển tất cả phần tử sau chỉ mục index sang trái một vị trí
    for (int i = index; i &lt; size - 1; i++) {
        nums[i] = nums[i + 1];
    }
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Xóa phần tử tại chỉ mục index */
static void remove(int[] nums, int index) {
    // Dịch chuyển tất cả phần tử sau chỉ mục index sang trái một vị trí
    for (int i = index; i &lt; nums.length - 1; i++) {
        nums[i] = nums[i + 1];
    }
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Xóa phần tử tại chỉ mục index */
function remove(nums, index) {
    // Dịch chuyển tất cả phần tử sau chỉ mục index sang trái một vị trí
    for (let i = index; i &lt; nums.length - 1; i++) {
        nums[i] = nums[i + 1];
    }
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Xóa phần tử tại chỉ mục index */
fun remove(nums: IntArray, index: Int) {
    // Dịch chuyển tất cả phần tử sau chỉ mục index sang trái một vị trí
    for (i in index..&lt;nums.size - 1) {
        nums[i] = nums[i + 1]
    }
}</code></pre></div></div></div>
<p>Nhìn chung, các thao tác chèn và xóa trên mảng có những nhược điểm sau:</p>
<ul>
  <li><strong>Độ phức tạp thời gian cao:</strong> Độ phức tạp thời gian trung bình cho cả thao tác chèn và xóa trong mảng là $O(n)$, trong đó $n$ là độ dài của mảng.</li>
  <li><strong>Mất phần tử:</strong> Do độ dài mảng là bất biến, sau khi chèn một phần tử, các phần tử vượt quá độ dài mảng sẽ bị mất.</li>
  <li><strong>Lãng phí bộ nhớ:</strong> Chúng ta có thể khởi tạo một mảng tương đối dài và chỉ sử dụng phần đầu, khi đó các phần tử cuối bị ghi đè chỉ là những vị trí giữ chỗ không dùng đến, nhưng điều này lãng phí một phần không gian bộ nhớ.</li>
</ul>


<div class="interactive-widget-wrapper" id="array-ops-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'array-ops-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'array-ops-wrapper', 'tab-interactive'); initArrayOpsDemo()">⚡ Mô phỏng tương tác</button>
  </div>

  <div class="widget-tab-content active" data-tab="tab-static">
    <div style="display:flex; gap: 1em; flex-wrap: wrap; justify-content: center;">
      <div style="flex: 1 1 260px; text-align:center;">
        <img src="dsa-assets/array_insert_element.png" alt="Ví dụ chèn phần tử vào mảng" style="max-width:100%; border-radius: var(--radius-md);" />
        <p style="font-size: 13px; color: var(--text-secondary);">Chèn phần tử vào mảng</p>
      </div>
      <div style="flex: 1 1 260px; text-align:center;">
        <img src="dsa-assets/array_remove_element.png" alt="Ví dụ xóa phần tử khỏi mảng" style="max-width:100%; border-radius: var(--radius-md);" />
        <p style="font-size: 13px; color: var(--text-secondary);">Xóa phần tử khỏi mảng</p>
      </div>
    </div>
  </div>

  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="array-ops-canvas" style="display:flex; gap:6px; flex-wrap:wrap; justify-content:center; min-height: 70px; align-items:flex-end; padding: 10px;"></div>
    <div class="simulator-controls" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 15px;">
      <button class="control-btn" id="array-ops-btn-autorun" onclick="autoRunArrayOps()">▶ Auto Run</button>
      <button class="control-btn" id="array-ops-btn-step" onclick="stepArrayOps()">Bước tiếp theo ▶</button>
      <button class="control-btn" id="array-ops-btn-pause" onclick="pauseRunArrayOps()" disabled>⏸ Dừng</button>
      <button class="control-btn btn-secondary" id="array-ops-btn-reset" onclick="initArrayOpsDemo()">↺ Reset</button>
    </div>
    <div id="array-ops-speed-control" style="text-align:center; font-size: 13px; color: var(--text-secondary); margin-top: 12px;">
      Tốc độ: <input type="range" min="200" max="2000" value="900" step="200" oninput="setArrayOpsSpeed(this.value)" /> <span id="array-ops-speed-label">900ms</span>
    </div>
    <div id="array-ops-status" class="simulator-status" style="margin-top: 12px; font-size: 14px; text-align: center; color: var(--text-secondary);">
      Nhấp "Auto Run" hoặc "Bước tiếp theo" để xem mô phỏng mở rộng, chèn và xóa phần tử trên mảng nums = [1, 3, 2, 5, 4].
    </div>
  </div>
</div>


<h3>4.1.2.5 Duyệt Mảng</h3>
<p>Trong hầu hết các ngôn ngữ lập trình, chúng ta có thể duyệt mảng bằng chỉ mục hoặc bằng cách lặp trực tiếp qua từng phần tử trong mảng:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def traverse(nums: list[int]):
    """Duyệt mảng"""
    count = 0
    # Duyệt mảng theo chỉ mục
    for i in range(len(nums)):
        count += nums[i]
    # Duyệt trực tiếp các phần tử mảng
    for num in nums:
        count += num
    # Duyệt đồng thời chỉ mục và phần tử
    for i, num in enumerate(nums):
        count += nums[i]
        count += num</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Duyệt mảng */
void traverse(int *nums, int size) {
    int count = 0;
    // Duyệt mảng theo chỉ mục
    for (int i = 0; i &lt; size; i++) {
        count += nums[i];
    }
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Duyệt mảng */
static void traverse(int[] nums) {
    int count = 0;
    // Duyệt mảng theo chỉ mục
    for (int i = 0; i &lt; nums.length; i++) {
        count += nums[i];
    }
    // Duyệt trực tiếp các phần tử mảng
    for (int num : nums) {
        count += num;
    }
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Duyệt mảng */
function traverse(nums) {
    let count = 0;
    // Duyệt mảng theo chỉ mục
    for (let i = 0; i &lt; nums.length; i++) {
        count += nums[i];
    }
    // Duyệt trực tiếp các phần tử mảng
    for (const num of nums) {
        count += num;
    }
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Duyệt mảng */
fun traverse(nums: IntArray) {
    var count = 0
    // Duyệt mảng theo chỉ mục
    for (i in nums.indices) {
        count += nums[i]
    }
    // Duyệt trực tiếp các phần tử mảng
    for (j in nums) {
        count += j
    }
}</code></pre></div></div></div>

<h3>4.1.2.6 Tìm kiếm phần tử</h3>
<p>Để tìm một phần tử cụ thể trong mảng, cần duyệt qua mảng và kiểm tra xem giá trị phần tử có khớp không trong mỗi lần lặp; nếu khớp, xuất chỉ mục tương ứng.</p>
<p>Vì mảng là cấu trúc dữ liệu tuyến tính, thao tác tìm kiếm trên được gọi là <strong>"tìm kiếm tuyến tính" (linear search)</strong>.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def find(nums: list[int], target: int) -&gt; int:
    """Tìm phần tử được chỉ định trong mảng"""
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm phần tử được chỉ định trong mảng */
int find(int *nums, int size, int target) {
    for (int i = 0; i &lt; size; i++) {
        if (nums[i] == target)
            return i;
    }
    return -1;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Tìm phần tử được chỉ định trong mảng */
static int find(int[] nums, int target) {
    for (int i = 0; i &lt; nums.length; i++) {
        if (nums[i] == target)
            return i;
    }
    return -1;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Tìm phần tử được chỉ định trong mảng */
function find(nums, target) {
    for (let i = 0; i &lt; nums.length; i++) {
        if (nums[i] === target) return i;
    }
    return -1;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Tìm phần tử được chỉ định trong mảng */
fun find(nums: IntArray, target: Int): Int {
    for (i in nums.indices) {
        if (nums[i] == target)
            return i
    }
    return -1
}</code></pre></div></div></div>

<h3>4.1.2.7 Mở rộng Mảng</h3>
<p>Trong môi trường hệ thống phức tạp, chương trình không thể đảm bảo vùng nhớ sau mảng là khả dụng, khiến việc mở rộng dung lượng mảng trở nên không an toàn. Do đó, trong hầu hết các ngôn ngữ lập trình, <strong>độ dài mảng là bất biến</strong>.</p>
<p>Nếu muốn mở rộng mảng, chúng ta cần tạo một mảng mới lớn hơn rồi sao chép từng phần tử từ mảng gốc sang mảng mới. Đây là thao tác $O(n)$, rất tốn thời gian khi mảng lớn. Đoạn mã dưới đây minh họa việc này:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def extend(nums: list[int], enlarge: int) -&gt; list[int]:
    """Mở rộng độ dài mảng"""
    # Khởi tạo một mảng có độ dài đã mở rộng
    res = [0] * (len(nums) + enlarge)
    # Sao chép tất cả phần tử từ mảng gốc sang mảng mới
    for i in range(len(nums)):
        res[i] = nums[i]
    # Trả về mảng mới đã mở rộng
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Mở rộng độ dài mảng */
int *extend(int *nums, int size, int enlarge) {
    // Khởi tạo một mảng có độ dài đã mở rộng
    int *res = new int[size + enlarge];
    // Sao chép tất cả phần tử từ mảng gốc sang mảng mới
    for (int i = 0; i &lt; size; i++) {
        res[i] = nums[i];
    }
    // Giải phóng bộ nhớ
    delete[] nums;
    // Trả về mảng mới đã mở rộng
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Mở rộng độ dài mảng */
static int[] extend(int[] nums, int enlarge) {
    // Khởi tạo một mảng có độ dài đã mở rộng
    int[] res = new int[nums.length + enlarge];
    // Sao chép tất cả phần tử từ mảng gốc sang mảng mới
    for (int i = 0; i &lt; nums.length; i++) {
        res[i] = nums[i];
    }
    // Trả về mảng mới đã mở rộng
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Mở rộng độ dài mảng */
function extend(nums, enlarge) {
    // Khởi tạo một mảng có độ dài đã mở rộng
    const res = new Array(nums.length + enlarge).fill(0);
    // Sao chép tất cả phần tử từ mảng gốc sang mảng mới
    for (let i = 0; i &lt; nums.length; i++) {
        res[i] = nums[i];
    }
    // Trả về mảng mới đã mở rộng
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Mở rộng độ dài mảng */
fun extend(nums: IntArray, enlarge: Int): IntArray {
    // Khởi tạo một mảng có độ dài đã mở rộng
    val res = IntArray(nums.size + enlarge)
    // Sao chép tất cả phần tử từ mảng gốc sang mảng mới
    for (i in nums.indices) {
        res[i] = nums[i]
    }
    // Trả về mảng mới đã mở rộng
    return res
}</code></pre></div></div></div>

<h2>4.1.3 Ưu điểm và hạn chế của Mảng</h2>
<p>Mảng được lưu trữ trong vùng nhớ liên tục với các phần tử cùng kiểu. Cách tiếp cận này chứa nhiều thông tin tiên nghiệm mà hệ thống có thể sử dụng để tối ưu hóa hiệu suất các thao tác trên cấu trúc dữ liệu.</p>
<ul>
  <li><strong>Hiệu suất không gian cao:</strong> Mảng phân bổ các khối bộ nhớ liên tục cho dữ liệu mà không cần thêm chi phí cấu trúc.</li>
  <li><strong>Hỗ trợ truy cập ngẫu nhiên:</strong> Mảng cho phép truy cập bất kỳ phần tử nào trong thời gian $O(1)$.</li>
  <li><strong>Tính cục bộ bộ nhớ đệm (cache locality):</strong> Khi truy cập các phần tử mảng, máy tính không chỉ tải phần tử đó mà còn nạp cache dữ liệu xung quanh, từ đó tận dụng cache để tăng tốc độ thực thi các thao tác tiếp theo.</li>
</ul>
<p>Tuy nhiên, lưu trữ không gian liên tục là con dao hai lưỡi với các hạn chế sau:</p>
<ul>
  <li><strong>Hiệu suất chèn và xóa thấp:</strong> Khi mảng có nhiều phần tử, thao tác chèn và xóa yêu cầu dịch chuyển một lượng lớn phần tử.</li>
  <li><strong>Độ dài bất biến:</strong> Sau khi mảng được khởi tạo, độ dài của nó là cố định. Mở rộng mảng yêu cầu sao chép toàn bộ dữ liệu sang mảng mới, chi phí rất cao.</li>
  <li><strong>Lãng phí không gian:</strong> Nếu kích thước phân bổ của mảng vượt quá nhu cầu thực tế, phần dư thừa bị lãng phí.</li>
</ul>

<h2>4.1.4 Ứng dụng điển hình của Mảng</h2>
<p>Mảng là cấu trúc dữ liệu cơ bản và phổ biến, thường xuyên được sử dụng trong các giải thuật đa dạng và để triển khai nhiều cấu trúc dữ liệu phức tạp khác.</p>
<ul>
  <li><strong>Truy cập ngẫu nhiên:</strong> Nếu muốn lấy mẫu ngẫu nhiên một số mục, có thể dùng mảng để lưu trữ chúng và sinh dãy ngẫu nhiên để lấy mẫu dựa trên chỉ mục.</li>
  <li><strong>Sắp xếp và tìm kiếm:</strong> Mảng là cấu trúc dữ liệu phổ biến nhất cho các giải thuật sắp xếp và tìm kiếm. Quick Sort, Merge Sort, Binary Search, v.v. chủ yếu được thực hiện trên mảng.</li>
  <li><strong>Bảng tra cứu (lookup table):</strong> Khi cần tra cứu nhanh một phần tử hoặc mối quan hệ tương ứng, có thể dùng mảng làm bảng tra cứu. Ví dụ: nếu muốn triển khai ánh xạ từ ký tự sang mã ASCII, có thể dùng giá trị mã ASCII của ký tự làm chỉ mục, phần tử tương ứng được lưu tại vị trí đó trong mảng.</li>
  <li><strong>Học máy (machine learning):</strong> Mạng nơ-ron sử dụng rộng rãi các phép toán đại số tuyến tính giữa vector, ma trận và tensor — tất cả đều được xây dựng dưới dạng mảng. Mảng là cấu trúc dữ liệu được sử dụng phổ biến nhất trong lập trình mạng nơ-ron.</li>
  <li><strong>Triển khai cấu trúc dữ liệu:</strong> Mảng có thể được dùng để triển khai Stack, Queue, Hash Table, Heap, Graph và nhiều cấu trúc dữ liệu khác. Ví dụ, biểu diễn ma trận kề (adjacency matrix) của đồ thị về bản chất là một mảng hai chiều.</li>
</ul>

`,
    originalContent: `
# Array

An <u>array</u> is a linear data structure that stores elements of the same type in contiguous memory space. The position of an element in the array is called the element's <u>index</u>. The figure below illustrates the main concepts and storage method of arrays.

![Array definition and storage method](array.assets/array_definition.png)

## Common Array Operations

### Initializing Arrays

We can choose between two array initialization methods based on our needs: with or without initial values. When no initial values are specified, most programming languages initialize array elements to $0$:

=== "Python"

    \`\`\`python title="array.py"
    # Initialize array
    arr: list[int] = [0] * 5  # [ 0, 0, 0, 0, 0 ]
    nums: list[int] = [1, 3, 2, 5, 4]
    \`\`\`

=== "C++"

    \`\`\`cpp title="array.cpp"
    /* Initialize array */
    // Stored on stack
    int arr[5];
    int nums[5] = { 1, 3, 2, 5, 4 };
    // Stored on heap (requires manual memory release)
    int* arr1 = new int[5];
    int* nums1 = new int[5] { 1, 3, 2, 5, 4 };
    \`\`\`

=== "Java"

    \`\`\`java title="array.java"
    /* Initialize array */
    int[] arr = new int[5]; // { 0, 0, 0, 0, 0 }
    int[] nums = { 1, 3, 2, 5, 4 };
    \`\`\`

=== "C#"

    \`\`\`csharp title="array.cs"
    /* Initialize array */
    int[] arr = new int[5]; // [ 0, 0, 0, 0, 0 ]
    int[] nums = [1, 3, 2, 5, 4];
    \`\`\`

=== "Go"

    \`\`\`go title="array.go"
    /* Initialize array */
    var arr [5]int
    // In Go, specifying length ([5]int) creates an array; not specifying length ([]int) creates a slice
    // Since Go's arrays are designed to have their length determined at compile time, only constants can be used to specify the length
    // For convenience in implementing the extend() method, slices are treated as arrays below
    nums := []int{1, 3, 2, 5, 4}
    \`\`\`

=== "Swift"

    \`\`\`swift title="array.swift"
    /* Initialize array */
    let arr = Array(repeating: 0, count: 5) // [0, 0, 0, 0, 0]
    let nums = [1, 3, 2, 5, 4]
    \`\`\`

=== "JS"

    \`\`\`javascript title="array.js"
    /* Initialize array */
    var arr = new Array(5).fill(0);
    var nums = [1, 3, 2, 5, 4];
    \`\`\`

=== "TS"

    \`\`\`typescript title="array.ts"
    /* Initialize array */
    let arr: number[] = new Array(5).fill(0);
    let nums: number[] = [1, 3, 2, 5, 4];
    \`\`\`

=== "Dart"

    \`\`\`dart title="array.dart"
    /* Initialize array */
    List<int> arr = List.filled(5, 0); // [0, 0, 0, 0, 0]
    List<int> nums = [1, 3, 2, 5, 4];
    \`\`\`

=== "Rust"

    \`\`\`rust title="array.rs"
    /* Initialize array */
    let arr: [i32; 5] = [0; 5]; // [0, 0, 0, 0, 0]
    let slice: &[i32] = &[0; 5];
    // In Rust, specifying length ([i32; 5]) creates an array; not specifying length (&[i32]) creates a slice
    // Since Rust's arrays are designed to have their length determined at compile time, only constants can be used to specify the length
    // Vector is the type generally used as a dynamic array in Rust
    // For convenience in implementing the extend() method, vectors are treated as arrays below
    let nums: Vec<i32> = vec![1, 3, 2, 5, 4];
    \`\`\`

=== "C"

    \`\`\`c title="array.c"
    /* Initialize array */
    int arr[5] = { 0 }; // { 0, 0, 0, 0, 0 }
    int nums[5] = { 1, 3, 2, 5, 4 };
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="array.kt"
    /* Initialize array */
    var arr = IntArray(5) // { 0, 0, 0, 0, 0 }
    var nums = intArrayOf(1, 3, 2, 5, 4)
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="array.rb"
    # Initialize array
    arr = Array.new(5, 0)
    nums = [1, 3, 2, 5, 4]
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E6%95%B0%E7%BB%84%0Aarr%20%3D%20%5B0%5D%20*%205%20%20%23%20%5B%200,%200,%200,%200,%200%20%5D%0Anums%20%3D%20%5B1,%203,%202,%205,%204%5D&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

### Accessing Elements

Array elements are stored in contiguous memory space, which means calculating the memory address of array elements is very easy. Given the array's memory address (the memory address of the first element) and an element's index, we can use the formula shown in the figure below to calculate the element's memory address and directly access that element.

![Memory address calculation for array elements](array.assets/array_memory_location_calculation.png)

Observing the figure above, we find that the first element of an array has an index of $0$, which may seem counterintuitive since counting from $1$ would be more natural. However, from the perspective of the address calculation formula, **an index is essentially an offset from the memory address**. The address offset of the first element is $0$, so it is reasonable for its index to be $0$.

Accessing elements in an array is highly efficient; we can randomly access any element in the array in $O(1)$ time.

\`\`\`src
[file]{array}-[class]{}-[func]{random_access}
\`\`\`

### Inserting Elements

Array elements are packed tightly together in memory, with no extra space between them for additional data. As shown in the figure below, if we want to insert an element in the middle of an array, we need to shift all subsequent elements one position to the right and then assign the value at that index.

![Example of inserting an element into an array](array.assets/array_insert_element.png)

It is worth noting that since the length of an array is fixed, inserting an element will inevitably push the last element out of the array. We will leave the solution to this problem for discussion in the "List" chapter.

\`\`\`src
[file]{array}-[class]{}-[func]{insert}
\`\`\`

### Removing Elements

Similarly, as shown in the figure below, to delete the element at index $i$, we need to shift all elements after index $i$ forward by one position.

![Example of removing an element from an array](array.assets/array_remove_element.png)

Note that after the deletion is complete, the original last element is no longer meaningful, so we do not need to modify it explicitly.

\`\`\`src
[file]{array}-[class]{}-[func]{remove}
\`\`\`

Overall, array insertion and deletion operations have the following drawbacks:

- **High time complexity**: The average time complexity for both insertion and deletion in arrays is $O(n)$, where $n$ is the length of the array.
- **Loss of elements**: Since the length of an array is immutable, after inserting an element, elements that exceed the array's length will be lost.
- **Memory waste**: We can initialize a relatively long array and use only the front portion, so that any overwritten tail elements are merely unused placeholders, but this wastes some memory space.

### Traversing Arrays

In most programming languages, we can traverse an array either by index or by directly iterating through each element in the array:

\`\`\`src
[file]{array}-[class]{}-[func]{traverse}
\`\`\`

### Finding Elements

Finding a specified element in an array requires traversing the array and checking whether the element value matches in each iteration; if it matches, output the corresponding index.

Since an array is a linear data structure, the above search operation is called a "linear search".

\`\`\`src
[file]{array}-[class]{}-[func]{find}
\`\`\`

### Expanding Arrays

In complex system environments, programs cannot guarantee that the memory space after an array is available, making it unsafe to expand the array's capacity. Therefore, in most programming languages, **the length of an array is immutable**.

If we want to expand an array, we need to create a new, larger array and then copy the original array elements to the new array one by one. This is an $O(n)$ operation, which is very time-consuming when the array is large. The code is shown below:

\`\`\`src
[file]{array}-[class]{}-[func]{extend}
\`\`\`

## Advantages and Limitations of Arrays

Arrays are stored in contiguous memory space with elements of the same type. This approach contains rich prior information that the system can use to optimize the efficiency of data structure operations.

- **High space efficiency**: Arrays allocate contiguous memory blocks for data without additional structural overhead.
- **Support for random access**: Arrays allow accessing any element in $O(1)$ time.
- **Cache locality**: When accessing array elements, the computer not only loads the element but also caches the surrounding data, thereby leveraging the cache to improve the execution speed of subsequent operations.

Contiguous space storage is a double-edged sword with the following limitations:

- **Low insertion and deletion efficiency**: When an array has many elements, insertion and deletion operations require shifting a large number of elements.
- **Immutable length**: After an array is initialized, its length is fixed. Expanding the array requires copying all data to a new array, which is very costly.
- **Space waste**: If the allocated size of an array exceeds what is actually needed, the extra space is wasted.

## Typical Applications of Arrays

Arrays are a fundamental and common data structure, frequently used in various algorithms and for implementing various complex data structures.

- **Random access**: If we want to randomly sample some items, we can use an array to store them and generate a random sequence to implement random sampling based on indices.
- **Sorting and searching**: Arrays are the most commonly used data structure for sorting and searching algorithms. Quick sort, merge sort, binary search, and others are primarily performed on arrays.
- **Lookup tables**: When we need to quickly find an element or its corresponding relationship, we can use an array as a lookup table. For example, if we want to implement a mapping from characters to ASCII codes, we can use the ASCII code value of a character as an index, with the corresponding element stored at that position in the array.
- **Machine learning**: Neural networks make extensive use of linear algebra operations between vectors, matrices, and tensors, all of which are constructed in the form of arrays. Arrays are the most commonly used data structure in neural network programming.
- **Data structure implementation**: Arrays can be used to implement stacks, queues, hash tables, heaps, graphs, and other data structures. For example, the adjacency matrix representation of a graph is essentially a two-dimensional array.

`
  },

  'dsa-linked-list': {
    title: '4.2 Linked List (Danh sách liên kết)',
    summary: 'Tìm hiểu Danh sách liên kết (Linked List) — cấu trúc dữ liệu tuyến tính lưu trữ phần tử phân tán trong bộ nhớ và liên kết qua tham chiếu, cùng các thao tác chèn/xóa/truy cập/tìm kiếm, so sánh với Mảng, các loại danh sách liên kết phổ biến và ứng dụng thực tế.',
    tags: ['dsa', 'linkedlist'],
    domain: 'Algorithms',
    module: 'Chương 4: Mảng & Danh sách liên kết',
    prerequisites: ['dsa-array'],
    related: ['dsa-array', 'dsa-list'],
    updatedAt: '2026-07-18',
    readTime: '11 phút',
    content: `

<h2>4.2.1 Định nghĩa Danh sách liên kết</h2>
<p>Bộ nhớ là tài nguyên dùng chung cho tất cả các chương trình. Trong một môi trường thực thi phức tạp, vùng nhớ trống có thể nằm rải rác khắp không gian địa chỉ. Chúng ta biết rằng mảng yêu cầu vùng nhớ liên tục, và khi mảng rất lớn, hệ thống có thể không cung cấp được một khối nhớ liên tục lớn như vậy. Đây chính là lúc tính linh hoạt của danh sách liên kết trở nên rõ ràng.</p>
<p>Một <strong>danh sách liên kết (linked list)</strong> là một cấu trúc dữ liệu tuyến tính, trong đó mỗi phần tử là một đối tượng node, và các node được kết nối với nhau thông qua "tham chiếu". Một tham chiếu ghi lại địa chỉ bộ nhớ của node kế tiếp, nhờ đó có thể truy cập node kế tiếp từ node hiện tại.</p>
<p>Thiết kế này cho phép các node của danh sách liên kết được lưu trữ tại nhiều vị trí khác nhau trong bộ nhớ, và địa chỉ của chúng không cần phải liên tục.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/linkedlist_definition.png" alt="Định nghĩa và phương thức lưu trữ của danh sách liên kết" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Quan sát hình trên, đơn vị cơ bản của danh sách liên kết là đối tượng <strong>node (nút)</strong>. Mỗi node chứa hai phần dữ liệu: "giá trị" của node và "tham chiếu" đến node kế tiếp.</p>
<ul>
  <li>Node đầu tiên của danh sách liên kết được gọi là "node đầu" (head node), node cuối cùng được gọi là "node cuối" (tail node).</li>
  <li>Node cuối trỏ đến "null", được ký hiệu lần lượt là <code>null</code>, <code>nullptr</code> và <code>None</code> trong Java, C++ và Python.</li>
  <li>Trong các ngôn ngữ hỗ trợ con trỏ như C, C++, Go và Rust, "tham chiếu" nói trên nên được thay bằng "con trỏ".</li>
</ul>
<p>Như đoạn mã dưới đây, một node danh sách liên kết <code>ListNode</code> không chỉ chứa giá trị mà còn chứa thêm một tham chiếu (con trỏ). Do đó, <strong>danh sách liên kết chiếm nhiều không gian bộ nhớ hơn mảng khi lưu trữ cùng một lượng dữ liệu</strong>.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>class ListNode:
    """Lớp node của danh sách liên kết"""
    def __init__(self, val: int):
        self.val: int = val               # Giá trị của node
        self.next: ListNode | None = None # Tham chiếu (con trỏ) đến node kế tiếp</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Cấu trúc node của danh sách liên kết */
struct ListNode {
    int val;         // Giá trị của node
    ListNode *next;  // Con trỏ đến node kế tiếp
    ListNode(int x) : val(x), next(nullptr) {}  // Hàm khởi tạo
};</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Lớp node của danh sách liên kết */
class ListNode {
    int val;        // Giá trị của node
    ListNode next;  // Tham chiếu đến node kế tiếp
    ListNode(int x) { val = x; }  // Hàm khởi tạo
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Lớp node của danh sách liên kết */
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);       // Giá trị của node
        this.next = (next === undefined ? null : next); // Tham chiếu đến node kế tiếp
    }
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Lớp node của danh sách liên kết */
// Hàm khởi tạo
class ListNode(x: Int) {
    val _val: Int = x          // Giá trị của node
    val next: ListNode? = null // Tham chiếu đến node kế tiếp
}</code></pre></div></div></div>

<h2>4.2.2 Các thao tác phổ biến trên Danh sách liên kết</h2>

<h3>4.2.2.1 Khởi tạo Danh sách liên kết</h3>
<p>Việc xây dựng một danh sách liên kết gồm hai bước: đầu tiên, khởi tạo từng đối tượng node; thứ hai, xây dựng các mối quan hệ tham chiếu giữa các node. Sau khi khởi tạo xong, chúng ta có thể duyệt qua tất cả các node bắt đầu từ node đầu của danh sách liên kết thông qua tham chiếu <code>next</code>.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code># Khởi tạo danh sách liên kết 1 -&gt; 3 -&gt; 2 -&gt; 5 -&gt; 4
# Khởi tạo từng node
n0 = ListNode(1)
n1 = ListNode(3)
n2 = ListNode(2)
n3 = ListNode(5)
n4 = ListNode(4)
# Xây dựng tham chiếu giữa các node
n0.next = n1
n1.next = n2
n2.next = n3
n3.next = n4</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Khởi tạo danh sách liên kết 1 -&gt; 3 -&gt; 2 -&gt; 5 -&gt; 4 */
// Khởi tạo từng node
ListNode* n0 = new ListNode(1);
ListNode* n1 = new ListNode(3);
ListNode* n2 = new ListNode(2);
ListNode* n3 = new ListNode(5);
ListNode* n4 = new ListNode(4);
// Xây dựng tham chiếu giữa các node
n0-&gt;next = n1;
n1-&gt;next = n2;
n2-&gt;next = n3;
n3-&gt;next = n4;</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Khởi tạo danh sách liên kết 1 -&gt; 3 -&gt; 2 -&gt; 5 -&gt; 4 */
// Khởi tạo từng node
ListNode n0 = new ListNode(1);
ListNode n1 = new ListNode(3);
ListNode n2 = new ListNode(2);
ListNode n3 = new ListNode(5);
ListNode n4 = new ListNode(4);
// Xây dựng tham chiếu giữa các node
n0.next = n1;
n1.next = n2;
n2.next = n3;
n3.next = n4;</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Khởi tạo danh sách liên kết 1 -&gt; 3 -&gt; 2 -&gt; 5 -&gt; 4 */
// Khởi tạo từng node
const n0 = new ListNode(1);
const n1 = new ListNode(3);
const n2 = new ListNode(2);
const n3 = new ListNode(5);
const n4 = new ListNode(4);
// Xây dựng tham chiếu giữa các node
n0.next = n1;
n1.next = n2;
n2.next = n3;
n3.next = n4;</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Khởi tạo danh sách liên kết 1 -&gt; 3 -&gt; 2 -&gt; 5 -&gt; 4 */
// Khởi tạo từng node
val n0 = ListNode(1)
val n1 = ListNode(3)
val n2 = ListNode(2)
val n3 = ListNode(5)
val n4 = ListNode(4)
// Xây dựng tham chiếu giữa các node
n0.next = n1
n1.next = n2
n2.next = n3
n3.next = n4</code></pre></div></div></div>
<p>Một mảng là một biến duy nhất; ví dụ, mảng <code>nums</code> chứa các phần tử <code>nums[0]</code>, <code>nums[1]</code>, v.v. Ngược lại, một danh sách liên kết được cấu thành từ nhiều đối tượng node độc lập. <strong>Chúng ta thường dùng node đầu để đại diện cho toàn bộ danh sách liên kết</strong>; ví dụ, danh sách liên kết trong đoạn mã trên có thể được gọi là danh sách liên kết <code>n0</code>.</p>

<h3>4.2.2.2 Chèn Node</h3>
<p>Việc chèn một node vào danh sách liên kết rất dễ dàng. Như hình dưới đây, giả sử chúng ta muốn chèn một node mới <code>P</code> vào giữa hai node liền kề <code>n0</code> và <code>n1</code>. <strong>Chúng ta chỉ cần thay đổi hai tham chiếu (con trỏ) node</strong>, với độ phức tạp thời gian là $O(1)$.</p>
<p>Ngược lại, độ phức tạp thời gian của việc chèn một phần tử trong mảng là $O(n)$, kém hiệu quả khi xử lý lượng dữ liệu lớn.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/linkedlist_insert_node.png" alt="Ví dụ chèn node vào danh sách liên kết" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def insert(n0: ListNode, P: ListNode):
    """Chèn node P vào sau node n0 trong danh sách liên kết"""
    n1 = n0.next
    P.next = n1
    n0.next = P</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Chèn node P vào sau node n0 trong danh sách liên kết */
void insert(ListNode *n0, ListNode *P) {
    ListNode *n1 = n0-&gt;next;
    P-&gt;next = n1;
    n0-&gt;next = P;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Chèn node P vào sau node n0 trong danh sách liên kết */
static void insert(ListNode n0, ListNode P) {
    ListNode n1 = n0.next;
    P.next = n1;
    n0.next = P;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Chèn node P vào sau node n0 trong danh sách liên kết */
function insert(n0, P) {
    const n1 = n0.next;
    P.next = n1;
    n0.next = P;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Chèn node P vào sau node n0 trong danh sách liên kết */
fun insert(n0: ListNode?, p: ListNode?) {
    val n1 = n0?.next
    p?.next = n1
    n0?.next = p
}</code></pre></div></div></div>

<h3>4.2.2.3 Xóa Node</h3>
<p>Như hình dưới đây, việc xóa một node trong danh sách liên kết cũng rất thuận tiện. <strong>Chúng ta chỉ cần thay đổi tham chiếu (con trỏ) của một node</strong>.</p>
<p>Lưu ý rằng mặc dù node <code>P</code> vẫn trỏ đến <code>n1</code> sau khi thao tác xóa hoàn tất, danh sách liên kết không còn có thể truy cập <code>P</code> khi duyệt, nghĩa là <code>P</code> không còn thuộc về danh sách liên kết này nữa.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/linkedlist_remove_node.png" alt="Xóa node khỏi danh sách liên kết" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def remove(n0: ListNode):
    """Xóa node đứng ngay sau node n0 trong danh sách liên kết"""
    if not n0.next:
        return
    # n0 -&gt; P -&gt; n1
    P = n0.next
    n1 = P.next
    n0.next = n1</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Xóa node đứng ngay sau node n0 trong danh sách liên kết */
void remove(ListNode *n0) {
    if (n0-&gt;next == nullptr)
        return;
    // n0 -&gt; P -&gt; n1
    ListNode *P = n0-&gt;next;
    ListNode *n1 = P-&gt;next;
    n0-&gt;next = n1;
    // Giải phóng bộ nhớ
    delete P;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Xóa node đứng ngay sau node n0 trong danh sách liên kết */
static void remove(ListNode n0) {
    if (n0.next == null)
        return;
    // n0 -&gt; P -&gt; n1
    ListNode P = n0.next;
    ListNode n1 = P.next;
    n0.next = n1;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Xóa node đứng ngay sau node n0 trong danh sách liên kết */
function remove(n0) {
    if (!n0.next) return;
    // n0 -&gt; P -&gt; n1
    const P = n0.next;
    const n1 = P.next;
    n0.next = n1;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Xóa node đứng ngay sau node n0 trong danh sách liên kết */
fun remove(n0: ListNode?) {
    if (n0?.next == null)
        return
    // n0 -&gt; P -&gt; n1
    val p = n0.next
    val n1 = p?.next
    n0.next = n1
}</code></pre></div></div></div>


<div class="interactive-widget-wrapper" id="linked-list-ops-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'linked-list-ops-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'linked-list-ops-wrapper', 'tab-interactive'); initLinkedListOpsDemo()">⚡ Mô phỏng tương tác</button>
  </div>

  <div class="widget-tab-content active" data-tab="tab-static">
    <div style="display:flex; gap: 1em; flex-wrap: wrap; justify-content: center;">
      <div style="flex: 1 1 260px; text-align:center;">
        <img src="dsa-assets/linkedlist_insert_node.png" alt="Ví dụ chèn node vào danh sách liên kết" style="max-width:100%; border-radius: var(--radius-md);" />
        <p style="font-size: 13px; color: var(--text-secondary);">Chèn node vào danh sách liên kết</p>
      </div>
      <div style="flex: 1 1 260px; text-align:center;">
        <img src="dsa-assets/linkedlist_remove_node.png" alt="Ví dụ xóa node khỏi danh sách liên kết" style="max-width:100%; border-radius: var(--radius-md);" />
        <p style="font-size: 13px; color: var(--text-secondary);">Xóa node khỏi danh sách liên kết</p>
      </div>
    </div>
  </div>

  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="linked-list-ops-canvas" style="display:flex; gap:4px; flex-wrap:wrap; justify-content:center; min-height: 70px; align-items:center; padding: 10px;"></div>
    <div class="simulator-controls" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 15px;">
      <button class="control-btn" id="linked-list-ops-btn-autorun" onclick="autoRunLinkedListOps()">▶ Auto Run</button>
      <button class="control-btn" id="linked-list-ops-btn-step" onclick="stepLinkedListOps()">Bước tiếp theo ▶</button>
      <button class="control-btn" id="linked-list-ops-btn-pause" onclick="pauseRunLinkedListOps()" disabled>⏸ Dừng</button>
      <button class="control-btn btn-secondary" id="linked-list-ops-btn-reset" onclick="initLinkedListOpsDemo()">↺ Reset</button>
    </div>
    <div id="linked-list-ops-speed-control" style="text-align:center; font-size: 13px; color: var(--text-secondary); margin-top: 12px;">
      Tốc độ: <input type="range" min="200" max="2000" value="900" step="200" oninput="setLinkedListOpsSpeed(this.value)" /> <span id="linked-list-ops-speed-label">900ms</span>
    </div>
    <div id="linked-list-ops-status" class="simulator-status" style="margin-top: 12px; font-size: 14px; text-align: center; color: var(--text-secondary);">
      Nhấp "Auto Run" hoặc "Bước tiếp theo" để xem mô phỏng chèn, xóa, truy cập và tìm kiếm node trên danh sách liên kết n0(1) → n1(3) → n2(2) → n3(5) → n4(4).
    </div>
  </div>
</div>


<h3>4.2.2.4 Truy cập Node</h3>
<p><strong>Việc truy cập node trong danh sách liên kết kém hiệu quả hơn</strong>. Như đã đề cập ở phần trước, chúng ta có thể truy cập bất kỳ phần tử nào trong mảng với thời gian $O(1)$. Điều này không đúng với danh sách liên kết. Chương trình cần bắt đầu từ node đầu và duyệt lùi từng node một cho đến khi tìm thấy node mục tiêu. Nghĩa là, để truy cập node thứ $i$ trong danh sách liên kết cần $i - 1$ lần lặp, với độ phức tạp thời gian là $O(n)$.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def access(head: ListNode, index: int) -&gt; ListNode | None:
    """Truy cập node tại chỉ mục index trong danh sách liên kết"""
    for _ in range(index):
        if not head:
            return None
        head = head.next
    return head</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Truy cập node tại chỉ mục index trong danh sách liên kết */
ListNode *access(ListNode *head, int index) {
    for (int i = 0; i &lt; index; i++) {
        if (head == nullptr)
            return nullptr;
        head = head-&gt;next;
    }
    return head;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Truy cập node tại chỉ mục index trong danh sách liên kết */
static ListNode access(ListNode head, int index) {
    for (int i = 0; i &lt; index; i++) {
        if (head == null)
            return null;
        head = head.next;
    }
    return head;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Truy cập node tại chỉ mục index trong danh sách liên kết */
function access(head, index) {
    for (let i = 0; i &lt; index; i++) {
        if (!head) {
            return null;
        }
        head = head.next;
    }
    return head;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Truy cập node tại chỉ mục index trong danh sách liên kết */
fun access(head: ListNode?, index: Int): ListNode? {
    var h = head
    for (i in 0..&lt;index) {
        if (h == null)
            return null
        h = h.next
    }
    return h
}</code></pre></div></div></div>

<h3>4.2.2.5 Tìm kiếm Node</h3>
<p>Duyệt danh sách liên kết để tìm node có giá trị <code>target</code>, và xuất ra chỉ mục của node đó trong danh sách liên kết. Quá trình này cũng là một phép tìm kiếm tuyến tính. Đoạn mã dưới đây minh họa việc này:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def find(head: ListNode, target: int) -&gt; int:
    """Tìm node đầu tiên có giá trị target trong danh sách liên kết"""
    index = 0
    while head:
        if head.val == target:
            return index
        head = head.next
        index += 1
    return -1</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm node đầu tiên có giá trị target trong danh sách liên kết */
int find(ListNode *head, int target) {
    int index = 0;
    while (head != nullptr) {
        if (head-&gt;val == target)
            return index;
        head = head-&gt;next;
        index++;
    }
    return -1;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Tìm node đầu tiên có giá trị target trong danh sách liên kết */
static int find(ListNode head, int target) {
    int index = 0;
    while (head != null) {
        if (head.val == target)
            return index;
        head = head.next;
        index++;
    }
    return -1;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Tìm node đầu tiên có giá trị target trong danh sách liên kết */
function find(head, target) {
    let index = 0;
    while (head !== null) {
        if (head.val === target) {
            return index;
        }
        head = head.next;
        index += 1;
    }
    return -1;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Tìm node đầu tiên có giá trị target trong danh sách liên kết */
fun find(head: ListNode?, target: Int): Int {
    var index = 0
    var h = head
    while (h != null) {
        if (h._val == target)
            return index
        h = h.next
        index++
    }
    return -1
}</code></pre></div></div></div>

<h2>4.2.3 Mảng so với Danh sách liên kết</h2>
<p>Bảng dưới đây tóm tắt các đặc điểm của mảng và danh sách liên kết, đồng thời so sánh hiệu suất hoạt động của chúng. Vì chúng áp dụng hai chiến lược lưu trữ đối lập nhau, các đặc tính và hiệu suất hoạt động khác nhau của chúng cũng thể hiện những nét tương phản rõ rệt.</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin:1em 0;">
  <thead>
    <tr style="border-bottom:1px solid #30363d;text-align:left;">
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;"></th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Mảng (Array)</th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Danh sách liên kết (Linked List)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;">Phương thức lưu trữ</td>
      <td style="padding:8px 12px;color:#e6edf3;">Vùng nhớ liên tục</td>
      <td style="padding:8px 12px;color:#e6edf3;">Vùng nhớ phân tán</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;">Mở rộng dung lượng</td>
      <td style="padding:8px 12px;color:#e6edf3;">Độ dài bất biến</td>
      <td style="padding:8px 12px;color:#e6edf3;">Mở rộng linh hoạt</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;">Hiệu suất bộ nhớ</td>
      <td style="padding:8px 12px;color:#e6edf3;">Phần tử chiếm ít bộ nhớ hơn, nhưng có thể lãng phí không gian</td>
      <td style="padding:8px 12px;color:#e6edf3;">Phần tử chiếm nhiều bộ nhớ hơn</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;">Truy cập phần tử</td>
      <td style="padding:8px 12px;color:#e6edf3;">$O(1)$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$O(n)$</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;">Thêm phần tử</td>
      <td style="padding:8px 12px;color:#e6edf3;">$O(n)$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$O(1)$</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;color:#e6edf3;">Xóa phần tử</td>
      <td style="padding:8px 12px;color:#e6edf3;">$O(n)$</td>
      <td style="padding:8px 12px;color:#e6edf3;">$O(1)$</td>
    </tr>
  </tbody>
</table>

<h2>4.2.4 Các loại Danh sách liên kết phổ biến</h2>
<p>Như hình dưới đây, có ba loại danh sách liên kết phổ biến:</p>
<ul>
  <li><strong>Danh sách liên kết đơn (singly linked list):</strong> Đây là danh sách liên kết thông thường đã giới thiệu ở trên. Các node của danh sách liên kết đơn chứa một giá trị và một tham chiếu đến node kế tiếp. Chúng ta gọi node đầu tiên là node đầu và node cuối cùng là node cuối; node cuối trỏ đến <code>None</code>.</li>
  <li><strong>Danh sách liên kết vòng (circular linked list):</strong> Nếu chúng ta cho node cuối của một danh sách liên kết đơn trỏ về node đầu (nối đuôi với đầu), chúng ta có một danh sách liên kết vòng. Trong danh sách liên kết vòng, bất kỳ node nào cũng có thể được xem là node đầu.</li>
  <li><strong>Danh sách liên kết đôi (doubly linked list):</strong> So với danh sách liên kết đơn, danh sách liên kết đôi ghi lại tham chiếu theo cả hai chiều. Định nghĩa node của danh sách liên kết đôi bao gồm cả tham chiếu đến node kế tiếp (successor) và node trước đó (predecessor). So với danh sách liên kết đơn, danh sách liên kết đôi linh hoạt hơn, có thể duyệt danh sách theo cả hai chiều, nhưng cũng đòi hỏi nhiều không gian bộ nhớ hơn.</li>
</ul>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>class ListNode:
    """Lớp node của danh sách liên kết đôi"""
    def __init__(self, val: int):
        self.val: int = val                # Giá trị của node
        self.next: ListNode | None = None  # Tham chiếu đến node kế tiếp (successor)
        self.prev: ListNode | None = None  # Tham chiếu đến node trước đó (predecessor)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Cấu trúc node của danh sách liên kết đôi */
struct ListNode {
    int val;         // Giá trị của node
    ListNode *next;  // Con trỏ đến node kế tiếp (successor)
    ListNode *prev;  // Con trỏ đến node trước đó (predecessor)
    ListNode(int x) : val(x), next(nullptr), prev(nullptr) {}  // Hàm khởi tạo
};</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Lớp node của danh sách liên kết đôi */
class ListNode {
    int val;        // Giá trị của node
    ListNode next;  // Tham chiếu đến node kế tiếp (successor)
    ListNode prev;  // Tham chiếu đến node trước đó (predecessor)
    ListNode(int x) { val = x; }  // Hàm khởi tạo
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Lớp node của danh sách liên kết đôi */
class ListNode {
    constructor(val, next, prev) {
        this.val = val === undefined ? 0 : val;        // Giá trị của node
        this.next = next === undefined ? null : next;  // Tham chiếu đến node kế tiếp (successor)
        this.prev = prev === undefined ? null : prev;  // Tham chiếu đến node trước đó (predecessor)
    }
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Lớp node của danh sách liên kết đôi */
// Hàm khởi tạo
class ListNode(x: Int) {
    val _val: Int = x           // Giá trị của node
    val next: ListNode? = null  // Tham chiếu đến node kế tiếp (successor)
    val prev: ListNode? = null  // Tham chiếu đến node trước đó (predecessor)
}</code></pre></div></div></div>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/linkedlist_common_types.png" alt="Các loại danh sách liên kết phổ biến" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>4.2.5 Ứng dụng điển hình của Danh sách liên kết</h2>
<p>Danh sách liên kết đơn thường được dùng để triển khai Stack, Queue, Hash Table và Graph.</p>
<ul>
  <li><strong>Stack và Queue:</strong> Khi các thao tác chèn và xóa đều xảy ra ở một đầu của danh sách liên kết, nó thể hiện đặc tính vào sau ra trước, tương ứng với Stack. Khi thao tác chèn xảy ra ở một đầu và thao tác xóa xảy ra ở đầu kia của danh sách liên kết, nó thể hiện đặc tính vào trước ra trước, tương ứng với Queue.</li>
  <li><strong>Hash Table:</strong> Separate chaining là một trong những giải pháp phổ biến để giải quyết va chạm băm (hash collision). Trong cách tiếp cận này, tất cả các phần tử va chạm được đặt vào một danh sách liên kết.</li>
  <li><strong>Graph:</strong> Danh sách kề (adjacency list) là một cách phổ biến để biểu diễn đồ thị, trong đó mỗi đỉnh của đồ thị được gắn với một danh sách liên kết, và mỗi phần tử trong danh sách liên kết đại diện cho một đỉnh khác được kết nối với đỉnh đó.</li>
</ul>
<p>Danh sách liên kết đôi thường được dùng trong các trường hợp cần truy cập nhanh phần tử trước và sau.</p>
<ul>
  <li><strong>Cấu trúc dữ liệu nâng cao:</strong> Ví dụ, trong cây đỏ-đen (red-black tree) và B-tree, chúng ta cần truy cập node cha của một node, điều này có thể thực hiện bằng cách lưu một tham chiếu đến node cha trong node đó, tương tự như danh sách liên kết đôi.</li>
  <li><strong>Lịch sử trình duyệt:</strong> Trong các trình duyệt web, khi người dùng nhấp nút tiến hoặc lùi, trình duyệt cần biết trang web trước đó và tiếp theo mà người dùng đã truy cập. Đặc tính của danh sách liên kết đôi giúp thao tác này trở nên đơn giản.</li>
  <li><strong>Giải thuật LRU:</strong> Trong các giải thuật loại bỏ cache (LRU), chúng ta cần nhanh chóng tìm dữ liệu được sử dụng gần đây nhất ít nhất, đồng thời hỗ trợ thêm và xóa node nhanh chóng. Sử dụng danh sách liên kết đôi rất phù hợp cho việc này.</li>
</ul>
<p>Danh sách liên kết vòng thường được dùng trong các trường hợp cần thao tác định kỳ, chẳng hạn như lập lịch tài nguyên hệ điều hành.</p>
<ul>
  <li><strong>Giải thuật lập lịch xoay vòng (round-robin):</strong> Trong hệ điều hành, lập lịch xoay vòng là một giải thuật lập lịch CPU phổ biến, cần luân phiên qua một tập hợp các tiến trình. Mỗi tiến trình được cấp một lát thời gian (time slice), khi lát thời gian hết hạn, CPU chuyển sang tiến trình tiếp theo. Thao tác tuần hoàn này có thể được triển khai bằng danh sách liên kết vòng.</li>
  <li><strong>Bộ đệm dữ liệu (data buffer):</strong> Trong một số cách triển khai bộ đệm dữ liệu, danh sách liên kết vòng cũng có thể được sử dụng. Ví dụ, trong các trình phát âm thanh và video, luồng dữ liệu có thể được chia thành nhiều khối đệm và đặt vào một danh sách liên kết vòng để đạt được khả năng phát liên tục không gián đoạn.</li>
</ul>

`,
    originalContent: `
# Linked List

Memory is a shared resource for all programs. In a complex runtime environment, free memory may be scattered throughout the address space. We know that arrays require contiguous memory, and when an array is very large, the system may not be able to provide such a large contiguous block. This is where the flexibility of linked lists becomes apparent.

A <u>linked list</u> is a linear data structure in which each element is a node object, and the nodes are connected through "references". A reference records the memory address of the next node, through which the next node can be accessed from the current node.

This design allows linked-list nodes to be stored in different locations in memory, and their addresses do not need to be contiguous.

![Linked list definition and storage method](linked_list.assets/linkedlist_definition.png)

Observing the figure above, the basic unit of a linked list is a <u>node</u> object. Each node contains two pieces of data: the node's "value" and a "reference" to the next node.

- The first node of a linked list is called the "head node", and the last node is called the "tail node".
- The tail node points to "null", which is denoted as \`null\`, \`nullptr\`, and \`None\` in Java, C++, and Python, respectively.
- In languages that support pointers, such as C, C++, Go, and Rust, the aforementioned "reference" should be replaced with "pointer".

As shown in the following code, a linked list node \`ListNode\` contains not only a value but also an additional reference (pointer). Therefore, **linked lists occupy more memory space than arrays when storing the same amount of data**.

=== "Python"

    \`\`\`python title=""
    class ListNode:
        """Linked list node class"""
        def __init__(self, val: int):
            self.val: int = val               # Node value
            self.next: ListNode | None = None # Reference to the next node
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    /* Linked list node structure */
    struct ListNode {
        int val;         // Node value
        ListNode *next;  // Pointer to the next node
        ListNode(int x) : val(x), next(nullptr) {}  // Constructor
    };
    \`\`\`

=== "Java"

    \`\`\`java title=""
    /* Linked list node class */
    class ListNode {
        int val;        // Node value
        ListNode next;  // Reference to the next node
        ListNode(int x) { val = x; }  // Constructor
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    /* Linked list node class */
    class ListNode(int x) {  // Constructor
        int val = x;         // Node value
        ListNode? next;      // Reference to the next node
    }
    \`\`\`

=== "Go"

    \`\`\`go title=""
    /* Linked list node structure */
    type ListNode struct {
        Val  int       // Node value
        Next *ListNode // Pointer to the next node
    }

    // NewListNode Constructor, creates a new linked list
    func NewListNode(val int) *ListNode {
        return &ListNode{
            Val:  val,
            Next: nil,
        }
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    /* Linked list node class */
    class ListNode {
        var val: Int // Node value
        var next: ListNode? // Reference to the next node

        init(x: Int) { // Constructor
            val = x
        }
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    /* Linked list node class */
    class ListNode {
        constructor(val, next) {
            this.val = (val === undefined ? 0 : val);       // Node value
            this.next = (next === undefined ? null : next); // Reference to the next node
        }
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    /* Linked list node class */
    class ListNode {
        val: number;
        next: ListNode | null;
        constructor(val?: number, next?: ListNode | null) {
            this.val = val === undefined ? 0 : val;        // Node value
            this.next = next === undefined ? null : next;  // Reference to the next node
        }
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    /* Linked list node class */
    class ListNode {
      int val; // Node value
      ListNode? next; // Reference to the next node
      ListNode(this.val, [this.next]); // Constructor
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    use std::rc::Rc;
    use std::cell::RefCell;
    /* Linked list node class */
    #[derive(Debug)]
    struct ListNode {
        val: i32, // Node value
        next: Option<Rc<RefCell<ListNode>>>, // Pointer to the next node
    }
    \`\`\`

=== "C"

    \`\`\`c title=""
    /* Linked list node structure */
    typedef struct ListNode {
        int val;               // Node value
        struct ListNode *next; // Pointer to the next node
    } ListNode;

    /* Constructor */
    ListNode *newListNode(int val) {
        ListNode *node;
        node = (ListNode *) malloc(sizeof(ListNode));
        node->val = val;
        node->next = NULL;
        return node;
    }
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    /* Linked list node class */
    // Constructor
    class ListNode(x: Int) {
        val _val: Int = x          // Node value
        val next: ListNode? = null // Reference to the next node
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    # Linked list node class
    class ListNode
      attr_accessor :val  # Node value
      attr_accessor :next # Reference to the next node

      def initialize(val=0, next_node=nil)
        @val = val
        @next = next_node
      end
    end
    \`\`\`

## Common Linked List Operations

### Initializing a Linked List

Building a linked list involves two steps: first, initializing each node object; second, constructing the reference relationships between nodes. Once initialization is complete, we can traverse all nodes starting from the head node of the linked list through the reference \`next\`.

=== "Python"

    \`\`\`python title="linked_list.py"
    # Initialize linked list 1 -> 3 -> 2 -> 5 -> 4
    # Initialize each node
    n0 = ListNode(1)
    n1 = ListNode(3)
    n2 = ListNode(2)
    n3 = ListNode(5)
    n4 = ListNode(4)
    # Build references between nodes
    n0.next = n1
    n1.next = n2
    n2.next = n3
    n3.next = n4
    \`\`\`

=== "C++"

    \`\`\`cpp title="linked_list.cpp"
    /* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */
    // Initialize each node
    ListNode* n0 = new ListNode(1);
    ListNode* n1 = new ListNode(3);
    ListNode* n2 = new ListNode(2);
    ListNode* n3 = new ListNode(5);
    ListNode* n4 = new ListNode(4);
    // Build references between nodes
    n0->next = n1;
    n1->next = n2;
    n2->next = n3;
    n3->next = n4;
    \`\`\`

=== "Java"

    \`\`\`java title="linked_list.java"
    /* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */
    // Initialize each node
    ListNode n0 = new ListNode(1);
    ListNode n1 = new ListNode(3);
    ListNode n2 = new ListNode(2);
    ListNode n3 = new ListNode(5);
    ListNode n4 = new ListNode(4);
    // Build references between nodes
    n0.next = n1;
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    \`\`\`

=== "C#"

    \`\`\`csharp title="linked_list.cs"
    /* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */
    // Initialize each node
    ListNode n0 = new(1);
    ListNode n1 = new(3);
    ListNode n2 = new(2);
    ListNode n3 = new(5);
    ListNode n4 = new(4);
    // Build references between nodes
    n0.next = n1;
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    \`\`\`

=== "Go"

    \`\`\`go title="linked_list.go"
    /* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */
    // Initialize each node
    n0 := NewListNode(1)
    n1 := NewListNode(3)
    n2 := NewListNode(2)
    n3 := NewListNode(5)
    n4 := NewListNode(4)
    // Build references between nodes
    n0.Next = n1
    n1.Next = n2
    n2.Next = n3
    n3.Next = n4
    \`\`\`

=== "Swift"

    \`\`\`swift title="linked_list.swift"
    /* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */
    // Initialize each node
    let n0 = ListNode(x: 1)
    let n1 = ListNode(x: 3)
    let n2 = ListNode(x: 2)
    let n3 = ListNode(x: 5)
    let n4 = ListNode(x: 4)
    // Build references between nodes
    n0.next = n1
    n1.next = n2
    n2.next = n3
    n3.next = n4
    \`\`\`

=== "JS"

    \`\`\`javascript title="linked_list.js"
    /* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */
    // Initialize each node
    const n0 = new ListNode(1);
    const n1 = new ListNode(3);
    const n2 = new ListNode(2);
    const n3 = new ListNode(5);
    const n4 = new ListNode(4);
    // Build references between nodes
    n0.next = n1;
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    \`\`\`

=== "TS"

    \`\`\`typescript title="linked_list.ts"
    /* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */
    // Initialize each node
    const n0 = new ListNode(1);
    const n1 = new ListNode(3);
    const n2 = new ListNode(2);
    const n3 = new ListNode(5);
    const n4 = new ListNode(4);
    // Build references between nodes
    n0.next = n1;
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    \`\`\`

=== "Dart"

    \`\`\`dart title="linked_list.dart"
    /* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */\
    // Initialize each node
    ListNode n0 = ListNode(1);
    ListNode n1 = ListNode(3);
    ListNode n2 = ListNode(2);
    ListNode n3 = ListNode(5);
    ListNode n4 = ListNode(4);
    // Build references between nodes
    n0.next = n1;
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    \`\`\`

=== "Rust"

    \`\`\`rust title="linked_list.rs"
    /* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */
    // Initialize each node
    let n0 = Rc::new(RefCell::new(ListNode { val: 1, next: None }));
    let n1 = Rc::new(RefCell::new(ListNode { val: 3, next: None }));
    let n2 = Rc::new(RefCell::new(ListNode { val: 2, next: None }));
    let n3 = Rc::new(RefCell::new(ListNode { val: 5, next: None }));
    let n4 = Rc::new(RefCell::new(ListNode { val: 4, next: None }));

    // Build references between nodes
    n0.borrow_mut().next = Some(n1.clone());
    n1.borrow_mut().next = Some(n2.clone());
    n2.borrow_mut().next = Some(n3.clone());
    n3.borrow_mut().next = Some(n4.clone());
    \`\`\`

=== "C"

    \`\`\`c title="linked_list.c"
    /* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */
    // Initialize each node
    ListNode* n0 = newListNode(1);
    ListNode* n1 = newListNode(3);
    ListNode* n2 = newListNode(2);
    ListNode* n3 = newListNode(5);
    ListNode* n4 = newListNode(4);
    // Build references between nodes
    n0->next = n1;
    n1->next = n2;
    n2->next = n3;
    n3->next = n4;
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="linked_list.kt"
    /* Initialize linked list 1 -> 3 -> 2 -> 5 -> 4 */
    // Initialize each node
    val n0 = ListNode(1)
    val n1 = ListNode(3)
    val n2 = ListNode(2)
    val n3 = ListNode(5)
    val n4 = ListNode(4)
    // Build references between nodes
    n0.next = n1;
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="linked_list.rb"
    # Initialize linked list 1 -> 3 -> 2 -> 5 -> 4
    # Initialize each node
    n0 = ListNode.new(1)
    n1 = ListNode.new(3)
    n2 = ListNode.new(2)
    n3 = ListNode.new(5)
    n4 = ListNode.new(4)
    # Build references between nodes
    n0.next = n1
    n1.next = n2
    n2.next = n3
    n3.next = n4
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=class%20ListNode%3A%0A%20%20%20%20%22%22%22%E9%93%BE%E8%A1%A8%E8%8A%82%E7%82%B9%E7%B1%BB%22%22%22%0A%20%20%20%20def%20__init__%28self,%20val%3A%20int%29%3A%0A%20%20%20%20%20%20%20%20self.val%3A%20int%20%3D%20val%20%20%23%20%E8%8A%82%E7%82%B9%E5%80%BC%0A%20%20%20%20%20%20%20%20self.next%3A%20ListNode%20%7C%20None%20%3D%20None%20%20%23%20%E5%90%8E%E7%BB%A7%E8%8A%82%E7%82%B9%E5%BC%95%E7%94%A8%0A%0A%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E9%93%BE%E8%A1%A8%201%20-%3E%203%20-%3E%202%20-%3E%205%20-%3E%204%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E5%90%84%E4%B8%AA%E8%8A%82%E7%82%B9%0A%20%20%20%20n0%20%3D%20ListNode%281%29%0A%20%20%20%20n1%20%3D%20ListNode%283%29%0A%20%20%20%20n2%20%3D%20ListNode%282%29%0A%20%20%20%20n3%20%3D%20ListNode%285%29%0A%20%20%20%20n4%20%3D%20ListNode%284%29%0A%20%20%20%20%23%20%E6%9E%84%E5%BB%BA%E8%8A%82%E7%82%B9%E4%B9%8B%E9%97%B4%E7%9A%84%E5%BC%95%E7%94%A8%0A%20%20%20%20n0.next%20%3D%20n1%0A%20%20%20%20n1.next%20%3D%20n2%0A%20%20%20%20n2.next%20%3D%20n3%0A%20%20%20%20n3.next%20%3D%20n4&cumulative=false&curInstr=3&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

An array is a single variable; for example, an array \`nums\` contains elements \`nums[0]\`, \`nums[1]\`, and so on. A linked list, by contrast, is composed of multiple independent node objects. **We usually use the head node as a stand-in for the entire linked list**; for example, the linked list in the above code can be referred to as linked list \`n0\`.

### Inserting a Node

Inserting a node in a linked list is very easy. As shown in the figure below, suppose we want to insert a new node \`P\` between two adjacent nodes \`n0\` and \`n1\`. **We only need to change two node references (pointers)**, with a time complexity of $O(1)$.

In contrast, the time complexity of inserting an element in an array is $O(n)$, which is inefficient when dealing with large amounts of data.

![Example of inserting a node into a linked list](linked_list.assets/linkedlist_insert_node.png)

\`\`\`src
[file]{linked_list}-[class]{}-[func]{insert}
\`\`\`

### Removing a Node

As shown in the figure below, removing a node in a linked list is also very convenient. **We only need to change one node's reference (pointer)**.

Note that although node \`P\` still points to \`n1\` after the deletion operation is complete, the linked list can no longer access \`P\` when traversing, which means \`P\` no longer belongs to this linked list.

![Removing a node from a linked list](linked_list.assets/linkedlist_remove_node.png)

\`\`\`src
[file]{linked_list}-[class]{}-[func]{remove}
\`\`\`

### Accessing a Node

**Accessing nodes in a linked list is less efficient**. As mentioned in the previous section, we can access any element in an array in $O(1)$ time. This is not the case with linked lists. The program needs to start from the head node and traverse backward one by one until the target node is found. That is, accessing the $i$-th node in a linked list requires $i - 1$ iterations, with a time complexity of $O(n)$.

\`\`\`src
[file]{linked_list}-[class]{}-[func]{access}
\`\`\`

### Finding a Node

Traverse the linked list to find a node with value \`target\`, and output the index of that node in the linked list. This process is also a linear search. The code is shown below:

\`\`\`src
[file]{linked_list}-[class]{}-[func]{find}
\`\`\`

## Arrays vs. Linked Lists

The table below summarizes the characteristics of arrays and linked lists and compares their operational efficiencies. Since they employ two opposite storage strategies, their various properties and operational efficiencies also exhibit contrasting characteristics.

<p align="center"> Table <id> &nbsp; Comparison of array and linked list efficiencies </p>

|                        | Array                                         | Linked List                |
| ---------------------- | --------------------------------------------- | -------------------------- |
| Storage method         | Contiguous memory space                       | Scattered memory space     |
| Capacity expansion     | Immutable length                              | Flexible expansion         |
| Memory efficiency      | Elements occupy less memory, but space may be wasted | Elements occupy more memory |
| Accessing an element   | $O(1)$                                        | $O(n)$                     |
| Adding an element      | $O(n)$                                        | $O(1)$                     |
| Removing an element    | $O(n)$                                        | $O(1)$                     |

## Common Types of Linked Lists

As shown in the figure below, there are three common types of linked lists:

- **Singly linked list**: This is the ordinary linked list introduced earlier. The nodes of a singly linked list contain a value and a reference to the next node. We call the first node the head node and the last node the tail node; the tail node points to \`None\`.
- **Circular linked list**: If we make the tail node of a singly linked list point to the head node (connecting the tail to the head), we get a circular linked list. In a circular linked list, any node can be viewed as the head node.
- **Doubly linked list**: Compared to a singly linked list, a doubly linked list records references in both directions. The node definition of a doubly linked list includes references to both the successor node (next node) and the predecessor node (previous node). Compared to a singly linked list, a doubly linked list is more flexible and can traverse the linked list in both directions, but it also requires more memory space.

=== "Python"

    \`\`\`python title=""
    class ListNode:
        """Doubly linked list node class"""
        def __init__(self, val: int):
            self.val: int = val                # Node value
            self.next: ListNode | None = None  # Reference to the successor node
            self.prev: ListNode | None = None  # Reference to the predecessor node
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    /* Doubly linked list node structure */
    struct ListNode {
        int val;         // Node value
        ListNode *next;  // Pointer to the successor node
        ListNode *prev;  // Pointer to the predecessor node
        ListNode(int x) : val(x), next(nullptr), prev(nullptr) {}  // Constructor
    };
    \`\`\`

=== "Java"

    \`\`\`java title=""
    /* Doubly linked list node class */
    class ListNode {
        int val;        // Node value
        ListNode next;  // Reference to the successor node
        ListNode prev;  // Reference to the predecessor node
        ListNode(int x) { val = x; }  // Constructor
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    /* Doubly linked list node class */
    class ListNode(int x) {  // Constructor
        int val = x;    // Node value
        ListNode next;  // Reference to the successor node
        ListNode prev;  // Reference to the predecessor node
    }
    \`\`\`

=== "Go"

    \`\`\`go title=""
    /* Doubly linked list node structure */
    type DoublyListNode struct {
        Val  int             // Node value
        Next *DoublyListNode // Pointer to the successor node
        Prev *DoublyListNode // Pointer to the predecessor node
    }

    // NewDoublyListNode Initialization
    func NewDoublyListNode(val int) *DoublyListNode {
        return &DoublyListNode{
            Val:  val,
            Next: nil,
            Prev: nil,
        }
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    /* Doubly linked list node class */
    class ListNode {
        var val: Int // Node value
        var next: ListNode? // Reference to the successor node
        var prev: ListNode? // Reference to the predecessor node

        init(x: Int) { // Constructor
            val = x
        }
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    /* Doubly linked list node class */
    class ListNode {
        constructor(val, next, prev) {
            this.val = val  ===  undefined ? 0 : val;        // Node value
            this.next = next  ===  undefined ? null : next;  // Reference to the successor node
            this.prev = prev  ===  undefined ? null : prev;  // Reference to the predecessor node
        }
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    /* Doubly linked list node class */
    class ListNode {
        val: number;
        next: ListNode | null;
        prev: ListNode | null;
        constructor(val?: number, next?: ListNode | null, prev?: ListNode | null) {
            this.val = val  ===  undefined ? 0 : val;        // Node value
            this.next = next  ===  undefined ? null : next;  // Reference to the successor node
            this.prev = prev  ===  undefined ? null : prev;  // Reference to the predecessor node
        }
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    /* Doubly linked list node class */
    class ListNode {
        int val;        // Node value
        ListNode? next;  // Reference to the successor node
        ListNode? prev;  // Reference to the predecessor node
        ListNode(this.val, [this.next, this.prev]);  // Constructor
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    use std::rc::Rc;
    use std::cell::RefCell;

    /* Doubly linked list node type */
    #[derive(Debug)]
    struct ListNode {
        val: i32, // Node value
        next: Option<Rc<RefCell<ListNode>>>, // Pointer to the successor node
        prev: Option<Rc<RefCell<ListNode>>>, // Pointer to the predecessor node
    }

    /* Constructor */
    impl ListNode {
        fn new(val: i32) -> Self {
            ListNode {
                val,
                next: None,
                prev: None,
            }
        }
    }
    \`\`\`

=== "C"

    \`\`\`c title=""
    /* Doubly linked list node structure */
    typedef struct ListNode {
        int val;               // Node value
        struct ListNode *next; // Pointer to the successor node
        struct ListNode *prev; // Pointer to the predecessor node
    } ListNode;

    /* Constructor */
    ListNode *newListNode(int val) {
        ListNode *node;
        node = (ListNode *) malloc(sizeof(ListNode));
        node->val = val;
        node->next = NULL;
        node->prev = NULL;
        return node;
    }
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    /* Doubly linked list node class */
    // Constructor
    class ListNode(x: Int) {
        val _val: Int = x           // Node value
        val next: ListNode? = null  // Reference to the successor node
        val prev: ListNode? = null  // Reference to the predecessor node
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    # Doubly linked list node class
    class ListNode
      attr_accessor :val    # Node value
      attr_accessor :next   # Reference to the successor node
      attr_accessor :prev   # Reference to the predecessor node

      def initialize(val=0, next_node=nil, prev_node=nil)
        @val = val
        @next = next_node
        @prev = prev_node
      end
    end
    \`\`\`

![Common types of linked lists](linked_list.assets/linkedlist_common_types.png)

## Typical Applications of Linked Lists

Singly linked lists are commonly used to implement stacks, queues, hash tables, and graphs.

- **Stacks and queues**: When insertion and deletion operations both occur at one end of the linked list, it exhibits last-in-first-out characteristics, corresponding to a stack. When insertion operations occur at one end of the linked list and deletion operations occur at the other end, it exhibits first-in-first-out characteristics, corresponding to a queue.
- **Hash tables**: Separate chaining is one of the mainstream solutions for resolving hash collisions. In this approach, all colliding elements are placed in a linked list.
- **Graphs**: An adjacency list is a common way to represent a graph, where each vertex in the graph is associated with a linked list, and each element in the linked list represents another vertex connected to that vertex.

Doubly linked lists are commonly used in scenarios where quick access to the previous and next elements is needed.

- **Advanced data structures**: For example, in red-black trees and B-trees, we need to access the parent node of a node, which can be achieved by saving a reference to the parent node in the node, similar to a doubly linked list.
- **Browser history**: In web browsers, when a user clicks the forward or backward button, the browser needs to know the previous and next web pages the user visited. The characteristics of doubly linked lists make this operation simple.
- **LRU algorithm**: In cache eviction (LRU) algorithms, we need to quickly find the least recently used data and support quick addition and deletion of nodes. Using a doubly linked list is very suitable for this.

Circular linked lists are commonly used in scenarios that require periodic operations, such as operating system resource scheduling.

- **Round-robin scheduling algorithm**: In operating systems, round-robin scheduling is a common CPU scheduling algorithm that needs to cycle through a set of processes. Each process is assigned a time slice, and when the time slice expires, the CPU switches to the next process. This cyclic operation can be implemented using a circular linked list.
- **Data buffers**: In some data buffer implementations, circular linked lists may also be used. For example, in audio and video players, the data stream may be divided into multiple buffer blocks and placed in a circular linked list to achieve seamless playback.

`
  },

  'dsa-list': {
    title: '4.3 List (Danh sách)',
    summary: 'Tìm hiểu List — mảng động (dynamic array) tự động mở rộng dung lượng, hỗ trợ chèn/xóa/duyệt/nối/sắp xếp tự do, cùng cách tự triển khai một List đơn giản kèm mô phỏng tương tác cơ chế mở rộng dung lượng.',
    tags: ['dsa', 'array', 'list'],
    domain: 'Algorithms',
    module: 'Chương 4: Mảng & Danh sách liên kết',
    prerequisites: ['dsa-linked-list'],
    related: ['dsa-array', 'dsa-linked-list'],
    updatedAt: '2026-07-18',
    readTime: '11 phút',
    content: `

<h2>4.3.1 Định nghĩa List</h2>
<p>Một <strong>List (danh sách)</strong> là một khái niệm cấu trúc dữ liệu trừu tượng, đại diện cho một tập hợp có thứ tự các phần tử, hỗ trợ các thao tác truy cập, cập nhật, chèn, xóa và duyệt phần tử mà người dùng không cần quan tâm đến giới hạn dung lượng. List có thể được triển khai dựa trên danh sách liên kết hoặc mảng.</p>
<ul>
  <li>Một danh sách liên kết có thể tự nhiên được xem như một List: nó hỗ trợ chèn, xóa, tìm kiếm và cập nhật, và có thể tăng trưởng linh hoạt khi cần.</li>
  <li>Một mảng cũng hỗ trợ chèn, xóa, tìm kiếm và cập nhật, nhưng vì độ dài của nó cố định nên chỉ có thể được xem là một List với giới hạn dung lượng.</li>
</ul>
<p>Khi một List được triển khai bằng mảng, <strong>độ dài cố định của nó khiến nó kém thực tế hơn</strong>. Điều này là vì chúng ta thường không thể xác định trước cần lưu trữ bao nhiêu dữ liệu, khiến việc chọn dung lượng phù hợp trở nên khó khăn. Nếu dung lượng quá nhỏ, có thể không đáp ứng đủ nhu cầu; nếu quá lớn, sẽ lãng phí bộ nhớ.</p>
<p>Để giải quyết vấn đề này, chúng ta có thể sử dụng một <strong>mảng động (dynamic array)</strong> để triển khai List. Nó kế thừa tất cả các ưu điểm của mảng trong khi vẫn hỗ trợ thay đổi kích thước linh hoạt trong quá trình chạy chương trình.</p>
<p>Trên thực tế, <strong>các kiểu List do thư viện chuẩn của nhiều ngôn ngữ lập trình cung cấp đều được triển khai bằng mảng động</strong>, chẳng hạn như <code>list</code> trong Python, <code>ArrayList</code> trong Java, <code>vector</code> trong C++ và <code>List</code> trong C#. Trong phần thảo luận tiếp theo, chúng ta sẽ coi "List" và "mảng động" là các khái niệm tương đương.</p>

<h2>4.3.2 Các thao tác phổ biến trên List</h2>

<h3>4.3.2.1 Khởi tạo List</h3>
<p>Chúng ta thường khởi tạo List theo một trong hai cách: rỗng hoặc với các giá trị được xác định trước:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code># Khởi tạo List
# Không có giá trị ban đầu
nums1: list[int] = []
# Có giá trị ban đầu
nums: list[int] = [1, 3, 2, 5, 4]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Khởi tạo List */
// Lưu ý rằng vector trong C++ tương đương với "list" (nums) được nhắc đến trong bài này
// Không có giá trị ban đầu
vector&lt;int&gt; nums1;
// Có giá trị ban đầu
vector&lt;int&gt; nums = { 1, 3, 2, 5, 4 };</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Khởi tạo List */
// Không có giá trị ban đầu
List&lt;Integer&gt; nums1 = new ArrayList&lt;&gt;();
// Có giá trị ban đầu (lưu ý các phần tử mảng nên dùng lớp bọc Integer[] thay vì int[])
Integer[] numbers = new Integer[] { 1, 3, 2, 5, 4 };
List&lt;Integer&gt; nums = new ArrayList&lt;&gt;(Arrays.asList(numbers));</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Khởi tạo List */
// Không có giá trị ban đầu
const nums1 = [];
// Có giá trị ban đầu
const nums = [1, 3, 2, 5, 4];</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Khởi tạo List */
// Không có giá trị ban đầu
var nums1 = listOf&lt;Int&gt;()
// Có giá trị ban đầu
var numbers = arrayOf(1, 3, 2, 5, 4)
var nums = numbers.toMutableList()</code></pre></div></div></div>

<h3>4.3.2.2 Truy cập phần tử</h3>
<p>Vì List về bản chất là một mảng, chúng ta có thể truy cập và cập nhật phần tử với độ phức tạp thời gian $O(1)$, rất hiệu quả.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code># Truy cập phần tử
num: int = nums[1]  # Truy cập phần tử tại chỉ mục 1

# Cập nhật phần tử
nums[1] = 0    # Cập nhật phần tử tại chỉ mục 1 thành 0</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Truy cập phần tử */
int num = nums[1];  // Truy cập phần tử tại chỉ mục 1

/* Cập nhật phần tử */
nums[1] = 0;  // Cập nhật phần tử tại chỉ mục 1 thành 0</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Truy cập phần tử */
int num = nums.get(1);  // Truy cập phần tử tại chỉ mục 1

/* Cập nhật phần tử */
nums.set(1, 0);  // Cập nhật phần tử tại chỉ mục 1 thành 0</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Truy cập phần tử */
const num = nums[1];  // Truy cập phần tử tại chỉ mục 1

/* Cập nhật phần tử */
nums[1] = 0;  // Cập nhật phần tử tại chỉ mục 1 thành 0</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Truy cập phần tử */
val num = nums[1]       // Truy cập phần tử tại chỉ mục 1
/* Cập nhật phần tử */
nums[1] = 0             // Cập nhật phần tử tại chỉ mục 1 thành 0</code></pre></div></div></div>

<h3>4.3.2.3 Chèn và Xóa phần tử</h3>
<p>So với mảng, List có thể tự do thêm và xóa phần tử. Thêm một phần tử vào cuối List có độ phức tạp thời gian $O(1)$, nhưng chèn và xóa phần tử vẫn có hiệu suất giống như mảng, với độ phức tạp thời gian $O(n)$.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code># Xóa toàn bộ List
nums.clear()

# Thêm phần tử ở cuối
nums.append(1)
nums.append(3)
nums.append(2)
nums.append(5)
nums.append(4)

# Chèn phần tử vào giữa
nums.insert(3, 6)  # Chèn số 6 vào chỉ mục 3

# Xóa một phần tử
nums.pop(3)        # Xóa phần tử tại chỉ mục 3</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Xóa toàn bộ List */
nums.clear();

/* Thêm phần tử ở cuối */
nums.push_back(1);
nums.push_back(3);
nums.push_back(2);
nums.push_back(5);
nums.push_back(4);

/* Chèn phần tử vào giữa */
nums.insert(nums.begin() + 3, 6);  // Chèn số 6 vào chỉ mục 3

/* Xóa một phần tử */
nums.erase(nums.begin() + 3);      // Xóa phần tử tại chỉ mục 3</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Xóa toàn bộ List */
nums.clear();

/* Thêm phần tử ở cuối */
nums.add(1);
nums.add(3);
nums.add(2);
nums.add(5);
nums.add(4);

/* Chèn phần tử vào giữa */
nums.add(3, 6);  // Chèn số 6 vào chỉ mục 3

/* Xóa một phần tử */
nums.remove(3);  // Xóa phần tử tại chỉ mục 3</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Xóa toàn bộ List */
nums.length = 0;

/* Thêm phần tử ở cuối */
nums.push(1);
nums.push(3);
nums.push(2);
nums.push(5);
nums.push(4);

/* Chèn phần tử vào giữa */
nums.splice(3, 0, 6); // Chèn số 6 vào chỉ mục 3

/* Xóa một phần tử */
nums.splice(3, 1);  // Xóa phần tử tại chỉ mục 3</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Xóa toàn bộ List */
nums.clear()

/* Thêm phần tử ở cuối */
nums.add(1)
nums.add(3)
nums.add(2)
nums.add(5)
nums.add(4)

/* Chèn phần tử vào giữa */
nums.add(3, 6)  // Chèn số 6 vào chỉ mục 3

/* Xóa một phần tử */
nums.removeAt(3)  // Xóa phần tử tại chỉ mục 3</code></pre></div></div></div>

<h3>4.3.2.4 Duyệt List</h3>
<p>Giống như mảng, List có thể được duyệt theo chỉ mục hoặc bằng cách lặp trực tiếp qua các phần tử.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code># Duyệt List theo chỉ mục
count = 0
for i in range(len(nums)):
    count += nums[i]

# Duyệt trực tiếp các phần tử List
for num in nums:
    count += num</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Duyệt List theo chỉ mục */
int count = 0;
for (int i = 0; i &lt; nums.size(); i++) {
    count += nums[i];
}

/* Duyệt trực tiếp các phần tử List */
count = 0;
for (int num : nums) {
    count += num;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Duyệt List theo chỉ mục */
int count = 0;
for (int i = 0; i &lt; nums.size(); i++) {
    count += nums.get(i);
}

/* Duyệt trực tiếp các phần tử List */
for (int num : nums) {
    count += num;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Duyệt List theo chỉ mục */
let count = 0;
for (let i = 0; i &lt; nums.length; i++) {
    count += nums[i];
}

/* Duyệt trực tiếp các phần tử List */
count = 0;
for (const num of nums) {
    count += num;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Duyệt List theo chỉ mục */
var count = 0
for (i in nums.indices) {
    count += nums[i]
}

/* Duyệt trực tiếp các phần tử List */
for (num in nums) {
    count += num
}</code></pre></div></div></div>

<h3>4.3.2.5 Nối List</h3>
<p>Cho một List mới <code>nums1</code>, chúng ta có thể nối nó vào cuối List gốc.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code># Nối hai List
nums1: list[int] = [6, 8, 7, 10, 9]
nums += nums1  # Nối List nums1 vào cuối nums</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Nối hai List */
vector&lt;int&gt; nums1 = { 6, 8, 7, 10, 9 };
// Nối List nums1 vào cuối nums
nums.insert(nums.end(), nums1.begin(), nums1.end());</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Nối hai List */
List&lt;Integer&gt; nums1 = new ArrayList&lt;&gt;(Arrays.asList(new Integer[] { 6, 8, 7, 10, 9 }));
nums.addAll(nums1);  // Nối List nums1 vào cuối nums</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Nối hai List */
const nums1 = [6, 8, 7, 10, 9];
nums.push(...nums1);  // Nối List nums1 vào cuối nums</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Nối hai List */
val nums1 = intArrayOf(6, 8, 7, 10, 9).toMutableList()
nums.addAll(nums1)  // Nối List nums1 vào cuối nums</code></pre></div></div></div>

<h3>4.3.2.6 Sắp xếp List</h3>
<p>Sau khi sắp xếp List, chúng ta có thể sử dụng các giải thuật "tìm kiếm nhị phân" và "hai con trỏ" — những giải thuật thường được kiểm tra trong các bài toán về mảng.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code># Sắp xếp List
nums.sort()  # Sau khi sắp xếp, các phần tử List được xếp theo thứ tự từ nhỏ đến lớn</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Sắp xếp List */
sort(nums.begin(), nums.end());  // Sau khi sắp xếp, các phần tử List được xếp theo thứ tự từ nhỏ đến lớn</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Sắp xếp List */
Collections.sort(nums);  // Sau khi sắp xếp, các phần tử List được xếp theo thứ tự từ nhỏ đến lớn</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Sắp xếp List */
nums.sort((a, b) =&gt; a - b);  // Sau khi sắp xếp, các phần tử List được xếp theo thứ tự từ nhỏ đến lớn</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Sắp xếp List */
nums.sort() // Sau khi sắp xếp, các phần tử List được xếp theo thứ tự từ nhỏ đến lớn</code></pre></div></div></div>


<div class="interactive-widget-wrapper" id="list-ops-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'list-ops-wrapper', 'tab-interactive'); initListOpsDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-interactive">
    <p style="font-size: 14px; margin-bottom: 10px; color: var(--text-secondary);">Mảng động (dynamic array) bên dưới the List bắt đầu với <code>capacity = 10</code>. Các ô đã sử dụng (size) tô màu, các ô trống hiển thị mờ. Theo dõi thời điểm List tự động <strong>mở rộng dung lượng</strong> khi đầy.</p>
    <div id="list-ops-canvas" style="display:flex; gap:6px; flex-wrap:wrap; justify-content:center; min-height: 70px; align-items:flex-end; padding: 10px;"></div>
    <div class="simulator-controls" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 15px;">
      <button class="control-btn" id="list-ops-btn-autorun" onclick="autoRunListOps()">▶ Auto Run</button>
      <button class="control-btn" id="list-ops-btn-step" onclick="stepListOps()">Bước tiếp theo ▶</button>
      <button class="control-btn" id="list-ops-btn-pause" onclick="pauseRunListOps()" disabled>⏸ Dừng</button>
      <button class="control-btn btn-secondary" id="list-ops-btn-reset" onclick="initListOpsDemo()">↺ Reset</button>
    </div>
    <div id="list-ops-speed-control" style="text-align:center; font-size: 13px; color: var(--text-secondary); margin-top: 12px;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setListOpsSpeed(this.value)" /> <span id="list-ops-speed-label">700ms</span>
    </div>
    <div id="list-ops-status" class="simulator-status" style="margin-top: 12px; font-size: 14px; text-align: center; color: var(--text-secondary);">
      Nhấp "Auto Run" hoặc "Bước tiếp theo" để xem quá trình thêm, chèn, xóa phần tử và cơ chế tự động mở rộng dung lượng của List.
    </div>
  </div>
</div>


<h2>4.3.3 Triển khai List</h2>
<p>Nhiều ngôn ngữ lập trình có sẵn List tích hợp, chẳng hạn như Java, C++ và Python. Cách triển khai của chúng khá phức tạp, và các tham số được cân nhắc kỹ lưỡng, chẳng hạn như dung lượng ban đầu, hệ số mở rộng, v.v. Bạn đọc quan tâm có thể tham khảo mã nguồn để tìm hiểu thêm.</p>
<p>Để hiểu sâu hơn về cách List hoạt động, chúng ta thử tự triển khai một List đơn giản với ba yếu tố thiết kế chính:</p>
<ul>
  <li><strong>Dung lượng ban đầu:</strong> Chọn một dung lượng ban đầu hợp lý cho mảng bên dưới. Trong ví dụ này, chúng ta chọn $10$ làm dung lượng ban đầu.</li>
  <li><strong>Theo dõi kích thước:</strong> Khai báo một biến <code>size</code> để ghi lại số lượng phần tử hiện tại trong List và cập nhật nó theo thời gian thực khi phần tử được chèn và xóa. Dựa vào biến này, chúng ta có thể xác định vị trí cuối của List và biết khi nào cần mở rộng.</li>
  <li><strong>Cơ chế mở rộng:</strong> Khi dung lượng List đã đầy lúc chèn một phần tử, chúng ta cần mở rộng. Chúng ta tạo một mảng lớn hơn dựa trên hệ số mở rộng, sau đó di chuyển tất cả các phần tử từ mảng hiện tại sang mảng mới theo đúng thứ tự. Trong ví dụ này, chúng ta quy định mảng sẽ được mở rộng gấp $2$ lần kích thước trước đó mỗi lần.</li>
</ul>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>class MyList:
    """Lớp List tự triển khai"""

    def __init__(self):
        """Hàm khởi tạo"""
        self._capacity: int = 10  # Dung lượng List
        self._arr: list[int] = [0] * self._capacity  # Mảng (lưu trữ các phần tử List)
        self._size: int = 0  # Độ dài List (số phần tử hiện tại)
        self._extend_ratio: int = 2  # Hệ số mở rộng dung lượng List mỗi lần

    def size(self) -&gt; int:
        """Lấy độ dài List (số phần tử hiện tại)"""
        return self._size

    def capacity(self) -&gt; int:
        """Lấy dung lượng List"""
        return self._capacity

    def get(self, index: int) -&gt; int:
        """Truy cập phần tử"""
        # Nếu chỉ mục vượt phạm vi, ném ngoại lệ như dưới đây
        if index &lt; 0 or index &gt;= self._size:
            raise IndexError("Chỉ mục vượt phạm vi")
        return self._arr[index]

    def set(self, num: int, index: int):
        """Cập nhật phần tử"""
        if index &lt; 0 or index &gt;= self._size:
            raise IndexError("Chỉ mục vượt phạm vi")
        self._arr[index] = num

    def add(self, num: int):
        """Thêm phần tử ở cuối"""
        # Khi số lượng phần tử vượt quá dung lượng, kích hoạt cơ chế mở rộng
        if self.size() == self.capacity():
            self.extend_capacity()
        self._arr[self._size] = num
        self._size += 1

    def insert(self, num: int, index: int):
        """Chèn phần tử vào giữa"""
        if index &lt; 0 or index &gt;= self._size:
            raise IndexError("Chỉ mục vượt phạm vi")
        # Khi số lượng phần tử vượt quá dung lượng, kích hoạt cơ chế mở rộng
        if self._size == self.capacity():
            self.extend_capacity()
        # Dịch chuyển tất cả phần tử từ chỉ mục index trở đi sang phải một vị trí
        for j in range(self._size - 1, index - 1, -1):
            self._arr[j + 1] = self._arr[j]
        self._arr[index] = num
        # Cập nhật số lượng phần tử
        self._size += 1

    def remove(self, index: int) -&gt; int:
        """Xóa phần tử"""
        if index &lt; 0 or index &gt;= self._size:
            raise IndexError("Chỉ mục vượt phạm vi")
        num = self._arr[index]
        # Dịch chuyển tất cả phần tử sau chỉ mục index sang trái một vị trí
        for j in range(index, self._size - 1):
            self._arr[j] = self._arr[j + 1]
        # Cập nhật số lượng phần tử
        self._size -= 1
        # Trả về phần tử vừa bị xóa
        return num

    def extend_capacity(self):
        """Mở rộng dung lượng List"""
        # Tạo một mảng mới có độ dài gấp _extend_ratio lần mảng gốc, và sao chép mảng gốc sang mảng mới
        self._arr = self._arr + [0] * self.capacity() * (self._extend_ratio - 1)
        # Cập nhật dung lượng List
        self._capacity = len(self._arr)

    def to_array(self) -&gt; list[int]:
        """Trả về List với độ dài hợp lệ"""
        return self._arr[: self._size]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Lớp List tự triển khai */
class MyList {
  private:
    int *arr;             // Mảng (lưu trữ các phần tử List)
    int arrCapacity = 10;  // Dung lượng List
    int arrSize = 0;       // Độ dài List (số phần tử hiện tại)
    int extendRatio = 2;   // Hệ số mở rộng dung lượng List mỗi lần

  public:
    /* Hàm khởi tạo */
    MyList() {
        arr = new int[arrCapacity];
    }

    /* Hàm hủy */
    ~MyList() {
        delete[] arr;
    }

    /* Lấy độ dài List (số phần tử hiện tại) */
    int size() {
        return arrSize;
    }

    /* Lấy dung lượng List */
    int capacity() {
        return arrCapacity;
    }

    /* Truy cập phần tử */
    int get(int index) {
        // Nếu chỉ mục vượt phạm vi, ném ngoại lệ như dưới đây
        if (index &lt; 0 || index &gt;= size())
            throw out_of_range("Chỉ mục vượt phạm vi");
        return arr[index];
    }

    /* Cập nhật phần tử */
    void set(int index, int num) {
        if (index &lt; 0 || index &gt;= size())
            throw out_of_range("Chỉ mục vượt phạm vi");
        arr[index] = num;
    }

    /* Thêm phần tử ở cuối */
    void add(int num) {
        // Khi số lượng phần tử vượt quá dung lượng, kích hoạt cơ chế mở rộng
        if (size() == capacity())
            extendCapacity();
        arr[size()] = num;
        // Cập nhật số lượng phần tử
        arrSize++;
    }

    /* Chèn phần tử vào giữa */
    void insert(int index, int num) {
        if (index &lt; 0 || index &gt;= size())
            throw out_of_range("Chỉ mục vượt phạm vi");
        // Khi số lượng phần tử vượt quá dung lượng, kích hoạt cơ chế mở rộng
        if (size() == capacity())
            extendCapacity();
        // Dịch chuyển tất cả phần tử sau chỉ mục index sang phải một vị trí
        for (int j = size() - 1; j &gt;= index; j--) {
            arr[j + 1] = arr[j];
        }
        arr[index] = num;
        // Cập nhật số lượng phần tử
        arrSize++;
    }

    /* Xóa phần tử */
    int remove(int index) {
        if (index &lt; 0 || index &gt;= size())
            throw out_of_range("Chỉ mục vượt phạm vi");
        int num = arr[index];
        // Dịch chuyển tất cả phần tử sau chỉ mục index sang trái một vị trí
        for (int j = index; j &lt; size() - 1; j++) {
            arr[j] = arr[j + 1];
        }
        // Cập nhật số lượng phần tử
        arrSize--;
        // Trả về phần tử vừa bị xóa
        return num;
    }

    /* Mở rộng dung lượng List */
    void extendCapacity() {
        // Tạo mảng mới có độ dài gấp extendRatio lần dung lượng cũ
        int newCapacity = capacity() * extendRatio;
        int *tmp = arr;
        arr = new int[newCapacity];
        // Sao chép tất cả phần tử từ mảng gốc sang mảng mới
        for (int i = 0; i &lt; size(); i++) {
            arr[i] = tmp[i];
        }
        // Giải phóng bộ nhớ
        delete[] tmp;
        arrCapacity = newCapacity;
    }

    /* Chuyển List thành Vector để in ra */
    vector&lt;int&gt; toVector() {
        vector&lt;int&gt; vec(size());
        for (int i = 0; i &lt; size(); i++) {
            vec[i] = arr[i];
        }
        return vec;
    }
};</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Lớp List tự triển khai */
class MyList {
    private int[] arr;         // Mảng (lưu trữ các phần tử List)
    private int capacity = 10; // Dung lượng List
    private int size = 0;      // Độ dài List (số phần tử hiện tại)
    private int extendRatio = 2; // Hệ số mở rộng dung lượng List mỗi lần

    /* Hàm khởi tạo */
    public MyList() {
        arr = new int[capacity];
    }

    /* Lấy độ dài List (số phần tử hiện tại) */
    public int size() {
        return size;
    }

    /* Lấy dung lượng List */
    public int capacity() {
        return capacity;
    }

    /* Truy cập phần tử */
    public int get(int index) {
        // Nếu chỉ mục vượt phạm vi, ném ngoại lệ như dưới đây
        if (index &lt; 0 || index &gt;= size)
            throw new IndexOutOfBoundsException("Chỉ mục vượt phạm vi");
        return arr[index];
    }

    /* Cập nhật phần tử */
    public void set(int index, int num) {
        if (index &lt; 0 || index &gt;= size)
            throw new IndexOutOfBoundsException("Chỉ mục vượt phạm vi");
        arr[index] = num;
    }

    /* Thêm phần tử ở cuối */
    public void add(int num) {
        // Khi số lượng phần tử vượt quá dung lượng, kích hoạt cơ chế mở rộng
        if (size == capacity())
            extendCapacity();
        arr[size] = num;
        // Cập nhật số lượng phần tử
        size++;
    }

    /* Chèn phần tử vào giữa */
    public void insert(int index, int num) {
        if (index &lt; 0 || index &gt;= size)
            throw new IndexOutOfBoundsException("Chỉ mục vượt phạm vi");
        // Khi số lượng phần tử vượt quá dung lượng, kích hoạt cơ chế mở rộng
        if (size == capacity())
            extendCapacity();
        // Dịch chuyển tất cả phần tử sau chỉ mục index sang phải một vị trí
        for (int j = size - 1; j &gt;= index; j--) {
            arr[j + 1] = arr[j];
        }
        arr[index] = num;
        // Cập nhật số lượng phần tử
        size++;
    }

    /* Xóa phần tử */
    public int remove(int index) {
        if (index &lt; 0 || index &gt;= size)
            throw new IndexOutOfBoundsException("Chỉ mục vượt phạm vi");
        int num = arr[index];
        // Dịch chuyển tất cả phần tử sau chỉ mục forward một vị trí
        for (int j = index; j &lt; size - 1; j++) {
            arr[j] = arr[j + 1];
        }
        // Cập nhật số lượng phần tử
        size--;
        // Trả về phần tử vừa bị xóa
        return num;
    }

    /* Mở rộng dung lượng List */
    public void extendCapacity() {
        // Tạo mảng mới có độ dài gấp extendRatio lần mảng gốc và sao chép mảng gốc sang mảng mới
        arr = Arrays.copyOf(arr, capacity() * extendRatio);
        // Cập nhật dung lượng List
        capacity = arr.length;
    }

    /* Chuyển List thành mảng */
    public int[] toArray() {
        int size = size();
        int[] arr = new int[size];
        for (int i = 0; i &lt; size; i++) {
            arr[i] = get(i);
        }
        return arr;
    }
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Lớp List tự triển khai */
class MyList {
    #arr = new Array();   // Mảng (lưu trữ các phần tử List)
    #capacity = 10;       // Dung lượng List
    #size = 0;            // Độ dài List (số phần tử hiện tại)
    #extendRatio = 2;     // Hệ số mở rộng dung lượng List mỗi lần

    /* Hàm khởi tạo */
    constructor() {
        this.#arr = new Array(this.#capacity);
    }

    /* Lấy độ dài List (số phần tử hiện tại) */
    size() {
        return this.#size;
    }

    /* Lấy dung lượng List */
    capacity() {
        return this.#capacity;
    }

    /* Truy cập phần tử */
    get(index) {
        // Nếu chỉ mục vượt phạm vi, ném ngoại lệ như dưới đây
        if (index &lt; 0 || index &gt;= this.#size) throw new Error('Chỉ mục vượt phạm vi');
        return this.#arr[index];
    }

    /* Cập nhật phần tử */
    set(index, num) {
        if (index &lt; 0 || index &gt;= this.#size) throw new Error('Chỉ mục vượt phạm vi');
        this.#arr[index] = num;
    }

    /* Thêm phần tử ở cuối */
    add(num) {
        // Nếu độ dài bằng dung lượng, cần mở rộng
        if (this.#size === this.#capacity) {
            this.extendCapacity();
        }
        // Thêm phần tử mới vào cuối List
        this.#arr[this.#size] = num;
        this.#size++;
    }

    /* Chèn phần tử vào giữa */
    insert(index, num) {
        if (index &lt; 0 || index &gt;= this.#size) throw new Error('Chỉ mục vượt phạm vi');
        // Khi số lượng phần tử vượt quá dung lượng, kích hoạt cơ chế mở rộng
        if (this.#size === this.#capacity) {
            this.extendCapacity();
        }
        // Dịch chuyển tất cả phần tử sau chỉ mục index sang phải một vị trí
        for (let j = this.#size - 1; j &gt;= index; j--) {
            this.#arr[j + 1] = this.#arr[j];
        }
        // Cập nhật số lượng phần tử
        this.#arr[index] = num;
        this.#size++;
    }

    /* Xóa phần tử */
    remove(index) {
        if (index &lt; 0 || index &gt;= this.#size) throw new Error('Chỉ mục vượt phạm vi');
        let num = this.#arr[index];
        // Dịch chuyển tất cả phần tử sau chỉ mục index sang trái một vị trí
        for (let j = index; j &lt; this.#size - 1; j++) {
            this.#arr[j] = this.#arr[j + 1];
        }
        // Cập nhật số lượng phần tử
        this.#size--;
        // Trả về phần tử vừa bị xóa
        return num;
    }

    /* Mở rộng dung lượng List */
    extendCapacity() {
        // Tạo mảng mới có độ dài gấp extendRatio lần mảng gốc và sao chép mảng gốc sang mảng mới
        this.#arr = this.#arr.concat(
            new Array(this.capacity() * (this.#extendRatio - 1))
        );
        // Cập nhật dung lượng List
        this.#capacity = this.#arr.length;
    }

    /* Chuyển List thành mảng */
    toArray() {
        let size = this.size();
        const arr = new Array(size);
        for (let i = 0; i &lt; size; i++) {
            arr[i] = this.get(i);
        }
        return arr;
    }
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Lớp List tự triển khai */
class MyList {
    private var arr: IntArray = intArrayOf() // Mảng (lưu trữ các phần tử List)
    private var capacity: Int = 10 // Dung lượng List
    private var size: Int = 0      // Độ dài List (số phần tử hiện tại)
    private var extendRatio: Int = 2 // Hệ số mở rộng dung lượng List mỗi lần

    /* Hàm khởi tạo */
    init {
        arr = IntArray(capacity)
    }

    /* Lấy độ dài List (số phần tử hiện tại) */
    fun size(): Int {
        return size
    }

    /* Lấy dung lượng List */
    fun capacity(): Int {
        return capacity
    }

    /* Truy cập phần tử */
    fun get(index: Int): Int {
        // Nếu chỉ mục vượt phạm vi, ném ngoại lệ như dưới đây
        if (index &lt; 0 || index &gt;= size)
            throw IndexOutOfBoundsException("Chỉ mục vượt phạm vi")
        return arr[index]
    }

    /* Cập nhật phần tử */
    fun set(index: Int, num: Int) {
        if (index &lt; 0 || index &gt;= size)
            throw IndexOutOfBoundsException("Chỉ mục vượt phạm vi")
        arr[index] = num
    }

    /* Thêm phần tử ở cuối */
    fun add(num: Int) {
        // Khi số lượng phần tử vượt quá dung lượng, kích hoạt cơ chế mở rộng
        if (size == capacity())
            extendCapacity()
        arr[size] = num
        // Cập nhật số lượng phần tử
        size++
    }

    /* Chèn phần tử vào giữa */
    fun insert(index: Int, num: Int) {
        if (index &lt; 0 || index &gt;= size)
            throw IndexOutOfBoundsException("Chỉ mục vượt phạm vi")
        // Khi số lượng phần tử vượt quá dung lượng, kích hoạt cơ chế mở rộng
        if (size == capacity())
            extendCapacity()
        // Dịch chuyển tất cả phần tử sau chỉ mục index sang phải một vị trí
        for (j in size - 1 downTo index)
            arr[j + 1] = arr[j]
        arr[index] = num
        // Cập nhật số lượng phần tử
        size++
    }

    /* Xóa phần tử */
    fun remove(index: Int): Int {
        if (index &lt; 0 || index &gt;= size)
            throw IndexOutOfBoundsException("Chỉ mục vượt phạm vi")
        val num = arr[index]
        // Dịch chuyển tất cả phần tử sau chỉ mục index sang trái một vị trí
        for (j in index..&lt;size - 1)
            arr[j] = arr[j + 1]
        // Cập nhật số lượng phần tử
        size--
        // Trả về phần tử vừa bị xóa
        return num
    }

    /* Mở rộng dung lượng List */
    fun extendCapacity() {
        // Tạo mảng mới có độ dài gấp extendRatio lần mảng gốc và sao chép mảng gốc sang mảng mới
        arr = arr.copyOf(capacity() * extendRatio)
        // Cập nhật dung lượng List
        capacity = arr.size
    }

    /* Chuyển List thành mảng */
    fun toArray(): IntArray {
        val size = size()
        val arr = IntArray(size)
        for (i in 0..&lt;size) {
            arr[i] = get(i)
        }
        return arr
    }
}</code></pre></div></div></div>

`,
    originalContent: `
# List

A <u>list</u> is an abstract data structure concept that represents an ordered collection of elements, supporting operations such as element access, modification, insertion, deletion, and traversal, without requiring users to consider capacity limitations. Lists can be implemented based on linked lists or arrays.

- A linked list can naturally be viewed as a list: it supports insertion, deletion, search, and update, and can grow flexibly as needed.
- An array also supports insertion, deletion, search, and update, but because its length is fixed, it can only be regarded as a list with a capacity limit.

When a list is implemented with an array, **its fixed length makes it less practical**. This is because we usually cannot determine in advance how much data we need to store, making it difficult to choose an appropriate capacity. If the capacity is too small, it may fail to meet our needs; if it is too large, memory space will be wasted.

To solve this problem, we can use a <u>dynamic array</u> to implement a list. It inherits all the advantages of arrays while supporting dynamic resizing during program execution.

In fact, **the list types provided by the standard libraries of many programming languages are implemented with dynamic arrays**, such as \`list\` in Python, \`ArrayList\` in Java, \`vector\` in C++, and \`List\` in C#. In the following discussion, we will treat "list" and "dynamic array" as equivalent concepts.

## Common List Operations

### Initialize a List

We typically initialize a list in one of two ways: empty or with predefined values:

=== "Python"

    \`\`\`python title="list.py"
    # Initialize a list
    # Without initial values
    nums1: list[int] = []
    # With initial values
    nums: list[int] = [1, 3, 2, 5, 4]
    \`\`\`

=== "C++"

    \`\`\`cpp title="list.cpp"
    /* Initialize a list */
    // Note that vector in C++ is equivalent to nums as described in this article
    // Without initial values
    vector<int> nums1;
    // With initial values
    vector<int> nums = { 1, 3, 2, 5, 4 };
    \`\`\`

=== "Java"

    \`\`\`java title="list.java"
    /* Initialize a list */
    // Without initial values
    List<Integer> nums1 = new ArrayList<>();
    // With initial values (note that array elements should use the wrapper class Integer[] instead of int[])
    Integer[] numbers = new Integer[] { 1, 3, 2, 5, 4 };
    List<Integer> nums = new ArrayList<>(Arrays.asList(numbers));
    \`\`\`

=== "C#"

    \`\`\`csharp title="list.cs"
    /* Initialize a list */
    // Without initial values
    List<int> nums1 = [];
    // With initial values
    int[] numbers = [1, 3, 2, 5, 4];
    List<int> nums = [.. numbers];
    \`\`\`

=== "Go"

    \`\`\`go title="list_test.go"
    /* Initialize a list */
    // Without initial values
    nums1 := []int{}
    // With initial values
    nums := []int{1, 3, 2, 5, 4}
    \`\`\`

=== "Swift"

    \`\`\`swift title="list.swift"
    /* Initialize a list */
    // Without initial values
    let nums1: [Int] = []
    // With initial values
    var nums = [1, 3, 2, 5, 4]
    \`\`\`

=== "JS"

    \`\`\`javascript title="list.js"
    /* Initialize a list */
    // Without initial values
    const nums1 = [];
    // With initial values
    const nums = [1, 3, 2, 5, 4];
    \`\`\`

=== "TS"

    \`\`\`typescript title="list.ts"
    /* Initialize a list */
    // Without initial values
    const nums1: number[] = [];
    // With initial values
    const nums: number[] = [1, 3, 2, 5, 4];
    \`\`\`

=== "Dart"

    \`\`\`dart title="list.dart"
    /* Initialize a list */
    // Without initial values
    List<int> nums1 = [];
    // With initial values
    List<int> nums = [1, 3, 2, 5, 4];
    \`\`\`

=== "Rust"

    \`\`\`rust title="list.rs"
    /* Initialize a list */
    // Without initial values
    let nums1: Vec<i32> = Vec::new();
    // With initial values
    let nums: Vec<i32> = vec![1, 3, 2, 5, 4];
    \`\`\`

=== "C"

    \`\`\`c title="list.c"
    // C does not provide built-in dynamic arrays
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="list.kt"
    /* Initialize a list */
    // Without initial values
    var nums1 = listOf<Int>()
    // With initial values
    var numbers = arrayOf(1, 3, 2, 5, 4)
    var nums = numbers.toMutableList()
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="list.rb"
    # Initialize a list
    # Without initial values
    nums1 = []
    # With initial values
    nums = [1, 3, 2, 5, 4]
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E5%88%97%E8%A1%A8%0A%20%20%20%20%23%20%E6%97%A0%E5%88%9D%E5%A7%8B%E5%80%BC%0A%20%20%20%20nums1%20%3D%20%5B%5D%0A%20%20%20%20%23%20%E6%9C%89%E5%88%9D%E5%A7%8B%E5%80%BC%0A%20%20%20%20nums%20%3D%20%5B1,%203,%202,%205,%204%5D&cumulative=false&curInstr=4&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

### Access Elements

Since a list is essentially an array, we can access and update elements in $O(1)$ time complexity, which is very efficient.

=== "Python"

    \`\`\`python title="list.py"
    # Access an element
    num: int = nums[1]  # Access element at index 1

    # Update an element
    nums[1] = 0    # Update element at index 1 to 0
    \`\`\`

=== "C++"

    \`\`\`cpp title="list.cpp"
    /* Access an element */
    int num = nums[1];  // Access element at index 1

    /* Update an element */
    nums[1] = 0;  // Update element at index 1 to 0
    \`\`\`

=== "Java"

    \`\`\`java title="list.java"
    /* Access an element */
    int num = nums.get(1);  // Access element at index 1

    /* Update an element */
    nums.set(1, 0);  // Update element at index 1 to 0
    \`\`\`

=== "C#"

    \`\`\`csharp title="list.cs"
    /* Access an element */
    int num = nums[1];  // Access element at index 1

    /* Update an element */
    nums[1] = 0;  // Update element at index 1 to 0
    \`\`\`

=== "Go"

    \`\`\`go title="list_test.go"
    /* Access an element */
    num := nums[1]  // Access element at index 1

    /* Update an element */
    nums[1] = 0     // Update element at index 1 to 0
    \`\`\`

=== "Swift"

    \`\`\`swift title="list.swift"
    /* Access an element */
    let num = nums[1] // Access element at index 1

    /* Update an element */
    nums[1] = 0 // Update element at index 1 to 0
    \`\`\`

=== "JS"

    \`\`\`javascript title="list.js"
    /* Access an element */
    const num = nums[1];  // Access element at index 1

    /* Update an element */
    nums[1] = 0;  // Update element at index 1 to 0
    \`\`\`

=== "TS"

    \`\`\`typescript title="list.ts"
    /* Access an element */
    const num: number = nums[1];  // Access element at index 1

    /* Update an element */
    nums[1] = 0;  // Update element at index 1 to 0
    \`\`\`

=== "Dart"

    \`\`\`dart title="list.dart"
    /* Access an element */
    int num = nums[1];  // Access element at index 1

    /* Update an element */
    nums[1] = 0;  // Update element at index 1 to 0
    \`\`\`

=== "Rust"

    \`\`\`rust title="list.rs"
    /* Access an element */
    let num: i32 = nums[1];  // Access element at index 1
    /* Update an element */
    nums[1] = 0;             // Update element at index 1 to 0
    \`\`\`

=== "C"

    \`\`\`c title="list.c"
    // C does not provide built-in dynamic arrays
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="list.kt"
    /* Access an element */
    val num = nums[1]       // Access element at index 1
    /* Update an element */
    nums[1] = 0             // Update element at index 1 to 0
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="list.rb"
    # Access an element
    num = nums[1] # Access element at index 1
    # Update an element
    nums[1] = 0 # Update element at index 1 to 0
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E5%88%97%E8%A1%A8%0A%20%20%20%20nums%20%3D%20%5B1,%203,%202,%205,%204%5D%0A%0A%20%20%20%20%23%20%E8%AE%BF%E9%97%AE%E5%85%83%E7%B4%A0%0A%20%20%20%20num%20%3D%20nums%5B1%5D%20%20%23%20%E8%AE%BF%E9%97%AE%E7%B4%A2%E5%BC%95%201%20%E5%A4%84%E7%9A%84%E5%85%83%E7%B4%A0%0A%0A%20%20%20%20%23%20%E6%9B%B4%E6%96%B0%E5%85%83%E7%B4%A0%0A%20%20%20%20nums%5B1%5D%20%3D%200%20%20%20%20%23%20%E5%B0%86%E7%B4%A2%E5%BC%95%201%20%E5%A4%84%E7%9A%84%E5%85%83%E7%B4%A0%E6%9B%B4%E6%96%B0%E4%B8%BA%200&cumulative=false&curInstr=3&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

### Insert and Delete Elements

Compared to arrays, lists can freely add and delete elements. Adding an element at the end of a list has a time complexity of $O(1)$, but inserting and deleting elements still have the same efficiency as arrays, with a time complexity of $O(n)$.

=== "Python"

    \`\`\`python title="list.py"
    # Clear the list
    nums.clear()

    # Add elements at the end
    nums.append(1)
    nums.append(3)
    nums.append(2)
    nums.append(5)
    nums.append(4)

    # Insert an element in the middle
    nums.insert(3, 6)  # Insert number 6 at index 3

    # Delete an element
    nums.pop(3)        # Delete element at index 3
    \`\`\`

=== "C++"

    \`\`\`cpp title="list.cpp"
    /* Clear the list */
    nums.clear();

    /* Add elements at the end */
    nums.push_back(1);
    nums.push_back(3);
    nums.push_back(2);
    nums.push_back(5);
    nums.push_back(4);

    /* Insert an element in the middle */
    nums.insert(nums.begin() + 3, 6);  // Insert number 6 at index 3

    /* Delete an element */
    nums.erase(nums.begin() + 3);      // Delete element at index 3
    \`\`\`

=== "Java"

    \`\`\`java title="list.java"
    /* Clear the list */
    nums.clear();

    /* Add elements at the end */
    nums.add(1);
    nums.add(3);
    nums.add(2);
    nums.add(5);
    nums.add(4);

    /* Insert an element in the middle */
    nums.add(3, 6);  // Insert number 6 at index 3

    /* Delete an element */
    nums.remove(3);  // Delete element at index 3
    \`\`\`

=== "C#"

    \`\`\`csharp title="list.cs"
    /* Clear the list */
    nums.Clear();

    /* Add elements at the end */
    nums.Add(1);
    nums.Add(3);
    nums.Add(2);
    nums.Add(5);
    nums.Add(4);

    /* Insert an element in the middle */
    nums.Insert(3, 6);  // Insert number 6 at index 3

    /* Delete an element */
    nums.RemoveAt(3);  // Delete element at index 3
    \`\`\`

=== "Go"

    \`\`\`go title="list_test.go"
    /* Clear the list */
    nums = nil

    /* Add elements at the end */
    nums = append(nums, 1)
    nums = append(nums, 3)
    nums = append(nums, 2)
    nums = append(nums, 5)
    nums = append(nums, 4)

    /* Insert an element in the middle */
    nums = append(nums[:3], append([]int{6}, nums[3:]...)...) // Insert number 6 at index 3

    /* Delete an element */
    nums = append(nums[:3], nums[4:]...) // Delete element at index 3
    \`\`\`

=== "Swift"

    \`\`\`swift title="list.swift"
    /* Clear the list */
    nums.removeAll()

    /* Add elements at the end */
    nums.append(1)
    nums.append(3)
    nums.append(2)
    nums.append(5)
    nums.append(4)

    /* Insert an element in the middle */
    nums.insert(6, at: 3) // Insert number 6 at index 3

    /* Delete an element */
    nums.remove(at: 3) // Delete element at index 3
    \`\`\`

=== "JS"

    \`\`\`javascript title="list.js"
    /* Clear the list */
    nums.length = 0;

    /* Add elements at the end */
    nums.push(1);
    nums.push(3);
    nums.push(2);
    nums.push(5);
    nums.push(4);

    /* Insert an element in the middle */
    nums.splice(3, 0, 6); // Insert number 6 at index 3

    /* Delete an element */
    nums.splice(3, 1);  // Delete element at index 3
    \`\`\`

=== "TS"

    \`\`\`typescript title="list.ts"
    /* Clear the list */
    nums.length = 0;

    /* Add elements at the end */
    nums.push(1);
    nums.push(3);
    nums.push(2);
    nums.push(5);
    nums.push(4);

    /* Insert an element in the middle */
    nums.splice(3, 0, 6); // Insert number 6 at index 3

    /* Delete an element */
    nums.splice(3, 1);  // Delete element at index 3
    \`\`\`

=== "Dart"

    \`\`\`dart title="list.dart"
    /* Clear the list */
    nums.clear();

    /* Add elements at the end */
    nums.add(1);
    nums.add(3);
    nums.add(2);
    nums.add(5);
    nums.add(4);

    /* Insert an element in the middle */
    nums.insert(3, 6); // Insert number 6 at index 3

    /* Delete an element */
    nums.removeAt(3); // Delete element at index 3
    \`\`\`

=== "Rust"

    \`\`\`rust title="list.rs"
    /* Clear the list */
    nums.clear();

    /* Add elements at the end */
    nums.push(1);
    nums.push(3);
    nums.push(2);
    nums.push(5);
    nums.push(4);

    /* Insert an element in the middle */
    nums.insert(3, 6);  // Insert number 6 at index 3

    /* Delete an element */
    nums.remove(3);    // Delete element at index 3
    \`\`\`

=== "C"

    \`\`\`c title="list.c"
    // C does not provide built-in dynamic arrays
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="list.kt"
    /* Clear the list */
    nums.clear();

    /* Add elements at the end */
    nums.add(1);
    nums.add(3);
    nums.add(2);
    nums.add(5);
    nums.add(4);

    /* Insert an element in the middle */
    nums.add(3, 6);  // Insert number 6 at index 3

    /* Delete an element */
    nums.remove(3);  // Delete element at index 3
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="list.rb"
    # Clear the list
    nums.clear

    # Add elements at the end
    nums << 1
    nums << 3
    nums << 2
    nums << 5
    nums << 4

    # Insert an element in the middle
    nums.insert(3, 6) # Insert number 6 at index 3

    # Delete an element
    nums.delete_at(3) # Delete element at index 3
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E6%9C%89%E5%88%9D%E5%A7%8B%E5%80%BC%0A%20%20%20%20nums%20%3D%20%5B1,%203,%202,%205,%204%5D%0A%20%20%20%20%0A%20%20%20%20%23%20%E6%B8%85%E7%A9%BA%E5%88%97%E8%A1%A8%0A%20%20%20%20nums.clear%28%29%0A%20%20%20%20%0A%20%20%20%20%23%20%E5%9C%A8%E5%B0%BE%E9%83%A8%E6%B7%BB%E5%8A%A0%E5%85%83%E7%B4%A0%0A%20%20%20%20nums.append%281%29%0A%20%20%20%20nums.append%283%29%0A%20%20%20%20nums.append%282%29%0A%20%20%20%20nums.append%285%29%0A%20%20%20%20nums.append%284%29%0A%20%20%20%20%0A%20%20%20%20%23%20%E5%9C%A8%E4%B8%AD%E9%97%B4%E6%8F%92%E5%85%A5%E5%85%83%E7%B4%A0%0A%20%20%20%20nums.insert%283,%206%29%20%20%23%20%E5%9C%A8%E7%B4%A2%E5%BC%95%203%20%E5%A4%84%E6%8F%92%E5%85%A5%E6%95%B0%E5%AD%97%206%0A%20%20%20%20%0A%20%20%20%20%23%20%E5%88%A0%E9%99%A4%E5%85%83%E7%B4%A0%0A%20%20%20%20nums.pop%283%29%20%20%20%20%20%20%20%20%23%20%E5%88%A0%E9%99%A4%E7%B4%A2%E5%BC%95%203%20%E5%A4%84%E7%9A%84%E5%85%83%E7%B4%A0&cumulative=false&curInstr=3&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

### Traverse a List

Like arrays, lists can be traversed by index or by directly iterating through elements.

=== "Python"

    \`\`\`python title="list.py"
    # Traverse the list by index
    count = 0
    for i in range(len(nums)):
        count += nums[i]

    # Traverse list elements directly
    for num in nums:
        count += num
    \`\`\`

=== "C++"

    \`\`\`cpp title="list.cpp"
    /* Traverse the list by index */
    int count = 0;
    for (int i = 0; i < nums.size(); i++) {
        count += nums[i];
    }

    /* Traverse list elements directly */
    count = 0;
    for (int num : nums) {
        count += num;
    }
    \`\`\`

=== "Java"

    \`\`\`java title="list.java"
    /* Traverse the list by index */
    int count = 0;
    for (int i = 0; i < nums.size(); i++) {
        count += nums.get(i);
    }

    /* Traverse list elements directly */
    for (int num : nums) {
        count += num;
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title="list.cs"
    /* Traverse the list by index */
    int count = 0;
    for (int i = 0; i < nums.Count; i++) {
        count += nums[i];
    }

    /* Traverse list elements directly */
    count = 0;
    foreach (int num in nums) {
        count += num;
    }
    \`\`\`

=== "Go"

    \`\`\`go title="list_test.go"
    /* Traverse the list by index */
    count := 0
    for i := 0; i < len(nums); i++ {
        count += nums[i]
    }

    /* Traverse list elements directly */
    count = 0
    for _, num := range nums {
        count += num
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title="list.swift"
    /* Traverse the list by index */
    var count = 0
    for i in nums.indices {
        count += nums[i]
    }

    /* Traverse list elements directly */
    count = 0
    for num in nums {
        count += num
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title="list.js"
    /* Traverse the list by index */
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        count += nums[i];
    }

    /* Traverse list elements directly */
    count = 0;
    for (const num of nums) {
        count += num;
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title="list.ts"
    /* Traverse the list by index */
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        count += nums[i];
    }

    /* Traverse list elements directly */
    count = 0;
    for (const num of nums) {
        count += num;
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title="list.dart"
    /* Traverse the list by index */
    int count = 0;
    for (var i = 0; i < nums.length; i++) {
        count += nums[i];
    }

    /* Traverse list elements directly */
    count = 0;
    for (var num in nums) {
        count += num;
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title="list.rs"
    // Traverse the list by index
    let mut _count = 0;
    for i in 0..nums.len() {
        _count += nums[i];
    }

    // Traverse list elements directly
    _count = 0;
    for num in &nums {
        _count += num;
    }
    \`\`\`

=== "C"

    \`\`\`c title="list.c"
    // C does not provide built-in dynamic arrays
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="list.kt"
    /* Traverse the list by index */
    var count = 0
    for (i in nums.indices) {
        count += nums[i]
    }

    /* Traverse list elements directly */
    for (num in nums) {
        count += num
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="list.rb"
    # Traverse the list by index
    count = 0
    for i in 0...nums.length
        count += nums[i]
    end

    # Traverse list elements directly
    count = 0
    for num in nums
        count += num
    end
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E5%88%97%E8%A1%A8%0A%20%20%20%20nums%20%3D%20%5B1,%203,%202,%205,%204%5D%0A%20%20%20%20%0A%20%20%20%20%23%20%E9%80%9A%E8%BF%87%E7%B4%A2%E5%BC%95%E9%81%8D%E5%8E%86%E5%88%97%E8%A1%A8%0A%20%20%20%20count%20%3D%200%0A%20%20%20%20for%20i%20in%20range%28len%28nums%29%29%3A%0A%20%20%20%20%20%20%20%20count%20%2B%3D%20nums%5Bi%5D%0A%0A%20%20%20%20%23%20%E7%9B%B4%E6%8E%A5%E9%81%8D%E5%8E%86%E5%88%97%E8%A1%A8%E5%85%83%E7%B4%A0%0A%20%20%20%20for%20num%20in%20nums%3A%0A%20%20%20%20%20%20%20%20count%20%2B%3D%20num&cumulative=false&curInstr=3&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

### Concatenate Lists

Given a new list \`nums1\`, we can concatenate it to the end of the original list.

=== "Python"

    \`\`\`python title="list.py"
    # Concatenate two lists
    nums1: list[int] = [6, 8, 7, 10, 9]
    nums += nums1  # Concatenate list nums1 to the end of nums
    \`\`\`

=== "C++"

    \`\`\`cpp title="list.cpp"
    /* Concatenate two lists */
    vector<int> nums1 = { 6, 8, 7, 10, 9 };
    // Concatenate list nums1 to the end of nums
    nums.insert(nums.end(), nums1.begin(), nums1.end());
    \`\`\`

=== "Java"

    \`\`\`java title="list.java"
    /* Concatenate two lists */
    List<Integer> nums1 = new ArrayList<>(Arrays.asList(new Integer[] { 6, 8, 7, 10, 9 }));
    nums.addAll(nums1);  // Concatenate list nums1 to the end of nums
    \`\`\`

=== "C#"

    \`\`\`csharp title="list.cs"
    /* Concatenate two lists */
    List<int> nums1 = [6, 8, 7, 10, 9];
    nums.AddRange(nums1);  // Concatenate list nums1 to the end of nums
    \`\`\`

=== "Go"

    \`\`\`go title="list_test.go"
    /* Concatenate two lists */
    nums1 := []int{6, 8, 7, 10, 9}
    nums = append(nums, nums1...)  // Concatenate list nums1 to the end of nums
    \`\`\`

=== "Swift"

    \`\`\`swift title="list.swift"
    /* Concatenate two lists */
    let nums1 = [6, 8, 7, 10, 9]
    nums.append(contentsOf: nums1) // Concatenate list nums1 to the end of nums
    \`\`\`

=== "JS"

    \`\`\`javascript title="list.js"
    /* Concatenate two lists */
    const nums1 = [6, 8, 7, 10, 9];
    nums.push(...nums1);  // Concatenate list nums1 to the end of nums
    \`\`\`

=== "TS"

    \`\`\`typescript title="list.ts"
    /* Concatenate two lists */
    const nums1: number[] = [6, 8, 7, 10, 9];
    nums.push(...nums1);  // Concatenate list nums1 to the end of nums
    \`\`\`

=== "Dart"

    \`\`\`dart title="list.dart"
    /* Concatenate two lists */
    List<int> nums1 = [6, 8, 7, 10, 9];
    nums.addAll(nums1);  // Concatenate list nums1 to the end of nums
    \`\`\`

=== "Rust"

    \`\`\`rust title="list.rs"
    /* Concatenate two lists */
    let nums1: Vec<i32> = vec![6, 8, 7, 10, 9];
    nums.extend(nums1);
    \`\`\`

=== "C"

    \`\`\`c title="list.c"
    // C does not provide built-in dynamic arrays
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="list.kt"
    /* Concatenate two lists */
    val nums1 = intArrayOf(6, 8, 7, 10, 9).toMutableList()
    nums.addAll(nums1)  // Concatenate list nums1 to the end of nums
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="list.rb"
    # Concatenate two lists
    nums1 = [6, 8, 7, 10, 9]
    nums += nums1
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E5%88%97%E8%A1%A8%0A%20%20%20%20nums%20%3D%20%5B1,%203,%202,%205,%204%5D%0A%20%20%20%20%0A%20%20%20%20%23%20%E6%8B%BC%E6%8E%A5%E4%B8%A4%E4%B8%AA%E5%88%97%E8%A1%A8%0A%20%20%20%20nums1%20%3D%20%5B6,%208,%207,%2010,%209%5D%0A%20%20%20%20nums%20%2B%3D%20nums1%20%20%23%20%E5%B0%86%E5%88%97%E8%A1%A8%20nums1%20%E6%8B%BC%E6%8E%A5%E5%88%B0%20nums%20%E4%B9%8B%E5%90%8E&cumulative=false&curInstr=3&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

### Sort a List

After sorting a list, we can use "binary search" and "two-pointer" algorithms, which are frequently tested in array algorithm problems.

=== "Python"

    \`\`\`python title="list.py"
    # Sort a list
    nums.sort()  # After sorting, list elements are arranged from smallest to largest
    \`\`\`

=== "C++"

    \`\`\`cpp title="list.cpp"
    /* Sort a list */
    sort(nums.begin(), nums.end());  // After sorting, list elements are arranged from smallest to largest
    \`\`\`

=== "Java"

    \`\`\`java title="list.java"
    /* Sort a list */
    Collections.sort(nums);  // After sorting, list elements are arranged from smallest to largest
    \`\`\`

=== "C#"

    \`\`\`csharp title="list.cs"
    /* Sort a list */
    nums.Sort(); // After sorting, list elements are arranged from smallest to largest
    \`\`\`

=== "Go"

    \`\`\`go title="list_test.go"
    /* Sort a list */
    sort.Ints(nums)  // After sorting, list elements are arranged from smallest to largest
    \`\`\`

=== "Swift"

    \`\`\`swift title="list.swift"
    /* Sort a list */
    nums.sort() // After sorting, list elements are arranged from smallest to largest
    \`\`\`

=== "JS"

    \`\`\`javascript title="list.js"
    /* Sort a list */
    nums.sort((a, b) => a - b);  // After sorting, list elements are arranged from smallest to largest
    \`\`\`

=== "TS"

    \`\`\`typescript title="list.ts"
    /* Sort a list */
    nums.sort((a, b) => a - b);  // After sorting, list elements are arranged from smallest to largest
    \`\`\`

=== "Dart"

    \`\`\`dart title="list.dart"
    /* Sort a list */
    nums.sort(); // After sorting, list elements are arranged from smallest to largest
    \`\`\`

=== "Rust"

    \`\`\`rust title="list.rs"
    /* Sort a list */
    nums.sort(); // After sorting, list elements are arranged from smallest to largest
    \`\`\`

=== "C"

    \`\`\`c title="list.c"
    // C does not provide built-in dynamic arrays
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="list.kt"
    /* Sort a list */
    nums.sort() // After sorting, list elements are arranged from smallest to largest
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="list.rb"
    # Sort a list
    nums = nums.sort { |a, b| a <=> b } # After sorting, list elements are arranged from smallest to largest
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E5%88%97%E8%A1%A8%0A%20%20%20%20nums%20%3D%20%5B1,%203,%202,%205,%204%5D%0A%20%20%20%20%0A%20%20%20%20%23%20%E6%8E%92%E5%BA%8F%E5%88%97%E8%A1%A8%0A%20%20%20%20nums.sort%28%29%20%20%23%20%E6%8E%92%E5%BA%8F%E5%90%8E%EF%BC%8C%E5%88%97%E8%A1%A8%E5%85%83%E7%B4%A0%E4%BB%8E%E5%B0%8F%E5%88%B0%E5%A4%A7%E6%8E%92%E5%88%97&cumulative=false&curInstr=3&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

## List Implementation

Many programming languages have built-in lists, such as Java, C++, and Python. Their implementations are quite complex, and the parameters are carefully considered, such as initial capacity, expansion multiples, and so on. Interested readers can consult the source code to learn more.

To deepen our understanding of how lists work, we attempt to implement a simple list with three key design considerations:

- **Initial capacity**: Select a reasonable initial capacity for the underlying array. In this example, we choose 10 as the initial capacity.
- **Size tracking**: Declare a variable \`size\` to record the current number of elements in the list and update it in real-time as elements are inserted and deleted. Based on this variable, we can locate the end of the list and determine whether expansion is needed.
- **Expansion mechanism**: When the list capacity is full upon inserting an element, we need to expand. We create a larger array based on the expansion multiple and then move all elements from the current array to the new array in order. In this example, we specify that the array should be expanded to 2 times its previous size each time.

\`\`\`src
[file]{my_list}-[class]{my_list}-[func]{}
\`\`\`

`
  },

  'dsa-ram-cache': {
    title: '4.4 Bộ nhớ RAM và Cache *',
    summary: 'Tìm hiểu ba loại thiết bị lưu trữ của máy tính (ổ cứng, RAM, cache) và cách cấu trúc vật lý của Mảng, Danh sách liên kết ảnh hưởng đến hiệu suất sử dụng bộ nhớ và tỷ lệ trúng cache.',
    tags: ['dsa', 'array', 'linkedlist', 'cache'],
    domain: 'Algorithms',
    module: 'Chương 4: Mảng & Danh sách liên kết',
    prerequisites: ['dsa-list'],
    related: ['dsa-array', 'dsa-linked-list'],
    updatedAt: '2026-07-18',
    readTime: '8 phút',
    content: `

<p>Trong hai phần đầu của chương này, chúng ta đã khám phá Mảng và Danh sách liên kết — hai cấu trúc dữ liệu cơ bản và quan trọng, đại diện cho hai bố cục vật lý: "lưu trữ liên tục" và "lưu trữ phân tán".</p>
<p>Trên thực tế, <strong>cấu trúc vật lý phần lớn quyết định hiệu suất mà chương trình sử dụng bộ nhớ và cache</strong>, từ đó ảnh hưởng đến hiệu năng tổng thể của các chương trình giải thuật.</p>

<h2>4.4.1 Thiết bị lưu trữ của máy tính</h2>
<p>Máy tính gồm ba loại thiết bị lưu trữ: <strong>ổ đĩa cứng (hard disk)</strong>, <strong>bộ nhớ truy cập ngẫu nhiên (RAM)</strong> và <strong>bộ nhớ cache</strong>. Bảng dưới đây cho thấy vai trò khác nhau và đặc điểm hiệu năng của chúng trong một hệ thống máy tính.</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin:1em 0;">
  <thead>
    <tr style="border-bottom:1px solid #30363d;text-align:left;">
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;"></th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Ổ đĩa cứng</th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">RAM</th>
      <th style="padding:8px 12px;color:#8b949e;font-weight:600;">Cache</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;">Mục đích</td>
      <td style="padding:8px 12px;color:#e6edf3;">Lưu trữ dài hạn dữ liệu, bao gồm hệ điều hành, chương trình và tệp tin</td>
      <td style="padding:8px 12px;color:#e6edf3;">Lưu trữ tạm thời chương trình đang chạy và dữ liệu đang xử lý</td>
      <td style="padding:8px 12px;color:#e6edf3;">Lưu trữ dữ liệu và lệnh được truy cập thường xuyên để giảm số lần CPU truy cập bộ nhớ</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;">Tính khả biến</td>
      <td style="padding:8px 12px;color:#e6edf3;">Dữ liệu không mất khi tắt nguồn</td>
      <td style="padding:8px 12px;color:#e6edf3;">Dữ liệu mất khi tắt nguồn</td>
      <td style="padding:8px 12px;color:#e6edf3;">Dữ liệu mất khi tắt nguồn</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;">Dung lượng</td>
      <td style="padding:8px 12px;color:#e6edf3;">Lớn, cỡ terabyte (TB)</td>
      <td style="padding:8px 12px;color:#e6edf3;">Nhỏ, cỡ gigabyte (GB)</td>
      <td style="padding:8px 12px;color:#e6edf3;">Rất nhỏ, cỡ megabyte (MB)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:8px 12px;color:#e6edf3;">Tốc độ</td>
      <td style="padding:8px 12px;color:#e6edf3;">Chậm, hàng trăm đến hàng nghìn MB/s</td>
      <td style="padding:8px 12px;color:#e6edf3;">Nhanh, hàng chục GB/s</td>
      <td style="padding:8px 12px;color:#e6edf3;">Rất nhanh, hàng chục đến hàng trăm GB/s</td>
    </tr>
    <tr>
      <td style="padding:8px 12px;color:#e6edf3;">Chi phí</td>
      <td style="padding:8px 12px;color:#e6edf3;">Rẻ, từ vài phần mười đến vài đơn vị tiền tệ mỗi GB</td>
      <td style="padding:8px 12px;color:#e6edf3;">Đắt, từ vài chục đến vài trăm đơn vị tiền tệ mỗi GB</td>
      <td style="padding:8px 12px;color:#e6edf3;">Rất đắt, gần như được tính gộp vào giá CPU</td>
    </tr>
  </tbody>
</table>
<p>Chúng ta có thể hình dung hệ thống lưu trữ của máy tính giống như một kim tự tháp, như trong sơ đồ dưới đây. Các thiết bị lưu trữ càng gần đỉnh thì càng nhanh, dung lượng càng nhỏ và càng đắt tiền. Thiết kế nhiều lớp này là có chủ đích, là kết quả của sự cân nhắc kỹ lưỡng từ các nhà khoa học và kỹ sư máy tính.</p>
<ul>
  <li><strong>Ổ đĩa cứng không thể dễ dàng được thay thế bằng RAM.</strong> Trước hết, dữ liệu trong bộ nhớ bị mất khi tắt nguồn, khiến nó không phù hợp để lưu trữ dữ liệu dài hạn. Thứ hai, bộ nhớ đắt hơn ổ đĩa cứng hàng chục lần, khiến nó khó phổ biến trên thị trường tiêu dùng.</li>
  <li><strong>Cache không thể vừa có dung lượng lớn vừa có tốc độ cao.</strong> Khi dung lượng cache L1, L2, L3 tăng lên, kích thước vật lý của chúng trở nên lớn hơn, và khoảng cách vật lý giữa chúng với lõi CPU tăng lên, dẫn đến thời gian truyền dữ liệu lâu hơn và độ trễ truy cập phần tử cao hơn. Với công nghệ hiện tại, cấu trúc cache nhiều lớp đại diện cho điểm cân bằng tốt nhất giữa dung lượng, tốc độ và chi phí.</li>
</ul>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/storage_pyramid.png" alt="Hệ thống lưu trữ của máy tính" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Cấu trúc phân cấp lưu trữ của máy tính thể hiện sự cân bằng tinh tế giữa tốc độ, dung lượng và chi phí. Trên thực tế, những sự đánh đổi như vậy phổ biến trong mọi lĩnh vực công nghiệp, đòi hỏi chúng ta phải tìm ra điểm cân bằng tối ưu giữa các ưu điểm và ràng buộc khác nhau.</p>
  </div>
</div>
<p>Tóm lại, <strong>ổ đĩa cứng được dùng để lưu trữ dài hạn lượng lớn dữ liệu, RAM được dùng để lưu trữ tạm thời dữ liệu đang được xử lý trong khi chương trình chạy, và cache được dùng để lưu trữ dữ liệu và lệnh được truy cập thường xuyên</strong>, từ đó cải thiện hiệu suất thực thi chương trình. Cả ba phối hợp với nhau để giữ cho hệ thống máy tính hoạt động hiệu quả.</p>
<p>Như sơ đồ dưới đây, trong quá trình chạy chương trình, dữ liệu được đọc từ ổ đĩa cứng vào RAM để CPU tính toán. Cache có thể được xem là một phần của CPU. <strong>Bằng cách nạp dữ liệu một cách thông minh từ RAM</strong>, nó cung cấp cho CPU khả năng truy cập dữ liệu tốc độ cao, cải thiện đáng kể hiệu suất thực thi chương trình và giảm sự phụ thuộc vào RAM chậm hơn.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/computer_storage_devices.png" alt="Luồng dữ liệu giữa Ổ đĩa cứng, RAM và Cache" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>4.4.2 Hiệu suất bộ nhớ của các cấu trúc dữ liệu</h2>
<p>Xét về mặt sử dụng không gian bộ nhớ, Mảng và Danh sách liên kết mỗi loại đều có ưu điểm và hạn chế riêng.</p>
<p>Một mặt, <strong>bộ nhớ có giới hạn, và cùng một vùng nhớ không thể được chia sẻ bởi nhiều chương trình</strong>, vì vậy chúng ta mong muốn các cấu trúc dữ liệu sử dụng không gian hiệu quả nhất có thể. Các phần tử mảng được xếp sít nhau và không cần thêm không gian để lưu trữ tham chiếu (con trỏ) giữa các node của danh sách liên kết, do đó có hiệu suất không gian cao hơn. Tuy nhiên, mảng cần phân bổ đủ vùng nhớ liên tục ngay một lần, điều này có thể dẫn đến lãng phí bộ nhớ, và việc mở rộng mảng đòi hỏi thêm chi phí thời gian và không gian. So sánh với đó, danh sách liên kết thực hiện việc cấp phát và giải phóng bộ nhớ động theo từng "node", mang lại tính linh hoạt cao hơn.</p>
<p>Mặt khác, trong quá trình chạy chương trình, <strong>khi bộ nhớ liên tục được cấp phát và giải phóng, mức độ phân mảnh của bộ nhớ trống ngày càng nghiêm trọng hơn</strong>, dẫn đến hiệu suất sử dụng bộ nhớ giảm. Mảng, do cách lưu trữ liên tục, tương đối ít bị phân mảnh bộ nhớ. Ngược lại, các phần tử của danh sách liên kết được phân bố rải rác trong bộ nhớ, và các thao tác chèn/xóa thường xuyên dễ gây ra phân mảnh bộ nhớ hơn.</p>

<h2>4.4.3 Hiệu suất Cache của các cấu trúc dữ liệu</h2>
<p>Mặc dù cache có dung lượng nhỏ hơn nhiều so với bộ nhớ, nó lại nhanh hơn bộ nhớ rất nhiều và đóng vai trò quan trọng trong tốc độ thực thi chương trình. Vì dung lượng cache có hạn và chỉ có thể lưu trữ một phần nhỏ dữ liệu được truy cập thường xuyên, khi CPU cố gắng truy cập dữ liệu không có trong cache, một <strong>cache miss (bỏ lỡ cache)</strong> xảy ra, và CPU phải nạp dữ liệu cần thiết từ bộ nhớ chậm hơn.</p>
<p>Rõ ràng, <strong>số lượng "cache miss" càng ít thì hiệu suất đọc/ghi dữ liệu của CPU càng cao</strong>, và hiệu năng chương trình càng tốt. Chúng ta gọi tỷ lệ dữ liệu mà CPU lấy thành công từ cache là <strong>tỷ lệ trúng cache (cache hit rate)</strong>, một chỉ số thường được dùng để đo hiệu suất cache.</p>
<p>Để đạt được hiệu suất cao nhất có thể, cache sử dụng các cơ chế nạp dữ liệu sau đây.</p>
<ul>
  <li><strong>Dòng cache (cache lines):</strong> Cache không lưu trữ và nạp dữ liệu theo từng byte, mà theo các dòng cache. So với truyền theo byte, truyền theo dòng cache hiệu quả hơn.</li>
  <li><strong>Cơ chế nạp trước (prefetching):</strong> Bộ xử lý cố gắng dự đoán mẫu truy cập dữ liệu (ví dụ: truy cập tuần tự, truy cập nhảy bước cố định, v.v.) và nạp dữ liệu vào cache theo các mẫu cụ thể, từ đó cải thiện tỷ lệ trúng.</li>
  <li><strong>Tính cục bộ không gian (spatial locality):</strong> Nếu một phần dữ liệu được truy cập, dữ liệu lân cận cũng có thể được truy cập trong tương lai gần. Do đó, khi cache nạp một phần dữ liệu cụ thể, nó cũng nạp dữ liệu lân cận để cải thiện tỷ lệ trúng.</li>
  <li><strong>Tính cục bộ thời gian (temporal locality):</strong> Nếu một phần dữ liệu được truy cập, nó có khả năng được truy cập lại trong tương lai gần. Cache tận dụng nguyên lý này bằng cách giữ lại dữ liệu được truy cập gần đây để cải thiện tỷ lệ trúng.</li>
</ul>
<p>Trên thực tế, <strong>mảng và danh sách liên kết khác nhau về mức độ hiệu quả khi sử dụng cache</strong>, chủ yếu ở các khía cạnh sau.</p>
<ul>
  <li><strong>Không gian chiếm dụng:</strong> Các phần tử danh sách liên kết chiếm nhiều không gian hơn phần tử mảng, do đó ít dữ liệu hữu ích hơn có thể vừa với cache.</li>
  <li><strong>Dòng cache:</strong> Dữ liệu của danh sách liên kết nằm rải rác trong bộ nhớ, trong khi cache nạp "theo dòng", nên tỷ lệ dữ liệu không hợp lệ được nạp cao hơn.</li>
  <li><strong>Cơ chế nạp trước:</strong> Mảng có mẫu truy cập dữ liệu "dễ dự đoán" hơn danh sách liên kết, khiến hệ thống dễ dàng đoán được dữ liệu nào sẽ được nạp tiếp theo.</li>
  <li><strong>Tính cục bộ không gian:</strong> Mảng được lưu trữ trong vùng nhớ tập trung, do đó dữ liệu gần dữ liệu đã nạp có khả năng được truy cập sớm hơn.</li>
</ul>
<p>Nhìn chung, <strong>mảng có tỷ lệ trúng cache cao hơn, do đó chúng thường vượt trội hơn danh sách liên kết về hiệu suất hoạt động</strong>. Điều này khiến các cấu trúc dữ liệu được triển khai dựa trên mảng trở nên phổ biến hơn khi giải quyết các bài toán giải thuật.</p>
<p>Cần lưu ý rằng <strong>hiệu suất cache cao không có nghĩa là mảng luôn vượt trội hơn danh sách liên kết trong mọi trường hợp</strong>. Trong các ứng dụng thực tế, việc chọn cấu trúc dữ liệu nào nên dựa trên yêu cầu cụ thể. Ví dụ, cả mảng và danh sách liên kết đều có thể triển khai cấu trúc dữ liệu "Stack" (sẽ được thảo luận chi tiết ở chương tiếp theo), nhưng chúng phù hợp với các tình huống khác nhau.</p>
<ul>
  <li>Khi giải các bài toán giải thuật, chúng ta thường ưu tiên triển khai Stack dựa trên mảng, vì chúng cho hiệu suất hoạt động cao hơn và khả năng truy cập ngẫu nhiên, đổi lại là cần cấp phát trước một lượng không gian bộ nhớ nhất định cho mảng.</li>
  <li>Nếu lượng dữ liệu rất lớn, tính động cao, và kích thước dự kiến của Stack khó ước lượng, thì việc triển khai Stack dựa trên danh sách liên kết phù hợp hơn. Danh sách liên kết có thể phân bố lượng lớn dữ liệu ở các phần khác nhau của bộ nhớ và tránh được chi phí phát sinh thêm do việc mở rộng mảng.</li>
</ul>

`,
    originalContent: `
# Random-Access Memory and Cache *

In the first two sections of this chapter, we explored arrays and linked lists, two fundamental and important data structures that represent two physical layouts: "contiguous storage" and "distributed storage", respectively.

In fact, **physical structure largely determines the efficiency with which programs utilize memory and cache**, which in turn affects the overall performance of algorithmic programs.

## Computer Storage Devices

Computers include three types of storage devices: <u>hard disk</u>, <u>random-access memory (RAM)</u>, and <u>cache memory</u>. The following table shows their different roles and performance characteristics in a computer system.

<p align="center"> Table <id> &nbsp; Computer Storage Devices </p>

|                | Hard Disk                                                     | RAM                                              | Cache                                                          |
| -------------- | ------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------- |
| Purpose        | Long-term storage of data, including operating systems, programs, and files | Temporary storage of currently running programs and data being processed | Storage of frequently accessed data and instructions to reduce CPU's accesses to memory |
| Volatility     | Data is not lost after power-off                             | Data is lost after power-off                    | Data is lost after power-off                                  |
| Capacity       | Large, on the order of terabytes (TB)                        | Small, on the order of gigabytes (GB)           | Very small, on the order of megabytes (MB)                    |
| Speed          | Slow, hundreds to thousands of MB/s                          | Fast, tens of GB/s                              | Very fast, tens to hundreds of GB/s                           |
| Cost (CNY/GB)  | Inexpensive, from a few tenths of a yuan to a few yuan per GB | Expensive, from tens to hundreds of yuan per GB | Very expensive, effectively bundled with the CPU package      |

We can imagine the computer storage system as a pyramid, as shown in the diagram below. Storage devices closer to the top are faster, have smaller capacity, and are more expensive. This multi-layered design is deliberate, the result of careful consideration by computer scientists and engineers.

- **Hard disk cannot be easily replaced by RAM**. First, data in memory is lost after power-off, making it unsuitable for long-term data storage. Second, memory is tens of times more expensive than hard disk, which makes it difficult to popularize in the consumer market.
- **Cache cannot simultaneously achieve large capacity and high speed**. As the capacity of L1, L2, and L3 caches increases, their physical size becomes larger, and the physical distance between them and the CPU core increases, resulting in longer data transmission time and higher element access latency. With current technology, the multi-layered cache structure represents the best balance point between capacity, speed, and cost.

![Computer Storage System](ram_and_cache.assets/storage_pyramid.png)

!!! tip

    The storage hierarchy of computers embodies a delicate balance among speed, capacity, and cost. In fact, such trade-offs are common across all industrial fields, requiring us to find the optimal balance point between different advantages and constraints.

In summary, **hard disks are used for long-term storage of large amounts of data, RAM is used to temporarily store the data being processed during program execution, and cache is used to store frequently accessed data and instructions**, thereby improving program execution efficiency. The three work together to keep the computer system running efficiently.

As shown in the diagram below, during program execution, data is read from the hard disk into RAM for CPU computation. Cache can be viewed as part of the CPU. **By intelligently loading data from RAM**, it provides the CPU with high-speed access to data, significantly improving program execution efficiency and reducing reliance on slower RAM.

![Data Flow Among Hard Disk, RAM, and Cache](ram_and_cache.assets/computer_storage_devices.png)

## Memory Efficiency of Data Structures

In terms of memory space utilization, arrays and linked lists each have advantages and limitations.

On one hand, **memory is limited, and the same memory cannot be shared by multiple programs**, so we hope data structures can utilize space as efficiently as possible. Array elements are tightly packed and do not require additional space to store references (pointers) between linked list nodes, thus having higher space efficiency. However, arrays need to allocate sufficient contiguous memory space at once, which may lead to memory waste, and array expansion requires additional time and space costs. In comparison, linked lists perform dynamic memory allocation and deallocation on a "node" basis, providing greater flexibility.

On the other hand, during program execution, **as memory is repeatedly allocated and freed, the degree of fragmentation of free memory becomes increasingly severe**, leading to reduced memory utilization efficiency. Arrays, due to their contiguous storage approach, are relatively less prone to memory fragmentation. Conversely, linked list elements are distributed in storage, and frequent insertion and deletion operations are more likely to cause memory fragmentation.

## Cache Efficiency of Data Structures

Although cache has much smaller space capacity than memory, it is much faster than memory and plays a crucial role in program execution speed. Since cache capacity is limited and can only store a small portion of frequently accessed data, when the CPU attempts to access data that is not in the cache, a <u>cache miss</u> occurs, and the CPU must load the required data from the slower memory.

Clearly, **the fewer "cache misses," the higher the efficiency of CPU data reads and writes**, and the better the program performance. We call the proportion of data that the CPU successfully obtains from the cache the <u>cache hit rate</u>, a metric typically used to measure cache efficiency.

To achieve the highest efficiency possible, cache employs the following data loading mechanisms.

- **Cache lines**: The cache does not store and load data on a byte-by-byte basis, but rather as cache lines. Compared to byte-by-byte transmission, cache line transmission is more efficient.
- **Prefetching mechanism**: The processor attempts to predict data access patterns (e.g., sequential access, fixed-stride jumping access, etc.) and loads data into the cache according to specific patterns, thereby improving hit rate.
- **Spatial locality**: If a piece of data is accessed, nearby data may also be accessed in the near future. Therefore, when the cache loads a particular piece of data, it also loads nearby data to improve hit rate.
- **Temporal locality**: If a piece of data is accessed, it is likely to be accessed again in the near future. Cache leverages this principle by retaining recently accessed data to improve hit rate.

In fact, **arrays and linked lists differ in how efficiently they utilize cache**, mainly in the following respects.

- **Space occupied**: Linked-list elements occupy more space than array elements, so less useful data can fit in the cache.
- **Cache lines**: Linked list data are scattered throughout memory, while cache loads "by lines," so the proportion of invalid data loaded is higher.
- **Prefetching mechanism**: Arrays have more "predictable" data access patterns than linked lists, making it easier for the system to guess which data will be loaded next.
- **Spatial locality**: Arrays are stored in centralized memory space, so data near loaded data is more likely to be accessed soon.

Overall, **arrays have higher cache hit rates, thus they usually outperform linked lists in operation efficiency**. This makes data structures implemented based on arrays more popular when solving algorithmic problems.

It is important to note that **high cache efficiency does not mean arrays are superior to linked lists in all cases**. In practical applications, which data structure to choose should be determined based on specific requirements. For example, both arrays and linked lists can implement the "stack" data structure (which will be discussed in detail in the next chapter), but they are suitable for different scenarios.

- When solving algorithm problems, we tend to prefer stack implementations based on arrays, because they provide higher operation efficiency and the ability of random access, at the cost of needing to pre-allocate a certain amount of memory space for the array.
- If the data volume is very large, the dynamic nature is high, and the expected size of the stack is difficult to estimate, then a stack implementation based on linked lists is more suitable. Linked lists can distribute large amounts of data across different parts of memory and avoid the additional overhead produced by array expansion.

`
  },

  'dsa-array-linkedlist-summary': {
    title: '4.5 Tóm tắt',
    summary: 'Tổng kết kiến thức chương Mảng & Danh sách liên kết và giải đáp các câu hỏi thường gặp về lưu trữ stack/heap, chi phí bộ nhớ của node, cơ chế mở rộng List, và cách Python quản lý tham chiếu đối tượng trong List.',
    tags: ['dsa', 'array', 'linkedlist', 'summary'],
    domain: 'Algorithms',
    module: 'Chương 4: Mảng & Danh sách liên kết',
    prerequisites: ['dsa-ram-cache'],
    related: ['dsa-array', 'dsa-linked-list', 'dsa-list'],
    updatedAt: '2026-07-18',
    readTime: '9 phút',
    content: `

<h2>Điểm lại kiến thức chính</h2>
<ul>
  <li>Mảng và danh sách liên kết là hai cấu trúc dữ liệu cơ bản, đại diện cho hai cách khác nhau mà dữ liệu có thể được lưu trữ trong bộ nhớ máy tính: lưu trữ liên tục và lưu trữ phân tán. Điểm mạnh và điểm yếu của chúng bổ sung cho nhau.</li>
  <li>Mảng hỗ trợ truy cập ngẫu nhiên và sử dụng ít bộ nhớ hơn; tuy nhiên, việc chèn và xóa phần tử kém hiệu quả, và độ dài của nó là bất biến sau khi khởi tạo.</li>
  <li>Danh sách liên kết đạt được việc chèn và xóa node hiệu quả bằng cách sửa đổi tham chiếu (con trỏ), và có thể linh hoạt điều chỉnh độ dài; tuy nhiên, việc truy cập node kém hiệu quả và tiêu tốn bộ nhớ nhiều hơn. Các loại danh sách liên kết phổ biến bao gồm danh sách liên kết đơn, danh sách liên kết vòng và danh sách liên kết đôi.</li>
  <li>Một List là một tập hợp có thứ tự các phần tử, hỗ trợ chèn, xóa, tìm kiếm và cập nhật, thường được triển khai dựa trên mảng động. Nó giữ lại các ưu điểm của mảng đồng thời cho phép điều chỉnh độ dài linh hoạt.</li>
  <li>Sự xuất hiện của List đã cải thiện đáng kể tính thực tiễn của mảng, nhưng cũng có thể lãng phí một phần không gian bộ nhớ.</li>
  <li>Trong quá trình chạy chương trình, dữ liệu chủ yếu được lưu trữ trong bộ nhớ. Mảng cung cấp hiệu suất không gian bộ nhớ cao hơn, trong khi danh sách liên kết mang lại sự linh hoạt hơn trong việc sử dụng bộ nhớ.</li>
  <li>Cache cung cấp khả năng truy cập dữ liệu nhanh cho CPU thông qua các cơ chế như dòng cache, nạp trước, và tính cục bộ không gian/thời gian, cải thiện đáng kể hiệu suất thực thi chương trình.</li>
  <li>Vì mảng có tỷ lệ trúng cache cao hơn, chúng thường hiệu quả hơn danh sách liên kết. Khi chọn cấu trúc dữ liệu, cần lựa chọn phù hợp dựa trên yêu cầu và tình huống cụ thể.</li>
</ul>

<h2>Hỏi & Đáp</h2>

<p><strong>Hỏi:</strong> Việc lưu trữ mảng trên stack so với trên heap có ảnh hưởng đến hiệu suất thời gian và không gian không?</p>
<p>Mảng được lưu trên stack và trên heap đều được lưu trong vùng nhớ liên tục, nên hiệu suất thao tác dữ liệu về cơ bản là như nhau. Tuy nhiên, stack và heap có những đặc điểm riêng, dẫn đến các khác biệt sau.</p>
<ol>
  <li>Hiệu suất cấp phát và giải phóng: Stack là một vùng nhớ tương đối nhỏ, việc cấp phát được trình biên dịch tự động xử lý; heap tương đối lớn hơn và có thể được cấp phát động trong mã, dễ bị phân mảnh hơn. Do đó, các thao tác cấp phát và giải phóng trên heap thường chậm hơn trên stack.</li>
  <li>Giới hạn kích thước: Bộ nhớ stack tương đối nhỏ, và kích thước heap thường bị giới hạn bởi bộ nhớ khả dụng. Do đó, heap phù hợp hơn để lưu trữ các mảng lớn.</li>
  <li>Tính linh hoạt: Kích thước của mảng trên stack phải được xác định tại thời điểm biên dịch, trong khi kích thước của mảng trên heap có thể được xác định động lúc chạy.</li>
</ol>

<p><strong>Hỏi:</strong> Tại sao mảng yêu cầu các phần tử cùng kiểu, trong khi danh sách liên kết không nhấn mạnh yêu cầu này?</p>
<p>Danh sách liên kết được cấu thành từ các node, các node được kết nối thông qua tham chiếu (con trỏ), và mỗi node có thể lưu trữ dữ liệu kiểu khác nhau, ví dụ <code>int</code>, <code>double</code>, <code>string</code>, <code>object</code>, v.v.</p>
<p>Ngược lại, các phần tử mảng phải cùng kiểu để vị trí của chúng có thể được xác định bằng cách tính offset. Ví dụ, nếu một mảng chứa cả kiểu <code>int</code> và <code>long</code>, với các phần tử riêng lẻ chiếm lần lượt 4 byte và 8 byte, thì công thức sau không thể dùng để tính offset, vì mảng chứa hai "kích thước phần tử" khác nhau.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="shell" onclick="switchCodeTab(event, 'shell')">shell</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="shell"><pre data-lang="shell"><code># địa chỉ phần tử = địa chỉ cơ sở của mảng (địa chỉ phần tử đầu tiên) + kích thước phần tử * chỉ mục phần tử</code></pre></div></div></div>

<p><strong>Hỏi:</strong> Sau khi xóa node <code>P</code>, chúng ta có cần đặt <code>P.next</code> về <code>None</code> không?</p>
<p>Không bắt buộc phải sửa đổi <code>P.next</code>. Xét từ góc độ danh sách liên kết, việc duyệt từ node đầu đến node cuối sẽ không còn gặp lại <code>P</code> nữa. Điều này có nghĩa là node <code>P</code> đã bị loại khỏi danh sách liên kết, và việc node <code>P</code> đang trỏ đến đâu không còn quan trọng — nó sẽ không ảnh hưởng đến danh sách liên kết.</p>
<p>Xét từ góc độ giải thuật và giải bài toán, việc để nguyên tham chiếu là ổn miễn là logic chương trình đúng. Xét từ góc độ triển khai thư viện chuẩn, việc ngắt kết nối tường minh là an toàn và rõ ràng hơn. Nếu không ngắt kết nối và node bị xóa không được thu hồi đúng cách, nó có thể ảnh hưởng đến việc thu hồi các node kế tiếp.</p>

<p><strong>Hỏi:</strong> Trong danh sách liên kết, độ phức tạp thời gian của thao tác chèn và xóa là $O(1)$. Tuy nhiên, cả chèn và xóa đều cần $O(n)$ thời gian để tìm phần tử; tại sao độ phức tạp thời gian không phải là $O(n)$?</p>
<p>Nếu phần tử được tìm trước rồi mới xóa, độ phức tạp thời gian quả thực là $O(n)$. Tuy nhiên, ưu điểm $O(1)$ khi chèn và xóa của danh sách liên kết có thể được thể hiện trong các ứng dụng khác. Ví dụ, một deque (hàng đợi hai đầu) rất phù hợp để triển khai bằng danh sách liên kết, trong đó chúng ta duy trì các biến con trỏ luôn trỏ đến node đầu và node cuối, với mỗi thao tác chèn và xóa là $O(1)$.</p>

<p><strong>Hỏi:</strong> Trong sơ đồ "Định nghĩa và phương thức lưu trữ của danh sách liên kết", node con trỏ màu xanh nhạt chiếm một địa chỉ bộ nhớ riêng, hay chia sẻ ngang bằng với giá trị của node?</p>
<p>Sơ đồ này là một biểu diễn định tính; một biểu diễn định lượng cần được phân tích dựa trên tình huống cụ thể.</p>
<ul>
  <li>Các kiểu giá trị node khác nhau chiếm dung lượng khác nhau, chẳng hạn <code>int</code>, <code>long</code>, <code>double</code>, và các đối tượng instance, v.v.</li>
  <li>Dung lượng bộ nhớ mà biến con trỏ chiếm dụng phụ thuộc vào hệ điều hành và môi trường biên dịch được sử dụng, thường là 8 byte hoặc 4 byte.</li>
</ul>

<p><strong>Hỏi:</strong> Việc thêm một phần tử vào cuối List có luôn là $O(1)$ không?</p>
<p>Nếu việc thêm một phần tử vượt quá độ dài List, List phải được mở rộng trước khi thêm. Hệ thống cấp phát một khối bộ nhớ mới và di chuyển tất cả các phần tử từ List gốc sang đó, trong trường hợp này độ phức tạp thời gian trở thành $O(n)$.</p>

<p><strong>Hỏi:</strong> "Sự xuất hiện của List đã cải thiện đáng kể tính thực tiễn của mảng, nhưng có thể dẫn đến một phần lãng phí không gian bộ nhớ" — sự lãng phí không gian này có phải chỉ bộ nhớ chiếm dụng bởi các biến bổ sung như dung lượng (capacity), độ dài (length) và hệ số mở rộng không?</p>
<p>Sự lãng phí không gian này chủ yếu có hai khía cạnh: một mặt, List thường thiết lập một độ dài ban đầu mà chúng ta có thể không cần sử dụng hết; mặt khác, để tránh mở rộng thường xuyên, việc mở rộng thường nhân với một hệ số, chẳng hạn $\\times 1.5$. Kết quả là sẽ có nhiều vị trí trống mà thông thường chúng ta không thể lấp đầy hoàn toàn.</p>

<p><strong>Hỏi:</strong> Trong Python, sau khi khởi tạo <code>n = [1, 2, 3]</code>, địa chỉ của 3 phần tử này là liên tục, nhưng khi khởi tạo <code>m = [2, 1, 3]</code> thì id của mỗi phần tử lại không liên tục; thay vào đó, chúng giống với id trong <code>n</code>. Vì địa chỉ của các phần tử này không liên tục, vậy <code>m</code> có còn là một mảng không?</p>
<p>Nếu chúng ta thay thế các phần tử List bằng các node danh sách liên kết <code>n = [n1, n2, n3, n4, n5]</code>, thông thường 5 đối tượng node này cũng nằm rải rác khắp bộ nhớ. Tuy nhiên, với một chỉ mục List cho trước, chúng ta vẫn có thể lấy được địa chỉ bộ nhớ của node trong thời gian $O(1)$, từ đó truy cập node tương ứng. Điều này là vì mảng lưu trữ các tham chiếu đến node, không phải bản thân các node.</p>
<p>Khác với nhiều ngôn ngữ khác, các số trong Python được bọc dưới dạng đối tượng, và List không lưu trữ chính các con số mà lưu trữ tham chiếu đến các con số. Do đó, chúng ta thấy rằng các con số giống nhau trong hai mảng có cùng id, và địa chỉ bộ nhớ của các con số này không cần phải liên tục.</p>

<p><strong>Hỏi:</strong> C++ STL có <code>std::list</code> đã triển khai sẵn danh sách liên kết đôi, nhưng dường như một số sách giải thuật không dùng trực tiếp nó. Có hạn chế gì không?</p>
<p>Một mặt, chúng ta thường ưu tiên dùng mảng để triển khai giải thuật và chỉ dùng danh sách liên kết khi cần thiết, chủ yếu vì hai lý do.</p>
<ul>
  <li>Chi phí không gian: Vì mỗi phần tử cần thêm hai con trỏ bổ sung (một cho phần tử trước, một cho phần tử sau), <code>std::list</code> thường tiêu tốn nhiều không gian hơn <code>std::vector</code>.</li>
  <li>Không thân thiện với cache: Vì dữ liệu không được lưu trữ liên tục, <code>std::list</code> có hiệu suất sử dụng cache thấp hơn. Nhìn chung, <code>std::vector</code> có hiệu năng tốt hơn.</li>
</ul>
<p>Mặt khác, các trường hợp cần đến danh sách liên kết chủ yếu liên quan đến cây nhị phân và đồ thị. Stack và Queue thường sử dụng <code>stack</code> và <code>queue</code> do ngôn ngữ lập trình cung cấp, thay vì danh sách liên kết.</p>

<p><strong>Hỏi:</strong> Thao tác <code>res = [[0]] * n</code> có tạo ra một List 2 chiều mà mỗi <code>[0]</code> độc lập với nhau không?</p>
<p>Không, chúng không độc lập. Trong List 2 chiều này, tất cả các <code>[0]</code> thực chất là tham chiếu đến cùng một đối tượng. Nếu chúng ta sửa một phần tử, chúng ta sẽ thấy tất cả các phần tử tương ứng thay đổi theo.</p>
<p>Nếu muốn mỗi <code>[0]</code> trong List 2 chiều độc lập với nhau, chúng ta có thể dùng <code>res = [[0] for _ in range(n)]</code> để đạt được điều đó. Nguyên lý của cách này là khởi tạo $n$ đối tượng List <code>[0]</code> độc lập.</p>

<p><strong>Hỏi:</strong> Thao tác <code>res = [0] * n</code> có tạo ra một List mà mỗi số nguyên 0 độc lập với nhau không?</p>
<p>Trong List này, tất cả các số nguyên 0 tham chiếu đến cùng một đối tượng. Điều này là vì Python sử dụng cơ chế cache cho các số nguyên nhỏ (thường từ -5 đến 256) để tối đa hóa việc tái sử dụng đối tượng và cải thiện hiệu năng.</p>
<p>Mặc dù tất cả đều tham chiếu đến cùng một đối tượng, chúng ta vẫn có thể sửa đổi độc lập từng phần tử trong List. Điều này là vì số nguyên trong Python là "đối tượng bất biến" (immutable object). Khi chúng ta sửa một phần tử, thực chất chúng ta chuyển phần tử đó sang tham chiếu một đối tượng khác, thay vì thay đổi đối tượng gốc.</p>
<p>Tuy nhiên, khi các phần tử List là "đối tượng khả biến" (mutable object) (chẳng hạn List, dictionary, hoặc instance của class), việc sửa một phần tử sẽ trực tiếp thay đổi chính đối tượng đó, và tất cả các phần tử tham chiếu đến đối tượng đó sẽ có cùng thay đổi.</p>

`,
    originalContent: `
# Summary

### Key Review

- Arrays and linked lists are two fundamental data structures, representing two different ways data can be stored in computer memory: contiguous storage and scattered storage. Their strengths and weaknesses complement each other.
- Arrays support random access and use less memory; however, inserting and deleting elements is inefficient, and the length is immutable after initialization.
- Linked lists achieve efficient insertion and deletion of nodes by modifying references (pointers), and can flexibly adjust length; however, node access is inefficient and memory consumption is higher. Common linked list types include singly linked lists, circular linked lists, and doubly linked lists.
- A list is an ordered collection of elements that supports insertion, deletion, search, and modification, typically implemented based on dynamic arrays. It retains the advantages of arrays while allowing flexible adjustment of length.
- The emergence of lists has greatly improved the practicality of arrays, but it may also waste some memory space.
- During program execution, data is primarily stored in memory. Arrays provide higher memory space efficiency, while linked lists offer greater flexibility in memory usage.
- Caches provide fast data access to the CPU through mechanisms such as cache lines, prefetching, and spatial and temporal locality, significantly improving program execution efficiency.
- Because arrays have higher cache hit rates, they are generally more efficient than linked lists. When choosing a data structure, appropriate selection should be made based on specific requirements and scenarios.

### Q & A

**Q**: Does storing an array on the stack versus on the heap affect time efficiency and space efficiency?

Arrays stored on the stack and on the heap are both stored in contiguous memory space, so data operation efficiency is basically the same. However, the stack and heap have their own characteristics, leading to the following differences.

1. Allocation and deallocation efficiency: The stack is a relatively small piece of memory, with allocation automatically handled by the compiler; the heap is relatively larger and can be dynamically allocated in code, more prone to fragmentation. Therefore, allocation and deallocation operations on the heap are usually slower than on the stack.
2. Size limitations: Stack memory is relatively small, and the heap size is generally limited by available memory. Therefore, the heap is more suitable for storing large arrays.
3. Flexibility: The size of an array on the stack must be determined at compile time, while the size of an array on the heap can be determined dynamically at runtime.

**Q**: Why do arrays require elements of the same type, while linked lists do not emphasize this requirement?

Linked lists are composed of nodes, with nodes connected through references (pointers), and each node can store different types of data, such as \`int\`, \`double\`, \`string\`, \`object\`, etc.

In contrast, array elements must be of the same type so that their positions can be determined by calculating offsets. For example, if an array contains both \`int\` and \`long\` types, with individual elements occupying 4 bytes and 8 bytes respectively, then the following formula cannot be used to calculate the offset, because the array contains two different "element sizes".

\`\`\`shell
# element address = array base address (address of the first element) + element size * element index
\`\`\`

**Q**: After deleting node \`P\`, do we need to set \`P.next\` to \`None\`?

It is not necessary to modify \`P.next\`. From the perspective of the linked list, traversing from the head node to the tail node will no longer encounter \`P\`. This means that node \`P\` has been removed from the linked list, and it doesn't matter where node \`P\` points to at this time—it won't affect the linked list.

From an algorithms-and-problem-solving perspective, leaving the pointer connected is fine as long as the program logic is correct. From a standard-library implementation perspective, explicitly disconnecting it is safer and clearer. If it is not disconnected and the deleted node is not reclaimed properly, it may affect the reclamation of successor nodes.

**Q**: In a linked list, the time complexity of insertion and deletion operations is $O(1)$. However, both insertion and deletion require $O(n)$ time to find the element; why isn't the time complexity $O(n)$?

If the element is first found and then deleted, the time complexity is indeed $O(n)$. However, the advantage of $O(1)$ insertion and deletion in linked lists can be demonstrated in other applications. For example, a deque is well-suited for linked list implementation, where we maintain pointer variables always pointing to the head and tail nodes, with each insertion and deletion operation being $O(1)$.

**Q**: In the diagram "Linked List Definition and Storage Methods", does the light blue pointer node occupy a single memory address, or does it share equally with the node value?

This diagram is a qualitative representation; a quantitative representation requires analysis based on the specific situation.

- Different types of node values occupy different amounts of space, such as \`int\`, \`long\`, \`double\`, and instance objects, etc.
- The amount of memory space occupied by pointer variables depends on the operating system and compilation environment used, usually 8 bytes or 4 bytes.

**Q**: Is appending an element at the end of a list always $O(1)$?

If appending an element exceeds the list length, the list must first be expanded before adding. The system allocates a new block of memory and moves all elements from the original list to it, in which case the time complexity becomes $O(n)$.

**Q**: "The emergence of lists has greatly improved the practicality of arrays, but may result in some wasted memory space"—does this space waste refer to the memory occupied by additional variables such as capacity, length, and expansion factor?

This space waste mainly has two aspects: on one hand, lists typically set an initial length, which we may not need to fully utilize; on the other hand, to prevent frequent expansion, expansion generally multiplies by a coefficient, such as $\\times 1.5$. As a result, there will be many empty positions that we typically cannot completely fill.

**Q**: In Python, after initializing \`n = [1, 2, 3]\`, the addresses of these 3 elements are contiguous, but initializing \`m = [2, 1, 3]\` reveals that each element's id is not continuous; rather, they are the same as those in \`n\`. Since the addresses of these elements are not contiguous, is \`m\` still an array?

If we replace list elements with linked list nodes \`n = [n1, n2, n3, n4, n5]\`, usually these 5 node objects are also scattered throughout memory. However, given a list index, we can still obtain the node memory address in $O(1)$ time, thereby accessing the corresponding node. This is because the array stores references to nodes, not the nodes themselves.

Unlike many languages, numbers in Python are wrapped as objects, and lists store not the numbers themselves, but references to the numbers. Therefore, we find that the same numbers in two arrays have the same id, and the memory addresses of these numbers need not be contiguous.

**Q**: C++ STL has \`std::list\` which has already implemented a doubly linked list, but it seems that some algorithm books don't use it directly. Is there a limitation?

On one hand, we often prefer to use arrays for implementing algorithms and only use linked lists when necessary, mainly for two reasons.

- Space overhead: Since each element requires two additional pointers (one for the previous element and one for the next element), \`std::list\` typically consumes more space than \`std::vector\`.
- Cache unfriendliness: Since data is not stored contiguously, \`std::list\` has lower cache utilization. In general, \`std::vector\` has better performance.

On the other hand, cases where linked lists are necessary mainly involve binary trees and graphs. Stacks and queues usually use the \`stack\` and \`queue\` provided by the programming language, rather than linked lists.

**Q**: Does the operation \`res = [[0]] * n\` create a 2D list where each \`[0]\` is independent?

No, they are not independent. In this 2D list, all the \`[0]\` are actually references to the same object. If we modify one element, we will find that all corresponding elements change accordingly.

If we want each \`[0]\` in the 2D list to be independent, we can use \`res = [[0] for _ in range(n)]\` to achieve this. The principle of this approach is to initialize $n$ independent \`[0]\` list objects.

**Q**: Does the operation \`res = [0] * n\` create a list where each integer 0 is independent?

In this list, all the integer zeros reference the same object. This is because Python uses a caching mechanism for small integers (typically -5 to 256) to maximize object reuse and improve performance.

Although they all reference the same object, we can still modify each element in the list independently. This is because Python integers are "immutable objects". When we modify an element, we actually switch that element to reference a different object, rather than changing the original object itself.

However, when list elements are "mutable objects" (such as lists, dictionaries, or class instances), modifying an element directly changes the object itself, and all elements referencing that object will have the same change.

`
  },

});
