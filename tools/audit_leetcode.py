#!/usr/bin/env python3
"""Audit toàn bộ bài học LeetCode trong leetcode/docs/.

Kiểm tra theo checklist review:
  A. Frontmatter: đủ field, slug/id/difficulty/level/url/title/topic_tags khớp dữ liệu chính thức
  B. Nội dung: 1 H1, đủ 5 ngôn ngữ code, không có file placeholder, link nội bộ không hỏng
  C. Toàn cục: trùng slug, nav trong map/leetcode_mkdocs.yml khớp file thực tế,
     leetcode-content.js khớp markdown

Đầu ra: báo cáo phân nhóm ERROR (phải sửa) / WARN (nên rà) / INFO.
Chạy: python3 tools/audit_leetcode.py
"""

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "leetcode" / "docs"
LANGS = ["cpp", "java", "kotlin", "swift", "dart"]

errors = []
warnings = []
infos = []

def add(bucket, msg):
    bucket.append(msg)

# ── Dữ liệu chính thức ──────────────────────────────────────────────
problems = json.loads((ROOT / "leetcode/data/problems.json").read_text(encoding="utf-8"))["problems"]
official = {p["id"]: p for p in problems}

# ── A + B: từng file ────────────────────────────────────────────────
md_files = sorted(DOCS.rglob("*.md"))
slugs_seen = {}
ids_seen = {}
files_no_frontmatter = []

for path in md_files:
    rel = path.relative_to(ROOT)
    text = path.read_text(encoding="utf-8")
    name = path.stem

    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        files_no_frontmatter.append(str(rel))
        continue
    fm = m.group(1)
    body = text[m.end():]

    def field(key):
        mm = re.search(rf'^{key}:\s*(.*)$', fm, re.MULTILINE)
        if not mm:
            return None
        val = mm.group(1).strip()
        if len(val) >= 2 and val[0] == '"' and val[-1] == '"':
            val = val[1:-1]
        return val

    # A1. Field bắt buộc
    for key in ("title", "slug", "summary", "tags", "topic_tags", "difficulty", "pattern", "level", "leetcode_id", "url"):
        if field(key) is None:
            add(errors, f"[frontmatter] {rel}: thiếu `{key}`")

    slug = field("slug")
    lc_id_raw = field("leetcode_id")
    difficulty = field("difficulty")
    level = field("level")
    url = field("url")
    title = field("title")

    # A2. slug khớp tên file
    if slug and slug != name:
        add(errors, f"[slug] {rel}: slug='{slug}' != tên file '{name}'")
    if slug:
        slugs_seen.setdefault(slug, []).append(rel)

    # A3. leetcode_id khớp tên file + tồn tại trong catalog
    lc_id = int(lc_id_raw) if lc_id_raw and lc_id_raw.isdigit() else None
    fname_m = re.match(r"lc-(\d{4})-", name)
    if fname_m and lc_id and int(fname_m.group(1)) != lc_id:
        add(errors, f"[id] {rel}: leetcode_id={lc_id} != id trong tên file ({fname_m.group(1)})")
    if lc_id:
        ids_seen.setdefault(lc_id, []).append(rel)
    if lc_id and lc_id not in official:
        add(errors, f"[id] {rel}: id {lc_id} không có trong catalog free (có thể là bài premium?)")

    # A4. difficulty / level hợp lệ
    if difficulty not in ("Easy", "Medium", "Hard"):
        add(errors, f"[difficulty] {rel}: giá trị lạ '{difficulty}'")
    if level not in ("1", "2", "3", "4", "5"):
        add(errors, f"[level] {rel}: giá trị lạ '{level}'")

    # A5. url + title + topic_tags khớp dữ liệu chính thức
    if lc_id and lc_id in official:
        off = official[lc_id]
        expect_url = f"https://leetcode.com/problems/{off['slug']}/"
        if url != expect_url:
            add(errors, f"[url] {rel}: '{url}' != chính thức '{expect_url}'")
        clean_title = re.sub(r"^\d+\.\s*", "", title or "")
        if clean_title != off["title"].strip():
            add(warnings, f"[title] {rel}: '{clean_title}' != LeetCode '{off['title'].strip()}'")
        tt_m = re.search(r'^topic_tags:\s*\[(.*?)\]$', fm, re.MULTILINE)
        if tt_m:
            got = sorted(s.strip().strip('"\'') for s in tt_m.group(1).split(",") if s.strip())
            want = sorted(off["topicTags"])
            if got != want:
                add(errors, f"[topic_tags] {rel}: khác với dữ liệu LC (file={got} official={want})")

    # B1. Một H1 duy nhất
    h1s = re.findall(r"^# .+", body, re.MULTILINE)
    if len(h1s) != 1:
        add(errors, f"[heading] {rel}: {len(h1s)} heading H1 (cần đúng 1)")

    # B2. Đủ 5 ngôn ngữ (chỉ đếm fence mở — vị trí chẵn trong cặp open/close)
    fences = re.findall(r"^```([a-zA-Z0-9+]*)\s*$", body, re.MULTILINE)
    openings = fences[0::2]
    lang_counts = Counter(openings)
    missing = [l for l in LANGS if lang_counts[l] == 0]
    if missing:
        add(errors, f"[code] {rel}: thiếu solution {missing}")
    no_lang = lang_counts.get("", 0)
    if no_lang:
        add(warnings, f"[code] {rel}: {no_lang} code block không khai báo ngôn ngữ")

    # B3. Placeholder / quá ngắn (compact nhưng đủ >=3 section H2 là chấp nhận được)
    h2_count = len(re.findall(r"^## ", body, re.MULTILINE))
    if len(text) < 3000 and h2_count < 3:
        add(warnings, f"[content] {rel}: chỉ {len(text)} bytes, {h2_count} section — nghi ngờ nội dung dở dang")

    # B4. Link markdown nội bộ
    for link in re.findall(r"\]\((?!http)([^)#]+?)(?:#[^)]*)?\)", body):
        target = (path.parent / link).resolve()
        if not target.exists():
            add(errors, f"[link] {rel}: link hỏng '{link}'")

# C1. Trùng slug
for slug, paths in slugs_seen.items():
    if len(paths) > 1:
        add(warnings, "[trùng slug] '" + slug + "' xuất hiện ở " + str(len(paths)) + " file: " + ", ".join(str(p) for p in paths))

# C2. Nav trong mkdocs yml
nav_paths = []
yml = (ROOT / "map/leetcode_mkdocs.yml").read_text(encoding="utf-8")
for mm in re.finditer(r":\s*(level_\d+/[^\s:]+\.md)\s*$", yml, re.MULTILINE):
    nav_paths.append(mm.group(1))
docs_rel = {str(p.relative_to(DOCS)) for p in md_files}
nav_missing_on_disk = [p for p in nav_paths if p not in docs_rel]
not_in_nav = sorted(docs_rel - set(nav_paths) - {"index.md"})
if nav_missing_on_disk:
    for p in nav_missing_on_disk:
        add(errors, f"[nav] map/leetcode_mkdocs.yml trỏ tới file không tồn tại: {p}")
if not_in_nav:
    add(warnings, f"[nav] {len(not_in_nav)} file markdown không có trong nav: {not_in_nav[:5]}{'...' if len(not_in_nav) > 5 else ''}")

# C3. leetcode-content.js khớp markdown
js_text = (ROOT / "website/leetcode-content.js").read_text(encoding="utf-8")
js_slugs = set(re.findall(r"^  '(lc-[\w-]+)':\s*\{", js_text, re.MULTILINE))
md_slugs = set(slugs_seen.keys())
only_js = sorted(js_slugs - md_slugs)
only_md = sorted(md_slugs - js_slugs)
if only_js:
    add(warnings, f"[sync] {len(only_js)} entry có trong content.js nhưng không có markdown: {only_js[:5]}")
if only_md:
    add(warnings, f"[sync] {len(only_md)} file markdown không có entry trong content.js: {only_md[:5]}")

# Bài học phủ catalog
lesson_ids = set(ids_seen.keys())
covered = lesson_ids & set(official.keys())
dup_ids = {i: paths for i, paths in ids_seen.items() if len(paths) > 1}
infos.append(f"Tổng file markdown: {len(md_files)} • slug duy nhất: {len(slugs_seen)} • id bài học: {len(lesson_ids)} (trong đó {len(dup_ids)} id có bài ở nhiều pattern)")
infos.append(f"Phủ catalog: {len(covered)}/{len(official)} bài free có bài học • còn thiếu {len(official) - len(covered)} bài (hiển thị dạng catalog trên web)")
infos.append(f"Nav mkdocs: {len(nav_paths)} entry • content.js: {len(js_slugs)} entry")

# ── Báo cáo ─────────────────────────────────────────────────────────
print("=" * 70)
for s in infos:
    print("INFO:", s)
print("=" * 70)
print(f"\nERROR ({len(errors)}):")
for e in errors:
    print("  ✗", e)
print(f"\nWARN ({len(warnings)}):")
for w in warnings:
    print("  ⚠", w)
if not errors and not warnings:
    print("  (không có)")
print()
raise SystemExit(1 if errors else 0)
