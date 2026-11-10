#!/usr/bin/env node
/* ============================================================
   Knowledge OS — Sinh map: file Markdown → topic id trên website
   Nội dung bài Android (sinh từ Markdown) link sang bài khác bằng đường dẫn .md tương đối
   (rule 03/05), nhưng website không có file .md. app.js (resolveDocLinks) dùng map này để
   biết file nguồn của bài đang mở, resolve link tương đối và mở đúng Topic, kể cả link
   chéo sang Design Principles (vd ../../../../design-principles/02-solid/solid-dip.md).

   Dùng:
     node tools/gen_doc_paths.js           → ghi website/doc-paths.js
     node tools/gen_doc_paths.js --check   → exit 1 nếu file đang lệch docs

   Chạy lại sau khi thêm/đổi tên/xoá file Markdown hoặc thêm entry website.

   Output: DOC_PATHS['<đường dẫn từ gốc repo>'] = [topic id ứng viên]
     - Android, Flutter: key entry website (cùng quy ước với sync_android_session.js), frontmatter `id`, rồi các
       alias `ANDROID_CONTENT['<slug>'] = ANDROID_CONTENT['<key>']` (FLUTTER_CONTENT với Flutter; sidebar có thể dùng slug này).
     - Design Principles: frontmatter `slug` (key của oodp-content.js, gen_oodp_content.js).
     - app.js chọn ứng viên đầu tiên có trong sidebar; [] = file có trong repo nhưng chưa có
       entry website → app.js mở file trên GitHub.
   ============================================================ */
const fs = require('fs');
const path = require('path');
const { ROOT, DOMAINS, parseFrontmatter, resolveKey, walk } = require('./sync_android_session.js');

const OUT = path.join(ROOT, 'website', 'doc-paths.js');
// Domain dùng profile Android + script sync (tools/domains.js)
const SYNCED = [DOMAINS.android, DOMAINS.flutter];
const OODP_DOCS = path.join(ROOT, 'knowledge', 'design-principles');
const OODP_JS = path.join(ROOT, 'website', 'oodp-content.js');

const frontmatterOf = (file) => (parseFrontmatter(fs.readFileSync(file, 'utf8')) || {}).fm || {};
const repoPath = (file) => path.relative(ROOT, file).split(path.sep).join('/');

// Thư mục session → số session (session_NN hoặc tên trong sessionDirs của domain)
function sessionOf(domain, dir) {
  const named = Object.keys(domain.sessionDirs).find((n) => domain.sessionDirs[n] === dir);
  if (named) return named;
  const m = dir.match(/^session_(\d{2})$/);
  return m ? m[1] : null;
}

// Trang tổng quan của session: cùng quy tắc với sync_android_session.js
function isSessionIndex(domain, file) {
  const dir = path.dirname(file);
  if (path.dirname(dir) !== domain.docs) return false;
  const base = path.basename(file);
  return base === 'index.md' || (base === 'overview.md' && !fs.existsSync(path.join(dir, 'index.md')));
}

// Các alias trỏ về key: <VAR>['<alias>'] = <VAR>['<key>']
function aliasesOf(domain, js, key) {
  const v = domain.varName;
  const re = new RegExp(`^${v}\\['([^']+)'\\]\\s*=\\s*${v}\\['([^']+)'\\]`, 'gm');
  return [...js.matchAll(re)].filter((m) => m[2] === key).map((m) => m[1]);
}

function syncedCandidates(domain, js, file) {
  const id = frontmatterOf(file).id;
  const session = sessionOf(domain, path.basename(path.dirname(file)));
  const fallback = isSessionIndex(domain, file) && session ? domain.overviewKey(session) : null;
  if (!id && !fallback) return [];
  const key = resolveKey(js, id || fallback, fallback, domain.varName);
  return key ? [...new Set([key, id, ...aliasesOf(domain, js, key)].filter(Boolean))] : [];
}

function oodpCandidates(js, file) {
  const slug = frontmatterOf(file).slug;
  return slug && js.includes(`\n  ${JSON.stringify(slug)}: {`) ? [slug] : [];
}

function build() {
  const oodpJs = fs.readFileSync(OODP_JS, 'utf8');
  const rows = [
    ...SYNCED.flatMap((d) => {
      const js = fs.readFileSync(d.js, 'utf8');
      return walk(d.docs).map((f) => [repoPath(f), syncedCandidates(d, js, f)]);
    }),
    ...walk(OODP_DOCS).map((f) => [repoPath(f), oodpCandidates(oodpJs, f)]),
  ].sort(([a], [b]) => (a < b ? -1 : 1));
  return {
    rows,
    text: `/* ============================================================
   Knowledge OS — file Markdown (từ gốc repo) → topic id, để mở link .md trong bài
   FILE SINH TỰ ĐỘNG bởi tools/gen_doc_paths.js — không sửa tay.
   ============================================================ */
const DOC_PATHS = {
${rows.map(([p, ids]) => `  ${JSON.stringify(p)}: ${JSON.stringify(ids)},`).join('\n')}
};
`,
  };
}

function main() {
  const { rows, text } = build();
  const rel = path.relative(ROOT, OUT);
  if (process.argv.includes('--check')) {
    const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
    if (text !== current) {
      console.error(`✗ ${rel} lệch docs: chạy node tools/gen_doc_paths.js`);
      process.exit(1);
    }
    console.log(`✓ ${rel} khớp docs`);
    return;
  }
  fs.writeFileSync(OUT, text);
  const missing = rows.filter(([, ids]) => !ids.length).map(([p]) => p);
  console.log(`✓ ghi ${rel}: ${rows.length} file, ${missing.length} file chưa có entry website`);
  for (const p of missing) console.log(`  · ${p}`);
}

main();
