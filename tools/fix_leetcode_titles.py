#!/usr/bin/env python3
"""Chuẩn hóa tiêu đề bài học LeetCode theo tên chính thức từ problems.json.

Sửa đồng bộ 4 nơi cho từng bài:
  1. Frontmatter markdown : title + summary (regen đúng format chuẩn)
  2. Heading H1           : # <id>. <tên chính thức>
  3. map/leetcode_mkdocs.yml : nhãn nav
  4. website/leetcode-content.js : title + summary của entry

Format summary chuẩn: "<Pattern> • Level <n> • <Difficulty> — <Title> (LeetCode <id>)"
Chạy: python3 tools/fix_leetcode_titles.py
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "leetcode" / "docs"

problems = {p["id"]: p for p in json.loads((ROOT / "leetcode/data/problems.json").read_text(encoding="utf-8"))["problems"]}

def esc_js(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

def must_replace(text, old, new, count, label):
    found = text.count(old)
    if found != count:
        raise SystemExit(f"FAIL [{label}]: tìm thấy {found} thay vì {count} lần cho: {old[:70]!r}")
    return text.replace(old, new)

# ── 1. Sửa markdown, thu thập mapping ───────────────────────────────
title_map = {}   # old_full -> new_full
summary_fixes = []  # (path, new_summary_line)
md_updates = []

for path in sorted(DOCS.rglob("*.md")):
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        continue
    fm = m.group(1)

    def field(key):
        mm = re.search(rf'^{key}:\s*"?(.*?)"?\s*$', fm, re.MULTILINE)
        return mm.group(1).strip() if mm else None

    old_title = field("title")
    lc_id_raw = field("leetcode_id")
    if not old_title or not lc_id_raw or not lc_id_raw.isdigit():
        continue
    lc_id = int(lc_id_raw)
    if lc_id not in problems:
        continue
    official = problems[lc_id]["title"].strip()
    old_clean = re.sub(r"^\d+\.\s*", "", old_title)
    if old_clean == official:
        continue

    new_title = f"{lc_id}. {official}"
    pattern, level, difficulty = field("pattern"), field("level"), field("difficulty")
    new_summary = f"{pattern} • Level {level} • {difficulty} — {official} (LeetCode {lc_id})"
    old_summary = field("summary")

    # a. frontmatter title
    text = must_replace(text, f'title: "{old_title}"', f'title: "{new_title}"', 1, f"title {path.name}")
    # b. H1
    text = must_replace(text, f"# {old_title}\n", f"# {new_title}\n", 1, f"h1 {path.name}")
    # c. summary (regen)
    text = must_replace(text, f'summary: "{old_summary}"', f'summary: "{new_summary}"', 1, f"summary {path.name}")

    md_updates.append((path, text))
    title_map.setdefault(f"{old_title}", f"{new_title}")
    summary_fixes.append((old_summary, new_summary))

for path, text in md_updates:
    path.write_text(text, encoding="utf-8")
print(f"Markdown: đã cập nhật {len(md_updates)} file")

# ── 2. Nav mkdocs: thay nhãn theo đường dẫn file ────────────────────
nav_path = ROOT / "map/leetcode_mkdocs.yml"
yml = nav_path.read_text(encoding="utf-8")
nav_count = 0
for old_full, new_full in title_map.items():
    # nhãn nav trùng nhau ở nhiều dòng (bài lặp nhiều pattern) -> thay tất cả
    yml_new = yml.replace(f"- {old_full}:", f"- {new_full}:")
    nav_count += (len(yml) - len(yml_new)) // max(len(old_full) - len(new_full), 1) if False else 0
    yml = yml_new
nav_path.write_text(yml, encoding="utf-8")
print(f"Nav: đã thay {len(title_map)} nhãn tiêu đề")

# ── 3. leetcode-content.js: title + summary của từng entry ─────────
js_path = ROOT / "website/leetcode-content.js"
js = js_path.read_text(encoding="utf-8")

js_title_fixes = 0
js_summary_fixes = 0
for old_full, new_full in title_map.items():
    expected = sum(1 for _, t in md_updates if f'title: "{old_full}"' in t) or None
    needle = f"title: '{old_full}'"
    n = js.count(needle)
    if n:
        js = js.replace(needle, f"title: '{esc_js(new_full)}'")
        js_title_fixes += n

for old_sum, new_sum in summary_fixes:
    needle = f"summary: '{old_sum}'"
    n = js.count(needle)
    if n:
        js = js.replace(needle, f"summary: '{esc_js(new_sum)}'")
        js_summary_fixes += n

# summary dạng double-quote trong js (nếu có)
for old_sum, new_sum in summary_fixes:
    needle = f'summary: "{old_sum}"'
    n = js.count(needle)
    if n:
        js = js.replace(needle, f'summary: "{new_sum}"')
        js_summary_fixes += n

js_path.write_text(js, encoding="utf-8")
print(f"content.js: {js_title_fixes} title, {js_summary_fixes} summary đã cập nhật")
print("\nDanh sách tiêu đề đã chuẩn hóa:")
for old_full, new_full in sorted(title_map.items()):
    print(f"  {old_full}  ->  {new_full}")
