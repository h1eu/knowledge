#!/usr/bin/env python3
"""
Batch 3: Stack (17) + Two Pointers (12) = 29 bài Level 1 còn lại
"""

import pathlib, re, glob
ROOT = pathlib.Path(__file__).parent.parent
JS_PATH = ROOT / "website" / "leetcode-content.js"
DOCS_GLOB = str(ROOT / "leetcode" / "docs" / "**" / "*.md")

VI_PREFIXES = {
    # ── Stack (17) ──
    'lc-0150-evaluate-reverse-polish-notati': """<p>Cho mảng chuỗi <code>tokens</code> biểu diễn biểu thức toán học ở ký pháp Ba Lan ngược (Reverse Polish Notation). Hãy tính giá trị biểu thức.</p>

<p><em>Lưu ý:</em> Phép chia giữa hai số nguyên sẽ làm tròn về 0, các toán tử hợp lệ là <code>+ - * /</code>, mỗi toán hạng là số nguyên.</p>

<p>&nbsp;</p>""",

    'lc-0155-min-stack': """<p>Thiết kế ngăn xếp (stack) hỗ trợ <code>push</code>, <code>pop</code>, <code>top</code> và lấy phần tử nhỏ nhất trong <code>O(1)</code>.</p>

<p>Hiện thực lớp <code>MinStack</code>:</p>
<ul>
\t<li><code>MinStack()</code> khởi tạo.</li>
\t<li><code>void push(int val)</code> đẩy <code>val</code> vào stack.</li>
\t<li><code>void pop()</code> xóa phần tử trên đỉnh.</li>
\t<li><code>int top()</code> lấy phần tử trên đỉnh.</li>
\t<li><code>int getMin()</code> lấy phần tử nhỏ nhất.</li>
</ul>

<p>&nbsp;</p>""",

    'lc-0020-valid-parentheses': """<p>Cho chuỗi <code>s</code> chỉ chứa các ký tự <code>'(', ')', '{', '}', '[' và ']'</code>, hãy xác định chuỗi có hợp lệ không.</p>

<p>Chuỗi hợp lệ khi:</p>
<ul>
\t<li>Mọi dấu mở phải được đóng bởi cùng loại dấu đóng.</li>
\t<li>Dấu mở phải được đóng đúng thứ tự.</li>
\t<li>Mỗi dấu đóng phải có dấu mở tương ứng cùng loại.</li>
</ul>

<p>&nbsp;</p>""",

    'lc-0022-generate-parentheses': """<p>Cho số nguyên <code>n</code> là số cặp dấu ngoặc, hãy sinh ra <strong>tất cả</strong> các tổ hợp dấu ngoặc đúng (well-formed).</p>

<p>&nbsp;</p>""",

    'lc-0224-basic-calculator': """<p>Cho chuỗi <code>s</code> biểu diễn một biểu thức gồm số, dấu <code>'+', '-', '(', ')'</code> và khoảng trắng, hãy tính giá trị của nó.</p>

<p>Không sử dụng <code>eval</code>.</p>

<p>&nbsp;</p>""",

    'lc-0227-basic-calculator-ii': """<p>Cho chuỗi <code>s</code> là biểu thức gồm số nguyên không âm và các toán tử <code>+ - * /</code> (có khoảng trắng). Phép chia nguyên làm tròn về 0. Hãy tính giá trị biểu thức.</p>

<p>&nbsp;</p>""",

    'lc-0394-decode-string': """<p>Cho chuỗi mã hóa <code>s</code>, hãy giải mã. Quy tắc là <code>k[chuỗi_mã_hóa]</code> nghĩa là chuỗi bên trong ngoặc được lặp <code>k</code> lần. <code>k</code> là số nguyên dương.</p>

<p>Bạn có thể giả định chuỗi luôn hợp lệ, không có khoảng trắng thừa và ngoặc là cân bằng.</p>

<p>&nbsp;</p>""",

    'lc-0496-next-greater-element-i': """<p>Phần tử kế lớn hơn (next greater) của một phần tử <code>x</code> trong mảng là phần tử lớn hơn đầu tiên ở bên phải <code>x</code> trong cùng mảng.</p>

<p>Cho hai mảng <code>nums1</code> (tập con của <code>nums2</code>), với mỗi phần tử trong <code>nums1</code> hãy tìm next greater của nó trong <code>nums2</code>. Nếu không có, trả về <code>-1</code>.</p>

<p>&nbsp;</p>""",

    'lc-0503-next-greater-element-ii': """<p>Cho mảng vòng (circular) <code>nums</code> (phần tử sau cuối là đầu mảng), hãy tìm next greater cho mỗi phần tử: phần tử lớn hơn đầu tiên ở phía sau (có thể vòng lại). Nếu không có, trả về <code>-1</code>.</p>

<p>&nbsp;</p>""",

    'lc-0682-baseball-game': """<p>Bạn ghi điểm cho trận bóng chày với các thao tác:</p>
<ul>
\t<li>Số nguyên <code>x</code>: ghi điểm mới <code>x</code>.</li>
\t<li><code>"+"</code>: ghi điểm mới bằng tổng hai điểm trước.</li>
\t<li><code>"D"</code>: ghi điểm mới bằng gấp đôi điểm trước.</li>
\t<li><code>"C"</code>: hủy điểm trước.</li>
</ul>

<p>Cho danh sách thao tác <code>ops</code>, hãy trả về tổng điểm sau khi thực hiện hết.</p>

<p>&nbsp;</p>""",

    'lc-0071-simplify-path': """<p>Cho chuỗi <code>path</code> là đường dẫn tuyệt đối Unix (bắt đầu bằng <code>'/'</code>), hãy rút gọn về dạng chuẩn (canonical): thay <code>'//'</code> bằng <code>'/'</code>, xử lý <code>'.'</code> (thư mục hiện tại) và <code>'..'</code> (thư mục cha).</p>

<p>&nbsp;</p>""",

    'lc-0735-asteroid-collision': """<p>Cho mảng <code>asteroids</code> với giá trị tuyệt đối là kích thước, dấu là hướng (dương sang phải, âm sang trái). Các tiểu hành tinh di chuyển cùng tốc độ.</p>

<p>Nếu hai tiểu hành tinh gặp nhau, tiểu hành tinh nhỏ hơn sẽ nổ; nếu bằng nhau thì cả hai nổ. Tiểu hành tinh cùng hướng không gặp nhau.</p>

<p>Hãy trả về trạng thái sau mọi va chạm.</p>

<p>&nbsp;</p>""",

    'lc-0739-daily-temperatures': """<p>Cho mảng số nguyên <code>temperatures</code> là nhiệt độ hàng ngày, hãy trả về mảng <code>answer</code> sao cho <code>answer[i]</code> là số ngày phải chờ sau ngày <code>i</code> để có ngày ấm hơn. Nếu không có, <code>answer[i] == 0</code>.</p>

<p>&nbsp;</p>""",

    'lc-0084-largest-rectangle-in-histogram': """<p>Cho mảng <code>heights</code> là chiều cao các cột của histogram (mỗi cột rộng 1), hãy trả về diện tích hình chữ nhật lớn nhất có thể tạo trong histogram.</p>

<p>&nbsp;</p>""",

    'lc-0085-maximal-rectangle': """<p>Cho ma trận nhị phân <code>rows x cols</code> chỉ chứa <code>'0'</code> và <code>'1'</code>, hãy tìm hình chữ nhật lớn nhất chỉ chứa <code>'1'</code> và trả về diện tích.</p>

<p>&nbsp;</p>""",

    'lc-0853-car-fleet': """<p>Có <code>n</code> xe tại các vị trí <code>position[i]</code> với tốc độ <code>speed[i]</code>, cùng hướng tới đích <code>target</code>. Xe không thể vượt nhau; nếu xe sau đuổi kịp xe trước thì thành đoàn (fleet) di chuyển cùng tốc độ chậm hơn.</p>

<p>Hãy trả về số đoàn xe tới đích.</p>

<p>&nbsp;</p>""",

    'lc-0901-online-stock-span': """<p>Thiết kế lớp <code>StockSpanner</code> thu thập giá cổ phiếu hàng ngày và trả về span của giá đó: số ngày liên tiếp (kể cả hôm nay) mà giá ≤ giá hôm nay.</p>

<p>Hiện thực <code>int next(int price)</code>.</p>

<p>&nbsp;</p>""",

    # ── Two Pointers (12) ──
    'lc-0011-container-with-most-water': """<p>Cho mảng <code>height</code> với <code>height[i]</code> là chiều cao cột thứ <code>i</code> (rộng 1). Hãy tìm hai đường thẳng cùng trục Ox tạo thành container chứa nhiều nước nhất với trục Ox.</p>

<p>Lượng nước = min(height[i], height[j]) * (j - i). Hãy trả về lượng lớn nhất.</p>

<p>&nbsp;</p>""",

    'lc-0125-valid-palindrome': """<p>Chuỗi là palindrome nếu đọc xuôi ngược như nhau sau khi chuyển mọi chữ hoa thành chữ thường và chỉ giữ ký tự chữ-số (alphanumeric).</p>

<p>Cho chuỗi <code>s</code>, hãy trả về <code>true</code> nếu là palindrome, ngược lại <code>false</code>.</p>

<p>&nbsp;</p>""",

    'lc-0015-3sum': """<p>Cho mảng số nguyên <code>nums</code>, hãy tìm tất cả bộ ba <code>[nums[i], nums[j], nums[k]]</code> với <code>i != j != k</code> và <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>

<p>Đáp án không được chứa bộ ba trùng lặp, có thể trả về theo bất kỳ thứ tự nào.</p>

<p>&nbsp;</p>""",

    'lc-0016-3sum-closest': """<p>Cho mảng số nguyên <code>nums</code> độ dài <code>n</code> và số nguyên <code>target</code>, hãy tìm tổng của ba số trong <code>nums</code> gần nhất với <code>target</code> và trả về giá trị đó.</p>

<p>Giả định mỗi đầu vào có đúng một nghiệm.</p>

<p>&nbsp;</p>""",

    'lc-0018-4sum': """<p>Cho mảng <code>nums</code> độ dài <code>n</code> và số nguyên <code>target</code>, hãy tìm tất cả bộ bốn khác nhau sao cho tổng bằng <code>target</code>. Đáp án không chứa bộ trùng.</p>

<p>Có thể trả về theo bất kỳ thứ tự nào.</p>

<p>&nbsp;</p>""",

    'lc-0027-remove-element': """<p>Cho mảng số nguyên <code>nums</code> và số nguyên <code>val</code>, hãy xóa mọi lần xuất hiện của <code>val</code> ngay trong mảng (in-place) theo thứ tự có thể đổi, và trả về số phần tử còn lại <code>k</code> không bằng <code>val</code>.</p>

<p>Yêu cầu: <code>nums[0..k-1]</code> chứa các phần tử ≠ <code>val</code>.</p>

<p>&nbsp;</p>""",

    'lc-0344-reverse-string': """<p>Viết hàm đảo ngược mảng ký tự <code>s</code> ngay tại chỗ (in-place) với bộ nhớ phụ <code>O(1)</code>. Không tạo mảng khác.</p>

<p>&nbsp;</p>""",

    'lc-0345-reverse-vowels-of-a-string': """<p>Cho chuỗi <code>s</code>, chỉ đảo ngược các nguyên âm (<code>a, e, i, o, u</code> cả hoa thường) và giữ nguyên các ký tự còn lại. Hãy trả về chuỗi sau khi đảo.</p>

<p>&nbsp;</p>""",

    'lc-0088-merge-sorted-array': """<p>Cho hai mảng đã sắp xếp <code>nums1</code> (kích thước <code>m+n</code>, <code>m</code> phần tử đầu là dữ liệu, <code>n</code> phần tử cuối là 0) và <code>nums2</code> (kích thước <code>n</code>). Hãy trộn <code>nums2</code> vào <code>nums1</code> thành một mảng đã sắp xếp, thao tác ngay trên <code>nums1</code>.</p>

<p>Không trả về gì, chỉ sửa <code>nums1</code>.</p>

<p>&nbsp;</p>""",

    'lc-0881-boats-to-save-people': """<p>Cho mảng <code>people</code> với <code>people[i]</code> là cân nặng người thứ <code>i</code> và số nguyên <code>limit</code> là tải trọng tối đa mỗi thuyền (mỗi thuyền chở tối đa 2 người cùng lúc, tổng cân nặng ≤ <code>limit</code>). Hãy trả về số thuyền ít nhất để cứu tất cả.</p>

<p>&nbsp;</p>""",

    'lc-0283-move-zeroes-1': """<p>Cho mảng số nguyên <code>nums</code>, hãy chuyển mọi số <code>0</code> về cuối mảng trong khi giữ nguyên thứ tự tương đối của các phần tử khác. Thực hiện in-place, không tạo bản sao.</p>

<p>&nbsp;</p>""",

    'lc-0042-trapping-rain-water-1': """<p>Cho <code>n</code> số nguyên không âm biểu diễn bản đồ độ cao, chiều rộng mỗi cột là <code>1</code>, hãy tính lượng nước giữ lại được sau mưa.</p>

<p>(Bản này thuộc module Two Pointers – cùng đề với Array & Hashing nhưng tiếp cận bằng hai con trỏ.)</p>

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
        print(f"[JS] Batch3 đã dịch {changed}/{len(VI_PREFIXES)} bài")
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
    print(f"[MD] Batch3 đã dịch {changed} files")
    return changed

if __name__ == "__main__":
    c1 = process_js()
    c2 = process_md()
    print(f"Tổng Batch3: JS {c1} | MD {c2}")
