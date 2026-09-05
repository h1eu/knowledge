/* ============================================================
   Knowledge OS — DSA Module: Chương 13 - Quay lui (Backtracking)
   Nguồn: hello-algo (chapter_backtracking) — dịch đầy đủ, đối chiếu
   nguyên văn. Widget mô phỏng dùng dữ liệu frame đã được kiểm chứng
   bằng cách mô phỏng thuật toán thật trong Python (xem
   dsa-backtrack-frames-ch13.js).
   ============================================================ */

Object.assign(DSA_CONTENT, {

  'dsa-backtracking-index': {
    title: `Quay lui (Backtracking)`,
    summary: `Giới thiệu chương Quay lui (Backtracking): tìm kiếm cạn kiệt thông minh với kỹ thuật Thử, Quay lui và Cắt tỉa (Pruning).`,
    tags: ['dsa', 'backtracking', 'algorithm-design'],
    domain: 'Algorithms',
    module: `Chương 13: Quay lui`,
    prerequisites: ['dsa-divide-conquer-summary'],
    related: ['dsa-backtracking-algorithm'],
    updatedAt: '2026-07-19',
    readTime: '2 phút',
    content: `

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/chapter_backtracking.jpg" alt="Quay lui" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<div class="callout callout-note">
  <span class="callout-icon">🧭</span>
  <div class="callout-body">
    <p>Chúng ta giống như những nhà thám hiểm trong một mê cung, có thể gặp khó khăn trên con đường phía trước.</p>
    <p>Sức mạnh của Quay lui (Backtracking) cho phép chúng ta bắt đầu lại, tiếp tục thử, và cuối cùng tìm ra lối thoát dẫn đến ánh sáng.</p>
  </div>
</div>

`,
    originalContent: `
# Backtracking

![Backtracking](../assets/covers/chapter_backtracking.jpg)

!!! abstract

    We are like explorers in a maze, and may encounter difficulties on the path forward.

    The power of backtracking allows us to start over, keep trying, and eventually find the exit leading to light.

`
  },

  'dsa-backtracking-algorithm': {
    title: `13.1 Thuật toán Quay lui`,
    summary: `Tìm hiểu bản chất của thuật toán Quay lui qua ví dụ duyệt tiền thứ tự trên cây nhị phân: Thử, Quay lui, Cắt tỉa, khung mã chung và các bài toán điển hình.`,
    tags: ['dsa', 'backtracking', 'algorithm-design', 'dfs', 'pruning'],
    domain: 'Algorithms',
    module: `Chương 13: Quay lui`,
    prerequisites: ['dsa-backtracking-index'],
    related: ['dsa-permutations'],
    updatedAt: '2026-07-19',
    readTime: '15 phút',
    content: `

<h2>Thuật toán Quay lui là gì?</h2>
<p><u>Thuật toán Quay lui (Backtracking Algorithm)</u> là một phương pháp giải quyết vấn đề bằng cách tìm kiếm cạn kiệt (exhaustive search). Ý tưởng cốt lõi là bắt đầu từ một trạng thái ban đầu và tìm kiếm cạn kiệt tất cả các nghiệm khả dĩ. Khi tìm thấy một nghiệm đúng, nó sẽ được ghi nhận lại. Quá trình này tiếp tục cho đến khi tìm được nghiệm hoặc đã thử hết tất cả các lựa chọn khả dĩ mà không tìm thấy nghiệm nào.</p>

<p>Thuật toán Quay lui thường sử dụng "tìm kiếm theo chiều sâu" (DFS) để duyệt không gian nghiệm. Trong chương "Cây nhị phân", chúng ta đã đề cập rằng duyệt tiền thứ tự, trung thứ tự và hậu thứ tự đều thuộc về tìm kiếm theo chiều sâu. Tiếp theo, chúng ta sẽ xây dựng một bài toán Quay lui bằng cách sử dụng duyệt tiền thứ tự để dần dần hiểu cách thuật toán Quay lui hoạt động.</p>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Ví dụ 1</strong></p>
    <p>Cho một cây nhị phân, hãy tìm kiếm và ghi nhận lại tất cả các nút có giá trị $7$, và trả về danh sách các nút này.</p>
  </div>
</div>

<p>Đối với bài toán này, chúng ta thực hiện duyệt tiền thứ tự cây và kiểm tra xem giá trị nút hiện tại có bằng $7$ không. Nếu đúng, ta thêm nút đó vào danh sách kết quả <code>res</code>. Cách triển khai liên quan được minh họa trong hình và đoạn mã sau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Duyệt tiền thứ tự: Ví dụ 1 */
static void preOrder(TreeNode root) {
    if (root == null) {
        return;
    }
    if (root.val == 7) {
        // Ghi nhận nghiệm
        res.add(root);
    }
    preOrder(root.left);
    preOrder(root.right);
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func preOrder(root: TreeNode?) {
    // Pruning
    guard let root = root, root.val != 3 else {
        return
    }
    // Attempt
    path.append(root)
    if root.val == 7 {
        // Record solution
        res.append(path)
    }
    preOrder(root: root.left)
    preOrder(root: root.right)
    // Backtrack
    path.removeLast()
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void preOrder(TreeNode? root, List&lt;TreeNode&gt; res) {
  if (root == null) {
    return;
  }
  if (root.val == 7) {
    // Record solution
    res.add(root);
  }
  preOrder(root.left, res);
  preOrder(root.right, res);
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def pre_order(root):
    """Duyệt tiền thứ tự: Ví dụ 1"""
    if root is None:
        return
    if root.val == 7:
        # Ghi nhận nghiệm
        res.append(root)
    pre_order(root.left)
    pre_order(root.right)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Duyệt tiền thứ tự: Ví dụ 1 */
void preOrder(TreeNode *root) {
    if (root == nullptr) {
        return;
    }
    if (root->val == 7) {
        // Ghi nhận nghiệm
        res.push_back(root);
    }
    preOrder(root->left);
    preOrder(root->right);
}</code></pre></div></div></div>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/preorder_find_nodes.png" alt="Tìm kiếm nút trong duyệt tiền thứ tự" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>Thử và Quay lui</h2>
<p><strong>Sở dĩ gọi là thuật toán Quay lui vì nó sử dụng chiến lược "thử" và "quay lui" khi tìm kiếm trong không gian nghiệm</strong>. Khi thuật toán gặp một trạng thái không thể đi tiếp hoặc không thể tìm thấy nghiệm thỏa mãn ràng buộc, nó sẽ hoàn tác lựa chọn trước đó, quay trở lại trạng thái trước đó, và thử các lựa chọn khả dĩ khác.</p>

<p>Đối với Ví dụ 1, việc ghé thăm mỗi nút đại diện cho một "lần thử", trong khi việc bỏ qua một nút lá hoặc câu lệnh <code>return</code> đưa quá trình duyệt trở lại nút cha đại diện cho một "lần quay lui".</p>

<p>Cần lưu ý rằng, <strong>quay lui không chỉ giới hạn ở việc hàm trả về</strong>. Để minh họa điều này, hãy mở rộng một chút Ví dụ 1.</p>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Ví dụ 2</strong></p>
    <p>Trong một cây nhị phân, tìm kiếm tất cả các nút có giá trị $7$, <strong>và trả về đường đi từ nút gốc đến các nút này</strong>.</p>
  </div>
</div>

<p>Dựa trên đoạn mã của Ví dụ 1, chúng ta cần sử dụng một danh sách <code>path</code> để ghi lại đường đi của các nút đã ghé thăm. Khi đến một nút có giá trị $7$, ta sao chép <code>path</code> và thêm vào danh sách kết quả <code>res</code>. Sau khi duyệt xong, <code>res</code> chứa tất cả các nghiệm. Đoạn mã như sau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Duyệt tiền thứ tự: Ví dụ 2 */
static void preOrder(TreeNode root) {
    if (root == null) {
        return;
    }
    // Thử
    path.add(root);
    if (root.val == 7) {
        // Ghi nhận nghiệm
        res.add(new ArrayList<>(path));
    }
    preOrder(root.left);
    preOrder(root.right);
    // Quay lui
    path.remove(path.size() - 1);
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func preOrder(root: TreeNode?) {
    // Pruning
    guard let root = root, root.val != 3 else {
        return
    }
    // Attempt
    path.append(root)
    if root.val == 7 {
        // Record solution
        res.append(path)
    }
    preOrder(root: root.left)
    preOrder(root: root.right)
    // Backtrack
    path.removeLast()
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void preOrder(TreeNode? root, List&lt;TreeNode&gt; res) {
  if (root == null) {
    return;
  }
  if (root.val == 7) {
    // Record solution
    res.add(root);
  }
  preOrder(root.left, res);
  preOrder(root.right, res);
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def pre_order(root):
    """Duyệt tiền thứ tự: Ví dụ 2"""
    if root is None:
        return
    # Thử
    path.append(root)
    if root.val == 7:
        # Ghi nhận nghiệm
        res.append(list(path))
    pre_order(root.left)
    pre_order(root.right)
    # Quay lui
    path.pop()</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Duyệt tiền thứ tự: Ví dụ 2 */
void preOrder(TreeNode *root) {
    if (root == nullptr) {
        return;
    }
    // Thử
    path.push_back(root);
    if (root->val == 7) {
        // Ghi nhận nghiệm
        res.push_back(path);
    }
    preOrder(root->left);
    preOrder(root->right);
    // Quay lui
    path.pop_back();
}</code></pre></div></div></div>

<p>Trong mỗi "lần thử", ta ghi lại đường đi bằng cách thêm nút hiện tại vào <code>path</code>; trước khi "quay lui", ta cần loại bỏ nút này khỏi <code>path</code>, <strong>để khôi phục trạng thái trước lần thử này</strong>.</p>

<p>Quan sát quá trình được minh họa trong slider dưới đây, <strong>chúng ta có thể hiểu thử và quay lui như "tiến lên" và "hoàn tác"</strong>, hai thao tác ngược nhau.</p>

<div class="interactive-widget-wrapper" id="preorder-find-paths-steps-wrapper">
  <div class="slider-container">
    <div class="slide active"><img loading="lazy" src="dsa-assets/preorder_find_paths_step1.png" alt="Bước 1" style="max-width:100%;" /><p class="slide-caption">Bước 1: Bắt đầu từ nút gốc, thử thêm nút vào <code>path</code>.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_find_paths_step2.png" alt="Bước 2" style="max-width:100%;" /><p class="slide-caption">Bước 2: Đi xuống nhánh trái, tiếp tục thêm nút vào <code>path</code>.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_find_paths_step3.png" alt="Bước 3" style="max-width:100%;" /><p class="slide-caption">Bước 3: Gặp nút giá trị 7, ghi nhận bản sao của <code>path</code> vào <code>res</code>.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_find_paths_step4.png" alt="Bước 4" style="max-width:100%;" /><p class="slide-caption">Bước 4: Tiếp tục đi xuống các nút con của nút vừa ghi nhận.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_find_paths_step5.png" alt="Bước 5" style="max-width:100%;" /><p class="slide-caption">Bước 5: Gặp nút lá (null), không thể đi tiếp.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_find_paths_step6.png" alt="Bước 6" style="max-width:100%;" /><p class="slide-caption">Bước 6: Quay lui — gỡ nút khỏi <code>path</code>, thử nhánh phải.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_find_paths_step7.png" alt="Bước 7" style="max-width:100%;" /><p class="slide-caption">Bước 7: Tiếp tục thử nhánh phải, thêm nút vào <code>path</code>.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_find_paths_step8.png" alt="Bước 8" style="max-width:100%;" /><p class="slide-caption">Bước 8: Quay lui nhiều lần cho đến khi trở lại nút gốc.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_find_paths_step9.png" alt="Bước 9" style="max-width:100%;" /><p class="slide-caption">Bước 9: Chuyển sang nhánh phải của nút gốc, thử tiếp.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_find_paths_step10.png" alt="Bước 10" style="max-width:100%;" /><p class="slide-caption">Bước 10: Gặp lại nút giá trị 7 ở nhánh phải, ghi nhận đường đi thứ hai.</p></div>
    <div class="slide"><img loading="lazy" src="dsa-assets/preorder_find_paths_step11.png" alt="Bước 11" style="max-width:100%;" /><p class="slide-caption">Bước 11: Quay lui về nút gốc, hoàn tất duyệt toàn bộ cây. Kết quả: 2 đường đi.</p></div>
    <div class="slider-controls">
      <button class="control-btn" onclick="prevSlide('preorder-find-paths-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 11</span>
      <button class="control-btn" onclick="nextSlide('preorder-find-paths-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>

<h2>Cắt tỉa</h2>
<p>Các bài toán Quay lui phức tạp thường chứa một hoặc nhiều ràng buộc. <strong>Các ràng buộc thường có thể được sử dụng để "cắt tỉa"</strong>.</p>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Ví dụ 3</strong></p>
    <p>Trong một cây nhị phân, tìm kiếm tất cả các nút có giá trị $7$ và trả về đường đi từ nút gốc đến các nút này, <strong>nhưng yêu cầu các đường đi không được chứa nút có giá trị $3$</strong>.</p>
  </div>
</div>

<p>Để thỏa mãn ràng buộc trên, <strong>chúng ta cần thêm thao tác cắt tỉa</strong>: trong quá trình tìm kiếm, nếu gặp một nút có giá trị $3$, ta trả về ngay lập tức và không tiếp tục tìm kiếm. Đoạn mã như sau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Duyệt tiền thứ tự: Ví dụ 3 */
static void preOrder(TreeNode root) {
    // Cắt tỉa
    if (root == null || root.val == 3) {
        return;
    }
    // Thử
    path.add(root);
    if (root.val == 7) {
        // Ghi nhận nghiệm
        res.add(new ArrayList<>(path));
    }
    preOrder(root.left);
    preOrder(root.right);
    // Quay lui
    path.remove(path.size() - 1);
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func preOrder(root: TreeNode?) {
    // Pruning
    guard let root = root, root.val != 3 else {
        return
    }
    // Attempt
    path.append(root)
    if root.val == 7 {
        // Record solution
        res.append(path)
    }
    preOrder(root: root.left)
    preOrder(root: root.right)
    // Backtrack
    path.removeLast()
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void preOrder(TreeNode? root, List&lt;TreeNode&gt; res) {
  if (root == null) {
    return;
  }
  if (root.val == 7) {
    // Record solution
    res.add(root);
  }
  preOrder(root.left, res);
  preOrder(root.right, res);
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def pre_order(root):
    """Duyệt tiền thứ tự: Ví dụ 3"""
    # Cắt tỉa
    if root is None or root.val == 3:
        return
    # Thử
    path.append(root)
    if root.val == 7:
        # Ghi nhận nghiệm
        res.append(list(path))
    pre_order(root.left)
    pre_order(root.right)
    # Quay lui
    path.pop()</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Duyệt tiền thứ tự: Ví dụ 3 */
void preOrder(TreeNode *root) {
    // Cắt tỉa
    if (root == nullptr || root->val == 3) {
        return;
    }
    // Thử
    path.push_back(root);
    if (root->val == 7) {
        // Ghi nhận nghiệm
        res.push_back(path);
    }
    preOrder(root->left);
    preOrder(root->right);
    // Quay lui
    path.pop_back();
}</code></pre></div></div></div>

<p>"Cắt tỉa" là một thuật ngữ sinh động. Như minh họa trong hình dưới đây, trong quá trình tìm kiếm, <strong>chúng ta "cắt tỉa" các nhánh tìm kiếm không thỏa mãn ràng buộc</strong>, tránh nhiều lần thử vô nghĩa, từ đó cải thiện hiệu quả tìm kiếm.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/preorder_find_constrained_paths.png" alt="Cắt tỉa theo ràng buộc" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<div class="interactive-widget-wrapper" id="backtracking-dfs-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'backtracking-dfs-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'backtracking-dfs-wrapper', 'tab-interactive'); initBacktrackDfsDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="color: var(--text-muted); padding: 12px;">Xem tab "Mô phỏng tương tác" để theo dõi từng bước Thử / Ghi nhận / Quay lui / Cắt tỉa trên cùng cây nhị phân của Ví dụ 2 và Ví dụ 3.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div style="margin-bottom:10px;">
      <button class="control-btn" id="backtracking-dfs-btn-noprune" onclick="setBacktrackDfsMode('noprune')">Không cắt tỉa (Ví dụ 2)</button>
      <button class="control-btn btn-secondary" id="backtracking-dfs-btn-prune" onclick="setBacktrackDfsMode('prune')">Có cắt tỉa (Ví dụ 3)</button>
    </div>
    <div id="backtracking-dfs-canvas"></div>
    <div id="backtracking-dfs-state" style="margin:10px 0; font-family:var(--font-mono); font-size:13px;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; margin:10px 0;">
      <button class="control-btn" id="backtracking-dfs-btn-autorun" onclick="autoRunBacktrackDfs()">▶ Auto Run</button>
      <button class="control-btn btn-secondary" id="backtracking-dfs-btn-step" onclick="stepBacktrackDfs()">Bước tiếp theo ▶</button>
      <button class="control-btn btn-secondary" id="backtracking-dfs-btn-pause" onclick="pauseRunBacktrackDfs()" disabled>⏸ Dừng</button>
      <button class="control-btn btn-secondary" id="backtracking-dfs-btn-reset" onclick="initBacktrackDfsDemo()">↺ Reset</button>
    </div>
    <div style="margin:10px 0; font-size:13px; color:var(--text-muted);">
      Tốc độ: <input type="range" min="300" max="2000" value="900" step="100" oninput="setBacktrackDfsSpeed(this.value)" /> <span id="backtracking-dfs-speed-label">900ms</span>
    </div>
    <div id="backtracking-dfs-status" class="simulator-status" style="padding:10px; background:var(--bg-overlay); border-radius:6px;">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>

<h2>Khung mã chung</h2>
<p>Tiếp theo, chúng ta thử trích xuất một khung chung tập trung vào "thử, quay lui và cắt tỉa" của Quay lui để cải thiện tính tổng quát của mã.</p>

<p>Trong đoạn mã khung dưới đây, <code>state</code> đại diện cho trạng thái hiện tại của bài toán, và <code>choices</code> đại diện cho các lựa chọn khả dĩ ở trạng thái hiện tại:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Khung thuật toán Quay lui */
void backtrack(State state, List<Choice> choices, List<State> res) {
    // Kiểm tra xem có phải là nghiệm không
    if (isSolution(state)) {
        // Ghi nhận nghiệm
        recordSolution(state, res);
        // Dừng tìm kiếm
        return;
    }
    // Duyệt qua tất cả các lựa chọn
    for (Choice choice : choices) {
        // Cắt tỉa: kiểm tra lựa chọn có hợp lệ không
        if (isValid(state, choice)) {
            // Thử: đưa ra lựa chọn, cập nhật trạng thái
            makeChoice(state, choice);
            backtrack(state, choices, res);
            // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
            undoChoice(state, choice);
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func backtrack(state: inout [Int], target: Int, choices: [Int], start: Int, res: inout [[Int]]) {
    // When the subset sum equals target, record the solution
    if target == 0 {
        res.append(state)
        return
    }
    // Traverse all choices
    // Pruning 2: start traversing from start to avoid generating duplicate subsets
    // Pruning 3: start traversing from start to avoid repeatedly selecting the same element
    for i in choices.indices.dropFirst(start) {
        // Pruning 1: if the subset sum exceeds target, end the loop directly
        // This is because the array is sorted, and later elements are larger, so the subset sum will definitely exceed target
        if target - choices[i] &lt; 0 {
            break
        }
        // Pruning 4: if this element equals the left element, it means this search branch is duplicate, skip it directly
        if i &gt; start, choices[i] == choices[i - 1] {
            continue
        }
        // Attempt: make choice, update target, start
        state.append(choices[i])
        // Proceed to the next round of selection
        backtrack(state: &amp;state, target: target - choices[i], choices: choices, start: i + 1, res: &amp;res)
        // Backtrack: undo choice, restore to previous state
        state.removeLast()
    }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def backtrack(state, choices, res):
    """Khung thuật toán Quay lui"""
    # Kiểm tra xem có phải là nghiệm không
    if is_solution(state):
        # Ghi nhận nghiệm
        record_solution(state, res)
        # Dừng tìm kiếm
        return
    # Duyệt qua tất cả các lựa chọn
    for choice in choices:
        # Cắt tỉa: kiểm tra lựa chọn có hợp lệ không
        if is_valid(state, choice):
            # Thử: đưa ra lựa chọn, cập nhật trạng thái
            make_choice(state, choice)
            backtrack(state, choices, res)
            # Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
            undo_choice(state, choice)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Khung thuật toán Quay lui */
void backtrack(State *state, vector<Choice *> &choices, vector<State *> &res) {
    // Kiểm tra xem có phải là nghiệm không
    if (isSolution(state)) {
        // Ghi nhận nghiệm
        recordSolution(state, res);
        // Dừng tìm kiếm
        return;
    }
    // Duyệt qua tất cả các lựa chọn
    for (Choice choice : choices) {
        // Cắt tỉa: kiểm tra lựa chọn có hợp lệ không
        if (isValid(state, choice)) {
            // Thử: đưa ra lựa chọn, cập nhật trạng thái
            makeChoice(state, choice);
            backtrack(state, choices, res);
            // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
            undoChoice(state, choice);
        }
    }
}</code></pre></div></div></div>

<p>Tiếp theo, chúng ta giải Ví dụ 3 dựa trên đoạn mã khung. Trạng thái <code>state</code> là đường đi duyệt nút, các lựa chọn <code>choices</code> là các nút con trái và phải của nút hiện tại, và kết quả <code>res</code> là danh sách các đường đi:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Thuật toán Quay lui: Ví dụ 3 */
static void backtrack(List<TreeNode> state, List<TreeNode> choices, List<List<TreeNode>> res) {
    // Kiểm tra xem có phải là nghiệm không
    if (isSolution(state)) {
        // Ghi nhận nghiệm
        recordSolution(state, res);
    }
    // Duyệt qua tất cả các lựa chọn
    for (TreeNode choice : choices) {
        // Cắt tỉa: kiểm tra lựa chọn có hợp lệ không
        if (isValid(state, choice)) {
            // Thử: đưa ra lựa chọn, cập nhật trạng thái
            makeChoice(state, choice);
            // Tiến hành vòng lựa chọn tiếp theo
            backtrack(state, Arrays.asList(choice.left, choice.right), res);
            // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
            undoChoice(state, choice);
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func backtrack(state: inout [Int], target: Int, choices: [Int], start: Int, res: inout [[Int]]) {
    // When the subset sum equals target, record the solution
    if target == 0 {
        res.append(state)
        return
    }
    // Traverse all choices
    // Pruning 2: start traversing from start to avoid generating duplicate subsets
    // Pruning 3: start traversing from start to avoid repeatedly selecting the same element
    for i in choices.indices.dropFirst(start) {
        // Pruning 1: if the subset sum exceeds target, end the loop directly
        // This is because the array is sorted, and later elements are larger, so the subset sum will definitely exceed target
        if target - choices[i] &lt; 0 {
            break
        }
        // Pruning 4: if this element equals the left element, it means this search branch is duplicate, skip it directly
        if i &gt; start, choices[i] == choices[i - 1] {
            continue
        }
        // Attempt: make choice, update target, start
        state.append(choices[i])
        // Proceed to the next round of selection
        backtrack(state: &amp;state, target: target - choices[i], choices: choices, start: i + 1, res: &amp;res)
        // Backtrack: undo choice, restore to previous state
        state.removeLast()
    }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def backtrack(state, choices, res):
    """Thuật toán Quay lui: Ví dụ 3"""
    # Kiểm tra xem có phải là nghiệm không
    if is_solution(state):
        # Ghi nhận nghiệm
        record_solution(state, res)
    # Duyệt qua tất cả các lựa chọn
    for choice in choices:
        # Cắt tỉa: kiểm tra lựa chọn có hợp lệ không
        if is_valid(state, choice):
            # Thử: đưa ra lựa chọn, cập nhật trạng thái
            make_choice(state, choice)
            # Tiến hành vòng lựa chọn tiếp theo
            backtrack(state, [choice.left, choice.right], res)
            # Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
            undo_choice(state, choice)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Thuật toán Quay lui: Ví dụ 3 */
void backtrack(vector<TreeNode *> &state, vector<TreeNode *> &choices, vector<vector<TreeNode *>> &res) {
    // Kiểm tra xem có phải là nghiệm không
    if (isSolution(state)) {
        // Ghi nhận nghiệm
        recordSolution(state, res);
    }
    // Duyệt qua tất cả các lựa chọn
    for (TreeNode *choice : choices) {
        // Cắt tỉa: kiểm tra lựa chọn có hợp lệ không
        if (isValid(state, choice)) {
            // Thử: đưa ra lựa chọn, cập nhật trạng thái
            makeChoice(state, choice);
            // Tiến hành vòng lựa chọn tiếp theo
            vector<TreeNode *> nextChoices{choice->left, choice->right};
            backtrack(state, nextChoices, res);
            // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
            undoChoice(state, choice);
        }
    }
}</code></pre></div></div></div>

<p>Theo đề bài, ta nên tiếp tục tìm kiếm sau khi tìm thấy một nút có giá trị $7$. <strong>Do đó, ta cần loại bỏ câu lệnh <code>return</code> sau khi ghi nhận nghiệm</strong>. Hình dưới đây so sánh quá trình tìm kiếm khi có và không có câu lệnh <code>return</code>.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/backtrack_remove_return_or_not.png" alt="So sánh có và không có return" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>So với mã dựa trên duyệt tiền thứ tự, mã dựa trên khung thuật toán Quay lui trông có vẻ dài dòng hơn, nhưng lại tổng quát hơn. Thực tế, <strong>nhiều bài toán Quay lui có thể được giải quyết trong khung này</strong>. Ta chỉ cần định nghĩa <code>state</code> và <code>choices</code> cho bài toán cụ thể và triển khai từng phương thức trong khung.</p>

<h2>Thuật ngữ thường dùng</h2>
<p>Để phân tích các bài toán thuật toán rõ ràng hơn, ta tổng hợp ý nghĩa của các thuật ngữ thường dùng trong thuật toán Quay lui và đưa ra các ví dụ tương ứng từ Ví dụ 3, như bảng dưới đây.</p>

<p align="center">Bảng &nbsp; Thuật ngữ thường dùng của thuật toán Quay lui</p>

<table>
  <thead>
    <tr><th>Thuật ngữ</th><th>Định nghĩa</th><th>Ví dụ 3</th></tr>
  </thead>
  <tbody>
    <tr><td>Nghiệm (solution)</td><td>Nghiệm là một đáp án thỏa mãn các điều kiện cụ thể của bài toán; có thể có một hoặc nhiều nghiệm</td><td>Tất cả các đường đi từ gốc đến các nút giá trị $7$ thỏa mãn ràng buộc</td></tr>
    <tr><td>Ràng buộc (constraint)</td><td>Ràng buộc là một điều kiện trong bài toán giới hạn tính khả thi của nghiệm, thường dùng để cắt tỉa</td><td>Đường đi không chứa nút giá trị $3$</td></tr>
    <tr><td>Trạng thái (state)</td><td>Trạng thái đại diện cho tình huống của bài toán tại một thời điểm nhất định, bao gồm các lựa chọn đã thực hiện</td><td>Đường đi đã ghé thăm hiện tại, tức danh sách nút <code>path</code></td></tr>
    <tr><td>Thử (attempt)</td><td>Thử là quá trình khám phá không gian nghiệm theo các lựa chọn khả dĩ, bao gồm đưa ra lựa chọn, cập nhật trạng thái, và kiểm tra có phải là nghiệm không</td><td>Đệ quy ghé thăm nút con trái (phải), thêm nút vào <code>path</code>, kiểm tra giá trị nút có bằng $7$ không</td></tr>
    <tr><td>Quay lui (backtracking)</td><td>Quay lui nghĩa là hoàn tác lựa chọn trước đó và trở về trạng thái trước đó khi gặp trạng thái không thỏa mãn ràng buộc</td><td>Dừng tìm kiếm khi đi qua nút lá, kết thúc ghé thăm nút, hoặc gặp nút giá trị $3$; hàm trả về</td></tr>
    <tr><td>Cắt tỉa (pruning)</td><td>Cắt tỉa là phương pháp tránh các đường tìm kiếm vô nghĩa dựa trên đặc điểm và ràng buộc của bài toán, giúp cải thiện hiệu quả tìm kiếm</td><td>Khi gặp nút giá trị $3$, không tiếp tục tìm kiếm</td></tr>
  </tbody>
</table>

<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Các khái niệm bài toán, nghiệm, trạng thái... mang tính phổ quát và xuất hiện trong Chia để trị, Quay lui, Quy hoạch động, Thuật toán tham lam và nhiều thuật toán khác.</p>
  </div>
</div>

<h2>Ưu điểm và hạn chế</h2>
<p>Thuật toán Quay lui về bản chất là một thuật toán tìm kiếm theo chiều sâu, thử tất cả các nghiệm khả dĩ cho đến khi tìm thấy một nghiệm thỏa mãn điều kiện. Ưu điểm của cách tiếp cận này là có thể tìm ra tất cả các nghiệm khả dĩ, và với các thao tác cắt tỉa hợp lý, nó đạt hiệu quả cao.</p>

<p>Tuy nhiên, khi xử lý các bài toán quy mô lớn hoặc phức tạp, <strong>hiệu quả chạy của thuật toán Quay lui có thể không thể chấp nhận được</strong>.</p>
<ul>
  <li><strong>Thời gian</strong>: Thuật toán Quay lui thường cần duyệt qua tất cả các khả năng trong không gian trạng thái, độ phức tạp thời gian có thể đạt bậc hàm mũ hoặc giai thừa.</li>
  <li><strong>Không gian</strong>: Trong quá trình gọi đệ quy, cần lưu trữ trạng thái hiện tại (như đường đi, các biến phụ trợ dùng để cắt tỉa...), khi độ sâu lớn, yêu cầu không gian có thể trở nên rất lớn.</li>
</ul>

<p>Tuy vậy, <strong>thuật toán Quay lui vẫn là giải pháp tốt nhất cho một số bài toán tìm kiếm và bài toán thỏa mãn ràng buộc</strong>. Đối với những bài toán này, vì ta không thể dự đoán lựa chọn nào sẽ tạo ra nghiệm hợp lệ, ta bắt buộc phải duyệt qua tất cả các lựa chọn khả dĩ. Trong trường hợp này, <strong>vấn đề then chốt là làm thế nào để tối ưu hiệu quả</strong>. Có hai phương pháp tối ưu hiệu quả phổ biến.</p>
<ul>
  <li><strong>Cắt tỉa</strong>: Tránh tìm kiếm các đường chắc chắn không tạo ra nghiệm, từ đó tiết kiệm thời gian và không gian.</li>
  <li><strong>Tìm kiếm heuristic</strong>: Đưa vào một số chiến lược hoặc giá trị ước lượng trong quá trình tìm kiếm để ưu tiên tìm kiếm các đường có khả năng tạo ra nghiệm hợp lệ cao nhất.</li>
</ul>

<h2>Các bài toán Quay lui điển hình</h2>
<p>Thuật toán Quay lui có thể được dùng để giải nhiều bài toán tìm kiếm, bài toán thỏa mãn ràng buộc và bài toán tối ưu hóa tổ hợp.</p>

<p><strong>Bài toán tìm kiếm</strong>: Mục tiêu của các bài toán này là tìm các nghiệm thỏa mãn điều kiện cụ thể.</p>
<ul>
  <li>Bài toán Hoán vị (Permutation problem): Cho một tập hợp, tìm tất cả các hoán vị và tổ hợp khả dĩ.</li>
  <li>Bài toán Tổng tập con (Subset sum problem): Cho một tập hợp và một tổng mục tiêu, tìm tất cả các tập con trong tập hợp có tổng các phần tử bằng mục tiêu.</li>
  <li>Bài toán Tháp Hà Nội (Tower of Hanoi): Cho ba cọc và một loạt đĩa có kích thước khác nhau, di chuyển tất cả các đĩa từ cọc này sang cọc khác, mỗi lần chỉ di chuyển một đĩa, và không bao giờ đặt đĩa lớn hơn lên đĩa nhỏ hơn.</li>
</ul>

<p><strong>Bài toán thỏa mãn ràng buộc</strong>: Mục tiêu của các bài toán này là tìm các nghiệm thỏa mãn tất cả các ràng buộc.</p>
<ul>
  <li>N-Hậu (N-Queens): Đặt $n$ quân hậu lên bàn cờ $n \\times n$ sao cho chúng không tấn công lẫn nhau.</li>
  <li>Sudoku: Điền các số từ $1$ đến $9$ vào lưới $9 \\times 9$ sao cho mỗi hàng, cột, và mỗi lưới con $3 \\times 3$ không chứa chữ số lặp lại.</li>
  <li>Tô màu đồ thị (Graph coloring): Cho một đồ thị vô hướng, tô màu mỗi đỉnh với số lượng màu tối thiểu sao cho các đỉnh kề nhau có màu khác nhau.</li>
</ul>

<p><strong>Bài toán tối ưu hóa tổ hợp</strong>: Mục tiêu của các bài toán này là tìm một nghiệm tối ưu thỏa mãn một số điều kiện trong không gian tổ hợp.</p>
<ul>
  <li>Cái túi 0-1 (0-1 Knapsack): Cho một tập hợp vật phẩm và một cái túi, mỗi vật phẩm có giá trị và trọng lượng. Trong giới hạn dung lượng túi, chọn các vật phẩm để tối đa hóa tổng giá trị.</li>
  <li>Bài toán Người đi buôn (Traveling Salesman Problem): Bắt đầu từ một điểm trong đồ thị, ghé thăm tất cả các điểm khác đúng một lần và quay lại điểm xuất phát, tìm đường đi ngắn nhất.</li>
  <li>Clique lớn nhất (Maximum Clique): Cho một đồ thị vô hướng, tìm đồ thị con đầy đủ lớn nhất, tức là đồ thị con mà bất kỳ hai đỉnh nào cũng được nối bằng một cạnh.</li>
</ul>

<p>Lưu ý rằng đối với nhiều bài toán tối ưu hóa tổ hợp, Quay lui không phải là giải pháp tối ưu.</p>
<ul>
  <li>Bài toán Cái túi 0-1 thường được giải bằng Quy hoạch động để đạt hiệu quả thời gian cao hơn.</li>
  <li>Bài toán Người đi buôn là một bài toán NP-Hard nổi tiếng; các giải pháp phổ biến bao gồm thuật toán di truyền và thuật toán đàn kiến.</li>
  <li>Bài toán Clique lớn nhất là một bài toán kinh điển trong lý thuyết đồ thị và có thể được giải bằng các thuật toán heuristic như thuật toán tham lam.</li>
</ul>

`,
    originalContent: `
# Backtracking Algorithm

<u>The backtracking algorithm</u> is a method for solving problems through exhaustive search. Its core idea is to start from an initial state and exhaustively search all possible solutions. When a correct solution is found, it is recorded. This process continues until a solution is found or all possible choices have been tried without finding a solution.

The backtracking algorithm typically employs "depth-first search" to traverse the solution space. In the "Binary Tree" chapter, we mentioned that preorder, inorder, and postorder traversals all belong to depth-first search. Next, we will construct a backtracking problem using preorder traversal to progressively understand how the backtracking algorithm works.

!!! question "Example 1"

    Given a binary tree, search and record all nodes with value $7$, and return a list of these nodes.

For this problem, we perform a preorder traversal of the tree and check whether the current node's value is $7$. If it is, we add the node to the result list \`res\`. The relevant implementation is shown in the following figure and code:

\`\`\`src
[file]{preorder_traversal_i_compact}-[class]{}-[func]{pre_order}
\`\`\`

![Search for nodes in preorder traversal](backtracking_algorithm.assets/preorder_find_nodes.png)

## Attempt and Backtrack

**The reason it is called a backtracking algorithm is that it employs "attempt" and "backtrack" strategies when searching the solution space**. When the algorithm encounters a state where it cannot continue forward or cannot find a solution that satisfies the constraints, it will undo the previous choice, return to a previous state, and try other possible choices.

For Example 1, visiting each node represents an "attempt", while skipping over a leaf node or the \`return\` that brings the traversal back to the parent node represents a "backtrack".

It is worth noting that **backtracking is not limited to function returns alone**. To illustrate this, let's extend Example 1 slightly.

!!! question "Example 2"

    In a binary tree, search all nodes with value $7$, **and return the paths from the root node to these nodes**.

Based on the code from Example 1, we need to use a list \`path\` to record the path of visited nodes. When we reach a node with value $7$, we copy \`path\` and add it to the result list \`res\`. After traversal is complete, \`res\` contains all the solutions. The code is as follows:

\`\`\`src
[file]{preorder_traversal_ii_compact}-[class]{}-[func]{pre_order}
\`\`\`

In each "attempt", we record the path by adding the current node to \`path\`; before "backtracking", we need to remove the node from \`path\`, **to restore the state before this attempt**.

Observing the process shown in the following figure, **we can understand attempt and backtrack as "advance" and "undo"**, two operations that are the reverse of each other.

=== "<1>"
    ![Attempt and backtrack](backtracking_algorithm.assets/preorder_find_paths_step1.png)

=== "<2>"
    ![preorder_find_paths_step2](backtracking_algorithm.assets/preorder_find_paths_step2.png)

=== "<3>"
    ![preorder_find_paths_step3](backtracking_algorithm.assets/preorder_find_paths_step3.png)

=== "<4>"
    ![preorder_find_paths_step4](backtracking_algorithm.assets/preorder_find_paths_step4.png)

=== "<5>"
    ![preorder_find_paths_step5](backtracking_algorithm.assets/preorder_find_paths_step5.png)

=== "<6>"
    ![preorder_find_paths_step6](backtracking_algorithm.assets/preorder_find_paths_step6.png)

=== "<7>"
    ![preorder_find_paths_step7](backtracking_algorithm.assets/preorder_find_paths_step7.png)

=== "<8>"
    ![preorder_find_paths_step8](backtracking_algorithm.assets/preorder_find_paths_step8.png)

=== "<9>"
    ![preorder_find_paths_step9](backtracking_algorithm.assets/preorder_find_paths_step9.png)

=== "<10>"
    ![preorder_find_paths_step10](backtracking_algorithm.assets/preorder_find_paths_step10.png)

=== "<11>"
    ![preorder_find_paths_step11](backtracking_algorithm.assets/preorder_find_paths_step11.png)

## Pruning

Complex backtracking problems usually contain one or more constraints. **Constraints can typically be used for "pruning"**.

!!! question "Example 3"

    In a binary tree, search all nodes with value $7$ and return the paths from the root node to these nodes, **but require that the paths do not contain nodes with value $3$**.

To satisfy the above constraints, **we need to add pruning operations**: during the search process, if we encounter a node with value $3$, we return early and do not continue searching. The code is as follows:

\`\`\`src
[file]{preorder_traversal_iii_compact}-[class]{}-[func]{pre_order}
\`\`\`

"Pruning" is a vivid term. As shown in the following figure, during the search process, **we "prune" search branches that do not satisfy the constraints**, avoiding many meaningless attempts and thus improving search efficiency.

![Pruning according to constraints](backtracking_algorithm.assets/preorder_find_constrained_paths.png)

## Framework Code

Next, we attempt to extract a general framework centered on backtracking's "attempt, backtrack, and pruning" to improve code generality.

In the following framework code, \`state\` represents the current state of the problem, and \`choices\` represents the choices available in the current state:

=== "Python"

    \`\`\`python title=""
    def backtrack(state: State, choices: list[choice], res: list[state]):
        """Backtracking algorithm framework"""
        # Check if it is a solution
        if is_solution(state):
            # Record the solution
            record_solution(state, res)
            # Stop searching
            return
        # Traverse all choices
        for choice in choices:
            # Pruning: check if the choice is valid
            if is_valid(state, choice):
                # Attempt: make a choice and update the state
                make_choice(state, choice)
                backtrack(state, choices, res)
                # Backtrack: undo the choice and restore to the previous state
                undo_choice(state, choice)
    \`\`\`

=== "C++"

    \`\`\`cpp title=""
    /* Backtracking algorithm framework */
    void backtrack(State *state, vector<Choice *> &choices, vector<State *> &res) {
        // Check if it is a solution
        if (isSolution(state)) {
            // Record the solution
            recordSolution(state, res);
            // Stop searching
            return;
        }
        // Traverse all choices
        for (Choice choice : choices) {
            // Pruning: check if the choice is valid
            if (isValid(state, choice)) {
                // Attempt: make a choice and update the state
                makeChoice(state, choice);
                backtrack(state, choices, res);
                // Backtrack: undo the choice and restore to the previous state
                undoChoice(state, choice);
            }
        }
    }
    \`\`\`

=== "Java"

    \`\`\`java title=""
    /* Backtracking algorithm framework */
    void backtrack(State state, List<Choice> choices, List<State> res) {
        // Check if it is a solution
        if (isSolution(state)) {
            // Record the solution
            recordSolution(state, res);
            // Stop searching
            return;
        }
        // Traverse all choices
        for (Choice choice : choices) {
            // Pruning: check if the choice is valid
            if (isValid(state, choice)) {
                // Attempt: make a choice and update the state
                makeChoice(state, choice);
                backtrack(state, choices, res);
                // Backtrack: undo the choice and restore to the previous state
                undoChoice(state, choice);
            }
        }
    }
    \`\`\`

=== "C#"

    \`\`\`csharp title=""
    /* Backtracking algorithm framework */
    void Backtrack(State state, List<Choice> choices, List<State> res) {
        // Check if it is a solution
        if (IsSolution(state)) {
            // Record the solution
            RecordSolution(state, res);
            // Stop searching
            return;
        }
        // Traverse all choices
        foreach (Choice choice in choices) {
            // Pruning: check if the choice is valid
            if (IsValid(state, choice)) {
                // Attempt: make a choice and update the state
                MakeChoice(state, choice);
                Backtrack(state, choices, res);
                // Backtrack: undo the choice and restore to the previous state
                UndoChoice(state, choice);
            }
        }
    }
    \`\`\`

=== "Go"

    \`\`\`go title=""
    /* Backtracking algorithm framework */
    func backtrack(state *State, choices []Choice, res *[]State) {
        // Check if it is a solution
        if isSolution(state) {
            // Record the solution
            recordSolution(state, res)
            // Stop searching
            return
        }
        // Traverse all choices
        for _, choice := range choices {
            // Pruning: check if the choice is valid
            if isValid(state, choice) {
                // Attempt: make a choice and update the state
                makeChoice(state, choice)
                backtrack(state, choices, res)
                // Backtrack: undo the choice and restore to the previous state
                undoChoice(state, choice)
            }
        }
    }
    \`\`\`

=== "Swift"

    \`\`\`swift title=""
    /* Backtracking algorithm framework */
    func backtrack(state: inout State, choices: [Choice], res: inout [State]) {
        // Check if it is a solution
        if isSolution(state: state) {
            // Record the solution
            recordSolution(state: state, res: &res)
            // Stop searching
            return
        }
        // Traverse all choices
        for choice in choices {
            // Pruning: check if the choice is valid
            if isValid(state: state, choice: choice) {
                // Attempt: make a choice and update the state
                makeChoice(state: &state, choice: choice)
                backtrack(state: &state, choices: choices, res: &res)
                // Backtrack: undo the choice and restore to the previous state
                undoChoice(state: &state, choice: choice)
            }
        }
    }
    \`\`\`

=== "JS"

    \`\`\`javascript title=""
    /* Backtracking algorithm framework */
    function backtrack(state, choices, res) {
        // Check if it is a solution
        if (isSolution(state)) {
            // Record the solution
            recordSolution(state, res);
            // Stop searching
            return;
        }
        // Traverse all choices
        for (let choice of choices) {
            // Pruning: check if the choice is valid
            if (isValid(state, choice)) {
                // Attempt: make a choice and update the state
                makeChoice(state, choice);
                backtrack(state, choices, res);
                // Backtrack: undo the choice and restore to the previous state
                undoChoice(state, choice);
            }
        }
    }
    \`\`\`

=== "TS"

    \`\`\`typescript title=""
    /* Backtracking algorithm framework */
    function backtrack(state: State, choices: Choice[], res: State[]): void {
        // Check if it is a solution
        if (isSolution(state)) {
            // Record the solution
            recordSolution(state, res);
            // Stop searching
            return;
        }
        // Traverse all choices
        for (let choice of choices) {
            // Pruning: check if the choice is valid
            if (isValid(state, choice)) {
                // Attempt: make a choice and update the state
                makeChoice(state, choice);
                backtrack(state, choices, res);
                // Backtrack: undo the choice and restore to the previous state
                undoChoice(state, choice);
            }
        }
    }
    \`\`\`

=== "Dart"

    \`\`\`dart title=""
    /* Backtracking algorithm framework */
    void backtrack(State state, List<Choice>, List<State> res) {
      // Check if it is a solution
      if (isSolution(state)) {
        // Record the solution
        recordSolution(state, res);
        // Stop searching
        return;
      }
      // Traverse all choices
      for (Choice choice in choices) {
        // Pruning: check if the choice is valid
        if (isValid(state, choice)) {
          // Attempt: make a choice and update the state
          makeChoice(state, choice);
          backtrack(state, choices, res);
          // Backtrack: undo the choice and restore to the previous state
          undoChoice(state, choice);
        }
      }
    }
    \`\`\`

=== "Rust"

    \`\`\`rust title=""
    /* Backtracking algorithm framework */
    fn backtrack(state: &mut State, choices: &Vec<Choice>, res: &mut Vec<State>) {
        // Check if it is a solution
        if is_solution(state) {
            // Record the solution
            record_solution(state, res);
            // Stop searching
            return;
        }
        // Traverse all choices
        for choice in choices {
            // Pruning: check if the choice is valid
            if is_valid(state, choice) {
                // Attempt: make a choice and update the state
                make_choice(state, choice);
                backtrack(state, choices, res);
                // Backtrack: undo the choice and restore to the previous state
                undo_choice(state, choice);
            }
        }
    }
    \`\`\`

=== "C"

    \`\`\`c title=""
    /* Backtracking algorithm framework */
    void backtrack(State *state, Choice *choices, int numChoices, State *res, int numRes) {
        // Check if it is a solution
        if (isSolution(state)) {
            // Record the solution
            recordSolution(state, res, numRes);
            // Stop searching
            return;
        }
        // Traverse all choices
        for (int i = 0; i < numChoices; i++) {
            // Pruning: check if the choice is valid
            if (isValid(state, &choices[i])) {
                // Attempt: make a choice and update the state
                makeChoice(state, &choices[i]);
                backtrack(state, choices, numChoices, res, numRes);
                // Backtrack: undo the choice and restore to the previous state
                undoChoice(state, &choices[i]);
            }
        }
    }
    \`\`\`

=== "Kotlin"

    \`\`\`kotlin title=""
    /* Backtracking algorithm framework */
    fun backtrack(state: State?, choices: List<Choice?>, res: List<State?>?) {
        // Check if it is a solution
        if (isSolution(state)) {
            // Record the solution
            recordSolution(state, res)
            // Stop searching
            return
        }
        // Traverse all choices
        for (choice in choices) {
            // Pruning: check if the choice is valid
            if (isValid(state, choice)) {
                // Attempt: make a choice and update the state
                makeChoice(state, choice)
                backtrack(state, choices, res)
                // Backtrack: undo the choice and restore to the previous state
                undoChoice(state, choice)
            }
        }
    }
    \`\`\`

=== "Ruby"

    \`\`\`ruby title=""
    ### Backtracking algorithm framework ###
    def backtrack(state, choices, res)
        # Check if it is a solution
        if is_solution?(state)
            # Record the solution
            record_solution(state, res)
            return
        end

        # Traverse all choices
        for choice in choices
            # Pruning: check if the choice is valid
            if is_valid?(state, choice)
                # Attempt: make a choice and update the state
                make_choice(state, choice)
                backtrack(state, choices, res)
                # Backtrack: undo the choice and restore to the previous state
                undo_choice(state, choice)
            end
        end
    end
    \`\`\`

Next, we solve Example 3 based on the framework code. The state \`state\` is the node traversal path, the choices \`choices\` are the left and right child nodes of the current node, and the result \`res\` is a list of paths:

\`\`\`src
[file]{preorder_traversal_iii_template}-[class]{}-[func]{backtrack}
\`\`\`

As per the problem statement, we should continue searching after finding a node with value $7$. **Therefore, we need to remove the \`return\` statement after recording the solution**. The following figure compares the search process with and without the \`return\` statement.

![Comparison of search process with and without return statement](backtracking_algorithm.assets/backtrack_remove_return_or_not.png)

Compared to code based on preorder traversal, code based on the backtracking algorithm framework appears more verbose, but is more general. In fact, **many backtracking problems can be solved within this framework**. We only need to define \`state\` and \`choices\` for the specific problem and implement each method in the framework.

## Common Terminology

To analyze algorithmic problems more clearly, we summarize the meanings of common terminology used in backtracking algorithms and provide corresponding examples from Example 3, as shown in the following table.

<p align="center"> Table <id> &nbsp; Common Backtracking Algorithm Terminology </p>

| Term                      | Definition                                                                                                                   | Example 3                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Solution (solution)       | A solution is an answer that satisfies the specific conditions of a problem; there may be one or more solutions             | All paths from root to nodes with value $7$ that satisfy the constraint            |
| Constraint (constraint)   | A constraint is a condition in the problem that limits the feasibility of solutions, typically used for pruning              | Paths do not contain nodes with value $3$                                          |
| State (state)             | State represents the situation of a problem at a certain moment, including the choices already made                           | The currently visited node path, i.e., the \`path\` list of nodes                    |
| Attempt (attempt)         | An attempt is the process of exploring the solution space according to available choices, including making choices, updating state, and checking if it is a solution | Recursively visit left (right) child nodes, add nodes to \`path\`, check if node value is $7$ |
| Backtrack (backtracking)  | Backtracking refers to undoing previous choices and returning to a previous state when encountering a state that does not satisfy constraints | Stop searching when passing over leaf nodes, ending node visits, or encountering nodes with value $3$; function returns |
| Pruning (pruning)         | Pruning is a method of avoiding meaningless search paths according to problem characteristics and constraints, which can improve search efficiency | When encountering a node with value $3$, do not continue searching                 |

!!! tip

    The concepts of problem, solution, state, etc. are universal and appear in divide-and-conquer, backtracking, dynamic programming, greedy algorithms, and others.

## Advantages and Limitations

The backtracking algorithm is essentially a depth-first search algorithm that tries all possible solutions until it finds one that satisfies the conditions. The advantage of this approach is that it can find all possible solutions, and with reasonable pruning operations, it achieves high efficiency.

However, when dealing with large-scale or complex problems, **the running efficiency of the backtracking algorithm may be unacceptable**.

- **Time**: The backtracking algorithm usually needs to traverse all possibilities in the state space, and the time complexity can reach exponential or factorial order.
- **Space**: During recursive calls, the current state needs to be saved (such as paths, auxiliary variables used for pruning, etc.), and when the depth is large, the space requirement can become very large.

Nevertheless, **the backtracking algorithm is still the best solution for certain search problems and constraint satisfaction problems**. For these problems, since we cannot predict which choices will generate valid solutions, we must traverse all possible choices. In this case, **the key is how to optimize efficiency**. There are two common efficiency optimization methods.

- **Pruning**: Avoid searching paths that are guaranteed not to produce solutions, thereby saving time and space.
- **Heuristic search**: Introduce certain strategies or estimation values during the search process to prioritize searching paths that are most likely to produce valid solutions.

## Typical Backtracking Examples

The backtracking algorithm can be used to solve many search problems, constraint satisfaction problems, and combinatorial optimization problems.

**Search problems**: The goal of these problems is to find solutions that satisfy specific conditions.

- Permutation problem: Given a set, find all possible permutations and combinations.
- Subset sum problem: Given a set and a target sum, find all subsets in the set whose elements sum to the target.
- Tower of Hanoi: Given three pegs and a series of disks of different sizes, move all disks from one peg to another, moving only one disk at a time, and never placing a larger disk on a smaller disk.

**Constraint satisfaction problems**: The goal of these problems is to find solutions that satisfy all constraints.

- N-Queens: Place $n$ queens on an $n \\times n$ chessboard such that they do not attack each other.
- Sudoku: Fill numbers $1$ to $9$ in a $9 \\times 9$ grid such that each row, column, and $3 \\times 3$ subgrid contains no repeated digits.
- Graph coloring: Given an undirected graph, color each vertex with the minimum number of colors such that adjacent vertices have different colors.

**Combinatorial optimization problems**: The goal of these problems is to find an optimal solution that satisfies certain conditions in a combinatorial space.

- 0-1 Knapsack: Given a set of items and a knapsack, each item has a value and weight. Under the knapsack capacity constraint, select items to maximize total value.
- Traveling Salesman Problem: Starting from a point in a graph, visit all other points exactly once and return to the starting point, finding the shortest path.
- Maximum Clique: Given an undirected graph, find the largest complete subgraph, i.e., a subgraph where any two vertices are connected by an edge.

Note that for many combinatorial optimization problems, backtracking is not the optimal solution.

- The 0-1 Knapsack problem is usually solved using dynamic programming to achieve higher time efficiency.
- The Traveling Salesman Problem is a famous NP-Hard problem; common solutions include genetic algorithms and ant colony algorithms.
- The Maximum Clique problem is a classical problem in graph theory and can be solved using heuristic algorithms such as greedy algorithms.

`
  },

  'dsa-permutations': {
    title: `13.2 Bài toán Hoán vị (Permutations)`,
    summary: `Sinh mọi hoán vị của một tập hợp bằng Quay lui: cắt tỉa lựa chọn trùng lặp bằng selected, và cắt tỉa phần tử bằng nhau cùng tầng bằng duplicated khi mảng có trùng lặp.`,
    tags: ['dsa', 'backtracking', 'permutations', 'combinatorics'],
    domain: 'Algorithms',
    module: `Chương 13: Quay lui`,
    prerequisites: ['dsa-backtracking-algorithm'],
    related: ['dsa-subset-sum'],
    updatedAt: '2026-07-19',
    readTime: '12 phút',
    content: `

<p>Bài toán Hoán vị là một ứng dụng kinh điển của thuật toán Quay lui. Nó được định nghĩa là tìm tất cả các cách sắp xếp khả dĩ của các phần tử trong một tập hợp cho trước (như một mảng hoặc chuỗi).</p>

<p>Bảng dưới đây cho thấy một số tập dữ liệu ví dụ, bao gồm mảng đầu vào và các hoán vị tương ứng.</p>

<p align="center">Bảng &nbsp; Ví dụ về Hoán vị</p>

<table>
  <thead><tr><th>Mảng đầu vào</th><th>Tất cả các Hoán vị</th></tr></thead>
  <tbody>
    <tr><td>$[1]$</td><td>$[1]$</td></tr>
    <tr><td>$[1, 2]$</td><td>$[1, 2], [2, 1]$</td></tr>
    <tr><td>$[1, 2, 3]$</td><td>$[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]$</td></tr>
  </tbody>
</table>

<h2>Trường hợp các phần tử phân biệt</h2>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một mảng số nguyên không có phần tử trùng lặp, trả về tất cả các hoán vị khả dĩ.</p>
  </div>
</div>

<p>Theo góc nhìn của thuật toán Quay lui, <strong>ta có thể hình dung quá trình sinh hoán vị như kết quả của một chuỗi các lựa chọn</strong>. Giả sử mảng đầu vào là $[1, 2, 3]$. Nếu đầu tiên ta chọn $1$, sau đó chọn $3$, và cuối cùng chọn $2$, ta thu được hoán vị $[1, 3, 2]$. Quay lui nghĩa là hoàn tác một lựa chọn rồi thử các lựa chọn khác.</p>

<p>Theo góc nhìn của mã Quay lui, tập ứng viên <code>choices</code> bao gồm tất cả các phần tử trong mảng đầu vào, và trạng thái <code>state</code> là các phần tử đã được chọn cho đến nay. Lưu ý rằng mỗi phần tử chỉ có thể được chọn một lần, <strong>do đó tất cả các phần tử trong <code>state</code> phải là duy nhất</strong>.</p>

<p>Như hình dưới đây, ta có thể triển khai quá trình tìm kiếm thành một cây đệ quy, trong đó mỗi nút trong cây đại diện cho trạng thái <code>state</code> hiện tại. Bắt đầu từ nút gốc, sau ba vòng lựa chọn, ta đến một nút lá, và mỗi nút lá tương ứng với một hoán vị.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/permutations_i.png" alt="Cây đệ quy hoán vị" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h3>Cắt tỉa lựa chọn trùng lặp</h3>
<p>Để đảm bảo mỗi phần tử chỉ được chọn một lần, ta xem xét đưa vào một mảng boolean <code>selected</code>, trong đó <code>selected[i]</code> cho biết <code>choices[i]</code> đã được chọn hay chưa. Ta triển khai thao tác cắt tỉa dựa trên nó như sau.</p>
<ul>
  <li>Sau khi đưa ra lựa chọn <code>choices[i]</code>, ta đặt <code>selected[i]</code> thành $\\text{True}$, cho biết nó đã được chọn.</li>
  <li>Khi duyệt danh sách ứng viên <code>choices</code>, ta bỏ qua tất cả các nút đã được chọn, đây chính là cắt tỉa.</li>
</ul>

<p>Như hình dưới đây, giả sử ta chọn $1$ ở vòng đầu tiên, $3$ ở vòng thứ hai, và $2$ ở vòng thứ ba. Khi đó ta cần cắt tỉa nhánh phần tử $1$ ở vòng thứ hai và cắt tỉa nhánh các phần tử $1$ và $3$ ở vòng thứ ba.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/permutations_i_pruning.png" alt="Ví dụ cắt tỉa hoán vị" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Quan sát hình trên, ta thấy rằng thao tác cắt tỉa này giảm kích thước không gian tìm kiếm từ $O(n^n)$ xuống còn $O(n!)$.</p>

<h3>Triển khai mã</h3>
<p>Sau khi hiểu các thông tin trên, ta có thể điền vào chỗ trống của mã khung. Để rút gọn toàn bộ mã, ta không triển khai riêng từng hàm trong khung, mà thay vào đó khai triển chúng trong hàm <code>backtrack()</code>:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Thuật toán Quay lui: Hoán vị I */
public static void backtrack(List<Integer> state, int[] choices, boolean[] selected, List<List<Integer>> res) {
    // Khi độ dài state bằng độ dài choices, ghi nhận nghiệm
    if (state.size() == choices.length) {
        res.add(new ArrayList<Integer>(state));
        return;
    }
    // Duyệt qua tất cả các lựa chọn
    for (int i = 0; i < choices.length; i++) {
        int choice = choices[i];
        // Cắt tỉa: không cho phép chọn lại phần tử đã chọn
        if (!selected[i]) {
            // Thử: đưa ra lựa chọn, cập nhật trạng thái
            selected[i] = true;
            state.add(choice);
            // Tiến hành vòng lựa chọn tiếp theo
            backtrack(state, choices, selected, res);
            // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
            selected[i] = false;
            state.remove(state.size() - 1);
        }
    }
}

/* Hoán vị I */
static List<List<Integer>> permutationsI(int[] nums) {
    List<List<Integer>> res = new ArrayList<List<Integer>>();
    backtrack(new ArrayList<Integer>(), nums, new boolean[nums.length], res);
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func backtrack(state: inout [Int], target: Int, choices: [Int], start: Int, res: inout [[Int]]) {
    // When the subset sum equals target, record the solution
    if target == 0 {
        res.append(state)
        return
    }
    // Traverse all choices
    // Pruning 2: start traversing from start to avoid generating duplicate subsets
    // Pruning 3: start traversing from start to avoid repeatedly selecting the same element
    for i in choices.indices.dropFirst(start) {
        // Pruning 1: if the subset sum exceeds target, end the loop directly
        // This is because the array is sorted, and later elements are larger, so the subset sum will definitely exceed target
        if target - choices[i] &lt; 0 {
            break
        }
        // Pruning 4: if this element equals the left element, it means this search branch is duplicate, skip it directly
        if i &gt; start, choices[i] == choices[i - 1] {
            continue
        }
        // Attempt: make choice, update target, start
        state.append(choices[i])
        // Proceed to the next round of selection
        backtrack(state: &amp;state, target: target - choices[i], choices: choices, start: i + 1, res: &amp;res)
        // Backtrack: undo choice, restore to previous state
        state.removeLast()
    }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def backtrack(state, choices, selected, res):
    """Thuật toán Quay lui: Hoán vị I"""
    # Khi độ dài state bằng độ dài choices, ghi nhận nghiệm
    if len(state) == len(choices):
        res.append(list(state))
        return
    # Duyệt qua tất cả các lựa chọn
    for i, choice in enumerate(choices):
        # Cắt tỉa: không cho phép chọn lại phần tử đã chọn
        if not selected[i]:
            # Thử: đưa ra lựa chọn, cập nhật trạng thái
            selected[i] = True
            state.append(choice)
            # Tiến hành vòng lựa chọn tiếp theo
            backtrack(state, choices, selected, res)
            # Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
            selected[i] = False
            state.pop()


def permutations_i(nums):
    """Hoán vị I"""
    res = []
    backtrack(state=[], choices=nums, selected=[False] * len(nums), res=res)
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Thuật toán Quay lui: Hoán vị I */
void backtrack(vector<int> &state, const vector<int> &choices, vector<bool> &selected, vector<vector<int>> &res) {
    // Khi độ dài state bằng độ dài choices, ghi nhận nghiệm
    if (state.size() == choices.size()) {
        res.push_back(state);
        return;
    }
    // Duyệt qua tất cả các lựa chọn
    for (int i = 0; i < choices.size(); i++) {
        int choice = choices[i];
        // Cắt tỉa: không cho phép chọn lại phần tử đã chọn
        if (!selected[i]) {
            // Thử: đưa ra lựa chọn, cập nhật trạng thái
            selected[i] = true;
            state.push_back(choice);
            // Tiến hành vòng lựa chọn tiếp theo
            backtrack(state, choices, selected, res);
            // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
            selected[i] = false;
            state.pop_back();
        }
    }
}

/* Hoán vị I */
vector<vector<int>> permutationsI(vector<int> nums) {
    vector<int> state;
    vector<bool> selected(nums.size(), false);
    vector<vector<int>> res;
    backtrack(state, nums, selected, res);
    return res;
}</code></pre></div></div></div>

<h2>Trường hợp có phần tử trùng lặp</h2>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một mảng số nguyên <strong>có thể chứa các phần tử trùng lặp</strong>, trả về tất cả các hoán vị duy nhất.</p>
  </div>
</div>

<p>Giả sử mảng đầu vào là $[1, 1, 2]$. Để phân biệt hai phần tử $1$ trùng lặp, ta ký hiệu số $1$ thứ hai là $\\hat{1}$.</p>

<p>Như hình dưới đây, một nửa số hoán vị được sinh ra bởi phương pháp trên là trùng lặp.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/permutations_ii.png" alt="Hoán vị trùng lặp" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Vậy làm sao để loại bỏ các hoán vị trùng lặp? Cách tiếp cận trực tiếp nhất là dùng một hash set để khử trùng lặp trực tiếp kết quả hoán vị. Tuy nhiên, cách này không thanh lịch vì <strong>các nhánh tìm kiếm sinh ra hoán vị trùng lặp là không cần thiết và nên được nhận diện và cắt tỉa sớm</strong>, điều này có thể cải thiện hơn nữa hiệu quả thuật toán.</p>

<h3>Cắt tỉa các phần tử bằng nhau</h3>
<p>Quan sát hình dưới đây. Ở vòng đầu tiên, chọn $1$ hay chọn $\\hat{1}$ là tương đương. Tất cả các hoán vị sinh ra dưới hai lựa chọn này đều trùng lặp. Do đó, ta nên cắt tỉa $\\hat{1}$.</p>

<p>Tương tự, sau khi chọn $2$ ở vòng đầu tiên, $1$ và $\\hat{1}$ ở vòng thứ hai cũng sinh ra các nhánh trùng lặp, vì vậy $\\hat{1}$ ở vòng thứ hai cũng nên được cắt tỉa.</p>

<p>Về bản chất, <strong>mục tiêu của ta là đảm bảo nhiều phần tử bằng nhau chỉ được chọn một lần trong một vòng lựa chọn nhất định</strong>.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/permutations_ii_pruning.png" alt="Cắt tỉa hoán vị trùng lặp" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h3>Triển khai mã</h3>
<p>Dựa trên mã của bài toán trước, ta khởi tạo một hash set <code>duplicated</code> trong mỗi vòng lựa chọn để ghi lại những phần tử nào đã được thử trong vòng đó, và cắt tỉa các phần tử bằng nhau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Thuật toán Quay lui: Hoán vị II */
static void backtrack(List<Integer> state, int[] choices, boolean[] selected, List<List<Integer>> res) {
    // Khi độ dài state bằng độ dài choices, ghi nhận nghiệm
    if (state.size() == choices.length) {
        res.add(new ArrayList<Integer>(state));
        return;
    }
    // Duyệt qua tất cả các lựa chọn
    Set<Integer> duplicated = new HashSet<Integer>();
    for (int i = 0; i < choices.length; i++) {
        int choice = choices[i];
        // Cắt tỉa: không chọn lại phần tử đã chọn, và không chọn lại phần tử có giá trị bằng nhau
        if (!selected[i] && !duplicated.contains(choice)) {
            // Thử: đưa ra lựa chọn, cập nhật trạng thái
            duplicated.add(choice); // Ghi nhận giá trị phần tử đã chọn
            selected[i] = true;
            state.add(choice);
            // Tiến hành vòng lựa chọn tiếp theo
            backtrack(state, choices, selected, res);
            // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
            selected[i] = false;
            state.remove(state.size() - 1);
        }
    }
}

/* Hoán vị II */
static List<List<Integer>> permutationsII(int[] nums) {
    List<List<Integer>> res = new ArrayList<List<Integer>>();
    backtrack(new ArrayList<Integer>(), nums, new boolean[nums.length], res);
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func backtrack(state: inout [Int], target: Int, choices: [Int], start: Int, res: inout [[Int]]) {
    // When the subset sum equals target, record the solution
    if target == 0 {
        res.append(state)
        return
    }
    // Traverse all choices
    // Pruning 2: start traversing from start to avoid generating duplicate subsets
    // Pruning 3: start traversing from start to avoid repeatedly selecting the same element
    for i in choices.indices.dropFirst(start) {
        // Pruning 1: if the subset sum exceeds target, end the loop directly
        // This is because the array is sorted, and later elements are larger, so the subset sum will definitely exceed target
        if target - choices[i] &lt; 0 {
            break
        }
        // Pruning 4: if this element equals the left element, it means this search branch is duplicate, skip it directly
        if i &gt; start, choices[i] == choices[i - 1] {
            continue
        }
        // Attempt: make choice, update target, start
        state.append(choices[i])
        // Proceed to the next round of selection
        backtrack(state: &amp;state, target: target - choices[i], choices: choices, start: i + 1, res: &amp;res)
        // Backtrack: undo choice, restore to previous state
        state.removeLast()
    }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def backtrack(state, choices, selected, res):
    """Thuật toán Quay lui: Hoán vị II"""
    # Khi độ dài state bằng độ dài choices, ghi nhận nghiệm
    if len(state) == len(choices):
        res.append(list(state))
        return
    # Duyệt qua tất cả các lựa chọn
    duplicated = set()
    for i, choice in enumerate(choices):
        # Cắt tỉa: không chọn lại phần tử đã chọn, và không chọn lại phần tử có giá trị bằng nhau
        if not selected[i] and choice not in duplicated:
            # Thử: đưa ra lựa chọn, cập nhật trạng thái
            duplicated.add(choice)  # Ghi nhận giá trị phần tử đã chọn
            selected[i] = True
            state.append(choice)
            # Tiến hành vòng lựa chọn tiếp theo
            backtrack(state, choices, selected, res)
            # Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
            selected[i] = False
            state.pop()


def permutations_ii(nums):
    """Hoán vị II"""
    res = []
    backtrack(state=[], choices=nums, selected=[False] * len(nums), res=res)
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Thuật toán Quay lui: Hoán vị II */
void backtrack(vector<int> &state, const vector<int> &choices, vector<bool> &selected, vector<vector<int>> &res) {
    // Khi độ dài state bằng độ dài choices, ghi nhận nghiệm
    if (state.size() == choices.size()) {
        res.push_back(state);
        return;
    }
    // Duyệt qua tất cả các lựa chọn
    unordered_set<int> duplicated;
    for (int i = 0; i < choices.size(); i++) {
        int choice = choices[i];
        // Cắt tỉa: không chọn lại phần tử đã chọn, và không chọn lại phần tử có giá trị bằng nhau
        if (!selected[i] && duplicated.find(choice) == duplicated.end()) {
            // Thử: đưa ra lựa chọn, cập nhật trạng thái
            duplicated.emplace(choice); // Ghi nhận giá trị phần tử đã chọn
            selected[i] = true;
            state.push_back(choice);
            // Tiến hành vòng lựa chọn tiếp theo
            backtrack(state, choices, selected, res);
            // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
            selected[i] = false;
            state.pop_back();
        }
    }
}

/* Hoán vị II */
vector<vector<int>> permutationsII(vector<int> nums) {
    vector<int> state;
    vector<bool> selected(nums.size(), false);
    vector<vector<int>> res;
    backtrack(state, nums, selected, res);
    return res;
}</code></pre></div></div></div>

<div class="interactive-widget-wrapper" id="permutations-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'permutations-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'permutations-wrapper', 'tab-interactive'); initPermutationsDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="color: var(--text-muted); padding: 12px;">Xem tab "Mô phỏng tương tác" để theo dõi từng bước Quay lui sinh hoán vị, cả trường hợp không trùng lặp <code>[1,2,3]</code> và có trùng lặp <code>[1,1,2]</code>.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div style="margin-bottom:10px;">
      <button class="control-btn" id="permutations-btn-nodup" onclick="setPermutationsMode('nodup')">Không trùng lặp [1,2,3]</button>
      <button class="control-btn btn-secondary" id="permutations-btn-dup" onclick="setPermutationsMode('dup')">Có trùng lặp [1,1,2]</button>
    </div>
    <div id="permutations-canvas" style="display:flex; gap:8px; margin:10px 0;"></div>
    <div id="permutations-state" style="margin:10px 0; font-family:var(--font-mono); font-size:13px;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; margin:10px 0;">
      <button class="control-btn" id="permutations-btn-autorun" onclick="autoRunPermutations()">▶ Auto Run</button>
      <button class="control-btn btn-secondary" id="permutations-btn-step" onclick="stepPermutations()">Bước tiếp theo ▶</button>
      <button class="control-btn btn-secondary" id="permutations-btn-pause" onclick="pauseRunPermutations()" disabled>⏸ Dừng</button>
      <button class="control-btn btn-secondary" id="permutations-btn-reset" onclick="initPermutationsDemo()">↺ Reset</button>
    </div>
    <div style="margin:10px 0; font-size:13px; color:var(--text-muted);">
      Tốc độ: <input type="range" min="100" max="1500" value="400" step="100" oninput="setPermutationsSpeed(this.value)" /> <span id="permutations-speed-label">400ms</span>
    </div>
    <div id="permutations-status" class="simulator-status" style="padding:10px; background:var(--bg-overlay); border-radius:6px;">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>

<p>Giả sử các phần tử phân biệt từng đôi một, có $n!$ (giai thừa) hoán vị của $n$ phần tử. Khi ghi nhận kết quả, ta cần sao chép một danh sách độ dài $n$, tốn $O(n)$ thời gian. <strong>Do đó, độ phức tạp thời gian là $O(n! \\cdot n)$</strong>.</p>

<p>Độ sâu đệ quy tối đa là $n$, tốn $O(n)$ không gian ngăn xếp lệnh gọi. <code>selected</code> tốn $O(n)$ không gian. Có tối đa $n$ tập <code>duplicated</code> tồn tại đồng thời, tốn $O(n^2)$ không gian. <strong>Do đó, độ phức tạp không gian là $O(n^2)$</strong>.</p>

<h3>So sánh hai phương pháp cắt tỉa</h3>
<p>Lưu ý rằng mặc dù cả <code>selected</code> và <code>duplicated</code> đều dùng để cắt tỉa, chúng có mục tiêu khác nhau.</p>
<ul>
  <li><strong>Cắt tỉa lựa chọn trùng lặp</strong>: Chỉ có một <code>selected</code> duy nhất trong suốt toàn bộ quá trình tìm kiếm. Nó ghi lại những phần tử nào đang có trong trạng thái hiện tại, mục đích của nó là ngăn một phần tử xuất hiện lặp lại trong <code>state</code>.</li>
  <li><strong>Cắt tỉa phần tử bằng nhau</strong>: Mỗi vòng lựa chọn (mỗi lần gọi hàm <code>backtrack</code>) chứa một tập <code>duplicated</code>. Nó ghi lại những phần tử nào đã được chọn trong lần lặp (vòng <code>for</code>) này, mục đích của nó là đảm bảo các phần tử bằng nhau chỉ được chọn một lần.</li>
</ul>

<p>Hình dưới đây cho thấy phạm vi hiệu lực của hai điều kiện cắt tỉa. Lưu ý rằng mỗi nút trong cây đại diện cho một lựa chọn, và các nút trên đường từ gốc đến một nút lá tạo thành một hoán vị.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/permutations_ii_pruning_summary.png" alt="Phạm vi hiệu lực hai điều kiện cắt tỉa" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

`,
    originalContent: `
# Permutations Problem

The permutations problem is a classic application of backtracking algorithms. It is defined as finding all possible arrangements of elements in a given collection (such as an array or string).

The table below shows several example datasets, including input arrays and their corresponding permutations.

<p align="center"> Table <id> &nbsp; Permutations Examples </p>

| Input Array | All Permutations                                                   |
| :---------- | :----------------------------------------------------------------- |
| $[1]$       | $[1]$                                                              |
| $[1, 2]$    | $[1, 2], [2, 1]$                                                   |
| $[1, 2, 3]$ | $[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]$ |

## Case with Distinct Elements

!!! question

    Given an integer array with no duplicate elements, return all possible permutations.

From the perspective of backtracking algorithms, **we can imagine the process of generating permutations as the result of a series of choices**. Suppose the input array is $[1, 2, 3]$. If we first choose $1$, then choose $3$, and finally choose $2$, we obtain the permutation $[1, 3, 2]$. Backtracking means undoing a choice and then trying other choices.

From the perspective of backtracking code, the candidate set \`choices\` consists of all elements in the input array, and the state \`state\` is the elements that have been chosen so far. Note that each element can only be chosen once, **therefore all elements in \`state\` should be unique**.

As shown in the figure below, we can unfold the search process into a recursion tree, where each node in the tree represents the current state \`state\`. Starting from the root node, after three rounds of choices, we reach a leaf node, and each leaf node corresponds to a permutation.

![Recursion tree of permutations](permutations_problem.assets/permutations_i.png)

### Pruning Duplicate Choices

To ensure that each element is chosen only once, we consider introducing a boolean array \`selected\`, where \`selected[i]\` indicates whether \`choices[i]\` has been chosen. We implement the following pruning operation based on it.

- After making a choice \`choices[i]\`, we set \`selected[i]\` to $\\text{True}$, indicating that it has been chosen.
- When traversing the candidate list \`choices\`, we skip all nodes that have been chosen, which is pruning.

As shown in the figure below, suppose we choose $1$ in the first round, $3$ in the second round, and $2$ in the third round. Then we need to prune the branch of element $1$ in the second round and prune the branches of elements $1$ and $3$ in the third round.

![Pruning example of permutations](permutations_problem.assets/permutations_i_pruning.png)

Observing the above figure, we find that this pruning operation reduces the search space size from $O(n^n)$ to $O(n!)$.

### Code Implementation

After understanding the above information, we can fill in the blanks in the template code. To shorten the overall code, we do not implement each function in the template separately, but instead unfold them in the \`backtrack()\` function:

\`\`\`src
[file]{permutations_i}-[class]{}-[func]{permutations_i}
\`\`\`

## Case with Duplicate Elements

!!! question

    Given an integer array that **may contain duplicate elements**, return all unique permutations.

Suppose the input array is $[1, 1, 2]$. To distinguish the two duplicate elements $1$, we denote the second $1$ as $\\hat{1}$.

As shown in the figure below, half of the permutations generated by the above method are duplicates.

![Duplicate permutations](permutations_problem.assets/permutations_ii.png)

So how do we remove duplicate permutations? The most direct approach is to use a hash set to directly deduplicate the permutation results. However, this is not elegant because **the search branches that generate duplicate permutations are unnecessary and should be identified and pruned early**, which can further improve algorithm efficiency.

### Pruning Equal Elements

Observe the figure below. In the first round, choosing $1$ or choosing $\\hat{1}$ is equivalent. All permutations generated under these two choices are duplicates. Therefore, we should prune $\\hat{1}$.

Similarly, after choosing $2$ in the first round, the $1$ and $\\hat{1}$ in the second round also produce duplicate branches, so the second round's $\\hat{1}$ should also be pruned.

Essentially, **our goal is to ensure that multiple equal elements are chosen only once in a certain round of choices**.

![Pruning duplicate permutations](permutations_problem.assets/permutations_ii_pruning.png)

### Code Implementation

Building on the code from the previous problem, we initialize a hash set \`duplicated\` in each round of choices to record which elements have already been tried in that round, and prune equal elements:

\`\`\`src
[file]{permutations_ii}-[class]{}-[func]{permutations_ii}
\`\`\`

Assuming elements are pairwise distinct, there are $n!$ (factorial) permutations of $n$ elements. When recording results, we need to copy a list of length $n$, using $O(n)$ time. **Therefore, the time complexity is $O(n! \\cdot n)$**.

The maximum recursion depth is $n$, using $O(n)$ stack frame space. \`selected\` uses $O(n)$ space. At most $n$ \`duplicated\` sets exist simultaneously, using $O(n^2)$ space. **Therefore, the space complexity is $O(n^2)$**.

### Comparison of Two Pruning Methods

Note that although both \`selected\` and \`duplicated\` are used for pruning, they have different objectives.

- **Pruning duplicate choices**: There is only one \`selected\` throughout the entire search process. It records which elements are included in the current state, and its purpose is to prevent an element from appearing repeatedly in \`state\`.
- **Pruning equal elements**: Each round of choices (each \`backtrack\` function call) contains a \`duplicated\` set. It records which elements have been chosen in this round's iteration (the \`for\` loop), and its purpose is to ensure that equal elements are chosen only once.

The figure below shows the effective scope of the two pruning conditions. Note that each node in the tree represents a choice, and the nodes on the path from the root to a leaf node form a permutation.

![Effective scope of two pruning conditions](permutations_problem.assets/permutations_ii_pruning_summary.png)

`
  },

  'dsa-subset-sum': {
    title: `13.3 Bài toán Tổng tập con (Subset Sum)`,
    summary: `Tìm mọi tập con có tổng bằng target bằng Quay lui: dùng biến start để tránh trùng lặp thứ tự, và cắt tỉa phần tử bằng nhau khi mảng có trùng lặp và mỗi phần tử chỉ chọn một lần.`,
    tags: ['dsa', 'backtracking', 'subset-sum', 'combinations'],
    domain: 'Algorithms',
    module: `Chương 13: Quay lui`,
    prerequisites: ['dsa-permutations'],
    related: ['dsa-n-queens'],
    updatedAt: '2026-07-19',
    readTime: '14 phút',
    content: `

<h2>Không có phần tử trùng lặp</h2>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một mảng số nguyên dương <code>nums</code> và một số nguyên dương mục tiêu <code>target</code>, tìm tất cả các tổ hợp khả dĩ sao cho tổng các phần tử trong tổ hợp bằng <code>target</code>. Mảng đầu vào không có phần tử trùng lặp, và mỗi phần tử có thể được chọn nhiều lần. Trả về các tổ hợp này dưới dạng danh sách, danh sách không được chứa các tổ hợp trùng lặp.</p>
  </div>
</div>

<p>Ví dụ, cho tập hợp $\\{3, 4, 5\\}$ và số nguyên mục tiêu $9$, các nghiệm là $\\{3, 3, 3\\}, \\{4, 5\\}$. Lưu ý hai điểm sau:</p>
<ul>
  <li>Các phần tử trong tập đầu vào có thể được chọn lặp lại không giới hạn.</li>
  <li>Các tập con không phân biệt thứ tự phần tử; ví dụ, $\\{4, 5\\}$ và $\\{5, 4\\}$ là cùng một tập con.</li>
</ul>

<h3>Tham khảo cách giải bài toán Hoán vị</h3>
<p>Tương tự bài toán Hoán vị, ta có thể xem quá trình sinh tập con như kết quả của một chuỗi lựa chọn và cập nhật tổng chạy trong quá trình chọn. Khi tổng bằng <code>target</code>, ta ghi nhận tập con vào danh sách kết quả.</p>

<p>Khác với bài toán Hoán vị, <strong>các phần tử trong bài toán này có thể được chọn bất kỳ số lần nào</strong>, nên ta không cần dùng danh sách boolean <code>selected</code> để theo dõi xem một phần tử đã được chọn hay chưa. Với một vài thay đổi nhỏ so với mã Hoán vị, ta có một nghiệm ban đầu:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Thuật toán Quay lui: Tổng tập con I */
static void backtrack(List<Integer> state, int target, int total, int[] choices, List<List<Integer>> res) {
    // Khi tổng tập con bằng target, ghi nhận nghiệm
    if (total == target) {
        res.add(new ArrayList<>(state));
        return;
    }
    // Duyệt qua tất cả các lựa chọn
    for (int i = 0; i < choices.length; i++) {
        // Cắt tỉa: nếu tổng tập con vượt quá target, bỏ qua lựa chọn này
        if (total + choices[i] > target) {
            continue;
        }
        // Thử: đưa ra lựa chọn, cập nhật tổng total
        state.add(choices[i]);
        // Tiến hành vòng lựa chọn tiếp theo
        backtrack(state, target, total + choices[i], choices, res);
        // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
        state.remove(state.size() - 1);
    }
}

/* Giải bài toán Tổng tập con I (bao gồm cả tập con trùng lặp) */
static List<List<Integer>> subsetSumINaive(int[] nums, int target) {
    List<Integer> state = new ArrayList<>(); // Trạng thái (tập con)
    int total = 0; // Tổng tập con
    List<List<Integer>> res = new ArrayList<>(); // Danh sách kết quả (danh sách các tập con)
    backtrack(state, target, total, nums, res);
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func backtrack(state: inout [Int], target: Int, choices: [Int], start: Int, res: inout [[Int]]) {
    // When the subset sum equals target, record the solution
    if target == 0 {
        res.append(state)
        return
    }
    // Traverse all choices
    // Pruning 2: start traversing from start to avoid generating duplicate subsets
    // Pruning 3: start traversing from start to avoid repeatedly selecting the same element
    for i in choices.indices.dropFirst(start) {
        // Pruning 1: if the subset sum exceeds target, end the loop directly
        // This is because the array is sorted, and later elements are larger, so the subset sum will definitely exceed target
        if target - choices[i] &lt; 0 {
            break
        }
        // Pruning 4: if this element equals the left element, it means this search branch is duplicate, skip it directly
        if i &gt; start, choices[i] == choices[i - 1] {
            continue
        }
        // Attempt: make choice, update target, start
        state.append(choices[i])
        // Proceed to the next round of selection
        backtrack(state: &amp;state, target: target - choices[i], choices: choices, start: i + 1, res: &amp;res)
        // Backtrack: undo choice, restore to previous state
        state.removeLast()
    }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def backtrack(state, target, total, choices, res):
    """Thuật toán Quay lui: Tổng tập con I"""
    # Khi tổng tập con bằng target, ghi nhận nghiệm
    if total == target:
        res.append(list(state))
        return
    # Duyệt qua tất cả các lựa chọn
    for i in range(len(choices)):
        # Cắt tỉa: nếu tổng tập con vượt quá target, bỏ qua lựa chọn này
        if total + choices[i] > target:
            continue
        # Thử: đưa ra lựa chọn, cập nhật tổng total
        state.append(choices[i])
        # Tiến hành vòng lựa chọn tiếp theo
        backtrack(state, target, total + choices[i], choices, res)
        # Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
        state.pop()


def subset_sum_i_naive(nums, target):
    """Giải bài toán Tổng tập con I (bao gồm cả tập con trùng lặp)"""
    state = []  # Trạng thái (tập con)
    total = 0  # Tổng tập con
    res = []  # Danh sách kết quả (danh sách các tập con)
    backtrack(state, target, total, nums, res)
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Thuật toán Quay lui: Tổng tập con I */
void backtrack(vector<int> &state, int target, int total, vector<int> &choices, vector<vector<int>> &res) {
    // Khi tổng tập con bằng target, ghi nhận nghiệm
    if (total == target) {
        res.push_back(state);
        return;
    }
    // Duyệt qua tất cả các lựa chọn
    for (size_t i = 0; i < choices.size(); i++) {
        // Cắt tỉa: nếu tổng tập con vượt quá target, bỏ qua lựa chọn này
        if (total + choices[i] > target) {
            continue;
        }
        // Thử: đưa ra lựa chọn, cập nhật tổng total
        state.push_back(choices[i]);
        // Tiến hành vòng lựa chọn tiếp theo
        backtrack(state, target, total + choices[i], choices, res);
        // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
        state.pop_back();
    }
}

/* Giải bài toán Tổng tập con I (bao gồm cả tập con trùng lặp) */
vector<vector<int>> subsetSumINaive(vector<int> &nums, int target) {
    vector<int> state;       // Trạng thái (tập con)
    int total = 0;           // Tổng tập con
    vector<vector<int>> res; // Danh sách kết quả (danh sách các tập con)
    backtrack(state, target, total, nums, res);
    return res;
}</code></pre></div></div></div>

<p>Chạy đoạn mã trên với mảng $[3, 4, 5]$ và giá trị mục tiêu $9$ sẽ cho ra $[3, 3, 3], [4, 5], [5, 4]$. <strong>Mặc dù ta đã tìm thành công tất cả các tập con có tổng bằng $9$, nhưng có các tập con trùng lặp $[4, 5]$ và $[5, 4]$</strong>.</p>

<p>Điều này là do quá trình tìm kiếm phân biệt thứ tự các lựa chọn, nhưng các tập con thì không phân biệt thứ tự chọn. Như hình dưới đây, chọn $4$ trước rồi $5$ so với chọn $5$ trước rồi $4$ là các nhánh khác nhau, nhưng chúng tương ứng với cùng một tập con.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/subset_sum_i_naive.png" alt="Tìm kiếm tập con và cắt tỉa biên" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Để loại bỏ các tập con trùng lặp, <strong>một ý tưởng đơn giản là khử trùng lặp danh sách kết quả</strong>. Tuy nhiên, cách này rất kém hiệu quả vì hai lý do:</p>
<ul>
  <li>Khi có nhiều phần tử mảng, đặc biệt khi <code>target</code> lớn, quá trình tìm kiếm sinh ra nhiều tập con trùng lặp.</li>
  <li>So sánh các tập con (mảng) rất tốn thời gian, đòi hỏi phải sắp xếp các mảng trước, sau đó so sánh từng phần tử trong đó.</li>
</ul>

<h3>Cắt tỉa tập con trùng lặp</h3>
<p><strong>Ta xem xét khử trùng lặp thông qua cắt tỉa trong quá trình tìm kiếm</strong>. Quan sát hình dưới đây, các tập con trùng lặp xảy ra khi các phần tử mảng được chọn theo thứ tự khác nhau, như các trường hợp sau:</p>
<ol>
  <li>Khi vòng đầu và vòng thứ hai lần lượt chọn $3$ và $4$, tất cả các tập con chứa hai phần tử này được sinh ra, ký hiệu là $[3, 4, \\dots]$.</li>
  <li>Sau đó, khi vòng đầu chọn $4$, <strong>vòng thứ hai nên bỏ qua $3$</strong>, vì tập con $[4, 3, \\dots]$ sinh ra bởi lựa chọn này trùng khớp hoàn toàn với tập con sinh ra ở bước \`1.\`</li>
</ol>

<p>Trong quá trình tìm kiếm, các lựa chọn ở mỗi tầng được thử từ trái sang phải, vì vậy các nhánh bên phải nhất bị cắt tỉa nhiều hơn.</p>
<ol>
  <li>Hai vòng đầu chọn $3$ và $5$, sinh ra tập con $[3, 5, \\dots]$.</li>
  <li>Hai vòng đầu chọn $4$ và $5$, sinh ra tập con $[4, 5, \\dots]$.</li>
  <li>Nếu vòng đầu chọn $5$, <strong>vòng thứ hai nên bỏ qua $3$ và $4$</strong>, vì các tập con $[5, 3, \\dots]$ và $[5, 4, \\dots]$ trùng khớp hoàn toàn với các tập con mô tả ở bước \`1.\` và \`2.\`</li>
</ol>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/subset_sum_i_pruning.png" alt="Các thứ tự chọn khác nhau dẫn đến tập con trùng lặp" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Tóm lại, cho mảng đầu vào $[x_1, x_2, \\dots, x_n]$, gọi chuỗi lựa chọn trong quá trình tìm kiếm là $[x_{i_1}, x_{i_2}, \\dots, x_{i_m}]$. Chuỗi lựa chọn này phải thỏa mãn $i_1 \\leq i_2 \\leq \\dots \\leq i_m$; <strong>bất kỳ chuỗi lựa chọn nào không thỏa mãn điều kiện này sẽ gây trùng lặp và cần được cắt tỉa</strong>.</p>

<h3>Triển khai mã</h3>
<p>Để triển khai cắt tỉa này, ta khởi tạo một biến <code>start</code> để chỉ điểm bắt đầu duyệt. <strong>Sau khi đưa ra lựa chọn $x_i$, đặt vòng tiếp theo bắt đầu duyệt từ chỉ mục $i$</strong>. Điều này đảm bảo chuỗi lựa chọn thỏa mãn $i_1 \\leq i_2 \\leq \\dots \\leq i_m$, đảm bảo tính duy nhất của tập con.</p>

<p>Ngoài ra, ta đã thực hiện hai tối ưu sau đối với mã:</p>
<ul>
  <li>Trước khi bắt đầu tìm kiếm, sắp xếp mảng <code>nums</code> trước. Khi duyệt tất cả các lựa chọn, <strong>kết thúc vòng lặp ngay khi tổng tập con vượt quá <code>target</code></strong>, vì các phần tử tiếp theo lớn hơn, tổng tập con của chúng chắc chắn vượt <code>target</code>.</li>
  <li>Bỏ qua biến tổng phần tử <code>total</code> và <strong>dùng phép trừ trên <code>target</code> để theo dõi tổng các phần tử</strong>. Ghi nhận nghiệm khi <code>target</code> bằng $0$.</li>
</ul>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Thuật toán Quay lui: Tổng tập con I */
static void backtrack(List<Integer> state, int target, int[] choices, int start, List<List<Integer>> res) {
    // Khi tổng tập con bằng target, ghi nhận nghiệm
    if (target == 0) {
        res.add(new ArrayList<>(state));
        return;
    }
    // Duyệt qua tất cả các lựa chọn
    // Cắt tỉa 2: bắt đầu duyệt từ start để tránh sinh ra tập con trùng lặp
    for (int i = start; i < choices.length; i++) {
        // Cắt tỉa 1: nếu tổng tập con vượt quá target, dừng vòng lặp ngay
        // Vì mảng đã được sắp xếp, các phần tử sau lớn hơn nên tổng tập con chắc chắn vượt target
        if (target - choices[i] < 0) {
            break;
        }
        // Thử: đưa ra lựa chọn, cập nhật target, start
        state.add(choices[i]);
        // Tiến hành vòng lựa chọn tiếp theo
        backtrack(state, target - choices[i], choices, i, res);
        // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
        state.remove(state.size() - 1);
    }
}

/* Giải bài toán Tổng tập con I */
static List<List<Integer>> subsetSumI(int[] nums, int target) {
    List<Integer> state = new ArrayList<>(); // Trạng thái (tập con)
    Arrays.sort(nums); // Sắp xếp nums
    int start = 0; // Điểm bắt đầu duyệt
    List<List<Integer>> res = new ArrayList<>(); // Danh sách kết quả (danh sách các tập con)
    backtrack(state, target, nums, start, res);
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func backtrack(state: inout [Int], target: Int, choices: [Int], start: Int, res: inout [[Int]]) {
    // When the subset sum equals target, record the solution
    if target == 0 {
        res.append(state)
        return
    }
    // Traverse all choices
    // Pruning 2: start traversing from start to avoid generating duplicate subsets
    // Pruning 3: start traversing from start to avoid repeatedly selecting the same element
    for i in choices.indices.dropFirst(start) {
        // Pruning 1: if the subset sum exceeds target, end the loop directly
        // This is because the array is sorted, and later elements are larger, so the subset sum will definitely exceed target
        if target - choices[i] &lt; 0 {
            break
        }
        // Pruning 4: if this element equals the left element, it means this search branch is duplicate, skip it directly
        if i &gt; start, choices[i] == choices[i - 1] {
            continue
        }
        // Attempt: make choice, update target, start
        state.append(choices[i])
        // Proceed to the next round of selection
        backtrack(state: &amp;state, target: target - choices[i], choices: choices, start: i + 1, res: &amp;res)
        // Backtrack: undo choice, restore to previous state
        state.removeLast()
    }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def backtrack(state, target, choices, start, res):
    """Thuật toán Quay lui: Tổng tập con I"""
    # Khi tổng tập con bằng target, ghi nhận nghiệm
    if target == 0:
        res.append(list(state))
        return
    # Duyệt qua tất cả các lựa chọn
    # Cắt tỉa 2: bắt đầu duyệt từ start để tránh sinh ra tập con trùng lặp
    for i in range(start, len(choices)):
        # Cắt tỉa 1: nếu tổng tập con vượt quá target, dừng vòng lặp ngay
        # Vì mảng đã được sắp xếp, các phần tử sau lớn hơn nên tổng tập con chắc chắn vượt target
        if target - choices[i] < 0:
            break
        # Thử: đưa ra lựa chọn, cập nhật target, start
        state.append(choices[i])
        # Tiến hành vòng lựa chọn tiếp theo
        backtrack(state, target - choices[i], choices, i, res)
        # Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
        state.pop()


def subset_sum_i(nums, target):
    """Giải bài toán Tổng tập con I"""
    state = []  # Trạng thái (tập con)
    nums.sort()  # Sắp xếp nums
    start = 0  # Điểm bắt đầu duyệt
    res = []  # Danh sách kết quả (danh sách các tập con)
    backtrack(state, target, nums, start, res)
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Thuật toán Quay lui: Tổng tập con I */
void backtrack(vector<int> &state, int target, vector<int> &choices, int start, vector<vector<int>> &res) {
    // Khi tổng tập con bằng target, ghi nhận nghiệm
    if (target == 0) {
        res.push_back(state);
        return;
    }
    // Duyệt qua tất cả các lựa chọn
    // Cắt tỉa 2: bắt đầu duyệt từ start để tránh sinh ra tập con trùng lặp
    for (int i = start; i < choices.size(); i++) {
        // Cắt tỉa 1: nếu tổng tập con vượt quá target, dừng vòng lặp ngay
        // Vì mảng đã được sắp xếp, các phần tử sau lớn hơn nên tổng tập con chắc chắn vượt target
        if (target - choices[i] < 0) {
            break;
        }
        // Thử: đưa ra lựa chọn, cập nhật target, start
        state.push_back(choices[i]);
        // Tiến hành vòng lựa chọn tiếp theo
        backtrack(state, target - choices[i], choices, i, res);
        // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
        state.pop_back();
    }
}

/* Giải bài toán Tổng tập con I */
vector<vector<int>> subsetSumI(vector<int> &nums, int target) {
    vector<int> state;              // Trạng thái (tập con)
    sort(nums.begin(), nums.end()); // Sắp xếp nums
    int start = 0;                  // Điểm bắt đầu duyệt
    vector<vector<int>> res;        // Danh sách kết quả (danh sách các tập con)
    backtrack(state, target, nums, start, res);
    return res;
}</code></pre></div></div></div>

<p>Hình dưới đây cho thấy toàn bộ quá trình Quay lui được sinh ra khi chạy đoạn mã trên với mảng $[3, 4, 5]$ và giá trị mục tiêu $9$.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/subset_sum_i.png" alt="Quá trình Quay lui Tổng tập con I" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>Mảng có phần tử trùng lặp</h2>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một mảng số nguyên dương <code>nums</code> và một số nguyên dương mục tiêu <code>target</code>, tìm tất cả các tổ hợp khả dĩ sao cho tổng các phần tử trong tổ hợp bằng <code>target</code>. <strong>Mảng đầu vào có thể chứa các phần tử trùng lặp, và mỗi phần tử chỉ có thể được chọn tối đa một lần</strong>. Trả về các tổ hợp này dưới dạng danh sách, danh sách không được chứa các tổ hợp trùng lặp.</p>
  </div>
</div>

<p>So với bài toán trước, <strong>mảng đầu vào trong bài toán này có thể chứa các phần tử trùng lặp</strong>, điều này gây ra một vấn đề mới. Ví dụ, cho mảng $[4, \\hat{4}, 5]$ và giá trị mục tiêu $9$, kết quả của mã hiện có là $[4, 5], [\\hat{4}, 5]$, chứa các tập con trùng lặp.</p>

<p><strong>Lý do gây ra sự trùng lặp này là các phần tử bằng nhau được chọn nhiều lần trong cùng một vòng</strong>. Trong hình dưới đây, vòng đầu tiên có ba lựa chọn, hai trong số đó là $4$, tạo ra hai nhánh tìm kiếm trùng lặp và xuất ra các tập con trùng lặp. Tương tự, hai số $4$ ở vòng thứ hai cũng sinh ra các tập con trùng lặp.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/subset_sum_ii_repeat.png" alt="Tập con trùng lặp do phần tử bằng nhau" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h3>Cắt tỉa các phần tử bằng nhau</h3>
<p>Để giải quyết vấn đề này, <strong>ta cần giới hạn các phần tử bằng nhau chỉ được chọn một lần trong mỗi vòng</strong>. Cách triển khai khá tinh tế: vì mảng đã được sắp xếp, các phần tử bằng nhau đứng liền kề nhau. Điều này có nghĩa là trong một vòng chọn nhất định, nếu phần tử hiện tại bằng phần tử bên trái nó, thì giá trị đó đã được chọn trong vòng này rồi, nên ta bỏ qua phần tử hiện tại luôn.</p>

<p>Đồng thời, <strong>bài toán này quy định mỗi phần tử mảng chỉ có thể được chọn một lần</strong>. May mắn thay, ta cũng có thể dùng biến <code>start</code> để thỏa mãn ràng buộc này: sau khi đưa ra lựa chọn $x_i$, đặt vòng tiếp theo bắt đầu duyệt từ chỉ mục $i + 1$ trở đi. Điều này vừa loại bỏ tập con trùng lặp, vừa tránh chọn một phần tử nhiều lần.</p>

<h3>Triển khai mã</h3>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Thuật toán Quay lui: Tổng tập con II */
static void backtrack(List<Integer> state, int target, int[] choices, int start, List<List<Integer>> res) {
    // Khi tổng tập con bằng target, ghi nhận nghiệm
    if (target == 0) {
        res.add(new ArrayList<>(state));
        return;
    }
    // Duyệt qua tất cả các lựa chọn
    // Cắt tỉa 2: bắt đầu duyệt từ start để tránh sinh ra tập con trùng lặp
    // Cắt tỉa 3: bắt đầu duyệt từ start để tránh chọn lại cùng một phần tử
    for (int i = start; i < choices.length; i++) {
        // Cắt tỉa 1: nếu tổng tập con vượt quá target, dừng vòng lặp ngay
        // Vì mảng đã được sắp xếp, các phần tử sau lớn hơn nên tổng tập con chắc chắn vượt target
        if (target - choices[i] < 0) {
            break;
        }
        // Cắt tỉa 4: nếu phần tử này bằng phần tử bên trái, nghĩa là nhánh tìm kiếm này bị trùng, bỏ qua ngay
        if (i > start && choices[i] == choices[i - 1]) {
            continue;
        }
        // Thử: đưa ra lựa chọn, cập nhật target, start
        state.add(choices[i]);
        // Tiến hành vòng lựa chọn tiếp theo
        backtrack(state, target - choices[i], choices, i + 1, res);
        // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
        state.remove(state.size() - 1);
    }
}

/* Giải bài toán Tổng tập con II */
static List<List<Integer>> subsetSumII(int[] nums, int target) {
    List<Integer> state = new ArrayList<>(); // Trạng thái (tập con)
    Arrays.sort(nums); // Sắp xếp nums
    int start = 0; // Điểm bắt đầu duyệt
    List<List<Integer>> res = new ArrayList<>(); // Danh sách kết quả (danh sách các tập con)
    backtrack(state, target, nums, start, res);
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func backtrack(state: inout [Int], target: Int, choices: [Int], start: Int, res: inout [[Int]]) {
    // When the subset sum equals target, record the solution
    if target == 0 {
        res.append(state)
        return
    }
    // Traverse all choices
    // Pruning 2: start traversing from start to avoid generating duplicate subsets
    // Pruning 3: start traversing from start to avoid repeatedly selecting the same element
    for i in choices.indices.dropFirst(start) {
        // Pruning 1: if the subset sum exceeds target, end the loop directly
        // This is because the array is sorted, and later elements are larger, so the subset sum will definitely exceed target
        if target - choices[i] &lt; 0 {
            break
        }
        // Pruning 4: if this element equals the left element, it means this search branch is duplicate, skip it directly
        if i &gt; start, choices[i] == choices[i - 1] {
            continue
        }
        // Attempt: make choice, update target, start
        state.append(choices[i])
        // Proceed to the next round of selection
        backtrack(state: &amp;state, target: target - choices[i], choices: choices, start: i + 1, res: &amp;res)
        // Backtrack: undo choice, restore to previous state
        state.removeLast()
    }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def backtrack(state, target, choices, start, res):
    """Thuật toán Quay lui: Tổng tập con II"""
    # Khi tổng tập con bằng target, ghi nhận nghiệm
    if target == 0:
        res.append(list(state))
        return
    # Duyệt qua tất cả các lựa chọn
    # Cắt tỉa 2: bắt đầu duyệt từ start để tránh sinh ra tập con trùng lặp
    # Cắt tỉa 3: bắt đầu duyệt từ start để tránh chọn lại cùng một phần tử
    for i in range(start, len(choices)):
        # Cắt tỉa 1: nếu tổng tập con vượt quá target, dừng vòng lặp ngay
        # Vì mảng đã được sắp xếp, các phần tử sau lớn hơn nên tổng tập con chắc chắn vượt target
        if target - choices[i] < 0:
            break
        # Cắt tỉa 4: nếu phần tử này bằng phần tử bên trái, nghĩa là nhánh tìm kiếm này bị trùng, bỏ qua ngay
        if i > start and choices[i] == choices[i - 1]:
            continue
        # Thử: đưa ra lựa chọn, cập nhật target, start
        state.append(choices[i])
        # Tiến hành vòng lựa chọn tiếp theo
        backtrack(state, target - choices[i], choices, i + 1, res)
        # Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
        state.pop()


def subset_sum_ii(nums, target):
    """Giải bài toán Tổng tập con II"""
    state = []  # Trạng thái (tập con)
    nums.sort()  # Sắp xếp nums
    start = 0  # Điểm bắt đầu duyệt
    res = []  # Danh sách kết quả (danh sách các tập con)
    backtrack(state, target, nums, start, res)
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Thuật toán Quay lui: Tổng tập con II */
void backtrack(vector<int> &state, int target, vector<int> &choices, int start, vector<vector<int>> &res) {
    // Khi tổng tập con bằng target, ghi nhận nghiệm
    if (target == 0) {
        res.push_back(state);
        return;
    }
    // Duyệt qua tất cả các lựa chọn
    // Cắt tỉa 2: bắt đầu duyệt từ start để tránh sinh ra tập con trùng lặp
    // Cắt tỉa 3: bắt đầu duyệt từ start để tránh chọn lại cùng một phần tử
    for (int i = start; i < choices.size(); i++) {
        // Cắt tỉa 1: nếu tổng tập con vượt quá target, dừng vòng lặp ngay
        // Vì mảng đã được sắp xếp, các phần tử sau lớn hơn nên tổng tập con chắc chắn vượt target
        if (target - choices[i] < 0) {
            break;
        }
        // Cắt tỉa 4: nếu phần tử này bằng phần tử bên trái, nghĩa là nhánh tìm kiếm này bị trùng, bỏ qua ngay
        if (i > start && choices[i] == choices[i - 1]) {
            continue;
        }
        // Thử: đưa ra lựa chọn, cập nhật target, start
        state.push_back(choices[i]);
        // Tiến hành vòng lựa chọn tiếp theo
        backtrack(state, target - choices[i], choices, i + 1, res);
        // Quay lui: hoàn tác lựa chọn, khôi phục trạng thái trước đó
        state.pop_back();
    }
}

/* Giải bài toán Tổng tập con II */
vector<vector<int>> subsetSumII(vector<int> &nums, int target) {
    vector<int> state;              // Trạng thái (tập con)
    sort(nums.begin(), nums.end()); // Sắp xếp nums
    int start = 0;                  // Điểm bắt đầu duyệt
    vector<vector<int>> res;        // Danh sách kết quả (danh sách các tập con)
    backtrack(state, target, nums, start, res);
    return res;
}</code></pre></div></div></div>

<div class="interactive-widget-wrapper" id="subset-sum-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'subset-sum-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'subset-sum-wrapper', 'tab-interactive'); initSubsetSumDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="color: var(--text-muted); padding: 12px;">Xem tab "Mô phỏng tương tác" để theo dõi từng bước Quay lui tìm tập con, cả trường hợp không trùng lặp <code>nums=[3,4,5], target=9</code> và có trùng lặp <code>nums=[4,4,5], target=9</code>.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div style="margin-bottom:10px;">
      <button class="control-btn" id="subset-sum-btn-i" onclick="setSubsetSumMode('i')">Không trùng lặp (I)</button>
      <button class="control-btn btn-secondary" id="subset-sum-btn-ii" onclick="setSubsetSumMode('ii')">Có trùng lặp (II)</button>
    </div>
    <div id="subset-sum-canvas" style="display:flex; gap:8px; margin:10px 0;"></div>
    <div id="subset-sum-state" style="margin:10px 0; font-family:var(--font-mono); font-size:13px;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; margin:10px 0;">
      <button class="control-btn" id="subset-sum-btn-autorun" onclick="autoRunSubsetSum()">▶ Auto Run</button>
      <button class="control-btn btn-secondary" id="subset-sum-btn-step" onclick="stepSubsetSum()">Bước tiếp theo ▶</button>
      <button class="control-btn btn-secondary" id="subset-sum-btn-pause" onclick="pauseRunSubsetSum()" disabled>⏸ Dừng</button>
      <button class="control-btn btn-secondary" id="subset-sum-btn-reset" onclick="initSubsetSumDemo()">↺ Reset</button>
    </div>
    <div style="margin:10px 0; font-size:13px; color:var(--text-muted);">
      Tốc độ: <input type="range" min="200" max="1500" value="600" step="100" oninput="setSubsetSumSpeed(this.value)" /> <span id="subset-sum-speed-label">600ms</span>
    </div>
    <div id="subset-sum-status" class="simulator-status" style="padding:10px; background:var(--bg-overlay); border-radius:6px;">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>

<p>Hình dưới đây cho thấy quá trình Quay lui cho mảng $[4, 4, 5]$ với giá trị mục tiêu $9$, bao gồm bốn loại thao tác cắt tỉa. Kết hợp hình minh họa với các chú thích trong mã để hiểu toàn bộ quá trình tìm kiếm và cách mỗi thao tác cắt tỉa hoạt động.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/subset_sum_ii.png" alt="Quá trình Quay lui Tổng tập con II" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

`,
    originalContent: `
# Subset-Sum Problem

## Without Duplicate Elements

!!! question

    Given a positive integer array \`nums\` and a target positive integer \`target\`, find all possible combinations where the sum of elements in the combination equals \`target\`. The given array has no duplicate elements, and each element can be selected multiple times. Return these combinations in list form, where the list should not contain duplicate combinations.

For example, given the set $\\{3, 4, 5\\}$ and target integer $9$, the solutions are $\\{3, 3, 3\\}, \\{4, 5\\}$. Note the following two points:

- Elements in the input set can be selected repeatedly without limit.
- Subsets do not distinguish element order; for example, $\\{4, 5\\}$ and $\\{5, 4\\}$ are the same subset.

### Using the Permutation Solution as a Reference

Similar to the permutation problem, we can view the process of generating subsets as the result of a series of choices and update the running sum during the selection process. When the sum equals \`target\`, we record the subset in the result list.

Unlike the permutation problem, **elements in this problem can be selected any number of times**, so we do not need to use a \`selected\` boolean list to track whether an element has already been selected. With a few small changes to the permutation code, we obtain an initial solution:

\`\`\`src
[file]{subset_sum_i_naive}-[class]{}-[func]{subset_sum_i_naive}
\`\`\`

Running the above code on array $[3, 4, 5]$ with target value $9$ produces $[3, 3, 3], [4, 5], [5, 4]$. **Although we successfully found all subsets that sum to $9$, there are duplicate subsets $[4, 5]$ and $[5, 4]$**.

This is because the search process distinguishes the order of selections, but subsets do not distinguish selection order. As shown in the figure below, selecting 4 first and then 5 versus selecting 5 first and then 4 are different branches, but they correspond to the same subset.

![Subset search and boundary pruning](subset_sum_problem.assets/subset_sum_i_naive.png)

To eliminate duplicate subsets, **one straightforward idea is to deduplicate the result list**. However, this approach is very inefficient for two reasons:

- When there are many array elements, especially when \`target\` is large, the search process generates many duplicate subsets.
- Comparing subsets (arrays) is very time-consuming, requiring sorting the arrays first, then comparing each element in them.

### Pruning Duplicate Subsets

**We consider deduplication through pruning during the search process**. Observing the figure below, duplicate subsets occur when array elements are selected in different orders, as in the following cases:

1. When the first and second rounds select $3$ and $4$ respectively, all subsets containing these two elements are generated, denoted as $[3, 4, \\dots]$.
2. Afterward, when the first round selects $4$, **the second round should skip $3$**, because the subset $[4, 3, \\dots]$ generated by this choice is an exact duplicate of the subset generated in step \`1.\`

In the search process, each level's choices are tried from left to right, so the rightmost branches are pruned more.

1. The first two rounds select $3$ and $5$, generating subset $[3, 5, \\dots]$.
2. The first two rounds select $4$ and $5$, generating subset $[4, 5, \\dots]$.
3. If the first round selects $5$, **the second round should skip $3$ and $4$**, because subsets $[5, 3, \\dots]$ and $[5, 4, \\dots]$ are exact duplicates of the subsets described in steps \`1.\` and \`2.\`

![Different selection orders leading to duplicate subsets](subset_sum_problem.assets/subset_sum_i_pruning.png)

In summary, given an input array $[x_1, x_2, \\dots, x_n]$, let the selection sequence in the search process be $[x_{i_1}, x_{i_2}, \\dots, x_{i_m}]$. This selection sequence must satisfy $i_1 \\leq i_2 \\leq \\dots \\leq i_m$; **any selection sequence that does not satisfy this condition will cause duplicates and should be pruned**.

### Code Implementation

To implement this pruning, we initialize a variable \`start\` to indicate the starting point of traversal. **After making choice $x_{i}$, set the next round to start traversal from index $i$**. This ensures that the selection sequence satisfies $i_1 \\leq i_2 \\leq \\dots \\leq i_m$, guaranteeing subset uniqueness.

In addition, we have made the following two optimizations to the code:

- Before starting the search, first sort the array \`nums\`. When traversing all choices, **end the loop immediately when the subset sum exceeds \`target\`**, because subsequent elements are larger, and their subset sums must exceed \`target\`.
- Omit the element sum variable \`total\` and **use subtraction on \`target\` to track the sum of elements**. Record the solution when \`target\` equals $0$.

\`\`\`src
[file]{subset_sum_i}-[class]{}-[func]{subset_sum_i}
\`\`\`

The figure below shows the complete backtracking process produced by running the above code on array $[3, 4, 5]$ with target value $9$.

![Subset-sum I backtracking process](subset_sum_problem.assets/subset_sum_i.png)

## With Duplicate Elements in Array

!!! question

    Given a positive integer array \`nums\` and a target positive integer \`target\`, find all possible combinations where the sum of elements in the combination equals \`target\`. **The given array may contain duplicate elements, and each element can be selected at most once**. Return these combinations in list form, where the list should not contain duplicate combinations.

Compared to the previous problem, **the input array in this problem may contain duplicate elements**, which introduces a new issue. For example, given array $[4, \\hat{4}, 5]$ and target value $9$, the output of the existing code is $[4, 5], [\\hat{4}, 5]$, which contains duplicate subsets.

**The reason for this duplication is that equal elements are selected multiple times in a certain round**. In the figure below, the first round has three choices, two of which are $4$, creating two duplicate search branches that output duplicate subsets. Similarly, the two $4$'s in the second round also produce duplicate subsets.

![Duplicate subsets caused by equal elements](subset_sum_problem.assets/subset_sum_ii_repeat.png)

### Pruning Equal Elements

To solve this problem, **we need to limit equal elements to be selected only once in each round**. The implementation is quite clever: since the array is already sorted, equal elements are adjacent. This means that in a given round of selection, if the current element equals the element to its left, then the same value has already been chosen in this round, so we skip the current element directly.

At the same time, **this problem specifies that each array element can only be selected once**. Fortunately, we can also use the variable \`start\` to satisfy this constraint: after making choice $x_{i}$, set the next round to start traversal from index $i + 1$ onwards. This both eliminates duplicate subsets and avoids selecting elements multiple times.

### Code Implementation

\`\`\`src
[file]{subset_sum_ii}-[class]{}-[func]{subset_sum_ii}
\`\`\`

The figure below shows the backtracking process for array $[4, 4, 5]$ with target value $9$, which includes four types of pruning operations. Combine the illustration with the code comments to understand the entire search process and how each pruning operation works.

![Subset-sum II backtracking process](subset_sum_problem.assets/subset_sum_ii.png)

`
  },

  'dsa-n-queens': {
    title: `13.4 Bài toán N-Hậu (N-Queens)`,
    summary: `Bài toán kinh điển về Constraint Satisfaction: đặt N quân hậu lên bàn cờ NxN theo từng hàng, cắt tỉa bằng 3 mảng theo dõi cột, đường chéo chính và đường chéo phụ.`,
    tags: ['dsa', 'backtracking', 'n-queens', 'constraint-satisfaction'],
    domain: 'Algorithms',
    module: `Chương 13: Quay lui`,
    prerequisites: ['dsa-subset-sum'],
    related: ['dsa-backtracking-summary'],
    updatedAt: '2026-07-19',
    readTime: '13 phút',
    content: `

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Theo luật cờ vua, một quân hậu có thể tấn công bất kỳ quân cờ nào cùng hàng, cùng cột hoặc cùng đường chéo với nó. Cho $n$ quân hậu và một bàn cờ $n \\times n$, tìm một cách sắp xếp sao cho không có hai quân hậu nào tấn công lẫn nhau.</p>
  </div>
</div>

<p>Như hình dưới đây, khi $n = 4$, có hai nghiệm có thể tìm thấy. Theo góc nhìn của thuật toán Quay lui, bàn cờ $n \\times n$ có $n^2$ ô, cung cấp tất cả các lựa chọn <code>choices</code>. Trong quá trình đặt hậu lần lượt, trạng thái bàn cờ liên tục thay đổi, và bàn cờ tại mỗi thời điểm đại diện cho trạng thái <code>state</code>.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/solution_4_queens.png" alt="Nghiệm bài toán 4 hậu" style="max-width: 80%; margin: 0 auto; display: block; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Hình dưới đây minh họa ba ràng buộc của bài toán này: <strong>nhiều quân hậu không thể ở cùng hàng, cùng cột, hoặc cùng đường chéo</strong>. Cần lưu ý rằng đường chéo được chia thành hai loại: đường chéo chính <code>\\</code> và đường chéo phụ <code>/</code>.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/n_queens_constraints.png" alt="Ràng buộc bài toán N-Hậu" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h3>Chiến lược Đặt theo từng hàng</h3>
<p>Vì số lượng quân hậu và số hàng trên bàn cờ đều là $n$, ta có thể dễ dàng rút ra kết luận: <strong>mỗi hàng của bàn cờ chỉ cho phép đặt một và chỉ một quân hậu</strong>.</p>

<p>Điều này có nghĩa là ta có thể áp dụng chiến lược đặt theo từng hàng: bắt đầu từ hàng đầu tiên, đặt một quân hậu vào mỗi hàng cho đến khi hoàn thành hàng cuối cùng.</p>

<p>Hình dưới đây cho thấy quá trình đặt theo từng hàng của bài toán 4-hậu. Do giới hạn không gian, hình chỉ khai triển một nhánh tìm kiếm của hàng đầu tiên, và tất cả các phương án vi phạm ràng buộc cột hoặc đường chéo đều bị cắt tỉa.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/n_queens_placing.png" alt="Chiến lược đặt theo từng hàng" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Về bản chất, <strong>chiến lược đặt theo từng hàng đóng vai trò cắt tỉa</strong>, vì nó tránh tất cả các nhánh tìm kiếm mà nhiều quân hậu xuất hiện trên cùng một hàng.</p>

<h3>Cắt tỉa cột và đường chéo</h3>
<p>Để thỏa mãn ràng buộc cột, ta có thể dùng một mảng boolean <code>cols</code> có độ dài $n$ để ghi lại xem mỗi cột có quân hậu hay chưa. Trước mỗi quyết định đặt hậu, ta dùng <code>cols</code> để cắt tỉa các cột đã có hậu, và cập nhật động trạng thái của <code>cols</code> trong quá trình quay lui.</p>

<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Lưu ý gốc tọa độ của ma trận nằm ở góc trên bên trái, chỉ số hàng tăng dần từ trên xuống dưới, và chỉ số cột tăng dần từ trái sang phải.</p>
  </div>
</div>

<p>Vậy làm sao để xử lý ràng buộc đường chéo? Xét một ô trên bàn cờ có chỉ số hàng và cột $(row, col)$. Nếu ta chọn một đường chéo chính cụ thể trong ma trận, ta thấy rằng tất cả các ô trên đường chéo đó có cùng hiệu số giữa chỉ số hàng và chỉ số cột, <strong>nghĩa là $row - col$ là một hằng số đối với mọi ô trên đường chéo chính</strong>.</p>

<p>Nói cách khác, nếu hai ô thỏa mãn $row_1 - col_1 = row_2 - col_2$, chúng chắc chắn nằm trên cùng một đường chéo chính. Sử dụng quy luật này, ta có thể dùng mảng <code>diags1</code> như minh họa trong hình dưới đây để ghi lại xem có quân hậu trên mỗi đường chéo chính hay không.</p>

<p>Tương tự, <strong>đối với tất cả các ô trên một đường chéo phụ, tổng $row + col$ là một hằng số</strong>. Ta cũng có thể dùng mảng <code>diags2</code> để xử lý ràng buộc đường chéo phụ.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/n_queens_cols_diagonals.png" alt="Xử lý ràng buộc cột và đường chéo" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h3>Triển khai mã</h3>
<p>Lưu ý rằng trong một ma trận vuông $n \\times n$, phạm vi của $row - col$ là $[-n + 1, n - 1]$, và phạm vi của $row + col$ là $[0, 2n - 2]$. Do đó, số lượng cả đường chéo chính và đường chéo phụ đều là $2n - 1$, nghĩa là độ dài của cả hai mảng <code>diags1</code> và <code>diags2</code> đều là $2n - 1$.</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Thuật toán Quay lui: N-Hậu */
public static void backtrack(int row, int n, List<List<String>> state, List<List<List<String>>> res,
        boolean[] cols, boolean[] diags1, boolean[] diags2) {
    // Khi đã đặt xong tất cả các hàng, ghi nhận nghiệm
    if (row == n) {
        List<List<String>> copyState = new ArrayList<>();
        for (List<String> sRow : state) {
            copyState.add(new ArrayList<>(sRow));
        }
        res.add(copyState);
        return;
    }
    // Duyệt qua tất cả các cột
    for (int col = 0; col < n; col++) {
        // Tính đường chéo chính và đường chéo phụ tương ứng với ô này
        int diag1 = row - col + n - 1;
        int diag2 = row + col;
        // Cắt tỉa: không cho phép hậu tồn tại trên cột, đường chéo chính và đường chéo phụ của ô này
        if (!cols[col] && !diags1[diag1] && !diags2[diag2]) {
            // Thử: đặt hậu vào ô này
            state.get(row).set(col, "Q");
            cols[col] = diags1[diag1] = diags2[diag2] = true;
            // Đặt hàng tiếp theo
            backtrack(row + 1, n, state, res, cols, diags1, diags2);
            // Quay lui: khôi phục ô này về ô trống
            state.get(row).set(col, "#");
            cols[col] = diags1[diag1] = diags2[diag2] = false;
        }
    }
}

/* Giải bài toán N-Hậu */
public static List<List<List<String>>> nQueens(int n) {
    // Khởi tạo bàn cờ n*n, trong đó 'Q' đại diện cho quân hậu, '#' đại diện cho ô trống
    List<List<String>> state = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        List<String> row = new ArrayList<>();
        for (int j = 0; j < n; j++) {
            row.add("#");
        }
        state.add(row);
    }
    boolean[] cols = new boolean[n]; // Ghi nhận cột này đã có hậu hay chưa
    boolean[] diags1 = new boolean[2 * n - 1]; // Ghi nhận đường chéo chính này đã có hậu hay chưa
    boolean[] diags2 = new boolean[2 * n - 1]; // Ghi nhận đường chéo phụ này đã có hậu hay chưa
    List<List<List<String>>> res = new ArrayList<>();

    backtrack(0, n, state, res, cols, diags1, diags2);

    return res;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func backtrack(state: inout [Int], target: Int, choices: [Int], start: Int, res: inout [[Int]]) {
    // When the subset sum equals target, record the solution
    if target == 0 {
        res.append(state)
        return
    }
    // Traverse all choices
    // Pruning 2: start traversing from start to avoid generating duplicate subsets
    // Pruning 3: start traversing from start to avoid repeatedly selecting the same element
    for i in choices.indices.dropFirst(start) {
        // Pruning 1: if the subset sum exceeds target, end the loop directly
        // This is because the array is sorted, and later elements are larger, so the subset sum will definitely exceed target
        if target - choices[i] &lt; 0 {
            break
        }
        // Pruning 4: if this element equals the left element, it means this search branch is duplicate, skip it directly
        if i &gt; start, choices[i] == choices[i - 1] {
            continue
        }
        // Attempt: make choice, update target, start
        state.append(choices[i])
        // Proceed to the next round of selection
        backtrack(state: &amp;state, target: target - choices[i], choices: choices, start: i + 1, res: &amp;res)
        // Backtrack: undo choice, restore to previous state
        state.removeLast()
    }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def backtrack(row, n, state, res, cols, diags1, diags2):
    """Thuật toán Quay lui: N-Hậu"""
    # Khi đã đặt xong tất cả các hàng, ghi nhận nghiệm
    if row == n:
        res.append([list(row) for row in state])
        return
    # Duyệt qua tất cả các cột
    for col in range(n):
        # Tính đường chéo chính và đường chéo phụ tương ứng với ô này
        diag1 = row - col + n - 1
        diag2 = row + col
        # Cắt tỉa: không cho phép hậu tồn tại trên cột, đường chéo chính và đường chéo phụ của ô này
        if not cols[col] and not diags1[diag1] and not diags2[diag2]:
            # Thử: đặt hậu vào ô này
            state[row][col] = "Q"
            cols[col] = diags1[diag1] = diags2[diag2] = True
            # Đặt hàng tiếp theo
            backtrack(row + 1, n, state, res, cols, diags1, diags2)
            # Quay lui: khôi phục ô này về ô trống
            state[row][col] = "#"
            cols[col] = diags1[diag1] = diags2[diag2] = False


def n_queens(n):
    """Giải bài toán N-Hậu"""
    # Khởi tạo bàn cờ n*n, trong đó 'Q' đại diện cho quân hậu, '#' đại diện cho ô trống
    state = [["#" for _ in range(n)] for _ in range(n)]
    cols = [False] * n  # Ghi nhận cột này đã có hậu hay chưa
    diags1 = [False] * (2 * n - 1)  # Ghi nhận đường chéo chính này đã có hậu hay chưa
    diags2 = [False] * (2 * n - 1)  # Ghi nhận đường chéo phụ này đã có hậu hay chưa
    res = []
    backtrack(0, n, state, res, cols, diags1, diags2)
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Thuật toán Quay lui: N-Hậu */
void backtrack(int row, int n, vector<vector<string>> &state, vector<vector<vector<string>>> &res, vector<bool> &cols,
               vector<bool> &diags1, vector<bool> &diags2) {
    // Khi đã đặt xong tất cả các hàng, ghi nhận nghiệm
    if (row == n) {
        res.push_back(state);
        return;
    }
    // Duyệt qua tất cả các cột
    for (int col = 0; col < n; col++) {
        // Tính đường chéo chính và đường chéo phụ tương ứng với ô này
        int diag1 = row - col + n - 1;
        int diag2 = row + col;
        // Cắt tỉa: không cho phép hậu tồn tại trên cột, đường chéo chính và đường chéo phụ của ô này
        if (!cols[col] && !diags1[diag1] && !diags2[diag2]) {
            // Thử: đặt hậu vào ô này
            state[row][col] = "Q";
            cols[col] = diags1[diag1] = diags2[diag2] = true;
            // Đặt hàng tiếp theo
            backtrack(row + 1, n, state, res, cols, diags1, diags2);
            // Quay lui: khôi phục ô này về ô trống
            state[row][col] = "#";
            cols[col] = diags1[diag1] = diags2[diag2] = false;
        }
    }
}

/* Giải bài toán N-Hậu */
vector<vector<vector<string>>> nQueens(int n) {
    // Khởi tạo bàn cờ n*n, trong đó 'Q' đại diện cho quân hậu, '#' đại diện cho ô trống
    vector<vector<string>> state(n, vector<string>(n, "#"));
    vector<bool> cols(n, false);           // Ghi nhận cột này đã có hậu hay chưa
    vector<bool> diags1(2 * n - 1, false); // Ghi nhận đường chéo chính này đã có hậu hay chưa
    vector<bool> diags2(2 * n - 1, false); // Ghi nhận đường chéo phụ này đã có hậu hay chưa
    vector<vector<vector<string>>> res;

    backtrack(0, n, state, res, cols, diags1, diags2);

    return res;
}</code></pre></div></div></div>

<div class="interactive-widget-wrapper" id="n-queens-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'n-queens-wrapper', 'tab-static')">📸 Minh họa tĩnh</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'n-queens-wrapper', 'tab-interactive'); initNQueensDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="color: var(--text-muted); padding: 12px;">Xem tab "Mô phỏng tương tác" để theo dõi từng bước Quay lui đặt 4 quân hậu lên bàn cờ 4×4 (Thử / Cắt tỉa / Quay lui / Ghi nhận nghiệm).</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="n-queens-canvas" style="display:inline-block; margin:10px 0;"></div>
    <div id="n-queens-state" style="margin:10px 0; font-family:var(--font-mono); font-size:13px;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; margin:10px 0;">
      <button class="control-btn" id="n-queens-btn-autorun" onclick="autoRunNQueens()">▶ Auto Run</button>
      <button class="control-btn btn-secondary" id="n-queens-btn-step" onclick="stepNQueens()">Bước tiếp theo ▶</button>
      <button class="control-btn btn-secondary" id="n-queens-btn-pause" onclick="pauseRunNQueens()" disabled>⏸ Dừng</button>
      <button class="control-btn btn-secondary" id="n-queens-btn-reset" onclick="initNQueensDemo()">↺ Reset</button>
    </div>
    <div style="margin:10px 0; font-size:13px; color:var(--text-muted);">
      Tốc độ: <input type="range" min="100" max="1200" value="300" step="100" oninput="setNQueensSpeed(this.value)" /> <span id="n-queens-speed-label">300ms</span>
    </div>
    <div id="n-queens-status" class="simulator-status" style="padding:10px; background:var(--bg-overlay); border-radius:6px;">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>

<p>Đặt $n$ quân hậu theo từng hàng, xét ràng buộc cột, từ hàng đầu tiên đến hàng cuối cùng có $n$, $n-1$, $\\dots$, $2$, $1$ lựa chọn, tốn $O(n!)$ thời gian. Khi ghi nhận một nghiệm, cần sao chép ma trận <code>state</code> và thêm vào <code>res</code>, thao tác sao chép tốn $O(n^2)$ thời gian. Do đó, <strong>độ phức tạp thời gian tổng thể là $O(n! \\cdot n^2)$</strong>. Trong thực tế, cắt tỉa dựa trên ràng buộc đường chéo cũng có thể giảm đáng kể không gian tìm kiếm, vì vậy hiệu quả tìm kiếm thường tốt hơn độ phức tạp thời gian đã nêu trên.</p>

<p>Mảng <code>state</code> tốn $O(n^2)$ không gian, và các mảng <code>cols</code>, <code>diags1</code>, <code>diags2</code> mỗi mảng tốn $O(n)$ không gian. Độ sâu đệ quy tối đa là $n$, tốn $O(n)$ không gian ngăn xếp lệnh gọi. Do đó, <strong>độ phức tạp không gian là $O(n^2)$</strong>.</p>

`,
    originalContent: `
# N-Queens Problem

!!! question

    According to the rules of chess, a queen can attack any piece in the same row, column, or diagonal. Given $n$ queens and an $n \\times n$ chessboard, find an arrangement such that no two queens can attack each other.

As shown in the figure below, when $n = 4$, there are two solutions that can be found. From the perspective of the backtracking algorithm, an $n \\times n$ chessboard has $n^2$ squares, which provide all the choices \`choices\`. During the process of placing queens one by one, the chessboard state changes continuously, and the chessboard at each moment represents the state \`state\`.

![Solution to the 4-queens problem](n_queens_problem.assets/solution_4_queens.png)

The figure below illustrates the three constraints of this problem: **multiple queens cannot be in the same row, the same column, or on the same diagonal**. It is worth noting that diagonals are divided into two types: the main diagonal \`\\\` and the anti-diagonal \`/\`.

![Constraints of the n-queens problem](n_queens_problem.assets/n_queens_constraints.png)

### Row-By-Row Placement Strategy

Since both the number of queens and the number of rows on the chessboard are $n$, we can easily derive a conclusion: **each row of the chessboard allows one and only one queen to be placed**.

This means we can adopt a row-by-row placement strategy: starting from the first row, place one queen in each row until the last row is completed.

The figure below shows the row-by-row placement process for the 4-queens problem. Due to space limitations, the figure only expands one search branch of the first row, and all schemes that violate the column or diagonal constraints are pruned.

![Row-by-row placement strategy](n_queens_problem.assets/n_queens_placing.png)

Essentially, **the row-by-row placement strategy serves a pruning function**, as it avoids all search branches where multiple queens appear in the same row.

### Column and Diagonal Pruning

To satisfy the column constraint, we can use a boolean array \`cols\` of length $n$ to record whether each column has a queen. Before each placement decision, we use \`cols\` to prune columns that already have queens, and dynamically update the state of \`cols\` during backtracking.

!!! tip

    Please note that the origin of the matrix is located in the upper-left corner, where the row index increases from top to bottom, and the column index increases from left to right.

So how do we handle diagonal constraints? Consider a square on the chessboard with row and column indices $(row, col)$. If we select a specific main diagonal in the matrix, we find that all squares on that diagonal have the same difference between their row and column indices, **meaning that $row - col$ is a constant value for all squares on the main diagonal**.

In other words, if two squares satisfy $row_1 - col_1 = row_2 - col_2$, they must be on the same main diagonal. Using this pattern, we can use the array \`diags1\` shown in the figure below to record whether there is a queen on each main diagonal.

Similarly, **for all squares on an anti-diagonal, the sum $row + col$ is a constant value**. We can likewise use the array \`diags2\` to handle anti-diagonal constraints.

![Handling column and diagonal constraints](n_queens_problem.assets/n_queens_cols_diagonals.png)

### Code Implementation

Please note that in an $n \\times n$ square matrix, the range of $row - col$ is $[-n + 1, n - 1]$, and the range of $row + col$ is $[0, 2n - 2]$. Therefore, the number of both main diagonals and anti-diagonals is $2n - 1$, meaning the length of both arrays \`diags1\` and \`diags2\` is $2n - 1$.

\`\`\`src
[file]{n_queens}-[class]{}-[func]{n_queens}
\`\`\`

Placing $n$ queens row by row, considering the column constraint, from the first row to the last row there are $n$, $n-1$, $\\dots$, $2$, $1$ choices, using $O(n!)$ time. When recording a solution, it is necessary to copy the matrix \`state\` and add it to \`res\`, and the copy operation uses $O(n^2)$ time. Therefore, **the overall time complexity is $O(n! \\cdot n^2)$**. In practice, pruning based on diagonal constraints can also significantly reduce the search space, so the search efficiency is often better than the time complexity mentioned above.

The array \`state\` uses $O(n^2)$ space, and the arrays \`cols\`, \`diags1\`, and \`diags2\` each use $O(n)$ space. The maximum recursion depth is $n$, using $O(n)$ stack frame space. Therefore, **the space complexity is $O(n^2)$**.

`
  },

  'dsa-backtracking-summary': {
    title: `Tóm tắt & Hỏi đáp`,
    summary: `Ôn tập lại các nguyên tắc của Quay lui: thử/quay lui/cắt tỉa, phân biệt với Đệ quy thông thường, và nhận diện các bài toán tìm kiếm/thỏa mãn ràng buộc/tối ưu hóa tổ hợp thường gặp.`,
    tags: ['dsa', 'backtracking', 'summary'],
    domain: 'Algorithms',
    module: `Chương 13: Quay lui`,
    prerequisites: ['dsa-n-queens'],
    related: ['dsa-dp-index'],
    updatedAt: '2026-07-19',
    readTime: '4 phút',
    content: `

<h2>Điểm lại kiến thức chính</h2>
<ul>
  <li>Thuật toán Quay lui về bản chất là một phương pháp tìm kiếm cạn kiệt. Nó tìm các nghiệm thỏa mãn điều kiện nhất định bằng cách duyệt theo chiều sâu không gian nghiệm. Trong quá trình tìm kiếm, khi tìm thấy một nghiệm thỏa mãn điều kiện, nó được ghi nhận. Việc tìm kiếm kết thúc sau khi tìm được tất cả các nghiệm hoặc khi việc duyệt đã hoàn tất.</li>
  <li>Quá trình tìm kiếm của thuật toán Quay lui gồm hai phần: thử và quay lui. Nó thử các lựa chọn khác nhau thông qua tìm kiếm theo chiều sâu. Khi gặp tình huống vi phạm ràng buộc, nó hoàn tác lựa chọn trước đó, quay về trạng thái trước đó, và tiếp tục khám phá các lựa chọn khác. Thử và quay lui là các thao tác theo hướng ngược nhau.</li>
  <li>Các bài toán Quay lui thường chứa nhiều ràng buộc, có thể được tận dụng để triển khai các thao tác cắt tỉa. Cắt tỉa có thể chấm dứt sớm các nhánh tìm kiếm không cần thiết, cải thiện đáng kể hiệu quả tìm kiếm.</li>
  <li>Thuật toán Quay lui chủ yếu được dùng để giải các bài toán tìm kiếm và bài toán thỏa mãn ràng buộc. Mặc dù các bài toán tối ưu hóa tổ hợp cũng có thể được giải bằng Quay lui, nhưng thường có các giải pháp hiệu quả hoặc hiệu năng tốt hơn.</li>
  <li>Bài toán Hoán vị nhằm tìm tất cả các hoán vị khả dĩ của các phần tử trong một tập hợp cho trước. Ta dùng một mảng để ghi lại xem mỗi phần tử đã được chọn hay chưa, từ đó cắt tỉa các nhánh tìm kiếm cố chọn lại cùng một phần tử, đảm bảo mỗi phần tử chỉ được chọn đúng một lần.</li>
  <li>Trong bài toán Hoán vị, nếu tập hợp chứa các phần tử trùng lặp, kết quả cuối cùng sẽ chứa các hoán vị trùng lặp. Ta cần áp đặt một ràng buộc sao cho các phần tử bằng nhau chỉ có thể được chọn một lần trong mỗi vòng, điều này thường được thực hiện bằng một hash set.</li>
  <li>Bài toán Tổng tập con nhằm tìm tất cả các tập con của một tập hợp cho trước có tổng bằng một giá trị mục tiêu. Vì tập hợp không có thứ tự nhưng quá trình tìm kiếm xuất ra kết quả theo mọi thứ tự, nên sinh ra các tập con trùng lặp. Ta sắp xếp dữ liệu trước khi quay lui và dùng một biến để chỉ điểm bắt đầu duyệt của mỗi vòng, từ đó cắt tỉa các nhánh tìm kiếm sinh ra tập con trùng lặp.</li>
  <li>Đối với bài toán Tổng tập con, các phần tử bằng nhau trong mảng sinh ra các tập con trùng lặp. Ta tận dụng tiền đề mảng đã được sắp xếp bằng cách kiểm tra xem các phần tử liền kề có bằng nhau không để triển khai cắt tỉa, đảm bảo các phần tử bằng nhau chỉ được chọn một lần trong mỗi vòng.</li>
  <li>Bài toán $n$ hậu nhằm tìm cách đặt $n$ quân hậu lên bàn cờ $n \\times n$ sao cho không có hai quân hậu nào tấn công lẫn nhau. Các ràng buộc của bài toán này bao gồm ràng buộc hàng, ràng buộc cột, và ràng buộc đường chéo chính và phụ. Để thỏa mãn ràng buộc hàng, ta áp dụng chiến lược đặt theo từng hàng, đảm bảo chính xác một quân hậu được đặt trong mỗi hàng.</li>
  <li>Việc xử lý ràng buộc cột và ràng buộc đường chéo là tương tự nhau. Đối với ràng buộc cột, ta dùng một mảng để ghi lại xem mỗi cột có quân hậu hay không, từ đó cho biết một ô được chọn có hợp lệ hay không. Đối với ràng buộc đường chéo, ta dùng hai mảng để ghi lại riêng biệt xem có quân hậu tồn tại trên mỗi đường chéo chính hoặc phụ hay không. Thách thức nằm ở việc tìm ra quy luật chỉ số hàng-cột đặc trưng cho các ô nằm trên cùng một đường chéo chính (phụ).</li>
</ul>

<h2>Hỏi &amp; Đáp</h2>
<p><strong>Hỏi</strong>: Làm thế nào để hiểu mối quan hệ giữa Quay lui và Đệ quy?</p>
<p>Nhìn chung, Quay lui là một chiến lược thuật toán, còn đệ quy nên được xem như một công cụ.</p>
<ul>
  <li>Quay lui thường được triển khai bằng đệ quy. Tuy nhiên, Quay lui chỉ là một ứng dụng của đệ quy, cụ thể là việc sử dụng nó trong các bài toán tìm kiếm.</li>
  <li>Cấu trúc của đệ quy phản ánh một mô hình giải quyết vấn đề dựa trên việc phân rã bài toán thành các bài toán con, và nó thường được dùng trong Chia để trị, Quay lui, và Quy hoạch động (đệ quy có nhớ).</li>
</ul>

`,
    originalContent: `
# Summary

### Key Review

- The backtracking algorithm is fundamentally an exhaustive search method. It finds solutions that meet specified conditions by performing a depth-first traversal of the solution space. During the search process, when a solution satisfying the conditions is found, it is recorded. The search ends either after finding all solutions or when the traversal is complete.
- The backtracking algorithm search process consists of two parts: attempting and backtracking. It tries various choices through depth-first search. When encountering situations that violate constraints, it reverts the previous choice, returns to the previous state, and continues exploring other options. Attempting and backtracking are operations in opposite directions.
- Backtracking problems typically contain multiple constraints, which can be utilized to implement pruning operations. Pruning can terminate unnecessary search branches early, significantly improving search efficiency.
- The backtracking algorithm is primarily used to solve search problems and constraint satisfaction problems. While combinatorial optimization problems can be solved with backtracking, there are often more efficient or better-performing solutions available.
- The permutation problem aims to find all possible permutations of elements in a given set. We use an array to record whether each element has been selected, thereby pruning search branches that attempt to select the same element repeatedly, ensuring each element is selected exactly once.
- In the permutation problem, if the set contains duplicate elements, the final result will contain duplicate permutations. We need to impose a constraint so that equal elements can only be selected once per round, which is typically achieved using a hash set.
- The subset-sum problem aims to find all subsets of a given set that sum to a target value. Since the set is unordered but the search process outputs results in all orders, duplicate subsets are generated. We sort the data before backtracking and use a variable to indicate the starting point of each round's traversal, thereby pruning search branches that generate duplicate subsets.
- For the subset-sum problem, equal elements in the array produce duplicate subsets. We leverage the precondition that the array is sorted by checking whether adjacent elements are equal to implement pruning, ensuring that equal elements can only be selected once per round.
- The $n$ queens problem aims to find placements of $n$ queens on an $n \\times n$ chessboard such that no two queens can attack each other. The constraints of this problem include row constraints, column constraints, and main and anti-diagonal constraints. To satisfy row constraints, we adopt a row-by-row placement strategy, ensuring exactly one queen is placed in each row.
- The handling of column constraints and diagonal constraints is similar. For column constraints, we use an array to record whether each column has a queen, thereby indicating whether a selected cell is valid. For diagonal constraints, we use two arrays to separately record whether queens exist on each main or anti-diagonal. The challenge lies in finding the row-column index pattern that characterizes cells on the same main (anti-)diagonal.

### Q & A

**Q**: How can we understand the relationship between backtracking and recursion?

Overall, backtracking is an algorithmic strategy, while recursion is better viewed as a tool.

- Backtracking is typically implemented with recursion. However, backtracking is only one application of recursion, specifically its use in search problems.
- The structure of recursion reflects a problem-solving paradigm based on decomposing a problem into subproblems, and it is commonly used in divide-and-conquer, backtracking, and dynamic programming (memoized recursion).

`
  }

});
