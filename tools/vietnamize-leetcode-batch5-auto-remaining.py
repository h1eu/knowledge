#!/usr/bin/env python3
"""
Batch 5: Auto-dịch toàn bộ phần còn lại (Level 2-5) ~335 bài
- Dùng chung PHRASE_MAP từ batch4
- Áp dụng cho mọi pid còn chứa English prefix (Given / You are given / Return)
- Đảm bảo toàn bộ 460 bài đều có mô tả tiếng Việt, Level 1 đã manual chất lượng cao, Level 2-5 auto (có thể tinh chỉnh thủ công sau)
"""

import pathlib, re, glob

ROOT = pathlib.Path(__file__).parent.parent
JS_PATH = ROOT / "website" / "leetcode-content.js"
DOCS_GLOB = str(ROOT / "leetcode" / "docs" / "**" / "*.md")

PHRASE_MAP = [
    ("You are given an array of integers", "Cho mảng số nguyên"),
    ("You are given an array", "Cho mảng"),
    ("You are given a string", "Cho chuỗi"),
    ("You are given two strings", "Cho hai chuỗi"),
    ("You are given", "Cho"),
    ("Given an integer array", "Cho mảng số nguyên"),
    ("Given an array of integers", "Cho mảng số nguyên"),
    ("Given an array of strings", "Cho mảng chuỗi"),
    ("Given an array", "Cho mảng"),
    ("Given a string", "Cho chuỗi"),
    ("Given two strings", "Cho hai chuỗi"),
    ("Given an integer", "Cho số nguyên"),
    ("Given two integers", "Cho hai số nguyên"),
    ("Given the array", "Cho mảng"),
    ("Given the string", "Cho chuỗi"),
    ("Given a non-empty array", "Cho mảng không rỗng"),
    ("Given a linked list", "Cho danh sách liên kết"),
    ("Given an unsorted array", "Cho mảng chưa sắp xếp"),
    ("Given a sorted array", "Cho mảng đã sắp xếp"),
    ("Given a binary tree", "Cho cây nhị phân"),
    ("Given the root of a binary tree", "Cho gốc của cây nhị phân"),
    ("Given the head of a linked list", "Cho đầu của danh sách liên kết"),
    ("Given a graph", "Cho đồ thị"),
    ("Given n non-negative integers", "Cho n số nguyên không âm"),
    ("Given an m x n matrix", "Cho ma trận m x n"),
    ("Given an m x n board", "Cho bảng m x n"),
    ("return the length of", "hãy trả về độ dài của"),
    ("return the number of", "hãy trả về số lượng"),
    ("return the index of", "hãy trả về chỉ số của"),
    ("return an array", "hãy trả về mảng"),
    ("return true if", "hãy trả về true nếu"),
    ("return false if", "hãy trả về false nếu"),
    ("return", "hãy trả về"),
    ("Return", "Hãy trả về"),
    ("You may assume", "Bạn có thể giả định"),
    ("You can return the answer in any order", "Bạn có thể trả về đáp án theo bất kỳ thứ tự nào"),
    ("You must write an algorithm", "Bạn phải viết thuật toán"),
    ("in O(n) time", "trong thời gian O(n)"),
    ("in O(log n) time", "trong thời gian O(log n)"),
    ("without using extra space", "không dùng thêm bộ nhớ phụ"),
    ("without repetition", "không lặp lại"),
    ("at least", "ít nhất"),
    ("at most", "nhiều nhất"),
    ("the longest", "dài nhất"),
    ("the smallest", "nhỏ nhất"),
    ("the largest", "lớn nhất"),
    ("consecutive", "liên tiếp"),
    ("distinct", "khác nhau"),
    ("non-empty", "không rỗng"),
    ("sorted", "đã sắp xếp"),
    ("ascending order", "thứ tự tăng dần"),
]

WORD_MAP = {
    "Given": "Cho", "array": "mảng", "Array": "Mảng", "string": "chuỗi", "String": "Chuỗi",
    "integer": "số nguyên", "integers": "số nguyên", "number": "số", "numbers": "số",
    "element": "phần tử", "elements": "phần tử", "length": "độ dài", "index": "chỉ số",
    "target": "mục tiêu", "contains": "chứa", "duplicate": "trùng lặp", "unique": "khác nhau",
    "substring": "chuỗi con", "subarray": "mảng con", "matrix": "ma trận", "linked": "liên kết",
    "list": "danh sách", "tree": "cây", "graph": "đồ thị", "board": "bảng", "interval": "khoảng",
    "maximum": "lớn nhất", "minimum": "nhỏ nhất", "average": "trung bình", "sum": "tổng",
    "product": "tích", "character": "ký tự", "characters": "ký tự",
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
    pids = re.findall(r"'(lc-[^']+)':", text)
    changed = 0
    for pid in pids:
        pattern = re.compile(r"('" + re.escape(pid) + r"':\s*\{.*?content:\s*`.*?<div class=\\\"lc-description\\\">)(.*?)(<p><strong class=\"example\">Ví dụ)", re.DOTALL)
        m = pattern.search(text)
        if not m:
            pattern2 = re.compile(r"('" + re.escape(pid) + r"':\s*\{.*?content:\s*`.*?<div class=\\\"lc-description\\\">)(.*?)(<p><strong class=\"example\">)", re.DOTALL)
            m = pattern2.search(text)
            if not m:
                continue
        vn_prefix = m.group(2)
        if "Given" in vn_prefix or "You are given" in vn_prefix or "Design a" in vn_prefix or "Suppose" in vn_prefix:
            new_prefix = auto_vietnamize_html(vn_prefix)
            if new_prefix != vn_prefix:
                start, end = m.span(2)
                text = text[:start] + new_prefix + text[end:]
                changed += 1
    if changed:
        JS_PATH.write_text(text, encoding='utf-8')
        print(f"[JS] Batch5 auto-dịch {changed} bài còn lại")
    else:
        print("[JS] Batch5 không có thay đổi")
    return changed

def process_md():
    md_files = glob.glob(DOCS_GLOB, recursive=True)
    changed = 0
    for md_path in md_files:
        p = pathlib.Path(md_path)
        txt = p.read_text(encoding='utf-8')
        m_slug = re.search(r'slug:\s*"([^"]+)"', txt)
        if not m_slug:
            continue
        pattern = re.compile(r'(<div class="lc-description">)(.*?)(<p><strong class="example">Ví dụ)', re.DOTALL)
        m = pattern.search(txt)
        if not m:
            pattern2 = re.compile(r'(<div class="lc-description">)(.*?)(<p><strong class="example">)', re.DOTALL)
            m = pattern2.search(txt)
            if not m:
                continue
        vn_prefix = m.group(2)
        if "Given" in vn_prefix or "You are given" in vn_prefix or "Design a" in vn_prefix or "Suppose" in vn_prefix:
            new_prefix = auto_vietnamize_html(vn_prefix)
            if new_prefix != vn_prefix:
                start, end = m.span(2)
                new_txt = txt[:start] + new_prefix + txt[end:]
                p.write_text(new_txt, encoding='utf-8')
                changed += 1
    print(f"[MD] Batch5 auto-dịch {changed} files")
    return changed

if __name__ == "__main__":
    c1 = process_js()
    c2 = process_md()
    print(f"Tổng Batch5: JS {c1} | MD {c2}")
    # Final check
    js = JS_PATH.read_text(encoding='utf-8')
    total = len(re.findall(r"'(lc-[^']+)':", js))
    vi_examples = js.count("Ví dụ")
    print(f"Tổng 460 bài — Ví dụ heading: {vi_examples} | Tổng entries: {total}")
    # Count remaining English Given in content
    remaining_en = 0
    for pid in re.findall(r"'(lc-[^']+)':", js):
        pat = re.compile(r"'" + re.escape(pid) + r"':.*?content:\s*`.*?<div class=\\\"lc-description\\\">(.*?)<p><strong class=\"example\">Ví dụ", re.DOTALL)
        m = pat.search(js)
        if m and "Given" in m.group(1):
            remaining_en += 1
    print(f"Còn English 'Given' trong prefix content: {remaining_en} (lý tưởng 0)")
