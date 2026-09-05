/* ============================================================
   Knowledge OS — DSA Module: Chương 9 - Đồ thị (Graph)
   ============================================================ */

Object.assign(DSA_CONTENT, {

  'dsa-graph-index': {
    title: 'Đồ thị (Graph)',
    summary: 'Giới thiệu về Đồ thị (Graph) - cấu trúc dữ liệu mô hình hóa các mối quan hệ mạng lưới phức tạp như mạng xã hội, bản đồ đường đi.',
    tags: ['dsa', 'graph', 'network'],
    domain: 'Algorithms',
    module: 'Chương 9: Đồ thị',
    prerequisites: ['dsa-heap-summary'],
    related: ['dsa-graph'],
    updatedAt: '2026-07-19',
    readTime: '1 phút',
    content: `

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/chapter_graph.jpg" alt="Đồ thị (Graph)" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<div class="callout callout-note">
  <span class="callout-icon">✨</span>
  <div class="callout-body">
    <p>Trong hành trình cuộc đời, chúng ta cũng giống như những nút, được kết nối với nhau bởi vô số cạnh vô hình.</p>
    <p>Mỗi cuộc gặp gỡ và chia ly đều để lại một dấu ấn riêng biệt trên tấm bản đồ mạng lưới rộng lớn này.</p>
  </div>
</div>

`,
    originalContent: `

# Graph

![Graph](../assets/covers/chapter_graph.jpg)

!!! abstract

    In the journey of life, we are like nodes, connected by countless invisible edges.

    Each encounter and parting leaves a unique mark on this vast network graph.

`
  },

  'dsa-graph': {
    title: '9.1 Cấu trúc dữ liệu Đồ thị',
    summary: 'Khái niệm về Đồ thị, các thuật ngữ cơ bản, phân loại (Đồ thị có hướng/vô hướng, có trọng số/không trọng số) và cách biểu diễn đồ thị bằng Ma trận kề và Danh sách kề.',
    tags: ['dsa', 'graph', 'adjacency-matrix', 'adjacency-list'],
    domain: 'Algorithms',
    module: 'Chương 9: Đồ thị',
    prerequisites: ['dsa-graph-index'],
    related: ['dsa-graph-operations'],
    updatedAt: '2026-07-19',
    readTime: '12 phút',
    content: `

<p><strong>Đồ thị (Graph)</strong> là một cấu trúc dữ liệu phi tuyến tính bao gồm các <strong>đỉnh (vertices)</strong> và <strong>cạnh (edges)</strong>. Ta có thể biểu diễn một đồ thị $G$ một cách trừu tượng bằng một tập hợp các đỉnh $V$ và một tập hợp các cạnh $E$. Ví dụ dưới đây minh họa một đồ thị gồm 5 đỉnh và 7 cạnh.</p>

$$
\\begin{aligned}
V & = \\{ 1, 2, 3, 4, 5 \\} \\newline
E & = \\{ (1,2), (1,3), (1,5), (2,3), (2,4), (2,5), (4,5) \\} \\newline
G & = \\{ V, E \\} \\newline
\\end{aligned}
$$

<p>Nếu xem các đỉnh là các nút (node) và các cạnh là các tham chiếu (con trỏ) kết nối chúng, ta có thể coi đồ thị là một sự mở rộng của cấu trúc dữ liệu danh sách liên kết. Như minh họa trong hình dưới đây, <strong>so với mối quan hệ tuyến tính (danh sách liên kết) và mối quan hệ chia để trị (cây), mối quan hệ mạng lưới (đồ thị) có mức độ tự do cao hơn và do đó phức tạp hơn</strong>.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/linkedlist_tree_graph.png" alt="Mối quan hệ giữa danh sách liên kết, cây và đồ thị" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h2>9.1.1 Các loại đồ thị thường gặp và thuật ngữ</h2>

<p>Đồ thị có thể được chia thành <u>đồ thị vô hướng (undirected graph)</u> và <u>đồ thị có hướng (directed graph)</u> tùy theo việc các cạnh có hướng hay không, như minh họa trong hình dưới đây.</p>

<ul>
  <li>Trong đồ thị vô hướng, các cạnh biểu diễn một kết nối "hai chiều" giữa hai đỉnh, chẳng hạn như mối quan hệ bạn bè trên WeChat hoặc QQ.</li>
  <li>Trong đồ thị có hướng, các cạnh có tính định hướng, nghĩa là cạnh $A \\rightarrow B$ và $A \\leftarrow B$ là độc lập với nhau, chẳng hạn như mối quan hệ theo dõi (follow) và người theo dõi (follower) trên Weibo hoặc TikTok.</li>
</ul>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/directed_graph.png" alt="Đồ thị có hướng và vô hướng" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Đồ thị có thể được chia thành <u>đồ thị liên thông (connected graph)</u> và <u>đồ thị không liên thông (disconnected graph)</u> tùy theo việc tất cả các đỉnh có được kết nối hay không, như minh họa trong hình dưới đây.</p>

<ul>
  <li>Đối với đồ thị liên thông, xuất phát từ bất kỳ đỉnh nào, ta đều có thể đi tới tất cả các đỉnh khác.</li>
  <li>Đối với đồ thị không liên thông, xuất phát từ một đỉnh nhất định, có ít nhất một đỉnh không thể đi tới được.</li>
</ul>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/connected_graph.png" alt="Đồ thị liên thông và không liên thông" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Ta cũng có thể thêm một biến "trọng số" vào các cạnh, tạo ra <u>đồ thị có trọng số (weighted graph)</u> như minh họa trong hình dưới đây. Ví dụ, trong các trò chơi di động như "Liên Quân Mobile", hệ thống tính toán "độ thân thiết" giữa những người chơi dựa trên thời gian họ chơi cùng nhau, và các mạng lưới độ thân thiết như vậy có thể được biểu diễn bằng đồ thị có trọng số.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/weighted_graph.png" alt="Đồ thị có trọng số và không có trọng số" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Cấu trúc dữ liệu đồ thị bao gồm các thuật ngữ thường dùng sau đây.</p>

<ul>
  <li><u>Kề nhau (Adjacency)</u>: Khi hai đỉnh được nối với nhau bởi một cạnh, hai đỉnh này được gọi là "kề nhau". Trong hình trên, các đỉnh kề của đỉnh 1 là đỉnh 2, 3 và 5.</li>
  <li><u>Đường đi (Path)</u>: Dãy các cạnh đi từ đỉnh A đến đỉnh B được gọi là "đường đi" từ A đến B. Trong hình trên, dãy cạnh 1-5-2-4 là một đường đi từ đỉnh 1 đến đỉnh 4.</li>
  <li><u>Bậc (Degree)</u>: Số lượng cạnh mà một đỉnh có. Đối với đồ thị có hướng, <u>bậc vào (in-degree)</u> chỉ số cạnh trỏ vào đỉnh đó, còn <u>bậc ra (out-degree)</u> chỉ số cạnh đi ra khỏi đỉnh đó.</li>
</ul>

<h2>9.1.2 Biểu diễn đồ thị</h2>

<p>Các cách biểu diễn đồ thị thường dùng gồm "ma trận kề" và "danh sách kề". Dưới đây sử dụng đồ thị vô hướng làm ví dụ.</p>

<h3>9.1.2.1 Ma trận kề</h3>

<p>Cho một đồ thị có $n$ đỉnh, <u>ma trận kề (adjacency matrix)</u> sử dụng một ma trận $n \\times n$ để biểu diễn đồ thị, trong đó mỗi hàng (cột) đại diện cho một đỉnh, và các phần tử của ma trận đại diện cho các cạnh, sử dụng $1$ hoặc $0$ để chỉ ra liệu có tồn tại cạnh giữa hai đỉnh hay không.</p>

<p>Như minh họa trong hình dưới đây, gọi ma trận kề là $M$ và danh sách đỉnh là $V$. Khi đó phần tử ma trận $M[i, j] = 1$ chỉ ra rằng tồn tại một cạnh giữa đỉnh $V[i]$ và đỉnh $V[j]$, còn $M[i, j] = 0$ chỉ ra rằng không có cạnh giữa hai đỉnh đó.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/adjacency_matrix.png" alt="Biểu diễn đồ thị bằng ma trận kề" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Ma trận kề có các tính chất sau.</p>

<ul>
  <li>Trong đồ thị đơn giản, các đỉnh không thể tự kết nối với chính mình, do đó các phần tử trên đường chéo chính của ma trận kề không có ý nghĩa.</li>
  <li>Đối với đồ thị vô hướng, các cạnh theo cả hai hướng là tương đương nhau, do đó ma trận kề đối xứng qua đường chéo chính.</li>
  <li>Thay thế các giá trị $1$ và $0$ trong ma trận kề bằng trọng số cho phép nó biểu diễn đồ thị có trọng số.</li>
</ul>

<p>Khi sử dụng ma trận kề để biểu diễn đồ thị, ta có thể truy cập trực tiếp các phần tử của ma trận để lấy các cạnh, dẫn đến các thao tác thêm, xóa, tìm kiếm và sửa đổi có hiệu suất cao, đều với độ phức tạp thời gian $O(1)$. Tuy nhiên, độ phức tạp không gian của ma trận là $O(n^2)$, tiêu tốn khá nhiều bộ nhớ.</p>

<h3>9.1.2.2 Danh sách kề</h3>

<p><u>Danh sách kề (adjacency list)</u> sử dụng $n$ danh sách liên kết để biểu diễn đồ thị, với các nút danh sách liên kết đại diện cho các đỉnh. Danh sách liên kết thứ $i$ tương ứng với đỉnh $i$ và lưu trữ tất cả các đỉnh kề của đỉnh đó (các đỉnh được kết nối với đỉnh này). Hình dưới đây thể hiện một ví dụ về đồ thị được lưu trữ bằng danh sách kề.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/adjacency_list.png" alt="Biểu diễn đồ thị bằng danh sách kề" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<p>Danh sách kề chỉ lưu trữ các cạnh thực sự tồn tại, và tổng số cạnh thường ít hơn nhiều so với $n^2$, giúp tiết kiệm không gian hơn. Tuy nhiên, việc tìm kiếm cạnh trong danh sách kề đòi hỏi phải duyệt qua danh sách liên kết, vì vậy hiệu suất thời gian kém hơn so với ma trận kề.</p>

<p>Như minh họa trong hình trên, <strong>cấu trúc của danh sách kề rất giống với phương pháp nối chuỗi riêng biệt (separate chaining) trong bảng băm, do đó ta có thể sử dụng các phương pháp tương tự để cải thiện hiệu suất</strong>. Ví dụ, khi một danh sách liên kết trở nên dài, nó có thể được chuyển đổi thành cây AVL hoặc cây đỏ đen, cải thiện độ phức tạp thời gian từ $O(n)$ xuống $O(\\log n)$; nó cũng có thể được chuyển đổi thành bảng băm, giảm độ phức tạp thời gian xuống $O(1)$.</p>

<h2>9.1.3 Ứng dụng thường gặp của Đồ thị</h2>

<p>Như trong bảng dưới đây, nhiều hệ thống thực tế có thể được mô hình hóa bằng đồ thị, và các bài toán tương ứng có thể được quy về các bài toán tính toán trên đồ thị.</p>

<p align="center">Bảng &nbsp; Các đồ thị thường gặp trong đời sống</p>
<table style="width:100%; border-collapse:collapse; margin:1.5em 0; border: 1px solid var(--border-color);">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px; font-weight:600;"></th>
      <th style="padding:10px; font-weight:600;">Đỉnh</th>
      <th style="padding:10px; font-weight:600;">Cạnh</th>
      <th style="padding:10px; font-weight:600;">Bài toán tính toán trên đồ thị</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;">Mạng xã hội</td><td style="padding:10px;">Người dùng</td><td style="padding:10px;">Mối quan hệ bạn bè</td><td style="padding:10px;">Gợi ý bạn bè tiềm năng</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;">Tuyến tàu điện ngầm</td><td style="padding:10px;">Ga tàu</td><td style="padding:10px;">Kết nối giữa các ga</td><td style="padding:10px;">Gợi ý lộ trình ngắn nhất</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;">Hệ mặt trời</td><td style="padding:10px;">Thiên thể</td><td style="padding:10px;">Lực hấp dẫn giữa các thiên thể</td><td style="padding:10px;">Tính toán quỹ đạo hành tinh</td></tr>
  </tbody>
</table>

`,
    originalContent: `

# Graph

A <u>graph</u> is a nonlinear data structure consisting of <u>vertices</u> and <u>edges</u>. We can abstractly represent a graph $G$ as a set of vertices $V$ and a set of edges $E$. The following example shows a graph containing 5 vertices and 7 edges.

$$
\\begin{aligned}
V & = \\{ 1, 2, 3, 4, 5 \\} \\newline
E & = \\{ (1,2), (1,3), (1,5), (2,3), (2,4), (2,5), (4,5) \\} \\newline
G & = \\{ V, E \\} \\newline
\\end{aligned}
$$

If we view vertices as nodes and edges as references (pointers) connecting them, we can regard a graph as an extension of the linked list data structure. As shown in the figure below, **compared to linear relationships (linked lists) and divide-and-conquer relationships (trees), network relationships (graphs) have a higher degree of freedom and are therefore more complex**.

![Relationships among linked lists, trees, and graphs](graph.assets/linkedlist_tree_graph.png)

## Common Types and Terminology of Graphs

Graphs can be divided into <u>undirected graphs</u> and <u>directed graphs</u> based on whether edges have direction, as shown in the figure below.

- In undirected graphs, edges represent a "bidirectional" connection between two vertices, such as friendships on WeChat or QQ.
- In directed graphs, edges have directionality, meaning edges $A \\rightarrow B$ and $A \\leftarrow B$ are independent of each other, such as following and follower relationships on Weibo or TikTok.

![Directed and undirected graphs](graph.assets/directed_graph.png)

Graphs can be divided into <u>connected graphs</u> and <u>disconnected graphs</u> based on whether all vertices are connected, as shown in the figure below.

- For connected graphs, starting from any vertex, all other vertices can be reached.
- For disconnected graphs, starting from a certain vertex, at least one vertex cannot be reached.

![Connected and disconnected graphs](graph.assets/connected_graph.png)

We can also add a "weight" variable to edges, resulting in <u>weighted graphs</u> as shown in the figure below. For example, in mobile games like "Honor of Kings", the system calculates the "intimacy" between players based on how long they have played together, and such intimacy networks can be represented using weighted graphs.

![Weighted and unweighted graphs](graph.assets/weighted_graph.png)

Graph data structures include the following commonly used terms.

- <u>Adjacency</u>: When two vertices are connected by an edge, these two vertices are said to be "adjacent". In the figure above, the adjacent vertices of vertex 1 are vertices 2, 3, and 5.
- <u>Path</u>: The sequence of edges from vertex A to vertex B is called a "path" from A to B. In the figure above, the edge sequence 1-5-2-4 is a path from vertex 1 to vertex 4.
- <u>Degree</u>: The number of edges a vertex has. For directed graphs, <u>in-degree</u> indicates how many edges point to the vertex, and <u>out-degree</u> indicates how many edges leave the vertex.

## Representation of Graphs

Common representations of graphs include "adjacency matrices" and "adjacency lists". The following uses undirected graphs as examples.

### Adjacency Matrix

Given a graph with $n$ vertices, an <u>adjacency matrix</u> uses an $n \\times n$ matrix to represent the graph, where each row (column) represents a vertex, and matrix elements represent edges, using $1$ or $0$ to indicate whether an edge exists between two vertices.

As shown in the figure below, let the adjacency matrix be $M$ and the vertex list be $V$. Then matrix element $M[i, j] = 1$ indicates that an edge exists between vertex $V[i]$ and vertex $V[j]$, whereas $M[i, j] = 0$ indicates no edge between the two vertices.

![Adjacency matrix representation of a graph](graph.assets/adjacency_matrix.png)

Adjacency matrices have the following properties.

- In simple graphs, vertices cannot connect to themselves, so the elements on the main diagonal of the adjacency matrix are meaningless.
- For undirected graphs, edges in both directions are equivalent, so the adjacency matrix is symmetric about the main diagonal.
- Replacing the $1$ and $0$ entries in the adjacency matrix with weights allows it to represent weighted graphs.

When using adjacency matrices to represent graphs, we can directly access matrix elements to obtain edges, resulting in highly efficient addition, deletion, lookup, and modification operations, all with a time complexity of $O(1)$. However, the space complexity of the matrix is $O(n^2)$, which consumes significant memory.

### Adjacency List

An <u>adjacency list</u> uses $n$ linked lists to represent a graph, with linked list nodes representing vertices. The $i$-th linked list corresponds to vertex $i$ and stores all adjacent vertices of that vertex (vertices connected to that vertex). The figure below shows an example of a graph stored using an adjacency list.

![Adjacency list representation of a graph](graph.assets/adjacency_list.png)

Adjacency lists only store edges that actually exist, and the total number of edges is typically much less than $n^2$, making them more space-efficient. However, finding edges in an adjacency list requires traversing the linked list, so it is less time-efficient than an adjacency matrix.

As shown in the figure above, **the structure of adjacency lists is very similar to separate chaining in hash tables, so we can use similar methods to improve efficiency**. For example, when a linked list becomes long, it can be converted into an AVL tree or red-black tree, improving the time complexity from $O(n)$ to $O(\\log n)$; it can also be converted into a hash table, reducing the time complexity to $O(1)$.

## Common Applications of Graphs

As shown in the table below, many real-world systems can be modeled using graphs, and corresponding problems can be reduced to graph computation problems.

<p align="center"> Table <id> &nbsp; Common graphs in real life </p>

|                | Vertices        | Edges                                  | Graph Computation Problem     |
| -------------- | --------------- | -------------------------------------- | ------------------------------ |
| Social network | Users           | Friend relationships                   | Potential friend recommendation |
| Subway lines   | Stations        | Connectivity between stations          | Shortest route recommendation |
| Solar system   | Celestial bodies | Gravitational forces between celestial bodies | Planetary orbit calculation   |

`
  },

  'dsa-graph-operations': {
    title: '9.2 Các thao tác cơ bản trên Đồ thị',
    summary: 'Cách triển khai các thao tác thêm/xóa đỉnh và cạnh dựa trên Ma trận kề và Danh sách kề, kèm so sánh hiệu suất giữa hai cách biểu diễn.',
    tags: ['dsa', 'graph', 'operations'],
    domain: 'Algorithms',
    module: 'Chương 9: Đồ thị',
    prerequisites: ['dsa-graph'],
    related: ['dsa-graph-traversal'],
    updatedAt: '2026-07-19',
    readTime: '14 phút',
    content: `

<p>Các thao tác cơ bản trên đồ thị có thể được chia thành các thao tác trên "cạnh" và các thao tác trên "đỉnh". Cách triển khai của chúng khác nhau tùy thuộc vào việc đồ thị được biểu diễn bằng "ma trận kề" hay "danh sách kề".</p>

<h2>9.2.1 Triển khai dựa trên Ma trận kề</h2>

<p>Cho một đồ thị vô hướng có $n$ đỉnh, các thao tác khác nhau được triển khai như minh họa trong hình dưới đây.</p>

<ul>
  <li><strong>Thêm hoặc xóa một cạnh</strong>: Sửa đổi trực tiếp cạnh được chỉ định trong ma trận kề, sử dụng thời gian $O(1)$. Vì đây là đồ thị vô hướng, cả hai chiều của cạnh cần được cập nhật đồng thời.</li>
  <li><strong>Thêm một đỉnh</strong>: Thêm một hàng và một cột vào cuối ma trận kề và điền tất cả bằng $0$, sử dụng thời gian $O(n)$.</li>
  <li><strong>Xóa một đỉnh</strong>: Xóa một hàng và một cột trong ma trận kề. Trường hợp xấu nhất xảy ra khi xóa hàng và cột đầu tiên, yêu cầu $(n-1)^2$ phần tử phải được "dịch chuyển lên trên và sang trái", do đó sử dụng thời gian $O(n^2)$.</li>
  <li><strong>Khởi tạo</strong>: Cho $n$ đỉnh, khởi tạo một danh sách đỉnh <code>vertices</code> có độ dài $n$, sử dụng thời gian $O(n)$; khởi tạo một ma trận kề <code>adjMat</code> có kích thước $n \\times n$, sử dụng thời gian $O(n^2)$.</li>
</ul>

<div class="interactive-widget-wrapper" id="adj-mat-ops-steps-wrapper"><div class="slider-container"><div class="slide active"><img loading="lazy" src="dsa-assets/adjacency_matrix_step1_initialization.png" alt="Bước 1: Khởi tạo đồ thị bằng ma trận kề" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 1: Khởi tạo đồ thị bằng ma trận kề</p></div><div class="slide"><img loading="lazy" src="dsa-assets/adjacency_matrix_step2_add_edge.png" alt="Bước 2: Thêm cạnh" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 2: Thêm cạnh</p></div><div class="slide"><img loading="lazy" src="dsa-assets/adjacency_matrix_step3_remove_edge.png" alt="Bước 3: Xóa cạnh" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 3: Xóa cạnh</p></div><div class="slide"><img loading="lazy" src="dsa-assets/adjacency_matrix_step4_add_vertex.png" alt="Bước 4: Thêm đỉnh" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 4: Thêm đỉnh</p></div><div class="slide"><img loading="lazy" src="dsa-assets/adjacency_matrix_step5_remove_vertex.png" alt="Bước 5: Xóa đỉnh" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 5: Xóa đỉnh</p></div><div class="slider-controls"><button class="slider-btn" onclick="prevSlide('adj-mat-ops-steps-wrapper')">◀ Trước</button><span class="slider-indicator">Bước 1 / 5</span><button class="slider-btn" onclick="nextSlide('adj-mat-ops-steps-wrapper')">Sau ▶</button></div></div></div>

<p>Đoạn mã sau đây là phần triển khai cho đồ thị được biểu diễn bằng ma trận kề:</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Đồ thị vô hướng dựa trên ma trận kề */
class GraphAdjMat {
    List&lt;Integer&gt; vertices; // Danh sách đỉnh, phần tử biểu diễn "giá trị đỉnh", chỉ số biểu diễn "chỉ số đỉnh"
    List&lt;List&lt;Integer&gt;&gt; adjMat; // Ma trận kề, chỉ số hàng và cột tương ứng với "chỉ số đỉnh"

    /* Hàm khởi tạo */
    public GraphAdjMat(int[] vertices, int[][] edges) {
        this.vertices = new ArrayList&lt;&gt;();
        this.adjMat = new ArrayList&lt;&gt;();
        // Thêm đỉnh
        for (int val : vertices) {
            addVertex(val);
        }
        // Thêm cạnh
        // Lưu ý các phần tử của edges biểu diễn chỉ số đỉnh, tức tương ứng với chỉ số của phần tử trong vertices
        for (int[] e : edges) {
            addEdge(e[0], e[1]);
        }
    }

    /* Lấy số lượng đỉnh */
    public int size() {
        return vertices.size();
    }

    /* Thêm đỉnh */
    public void addVertex(int val) {
        int n = size();
        // Thêm giá trị đỉnh mới vào danh sách đỉnh
        vertices.add(val);
        // Thêm một hàng vào ma trận kề
        List&lt;Integer&gt; newRow = new ArrayList&lt;&gt;(n);
        for (int j = 0; j &lt; n; j++) {
            newRow.add(0);
        }
        adjMat.add(newRow);
        // Thêm một cột vào ma trận kề
        for (List&lt;Integer&gt; row : adjMat) {
            row.add(0);
        }
    }

    /* Xóa đỉnh */
    public void removeVertex(int index) {
        if (index &gt;= size())
            throw new IndexOutOfBoundsException();
        // Xóa đỉnh tại index khỏi danh sách đỉnh
        vertices.remove(index);
        // Xóa hàng tại index khỏi ma trận kề
        adjMat.remove(index);
        // Xóa cột tại index khỏi ma trận kề
        for (List&lt;Integer&gt; row : adjMat) {
            row.remove(index);
        }
    }

    /* Thêm cạnh */
    // Tham số i, j tương ứng với chỉ số của phần tử trong vertices
    public void addEdge(int i, int j) {
        // Xử lý trường hợp chỉ số vượt biên và trường hợp bằng nhau
        if (i &lt; 0 || j &lt; 0 || i &gt;= size() || j &gt;= size() || i == j)
            throw new IndexOutOfBoundsException();
        // Đối với đồ thị vô hướng, ma trận kề đối xứng qua đường chéo chính, tức (i, j) == (j, i)
        adjMat.get(i).set(j, 1);
        adjMat.get(j).set(i, 1);
    }

    /* Xóa cạnh */
    // Tham số i, j tương ứng với chỉ số của phần tử trong vertices
    public void removeEdge(int i, int j) {
        // Xử lý trường hợp chỉ số vượt biên và trường hợp bằng nhau
        if (i &lt; 0 || j &lt; 0 || i &gt;= size() || j &gt;= size() || i == j)
            throw new IndexOutOfBoundsException();
        adjMat.get(i).set(j, 0);
        adjMat.get(j).set(i, 0);
    }

    /* In ma trận kề */
    public void print() {
        System.out.print("Danh sách đỉnh = ");
        System.out.println(vertices);
        System.out.println("Ma trận kề =");
        PrintUtil.printMatrix(adjMat);
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>GraphAdjMat(List&lt;int&gt; vertices, List&lt;List&lt;int&gt;&gt; edges) {
    this.vertices = [];
    this.adjMat = [];
    // Add vertex
    for (int val in vertices) {
      addVertex(val);
    }
    // Add edge
    // Note that the edges elements represent vertex indices, i.e., corresponding to the vertices element indices
    for (List&lt;int&gt; e in edges) {
      addEdge(e[0], e[1]);
    }
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class GraphAdjMat:
    """Đồ thị vô hướng dựa trên ma trận kề"""

    def __init__(self, vertices: list[int], edges: list[list[int]]):
        """Hàm khởi tạo"""
        # Danh sách đỉnh, phần tử biểu diễn "giá trị đỉnh", chỉ số biểu diễn "chỉ số đỉnh"
        self.vertices: list[int] = []
        # Ma trận kề, chỉ số hàng và cột tương ứng với "chỉ số đỉnh"
        self.adj_mat: list[list[int]] = []
        # Thêm đỉnh
        for val in vertices:
            self.add_vertex(val)
        # Thêm cạnh
        # Lưu ý các phần tử của edges biểu diễn chỉ số đỉnh, tức tương ứng với chỉ số của phần tử trong vertices
        for e in edges:
            self.add_edge(e[0], e[1])

    def size(self) -&gt; int:
        """Lấy số lượng đỉnh"""
        return len(self.vertices)

    def add_vertex(self, val: int):
        """Thêm đỉnh"""
        n = self.size()
        # Thêm giá trị đỉnh mới vào danh sách đỉnh
        self.vertices.append(val)
        # Thêm một hàng vào ma trận kề
        new_row = [0] * n
        self.adj_mat.append(new_row)
        # Thêm một cột vào ma trận kề
        for row in self.adj_mat:
            row.append(0)

    def remove_vertex(self, index: int):
        """Xóa đỉnh"""
        if index &gt;= self.size():
            raise IndexError()
        # Xóa đỉnh tại index khỏi danh sách đỉnh
        self.vertices.pop(index)
        # Xóa hàng tại index khỏi ma trận kề
        self.adj_mat.pop(index)
        # Xóa cột tại index khỏi ma trận kề
        for row in self.adj_mat:
            row.pop(index)

    def add_edge(self, i: int, j: int):
        """Thêm cạnh"""
        # Tham số i, j tương ứng với chỉ số của phần tử trong vertices
        # Xử lý trường hợp chỉ số vượt biên và trường hợp bằng nhau
        if i &lt; 0 or j &lt; 0 or i &gt;= self.size() or j &gt;= self.size() or i == j:
            raise IndexError()
        # Đối với đồ thị vô hướng, ma trận kề đối xứng qua đường chéo chính, tức M[i, j] == M[j, i]
        self.adj_mat[i][j] = 1
        self.adj_mat[j][i] = 1

    def remove_edge(self, i: int, j: int):
        """Xóa cạnh"""
        # Tham số i, j tương ứng với chỉ số của phần tử trong vertices
        # Xử lý trường hợp chỉ số vượt biên và trường hợp bằng nhau
        if i &lt; 0 or j &lt; 0 or i &gt;= self.size() or j &gt;= self.size() or i == j:
            raise IndexError()
        self.adj_mat[i][j] = 0
        self.adj_mat[j][i] = 0

    def print(self):
        """In ma trận kề"""
        print("Danh sách đỉnh =", self.vertices)
        print("Ma trận kề =")
        print_matrix(self.adj_mat)</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Đồ thị vô hướng dựa trên ma trận kề */
class GraphAdjMat {
    vector&lt;int&gt; vertices;       // Danh sách đỉnh, phần tử biểu diễn "giá trị đỉnh", chỉ số biểu diễn "chỉ số đỉnh"
    vector&lt;vector&lt;int&gt;&gt; adjMat; // Ma trận kề, chỉ số hàng và cột tương ứng với "chỉ số đỉnh"

  public:
    /* Hàm khởi tạo */
    GraphAdjMat(const vector&lt;int&gt; &amp;vertices, const vector&lt;vector&lt;int&gt;&gt; &amp;edges) {
        // Thêm đỉnh
        for (int val : vertices) {
            addVertex(val);
        }
        // Thêm cạnh
        // Lưu ý các phần tử của edges biểu diễn chỉ số đỉnh, tức tương ứng với chỉ số của phần tử trong vertices
        for (const vector&lt;int&gt; &amp;edge : edges) {
            addEdge(edge[0], edge[1]);
        }
    }

    /* Lấy số lượng đỉnh */
    int size() const {
        return vertices.size();
    }

    /* Thêm đỉnh */
    void addVertex(int val) {
        int n = size();
        // Thêm giá trị đỉnh mới vào danh sách đỉnh
        vertices.push_back(val);
        // Thêm một hàng vào ma trận kề
        adjMat.emplace_back(vector&lt;int&gt;(n, 0));
        // Thêm một cột vào ma trận kề
        for (vector&lt;int&gt; &amp;row : adjMat) {
            row.push_back(0);
        }
    }

    /* Xóa đỉnh */
    void removeVertex(int index) {
        if (index &gt;= size()) {
            throw out_of_range("Đỉnh không tồn tại");
        }
        // Xóa đỉnh tại index khỏi danh sách đỉnh
        vertices.erase(vertices.begin() + index);
        // Xóa hàng tại index khỏi ma trận kề
        adjMat.erase(adjMat.begin() + index);
        // Xóa cột tại index khỏi ma trận kề
        for (vector&lt;int&gt; &amp;row : adjMat) {
            row.erase(row.begin() + index);
        }
    }

    /* Thêm cạnh */
    // Tham số i, j tương ứng với chỉ số của phần tử trong vertices
    void addEdge(int i, int j) {
        // Xử lý trường hợp chỉ số vượt biên và trường hợp bằng nhau
        if (i &lt; 0 || j &lt; 0 || i &gt;= size() || j &gt;= size() || i == j) {
            throw out_of_range("Đỉnh không tồn tại");
        }
        // Đối với đồ thị vô hướng, ma trận kề đối xứng qua đường chéo chính, tức (i, j) == (j, i)
        adjMat[i][j] = 1;
        adjMat[j][i] = 1;
    }

    /* Xóa cạnh */
    // Tham số i, j tương ứng với chỉ số của phần tử trong vertices
    void removeEdge(int i, int j) {
        // Xử lý trường hợp chỉ số vượt biên và trường hợp bằng nhau
        if (i &lt; 0 || j &lt; 0 || i &gt;= size() || j &gt;= size() || i == j) {
            throw out_of_range("Đỉnh không tồn tại");
        }
        adjMat[i][j] = 0;
        adjMat[j][i] = 0;
    }

    /* In ma trận kề */
    void print() {
        cout &lt;&lt; "Danh sách đỉnh = ";
        printVector(vertices);
        cout &lt;&lt; "Ma trận kề =" &lt;&lt; endl;
        printVectorMatrix(adjMat);
    }
};</code></pre></div></div></div>

<h2>9.2.2 Triển khai dựa trên Danh sách kề</h2>

<p>Cho một đồ thị vô hướng có tổng cộng $n$ đỉnh và $m$ cạnh, các thao tác khác nhau có thể được triển khai như minh họa trong hình dưới đây.</p>

<ul>
  <li><strong>Thêm một cạnh</strong>: Thêm cạnh vào cuối danh sách liên kết của đỉnh tương ứng, sử dụng thời gian $O(1)$. Vì đây là đồ thị vô hướng, các cạnh theo cả hai chiều cần được thêm đồng thời.</li>
  <li><strong>Xóa một cạnh</strong>: Tìm và xóa cạnh được chỉ định trong danh sách liên kết của đỉnh tương ứng, sử dụng thời gian $O(m)$. Trong đồ thị vô hướng, các cạnh theo cả hai chiều cần được xóa đồng thời.</li>
  <li><strong>Thêm một đỉnh</strong>: Thêm một danh sách liên kết vào danh sách kề, với đỉnh mới là nút đầu, sử dụng thời gian $O(1)$.</li>
  <li><strong>Xóa một đỉnh</strong>: Duyệt qua toàn bộ danh sách kề và xóa tất cả các cạnh chứa đỉnh được chỉ định, sử dụng thời gian $O(n + m)$.</li>
  <li><strong>Khởi tạo</strong>: Tạo $n$ đỉnh và $2m$ cạnh trong danh sách kề, sử dụng thời gian $O(n + m)$.</li>
</ul>

<div class="interactive-widget-wrapper" id="adj-list-ops-steps-wrapper"><div class="slider-container"><div class="slide active"><img loading="lazy" src="dsa-assets/adjacency_list_step1_initialization.png" alt="Bước 1: Khởi tạo đồ thị bằng danh sách kề" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 1: Khởi tạo đồ thị bằng danh sách kề</p></div><div class="slide"><img loading="lazy" src="dsa-assets/adjacency_list_step2_add_edge.png" alt="Bước 2: Thêm cạnh" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 2: Thêm cạnh</p></div><div class="slide"><img loading="lazy" src="dsa-assets/adjacency_list_step3_remove_edge.png" alt="Bước 3: Xóa cạnh" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 3: Xóa cạnh</p></div><div class="slide"><img loading="lazy" src="dsa-assets/adjacency_list_step4_add_vertex.png" alt="Bước 4: Thêm đỉnh" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 4: Thêm đỉnh</p></div><div class="slide"><img loading="lazy" src="dsa-assets/adjacency_list_step5_remove_vertex.png" alt="Bước 5: Xóa đỉnh" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 5: Xóa đỉnh</p></div><div class="slider-controls"><button class="slider-btn" onclick="prevSlide('adj-list-ops-steps-wrapper')">◀ Trước</button><span class="slider-indicator">Bước 1 / 5</span><button class="slider-btn" onclick="nextSlide('adj-list-ops-steps-wrapper')">Sau ▶</button></div></div></div>

<p>Đoạn mã dưới đây thể hiện phần triển khai bằng danh sách kề. So với hình trên, mã thực tế có một số điểm khác biệt như sau.</p>

<ul>
  <li>Để thuận tiện cho việc thêm và xóa đỉnh, đồng thời đơn giản hóa mã nguồn, ta sử dụng danh sách (mảng động) thay vì danh sách liên kết.</li>
  <li>Bảng băm được sử dụng để lưu trữ danh sách kề, trong đó <code>key</code> là thực thể đỉnh và <code>value</code> là danh sách (danh sách liên kết) các đỉnh kề của đỉnh đó.</li>
</ul>

<p>Ngoài ra, ta sử dụng lớp <code>Vertex</code> để biểu diễn các đỉnh trong danh sách kề vì lý do sau: nếu ta sử dụng chỉ số danh sách để phân biệt các đỉnh khác nhau, giống như với ma trận kề, thì để xóa đỉnh tại chỉ số $i$, ta sẽ cần duyệt qua toàn bộ danh sách kề và giảm tất cả các chỉ số lớn hơn $i$ đi $1$, điều này rất kém hiệu quả. Tuy nhiên, nếu mỗi đỉnh là một thực thể <code>Vertex</code> duy nhất, việc xóa một đỉnh sẽ không yêu cầu sửa đổi các đỉnh khác.</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Đồ thị vô hướng dựa trên danh sách kề */
class GraphAdjList {
    // Danh sách kề, key: đỉnh, value: danh sách các đỉnh kề của đỉnh đó
    Map&lt;Vertex, List&lt;Vertex&gt;&gt; adjList;

    /* Hàm khởi tạo */
    public GraphAdjList(Vertex[][] edges) {
        this.adjList = new HashMap&lt;&gt;();
        // Thêm tất cả đỉnh và cạnh
        for (Vertex[] edge : edges) {
            addVertex(edge[0]);
            addVertex(edge[1]);
            addEdge(edge[0], edge[1]);
        }
    }

    /* Lấy số lượng đỉnh */
    public int size() {
        return adjList.size();
    }

    /* Thêm cạnh */
    public void addEdge(Vertex vet1, Vertex vet2) {
        if (!adjList.containsKey(vet1) || !adjList.containsKey(vet2) || vet1 == vet2)
            throw new IllegalArgumentException();
        // Thêm cạnh vet1 - vet2
        adjList.get(vet1).add(vet2);
        adjList.get(vet2).add(vet1);
    }

    /* Xóa cạnh */
    public void removeEdge(Vertex vet1, Vertex vet2) {
        if (!adjList.containsKey(vet1) || !adjList.containsKey(vet2) || vet1 == vet2)
            throw new IllegalArgumentException();
        // Xóa cạnh vet1 - vet2
        adjList.get(vet1).remove(vet2);
        adjList.get(vet2).remove(vet1);
    }

    /* Thêm đỉnh */
    public void addVertex(Vertex vet) {
        if (adjList.containsKey(vet))
            return;
        // Thêm một danh sách liên kết mới vào danh sách kề
        adjList.put(vet, new ArrayList&lt;&gt;());
    }

    /* Xóa đỉnh */
    public void removeVertex(Vertex vet) {
        if (!adjList.containsKey(vet))
            throw new IllegalArgumentException();
        // Xóa danh sách liên kết tương ứng với đỉnh vet khỏi danh sách kề
        adjList.remove(vet);
        // Duyệt qua danh sách liên kết của các đỉnh khác và xóa tất cả cạnh chứa vet
        for (List&lt;Vertex&gt; list : adjList.values()) {
            list.remove(vet);
        }
    }

    /* In danh sách kề */
    public void print() {
        System.out.println("Danh sách kề =");
        for (Map.Entry&lt;Vertex, List&lt;Vertex&gt;&gt; pair : adjList.entrySet()) {
            List&lt;Integer&gt; tmp = new ArrayList&lt;&gt;();
            for (Vertex vertex : pair.getValue())
                tmp.add(vertex.val);
            System.out.println(pair.getKey().val + ": " + tmp + ",");
        }
    }
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>GraphAdjList(List&lt;List&lt;Vertex&gt;&gt; edges) {
    for (List&lt;Vertex&gt; edge in edges) {
      addVertex(edge[0]);
      addVertex(edge[1]);
      addEdge(edge[0], edge[1]);
    }
  }</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class GraphAdjList:
    """Đồ thị vô hướng dựa trên danh sách kề"""

    def __init__(self, edges: list[list[Vertex]]):
        """Hàm khởi tạo"""
        # Danh sách kề, key: đỉnh, value: danh sách các đỉnh kề của đỉnh đó
        self.adj_list = dict[Vertex, list[Vertex]]()
        # Thêm tất cả đỉnh và cạnh
        for edge in edges:
            self.add_vertex(edge[0])
            self.add_vertex(edge[1])
            self.add_edge(edge[0], edge[1])

    def size(self) -&gt; int:
        """Lấy số lượng đỉnh"""
        return len(self.adj_list)

    def add_edge(self, vet1: Vertex, vet2: Vertex):
        """Thêm cạnh"""
        if vet1 not in self.adj_list or vet2 not in self.adj_list or vet1 == vet2:
            raise ValueError()
        # Thêm cạnh vet1 - vet2
        self.adj_list[vet1].append(vet2)
        self.adj_list[vet2].append(vet1)

    def remove_edge(self, vet1: Vertex, vet2: Vertex):
        """Xóa cạnh"""
        if vet1 not in self.adj_list or vet2 not in self.adj_list or vet1 == vet2:
            raise ValueError()
        # Xóa cạnh vet1 - vet2
        self.adj_list[vet1].remove(vet2)
        self.adj_list[vet2].remove(vet1)

    def add_vertex(self, vet: Vertex):
        """Thêm đỉnh"""
        if vet in self.adj_list:
            return
        # Thêm một danh sách liên kết mới vào danh sách kề
        self.adj_list[vet] = []

    def remove_vertex(self, vet: Vertex):
        """Xóa đỉnh"""
        if vet not in self.adj_list:
            raise ValueError()
        # Xóa danh sách liên kết tương ứng với đỉnh vet khỏi danh sách kề
        self.adj_list.pop(vet)
        # Duyệt qua danh sách liên kết của các đỉnh khác và xóa tất cả cạnh chứa vet
        for vertex in self.adj_list:
            if vet in self.adj_list[vertex]:
                self.adj_list[vertex].remove(vet)

    def print(self):
        """In danh sách kề"""
        print("Danh sách kề =")
        for vertex in self.adj_list:
            tmp = [v.val for v in self.adj_list[vertex]]
            print(f"{vertex.val}: {tmp},")</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Đồ thị vô hướng dựa trên danh sách kề */
class GraphAdjList {
  public:
    // Danh sách kề, key: đỉnh, value: danh sách các đỉnh kề của đỉnh đó
    unordered_map&lt;Vertex *, vector&lt;Vertex *&gt;&gt; adjList;

    /* Xóa nút được chỉ định khỏi vector */
    void remove(vector&lt;Vertex *&gt; &amp;vec, Vertex *vet) {
        for (int i = 0; i &lt; vec.size(); i++) {
            if (vec[i] == vet) {
                vec.erase(vec.begin() + i);
                break;
            }
        }
    }

    /* Hàm khởi tạo */
    GraphAdjList(const vector&lt;vector&lt;Vertex *&gt;&gt; &amp;edges) {
        // Thêm tất cả đỉnh và cạnh
        for (const vector&lt;Vertex *&gt; &amp;edge : edges) {
            addVertex(edge[0]);
            addVertex(edge[1]);
            addEdge(edge[0], edge[1]);
        }
    }

    /* Lấy số lượng đỉnh */
    int size() {
        return adjList.size();
    }

    /* Thêm cạnh */
    void addEdge(Vertex *vet1, Vertex *vet2) {
        if (!adjList.count(vet1) || !adjList.count(vet2) || vet1 == vet2)
            throw invalid_argument("Đỉnh không tồn tại");
        // Thêm cạnh vet1 - vet2
        adjList[vet1].push_back(vet2);
        adjList[vet2].push_back(vet1);
    }

    /* Xóa cạnh */
    void removeEdge(Vertex *vet1, Vertex *vet2) {
        if (!adjList.count(vet1) || !adjList.count(vet2) || vet1 == vet2)
            throw invalid_argument("Đỉnh không tồn tại");
        // Xóa cạnh vet1 - vet2
        remove(adjList[vet1], vet2);
        remove(adjList[vet2], vet1);
    }

    /* Thêm đỉnh */
    void addVertex(Vertex *vet) {
        if (adjList.count(vet))
            return;
        // Thêm một danh sách liên kết mới vào danh sách kề
        adjList[vet] = vector&lt;Vertex *&gt;();
    }

    /* Xóa đỉnh */
    void removeVertex(Vertex *vet) {
        if (!adjList.count(vet))
            throw invalid_argument("Đỉnh không tồn tại");
        // Xóa danh sách liên kết tương ứng với đỉnh vet khỏi danh sách kề
        adjList.erase(vet);
        // Duyệt qua danh sách liên kết của các đỉnh khác và xóa tất cả cạnh chứa vet
        for (auto &amp;adj : adjList) {
            remove(adj.second, vet);
        }
    }

    /* In danh sách kề */
    void print() {
        cout &lt;&lt; "Danh sách kề =" &lt;&lt; endl;
        for (auto &amp;adj : adjList) {
            const auto &amp;key = adj.first;
            const auto &amp;vec = adj.second;
            cout &lt;&lt; key-&gt;val &lt;&lt; ": ";
            printVector(vetsToVals(vec));
        }
    }
};</code></pre></div></div></div>

<h2>9.2.3 So sánh hiệu suất</h2>

<p>Giả sử đồ thị có $n$ đỉnh và $m$ cạnh, bảng dưới đây so sánh hiệu suất thời gian và hiệu suất không gian của ma trận kề và danh sách kề. Lưu ý rằng danh sách kề (danh sách liên kết) tương ứng với phần triển khai được sử dụng trong phần này, trong khi danh sách kề (bảng băm) đề cập cụ thể đến phần triển khai trong đó tất cả các danh sách liên kết được thay thế bằng bảng băm.</p>

<p align="center">Bảng &nbsp; So sánh ma trận kề và danh sách kề</p>
<table style="width:100%; border-collapse:collapse; margin:1.5em 0; border: 1px solid var(--border-color);">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px; font-weight:600;"></th>
      <th style="padding:10px; font-weight:600;">Ma trận kề</th>
      <th style="padding:10px; font-weight:600;">Danh sách kề (danh sách liên kết)</th>
      <th style="padding:10px; font-weight:600;">Danh sách kề (bảng băm)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;">Xác định tính kề nhau</td><td style="padding:10px;">$O(1)$</td><td style="padding:10px;">$O(n)$</td><td style="padding:10px;">$O(1)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;">Thêm một cạnh</td><td style="padding:10px;">$O(1)$</td><td style="padding:10px;">$O(1)$</td><td style="padding:10px;">$O(1)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;">Xóa một cạnh</td><td style="padding:10px;">$O(1)$</td><td style="padding:10px;">$O(n)$</td><td style="padding:10px;">$O(1)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;">Thêm một đỉnh</td><td style="padding:10px;">$O(n)$</td><td style="padding:10px;">$O(1)$</td><td style="padding:10px;">$O(1)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;">Xóa một đỉnh</td><td style="padding:10px;">$O(n^2)$</td><td style="padding:10px;">$O(n + m)$</td><td style="padding:10px;">$O(n)$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;">Sử dụng bộ nhớ</td><td style="padding:10px;">$O(n^2)$</td><td style="padding:10px;">$O(n + m)$</td><td style="padding:10px;">$O(n + m)$</td></tr>
  </tbody>
</table>

<p>Quan sát bảng trên, có vẻ như danh sách kề (bảng băm) có hiệu suất thời gian và hiệu suất không gian tốt nhất. Tuy nhiên, trong thực tế, thao tác trên các cạnh trong ma trận kề hiệu quả hơn, chỉ yêu cầu một thao tác truy cập hoặc gán mảng duy nhất. Nhìn chung, ma trận kề thể hiện nguyên tắc "đánh đổi không gian lấy thời gian", trong khi danh sách kề thể hiện "đánh đổi thời gian lấy không gian".</p>

`,
    originalContent: `

# Basic Operations on Graphs

Basic operations on graphs can be divided into operations on "edges" and operations on "vertices". Their implementations differ depending on whether the graph is represented as an "adjacency matrix" or an "adjacency list".

## Implementation Based on Adjacency Matrix

Given an undirected graph with $n$ vertices, the various operations are implemented as shown in the figure below.

- **Adding or removing an edge**: Directly modify the specified edge in the adjacency matrix, using $O(1)$ time. Since it is an undirected graph, both directions of the edge need to be updated simultaneously.
- **Adding a vertex**: Add a row and a column at the end of the adjacency matrix and fill them all with $0$s, using $O(n)$ time.
- **Removing a vertex**: Delete a row and a column in the adjacency matrix. The worst case occurs when removing the first row and column, requiring $(n-1)^2$ elements to be "moved up and to the left", thus using $O(n^2)$ time.
- **Initialization**: Given $n$ vertices, initialize a vertex list \`vertices\` of length $n$, using $O(n)$ time; initialize an adjacency matrix \`adjMat\` of size $n \\times n$, using $O(n^2)$ time.

=== "<1>"
    ![Initialization, adding and removing edges, adding and removing vertices in adjacency matrix](graph_operations.assets/adjacency_matrix_step1_initialization.png)

=== "<2>"
    ![adjacency_matrix_add_edge](graph_operations.assets/adjacency_matrix_step2_add_edge.png)

=== "<3>"
    ![adjacency_matrix_remove_edge](graph_operations.assets/adjacency_matrix_step3_remove_edge.png)

=== "<4>"
    ![adjacency_matrix_add_vertex](graph_operations.assets/adjacency_matrix_step4_add_vertex.png)

=== "<5>"
    ![adjacency_matrix_remove_vertex](graph_operations.assets/adjacency_matrix_step5_remove_vertex.png)

The following is the implementation code for graphs represented using an adjacency matrix:

\`\`\`src
[file]{{graph_adjacency_matrix}}-[class]{{graph_adj_mat}}-[func]{{}}
\`\`\`

## Implementation Based on Adjacency List

Given an undirected graph with a total of $n$ vertices and $m$ edges, the various operations can be implemented as shown in the figure below.

- **Adding an edge**: Add the edge at the end of the corresponding vertex's linked list, using $O(1)$ time. Since it is an undirected graph, edges in both directions need to be added simultaneously.
- **Removing an edge**: Find and remove the specified edge in the corresponding vertex's linked list, using $O(m)$ time. In an undirected graph, edges in both directions need to be removed simultaneously.
- **Adding a vertex**: Add a linked list to the adjacency list, with the new vertex as the head node, using $O(1)$ time.
- **Removing a vertex**: Traverse the entire adjacency list and remove all edges containing the specified vertex, using $O(n + m)$ time.
- **Initialization**: Create $n$ vertices and $2m$ edges in the adjacency list, using $O(n + m)$ time.

=== "<1>"
    ![Initialization, adding and removing edges, adding and removing vertices in adjacency list](graph_operations.assets/adjacency_list_step1_initialization.png)

=== "<2>"
    ![adjacency_list_add_edge](graph_operations.assets/adjacency_list_step2_add_edge.png)

=== "<3>"
    ![adjacency_list_remove_edge](graph_operations.assets/adjacency_list_step3_remove_edge.png)

=== "<4>"
    ![adjacency_list_add_vertex](graph_operations.assets/adjacency_list_step4_add_vertex.png)

=== "<5>"
    ![adjacency_list_remove_vertex](graph_operations.assets/adjacency_list_step5_remove_vertex.png)

The following code shows the adjacency list implementation. Compared with the figure above, the actual code differs in the following ways.

- For convenience in adding and removing vertices, and to simplify the code, we use lists (dynamic arrays) instead of linked lists.
- A hash table is used to store the adjacency list, where \`key\` is the vertex instance and \`value\` is the list (linked list) of adjacent vertices for that vertex.

Additionally, we use the \`Vertex\` class to represent vertices in the adjacency list for the following reason: if we used list indices to distinguish different vertices, as with adjacency matrices, then to delete the vertex at index $i$, we would need to traverse the entire adjacency list and decrement all indices greater than $i$ by $1$, which is very inefficient. However, if each vertex is a unique \`Vertex\` instance, deleting one vertex does not require modifying the others.

\`\`\`src
[file]{{graph_adjacency_list}}-[class]{{graph_adj_list}}-[func]{{}}
\`\`\`

## Efficiency Comparison

Assuming the graph has $n$ vertices and $m$ edges, the table below compares the time efficiency and space efficiency of adjacency matrices and adjacency lists. Note that the adjacency list (linked list) corresponds to the implementation used in this section, while the adjacency list (hash table) refers specifically to the implementation where all linked lists are replaced with hash tables.

<p align="center"> Table <id> &nbsp; Comparison of adjacency matrix and adjacency list </p>

|                        | Adjacency matrix | Adjacency list (linked list) | Adjacency list (hash table) |
| ---------------------- | ---------------- | ---------------------------- | --------------------------- |
| Determine adjacency    | $O(1)$           | $O(n)$                        | $O(1)$                      |
| Add an edge            | $O(1)$           | $O(1)$                        | $O(1)$                      |
| Remove an edge         | $O(1)$           | $O(n)$                        | $O(1)$                      |
| Add a vertex           | $O(n)$           | $O(1)$                        | $O(1)$                      |
| Remove a vertex        | $O(n^2)$         | $O(n + m)$                    | $O(n)$                      |
| Memory space usage     | $O(n^2)$         | $O(n + m)$                    | $O(n + m)$                  |

Observing the table above, it appears that the adjacency list (hash table) has the best time efficiency and space efficiency. However, in practice, operating on edges in the adjacency matrix is more efficient, requiring only a single array access or assignment operation. Overall, adjacency matrices embody the principle of "trading space for time", while adjacency lists embody "trading time for space".

`
  },

  'dsa-graph-traversal': {
    title: '9.3 Duyệt Đồ thị (BFS & DFS)',
    summary: 'Hai phương pháp duyệt đồ thị cơ bản: Duyệt theo chiều rộng (BFS) dùng hàng đợi và Duyệt theo chiều sâu (DFS) dùng đệ quy, kèm phân tích độ phức tạp và mô phỏng tương tác.',
    tags: ['dsa', 'graph', 'traversal', 'bfs', 'dfs'],
    domain: 'Algorithms',
    module: 'Chương 9: Đồ thị',
    prerequisites: ['dsa-graph-operations'],
    related: ['dsa-graph-summary'],
    updatedAt: '2026-07-19',
    readTime: '16 phút',
    content: `

<p>Cây biểu diễn mối quan hệ "một-nhiều", trong khi đồ thị có mức độ tự do cao hơn và có thể biểu diễn bất kỳ mối quan hệ "nhiều-nhiều" nào. Do đó, ta có thể xem cây như một trường hợp đặc biệt của đồ thị. Rõ ràng, <strong>các thao tác duyệt cây cũng là một trường hợp đặc biệt của các thao tác duyệt đồ thị</strong>.</p>

<p>Cả đồ thị và cây đều yêu cầu áp dụng các thuật toán tìm kiếm để triển khai các thao tác duyệt. Các phương pháp duyệt đồ thị cũng có thể được chia thành hai loại: <u>duyệt theo chiều rộng (breadth-first traversal)</u> và <u>duyệt theo chiều sâu (depth-first traversal)</u>.</p>

<h2>9.3.1 Duyệt theo chiều rộng (BFS)</h2>

<p><strong>Duyệt theo chiều rộng tiến hành từ gần đến xa: bắt đầu từ một nút cho trước, nó luôn thăm các đỉnh gần nhất trước rồi mở rộng ra xa dần theo từng lớp</strong>. Như minh họa trong hình dưới đây, bắt đầu từ đỉnh trên cùng bên trái, trước tiên duyệt tất cả các đỉnh kề của đỉnh đó, sau đó duyệt tất cả các đỉnh kề của đỉnh tiếp theo, và cứ như vậy, cho đến khi tất cả các đỉnh đã được thăm.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/graph_bfs.png" alt="Duyệt theo chiều rộng của một đồ thị" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>9.3.1.1 Triển khai thuật toán</h3>

<p>BFS thường được triển khai với sự hỗ trợ của hàng đợi, như trong đoạn mã dưới đây. Hàng đợi có tính chất "vào trước ra trước", phù hợp với ý tưởng "gần trước xa sau" của BFS.</p>

<ol>
  <li>Thêm đỉnh xuất phát <code>startVet</code> vào hàng đợi và bắt đầu vòng lặp.</li>
  <li>Trong mỗi vòng lặp, lấy đỉnh ở đầu hàng đợi ra và đánh dấu là đã thăm, sau đó thêm tất cả các đỉnh kề của đỉnh đó vào cuối hàng đợi.</li>
  <li>Lặp lại bước <code>2.</code> cho đến khi tất cả các đỉnh đã được thăm.</li>
</ol>

<p>Để tránh việc thăm lại các đỉnh, ta sử dụng một tập hợp băm <code>visited</code> để ghi lại những nút nào đã được thăm.</p>

<div class="callout callout-tip">
  <span class="callout-icon">💡</span>
  <div class="callout-body">
    <p>Tập hợp băm có thể được xem như một bảng băm chỉ lưu trữ <code>key</code> mà không lưu trữ <code>value</code>. Nó hỗ trợ các thao tác chèn, xóa, tìm kiếm và cập nhật trên <code>key</code> với độ phức tạp thời gian $O(1)$. Dựa trên tính duy nhất của <code>key</code>, tập hợp băm thường được dùng cho việc loại bỏ trùng lặp dữ liệu và các tình huống tương tự.</p>
  </div>
</div>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Duyệt theo chiều rộng */
// Sử dụng danh sách kề để biểu diễn đồ thị, nhằm lấy được tất cả các đỉnh kề của một đỉnh cho trước
static List&lt;Vertex&gt; graphBFS(GraphAdjList graph, Vertex startVet) {
    // Chuỗi các đỉnh đã duyệt
    List&lt;Vertex&gt; res = new ArrayList&lt;&gt;();
    // Tập hợp băm dùng để ghi lại các đỉnh đã được duyệt
    Set&lt;Vertex&gt; visited = new HashSet&lt;&gt;();
    visited.add(startVet);
    // Hàng đợi dùng để triển khai BFS
    Queue&lt;Vertex&gt; que = new LinkedList&lt;&gt;();
    que.offer(startVet);
    // Bắt đầu từ đỉnh vet, lặp cho đến khi tất cả đỉnh đã được duyệt
    while (!que.isEmpty()) {
        Vertex vet = que.poll(); // Đỉnh ở đầu hàng đợi ra khỏi hàng đợi
        res.add(vet);            // Ghi lại đỉnh đã duyệt
        // Duyệt tất cả các đỉnh kề của đỉnh này
        for (Vertex adjVet : graph.adjList.get(vet)) {
            if (visited.contains(adjVet))
                continue;        // Bỏ qua các đỉnh đã được duyệt
            que.offer(adjVet);   // Chỉ đưa vào hàng đợi các đỉnh chưa được duyệt
            visited.add(adjVet); // Đánh dấu đỉnh này đã được duyệt
        }
    }
    // Trả về chuỗi các đỉnh đã duyệt
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func graphBFS(graph: GraphAdjList, startVet: Vertex) -&gt; [Vertex] {
    // Vertex traversal sequence
    var res: [Vertex] = []
    // Hash set for recording vertices that have been visited
    var visited: Set&lt;Vertex&gt; = [startVet]
    // Queue used to implement BFS
    var que: [Vertex] = [startVet]
    // Starting from vertex vet, loop until all vertices are visited
    while !que.isEmpty {
        let vet = que.removeFirst() // Dequeue the front vertex
        res.append(vet) // Record visited vertex
        // Traverse all adjacent vertices of this vertex
        for adjVet in graph.adjList[vet] ?? [] {
            if visited.contains(adjVet) {
                continue // Skip vertices that have been visited
            }
            que.append(adjVet) // Only enqueue unvisited vertices
            visited.insert(adjVet) // Mark this vertex as visited
        }
    }
    // Return vertex traversal sequence
    return res
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>List&lt;Vertex&gt; graphBFS(GraphAdjList graph, Vertex startVet) {
  // Use adjacency list to represent the graph, in order to obtain all adjacent vertices of a specified vertex
  // Vertex traversal sequence
  List&lt;Vertex&gt; res = [];
  // Hash set for recording vertices that have been visited
  Set&lt;Vertex&gt; visited = {};
  visited.add(startVet);
  // Queue used to implement BFS
  Queue&lt;Vertex&gt; que = Queue();
  que.add(startVet);
  // Starting from vertex vet, loop until all vertices are visited
  while (que.isNotEmpty) {
    Vertex vet = que.removeFirst(); // Dequeue the front vertex
    res.add(vet); // Record visited vertex
    // Traverse all adjacent vertices of this vertex
    for (Vertex adjVet in graph.adjList[vet]!) {
      if (visited.contains(adjVet)) {
        continue; // Skip vertices that have been visited
      }
      que.add(adjVet); // Only enqueue unvisited vertices
      visited.add(adjVet); // Mark this vertex as visited
    }
  }
  // Return vertex traversal sequence
  return res;
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def graph_bfs(graph: GraphAdjList, start_vet: Vertex) -&gt; list[Vertex]:
    """Duyệt theo chiều rộng"""
    # Sử dụng danh sách kề để biểu diễn đồ thị, nhằm lấy được tất cả các đỉnh kề của một đỉnh cho trước
    # Chuỗi các đỉnh đã duyệt
    res = []
    # Tập hợp băm dùng để ghi lại các đỉnh đã được duyệt
    visited = set[Vertex]([start_vet])
    # Hàng đợi dùng để triển khai BFS
    que = deque[Vertex]([start_vet])
    # Bắt đầu từ đỉnh vet, lặp cho đến khi tất cả đỉnh đã được duyệt
    while len(que) &gt; 0:
        vet = que.popleft()  # Đỉnh ở đầu hàng đợi ra khỏi hàng đợi
        res.append(vet)  # Ghi lại đỉnh đã duyệt
        # Duyệt tất cả các đỉnh kề của đỉnh này
        for adj_vet in graph.adj_list[vet]:
            if adj_vet in visited:
                continue  # Bỏ qua các đỉnh đã được duyệt
            que.append(adj_vet)  # Chỉ đưa vào hàng đợi các đỉnh chưa được duyệt
            visited.add(adj_vet)  # Đánh dấu đỉnh này đã được duyệt
    # Trả về chuỗi các đỉnh đã duyệt
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Duyệt theo chiều rộng */
// Sử dụng danh sách kề để biểu diễn đồ thị, nhằm lấy được tất cả các đỉnh kề của một đỉnh cho trước
vector&lt;Vertex *&gt; graphBFS(GraphAdjList &amp;graph, Vertex *startVet) {
    // Chuỗi các đỉnh đã duyệt
    vector&lt;Vertex *&gt; res;
    // Tập hợp băm dùng để ghi lại các đỉnh đã được duyệt
    unordered_set&lt;Vertex *&gt; visited = {startVet};
    // Hàng đợi dùng để triển khai BFS
    queue&lt;Vertex *&gt; que;
    que.push(startVet);
    // Bắt đầu từ đỉnh vet, lặp cho đến khi tất cả đỉnh đã được duyệt
    while (!que.empty()) {
        Vertex *vet = que.front();
        que.pop();          // Đỉnh ở đầu hàng đợi ra khỏi hàng đợi
        res.push_back(vet); // Ghi lại đỉnh đã duyệt
        // Duyệt tất cả các đỉnh kề của đỉnh này
        for (auto adjVet : graph.adjList[vet]) {
            if (visited.count(adjVet))
                continue;            // Bỏ qua các đỉnh đã được duyệt
            que.push(adjVet);        // Chỉ đưa vào hàng đợi các đỉnh chưa được duyệt
            visited.emplace(adjVet); // Đánh dấu đỉnh này đã được duyệt
        }
    }
    // Trả về chuỗi các đỉnh đã duyệt
    return res;
}</code></pre></div></div></div>

<p>Đoạn mã trên tương đối trừu tượng; bạn nên tham khảo hình dưới đây để hiểu sâu hơn.</p>

<div class="interactive-widget-wrapper" id="graph-bfs-steps-wrapper"><div class="slider-container"><div class="slide active"><img loading="lazy" src="dsa-assets/graph_bfs_step1.png" alt="Bước 1: Duyệt BFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 1: Duyệt BFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_bfs_step2.png" alt="Bước 2: Duyệt BFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 2: Duyệt BFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_bfs_step3.png" alt="Bước 3: Duyệt BFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 3: Duyệt BFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_bfs_step4.png" alt="Bước 4: Duyệt BFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 4: Duyệt BFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_bfs_step5.png" alt="Bước 5: Duyệt BFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 5: Duyệt BFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_bfs_step6.png" alt="Bước 6: Duyệt BFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 6: Duyệt BFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_bfs_step7.png" alt="Bước 7: Duyệt BFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 7: Duyệt BFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_bfs_step8.png" alt="Bước 8: Duyệt BFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 8: Duyệt BFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_bfs_step9.png" alt="Bước 9: Duyệt BFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 9: Duyệt BFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_bfs_step10.png" alt="Bước 10: Duyệt BFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 10: Duyệt BFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_bfs_step11.png" alt="Bước 11: Duyệt BFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 11: Duyệt BFS</p></div><div class="slider-controls"><button class="slider-btn" onclick="prevSlide('graph-bfs-steps-wrapper')">◀ Trước</button><span class="slider-indicator">Bước 1 / 11</span><button class="slider-btn" onclick="nextSlide('graph-bfs-steps-wrapper')">Sau ▶</button></div></div></div>

<div class="callout callout-question">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Thứ tự duyệt theo chiều rộng có phải là duy nhất không?</strong></p>
    <p>Không duy nhất. Duyệt theo chiều rộng chỉ yêu cầu duyệt theo thứ tự "gần trước xa sau", <strong>và thứ tự duyệt của các đỉnh có cùng khoảng cách có thể bị xáo trộn tùy ý</strong>. Lấy hình trên làm ví dụ, thứ tự thăm của đỉnh $1$ và $3$ có thể hoán đổi cho nhau, cũng như thứ tự thăm của các đỉnh $2$, $4$ và $6$.</p>
  </div>
</div>

<h3>9.3.1.2 Phân tích độ phức tạp</h3>

<p><strong>Độ phức tạp thời gian</strong>: Tất cả các đỉnh sẽ được đưa vào và lấy ra khỏi hàng đợi một lần, sử dụng thời gian $O(|V|)$; trong quá trình duyệt các đỉnh kề, vì đây là đồ thị vô hướng, tất cả các cạnh sẽ được thăm $2$ lần, sử dụng thời gian $O(2|E|)$; tổng thể sử dụng thời gian $O(|V| + |E|)$.</p>

<p><strong>Độ phức tạp không gian</strong>: Danh sách <code>res</code>, tập hợp băm <code>visited</code>, và hàng đợi <code>que</code> có thể chứa tối đa $|V|$ đỉnh, sử dụng không gian $O(|V|)$.</p>

<h2>9.3.2 Duyệt theo chiều sâu (DFS)</h2>

<p><strong>Duyệt theo chiều sâu là một phương pháp duyệt ưu tiên đi càng xa càng tốt, sau đó quay lui khi không còn đường đi nào nữa</strong>. Như minh họa trong hình dưới đây, bắt đầu từ đỉnh trên cùng bên trái, thăm một đỉnh kề của đỉnh hiện tại, tiếp tục cho đến khi gặp ngõ cụt, sau đó quay lại và tiếp tục đi càng xa càng tốt trước khi quay lại lần nữa, và cứ như vậy, cho đến khi tất cả các đỉnh đã được duyệt.</p>

<div style="text-align: center; margin: 1.5em 0;">
  <img loading="lazy" src="dsa-assets/graph_dfs.png" alt="Duyệt theo chiều sâu của một đồ thị" style="max-width: 100%; height: auto; border-radius: var(--radius-md);" />
</div>

<h3>9.3.2.1 Triển khai thuật toán</h3>

<p>Mô hình thuật toán "đi càng xa càng tốt rồi quay lại" này thường được triển khai bằng đệ quy. Tương tự như duyệt theo chiều rộng, trong duyệt theo chiều sâu ta cũng cần một tập hợp băm <code>visited</code> để ghi lại các đỉnh đã thăm và tránh việc thăm lại.</p>

<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Hàm hỗ trợ duyệt theo chiều sâu */
static void dfs(GraphAdjList graph, Set&lt;Vertex&gt; visited, List&lt;Vertex&gt; res, Vertex vet) {
    res.add(vet);     // Ghi lại đỉnh đã duyệt
    visited.add(vet); // Đánh dấu đỉnh này đã được duyệt
    // Duyệt tất cả các đỉnh kề của đỉnh này
    for (Vertex adjVet : graph.adjList.get(vet)) {
        if (visited.contains(adjVet))
            continue; // Bỏ qua các đỉnh đã được duyệt
        // Đệ quy duyệt các đỉnh kề
        dfs(graph, visited, res, adjVet);
    }
}

/* Duyệt theo chiều sâu */
// Sử dụng danh sách kề để biểu diễn đồ thị, nhằm lấy được tất cả các đỉnh kề của một đỉnh cho trước
static List&lt;Vertex&gt; graphDFS(GraphAdjList graph, Vertex startVet) {
    // Chuỗi các đỉnh đã duyệt
    List&lt;Vertex&gt; res = new ArrayList&lt;&gt;();
    // Tập hợp băm dùng để ghi lại các đỉnh đã được duyệt
    Set&lt;Vertex&gt; visited = new HashSet&lt;&gt;();
    dfs(graph, visited, res, startVet);
    return res;
}</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func dfs(graph: GraphAdjList, visited: inout Set&lt;Vertex&gt;, res: inout [Vertex], vet: Vertex) {
    res.append(vet) // Record visited vertex
    visited.insert(vet) // Mark this vertex as visited
    // Traverse all adjacent vertices of this vertex
    for adjVet in graph.adjList[vet] ?? [] {
        if visited.contains(adjVet) {
            continue // Skip vertices that have been visited
        }
        // Recursively visit adjacent vertices
        dfs(graph: graph, visited: &amp;visited, res: &amp;res, vet: adjVet)
    }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def dfs(graph: GraphAdjList, visited: set[Vertex], res: list[Vertex], vet: Vertex):
    """Hàm hỗ trợ duyệt theo chiều sâu"""
    res.append(vet)  # Ghi lại đỉnh đã duyệt
    visited.add(vet)  # Đánh dấu đỉnh này đã được duyệt
    # Duyệt tất cả các đỉnh kề của đỉnh này
    for adjVet in graph.adj_list[vet]:
        if adjVet in visited:
            continue  # Bỏ qua các đỉnh đã được duyệt
        # Đệ quy duyệt các đỉnh kề
        dfs(graph, visited, res, adjVet)


def graph_dfs(graph: GraphAdjList, start_vet: Vertex) -&gt; list[Vertex]:
    """Duyệt theo chiều sâu"""
    # Sử dụng danh sách kề để biểu diễn đồ thị, nhằm lấy được tất cả các đỉnh kề của một đỉnh cho trước
    # Chuỗi các đỉnh đã duyệt
    res = []
    # Tập hợp băm dùng để ghi lại các đỉnh đã được duyệt
    visited = set[Vertex]()
    dfs(graph, visited, res, start_vet)
    return res</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Hàm hỗ trợ duyệt theo chiều sâu */
void dfs(GraphAdjList &amp;graph, unordered_set&lt;Vertex *&gt; &amp;visited, vector&lt;Vertex *&gt; &amp;res, Vertex *vet) {
    res.push_back(vet);   // Ghi lại đỉnh đã duyệt
    visited.emplace(vet); // Đánh dấu đỉnh này đã được duyệt
    // Duyệt tất cả các đỉnh kề của đỉnh này
    for (Vertex *adjVet : graph.adjList[vet]) {
        if (visited.count(adjVet))
            continue; // Bỏ qua các đỉnh đã được duyệt
        // Đệ quy duyệt các đỉnh kề
        dfs(graph, visited, res, adjVet);
    }
}

/* Duyệt theo chiều sâu */
// Sử dụng danh sách kề để biểu diễn đồ thị, nhằm lấy được tất cả các đỉnh kề của một đỉnh cho trước
vector&lt;Vertex *&gt; graphDFS(GraphAdjList &amp;graph, Vertex *startVet) {
    // Chuỗi các đỉnh đã duyệt
    vector&lt;Vertex *&gt; res;
    // Tập hợp băm dùng để ghi lại các đỉnh đã được duyệt
    unordered_set&lt;Vertex *&gt; visited;
    dfs(graph, visited, res, startVet);
    return res;
}</code></pre></div></div></div>

<p>Luồng thuật toán của duyệt theo chiều sâu được thể hiện trong hình dưới đây.</p>

<ul>
  <li><strong>Các đường nét đứt thẳng biểu diễn sự đệ quy đi xuống</strong>, chỉ ra rằng một phương thức đệ quy mới đã được khởi động để thăm một đỉnh mới.</li>
  <li><strong>Các đường nét đứt cong biểu diễn sự quay lui đi lên</strong>, chỉ ra rằng lệnh gọi đệ quy này đã quay trở lại điểm mà nó được gọi.</li>
</ul>

<p>Để hiểu sâu hơn, bạn nên kết hợp hình dưới đây với đoạn mã để mô phỏng (hoặc vẽ ra) toàn bộ quá trình DFS trong đầu, bao gồm cả thời điểm mỗi lệnh gọi đệ quy bắt đầu và khi nào nó quay lại.</p>

<div class="interactive-widget-wrapper" id="graph-dfs-steps-wrapper"><div class="slider-container"><div class="slide active"><img loading="lazy" src="dsa-assets/graph_dfs_step1.png" alt="Bước 1: Duyệt DFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 1: Duyệt DFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_dfs_step2.png" alt="Bước 2: Duyệt DFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 2: Duyệt DFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_dfs_step3.png" alt="Bước 3: Duyệt DFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 3: Duyệt DFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_dfs_step4.png" alt="Bước 4: Duyệt DFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 4: Duyệt DFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_dfs_step5.png" alt="Bước 5: Duyệt DFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 5: Duyệt DFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_dfs_step6.png" alt="Bước 6: Duyệt DFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 6: Duyệt DFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_dfs_step7.png" alt="Bước 7: Duyệt DFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 7: Duyệt DFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_dfs_step8.png" alt="Bước 8: Duyệt DFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 8: Duyệt DFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_dfs_step9.png" alt="Bước 9: Duyệt DFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 9: Duyệt DFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_dfs_step10.png" alt="Bước 10: Duyệt DFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 10: Duyệt DFS</p></div><div class="slide"><img loading="lazy" src="dsa-assets/graph_dfs_step11.png" alt="Bước 11: Duyệt DFS" style="max-width:100%; height:auto; border-radius: var(--radius-md);" /><p class="slide-caption">Bước 11: Duyệt DFS</p></div><div class="slider-controls"><button class="slider-btn" onclick="prevSlide('graph-dfs-steps-wrapper')">◀ Trước</button><span class="slider-indicator">Bước 1 / 11</span><button class="slider-btn" onclick="nextSlide('graph-dfs-steps-wrapper')">Sau ▶</button></div></div></div>

<div class="callout callout-question">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Thứ tự duyệt theo chiều sâu có phải là duy nhất không?</strong></p>
    <p>Tương tự như duyệt theo chiều rộng, thứ tự duyệt theo chiều sâu cũng không duy nhất. Với một đỉnh cho trước, bất kỳ hướng khám phá nào cũng có thể được chọn trước; nghĩa là, thứ tự các đỉnh kề có thể được sắp xếp lại tùy ý mà vẫn tạo thành duyệt theo chiều sâu.</p>
    <p>Lấy ví dụ về duyệt cây, "gốc $\\rightarrow$ trái $\\rightarrow$ phải", "trái $\\rightarrow$ gốc $\\rightarrow$ phải", và "trái $\\rightarrow$ phải $\\rightarrow$ gốc" tương ứng với duyệt tiền thứ tự, trung thứ tự và hậu thứ tự. Chúng đại diện cho ba thứ tự ưu tiên duyệt khác nhau, nhưng cả ba đều thuộc về duyệt theo chiều sâu.</p>
  </div>
</div>

<h3>9.3.2.2 Phân tích độ phức tạp</h3>

<p><strong>Độ phức tạp thời gian</strong>: Tất cả các đỉnh sẽ được thăm $1$ lần, sử dụng thời gian $O(|V|)$; tất cả các cạnh sẽ được thăm $2$ lần, sử dụng thời gian $O(2|E|)$; tổng thể sử dụng thời gian $O(|V| + |E|)$.</p>

<p><strong>Độ phức tạp không gian</strong>: Danh sách <code>res</code> và tập hợp băm <code>visited</code> có thể chứa tối đa $|V|$ đỉnh, và độ sâu đệ quy tối đa là $|V|$, do đó sử dụng không gian $O(|V|)$.</p>

<h2>9.3.3 Mô phỏng tương tác</h2>

<p>Widget dưới đây mô phỏng BFS và DFS trên một đồ thị lưới $3 \\times 3$ mẫu (9 đỉnh, đánh số 0-8), giúp bạn quan sát trực quan sự khác biệt giữa hai chiến lược duyệt.</p>


<div class="interactive-widget-wrapper" id="graph-traversal-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'graph-traversal-wrapper', 'tab-static')">
      📸 Minh họa tĩnh
    </button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'graph-traversal-wrapper', 'tab-interactive'); initGraphTraversalDemo()">
      ⚡ Mô phỏng tương tác
    </button>
  </div>

  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="text-align:center; color: var(--text-secondary);">Xem tab "Mô phỏng tương tác" để chạy từng bước BFS/DFS trên một đồ thị lưới 3x3 mẫu.</p>
  </div>

  <div class="widget-tab-content" data-tab="tab-interactive">
    <div style="display:flex; gap:10px; justify-content:center; margin-bottom:1em;">
      <button id="graph-traversal-btn-bfs" class="control-btn" onclick="setGraphTraversalMode('bfs')">BFS (Chiều rộng)</button>
      <button id="graph-traversal-btn-dfs" class="control-btn btn-secondary" onclick="setGraphTraversalMode('dfs')">DFS (Chiều sâu)</button>
    </div>
    <div id="graph-traversal-canvas" style="display:flex; justify-content:center; margin-bottom:1em;"></div>
    <div style="text-align:center; margin-bottom:1em;">
      <strong>Thứ tự duyệt:</strong> <span id="graph-traversal-result" style="font-family:monospace;"></span>
    </div>
    <div class="simulator-controls" style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
      <button id="graph-traversal-btn-autorun" class="control-btn" onclick="autoRunGraphTraversal()">▶ Auto Run</button>
      <button id="graph-traversal-btn-step" class="control-btn" onclick="stepGraphTraversal()">Bước tiếp theo ▶</button>
      <button id="graph-traversal-btn-pause" class="control-btn btn-secondary" onclick="pauseRunGraphTraversal()" disabled>⏸ Dừng</button>
      <button id="graph-traversal-btn-reset" class="control-btn btn-secondary" onclick="initGraphTraversalDemo()">↺ Reset</button>
    </div>
    <div id="graph-traversal-speed-control" style="text-align:center; margin-top:0.5em;">
      Tốc độ: <input type="range" min="200" max="2000" value="800" step="200"
                      oninput="setGraphTraversalSpeed(this.value)" /> <span id="graph-traversal-speed-label">800ms</span>
    </div>
    <div id="graph-traversal-status" class="simulator-status" style="text-align:center; margin-top:0.5em; color: var(--text-secondary);">
      Nhấp "Auto Run" để bắt đầu mô phỏng tự động.
    </div>
  </div>
</div>


`,
    originalContent: `

# Graph Traversal

Trees represent "one-to-many" relationships, while graphs have a higher degree of freedom and can represent any "many-to-many" relationships. Therefore, we can view trees as a special case of graphs. Clearly, **tree traversal operations are also a special case of graph traversal operations**.

Both graphs and trees require the application of search algorithms to implement traversal operations. Graph traversal methods can also be divided into two types: <u>breadth-first traversal</u> and <u>depth-first traversal</u>.

## Breadth-First Search

**Breadth-first search proceeds from near to far: starting from a given node, it always visits the nearest vertices first and expands outward layer by layer**. As shown in the figure below, starting from the top-left vertex, first traverse all adjacent vertices of that vertex, then traverse all adjacent vertices of the next vertex, and so on, until all vertices have been visited.

![Breadth-first search of a graph](graph_traversal.assets/graph_bfs.png)

### Algorithm Implementation

BFS is typically implemented with the help of a queue, as shown in the code below. The queue has a "first in, first out" property, which aligns with the BFS idea of "near to far".

1. Add the starting vertex \`startVet\` to the queue and begin the loop.
2. In each iteration of the loop, pop the vertex at the front of the queue and record it as visited, then add all adjacent vertices of that vertex to the back of the queue.
3. Repeat step \`2.\` until all vertices have been visited.

To prevent revisiting vertices, we use a hash set \`visited\` to record which nodes have been visited.

!!! tip

    A hash set can be viewed as a hash table that stores only \`key\` without storing \`value\`. It supports insertion, deletion, lookup, and update operations on \`key\` in $O(1)$ time. Based on the uniqueness of \`key\`, hash sets are typically used for data deduplication and similar scenarios.

\`\`\`src
[file]{{graph_bfs}}-[class]{{}}-[func]{{graph_bfs}}
\`\`\`

The code is relatively abstract; it is recommended to refer to the figure below to deepen understanding.

=== "<1>"
    ![Steps of breadth-first search of a graph](graph_traversal.assets/graph_bfs_step1.png)

=== "<2>"
    ![graph_bfs_step2](graph_traversal.assets/graph_bfs_step2.png)

=== "<3>"
    ![graph_bfs_step3](graph_traversal.assets/graph_bfs_step3.png)

=== "<4>"
    ![graph_bfs_step4](graph_traversal.assets/graph_bfs_step4.png)

=== "<5>"
    ![graph_bfs_step5](graph_traversal.assets/graph_bfs_step5.png)

=== "<6>"
    ![graph_bfs_step6](graph_traversal.assets/graph_bfs_step6.png)

=== "<7>"
    ![graph_bfs_step7](graph_traversal.assets/graph_bfs_step7.png)

=== "<8>"
    ![graph_bfs_step8](graph_traversal.assets/graph_bfs_step8.png)

=== "<9>"
    ![graph_bfs_step9](graph_traversal.assets/graph_bfs_step9.png)

=== "<10>"
    ![graph_bfs_step10](graph_traversal.assets/graph_bfs_step10.png)

=== "<11>"
    ![graph_bfs_step11](graph_traversal.assets/graph_bfs_step11.png)

!!! question "Is the breadth-first traversal sequence unique?"

    Not unique. Breadth-first search only requires traversing in a "near to far" order, **and the traversal order of vertices at the same distance can be arbitrarily shuffled**. Taking the figure above as an example, the visit order of vertices $1$ and $3$ can be swapped, as can the visit order of vertices $2$, $4$, and $6$.

### Complexity Analysis

**Time complexity**: All vertices will be enqueued and dequeued once, using $O(|V|)$ time; in the process of traversing adjacent vertices, since it is an undirected graph, all edges will be visited $2$ times, using $O(2|E|)$ time; overall using $O(|V| + |E|)$ time.

**Space complexity**: The list \`res\`, hash set \`visited\`, and queue \`que\` can contain at most $|V|$ vertices, using $O(|V|)$ space.

## Depth-First Search

**Depth-first search is a traversal method that prioritizes going as far as possible, then backtracks when no path remains**. As shown in the figure below, starting from the top-left vertex, visit an adjacent vertex of the current vertex, continuing until reaching a dead end, then return and continue going as far as possible before returning again, and so on, until all vertices have been traversed.

![Depth-first search of a graph](graph_traversal.assets/graph_dfs.png)

### Algorithm Implementation

This "go as far as possible then return" algorithm paradigm is typically implemented using recursion. Similar to breadth-first search, in depth-first search we also need a hash set \`visited\` to record visited vertices and avoid revisiting.

\`\`\`src
[file]{{graph_dfs}}-[class]{{}}-[func]{{graph_dfs}}
\`\`\`

The algorithm flow of depth-first search is shown in the figure below.

- **Straight dashed lines represent downward recursion**, indicating that a new recursive method has been initiated to visit a new vertex.
- **Curved dashed lines represent upward backtracking**, indicating that this recursive call has returned to the point where it was made.

To deepen understanding, it is recommended to combine the figure below with the code to mentally simulate (or draw out) the entire DFS process, including when each recursive call begins and when it returns.

=== "<1>"
    ![Steps of depth-first search of a graph](graph_traversal.assets/graph_dfs_step1.png)

=== "<2>"
    ![graph_dfs_step2](graph_traversal.assets/graph_dfs_step2.png)

=== "<3>"
    ![graph_dfs_step3](graph_traversal.assets/graph_dfs_step3.png)

=== "<4>"
    ![graph_dfs_step4](graph_traversal.assets/graph_dfs_step4.png)

=== "<5>"
    ![graph_dfs_step5](graph_traversal.assets/graph_dfs_step5.png)

=== "<6>"
    ![graph_dfs_step6](graph_traversal.assets/graph_dfs_step6.png)

=== "<7>"
    ![graph_dfs_step7](graph_traversal.assets/graph_dfs_step7.png)

=== "<8>"
    ![graph_dfs_step8](graph_traversal.assets/graph_dfs_step8.png)

=== "<9>"
    ![graph_dfs_step9](graph_traversal.assets/graph_dfs_step9.png)

=== "<10>"
    ![graph_dfs_step10](graph_traversal.assets/graph_dfs_step10.png)

=== "<11>"
    ![graph_dfs_step11](graph_traversal.assets/graph_dfs_step11.png)

!!! question "Is the depth-first traversal sequence unique?"

    Similar to breadth-first search, depth-first traversal sequences are also not unique. Given a vertex, any exploration direction may be chosen first; that is, the order of adjacent vertices can be arbitrarily rearranged and still constitute depth-first search.

    Taking tree traversal as an example, "root $\\rightarrow$ left $\\rightarrow$ right", "left $\\rightarrow$ root $\\rightarrow$ right", and "left $\\rightarrow$ right $\\rightarrow$ root" correspond to pre-order, in-order, and post-order traversals, respectively. They represent three different traversal priorities, yet all three belong to depth-first search.

### Complexity Analysis

**Time complexity**: All vertices will be visited $1$ time, using $O(|V|)$ time; all edges will be visited $2$ times, using $O(2|E|)$ time; overall using $O(|V| + |E|)$ time.

**Space complexity**: The list \`res\` and hash set \`visited\` can contain at most $|V|$ vertices, and the maximum recursion depth is $|V|$, therefore using $O(|V|)$ space.

`
  },

  'dsa-graph-summary': {
    title: '9.4 Tóm tắt & Hỏi đáp',
    summary: 'Tổng kết các kiến thức chính về Đồ thị: khái niệm, phân loại, cách biểu diễn (ma trận kề, danh sách kề), và các phương pháp duyệt đồ thị (BFS, DFS).',
    tags: ['dsa', 'graph', 'summary'],
    domain: 'Algorithms',
    module: 'Chương 9: Đồ thị',
    prerequisites: ['dsa-graph-traversal'],
    related: ['dsa-graph-index'],
    updatedAt: '2026-07-19',
    readTime: '6 phút',
    content: `

<h2>Điểm lại kiến thức chính</h2>
<ul>
  <li>Đồ thị bao gồm các đỉnh và cạnh, và có thể được biểu diễn dưới dạng một tập hợp các đỉnh và một tập hợp các cạnh.</li>
  <li>So với mối quan hệ tuyến tính được mô hình hóa bởi danh sách liên kết và mối quan hệ chia để trị được mô hình hóa bởi cây, mối quan hệ mạng lưới được mô hình hóa bởi đồ thị mang lại sự linh hoạt lớn hơn nhiều, và do đó phức tạp hơn.</li>
  <li>Trong đồ thị có hướng, các cạnh có hướng; trong đồ thị liên thông, mọi đỉnh đều có thể đến được từ bất kỳ đỉnh nào khác; và trong đồ thị có trọng số, mỗi cạnh mang một trọng số.</li>
  <li>Ma trận kề sử dụng ma trận để biểu diễn đồ thị, trong đó mỗi hàng (cột) đại diện cho một đỉnh, và các phần tử ma trận đại diện cho các cạnh, sử dụng $1$ hoặc $0$ để chỉ ra hai đỉnh có cạnh hay không. Ma trận kề có hiệu suất rất cao cho các thao tác thêm, xóa, tìm kiếm và sửa đổi, nhưng tiêu tốn không gian đáng kể.</li>
  <li>Danh sách kề sử dụng nhiều danh sách liên kết để biểu diễn một đồ thị: danh sách liên kết thứ $i$ tương ứng với đỉnh $i$ và lưu trữ tất cả các đỉnh kề với nó. So với ma trận kề, danh sách kề sử dụng ít không gian hơn, nhưng việc tìm kiếm cạnh kém hiệu quả hơn vì phải duyệt qua danh sách liên kết.</li>
  <li>Khi các danh sách liên kết trong danh sách kề trở nên quá dài, chúng có thể được chuyển đổi thành cây đỏ đen hoặc bảng băm, từ đó cải thiện hiệu suất tìm kiếm.</li>
  <li>Từ góc độ thuật toán, ma trận kề thể hiện "đánh đổi không gian lấy thời gian", trong khi danh sách kề thể hiện "đánh đổi thời gian lấy không gian".</li>
  <li>Đồ thị có thể được sử dụng để mô hình hóa nhiều hệ thống thực tế khác nhau, chẳng hạn như mạng xã hội và tuyến tàu điện ngầm.</li>
  <li>Cây là một trường hợp đặc biệt của đồ thị, và duyệt cây là một trường hợp đặc biệt của duyệt đồ thị.</li>
  <li>Duyệt theo chiều rộng trong đồ thị khám phá từ gần đến xa, mở rộng theo từng lớp, và thường được triển khai bằng hàng đợi.</li>
  <li>Duyệt theo chiều sâu trong đồ thị đi theo một đường đi càng sâu càng tốt và quay lui khi không thể đi xa hơn, thường được triển khai bằng đệ quy.</li>
</ul>

<h2>Hỏi & Đáp</h2>

<div class="callout callout-question">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Đường đi được định nghĩa là một dãy các đỉnh hay một dãy các cạnh?</strong></p>
    <p>Định nghĩa trong các phiên bản ngôn ngữ khác nhau của Wikipedia không nhất quán: phiên bản tiếng Anh cho rằng "đường đi là một dãy các cạnh", trong khi phiên bản tiếng Trung cho rằng "đường đi là một dãy các đỉnh". Nguyên văn tiếng Anh như sau: In graph theory, a path in a graph is a finite or infinite sequence of edges which joins a sequence of vertices.</p>
    <p>Trong tài liệu này, đường đi được xem là một dãy các cạnh, không phải một dãy các đỉnh. Điều này là vì có thể có nhiều cạnh nối giữa hai đỉnh, trong trường hợp đó mỗi cạnh tương ứng với một đường đi.</p>
  </div>
</div>

<div class="callout callout-question">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Trong một đồ thị không liên thông, có tồn tại các đỉnh không thể đến được không?</strong></p>
    <p>Trong một đồ thị không liên thông, nếu bắt đầu từ một đỉnh, sẽ có ít nhất một đỉnh khác không thể đến được. Để duyệt một đồ thị không liên thông, ta cần nhiều điểm xuất phát để tất cả các thành phần liên thông đều được bao phủ.</p>
  </div>
</div>

<div class="callout callout-question">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p><strong>Trong danh sách kề, có yêu cầu thứ tự nào đối với các đỉnh kề với một đỉnh cho trước không?</strong></p>
    <p>Chúng có thể xuất hiện theo bất kỳ thứ tự nào. Tuy nhiên, trong thực tế, đôi khi chúng cần được sắp xếp theo các quy tắc cụ thể, chẳng hạn như thứ tự thêm đỉnh hoặc thứ tự giá trị đỉnh, điều này hữu ích khi cần nhanh chóng tìm một đỉnh có giá trị cực trị nào đó.</p>
  </div>
</div>

`,
    originalContent: `

# Summary

### Key Review

- Graphs consist of vertices and edges and can be represented as a set of vertices and a set of edges.
- Compared with the linear relationships modeled by linked lists and the divide-and-conquer relationships modeled by trees, the network relationships modeled by graphs offer much greater flexibility and are therefore more complex.
- In directed graphs, edges have direction; in connected graphs, every vertex is reachable from any other vertex; and in weighted graphs, each edge carries a weight.
- Adjacency matrices use matrices to represent graphs, where each row (column) represents a vertex, and matrix elements represent edges, using $1$ or $0$ to indicate whether two vertices have an edge or not. Adjacency matrices are highly efficient for addition, deletion, lookup, and modification operations, but consume significant space.
- Adjacency lists use multiple linked lists to represent a graph: the $i$-th linked list corresponds to vertex $i$ and stores all vertices adjacent to it. Compared with adjacency matrices, adjacency lists use less space, but edge lookups are less efficient because the linked list must be traversed.
- When linked lists in adjacency lists become too long, they can be converted to red-black trees or hash tables, thereby improving lookup efficiency.
- From an algorithmic perspective, adjacency matrices embody "trading space for time", while adjacency lists embody "trading time for space".
- Graphs can be used to model various real-world systems, such as social networks and subway lines.
- Trees are a special case of graphs, and tree traversal is a special case of graph traversal.
- Breadth-first search in graphs explores from near to far, expanding layer by layer, and is typically implemented with a queue.
- Depth-first search in graphs follows a path as deep as possible and backtracks when it can go no farther, and is commonly implemented with recursion.

### Q & A

**Q**: Is a path defined as a sequence of vertices or a sequence of edges?

The definitions in different language versions of Wikipedia are inconsistent: the English version states "a path is a sequence of edges", while the Chinese version states "a path is a sequence of vertices". The following is the original English text: In graph theory, a path in a graph is a finite or infinite sequence of edges which joins a sequence of vertices.

In this text, a path is viewed as a sequence of edges, not a sequence of vertices. This is because there may be multiple edges connecting two vertices, in which case each edge corresponds to a path.

**Q**: In a disconnected graph, will there be unreachable vertices?

In a disconnected graph, if you start from one vertex, at least one other vertex will be unreachable. To traverse a disconnected graph, you need multiple starting points so that all connected components are covered.

**Q**: In an adjacency list, is there any required ordering for the vertices adjacent to a given vertex?

They can appear in any order. In practice, however, they may need to be sorted according to specific rules, such as the order in which vertices were added or the order of vertex values, which helps when quickly finding a vertex with some extreme value.

`
  },

});
