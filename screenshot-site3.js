const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Disable animations globally
  await page.addStyleTag({ content: '*, *::before, *::after { animation-duration: 0.001s !important; animation-delay: 0s !important; transition-duration: 0.001s !important; transition-delay: 0s !important; }' });
  await page.waitForTimeout(500);

  // Hero
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/hero-v2.png' });
  console.log('Hero saved');

  // Thesis
  await page.evaluate(() => window.scrollTo({ top: 3552, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/thesis-v2.png' });
  console.log('Thesis saved');

  // Experience
  await page.evaluate(() => window.scrollTo({ top: 4946, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/exp-v2.png' });
  console.log('Experience saved');

  // Skills
  await page.evaluate(() => window.scrollTo({ top: 5868, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/skills-v2.png' });
  console.log('Skills saved');

  // Flagship
  await page.evaluate(() => window.scrollTo({ top: 2685, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/working-v2.png' });
  console.log('Flagship saved');

  // Check hero parallax layers
  const heroInfo = await page.evaluate(() => {
    const allImgs = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src.substring(img.src.lastIndexOf('/') + 1),
      alt: img.alt,
      style: img.getAttribute('style') ? img.getAttribute('style').substring(0, 100) : null
    }));
    const scrollIndicator = Array.from(document.querySelectorAll('*')).find(el => el.textContent.trim() === 'Scroll' && el.children.length === 0);
    const h1 = document.querySelector('h1');
    const heroSection = document.querySelector('[class*="hero"], [id*="hero"], section');
    return {
      images: allImgs.slice(0, 10),
      scrollText: scrollIndicator ? scrollIndicator.textContent : null,
      scrollIndicatorParentClass: scrollIndicator ? (scrollIndicator.parentElement ? scrollIndicator.parentElement.className.substring(0, 100) : null) : null,
      h1Text: h1 ? h1.textContent.trim() : null,
      heroSectionClass: heroSection ? heroSection.className.substring(0, 100) : null,
    };
  });
  console.log('Hero info:', JSON.stringify(heroInfo, null, 2));

  // Check thesis badge
  await page.evaluate(() => window.scrollTo({ top: 3552 }));
  await page.waitForTimeout(300);
  const thesisInfo = await page.evaluate(() => {
    const allText = Array.from(document.querySelectorAll('*')).filter(el => {
      const t = el.textContent.trim();
      return (t.includes('Best Thesis') || t.includes('Finalist') || t.includes('badge')) && el.children.length < 3;
    });
    return allText.slice(0, 5).map(el => ({
      tag: el.tagName,
      cls: el.className ? el.className.substring(0, 60) : null,
      text: el.textContent.trim().substring(0, 100)
    }));
  });
  console.log('Thesis badge info:', JSON.stringify(thesisInfo, null, 2));

  await browser.close();
  console.log('Done!');
})();
