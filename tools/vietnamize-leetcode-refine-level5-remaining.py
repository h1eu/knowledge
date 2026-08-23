#!/usr/bin/env python3
"""
Refine Level 5 remaining 85 — Bit Manipulation (16) + Greedy (18) + Hard Mix (27) + Math & Geometry (24) = 85
Dùng auto-heuristic nâng cao (đã cải thiện phrase map) để đảm bảo toàn bộ 460 đều có tiếng Việt, Level 1-4 manual (318) + Level5 1D2D 57 manual, còn lại 85 auto (có thể tinh chỉnh sau)
"""

import pathlib, re, glob
ROOT = pathlib.Path(__file__).parent.parent
JS_PATH = ROOT / "website" / "leetcode-content.js"
DOCS_GLOB = str(ROOT / "leetcode" / "docs" / "**" / "*.md")

# Lấy danh sách Level5 remaining 85
import pathlib as _p
map_text = _p.Path(ROOT / "map" / "leetcode_mkdocs.yml").read_text()
import re as _re
lvl5 = _re.search(r"Level 5 — DP & Math.*", map_text, _re.DOTALL).group(0)
all_pids = _re.findall(r"level_05/[^/]+/(lc-[^\.]+)\.md", lvl5)
done_1d2d = [
'lc-0139-word-break','lc-0140-word-break-ii','lc-0152-maximum-product-subarray','lc-0198-house-robber','lc-0213-house-robber-ii','lc-0300-longest-increasing-subsequence','lc-0322-coin-change','lc-0368-largest-divisible-subset','lc-0376-wiggle-subsequence','lc-0377-combination-sum-iv','lc-0045-jump-game-ii','lc-0005-longest-palindromic-substring','lc-0509-fibonacci-number','lc-0516-longest-palindromic-subsequenc','lc-0053-maximum-subarray','lc-0055-jump-game','lc-0646-maximum-length-of-pair-chain','lc-0647-palindromic-substrings','lc-0650-longest-palindromic-subsequenc','lc-0673-number-of-longest-increasing-s','lc-0070-climbing-stairs','lc-0740-delete-and-earn','lc-0746-min-cost-climbing-stairs','lc-0091-decode-ways','lc-0918-maximum-sum-circular-subarray',
'lc-0010-regular-expression-matching','lc-1049-last-stone-weight-ii','lc-1092-shortest-common-supersequence','lc-1143-longest-common-subsequence','lc-0115-distinct-subsequences','lc-0120-triangle','lc-1312-minimum-insertion-steps-to-mak','lc-1463-cherry-pickup-ii','lc-0221-maximal-square-1','lc-0312-burst-balloons','lc-0329-longest-increasing-path-in-a-m','lc-0354-russian-doll-envelopes','lc-0416-partition-equal-subset-sum','lc-0044-wildcard-matching','lc-0474-ones-and-zeroes','lc-0494-target-sum','lc-0005-longest-palindromic-substring-1','lc-0516-longest-palindromic-subsequenc-1','lc-0546-remove-boxes','lc-0583-delete-operation-for-two-strin','lc-0062-unique-paths-1','lc-0063-unique-paths-ii','lc-0064-minimum-path-sum-1','lc-0647-palindromic-substrings-1','lc-0664-strange-printer','lc-0072-edit-distance','lc-0730-count-different-palindromic-su','lc-0741-cherry-pickup','lc-0879-profitable-schemes','lc-0956-tallest-billboard','lc-0096-unique-binary-search-trees','lc-0097-interleaving-string'
]
REMAINING = [p for p in all_pids if p not in done_1d2d]

PHRASE_MAP = [
    ("You are given an array of integers", "Cho mảng số nguyên"),
    ("You are given an array", "Cho mảng"),
    ("You are given", "Cho"),
    ("Given an integer array", "Cho mảng số nguyên"),
    ("Given an array of integers", "Cho mảng số nguyên"),
    ("Given an array", "Cho mảng"),
    ("Given a string", "Cho chuỗi"),
    ("Given two strings", "Cho hai chuỗi"),
    ("Given an integer", "Cho số nguyên"),
    ("Given a binary tree", "Cho cây nhị phân"),
    ("Given the root of a binary tree", "Cho gốc cây nhị phân"),
    ("Design a data structure", "Thiết kế cấu trúc dữ liệu"),
    ("Design an algorithm", "Thiết kế thuật toán"),
    ("return the length of", "hãy trả về độ dài"),
    ("return the number of", "hãy trả về số lượng"),
    ("return", "hãy trả về"),
    ("Return", "Hãy trả về"),
    ("You may assume", "Bạn có thể giả định"),
    ("You must write an algorithm", "Bạn phải viết thuật toán"),
    ("in O(n) time", "trong thời gian O(n)"),
    ("without using extra space", "không dùng thêm bộ nhớ"),
    ("at least", "ít nhất"),
    ("at most", "nhiều nhất"),
    ("the longest", "dài nhất"),
    ("the smallest", "nhỏ nhất"),
    ("consecutive", "liên tiếp"),
    ("distinct", "khác nhau"),
    ("sorted", "đã sắp xếp"),
]

WORD_MAP = {
    "Given": "Cho", "array": "mảng", "string": "chuỗi", "integer": "số nguyên", "number": "số",
    "element": "phần tử", "length": "độ dài", "index": "chỉ số", "target": "mục tiêu",
    "contains": "chứa", "duplicate": "trùng", "unique": "khác nhau", "substring": "chuỗi con",
    "subarray": "mảng con", "matrix": "ma trận", "linked": "liên kết", "list": "danh sách",
    "tree": "cây", "graph": "đồ thị", "board": "bảng", "maximum": "lớn nhất", "minimum": "nhỏ nhất",
    "sum": "tổng", "product": "tích", "character": "ký tự",
}

def auto_vietnamize_html(html_prefix: str) -> str:
    parts = re.split(r'(<code>.*?</code>)', html_prefix, flags=re.DOTALL)
    result_parts = []
    for part in parts:
        if part.startswith('<code>'):
            result_parts.append(part)
        else:
            translated = part
            for en, vi in sorted(PHRASE_MAP, key=lambda x: len(x[0]), reverse=True):
                if en in translated:
                    translated = translated.replace(en, vi)
            subparts = re.split(r'(<[^>]+>)', translated)
            for j, sp in enumerate(subparts):
                if sp.startswith('<'):
                    continue
                for en_w, vi_w in WORD_MAP.items():
                    sp = re.sub(r'\b' + re.escape(en_w) + r'\b', vi_w, sp)
                subparts[j] = sp
            translated = ''.join(subparts)
            result_parts.append(translated)
    return ''.join(result_parts)

def process_js():
    text = JS_PATH.read_text(encoding='utf-8')
    changed = 0
    for pid in REMAINING:
        pattern = re.compile(r"('" + re.escape(pid) + r"':\s*\{.*?content:\s*`.*?<div class=\\\"lc-description\\\">)(.*?)(<p><strong class=\"example\">Ví dụ)", re.DOTALL)
        m = pattern.search(text)
        if not m:
            pattern2 = re.compile(r"('" + re.escape(pid) + r"':\s*\{.*?content:\s*`.*?<div class=\\\"lc-description\\\">)(.*?)(<p><strong class=\"example\">)", re.DOTALL)
            m = pattern2.search(text)
            if not m:
                continue
        vn_prefix = m.group(2)
        # Only auto if still contains English Given/Design
        if "Given" in vn_prefix or "You are given" in vn_prefix or "Design" in vn_prefix or "Suppose" in vn_prefix:
            new_prefix = auto_vietnamize_html(vn_prefix)
            if new_prefix != vn_prefix:
                start, end = m.span(2)
                text = text[:start] + new_prefix + text[end:]
                changed += 1
    if changed:
        JS_PATH.write_text(text, encoding='utf-8')
        print(f"[JS] Level5 remaining auto {changed}/{len(REMAINING)}")
    else:
        print("[JS] Level5 remaining no change (đã VI)")
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
        if pid not in REMAINING:
            continue
        pattern = re.compile(r'(<div class="lc-description">)(.*?)(<p><strong class="example">Ví dụ)', re.DOTALL)
        m = pattern.search(txt)
        if not m:
            pattern2 = re.compile(r'(<div class="lc-description">)(.*?)(<p><strong class="example">)', re.DOTALL)
            m = pattern2.search(txt)
            if not m:
                continue
        vn_prefix = m.group(2)
        if "Given" in vn_prefix or "You are given" in vn_prefix or "Design" in vn_prefix:
            new_prefix = auto_vietnamize_html(vn_prefix)
            if new_prefix != vn_prefix:
                start, end = m.span(2)
                new_txt = txt[:start] + new_prefix + txt[end:]
                p.write_text(new_txt, encoding='utf-8')
                changed += 1
    print(f"[MD] Level5 remaining auto {changed}")
    return changed

if __name__ == "__main__":
    print(f"Remaining Level5: {len(REMAINING)}")
    c1 = process_js()
    c2 = process_md()
    print(f"Tổng Level5 remaining: JS {c1} | MD {c2}")
    # Final verification
    js = JS_PATH.read_text(encoding='utf-8')
    total = len(re.findall(r"'(lc-[^']+)':", js))
    print(f"Total entries now: {total}")
    # Check Given remaining in all levels
    remaining_en = 0
    for pid in re.findall(r"'(lc-[^']+)':", js):
        pat = re.compile(r"'" + re.escape(pid) + r"':.*?content:\s*`.*?<div class=\\\"lc-description\\\">(.*?)<p><strong class=\"example\">Ví dụ", re.DOTALL)
        m = pat.search(js)
        if m and "Given" in m.group(1):
            remaining_en += 1
    print(f"Remaining English Given in prefix (all levels): {remaining_en}")
