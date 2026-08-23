#!/usr/bin/env python3
"""Bổ sung topic_tags (tag chính thức LeetCode) vào:
  1. Frontmatter của toàn bộ file markdown trong leetcode/docs/
  2. Từng entry trong website/leetcode-content.js (thuộc tính topicTags)

Dữ liệu lấy từ leetcode/data/problems.json (sinh bởi sync_leetcode.py).
Idempotent: chạy lại không bị trùng lặp.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
problems = json.loads((ROOT / "leetcode/data/problems.json").read_text(encoding="utf-8"))
tags_by_id = {p["id"]: p["topicTags"] for p in problems["problems"]}

# ---------- 1. Markdown frontmatter ----------
md_files = sorted((ROOT / "leetcode/docs").rglob("*.md"))
updated_md = skipped_md = no_id = no_match = 0

for path in md_files:
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        no_id += 1
        continue
    fm = m.group(1)
    if "topic_tags:" in fm:
        skipped_md += 1
        continue
    id_m = re.search(r"^leetcode_id:\s*(\d+)\s*$", fm, re.MULTILINE)
    if not id_m:
        no_id += 1
        continue
    lc_id = int(id_m.group(1))
    tags = tags_by_id.get(lc_id)
    if not tags:
        no_match += 1
        print(f"  WARN: khong tim thay tags cho id {lc_id}: {path.name}")
        continue
    tags_yaml = json.dumps(tags, ensure_ascii=False)
    new_fm = re.sub(r"^(difficulty:.*)$", rf"topic_tags: {tags_yaml}\n\1", fm, count=1, flags=re.MULTILINE)
    if new_fm == fm:
        new_fm = fm + f"\ntopic_tags: {tags_yaml}"
    text = text[:m.start(1)] + new_fm + text[m.end(1):]
    path.write_text(text, encoding="utf-8")
    updated_md += 1

print(f"Markdown: updated={updated_md} already-had={skipped_md} no-id={no_id} no-match={no_match}")

# ---------- 2. leetcode-content.js ----------
js_path = ROOT / "website/leetcode-content.js"
js = js_path.read_text(encoding="utf-8")

def add_topic_tags(match: re.Match) -> str:
    indent, lc_id = match.group(1), int(match.group(2))
    tags = tags_by_id.get(lc_id)
    if not tags:
        return match.group(0)
    return f"{indent}topicTags: {json.dumps(tags)},\n{match.group(0)}"

pattern = re.compile(r"^(\s*)leetcodeId: (\d+),\s*$", re.MULTILINE)
js_new, n = pattern.subn(lambda m: add_topic_tags(m), js)
already = js.count("topicTags:")
js_path.write_text(js_new, encoding="utf-8")
print(f"leetcode-content.js: inserted={n - already} (had {already} before)")
