#!/usr/bin/env python3
"""
Refine Level 2 — 45 bài (Intervals 6 + Linked List 22 + Matrix & Sorting 17)
Thay auto-heuristic bằng manual chất lượng cao, giữ chuẩn Level 1
"""

import pathlib, re, glob
ROOT = pathlib.Path(__file__).parent.parent
JS_PATH = ROOT / "website" / "leetcode-content.js"
DOCS_GLOB = str(ROOT / "leetcode" / "docs" / "**" / "*.md")

VI_PREFIXES = {
    # ── Intervals (6) ──
    'lc-0435-non-overlapping-intervals': """<p>Cho mảng các khoảng <code>intervals</code> với <code>intervals[i] = [starti, endi]</code>, hãy trả về số lượng khoảng tối thiểu cần <strong>loại bỏ</strong> để các khoảng còn lại không chồng lấn.</p>

<p>&nbsp;</p>""",

    'lc-0452-minimum-number-of-arrows-to-bu-1': """<p>Có các bóng bay với <code>points[i] = [xstart, xend]</code>. Một mũi tên bắn tại <code>x</code> làm nổ mọi bóng có <code>xstart ≤ x ≤ xend</code>. Hãy tìm số mũi tên ít nhất để nổ hết bóng (bản Intervals).</p>

<p>&nbsp;</p>""",

    'lc-0056-merge-intervals-1': """<p>Cho mảng các khoảng <code>intervals</code> với <code>intervals[i] = [starti, endi]</code>, hãy gộp tất cả khoảng chồng lấn và trả về mảng không chồng lấn.</p>

<p>&nbsp;</p>""",

    'lc-0057-insert-interval-1': """<p>Cho mảng khoảng không chồng lấn và đã sắp xếp <code>intervals</code> và khoảng mới <code>newInterval</code>, hãy chèn <code>newInterval</code> và gộp nếu cần.</p>

<p>&nbsp;</p>""",

    'lc-0715-range-module': """<p>Thiết kế <code>RangeModule</code> quản lý các khoảng nửa mở <code>[left, right)</code>:</p>
<ul>
\t<li><code>addRange(left, right)</code> thêm khoảng.</li>
\t<li><code>queryRange(left, right)</code> kiểm tra khoảng có được phủ hoàn toàn không.</li>
\t<li><code>removeRange(left, right)</code> xóa khoảng.</li>
</ul>

<p>&nbsp;</p>""",

    'lc-0986-interval-list-intersections': """<p>Cho hai danh sách khoảng không chồng lấn và đã sắp xếp <code>firstList</code> và <code>secondList</code>, hãy trả về giao của chúng (các khoảng chung).</p>

<p>&nbsp;</p>""",

    # ── Linked List (22) ──
    'lc-0138-copy-list-with-random-pointer-1': """<p>Cho danh sách liên kết độ dài <code>n</code> với con trỏ <code>random</code> có thể trỏ tới bất kỳ node nào hoặc <code>null</code>, hãy tạo bản sao sâu (deep copy) gồm <code>n</code> node mới, giữ nguyên quan hệ <code>next</code> và <code>random</code>.</p>

<p>&nbsp;</p>""",

    'lc-0141-linked-list-cycle': """<p>Cho đầu danh sách liên kết <code>head</code>, hãy xác định danh sách có <strong>chu trình (cycle)</strong> hay không. Có chu trình nếu có node mà <code>next</code> trỏ lại node trước đó.</p>

<p>&nbsp;</p>""",

    'lc-0142-linked-list-cycle-ii': """<p>Cho đầu danh sách liên kết <code>head</code>, hãy trả về node nơi chu trình bắt đầu. Nếu không có chu trình, trả về <code>null</code>.</p>

<p>Không dùng thêm bộ nhớ phụ đáng kể.</p>

<p>&nbsp;</p>""",

    'lc-0143-reorder-list': """<p>Cho đầu danh sách liên kết <code>head</code>, hãy sắp xếp lại danh sách theo dạng <code>L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...</code> ngay tại chỗ, không thay đổi giá trị node.</p>

<p>&nbsp;</p>""",

    'lc-0146-lru-cache-1': """<p>Thiết kế <strong>LRU Cache</strong> với <code>get</code> và <code>put</code> trung bình <code>O(1)</code>. Khi vượt <code>capacity</code>, loại bỏ khóa ít dùng nhất (bản Linked List).</p>

<p>&nbsp;</p>""",

    'lc-1472-design-browser-history': """<p>Thiết kế lịch sử trình duyệt hỗ trợ thăm trang, quay lại và tiến tới. Hiện thực lớp <code>BrowserHistory</code> với <code>visit(url)</code>, <code>back(steps)</code>, <code>forward(steps)</code>.</p>

<p>&nbsp;</p>""",

    'lc-0148-sort-list': """<p>Cho đầu danh sách liên kết <code>head</code>, hãy sắp xếp danh sách theo thứ tự tăng dần và trả về đầu danh sách đã sắp xếp. Yêu cầu <code>O(n log n)</code> và <code>O(1)</code> bộ nhớ phụ (không tính đệ quy).</p>

<p>&nbsp;</p>""",

    'lc-0160-intersection-of-two-linked-lis': """<p>Cho đầu hai danh sách liên kết đơn <code>headA</code> và <code>headB</code>, hãy trả về node giao nhau (node mà hai danh sách cùng tham chiếu). Nếu không giao, trả về <code>null</code>.</p>

<p>&nbsp;</p>""",

    'lc-0019-remove-nth-node-from-end-of-li': """<p>Cho đầu danh sách liên kết <code>head</code>, hãy xóa node thứ <code>n</code> tính từ cuối danh sách và trả về đầu danh sách mới.</p>

<p>&nbsp;</p>""",

    'lc-0002-add-two-numbers': """<p>Cho hai danh sách liên kết không rỗng <code>l1</code> và <code>l2</code> biểu diễn hai số nguyên không âm, các chữ số lưu theo thứ tự ngược (ví dụ <code>2→4→3</code> là 342). Hãy cộng hai số và trả về tổng dưới dạng danh sách liên kết.</p>

<p>&nbsp;</p>""",

    'lc-0206-reverse-linked-list': """<p>Cho đầu danh sách liên kết đơn <code>head</code>, hãy đảo ngược danh sách và trả về đầu mới.</p>

<p>&nbsp;</p>""",

    'lc-0021-merge-two-sorted-lists': """<p>Cho đầu hai danh sách đã sắp xếp <code>list1</code> và <code>list2</code>, hãy gộp thành một danh sách đã sắp xếp bằng cách nối các node của hai danh sách.</p>

<p>&nbsp;</p>""",

    'lc-0023-merge-k-sorted-lists': """<p>Cho mảng <code>k</code> danh sách liên kết đã sắp xếp <code>lists</code>, hãy gộp tất cả thành một danh sách đã sắp xếp và trả về đầu.</p>

<p>&nbsp;</p>""",

    'lc-0234-palindrome-linked-list': """<p>Cho đầu danh sách liên kết đơn <code>head</code>, hãy trả về <code>true</code> nếu danh sách là palindrome, ngược lại <code>false</code>.</p>

<p>&nbsp;</p>""",

    'lc-0024-swap-nodes-in-pairs': """<p>Cho danh sách liên kết, hãy hoán đổi mỗi hai node kề nhau và trả về đầu danh sách mới. Phải giữ nguyên giá trị node, chỉ đổi liên kết.</p>

<p>&nbsp;</p>""",

    'lc-0025-reverse-nodes-in-k-group': """<p>Cho đầu danh sách liên kết <code>head</code> và số nguyên <code>k</code>, hãy đảo ngược mỗi nhóm <code>k</code> node liên tiếp. Nếu số node còn lại &lt; <code>k</code> thì giữ nguyên.</p>

<p>&nbsp;</p>""",

    'lc-0445-add-two-numbers-ii': """<p>Cho hai danh sách liên kết <code>l1</code> và <code>l2</code> biểu diễn hai số nguyên không âm, các chữ số lưu theo thứ tự xuôi (đầu là chữ số cao nhất). Hãy cộng và trả về tổng dưới dạng danh sách liên kết (cũng xuôi).</p>

<p>Không được đảo ngược danh sách đầu vào.</p>

<p>&nbsp;</p>""",

    'lc-0061-rotate-list': """<p>Cho đầu danh sách liên kết <code>head</code>, hãy xoay danh sách sang phải <code>k</code> vị trí.</p>

<p>&nbsp;</p>""",

    # Hai slug truncated giống nhau, cần phân biệt bằng context file path, nhưng map có 2 entries với cùng truncated slug
    # Xử lý: cả hai đều cùng mô tả "Remove Duplicates from Sorted List" I và II, gộp chung
    'lc-0082-remove-duplicates-from-sorted-': """<p>Cho đầu danh sách đã sắp xếp <code>head</code>, hãy xóa mọi node trùng sao cho mỗi giá trị chỉ xuất hiện <strong>một lần</strong> (giữ lại một bản). Trả về đầu danh sách đã xóa.</p>

<p>&nbsp;</p>""",

    'lc-0083-remove-duplicates-from-sorted-': """<p>Cho đầu danh sách đã sắp xếp <code>head</code>, hãy xóa mọi node có giá trị trùng lặp, chỉ giữ các node có giá trị <strong>khác nhau hoàn toàn</strong> (xóa hết nếu trùng). Trả về đầu danh sách.</p>

<p>&nbsp;</p>""",

    'lc-0086-partition-list': """<p>Cho đầu danh sách liên kết <code>head</code> và số nguyên <code>x</code>, hãy phân hoạch danh sách sao cho mọi node có giá trị &lt; <code>x</code> đứng trước node ≥ <code>x</code>, giữ nguyên thứ tự tương đối trong mỗi phần.</p>

<p>&nbsp;</p>""",

    'lc-0092-reverse-linked-list-ii': """<p>Cho đầu danh sách liên kết <code>head</code> và hai số nguyên <code>left</code>, <code>right</code> (1-indexed), hãy đảo ngược đoạn từ vị trí <code>left</code> đến <code>right</code> và trả về đầu danh sách.</p>

<p>&nbsp;</p>""",

    # ── Matrix & Sorting (17) ──
    'lc-0215-kth-largest-element-in-an-arra': """<p>Cho mảng số nguyên <code>nums</code> và số nguyên <code>k</code>, hãy trả về phần tử lớn thứ <code>k</code> trong mảng (không phải phần tử khác nhau thứ <code>k</code>).</p>

<p>&nbsp;</p>""",

    'lc-0221-maximal-square': """<p>Cho ma trận nhị phân <code>m x n</code> chỉ chứa <code>'0'</code> và <code>'1'</code>, hãy tìm hình vuông lớn nhất chỉ chứa <code>'1'</code> và trả về diện tích của nó.</p>

<p>&nbsp;</p>""",

    'lc-0240-search-a-2d-matrix-ii-1': """<p>Cho ma trận <code>m x n</code> với mỗi hàng và mỗi cột đều sắp xếp tăng dần, hãy tìm <code>target</code> có tồn tại không (bản Matrix & Sorting).</p>

<p>&nbsp;</p>""",

    'lc-0378-kth-smallest-element-in-a-sort-1': """<p>Cho ma trận <code>n x n</code> mỗi hàng và mỗi cột sắp xếp tăng dần, hãy trả về phần tử nhỏ thứ <code>k</code> trong ma trận.</p>

<p>&nbsp;</p>""",

    'lc-0048-rotate-image-1': """<p>Cho ma trận <code>n x n</code> biểu diễn ảnh, hãy xoay 90 độ theo chiều kim đồng hồ in-place (bản Matrix & Sorting).</p>

<p>&nbsp;</p>""",

    'lc-0048-rotate-image-2': """<p>Cho ma trận <code>n x n</code>, hãy xoay 90 độ theo chiều kim đồng hồ in-place (bản thứ 2, tiếp cận khác).</p>

<p>&nbsp;</p>""",

    'lc-0054-spiral-matrix-1': """<p>Cho ma trận <code>m x n</code>, hãy trả về các phần tử theo thứ tự xoắn ốc (bản Matrix & Sorting).</p>

<p>&nbsp;</p>""",

    'lc-0056-merge-intervals-2': """<p>Cho mảng khoảng <code>intervals</code>, hãy gộp mọi khoảng chồng lấn và trả về mảng không chồng lấn (bản Matrix & Sorting).</p>

<p>&nbsp;</p>""",

    'lc-0566-reshape-the-matrix': """<p>Cho ma trận <code>mat</code> kích thước <code>m x n</code> và hai số nguyên <code>r, c</code>, hãy định hình lại ma trận thành <code>r x c</code> giữ nguyên thứ tự duyệt theo hàng. Nếu không thể, trả về ma trận gốc.</p>

<p>&nbsp;</p>""",

    'lc-0062-unique-paths': """<p>Robot ở góc trên-trái lưới <code>m x n</code>, chỉ được di chuyển xuống hoặc sang phải. Hãy trả về số đường đi khác nhau để tới góc dưới-phải.</p>

<p>&nbsp;</p>""",

    'lc-0064-minimum-path-sum': """<p>Cho lưới <code>m x n</code> <code>grid</code> với mỗi ô chứa số nguyên không âm, tìm đường đi từ trên-trái tới dưới-phải (chỉ xuống/phải) có tổng nhỏ nhất.</p>

<p>&nbsp;</p>""",

    'lc-0073-set-matrix-zeroes-1': """<p>Cho ma trận <code>m x n</code>, nếu một phần tử là <code>0</code>, hãy đặt toàn bộ hàng và cột của nó thành <code>0</code> in-place.</p>

<p>&nbsp;</p>""",

    'lc-0074-search-a-2d-matrix-1': """<p>Cho ma trận <code>m x n</code> thỏa mỗi hàng sắp xếp tăng và phần tử đầu hàng sau lớn hơn cuối hàng trước, hãy tìm <code>target</code> có tồn tại không.</p>

<p>&nbsp;</p>""",

    'lc-0075-sort-colors-1': """<p>Cho mảng <code>nums</code> với các đối tượng <code>0</code> (đỏ), <code>1</code> (trắng), <code>2</code> (xanh), hãy sắp xếp in-place theo thứ tự <code>0,1,2</code>.</p>

<p>&nbsp;</p>""",

    'lc-0079-word-search': """<p>Cho bảng <code>m x n</code> <code>board</code> và chuỗi <code>word</code>, hãy trả về <code>true</code> nếu <code>word</code> tồn tại bằng cách nối các ô kề nhau (ngang/dọc), mỗi ô chỉ dùng một lần.</p>

<p>&nbsp;</p>""",

    'lc-0912-sort-an-array': """<p>Cho mảng số nguyên <code>nums</code>, hãy sắp xếp mảng theo thứ tự tăng dần và trả về. Không dùng hàm sort có sẵn của thư viện (yêu cầu tự hiện thực, ví dụ merge sort).</p>

<p>&nbsp;</p>""",

    'lc-0973-k-closest-points-to-origin': """<p>Cho mảng các điểm <code>points</code> với <code>points[i] = [xi, yi]</code>, hãy trả về <code>k</code> điểm gần gốc tọa độ <code>(0,0)</code> nhất. Khoảng cách Euclid.</p>

<p>&nbsp;</p>""",
}

# Xử lý 2 slug trùng lc-0082/0083 cần map riêng theo file path, nhưng slug hiện tại đã phân biệt (1 ký tự cuối khác), ta giữ như trên.
# Đối với lc-0048-rotate-image-1 và -2 sẽ match riêng.

def process_js():
    text = JS_PATH.read_text(encoding='utf-8')
    changed = 0
    for pid, vi_prefix in VI_PREFIXES.items():
        # Thử match chính xác pid, nếu không tìm thấy (do duplicate truncated) thì skip
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
        print(f"[JS] Refine Level2 đã thay {changed}/{len(VI_PREFIXES)} bài")
    return changed

def process_md():
    changed = 0
    # Build pid -> vi mapping, nhưng cần handle duplicate slug: dùng file path để phân biệt
    # Đơn giản: iterate md files, lấy slug từ frontmatter và thay nếu slug trong VI_PREFIXES
    for md_path in glob.glob(DOCS_GLOB, recursive=True):
        p = pathlib.Path(md_path)
        txt = p.read_text(encoding='utf-8')
        m_slug = re.search(r'slug:\s*"([^"]+)"', txt)
        pid = m_slug.group(1) if m_slug else None
        if pid not in VI_PREFIXES:
            continue
        vi_prefix = VI_PREFIXES[pid]
        # Nếu có 2 file cùng slug (hiếm), chỉ thay nếu file path chứa level_02
        if "level_02" not in str(md_path):
            continue
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
    print(f"[MD] Refine Level2 đã thay {changed} files")
    return changed

if __name__ == "__main__":
    c1 = process_js()
    c2 = process_md()
    print(f"Tổng refine Level2: JS {c1} | MD {c2}")
