import fs from 'fs';
import { chromium } from 'playwright';

function parseCookieString(cookieStr) {
  return cookieStr.split(';').map(part => {
    const idx = part.indexOf('=');
    if (idx === -1) return null;
    const name = part.substring(0, idx).trim();
    const value = part.substring(idx + 1).trim();
    if (!name || !value) return null;

    if (name.startsWith('__Host-')) {
      return {
        name,
        value,
        path: '/',
        secure: true,
        url: 'https://notebook.google.com'
      };
    }

    return {
      name,
      value,
      domain: '.google.com',
      path: '/',
      secure: name.startsWith('__Secure-')
    };
  }).filter(Boolean);
}

async function main() {
  const data = JSON.parse(fs.readFileSync('C:/Users/carlo/projetos/skills-hub/data/perfis_notebooklm/notebooklm-carlosalberto4ti.json', 'utf8'));
  const cookies = parseCookieString(data.cookies);
  console.log(`Parsed ${cookies.length} cookies.`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
  });

  await context.addCookies(cookies);
  const page = await context.newPage();

  console.log('Navigating to https://notebook.google.com/ ...');
  await page.goto('https://notebook.google.com/', { waitUntil: 'networkidle', timeout: 30000 });

  const url = page.url();
  const title = await page.title();
  console.log('Final URL:', url);
  console.log('Title:', title);

  const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 500));
  console.log('Body preview:\n', bodyText);

  await page.screenshot({ path: 'notebooklm_page2.png' });
  console.log('Screenshot saved to notebooklm_page2.png');

  await browser.close();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
