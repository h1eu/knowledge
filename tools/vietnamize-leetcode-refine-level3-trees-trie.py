#!/usr/bin/env python3
"""
Refine Level 3 — Trees (38) + Trie (11) = 49 bài
"""

import pathlib, re, glob
ROOT = pathlib.Path(__file__).parent.parent
JS_PATH = ROOT / "website" / "leetcode-content.js"
DOCS_GLOB = str(ROOT / "leetcode" / "docs" / "**" / "*.md")

VI_PREFIXES = {
    # Trees 38
    'lc-0100-same-tree': """<p>Cho gốc hai cây nhị phân <code>p</code> và <code>q</code>, hãy kiểm tra chúng có giống nhau không (cấu trúc và giá trị node đều bằng nhau).</p>

<p>&nbsp;</p>""",
    'lc-0101-symmetric-tree': """<p>Cho gốc cây nhị phân <code>root</code>, hãy kiểm tra cây có đối xứng qua trục giữa không (gương).</p>

<p>&nbsp;</p>""",
    'lc-0102-binary-tree-level-order-traver': """<p>Cho gốc cây nhị phân <code>root</code>, hãy trả về duyệt theo mức (level order) — các node theo từng tầng từ trái sang phải.</p>

<p>&nbsp;</p>""",
    'lc-0103-binary-tree-zigzag-level-order': """<p>Cho gốc cây nhị phân, hãy trả về duyệt zigzag theo mức: mức 0 trái→phải, mức 1 phải→trái, xen kẽ.</p>

<p>&nbsp;</p>""",
    'lc-0104-maximum-depth-of-binary-tree': """<p>Cho gốc cây nhị phân <code>root</code>, hãy trả về độ sâu tối đa (số node trên đường dài nhất từ gốc tới lá).</p>

<p>&nbsp;</p>""",
    'lc-0105-construct-binary-tree-from-pre': """<p>Cho hai mảng <code>preorder</code> và <code>inorder</code> của cây nhị phân, hãy xây dựng và trả về cây gốc. Giả định không có giá trị trùng.</p>

<p>&nbsp;</p>""",
    'lc-0106-construct-binary-tree-from-ino': """<p>Cho hai mảng <code>inorder</code> và <code>postorder</code> của cây nhị phân, hãy xây dựng và trả về cây gốc.</p>

<p>&nbsp;</p>""",
    'lc-0107-binary-tree-level-order-traver': """<p>Cho gốc cây nhị phân, hãy trả về duyệt theo mức từ dưới lên (bottom-up level order).</p>

<p>&nbsp;</p>""",
    'lc-0108-convert-sorted-array-to-binary': """<p>Cho mảng số nguyên <code>nums</code> đã sắp xếp tăng dần, hãy chuyển thành cây tìm kiếm nhị phân <strong>cân bằng chiều cao (height-balanced)</strong>.</p>

<p>&nbsp;</p>""",
    'lc-0110-balanced-binary-tree': """<p>Cho gốc cây nhị phân, hãy xác định cây có cân bằng chiều cao không (độ sâu hai cây con của mọi node chênh lệch không quá 1).</p>

<p>&nbsp;</p>""",
    'lc-0112-path-sum': """<p>Cho gốc cây nhị phân <code>root</code> và số nguyên <code>targetSum</code>, hãy trả về <code>true</code> nếu tồn tại đường đi từ gốc tới lá có tổng bằng <code>targetSum</code>.</p>

<p>&nbsp;</p>""",
    'lc-0113-path-sum-ii': """<p>Cho gốc cây nhị phân và số nguyên <code>targetSum</code>, hãy trả về tất cả các đường đi gốc→lá có tổng bằng <code>targetSum</code>.</p>

<p>&nbsp;</p>""",
    'lc-0116-populating-next-right-pointers': """<p>Cho cây nhị phân hoàn hảo (perfect binary tree) với mỗi node có thêm con trỏ <code>next</code>, hãy nối mỗi node tới node kế tiếp bên phải trên cùng mức. Nếu không có thì <code>next = null</code>.</p>

<p>&nbsp;</p>""",
    'lc-0117-populating-next-right-pointers': """<p>Cho cây nhị phân bất kỳ (không nhất thiết hoàn hảo) với con trỏ <code>next</code>, hãy nối mỗi node tới node kế tiếp bên phải trên cùng mức.</p>

<p>&nbsp;</p>""",
    'lc-0124-binary-tree-maximum-path-sum': """<p>Cho gốc cây nhị phân <code>root</code>, đường đi là dãy node liên tiếp qua cạnh cha-con, mỗi node chỉ xuất hiện một lần. Hãy tìm đường đi có tổng lớn nhất (không nhất thiết qua gốc).</p>

<p>&nbsp;</p>""",
    'lc-0129-sum-root-to-leaf-numbers': """<p>Cho gốc cây nhị phân với mỗi node chứa chữ số <code>0-9</code>, mỗi đường gốc→lá tạo thành một số. Hãy trả về tổng của tất cả các số đó.</p>

<p>&nbsp;</p>""",
    'lc-0144-binary-tree-preorder-traversal': """<p>Cho gốc cây nhị phân <code>root</code>, hãy trả về duyệt <strong>tiền thứ tự (preorder)</strong> của các giá trị node.</p>

<p>&nbsp;</p>""",
    'lc-0145-binary-tree-postorder-traversa': """<p>Cho gốc cây nhị phân <code>root</code>, hãy trả về duyệt <strong>hậu thứ tự (postorder)</strong>.</p>

<p>&nbsp;</p>""",
    'lc-0199-binary-tree-right-side-view': """<p>Cho gốc cây nhị phân <code>root</code>, hãy trả về các giá trị nhìn thấy từ phía phải (node phải nhất mỗi mức).</p>

<p>&nbsp;</p>""",
    'lc-0222-count-complete-tree-nodes': """<p>Cho gốc cây nhị phân <strong>hoàn chỉnh (complete)</strong> <code>root</code>, hãy đếm số node. Yêu cầu thời gian tốt hơn <code>O(n)</code>.</p>

<p>&nbsp;</p>""",
    'lc-0226-invert-binary-tree': """<p>Cho gốc cây nhị phân <code>root</code>, hãy đảo ngược cây (đổi chỗ cây con trái/phải của mọi node) và trả về gốc mới.</p>

<p>&nbsp;</p>""",
    'lc-0230-kth-smallest-element-in-a-bst': """<p>Cho gốc cây tìm kiếm nhị phân (BST) <code>root</code> và số nguyên <code>k</code>, hãy trả về phần tử nhỏ thứ <code>k</code> (1-indexed) trong BST.</p>

<p>&nbsp;</p>""",
    'lc-0235-lowest-common-ancestor-of-a-bi': """<p>Cho BST và hai node <code>p</code>, <code>q</code>, hãy tìm tổ tiên chung thấp nhất (LCA) của chúng.</p>

<p>&nbsp;</p>""",
    'lc-0236-lowest-common-ancestor-of-a-bi': """<p>Cho cây nhị phân thường (không phải BST) và hai node <code>p</code>, <code>q</code>, hãy tìm tổ tiên chung thấp nhất (LCA).</p>

<p>&nbsp;</p>""",
    'lc-0257-binary-tree-paths': """<p>Cho gốc cây nhị phân <code>root</code>, hãy trả về tất cả các đường đi gốc→lá, mỗi đường biểu diễn dạng <code>"1-&gt;2-&gt;5"</code>.</p>

<p>&nbsp;</p>""",
    'lc-0297-serialize-and-deserialize-bina': """<p>Thiết kế thuật toán tuần tự hóa (serialize) và giải tuần tự (deserialize) cây nhị phân. Không giới hạn cách biểu diễn, chỉ cần đảm bảo cây sau khi deserialize giống cây gốc.</p>

<p>&nbsp;</p>""",
    'lc-0404-sum-of-left-leaves': """<p>Cho gốc cây nhị phân <code>root</code>, hãy trả về tổng của tất cả các <strong>lá trái</strong> (node lá là con trái của cha).</p>

<p>&nbsp;</p>""",
    'lc-0450-delete-node-in-a-bst': """<p>Cho gốc BST <code>root</code> và khóa <code>key</code>, hãy xóa node có giá trị <code>key</code> (nếu tồn tại) và đảm bảo BST vẫn hợp lệ, trả về gốc mới.</p>

<p>&nbsp;</p>""",
    'lc-0543-diameter-of-binary-tree': """<p>Cho gốc cây nhị phân <code>root</code>, hãy trả về <strong>đường kính</strong> của cây — độ dài đường đi dài nhất giữa hai node bất kỳ (tính bằng số cạnh).</p>

<p>&nbsp;</p>""",
    'lc-0572-subtree-of-another-tree': """<p>Cho gốc hai cây <code>root</code> và <code>subRoot</code>, hãy trả về <code>true</code> nếu <code>subRoot</code> là cây con của <code>root</code>.</p>

<p>&nbsp;</p>""",
    'lc-0589-n-ary-tree-preorder-traversal': """<p>Cho gốc cây N-ary <code>root</code>, hãy trả về duyệt tiền thứ tự.</p>

<p>&nbsp;</p>""",
    'lc-0590-n-ary-tree-postorder-traversal': """<p>Cho gốc cây N-ary <code>root</code>, hãy trả về duyệt hậu thứ tự.</p>

<p>&nbsp;</p>""",
    'lc-0662-maximum-width-of-binary-tree': """<p>Cho gốc cây nhị phân <code>root</code>, hãy trả về <strong>chiều rộng lớn nhất</strong> của cây (khoảng cách giữa node trái nhất và phải nhất mỗi mức, tính cả vị trí null ở giữa).</p>

<p>&nbsp;</p>""",
    'lc-0701-insert-into-a-binary-search-tr': """<p>Cho gốc BST <code>root</code> và giá trị <code>val</code>, hãy chèn <code>val</code> vào BST sao cho BST vẫn hợp lệ và trả về gốc.</p>

<p>&nbsp;</p>""",
    'lc-0094-binary-tree-inorder-traversal': """<p>Cho gốc cây nhị phân <code>root</code>, hãy trả về duyệt <strong>trung thứ tự (inorder)</strong>.</p>

<p>&nbsp;</p>""",
    'lc-0958-check-completeness-of-a-binary': """<p>Cho gốc cây nhị phân <code>root</code>, hãy kiểm tra cây có phải <strong>complete</strong> không (mọi mức trừ mức cuối đều đầy, mức cuối lấp từ trái sang).</p>

<p>&nbsp;</p>""",
    'lc-0098-validate-binary-search-tree': """<p>Cho gốc cây nhị phân <code>root</code>, hãy xác định có phải là BST hợp lệ không (cây con trái mọi node &lt; node &lt; cây con phải).</p>

<p>&nbsp;</p>""",
    'lc-0987-vertical-order-traversal-of-a-': """<p>Cho gốc cây nhị phân, hãy trả về duyệt theo cột dọc (vertical order): sắp xếp theo cột, rồi theo hàng, nếu cùng vị trí thì theo giá trị.</p>

<p>&nbsp;</p>""",
    # Trie 11
    'lc-1032-stream-of-characters': """<p>Thiết kế cấu trúc kiểm tra luồng ký tự: cho danh sách từ <code>words</code>, với mỗi ký tự mới <code>query(letter)</code> được thêm vào cuối luồng, hãy trả về <code>true</code> nếu bất kỳ từ nào trong <code>words</code> là hậu tố của luồng.</p>

<p>&nbsp;</p>""",
    'lc-1707-maximum-xor-with-an-element-fr': """<p>Cho mảng <code>nums</code> và các truy vấn <code>queries[i] = [xi, mi]</code>, với mỗi truy vấn hãy tìm giá trị <code>xi XOR yi</code> lớn nhất với <code>yi</code> trong <code>nums</code> và <code>yi ≤ mi</code>, nếu không có thì <code>-1</code>.</p>

<p>&nbsp;</p>""",
    'lc-0208-implement-trie-prefix-tree': """<p>Hiện thực Trie (cây tiền tố) với các thao tác <code>insert(word)</code>, <code>search(word)</code>, <code>startsWith(prefix)</code>.</p>

<p>&nbsp;</p>""",
    'lc-0211-design-add-and-search-words-da': """<p>Thiết kế cấu trúc hỗ trợ thêm từ và tìm kiếm với ký tự đại diện <code>'.'</code> (khớp bất kỳ chữ cái nào). Hiện thực <code>WordDictionary</code> với <code>addWord</code> và <code>search</code>.</p>

<p>&nbsp;</p>""",
    'lc-0212-word-search-ii': """<p>Cho bảng <code>m x n</code> <code>board</code> và danh sách từ <code>words</code>, hãy trả về tất cả từ có thể tạo bằng cách nối các ô kề nhau (mỗi ô dùng tối đa một lần).</p>

<p>&nbsp;</p>""",
    'lc-0421-maximum-xor-of-two-numbers-in-': """<p>Cho mảng số nguyên <code>nums</code>, hãy tìm giá trị <code>xor</code> lớn nhất của hai số bất kỳ trong mảng.</p>

<p>&nbsp;</p>""",
    'lc-0472-concatenated-words': """<p>Cho mảng chuỗi <code>words</code> không trùng, hãy trả về tất cả từ ghép (concatenated) — từ được tạo bằng cách nối ít nhất hai từ ngắn hơn khác trong mảng.</p>

<p>&nbsp;</p>""",
    'lc-0648-replace-words': """<p>Cho từ điển <code>dictionary</code> (các gốc từ) và câu <code>sentence</code>, hãy thay thế mỗi từ trong câu bằng gốc ngắn nhất trong từ điển mà nó bắt đầu bằng gốc đó. Nếu không có, giữ nguyên.</p>

<p>&nbsp;</p>""",
    'lc-0677-map-sum-pairs': """<p>Thiết kế <code>MapSum</code> hỗ trợ <code>insert(key, val)</code> (ghi đè nếu tồn tại) và <code>sum(prefix)</code> trả về tổng giá trị của mọi key có tiền tố <code>prefix</code>.</p>

<p>&nbsp;</p>""",
    'lc-0720-longest-word-in-dictionary': """<p>Cho mảng chuỗi <code>words</code>, hãy tìm từ dài nhất trong <code>words</code> sao cho mọi tiền tố của nó cũng nằm trong <code>words</code>. Nếu có nhiều, trả về từ nhỏ nhất theo thứ tự từ điển.</p>

<p>&nbsp;</p>""",
    'lc-0745-prefix-and-suffix-search': """<p>Thiết kế <code>WordFilter</code> với <code>WordFilter(words)</code> và <code>f(prefix, suffix)</code> trả về chỉ số lớn nhất của từ có tiền tố <code>prefix</code> và hậu tố <code>suffix</code>, nếu không có thì <code>-1</code>.</p>

<p>&nbsp;</p>""",
}

def process_js():
    text = JS_PATH.read_text(encoding='utf-8')
    changed = 0
    for pid, vi_prefix in VI_PREFIXES.items():
        # Cần xử lý duplicate slug: có 2 pid giống nhau cho 0235/0236 nhưng map có 2 file trùng slug đã truncated giống hệt
        # Với 0235/0236 cả hai đều có slug lc-0235-lowest-common-ancestor-of-a-bi và lc-0236... nhưng truncated giống nhau? Thực tế map có 2 entries khác nhau nhưng js có thể có 2 key khác nhau với suffix? Kiểm tra js có duplicate không
        # Ta thử tìm tất cả occurrences
        pattern = re.compile(r"('" + re.escape(pid) + r"':\s*\{.*?content:\s*`.*?<div class=\\\"lc-description\\\">)(.*?)(<p><strong class=\"example\">Ví dụ)", re.DOTALL)
        m = pattern.search(text)
        if not m:
            pattern2 = re.compile(r"('" + re.escape(pid) + r"':\s*\{.*?content:\s*`.*?<div class=\\\"lc-description\\\">)(.*?)(<p><strong class=\"example\">)", re.DOTALL)
            m = pattern2.search(text)
            if not m:
                # Thử tìm không phân biệt pid chính xác, vì JS có thể có 2 key với cùng prefix nhưng khác suffix do truncated collision
                # Fallback: tìm tất cả content có pid chứa prefix
                continue
        start, end = m.span(2)
        text = text[:start] + vi_prefix + text[end:]
        changed += 1
        # Nếu có duplicate (ví dụ 0235 và 0236 cùng truncated), cần thay cả 2 occurrences
        # Tìm occurrence thứ 2
        m2 = pattern.search(text, end + len(vi_prefix))
        if m2 and pid in ['lc-0235-lowest-common-ancestor-of-a-bi','lc-0236-lowest-common-ancestor-of-a-bi']:
            # Sẽ xử lý ở vòng lặp riêng cho pid kia, nhưng vì slug truncated giống nhau, ta cần ensure cả 2 được thay
            pass
    if changed:
        JS_PATH.write_text(text, encoding='utf-8')
        print(f"[JS] Level3 Trees/Trie đã thay {changed}/{len(VI_PREFIXES)}")
    return changed

def process_md():
    changed = 0
    for md_path in glob.glob(DOCS_GLOB, recursive=True):
        p = pathlib.Path(md_path)
        if "level_03" not in str(p):
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
    print(f"[MD] Level3 Trees/Trie đã thay {changed}")
    return changed

if __name__ == "__main__":
    c1 = process_js()
    c2 = process_md()
    print(f"Tổng Level3 Trees/Trie: JS {c1} | MD {c2}")
