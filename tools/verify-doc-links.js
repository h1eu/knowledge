#!/usr/bin/env node
/* ============================================================
   Knowledge OS — Kiểm tra link .md trong bài Android trên website (headless)
   Mở từng Topic Android có nội dung, xác nhận không còn link tới URL .md (sẽ 404):
   mọi link .md phải thành #<topic> mở được, hoặc link GitHub (bài chưa có entry web).
   Sau đó click thử link trên vài trang mẫu.

   Dùng (serve site trước):
     cd website && nohup python3 -m http.server 8766 &
     node tools/verify-doc-links.js [http://localhost:8766]
   ============================================================ */
const puppeteer = require('puppeteer');

const BASE = (process.argv[2] || 'http://localhost:8766').replace(/\/$/, '');
// [trang mẫu, link cần click]; null = link Topic đầu tiên trong bài
const SAMPLES = [['github-ci', null], ['session-10-overview', null], ['build-types', null], ['arch-mvvm', 'solid-srp']];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const errors = [];
  const warnings = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    // Vòng 1 mở bài liên tục nên mermaid.run của bài trước chạy trên DOM đã bị thay: lỗi giả, bỏ qua
    if (m.type() === 'error' && !m.text().startsWith('Mermaid error')) errors.push(m.text());
    if (m.type() === 'warn' && m.text().startsWith('[doc-links]')) warnings.push(m.text());
  });

  await page.goto(`${BASE}/android.html`, { waitUntil: 'networkidle2', timeout: 60000 });

  // 1. Duyệt mọi Topic Android có nội dung
  const report = await page.evaluate(() => {
    const domain = KNOWLEDGE_DATA.domains.find((d) => d.id === 'android');
    const topics = domain.modules.flatMap((m) => m.topics).filter((t) => TOPIC_CONTENT[t.id]);
    const out = { topics: topics.length, internal: 0, github: 0, broken: [] };
    for (const t of topics) {
      openTopic(t.id, false);
      document.querySelectorAll('#prose-content a[href]').forEach((a) => {
        const href = a.getAttribute('href');
        if (/^[^:#?]*\.md(#.*)?$/.test(href)) out.broken.push(`${t.id}: ${href}`);
        else if (href.startsWith('#') && href.length > 1) {
          const id = href.slice(1);
          if (findTopic(id)) out.internal++;
          else if (!document.getElementById(id)) out.broken.push(`${t.id}: ${href} (không có Topic)`);
        } else if (href.startsWith('https://github.com/h1eu/knowledge/blob/')) out.github++;
      });
    }
    return out;
  });

  // 2. Click link .md đầu tiên đã đổi trên các trang mẫu
  const clicks = [];
  for (const [id, want] of SAMPLES) {
    await page.goto(`${BASE}/android.html#${id}`, { waitUntil: 'networkidle2', timeout: 60000 });
    const target = await page.evaluate((want) => {
      const a = [...document.querySelectorAll('#prose-content a[href^="#"]')]
        .find((x) => (want ? x.getAttribute('href') === `#${want}` : x.getAttribute('href').length > 1 && findTopic(x.getAttribute('href').slice(1))));
      if (!a) return null;
      a.click();
      return a.getAttribute('href').slice(1);
    }, want);
    // Topic domain khác được lazy-load: chờ nội dung bài hiện ra
    await page.waitForFunction((t) => currentTopicId === t && document.getElementById('prose-content'), { timeout: 30000 }, target).catch(() => {});
    const now = await page.evaluate(() => ({ current: currentTopicId, hash: location.hash, title: document.querySelector('h1')?.textContent.trim() }));
    clicks.push({ from: id, target, ...now, ok: !!target && now.current === target && now.hash === `#${target}` });
  }

  // 3. index.html nạp content lazy: map phải được nạp cùng
  await page.goto(`${BASE}/index.html#github-ci`, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForFunction(() => currentTopicId === 'github-ci' && document.getElementById('prose-content'), { timeout: 30000 });
  const indexMd = await page.$$eval('#prose-content a[href]', (as) => as.filter((a) => /^[^:#?]*\.md/.test(a.getAttribute('href'))).length);

  await browser.close();

  console.log(`Topic Android có nội dung: ${report.topics}`);
  console.log(`Link .md → Topic trên site: ${report.internal}`);
  console.log(`Link .md → GitHub (bài chưa có entry web): ${report.github}`);
  for (const c of clicks) console.log(`${c.ok ? 'PASS' : 'FAIL'} click trên #${c.from} → #${c.target} (đang mở ${c.current}, "${c.title}")`);
  console.log(`${indexMd === 0 ? 'PASS' : 'FAIL'} index.html#github-ci: ${indexMd} link .md còn lại`);
  for (const w of warnings) console.log(`⚠ ${w}`);
  for (const b of report.broken) console.log(`✗ ${b}`);
  for (const e of errors) console.log(`✗ lỗi runtime: ${e}`);

  const failed = report.broken.length || errors.length || indexMd || clicks.some((c) => !c.ok);
  console.log(failed ? '✗ FAIL' : '✓ OK');
  process.exit(failed ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
