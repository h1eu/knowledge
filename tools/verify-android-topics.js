#!/usr/bin/env node
/**
 * verify-android-topics.js
 * ------------------------------------------------------------------
 * Kiểm tra cấu trúc của các Topic Android trong Knowledge OS.
 *
 * Đối chiếu mỗi file .md trong android/docs/ với chuẩn workflow
 * learn-android.md để phát hiện:
 *
 *   1) Title exists — frontmatter phải có title.
 *   2) ID unique — id phải duy nhất, đúng format dotted.
 *   3) Topic ID valid — format android.<module>.<topic>.
 *   4) Status valid — planned/drafting/reviewing/published/deprecated/archived.
 *   5) Difficulty & depth valid.
 *   6) Estimated reading time exists.
 *   7) learning_outcomes >= 3 — bắt đầu bằng động từ hành động.
 *   8) knowledge_gap exists.
 *   9) Diagram exists — ít nhất 1 Mermaid hoặc text diagram.
 *  10) Code block exists — ít nhất 1 code block có language.
 *  11) Related topic exists — IDs trong prerequisites/related phải
 *      tồn tại trong repo (hoặc cảnh báo).
 *  12) Broken links — internal links phải trỏ đúng file.
 *  13) Mermaid valid — kiểm tra cú pháp Mermaid cơ bản.
 *  14) Quality gate complete — nếu có quality_gate phải đạt complete.
 *  15) Required sections — các section bắt buộc phải có.
 *  16) Learning outcomes sync — frontmatter vs body.
 *  17) Heading structure — H1 duy nhất, tăng tuần tự.
 *
 * KHÔNG cần cài thêm package nào (chỉ dùng Node core: fs, path, vm).
 *
 * Cách chạy:
 *   node tools/verify-android-topics.js                → kiểm tra TẤT CẢ topic
 *   node tools/verify-android-topics.js lifecycle       → topic chứa "lifecycle"
 *   node tools/verify-android-topics.js --session=04    → chỉ session 04
 *   node tools/verify-android-topics.js --id=android.component.activity.lifecycle
 *
 * Trong VS Code: bấm "Run Task" (Cmd+Shift+P → Tasks: Run Task →
 * "Verify Android Topics") hoặc mở panel Run and Debug.
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
const ANDROID_DOCS = path.join(WORKSPACE_ROOT, 'android', 'docs');
const WEBSITE_DIR = path.join(WORKSPACE_ROOT, 'website');

const VALID_STATUSES = ['planned', 'drafting', 'reviewing', 'published', 'deprecated', 'archived'];
const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];
const VALID_DEPTHS = ['overview', 'standard', 'deep-dive'];
const VALID_QUALITY_VALUES = ['none', 'partial', 'complete'];
const QUALITY_METRICS = ['depth', 'correctness', 'examples', 'diagrams', 'system_links'];

const REQUIRED_SECTIONS = [
  'Vấn đề cần giải quyết',
  'Sau khi học xong',
  'Cách hoạt động',
  'Ví dụ thực tế',
  'Sai lầm thường gặp',
  'Kết nối hệ thống',
  'Lịch sử phát triển',
];

const OUTCOME_VERBS = [
  'Giải thích được',
  'Xử lý được',
  'Debug được',
  'Biết khi nào',
  'Phân biệt được',
  'Triển khai được',
  'Áp dụng được',
  'Thiết kế được',
  'Tối ưu được',
  'Nhận diện được',
];

const MIN_OUTCOMES = 3;
const MAX_OUTCOMES = 5;

// Mermaid diagram types cơ bản
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
  let idFilter = null;

  for (const arg of argv) {
    if (arg.startsWith('--session=')) {
      sessionFilter = arg.slice('--session='.length);
    } else if (arg.startsWith('--id=')) {
      idFilter = arg.slice('--id='.length);
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (arg.trim()) {
      filter = arg.trim();
    }
  }
  return { filter, sessionFilter, idFilter };
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
      // Reset folded key on blank lines
      if (!trimmed && foldedKey) {
        currentKey = null;
        foldedKey = null;
      }
      continue;
    }

    // Array item
    if (trimmed.startsWith('- ') && currentKey) {
      const value = trimmed.slice(2).trim();
      if (!currentArray) currentArray = [];
      currentArray.push(value);
      data[currentKey] = currentArray;
      foldedKey = null;
      continue;
    }

    // Key-value
    const kvMatch = trimmed.match(/^(\w[\w_]*):\s*(.*)/);
    if (kvMatch) {
      // Save previous array
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
          ? inner.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
          : [];
        currentKey = null;
        continue;
      }

      // Simple scalar
      data[currentKey] = rawVal.replace(/^['"]|['"]$/g, '');
      currentKey = null;
    } else if (foldedKey) {
      // Continuation of folded scalar
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
  // Match markdown links: [text](path) — exclude external URLs
  return [...md.matchAll(/\[([^\]]*)\]\(([^)]+)\)/g)]
    .map((m) => ({ text: m[1], href: m[2] }))
    .filter((l) => !l.href.startsWith('http') && !l.href.startsWith('#'));
}

function hasDiagram(md) {
  // Check for Mermaid blocks
  if (extractMermaidBlocks(md).length > 0) return true;
  // Check for text-based diagrams (common patterns: boxes, arrows)
  if (/[┌┐└┘│─►▶→←↓↑↕▼△]/.test(md)) return true;
  // Check for ASCII art diagram patterns
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
// Load android-content.js topics
// ==================================================================
function loadAndroidContent() {
  const contentFile = path.join(WEBSITE_DIR, 'android-content.js');
  if (!fs.existsSync(contentFile)) return {};

  const sandbox = { console };
  vm.createContext(sandbox);
  const code = fs.readFileSync(contentFile, 'utf8');
  vm.runInContext(code, sandbox, { filename: contentFile });

  try {
    return vm.runInContext('ANDROID_CONTENT', sandbox) || {};
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

  // Check diagram type
  const hasValidType = MERMAID_TYPES.some((t) =>
    firstLine.startsWith(t) || firstLine.startsWith(t + '-v2')
  );
  if (!hasValidType) {
    issues.push(`Mermaid: không nhận diện được loại diagram ("${firstLine.slice(0, 40)}...").`);
  }

  // Check balanced brackets
  const open = (content.match(/[{(\[]/g) || []).length;
  const close = (content.match(/[})\]]/g) || []).length;
  if (open !== close) {
    issues.push(`Mermaid: ngoặc không cân bằng (mở: ${open}, đóng: ${close}).`);
  }

  return issues;
}

// ==================================================================
// Audit a single topic file
// ==================================================================
function auditTopic(filePath, relPath, allIdsMap, allTopicIds, jsContent) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data: fm, body } = parseFrontmatter(raw);
  const issues = [];
  const warnings = [];

  // --- 1. Title exists ---
  if (!fm.title) {
    issues.push('[Title] Thiếu `title` trong frontmatter.');
  }

  // --- 2 & 3. ID unique & valid ---
  if (!fm.id) {
    issues.push('[ID] Thiếu `id` trong frontmatter.');
  } else {
    // Format: android.<module>.<topic> — at least 3 segments
    const segments = fm.id.split('.');
    if (segments[0] !== 'android') {
      issues.push(`[ID] "${fm.id}" phải bắt đầu bằng "android.".`);
    } else if (segments.length < 3) {
      issues.push(`[ID] "${fm.id}" cần ít nhất 3 cấp (android.<module>.<topic>).`);
    }
    if (/[A-Z\s]/.test(fm.id)) {
      issues.push(`[ID] "${fm.id}" không được chứa chữ hoa hoặc khoảng trắng.`);
    }
    // Uniqueness checked externally via allIdsMap
  }

  // --- summary ---
  if (!fm.summary) {
    issues.push('[Summary] Thiếu `summary` trong frontmatter.');
  }

  // --- 4. Status valid ---
  if (!fm.status) {
    issues.push('[Status] Thiếu `status` trong frontmatter.');
  } else if (!VALID_STATUSES.includes(fm.status)) {
    issues.push(`[Status] "${fm.status}" không hợp lệ. Chấp nhận: ${VALID_STATUSES.join(', ')}.`);
  }

  // --- 5. Difficulty valid ---
  if (!fm.difficulty) {
    issues.push('[Difficulty] Thiếu `difficulty` trong frontmatter.');
  } else if (!VALID_DIFFICULTIES.includes(fm.difficulty)) {
    issues.push(`[Difficulty] "${fm.difficulty}" không hợp lệ. Chấp nhận: ${VALID_DIFFICULTIES.join(', ')}.`);
  }

  // --- 5b. Depth valid ---
  if (!fm.depth) {
    issues.push('[Depth] Thiếu `depth` trong frontmatter.');
  } else if (!VALID_DEPTHS.includes(fm.depth)) {
    issues.push(`[Depth] "${fm.depth}" không hợp lệ. Chấp nhận: ${VALID_DEPTHS.join(', ')}.`);
  }

  // --- 6. Estimated reading time ---
  if (!fm.estimated_reading_time) {
    issues.push('[Reading Time] Thiếu `estimated_reading_time` trong frontmatter.');
  }

  // --- tags ---
  if (!fm.tags || !Array.isArray(fm.tags) || fm.tags.length === 0) {
    issues.push('[Tags] Thiếu `tags` hoặc tags rỗng.');
  }

  // --- 7. Related topic exists ---
  const checkTopicRefs = (fieldName, values) => {
    if (!values || !Array.isArray(values)) return;
    for (const refId of values) {
      if (!refId) continue;
      if (!allTopicIds.has(refId)) {
        warnings.push(`[Related] ${fieldName} "${refId}" không tồn tại trong repo.`);
      }
    }
  };

  if (fm.prerequisites && Array.isArray(fm.prerequisites)) {
    checkTopicRefs('prerequisites', fm.prerequisites);
  }
  if (fm.related && Array.isArray(fm.related)) {
    checkTopicRefs('related', fm.related);
  }

  // --- 4. learning_outcomes >= 3 ---
  if (!fm.learning_outcomes) {
    issues.push('[Outcomes] Thiếu `learning_outcomes` trong frontmatter.');
  } else if (!Array.isArray(fm.learning_outcomes)) {
    issues.push('[Outcomes] `learning_outcomes` phải là array.');
  } else {
    if (fm.learning_outcomes.length < MIN_OUTCOMES) {
      issues.push(`[Outcomes] Chỉ có ${fm.learning_outcomes.length} items (tối thiểu ${MIN_OUTCOMES}).`);
    }
    if (fm.learning_outcomes.length > MAX_OUTCOMES) {
      warnings.push(`[Outcomes] Có ${fm.learning_outcomes.length} items (khuyến nghị tối đa ${MAX_OUTCOMES}).`);
    }
    for (const outcome of fm.learning_outcomes) {
      const startsWithVerb = OUTCOME_VERBS.some((v) => outcome.startsWith(v));
      if (!startsWithVerb) {
        issues.push(`[Outcomes] "${outcome}" không bắt đầu bằng động từ hành động.`);
      }
    }
  }

  // --- knowledge_gap ---
  if (!fm.knowledge_gap) {
    issues.push('[Knowledge Gap] Thiếu `knowledge_gap` trong frontmatter.');
  } else if (typeof fm.knowledge_gap === 'string' && fm.knowledge_gap.trim().length < 10) {
    issues.push('[Knowledge Gap] Quá ngắn — cần mô tả hậu quả cụ thể.');
  }

  // --- 17. Heading structure ---
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

  // --- 15. Required sections ---
  const sectionTexts = headings.filter((h) => h.level === 2).map((h) => h.text);
  for (const required of REQUIRED_SECTIONS) {
    const found = sectionTexts.some(
      (s) => s === required || s.toLowerCase().includes(required.toLowerCase())
    );
    if (!found) {
      issues.push(`[Section] Thiếu section bắt buộc: "## ${required}".`);
    }
  }

  // --- 16. Learning outcomes sync ---
  if (fm.learning_outcomes && Array.isArray(fm.learning_outcomes)) {
    const sauKhiIdx = body.indexOf('## Sau khi học xong');
    if (sauKhiIdx !== -1) {
      const afterSection = body.slice(sauKhiIdx);
      const nextH2 = afterSection.indexOf('\n## ', 1);
      const sectionBody = nextH2 !== -1 ? afterSection.slice(0, nextH2) : afterSection;
      const bodyOutcomes = [...sectionBody.matchAll(/^[-*]\s+(.+)$/gm)].map((m) => m[1].trim());

      for (const fmOutcome of fm.learning_outcomes) {
        const found = bodyOutcomes.some(
          (b) => b === fmOutcome || b.replace(/\.$/, '') === fmOutcome.replace(/\.$/, '')
        );
        if (!found) {
          warnings.push(`[Sync] Learning outcome "${fmOutcome}" có trong frontmatter nhưng KHÔNG có trong section "Sau khi học xong".`);
        }
      }
    }
  }

  // --- 5. Diagram exists ---
  if (!hasDiagram(body)) {
    issues.push('[Diagram] Không tìm thấy diagram nào (Mermaid, text diagram, hoặc ASCII art).');
  }

  // --- 6. Code block exists ---
  if (!hasCodeBlock(body)) {
    issues.push('[Code] Không tìm thấy code block nào (cần ít nhất 1 code block có chỉ định ngôn ngữ).');
  }

  // --- 8. Broken links ---
  const internalLinks = extractInternalLinks(body);
  const baseDir = path.dirname(filePath);
  for (const link of internalLinks) {
    const linkPath = link.href.split('#')[0]; // Remove anchor
    if (!linkPath) continue;
    const resolved = path.resolve(baseDir, linkPath);
    if (!fs.existsSync(resolved)) {
      issues.push(`[Link] Link hỏng: [${link.text}](${link.href}) — file không tồn tại.`);
    }
  }

  // --- 9. Mermaid valid ---
  const mermaidBlocks = extractMermaidBlocks(body);
  for (let i = 0; i < mermaidBlocks.length; i++) {
    const mermaidIssues = validateMermaid(mermaidBlocks[i].content);
    for (const mi of mermaidIssues) {
      warnings.push(`[Mermaid #${i + 1}] ${mi}`);
    }
  }

  // --- 10. Quality gate ---
  // Simple check: if quality_gate fields exist in body text
  const hasQualitySection = body.includes('quality_gate');
  if (hasQualitySection) {
    // Check if any metric is not 'complete'
    for (const metric of QUALITY_METRICS) {
      const match = body.match(new RegExp(`${metric}:\\s*(\\w[\\w-]*)`));
      if (match && match[1] !== 'complete') {
        warnings.push(`[Quality] ${metric}: "${match[1]}" — chưa đạt complete.`);
      }
    }
  }

  // --- JS sync ---
  if (fm.id && Object.keys(jsContent).length > 0) {
    if (!jsContent[fm.id]) {
      if (fm.status === 'published') {
        warnings.push(`[JS Sync] Topic "${fm.id}" có status=published nhưng CHƯA có entry trong android-content.js.`);
      }
    }
  }

  return {
    relPath,
    id: fm.id || null,
    title: fm.title || null,
    status: fm.status || null,
    difficulty: fm.difficulty || null,
    depth: fm.depth || null,
    issues,
    warnings,
  };
}

// ==================================================================
// Filter logic
// ==================================================================
function matchesFilter(result, filePath, { filter, sessionFilter, idFilter }) {
  if (idFilter) {
    return result.id && result.id.includes(idFilter);
  }
  if (sessionFilter) {
    return filePath.includes(`session_${sessionFilter}`) || filePath.includes(`session${sessionFilter}`);
  }
  if (filter && filter !== 'all') {
    const f = filter.toLowerCase();
    return (
      filePath.toLowerCase().includes(f) ||
      (result.title && result.title.toLowerCase().includes(f)) ||
      (result.id && result.id.toLowerCase().includes(f))
    );
  }
  return true;
}

// ==================================================================
// Report
// ==================================================================
const ICON = {
  PASS: '✅',
  ISSUES: '❌',
  WARNINGS: '⚠️ ',
};

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(ANDROID_DOCS)) {
    console.error(`✖ Không tìm thấy thư mục android/docs tại: ${ANDROID_DOCS}`);
    process.exit(1);
  }

  console.log('='.repeat(78));
  console.log(' KIỂM TRA CẤU TRÚC TOPIC ANDROID');
  console.log('='.repeat(78));
  console.log(`Thư mục docs  : ${ANDROID_DOCS}`);
  console.log(`Bộ lọc        : ${args.idFilter || args.sessionFilter || args.filter}`);
  console.log('');

  // --- Discover files and build ID set ---
  const topicFiles = findTopicFiles(ANDROID_DOCS);
  const jsContent = loadAndroidContent();

  console.log(`Tìm thấy ${topicFiles.length} file topic (.md, không tính index.md)`);
  console.log(`JS content entries: ${Object.keys(jsContent).length}`);
  console.log('');

  // Pre-parse all frontmatters to collect IDs (for related topic validation)
  const allTopicIds = new Set();
  const allIdsMap = new Map(); // id → [relPath, ...]
  const preParseResults = [];

  for (const file of topicFiles) {
    const raw = fs.readFileSync(file.abs, 'utf8');
    const { data: fm } = parseFrontmatter(raw);
    preParseResults.push({ file, fm });
    if (fm.id) {
      allTopicIds.add(fm.id);
      if (!allIdsMap.has(fm.id)) allIdsMap.set(fm.id, []);
      allIdsMap.get(fm.id).push(file.rel);
    }
  }

  // --- Audit all topics ---
  const allResults = [];
  for (const { file } of preParseResults) {
    const result = auditTopic(file.abs, file.rel, allIdsMap, allTopicIds, jsContent);
    allResults.push({ result, file });
  }

  // Check ID uniqueness (post-audit)
  for (const [id, paths] of allIdsMap) {
    if (paths.length > 1) {
      for (const { result } of allResults) {
        if (result.id === id) {
          result.issues.push(`[ID] "${id}" bị TRÙNG với: ${paths.filter((p) => p !== result.relPath).join(', ')}.`);
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

  // Summary per check category
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

    // Collect stats per check category
    for (const issue of [...result.issues, ...result.warnings]) {
      const cat = issue.match(/^\[([^\]]+)\]/);
      if (cat) {
        checkStats[cat[1]] = (checkStats[cat[1]] || 0) + 1;
      }
    }

    const icon = hasIssues ? ICON.ISSUES : hasWarnings ? ICON.WARNINGS : ICON.PASS;
    const idLabel = result.id ? ` [${result.id}]` : '';
    const statusLabel = result.status ? ` (${result.status})` : '';
    const diffLabel = result.difficulty ? ` ${result.difficulty}` : '';
    const depthLabel = result.depth ? ` ${result.depth}` : '';
    const meta = [statusLabel, diffLabel, depthLabel].filter(Boolean).join(' ·');

    console.log('-'.repeat(78));
    console.log(`${icon} ${result.relPath}${idLabel}`);
    if (meta.trim()) console.log(`   ${meta.trim()}`);

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
  } else if (issueFileCount === 0 && warningFileCount === 0) {
    console.log('🎉 Tất cả topic đều đạt chuẩn!');
  } else if (issueFileCount === 0) {
    console.log('👍 Không có lỗi cấu trúc. Xem cảnh báo ⚠️ ở trên để cải thiện.');
  } else {
    console.log('👉 Xem chi tiết từng dòng ❌ ở trên để sửa lỗi cấu trúc.');
  }

  process.exit(issueFileCount > 0 ? 1 : 0);
}

main();
