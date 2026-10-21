/**
 * @file compile_curriculum.mjs
 * @description Compilador e Validador do Currículo Telecom Academy 2026
 * Concatena os 6 módulos temáticos (24 lições completas), normaliza schemas,
 * valida ausência de termos proibidos e exporta o curriculum.js final.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { module1 } from './modules/module1.mjs';
import { module2 } from './modules/module2.mjs';
import { module3 } from './modules/module3.mjs';
import { module4 } from './modules/module4.mjs';
import { module5 } from './modules/module5.mjs';
import { module6 } from './modules/module6.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function mdToHtml(md) {
  if (!md) return '';
  let html = md
    // Headings
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Horizontal rule
    .replace(/^---$/gim, '<hr class="my-4 border-slate-700"/>')
    // Code blocks
    .replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gim, (match, lang, code) => {
      const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<pre class="bg-slate-950 p-4 rounded-lg my-3 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto"><code>${escaped}</code></pre>`;
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs">$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>')
    // Ordered lists
    .replace(/^\s*\d+\.\s+(.*$)/gim, '<li>$1</li>');

  // Wrap loose lines in <p>
  const paragraphs = html.split('\n\n').map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<pre') || p.startsWith('<hr') || p.startsWith('<li>') || p.startsWith('<ul') || p.startsWith('<table')) {
      return p;
    }
    return `<p class="text-slate-300 leading-relaxed my-2">${p}</p>`;
  }).filter(Boolean).join('\n');

  return paragraphs;
}

function normalizeLesson(l) {
  const normalized = { ...l };

  // 1. Normaliza Teoria para HTML
  if (!normalized.theoryText && normalized.theory) {
    normalized.theoryText = mdToHtml(normalized.theory);
  }

  // 2. Normaliza Software Config
  if (!normalized.softwareConfig && normalized.configCode) {
    let swName = "Configuração de Telecom";
    let fileName = "config/telecom.conf";
    let explanation = "Arquivo de configuração técnica e diretivas do serviço de telecomunicações.";

    if (normalized.id === "5.1") {
      swName = "MicroSIP Softphone & Contacts";
      fileName = "%APPDATA%\\MicroSIP\\microsip.ini";
      explanation = "Configuração de codecs HD (Opus 48kHz, G.711a) e parâmetros de registro Digest para estações de trabalho.";
    } else if (normalized.id === "5.2") {
      swName = "Asterisk Dialplan & Diagnostics";
      fileName = "/etc/asterisk/extensions.conf";
      explanation = "Aplicações Echo() no ramal 8001 e ConfBridge() no ramal 8000 para diagnósticos em tempo real.";
    } else if (normalized.id === "5.3") {
      swName = "Asterisk Dialplan Failover";
      fileName = "/etc/asterisk/extensions.conf";
      explanation = "Tratamento sistemático de status DIALSTATUS com failover para rotas de contingência e correio de voz.";
    } else if (normalized.id === "5.4") {
      swName = "Asterisk RTP & PJSIP QoS";
      fileName = "/etc/asterisk/rtp.conf";
      explanation = "Calibração de portas RTP (10000-20000), RTCP periódico a 5000ms e ativação do Jitter Buffer adaptativo.";
    } else if (normalized.id === "6.1") {
      swName = "Docker Compose Carrier Orchestration";
      fileName = "docker-compose.yml";
      explanation = "Orquestração completa dos contêineres Open5GS (5G SA Core), Yate (Gateway) e Asterisk 20 (PBX).";
    } else if (normalized.id === "6.2") {
      swName = "NotebookLM Studio Native Player";
      fileName = "ead/index.html";
      explanation = "Player nativo HTML5 integrado com streaming do áudio técnico autêntico de 22.7 MB gerado pelo NotebookLM.";
    } else if (normalized.id === "6.3") {
      swName = "EAD Certification Engine";
      fileName = "ead/js/certification.js";
      explanation = "Emissão criptográfica de certificado de especialista com hash de autenticidade e link para download do EPUB.";
    }

    normalized.softwareConfig = {
      software: swName,
      file: fileName,
      code: normalized.configCode,
      explanation: explanation
    };
  }

  // 3. Normaliza Wireshark Analysis
  if (!normalized.wiresharkAnalysis && normalized.traceDissection) {
    let proto = "SIP / RTP";
    let summary = "Captura de tráfego de sinalização e mídia em tempo real";

    if (normalized.id === "5.1") {
      proto = "SIP REGISTER / Digest";
      summary = "Fluxo de registro e resposta 401 Unauthorized com Digest Challenge";
    } else if (normalized.id === "5.2") {
      proto = "SIP INVITE / RTP Echo";
      summary = "Reflexão imediata de áudio em loopback no ramal de eco 8001 com latência de 150 µs";
    } else if (normalized.id === "5.3") {
      proto = "SIP 404 Not Found";
      summary = "Recusa de chamada para extensão não localizada com cabeçalho Q.850 cause 1";
    } else if (normalized.id === "5.4") {
      proto = "RTP / RTCP QoS";
      summary = "Sender & Receiver Reports demonstrando 0% de perda de pacotes e MOS 4.41";
    } else if (normalized.id === "6.1") {
      proto = "SIP Intercontinental";
      summary = "Roteamento de chamada transcontinental Brasil -> Portugal com PDD de 620 ms";
    } else if (normalized.id === "6.2") {
      proto = "HTTP Streaming";
      summary = "Entrega parcial via HTTP 206 de arquivo de áudio estéreo com 22.7 MB do NotebookLM";
    } else if (normalized.id === "6.3") {
      proto = "HTTP EPUB Delivery";
      summary = "Download autenticado do livro oficial de telecomunicações em formato EPUB";
    }

    normalized.wiresharkAnalysis = {
      protocol: proto,
      summary: summary,
      rawTrace: normalized.traceDissection
    };
  }

  // 4. Normaliza Diagram Type
  if (!normalized.diagramType && normalized.diagram) {
    normalized.diagramType = normalized.diagram;
  }

  return normalized;
}

const rawModules = [module1, module2, module3, module4, module5, module6];

console.log("Normalizando módulos e lições...");

const normalizedModules = rawModules.map(mod => {
  return {
    id: mod.id,
    title: mod.title,
    summary: mod.summary,
    lessons: mod.lessons.map(normalizeLesson)
  };
});

let totalLessons = 0;
normalizedModules.forEach(mod => {
  totalLessons += mod.lessons.length;
  console.log(`- Módulo ${mod.id}: ${mod.lessons.length} aulas [${mod.title}]`);
});

console.log(`Total de aulas integradas: ${totalLessons}`);

const courseCurriculum = {
  courseTitle: "Engenharia de Redes Móveis, Telecom Aberta & MVNO Convergente",
  instructor: "Carlos Alberto & Prof. Angelo Delphini (Edição 2026)",
  institution: "Programando Soluções • OSTS Telecom",
  regulatoryFramework: "Resolução Anatel nº 777/2025 • Art. 183 Lei 9.472/1997",
  version: "2026.10.21-v4-udemy-pro",
  totalModules: normalizedModules.length,
  totalLessons: totalLessons,
  modules: normalizedModules
};

// Gera o código do arquivo curriculum.js
const fileContent = `/**
 * @file curriculum.js
 * @description Acervo Curricular Completo da Telecom Academy (Padrão de Ensino Udemy Pro)
 * 6 Módulos, 24 Aulas com Teoria Exaustiva, Configurações de Software, Análise Wireshark,
 * Decks de Slides Interativos (PowerPoint) e Laboratórios Práticos de Bancada.
 * Versão Compilada: ${new Date().toISOString()}
 */

const courseCurriculum = ${JSON.stringify(courseCurriculum, null, 2)};

// Exporta globalmente no navegador ou para ambiente Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = courseCurriculum;
}
if (typeof window !== 'undefined') {
    window.courseCurriculum = courseCurriculum;
}
`;

// Verifica ausência do termo proibido
const forbiddenRegex = /l-?e-?g-?a-?d-?o/i;
if (forbiddenRegex.test(fileContent)) {
  console.error("ALERTA CRÍTICO: Termo proibido detectado no arquivo compilado!");
  process.exit(1);
} else {
  console.log("Validação de conformidade: Nenhuma ocorrência do termo proibido.");
}

// Grava nos destinos de produção e desenvolvimento
const targets = [
  path.resolve(__dirname, '../mvno-web-hostinger/ead/js/curriculum.js'),
  path.resolve(__dirname, '../telecom-academy/public/js/curriculum.js')
];

targets.forEach(targetPath => {
  fs.writeFileSync(targetPath, fileContent, 'utf-8');
  const size = fs.statSync(targetPath).size;
  console.log(`Arquivo gravado com sucesso em: ${targetPath} (${(size / 1024).toFixed(1)} KB)`);
});

console.log("Compilação concluída com 100% de sucesso!");
