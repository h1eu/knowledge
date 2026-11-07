#!/usr/bin/env node
/* ============================================================
   Knowledge OS — Đồng bộ: knowledge/android/docs/session_NN → website/android-content.js
   Markdown là Single Source of Truth. Script sinh lại toàn bộ entry website
   của từng bài trong session từ Markdown (metadata + HTML content).

   Dùng:
     node tools/sync_android_session.js 01                 → đồng bộ session_01
     node tools/sync_android_session.js 01 --check         → chỉ báo entry lệch, exit 1 nếu có
     node tools/sync_android_session.js 01 --only=<id>     → chỉ một bài (theo frontmatter id)
     node tools/sync_android_session.js 01 --force         → ghi đè cả entry sẽ mất sơ đồ (xem dưới)
     Session 09–11 đọc từ jetpack_compose_ui/, coding_analyst_and_testing/, cicd_and_publish_store/ (SESSION_DIRS).

   Quy ước Markdown → website:
     - Key website = frontmatter `id`, hoặc slug cũ nếu có alias
       `ANDROID_CONTENT['<id>'] = ANDROID_CONTENT['<slug>']`; index.md / overview.md ở gốc thư mục session → `session-NN-overview`.
       Entry cũ dùng slug mà chưa có alias → thêm dòng alias đó vào android-content.js trước khi đồng bộ.
     - `<!-- dd: <slug> -->` sau khối Mermaid hoặc ```text (sơ đồ ASCII) → SVG `website/diagrams/<slug>(-dark).html` thay khối đó.
     - `<!-- archify: <slug> | <tiêu đề> -->` sau khối Mermaid → sơ đồ Archify
       `website/archify/android/<slug>.html` thay Mermaid đó (iframe do app.js chèn).
     - Bài chưa có entry website thì bị bỏ qua: thêm entry và nav (`KNOWLEDGE_DATA` trong app.js) bằng tay trước.
     - Chốt an toàn: entry website đang có sơ đồ (`data-dd`, archify) mà Markdown chưa đánh dấu
       thì bị bỏ qua, tránh xoá sơ đồ vẽ tay. Thêm marker vào Markdown rồi chạy lại (hoặc --force).
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JS = path.join(ROOT, 'website', 'android-content.js');
const DIAGRAMS = path.join(ROOT, 'website', 'diagrams');
// Session có thư mục docs không theo mẫu session_NN (đúng đường dẫn trong map/android_mkdocs.yml)
const SESSION_DIRS = { '09': 'jetpack_compose_ui', '10': 'coding_analyst_and_testing', '11': 'cicd_and_publish_store' };

// ── Frontmatter (scalar, [a, b], list "  - x", folded ">") ──────
function unquote(s) {
  const t = s.trim();
  return /^(["']).*\1$/.test(t) ? t.slice(1, -1) : t;
}

function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return null;
  const fm = {};
  const lines = m[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, raw] = kv;
    if (raw === '>' || raw === '|') {
      const parts = [];
      while (i + 1 < lines.length && /^\s+/.test(lines[i + 1])) parts.push(lines[++i].trim());
      fm[key] = parts.join(' ');
    } else if (raw === '') {
      const items = [];
      while (i + 1 < lines.length && /^\s+-\s+/.test(lines[i + 1])) items.push(unquote(lines[++i].replace(/^\s+-\s+/, '')));
      fm[key] = items;
    } else if (raw.startsWith('[')) {
      fm[key] = raw.slice(1, -1).split(',').map(unquote).filter(Boolean);
    } else {
      fm[key] = unquote(raw);
    }
  }
  return { fm, body: src.slice(m[0].length).replace(/\r\n/g, '\n') };
}

// ── Inline ───────────────────────────────────────────────────────
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function inline(text) {
  const codes = [];
  let s = text.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(esc(c)) - 1}\u0000`);
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[i]}</code>`);
}

// ── Blocks ───────────────────────────────────────────────────────
const CALLOUTS = [
  [/^Cảnh báo/, 'warn', '⚠️'],
  [/^Mẹo/, 'tip', '💡'],
  [/^Quy tắc/, 'important', '🔴'],
  [/^Lưu ý/, 'note', 'ℹ️'],
];
// GFM alert `> [!TYPE]` (chuẩn callout theo rule 05). DANGER giữ để đọc bài cũ.
const GFM_ALERTS = {
  NOTE: ['note', 'ℹ️'],
  TIP: ['tip', '💡'],
  IMPORTANT: ['important', '🔴'],
  WARNING: ['warn', '⚠️'],
  CAUTION: ['danger', '⛔'],
  DANGER: ['danger', '⛔'],
};

function table(rows) {
  const cells = (r) => r.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const head = cells(rows[0]);
  const body = rows.slice(2).map(cells);
  const th = head.map((h) => `      <th style="padding:8px 12px;text-align:left;">${inline(h)}</th>`).join('\n');
  const tr = body.map((r) => {
    const tds = r.map((c, i) => `      <td style="padding:8px 12px;${i === 0 ? 'font-weight:600;' : ''}">${inline(c)}</td>`).join('\n');
    return `    <tr style="border-bottom:1px solid #21262d;">\n${tds}\n    </tr>`;
  }).join('\n');
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:1em;">
  <thead>
    <tr style="border-bottom:2px solid #30363d;background:var(--bg-card,#161b22);">
${th}
    </tr>
  </thead>
  <tbody>
${tr}
  </tbody>
</table>`;
}

// Danh sách lồng nhau theo thụt lề; dòng tiếp nối (thụt lề, không phải bullet) nối vào item trước.
function list(lines) {
  const items = [];
  for (const line of lines) {
    const m = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (m) items.push({ indent: m[1].length, ordered: /\d/.test(m[2]), text: m[3] });
    else items[items.length - 1].text += ' ' + line.trim();
  }
  function build(start, indent) {
    const tag = items[start].ordered ? 'ol' : 'ul';
    let html = `<${tag}>\n`;
    let i = start;
    while (i < items.length && items[i].indent >= indent) {
      let li = `  <li>${inline(items[i].text)}`;
      i++;
      if (i < items.length && items[i].indent > indent) {
        const [sub, next] = build(i, items[i].indent);
        li += '\n' + sub;
        i = next;
      }
      html += li + '</li>\n';
    }
    return [html + `</${tag}>`, i];
  }
  return build(0, items[0].indent)[0];
}

function svgOf(file) {
  const m = fs.readFileSync(path.join(DIAGRAMS, file), 'utf8').match(/<svg[\s\S]*<\/svg>/);
  if (!m) throw new Error(`Không thấy <svg> trong website/diagrams/${file}`);
  return m[0];
}

// Sơ đồ thay thế (dd / archify) thay cho khối Mermaid, hoặc khối ```text (sơ đồ ASCII), đứng ngay trước nó
function replacePrecedingMermaid(out, html) {
  if (/^(<div class="mermaid">|<pre data-lang="text">)/.test(out[out.length - 1] || '')) out.pop();
  out.push(html);
}

function toHtml(body) {
  const lines = body.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim() || 'text';
      const code = [];
      while (!/^```\s*$/.test(lines[++i])) code.push(lines[i]);
      i++;
      const text = esc(code.join('\n'));
      out.push(lang === 'mermaid' ? `<div class="mermaid">\n${text}\n</div>` : `<pre data-lang="${lang}"><code>${text}</code></pre>`);
      continue;
    }
    const archify = line.match(/^<!--\s*archify:\s*([a-z0-9-]+)\s*\|\s*(.+?)\s*-->\s*$/);
    if (archify) {
      const [, slug, title] = archify;
      const src = `archify/android/${slug}.html`;
      replacePrecedingMermaid(out, `<div class="archify-embed" data-src="${src}" data-title="${esc(title)}">
  <a class="archify-full" href="${src}" target="_blank" rel="noopener">Mở toàn màn hình ↗</a>
</div>`);
      i++;
      continue;
    }
    const dd = line.match(/^<!--\s*dd:\s*([a-z0-9-]+)\s*-->\s*$/);
    if (dd) {
      const slug = dd[1];
      replacePrecedingMermaid(out, `<div class="dd-diagram" data-dd="${slug}">
<div class="dd-svg dd-svg-dark">
${svgOf(`${slug}-dark.html`)}
</div>
<div class="dd-svg dd-svg-light">
${svgOf(`${slug}.html`)}
</div>
</div>`);
      i++;
      continue;
    }
    if (/^#\s/.test(line) || /^---\s*$/.test(line) || /^<!--.*-->\s*$/.test(line) || line.trim() === '') { i++; continue; }
    const h = line.match(/^(#{2,4})\s+(.*)$/);
    if (h) { out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); i++; continue; }
    if (/^\|/.test(line)) {
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      out.push(table(rows));
      continue;
    }
    if (/^>\s?/.test(line)) {
      const parts = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) parts.push(lines[i++].replace(/^>\s?/, ''));
      let text = parts.join(' ').trim();
      const alert = text.match(/^\[!([A-Z]+)\]\s*/);
      let kind, icon;
      if (alert && GFM_ALERTS[alert[1]]) {
        [kind, icon] = GFM_ALERTS[alert[1]];
        text = text.slice(alert[0].length);
      } else {
        const label = text.replace(/^\*\*/, '');
        [, kind, icon] = CALLOUTS.find(([re]) => re.test(label)) || [null, 'note', 'ℹ️'];
      }
      out.push(`<div class="callout callout-${kind}"><span class="callout-icon">${icon}</span><div class="callout-body">${inline(text)}</div></div>`);
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const block = [];
      while (i < lines.length && lines[i].trim() !== '' && (/^\s*([-*]|\d+\.)\s+/.test(lines[i]) || /^\s+\S/.test(lines[i]))) block.push(lines[i++]);
      out.push(list(block));
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() !== '' && !/^(```|#|\||>|\s*([-*]|\d+\.)\s)/.test(lines[i])) para.push(lines[i++].trim());
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n\n');
}

// ── JS entry ─────────────────────────────────────────────────────
const q = (s) => `'${String(s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const arr = (a) => `[${(a || []).map(q).join(', ')}]`;
const tpl = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

function entry(key, fm, html, keep) {
  const lo = (fm.learning_outcomes || []).map((o) => `      ${q(o)}`).join(',\n');
  return `  ${q(key)}: {
    title: ${q(fm.title)},
    summary: ${q(fm.summary)},
    status: ${q(fm.status)},
    difficulty: ${q(fm.difficulty)},
    estimatedReadingTime: ${q(fm.estimated_reading_time)},
    depth: ${q(fm.depth)},
    tags: ${arr(fm.tags)},
    domain: ${keep.domain},
    module: ${keep.module},
    prerequisites: ${arr(fm.prerequisites)},
    related: ${arr(fm.related)},
    learningOutcomes: [
${lo}
    ],
    knowledgeGap: ${q(fm.knowledge_gap)},
    updatedAt: ${keep.updatedAt},
    readTime: ${q(fm.estimated_reading_time)},
    content: \`
${tpl(html)}
    \`
  },`;
}

// Tìm khối entry `  'key': { ... },` theo cân bằng ngoặc, bỏ qua nội dung trong template literal / chuỗi.
function findEntry(src, key) {
  const start = src.indexOf(`\n  '${key}': {`);
  if (start < 0) return null;
  let i = src.indexOf('{', start);
  let depth = 0;
  let mode = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (mode) {
      if (c === '\\') { i++; continue; }
      if (c === mode) mode = null;
      continue;
    }
    if (c === '`' || c === "'" || c === '"') { mode = c; continue; }
    if (c === '{') depth++;
    if (c === '}' && --depth === 0) break;
  }
  let end = i + 1;
  if (src[end] === ',') end++;
  return [start + 1, end];
}

// Key website của một bài: chính `id`, hoặc slug cũ trỏ tới qua alias.
function resolveKey(js, id, fallback) {
  for (const key of [id, fallback].filter(Boolean)) {
    if (findEntry(js, key)) return key;
    const alias = js.match(new RegExp(`^ANDROID_CONTENT\\['${key.replace(/\./g, '\\.')}'\\]\\s*=\\s*ANDROID_CONTENT\\['([^']+)'\\]`, 'm'));
    if (alias && findEntry(js, alias[1])) return alias[1];
  }
  return null;
}

function field(block, name) {
  const m = block.match(new RegExp(`\\n    ${name}: ('(?:[^'\\\\]|\\\\.)*')`));
  return m ? m[1] : null;
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return d.name === 'diagrams' ? [] : walk(p);
    return d.name.endsWith('.md') ? [p] : [];
  });
}

// Các sơ đồ (dd + archify) có trong một đoạn HTML
function diagramsIn(html) {
  return [
    ...[...html.matchAll(/data-dd="([^"]+)"/g)].map((m) => `dd:${m[1]}`),
    ...[...html.matchAll(/data-src="archify\/[^"]*?([^/"]+)\.html"/g)].map((m) => `archify:${m[1]}`),
  ];
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ── Main ─────────────────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);
  const session = (args.find((a) => !a.startsWith('--')) || '').replace(/^session_?/, '').padStart(2, '0');
  const check = args.includes('--check');
  const force = args.includes('--force');
  const only = (args.find((a) => a.startsWith('--only=')) || '').slice('--only='.length);
  if (!/^\d{2}$/.test(session)) {
    console.error('Dùng: node tools/sync_android_session.js <session, vd 01> [--check] [--only=<id>]');
    process.exit(2);
  }

  const docs = path.join(ROOT, 'knowledge', 'android', 'docs', SESSION_DIRS[session] || `session_${session}`);
  if (!fs.existsSync(docs)) {
    console.error(`Không có thư mục ${path.relative(ROOT, docs)}`);
    process.exit(2);
  }

  const topics = walk(docs).sort().map((file) => {
    const parsed = parseFrontmatter(fs.readFileSync(file, 'utf8'));
    // Chỉ index.md / overview.md ở gốc thư mục session mới là trang tổng quan của session
    // (overview.md trong thư mục con, vd advertisements/overview.md, là Topic thường).
    const isIndex = path.dirname(file) === docs && ['index.md', 'overview.md'].includes(path.basename(file));
    return { file, isIndex, ...(parsed || {}) };
  }).filter((t) => t.fm && t.fm.id);

  let js = fs.readFileSync(JS, 'utf8');
  const changed = [];
  const skipped = [];
  const guarded = [];

  for (const t of topics) {
    if (only && t.fm.id !== only) continue;
    const rel = path.relative(ROOT, t.file);
    const key = resolveKey(js, t.fm.id, t.isIndex ? `session-${session}-overview` : null);
    if (!key) { skipped.push(`${rel} (${t.fm.id})`); continue; }

    // Overview không khai báo related thì liên kết tới các bài trong session
    if (t.isIndex && !(t.fm.related || []).length) {
      t.fm.related = topics.filter((o) => !o.isIndex).map((o) => o.fm.id);
    }

    const [s, e] = findEntry(js, key);
    const old = js.slice(s, e);
    const keep = {
      domain: field(old, 'domain') || "'Android'",
      module: field(old, 'module') || q(`Session ${session}`),
      updatedAt: field(old, 'updatedAt') || q(today()),
    };
    const html = toHtml(t.body);
    const lost = diagramsIn(old).filter((d) => !diagramsIn(html).includes(d));
    if (lost.length && !force) {
      guarded.push(`${rel} → '${key}': ${lost.join(', ')}`);
      continue;
    }
    let next = entry(key, t.fm, html, keep);
    if (next !== old) {
      next = entry(key, t.fm, html, { ...keep, updatedAt: q(today()) });
      js = js.slice(0, s) + next + js.slice(e);
      changed.push(`${rel} → '${key}'`);
    }
  }

  for (const c of changed) console.log(`${check ? '✗ lệch' : '✓ cập nhật'}  ${c}`);
  for (const s of skipped) console.log(`⚠ chưa có entry website, bỏ qua: ${s}`);
  for (const g of guarded) console.log(`⛔ sẽ mất sơ đồ chưa đánh dấu trong Markdown, bỏ qua: ${g}`);
  if (!changed.length) console.log('Không có entry nào cần cập nhật.');

  if (check) process.exit(changed.length || guarded.length ? 1 : 0);
  if (changed.length) fs.writeFileSync(JS, js);
}

main();
