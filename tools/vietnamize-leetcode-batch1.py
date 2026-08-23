#!/usr/bin/env python3
"""
Vietnamize LeetCode content - Batch 1 + Global heading normalization
Chuẩn hoá bản tiếng Việt cho phần mô tả đề bài (lc-description)

- Giữ nguyên originalContent (tiếng Anh gốc)
- Chỉ chỉnh sửa content (tiếng Việt) bên trong <div class=\"lc-description\">
- Batch 1: dịch trọn vẹn phần mô tả chính cho 10 bài đầu (chất lượng cao, thủ công)
- Toàn bộ 460 bài: chuẩn hoá heading Example/Input/Output/Constraints -> Ví dụ/Đầu vào/Đầu ra/Ràng buộc...

Chạy: python3 tools/vietnamize-leetcode-batch1.py
"""

import pathlib
import re
import glob

ROOT = pathlib.Path(__file__).parent.parent
JS_PATH = ROOT / "website" / "leetcode-content.js"
DOCS_GLOB = str(ROOT / "leetcode" / "docs" / "**" / "*.md")

# ────────────────────────────────────────────────
# 1. Heading normalization (áp dụng cho toàn bộ)
# ────────────────────────────────────────────────
HEADING_REPLACEMENTS = [
    # Ví dụ
    ('<strong class="example">Example ', '<strong class="example">Ví dụ '),
    ('<strong>Example ', '<strong>Ví dụ '),
    # Input / Output / Explanation / Constraints / Note / Follow-up (with colon)
    ('<strong>Input:</strong>', '<strong>Đầu vào:</strong>'),
    ('<strong>Output:</strong>', '<strong>Đầu ra:</strong>'),
    ('<strong>Explanation:</strong>', '<strong>Giải thích:</strong>'),
    ('<strong>Explanation: </strong>', '<strong>Giải thích: </strong>'),
    ('<p><strong>Constraints:</strong></p>', '<p><strong>Ràng buộc:</strong></p>'),
    ('<p><strong>Constraints:</strong></p>', '<p><strong>Ràng buộc:</strong></p>'),
    ('Constraints:</strong>', 'Ràng buộc:</strong>'),
    ('<strong>Constraints:</strong>', '<strong>Ràng buộc:</strong>'),
    ('<strong>Note:</strong>', '<strong>Lưu ý:</strong>'),
    ('<strong>Follow-up:', '<strong>Yêu cầu mở rộng:'),
    ('<strong>Follow up:', '<strong>Yêu cầu mở rộng:'),
    ('Follow-up:&nbsp;', 'Yêu cầu mở rộng:&nbsp;'),
    ('Follow up:&nbsp;', 'Yêu cầu mở rộng:&nbsp;'),
    # Variants without colon (LRU, etc: <strong>Input</strong> \n [ ... ])
    ('<strong>Input</strong>', '<strong>Đầu vào</strong>'),
    ('<strong>Output</strong>', '<strong>Đầu ra</strong>'),
    ('<strong>Explanation</strong>', '<strong>Giải thích</strong>'),
    # Example-block already handled, but also cover lowercase inside spans
    ('Example 1:', 'Ví dụ 1:'),
    ('Example 2:', 'Ví dụ 2:'),
    ('Example 3:', 'Ví dụ 3:'),
]

# Quick check: ensure Ràng buộc generic
def normalize_headings(html: str) -> str:
    for en, vi in HEADING_REPLACEMENTS:
        html = html.replace(en, vi)
    # Generic fallback for Constraints without strong wrapping: but we already did
    # Also handle <p><strong>Ràng buộc already? Avoid double
    # Ensure Example inside example-block variations with HTML entities
    return html

# ────────────────────────────────────────────────
# 2. Batch 1 high-quality translations for main description paragraphs
# Key: leetcode slug, Value: dict with english snippet -> vietnamese snippet (inside lc-description)
# We replace entire <p> description paragraphs before first Example
# ────────────────────────────────────────────────
BATCH1_TRANSLATIONS = {
    'lc-0001-two-sum': {
        'en': [
            '<p>You are given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>',
            '<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>',
            '<p>You can return the answer in any order.</p>',
        ],
        'vi': [
            '<p>Cho mảng số nguyên <code>nums</code>&nbsp;và số nguyên <code>target</code>, hãy trả về <em>chỉ số của hai số có tổng bằng <code>target</code></em>.</p>',
            '<p>Bạn có thể giả định mỗi đầu vào chỉ có <strong><em>duy nhất một</em> nghiệm</strong> và không được sử dụng <em>cùng một</em> phần tử hai lần.</p>',
            '<p>Bạn có thể trả về đáp án theo bất kỳ thứ tự nào.</p>',
        ],
        'constraints_followup_vi': '<strong>Yêu cầu mở rộng:&nbsp;</strong>Bạn có thể nghĩ ra thuật toán có độ phức tạp thời gian nhỏ hơn <code>O(n<sup>2</sup>)</code><font face="monospace">&nbsp;</font> không?',
    },
    'lc-0217-contains-duplicate': {
        'en': [
            '<p>Given an integer array <code>nums</code>, return <code>true</code> if any value appears <strong>at least twice</strong> in the array, and return <code>false</code> if every element is distinct.</p>',
            '<p>The element 1 occurs at the indices 0 and 3.</p>',
            '<p>All elements are distinct.</p>',
        ],
        'vi': [
            '<p>Cho mảng số nguyên <code>nums</code>, hãy trả về <code>true</code> nếu có bất kỳ giá trị nào xuất hiện <strong>ít nhất hai lần</strong> trong mảng, và trả về <code>false</code> nếu mọi phần tử đều khác nhau.</p>',
            '<p>Phần tử 1 xuất hiện tại các chỉ số 0 và 3.</p>',
            '<p>Tất cả các phần tử đều khác nhau.</p>',
        ],
    },
    'lc-0242-valid-anagram': {
        'en': [
            '<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an <span data-keyword="anagram">anagram</span> of <code>s</code>, and <code>false</code> otherwise.</p>',
            '<p><strong>Follow up:</strong> What if the inputs contain Unicode characters? How would you adapt your solution to such a case?</p>',
        ],
        'vi': [
            '<p>Cho hai chuỗi <code>s</code> và <code>t</code>, hãy trả về <code>true</code> nếu <code>t</code> là một <span data-keyword="anagram">anagram</span> (hoán vị ký tự) của <code>s</code>, và <code>false</code> trong các trường hợp còn lại.</p>',
            '<p><strong>Yêu cầu mở rộng:</strong> Nếu đầu vào chứa ký tự Unicode thì sao? Bạn sẽ điều chỉnh lời giải như thế nào cho trường hợp đó?</p>',
        ],
    },
    'lc-0049-group-anagrams': {
        'en': [
            '<p>Given an array of strings <code>strs</code>, group the <span data-keyword="anagram">anagrams</span> together. You can return the answer in <strong>any order</strong>.</p>',
            '<li>There is no string in strs that can be rearranged to form <code>&quot;bat&quot;</code>.</li>',
            '<li>The strings <code>&quot;nat&quot;</code> and <code>&quot;tan&quot;</code> are anagrams as they can be rearranged to form each other.</li>',
            '<li>The strings <code>&quot;ate&quot;</code>, <code>&quot;eat&quot;</code>, and <code>&quot;tea&quot;</code> are anagrams as they can be rearranged to form each other.</li>',
        ],
        'vi': [
            '<p>Cho mảng chuỗi <code>strs</code>, hãy nhóm các <span data-keyword="anagram">anagram</span> lại với nhau. Bạn có thể trả về đáp án theo <strong>bất kỳ thứ tự nào</strong>.</p>',
            '<li>Không có chuỗi nào trong strs có thể sắp xếp lại để tạo thành <code>&quot;bat&quot;</code>.</li>',
            '<li>Các chuỗi <code>&quot;nat&quot;</code> và <code>&quot;tan&quot;</code> là anagram vì chúng có thể sắp xếp lại để tạo thành nhau.</li>',
            '<li>Các chuỗi <code>&quot;ate&quot;</code>, <code>&quot;eat&quot;</code> và <code>&quot;tea&quot;</code> là anagram vì chúng có thể sắp xếp lại để tạo thành nhau.</li>',
        ],
    },
    'lc-0036-valid-sudoku': {
        'en': [
            '<p>Determine if a&nbsp;<code>9 x 9</code> Sudoku board&nbsp;is valid.&nbsp;Only the filled cells need to be validated&nbsp;<strong>according to the following rules</strong>:</p>',
            '<li>Each row&nbsp;must contain the&nbsp;digits&nbsp;<code>1-9</code> without repetition.</li>',
            '<li>Each column must contain the digits&nbsp;<code>1-9</code>&nbsp;without repetition.</li>',
            '<li>Each of the nine&nbsp;<code>3 x 3</code> sub-boxes of the grid must contain the digits&nbsp;<code>1-9</code>&nbsp;without repetition.</li>',
            '<li>A Sudoku board (partially filled) could be valid but is not necessarily solvable.</li>',
            '<li>Only the filled cells need to be validated according to the mentioned&nbsp;rules.</li>',
            '<p><strong>Explanation:</strong> Same as Example 1, except with the <strong>5</strong> in the top left corner being modified to <strong>8</strong>. Since there are two 8&#39;s in the top left 3x3 sub-box, it is invalid.</p>',
        ],
        'vi': [
            '<p>Hãy xác định xem bảng Sudoku <code>9 x 9</code> có hợp lệ hay không.&nbsp;Chỉ các ô đã điền mới cần được kiểm tra&nbsp;<strong>theo các quy tắc sau</strong>:</p>',
            '<li>Mỗi hàng&nbsp;phải chứa các chữ số&nbsp;<code>1-9</code> không lặp lại.</li>',
            '<li>Mỗi cột phải chứa các chữ số&nbsp;<code>1-9</code>&nbsp;không lặp lại.</li>',
            '<li>Mỗi ô con <code>3 x 3</code> trong số chín ô của lưới phải chứa các chữ số&nbsp;<code>1-9</code>&nbsp;không lặp lại.</li>',
            '<li>Một bảng Sudoku (điền một phần) có thể hợp lệ nhưng không nhất thiết có lời giải.</li>',
            '<li>Chỉ các ô đã điền mới cần được kiểm tra theo các quy tắc đã nêu.</li>',
            '<p><strong>Giải thích:</strong> Giống Ví dụ 1, ngoại trừ số <strong>5</strong> ở góc trên-trái được đổi thành <strong>8</strong>. Vì có hai số 8 trong ô con 3x3 ở góc trên-trái nên bảng không hợp lệ.</p>',
        ],
    },
    'lc-0128-longest-consecutive-sequence': {
        'en': [
            '<p>Given an unsorted array of integers <code>nums</code>, return <em>the length of the longest consecutive elements sequence.</em></p>',
            '<p>You must write an algorithm that runs in&nbsp;<code>O(n)</code>&nbsp;time.</p>',
        ],
        'vi': [
            '<p>Cho mảng số nguyên chưa sắp xếp <code>nums</code>, hãy trả về <em>độ dài của dãy liên tiếp dài nhất.</em></p>',
            '<p>Bạn phải viết thuật toán chạy trong&nbsp;<code>O(n)</code>&nbsp;thời gian.</p>',
        ],
    },
    'lc-0238-product-of-array-except-self': {
        'en': [
            '<p>Given an integer array <code>nums</code>, return <em>an array</em> <code>answer</code> <em>such that</em> <code>answer[i]</code> <em>is equal to the product of all the numbers of</em> <code>nums</code> <em>except</em> <code>nums[i]</code>.</p>',
            '<p>The product of any prefix or suffix of <code>nums</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</p>',
            '<p>You must write an algorithm that runs in&nbsp;<code>O(n)</code>&nbsp;time and without using the division operation.</p>',
        ],
        'vi': [
            '<p>Cho mảng số nguyên <code>nums</code>, hãy trả về <em>mảng</em> <code>answer</code> <em>sao cho</em> <code>answer[i]</code> <em>bằng tích của tất cả các số trong</em> <code>nums</code> <em>ngoại trừ</em> <code>nums[i]</code>.</p>',
            '<p>Tích của bất kỳ tiền tố hay hậu tố nào của <code>nums</code> được <strong>đảm bảo</strong> vừa trong số nguyên <strong>32-bit</strong>.</p>',
            '<p>Bạn phải viết thuật toán chạy trong&nbsp;<code>O(n)</code>&nbsp;thời gian và không sử dụng phép chia.</p>',
        ],
    },
    'lc-0347-top-k-frequent-elements': {
        'en': [
            '<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <em>the <code>k</code> most frequent elements</em>. You may return the answer in <strong>any order</strong>.</p>',
        ],
        'vi': [
            '<p>Cho mảng số nguyên <code>nums</code> và số nguyên <code>k</code>, hãy trả về <em><code>k</code> phần tử xuất hiện nhiều nhất</em>. Bạn có thể trả về đáp án theo <strong>bất kỳ thứ tự nào</strong>.</p>',
        ],
    },
    'lc-0042-trapping-rain-water': {
        'en': [
            '<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p>',
        ],
        'vi': [
            '<p>Cho <code>n</code> số nguyên không âm biểu diễn bản đồ độ cao, trong đó chiều rộng mỗi cột là <code>1</code>, hãy tính lượng nước có thể giữ lại sau khi mưa.</p>',
        ],
    },
    'lc-0121-best-time-to-buy-and-sell-stoc': {
        'en': [
            '<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>',
            '<p>You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p>',
            '<p>Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.</p>',
        ],
        'vi': [
            '<p>Cho mảng <code>prices</code> trong đó <code>prices[i]</code> là giá của một cổ phiếu vào ngày thứ <code>i</code>.</p>',
            '<p>Bạn muốn tối đa hoá lợi nhuận bằng cách chọn <strong>một ngày</strong> để mua một cổ phiếu và chọn <strong>một ngày khác trong tương lai</strong> để bán cổ phiếu đó.</p>',
            '<p>Hãy trả về <em>lợi nhuận lớn nhất có thể đạt được từ giao dịch này</em>. Nếu không thể đạt lợi nhuận, hãy trả về <code>0</code>.</p>',
        ],
    },
}

def apply_batch1_translation(html: str, pid: str) -> str:
    if pid not in BATCH1_TRANSLATIONS:
        return html
    data = BATCH1_TRANSLATIONS[pid]
    for en, vi in zip(data['en'], data['vi']):
        if en in html:
            html = html.replace(en, vi)
        else:
            # try normalized whitespace compare
            en_norm = re.sub(r'\s+', ' ', en).strip()
            # if not found exact, skip
            pass
    # special followup key
    if 'constraints_followup_vi' in data:
        # replace English followup with VI if present
        en_follow = 'Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code>'
        if en_follow in html:
            html = html.replace(
                'Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face="monospace">&nbsp;</font>time complexity?',
                data['constraints_followup_vi']
            )
    return html

def process_js():
    text = JS_PATH.read_text(encoding='utf-8')
    original = text

    # Find all LEETCODE_CONTENT entries via splitting? We'll process via regex that captures each content block's inner lc-description HTML
    # Approach: iterate over each pid and replace its content's lc-description separately
    # To avoid touching originalContent, we only touch the first occurrence of lc-description after content:
    # Pattern: 'lc-xxx': { ... content: `...<div class=\"lc-description\">HTML</div>...` , originalContent: `...`
    # We'll use a function to replace only inside content (Vietnamese) part.

    # Iterate over each pid found
    pids = re.findall(r"'(lc-[^']+)':", text)
    changed = 0
    batch1_cnt = 0

    for pid in pids:
        # Build pattern to locate Vietnamese content's lc-description
        # Look for "'pid':" then non-greedy to "content: `...<div class=\"lc-description\">(group1)</div>"
        # We need to capture the prefix and suffix to reconstruct
        # Use a regex with DOTALL and lazy
        pattern = re.compile(
            r"('" + re.escape(pid) + r"':\s*\{.*?content:\s*`.*?<div class=\\\"lc-description\\\">)(.*?)(</div>)(.*?originalContent:)",
            re.DOTALL
        )
        m = pattern.search(text)
        if not m:
            continue
        vn_html = m.group(2)
        # Apply transformations
        new_vn = normalize_headings(vn_html)
        # Batch1 extra
        if pid in BATCH1_TRANSLATIONS:
            before = new_vn
            new_vn = apply_batch1_translation(new_vn, pid)
            if new_vn != before:
                batch1_cnt += 1

        if new_vn != vn_html:
            # Replace only this occurrence
            start, end = m.span(2)
            text = text[:start] + new_vn + text[end:]
            changed += 1

    # Also need to ensure heading normalization outside lc-description but inside content still? e.g., <h2> etc already Vietnamese, no need.
    # Write back if changed
    if changed > 0:
        JS_PATH.write_text(text, encoding='utf-8')
        print(f"[JS] Đã chuẩn hoá {changed} bài (trong đó Batch1 dịch trọn vẹn: {batch1_cnt}) tại {JS_PATH}")
    else:
        print("[JS] Không có thay đổi")

    return changed, batch1_cnt

def process_md():
    md_files = glob.glob(DOCS_GLOB, recursive=True)
    changed_files = 0
    batch1_files = 0
    for md_path in md_files:
        p = pathlib.Path(md_path)
        txt = p.read_text(encoding='utf-8')
        orig = txt
        # Only process if contains lc-description
        if 'lc-description' not in txt:
            continue
        # Extract slug from frontmatter
        m_slug = re.search(r'slug:\s*"([^"]+)"', txt)
        pid = m_slug.group(1) if m_slug else None

        # Replace inside lc-description block
        # Find block: <div class="lc-description"> ... </div>
        # Use pattern
        def repl_md(m):
            inner = m.group(1)
            new_inner = normalize_headings(inner)
            if pid and pid in BATCH1_TRANSLATIONS:
                new_inner = apply_batch1_translation(new_inner, pid)
            return f'<div class="lc-description">{new_inner}</div>'

        new_txt = re.sub(r'<div class="lc-description">(.*?)</div>', repl_md, txt, flags=re.DOTALL)
        if new_txt != orig:
            p.write_text(new_txt, encoding='utf-8')
            changed_files += 1
            if pid in BATCH1_TRANSLATIONS:
                batch1_files += 1
    print(f"[MD] Đã chuẩn hoá {changed_files} file markdown (Batch1: {batch1_files})")
    return changed_files

if __name__ == "__main__":
    c1, b1 = process_js()
    c2 = process_md()
    print(f"\nTổng kết: JS {c1} (batch1 {b1}) | MD {c2}")
    print("Hoàn tất. Bản tiếng Anh gốc (originalContent) được giữ nguyên 100%.")
    print("Chuẩn hoá áp dụng: Ví dụ/Đầu vào/Đầu ra/Giải thích/Ràng buộc/Yêu cầu mở rộng/Lưu ý")
