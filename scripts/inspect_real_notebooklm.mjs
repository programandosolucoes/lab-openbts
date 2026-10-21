import fs from 'fs';
import { chromium } from 'playwright';

async function main() {
  const d = JSON.parse(fs.readFileSync('C:/Users/carlo/projetos/skills-hub/data/perfis_notebooklm/notebooklm-carlosalberto4ti.json', 'utf8'));
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
  });

  const parts = d.cookies.split(';').map(p => p.trim()).filter(Boolean);
  for (const p of parts) {
    const idx = p.indexOf('=');
    const name = p.substring(0, idx).trim();
    const value = p.substring(idx + 1).trim();
    try {
      if (name.startsWith('__Host-')) {
        await context.addCookies([{ name, value, url: 'https://accounts.google.com', secure: true }]);
      } else if (name.startsWith('__Secure-')) {
        await context.addCookies([{ name, value, domain: '.google.com', path: '/', secure: true }]);
      } else {
        await context.addCookies([{ name, value, domain: '.google.com', path: '/' }]);
      }
    } catch (e) {
      console.error('Error adding cookie', name, e.message);
    }
  }

  const page = await context.newPage();
  console.log('Navigating to https://notebook.google.com/ ...');
  await page.goto('https://notebook.google.com/', { waitUntil: 'networkidle', timeout: 45000 });

  console.log('Final URL:', page.url());
  console.log('Title:', await page.title());

  const bodySnippet = await page.evaluate(() => document.body.innerText.substring(0, 1000));
  console.log('Body Text Snippet:\n', bodySnippet);

  // Take screenshot
  await page.screenshot({ path: 'notebooklm_logged_in.png' });
  console.log('Screenshot saved to notebooklm_logged_in.png');

  await browser.close();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
