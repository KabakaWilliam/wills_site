const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  const pages = [
    { selector: 'header', name: 'navigation', yOffset: 0 },
    { selector: '#research', name: 'research', yOffset: 600 },
    { selector: '#projects', name: 'trajectorykit', yOffset: 2800 },
    { selector: '#contact', name: 'contact', yOffset: 4000 }
  ];

  const screenshotsFolder = path.join(__dirname, 'current_state');
  if (!fs.existsSync(screenshotsFolder)) {
    fs.mkdirSync(screenshotsFolder, { recursive: true });
  }

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    console.log('🚀 Loading page...\n');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Add styles to ensure full height content
    await page.addScriptTag({ 
      content: `
        .section { padding: 64px 0; }
        .section:not(:last-child) { border-bottom: 1px solid hsla(210,13%,70%,.66); }
        body { min-height: 5000px; }
      `
    });

    console.log('📸 Taking screenshots...\n');

    // Screenshot header (full width)
    await page.waitForSelector('header');
    await page.evaluate((y) => {
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 0);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotsFolder, 'navigation.png') });
    console.log('✓ ' + pages[0].name);

    // Screenshot research
    await page.evaluate((y) => {
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 600);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(screenshotsFolder, 'research.png') });
    console.log('✓ ' + pages[1].name);

    // Screenshot trajectorykit
    await page.evaluate((y) => {
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 2800);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(screenshotsFolder, 'trajectorykit.png') });
    console.log('✓ ' + pages[2].name);

    // Screenshot contact
    await page.evaluate((y) => {
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 4000);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(screenshotsFolder, 'contact.png') });
    console.log('✓ ' + pages[3].name);

    console.log('\n✅ All screenshots saved to current_state/\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await browser.close();
    console.log('🔒 Browser closed');
  }
}

takeScreenshots();
