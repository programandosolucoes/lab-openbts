import { chromium } from 'playwright';

async function verifyLiveEAD() {
  console.log("Iniciando verificação Playwright no site de produção...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    errors.push(err.message);
  });

  await page.goto('http://lab-openbts.programandosolucoes.com.br/ead/', { waitUntil: 'networkidle' });

  const title = await page.title();
  console.log("Título da Página:", title);

  // Verifica quantidade de lições carregadas
  const lessonsCount = await page.evaluate(() => {
    return document.querySelectorAll('.lesson-item').length;
  });
  console.log("Total de lições no menu lateral:", lessonsCount);

  // Verifica dados da primeira lição
  const activeTitle = await page.textContent('#active-lesson-title');
  console.log("Título da lição ativa:", activeTitle);

  // Verifica slides
  const slideCounter = await page.textContent('#slide-counter');
  console.log("Contador de slides:", slideCounter);

  const slideTitle = await page.textContent('#slide-title');
  console.log("Título do slide 1:", slideTitle);

  // Clica no botão de próximo slide
  await page.click('button[onclick="nextSlide()"]');
  const slideCounter2 = await page.textContent('#slide-counter');
  console.log("Após clique 'Avançar Slide':", slideCounter2);

  // Verifica elemento de áudio
  const audioSrc = await page.evaluate(() => {
    const el = document.getElementById('lesson-audio');
    return el ? el.getAttribute('src') : null;
  });
  console.log("Fonte do áudio da lição:", audioSrc);

  // Verifica abas (Teoria, Configuração, Wireshark)
  await page.click('button[data-tab="config"]');
  const swTitle = await page.textContent('#config-software-title');
  console.log("Aba Configuração de Software carregada:", swTitle);

  await page.click('button[data-tab="wireshark"]');
  const wsProto = await page.textContent('#wireshark-protocol-badge');
  console.log("Aba Wireshark carregada:", wsProto);

  console.log("Erros de console registrados:", errors.length === 0 ? "Nenhum (100% limpo)" : errors);

  await browser.close();
  console.log("Verificação Playwright concluída com sucesso!");
}

verifyLiveEAD().catch(err => {
  console.error("Falha no teste Playwright:", err);
  process.exit(1);
});
