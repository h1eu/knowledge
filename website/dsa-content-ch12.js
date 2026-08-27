/* ============================================================
   Knowledge OS — DSA Module: Chương 12 - Chia để trị (Divide and Conquer)
   ============================================================ */

Object.assign(DSA_CONTENT, {

  'dsa-divide-conquer-index': {
    title: 'Chia để trị (Divide and Conquer)',
    summary: 'Khám phá chiến lược Chia để trị - một trong những nguyên lý quan trọng nhất trong thiết kế thuật toán để phân rã các bài toán phức tạp.',
    tags: ['dsa', 'divide-and-conquer', 'algorithm-design'],
    domain: 'Algorithms',
    module: 'Chương 12: Chia để trị',
    prerequisites: ['dsa-sorting-summary'],
    related: ['dsa-divide-conquer'],
    updatedAt: '2026-07-19',
    readTime: '1 phút',
    content: `

<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/chapter_divide_and_conquer.jpg" alt="Chia để trị" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<div class="callout callout-note">
  <span class="callout-icon">✨</span>
  <div class="callout-body">
    <p>Những bài toán khó bị phân rã dần dần từng lớp một, mỗi lần phân rã lại khiến nó trở nên đơn giản hơn.</p>
    <p>Chia để trị hé lộ một chân lý quan trọng: hãy bắt đầu từ điều đơn giản, và sẽ chẳng còn gì là phức tạp nữa.</p>
  </div>
</div>

`,
    originalContent: `
# Divide and Conquer

![Divide and conquer](../assets/covers/chapter_divide_and_conquer.jpg)

!!! abstract

    Difficult problems are decomposed layer by layer, with each decomposition making them simpler.

    Divide and conquer reveals an important truth: start with what is simple, and nothing remains complex.

`
  },

  'dsa-divide-conquer': {
    title: '12.1 Thuật toán Chia để trị',
    summary: 'Tìm hiểu bản chất hai giai đoạn Chia (Divide) và Trị (Conquer), cách xác định một bài toán có phù hợp với Chia để trị hay không, và lý do vì sao chiến lược này cải thiện hiệu suất thuật toán.',
    tags: ['dsa', 'divide-and-conquer', 'algorithm-design', 'merge-sort'],
    domain: 'Algorithms',
    module: 'Chương 12: Chia để trị',
    prerequisites: ['dsa-divide-conquer-index'],
    related: ['dsa-binary-search-recur'],
    updatedAt: '2026-07-19',
    readTime: '8 phút',
    content: `

<p><u>Chia để trị (Divide and Conquer)</u> là một chiến lược thiết kế thuật toán rất quan trọng và phổ biến. Chia để trị thường được triển khai dựa trên đệ quy, bao gồm hai bước: "chia" và "trị".</p>
<ol>
  <li><strong>Chia (giai đoạn phân chia):</strong> Đệ quy chia bài toán gốc thành hai hoặc nhiều bài toán con cho đến khi đạt được bài toán con nhỏ nhất.</li>
  <li><strong>Trị (giai đoạn gộp):</strong> Bắt đầu từ các bài toán con nhỏ nhất đã có nghiệm, gộp nghiệm của các bài toán con từ dưới lên trên để xây dựng nghiệm của bài toán gốc.</li>
</ol>
<p>Như hình dưới đây, "sắp xếp trộn" (merge sort) là một trong những ứng dụng tiêu biểu của chiến lược chia để trị.</p>
<ol>
  <li><strong>Chia:</strong> Đệ quy chia mảng gốc (bài toán gốc) thành hai mảng con (bài toán con) cho đến khi mảng con chỉ còn một phần tử (bài toán con nhỏ nhất).</li>
  <li><strong>Trị:</strong> Gộp các mảng con đã sắp xếp (nghiệm của bài toán con) từ dưới lên trên để thu được mảng gốc đã sắp xếp (nghiệm của bài toán gốc).</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/divide_and_conquer_merge_sort.png" alt="Chiến lược chia để trị của sắp xếp trộn" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>Làm sao để xác định bài toán Chia để trị?</h2>
<p>Một bài toán có phù hợp để giải bằng chia để trị hay không thường có thể xác định dựa trên các tiêu chí sau.</p>
<ol>
  <li><strong>Bài toán có thể phân rã:</strong> Bài toán gốc có thể được chia thành các bài toán con nhỏ hơn, có bản chất tương tự, và có thể tiếp tục chia đệ quy theo cùng một cách.</li>
  <li><strong>Các bài toán con độc lập:</strong> Không có sự chồng lấn giữa các bài toán con, chúng độc lập với nhau và có thể giải quyết độc lập.</li>
  <li><strong>Nghiệm của các bài toán con có thể gộp lại:</strong> Nghiệm của bài toán gốc thu được bằng cách gộp nghiệm của các bài toán con.</li>
</ol>
<p>Rõ ràng, sắp xếp trộn thỏa mãn cả ba tiêu chí này.</p>
<ol>
  <li><strong>Bài toán có thể phân rã:</strong> Đệ quy chia mảng (bài toán gốc) thành hai mảng con (bài toán con).</li>
  <li><strong>Các bài toán con độc lập:</strong> Mỗi mảng con có thể được sắp xếp độc lập (các bài toán con có thể giải quyết độc lập).</li>
  <li><strong>Nghiệm của các bài toán con có thể gộp lại:</strong> Hai mảng con đã sắp xếp (nghiệm của các bài toán con) có thể được gộp thành một mảng đã sắp xếp (nghiệm của bài toán gốc).</li>
</ol>

<h2>Cải thiện hiệu suất nhờ Chia để trị</h2>
<p><strong>Chia để trị không chỉ giải quyết hiệu quả các bài toán thuật toán, mà thường còn có thể cải thiện hiệu suất thuật toán</strong>. Trong các thuật toán sắp xếp, sắp xếp nhanh (quick sort), sắp xếp trộn (merge sort) và sắp xếp vun đống (heap sort) đều nhanh hơn sắp xếp chọn, sắp xếp nổi bọt và sắp xếp chèn vì chúng áp dụng chiến lược chia để trị.</p>
<p>Điều này đặt ra câu hỏi: <strong>Tại sao chia để trị có thể cải thiện hiệu suất thuật toán, và logic đằng sau nó là gì</strong>? Nói cách khác, tại sao chia bài toán lớn thành nhiều bài toán con, giải các bài toán con rồi gộp nghiệm lại, lại hiệu quả hơn so với giải trực tiếp bài toán gốc? Câu hỏi này có thể được thảo luận từ hai khía cạnh: số lượng phép tính và tính toán song song.</p>

<h3>Tối ưu số lượng phép tính</h3>
<p>Lấy "sắp xếp nổi bọt" (bubble sort) làm ví dụ, xử lý một mảng có độ dài $n$ cần thời gian $O(n^2)$. Giả sử ta chia mảng tại điểm giữa thành hai mảng con, như hình dưới đây. Việc chia cần thời gian $O(n)$, sắp xếp mỗi mảng con cần thời gian $O((n / 2)^2)$, và gộp hai mảng con cần thời gian $O(n)$, dẫn đến độ phức tạp thời gian tổng thể là:</p>
$$
O(n + (\\frac{n}{2})^2 \\times 2 + n) = O(\\frac{n^2}{2} + 2n)
$$
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/divide_and_conquer_bubble_sort.png" alt="Mảng trước và sau khi chia trong sắp xếp nổi bọt" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Tiếp theo, ta tính bất đẳng thức sau, trong đó vế trái và vế phải lần lượt biểu diễn tổng số phép tính trước và sau khi chia:</p>
$$
\\begin{aligned}
n^2 & > \\frac{n^2}{2} + 2n \\newline
n^2 - \\frac{n^2}{2} - 2n & > 0 \\newline
n(n - 4) & > 0
\\end{aligned}
$$
<p><strong>Điều này có nghĩa là khi $n > 4$, số lượng phép tính sau khi chia sẽ nhỏ hơn, và hiệu suất sắp xếp sẽ cao hơn</strong>. Lưu ý rằng độ phức tạp thời gian sau khi chia vẫn là bậc hai $O(n^2)$, nhưng hằng số trong độ phức tạp đã trở nên nhỏ hơn.</p>
<p>Đi xa hơn, <strong>điều gì sẽ xảy ra nếu ta liên tục chia các mảng con từ điểm giữa của chúng thành hai mảng con</strong> cho đến khi các mảng con chỉ còn một phần tử? Cách tiếp cận này thực chất chính là "sắp xếp trộn" (merge sort), với độ phức tạp thời gian là $O(n \\log n)$.</p>
<p>Suy nghĩ xa hơn nữa, <strong>điều gì sẽ xảy ra nếu ta đặt nhiều điểm chia</strong> và chia đều mảng gốc thành $k$ mảng con? Tình huống này rất giống với "sắp xếp theo xô" (bucket sort), rất phù hợp để sắp xếp một lượng lớn dữ liệu, với độ phức tạp thời gian lý thuyết là $O(n + k)$.</p>

<h3>Tối ưu tính toán song song</h3>
<p>Chúng ta biết rằng các bài toán con được sinh ra bởi chia để trị độc lập với nhau, <strong>vì vậy chúng thường có thể được giải quyết song song</strong>. Điều này có nghĩa là chia để trị không chỉ có thể giảm độ phức tạp thời gian của thuật toán, <strong>mà còn dễ dàng được tối ưu song song hóa bởi hệ điều hành</strong>.</p>
<p>Tối ưu song song đặc biệt hiệu quả trong môi trường đa lõi hoặc đa bộ xử lý, vì hệ thống có thể xử lý đồng thời nhiều bài toán con, tận dụng đầy đủ hơn tài nguyên tính toán và giảm đáng kể tổng thời gian chạy.</p>
<p>Ví dụ, trong "sắp xếp theo xô" như hình dưới đây, ta phân phối đều một lượng lớn dữ liệu vào các xô khác nhau, và các tác vụ sắp xếp cho tất cả các xô có thể được phân phối cho các đơn vị tính toán khác nhau. Sau khi hoàn thành, kết quả sẽ được gộp lại.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/divide_and_conquer_parallel_computing.png" alt="Tính toán song song trong sắp xếp theo xô" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h2>Các ứng dụng phổ biến của Chia để trị</h2>
<p>Một mặt, chia để trị có thể được dùng để giải nhiều bài toán thuật toán kinh điển.</p>
<ul>
  <li><strong>Tìm cặp điểm gần nhau nhất:</strong> Thuật toán này trước tiên chia tập điểm thành hai phần, sau đó tìm cặp điểm gần nhau nhất trong mỗi phần một cách riêng biệt, và cuối cùng tìm cặp điểm gần nhau nhất trải dài trên cả hai phần.</li>
  <li><strong>Nhân số nguyên lớn:</strong> Ví dụ, thuật toán Karatsuba, phân rã phép nhân số nguyên lớn thành nhiều phép nhân và phép cộng số nguyên nhỏ hơn.</li>
  <li><strong>Nhân ma trận:</strong> Ví dụ, thuật toán Strassen, phân rã phép nhân ma trận lớn thành nhiều phép nhân và phép cộng ma trận nhỏ.</li>
  <li><strong>Bài toán Tháp Hà Nội (Hanota):</strong> Bài toán Hanota có thể được giải bằng đệ quy, đây là một ứng dụng tiêu biểu của chiến lược chia để trị.</li>
  <li><strong>Giải bài toán cặp nghịch thế (inversion pairs):</strong> Trong một dãy số, nếu một số đứng trước lớn hơn một số đứng sau, hai số này tạo thành một cặp nghịch thế. Giải bài toán cặp nghịch thế có thể tận dụng cách tiếp cận chia để trị với sự trợ giúp của sắp xếp trộn.</li>
</ul>
<p>Mặt khác, chia để trị được áp dụng rộng rãi trong thiết kế thuật toán và cấu trúc dữ liệu.</p>
<ul>
  <li><strong>Tìm kiếm nhị phân:</strong> Tìm kiếm nhị phân chia một mảng đã sắp xếp thành hai phần từ chỉ mục giữa, sau đó quyết định loại bỏ nửa nào dựa trên kết quả so sánh giữa giá trị mục tiêu và giá trị phần tử giữa, và thực hiện bước tìm kiếm nhị phân tương tự trên khoảng còn lại.</li>
  <li><strong>Sắp xếp trộn (Merge sort):</strong> Đã được giới thiệu ở đầu phần này, không cần trình bày thêm.</li>
  <li><strong>Sắp xếp nhanh (Quick sort):</strong> Sắp xếp nhanh chọn một giá trị pivot, sau đó chia mảng thành hai mảng con, một mảng chứa các phần tử nhỏ hơn pivot và mảng kia chứa các phần tử lớn hơn pivot, rồi thực hiện thao tác chia tương tự trên hai phần này cho đến khi các mảng con chỉ còn một phần tử.</li>
  <li><strong>Sắp xếp theo xô (Bucket sort):</strong> Ý tưởng cơ bản của sắp xếp theo xô là rải dữ liệu vào nhiều xô, sau đó sắp xếp các phần tử trong từng xô, và cuối cùng trích xuất các phần tử từ từng xô theo thứ tự để thu được một mảng đã sắp xếp.</li>
  <li><strong>Cây (Trees):</strong> Ví dụ, cây tìm kiếm nhị phân, cây AVL, cây đỏ-đen, cây B, cây B+, v.v. Các thao tác tìm kiếm, chèn và xóa của chúng đều có thể được xem là ứng dụng của chiến lược chia để trị.</li>
  <li><strong>Heap (Đống):</strong> Heap là một dạng cây nhị phân hoàn chỉnh đặc biệt, và các thao tác khác nhau của nó, như chèn, xóa và heapify, thực chất đều ngầm chứa ý tưởng chia để trị.</li>
  <li><strong>Bảng băm (Hash tables):</strong> Mặc dù bảng băm không trực tiếp áp dụng chia để trị, một số phương pháp giải quyết va chạm băm gián tiếp áp dụng chiến lược chia để trị. Ví dụ, các danh sách liên kết dài trong phương pháp nối chuỗi (chaining) có thể được chuyển đổi thành cây đỏ-đen để cải thiện hiệu quả tra cứu.</li>
</ul>
<p>Có thể thấy, <strong>chia để trị là một ý tưởng thuật toán "âm thầm len lỏi"</strong>, được nhúng vào trong nhiều thuật toán và cấu trúc dữ liệu khác nhau.</p>

`,
    originalContent: `
# Divide and Conquer Algorithms

<u>Divide and conquer</u> is a very important and common algorithmic strategy. Divide and conquer is typically implemented based on recursion, consisting of two steps: "divide" and "conquer".

1. **Divide (partition phase)**: Recursively divide the original problem into two or more subproblems until the smallest subproblem is reached.
2. **Conquer (merge phase)**: Starting from the smallest subproblems with known solutions, merge the solutions of subproblems from bottom to top to construct the solution to the original problem.

As shown in the figure below, "merge sort" is one of the typical applications of the divide and conquer strategy.

1. **Divide**: Recursively divide the original array (original problem) into two subarrays (subproblems) until the subarray has only one element (smallest subproblem).
2. **Conquer**: Merge the sorted subarrays (solutions to subproblems) from bottom to top to obtain a sorted original array (solution to the original problem).

![Divide and conquer strategy of merge sort](divide_and_conquer.assets/divide_and_conquer_merge_sort.png)

## How to Determine Divide and Conquer Problems

Whether a problem is suitable for solving with divide and conquer can usually be determined based on the following criteria.

1. **The problem can be decomposed**: The original problem can be divided into smaller, similar subproblems, and can be recursively divided in the same way.
2. **Subproblems are independent**: There is no overlap between subproblems, they are independent of each other and can be solved independently.
3. **Solutions of subproblems can be merged**: The solution to the original problem is obtained by merging the solutions of subproblems.

Clearly, merge sort satisfies these three criteria.

1. **The problem can be decomposed**: Recursively divide the array (original problem) into two subarrays (subproblems).
2. **Subproblems are independent**: Each subarray can be sorted independently (subproblems can be solved independently).
3. **Solutions of subproblems can be merged**: Two sorted subarrays (solutions of subproblems) can be merged into one sorted array (solution of the original problem).

## Improving Efficiency Through Divide and Conquer

**Divide and conquer can not only effectively solve algorithmic problems, but can often also improve algorithmic efficiency**. In sorting algorithms, quick sort, merge sort, and heap sort are faster than selection, bubble, and insertion sort because they apply the divide and conquer strategy.

This raises the question: **Why can divide and conquer improve algorithm efficiency, and what is the underlying logic**? In other words, why is dividing a large problem into multiple subproblems, solving the subproblems, and merging their solutions more efficient than directly solving the original problem? This question can be discussed from two aspects: operation count and parallel computation.

### Operation Count Optimization

Taking "bubble sort" as an example, processing an array of length $n$ requires $O(n^2)$ time. Suppose we divide the array at the midpoint into two subarrays, as shown in the figure below. The division requires $O(n)$ time, sorting each subarray requires $O((n / 2)^2)$ time, and merging the two subarrays requires $O(n)$ time, resulting in an overall time complexity of:

$$
O(n + (\\frac{n}{2})^2 \\times 2 + n) = O(\\frac{n^2}{2} + 2n)
$$

![Bubble sort before and after array division](divide_and_conquer.assets/divide_and_conquer_bubble_sort.png)

Next, we compute the following inequality, where the left and right sides represent the total number of operations before and after division, respectively:

$$
\\begin{aligned}
n^2 & > \\frac{n^2}{2} + 2n \\newline
n^2 - \\frac{n^2}{2} - 2n & > 0 \\newline
n(n - 4) & > 0
\\end{aligned}
$$

**This means that when $n > 4$, the number of operations after division is smaller, and sorting efficiency should be higher**. Note that the time complexity after division is still quadratic $O(n^2)$, but the constant term in the complexity has become smaller.

Going further, **what if we continuously divide the subarrays from their midpoints into two subarrays** until the subarrays have only one element? This approach is actually "merge sort", with a time complexity of $O(n \\log n)$.

Thinking further, **what if we set multiple division points** and evenly divide the original array into $k$ subarrays? This situation is very similar to "bucket sort", which is well-suited for sorting massive amounts of data, with a theoretical time complexity of $O(n + k)$.

### Parallel Computation Optimization

We know that the subproblems generated by divide and conquer are independent of each other, **so they can typically be solved in parallel**. This means divide and conquer can not only reduce the time complexity of algorithms, **but is also amenable to parallel optimization by the operating system**.

Parallel optimization is particularly effective in multi-core or multi-processor environments, as the system can simultaneously handle multiple subproblems, making fuller use of computing resources and significantly reducing overall runtime.

For example, in the "bucket sort" shown in the figure below, we evenly distribute massive data into various buckets, and the sorting tasks for all buckets can be distributed to various computing units. After completion, the results are merged.

![Parallel computation in bucket sort](divide_and_conquer.assets/divide_and_conquer_parallel_computing.png)

## Common Applications of Divide and Conquer

On the one hand, divide and conquer can be used to solve many classic algorithmic problems.

- **Finding the closest pair of points**: This algorithm first divides the point set into two parts, then finds the closest pair of points in each part separately, and finally finds the closest pair of points that spans both parts.
- **Large integer multiplication**: For example, the Karatsuba algorithm, which decomposes large integer multiplication into several smaller integer multiplications and additions.
- **Matrix multiplication**: For example, the Strassen algorithm, which decomposes large matrix multiplication into multiple small matrix multiplications and additions.
- **Hanota problem**: The hanota problem can be solved through recursion, which is a typical application of the divide and conquer strategy.
- **Solving inversion pairs**: In a sequence, if a preceding number is greater than a following number, these two numbers form an inversion pair. Solving the inversion pair problem can utilize the divide and conquer approach with the help of merge sort.

On the other hand, divide and conquer is widely applied in the design of algorithms and data structures.

- **Binary search**: Binary search divides a sorted array into two parts from the midpoint index, then decides which half to eliminate based on the comparison result between the target value and the middle element value, and performs the same binary-search step on the remaining interval.
- **Merge sort**: Already introduced at the beginning of this section, no further elaboration needed.
- **Quick sort**: Quick sort selects a pivot value, then divides the array into two subarrays, one with elements smaller than the pivot and the other with elements larger than the pivot, then performs the same division operation on these two parts until the subarrays have only one element.
- **Bucket sort**: The basic idea of bucket sort is to scatter data into multiple buckets, then sort the elements within each bucket, and finally extract the elements from each bucket in sequence to obtain a sorted array.
- **Trees**: For example, binary search trees, AVL trees, red-black trees, B-trees, B+ trees, etc. Their search, insertion, and deletion operations can all be viewed as applications of the divide and conquer strategy.
- **Heaps**: A heap is a special complete binary tree, and its various operations, such as insertion, deletion, and heapify, actually imply the divide and conquer idea.
- **Hash tables**: Although hash tables do not directly apply divide and conquer, some methods for resolving hash collisions indirectly apply the divide and conquer strategy. For example, long linked lists in chaining may be converted to red-black trees to improve lookup efficiency.

It can be seen that **divide and conquer is a "quietly pervasive" algorithmic idea**, embedded in various algorithms and data structures.

`
  },

  'dsa-binary-search-recur': {
    title: '12.2 Tìm kiếm nhị phân bằng Đệ quy',
    summary: 'Hiểu bản chất của Binary Search dưới lăng kính của chiến lược Chia để trị, và cài đặt lại nó bằng đệ quy thay vì vòng lặp.',
    tags: ['dsa', 'divide-and-conquer', 'binary-search', 'recursion'],
    domain: 'Algorithms',
    module: 'Chương 12: Chia để trị',
    prerequisites: ['dsa-divide-conquer'],
    related: ['dsa-build-binary-tree'],
    updatedAt: '2026-07-19',
    readTime: '6 phút',
    content: `

<p>Ta đã biết rằng thuật toán tìm kiếm được chia thành hai loại chính.</p>
<ul>
  <li><strong>Tìm kiếm vét cạn (brute-force search):</strong> Được cài đặt bằng cách duyệt qua cấu trúc dữ liệu, với độ phức tạp thời gian là $O(n)$.</li>
  <li><strong>Tìm kiếm thích ứng (adaptive search):</strong> Tận dụng cách tổ chức dữ liệu đặc thù hoặc thông tin có trước, đạt độ phức tạp thời gian $O(\\log n)$ thậm chí $O(1)$.</li>
</ul>
<p>Thực tế, <strong>các thuật toán tìm kiếm với độ phức tạp thời gian $O(\\log n)$ thường được cài đặt dựa trên chiến lược chia để trị</strong>, ví dụ như tìm kiếm nhị phân và cây.</p>
<ul>
  <li>Mỗi bước của tìm kiếm nhị phân chia bài toán (tìm phần tử mục tiêu trong một mảng) thành một bài toán nhỏ hơn (tìm phần tử mục tiêu trong nửa mảng), tiếp tục cho đến khi mảng rỗng hoặc tìm thấy phần tử mục tiêu.</li>
  <li>Cây là đại diện tiêu biểu cho ý tưởng chia để trị. Trong các cấu trúc dữ liệu như cây tìm kiếm nhị phân, cây AVL và heap, độ phức tạp thời gian của các thao tác khác nhau là $O(\\log n)$.</li>
</ul>
<p>Chiến lược chia để trị của tìm kiếm nhị phân như sau.</p>
<ul>
  <li><strong>Bài toán có thể phân rã:</strong> Tìm kiếm nhị phân đệ quy phân rã bài toán gốc (tìm kiếm trong một mảng) thành bài toán con (tìm kiếm trong nửa mảng), đạt được bằng cách so sánh phần tử giữa với phần tử mục tiêu.</li>
  <li><strong>Các bài toán con độc lập:</strong> Trong tìm kiếm nhị phân, mỗi vòng chỉ xử lý một bài toán con, không bị ảnh hưởng bởi các bài toán con khác.</li>
  <li><strong>Nghiệm của các bài toán con không cần gộp lại:</strong> Tìm kiếm nhị phân nhằm tìm một phần tử cụ thể, vì vậy không cần gộp nghiệm của các bài toán con. Khi một bài toán con được giải, bài toán gốc cũng được giải.</li>
</ul>
<p>Chia để trị có thể cải thiện hiệu quả tìm kiếm vì tìm kiếm vét cạn chỉ có thể loại bỏ một lựa chọn mỗi vòng, <strong>trong khi tìm kiếm chia để trị có thể loại bỏ một nửa số lựa chọn mỗi vòng</strong>.</p>

<h3>Cài đặt Tìm kiếm nhị phân dựa trên Chia để trị</h3>
<p>Trong các phần trước, tìm kiếm nhị phân được cài đặt dựa trên vòng lặp (iteration). Bây giờ ta cài đặt nó dựa trên chia để trị (đệ quy).</p>
<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho một mảng đã sắp xếp <code>nums</code> có độ dài $n$, trong đó tất cả các phần tử đều duy nhất, hãy tìm <code>target</code>.</p>
  </div>
</div>
<p>Từ góc nhìn chia để trị, ta ký hiệu bài toán con tương ứng với khoảng tìm kiếm $[i, j]$ là $f(i, j)$.</p>
<p>Bắt đầu từ bài toán gốc $f(0, n-1)$, thực hiện tìm kiếm nhị phân qua các bước sau.</p>
<ol>
  <li>Tính điểm giữa $m$ của khoảng tìm kiếm $[i, j]$, và dùng nó để loại bỏ một nửa khoảng tìm kiếm.</li>
  <li>Giải đệ quy bài toán con đã được giảm một nửa kích thước, có thể là $f(i, m-1)$ hoặc $f(m+1, j)$.</li>
  <li>Lặp lại bước \`1.\` và \`2.\` cho đến khi tìm thấy <code>target</code>, hoặc trả về khi khoảng rỗng.</li>
</ol>
<p>Hình dưới đây cho thấy quá trình chia để trị của tìm kiếm nhị phân cho phần tử $6$ trong một mảng.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/binary_search_recur.png" alt="Quá trình chia để trị của tìm kiếm nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p>Trong mã cài đặt, ta khai báo một hàm đệ quy <code>dfs()</code> để giải bài toán $f(i, j)$:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Tìm kiếm nhị phân: bài toán f(i, j) */
static int dfs(int[] nums, int target, int i, int j) {
    // Nếu khoảng rỗng, nghĩa là không có phần tử mục tiêu, trả về -1
    if (i &gt; j) {
        return -1;
    }
    // Tính chỉ mục điểm giữa m
    int m = (i + j) / 2;
    if (nums[m] &lt; target) {
        // Đệ quy bài toán con f(m+1, j)
        return dfs(nums, target, m + 1, j);
    } else if (nums[m] &gt; target) {
        // Đệ quy bài toán con f(i, m-1)
        return dfs(nums, target, i, m - 1);
    } else {
        // Tìm thấy phần tử mục tiêu, trả về chỉ mục của nó
        return m;
    }
}

/* Tìm kiếm nhị phân */
static int binarySearch(int[] nums, int target) {
    int n = nums.length;
    // Giải bài toán f(0, n-1)
    return dfs(nums, target, 0, n - 1);
}
</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func dfs(preorder: [Int], inorderMap: [Int: Int], i: Int, l: Int, r: Int) -&gt; TreeNode? {
    // Terminate when the subtree interval is empty
    if r - l &lt; 0 {
        return nil
    }
    // Initialize the root node
    let root = TreeNode(x: preorder[i])
    // Query m to divide the left and right subtrees
    let m = inorderMap[preorder[i]]!
    // Subproblem: build the left subtree
    root.left = dfs(preorder: preorder, inorderMap: inorderMap, i: i + 1, l: l, r: m - 1)
    // Subproblem: build the right subtree
    root.right = dfs(preorder: preorder, inorderMap: inorderMap, i: i + 1 + m - l, l: m + 1, r: r)
    // Return the root node
    return root
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int dfs(List&lt;int&gt; nums, int target, int i, int j) {
  // If the interval is empty, it means there is no target element, return -1
  if (i &gt; j) {
    return -1;
  }
  // Calculate the midpoint index m
  int m = (i + j) ~/ 2;
  if (nums[m] &lt; target) {
    // Recursion subproblem f(m+1, j)
    return dfs(nums, target, m + 1, j);
  } else if (nums[m] &gt; target) {
    // Recursion subproblem f(i, m-1)
    return dfs(nums, target, i, m - 1);
  } else {
    // Found the target element, return its index
    return m;
  }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def dfs(nums: list[int], target: int, i: int, j: int) -&gt; int:
    """Tìm kiếm nhị phân: bài toán f(i, j)"""
    # Nếu khoảng rỗng, nghĩa là không có phần tử mục tiêu, trả về -1
    if i &gt; j:
        return -1
    # Tính chỉ mục điểm giữa m
    m = (i + j) // 2
    if nums[m] &lt; target:
        # Đệ quy bài toán con f(m+1, j)
        return dfs(nums, target, m + 1, j)
    elif nums[m] &gt; target:
        # Đệ quy bài toán con f(i, m-1)
        return dfs(nums, target, i, m - 1)
    else:
        # Tìm thấy phần tử mục tiêu, trả về chỉ mục của nó
        return m


def binary_search(nums: list[int], target: int) -&gt; int:
    """Tìm kiếm nhị phân"""
    n = len(nums)
    # Giải bài toán f(0, n-1)
    return dfs(nums, target, 0, n - 1)
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Tìm kiếm nhị phân: bài toán f(i, j) */
int dfs(vector&lt;int&gt; &amp;nums, int target, int i, int j) {
    // Nếu khoảng rỗng, nghĩa là không có phần tử mục tiêu, trả về -1
    if (i &gt; j) {
        return -1;
    }
    // Tính chỉ mục điểm giữa m
    int m = (i + j) / 2;
    if (nums[m] &lt; target) {
        // Đệ quy bài toán con f(m+1, j)
        return dfs(nums, target, m + 1, j);
    } else if (nums[m] &gt; target) {
        // Đệ quy bài toán con f(i, m-1)
        return dfs(nums, target, i, m - 1);
    } else {
        // Tìm thấy phần tử mục tiêu, trả về chỉ mục của nó
        return m;
    }
}

/* Tìm kiếm nhị phân */
int binarySearch(vector&lt;int&gt; &amp;nums, int target) {
    int n = nums.size();
    // Giải bài toán f(0, n-1)
    return dfs(nums, target, 0, n - 1);
}
</code></pre></div></div></div>
<div class="callout callout-tip">
  <span class="callout-icon">⚡</span>
  <div class="callout-body">
    <p><strong>Mô phỏng tương tác:</strong> Khác với phiên bản vòng lặp, bản đệ quy này có một <strong>ngăn xếp gọi hàm (call stack)</strong> thực sự — mỗi lần gọi dfs() sẽ đẩy thêm một khung f(i, j) vào ngăn xếp, và chỉ khi tìm thấy target thì ngăn xếp mới bắt đầu "unwind" (thu gọn) từ trong ra ngoài.</p>
  </div>
</div>
<div class="interactive-widget-wrapper" id="binary-search-recur-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'binary-search-recur-wrapper', 'tab-static')">📸 Ghi chú</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'binary-search-recur-wrapper', 'tab-interactive'); initBinarySearchRecurDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding: 10px 0;">Ví dụ: <code>nums = [1,3,6,8,12,15,23,26,31,35]</code>, <code>target = 6</code>. Chuyển sang tab "Mô phỏng tương tác" để xem ngăn xếp đệ quy phình to rồi thu gọn.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="binary-search-recur-canvas" style="margin-bottom:12px;"></div>
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">Ngăn xếp đệ quy (call stack):</p>
    <div id="binary-search-recur-stack" style="display:flex;flex-direction:column;gap:4px;min-height:90px;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; margin-top:10px;">
      <button id="binary-search-recur-btn-autorun" class="control-btn" onclick="autoRunBinarySearchRecur()">▶ Auto Run</button>
      <button id="binary-search-recur-btn-step" class="control-btn" onclick="stepBinarySearchRecur()">Bước tiếp theo ▶</button>
      <button id="binary-search-recur-btn-pause" class="control-btn btn-secondary" onclick="pauseRunBinarySearchRecur()" disabled>⏸ Dừng</button>
      <button id="binary-search-recur-btn-reset" class="control-btn btn-secondary" onclick="initBinarySearchRecurDemo()">↺ Reset</button>
    </div>
    <div style="margin-top:8px;">
      Tốc độ: <input type="range" min="200" max="2000" value="1000" step="200" oninput="setBinarySearchRecurSpeed(this.value)" /> <span id="binary-search-recur-speed-label">1000ms</span>
    </div>
    <div id="binary-search-recur-status" class="simulator-status" style="margin-top:8px;">Nhấp "Auto Run" để bắt đầu mô phỏng tự động.</div>
  </div>
</div>
`,
    originalContent: `
# Divide and Conquer Search Strategy

We have already learned that search algorithms are divided into two major categories.

- **Brute-force search**: Implemented by traversing the data structure, with a time complexity of $O(n)$.
- **Adaptive search**: Leverages specific data organization or prior information, with time complexity reaching $O(\\log n)$ or even $O(1)$.

In fact, **search algorithms with time complexity of $O(\\log n)$ are typically implemented based on the divide and conquer strategy**, such as binary search and trees.

- Each step of binary search divides the problem (searching for a target element in an array) into a smaller problem (searching for the target element in half of the array), continuing until the array is empty or the target element is found.
- Trees are representative of the divide and conquer idea. In data structures such as binary search trees, AVL trees, and heaps, the time complexity of various operations is $O(\\log n)$.

The divide and conquer strategy of binary search is as follows.

- **The problem can be decomposed**: Binary search recursively decomposes the original problem (searching in an array) into subproblems (searching in half of the array), achieved by comparing the middle element with the target element.
- **Subproblems are independent**: In binary search, each round only processes one subproblem, which is not affected by other subproblems.
- **Solutions of subproblems do not need to be merged**: Binary search aims to find a specific element, so there is no need to merge the solutions of subproblems. When a subproblem is solved, the original problem is also solved.

Divide and conquer can improve search efficiency because brute-force search can only eliminate one option per round, **while divide and conquer search can eliminate half of the options per round**.

### Implementing Binary Search Based on Divide and Conquer

In previous sections, binary search was implemented based on iteration. Now we implement it based on divide and conquer (recursion).

!!! question

    Given a sorted array \`nums\` of length $n$, where all elements are unique, find \`target\`.

From a divide and conquer perspective, we denote the subproblem corresponding to the search interval $[i, j]$ as $f(i, j)$.

Starting from the original problem $f(0, n-1)$, perform binary search through the following steps.

1. Calculate the midpoint $m$ of the search interval $[i, j]$, and use it to eliminate half of the search interval.
2. Recursively solve the subproblem reduced by half in size, which could be $f(i, m-1)$ or $f(m+1, j)$.
3. Repeat steps \`1.\` and \`2.\` until \`target\` is found, or return when the interval is empty.

The figure below shows the divide and conquer process of binary search for element $6$ in an array.

![Divide and conquer process of binary search](binary_search_recur.assets/binary_search_recur.png)

In the implementation code, we declare a recursive function \`dfs()\` to solve the problem $f(i, j)$:

\`\`\`src
[file]{binary_search_recur}-[class]{}-[func]{binary_search}
\`\`\`

`
  },

  'dsa-build-binary-tree': {
    title: '12.3 Xây dựng Cây nhị phân',
    summary: 'Bài toán kinh điển: Phục hồi lại toàn bộ Cây nhị phân chỉ từ mảng duyệt Tiền thứ tự (Preorder) và Trung thứ tự (Inorder), thông qua chiến lược Chia để trị.',
    tags: ['dsa', 'divide-and-conquer', 'binary-tree', 'algorithm'],
    domain: 'Algorithms',
    module: 'Chương 12: Chia để trị',
    prerequisites: ['dsa-binary-search-recur'],
    related: ['dsa-hanota'],
    updatedAt: '2026-07-19',
    readTime: '12 phút',
    content: `

<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho mảng duyệt Tiền thứ tự <code>preorder</code> và Trung thứ tự <code>inorder</code> của một cây nhị phân, hãy xây dựng lại cây nhị phân đó và trả về nút gốc của nó. Giả sử không có giá trị nút trùng lặp trong cây nhị phân (như hình dưới đây).</p>
  </div>
</div>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/build_tree_example.png" alt="Dữ liệu ví dụ cho bài toán xây dựng cây nhị phân" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h3>Xác định đây có phải Bài toán Chia để trị không</h3>
<p>Bài toán gốc được định nghĩa là xây dựng cây nhị phân từ <code>preorder</code> và <code>inorder</code>, đây là một bài toán chia để trị tiêu biểu.</p>
<ul>
  <li><strong>Bài toán có thể phân rã:</strong> Từ góc nhìn chia để trị, ta có thể chia bài toán gốc thành hai bài toán con: xây dựng cây con trái và xây dựng cây con phải, cộng thêm một thao tác: khởi tạo nút gốc. Đối với mỗi cây con (bài toán con), ta vẫn có thể áp dụng lại phương pháp phân chia trên, chia nó thành các cây con nhỏ hơn (bài toán con) cho đến khi đạt được bài toán con nhỏ nhất (cây con rỗng).</li>
  <li><strong>Các bài toán con độc lập:</strong> Cây con trái và cây con phải độc lập với nhau, không có sự chồng lấn giữa chúng. Khi xây dựng cây con trái, ta chỉ cần tập trung vào các phần của duyệt trung thứ tự và tiền thứ tự tương ứng với cây con trái. Điều tương tự cũng áp dụng cho cây con phải.</li>
  <li><strong>Nghiệm của các bài toán con có thể gộp lại:</strong> Một khi ta có cây con trái và cây con phải (nghiệm của các bài toán con), ta có thể liên kết chúng vào nút gốc để thu được nghiệm của bài toán gốc.</li>
</ul>

<h3>Cách phân chia Cây con</h3>
<p>Dựa trên phân tích ở trên, bài toán này có thể được giải bằng chia để trị, <strong>nhưng làm sao ta chia cây con trái và cây con phải thông qua duyệt tiền thứ tự <code>preorder</code> và duyệt trung thứ tự <code>inorder</code></strong>?</p>
<p>Theo định nghĩa, cả <code>preorder</code> và <code>inorder</code> đều có thể được chia thành ba phần.</p>
<ul>
  <li>Duyệt tiền thứ tự: <code>[ Nút gốc | Cây con trái | Cây con phải ]</code>, ví dụ, cây trong hình trên tương ứng với <code>[ 3 | 9 | 2 1 7 ]</code>.</li>
  <li>Duyệt trung thứ tự: <code>[ Cây con trái | Nút gốc | Cây con phải ]</code>, ví dụ, cây trong hình trên tương ứng với <code>[ 9 | 3 | 1 2 7 ]</code>.</li>
</ul>
<p>Sử dụng dữ liệu trong hình trên làm ví dụ, ta có thể thu được kết quả chia qua các bước trong hình dưới đây.</p>
<ol>
  <li>Phần tử đầu tiên 3 trong duyệt tiền thứ tự là giá trị của nút gốc.</li>
  <li>Tìm chỉ mục của nút gốc 3 trong <code>inorder</code>, và dùng chỉ mục này để chia <code>inorder</code> thành <code>[ 9 | 3 ｜ 1 2 7 ]</code>.</li>
  <li>Dựa trên kết quả chia của <code>inorder</code>, dễ dàng xác định cây con trái và cây con phải lần lượt có 1 và 3 nút, cho phép ta chia <code>preorder</code> thành <code>[ 3 | 9 | 2 1 7 ]</code>.</li>
</ol>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/build_tree_preorder_inorder_division.png" alt="Chia cây con trong duyệt tiền thứ tự và trung thứ tự" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h3>Mô tả khoảng Cây con dựa trên Biến số</h3>
<p>Dựa trên phương pháp chia ở trên, <strong>ta đã thu được các khoảng chỉ mục của nút gốc, cây con trái và cây con phải trong <code>preorder</code> và <code>inorder</code></strong>. Để mô tả các khoảng chỉ mục này, ta cần sử dụng một số biến chỉ mục.</p>
<ul>
  <li>Ký hiệu chỉ mục của nút gốc cây hiện tại trong <code>preorder</code> là $i$.</li>
  <li>Ký hiệu chỉ mục của nút gốc cây hiện tại trong <code>inorder</code> là $m$.</li>
  <li>Ký hiệu khoảng chỉ mục của cây hiện tại trong <code>inorder</code> là $[l, r]$.</li>
</ul>
<p>Như bảng dưới đây, thông qua các biến này ta có thể biểu diễn chỉ mục của nút gốc trong <code>preorder</code> và khoảng chỉ mục của các cây con trong <code>inorder</code>.</p>
<table style="width:100%; border-collapse:collapse; margin:1.5em 0; border: 1px solid var(--border-color); font-size:14px;">
  <thead>
    <tr style="border-bottom:2px solid var(--border-color); text-align:left; background-color: rgba(255,255,255,0.05);">
      <th style="padding:10px;"></th>
      <th style="padding:10px;">Chỉ mục nút gốc trong <code>preorder</code></th>
      <th style="padding:10px;">Khoảng chỉ mục cây con trong <code>inorder</code></th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><strong>Cây hiện tại</strong></td><td style="padding:10px;">$i$</td><td style="padding:10px;">$[l, r]$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><strong>Cây con trái</strong></td><td style="padding:10px;">$i + 1$</td><td style="padding:10px;">$[l, m-1]$</td></tr>
    <tr style="border-bottom:1px solid var(--border-color);"><td style="padding:10px;"><strong>Cây con phải</strong></td><td style="padding:10px;">$i + 1 + (m - l)$</td><td style="padding:10px;">$[m+1, r]$</td></tr>
  </tbody>
</table>
<p>Lưu ý rằng $(m-l)$ trong chỉ mục nút gốc của cây con phải có nghĩa là "số lượng nút trong cây con trái". Nên hiểu điều này kết hợp với hình dưới đây.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/build_tree_division_pointers.png" alt="Biểu diễn khoảng chỉ mục của nút gốc và cây con trái, phải" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h3>Cài đặt Code</h3>
<p>Để cải thiện hiệu quả truy vấn $m$, ta dùng một bảng băm <code>hmap</code> để lưu ánh xạ từ các phần tử trong mảng <code>inorder</code> tới chỉ mục của chúng:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Nút của cây nhị phân */
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

/* Xây dựng cây nhị phân: chia để trị */
static TreeNode dfs(int[] preorder, Map&lt;Integer, Integer&gt; inorderMap, int i, int l, int r) {
    // Kết thúc khi khoảng cây con rỗng
    if (r - l &lt; 0)
        return null;
    // Khởi tạo nút gốc
    TreeNode root = new TreeNode(preorder[i]);
    // Tra cứu m để chia cây con trái và phải
    int m = inorderMap.get(preorder[i]);
    // Bài toán con: xây dựng cây con trái
    root.left = dfs(preorder, inorderMap, i + 1, l, m - 1);
    // Bài toán con: xây dựng cây con phải
    root.right = dfs(preorder, inorderMap, i + 1 + m - l, m + 1, r);
    // Trả về nút gốc
    return root;
}

/* Xây dựng cây nhị phân */
static TreeNode buildTree(int[] preorder, int[] inorder) {
    // Khởi tạo hash map, lưu ánh xạ từ phần tử inorder tới chỉ mục
    Map&lt;Integer, Integer&gt; inorderMap = new HashMap&lt;&gt;();
    for (int i = 0; i &lt; inorder.length; i++) {
        inorderMap.put(inorder[i], i);
    }
    TreeNode root = dfs(preorder, inorderMap, 0, 0, inorder.length - 1);
    return root;
}
</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func dfs(preorder: [Int], inorderMap: [Int: Int], i: Int, l: Int, r: Int) -&gt; TreeNode? {
    // Terminate when the subtree interval is empty
    if r - l &lt; 0 {
        return nil
    }
    // Initialize the root node
    let root = TreeNode(x: preorder[i])
    // Query m to divide the left and right subtrees
    let m = inorderMap[preorder[i]]!
    // Subproblem: build the left subtree
    root.left = dfs(preorder: preorder, inorderMap: inorderMap, i: i + 1, l: l, r: m - 1)
    // Subproblem: build the right subtree
    root.right = dfs(preorder: preorder, inorderMap: inorderMap, i: i + 1 + m - l, l: m + 1, r: r)
    // Return the root node
    return root
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>int dfs(List&lt;int&gt; nums, int target, int i, int j) {
  // If the interval is empty, it means there is no target element, return -1
  if (i &gt; j) {
    return -1;
  }
  // Calculate the midpoint index m
  int m = (i + j) ~/ 2;
  if (nums[m] &lt; target) {
    // Recursion subproblem f(m+1, j)
    return dfs(nums, target, m + 1, j);
  } else if (nums[m] &gt; target) {
    // Recursion subproblem f(i, m-1)
    return dfs(nums, target, i, m - 1);
  } else {
    // Found the target element, return its index
    return m;
  }
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>class TreeNode:
    """Nút của cây nhị phân"""
    def __init__(self, val: int):
        self.val: int = val
        self.left: TreeNode | None = None
        self.right: TreeNode | None = None


def dfs(
    preorder: list[int],
    inorder_map: dict[int, int],
    i: int,
    l: int,
    r: int,
) -&gt; TreeNode | None:
    """Xây dựng cây nhị phân: chia để trị"""
    # Kết thúc khi khoảng cây con rỗng
    if r - l &lt; 0:
        return None
    # Khởi tạo nút gốc
    root = TreeNode(preorder[i])
    # Tra cứu m để chia cây con trái và phải
    m = inorder_map[preorder[i]]
    # Bài toán con: xây dựng cây con trái
    root.left = dfs(preorder, inorder_map, i + 1, l, m - 1)
    # Bài toán con: xây dựng cây con phải
    root.right = dfs(preorder, inorder_map, i + 1 + m - l, m + 1, r)
    # Trả về nút gốc
    return root


def build_tree(preorder: list[int], inorder: list[int]) -&gt; TreeNode | None:
    """Xây dựng cây nhị phân"""
    # Khởi tạo hash map, lưu ánh xạ từ phần tử inorder tới chỉ mục
    inorder_map = {val: i for i, val in enumerate(inorder)}
    root = dfs(preorder, inorder_map, 0, 0, len(inorder) - 1)
    return root
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Nút của cây nhị phân */
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

/* Xây dựng cây nhị phân: chia để trị */
TreeNode *dfs(vector&lt;int&gt; &amp;preorder, unordered_map&lt;int, int&gt; &amp;inorderMap, int i, int l, int r) {
    // Kết thúc khi khoảng cây con rỗng
    if (r - l &lt; 0)
        return NULL;
    // Khởi tạo nút gốc
    TreeNode *root = new TreeNode(preorder[i]);
    // Tra cứu m để chia cây con trái và phải
    int m = inorderMap[preorder[i]];
    // Bài toán con: xây dựng cây con trái
    root-&gt;left = dfs(preorder, inorderMap, i + 1, l, m - 1);
    // Bài toán con: xây dựng cây con phải
    root-&gt;right = dfs(preorder, inorderMap, i + 1 + m - l, m + 1, r);
    // Trả về nút gốc
    return root;
}

/* Xây dựng cây nhị phân */
TreeNode *buildTree(vector&lt;int&gt; &amp;preorder, vector&lt;int&gt; &amp;inorder) {
    // Khởi tạo hash map, lưu ánh xạ từ phần tử inorder tới chỉ mục
    unordered_map&lt;int, int&gt; inorderMap;
    for (int i = 0; i &lt; inorder.size(); i++) {
        inorderMap[inorder[i]] = i;
    }
    TreeNode *root = dfs(preorder, inorderMap, 0, 0, inorder.size() - 1);
    return root;
}
</code></pre></div></div></div>
<p>Hình dưới đây cho thấy quá trình đệ quy xây dựng cây nhị phân. Mỗi nút được thiết lập trong quá trình "đệ quy" đi xuống, trong khi mỗi cạnh (tham chiếu) được thiết lập trong quá trình "trả về" đi lên.</p>
<div class="interactive-widget-wrapper" id="build-tree-steps-wrapper">
  <div class="slider-container">
    <div class="slide active">
      <img src="dsa-assets/built_tree_step1.png" alt="built_tree_step1" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">Bước 1: Gọi <code>dfs(i=0, l=0, r=4)</code> cho toàn bộ cây. Nút gốc = <code>preorder[0]</code> = 3.</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/built_tree_step2.png" alt="built_tree_step2" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">Bước 2: Tra <code>inorder_map[3]</code> = <code>m</code> = 1 → cây con trái có khoảng <code>inorder</code> [0, 0], cây con phải có khoảng [2, 4].</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/built_tree_step3.png" alt="built_tree_step3" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">Bước 3: Gọi <code>dfs(i=1, l=0, r=0)</code> để xây cây con trái. Nút gốc = <code>preorder[1]</code> = 9.</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/built_tree_step4.png" alt="built_tree_step4" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">Bước 4: Khoảng <code>inorder</code> [0, 0] chỉ có 1 phần tử → node 9 là lá, không có con. Đệ quy trả về, liên kết 3.left = 9.</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/built_tree_step5.png" alt="built_tree_step5" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">Bước 5: Gọi <code>dfs(i=2, l=2, r=4)</code> để xây cây con phải. Nút gốc = <code>preorder[2]</code> = 2.</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/built_tree_step6.png" alt="built_tree_step6" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">Bước 6: Tra <code>inorder_map[2]</code> = <code>m</code> = 3 → cây con trái của node 2 có khoảng [2, 2], cây con phải có khoảng [4, 4].</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/built_tree_step7.png" alt="built_tree_step7" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">Bước 7: Gọi <code>dfs(i=3, l=2, r=2)</code> — khoảng chỉ có 1 phần tử → node 1 là lá. Liên kết 2.left = 1.</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/built_tree_step8.png" alt="built_tree_step8" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">Bước 8: Gọi <code>dfs(i=4, l=4, r=4)</code> — khoảng chỉ có 1 phần tử → node 7 là lá. Liên kết 2.right = 7.</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/built_tree_step9.png" alt="built_tree_step9" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">Bước 9: Đệ quy trả về hết, liên kết 3.right = 2. Cây nhị phân đã được xây dựng hoàn chỉnh!</p>
    </div>
    <div class="slider-controls">
      <button class="control-btn" onclick="prevSlide('build-tree-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 9</span>
      <button class="control-btn" onclick="nextSlide('build-tree-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Kết quả chia của duyệt tiền thứ tự <code>preorder</code> và duyệt trung thứ tự <code>inorder</code> trong mỗi lần gọi hàm đệ quy được thể hiện trong hình dưới đây.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/built_tree_overall.png" alt="Kết quả chia trong mỗi hàm đệ quy" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<div class="callout callout-tip">
  <span class="callout-icon">⚡</span>
  <div class="callout-body">
    <p><strong>Mô phỏng tương tác:</strong> Bạn có thể tự tay bước qua từng nút được tạo ra, xem cách khoảng chỉ mục <code>inorder</code> quyết định cách chia cây con trái/phải.</p>
  </div>
</div>
<div class="interactive-widget-wrapper" id="build-tree-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'build-tree-wrapper', 'tab-static')">📸 Ghi chú</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'build-tree-wrapper', 'tab-interactive'); initBuildTreeDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding: 10px 0;">Ví dụ: <code>preorder = [3, 9, 2, 1, 7]</code>, <code>inorder = [9, 3, 1, 2, 7]</code>. Chuyển sang tab "Mô phỏng tương tác" để xem cây được xây dựng dần theo từng nút.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="build-tree-canvas" style="min-height:140px;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; margin-top:10px;">
      <button id="build-tree-btn-autorun" class="control-btn" onclick="autoRunBuildTree()">▶ Auto Run</button>
      <button id="build-tree-btn-step" class="control-btn" onclick="stepBuildTree()">Bước tiếp theo ▶</button>
      <button id="build-tree-btn-pause" class="control-btn btn-secondary" onclick="pauseRunBuildTree()" disabled>⏸ Dừng</button>
      <button id="build-tree-btn-reset" class="control-btn btn-secondary" onclick="initBuildTreeDemo()">↺ Reset</button>
    </div>
    <div style="margin-top:8px;">
      Tốc độ: <input type="range" min="200" max="2000" value="1000" step="200" oninput="setBuildTreeSpeed(this.value)" /> <span id="build-tree-speed-label">1000ms</span>
    </div>
    <div id="build-tree-status" class="simulator-status" style="margin-top:8px;">Nhấp "Auto Run" để bắt đầu mô phỏng tự động.</div>
  </div>
</div>

<p>Gọi số lượng nút trong cây là $n$. Khởi tạo mỗi nút (thực thi một lần hàm đệ quy <code>dfs()</code>) mất thời gian $O(1)$. <strong>Do đó, độ phức tạp thời gian tổng thể là $O(n)$</strong>.</p>
<p>Bảng băm lưu ánh xạ từ các phần tử <code>inorder</code> tới chỉ mục của chúng, với độ phức tạp không gian là $O(n)$. Trong trường hợp xấu nhất, khi cây nhị phân suy biến thành một danh sách liên kết, độ sâu đệ quy đạt $n$, sử dụng $O(n)$ không gian khung ngăn xếp (stack frame). <strong>Do đó, độ phức tạp không gian tổng thể là $O(n)$</strong>.</p>

`,
    originalContent: `
# Building a Binary Tree Problem

!!! question

    Given the preorder traversal \`preorder\` and inorder traversal \`inorder\` of a binary tree, construct the binary tree and return the root node of the binary tree. Assume there are no duplicate node values in the binary tree (as shown in the figure below).

![Example data for building a binary tree](build_binary_tree_problem.assets/build_tree_example.png)

### Determining If It Is a Divide and Conquer Problem

The original problem is defined as constructing a binary tree from \`preorder\` and \`inorder\`, which is a typical divide and conquer problem.

- **The problem can be decomposed**: From a divide and conquer perspective, we can divide the original problem into two subproblems: constructing the left subtree and constructing the right subtree, plus one operation: initializing the root node. For each subtree (subproblem), we can still reuse the above division method, dividing it into smaller subtrees (subproblems) until the smallest subproblem (empty subtree) is reached.
- **Subproblems are independent**: The left and right subtrees are independent of each other; there is no overlap between them. When constructing the left subtree, we only need to focus on the parts of the inorder and preorder traversals corresponding to the left subtree. The same applies to the right subtree.
- **Solutions of subproblems can be merged**: Once we have the left and right subtrees (solutions of subproblems), we can link them to the root node to obtain the solution to the original problem.

### How to Divide Subtrees

Based on the above analysis, this problem can be solved using divide and conquer, **but how do we divide the left and right subtrees through the preorder traversal \`preorder\` and inorder traversal \`inorder\`**?

According to the definition, both \`preorder\` and \`inorder\` can be divided into three parts.

- Preorder traversal: \`[ Root Node | Left Subtree | Right Subtree ]\`, for example, the tree in the figure above corresponds to \`[ 3 | 9 | 2 1 7 ]\`.
- Inorder traversal: \`[ Left Subtree | Root Node ｜ Right Subtree ]\`, for example, the tree in the figure above corresponds to \`[ 9 | 3 | 1 2 7 ]\`.

Using the data from the figure above as an example, we can obtain the division results through the steps shown in the figure below.

1. The first element 3 in the preorder traversal is the value of the root node.
2. Find the index of root node 3 in \`inorder\`, and use this index to divide \`inorder\` into \`[ 9 | 3 ｜ 1 2 7 ]\`.
3. Based on the division result of \`inorder\`, it is easy to determine that the left and right subtrees have 1 and 3 nodes respectively, allowing us to divide \`preorder\` into \`[ 3 | 9 | 2 1 7 ]\`.

![Dividing subtrees in preorder and inorder traversals](build_binary_tree_problem.assets/build_tree_preorder_inorder_division.png)

### Describing Subtree Intervals Based on Variables

Based on the above division method, **we have obtained the index intervals of the root node, left subtree, and right subtree in \`preorder\` and \`inorder\`**. To describe these index intervals, we need to use several index variables.

- Denote the index of the current tree's root node in \`preorder\` as $i$.
- Denote the index of the current tree's root node in \`inorder\` as $m$.
- Denote the index interval of the current tree in \`inorder\` as $[l, r]$.

As shown in the table below, through these variables we can represent the index of the root node in \`preorder\` and the index intervals of the subtrees in \`inorder\`.

<p align="center"> Table <id> &nbsp; Indices of root node and subtrees in preorder and inorder traversals </p>

|              | Root node index in \`preorder\` | Subtree index interval in \`inorder\` |
| ------------ | ----------------------------- | ----------------------------------- |
| Current tree | $i$                           | $[l, r]$                            |
| Left subtree | $i + 1$                       | $[l, m-1]$                          |
| Right subtree| $i + 1 + (m - l)$             | $[m+1, r]$                          |

Please note that $(m-l)$ in the right subtree root node index means "the number of nodes in the left subtree". It is recommended to understand this in conjunction with the figure below.

![Index interval representation of root node and left and right subtrees](build_binary_tree_problem.assets/build_tree_division_pointers.png)

### Code Implementation

To improve the efficiency of querying $m$, we use a hash table \`hmap\` to store the mapping from elements in the \`inorder\` array to their indices:

\`\`\`src
[file]{build_tree}-[class]{}-[func]{build_tree}
\`\`\`

The figure below shows the recursive process of building the binary tree. Each node is established during the downward "recursion" process, while each edge (reference) is established during the upward "return" process.

=== "<1>"
    ![Recursive process of building a binary tree](build_binary_tree_problem.assets/built_tree_step1.png)

=== "<2>"
    ![built_tree_step2](build_binary_tree_problem.assets/built_tree_step2.png)

=== "<3>"
    ![built_tree_step3](build_binary_tree_problem.assets/built_tree_step3.png)

=== "<4>"
    ![built_tree_step4](build_binary_tree_problem.assets/built_tree_step4.png)

=== "<5>"
    ![built_tree_step5](build_binary_tree_problem.assets/built_tree_step5.png)

=== "<6>"
    ![built_tree_step6](build_binary_tree_problem.assets/built_tree_step6.png)

=== "<7>"
    ![built_tree_step7](build_binary_tree_problem.assets/built_tree_step7.png)

=== "<8>"
    ![built_tree_step8](build_binary_tree_problem.assets/built_tree_step8.png)

=== "<9>"
    ![built_tree_step9](build_binary_tree_problem.assets/built_tree_step9.png)

The division results of the preorder traversal \`preorder\` and inorder traversal \`inorder\` within each recursive function are shown in the figure below.

![Division results in each recursive function](build_binary_tree_problem.assets/built_tree_overall.png)

Let the number of nodes in the tree be $n$. Initializing each node (executing one recursive function \`dfs()\`) takes $O(1)$ time. **Therefore, the overall time complexity is $O(n)$**.

The hash table stores the mapping from \`inorder\` elements to their indices, with a space complexity of $O(n)$. In the worst case, when the binary tree degenerates into a linked list, the recursion depth reaches $n$, using $O(n)$ stack frame space. **Therefore, the overall space complexity is $O(n)$**.

`
  },

  'dsa-hanota': {
    title: '12.4 Bài toán Tháp Hà Nội (Hanota)',
    summary: 'Một bài toán đệ quy kinh điển với độ phức tạp hàm mũ O(2^n). Tìm hiểu cách chia bài toán di chuyển n đĩa thành hai bài toán con n-1 đĩa và một bài toán con 1 đĩa.',
    tags: ['dsa', 'divide-and-conquer', 'hanota', 'recursion'],
    domain: 'Algorithms',
    module: 'Chương 12: Chia để trị',
    prerequisites: ['dsa-build-binary-tree'],
    related: ['dsa-divide-conquer-summary'],
    updatedAt: '2026-07-19',
    readTime: '9 phút',
    content: `

<p>Trong sắp xếp trộn và xây dựng cây nhị phân, ta phân rã bài toán gốc thành hai bài toán con, mỗi bài bằng một nửa kích thước bài toán gốc. Tuy nhiên, đối với bài toán Tháp Hà Nội, ta áp dụng một chiến lược phân rã khác.</p>
<div class="callout callout-note">
  <span class="callout-icon">❓</span>
  <div class="callout-body">
    <p>Cho ba cột trụ, ký hiệu là <code>A</code>, <code>B</code>, và <code>C</code>. Ban đầu, cột trụ <code>A</code> có $n$ đĩa xếp chồng lên nhau, sắp xếp từ trên xuống dưới theo thứ tự kích thước tăng dần. Nhiệm vụ của ta là di chuyển các đĩa này sang cột trụ <code>C</code> trong khi vẫn giữ nguyên thứ tự ban đầu của chúng (như hình dưới đây). Các quy tắc sau phải được tuân thủ khi di chuyển đĩa.</p>
    <ol>
      <li>Chỉ có thể lấy một đĩa từ đỉnh của một cột trụ và đặt lên đỉnh của một cột trụ khác.</li>
      <li>Chỉ được di chuyển một đĩa tại một thời điểm.</li>
      <li>Đĩa nhỏ hơn phải luôn nằm trên đĩa lớn hơn.</li>
    </ol>
  </div>
</div>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/hanota_example.png" alt="Ví dụ về bài toán Tháp Hà Nội" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>
<p><strong>Ta ký hiệu bài toán Tháp Hà Nội có kích thước $i$ là $f(i)$</strong>. Ví dụ, $f(3)$ biểu diễn việc di chuyển $3$ đĩa từ <code>A</code> sang <code>C</code>.</p>

<h3>Xét các Trường hợp Cơ sở</h3>
<p>Như hình dưới đây, đối với bài toán $f(1)$, khi chỉ có một đĩa, ta có thể di chuyển thẳng nó từ <code>A</code> sang <code>C</code>.</p>
<div class="interactive-widget-wrapper" id="hanota-f1-steps-wrapper">
  <div class="slider-container">
    <div class="slide active">
      <img src="dsa-assets/hanota_f1_step1.png" alt="hanota_f1_step1" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">$f(1)$ — Bước 1: Chỉ có 1 đĩa trên cột A.</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/hanota_f1_step2.png" alt="hanota_f1_step2" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">$f(1)$ — Bước 2: Di chuyển thẳng đĩa đó từ A sang C.</p>
    </div>
    <div class="slider-controls">
      <button class="control-btn" onclick="prevSlide('hanota-f1-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 2</span>
      <button class="control-btn" onclick="nextSlide('hanota-f1-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Như hình dưới đây, đối với bài toán $f(2)$, khi có hai đĩa, <strong>vì ta luôn phải giữ đĩa nhỏ hơn nằm trên đĩa lớn hơn, ta cần dùng <code>B</code> để hỗ trợ việc di chuyển</strong>.</p>
<ol>
  <li>Đầu tiên, di chuyển đĩa nhỏ hơn từ <code>A</code> sang <code>B</code>.</li>
  <li>Sau đó di chuyển đĩa lớn hơn từ <code>A</code> sang <code>C</code>.</li>
  <li>Cuối cùng, di chuyển đĩa nhỏ hơn từ <code>B</code> sang <code>C</code>.</li>
</ol>
<div class="interactive-widget-wrapper" id="hanota-f2-steps-wrapper">
  <div class="slider-container">
    <div class="slide active">
      <img src="dsa-assets/hanota_f2_step1.png" alt="hanota_f2_step1" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">$f(2)$ — Bước 1: Có 2 đĩa trên cột A.</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/hanota_f2_step2.png" alt="hanota_f2_step2" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">$f(2)$ — Bước 2: Di chuyển đĩa nhỏ từ A sang B.</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/hanota_f2_step3.png" alt="hanota_f2_step3" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">$f(2)$ — Bước 3: Di chuyển đĩa lớn từ A sang C.</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/hanota_f2_step4.png" alt="hanota_f2_step4" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">$f(2)$ — Bước 4: Di chuyển đĩa nhỏ từ B sang C. Hoàn tất!</p>
    </div>
    <div class="slider-controls">
      <button class="control-btn" onclick="prevSlide('hanota-f2-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 4</span>
      <button class="control-btn" onclick="nextSlide('hanota-f2-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Quá trình giải bài toán $f(2)$ có thể tóm tắt là: <strong>di chuyển hai đĩa từ <code>A</code> sang <code>C</code> với sự trợ giúp của <code>B</code></strong>. Ở đây, <code>C</code> được gọi là cột trụ đích, và <code>B</code> được gọi là cột trụ đệm.</p>

<h3>Phân rã Bài toán con</h3>
<p>Đối với bài toán $f(3)$, khi có ba đĩa, tình huống trở nên phức tạp hơn một chút.</p>
<p>Vì ta đã biết nghiệm của $f(1)$ và $f(2)$, ta có thể tư duy theo góc nhìn chia để trị, <strong>coi hai đĩa trên cùng của <code>A</code> như một khối duy nhất</strong>, và thực hiện các bước như hình dưới đây. Điều này di chuyển thành công ba đĩa từ <code>A</code> sang <code>C</code>.</p>
<ol>
  <li>Để <code>B</code> là cột trụ đích và <code>C</code> là cột trụ đệm, di chuyển hai đĩa từ <code>A</code> sang <code>B</code>.</li>
  <li>Di chuyển đĩa còn lại trực tiếp từ <code>A</code> sang <code>C</code>.</li>
  <li>Để <code>C</code> là cột trụ đích và <code>A</code> là cột trụ đệm, di chuyển hai đĩa từ <code>B</code> sang <code>C</code>.</li>
</ol>
<div class="interactive-widget-wrapper" id="hanota-f3-steps-wrapper">
  <div class="slider-container">
    <div class="slide active">
      <img src="dsa-assets/hanota_f3_step1.png" alt="hanota_f3_step1" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">$f(3)$ — Bước 1: Có 3 đĩa trên cột A.</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/hanota_f3_step2.png" alt="hanota_f3_step2" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">$f(3)$ — Bước 2: Di chuyển khối 2 đĩa trên cùng từ A sang B (dùng C làm đệm).</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/hanota_f3_step3.png" alt="hanota_f3_step3" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">$f(3)$ — Bước 3: Di chuyển đĩa lớn nhất còn lại từ A sang C.</p>
    </div>
    <div class="slide">
      <img src="dsa-assets/hanota_f3_step4.png" alt="hanota_f3_step4" style="max-width:100%; border-radius: var(--radius-md);" />
      <p class="slide-caption">$f(3)$ — Bước 4: Di chuyển khối 2 đĩa từ B sang C (dùng A làm đệm). Hoàn tất!</p>
    </div>
    <div class="slider-controls">
      <button class="control-btn" onclick="prevSlide('hanota-f3-steps-wrapper')">◀ Trước</button>
      <span class="slider-indicator">Bước 1 / 4</span>
      <button class="control-btn" onclick="nextSlide('hanota-f3-steps-wrapper')">Sau ▶</button>
    </div>
  </div>
</div>
<p>Về bản chất, <strong>ta chia bài toán $f(3)$ thành hai bài toán con $f(2)$ và một bài toán con $f(1)$</strong>. Bằng cách giải ba bài toán con này theo thứ tự, bài toán gốc được giải. Điều này cho thấy các bài toán con độc lập với nhau và nghiệm của chúng có thể được gộp lại.</p>
<p>Từ đó, ta có thể tóm tắt chiến lược chia để trị để giải bài toán Tháp Hà Nội như hình dưới đây: chia bài toán gốc $f(n)$ thành hai bài toán con $f(n-1)$ và một bài toán con $f(1)$, và giải ba bài toán con này theo thứ tự sau.</p>
<ol>
  <li>Di chuyển $n-1$ đĩa từ <code>A</code> sang <code>B</code> với sự trợ giúp của <code>C</code>.</li>
  <li>Di chuyển $1$ đĩa còn lại trực tiếp từ <code>A</code> sang <code>C</code>.</li>
  <li>Di chuyển $n-1$ đĩa từ <code>B</code> sang <code>C</code> với sự trợ giúp của <code>A</code>.</li>
</ol>
<p>Đối với hai bài toán con $f(n-1)$ này, <strong>ta có thể tiếp tục chia đệ quy theo cùng một cách</strong> cho đến khi đạt được bài toán con nhỏ nhất $f(1)$. Nghiệm của $f(1)$ đã biết và chỉ cần một thao tác di chuyển.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/hanota_divide_and_conquer.png" alt="Chiến lược chia để trị để giải bài toán Tháp Hà Nội" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<h3>Cài đặt Code</h3>
<p>Trong mã cài đặt, ta khai báo một hàm đệ quy <code>dfs(i, src, buf, tar)</code>, mục đích là di chuyển $i$ đĩa trên cùng từ cột trụ <code>src</code> sang cột trụ đích <code>tar</code> với sự trợ giúp của cột trụ đệm <code>buf</code>:</p>
<div class="code-tabs"><div class="code-tab-header"><button class="code-tab-btn active" data-lang="java" onclick="switchCodeTab(event, 'java')">Java</button><button class="code-tab-btn" data-lang="kotlin" onclick="switchCodeTab(event, 'kotlin')">Kotlin</button><button class="code-tab-btn" data-lang="swift" onclick="switchCodeTab(event, 'swift')">Swift</button><button class="code-tab-btn" data-lang="dart" onclick="switchCodeTab(event, 'dart')">Dart</button><button class="code-tab-btn" data-lang="python" onclick="switchCodeTab(event, 'python')">Python</button><button class="code-tab-btn" data-lang="cpp" onclick="switchCodeTab(event, 'cpp')">C++</button><button class="code-tab-btn" data-lang="javascript" onclick="switchCodeTab(event, 'javascript')">JavaScript</button></div><div class="code-tab-body"><div class="code-tab-content active" data-lang="java"><pre data-lang="java"><code>/* Di chuyển một đĩa */
static void move(List&lt;Integer&gt; src, List&lt;Integer&gt; tar) {
    // Lấy một đĩa ra từ đỉnh src
    Integer pan = src.remove(src.size() - 1);
    // Đặt đĩa lên đỉnh tar
    tar.add(pan);
}

/* Giải bài toán Tháp Hà Nội f(i) */
static void dfs(int i, List&lt;Integer&gt; src, List&lt;Integer&gt; buf, List&lt;Integer&gt; tar) {
    // Nếu chỉ còn một đĩa trong src, di chuyển thẳng nó sang tar
    if (i == 1) {
        move(src, tar);
        return;
    }
    // Bài toán con f(i-1): di chuyển i-1 đĩa trên cùng từ src sang buf, dùng tar làm trung gian
    dfs(i - 1, src, tar, buf);
    // Bài toán con f(1): di chuyển đĩa còn lại từ src sang tar
    move(src, tar);
    // Bài toán con f(i-1): di chuyển i-1 đĩa trên cùng từ buf sang tar, dùng src làm trung gian
    dfs(i - 1, buf, src, tar);
}

/* Giải bài toán Tháp Hà Nội */
static void solveHanota(List&lt;Integer&gt; A, List&lt;Integer&gt; B, List&lt;Integer&gt; C) {
    int n = A.size();
    // Di chuyển n đĩa trên cùng từ A sang C, dùng B làm trung gian
    dfs(n, A, B, C);
}
</code></pre></div><div class="code-tab-content" data-lang="swift"><pre data-lang="swift"><code>func move(src: inout [Int], tar: inout [Int]) {
    // Take out a disk from the top of src
    let pan = src.popLast()!
    // Place the disk on top of tar
    tar.append(pan)
}</code></pre></div><div class="code-tab-content" data-lang="dart"><pre data-lang="dart"><code>void move(List&lt;int&gt; src, List&lt;int&gt; tar) {
  // Take out a disk from the top of src
  int pan = src.removeLast();
  // Place the disk on top of tar
  tar.add(pan);
}</code></pre></div><div class="code-tab-content" data-lang="python"><pre data-lang="python"><code>def move(src: list[int], tar: list[int]):
    """Di chuyển một đĩa"""
    # Lấy một đĩa ra từ đỉnh src
    pan = src.pop()
    # Đặt đĩa lên đỉnh tar
    tar.append(pan)


def dfs(i: int, src: list[int], buf: list[int], tar: list[int]):
    """Giải bài toán Tháp Hà Nội f(i)"""
    # Nếu chỉ còn một đĩa trong src, di chuyển thẳng nó sang tar
    if i == 1:
        move(src, tar)
        return
    # Bài toán con f(i-1): di chuyển i-1 đĩa trên cùng từ src sang buf, dùng tar làm trung gian
    dfs(i - 1, src, tar, buf)
    # Bài toán con f(1): di chuyển đĩa còn lại từ src sang tar
    move(src, tar)
    # Bài toán con f(i-1): di chuyển i-1 đĩa trên cùng từ buf sang tar, dùng src làm trung gian
    dfs(i - 1, buf, src, tar)


def solve_hanota(A: list[int], B: list[int], C: list[int]):
    """Giải bài toán Tháp Hà Nội"""
    n = len(A)
    # Di chuyển n đĩa trên cùng từ A sang C, dùng B làm trung gian
    dfs(n, A, B, C)
</code></pre></div><div class="code-tab-content" data-lang="cpp"><pre data-lang="cpp"><code>/* Di chuyển một đĩa */
void move(vector&lt;int&gt; &amp;src, vector&lt;int&gt; &amp;tar) {
    // Lấy một đĩa ra từ đỉnh src
    int pan = src.back();
    src.pop_back();
    // Đặt đĩa lên đỉnh tar
    tar.push_back(pan);
}

/* Giải bài toán Tháp Hà Nội f(i) */
void dfs(int i, vector&lt;int&gt; &amp;src, vector&lt;int&gt; &amp;buf, vector&lt;int&gt; &amp;tar) {
    // Nếu chỉ còn một đĩa trong src, di chuyển thẳng nó sang tar
    if (i == 1) {
        move(src, tar);
        return;
    }
    // Bài toán con f(i-1): di chuyển i-1 đĩa trên cùng từ src sang buf, dùng tar làm trung gian
    dfs(i - 1, src, tar, buf);
    // Bài toán con f(1): di chuyển đĩa còn lại từ src sang tar
    move(src, tar);
    // Bài toán con f(i-1): di chuyển i-1 đĩa trên cùng từ buf sang tar, dùng src làm trung gian
    dfs(i - 1, buf, src, tar);
}

/* Giải bài toán Tháp Hà Nội */
void solveHanota(vector&lt;int&gt; &amp;A, vector&lt;int&gt; &amp;B, vector&lt;int&gt; &amp;C) {
    int n = A.size();
    // Di chuyển n đĩa trên cùng từ A sang C, dùng B làm trung gian
    dfs(n, A, B, C);
}
</code></pre></div></div></div>
<div class="callout callout-tip">
  <span class="callout-icon">⚡</span>
  <div class="callout-body">
    <p><strong>Mô phỏng tương tác:</strong> Thử tự tay bước qua toàn bộ $2^3 - 1 = 7$ bước di chuyển để giải bài toán Tháp Hà Nội với $3$ đĩa.</p>
  </div>
</div>
<div class="interactive-widget-wrapper" id="hanota-wrapper">
  <div class="widget-tabs">
    <button class="widget-tab-btn active" onclick="switchIntroTab(event, 'hanota-wrapper', 'tab-static')">📸 Ghi chú</button>
    <button class="widget-tab-btn" onclick="switchIntroTab(event, 'hanota-wrapper', 'tab-interactive'); initHanotaDemo()">⚡ Mô phỏng tương tác</button>
  </div>
  <div class="widget-tab-content active" data-tab="tab-static">
    <p style="padding: 10px 0;">Ví dụ với $n = 3$ đĩa trên cột A. Chuyển sang tab "Mô phỏng tương tác" để xem toàn bộ quá trình di chuyển 7 bước.</p>
  </div>
  <div class="widget-tab-content" data-tab="tab-interactive">
    <div id="hanota-canvas" style="min-height:160px;"></div>
    <div class="simulator-controls" style="display:flex; gap:8px; flex-wrap:wrap; margin-top:10px;">
      <button id="hanota-btn-autorun" class="control-btn" onclick="autoRunHanota()">▶ Auto Run</button>
      <button id="hanota-btn-step" class="control-btn" onclick="stepHanota()">Bước tiếp theo ▶</button>
      <button id="hanota-btn-pause" class="control-btn btn-secondary" onclick="pauseRunHanota()" disabled>⏸ Dừng</button>
      <button id="hanota-btn-reset" class="control-btn btn-secondary" onclick="initHanotaDemo()">↺ Reset</button>
    </div>
    <div style="margin-top:8px;">
      Tốc độ: <input type="range" min="200" max="2000" value="900" step="200" oninput="setHanotaSpeed(this.value)" /> <span id="hanota-speed-label">900ms</span>
    </div>
    <div id="hanota-status" class="simulator-status" style="margin-top:8px;">Nhấp "Auto Run" để bắt đầu mô phỏng tự động.</div>
  </div>
</div>

<p>Như hình dưới đây, bài toán Tháp Hà Nội tạo thành một cây đệ quy có chiều cao $n$, trong đó mỗi nút đại diện cho một bài toán con tương ứng với một lần gọi hàm <code>dfs()</code>, <strong>do đó độ phức tạp thời gian là $O(2^n)$ và độ phức tạp không gian là $O(n)$</strong>.</p>
<div style="text-align: center; margin: 1.5em 0;">
  <img src="dsa-assets/hanota_recursive_tree.png" alt="Cây đệ quy của bài toán Tháp Hà Nội" style="max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" />
</div>

<div class="callout callout-note">
  <span class="callout-icon">📜</span>
  <div class="callout-body">
    <p>Bài toán Tháp Hà Nội bắt nguồn từ một truyền thuyết cổ xưa ở Ấn Độ. Trong một ngôi đền ở Ấn Độ cổ đại, các nhà sư có ba cột trụ kim cương cao và $64$ đĩa vàng với các kích cỡ khác nhau. Các nhà sư liên tục di chuyển các đĩa, tin rằng khi chiếc đĩa cuối cùng được đặt đúng vị trí, thế giới sẽ đến ngày tận thế.</p>
    <p>Tuy nhiên, ngay cả khi các nhà sư di chuyển một đĩa mỗi giây, việc này sẽ mất khoảng $2^{64} \\approx 1.84×10^{19}$ giây, tức khoảng $585$ tỷ năm, vượt xa ước tính hiện tại về tuổi của vũ trụ. Vì vậy, nếu truyền thuyết này là thật, ta không cần phải lo lắng về ngày tận thế.</p>
  </div>
</div>

`,
    originalContent: `
# Hanota Problem

In merge sort and building binary trees, we decompose the original problem into two subproblems, each half the size of the original problem. However, for the hanota problem, we adopt a different decomposition strategy.

!!! question

    Given three pillars, denoted as \`A\`, \`B\`, and \`C\`. Initially, pillar \`A\` has $n$ discs stacked on it, arranged from top to bottom in ascending order of size. Our task is to move these $n$ discs to pillar \`C\` while maintaining their original order (as shown in the figure below). The following rules must be followed when moving the discs.

    1. A disc can only be taken from the top of one pillar and placed on top of another pillar.
    2. Only one disc can be moved at a time.
    3. A smaller disc must always be on top of a larger disc.

![Example of the hanota problem](hanota_problem.assets/hanota_example.png)

**We denote the hanota problem of size $i$ as $f(i)$**. For example, $f(3)$ represents moving $3$ discs from \`A\` to \`C\`.

### Considering the Base Cases

As shown in the figure below, for problem $f(1)$, when there is only one disc, we can move it directly from \`A\` to \`C\`.

=== "<1>"
    ![Solution for a problem of size 1](hanota_problem.assets/hanota_f1_step1.png)

=== "<2>"
    ![hanota_f1_step2](hanota_problem.assets/hanota_f1_step2.png)

As shown in the figure below, for problem $f(2)$, when there are two discs, **since we must always keep the smaller disc on top of the larger disc, we need to use \`B\` to assist in the move**.

1. First, move the smaller disc from \`A\` to \`B\`.
2. Then move the larger disc from \`A\` to \`C\`.
3. Finally, move the smaller disc from \`B\` to \`C\`.

=== "<1>"
    ![Solution for a problem of size 2](hanota_problem.assets/hanota_f2_step1.png)

=== "<2>"
    ![hanota_f2_step2](hanota_problem.assets/hanota_f2_step2.png)

=== "<3>"
    ![hanota_f2_step3](hanota_problem.assets/hanota_f2_step3.png)

=== "<4>"
    ![hanota_f2_step4](hanota_problem.assets/hanota_f2_step4.png)

The process of solving problem $f(2)$ can be summarized as: **moving two discs from \`A\` to \`C\` with the help of \`B\`**. Here, \`C\` is called the target pillar, and \`B\` is called the buffer pillar.

### Subproblem Decomposition

For problem $f(3)$, when there are three discs, the situation becomes slightly more complex.

Since we already know the solutions to $f(1)$ and $f(2)$, we can think from a divide and conquer perspective, **treating the top two discs on \`A\` as a whole**, and execute the steps shown in the figure below. This successfully moves the three discs from \`A\` to \`C\`.

1. Let \`B\` be the target pillar and \`C\` be the buffer pillar, and move two discs from \`A\` to \`B\`.
2. Move the remaining disc from \`A\` directly to \`C\`.
3. Let \`C\` be the target pillar and \`A\` be the buffer pillar, and move two discs from \`B\` to \`C\`.

=== "<1>"
    ![Solution for a problem of size 3](hanota_problem.assets/hanota_f3_step1.png)

=== "<2>"
    ![hanota_f3_step2](hanota_problem.assets/hanota_f3_step2.png)

=== "<3>"
    ![hanota_f3_step3](hanota_problem.assets/hanota_f3_step3.png)

=== "<4>"
    ![hanota_f3_step4](hanota_problem.assets/hanota_f3_step4.png)

Essentially, **we divide problem $f(3)$ into two subproblems $f(2)$ and one subproblem $f(1)$**. By solving these three subproblems in order, the original problem is solved. This shows that the subproblems are independent and their solutions can be merged.

From this, we can summarize the divide and conquer strategy for solving the hanota problem shown in the figure below: divide the original problem $f(n)$ into two subproblems $f(n-1)$ and one subproblem $f(1)$, and solve these three subproblems in the following order.

1. Move $n-1$ discs from \`A\` to \`B\` with the help of \`C\`.
2. Move the remaining $1$ disc directly from \`A\` to \`C\`.
3. Move $n-1$ discs from \`B\` to \`C\` with the help of \`A\`.

For these two subproblems $f(n-1)$, **we can recursively divide them in the same way** until reaching the smallest subproblem $f(1)$. The solution to $f(1)$ is known and requires only one move operation.

![Divide and conquer strategy for solving the hanota problem](hanota_problem.assets/hanota_divide_and_conquer.png)

### Code Implementation

In the code, we declare a recursive function \`dfs(i, src, buf, tar)\`, whose purpose is to move the top $i$ discs from pillar \`src\` to target pillar \`tar\` with the help of buffer pillar \`buf\`:

\`\`\`src
[file]{hanota}-[class]{}-[func]{solve_hanota}
\`\`\`

As shown in the figure below, the hanota problem forms a recursion tree of height $n$, where each node represents a subproblem corresponding to an invocation of the \`dfs()\` function, **therefore the time complexity is $O(2^n)$ and the space complexity is $O(n)$**.

![Recursion tree of the hanota problem](hanota_problem.assets/hanota_recursive_tree.png)

!!! quote

    The hanota problem originates from an ancient legend. In a temple in ancient India, monks had three tall diamond pillars and $64$ golden discs of different sizes. The monks continuously moved the discs, believing that when the last disc was correctly placed, the world would come to an end.

    However, even if the monks moved one disc per second, it would take approximately $2^{64} \\approx 1.84×10^{19}$ seconds, which is about $585$ billion years, far exceeding current estimates of the age of the universe. Therefore, if this legend is true, we should not need to worry about the end of the world.

`
  },

  'dsa-divide-conquer-summary': {
    title: 'Tóm tắt & Hỏi đáp',
    summary: 'Ôn tập lại các nguyên tắc của Chia để trị và cách nhận diện chúng trong các cấu trúc dữ liệu và thuật toán phổ biến.',
    tags: ['dsa', 'divide-and-conquer', 'summary'],
    domain: 'Algorithms',
    module: 'Chương 12: Chia để trị',
    prerequisites: ['dsa-hanota'],
    related: [],
    updatedAt: '2026-07-19',
    readTime: '3 phút',
    content: `

<h2>Điểm lại Kiến thức chính</h2>
<ul>
  <li>Chia để trị là một chiến lược thiết kế thuật toán phổ biến, gồm hai giai đoạn chia (phân chia) và trị (gộp), và thường được cài đặt bằng đệ quy.</li>
  <li>Các tiêu chí để xác định một bài toán có phải bài toán chia để trị hay không bao gồm: bài toán có thể phân rã hay không, các bài toán con có độc lập hay không, và các bài toán con có thể gộp lại hay không.</li>
  <li>Sắp xếp trộn (merge sort) là một ứng dụng tiêu biểu của chiến lược chia để trị. Nó đệ quy chia một mảng thành hai mảng con có độ dài bằng nhau cho đến khi chỉ còn một phần tử, sau đó gộp chúng lại theo từng lớp để hoàn thành việc sắp xếp.</li>
  <li>Việc áp dụng chiến lược chia để trị thường có thể cải thiện hiệu suất thuật toán. Một mặt, nó giảm số lượng phép tính; mặt khác, nó giúp hệ thống dễ dàng tối ưu song song hóa hơn.</li>
  <li>Chia để trị có thể giải quyết nhiều bài toán thuật toán và cũng được sử dụng rộng rãi trong thiết kế cấu trúc dữ liệu và thuật toán, khiến nó trở nên vô cùng phổ biến.</li>
  <li>So với tìm kiếm vét cạn, tìm kiếm thích ứng hiệu quả hơn. Các thuật toán tìm kiếm với độ phức tạp thời gian $O(\\log n)$ thường được cài đặt dựa trên chiến lược chia để trị.</li>
  <li>Tìm kiếm nhị phân là một ứng dụng tiêu biểu khác của chia để trị. Nó không bao gồm bước gộp nghiệm của các bài toán con. Ta có thể cài đặt tìm kiếm nhị phân thông qua chia để trị đệ quy.</li>
  <li>Trong bài toán xây dựng cây nhị phân, việc xây dựng cây (bài toán gốc) có thể được chia thành xây dựng cây con trái và cây con phải (bài toán con), điều này có thể đạt được bằng cách chia các khoảng chỉ mục của duyệt tiền thứ tự và trung thứ tự.</li>
  <li>Trong bài toán Tháp Hà Nội, một bài toán kích thước $n$ có thể được chia thành hai bài toán con kích thước $n-1$ và một bài toán con kích thước $1$. Sau khi giải ba bài toán con này theo thứ tự, bài toán gốc được giải.</li>
</ul>

<h2>Hỏi & Đáp</h2>
<p><strong>Hỏi: Tại sao không dùng vòng lặp cho tất cả thay vì đệ quy Chia để trị?</strong></p>
<p><strong>Trả lời:</strong> Một số bài toán (như Tháp Hà Nội hay Xây dựng Cây nhị phân) biểu diễn dưới dạng đệ quy Chia để trị sẽ cực kỳ rõ ràng, dễ hiểu và dễ bảo trì. Việc chuyển đổi chúng thành vòng lặp (iteration) tuy tránh được giới hạn Call Stack nhưng sẽ đòi hỏi bạn phải tự quản lý ngăn xếp phức tạp, làm code khó đọc hơn gấp nhiều lần. Sự đánh đổi (trade-off) ở đây là giữa hiệu năng phần cứng và khả năng đọc hiểu của con người.</p>
<p><strong>Hỏi: Merge Sort, Quick Sort, Binary Search đều là Chia để trị — chúng khác nhau ở điểm gì?</strong></p>
<p><strong>Trả lời:</strong> Merge Sort cần bước "Trị" (gộp hai mảng con đã sắp xếp) thực sự tốn công sức; Quick Sort thực hiện việc phân hoạch (partition) TRƯỚC khi đệ quy nên gần như không cần bước gộp; còn Binary Search thì hoàn toàn không cần bước gộp — chỉ cần bài toán con trả về là bài toán gốc coi như xong. Ba ví dụ này minh họa rõ mức độ "nặng nhẹ" khác nhau của bước Trị trong cùng một chiến lược Chia để trị.</p>

`,
    originalContent: `
# Summary

### Key Review

- Divide and conquer is a common algorithm design strategy consisting of two phases, divide (partition) and conquer (merge), and is typically implemented recursively.
- The criteria for determining whether a problem is a divide and conquer problem include: whether the problem can be decomposed, whether subproblems are independent, and whether subproblems can be merged.
- Merge sort is a typical application of the divide and conquer strategy. It recursively divides an array into two equal-length subarrays until only one element remains, then merges them layer by layer to complete the sorting.
- Introducing the divide and conquer strategy can often improve algorithm efficiency. On one hand, it reduces the number of operations; on the other hand, it makes parallel optimization by the system easier.
- Divide and conquer can solve many algorithmic problems and is also widely used in data structures and algorithm design, making it ubiquitous.
- Compared to brute-force search, adaptive search is more efficient. Search algorithms with time complexity of $O(\\log n)$ are typically implemented based on the divide and conquer strategy.
- Binary search is another typical application of divide and conquer. It does not include the step of merging solutions of subproblems. We can implement binary search through recursive divide and conquer.
- In the problem of building a binary tree, building the tree (original problem) can be divided into building the left subtree and right subtree (subproblems), which can be achieved by dividing the index intervals of the preorder and inorder traversals.
- In the hanota problem, a problem of size $n$ can be divided into two subproblems of size $n-1$ and one subproblem of size $1$. After solving these three subproblems in order, the original problem is solved.

`
  },

});
