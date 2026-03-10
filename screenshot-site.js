const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set a standard viewport
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3002...');
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // 1. Hero section - full viewport screenshot
  console.log('Taking hero screenshot...');
  await page.screenshot({ path: '/tmp/hero-v2.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log('Hero screenshot saved.');

  // Get page height
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('Page total height:', pageHeight);

  // Find the thesis section
  const thesisY = await page.evaluate(() => {
    // Look for section with "thesis" in id or class, or heading text
    const sections = document.querySelectorAll('section, [id], [data-section]');
    for (const el of sections) {
      const text = el.textContent || '';
      if (text.includes('Thesis') || text.includes('thesis') || el.id?.toLowerCase().includes('thesis')) {
        return el.getBoundingClientRect().top + window.scrollY;
      }
    }
    // Try h2/h3 headings
    const headings = document.querySelectorAll('h1, h2, h3');
    for (const h of headings) {
      if (h.textContent.toLowerCase().includes('thesis')) {
        return h.getBoundingClientRect().top + window.scrollY;
      }
    }
    return null;
  });
  console.log('Thesis section Y:', thesisY);

  // 2. Scroll to thesis section
  if (thesisY !== null) {
    await page.evaluate((y) => window.scrollTo({ top: y - 50, behavior: 'instant' }), thesisY);
  } else {
    await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/thesis-v2.png' });
  console.log('Thesis screenshot saved.');

  // Find Experience section
  const expY = await page.evaluate(() => {
    const headings = document.querySelectorAll('h1, h2, h3');
    for (const h of headings) {
      if (h.textContent.toLowerCase().includes('experience')) {
        return h.getBoundingClientRect().top + window.scrollY;
      }
    }
    const sections = document.querySelectorAll('section, [id]');
    for (const el of sections) {
      if (el.id?.toLowerCase().includes('experience')) {
        return el.getBoundingClientRect().top + window.scrollY;
      }
    }
    return null;
  });
  console.log('Experience section Y:', expY);

  // 3. Scroll to Experience section
  if (expY !== null) {
    await page.evaluate((y) => window.scrollTo({ top: y - 50, behavior: 'instant' }), expY);
  } else {
    await page.evaluate(() => window.scrollTo({ top: 2700, behavior: 'instant' }));
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/exp-v2.png' });
  console.log('Experience screenshot saved.');

  // Find Skills section
  const skillsY = await page.evaluate(() => {
    const headings = document.querySelectorAll('h1, h2, h3');
    for (const h of headings) {
      if (h.textContent.toLowerCase().includes('skill')) {
        return h.getBoundingClientRect().top + window.scrollY;
      }
    }
    const sections = document.querySelectorAll('section, [id]');
    for (const el of sections) {
      if (el.id?.toLowerCase().includes('skill')) {
        return el.getBoundingClientRect().top + window.scrollY;
      }
    }
    return null;
  });
  console.log('Skills section Y:', skillsY);

  // 4. Scroll to Skills section
  if (skillsY !== null) {
    await page.evaluate((y) => window.scrollTo({ top: y - 50, behavior: 'instant' }), skillsY);
  } else {
    await page.evaluate(() => window.scrollTo({ top: 4500, behavior: 'instant' }));
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/skills-v2.png' });
  console.log('Skills screenshot saved.');

  // Find WorkingNow / Flagship Build section
  const workY = await page.evaluate(() => {
    const headings = document.querySelectorAll('h1, h2, h3, h4');
    for (const h of headings) {
      const t = h.textContent.toLowerCase();
      if (t.includes('flagship') || t.includes('working') || t.includes('open source')) {
        return h.getBoundingClientRect().top + window.scrollY;
      }
    }
    const els = document.querySelectorAll('[class*="working"], [id*="working"], [class*="flagship"], [id*="flagship"]');
    if (els.length > 0) {
      return els[0].getBoundingClientRect().top + window.scrollY;
    }
    return null;
  });
  console.log('WorkingNow section Y:', workY);

  // 5. Scroll to WorkingNow section
  if (workY !== null) {
    await page.evaluate((y) => window.scrollTo({ top: y - 50, behavior: 'instant' }), workY);
  } else {
    await page.evaluate(() => window.scrollTo({ top: 6000, behavior: 'instant' }));
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/working-v2.png' });
  console.log('WorkingNow screenshot saved.');

  // Print some diagnostic info about page structure
  const pageInfo = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
    return headings.map(h => ({ tag: h.tagName, text: h.textContent.trim().substring(0, 80), y: Math.round(h.getBoundingClientRect().top + window.scrollY) }));
  });
  console.log('Page headings:', JSON.stringify(pageInfo, null, 2));

  await browser.close();
  console.log('Done!');
})();
