#!/usr/bin/env python3
"""Kiểm tra tính nhất quán của dữ liệu LeetCode sau khi sync.

Kiểm tra:
  1. problems.json hợp lệ, tổng số khớp byDifficulty.
  2. Mọi slug trong topic_tags của markdown/leetcode-content.js đều tồn tại trong tags.json.
  3. Toàn bộ file markdown bài học vẫn còn nguyên (không mất bài cũ).
  4. leetcode-content.js có đủ thuộc tính topicTags cho từng entry.

Chạy: python3 tools/verify_leetcode_sync.py
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
errors = []
warnings = []

# 1. problems.json
problems_data = json.loads((ROOT / "leetcode/data/problems.json").read_text(encoding="utf-8"))
catalog = problems_data["problems"]
diff_sum = sum(problems_data["byDifficulty"].values())
if diff_sum != problems_data["totalFree"]:
    errors.append(f"byDifficulty ({diff_sum}) != totalFree ({problems_data['totalFree']})")
if len(catalog) != problems_data["totalFree"]:
    errors.append(f"số problems ({len(catalog)}) != totalFree ({problems_data['totalFree']})")
ids_in_catalog = {p["id"] for p in catalog}
if len(ids_in_catalog) != len(catalog):
    errors.append("Trùng lặp problem id trong problems.json")

# 2. tags.json
tags_data = json.loads((ROOT / "leetcode/data/tags.json").read_text(encoding="utf-8"))
valid_slugs = {t["slug"] for t in tags_data["tags"]}
tag_count_sum = sum(t["count"] for t in tags_data["tags"])
print(f"Catalog: {len(catalog)} bài free • {len(valid_slugs)} tags • tổng lượt gắn tag: {tag_count_sum}")

# 3. Markdown frontmatter
md_files = sorted((ROOT / "leetcode/docs").rglob("*.md"))
md_with_topic_tags = 0
bad_slug_files = []
lesson_ids = set()
for path in md_files:
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        continue  # index.md không có frontmatter
    fm = m.group(1)
    id_m = re.search(r"^leetcode_id:\s*(\d+)\s*$", fm, re.MULTILINE)
    if id_m:
        lesson_ids.add(int(id_m.group(1)))
    tt_m = re.search(r'^topic_tags:\s*\[(.*?)\]\s*$', fm, re.MULTILINE)
    if not tt_m:
        warnings.append(f"Thiếu topic_tags: {path.relative_to(ROOT)}")
        continue
    md_with_topic_tags += 1
    slugs = [s.strip().strip('"\'') for s in tt_m.group(1).split(",") if s.strip()]
    unknown = [s for s in slugs if s not in valid_slugs]
    if unknown:
        bad_slug_files.append(f"{path.name}: {unknown}")

missing_lessons = lesson_ids - ids_in_catalog
if missing_lessons:
    errors.append(f"Các id bài học cũ KHÔNG còn trong catalog: {sorted(missing_lessons)}")

# 4. leetcode-content.js
js_text = (ROOT / "website/leetcode-content.js").read_text(encoding="utf-8")
entries = len(re.findall(r"^    leetcodeId: (\d+),\s*$", js_text, re.MULTILINE))
topic_tag_entries = len(re.findall(r"^    topicTags: \[.*\],\s*$", js_text, re.MULTILINE))
js_ids = {int(x) for x in re.findall(r"^    leetcodeId: (\d+),", js_text, re.MULTILINE)}
missing_in_js = js_ids - ids_in_catalog

# 5. Website artifacts
for artifact in ("website/leetcode-problems.js", "leetcode/data/problems.json", "leetcode/data/tags.json"):
    if not (ROOT / artifact).exists():
        errors.append(f"Thiếu artifact: {artifact}")

print(f"Markdown: {md_with_topic_tags}/{len(md_files) - 1} file có topic_tags")
print(f"leetcode-content.js: {entries} entry leetcodeId • {topic_tag_entries} entry topicTags")
print(f"Bài học cũ nằm trong catalog: {len(lesson_ids & ids_in_catalog)}/{len(lesson_ids)}")

if bad_slug_files:
    errors.append(f"Slug không hợp lệ trong {len(bad_slug_files)} file: {bad_slug_files[:5]}")
if entries != topic_tag_entries:
    errors.append(f"leetcode-content.js thiếu topicTags: {entries - topic_tag_entries} entry")
if missing_in_js:
    warnings.append(f"Id có trong content.js nhưng không có trong catalog: {sorted(missing_in_js)}")

print()
for w in warnings:
    print(f"  WARN: {w}")
for e in errors:
    print(f"  ERROR: {e}")
if not errors:
    print("VERIFY PASSED ✓")
else:
    raise SystemExit(1)
