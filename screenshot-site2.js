const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set a standard viewport
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3002...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 1. Hero section - full viewport screenshot (top of page)
  console.log('Taking hero screenshot...');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/hero-v2.png' });
  console.log('Hero screenshot saved.');

  // 2. Thesis section - at Y ~3602
  console.log('Taking thesis screenshot...');
  await page.evaluate(() => window.scrollTo({ top: 3552, behavior: 'instant' }));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/thesis-v2.png' });
  console.log('Thesis screenshot saved.');

  // 3. Experience section - at Y ~4996
  console.log('Taking experience screenshot...');
  await page.evaluate(() => window.scrollTo({ top: 4946, behavior: 'instant' }));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/exp-v2.png' });
  console.log('Experience screenshot saved.');

  // 4. Skills section - at Y ~5918
  console.log('Taking skills screenshot...');
  await page.evaluate(() => window.scrollTo({ top: 5868, behavior: 'instant' }));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/skills-v2.png' });
  console.log('Skills screenshot saved.');

  // 5. Flagship Build / WorkingNow - at Y ~2735
  console.log('Taking flagship build screenshot...');
  await page.evaluate(() => window.scrollTo({ top: 2685, behavior: 'instant' }));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/working-v2.png' });
  console.log('WorkingNow screenshot saved.');

  // Also grab extra detail - look for text content near key sections
  const thesisSectionHTML = await page.evaluate(() => {
    const headings = document.querySelectorAll('h2');
    for (const h of headings) {
      if (h.textContent.includes('Thesis')) {
        return h.closest('section')?.innerHTML?.substring(0, 2000) || h.parentElement?.innerHTML?.substring(0, 2000);
      }
    }
    return 'not found';
  });
  console.log('Thesis section HTML snippet:', thesisSectionHTML?.substring(0, 500));

  const flagshipHTML = await page.evaluate(() => {
    const headings = document.querySelectorAll('h2');
    for (const h of headings) {
      if (h.textContent.includes('Flagship')) {
        return h.closest('section')?.innerHTML?.substring(0, 2000) || h.parentElement?.innerHTML?.substring(0, 2000);
      }
    }
    return 'not found';
  });
  console.log('Flagship section HTML snippet:', flagshipHTML?.substring(0, 500));

  await browser.close();
  console.log('All screenshots done!');
})();
