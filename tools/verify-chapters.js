#!/usr/bin/env node
/**
 * verify-chapters.js
 * ------------------------------------------------------------------
 * Công cụ đối chiếu nội dung đã dịch (website/dsa-content*.js) với
 * nội dung gốc tiếng Anh (hello-algo `docs/**\/*.md`, dẫn dắt bởi mkdocs.yml)
 * để phát hiện phần còn THIẾU trong từng chương, VÀ kiểm tra CHẤT LƯỢNG dịch:
 *   1) Đầy đủ nội dung: heading, ảnh, hàm mã nguồn ([file]{}-[class]{}-[func]{}
 *      refs), độ đầy đủ của `originalContent` (bản gốc y nguyên).
 *   2) Chất lượng code: code-tab đã dịch có thực sự MÔ PHỎNG code gốc không —
 *      phát hiện placeholder/code giả (ví dụ comment "not found"/"chưa có")
 *      và cảnh báo khi code dịch bị rút gọn bất thường so với thân hàm gốc
 *      (đối chiếu trực tiếp với hello-algo/en/codes/<lang>/<chapter>/*).
 *   3) Ảnh minh họa step-by-step: mỗi chuỗi ảnh "<ten>_step1/2/3..." phải có
 *      ĐỦ các bước, hiển thị ĐÚNG THỨ TỰ tăng dần trên trang, và file ảnh
 *      phải THỰC SỰ tồn tại trong website/dsa-assets/ (phát hiện link hỏng).
 *
 * KHÔNG cần cài thêm package nào (chỉ dùng Node core: fs, path, vm).
 *
 * Cách chạy:
 *   node tools/verify-chapters.js                     → kiểm tra TẤT CẢ chương
 *   node tools/verify-chapters.js 4                    → chỉ chương có "Chapter 4" trong tiêu đề
 *   node tools/verify-chapters.js chapter_array_and_linkedlist
 *   node tools/verify-chapters.js --chapter=5 --source=/duong/dan/khac/hello-algo/en
 *
 * Biến môi trường HELLO_ALGO_ROOT cũng có thể dùng để đổi đường dẫn gốc thay vì --source=.
 * Mặc định trỏ tới: /Users/hazu/Desktop/dsa/hello-algo/en
 *
 * Trong VS Code: bấm "Run Task" (Cmd+Shift+P → Tasks: Run Task → "Verify DSA Chapters")
 * hoặc mở panel Run and Debug rồi chọn cấu hình "Verify DSA Chapters".
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
const WEBSITE_DIR = path.join(WORKSPACE_ROOT, 'website');
const DEFAULT_SOURCE_ROOT = '/Users/hazu/Desktop/dsa/hello-algo/en';

const MATCH_THRESHOLD = 0.5; // dưới ngưỡng này coi như "chưa chuyển đổi"
const CONFIDENT_THRESHOLD = 0.85; // trên ngưỡng này coi là khớp chắc chắn

// ==================================================================
// CLI args
// ==================================================================
function parseArgs(argv) {
  let chapterFilter = 'all';
  let sourceRoot = process.env.HELLO_ALGO_ROOT || DEFAULT_SOURCE_ROOT;
  for (const arg of argv) {
    if (arg.startsWith('--source=')) {
      sourceRoot = arg.slice('--source='.length);
    } else if (arg.startsWith('--chapter=')) {
      chapterFilter = arg.slice('--chapter='.length);
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (arg.trim()) {
      chapterFilter = arg.trim();
    }
  }
  return { chapterFilter, sourceRoot };
}

function printHelp() {
  console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0]);
}

// ==================================================================
// mkdocs.yml nav parser (generic, no YAML dependency needed)
// ==================================================================
function parseMkdocsNav(mkdocsPath) {
  const lines = fs.readFileSync(mkdocsPath, 'utf8').split('\n');
  let inNav = false;
  const chapters = [];
  let current = null;

  for (const raw of lines) {
    if (/^nav:\s*$/.test(raw)) {
      inNav = true;
      continue;
    }
    if (!inNav) continue;
    if (!raw.trim()) continue;

    const indent = raw.match(/^(\s*)/)[1].length;
    const trimmed = raw.trim();
    if (trimmed.startsWith('#')) continue; // icon comment lines
    if (!trimmed.startsWith('-')) continue;

    const item = trimmed.slice(1).trim();

    if (indent === 2) {
      current = { title: item.replace(/:\s*$/, ''), files: [] };
      chapters.push(current);
    } else if (indent >= 4 && current) {
      const m = item.match(/^(.*?):\s*(\S+\.md)\s*$/);
      let label = null;
      let relPath;
      if (m) {
        label = m[1].trim();
        relPath = m[2].trim();
      } else if (item.endsWith('.md')) {
        relPath = item.trim();
      }
      if (relPath) current.files.push({ label, relPath });
    }
  }
  return chapters;
}

function chapterFolder(chapter) {
  if (!chapter.files.length) return null;
  return path.dirname(chapter.files[0].relPath);
}

function chapterMatchesFilter(chapter, filter) {
  if (!filter || filter.toLowerCase() === 'all') return true;
  const f = filter.trim();
  // Pure numeric filter (e.g. "4") must match the chapter number exactly,
  // otherwise "4" would also match "Chapter 14", "Chapter 24", etc.
  if (/^\d+$/.test(f)) {
    return new RegExp('^Chapter\\s+' + f + '\\b', 'i').test(chapter.title);
  }
  const folder = chapterFolder(chapter) || '';
  const fLower = f.toLowerCase();
  if (folder.toLowerCase().includes(fLower)) return true;
  if (chapter.title.toLowerCase().includes(fLower)) return true;
  return false;
}

// ==================================================================
// Load all translated DSA_CONTENT topics the same way the browser does
// (sequential <script> execution sharing one global scope), by reading
// the exact script order straight out of index.html.
// ==================================================================
function loadDsaContent() {
  const indexHtml = fs.readFileSync(path.join(WEBSITE_DIR, 'index.html'), 'utf8');
  const scriptSrcs = [...indexHtml.matchAll(/<script src="([^"]+\.js)"><\/script>/g)].map((m) => m[1]);
  const contentFiles = scriptSrcs.filter((s) => /^dsa-content.*\.js$/.test(s));

  const sandbox = { console };
  vm.createContext(sandbox);
  for (const f of contentFiles) {
    const filePath = path.join(WEBSITE_DIR, f);
    const code = fs.readFileSync(filePath, 'utf8');
    vm.runInContext(code, sandbox, { filename: filePath });
  }
  // NOTE: `const DSA_CONTENT = {}` in a vm-contextified sandbox does NOT become
  // an own/enumerable property of the sandbox object (only `var`/function decls do).
  // Evaluate the bare identifier in the same context to retrieve the live binding.
  const dsaContent = vm.runInContext('DSA_CONTENT', sandbox);
  return { content: dsaContent || {}, files: contentFiles };
}

// ==================================================================
// Text utilities
// ==================================================================
function normalizeWhitespace(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function wordSet(text) {
  const words = normalizeWhitespace(text).toLowerCase().match(/[a-z0-9_]+/g) || [];
  return new Set(words);
}

function jaccard(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let inter = 0;
  for (const w of setA) if (setB.has(w)) inter++;
  const union = setA.size + setB.size - inter;
  return union === 0 ? 0 : inter / union;
}

function extractMdHeadings(md) {
  return [...md.matchAll(/^(#{1,4})\s+(.+)$/gm)].map((m) => ({ level: m[1].length, text: m[2].trim() }));
}

function extractMdImages(md) {
  return [...md.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => path.basename(m[1].split(/[?#]/)[0]));
}

function extractFuncRefs(md) {
  const set = new Set();
  for (const m of md.matchAll(/\[file\]\{([^}]*)\}-\[class\]\{([^}]*)\}-\[func\]\{([^}]+)\}/g)) {
    set.add(m[3].trim());
  }
  return [...set];
}

function extractHtmlHeadings(html) {
  return [...html.matchAll(/<h[234]>([^<]*)<\/h[234]>/g)].map((m) => m[1].trim());
}

function extractHtmlImages(html) {
  return [...html.matchAll(/src="dsa-assets\/([^"]+)"/g)].map((m) => m[1]);
}

function htmlContainsWord(html, word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('\\b' + escaped + '\\b', 'i').test(html);
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

// ==================================================================
// Ảnh thực tế trên đĩa (dsa-assets/) — phát hiện link ảnh hỏng
// ==================================================================
const ASSETS_DIR = path.join(WEBSITE_DIR, 'dsa-assets');
let assetFilesCache = null;
function assetExists(filename) {
  if (!assetFilesCache) {
    assetFilesCache = new Set(fs.existsSync(ASSETS_DIR) ? fs.readdirSync(ASSETS_DIR) : []);
  }
  return assetFilesCache.has(filename);
}

// ==================================================================
// Chuỗi ảnh minh họa từng bước (step-by-step), ví dụ:
//   array_stack_step1.png, array_stack_step2_push.png, array_stack_step3_pop.png
// Cần kiểm tra: (a) đủ tất cả các bước, (b) hiển thị đúng THỨ TỰ tăng dần
// trên trang (không bị đảo lộn khi chèn vào HTML).
// ==================================================================
const STEP_IMG_RE = /^(.+?)_step(\d+)(?:_.*)?\.(png|jpe?g|gif|svg|webp)$/i;

function groupStepSequences(images) {
  const groups = new Map(); // prefix -> [{ num, filename }]
  for (const img of images) {
    const m = img.match(STEP_IMG_RE);
    if (!m) continue;
    const prefix = m[1].toLowerCase();
    if (!groups.has(prefix)) groups.set(prefix, []);
    groups.get(prefix).push({ num: parseInt(m[2], 10), filename: img });
  }
  return groups;
}

// Một chuỗi ảnh step-by-step chỉ thực sự "được mô phỏng" nếu nó nằm bên trong
// (hoặc đủ gần) một widget tương tác thật (`interactive-widget-wrapper` — quy
// ước dùng ở ch04/ch05, có nút Auto Run/Bước tiếp theo/Reset). Nếu KHÔNG, và
// các ảnh của cùng 1 chuỗi bị dồn cạnh nhau trong cùng một khối (khoảng cách
// ký tự nhỏ — kiểu <div style="display:flex">img,img,img</div> liệt kê hết
// một lần), thì đó là hiển thị TĨNH toàn bộ cùng lúc — đúng vấn đề người dùng
// phản ánh ở mục 5.1.3: "trạng thái rõ ràng nên hiển thị step-by-step/mô
// phỏng, không phải hiển thị toàn bộ trong 1 lần".
const STATIC_CLUSTER_THRESHOLD = 1000; // khoảng cách ký tự tối đa để coi là "cùng một khối ảnh tĩnh"

// Ước lượng vùng "phạm vi" của mỗi interactive-widget-wrapper trong HTML: từ
// vị trí mở thẻ tới heading H2/H3 tiếp theo (hoặc wrapper tiếp theo), lấy cái
// nào đến trước — không cần parser HTML thật, chỉ cần đủ chính xác để biết
// một cụm ảnh có nằm "trong phạm vi" 1 widget hay không.
function findWidgetWindows(html) {
  const starts = [...html.matchAll(/<div class="interactive-widget-wrapper"/g)].map((m) => m.index);
  if (!starts.length) return [];
  const headingPositions = [...html.matchAll(/<h[23]>/g)].map((m) => m.index);
  return starts.map((start, i) => {
    const nextWrapperStart = starts[i + 1] ?? Infinity;
    const nextHeading = headingPositions.find((p) => p > start) ?? Infinity;
    const end = Math.min(nextWrapperStart, nextHeading, html.length);
    return [start, end];
  });
}

function isWithinAnyWindow(pos, windows) {
  return windows.some(([s, e]) => pos >= s && pos <= e);
}

// ==================================================================
// Đối chiếu code-tab đã dịch với mã nguồn THẬT trong hello-algo (không chỉ
// kiểm tra tên hàm xuất hiện dưới dạng chuỗi — điều này từng bỏ lọt một
// comment giả `// Function linear_recur not found`). Kiểm tra:
//   (a) dòng chứa tên hàm/lớp có phải là placeholder/giả không.
//   (b) độ dài code dịch có bị RÚT GỌN bất thường so với mã nguồn gốc không.
// ==================================================================
const LANG_EXT = {
  python: 'py',
  cpp: 'cpp',
  java: 'java',
  javascript: 'js',
  typescript: 'ts',
  kotlin: 'kt',
  c: 'c',
  csharp: 'cs',
  dart: 'dart',
  go: 'go',
  ruby: 'rb',
  rust: 'rs',
  swift: 'swift',
};

const PLACEHOLDER_RE =
  /not found|not implemented|no such function|to\s*-?\s*be\s*implemented|coming soon|placeholder|chưa (tìm thấy|triển khai|hỗ trợ|có)|không tìm thấy/i;

function countNonBlankLines(text) {
  return text.split('\n').filter((l) => l.trim().length > 0).length;
}

// Trích toàn bộ nội dung các khối <pre data-lang="X"><code>...</code></pre>
// của một ngôn ngữ trong HTML đã dịch (có thể có nhiều khối trong 1 topic).
function extractCodeBlocks(html, lang) {
  const escapedLang = lang.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('<pre data-lang="' + escapedLang + '"><code>([\\s\\S]*?)</code></pre>', 'g');
  const blocks = [];
  let m;
  while ((m = re.exec(html))) blocks.push(decodeHtmlEntities(m[1]));
  return blocks;
}

// Tìm định nghĩa hàm/phương thức tên `name` trong TOÀN BỘ file mã nguồn của
// một ngôn ngữ, trong đúng thư mục chương (hello-algo/en/codes/<lang>/<chapterFolder>/),
// rồi trích thân hàm để đếm số dòng "thật" (dùng làm mốc so sánh).
// Trả về số dòng lớn nhất tìm được (một tên hàm có thể lặp lại ở nhiều file,
// ví dụ push()/pop() xuất hiện cả ở bản mảng lẫn bản danh sách liên kết).
function findSourceDefLineCount(sourceRoot, lang, chapterFolderName, name) {
  const ext = LANG_EXT[lang];
  if (!ext || !chapterFolderName) return null;
  const dir = path.join(sourceRoot, 'codes', lang, chapterFolderName);
  if (!fs.existsSync(dir)) return null;
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const isPython = lang === 'python';
  const defRe = isPython
    ? new RegExp('^(\\s*)def\\s+' + escapedName + '\\s*\\(')
    : new RegExp('\\b' + escapedName + '\\s*\\([^;{}]*\\)\\s*(?::\\s*[\\w<>\\[\\],. ]+)?\\s*\\{?\\s*$');

  let best = null;
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.' + ext)) continue;
    const lines = fs.readFileSync(path.join(dir, file), 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (!defRe.test(lines[i])) continue;
      let bodyLines = [lines[i]];
      if (isPython) {
        const indent = (lines[i].match(/^(\s*)/) || ['', ''])[1].length;
        for (let j = i + 1; j < lines.length; j++) {
          if (!lines[j].trim()) {
            bodyLines.push(lines[j]);
            continue;
          }
          const lIndent = (lines[j].match(/^(\s*)/) || ['', ''])[1].length;
          if (lIndent <= indent) break;
          bodyLines.push(lines[j]);
        }
      } else {
        let depth = (lines[i].match(/\{/g) || []).length - (lines[i].match(/\}/g) || []).length;
        for (let j = i + 1; j < lines.length && depth > 0; j++) {
          bodyLines.push(lines[j]);
          depth += (lines[j].match(/\{/g) || []).length - (lines[j].match(/\}/g) || []).length;
        }
      }
      const count = countNonBlankLines(bodyLines.join('\n'));
      if (best === null || count > best) best = count;
    }
  }
  return best;
}

// ==================================================================
// Matching a source .md file to its best-candidate translated topic
// ==================================================================
function buildTopicIndex(dsaContent) {
  const topics = [];
  for (const [id, t] of Object.entries(dsaContent)) {
    const hasOriginal = typeof t.originalContent === 'string' && t.originalContent.trim().length > 0;
    topics.push({
      id,
      title: t.title,
      content: t.content || '',
      originalContent: t.originalContent || '',
      hasOriginal,
      wordSetCache: hasOriginal ? wordSet(t.originalContent) : null,
    });
  }
  return topics;
}

function bestMatch(mdText, topics) {
  const mdSet = wordSet(mdText);
  let best = null;
  let bestScore = 0;
  for (const t of topics) {
    if (!t.hasOriginal) continue;
    const score = jaccard(mdSet, t.wordSetCache);
    if (score > bestScore) {
      bestScore = score;
      best = t;
    }
  }
  return { topic: best, score: bestScore };
}

// ==================================================================
// Per-file structural audit
// ==================================================================
function auditFile(mdAbsPath, relPath, topics, sourceRoot, chapterFolderName) {
  if (!fs.existsSync(mdAbsPath)) {
    return { status: 'MISSING_SOURCE', relPath, message: 'File nguồn không tồn tại (đường dẫn mkdocs sai?)' };
  }
  const md = fs.readFileSync(mdAbsPath, 'utf8');
  const { topic, score } = bestMatch(md, topics);

  if (!topic || score < MATCH_THRESHOLD) {
    return { status: 'NOT_CONVERTED', relPath, score };
  }

  const issues = [];
  let qualityIssueCount = 0;

  // Heading coverage (H2+H3+H4 in source vs <h2>-<h4> in translated content)
  const mdHeadings = extractMdHeadings(md).filter((h) => h.level >= 2);
  const htmlHeadings = extractHtmlHeadings(topic.content);
  if (htmlHeadings.length < mdHeadings.length) {
    issues.push(`Thiếu heading: gốc có ${mdHeadings.length} mục (##/###), bản dịch chỉ có ${htmlHeadings.length}.`);
  }

  // Images: thiếu ảnh so với gốc
  const mdImages = extractMdImages(md);
  const htmlImagesList = extractHtmlImages(topic.content); // giữ nguyên thứ tự xuất hiện trên trang
  const htmlImagesSet = new Set(htmlImagesList);
  const missingImages = mdImages.filter((img) => !htmlImagesSet.has(img));
  if (missingImages.length) {
    issues.push(`Thiếu ảnh: ${[...new Set(missingImages)].join(', ')}`);
  }

  // Images: link hỏng — ảnh được nhúng trong bản dịch nhưng file không tồn tại
  // thực tế trong dsa-assets/ (ví dụ tên file bị gõ sai/bịa ra).
  const brokenImages = [...new Set(htmlImagesList)].filter((img) => !assetExists(img));
  if (brokenImages.length) {
    issues.push(`Ảnh LINK HỎNG (không có file thật trong dsa-assets/): ${brokenImages.join(', ')}`);
    qualityIssueCount++;
  }

  // Images: chuỗi ảnh minh họa từng bước (step-by-step) — phải đủ bước và
  // hiển thị đúng thứ tự tăng dần trên trang.
  const stepGroups = groupStepSequences(mdImages);
  const widgetWindows = findWidgetWindows(topic.content);
  for (const [prefix, steps] of stepGroups) {
    const sortedSteps = [...steps].sort((a, b) => a.num - b.num);
    const positions = [];
    const missingSteps = [];
    for (const s of sortedSteps) {
      const pos = htmlImagesList.indexOf(s.filename);
      if (pos === -1) missingSteps.push(`bước ${s.num} (${s.filename})`);
      else positions.push({ num: s.num, pos });
    }
    if (missingSteps.length) {
      issues.push(`Thiếu ảnh trong chuỗi step-by-step "${prefix}": ${missingSteps.join(', ')}`);
      qualityIssueCount++;
    } else {
      let ordered = true;
      for (let i = 1; i < positions.length; i++) {
        if (positions[i].pos < positions[i - 1].pos) {
          ordered = false;
          break;
        }
      }
      if (!ordered) {
        issues.push(
          `Ảnh chuỗi step-by-step "${prefix}" hiển thị SAI THỨ TỰ trên trang (không tăng dần theo bước 1→${sortedSteps[sortedSteps.length - 1].num}).`
        );
        qualityIssueCount++;
      }
    }

    // Hiển thị TĨNH toàn bộ cùng lúc thay vì mô phỏng tương tác: nếu >= 2 ảnh
    // của cùng 1 chuỗi bước nằm sát nhau trong HTML (cùng một khối liệt kê ảnh
    // cạnh nhau) MÀ không nằm trong phạm vi 1 interactive-widget-wrapper nào,
    // thì đây chính là kiểu "xem một lần cho đủ N bước, khó quan sát trạng
    // thái chuyển đổi" — nên có widget mô phỏng (Auto Run/Bước tiếp theo).
    if (sortedSteps.length >= 2 && !missingSteps.length) {
      const charPositions = sortedSteps.map((s) => topic.content.indexOf('dsa-assets/' + s.filename));
      if (charPositions.every((p) => p !== -1)) {
        const span = Math.max(...charPositions) - Math.min(...charPositions);
        const clustered = span < STATIC_CLUSTER_THRESHOLD;
        const coveredByWidget = charPositions.every((p) => isWithinAnyWindow(p, widgetWindows));
        if (clustered && !coveredByWidget) {
          issues.push(
            `Chuỗi ảnh step-by-step "${prefix}" (bước 1→${sortedSteps[sortedSteps.length - 1].num}) đang hiển thị TĨNH toàn bộ CÙNG LÚC (liệt kê ảnh cạnh nhau), KHÔNG có mô phỏng tương tác (interactive-widget-wrapper) đi kèm — khó quan sát trạng thái chuyển đổi từng bước, nên bổ sung widget step/Auto Run như quy ước đã dùng ở các phần khác.`
          );
          qualityIssueCount++;
        }
      }
    }
  }

  // Code function references ([src] blocks)
  const funcRefs = extractFuncRefs(md);
  const missingFuncs = funcRefs.filter((fn) => !htmlContainsWord(topic.content, fn));
  if (missingFuncs.length) {
    issues.push(`Thiếu code cho hàm: ${missingFuncs.join(', ')}`);
  }

  // Chất lượng code: đối chiếu code-tab đã dịch với mã nguồn THẬT để phát
  // hiện placeholder/code giả hoặc bị rút gọn bất thường so với bản gốc.
  const presentFuncs = funcRefs.filter((fn) => !missingFuncs.includes(fn));
  const usedLangs = [...new Set([...topic.content.matchAll(/data-lang="([a-z]+)"/g)].map((m) => m[1]))].filter(
    (l) => LANG_EXT[l]
  );
  for (const fn of presentFuncs) {
    for (const lang of usedLangs) {
      const blocks = extractCodeBlocks(topic.content, lang);
      const matchingBlocks = blocks.filter((b) => htmlContainsWord(b, fn));
      if (!matchingBlocks.length) continue; // hàm không hiển thị ở ngôn ngữ này (bộ ngôn ngữ chọn lọc), bỏ qua

      // Kiểm tra TẤT CẢ các dòng chứa tên hàm (không chỉ dòng đầu tiên tìm thấy)
      // — một block khác hợp lệ có thể vô tình nhắc tới tên hàm trong comment
      // (vd. "// Temporary data (constant)"), che khuất placeholder giả ở
      // một block khác nếu chỉ xét dòng khớp đầu tiên.
      const candidateLines = matchingBlocks
        .join('\n')
        .split('\n')
        .filter((l) => htmlContainsWord(l, fn));
      const placeholderLine = candidateLines.find((l) => PLACEHOLDER_RE.test(l));
      if (placeholderLine) {
        issues.push(
          `Code "${fn}" (${lang}) có vẻ là PLACEHOLDER/GIẢ, không mô phỏng code gốc (dòng: "${placeholderLine.trim()}").`
        );
        qualityIssueCount++;
        continue;
      }

      // Ước lượng độ dài code dịch bằng block DÀI NHẤT trong các block khớp
      // (nhiều khả năng là thân hàm thật, tránh bị pha loãng bởi các block
      // khác chỉ nhắc tên hàm trong comment).
      const longestBlock = matchingBlocks.reduce((a, b) => (countNonBlankLines(b) > countNonBlankLines(a) ? b : a));
      const sourceLineCount = findSourceDefLineCount(sourceRoot, lang, chapterFolderName, fn);
      const translatedLineCount = countNonBlankLines(longestBlock);
      if (sourceLineCount && sourceLineCount >= 4 && translatedLineCount < sourceLineCount * 0.35) {
        issues.push(
          `Code "${fn}" (${lang}) có vẻ bị RÚT GỌN quá nhiều so với gốc (~${translatedLineCount} dòng dịch so với ~${sourceLineCount} dòng gốc).`
        );
        qualityIssueCount++;
      }
    }
  }

  // originalContent completeness (should be verbatim copy of the source file)
  const mdNormLen = normalizeWhitespace(md).length;
  const origNormLen = normalizeWhitespace(topic.originalContent).length;
  const origRatio = mdNormLen === 0 ? 1 : origNormLen / mdNormLen;
  if (origRatio < 0.9) {
    issues.push(`originalContent có vẻ bị CẮT BỚT so với bản gốc (${Math.round(origRatio * 100)}% độ dài).`);
  }

  let status = 'OK';
  if (score < CONFIDENT_THRESHOLD) {
    status = 'UNCERTAIN_MATCH';
  } else if (issues.length) {
    status = 'PARTIAL';
  }

  return { status, relPath, topicId: topic.id, score, issues, qualityIssueCount };
}

// ==================================================================
// Report rendering
// ==================================================================
const ICON = {
  OK: '✅',
  PARTIAL: '⚠️ ',
  UNCERTAIN_MATCH: '❓',
  NOT_CONVERTED: '❌',
  MISSING_SOURCE: '🚫',
};

function main() {
  const { chapterFilter, sourceRoot } = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(sourceRoot)) {
    console.error(`✖ Không tìm thấy thư mục nguồn hello-algo tại: ${sourceRoot}`);
    console.error('  Dùng --source=/duong/dan/hello-algo/en hoặc biến môi trường HELLO_ALGO_ROOT để chỉ định lại.');
    process.exit(1);
  }
  const mkdocsPath = path.join(sourceRoot, 'mkdocs.yml');
  if (!fs.existsSync(mkdocsPath)) {
    console.error(`✖ Không tìm thấy mkdocs.yml tại: ${mkdocsPath}`);
    process.exit(1);
  }

  console.log('='.repeat(78));
  console.log(' KIỂM TRA ĐỐI CHIẾU NỘI DUNG DỊCH vs. HELLO-ALGO GỐC');
  console.log('='.repeat(78));
  console.log(`Nguồn gốc     : ${sourceRoot}`);
  console.log(`Website       : ${WEBSITE_DIR}`);
  console.log(`Bộ lọc chương : ${chapterFilter}`);
  console.log('');

  const chapters = parseMkdocsNav(mkdocsPath);
  const { content: dsaContent, files: loadedFiles } = loadDsaContent();
  const topics = buildTopicIndex(dsaContent);

  console.log(`Đã nạp ${loadedFiles.length} file nội dung (${loadedFiles.join(', ')})`);
  console.log(`Tổng số topic trong DSA_CONTENT: ${topics.length}`);
  const topicsWithoutOriginal = topics.filter((t) => !t.hasOriginal);
  console.log(`Topic THIẾU originalContent (bản gốc): ${topicsWithoutOriginal.length}`);
  if (topicsWithoutOriginal.length) {
    console.log('  → ' + topicsWithoutOriginal.map((t) => t.id).join(', '));
  }
  console.log('');

  const filtered = chapters.filter((c) => chapterMatchesFilter(c, chapterFilter));
  if (!filtered.length) {
    console.log(`(!) Không có chương nào khớp bộ lọc "${chapterFilter}".`);
    return;
  }

  let totalFiles = 0;
  let okCount = 0;
  let partialCount = 0;
  let uncertainCount = 0;
  let notConvertedCount = 0;
  let qualityIssueFileCount = 0;
  let qualityIssueTotal = 0;

  for (const chapter of filtered) {
    console.log('-'.repeat(78));
    console.log(`📘 ${chapter.title}  (${chapterFolder(chapter) || '?'})`);
    console.log('-'.repeat(78));

    for (const file of chapter.files) {
      totalFiles++;
      const abs = path.join(sourceRoot, 'docs', file.relPath);
      const result = auditFile(abs, file.relPath, topics, sourceRoot, chapterFolder(chapter));
      const icon = ICON[result.status] || '?';
      const label = file.label ? `${file.label} ` : '';
      if (result.qualityIssueCount) {
        qualityIssueFileCount++;
        qualityIssueTotal += result.qualityIssueCount;
      }

      switch (result.status) {
        case 'OK':
          okCount++;
          console.log(`  ${icon} ${label}(${file.relPath}) → khớp "${result.topicId}" (điểm ${(result.score * 100).toFixed(0)}%), đầy đủ.`);
          break;
        case 'PARTIAL':
          partialCount++;
          console.log(`  ${icon} ${label}(${file.relPath}) → khớp "${result.topicId}" (điểm ${(result.score * 100).toFixed(0)}%), CÒN THIẾU:`);
          for (const issue of result.issues) console.log(`       - ${issue}`);
          break;
        case 'UNCERTAIN_MATCH':
          uncertainCount++;
          console.log(`  ${icon} ${label}(${file.relPath}) → khớp KHÔNG CHẮC CHẮN với "${result.topicId}" (điểm ${(result.score * 100).toFixed(0)}%), cần soát lại thủ công.`);
          if (result.issues && result.issues.length) {
            for (const issue of result.issues) console.log(`       - ${issue}`);
          }
          break;
        case 'NOT_CONVERTED':
          notConvertedCount++;
          console.log(`  ${icon} ${label}(${file.relPath}) → CHƯA TÌM THẤY bản dịch tương ứng trên site (điểm khớp cao nhất chỉ ${(result.score * 100).toFixed(0)}%).`);
          break;
        case 'MISSING_SOURCE':
          console.log(`  ${icon} ${label}(${file.relPath}) → ${result.message}`);
          break;
        default:
          console.log(`  ? ${label}(${file.relPath}) → không xác định.`);
      }
    }
    console.log('');
  }

  console.log('='.repeat(78));
  console.log(' TỔNG KẾT');
  console.log('='.repeat(78));
  console.log(`Tổng số file nguồn đã kiểm tra : ${totalFiles}`);
  console.log(`  ✅ Đầy đủ                    : ${okCount}`);
  console.log(`  ⚠️  Còn thiếu một phần        : ${partialCount}`);
  console.log(`  ❓ Khớp không chắc chắn       : ${uncertainCount}`);
  console.log(`  ❌ Chưa chuyển đổi            : ${notConvertedCount}`);
  console.log(`  🔎 File có cảnh báo CHẤT LƯỢNG (code giả/rút gọn, ảnh hỏng/sai thứ tự step): ${qualityIssueFileCount} file, ${qualityIssueTotal} cảnh báo`);
  console.log('');
  if (partialCount + uncertainCount + notConvertedCount === 0) {
    console.log('🎉 Không phát hiện thiếu sót nào trong phạm vi đã kiểm tra.');
  } else {
    console.log('👉 Xem chi tiết từng dòng "⚠️/❓/❌" ở trên để biết cần bổ sung gì.');
  }
}

main();
