#!/usr/bin/env python3
"""
Refine Level 5 — 1D DP (25) + 2D DP (32) = 57 bài
"""

import pathlib, re, glob
ROOT = pathlib.Path(__file__).parent.parent
JS_PATH = ROOT / "website" / "leetcode-content.js"
DOCS_GLOB = str(ROOT / "leetcode" / "docs" / "**" / "*.md")

VI_PREFIXES = {
    # 1D DP 25
    'lc-0139-word-break': """<p>Cho chuỗi <code>s</code> và từ điển <code>wordDict</code>, hãy xác định <code>s</code> có thể tách thành các từ trong từ điển không (có thể tái sử dụng từ).</p>

<p>&nbsp;</p>""",
    'lc-0140-word-break-ii': """<p>Cho chuỗi <code>s</code> và từ điển <code>wordDict</code>, hãy trả về <strong>tất cả</strong> các cách tách <code>s</code> thành các từ trong từ điển.</p>

<p>&nbsp;</p>""",
    'lc-0152-maximum-product-subarray': """<p>Cho mảng số nguyên <code>nums</code>, hãy tìm mảng con liên tiếp có tích lớn nhất và trả về giá trị đó.</p>

<p>&nbsp;</p>""",
    'lc-0198-house-robber': """<p>Bạn là kẻ trộm chuyên nghiệp, mỗi nhà có số tiền <code>nums[i]</code>, không thể trộm hai nhà kề nhau (hệ thống báo động). Hãy tìm số tiền lớn nhất có thể trộm.</p>

<p>&nbsp;</p>""",
    'lc-0213-house-robber-ii': """<p>Các nhà xếp thành vòng tròn (nhà đầu và cuối kề nhau), không thể trộm hai nhà kề nhau. Hãy tìm số tiền lớn nhất.</p>

<p>&nbsp;</p>""",
    'lc-0300-longest-increasing-subsequence': """<p>Cho mảng số nguyên <code>nums</code>, hãy tìm độ dài dãy con tăng dài nhất (subsequence, không nhất thiết liên tiếp).</p>

<p>&nbsp;</p>""",
    'lc-0322-coin-change': """<p>Cho mảng đồng xu <code>coins</code> và số tiền <code>amount</code>, mỗi đồng có số lượng vô hạn, hãy tìm số đồng ít nhất để tạo thành <code>amount</code>, nếu không thể trả về <code>-1</code>.</p>

<p>&nbsp;</p>""",
    'lc-0368-largest-divisible-subset': """<p>Cho tập số nguyên không trùng <code>nums</code>, hãy tìm tập con lớn nhất sao cho với mọi cặp <code>(i,j)</code> trong tập, một trong hai chia hết cho cái còn lại.</p>

<p>&nbsp;</p>""",
    'lc-0376-wiggle-subsequence': """<p>Dãy wiggle là dãy mà hiệu giữa các phần tử liên tiếp xen kẽ dương và âm. Cho mảng <code>nums</code>, hãy tìm độ dài dãy con wiggle dài nhất.</p>

<p>&nbsp;</p>""",
    'lc-0377-combination-sum-iv': """<p>Cho mảng số nguyên không trùng <code>nums</code> và số nguyên <code>target</code>, hãy đếm số cách kết hợp (có tính thứ tự, có thể lặp) có tổng bằng <code>target</code>.</p>

<p>&nbsp;</p>""",
    'lc-0045-jump-game-ii': """<p>Cho mảng <code>nums</code> với <code>nums[i]</code> là độ dài nhảy tối đa từ vị trí <code>i</code>, ban đầu ở <code>0</code>, hãy tìm số lần nhảy ít nhất để tới cuối.</p>

<p>&nbsp;</p>""",
    'lc-0005-longest-palindromic-substring': """<p>Cho chuỗi <code>s</code>, hãy trả về chuỗi con palindrome dài nhất.</p>

<p>&nbsp;</p>""",
    'lc-0509-fibonacci-number': """<p>Cho số nguyên <code>n</code>, hãy tính số Fibonacci <code>F(n)</code> với <code>F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)</code>.</p>

<p>&nbsp;</p>""",
    'lc-0516-longest-palindromic-subsequenc': """<p>Cho chuỗi <code>s</code>, hãy tìm độ dài dãy con palindrome dài nhất (subsequence, không nhất thiết liên tiếp).</p>

<p>&nbsp;</p>""",
    'lc-0053-maximum-subarray': """<p>Cho mảng số nguyên <code>nums</code>, hãy tìm mảng con liên tiếp có tổng lớn nhất và trả về tổng đó.</p>

<p>&nbsp;</p>""",
    'lc-0055-jump-game': """<p>Cho mảng <code>nums</code> với bước nhảy tối đa, hãy xác định có thể nhảy từ đầu tới cuối không.</p>

<p>&nbsp;</p>""",
    'lc-0646-maximum-length-of-pair-chain': """<p>Cho mảng các cặp <code>pairs</code> với <code>[a,b]</code>, cặp <code>[c,d]</code> có thể đứng sau <code>[a,b]</code> nếu <code>c &gt; b</code>. Hãy tìm độ dài chuỗi cặp dài nhất.</p>

<p>&nbsp;</p>""",
    'lc-0647-palindromic-substrings': """<p>Cho chuỗi <code>s</code>, hãy đếm số lượng chuỗi con palindrome.</p>

<p>&nbsp;</p>""",
    'lc-0650-longest-palindromic-subsequenc': """<p>Cho chuỗi <code>s</code>, hãy tìm độ dài dãy con palindrome dài nhất (bản 2, với <code>650</code> là 2 Keys Keyboard, nhưng trong map là Longest Palindromic Subsequence).</p>

<p>&nbsp;</p>""",
    'lc-0673-number-of-longest-increasing-s': """<p>Cho mảng <code>nums</code>, hãy đếm số lượng dãy con tăng dài nhất.</p>

<p>&nbsp;</p>""",
    'lc-0070-climbing-stairs': """<p>Bạn leo cầu thang <code>n</code> bậc, mỗi lần leo 1 hoặc 2 bậc. Hãy đếm số cách khác nhau để leo tới đỉnh.</p>

<p>&nbsp;</p>""",
    'lc-0740-delete-and-earn': """<p>Cho mảng <code>nums</code>, nếu bạn lấy <code>nums[i]</code> thì phải xóa mọi phần tử bằng <code>nums[i]-1</code> và <code>nums[i]+1</code>. Hãy tìm điểm tối đa có thể kiếm được.</p>

<p>&nbsp;</p>""",
    'lc-0746-min-cost-climbing-stairs': """<p>Cho mảng <code>cost</code> với <code>cost[i]</code> là chi phí bước lên bậc <code>i</code>, bạn có thể bắt đầu từ bậc 0 hoặc 1 và mỗi lần leo 1-2 bậc. Hãy tìm chi phí nhỏ nhất để lên tới đỉnh.</p>

<p>&nbsp;</p>""",
    'lc-0091-decode-ways': """<p>Cho chuỗi chỉ chứa chữ số <code>s</code>, mỗi số <code>1-26</code> ánh xạ tới <code>A-Z</code>. Hãy đếm số cách giải mã <code>s</code>.</p>

<p>&nbsp;</p>""",
    'lc-0918-maximum-sum-circular-subarray': """<p>Cho mảng vòng (circular) <code>nums</code>, hãy tìm mảng con liên tiếp có tổng lớn nhất (có thể vòng qua đầu).</p>

<p>&nbsp;</p>""",
    # 2D DP 32
    'lc-0010-regular-expression-matching': """<p>Cho chuỗi <code>s</code> và mẫu <code>p</code> với <code>'.'</code> khớp bất kỳ ký tự đơn và <code>'*'</code> khớp 0 hoặc nhiều ký tự trước, hãy xác định <code>p</code> có khớp toàn bộ <code>s</code> không.</p>

<p>&nbsp;</p>""",
    'lc-1049-last-stone-weight-ii': """<p>Cho mảng đá <code>stones</code> với trọng lượng mỗi viên, mỗi lần đập hai viên, nếu bằng nhau thì cả hai vỡ, nếu khác thì viên nhỏ vỡ và viên lớn còn lại hiệu trọng lượng. Hãy tìm trọng lượng nhỏ nhất có thể còn lại.</p>

<p>&nbsp;</p>""",
    'lc-1092-shortest-common-supersequence': """<p>Cho hai chuỗi <code>str1</code> và <code>str2</code>, hãy trả về siêu dãy chung ngắn nhất (shortest common supersequence) chứa cả hai như dãy con.</p>

<p>&nbsp;</p>""",
    'lc-1143-longest-common-subsequence': """<p>Cho hai chuỗi <code>text1</code> và <code>text2</code>, hãy trả về độ dài dãy con chung dài nhất (LCS).</p>

<p>&nbsp;</p>""",
    'lc-0115-distinct-subsequences': """<p>Cho hai chuỗi <code>s</code> và <code>t</code>, hãy đếm số lượng dãy con khác nhau của <code>s</code> bằng <code>t</code>.</p>

<p>&nbsp;</p>""",
    'lc-0120-triangle': """<p>Cho tam giác <code>triangle</code> với mỗi hàng chứa số, hãy tìm tổng nhỏ nhất của đường đi từ đỉnh xuống đáy, mỗi bước xuống hàng dưới kề.</p>

<p>&nbsp;</p>""",
    'lc-1312-minimum-insertion-steps-to-mak': """<p>Cho chuỗi <code>s</code>, hãy tìm số lần chèn ít nhất để biến <code>s</code> thành palindrome (có thể chèn ở bất kỳ vị trí nào).</p>

<p>&nbsp;</p>""",
    'lc-1463-cherry-pickup-ii': """<p>Cho lưới <code>grid</code> với số cherry mỗi ô, hai robot bắt đầu ở hàng đầu cùng cột 0 và cột cuối, mỗi bước đi xuống và có thể sang trái/phải. Hãy tìm số cherry tối đa thu thập được.</p>

<p>&nbsp;</p>""",
    'lc-0221-maximal-square-1': """<p>Cho ma trận nhị phân, hãy tìm hình vuông lớn nhất chỉ chứa <code>'1'</code> (bản 2D DP).</p>

<p>&nbsp;</p>""",
    'lc-0312-burst-balloons': """<p>Cho mảng <code>nums</code> là số trên mỗi bóng bay, khi làm nổ bóng <code>i</code> bạn nhận <code>nums[left]*nums[i]*nums[right]</code> với <code>left/right</code> là bóng kề còn lại. Hãy tìm số xu tối đa.</p>

<p>&nbsp;</p>""",
    'lc-0329-longest-increasing-path-in-a-m': """<p>Cho ma trận <code>m x n</code>, hãy tìm độ dài đường đi tăng dài nhất (di chuyển 4 hướng, giá trị tăng nghiêm ngặt).</p>

<p>&nbsp;</p>""",
    'lc-0354-russian-doll-envelopes': """<p>Cho mảng phong bì <code>envelopes</code> với <code>[w,h]</code>, một phong bì có thể lồng vào phong bì khác nếu cả chiều rộng và cao đều lớn hơn. Hãy tìm số phong bì lồng nhau tối đa.</p>

<p>&nbsp;</p>""",
    'lc-0416-partition-equal-subset-sum': """<p>Cho mảng <code>nums</code>, hãy xác định có thể chia thành hai tập con có tổng bằng nhau không.</p>

<p>&nbsp;</p>""",
    'lc-0044-wildcard-matching': """<p>Cho chuỗi <code>s</code> và mẫu <code>p</code> với <code>'?'</code> khớp một ký tự và <code>'*'</code> khớp dãy bất kỳ (kể cả rỗng), hãy xác định <code>p</code> có khớp <code>s</code> không.</p>

<p>&nbsp;</p>""",
    'lc-0474-ones-and-zeroes': """<p>Cho mảng chuỗi nhị phân <code>strs</code> và hai số nguyên <code>m,n</code>, hãy tìm số chuỗi tối đa có thể tạo với tối đa <code>m</code> số <code>0</code> và <code>n</code> số <code>1</code>.</p>

<p>&nbsp;</p>""",
    'lc-0494-target-sum': """<p>Cho mảng <code>nums</code> và số nguyên <code>target</code>, bạn có thể thêm <code>'+'</code> hoặc <code>'-'</code> trước mỗi số, hãy đếm số cách để tổng bằng <code>target</code>.</p>

<p>&nbsp;</p>""",
    'lc-0005-longest-palindromic-substring-1': """<p>Cho chuỗi <code>s</code>, hãy trả về chuỗi con palindrome dài nhất (bản 2D DP).</p>

<p>&nbsp;</p>""",
    'lc-0516-longest-palindromic-subsequenc-1': """<p>Cho chuỗi <code>s</code>, hãy tìm độ dài dãy con palindrome dài nhất (bản 2D DP).</p>

<p>&nbsp;</p>""",
    'lc-0546-remove-boxes': """<p>Cho mảng hộp <code>boxes</code> với màu mỗi hộp, khi xóa một nhóm <code>k</code> hộp liên tiếp cùng màu bạn nhận <code>k*k</code> điểm. Hãy tìm điểm tối đa.</p>

<p>&nbsp;</p>""",
    'lc-0583-delete-operation-for-two-strin': """<p>Cho hai chuỗi <code>word1</code> và <code>word2</code>, hãy tìm số bước xóa ít nhất để hai chuỗi bằng nhau (chỉ được xóa ký tự).</p>

<p>&nbsp;</p>""",
    'lc-0062-unique-paths-1': """<p>Cho lưới <code>m x n</code>, robot chỉ đi xuống/phải, hãy đếm số đường đi từ trên-trái tới dưới-phải (bản 2D DP).</p>

<p>&nbsp;</p>""",
    'lc-0063-unique-paths-ii': """<p>Cho lưới <code>obstacleGrid</code> với <code>1</code> là chướng ngại, hãy đếm số đường đi từ trên-trái tới dưới-phải tránh chướng ngại.</p>

<p>&nbsp;</p>""",
    'lc-0064-minimum-path-sum-1': """<p>Cho lưới <code>grid</code> với số không âm, hãy tìm đường đi từ trên-trái tới dưới-phải có tổng nhỏ nhất (bản 2D DP).</p>

<p>&nbsp;</p>""",
    'lc-0647-palindromic-substrings-1': """<p>Cho chuỗi <code>s</code>, hãy đếm số chuỗi con palindrome (bản 2D DP).</p>

<p>&nbsp;</p>""",
    'lc-0664-strange-printer': """<p>Máy in in một dãy cùng ký tự trong một lần, có thể ghi đè. Cho chuỗi <code>s</code>, hãy tìm số lần in ít nhất để in <code>s</code>.</p>

<p>&nbsp;</p>""",
    'lc-0072-edit-distance': """<p>Cho hai chuỗi <code>word1</code> và <code>word2</code>, hãy tìm số thao tác ít nhất để biến <code>word1</code> thành <code>word2</code> (chèn, xóa, thay thế).</p>

<p>&nbsp;</p>""",
    'lc-0730-count-different-palindromic-su': """<p>Cho chuỗi <code>s</code>, hãy đếm số lượng dãy con palindrome khác nhau (không rỗng).</p>

<p>&nbsp;</p>""",
    'lc-0741-cherry-pickup': """<p>Cho lưới <code>grid</code> với <code>1</code> là cherry, <code>-1</code> là gai, hai người cùng đi từ <code>(0,0)</code> tới <code>(n-1,n-1)</code> chỉ đi xuống/phải, hãy tìm số cherry tối đa thu thập.</p>

<p>&nbsp;</p>""",
    'lc-0879-profitable-schemes': """<p>Cho <code>n</code> thành viên, mỗi dự án cần <code>group[i]</code> người và cho lợi nhuận <code>profit[i]</code>, hãy đếm số kế hoạch có lợi nhuận ít nhất <code>minProfit</code> (tối đa <code>n</code> người).</p>

<p>&nbsp;</p>""",
    'lc-0956-tallest-billboard': """<p>Cho mảng thanh <code>rods</code>, hãy dùng một số thanh tạo hai giá đỡ có chiều cao bằng nhau và lớn nhất, phần còn lại bỏ.</p>

<p>&nbsp;</p>""",
    'lc-0096-unique-binary-search-trees': """<p>Cho số nguyên <code>n</code>, hãy đếm số lượng BST khác nhau có thể tạo với <code>n</code> node (giá trị 1..n).</p>

<p>&nbsp;</p>""",
    'lc-0097-interleaving-string': """<p>Cho ba chuỗi <code>s1, s2, s3</code>, hãy xác định <code>s3</code> có được tạo bằng cách xen kẽ <code>s1</code> và <code>s2</code> không (giữ nguyên thứ tự trong mỗi chuỗi).</p>

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
        print(f"[JS] Level5 1D2D đã thay {changed}/{len(VI_PREFIXES)}")
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
    print(f"[MD] Level5 1D2D đã thay {changed}")
    return changed

if __name__ == "__main__":
    c1 = process_js()
    c2 = process_md()
    print(f"Tổng Level5 1D2D: JS {c1} | MD {c2}")
