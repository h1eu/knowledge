/* eslint-disable */
/**
 * verify-advertisements.js — Kiểm tra topic Advertisements render trên website.
 * Dùng Puppeteer để load index.html, mở topic advertisements, kiểm tra runtime errors.
 */
const path = require('path');
const puppeteer = require('/Users/hazu/Desktop/knowledge/node_modules/puppeteer');

(async () => {
  const fileUrl = 'file://' + path.resolve(__dirname, '..', 'website', 'index.html');
  const errors = [];
  const warnings = [];

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`);
    if (msg.type() === 'warning') warnings.push(`[console.warning] ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60000 });

  // Mở topic advertisements
  await page.evaluate(() => {
    if (typeof openTopic === 'function') {
      openTopic('advertisements');
    }
  });

  await new Promise(r => setTimeout(r, 1500));

  // Kiểm tra nội dung
  const result = await page.evaluate(() => {
    const title = document.querySelector('.content-title');
    const prose = document.getElementById('prose-content');
    const mermaidEls = document.querySelectorAll('#prose-content .mermaid');
    const codeEls = document.querySelectorAll('#prose-content pre[data-lang]');
    const callouts = document.querySelectorAll('#prose-content .callout');
    const topicContent = (typeof TOPIC_CONTENT !== 'undefined') ? TOPIC_CONTENT['advertisements'] : null;
    return {
      titleText: title ? title.textContent.trim() : null,
      proseLength: prose ? prose.textContent.length : 0,
      mermaidCount: mermaidEls.length,
      codeCount: codeEls.length,
      calloutCount: callouts.length,
      hasTopicContent: !!topicContent,
      topicStatus: topicContent ? topicContent.status : null,
      mermaidProcessed: Array.from(mermaidEls).map(el => el.getAttribute('data-processed') !== null || el.querySelector('svg') !== null)
    };
  });

  console.log('=== KẾT QUẢ ===');
  console.log(JSON.stringify(result, null, 2));
  console.log('\n=== LỖI ===');
  if (errors.length) { errors.forEach(e => console.log('❌ ' + e)); } else { console.log('✅ Không có lỗi thực thi'); }
  console.log('\n=== CẢNH BÁO ===');
  if (warnings.length) { warnings.forEach(w => console.log('⚠️ ' + w)); } else { console.log('✅ Không có cảnh báo'); }

  // Lấy screenshot để xem giao diện
  await page.screenshot({ path: '/var/folders/fg/3pry9xvj25g_914gzvlymt0c0000gn/T/opencode/advertisements.png', fullPage: false });

  await browser.close();

  const hasFatal = errors.length > 0;
  process.exit(hasFatal ? 1 : 0);
})().catch(e => { console.error('FATAL:', e); process.exit(1); });
