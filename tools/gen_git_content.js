#!/usr/bin/env node
/* ============================================================
   Knowledge OS — Generator: knowledge/git-beginner → git-content.js
   Markdown là Single Source of Truth. KHÔNG sửa git-content.js tay.
   Chạy lại sau mỗi lần chỉnh markdown:  node tools/gen_git_content.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'knowledge', 'git-beginner');
const OUT = path.join(ROOT, 'website', 'git-content.js');

const MODULE_LABELS = {
  '01-basics': 'Module 01: Version Control Foundations',
  '02-basic-git-usage': 'Module 02: Basic Git Usage',
  '03-collaboration': 'Module 03: Collaboration với GitHub',
  '04-more-git': 'Module 04: More Git',
  '05-more-github': 'Module 05: More GitHub'
};

// ── Frontmatter parser (subset đủ dùng) ─────────────────────────
function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return { meta: {}, body: src };
  const meta = {};
  let currentKey = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const blockItem = line.match(/^\s*-\s+(.*)$/);
    if (blockItem && currentKey) {
      meta[currentKey] = meta[currentKey] || [];
      meta[currentKey].push(blockItem[1].trim());
      continue;
    }
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      let v = kv[2].trim();
      if (v.startsWith('[')) {
        meta[currentKey] = v.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
      } else {
        meta[currentKey] = v.replace(/^["']|["']$/g, '');
      }
    }
  }
  return { meta, body: src.slice(m[0].length) };
}

// ── Inline formatting ───────────────────────────────────────────
function escHtml(s) {
  return s.replace(/&(?![a-zA-Z]+;|#\d+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function inline(raw, slugMap) {
  let s = escHtml(raw);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, '$1<em>$2</em>');
  // external link
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // internal lesson links: ../xx/file.md hoặc file.md → ?topic=<slug>
  s = s.replace(/\[([^\]]+)\]\(([^)]+\.md)\)/g, (all, text, href) => {
    const base = path.basename(href, '.md');
    const slug = slugMap[base];
    return slug ? `<a href="index.html?topic=${slug}">${text}</a>` : text;
  });
  return s;
}

// ── Block parser ────────────────────────────────────────────────
function parseBlocks(body, slugMap) {
  const lines = body.split(/\r?\n/);
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // fenced code / mermaid
    const fence = line.match(/^(`{3,})(\w*)\s*$/);
    if (fence) {
      const ticks = fence[1]; const lang = fence[2];
      i++;
      const buf = [];
      while (i < lines.length && !lines[i].startsWith(ticks)) { buf.push(lines[i]); i++; }
      i++; // skip closing fence
      const code = buf.join('\n');
      if (lang === 'mermaid') {
        out.push(`<div class="mermaid">\n${code}\n</div>`);
      } else if (lang && lang !== 'text') {
        out.push(`<pre><code class="language-${lang}">${escHtml(code)}</code></pre>`);
      } else {
        out.push(`<pre><code>${escHtml(code)}</code></pre>`);
      }
      continue;
    }

    // headings
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      if (h[1].length === 1) { i++; continue; }   // H1 trùng title frontmatter — bỏ qua
      out.push(`<h${h[1].length}>${inline(h[2], slugMap)}</h${h[1].length}>`); i++; continue;
    }

    // table
    if (/^\|.*\|$/.test(line) && /^\|(\s*:?-+:?\s*\|)+$/.test(lines[i + 1] || '')) {
      const cells = l => l.split('|').slice(1, -1).map(c => c.trim());
      const head = cells(line); i += 2;
      const rows = [];
      while (i < lines.length && /^\|.*\|$/.test(lines[i])) { rows.push(cells(lines[i])); i++; }
      const td = 'padding:10px;', ths = head.map(c =>
        `<th style="text-align:left;padding:10px;">${inline(c, slugMap)}</th>`).join('');
      const trs = rows.map(r =>
        `<tr style="border-bottom:1px solid var(--border);">${r.map(c =>
          `<td style="${td}">${inline(c, slugMap)}</td>`).join('')}</tr>`).join('\n    ');
      out.push(`<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px;">
  <thead><tr style="border-bottom:2px solid var(--border);">${ths}</tr></thead>
  <tbody>
    ${trs}
  </tbody>
</table>`);
      continue;
    }

    // blockquote → callout
    if (line.startsWith('>')) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith('>')) { buf.push(lines[i].replace(/^>\s?/, '')); i++; }
      const joined = buf.filter(l => l.trim()).join('\n');
      const tag = joined.match(/\[!(NOTE|TIP|WARNING)\]/i);
      const cls = tag ? tag[1].toUpperCase() : '';
      const map = { NOTE: ['callout-note', 'ℹ️'], TIP: ['callout-tip', '💡'], WARNING: ['callout-warn', '⚠️'] };
      if (tag) {
        const [c, icon] = map[cls];
        const txt = inline(joined.replace(/\[![A-Z]+\]\s*/, ''), slugMap).replace(/\n/g, ' ');
        out.push(`<div class="callout ${c}"><span class="callout-icon">${icon}</span><div class="callout-body">${txt}</div></div>`);
      } else {
        const txt = inline(joined, slugMap);
        if (/^(<strong>Bối cảnh:<\/strong>|\*\*Bối cảnh:\*\*)/.test(txt)) {
          out.push(`<div class="callout callout-note"><span class="callout-icon">ℹ️</span><div class="callout-body">${txt}</div></div>`);
        } else {
          out.push(`<blockquote>${txt}</blockquote>`);
        }
      }
      continue;
    }

    // unordered list (1 mức con)
    if (/^- /.test(line)) {
      const items = [];
      while (i < lines.length && /^(\s*)-\s/.test(lines[i])) {
        const indent = (lines[i].match(/^(\s*)-/)[1] || '').length;
        items.push({ indent, text: lines[i].replace(/^\s*-\s/, '') }); i++;
      }
      const render = arr => {
        let html = '<ul>', j = 0;
        while (j < arr.length) {
          if (arr[j].indent === 0) {
            const children = [];
            let k = j + 1;
            while (k < arr.length && arr[k].indent > 0) { children.push(arr[k]); k++; }
            html += `<li>${inline(arr[j].text, slugMap)}${children.length ? render(children) : ''}</li>`;
            j = k;
          } else j++;
        }
        return html + '</ul>';
      };
      out.push(render(items));
      continue;
    }

    // ordered list
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) { items.push(lines[i].replace(/^\d+\.\s/, '')); i++; }
      out.push(`<ol>${items.map(t => `<li>${inline(t, slugMap)}</li>`).join('')}</ol>`);
      continue;
    }

    // hr / blank
    if (/^---+$/.test(line.trim()) || !line.trim()) { i++; continue; }

    // paragraph (merge soft-wrapped lines)
    const buf = [];
    while (i < lines.length && lines[i].trim() &&
      !/^(#{1,3}\s|```|>|\||- |\d+\.\s)/.test(lines[i])) { buf.push(lines[i].trim()); i++; }
    if (!buf.length) { i++; continue; }   // safety net: luôn tiến để không treo parser
    out.push(`<p>${inline(buf.join(' '), slugMap)}</p>`);
  }
  return out.join('\n\n');
}

// ── Main ────────────────────────────────────────────────────────
const entries = {};
const files = [];                       // [absPath, relDir]
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.md') && f !== 'index.md' && !f.startsWith('.')) files.push([p, path.basename(dir)]);
  }
})(SRC);

// pass 1: slug map để rewrite link nội bộ
for (const [p] of files) {
  const { meta } = parseFrontmatter(fs.readFileSync(p, 'utf8'));
  if (meta.slug) entries[meta.slug] = null;
}
const slugByFile = {};
for (const [p] of files) {
  const { meta } = parseFrontmatter(fs.readFileSync(p, 'utf8'));
  slugByFile[path.basename(p, '.md')] = meta.slug;
}

// pass 2: build entries
for (const [p, dir] of files) {
  const { meta, body } = parseFrontmatter(fs.readFileSync(p, 'utf8'));
  const content = parseBlocks(body, slugByFile);
  entries[meta.slug] = {
    title: meta.title,
    summary: meta.summary,
    status: 'published',
    difficulty: meta.difficulty || 'beginner',
    depth: 'lesson',
    tags: Array.isArray(meta.tags) ? meta.tags : String(meta.tags || '').split(','),
    domain: 'Git & GitHub Beginner',
    module: MODULE_LABELS[dir],
    prerequisites: Array.isArray(meta.prerequisites) ? meta.prerequisites : [],
    related: Array.isArray(meta.related) ? meta.related : [],
    learningOutcomes: Array.isArray(meta.learning_outcomes) ? meta.learning_outcomes : [],
    knowledgeGap: meta.knowledge_gap || '',
    updatedAt: new Date().toISOString().slice(0, 10),
    readTime: meta.read_time || '',
    next: meta.next || '',
    previous: meta.previous || '',
    content
  };
}

const banner = `/* ============================================================
   AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
   Nguồn chân lý: knowledge/git-beginner/*.md
   Sinh lại bằng: node tools/gen_git_content.js
   ============================================================ */

`;
const body = `const GIT_CONTENT = ${JSON.stringify(entries, null, 2)};\n`;

fs.writeFileSync(OUT, banner + body, 'utf8');
console.log(`Generated ${Object.keys(entries).length} entries -> ${path.relative(ROOT, OUT)}`);
