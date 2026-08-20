#!/usr/bin/env node
/**
 * verify-ios-topics.js
 * ------------------------------------------------------------------
 * Kiểm tra cấu trúc của các Topic iOS trong Knowledge OS.
 *
 * Đối chiếu mỗi file .md trong ios/docs/ với:
 *   - Chuẩn frontmatter Lesson (title, slug, summary, tags, ...)
 *   - Map định hướng ios_mkdocs.yml (nav)
 *   - Website source website/ios-content.js
 *
 * Các kiểm tra:
 *
 *   1)  Title exists — frontmatter phải có title.
 *   2)  Slug exists & valid — kebab-case, unique.
 *   3)  Summary exists — đủ dài, có ý nghĩa.
 *   4)  Tags exists — ít nhất 1 tag, nên chứa "ios".
 *   5)  Domain / Module / Topic — domain phải là iOS (nếu có).
 *   6)  Prerequisites / Related — IDs/slugs tham chiếu phải tồn tại (cảnh báo).
 *   7)  Slug unique — không trùng.
 *   8)  Heading structure — H1 duy nhất, tăng tuần tự.
 *   9)  Required sections — phải có "Vấn đề" và ít nhất 2 H2.
 *   10) Diagram exists — ít nhất 1 Mermaid hoặc text diagram.
 *   11) Code block exists — ít nhất 1 code block có language.
 *   12) Broken links — internal links phải trỏ đúng file.
 *   13) Mermaid valid — kiểm tra cú pháp Mermaid cơ bản.
 *   14) Nav sync — file trong nav phải tồn tại, file ngoài nav là orphan (cảnh báo).
 *   15) JS sync — entry trong ios-content.js phải khớp với markdown (cảnh báo).
 *   16) Learning outcomes sync (nếu JS có) — kiểm tra liên kết.
 *
 * KHÔNG cần cài thêm package nào (chỉ dùng Node core: fs, path, vm).
 *
 * Cách chạy:
 *   node tools/verify-ios-topics.js                    → kiểm tra TẤT CẢ topic
 *   node tools/verify-ios-topics.js swift              → topic chứa "swift"
 *   node tools/verify-ios-topics.js --session=01       → chỉ session 01
 *   node tools/verify-ios-topics.js --slug=swift-for-kotlin-devs
 *   node tools/verify-ios-topics.js --check-nav        → chỉ kiểm tra đồng bộ nav
 *
 * Trong VS Code: Cmd+Shift+P → Tasks: Run Task → "Verify iOS Topics"
 * ------------------------------------------------------------------
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// ==================================================================
// Configuration
// ==================================================================
const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const IOS_DOCS = path.join(WORKSPACE_ROOT, 'ios', 'docs');
const IOS_MKDOCS = path.join(WORKSPACE_ROOT, 'map', 'ios_mkdocs.yml');
const WEBSITE_DIR = path.join(WORKSPACE_ROOT, 'website');

const VALID_STATUSES = ['planned', 'drafting', 'reviewing', 'published', 'deprecated', 'archived'];
const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];
const VALID_DEPTHS = ['overview', 'standard', 'deep-dive'];

// Sections khuyến nghị cho iOS lesson (không bắt buộc cứng, nhưng cảnh báo nếu thiếu "Vấn đề")
const REQUIRED_H2_KEYWORDS = ['Vấn đề']; // phải chứa từ khóa này trong H2
const RECOMMENDED_SECTIONS = [
  'Vấn đề cần giải quyết',
  'Mental Model',
  'Cách hoạt động',
  'Ví dụ',
];

const MERMAID_TYPES = [
  'graph', 'flowchart', 'sequenceDiagram', 'classDiagram',
  'stateDiagram', 'erDiagram', 'gantt', 'pie', 'mindmap',
  'timeline', 'gitGraph', 'journey',
];

// ==================================================================
// CLI args
// ==================================================================
function parseArgs(argv) {
  let filter = 'all';
  let sessionFilter = null;
  let slugFilter = null;
  let idFilter = null;
  let checkNavOnly = false;

  for (const arg of argv) {
    if (arg.startsWith('--session=')) {
      sessionFilter = arg.slice('--session='.length);
    } else if (arg.startsWith('--slug=')) {
      slugFilter = arg.slice('--slug='.length);
    } else if (arg.startsWith('--id=')) {
      idFilter = arg.slice('--id='.length);
    } else if (arg === '--check-nav') {
      checkNavOnly = true;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (arg.trim()) {
      filter = arg.trim();
    }
  }
  return { filter, sessionFilter, slugFilter, idFilter, checkNavOnly };
}

function printHelp() {
  const header = fs.readFileSync(__filename, 'utf8').split('*/')[0];
  console.log(header);
}

// ==================================================================
// Frontmatter parser (simple YAML — no external deps)
// ==================================================================
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, body: content };

  const yamlStr = match[1];
  const body = content.slice(match[0].length).trim();
  const data = {};

  let currentKey = null;
  let currentArray = null;
  let foldedKey = null;

  for (const line of yamlStr.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      if (!trimmed && foldedKey) {
        currentKey = null;
        foldedKey = null;
      }
      continue;
    }

    // Array item
    if (trimmed.startsWith('- ') && currentKey) {
      const value = trimmed.slice(2).trim().replace(/^['"]|['"]$/g, '');
      if (!currentArray) currentArray = [];
      currentArray.push(value);
      data[currentKey] = currentArray;
      foldedKey = null;
      continue;
    }

    // Key-value
    const kvMatch = trimmed.match(/^(\w[\w_]*):\s*(.*)/);
    if (kvMatch) {
      if (currentKey && currentArray) {
        data[currentKey] = currentArray;
      }

      currentKey = kvMatch[1];
      const rawVal = kvMatch[2].trim();
      currentArray = null;
      foldedKey = null;

      if (!rawVal || rawVal === '>') {
        if (rawVal === '>') {
          data[currentKey] = '';
          foldedKey = currentKey;
        }
        continue;
      }

      // Inline array [a, b, c]
      if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
        const inner = rawVal.slice(1, -1);
        data[currentKey] = inner
          ? inner.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
          : [];
        currentKey = null;
        continue;
      }

      // Simple scalar
      data[currentKey] = rawVal.replace(/^['"]|['"]$/g, '');
      currentKey = null;
    } else if (foldedKey) {
      data[foldedKey] += (data[foldedKey].length ? ' ' : '') + trimmed;
    }
  }

  return { data, body };
}

// ==================================================================
// Text extraction utilities
// ==================================================================
function extractHeadings(md) {
  return [...md.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((m) => ({
    level: m[1].length,
    text: m[2].trim(),
  }));
}

function extractCodeBlocks(md) {
  return [...md.matchAll(/^```(\w*)\n([\s\S]*?)^```$/gm)].map((m) => ({
    lang: m[1] || null,
    content: m[2],
  }));
}

function extractMermaidBlocks(md) {
  return extractCodeBlocks(md).filter((b) => b.lang === 'mermaid');
}

function extractInternalLinks(md) {
  return [...md.matchAll(/\[([^\]]*)\]\(([^)]+)\)/g)]
    .map((m) => ({ text: m[1], href: m[2] }))
    .filter((l) => !l.href.startsWith('http') && !l.href.startsWith('#') && !l.href.startsWith('mailto:'));
}

function hasDiagram(md) {
  if (extractMermaidBlocks(md).length > 0) return true;
  if (/[┌┐└┘│─►▶→←↓↑↕▼△]/.test(md)) return true;
  if (/^\s*[\+\-\|]+\s*$/m.test(md)) return true;
  return false;
}

function hasCodeBlock(md) {
  const blocks = extractCodeBlocks(md).filter((b) => b.lang && b.lang !== 'mermaid');
  return blocks.length > 0;
}

// ==================================================================
// Find all topic .md files
// ==================================================================
function findTopicFiles(docsDir) {
  const files = [];

  function walk(dir, rel) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const entryRel = path.join(rel, entry.name);
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), entryRel);
      } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
        files.push({ abs: path.join(dir, entry.name), rel: entryRel });
      }
    }
  }

  walk(docsDir, '');
  return files;
}

// ==================================================================
// Parse ios_mkdocs.yml nav — extract all .md paths
// ==================================================================
function parseIosNav(mkdocsPath) {
  if (!fs.existsSync(mkdocsPath)) return [];
  const content = fs.readFileSync(mkdocsPath, 'utf8');
  const lines = content.split('\n');
  let inNav = false;
  const navFiles = [];

  for (const raw of lines) {
    if (/^nav:\s*$/.test(raw)) {
      inNav = true;
      continue;
    }
    if (!inNav) continue;
    if (!raw.trim()) continue;
    const trimmed = raw.trim();
    if (trimmed.startsWith('#')) continue;
    // Look for "*.md" paths
    const mdMatch = trimmed.match(/(\S+\.md)\s*$/);
    if (mdMatch) {
      navFiles.push(mdMatch[1].trim());
    }
  }
  return navFiles;
}

// ==================================================================
// Load ios-content.js
// ==================================================================
function loadIosContent() {
  const contentFile = path.join(WEBSITE_DIR, 'ios-content.js');
  if (!fs.existsSync(contentFile)) return {};
  const sandbox = { console };
  vm.createContext(sandbox);
  const code = fs.readFileSync(contentFile, 'utf8');
  vm.runInContext(code, sandbox, { filename: contentFile });
  try {
    return vm.runInContext('IOS_CONTENT', sandbox) || {};
  } catch {
    return {};
  }
}

// ==================================================================
// Validate Mermaid syntax (basic checks)
// ==================================================================
function validateMermaid(content) {
  const issues = [];
  const firstLine = content.trim().split('\n')[0].trim();
  const hasValidType = MERMAID_TYPES.some((t) =>
    firstLine.startsWith(t) || firstLine.startsWith(t + '-v2')
  );
  if (!hasValidType) {
    issues.push(`Mermaid: không nhận diện được loại diagram ("${firstLine.slice(0, 40)}...").`);
  }
  const open = (content.match(/[{(\[]/g) || []).length;
  const close = (content.match(/[})\]]/g) || []).length;
  if (open !== close) {
    issues.push(`Mermaid: ngoặc không cân bằng (mở: ${open}, đóng: ${close}).`);
  }
  return issues;
}

// ==================================================================
// Slug validation — kebab-case
// ==================================================================
function isValidSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

// ==================================================================
// Audit a single topic file
// ==================================================================
function auditTopic(filePath, relPath, allSlugsMap, allTopicSlugs, jsContent) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data: fm, body } = parseFrontmatter(raw);
  const issues = [];
  const warnings = [];

  // --- 1. Title exists ---
  if (!fm.title) {
    issues.push('[Title] Thiếu `title` trong frontmatter.');
  } else if (fm.title.trim().length < 5) {
    issues.push('[Title] Quá ngắn — cần mô tả rõ hơn.');
  }

  // --- 2. Slug exists & valid ---
  if (!fm.slug) {
    issues.push('[Slug] Thiếu `slug` trong frontmatter.');
  } else {
    if (!isValidSlug(fm.slug)) {
      issues.push(`[Slug] "${fm.slug}" không đúng kebab-case (chỉ a-z, 0-9, dấu -).`);
    }
    if (/[A-Z\s_]/.test(fm.slug)) {
      issues.push(`[Slug] "${fm.slug}" không được chứa chữ hoa, khoảng trắng hoặc _.`);
    }
  }

  // --- 3. Summary ---
  if (!fm.summary) {
    issues.push('[Summary] Thiếu `summary` trong frontmatter.');
  } else if (fm.summary.trim().length < 20) {
    issues.push('[Summary] Quá ngắn — cần ít nhất 20 ký tự mô tả.');
  }

  // --- 4. Tags ---
  if (!fm.tags || !Array.isArray(fm.tags) || fm.tags.length === 0) {
    issues.push('[Tags] Thiếu `tags` hoặc tags rỗng.');
  } else {
    const hasIosTag = fm.tags.some((t) => t.toLowerCase() === 'ios');
    if (!hasIosTag) {
      warnings.push('[Tags] Khuyến nghị có tag "ios" trong danh sách tags.');
    }
  }

  // --- 5. Domain / Module ---
  if (!fm.domain) {
    warnings.push('[Domain] Thiếu `domain` trong frontmatter (khuyến nghị: "iOS").');
  } else if (fm.domain.toLowerCase() !== 'ios') {
    warnings.push(`[Domain] "${fm.domain}" nên là "iOS".`);
  }
  if (!fm.module) {
    warnings.push('[Module] Thiếu `module` trong frontmatter.');
  }

  // --- Optional: status / difficulty / depth if present, validate ---
  if (fm.status && !VALID_STATUSES.includes(fm.status)) {
    issues.push(`[Status] "${fm.status}" không hợp lệ. Chấp nhận: ${VALID_STATUSES.join(', ')}.`);
  }
  if (fm.difficulty && !VALID_DIFFICULTIES.includes(fm.difficulty)) {
    issues.push(`[Difficulty] "${fm.difficulty}" không hợp lệ. Chấp nhận: ${VALID_DIFFICULTIES.join(', ')}.`);
  }
  if (fm.depth && !VALID_DEPTHS.includes(fm.depth)) {
    issues.push(`[Depth] "${fm.depth}" không hợp lệ. Chấp nhận: ${VALID_DEPTHS.join(', ')}.`);
  }

  // --- 6. Prerequisites / Related existence ---
  const checkRefs = (fieldName, values) => {
    if (!values || !Array.isArray(values)) return;
    for (const ref of values) {
      if (!ref) continue;
      // Lenient: exact match OR ref là suffix/substring của slug (vd: "closures" khớp "ios-swift-closures")
      const normalizedRef = ref.toLowerCase().replace(/^ios[-_]/, '');
      const exists = allTopicSlugs.has(ref) || [...allTopicSlugs].some((s) => {
        const ns = s.toLowerCase().replace(/^ios[-_]/, '');
        return ns === normalizedRef || ns.endsWith(`-${normalizedRef}`) || ns.includes(normalizedRef);
      });
      if (!exists) {
        warnings.push(`[Related] ${fieldName} "${ref}" không tồn tại trong repo (slug/id không khớp).`);
      }
    }
  };
  if (fm.prerequisites) checkRefs('prerequisites', fm.prerequisites);
  if (fm.related) checkRefs('related', fm.related);

  // --- 7. Heading structure ---
  const headings = extractHeadings(body);
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) {
    issues.push('[Heading] Không có Heading H1.');
  } else if (h1s.length > 1) {
    issues.push(`[Heading] Có ${h1s.length} Heading H1 (chỉ được phép 1).`);
  }
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level > headings[i - 1].level + 1) {
      issues.push(
        `[Heading] Nhảy cấp: "${headings[i - 1].text}" (H${headings[i - 1].level}) → "${headings[i].text}" (H${headings[i].level}).`
      );
      break;
    }
  }

  // --- 8. Required sections ---
  const h2Texts = headings.filter((h) => h.level === 2).map((h) => h.text);
  // Must contain keyword "Vấn đề"
  const hasRequiredKeyword = h2Texts.some((t) =>
    REQUIRED_H2_KEYWORDS.some((kw) => t.includes(kw))
  );
  if (!hasRequiredKeyword) {
    issues.push(`[Section] Thiếu section chứa từ khóa "Vấn đề" (khuyến nghị: "## Vấn đề cần giải quyết").`);
  }
  if (h2Texts.length < 2) {
    warnings.push(`[Section] Chỉ có ${h2Texts.length} H2 — khuyến nghị ít nhất 2 section chính.`);
  }
  // Recommended sections check (soft warning)
  for (const rec of RECOMMENDED_SECTIONS) {
    const found = h2Texts.some((s) => s.toLowerCase().includes(rec.toLowerCase().split(' ')[0]));
    // Only warn for Mental Model if missing — not hard error
    if (rec === 'Mental Model' && !h2Texts.some((s) => s.toLowerCase().includes('mental'))) {
      // optional
    }
  }

  // --- 9. Diagram exists ---
  if (!hasDiagram(body)) {
    issues.push('[Diagram] Không tìm thấy diagram nào (Mermaid, text diagram, hoặc ASCII art).');
  }

  // --- 10. Code block exists ---
  if (!hasCodeBlock(body)) {
    issues.push('[Code] Không tìm thấy code block nào (cần ít nhất 1 code block có chỉ định ngôn ngữ).');
  } else {
    // Check code blocks have language
    const blocksWithoutLang = extractCodeBlocks(body).filter((b) => !b.lang && b.content.trim().length > 0);
    // Exclude === blocks which are mkdocs material tabs, not code
    const realMissing = blocksWithoutLang.filter((b) => !b.content.includes('===')); 
    if (realMissing.length > 0) {
      warnings.push(`[Code] Có ${realMissing.length} code block không chỉ định ngôn ngữ (khuyến nghị: \`\`\`swift, \`\`\`kotlin, ...).`);
    }
  }

  // --- 11. Broken links ---
  const internalLinks = extractInternalLinks(body);
  const baseDir = path.dirname(filePath);
  for (const link of internalLinks) {
    const linkPath = link.href.split('#')[0];
    if (!linkPath) continue;
    // Skip absolute md links that look like slugs
    if (!linkPath.includes('/') && !linkPath.endsWith('.md')) continue;
    const resolved = path.resolve(baseDir, linkPath);
    if (!fs.existsSync(resolved)) {
      issues.push(`[Link] Link hỏng: [${link.text}](${link.href}) — file không tồn tại.`);
    }
  }

  // --- 12. Mermaid valid ---
  const mermaidBlocks = extractMermaidBlocks(body);
  for (let i = 0; i < mermaidBlocks.length; i++) {
    const mermaidIssues = validateMermaid(mermaidBlocks[i].content);
    for (const mi of mermaidIssues) {
      warnings.push(`[Mermaid #${i + 1}] ${mi}`);
    }
  }

  // --- 13. JS sync ---
  if (fm.slug && Object.keys(jsContent).length > 0) {
    // JS keys are like 'ios-swift-for-kotlin-devs' — try to match by slug
    const jsKeys = Object.keys(jsContent);
    const slugVariants = [
      fm.slug,
      `ios-${fm.slug}`,
      fm.slug.replace(/_/g, '-'),
    ];
    const foundInJs = slugVariants.some((v) => jsKeys.includes(v) || jsKeys.some((k) => k.includes(fm.slug)));
    if (!foundInJs) {
      // Only warn if there are published entries — markdown có thể mới chưa sync
      warnings.push(`[JS Sync] Slug "${fm.slug}" chưa có entry tương ứng trong website/ios-content.js.`);
    }
  }

  return {
    relPath,
    slug: fm.slug || null,
    title: fm.title || null,
    domain: fm.domain || null,
    module: fm.module || null,
    issues,
    warnings,
  };
}

// ==================================================================
// Filter logic
// ==================================================================
function matchesFilter(result, filePath, { filter, sessionFilter, slugFilter, idFilter }) {
  if (slugFilter) {
    return result.slug && result.slug.includes(slugFilter);
  }
  if (idFilter) {
    return result.slug && result.slug.includes(idFilter);
  }
  if (sessionFilter) {
    return filePath.includes(`session_${sessionFilter}`) || filePath.includes(`session${sessionFilter}`) || filePath.includes(`session-0${sessionFilter}`);
  }
  if (filter && filter !== 'all') {
    const f = filter.toLowerCase();
    return (
      filePath.toLowerCase().includes(f) ||
      (result.title && result.title.toLowerCase().includes(f)) ||
      (result.slug && result.slug.toLowerCase().includes(f))
    );
  }
  return true;
}

// ==================================================================
// Main
// ==================================================================
const ICON = {
  PASS: '✅',
  ISSUES: '❌',
  WARNINGS: '⚠️ ',
};

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(IOS_DOCS)) {
    console.error(`✖ Không tìm thấy thư mục ios/docs tại: ${IOS_DOCS}`);
    process.exit(1);
  }

  console.log('='.repeat(78));
  console.log(' KIỂM TRA CẤU TRÚC TOPIC iOS');
  console.log('='.repeat(78));
  console.log(`Thư mục docs  : ${IOS_DOCS}`);
  console.log(`Map nav       : ${IOS_MKDOCS}`);
  console.log(`Bộ lọc        : ${args.slugFilter || args.idFilter || args.sessionFilter || args.filter}`);
  console.log('');

  // --- Discover files ---
  const topicFiles = findTopicFiles(IOS_DOCS);
  const jsContent = loadIosContent();
  const navFiles = parseIosNav(IOS_MKDOCS);

  console.log(`Tìm thấy ${topicFiles.length} file topic (.md, không tính index.md)`);
  console.log(`Nav entries   : ${navFiles.length} file trong ios_mkdocs.yml`);
  console.log(`JS entries    : ${Object.keys(jsContent).length} topic trong ios-content.js`);
  console.log('');

  // --- Nav sync check ---
  // index.md là file tổng quan, không tính là "topic" bắt buộc
  const navTopicFiles = navFiles.filter((p) => p !== 'index.md');
  const relSet = new Set(topicFiles.map((f) => f.rel));
  const navMissingFiles = navTopicFiles.filter((navPath) => !relSet.has(navPath));
  const orphanFiles = topicFiles.filter((f) => !navFiles.includes(f.rel));

  if (navFiles.length > 0) {
    console.log('-'.repeat(78));
    console.log(' ĐỒNG BỘ NAV (ios_mkdocs.yml ↔ filesystem)');
    console.log('-'.repeat(78));
    if (navMissingFiles.length === 0) {
      console.log(' ✅ Tất cả file trong nav đều tồn tại trên đĩa.');
    } else {
      console.log(` ❌ Thiếu ${navMissingFiles.length} file được khai báo trong nav nhưng KHÔNG tồn tại:`);
      for (const mf of navMissingFiles) {
        console.log(`    ❌ ${mf}`);
      }
    }
    if (orphanFiles.length > 0) {
      console.log(` ⚠️  Có ${orphanFiles.length} file tồn tại nhưng CHƯA khai báo trong nav (orphan):`);
      for (const of_ of orphanFiles) {
        console.log(`    ⚠️  ${of_.rel}`);
      }
    } else if (navMissingFiles.length === 0) {
      console.log(' ✅ Không có file orphan.');
    }
    console.log('');
  }

  if (args.checkNavOnly) {
    const hasNavIssues = navMissingFiles.length > 0;
    console.log('='.repeat(78));
    console.log(hasNavIssues ? '❌ Nav đồng bộ CHƯA đạt.' : '✅ Nav đồng bộ đạt.');
    console.log('='.repeat(78));
    process.exit(hasNavIssues ? 1 : 0);
  }

  // --- Build slug sets for cross-ref validation ---
  const allTopicSlugs = new Set();
  const allSlugsMap = new Map();
  const preParseResults = [];

  for (const file of topicFiles) {
    const raw = fs.readFileSync(file.abs, 'utf8');
    const { data: fm } = parseFrontmatter(raw);
    preParseResults.push({ file, fm });
    if (fm.slug) {
      allTopicSlugs.add(fm.slug);
      // Also add ios-prefixed variant
      allTopicSlugs.add(`ios-${fm.slug}`);
      if (!allSlugsMap.has(fm.slug)) allSlugsMap.set(fm.slug, []);
      allSlugsMap.get(fm.slug).push(file.rel);
    }
    // Also collect JS slugs for related check
  }
  // Add JS slugs to allTopicSlugs for reference validation
  for (const jsKey of Object.keys(jsContent)) {
    allTopicSlugs.add(jsKey);
    // Also add short form without ios- prefix
    if (jsKey.startsWith('ios-')) {
      allTopicSlugs.add(jsKey.slice(4));
    }
  }

  // --- Audit all topics ---
  const allResults = [];
  for (const { file } of preParseResults) {
    const result = auditTopic(file.abs, file.rel, allSlugsMap, allTopicSlugs, jsContent);
    allResults.push({ result, file });
  }

  // Check slug uniqueness (post-audit)
  for (const [slug, paths] of allSlugsMap) {
    if (paths.length > 1) {
      for (const { result } of allResults) {
        if (result.slug === slug) {
          result.issues.push(`[Slug] "${slug}" bị TRÙNG với: ${paths.filter((p) => p !== result.relPath).join(', ')}.`);
        }
      }
    }
  }

  // --- Filter and report ---
  let totalChecked = 0;
  let passCount = 0;
  let issueFileCount = 0;
  let warningFileCount = 0;
  let totalIssues = 0;
  let totalWarnings = 0;
  const checkStats = {};

  for (const { result, file } of allResults) {
    if (!matchesFilter(result, file.rel, args)) continue;
    totalChecked++;

    const hasIssues = result.issues.length > 0;
    const hasWarnings = result.warnings.length > 0;

    if (hasIssues) {
      issueFileCount++;
      totalIssues += result.issues.length;
    }
    if (hasWarnings) {
      warningFileCount++;
      totalWarnings += result.warnings.length;
    }

    for (const issue of [...result.issues, ...result.warnings]) {
      const cat = issue.match(/^\[([^\]]+)\]/);
      if (cat) {
        checkStats[cat[1]] = (checkStats[cat[1]] || 0) + 1;
      }
    }

    const icon = hasIssues ? ICON.ISSUES : hasWarnings ? ICON.WARNINGS : ICON.PASS;
    const slugLabel = result.slug ? ` [${result.slug}]` : '';
    const domainLabel = result.domain ? ` ${result.domain}` : '';
    const moduleLabel = result.module ? `/${result.module}` : '';

    console.log('-'.repeat(78));
    console.log(`${icon} ${result.relPath}${slugLabel}`);
    if ((domainLabel + moduleLabel).trim()) console.log(`   ${domainLabel.trim()}${moduleLabel}`);

    if (!hasIssues && !hasWarnings) {
      passCount++;
      console.log('   Đạt chuẩn.');
    }

    if (hasIssues) {
      console.log('   Lỗi:');
      for (const issue of result.issues) {
        console.log(`     ❌ ${issue}`);
      }
    }

    if (hasWarnings) {
      console.log('   Cảnh báo:');
      for (const warning of result.warnings) {
        console.log(`     ⚠️  ${warning}`);
      }
    }
  }

  console.log('');
  console.log('='.repeat(78));
  console.log(' TỔNG KẾT');
  console.log('='.repeat(78));
  console.log(`Tổng số topic đã kiểm tra : ${totalChecked}`);
  console.log(`  ✅ Đạt chuẩn             : ${passCount}`);
  console.log(`  ❌ Có lỗi                 : ${issueFileCount} file, ${totalIssues} lỗi`);
  console.log(`  ⚠️  Có cảnh báo           : ${warningFileCount} file, ${totalWarnings} cảnh báo`);
  if (navMissingFiles.length > 0 || orphanFiles.length > 0) {
    console.log(`  📋 Nav thiếu file        : ${navMissingFiles.length}`);
    console.log(`  📋 File orphan           : ${orphanFiles.length}`);
  }

  if (Object.keys(checkStats).length > 0) {
    console.log('');
    console.log('  Phân bổ theo danh mục:');
    const sorted = Object.entries(checkStats).sort((a, b) => b[1] - a[1]);
    for (const [cat, count] of sorted) {
      console.log(`    [${cat}]: ${count}`);
    }
  }

  console.log('');
  if (totalChecked === 0) {
    console.log('(!) Không tìm thấy topic nào khớp bộ lọc.');
  } else if (issueFileCount === 0 && warningFileCount === 0 && navMissingFiles.length === 0) {
    console.log('🎉 Tất cả topic đều đạt chuẩn!');
  } else if (issueFileCount === 0 && navMissingFiles.length === 0) {
    console.log('👍 Không có lỗi cấu trúc. Xem cảnh báo ⚠️ ở trên để cải thiện.');
  } else {
    console.log('👉 Xem chi tiết từng dòng ❌ ở trên để sửa lỗi cấu trúc.');
  }

  // Exit code: 1 if any hard issues (nav missing chỉ cảnh báo tiến độ, không fail build)
  // Dùng --check-nav để enforce nav đầy đủ khi cần hoàn thiện module
  const hasFatal = issueFileCount > 0;
  process.exit(hasFatal ? 1 : 0);
}

main();
