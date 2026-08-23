#!/usr/bin/env python3
"""
Refine Level 5 remaining 85 — Bit Manipulation 16 + Greedy 18 + Hard Mix 27 + Math & Geometry 24 = 85
Thay auto heuristic bằng manual chất lượng cao, hoàn thiện 460/460
"""

import pathlib, re, glob
ROOT = pathlib.Path(__file__).parent.parent
JS_PATH = ROOT / "website" / "leetcode-content.js"
DOCS_GLOB = str(ROOT / "leetcode" / "docs" / "**" / "*.md")

VI_PREFIXES = {
    # Bit Manipulation 16
    'lc-0136-single-number-1': """<p>Cho mảng không rỗng <code>nums</code>, mọi phần tử xuất hiện hai lần ngoại trừ một, hãy tìm phần tử đơn lẻ (bản Bit Manipulation).</p>

<p>&nbsp;</p>""",
    'lc-0137-single-number-ii-1': """<p>Cho mảng <code>nums</code>, mọi phần tử xuất hiện ba lần ngoại trừ một, hãy tìm phần tử đơn lẻ (bản Bit).</p>

<p>&nbsp;</p>""",
    'lc-0190-reverse-bits': """<p>Cho số nguyên không dấu 32-bit <code>n</code>, hãy đảo ngược các bit và trả về kết quả.</p>

<p>&nbsp;</p>""",
    'lc-0191-number-of-1-bits': """<p>Cho số nguyên không dấu <code>n</code>, hãy trả về số lượng bit <code>1</code> (Hamming weight).</p>

<p>&nbsp;</p>""",
    'lc-0201-bitwise-and-of-numbers-range': """<p>Cho hai số nguyên <code>left</code> và <code>right</code>, hãy trả về phép AND theo bit của tất cả số trong khoảng <code>[left, right]</code>.</p>

<p>&nbsp;</p>""",
    'lc-0231-power-of-two': """<p>Cho số nguyên <code>n</code>, hãy trả về <code>true</code> nếu <code>n</code> là lũy thừa của 2.</p>

<p>&nbsp;</p>""",
    'lc-0260-single-number-iii-1': """<p>Cho mảng <code>nums</code> với đúng hai phần tử chỉ xuất hiện một lần, còn lại xuất hiện hai lần, hãy tìm hai phần tử đó.</p>

<p>&nbsp;</p>""",
    'lc-0268-missing-number-1': """<p>Cho mảng <code>nums</code> chứa <code>n</code> số khác nhau trong <code>[0,n]</code>, hãy tìm số thiếu (bản Bit).</p>

<p>&nbsp;</p>""",
    'lc-0318-maximum-product-of-word-length': """<p>Cho mảng chuỗi <code>words</code>, hãy tìm tích lớn nhất của độ dài hai từ không có chữ cái chung.</p>

<p>&nbsp;</p>""",
    'lc-0326-power-of-three': """<p>Cho số nguyên <code>n</code>, hãy trả về <code>true</code> nếu <code>n</code> là lũy thừa của 3.</p>

<p>&nbsp;</p>""",
    'lc-0338-counting-bits': """<p>Cho số nguyên <code>n</code>, hãy trả về mảng <code>ans</code> với <code>ans[i]</code> là số bit <code>1</code> trong biểu diễn nhị phân của <code>i</code> (0 ≤ i ≤ n).</p>

<p>&nbsp;</p>""",
    'lc-0342-power-of-four': """<p>Cho số nguyên <code>n</code>, hãy trả về <code>true</code> nếu <code>n</code> là lũy thừa của 4.</p>

<p>&nbsp;</p>""",
    'lc-0371-sum-of-two-integers': """<p>Cho hai số nguyên <code>a</code> và <code>b</code>, hãy tính tổng mà không dùng toán tử <code>+</code> và <code>-</code>.</p>

<p>&nbsp;</p>""",
    'lc-0389-find-the-difference': """<p>Cho hai chuỗi <code>s</code> và <code>t</code> với <code>t</code> là <code>s</code> xáo trộn và thêm một chữ cái, hãy tìm chữ cái thêm vào.</p>

<p>&nbsp;</p>""",
    'lc-0421-maximum-xor-of-two-numbers-in--1': """<p>Cho mảng <code>nums</code>, hãy tìm giá trị xor lớn nhất của hai số bất kỳ.</p>

<p>&nbsp;</p>""",
    'lc-0067-add-binary': """<p>Cho hai chuỗi nhị phân <code>a</code> và <code>b</code>, hãy trả về tổng của chúng dưới dạng chuỗi nhị phân.</p>

<p>&nbsp;</p>""",
    # Greedy 18
    'lc-1094-car-pooling': """<p>Cho mảng chuyến đi <code>trips</code> với <code>[numPassengers, from, to]</code> và sức chứa <code>capacity</code>, hãy xác định xe có thể chở hết mà không vượt sức chứa không.</p>

<p>&nbsp;</p>""",
    'lc-0134-gas-station': """<p>Cho hai mảng <code>gas</code> và <code>cost</code> với <code>gas[i]</code> là xăng nhận tại trạm <code>i</code> và <code>cost[i]</code> là xăng cần để đi tới trạm <code>i+1</code>, hãy tìm chỉ số trạm bắt đầu để đi vòng hết, nếu không thể trả về <code>-1</code>.</p>

<p>&nbsp;</p>""",
    'lc-0134-gas-station-1': """<p>Cho <code>gas</code> và <code>cost</code>, hãy tìm trạm bắt đầu để đi vòng hết (bản Greedy).</p>

<p>&nbsp;</p>""",
    'lc-0135-candy': """<p>Cho mảng điểm <code>ratings</code>, mỗi trẻ phải có ít nhất một kẹo, trẻ có điểm cao hơn hàng xóm phải có nhiều kẹo hơn. Hãy tìm số kẹo ít nhất cần phát.</p>

<p>&nbsp;</p>""",
    'lc-0316-remove-duplicate-letters': """<p>Cho chuỗi <code>s</code>, hãy xóa các chữ trùng sao cho mỗi chữ chỉ xuất hiện một lần và kết quả là nhỏ nhất theo thứ tự từ điển.</p>

<p>&nbsp;</p>""",
    'lc-0321-create-maximum-number': """<p>Cho hai mảng <code>nums1</code>, <code>nums2</code> và số nguyên <code>k</code>, hãy tạo số lớn nhất độ dài <code>k</code> bằng cách chọn dãy con từ hai mảng và trộn.</p>

<p>&nbsp;</p>""",
    'lc-0402-remove-k-digits': """<p>Cho chuỗi số <code>num</code> và số nguyên <code>k</code>, hãy xóa <code>k</code> chữ số để số còn lại nhỏ nhất, trả về dưới dạng chuỗi.</p>

<p>&nbsp;</p>""",
    'lc-0435-non-overlapping-intervals-1': """<p>Cho mảng khoảng <code>intervals</code>, hãy tìm số khoảng ít nhất cần xóa để không còn chồng lấn (bản Greedy).</p>

<p>&nbsp;</p>""",
    'lc-0045-jump-game-ii-1': """<p>Cho mảng <code>nums</code> với bước nhảy tối đa, hãy tìm số lần nhảy ít nhất tới cuối (bản Greedy).</p>

<p>&nbsp;</p>""",
    'lc-0455-assign-cookies': """<p>Cho mảng trẻ <code>g</code> (độ tham) và bánh <code>s</code> (kích thước), mỗi trẻ nhận tối đa một bánh và chỉ hài lòng nếu <code>s[j] ≥ g[i]</code>. Hãy tối đa số trẻ hài lòng.</p>

<p>&nbsp;</p>""",
    'lc-0502-ipo-1': """<p>Cho <code>k</code>, vốn <code>w</code>, lợi nhuận và vốn yêu cầu mỗi dự án, hãy tối đa hóa vốn sau <code>k</code> dự án (bản Greedy).</p>

<p>&nbsp;</p>""",
    'lc-0055-jump-game-1': """<p>Cho mảng <code>nums</code> với bước nhảy tối đa, hãy xác định có thể tới cuối không (bản Greedy).</p>

<p>&nbsp;</p>""",
    'lc-0621-task-scheduler-1': """<p>Cho mảng tác vụ <code>tasks</code> và thời gian làm mát <code>n</code>, hãy tìm thời gian ít nhất để hoàn thành (bản Greedy).</p>

<p>&nbsp;</p>""",
    'lc-0678-valid-parenthesis-string': """<p>Cho chuỗi <code>s</code> chứa <code>'('</code>, <code>')'</code> và <code>'*'</code> (có thể là <code>'('</code>, <code>')'</code> hoặc rỗng), hãy xác định chuỗi có thể hợp lệ không.</p>

<p>&nbsp;</p>""",
    'lc-0763-partition-labels': """<p>Cho chuỗi <code>s</code>, hãy chia thành nhiều phần nhất sao cho mỗi chữ cái chỉ xuất hiện trong một phần, trả về độ dài các phần.</p>

<p>&nbsp;</p>""",
    'lc-0846-hand-of-straights': """<p>Cho mảng <code>hand</code> và số nguyên <code>groupSize</code>, hãy xác định có thể chia thành các nhóm liên tiếp kích thước <code>groupSize</code> không.</p>

<p>&nbsp;</p>""",
    'lc-0860-lemonade-change': """<p>Khách mua nước chanh 5 đô, trả bằng <code>5,10,20</code>, bạn cần thối đúng. Cho dãy <code>bills</code>, hãy xác định có thể thối cho tất cả khách không.</p>

<p>&nbsp;</p>""",
    'lc-0871-minimum-number-of-refueling-st': """<p>Xe cần đi quãng đường <code>target</code> với xăng ban đầu <code>startFuel</code>, có các trạm <code>stations[i]=[position, fuel]</code>. Hãy tìm số lần đổ xăng ít nhất để tới đích.</p>

<p>&nbsp;</p>""",
    # Hard Mix 27
    'lc-0010-regular-expression-matching-1': """<p>Cho chuỗi <code>s</code> và mẫu <code>p</code> với <code>'.'</code> và <code>'*'</code>, hãy xác định khớp toàn bộ không (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0124-binary-tree-maximum-path-sum-1': """<p>Cho gốc cây nhị phân, hãy tìm đường đi có tổng lớn nhất (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0126-word-ladder-ii-1': """<p>Cho <code>beginWord</code>, <code>endWord</code> và <code>wordList</code>, hãy tìm tất cả dãy biến đổi ngắn nhất (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-1293-shortest-path-in-a-grid-with-o-1': """<p>Cho lưới với chướng ngại và <code>k</code> lần loại bỏ, hãy tìm đường đi ngắn nhất (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0146-lru-cache-2': """<p>Thiết kế LRU Cache với <code>get/put O(1)</code> (bản Hard Mix 1).</p>

<p>&nbsp;</p>""",
    'lc-0146-lru-cache-3': """<p>Thiết kế LRU Cache với <code>get/put O(1)</code> (bản Hard Mix 2).</p>

<p>&nbsp;</p>""",
    'lc-0212-word-search-ii-2': """<p>Cho bảng và danh sách từ, hãy tìm tất cả từ trên bảng (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0023-merge-k-sorted-lists-2': """<p>Cho <code>k</code> danh sách đã sắp xếp, hãy gộp thành một danh sách đã sắp xếp (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0239-sliding-window-maximum-1': """<p>Cho mảng <code>nums</code> và cửa sổ <code>k</code>, hãy trả về max mỗi cửa sổ (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0295-find-median-from-data-stream-1': """<p>Thiết kế <code>MedianFinder</code> với <code>addNum</code> và <code>findMedian</code> (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0297-serialize-and-deserialize-bina-1': """<p>Thiết kế serialize/deserialize cây nhị phân (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0315-count-of-smaller-numbers-after-1': """<p>Cho mảng <code>nums</code>, hãy đếm số phần tử nhỏ hơn ở phía sau cho mỗi vị trí (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0032-longest-valid-parentheses': """<p>Cho chuỗi chỉ chứa <code>'('</code> và <code>')'</code>, hãy tìm độ dài chuỗi con ngoặc hợp lệ dài nhất.</p>

<p>&nbsp;</p>""",
    'lc-0004-median-of-two-sorted-arrays-1': """<p>Cho hai mảng đã sắp xếp, hãy tìm trung vị với độ phức tạp <code>O(log(m+n))</code> (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0041-first-missing-positive-1': """<p>Cho mảng chưa sắp xếp, hãy tìm số nguyên dương nhỏ nhất còn thiếu với <code>O(n)</code> và <code>O(1)</code> (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0042-trapping-rain-water-2': """<p>Cho <code>n</code> số nguyên biểu diễn bản đồ độ cao, hãy tính lượng nước giữ lại (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0432-all-oone-data-structure-1': """<p>Thiết kế cấu trúc đếm chuỗi với <code>inc/dec/getMax/getMin O(1)</code> (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0044-wildcard-matching-1': """<p>Cho chuỗi <code>s</code> và mẫu <code>p</code> với <code>'?'</code> và <code>'*'</code>, hãy xác định khớp không (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0460-lfu-cache': """<p>Thiết kế <strong>LFU Cache</strong> với <code>get</code> và <code>put</code> trong <code>O(1)</code>, khi đầy thì loại bỏ khóa ít dùng nhất, nếu bằng nhau thì loại bỏ ít dùng gần nhất.</p>

<p>&nbsp;</p>""",
    'lc-0480-sliding-window-median-1': """<p>Cho mảng <code>nums</code> và cửa sổ <code>k</code>, hãy trả về trung vị mỗi cửa sổ (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0493-reverse-pairs-1': """<p>Cho mảng <code>nums</code>, hãy đếm số cặp <code>(i,j)</code> với <code>i&lt;j</code> và <code>nums[i] &gt; 2*nums[j]</code> (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0076-minimum-window-substring-1': """<p>Cho hai chuỗi <code>s</code> và <code>t</code>, hãy tìm cửa sổ con nhỏ nhất của <code>s</code> chứa mọi ký tự của <code>t</code> (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0765-couples-holding-hands': """<p>Cho <code>n</code> cặp đôi ngồi hàng, mỗi người có id <code>0..2n-1</code>, cặp <code>(2i,2i+1)</code> là một đôi. Họ có thể đổi chỗ, hãy tìm số lần đổi ít nhất để mỗi đôi ngồi kề nhau.</p>

<p>&nbsp;</p>""",
    'lc-0815-bus-routes-1': """<p>Cho các tuyến xe buýt, hãy tìm số xe ít nhất từ <code>source</code> tới <code>target</code> (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0084-largest-rectangle-in-histogram-1': """<p>Cho mảng chiều cao histogram, hãy tìm diện tích hình chữ nhật lớn nhất (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0847-shortest-path-visiting-all-nod-1': """<p>Cho đồ thị vô hướng, hãy tìm đường đi ngắn nhất thăm tất cả node (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    'lc-0864-shortest-path-to-get-all-keys-1': """<p>Cho lưới với khóa và ổ khóa, hãy tìm số bước ít nhất để nhặt hết khóa (bản Hard Mix).</p>

<p>&nbsp;</p>""",
    # Math & Geometry 24
    'lc-0012-integer-to-roman': """<p>Cho số nguyên <code>num</code> trong <code>[1,3999]</code>, hãy chuyển thành số La Mã.</p>

<p>&nbsp;</p>""",
    'lc-0013-roman-to-integer': """<p>Cho chuỗi La Mã <code>s</code>, hãy chuyển thành số nguyên.</p>

<p>&nbsp;</p>""",
    'lc-0149-max-points-on-a-line-1': """<p>Cho mảng điểm, hãy tìm số điểm tối đa cùng nằm trên một đường thẳng (bản Math).</p>

<p>&nbsp;</p>""",
    'lc-0171-excel-sheet-column-number': """<p>Cho chuỗi cột Excel <code>columnTitle</code> (ví dụ <code>"AB"</code>), hãy trả về số cột tương ứng.</p>

<p>&nbsp;</p>""",
    'lc-0172-factorial-trailing-zeroes': """<p>Cho số nguyên <code>n</code>, hãy trả về số lượng số 0 ở cuối <code>n!</code>.</p>

<p>&nbsp;</p>""",
    'lc-0202-happy-number': """<p>Cho số nguyên <code>n</code>, hãy xác định có phải số hạnh phúc không (thay số bằng tổng bình phương chữ số, lặp tới 1 hoặc vòng lặp).</p>

<p>&nbsp;</p>""",
    'lc-0204-count-primes': """<p>Cho số nguyên <code>n</code>, hãy đếm số lượng số nguyên tố nhỏ hơn <code>n</code>.</p>

<p>&nbsp;</p>""",
    'lc-0223-rectangle-area': """<p>Cho hai hình chữ nhật song song trục với <code>[x1,y1,x2,y2]</code>, hãy tính tổng diện tích phủ (phần giao chỉ tính một lần).</p>

<p>&nbsp;</p>""",
    'lc-0029-divide-two-integers': """<p>Cho hai số nguyên <code>dividend</code> và <code>divisor</code>, hãy thực hiện phép chia mà không dùng nhân, chia, modulo, trả về thương làm tròn về 0 và kẹp trong 32-bit.</p>

<p>&nbsp;</p>""",
    'lc-0319-bulb-switcher': """<p>Có <code>n</code> bóng đèn ban đầu tắt, vòng <code>i</code> bật/tắt mọi bóng có chỉ số chia hết cho <code>i</code>. Sau <code>n</code> vòng, hãy đếm số bóng đang bật.</p>

<p>&nbsp;</p>""",
    'lc-0326-power-of-three-1': """<p>Cho số nguyên <code>n</code>, hãy xác định có phải lũy thừa của 3 không (bản Math).</p>

<p>&nbsp;</p>""",
    'lc-0382-linked-list-random-node': """<p>Cho đầu danh sách liên kết, hãy thiết kế lớp với <code>getRandom()</code> trả về giá trị node ngẫu nhiên với xác suất đều.</p>

<p>&nbsp;</p>""",
    'lc-0398-random-pick-index': """<p>Cho mảng <code>nums</code> có thể chứa trùng, hãy thiết kế <code>pick(target)</code> trả về chỉ số ngẫu nhiên của <code>target</code> với xác suất đều.</p>

<p>&nbsp;</p>""",
    'lc-0400-nth-digit': """<p>Cho số nguyên <code>n</code>, hãy trả về chữ số thứ <code>n</code> trong dãy vô hạn <code>123456789101112...</code>.</p>

<p>&nbsp;</p>""",
    'lc-0412-fizz-buzz': """<p>Cho số nguyên <code>n</code>, hãy trả về mảng đáp án với <code>answer[i]</code> là <code>"FizzBuzz"</code> nếu <code>i</code> chia hết cho 3 và 5, <code>"Fizz"</code> nếu chia hết cho 3, <code>"Buzz"</code> nếu chia hết cho 5, ngược lại là <code>i</code>.</p>

<p>&nbsp;</p>""",
    'lc-0043-multiply-strings': """<p>Cho hai chuỗi số <code>num1</code> và <code>num2</code> biểu diễn số nguyên không âm, hãy trả về tích của chúng dưới dạng chuỗi.</p>

<p>&nbsp;</p>""",
    'lc-0470-implement-rand10-using-rand7': """<p>Cho hàm <code>rand7()</code> trả về 1-7 đều, hãy hiện thực <code>rand10()</code> trả về 1-10 đều chỉ dùng <code>rand7()</code>.</p>

<p>&nbsp;</p>""",
    'lc-0050-powx-n': """<p>Cho số thực <code>x</code> và số nguyên <code>n</code>, hãy tính <code>x<sup>n</sup></code> (pow).</p>

<p>&nbsp;</p>""",
    'lc-0528-random-pick-with-weight': """<p>Cho mảng trọng số <code>w</code>, hãy thiết kế <code>pickIndex()</code> chọn chỉ số với xác suất tỉ lệ với trọng số.</p>

<p>&nbsp;</p>""",
    'lc-0066-plus-one': """<p>Cho mảng chữ số <code>digits</code> biểu diễn số nguyên không âm, hãy cộng một và trả về mảng kết quả.</p>

<p>&nbsp;</p>""",
    'lc-0066-plus-one-1': """<p>Cho mảng chữ số <code>digits</code>, hãy cộng một (bản Math & Geometry).</p>

<p>&nbsp;</p>""",
    'lc-0069-sqrtx-1': """<p>Cho số nguyên không âm <code>x</code>, hãy trả về căn bậc hai làm tròn xuống (bản Math).</p>

<p>&nbsp;</p>""",
    'lc-0007-reverse-integer': """<p>Cho số nguyên 32-bit <code>x</code>, hãy đảo ngược chữ số, nếu vượt ngoài <code>[-2<sup>31</sup>, 2<sup>31</sup>-1]</code> thì trả về <code>0</code>.</p>

<p>&nbsp;</p>""",
    'lc-0009-palindrome-number': """<p>Cho số nguyên <code>x</code>, hãy trả về <code>true</code> nếu <code>x</code> là palindrome (đọc xuôi ngược như nhau).</p>

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
        print(f"[JS] Level5 manual còn lại đã thay {changed}/{len(VI_PREFIXES)}")
    return changed

def process_md():
    changed = 0
    for md_path in glob.glob(DOCS_GLOB, recursive=True):
        p = pathlib.Path(md_path)
        if "level_05" not in str(p):
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
    print(f"[MD] Level5 manual còn lại đã thay {changed}")
    return changed

if __name__ == "__main__":
    c1 = process_js()
    c2 = process_md()
    print(f"Tổng Level5 manual còn lại: JS {c1} | MD {c2}")
    # Final check all 460 manual?
    js = JS_PATH.read_text(encoding='utf-8')
    total = len(re.findall(r"'(lc-[^']+)':", js))
    # Count manual: those with Cho in prefix
    manual = 0
    for pid in re.findall(r"'(lc-[^']+)':", js):
        pat = re.compile(r"'" + re.escape(pid) + r"':.*?content:\s*`.*?<div class=\\\"lc-description\\\">(.*?)<p><strong class=\"example\">Ví dụ", re.DOTALL)
        m = pat.search(js)
        if m and "Cho" in m.group(1):
            manual += 1
    print(f"Total {total}, có Cho {manual}/460")
