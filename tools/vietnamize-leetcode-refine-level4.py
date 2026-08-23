#!/usr/bin/env python3
"""
Refine Level 4 — 75 bài (Advanced Graph 20 + Backtracking 27 + Graph 28)
"""

import pathlib, re, glob
ROOT = pathlib.Path(__file__).parent.parent
JS_PATH = ROOT / "website" / "leetcode-content.js"
DOCS_GLOB = str(ROOT / "leetcode" / "docs" / "**" / "*.md")

VI_PREFIXES = {
    # Advanced Graph 20
    'lc-0126-word-ladder-ii': """<p>Cho hai từ <code>beginWord</code> và <code>endWord</code> và từ điển <code>wordList</code>, hãy tìm <strong>tất cả</strong> các dãy biến đổi ngắn nhất từ <code>beginWord</code> tới <code>endWord</code>, mỗi bước chỉ đổi một ký tự và mỗi từ trung gian phải nằm trong <code>wordList</code>.</p>

<p>&nbsp;</p>""",
    'lc-0127-word-ladder': """<p>Cho hai từ <code>beginWord</code>, <code>endWord</code> và từ điển <code>wordList</code>, hãy trả về độ dài dãy biến đổi ngắn nhất từ <code>beginWord</code> tới <code>endWord</code> (mỗi bước đổi một ký tự, từ trung gian phải trong <code>wordList</code>). Nếu không thể, trả về <code>0</code>.</p>

<p>&nbsp;</p>""",
    'lc-1293-shortest-path-in-a-grid-with-o': """<p>Cho lưới <code>m x n</code> với <code>0</code> là ô trống và <code>1</code> là chướng ngại, bạn có thể loại bỏ tối đa <code>k</code> chướng ngại. Hãy tìm đường đi ngắn nhất từ <code>(0,0)</code> tới <code>(m-1,n-1)</code>.</p>

<p>&nbsp;</p>""",
    'lc-1514-path-with-maximum-probability': """<p>Cho đồ thị vô hướng có trọng số với <code>n</code> node, các cạnh <code>edges</code> và xác suất thành công <code>succProb</code> cho mỗi cạnh, hãy tìm đường đi từ <code>start</code> tới <code>end</code> có xác suất thành công lớn nhất.</p>

<p>&nbsp;</p>""",
    'lc-1584-min-cost-to-connect-all-points-1': """<p>Cho mảng điểm <code>points</code> với <code>points[i] = [xi, yi]</code>, chi phí nối hai điểm là khoảng cách Manhattan. Hãy tìm chi phí nhỏ nhất để nối tất cả điểm (cây khung nhỏ nhất).</p>

<p>&nbsp;</p>""",
    'lc-1971-find-if-path-exists-in-graph': """<p>Cho đồ thị vô hướng với <code>n</code> node và danh sách cạnh <code>edges</code>, hãy xác định có đường đi từ <code>source</code> tới <code>destination</code> không.</p>

<p>&nbsp;</p>""",
    'lc-0207-course-schedule-2': """<p>Cho tổng số môn <code>numCourses</code> và danh sách điều kiện <code>prerequisites</code> với <code>[ai, bi]</code> nghĩa là phải học <code>bi</code> trước <code>ai</code>, hãy xác định có thể hoàn thành tất cả môn không (kiểm tra chu trình).</p>

<p>&nbsp;</p>""",
    'lc-0210-course-schedule-ii-2': """<p>Cho <code>numCourses</code> và <code>prerequisites</code>, hãy trả về thứ tự học các môn thỏa mãn điều kiện, nếu không thể trả về mảng rỗng.</p>

<p>&nbsp;</p>""",
    'lc-2316-minimum-obstacle-removal-to-re': """<p>Cho lưới <code>m x n</code> với <code>0</code> là ô trống và <code>1</code> là chướng ngại, hãy tìm số chướng ngại ít nhất cần loại bỏ để đi từ <code>(0,0)</code> tới <code>(m-1,n-1)</code>.</p>

<p>&nbsp;</p>""",
    'lc-0310-minimum-height-trees-1': """<p>Cho cây vô hướng với <code>n</code> node và các cạnh <code>edges</code>, hãy tìm tất cả gốc sao cho chiều cao cây là nhỏ nhất (Minimum Height Trees).</p>

<p>&nbsp;</p>""",
    'lc-0332-reconstruct-itinerary-1': """<p>Cho danh sách vé máy bay <code>tickets</code> với <code>[from, to]</code>, hãy xây dựng hành trình bắt đầu từ <code>"JFK"</code>, dùng hết vé đúng một lần, nếu có nhiều hành trình thì chọn thứ tự từ điển nhỏ nhất.</p>

<p>&nbsp;</p>""",
    'lc-0684-redundant-connection-1': """<p>Cho đồ thị ban đầu là cây có <code>n</code> node (1-indexed) với <code>n</code> cạnh, trong đó một cạnh thừa tạo thành chu trình. Hãy tìm cạnh có thể xóa để đồ thị lại thành cây, nếu nhiều thì trả về cạnh xuất hiện cuối.</p>

<p>&nbsp;</p>""",
    'lc-0685-redundant-connection-ii-1': """<p>Cho đồ thị có hướng với <code>n</code> node, ban đầu là cây có gốc có hướng, thêm một cạnh có hướng thừa. Hãy tìm cạnh có thể xóa để đồ thị lại thành cây có gốc.</p>

<p>&nbsp;</p>""",
    'lc-0721-accounts-merge-1': """<p>Cho danh sách tài khoản <code>accounts</code> với mỗi tài khoản là <code>[name, email1, email2, ...]</code>, nếu hai tài khoản có chung email thì là cùng người. Hãy gộp và trả về danh sách tài khoản đã gộp.</p>

<p>&nbsp;</p>""",
    'lc-0743-network-delay-time-1': """<p>Cho mạng có <code>n</code> node và các cạnh có hướng <code>times</code> với <code>[u, v, w]</code> là thời gian tín hiệu từ <code>u</code> tới <code>v</code>, hãy tính thời gian để tất cả node nhận được tín hiệu từ <code>k</code>, nếu không thể trả về <code>-1</code>.</p>

<p>&nbsp;</p>""",
    'lc-0753-open-the-lock': """<p>Khóa có 4 bánh xe, mỗi bánh <code>0-9</code>, bắt đầu ở <code>"0000"</code>, mỗi lần quay một bánh một nấc. Cho danh sách <code>deadends</code> (các trạng thái chết) và <code>target</code>, hãy tìm số lần quay ít nhất để tới <code>target</code>, nếu không thể trả về <code>-1</code>.</p>

<p>&nbsp;</p>""",
    'lc-0787-cheapest-flights-within-k-stop-1': """<p>Cho <code>n</code> thành phố, các chuyến bay <code>flights</code> với <code>[from, to, price]</code> và số điểm dừng tối đa <code>k</code>, hãy tìm giá rẻ nhất từ <code>src</code> tới <code>dst</code> với tối đa <code>k</code> điểm dừng.</p>

<p>&nbsp;</p>""",
    'lc-0815-bus-routes': """<p>Cho các tuyến xe buýt <code>routes</code> với <code>routes[i]</code> là các trạm của tuyến <code>i</code>, hãy tìm số xe ít nhất cần đi từ <code>source</code> tới <code>target</code>.</p>

<p>&nbsp;</p>""",
    'lc-0847-shortest-path-visiting-all-nod': """<p>Cho đồ thị vô hướng với <code>n</code> node, hãy tìm đường đi ngắn nhất thăm tất cả node (có thể thăm lại node/cạnh).</p>

<p>&nbsp;</p>""",
    'lc-0864-shortest-path-to-get-all-keys': """<p>Cho lưới <code>grid</code> với <code>'@'</code> là điểm bắt đầu, <code>'.'</code> là ô trống, <code>'#'</code> là tường, <code>'a'-'f'</code> là khóa và <code>'A'-'F'</code> là ổ khóa, hãy tìm số bước ít nhất để nhặt hết khóa.</p>

<p>&nbsp;</p>""",
    # Backtracking 27
    'lc-1219-path-with-maximum-gold': """<p>Cho lưới <code>grid</code> với mỗi ô chứa số vàng (0 là không có), bạn có thể bắt đầu từ bất kỳ ô có vàng nào, di chuyển 4 hướng, mỗi ô chỉ đi một lần. Hãy tìm lượng vàng tối đa có thể thu thập.</p>

<p>&nbsp;</p>""",
    'lc-1239-maximum-length-of-a-concatenat': """<p>Cho mảng chuỗi <code>arr</code>, hãy tìm độ dài lớn nhất của chuỗi được tạo bằng cách nối một số chuỗi con của <code>arr</code> sao cho các ký tự trong chuỗi kết quả đều khác nhau.</p>

<p>&nbsp;</p>""",
    'lc-1255-maximum-score-words-formed-by-': """<p>Cho danh sách từ <code>words</code>, bảng chữ cái <code>letters</code> và điểm mỗi chữ <code>score</code>, hãy tìm điểm lớn nhất có thể tạo bằng cách chọn một số từ sao cho không dùng quá số lượng chữ cái có trong <code>letters</code>.</p>

<p>&nbsp;</p>""",
    'lc-0131-palindrome-partitioning': """<p>Cho chuỗi <code>s</code>, hãy phân hoạch <code>s</code> sao cho mỗi chuỗi con đều là palindrome, trả về tất cả các cách phân hoạch.</p>

<p>&nbsp;</p>""",
    'lc-0131-palindrome-partitioning-1': """<p>Cho chuỗi <code>s</code>, hãy phân hoạch sao cho mỗi phần đều là palindrome (bản Backtracking).</p>

<p>&nbsp;</p>""",
    'lc-0017-letter-combinations-of-a-phone': """<p>Cho chuỗi chữ số <code>digits</code> (2-9), mỗi chữ số ánh xạ tới các chữ cái như trên bàn phím điện thoại, hãy trả về tất cả tổ hợp chữ cái có thể tạo.</p>

<p>&nbsp;</p>""",
    'lc-0212-word-search-ii-1': """<p>Cho bảng <code>board</code> và danh sách từ <code>words</code>, hãy tìm tất cả từ có thể tạo trên bảng (bản Backtracking + Trie).</p>

<p>&nbsp;</p>""",
    'lc-0216-combination-sum-iii': """<p>Cho hai số nguyên <code>k</code> và <code>n</code>, hãy tìm tất cả tổ hợp <code>k</code> số khác nhau trong <code>[1,9]</code> có tổng bằng <code>n</code>.</p>

<p>&nbsp;</p>""",
    'lc-0022-generate-parentheses-1': """<p>Cho số nguyên <code>n</code>, hãy sinh tất cả tổ hợp dấu ngoặc đúng gồm <code>n</code> cặp (bản Backtracking).</p>

<p>&nbsp;</p>""",
    'lc-0037-sudoku-solver': """<p>Viết chương trình giải Sudoku <code>9x9</code>: điền các ô <code>'.'</code> sao cho mỗi hàng, cột và ô <code>3x3</code> đều chứa <code>1-9</code> không lặp.</p>

<p>&nbsp;</p>""",
    'lc-0039-combination-sum': """<p>Cho mảng số nguyên không trùng <code>candidates</code> và số nguyên <code>target</code>, hãy tìm tất cả tổ hợp (có thể lặp lại phần tử) có tổng bằng <code>target</code>.</p>

<p>&nbsp;</p>""",
    'lc-0040-combination-sum-ii': """<p>Cho mảng <code>candidates</code> có thể chứa trùng và số nguyên <code>target</code>, hãy tìm tất cả tổ hợp <strong>không trùng</strong> (mỗi phần tử chỉ dùng một lần) có tổng bằng <code>target</code>.</p>

<p>&nbsp;</p>""",
    'lc-0046-permutations': """<p>Cho mảng số nguyên không trùng <code>nums</code>, hãy trả về tất cả các hoán vị.</p>

<p>&nbsp;</p>""",
    'lc-0047-permutations-ii': """<p>Cho mảng <code>nums</code> có thể chứa trùng, hãy trả về tất cả các hoán vị <strong>không trùng</strong>.</p>

<p>&nbsp;</p>""",
    'lc-0051-n-queens': """<p>Bài toán N-Queens: đặt <code>n</code> quân hậu trên bàn cờ <code>n x n</code> sao cho không có hai hậu nào tấn công nhau. Hãy trả về tất cả các cách đặt.</p>

<p>&nbsp;</p>""",
    'lc-0052-n-queens-ii': """<p>Cho số nguyên <code>n</code>, hãy trả về số lượng cách đặt <code>n</code> hậu trên bàn <code>n x n</code> không tấn công nhau.</p>

<p>&nbsp;</p>""",
    'lc-0526-beautiful-arrangement': """<p>Cho số nguyên <code>n</code>, hãy đếm số hoán vị đẹp của <code>[1..n]</code> sao cho với mỗi <code>i</code>, <code>perm[i]</code> chia hết cho <code>i</code> hoặc <code>i</code> chia hết cho <code>perm[i]</code>.</p>

<p>&nbsp;</p>""",
    'lc-0679-24-game': """<p>Cho mảng 4 số <code>cards</code>, hãy xác định có thể dùng các phép <code>+ - * /</code> và ngoặc để tạo ra 24 hay không (mỗi số dùng đúng một lần, chia là chia thực).</p>

<p>&nbsp;</p>""",
    'lc-0698-partition-to-k-equal-sum-subse': """<p>Cho mảng số nguyên <code>nums</code> và số nguyên <code>k</code>, hãy xác định có thể chia mảng thành <code>k</code> tập con không rỗng có tổng bằng nhau không.</p>

<p>&nbsp;</p>""",
    'lc-0077-combinations': """<p>Cho hai số nguyên <code>n</code> và <code>k</code>, hãy trả về tất cả các tổ hợp gồm <code>k</code> số trong <code>[1..n]</code>.</p>

<p>&nbsp;</p>""",
    'lc-0078-subsets': """<p>Cho mảng số nguyên không trùng <code>nums</code>, hãy trả về tất cả các tập con (power set).</p>

<p>&nbsp;</p>""",
    'lc-0784-letter-case-permutation': """<p>Cho chuỗi <code>s</code>, hãy trả về tất cả các chuỗi có thể tạo bằng cách biến đổi mỗi chữ cái thành chữ hoa hoặc chữ thường.</p>

<p>&nbsp;</p>""",
    'lc-0079-word-search-1': """<p>Cho bảng <code>board</code> và chuỗi <code>word</code>, hãy kiểm tra <code>word</code> có tồn tại trên bảng bằng cách nối các ô kề nhau (mỗi ô dùng một lần) không.</p>

<p>&nbsp;</p>""",
    'lc-0090-subsets-ii': """<p>Cho mảng <code>nums</code> có thể chứa trùng, hãy trả về tất cả các tập con không trùng.</p>

<p>&nbsp;</p>""",
    'lc-0093-restore-ip-addresses': """<p>Cho chuỗi chỉ chứa chữ số <code>s</code>, hãy trả về tất cả các địa chỉ IP hợp lệ có thể tạo bằng cách chèn dấu <code>'.'</code> (mỗi phần 0-255, không có số 0 thừa).</p>

<p>&nbsp;</p>""",
    'lc-0967-numbers-with-same-consecutive-': """<p>Cho hai số nguyên <code>n</code> và <code>k</code>, hãy trả về tất cả các số có <code>n</code> chữ số mà hiệu tuyệt đối giữa hai chữ số liên tiếp đúng bằng <code>k</code>.</p>

<p>&nbsp;</p>""",
    'lc-0980-unique-paths-iii': """<p>Cho lưới <code>grid</code> với <code>1</code> là điểm bắt đầu, <code>2</code> là điểm kết thúc, <code>0</code> là ô đi được và <code>-1</code> là chướng ngại, hãy đếm số đường đi từ <code>1</code> tới <code>2</code> đi qua tất cả ô <code>0</code> đúng một lần.</p>

<p>&nbsp;</p>""",
    # Graph 28
    'lc-1192-critical-connections-in-a-netw': """<p>Cho mạng với <code>n</code> server và danh sách kết nối <code>connections</code>, hãy tìm tất cả các cầu (critical connections) — cạnh mà nếu xóa sẽ làm mạng mất liên thông.</p>

<p>&nbsp;</p>""",
    'lc-0130-surrounded-regions': """<p>Cho ma trận <code>m x n</code> <code>board</code> chứa <code>'X'</code> và <code>'O'</code>, hãy lật mọi vùng <code>'O'</code> bị bao quanh bởi <code>'X'</code> thành <code>'X'</code> (vùng nối với biên không bị lật).</p>

<p>&nbsp;</p>""",
    'lc-1319-number-of-operations-to-make-n': """<p>Cho mạng với <code>n</code> máy tính và danh sách cáp <code>connections</code>, hãy trả về số lần đổi cáp ít nhất để nối tất cả máy tính, nếu không thể trả về <code>-1</code>.</p>

<p>&nbsp;</p>""",
    'lc-0133-clone-graph': """<p>Cho tham chiếu tới một node trong đồ thị vô hướng liên thông, hãy trả về bản sao sâu của đồ thị.</p>

<p>&nbsp;</p>""",
    'lc-1584-min-cost-to-connect-all-points': """<p>Cho mảng điểm <code>points</code>, chi phí nối hai điểm là khoảng cách Manhattan, hãy tìm chi phí nhỏ nhất để nối tất cả điểm (MST).</p>

<p>&nbsp;</p>""",
    'lc-0200-number-of-islands': """<p>Cho lưới <code>m x n</code> <code>grid</code> với <code>'1'</code> là đất và <code>'0'</code> là nước, hãy trả về số lượng đảo (các vùng đất nối nhau theo 4 hướng).</p>

<p>&nbsp;</p>""",
    'lc-0207-course-schedule': """<p>Cho <code>numCourses</code> và <code>prerequisites</code>, hãy xác định có thể hoàn thành tất cả khóa học không.</p>

<p>&nbsp;</p>""",
    'lc-0207-course-schedule-1': """<p>Cho <code>numCourses</code> và <code>prerequisites</code>, hãy kiểm tra có thể hoàn thành tất cả môn không (bản Graph).</p>

<p>&nbsp;</p>""",
    'lc-0210-course-schedule-ii': """<p>Cho <code>numCourses</code> và <code>prerequisites</code>, hãy trả về thứ tự học, nếu không thể trả về rỗng.</p>

<p>&nbsp;</p>""",
    'lc-0210-course-schedule-ii-1': """<p>Cho <code>numCourses</code> và <code>prerequisites</code>, hãy trả về thứ tự học thỏa mãn (bản Graph).</p>

<p>&nbsp;</p>""",
    'lc-0310-minimum-height-trees': """<p>Cho cây vô hướng với <code>n</code> node, hãy tìm tất cả gốc cho chiều cao nhỏ nhất.</p>

<p>&nbsp;</p>""",
    'lc-0332-reconstruct-itinerary': """<p>Cho vé <code>tickets</code> <code>[from, to]</code>, hãy xây dựng hành trình từ <code>JFK</code> dùng hết vé, thứ tự từ điển nhỏ nhất.</p>

<p>&nbsp;</p>""",
    'lc-0399-evaluate-division': """<p>Cho các phương trình <code>equations</code> dạng <code>a / b = value</code> và các truy vấn <code>queries</code> dạng <code>c / d</code>, hãy trả về kết quả mỗi truy vấn, nếu không xác định thì <code>-1.0</code>.</p>

<p>&nbsp;</p>""",
    'lc-0417-pacific-atlantic-water-flow': """<p>Cho ma trận <code>heights</code> với độ cao mỗi ô, nước chảy từ ô cao xuống ô thấp hơn hoặc bằng ở 4 hướng. Hãy tìm tất cả ô mà nước có thể chảy tới cả Thái Bình Dương (biên trái/trên) và Đại Tây Dương (biên phải/dưới).</p>

<p>&nbsp;</p>""",
    'lc-0463-island-perimeter': """<p>Cho lưới <code>grid</code> với <code>1</code> là đất và <code>0</code> là nước, có đúng một đảo, hãy tính chu vi của đảo.</p>

<p>&nbsp;</p>""",
    'lc-0547-number-of-provinces': """<p>Cho ma trận <code>isConnected</code> với <code>isConnected[i][j]=1</code> nghĩa là thành phố <code>i</code> và <code>j</code> nối trực tiếp, hãy trả về số tỉnh (thành phần liên thông).</p>

<p>&nbsp;</p>""",
    'lc-0684-redundant-connection': """<p>Cho đồ thị ban đầu là cây với <code>n</code> cạnh, thêm một cạnh thừa tạo chu trình, hãy tìm cạnh có thể xóa để thành cây (trả về cạnh xuất hiện cuối nếu nhiều).</p>

<p>&nbsp;</p>""",
    'lc-0685-redundant-connection-ii': """<p>Cho đồ thị có hướng với <code>n</code> node, ban đầu là cây có gốc, thêm một cạnh thừa, hãy tìm cạnh có thể xóa để thành cây có gốc.</p>

<p>&nbsp;</p>""",
    'lc-0695-max-area-of-island': """<p>Cho lưới <code>grid</code> với <code>1</code> là đất, hãy tìm diện tích đảo lớn nhất.</p>

<p>&nbsp;</p>""",
    'lc-0721-accounts-merge': """<p>Cho danh sách tài khoản với tên và email, hãy gộp các tài khoản có chung email.</p>

<p>&nbsp;</p>""",
    'lc-0743-network-delay-time': """<p>Cho mạng <code>times</code> <code>[u,v,w]</code> và node bắt đầu <code>k</code>, hãy tính thời gian để tất cả node nhận tín hiệu, nếu không thể trả về <code>-1</code>.</p>

<p>&nbsp;</p>""",
    'lc-0787-cheapest-flights-within-k-stop': """<p>Cho <code>n</code> thành phố và chuyến bay <code>[from,to,price]</code>, hãy tìm giá rẻ nhất từ <code>src</code> tới <code>dst</code> với tối đa <code>k</code> điểm dừng.</p>

<p>&nbsp;</p>""",
    'lc-0802-find-eventual-safe-states': """<p>Cho đồ thị có hướng, một node là an toàn nếu mọi đường đi từ nó đều tới node kết thúc (không có chu trình). Hãy trả về tất cả các node an toàn.</p>

<p>&nbsp;</p>""",
    'lc-0841-keys-and-rooms': """<p>Cho <code>n</code> phòng với <code>rooms[i]</code> chứa các khóa tới phòng khác, bắt đầu từ phòng <code>0</code>, hãy xác định có thể thăm hết phòng không.</p>

<p>&nbsp;</p>""",
    'lc-0886-possible-bipartition': """<p>Cho <code>n</code> người và danh sách <code>dislikes</code> với <code>[a,b]</code> nghĩa là <code>a</code> và <code>b</code> không thể cùng nhóm, hãy xác định có thể chia thành hai nhóm thỏa mãn không.</p>

<p>&nbsp;</p>""",
    'lc-0990-satisfiability-of-equality-equ': """<p>Cho mảng phương trình <code>equations</code> dạng <code>a==b</code> hoặc <code>a!=b</code> với biến là chữ thường, hãy xác định có thể gán giá trị cho biến để thỏa mãn tất cả không.</p>

<p>&nbsp;</p>""",
    'lc-0994-rotting-oranges': """<p>Cho lưới <code>grid</code> với <code>0</code> là ô trống, <code>1</code> là cam tươi, <code>2</code> là cam thối, mỗi phút cam thối làm thối 4 ô kề. Hãy tính số phút ít nhất để không còn cam tươi, nếu không thể trả về <code>-1</code>.</p>

<p>&nbsp;</p>""",
    'lc-0997-find-the-town-judge': """<p>Trong thị trấn <code>n</code> người, thẩm phán là người không tin ai và được mọi người tin. Cho mảng <code>trust</code> với <code>[a,b]</code> nghĩa là <code>a</code> tin <code>b</code>, hãy tìm thẩm phán, nếu không có trả về <code>-1</code>.</p>

<p>&nbsp;</p>""",
}

def process_js():
    text = JS_PATH.read_text(encoding='utf-8')
    changed = 0
    for pid, vi_prefix in VI_PREFIXES.items():
        pattern = re.compile(r"('" + re.escape(pid) + r"':\s*\{.*?content:\s*`.*?<div class=\\\"lc-description\\\">)(.*?)(<p><strong class=\"example\">Ví dụ)", re.DOTALL)
        m = pattern.search(text)
        if not m:
            pattern2 = re.compile(r"('" + re.escape(pid) + r"':\s*\{.*?content:\s*`.*?<div class=\\\"lc-description\\\">)(.*?)(<p><strong class=\"example\">)", re.DOTALL)
            m = pattern2.search(text)
            if not m:
                print(f"[JS] skip {pid}")
                continue
        start, end = m.span(2)
        text = text[:start] + vi_prefix + text[end:]
        changed += 1
    if changed:
        JS_PATH.write_text(text, encoding='utf-8')
        print(f"[JS] Level4 đã thay {changed}/{len(VI_PREFIXES)}")
    return changed

def process_md():
    changed = 0
    for md_path in glob.glob(DOCS_GLOB, recursive=True):
        p = pathlib.Path(md_path)
        if "level_04" not in str(p):
            continue
        txt = p.read_text(encoding='utf-8')
        m_slug = re.search(r'slug:\s*"([^"]+)"', txt)
        pid = m_slug.group(1) if m_slug else None
        if pid not in VI_PREFIXES:
            continue
        vi_prefix = VI_PREFIXES[pid]
        pattern = re.compile(r'(<div class="lc-description">)(.*?)(<p><strong class="example">Ví dụ)', re.DOTALL)
        m = pattern.search(txt)
        if not m:
            pattern2 = re.compile(r'(<div class="lc-description">)(.*?)(<p><strong class="example">)', re.DOTALL)
            m = pattern2.search(txt)
            if not m:
                continue
        start, end = m.span(2)
        new_txt = txt[:start] + vi_prefix + txt[end:]
        if new_txt != txt:
            p.write_text(new_txt, encoding='utf-8')
            changed += 1
    print(f"[MD] Level4 đã thay {changed}")
    return changed

if __name__ == "__main__":
    c1 = process_js()
    c2 = process_md()
    print(f"Tổng Level4: JS {c1} | MD {c2}")
