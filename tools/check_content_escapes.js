#!/usr/bin/env node
/* ============================================================
   Knowledge OS — Guard: escaping trong các file content (website/*.js)
   ------------------------------------------------------------
   Nội dung bài học được nhúng vào JS bằng template literal (`...`)
   hoặc chuỗi nháy kép ("..."). JS "nuốt" backslash của escape sequence
   không nhận diện (\( → (), nên code mẫu Swift \(name) hiển thị sai
   thành (name) nếu không viết \\(. Trong template literal, ${...}
   còn bị JS THỰC THI luôn.

   Rules (chỉ áp dụng cho template mở bằng `content:` và mọi chuỗi ' "):
   - BS-PAREN: \( trong bất kỳ chuỗi nào → phải viết \\(
   - TPL-INTERPOLATION: ${ chưa escape trong content template → JS sẽ
     thực thi → viết \$ (hợp lệ ở chuỗi nháy kép nên không flag ở đó)
   - CTRL-ESCAPE: \0 luôn lỗi (thành NUL); \n \r \t \b \f \v KỀ SÁT dấu
     nháy → string literal trong code mẫu vỡ thành xuống dòng thật →
     viết \\n. \n KHÔNG kề nháy là chiến thuật format HTML hợp lệ
     (xuống dòng thật trong <pre><code>, kiểu leetcode-content.js).
   - app.js loại khỏi scope (app code, có regex literal hợp lệ).
   - Dòng chứa `escape-check:ignore` được bỏ qua.

   Chạy:  node tools/check_content_escapes.js   (exit 1 nếu có lỗi)
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'website');
const EXCLUDE = new Set(['app.js']); // app code, không phải content data
const CTRL_CHARS = 'ntrbfv';

function scanFile(file) {
  const src = fs.readFileSync(file, 'utf8');
  const findings = [];

  // state: code | sq | dq | tpl | regex | lc (line comment) | bc (block comment)
  // stack: frame cho template/expr lồng nhau: {type:'tpl',isContent} | {type:'expr',depth}
  let state = 'code';
  let prevSig = ''; // ký tự significant gần nhất trong code (heuristic regex)
  const stack = [];

  const lineOf = (i) => { let n = 1; for (let k = 0; k < i; k++) if (src[k] === '\n') n++; return n; };
  const lineStart = (i) => src.lastIndexOf('\n', i - 1) + 1;
  const lineEnd = (i) => { const e = src.indexOf('\n', i); return e === -1 ? src.length : e; };
  const lineText = (i) => src.slice(lineStart(i), lineEnd(i));
  const ignored = (i) => lineText(i).includes('escape-check:ignore');
  const report = (i, rule, msg) => {
    if (ignored(i)) return;
    const ls = lineStart(i);
    findings.push({
      file, line: lineOf(i), col: i - ls + 1, rule, msg,
      text: lineText(i).trim().slice(0, 120),
    });
  };
  const curFrame = () => stack[stack.length - 1] || null;

  let i = 0;
  while (i < src.length) {
    const c = src[i];
    const next = i + 1 < src.length ? src[i + 1] : '';

    if (state === 'lc') { if (c === '\n') state = 'code'; i++; continue; }
    if (state === 'bc') { if (c === '*' && next === '/') { state = 'code'; i += 2; prevSig = ' '; continue; } i++; continue; }

    if (state === 'sq' || state === 'dq') {
      if (c === '\\') {
        if (next === '(') report(i + 1, 'BS-PAREN', '"\\(" bị JS nuốt backslash — phải viết \\\\(');
        i += 2; continue;
      }
      if ((state === 'sq' && c === "'") || (state === 'dq' && c === '"')) { state = 'code'; prevSig = c; }
      i++; continue;
    }

    if (state === 'regex') {
      if (c === '\\') { i += 2; continue; }
      if (c === '/' || c === '\n') { state = 'code'; prevSig = '/'; }
      i++; continue;
    }

    if (state === 'tpl') {
      const frame = curFrame();
      if (c === '\\') {
        if (next === '(') report(i + 1, 'BS-PAREN', 'template literal nuốt backslash: \\( hiển thị thành ( — phải viết \\\\(');
        else if (next === '0' && frame && frame.isContent) report(i + 1, 'CTRL-ESCAPE', '\\0 thành NUL char trong nội dung — phải viết \\\\0');
        else if (next && CTRL_CHARS.includes(next) && frame && frame.isContent) {
          const prevCh = i > 0 ? src[i - 1] : '';
          const afterCh = i + 2 < src.length ? src[i + 2] : '';
          if (prevCh === '"' || prevCh === "'" || afterCh === '"' || afterCh === "'") {
            report(i + 1, 'CTRL-ESCAPE', `\\${next} kề dấu nháy sẽ thành control char thật, làm vỡ string literal trong code mẫu — viết \\\\${next}`);
          }
        }
        i += 2; continue;
      }
      if (c === '$' && next === '{') {
        if (frame && frame.isContent) report(i, 'TPL-INTERPOLATION', '${...} bị JS thực thi trong content template — viết \\${ để hiển thị nguyên văn');
        stack.push({ type: 'expr', depth: 0 });
        state = 'code'; prevSig = '{'; i += 2; continue;
      }
      if (c === '`') { stack.pop(); state = 'code'; prevSig = '`'; i++; continue; }
      i++; continue;
    }

    // state === 'code'
    if (c === '/' && next === '/') { state = 'lc'; i += 2; continue; }
    if (c === '/' && next === '*') { state = 'bc'; i += 2; continue; }
    if (c === "'") { state = 'sq'; i++; continue; }
    if (c === '"') { state = 'dq'; i++; continue; }
    if (c === '`') {
      const isContent = /content:\s*$/.test(src.slice(Math.max(0, i - 12), i));
      stack.push({ type: 'tpl', isContent });
      state = 'tpl'; i++; continue;
    }
    if (c === '/' && /[([,:=+[!&|?{};%.<>~^-]/.test(prevSig)) { state = 'regex'; i++; continue; }

    const top = curFrame();
    if (top && top.type === 'expr') {
      if (c === '{') { top.depth++; prevSig = c; i++; continue; }
      if (c === '}') {
        if (top.depth === 0) { stack.pop(); state = 'tpl'; }
        else top.depth--;
        prevSig = c; i++; continue;
      }
    }
    if (!/\s/.test(c)) prevSig = c;
    i++;
  }

  return findings;
}

module.exports = { scanFile };

if (require.main === module) {
  const files = fs.readdirSync(DIR)
    .filter(f => f.endsWith('.js') && !EXCLUDE.has(f))
    .sort();
  const all = [];
  for (const f of files) all.push(...scanFile(path.join(DIR, f)));

  if (all.length) {
    console.error(`✗ ${all.length} lỗi escaping trong website content:\n`);
    const byFile = {};
    for (const f of all) (byFile[f.file] = byFile[f.file] || []).push(f);
    for (const file of Object.keys(byFile)) {
      console.error(`  ${path.relative(ROOT, file)}`);
      for (const f of byFile[file]) {
        console.error(`   :${f.line}:${f.col} [${f.rule}] ${f.msg}`);
        console.error(`      │ ${f.text}`);
      }
    }
    console.error('\nSửa trong file nguồn (hoặc thêm `escape-check:ignore` cuối dòng nếu cố ý) rồi chạy lại.');
    process.exit(1);
  } else {
    console.log(`✓ OK: ${files.length} file content, 0 lỗi escaping`);
  }
}
