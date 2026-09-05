/* ============================================================
   Knowledge OS — DSA Module: Chương 5 - Ngăn xếp & Hàng đợi
   ============================================================ */

Object.assign(DSA_CONTENT, {
  'dsa-stack-queue-index': {
    title: 'Ngăn xếp & Hàng đợi',
    summary: 'Lời giới thiệu dẫn dắt vào chương Ngăn xếp và Hàng đợi — hai cấu trúc dữ liệu mô phỏng quy tắc LIFO (vào sau ra trước) và FIFO (vào trước ra trước).',
    tags: ['dsa', 'stack', 'queue'],
    domain: 'Algorithms',
    module: 'Chương 5: Ngăn xếp & Hàng đợi',
    prerequisites: ['dsa-array-linkedlist-summary'],
    related: ['dsa-stack', 'dsa-queue'],
    updatedAt: '2026-07-19',
    readTime: '1 phút',
    content: `

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/chapter_stack_and_queue.jpg" alt="Ngăn xếp & Hàng đợi" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<div class="callout callout-note">
  <span class="callout-icon">✨</span>
  <div class="callout-body">
    <p>Ngăn xếp giống như những chú mèo nằm đè lên nhau, trong khi hàng đợi giống như những chú mèo đang xếp hàng.</p>
    <p>Chúng đại diện cho các mối quan hệ logic LIFO (Vào sau, Ra trước) và FIFO (Vào trước, Ra trước).</p>
  </div>
</div>

`,
    originalContent: `

# Stacks and Queues

![Stacks and Queues](../assets/covers/chapter_stack_and_queue.jpg)

!!! abstract

    A stack is like cats piled on top of one another, while a queue is like cats lining up.

    They represent the logical relationships of LIFO (Last In, First Out) and FIFO (First In, First Out), respectively.

`
  },

  'dsa-stack': {
    title: '5.1 Stack (Ngăn xếp)',
    summary: 'Tìm hiểu Ngăn xếp (Stack) — cấu trúc dữ liệu tuyến tính tuân theo nguyên tắc LIFO, các thao tác phổ biến, hai cách triển khai bằng danh sách liên kết và mảng, so sánh hiệu năng, cùng mô phỏng tương tác push/peek/pop.',
    tags: ['dsa', 'stack'],
    domain: 'Algorithms',
    module: 'Chương 5: Ngăn xếp & Hàng đợi',
    prerequisites: ['dsa-stack-queue-index'],
    related: ['dsa-queue', 'dsa-deque'],
    updatedAt: '2026-07-19',
    readTime: '12 phút',
    content: `

<h2>5.1.1 Định nghĩa Stack (Ngăn xếp)</h2>
<p><u>Ngăn xếp (Stack)</u> là một cấu trúc dữ liệu tuyến tính tuân theo nguyên tắc Vào sau, Ra trước (LIFO — Last In, First Out).</p>
<p>Chúng ta có thể ví ngăn xếp như một chồng đĩa đặt trên bàn. Nếu quy định chỉ được di chuyển một đĩa mỗi lần, thì để lấy được đĩa dưới cùng, ta phải lần lượt bỏ các đĩa phía trên ra trước. Nếu thay các đĩa bằng các loại phần tử khác nhau (số nguyên, ký tự, đối tượng, v.v.), ta sẽ có cấu trúc dữ liệu ngăn xếp.</p>
<p>Như minh họa trong hình dưới đây, ta gọi đỉnh của chồng phần tử là "đỉnh" (top) và đáy là "đáy" (bottom). Thao tác thêm một phần tử vào đỉnh được gọi là "đẩy vào ngăn xếp" (push), và thao tác lấy phần tử ở đỉnh ra được gọi là "lấy ra khỏi ngăn xếp" (pop).</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/stack_operations.png" alt="Quy tắc LIFO của ngăn xếp" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>5.1.2 Các thao tác phổ biến trên Stack</h2>
<p>Các thao tác phổ biến trên ngăn xếp được thể hiện trong bảng dưới đây. Tên phương thức cụ thể còn tùy vào ngôn ngữ lập trình được sử dụng. Ở đây ta dùng quy ước đặt tên phổ biến <code>push()</code>, <code>pop()</code>, và <code>peek()</code>.</p>
<p align="center">Bảng &nbsp; Hiệu năng các thao tác trên Stack</p>
<table>
  <thead>
    <tr><th>Phương thức</th><th>Mô tả</th><th>Độ phức tạp thời gian</th></tr>
  </thead>
  <tbody>
    <tr><td><code>push()</code></td><td>Đẩy phần tử vào ngăn xếp (thêm vào đỉnh)</td><td>$O(1)$</td></tr>
    <tr><td><code>pop()</code></td><td>Lấy phần tử ở đỉnh ra khỏi ngăn xếp</td><td>$O(1)$</td></tr>
    <tr><td><code>peek()</code></td><td>Truy cập phần tử ở đỉnh</td><td>$O(1)$</td></tr>
  </tbody>
</table>
<p>Thông thường, ta có thể trực tiếp dùng class ngăn xếp dựng sẵn của ngôn ngữ lập trình. Tuy nhiên, một số ngôn ngữ có thể không cung cấp class ngăn xếp riêng biệt. Trong trường hợp đó, ta có thể dùng "mảng" hoặc "danh sách liên kết" của ngôn ngữ đó làm ngăn xếp, và chỉ đơn giản là tránh dùng các thao tác không liên quan đến hành vi của ngăn xếp.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Khởi tạo ngăn xếp */
Stack&lt;Integer&gt; stack = new Stack&lt;&gt;();

/* Đẩy phần tử vào ngăn xếp */
stack.push(1);
stack.push(3);
stack.push(2);
stack.push(5);
stack.push(4);

/* Truy cập phần tử đỉnh ngăn xếp */
int peek = stack.peek();

/* Lấy phần tử ra khỏi ngăn xếp */
int pop = stack.pop();

/* Lấy độ dài ngăn xếp */
int size = stack.size();

/* Kiểm tra rỗng */
boolean isEmpty = stack.isEmpty();</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code># Khởi tạo ngăn xếp
# Python không có class ngăn xếp dựng sẵn, có thể dùng list làm ngăn xếp
stack: list[int] = []

# Đẩy phần tử vào ngăn xếp
stack.append(1)
stack.append(3)
stack.append(2)
stack.append(5)
stack.append(4)

# Truy cập phần tử đỉnh ngăn xếp
peek: int = stack[-1]

# Lấy phần tử ra khỏi ngăn xếp
pop: int = stack.pop()

# Lấy độ dài ngăn xếp
size: int = len(stack)

# Kiểm tra rỗng
is_empty: bool = len(stack) == 0</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Khởi tạo ngăn xếp */
stack&lt;int&gt; stack;

/* Đẩy phần tử vào ngăn xếp */
stack.push(1);
stack.push(3);
stack.push(2);
stack.push(5);
stack.push(4);

/* Truy cập phần tử đỉnh ngăn xếp */
int top = stack.top();

/* Lấy phần tử ra khỏi ngăn xếp */
stack.pop(); // Không có giá trị trả về

/* Lấy độ dài ngăn xếp */
int size = stack.size();

/* Kiểm tra rỗng */
bool empty = stack.empty();</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Khởi tạo ngăn xếp */
// JavaScript không có class ngăn xếp dựng sẵn, có thể dùng Array làm ngăn xếp
const stack = [];

/* Đẩy phần tử vào ngăn xếp */
stack.push(1);
stack.push(3);
stack.push(2);
stack.push(5);
stack.push(4);

/* Truy cập phần tử đỉnh ngăn xếp */
const peek = stack[stack.length - 1];

/* Lấy phần tử ra khỏi ngăn xếp */
const pop = stack.pop();

/* Lấy độ dài ngăn xếp */
const size = stack.length;

/* Kiểm tra rỗng */
const isEmpty = stack.length === 0;</code></pre></div></div></div>

<h2>5.1.3 Triển khai Stack</h2>
<p>Để hiểu sâu hơn về cách một ngăn xếp hoạt động, hãy cùng thử tự triển khai một class ngăn xếp.</p>
<p>Ngăn xếp tuân theo nguyên tắc LIFO, nên ta chỉ có thể thêm hoặc xóa phần tử ở đỉnh. Tuy nhiên, cả mảng và danh sách liên kết đều cho phép thêm và xóa phần tử ở bất kỳ vị trí nào. <strong>Do đó, ngăn xếp có thể được xem như một mảng hoặc danh sách liên kết bị giới hạn</strong>. Nói cách khác, ta có thể "che giấu" một số thao tác không liên quan của mảng hoặc danh sách liên kết để logic bên ngoài của chúng phù hợp với đặc tính của ngăn xếp.</p>

<h3>5.1.3.1 Triển khai bằng Danh sách liên kết</h3>
<p>Khi triển khai ngăn xếp bằng danh sách liên kết, ta có thể coi node đầu của danh sách liên kết là đỉnh ngăn xếp và node cuối là đáy.</p>
<p>Như minh họa trong hình dưới đây, đối với thao tác đẩy vào (push), ta chỉ cần chèn phần tử vào đầu danh sách liên kết. Phương pháp chèn node này gọi là "chèn đầu" (head insertion). Đối với thao tác lấy ra (pop), ta chỉ cần xóa node đầu khỏi danh sách liên kết.</p>
<div class="interactive-widget-wrapper" id="linkedlist-stack-steps-wrapper">
  <div class="slider-container">
    <div class="slider-slides">
      <div class="slide active" data-step="1">
        <img loading="lazy" src="dsa-assets/linkedlist_stack_step1.png" alt="Bước 1" />
        <p class="slide-caption"><strong>Bước 1:</strong> Trạng thái ban đầu — node đầu danh sách liên kết là đỉnh ngăn xếp.</p>
      </div>
      <div class="slide" data-step="2">
        <img loading="lazy" src="dsa-assets/linkedlist_stack_step2_push.png" alt="Bước 2 — push" />
        <p class="slide-caption"><strong>Bước 2 — push:</strong> Chèn node mới vào đầu danh sách liên kết (head insertion).</p>
      </div>
      <div class="slide" data-step="3">
        <img loading="lazy" src="dsa-assets/linkedlist_stack_step3_pop.png" alt="Bước 3 — pop" />
        <p class="slide-caption"><strong>Bước 3 — pop:</strong> Xóa node ở đầu danh sách liên kết.</p>
      </div>
    </div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('linkedlist-stack-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 3</span>
      <button class="slider-btn" onclick="nextSlide('linkedlist-stack-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Dưới đây là mã ví dụ triển khai ngăn xếp dựa trên danh sách liên kết:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Ngăn xếp triển khai bằng danh sách liên kết */
class LinkedListStack {
    private ListNode stackPeek; // Dùng node đầu làm đỉnh ngăn xếp
    private int stkSize = 0; // Độ dài ngăn xếp

    public LinkedListStack() {
        stackPeek = null;
    }

    /* Lấy độ dài ngăn xếp */
    public int size() {
        return stkSize;
    }

    /* Kiểm tra ngăn xếp có rỗng không */
    public boolean isEmpty() {
        return size() == 0;
    }

    /* Đẩy vào ngăn xếp */
    public void push(int num) {
        ListNode node = new ListNode(num);
        node.next = stackPeek;
        stackPeek = node;
        stkSize++;
    }

    /* Lấy ra khỏi ngăn xếp */
    public int pop() {
        int num = peek();
        stackPeek = stackPeek.next;
        stkSize--;
        return num;
    }

    /* Truy cập phần tử đỉnh ngăn xếp */
    public int peek() {
        if (isEmpty())
            throw new IndexOutOfBoundsException();
        return stackPeek.val;
    }

    /* Chuyển đổi danh sách liên kết sang mảng và trả về */
    public int[] toArray() {
        ListNode node = stackPeek;
        int[] res = new int[size()];
        for (int i = res.length - 1; i &gt;= 0; i--) {
            res[i] = node.val;
            node = node.next;
        }
        return res;
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>LinkedListStack() {
    _stackPeek = null;
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class LinkedListStack:
    """Ngăn xếp triển khai bằng danh sách liên kết"""

    def __init__(self):
        """Hàm khởi tạo"""
        self._peek: ListNode | None = None
        self._size: int = 0

    def size(self) -&gt; int:
        """Lấy độ dài ngăn xếp"""
        return self._size

    def is_empty(self) -&gt; bool:
        """Kiểm tra ngăn xếp có rỗng không"""
        return self._size == 0

    def push(self, val: int):
        """Đẩy vào ngăn xếp"""
        node = ListNode(val)
        node.next = self._peek
        self._peek = node
        self._size += 1

    def pop(self) -&gt; int:
        """Lấy ra khỏi ngăn xếp"""
        num = self.peek()
        self._peek = self._peek.next
        self._size -= 1
        return num

    def peek(self) -&gt; int:
        """Truy cập phần tử đỉnh ngăn xếp"""
        if self.is_empty():
            raise IndexError("Ngăn xếp rỗng")
        return self._peek.val

    def to_list(self) -&gt; list[int]:
        """Chuyển đổi sang list để in ra"""
        arr = []
        node = self._peek
        while node:
            arr.append(node.val)
            node = node.next
        arr.reverse()
        return arr</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Ngăn xếp triển khai bằng danh sách liên kết */
class LinkedListStack {
  private:
    ListNode *stackTop; // Dùng node đầu làm đỉnh ngăn xếp
    int stkSize;        // Độ dài ngăn xếp

  public:
    LinkedListStack() {
        stackTop = nullptr;
        stkSize = 0;
    }

    ~LinkedListStack() {
        // Duyệt danh sách liên kết để xóa node, giải phóng bộ nhớ
        freeMemoryLinkedList(stackTop);
    }

    /* Lấy độ dài ngăn xếp */
    int size() {
        return stkSize;
    }

    /* Kiểm tra ngăn xếp có rỗng không */
    bool isEmpty() {
        return size() == 0;
    }

    /* Đẩy vào ngăn xếp */
    void push(int num) {
        ListNode *node = new ListNode(num);
        node-&gt;next = stackTop;
        stackTop = node;
        stkSize++;
    }

    /* Lấy ra khỏi ngăn xếp */
    int pop() {
        int num = top();
        ListNode *tmp = stackTop;
        stackTop = stackTop-&gt;next;
        // Giải phóng bộ nhớ
        delete tmp;
        stkSize--;
        return num;
    }

    /* Truy cập phần tử đỉnh ngăn xếp */
    int top() {
        if (isEmpty())
            throw out_of_range("Ngăn xếp rỗng");
        return stackTop-&gt;val;
    }

    /* Chuyển đổi danh sách liên kết sang mảng và trả về */
    vector&lt;int&gt; toVector() {
        ListNode *node = stackTop;
        vector&lt;int&gt; res(size());
        for (int i = res.size() - 1; i &gt;= 0; i--) {
            res[i] = node-&gt;val;
            node = node-&gt;next;
        }
        return res;
    }
};</code></pre></div></div></div>

<h3>5.1.3.2 Triển khai bằng Mảng</h3>
<p>Khi triển khai ngăn xếp bằng mảng, ta có thể coi phần cuối mảng là đỉnh ngăn xếp. Như minh họa trong hình dưới đây, thao tác đẩy vào và lấy ra tương ứng với việc thêm và xóa phần tử ở cuối mảng, cả hai đều có độ phức tạp thời gian $O(1)$.</p>
<div class="interactive-widget-wrapper" id="array-stack-steps-wrapper">
  <div class="slider-container">
    <div class="slider-slides">
      <div class="slide active" data-step="1">
        <img loading="lazy" src="dsa-assets/array_stack_step1.png" alt="Bước 1" />
        <p class="slide-caption"><strong>Bước 1:</strong> Trạng thái ban đầu — phần tử cuối mảng là đỉnh ngăn xếp.</p>
      </div>
      <div class="slide" data-step="2">
        <img loading="lazy" src="dsa-assets/array_stack_step2_push.png" alt="Bước 2 — push" />
        <p class="slide-caption"><strong>Bước 2 — push:</strong> Thêm phần tử vào cuối mảng.</p>
      </div>
      <div class="slide" data-step="3">
        <img loading="lazy" src="dsa-assets/array_stack_step3_pop.png" alt="Bước 3 — pop" />
        <p class="slide-caption"><strong>Bước 3 — pop:</strong> Xóa phần tử ở cuối mảng.</p>
      </div>
    </div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('array-stack-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 3</span>
      <button class="slider-btn" onclick="nextSlide('array-stack-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Vì số phần tử được đẩy vào ngăn xếp có thể liên tục tăng lên, ta có thể dùng mảng động, giúp không phải tự xử lý việc mở rộng mảng. Dưới đây là mã ví dụ:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Ngăn xếp triển khai bằng mảng */
class ArrayStack {
    private ArrayList&lt;Integer&gt; stack;

    public ArrayStack() {
        // Khởi tạo list (mảng động)
        stack = new ArrayList&lt;&gt;();
    }

    /* Lấy độ dài ngăn xếp */
    public int size() {
        return stack.size();
    }

    /* Kiểm tra ngăn xếp có rỗng không */
    public boolean isEmpty() {
        return size() == 0;
    }

    /* Đẩy vào ngăn xếp */
    public void push(int num) {
        stack.add(num);
    }

    /* Lấy ra khỏi ngăn xếp */
    public int pop() {
        if (isEmpty())
            throw new IndexOutOfBoundsException();
        return stack.remove(size() - 1);
    }

    /* Truy cập phần tử đỉnh ngăn xếp */
    public int peek() {
        if (isEmpty())
            throw new IndexOutOfBoundsException();
        return stack.get(size() - 1);
    }

    /* Chuyển đổi List sang mảng và trả về */
    public Object[] toArray() {
        return stack.toArray();
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>ArrayStack() {
    _stack = [];
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class ArrayStack:
    """Ngăn xếp triển khai bằng mảng"""

    def __init__(self):
        """Hàm khởi tạo"""
        self._stack: list[int] = []

    def size(self) -&gt; int:
        """Lấy độ dài ngăn xếp"""
        return len(self._stack)

    def is_empty(self) -&gt; bool:
        """Kiểm tra ngăn xếp có rỗng không"""
        return self.size() == 0

    def push(self, item: int):
        """Đẩy vào ngăn xếp"""
        self._stack.append(item)

    def pop(self) -&gt; int:
        """Lấy ra khỏi ngăn xếp"""
        if self.is_empty():
            raise IndexError("Ngăn xếp rỗng")
        return self._stack.pop()

    def peek(self) -&gt; int:
        """Truy cập phần tử đỉnh ngăn xếp"""
        if self.is_empty():
            raise IndexError("Ngăn xếp rỗng")
        return self._stack[-1]

    def to_list(self) -&gt; list[int]:
        """Trả về list để in ra"""
        return self._stack</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Ngăn xếp triển khai bằng mảng */
class ArrayStack {
  private:
    vector&lt;int&gt; stack;

  public:
    /* Lấy độ dài ngăn xếp */
    int size() {
        return stack.size();
    }

    /* Kiểm tra ngăn xếp có rỗng không */
    bool isEmpty() {
        return stack.size() == 0;
    }

    /* Đẩy vào ngăn xếp */
    void push(int num) {
        stack.push_back(num);
    }

    /* Lấy ra khỏi ngăn xếp */
    int pop() {
        int num = top();
        stack.pop_back();
        return num;
    }

    /* Truy cập phần tử đỉnh ngăn xếp */
    int top() {
        if (isEmpty())
            throw out_of_range("Ngăn xếp rỗng");
        return stack.back();
    }

    /* Trả về Vector */
    vector&lt;int&gt; toVector() {
        return stack;
    }
};</code></pre></div></div></div>

<h3>5.1.3.3 Mô phỏng tương tác</h3>
<div class="interactive-widget-wrapper" id="stack-ops-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'stack-ops-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'stack-ops-wrapper', 'tab-interactive'); initStackOpsDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <div style="display:flex; gap: 1em; flex-wrap: wrap; justify-content: center;">
      <div style="flex: 1 1 260px; text-align:center;">
        <img loading="lazy" src="dsa-assets/array_stack_step2_push.png" alt="Thao tác push trên ngăn xếp mảng" style="max-width:100%; border-radius: var(--radius-md);" />
        <p style="font-size: 13px; color: var(--text-secondary);">Đẩy phần tử vào ngăn xếp (push)</p>
      </div>
      <div style="flex: 1 1 260px; text-align:center;">
        <img loading="lazy" src="dsa-assets/array_stack_step3_pop.png" alt="Thao tác pop trên ngăn xếp mảng" style="max-width:100%; border-radius: var(--radius-md);" />
        <p style="font-size: 13px; color: var(--text-secondary);">Lấy phần tử ra khỏi ngăn xếp (pop)</p>
      </div>
    </div>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="stack-ops-canvas" style="display:flex; gap:6px; flex-wrap:wrap; justify-content:center; min-height: 70px; align-items:flex-end; padding: 10px;"></div>
    <div class="simulator-controls" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 15px;">
      <button class="control-btn" id="stack-ops-btn-autorun" onclick="autoRunStackOps()">▶ Auto Run</button>
      <button class="control-btn" id="stack-ops-btn-step" onclick="stepStackOps()">Bước tiếp theo ▶</button>
      <button class="control-btn" id="stack-ops-btn-pause" onclick="pauseRunStackOps()" disabled>⏸ Dừng</button>
      <button class="control-btn btn-secondary" id="stack-ops-btn-reset" onclick="initStackOpsDemo()">↺ Reset</button>
    </div>
    <div id="stack-ops-speed-control" style="text-align:center; font-size: 13px; color: var(--text-secondary); margin-top: 12px;">
      Tốc độ: <input type="range" min="200" max="2000" value="900" step="200" oninput="setStackOpsSpeed(this.value)" /> <span id="stack-ops-speed-label">900ms</span>
    </div>
    <div id="stack-ops-status" class="simulator-status" style="margin-top: 12px; font-size: 14px; text-align: center; color: var(--text-secondary);">
      Nhấp "Auto Run" hoặc "Bước tiếp theo" để xem mô phỏng push/peek/pop trên ngăn xếp.
    </div>
  </div>
</div>

<h2>5.1.4 So sánh hai cách triển khai</h2>
<p><strong>Về các thao tác được hỗ trợ</strong></p>
<p>Cả hai cách triển khai đều hỗ trợ đầy đủ các thao tác được định nghĩa cho ngăn xếp. Cách triển khai bằng mảng còn hỗ trợ thêm truy cập ngẫu nhiên, nhưng điều này vượt ra ngoài định nghĩa của ngăn xếp nên thường không được sử dụng.</p>
<p><strong>Về hiệu quả thời gian</strong></p>
<p>Trong cách triển khai dựa trên mảng, cả thao tác đẩy vào và lấy ra đều diễn ra trong vùng nhớ liên tục được cấp phát trước, có tính cục bộ cache tốt nên hiệu quả hơn. Tuy nhiên, nếu việc đẩy vào vượt quá dung lượng mảng, nó sẽ kích hoạt cơ chế mở rộng, khiến độ phức tạp thời gian của thao tác đẩy đó trở thành $O(n)$.</p>
<p>Trong cách triển khai dựa trên danh sách liên kết, việc mở rộng danh sách rất linh hoạt, không có vấn đề giảm hiệu quả do mở rộng mảng. Tuy nhiên, thao tác đẩy vào yêu cầu khởi tạo một đối tượng node và sửa đổi con trỏ, nên tương đối kém hiệu quả hơn. Tuy vậy, nếu các phần tử được đẩy vào đã sẵn là các đối tượng node, bước khởi tạo có thể được bỏ qua, từ đó cải thiện hiệu quả.</p>
<p>Tóm lại, khi các phần tử được đẩy vào và lấy ra là các kiểu dữ liệu cơ bản như <code>int</code> hoặc <code>double</code>, ta có thể rút ra các kết luận sau:</p>
<ul>
  <li>Cách triển khai ngăn xếp bằng mảng có hiệu quả giảm khi việc mở rộng được kích hoạt, nhưng vì mở rộng là thao tác không thường xuyên, nên hiệu quả trung bình cao hơn.</li>
  <li>Cách triển khai ngăn xếp bằng danh sách liên kết có thể mang lại hiệu năng ổn định hơn.</li>
</ul>
<p><strong>Về hiệu quả không gian</strong></p>
<p>Khi khởi tạo một list, hệ thống sẽ cấp phát một "dung lượng ban đầu" có thể vượt quá nhu cầu thực tế. Ngoài ra, cơ chế mở rộng thường mở rộng theo một tỷ lệ cụ thể (ví dụ 2 lần), và dung lượng sau khi mở rộng cũng có thể vượt quá nhu cầu thực tế. Do đó, <strong>cách triển khai ngăn xếp bằng mảng có thể gây lãng phí một phần không gian</strong>.</p>
<p>Tuy nhiên, vì các node của danh sách liên kết cần lưu thêm con trỏ, <strong>không gian mà các node của danh sách liên kết chiếm dụng tương đối lớn hơn</strong>.</p>
<p>Tóm lại, ta không thể đơn giản kết luận cách triển khai nào tiết kiệm bộ nhớ hơn, mà cần phân tích tùy theo tình huống cụ thể.</p>

<h2>5.1.5 Ứng dụng điển hình của Stack</h2>
<ul>
  <li><strong>Nút Back/Forward trên trình duyệt, Undo/Redo trong phần mềm</strong>. Mỗi khi ta mở một trang web mới, trình duyệt sẽ đẩy trang trước đó vào ngăn xếp, cho phép ta quay lại trang trước thông qua thao tác back. Thao tác back về bản chất chính là thực hiện một lệnh pop. Để hỗ trợ cả back và forward, cần có hai ngăn xếp phối hợp với nhau.</li>
  <li><strong>Quản lý bộ nhớ chương trình</strong>. Mỗi khi một hàm được gọi, hệ thống sẽ thêm một khung ngăn xếp (stack frame) vào đỉnh ngăn xếp để ghi lại thông tin ngữ cảnh của hàm. Trong quá trình đệ quy, giai đoạn đệ quy đi xuống liên tục thực hiện các thao tác đẩy vào, trong khi giai đoạn quay lui đi lên liên tục thực hiện các thao tác lấy ra.</li>
</ul>

`,
    originalContent: `
# Stack

A <u>stack</u> is a linear data structure that follows the Last In, First Out (LIFO) principle.

We can compare a stack to a pile of plates on a table. If we specify that only one plate can be moved at a time, then to get the bottom plate, we must first remove the plates above it one by one. If we replace the plates with various types of elements (such as integers, characters, objects, etc.), we get the stack data structure.

As shown in the figure below, we call the top of the stacked elements the "top" and the bottom the "bottom." The operation of adding an element to the top is called "push," and the operation of removing the top element is called "pop."

![LIFO rule of stack](stack.assets/stack_operations.png)

## Common Stack Operations

The common operations on a stack are shown in the table below. The specific method names depend on the programming language used. Here, we use the common naming convention of \`push()\`, \`pop()\`, and \`peek()\`.

<p align="center"> Table <id> &nbsp; Efficiency of Stack Operations </p>

| Method   | Description                                    | Time Complexity |
| -------- | ---------------------------------------------- | --------------- |
| \`push()\` | Push element onto stack (add to top)          | $O(1)$          |
| \`pop()\`  | Pop top element from stack                     | $O(1)$          |
| \`peek()\` | Access top element                             | $O(1)$          |

Typically, we can directly use the built-in stack class provided by the programming language. However, some languages may not provide a dedicated stack class. In such cases, we can use the language's "array" or "linked list" as a stack and simply avoid using operations unrelated to stack behavior.

=== "Python"

    \`\`\`python title="stack.py"
    # Initialize stack
    # Python does not have a built-in stack class, can use list as a stack
    stack: list[int] = []

    # Push elements
    stack.append(1)
    stack.append(3)
    stack.append(2)
    stack.append(5)
    stack.append(4)

    # Access top element
    peek: int = stack[-1]

    # Pop element
    pop: int = stack.pop()

    # Get stack length
    size: int = len(stack)

    # Check if empty
    is_empty: bool = len(stack) == 0
    \`\`\`

=== "C++"

    \`\`\`cpp title="stack.cpp"
    /* Initialize stack */
    stack<int> stack;

    /* Push elements */
    stack.push(1);
    stack.push(3);
    stack.push(2);
    stack.push(5);
    stack.push(4);

    /* Access top element */
    int top = stack.top();

    /* Pop element */
    stack.pop(); // No return value

    /* Get stack length */
    int size = stack.size();

    /* Check if empty */
    bool empty = stack.empty();
    \`\`\`

=== "Java"

    \`\`\`java title="stack.java"
    /* Initialize stack */
    Stack<Integer> stack = new Stack<>();

    /* Push elements */
    stack.push(1);
    stack.push(3);
    stack.push(2);
    stack.push(5);
    stack.push(4);

    /* Access top element */
    int peek = stack.peek();

    /* Pop element */
    int pop = stack.pop();

    /* Get stack length */
    int size = stack.size();

    /* Check if empty */
    boolean isEmpty = stack.isEmpty();
    \`\`\`

=== "C#"

    \`\`\`csharp title="stack.cs"
    /* Initialize stack */
    Stack<int> stack = new();

    /* Push elements */
    stack.Push(1);
    stack.Push(3);
    stack.Push(2);
    stack.Push(5);
    stack.Push(4);

    /* Access top element */
    int peek = stack.Peek();

    /* Pop element */
    int pop = stack.Pop();

    /* Get stack length */
    int size = stack.Count;

    /* Check if empty */
    bool isEmpty = stack.Count == 0;
    \`\`\`

=== "Go"

    \`\`\`go title="stack_test.go"
    /* Initialize stack */
    // In Go, it is recommended to use Slice as a stack
    var stack []int

    /* Push elements */
    stack = append(stack, 1)
    stack = append(stack, 3)
    stack = append(stack, 2)
    stack = append(stack, 5)
    stack = append(stack, 4)

    /* Access top element */
    peek := stack[len(stack)-1]

    /* Pop element */
    pop := stack[len(stack)-1]
    stack = stack[:len(stack)-1]

    /* Get stack length */
    size := len(stack)

    /* Check if empty */
    isEmpty := len(stack) == 0
    \`\`\`

=== "Swift"

    \`\`\`swift title="stack.swift"
    /* Initialize stack */
    // Swift does not have a built-in stack class, can use Array as a stack
    var stack: [Int] = []

    /* Push elements */
    stack.append(1)
    stack.append(3)
    stack.append(2)
    stack.append(5)
    stack.append(4)

    /* Access top element */
    let peek = stack.last!

    /* Pop element */
    let pop = stack.removeLast()

    /* Get stack length */
    let size = stack.count

    /* Check if empty */
    let isEmpty = stack.isEmpty
    \`\`\`

=== "JS"

    \`\`\`javascript title="stack.js"
    /* Initialize stack */
    // JavaScript does not have a built-in stack class, can use Array as a stack
    const stack = [];

    /* Push elements */
    stack.push(1);
    stack.push(3);
    stack.push(2);
    stack.push(5);
    stack.push(4);

    /* Access top element */
    const peek = stack[stack.length-1];

    /* Pop element */
    const pop = stack.pop();

    /* Get stack length */
    const size = stack.length;

    /* Check if empty */
    const is_empty = stack.length === 0;
    \`\`\`

=== "TS"

    \`\`\`typescript title="stack.ts"
    /* Initialize stack */
    // TypeScript does not have a built-in stack class, can use Array as a stack
    const stack: number[] = [];

    /* Push elements */
    stack.push(1);
    stack.push(3);
    stack.push(2);
    stack.push(5);
    stack.push(4);

    /* Access top element */
    const peek = stack[stack.length - 1];

    /* Pop element */
    const pop = stack.pop();

    /* Get stack length */
    const size = stack.length;

    /* Check if empty */
    const is_empty = stack.length === 0;
    \`\`\`

=== "Dart"

    \`\`\`dart title="stack.dart"
    /* Initialize stack */
    // Dart does not have a built-in stack class, can use List as a stack
    List<int> stack = [];

    /* Push elements */
    stack.add(1);
    stack.add(3);
    stack.add(2);
    stack.add(5);
    stack.add(4);

    /* Access top element */
    int peek = stack.last;

    /* Pop element */
    int pop = stack.removeLast();

    /* Get stack length */
    int size = stack.length;

    /* Check if empty */
    bool isEmpty = stack.isEmpty;
    \`\`\`

=== "Rust"

    \`\`\`rust title="stack.rs"
    /* Initialize stack */
    // Use Vec as a stack
    let mut stack: Vec<i32> = Vec::new();

    /* Push elements */
    stack.push(1);
    stack.push(3);
    stack.push(2);
    stack.push(5);
    stack.push(4);

    /* Access top element */
    let top = stack.last().unwrap();

    /* Pop element */
    let pop = stack.pop().unwrap();

    /* Get stack length */
    let size = stack.len();

    /* Check if empty */
    let is_empty = stack.is_empty();
    \`\`\`

=== "C"

    \`\`\`c title="stack.c"
    // C does not provide a built-in stack
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="stack.kt"
    /* Initialize stack */
    val stack = Stack<Int>()

    /* Push elements */
    stack.push(1)
    stack.push(3)
    stack.push(2)
    stack.push(5)
    stack.push(4)

    /* Access top element */
    val peek = stack.peek()

    /* Pop element */
    val pop = stack.pop()

    /* Get stack length */
    val size = stack.size

    /* Check if empty */
    val isEmpty = stack.isEmpty()
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="stack.rb"
    # Initialize stack
    # Ruby does not have a built-in stack class, can use Array as a stack
    stack = []

    # Push elements
    stack << 1
    stack << 3
    stack << 2
    stack << 5
    stack << 4

    # Access top element
    peek = stack.last

    # Pop element
    pop = stack.pop

    # Get stack length
    size = stack.length

    # Check if empty
    is_empty = stack.empty?
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E6%A0%88%0A%20%20%20%20%23%20Python%20%E6%B2%A1%E6%9C%89%E5%86%85%E7%BD%AE%E7%9A%84%E6%A0%88%E7%B1%BB%EF%BC%8C%E5%8F%AF%E4%BB%A5%E6%8A%8A%20list%20%E5%BD%93%E4%BD%9C%E6%A0%88%E6%9D%A5%E4%BD%BF%E7%94%A8%0A%20%20%20%20stack%20%3D%20%5B%5D%0A%0A%20%20%20%20%23%20%E5%85%83%E7%B4%A0%E5%85%A5%E6%A0%88%0A%20%20%20%20stack.append%281%29%0A%20%20%20%20stack.append%283%29%0A%20%20%20%20stack.append%282%29%0A%20%20%20%20stack.append%285%29%0A%20%20%20%20stack.append%284%29%0A%20%20%20%20print%28%22%E6%A0%88%20stack%20%3D%22,%20stack%29%0A%0A%20%20%20%20%23%20%E8%AE%BF%E9%97%AE%E6%A0%88%E9%A1%B6%E5%85%83%E7%B4%A0%0A%20%20%20%20peek%20%3D%20stack%5B-1%5D%0A%20%20%20%20print%28%22%E6%A0%88%E9%A1%B6%E5%85%83%E7%B4%A0%20peek%20%3D%22,%20peek%29%0A%0A%20%20%20%20%23%20%E5%85%83%E7%B4%A0%E5%87%BA%E6%A0%88%0A%20%20%20%20pop%20%3D%20stack.pop%28%29%0A%20%20%20%20print%28%22%E5%87%BA%E6%A0%88%E5%85%83%E7%B4%A0%20pop%20%3D%22,%20pop%29%0A%20%20%20%20print%28%22%E5%87%BA%E6%A0%88%E5%90%8E%20stack%20%3D%22,%20stack%29%0A%0A%20%20%20%20%23%20%E8%8E%B7%E5%8F%96%E6%A0%88%E7%9A%84%E9%95%BF%E5%BA%A6%0A%20%20%20%20size%20%3D%20len%28stack%29%0A%20%20%20%20print%28%22%E6%A0%88%E7%9A%84%E9%95%BF%E5%BA%A6%20size%20%3D%22,%20size%29%0A%0A%20%20%20%20%23%20%E5%88%A4%E6%96%AD%E6%98%AF%E5%90%A6%E4%B8%BA%E7%A9%BA%0A%20%20%20%20is_empty%20%3D%20len%28stack%29%20%3D%3D%200%0A%20%20%20%20print%28%22%E6%A0%88%E6%98%AF%E5%90%A6%E4%B8%BA%E7%A9%BA%20%3D%22,%20is_empty%29&cumulative=false&curInstr=2&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

## Stack Implementation

To gain a deeper understanding of how a stack operates, let's try implementing a stack class ourselves.

A stack follows the LIFO principle, so we can only add or remove elements at the top. However, both arrays and linked lists allow adding and removing elements at any position. **Therefore, a stack can be viewed as a restricted array or linked list**. In other words, we can "shield" some irrelevant operations of arrays or linked lists so that their external logic conforms to the characteristics of a stack.

### Linked List Implementation

When implementing a stack using a linked list, we can treat the head node of the linked list as the top of the stack and the tail node as the base.

As shown in the figure below, for the push operation, we simply insert an element at the head of the linked list. This node insertion method is called the "head insertion method." For the pop operation, we just need to remove the head node from the linked list.

=== "<1>"
    ![Push and pop operations in linked list implementation of stack](stack.assets/linkedlist_stack_step1.png)

=== "<2>"
    ![linkedlist_stack_push](stack.assets/linkedlist_stack_step2_push.png)

=== "<3>"
    ![linkedlist_stack_pop](stack.assets/linkedlist_stack_step3_pop.png)

Below is sample code for implementing a stack based on a linked list:

\`\`\`src
[file]{linkedlist_stack}-[class]{linked_list_stack}-[func]{}
\`\`\`

### Array Implementation

When implementing a stack using an array, we can treat the end of the array as the top of the stack. As shown in the figure below, push and pop operations correspond to adding and removing elements at the end of the array, both with a time complexity of $O(1)$.

=== "<1>"
    ![Push and pop operations in array implementation of stack](stack.assets/array_stack_step1.png)

=== "<2>"
    ![array_stack_push](stack.assets/array_stack_step2_push.png)

=== "<3>"
    ![array_stack_pop](stack.assets/array_stack_step3_pop.png)

Since elements pushed onto the stack may increase continuously, we can use a dynamic array, which eliminates the need to handle array expansion ourselves. Here is the sample code:

\`\`\`src
[file]{array_stack}-[class]{array_stack}-[func]{}
\`\`\`

## Comparison of the Two Implementations

**Supported Operations**

Both implementations support all operations defined by the stack. The array implementation additionally supports random access, but this goes beyond the stack definition and is generally not used.

**Time Efficiency**

In the array-based implementation, both push and pop operations occur in pre-allocated contiguous memory, which has good cache locality and is therefore more efficient. However, if pushing exceeds the array capacity, it triggers an expansion mechanism, causing the time complexity of that particular push operation to become $O(n)$.

In the linked list-based implementation, list expansion is very flexible, and there is no issue of reduced efficiency due to array expansion. However, the push operation requires initializing a node object and modifying pointers, so it is relatively less efficient. Nevertheless, if the pushed elements are already node objects, the initialization step can be omitted, thereby improving efficiency.

In summary, when the elements pushed and popped are basic data types such as \`int\` or \`double\`, we can draw the following conclusions:

- The array-based stack implementation has reduced efficiency when expansion is triggered, but since expansion is an infrequent operation, the average efficiency is higher.
- The linked list-based stack implementation can provide more stable efficiency performance.

**Space Efficiency**

When initializing a list, the system allocates an "initial capacity" that may exceed the actual need. Additionally, the expansion mechanism typically expands at a specific ratio (e.g., 2x), and the capacity after expansion may also exceed actual needs. Therefore, **the array-based stack implementation may cause some space wastage**.

However, since linked list nodes need to store additional pointers, **the space occupied by linked list nodes is relatively large**.

In summary, we cannot simply determine which implementation is more memory-efficient and need to analyze the specific situation.

## Typical Applications of Stack

- **Back and forward in browsers, undo and redo in software**. Every time we open a new webpage, the browser pushes the previous page onto the stack, allowing us to return to the previous page via the back operation. The back operation is essentially performing a pop. To support both back and forward, two stacks are needed to work together.
- **Program memory management**. Each time a function is called, the system adds a stack frame to the top of the stack to record the function's context information. During recursion, the downward recursive phase continuously performs push operations, while the upward backtracking phase continuously performs pop operations.

`
  },

  'dsa-queue': {
    title: '5.2 Queue (Hàng đợi)',
    summary: 'Tìm hiểu Hàng đợi (Queue) — cấu trúc dữ liệu tuyến tính tuân theo nguyên tắc FIFO, các thao tác phổ biến, triển khai bằng danh sách liên kết và mảng vòng, cùng mô phỏng tương tác enqueue/dequeue.',
    tags: ['dsa', 'queue'],
    domain: 'Algorithms',
    module: 'Chương 5: Ngăn xếp & Hàng đợi',
    prerequisites: ['dsa-stack'],
    related: ['dsa-deque'],
    updatedAt: '2026-07-19',
    readTime: '12 phút',
    content: `

<h2>5.2.1 Định nghĩa Queue (Hàng đợi)</h2>
<p><u>Hàng đợi (Queue)</u> là một cấu trúc dữ liệu tuyến tính tuân theo nguyên tắc Vào trước, Ra trước (FIFO — First In, First Out). Đúng như tên gọi, nó mô phỏng việc xếp hàng: người mới đến liên tục gia nhập vào cuối hàng, trong khi những người ở đầu hàng lần lượt rời đi.</p>
<p>Như minh họa trong hình dưới đây, ta gọi đầu của hàng đợi là "đầu" (front) và cuối là "cuối" (rear). Thao tác thêm một phần tử vào cuối gọi là "thêm vào hàng đợi" (enqueue), và thao tác lấy phần tử ở đầu ra gọi là "lấy ra khỏi hàng đợi" (dequeue).</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/queue_operations.png" alt="Quy tắc FIFO của hàng đợi" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>5.2.2 Các thao tác phổ biến trên Queue</h2>
<p>Các thao tác phổ biến trên hàng đợi được thể hiện trong bảng dưới đây. Lưu ý rằng tên phương thức có thể khác nhau tùy ngôn ngữ lập trình. Ở đây ta dùng cùng quy ước đặt tên như với ngăn xếp.</p>
<p align="center">Bảng &nbsp; Hiệu năng các thao tác trên Queue</p>
<table>
  <thead>
    <tr><th>Phương thức</th><th>Mô tả</th><th>Độ phức tạp thời gian</th></tr>
  </thead>
  <tbody>
    <tr><td><code>push()</code></td><td>Thêm phần tử vào hàng đợi, thêm vào cuối</td><td>$O(1)$</td></tr>
    <tr><td><code>pop()</code></td><td>Lấy phần tử ở đầu ra khỏi hàng đợi</td><td>$O(1)$</td></tr>
    <tr><td><code>peek()</code></td><td>Truy cập phần tử ở đầu</td><td>$O(1)$</td></tr>
  </tbody>
</table>
<p>Ta có thể trực tiếp dùng các class hàng đợi do ngôn ngữ lập trình cung cấp:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Khởi tạo hàng đợi */
Queue&lt;Integer&gt; queue = new LinkedList&lt;&gt;();

/* Thêm phần tử vào hàng đợi */
queue.offer(1);
queue.offer(3);
queue.offer(2);
queue.offer(5);
queue.offer(4);

/* Truy cập phần tử đầu hàng đợi */
int peek = queue.peek();

/* Lấy phần tử ra khỏi hàng đợi */
int pop = queue.poll();

/* Lấy độ dài hàng đợi */
int size = queue.size();

/* Kiểm tra hàng đợi có rỗng không */
boolean isEmpty = queue.isEmpty();</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>from collections import deque

# Khởi tạo hàng đợi
# Trong Python, thường dùng class deque (hàng đợi hai đầu) làm hàng đợi
# Mặc dù queue.Queue() là class hàng đợi thuần túy, nhưng không tiện dùng nên không khuyến khích
que: deque[int] = deque()

# Thêm phần tử vào hàng đợi
que.append(1)
que.append(3)
que.append(2)
que.append(5)
que.append(4)

# Truy cập phần tử đầu hàng đợi
front: int = que[0]

# Lấy phần tử ra khỏi hàng đợi
pop: int = que.popleft()

# Lấy độ dài hàng đợi
size: int = len(que)

# Kiểm tra hàng đợi có rỗng không
is_empty: bool = len(que) == 0</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Khởi tạo hàng đợi */
queue&lt;int&gt; queue;

/* Thêm phần tử vào hàng đợi */
queue.push(1);
queue.push(3);
queue.push(2);
queue.push(5);
queue.push(4);

/* Truy cập phần tử đầu hàng đợi */
int front = queue.front();

/* Lấy phần tử ra khỏi hàng đợi */
queue.pop();

/* Lấy độ dài hàng đợi */
int size = queue.size();

/* Kiểm tra hàng đợi có rỗng không */
bool empty = queue.empty();</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Khởi tạo hàng đợi */
// JavaScript không có class hàng đợi dựng sẵn, có thể dùng Array làm hàng đợi
const queue = [];

/* Thêm phần tử vào hàng đợi */
queue.push(1);
queue.push(3);
queue.push(2);
queue.push(5);
queue.push(4);

/* Truy cập phần tử đầu hàng đợi */
const peek = queue[0];

/* Lấy phần tử ra khỏi hàng đợi */
// Lưu ý vì đây là mảng nên shift() có độ phức tạp thời gian O(n)
const pop = queue.shift();

/* Lấy độ dài hàng đợi */
const size = queue.length;

/* Kiểm tra hàng đợi có rỗng không */
const empty = queue.length === 0;</code></pre></div></div></div>

<h2>5.2.3 Triển khai Queue</h2>
<p>Để triển khai một hàng đợi, ta cần một cấu trúc dữ liệu cho phép thêm phần tử ở một đầu và xóa phần tử ở đầu còn lại. Cả danh sách liên kết và mảng đều đáp ứng được yêu cầu này.</p>

<h3>5.2.3.1 Triển khai bằng Danh sách liên kết</h3>
<p>Như minh họa trong hình dưới đây, ta có thể coi "node đầu" và "node cuối" của danh sách liên kết lần lượt là "đầu" và "cuối" của hàng đợi, với quy tắc node chỉ có thể được thêm vào ở cuối và bị xóa ở đầu.</p>
<div class="interactive-widget-wrapper" id="linkedlist-queue-steps-wrapper">
  <div class="slider-container">
    <div class="slider-slides">
      <div class="slide active" data-step="1">
        <img loading="lazy" src="dsa-assets/linkedlist_queue_step1.png" alt="Bước 1" />
        <p class="slide-caption"><strong>Bước 1:</strong> Trạng thái ban đầu — node đầu là "đầu hàng đợi", node cuối là "cuối hàng đợi".</p>
      </div>
      <div class="slide" data-step="2">
        <img loading="lazy" src="dsa-assets/linkedlist_queue_step2_push.png" alt="Bước 2 — push" />
        <p class="slide-caption"><strong>Bước 2 — enqueue:</strong> Thêm node mới vào cuối danh sách liên kết.</p>
      </div>
      <div class="slide" data-step="3">
        <img loading="lazy" src="dsa-assets/linkedlist_queue_step3_pop.png" alt="Bước 3 — pop" />
        <p class="slide-caption"><strong>Bước 3 — dequeue:</strong> Xóa node ở đầu danh sách liên kết.</p>
      </div>
    </div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('linkedlist-queue-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 3</span>
      <button class="slider-btn" onclick="nextSlide('linkedlist-queue-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Dưới đây là mã triển khai hàng đợi bằng danh sách liên kết:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Hàng đợi triển khai bằng danh sách liên kết */
class LinkedListQueue {
    private ListNode front, rear; // Node đầu front, node cuối rear
    private int queSize = 0;

    public LinkedListQueue() {
        front = null;
        rear = null;
    }

    /* Lấy độ dài hàng đợi */
    public int size() {
        return queSize;
    }

    /* Kiểm tra hàng đợi có rỗng không */
    public boolean isEmpty() {
        return size() == 0;
    }

    /* Thêm vào hàng đợi */
    public void push(int num) {
        // Thêm num vào sau node cuối
        ListNode node = new ListNode(num);
        // Nếu hàng đợi rỗng, cho cả front và rear trỏ đến node này
        if (front == null) {
            front = node;
            rear = node;
        // Nếu hàng đợi không rỗng, thêm node vào sau node cuối
        } else {
            rear.next = node;
            rear = node;
        }
        queSize++;
    }

    /* Lấy ra khỏi hàng đợi */
    public int pop() {
        int num = peek();
        // Xóa node đầu
        front = front.next;
        queSize--;
        return num;
    }

    /* Truy cập phần tử đầu hàng đợi */
    public int peek() {
        if (isEmpty())
            throw new IndexOutOfBoundsException();
        return front.val;
    }

    /* Chuyển đổi danh sách liên kết sang mảng và trả về */
    public int[] toArray() {
        ListNode node = front;
        int[] res = new int[size()];
        for (int i = 0; i &lt; res.length; i++) {
            res[i] = node.val;
            node = node.next;
        }
        return res;
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>LinkedListQueue() {
    _front = null;
    _rear = null;
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class LinkedListQueue:
    """Hàng đợi triển khai bằng danh sách liên kết"""

    def __init__(self):
        """Hàm khởi tạo"""
        self._front: ListNode | None = None  # Node đầu front
        self._rear: ListNode | None = None  # Node cuối rear
        self._size: int = 0

    def size(self) -&gt; int:
        """Lấy độ dài hàng đợi"""
        return self._size

    def is_empty(self) -&gt; bool:
        """Kiểm tra hàng đợi có rỗng không"""
        return self._size == 0

    def push(self, num: int):
        """Thêm vào hàng đợi"""
        # Thêm num vào sau node cuối
        node = ListNode(num)
        # Nếu hàng đợi rỗng, cho cả front và rear trỏ đến node này
        if self._front is None:
            self._front = node
            self._rear = node
        # Nếu hàng đợi không rỗng, thêm node vào sau node cuối
        else:
            self._rear.next = node
            self._rear = node
        self._size += 1

    def pop(self) -&gt; int:
        """Lấy ra khỏi hàng đợi"""
        num = self.peek()
        # Xóa node đầu
        self._front = self._front.next
        self._size -= 1
        return num

    def peek(self) -&gt; int:
        """Truy cập phần tử đầu hàng đợi"""
        if self.is_empty():
            raise IndexError("Hàng đợi rỗng")
        return self._front.val

    def to_list(self) -&gt; list[int]:
        """Chuyển đổi sang list để in ra"""
        queue = []
        temp = self._front
        while temp:
            queue.append(temp.val)
            temp = temp.next
        return queue</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Hàng đợi triển khai bằng danh sách liên kết */
class LinkedListQueue {
  private:
    ListNode *front, *rear; // Node đầu front, node cuối rear
    int queSize;

  public:
    LinkedListQueue() {
        front = nullptr;
        rear = nullptr;
        queSize = 0;
    }

    ~LinkedListQueue() {
        // Duyệt danh sách liên kết để xóa node, giải phóng bộ nhớ
        freeMemoryLinkedList(front);
    }

    /* Lấy độ dài hàng đợi */
    int size() {
        return queSize;
    }

    /* Kiểm tra hàng đợi có rỗng không */
    bool isEmpty() {
        return queSize == 0;
    }

    /* Thêm vào hàng đợi */
    void push(int num) {
        // Thêm num vào sau node cuối
        ListNode *node = new ListNode(num);
        // Nếu hàng đợi rỗng, cho cả front và rear trỏ đến node này
        if (front == nullptr) {
            front = node;
            rear = node;
        }
        // Nếu hàng đợi không rỗng, thêm node vào sau node cuối
        else {
            rear-&gt;next = node;
            rear = node;
        }
        queSize++;
    }

    /* Lấy ra khỏi hàng đợi */
    int pop() {
        int num = peek();
        // Xóa node đầu
        ListNode *tmp = front;
        front = front-&gt;next;
        // Giải phóng bộ nhớ
        delete tmp;
        queSize--;
        return num;
    }

    /* Truy cập phần tử đầu hàng đợi */
    int peek() {
        if (size() == 0)
            throw out_of_range("Hàng đợi rỗng");
        return front-&gt;val;
    }

    /* Chuyển đổi danh sách liên kết sang Vector và trả về */
    vector&lt;int&gt; toVector() {
        ListNode *node = front;
        vector&lt;int&gt; res(size());
        for (int i = 0; i &lt; res.size(); i++) {
            res[i] = node-&gt;val;
            node = node-&gt;next;
        }
        return res;
    }
};</code></pre></div></div></div>

<h3>5.2.3.2 Triển khai bằng Mảng</h3>
<p>Việc xóa phần tử đầu tiên trong mảng có độ phức tạp thời gian $O(n)$, điều này sẽ khiến thao tác lấy ra khỏi hàng đợi kém hiệu quả. Tuy nhiên, ta có thể dùng phương pháp khéo léo sau để tránh vấn đề này.</p>
<p>Ta có thể dùng một biến <code>front</code> để trỏ đến chỉ mục của phần tử đầu và duy trì một biến <code>size</code> để ghi lại độ dài hàng đợi. Ta định nghĩa <code>rear = front + size</code>, dùng để tính vị trí ngay sau phần tử cuối.</p>
<p>Dựa trên thiết kế này, <strong>khoảng hợp lệ chứa các phần tử trong mảng là <code>[front, rear - 1]</code></strong>. Cách triển khai của các thao tác được thể hiện trong hình dưới đây:</p>
<ul>
  <li>Thao tác thêm vào hàng đợi: gán phần tử đầu vào tại chỉ mục <code>rear</code>, và tăng <code>size</code> lên 1.</li>
  <li>Thao tác lấy ra khỏi hàng đợi: chỉ cần tăng <code>front</code> lên 1 và giảm <code>size</code> đi 1.</li>
</ul>
<p>Có thể thấy, cả thao tác thêm vào và lấy ra đều chỉ cần một phép toán, với độ phức tạp thời gian $O(1)$.</p>
<div class="interactive-widget-wrapper" id="array-queue-steps-wrapper">
  <div class="slider-container">
    <div class="slider-slides">
      <div class="slide active" data-step="1">
        <img loading="lazy" src="dsa-assets/array_queue_step1.png" alt="Bước 1" />
        <p class="slide-caption"><strong>Bước 1:</strong> Trạng thái ban đầu — <code>front</code> trỏ tới phần tử đầu, <code>rear = front + size</code>.</p>
      </div>
      <div class="slide" data-step="2">
        <img loading="lazy" src="dsa-assets/array_queue_step2_push.png" alt="Bước 2 — push" />
        <p class="slide-caption"><strong>Bước 2 — enqueue:</strong> Gán phần tử mới vào chỉ mục <code>rear</code>, tăng <code>size</code> lên 1.</p>
      </div>
      <div class="slide" data-step="3">
        <img loading="lazy" src="dsa-assets/array_queue_step3_pop.png" alt="Bước 3 — pop" />
        <p class="slide-caption"><strong>Bước 3 — dequeue:</strong> Tăng <code>front</code> lên 1, giảm <code>size</code> đi 1.</p>
      </div>
    </div>
    <div class="slider-controls">
      <button class="slider-btn" onclick="prevSlide('array-queue-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 3</span>
      <button class="slider-btn" onclick="nextSlide('array-queue-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Có thể bạn nhận thấy một vấn đề: khi ta liên tục thêm vào và lấy ra, cả <code>front</code> và <code>rear</code> đều di chuyển sang phải. <strong>Khi chúng chạm đến cuối mảng, chúng không thể tiếp tục di chuyển được nữa</strong>. Để giải quyết vấn đề này, ta có thể coi mảng như một "mảng vòng" (circular array) với đầu và cuối được nối liền nhau.</p>
<p>Đối với một mảng vòng, ta cần để <code>front</code> hoặc <code>rear</code> quay vòng về đầu mảng khi chúng vượt qua cuối mảng. Quy luật tuần hoàn này có thể được triển khai bằng "phép chia lấy dư" (modulo), như đoạn mã dưới đây:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Hàng đợi triển khai bằng mảng vòng (circular array) */
class ArrayQueue {
    private int[] nums; // Mảng dùng để lưu phần tử hàng đợi
    private int front; // Con trỏ đầu, trỏ đến phần tử ở đầu hàng đợi
    private int queSize; // Độ dài hàng đợi

    public ArrayQueue(int capacity) {
        nums = new int[capacity];
        front = queSize = 0;
    }

    /* Lấy dung lượng hàng đợi */
    public int capacity() {
        return nums.length;
    }

    /* Lấy độ dài hàng đợi */
    public int size() {
        return queSize;
    }

    /* Kiểm tra hàng đợi có rỗng không */
    public boolean isEmpty() {
        return queSize == 0;
    }

    /* Thêm vào hàng đợi */
    public void push(int num) {
        if (queSize == capacity()) {
            System.out.println("Hàng đợi đầy");
            return;
        }
        // Dùng phép chia lấy dư để rear quay về đầu mảng sau khi vượt qua cuối mảng
        // Thêm num vào cuối hàng đợi
        int rear = (front + queSize) % capacity();
        // Con trỏ đầu dịch về sau một vị trí
        nums[rear] = num;
        queSize++;
    }

    /* Lấy ra khỏi hàng đợi */
    public int pop() {
        int num = peek();
        // Con trỏ đầu dịch về sau một vị trí, nếu vượt qua cuối thì quay lại đầu mảng
        front = (front + 1) % capacity();
        queSize--;
        return num;
    }

    /* Truy cập phần tử đầu hàng đợi */
    public int peek() {
        if (isEmpty())
            throw new IndexOutOfBoundsException();
        return nums[front];
    }

    /* Trả về mảng */
    public int[] toArray() {
        int[] res = new int[queSize];
        for (int i = 0, j = front; i &lt; queSize; i++, j++) {
            res[i] = nums[j % capacity()];
        }
        return res;
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>ArrayQueue(int capacity) {
    _nums = List.filled(capacity, 0);
    _front = _queSize = 0;
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class ArrayQueue:
    """Hàng đợi triển khai bằng mảng vòng (circular array)"""

    def __init__(self, size: int):
        """Hàm khởi tạo"""
        self._nums: list[int] = [0] * size  # Mảng dùng để lưu phần tử hàng đợi
        self._front: int = 0  # Con trỏ đầu, trỏ đến phần tử ở đầu hàng đợi
        self._size: int = 0  # Độ dài hàng đợi

    def capacity(self) -&gt; int:
        """Lấy dung lượng hàng đợi"""
        return len(self._nums)

    def size(self) -&gt; int:
        """Lấy độ dài hàng đợi"""
        return self._size

    def is_empty(self) -&gt; bool:
        """Kiểm tra hàng đợi có rỗng không"""
        return self._size == 0

    def push(self, num: int):
        """Thêm vào hàng đợi"""
        if self._size == self.capacity():
            raise IndexError("Hàng đợi đầy")
        # Tính con trỏ rear, trỏ đến chỉ mục cuối + 1
        # Dùng phép chia lấy dư để rear quay về đầu mảng sau khi vượt qua cuối mảng
        rear: int = (self._front + self._size) % self.capacity()
        # Thêm num vào cuối hàng đợi
        self._nums[rear] = num
        self._size += 1

    def pop(self) -&gt; int:
        """Lấy ra khỏi hàng đợi"""
        num: int = self.peek()
        # Con trỏ đầu dịch về sau một vị trí, nếu vượt qua cuối thì quay lại đầu mảng
        self._front = (self._front + 1) % self.capacity()
        self._size -= 1
        return num

    def peek(self) -&gt; int:
        """Truy cập phần tử đầu hàng đợi"""
        if self.is_empty():
            raise IndexError("Hàng đợi rỗng")
        return self._nums[self._front]

    def to_list(self) -&gt; list[int]:
        """Trả về list để in ra"""
        res = [0] * self.size()
        j: int = self._front
        for i in range(self.size()):
            res[i] = self._nums[(j % self.capacity())]
            j += 1
        return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Hàng đợi triển khai bằng mảng vòng (circular array) */
class ArrayQueue {
  private:
    int *nums;       // Mảng dùng để lưu phần tử hàng đợi
    int front;       // Con trỏ đầu, trỏ đến phần tử ở đầu hàng đợi
    int queSize;     // Độ dài hàng đợi
    int queCapacity; // Dung lượng hàng đợi

  public:
    ArrayQueue(int capacity) {
        // Khởi tạo mảng
        nums = new int[capacity];
        queCapacity = capacity;
        front = queSize = 0;
    }

    ~ArrayQueue() {
        delete[] nums;
    }

    /* Lấy dung lượng hàng đợi */
    int capacity() {
        return queCapacity;
    }

    /* Lấy độ dài hàng đợi */
    int size() {
        return queSize;
    }

    /* Kiểm tra hàng đợi có rỗng không */
    bool isEmpty() {
        return size() == 0;
    }

    /* Thêm vào hàng đợi */
    void push(int num) {
        if (queSize == queCapacity) {
            cout &lt;&lt; "Hàng đợi đầy" &lt;&lt; endl;
            return;
        }
        // Dùng phép chia lấy dư để rear quay về đầu mảng sau khi vượt qua cuối mảng
        // Thêm num vào cuối hàng đợi
        int rear = (front + queSize) % queCapacity;
        // Con trỏ đầu dịch về sau một vị trí
        nums[rear] = num;
        queSize++;
    }

    /* Lấy ra khỏi hàng đợi */
    int pop() {
        int num = peek();
        // Con trỏ đầu dịch về sau một vị trí, nếu vượt qua cuối thì quay lại đầu mảng
        front = (front + 1) % queCapacity;
        queSize--;
        return num;
    }

    /* Truy cập phần tử đầu hàng đợi */
    int peek() {
        if (isEmpty())
            throw out_of_range("Hàng đợi rỗng");
        return nums[front];
    }

    /* Chuyển đổi mảng sang Vector và trả về */
    vector&lt;int&gt; toVector() {
        vector&lt;int&gt; arr(queSize);
        for (int i = 0, j = front; i &lt; queSize; i++, j++) {
            arr[i] = nums[j % queCapacity];
        }
        return arr;
    }
};</code></pre></div></div></div>
<p>Hàng đợi được triển khai ở trên vẫn còn hạn chế: độ dài của nó là bất biến. Tuy nhiên, vấn đề này không khó giải quyết. Ta có thể thay mảng bằng một mảng động để tích hợp cơ chế mở rộng. Bạn đọc quan tâm có thể tự thử triển khai điều này.</p>
<p>Các kết luận so sánh cho hai cách triển khai đều nhất quán với ngăn xếp và sẽ không được nhắc lại ở đây.</p>

<h3>5.2.3.3 Mô phỏng tương tác</h3>
<div class="interactive-widget-wrapper" id="queue-ops-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'queue-ops-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'queue-ops-wrapper', 'tab-interactive'); initQueueOpsDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <div style="display:flex; gap: 1em; flex-wrap: wrap; justify-content: center;">
      <div style="flex: 1 1 260px; text-align:center;">
        <img loading="lazy" src="dsa-assets/array_queue_step2_push.png" alt="Thao tác push trên hàng đợi mảng" style="max-width:100%; border-radius: var(--radius-md);" />
        <p style="font-size: 13px; color: var(--text-secondary);">Thêm phần tử vào hàng đợi (enqueue)</p>
      </div>
      <div style="flex: 1 1 260px; text-align:center;">
        <img loading="lazy" src="dsa-assets/array_queue_step3_pop.png" alt="Thao tác pop trên hàng đợi mảng" style="max-width:100%; border-radius: var(--radius-md);" />
        <p style="font-size: 13px; color: var(--text-secondary);">Lấy phần tử ra khỏi hàng đợi (dequeue)</p>
      </div>
    </div>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="queue-ops-canvas" style="display:flex; gap:6px; flex-wrap:wrap; justify-content:center; min-height: 70px; align-items:flex-end; padding: 10px;"></div>
    <div class="simulator-controls" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 15px;">
      <button class="control-btn" id="queue-ops-btn-autorun" onclick="autoRunQueueOps()">▶ Auto Run</button>
      <button class="control-btn" id="queue-ops-btn-step" onclick="stepQueueOps()">Bước tiếp theo ▶</button>
      <button class="control-btn" id="queue-ops-btn-pause" onclick="pauseRunQueueOps()" disabled>⏸ Dừng</button>
      <button class="control-btn btn-secondary" id="queue-ops-btn-reset" onclick="initQueueOpsDemo()">↺ Reset</button>
    </div>
    <div id="queue-ops-speed-control" style="text-align:center; font-size: 13px; color: var(--text-secondary); margin-top: 12px;">
      Tốc độ: <input type="range" min="200" max="2000" value="900" step="200" oninput="setQueueOpsSpeed(this.value)" /> <span id="queue-ops-speed-label">900ms</span>
    </div>
    <div id="queue-ops-status" class="simulator-status" style="margin-top: 12px; font-size: 14px; text-align: center; color: var(--text-secondary);">
      Nhấp "Auto Run" hoặc "Bước tiếp theo" để xem mô phỏng push/peek/pop trên hàng đợi.
    </div>
  </div>
</div>

<h2>5.2.4 Ứng dụng điển hình của Queue</h2>
<ul>
  <li><strong>Đơn hàng trên Taobao</strong>. Sau khi người mua đặt hàng, các đơn hàng được thêm vào một hàng đợi, và hệ thống sau đó xử lý các đơn hàng trong hàng đợi theo đúng thứ tự. Trong dịp Song Thập Nhất (Double Eleven), một lượng lớn đơn hàng được sinh ra trong thời gian ngắn, và tính đồng thời cao trở thành thách thức then chốt mà các kỹ sư cần giải quyết.</li>
  <li><strong>Các tác vụ cần thực hiện (to-do)</strong>. Bất kỳ tình huống nào cần triển khai chức năng "đến trước, phục vụ trước", chẳng hạn hàng đợi tác vụ của máy in hoặc hàng đợi đặt món của nhà hàng, đều có thể duy trì hiệu quả thứ tự xử lý bằng cách dùng hàng đợi.</li>
</ul>

`,
    originalContent: `
# Queue

A <u>queue</u> is a linear data structure that follows the First In, First Out (FIFO) rule. As the name suggests, it models people lining up: newcomers continuously join the rear of the queue, while the people at the front leave one by one.

As shown in the figure below, we call the front of the queue the "front" and the end the "rear." The operation of adding an element to the rear is called "enqueue," and the operation of removing the front element is called "dequeue."

![FIFO rule of queue](queue.assets/queue_operations.png)

## Common Queue Operations

The common operations on a queue are shown in the table below. Note that method names may vary across programming languages. Here, we use the same naming convention as for stacks.

<p align="center"> Table <id> &nbsp; Efficiency of Queue Operations </p>

| Method   | Description                                | Time Complexity |
| -------- | ------------------------------------------ | --------------- |
| \`push()\` | Enqueue element, add element to rear       | $O(1)$          |
| \`pop()\`  | Dequeue front element                      | $O(1)$          |
| \`peek()\` | Access front element                       | $O(1)$          |

We can directly use the queue classes provided by the programming language:

=== "Python"

    \`\`\`python title="queue.py"
    from collections import deque

    # Initialize queue
    # In Python, we generally use the deque class as a queue
    # Although queue.Queue() is a pure queue class, it is not very user-friendly, so it is not recommended
    que: deque[int] = deque()

    # Enqueue elements
    que.append(1)
    que.append(3)
    que.append(2)
    que.append(5)
    que.append(4)

    # Access front element
    front: int = que[0]

    # Dequeue element
    pop: int = que.popleft()

    # Get queue length
    size: int = len(que)

    # Check if queue is empty
    is_empty: bool = len(que) == 0
    \`\`\`

=== "C++"

    \`\`\`cpp title="queue.cpp"
    /* Initialize queue */
    queue<int> queue;

    /* Enqueue elements */
    queue.push(1);
    queue.push(3);
    queue.push(2);
    queue.push(5);
    queue.push(4);

    /* Access front element */
    int front = queue.front();

    /* Dequeue element */
    queue.pop();

    /* Get queue length */
    int size = queue.size();

    /* Check if queue is empty */
    bool empty = queue.empty();
    \`\`\`

=== "Java"

    \`\`\`java title="queue.java"
    /* Initialize queue */
    Queue<Integer> queue = new LinkedList<>();

    /* Enqueue elements */
    queue.offer(1);
    queue.offer(3);
    queue.offer(2);
    queue.offer(5);
    queue.offer(4);

    /* Access front element */
    int peek = queue.peek();

    /* Dequeue element */
    int pop = queue.poll();

    /* Get queue length */
    int size = queue.size();

    /* Check if queue is empty */
    boolean isEmpty = queue.isEmpty();
    \`\`\`

=== "C#"

    \`\`\`csharp title="queue.cs"
    /* Initialize queue */
    Queue<int> queue = new();

    /* Enqueue elements */
    queue.Enqueue(1);
    queue.Enqueue(3);
    queue.Enqueue(2);
    queue.Enqueue(5);
    queue.Enqueue(4);

    /* Access front element */
    int peek = queue.Peek();

    /* Dequeue element */
    int pop = queue.Dequeue();

    /* Get queue length */
    int size = queue.Count;

    /* Check if queue is empty */
    bool isEmpty = queue.Count == 0;
    \`\`\`

=== "Go"

    \`\`\`go title="queue_test.go"
    /* Initialize queue */
    // In Go, use list as a queue
    queue := list.New()

    /* Enqueue elements */
    queue.PushBack(1)
    queue.PushBack(3)
    queue.PushBack(2)
    queue.PushBack(5)
    queue.PushBack(4)

    /* Access front element */
    peek := queue.Front()

    /* Dequeue element */
    pop := queue.Front()
    queue.Remove(pop)

    /* Get queue length */
    size := queue.Len()

    /* Check if queue is empty */
    isEmpty := queue.Len() == 0
    \`\`\`

=== "Swift"

    \`\`\`swift title="queue.swift"
    /* Initialize queue */
    // Swift does not have a built-in queue class, can use Array as a queue
    var queue: [Int] = []

    /* Enqueue elements */
    queue.append(1)
    queue.append(3)
    queue.append(2)
    queue.append(5)
    queue.append(4)

    /* Access front element */
    let peek = queue.first!

    /* Dequeue element */
    // Since it's an array, removeFirst has O(n) complexity
    let pool = queue.removeFirst()

    /* Get queue length */
    let size = queue.count

    /* Check if queue is empty */
    let isEmpty = queue.isEmpty
    \`\`\`

=== "JS"

    \`\`\`javascript title="queue.js"
    /* Initialize queue */
    // JavaScript does not have a built-in queue, can use Array as a queue
    const queue = [];

    /* Enqueue elements */
    queue.push(1);
    queue.push(3);
    queue.push(2);
    queue.push(5);
    queue.push(4);

    /* Access front element */
    const peek = queue[0];

    /* Dequeue element */
    // The underlying structure is an array, so shift() has O(n) time complexity
    const pop = queue.shift();

    /* Get queue length */
    const size = queue.length;

    /* Check if queue is empty */
    const empty = queue.length === 0;
    \`\`\`

=== "TS"

    \`\`\`typescript title="queue.ts"
    /* Initialize queue */
    // TypeScript does not have a built-in queue, can use Array as a queue
    const queue: number[] = [];

    /* Enqueue elements */
    queue.push(1);
    queue.push(3);
    queue.push(2);
    queue.push(5);
    queue.push(4);

    /* Access front element */
    const peek = queue[0];

    /* Dequeue element */
    // The underlying structure is an array, so shift() has O(n) time complexity
    const pop = queue.shift();

    /* Get queue length */
    const size = queue.length;

    /* Check if queue is empty */
    const empty = queue.length === 0;
    \`\`\`

=== "Dart"

    \`\`\`dart title="queue.dart"
    /* Initialize queue */
    // In Dart, the Queue class is a deque and can also be used as a queue
    Queue<int> queue = Queue();

    /* Enqueue elements */
    queue.add(1);
    queue.add(3);
    queue.add(2);
    queue.add(5);
    queue.add(4);

    /* Access front element */
    int peek = queue.first;

    /* Dequeue element */
    int pop = queue.removeFirst();

    /* Get queue length */
    int size = queue.length;

    /* Check if queue is empty */
    bool isEmpty = queue.isEmpty;
    \`\`\`

=== "Rust"

    \`\`\`rust title="queue.rs"
    /* Initialize deque */
    // In Rust, use deque as a regular queue
    let mut deque: VecDeque<u32> = VecDeque::new();

    /* Enqueue elements */
    deque.push_back(1);
    deque.push_back(3);
    deque.push_back(2);
    deque.push_back(5);
    deque.push_back(4);

    /* Access front element */
    if let Some(front) = deque.front() {
    }

    /* Dequeue element */
    if let Some(pop) = deque.pop_front() {
    }

    /* Get queue length */
    let size = deque.len();

    /* Check if queue is empty */
    let is_empty = deque.is_empty();
    \`\`\`

=== "C"

    \`\`\`c title="queue.c"
    // C does not provide a built-in queue
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="queue.kt"
    /* Initialize queue */
    val queue = LinkedList<Int>()

    /* Enqueue elements */
    queue.offer(1)
    queue.offer(3)
    queue.offer(2)
    queue.offer(5)
    queue.offer(4)

    /* Access front element */
    val peek = queue.peek()

    /* Dequeue element */
    val pop = queue.poll()

    /* Get queue length */
    val size = queue.size

    /* Check if queue is empty */
    val isEmpty = queue.isEmpty()
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="queue.rb"
    # Initialize queue
    # Ruby's built-in queue (Thread::Queue) does not have peek and traversal methods, can use Array as a queue
    queue = []

    # Enqueue elements
    queue.push(1)
    queue.push(3)
    queue.push(2)
    queue.push(5)
    queue.push(4)

    # Access front element
    peek = queue.first

    # Dequeue element
    # Please note that since it's an array, Array#shift has O(n) time complexity
    pop = queue.shift

    # Get queue length
    size = queue.length

    # Check if queue is empty
    is_empty = queue.empty?
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=from%20collections%20import%20deque%0A%0A%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E9%98%9F%E5%88%97%0A%20%20%20%20%23%20%E5%9C%A8%20Python%20%E4%B8%AD%EF%BC%8C%E6%88%91%E4%BB%AC%E4%B8%80%E8%88%AC%E5%B0%86%E5%8F%8C%E5%90%91%E9%98%9F%E5%88%97%E7%B1%BB%20deque%20%E7%9C%8B%E4%BD%9C%E9%98%9F%E5%88%97%E4%BD%BF%E7%94%A8%0A%20%20%20%20%23%20%E8%99%BD%E7%84%B6%20queue.Queue%28%29%20%E6%98%AF%E7%BA%AF%E6%AD%A3%E7%9A%84%E9%98%9F%E5%88%97%E7%B1%BB%EF%BC%8C%E4%BD%86%E4%B8%8D%E5%A4%AA%E5%A5%BD%E7%94%A8%0A%20%20%20%20que%20%3D%20deque%28%29%0A%0A%20%20%20%20%23%20%E5%85%83%E7%B4%A0%E5%85%A5%E9%98%9F%0A%20%20%20%20que.append%281%29%0A%20%20%20%20que.append%283%29%0A%20%20%20%20que.append%282%29%0A%20%20%20%20que.append%285%29%0A%20%20%20%20que.append%284%29%0A%20%20%20%20print%28%22%E9%98%9F%E5%88%97%20que%20%3D%22,%20que%29%0A%0A%20%20%20%20%23%20%E8%AE%BF%E9%97%AE%E9%98%9F%E9%A6%96%E5%85%83%E7%B4%A0%0A%20%20%20%20front%20%3D%20que%5B0%5D%0A%20%20%20%20print%28%22%E9%98%9F%E9%A6%96%E5%85%83%E7%B4%A0%20front%20%3D%22,%20front%29%0A%0A%20%20%20%20%23%20%E5%85%83%E7%B4%A0%E5%87%BA%E9%98%9F%0A%20%20%20%20pop%20%3D%20que.popleft%28%29%0A%20%20%20%20print%28%22%E5%87%BA%E9%98%9F%E5%85%83%E7%B4%A0%20pop%20%3D%22,%20pop%29%0A%20%20%20%20print%28%22%E5%87%BA%E9%98%9F%E5%90%8E%20que%20%3D%22,%20que%29%0A%0A%20%20%20%20%23%20%E8%8E%B7%E5%8F%96%E9%98%9F%E5%88%97%E7%9A%84%E9%95%BF%E5%BA%A6%0A%20%20%20%20size%20%3D%20len%28que%29%0A%20%20%20%20print%28%22%E9%98%9F%E5%88%97%E9%95%BF%E5%BA%A6%20size%20%3D%22,%20size%29%0A%0A%20%20%20%20%23%20%E5%88%A4%E6%96%AD%E9%98%9F%E5%88%97%E6%98%AF%E5%90%A6%E4%B8%BA%E7%A9%BA%0A%20%20%20%20is_empty%20%3D%20len%28que%29%20%3D%3D%200%0A%20%20%20%20print%28%22%E9%98%9F%E5%88%97%E6%98%AF%E5%90%A6%E4%B8%BA%E7%A9%BA%20%3D%22,%20is_empty%29&cumulative=false&curInstr=3&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

## Queue Implementation

To implement a queue, we need a data structure that allows adding elements at one end and removing elements at the other end. Both linked lists and arrays meet this requirement.

### Linked List Implementation

As shown in the figure below, we can treat the "head node" and "tail node" of a linked list as the "front" and "rear" of the queue, respectively, with the rule that nodes can only be added at the rear and removed from the front.

=== "<1>"
    ![Enqueue and dequeue operations in linked list implementation of queue](queue.assets/linkedlist_queue_step1.png)

=== "<2>"
    ![linkedlist_queue_push](queue.assets/linkedlist_queue_step2_push.png)

=== "<3>"
    ![linkedlist_queue_pop](queue.assets/linkedlist_queue_step3_pop.png)

Below is the code for implementing a queue using a linked list:

\`\`\`src
[file]{linkedlist_queue}-[class]{linked_list_queue}-[func]{}
\`\`\`

### Array Implementation

Deleting the first element in an array has a time complexity of $O(n)$, which would make the dequeue operation inefficient. However, we can use the following clever method to avoid this problem.

We can use a variable \`front\` to point to the index of the front element and maintain a variable \`size\` to record the queue length. We define \`rear = front + size\`, which calculates the position right after the rear element.

Based on this design, **the valid interval containing elements in the array is \`[front, rear - 1]\`**. The implementation methods for various operations are shown in the figure below:

- Enqueue operation: Assign the input element to the \`rear\` index and increase \`size\` by 1.
- Dequeue operation: Simply increase \`front\` by 1 and decrease \`size\` by 1.

As you can see, both enqueue and dequeue operations require only one operation, with a time complexity of $O(1)$.

=== "<1>"
    ![Enqueue and dequeue operations in array implementation of queue](queue.assets/array_queue_step1.png)

=== "<2>"
    ![array_queue_push](queue.assets/array_queue_step2_push.png)

=== "<3>"
    ![array_queue_pop](queue.assets/array_queue_step3_pop.png)

You may notice a problem: as we continuously enqueue and dequeue, both \`front\` and \`rear\` move to the right. **When they reach the end of the array, they cannot continue moving**. To solve this problem, we can treat the array as a "circular array" with head and tail connected.

For a circular array, we need to let \`front\` or \`rear\` wrap around to the beginning of the array when they cross the end. This periodic pattern can be implemented using the "modulo operation," as shown in the code below:

\`\`\`src
[file]{array_queue}-[class]{array_queue}-[func]{}
\`\`\`

The queue implemented above still has limitations: its length is immutable. However, this problem is not difficult to solve. We can replace the array with a dynamic array to introduce an expansion mechanism. Interested readers can try to implement this themselves.

The comparison conclusions for the two implementations are consistent with those for stacks and will not be repeated here.

## Typical Applications of Queue

- **Taobao orders**. After shoppers place orders, the orders are added to a queue, and the system subsequently processes the orders in the queue according to their sequence. During Double Eleven, massive orders are generated in a short time, and high concurrency becomes a key challenge that engineers need to tackle.
- **Various to-do tasks**. Any scenario that needs to implement "first come, first served" functionality, such as a printer's task queue or a restaurant's order queue, can effectively maintain the processing order using queues.

`
  },

  'dsa-deque': {
    title: '5.3 Deque (Hàng đợi hai đầu)',
    summary: 'Tìm hiểu Hàng đợi hai đầu (Deque) — cấu trúc linh hoạt cho phép thêm/xóa ở cả hai đầu, triển khai bằng danh sách liên kết đôi và mảng vòng, cùng mô phỏng tương tác push_first/push_last/pop_first/pop_last.',
    tags: ['dsa', 'deque', 'queue'],
    domain: 'Algorithms',
    module: 'Chương 5: Ngăn xếp & Hàng đợi',
    prerequisites: ['dsa-queue'],
    related: ['dsa-stack-queue-summary'],
    updatedAt: '2026-07-19',
    readTime: '10 phút',
    content: `

<h2>5.3.1 Định nghĩa Deque (Hàng đợi hai đầu)</h2>
<p>Trong một hàng đợi thông thường, ta chỉ có thể lấy phần tử ra ở đầu hoặc thêm phần tử vào ở cuối. Như minh họa trong hình dưới đây, <u>hàng đợi hai đầu (double-ended queue, deque)</u> mang lại sự linh hoạt hơn, cho phép thêm hoặc xóa phần tử ở cả đầu lẫn cuối.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/deque_operations.png" alt="Các thao tác của hàng đợi hai đầu" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>5.3.2 Các thao tác phổ biến trên Deque</h2>
<p>Các thao tác phổ biến trên hàng đợi hai đầu được thể hiện trong bảng dưới đây. Tên phương thức cụ thể còn tùy vào ngôn ngữ lập trình được sử dụng.</p>
<p align="center">Bảng &nbsp; Hiệu năng các thao tác trên Deque</p>
<table>
  <thead>
    <tr><th>Phương thức</th><th>Mô tả</th><th>Độ phức tạp thời gian</th></tr>
  </thead>
  <tbody>
    <tr><td><code>push_first()</code></td><td>Thêm phần tử vào đầu</td><td>$O(1)$</td></tr>
    <tr><td><code>push_last()</code></td><td>Thêm phần tử vào cuối</td><td>$O(1)$</td></tr>
    <tr><td><code>pop_first()</code></td><td>Lấy phần tử ở đầu ra</td><td>$O(1)$</td></tr>
    <tr><td><code>pop_last()</code></td><td>Lấy phần tử ở cuối ra</td><td>$O(1)$</td></tr>
    <tr><td><code>peek_first()</code></td><td>Truy cập phần tử ở đầu</td><td>$O(1)$</td></tr>
    <tr><td><code>peek_last()</code></td><td>Truy cập phần tử ở cuối</td><td>$O(1)$</td></tr>
  </tbody>
</table>
<p>Tương tự, ta có thể trực tiếp dùng các class hàng đợi hai đầu do ngôn ngữ lập trình cung cấp:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Khởi tạo hàng đợi hai đầu */
Deque&lt;Integer&gt; deque = new LinkedList&lt;&gt;();

/* Thêm phần tử vào hàng đợi */
deque.offerLast(2);   // Thêm vào cuối
deque.offerLast(5);
deque.offerLast(4);
deque.offerFirst(3);  // Thêm vào đầu
deque.offerFirst(1);

/* Truy cập phần tử */
int peekFirst = deque.peekFirst();  // Phần tử đầu
int peekLast = deque.peekLast();    // Phần tử cuối

/* Lấy phần tử ra khỏi hàng đợi */
int popFirst = deque.pollFirst();  // Lấy phần tử đầu ra
int popLast = deque.pollLast();    // Lấy phần tử cuối ra

/* Lấy độ dài hàng đợi hai đầu */
int size = deque.size();

/* Kiểm tra hàng đợi hai đầu có rỗng không */
boolean isEmpty = deque.isEmpty();</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>from collections import deque

# Khởi tạo hàng đợi hai đầu
deq: deque[int] = deque()

# Thêm phần tử vào hàng đợi
deq.append(2)      # Thêm vào cuối
deq.append(5)
deq.append(4)
deq.appendleft(3)  # Thêm vào đầu
deq.appendleft(1)

# Truy cập phần tử
front: int = deq[0]  # Phần tử đầu
rear: int = deq[-1]  # Phần tử cuối

# Lấy phần tử ra khỏi hàng đợi
pop_front: int = deq.popleft()  # Lấy phần tử đầu ra
pop_rear: int = deq.pop()       # Lấy phần tử cuối ra

# Lấy độ dài hàng đợi hai đầu
size: int = len(deq)

# Kiểm tra hàng đợi hai đầu có rỗng không
is_empty: bool = len(deq) == 0</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Khởi tạo hàng đợi hai đầu */
deque&lt;int&gt; deque;

/* Thêm phần tử vào hàng đợi */
deque.push_back(2);   // Thêm vào cuối
deque.push_back(5);
deque.push_back(4);
deque.push_front(3);  // Thêm vào đầu
deque.push_front(1);

/* Truy cập phần tử */
int front = deque.front(); // Phần tử đầu
int back = deque.back();   // Phần tử cuối

/* Lấy phần tử ra khỏi hàng đợi */
deque.pop_front();  // Lấy phần tử đầu ra
deque.pop_back();   // Lấy phần tử cuối ra

/* Lấy độ dài hàng đợi hai đầu */
int size = deque.size();

/* Kiểm tra hàng đợi hai đầu có rỗng không */
bool empty = deque.empty();</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Khởi tạo hàng đợi hai đầu */
// JavaScript không có class hàng đợi hai đầu dựng sẵn, chỉ có thể dùng Array
const deque = [];

/* Thêm phần tử vào hàng đợi */
deque.push(2);
deque.push(5);
deque.push(4);
// Lưu ý vì đây là mảng nên unshift() có độ phức tạp thời gian O(n)
deque.unshift(3);
deque.unshift(1);

/* Truy cập phần tử */
const peekFirst = deque[0];
const peekLast = deque[deque.length - 1];

/* Lấy phần tử ra khỏi hàng đợi */
// Lưu ý vì đây là mảng nên shift() có độ phức tạp thời gian O(n)
const popFront = deque.shift();
const popBack = deque.pop();

/* Lấy độ dài hàng đợi hai đầu */
const size = deque.length;

/* Kiểm tra hàng đợi hai đầu có rỗng không */
const isEmpty = size === 0;</code></pre></div></div></div>

<h2>5.3.3 Triển khai Deque *</h2>
<p>Cách triển khai hàng đợi hai đầu tương tự như hàng đợi thông thường. Ta có thể chọn danh sách liên kết hoặc mảng làm cấu trúc dữ liệu nền.</p>

<h3>5.3.3.1 Triển khai bằng Danh sách liên kết đôi</h3>
<p>Ôn lại phần trước, ta đã dùng một danh sách liên kết đơn thông thường để triển khai hàng đợi, vì nó cho phép xóa node đầu (ứng với dequeue) và thêm node mới vào sau node cuối (ứng với enqueue) một cách thuận tiện.</p>
<p>Đối với hàng đợi hai đầu, cả đầu và cuối đều có thể thực hiện thao tác thêm vào và lấy ra. Nói cách khác, hàng đợi hai đầu cần triển khai các thao tác theo cả chiều ngược lại. Vì lý do này, ta dùng "danh sách liên kết đôi" (doubly linked list) làm cấu trúc dữ liệu nền cho hàng đợi hai đầu.</p>
<p>Như minh họa trong hình dưới đây, ta coi node đầu và node cuối của danh sách liên kết đôi lần lượt là đầu và cuối của hàng đợi hai đầu, triển khai chức năng thêm và xóa node ở cả hai đầu.</p>
<div style="display:flex; gap: 1em; flex-wrap: wrap; justify-content: center; margin: 1.5em 0;">
  <div style="flex: 1 1 260px; text-align:center;"><img loading="lazy" src="dsa-assets/linkedlist_deque_step1.png" alt="Bước 1" style="max-width:100%; border-radius: var(--radius-md);" /><p style="font-size: 13px; color: var(--text-secondary);">Trạng thái ban đầu</p></div>
  <div style="flex: 1 1 260px; text-align:center;"><img loading="lazy" src="dsa-assets/linkedlist_deque_step2_push_last.png" alt="Bước 2" style="max-width:100%; border-radius: var(--radius-md);" /><p style="font-size: 13px; color: var(--text-secondary);">push_last()</p></div>
  <div style="flex: 1 1 260px; text-align:center;"><img loading="lazy" src="dsa-assets/linkedlist_deque_step3_push_first.png" alt="Bước 3" style="max-width:100%; border-radius: var(--radius-md);" /><p style="font-size: 13px; color: var(--text-secondary);">push_first()</p></div>
</div>
<div style="display:flex; gap: 1em; flex-wrap: wrap; justify-content: center; margin: 1.5em 0;">
  <div style="flex: 1 1 260px; text-align:center;"><img loading="lazy" src="dsa-assets/linkedlist_deque_step4_pop_last.png" alt="Bước 4" style="max-width:100%; border-radius: var(--radius-md);" /><p style="font-size: 13px; color: var(--text-secondary);">pop_last()</p></div>
  <div style="flex: 1 1 260px; text-align:center;"><img loading="lazy" src="dsa-assets/linkedlist_deque_step5_pop_first.png" alt="Bước 5" style="max-width:100%; border-radius: var(--radius-md);" /><p style="font-size: 13px; color: var(--text-secondary);">pop_first()</p></div>
</div>
<p>Mã triển khai được thể hiện dưới đây:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Node danh sách liên kết đôi */
class ListNode {
    int val; // Giá trị node
    ListNode next; // Tham chiếu tới node kế tiếp
    ListNode prev; // Tham chiếu tới node liền trước

    ListNode(int val) {
        this.val = val;
        prev = next = null;
    }
}

/* Hàng đợi hai đầu triển khai bằng danh sách liên kết đôi */
class LinkedListDeque {
    private ListNode front, rear; // Node đầu front, node cuối rear
    private int queSize = 0; // Độ dài hàng đợi hai đầu

    public LinkedListDeque() {
        front = rear = null;
    }

    /* Lấy độ dài hàng đợi hai đầu */
    public int size() {
        return queSize;
    }

    /* Kiểm tra hàng đợi hai đầu có rỗng không */
    public boolean isEmpty() {
        return size() == 0;
    }

    /* Thao tác thêm vào hàng đợi */
    private void push(int num, boolean isFront) {
        ListNode node = new ListNode(num);
        // Nếu danh sách liên kết rỗng, cho cả front và rear trỏ đến node
        if (isEmpty())
            front = rear = node;
        // Thao tác thêm vào đầu hàng đợi
        else if (isFront) {
            // Thêm node vào đầu danh sách liên kết
            front.prev = node;
            node.next = front;
            front = node; // Cập nhật node đầu
        // Thao tác thêm vào cuối hàng đợi
        } else {
            // Thêm node vào cuối danh sách liên kết
            rear.next = node;
            node.prev = rear;
            rear = node; // Cập nhật node cuối
        }
        queSize++; // Cập nhật độ dài hàng đợi
    }

    /* Thêm vào đầu hàng đợi */
    public void pushFirst(int num) {
        push(num, true);
    }

    /* Thêm vào cuối hàng đợi */
    public void pushLast(int num) {
        push(num, false);
    }

    /* Thao tác lấy ra khỏi hàng đợi */
    private int pop(boolean isFront) {
        if (isEmpty())
            throw new IndexOutOfBoundsException();
        int val;
        // Thao tác lấy ra từ đầu hàng đợi
        if (isFront) {
            val = front.val; // Lưu tạm giá trị node đầu
            // Xóa node đầu
            ListNode fNext = front.next;
            if (fNext != null) {
                fNext.prev = null;
                front.next = null;
            }
            front = fNext; // Cập nhật node đầu
        // Thao tác lấy ra từ cuối hàng đợi
        } else {
            val = rear.val; // Lưu tạm giá trị node cuối
            // Cập nhật node cuối
            ListNode rPrev = rear.prev;
            if (rPrev != null) {
                rPrev.next = null;
                rear.prev = null;
            }
            rear = rPrev; // Cập nhật node cuối
        }
        queSize--; // Cập nhật độ dài hàng đợi
        return val;
    }

    /* Lấy ra từ đầu hàng đợi */
    public int popFirst() {
        return pop(true);
    }

    /* Lấy ra từ cuối hàng đợi */
    public int popLast() {
        return pop(false);
    }

    /* Truy cập phần tử đầu hàng đợi */
    public int peekFirst() {
        if (isEmpty())
            throw new IndexOutOfBoundsException();
        return front.val;
    }

    /* Truy cập phần tử cuối hàng đợi */
    public int peekLast() {
        if (isEmpty())
            throw new IndexOutOfBoundsException();
        return rear.val;
    }

    /* Trả về mảng để in ra */
    public int[] toArray() {
        ListNode node = front;
        int[] res = new int[size()];
        for (int i = 0; i &lt; res.length; i++) {
            res[i] = node.val;
            node = node.next;
        }
        return res;
    }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class ListNode:
    """Node danh sách liên kết đôi"""

    def __init__(self, val: int):
        """Hàm khởi tạo"""
        self.val: int = val
        self.next: ListNode | None = None  # Tham chiếu đến node kế tiếp
        self.prev: ListNode | None = None  # Tham chiếu đến node liền trước


class LinkedListDeque:
    """Hàng đợi hai đầu triển khai bằng danh sách liên kết đôi"""

    def __init__(self):
        """Hàm khởi tạo"""
        self._front: ListNode | None = None  # Node đầu front
        self._rear: ListNode | None = None  # Node cuối rear
        self._size: int = 0  # Độ dài hàng đợi hai đầu

    def size(self) -&gt; int:
        """Lấy độ dài hàng đợi hai đầu"""
        return self._size

    def is_empty(self) -&gt; bool:
        """Kiểm tra hàng đợi hai đầu có rỗng không"""
        return self._size == 0

    def push(self, num: int, is_front: bool):
        """Thao tác thêm vào hàng đợi"""
        node = ListNode(num)
        # Nếu danh sách liên kết rỗng, cho cả front và rear trỏ đến node
        if self.is_empty():
            self._front = self._rear = node
        # Thao tác thêm vào đầu hàng đợi
        elif is_front:
            # Thêm node vào đầu danh sách liên kết
            self._front.prev = node
            node.next = self._front
            self._front = node  # Cập nhật node đầu
        # Thao tác thêm vào cuối hàng đợi
        else:
            # Thêm node vào cuối danh sách liên kết
            self._rear.next = node
            node.prev = self._rear
            self._rear = node  # Cập nhật node cuối
        self._size += 1  # Cập nhật độ dài hàng đợi

    def push_first(self, num: int):
        """Thêm vào đầu hàng đợi"""
        self.push(num, True)

    def push_last(self, num: int):
        """Thêm vào cuối hàng đợi"""
        self.push(num, False)

    def pop(self, is_front: bool) -&gt; int:
        """Thao tác lấy ra khỏi hàng đợi"""
        if self.is_empty():
            raise IndexError("Hàng đợi hai đầu rỗng")
        # Thao tác lấy ra từ đầu hàng đợi
        if is_front:
            val: int = self._front.val  # Lưu tạm giá trị node đầu
            # Xóa node đầu
            fnext: ListNode | None = self._front.next
            if fnext is not None:
                fnext.prev = None
                self._front.next = None
            self._front = fnext  # Cập nhật node đầu
        # Thao tác lấy ra từ cuối hàng đợi
        else:
            val: int = self._rear.val  # Lưu tạm giá trị node cuối
            # Xóa node cuối
            rprev: ListNode | None = self._rear.prev
            if rprev is not None:
                rprev.next = None
                self._rear.prev = None
            self._rear = rprev  # Cập nhật node cuối
        self._size -= 1  # Cập nhật độ dài hàng đợi
        return val

    def pop_first(self) -&gt; int:
        """Lấy ra từ đầu hàng đợi"""
        return self.pop(True)

    def pop_last(self) -&gt; int:
        """Lấy ra từ cuối hàng đợi"""
        return self.pop(False)

    def peek_first(self) -&gt; int:
        """Truy cập phần tử đầu hàng đợi"""
        if self.is_empty():
            raise IndexError("Hàng đợi hai đầu rỗng")
        return self._front.val

    def peek_last(self) -&gt; int:
        """Truy cập phần tử cuối hàng đợi"""
        if self.is_empty():
            raise IndexError("Hàng đợi hai đầu rỗng")
        return self._rear.val

    def to_array(self) -&gt; list[int]:
        """Trả về mảng để in ra"""
        node = self._front
        res = [0] * self.size()
        for i in range(self.size()):
            res[i] = node.val
            node = node.next
        return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Node danh sách liên kết đôi */
struct DoublyListNode {
    int val;              // Giá trị node
    DoublyListNode *next; // Con trỏ tới node kế tiếp
    DoublyListNode *prev; // Con trỏ tới node liền trước
    DoublyListNode(int val) : val(val), prev(nullptr), next(nullptr) {
    }
};

/* Hàng đợi hai đầu triển khai bằng danh sách liên kết đôi */
class LinkedListDeque {
  private:
    DoublyListNode *front, *rear; // Node đầu front, node cuối rear
    int queSize = 0;              // Độ dài hàng đợi hai đầu

  public:
    /* Hàm khởi tạo */
    LinkedListDeque() : front(nullptr), rear(nullptr) {
    }

    /* Hàm hủy */
    ~LinkedListDeque() {
        // Duyệt danh sách liên kết để xóa node, giải phóng bộ nhớ
        DoublyListNode *pre, *cur = front;
        while (cur != nullptr) {
            pre = cur;
            cur = cur-&gt;next;
            delete pre;
        }
    }

    /* Lấy độ dài hàng đợi hai đầu */
    int size() {
        return queSize;
    }

    /* Kiểm tra hàng đợi hai đầu có rỗng không */
    bool isEmpty() {
        return size() == 0;
    }

    /* Thao tác thêm vào hàng đợi */
    void push(int num, bool isFront) {
        DoublyListNode *node = new DoublyListNode(num);
        // Nếu danh sách liên kết rỗng, cho cả front và rear trỏ đến node
        if (isEmpty())
            front = rear = node;
        // Thao tác thêm vào đầu hàng đợi
        else if (isFront) {
            // Thêm node vào đầu danh sách liên kết
            front-&gt;prev = node;
            node-&gt;next = front;
            front = node; // Cập nhật node đầu
        // Thao tác thêm vào cuối hàng đợi
        } else {
            // Thêm node vào cuối danh sách liên kết
            rear-&gt;next = node;
            node-&gt;prev = rear;
            rear = node; // Cập nhật node cuối
        }
        queSize++; // Cập nhật độ dài hàng đợi
    }

    /* Thêm vào đầu hàng đợi */
    void pushFirst(int num) {
        push(num, true);
    }

    /* Thêm vào cuối hàng đợi */
    void pushLast(int num) {
        push(num, false);
    }

    /* Thao tác lấy ra khỏi hàng đợi */
    int pop(bool isFront) {
        if (isEmpty())
            throw out_of_range("Hàng đợi rỗng");
        int val;
        // Thao tác lấy ra từ đầu hàng đợi
        if (isFront) {
            val = front-&gt;val; // Lưu tạm giá trị node đầu
            // Xóa node đầu
            DoublyListNode *fNext = front-&gt;next;
            if (fNext != nullptr) {
                fNext-&gt;prev = nullptr;
                front-&gt;next = nullptr;
            }
            delete front;
            front = fNext; // Cập nhật node đầu
        // Thao tác lấy ra từ cuối hàng đợi
        } else {
            val = rear-&gt;val; // Lưu tạm giá trị node cuối
            // Cập nhật node cuối
            DoublyListNode *rPrev = rear-&gt;prev;
            if (rPrev != nullptr) {
                rPrev-&gt;next = nullptr;
                rear-&gt;prev = nullptr;
            }
            delete rear;
            rear = rPrev; // Cập nhật node cuối
        }
        queSize--; // Cập nhật độ dài hàng đợi
        return val;
    }

    /* Lấy ra từ đầu hàng đợi */
    int popFirst() {
        return pop(true);
    }

    /* Lấy ra từ cuối hàng đợi */
    int popLast() {
        return pop(false);
    }

    /* Truy cập phần tử đầu hàng đợi */
    int peekFirst() {
        if (isEmpty())
            throw out_of_range("Hàng đợi hai đầu rỗng");
        return front-&gt;val;
    }

    /* Truy cập phần tử cuối hàng đợi */
    int peekLast() {
        if (isEmpty())
            throw out_of_range("Hàng đợi hai đầu rỗng");
        return rear-&gt;val;
    }

    /* Trả về mảng để in ra */
    vector&lt;int&gt; toVector() {
        DoublyListNode *node = front;
        vector&lt;int&gt; res(size());
        for (int i = 0; i &lt; res.size(); i++) {
            res[i] = node-&gt;val;
            node = node-&gt;next;
        }
        return res;
    }
};</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Node danh sách liên kết đôi */
class ListNode {
    prev; // Tham chiếu tới node liền trước
    next; // Tham chiếu tới node kế tiếp
    val; // Giá trị node

    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

/* Hàng đợi hai đầu triển khai bằng danh sách liên kết đôi */
class LinkedListDeque {
    #front; // Node đầu front
    #rear; // Node cuối rear
    #queSize; // Độ dài hàng đợi hai đầu

    constructor() {
        this.#front = null;
        this.#rear = null;
        this.#queSize = 0;
    }

    /* Thao tác thêm vào cuối hàng đợi */
    pushLast(val) {
        const node = new ListNode(val);
        // Nếu danh sách liên kết rỗng, cho cả front và rear trỏ đến node
        if (this.#queSize === 0) {
            this.#front = node;
            this.#rear = node;
        } else {
            // Thêm node vào cuối danh sách liên kết
            this.#rear.next = node;
            node.prev = this.#rear;
            this.#rear = node; // Cập nhật node cuối
        }
        this.#queSize++;
    }

    /* Thao tác thêm vào đầu hàng đợi */
    pushFirst(val) {
        const node = new ListNode(val);
        // Nếu danh sách liên kết rỗng, cho cả front và rear trỏ đến node
        if (this.#queSize === 0) {
            this.#front = node;
            this.#rear = node;
        } else {
            // Thêm node vào đầu danh sách liên kết
            this.#front.prev = node;
            node.next = this.#front;
            this.#front = node; // Cập nhật node đầu
        }
        this.#queSize++;
    }

    /* Lưu tạm giá trị node cuối rồi lấy ra */
    popLast() {
        if (this.#queSize === 0) {
            return null;
        }
        const value = this.#rear.val; // Lưu giá trị node cuối
        // Cập nhật node cuối
        let temp = this.#rear.prev;
        if (temp !== null) {
            temp.next = null;
            this.#rear.prev = null;
        }
        this.#rear = temp; // Cập nhật node cuối
        this.#queSize--;
        return value;
    }

    /* Lưu tạm giá trị node đầu rồi lấy ra */
    popFirst() {
        if (this.#queSize === 0) {
            return null;
        }
        const value = this.#front.val; // Lưu giá trị node đầu
        // Xóa node đầu
        let temp = this.#front.next;
        if (temp !== null) {
            temp.prev = null;
            this.#front.next = null;
        }
        this.#front = temp; // Cập nhật node đầu
        this.#queSize--;
        return value;
    }

    /* Truy cập phần tử cuối hàng đợi */
    peekLast() {
        return this.#queSize === 0 ? null : this.#rear.val;
    }

    /* Truy cập phần tử đầu hàng đợi */
    peekFirst() {
        return this.#queSize === 0 ? null : this.#front.val;
    }

    /* Lấy độ dài hàng đợi hai đầu */
    size() {
        return this.#queSize;
    }

    /* Kiểm tra hàng đợi hai đầu có rỗng không */
    isEmpty() {
        return this.#queSize === 0;
    }
}</code></pre></div></div></div>

<h3>5.3.3.2 Triển khai bằng Mảng</h3>
<p>Như minh họa trong hình dưới đây, tương tự việc triển khai hàng đợi dựa trên mảng, ta cũng có thể dùng mảng vòng (circular array) để triển khai hàng đợi hai đầu.</p>
<div style="display:flex; gap: 1em; flex-wrap: wrap; justify-content: center; margin: 1.5em 0;">
  <div style="flex: 1 1 260px; text-align:center;"><img loading="lazy" src="dsa-assets/array_deque_step1.png" alt="Bước 1" style="max-width:100%; border-radius: var(--radius-md);" /><p style="font-size: 13px; color: var(--text-secondary);">Trạng thái ban đầu</p></div>
  <div style="flex: 1 1 260px; text-align:center;"><img loading="lazy" src="dsa-assets/array_deque_step2_push_last.png" alt="Bước 2" style="max-width:100%; border-radius: var(--radius-md);" /><p style="font-size: 13px; color: var(--text-secondary);">push_last()</p></div>
  <div style="flex: 1 1 260px; text-align:center;"><img loading="lazy" src="dsa-assets/array_deque_step3_push_first.png" alt="Bước 3" style="max-width:100%; border-radius: var(--radius-md);" /><p style="font-size: 13px; color: var(--text-secondary);">push_first()</p></div>
</div>
<div style="display:flex; gap: 1em; flex-wrap: wrap; justify-content: center; margin: 1.5em 0;">
  <div style="flex: 1 1 260px; text-align:center;"><img loading="lazy" src="dsa-assets/array_deque_step4_pop_last.png" alt="Bước 4" style="max-width:100%; border-radius: var(--radius-md);" /><p style="font-size: 13px; color: var(--text-secondary);">pop_last()</p></div>
  <div style="flex: 1 1 260px; text-align:center;"><img loading="lazy" src="dsa-assets/array_deque_step5_pop_first.png" alt="Bước 5" style="max-width:100%; border-radius: var(--radius-md);" /><p style="font-size: 13px; color: var(--text-secondary);">pop_first()</p></div>
</div>
<p>Dựa trên cách triển khai hàng đợi, ta chỉ cần thêm các phương thức "thêm vào đầu" và "lấy ra từ cuối":</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Hàng đợi hai đầu triển khai bằng mảng vòng (circular array) */
class ArrayDeque {
    private int[] nums; // Mảng dùng để lưu phần tử hàng đợi hai đầu
    private int front; // Con trỏ đầu, trỏ đến phần tử ở đầu hàng đợi
    private int queSize; // Độ dài hàng đợi hai đầu

    /* Hàm khởi tạo */
    public ArrayDeque(int capacity) {
        this.nums = new int[capacity];
        front = queSize = 0;
    }

    /* Lấy dung lượng hàng đợi hai đầu */
    public int capacity() {
        return nums.length;
    }

    /* Lấy độ dài hàng đợi hai đầu */
    public int size() {
        return queSize;
    }

    /* Kiểm tra hàng đợi hai đầu có rỗng không */
    public boolean isEmpty() {
        return queSize == 0;
    }

    /* Tính chỉ mục trong mảng vòng */
    private int index(int i) {
        // Dùng phép chia lấy dư để nối liền đầu và cuối mảng
        // Khi i vượt qua cuối mảng, quay lại đầu mảng
        // Khi i vượt qua đầu mảng, quay lại cuối mảng
        return (i + capacity()) % capacity();
    }

    /* Thêm vào đầu hàng đợi */
    public void pushFirst(int num) {
        if (queSize == capacity()) {
            System.out.println("Hàng đợi hai đầu đã đầy");
            return;
        }
        // Dùng phép chia lấy dư để front quay về cuối mảng sau khi vượt qua đầu mảng
        // Thêm num vào đầu hàng đợi
        front = index(front - 1);
        // Thêm num vào đầu hàng đợi
        nums[front] = num;
        queSize++;
    }

    /* Thêm vào cuối hàng đợi */
    public void pushLast(int num) {
        if (queSize == capacity()) {
            System.out.println("Hàng đợi hai đầu đã đầy");
            return;
        }
        // Dùng phép chia lấy dư để rear quay về đầu mảng sau khi vượt qua cuối mảng
        int rear = index(front + queSize);
        // Con trỏ đầu dịch về sau một vị trí
        nums[rear] = num;
        queSize++;
    }

    /* Lấy ra từ đầu hàng đợi */
    public int popFirst() {
        int num = peekFirst();
        // Con trỏ đầu dịch về sau một vị trí
        front = index(front + 1);
        queSize--;
        return num;
    }

    /* Lấy ra từ cuối hàng đợi */
    public int popLast() {
        int num = peekLast();
        queSize--;
        return num;
    }

    /* Truy cập phần tử đầu hàng đợi */
    public int peekFirst() {
        if (isEmpty())
            throw new IndexOutOfBoundsException();
        return nums[front];
    }

    /* Truy cập phần tử cuối hàng đợi */
    public int peekLast() {
        if (isEmpty())
            throw new IndexOutOfBoundsException();
        // Tính chỉ mục phần tử cuối
        int last = index(front + queSize - 1);
        return nums[last];
    }

    /* Trả về mảng để in ra */
    public int[] toArray() {
        int[] res = new int[queSize];
        for (int i = 0, j = front; i &lt; queSize; i++, j++) {
            res[i] = nums[index(j)];
        }
        return res;
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>ArrayDeque(int capacity) {
    this._nums = List.filled(capacity, 0);
    this._front = this._queSize = 0;
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class ArrayDeque:
    """Hàng đợi hai đầu triển khai bằng mảng vòng (circular array)"""

    def __init__(self, capacity: int):
        """Hàm khởi tạo"""
        self._nums: list[int] = [0] * capacity
        self._front: int = 0
        self._size: int = 0

    def capacity(self) -&gt; int:
        """Lấy dung lượng hàng đợi hai đầu"""
        return len(self._nums)

    def size(self) -&gt; int:
        """Lấy độ dài hàng đợi hai đầu"""
        return self._size

    def is_empty(self) -&gt; bool:
        """Kiểm tra hàng đợi hai đầu có rỗng không"""
        return self._size == 0

    def index(self, i: int) -&gt; int:
        """Tính chỉ mục trong mảng vòng"""
        # Dùng phép chia lấy dư để nối liền đầu và cuối mảng
        # Khi i vượt qua cuối mảng, quay lại đầu mảng
        # Khi i vượt qua đầu mảng, quay lại cuối mảng
        return (i + self.capacity()) % self.capacity()

    def push_first(self, num: int):
        """Thêm vào đầu hàng đợi"""
        if self._size == self.capacity():
            print("Hàng đợi hai đầu đã đầy")
            return
        # Con trỏ đầu dịch sang trái một vị trí
        # Dùng phép chia lấy dư để front quay về cuối mảng sau khi vượt qua đầu mảng
        self._front = self.index(self._front - 1)
        # Thêm num vào đầu hàng đợi
        self._nums[self._front] = num
        self._size += 1

    def push_last(self, num: int):
        """Thêm vào cuối hàng đợi"""
        if self._size == self.capacity():
            print("Hàng đợi hai đầu đã đầy")
            return
        # Tính con trỏ rear, trỏ đến chỉ mục cuối + 1
        rear = self.index(self._front + self._size)
        # Thêm num vào cuối hàng đợi
        self._nums[rear] = num
        self._size += 1

    def pop_first(self) -&gt; int:
        """Lấy ra từ đầu hàng đợi"""
        num = self.peek_first()
        # Con trỏ đầu dịch về sau một vị trí
        self._front = self.index(self._front + 1)
        self._size -= 1
        return num

    def pop_last(self) -&gt; int:
        """Lấy ra từ cuối hàng đợi"""
        num = self.peek_last()
        self._size -= 1
        return num

    def peek_first(self) -&gt; int:
        """Truy cập phần tử đầu hàng đợi"""
        if self.is_empty():
            raise IndexError("Hàng đợi hai đầu rỗng")
        return self._nums[self._front]

    def peek_last(self) -&gt; int:
        """Truy cập phần tử cuối hàng đợi"""
        if self.is_empty():
            raise IndexError("Hàng đợi hai đầu rỗng")
        # Tính chỉ mục phần tử cuối
        last = self.index(self._front + self._size - 1)
        return self._nums[last]

    def to_array(self) -&gt; list[int]:
        """Trả về mảng để in ra"""
        # Chỉ chuyển đổi các phần tử trong phạm vi độ dài hợp lệ
        res = []
        for i in range(self._size):
            res.append(self._nums[self.index(self._front + i)])
        return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Hàng đợi hai đầu triển khai bằng mảng vòng (circular array) */
class ArrayDeque {
  private:
    vector&lt;int&gt; nums; // Mảng dùng để lưu phần tử hàng đợi hai đầu
    int front;        // Con trỏ đầu, trỏ đến phần tử ở đầu hàng đợi
    int queSize;      // Độ dài hàng đợi hai đầu

  public:
    /* Hàm khởi tạo */
    ArrayDeque(int capacity) {
        nums.resize(capacity);
        front = queSize = 0;
    }

    /* Lấy dung lượng hàng đợi hai đầu */
    int capacity() {
        return nums.size();
    }

    /* Lấy độ dài hàng đợi hai đầu */
    int size() {
        return queSize;
    }

    /* Kiểm tra hàng đợi hai đầu có rỗng không */
    bool isEmpty() {
        return queSize == 0;
    }

    /* Tính chỉ mục trong mảng vòng */
    int index(int i) {
        // Dùng phép chia lấy dư để nối liền đầu và cuối mảng
        // Khi i vượt qua cuối mảng, quay lại đầu mảng
        // Khi i vượt qua đầu mảng, quay lại cuối mảng
        return (i + capacity()) % capacity();
    }

    /* Thêm vào đầu hàng đợi */
    void pushFirst(int num) {
        if (queSize == capacity()) {
            cout &lt;&lt; "Hàng đợi hai đầu đã đầy" &lt;&lt; endl;
            return;
        }
        // Dùng phép chia lấy dư để front quay về cuối mảng sau khi vượt qua đầu mảng
        // Thêm num vào đầu hàng đợi
        front = index(front - 1);
        // Thêm num vào đầu hàng đợi
        nums[front] = num;
        queSize++;
    }

    /* Thêm vào cuối hàng đợi */
    void pushLast(int num) {
        if (queSize == capacity()) {
            cout &lt;&lt; "Hàng đợi hai đầu đã đầy" &lt;&lt; endl;
            return;
        }
        // Dùng phép chia lấy dư để rear quay về đầu mảng sau khi vượt qua cuối mảng
        int rear = index(front + queSize);
        // Con trỏ đầu dịch về sau một vị trí
        nums[rear] = num;
        queSize++;
    }

    /* Lấy ra từ đầu hàng đợi */
    int popFirst() {
        int num = peekFirst();
        // Con trỏ đầu dịch về sau một vị trí
        front = index(front + 1);
        queSize--;
        return num;
    }

    /* Lấy ra từ cuối hàng đợi */
    int popLast() {
        int num = peekLast();
        queSize--;
        return num;
    }

    /* Truy cập phần tử đầu hàng đợi */
    int peekFirst() {
        if (isEmpty())
            throw out_of_range("Hàng đợi hai đầu rỗng");
        return nums[front];
    }

    /* Truy cập phần tử cuối hàng đợi */
    int peekLast() {
        if (isEmpty())
            throw out_of_range("Hàng đợi hai đầu rỗng");
        // Tính chỉ mục phần tử cuối
        int last = index(front + queSize - 1);
        return nums[last];
    }

    /* Trả về mảng để in ra */
    vector&lt;int&gt; toVector() {
        vector&lt;int&gt; res(queSize);
        for (int i = 0, j = front; i &lt; queSize; i++, j++) {
            res[i] = nums[index(j)];
        }
        return res;
    }
};</code></pre></div></div></div>

<h3>5.3.3.3 Mô phỏng tương tác</h3>
<div class="interactive-widget-wrapper" id="deque-ops-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'deque-ops-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'deque-ops-wrapper', 'tab-interactive'); initDequeOpsDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <div style="display:flex; gap: 1em; flex-wrap: wrap; justify-content: center;">
      <div style="flex: 1 1 260px; text-align:center;">
        <img loading="lazy" src="dsa-assets/array_deque_step3_push_first.png" alt="Thao tác push_first trên hàng đợi hai đầu" style="max-width:100%; border-radius: var(--radius-md);" />
        <p style="font-size: 13px; color: var(--text-secondary);">Thêm phần tử vào đầu (push_first)</p>
      </div>
      <div style="flex: 1 1 260px; text-align:center;">
        <img loading="lazy" src="dsa-assets/array_deque_step4_pop_last.png" alt="Thao tác pop_last trên hàng đợi hai đầu" style="max-width:100%; border-radius: var(--radius-md);" />
        <p style="font-size: 13px; color: var(--text-secondary);">Lấy phần tử ra khỏi cuối (pop_last)</p>
      </div>
    </div>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="deque-ops-canvas" style="display:flex; gap:6px; flex-wrap:wrap; justify-content:center; min-height: 70px; align-items:flex-end; padding: 10px;"></div>
    <div class="simulator-controls" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 15px;">
      <button class="control-btn" id="deque-ops-btn-autorun" onclick="autoRunDequeOps()">▶ Auto Run</button>
      <button class="control-btn" id="deque-ops-btn-step" onclick="stepDequeOps()">Bước tiếp theo ▶</button>
      <button class="control-btn" id="deque-ops-btn-pause" onclick="pauseRunDequeOps()" disabled>⏸ Dừng</button>
      <button class="control-btn btn-secondary" id="deque-ops-btn-reset" onclick="initDequeOpsDemo()">↺ Reset</button>
    </div>
    <div id="deque-ops-speed-control" style="text-align:center; font-size: 13px; color: var(--text-secondary); margin-top: 12px;">
      Tốc độ: <input type="range" min="200" max="2000" value="900" step="200" oninput="setDequeOpsSpeed(this.value)" /> <span id="deque-ops-speed-label">900ms</span>
    </div>
    <div id="deque-ops-status" class="simulator-status" style="margin-top: 12px; font-size: 14px; text-align: center; color: var(--text-secondary);">
      Nhấp "Auto Run" hoặc "Bước tiếp theo" để xem mô phỏng push_first/push_last/pop_first/pop_last.
    </div>
  </div>
</div>

<h2>5.3.4 Ứng dụng của Deque</h2>
<p>Hàng đợi hai đầu kết hợp logic của cả ngăn xếp và hàng đợi. <strong>Do đó, nó có thể triển khai mọi kịch bản ứng dụng của cả hai, đồng thời mang lại sự linh hoạt cao hơn</strong>.</p>
<p>Ta biết rằng chức năng "hoàn tác" (undo) trong phần mềm thường được triển khai bằng ngăn xếp: hệ thống đẩy mỗi thao tác thay đổi vào ngăn xếp, sau đó triển khai hoàn tác thông qua lệnh lấy ra (pop). Tuy nhiên, xét đến giới hạn tài nguyên hệ thống, phần mềm thường giới hạn số bước hoàn tác (ví dụ chỉ cho phép lưu 50 bước). Khi độ dài ngăn xếp vượt quá 50, phần mềm cần thực hiện thao tác xóa ở đáy ngăn xếp (đầu hàng đợi). <strong>Nhưng ngăn xếp không thể triển khai chức năng này, nên cần một hàng đợi hai đầu để thay thế ngăn xếp</strong>. Lưu ý rằng logic cốt lõi của "hoàn tác" vẫn tuân theo nguyên tắc LIFO của ngăn xếp; chỉ là hàng đợi hai đầu có thể triển khai một số logic bổ sung linh hoạt hơn.</p>

`,
    originalContent: `
# Deque

In a queue, we can only remove elements from the front or add elements at the rear. As shown in the figure below, a <u>double-ended queue (deque)</u> provides greater flexibility, allowing elements to be added or removed at both the front and the rear.

![Operations of deque](deque.assets/deque_operations.png)

## Common Deque Operations

The common operations on a deque are shown in the table below. The specific method names depend on the programming language used.

<p align="center"> Table <id> &nbsp; Efficiency of Deque Operations </p>

| Method         | Description               | Time Complexity |
| -------------- | ------------------------- | --------------- |
| \`push_first()\` | Add element to front      | $O(1)$          |
| \`push_last()\`  | Add element to rear       | $O(1)$          |
| \`pop_first()\`  | Remove front element      | $O(1)$          |
| \`pop_last()\`   | Remove rear element       | $O(1)$          |
| \`peek_first()\` | Access front element      | $O(1)$          |
| \`peek_last()\`  | Access rear element       | $O(1)$          |

Similarly, we can directly use the deque classes provided by the programming language:

=== "Python"

    \`\`\`python title="deque.py"
    from collections import deque

    # Initialize deque
    deq: deque[int] = deque()

    # Enqueue elements
    deq.append(2)      # Add to rear
    deq.append(5)
    deq.append(4)
    deq.appendleft(3)  # Add to front
    deq.appendleft(1)

    # Access elements
    front: int = deq[0]  # Front element
    rear: int = deq[-1]  # Rear element

    # Dequeue elements
    pop_front: int = deq.popleft()  # Front element dequeue
    pop_rear: int = deq.pop()       # Rear element dequeue

    # Get deque length
    size: int = len(deq)

    # Check if deque is empty
    is_empty: bool = len(deq) == 0
    \`\`\`

=== "C++"

    \`\`\`cpp title="deque.cpp"
    /* Initialize deque */
    deque<int> deque;

    /* Enqueue elements */
    deque.push_back(2);   // Add to rear
    deque.push_back(5);
    deque.push_back(4);
    deque.push_front(3);  // Add to front
    deque.push_front(1);

    /* Access elements */
    int front = deque.front(); // Front element
    int back = deque.back();   // Rear element

    /* Dequeue elements */
    deque.pop_front();  // Front element dequeue
    deque.pop_back();   // Rear element dequeue

    /* Get deque length */
    int size = deque.size();

    /* Check if deque is empty */
    bool empty = deque.empty();
    \`\`\`

=== "Java"

    \`\`\`java title="deque.java"
    /* Initialize deque */
    Deque<Integer> deque = new LinkedList<>();

    /* Enqueue elements */
    deque.offerLast(2);   // Add to rear
    deque.offerLast(5);
    deque.offerLast(4);
    deque.offerFirst(3);  // Add to front
    deque.offerFirst(1);

    /* Access elements */
    int peekFirst = deque.peekFirst();  // Front element
    int peekLast = deque.peekLast();    // Rear element

    /* Dequeue elements */
    int popFirst = deque.pollFirst();  // Front element dequeue
    int popLast = deque.pollLast();    // Rear element dequeue

    /* Get deque length */
    int size = deque.size();

    /* Check if deque is empty */
    boolean isEmpty = deque.isEmpty();
    \`\`\`

=== "C#"

    \`\`\`csharp title="deque.cs"
    /* Initialize deque */
    // In C#, use LinkedList as a deque
    LinkedList<int> deque = new();

    /* Enqueue elements */
    deque.AddLast(2);   // Add to rear
    deque.AddLast(5);
    deque.AddLast(4);
    deque.AddFirst(3);  // Add to front
    deque.AddFirst(1);

    /* Access elements */
    int peekFirst = deque.First.Value;  // Front element
    int peekLast = deque.Last.Value;    // Rear element

    /* Dequeue elements */
    deque.RemoveFirst();  // Front element dequeue
    deque.RemoveLast();   // Rear element dequeue

    /* Get deque length */
    int size = deque.Count;

    /* Check if deque is empty */
    bool isEmpty = deque.Count == 0;
    \`\`\`

=== "Go"

    \`\`\`go title="deque_test.go"
    /* Initialize deque */
    // In Go, use list as a deque
    deque := list.New()

    /* Enqueue elements */
    deque.PushBack(2)      // Add to rear
    deque.PushBack(5)
    deque.PushBack(4)
    deque.PushFront(3)     // Add to front
    deque.PushFront(1)

    /* Access elements */
    front := deque.Front() // Front element
    rear := deque.Back()   // Rear element

    /* Dequeue elements */
    deque.Remove(front)    // Front element dequeue
    deque.Remove(rear)     // Rear element dequeue

    /* Get deque length */
    size := deque.Len()

    /* Check if deque is empty */
    isEmpty := deque.Len() == 0
    \`\`\`

=== "Swift"

    \`\`\`swift title="deque.swift"
    /* Initialize deque */
    // Swift does not have a built-in deque class, can use Array as a deque
    var deque: [Int] = []

    /* Enqueue elements */
    deque.append(2) // Add to rear
    deque.append(5)
    deque.append(4)
    deque.insert(3, at: 0) // Add to front
    deque.insert(1, at: 0)

    /* Access elements */
    let peekFirst = deque.first! // Front element
    let peekLast = deque.last! // Rear element

    /* Dequeue elements */
    // When using Array simulation, popFirst has O(n) complexity
    let popFirst = deque.removeFirst() // Front element dequeue
    let popLast = deque.removeLast() // Rear element dequeue

    /* Get deque length */
    let size = deque.count

    /* Check if deque is empty */
    let isEmpty = deque.isEmpty
    \`\`\`

=== "JS"

    \`\`\`javascript title="deque.js"
    /* Initialize deque */
    // JavaScript does not have a built-in deque, can only use Array as a deque
    const deque = [];

    /* Enqueue elements */
    deque.push(2);
    deque.push(5);
    deque.push(4);
    // Please note that since it's an array, unshift() has O(n) time complexity
    deque.unshift(3);
    deque.unshift(1);

    /* Access elements */
    const peekFirst = deque[0];
    const peekLast = deque[deque.length - 1];

    /* Dequeue elements */
    // Please note that since it's an array, shift() has O(n) time complexity
    const popFront = deque.shift();
    const popBack = deque.pop();

    /* Get deque length */
    const size = deque.length;

    /* Check if deque is empty */
    const isEmpty = size === 0;
    \`\`\`

=== "TS"

    \`\`\`typescript title="deque.ts"
    /* Initialize deque */
    // TypeScript does not have a built-in deque, can only use Array as a deque
    const deque: number[] = [];

    /* Enqueue elements */
    deque.push(2);
    deque.push(5);
    deque.push(4);
    // Please note that since it's an array, unshift() has O(n) time complexity
    deque.unshift(3);
    deque.unshift(1);

    /* Access elements */
    const peekFirst: number = deque[0];
    const peekLast: number = deque[deque.length - 1];

    /* Dequeue elements */
    // Please note that since it's an array, shift() has O(n) time complexity
    const popFront: number = deque.shift() as number;
    const popBack: number = deque.pop() as number;

    /* Get deque length */
    const size: number = deque.length;

    /* Check if deque is empty */
    const isEmpty: boolean = size === 0;
    \`\`\`

=== "Dart"

    \`\`\`dart title="deque.dart"
    /* Initialize deque */
    // In Dart, Queue is defined as a deque
    Queue<int> deque = Queue<int>();

    /* Enqueue elements */
    deque.addLast(2);  // Add to rear
    deque.addLast(5);
    deque.addLast(4);
    deque.addFirst(3); // Add to front
    deque.addFirst(1);

    /* Access elements */
    int peekFirst = deque.first; // Front element
    int peekLast = deque.last;   // Rear element

    /* Dequeue elements */
    int popFirst = deque.removeFirst(); // Front element dequeue
    int popLast = deque.removeLast();   // Rear element dequeue

    /* Get deque length */
    int size = deque.length;

    /* Check if deque is empty */
    bool isEmpty = deque.isEmpty;
    \`\`\`

=== "Rust"

    \`\`\`rust title="deque.rs"
    /* Initialize deque */
    let mut deque: VecDeque<u32> = VecDeque::new();

    /* Enqueue elements */
    deque.push_back(2);  // Add to rear
    deque.push_back(5);
    deque.push_back(4);
    deque.push_front(3); // Add to front
    deque.push_front(1);

    /* Access elements */
    if let Some(front) = deque.front() { // Front element
    }
    if let Some(rear) = deque.back() {   // Rear element
    }

    /* Dequeue elements */
    if let Some(pop_front) = deque.pop_front() { // Front element dequeue
    }
    if let Some(pop_rear) = deque.pop_back() {   // Rear element dequeue
    }

    /* Get deque length */
    let size = deque.len();

    /* Check if deque is empty */
    let is_empty = deque.is_empty();
    \`\`\`

=== "C"

    \`\`\`c title="deque.c"
    // C does not provide a built-in deque
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="deque.kt"
    /* Initialize deque */
    val deque = LinkedList<Int>()

    /* Enqueue elements */
    deque.offerLast(2)  // Add to rear
    deque.offerLast(5)
    deque.offerLast(4)
    deque.offerFirst(3) // Add to front
    deque.offerFirst(1)

    /* Access elements */
    val peekFirst = deque.peekFirst() // Front element
    val peekLast = deque.peekLast()   // Rear element

    /* Dequeue elements */
    val popFirst = deque.pollFirst() // Front element dequeue
    val popLast = deque.pollLast()   // Rear element dequeue

    /* Get deque length */
    val size = deque.size

    /* Check if deque is empty */
    val isEmpty = deque.isEmpty()
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="deque.rb"
    # Initialize deque
    # Ruby does not have a built-in deque, can only use Array as a deque
    deque = []

    # Enqueue elements
    deque << 2
    deque << 5
    deque << 4
    # Please note that since it's an array, Array#unshift has O(n) time complexity
    deque.unshift(3)
    deque.unshift(1)

    # Access elements
    peek_first = deque.first
    peek_last = deque.last

    # Dequeue elements
    # Please note that since it's an array, Array#shift has O(n) time complexity
    pop_front = deque.shift
    pop_back = deque.pop

    # Get deque length
    size = deque.length

    # Check if deque is empty
    is_empty = size.zero?
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=from%20collections%20import%20deque%0A%0A%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E5%8F%8C%E5%90%91%E9%98%9F%E5%88%97%0A%20%20%20%20deq%20%3D%20deque%28%29%0A%0A%20%20%20%20%23%20%E5%85%83%E7%B4%A0%E5%85%A5%E9%98%9F%0A%20%20%20%20deq.append%282%29%20%20%23%20%E6%B7%BB%E5%8A%A0%E8%87%B3%E9%98%9F%E5%B0%BE%0A%20%20%20%20deq.append%285%29%0A%20%20%20%20deq.append%284%29%0A%20%20%20%20deq.appendleft%283%29%20%20%23%20%E6%B7%BB%E5%8A%A0%E8%87%B3%E9%98%9F%E9%A6%96%0A%20%20%20%20deq.appendleft%281%29%0A%20%20%20%20print%28%22%E5%8F%8C%E5%90%91%E9%98%9F%E5%88%97%20deque%20%3D%22,%20deq%29%0A%0A%20%20%20%20%23%20%E8%AE%BF%E9%97%AE%E5%85%83%E7%B4%A0%0A%20%20%20%20front%20%3D%20deq%5B0%5D%20%20%23%20%E9%98%9F%E9%A6%96%E5%85%83%E7%B4%A0%0A%20%20%20%20print%28%22%E9%98%9F%E9%A6%96%E5%85%83%E7%B4%A0%20front%20%3D%22,%20front%29%0A%20%20%20%20rear%20%3D%20deq%5B-1%5D%20%20%23%20%E9%98%9F%E5%B0%BE%E5%85%83%E7%B4%A0%0A%20%20%20%20print%28%22%E9%98%9F%E5%B0%BE%E5%85%83%E7%B4%A0%20rear%20%3D%22,%20rear%29%0A%0A%20%20%20%20%23%20%E5%85%83%E7%B4%A0%E5%87%BA%E9%98%9F%0A%20%20%20%20pop_front%20%3D%20deq.popleft%28%29%20%20%23%20%E9%98%9F%E9%A6%96%E5%85%83%E7%B4%A0%E5%87%BA%E9%98%9F%0A%20%20%20%20print%28%22%E9%98%9F%E9%A6%96%E5%87%BA%E9%98%9F%E5%85%83%E7%B4%A0%20%20pop_front%20%3D%22,%20pop_front%29%0A%20%20%20%20print%28%22%E9%98%9F%E9%A6%96%E5%87%BA%E9%98%9F%E5%90%8E%20deque%20%3D%22,%20deq%29%0A%20%20%20%20pop_rear%20%3D%20deq.pop%28%29%20%20%23%20%E9%98%9F%E5%B0%BE%E5%85%83%E7%B4%A0%E5%87%BA%E9%98%9F%0A%20%20%20%20print%28%22%E9%98%9F%E5%B0%BE%E5%87%BA%E9%98%9F%E5%85%83%E7%B4%A0%20%20pop_rear%20%3D%22,%20pop_rear%29%0A%20%20%20%20print%28%22%E9%98%9F%E5%B0%BE%E5%87%BA%E9%98%9F%E5%90%8E%20deque%20%3D%22,%20deq%29%0A%0A%20%20%20%20%23%20%E8%8E%B7%E5%8F%96%E5%8F%8C%E5%90%91%E9%98%9F%E5%88%97%E7%9A%84%E9%95%BF%E5%BA%A6%0A%20%20%20%20size%20%3D%20len%28deq%29%0A%20%20%20%20print%28%22%E5%8F%8C%E5%90%91%E9%98%9F%E5%88%97%E9%95%BF%E5%BA%A6%20size%20%3D%22,%20size%29%0A%0A%20%20%20%20%23%20%E5%88%A4%E6%96%AD%E5%8F%8C%E5%90%91%E9%98%9F%E5%88%97%E6%98%AF%E5%90%A6%E4%B8%BA%E7%A9%BA%0A%20%20%20%20is_empty%20%3D%20len%28deq%29%20%3D%3D%200%0A%20%20%20%20print%28%22%E5%8F%8C%E5%90%91%E9%98%9F%E5%88%97%E6%98%AF%E5%90%A6%E4%B8%BA%E7%A9%BA%20%3D%22,%20is_empty%29&cumulative=false&curInstr=3&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

## Deque Implementation *

The implementation of a deque is similar to that of a queue. You can choose either a linked list or an array as the underlying data structure.

### Doubly Linked List Implementation

Reviewing the previous section, we used a regular singly linked list to implement a queue because it conveniently allows deleting the head node (corresponding to dequeue) and adding new nodes after the tail node (corresponding to enqueue).

For a deque, both the front and rear can perform enqueue and dequeue operations. In other words, a deque needs to implement operations in the opposite direction as well. For this reason, we use a "doubly linked list" as the underlying data structure for the deque.

As shown in the figure below, we treat the head and tail nodes of the doubly linked list as the front and rear of the deque, implementing functionality to add and remove nodes at both ends.

=== "<1>"
    ![Enqueue and dequeue operations in linked list implementation of deque](deque.assets/linkedlist_deque_step1.png)

=== "<2>"
    ![linkedlist_deque_push_last](deque.assets/linkedlist_deque_step2_push_last.png)

=== "<3>"
    ![linkedlist_deque_push_first](deque.assets/linkedlist_deque_step3_push_first.png)

=== "<4>"
    ![linkedlist_deque_pop_last](deque.assets/linkedlist_deque_step4_pop_last.png)

=== "<5>"
    ![linkedlist_deque_pop_first](deque.assets/linkedlist_deque_step5_pop_first.png)

The implementation code is shown below:

\`\`\`src
[file]{linkedlist_deque}-[class]{linked_list_deque}-[func]{}
\`\`\`

### Array Implementation

As shown in the figure below, similar to implementing a queue based on an array, we can also use a circular array to implement a deque.

=== "<1>"
    ![Enqueue and dequeue operations in array implementation of deque](deque.assets/array_deque_step1.png)

=== "<2>"
    ![array_deque_push_last](deque.assets/array_deque_step2_push_last.png)

=== "<3>"
    ![array_deque_push_first](deque.assets/array_deque_step3_push_first.png)

=== "<4>"
    ![array_deque_pop_last](deque.assets/array_deque_step4_pop_last.png)

=== "<5>"
    ![array_deque_pop_first](deque.assets/array_deque_step5_pop_first.png)

Based on the queue implementation, we only need to add methods for "enqueue at front" and "dequeue from rear":

\`\`\`src
[file]{array_deque}-[class]{array_deque}-[func]{}
\`\`\`

## Deque Applications

A deque combines the logic of both stacks and queues. **Therefore, it can implement all application scenarios of both, while providing greater flexibility**.

We know that the "undo" function in software is typically implemented using a stack: the system pushes each change operation onto the stack and then implements undo through pop. However, considering system resource limitations, software usually limits the number of undo steps (for example, only allowing 50 steps to be saved). When the stack length exceeds 50, the software needs to perform a deletion operation at the bottom of the stack (front of the queue). **But a stack cannot implement this functionality, so a deque is needed to replace the stack**. Note that the core logic of "undo" still follows the LIFO principle of a stack; it's just that the deque can more flexibly implement some additional logic.

`
  },

  'dsa-stack-queue-summary': {
    title: '5.4 Tóm tắt',
    summary: 'Tổng kết kiến thức chương Ngăn xếp & Hàng đợi và giải đáp các câu hỏi thường gặp về undo/redo, quản lý bộ nhớ khi lấy phần tử ra khỏi ngăn xếp, và vai trò của hàng đợi hai đầu.',
    tags: ['dsa', 'stack', 'queue', 'deque', 'summary'],
    domain: 'Algorithms',
    module: 'Chương 5: Ngăn xếp & Hàng đợi',
    prerequisites: ['dsa-deque'],
    related: ['dsa-stack', 'dsa-queue', 'dsa-deque'],
    updatedAt: '2026-07-19',
    readTime: '5 phút',
    content: `

<h2>Điểm lại kiến thức chính</h2>
<ul>
  <li>Ngăn xếp là một cấu trúc dữ liệu tuân theo nguyên tắc LIFO và có thể được triển khai bằng mảng hoặc danh sách liên kết.</li>
  <li>Về hiệu quả thời gian, cách triển khai ngăn xếp bằng mảng có hiệu quả trung bình cao hơn, nhưng trong quá trình mở rộng, độ phức tạp thời gian của một thao tác đẩy vào đơn lẻ suy giảm xuống $O(n)$. Ngược lại, cách triển khai ngăn xếp bằng danh sách liên kết mang lại hiệu năng ổn định hơn.</li>
  <li>Về hiệu quả không gian, cách triển khai ngăn xếp bằng mảng có thể dẫn đến một mức độ lãng phí không gian nhất định. Tuy nhiên, cần lưu ý rằng không gian bộ nhớ mà các node danh sách liên kết chiếm dụng lớn hơn so với các phần tử mảng.</li>
  <li>Hàng đợi là một cấu trúc dữ liệu tuân theo nguyên tắc FIFO và cũng có thể được triển khai bằng mảng hoặc danh sách liên kết. Các kết luận về so sánh hiệu quả thời gian và không gian của hàng đợi tương tự như của ngăn xếp đã nêu trên.</li>
  <li>Hàng đợi hai đầu là một hàng đợi linh hoạt hơn, cho phép thêm và xóa phần tử ở cả hai đầu.</li>
</ul>

<h2>Hỏi & Đáp</h2>

<p><strong>Hỏi:</strong> Chức năng tiến/lùi (forward/back) của trình duyệt có được triển khai bằng danh sách liên kết đôi không?</p>
<p>Hành vi tiến/lùi của trình duyệt về bản chất là một ứng dụng của "ngăn xếp". Khi người dùng truy cập một trang mới, trang đó được thêm vào đỉnh ngăn xếp; khi người dùng bấm nút lùi, trang đó được lấy ra khỏi đỉnh ngăn xếp. Một hàng đợi hai đầu có thể hỗ trợ thuận tiện một số thao tác bổ sung, như đã đề cập trong phần "Deque".</p>

<p><strong>Hỏi:</strong> Sau khi lấy ra khỏi ngăn xếp, ta có cần giải phóng bộ nhớ của node vừa lấy ra không?</p>
<p>Nếu node vừa lấy ra vẫn còn cần dùng về sau, thì không cần giải phóng bộ nhớ. Nếu nó không còn được dùng nữa, các ngôn ngữ như Java và Python có cơ chế thu gom rác tự động, nên không cần giải phóng bộ nhớ thủ công; còn trong C và C++, cần giải phóng bộ nhớ thủ công.</p>

<p><strong>Hỏi:</strong> Một hàng đợi hai đầu trông giống như hai ngăn xếp ghép lại với nhau. Mục đích của nó là gì?</p>
<p>Hàng đợi hai đầu giống như sự kết hợp giữa ngăn xếp và hàng đợi, hay hai ngăn xếp ghép lại với nhau. Nó kết hợp logic của cả hai, nên có thể hỗ trợ mọi ứng dụng của ngăn xếp và hàng đợi, đồng thời mang lại sự linh hoạt cao hơn.</p>

<p><strong>Hỏi:</strong> Chức năng hoàn tác (undo) và làm lại (redo) được triển khai cụ thể như thế nào?</p>
<p>Dùng hai ngăn xếp: ngăn xếp <code>A</code> cho hoàn tác, ngăn xếp <code>B</code> cho làm lại.</p>
<ol>
  <li>Mỗi khi người dùng thực hiện một thao tác, đẩy thao tác đó vào ngăn xếp <code>A</code> và xóa sạch ngăn xếp <code>B</code>.</li>
  <li>Khi người dùng thực hiện "hoàn tác", lấy thao tác gần nhất ra khỏi ngăn xếp <code>A</code> và đẩy nó vào ngăn xếp <code>B</code>.</li>
  <li>Khi người dùng thực hiện "làm lại", lấy thao tác gần nhất ra khỏi ngăn xếp <code>B</code> và đẩy nó vào ngăn xếp <code>A</code>.</li>
</ol>

`,
    originalContent: `
# Summary

### Key Review

- A stack is a data structure that follows the LIFO principle and can be implemented using arrays or linked lists.
- In terms of time efficiency, the array implementation of a stack has higher average efficiency, but during expansion, the time complexity of a single push operation degrades to $O(n)$. In contrast, the linked-list implementation of a stack offers more stable performance.
- In terms of space efficiency, the array implementation of a stack may lead to some degree of space wastage. However, it should be noted that the memory space occupied by linked list nodes is larger than that of array elements.
- A queue is a data structure that follows the FIFO principle and can also be implemented using arrays or linked lists. The conclusions regarding time efficiency and space efficiency comparisons for queues are similar to those for stacks mentioned above.
- A deque is a queue with greater flexibility that allows adding and removing elements at both ends.

### Q & A

**Q**: Is the browser's forward and backward functionality implemented with a doubly linked list?

The browser's forward and backward behavior is essentially an application of a "stack." When a user visits a new page, that page is added to the top of the stack; when the user clicks the back button, that page is popped from the top of the stack. A deque can conveniently support some additional operations, as mentioned in the "Deque" section.

**Q**: After popping from the stack, do we need to free the memory of the popped node?

If the popped node will still be needed later, then memory does not need to be freed. If it won't be used afterward, languages like Java and Python have automatic garbage collection, so manual memory deallocation is not required; in C and C++, manual memory deallocation is necessary.

**Q**: A deque seems like two stacks joined together. What is its purpose?

A deque is like a combination of a stack and a queue, or two stacks joined together. It combines the logic of both, so it can support all applications of stacks and queues while offering greater flexibility.

**Q**: How are undo and redo specifically implemented?

Use two stacks: stack \`A\` for undo and stack \`B\` for redo.

1. Whenever the user performs an operation, push this operation onto stack \`A\` and clear stack \`B\`.
2. When the user performs "undo," pop the most recent operation from stack \`A\` and push it onto stack \`B\`.
3. When the user performs "redo," pop the most recent operation from stack \`B\` and push it onto stack \`A\`.

`
  },

});
