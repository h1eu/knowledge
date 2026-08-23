#!/usr/bin/env python3
"""
Refine Level 3 — Heap (16) + Segment Tree (8) = 24 bài
"""

import pathlib, re, glob
ROOT = pathlib.Path(__file__).parent.parent
JS_PATH = ROOT / "website" / "leetcode-content.js"
DOCS_GLOB = str(ROOT / "leetcode" / "docs" / "**" / "*.md")

VI_PREFIXES = {
    # Heap 16
    'lc-0215-kth-largest-element-in-an-arra-1': """<p>Cho mảng số nguyên <code>nums</code> và số nguyên <code>k</code>, hãy trả về phần tử lớn thứ <code>k</code> trong mảng (bản Heap).</p>

<p>&nbsp;</p>""",
    'lc-0023-merge-k-sorted-lists-1': """<p>Cho mảng <code>k</code> danh sách liên kết đã sắp xếp, hãy gộp thành một danh sách đã sắp xếp (bản Heap, dùng min-heap).</p>

<p>&nbsp;</p>""",
    'lc-0295-find-median-from-data-stream': """<p>Thiết kế cấu trúc hỗ trợ thêm số và tìm trung vị của dòng dữ liệu. Hiện thực <code>MedianFinder</code> với <code>addNum(num)</code> và <code>findMedian()</code> trong <code>O(log n)</code> bằng hai heap.</p>

<p>&nbsp;</p>""",
    'lc-0347-top-k-frequent-elements-1': """<p>Cho mảng <code>nums</code> và số nguyên <code>k</code>, hãy trả về <code>k</code> phần tử xuất hiện nhiều nhất (bản Heap, dùng min-heap kích thước k).</p>

<p>&nbsp;</p>""",
    'lc-0373-find-k-pairs-with-smallest-sum': """<p>Cho hai mảng đã sắp xếp <code>nums1</code>, <code>nums2</code> và số nguyên <code>k</code>, hãy trả về <code>k</code> cặp <code>(u,v)</code> với <code>u</code> từ <code>nums1</code>, <code>v</code> từ <code>nums2</code> có tổng nhỏ nhất.</p>

<p>&nbsp;</p>""",
    'lc-0378-kth-smallest-element-in-a-sort-2': """<p>Cho ma trận <code>n x n</code> mỗi hàng/cột sắp xếp tăng, hãy trả về phần tử nhỏ thứ <code>k</code> (bản Heap, dùng min-heap).</p>

<p>&nbsp;</p>""",
    'lc-0414-third-maximum-number': """<p>Cho mảng số nguyên <code>nums</code>, hãy trả về số lớn thứ ba khác nhau trong mảng. Nếu không tồn tại, trả về số lớn nhất.</p>

<p>&nbsp;</p>""",
    'lc-0480-sliding-window-median': """<p>Cho mảng <code>nums</code> và cửa sổ kích thước <code>k</code> trượt từ trái sang phải, hãy trả về trung vị của mỗi cửa sổ. Trung vị là giá trị giữa sau khi sắp xếp, nếu chẵn thì trung bình hai giá trị giữa.</p>

<p>&nbsp;</p>""",
    'lc-0502-ipo': """<p>Cho số dự án <code>n</code> với vốn yêu cầu <code>capital[i]</code> và lợi nhuận <code>profits[i]</code>, vốn ban đầu <code>w</code> và tối đa <code>k</code> dự án có thể làm. Mỗi lần chọn dự án có vốn ≤ vốn hiện tại, sau khi làm vốn tăng thêm lợi nhuận. Hãy tối đa hoá vốn cuối cùng (dùng hai heap).</p>

<p>&nbsp;</p>""",
    'lc-0506-relative-ranks': """<p>Cho mảng điểm số <code>score</code> với mỗi phần tử là điểm của vận động viên, hãy trả về mảng hạng: hạng 1 là <code>"Gold Medal"</code>, 2 là <code>"Silver Medal"</code>, 3 là <code>"Bronze Medal"</code>, còn lại là thứ hạng số.</p>

<p>&nbsp;</p>""",
    'lc-0621-task-scheduler': """<p>Cho mảng ký tự <code>tasks</code> biểu diễn các tác vụ CPU và số nguyên <code>n</code> là thời gian làm mát giữa hai tác vụ cùng loại. Hãy tìm thời gian ít nhất để hoàn thành tất cả tác vụ (có thể chèn idle).</p>

<p>&nbsp;</p>""",
    'lc-0632-smallest-range-covering-elemen': """<p>Cho <code>k</code> danh sách đã sắp xếp, hãy tìm khoảng nhỏ nhất <code>[a,b]</code> sao cho mỗi danh sách có ít nhất một số nằm trong khoảng.</p>

<p>&nbsp;</p>""",
    'lc-0659-split-array-into-consecutive-s': """<p>Cho mảng <code>nums</code> đã sắp xếp, hãy kiểm tra có thể chia mảng thành một hoặc nhiều dãy con liên tiếp mà mỗi dãy có độ dài ≥ <code>3</code> hay không.</p>

<p>&nbsp;</p>""",
    'lc-0692-top-k-frequent-words': """<p>Cho mảng chuỗi <code>words</code>, hãy trả về <code>k</code> từ xuất hiện nhiều nhất, sắp xếp theo tần suất giảm dần, nếu bằng nhau thì theo thứ tự từ điển tăng dần.</p>

<p>&nbsp;</p>""",
    'lc-0767-reorganize-string': """<p>Cho chuỗi <code>s</code>, hãy sắp xếp lại sao cho không có hai ký tự kề nhau giống nhau. Nếu không thể, trả về chuỗi rỗng.</p>

<p>&nbsp;</p>""",
    'lc-0973-k-closest-points-to-origin-1': """<p>Cho mảng điểm <code>points</code>, hãy trả về <code>k</code> điểm gần gốc <code>(0,0)</code> nhất (bản Heap).</p>

<p>&nbsp;</p>""",
    # Segment Tree 8
    'lc-0315-count-of-smaller-numbers-after': """<p>Cho mảng số nguyên <code>nums</code>, với mỗi <code>nums[i]</code> hãy đếm số phần tử nhỏ hơn nó ở phía sau (bên phải) và trả về mảng kết quả.</p>

<p>&nbsp;</p>""",
    'lc-0493-reverse-pairs': """<p>Cho mảng số nguyên <code>nums</code>, hãy trả về số cặp quan trọng (important reverse pairs) <code>(i,j)</code> với <code>i &lt; j</code> và <code>nums[i] &gt; 2*nums[j]</code>.</p>

<p>&nbsp;</p>""",
    'lc-0699-falling-squares': """<p>Trên trục vô hạn, các hình vuông rơi lần lượt với <code>positions[i] = [left, sideLength]</code>. Mỗi hình vuông rơi từ trên xuống, đáy chạm vào đỉnh cao nhất trong khoảng của nó. Hãy trả về chiều cao tối đa sau mỗi lần rơi.</p>

<p>&nbsp;</p>""",
    'lc-0715-range-module-1': """<p>Thiết kế <code>RangeModule</code> với <code>addRange</code>, <code>queryRange</code>, <code>removeRange</code> trên khoảng nửa mở (bản Segment Tree).</p>

<p>&nbsp;</p>""",
    'lc-0729-my-calendar-i': """<p>Hiện thực lớp <code>MyCalendar</code> với <code>book(start, end)</code> đặt lịch cho khoảng nửa mở <code>[start, end)</code>, trả về <code>true</code> nếu không trùng lịch đã đặt, ngược lại <code>false</code>.</p>

<p>&nbsp;</p>""",
    'lc-0731-my-calendar-ii': """<p>Hiện thực <code>MyCalendarTwo</code> cho phép đặt lịch với tối đa <strong>đặt đôi (double booking)</strong> nhưng không cho phép đặt ba lần (triple booking). <code>book(start,end)</code> trả về <code>true</code> nếu đặt được.</p>

<p>&nbsp;</p>""",
    'lc-0732-my-calendar-iii': """<p>Hiện thực <code>MyCalendarThree</code> với <code>book(start,end)</code> luôn đặt được và trả về số lần đặt chồng lớn nhất (maximum k-booking) hiện tại.</p>

<p>&nbsp;</p>""",
    'lc-0850-rectangle-area-ii': """<p>Cho danh sách hình chữ nhật song song trục <code>rectangles</code> với <code>[x1,y1,x2,y2]</code>, hãy tính tổng diện tích được phủ bởi các hình chữ nhật (phần giao chỉ tính một lần), trả về modulo <code>10<sup>9</sup>+7</code>.</p>

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
        print(f"[JS] Level3 Heap/Segment đã thay {changed}/{len(VI_PREFIXES)}")
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
        if "level_03" not in str(md_path):
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
    print(f"[MD] Level3 Heap/Segment đã thay {changed}")
    return changed

if __name__ == "__main__":
    c1 = process_js()
    c2 = process_md()
    print(f"Tổng Level3 Heap/Segment: JS {c1} | MD {c2}")
