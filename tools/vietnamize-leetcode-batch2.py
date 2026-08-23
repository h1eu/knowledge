#!/usr/bin/env python3
"""
Batch 2: Dịch trọn vẹn phần mô tả chính cho 37 bài Binary Search + Sliding Window
- Tiếp nối batch1, chỉ thay prefix mô tả (trước Ví dụ đầu tiên) bằng tiếng Việt
- Giữ nguyên originalContent
- Giữ heading đã chuẩn hoá (Ví dụ/Đầu vào/...) từ batch1
"""

import pathlib, re, glob

ROOT = pathlib.Path(__file__).parent.parent
JS_PATH = ROOT / "website" / "leetcode-content.js"
DOCS_GLOB = str(ROOT / "leetcode" / "docs" / "**" / "*.md")

# Vietnamese prefixes for each pid (HTML trước <p><strong class="example">Ví dụ)
# Được viết thủ công, giữ nguyên <code> và cấu trúc <p>/<ul>
VI_PREFIXES = {
    # ── Binary Search (21) ──
    'lc-1011-capacity-to-ship-packages-with': """<p>Băng chuyền có các kiện hàng cần được vận chuyển từ cảng này sang cảng khác trong <code>days</code> ngày.</p>

<p>Kiện hàng thứ <code>i</code> trên băng chuyền có trọng lượng <code>weights[i]</code>. Mỗi ngày, chúng ta chất hàng lên tàu theo đúng thứ tự <code>weights</code>, không được vượt quá tải trọng tối đa của tàu.</p>

<p>Hãy trả về tải trọng nhỏ nhất của tàu để có thể vận chuyển hết hàng trong <code>days</code> ngày.</p>

<p>&nbsp;</p>""",

    'lc-0153-find-minimum-in-rotated-sorted': """<p>Giả sử mảng độ dài <code>n</code> đã sắp xếp tăng dần bị <strong>xoay</strong> từ <code>1</code> đến <code>n</code> lần. Ví dụ, mảng <code>nums = [0,1,2,4,5,6,7]</code> có thể trở thành:</p>

<ul>
\t<li><code>[4,5,6,7,0,1,2]</code> nếu xoay <code>4</code> lần.</li>
\t<li><code>[0,1,2,4,5,6,7]</code> nếu xoay <code>7</code> lần.</li>
</ul>

<p>Lưu ý rằng xoay mảng <code>[a[0], a[1], a[2], ..., a[n-1]]</code> một lần sẽ cho mảng <code>[a[n-1], a[0], a[1], a[2], ..., a[n-2]]</code>.</p>

<p>Cho mảng đã xoay <code>nums</code> gồm các phần tử <strong>khác nhau</strong>, hãy trả về <em>phần tử nhỏ nhất của mảng này</em>.</p>

<p>Bạn phải viết thuật toán có độ phức tạp <code>O(log n)</code>.</p>

<p>&nbsp;</p>""",

    'lc-0154-find-minimum-in-rotated-sorted': """<p>Giả sử mảng độ dài <code>n</code> đã sắp xếp tăng dần bị <strong>xoay</strong> từ <code>1</code> đến <code>n</code> lần. Ví dụ, mảng <code>nums = [0,1,4,4,5,6,7]</code> có thể trở thành:</p>

<ul>
\t<li><code>[4,5,6,7,0,1,4]</code> nếu xoay <code>4</code> lần.</li>
\t<li><code>[0,1,4,4,5,6,7]</code> nếu xoay <code>7</code> lần.</li>
</ul>

<p>Lưu ý rằng xoay mảng <code>[a[0], a[1], a[2], ..., a[n-1]]</code> một lần sẽ cho <code>[a[n-1], a[0], a[1], a[2], ..., a[n-2]]</code>.</p>

<p>Cho mảng đã xoay <code>nums</code> có thể chứa <strong>trùng lặp</strong>, hãy trả về <em>phần tử nhỏ nhất</em>. </p>

<p><em>Lưu ý:</em> Trường hợp có trùng làm bài này khó hơn bản I.</p>

<p>&nbsp;</p>""",

    'lc-0162-find-peak-element': """<p>Phần tử đỉnh (peak) là phần tử <strong>lớn hơn nghiêm ngặt</strong> các phần tử kề nó.</p>

<p>Cho mảng số nguyên <code>nums</code> (các phần tử kề nhau được đảm bảo khác nhau), hãy tìm một phần tử đỉnh và trả về chỉ số của nó.</p>

<p>Nếu mảng chỉ có một phần tử, nó là đỉnh. Bạn có thể giả định <code>nums[-1] = nums[n] = -∞</code>.</p>

<p>Bạn phải viết thuật toán có độ phức tạp <code>O(log n)</code>.</p>

<p>&nbsp;</p>""",

    'lc-0240-search-a-2d-matrix-ii': """<p>Hãy viết thuật toán hiệu quả để tìm giá trị <code>target</code> trong ma trận nguyên <code>m x n</code> <code>matrix</code>. Ma trận có các tính chất sau:</p>

<ul>
\t<li>Số nguyên trong mỗi hàng được sắp xếp tăng dần từ trái sang phải.</li>
\t<li>Số nguyên trong mỗi cột được sắp xếp tăng dần từ trên xuống dưới.</li>
</ul>

<p>&nbsp;</p>""",

    'lc-0278-first-bad-version': """<p>Bạn là quản lý sản phẩm và hiện có <code>n</code> phiên bản <code>[1, 2, ..., n]</code>, muốn tìm phiên bản lỗi đầu tiên gây lỗi cho các phiên bản sau.</p>

<p>Bạn có API <code>isBadVersion(version)</code> để kiểm tra một phiên bản có lỗi hay không. Hãy tìm phiên bản lỗi đầu tiên, nhằm giảm thiểu số lần gọi API.</p>

<p>&nbsp;</p>""",

    'lc-0033-search-in-rotated-sorted-array': """<p>Cho mảng số nguyên <code>nums</code> đã sắp xếp tăng dần và bị xoay tại một pivot chưa biết (ví dụ <code>[0,1,2,4,5,6,7]</code> xoay thành <code>[4,5,6,7,0,1,2]</code>), và cho số nguyên <code>target</code>. Hãy tìm <code>target</code> trong mảng, trả về chỉ số nếu tồn tại, ngược lại trả về <code>-1</code>.</p>

<p>Bạn phải viết thuật toán có độ phức tạp <code>O(log n)</code>.</p>

<p>&nbsp;</p>""",

    'lc-0034-find-first-and-last-position-o': """<p>Cho mảng số nguyên <code>nums</code> đã sắp xếp tăng dần và một số nguyên <code>target</code>, hãy tìm vị trí bắt đầu và kết thúc của <code>target</code> trong mảng.</p>

<p>Nếu <code>target</code> không tồn tại, trả về <code>[-1, -1]</code>.</p>

<p>Bạn phải viết thuật toán có độ phức tạp <code>O(log n)</code>.</p>

<p>&nbsp;</p>""",

    'lc-0035-search-insert-position': """<p>Cho mảng đã sắp xếp <code>nums</code> gồm các số nguyên khác nhau và số nguyên <code>target</code>, hãy trả về chỉ số của <code>target</code> nếu tìm thấy. Ngược lại, trả về chỉ số nơi <code>target</code> sẽ được chèn để giữ thứ tự sắp xếp.</p>

<p>Bạn phải viết thuật toán có độ phức tạp <code>O(log n)</code>.</p>

<p>&nbsp;</p>""",

    'lc-0367-valid-perfect-square': """<p>Cho số nguyên dương <code>num</code>, hãy trả về <code>true</code> nếu <code>num</code> là số chính phương, ngược lại <code>false</code>.</p>

<p>Số chính phương là số nguyên có thể biểu diễn thành tích của một số nguyên với chính nó, ví dụ <code>16 = 4 * 4</code>.</p>

<p>Không được sử dụng hàm căn bậc hai có sẵn như <code>sqrt</code>.</p>

<p>&nbsp;</p>""",

    'lc-0374-guess-number-higher-or-lower': """<p>Ta chọn một số trong khoảng <code>[1, n]</code>. Bạn đoán số bằng cách gọi API <code>guess(num)</code>:</p>

<ul>
\t<li><code>-1</code> nếu số bạn đoán lớn hơn số đã chọn (<code>num > pick</code>).</li>
\t<li><code>1</code> nếu số bạn đoán nhỏ hơn số đã chọn (<code>num < pick</code>).</li>
\t<li><code>0</code> nếu bằng (<code>num == pick</code>).</li>
</ul>

<p>Hãy trả về số đã chọn.</p>

<p>&nbsp;</p>""",

    'lc-0378-kth-smallest-element-in-a-sort': """<p>Cho ma trận <code>n x n</code> trong đó mỗi hàng và mỗi cột đều được sắp xếp tăng dần, hãy trả về phần tử nhỏ thứ <code>k</code> trong ma trận.</p>

<p>Lưu ý đây là phần tử nhỏ thứ <code>k</code> theo thứ tự sắp xếp, không phải phần tử khác biệt thứ <code>k</code>.</p>

<p>Bạn phải tìm lời giải có độ phức tạp tốt hơn <code>O(n<sup>2</sup>)</code>.</p>

<p>&nbsp;</p>""",

    'lc-0004-median-of-two-sorted-arrays': """<p>Cho hai mảng đã sắp xếp <code>nums1</code> và <code>nums2</code> có kích thước <code>m</code> và <code>n</code>, hãy trả về <strong>trung vị</strong> của hai mảng đã sắp xếp.</p>

<p>Độ phức tạp tổng thể phải là <code>O(log (m+n))</code>.</p>

<p>&nbsp;</p>""",

    'lc-0410-split-array-largest-sum': """<p>Cho mảng số nguyên <code>nums</code> và số nguyên <code>k</code>, hãy chia <code>nums</code> thành <code>k</code> mảng con liên tiếp không rỗng sao cho tổng lớn nhất trong các mảng con là nhỏ nhất có thể, và trả về giá trị đó.</p>

<p><em>Định nghĩa:</em> Mảng con là phần liên tiếp của mảng.</p>

<p>&nbsp;</p>""",

    'lc-0069-sqrtx': """<p>Cho số nguyên không âm <code>x</code>, hãy tính và trả về căn bậc hai của <code>x</code> làm tròn xuống số nguyên gần nhất.</p>

<p>Không được sử dụng hàm mũ hay <code>sqrt</code> có sẵn.</p>

<p>&nbsp;</p>""",

    'lc-0704-binary-search': """<p>Cho mảng số nguyên <code>nums</code> đã sắp xếp tăng dần và số nguyên <code>target</code>, hãy viết hàm tìm <code>target</code> trong <code>nums</code>. Nếu tồn tại, trả về chỉ số; ngược lại trả về <code>-1</code>.</p>

<p>Bạn phải viết thuật toán có độ phức tạp <code>O(log n)</code>.</p>

<p>&nbsp;</p>""",

    'lc-0074-search-a-2d-matrix': """<p>Bạn được cho ma trận nguyên <code>m x n</code> <code>matrix</code> thỏa:</p>

<ul>
\t<li>Mỗi hàng được sắp xếp tăng dần.</li>
\t<li>Phần tử đầu mỗi hàng lớn hơn phần tử cuối hàng trước.</li>
</ul>

<p>Cho số nguyên <code>target</code>, hãy trả về <code>true</code> nếu <code>target</code> nằm trong ma trận, ngược lại <code>false</code>.</p>

<p>&nbsp;</p>""",

    'lc-0081-search-in-rotated-sorted-array': """<p>Cho mảng <code>nums</code> đã sắp xếp tăng dần nhưng bị xoay và <strong>có thể chứa trùng lặp</strong>, và cho <code>target</code>. Hãy trả về <code>true</code> nếu <code>target</code> tồn tại, ngược lại <code>false</code>.</p>

<p>Đây là bản mở rộng của Search in Rotated Sorted Array khi có phần tử trùng.</p>

<p>&nbsp;</p>""",

    'lc-0852-peak-index-in-a-mountain-array': """<p>Cho mảng <code>arr</code> là mảng núi (mountain array): tồn tại <code>i</code> sao cho <code>arr[0] < arr[1] < ... < arr[i-1] < arr[i] > arr[i+1] > ... > arr[n-1]</code>. Hãy trả về chỉ số <code>i</code> của đỉnh núi.</p>

<p>Bạn phải viết thuật toán có độ phức tạp <code>O(log n)</code>.</p>

<p>&nbsp;</p>""",

    'lc-0875-koko-eating-bananas': """<p>Koko có <code>n</code> đống chuối, đống thứ <code>i</code> có <code>piles[i]</code> quả. Lính canh sẽ quay lại sau <code>h</code> giờ.</p>

<p>Mỗi giờ, Koko chọn một đống và ăn <code>k</code> quả (nếu đống còn ít hơn <code>k</code> thì ăn hết). Hãy tìm <code>k</code> nhỏ nhất để Koko có thể ăn hết chuối trong <code>h</code> giờ.</p>

<p>&nbsp;</p>""",

    'lc-0981-time-based-key-value-store': """<p>Thiết kế cấu trúc dữ liệu lưu trữ key-value theo thời gian: có thể lưu nhiều giá trị cho cùng một key tại các timestamp khác nhau và truy vấn giá trị của key tại một timestamp cho trước.</p>

<p>Hiện thực lớp <code>TimeMap</code>:</p>
<ul>
\t<li><code>TimeMap()</code> khởi tạo.</li>
\t<li><code>void set(String key, String value, int timestamp)</code> lưu cặp <code>(key, value)</code> tại <code>timestamp</code>.</li>
\t<li><code>String get(String key, int timestamp)</code> trả về giá trị của <code>key</code> tại thời điểm <code>timestamp</code> lớn nhất ≤ <code>timestamp</code> đã cho, nếu không có thì <code>""</code>.</li>
</ul>

<p>&nbsp;</p>""",

    # ── Sliding Window (16) ──
    'lc-1004-max-consecutive-ones-iii': """<p>Cho mảng nhị phân <code>nums</code> và số nguyên <code>k</code>, bạn có thể lật tối đa <code>k</code> số <code>0</code> thành <code>1</code>. Hãy trả về độ dài tối đa của mảng con liên tiếp chỉ chứa <code>1</code> có thể đạt được.</p>

<p>&nbsp;</p>""",

    'lc-1456-maximum-number-of-vowels-in-a-': """<p>Cho chuỗi <code>s</code> và số nguyên <code>k</code>, hãy trả về số lượng nguyên âm lớn nhất trong bất kỳ chuỗi con (substring) nào có độ dài <code>k</code> của <code>s</code>.</p>

<p>Nguyên âm là <code>'a', 'e', 'i', 'o', 'u'</code>.</p>

<p>&nbsp;</p>""",

    'lc-1493-longest-subarray-of-1s-after-d': """<p>Cho mảng nhị phân <code>nums</code>, bạn phải xóa <strong>đúng một</strong> phần tử. Hãy trả về độ dài mảng con dài nhất chỉ chứa <code>1</code> sau khi xóa.</p>

<p>Nếu mảng con rỗng, trả về <code>0</code>. Mảng con là dãy liên tiếp.</p>

<p>&nbsp;</p>""",

    'lc-0209-minimum-size-subarray-sum': """<p>Cho mảng số nguyên dương <code>nums</code> và số nguyên dương <code>target</code>, hãy trả về độ dài nhỏ nhất của mảng con liên tiếp có tổng ≥ <code>target</code>. Nếu không có, trả về <code>0</code>.</p>

<p>&nbsp;</p>""",

    'lc-0239-sliding-window-maximum': """<p>Cho mảng số nguyên <code>nums</code> và cửa sổ trượt kích thước <code>k</code> di chuyển từ trái sang phải, mỗi lần một vị trí. Mỗi vị trí cửa sổ chỉ thấy <code>k</code> số. Hãy trả về <em>max của mỗi cửa sổ</em>.</p>

<p>&nbsp;</p>""",

    'lc-0003-longest-substring-without-repe': """<p>Cho chuỗi <code>s</code>, hãy tìm độ dài của <strong>chuỗi con dài nhất</strong> không chứa ký tự lặp lại.</p>

<p>Chuỗi con là dãy liên tiếp các ký tự.</p>

<p>&nbsp;</p>""",

    'lc-0030-substring-with-concatenation-o': """<p>Cho chuỗi <code>s</code> và mảng chuỗi <code>words</code> (các từ có độ dài bằng nhau). Hãy tìm tất cả chỉ số bắt đầu của chuỗi con trong <code>s</code> mà là sự nối (concatenation) của mỗi từ trong <code>words</code> đúng một lần, theo bất kỳ thứ tự nào và không có ký tự xen giữa.</p>

<p>Trả về các chỉ số theo bất kỳ thứ tự nào.</p>

<p>&nbsp;</p>""",

    'lc-0424-longest-repeating-character-re': """<p>Cho chuỗi <code>s</code> và số nguyên <code>k</code>, bạn có thể chọn bất kỳ ký tự nào và đổi nó thành ký tự khác, tối đa <code>k</code> lần. Hãy trả về độ dài lớn nhất của chuỗi con chứa cùng một ký tự sau khi thực hiện thao tác.</p>

<p>&nbsp;</p>""",

    'lc-0438-find-all-anagrams-in-a-string': """<p>Cho hai chuỗi <code>s</code> và <code>p</code>, hãy trả về mảng các chỉ số bắt đầu của các anagram của <code>p</code> trong <code>s</code>. Bạn có thể trả về đáp án theo bất kỳ thứ tự nào.</p>

<p>&nbsp;</p>""",

    'lc-0567-permutation-in-string': """<p>Cho hai chuỗi <code>s1</code> và <code>s2</code>, hãy trả về <code>true</code> nếu <code>s2</code> chứa một hoán vị (permutation) của <code>s1</code>, ngược lại <code>false</code>.</p>

<p>Nói cách khác, trả về <code>true</code> nếu tồn tại chuỗi con của <code>s2</code> là anagram của <code>s1</code>.</p>

<p>&nbsp;</p>""",

    'lc-0643-maximum-average-subarray-i': """<p>Cho mảng số nguyên <code>nums</code> gồm <code>n</code> phần tử và số nguyên <code>k</code>, hãy tìm mảng con liên tiếp có độ dài <code>k</code> với trung bình cộng lớn nhất và trả về giá trị đó.</p>

<p>Đáp án có sai số <code>10<sup>-5</sup></code> được chấp nhận.</p>

<p>&nbsp;</p>""",

    'lc-0713-subarray-product-less-than-k': """<p>Cho mảng số nguyên dương <code>nums</code> và số nguyên <code>k</code>, hãy trả về số lượng mảng con liên tiếp có tích nghiêm ngặt nhỏ hơn <code>k</code>.</p>

<p>&nbsp;</p>""",

    'lc-0076-minimum-window-substring': """<p>Cho hai chuỗi <code>s</code> và <code>t</code> có độ dài <code>m</code> và <code>n</code>, hãy trả về <strong>cửa sổ con nhỏ nhất</strong> của <code>s</code> chứa mọi ký tự của <code>t</code> (bao gồm cả số lần xuất hiện). Nếu không có, trả về chuỗi rỗng <code>""</code>.</p>

<p>&nbsp;</p>""",

    'lc-0904-fruit-into-baskets': """<p>Bạn đến thăm vườn cây với một hàng cây, mỗi cây có một loại trái cây, <code>fruits[i]</code> là loại của cây thứ <code>i</code>. Bạn có hai giỏ, mỗi giỏ chỉ chứa một loại. Bắt đầu từ bất kỳ cây nào, bạn di chuyển sang phải và chỉ hái một quả mỗi cây, sao cho mỗi giỏ luôn chỉ chứa một loại. Hãy trả về số quả tối đa có thể hái (tức độ dài mảng con dài nhất chứa tối đa 2 loại khác nhau).</p>

<p>&nbsp;</p>""",

    'lc-0930-binary-subarrays-with-sum': """<p>Cho mảng nhị phân <code>nums</code> và số nguyên <code>goal</code>, hãy trả về số lượng mảng con không rỗng có tổng bằng <code>goal</code>.</p>

<p>Mảng con là dãy liên tiếp.</p>

<p>&nbsp;</p>""",

    'lc-0992-subarrays-with-k-different-int': """<p>Cho mảng số nguyên <code>nums</code> và số nguyên <code>k</code>, hãy trả về số lượng mảng con tốt (good subarray) có đúng <code>k</code> số nguyên khác nhau.</p>

<p>Mảng con tốt là mảng con liên tiếp.</p>

<p>&nbsp;</p>""",
}

def process_js():
    text = JS_PATH.read_text(encoding='utf-8')
    changed = 0
    for pid, vi_prefix in VI_PREFIXES.items():
        # locate content's lc-description
        pattern = re.compile(r"('" + re.escape(pid) + r"':\s*\{.*?content:\s*`.*?<div class=\\\"lc-description\\\">)(.*?)(<p><strong class=\"example\">Ví dụ)", re.DOTALL)
        m = pattern.search(text)
        if not m:
            # try fallback without assuming Ví dụ already translated (should be already)
            pattern2 = re.compile(r"('" + re.escape(pid) + r"':\s*\{.*?content:\s*`.*?<div class=\\\"lc-description\\\">)(.*?)(<p><strong class=\"example\">)", re.DOTALL)
            m = pattern2.search(text)
            if not m:
                print(f"[JS] skip {pid} (not found)")
                continue
        vn_inner_prefix = m.group(2)
        # Replace prefix
        # Only replace if vn_inner_prefix still contains English (has "A conveyor" etc.) -> we replace entire prefix
        # Ensure vi_prefix is used
        start, end = m.span(2)
        text = text[:start] + vi_prefix + text[end:]
        changed += 1
    if changed:
        JS_PATH.write_text(text, encoding='utf-8')
        print(f"[JS] Batch2 đã dịch {changed}/{len(VI_PREFIXES)} bài")
    else:
        print("[JS] không có thay đổi")
    return changed

def process_md():
    md_files = glob.glob(DOCS_GLOB, recursive=True)
    changed = 0
    for md_path in md_files:
        p = pathlib.Path(md_path)
        txt = p.read_text(encoding='utf-8')
        m_slug = re.search(r'slug:\s*"([^"]+)"', txt)
        pid = m_slug.group(1) if m_slug else None
        if pid not in VI_PREFIXES:
            continue
        vi_prefix = VI_PREFIXES[pid]
        # Replace prefix before Ví dụ in markdown
        # Markdown uses <div class="lc-description"> ... <p><strong class="example">Ví dụ
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
    print(f"[MD] Batch2 đã dịch {changed} files")
    return changed

if __name__ == "__main__":
    c1 = process_js()
    c2 = process_md()
    print(f"Tổng Batch2: JS {c1} | MD {c2}")
