#!/usr/bin/env python3
"""Sửa 3 lỗi sai leetcode_id phát hiện bởi audit:

  1. lc-0753-open-the-lock  : nội dung là bài 752 (Open the Lock)  -> id 752
  2. lc-2316-minimum-obstacle-removal-to-re : nội dung là bài 2290 -> id 2290
  3. lc-0650-longest-palindromic-subsequenc : trùng bài 516        -> xóa

Đồng bộ cả 4 nơi: file markdown, map/leetcode_mkdocs.yml, website/leetcode-content.js,
dữ liệu chính thức (topic_tags lấy từ leetcode/data/problems.json).
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
problems = {p["id"]: p for p in json.loads((ROOT / "leetcode/data/problems.json").read_text(encoding="utf-8"))["problems"]}

def official_tags(pid):
    return json.dumps(problems[pid]["topicTags"], ensure_ascii=False)

def must_replace(text, old, new, count, label):
    found = text.count(old)
    if found != count:
        raise SystemExit(f"FAIL [{label}]: tìm thấy {found} thay vì {count} lần cho: {old[:60]!r}")
    return text.replace(old, new)

# ── Fix 1: 753 -> 752 (Open the Lock) ───────────────────────────────
old_md = ROOT / "leetcode/docs/level_04/advanced_graph/lc-0753-open-the-lock.md"
new_md = ROOT / "leetcode/docs/level_04/advanced_graph/lc-0752-open-the-lock.md"
text = old_md.read_text(encoding="utf-8")
text = must_replace(text, 'slug: "lc-0753-open-the-lock"', 'slug: "lc-0752-open-the-lock"', 1, "752-slug")
text = must_replace(text, 'title: "753. Open the Lock"', 'title: "752. Open the Lock"', 1, "752-title")
text = must_replace(text, "leetcode_id: 753", "leetcode_id: 752", 1, "752-id")
text = must_replace(text, "# 753. Open the Lock", "# 752. Open the Lock", 1, "752-h1")
text = must_replace(text, "(LeetCode 753)", "(LeetCode 752)", 1, "752-summary")
text = must_replace(text, "LeetCode 753 ↗", "LeetCode 752 ↗", 1, "752-link")
text = re.sub(r"^topic_tags: \[.*\]$", f"topic_tags: {official_tags(752)}", text, count=1, flags=re.MULTILINE)
old_md.rename(new_md)
new_md.write_text(text, encoding="utf-8")

# ── Fix 2: 2316 -> 2290 (Minimum Obstacle Removal to Reach Corner) ──
old_md2 = ROOT / "leetcode/docs/level_04/advanced_graph/lc-2316-minimum-obstacle-removal-to-re.md"
new_md2 = ROOT / "leetcode/docs/level_04/advanced_graph/lc-2290-minimum-obstacle-removal-to-re.md"
text = old_md2.read_text(encoding="utf-8")
text = must_replace(text, 'slug: "lc-2316-minimum-obstacle-removal-to-re"', 'slug: "lc-2290-minimum-obstacle-removal-to-re"', 1, "2290-slug")
text = must_replace(text, 'title: "2316. Minimum Obstacle Removal"', 'title: "2290. Minimum Obstacle Removal to Reach Corner"', 1, "2290-title")
text = must_replace(text, "leetcode_id: 2316", "leetcode_id: 2290", 1, "2290-id")
text = must_replace(text, "# 2316. Minimum Obstacle Removal", "# 2290. Minimum Obstacle Removal to Reach Corner", 1, "2290-h1")
text = must_replace(text, "(LeetCode 2316)", "(LeetCode 2290)", 1, "2290-summary")
text = must_replace(text, "LeetCode 2316 ↗", "LeetCode 2290 ↗", 1, "2290-link")
text = re.sub(r"^topic_tags: \[.*\]$", f"topic_tags: {official_tags(2290)}", text, count=1, flags=re.MULTILINE)
old_md2.rename(new_md2)
new_md2.write_text(text, encoding="utf-8")

# ── Fix 3: xóa bản trùng 650 (nội dung của 516) ────────────────────
dup = ROOT / "leetcode/docs/level_05/1d_dp/lc-0650-longest-palindromic-subsequenc.md"
dup.unlink()

# ── Nav mkdocs ──────────────────────────────────────────────────────
nav = ROOT / "map/leetcode_mkdocs.yml"
yml = nav.read_text(encoding="utf-8")
yml = must_replace(yml, "- 753. Open the Lock: level_04/advanced_graph/lc-0753-open-the-lock.md",
                   "- 752. Open the Lock: level_04/advanced_graph/lc-0752-open-the-lock.md", 1, "nav-752")
yml = must_replace(yml, "- 2316. Minimum Obstacle Removal: level_04/advanced_graph/lc-2316-minimum-obstacle-removal-to-re.md",
                   "- 2290. Minimum Obstacle Removal to Reach Corner: level_04/advanced_graph/lc-2290-minimum-obstacle-removal-to-re.md", 1, "nav-2290")
yml = must_replace(yml, "      - 650. Longest Palindromic Subsequence: level_05/1d_dp/lc-0650-longest-palindromic-subsequenc.md\n", "", 1, "nav-650")
nav.write_text(yml, encoding="utf-8")

# ── leetcode-content.js ─────────────────────────────────────────────
js_path = ROOT / "website/leetcode-content.js"
js = js_path.read_text(encoding="utf-8")

# 752
js = must_replace(js, "'lc-0753-open-the-lock'", "'lc-0752-open-the-lock'", 21, "js-752-slug")
js = must_replace(js, "title: '753. Open the Lock'", "title: '752. Open the Lock'", 1, "js-752-title")
js = must_replace(js, "leetcodeId: 753,", "leetcodeId: 752,", 1, "js-752-id")
js = must_replace(js, "Open the Lock (LeetCode 753)", "Open the Lock (LeetCode 752)", 1, "js-752-summary")
js = re.sub(r"(\n  'lc-0752-open-the-lock': \{[^}]*?topicTags: )\[[^\]]*\]", rf"\g<1>{official_tags(752)}", js, count=1)

# 2290
js = must_replace(js, "'lc-2316-minimum-obstacle-removal-to-re'", "'lc-2290-minimum-obstacle-removal-to-re'", 21, "js-2290-slug")
js = must_replace(js, "title: '2316. Minimum Obstacle Removal'", "title: '2290. Minimum Obstacle Removal to Reach Corner'", 1, "js-2290-title")
js = must_replace(js, "leetcodeId: 2316,", "leetcodeId: 2290,", 1, "js-2290-id")
js = must_replace(js, "Minimum Obstacle Removal (LeetCode 2316)", "Minimum Obstacle Removal to Reach Corner (LeetCode 2290)", 1, "js-2290-summary")
js = re.sub(r"(\n  'lc-2290-minimum-obstacle-removal-to-re': \{[^}]*?topicTags: )\[[^\]]*\]", rf"\g<1>{official_tags(2290)}", js, count=1)

# 650: xóa nguyên entry
m = re.search(r"\n  'lc-0650-longest-palindromic-subsequenc': \{.*?\n  \},\n", js, re.DOTALL)
if not m:
    raise SystemExit("FAIL [js-650]: không tìm thấy entry để xóa")
js = js[:m.start()] + "\n" + js[m.end():]

js_path.write_text(js, encoding="utf-8")

print("OK: đã sửa 752, 2290; đã xóa bản trùng 650.")
print("Lưu ý: chạy lại tools/sync_leetcode.py KHÔNG cần thiết (dữ liệu catalog độc lập).")
