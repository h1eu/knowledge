#!/usr/bin/env python3
"""
Refine Level 1 — thay 49 bản auto-heuristic bằng manual chất lượng cao
"""

import pathlib, re, glob
ROOT = pathlib.Path(__file__).parent.parent
JS_PATH = ROOT / "website" / "leetcode-content.js"
DOCS_GLOB = str(ROOT / "leetcode" / "docs" / "**" / "*.md")

VI_PREFIXES = {
    'lc-0118-pascals-triangle': """<p>Cho số nguyên <code>numRows</code>, hãy trả về <code>numRows</code> hàng đầu của <strong>tam giác Pascal</strong>.</p>

<p>Trong tam giác Pascal, mỗi số là tổng của hai số ngay phía trên nó (như hình).</p>

<p><img alt="" src="https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif" style="height:240px; width:260px" /></p>

<p>&nbsp;</p>""",

    'lc-0119-pascals-triangle-ii': """<p>Cho số nguyên <code>rowIndex</code>, hãy trả về hàng thứ <code>rowIndex</code> của tam giác Pascal (đánh chỉ số từ 0).</p>

<p>Yêu cầu tối ưu bộ nhớ <code>O(rowIndex)</code>.</p>

<p>&nbsp;</p>""",

    'lc-0122-best-time-to-buy-and-sell-stoc': """<p>Cho mảng <code>prices</code> với <code>prices[i]</code> là giá cổ phiếu ngày <code>i</code>, bạn được phép thực hiện <strong>nhiều giao dịch</strong> (mua nhiều lần, nhưng phải bán trước khi mua lại). Hãy tìm lợi nhuận tối đa có thể đạt được.</p>

<p>&nbsp;</p>""",

    'lc-0136-single-number': """<p>Cho mảng không rỗng <code>nums</code>, mọi phần tử xuất hiện <em>hai lần</em> ngoại trừ một phần tử chỉ xuất hiện một lần. Hãy tìm phần tử đơn lẻ đó.</p>

<p>Bạn phải hiện thực lời giải có độ phức tạp thời gian tuyến tính và chỉ dùng bộ nhớ phụ hằng số.</p>

<p>&nbsp;</p>""",

    'lc-0137-single-number-ii': """<p>Cho mảng số nguyên <code>nums</code>, mọi phần tử xuất hiện <em>ba lần</em> ngoại trừ một phần tử chỉ xuất hiện một lần. Hãy tìm phần tử đó.</p>

<p>Yêu cầu thời gian tuyến tính và không dùng bộ nhớ phụ tuyến tính.</p>

<p>&nbsp;</p>""",

    'lc-0138-copy-list-with-random-pointer': """<p>Cho danh sách liên kết độ dài <code>n</code>, mỗi node có thêm con trỏ <code>random</code> có thể trỏ tới bất kỳ node nào trong danh sách hoặc <code>null</code>.</p>

<p>Hãy tạo <strong>bản sao sâu (deep copy)</strong> của danh sách: bản sao gồm đúng <code>n</code> node mới, mỗi node mới có giá trị bằng node gốc tương ứng, và cả <code>next</code> lẫn <code>random</code> đều trỏ tới các node mới sao cho trạng thái danh sách được giữ nguyên. Không có con trỏ nào trong danh sách mới được trỏ tới node của danh sách gốc.</p>

<p>Danh sách được biểu diễn ở đầu vào/đầu ra như danh sách <code>n</code> node, mỗi node là cặp <code>[val, random_index]</code>.</p>

<p>&nbsp;</p>""",

    'lc-0014-longest-common-prefix': """<p>Cho mảng chuỗi <code>strs</code>, hãy tìm <strong>tiền tố chung dài nhất</strong> trong tất cả chuỗi.</p>

<p>Nếu không có tiền tố chung, trả về chuỗi rỗng <code>""</code>.</p>

<p>&nbsp;</p>""",

    'lc-0146-lru-cache': """<p>Thiết kế cấu trúc dữ liệu thỏa mãn các ràng buộc của <strong>LRU Cache (Least Recently Used)</strong>.</p>

<p>Hiện thực lớp <code>LRUCache</code>:</p>
<ul>
\t<li><code>LRUCache(int capacity)</code> khởi tạo với dung lượng dương <code>capacity</code>.</li>
\t<li><code>int get(int key)</code> trả về giá trị của <code>key</code> nếu tồn tại, ngược lại <code>-1</code>.</li>
\t<li><code>void put(int key, int value)</code> cập nhật hoặc thêm cặp <code>key-value</code>; nếu vượt <code>capacity</code> thì loại bỏ khóa ít dùng nhất.</li>
</ul>

<p>Các hàm <code>get</code> và <code>put</code> phải chạy trung bình <code>O(1)</code>.</p>

<p>&nbsp;</p>""",

    'lc-0149-max-points-on-a-line': """<p>Cho mảng các điểm <code>points</code> với <code>points[i] = [xi, yi]</code> trên mặt phẳng 2D, hãy trả về số điểm tối đa cùng nằm trên một đường thẳng.</p>

<p>&nbsp;</p>""",

    'lc-0151-reverse-words-in-a-string': """<p>Cho chuỗi <code>s</code>, hãy đảo ngược thứ tự các <strong>từ</strong>. Từ được định nghĩa là dãy ký tự không chứa khoảng trắng. Chuỗi có thể chứa nhiều khoảng trắng thừa đầu/cuối và giữa các từ.</p>

<p>Hãy chuẩn hoá kết quả: chỉ một khoảng trắng giữa các từ, không thừa đầu/cuối.</p>

<p>&nbsp;</p>""",

    'lc-0165-compare-version-numbers': """<p>Cho hai chuỗi số phiên bản <code>version1</code> và <code>version2</code>, mỗi chuỗi gồm các số cách nhau bởi <code>'.'</code>. Hãy so sánh và trả về <code>-1</code> nếu <code>version1 &lt; version2</code>, <code>1</code> nếu <code>version1 &gt; version2</code>, ngược lại <code>0</code>.</p>

<p>&nbsp;</p>""",

    'lc-0169-majority-element': """<p>Cho mảng <code>nums</code> kích thước <code>n</code>, hãy tìm phần tử <strong>majority</strong> xuất hiện hơn <code>⌊ n/2 ⌋</code> lần. Giả định luôn tồn tại phần tử majority.</p>

<p>&nbsp;</p>""",

    'lc-0189-rotate-array': """<p>Cho mảng số nguyên <code>nums</code>, hãy xoay mảng sang phải <code>k</code> bước, thực hiện <strong>in-place</strong>.</p>

<p>Ví dụ xoay <code>[1,2,3,4,5,6,7]</code> với <code>k=3</code> thành <code>[5,6,7,1,2,3,4]</code>.</p>

<p>&nbsp;</p>""",

    'lc-0228-summary-ranges': """<p>Cho mảng số nguyên đã sắp xếp và không trùng <code>nums</code>, hãy tóm tắt các khoảng liên tiếp.</p>

<p>Mỗi khoảng <code>[a,b]</code> được biểu diễn là <code>"a-&gt;b"</code> nếu <code>a != b</code>, ngược lại <code>"a"</code>. Trả về danh sách đã sắp xếp các khoảng.</p>

<p>&nbsp;</p>""",

    'lc-0229-majority-element-ii': """<p>Cho mảng số nguyên <code>nums</code> kích thước <code>n</code>, hãy tìm tất cả phần tử xuất hiện hơn <code>⌊ n/3 ⌋</code> lần.</p>

<p>&nbsp;</p>""",

    'lc-0026-remove-duplicates-from-sorted-': """<p>Cho mảng số nguyên <code>nums</code> đã sắp xếp theo thứ tự không giảm, hãy xóa trùng <strong>in-place</strong> sao cho mỗi phần tử khác nhau chỉ xuất hiện một lần, giữ nguyên thứ tự tương đối. Trả về số phần tử khác nhau <code>k</code> (với <code>nums[0..k-1]</code> là kết quả).</p>

<p>&nbsp;</p>""",

    'lc-0260-single-number-iii': """<p>Cho mảng số nguyên <code>nums</code> trong đó đúng <strong>hai</strong> phần tử chỉ xuất hiện một lần, các phần tử còn lại đều xuất hiện hai lần. Hãy tìm hai phần tử đơn lẻ đó.</p>

<p>Yêu cầu thời gian tuyến tính và bộ nhớ hằng số (không tính mảng trả về).</p>

<p>&nbsp;</p>""",

    'lc-0268-missing-number': """<p>Cho mảng <code>nums</code> chứa <code>n</code> số khác nhau trong khoảng <code>[0, n]</code>, hãy trả về số duy nhất còn thiếu trong khoảng.</p>

<p>&nbsp;</p>""",

    'lc-0028-find-the-index-of-the-first-oc': """<p>Cho hai chuỗi <code>haystack</code> và <code>needle</code>, hãy trả về chỉ số lần xuất hiện đầu tiên của <code>needle</code> trong <code>haystack</code>, hoặc <code>-1</code> nếu không tìm thấy.</p>

<p>&nbsp;</p>""",

    'lc-0283-move-zeroes': """<p>Cho mảng số nguyên <code>nums</code>, hãy chuyển mọi số <code>0</code> về cuối mảng trong khi giữ nguyên thứ tự tương đối của các phần tử khác.</p>

<p><strong>Lưu ý:</strong> phải thực hiện in-place, không tạo bản sao của mảng.</p>

<p>&nbsp;</p>""",

    'lc-0289-game-of-life': """<p>Cho bảng <code>m x n</code> <code>board</code> là trạng thái hiện tại của <strong>Game of Life</strong>, hãy tính trạng thái kế tiếp. Quy tắc:</p>
<ul>
\t<li>Sống có &lt;2 hàng xóm sống → chết (cô lập).</li>
\t<li>Sống có 2-3 hàng xóm sống → tiếp tục sống.</li>
\t<li>Sống có &gt;3 hàng xóm sống → chết (quá tải).</li>
\t<li>Chết có đúng 3 hàng xóm sống → sống lại.</li>
</ul>

<p>Yêu cầu cập nhật in-place.</p>

<p>&nbsp;</p>""",

    'lc-0031-next-permutation': """<p>Cho mảng số nguyên <code>nums</code>, hãy biến đổi thành <strong>hoán vị kế tiếp</strong> lớn hơn theo thứ tự từ điển. Nếu không tồn tại (mảng giảm dần), hãy biến thành hoán vị nhỏ nhất (sắp xếp tăng dần). Thực hiện in-place với bộ nhớ phụ hằng số.</p>

<p>&nbsp;</p>""",

    'lc-0038-count-and-say': """<p>Dãy <strong>count-and-say</strong> được định nghĩa đệ quy: <code>countAndSay(1) = "1"</code>, với mỗi <code>n &gt; 1</code>, chuỗi là cách đọc chuỗi trước (đếm số lượng ký tự liên tiếp). Ví dụ <code>"1211"</code> đọc là <em>"one 1, one 2, two 1s"</em> → <code>"111221"</code>.</p>

<p>Cho <code>n</code>, hãy trả về chuỗi thứ <code>n</code>.</p>

<p>&nbsp;</p>""",

    'lc-0380-insert-delete-getrandom-o1': """<p>Thiết kế cấu trúc dữ liệu hỗ trợ các thao tác trung bình <code>O(1)</code>:</p>
<ul>
\t<li><code>bool insert(int val)</code> chèn <code>val</code> nếu chưa tồn tại.</li>
\t<li><code>bool remove(int val)</code> xóa <code>val</code> nếu tồn tại.</li>
\t<li><code>int getRandom()</code> trả về một phần tử ngẫu nhiên với xác suất đều.</li>
</ul>

<p>&nbsp;</p>""",

    'lc-0387-first-unique-character-in-a-st': """<p>Cho chuỗi <code>s</code>, hãy tìm <strong>ký tự không lặp đầu tiên</strong> và trả về chỉ số của nó. Nếu không tồn tại, trả về <code>-1</code>.</p>

<p>&nbsp;</p>""",

    'lc-0041-first-missing-positive': """<p>Cho mảng số nguyên chưa sắp xếp <code>nums</code>, hãy tìm <strong>số nguyên dương nhỏ nhất còn thiếu</strong>.</p>

<p>Yêu cầu thời gian <code>O(n)</code> và bộ nhớ phụ <code>O(1)</code>.</p>

<p>&nbsp;</p>""",

    'lc-0432-all-oone-data-structure': """<p>Thiết kế cấu trúc lưu trữ đếm chuỗi với khả năng:</p>
<ul>
\t<li><code>inc(String key)</code> tăng đếm của <code>key</code> lên 1.</li>
\t<li><code>dec(String key)</code> giảm đếm của <code>key</code> đi 1.</li>
\t<li><code>getMaxKey()</code> lấy key có đếm lớn nhất.</li>
\t<li><code>getMinKey()</code> lấy key có đếm nhỏ nhất.</li>
</ul>

<p>Tất cả thao tác phải <code>O(1)</code> trung bình.</p>

<p>&nbsp;</p>""",

    'lc-0448-find-all-numbers-disappeared-i': """<p>Cho mảng <code>nums</code> độ dài <code>n</code>, mỗi phần tử trong khoảng <code>[1, n]</code>; một số phần tử xuất hiện hai lần, một số thiếu. Hãy trả về tất cả số trong <code>[1, n]</code> không xuất hiện trong mảng. Yêu cầu không dùng thêm bộ nhớ phụ đáng kể.</p>

<p>&nbsp;</p>""",

    'lc-0452-minimum-number-of-arrows-to-bu': """<p>Có các bóng bay với <code>points[i] = [xstart, xend]</code> dán trên tường. Một mũi tên bắn tại <code>x</code> sẽ làm nổ mọi bóng có <code>xstart ≤ x ≤ xend</code>. Hãy tìm số mũi tên ít nhất để nổ hết bóng.</p>

<p>&nbsp;</p>""",

    'lc-0048-rotate-image': """<p>Cho ma trận <code>n x n</code> biểu diễn ảnh, hãy xoay ảnh <strong>90 độ theo chiều kim đồng hồ</strong> ngay tại chỗ (in-place).</p>

<p>&nbsp;</p>""",

    'lc-0485-max-consecutive-ones': """<p>Cho mảng nhị phân <code>nums</code>, hãy trả về số lượng <code>1</code> liên tiếp tối đa.</p>

<p>&nbsp;</p>""",

    'lc-0520-detect-capital': """<p>Cho từ <code>word</code>, hãy kiểm tra việc dùng chữ hoa có đúng không. Đúng khi thuộc một trong ba trường hợp:</p>
<ul>
\t<li>Tất cả chữ hoa (<code>"USA"</code>).</li>
\t<li>Tất cả chữ thường (<code>"leetcode"</code>).</li>
\t<li>Chỉ chữ đầu hoa (<code>"Google"</code>).</li>
</ul>

<p>&nbsp;</p>""",

    'lc-0521-longest-uncommon-subsequence-i': """<p>Cho hai chuỗi <code>a</code> và <code>b</code>, hãy tìm <strong>dãy con uncommon dài nhất</strong> — dãy con của một chuỗi nhưng không phải dãy con của chuỗi kia. Trả về độ dài, nếu không có trả về <code>-1</code>.</p>

<p>&nbsp;</p>""",

    'lc-0523-continuous-subarray-sum': """<p>Cho mảng số nguyên <code>nums</code> và số nguyên <code>k</code>, hãy kiểm tra có tồn tại mảng con liên tiếp độ dài ít nhất <code>2</code> có tổng là bội của <code>k</code> hay không.</p>

<p>&nbsp;</p>""",

    'lc-0525-contiguous-array': """<p>Cho mảng nhị phân <code>nums</code>, hãy tìm mảng con liên tiếp dài nhất có số lượng <code>0</code> và <code>1</code> bằng nhau.</p>

<p>&nbsp;</p>""",

    'lc-0054-spiral-matrix': """<p>Cho ma trận <code>m x n</code> <code>matrix</code>, hãy trả về tất cả phần tử của ma trận theo thứ tự <strong>xoắn ốc (spiral order)</strong>.</p>

<p>&nbsp;</p>""",

    'lc-0557-reverse-words-in-a-string-iii': """<p>Cho chuỗi <code>s</code>, hãy đảo ngược thứ tự ký tự trong <strong>mỗi từ</strong> trong khi vẫn giữ nguyên thứ tự các từ và khoảng trắng.</p>

<p>&nbsp;</p>""",

    'lc-0056-merge-intervals': """<p>Cho mảng các khoảng <code>intervals</code> với <code>intervals[i] = [starti, endi]</code>, hãy gộp tất cả các khoảng chồng lấn và trả về mảng các khoảng không chồng lấn đã gộp.</p>

<p>&nbsp;</p>""",

    'lc-0560-subarray-sum-equals-k': """<p>Cho mảng số nguyên <code>nums</code> và số nguyên <code>k</code>, hãy trả về số lượng mảng con liên tiếp có tổng bằng <code>k</code>.</p>

<p>&nbsp;</p>""",

    'lc-0561-array-partition': """<p>Cho mảng số nguyên độ dài <code>2n</code>, hãy chia thành <code>n</code> cặp <code>(a1,b1),...,(an,bn)</code> sao cho tổng <code>min(ai, bi)</code> trên các cặp là lớn nhất. Trả về tổng lớn nhất đó.</p>

<p>&nbsp;</p>""",

    'lc-0057-insert-interval': """<p>Cho mảng các khoảng không chồng lấn và đã sắp xếp <code>intervals</code> và một khoảng mới <code>newInterval</code>, hãy chèn <code>newInterval</code> vào và gộp nếu cần, trả về mảng kết quả.</p>

<p>&nbsp;</p>""",

    'lc-0575-distribute-candies': """<p>Cho mảng <code>candyType</code> với <code>candyType[i]</code> là loại kẹo thứ <code>i</code>, bạn có thể ăn <strong><code>n/2</code></strong> viên (với <code>n</code> là tổng số kẹo). Hãy trả về số loại kẹo khác nhau tối đa có thể ăn.</p>

<p>&nbsp;</p>""",

    'lc-0058-length-of-last-word': """<p>Cho chuỗi <code>s</code> gồm các từ và khoảng trắng, hãy trả về độ dài của <strong>từ cuối cùng</strong> trong chuỗi.</p>

<p>&nbsp;</p>""",

    'lc-0059-spiral-matrix-ii': """<p>Cho số nguyên <code>n</code>, hãy tạo ma trận <code>n x n</code> chứa các số từ <code>1</code> đến <code>n<sup>2</sup></code> theo thứ tự xoắn ốc.</p>

<p>&nbsp;</p>""",

    'lc-0594-longest-harmonious-subsequence': """<p>Cho mảng số nguyên <code>nums</code>, hãy tìm <strong>dãy con hài hoà dài nhất</strong> — dãy con mà hiệu giữa giá trị lớn nhất và nhỏ nhất đúng bằng <code>1</code>. Trả về độ dài của nó.</p>

<p>&nbsp;</p>""",

    'lc-0006-zigzag-conversion': """<p>Cho chuỗi <code>s</code> và số hàng <code>numRows</code>, hãy viết chuỗi theo dạng <strong>zigzag</strong> trên <code>numRows</code> hàng rồi đọc theo hàng, trả về chuỗi mới.</p>

<p>Ví dụ với <code>"PAYPALISHIRING"</code> và <code>numRows=3</code> → <code>"PAHNAPLSIIGYIR"</code>.</p>

<p>&nbsp;</p>""",

    'lc-0073-set-matrix-zeroes': """<p>Cho ma trận nguyên <code>m x n</code> <code>matrix</code>, nếu một phần tử là <code>0</code>, hãy đặt toàn bộ hàng và cột của nó thành <code>0</code>. Thực hiện <strong>in-place</strong>.</p>

<p>&nbsp;</p>""",

    'lc-0075-sort-colors': """<p>Cho mảng <code>nums</code> với <code>n</code> đối tượng màu đỏ (<code>0</code>), trắng (<code>1</code>) và xanh (<code>2</code>), hãy sắp xếp chúng <strong>in-place</strong> sao cho các đối tượng cùng màu kề nhau, theo thứ tự <code>0</code>, <code>1</code>, <code>2</code>.</p>

<p>Không dùng hàm sort có sẵn.</p>

<p>&nbsp;</p>""",

    'lc-0008-string-to-integer-atoi': """<p>Hiện thực hàm <code>myAtoi(string s)</code> chuyển chuỗi thành số nguyên 32-bit có dấu.</p>

<p>Thuật toán:</p>
<ol>
\t<li>Bỏ qua khoảng trắng đầu.</li>
\t<li>Xác định dấu bằng ký tự <code>'-'</code> hoặc <code>'+'</code> (mặc định dương nếu không có).</li>
\t<li>Đọc số nguyên bằng cách bỏ qua số 0 đầu cho tới khi gặp ký tự không phải chữ số; chuyển các chữ số này thành số nguyên.</li>
\t<li>Nếu vượt ngoài <code>[-2<sup>31</sup>, 2<sup>31</sup>-1]</code> thì kẹp (clamp) trong khoảng.</li>
</ol>

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
        print(f"[JS] Refine Level1 đã thay {changed}/{len(VI_PREFIXES)} bài")
    return changed

def process_md():
    changed = 0
    for md_path in glob.glob(DOCS_GLOB, recursive=True):
        p = pathlib.Path(md_path)
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
    print(f"[MD] Refine Level1 đã thay {changed} files")
    return changed

if __name__ == "__main__":
    c1 = process_js()
    c2 = process_md()
    print(f"Tổng refine: JS {c1} | MD {c2}")
