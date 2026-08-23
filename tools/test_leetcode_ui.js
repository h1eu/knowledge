/* Kiểm thử headless giao diện LeetCode catalog (chạy: node tools/test_leetcode_ui.js) */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

  await page.goto('http://localhost:8741/leetcode.html', { waitUntil: 'networkidle2', timeout: 60000 });

  const results = [];
  const check = (name, ok) => results.push(`${ok ? 'PASS' : 'FAIL'} ${name}`);

  // 1. Domain view + tab bar
  await page.waitForSelector('.domain-view', { timeout: 15000 });
  const domainName = await page.$eval('.domain-header-title', el => el.textContent);
  check(`Domain name có "3248 Free": "${domainName}"`, /3248 Free/.test(domainName));
  const tabBtns = await page.$$eval('button', bs => bs.filter(b => /Theo Pattern|Theo Tag|Theo Độ khó|Kết hợp/.test(b.textContent)).length);
  check(`4 tab duyệt (${tabBtns})`, tabBtns === 4);

  // 2. Pattern mode mặc định vẫn render level bezels
  const bezels = await page.$$eval('.lc-bezel-outer', els => els.length);
  check(`Pattern view render ${bezels} level bezels`, bezels === 5);

  // 3. Tag mode
  await page.evaluate(() => setLcBrowseMode('tag'));
  await new Promise(r => setTimeout(r, 300));
  let chips = await page.$$eval('#lc-catalog-view button', bs => bs.length);
  check(`Tag mode: ${chips} tag chips`, chips > 100);
  // click tag đầu tiên (array)
  await page.evaluate(() => setLcCatalogTag('array'));
  await new Promise(r => setTimeout(r, 300));
  let rows = await page.$$eval('.lc-cat-row', rs => rs.length);
  const filterInfo = await page.$eval('#lc-catalog-view-inner', el => el.textContent);
  check(`Tag array: ${rows} dòng hiển thị, filter info OK`, rows === 100 && /array/.test(filterInfo));

  // 4. Difficulty mode
  await page.evaluate(() => { setLcBrowseMode('difficulty'); });
  await new Promise(r => setTimeout(r, 300));
  const diffCards = await page.$$eval('#lc-catalog-view .lc-cat-row', () => true) ;
  const counts = await page.evaluate(() => LC_CATALOG.byDifficulty);
  check(`Difficulty cards counts: E${counts.Easy}/M${counts.Medium}/H${counts.Hard}`, counts.Easy === 831 && counts.Medium === 1642 && counts.Hard === 775);
  await page.evaluate(() => setLcCatalogDiff('Easy'));
  await new Promise(r => setTimeout(r, 300));
  const easyFirst = await page.$$eval('.lc-cat-row .lc-premium-pill', ps => ps.slice(0, 5).map(p => p.textContent));
  check(`Lọc Easy chỉ ra Easy: ${easyFirst.join(',')}`, easyFirst.every(t => t === 'Easy'));

  // 5. Combo mode
  await page.evaluate(() => setLcBrowseMode('combo'));
  await new Promise(r => setTimeout(r, 200));
  await page.select('#lc-combo-tag', 'dynamic-programming');
  await page.select('#lc-combo-diff', 'Medium');
  await page.click('#lc-catalog-view button[onclick="applyLcCombo()"]');
  await new Promise(r => setTimeout(r, 300));
  const comboRows = await page.$$eval('.lc-cat-row', rs => rs.length);
  const comboInfo = await page.evaluate(() => ({ tag: lcCatalogTag, diff: lcCatalogDiff }));
  check(`Combo DP×Medium: ${comboRows} dòng, state=${JSON.stringify(comboInfo)}`, comboRows > 0 && comboInfo.tag === 'dynamic-programming' && comboInfo.diff === 'Medium');

  // 6. Row action: bài có lesson mở openTopic, catalog-only có link ngoài
  const rowActions = await page.evaluate(() => {
    const list = filterLcProblems().slice(0, 20);
    return {
      withLesson: list.some(p => LC_CATALOG.lessonByProblemId[p.id]),
      total: filterLcProblems().length
    };
  });
  check(`Combo table ${rowActions.total} bài tổng`, rowActions.total > 0);

  // 7. Sidebar group switch
  await page.evaluate(() => setLcSidebarGroup('difficulty'));
  await new Promise(r => setTimeout(r, 300));
  let sbMods = await page.$$eval('.sidebar-module span', els => els.map(e => e.textContent).slice(0, 3));
  check(`Sidebar nhóm Độ khó: ${JSON.stringify(sbMods)}`, sbMods.some(t => /Easy \(\d+\)/.test(t)));
  await page.evaluate(() => setLcSidebarGroup('tag'));
  await new Promise(r => setTimeout(r, 300));
  sbMods = await page.$$eval('.sidebar-module span', els => els.map(e => e.textContent).slice(0, 3));
  check(`Sidebar nhóm Tag: ${JSON.stringify(sbMods)}`, sbMods.some(t => /Tags \(\d+\)/.test(t)));

  // 8. Search có mục catalog (dùng bài chỉ có trong catalog, chưa có lesson)
  await page.evaluate(() => { searchInput.value = ''; });
  await page.type('#searchInput', 'Text Justification');
  await new Promise(r => setTimeout(r, 400));
  const searchHtml = await page.$eval('#searchOverlay', el => el.innerHTML);
  check('Search hiện mục Catalog LeetCode', /Catalog LeetCode/.test(searchHtml));

  console.log(results.join('\n'));
  console.log('\nJS errors: ' + (errors.length ? '\n' + errors.join('\n') : 'none'));
  await browser.close();
  if (errors.length || results.some(r => r.startsWith('FAIL'))) process.exit(1);
})();
