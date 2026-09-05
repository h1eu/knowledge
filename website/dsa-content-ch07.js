/* ============================================================
   Knowledge OS — DSA Module: Chương 7 - Cây
   ============================================================ */

Object.assign(DSA_CONTENT, {

  'dsa-tree-index': {
    title: 'Cây',
    summary: 'Giới thiệu về Cấu trúc dữ liệu Cây (Tree), đặc biệt là Cây nhị phân và các biến thể của nó như Cây tìm kiếm nhị phân, Cây AVL.',
    tags: ['dsa', 'tree', 'binary-tree'],
    domain: 'Algorithms',
    module: 'Chương 7: Cây',
    prerequisites: ['dsa-hash-table-summary'],
    related: ['dsa-binary-tree'],
    updatedAt: '2026-07-19',
    readTime: '1 phút',
    content: `
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/chapter_tree.jpg" alt="Cây (Tree)" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<div class="callout callout-note">
  <span class="callout-icon">✨</span>
  <div class="callout-body">
    <p>Những hàng cây cổ thụ vươn cao tràn đầy sức sống, với bộ rễ ăn sâu, tán lá xum xuê và cành nhánh vươn rộng khắp nơi.</p>
    <p>Chúng minh họa một cách sống động cho nguyên lý chia để trị (divide-and-conquer) trong cấu trúc dữ liệu.</p>
  </div>
</div>

`,
    originalContent: `
# Tree

![Tree](../assets/covers/chapter_tree.jpg)

!!! abstract

    Towering trees are full of vitality, with deep roots, lush foliage, and sprawling branches.

    They offer a vivid illustration of divide-and-conquer in data structures.

`
  },

  'dsa-binary-tree': {
    title: '7.1 Binary Tree (Cây nhị phân)',
    summary: 'Tìm hiểu về Cây nhị phân, các thuật ngữ liên quan như node gốc, node lá, chiều cao, độ sâu và các biến thể phổ biến của cây nhị phân.',
    tags: ['dsa', 'tree', 'binary-tree'],
    domain: 'Algorithms',
    module: 'Chương 7: Cây',
    prerequisites: ['dsa-tree-index'],
    related: ['dsa-binary-tree-traversal'],
    updatedAt: '2026-07-19',
    readTime: '10 phút',
    content: `
<p>Một <u>cây nhị phân (binary tree)</u> là một cấu trúc dữ liệu phi tuyến tính, mô hình hóa mối quan hệ phân cấp giữa "tổ tiên" và "hậu duệ", thể hiện mô hình chia để trị trong đó mỗi lần phân tách rẽ ra thành hai nhánh. Tương tự như danh sách liên kết, đơn vị cơ bản của cây nhị phân là nút (node), và mỗi nút chứa một giá trị, một tham chiếu tới nút con trái và một tham chiếu tới nút con phải.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Nút của cây nhị phân */
class TreeNode {
    int val;         // Giá trị nút
    TreeNode left;   // Tham chiếu tới nút con trái
    TreeNode right;  // Tham chiếu tới nút con phải
    TreeNode(int x) { val = x; }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class TreeNode:
    """Nút của cây nhị phân"""
    def __init__(self, val: int):
        self.val: int = val                # Giá trị nút
        self.left: TreeNode | None = None  # Tham chiếu tới nút con trái
        self.right: TreeNode | None = None # Tham chiếu tới nút con phải</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Nút của cây nhị phân */
struct TreeNode {
    int val;          // Giá trị nút
    TreeNode *left;   // Con trỏ tới nút con trái
    TreeNode *right;  // Con trỏ tới nút con phải
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Nút của cây nhị phân */
class TreeNode {
    val; // Giá trị nút
    left; // Con trỏ tới nút con trái
    right; // Con trỏ tới nút con phải
    constructor(val, left, right) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}</code></pre></div></div></div>
<p>Mỗi nút có hai tham chiếu (con trỏ), trỏ lần lượt tới <u>nút con trái (left-child node)</u> và <u>nút con phải (right-child node)</u>. Nút này được gọi là <u>nút cha (parent node)</u> của hai nút con đó. Khi cho một nút bất kỳ của cây nhị phân, ta gọi cây được tạo thành từ nút con trái của nút đó và tất cả các nút bên dưới nó là <u>cây con trái (left subtree)</u> của nút này. Tương tự, <u>cây con phải (right subtree)</u> cũng được định nghĩa như vậy.</p>
<p><strong>Trong cây nhị phân, mọi nút không phải nút lá đều có nút con, do đó có cây con khác rỗng.</strong> Như hình dưới đây, nếu coi "Nút 2" là một nút cha, thì nút con trái và phải của nó lần lượt là "Nút 4" và "Nút 5". Cây con trái được tạo thành bởi "Nút 4" và tất cả các nút bên dưới nó, còn cây con phải được tạo thành bởi "Nút 5" và tất cả các nút bên dưới nó.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_tree_definition.png" alt="Nút cha, nút con, cây con" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>7.1.1 Thuật ngữ thường dùng của Cây nhị phân</h2>
<p>Các thuật ngữ thường dùng của cây nhị phân được thể hiện trong hình dưới đây.</p>
<ul>
  <li><u>Nút gốc (root node)</u>: Nút ở cấp cao nhất của một cây nhị phân, không có nút cha.</li>
  <li><u>Nút lá (leaf node)</u>: Nút không có bất kỳ nút con nào, cả hai con trỏ của nó đều trỏ tới <code>None</code>.</li>
  <li><u>Cạnh (edge)</u>: Đoạn thẳng nối hai nút, biểu diễn một tham chiếu (con trỏ) giữa các nút.</li>
  <li><u>Tầng (level)</u> của một nút: Tăng dần từ trên xuống dưới, với nút gốc ở tầng 1.</li>
  <li><u>Bậc (degree)</u> của một nút: Số lượng nút con mà một nút có. Trong cây nhị phân, bậc có thể là 0, 1 hoặc 2.</li>
  <li><u>Chiều cao (height)</u> của cây nhị phân: Số cạnh từ nút gốc tới nút lá xa nhất.</li>
  <li><u>Độ sâu (depth)</u> của một nút: Số cạnh từ nút gốc tới nút đó.</li>
  <li><u>Chiều cao (height)</u> của một nút: Số cạnh từ nút lá xa nhất tới nút đó.</li>
</ul>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_tree_terminology.png" alt="Thuật ngữ thường dùng của Cây nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Chúng ta thường định nghĩa "chiều cao" và "độ sâu" là số cạnh đã đi qua, nhưng một số giáo trình và đề bài lại định nghĩa chúng là số nút trên đường đi. Trong trường hợp đó, cả hai giá trị đều lớn hơn 1 đơn vị.</p>
  </div>
</div>

<h2>7.1.2 Các thao tác cơ bản trên Cây nhị phân</h2>

<h3>7.1.2.1 Khởi tạo Cây nhị phân</h3>
<p>Tương tự như danh sách liên kết, việc khởi tạo một cây nhị phân bao gồm việc tạo các nút trước, sau đó thiết lập các tham chiếu (con trỏ) giữa chúng.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>// Khởi tạo các nút
TreeNode n1 = new TreeNode(1);
TreeNode n2 = new TreeNode(2);
TreeNode n3 = new TreeNode(3);
TreeNode n4 = new TreeNode(4);
TreeNode n5 = new TreeNode(5);
// Liên kết tham chiếu (con trỏ) giữa các nút
n1.left = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code># Khởi tạo cây nhị phân
# Khởi tạo các nút
n1 = TreeNode(val=1)
n2 = TreeNode(val=2)
n3 = TreeNode(val=3)
n4 = TreeNode(val=4)
n5 = TreeNode(val=5)
# Liên kết tham chiếu (con trỏ) giữa các nút
n1.left = n2
n1.right = n3
n2.left = n4
n2.right = n5</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Khởi tạo cây nhị phân */
// Khởi tạo các nút
TreeNode* n1 = new TreeNode(1);
TreeNode* n2 = new TreeNode(2);
TreeNode* n3 = new TreeNode(3);
TreeNode* n4 = new TreeNode(4);
TreeNode* n5 = new TreeNode(5);
// Liên kết tham chiếu (con trỏ) giữa các nút
n1-&gt;left = n2;
n1-&gt;right = n3;
n2-&gt;left = n4;
n2-&gt;right = n5;</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Khởi tạo cây nhị phân */
// Khởi tạo các nút
let n1 = new TreeNode(1),
    n2 = new TreeNode(2),
    n3 = new TreeNode(3),
    n4 = new TreeNode(4),
    n5 = new TreeNode(5);
// Liên kết tham chiếu (con trỏ) giữa các nút
n1.left = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;</code></pre></div></div></div>

<h3>7.1.2.2 Chèn và xóa nút</h3>
<p>Tương tự như danh sách liên kết, việc chèn và xóa nút trong cây nhị phân có thể được thực hiện bằng cách chỉnh sửa con trỏ. Hình dưới đây minh họa một ví dụ.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_tree_add_remove.png" alt="Chèn và xóa nút trong cây nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>TreeNode P = new TreeNode(0);
// Chèn nút P vào giữa n1 và n2
n1.left = P;
P.left = n2;
// Xóa nút P
n1.left = n2;</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code># Chèn và xóa nút
p = TreeNode(0)
# Chèn nút P vào giữa n1 -&gt; n2
n1.left = p
p.left = n2
# Xóa nút P
n1.left = n2</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Chèn và xóa nút */
TreeNode* P = new TreeNode(0);
// Chèn nút P vào giữa n1 và n2
n1-&gt;left = P;
P-&gt;left = n2;
// Xóa nút P
n1-&gt;left = n2;</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Chèn và xóa nút */
let P = new TreeNode(0);
// Chèn nút P vào giữa n1 và n2
n1.left = P;
P.left = n2;
// Xóa nút P
n1.left = n2;</code></pre></div></div></div>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Hãy nhớ rằng việc chèn một nút có thể làm thay đổi cấu trúc logic ban đầu của cây nhị phân, trong khi việc xóa một nút thường kéo theo việc loại bỏ nút đó cùng với toàn bộ cây con của nó. Do đó, trong thực tế, việc chèn và xóa trong cây nhị phân thường được triển khai như một chuỗi thao tác phối hợp với nhau để đạt được kết quả có ý nghĩa.</p>
  </div>
</div>

<h2>7.1.3 Các loại Cây nhị phân phổ biến</h2>

<h3>7.1.3.1 Cây nhị phân hoàn hảo (Perfect Binary Tree)</h3>
<p>Như hình dưới đây, một <u>cây nhị phân hoàn hảo (perfect binary tree)</u> có mọi tầng đều được lấp đầy hoàn toàn. Trong cây nhị phân hoàn hảo, các nút lá có bậc $0$, còn tất cả các nút khác có bậc $2$. Nếu chiều cao cây là $h$, tổng số nút là $2^{h+1} - 1$, tuân theo một quy luật tăng theo hàm mũ tiêu chuẩn, phản ánh hiện tượng phân chia tế bào phổ biến trong tự nhiên.</p>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Xin lưu ý rằng trong cộng đồng Trung Quốc, cây nhị phân hoàn hảo thường được gọi là <u>full binary tree</u>.</p>
  </div>
</div>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/perfect_binary_tree.png" alt="Cây nhị phân hoàn hảo" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>7.1.3.2 Cây nhị phân đầy đủ (Complete Binary Tree)</h3>
<p>Như hình dưới đây, một <u>cây nhị phân đầy đủ (complete binary tree)</u> chỉ cho phép tầng dưới cùng chưa được lấp đầy hoàn toàn, và các nút ở tầng dưới cùng đó phải được lấp liên tục từ trái sang phải. Lưu ý rằng một cây nhị phân hoàn hảo cũng đồng thời là một cây nhị phân đầy đủ.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/complete_binary_tree.png" alt="Cây nhị phân đầy đủ" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>7.1.3.3 Cây nhị phân toàn phần (Full Binary Tree)</h3>
<p>Như hình dưới đây, trong một <u>cây nhị phân toàn phần (full binary tree)</u>, tất cả các nút ngoại trừ nút lá đều có hai nút con.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/full_binary_tree.png" alt="Cây nhị phân toàn phần" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>7.1.3.4 Cây nhị phân cân bằng (Balanced Binary Tree)</h3>
<p>Như hình dưới đây, trong một <u>cây nhị phân cân bằng (balanced binary tree)</u>, hiệu số tuyệt đối giữa chiều cao cây con trái và cây con phải của bất kỳ nút nào cũng không vượt quá 1.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/balanced_binary_tree.png" alt="Cây nhị phân cân bằng" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>7.1.4 Sự suy biến của Cây nhị phân</h2>
<p>Hình dưới đây so sánh cấu trúc lý tưởng và cấu trúc suy biến của cây nhị phân. Khi mọi tầng đều được lấp đầy, cây trở thành một "cây nhị phân hoàn hảo"; khi tất cả các nút nghiêng hẳn về một phía, cây nhị phân suy biến thành một "danh sách liên kết".</p>
<ul>
  <li>Cây nhị phân hoàn hảo là trường hợp lý tưởng, tận dụng tối đa ưu điểm chia để trị của cây nhị phân.</li>
  <li>Danh sách liên kết đại diện cho trường hợp cực đoan ngược lại, khi mọi thao tác đều trở thành thao tác tuyến tính với độ phức tạp thời gian suy giảm còn $O(n)$.</li>
</ul>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_tree_best_worst_cases.png" alt="Cấu trúc tốt nhất và tệ nhất của Cây nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Như bảng dưới đây, trong cấu trúc tốt nhất và tệ nhất, cây nhị phân đạt giá trị lớn nhất hoặc nhỏ nhất về số lượng nút lá, tổng số nút và chiều cao.</p>
<p align="center">Bảng &nbsp; Cấu trúc tốt nhất và tệ nhất của Cây nhị phân</p>
<table style="width:100%; border-collapse:collapse; font-size:14px; margin:1.5em 0; border: 1px solid var(--border-color);">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;"></th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Cây nhị phân hoàn hảo</th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Danh sách liên kết</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Số nút ở tầng $i$</td><td style="padding:10px 15px;">$2^{i-1}$</td><td style="padding:10px 15px;">$1$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Số nút lá của cây có chiều cao $h$</td><td style="padding:10px 15px;">$2^h$</td><td style="padding:10px 15px;">$1$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Tổng số nút của cây có chiều cao $h$</td><td style="padding:10px 15px;">$2^{h+1} - 1$</td><td style="padding:10px 15px;">$h + 1$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Chiều cao của cây có $n$ nút</td><td style="padding:10px 15px;">$\\\\log_2 (n+1) - 1$</td><td style="padding:10px 15px;">$n - 1$</td></tr>
  </tbody>
</table>

`,
    originalContent: `
# Binary Tree

A <u>binary tree</u> is a non-linear data structure that models the hierarchical relationship between "ancestors" and "descendants" and embodies a divide-and-conquer pattern in which each split branches into two. Similar to a linked list, the basic unit of a binary tree is a node, and each node contains a value, a reference to its left child node, and a reference to its right child node.

=== "Python"

    \`\`\`python title=""
    class TreeNode:
        """Binary tree node"""
        def __init__(self, val: int):
            self.val: int = val                # Node value
            self.left: TreeNode | None = None  # Reference to left child node
            self.right: TreeNode | None = None # Reference to right child node
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    /* Binary tree node */
    struct TreeNode {
        int val;          // Node value
        TreeNode *left;   // Pointer to left child node
        TreeNode *right;  // Pointer to right child node
        TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    };
    \`\`\`

=== "Java"

    \`\`\`java title=""
    /* Binary tree node */
    class TreeNode {
        int val;         // Node value
        TreeNode left;   // Reference to left child node
        TreeNode right;  // Reference to right child node
        TreeNode(int x) { val = x; }
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    /* Binary tree node */
    class TreeNode(int? x) {
        public int? val = x;    // Node value
        public TreeNode? left;  // Reference to left child node
        public TreeNode? right; // Reference to right child node
    }
    \`\`\`

=== "Go"

    \`\`\`go title=""
    /* Binary tree node */
    type TreeNode struct {
        Val   int
        Left  *TreeNode
        Right *TreeNode
    }
    /* Constructor */
    func NewTreeNode(v int) *TreeNode {
        return &TreeNode{
            Left:  nil, // Pointer to left child node
            Right: nil, // Pointer to right child node
            Val:   v,   // Node value
        }
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    /* Binary tree node */
    class TreeNode {
        var val: Int // Node value
        var left: TreeNode? // Reference to left child node
        var right: TreeNode? // Reference to right child node

        init(x: Int) {
            val = x
        }
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    /* Binary tree node */
    class TreeNode {
        val; // Node value
        left; // Pointer to left child node
        right; // Pointer to right child node
        constructor(val, left, right) {
            this.val = val === undefined ? 0 : val;
            this.left = left === undefined ? null : left;
            this.right = right === undefined ? null : right;
        }
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    /* Binary tree node */
    class TreeNode {
        val: number;
        left: TreeNode | null;
        right: TreeNode | null;

        constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
            this.val = val === undefined ? 0 : val; // Node value
            this.left = left === undefined ? null : left; // Reference to left child node
            this.right = right === undefined ? null : right; // Reference to right child node
        }
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    /* Binary tree node */
    class TreeNode {
      int val;         // Node value
      TreeNode? left;  // Reference to left child node
      TreeNode? right; // Reference to right child node
      TreeNode(this.val, [this.left, this.right]);
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    use std::rc::Rc;
    use std::cell::RefCell;

    /* Binary tree node */
    struct TreeNode {
        val: i32,                               // Node value
        left: Option<Rc<RefCell<TreeNode>>>,    // Reference to left child node
        right: Option<Rc<RefCell<TreeNode>>>,   // Reference to right child node
    }

    impl TreeNode {
        /* Constructor */
        fn new(val: i32) -> Rc<RefCell<Self>> {
            Rc::new(RefCell::new(Self {
                val,
                left: None,
                right: None
            }))
        }
    }
    \`\`\`

=== "C"

    \`\`\`c title=""
    /* Binary tree node */
    typedef struct TreeNode {
        int val;                // Node value
        int height;             // Node height
        struct TreeNode *left;  // Pointer to left child node
        struct TreeNode *right; // Pointer to right child node
    } TreeNode;

    /* Constructor */
    TreeNode *newTreeNode(int val) {
        TreeNode *node;

        node = (TreeNode *)malloc(sizeof(TreeNode));
        node->val = val;
        node->height = 0;
        node->left = NULL;
        node->right = NULL;
        return node;
    }
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    /* Binary tree node */
    class TreeNode(val _val: Int) {  // Node value
        val left: TreeNode? = null   // Reference to left child node
        val right: TreeNode? = null  // Reference to right child node
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    ### Binary tree node class ###
    class TreeNode
      attr_accessor :val    # Node value
      attr_accessor :left   # Reference to left child node
      attr_accessor :right  # Reference to right child node

      def initialize(val)
        @val = val
      end
    end
    \`\`\`

Each node has two references (pointers), pointing respectively to the <u>left-child node</u> and <u>right-child node</u>. This node is called the <u>parent node</u> of these two child nodes. When given a node of a binary tree, we call the tree formed by this node's left child and all nodes below it the <u>left subtree</u> of this node. Similarly, the <u>right subtree</u> can be defined.

**In a binary tree, every non-leaf node has child nodes and therefore non-empty subtrees.** As shown in the figure below, if "Node 2" is regarded as a parent node, its left and right child nodes are "Node 4" and "Node 5" respectively. The left subtree is formed by "Node 4" and all nodes beneath it, while the right subtree is formed by "Node 5" and all nodes beneath it.

![Parent Node, child Node, subtree](binary_tree.assets/binary_tree_definition.png)

## Common Terminology of Binary Trees

The commonly used terminology of binary trees is shown in the figure below.

- <u>Root node</u>: The node at the top level of a binary tree, which does not have a parent node.
- <u>Leaf node</u>: A node that does not have any child nodes, with both of its pointers pointing to \`None\`.
- <u>Edge</u>: A line segment that connects two nodes, representing a reference (pointer) between the nodes.
- The <u>level</u> of a node: It increases from top to bottom, with the root node being at level 1.
- The <u>degree</u> of a node: The number of child nodes that a node has. In a binary tree, the degree can be 0, 1, or 2.
- The <u>height</u> of a binary tree: The number of edges from the root node to the farthest leaf node.
- The <u>depth</u> of a node: The number of edges from the root node to the node.
- The <u>height</u> of a node: The number of edges from the farthest leaf node to the node.

![Common Terminology of Binary Trees](binary_tree.assets/binary_tree_terminology.png)

!!! tip

    We usually define "height" and "depth" as the number of edges traversed, but some textbooks and problem statements define them as the number of nodes on the path. In that case, both values are larger by 1.

## Basic Operations of Binary Trees

### Initializing a Binary Tree

Similar to a linked list, the initialization of a binary tree involves first creating the nodes and then establishing the references (pointers) between them.

=== "Python"

    \`\`\`python title="binary_tree.py"
    # Initializing a binary tree
    # Initializing nodes
    n1 = TreeNode(val=1)
    n2 = TreeNode(val=2)
    n3 = TreeNode(val=3)
    n4 = TreeNode(val=4)
    n5 = TreeNode(val=5)
    # Linking references (pointers) between nodes
    n1.left = n2
    n1.right = n3
    n2.left = n4
    n2.right = n5
    \`\`\`

=== "C++"

    \`\`\`cpp title="binary_tree.cpp"
    /* Initializing a binary tree */
    // Initializing nodes
    TreeNode* n1 = new TreeNode(1);
    TreeNode* n2 = new TreeNode(2);
    TreeNode* n3 = new TreeNode(3);
    TreeNode* n4 = new TreeNode(4);
    TreeNode* n5 = new TreeNode(5);
    // Linking references (pointers) between nodes
    n1->left = n2;
    n1->right = n3;
    n2->left = n4;
    n2->right = n5;
    \`\`\`

=== "Java"

    \`\`\`java title="binary_tree.java"
    // Initializing nodes
    TreeNode n1 = new TreeNode(1);
    TreeNode n2 = new TreeNode(2);
    TreeNode n3 = new TreeNode(3);
    TreeNode n4 = new TreeNode(4);
    TreeNode n5 = new TreeNode(5);
    // Linking references (pointers) between nodes
    n1.left = n2;
    n1.right = n3;
    n2.left = n4;
    n2.right = n5;
    \`\`\`

=== "C#"

    \`\`\`csharp title="binary_tree.cs"
    /* Initializing a binary tree */
    // Initializing nodes
    TreeNode n1 = new(1);
    TreeNode n2 = new(2);
    TreeNode n3 = new(3);
    TreeNode n4 = new(4);
    TreeNode n5 = new(5);
    // Linking references (pointers) between nodes
    n1.left = n2;
    n1.right = n3;
    n2.left = n4;
    n2.right = n5;
    \`\`\`

=== "Go"

    \`\`\`go title="binary_tree.go"
    /* Initializing a binary tree */
    // Initializing nodes
    n1 := NewTreeNode(1)
    n2 := NewTreeNode(2)
    n3 := NewTreeNode(3)
    n4 := NewTreeNode(4)
    n5 := NewTreeNode(5)
    // Linking references (pointers) between nodes
    n1.Left = n2
    n1.Right = n3
    n2.Left = n4
    n2.Right = n5
    \`\`\`

=== "Swift"

    \`\`\`swift title="binary_tree.swift"
    // Initializing nodes
    let n1 = TreeNode(x: 1)
    let n2 = TreeNode(x: 2)
    let n3 = TreeNode(x: 3)
    let n4 = TreeNode(x: 4)
    let n5 = TreeNode(x: 5)
    // Linking references (pointers) between nodes
    n1.left = n2
    n1.right = n3
    n2.left = n4
    n2.right = n5
    \`\`\`

=== "JS"

    \`\`\`javascript title="binary_tree.js"
    /* Initializing a binary tree */
    // Initializing nodes
    let n1 = new TreeNode(1),
        n2 = new TreeNode(2),
        n3 = new TreeNode(3),
        n4 = new TreeNode(4),
        n5 = new TreeNode(5);
    // Linking references (pointers) between nodes
    n1.left = n2;
    n1.right = n3;
    n2.left = n4;
    n2.right = n5;
    \`\`\`

=== "TS"

    \`\`\`typescript title="binary_tree.ts"
    /* Initializing a binary tree */
    // Initializing nodes
    let n1 = new TreeNode(1),
        n2 = new TreeNode(2),
        n3 = new TreeNode(3),
        n4 = new TreeNode(4),
        n5 = new TreeNode(5);
    // Linking references (pointers) between nodes
    n1.left = n2;
    n1.right = n3;
    n2.left = n4;
    n2.right = n5;
    \`\`\`

=== "Dart"

    \`\`\`dart title="binary_tree.dart"
    /* Initializing a binary tree */
    // Initializing nodes
    TreeNode n1 = new TreeNode(1);
    TreeNode n2 = new TreeNode(2);
    TreeNode n3 = new TreeNode(3);
    TreeNode n4 = new TreeNode(4);
    TreeNode n5 = new TreeNode(5);
    // Linking references (pointers) between nodes
    n1.left = n2;
    n1.right = n3;
    n2.left = n4;
    n2.right = n5;
    \`\`\`

=== "Rust"

    \`\`\`rust title="binary_tree.rs"
    // Initializing nodes
    let n1 = TreeNode::new(1);
    let n2 = TreeNode::new(2);
    let n3 = TreeNode::new(3);
    let n4 = TreeNode::new(4);
    let n5 = TreeNode::new(5);
    // Linking references (pointers) between nodes
    n1.borrow_mut().left = Some(n2.clone());
    n1.borrow_mut().right = Some(n3);
    n2.borrow_mut().left = Some(n4);
    n2.borrow_mut().right = Some(n5);
    \`\`\`

=== "C"

    \`\`\`c title="binary_tree.c"
    /* Initializing a binary tree */
    // Initializing nodes
    TreeNode *n1 = newTreeNode(1);
    TreeNode *n2 = newTreeNode(2);
    TreeNode *n3 = newTreeNode(3);
    TreeNode *n4 = newTreeNode(4);
    TreeNode *n5 = newTreeNode(5);
    // Linking references (pointers) between nodes
    n1->left = n2;
    n1->right = n3;
    n2->left = n4;
    n2->right = n5;
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="binary_tree.kt"
    // Initializing nodes
    val n1 = TreeNode(1)
    val n2 = TreeNode(2)
    val n3 = TreeNode(3)
    val n4 = TreeNode(4)
    val n5 = TreeNode(5)
    // Linking references (pointers) between nodes
    n1.left = n2
    n1.right = n3
    n2.left = n4
    n2.right = n5
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="binary_tree.rb"
    # Initializing a binary tree
    # Initializing nodes
    n1 = TreeNode.new(1)
    n2 = TreeNode.new(2)
    n3 = TreeNode.new(3)
    n4 = TreeNode.new(4)
    n5 = TreeNode.new(5)
    # Linking references (pointers) between nodes
    n1.left = n2
    n1.right = n3
    n2.left = n4
    n2.right = n5
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=class%20TreeNode%3A%0A%20%20%20%20%22%22%22%E4%BA%8C%E5%8F%89%E6%A0%91%E8%8A%82%E7%82%B9%E7%B1%BB%22%22%22%0A%20%20%20%20def%20__init__%28self,%20val%3A%20int%29%3A%0A%20%20%20%20%20%20%20%20self.val%3A%20int%20%3D%20val%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%23%20%E8%8A%82%E7%82%B9%E5%80%BC%0A%20%20%20%20%20%20%20%20self.left%3A%20TreeNode%20%7C%20None%20%3D%20None%20%20%23%20%E5%B7%A6%E5%AD%90%E8%8A%82%E7%82%B9%E5%BC%95%E7%94%A8%0A%20%20%20%20%20%20%20%20self.right%3A%20TreeNode%20%7C%20None%20%3D%20None%20%23%20%E5%8F%B3%E5%AD%90%E8%8A%82%E7%82%B9%E5%BC%95%E7%94%A8%0A%0A%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E4%BA%8C%E5%8F%89%E6%A0%91%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E8%8A%82%E7%82%B9%0A%20%20%20%20n1%20%3D%20TreeNode%28val%3D1%29%0A%20%20%20%20n2%20%3D%20TreeNode%28val%3D2%29%0A%20%20%20%20n3%20%3D%20TreeNode%28val%3D3%29%0A%20%20%20%20n4%20%3D%20TreeNode%28val%3D4%29%0A%20%20%20%20n5%20%3D%20TreeNode%28val%3D5%29%0A%20%20%20%20%23%20%E6%9E%84%E5%BB%BA%E8%8A%82%E7%82%B9%E4%B9%8B%E9%97%B4%E7%9A%84%E5%BC%95%E7%94%A8%EF%BC%88%E6%8C%87%E9%92%88%EF%BC%89%0A%20%20%20%20n1.left%20%3D%20n2%0A%20%20%20%20n1.right%20%3D%20n3%0A%20%20%20%20n2.left%20%3D%20n4%0A%20%20%20%20n2.right%20%3D%20n5&cumulative=false&curInstr=3&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

### Inserting and Removing Nodes

Similar to a linked list, inserting and removing nodes in a binary tree can be achieved by modifying pointers. The figure below provides an example.

![Inserting and removing nodes in a binary tree](binary_tree.assets/binary_tree_add_remove.png)

=== "Python"

    \`\`\`python title="binary_tree.py"
    # Inserting and removing nodes
    p = TreeNode(0)
    # Inserting node P between n1 -> n2
    n1.left = p
    p.left = n2
    # Removing node P
    n1.left = n2
    \`\`\`

=== "C++"

    \`\`\`cpp title="binary_tree.cpp"
    /* Inserting and removing nodes */
    TreeNode* P = new TreeNode(0);
    // Inserting node P between n1 and n2
    n1->left = P;
    P->left = n2;
    // Removing node P
    n1->left = n2;
    \`\`\`

=== "Java"

    \`\`\`java title="binary_tree.java"
    TreeNode P = new TreeNode(0);
    // Inserting node P between n1 and n2
    n1.left = P;
    P.left = n2;
    // Removing node P
    n1.left = n2;
    \`\`\`

=== "C#"

    \`\`\`csharp title="binary_tree.cs"
    /* Inserting and removing nodes */
    TreeNode P = new(0);
    // Inserting node P between n1 and n2
    n1.left = P;
    P.left = n2;
    // Removing node P
    n1.left = n2;
    \`\`\`

=== "Go"

    \`\`\`go title="binary_tree.go"
    /* Inserting and removing nodes */
    // Inserting node P between n1 and n2
    p := NewTreeNode(0)
    n1.Left = p
    p.Left = n2
    // Removing node P
    n1.Left = n2
    \`\`\`

=== "Swift"

    \`\`\`swift title="binary_tree.swift"
    let P = TreeNode(x: 0)
    // Inserting node P between n1 and n2
    n1.left = P
    P.left = n2
    // Removing node P
    n1.left = n2
    \`\`\`

=== "JS"

    \`\`\`javascript title="binary_tree.js"
    /* Inserting and removing nodes */
    let P = new TreeNode(0);
    // Inserting node P between n1 and n2
    n1.left = P;
    P.left = n2;
    // Removing node P
    n1.left = n2;
    \`\`\`

=== "TS"

    \`\`\`typescript title="binary_tree.ts"
    /* Inserting and removing nodes */
    const P = new TreeNode(0);
    // Inserting node P between n1 and n2
    n1.left = P;
    P.left = n2;
    // Removing node P
    n1.left = n2;
    \`\`\`

=== "Dart"

    \`\`\`dart title="binary_tree.dart"
    /* Inserting and removing nodes */
    TreeNode P = new TreeNode(0);
    // Inserting node P between n1 and n2
    n1.left = P;
    P.left = n2;
    // Removing node P
    n1.left = n2;
    \`\`\`

=== "Rust"

    \`\`\`rust title="binary_tree.rs"
    let p = TreeNode::new(0);
    // Inserting node P between n1 and n2
    n1.borrow_mut().left = Some(p.clone());
    p.borrow_mut().left = Some(n2.clone());
    // Removing node P
    n1.borrow_mut().left = Some(n2);
    \`\`\`

=== "C"

    \`\`\`c title="binary_tree.c"
    /* Inserting and removing nodes */
    TreeNode *P = newTreeNode(0);
    // Inserting node P between n1 and n2
    n1->left = P;
    P->left = n2;
    // Removing node P
    n1->left = n2;
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title="binary_tree.kt"
    val P = TreeNode(0)
    // Inserting node P between n1 and n2
    n1.left = P
    P.left = n2
    // Removing node P
    n1.left = n2
    \`\`\`

=== "Ruby"

    \`\`\`ruby title="binary_tree.rb"
    # Inserting and removing nodes
    _p = TreeNode.new(0)
    # Inserting node _p between n1 and n2
    n1.left = _p
    _p.left = n2
    # Removing node _p
    n1.left = n2
    \`\`\`

??? pythontutor "Code Visualization"

    https://pythontutor.com/render.html#code=class%20TreeNode%3A%0A%20%20%20%20%22%22%22%E4%BA%8C%E5%8F%89%E6%A0%91%E8%8A%82%E7%82%B9%E7%B1%BB%22%22%22%0A%20%20%20%20def%20__init__%28self,%20val%3A%20int%29%3A%0A%20%20%20%20%20%20%20%20self.val%3A%20int%20%3D%20val%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%23%20%E8%8A%82%E7%82%B9%E5%80%BC%0A%20%20%20%20%20%20%20%20self.left%3A%20TreeNode%20%7C%20None%20%3D%20None%20%20%23%20%E5%B7%A6%E5%AD%90%E8%8A%82%E7%82%B9%E5%BC%95%E7%94%A8%0A%20%20%20%20%20%20%20%20self.right%3A%20TreeNode%20%7C%20None%20%3D%20None%20%23%20%E5%8F%B3%E5%AD%90%E8%8A%82%E7%82%B9%E5%BC%95%E7%94%A8%0A%0A%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E4%BA%8C%E5%8F%89%E6%A0%91%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E8%8A%82%E7%82%B9%0A%20%20%20%20n1%20%3D%20TreeNode%28val%3D1%29%0A%20%20%20%20n2%20%3D%20TreeNode%28val%3D2%29%0A%20%20%20%20n3%20%3D%20TreeNode%28val%3D3%29%0A%20%20%20%20n4%20%3D%20TreeNode%28val%3D4%29%0A%20%20%20%20n5%20%3D%20TreeNode%28val%3D5%29%0A%20%20%20%20%23%20%E6%9E%84%E5%BB%BA%E8%8A%82%E7%82%B9%E4%B9%8B%E9%97%B4%E7%9A%84%E5%BC%95%E7%94%A8%EF%BC%88%E6%8C%87%E9%92%88%EF%BC%89%0A%20%20%20%20n1.left%20%3D%20n2%0A%20%20%20%20n1.right%20%3D%20n3%0A%20%20%20%20n2.left%20%3D%20n4%0A%20%20%20%20n2.right%20%3D%20n5%0A%0A%20%20%20%20%23%20%E6%8F%92%E5%85%A5%E4%B8%8E%E5%88%A0%E9%99%A4%E8%8A%82%E7%82%B9%0A%20%20%20%20p%20%3D%20TreeNode%280%29%0A%20%20%20%20%23%20%E5%9C%A8%20n1%20-%3E%20n2%20%E4%B8%AD%E9%97%B4%E6%8F%92%E5%85%A5%E8%8A%82%E7%82%B9%20P%0A%20%20%20%20n1.left%20%3D%20p%0A%20%20%20%20p.left%20%3D%20n2%0A%20%20%20%20%23%20%E5%88%A0%E9%99%A4%E8%8A%82%E7%82%B9%20P%0A%20%20%20%20n1.left%20%3D%20n2&cumulative=false&curInstr=37&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

!!! tip

    Keep in mind that inserting a node can alter the original logical structure of a binary tree, while deleting a node usually entails removing that node together with its entire subtree. In practice, insertion and deletion in binary trees are therefore typically implemented as coordinated sequences of operations to achieve a meaningful result.

## Common Types of Binary Trees

### Perfect Binary Tree

As shown in the figure below, a <u>perfect binary tree</u> has every level completely filled. In a perfect binary tree, leaf nodes have a degree of $0$, while all other nodes have a degree of $2$. If the tree height is $h$, the total number of nodes is $2^{h+1} - 1$, following a standard exponential pattern that mirrors the common phenomenon of cell division in nature.

!!! tip

    Please note that in the Chinese community, a perfect binary tree is often referred to as a <u>full binary tree</u>.

![Perfect binary tree](binary_tree.assets/perfect_binary_tree.png)

### Complete Binary Tree

As shown in the figure below, a <u>complete binary tree</u> only allows the bottom level to be incompletely filled, and the nodes at the bottom level must be filled continuously from left to right. Note that a perfect binary tree is also a complete binary tree.

![Complete binary tree](binary_tree.assets/complete_binary_tree.png)

### Full Binary Tree

As shown in the figure below, in a <u>full binary tree</u>, all nodes except leaf nodes have two child nodes.

![Full binary tree](binary_tree.assets/full_binary_tree.png)

### Balanced Binary Tree

As shown in the figure below, in a <u>balanced binary tree</u>, the absolute difference between the height of the left and right subtrees of any node does not exceed 1.

![Balanced binary tree](binary_tree.assets/balanced_binary_tree.png)

## Degeneration of Binary Trees

The figure below contrasts the ideal and degenerate structures of binary trees. When every level is filled, the tree becomes a "perfect binary tree"; when all nodes skew to one side, the binary tree degenerates into a "linked list".

- A perfect binary tree is the ideal case, fully leveraging the divide-and-conquer advantages of binary trees.
- A linked list represents the other extreme, where all operations become linear operations with time complexity degrading to $O(n)$.

![The Best and Worst Structures of Binary Trees](binary_tree.assets/binary_tree_best_worst_cases.png)

As shown in the table below, in the best and worst structures, the binary tree achieves either maximum or minimum values for leaf node count, total number of nodes, and height.

<p align="center"> Table <id> &nbsp; The Best and Worst Structures of Binary Trees </p>

|                                                 | Perfect binary tree | Linked list |
| ----------------------------------------------- | ------------------- | ----------- |
| Number of nodes at level $i$                    | $2^{i-1}$           | $1$         |
| Number of leaf nodes in a tree with height $h$  | $2^h$               | $1$         |
| Total number of nodes in a tree with height $h$ | $2^{h+1} - 1$       | $h + 1$     |
| Height of a tree with $n$ total nodes           | $\\log_2 (n+1) - 1$  | $n - 1$     |

`
  },

  'dsa-binary-tree-traversal': {
    title: '7.2 Duyệt cây nhị phân (Binary Tree Traversal)',
    summary: 'Tìm hiểu các phương pháp duyệt cây nhị phân: duyệt theo tầng (BFS) và duyệt theo chiều sâu (tiền thứ tự, trung thứ tự, hậu thứ tự).',
    tags: ['dsa', 'tree', 'traversal', 'bfs', 'dfs'],
    domain: 'Algorithms',
    module: 'Chương 7: Cây',
    prerequisites: ['dsa-binary-tree'],
    related: ['dsa-array-representation-of-tree'],
    updatedAt: '2026-07-19',
    readTime: '8 phút',
    content: `
<p>Xét từ góc độ cấu trúc vật lý, cây là một cấu trúc dữ liệu dựa trên danh sách liên kết. Do đó, phương pháp duyệt của nó liên quan đến việc truy cập các nút lần lượt thông qua con trỏ. Tuy nhiên, cây là một cấu trúc dữ liệu phi tuyến tính, điều này khiến việc duyệt cây phức tạp hơn việc duyệt danh sách liên kết, đòi hỏi sự hỗ trợ của các thuật toán tìm kiếm.</p>
<p>Các phương pháp duyệt phổ biến của cây nhị phân bao gồm duyệt theo tầng, duyệt tiền thứ tự, duyệt trung thứ tự và duyệt hậu thứ tự.</p>

<h2>7.2.1 Duyệt theo tầng (Level-Order Traversal)</h2>
<p>Như hình dưới đây, <u>duyệt theo tầng (level-order traversal)</u> duyệt cây nhị phân từ trên xuống dưới, tầng qua tầng. Trong mỗi tầng, nó ghé thăm các nút từ trái sang phải.</p>
<p>Duyệt theo tầng về bản chất là <u>duyệt theo chiều rộng (breadth-first traversal)</u>, còn được gọi là <u>tìm kiếm theo chiều rộng (breadth-first search - BFS)</u>, mở rộng dần ra ngoài theo từng tầng.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_tree_bfs.png" alt="Duyệt theo tầng của cây nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>7.2.1.1 Triển khai mã nguồn</h3>
<p>Duyệt theo chiều rộng thường được triển khai với sự hỗ trợ của một "hàng đợi" (queue). Hàng đợi tuân theo quy tắc "vào trước ra trước" (FIFO), trong khi duyệt theo chiều rộng tuân theo quy tắc "tiến từng tầng một"; ý tưởng nền tảng của cả hai đều nhất quán với nhau. Đoạn mã triển khai như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Duyệt theo tầng (level-order) */
static List&lt;Integer&gt; levelOrder(TreeNode root) {
    // Khởi tạo hàng đợi, thêm nút gốc
    Queue&lt;TreeNode&gt; queue = new LinkedList&lt;&gt;();
    queue.add(root);
    // Khởi tạo một danh sách để lưu chuỗi duyệt
    List&lt;Integer&gt; list = new ArrayList&lt;&gt;();
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll(); // Xuất hàng đợi
        list.add(node.val);           // Lưu giá trị nút
        if (node.left != null)
            queue.offer(node.left);   // Nhập hàng đợi nút con trái
        if (node.right != null)
            queue.offer(node.right);  // Nhập hàng đợi nút con phải
    }
    return list;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func levelOrder(root: TreeNode) -&gt; [Int] {
    // Initialize queue, add root node
    var queue: [TreeNode] = [root]
    // Initialize a list to save the traversal sequence
    var list: [Int] = []
    while !queue.isEmpty {
        let node = queue.removeFirst() // Dequeue
        list.append(node.val) // Save node value
        if let left = node.left {
            queue.append(left) // Left child node enqueue
        }
        if let right = node.right {
            queue.append(right) // Right child node enqueue
        }
    }
    return list
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>List&lt;int&gt; levelOrder(TreeNode? root) {
  // Initialize queue, add root node
  Queue&lt;TreeNode?&gt; queue = Queue();
  queue.add(root);
  // Initialize a list to save the traversal sequence
  List&lt;int&gt; res = [];
  while (queue.isNotEmpty) {
    TreeNode? node = queue.removeFirst(); // Dequeue
    res.add(node!.val); // Save node value
    if (node.left != null) queue.add(node.left); // Left child node enqueue
    if (node.right != null) queue.add(node.right); // Right child node enqueue
  }
  return res;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def level_order(root: TreeNode | None) -&gt; list[int]:
    """Duyệt theo tầng (level-order)"""
    # Khởi tạo hàng đợi, thêm nút gốc
    queue: deque[TreeNode] = deque()
    queue.append(root)
    # Khởi tạo một danh sách để lưu chuỗi duyệt
    res = []
    while queue:
        node: TreeNode = queue.popleft()  # Xuất hàng đợi
        res.append(node.val)  # Lưu giá trị nút
        if node.left is not None:
            queue.append(node.left)  # Nhập hàng đợi nút con trái
        if node.right is not None:
            queue.append(node.right)  # Nhập hàng đợi nút con phải
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Duyệt theo tầng (level-order) */
vector&lt;int&gt; levelOrder(TreeNode *root) {
    // Khởi tạo hàng đợi, thêm nút gốc
    queue&lt;TreeNode *&gt; queue;
    queue.push(root);
    // Khởi tạo một danh sách để lưu chuỗi duyệt
    vector&lt;int&gt; vec;
    while (!queue.empty()) {
        TreeNode *node = queue.front();
        queue.pop();              // Xuất hàng đợi
        vec.push_back(node-&gt;val); // Lưu giá trị nút
        if (node-&gt;left != nullptr)
            queue.push(node-&gt;left); // Nhập hàng đợi nút con trái
        if (node-&gt;right != nullptr)
            queue.push(node-&gt;right); // Nhập hàng đợi nút con phải
    }
    return vec;
}</code></pre></div></div></div>

<h3>7.2.1.2 Phân tích độ phức tạp</h3>
<ul>
  <li><strong>Độ phức tạp thời gian là $O(n)$</strong>: Tất cả các nút đều được ghé thăm một lần, mất thời gian $O(n)$, với $n$ là số lượng nút.</li>
  <li><strong>Độ phức tạp không gian là $O(n)$</strong>: Trong trường hợp xấu nhất, tức là một cây nhị phân toàn phần, trước khi duyệt tới tầng dưới cùng, hàng đợi chứa tối đa $(n + 1) / 2$ nút cùng một lúc, chiếm không gian $O(n)$.</li>
</ul>

<h2>7.2.2 Duyệt tiền thứ tự, trung thứ tự và hậu thứ tự</h2>
<p>Tương ứng, duyệt tiền thứ tự, trung thứ tự và hậu thứ tự đều thuộc <u>duyệt theo chiều sâu (depth-first traversal)</u>, còn được gọi là <u>tìm kiếm theo chiều sâu (depth-first search - DFS)</u>, đi càng sâu càng tốt trước khi quay lui.</p>
<p>Hình dưới đây cho thấy cách duyệt theo chiều sâu hoạt động trên một cây nhị phân. <strong>Duyệt theo chiều sâu giống như việc "đi bộ" quanh toàn bộ chu vi của cây nhị phân</strong>, gặp ba vị trí tại mỗi nút, tương ứng với duyệt tiền thứ tự, trung thứ tự và hậu thứ tự.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_tree_dfs.png" alt="Duyệt tiền thứ tự, trung thứ tự và hậu thứ tự của cây nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>7.2.2.1 Triển khai mã nguồn</h3>
<p>Tìm kiếm theo chiều sâu thường được triển khai dựa trên đệ quy:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Duyệt hậu thứ tự (post-order) */
static void postOrder(TreeNode root) {
    if (root == null)
        return;
    // Thứ tự truy cập: cây con trái -&gt; cây con phải -&gt; nút gốc
    postOrder(root.left);
    postOrder(root.right);
    list.add(root.val);
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func postOrder(root: TreeNode?) {
    guard let root = root else {
        return
    }
    // Visit priority: left subtree -&gt; right subtree -&gt; root node
    postOrder(root: root.left)
    postOrder(root: root.right)
    list.append(root.val)
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void postOrder(TreeNode? node) {
  if (node == null) return;
  // Visit priority: left subtree -&gt; right subtree -&gt; root node
  postOrder(node.left);
  postOrder(node.right);
  list.add(node.val);
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def post_order(root: TreeNode | None):
    """Duyệt hậu thứ tự (post-order)"""
    if root is None:
        return
    # Thứ tự truy cập: cây con trái -&gt; cây con phải -&gt; nút gốc
    post_order(root=root.left)
    post_order(root=root.right)
    res.append(root.val)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Duyệt hậu thứ tự (post-order) */
void postOrder(TreeNode *root) {
    if (root == nullptr)
        return;
    // Thứ tự truy cập: cây con trái -&gt; cây con phải -&gt; nút gốc
    postOrder(root-&gt;left);
    postOrder(root-&gt;right);
    vec.push_back(root-&gt;val);
}</code></pre></div></div></div>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Tìm kiếm theo chiều sâu cũng có thể được triển khai theo kiểu lặp (iterative), độc giả quan tâm có thể tự khám phá thêm.</p>
  </div>
</div>
<p>Hình dưới đây cho thấy quá trình đệ quy của duyệt tiền thứ tự trên cây nhị phân, có thể chia thành hai giai đoạn đối lập nhau: "đi xuống" và "quay về".</p>
<ol>
  <li>"Đi xuống" nghĩa là thực hiện một lời gọi đệ quy mới, trong đó chương trình ghé thăm nút tiếp theo.</li>
  <li>"Quay về" nghĩa là lời gọi hàm kết thúc và trả về, cho biết nút hiện tại đã được xử lý xong hoàn toàn.</li>
</ol>
<div class="interactive-widget-wrapper" id="preorder-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img loading="lazy" src="dsa-assets/preorder_step1.png" alt="preorder_step1" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 1</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_step2.png" alt="preorder_step2" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 2</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_step3.png" alt="preorder_step3" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 3</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_step4.png" alt="preorder_step4" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 4</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_step5.png" alt="preorder_step5" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 5</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_step6.png" alt="preorder_step6" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 6</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_step7.png" alt="preorder_step7" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 7</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_step8.png" alt="preorder_step8" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 8</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_step9.png" alt="preorder_step9" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 9</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_step10.png" alt="preorder_step10" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 10</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_step11.png" alt="preorder_step11" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 11</p></div>
    <div class="slider-controls">
      <button class="control-btn" onclick="prevSlide('preorder-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 11</span>
      <button class="control-btn" onclick="nextSlide('preorder-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>

<h3>7.2.2.2 Phân tích độ phức tạp</h3>
<ul>
  <li><strong>Độ phức tạp thời gian là $O(n)$</strong>: Tất cả các nút đều được ghé thăm một lần, mất thời gian $O(n)$.</li>
  <li><strong>Độ phức tạp không gian là $O(n)$</strong>: Trong trường hợp xấu nhất, tức là cây suy biến thành một danh sách liên kết, độ sâu đệ quy đạt tới $n$, hệ thống chiếm không gian ngăn xếp $O(n)$.</li>
</ul>

<div class="interactive-widget-wrapper" id="tree-traversal-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'tree-traversal-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'tree-traversal-wrapper', 'tab-interactive'); initTreeTraversalDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="text-align:center; color:var(--text-secondary); font-size:14px;">Xem tab "Mô phỏng tương tác" để theo dõi từng bước duyệt BFS, tiền thứ tự, trung thứ tự và hậu thứ tự trên cùng một cây nhị phân mẫu.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div style="display:flex; gap:8px; justify-content:center; margin-bottom:12px; flex-wrap:wrap;">
      <button class="control-btn" onclick="setTreeTraversalMode('level')">Duyệt theo tầng (BFS)</button>
      <button class="control-btn" onclick="setTreeTraversalMode('pre')">Tiền thứ tự</button>
      <button class="control-btn" onclick="setTreeTraversalMode('in')">Trung thứ tự</button>
      <button class="control-btn" onclick="setTreeTraversalMode('post')">Hậu thứ tự</button>
    </div>
    <div id="tree-traversal-canvas" style="min-height:220px;"></div>
    <div class="simulator-controls" style="display:flex; gap:10px; justify-content:center; margin:12px 0;">
      <button id="tree-traversal-btn-autorun" class="control-btn" onclick="autoRunTreeTraversal()">▶ Auto Run</button>
      <button id="tree-traversal-btn-step" class="control-btn" onclick="stepTreeTraversal()">Bước tiếp theo ▶</button>
      <button id="tree-traversal-btn-pause" class="control-btn btn-secondary" onclick="pauseRunTreeTraversal()" disabled>⏸ Dừng</button>
      <button id="tree-traversal-btn-reset" class="control-btn btn-secondary" onclick="initTreeTraversalDemo()">↺ Reset</button>
    </div>
    <div id="tree-traversal-speed-control" style="text-align:center; margin-bottom:10px;">
      Tốc độ: <input type="range" min="200" max="2000" value="800" step="200" oninput="setTreeTraversalSpeed(this.value)" /> <span id="tree-traversal-speed-label">800ms</span>
    </div>
    <div id="tree-traversal-status" class="simulator-status" style="text-align:center; min-height:24px;">
      Chọn kiểu duyệt rồi nhấp "Auto Run" để bắt đầu mô phỏng tự động.
    </div>
  </div>
</div>

`,
    originalContent: `
# Binary Tree Traversal

From a physical structure perspective, a tree is a data structure based on linked lists. Hence, its traversal method involves accessing nodes one by one through pointers. However, a tree is a non-linear data structure, which makes traversing a tree more complex than traversing a linked list, requiring the assistance of search algorithms.

The common traversal methods for binary trees include level-order traversal, pre-order traversal, in-order traversal, and post-order traversal.

## Level-Order Traversal

As shown in the figure below, <u>level-order traversal</u> traverses the binary tree from top to bottom, layer by layer. Within each level, it visits nodes from left to right.

Level-order traversal is essentially <u>breadth-first traversal</u>, also known as <u>breadth-first search (BFS)</u>, which proceeds outward level by level.

![Level-order traversal of a binary tree](binary_tree_traversal.assets/binary_tree_bfs.png)

### Code Implementation

Breadth-first traversal is typically implemented with the help of a "queue". The queue follows the "first in, first out" rule, while breadth-first traversal follows the "layer-by-layer progression" rule; the underlying ideas of the two are consistent. The implementation code is as follows:

\`\`\`src
[file]{binary_tree_bfs}-[class]{}-[func]{level_order}
\`\`\`

### Complexity Analysis

- **Time complexity is $O(n)$**: All nodes are visited once, using $O(n)$ time, where $n$ is the number of nodes.
- **Space complexity is $O(n)$**: In the worst case, i.e., a full binary tree, before traversing to the bottom level, the queue contains at most $(n + 1) / 2$ nodes simultaneously, occupying $O(n)$ space.

## Preorder, Inorder, and Postorder Traversal

Correspondingly, preorder, inorder, and postorder traversals all belong to <u>depth-first traversal</u>, also known as <u>depth-first search (DFS)</u>, which goes as deep as possible before backtracking.

The figure below shows how depth-first traversal works on a binary tree. **Depth-first traversal is like "walking" around the perimeter of the entire binary tree**, encountering three positions at each node, corresponding to preorder, inorder, and postorder traversal.

![Preorder, inorder, and postorder traversal of a binary tree](binary_tree_traversal.assets/binary_tree_dfs.png)

### Code Implementation

Depth-first search is usually implemented based on recursion:

\`\`\`src
[file]{binary_tree_dfs}-[class]{}-[func]{post_order}
\`\`\`

!!! tip

    Depth-first search can also be implemented iteratively, and interested readers can explore this on their own.

The figure below shows the recursive process of preorder traversal of a binary tree, which can be divided into two opposite phases: "descending" and "returning".

1. "Descending" means making a new recursive call, during which the program visits the next node.
2. "Returning" means the function call returns, indicating that the current node has been fully processed.

=== "<1>"
    ![The recursive process of preorder traversal](binary_tree_traversal.assets/preorder_step1.png)

=== "<2>"
    ![preorder_step2](binary_tree_traversal.assets/preorder_step2.png)

=== "<3>"
    ![preorder_step3](binary_tree_traversal.assets/preorder_step3.png)

=== "<4>"
    ![preorder_step4](binary_tree_traversal.assets/preorder_step4.png)

=== "<5>"
    ![preorder_step5](binary_tree_traversal.assets/preorder_step5.png)

=== "<6>"
    ![preorder_step6](binary_tree_traversal.assets/preorder_step6.png)

=== "<7>"
    ![preorder_step7](binary_tree_traversal.assets/preorder_step7.png)

=== "<8>"
    ![preorder_step8](binary_tree_traversal.assets/preorder_step8.png)

=== "<9>"
    ![preorder_step9](binary_tree_traversal.assets/preorder_step9.png)

=== "<10>"
    ![preorder_step10](binary_tree_traversal.assets/preorder_step10.png)

=== "<11>"
    ![preorder_step11](binary_tree_traversal.assets/preorder_step11.png)

### Complexity Analysis

- **Time complexity is $O(n)$**: All nodes are visited once, using $O(n)$ time.
- **Space complexity is $O(n)$**: In the worst case, i.e., the tree degenerates into a linked list, the recursion depth reaches $n$, and the system occupies $O(n)$ stack frame space.

`
  },

  'dsa-array-representation-of-tree': {
    title: '7.3 Biểu diễn Cây bằng mảng (Array Representation of Binary Trees)',
    summary: 'Tìm hiểu cách biểu diễn cây nhị phân bằng mảng thông qua công thức ánh xạ chỉ số cha-con, áp dụng cho cả cây hoàn hảo và cây bất kỳ.',
    tags: ['dsa', 'tree', 'array'],
    domain: 'Algorithms',
    module: 'Chương 7: Cây',
    prerequisites: ['dsa-binary-tree-traversal'],
    related: ['dsa-binary-search-tree'],
    updatedAt: '2026-07-19',
    readTime: '7 phút',
    content: `
<p>Trong biểu diễn bằng danh sách liên kết, đơn vị lưu trữ của cây nhị phân là một nút <code>TreeNode</code>, và các nút được kết nối bằng con trỏ. Phần trước đã giới thiệu các thao tác cơ bản của cây nhị phân theo cách biểu diễn này.</p>
<p>Vậy, liệu chúng ta có thể dùng một mảng để biểu diễn cây nhị phân không? Câu trả lời là có.</p>

<h2>7.3.1 Biểu diễn Cây nhị phân hoàn hảo</h2>
<p>Trước tiên hãy phân tích một trường hợp đơn giản. Cho một cây nhị phân hoàn hảo, ta lưu tất cả các nút vào một mảng theo thứ tự duyệt theo tầng, trong đó mỗi nút tương ứng với một chỉ số mảng duy nhất.</p>
<p>Dựa trên đặc điểm của duyệt theo tầng, ta có thể suy ra một "công thức ánh xạ" giữa chỉ số nút cha và chỉ số các nút con: <strong>Nếu chỉ số của một nút là $i$, thì chỉ số nút con trái của nó là $2i + 1$ và chỉ số nút con phải là $2i + 2$</strong>. Hình dưới đây thể hiện mối quan hệ ánh xạ giữa các chỉ số nút khác nhau.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/array_representation_binary_tree.png" alt="Biểu diễn bằng mảng của một cây nhị phân hoàn hảo" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p><strong>Công thức ánh xạ đóng vai trò tương tự như các tham chiếu nút (con trỏ) trong danh sách liên kết</strong>. Cho một nút bất kỳ trong mảng, ta có thể truy cập nút con trái (phải) của nó bằng công thức ánh xạ.</p>

<h2>7.3.2 Biểu diễn Cây nhị phân bất kỳ</h2>
<p>Cây nhị phân hoàn hảo là một trường hợp đặc biệt; ở các tầng giữa của một cây nhị phân, thường có nhiều giá trị <code>None</code>. Vì chuỗi duyệt theo tầng không bao gồm các giá trị <code>None</code> này, ta không thể suy ra số lượng và cách phân bố các giá trị <code>None</code> chỉ dựa vào chuỗi này. <strong>Điều này có nghĩa là nhiều cấu trúc cây nhị phân khác nhau có thể tương ứng với cùng một chuỗi duyệt theo tầng</strong>.</p>
<p>Như hình dưới đây, cho một cây nhị phân không hoàn hảo, phương pháp biểu diễn bằng mảng ở trên sẽ thất bại.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/array_representation_without_empty.png" alt="Chuỗi duyệt theo tầng tương ứng với nhiều khả năng cây nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Để giải quyết vấn đề này, <strong>ta có thể ghi rõ ràng tất cả các giá trị <code>None</code> trong chuỗi duyệt theo tầng</strong>. Như hình dưới đây, một khi làm vậy, chuỗi duyệt theo tầng có thể biểu diễn duy nhất một cây nhị phân. Đoạn mã ví dụ như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Biểu diễn cây nhị phân bằng mảng */
// Dùng lớp bao Integer để có thể dùng null đánh dấu vị trí trống
Integer[] tree = { 1, 2, 3, 4, null, 6, 7, 8, 9, null, null, 12, null, null, 15 };</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code># Biểu diễn cây nhị phân bằng mảng
# Dùng None để biểu diễn các vị trí trống
tree = [1, 2, 3, 4, None, 6, 7, 8, 9, None, None, 12, None, None, 15]</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Biểu diễn cây nhị phân bằng mảng */
// Dùng giá trị số nguyên lớn nhất INT_MAX để đánh dấu vị trí trống
vector&lt;int&gt; tree = {1, 2, 3, 4, INT_MAX, 6, 7, 8, 9, INT_MAX, INT_MAX, 12, INT_MAX, INT_MAX, 15};</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Biểu diễn cây nhị phân bằng mảng */
// Dùng null để biểu diễn các vị trí trống
let tree = [1, 2, 3, 4, null, 6, 7, 8, 9, null, null, 12, null, null, 15];</code></pre></div></div></div>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/array_representation_with_empty.png" alt="Biểu diễn bằng mảng của một cây nhị phân bất kỳ" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Đáng chú ý là <strong>cây nhị phân đầy đủ rất phù hợp để biểu diễn bằng mảng</strong>. Nhớ lại định nghĩa của cây nhị phân đầy đủ, <code>None</code> chỉ xuất hiện ở tầng dưới cùng và về phía bên phải, <strong>nghĩa là tất cả các giá trị <code>None</code> đều phải xuất hiện ở cuối chuỗi duyệt theo tầng</strong>.</p>
<p>Điều này có nghĩa là khi dùng một mảng để biểu diễn một cây nhị phân đầy đủ, ta hoàn toàn có thể bỏ qua việc lưu trữ tất cả các giá trị <code>None</code>, điều này rất tiện lợi. Hình dưới đây minh họa một ví dụ.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/array_representation_complete_binary_tree.png" alt="Biểu diễn bằng mảng của một cây nhị phân đầy đủ" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Đoạn mã dưới đây triển khai một cây nhị phân theo cách biểu diễn bằng mảng, bao gồm các thao tác sau:</p>
<ul>
  <li>Cho một nút, lấy giá trị, nút con (trái/phải) và nút cha của nó.</li>
  <li>Lấy chuỗi duyệt tiền thứ tự, trung thứ tự, hậu thứ tự và theo tầng.</li>
</ul>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Lớp cây nhị phân biểu diễn bằng mảng */
class ArrayBinaryTree {
    private List&lt;Integer&gt; tree;

    /* Hàm khởi tạo */
    public ArrayBinaryTree(List&lt;Integer&gt; arr) {
        tree = new ArrayList&lt;&gt;(arr);
    }

    /* Kích thước danh sách */
    public int size() {
        return tree.size();
    }

    /* Lấy giá trị của nút tại chỉ số i */
    public Integer val(int i) {
        // Nếu chỉ số vượt ngoài phạm vi, trả về null biểu thị vị trí trống
        if (i &lt; 0 || i &gt;= size())
            return null;
        return tree.get(i);
    }

    /* Lấy chỉ số của nút con trái của nút tại chỉ số i */
    public Integer left(int i) {
        return 2 * i + 1;
    }

    /* Lấy chỉ số của nút con phải của nút tại chỉ số i */
    public Integer right(int i) {
        return 2 * i + 2;
    }

    /* Lấy chỉ số của nút cha của nút tại chỉ số i */
    public Integer parent(int i) {
        return (i - 1) / 2;
    }

    /* Duyệt theo tầng (level-order) */
    public List&lt;Integer&gt; levelOrder() {
        List&lt;Integer&gt; res = new ArrayList&lt;&gt;();
        // Duyệt mảng trực tiếp
        for (int i = 0; i &lt; size(); i++) {
            if (val(i) != null)
                res.add(val(i));
        }
        return res;
    }

    /* Duyệt theo chiều sâu (depth-first) */
    private void dfs(Integer i, String order, List&lt;Integer&gt; res) {
        // Nếu là vị trí trống thì trả về
        if (val(i) == null)
            return;
        // Duyệt tiền thứ tự
        if ("pre".equals(order))
            res.add(val(i));
        dfs(left(i), order, res);
        // Duyệt trung thứ tự
        if ("in".equals(order))
            res.add(val(i));
        dfs(right(i), order, res);
        // Duyệt hậu thứ tự
        if ("post".equals(order))
            res.add(val(i));
    }

    /* Duyệt tiền thứ tự (pre-order) */
    public List&lt;Integer&gt; preOrder() {
        List&lt;Integer&gt; res = new ArrayList&lt;&gt;();
        dfs(0, "pre", res);
        return res;
    }

    /* Duyệt trung thứ tự (in-order) */
    public List&lt;Integer&gt; inOrder() {
        List&lt;Integer&gt; res = new ArrayList&lt;&gt;();
        dfs(0, "in", res);
        return res;
    }

    /* Duyệt hậu thứ tự (post-order) */
    public List&lt;Integer&gt; postOrder() {
        List&lt;Integer&gt; res = new ArrayList&lt;&gt;();
        dfs(0, "post", res);
        return res;
    }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class ArrayBinaryTree:
    """Lớp cây nhị phân biểu diễn bằng mảng"""

    def __init__(self, arr: list[int | None]):
        """Hàm khởi tạo"""
        self._tree = list(arr)

    def size(self):
        """Kích thước danh sách"""
        return len(self._tree)

    def val(self, i: int) -&gt; int | None:
        """Lấy giá trị của nút tại chỉ số i"""
        # Nếu chỉ số vượt ngoài phạm vi, trả về None, biểu thị vị trí trống
        if i &lt; 0 or i &gt;= self.size():
            return None
        return self._tree[i]

    def left(self, i: int) -&gt; int | None:
        """Lấy chỉ số của nút con trái của nút tại chỉ số i"""
        return 2 * i + 1

    def right(self, i: int) -&gt; int | None:
        """Lấy chỉ số của nút con phải của nút tại chỉ số i"""
        return 2 * i + 2

    def parent(self, i: int) -&gt; int | None:
        """Lấy chỉ số của nút cha của nút tại chỉ số i"""
        return (i - 1) // 2

    def level_order(self) -&gt; list[int]:
        """Duyệt theo tầng (level-order)"""
        self.res = []
        # Duyệt mảng trực tiếp
        for i in range(self.size()):
            if self.val(i) is not None:
                self.res.append(self.val(i))
        return self.res

    def dfs(self, i: int, order: str):
        """Duyệt theo chiều sâu (depth-first)"""
        if self.val(i) is None:
            return
        # Duyệt tiền thứ tự
        if order == "pre":
            self.res.append(self.val(i))
        self.dfs(self.left(i), order)
        # Duyệt trung thứ tự
        if order == "in":
            self.res.append(self.val(i))
        self.dfs(self.right(i), order)
        # Duyệt hậu thứ tự
        if order == "post":
            self.res.append(self.val(i))

    def pre_order(self) -&gt; list[int]:
        """Duyệt tiền thứ tự (pre-order)"""
        self.res = []
        self.dfs(0, order="pre")
        return self.res

    def in_order(self) -&gt; list[int]:
        """Duyệt trung thứ tự (in-order)"""
        self.res = []
        self.dfs(0, order="in")
        return self.res

    def post_order(self) -&gt; list[int]:
        """Duyệt hậu thứ tự (post-order)"""
        self.res = []
        self.dfs(0, order="post")
        return self.res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Lớp cây nhị phân biểu diễn bằng mảng */
class ArrayBinaryTree {
  public:
    /* Hàm khởi tạo */
    ArrayBinaryTree(vector&lt;int&gt; arr) {
        tree = arr;
    }

    /* Kích thước danh sách */
    int size() {
        return tree.size();
    }

    /* Lấy giá trị của nút tại chỉ số i */
    int val(int i) {
        // Trả về INT_MAX nếu chỉ số vượt ngoài phạm vi, biểu thị vị trí trống
        if (i &lt; 0 || i &gt;= size())
            return INT_MAX;
        return tree[i];
    }

    /* Lấy chỉ số của nút con trái của nút tại chỉ số i */
    int left(int i) {
        return 2 * i + 1;
    }

    /* Lấy chỉ số của nút con phải của nút tại chỉ số i */
    int right(int i) {
        return 2 * i + 2;
    }

    /* Lấy chỉ số của nút cha của nút tại chỉ số i */
    int parent(int i) {
        return (i - 1) / 2;
    }

    /* Duyệt theo tầng (level-order) */
    vector&lt;int&gt; levelOrder() {
        vector&lt;int&gt; res;
        // Duyệt mảng trực tiếp
        for (int i = 0; i &lt; size(); i++) {
            if (val(i) != INT_MAX)
                res.push_back(val(i));
        }
        return res;
    }

    /* Duyệt tiền thứ tự (pre-order) */
    vector&lt;int&gt; preOrder() {
        vector&lt;int&gt; res;
        dfs(0, "pre", res);
        return res;
    }

    /* Duyệt trung thứ tự (in-order) */
    vector&lt;int&gt; inOrder() {
        vector&lt;int&gt; res;
        dfs(0, "in", res);
        return res;
    }

    /* Duyệt hậu thứ tự (post-order) */
    vector&lt;int&gt; postOrder() {
        vector&lt;int&gt; res;
        dfs(0, "post", res);
        return res;
    }

  private:
    vector&lt;int&gt; tree;

    /* Duyệt theo chiều sâu (depth-first) */
    void dfs(int i, string order, vector&lt;int&gt; &amp;res) {
        // Nếu là vị trí trống thì trả về
        if (val(i) == INT_MAX)
            return;
        // Duyệt tiền thứ tự
        if (order == "pre")
            res.push_back(val(i));
        dfs(left(i), order, res);
        // Duyệt trung thứ tự
        if (order == "in")
            res.push_back(val(i));
        dfs(right(i), order, res);
        // Duyệt hậu thứ tự
        if (order == "post")
            res.push_back(val(i));
    }
};</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Lớp cây nhị phân biểu diễn bằng mảng */
class ArrayBinaryTree {
    #tree;

    /* Hàm khởi tạo */
    constructor(arr) {
        this.#tree = arr;
    }

    /* Kích thước danh sách */
    size() {
        return this.#tree.length;
    }

    /* Lấy giá trị của nút tại chỉ số i */
    val(i) {
        // Nếu chỉ số vượt ngoài phạm vi, trả về null biểu thị vị trí trống
        if (i &lt; 0 || i &gt;= this.size()) return null;
        return this.#tree[i];
    }

    /* Lấy chỉ số của nút con trái của nút tại chỉ số i */
    left(i) {
        return 2 * i + 1;
    }

    /* Lấy chỉ số của nút con phải của nút tại chỉ số i */
    right(i) {
        return 2 * i + 2;
    }

    /* Lấy chỉ số của nút cha của nút tại chỉ số i */
    parent(i) {
        return Math.floor((i - 1) / 2); // Chia lấy phần nguyên
    }

    /* Duyệt theo tầng (level-order) */
    levelOrder() {
        let res = [];
        // Duyệt mảng trực tiếp
        for (let i = 0; i &lt; this.size(); i++) {
            if (this.val(i) !== null) res.push(this.val(i));
        }
        return res;
    }

    /* Duyệt theo chiều sâu (depth-first) */
    #dfs(i, order, res) {
        // Nếu là vị trí trống thì trả về
        if (this.val(i) === null) return;
        // Duyệt tiền thứ tự
        if (order === 'pre') res.push(this.val(i));
        this.#dfs(this.left(i), order, res);
        // Duyệt trung thứ tự
        if (order === 'in') res.push(this.val(i));
        this.#dfs(this.right(i), order, res);
        // Duyệt hậu thứ tự
        if (order === 'post') res.push(this.val(i));
    }

    /* Duyệt tiền thứ tự (pre-order) */
    preOrder() {
        const res = [];
        this.#dfs(0, 'pre', res);
        return res;
    }

    /* Duyệt trung thứ tự (in-order) */
    inOrder() {
        const res = [];
        this.#dfs(0, 'in', res);
        return res;
    }

    /* Duyệt hậu thứ tự (post-order) */
    postOrder() {
        const res = [];
        this.#dfs(0, 'post', res);
        return res;
    }
}</code></pre></div></div></div>

<h2>7.3.3 Ưu điểm và hạn chế</h2>
<p>Cách biểu diễn cây nhị phân bằng mảng có những ưu điểm sau:</p>
<ul>
  <li>Mảng được lưu trữ trong không gian bộ nhớ liên tục, thân thiện với bộ nhớ đệm (cache-friendly), cho phép truy cập và duyệt nhanh hơn.</li>
  <li>Không cần lưu trữ con trỏ, giúp tiết kiệm không gian.</li>
  <li>Cho phép truy cập ngẫu nhiên tới các nút.</li>
</ul>
<p>Tuy nhiên, cách biểu diễn bằng mảng cũng có một số hạn chế:</p>
<ul>
  <li>Việc lưu trữ mảng đòi hỏi không gian bộ nhớ liên tục, nên không phù hợp để lưu trữ các cây có lượng dữ liệu lớn.</li>
  <li>Việc thêm hoặc xóa nút đòi hỏi các thao tác chèn và xóa trên mảng, có hiệu quả thấp hơn.</li>
  <li>Khi có nhiều giá trị <code>None</code> trong cây nhị phân, tỷ lệ dữ liệu nút thực sự chứa trong mảng thấp, dẫn tới hiệu suất sử dụng không gian thấp hơn.</li>
</ul>

`,
    originalContent: `
# Array Representation of Binary Trees

In the linked-list representation, the storage unit of a binary tree is a node \`TreeNode\`, and nodes are connected by pointers. The previous section introduced the basic operations of binary trees in this representation.

So, can we use an array to represent a binary tree? The answer is yes.

## Representing Perfect Binary Trees

Let's analyze a simple case first. Given a perfect binary tree, we store all nodes in an array according to the order of level-order traversal, where each node corresponds to a unique array index.

Based on the characteristics of level-order traversal, we can derive a "mapping formula" between parent node index and child node indices: **If a node's index is $i$, then its left child index is $2i + 1$ and its right child index is $2i + 2$**. The figure below shows the mapping relationships between various node indices.

![Array representation of a perfect binary tree](array_representation_of_tree.assets/array_representation_binary_tree.png)

**The mapping formula plays a role similar to the node references (pointers) in linked lists**. Given any node in the array, we can access its left (right) child node using the mapping formula.

## Representing Any Binary Tree

Perfect binary trees are a special case; in the middle levels of a binary tree, there are typically many \`None\` values. Since the level-order traversal sequence does not include these \`None\` values, we cannot infer the number and distribution of \`None\` values based on this sequence alone. **This means multiple binary tree structures can correspond to the same level-order traversal sequence**.

As shown in the figure below, given a non-perfect binary tree, the above method of array representation fails.

![Level-order traversal sequence corresponds to multiple binary tree possibilities](array_representation_of_tree.assets/array_representation_without_empty.png)

To solve this problem, **we can explicitly write out all \`None\` values in the level-order traversal sequence**. As shown in the figure below, once we do this, the level-order traversal sequence can uniquely represent a binary tree. Example code is as follows:

=== "Python"

    \`\`\`python title=""
    # Array representation of a binary tree
    # Using None to represent empty slots
    tree = [1, 2, 3, 4, None, 6, 7, 8, 9, None, None, 12, None, None, 15]
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    /* Array representation of a binary tree */
    // Using the maximum integer value INT_MAX to mark empty slots
    vector<int> tree = {1, 2, 3, 4, INT_MAX, 6, 7, 8, 9, INT_MAX, INT_MAX, 12, INT_MAX, INT_MAX, 15};
    \`\`\`

=== "Java"

    \`\`\`java title=""
    /* Array representation of a binary tree */
    // Using the Integer wrapper class allows for using null to mark empty slots
    Integer[] tree = { 1, 2, 3, 4, null, 6, 7, 8, 9, null, null, 12, null, null, 15 };
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    /* Array representation of a binary tree */
    // Using nullable int (int?) allows for using null to mark empty slots
    int?[] tree = [1, 2, 3, 4, null, 6, 7, 8, 9, null, null, 12, null, null, 15];
    \`\`\`

=== "Go"

    \`\`\`go title=""
    /* Array representation of a binary tree */
    // Using an any type slice, allowing for nil to mark empty slots
    tree := []any{1, 2, 3, 4, nil, 6, 7, 8, 9, nil, nil, 12, nil, nil, 15}
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    /* Array representation of a binary tree */
    // Using optional Int (Int?) allows for using nil to mark empty slots
    let tree: [Int?] = [1, 2, 3, 4, nil, 6, 7, 8, 9, nil, nil, 12, nil, nil, 15]
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    /* Array representation of a binary tree */
    // Using null to represent empty slots
    let tree = [1, 2, 3, 4, null, 6, 7, 8, 9, null, null, 12, null, null, 15];
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    /* Array representation of a binary tree */
    // Using null to represent empty slots
    let tree: (number | null)[] = [1, 2, 3, 4, null, 6, 7, 8, 9, null, null, 12, null, null, 15];
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    /* Array representation of a binary tree */
    // Using nullable int (int?) allows for using null to mark empty slots
    List<int?> tree = [1, 2, 3, 4, null, 6, 7, 8, 9, null, null, 12, null, null, 15];
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    /* Array representation of a binary tree */
    // Using None to mark empty slots
    let tree = [Some(1), Some(2), Some(3), Some(4), None, Some(6), Some(7), Some(8), Some(9), None, None, Some(12), None, None, Some(15)];
    \`\`\`

=== "C"

    \`\`\`c title=""
    /* Array representation of a binary tree */
    // Using the maximum int value to mark empty slots, therefore, node values must not be INT_MAX
    int tree[] = {1, 2, 3, 4, INT_MAX, 6, 7, 8, 9, INT_MAX, INT_MAX, 12, INT_MAX, INT_MAX, 15};
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    /* Array representation of a binary tree */
    // Using null to represent empty slots
    val tree = arrayOf( 1, 2, 3, 4, null, 6, 7, 8, 9, null, null, 12, null, null, 15 )
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    ### Array representation of a binary tree ###
    # Using nil to represent empty slots
    tree = [1, 2, 3, 4, nil, 6, 7, 8, 9, nil, nil, 12, nil, nil, 15]
    \`\`\`

![Array representation of an arbitrary binary tree](array_representation_of_tree.assets/array_representation_with_empty.png)

It's worth noting that **complete binary trees are very well-suited for array representation**. Recalling the definition of a complete binary tree, \`None\` only appears at the bottom level and towards the right, **meaning all \`None\` values must appear at the end of the level-order traversal sequence**.

This means that when using an array to represent a complete binary tree, it's possible to omit storing all \`None\` values, which is very convenient. The figure below gives an example.

![Array representation of a complete binary tree](array_representation_of_tree.assets/array_representation_complete_binary_tree.png)

The following code implements a binary tree using an array representation, including the following operations:

- Given a node, obtain its value, left (right) child node, and parent node.
- Obtain the preorder, inorder, postorder, and level-order traversal sequences.

\`\`\`src
[file]{array_binary_tree}-[class]{array_binary_tree}-[func]{}
\`\`\`

## Advantages and Limitations

The array representation of binary trees has the following advantages:

- Arrays are stored in contiguous memory space, which is cache-friendly, allowing faster access and traversal.
- It does not require storing pointers, which saves space.
- It allows random access to nodes.

However, the array representation also has some limitations:

- Array storage requires contiguous memory space, so it is not suitable for storing trees with a large amount of data.
- Adding or removing nodes requires array insertion and deletion operations, which have lower efficiency.
- When there are many \`None\` values in the binary tree, the proportion of node data contained in the array is low, leading to lower space utilization.

`
  },

  'dsa-binary-search-tree': {
    title: '7.4 Cây tìm kiếm nhị phân (Binary Search Tree)',
    summary: 'Tìm hiểu cây tìm kiếm nhị phân (BST): thao tác tìm kiếm, chèn, xóa nút, tính chất duyệt trung thứ tự có thứ tự và hiệu quả của cấu trúc dữ liệu này.',
    tags: ['dsa', 'tree', 'binary-search-tree', 'bst'],
    domain: 'Algorithms',
    module: 'Chương 7: Cây',
    prerequisites: ['dsa-array-representation-of-tree'],
    related: ['dsa-avl-tree'],
    updatedAt: '2026-07-19',
    readTime: '10 phút',
    content: `
<p>Như hình dưới đây, một <u>cây tìm kiếm nhị phân (binary search tree)</u> thỏa mãn các điều kiện sau.</p>
<ol>
  <li>Đối với nút gốc, giá trị của tất cả các nút trong cây con trái $&lt;$ giá trị của nút gốc $&lt;$ giá trị của tất cả các nút trong cây con phải.</li>
  <li>Cây con trái và cây con phải của bất kỳ nút nào cũng đều là cây tìm kiếm nhị phân, tức là chúng cũng thỏa mãn điều kiện <code>1.</code></li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/binary_search_tree.png" alt="Cây tìm kiếm nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>7.4.1 Các thao tác trên Cây tìm kiếm nhị phân</h2>
<p>Chúng ta đóng gói cây tìm kiếm nhị phân thành một lớp <code>BinarySearchTree</code> và khai báo một biến thành viên <code>root</code> trỏ tới nút gốc của cây.</p>

<h3>7.4.1.1 Tìm kiếm nút</h3>
<p>Cho một giá trị nút mục tiêu <code>num</code>, ta có thể tìm kiếm dựa theo tính chất của cây tìm kiếm nhị phân. Như hình dưới đây, ta khai báo một nút <code>cur</code> và bắt đầu từ nút gốc <code>root</code> của cây tìm kiếm nhị phân, lặp lại việc so sánh <code>cur.val</code> với <code>num</code>.</p>
<ul>
  <li>Nếu <code>cur.val &lt; num</code>, nghĩa là nút mục tiêu nằm trong cây con phải của <code>cur</code>, do đó thực hiện <code>cur = cur.right</code>.</li>
  <li>Nếu <code>cur.val &gt; num</code>, nghĩa là nút mục tiêu nằm trong cây con trái của <code>cur</code>, do đó thực hiện <code>cur = cur.left</code>.</li>
  <li>Nếu <code>cur.val = num</code>, nghĩa là đã tìm thấy nút mục tiêu, thoát khỏi vòng lặp và trả về nút đó.</li>
</ul>
<div class="interactive-widget-wrapper" id="bst-search-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img loading="lazy" src="dsa-assets/bst_search_step1.png" alt="bst_search_step1" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 1</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/bst_search_step2.png" alt="bst_search_step2" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 2</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/bst_search_step3.png" alt="bst_search_step3" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 3</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/bst_search_step4.png" alt="bst_search_step4" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 4</p></div>
    <div class="slider-controls">
      <button class="control-btn" onclick="prevSlide('bst-search-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 4</span>
      <button class="control-btn" onclick="nextSlide('bst-search-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Thao tác tìm kiếm trong cây tìm kiếm nhị phân tuân theo cùng nguyên lý với tìm kiếm nhị phân (binary search): mỗi vòng lặp loại bỏ một nửa số trường hợp còn lại. Số lần lặp vòng lặp nhiều nhất bằng chiều cao của cây. Khi cây cân bằng, việc tìm kiếm mất thời gian $O(\\\\log n)$. Đoạn mã ví dụ như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Tìm kiếm nút */
public TreeNode search(int num) {
    TreeNode cur = root;
    // Vòng lặp tìm kiếm, thoát sau khi đi qua nút lá
    while (cur != null) {
        // Nút mục tiêu nằm trong cây con phải của cur
        if (cur.val &lt; num)
            cur = cur.right;
        // Nút mục tiêu nằm trong cây con trái của cur
        else if (cur.val &gt; num)
            cur = cur.left;
        // Tìm thấy nút mục tiêu, thoát vòng lặp
        else
            break;
    }
    // Trả về nút mục tiêu
    return cur;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func search(num: Int) -&gt; TreeNode? {
        var cur = root
        // Loop search, exit after passing leaf node
        while cur != nil {
            // Target node is in cur's right subtree
            if cur!.val &lt; num {
                cur = cur?.right
            }
            // Target node is in cur's left subtree
            else if cur!.val &gt; num {
                cur = cur?.left
            }
            // Found target node, exit loop
            else {
                break
            }
        }
        // Return target node
        return cur
    }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def search(self, num: int) -&gt; TreeNode | None:
    """Tìm kiếm nút"""
    cur = self._root
    # Vòng lặp tìm kiếm, thoát sau khi đi qua nút lá
    while cur is not None:
        # Nút mục tiêu nằm trong cây con phải của cur
        if cur.val &lt; num:
            cur = cur.right
        # Nút mục tiêu nằm trong cây con trái của cur
        elif cur.val &gt; num:
            cur = cur.left
        # Tìm thấy nút mục tiêu, thoát vòng lặp
        else:
            break
    return cur</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm kiếm nút */
TreeNode *search(int num) {
    TreeNode *cur = root;
    // Vòng lặp tìm kiếm, thoát sau khi đi qua nút lá
    while (cur != nullptr) {
        // Nút mục tiêu nằm trong cây con phải của cur
        if (cur-&gt;val &lt; num)
            cur = cur-&gt;right;
        // Nút mục tiêu nằm trong cây con trái của cur
        else if (cur-&gt;val &gt; num)
            cur = cur-&gt;left;
        // Tìm thấy nút mục tiêu, thoát vòng lặp
        else
            break;
    }
    // Trả về nút mục tiêu
    return cur;
}</code></pre></div></div></div>

<h3>7.4.1.2 Chèn nút</h3>
<p>Cho một phần tử <code>num</code> cần chèn, để duy trì tính chất "cây con trái $&lt;$ nút gốc $&lt;$ cây con phải" của cây tìm kiếm nhị phân, quá trình chèn được thể hiện trong hình dưới đây.</p>
<ol>
  <li><strong>Tìm vị trí chèn</strong>: Tương tự thao tác tìm kiếm, bắt đầu từ nút gốc và lặp xuống dưới tìm kiếm dựa theo mối quan hệ lớn/nhỏ giữa giá trị nút hiện tại và <code>num</code>, cho tới khi vượt qua nút lá (duyệt tới <code>None</code>) thì thoát vòng lặp.</li>
  <li><strong>Chèn nút tại vị trí đó</strong>: Tạo một nút cho <code>num</code> và đặt nó vào vị trí <code>None</code>.</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/bst_insert.png" alt="Chèn một nút vào cây tìm kiếm nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Trong quá trình triển khai mã nguồn, cần lưu ý hai điểm sau:</p>
<ul>
  <li>Cây tìm kiếm nhị phân không cho phép các nút trùng lặp; nếu không, cây sẽ không còn thỏa mãn định nghĩa của nó nữa. Do đó, nếu nút cần chèn đã tồn tại trong cây, thao tác chèn sẽ bị bỏ qua và hàm trả về ngay lập tức.</li>
  <li>Để triển khai việc chèn nút, ta cần dùng nút <code>pre</code> để lưu lại nút của vòng lặp trước đó. Nhờ vậy, khi duyệt tới <code>None</code>, ta có thể lấy được nút cha của nó, từ đó hoàn thành thao tác chèn nút.</li>
</ul>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Chèn nút */
public void insert(int num) {
    // Nếu cây rỗng, khởi tạo nút gốc
    if (root == null) {
        root = new TreeNode(num);
        return;
    }
    TreeNode cur = root, pre = null;
    // Vòng lặp tìm kiếm, thoát sau khi đi qua nút lá
    while (cur != null) {
        // Tìm thấy nút trùng lặp, trả về ngay
        if (cur.val == num)
            return;
        pre = cur;
        // Vị trí chèn nằm trong cây con phải của cur
        if (cur.val &lt; num)
            cur = cur.right;
        // Vị trí chèn nằm trong cây con trái của cur
        else
            cur = cur.left;
    }
    // Chèn nút
    TreeNode node = new TreeNode(num);
    if (pre.val &lt; num)
        pre.right = node;
    else
        pre.left = node;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func insert(num: Int) {
        // If tree is empty, initialize root node
        if root == nil {
            root = TreeNode(x: num)
            return
        }
        var cur = root
        var pre: TreeNode?
        // Loop search, exit after passing leaf node
        while cur != nil {
            // Found duplicate node, return directly
            if cur!.val == num {
                return
            }
            pre = cur
            // Insertion position is in cur's right subtree
            if cur!.val &lt; num {
                cur = cur?.right
            }
            // Insertion position is in cur's left subtree
            else {
                cur = cur?.left
            }
        }
        // Insert node
        let node = TreeNode(x: num)
        if pre!.val &lt; num {
            pre?.right = node
        } else {
            pre?.left = node
        }
    }</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void insert(int _num) {
    // If tree is empty, initialize root node
    if (_root == null) {
      _root = TreeNode(_num);
      return;
    }
    TreeNode? cur = _root;
    TreeNode? pre = null;
    // Loop search, exit after passing leaf node
    while (cur != null) {
      // Found duplicate node, return directly
      if (cur.val == _num) return;
      pre = cur;
      // Insertion position is in cur's right subtree
      if (cur.val &lt; _num)
        cur = cur.right;
      // Insertion position is in cur's left subtree
      else
        cur = cur.left;
    }
    // Insert node
    TreeNode? node = TreeNode(_num);
    if (pre!.val &lt; _num)
      pre.right = node;
    else
      pre.left = node;
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def insert(self, num: int):
    """Chèn nút"""
    # Nếu cây rỗng, khởi tạo nút gốc
    if self._root is None:
        self._root = TreeNode(num)
        return
    # Vòng lặp tìm kiếm, thoát sau khi đi qua nút lá
    cur, pre = self._root, None
    while cur is not None:
        # Tìm thấy nút trùng lặp, trả về ngay
        if cur.val == num:
            return
        pre = cur
        # Vị trí chèn nằm trong cây con phải của cur
        if cur.val &lt; num:
            cur = cur.right
        # Vị trí chèn nằm trong cây con trái của cur
        else:
            cur = cur.left
    # Chèn nút
    node = TreeNode(num)
    if pre.val &lt; num:
        pre.right = node
    else:
        pre.left = node</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Chèn nút */
void insert(int num) {
    // Nếu cây rỗng, khởi tạo nút gốc
    if (root == nullptr) {
        root = new TreeNode(num);
        return;
    }
    TreeNode *cur = root, *pre = nullptr;
    // Vòng lặp tìm kiếm, thoát sau khi đi qua nút lá
    while (cur != nullptr) {
        // Tìm thấy nút trùng lặp, trả về ngay
        if (cur-&gt;val == num)
            return;
        pre = cur;
        // Vị trí chèn nằm trong cây con phải của cur
        if (cur-&gt;val &lt; num)
            cur = cur-&gt;right;
        // Vị trí chèn nằm trong cây con trái của cur
        else
            cur = cur-&gt;left;
    }
    // Chèn nút
    TreeNode *node = new TreeNode(num);
    if (pre-&gt;val &lt; num)
        pre-&gt;right = node;
    else
        pre-&gt;left = node;
}</code></pre></div></div></div>
<p>Tương tự như tìm kiếm nút, việc chèn một nút mất thời gian $O(\\\\log n)$.</p>

<h3>7.4.1.3 Xóa nút</h3>
<p>Trước tiên, tìm nút mục tiêu trong cây tìm kiếm nhị phân, sau đó xóa nó. Tương tự như chèn nút, ta cần đảm bảo rằng sau khi hoàn thành thao tác xóa, tính chất "cây con trái $&lt;$ nút gốc $&lt;$ cây con phải" của cây tìm kiếm nhị phân vẫn được duy trì. Do đó, tùy theo số lượng nút con mà nút mục tiêu có, ta xét ba trường hợp: bậc $0$, bậc $1$ và bậc $2$, và thực hiện thao tác xóa tương ứng.</p>
<p>Như hình dưới đây, khi bậc của nút cần xóa là $0$, nghĩa là nút đó là một nút lá và có thể xóa trực tiếp.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/bst_remove_case1.png" alt="Xóa một nút trong cây tìm kiếm nhị phân (bậc 0)" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Như hình dưới đây, khi bậc của nút cần xóa là $1$, chỉ cần thay thế nút cần xóa bằng nút con của nó là đủ.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/bst_remove_case2.png" alt="Xóa một nút trong cây tìm kiếm nhị phân (bậc 1)" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Khi bậc của nút cần xóa là $2$, ta không thể xóa nó trực tiếp; thay vào đó, ta cần dùng một nút khác để thay thế nó. Để duy trì tính chất "cây con trái $&lt;$ nút gốc $&lt;$ cây con phải" của cây tìm kiếm nhị phân, <strong>nút này có thể là nút nhỏ nhất trong cây con phải hoặc nút lớn nhất trong cây con trái</strong>.</p>
<p>Giả sử ta chọn nút nhỏ nhất trong cây con phải, tức là nút kế tiếp theo thứ tự trung thứ tự (inorder successor), quá trình xóa được thể hiện trong hình dưới đây.</p>
<ol>
  <li>Tìm nút tiếp theo của nút cần xóa trong "chuỗi duyệt trung thứ tự", ký hiệu là <code>tmp</code>.</li>
  <li>Thay giá trị của nút cần xóa bằng giá trị của <code>tmp</code>, rồi đệ quy xóa nút <code>tmp</code> trong cây.</li>
</ol>
<div class="interactive-widget-wrapper" id="bst-remove-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img loading="lazy" src="dsa-assets/bst_remove_case3_step1.png" alt="bst_remove_case3_step1" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 1</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/bst_remove_case3_step2.png" alt="bst_remove_case3_step2" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 2</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/bst_remove_case3_step3.png" alt="bst_remove_case3_step3" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 3</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/bst_remove_case3_step4.png" alt="bst_remove_case3_step4" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 4</p></div>
    <div class="slider-controls">
      <button class="control-btn" onclick="prevSlide('bst-remove-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 4</span>
      <button class="control-btn" onclick="nextSlide('bst-remove-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Thao tác xóa nút cũng mất thời gian $O(\\\\log n)$, trong đó việc tìm nút cần xóa mất thời gian $O(\\\\log n)$, và việc lấy nút kế tiếp theo thứ tự trung thứ tự cũng mất thời gian $O(\\\\log n)$. Đoạn mã ví dụ như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Xóa nút */
public void remove(int num) {
    // Nếu cây rỗng, trả về ngay
    if (root == null)
        return;
    TreeNode cur = root, pre = null;
    // Vòng lặp tìm kiếm, thoát sau khi đi qua nút lá
    while (cur != null) {
        // Tìm thấy nút cần xóa, thoát vòng lặp
        if (cur.val == num)
            break;
        pre = cur;
        // Nút cần xóa nằm trong cây con phải của cur
        if (cur.val &lt; num)
            cur = cur.right;
        // Nút cần xóa nằm trong cây con trái của cur
        else
            cur = cur.left;
    }
    // Nếu không có nút cần xóa, trả về ngay
    if (cur == null)
        return;
    // Số lượng nút con = 0 hoặc 1
    if (cur.left == null || cur.right == null) {
        // Khi số lượng nút con = 0 / 1, child = null / nút con đó
        TreeNode child = cur.left != null ? cur.left : cur.right;
        // Xóa nút cur
        if (cur != root) {
            if (pre.left == cur)
                pre.left = child;
            else
                pre.right = child;
        } else {
            // Nếu nút bị xóa là nút gốc, gán lại nút gốc
            root = child;
        }
    }
    // Số lượng nút con = 2
    else {
        // Lấy nút tiếp theo của cur trong duyệt trung thứ tự
        TreeNode tmp = cur.right;
        while (tmp.left != null) {
            tmp = tmp.left;
        }
        // Đệ quy xóa nút tmp
        remove(tmp.val);
        // Thay thế cur bằng tmp
        cur.val = tmp.val;
    }
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func remove(num: Int) {
        // If tree is empty, return directly
        if root == nil {
            return
        }
        var cur = root
        var pre: TreeNode?
        // Loop search, exit after passing leaf node
        while cur != nil {
            // Found node to delete, exit loop
            if cur!.val == num {
                break
            }
            pre = cur
            // Node to delete is in cur's right subtree
            if cur!.val &lt; num {
                cur = cur?.right
            }
            // Node to delete is in cur's left subtree
            else {
                cur = cur?.left
            }
        }
        // If no node to delete, return directly
        if cur == nil {
            return
        }
        // Number of child nodes = 0 or 1
        if cur?.left == nil || cur?.right == nil {
            // When number of child nodes = 0 / 1, child = null / that child node
            let child = cur?.left ?? cur?.right
            // Delete node cur
            if cur !== root {
                if pre?.left === cur {
                    pre?.left = child
                } else {
                    pre?.right = child
                }
            } else {
                // If deleted node is root node, reassign root node
                root = child
            }
        }
        // Number of child nodes = 2
        else {
            // Get next node of cur in inorder traversal
            var tmp = cur?.right
            while tmp?.left != nil {
                tmp = tmp?.left
            }
            // Recursively delete node tmp
            remove(num: tmp!.val)
            // Replace cur with tmp
            cur?.val = tmp!.val
        }
    }</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void remove(int _num) {
    // If tree is empty, return directly
    if (_root == null) return;
    TreeNode? cur = _root;
    TreeNode? pre = null;
    // Loop search, exit after passing leaf node
    while (cur != null) {
      // Found node to delete, exit loop
      if (cur.val == _num) break;
      pre = cur;
      // Node to delete is in cur's right subtree
      if (cur.val &lt; _num)
        cur = cur.right;
      // Node to delete is in cur's left subtree
      else
        cur = cur.left;
    }
    // If no node to delete, return directly
    if (cur == null) return;
    // Number of child nodes = 0 or 1
    if (cur.left == null || cur.right == null) {
      // When number of child nodes = 0 / 1, child = null / that child node
      TreeNode? child = cur.left ?? cur.right;
      // Delete node cur
      if (cur != _root) {
        if (pre!.left == cur)
          pre.left = child;
        else
          pre.right = child;
      } else {
        // If deleted node is root node, reassign root node
        _root = child;
      }
    } else {
      // Number of child nodes = 2
      // Get next node of cur in inorder traversal
      TreeNode? tmp = cur.right;
      while (tmp!.left != null) {
        tmp = tmp.left;
      }
      // Recursively delete node tmp
      remove(tmp.val);
      // Replace cur with tmp
      cur.val = tmp.val;
    }
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def remove(self, num: int):
    """Xóa nút"""
    # Nếu cây rỗng, trả về ngay
    if self._root is None:
        return
    # Vòng lặp tìm kiếm, thoát sau khi đi qua nút lá
    cur, pre = self._root, None
    while cur is not None:
        # Tìm thấy nút cần xóa, thoát vòng lặp
        if cur.val == num:
            break
        pre = cur
        # Nút cần xóa nằm trong cây con phải của cur
        if cur.val &lt; num:
            cur = cur.right
        # Nút cần xóa nằm trong cây con trái của cur
        else:
            cur = cur.left
    # Nếu không có nút cần xóa, trả về ngay
    if cur is None:
        return

    # Số lượng nút con = 0 hoặc 1
    if cur.left is None or cur.right is None:
        # Khi số lượng nút con = 0 / 1, child = null / nút con đó
        child = cur.left or cur.right
        # Xóa nút cur
        if cur != self._root:
            if pre.left == cur:
                pre.left = child
            else:
                pre.right = child
        else:
            # Nếu nút bị xóa là nút gốc, gán lại nút gốc
            self._root = child
    # Số lượng nút con = 2
    else:
        # Lấy nút tiếp theo của cur trong duyệt trung thứ tự
        tmp: TreeNode = cur.right
        while tmp.left is not None:
            tmp = tmp.left
        # Đệ quy xóa nút tmp
        self.remove(tmp.val)
        # Thay thế cur bằng tmp
        cur.val = tmp.val</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Xóa nút */
void remove(int num) {
    // Nếu cây rỗng, trả về ngay
    if (root == nullptr)
        return;
    TreeNode *cur = root, *pre = nullptr;
    // Vòng lặp tìm kiếm, thoát sau khi đi qua nút lá
    while (cur != nullptr) {
        // Tìm thấy nút cần xóa, thoát vòng lặp
        if (cur-&gt;val == num)
            break;
        pre = cur;
        // Nút cần xóa nằm trong cây con phải của cur
        if (cur-&gt;val &lt; num)
            cur = cur-&gt;right;
        // Nút cần xóa nằm trong cây con trái của cur
        else
            cur = cur-&gt;left;
    }
    // Nếu không có nút cần xóa, trả về ngay
    if (cur == nullptr)
        return;
    // Số lượng nút con = 0 hoặc 1
    if (cur-&gt;left == nullptr || cur-&gt;right == nullptr) {
        // Khi số lượng nút con = 0 / 1, child = nullptr / nút con đó
        TreeNode *child = cur-&gt;left != nullptr ? cur-&gt;left : cur-&gt;right;
        // Xóa nút cur
        if (cur != root) {
            if (pre-&gt;left == cur)
                pre-&gt;left = child;
            else
                pre-&gt;right = child;
        } else {
            // Nếu nút bị xóa là nút gốc, gán lại nút gốc
            root = child;
        }
        // Giải phóng bộ nhớ
        delete cur;
    }
    // Số lượng nút con = 2
    else {
        // Lấy nút tiếp theo của cur trong duyệt trung thứ tự
        TreeNode *tmp = cur-&gt;right;
        while (tmp-&gt;left != nullptr) {
            tmp = tmp-&gt;left;
        }
        int tmpVal = tmp-&gt;val;
        // Đệ quy xóa nút tmp
        remove(tmp-&gt;val);
        // Thay thế cur bằng tmp
        cur-&gt;val = tmpVal;
    }
}</code></pre></div></div></div>

<h3>7.4.1.4 Duyệt trung thứ tự cho kết quả có thứ tự</h3>
<p>Như hình dưới đây, duyệt trung thứ tự của cây nhị phân tuân theo thứ tự "trái $\\\\rightarrow$ gốc $\\\\rightarrow$ phải", trong khi cây tìm kiếm nhị phân thỏa mãn quan hệ kích thước "nút con trái $&lt;$ nút gốc $&lt;$ nút con phải".</p>
<p>Điều này có nghĩa là khi thực hiện duyệt trung thứ tự trong một cây tìm kiếm nhị phân, nút nhỏ nhất tiếp theo luôn được duyệt qua trước, từ đó tạo ra một tính chất quan trọng: <strong>Chuỗi duyệt trung thứ tự của cây tìm kiếm nhị phân là tăng dần</strong>.</p>
<p>Sử dụng tính chất duyệt trung thứ tự tăng dần này, ta có thể lấy được dữ liệu có thứ tự trong một cây tìm kiếm nhị phân chỉ trong thời gian $O(n)$, mà không cần thêm bất kỳ thao tác sắp xếp nào, điều này rất hiệu quả.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/bst_inorder_traversal.png" alt="Chuỗi duyệt trung thứ tự của cây tìm kiếm nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>7.4.2 Hiệu quả của Cây tìm kiếm nhị phân</h2>
<p>Cho một tập dữ liệu, ta xét việc dùng mảng hoặc cây tìm kiếm nhị phân để lưu trữ. Quan sát bảng dưới đây, tất cả các thao tác trong cây tìm kiếm nhị phân đều có độ phức tạp thời gian logarit, mang lại hiệu suất ổn định và hiệu quả. Mảng chỉ hiệu quả hơn cây tìm kiếm nhị phân trong các tình huống thêm phần tử với tần suất cao và tìm kiếm/xóa với tần suất thấp.</p>
<p align="center">Bảng &nbsp; So sánh hiệu quả giữa mảng và cây tìm kiếm</p>
<table style="width:100%; border-collapse:collapse; font-size:14px; margin:1.5em 0; border: 1px solid var(--border-color);">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;"></th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Mảng chưa sắp xếp</th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Cây tìm kiếm nhị phân</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Tìm phần tử</td><td style="padding:10px 15px;">$O(n)$</td><td style="padding:10px 15px;">$O(\\\\log n)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Chèn phần tử</td><td style="padding:10px 15px;">$O(1)$</td><td style="padding:10px 15px;">$O(\\\\log n)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">Xóa phần tử</td><td style="padding:10px 15px;">$O(n)$</td><td style="padding:10px 15px;">$O(\\\\log n)$</td></tr>
  </tbody>
</table>
<p>Trong trường hợp lý tưởng, một cây tìm kiếm nhị phân là cân bằng, nên bất kỳ nút nào cũng có thể được tìm thấy trong $O(\\\\log n)$ lần lặp vòng lặp.</p>
<p>Tuy nhiên, nếu ta liên tục chèn và xóa nút trong một cây tìm kiếm nhị phân, nó có thể suy biến thành một danh sách liên kết như hình dưới đây, khi đó độ phức tạp thời gian của các thao tác cũng suy giảm còn $O(n)$.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/bst_degradation.png" alt="Sự suy biến của cây tìm kiếm nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>7.4.3 Các ứng dụng phổ biến của Cây tìm kiếm nhị phân</h2>
<ul>
  <li>Được dùng làm chỉ mục đa cấp (multi-level index) trong các hệ thống để triển khai thao tác tìm kiếm, chèn và xóa hiệu quả.</li>
  <li>Là cấu trúc dữ liệu nền tảng cho một số thuật toán tìm kiếm.</li>
  <li>Dùng để lưu trữ luồng dữ liệu (data stream) nhằm duy trì trạng thái có thứ tự của chúng.</li>
</ul>

<div class="interactive-widget-wrapper" id="bst-ops-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'bst-ops-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'bst-ops-wrapper', 'tab-interactive'); initBstOpsDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="text-align:center; color:var(--text-secondary); font-size:14px;">Xem tab "Mô phỏng tương tác" để theo dõi từng bước tìm kiếm, chèn và xóa nút trên một cây tìm kiếm nhị phân mẫu.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="bst-ops-canvas" style="min-height:260px;"></div>
    <div class="simulator-controls" style="display:flex; gap:10px; justify-content:center; margin:12px 0;">
      <button id="bst-ops-btn-autorun" class="control-btn" onclick="autoRunBstOps()">▶ Auto Run</button>
      <button id="bst-ops-btn-step" class="control-btn" onclick="stepBstOps()">Bước tiếp theo ▶</button>
      <button id="bst-ops-btn-pause" class="control-btn btn-secondary" onclick="pauseRunBstOps()" disabled>⏸ Dừng</button>
      <button id="bst-ops-btn-reset" class="control-btn btn-secondary" onclick="initBstOpsDemo()">↺ Reset</button>
    </div>
    <div id="bst-ops-speed-control" style="text-align:center; margin-bottom:10px;">
      Tốc độ: <input type="range" min="200" max="2000" value="800" step="200" oninput="setBstOpsSpeed(this.value)" /> <span id="bst-ops-speed-label">800ms</span>
    </div>
    <div id="bst-ops-status" class="simulator-status" style="text-align:center; min-height:24px;">
      Nhấp "Auto Run" để bắt đầu mô phỏng: tìm kiếm 7 → chèn 9 → xóa nút bậc 0 → xóa nút bậc 1 → xóa nút bậc 2.
    </div>
  </div>
</div>

`,
    originalContent: `
# Binary Search Tree

As shown in the figure below, a <u>binary search tree</u> satisfies the following conditions.

1. For the root node, the value of all nodes in the left subtree $<$ the value of the root node $<$ the value of all nodes in the right subtree.
2. The left and right subtrees of any node are also binary search trees, i.e., they satisfy condition \`1.\` as well.

![Binary search tree](binary_search_tree.assets/binary_search_tree.png)

## Operations on a Binary Search Tree

We encapsulate the binary search tree as a class \`BinarySearchTree\` and declare a member variable \`root\` pointing to the tree's root node.

### Searching for a Node

Given a target node value \`num\`, we can search according to the properties of the binary search tree. As shown in the figure below, we declare a node \`cur\` and start from the binary search tree's root node \`root\`, looping to compare \`cur.val\` with \`num\`.

- If \`cur.val < num\`, it means the target node is in \`cur\`'s right subtree, thus execute \`cur = cur.right\`.
- If \`cur.val > num\`, it means the target node is in \`cur\`'s left subtree, thus execute \`cur = cur.left\`.
- If \`cur.val = num\`, it means the target node is found, exit the loop, and return the node.

=== "<1>"
    ![Example of searching for a node in a binary search tree](binary_search_tree.assets/bst_search_step1.png)

=== "<2>"
    ![bst_search_step2](binary_search_tree.assets/bst_search_step2.png)

=== "<3>"
    ![bst_search_step3](binary_search_tree.assets/bst_search_step3.png)

=== "<4>"
    ![bst_search_step4](binary_search_tree.assets/bst_search_step4.png)

The search operation in a binary search tree follows the same principle as binary search: each round rules out half of the remaining cases. The number of loop iterations is at most the height of the tree. When the tree is balanced, the search takes $O(\\log n)$ time. The example code is as follows:

\`\`\`src
[file]{binary_search_tree}-[class]{binary_search_tree}-[func]{search}
\`\`\`

### Inserting a Node

Given an element \`num\` to be inserted, in order to maintain the property of the binary search tree "left subtree < root node < right subtree," the insertion process is as shown in the figure below.

1. **Finding the insertion position**: Similar to the search operation, start from the root node and loop downward searching according to the size relationship between the current node value and \`num\`, until passing the leaf node (traversing to \`None\`) and then exit the loop.
2. **Insert the node at that position**: Create a node for \`num\` and place it at the \`None\` position.

![Inserting a node into a binary search tree](binary_search_tree.assets/bst_insert.png)

In the code implementation, note the following two points:

- Binary search trees do not allow duplicate nodes; otherwise, the tree would no longer satisfy its definition. Therefore, if the node to be inserted already exists in the tree, the insertion is skipped and the function returns directly.
- To implement the node insertion, we need to use node \`pre\` to save the node from the previous loop iteration. This way, when traversing to \`None\`, we can obtain its parent node, thereby completing the node insertion operation.

\`\`\`src
[file]{binary_search_tree}-[class]{binary_search_tree}-[func]{insert}
\`\`\`

Similar to searching for a node, inserting a node uses $O(\\log n)$ time.

### Removing a Node

First, find the target node in the binary search tree, then remove it. Similar to node insertion, we need to ensure that after the removal operation is completed, the binary search tree's property of "left subtree $<$ root node $<$ right subtree" is still maintained. Therefore, depending on the number of child nodes the target node has, we consider three cases: degree $0$, degree $1$, and degree $2$, and perform the corresponding removal operation.

As shown in the figure below, when the degree of the node to be removed is $0$, it means the node is a leaf node and can be directly removed.

![Removing a node in a binary search tree (degree 0)](binary_search_tree.assets/bst_remove_case1.png)

As shown in the figure below, when the degree of the node to be removed is $1$, replacing the node to be removed with its child node is sufficient.

![Removing a node in a binary search tree (degree 1)](binary_search_tree.assets/bst_remove_case2.png)

When the degree of the node to be removed is $2$, we cannot directly remove it; instead, we need to use a node to replace it. To maintain the binary search tree's property of "left subtree $<$ root node $<$ right subtree," **this node can be either the smallest node in the right subtree or the largest node in the left subtree**.

Assuming we choose the smallest node in the right subtree, that is, the inorder successor, the removal process is as shown in the figure below.

1. Find the next node of the node to be removed in the "inorder traversal sequence," denoted as \`tmp\`.
2. Replace the value of the node to be removed with the value of \`tmp\`, and recursively remove node \`tmp\` in the tree.

=== "<1>"
    ![Removing a node in a binary search tree (degree 2)](binary_search_tree.assets/bst_remove_case3_step1.png)

=== "<2>"
    ![bst_remove_case3_step2](binary_search_tree.assets/bst_remove_case3_step2.png)

=== "<3>"
    ![bst_remove_case3_step3](binary_search_tree.assets/bst_remove_case3_step3.png)

=== "<4>"
    ![bst_remove_case3_step4](binary_search_tree.assets/bst_remove_case3_step4.png)

The node removal operation also uses $O(\\log n)$ time, where finding the node to be removed requires $O(\\log n)$ time, and obtaining the inorder successor node requires $O(\\log n)$ time. Example code is as follows:

\`\`\`src
[file]{binary_search_tree}-[class]{binary_search_tree}-[func]{remove}
\`\`\`

### Inorder Traversal Is Ordered

As shown in the figure below, the inorder traversal of a binary tree follows the "left $\\rightarrow$ root $\\rightarrow$ right" traversal order, while the binary search tree satisfies the "left child node $<$ root node $<$ right child node" size relationship.

This means that when performing an inorder traversal in a binary search tree, the next smallest node is always traversed first, thus yielding an important property: **The inorder traversal sequence of a binary search tree is ascending**.

Using the property of inorder traversal being ascending, we can obtain ordered data in a binary search tree in only $O(n)$ time, without the need for additional sorting operations, which is very efficient.

![Inorder traversal sequence of a binary search tree](binary_search_tree.assets/bst_inorder_traversal.png)

## Efficiency of Binary Search Trees

Given a set of data, we consider using an array or a binary search tree for storage. Observing the table below, all operations in a binary search tree have logarithmic time complexity, providing stable and efficient performance. Arrays are more efficient than binary search trees only in scenarios with high-frequency additions and low-frequency searches and deletions.

<p align="center"> Table <id> &nbsp; Efficiency comparison between arrays and search trees </p>

|                | Unsorted array | Binary search tree |
| -------------- | -------------- | ------------------ |
| Search element | $O(n)$         | $O(\\log n)$        |
| Insert element | $O(1)$         | $O(\\log n)$        |
| Remove element | $O(n)$         | $O(\\log n)$        |

In the ideal case, a binary search tree is balanced, so any node can be found within $O(\\log n)$ loop iterations.

However, if we continuously insert and remove nodes in a binary search tree, it may degenerate into a linked list as shown in the figure below, where the time complexity of various operations also degrades to $O(n)$.

![Degradation of a binary search tree](binary_search_tree.assets/bst_degradation.png)

## Common Applications of Binary Search Trees

- Used as multi-level indexes in systems to implement efficient search, insertion, and removal operations.
- Serves as the underlying data structure for certain search algorithms.
- Used to store data streams to maintain their ordered state.

`
  },

  'dsa-avl-tree': {
    title: '7.5 Cây AVL (Cân bằng)',
    summary: 'Tìm hiểu cây AVL (cây tìm kiếm nhị phân cân bằng): hệ số cân bằng, bốn loại phép xoay (xoay trái, xoay phải, xoay trái-phải, xoay phải-trái) và các thao tác chèn/xóa/tìm kiếm nút duy trì cân bằng.',
    tags: ['dsa', 'tree', 'avl-tree', 'balanced-tree'],
    domain: 'Algorithms',
    module: 'Chương 7: Cây',
    prerequisites: ['dsa-binary-search-tree'],
    related: ['dsa-tree-summary'],
    updatedAt: '2026-07-19',
    readTime: '14 phút',
    content: `
<p>Trong phần "Cây tìm kiếm nhị phân", ta đã đề cập rằng sau nhiều thao tác chèn và xóa, một cây tìm kiếm nhị phân có thể suy biến thành một danh sách liên kết. Trong trường hợp đó, độ phức tạp thời gian của tất cả các thao tác suy giảm từ $O(\\\\log n)$ xuống $O(n)$.</p>
<p>Như hình dưới đây, sau hai thao tác xóa nút, cây tìm kiếm nhị phân này sẽ suy biến thành một danh sách liên kết.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/avltree_degradation_from_removing_node.png" alt="Sự suy biến của cây AVL sau khi xóa nút" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Ví dụ, trong cây nhị phân hoàn hảo được thể hiện trong hình dưới đây, sau khi chèn hai nút, cây sẽ nghiêng hẳn về bên trái, và độ phức tạp thời gian của thao tác tìm kiếm cũng suy giảm theo.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/avltree_degradation_from_inserting_node.png" alt="Sự suy biến của cây AVL sau khi chèn nút" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Năm 1962, G. M. Adelson-Velsky và E. M. Landis đã đề xuất <u>cây AVL (AVL tree)</u> trong bài báo "An algorithm for the organization of information". Bài báo mô tả một loạt thao tác giúp ngăn cây AVL suy biến khi các nút được chèn và xóa, từ đó giữ độ phức tạp thời gian của các thao tác luôn ở mức $O(\\\\log n)$. Nói cách khác, trong các tình huống đòi hỏi thao tác chèn, xóa, tra cứu và cập nhật thường xuyên, cây AVL có thể duy trì hiệu suất ổn định và hiệu quả, do đó có giá trị thực tiễn rất lớn.</p>

<h2>7.5.1 Thuật ngữ thường dùng trong Cây AVL</h2>
<p>Cây AVL vừa là cây tìm kiếm nhị phân, vừa là cây nhị phân cân bằng, đồng thời thỏa mãn tất cả các tính chất của hai loại cây nhị phân này, do đó nó là một <u>cây tìm kiếm nhị phân cân bằng (balanced binary search tree)</u>.</p>

<h3>7.5.1.1 Chiều cao nút</h3>
<p>Vì các thao tác liên quan tới cây AVL đòi hỏi việc lấy chiều cao nút, ta cần thêm một biến <code>height</code> vào lớp nút:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Nút của cây AVL */
class TreeNode {
    public int val;        // Giá trị nút
    public int height;     // Chiều cao nút
    public TreeNode left;  // Con trỏ tới nút con trái
    public TreeNode right; // Con trỏ tới nút con phải
    public TreeNode(int x) { val = x; }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class TreeNode:
    """Nút của cây AVL"""
    def __init__(self, val: int):
        self.val: int = val                 # Giá trị nút
        self.height: int = 0                # Chiều cao nút
        self.left: TreeNode | None = None   # Tham chiếu tới nút con trái
        self.right: TreeNode | None = None  # Tham chiếu tới nút con phải</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Nút của cây AVL */
struct TreeNode {
    int val{};          // Giá trị nút
    int height = 0;     // Chiều cao nút
    TreeNode *left{};   // Con trỏ tới nút con trái
    TreeNode *right{};  // Con trỏ tới nút con phải
    TreeNode() = default;
    explicit TreeNode(int x) : val(x){}
};</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Nút của cây AVL */
class TreeNode {
    val; // Giá trị nút
    height; // Chiều cao nút
    left; // Con trỏ tới nút con trái
    right; // Con trỏ tới nút con phải
    constructor(val, left, right, height) {
        this.val = val === undefined ? 0 : val;
        this.height = height === undefined ? 0 : height;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}</code></pre></div></div></div>
<p>"Chiều cao nút" là khoảng cách từ nút đó tới nút lá xa nhất, tức là số cạnh trên đường đi. Cần lưu ý rằng chiều cao của một nút lá là $0$, và chiều cao của một nút rỗng là $-1$. Ta sẽ tạo hai hàm tiện ích để lấy và cập nhật chiều cao của một nút:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Lấy chiều cao nút */
public int height(TreeNode node) {
    // Chiều cao nút rỗng là -1, chiều cao nút lá là 0
    return node == null ? -1 : node.height;
}

/* Cập nhật chiều cao nút */
private void updateHeight(TreeNode node) {
    // Chiều cao nút bằng chiều cao của cây con cao nhất + 1
    node.height = Math.max(height(node.left), height(node.right)) + 1;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func height(node: TreeNode?) -&gt; Int {
        // Empty node height is -1, leaf node height is 0
        node?.height ?? -1
    }</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int height(TreeNode? node) {
    // Empty node height is -1, leaf node height is 0
    return node == null ? -1 : node.height;
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def height(self, node: TreeNode | None) -&gt; int:
    """Lấy chiều cao nút"""
    # Chiều cao nút rỗng là -1, chiều cao nút lá là 0
    if node is not None:
        return node.height
    return -1

def update_height(self, node: TreeNode | None):
    """Cập nhật chiều cao nút"""
    # Chiều cao nút bằng chiều cao của cây con cao nhất + 1
    node.height = max([self.height(node.left), self.height(node.right)]) + 1</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Lấy chiều cao nút */
int height(TreeNode *node) {
    // Chiều cao nút rỗng là -1, chiều cao nút lá là 0
    return node == nullptr ? -1 : node-&gt;height;
}

/* Cập nhật chiều cao nút */
void updateHeight(TreeNode *node) {
    // Chiều cao nút bằng chiều cao của cây con cao nhất + 1
    node-&gt;height = max(height(node-&gt;left), height(node-&gt;right)) + 1;
}</code></pre></div></div></div>

<h3>7.5.1.2 Hệ số cân bằng của nút</h3>
<p><u>Hệ số cân bằng (balance factor)</u> của một nút được định nghĩa là chiều cao cây con trái của nút đó trừ đi chiều cao cây con phải, và hệ số cân bằng của một nút rỗng được định nghĩa là $0$. Ta cũng đóng gói hàm để lấy hệ số cân bằng của nút nhằm thuận tiện sử dụng sau này:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Lấy hệ số cân bằng */
public int balanceFactor(TreeNode node) {
    // Hệ số cân bằng của nút rỗng là 0
    if (node == null)
        return 0;
    // Hệ số cân bằng nút = chiều cao cây con trái - chiều cao cây con phải
    return height(node.left) - height(node.right);
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func balanceFactor(node: TreeNode?) -&gt; Int {
        // Empty node balance factor is 0
        guard let node = node else { return 0 }
        // Node balance factor = left subtree height - right subtree height
        return height(node: node.left) - height(node: node.right)
    }</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int balanceFactor(TreeNode? node) {
    // Empty node balance factor is 0
    if (node == null) return 0;
    // Node balance factor = left subtree height - right subtree height
    return height(node.left) - height(node.right);
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def balance_factor(self, node: TreeNode | None) -&gt; int:
    """Lấy hệ số cân bằng"""
    # Hệ số cân bằng của nút rỗng là 0
    if node is None:
        return 0
    # Hệ số cân bằng nút = chiều cao cây con trái - chiều cao cây con phải
    return self.height(node.left) - self.height(node.right)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Lấy hệ số cân bằng */
int balanceFactor(TreeNode *node) {
    // Hệ số cân bằng của nút rỗng là 0
    if (node == nullptr)
        return 0;
    // Hệ số cân bằng nút = chiều cao cây con trái - chiều cao cây con phải
    return height(node-&gt;left) - height(node-&gt;right);
}</code></pre></div></div></div>
<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Gọi hệ số cân bằng là $f$, thì hệ số cân bằng của bất kỳ nút nào trong cây AVL đều thỏa mãn $-1 \\\\le f \\\\le 1$.</p>
  </div>
</div>

<h2>7.5.2 Các phép xoay trong Cây AVL</h2>
<p>Đặc trưng của cây AVL nằm ở thao tác "xoay" (rotation), giúp khôi phục cân bằng cho các nút mất cân bằng mà không ảnh hưởng tới chuỗi duyệt trung thứ tự của cây nhị phân. Nói cách khác, <strong>thao tác xoay vừa có thể duy trì tính chất của một "cây tìm kiếm nhị phân", vừa giúp cây trở lại thành một "cây nhị phân cân bằng"</strong>.</p>
<p>Ta gọi các nút có giá trị tuyệt đối của hệ số cân bằng $&gt; 1$ là "nút mất cân bằng". Tùy theo tình huống mất cân bằng, thao tác xoay được chia thành bốn loại: xoay phải, xoay trái, xoay trái rồi xoay phải, và xoay phải rồi xoay trái. Dưới đây, ta sẽ mô tả chi tiết các thao tác xoay này.</p>

<h3>7.5.2.1 Xoay phải</h3>
<p>Như hình dưới đây, giá trị bên dưới nút là hệ số cân bằng. Từ dưới lên trên, nút mất cân bằng đầu tiên trong cây nhị phân là "nút 3". Ta tập trung vào cây con có nút mất cân bằng này làm gốc, ký hiệu nút đó là <code>node</code> và nút con trái của nó là <code>child</code>, rồi thực hiện thao tác "xoay phải". Sau khi xoay phải xong, cây con khôi phục lại cân bằng và vẫn duy trì tính chất của một cây tìm kiếm nhị phân.</p>
<div class="interactive-widget-wrapper" id="avl-right-rotate-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img loading="lazy" src="dsa-assets/avltree_right_rotate_step1.png" alt="avltree_right_rotate_step1" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 1</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/avltree_right_rotate_step2.png" alt="avltree_right_rotate_step2" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 2</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/avltree_right_rotate_step3.png" alt="avltree_right_rotate_step3" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 3</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/avltree_right_rotate_step4.png" alt="avltree_right_rotate_step4" style="max-width:100%; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 4</p></div>
    <div class="slider-controls">
      <button class="control-btn" onclick="prevSlide('avl-right-rotate-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 4</span>
      <button class="control-btn" onclick="nextSlide('avl-right-rotate-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Như hình dưới đây, khi nút <code>child</code> có một nút con phải (ký hiệu là <code>grand_child</code>), cần thêm một bước trong thao tác xoay phải: đặt <code>grand_child</code> làm nút con trái của <code>node</code>.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/avltree_right_rotate_with_grandchild.png" alt="Xoay phải khi có grand_child" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>"Xoay phải" là một cách gọi hình tượng; trong thực tế, nó được thực hiện bằng cách chỉnh sửa con trỏ nút, như đoạn mã sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Thao tác xoay phải */
private TreeNode rightRotate(TreeNode node) {
    TreeNode child = node.left;
    TreeNode grandChild = child.right;
    // Lấy child làm điểm tựa, xoay node sang phải
    child.right = node;
    node.left = grandChild;
    // Cập nhật chiều cao nút
    updateHeight(node);
    updateHeight(child);
    // Trả về nút gốc của cây con sau khi xoay
    return child;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def right_rotate(self, node: TreeNode | None) -&gt; TreeNode | None:
    """Thao tác xoay phải"""
    child = node.left
    grand_child = child.right
    # Lấy child làm điểm tựa, xoay node sang phải
    child.right = node
    node.left = grand_child
    # Cập nhật chiều cao nút
    self.update_height(node)
    self.update_height(child)
    # Trả về nút gốc của cây con sau khi xoay
    return child</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Thao tác xoay phải */
TreeNode *rightRotate(TreeNode *node) {
    TreeNode *child = node-&gt;left;
    TreeNode *grandChild = child-&gt;right;
    // Lấy child làm điểm tựa, xoay node sang phải
    child-&gt;right = node;
    node-&gt;left = grandChild;
    // Cập nhật chiều cao nút
    updateHeight(node);
    updateHeight(child);
    // Trả về nút gốc của cây con sau khi xoay
    return child;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Thao tác xoay phải */
#rightRotate(node) {
    const child = node.left;
    const grandChild = child.right;
    // Lấy child làm điểm tựa, xoay node sang phải
    child.right = node;
    node.left = grandChild;
    // Cập nhật chiều cao nút
    this.#updateHeight(node);
    this.#updateHeight(child);
    // Trả về nút gốc của cây con sau khi xoay
    return child;
}</code></pre></div></div></div>

<h3>7.5.2.2 Xoay trái</h3>
<p>Tương ứng, nếu xét "ảnh gương" của cây nhị phân mất cân bằng ở trên, ta cần thực hiện thao tác "xoay trái" như hình dưới đây.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/avltree_left_rotate.png" alt="Thao tác xoay trái" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Tương tự, như hình dưới đây, khi nút <code>child</code> có một nút con trái (ký hiệu là <code>grand_child</code>), cần thêm một bước trong thao tác xoay trái: đặt <code>grand_child</code> làm nút con phải của <code>node</code>.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/avltree_left_rotate_with_grandchild.png" alt="Xoay trái khi có grand_child" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Có thể nhận thấy rằng <strong>thao tác xoay phải và xoay trái đối xứng nhau về logic (tựa như ảnh gương), và hai tình huống mất cân bằng mà chúng giải quyết cũng đối xứng nhau</strong>. Dựa trên tính đối xứng này, ta chỉ cần thay tất cả các từ <code>left</code> trong mã xoay phải bằng <code>right</code>, và tất cả <code>right</code> bằng <code>left</code>, là có được mã triển khai xoay trái:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Thao tác xoay trái */
private TreeNode leftRotate(TreeNode node) {
    TreeNode child = node.right;
    TreeNode grandChild = child.left;
    // Lấy child làm điểm tựa, xoay node sang trái
    child.left = node;
    node.right = grandChild;
    // Cập nhật chiều cao nút
    updateHeight(node);
    updateHeight(child);
    // Trả về nút gốc của cây con sau khi xoay
    return child;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def left_rotate(self, node: TreeNode | None) -&gt; TreeNode | None:
    """Thao tác xoay trái"""
    child = node.right
    grand_child = child.left
    # Lấy child làm điểm tựa, xoay node sang trái
    child.left = node
    node.right = grand_child
    # Cập nhật chiều cao nút
    self.update_height(node)
    self.update_height(child)
    # Trả về nút gốc của cây con sau khi xoay
    return child</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Thao tác xoay trái */
TreeNode *leftRotate(TreeNode *node) {
    TreeNode *child = node-&gt;right;
    TreeNode *grandChild = child-&gt;left;
    // Lấy child làm điểm tựa, xoay node sang trái
    child-&gt;left = node;
    node-&gt;right = grandChild;
    // Cập nhật chiều cao nút
    updateHeight(node);
    updateHeight(child);
    // Trả về nút gốc của cây con sau khi xoay
    return child;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Thao tác xoay trái */
#leftRotate(node) {
    const child = node.right;
    const grandChild = child.left;
    // Lấy child làm điểm tựa, xoay node sang trái
    child.left = node;
    node.right = grandChild;
    // Cập nhật chiều cao nút
    this.#updateHeight(node);
    this.#updateHeight(child);
    // Trả về nút gốc của cây con sau khi xoay
    return child;
}</code></pre></div></div></div>

<h3>7.5.2.3 Xoay trái rồi xoay phải</h3>
<p>Đối với nút 3 mất cân bằng trong hình dưới đây, chỉ dùng riêng xoay trái hoặc xoay phải đều không thể khôi phục cân bằng cho cây con. Trong trường hợp này, cần thực hiện "xoay trái" trên <code>child</code> trước, sau đó "xoay phải" trên <code>node</code>.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/avltree_left_right_rotate.png" alt="Xoay trái rồi xoay phải" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>7.5.2.4 Xoay phải rồi xoay trái</h3>
<p>Như hình dưới đây, đối với trường hợp ảnh gương của cây nhị phân mất cân bằng ở trên, cần thực hiện "xoay phải" trên <code>child</code> trước, sau đó "xoay trái" trên <code>node</code>.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/avltree_right_left_rotate.png" alt="Xoay phải rồi xoay trái" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>7.5.2.5 Lựa chọn phép xoay</h3>
<p>Bốn tình huống mất cân bằng thể hiện trong hình dưới đây tương ứng một-một với các trường hợp ở trên, lần lượt cần xoay phải, xoay trái rồi xoay phải, xoay phải rồi xoay trái, và xoay trái.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/avltree_rotation_cases.png" alt="Bốn trường hợp xoay của cây AVL" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>
<p>Như bảng dưới đây, ta xác định nút mất cân bằng thuộc trường hợp nào bằng cách xét dấu của hệ số cân bằng của nút mất cân bằng và hệ số cân bằng của nút con ở phía cao hơn của nó.</p>
<p align="center">Bảng &nbsp; Điều kiện lựa chọn giữa bốn trường hợp xoay</p>
<table style="width:100%; border-collapse:collapse; font-size:14px; margin:1.5em 0; border: 1px solid var(--border-color);">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Hệ số cân bằng của nút mất cân bằng</th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Hệ số cân bằng của nút con</th>
      <th style="padding:10px 15px; color:var(--text-primary); font-weight:600;">Phương pháp xoay cần áp dụng</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">$&gt; 1$ (cây nghiêng trái)</td><td style="padding:10px 15px;">$\\\\geq 0$</td><td style="padding:10px 15px;">Xoay phải</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">$&gt; 1$ (cây nghiêng trái)</td><td style="padding:10px 15px;">$&lt;0$</td><td style="padding:10px 15px;">Xoay trái rồi xoay phải</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">$&lt; -1$ (cây nghiêng phải)</td><td style="padding:10px 15px;">$\\\\leq 0$</td><td style="padding:10px 15px;">Xoay trái</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px 15px;">$&lt; -1$ (cây nghiêng phải)</td><td style="padding:10px 15px;">$&gt;0$</td><td style="padding:10px 15px;">Xoay phải rồi xoay trái</td></tr>
  </tbody>
</table>
<p>Để tiện sử dụng, ta đóng gói các thao tác xoay thành một hàm. <strong>Với hàm này, ta có thể thực hiện xoay cho nhiều tình huống mất cân bằng khác nhau, khôi phục lại cân bằng cho các nút mất cân bằng</strong>. Đoạn mã như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Thực hiện thao tác xoay để khôi phục cân bằng cho cây con này */
private TreeNode rotate(TreeNode node) {
    // Lấy hệ số cân bằng của node
    int balanceFactor = balanceFactor(node);
    // Cây nghiêng trái
    if (balanceFactor &gt; 1) {
        if (balanceFactor(node.left) &gt;= 0) {
            // Xoay phải
            return rightRotate(node);
        } else {
            // Xoay trái trước rồi xoay phải
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
    }
    // Cây nghiêng phải
    if (balanceFactor &lt; -1) {
        if (balanceFactor(node.right) &lt;= 0) {
            // Xoay trái
            return leftRotate(node);
        } else {
            // Xoay phải trước rồi xoay trái
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
    }
    // Cây cân bằng, không cần xoay, trả về ngay
    return node;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def rotate(self, node: TreeNode | None) -&gt; TreeNode | None:
    """Thực hiện thao tác xoay để khôi phục cân bằng cho cây con này"""
    # Lấy hệ số cân bằng của node
    balance_factor = self.balance_factor(node)
    # Cây nghiêng trái
    if balance_factor &gt; 1:
        if self.balance_factor(node.left) &gt;= 0:
            # Xoay phải
            return self.right_rotate(node)
        else:
            # Xoay trái trước rồi xoay phải
            node.left = self.left_rotate(node.left)
            return self.right_rotate(node)
    # Cây nghiêng phải
    elif balance_factor &lt; -1:
        if self.balance_factor(node.right) &lt;= 0:
            # Xoay trái
            return self.left_rotate(node)
        else:
            # Xoay phải trước rồi xoay trái
            node.right = self.right_rotate(node.right)
            return self.left_rotate(node)
    # Cây cân bằng, không cần xoay, trả về ngay
    return node</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Thực hiện thao tác xoay để khôi phục cân bằng cho cây con này */
TreeNode *rotate(TreeNode *node) {
    // Lấy hệ số cân bằng của node
    int _balanceFactor = balanceFactor(node);
    // Cây nghiêng trái
    if (_balanceFactor &gt; 1) {
        if (balanceFactor(node-&gt;left) &gt;= 0) {
            // Xoay phải
            return rightRotate(node);
        } else {
            // Xoay trái trước rồi xoay phải
            node-&gt;left = leftRotate(node-&gt;left);
            return rightRotate(node);
        }
    }
    // Cây nghiêng phải
    if (_balanceFactor &lt; -1) {
        if (balanceFactor(node-&gt;right) &lt;= 0) {
            // Xoay trái
            return leftRotate(node);
        } else {
            // Xoay phải trước rồi xoay trái
            node-&gt;right = rightRotate(node-&gt;right);
            return leftRotate(node);
        }
    }
    // Cây cân bằng, không cần xoay, trả về ngay
    return node;
}</code></pre></div><div class="code-tab-content" data-lang="javascript"><pre data-lang="javascript"><code>/* Thực hiện thao tác xoay để khôi phục cân bằng cho cây con này */
#rotate(node) {
    // Lấy hệ số cân bằng của node
    const balanceFactor = this.balanceFactor(node);
    // Cây nghiêng trái
    if (balanceFactor &gt; 1) {
        if (this.balanceFactor(node.left) &gt;= 0) {
            // Xoay phải
            return this.#rightRotate(node);
        } else {
            // Xoay trái trước rồi xoay phải
            node.left = this.#leftRotate(node.left);
            return this.#rightRotate(node);
        }
    }
    // Cây nghiêng phải
    if (balanceFactor &lt; -1) {
        if (this.balanceFactor(node.right) &lt;= 0) {
            // Xoay trái
            return this.#leftRotate(node);
        } else {
            // Xoay phải trước rồi xoay trái
            node.right = this.#rightRotate(node.right);
            return this.#leftRotate(node);
        }
    }
    // Cây cân bằng, không cần xoay, trả về ngay
    return node;
}</code></pre></div></div></div>

<h2>7.5.3 Các thao tác thường dùng trong Cây AVL</h2>

<h3>7.5.3.1 Chèn nút</h3>
<p>Thao tác chèn nút trong cây AVL về nguyên lý tương tự như trong cây tìm kiếm nhị phân. Điểm khác biệt duy nhất là sau khi chèn một nút vào cây AVL, một loạt nút mất cân bằng có thể xuất hiện trên đường đi từ nút đó tới nút gốc. Do đó, <strong>ta cần bắt đầu từ nút đó và thực hiện thao tác xoay từ dưới lên trên, khôi phục cân bằng cho tất cả các nút mất cân bằng</strong>. Đoạn mã như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Chèn nút */
public void insert(int val) {
    root = insertHelper(root, val);
}

/* Đệ quy chèn nút (hàm hỗ trợ) */
private TreeNode insertHelper(TreeNode node, int val) {
    if (node == null)
        return new TreeNode(val);
    /* 1. Tìm vị trí chèn và chèn nút */
    if (val &lt; node.val)
        node.left = insertHelper(node.left, val);
    else if (val &gt; node.val)
        node.right = insertHelper(node.right, val);
    else
        return node; // Nút trùng lặp không được chèn, trả về ngay
    updateHeight(node); // Cập nhật chiều cao nút
    /* 2. Thực hiện thao tác xoay để khôi phục cân bằng cho cây con này */
    node = rotate(node);
    // Trả về nút gốc của cây con
    return node;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func insert(num: Int) {
        // If tree is empty, initialize root node
        if root == nil {
            root = TreeNode(x: num)
            return
        }
        var cur = root
        var pre: TreeNode?
        // Loop search, exit after passing leaf node
        while cur != nil {
            // Found duplicate node, return directly
            if cur!.val == num {
                return
            }
            pre = cur
            // Insertion position is in cur's right subtree
            if cur!.val &lt; num {
                cur = cur?.right
            }
            // Insertion position is in cur's left subtree
            else {
                cur = cur?.left
            }
        }
        // Insert node
        let node = TreeNode(x: num)
        if pre!.val &lt; num {
            pre?.right = node
        } else {
            pre?.left = node
        }
    }</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void insert(int _num) {
    // If tree is empty, initialize root node
    if (_root == null) {
      _root = TreeNode(_num);
      return;
    }
    TreeNode? cur = _root;
    TreeNode? pre = null;
    // Loop search, exit after passing leaf node
    while (cur != null) {
      // Found duplicate node, return directly
      if (cur.val == _num) return;
      pre = cur;
      // Insertion position is in cur's right subtree
      if (cur.val &lt; _num)
        cur = cur.right;
      // Insertion position is in cur's left subtree
      else
        cur = cur.left;
    }
    // Insert node
    TreeNode? node = TreeNode(_num);
    if (pre!.val &lt; _num)
      pre.right = node;
    else
      pre.left = node;
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def insert(self, val):
    """Chèn nút"""
    self._root = self.insert_helper(self._root, val)

def insert_helper(self, node: TreeNode | None, val: int) -&gt; TreeNode:
    """Đệ quy chèn nút (hàm hỗ trợ)"""
    if node is None:
        return TreeNode(val)
    # 1. Tìm vị trí chèn và chèn nút
    if val &lt; node.val:
        node.left = self.insert_helper(node.left, val)
    elif val &gt; node.val:
        node.right = self.insert_helper(node.right, val)
    else:
        # Nút trùng lặp không được chèn, trả về ngay
        return node
    # Cập nhật chiều cao nút
    self.update_height(node)
    # 2. Thực hiện thao tác xoay để khôi phục cân bằng cho cây con này
    return self.rotate(node)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Chèn nút */
void insert(int val) {
    root = insertHelper(root, val);
}

/* Đệ quy chèn nút (hàm hỗ trợ) */
TreeNode *insertHelper(TreeNode *node, int val) {
    if (node == nullptr)
        return new TreeNode(val);
    /* 1. Tìm vị trí chèn và chèn nút */
    if (val &lt; node-&gt;val)
        node-&gt;left = insertHelper(node-&gt;left, val);
    else if (val &gt; node-&gt;val)
        node-&gt;right = insertHelper(node-&gt;right, val);
    else
        return node;    // Nút trùng lặp không được chèn, trả về ngay
    updateHeight(node); // Cập nhật chiều cao nút
    /* 2. Thực hiện thao tác xoay để khôi phục cân bằng cho cây con này */
    node = rotate(node);
    // Trả về nút gốc của cây con
    return node;
}</code></pre></div></div></div>

<h3>7.5.3.2 Xóa nút</h3>
<p>Tương tự, dựa trên phương pháp xóa nút của cây tìm kiếm nhị phân, cần thực hiện thao tác xoay từ dưới lên trên để khôi phục cân bằng cho tất cả các nút mất cân bằng. Đoạn mã như sau:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Xóa nút */
public void remove(int val) {
    root = removeHelper(root, val);
}

/* Đệ quy xóa nút (hàm hỗ trợ) */
private TreeNode removeHelper(TreeNode node, int val) {
    if (node == null)
        return null;
    /* 1. Tìm nút và xóa */
    if (val &lt; node.val)
        node.left = removeHelper(node.left, val);
    else if (val &gt; node.val)
        node.right = removeHelper(node.right, val);
    else {
        if (node.left == null || node.right == null) {
            TreeNode child = node.left != null ? node.left : node.right;
            // Số lượng nút con = 0, xóa nút trực tiếp và trả về
            if (child == null)
                return null;
            // Số lượng nút con = 1, xóa nút trực tiếp
            else
                node = child;
        } else {
            // Số lượng nút con = 2, xóa nút tiếp theo trong duyệt trung thứ tự và thay thế nút hiện tại bằng nó
            TreeNode temp = node.right;
            while (temp.left != null) {
                temp = temp.left;
            }
            node.right = removeHelper(node.right, temp.val);
            node.val = temp.val;
        }
    }
    updateHeight(node); // Cập nhật chiều cao nút
    /* 2. Thực hiện thao tác xoay để khôi phục cân bằng cho cây con này */
    node = rotate(node);
    // Trả về nút gốc của cây con
    return node;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func remove(num: Int) {
        // If tree is empty, return directly
        if root == nil {
            return
        }
        var cur = root
        var pre: TreeNode?
        // Loop search, exit after passing leaf node
        while cur != nil {
            // Found node to delete, exit loop
            if cur!.val == num {
                break
            }
            pre = cur
            // Node to delete is in cur's right subtree
            if cur!.val &lt; num {
                cur = cur?.right
            }
            // Node to delete is in cur's left subtree
            else {
                cur = cur?.left
            }
        }
        // If no node to delete, return directly
        if cur == nil {
            return
        }
        // Number of child nodes = 0 or 1
        if cur?.left == nil || cur?.right == nil {
            // When number of child nodes = 0 / 1, child = null / that child node
            let child = cur?.left ?? cur?.right
            // Delete node cur
            if cur !== root {
                if pre?.left === cur {
                    pre?.left = child
                } else {
                    pre?.right = child
                }
            } else {
                // If deleted node is root node, reassign root node
                root = child
            }
        }
        // Number of child nodes = 2
        else {
            // Get next node of cur in inorder traversal
            var tmp = cur?.right
            while tmp?.left != nil {
                tmp = tmp?.left
            }
            // Recursively delete node tmp
            remove(num: tmp!.val)
            // Replace cur with tmp
            cur?.val = tmp!.val
        }
    }</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void remove(int _num) {
    // If tree is empty, return directly
    if (_root == null) return;
    TreeNode? cur = _root;
    TreeNode? pre = null;
    // Loop search, exit after passing leaf node
    while (cur != null) {
      // Found node to delete, exit loop
      if (cur.val == _num) break;
      pre = cur;
      // Node to delete is in cur's right subtree
      if (cur.val &lt; _num)
        cur = cur.right;
      // Node to delete is in cur's left subtree
      else
        cur = cur.left;
    }
    // If no node to delete, return directly
    if (cur == null) return;
    // Number of child nodes = 0 or 1
    if (cur.left == null || cur.right == null) {
      // When number of child nodes = 0 / 1, child = null / that child node
      TreeNode? child = cur.left ?? cur.right;
      // Delete node cur
      if (cur != _root) {
        if (pre!.left == cur)
          pre.left = child;
        else
          pre.right = child;
      } else {
        // If deleted node is root node, reassign root node
        _root = child;
      }
    } else {
      // Number of child nodes = 2
      // Get next node of cur in inorder traversal
      TreeNode? tmp = cur.right;
      while (tmp!.left != null) {
        tmp = tmp.left;
      }
      // Recursively delete node tmp
      remove(tmp.val);
      // Replace cur with tmp
      cur.val = tmp.val;
    }
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def remove(self, val: int):
    """Xóa nút"""
    self._root = self.remove_helper(self._root, val)

def remove_helper(self, node: TreeNode | None, val: int) -&gt; TreeNode | None:
    """Đệ quy xóa nút (hàm hỗ trợ)"""
    if node is None:
        return None
    # 1. Tìm nút và xóa
    if val &lt; node.val:
        node.left = self.remove_helper(node.left, val)
    elif val &gt; node.val:
        node.right = self.remove_helper(node.right, val)
    else:
        if node.left is None or node.right is None:
            child = node.left or node.right
            # Số lượng nút con = 0, xóa nút trực tiếp và trả về
            if child is None:
                return None
            # Số lượng nút con = 1, xóa nút trực tiếp
            else:
                node = child
        else:
            # Số lượng nút con = 2, xóa nút tiếp theo trong duyệt trung thứ tự và thay thế nút hiện tại bằng nó
            temp = node.right
            while temp.left is not None:
                temp = temp.left
            node.right = self.remove_helper(node.right, temp.val)
            node.val = temp.val
    # Cập nhật chiều cao nút
    self.update_height(node)
    # 2. Thực hiện thao tác xoay để khôi phục cân bằng cho cây con này
    return self.rotate(node)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Đệ quy xóa nút (hàm hỗ trợ) */
TreeNode *removeHelper(TreeNode *node, int val) {
    if (node == nullptr)
        return nullptr;
    /* 1. Tìm nút và xóa */
    if (val &lt; node-&gt;val)
        node-&gt;left = removeHelper(node-&gt;left, val);
    else if (val &gt; node-&gt;val)
        node-&gt;right = removeHelper(node-&gt;right, val);
    else {
        if (node-&gt;left == nullptr || node-&gt;right == nullptr) {
            TreeNode *child = node-&gt;left != nullptr ? node-&gt;left : node-&gt;right;
            // Số lượng nút con = 0, xóa nút trực tiếp và trả về
            if (child == nullptr) {
                delete node;
                return nullptr;
            }
            // Số lượng nút con = 1, xóa nút trực tiếp
            else {
                delete node;
                node = child;
            }
        } else {
            // Số lượng nút con = 2, xóa nút tiếp theo trong duyệt trung thứ tự và thay thế nút hiện tại bằng nó
            TreeNode *temp = node-&gt;right;
            while (temp-&gt;left != nullptr) {
                temp = temp-&gt;left;
            }
            int tempVal = temp-&gt;val;
            node-&gt;right = removeHelper(node-&gt;right, temp-&gt;val);
            node-&gt;val = tempVal;
        }
    }
    updateHeight(node); // Cập nhật chiều cao nút
    /* 2. Thực hiện thao tác xoay để khôi phục cân bằng cho cây con này */
    node = rotate(node);
    // Trả về nút gốc của cây con
    return node;
}

/* Xóa nút */
void remove(int val) {
    root = removeHelper(root, val);
}</code></pre></div></div></div>

<h3>7.5.3.3 Tìm kiếm nút</h3>
<p>Thao tác tìm kiếm nút trong cây AVL nhất quán với cây tìm kiếm nhị phân, sẽ không được trình bày chi tiết ở đây.</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Tìm kiếm nút */
public TreeNode search(int val) {
    TreeNode cur = root;
    // Vòng lặp tìm kiếm, thoát sau khi đi qua nút lá
    while (cur != null) {
        // Nút mục tiêu nằm trong cây con phải của cur
        if (cur.val &lt; val)
            cur = cur.right;
        // Nút mục tiêu nằm trong cây con trái của cur
        else if (cur.val &gt; val)
            cur = cur.left;
        // Tìm thấy nút mục tiêu, thoát vòng lặp
        else
            break;
    }
    // Trả về nút mục tiêu
    return cur;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func search(num: Int) -&gt; TreeNode? {
        var cur = root
        // Loop search, exit after passing leaf node
        while cur != nil {
            // Target node is in cur's right subtree
            if cur!.val &lt; num {
                cur = cur?.right
            }
            // Target node is in cur's left subtree
            else if cur!.val &gt; num {
                cur = cur?.left
            }
            // Found target node, exit loop
            else {
                break
            }
        }
        // Return target node
        return cur
    }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def search(self, val: int) -&gt; TreeNode | None:
    """Tìm kiếm nút"""
    cur = self._root
    # Vòng lặp tìm kiếm, thoát sau khi đi qua nút lá
    while cur is not None:
        # Nút mục tiêu nằm trong cây con phải của cur
        if cur.val &lt; val:
            cur = cur.right
        # Nút mục tiêu nằm trong cây con trái của cur
        elif cur.val &gt; val:
            cur = cur.left
        # Tìm thấy nút mục tiêu, thoát vòng lặp
        else:
            break
    # Trả về nút mục tiêu
    return cur</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm kiếm nút */
TreeNode *search(int val) {
    TreeNode *cur = root;
    // Vòng lặp tìm kiếm, thoát sau khi đi qua nút lá
    while (cur != nullptr) {
        // Nút mục tiêu nằm trong cây con phải của cur
        if (cur-&gt;val &lt; val)
            cur = cur-&gt;right;
        // Nút mục tiêu nằm trong cây con trái của cur
        else if (cur-&gt;val &gt; val)
            cur = cur-&gt;left;
        // Tìm thấy nút mục tiêu, thoát vòng lặp
        else
            break;
    }
    // Trả về nút mục tiêu
    return cur;
}</code></pre></div></div></div>

<h2>7.5.4 Các ứng dụng tiêu biểu của Cây AVL</h2>
<ul>
  <li>Tổ chức và lưu trữ dữ liệu quy mô lớn, phù hợp với các tình huống tìm kiếm tần suất cao và chèn/xóa tần suất thấp.</li>
  <li>Dùng để xây dựng hệ thống chỉ mục trong cơ sở dữ liệu.</li>
  <li>Cây đỏ-đen (red-black tree) cũng là một loại cây tìm kiếm nhị phân cân bằng phổ biến. So với cây AVL, cây đỏ-đen có điều kiện cân bằng lỏng lẻo hơn, cần ít thao tác xoay hơn khi chèn và xóa nút, và có hiệu suất trung bình cao hơn cho các thao tác thêm và xóa nút.</li>
</ul>

<div class="interactive-widget-wrapper" id="avl-rotate-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'avl-rotate-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'avl-rotate-wrapper', 'tab-interactive'); initAvlRotateDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="text-align:center; color:var(--text-secondary); font-size:14px;">Xem tab "Mô phỏng tương tác" để theo dõi từng bước chèn liên tiếp các nút và cách cây AVL tự động xoay để khôi phục cân bằng.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="avl-rotate-canvas" style="min-height:260px;"></div>
    <div class="simulator-controls" style="display:flex; gap:10px; justify-content:center; margin:12px 0;">
      <button id="avl-rotate-btn-autorun" class="control-btn" onclick="autoRunAvlRotate()">▶ Auto Run</button>
      <button id="avl-rotate-btn-step" class="control-btn" onclick="stepAvlRotate()">Bước tiếp theo ▶</button>
      <button id="avl-rotate-btn-pause" class="control-btn btn-secondary" onclick="pauseRunAvlRotate()" disabled>⏸ Dừng</button>
      <button id="avl-rotate-btn-reset" class="control-btn btn-secondary" onclick="initAvlRotateDemo()">↺ Reset</button>
    </div>
    <div id="avl-rotate-speed-control" style="text-align:center; margin-bottom:10px;">
      Tốc độ: <input type="range" min="200" max="2000" value="1000" step="200" oninput="setAvlRotateSpeed(this.value)" /> <span id="avl-rotate-speed-label">1000ms</span>
    </div>
    <div id="avl-rotate-status" class="simulator-status" style="text-align:center; min-height:24px;">
      Nhấp "Auto Run" để lần lượt chèn các nút 3, 2, 1 và quan sát cây AVL tự xoay phải để khôi phục cân bằng.
    </div>
  </div>
</div>

`,
    originalContent: `
# AVL Tree *

In the "Binary Search Tree" section, we mentioned that after multiple insertion and removal operations, a binary search tree may degenerate into a linked list. In this case, the time complexity of all operations degrades from $O(\\log n)$ to $O(n)$.

As shown in the figure below, after two node removal operations, this binary search tree will degrade into a linked list.

![Degradation of an AVL tree after removing nodes](avl_tree.assets/avltree_degradation_from_removing_node.png)

For example, in the perfect binary tree shown in the figure below, after inserting two nodes, the tree will lean heavily to the left, and the time complexity of search operations will also degrade.

![Degradation of an AVL tree after inserting nodes](avl_tree.assets/avltree_degradation_from_inserting_node.png)

In 1962, G. M. Adelson-Velsky and E. M. Landis proposed the <u>AVL tree</u> in their paper "An algorithm for the organization of information". The paper describes a series of operations that prevent an AVL tree from degenerating as nodes are inserted and removed, thereby keeping the time complexity of various operations at $O(\\log n)$. In other words, in scenarios that require frequent insertion, deletion, lookup, and update operations, AVL trees can maintain consistently efficient performance and therefore have strong practical value.

## Common Terminology in AVL Trees

An AVL tree is both a binary search tree and a balanced binary tree, simultaneously satisfying all the properties of these two types of binary trees, hence it is a <u>balanced binary search tree</u>.

### Node Height

Since the operations related to AVL trees require obtaining node heights, we need to add a \`height\` variable to the node class:

=== "Python"

    \`\`\`python title=""
    class TreeNode:
        """AVL tree node"""
        def __init__(self, val: int):
            self.val: int = val                 # Node value
            self.height: int = 0                # Node height
            self.left: TreeNode | None = None   # Left child reference
            self.right: TreeNode | None = None  # Right child reference
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    /* AVL tree node */
    struct TreeNode {
        int val{};          // Node value
        int height = 0;     // Node height
        TreeNode *left{};   // Left child
        TreeNode *right{};  // Right child
        TreeNode() = default;
        explicit TreeNode(int x) : val(x){}
    };
    \`\`\`

=== "Java"

    \`\`\`java title=""
    /* AVL tree node */
    class TreeNode {
        public int val;        // Node value
        public int height;     // Node height
        public TreeNode left;  // Left child
        public TreeNode right; // Right child
        public TreeNode(int x) { val = x; }
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    /* AVL tree node */
    class TreeNode(int? x) {
        public int? val = x;    // Node value
        public int height;      // Node height
        public TreeNode? left;  // Left child reference
        public TreeNode? right; // Right child reference
    }
    \`\`\`

=== "Go"

    \`\`\`go title=""
    /* AVL tree node */
    type TreeNode struct {
        Val    int       // Node value
        Height int       // Node height
        Left   *TreeNode // Left child reference
        Right  *TreeNode // Right child reference
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    /* AVL tree node */
    class TreeNode {
        var val: Int // Node value
        var height: Int // Node height
        var left: TreeNode? // Left child
        var right: TreeNode? // Right child

        init(x: Int) {
            val = x
            height = 0
        }
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    /* AVL tree node */
    class TreeNode {
        val; // Node value
        height; // Node height
        left; // Left child pointer
        right; // Right child pointer
        constructor(val, left, right, height) {
            this.val = val === undefined ? 0 : val;
            this.height = height === undefined ? 0 : height;
            this.left = left === undefined ? null : left;
            this.right = right === undefined ? null : right;
        }
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    /* AVL tree node */
    class TreeNode {
        val: number;            // Node value
        height: number;         // Node height
        left: TreeNode | null;  // Left child pointer
        right: TreeNode | null; // Right child pointer
        constructor(val?: number, height?: number, left?: TreeNode | null, right?: TreeNode | null) {
            this.val = val === undefined ? 0 : val;
            this.height = height === undefined ? 0 : height; 
            this.left = left === undefined ? null : left; 
            this.right = right === undefined ? null : right; 
        }
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    /* AVL tree node */
    class TreeNode {
      int val;         // Node value
      int height;      // Node height
      TreeNode? left;  // Left child
      TreeNode? right; // Right child
      TreeNode(this.val, [this.height = 0, this.left, this.right]);
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    use std::rc::Rc;
    use std::cell::RefCell;

    /* AVL tree node */
    struct TreeNode {
        val: i32,                               // Node value
        height: i32,                            // Node height
        left: Option<Rc<RefCell<TreeNode>>>,    // Left child
        right: Option<Rc<RefCell<TreeNode>>>,   // Right child
    }

    impl TreeNode {
        /* Constructor */
        fn new(val: i32) -> Rc<RefCell<Self>> {
            Rc::new(RefCell::new(Self {
                val,
                height: 0,
                left: None,
                right: None
            }))
        }
    }
    \`\`\`

=== "C"

    \`\`\`c title=""
    /* AVL tree node */
    typedef struct TreeNode {
        int val;
        int height;
        struct TreeNode *left;
        struct TreeNode *right;
    } TreeNode;

    /* Constructor */
    TreeNode *newTreeNode(int val) {
        TreeNode *node;

        node = (TreeNode *)malloc(sizeof(TreeNode));
        node->val = val;
        node->height = 0;
        node->left = NULL;
        node->right = NULL;
        return node;
    }
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    /* AVL tree node */
    class TreeNode(val _val: Int) {  // Node value
        val height: Int = 0          // Node height
        val left: TreeNode? = null   // Left child
        val right: TreeNode? = null  // Right child
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    ### AVL tree node class ###
    class TreeNode
      attr_accessor :val    # Node value
      attr_accessor :height # Node height
      attr_accessor :left   # Left child reference
      attr_accessor :right  # Right child reference

      def initialize(val)
        @val = val
        @height = 0
      end
    end
    \`\`\`

The "node height" refers to the distance from that node to its farthest leaf node, i.e., the number of edges on the path. It is important to note that the height of a leaf node is $0$, and the height of a null node is $-1$. We will create two utility functions for getting and updating the height of a node:

\`\`\`src
[file]{avl_tree}-[class]{avl_tree}-[func]{update_height}
\`\`\`

### Node Balance Factor

The <u>balance factor</u> of a node is defined as the height of the node's left subtree minus the height of its right subtree, and the balance factor of a null node is defined as $0$. We also encapsulate the function to obtain the node's balance factor for convenient subsequent use:

\`\`\`src
[file]{avl_tree}-[class]{avl_tree}-[func]{balance_factor}
\`\`\`

!!! tip

    Let the balance factor be $f$, then the balance factor of any node in an AVL tree satisfies $-1 \\le f \\le 1$.

## Rotations in AVL Trees

The characteristic of AVL trees lies in the "rotation" operation, which can restore balance to unbalanced nodes without affecting the inorder traversal sequence of the binary tree. In other words, **rotation operations can both maintain the property of a "binary search tree" and make the tree return to a "balanced binary tree"**.

We call nodes with a balance factor absolute value $> 1$ "unbalanced nodes". Depending on the imbalance situation, rotation operations are divided into four types: right rotation, left rotation, right rotation then left rotation, and left rotation then right rotation. Below we describe these rotation operations in detail.

### Right Rotation

As shown in the figure below, the value below the node is the balance factor. From bottom to top, the first unbalanced node in the binary tree is "node 3". We focus on the subtree with this unbalanced node as the root, denoting the node as \`node\` and its left child as \`child\`, and perform a "right rotation" operation. After the right rotation is completed, the subtree regains balance and still maintains the properties of a binary search tree.

=== "<1>"
    ![Steps of right rotation](avl_tree.assets/avltree_right_rotate_step1.png)

=== "<2>"
    ![avltree_right_rotate_step2](avl_tree.assets/avltree_right_rotate_step2.png)

=== "<3>"
    ![avltree_right_rotate_step3](avl_tree.assets/avltree_right_rotate_step3.png)

=== "<4>"
    ![avltree_right_rotate_step4](avl_tree.assets/avltree_right_rotate_step4.png)

As shown in the figure below, when the \`child\` node has a right child (denoted as \`grand_child\`), a step needs to be added in the right rotation: set \`grand_child\` as the left child of \`node\`.

![Right rotation with grand_child](avl_tree.assets/avltree_right_rotate_with_grandchild.png)

"Right rotation" is a figurative term; in practice, it is achieved by modifying node pointers, as shown in the following code:

\`\`\`src
[file]{avl_tree}-[class]{avl_tree}-[func]{right_rotate}
\`\`\`

### Left Rotation

Correspondingly, if considering the "mirror" of the above unbalanced binary tree, the "left rotation" operation shown in the figure below needs to be performed.

![Left rotation operation](avl_tree.assets/avltree_left_rotate.png)

Similarly, as shown in the figure below, when the \`child\` node has a left child (denoted as \`grand_child\`), a step needs to be added in the left rotation: set \`grand_child\` as the right child of \`node\`.

![Left rotation with grand_child](avl_tree.assets/avltree_left_rotate_with_grandchild.png)

It can be observed that **right rotation and left rotation operations are mirror symmetric in logic, and the two imbalance cases they solve are also symmetric**. Based on symmetry, we only need to replace all \`left\` in the right rotation implementation code with \`right\`, and all \`right\` with \`left\`, to obtain the left rotation implementation code:

\`\`\`src
[file]{avl_tree}-[class]{avl_tree}-[func]{left_rotate}
\`\`\`

### Left Rotation Then Right Rotation

For the unbalanced node 3 in the figure below, using either left rotation or right rotation alone cannot restore the subtree to balance. In this case, a "left rotation" needs to be performed on \`child\` first, followed by a "right rotation" on \`node\`.

![Left-right rotation](avl_tree.assets/avltree_left_right_rotate.png)

### Right Rotation Then Left Rotation

As shown in the figure below, for the mirror case of the above unbalanced binary tree, a "right rotation" needs to be performed on \`child\` first, then a "left rotation" on \`node\`.

![Right-left rotation](avl_tree.assets/avltree_right_left_rotate.png)

### Choice of Rotation

The four imbalances shown in the figure below correspond one-to-one with the above cases, requiring right rotation, left rotation then right rotation, right rotation then left rotation, and left rotation operations respectively.

![The four rotation cases of AVL tree](avl_tree.assets/avltree_rotation_cases.png)

As shown in the table below, we determine which case the unbalanced node belongs to by judging the signs of the balance factor of the unbalanced node and the balance factor of its taller-side child node.

<p align="center"> Table <id> &nbsp; Conditions for Choosing Among the Four Rotation Cases </p>

| Balance factor of the unbalanced node | Balance factor of the child node | Rotation method to apply          |
| -------------------------------------- | --------------------------------- | --------------------------------- |
| $> 1$ (left-leaning tree)              | $\\geq 0$                          | Right rotation                    |
| $> 1$ (left-leaning tree)              | $<0$                              | Left rotation then right rotation |
| $< -1$ (right-leaning tree)            | $\\leq 0$                          | Left rotation                     |
| $< -1$ (right-leaning tree)            | $>0$                              | Right rotation then left rotation |

For ease of use, we encapsulate the rotation operations into a function. **With this function, we can perform rotations for various imbalance situations, restoring balance to unbalanced nodes**. The code is as follows:

\`\`\`src
[file]{avl_tree}-[class]{avl_tree}-[func]{rotate}
\`\`\`

## Common Operations in AVL Trees

### Node Insertion

The node insertion operation in AVL trees is similar in principle to that in binary search trees. The only difference is that after inserting a node in an AVL tree, a series of unbalanced nodes may appear on the path from that node to the root. Therefore, **we need to start from this node and perform rotation operations from bottom to top, restoring balance to all unbalanced nodes**. The code is as follows:

\`\`\`src
[file]{avl_tree}-[class]{avl_tree}-[func]{insert_helper}
\`\`\`

### Node Removal

Similarly, on the basis of the binary search tree's node removal method, rotation operations need to be performed from bottom to top to restore balance to all unbalanced nodes. The code is as follows:

\`\`\`src
[file]{avl_tree}-[class]{avl_tree}-[func]{remove_helper}
\`\`\`

### Node Search

The node search operation in AVL trees is consistent with that in binary search trees, and will not be elaborated here.

## Typical Applications of AVL Trees

- Organizing and storing large-scale data, suitable for scenarios with high-frequency searches and low-frequency insertions and deletions.
- Used to build index systems in databases.
- Red-black trees are also a common type of balanced binary search tree. Compared to AVL trees, red-black trees have more relaxed balance conditions, require fewer rotation operations for node insertion and deletion, and have higher average efficiency for node addition and deletion operations.

`
  },

  'dsa-tree-summary': {
    title: '7.6 Tóm tắt & Hỏi đáp',
    summary: 'Tổng kết các kiến thức chính về Cây nhị phân, Cây tìm kiếm nhị phân và Cây AVL, kèm phần Hỏi & Đáp giải đáp các thắc mắc thường gặp.',
    tags: ['dsa', 'tree', 'summary'],
    domain: 'Algorithms',
    module: 'Chương 7: Cây',
    prerequisites: ['dsa-avl-tree'],
    related: [],
    updatedAt: '2026-07-19',
    readTime: '6 phút',
    content: `
<h2>Điểm lại kiến thức chính</h2>
<ul>
  <li>Cây nhị phân là một cấu trúc dữ liệu phi tuyến tính, thể hiện logic chia để trị của việc phân tách thành hai. Mỗi nút cây nhị phân chứa một giá trị và hai con trỏ, trỏ tới nút con trái và nút con phải của nó.</li>
  <li>Đối với một nút nhất định trong cây nhị phân, cây được tạo thành từ nút con trái (phải) của nó và tất cả các nút bên dưới được gọi là cây con trái (phải) của nút đó.</li>
  <li>Các thuật ngữ liên quan của cây nhị phân bao gồm nút gốc, nút lá, tầng, bậc, cạnh, chiều cao và độ sâu.</li>
  <li>Thao tác khởi tạo, chèn nút và xóa nút của cây nhị phân tương tự như của danh sách liên kết.</li>
  <li>Các loại cây nhị phân phổ biến bao gồm cây nhị phân hoàn hảo, cây nhị phân đầy đủ, cây nhị phân toàn phần và cây nhị phân cân bằng. Cây nhị phân hoàn hảo là dạng lý tưởng, còn danh sách liên kết đại diện cho trường hợp suy biến tệ nhất.</li>
  <li>Một cây nhị phân có thể được biểu diễn bằng mảng thông qua việc sắp xếp giá trị nút và các vị trí trống theo thứ tự duyệt theo tầng, đồng thời triển khai con trỏ dựa trên mối quan hệ ánh xạ chỉ số giữa nút cha và nút con.</li>
  <li>Duyệt theo tầng của cây nhị phân là một phương pháp tìm kiếm theo chiều rộng, tiến hành tầng qua tầng, thường được triển khai bằng một hàng đợi.</li>
  <li>Duyệt tiền thứ tự, trung thứ tự và hậu thứ tự đều thuộc tìm kiếm theo chiều sâu, đi càng sâu càng tốt trước khi quay lui, thường dùng đệ quy.</li>
  <li>Cây tìm kiếm nhị phân là một cấu trúc dữ liệu hiệu quả để tìm kiếm phần tử, với các thao tác tìm kiếm, chèn và xóa đều có độ phức tạp thời gian $O(\\log n)$. Khi cây tìm kiếm nhị phân suy biến thành một danh sách liên kết, tất cả độ phức tạp thời gian suy giảm còn $O(n)$.</li>
  <li>Cây AVL, còn được gọi là cây tìm kiếm nhị phân cân bằng, đảm bảo cây luôn cân bằng sau các lần chèn và xóa nút liên tục thông qua thao tác xoay.</li>
  <li>Thao tác xoay trong cây AVL bao gồm xoay phải, xoay trái, xoay phải rồi xoay trái, và xoay trái rồi xoay phải. Sau khi chèn hoặc xóa nút, cây AVL thực hiện xoay từ dưới lên trên để khôi phục cân bằng.</li>
</ul>

<h2>Hỏi & Đáp</h2>

<p><strong>Hỏi</strong>: Đối với một cây nhị phân chỉ có một nút, chiều cao của cây và độ sâu của nút gốc có đều bằng $0$ không?</p>
<p>Đúng vậy, vì chiều cao và độ sâu thường được định nghĩa là số cạnh trên đường đi.</p>

<p><strong>Hỏi</strong>: Việc chèn và xóa trong cây nhị phân thường được hoàn thành bởi một tập hợp các thao tác. "Tập hợp thao tác" ở đây là gì? Điều đó có ngụ ý việc giải phóng tài nguyên của các nút con không?</p>
<p>Lấy cây tìm kiếm nhị phân làm ví dụ, thao tác xóa một nút cần được xử lý theo ba tình huống khác nhau, mỗi tình huống đòi hỏi nhiều bước thao tác nút.</p>

<p><strong>Hỏi</strong>: Tại sao duyệt DFS trên cây nhị phân lại có ba thứ tự: tiền thứ tự, trung thứ tự và hậu thứ tự, và công dụng của chúng là gì?</p>
<p>Tương tự như duyệt xuôi và duyệt ngược trên mảng, duyệt tiền thứ tự, trung thứ tự và hậu thứ tự là ba phương pháp duyệt cây nhị phân cho phép ta thu được kết quả duyệt theo một thứ tự cụ thể. Ví dụ, trong một cây tìm kiếm nhị phân, vì các nút thỏa mãn quan hệ <code>giá trị nút con trái &lt; giá trị nút gốc &lt; giá trị nút con phải</code>, ta chỉ cần duyệt cây theo thứ tự ưu tiên "trái $\\rightarrow$ gốc $\\rightarrow$ phải" là có thể thu được một chuỗi nút có thứ tự.</p>

<p><strong>Hỏi</strong>: Trong thao tác xoay phải xử lý mối quan hệ giữa các nút mất cân bằng <code>node</code>, <code>child</code> và <code>grand_child</code>, liên kết giữa <code>node</code> và nút cha của nó có bị mất sau khi xoay phải không?</p>
<p>Ta cần nhìn nhận vấn đề này từ góc độ đệ quy. Thao tác xoay phải <code>right_rotate(root)</code> nhận vào nút gốc của cây con và cuối cùng trả về nút gốc của cây con sau khi xoay bằng <code>return child</code>. Liên kết giữa nút gốc của cây con và nút cha của nó được hoàn tất sau khi hàm trả về, điều này không nằm trong phạm vi duy trì của thao tác xoay phải.</p>

<p><strong>Hỏi</strong>: Trong C++, các hàm được chia thành phần <code>private</code> và <code>public</code>. Có những cân nhắc gì cho việc này? Tại sao hàm <code>height()</code> và hàm <code>updateHeight()</code> lại được đặt lần lượt vào <code>public</code> và <code>private</code>?</p>
<p>Điều này chủ yếu phụ thuộc vào phạm vi sử dụng của phương thức. Nếu một phương thức chỉ được dùng trong nội bộ lớp, thì nó được thiết kế là <code>private</code>. Ví dụ, việc người dùng tự gọi riêng <code>updateHeight()</code> không có ý nghĩa gì, vì nó chỉ là một bước trong thao tác chèn hoặc xóa. Tuy nhiên, <code>height()</code> được dùng để truy cập chiều cao nút, tương tự như <code>vector.size()</code>, nên nó được đặt là <code>public</code> để dễ sử dụng.</p>

<p><strong>Hỏi</strong>: Làm thế nào để xây dựng một cây tìm kiếm nhị phân từ một tập dữ liệu đầu vào? Việc lựa chọn nút gốc có quan trọng lắm không?</p>
<p>Có, phương pháp xây dựng cây được cung cấp trong phương thức <code>build_tree()</code> trong mã nguồn cây tìm kiếm nhị phân. Còn về việc lựa chọn nút gốc, ta thường sắp xếp dữ liệu đầu vào, sau đó chọn phần tử ở giữa làm nút gốc, rồi đệ quy xây dựng cây con trái và cây con phải. Cách tiếp cận này giúp tối đa hóa sự cân bằng của cây.</p>

<p><strong>Hỏi</strong>: Trong Java, có phải lúc nào cũng phải dùng phương thức <code>equals()</code> để so sánh chuỗi?</p>
<p>Trong Java, đối với các kiểu dữ liệu nguyên thủy, <code>==</code> được dùng để so sánh xem giá trị của hai biến có bằng nhau không. Đối với các kiểu tham chiếu, nguyên lý hoạt động của hai ký hiệu này khác nhau.</p>
<ul>
  <li><code>==</code>: Dùng để so sánh xem hai biến có trỏ tới cùng một đối tượng không, tức là vị trí của chúng trong bộ nhớ có giống nhau không.</li>
  <li><code>equals()</code>: Dùng để so sánh xem giá trị của hai đối tượng có bằng nhau không.</li>
</ul>
<p>Do đó, nếu ta muốn so sánh giá trị, ta nên dùng <code>equals()</code>. Tuy nhiên, các chuỗi được khởi tạo qua <code>String a = "hi"; String b = "hi";</code> được lưu trong vùng hằng chuỗi (string constant pool) và trỏ tới cùng một đối tượng, nên <code>a == b</code> cũng có thể được dùng để so sánh nội dung của hai chuỗi.</p>

<p><strong>Hỏi</strong>: Trước khi đạt tới tầng dưới cùng, số lượng nút trong hàng đợi có phải luôn là $2^h$ trong duyệt theo chiều rộng không?</p>
<p>Đúng vậy, ví dụ, một cây nhị phân toàn phần có chiều cao $h = 2$ có tổng cộng $n = 7$ nút, thì tầng dưới cùng có $4 = 2^h = (n + 1) / 2$ nút.</p>

`,
    originalContent: `
# Summary

### Key Review

- A binary tree is a non-linear data structure that embodies the divide-and-conquer logic of splitting into two. Each binary tree node contains a value and two pointers, which point to its left and right child nodes.
- For a certain node in a binary tree, the tree formed by its left (right) child node and all nodes below is called the left (right) subtree of that node.
- Related terminology of binary trees includes root node, leaf node, level, degree, edge, height, and depth.
- The initialization, node insertion, and node removal operations of binary trees are similar to those of linked lists.
- Common types of binary trees include perfect binary trees, complete binary trees, full binary trees, and balanced binary trees. A perfect binary tree is the ideal form, while a linked list represents the worst degenerate case.
- A binary tree can be represented using an array by arranging node values and empty slots in level-order traversal sequence, and implementing pointers based on the index mapping relationship between parent and child nodes.
- Level-order traversal of a binary tree is a breadth-first search method that proceeds level by level, typically implemented using a queue.
- Preorder, inorder, and postorder traversals all belong to depth-first search, which proceeds by going as deep as possible before backtracking, typically using recursion.
- A binary search tree is an efficient data structure for element searching, with search, insertion, and removal operations all having time complexity of $O(\\log n)$. When a binary search tree degenerates into a linked list, all time complexities degrade to $O(n)$.
- An AVL tree, also known as a balanced binary search tree, ensures the tree remains balanced after continuous node insertions and removals through rotation operations.
- Rotation operations in AVL trees include right rotation, left rotation, right rotation followed by left rotation, and left rotation followed by right rotation. After inserting or removing nodes, AVL trees perform rotations from bottom to top to restore balance.

### Q & A

**Q**: For a binary tree with only one node, are both the height of the tree and the depth of the root node $0$?

Yes, because height and depth are typically defined as the number of edges on the path.

**Q**: The insertion and removal in a binary tree are generally accomplished by a set of operations. What does "a set of operations" refer to here? Does it imply releasing the resources of the child nodes?

Taking the binary search tree as an example, the operation of removing a node needs to be handled in three different scenarios, each requiring multiple steps of node operations.

**Q**: Why does DFS traversal of binary trees have three orders: preorder, inorder, and postorder, and what are their uses?

Similar to forward and reverse traversal of arrays, preorder, inorder, and postorder traversals are three methods of binary tree traversal that allow us to obtain a traversal result in a specific order. For example, in a binary search tree, since nodes satisfy the relationship \`left child node value < root node value < right child node value\`, we only need to traverse the tree with the priority of "left $\\rightarrow$ root $\\rightarrow$ right" to obtain an ordered node sequence.

**Q**: In a right rotation operation handling the relationship between unbalanced nodes \`node\`, \`child\`, and \`grand_child\`, doesn't the connection between \`node\` and its parent node get lost after the right rotation?

We need to view this problem from a recursive perspective. The right rotation operation \`right_rotate(root)\` passes in the root node of the subtree and eventually returns the root node of the subtree after rotation with \`return child\`. The connection between the subtree's root node and its parent node is completed after the function returns, which is not within the maintenance scope of the right rotation operation.

**Q**: In C++, functions are divided into \`private\` and \`public\` sections. What considerations are there for this? Why are the \`height()\` function and the \`updateHeight()\` function placed in \`public\` and \`private\`, respectively?

It mainly depends on the method's usage scope. If a method is only used within the class, then it is designed as \`private\`. For example, calling \`updateHeight()\` alone by the user makes no sense, as it is only a step in insertion or removal operations. However, \`height()\` is used to access node height, similar to \`vector.size()\`, so it is set to \`public\` for ease of use.

**Q**: How do you build a binary search tree from a set of input data? Is the choice of root node very important?

Yes, the method for building a tree is provided in the \`build_tree()\` method in the binary search tree code. As for the choice of root node, we typically sort the input data, then select the middle element as the root node, and recursively build the left and right subtrees. This approach maximizes the tree's balance.

**Q**: In Java, do you always have to use the \`equals()\` method for string comparison?

In Java, for primitive data types, \`==\` is used to compare whether the values of two variables are equal. For reference types, the working principles of the two symbols are different.

- \`==\`: Used to compare whether two variables point to the same object, i.e., whether their positions in memory are the same.
- \`equals()\`: Used to compare whether the values of two objects are equal.

Therefore, if we want to compare values, we should use \`equals()\`. However, strings initialized via \`String a = "hi"; String b = "hi";\` are stored in the string constant pool and point to the same object, so \`a == b\` can also be used to compare the contents of the two strings.

**Q**: Before reaching the bottom level, is the number of nodes in the queue $2^h$ in breadth-first traversal?

Yes, for example, a full binary tree with height $h = 2$ has a total of $n = 7$ nodes, then the bottom level has $4 = 2^h = (n + 1) / 2$ nodes.

`
  }

});
