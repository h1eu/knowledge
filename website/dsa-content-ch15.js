/* ============================================================
   Knowledge OS — DSA Module: Chương 15 - Tham lam (Greedy Algorithm)
   Nguồn: hello-algo (chapter_greedy) — dịch đầy đủ, đối chiếu nguyên văn.
   ============================================================ */

Object.assign(DSA_CONTENT, {

  'dsa-greedy-index': {
    title: 'Tham lam (Greedy)',
    summary: 'Giới thiệu chương Thuật toán Tham lam (Greedy Algorithm): liên tục đưa ra lựa chọn tốt nhất ở hiện tại, hướng đến lời giải tối ưu toàn cục.',
    tags: ['dsa', 'greedy', 'algorithm-design'],
    domain: 'Algorithms',
    module: 'Chương 15: Tham lam',
    prerequisites: ['dsa-dp-summary'],
    related: ['dsa-greedy-intro'],
    updatedAt: '2026-07-19',
    readTime: '2 phút',
    content: `

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/chapter_greedy.jpg" alt="Tham lam" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<div class="callout callout-note">
  <span class="callout-icon">🌻</span>
  <div class="callout-body">
    <p>Hoa hướng dương luôn quay về phía mặt trời, không ngừng vươn tới sự sinh trưởng trọn vẹn nhất.</p>
    <p>Thông qua những lựa chọn đơn giản liên tiếp, chiến lược tham lam dần dần dẫn đến lời giải tối ưu.</p>
  </div>
</div>

`,
    originalContent: `
# Greedy

![Greedy](../assets/covers/chapter_greedy.jpg)

!!! abstract

    Sunflowers turn toward the sun, always seeking the fullest growth possible.

    Through successive simple choices, greedy strategies gradually lead to the optimal solution.

`
  },

  'dsa-greedy-intro': {
    title: '15.1 Thuật toán Tham lam',
    summary: 'Thuật toán Tham lam là gì? Khác biệt với Quy hoạch động, ưu và hạn chế, tính chất lựa chọn tham lam, các bước giải và các bài toán điển hình — qua ví dụ Đổi tiền (Coin Change).',
    tags: ['dsa', 'greedy', 'algorithm-design', 'optimization'],
    domain: 'Algorithms',
    module: 'Chương 15: Tham lam',
    prerequisites: ['dsa-greedy-index'],
    related: ['dsa-fractional-knapsack'],
    updatedAt: '2026-07-19',
    readTime: '14 phút',
    content: `

<h2>15.1.1 Thuật toán Tham lam là gì?</h2>
<p><u>Thuật toán Tham lam (Greedy Algorithm)</u> là một cách tiếp cận phổ biến để giải các bài toán tối ưu hóa. Ý tưởng cơ bản là chọn phương án có vẻ tốt nhất ở mỗi giai đoạn ra quyết định, tức là tham lam đưa ra các quyết định tối ưu cục bộ với hy vọng đạt được lời giải tối ưu toàn cục. Thuật toán tham lam đơn giản và hiệu quả, được sử dụng rộng rãi trong nhiều bài toán thực tế.</p>
<p>Thuật toán tham lam và quy hoạch động đều thường được dùng để giải các bài toán tối ưu hóa. Chúng có một số điểm tương đồng, chẳng hạn cả hai đều dựa vào tính chất cấu trúc con tối ưu, nhưng cách hoạt động lại khác nhau.</p>
<ul>
  <li>Quy hoạch động xem xét toàn bộ các quyết định trong quá khứ khi đưa ra quyết định hiện tại, và dùng lời giải của các bài toán con trong quá khứ để xây dựng lời giải cho bài toán con hiện tại.</li>
  <li>Thuật toán tham lam không xem xét các quyết định trong quá khứ, mà liên tục đưa ra các lựa chọn tham lam hướng về phía trước, liên tục thu nhỏ kích thước bài toán cho đến khi giải quyết xong.</li>
</ul>
<p>Trước tiên, chúng ta sẽ tìm hiểu cách hoạt động của thuật toán tham lam thông qua bài toán ví dụ "đổi tiền". Bài toán này đã được giới thiệu trong chương "Bài toán Cái túi Không giới hạn", vì vậy hẳn bạn đã quen thuộc với nó.</p>

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho $n$ loại tiền xu, trong đó mệnh giá của loại thứ $i$ là $coins[i - 1]$, một số tiền mục tiêu $amt$, và số lượng đồng xu mỗi loại là không giới hạn, hỏi cần tối thiểu bao nhiêu đồng xu để tạo thành số tiền mục tiêu? Nếu không thể tạo thành số tiền mục tiêu, trả về $-1$.</p>
  </div>
</div>

<p>Chiến lược tham lam cho bài toán này được minh họa trong hình dưới đây. Với một số tiền mục tiêu cho trước, <strong>ta tham lam chọn đồng xu không vượt quá số tiền đó và gần với nó nhất</strong>, lặp lại bước này cho đến khi tạo đủ số tiền mục tiêu.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/coin_change_greedy_strategy.png" alt="Chiến lược tham lam cho bài toán đổi tiền" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Đoạn mã triển khai như sau:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Đổi tiền: Thuật toán Tham lam */
static int coinChangeGreedy(int[] coins, int amt) {
    // Giả sử coins đã được sắp xếp
    int i = coins.length - 1;
    int count = 0;
    // Lặp đưa ra lựa chọn tham lam cho đến khi hết số tiền còn lại
    while (amt &gt; 0) {
        // Tìm đồng xu nhỏ hơn và gần nhất với số tiền còn lại
        while (i &gt; 0 &amp;&amp; coins[i] &gt; amt) {
            i--;
        }
        // Chọn coins[i]
        amt -= coins[i];
        count++;
    }
    // Nếu không tìm được lời giải khả thi, trả về -1
    return amt == 0 ? count : -1;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func coinChangeGreedy(coins: [Int], amt: Int) -&gt; Int {
    // Assume coins list is sorted
    var i = coins.count - 1
    var count = 0
    var amt = amt
    // Loop to make greedy choices until no remaining amount
    while amt &gt; 0 {
        // Find the coin that is less than and closest to the remaining amount
        while i &gt; 0 &amp;&amp; coins[i] &gt; amt {
            i -= 1
        }
        // Choose coins[i]
        amt -= coins[i]
        count += 1
    }
    // If no feasible solution is found, return -1
    return amt == 0 ? count : -1
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int coinChangeGreedy(List&lt;int&gt; coins, int amt) {
  // Assume coins list is sorted
  int i = coins.length - 1;
  int count = 0;
  // Loop to make greedy choices until no remaining amount
  while (amt &gt; 0) {
    // Find the coin that is less than and closest to the remaining amount
    while (i &gt; 0 &amp;&amp; coins[i] &gt; amt) {
      i--;
    }
    // Choose coins[i]
    amt -= coins[i];
    count++;
  }
  // If no feasible solution is found, return -1
  return amt == 0 ? count : -1;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def coin_change_greedy(coins: list[int], amt: int) -&gt; int:
    """Đổi tiền: Thuật toán Tham lam"""
    # Giả sử danh sách coins đã được sắp xếp
    i = len(coins) - 1
    count = 0
    # Lặp đưa ra lựa chọn tham lam cho đến khi hết số tiền còn lại
    while amt &gt; 0:
        # Tìm đồng xu nhỏ hơn và gần nhất với số tiền còn lại
        while i &gt; 0 and coins[i] &gt; amt:
            i -= 1
        # Chọn coins[i]
        amt -= coins[i]
        count += 1
    # Nếu không tìm được lời giải khả thi, trả về -1
    return count if amt == 0 else -1</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Đổi tiền: Thuật toán Tham lam */
int coinChangeGreedy(vector&lt;int&gt; &amp;coins, int amt) {
    // Giả sử coins đã được sắp xếp
    int i = coins.size() - 1;
    int count = 0;
    // Lặp đưa ra lựa chọn tham lam cho đến khi hết số tiền còn lại
    while (amt &gt; 0) {
        // Tìm đồng xu nhỏ hơn và gần nhất với số tiền còn lại
        while (i &gt; 0 &amp;&amp; coins[i] &gt; amt) {
            i--;
        }
        // Chọn coins[i]
        amt -= coins[i];
        count++;
    }
    // Nếu không tìm được lời giải khả thi, trả về -1
    return amt == 0 ? count : -1;
}</code></pre></div></div></div>

<p>Có thể bạn sẽ thốt lên: "Gọn gàng quá!". Thuật toán tham lam giải bài toán đổi tiền chỉ với khoảng mười dòng mã.</p>

<h2>15.1.2 Ưu điểm và Hạn chế của Thuật toán Tham lam</h2>
<p><strong>Thuật toán tham lam không chỉ dễ áp dụng và dễ triển khai, mà thường còn rất hiệu quả</strong>. Trong đoạn mã trên, nếu mệnh giá đồng xu nhỏ nhất là $\\min(coins)$, vòng lặp lựa chọn tham lam chạy tối đa $amt / \\min(coins)$ lần, cho độ phức tạp thời gian $O(amt / \\min(coins))$. Con số này thấp hơn hẳn một bậc so với độ phức tạp thời gian của lời giải quy hoạch động, $O(n \\times amt)$.</p>
<p>Tuy nhiên, <strong>với một số tập mệnh giá đồng xu, thuật toán tham lam không thể tìm ra lời giải tối ưu</strong>. Hình dưới đây minh họa hai ví dụ.</p>
<ul>
  <li><strong>Ví dụ đúng $coins = [1, 5, 10, 20, 50, 100]$</strong>: Với tập đồng xu này, thuật toán tham lam có thể tìm ra lời giải tối ưu cho bất kỳ $amt$ nào.</li>
  <li><strong>Ví dụ phản chứng $coins = [1, 20, 50]$</strong>: Giả sử $amt = 60$. Thuật toán tham lam chỉ tìm được tổ hợp $50 + 1 \\times 10$, tổng cộng $11$ đồng xu, trong khi quy hoạch động có thể tìm ra lời giải tối ưu $20 + 20 + 20$, chỉ dùng $3$ đồng xu.</li>
  <li><strong>Ví dụ phản chứng $coins = [1, 49, 50]$</strong>: Giả sử $amt = 98$. Thuật toán tham lam chỉ tìm được tổ hợp $50 + 1 \\times 48$, tổng cộng $49$ đồng xu, trong khi quy hoạch động có thể tìm ra lời giải tối ưu $49 + 49$, chỉ dùng $2$ đồng xu.</li>
</ul>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/coin_change_greedy_vs_dp.png" alt="Ví dụ thuật toán tham lam không tìm được lời giải tối ưu" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Nói cách khác, đối với bài toán đổi tiền, thuật toán tham lam không thể đảm bảo lời giải tối ưu toàn cục và thậm chí có thể cho ra kết quả rất tệ. Bài toán này nên được giải bằng quy hoạch động thì tốt hơn.</p>
<p>Nhìn chung, thuật toán tham lam phù hợp trong hai tình huống sau.</p>
<ol>
  <li><strong>Có thể đảm bảo lời giải tối ưu</strong>: Trong trường hợp này, thuật toán tham lam thường là lựa chọn tốt nhất vì chúng có xu hướng hiệu quả hơn quay lui và quy hoạch động.</li>
  <li><strong>Có thể tìm được lời giải gần tối ưu</strong>: Thuật toán tham lam cũng hữu ích trong trường hợp này. Với nhiều bài toán phức tạp, việc tìm lời giải tối ưu toàn cục là rất khó, nên việc tìm được hiệu quả một lời giải gần tối ưu đã là một kết quả rất tốt.</li>
</ol>

<h2>15.1.3 Đặc điểm của Thuật toán Tham lam</h2>
<p>Vậy câu hỏi đặt ra là: những bài toán nào phù hợp để giải bằng thuật toán tham lam? Hay nói cách khác, trong điều kiện nào thì thuật toán tham lam có thể đảm bảo tìm được lời giải tối ưu?</p>
<p>So với quy hoạch động, điều kiện để dùng thuật toán tham lam khắt khe hơn, chủ yếu tập trung vào hai tính chất của bài toán.</p>
<ul>
  <li><strong>Tính chất lựa chọn tham lam (Greedy Choice Property)</strong>: Chỉ khi các lựa chọn tối ưu cục bộ luôn có thể dẫn đến lời giải tối ưu toàn cục thì thuật toán tham lam mới có thể đảm bảo đạt được lời giải tối ưu.</li>
  <li><strong>Cấu trúc con tối ưu (Optimal Substructure)</strong>: Lời giải tối ưu của bài toán gốc chứa lời giải tối ưu của các bài toán con.</li>
</ul>
<p>Cấu trúc con tối ưu đã được giới thiệu trong chương "Quy hoạch động", nên ở đây ta sẽ không trình bày lại chi tiết. Đáng chú ý là cấu trúc con tối ưu của một số bài toán không rõ ràng, nhưng chúng vẫn có thể được giải bằng thuật toán tham lam.</p>
<p>Chúng ta chủ yếu tìm hiểu các phương pháp để xác định tính chất lựa chọn tham lam. Mặc dù mô tả của nó có vẻ tương đối đơn giản, <strong>nhưng trên thực tế, với nhiều bài toán, việc chứng minh tính chất lựa chọn tham lam không hề dễ dàng</strong>.</p>
<p>Ví dụ, trong bài toán đổi tiền, mặc dù ta có thể dễ dàng đưa ra các ví dụ phản chứng để bác bỏ tính chất lựa chọn tham lam, nhưng việc chứng minh nó đúng lại khó hơn nhiều. Nếu được hỏi, <strong>trong điều kiện nào thì một tập đồng xu có thể được giải bằng thuật toán tham lam</strong>? Ta thường chỉ có thể dựa vào trực giác hoặc ví dụ để đưa ra câu trả lời mơ hồ, và rất khó để đưa ra một chứng minh toán học chặt chẽ.</p>

<div class="callout callout-quote">
  <span class="callout-icon">💬</span>
  <div class="callout-body">
    <p>Có một bài báo trình bày một thuật toán $O(n^3)$ để xác định xem một tập đồng xu có thể được giải tối ưu bằng thuật toán tham lam cho bất kỳ số tiền nào hay không.</p>
    <p>Pearson, D. A polynomial-time algorithm for the change-making problem[J]. Operations Research Letters, 2005, 33(3): 231-234.</p>
  </div>
</div>

<h2>15.1.4 Các bước Giải bài toán bằng Thuật toán Tham lam</h2>
<p>Quy trình chung để giải bài toán tham lam có thể chia thành ba bước sau.</p>
<ol>
  <li><strong>Phân tích bài toán</strong>: Sắp xếp và hiểu các đặc điểm của bài toán, bao gồm định nghĩa trạng thái, mục tiêu tối ưu hóa, và các ràng buộc. Bước này cũng xuất hiện trong quay lui và quy hoạch động.</li>
  <li><strong>Xác định chiến lược tham lam</strong>: Quyết định cách đưa ra lựa chọn tham lam ở mỗi bước. Chiến lược này cần thu nhỏ kích thước bài toán từng bước và cuối cùng giải quyết toàn bộ bài toán.</li>
  <li><strong>Chứng minh tính đúng đắn</strong>: Thường cần chứng minh rằng bài toán có cả tính chất lựa chọn tham lam lẫn cấu trúc con tối ưu. Bước này có thể cần các công cụ toán học như quy nạp hoặc phản chứng.</li>
</ol>
<p>Việc xác định chiến lược tham lam là bước cốt lõi để giải các bài toán loại này, nhưng trên thực tế nó có thể không dễ dàng, chủ yếu vì các lý do sau.</p>
<ul>
  <li><strong>Chiến lược tham lam khác nhau rất nhiều giữa các bài toán</strong>. Với nhiều bài toán, chiến lược tham lam khá trực quan và có thể được suy ra qua lập luận và thử nghiệm sơ bộ. Tuy nhiên, với một số bài toán phức tạp, chiến lược tham lam có thể ẩn giấu rất sâu, điều này thử thách mạnh mẽ kinh nghiệm giải quyết vấn đề và năng lực thuật toán của người giải.</li>
  <li><strong>Một số chiến lược tham lam có tính đánh lừa cao</strong>. Ta có thể tự tin thiết kế một chiến lược tham lam, viết mã lời giải, và nộp bài, chỉ để phát hiện ra rằng một số trường hợp kiểm thử bị sai. Đó là vì chiến lược tham lam được thiết kế chỉ "đúng một phần", như minh họa qua bài toán đổi tiền đã thảo luận ở trên.</li>
</ul>
<p>Để đảm bảo tính đúng đắn, ta nên đưa ra một chứng minh toán học chặt chẽ cho chiến lược tham lam, <strong>thường dùng phản chứng hoặc quy nạp toán học</strong>.</p>
<p>Tuy nhiên, việc chứng minh tính đúng đắn cũng có thể khó khăn. Nếu không có hướng đi rõ ràng, ta thường phải quay lại gỡ lỗi dựa trên các trường hợp kiểm thử, sửa đổi và xác thực chiến lược tham lam từng bước một.</p>

<h2>15.1.5 Các Bài toán Điển hình được giải bằng Thuật toán Tham lam</h2>
<p>Thuật toán tham lam thường được áp dụng cho các bài toán tối ưu hóa thỏa mãn tính chất lựa chọn tham lam và cấu trúc con tối ưu. Dưới đây là một số bài toán tham lam điển hình.</p>
<ul>
  <li><strong>Bài toán đổi tiền</strong>: Với một số tổ hợp đồng xu nhất định, thuật toán tham lam luôn có thể tìm ra lời giải tối ưu.</li>
  <li><strong>Bài toán lập lịch khoảng thời gian</strong>: Giả sử bạn có một số công việc, mỗi công việc diễn ra trong một khoảng thời gian, và mục tiêu của bạn là hoàn thành càng nhiều công việc càng tốt. Nếu bạn luôn chọn công việc kết thúc sớm nhất, thuật toán tham lam có thể tìm ra lời giải tối ưu.</li>
  <li><strong>Bài toán cái túi phân số</strong>: Cho một tập vật phẩm và một sức chứa, mục tiêu của bạn là chọn một tập vật phẩm sao cho tổng khối lượng không vượt quá sức chứa và tổng giá trị là lớn nhất. Nếu bạn luôn chọn vật phẩm có tỷ lệ giá trị trên khối lượng (giá trị / khối lượng) cao nhất, thuật toán tham lam có thể tìm ra lời giải tối ưu trong một số trường hợp.</li>
  <li><strong>Bài toán giao dịch chứng khoán</strong>: Cho một tập giá cổ phiếu lịch sử, bạn có thể thực hiện nhiều giao dịch, nhưng nếu bạn đang nắm giữ cổ phiếu, bạn không thể mua lại trước khi bán, và mục tiêu là đạt lợi nhuận tối đa.</li>
  <li><strong>Mã hóa Huffman</strong>: Mã hóa Huffman là một thuật toán tham lam dùng để nén dữ liệu không mất mát. Bằng cách xây dựng cây Huffman và luôn gộp hai nút có tần suất thấp nhất, cây Huffman thu được có độ dài đường đi có trọng số nhỏ nhất (độ dài mã hóa).</li>
  <li><strong>Thuật toán Dijkstra</strong>: Đây là một thuật toán tham lam dùng để giải bài toán đường đi ngắn nhất từ một đỉnh nguồn cho trước đến tất cả các đỉnh khác.</li>
</ul>

<h2>15.1.6 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="coin-change-greedy-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'coin-change-greedy-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'coin-change-greedy-wrapper', 'tab-interactive'); initCoinChangeGreedyDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem thuật toán tham lam đổi tiền chạy trực tiếp — cả trường hợp <strong>tìm được lời giải tối ưu</strong> (<code>coins=[1,5,10,20,50,100]</code>) lẫn trường hợp <strong>thất bại</strong> (<code>coins=[1,20,50], amt=60</code>, đúng ví dụ phản chứng nêu trong bài).</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="coin-change-greedy-btn-mode1" class="control-btn" onclick="setCoinChangeGreedyMode('ok')">✅ Trường hợp thành công</button>
      <button id="coin-change-greedy-btn-mode2" class="control-btn btn-secondary" onclick="setCoinChangeGreedyMode('fail')">⚠️ Trường hợp thất bại</button>
    </div>
    <div id="coin-change-greedy-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="coin-change-greedy-btn-autorun" class="control-btn" onclick="autoRunCoinChangeGreedy()">▶ Auto Run</button>
      <button id="coin-change-greedy-btn-step" class="control-btn btn-secondary" onclick="stepCoinChangeGreedy()">Bước tiếp theo ▶</button>
      <button id="coin-change-greedy-btn-pause" class="control-btn btn-secondary" onclick="pauseRunCoinChangeGreedy()" disabled>⏸ Dừng</button>
      <button id="coin-change-greedy-btn-reset" class="control-btn btn-secondary" onclick="initCoinChangeGreedyDemo()">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="300" max="2000" value="700" step="100" oninput="setCoinChangeGreedySpeed(this.value)" /> <span id="coin-change-greedy-speed-label">700ms</span>
    </div>
    <div id="coin-change-greedy-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>

`,
    originalContent: `
# Greedy Algorithm

<u>Greedy algorithm</u> is a common approach to solving optimization problems. Its basic idea is to choose the option that appears best at each decision stage, that is, to greedily make locally optimal decisions in the hope of obtaining a globally optimal solution. Greedy algorithms are simple and efficient, and are widely used in many practical problems.

Greedy algorithms and dynamic programming are both commonly used to solve optimization problems. They share some similarities, such as both relying on the optimal substructure property, but they work differently.

- Dynamic programming considers all previous decisions when making the current decision, and uses solutions to past subproblems to construct the solution to the current subproblem.
- Greedy algorithms do not consider past decisions, but instead make greedy choices moving forward, continually reducing the problem size until the problem is solved.

We will first understand how greedy algorithms work through the example problem "coin change." This problem was already introduced in the "Complete Knapsack Problem" chapter, so it should already be familiar to you.

!!! question

    Given $n$ types of coins, where the denomination of the $i$-th type is $coins[i - 1]$, a target amount $amt$, and an unlimited number of coins of each type, what is the minimum number of coins needed to make up the target amount? If the target amount cannot be made up, return $-1$.

The greedy strategy for this problem is shown in the figure below. Given a target amount, **we greedily choose the coin that does not exceed it and is closest to it**, repeating this step until the target amount is made up.

![Greedy strategy for coin change](greedy_algorithm.assets/coin_change_greedy_strategy.png)

The implementation code is as follows:

\`\`\`src
[file]{coin_change_greedy}-[class]{}-[func]{coin_change_greedy}
\`\`\`

You may find yourself exclaiming, "So clean!" The greedy algorithm solves the coin change problem in only about ten lines of code.

## Advantages and Limitations of Greedy Algorithms

**Greedy algorithms are not only straightforward to apply and easy to implement, but are also usually very efficient**. In the code above, if the smallest coin denomination is $\\min(coins)$, the greedy selection loop runs at most $amt / \\min(coins)$ times, giving a time complexity of $O(amt / \\min(coins))$. This is an order of magnitude lower than the time complexity of the dynamic programming solution, $O(n \\times amt)$.

However, **for some coin denomination sets, greedy algorithms cannot find the optimal solution**. The figure below shows two examples.

- **Positive example $coins = [1, 5, 10, 20, 50, 100]$**: With this coin set, the greedy algorithm can find the optimal solution for any $amt$.
- **Counterexample $coins = [1, 20, 50]$**: Suppose $amt = 60$. The greedy algorithm can only find the combination $50 + 1 \\times 10$, using $11$ coins in total, whereas dynamic programming can find the optimal solution $20 + 20 + 20$ using only $3$ coins.
- **Counterexample $coins = [1, 49, 50]$**: Suppose $amt = 98$. The greedy algorithm can only find the combination $50 + 1 \\times 48$, using $49$ coins in total, whereas dynamic programming can find the optimal solution $49 + 49$ using only $2$ coins.

![Examples where greedy algorithms cannot find the optimal solution](greedy_algorithm.assets/coin_change_greedy_vs_dp.png)

In other words, for the coin change problem, greedy algorithms cannot guarantee a globally optimal solution and may even produce very poor results. This problem is better solved with dynamic programming.

In general, greedy algorithms are applicable in the following two situations.

1. **The optimal solution can be guaranteed**: In this case, greedy algorithms are often the best choice because they tend to be more efficient than backtracking and dynamic programming.
2. **An approximately optimal solution can be found**: Greedy algorithms are also useful in this case. For many complex problems, finding the global optimal solution is very difficult, so efficiently finding a suboptimal solution is already a very good outcome.

## Characteristics of Greedy Algorithms

So the question arises: what kind of problems are suitable for solving with greedy algorithms? Or in other words, under what conditions can greedy algorithms guarantee finding the optimal solution?

Compared to dynamic programming, the conditions for using greedy algorithms are stricter, mainly focusing on two properties of the problem.

- **Greedy choice property**: Only when locally optimal choices can always lead to a globally optimal solution can greedy algorithms guarantee obtaining the optimal solution.
- **Optimal substructure**: The optimal solution to the original problem contains the optimal solutions to subproblems.

Optimal substructure has already been introduced in the "Dynamic Programming" chapter, so we won't elaborate on it here. It's worth noting that the optimal substructure of some problems is not obvious, but they can still be solved using greedy algorithms.

We mainly explore methods for determining the greedy choice property. Although its description seems relatively simple, **in practice, for many problems, proving the greedy choice property is not easy**.

For example, in the coin change problem, although we can easily provide counterexamples to disprove the greedy choice property, proving that it holds is much harder. If asked, **under what conditions can a coin set be solved using a greedy algorithm**? We often can only rely on intuition or examples to give a vague answer, and it is difficult to provide a rigorous mathematical proof.

!!! quote

    There is a paper that presents an $O(n^3)$ algorithm for determining whether a coin set can be solved optimally by a greedy algorithm for any amount.

    Pearson, D. A polynomial-time algorithm for the change-making problem[J]. Operations Research Letters, 2005, 33(3): 231-234.

## Steps for Solving Problems with Greedy Algorithms

The general process for solving greedy problems can be divided into the following three steps.

1. **Problem analysis**: Sort out and understand the characteristics of the problem, including state definitions, optimization objectives, and constraints. This step also appears in backtracking and dynamic programming.
2. **Determine the greedy strategy**: Decide how to make a greedy choice at each step. This strategy should reduce the problem size step by step and ultimately solve the entire problem.
3. **Correctness proof**: It is usually necessary to prove that the problem has both greedy choice property and optimal substructure. This step may require mathematical tools such as induction or proof by contradiction.

Determining the greedy strategy is the core step in solving such problems, but it may not be easy in practice, mainly for the following reasons.

- **Greedy strategies vary greatly from problem to problem**. For many problems, the greedy strategy is fairly intuitive and can be derived through rough reasoning and experimentation. For some complex problems, however, the greedy strategy may be deeply hidden, which strongly tests one's problem-solving experience and algorithmic ability.
- **Some greedy strategies are highly deceptive**. We may confidently design a greedy strategy, write the solution code, and submit it, only to find that some test cases fail. This is because the designed greedy strategy is only "partially correct," as exemplified by the coin change problem discussed above.

To ensure correctness, we should give a rigorous mathematical proof of the greedy strategy, **usually using proof by contradiction or mathematical induction**.

However, correctness proofs can also be difficult. If we have no clear direction, we usually resort to debugging against test cases, revising and validating the greedy strategy step by step.

## Typical Problems Solved by Greedy Algorithms

Greedy algorithms are often applied to optimization problems that satisfy greedy choice property and optimal substructure. Below are some typical greedy algorithm problems.

- **Coin change problem**: With certain coin combinations, greedy algorithms can always obtain the optimal solution.
- **Interval scheduling problem**: Suppose you have some tasks, each taking place during a period of time, and your goal is to complete as many tasks as possible. If you always choose the task that ends earliest, then the greedy algorithm can obtain the optimal solution.
- **Fractional knapsack problem**: Given a set of items and a carrying capacity, your goal is to select a set of items such that the total weight does not exceed the carrying capacity and the total value is maximized. If you always choose the item with the highest value-to-weight ratio (value / weight), then the greedy algorithm can obtain the optimal solution in some cases.
- **Stock trading problem**: Given a set of historical stock prices, you can make multiple trades, but if you already hold stocks, you cannot buy again before selling, and the goal is to obtain the maximum profit.
- **Huffman coding**: Huffman coding is a greedy algorithm used for lossless data compression. By constructing a Huffman tree and always merging the two nodes with the lowest frequency, the resulting Huffman tree has the minimum weighted path length (encoding length).
- **Dijkstra's algorithm**: It is a greedy algorithm for solving the shortest path problem from a given source vertex to all other vertices.

`
  },

  'dsa-fractional-knapsack': {
    title: '15.2 Bài toán Cái túi phân số',
    summary: 'Biến thể của Cái túi 0-1 cho phép chọn một phần vật phẩm. Chiến lược tham lam ưu tiên giá trị đơn vị cao nhất, và chứng minh tính đúng đắn bằng phản chứng.',
    tags: ['dsa', 'greedy', 'fractional-knapsack', 'sorting'],
    domain: 'Algorithms',
    module: 'Chương 15: Tham lam',
    prerequisites: ['dsa-greedy-intro'],
    related: ['dsa-max-capacity'],
    updatedAt: '2026-07-19',
    readTime: '10 phút',
    content: `

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho $n$ vật phẩm, trong đó khối lượng của vật phẩm thứ $i$ là $wgt[i-1]$ và giá trị là $val[i-1]$, cùng một cái túi có sức chứa $cap$. Mỗi vật phẩm chỉ được chọn một lần, <strong>nhưng có thể chọn một phần của vật phẩm, với giá trị tỷ lệ theo khối lượng được chọn</strong>. Tổng giá trị lớn nhất có thể đặt vào túi dưới ràng buộc sức chứa là bao nhiêu? Ví dụ được minh họa trong hình dưới đây.</p>
  </div>
</div>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/fractional_knapsack_example.png" alt="Dữ liệu ví dụ cho bài toán cái túi phân số" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Bài toán cái túi phân số nhìn chung khá giống với bài toán cái túi 0-1, với trạng thái bao gồm vật phẩm hiện tại $i$ và sức chứa $c$, và mục tiêu là tối đa hóa giá trị trong giới hạn sức chứa của túi.</p>
<p>Điểm khác biệt là bài toán này cho phép chọn chỉ một phần của vật phẩm. Như minh họa trong hình dưới đây, <strong>ta có thể chia nhỏ một vật phẩm tùy ý và tính giá trị của nó theo tỷ lệ với khối lượng được chọn</strong>.</p>
<ol>
  <li>Với vật phẩm $i$, giá trị trên một đơn vị khối lượng của nó là $val[i-1] / wgt[i-1]$, gọi là giá trị đơn vị.</li>
  <li>Giả sử ta đặt một phần của vật phẩm $i$ với khối lượng $w$ vào túi, thì giá trị tăng thêm cho túi là $w \\times val[i-1] / wgt[i-1]$.</li>
</ol>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/fractional_knapsack_unit_value.png" alt="Giá trị của vật phẩm trên mỗi đơn vị khối lượng" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>15.2.1 Xác định Chiến lược Tham lam</h2>
<p>Tối đa hóa tổng giá trị trong túi <strong>về bản chất nghĩa là ưu tiên các vật phẩm có giá trị trên mỗi đơn vị khối lượng cao hơn</strong>. Từ quan sát này, ta có thể suy ra chiến lược tham lam minh họa trong hình dưới đây.</p>
<ol>
  <li>Sắp xếp các vật phẩm theo giá trị đơn vị từ cao xuống thấp.</li>
  <li>Duyệt qua tất cả các vật phẩm, <strong>tham lam chọn vật phẩm có giá trị đơn vị cao nhất ở mỗi vòng</strong>.</li>
  <li>Nếu sức chứa còn lại của túi không đủ, dùng một phần của vật phẩm hiện tại để lấp đầy túi.</li>
</ol>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/fractional_knapsack_greedy_strategy.png" alt="Chiến lược tham lam cho bài toán cái túi phân số" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>15.2.2 Triển khai Mã</h2>
<p>Ta định nghĩa một lớp <code>Item</code> để có thể sắp xếp các vật phẩm theo giá trị đơn vị. Sau đó ta duyệt tham lam qua các vật phẩm đã sắp xếp, dừng lại khi túi đã đầy và trả về kết quả:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Vật phẩm */
class Item {
    int w; // Khối lượng vật phẩm
    int v; // Giá trị vật phẩm

    public Item(int w, int v) {
        this.w = w;
        this.v = v;
    }
}

/* Cái túi phân số: Thuật toán Tham lam */
static double fractionalKnapsack(int[] wgt, int[] val, int cap) {
    // Tạo danh sách vật phẩm, mỗi vật phẩm có 2 thuộc tính: khối lượng, giá trị
    Item[] items = new Item[wgt.length];
    for (int i = 0; i &lt; wgt.length; i++) {
        items[i] = new Item(wgt[i], val[i]);
    }
    // Sắp xếp theo giá trị đơn vị item.v / item.w giảm dần
    Arrays.sort(items, Comparator.comparingDouble(item -&gt; -((double) item.v / item.w)));
    // Lặp lựa chọn tham lam
    double res = 0;
    for (Item item : items) {
        if (item.w &lt;= cap) {
            // Nếu sức chứa còn lại đủ, bỏ toàn bộ vật phẩm hiện tại vào túi
            res += item.v;
            cap -= item.w;
        } else {
            // Nếu sức chứa còn lại không đủ, bỏ một phần vật phẩm hiện tại vào túi
            res += (double) item.v / item.w * cap;
            // Sức chứa đã hết, thoát khỏi vòng lặp
            break;
        }
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func fractionalKnapsack(wgt: [Int], val: [Int], cap: Int) -&gt; Double {
    // Create item list with two attributes: weight, value
    var items = zip(wgt, val).map { Item(w: $0, v: $1) }
    // Sort by unit value item.v / item.w from high to low
    items.sort { -(Double($0.v) / Double($0.w)) &lt; -(Double($1.v) / Double($1.w)) }
    // Loop for greedy selection
    var res = 0.0
    var cap = cap
    for item in items {
        if item.w &lt;= cap {
            // If remaining capacity is sufficient, put the entire current item into the knapsack
            res += Double(item.v)
            cap -= item.w
        } else {
            // If remaining capacity is insufficient, put part of the current item into the knapsack
            res += Double(item.v) / Double(item.w) * Double(cap)
            // No remaining capacity, so break out of the loop
            break
        }
    }
    return res
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>double fractionalKnapsack(List&lt;int&gt; wgt, List&lt;int&gt; val, int cap) {
  // Create item list with two attributes: weight, value
  List&lt;Item&gt; items = List.generate(wgt.length, (i) =&gt; Item(wgt[i], val[i]));
  // Sort by unit value item.v / item.w from high to low
  items.sort((a, b) =&gt; (b.v / b.w).compareTo(a.v / a.w));
  // Loop for greedy selection
  double res = 0;
  for (Item item in items) {
    if (item.w &lt;= cap) {
      // If remaining capacity is sufficient, put the entire current item into the knapsack
      res += item.v;
      cap -= item.w;
    } else {
      // If remaining capacity is insufficient, put part of the current item into the knapsack
      res += item.v / item.w * cap;
      // No remaining capacity, so break out of the loop
      break;
    }
  }
  return res;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class Item:
    """Vật phẩm"""

    def __init__(self, w: int, v: int):
        self.w = w  # Khối lượng vật phẩm
        self.v = v  # Giá trị vật phẩm

def fractional_knapsack(wgt: list[int], val: list[int], cap: int) -&gt; int:
    """Cái túi phân số: Thuật toán Tham lam"""
    # Tạo danh sách vật phẩm, mỗi vật phẩm có 2 thuộc tính: khối lượng, giá trị
    items = [Item(w, v) for w, v in zip(wgt, val)]
    # Sắp xếp theo giá trị đơn vị item.v / item.w giảm dần
    items.sort(key=lambda item: item.v / item.w, reverse=True)
    # Lặp lựa chọn tham lam
    res = 0
    for item in items:
        if item.w &lt;= cap:
            # Nếu sức chứa còn lại đủ, bỏ toàn bộ vật phẩm hiện tại vào túi
            res += item.v
            cap -= item.w
        else:
            # Nếu sức chứa còn lại không đủ, bỏ một phần vật phẩm hiện tại vào túi
            res += (item.v / item.w) * cap
            # Sức chứa đã hết, thoát khỏi vòng lặp
            break
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Vật phẩm */
class Item {
  public:
    int w; // Khối lượng vật phẩm
    int v; // Giá trị vật phẩm

    Item(int w, int v) : w(w), v(v) {
    }
};

/* Cái túi phân số: Thuật toán Tham lam */
double fractionalKnapsack(vector&lt;int&gt; &amp;wgt, vector&lt;int&gt; &amp;val, int cap) {
    // Tạo danh sách vật phẩm, mỗi vật phẩm có 2 thuộc tính: khối lượng, giá trị
    vector&lt;Item&gt; items;
    for (int i = 0; i &lt; wgt.size(); i++) {
        items.push_back(Item(wgt[i], val[i]));
    }
    // Sắp xếp theo giá trị đơn vị item.v / item.w giảm dần
    sort(items.begin(), items.end(), [](Item &amp;a, Item &amp;b) { return (double)a.v / a.w &gt; (double)b.v / b.w; });
    // Lặp lựa chọn tham lam
    double res = 0;
    for (auto &amp;item : items) {
        if (item.w &lt;= cap) {
            // Nếu sức chứa còn lại đủ, bỏ toàn bộ vật phẩm hiện tại vào túi
            res += item.v;
            cap -= item.w;
        } else {
            // Nếu sức chứa còn lại không đủ, bỏ một phần vật phẩm hiện tại vào túi
            res += (double)item.v / item.w * cap;
            // Sức chứa đã hết, thoát khỏi vòng lặp
            break;
        }
    }
    return res;
}</code></pre></div></div></div>

<p>Các thuật toán sắp xếp có sẵn thường mất thời gian $O(n \\log n)$, và độ phức tạp không gian của chúng thường là $O(\\log n)$ hoặc $O(n)$, tùy vào cách triển khai cụ thể của ngôn ngữ lập trình.</p>
<p>Ngoài việc sắp xếp, trong trường hợp xấu nhất cần duyệt qua toàn bộ danh sách vật phẩm, <strong>do đó độ phức tạp thời gian là $O(n)$</strong>, trong đó $n$ là số lượng vật phẩm.</p>
<p>Vì một danh sách đối tượng <code>Item</code> được khởi tạo, <strong>độ phức tạp không gian là $O(n)$</strong>.</p>

<h2>15.2.3 Chứng minh Tính đúng đắn</h2>
<p>Ta dùng phương pháp phản chứng. Giả sử vật phẩm $x$ có giá trị đơn vị cao nhất, và một thuật toán nào đó cho ra giá trị tối ưu <code>res</code>, nhưng lời giải thu được không bao gồm vật phẩm $x$.</p>
<p>Bây giờ hãy bỏ ra một đơn vị khối lượng từ bất kỳ vật phẩm nào trong túi và thay bằng một đơn vị khối lượng từ vật phẩm $x$. Vì vật phẩm $x$ có giá trị đơn vị cao nhất, tổng giá trị sau khi thay thế chắc chắn phải lớn hơn <code>res</code>. <strong>Điều này mâu thuẫn với giả định rằng <code>res</code> là tối ưu, chứng minh rằng bất kỳ lời giải tối ưu nào cũng phải bao gồm vật phẩm $x$</strong>.</p>
<p>Ta có thể xây dựng mâu thuẫn tương tự cho các vật phẩm khác trong lời giải. Tóm lại, <strong>các vật phẩm có giá trị đơn vị cao hơn luôn là lựa chọn tốt hơn</strong>, điều này chứng minh chiến lược tham lam là hiệu quả.</p>
<p>Như minh họa trong hình dưới đây, nếu ta coi khối lượng vật phẩm và giá trị đơn vị là trục hoành và trục tung của một biểu đồ hai chiều, thì bài toán cái túi phân số có thể được xem như "tìm diện tích lớn nhất được bao trong một khoảng giới hạn trên trục hoành". Phép tương tự này giúp giải thích tính hiệu quả của chiến lược tham lam từ góc độ hình học.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/fractional_knapsack_area_chart.png" alt="Biểu diễn hình học của bài toán cái túi phân số" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>15.2.4 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="fractional-knapsack-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'fractional-knapsack-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'fractional-knapsack-wrapper', 'tab-interactive'); initFractionalKnapsackDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem thuật toán tham lam chọn vật phẩm với <code>wgt=[10,20,30,40,50]</code>, <code>val=[50,120,150,210,240]</code>, <code>cap=50</code> (giống ví dụ mã nguồn thực tế).</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="fractional-knapsack-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="fractional-knapsack-btn-autorun" class="control-btn" onclick="autoRunFractionalKnapsack()">▶ Auto Run</button>
      <button id="fractional-knapsack-btn-step" class="control-btn btn-secondary" onclick="stepFractionalKnapsack()">Bước tiếp theo ▶</button>
      <button id="fractional-knapsack-btn-pause" class="control-btn btn-secondary" onclick="pauseRunFractionalKnapsack()" disabled>⏸ Dừng</button>
      <button id="fractional-knapsack-btn-reset" class="control-btn btn-secondary" onclick="initFractionalKnapsackDemo()">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="300" max="2000" value="900" step="100" oninput="setFractionalKnapsackSpeed(this.value)" /> <span id="fractional-knapsack-speed-label">900ms</span>
    </div>
    <div id="fractional-knapsack-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>

`,
    originalContent: `
# Fractional Knapsack Problem

!!! question

    Given $n$ items, where the weight of the $i$-th item is $wgt[i-1]$ and its value is $val[i-1]$, and a knapsack with capacity $cap$. Each item can be selected only once, **but a fraction of an item may be selected, with its value proportional to the selected weight**. What is the maximum total value that can be placed in the knapsack under the capacity constraint? An example is shown in the figure below.

![Example data for the fractional knapsack problem](fractional_knapsack_problem.assets/fractional_knapsack_example.png)

The fractional knapsack problem is very similar overall to the 0-1 knapsack problem, with states including the current item $i$ and capacity $c$, and the goal being to maximize value under the limited knapsack capacity.

The difference is that this problem allows selecting only a fraction of an item. As shown in the figure below, **we can split an item arbitrarily and compute its value in proportion to the selected weight**.

1. For item $i$, its value per unit weight is $val[i-1] / wgt[i-1]$, referred to as unit value.
2. Suppose we put a portion of item $i$ with weight $w$ into the knapsack, then the value added to the knapsack is $w \\times val[i-1] / wgt[i-1]$.

![Value of items per unit weight](fractional_knapsack_problem.assets/fractional_knapsack_unit_value.png)

### Greedy Strategy Determination

Maximizing the total value in the knapsack **essentially means prioritizing items with higher value per unit weight**. From this observation, we can derive the greedy strategy shown in the figure below.

1. Sort items by unit value from high to low.
2. Iterate through all items, **greedily selecting the item with the highest unit value in each round**.
3. If the remaining knapsack capacity is insufficient, use a portion of the current item to fill the knapsack.

![Greedy strategy for the fractional knapsack problem](fractional_knapsack_problem.assets/fractional_knapsack_greedy_strategy.png)

### Code Implementation

We define an \`Item\` class so that items can be sorted by unit value. We then iterate through the sorted items greedily, stopping once the knapsack is full and returning the result:

\`\`\`src
[file]{fractional_knapsack}-[class]{}-[func]{fractional_knapsack}
\`\`\`

Built-in sorting algorithms usually take $O(n \\log n)$ time, and their space complexity is usually $O(\\log n)$ or $O(n)$, depending on the specific implementation of the programming language.

Apart from sorting, in the worst case the entire item list needs to be traversed, **therefore the time complexity is $O(n)$**, where $n$ is the number of items.

Since an \`Item\` object list is initialized, **the space complexity is $O(n)$**.

### Correctness Proof

We use proof by contradiction. Suppose item $x$ has the highest unit value, and some algorithm produces an optimal value \`res\`, but the resulting solution does not include item $x$.

Now remove one unit of weight from any item in the knapsack and replace it with one unit of weight from item $x$. Since item $x$ has the highest unit value, the total value after the replacement must be greater than \`res\`. **This contradicts the assumption that \`res\` is optimal, proving that any optimal solution must include item $x$**.

We can construct the same contradiction for the other items in the solution as well. In summary, **items with higher unit value are always the better choice**, which proves that the greedy strategy is effective.

As shown in the figure below, if we treat item weight and unit value as the horizontal and vertical axes of a two-dimensional chart, then the fractional knapsack problem can be viewed as "finding the maximum area enclosed within a bounded interval on the horizontal axis." This analogy helps explain the effectiveness of the greedy strategy from a geometric perspective.

![Geometric representation of the fractional knapsack problem](fractional_knapsack_problem.assets/fractional_knapsack_area_chart.png)

`
  },

  'dsa-max-capacity': {
    title: '15.3 Bài toán Chứa nước nhiều nhất',
    summary: 'Dùng kỹ thuật Hai con trỏ kết hợp Tham lam để giảm độ phức tạp từ $O(n^2)$ (liệt kê vét cạn) xuống $O(n)$ khi tìm dung tích chứa nước lớn nhất.',
    tags: ['dsa', 'greedy', 'two-pointers', 'max-capacity'],
    domain: 'Algorithms',
    module: 'Chương 15: Tham lam',
    prerequisites: ['dsa-fractional-knapsack'],
    related: ['dsa-max-product-cutting'],
    updatedAt: '2026-07-19',
    readTime: '10 phút',
    content: `

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một mảng $ht$, trong đó mỗi phần tử đại diện cho chiều cao của một vách ngăn thẳng đứng. Bất kỳ hai vách ngăn nào trong mảng, cùng với khoảng cách giữa chúng, có thể tạo thành một cái thùng chứa.</p>
    <p>Dung tích của thùng chứa bằng tích của chiều cao và chiều rộng (tức là diện tích), trong đó chiều cao được xác định bởi vách ngăn ngắn hơn và chiều rộng là hiệu chỉ số mảng của hai vách ngăn.</p>
    <p>Chọn hai vách ngăn trong mảng sao cho dung tích của thùng chứa thu được là lớn nhất, và trả về dung tích lớn nhất đó. Ví dụ được minh họa trong hình dưới đây.</p>
  </div>
</div>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/max_capacity_example.png" alt="Dữ liệu ví dụ cho bài toán chứa nước nhiều nhất" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Thùng chứa được tạo bởi bất kỳ hai vách ngăn nào, <strong>vì vậy trạng thái của bài toán này là chỉ số của hai vách ngăn, ký hiệu là $[i, j]$</strong>.</p>
<p>Theo đề bài, dung tích bằng chiều cao nhân chiều rộng, trong đó chiều cao được xác định bởi vách ngăn ngắn hơn và chiều rộng là hiệu chỉ số mảng của hai vách ngăn. Gọi dung tích là $cap[i, j]$; ta có công thức sau:</p>
<p>$$cap[i, j] = \\min(ht[i], ht[j]) \\times (j - i)$$</p>
<p>Gọi độ dài mảng là $n$. Khi đó số cách chọn hai vách ngăn (tức tổng số trạng thái) là $C_n^2 = \\frac{n(n - 1)}{2}$. Cách tiếp cận đơn giản nhất là <strong>liệt kê toàn bộ các trạng thái</strong> để tìm dung tích lớn nhất, với độ phức tạp thời gian $O(n^2)$.</p>

<h2>15.3.1 Xác định Chiến lược Tham lam</h2>
<p>Bài toán này có một lời giải hiệu quả hơn. Như minh họa trong hình dưới đây, xét trạng thái $[i, j]$ với $i < j$ và $ht[i] < ht[j]$. Trong trường hợp này, $i$ là vách ngăn ngắn hơn và $j$ là vách ngăn cao hơn.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/max_capacity_initial_state.png" alt="Trạng thái ban đầu" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Như minh họa trong hình dưới đây, <strong>nếu bây giờ ta di chuyển vách ngăn cao hơn $j$ vào trong hướng về phía vách ngăn ngắn hơn $i$, dung tích chắc chắn sẽ giảm</strong>.</p>
<p>Đó là vì sau khi di chuyển vách ngăn cao hơn $j$, chiều rộng $j-i$ chắc chắn giảm. Vì chiều cao được xác định bởi vách ngăn ngắn hơn, chiều cao chỉ có thể giữ nguyên ($i$ vẫn là vách ngăn ngắn hơn) hoặc giảm ($j$ trở thành vách ngăn ngắn hơn sau khi di chuyển).</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/max_capacity_moving_long_board.png" alt="Trạng thái sau khi di chuyển vách dài vào trong" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Ngược lại, <strong>chỉ bằng cách di chuyển vách ngăn ngắn hơn $i$ vào trong thì dung tích mới có thể tăng lên</strong>. Mặc dù chiều rộng chắc chắn sẽ giảm, <strong>nhưng chiều cao có thể tăng lên</strong> (vách ngăn được di chuyển tại $i$ có thể cao hơn). Ví dụ, trong hình dưới đây, diện tích tăng lên sau khi di chuyển vách ngăn ngắn hơn.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/max_capacity_moving_short_board.png" alt="Trạng thái sau khi di chuyển vách ngắn vào trong" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Từ đó, ta có thể suy ra chiến lược tham lam cho bài toán này: khởi tạo hai con trỏ ở hai đầu, và ở mỗi vòng di chuyển con trỏ tương ứng với vách ngăn ngắn hơn vào trong cho đến khi hai con trỏ gặp nhau.</p>
<p>Hình dưới đây minh họa quá trình thực thi của chiến lược tham lam.</p>
<ol>
  <li>Ở trạng thái ban đầu, hai con trỏ $i$ và $j$ nằm ở hai đầu mảng.</li>
  <li>Tính dung tích của trạng thái hiện tại $cap[i, j]$, và cập nhật dung tích lớn nhất.</li>
  <li>So sánh chiều cao của vách ngăn $i$ và $j$, và di chuyển con trỏ tương ứng với vách ngăn ngắn hơn vào trong một vị trí.</li>
  <li>Lặp lại bước <code>2.</code> và <code>3.</code> cho đến khi $i$ và $j$ gặp nhau.</li>
</ol>

<div class="interactive-widget-wrapper" id="max-capacity-steps-wrapper">
<div class="slider-container"><div class="slide active"><img loading="lazy" src="dsa-assets/max_capacity_greedy_step1.png" alt="Bước 1" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Khởi tạo i=0, j=7 ở hai đầu mảng ht=[3,8,5,2,7,7,3,4].</p></div><div class="slide"><img loading="lazy" src="dsa-assets/max_capacity_greedy_step2.png" alt="Bước 2" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">Tính cap[0,7] = min(3,4) × 7 = 21, cập nhật res=21. ht[0]=3 < ht[7]=4 → di chuyển i vào trong.</p></div><div class="slide"><img loading="lazy" src="dsa-assets/max_capacity_greedy_step3.png" alt="Bước 3" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">i=1: cap[1,7] = min(8,4) × 6 = 24, cập nhật res=24. ht[1]=8 > ht[7]=4 → di chuyển j vào trong.</p></div><div class="slide"><img loading="lazy" src="dsa-assets/max_capacity_greedy_step4.png" alt="Bước 4" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">j=6: cap[1,6] = min(8,3) × 5 = 15. ht[1]=8 > ht[6]=3 → di chuyển j vào trong.</p></div><div class="slide"><img loading="lazy" src="dsa-assets/max_capacity_greedy_step5.png" alt="Bước 5" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">j=5: cap[1,5] = min(8,7) × 4 = 28, cập nhật res=28. ht[1]=8 > ht[5]=7 → di chuyển j vào trong.</p></div><div class="slide"><img loading="lazy" src="dsa-assets/max_capacity_greedy_step6.png" alt="Bước 6" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">j=4: cap[1,4] = min(8,7) × 3 = 21. ht[1]=8 > ht[4]=7 → di chuyển j vào trong.</p></div><div class="slide"><img loading="lazy" src="dsa-assets/max_capacity_greedy_step7.png" alt="Bước 7" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">j=3: cap[1,3] = min(8,2) × 2 = 4. ht[1]=8 > ht[3]=2 → di chuyển j vào trong.</p></div><div class="slide"><img loading="lazy" src="dsa-assets/max_capacity_greedy_step8.png" alt="Bước 8" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">j=2: cap[1,2] = min(8,5) × 1 = 5. ht[1]=8 > ht[2]=5 → di chuyển j vào trong.</p></div><div class="slide"><img loading="lazy" src="dsa-assets/max_capacity_greedy_step9.png" alt="Bước 9" style="max-width:100%;height:auto;border-radius:var(--radius-md);" /><p class="slide-caption">j=1: i=j nên dừng lại. Dung tích lớn nhất là res=28.</p></div><div class="slider-controls"><button class="slider-btn" onclick="prevSlide('max-capacity-steps-wrapper')">◀ Trước</button><span class="slider-indicator">Bước 1 / 9</span><button class="slider-btn" onclick="nextSlide('max-capacity-steps-wrapper')">Sau ▶</button></div></div>
</div>

<h2>15.3.2 Triển khai Mã</h2>
<p>Đoạn mã chạy tối đa $n$ vòng, <strong>vì vậy độ phức tạp thời gian là $O(n)$</strong>.</p>
<p>Các biến $i$, $j$, và $res$ chỉ dùng một lượng không gian bổ sung không đổi, <strong>vì vậy độ phức tạp không gian là $O(1)$</strong>.</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Chứa nước nhiều nhất: Thuật toán Tham lam */
static int maxCapacity(int[] ht) {
    // Khởi tạo i, j ở hai đầu mảng
    int i = 0, j = ht.length - 1;
    // Dung tích lớn nhất ban đầu là 0
    int res = 0;
    // Lặp lựa chọn tham lam cho đến khi hai vách gặp nhau
    while (i &lt; j) {
        // Cập nhật dung tích lớn nhất
        int cap = Math.min(ht[i], ht[j]) * (j - i);
        res = Math.max(res, cap);
        // Di chuyển vách ngắn hơn vào trong
        if (ht[i] &lt; ht[j]) {
            i++;
        } else {
            j--;
        }
    }
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func maxCapacity(ht: [Int]) -&gt; Int {
    // Initialize i, j to be at both ends of the array
    var i = ht.startIndex, j = ht.endIndex - 1
    // Initial max capacity is 0
    var res = 0
    // Loop for greedy selection until the two boards meet
    while i &lt; j {
        // Update max capacity
        let cap = min(ht[i], ht[j]) * (j - i)
        res = max(res, cap)
        // Move the shorter board inward
        if ht[i] &lt; ht[j] {
            i += 1
        } else {
            j -= 1
        }
    }
    return res
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int maxCapacity(List&lt;int&gt; ht) {
  // Initialize i, j to be at both ends of the array
  int i = 0, j = ht.length - 1;
  // Initial max capacity is 0
  int res = 0;
  // Loop for greedy selection until the two boards meet
  while (i &lt; j) {
    // Update max capacity
    int cap = min(ht[i], ht[j]) * (j - i);
    res = max(res, cap);
    // Move the shorter board inward
    if (ht[i] &lt; ht[j]) {
      i++;
    } else {
      j--;
    }
  }
  return res;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def max_capacity(ht: list[int]) -&gt; int:
    """Chứa nước nhiều nhất: Thuật toán Tham lam"""
    # Khởi tạo i, j ở hai đầu mảng
    i, j = 0, len(ht) - 1
    # Dung tích lớn nhất ban đầu là 0
    res = 0
    # Lặp lựa chọn tham lam cho đến khi hai vách gặp nhau
    while i &lt; j:
        # Cập nhật dung tích lớn nhất
        cap = min(ht[i], ht[j]) * (j - i)
        res = max(res, cap)
        # Di chuyển vách ngắn hơn vào trong
        if ht[i] &lt; ht[j]:
            i += 1
        else:
            j -= 1
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Chứa nước nhiều nhất: Thuật toán Tham lam */
int maxCapacity(vector&lt;int&gt; &amp;ht) {
    // Khởi tạo i, j ở hai đầu mảng
    int i = 0, j = ht.size() - 1;
    // Dung tích lớn nhất ban đầu là 0
    int res = 0;
    // Lặp lựa chọn tham lam cho đến khi hai vách gặp nhau
    while (i &lt; j) {
        // Cập nhật dung tích lớn nhất
        int cap = min(ht[i], ht[j]) * (j - i);
        res = max(res, cap);
        // Di chuyển vách ngắn hơn vào trong
        if (ht[i] &lt; ht[j]) {
            i++;
        } else {
            j--;
        }
    }
    return res;
}</code></pre></div></div></div>

<h2>15.3.3 Chứng minh Tính đúng đắn</h2>
<p>Lý do tham lam nhanh hơn liệt kê vét cạn là vì mỗi vòng lựa chọn tham lam sẽ "bỏ qua" một số trạng thái.</p>
<p>Ví dụ, ở trạng thái $cap[i, j]$, giả sử $i$ là vách ngăn ngắn hơn và $j$ là vách ngăn cao hơn. Nếu ta tham lam di chuyển vách ngăn ngắn hơn $i$ vào trong một vị trí, các trạng thái minh họa trong hình dưới đây sẽ bị "bỏ qua". <strong>Điều này có nghĩa là dung tích của chúng không thể được kiểm tra sau này nữa</strong>.</p>
<p>$$cap[i, i+1], cap[i, i+2], \\dots, cap[i, j-2], cap[i, j-1]$$</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/max_capacity_skipped_states.png" alt="Các trạng thái bị bỏ qua khi di chuyển vách ngắn" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Xem xét kỹ hơn cho thấy <strong>những trạng thái bị bỏ qua này chính xác là các trạng thái thu được khi di chuyển vách ngăn cao hơn $j$ vào trong</strong>. Ta đã chứng minh rằng di chuyển vách ngăn cao hơn vào trong chắc chắn sẽ làm giảm dung tích. Do đó, không trạng thái nào bị bỏ qua có thể là lời giải tối ưu, <strong>vì vậy việc bỏ qua chúng không khiến ta bỏ lỡ giá trị tối ưu</strong>.</p>
<p>Phân tích trên cho thấy việc di chuyển vách ngăn ngắn hơn là một thao tác "an toàn", và chiến lược tham lam là hiệu quả.</p>

<h2>15.3.4 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="max-capacity-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'max-capacity-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'max-capacity-wrapper', 'tab-interactive'); initMaxCapacityDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem hai con trỏ $i$, $j$ di chuyển vào trong trên mảng <code>ht=[3,8,5,2,7,7,3,4]</code> (giống ví dụ mã nguồn thực tế và đúng như 9 bước minh họa ở trên).</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="max-capacity-canvas" style="padding: 1em 0;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="max-capacity-btn-autorun" class="control-btn" onclick="autoRunMaxCapacity()">▶ Auto Run</button>
      <button id="max-capacity-btn-step" class="control-btn btn-secondary" onclick="stepMaxCapacity()">Bước tiếp theo ▶</button>
      <button id="max-capacity-btn-pause" class="control-btn btn-secondary" onclick="pauseRunMaxCapacity()" disabled>⏸ Dừng</button>
      <button id="max-capacity-btn-reset" class="control-btn btn-secondary" onclick="initMaxCapacityDemo()">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="300" max="2000" value="900" step="100" oninput="setMaxCapacitySpeed(this.value)" /> <span id="max-capacity-speed-label">900ms</span>
    </div>
    <div id="max-capacity-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>

`,
    originalContent: `
# Max Capacity Problem

!!! question

    Given an array $ht$, where each element represents the height of a vertical partition. Any two partitions in the array, together with the space between them, can form a container.

    The capacity of the container equals the product of its height and width (that is, its area), where the height is determined by the shorter partition and the width is the difference between the array indices of the two partitions.

    Select two partitions in the array such that the capacity of the resulting container is maximized, and return that maximum capacity. An example is shown in the figure below.

![Example data for the max capacity problem](max_capacity_problem.assets/max_capacity_example.png)

The container is formed by any two partitions, **so the state of this problem is the indices of the two partitions, denoted by $[i, j]$**.

According to the problem statement, capacity equals height multiplied by width, where the height is determined by the shorter partition and the width is the difference between the array indices of the two partitions. Let the capacity be $cap[i, j]$; then we obtain the following formula:

$$
cap[i, j] = \\min(ht[i], ht[j]) \\times (j - i)
$$

Let the array length be $n$. Then the number of ways to choose two partitions (that is, the total number of states) is $C_n^2 = \\frac{n(n - 1)}{2}$. The most straightforward approach is to **exhaustively enumerate all states** to find the maximum capacity, which has a time complexity of $O(n^2)$.

### Greedy Strategy Determination

This problem has a more efficient solution. As shown in the figure below, consider a state $[i, j]$ where $i < j$ and $ht[i] < ht[j]$. In this case, $i$ is the shorter partition and $j$ is the taller partition.

![Initial state](max_capacity_problem.assets/max_capacity_initial_state.png)

As shown in the figure below, **if we now move the taller partition $j$ inward toward the shorter partition $i$, the capacity will definitely decrease**.

This is because after moving the taller partition $j$, the width $j-i$ definitely decreases. Since the height is determined by the shorter partition, the height can only stay the same ($i$ remains the shorter partition) or decrease ($j$ becomes the shorter partition after being moved).

![State after moving the long partition inward](max_capacity_problem.assets/max_capacity_moving_long_board.png)

Conversely, **only by moving the shorter partition $i$ inward can the capacity possibly increase**. Although the width will definitely decrease, **the height may increase** (the moved partition at $i$ may be taller). For example, in the figure below, the area increases after moving the shorter partition.

![State after moving the short partition inward](max_capacity_problem.assets/max_capacity_moving_short_board.png)

From this, we can derive the greedy strategy for this problem: initialize two pointers at the two ends, and in each round move the pointer corresponding to the shorter partition inward until the two pointers meet.

The figure below shows the execution process of the greedy strategy.

1. In the initial state, pointers $i$ and $j$ are at both ends of the array.
2. Calculate the capacity of the current state $cap[i, j]$, and update the maximum capacity.
3. Compare the heights of partitions $i$ and $j$, and move the pointer corresponding to the shorter partition inward by one position.
4. Repeat steps \`2.\` and \`3.\` until $i$ and $j$ meet.

=== "<1>"
    ![Greedy process for the max capacity problem](max_capacity_problem.assets/max_capacity_greedy_step1.png)

=== "<2>"
    ![max_capacity_greedy_step2](max_capacity_problem.assets/max_capacity_greedy_step2.png)

=== "<3>"
    ![max_capacity_greedy_step3](max_capacity_problem.assets/max_capacity_greedy_step3.png)

=== "<4>"
    ![max_capacity_greedy_step4](max_capacity_problem.assets/max_capacity_greedy_step4.png)

=== "<5>"
    ![max_capacity_greedy_step5](max_capacity_problem.assets/max_capacity_greedy_step5.png)

=== "<6>"
    ![max_capacity_greedy_step6](max_capacity_problem.assets/max_capacity_greedy_step6.png)

=== "<7>"
    ![max_capacity_greedy_step7](max_capacity_problem.assets/max_capacity_greedy_step7.png)

=== "<8>"
    ![max_capacity_greedy_step8](max_capacity_problem.assets/max_capacity_greedy_step8.png)

=== "<9>"
    ![max_capacity_greedy_step9](max_capacity_problem.assets/max_capacity_greedy_step9.png)

### Code Implementation

The code runs for at most $n$ rounds, **so the time complexity is $O(n)$**.

Variables $i$, $j$, and $res$ use only a constant amount of extra space, **so the space complexity is $O(1)$**.

\`\`\`src
[file]{max_capacity}-[class]{}-[func]{max_capacity}
\`\`\`

### Correctness Proof

The reason greedy is faster than exhaustive enumeration is that each round of greedy selection "skips" some states.

For example, in state $cap[i, j]$, suppose $i$ is the shorter partition and $j$ is the taller partition. If we greedily move the shorter partition $i$ inward by one position, the states shown in the figure below will be "skipped." **This means that their capacities can no longer be checked later**.

$$
cap[i, i+1], cap[i, i+2], \\dots, cap[i, j-2], cap[i, j-1]
$$

![States skipped by moving the short partition](max_capacity_problem.assets/max_capacity_skipped_states.png)

A closer look shows that **these skipped states are exactly the states obtained by moving the taller partition $j$ inward**. We have already proven that moving the taller partition inward will definitely decrease the capacity. Therefore, none of the skipped states can be the optimal solution, **so skipping them does not cause us to miss the optimum**.

The above analysis shows that moving the shorter partition is a "safe" operation, and that the greedy strategy is effective.

`
  },

  'dsa-max-product-cutting': {
    title: '15.4 Bài toán Cắt tích lớn nhất',
    summary: 'Tách một số nguyên dương thành tổng các số nguyên sao cho tích của chúng lớn nhất. Suy luận hai chiến lược tham lam: tách hết các thừa số ≥ 4, và ưu tiên tách thành 3.',
    tags: ['dsa', 'greedy', 'math', 'number-theory'],
    domain: 'Algorithms',
    module: 'Chương 15: Tham lam',
    prerequisites: ['dsa-max-capacity'],
    related: ['dsa-greedy-summary'],
    updatedAt: '2026-07-19',
    readTime: '10 phút',
    content: `

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một số nguyên dương $n$, hãy tách nó thành tổng của ít nhất hai số nguyên dương và tìm tích lớn nhất của các số nguyên thu được, như minh họa trong hình dưới đây.</p>
  </div>
</div>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/max_product_cutting_definition.png" alt="Định nghĩa bài toán cắt tích lớn nhất" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Giả sử ta tách $n$ thành $m$ thừa số nguyên, trong đó thừa số thứ $i$ ký hiệu là $n_i$, tức là</p>
<p>$$n = \\sum_{i=1}^{m}n_i$$</p>
<p>Mục tiêu của bài toán này là tìm tích lớn nhất của tất cả các thừa số nguyên, cụ thể là</p>
<p>$$\\max(\\prod_{i=1}^{m}n_i)$$</p>
<p>Ta cần xác định có bao nhiêu phần $m$ và mỗi $n_i$ nên bằng bao nhiêu.</p>

<h2>15.4.1 Xác định Chiến lược Tham lam</h2>
<p>Theo kinh nghiệm, tích của hai số nguyên thường lớn hơn tổng của chúng. Giả sử ta tách ra một thừa số $2$ từ $n$; tích thu được là $2(n-2)$. Ta so sánh tích này với $n$:</p>
<p>$$
\\begin{aligned}
2(n-2) & \\geq n \\newline
2n - n - 4 & \\geq 0 \\newline
n & \\geq 4
\\end{aligned}
$$</p>
<p>Như minh họa trong hình dưới đây, khi $n \\geq 4$, việc tách ra một thừa số $2$ sẽ làm tăng tích, <strong>điều này cho thấy các số nguyên lớn hơn hoặc bằng $4$ đều nên được tách tiếp</strong>.</p>
<p><strong>Chiến lược tham lam một</strong>: Nếu phương án tách chứa một thừa số $\\geq 4$, nó nên được tách thêm nữa. Phương án tách cuối cùng chỉ nên chứa các thừa số $1$, $2$, và $3$.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/max_product_cutting_greedy_infer1.png" alt="Việc tách làm tăng tích" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Tiếp theo, xét xem thừa số nào là tối ưu. Trong ba thừa số $1$, $2$, và $3$, rõ ràng $1$ là tệ nhất, vì $1 \\times (n-1) < n$ luôn đúng, nghĩa là tách ra $1$ thực sự làm giảm tích.</p>
<p>Như minh họa trong hình dưới đây, khi $n = 6$, ta có $3 \\times 3 > 2 \\times 2 \\times 2$. <strong>Điều này có nghĩa là tách ra $3$ tốt hơn tách ra $2$</strong>.</p>
<p><strong>Chiến lược tham lam hai</strong>: Trong phương án tách, nên có tối đa hai số $2$, vì ba số $2$ luôn có thể được thay bằng hai số $3$ để có tích lớn hơn.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/max_product_cutting_greedy_infer2.png" alt="Thừa số tách tối ưu" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p>Tóm lại, ta có thể suy ra các chiến lược tham lam sau.</p>
<ol>
  <li>Nhập số nguyên $n$, liên tục tách ra thừa số $3$ cho đến khi phần dư là $0$, $1$, hoặc $2$.</li>
  <li>Khi phần dư là $0$, nghĩa là $n$ là bội số của $3$, nên không cần thao tác gì thêm.</li>
  <li>Khi phần dư là $2$, không cần tách thêm; giữ nguyên nó.</li>
  <li>Khi phần dư là $1$, vì $2 \\times 2 > 1 \\times 3$, thay thừa số $3$ cuối cùng và phần dư $1$ còn lại bằng hai số $2$.</li>
</ol>

<h2>15.4.2 Triển khai Mã</h2>
<p>Như minh họa trong hình dưới đây, ta không cần vòng lặp để tách số nguyên. Thay vào đó, ta dùng phép chia nguyên để lấy số lượng số $3$, ký hiệu $a$, và phép chia lấy dư để lấy phần dư $b$, cho ra:</p>
<p>$$n = 3 a + b$$</p>
<p>Lưu ý rằng với trường hợp biên $n \\leq 3$, bắt buộc phải tách ra một số $1$, với tích $1 \\times (n - 1)$.</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Cắt dây thừng: Thuật toán Tham lam */
public static int maxProductCutting(int n) {
    // Khi n &lt;= 3, bắt buộc phải cắt ra một đoạn 1
    if (n &lt;= 3) {
        return 1 * (n - 1);
    }
    // Tham lam cắt ra đoạn 3, a là số lượng đoạn 3, b là phần dư
    int a = n / 3;
    int b = n % 3;
    if (b == 1) {
        // Khi phần dư là 1, chuyển 1 cặp 1 * 3 thành 2 * 2
        return (int) Math.pow(3, a - 1) * 2 * 2;
    }
    if (b == 2) {
        // Khi phần dư là 2, không cần làm gì thêm
        return (int) Math.pow(3, a) * 2;
    }
    // Khi phần dư là 0, không cần làm gì thêm
    return (int) Math.pow(3, a);
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func maxProductCutting(n: Int) -&gt; Int {
    // When n &lt;= 3, must cut out a 1
    if n &lt;= 3 {
        return 1 * (n - 1)
    }
    // Greedily cut out 3, a is the number of 3s, b is the remainder
    let a = n / 3
    let b = n % 3
    if b == 1 {
        // When the remainder is 1, convert a pair of 1 * 3 to 2 * 2
        return pow(3, a - 1) * 2 * 2
    }
    if b == 2 {
        // When the remainder is 2, do nothing
        return pow(3, a) * 2
    }
    // When the remainder is 0, do nothing
    return pow(3, a)
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int maxProductCutting(int n) {
  // When n &lt;= 3, must cut out a 1
  if (n &lt;= 3) {
    return 1 * (n - 1);
  }
  // Greedily cut out 3, a is the number of 3s, b is the remainder
  int a = n ~/ 3;
  int b = n % 3;
  if (b == 1) {
    // When the remainder is 1, convert a pair of 1 * 3 to 2 * 2
    return (pow(3, a - 1) * 2 * 2).toInt();
  }
  if (b == 2) {
    // When the remainder is 2, do nothing
    return (pow(3, a) * 2).toInt();
  }
  // When the remainder is 0, do nothing
  return pow(3, a).toInt();
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def max_product_cutting(n: int) -&gt; int:
    """Cắt dây thừng: Thuật toán Tham lam"""
    # Khi n &lt;= 3, bắt buộc phải cắt ra một đoạn 1
    if n &lt;= 3:
        return 1 * (n - 1)
    # Tham lam cắt ra đoạn 3, a là số lượng đoạn 3, b là phần dư
    a, b = n // 3, n % 3
    if b == 1:
        # Khi phần dư là 1, chuyển 1 cặp 1 * 3 thành 2 * 2
        return int(math.pow(3, a - 1)) * 2 * 2
    if b == 2:
        # Khi phần dư là 2, không cần làm gì thêm
        return int(math.pow(3, a)) * 2
    # Khi phần dư là 0, không cần làm gì thêm
    return int(math.pow(3, a))</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Cắt dây thừng: Thuật toán Tham lam */
int maxProductCutting(int n) {
    // Khi n &lt;= 3, bắt buộc phải cắt ra một đoạn 1
    if (n &lt;= 3) {
        return 1 * (n - 1);
    }
    // Tham lam cắt ra đoạn 3, a là số lượng đoạn 3, b là phần dư
    int a = n / 3;
    int b = n % 3;
    if (b == 1) {
        // Khi phần dư là 1, chuyển 1 cặp 1 * 3 thành 2 * 2
        return (int)pow(3, a - 1) * 2 * 2;
    }
    if (b == 2) {
        // Khi phần dư là 2, không cần làm gì thêm
        return (int)pow(3, a) * 2;
    }
    // Khi phần dư là 0, không cần làm gì thêm
    return (int)pow(3, a);
}</code></pre></div></div></div>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/max_product_cutting_greedy_calculation.png" alt="Phương pháp tính toán cho bài toán cắt tích lớn nhất" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<p><strong>Độ phức tạp thời gian phụ thuộc vào cách lũy thừa được triển khai trong ngôn ngữ lập trình</strong>. Lấy Python làm ví dụ, có ba cách thường dùng để tính lũy thừa.</p>
<ul>
  <li>Cả toán tử <code>**</code> và hàm <code>pow()</code> đều có độ phức tạp thời gian $O(\\log⁡ a)$.</li>
  <li>Hàm <code>math.pow()</code> nội bộ gọi hàm <code>pow()</code> của thư viện C, thực hiện lũy thừa số thực dấu phẩy động, với độ phức tạp thời gian $O(1)$.</li>
</ul>
<p>Các biến $a$ và $b$ dùng một lượng không gian bổ sung không đổi, <strong>vì vậy độ phức tạp không gian là $O(1)$</strong>.</p>

<h2>15.4.3 Chứng minh Tính đúng đắn</h2>
<p>Ta dùng phương pháp phản chứng và chỉ xét trường hợp $n \\geq 4$.</p>
<ol>
  <li><strong>Tất cả thừa số $\\leq 3$</strong>: Giả sử phương án tách tối ưu chứa một thừa số $x \\geq 4$. Khi đó nó có thể được tách thêm thành $2(x-2)$ để thu được tích lớn hơn (hoặc bằng). Điều này mâu thuẫn với giả định.</li>
  <li><strong>Phương án tách không chứa $1$</strong>: Giả sử phương án tách tối ưu chứa một thừa số $1$. Khi đó nó có thể được gộp vào một thừa số khác để thu được tích lớn hơn. Điều này mâu thuẫn với giả định.</li>
  <li><strong>Phương án tách chứa tối đa hai số $2$</strong>: Giả sử phương án tách tối ưu chứa ba số $2$. Khi đó chúng có thể được thay bằng hai số $3$, cho ra tích lớn hơn. Điều này mâu thuẫn với giả định.</li>
</ol>

<h2>15.4.4 Mô phỏng tương tác</h2>
<div class="interactive-widget-wrapper" id="max-product-cutting-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'max-product-cutting-wrapper', 'tab-static')">📸 Giới thiệu</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'max-product-cutting-wrapper', 'tab-interactive'); initMaxProductCuttingDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding:1em;">Chuyển sang tab "Mô phỏng tương tác" để xem từng bước tính toán <code>a = n // 3</code>, <code>b = n % 3</code> cho $n=58$ (giống ví dụ mã nguồn thực tế), cùng với trường hợp biên $n \\leq 3$.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="max-product-cutting-btn-mode1" class="control-btn" onclick="setMaxProductCuttingMode(58)">n = 58</button>
      <button id="max-product-cutting-btn-mode2" class="control-btn btn-secondary" onclick="setMaxProductCuttingMode(10)">n = 10</button>
      <button id="max-product-cutting-btn-mode3" class="control-btn btn-secondary" onclick="setMaxProductCuttingMode(2)">n = 2 (biên)</button>
    </div>
    <div id="max-product-cutting-canvas" style="padding: 1em 0; font-family: var(--font-mono); font-size: 15px; line-height: 1.8;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; padding: 0.5em 0;">
      <button id="max-product-cutting-btn-autorun" class="control-btn" onclick="autoRunMaxProductCutting()">▶ Auto Run</button>
      <button id="max-product-cutting-btn-step" class="control-btn btn-secondary" onclick="stepMaxProductCutting()">Bước tiếp theo ▶</button>
      <button id="max-product-cutting-btn-pause" class="control-btn btn-secondary" onclick="pauseRunMaxProductCutting()" disabled>⏸ Dừng</button>
      <button id="max-product-cutting-btn-reset" class="control-btn btn-secondary" onclick="initMaxProductCuttingDemo()">↺ Reset</button>
    </div>
    <div style="padding: 0.5em 0;">
      Tốc độ: <input type="range" min="300" max="2000" value="900" step="100" oninput="setMaxProductCuttingSpeed(this.value)" /> <span id="max-product-cutting-speed-label">900ms</span>
    </div>
    <div id="max-product-cutting-status" class="simulator-status" style="padding: 0.75em; background: var(--bg-secondary); border-radius: var(--radius-md);">Nhấp "Auto Run" hoặc "Bước tiếp theo" để bắt đầu mô phỏng.</div>
  </div>
</div>

`,
    originalContent: `
# Maximum Product Cutting Problem

!!! question

    Given a positive integer $n$, split it into the sum of at least two positive integers and find the maximum product of the resulting integers, as shown in the figure below.

![Problem definition of max product cutting](max_product_cutting_problem.assets/max_product_cutting_definition.png)

Suppose we split $n$ into $m$ integer factors, where the $i$-th factor is denoted as $n_i$, that is

$$
n = \\sum_{i=1}^{m}n_i
$$

The goal of this problem is to find the maximum product of all integer factors, namely

$$
\\max(\\prod_{i=1}^{m}n_i)
$$

We need to determine how many parts $m$ there should be and what each $n_i$ should be.

### Determining the Greedy Strategy

As a rule of thumb, the product of two integers is often greater than their sum. Suppose we split off a factor of $2$ from $n$; the resulting product is $2(n-2)$. We compare this product with $n$:

$$
\\begin{aligned}
2(n-2) & \\geq n \\newline
2n - n - 4 & \\geq 0 \\newline
n & \\geq 4
\\end{aligned}
$$

As shown in the figure below, when $n \\geq 4$, splitting out a $2$ will increase the product, **which indicates that integers greater than or equal to $4$ should all be split**.

**Greedy strategy one**: If the splitting scheme contains a factor $\\geq 4$, it should be split further. The final splitting scheme should contain only the factors $1$, $2$, and $3$.

![Splitting causes product to increase](max_product_cutting_problem.assets/max_product_cutting_greedy_infer1.png)

Next, consider which factor is optimal. Among the three factors $1$, $2$, and $3$, clearly $1$ is the worst, because $1 \\times (n-1) < n$ always holds, meaning splitting out $1$ will actually decrease the product.

As shown in the figure below, when $n = 6$, we have $3 \\times 3 > 2 \\times 2 \\times 2$. **This means that splitting out $3$ is better than splitting out $2$**.

**Greedy strategy two**: In the splitting scheme, there should be at most two $2$s, because three $2$s can always be replaced by two $3$s to obtain a larger product.

![Optimal splitting factor](max_product_cutting_problem.assets/max_product_cutting_greedy_infer2.png)

In summary, the following greedy strategies can be derived.

1. Input integer $n$, continuously split out factor $3$ until the remainder is $0$, $1$, or $2$.
2. When the remainder is $0$, it means $n$ is a multiple of $3$, so no further action is needed.
3. When the remainder is $2$, do not split it further; keep it as is.
4. When the remainder is $1$, since $2 \\times 2 > 1 \\times 3$, replace the final $3$ and the remaining $1$ with two $2$s.

### Code Implementation

As shown in the figure below, we do not need loops to split the integer. Instead, we use integer division to obtain the number of $3$s, denoted by $a$, and the modulo operation to obtain the remainder $b$, giving:

$$
n = 3 a + b
$$

Please note that for the edge case of $n \\leq 3$, a $1$ must be split out, with product $1 \\times (n - 1)$.

\`\`\`src
[file]{max_product_cutting}-[class]{}-[func]{max_product_cutting}
\`\`\`

![Calculation method for max product cutting](max_product_cutting_problem.assets/max_product_cutting_greedy_calculation.png)

**The time complexity depends on how exponentiation is implemented in the programming language**. Taking Python as an example, there are three commonly used ways to compute powers.

- Both the operator \`**\` and the function \`pow()\` have time complexity $O(\\log⁡ a)$.
- The function \`math.pow()\` internally calls the C library's \`pow()\` function, which performs floating-point exponentiation, with time complexity $O(1)$.

Variables $a$ and $b$ use a constant amount of extra space, **therefore the space complexity is $O(1)$**.

### Correctness Proof

We use proof by contradiction and consider only the case where $n \\geq 4$.

1. **All factors $\\leq 3$**: Suppose the optimal splitting scheme includes a factor $x \\geq 4$. Then it can be further split into $2(x-2)$ to obtain a larger (or equal) product. This contradicts the assumption.
2. **The splitting scheme does not contain $1$**: Suppose the optimal splitting scheme includes a factor of $1$. Then it can be merged into another factor to obtain a larger product. This contradicts the assumption.
3. **The splitting scheme contains at most two $2$s**: Suppose the optimal splitting scheme includes three $2$s. Then they can be replaced by two $3$s, yielding a larger product. This contradicts the assumption.

`
  },

  'dsa-greedy-summary': {
    title: 'Tóm tắt & Hỏi đáp',
    summary: 'Nhìn lại triết lý của Tham lam: tính chất lựa chọn tham lam, cấu trúc con tối ưu, và ba bước giải bài toán tham lam qua các ví dụ Cái túi phân số, Chứa nước nhiều nhất, Cắt tích lớn nhất.',
    tags: ['dsa', 'greedy', 'summary'],
    domain: 'Algorithms',
    module: 'Chương 15: Tham lam',
    prerequisites: ['dsa-max-product-cutting'],
    related: ['dsa-appendix-index'],
    updatedAt: '2026-07-19',
    readTime: '5 phút',
    content: `

<h2>Điểm lại kiến thức chính</h2>
<ul>
  <li>Thuật toán tham lam thường được dùng để giải các bài toán tối ưu hóa. Nguyên tắc là đưa ra quyết định tối ưu cục bộ ở mỗi giai đoạn ra quyết định với hy vọng đạt được lời giải tối ưu toàn cục.</li>
  <li>Thuật toán tham lam liên tục đưa ra hết lựa chọn tham lam này đến lựa chọn tham lam khác, biến bài toán thành một bài toán con nhỏ hơn ở mỗi vòng, cho đến khi giải quyết xong bài toán.</li>
  <li>Thuật toán tham lam không chỉ dễ triển khai, mà còn có hiệu suất giải quyết bài toán cao. So với quy hoạch động, thuật toán tham lam thường có độ phức tạp thời gian thấp hơn.</li>
  <li>Trong bài toán đổi tiền, với một số tổ hợp đồng xu nhất định, thuật toán tham lam có thể đảm bảo tìm ra lời giải tối ưu; tuy nhiên với các tổ hợp đồng xu khác, thuật toán tham lam có thể tìm ra lời giải rất tệ.</li>
  <li>Các bài toán phù hợp để giải bằng thuật toán tham lam có hai tính chất lớn: tính chất lựa chọn tham lam và cấu trúc con tối ưu. Tính chất lựa chọn tham lam thể hiện tính hiệu quả của chiến lược tham lam.</li>
  <li>Với một số bài toán phức tạp, việc chứng minh tính chất lựa chọn tham lam không hề đơn giản. Tương đối mà nói, việc bác bỏ nó lại dễ hơn, như trong bài toán đổi tiền.</li>
  <li>Giải bài toán tham lam chủ yếu gồm ba bước: phân tích bài toán, xác định chiến lược tham lam, và chứng minh tính đúng đắn. Trong đó, xác định chiến lược tham lam là bước cốt lõi, còn chứng minh tính đúng đắn thường là khó khăn chính.</li>
  <li>Bài toán cái túi phân số, dựa trên bài toán cái túi 0-1, cho phép chọn một phần của vật phẩm, do đó có thể giải bằng thuật toán tham lam. Tính đúng đắn của chiến lược tham lam có thể được chứng minh bằng phản chứng.</li>
  <li>Bài toán chứa nước nhiều nhất có thể được giải bằng liệt kê vét cạn với độ phức tạp thời gian $O(n^2)$. Bằng cách thiết kế một chiến lược tham lam di chuyển vách ngắn hơn vào trong ở mỗi vòng, độ phức tạp thời gian có thể được tối ưu xuống $O(n)$.</li>
  <li>Trong bài toán cắt tích lớn nhất, ta lần lượt suy ra hai chiến lược tham lam: các số nguyên $\\geq 4$ đều nên tiếp tục được tách, và thừa số tách tối ưu là $3$. Đoạn mã bao gồm các phép toán lũy thừa, và độ phức tạp thời gian phụ thuộc vào cách triển khai lũy thừa, thường là $O(1)$ hoặc $O(\\log n)$.</li>
</ul>

`,
    originalContent: `
# Summary

### Key Review

- Greedy algorithms are typically used to solve optimization problems. The principle is to make locally optimal decisions at each decision stage in hopes of obtaining a globally optimal solution.
- Greedy algorithms iteratively make one greedy choice after another, transforming the problem into a smaller subproblem in each round, until the problem is solved.
- Greedy algorithms are not only simple to implement, but also have high problem-solving efficiency. Compared to dynamic programming, greedy algorithms typically have lower time complexity.
- In the coin change problem, for certain coin combinations, greedy algorithms can guarantee finding the optimal solution; for other coin combinations, however, greedy algorithms may find very poor solutions.
- Problems suitable for solving with greedy algorithms have two major properties: greedy choice property and optimal substructure. The greedy choice property represents the effectiveness of the greedy strategy.
- For some complex problems, proving the greedy choice property is not simple. Relatively speaking, disproving it is easier, such as in the coin change problem.
- Solving greedy problems mainly consists of three steps: problem analysis, determining the greedy strategy, and correctness proof. Among these, determining the greedy strategy is the core step, and correctness proof is often the main difficulty.
- The fractional knapsack problem, based on the 0-1 knapsack problem, allows selecting fractions of items, and therefore can be solved using greedy algorithms. The correctness of the greedy strategy can be proven using proof by contradiction.
- The max capacity problem can be solved using exhaustive enumeration with time complexity $O(n^2)$. By designing a greedy strategy to move the shorter side inward in each round, the time complexity can be optimized to $O(n)$.
- In the max product cutting problem, we successively derive two greedy strategies: integers $\\geq 4$ should all continue to be split, and the optimal splitting factor is $3$. The code includes exponentiation operations, and the time complexity depends on the implementation method of exponentiation, typically being $O(1)$ or $O(\\log n)$.

`
  },

});
