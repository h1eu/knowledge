/* ============================================================
   Knowledge OS — DSA Module: Chương 14 - Quy hoạch động (Dynamic Programming)
   Nguồn: hello-algo (chapter_dynamic_programming) — dịch đầy đủ, đối chiếu
   nguyên văn. Widget mô phỏng dùng dữ liệu frame đã được kiểm chứng bằng
   cách mô phỏng thuật toán thật trong Python (xem dsa-dp-frames-ch14.js).
   ============================================================ */

Object.assign(DSA_CONTENT, {

  'dsa-dp-index': {
    title: 'Quy hoạch động (Dynamic Programming)',
    summary: 'Giới thiệu chương Quy hoạch động (Dynamic Programming): kết hợp lời giải các bài toán con thành lời giải bài toán lớn, tránh tính toán lặp lại.',
    tags: ['dsa', 'dynamic-programming', 'algorithm-design'],
    domain: 'Algorithms',
    module: 'Chương 14: Quy hoạch động',
    prerequisites: ['dsa-backtracking-summary'],
    related: ['dsa-dp-intro'],
    updatedAt: '2026-07-19',
    readTime: '2 phút',
    content: `

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/chapter_dynamic_programming.jpg" alt="Quy hoạch động" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<div class="callout callout-note">
  <span class="callout-icon">🌊</span>
  <div class="callout-body">
    <p>Suối đổ vào sông, sông đổ ra biển.</p>
    <p>Quy hoạch động kết hợp lời giải của những bài toán nhỏ thành lời giải của một bài toán lớn, dẫn dắt chúng ta từng bước đến bờ bên kia của việc giải quyết vấn đề.</p>
  </div>
</div>

`,
    originalContent: `
# Dynamic Programming

![Dynamic programming](../assets/covers/chapter_dynamic_programming.jpg)

!!! abstract

    Streams flow into rivers, rivers flow into the sea.

    Dynamic programming combines solutions to small problems into the answer to a large problem, leading us step by step to the other shore of problem-solving.
`
  },

  'dsa-dp-intro': {
    title: '14.1 Giới thiệu Quy hoạch động',
    summary: 'Cách Quy hoạch động tối ưu hóa đệ quy bằng cách lưu trữ kết quả của các bài toán con chồng chéo (Memoization) và phương pháp giải từ dưới lên (Tabulation), qua ví dụ Leo cầu thang.',
    tags: ['dsa', 'dynamic-programming', 'memoization', 'tabulation'],
    domain: 'Algorithms',
    module: 'Chương 14: Quy hoạch động',
    prerequisites: ['dsa-dp-index'],
    related: ['dsa-dp-features'],
    updatedAt: '2026-07-19',
    readTime: '12 phút',
    content: `

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/climbing_stairs_example.png" alt="Số cách để lên đến bậc thứ 3" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p><strong>Quy hoạch động (Dynamic Programming)</strong> là một phương pháp thuật toán quan trọng, phân rã một bài toán thành một chuỗi các bài toán con nhỏ hơn, và tránh việc tính toán lặp lại bằng cách lưu trữ lời giải của các bài toán con, từ đó cải thiện đáng kể hiệu suất thời gian.</p>
<p>Trong phần này, chúng ta bắt đầu với một ví dụ kinh điển, trước tiên trình bày lời giải vét cạn bằng quay lui (backtracking), quan sát các bài toán con chồng chéo bên trong nó, rồi dần dần suy ra một lời giải quy hoạch động hiệu quả hơn.</p>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Leo cầu thang</strong></p>
    <p>Cho một cầu thang $n$ bậc, mỗi lần bạn có thể leo $1$ hoặc $2$ bậc. Hỏi có bao nhiêu cách khác nhau để lên đến đỉnh?</p>
  </div>
</div>

<p>Như hình trên, với cầu thang $3$ bậc, có $3$ cách khác nhau để lên đến đỉnh.</p>

<p>Mục tiêu của bài toán này là xác định số cách đi, vì vậy <strong>chúng ta có thể xem xét dùng quay lui để liệt kê tất cả khả năng</strong>. Cụ thể, hãy tưởng tượng việc leo cầu thang như một quá trình chọn lựa nhiều vòng: bắt đầu từ mặt đất, mỗi vòng chọn leo lên $1$ hoặc $2$ bậc, tăng số đếm lên $1$ mỗi khi lên đến đỉnh cầu thang, và cắt tỉa khi vượt quá đỉnh. Đoạn mã như sau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def backtrack(choices: list[int], state: int, n: int, res: list[int]) -&gt; int:
    """Quay lui"""
    # Khi leo đến bậc thứ n, cộng thêm 1 vào số lời giải
    if state == n:
        res[0] += 1
    # Duyệt qua tất cả lựa chọn
    for choice in choices:
        # Cắt tỉa: không được vượt quá bậc thứ n
        if state + choice &gt; n:
            continue
        # Thử: đưa ra lựa chọn, cập nhật trạng thái
        backtrack(choices, state + choice, n, res)
        # Quay lui


def climbing_stairs_backtrack(n: int) -&gt; int:
    """Leo cầu thang: Quay lui"""
    choices = [1, 2]  # Có thể chọn leo 1 hoặc 2 bậc
    state = 0  # Bắt đầu leo từ bậc thứ 0
    res = [0]  # Dùng res[0] để ghi lại số lời giải
    backtrack(choices, state, n, res)
    return res[0]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Quay lui */
void backtrack(vector&lt;int&gt; &amp;choices, int state, int n, vector&lt;int&gt; &amp;res) {
    // Khi leo đến bậc thứ n, cộng thêm 1 vào số lời giải
    if (state == n)
        res[0]++;
    // Duyệt qua tất cả lựa chọn
    for (auto &amp;choice : choices) {
        // Cắt tỉa: không được vượt quá bậc thứ n
        if (state + choice &gt; n)
            continue;
        // Thử: đưa ra lựa chọn, cập nhật trạng thái
        backtrack(choices, state + choice, n, res);
        // Quay lui
    }
}

/* Leo cầu thang: Quay lui */
int climbingStairsBacktrack(int n) {
    vector&lt;int&gt; choices = {1, 2}; // Có thể chọn leo 1 hoặc 2 bậc
    int state = 0;                // Bắt đầu leo từ bậc thứ 0
    vector&lt;int&gt; res = {0};        // Dùng res[0] để ghi lại số lời giải
    backtrack(choices, state, n, res);
    return res[0];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Quay lui */
public static void backtrack(List&lt;Integer&gt; choices, int state, int n, List&lt;Integer&gt; res) {
    // Khi leo đến bậc thứ n, cộng thêm 1 vào số lời giải
    if (state == n)
        res.set(0, res.get(0) + 1);
    // Duyệt qua tất cả lựa chọn
    for (Integer choice : choices) {
        // Cắt tỉa: không được vượt quá bậc thứ n
        if (state + choice &gt; n)
            continue;
        // Thử: đưa ra lựa chọn, cập nhật trạng thái
        backtrack(choices, state + choice, n, res);
        // Quay lui
    }
}

/* Leo cầu thang: Quay lui */
public static int climbingStairsBacktrack(int n) {
    List&lt;Integer&gt; choices = Arrays.asList(1, 2); // Có thể chọn leo 1 hoặc 2 bậc
    int state = 0; // Bắt đầu leo từ bậc thứ 0
    List&lt;Integer&gt; res = new ArrayList&lt;&gt;();
    res.add(0); // Dùng res[0] để ghi lại số lời giải
    backtrack(choices, state, n, res);
    return res.get(0);
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Quay lui */
function backtrack(choices, state, n, res) {
    // Khi leo đến bậc thứ n, cộng thêm 1 vào số lời giải
    if (state === n) res.set(0, res.get(0) + 1);
    // Duyệt qua tất cả lựa chọn
    for (const choice of choices) {
        // Cắt tỉa: không được vượt quá bậc thứ n
        if (state + choice &gt; n) continue;
        // Thử: đưa ra lựa chọn, cập nhật trạng thái
        backtrack(choices, state + choice, n, res);
        // Quay lui
    }
}

/* Leo cầu thang: Quay lui */
function climbingStairsBacktrack(n) {
    const choices = [1, 2]; // Có thể chọn leo 1 hoặc 2 bậc
    const state = 0; // Bắt đầu leo từ bậc thứ 0
    const res = new Map();
    res.set(0, 0); // Dùng res[0] để ghi lại số lời giải
    backtrack(choices, state, n, res);
    return res.get(0);
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Quay lui */
fun backtrack(
    choices: MutableList&lt;Int&gt;,
    state: Int,
    n: Int,
    res: MutableList&lt;Int&gt;
) {
    // Khi leo đến bậc thứ n, cộng thêm 1 vào số lời giải
    if (state == n)
        res[0] = res[0] + 1
    // Duyệt qua tất cả lựa chọn
    for (choice in choices) {
        // Cắt tỉa: không được vượt quá bậc thứ n
        if (state + choice &gt; n) continue
        // Thử: đưa ra lựa chọn, cập nhật trạng thái
        backtrack(choices, state + choice, n, res)
        // Quay lui
    }
}

/* Leo cầu thang: Quay lui */
fun climbingStairsBacktrack(n: Int): Int {
    val choices = mutableListOf(1, 2) // Có thể chọn leo 1 hoặc 2 bậc
    val state = 0 // Bắt đầu leo từ bậc thứ 0
    val res = mutableListOf&lt;Int&gt;()
    res.add(0) // Dùng res[0] để ghi lại số lời giải
    backtrack(choices, state, n, res)
    return res[0]
}</code></pre></div></div></div>

<h2>Cách 1: Tìm kiếm vét cạn</h2>

<p>Các thuật toán quay lui thường không phân rã bài toán một cách tường minh, mà coi việc giải bài toán như một chuỗi các bước quyết định, tìm kiếm tất cả lời giải khả thi thông qua thử và cắt tỉa.</p>

<p>Chúng ta có thể thử phân tích bài toán này từ góc độ phân rã bài toán. Gọi số cách để leo đến bậc thứ $i$ là $dp[i]$, thì $dp[i]$ chính là bài toán gốc, và các bài toán con của nó bao gồm:</p>

<p>$$dp[i-1], dp[i-2], \dots, dp[2], dp[1]$$</p>

<p>Vì mỗi vòng chúng ta chỉ có thể leo $1$ hoặc $2$ bậc, nên khi đang đứng ở bậc thứ $i$, ta chỉ có thể đến từ bậc thứ $i-1$ hoặc bậc thứ $i-2$ ở vòng trước. Nói cách khác, ta chỉ có thể đến bậc thứ $i$ từ bậc thứ $i-1$ hoặc bậc thứ $i-2$.</p>

<p>Điều này dẫn đến một kết luận quan trọng: <strong>số cách leo đến bậc thứ $i-1$ cộng với số cách leo đến bậc thứ $i-2$ bằng số cách leo đến bậc thứ $i$</strong>. Công thức như sau:</p>

<p>$$dp[i] = dp[i-1] + dp[i-2]$$</p>

<p>Điều này có nghĩa là trong bài toán leo cầu thang, tồn tại một quan hệ truy hồi giữa các bài toán con, và <strong>lời giải của bài toán gốc có thể được xây dựng từ lời giải của các bài toán con</strong>. Hình dưới đây minh họa quan hệ truy hồi này.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/climbing_stairs_state_transfer.png" alt="Quan hệ truy hồi cho số cách đi" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Ta có thể thu được một lời giải tìm kiếm vét cạn dựa trên công thức truy hồi trên. Bắt đầu từ $dp[n]$, <strong>đệ quy phân rã một bài toán lớn hơn thành tổng của hai bài toán nhỏ hơn</strong>, cho đến khi đạt đến các bài toán con nhỏ nhất $dp[1]$ và $dp[2]$ rồi quay về. Trong đó, lời giải của các bài toán con nhỏ nhất đã biết, cụ thể là $dp[1] = 1$ và $dp[2] = 2$, đại diện cho $1$ và $2$ cách để leo đến bậc thứ $1$ và thứ $2$.</p>

<p>Quan sát đoạn mã dưới đây: giống như mã quay lui tiêu chuẩn, nó cũng dùng tìm kiếm theo chiều sâu nhưng ngắn gọn hơn:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def dfs(i: int) -&gt; int:
    """Tìm kiếm"""
    # Đã biết dp[1] và dp[2], trả về luôn
    if i == 1 or i == 2:
        return i
    # dp[i] = dp[i-1] + dp[i-2]
    count = dfs(i - 1) + dfs(i - 2)
    return count


def climbing_stairs_dfs(n: int) -&gt; int:
    """Leo cầu thang: Tìm kiếm"""
    return dfs(n)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm kiếm */
int dfs(int i) {
    // Đã biết dp[1] và dp[2], trả về luôn
    if (i == 1 || i == 2)
        return i;
    // dp[i] = dp[i-1] + dp[i-2]
    int count = dfs(i - 1) + dfs(i - 2);
    return count;
}

/* Leo cầu thang: Tìm kiếm */
int climbingStairsDFS(int n) {
    return dfs(n);
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Tìm kiếm */
public static int dfs(int i) {
    // Đã biết dp[1] và dp[2], trả về luôn
    if (i == 1 || i == 2)
        return i;
    // dp[i] = dp[i-1] + dp[i-2]
    int count = dfs(i - 1) + dfs(i - 2);
    return count;
}

/* Leo cầu thang: Tìm kiếm */
public static int climbingStairsDFS(int n) {
    return dfs(n);
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Tìm kiếm */
function dfs(i) {
    // Đã biết dp[1] và dp[2], trả về luôn
    if (i === 1 || i === 2) return i;
    // dp[i] = dp[i-1] + dp[i-2]
    const count = dfs(i - 1) + dfs(i - 2);
    return count;
}

/* Leo cầu thang: Tìm kiếm */
function climbingStairsDFS(n) {
    return dfs(n);
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Tìm kiếm */
fun dfs(i: Int): Int {
    // Đã biết dp[1] và dp[2], trả về luôn
    if (i == 1 || i == 2) return i
    // dp[i] = dp[i-1] + dp[i-2]
    val count = dfs(i - 1) + dfs(i - 2)
    return count
}

/* Leo cầu thang: Tìm kiếm */
fun climbingStairsDFS(n: Int): Int {
    return dfs(n)
}</code></pre></div></div></div>

<p>Hình dưới đây cho thấy cây đệ quy hình thành từ tìm kiếm vét cạn. Với bài toán $dp[n]$, độ sâu của cây đệ quy là $n$, với độ phức tạp thời gian $O(2^n)$. Sự tăng trưởng theo hàm mũ là bùng nổ; nếu ta nhập một $n$ tương đối lớn, thời gian chờ có thể rất lâu.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/climbing_stairs_dfs_tree.png" alt="Cây đệ quy cho bài toán leo cầu thang" style="max-width: 90%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Quan sát hình trên, <strong>độ phức tạp thời gian theo hàm mũ là do "các bài toán con chồng chéo" gây ra</strong>. Ví dụ, $dp[9]$ được phân rã thành $dp[8]$ và $dp[7]$, còn $dp[8]$ được phân rã thành $dp[7]$ và $dp[6]$, cả hai đều chứa bài toán con $dp[7]$.</p>

<p>Cứ như vậy, các bài toán con lại chứa những bài toán con chồng chéo nhỏ hơn, kéo dài vô tận. Phần lớn tài nguyên tính toán bị lãng phí vào những bài toán con chồng chéo này.</p>

<h2>Cách 2: Đệ quy có nhớ (Memoization)</h2>

<p>Để cải thiện hiệu suất thuật toán, <strong>chúng ta muốn tất cả các bài toán con chồng chéo chỉ được tính toán một lần</strong>. Với mục đích đó, ta khai báo một mảng <code>mem</code> để ghi lại lời giải của mỗi bài toán con, và cắt tỉa các bài toán con chồng chéo trong quá trình tìm kiếm.</p>

<ol>
  <li>Khi tính $dp[i]$ lần đầu, ta ghi lại vào <code>mem[i]</code> để dùng sau này.</li>
  <li>Khi cần tính lại $dp[i]$, ta có thể lấy trực tiếp kết quả từ <code>mem[i]</code>, từ đó tránh việc tính toán lặp lại bài toán con đó.</li>
</ol>

<p>Đoạn mã như sau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def dfs(i: int, mem: list[int]) -&gt; int:
    """Tìm kiếm có nhớ (Memoization)"""
    # Đã biết dp[1] và dp[2], trả về luôn
    if i == 1 or i == 2:
        return i
    # Nếu đã có bản ghi dp[i], trả về luôn
    if mem[i] != -1:
        return mem[i]
    # dp[i] = dp[i-1] + dp[i-2]
    count = dfs(i - 1, mem) + dfs(i - 2, mem)
    # Ghi lại dp[i]
    mem[i] = count
    return count


def climbing_stairs_dfs_mem(n: int) -&gt; int:
    """Leo cầu thang: Tìm kiếm có nhớ"""
    # mem[i] ghi lại tổng số lời giải để leo đến bậc thứ i, -1 nghĩa là chưa có bản ghi
    mem = [-1] * (n + 1)
    return dfs(n, mem)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm kiếm có nhớ */
int dfs(int i, vector&lt;int&gt; &amp;mem) {
    // Đã biết dp[1] và dp[2], trả về luôn
    if (i == 1 || i == 2)
        return i;
    // Nếu đã có bản ghi dp[i], trả về luôn
    if (mem[i] != -1)
        return mem[i];
    // dp[i] = dp[i-1] + dp[i-2]
    int count = dfs(i - 1, mem) + dfs(i - 2, mem);
    // Ghi lại dp[i]
    mem[i] = count;
    return count;
}

/* Leo cầu thang: Tìm kiếm có nhớ */
int climbingStairsDFSMem(int n) {
    // mem[i] ghi lại tổng số lời giải để leo đến bậc thứ i, -1 nghĩa là chưa có bản ghi
    vector&lt;int&gt; mem(n + 1, -1);
    return dfs(n, mem);
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Tìm kiếm có nhớ */
public static int dfs(int i, int[] mem) {
    // Đã biết dp[1] và dp[2], trả về luôn
    if (i == 1 || i == 2)
        return i;
    // Nếu đã có bản ghi dp[i], trả về luôn
    if (mem[i] != -1)
        return mem[i];
    // dp[i] = dp[i-1] + dp[i-2]
    int count = dfs(i - 1, mem) + dfs(i - 2, mem);
    // Ghi lại dp[i]
    mem[i] = count;
    return count;
}

/* Leo cầu thang: Tìm kiếm có nhớ */
public static int climbingStairsDFSMem(int n) {
    // mem[i] ghi lại tổng số lời giải để leo đến bậc thứ i, -1 nghĩa là chưa có bản ghi
    int[] mem = new int[n + 1];
    Arrays.fill(mem, -1);
    return dfs(n, mem);
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Tìm kiếm có nhớ */
function dfs(i, mem) {
    // Đã biết dp[1] và dp[2], trả về luôn
    if (i === 1 || i === 2) return i;
    // Nếu đã có bản ghi dp[i], trả về luôn
    if (mem[i] != -1) return mem[i];
    // dp[i] = dp[i-1] + dp[i-2]
    const count = dfs(i - 1, mem) + dfs(i - 2, mem);
    // Ghi lại dp[i]
    mem[i] = count;
    return count;
}

/* Leo cầu thang: Tìm kiếm có nhớ */
function climbingStairsDFSMem(n) {
    // mem[i] ghi lại tổng số lời giải để leo đến bậc thứ i, -1 nghĩa là chưa có bản ghi
    const mem = new Array(n + 1).fill(-1);
    return dfs(n, mem);
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Tìm kiếm có nhớ */
fun dfs(i: Int, mem: IntArray): Int {
    // Đã biết dp[1] và dp[2], trả về luôn
    if (i == 1 || i == 2) return i
    // Nếu đã có bản ghi dp[i], trả về luôn
    if (mem[i] != -1) return mem[i]
    // dp[i] = dp[i-1] + dp[i-2]
    val count = dfs(i - 1, mem) + dfs(i - 2, mem)
    // Ghi lại dp[i]
    mem[i] = count
    return count
}

/* Leo cầu thang: Tìm kiếm có nhớ */
fun climbingStairsDFSMem(n: Int): Int {
    // mem[i] ghi lại tổng số lời giải để leo đến bậc thứ i, -1 nghĩa là chưa có bản ghi
    val mem = IntArray(n + 1)
    mem.fill(-1)
    return dfs(n, mem)
}</code></pre></div></div></div>

<p>Quan sát hình dưới: <strong>sau khi áp dụng đệ quy có nhớ, tất cả các bài toán con chồng chéo chỉ cần tính một lần, giảm độ phức tạp thời gian xuống còn $O(n)$</strong>, đây là một bước nhảy vọt to lớn.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/climbing_stairs_dfs_memo_tree.png" alt="Cây đệ quy với đệ quy có nhớ" style="max-width: 90%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>Cách 3: Quy hoạch động</h2>

<p><strong>Đệ quy có nhớ là một phương pháp "từ trên xuống" (top-down)</strong>: ta bắt đầu từ bài toán gốc (nút gốc), đệ quy phân rã các bài toán con lớn hơn thành những bài toán con nhỏ hơn, cho đến khi đạt tới những bài toán con nhỏ nhất đã biết (nút lá). Sau đó, bằng cách quay lui, ta thu thập lời giải của các bài toán con theo từng lớp để xây dựng lời giải của bài toán gốc.</p>

<p>Ngược lại, <strong>quy hoạch động là một phương pháp "từ dưới lên" (bottom-up)</strong>: bắt đầu từ lời giải của những bài toán con nhỏ nhất, lặp lại việc xây dựng lời giải cho những bài toán con lớn hơn, cho đến khi có được lời giải của bài toán gốc.</p>

<p>Vì quy hoạch động không bao gồm quá trình quay lui, nó chỉ cần dùng vòng lặp để triển khai và không cần đệ quy. Trong đoạn mã sau, ta khởi tạo một mảng <code>dp</code> để lưu lời giải của các bài toán con, đóng vai trò ghi nhận giống như mảng <code>mem</code> trong đệ quy có nhớ:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def climbing_stairs_dp(n: int) -&gt; int:
    """Leo cầu thang: Quy hoạch động"""
    if n == 1 or n == 2:
        return n
    # Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    dp = [0] * (n + 1)
    # Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1], dp[2] = 1, 2
    # Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Leo cầu thang: Quy hoạch động */
int climbingStairsDP(int n) {
    if (n == 1 || n == 2)
        return n;
    // Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    vector&lt;int&gt; dp(n + 1);
    // Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1] = 1;
    dp[2] = 2;
    // Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for (int i = 3; i &lt;= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Leo cầu thang: Quy hoạch động */
public static int climbingStairsDP(int n) {
    if (n == 1 || n == 2)
        return n;
    // Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    int[] dp = new int[n + 1];
    // Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1] = 1;
    dp[2] = 2;
    // Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for (int i = 3; i &lt;= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Leo cầu thang: Quy hoạch động */
function climbingStairsDP(n) {
    if (n === 1 || n === 2) return n;
    // Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    const dp = new Array(n + 1).fill(-1);
    // Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1] = 1;
    dp[2] = 2;
    // Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for (let i = 3; i &lt;= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Leo cầu thang: Quy hoạch động */
fun climbingStairsDP(n: Int): Int {
    if (n == 1 || n == 2) return n
    // Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    val dp = IntArray(n + 1)
    // Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1] = 1
    dp[2] = 2
    // Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for (i in 3..n) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}</code></pre></div></div></div>

<p>Hình dưới đây mô phỏng quá trình thực thi của đoạn mã trên.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/climbing_stairs_dp.png" alt="Quá trình quy hoạch động cho bài toán leo cầu thang" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Giống như các thuật toán quay lui, quy hoạch động cũng dùng khái niệm "trạng thái" để biểu diễn các giai đoạn cụ thể của việc giải bài toán, mỗi trạng thái tương ứng với một bài toán con và lời giải tối ưu cục bộ tương ứng của nó. Ví dụ, trạng thái trong bài toán leo cầu thang được định nghĩa là số bậc thang hiện tại $i$.</p>

<p>Dựa trên nội dung trên, ta có thể tổng kết các thuật ngữ thường dùng trong quy hoạch động.</p>

<ul>
  <li>Mảng <code>dp</code> được gọi là <u>bảng dp</u>, trong đó $dp[i]$ đại diện cho lời giải của bài toán con tương ứng với trạng thái $i$.</li>
  <li>Các trạng thái tương ứng với những bài toán con nhỏ nhất (bậc thứ $1$ và $2$) được gọi là <u>trạng thái khởi tạo</u>.</li>
  <li>Công thức truy hồi $dp[i] = dp[i-1] + dp[i-2]$ được gọi là <u>phương trình chuyển trạng thái</u>.</li>
</ul>

<h2>Tối ưu Không gian</h2>

<p>Người đọc tinh ý có thể nhận thấy rằng **vì $dp[i]$ chỉ liên quan đến $dp[i-1]$ và $dp[i-2]$**, ta không cần dùng một mảng <code>dp</code> để lưu lời giải của tất cả các bài toán con, mà có thể dùng hai biến trượt dần lên. Đoạn mã như sau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def climbing_stairs_dp_comp(n: int) -&gt; int:
    """Leo cầu thang: Quy hoạch động tối ưu không gian"""
    if n == 1 or n == 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Leo cầu thang: Quy hoạch động tối ưu không gian */
int climbingStairsDPComp(int n) {
    if (n == 1 || n == 2)
        return n;
    int a = 1, b = 2;
    for (int i = 3; i &lt;= n; i++) {
        int tmp = b;
        b = a + b;
        a = tmp;
    }
    return b;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Leo cầu thang: Quy hoạch động tối ưu không gian */
public static int climbingStairsDPComp(int n) {
    if (n == 1 || n == 2)
        return n;
    int a = 1, b = 2;
    for (int i = 3; i &lt;= n; i++) {
        int tmp = b;
        b = a + b;
        a = tmp;
    }
    return b;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Leo cầu thang: Quy hoạch động tối ưu không gian */
function climbingStairsDPComp(n) {
    if (n === 1 || n === 2) return n;
    let a = 1,
        b = 2;
    for (let i = 3; i &lt;= n; i++) {
        const tmp = b;
        b = a + b;
        a = tmp;
    }
    return b;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Leo cầu thang: Quy hoạch động tối ưu không gian */
fun climbingStairsDPComp(n: Int): Int {
    if (n == 1 || n == 2) return n
    var a = 1
    var b = 2
    for (i in 3..n) {
        val temp = b
        b += a
        a = temp
    }
    return b
}</code></pre></div></div></div>

<p>Như đoạn mã trên cho thấy, bằng cách loại bỏ không gian chiếm bởi mảng <code>dp</code>, độ phức tạp không gian giảm từ $O(n)$ xuống $O(1)$.</p>

<p>Trong các bài toán quy hoạch động, trạng thái hiện tại thường chỉ phụ thuộc vào một số lượng hạn chế các trạng thái trước đó, cho phép ta chỉ giữ lại những trạng thái cần thiết và tiết kiệm bộ nhớ thông qua "giảm chiều". <strong>Kỹ thuật tối ưu không gian này được gọi là "biến trượt" (rolling variable) hoặc "mảng trượt" (rolling array)</strong>.</p>

<div class="interactive-widget-wrapper" id="climbing-stairs-dp-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'climbing-stairs-dp-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'climbing-stairs-dp-wrapper', 'tab-interactive'); initDpDemo('climbing-stairs-dp-wrapper', DP_FRAMES_CLIMBING_STAIRS)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="color:var(--text-muted);font-size:14px;">Xem hình minh họa tĩnh phía trên. Chuyển sang tab "Mô phỏng tương tác" để xem bảng <code>dp</code> được điền từng bước cho $n=8$.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="climbing-stairs-dp-wrapper-canvas"></div>
    <div class="simulator-controls" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
      <button id="climbing-stairs-dp-wrapper-btn-autorun" class="control-btn" onclick="autoRunDpDemo('climbing-stairs-dp-wrapper')">▶ Auto Run</button>
      <button id="climbing-stairs-dp-wrapper-btn-step" class="control-btn" onclick="stepDpDemo('climbing-stairs-dp-wrapper')">Bước tiếp theo ▶</button>
      <button id="climbing-stairs-dp-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunDpDemo('climbing-stairs-dp-wrapper')" disabled>⏸ Dừng</button>
      <button id="climbing-stairs-dp-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initDpDemo('climbing-stairs-dp-wrapper', DP_FRAMES_CLIMBING_STAIRS)">↺ Reset</button>
    </div>
    <div style="margin-top:8px;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setDpDemoSpeed('climbing-stairs-dp-wrapper', this.value)" /> <span id="climbing-stairs-dp-wrapper-speed-label">700ms</span>
    </div>
    <div id="climbing-stairs-dp-wrapper-status" class="simulator-status" style="margin-top:8px;color:var(--text-secondary);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>

`,
    originalContent: `
# Introduction to Dynamic Programming

<u>Dynamic programming</u> is an important algorithmic paradigm that decomposes a problem into a series of smaller subproblems and avoids redundant computation by storing the solutions to subproblems, thereby significantly improving time efficiency.

In this section, we start with a classic example, first presenting its brute force backtracking solution, observing the overlapping subproblems within it, and then gradually deriving a more efficient dynamic programming solution.

!!! question "Climbing stairs"

    Given a staircase with $n$ steps, where you can climb $1$ or $2$ steps at a time, how many different ways are there to reach the top?

As shown in the figure below, for a $3$-step staircase, there are $3$ different ways to reach the top.

![Number of ways to reach the 3rd step](intro_to_dynamic_programming.assets/climbing_stairs_example.png)

The goal of this problem is to determine the number of ways, so **we can consider using backtracking to enumerate all possibilities**. Specifically, imagine climbing stairs as a multi-round selection process: starting from the ground, choosing to go up $1$ or $2$ steps in each round, incrementing the count by $1$ whenever the top of the stairs is reached, and pruning when exceeding the top. The code is as follows:

\`\`\`src
[file]{climbing_stairs_backtrack}-[class]{}-[func]{climbing_stairs_backtrack}
\`\`\`

## Method 1: Brute Force Search

Backtracking algorithms typically do not explicitly decompose problems, but rather treat solving the problem as a series of decision steps, searching for all possible solutions through trial and pruning.

We can try to analyze this problem from the perspective of problem decomposition. Let the number of ways to climb to the $i$-th step be $dp[i]$, then $dp[i]$ is the original problem, and its subproblems include:

$$
dp[i-1], dp[i-2], \\dots, dp[2], dp[1]
$$

Since we can only go up $1$ or $2$ steps in each round, when we stand on the $i$-th step, we could only have been on the $i-1$-th or $i-2$-th step in the previous round. In other words, we can only reach the $i$-th step from the $i-1$-th or $i-2$-th step.

This leads to an important conclusion: **the number of ways to climb to the $i-1$-th step plus the number of ways to climb to the $i-2$-th step equals the number of ways to climb to the $i$-th step**. The formula is as follows:

$$
dp[i] = dp[i-1] + dp[i-2]
$$

This means that in the stair climbing problem, there exists a recurrence relation among the subproblems, and **the solution to the original problem can be constructed from the solutions to the subproblems**. The figure below illustrates this recurrence relation.

![Recurrence relation for the number of ways](intro_to_dynamic_programming.assets/climbing_stairs_state_transfer.png)

We can obtain a brute force search solution based on the recurrence formula. Starting from $dp[n]$, **recursively decompose a larger problem into the sum of two smaller problems**, until reaching the smallest subproblems $dp[1]$ and $dp[2]$ and returning. Among them, the solutions to the smallest subproblems are known, namely $dp[1] = 1$ and $dp[2] = 2$, representing $1$ and $2$ ways to climb to the $1$st and $2$nd steps, respectively.

Observe the following code: like standard backtracking code, it also uses depth-first search but is more concise:

\`\`\`src
[file]{climbing_stairs_dfs}-[class]{}-[func]{climbing_stairs_dfs}
\`\`\`

The figure below shows the recursion tree formed by brute force search. For the problem $dp[n]$, the depth of its recursion tree is $n$, with a time complexity of $O(2^n)$. Exponential growth is explosive; if we input a relatively large $n$, the wait can be very long.

![Recursion tree for climbing stairs](intro_to_dynamic_programming.assets/climbing_stairs_dfs_tree.png)

Observing the above figure, **the exponential time complexity is caused by "overlapping subproblems"**. For example, $dp[9]$ is decomposed into $dp[8]$ and $dp[7]$, and $dp[8]$ is decomposed into $dp[7]$ and $dp[6]$, both of which contain the subproblem $dp[7]$.

And so on, subproblems contain smaller overlapping subproblems, ad infinitum. The vast majority of computational resources are wasted on these overlapping subproblems.

## Method 2: Memoization

To improve algorithm efficiency, **we want all overlapping subproblems to be computed only once**. For this purpose, we declare an array \`mem\` to record the solution to each subproblem and prune overlapping subproblems during the search process.

1. When computing $dp[i]$ for the first time, we record it in \`mem[i]\` for later use.
2. When we need to compute $dp[i]$ again, we can directly retrieve the result from \`mem[i]\`, thereby avoiding redundant computation of that subproblem.

The code is as follows:

\`\`\`src
[file]{climbing_stairs_dfs_mem}-[class]{}-[func]{climbing_stairs_dfs_mem}
\`\`\`

Observe the figure below: **after memoization, all overlapping subproblems need to be computed only once, reducing the time complexity to $O(n)$**, which is a tremendous leap.

![Recursion tree with memoization](intro_to_dynamic_programming.assets/climbing_stairs_dfs_memo_tree.png)

## Method 3: Dynamic Programming

**Memoization is a "top-down" method**: we start from the original problem (root node), recursively decompose larger subproblems into smaller ones, until reaching the smallest known subproblems (leaf nodes). Afterward, by backtracking, we collect the solutions to the subproblems layer by layer to construct the solution to the original problem.

In contrast, **dynamic programming is a "bottom-up" method**: starting from the solutions to the smallest subproblems, iteratively constructing solutions to larger subproblems until obtaining the solution to the original problem.

Since dynamic programming does not include a backtracking process, it only requires loop iteration for implementation and does not need recursion. In the following code, we initialize an array \`dp\` to store the solutions to subproblems, which serves the same recording function as the array \`mem\` in memoization:

\`\`\`src
[file]{climbing_stairs_dp}-[class]{}-[func]{climbing_stairs_dp}
\`\`\`

The figure below simulates the execution process of the above code.

![Dynamic programming process for climbing stairs](intro_to_dynamic_programming.assets/climbing_stairs_dp.png)

Like backtracking algorithms, dynamic programming also uses the "state" concept to represent specific stages of problem solving, with each state corresponding to a subproblem and its corresponding local optimal solution. For example, the state in the stair climbing problem is defined as the current stair step number $i$.

Based on the above content, we can summarize the commonly used terminology in dynamic programming.

- The array \`dp\` is called the <u>dp table</u>, where $dp[i]$ represents the solution to the subproblem corresponding to state $i$.
- The states corresponding to the smallest subproblems (the $1$st and $2$nd steps) are called <u>initial states</u>.
- The recurrence formula $dp[i] = dp[i-1] + dp[i-2]$ is called the <u>state transition equation</u>.

## Space Optimization

Observant readers may have noticed that **since $dp[i]$ is only related to $dp[i-1]$ and $dp[i-2]$, we do not need to use an array \`dp\` to store the solutions to all subproblems**, and can instead use two variables that roll forward. The code is as follows:

\`\`\`src
[file]{climbing_stairs_dp}-[class]{}-[func]{climbing_stairs_dp_comp}
\`\`\`

As the above code shows, by eliminating the space occupied by the array \`dp\`, the space complexity is reduced from $O(n)$ to $O(1)$.

In dynamic programming problems, the current state often depends only on a limited number of preceding states, allowing us to retain only the necessary states and save memory space through "dimension reduction". **This space optimization technique is called "rolling variable" or "rolling array"**.
`
  },

  'dsa-dp-features': {
    title: '14.2 Đặc trưng của Quy hoạch động',
    summary: 'Ba đặc trưng bắt buộc để một bài toán có thể giải bằng Quy hoạch động: Bài toán con chồng chéo, Cấu trúc con tối ưu và Không có hậu quả.',
    tags: ['dsa', 'dynamic-programming', 'optimal-substructure', 'no-aftereffects'],
    domain: 'Algorithms',
    module: 'Chương 14: Quy hoạch động',
    prerequisites: ['dsa-dp-intro'],
    related: ['dsa-dp-pipeline'],
    updatedAt: '2026-07-19',
    readTime: '12 phút',
    content: `

<p>Trong phần trước, ta đã học cách quy hoạch động giải bài toán gốc bằng cách phân rã nó thành các bài toán con. Trên thực tế, phân rã bài toán con là một cách tiếp cận thuật toán tổng quát, với những trọng tâm khác nhau ở chia để trị, quy hoạch động, và quay lui.</p>

<ul>
  <li>Các thuật toán chia để trị đệ quy chia bài toán gốc thành nhiều bài toán con độc lập cho đến khi đạt đến những bài toán con nhỏ nhất, và gộp lời giải của các bài toán con trong quá trình quay lui để cuối cùng thu được lời giải của bài toán gốc.</li>
  <li>Quy hoạch động cũng đệ quy phân rã bài toán, nhưng khác biệt chính so với các thuật toán chia để trị là các bài toán con trong quy hoạch động phụ thuộc lẫn nhau, và nhiều bài toán con chồng chéo xuất hiện trong quá trình phân rã.</li>
  <li>Các thuật toán quay lui liệt kê tất cả lời giải khả thi thông qua thử và sai, và tránh những nhánh tìm kiếm không cần thiết thông qua cắt tỉa. Lời giải của bài toán gốc bao gồm một chuỗi các bước quyết định, và ta có thể xem chuỗi con trước mỗi bước quyết định như một bài toán con.</li>
</ul>

<p>Trên thực tế, quy hoạch động thường được dùng để giải các bài toán tối ưu hóa, không chỉ chứa các bài toán con chồng chéo mà còn có hai đặc trưng lớn khác: cấu trúc con tối ưu và không có hậu quả.</p>

<h2>Cấu trúc con tối ưu (Optimal Substructure)</h2>

<p>Ta thực hiện một sửa đổi nhỏ với bài toán leo cầu thang để nó phù hợp hơn cho việc minh họa khái niệm cấu trúc con tối ưu.</p>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Leo cầu thang với chi phí nhỏ nhất</strong></p>
    <p>Cho một cầu thang, bạn có thể leo $1$ hoặc $2$ bậc mỗi lần, và mỗi bậc được gán một số nguyên không âm đại diện cho chi phí khi bước lên nó. Cho một mảng số nguyên không âm $cost$, trong đó $cost[i]$ đại diện cho chi phí của bậc thứ $i$ và $cost[0]$ là mặt đất (điểm xuất phát), chi phí nhỏ nhất cần thiết để lên đến đỉnh là bao nhiêu?</p>
  </div>
</div>

<p>Như hình dưới đây, nếu chi phí của bậc thứ $1$, $2$, và $3$ lần lượt là $1$, $10$, và $1$, thì leo từ mặt đất lên bậc thứ $3$ cần chi phí nhỏ nhất là $2$.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/min_cost_cs_example.png" alt="Chi phí nhỏ nhất để leo đến bậc thứ 3" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Gọi $dp[i]$ là chi phí tích lũy để leo đến bậc thứ $i$. Vì bậc thứ $i$ chỉ có thể đến từ bậc thứ $i-1$ hoặc $i-2$, $dp[i]$ chỉ có thể bằng $dp[i-1] + cost[i]$ hoặc $dp[i-2] + cost[i]$. Để tối thiểu hóa chi phí, ta nên chọn giá trị nhỏ hơn trong hai:</p>

<p>$$dp[i] = \min(dp[i-1], dp[i-2]) + cost[i]$$</p>

<p>Điều này dẫn ta đến ý nghĩa của cấu trúc con tối ưu: <strong>lời giải tối ưu của bài toán gốc được xây dựng từ lời giải tối ưu của các bài toán con</strong>.</p>

<p>Bài toán này rõ ràng có cấu trúc con tối ưu: ta chọn cái tốt hơn từ lời giải tối ưu của hai bài toán con $dp[i-1]$ và $dp[i-2]$, và dùng nó để xây dựng lời giải tối ưu của bài toán gốc $dp[i]$.</p>

<p>Vậy, bài toán leo cầu thang ở phần trước có cấu trúc con tối ưu không? Mục tiêu của nó là tìm số cách đi, có vẻ là một bài toán đếm, nhưng nếu ta đổi câu hỏi: "Tìm số cách đi lớn nhất". Ta sẽ ngạc nhiên khi thấy rằng <strong>mặc dù bài toán trước và sau khi sửa đổi là tương đương, cấu trúc con tối ưu đã xuất hiện</strong>: số cách đi lớn nhất cho bậc thứ $n$ bằng tổng số cách đi lớn nhất của bậc thứ $n-1$ và $n-2$. Do đó, cách diễn giải cấu trúc con tối ưu khá linh hoạt và sẽ có ý nghĩa khác nhau trong những bài toán khác nhau.</p>

<p>Theo phương trình chuyển trạng thái và các trạng thái khởi tạo $dp[1] = cost[1]$ và $dp[2] = cost[2]$, ta có thể thu được đoạn mã quy hoạch động:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def min_cost_climbing_stairs_dp(cost: list[int]) -&gt; int:
    """Leo cầu thang chi phí nhỏ nhất: Quy hoạch động"""
    n = len(cost) - 1
    if n == 1 or n == 2:
        return cost[n]
    # Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    dp = [0] * (n + 1)
    # Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1], dp[2] = cost[1], cost[2]
    # Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for i in range(3, n + 1):
        dp[i] = min(dp[i - 1], dp[i - 2]) + cost[i]
    return dp[n]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Leo cầu thang chi phí nhỏ nhất: Quy hoạch động */
int minCostClimbingStairsDP(vector&lt;int&gt; &amp;cost) {
    int n = cost.size() - 1;
    if (n == 1 || n == 2)
        return cost[n];
    // Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    vector&lt;int&gt; dp(n + 1);
    // Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1] = cost[1];
    dp[2] = cost[2];
    // Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for (int i = 3; i &lt;= n; i++) {
        dp[i] = min(dp[i - 1], dp[i - 2]) + cost[i];
    }
    return dp[n];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Leo cầu thang chi phí nhỏ nhất: Quy hoạch động */
public static int minCostClimbingStairsDP(int[] cost) {
    int n = cost.length - 1;
    if (n == 1 || n == 2)
        return cost[n];
    // Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    int[] dp = new int[n + 1];
    // Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1] = cost[1];
    dp[2] = cost[2];
    // Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for (int i = 3; i &lt;= n; i++) {
        dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
    }
    return dp[n];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Leo cầu thang chi phí nhỏ nhất: Quy hoạch động */
function minCostClimbingStairsDP(cost) {
    const n = cost.length - 1;
    if (n === 1 || n === 2) {
        return cost[n];
    }
    // Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    const dp = new Array(n + 1);
    // Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1] = cost[1];
    dp[2] = cost[2];
    // Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for (let i = 3; i &lt;= n; i++) {
        dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
    }
    return dp[n];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Leo cầu thang chi phí nhỏ nhất: Quy hoạch động */
fun minCostClimbingStairsDP(cost: IntArray): Int {
    val n = cost.size - 1
    if (n == 1 || n == 2) return cost[n]
    // Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    val dp = IntArray(n + 1)
    // Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1] = cost[1]
    dp[2] = cost[2]
    // Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for (i in 3..n) {
        dp[i] = min(dp[i - 1], dp[i - 2]) + cost[i]
    }
    return dp[n]
}</code></pre></div></div></div>

<p>Hình dưới đây cho thấy quá trình quy hoạch động cho đoạn mã trên.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/min_cost_cs_dp.png" alt="Quá trình quy hoạch động cho bài toán leo cầu thang chi phí nhỏ nhất" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Bài toán này cũng có thể được tối ưu không gian, nén từ một chiều xuống không chiều, giảm độ phức tạp không gian từ $O(n)$ xuống $O(1)$:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def min_cost_climbing_stairs_dp_comp(cost: list[int]) -&gt; int:
    """Leo cầu thang chi phí nhỏ nhất: Quy hoạch động tối ưu không gian"""
    n = len(cost) - 1
    if n == 1 or n == 2:
        return cost[n]
    a, b = cost[1], cost[2]
    for i in range(3, n + 1):
        a, b = b, min(a, b) + cost[i]
    return b</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Leo cầu thang chi phí nhỏ nhất: Quy hoạch động tối ưu không gian */
int minCostClimbingStairsDPComp(vector&lt;int&gt; &amp;cost) {
    int n = cost.size() - 1;
    if (n == 1 || n == 2)
        return cost[n];
    int a = cost[1], b = cost[2];
    for (int i = 3; i &lt;= n; i++) {
        int tmp = b;
        b = min(a, tmp) + cost[i];
        a = tmp;
    }
    return b;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Leo cầu thang chi phí nhỏ nhất: Quy hoạch động tối ưu không gian */
public static int minCostClimbingStairsDPComp(int[] cost) {
    int n = cost.length - 1;
    if (n == 1 || n == 2)
        return cost[n];
    int a = cost[1], b = cost[2];
    for (int i = 3; i &lt;= n; i++) {
        int tmp = b;
        b = Math.min(a, tmp) + cost[i];
        a = tmp;
    }
    return b;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Leo cầu thang chi phí nhỏ nhất: Quy hoạch động tối ưu không gian */
function minCostClimbingStairsDPComp(cost) {
    const n = cost.length - 1;
    if (n === 1 || n === 2) {
        return cost[n];
    }
    let a = cost[1],
        b = cost[2];
    for (let i = 3; i &lt;= n; i++) {
        const tmp = b;
        b = Math.min(a, tmp) + cost[i];
        a = tmp;
    }
    return b;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Leo cầu thang chi phí nhỏ nhất: Quy hoạch động tối ưu không gian */
fun minCostClimbingStairsDPComp(cost: IntArray): Int {
    val n = cost.size - 1
    if (n == 1 || n == 2) return cost[n]
    var a = cost[1]
    var b = cost[2]
    for (i in 3..n) {
        val tmp = b
        b = min(a, tmp) + cost[i]
        a = tmp
    }
    return b
}</code></pre></div></div></div>

<h2>Không có hậu quả (No Aftereffects)</h2>

<p>Không có hậu quả là một trong những đặc trưng quan trọng giúp quy hoạch động giải bài toán hiệu quả. Định nghĩa của nó là: <strong>cho một trạng thái nhất định, sự phát triển trong tương lai của nó chỉ liên quan đến trạng thái hiện tại và không liên quan gì đến tất cả các trạng thái trong quá khứ</strong>.</p>

<p>Lấy bài toán leo cầu thang làm ví dụ, cho trạng thái $i$, nó sẽ phát triển thành các trạng thái $i+1$ và $i+2$, tương ứng với việc nhảy $1$ bậc và nhảy $2$ bậc. Khi đưa ra hai lựa chọn này, ta không cần xem xét các trạng thái trước trạng thái $i$, vì chúng không ảnh hưởng đến tương lai của trạng thái $i$.</p>

<p>Tuy nhiên, nếu ta thêm một ràng buộc vào bài toán leo cầu thang, tình huống sẽ thay đổi.</p>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Leo cầu thang có ràng buộc</strong></p>
    <p>Cho một cầu thang $n$ bậc, mỗi lần bạn có thể leo $1$ hoặc $2$ bậc, <strong>nhưng không được nhảy $1$ bậc trong hai vòng liên tiếp</strong>. Có bao nhiêu cách để leo lên đỉnh?</p>
  </div>
</div>

<p>Như hình dưới đây, chỉ có $2$ cách khả thi để leo đến bậc thứ $3$. Con đường với ba lần nhảy $1$ bậc liên tiếp không thỏa mãn ràng buộc và do đó bị loại bỏ.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/climbing_stairs_constraint_example.png" alt="Số cách để leo đến bậc thứ 3 với ràng buộc" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Trong bài toán này, nếu vòng trước là một bước nhảy $1$ bậc, thì vòng tiếp theo bắt buộc phải nhảy $2$ bậc. Điều này có nghĩa là <strong>lựa chọn tiếp theo không thể chỉ được xác định bởi trạng thái hiện tại (số bậc thang hiện tại), mà còn phụ thuộc vào trạng thái trước đó (số bậc thang của vòng trước)</strong>.</p>

<p>Không khó để thấy rằng bài toán này không còn thỏa mãn tính không có hậu quả nữa, và phương trình chuyển trạng thái $dp[i] = dp[i-1] + dp[i-2]$ cũng thất bại, vì $dp[i-1]$ đại diện cho việc nhảy $1$ bậc trong vòng này, nhưng nó bao gồm nhiều lời giải mà "vòng trước là một bước nhảy $1$ bậc", những lời giải này không thể được tính trực tiếp vào $dp[i]$ để thỏa mãn ràng buộc.</p>

<p>Vì lý do này, ta cần mở rộng định nghĩa trạng thái: <strong>trạng thái $[i, j]$ đại diện cho việc đang ở bậc thứ $i$ với vòng trước đã nhảy $j$ bậc</strong>, trong đó $j \in \{1, 2\}$. Định nghĩa trạng thái này phân biệt hiệu quả liệu vòng trước có phải là nhảy $1$ bậc hay $2$ bậc, cho phép ta xác định trạng thái hiện tại đến từ đâu.</p>

<ul>
  <li>Khi vòng trước nhảy $1$ bậc, vòng trước đó nữa chỉ có thể chọn nhảy $2$ bậc, tức là $dp[i, 1]$ chỉ có thể chuyển từ $dp[i-1, 2]$.</li>
  <li>Khi vòng trước nhảy $2$ bậc, vòng trước đó nữa có thể chọn nhảy $1$ bậc hoặc $2$ bậc, tức là $dp[i, 2]$ có thể chuyển từ $dp[i-2, 1]$ hoặc $dp[i-2, 2]$.</li>
</ul>

<p>Như hình dưới đây, dưới định nghĩa này, $dp[i, j]$ đại diện cho số cách của trạng thái $[i, j]$. Phương trình chuyển trạng thái khi đó là:</p>

<p>$$
\begin{cases}
dp[i, 1] = dp[i-1, 2] \\
dp[i, 2] = dp[i-2, 1] + dp[i-2, 2]
\end{cases}
$$</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/climbing_stairs_constraint_state_transfer.png" alt="Quan hệ truy hồi khi xét đến ràng buộc" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Cuối cùng, trả về $dp[n, 1] + dp[n, 2]$, trong đó tổng của hai giá trị đại diện cho tổng số cách để leo đến bậc thứ $n$:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def climbing_stairs_constraint_dp(n: int) -&gt; int:
    """Leo cầu thang có ràng buộc: Quy hoạch động"""
    if n == 1 or n == 2:
        return 1
    # Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    dp = [[0] * 3 for _ in range(n + 1)]
    # Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1][1], dp[1][2] = 1, 0
    dp[2][1], dp[2][2] = 0, 1
    # Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for i in range(3, n + 1):
        dp[i][1] = dp[i - 1][2]
        dp[i][2] = dp[i - 2][1] + dp[i - 2][2]
    return dp[n][1] + dp[n][2]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Leo cầu thang có ràng buộc: Quy hoạch động */
int climbingStairsConstraintDP(int n) {
    if (n == 1 || n == 2) {
        return 1;
    }
    // Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(3, 0));
    // Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1][1] = 1;
    dp[1][2] = 0;
    dp[2][1] = 0;
    dp[2][2] = 1;
    // Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for (int i = 3; i &lt;= n; i++) {
        dp[i][1] = dp[i - 1][2];
        dp[i][2] = dp[i - 2][1] + dp[i - 2][2];
    }
    return dp[n][1] + dp[n][2];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Leo cầu thang có ràng buộc: Quy hoạch động */
static int climbingStairsConstraintDP(int n) {
    if (n == 1 || n == 2) {
        return 1;
    }
    // Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    int[][] dp = new int[n + 1][3];
    // Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1][1] = 1;
    dp[1][2] = 0;
    dp[2][1] = 0;
    dp[2][2] = 1;
    // Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for (int i = 3; i &lt;= n; i++) {
        dp[i][1] = dp[i - 1][2];
        dp[i][2] = dp[i - 2][1] + dp[i - 2][2];
    }
    return dp[n][1] + dp[n][2];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Leo cầu thang có ràng buộc: Quy hoạch động */
function climbingStairsConstraintDP(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    // Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    const dp = Array.from(new Array(n + 1), () =&gt; new Array(3));
    // Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1][1] = 1;
    dp[1][2] = 0;
    dp[2][1] = 0;
    dp[2][2] = 1;
    // Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for (let i = 3; i &lt;= n; i++) {
        dp[i][1] = dp[i - 1][2];
        dp[i][2] = dp[i - 2][1] + dp[i - 2][2];
    }
    return dp[n][1] + dp[n][2];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Leo cầu thang có ràng buộc: Quy hoạch động */
fun climbingStairsConstraintDP(n: Int): Int {
    if (n == 1 || n == 2) {
        return 1
    }
    // Khởi tạo bảng dp, dùng để lưu lời giải của các bài toán con
    val dp = Array(n + 1) { IntArray(3) }
    // Trạng thái khởi tạo: gán trước lời giải của bài toán con nhỏ nhất
    dp[1][1] = 1
    dp[1][2] = 0
    dp[2][1] = 0
    dp[2][2] = 1
    // Chuyển trạng thái: giải dần các bài toán con lớn hơn từ những bài toán con nhỏ hơn
    for (i in 3..n) {
        dp[i][1] = dp[i - 1][2]
        dp[i][2] = dp[i - 2][1] + dp[i - 2][2]
    }
    return dp[n][1] + dp[n][2]
}</code></pre></div></div></div>

<p>Trong trường hợp trên, vì ta chỉ cần xét thêm một trạng thái trước đó, ta vẫn có thể làm cho bài toán thỏa mãn tính không có hậu quả bằng cách mở rộng định nghĩa trạng thái. Tuy nhiên, một số bài toán có "hậu quả" rất nghiêm trọng.</p>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Leo cầu thang với chướng ngại vật sinh ra</strong></p>
    <p>Cho một cầu thang $n$ bậc, mỗi lần bạn có thể leo $1$ hoặc $2$ bậc. <strong>Mỗi khi bạn đến bậc thứ $i$, hệ thống tự động đặt một chướng ngại vật ở bậc thứ $2i$, và không vòng nào sau đó được phép nhảy đến bậc thứ $2i$</strong>. Ví dụ, nếu hai vòng đầu tiên nhảy đến bậc thứ $2$ và $3$, thì sau đó bạn không thể nhảy đến bậc thứ $4$ và $6$. Có bao nhiêu cách để leo lên đỉnh?</p>
  </div>
</div>

<p>Trong bài toán này, bước nhảy tiếp theo phụ thuộc vào tất cả các trạng thái trong quá khứ, vì mỗi lần nhảy đặt chướng ngại vật ở những bậc cao hơn, ảnh hưởng đến các bước nhảy trong tương lai. Với những bài toán như vậy, quy hoạch động thường khó giải quyết.</p>

<p>Trên thực tế, nhiều bài toán tối ưu hóa tổ hợp phức tạp (như bài toán người bán hàng du lịch) không thỏa mãn tính không có hậu quả. Với những bài toán như vậy, ta thường dùng những phương pháp khác, như tìm kiếm khám phá (heuristic search), thuật toán di truyền, và học tăng cường, để thu được những lời giải tối ưu cục bộ khả dụng trong thời gian hạn chế.</p>

`,
    originalContent: `
# Characteristics of Dynamic Programming Problems

In the previous section, we learned how dynamic programming solves the original problem by decomposing it into subproblems. In fact, subproblem decomposition is a general algorithmic approach, with different emphases in divide and conquer, dynamic programming, and backtracking.

- Divide and conquer algorithms recursively divide the original problem into multiple independent subproblems until the smallest subproblems are reached, and merge the solutions to the subproblems during backtracking to ultimately obtain the solution to the original problem.
- Dynamic programming also recursively decomposes problems, but the main difference from divide and conquer algorithms is that subproblems in dynamic programming are interdependent, and many overlapping subproblems appear during the decomposition process.
- Backtracking algorithms enumerate all possible solutions through trial and error, and avoid unnecessary search branches through pruning. The solution to the original problem consists of a series of decision steps, and we can regard the subsequence before each decision step as a subproblem.

In fact, dynamic programming is commonly used to solve optimization problems, which not only contain overlapping subproblems but also have two other major characteristics: optimal substructure and no aftereffects.

## Optimal Substructure

We make a slight modification to the stair climbing problem to make it more suitable for demonstrating the concept of optimal substructure.

!!! question "Climbing stairs with minimum cost"

    Given a staircase, you can climb $1$ or $2$ steps at a time, and each step is labeled with a non-negative integer representing the cost of stepping on it. Given a non-negative integer array $cost$, where $cost[i]$ represents the cost of the $i$-th step and $cost[0]$ is the ground (starting point), what is the minimum cost required to reach the top?

As shown in the figure below, if the costs of the $1$st, $2$nd, and $3$rd steps are $1$, $10$, and $1$ respectively, then climbing from the ground to the $3$rd step requires a minimum cost of $2$.

![Minimum cost to climb to the 3rd step](dp_problem_features.assets/min_cost_cs_example.png)

Let $dp[i]$ be the accumulated cost of climbing to the $i$-th step. Since the $i$-th step can only come from the $i-1$-th or $i-2$-th step, $dp[i]$ can only equal $dp[i-1] + cost[i]$ or $dp[i-2] + cost[i]$. To minimize the cost, we should choose the smaller of the two:

$$
dp[i] = \\min(dp[i-1], dp[i-2]) + cost[i]
$$

This leads us to the meaning of optimal substructure: **the optimal solution to the original problem is constructed from the optimal solutions to the subproblems**.

This problem clearly has optimal substructure: we select the better one from the optimal solutions to the two subproblems $dp[i-1]$ and $dp[i-2]$, and use it to construct the optimal solution to the original problem $dp[i]$.

So, does the stair climbing problem from the previous section have optimal substructure? Its goal is to find the number of ways, which seems to be a counting problem, but if we change the question: "Find the maximum number of ways". We surprisingly discover that **although the problem before and after modification are equivalent, the optimal substructure has emerged**: the maximum number of ways for the $n$-th step equals the sum of the maximum number of ways for the $n-1$-th and $n-2$-th steps. Therefore, the interpretation of optimal substructure is quite flexible and will have different meanings in different problems.

According to the state transition equation and the initial states $dp[1] = cost[1]$ and $dp[2] = cost[2]$, we can obtain the dynamic programming code:

\`\`\`src
[file]{min_cost_climbing_stairs_dp}-[class]{}-[func]{min_cost_climbing_stairs_dp}
\`\`\`

The figure below shows the dynamic programming process for the above code.

![Dynamic programming process for climbing stairs with minimum cost](dp_problem_features.assets/min_cost_cs_dp.png)

This problem can also be space-optimized, compressing from one dimension to zero, reducing the space complexity from $O(n)$ to $O(1)$:

\`\`\`src
[file]{min_cost_climbing_stairs_dp}-[class]{}-[func]{min_cost_climbing_stairs_dp_comp}
\`\`\`

## No Aftereffects

No aftereffects is one of the important characteristics that enable dynamic programming to solve problems effectively. Its definition is: **given a certain state, its future development is only related to the current state and has nothing to do with all past states**.

Taking the stair climbing problem as an example, given state $i$, it will develop into states $i+1$ and $i+2$, corresponding to jumping $1$ step and jumping $2$ steps, respectively. When making these two choices, we do not need to consider the states before state $i$, as they have no effect on the future of state $i$.

However, if we add a constraint to the stair climbing problem, the situation changes.

!!! question "Climbing stairs with constraint"

    Given a staircase with $n$ steps, where you can climb $1$ or $2$ steps at a time, **but you cannot jump $1$ step in two consecutive rounds**. How many ways are there to climb to the top?

As shown in the figure below, there are only $2$ feasible ways to climb to the $3$rd step. The path with three consecutive $1$-step jumps does not satisfy the constraint and is therefore discarded.

![Number of ways to climb to the 3rd step with constraint](dp_problem_features.assets/climbing_stairs_constraint_example.png)

In this problem, if the previous round was a jump of $1$ step, then the next round must jump $2$ steps. This means that **the next choice cannot be determined solely by the current state (current stair step number), but also depends on the previous state (the stair step number from the previous round)**.

It is not difficult to see that this problem no longer satisfies no aftereffects, and the state transition equation $dp[i] = dp[i-1] + dp[i-2]$ also fails, because $dp[i-1]$ represents jumping $1$ step in this round, but it includes many solutions where "the previous round was a jump of $1$ step", which cannot be directly counted in $dp[i]$ to satisfy the constraint.

For this reason, we need to expand the state definition: **state $[i, j]$ represents being on the $i$-th step with the previous round having jumped $j$ steps**, where $j \\in \\{1, 2\\}$. This state definition effectively distinguishes whether the previous round was a jump of $1$ step or $2$ steps, allowing us to determine where the current state came from.

- When the previous round jumped $1$ step, the round before that could only choose to jump $2$ steps, i.e., $dp[i, 1]$ can only transition from $dp[i-1, 2]$.
- When the previous round jumped $2$ steps, the round before that could choose to jump $1$ step or $2$ steps, i.e., $dp[i, 2]$ can transition from $dp[i-2, 1]$ or $dp[i-2, 2]$.

As shown in the figure below, under this definition, $dp[i, j]$ represents the number of ways for state $[i, j]$. The state transition equation is then:

$$
\\begin{cases}
dp[i, 1] = dp[i-1, 2] \\\\
dp[i, 2] = dp[i-2, 1] + dp[i-2, 2]
\\end{cases}
$$

![Recurrence relation considering constraints](dp_problem_features.assets/climbing_stairs_constraint_state_transfer.png)

Finally, return $dp[n, 1] + dp[n, 2]$, where the sum of the two represents the total number of ways to climb to the $n$-th step:

\`\`\`src
[file]{climbing_stairs_constraint_dp}-[class]{}-[func]{climbing_stairs_constraint_dp}
\`\`\`

In the above case, since we only need to consider one more preceding state, we can still make the problem satisfy no aftereffects by expanding the state definition. However, some problems have very severe "aftereffects".

!!! question "Climbing stairs with obstacle generation"

    Given a staircase with $n$ steps, where you can climb $1$ or $2$ steps at a time. **Whenever you reach the $i$-th step, the system automatically places an obstacle on the $2i$-th step, and no subsequent round is allowed to jump to the $2i$-th step**. For example, if the first two rounds jump to the $2$nd and $3$rd steps, then afterwards you cannot jump to the $4$th and $6$th steps. How many ways are there to climb to the top?

In this problem, the next jump depends on all past states, because each jump places obstacles on higher steps, affecting future jumps. For such problems, dynamic programming is often difficult to solve.

In fact, many complex combinatorial optimization problems (such as the traveling salesman problem) do not satisfy no aftereffects. For such problems, we usually use other methods, such as heuristic search, genetic algorithms, and reinforcement learning, to obtain usable locally optimal solutions within a limited time.
`
  },

  'dsa-dp-pipeline': {
    title: '14.3 Quy trình giải bài toán DP',
    summary: 'Cách nhận diện và thiết lập công thức Quy hoạch động qua 3 bước, minh họa bằng bài toán Đường đi có tổng nhỏ nhất (Minimum Path Sum).',
    tags: ['dsa', 'dynamic-programming', 'framework', 'minimum-path-sum'],
    domain: 'Algorithms',
    module: 'Chương 14: Quy hoạch động',
    prerequisites: ['dsa-dp-features'],
    related: ['dsa-knapsack'],
    updatedAt: '2026-07-19',
    readTime: '15 phút',
    content: `

<p>Hai phần trước đã giới thiệu các đặc trưng chính của bài toán quy hoạch động. Tiếp theo, hãy cùng khám phá thêm hai vấn đề thực tiễn hơn.</p>

<ol>
  <li>Làm sao để xác định một bài toán có phải là bài toán quy hoạch động không?</li>
  <li>Quy trình đầy đủ để giải một bài toán quy hoạch động là gì, và nên bắt đầu từ đâu?</li>
</ol>

<h2>Nhận diện bài toán</h2>

<p>Nói chung, nếu một bài toán chứa các bài toán con chồng chéo, cấu trúc con tối ưu, và thỏa mãn tính không có hậu quả, thì nó thường phù hợp để giải bằng quy hoạch động. Tuy nhiên, rất khó để trực tiếp trích xuất những đặc trưng này từ mô tả bài toán. Do đó, ta thường nới lỏng điều kiện và <strong>trước tiên quan sát xem bài toán có phù hợp để giải bằng quay lui (tìm kiếm vét cạn) không</strong>.</p>

<p><strong>Những bài toán phù hợp để giải bằng quay lui thường thỏa mãn "mô hình cây quyết định"</strong>, nghĩa là bài toán có thể được mô tả bằng một cấu trúc cây, trong đó mỗi nút đại diện cho một quyết định và mỗi đường đi đại diện cho một chuỗi quyết định.</p>

<p>Nói cách khác, nếu một bài toán chứa khái niệm quyết định tường minh, và lời giải được sinh ra thông qua một chuỗi quyết định, thì nó thỏa mãn mô hình cây quyết định và thường có thể giải bằng quay lui.</p>

<p>Trên cơ sở đó, các bài toán quy hoạch động cũng có một số dấu hiệu tích cực.</p>

<ul>
  <li>Bài toán chứa những mô tả như lớn nhất (nhỏ nhất) hoặc nhiều nhất (ít nhất), cho thấy đây là bài toán tối ưu hóa.</li>
  <li>Trạng thái của bài toán có thể được biểu diễn bằng một danh sách, ma trận đa chiều, hoặc cây, và một trạng thái có quan hệ truy hồi với các trạng thái xung quanh nó.</li>
</ul>

<p>Tương ứng, cũng có một số dấu hiệu tiêu cực.</p>

<ul>
  <li>Mục tiêu của bài toán là tìm tất cả lời giải khả thi, thay vì tìm lời giải tối ưu.</li>
  <li>Mô tả bài toán có đặc trưng hoán vị và tổ hợp rõ ràng, yêu cầu trả về nhiều lời giải cụ thể.</li>
</ul>

<p>Nếu một bài toán thỏa mãn mô hình cây quyết định và có những dấu hiệu tích cực tương đối rõ ràng, ta có thể giả định nó là bài toán quy hoạch động và xác minh giả định đó trong quá trình giải.</p>

<h2>Các bước giải bài toán</h2>

<p>Quy trình giải bài toán quy hoạch động khác nhau tùy theo bản chất và độ khó của bài toán, nhưng nhìn chung tuân theo các bước sau: mô tả quyết định, định nghĩa trạng thái, thiết lập bảng $dp$, suy ra phương trình chuyển trạng thái, xác định điều kiện biên, v.v.</p>

<p>Để minh họa các bước giải một cách sinh động hơn, ta dùng một bài toán kinh điển "tổng đường đi nhỏ nhất" làm ví dụ.</p>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một lưới hai chiều $n \times m$ <code>grid</code> trong đó mỗi ô chứa một số nguyên không âm đại diện cho chi phí của nó, một robot bắt đầu từ ô trên-trái và chỉ có thể di chuyển xuống hoặc sang phải ở mỗi bước cho đến khi đến ô dưới-phải. Trả về tổng đường đi nhỏ nhất từ trên-trái đến dưới-phải.</p>
  </div>
</div>

<p>Hình dưới đây cho thấy một ví dụ trong đó tổng đường đi nhỏ nhất cho lưới đã cho là $13$.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/min_path_sum_example.png" alt="Dữ liệu ví dụ về tổng đường đi nhỏ nhất" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p><strong>Bước 1: Suy nghĩ về các quyết định ở mỗi vòng, định nghĩa trạng thái, và từ đó thu được bảng $dp$</strong></p>

<p>Quyết định ở mỗi vòng của bài toán này là di chuyển một bước xuống hoặc sang phải từ ô hiện tại. Gọi chỉ số hàng và cột của ô hiện tại là $[i, j]$. Sau khi di chuyển xuống hoặc sang phải, chỉ số trở thành $[i+1, j]$ hoặc $[i, j+1]$. Do đó, trạng thái nên bao gồm hai biến, chỉ số hàng và chỉ số cột, ký hiệu là $[i, j]$.</p>

<p>Trạng thái $[i, j]$ tương ứng với bài toán con: <strong>tổng đường đi nhỏ nhất từ điểm xuất phát $[0, 0]$ đến $[i, j]$</strong>, ký hiệu là $dp[i, j]$.</p>

<p>Từ đó, ta thu được ma trận $dp$ hai chiều như hình dưới đây, có kích thước giống với lưới đầu vào $grid$.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/min_path_sum_solution_state_definition.png" alt="Định nghĩa trạng thái và bảng dp" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<div class="callout callout-note">
  <span class="callout-icon">📝</span>
  <div class="callout-body">
    <p>Các quá trình quy hoạch động và quay lui có thể được mô tả như một chuỗi quyết định, và trạng thái bao gồm tất cả các biến quyết định. Nó nên chứa tất cả các biến mô tả tiến trình giải bài toán, và chứa đủ thông tin để suy ra trạng thái tiếp theo.</p>
    <p>Mỗi trạng thái tương ứng với một bài toán con, và ta định nghĩa một bảng $dp$ để lưu lời giải của tất cả các bài toán con. Mỗi biến độc lập của trạng thái là một chiều của bảng $dp$. Về bản chất, bảng $dp$ là một ánh xạ giữa các trạng thái và lời giải của các bài toán con.</p>
  </div>
</div>

<p><strong>Bước 2: Xác định cấu trúc con tối ưu, rồi suy ra phương trình chuyển trạng thái</strong></p>

<p>Với trạng thái $[i, j]$, nó chỉ có thể chuyển từ ô phía trên $[i-1, j]$ hoặc ô bên trái $[i, j-1]$. Do đó, cấu trúc con tối ưu là: tổng đường đi nhỏ nhất để đến $[i, j]$ được xác định bởi giá trị nhỏ hơn trong tổng đường đi nhỏ nhất của $[i, j-1]$ và $[i-1, j]$.</p>

<p>Dựa trên phân tích trên, ta có thể suy ra phương trình chuyển trạng thái như hình dưới đây:</p>

<p>$$dp[i, j] = \min(dp[i-1, j], dp[i, j-1]) + grid[i, j]$$</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/min_path_sum_solution_state_transition.png" alt="Cấu trúc con tối ưu và phương trình chuyển trạng thái" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<div class="callout callout-note">
  <span class="callout-icon">📝</span>
  <div class="callout-body">
    <p>Dựa trên bảng $dp$ đã định nghĩa, hãy suy nghĩ về mối quan hệ giữa bài toán gốc và các bài toán con, và tìm cách xây dựng lời giải tối ưu của bài toán gốc từ lời giải tối ưu của các bài toán con, đó chính là cấu trúc con tối ưu.</p>
    <p>Sau khi xác định được cấu trúc con tối ưu, ta có thể dùng nó để xây dựng phương trình chuyển trạng thái.</p>
  </div>
</div>

<p><strong>Bước 3: Xác định điều kiện biên và thứ tự chuyển trạng thái</strong></p>

<p>Trong bài toán này, các trạng thái ở hàng đầu tiên chỉ có thể đến từ trạng thái bên trái của chúng, và các trạng thái ở cột đầu tiên chỉ có thể đến từ trạng thái phía trên chúng. Do đó, hàng đầu tiên $i = 0$ và cột đầu tiên $j = 0$ là các điều kiện biên.</p>

<p>Như hình dưới đây, vì mỗi ô chuyển từ ô bên trái và ô phía trên nó, ta dùng vòng lặp để duyệt ma trận, với vòng lặp ngoài duyệt hàng và vòng lặp trong duyệt cột.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/min_path_sum_solution_initial_state.png" alt="Điều kiện biên và thứ tự chuyển trạng thái" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<div class="callout callout-note">
  <span class="callout-icon">📝</span>
  <div class="callout-body">
    <p>Điều kiện biên trong quy hoạch động được dùng để khởi tạo bảng $dp$, trong khi ở tìm kiếm chúng được dùng để cắt tỉa.</p>
    <p>Cốt lõi của thứ tự chuyển trạng thái là đảm bảo rằng khi tính lời giải của bài toán hiện tại, tất cả các bài toán con nhỏ hơn mà nó phụ thuộc vào đã được tính đúng.</p>
  </div>
</div>

<p>Dựa trên phân tích trên, ta có thể viết trực tiếp mã quy hoạch động. Tuy nhiên, phân rã bài toán con là một cách tiếp cận từ trên xuống, vì vậy triển khai theo thứ tự "tìm kiếm vét cạn $\rightarrow$ đệ quy có nhớ $\rightarrow$ quy hoạch động" sẽ phù hợp hơn với thói quen tư duy.</p>

<h3>Cách 1: Tìm kiếm vét cạn</h3>

<p>Bắt đầu từ trạng thái $[i, j]$, ta liên tục phân rã nó thành các trạng thái nhỏ hơn $[i-1, j]$ và $[i, j-1]$. Hàm đệ quy bao gồm các yếu tố sau.</p>

<ul>
  <li><strong>Tham số đệ quy</strong>: trạng thái $[i, j]$.</li>
  <li><strong>Giá trị trả về</strong>: tổng đường đi nhỏ nhất từ $[0, 0]$ đến $[i, j]$, tức là $dp[i, j]$.</li>
  <li><strong>Điều kiện dừng</strong>: khi $i = 0$ và $j = 0$, trả về chi phí $grid[0, 0]$.</li>
  <li><strong>Cắt tỉa</strong>: khi $i < 0$ hoặc $j < 0$, chỉ số vượt biên, trả về chi phí $+\infty$, đại diện cho tính bất khả thi.</li>
</ul>

<p>Mã triển khai như sau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def min_path_sum_dfs(grid: list[list[int]], i: int, j: int) -&gt; int:
    """Tổng đường đi nhỏ nhất: Tìm kiếm vét cạn"""
    # Nếu là ô trên-trái, dừng tìm kiếm
    if i == 0 and j == 0:
        return grid[0][0]
    # Nếu chỉ số hàng hoặc cột vượt biên, trả về chi phí +∞
    if i &lt; 0 or j &lt; 0:
        return inf
    # Tính chi phí đường đi nhỏ nhất từ trên-trái đến (i-1, j) và (i, j-1)
    up = min_path_sum_dfs(grid, i - 1, j)
    left = min_path_sum_dfs(grid, i, j - 1)
    # Trả về chi phí đường đi nhỏ nhất từ trên-trái đến (i, j)
    return min(left, up) + grid[i][j]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tổng đường đi nhỏ nhất: Tìm kiếm vét cạn */
int minPathSumDFS(vector&lt;vector&lt;int&gt;&gt; &amp;grid, int i, int j) {
    // Nếu là ô trên-trái, dừng tìm kiếm
    if (i == 0 &amp;&amp; j == 0) {
        return grid[0][0];
    }
    // Nếu chỉ số hàng hoặc cột vượt biên, trả về chi phí +∞
    if (i &lt; 0 || j &lt; 0) {
        return INT_MAX;
    }
    // Tính chi phí đường đi nhỏ nhất từ trên-trái đến (i-1, j) và (i, j-1)
    int up = minPathSumDFS(grid, i - 1, j);
    int left = minPathSumDFS(grid, i, j - 1);
    // Trả về chi phí đường đi nhỏ nhất từ trên-trái đến (i, j)
    return min(left, up) != INT_MAX ? min(left, up) + grid[i][j] : INT_MAX;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Tổng đường đi nhỏ nhất: Tìm kiếm vét cạn */
static int minPathSumDFS(int[][] grid, int i, int j) {
    // Nếu là ô trên-trái, dừng tìm kiếm
    if (i == 0 &amp;&amp; j == 0) {
        return grid[0][0];
    }
    // Nếu chỉ số hàng hoặc cột vượt biên, trả về chi phí +∞
    if (i &lt; 0 || j &lt; 0) {
        return Integer.MAX_VALUE;
    }
    // Tính chi phí đường đi nhỏ nhất từ trên-trái đến (i-1, j) và (i, j-1)
    int up = minPathSumDFS(grid, i - 1, j);
    int left = minPathSumDFS(grid, i, j - 1);
    // Trả về chi phí đường đi nhỏ nhất từ trên-trái đến (i, j)
    return Math.min(left, up) + grid[i][j];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Tổng đường đi nhỏ nhất: Tìm kiếm vét cạn */
function minPathSumDFS(grid, i, j) {
    // Nếu là ô trên-trái, dừng tìm kiếm
    if (i === 0 &amp;&amp; j === 0) {
        return grid[0][0];
    }
    // Nếu chỉ số hàng hoặc cột vượt biên, trả về chi phí +∞
    if (i &lt; 0 || j &lt; 0) {
        return Infinity;
    }
    // Tính chi phí đường đi nhỏ nhất từ trên-trái đến (i-1, j) và (i, j-1)
    const up = minPathSumDFS(grid, i - 1, j);
    const left = minPathSumDFS(grid, i, j - 1);
    // Trả về chi phí đường đi nhỏ nhất từ trên-trái đến (i, j)
    return Math.min(left, up) + grid[i][j];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Tổng đường đi nhỏ nhất: Tìm kiếm vét cạn */
fun minPathSumDFS(grid: Array&lt;IntArray&gt;, i: Int, j: Int): Int {
    // Nếu là ô trên-trái, dừng tìm kiếm
    if (i == 0 &amp;&amp; j == 0) {
        return grid[0][0]
    }
    // Nếu chỉ số hàng hoặc cột vượt biên, trả về chi phí +∞
    if (i &lt; 0 || j &lt; 0) {
        return Int.MAX_VALUE
    }
    // Tính chi phí đường đi nhỏ nhất từ trên-trái đến (i-1, j) và (i, j-1)
    val up = minPathSumDFS(grid, i - 1, j)
    val left = minPathSumDFS(grid, i, j - 1)
    // Trả về chi phí đường đi nhỏ nhất từ trên-trái đến (i, j)
    return min(left, up) + grid[i][j]
}</code></pre></div></div></div>

<p>Hình dưới đây cho thấy cây đệ quy có gốc là $dp[2, 1]$, bao gồm một số bài toán con chồng chéo, số lượng của chúng sẽ tăng mạnh khi kích thước của lưới <code>grid</code> tăng lên.</p>

<p>Về bản chất, lý do gây ra các bài toán con chồng chéo là: <strong>có nhiều đường đi từ góc trên-trái để đến một ô nhất định</strong>.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/min_path_sum_dfs.png" alt="Cây đệ quy tìm kiếm vét cạn" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Mỗi trạng thái có hai lựa chọn, xuống và sang phải, vì vậy tổng số bước từ góc trên-trái đến góc dưới-phải là $m + n - 2$, dẫn đến độ phức tạp thời gian trong trường hợp xấu nhất là $O(2^{m+n})$, trong đó $n$ và $m$ lần lượt là số hàng và số cột của lưới. Lưu ý rằng phép tính này không tính đến các tình huống gần biên của lưới, nơi chỉ còn lại một lựa chọn khi đến biên của lưới, vì vậy số đường đi thực tế sẽ ít hơn phần nào.</p>

<h3>Cách 2: Đệ quy có nhớ</h3>

<p>Ta giới thiệu một danh sách ghi nhớ <code>mem</code> có cùng kích thước với lưới <code>grid</code> để ghi lại lời giải của các bài toán con và cắt tỉa các bài toán con chồng chéo:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def min_path_sum_dfs_mem(
    grid: list[list[int]], mem: list[list[int]], i: int, j: int
) -&gt; int:
    """Tổng đường đi nhỏ nhất: Tìm kiếm có nhớ"""
    # Nếu là ô trên-trái, dừng tìm kiếm
    if i == 0 and j == 0:
        return grid[0][0]
    # Nếu chỉ số hàng hoặc cột vượt biên, trả về chi phí +∞
    if i &lt; 0 or j &lt; 0:
        return inf
    # Nếu đã có bản ghi, trả về luôn
    if mem[i][j] != -1:
        return mem[i][j]
    # Chi phí đường đi nhỏ nhất của ô bên trái và ô phía trên
    up = min_path_sum_dfs_mem(grid, mem, i - 1, j)
    left = min_path_sum_dfs_mem(grid, mem, i, j - 1)
    # Ghi lại và trả về chi phí đường đi nhỏ nhất từ trên-trái đến (i, j)
    mem[i][j] = min(left, up) + grid[i][j]
    return mem[i][j]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tổng đường đi nhỏ nhất: Tìm kiếm có nhớ */
int minPathSumDFSMem(vector&lt;vector&lt;int&gt;&gt; &amp;grid, vector&lt;vector&lt;int&gt;&gt; &amp;mem, int i, int j) {
    // Nếu là ô trên-trái, dừng tìm kiếm
    if (i == 0 &amp;&amp; j == 0) {
        return grid[0][0];
    }
    // Nếu chỉ số hàng hoặc cột vượt biên, trả về chi phí +∞
    if (i &lt; 0 || j &lt; 0) {
        return INT_MAX;
    }
    // Nếu đã có bản ghi, trả về luôn
    if (mem[i][j] != -1) {
        return mem[i][j];
    }
    // Chi phí đường đi nhỏ nhất của ô bên trái và ô phía trên
    int up = minPathSumDFSMem(grid, mem, i - 1, j);
    int left = minPathSumDFSMem(grid, mem, i, j - 1);
    // Ghi lại và trả về chi phí đường đi nhỏ nhất từ trên-trái đến (i, j)
    mem[i][j] = min(left, up) != INT_MAX ? min(left, up) + grid[i][j] : INT_MAX;
    return mem[i][j];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Tổng đường đi nhỏ nhất: Tìm kiếm có nhớ */
static int minPathSumDFSMem(int[][] grid, int[][] mem, int i, int j) {
    // Nếu là ô trên-trái, dừng tìm kiếm
    if (i == 0 &amp;&amp; j == 0) {
        return grid[0][0];
    }
    // Nếu chỉ số hàng hoặc cột vượt biên, trả về chi phí +∞
    if (i &lt; 0 || j &lt; 0) {
        return Integer.MAX_VALUE;
    }
    // Nếu đã có bản ghi, trả về luôn
    if (mem[i][j] != -1) {
        return mem[i][j];
    }
    // Chi phí đường đi nhỏ nhất của ô bên trái và ô phía trên
    int up = minPathSumDFSMem(grid, mem, i - 1, j);
    int left = minPathSumDFSMem(grid, mem, i, j - 1);
    // Ghi lại và trả về chi phí đường đi nhỏ nhất từ trên-trái đến (i, j)
    mem[i][j] = Math.min(left, up) + grid[i][j];
    return mem[i][j];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Tổng đường đi nhỏ nhất: Tìm kiếm có nhớ */
function minPathSumDFSMem(grid, mem, i, j) {
    // Nếu là ô trên-trái, dừng tìm kiếm
    if (i === 0 &amp;&amp; j === 0) {
        return grid[0][0];
    }
    // Nếu chỉ số hàng hoặc cột vượt biên, trả về chi phí +∞
    if (i &lt; 0 || j &lt; 0) {
        return Infinity;
    }
    // Nếu đã có bản ghi, trả về luôn
    if (mem[i][j] !== -1) {
        return mem[i][j];
    }
    // Chi phí đường đi nhỏ nhất của ô bên trái và ô phía trên
    const up = minPathSumDFSMem(grid, mem, i - 1, j);
    const left = minPathSumDFSMem(grid, mem, i, j - 1);
    // Ghi lại và trả về chi phí đường đi nhỏ nhất từ trên-trái đến (i, j)
    mem[i][j] = Math.min(left, up) + grid[i][j];
    return mem[i][j];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Tổng đường đi nhỏ nhất: Tìm kiếm có nhớ */
fun minPathSumDFSMem(
    grid: Array&lt;IntArray&gt;,
    mem: Array&lt;IntArray&gt;,
    i: Int,
    j: Int
): Int {
    // Nếu là ô trên-trái, dừng tìm kiếm
    if (i == 0 &amp;&amp; j == 0) {
        return grid[0][0]
    }
    // Nếu chỉ số hàng hoặc cột vượt biên, trả về chi phí +∞
    if (i &lt; 0 || j &lt; 0) {
        return Int.MAX_VALUE
    }
    // Nếu đã có bản ghi, trả về luôn
    if (mem[i][j] != -1) {
        return mem[i][j]
    }
    // Chi phí đường đi nhỏ nhất của ô bên trái và ô phía trên
    val up = minPathSumDFSMem(grid, mem, i - 1, j)
    val left = minPathSumDFSMem(grid, mem, i, j - 1)
    // Ghi lại và trả về chi phí đường đi nhỏ nhất từ trên-trái đến (i, j)
    mem[i][j] = min(left, up) + grid[i][j]
    return mem[i][j]
}</code></pre></div></div></div>

<p>Như hình dưới đây, sau khi giới thiệu đệ quy có nhớ, tất cả lời giải bài toán con chỉ cần được tính một lần, vì vậy độ phức tạp thời gian phụ thuộc vào tổng số trạng thái, tức là kích thước lưới $O(nm)$.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/min_path_sum_dfs_mem.png" alt="Cây đệ quy đệ quy có nhớ" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>Cách 3: Quy hoạch động</h3>

<p>Triển khai lời giải quy hoạch động dựa trên vòng lặp, như đoạn mã dưới đây:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def min_path_sum_dp(grid: list[list[int]]) -&gt; int:
    """Tổng đường đi nhỏ nhất: Quy hoạch động"""
    n, m = len(grid), len(grid[0])
    # Khởi tạo bảng dp
    dp = [[0] * m for _ in range(n)]
    dp[0][0] = grid[0][0]
    # Chuyển trạng thái: hàng đầu tiên
    for j in range(1, m):
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    # Chuyển trạng thái: cột đầu tiên
    for i in range(1, n):
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    # Chuyển trạng thái: các hàng và cột còn lại
    for i in range(1, n):
        for j in range(1, m):
            dp[i][j] = min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j]
    return dp[n - 1][m - 1]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tổng đường đi nhỏ nhất: Quy hoạch động */
int minPathSumDP(vector&lt;vector&lt;int&gt;&gt; &amp;grid) {
    int n = grid.size(), m = grid[0].size();
    // Khởi tạo bảng dp
    vector&lt;vector&lt;int&gt;&gt; dp(n, vector&lt;int&gt;(m));
    dp[0][0] = grid[0][0];
    // Chuyển trạng thái: hàng đầu tiên
    for (int j = 1; j &lt; m; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    // Chuyển trạng thái: cột đầu tiên
    for (int i = 1; i &lt; n; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    // Chuyển trạng thái: các hàng và cột còn lại
    for (int i = 1; i &lt; n; i++) {
        for (int j = 1; j &lt; m; j++) {
            dp[i][j] = min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j];
        }
    }
    return dp[n - 1][m - 1];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Tổng đường đi nhỏ nhất: Quy hoạch động */
static int minPathSumDP(int[][] grid) {
    int n = grid.length, m = grid[0].length;
    // Khởi tạo bảng dp
    int[][] dp = new int[n][m];
    dp[0][0] = grid[0][0];
    // Chuyển trạng thái: hàng đầu tiên
    for (int j = 1; j &lt; m; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    // Chuyển trạng thái: cột đầu tiên
    for (int i = 1; i &lt; n; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    // Chuyển trạng thái: các hàng và cột còn lại
    for (int i = 1; i &lt; n; i++) {
        for (int j = 1; j &lt; m; j++) {
            dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j];
        }
    }
    return dp[n - 1][m - 1];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Tổng đường đi nhỏ nhất: Quy hoạch động */
function minPathSumDP(grid) {
    const n = grid.length,
        m = grid[0].length;
    // Khởi tạo bảng dp
    const dp = Array.from({ length: n }, () =&gt;
        Array.from({ length: m }, () =&gt; 0)
    );
    dp[0][0] = grid[0][0];
    // Chuyển trạng thái: hàng đầu tiên
    for (let j = 1; j &lt; m; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    // Chuyển trạng thái: cột đầu tiên
    for (let i = 1; i &lt; n; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    // Chuyển trạng thái: các hàng và cột còn lại
    for (let i = 1; i &lt; n; i++) {
        for (let j = 1; j &lt; m; j++) {
            dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j];
        }
    }
    return dp[n - 1][m - 1];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Tổng đường đi nhỏ nhất: Quy hoạch động */
fun minPathSumDP(grid: Array&lt;IntArray&gt;): Int {
    val n = grid.size
    val m = grid[0].size
    // Khởi tạo bảng dp
    val dp = Array(n) { IntArray(m) }
    dp[0][0] = grid[0][0]
    // Chuyển trạng thái: hàng đầu tiên
    for (j in 1..&lt;m) {
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    }
    // Chuyển trạng thái: cột đầu tiên
    for (i in 1..&lt;n) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }
    // Chuyển trạng thái: các hàng và cột còn lại
    for (i in 1..&lt;n) {
        for (j in 1..&lt;m) {
            dp[i][j] = min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j]
        }
    }
    return dp[n - 1][m - 1]
}</code></pre></div></div></div>

<p>Hình dưới đây cho thấy quá trình chuyển trạng thái cho tổng đường đi nhỏ nhất, duyệt toàn bộ lưới, <strong>vì vậy độ phức tạp thời gian là $O(nm)$</strong>.</p>

<p>Mảng <code>dp</code> có kích thước $n \times m$, <strong>vì vậy độ phức tạp không gian là $O(nm)$</strong>.</p>

<div class="interactive-widget-wrapper" id="min-path-sum-steps-wrapper"><div class="slider-container"><div class="slide active"><img src="dsa-assets/min_path_sum_dp_step1.png" alt="Bước 1: điền bảng dp theo quy hoạch động" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 1: điền bảng dp theo quy hoạch động</p></div><div class="slide"><img src="dsa-assets/min_path_sum_dp_step2.png" alt="Bước 2: điền bảng dp theo quy hoạch động" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 2: điền bảng dp theo quy hoạch động</p></div><div class="slide"><img src="dsa-assets/min_path_sum_dp_step3.png" alt="Bước 3: điền bảng dp theo quy hoạch động" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 3: điền bảng dp theo quy hoạch động</p></div><div class="slide"><img src="dsa-assets/min_path_sum_dp_step4.png" alt="Bước 4: điền bảng dp theo quy hoạch động" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 4: điền bảng dp theo quy hoạch động</p></div><div class="slide"><img src="dsa-assets/min_path_sum_dp_step5.png" alt="Bước 5: điền bảng dp theo quy hoạch động" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 5: điền bảng dp theo quy hoạch động</p></div><div class="slide"><img src="dsa-assets/min_path_sum_dp_step6.png" alt="Bước 6: điền bảng dp theo quy hoạch động" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 6: điền bảng dp theo quy hoạch động</p></div><div class="slide"><img src="dsa-assets/min_path_sum_dp_step7.png" alt="Bước 7: điền bảng dp theo quy hoạch động" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 7: điền bảng dp theo quy hoạch động</p></div><div class="slide"><img src="dsa-assets/min_path_sum_dp_step8.png" alt="Bước 8: điền bảng dp theo quy hoạch động" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 8: điền bảng dp theo quy hoạch động</p></div><div class="slide"><img src="dsa-assets/min_path_sum_dp_step9.png" alt="Bước 9: điền bảng dp theo quy hoạch động" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 9: điền bảng dp theo quy hoạch động</p></div><div class="slide"><img src="dsa-assets/min_path_sum_dp_step10.png" alt="Bước 10: điền bảng dp theo quy hoạch động" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 10: điền bảng dp theo quy hoạch động</p></div><div class="slide"><img src="dsa-assets/min_path_sum_dp_step11.png" alt="Bước 11: điền bảng dp theo quy hoạch động" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 11: điền bảng dp theo quy hoạch động</p></div><div class="slide"><img src="dsa-assets/min_path_sum_dp_step12.png" alt="Bước 12: điền bảng dp theo quy hoạch động" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 12: điền bảng dp theo quy hoạch động</p></div><div class="slider-controls"><button onclick="prevSlide('min-path-sum-steps-wrapper')">◀ Trước</button><span class="slider-indicator">Bước 1 / 12</span><button onclick="nextSlide('min-path-sum-steps-wrapper')">Sau ▶</button></div></div></div>

<h3>Tối ưu Không gian</h3>

<p>Vì mỗi ô chỉ liên quan đến ô bên trái và ô phía trên nó, ta có thể dùng một mảng một hàng để triển khai bảng $dp$.</p>

<p>Lưu ý rằng vì mảng <code>dp</code> chỉ có thể đại diện cho trạng thái của một hàng, ta không thể khởi tạo trước trạng thái cột đầu tiên, mà phải cập nhật nó khi duyệt từng hàng:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def min_path_sum_dp_comp(grid: list[list[int]]) -&gt; int:
    """Tổng đường đi nhỏ nhất: Quy hoạch động tối ưu không gian"""
    n, m = len(grid), len(grid[0])
    # Khởi tạo bảng dp
    dp = [0] * m
    # Chuyển trạng thái: hàng đầu tiên
    dp[0] = grid[0][0]
    for j in range(1, m):
        dp[j] = dp[j - 1] + grid[0][j]
    # Chuyển trạng thái: các hàng còn lại
    for i in range(1, n):
        # Chuyển trạng thái: cột đầu tiên
        dp[0] = dp[0] + grid[i][0]
        # Chuyển trạng thái: các cột còn lại
        for j in range(1, m):
            dp[j] = min(dp[j - 1], dp[j]) + grid[i][j]
    return dp[m - 1]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tổng đường đi nhỏ nhất: Quy hoạch động tối ưu không gian */
int minPathSumDPComp(vector&lt;vector&lt;int&gt;&gt; &amp;grid) {
    int n = grid.size(), m = grid[0].size();
    // Khởi tạo bảng dp
    vector&lt;int&gt; dp(m);
    // Chuyển trạng thái: hàng đầu tiên
    dp[0] = grid[0][0];
    for (int j = 1; j &lt; m; j++) {
        dp[j] = dp[j - 1] + grid[0][j];
    }
    // Chuyển trạng thái: các hàng còn lại
    for (int i = 1; i &lt; n; i++) {
        // Chuyển trạng thái: cột đầu tiên
        dp[0] = dp[0] + grid[i][0];
        // Chuyển trạng thái: các cột còn lại
        for (int j = 1; j &lt; m; j++) {
            dp[j] = min(dp[j - 1], dp[j]) + grid[i][j];
        }
    }
    return dp[m - 1];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Tổng đường đi nhỏ nhất: Quy hoạch động tối ưu không gian */
static int minPathSumDPComp(int[][] grid) {
    int n = grid.length, m = grid[0].length;
    // Khởi tạo bảng dp
    int[] dp = new int[m];
    // Chuyển trạng thái: hàng đầu tiên
    dp[0] = grid[0][0];
    for (int j = 1; j &lt; m; j++) {
        dp[j] = dp[j - 1] + grid[0][j];
    }
    // Chuyển trạng thái: các hàng còn lại
    for (int i = 1; i &lt; n; i++) {
        // Chuyển trạng thái: cột đầu tiên
        dp[0] = dp[0] + grid[i][0];
        // Chuyển trạng thái: các cột còn lại
        for (int j = 1; j &lt; m; j++) {
            dp[j] = Math.min(dp[j - 1], dp[j]) + grid[i][j];
        }
    }
    return dp[m - 1];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Tổng đường đi nhỏ nhất: Quy hoạch động tối ưu không gian */
function minPathSumDPComp(grid) {
    const n = grid.length,
        m = grid[0].length;
    // Khởi tạo bảng dp
    const dp = new Array(m);
    // Chuyển trạng thái: hàng đầu tiên
    dp[0] = grid[0][0];
    for (let j = 1; j &lt; m; j++) {
        dp[j] = dp[j - 1] + grid[0][j];
    }
    // Chuyển trạng thái: các hàng còn lại
    for (let i = 1; i &lt; n; i++) {
        // Chuyển trạng thái: cột đầu tiên
        dp[0] = dp[0] + grid[i][0];
        // Chuyển trạng thái: các cột còn lại
        for (let j = 1; j &lt; m; j++) {
            dp[j] = Math.min(dp[j - 1], dp[j]) + grid[i][j];
        }
    }
    return dp[m - 1];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Tổng đường đi nhỏ nhất: Quy hoạch động tối ưu không gian */
fun minPathSumDPComp(grid: Array&lt;IntArray&gt;): Int {
    val n = grid.size
    val m = grid[0].size
    // Khởi tạo bảng dp
    val dp = IntArray(m)
    // Chuyển trạng thái: hàng đầu tiên
    dp[0] = grid[0][0]
    for (j in 1..&lt;m) {
        dp[j] = dp[j - 1] + grid[0][j]
    }
    // Chuyển trạng thái: các hàng còn lại
    for (i in 1..&lt;n) {
        // Chuyển trạng thái: cột đầu tiên
        dp[0] = dp[0] + grid[i][0]
        // Chuyển trạng thái: các cột còn lại
        for (j in 1..&lt;m) {
            dp[j] = min(dp[j - 1], dp[j]) + grid[i][j]
        }
    }
    return dp[m - 1]
}</code></pre></div></div></div>

<div class="interactive-widget-wrapper" id="min-path-sum-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'min-path-sum-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'min-path-sum-wrapper', 'tab-interactive'); initDpDemo('min-path-sum-wrapper', DP_FRAMES_MIN_PATH_SUM)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="color:var(--text-muted);font-size:14px;">Xem chuỗi hình minh họa tĩnh phía trên. Chuyển sang tab "Mô phỏng tương tác" để xem bảng <code>dp</code> 2 chiều được điền từng ô cho lưới ví dụ $4 \\times 4$.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="min-path-sum-wrapper-canvas"></div>
    <div class="simulator-controls" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
      <button id="min-path-sum-wrapper-btn-autorun" class="control-btn" onclick="autoRunDpDemo('min-path-sum-wrapper')">▶ Auto Run</button>
      <button id="min-path-sum-wrapper-btn-step" class="control-btn" onclick="stepDpDemo('min-path-sum-wrapper')">Bước tiếp theo ▶</button>
      <button id="min-path-sum-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunDpDemo('min-path-sum-wrapper')" disabled>⏸ Dừng</button>
      <button id="min-path-sum-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initDpDemo('min-path-sum-wrapper', DP_FRAMES_MIN_PATH_SUM)">↺ Reset</button>
    </div>
    <div style="margin-top:8px;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setDpDemoSpeed('min-path-sum-wrapper', this.value)" /> <span id="min-path-sum-wrapper-speed-label">700ms</span>
    </div>
    <div id="min-path-sum-wrapper-status" class="simulator-status" style="margin-top:8px;color:var(--text-secondary);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>

`,
    originalContent: `
# Dynamic Programming Problem-Solving Approach

The previous two sections introduced the main characteristics of dynamic programming problems. Next, let us explore two more practical issues together.

1. How to determine whether a problem is a dynamic programming problem?
2. What is the complete process for solving a dynamic programming problem, and where should we start?

## Problem Identification

Generally speaking, if a problem contains overlapping subproblems, optimal substructure, and satisfies no aftereffects, then it is usually suitable for solving with dynamic programming. However, it is difficult to directly extract these characteristics from the problem description. Therefore, we usually relax the conditions and **first observe whether the problem is suitable for solving with backtracking (exhaustive search)**.

**Problems suitable for solving with backtracking usually satisfy the "decision tree model"**, which means the problem can be described using a tree structure, where each node represents a decision and each path represents a sequence of decisions.

In other words, if a problem contains an explicit concept of decisions, and the solution is generated through a series of decisions, then it satisfies the decision tree model and can usually be solved using backtracking.

On this basis, dynamic programming problems also have some positive indicators.

- The problem contains descriptions such as maximum (minimum) or most (least), indicating optimization.
- The problem's state can be represented using a list, multi-dimensional matrix, or tree, and a state has a recurrence relation with its surrounding states.

Correspondingly, there are also some negative indicators.

- The goal of the problem is to find all possible solutions, rather than finding the optimal solution.
- The problem description has obvious permutation and combination characteristics, requiring the return of specific multiple solutions.

If a problem satisfies the decision tree model and has relatively obvious positive indicators, we can assume it is a dynamic programming problem and verify that assumption during the solving process.

## Problem-Solving Steps

The problem-solving process for dynamic programming varies depending on the nature and difficulty of the problem, but generally follows these steps: describe decisions, define states, establish the $dp$ table, derive state transition equations, determine boundary conditions, etc.

To illustrate the problem-solving steps more vividly, we use a classic problem "minimum path sum" as an example.

!!! question

    Given an $n \\times m$ two-dimensional grid \`grid\` in which each cell contains a non-negative integer representing its cost, a robot starts from the top-left cell and can only move down or right at each step until reaching the bottom-right cell. Return the minimum path sum from the top-left to the bottom-right.

The figure below shows an example where the minimum path sum for the given grid is $13$.

![Minimum path sum example data](dp_solution_pipeline.assets/min_path_sum_example.png)

**Step 1: Think about the decisions in each round, define the state, and thus obtain the $dp$ table**

The decision in each round of this problem is to move one step down or right from the current cell. Let the row and column indices of the current cell be $[i, j]$. After moving down or right, the indices become $[i+1, j]$ or $[i, j+1]$. Therefore, the state should include two variables, the row index and column index, denoted as $[i, j]$.

State $[i, j]$ corresponds to the subproblem: **the minimum path sum from the starting point $[0, 0]$ to $[i, j]$**, denoted as $dp[i, j]$.

From this, we obtain the two-dimensional $dp$ matrix shown in the figure below, whose size is the same as the input grid $grid$.

![State definition and dp table](dp_solution_pipeline.assets/min_path_sum_solution_state_definition.png)

!!! note

    The dynamic programming and backtracking processes can be described as a sequence of decisions, and the state consists of all decision variables. It should contain all variables describing the progress of problem-solving, and should contain sufficient information to derive the next state.

    Each state corresponds to a subproblem, and we define a $dp$ table to store the solutions to all subproblems. Each independent variable of the state is a dimension of the $dp$ table. Essentially, the $dp$ table is a mapping between states and solutions to subproblems.

**Step 2: Identify the optimal substructure, and then derive the state transition equation**

For state $[i, j]$, it can only transition from the cell above $[i-1, j]$ or the cell to the left $[i, j-1]$. Therefore, the optimal substructure is: the minimum path sum to reach $[i, j]$ is determined by the smaller of the minimum path sums of $[i, j-1]$ and $[i-1, j]$.

Based on the above analysis, the state transition equation shown in the figure below can be derived:

$$
dp[i, j] = \\min(dp[i-1, j], dp[i, j-1]) + grid[i, j]
$$

![Optimal substructure and state transition equation](dp_solution_pipeline.assets/min_path_sum_solution_state_transition.png)

!!! note

    Based on the defined $dp$ table, think about the relationship between the original problem and subproblems, and find the method to construct the optimal solution to the original problem from the optimal solutions to the subproblems, which is the optimal substructure.

    Once we identify the optimal substructure, we can use it to construct the state transition equation.

**Step 3: Determine boundary conditions and state transition order**

In this problem, states in the first row can only come from the state to their left, and states in the first column can only come from the state above them. Therefore, the first row $i = 0$ and first column $j = 0$ are boundary conditions.

As shown in the figure below, since each cell transitions from the cell to its left and the cell above it, we use loops to traverse the matrix, with the outer loop traversing rows and the inner loop traversing columns.

![Boundary conditions and state transition order](dp_solution_pipeline.assets/min_path_sum_solution_initial_state.png)

!!! note

    Boundary conditions in dynamic programming are used to initialize the $dp$ table, while in search they are used for pruning.

    The core of state transition order is to ensure that when computing the solution to the current problem, all the smaller subproblems it depends on have already been computed correctly.

Based on the above analysis, we can directly write the dynamic programming code. However, subproblem decomposition is a top-down approach, so implementing in the order "brute force search $\\rightarrow$ memoization $\\rightarrow$ dynamic programming" is more aligned with thinking habits.

### Method 1: Brute Force Search

Starting from state $[i, j]$, we continuously decompose it into smaller states $[i-1, j]$ and $[i, j-1]$. The recursive function includes the following elements.

- **Recursive parameters**: state $[i, j]$.
- **Return value**: minimum path sum from $[0, 0]$ to $[i, j]$, which is $dp[i, j]$.
- **Termination condition**: when $i = 0$ and $j = 0$, return cost $grid[0, 0]$.
- **Pruning**: when $i < 0$ or $j < 0$, the index is out of bounds, return cost $+\\infty$, representing infeasibility.

The implementation code is as follows:

\`\`\`src
[file]{min_path_sum}-[class]{}-[func]{min_path_sum_dfs}
\`\`\`

The figure below shows the recursion tree rooted at $dp[2, 1]$, which includes some overlapping subproblems whose number will increase sharply as the size of grid \`grid\` grows.

Essentially, the reason for overlapping subproblems is: **there are multiple paths from the top-left corner to reach a certain cell**.

![Brute force search recursion tree](dp_solution_pipeline.assets/min_path_sum_dfs.png)

Each state has two choices, down and right, so the total number of steps from the top-left corner to the bottom-right corner is $m + n - 2$, giving a worst-case time complexity of $O(2^{m + n})$, where $n$ and $m$ are the number of rows and columns of the grid, respectively. Note that this calculation does not account for situations near the grid boundaries, where only one choice remains when reaching the grid boundary, so the actual number of paths will be somewhat less.

### Method 2: Memoization

We introduce a memo list \`mem\` of the same size as grid \`grid\` to record the solutions to subproblems and prune overlapping subproblems:

\`\`\`src
[file]{min_path_sum}-[class]{}-[func]{min_path_sum_dfs_mem}
\`\`\`

As shown in the figure below, after introducing memoization, all subproblem solutions only need to be computed once, so the time complexity depends on the total number of states, which is the grid size $O(nm)$.

![Memoization recursion tree](dp_solution_pipeline.assets/min_path_sum_dfs_mem.png)

### Method 3: Dynamic Programming

Implement the dynamic programming solution based on iteration, as shown in the code below:

\`\`\`src
[file]{min_path_sum}-[class]{}-[func]{min_path_sum_dp}
\`\`\`

The figure below shows the state transition process for minimum path sum, which traverses the entire grid, **thus the time complexity is $O(nm)$**.

The array \`dp\` has size $n \\times m$, **thus the space complexity is $O(nm)$**.

=== "<1>"
    ![Dynamic programming process for minimum path sum](dp_solution_pipeline.assets/min_path_sum_dp_step1.png)

=== "<2>"
    ![min_path_sum_dp_step2](dp_solution_pipeline.assets/min_path_sum_dp_step2.png)

=== "<3>"
    ![min_path_sum_dp_step3](dp_solution_pipeline.assets/min_path_sum_dp_step3.png)

=== "<4>"
    ![min_path_sum_dp_step4](dp_solution_pipeline.assets/min_path_sum_dp_step4.png)

=== "<5>"
    ![min_path_sum_dp_step5](dp_solution_pipeline.assets/min_path_sum_dp_step5.png)

=== "<6>"
    ![min_path_sum_dp_step6](dp_solution_pipeline.assets/min_path_sum_dp_step6.png)

=== "<7>"
    ![min_path_sum_dp_step7](dp_solution_pipeline.assets/min_path_sum_dp_step7.png)

=== "<8>"
    ![min_path_sum_dp_step8](dp_solution_pipeline.assets/min_path_sum_dp_step8.png)

=== "<9>"
    ![min_path_sum_dp_step9](dp_solution_pipeline.assets/min_path_sum_dp_step9.png)

=== "<10>"
    ![min_path_sum_dp_step10](dp_solution_pipeline.assets/min_path_sum_dp_step10.png)

=== "<11>"
    ![min_path_sum_dp_step11](dp_solution_pipeline.assets/min_path_sum_dp_step11.png)

=== "<12>"
    ![min_path_sum_dp_step12](dp_solution_pipeline.assets/min_path_sum_dp_step12.png)

### Space Optimization

Since each cell is only related to the cell to its left and the cell above it, we can use a single-row array to implement the $dp$ table.

Note that since the array \`dp\` can only represent the state of one row, we cannot initialize the first column state in advance, but rather update it when traversing each row:

\`\`\`src
[file]{min_path_sum}-[class]{}-[func]{min_path_sum_dp_comp}
\`\`\`
`
  },

  'dsa-knapsack': {
    title: '14.4 Bài toán Cái túi 0-1 (0-1 Knapsack)',
    summary: 'Phân tích và giải quyết bài toán kinh điển 0-1 Knapsack. Hiểu nguyên lý Tối ưu hóa không gian từ mảng 2D xuống 1D bằng cách duyệt ngược.',
    tags: ['dsa', 'dynamic-programming', 'knapsack', 'optimization'],
    domain: 'Algorithms',
    module: 'Chương 14: Quy hoạch động',
    prerequisites: ['dsa-dp-pipeline'],
    related: ['dsa-unbounded-knapsack'],
    updatedAt: '2026-07-19',
    readTime: '15 phút',
    content: `

<p>Bài toán cái túi (knapsack problem) là một bài toán nhập môn tuyệt vời cho quy hoạch động và là một trong những dạng bài toán phổ biến nhất của quy hoạch động. Nó có nhiều biến thể, như bài toán cái túi 0-1, bài toán cái túi không giới hạn, và bài toán cái túi bội số.</p>

<p>Trong phần này, trước tiên ta giải bài toán cái túi 0-1 phổ biến nhất.</p>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho $n$ vật phẩm và một cái túi có sức chứa $cap$, trong đó trọng lượng và giá trị của vật thứ $i$ lần lượt là $wgt[i-1]$ và $val[i-1]$. Mỗi vật phẩm chỉ được chọn tối đa một lần. Giá trị lớn nhất có thể chứa trong túi dưới giới hạn sức chứa là bao nhiêu?</p>
  </div>
</div>

<p>Quan sát hình dưới đây. Vì số thứ tự vật phẩm $i$ bắt đầu đếm từ $1$ và chỉ số mảng bắt đầu từ $0$, vật thứ $i$ tương ứng với trọng lượng $wgt[i-1]$ và giá trị $val[i-1]$.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/knapsack_example.png" alt="Dữ liệu ví dụ về Cái túi 0-1" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Ta có thể xem bài toán cái túi 0-1 như một quá trình gồm $n$ vòng quyết định, trong đó với mỗi vật phẩm có hai quyết định: không đặt vào và đặt vào, vì vậy bài toán thỏa mãn mô hình cây quyết định.</p>

<p>Mục tiêu của bài toán này là tìm "giá trị lớn nhất có thể đặt vào túi trong giới hạn sức chứa", vì vậy nó nhiều khả năng là một bài toán quy hoạch động.</p>

<p><strong>Bước 1: Suy nghĩ về các quyết định ở mỗi vòng, định nghĩa trạng thái, và từ đó thu được bảng $dp$</strong></p>

<p>Với mỗi vật phẩm, nếu không đặt vào túi, sức chứa túi giữ nguyên; nếu đặt vào, sức chứa túi giảm đi. Từ đó, ta có thể suy ra định nghĩa trạng thái: số thứ tự vật phẩm hiện tại $i$ và sức chứa túi $c$, ký hiệu là $[i, c]$.</p>

<p>Trạng thái $[i, c]$ tương ứng với bài toán con: <strong>giá trị lớn nhất trong số $i$ vật phẩm đầu tiên với túi có sức chứa $c$</strong>, ký hiệu là $dp[i, c]$.</p>

<p>Điều ta cần tìm là $dp[n, cap]$, vì vậy ta cần một bảng $dp$ hai chiều có kích thước $(n+1) \times (cap+1)$.</p>

<p><strong>Bước 2: Xác định cấu trúc con tối ưu, rồi suy ra phương trình chuyển trạng thái</strong></p>

<p>Sau khi đưa ra quyết định cho vật thứ $i$, phần còn lại là bài toán con của $i-1$ vật phẩm đầu tiên, có thể chia thành hai trường hợp sau.</p>

<ul>
  <li><strong>Không đặt vật thứ $i$</strong>: Sức chứa túi giữ nguyên, và trạng thái chuyển thành $[i-1, c]$.</li>
  <li><strong>Đặt vật thứ $i$</strong>: Sức chứa túi giảm đi $wgt[i-1]$, giá trị tăng thêm $val[i-1]$, và trạng thái chuyển thành $[i-1, c-wgt[i-1]]$.</li>
</ul>

<p>Phân tích trên tiết lộ cấu trúc con tối ưu của bài toán này: <strong>giá trị lớn nhất $dp[i, c]$ bằng giá trị lớn hơn trong số giá trị thu được khi không đặt vật thứ $i$ vào túi và khi đặt nó vào túi</strong>. Từ đó, ta có thể suy ra phương trình chuyển trạng thái:</p>

<p>$$dp[i, c] = \max(dp[i-1, c], dp[i-1, c - wgt[i-1]] + val[i-1])$$</p>

<p>Lưu ý rằng nếu trọng lượng của vật phẩm hiện tại $wgt[i-1]$ vượt quá sức chứa còn lại của túi $c$, thì lựa chọn duy nhất là không đặt nó vào túi.</p>

<p><strong>Bước 3: Xác định điều kiện biên và thứ tự chuyển trạng thái</strong></p>

<p>Khi không có vật phẩm nào hoặc sức chứa túi là $0$, giá trị lớn nhất là $0$, tức là cột đầu tiên $dp[i, 0]$ và hàng đầu tiên $dp[0, c]$ đều bằng $0$.</p>

<p>Trạng thái hiện tại $[i, c]$ chuyển từ trạng thái phía trên $[i-1, c]$ và trạng thái trên-trái $[i-1, c-wgt[i-1]]$, vì vậy ta có thể duyệt toàn bộ bảng $dp$ theo thứ tự xuôi bằng hai vòng lặp lồng nhau.</p>

<p>Dựa trên phân tích trên, tiếp theo ta sẽ triển khai lần lượt các lời giải tìm kiếm vét cạn, đệ quy có nhớ, và quy hoạch động.</p>

<h3>Cách 1: Tìm kiếm vét cạn</h3>

<p>Mã tìm kiếm bao gồm các yếu tố sau.</p>

<ul>
  <li><strong>Tham số đệ quy</strong>: trạng thái $[i, c]$.</li>
  <li><strong>Giá trị trả về</strong>: lời giải của bài toán con $dp[i, c]$.</li>
  <li><strong>Điều kiện dừng</strong>: khi không còn vật phẩm nào ($i = 0$) hoặc sức chứa túi còn lại là $0$, dừng đệ quy và trả về giá trị $0$.</li>
  <li><strong>Cắt tỉa</strong>: nếu trọng lượng của vật phẩm hiện tại vượt quá sức chứa túi còn lại, chỉ có lựa chọn không đặt nó vào túi.</li>
</ul>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def knapsack_dfs(wgt: list[int], val: list[int], i: int, c: int) -&gt; int:
    """Cái túi 0-1: Tìm kiếm vét cạn"""
    # Nếu đã xét hết vật hoặc túi không còn sức chứa, trả về giá trị 0
    if i == 0 or c == 0:
        return 0
    # Nếu vượt quá sức chứa túi, chỉ có thể chọn không lấy
    if wgt[i - 1] &gt; c:
        return knapsack_dfs(wgt, val, i - 1, c)
    # Tính giá trị lớn nhất giữa việc không lấy và lấy vật i
    no = knapsack_dfs(wgt, val, i - 1, c)
    yes = knapsack_dfs(wgt, val, i - 1, c - wgt[i - 1]) + val[i - 1]
    # Trả về giá trị lớn hơn trong 2 lựa chọn
    return max(no, yes)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Cái túi 0-1: Tìm kiếm vét cạn */
int knapsackDFS(vector&lt;int&gt; &amp;wgt, vector&lt;int&gt; &amp;val, int i, int c) {
    // Nếu đã xét hết vật hoặc túi không còn sức chứa, trả về giá trị 0
    if (i == 0 || c == 0) {
        return 0;
    }
    // Nếu vượt quá sức chứa túi, chỉ có thể chọn không lấy
    if (wgt[i - 1] &gt; c) {
        return knapsackDFS(wgt, val, i - 1, c);
    }
    // Tính giá trị lớn nhất giữa việc không lấy và lấy vật i
    int no = knapsackDFS(wgt, val, i - 1, c);
    int yes = knapsackDFS(wgt, val, i - 1, c - wgt[i - 1]) + val[i - 1];
    // Trả về giá trị lớn hơn trong 2 lựa chọn
    return max(no, yes);
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Cái túi 0-1: Tìm kiếm vét cạn */
static int knapsackDFS(int[] wgt, int[] val, int i, int c) {
    // Nếu đã xét hết vật hoặc túi không còn sức chứa, trả về giá trị 0
    if (i == 0 || c == 0) {
        return 0;
    }
    // Nếu vượt quá sức chứa túi, chỉ có thể chọn không lấy
    if (wgt[i - 1] &gt; c) {
        return knapsackDFS(wgt, val, i - 1, c);
    }
    // Tính giá trị lớn nhất giữa việc không lấy và lấy vật i
    int no = knapsackDFS(wgt, val, i - 1, c);
    int yes = knapsackDFS(wgt, val, i - 1, c - wgt[i - 1]) + val[i - 1];
    // Trả về giá trị lớn hơn trong 2 lựa chọn
    return Math.max(no, yes);
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Cái túi 0-1: Tìm kiếm vét cạn */
function knapsackDFS(wgt, val, i, c) {
    // Nếu đã xét hết vật hoặc túi không còn sức chứa, trả về giá trị 0
    if (i === 0 || c === 0) {
        return 0;
    }
    // Nếu vượt quá sức chứa túi, chỉ có thể chọn không lấy
    if (wgt[i - 1] &gt; c) {
        return knapsackDFS(wgt, val, i - 1, c);
    }
    // Tính giá trị lớn nhất giữa việc không lấy và lấy vật i
    const no = knapsackDFS(wgt, val, i - 1, c);
    const yes = knapsackDFS(wgt, val, i - 1, c - wgt[i - 1]) + val[i - 1];
    // Trả về giá trị lớn hơn trong 2 lựa chọn
    return Math.max(no, yes);
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Cái túi 0-1: Tìm kiếm vét cạn */
fun knapsackDFS(
    wgt: IntArray,
    _val: IntArray,
    i: Int,
    c: Int
): Int {
    // Nếu đã xét hết vật hoặc túi không còn sức chứa, trả về giá trị 0
    if (i == 0 || c == 0) {
        return 0
    }
    // Nếu vượt quá sức chứa túi, chỉ có thể chọn không lấy
    if (wgt[i - 1] &gt; c) {
        return knapsackDFS(wgt, _val, i - 1, c)
    }
    // Tính giá trị lớn nhất giữa việc không lấy và lấy vật i
    val no = knapsackDFS(wgt, _val, i - 1, c)
    val yes = knapsackDFS(wgt, _val, i - 1, c - wgt[i - 1]) + _val[i - 1]
    // Trả về giá trị lớn hơn trong 2 lựa chọn
    return max(no, yes)
}</code></pre></div></div></div>

<p>Như hình dưới đây, vì mỗi vật phẩm sinh ra hai nhánh tìm kiếm, loại trừ nó và bao gồm nó, độ phức tạp thời gian là $O(2^n)$.</p>

<p>Quan sát cây đệ quy, dễ dàng thấy các bài toán con chồng chéo, ví dụ như $dp[1, 10]$. Khi có nhiều vật phẩm, sức chứa túi lớn, và đặc biệt nhiều vật phẩm có cùng trọng lượng, số lượng bài toán con chồng chéo sẽ tăng đáng kể.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/knapsack_dfs.png" alt="Cây đệ quy tìm kiếm vét cạn cho bài toán Cái túi 0-1" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>Cách 2: Đệ quy có nhớ</h3>

<p>Để đảm bảo các bài toán con chồng chéo chỉ được tính một lần, ta dùng một danh sách ghi nhớ <code>mem</code> để ghi lại lời giải của các bài toán con, trong đó <code>mem[i][c]</code> tương ứng với $dp[i, c]$.</p>

<p>Sau khi giới thiệu đệ quy có nhớ, <strong>độ phức tạp thời gian phụ thuộc vào số lượng bài toán con</strong>, tức là $O(n \times cap)$. Mã triển khai như sau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def knapsack_dfs_mem(
    wgt: list[int], val: list[int], mem: list[list[int]], i: int, c: int
) -&gt; int:
    """Cái túi 0-1: Tìm kiếm có nhớ"""
    # Nếu đã xét hết vật hoặc túi không còn sức chứa, trả về giá trị 0
    if i == 0 or c == 0:
        return 0
    # Nếu đã có bản ghi, trả về luôn
    if mem[i][c] != -1:
        return mem[i][c]
    # Nếu vượt quá sức chứa túi, chỉ có thể chọn không lấy
    if wgt[i - 1] &gt; c:
        return knapsack_dfs_mem(wgt, val, mem, i - 1, c)
    # Tính giá trị lớn nhất giữa việc không lấy và lấy vật i
    no = knapsack_dfs_mem(wgt, val, mem, i - 1, c)
    yes = knapsack_dfs_mem(wgt, val, mem, i - 1, c - wgt[i - 1]) + val[i - 1]
    # Ghi lại và trả về giá trị lớn hơn trong 2 lựa chọn
    mem[i][c] = max(no, yes)
    return mem[i][c]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Cái túi 0-1: Tìm kiếm có nhớ */
int knapsackDFSMem(vector&lt;int&gt; &amp;wgt, vector&lt;int&gt; &amp;val, vector&lt;vector&lt;int&gt;&gt; &amp;mem, int i, int c) {
    // Nếu đã xét hết vật hoặc túi không còn sức chứa, trả về giá trị 0
    if (i == 0 || c == 0) {
        return 0;
    }
    // Nếu đã có bản ghi, trả về luôn
    if (mem[i][c] != -1) {
        return mem[i][c];
    }
    // Nếu vượt quá sức chứa túi, chỉ có thể chọn không lấy
    if (wgt[i - 1] &gt; c) {
        return knapsackDFSMem(wgt, val, mem, i - 1, c);
    }
    // Tính giá trị lớn nhất giữa việc không lấy và lấy vật i
    int no = knapsackDFSMem(wgt, val, mem, i - 1, c);
    int yes = knapsackDFSMem(wgt, val, mem, i - 1, c - wgt[i - 1]) + val[i - 1];
    // Ghi lại và trả về giá trị lớn hơn trong 2 lựa chọn
    mem[i][c] = max(no, yes);
    return mem[i][c];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Cái túi 0-1: Tìm kiếm có nhớ */
static int knapsackDFSMem(int[] wgt, int[] val, int[][] mem, int i, int c) {
    // Nếu đã xét hết vật hoặc túi không còn sức chứa, trả về giá trị 0
    if (i == 0 || c == 0) {
        return 0;
    }
    // Nếu đã có bản ghi, trả về luôn
    if (mem[i][c] != -1) {
        return mem[i][c];
    }
    // Nếu vượt quá sức chứa túi, chỉ có thể chọn không lấy
    if (wgt[i - 1] &gt; c) {
        return knapsackDFSMem(wgt, val, mem, i - 1, c);
    }
    // Tính giá trị lớn nhất giữa việc không lấy và lấy vật i
    int no = knapsackDFSMem(wgt, val, mem, i - 1, c);
    int yes = knapsackDFSMem(wgt, val, mem, i - 1, c - wgt[i - 1]) + val[i - 1];
    // Ghi lại và trả về giá trị lớn hơn trong 2 lựa chọn
    mem[i][c] = Math.max(no, yes);
    return mem[i][c];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Cái túi 0-1: Tìm kiếm có nhớ */
function knapsackDFSMem(wgt, val, mem, i, c) {
    // Nếu đã xét hết vật hoặc túi không còn sức chứa, trả về giá trị 0
    if (i === 0 || c === 0) {
        return 0;
    }
    // Nếu đã có bản ghi, trả về luôn
    if (mem[i][c] !== -1) {
        return mem[i][c];
    }
    // Nếu vượt quá sức chứa túi, chỉ có thể chọn không lấy
    if (wgt[i - 1] &gt; c) {
        return knapsackDFSMem(wgt, val, mem, i - 1, c);
    }
    // Tính giá trị lớn nhất giữa việc không lấy và lấy vật i
    const no = knapsackDFSMem(wgt, val, mem, i - 1, c);
    const yes =
        knapsackDFSMem(wgt, val, mem, i - 1, c - wgt[i - 1]) + val[i - 1];
    // Ghi lại và trả về giá trị lớn hơn trong 2 lựa chọn
    mem[i][c] = Math.max(no, yes);
    return mem[i][c];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Cái túi 0-1: Tìm kiếm có nhớ */
fun knapsackDFSMem(
    wgt: IntArray,
    _val: IntArray,
    mem: Array&lt;IntArray&gt;,
    i: Int,
    c: Int
): Int {
    // Nếu đã xét hết vật hoặc túi không còn sức chứa, trả về giá trị 0
    if (i == 0 || c == 0) {
        return 0
    }
    // Nếu đã có bản ghi, trả về luôn
    if (mem[i][c] != -1) {
        return mem[i][c]
    }
    // Nếu vượt quá sức chứa túi, chỉ có thể chọn không lấy
    if (wgt[i - 1] &gt; c) {
        return knapsackDFSMem(wgt, _val, mem, i - 1, c)
    }
    // Tính giá trị lớn nhất giữa việc không lấy và lấy vật i
    val no = knapsackDFSMem(wgt, _val, mem, i - 1, c)
    val yes = knapsackDFSMem(wgt, _val, mem, i - 1, c - wgt[i - 1]) + _val[i - 1]
    // Ghi lại và trả về giá trị lớn hơn trong 2 lựa chọn
    mem[i][c] = max(no, yes)
    return mem[i][c]
}</code></pre></div></div></div>

<p>Hình dưới đây cho thấy các nhánh tìm kiếm bị cắt tỉa trong đệ quy có nhớ.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/knapsack_dfs_mem.png" alt="Cây đệ quy đệ quy có nhớ cho bài toán Cái túi 0-1" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>Cách 3: Quy hoạch động</h3>

<p>Quy hoạch động về bản chất là quá trình điền bảng $dp$ trong quá trình chuyển trạng thái. Mã như sau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def knapsack_dp(wgt: list[int], val: list[int], cap: int) -&gt; int:
    """Cái túi 0-1: Quy hoạch động"""
    n = len(wgt)
    # Khởi tạo bảng dp
    dp = [[0] * (cap + 1) for _ in range(n + 1)]
    # Chuyển trạng thái
    for i in range(1, n + 1):
        for c in range(1, cap + 1):
            if wgt[i - 1] &gt; c:
                # Nếu vượt quá sức chứa túi, không chọn vật i
                dp[i][c] = dp[i - 1][c]
            else:
                # Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[i][c] = max(dp[i - 1][c], dp[i - 1][c - wgt[i - 1]] + val[i - 1])
    return dp[n][cap]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Cái túi 0-1: Quy hoạch động */
int knapsackDP(vector&lt;int&gt; &amp;wgt, vector&lt;int&gt; &amp;val, int cap) {
    int n = wgt.size();
    // Khởi tạo bảng dp
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(cap + 1, 0));
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        for (int c = 1; c &lt;= cap; c++) {
            if (wgt[i - 1] &gt; c) {
                // Nếu vượt quá sức chứa túi, không chọn vật i
                dp[i][c] = dp[i - 1][c];
            } else {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[i][c] = max(dp[i - 1][c], dp[i - 1][c - wgt[i - 1]] + val[i - 1]);
            }
        }
    }
    return dp[n][cap];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Cái túi 0-1: Quy hoạch động */
static int knapsackDP(int[] wgt, int[] val, int cap) {
    int n = wgt.length;
    // Khởi tạo bảng dp
    int[][] dp = new int[n + 1][cap + 1];
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        for (int c = 1; c &lt;= cap; c++) {
            if (wgt[i - 1] &gt; c) {
                // Nếu vượt quá sức chứa túi, không chọn vật i
                dp[i][c] = dp[i - 1][c];
            } else {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[i][c] = Math.max(dp[i - 1][c], dp[i - 1][c - wgt[i - 1]] + val[i - 1]);
            }
        }
    }
    return dp[n][cap];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Cái túi 0-1: Quy hoạch động */
function knapsackDP(wgt, val, cap) {
    const n = wgt.length;
    // Khởi tạo bảng dp
    const dp = Array(n + 1)
        .fill(0)
        .map(() =&gt; Array(cap + 1).fill(0));
    // Chuyển trạng thái
    for (let i = 1; i &lt;= n; i++) {
        for (let c = 1; c &lt;= cap; c++) {
            if (wgt[i - 1] &gt; c) {
                // Nếu vượt quá sức chứa túi, không chọn vật i
                dp[i][c] = dp[i - 1][c];
            } else {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[i][c] = Math.max(
                    dp[i - 1][c],
                    dp[i - 1][c - wgt[i - 1]] + val[i - 1]
                );
            }
        }
    }
    return dp[n][cap];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Cái túi 0-1: Quy hoạch động */
fun knapsackDP(wgt: IntArray, _val: IntArray, cap: Int): Int {
    val n = wgt.size
    // Khởi tạo bảng dp
    val dp = Array(n + 1) { IntArray(cap + 1) }
    // Chuyển trạng thái
    for (i in 1..n) {
        for (c in 1..cap) {
            if (wgt[i - 1] &gt; c) {
                // Nếu vượt quá sức chứa túi, không chọn vật i
                dp[i][c] = dp[i - 1][c]
            } else {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[i][c] = max(dp[i - 1][c], dp[i - 1][c - wgt[i - 1]] + _val[i - 1])
            }
        }
    }
    return dp[n][cap]
}</code></pre></div></div></div>

<p>Như hình dưới đây, cả độ phức tạp thời gian và không gian đều được xác định bởi kích thước của mảng <code>dp</code>, tức là $O(n \times cap)$.</p>

<div class="interactive-widget-wrapper" id="knapsack-dp-steps-wrapper"><div class="slider-container"><div class="slide active"><img src="dsa-assets/knapsack_dp_step1.png" alt="Bước 1: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 1: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step2.png" alt="Bước 2: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 2: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step3.png" alt="Bước 3: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 3: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step4.png" alt="Bước 4: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 4: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step5.png" alt="Bước 5: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 5: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step6.png" alt="Bước 6: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 6: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step7.png" alt="Bước 7: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 7: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step8.png" alt="Bước 8: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 8: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step9.png" alt="Bước 9: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 9: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step10.png" alt="Bước 10: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 10: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step11.png" alt="Bước 11: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 11: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step12.png" alt="Bước 12: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 12: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step13.png" alt="Bước 13: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 13: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_step14.png" alt="Bước 14: điền bảng dp 2 chiều cho Cái túi 0-1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 14: điền bảng dp 2 chiều cho Cái túi 0-1</p></div><div class="slider-controls"><button onclick="prevSlide('knapsack-dp-steps-wrapper')">◀ Trước</button><span class="slider-indicator">Bước 1 / 14</span><button onclick="nextSlide('knapsack-dp-steps-wrapper')">Sau ▶</button></div></div></div>

<h3>Tối ưu Không gian</h3>

<p>Vì mỗi trạng thái chỉ liên quan đến trạng thái ở hàng phía trên nó, ta có thể dùng hai mảng trượt xuôi để giảm độ phức tạp không gian từ $O(n^2)$ xuống $O(n)$.</p>

<p>Suy nghĩ thêm, liệu ta có thể đạt được tối ưu không gian chỉ dùng một mảng không? Quan sát, ta thấy mỗi trạng thái được chuyển từ ô ngay phía trên hoặc ô trên-trái. Nếu chỉ có một mảng, khi ta bắt đầu duyệt hàng $i$, mảng đó vẫn còn lưu trạng thái của hàng $i-1$.</p>

<ul>
  <li>Nếu dùng duyệt xuôi, thì khi duyệt đến $dp[i, j]$, các giá trị ở trên-trái $dp[i-1, 1]$ ~ $dp[i-1, j-1]$ có thể đã bị ghi đè, do đó ngăn cản việc chuyển trạng thái đúng.</li>
  <li>Nếu dùng duyệt ngược, sẽ không có vấn đề ghi đè, và việc chuyển trạng thái có thể tiến hành đúng.</li>
</ul>

<p>Hình dưới đây cho thấy quá trình chuyển từ hàng $i = 1$ sang hàng $i = 2$ dùng một mảng duy nhất. Hãy xem xét sự khác biệt giữa duyệt xuôi và duyệt ngược.</p>

<div class="interactive-widget-wrapper" id="knapsack-dp-comp-steps-wrapper"><div class="slider-container"><div class="slide active"><img src="dsa-assets/knapsack_dp_comp_step1.png" alt="Bước 1: chuyển từ hàng i-1 sang hàng i, duyệt ngược mảng 1D" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 1: chuyển từ hàng i-1 sang hàng i, duyệt ngược mảng 1D</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_comp_step2.png" alt="Bước 2: chuyển từ hàng i-1 sang hàng i, duyệt ngược mảng 1D" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 2: chuyển từ hàng i-1 sang hàng i, duyệt ngược mảng 1D</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_comp_step3.png" alt="Bước 3: chuyển từ hàng i-1 sang hàng i, duyệt ngược mảng 1D" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 3: chuyển từ hàng i-1 sang hàng i, duyệt ngược mảng 1D</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_comp_step4.png" alt="Bước 4: chuyển từ hàng i-1 sang hàng i, duyệt ngược mảng 1D" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 4: chuyển từ hàng i-1 sang hàng i, duyệt ngược mảng 1D</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_comp_step5.png" alt="Bước 5: chuyển từ hàng i-1 sang hàng i, duyệt ngược mảng 1D" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 5: chuyển từ hàng i-1 sang hàng i, duyệt ngược mảng 1D</p></div><div class="slide"><img src="dsa-assets/knapsack_dp_comp_step6.png" alt="Bước 6: chuyển từ hàng i-1 sang hàng i, duyệt ngược mảng 1D" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 6: chuyển từ hàng i-1 sang hàng i, duyệt ngược mảng 1D</p></div><div class="slider-controls"><button onclick="prevSlide('knapsack-dp-comp-steps-wrapper')">◀ Trước</button><span class="slider-indicator">Bước 1 / 6</span><button onclick="nextSlide('knapsack-dp-comp-steps-wrapper')">Sau ▶</button></div></div></div>

<p>Trong triển khai mã, ta chỉ cần xóa chiều thứ nhất $i$ của mảng <code>dp</code> và đổi vòng lặp bên trong thành duyệt ngược:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def knapsack_dp_comp(wgt: list[int], val: list[int], cap: int) -&gt; int:
    """Cái túi 0-1: Quy hoạch động tối ưu không gian"""
    n = len(wgt)
    # Khởi tạo bảng dp
    dp = [0] * (cap + 1)
    # Chuyển trạng thái
    for i in range(1, n + 1):
        # Duyệt theo thứ tự ngược
        for c in range(cap, wgt[i - 1] - 1, -1):
            dp[c] = max(dp[c], dp[c - wgt[i - 1]] + val[i - 1])
    return dp[cap]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Cái túi 0-1: Quy hoạch động tối ưu không gian */
int knapsackDPComp(vector&lt;int&gt; &amp;wgt, vector&lt;int&gt; &amp;val, int cap) {
    int n = wgt.size();
    // Khởi tạo bảng dp
    vector&lt;int&gt; dp(cap + 1, 0);
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        // Duyệt theo thứ tự ngược
        for (int c = cap; c &gt;= 1; c--) {
            if (wgt[i - 1] &lt;= c) {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[c] = max(dp[c], dp[c - wgt[i - 1]] + val[i - 1]);
            }
        }
    }
    return dp[cap];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Cái túi 0-1: Quy hoạch động tối ưu không gian */
static int knapsackDPComp(int[] wgt, int[] val, int cap) {
    int n = wgt.length;
    // Khởi tạo bảng dp
    int[] dp = new int[cap + 1];
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        // Duyệt theo thứ tự ngược
        for (int c = cap; c &gt;= 1; c--) {
            if (wgt[i - 1] &lt;= c) {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[c] = Math.max(dp[c], dp[c - wgt[i - 1]] + val[i - 1]);
            }
        }
    }
    return dp[cap];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Cái túi 0-1: Quy hoạch động tối ưu không gian */
function knapsackDPComp(wgt, val, cap) {
    const n = wgt.length;
    // Khởi tạo bảng dp
    const dp = Array(cap + 1).fill(0);
    // Chuyển trạng thái
    for (let i = 1; i &lt;= n; i++) {
        // Duyệt theo thứ tự ngược
        for (let c = cap; c &gt;= 1; c--) {
            if (wgt[i - 1] &lt;= c) {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[c] = Math.max(dp[c], dp[c - wgt[i - 1]] + val[i - 1]);
            }
        }
    }
    return dp[cap];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Cái túi 0-1: Quy hoạch động tối ưu không gian */
fun knapsackDPComp(wgt: IntArray, _val: IntArray, cap: Int): Int {
    val n = wgt.size
    // Khởi tạo bảng dp
    val dp = IntArray(cap + 1)
    // Chuyển trạng thái
    for (i in 1..n) {
        // Duyệt theo thứ tự ngược
        for (c in cap downTo 1) {
            if (wgt[i - 1] &lt;= c) {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[c] = max(dp[c], dp[c - wgt[i - 1]] + _val[i - 1])
            }
        }
    }
    return dp[cap]
}</code></pre></div></div></div>

<div class="interactive-widget-wrapper" id="knapsack-dp-comp-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'knapsack-dp-comp-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'knapsack-dp-comp-wrapper', 'tab-interactive'); initDpDemo('knapsack-dp-comp-wrapper', DP_FRAMES_KNAPSACK_COMP)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="color:var(--text-muted);font-size:14px;">Xem chuỗi hình minh họa tĩnh phía trên. Chuyển sang tab "Mô phỏng tương tác" để xem mảng <code>dp</code> 1 chiều được cập nhật khi duyệt NGƯỢC dung lượng $c$, với ví dụ 3 vật phẩm nhỏ.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="knapsack-dp-comp-wrapper-canvas"></div>
    <div class="simulator-controls" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
      <button id="knapsack-dp-comp-wrapper-btn-autorun" class="control-btn" onclick="autoRunDpDemo('knapsack-dp-comp-wrapper')">▶ Auto Run</button>
      <button id="knapsack-dp-comp-wrapper-btn-step" class="control-btn" onclick="stepDpDemo('knapsack-dp-comp-wrapper')">Bước tiếp theo ▶</button>
      <button id="knapsack-dp-comp-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunDpDemo('knapsack-dp-comp-wrapper')" disabled>⏸ Dừng</button>
      <button id="knapsack-dp-comp-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initDpDemo('knapsack-dp-comp-wrapper', DP_FRAMES_KNAPSACK_COMP)">↺ Reset</button>
    </div>
    <div style="margin-top:8px;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setDpDemoSpeed('knapsack-dp-comp-wrapper', this.value)" /> <span id="knapsack-dp-comp-wrapper-speed-label">700ms</span>
    </div>
    <div id="knapsack-dp-comp-wrapper-status" class="simulator-status" style="margin-top:8px;color:var(--text-secondary);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>

`,
    originalContent: `
# 0-1 Knapsack Problem

The knapsack problem is an excellent introductory problem for dynamic programming and is one of the most common problem forms in dynamic programming. It has many variants, such as the 0-1 knapsack problem, the unbounded knapsack problem, and the multiple knapsack problem.

In this section, we will first solve the most common 0-1 knapsack problem.

!!! question

    Given $n$ items and a knapsack with capacity $cap$, where the weight and value of the $i$-th item are $wgt[i-1]$ and $val[i-1]$, respectively. Each item can be selected at most once. What is the maximum value that can fit in the knapsack under the capacity limit?

Observe the figure below. Since item number $i$ starts counting from $1$ and array indices start from $0$, item $i$ corresponds to weight $wgt[i-1]$ and value $val[i-1]$.

![Example data for 0-1 knapsack](knapsack_problem.assets/knapsack_example.png)

We can view the 0-1 knapsack problem as a process consisting of $n$ rounds of decisions, where for each item there are two decisions: not putting it in and putting it in, thus the problem satisfies the decision tree model.

The goal of this problem is to find "the maximum value that can be placed in the knapsack within the capacity limit", so it is more likely to be a dynamic programming problem.

**Step 1: Think about the decisions in each round, define the state, and thus obtain the $dp$ table**

For each item, if not placed in the knapsack, the knapsack capacity remains unchanged; if placed in, the knapsack capacity decreases. From this, we can derive the state definition: current item number $i$ and knapsack capacity $c$, denoted as $[i, c]$.

State $[i, c]$ corresponds to the subproblem: **the maximum value among the first $i$ items in a knapsack of capacity $c$**, denoted as $dp[i, c]$.

What we need to find is $dp[n, cap]$, so we need a two-dimensional $dp$ table of size $(n+1) \\times (cap+1)$.

**Step 2: Identify the optimal substructure, and then derive the state transition equation**

After making the decision for item $i$, what remains is the subproblem of the first $i-1$ items, which can be divided into the following two cases.

- **Not putting item $i$**: The knapsack capacity remains unchanged, and the state changes to $[i-1, c]$.
- **Putting item $i$**: The knapsack capacity decreases by $wgt[i-1]$, the value increases by $val[i-1]$, and the state changes to $[i-1, c-wgt[i-1]]$.

The above analysis reveals the optimal substructure of this problem: **the maximum value $dp[i, c]$ equals the greater of the values obtained by not putting item $i$ into the knapsack and by putting it into the knapsack**. From this, the state transition equation can be derived:

$$
dp[i, c] = \\max(dp[i-1, c], dp[i-1, c - wgt[i-1]] + val[i-1])
$$

Note that if the weight of the current item $wgt[i - 1]$ exceeds the remaining knapsack capacity $c$, then the only option is not to put it in the knapsack.

**Step 3: Determine boundary conditions and state transition order**

When there are no items or the knapsack capacity is $0$, the maximum value is $0$, i.e., the first column $dp[i, 0]$ and the first row $dp[0, c]$ are both equal to $0$.

The current state $[i, c]$ transitions from the state above $[i-1, c]$ and the upper-left state $[i-1, c-wgt[i-1]]$, so we can traverse the entire $dp$ table in forward order using two nested loops.

Based on the above analysis, we will next implement the brute force search, memoization, and dynamic programming solutions in order.

### Method 1: Brute Force Search

The search code includes the following elements.

- **Recursive parameters**: state $[i, c]$.
- **Return value**: solution to the subproblem $dp[i, c]$.
- **Termination condition**: when there are no items left ($i = 0$) or the remaining knapsack capacity is $0$, terminate the recursion and return value $0$.
- **Pruning**: if the weight of the current item exceeds the remaining knapsack capacity, only the option of not putting it in is available.

\`\`\`src
[file]{knapsack}-[class]{}-[func]{knapsack_dfs}
\`\`\`

As shown in the figure below, since each item generates two search branches, excluding it and including it, the time complexity is $O(2^n)$.

Observing the recursion tree, it is easy to see overlapping subproblems, such as $dp[1, 10]$. When there are many items, large knapsack capacity, and especially many items with the same weight, the number of overlapping subproblems will increase significantly.

![Brute force search recursion tree for 0-1 knapsack problem](knapsack_problem.assets/knapsack_dfs.png)

### Method 2: Memoization

To ensure that overlapping subproblems are only computed once, we use a memo list \`mem\` to record the solutions to subproblems, where \`mem[i][c]\` corresponds to $dp[i, c]$.

After introducing memoization, **the time complexity depends on the number of subproblems**, which is $O(n \\times cap)$. The implementation code is as follows:

\`\`\`src
[file]{knapsack}-[class]{}-[func]{knapsack_dfs_mem}
\`\`\`

The figure below shows the search branches pruned in memoization.

![Memoization recursion tree for 0-1 knapsack problem](knapsack_problem.assets/knapsack_dfs_mem.png)

### Method 3: Dynamic Programming

Dynamic programming is essentially the process of filling the $dp$ table during state transitions. The code is as follows:

\`\`\`src
[file]{knapsack}-[class]{}-[func]{knapsack_dp}
\`\`\`

As shown in the figure below, both time complexity and space complexity are determined by the size of the array \`dp\`, which is $O(n \\times cap)$.

=== "<1>"
    ![Dynamic programming process for 0-1 knapsack problem](knapsack_problem.assets/knapsack_dp_step1.png)

=== "<2>"
    ![knapsack_dp_step2](knapsack_problem.assets/knapsack_dp_step2.png)

=== "<3>"
    ![knapsack_dp_step3](knapsack_problem.assets/knapsack_dp_step3.png)

=== "<4>"
    ![knapsack_dp_step4](knapsack_problem.assets/knapsack_dp_step4.png)

=== "<5>"
    ![knapsack_dp_step5](knapsack_problem.assets/knapsack_dp_step5.png)

=== "<6>"
    ![knapsack_dp_step6](knapsack_problem.assets/knapsack_dp_step6.png)

=== "<7>"
    ![knapsack_dp_step7](knapsack_problem.assets/knapsack_dp_step7.png)

=== "<8>"
    ![knapsack_dp_step8](knapsack_problem.assets/knapsack_dp_step8.png)

=== "<9>"
    ![knapsack_dp_step9](knapsack_problem.assets/knapsack_dp_step9.png)

=== "<10>"
    ![knapsack_dp_step10](knapsack_problem.assets/knapsack_dp_step10.png)

=== "<11>"
    ![knapsack_dp_step11](knapsack_problem.assets/knapsack_dp_step11.png)

=== "<12>"
    ![knapsack_dp_step12](knapsack_problem.assets/knapsack_dp_step12.png)

=== "<13>"
    ![knapsack_dp_step13](knapsack_problem.assets/knapsack_dp_step13.png)

=== "<14>"
    ![knapsack_dp_step14](knapsack_problem.assets/knapsack_dp_step14.png)

### Space Optimization

Since each state is only related to the state in the row above it, we can use two arrays rolling forward to reduce the space complexity from $O(n^2)$ to $O(n)$.

Further thinking, can we achieve space optimization using just one array? Observing, we can see that each state is transferred from the cell directly above or the cell in the upper-left. If there is only one array, when we start traversing row $i$, that array still stores the state of row $i-1$.

- If using forward traversal, then when traversing to $dp[i, j]$, the values in the upper-left $dp[i-1, 1]$ ~ $dp[i-1, j-1]$ may have already been overwritten, thus preventing correct state transition.
- If using reverse traversal, there will be no overwriting issue, and state transition can proceed correctly.

The figure below shows the transition process from row $i = 1$ to row $i = 2$ using a single array. Please consider the difference between forward and reverse traversal.

=== "<1>"
    ![Space-optimized dynamic programming process for 0-1 knapsack](knapsack_problem.assets/knapsack_dp_comp_step1.png)

=== "<2>"
    ![knapsack_dp_comp_step2](knapsack_problem.assets/knapsack_dp_comp_step2.png)

=== "<3>"
    ![knapsack_dp_comp_step3](knapsack_problem.assets/knapsack_dp_comp_step3.png)

=== "<4>"
    ![knapsack_dp_comp_step4](knapsack_problem.assets/knapsack_dp_comp_step4.png)

=== "<5>"
    ![knapsack_dp_comp_step5](knapsack_problem.assets/knapsack_dp_comp_step5.png)

=== "<6>"
    ![knapsack_dp_comp_step6](knapsack_problem.assets/knapsack_dp_comp_step6.png)

In the code implementation, we simply need to delete the first dimension $i$ of the array \`dp\` and change the inner loop to reverse traversal:

\`\`\`src
[file]{knapsack}-[class]{}-[func]{knapsack_dp_comp}
\`\`\`
`
  },

  'dsa-unbounded-knapsack': {
    title: '14.5 Cái túi không giới hạn & Đổi tiền',
    summary: 'Bài toán Unbounded Knapsack và Coin Change, nơi các phần tử được sử dụng lặp lại nhiều lần. Tìm hiểu sự khác biệt cốt lõi trong vòng lặp so với 0-1 Knapsack.',
    tags: ['dsa', 'dynamic-programming', 'unbounded-knapsack', 'coin-change'],
    domain: 'Algorithms',
    module: 'Chương 14: Quy hoạch động',
    prerequisites: ['dsa-knapsack'],
    related: ['dsa-edit-distance'],
    updatedAt: '2026-07-19',
    readTime: '15 phút',
    content: `

<p>Trong phần này, trước tiên ta giải một bài toán cái túi phổ biến khác: cái túi không giới hạn, sau đó khám phá một trường hợp đặc biệt của nó: bài toán đổi tiền.</p>

<h2>Bài toán Cái túi không giới hạn</h2>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho $n$ vật phẩm, trong đó trọng lượng của vật thứ $i$ là $wgt[i-1]$ và giá trị của nó là $val[i-1]$, và một cái túi có sức chứa $cap$. <strong>Mỗi vật phẩm có thể được chọn nhiều lần</strong>. Giá trị lớn nhất có thể đặt vào túi trong giới hạn sức chứa là bao nhiêu? Một ví dụ được thể hiện trong hình dưới đây.</p>
  </div>
</div>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/unbounded_knapsack_example.png" alt="Dữ liệu ví dụ về Cái túi không giới hạn" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>Cách tiếp cận Quy hoạch động</h3>

<p>Bài toán cái túi không giới hạn rất giống với bài toán cái túi 0-1, <strong>khác biệt duy nhất là không có giới hạn về số lần một vật phẩm có thể được chọn</strong>.</p>

<ul>
  <li>Trong bài toán cái túi 0-1, chỉ có một vật phẩm cho mỗi loại, vì vậy sau khi đặt vật thứ $i$ vào túi, ta chỉ có thể chọn từ $i-1$ vật phẩm đầu tiên.</li>
  <li>Trong bài toán cái túi không giới hạn, số lượng mỗi loại vật phẩm là không giới hạn, vì vậy sau khi đặt vật thứ $i$ vào túi, <strong>ta vẫn có thể chọn từ $i$ vật phẩm đầu tiên</strong>.</li>
</ul>

<p>Theo quy tắc của bài toán cái túi không giới hạn, sự thay đổi của trạng thái $[i, c]$ được chia thành hai trường hợp.</p>

<ul>
  <li><strong>Không đặt vật thứ $i$</strong>: Giống bài toán cái túi 0-1, chuyển sang $[i-1, c]$.</li>
  <li><strong>Đặt vật thứ $i$</strong>: Khác bài toán cái túi 0-1, chuyển sang $[i, c-wgt[i-1]]$.</li>
</ul>

<p>Do đó, phương trình chuyển trạng thái trở thành:</p>

<p>$$dp[i, c] = \max(dp[i-1, c], dp[i, c - wgt[i-1]] + val[i-1])$$</p>

<h3>Triển khai mã</h3>

<p>So sánh mã của hai bài toán, có một thay đổi trong chuyển trạng thái từ $i-1$ sang $i$, mọi thứ khác đều giống hệt:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def unbounded_knapsack_dp(wgt: list[int], val: list[int], cap: int) -&gt; int:
    """Cái túi không giới hạn: Quy hoạch động"""
    n = len(wgt)
    # Khởi tạo bảng dp
    dp = [[0] * (cap + 1) for _ in range(n + 1)]
    # Chuyển trạng thái
    for i in range(1, n + 1):
        for c in range(1, cap + 1):
            if wgt[i - 1] &gt; c:
                # Nếu vượt quá sức chứa túi, không chọn vật i
                dp[i][c] = dp[i - 1][c]
            else:
                # Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[i][c] = max(dp[i - 1][c], dp[i][c - wgt[i - 1]] + val[i - 1])
    return dp[n][cap]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Cái túi không giới hạn: Quy hoạch động */
int unboundedKnapsackDP(vector&lt;int&gt; &amp;wgt, vector&lt;int&gt; &amp;val, int cap) {
    int n = wgt.size();
    // Khởi tạo bảng dp
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(cap + 1, 0));
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        for (int c = 1; c &lt;= cap; c++) {
            if (wgt[i - 1] &gt; c) {
                // Nếu vượt quá sức chứa túi, không chọn vật i
                dp[i][c] = dp[i - 1][c];
            } else {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[i][c] = max(dp[i - 1][c], dp[i][c - wgt[i - 1]] + val[i - 1]);
            }
        }
    }
    return dp[n][cap];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Cái túi không giới hạn: Quy hoạch động */
static int unboundedKnapsackDP(int[] wgt, int[] val, int cap) {
    int n = wgt.length;
    // Khởi tạo bảng dp
    int[][] dp = new int[n + 1][cap + 1];
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        for (int c = 1; c &lt;= cap; c++) {
            if (wgt[i - 1] &gt; c) {
                // Nếu vượt quá sức chứa túi, không chọn vật i
                dp[i][c] = dp[i - 1][c];
            } else {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[i][c] = Math.max(dp[i - 1][c], dp[i][c - wgt[i - 1]] + val[i - 1]);
            }
        }
    }
    return dp[n][cap];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Cái túi không giới hạn: Quy hoạch động */
function unboundedKnapsackDP(wgt, val, cap) {
    const n = wgt.length;
    // Khởi tạo bảng dp
    const dp = Array.from({ length: n + 1 }, () =&gt;
        Array.from({ length: cap + 1 }, () =&gt; 0)
    );
    // Chuyển trạng thái
    for (let i = 1; i &lt;= n; i++) {
        for (let c = 1; c &lt;= cap; c++) {
            if (wgt[i - 1] &gt; c) {
                // Nếu vượt quá sức chứa túi, không chọn vật i
                dp[i][c] = dp[i - 1][c];
            } else {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[i][c] = Math.max(
                    dp[i - 1][c],
                    dp[i][c - wgt[i - 1]] + val[i - 1]
                );
            }
        }
    }
    return dp[n][cap];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Cái túi không giới hạn: Quy hoạch động */
fun unboundedKnapsackDP(wgt: IntArray, _val: IntArray, cap: Int): Int {
    val n = wgt.size
    // Khởi tạo bảng dp
    val dp = Array(n + 1) { IntArray(cap + 1) }
    // Chuyển trạng thái
    for (i in 1..n) {
        for (c in 1..cap) {
            if (wgt[i - 1] &gt; c) {
                // Nếu vượt quá sức chứa túi, không chọn vật i
                dp[i][c] = dp[i - 1][c]
            } else {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[i][c] = max(dp[i - 1][c], dp[i][c - wgt[i - 1]] + _val[i - 1])
            }
        }
    }
    return dp[n][cap]
}</code></pre></div></div></div>

<h3>Tối ưu Không gian</h3>

<p>Vì trạng thái hiện tại được chuyển từ các trạng thái bên trái và phía trên, <strong>sau khi tối ưu không gian, mỗi hàng trong bảng $dp$ nên được duyệt theo thứ tự xuôi</strong>.</p>

<p>Thứ tự duyệt này hoàn toàn ngược lại với cái túi 0-1. Vui lòng tham khảo hình dưới đây để hiểu sự khác biệt giữa hai bài toán.</p>

<div class="interactive-widget-wrapper" id="unbounded-knapsack-comp-steps-wrapper"><div class="slider-container"><div class="slide active"><img src="dsa-assets/unbounded_knapsack_dp_comp_step1.png" alt="Bước 1: duyệt xuôi mảng 1D cho Cái túi không giới hạn" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 1: duyệt xuôi mảng 1D cho Cái túi không giới hạn</p></div><div class="slide"><img src="dsa-assets/unbounded_knapsack_dp_comp_step2.png" alt="Bước 2: duyệt xuôi mảng 1D cho Cái túi không giới hạn" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 2: duyệt xuôi mảng 1D cho Cái túi không giới hạn</p></div><div class="slide"><img src="dsa-assets/unbounded_knapsack_dp_comp_step3.png" alt="Bước 3: duyệt xuôi mảng 1D cho Cái túi không giới hạn" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 3: duyệt xuôi mảng 1D cho Cái túi không giới hạn</p></div><div class="slide"><img src="dsa-assets/unbounded_knapsack_dp_comp_step4.png" alt="Bước 4: duyệt xuôi mảng 1D cho Cái túi không giới hạn" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 4: duyệt xuôi mảng 1D cho Cái túi không giới hạn</p></div><div class="slide"><img src="dsa-assets/unbounded_knapsack_dp_comp_step5.png" alt="Bước 5: duyệt xuôi mảng 1D cho Cái túi không giới hạn" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 5: duyệt xuôi mảng 1D cho Cái túi không giới hạn</p></div><div class="slide"><img src="dsa-assets/unbounded_knapsack_dp_comp_step6.png" alt="Bước 6: duyệt xuôi mảng 1D cho Cái túi không giới hạn" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 6: duyệt xuôi mảng 1D cho Cái túi không giới hạn</p></div><div class="slider-controls"><button onclick="prevSlide('unbounded-knapsack-comp-steps-wrapper')">◀ Trước</button><span class="slider-indicator">Bước 1 / 6</span><button onclick="nextSlide('unbounded-knapsack-comp-steps-wrapper')">Sau ▶</button></div></div></div>

<p>Việc triển khai mã tương đối đơn giản, chỉ cần xóa chiều thứ nhất của mảng <code>dp</code>:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def unbounded_knapsack_dp_comp(wgt: list[int], val: list[int], cap: int) -&gt; int:
    """Cái túi không giới hạn: Quy hoạch động tối ưu không gian"""
    n = len(wgt)
    # Khởi tạo bảng dp
    dp = [0] * (cap + 1)
    # Chuyển trạng thái
    for i in range(1, n + 1):
        # Duyệt theo thứ tự xuôi
        for c in range(1, cap + 1):
            if wgt[i - 1] &gt; c:
                # Nếu vượt quá sức chứa túi, không chọn vật i
                dp[c] = dp[c]
            else:
                # Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[c] = max(dp[c], dp[c - wgt[i - 1]] + val[i - 1])
    return dp[cap]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Cái túi không giới hạn: Quy hoạch động tối ưu không gian */
int unboundedKnapsackDPComp(vector&lt;int&gt; &amp;wgt, vector&lt;int&gt; &amp;val, int cap) {
    int n = wgt.size();
    // Khởi tạo bảng dp
    vector&lt;int&gt; dp(cap + 1, 0);
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        for (int c = 1; c &lt;= cap; c++) {
            if (wgt[i - 1] &gt; c) {
                // Nếu vượt quá sức chứa túi, không chọn vật i
                dp[c] = dp[c];
            } else {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[c] = max(dp[c], dp[c - wgt[i - 1]] + val[i - 1]);
            }
        }
    }
    return dp[cap];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Cái túi không giới hạn: Quy hoạch động tối ưu không gian */
static int unboundedKnapsackDPComp(int[] wgt, int[] val, int cap) {
    int n = wgt.length;
    // Khởi tạo bảng dp
    int[] dp = new int[cap + 1];
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        for (int c = 1; c &lt;= cap; c++) {
            if (wgt[i - 1] &gt; c) {
                // Nếu vượt quá sức chứa túi, không chọn vật i
                dp[c] = dp[c];
            } else {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[c] = Math.max(dp[c], dp[c - wgt[i - 1]] + val[i - 1]);
            }
        }
    }
    return dp[cap];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Cái túi không giới hạn: Quy hoạch động tối ưu không gian */
function unboundedKnapsackDPComp(wgt, val, cap) {
    const n = wgt.length;
    // Khởi tạo bảng dp
    const dp = Array.from({ length: cap + 1 }, () =&gt; 0);
    // Chuyển trạng thái
    for (let i = 1; i &lt;= n; i++) {
        for (let c = 1; c &lt;= cap; c++) {
            if (wgt[i - 1] &gt; c) {
                // Nếu vượt quá sức chứa túi, không chọn vật i
                dp[c] = dp[c];
            } else {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[c] = Math.max(dp[c], dp[c - wgt[i - 1]] + val[i - 1]);
            }
        }
    }
    return dp[cap];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Cái túi không giới hạn: Quy hoạch động tối ưu không gian */
fun unboundedKnapsackDPComp(
    wgt: IntArray,
    _val: IntArray,
    cap: Int
): Int {
    val n = wgt.size
    // Khởi tạo bảng dp
    val dp = IntArray(cap + 1)
    // Chuyển trạng thái
    for (i in 1..n) {
        for (c in 1..cap) {
            if (wgt[i - 1] &gt; c) {
                // Nếu vượt quá sức chứa túi, không chọn vật i
                dp[c] = dp[c]
            } else {
                // Giá trị lớn hơn giữa việc không chọn và chọn vật i
                dp[c] = max(dp[c], dp[c - wgt[i - 1]] + _val[i - 1])
            }
        }
    }
    return dp[cap]
}</code></pre></div></div></div>

<h2>Bài toán Đổi tiền</h2>

<p>Bài toán cái túi đại diện cho một lớp lớn các bài toán quy hoạch động và có nhiều biến thể, như bài toán đổi tiền.</p>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho $n$ loại đồng xu, trong đó mệnh giá của loại đồng xu thứ $i$ là $coins[i-1]$, và số tiền mục tiêu là $amt$. <strong>Mỗi loại đồng xu có thể được chọn nhiều lần</strong>. Số lượng đồng xu ít nhất cần thiết để tạo thành số tiền mục tiêu là bao nhiêu? Nếu không thể tạo thành số tiền mục tiêu, trả về $-1$. Một ví dụ được thể hiện trong hình dưới đây.</p>
  </div>
</div>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/coin_change_example.png" alt="Dữ liệu ví dụ về bài toán Đổi tiền" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>Cách tiếp cận Quy hoạch động</h3>

<p><strong>Bài toán đổi tiền có thể được xem như một trường hợp đặc biệt của bài toán cái túi không giới hạn</strong>, với những mối liên hệ và khác biệt sau.</p>

<ul>
  <li>Hai bài toán có thể chuyển đổi qua lại: "vật phẩm" tương ứng với "đồng xu", "trọng lượng vật phẩm" tương ứng với "mệnh giá đồng xu", và "sức chứa túi" tương ứng với "số tiền mục tiêu".</li>
  <li>Mục tiêu tối ưu hóa trái ngược nhau: bài toán cái túi không giới hạn nhằm tối đa hóa giá trị vật phẩm, trong khi bài toán đổi tiền nhằm tối thiểu hóa số lượng đồng xu.</li>
  <li>Bài toán cái túi không giới hạn tìm lời giải "không vượt quá" sức chứa túi, trong khi bài toán đổi tiền tìm lời giải "đúng bằng" số tiền mục tiêu.</li>
</ul>

<p><strong>Bước 1: Suy nghĩ về các quyết định ở mỗi vòng, định nghĩa trạng thái, và từ đó thu được bảng $dp$</strong></p>

<p>Trạng thái $[i, a]$ tương ứng với bài toán con: <strong>số lượng đồng xu ít nhất trong $i$ loại đồng xu đầu tiên có thể tạo thành số tiền $a$</strong>, ký hiệu là $dp[i, a]$.</p>

<p>Bảng $dp$ hai chiều có kích thước $(n+1) \times (amt+1)$.</p>

<p><strong>Bước 2: Xác định cấu trúc con tối ưu, rồi suy ra phương trình chuyển trạng thái</strong></p>

<p>Bài toán này khác với bài toán cái túi không giới hạn ở hai khía cạnh sau về phương trình chuyển trạng thái.</p>

<ul>
  <li>Bài toán này tìm giá trị nhỏ nhất, vì vậy toán tử $\max()$ cần được đổi thành $\min()$.</li>
  <li>Mục tiêu tối ưu hóa là số lượng đồng xu chứ không phải giá trị vật phẩm, vì vậy khi một đồng xu được chọn, chỉ cần cộng thêm $1$.</li>
</ul>

<p>$$dp[i, a] = \min(dp[i-1, a], dp[i, a - coins[i-1]] + 1)$$</p>

<p><strong>Bước 3: Xác định điều kiện biên và thứ tự chuyển trạng thái</strong></p>

<p>Khi số tiền mục tiêu là $0$, số lượng đồng xu ít nhất cần thiết để tạo thành nó là $0$, vì vậy tất cả $dp[i, 0]$ trong cột đầu tiên bằng $0$.</p>

<p>Khi không có đồng xu nào, <strong>không thể tạo thành bất kỳ số tiền $> 0$ nào</strong>, đây là lời giải không hợp lệ. Để cho phép hàm $\min()$ trong phương trình chuyển trạng thái xác định và lọc bỏ những lời giải không hợp lệ, ta cân nhắc dùng $+\infty$ để đại diện cho chúng, tức là gán tất cả $dp[0, a]$ trong hàng đầu tiên bằng $+\infty$.</p>

<h3>Triển khai mã</h3>

<p>Hầu hết các ngôn ngữ lập trình không cung cấp một biến $+\infty$, và chỉ có thể dùng giá trị lớn nhất của kiểu số nguyên <code>int</code> để thay thế. Tuy nhiên, điều này có thể dẫn đến tràn số nguyên: phép toán $+1$ trong phương trình chuyển trạng thái có thể gây tràn.</p>

<p>Vì lý do này, ta dùng con số $amt + 1$ để đại diện cho lời giải không hợp lệ, vì số lượng đồng xu tối đa cần thiết để tạo thành $amt$ nhiều nhất là $amt$. Trước khi trả về, kiểm tra xem $dp[n, amt]$ có bằng $amt + 1$ không; nếu có, trả về $-1$, cho biết không thể tạo thành số tiền mục tiêu. Mã như sau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def coin_change_dp(coins: list[int], amt: int) -&gt; int:
    """Đổi tiền: Quy hoạch động"""
    n = len(coins)
    MAX = amt + 1
    # Khởi tạo bảng dp
    dp = [[0] * (amt + 1) for _ in range(n + 1)]
    # Chuyển trạng thái: hàng đầu tiên và cột đầu tiên
    for a in range(1, amt + 1):
        dp[0][a] = MAX
    # Chuyển trạng thái: các hàng và cột còn lại
    for i in range(1, n + 1):
        for a in range(1, amt + 1):
            if coins[i - 1] &gt; a:
                # Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[i][a] = dp[i - 1][a]
            else:
                # Giá trị nhỏ hơn giữa việc không chọn và chọn đồng xu i
                dp[i][a] = min(dp[i - 1][a], dp[i][a - coins[i - 1]] + 1)
    return dp[n][amt] if dp[n][amt] != MAX else -1</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Đổi tiền: Quy hoạch động */
int coinChangeDP(vector&lt;int&gt; &amp;coins, int amt) {
    int n = coins.size();
    int MAX = amt + 1;
    // Khởi tạo bảng dp
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(amt + 1, 0));
    // Chuyển trạng thái: hàng đầu tiên và cột đầu tiên
    for (int a = 1; a &lt;= amt; a++) {
        dp[0][a] = MAX;
    }
    // Chuyển trạng thái: các hàng và cột còn lại
    for (int i = 1; i &lt;= n; i++) {
        for (int a = 1; a &lt;= amt; a++) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[i][a] = dp[i - 1][a];
            } else {
                // Giá trị nhỏ hơn giữa việc không chọn và chọn đồng xu i
                dp[i][a] = min(dp[i - 1][a], dp[i][a - coins[i - 1]] + 1);
            }
        }
    }
    return dp[n][amt] != MAX ? dp[n][amt] : -1;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Đổi tiền: Quy hoạch động */
static int coinChangeDP(int[] coins, int amt) {
    int n = coins.length;
    int MAX = amt + 1;
    // Khởi tạo bảng dp
    int[][] dp = new int[n + 1][amt + 1];
    // Chuyển trạng thái: hàng đầu tiên và cột đầu tiên
    for (int a = 1; a &lt;= amt; a++) {
        dp[0][a] = MAX;
    }
    // Chuyển trạng thái: các hàng và cột còn lại
    for (int i = 1; i &lt;= n; i++) {
        for (int a = 1; a &lt;= amt; a++) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[i][a] = dp[i - 1][a];
            } else {
                // Giá trị nhỏ hơn giữa việc không chọn và chọn đồng xu i
                dp[i][a] = Math.min(dp[i - 1][a], dp[i][a - coins[i - 1]] + 1);
            }
        }
    }
    return dp[n][amt] != MAX ? dp[n][amt] : -1;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Đổi tiền: Quy hoạch động */
function coinChangeDP(coins, amt) {
    const n = coins.length;
    const MAX = amt + 1;
    // Khởi tạo bảng dp
    const dp = Array.from({ length: n + 1 }, () =&gt;
        Array.from({ length: amt + 1 }, () =&gt; 0)
    );
    // Chuyển trạng thái: hàng đầu tiên và cột đầu tiên
    for (let a = 1; a &lt;= amt; a++) {
        dp[0][a] = MAX;
    }
    // Chuyển trạng thái: các hàng và cột còn lại
    for (let i = 1; i &lt;= n; i++) {
        for (let a = 1; a &lt;= amt; a++) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[i][a] = dp[i - 1][a];
            } else {
                // Giá trị nhỏ hơn giữa việc không chọn và chọn đồng xu i
                dp[i][a] = Math.min(dp[i - 1][a], dp[i][a - coins[i - 1]] + 1);
            }
        }
    }
    return dp[n][amt] !== MAX ? dp[n][amt] : -1;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Đổi tiền: Quy hoạch động */
fun coinChangeDP(coins: IntArray, amt: Int): Int {
    val n = coins.size
    val MAX = amt + 1
    // Khởi tạo bảng dp
    val dp = Array(n + 1) { IntArray(amt + 1) }
    // Chuyển trạng thái: hàng đầu tiên và cột đầu tiên
    for (a in 1..amt) {
        dp[0][a] = MAX
    }
    // Chuyển trạng thái: các hàng và cột còn lại
    for (i in 1..n) {
        for (a in 1..amt) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[i][a] = dp[i - 1][a]
            } else {
                // Giá trị nhỏ hơn giữa việc không chọn và chọn đồng xu i
                dp[i][a] = min(dp[i - 1][a], dp[i][a - coins[i - 1]] + 1)
            }
        }
    }
    return if (dp[n][amt] != MAX) dp[n][amt] else -1
}</code></pre></div></div></div>

<p>Hình dưới đây cho thấy quá trình quy hoạch động cho đổi tiền, rất giống với bài toán cái túi không giới hạn.</p>

<div class="interactive-widget-wrapper" id="coin-change-dp-steps-wrapper"><div class="slider-container"><div class="slide active"><img src="dsa-assets/coin_change_dp_step1.png" alt="Bước 1: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 1: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step2.png" alt="Bước 2: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 2: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step3.png" alt="Bước 3: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 3: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step4.png" alt="Bước 4: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 4: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step5.png" alt="Bước 5: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 5: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step6.png" alt="Bước 6: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 6: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step7.png" alt="Bước 7: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 7: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step8.png" alt="Bước 8: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 8: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step9.png" alt="Bước 9: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 9: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step10.png" alt="Bước 10: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 10: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step11.png" alt="Bước 11: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 11: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step12.png" alt="Bước 12: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 12: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step13.png" alt="Bước 13: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 13: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step14.png" alt="Bước 14: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 14: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slide"><img src="dsa-assets/coin_change_dp_step15.png" alt="Bước 15: điền bảng dp cho bài toán Đổi tiền" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 15: điền bảng dp cho bài toán Đổi tiền</p></div><div class="slider-controls"><button onclick="prevSlide('coin-change-dp-steps-wrapper')">◀ Trước</button><span class="slider-indicator">Bước 1 / 15</span><button onclick="nextSlide('coin-change-dp-steps-wrapper')">Sau ▶</button></div></div></div>

<h3>Tối ưu Không gian</h3>

<p>Tối ưu không gian cho bài toán đổi tiền được xử lý giống như bài toán cái túi không giới hạn:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def coin_change_dp_comp(coins: list[int], amt: int) -&gt; int:
    """Đổi tiền: Quy hoạch động tối ưu không gian"""
    n = len(coins)
    MAX = amt + 1
    # Khởi tạo bảng dp
    dp = [MAX] * (amt + 1)
    dp[0] = 0
    # Chuyển trạng thái
    for i in range(1, n + 1):
        for a in range(1, amt + 1):
            if coins[i - 1] &gt; a:
                # Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[a] = dp[a]
            else:
                # Giá trị nhỏ hơn giữa việc không chọn và chọn đồng xu i
                dp[a] = min(dp[a], dp[a - coins[i - 1]] + 1)
    return dp[amt] if dp[amt] != MAX else -1</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Đổi tiền: Quy hoạch động tối ưu không gian */
int coinChangeDPComp(vector&lt;int&gt; &amp;coins, int amt) {
    int n = coins.size();
    int MAX = amt + 1;
    // Khởi tạo bảng dp
    vector&lt;int&gt; dp(amt + 1, MAX);
    dp[0] = 0;
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        for (int a = 1; a &lt;= amt; a++) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[a] = dp[a];
            } else {
                // Giá trị nhỏ hơn giữa việc không chọn và chọn đồng xu i
                dp[a] = min(dp[a], dp[a - coins[i - 1]] + 1);
            }
        }
    }
    return dp[amt] != MAX ? dp[amt] : -1;
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Đổi tiền: Quy hoạch động tối ưu không gian */
static int coinChangeDPComp(int[] coins, int amt) {
    int n = coins.length;
    int MAX = amt + 1;
    // Khởi tạo bảng dp
    int[] dp = new int[amt + 1];
    Arrays.fill(dp, MAX);
    dp[0] = 0;
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        for (int a = 1; a &lt;= amt; a++) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[a] = dp[a];
            } else {
                // Giá trị nhỏ hơn giữa việc không chọn và chọn đồng xu i
                dp[a] = Math.min(dp[a], dp[a - coins[i - 1]] + 1);
            }
        }
    }
    return dp[amt] != MAX ? dp[amt] : -1;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Đổi tiền: Quy hoạch động tối ưu không gian */
function coinChangeDPComp(coins, amt) {
    const n = coins.length;
    const MAX = amt + 1;
    // Khởi tạo bảng dp
    const dp = Array.from({ length: amt + 1 }, () =&gt; MAX);
    dp[0] = 0;
    // Chuyển trạng thái
    for (let i = 1; i &lt;= n; i++) {
        for (let a = 1; a &lt;= amt; a++) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[a] = dp[a];
            } else {
                // Giá trị nhỏ hơn giữa việc không chọn và chọn đồng xu i
                dp[a] = Math.min(dp[a], dp[a - coins[i - 1]] + 1);
            }
        }
    }
    return dp[amt] !== MAX ? dp[amt] : -1;
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Đổi tiền: Quy hoạch động tối ưu không gian */
fun coinChangeDPComp(coins: IntArray, amt: Int): Int {
    val n = coins.size
    val MAX = amt + 1
    // Khởi tạo bảng dp
    val dp = IntArray(amt + 1)
    dp.fill(MAX)
    dp[0] = 0
    // Chuyển trạng thái
    for (i in 1..n) {
        for (a in 1..amt) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[a] = dp[a]
            } else {
                // Giá trị nhỏ hơn giữa việc không chọn và chọn đồng xu i
                dp[a] = min(dp[a], dp[a - coins[i - 1]] + 1)
            }
        }
    }
    return if (dp[amt] != MAX) dp[amt] else -1
}</code></pre></div></div></div>

<h2>Bài toán Đổi tiền II</h2>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho $n$ loại đồng xu, trong đó mệnh giá của loại đồng xu thứ $i$ là $coins[i-1]$, và số tiền mục tiêu là $amt$. Mỗi loại đồng xu có thể được chọn nhiều lần. <strong>Số lượng tổ hợp đồng xu có thể tạo thành số tiền mục tiêu là bao nhiêu?</strong> Một ví dụ được thể hiện trong hình dưới đây.</p>
  </div>
</div>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/coin_change_ii_example.png" alt="Dữ liệu ví dụ về bài toán Đổi tiền II" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>Cách tiếp cận Quy hoạch động</h3>

<p>So với bài toán trước, mục tiêu của bài toán này là tìm số lượng tổ hợp, vì vậy bài toán con trở thành: <strong>số lượng tổ hợp trong $i$ loại đồng xu đầu tiên có thể tạo thành số tiền $a$</strong>. Bảng $dp$ vẫn là một ma trận hai chiều có kích thước $(n+1) \times (amt+1)$.</p>

<p>Số lượng tổ hợp cho trạng thái hiện tại bằng tổng của các tổ hợp từ việc không chọn đồng xu hiện tại và chọn đồng xu hiện tại. Phương trình chuyển trạng thái là:</p>

<p>$$dp[i, a] = dp[i-1, a] + dp[i, a - coins[i-1]]$$</p>

<p>Khi số tiền mục tiêu là $0$, không cần chọn đồng xu nào để tạo thành số tiền mục tiêu, vì vậy tất cả $dp[i, 0]$ trong cột đầu tiên nên được khởi tạo bằng $1$. Khi không có đồng xu nào, không thể tạo thành bất kỳ số tiền $>0$ nào, vì vậy tất cả $dp[0, a]$ trong hàng đầu tiên bằng $0$.</p>

<h3>Triển khai mã</h3>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def coin_change_ii_dp(coins: list[int], amt: int) -&gt; int:
    """Đổi tiền II: Quy hoạch động"""
    n = len(coins)
    # Khởi tạo bảng dp
    dp = [[0] * (amt + 1) for _ in range(n + 1)]
    # Khởi tạo cột đầu tiên
    for i in range(n + 1):
        dp[i][0] = 1
    # Chuyển trạng thái
    for i in range(1, n + 1):
        for a in range(1, amt + 1):
            if coins[i - 1] &gt; a:
                # Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[i][a] = dp[i - 1][a]
            else:
                # Tổng của 2 lựa chọn: không chọn và chọn đồng xu i
                dp[i][a] = dp[i - 1][a] + dp[i][a - coins[i - 1]]
    return dp[n][amt]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Đổi tiền II: Quy hoạch động */
int coinChangeIIDP(vector&lt;int&gt; &amp;coins, int amt) {
    int n = coins.size();
    // Khởi tạo bảng dp
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(amt + 1, 0));
    // Khởi tạo cột đầu tiên
    for (int i = 0; i &lt;= n; i++) {
        dp[i][0] = 1;
    }
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        for (int a = 1; a &lt;= amt; a++) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[i][a] = dp[i - 1][a];
            } else {
                // Tổng của 2 lựa chọn: không chọn và chọn đồng xu i
                dp[i][a] = dp[i - 1][a] + dp[i][a - coins[i - 1]];
            }
        }
    }
    return dp[n][amt];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Đổi tiền II: Quy hoạch động */
static int coinChangeIIDP(int[] coins, int amt) {
    int n = coins.length;
    // Khởi tạo bảng dp
    int[][] dp = new int[n + 1][amt + 1];
    // Khởi tạo cột đầu tiên
    for (int i = 0; i &lt;= n; i++) {
        dp[i][0] = 1;
    }
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        for (int a = 1; a &lt;= amt; a++) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[i][a] = dp[i - 1][a];
            } else {
                // Tổng của 2 lựa chọn: không chọn và chọn đồng xu i
                dp[i][a] = dp[i - 1][a] + dp[i][a - coins[i - 1]];
            }
        }
    }
    return dp[n][amt];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Đổi tiền II: Quy hoạch động */
function coinChangeIIDP(coins, amt) {
    const n = coins.length;
    // Khởi tạo bảng dp
    const dp = Array.from({ length: n + 1 }, () =&gt;
        Array.from({ length: amt + 1 }, () =&gt; 0)
    );
    // Khởi tạo cột đầu tiên
    for (let i = 0; i &lt;= n; i++) {
        dp[i][0] = 1;
    }
    // Chuyển trạng thái
    for (let i = 1; i &lt;= n; i++) {
        for (let a = 1; a &lt;= amt; a++) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[i][a] = dp[i - 1][a];
            } else {
                // Tổng của 2 lựa chọn: không chọn và chọn đồng xu i
                dp[i][a] = dp[i - 1][a] + dp[i][a - coins[i - 1]];
            }
        }
    }
    return dp[n][amt];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Đổi tiền II: Quy hoạch động */
fun coinChangeIIDP(coins: IntArray, amt: Int): Int {
    val n = coins.size
    // Khởi tạo bảng dp
    val dp = Array(n + 1) { IntArray(amt + 1) }
    // Khởi tạo cột đầu tiên
    for (i in 0..n) {
        dp[i][0] = 1
    }
    // Chuyển trạng thái
    for (i in 1..n) {
        for (a in 1..amt) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[i][a] = dp[i - 1][a]
            } else {
                // Tổng của 2 lựa chọn: không chọn và chọn đồng xu i
                dp[i][a] = dp[i - 1][a] + dp[i][a - coins[i - 1]]
            }
        }
    }
    return dp[n][amt]
}</code></pre></div></div></div>

<h3>Tối ưu Không gian</h3>

<p>Tối ưu không gian được xử lý giống hệt, chỉ cần xóa chiều đồng xu:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def coin_change_ii_dp_comp(coins: list[int], amt: int) -&gt; int:
    """Đổi tiền II: Quy hoạch động tối ưu không gian"""
    n = len(coins)
    # Khởi tạo bảng dp
    dp = [0] * (amt + 1)
    dp[0] = 1  # Có 1 cách tạo ra số tiền 0
    # Chuyển trạng thái
    for i in range(1, n + 1):
        for a in range(1, amt + 1):
            if coins[i - 1] &gt; a:
                # Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[a] = dp[a]
            else:
                # Tổng của 2 lựa chọn: không chọn và chọn đồng xu i
                dp[a] = dp[a] + dp[a - coins[i - 1]]
    return dp[amt]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Đổi tiền II: Quy hoạch động tối ưu không gian */
int coinChangeIIDPComp(vector&lt;int&gt; &amp;coins, int amt) {
    int n = coins.size();
    // Khởi tạo bảng dp
    vector&lt;int&gt; dp(amt + 1, 0);
    dp[0] = 1;
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        for (int a = 1; a &lt;= amt; a++) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[a] = dp[a];
            } else {
                // Tổng của 2 lựa chọn: không chọn và chọn đồng xu i
                dp[a] = dp[a] + dp[a - coins[i - 1]];
            }
        }
    }
    return dp[amt];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Đổi tiền II: Quy hoạch động tối ưu không gian */
static int coinChangeIIDPComp(int[] coins, int amt) {
    int n = coins.length;
    // Khởi tạo bảng dp
    int[] dp = new int[amt + 1];
    dp[0] = 1;
    // Chuyển trạng thái
    for (int i = 1; i &lt;= n; i++) {
        for (int a = 1; a &lt;= amt; a++) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[a] = dp[a];
            } else {
                // Tổng của 2 lựa chọn: không chọn và chọn đồng xu i
                dp[a] = dp[a] + dp[a - coins[i - 1]];
            }
        }
    }
    return dp[amt];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Đổi tiền II: Quy hoạch động tối ưu không gian */
function coinChangeIIDPComp(coins, amt) {
    const n = coins.length;
    // Khởi tạo bảng dp
    const dp = Array.from({ length: amt + 1 }, () =&gt; 0);
    dp[0] = 1;
    // Chuyển trạng thái
    for (let i = 1; i &lt;= n; i++) {
        for (let a = 1; a &lt;= amt; a++) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[a] = dp[a];
            } else {
                // Tổng của 2 lựa chọn: không chọn và chọn đồng xu i
                dp[a] = dp[a] + dp[a - coins[i - 1]];
            }
        }
    }
    return dp[amt];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Đổi tiền II: Quy hoạch động tối ưu không gian */
fun coinChangeIIDPComp(coins: IntArray, amt: Int): Int {
    val n = coins.size
    // Khởi tạo bảng dp
    val dp = IntArray(amt + 1)
    dp[0] = 1
    // Chuyển trạng thái
    for (i in 1..n) {
        for (a in 1..amt) {
            if (coins[i - 1] &gt; a) {
                // Nếu vượt quá số tiền mục tiêu, không chọn đồng xu i
                dp[a] = dp[a]
            } else {
                // Tổng của 2 lựa chọn: không chọn và chọn đồng xu i
                dp[a] = dp[a] + dp[a - coins[i - 1]]
            }
        }
    }
    return dp[amt]
}</code></pre></div></div></div>
`,
    originalContent: `
# Unbounded Knapsack Problem

In this section, we first solve another common knapsack problem: the unbounded knapsack, and then explore a special case of it: the coin change problem.

## Unbounded Knapsack Problem

!!! question

    Given $n$ items, where the weight of the $i$-th item is $wgt[i-1]$ and its value is $val[i-1]$, and a knapsack with capacity $cap$. **Each item can be selected multiple times**. What is the maximum value that can be placed in the knapsack within the capacity limit? An example is shown in the figure below.

![Example data for unbounded knapsack problem](unbounded_knapsack_problem.assets/unbounded_knapsack_example.png)

### Dynamic Programming Approach

The unbounded knapsack problem is very similar to the 0-1 knapsack problem, **differing only in that there is no limit on the number of times an item can be selected**.

- In the 0-1 knapsack problem, there is only one of each type of item, so after placing item $i$ in the knapsack, we can only choose from the first $i-1$ items.
- In the unbounded knapsack problem, the quantity of each type of item is unlimited, so after placing item $i$ in the knapsack, **we can still choose from the first $i$ items**.

Under the rules of the unbounded knapsack problem, the changes in state $[i, c]$ are divided into two cases.

- **Not putting item $i$**: Same as the 0-1 knapsack problem, transfer to $[i-1, c]$.
- **Putting item $i$**: Different from the 0-1 knapsack problem, transfer to $[i, c-wgt[i-1]]$.

Thus, the state transition equation becomes:

$$
dp[i, c] = \\max(dp[i-1, c], dp[i, c - wgt[i-1]] + val[i-1])
$$

### Code Implementation

Comparing the code for the two problems, there is one change in state transition from $i-1$ to $i$, with everything else identical:

\`\`\`src
[file]{unbounded_knapsack}-[class]{}-[func]{unbounded_knapsack_dp}
\`\`\`

### Space Optimization

Since the current state is transferred from states on the left and above, **after space optimization, each row in the $dp$ table should be traversed in forward order**.

This traversal order is exactly opposite to the 0-1 knapsack. Please refer to the figure below to understand the difference between the two.

=== "<1>"
    ![Space-optimized dynamic programming process for unbounded knapsack problem](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step1.png)

=== "<2>"
    ![unbounded_knapsack_dp_comp_step2](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step2.png)

=== "<3>"
    ![unbounded_knapsack_dp_comp_step3](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step3.png)

=== "<4>"
    ![unbounded_knapsack_dp_comp_step4](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step4.png)

=== "<5>"
    ![unbounded_knapsack_dp_comp_step5](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step5.png)

=== "<6>"
    ![unbounded_knapsack_dp_comp_step6](unbounded_knapsack_problem.assets/unbounded_knapsack_dp_comp_step6.png)

The code implementation is relatively simple, just delete the first dimension of the array \`dp\`:

\`\`\`src
[file]{unbounded_knapsack}-[class]{}-[func]{unbounded_knapsack_dp_comp}
\`\`\`

## Coin Change Problem

The knapsack problem represents a large class of dynamic programming problems and has many variants, such as the coin change problem.

!!! question

    Given $n$ types of coins, where the denomination of the $i$-th type of coin is $coins[i - 1]$, and the target amount is $amt$. **Each type of coin can be selected multiple times**. What is the minimum number of coins needed to make up the target amount? If it is impossible to make up the target amount, return $-1$. An example is shown in the figure below.

![Example data for coin change problem](unbounded_knapsack_problem.assets/coin_change_example.png)

### Dynamic Programming Approach

**The coin change problem can be viewed as a special case of the unbounded knapsack problem**, with the following connections and differences.

- The two problems can be converted to each other: "item" corresponds to "coin", "item weight" corresponds to "coin denomination", and "knapsack capacity" corresponds to "target amount".
- The optimization goals are opposite: the unbounded knapsack problem aims to maximize item value, while the coin change problem aims to minimize the number of coins.
- The unbounded knapsack problem seeks solutions "not exceeding" the knapsack capacity, while the coin change problem seeks solutions that "exactly" make up the target amount.

**Step 1: Think about the decisions in each round, define the state, and thus obtain the $dp$ table**

State $[i, a]$ corresponds to the subproblem: **the minimum number of coins among the first $i$ types of coins that can make up amount $a$**, denoted as $dp[i, a]$.

The two-dimensional $dp$ table has size $(n+1) \\times (amt+1)$.

**Step 2: Identify the optimal substructure, and then derive the state transition equation**

This problem differs from the unbounded knapsack problem in the following two aspects regarding the state transition equation.

- This problem seeks the minimum value, so the operator $\\max()$ needs to be changed to $\\min()$.
- The optimization target is the number of coins rather than item value, so when a coin is selected, simply add $1$.

$$
dp[i, a] = \\min(dp[i-1, a], dp[i, a - coins[i-1]] + 1)
$$

**Step 3: Determine boundary conditions and state transition order**

When the target amount is $0$, the minimum number of coins needed to make it up is $0$, so all $dp[i, 0]$ in the first column equal $0$.

When there are no coins, **it is impossible to make up any amount $> 0$**, which is an invalid solution. To enable the $\\min()$ function in the state transition equation to identify and filter out invalid solutions, we consider using $+ \\infty$ to represent them, i.e., set all $dp[0, a]$ in the first row to $+ \\infty$.

### Code Implementation

Most programming languages do not provide a $+ \\infty$ variable, and can only use the maximum value of integer type \`int\` as a substitute. However, this can lead to integer overflow: the $+ 1$ operation in the state transition equation may cause overflow.

For this reason, we use the number $amt + 1$ to represent invalid solutions, because the maximum number of coins needed to make up $amt$ is at most $amt$. Before returning, check whether $dp[n, amt]$ equals $amt + 1$; if so, return $-1$, indicating that the target amount cannot be made up. The code is as follows:

\`\`\`src
[file]{coin_change}-[class]{}-[func]{coin_change_dp}
\`\`\`

The figure below shows the dynamic programming process for coin change, which is very similar to the unbounded knapsack problem.

=== "<1>"
    ![Dynamic programming process for coin change problem](unbounded_knapsack_problem.assets/coin_change_dp_step1.png)

=== "<2>"
    ![coin_change_dp_step2](unbounded_knapsack_problem.assets/coin_change_dp_step2.png)

=== "<3>"
    ![coin_change_dp_step3](unbounded_knapsack_problem.assets/coin_change_dp_step3.png)

=== "<4>"
    ![coin_change_dp_step4](unbounded_knapsack_problem.assets/coin_change_dp_step4.png)

=== "<5>"
    ![coin_change_dp_step5](unbounded_knapsack_problem.assets/coin_change_dp_step5.png)

=== "<6>"
    ![coin_change_dp_step6](unbounded_knapsack_problem.assets/coin_change_dp_step6.png)

=== "<7>"
    ![coin_change_dp_step7](unbounded_knapsack_problem.assets/coin_change_dp_step7.png)

=== "<8>"
    ![coin_change_dp_step8](unbounded_knapsack_problem.assets/coin_change_dp_step8.png)

=== "<9>"
    ![coin_change_dp_step9](unbounded_knapsack_problem.assets/coin_change_dp_step9.png)

=== "<10>"
    ![coin_change_dp_step10](unbounded_knapsack_problem.assets/coin_change_dp_step10.png)

=== "<11>"
    ![coin_change_dp_step11](unbounded_knapsack_problem.assets/coin_change_dp_step11.png)

=== "<12>"
    ![coin_change_dp_step12](unbounded_knapsack_problem.assets/coin_change_dp_step12.png)

=== "<13>"
    ![coin_change_dp_step13](unbounded_knapsack_problem.assets/coin_change_dp_step13.png)

=== "<14>"
    ![coin_change_dp_step14](unbounded_knapsack_problem.assets/coin_change_dp_step14.png)

=== "<15>"
    ![coin_change_dp_step15](unbounded_knapsack_problem.assets/coin_change_dp_step15.png)

### Space Optimization

The space optimization for the coin change problem is handled in the same way as the unbounded knapsack problem:

\`\`\`src
[file]{coin_change}-[class]{}-[func]{coin_change_dp_comp}
\`\`\`

## Coin Change Problem II

!!! question

    Given $n$ types of coins, where the denomination of the $i$-th type of coin is $coins[i - 1]$, and the target amount is $amt$. Each type of coin can be selected multiple times. **What is the number of coin combinations that can make up the target amount?** An example is shown in the figure below.

![Example data for coin change problem II](unbounded_knapsack_problem.assets/coin_change_ii_example.png)

### Dynamic Programming Approach

Compared to the previous problem, this problem's goal is to find the number of combinations, so the subproblem becomes: **the number of combinations among the first $i$ types of coins that can make up amount $a$**. The $dp$ table remains a two-dimensional matrix of size $(n+1) \\times (amt + 1)$.

The number of combinations for the current state equals the sum of the combinations from not selecting the current coin and selecting the current coin. The state transition equation is:

$$
dp[i, a] = dp[i-1, a] + dp[i, a - coins[i-1]]
$$

When the target amount is $0$, no coins need to be selected to make up the target amount, so all $dp[i, 0]$ in the first column should be initialized to $1$. When there are no coins, it is impossible to make up any amount $>0$, so all $dp[0, a]$ in the first row equal $0$.

### Code Implementation

\`\`\`src
[file]{coin_change_ii}-[class]{}-[func]{coin_change_ii_dp}
\`\`\`

### Space Optimization

The space optimization is handled in the same way, just delete the coin dimension:

\`\`\`src
[file]{coin_change_ii}-[class]{}-[func]{coin_change_ii_dp_comp}
\`\`\`
`
  },

  'dsa-edit-distance': {
    title: '14.6 Khoảng cách chỉnh sửa (Edit Distance)',
    summary: 'Bài toán đo khoảng cách chuỗi (Levenshtein Distance) thông qua 3 thao tác: Thêm, Xóa, Thay thế. Hiểu cách lưu tạm biến "Góc trên trái" khi tối ưu không gian DP.',
    tags: ['dsa', 'dynamic-programming', 'edit-distance', 'string-algorithms'],
    domain: 'Algorithms',
    module: 'Chương 14: Quy hoạch động',
    prerequisites: ['dsa-unbounded-knapsack'],
    related: ['dsa-dp-summary'],
    updatedAt: '2026-07-19',
    readTime: '15 phút',
    content: `

<p>Khoảng cách chỉnh sửa (edit distance), còn được gọi là khoảng cách Levenshtein (Levenshtein distance), là số lần chỉnh sửa ít nhất cần thiết để biến đổi một chuỗi thành chuỗi khác, thường được dùng trong truy xuất thông tin và xử lý ngôn ngữ tự nhiên để đo độ tương đồng giữa hai chuỗi.</p>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho hai chuỗi $s$ và $t$, trả về số lần chỉnh sửa ít nhất cần thiết để biến đổi $s$ thành $t$.</p>
    <p>Bạn có thể thực hiện ba loại thao tác chỉnh sửa trên một chuỗi: chèn một ký tự, xóa một ký tự, hoặc thay thế một ký tự bằng bất kỳ ký tự khác.</p>
  </div>
</div>

<p>Như hình dưới đây, biến đổi <code>kitten</code> thành <code>sitting</code> cần 3 lần chỉnh sửa, bao gồm 2 lần thay thế và 1 lần chèn; biến đổi <code>hello</code> thành <code>algo</code> cần 3 bước, bao gồm 2 lần thay thế và 1 lần xóa.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/edit_distance_example.png" alt="Dữ liệu ví dụ về Khoảng cách chỉnh sửa" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p><strong>Bài toán khoảng cách chỉnh sửa có thể được giải thích một cách tự nhiên bằng mô hình cây quyết định</strong>. Các chuỗi tương ứng với các nút của cây, và mỗi thao tác chỉnh sửa tương ứng với một cạnh trong cây.</p>

<p>Như hình dưới đây, nếu không giới hạn thao tác, mỗi nút có thể phân nhánh thành nhiều cạnh, mỗi cạnh tương ứng với một thao tác, nghĩa là có nhiều đường đi khả thi để biến đổi <code>hello</code> thành <code>algo</code>.</p>

<p>Từ góc độ cây quyết định, mục tiêu của bài toán này là tìm đường đi ngắn nhất giữa nút <code>hello</code> và nút <code>algo</code>.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/edit_distance_decision_tree.png" alt="Biểu diễn bài toán Khoảng cách chỉnh sửa dựa trên mô hình cây quyết định" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>Cách tiếp cận Quy hoạch động</h3>

<p><strong>Bước 1: Suy nghĩ về các quyết định ở mỗi vòng, định nghĩa trạng thái, và từ đó thu được bảng $dp$</strong></p>

<p>Mỗi vòng quyết định liên quan đến việc thực hiện một thao tác chỉnh sửa trên chuỗi $s$.</p>

<p>Ta muốn kích thước bài toán giảm dần trong quá trình chỉnh sửa để có thể xây dựng các bài toán con. Gọi độ dài của chuỗi $s$ và $t$ lần lượt là $n$ và $m$. Trước tiên ta xét các ký tự cuối cùng của hai chuỗi, $s[n-1]$ và $t[m-1]$.</p>

<ul>
  <li>Nếu $s[n-1]$ và $t[m-1]$ giống nhau, ta có thể bỏ qua chúng và trực tiếp xét $s[n-2]$ và $t[m-2]$.</li>
  <li>Nếu $s[n-1]$ và $t[m-1]$ khác nhau, ta cần thực hiện một lần chỉnh sửa trên $s$ (chèn, xóa, hoặc thay thế) để làm cho ký tự cuối của hai chuỗi giống nhau, cho phép ta bỏ qua chúng và xét một bài toán có kích thước nhỏ hơn.</li>
</ul>

<p>Nói cách khác, mỗi vòng quyết định (thao tác chỉnh sửa) mà ta thực hiện trên chuỗi $s$ sẽ thay đổi các ký tự còn lại cần khớp trong $s$ và $t$. Do đó, trạng thái là ký tự thứ $i$ và thứ $j$ hiện đang được xét trong $s$ và $t$, ký hiệu là $[i, j]$.</p>

<p>Trạng thái $[i, j]$ tương ứng với bài toán con: <strong>số lần chỉnh sửa ít nhất cần thiết để biến đổi $i$ ký tự đầu tiên của $s$ thành $j$ ký tự đầu tiên của $t$</strong>.</p>

<p>Từ đó, ta thu được một bảng $dp$ hai chiều có kích thước $(i+1) \times (j+1)$.</p>

<p><strong>Bước 2: Xác định cấu trúc con tối ưu, rồi suy ra phương trình chuyển trạng thái</strong></p>

<p>Xét bài toán con $dp[i, j]$, trong đó ký tự cuối của hai chuỗi tương ứng là $s[i-1]$ và $t[j-1]$, có thể chia thành ba trường hợp dưới đây dựa trên các thao tác chỉnh sửa khác nhau.</p>

<ol>
  <li>Chèn $t[j-1]$ sau $s[i-1]$, thì bài toán con còn lại là $dp[i, j-1]$.</li>
  <li>Xóa $s[i-1]$, thì bài toán con còn lại là $dp[i-1, j]$.</li>
  <li>Thay thế $s[i-1]$ bằng $t[j-1]$, thì bài toán con còn lại là $dp[i-1, j-1]$.</li>
</ol>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/edit_distance_state_transfer.png" alt="Chuyển trạng thái cho Khoảng cách chỉnh sửa" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Dựa trên phân tích trên, ta thu được cấu trúc con tối ưu: số lần chỉnh sửa nhỏ nhất cho $dp[i, j]$ bằng giá trị nhỏ nhất trong $dp[i, j-1]$, $dp[i-1, j]$, và $dp[i-1, j-1]$, cộng thêm chi phí chỉnh sửa hiện tại là $1$. Phương trình chuyển trạng thái tương ứng là:</p>

<p>$$dp[i, j] = \min(dp[i, j-1], dp[i-1, j], dp[i-1, j-1]) + 1$$</p>

<p>Lưu ý rằng <strong>khi $s[i-1]$ và $t[j-1]$ giống nhau, không cần chỉnh sửa ký tự hiện tại</strong>, trong trường hợp đó phương trình chuyển trạng thái là:</p>

<p>$$dp[i, j] = dp[i-1, j-1]$$</p>

<p><strong>Bước 3: Xác định điều kiện biên và thứ tự chuyển trạng thái</strong></p>

<p>Khi cả hai chuỗi đều rỗng, số bước chỉnh sửa là $0$, tức là $dp[0, 0] = 0$. Khi $s$ rỗng nhưng $t$ không rỗng, số bước chỉnh sửa nhỏ nhất bằng độ dài của $t$, tức là hàng đầu tiên $dp[0, j] = j$. Khi $s$ không rỗng nhưng $t$ rỗng, số bước chỉnh sửa nhỏ nhất bằng độ dài của $s$, tức là cột đầu tiên $dp[i, 0] = i$.</p>

<p>Quan sát phương trình chuyển trạng thái, lời giải $dp[i, j]$ phụ thuộc vào các lời giải ở bên trái, phía trên, và trên-trái, vì vậy toàn bộ bảng $dp$ có thể được duyệt theo thứ tự thông qua hai vòng lặp lồng nhau.</p>

<h3>Triển khai mã</h3>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def edit_distance_dp(s: str, t: str) -&gt; int:
    """Khoảng cách chỉnh sửa: Quy hoạch động"""
    n, m = len(s), len(t)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    # Chuyển trạng thái: hàng đầu tiên và cột đầu tiên
    for i in range(1, n + 1):
        dp[i][0] = i
    for j in range(1, m + 1):
        dp[0][j] = j
    # Chuyển trạng thái: các hàng và cột còn lại
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if s[i - 1] == t[j - 1]:
                # Nếu 2 ký tự bằng nhau, bỏ qua cả 2 ký tự
                dp[i][j] = dp[i - 1][j - 1]
            else:
                # Số bước chỉnh sửa nhỏ nhất = số bước nhỏ nhất của chèn, xóa, thay thế + 1
                dp[i][j] = min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1
    return dp[n][m]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Khoảng cách chỉnh sửa: Quy hoạch động */
int editDistanceDP(string s, string t) {
    int n = s.length(), m = t.length();
    vector&lt;vector&lt;int&gt;&gt; dp(n + 1, vector&lt;int&gt;(m + 1, 0));
    // Chuyển trạng thái: hàng đầu tiên và cột đầu tiên
    for (int i = 1; i &lt;= n; i++) {
        dp[i][0] = i;
    }
    for (int j = 1; j &lt;= m; j++) {
        dp[0][j] = j;
    }
    // Chuyển trạng thái: các hàng và cột còn lại
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            if (s[i - 1] == t[j - 1]) {
                // Nếu 2 ký tự bằng nhau, bỏ qua cả 2 ký tự
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Số bước chỉnh sửa nhỏ nhất = số bước nhỏ nhất của chèn, xóa, thay thế + 1
                dp[i][j] = min(min(dp[i][j - 1], dp[i - 1][j]), dp[i - 1][j - 1]) + 1;
            }
        }
    }
    return dp[n][m];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Khoảng cách chỉnh sửa: Quy hoạch động */
static int editDistanceDP(String s, String t) {
    int n = s.length(), m = t.length();
    int[][] dp = new int[n + 1][m + 1];
    // Chuyển trạng thái: hàng đầu tiên và cột đầu tiên
    for (int i = 1; i &lt;= n; i++) {
        dp[i][0] = i;
    }
    for (int j = 1; j &lt;= m; j++) {
        dp[0][j] = j;
    }
    // Chuyển trạng thái: các hàng và cột còn lại
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= m; j++) {
            if (s.charAt(i - 1) == t.charAt(j - 1)) {
                // Nếu 2 ký tự bằng nhau, bỏ qua cả 2 ký tự
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Số bước chỉnh sửa nhỏ nhất = số bước nhỏ nhất của chèn, xóa, thay thế + 1
                dp[i][j] = Math.min(Math.min(dp[i][j - 1], dp[i - 1][j]), dp[i - 1][j - 1]) + 1;
            }
        }
    }
    return dp[n][m];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Khoảng cách chỉnh sửa: Quy hoạch động */
function editDistanceDP(s, t) {
    const n = s.length,
        m = t.length;
    const dp = Array.from({ length: n + 1 }, () =&gt; new Array(m + 1).fill(0));
    // Chuyển trạng thái: hàng đầu tiên và cột đầu tiên
    for (let i = 1; i &lt;= n; i++) {
        dp[i][0] = i;
    }
    for (let j = 1; j &lt;= m; j++) {
        dp[0][j] = j;
    }
    // Chuyển trạng thái: các hàng và cột còn lại
    for (let i = 1; i &lt;= n; i++) {
        for (let j = 1; j &lt;= m; j++) {
            if (s.charAt(i - 1) === t.charAt(j - 1)) {
                // Nếu 2 ký tự bằng nhau, bỏ qua cả 2 ký tự
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Số bước chỉnh sửa nhỏ nhất = số bước nhỏ nhất của chèn, xóa, thay thế + 1
                dp[i][j] =
                    Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1;
            }
        }
    }
    return dp[n][m];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Khoảng cách chỉnh sửa: Quy hoạch động */
fun editDistanceDP(s: String, t: String): Int {
    val n = s.length
    val m = t.length
    val dp = Array(n + 1) { IntArray(m + 1) }
    // Chuyển trạng thái: hàng đầu tiên và cột đầu tiên
    for (i in 1..n) {
        dp[i][0] = i
    }
    for (j in 1..m) {
        dp[0][j] = j
    }
    // Chuyển trạng thái: các hàng và cột còn lại
    for (i in 1..n) {
        for (j in 1..m) {
            if (s[i - 1] == t[j - 1]) {
                // Nếu 2 ký tự bằng nhau, bỏ qua cả 2 ký tự
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                // Số bước chỉnh sửa nhỏ nhất = số bước nhỏ nhất của chèn, xóa, thay thế + 1
                dp[i][j] = min(min(dp[i][j - 1], dp[i - 1][j]), dp[i - 1][j - 1]) + 1
            }
        }
    }
    return dp[n][m]
}</code></pre></div></div></div>

<p>Như hình dưới đây, quá trình chuyển trạng thái cho bài toán khoảng cách chỉnh sửa rất giống với bài toán cái túi; cả hai đều có thể được xem như quá trình điền một lưới hai chiều.</p>

<div class="interactive-widget-wrapper" id="edit-distance-dp-steps-wrapper"><div class="slider-container"><div class="slide active"><img src="dsa-assets/edit_distance_dp_step1.png" alt="Bước 1: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 1: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step2.png" alt="Bước 2: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 2: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step3.png" alt="Bước 3: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 3: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step4.png" alt="Bước 4: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 4: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step5.png" alt="Bước 5: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 5: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step6.png" alt="Bước 6: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 6: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step7.png" alt="Bước 7: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 7: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step8.png" alt="Bước 8: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 8: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step9.png" alt="Bước 9: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 9: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step10.png" alt="Bước 10: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 10: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step11.png" alt="Bước 11: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 11: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step12.png" alt="Bước 12: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 12: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step13.png" alt="Bước 13: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 13: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step14.png" alt="Bước 14: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 14: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slide"><img src="dsa-assets/edit_distance_dp_step15.png" alt="Bước 15: điền bảng dp cho Khoảng cách chỉnh sửa" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Bước 15: điền bảng dp cho Khoảng cách chỉnh sửa</p></div><div class="slider-controls"><button onclick="prevSlide('edit-distance-dp-steps-wrapper')">◀ Trước</button><span class="slider-indicator">Bước 1 / 15</span><button onclick="nextSlide('edit-distance-dp-steps-wrapper')">Sau ▶</button></div></div></div>

<h3>Tối ưu Không gian</h3>

<p>Vì $dp[i, j]$ phụ thuộc vào trạng thái phía trên $dp[i-1, j]$, bên trái $dp[i, j-1]$, và trên-trái $dp[i-1, j-1]$, duyệt xuôi sẽ làm mất trạng thái trên-trái $dp[i-1, j-1]$, còn duyệt ngược thì không thể xây dựng trước $dp[i, j-1]$, vì vậy cả hai thứ tự duyệt đều không phù hợp.</p>

<p>Vì lý do này, ta có thể dùng một biến <code>leftup</code> để tạm thời lưu trữ lời giải trên-trái $dp[i-1, j-1]$, vì vậy ta chỉ cần xem xét các lời giải bên trái và phía trên. Tình huống này giống với bài toán cái túi không giới hạn, vì vậy ta có thể dùng duyệt xuôi. Mã như sau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="python"><pre data-lang="python"><code>def edit_distance_dp_comp(s: str, t: str) -&gt; int:
    """Khoảng cách chỉnh sửa: Quy hoạch động tối ưu không gian"""
    n, m = len(s), len(t)
    dp = [0] * (m + 1)
    # Chuyển trạng thái: hàng đầu tiên
    for j in range(1, m + 1):
        dp[j] = j
    # Chuyển trạng thái: các hàng còn lại
    for i in range(1, n + 1):
        leftup = dp[0]  # Lưu tạm dp[i-1, j-1]
        dp[0] = i
        for j in range(1, m + 1):
            temp = dp[j]  # Lưu dp[j] hiện tại để làm leftup cho bước tiếp theo
            if s[i - 1] == t[j - 1]:
                # Nếu 2 ký tự bằng nhau, bỏ qua cả 2 ký tự
                dp[j] = leftup
            else:
                # Số bước chỉnh sửa nhỏ nhất = số bước nhỏ nhất của chèn, xóa, thay thế + 1
                dp[j] = min(dp[j - 1], dp[j], leftup) + 1
            leftup = temp  # Cập nhật cho dp[i-1, j-1] của vòng lặp tiếp theo
    return dp[m]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Khoảng cách chỉnh sửa: Quy hoạch động tối ưu không gian */
int editDistanceDPComp(string s, string t) {
    int n = s.length(), m = t.length();
    vector&lt;int&gt; dp(m + 1, 0);
    // Chuyển trạng thái: hàng đầu tiên
    for (int j = 1; j &lt;= m; j++) {
        dp[j] = j;
    }
    // Chuyển trạng thái: các hàng còn lại
    for (int i = 1; i &lt;= n; i++) {
        int leftup = dp[0]; // Lưu tạm dp[i-1, j-1]
        dp[0] = i;
        // Chuyển trạng thái: các cột còn lại
        for (int j = 1; j &lt;= m; j++) {
            int temp = dp[j];
            if (s[i - 1] == t[j - 1]) {
                // Nếu 2 ký tự bằng nhau, bỏ qua cả 2 ký tự
                dp[j] = leftup;
            } else {
                // Số bước chỉnh sửa nhỏ nhất = số bước nhỏ nhất của chèn, xóa, thay thế + 1
                dp[j] = min(min(dp[j - 1], dp[j]), leftup) + 1;
            }
            leftup = temp; // Cập nhật cho dp[i-1, j-1] của vòng lặp tiếp theo
        }
    }
    return dp[m];
}</code></pre></div><div class="code-tab-content" data-lang="java"><pre data-lang="java"><code>/* Khoảng cách chỉnh sửa: Quy hoạch động tối ưu không gian */
static int editDistanceDPComp(String s, String t) {
    int n = s.length(), m = t.length();
    int[] dp = new int[m + 1];
    // Chuyển trạng thái: hàng đầu tiên
    for (int j = 1; j &lt;= m; j++) {
        dp[j] = j;
    }
    // Chuyển trạng thái: các hàng còn lại
    for (int i = 1; i &lt;= n; i++) {
        int leftup = dp[0]; // Lưu tạm dp[i-1, j-1]
        dp[0] = i;
        // Chuyển trạng thái: các cột còn lại
        for (int j = 1; j &lt;= m; j++) {
            int temp = dp[j];
            if (s.charAt(i - 1) == t.charAt(j - 1)) {
                // Nếu 2 ký tự bằng nhau, bỏ qua cả 2 ký tự
                dp[j] = leftup;
            } else {
                // Số bước chỉnh sửa nhỏ nhất = số bước nhỏ nhất của chèn, xóa, thay thế + 1
                dp[j] = Math.min(Math.min(dp[j - 1], dp[j]), leftup) + 1;
            }
            leftup = temp; // Cập nhật cho dp[i-1, j-1] của vòng lặp tiếp theo
        }
    }
    return dp[m];
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Khoảng cách chỉnh sửa: Quy hoạch động tối ưu không gian */
function editDistanceDPComp(s, t) {
    const n = s.length,
        m = t.length;
    const dp = new Array(m + 1).fill(0);
    // Chuyển trạng thái: hàng đầu tiên
    for (let j = 1; j &lt;= m; j++) {
        dp[j] = j;
    }
    // Chuyển trạng thái: các hàng còn lại
    for (let i = 1; i &lt;= n; i++) {
        let leftup = dp[0]; // Lưu tạm dp[i-1, j-1]
        dp[0] = i;
        // Chuyển trạng thái: các cột còn lại
        for (let j = 1; j &lt;= m; j++) {
            const temp = dp[j];
            if (s.charAt(i - 1) === t.charAt(j - 1)) {
                // Nếu 2 ký tự bằng nhau, bỏ qua cả 2 ký tự
                dp[j] = leftup;
            } else {
                // Số bước chỉnh sửa nhỏ nhất = số bước nhỏ nhất của chèn, xóa, thay thế + 1
                dp[j] = Math.min(dp[j - 1], dp[j], leftup) + 1;
            }
            leftup = temp; // Cập nhật cho dp[i-1, j-1] của vòng lặp tiếp theo
        }
    }
    return dp[m];
}</code></pre></div><div class="code-tab-content" data-lang="kotlin"><pre data-lang="kotlin"><code>/* Khoảng cách chỉnh sửa: Quy hoạch động tối ưu không gian */
fun editDistanceDPComp(s: String, t: String): Int {
    val n = s.length
    val m = t.length
    val dp = IntArray(m + 1)
    // Chuyển trạng thái: hàng đầu tiên
    for (j in 1..m) {
        dp[j] = j
    }
    // Chuyển trạng thái: các hàng còn lại
    for (i in 1..n) {
        var leftup = dp[0] // Lưu tạm dp[i-1, j-1]
        dp[0] = i
        // Chuyển trạng thái: các cột còn lại
        for (j in 1..m) {
            val temp = dp[j]
            if (s[i - 1] == t[j - 1]) {
                // Nếu 2 ký tự bằng nhau, bỏ qua cả 2 ký tự
                dp[j] = leftup
            } else {
                // Số bước chỉnh sửa nhỏ nhất = số bước nhỏ nhất của chèn, xóa, thay thế + 1
                dp[j] = min(min(dp[j - 1], dp[j]), leftup) + 1
            }
            leftup = temp // Cập nhật cho dp[i-1, j-1] của vòng lặp tiếp theo
        }
    }
    return dp[m]
}</code></pre></div></div></div>

<div class="interactive-widget-wrapper" id="edit-distance-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'edit-distance-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'edit-distance-wrapper', 'tab-interactive'); initDpDemo('edit-distance-wrapper', DP_FRAMES_EDIT_DISTANCE)">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="color:var(--text-muted);font-size:14px;">Xem chuỗi hình minh họa tĩnh phía trên. Chuyển sang tab "Mô phỏng tương tác" để xem bảng <code>dp</code> được điền từng ô cho ví dụ biến đổi <code>"bag"</code> thành <code>"pack"</code>.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="edit-distance-wrapper-canvas"></div>
    <div class="simulator-controls" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
      <button id="edit-distance-wrapper-btn-autorun" class="control-btn" onclick="autoRunDpDemo('edit-distance-wrapper')">▶ Auto Run</button>
      <button id="edit-distance-wrapper-btn-step" class="control-btn" onclick="stepDpDemo('edit-distance-wrapper')">Bước tiếp theo ▶</button>
      <button id="edit-distance-wrapper-btn-pause" class="control-btn btn-secondary" onclick="pauseRunDpDemo('edit-distance-wrapper')" disabled>⏸ Dừng</button>
      <button id="edit-distance-wrapper-btn-reset" class="control-btn btn-secondary" onclick="initDpDemo('edit-distance-wrapper', DP_FRAMES_EDIT_DISTANCE)">↺ Reset</button>
    </div>
    <div style="margin-top:8px;">
      Tốc độ: <input type="range" min="200" max="2000" value="700" step="200" oninput="setDpDemoSpeed('edit-distance-wrapper', this.value)" /> <span id="edit-distance-wrapper-speed-label">700ms</span>
    </div>
    <div id="edit-distance-wrapper-status" class="simulator-status" style="margin-top:8px;color:var(--text-secondary);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>

`,
    originalContent: `
# Edit Distance Problem

Edit distance, also known as Levenshtein distance, refers to the minimum number of edits required to transform one string into another, commonly used in information retrieval and natural language processing to measure the similarity between two sequences.

!!! question

    Given two strings $s$ and $t$, return the minimum number of edits required to transform $s$ into $t$.

    You can perform three types of edit operations on a string: insert a character, delete a character, or replace a character with any other character.

As shown in the figure below, transforming \`kitten\` into \`sitting\` requires 3 edits, including 2 replacements and 1 insertion; transforming \`hello\` into \`algo\` requires 3 steps, including 2 replacements and 1 deletion.

![Example data for edit distance](edit_distance_problem.assets/edit_distance_example.png)

**The edit distance problem can be naturally explained using the decision tree model**. Strings correspond to tree nodes, and each edit operation corresponds to an edge in the tree.

As shown in the figure below, without restricting operations, each node can branch into many edges, with each edge corresponding to one operation, meaning there are many possible paths to transform \`hello\` into \`algo\`.

From the perspective of the decision tree, the goal of this problem is to find the shortest path between node \`hello\` and node \`algo\`.

![Representing edit distance problem based on decision tree model](edit_distance_problem.assets/edit_distance_decision_tree.png)

### Dynamic Programming Approach

**Step 1: Think about the decisions in each round, define the state, and thus obtain the $dp$ table**

Each round of decision involves performing one edit operation on string $s$.

We want the problem size to gradually decrease during the editing process so that we can construct subproblems. Let the lengths of strings $s$ and $t$ be $n$ and $m$ respectively. We first consider the tail characters of the two strings, $s[n-1]$ and $t[m-1]$.

- If $s[n-1]$ and $t[m-1]$ are the same, we can skip them and directly consider $s[n-2]$ and $t[m-2]$.
- If $s[n-1]$ and $t[m-1]$ are different, we need to perform one edit on $s$ (insert, delete, or replace) to make the tail characters of the two strings the same, allowing us to skip them and consider a smaller-scale problem.

In other words, each round of decision (edit operation) we make on string $s$ will change the remaining characters to be matched in $s$ and $t$. Therefore, the state is the $i$-th and $j$-th characters currently being considered in $s$ and $t$, denoted as $[i, j]$.

State $[i, j]$ corresponds to the subproblem: **the minimum number of edits required to change the first $i$ characters of $s$ into the first $j$ characters of $t$**.

From this, we obtain a two-dimensional $dp$ table of size $(i+1) \\times (j+1)$.

**Step 2: Identify the optimal substructure, and then derive the state transition equation**

Consider subproblem $dp[i, j]$, where the tail characters of the corresponding two strings are $s[i-1]$ and $t[j-1]$, which can be divided into the three cases shown in the figure below based on different edit operations.

1. Insert $t[j-1]$ after $s[i-1]$, then the remaining subproblem is $dp[i, j-1]$.
2. Delete $s[i-1]$, then the remaining subproblem is $dp[i-1, j]$.
3. Replace $s[i-1]$ with $t[j-1]$, then the remaining subproblem is $dp[i-1, j-1]$.

![State transition for edit distance](edit_distance_problem.assets/edit_distance_state_transfer.png)

Based on the above analysis, we obtain the optimal substructure: the minimum number of edits for $dp[i, j]$ equals the minimum of $dp[i, j-1]$, $dp[i-1, j]$, and $dp[i-1, j-1]$, plus the current edit cost of $1$. The corresponding state transition equation is:

$$
dp[i, j] = \\min(dp[i, j-1], dp[i-1, j], dp[i-1, j-1]) + 1
$$

Please note that **when $s[i-1]$ and $t[j-1]$ are the same, no edit is required for the current character**, in which case the state transition equation is:

$$
dp[i, j] = dp[i-1, j-1]
$$

**Step 3: Determine boundary conditions and state transition order**

When both strings are empty, the number of edit steps is $0$, i.e., $dp[0, 0] = 0$. When $s$ is empty but $t$ is not, the minimum number of edit steps equals the length of $t$, i.e., the first row $dp[0, j] = j$. When $s$ is not empty but $t$ is empty, the minimum number of edit steps equals the length of $s$, i.e., the first column $dp[i, 0] = i$.

Observing the state transition equation, the solution $dp[i, j]$ depends on solutions to the left, above, and upper-left, so the entire $dp$ table can be traversed in order through two nested loops.

### Code Implementation

\`\`\`src
[file]{edit_distance}-[class]{}-[func]{edit_distance_dp}
\`\`\`

As shown in the figure below, the state transition process for the edit distance problem is very similar to that of the knapsack problem; both can be viewed as the process of filling a two-dimensional grid.

=== "<1>"
    ![Dynamic programming process for edit distance](edit_distance_problem.assets/edit_distance_dp_step1.png)

=== "<2>"
    ![edit_distance_dp_step2](edit_distance_problem.assets/edit_distance_dp_step2.png)

=== "<3>"
    ![edit_distance_dp_step3](edit_distance_problem.assets/edit_distance_dp_step3.png)

=== "<4>"
    ![edit_distance_dp_step4](edit_distance_problem.assets/edit_distance_dp_step4.png)

=== "<5>"
    ![edit_distance_dp_step5](edit_distance_problem.assets/edit_distance_dp_step5.png)

=== "<6>"
    ![edit_distance_dp_step6](edit_distance_problem.assets/edit_distance_dp_step6.png)

=== "<7>"
    ![edit_distance_dp_step7](edit_distance_problem.assets/edit_distance_dp_step7.png)

=== "<8>"
    ![edit_distance_dp_step8](edit_distance_problem.assets/edit_distance_dp_step8.png)

=== "<9>"
    ![edit_distance_dp_step9](edit_distance_problem.assets/edit_distance_dp_step9.png)

=== "<10>"
    ![edit_distance_dp_step10](edit_distance_problem.assets/edit_distance_dp_step10.png)

=== "<11>"
    ![edit_distance_dp_step11](edit_distance_problem.assets/edit_distance_dp_step11.png)

=== "<12>"
    ![edit_distance_dp_step12](edit_distance_problem.assets/edit_distance_dp_step12.png)

=== "<13>"
    ![edit_distance_dp_step13](edit_distance_problem.assets/edit_distance_dp_step13.png)

=== "<14>"
    ![edit_distance_dp_step14](edit_distance_problem.assets/edit_distance_dp_step14.png)

=== "<15>"
    ![edit_distance_dp_step15](edit_distance_problem.assets/edit_distance_dp_step15.png)

### Space Optimization

Since $dp[i, j]$ depends on the states above $dp[i-1, j]$, to the left $dp[i, j-1]$, and at the upper-left $dp[i-1, j-1]$, forward traversal will lose the upper-left state $dp[i-1, j-1]$, while reverse traversal cannot construct $dp[i, j-1]$ in advance, so neither traversal order is suitable.

For this reason, we can use a variable \`leftup\` to temporarily store the upper-left solution $dp[i-1, j-1]$, so we only need to consider the solutions to the left and above. This situation is the same as in the unbounded knapsack problem, so we can use forward traversal. The code is as follows:

\`\`\`src
[file]{edit_distance}-[class]{}-[func]{edit_distance_dp_comp}
\`\`\`
`
  },

  'dsa-dp-summary': {
    title: 'Tóm tắt & Hỏi đáp',
    summary: 'So sánh Quy hoạch động với Chia để trị và Quay lui. Mẹo nhớ chiều duyệt vòng lặp khi Tối ưu hóa không gian 1D.',
    tags: ['dsa', 'dynamic-programming', 'summary'],
    domain: 'Algorithms',
    module: 'Chương 14: Quy hoạch động',
    prerequisites: ['dsa-edit-distance'],
    related: ['dsa-greedy-index'],
    updatedAt: '2026-07-19',
    readTime: '6 phút',
    content: `

<h2>Điểm lại kiến thức chính</h2>

<ul>
  <li>Quy hoạch động phân rã bài toán và tránh tính toán lặp lại bằng cách lưu trữ lời giải của các bài toán con, từ đó cải thiện đáng kể hiệu suất tính toán.</li>
  <li>Không xét đến ràng buộc thời gian, tất cả các bài toán quy hoạch động đều có thể giải bằng quay lui (tìm kiếm vét cạn), nhưng cây đệ quy chứa một lượng lớn bài toán con chồng chéo, dẫn đến hiệu suất cực kỳ thấp. Bằng cách giới thiệu một danh sách ghi nhớ, ta có thể lưu trữ lời giải của tất cả các bài toán con đã tính, đảm bảo các bài toán con chồng chéo chỉ được tính một lần.</li>
  <li>Đệ quy có nhớ là một lời giải đệ quy từ trên xuống, còn quy hoạch động tương ứng là một lời giải lặp từ dưới lên, giống như "điền vào một bảng". Vì trạng thái hiện tại chỉ phụ thuộc vào một số trạng thái cục bộ nhất định, ta có thể loại bỏ một chiều của bảng $dp$ để giảm độ phức tạp không gian.</li>
  <li>Phân rã bài toán con là một cách tiếp cận thuật toán tổng quát, với những đặc tính khác nhau ở chia để trị, quy hoạch động, và quay lui.</li>
  <li>Các bài toán quy hoạch động có ba đặc trưng lớn: bài toán con chồng chéo, cấu trúc con tối ưu, và không có hậu quả.</li>
  <li>Nếu lời giải tối ưu của bài toán gốc có thể được xây dựng từ lời giải tối ưu của các bài toán con, thì nó có cấu trúc con tối ưu.</li>
  <li>Không có hậu quả nghĩa là với một trạng thái nhất định, sự phát triển trong tương lai của nó chỉ liên quan đến trạng thái đó và không liên quan gì đến tất cả các trạng thái trong quá khứ. Nhiều bài toán tối ưu hóa tổ hợp không thỏa mãn tính chất này và không thể giải hiệu quả bằng quy hoạch động.</li>
</ul>

<p><strong>Bài toán cái túi</strong></p>

<ul>
  <li>Bài toán cái túi là một trong những bài toán quy hoạch động điển hình nhất, với các biến thể như cái túi 0-1, cái túi không giới hạn, và cái túi bội số.</li>
  <li>Định nghĩa trạng thái cho cái túi 0-1 là giá trị lớn nhất đạt được khi dùng $i$ vật phẩm đầu tiên với túi có sức chứa $c$. Dựa trên hai quyết định không đặt vật phẩm vào túi và đặt nó vào, ta có thể xác định cấu trúc con tối ưu và xây dựng phương trình chuyển trạng thái. Trong tối ưu không gian, vì mỗi trạng thái phụ thuộc vào trạng thái ngay phía trên và trên-trái, danh sách cần được duyệt theo thứ tự ngược để tránh ghi đè trạng thái trên-trái.</li>
  <li>Bài toán cái túi không giới hạn không có giới hạn về số lượng chọn của mỗi loại vật phẩm, vì vậy việc chuyển trạng thái khi chọn đặt một vật phẩm vào khác với bài toán cái túi 0-1. Vì trạng thái phụ thuộc vào trạng thái ngay phía trên và ngay bên trái, tối ưu không gian nên dùng duyệt xuôi.</li>
  <li>Bài toán đổi tiền là một biến thể của bài toán cái túi không giới hạn. Nó chuyển từ tìm giá trị "lớn nhất" sang tìm số lượng đồng xu "nhỏ nhất", vì vậy $\max()$ trong phương trình chuyển trạng thái nên được đổi thành $\min()$. Nó chuyển từ tìm lời giải "không vượt quá" sức chứa túi sang tìm lời giải "đúng bằng" số tiền mục tiêu, vì vậy $amt + 1$ được dùng để đại diện cho lời giải không hợp lệ "không thể tạo thành số tiền mục tiêu".</li>
  <li>Bài toán đổi tiền II chuyển từ tìm "số lượng đồng xu nhỏ nhất" sang tìm "số lượng tổ hợp đồng xu", vì vậy phương trình chuyển trạng thái tương ứng chuyển từ $\min()$ sang toán tử tổng.</li>
</ul>

<p><strong>Bài toán Khoảng cách chỉnh sửa</strong></p>

<ul>
  <li>Khoảng cách chỉnh sửa (khoảng cách Levenshtein) được dùng để đo độ tương đồng giữa hai chuỗi, được định nghĩa là số bước chỉnh sửa ít nhất từ một chuỗi thành chuỗi khác, với các thao tác chỉnh sửa bao gồm chèn, xóa, và thay thế.</li>
  <li>Định nghĩa trạng thái cho bài toán khoảng cách chỉnh sửa là số bước chỉnh sửa ít nhất cần thiết để biến đổi $i$ ký tự đầu tiên của $s$ thành $j$ ký tự đầu tiên của $t$. Khi $s[i] \ne t[j]$, có ba quyết định: chèn, xóa, thay thế, mỗi quyết định có bài toán con còn lại tương ứng. Từ đó, ta có thể xác định cấu trúc con tối ưu và xây dựng phương trình chuyển trạng thái. Khi $s[i] = t[j]$, không cần chỉnh sửa ký tự hiện tại.</li>
  <li>Trong khoảng cách chỉnh sửa, trạng thái phụ thuộc vào trạng thái ngay phía trên, ngay bên trái, và trên-trái, vì vậy sau khi tối ưu không gian, cả duyệt xuôi lẫn duyệt ngược đều không thể chuyển trạng thái đúng. Vì lý do này, ta dùng một biến để tạm thời lưu trữ trạng thái trên-trái, từ đó chuyển thành tình huống tương đương với bài toán cái túi không giới hạn, cho phép duyệt xuôi sau khi tối ưu không gian.</li>
</ul>

`,
    originalContent: `
# Summary

### Key Points

- Dynamic programming decomposes problems and avoids redundant computation by storing the solutions to subproblems, thereby significantly improving computational efficiency.
- Without considering time constraints, all dynamic programming problems can be solved using backtracking (brute force search), but the recursion tree contains a large number of overlapping subproblems, resulting in extremely low efficiency. By introducing a memo list, we can store the solutions to all computed subproblems, ensuring that overlapping subproblems are only computed once.
- Memoization is a top-down recursive solution, while the corresponding dynamic programming is a bottom-up iterative solution, similar to "filling in a table". Since the current state only depends on certain local states, we can eliminate one dimension of the $dp$ table to reduce space complexity.
- Subproblem decomposition is a general algorithmic approach, with different properties in divide and conquer, dynamic programming, and backtracking.
- Dynamic programming problems have three major characteristics: overlapping subproblems, optimal substructure, and no aftereffects.
- If the optimal solution to the original problem can be constructed from the optimal solutions to the subproblems, then it has optimal substructure.
- No aftereffects means that for a given state, its future development is only related to that state and has nothing to do with all past states. Many combinatorial optimization problems do not satisfy this property and cannot be solved efficiently using dynamic programming.

**Knapsack problem**

- The knapsack problem is one of the most typical dynamic programming problems, with variants such as the 0-1 knapsack, unbounded knapsack, and multiple knapsack.
- The state definition for the 0-1 knapsack is the maximum value achievable using the first $i$ items with a knapsack capacity of $c$. Based on the two decisions of not putting an item in the knapsack and putting it in, the optimal substructure can be identified and the state transition equation constructed. In space optimization, since each state depends on the state directly above and to the upper-left, the list needs to be traversed in reverse order to avoid overwriting the upper-left state.
- The unbounded knapsack problem has no limit on the selection quantity of each type of item, so the state transition for choosing to put in an item differs from the 0-1 knapsack problem. Since the state depends on the state directly above and directly to the left, space optimization should use forward traversal.
- The coin change problem is a variant of the unbounded knapsack problem. It changes from seeking the "maximum" value to seeking the "minimum" number of coins, so $\\max()$ in the state transition equation should be changed to $\\min()$. It changes from seeking "not exceeding" the knapsack capacity to seeking "exactly" making up the target amount, so $amt + 1$ is used to represent the invalid solution of "unable to make up the target amount".
- Coin change problem II changes from seeking the "minimum number of coins" to seeking the "number of coin combinations", so the state transition equation correspondingly changes from $\\min()$ to a summation operator.

**Edit distance problem**

- Edit distance (Levenshtein distance) is used to measure the similarity between two strings, defined as the minimum number of edit steps from one string to another, with edit operations including insert, delete, and replace.
- The state definition for the edit distance problem is the minimum number of edit steps required to change the first $i$ characters of $s$ into the first $j$ characters of $t$. When $s[i] \\ne t[j]$, there are three decisions: insert, delete, replace, each with corresponding remaining subproblems. From this, the optimal substructure can be identified and the state transition equation constructed. When $s[i] = t[j]$, no edit is required for the current character.
- In edit distance, the state depends on the state directly above, directly to the left, and to the upper-left, so after space optimization, neither forward nor reverse traversal can correctly perform state transitions. For this reason, we use a variable to temporarily store the upper-left state, thus transforming to a situation equivalent to the unbounded knapsack problem, allowing for forward traversal after space optimization.
`
  },

});
