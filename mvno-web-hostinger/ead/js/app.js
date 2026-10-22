/**
 * @file app.js
 * @description Motor de Execução da Plataforma EAD Telecom Academy Pro
 * Integração do currículo de 24 aulas, player de slides interativos, áudio narrado (Web Speech API + Áudio Studio),
 * análise Wireshark, simulador de roteamento LCR e conformidade com a esteira MikroTik do Carlos.
 */

let allLessons = [];
let currentLessonIndex = 0;
let currentSlideIndex = 0;
let completedLessons = new Set();
let currentTab = 'theory';

// Estado de Áudio / Síntese
let isPlayingAudio = false;
let audioTimer = null;
let audioSecondsElapsed = 0;
let currentUtterance = null;

// Gerenciamento de Tema (Dark / Light)
function initTheme() {
    let savedTheme = 'dark';
    try {
        savedTheme = localStorage.getItem('telecom_theme') || 'dark';
    } catch (e) {}
    setTheme(savedTheme, false);
}

function setTheme(theme, save) {
    if (save === undefined) save = true;
    const toggleBtn = document.getElementById('btn-theme-toggle');
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (toggleBtn) {
            toggleBtn.innerHTML = '🌙 Modo Escuro';
            toggleBtn.setAttribute('title', 'Alternar para Modo Escuro');
        }
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (toggleBtn) {
            toggleBtn.innerHTML = '☀️ Modo Claro';
            toggleBtn.setAttribute('title', 'Alternar para Modo Claro');
        }
    }
    if (save) {
        try {
            localStorage.setItem('telecom_theme', theme);
        } catch (e) {}
    }
}

function toggleTheme() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    setTheme(isLight ? 'dark' : 'light', true);
}

// Inicialização ao carregar o DOM
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initCurriculum();
    renderSidebar();
    loadLesson(0);
    initAudioEvents();
});

function initCurriculum() {
    allLessons = [];
    const curr = (typeof courseCurriculum !== 'undefined' && courseCurriculum.modules) ? courseCurriculum : (typeof CURRICULUM !== 'undefined' ? { modules: CURRICULUM } : null);
    if (curr && curr.modules) {
        curr.modules.forEach(function(mod) {
            mod.lessons.forEach(function(lesson) {
                allLessons.push({
                    ...lesson,
                    moduleId: mod.id,
                    moduleTitle: mod.title
                });
            });
        });
    }

    // Carrega progresso salvo
    try {
        const saved = localStorage.getItem('telecom_academy_completed');
        if (saved) {
            completedLessons = new Set(JSON.parse(saved));
        }
    } catch (e) {}

    updateProgressBar();
}

function renderSidebar() {
    const accordion = document.getElementById('module-accordion');
    const curr = (typeof courseCurriculum !== 'undefined' && courseCurriculum.modules) ? courseCurriculum : (typeof CURRICULUM !== 'undefined' ? { modules: CURRICULUM } : null);
    if (!accordion || !curr || !curr.modules) return;

    accordion.innerHTML = '';

    curr.modules.forEach(function(mod, modIdx) {
        const modCard = document.createElement('div');
        modCard.className = 'module-card';
        modCard.id = 'mod-card-' + mod.id;

        const isFirst = (modIdx === 0);

        let lessonsHtml = '';
        mod.lessons.forEach(function(lesson) {
            const globalIdx = allLessons.findIndex(function(l) { return l.id === lesson.id; });
            const isDone = completedLessons.has(lesson.id);
            const isActive = (globalIdx === currentLessonIndex);

            lessonsHtml += '<div class="lesson-item ' + (isActive ? 'active' : '') + '" ' +
                'id="lesson-item-' + lesson.id + '" ' +
                'onclick="selectLessonById(\'' + lesson.id + '\')">' +
                '<input type="checkbox" class="lesson-checkbox" ' +
                (isDone ? 'checked' : '') + ' ' +
                'onclick="event.stopPropagation(); toggleLessonDone(\'' + lesson.id + '\')">' +
                '<div class="lesson-info">' +
                '<span class="lesson-title-text">' + lesson.title + '</span>' +
                '<span class="lesson-pill-duration">' + lesson.duration + '</span>' +
                '</div>' +
                '</div>';
        });

        modCard.innerHTML = 
            '<div class="module-header ' + (isFirst ? 'open' : '') + '" onclick="toggleModuleAccordion(' + mod.id + ')">' +
            '<div class="module-title-area">' +
            '<span class="module-badge">Módulo ' + mod.id + '</span>' +
            '<strong class="module-name">' + mod.title.replace(/^Módulo \d+: /, '') + '</strong>' +
            '<span class="module-count">' + mod.lessons.length + ' Aulas</span>' +
            '</div>' +
            '<span class="accordion-arrow">' + (isFirst ? '▼' : '▶') + '</span>' +
            '</div>' +
            '<div class="module-lessons-list ' + (isFirst ? 'show' : '') + '" id="lessons-list-' + mod.id + '">' +
            lessonsHtml +
            '</div>';

        accordion.appendChild(modCard);
    });
}

function toggleModuleAccordion(modId) {
    const list = document.getElementById('lessons-list-' + modId);
    const card = document.getElementById('mod-card-' + modId);
    const header = card ? card.querySelector('.module-header') : null;
    const arrow = header ? header.querySelector('.accordion-arrow') : null;

    if (list) {
        const isOpen = list.classList.contains('show');
        if (isOpen) {
            list.classList.remove('show');
            if (header) header.classList.remove('open');
            if (arrow) arrow.textContent = '▶';
        } else {
            list.classList.add('show');
            if (header) header.classList.add('open');
            if (arrow) arrow.textContent = '▼';
        }
    }
}

function selectLessonById(lessonId) {
    const idx = allLessons.findIndex(function(l) { return l.id === lessonId; });
    if (idx !== -1) {
        stopAudioPlayback();
        loadLesson(idx);
    }
}

function loadLesson(index) {
    if (index < 0 || index >= allLessons.length) return;
    currentLessonIndex = index;
    currentSlideIndex = 0;

    const lesson = allLessons[index];

    // Atualiza metadados no topo
    const titleEl = document.getElementById('active-lesson-title');
    if (titleEl) titleEl.textContent = lesson.title;

    const durEl = document.getElementById('active-lesson-duration');
    if (durEl) durEl.textContent = '⏱️ ' + lesson.duration + ' • ' + lesson.tag;

    const tagEl = document.getElementById('player-lesson-tag');
    if (tagEl) tagEl.textContent = lesson.id + ' • ' + lesson.tag.toUpperCase();

    // Atualiza Teoria com Markdown e KaTeX
    const theoryEl = document.getElementById('active-lesson-theory');
    if (theoryEl) {
        const rawTheory = lesson.theoryText || lesson.theory || "";
        if (typeof marked !== 'undefined' && marked.parse) {
            marked.setOptions({
                gfm: true,
                breaks: true
            });
            theoryEl.innerHTML = marked.parse(rawTheory);
        } else {
            theoryEl.innerHTML = rawTheory;
        }

        // Renderiza equações matemáticas KaTeX
        if (typeof renderMathInElement === 'function') {
            try {
                renderMathInElement(theoryEl, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false },
                        { left: '\\(', right: '\\)', display: false },
                        { left: '\\[', right: '\\]', display: true }
                    ],
                    throwOnError: false
                });
            } catch (err) {
                console.warn('Erro ao processar KaTeX:', err);
            }
        }
    }

    // Atualiza Configuração de Software
    if (lesson.softwareConfig) {
        const swTitle = document.getElementById('config-software-title');
        const swFile = document.getElementById('config-software-file');
        const swExp = document.getElementById('config-explanation');
        const swCode = document.getElementById('config-code-block');

        if (swTitle) swTitle.textContent = lesson.softwareConfig.software;
        if (swFile) swFile.textContent = lesson.softwareConfig.file;
        if (swExp) swExp.textContent = lesson.softwareConfig.explanation;
        if (swCode) swCode.textContent = lesson.softwareConfig.code;
    }

    // Atualiza Wireshark
    if (lesson.wiresharkAnalysis) {
        const wsProto = document.getElementById('wireshark-protocol-badge');
        const wsSummary = document.getElementById('wireshark-summary');
        const wsTrace = document.getElementById('wireshark-raw-trace');

        if (wsProto) wsProto.textContent = lesson.wiresharkAnalysis.protocol;
        if (wsSummary) wsSummary.textContent = lesson.wiresharkAnalysis.summary;
        if (wsTrace) wsTrace.textContent = lesson.wiresharkAnalysis.rawTrace;
    }

    // Atualiza Diagrama inicial se houver
    if (lesson.diagramType) {
        switchDiagram(lesson.diagramType);
    }

    // Renderiza Slide atual
    renderSlide();

    // Atualiza seleção na Sidebar
    document.querySelectorAll('.lesson-item').forEach(function(el) {
        el.classList.remove('active');
    });

    const activeItem = document.getElementById('lesson-item-' + lesson.id);
    if (activeItem) {
        activeItem.classList.add('active');
        const parentList = activeItem.closest('.module-lessons-list');
        if (parentList && !parentList.classList.contains('show')) {
            parentList.classList.add('show');
            const modCard = parentList.closest('.module-card');
            if (modCard) {
                const header = modCard.querySelector('.module-header');
                const arrow = header ? header.querySelector('.accordion-arrow') : null;
                if (header) header.classList.add('open');
                if (arrow) arrow.textContent = '▼';
            }
        }
    }

    // Atualiza botão de conclusão
    updateLessonDockerLab(lesson);
    updateCompleteButton();
}

function renderSlide() {
    const lesson = allLessons[currentLessonIndex];
    if (!lesson || !lesson.slides || lesson.slides.length === 0) return;

    if (currentSlideIndex >= lesson.slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = lesson.slides.length - 1;

    const slide = lesson.slides[currentSlideIndex];

    const counterEl = document.getElementById('slide-counter');
    if (counterEl) {
        counterEl.textContent = 'Slide ' + (currentSlideIndex + 1) + ' de ' + lesson.slides.length;
    }

    const titleEl = document.getElementById('slide-title');
    if (titleEl) titleEl.textContent = slide.title;

    const subEl = document.getElementById('slide-subtitle');
    if (subEl) subEl.textContent = slide.subtitle;

    const bulletsUl = document.getElementById('slide-bullets');
    if (bulletsUl) {
        bulletsUl.innerHTML = slide.bullets.map(function(b) {
            return '<li>' + b + '</li>';
        }).join('');
    }

    const notesEl = document.getElementById('speaker-notes-text');
    if (notesEl) {
        notesEl.textContent = slide.speakerNotes || 'Nenhuma nota adicional para este slide.';
    }
}

function nextSlide() {
    const lesson = allLessons[currentLessonIndex];
    if (lesson && lesson.slides) {
        currentSlideIndex = (currentSlideIndex + 1) % lesson.slides.length;
        renderSlide();
        if (isPlayingAudio) {
            speakCurrentSlide();
        }
    }
}

function prevSlide() {
    const lesson = allLessons[currentLessonIndex];
    if (lesson && lesson.slides) {
        currentSlideIndex = (currentSlideIndex - 1 + lesson.slides.length) % lesson.slides.length;
        renderSlide();
        if (isPlayingAudio) {
            speakCurrentSlide();
        }
    }
}

function nextLesson() {
    if (currentLessonIndex < allLessons.length - 1) {
        stopAudioPlayback();
        loadLesson(currentLessonIndex + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        alert('🎉 Parabéns! Você concluiu todas as ' + allLessons.length + ' aulas da formação Telecom Academy Pro. Faça o download do seu livro oficial na aba de encerramento!');
    }
}

function prevLesson() {
    if (currentLessonIndex > 0) {
        stopAudioPlayback();
        loadLesson(currentLessonIndex - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function toggleLessonComplete() {
    const lesson = allLessons[currentLessonIndex];
    if (!lesson) return;

    if (completedLessons.has(lesson.id)) {
        completedLessons.delete(lesson.id);
    } else {
        completedLessons.add(lesson.id);
    }

    try {
        localStorage.setItem('telecom_academy_completed', JSON.stringify([...completedLessons]));
    } catch (e) {}

    updateProgressBar();
    renderSidebar();
    updateCompleteButton();
}

function toggleLessonDone(lessonId) {
    if (completedLessons.has(lessonId)) {
        completedLessons.delete(lessonId);
    } else {
        completedLessons.add(lessonId);
    }
    try {
        localStorage.setItem('telecom_academy_completed', JSON.stringify([...completedLessons]));
    } catch (e) {}
    updateProgressBar();
    updateCompleteButton();
}

function updateCompleteButton() {
    const lesson = allLessons[currentLessonIndex];
    const btn = document.getElementById('btn-toggle-complete');
    if (!btn || !lesson) return;

    if (completedLessons.has(lesson.id)) {
        btn.textContent = 'Aula Concluída ✓';
        btn.style.background = '#059669';
    } else {
        btn.textContent = 'Marcar como Concluída ✓';
        btn.style.background = '';
    }
}

function updateProgressBar() {
    const text = document.getElementById('progress-text');
    const fill = document.getElementById('progress-fill');
    if (!text || !fill) return;

    const total = allLessons.length || 32;
    const completed = completedLessons.size;
    const pct = Math.round((completed / total) * 100);

    text.textContent = 'Progresso: ' + completed + '/' + total + ' Aulas (' + pct + '%)';
    fill.style.width = Math.max(5, pct) + '%';
}

function switchMainTab(tabName) {
    currentTab = tabName;

    // Atualiza botões
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Atualiza painéis
    document.querySelectorAll('.tab-pane').forEach(function(pane) {
        pane.classList.remove('active');
    });

    const targetPane = document.getElementById('tab-' + tabName);
    if (targetPane) {
        targetPane.classList.add('active');
        try {
            targetPane.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch (e) {}
    }
}

const DIAGRAM_ALIASES = {
    'all-ip-ngn': 'bancada',
    'regulatory-mesh': 'brasil',
    'attenuator-budget': 'bancada',
    'sdr-hardware-chain': 'bancada',
    'openbts-architecture': 'bancada',
    'gsm-authentication-flow': 'bancada',
    'smqueue-sms-flow': 'bancada',
    'yate-message-bus': 'bancada',
    'yate-lcr-routing': 'brasil',
    'extmodule-flow': 'bancada',
    'yateucn-unified-core': 'global',
    'lte-epc-architecture': 'brasil',
    'lte-ofdm-grid': 'bancada',
    'lte-bearer-hierarchy': 'brasil',
    'gtpu-packet-encapsulation': 'global',
    '5g-sba-architecture': 'brasil',
    '5g-aka-milenage': 'bancada',
    'ueransim-pdu-flow': 'brasil',
    '5g-network-slicing': 'global',
    'asterisk-pjsip-objects': 'brasil',
    'e164-lcr-routing': 'brasil',
    'cellular-sip-call': 'brasil',
    'wireguard-global-mesh': 'global',
    'transcontinental-failover': 'global',
    'audio-codec-comparison': 'eua',
    'itu-g107-emodel': 'eua',
    'adaptive-jitter-buffer': 'portugal',
    'traffic-kpis-asr-ner': 'portugal',
    'bss-oss-architecture': 'global',
    'diameter-charging-flow': 'global',
    'microsip-provisioning': 'global',
    'master-audit-summary': 'global'
};

function switchDiagram(type) {
    const img = document.getElementById('active-diagram-img');
    const buttons = document.querySelectorAll('.diag-btn');
    if (!img) return;

    buttons.forEach(function(btn) { btn.classList.remove('active'); });

    const key = DIAGRAM_ALIASES[type] || type || 'bancada';

    const map = {
        'bancada': { 
            file: 'img/diagrama-bancada-rf.svg?v=20261022_v11', 
            idx: 0,
            title: '⚡ Bancada de RF Confinada (Atenuação 60 dB)',
            desc: 'Isolamento de RF e conformidade estrita com o Art. 183 da LGT e Resolução Anatel nº 777/2025.'
        },
        'brasil': { 
            file: 'img/diagrama-brasil.svg?v=20261022_v11', 
            idx: 1,
            title: '🇧🇷 Topologia Brasil (São Paulo 11 ↔ Rio de Janeiro 21)',
            desc: 'Roteamento Least Cost Routing (LCR), túnel SIP PJSIP com TLS/SRTP e convergência celular Open5GS.'
        },
        'eua': { 
            file: 'img/diagrama-eua.svg?v=20261022_v11', 
            idx: 2,
            title: '🇺🇸 Topologia Estados Unidos (Miami FL ↔ Nova York NY)',
            desc: 'Gateway SIP intercontinental, tratamento E.164 NANP (+1) e redundância de Core HSS/UDM.'
        },
        'portugal': { 
            file: 'img/diagrama-portugal.svg?v=20261022_v11', 
            idx: 3,
            title: '🇵🇹 Topologia Portugal (Lisboa ↔ Porto)',
            desc: 'Interconexão regulatória ANACOM, Core 5G SA edge e trânsito IP europeu de alta fidelidade.'
        },
        'global': { 
            file: 'img/diagrama-global.svg?v=20261022_v11', 
            idx: 4,
            title: '🌍 Topologia Global Convergente (Brasil, EUA & Portugal)',
            desc: 'Malha global de 3 países e 6 cidades interconectada por túneis WireGuard com failover automático e LCR.'
        }
    };

    const target = map[key] || map['bancada'];
    img.src = target.file;

    const diagTitle = document.getElementById('active-diagram-title');
    const diagDesc = document.getElementById('active-diagram-desc');
    const diagLink = document.getElementById('active-diagram-link');
    if (diagTitle) diagTitle.textContent = target.title;
    if (diagDesc) diagDesc.textContent = target.desc;
    if (diagLink) diagLink.href = target.file;

    if (buttons[target.idx]) {
        buttons[target.idx].classList.add('active');
    }
}

function filterLessons() {
    const input = document.getElementById('curriculum-search');
    const query = (input ? input.value : '').toLowerCase().trim();

    if (!query) {
        document.querySelectorAll('.lesson-item').forEach(function(el) {
            el.style.display = 'flex';
        });
        return;
    }

    allLessons.forEach(function(l) {
        const item = document.getElementById('lesson-item-' + l.id);
        if (!item) return;

        const match = l.title.toLowerCase().includes(query) ||
                      l.tag.toLowerCase().includes(query) ||
                      ((l.theoryText || l.theory) && ((l.theoryText || l.theory).toLowerCase().includes(query)));

        item.style.display = match ? 'flex' : 'none';
    });
}

// -------------------------------------------------------------
// REPRODUTOR DE ÁUDIO OFICIAL (Podcast de Telecomunicações M4A)
// -------------------------------------------------------------
function initAudioEvents() {
    const audio = document.getElementById('lesson-audio');
    const timeDisplay = document.getElementById('audio-time');
    const btn = document.getElementById('btn-audio-play');
    if (!audio) return;

    audio.addEventListener('timeupdate', function() {
        const cur = formatTime(audio.currentTime);
        const dur = formatTime(audio.duration || 1557);
        if (timeDisplay) timeDisplay.textContent = cur + ' / ' + dur;
    });

    audio.addEventListener('ended', function() {
        stopAudioPlayback();
    });

    audio.addEventListener('error', function(e) {
        if (btn) btn.textContent = '🎙️ Áudio em Processamento';
    });
}

function toggleAudio() {
    const audio = document.getElementById('lesson-audio');
    if (!audio) return;

    if (audio.paused) {
        startAudioPlayback();
    } else {
        stopAudioPlayback();
    }
}

function startAudioPlayback() {
    const audio = document.getElementById('lesson-audio');
    const btn = document.getElementById('btn-audio-play');
    if (!audio) return;

    audio.play().then(function() {
        isPlayingAudio = true;
        if (btn) btn.textContent = '⏸ Pausar Áudio';
    }).catch(function(e) {
        console.error('Falha na reprodução de áudio:', e);
        if (btn) btn.textContent = '▶ Tentar Novamente';
    });
}

function stopAudioPlayback() {
    const audio = document.getElementById('lesson-audio');
    const btn = document.getElementById('btn-audio-play');
    if (!audio) return;

    audio.pause();
    isPlayingAudio = false;
    if (btn) btn.textContent = '▶ Ouvir Aula';
}

function updateAudioTimeDisplay() {
    const timeDisplay = document.getElementById('audio-time');
    if (!timeDisplay) return;

    const cur = formatTime(audioSecondsElapsed);
    timeDisplay.textContent = cur + ' / 25:57';
}

function formatTime(secs) {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return m + ':' + s;
}

// -------------------------------------------------------------
// SIMULADOR DE ROTEAMENTO SIP / E.164
// -------------------------------------------------------------
function simulateCall() {
    const callerEl = document.getElementById('sim-caller');
    const calledEl = document.getElementById('sim-called');
    const resBox = document.getElementById('sim-result-box');
    if (!callerEl || !calledEl || !resBox) return;

    const caller = callerEl.value;
    const called = calledEl.value;

    let rota = '';
    let tipo = '';
    let codec = 'G.711u / Opus HD';
    let sbc = 'Yate SBC Matriz SP (10.11.0.1)';
    let latencia = '~1 ms (Rede Local)';
    let economia = '100% (Sem tarifação PSTN)';

    if (called === '8001') {
        tipo = '⚡ Teste de Eco Acústico de Precisão';
        rota = 'Asterisk PBX Local -> Echo() Application (Porta 5060)';
        latencia = '< 0.5 ms';
    } else if (called === '8000') {
        tipo = '👥 Sala de Conferência Internacional';
        rota = 'Asterisk PBX Local -> ConfBridge() Global Room #1';
        latencia = '< 1.0 ms';
    } else if (called.startsWith('11')) {
        tipo = '🇧🇷 Chamada Local São Paulo (DDD 11)';
        rota = 'Yate SP -> Asterisk Matriz (10.11.0.10) -> Ramal ' + called;
    } else if (called.startsWith('21') && !called.startsWith('2121')) {
        tipo = '🇧🇷 Chamada Interurbana Brasil (SP ↔ RJ)';
        rota = 'Yate SP (10.11.0.1) -> Túnel SIP LCR -> Yate RJ (10.21.0.1) -> Ramal ' + called;
        latencia = '~8 ms';
        economia = '100% (Sem cobrança de degrau tarifário DDI/DDD)';
    } else if (called.startsWith('305')) {
        tipo = '🇺🇸 Chamada DDI Estados Unidos (Miami FL)';
        rota = 'Yate SP -> Cabo Submarino Latam -> Yate Miami (10.30.5.1) -> Ramal 3051';
        codec = 'G.711u (PCMU NANP)';
        latencia = '~110 ms';
        economia = '75% (Breakout Local PSTN Miami)';
    } else if (called.startsWith('2121')) {
        tipo = '🇺🇸 Chamada DDI Estados Unidos (Nova York NY)';
        rota = 'Yate SP -> Túnel TLS/SRTP -> Yate New York (10.21.2.1) -> Ramal 2121';
        codec = 'G.711u (PCMU NANP)';
        latencia = '~125 ms';
        economia = '75% (Breakout Local Wall St)';
    } else if (called.startsWith('3511')) {
        tipo = '🇵🇹 Chamada DDI Portugal (Lisboa Sede Europa)';
        rota = 'Yate SP -> Cabo EllaLink -> Yate Lisboa (10.35.1.1) -> Ramal 3511';
        codec = 'Transcodificação C++: G.711u (SP) ↔ G.711a (PCMA Lisboa)';
        latencia = '~85 ms';
        economia = '80% (Breakout Local ANACOM Europa)';
    } else if (called.startsWith('3512')) {
        tipo = '🇵🇹 Chamada DDI Portugal (Porto Polo Norte)';
        rota = 'Yate SP -> Cabo EllaLink -> Yate Porto (10.35.2.1) -> Ramal 3512';
        codec = 'Transcodificação C++: G.711u (SP) ↔ G.711a (PCMA Porto)';
        latencia = '~88 ms';
        economia = '80% (Breakout Local Norte PT)';
    } else {
        tipo = '🌐 Roteamento Internacional Genérico';
        rota = 'Yate SP -> Trunk Global -> Terminação E.164 Destino ' + called;
        latencia = '~100 ms';
        economia = '65% (LCR Transatlântico)';
    }

    resBox.style.display = 'block';
    resBox.innerHTML = 
        '<div class="result-badge">' + tipo + '</div>' +
        '<div class="call-metrics-grid">' +
        '<div class="metric-item"><span class="m-label">Origem:</span><span class="m-val">' + caller + '</span></div>' +
        '<div class="metric-item"><span class="m-label">Destino:</span><span class="m-val">' + called + '</span></div>' +
        '<div class="metric-item"><span class="m-label">Latência Estimada:</span><span class="m-val highlight">' + latencia + '</span></div>' +
        '<div class="metric-item"><span class="m-label">Economia Gerada:</span><span class="m-val green">' + economia + '</span></div>' +
        '</div>' +
        '<div class="route-path-box">' +
        '<strong>Caminho de Sinalização (Hop-by-Hop LCR):</strong>' +
        '<p><code>' + rota + '</code></p>' +
        '<p><strong>Codec & Mídia:</strong> <code>' + codec + '</code></p>' +
        '</div>';
}


/* ====================================================================
   SISTEMA DE LEITURA STT (SPEECH-TO-TEXT) E SÍNTESE DE VOZ (TTS)
   ==================================================================== */

let isSTTInitialized = false;
let currentHighlightedChapter = null;

function togglePodcastSTT() {
    const panel = document.getElementById('podcast-stt-panel');
    const btn = document.getElementById('btn-audio-stt');
    if (!panel) return;

    if (panel.style.display === 'none' || !panel.style.display) {
        if (!isSTTInitialized) {
            initPodcastSTT();
        }
        panel.style.display = 'flex';
        if (btn) btn.textContent = '✕ Ocultar Transcrição';
        try {
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch (e) {}
    } else {
        panel.style.display = 'none';
        if (btn) btn.textContent = '📄 Ler Transcrição (STT)';
    }
}

function initPodcastSTT() {
    renderPodcastSTT('');
    isSTTInitialized = true;

    // Sincroniza destaque visual do capítulo com a reprodução do áudio
    const audio = document.getElementById('lesson-audio');
    if (audio) {
        audio.addEventListener('timeupdate', syncSTTWithAudio);
    }
}

function renderPodcastSTT(filterTerm) {
    const container = document.getElementById('stt-chapters-container');
    if (!container || typeof PODCAST_STT_CHAPTERS === 'undefined') return;

    const term = (filterTerm || '').toLowerCase().trim();
    let html = '';

    PODCAST_STT_CHAPTERS.forEach(function(chap) {
        let matchesSearch = true;
        let paragraphsHtml = '';

        if (term) {
            const inTitle = chap.title.toLowerCase().includes(term);
            const matchingParas = chap.paragraphs.filter(function(p) { return p.toLowerCase().includes(term); });
            matchesSearch = inTitle || matchingParas.length > 0;

            if (matchesSearch) {
                paragraphsHtml = chap.paragraphs.map(function(p) {
                    if (p.toLowerCase().includes(term)) {
                        const regex = new RegExp('(' + escapeRegExp(term) + ')', 'gi');
                        const highlighted = p.replace(regex, '<mark>$1</mark>');
                        return '<p class="stt-paragraph">' + highlighted + '</p>';
                    }
                    return '<p class="stt-paragraph">' + p + '</p>';
                }).join('');
            }
        } else {
            paragraphsHtml = chap.paragraphs.map(function(p) {
                return '<p class="stt-paragraph">' + p + '</p>';
            }).join('');
        }

        if (matchesSearch) {
            html += '<div class="stt-chapter-card" id="stt-card-' + chap.id + '">' +
                '<div class="stt-chapter-head">' +
                '<button class="timestamp-pill" onclick="seekAudioTime(' + chap.timeSec + ')" title="Saltar para este minuto no áudio">' +
                '▶ ' + chap.timeLabel +
                '</button>' +
                '<h4 class="stt-chapter-title">' + chap.title + '</h4>' +
                '</div>' +
                paragraphsHtml +
                '</div>';
        }
    });

    if (!html) {
        html = '<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">Nenhum trecho encontrado para a busca "' + escapeHtml(term) + '".</div>';
    }

    container.innerHTML = html;
}

function filterPodcastSTT() {
    const input = document.getElementById('stt-search-input');
    const term = input ? input.value : '';
    renderPodcastSTT(term);
}

function seekAudioTime(secs) {
    const audio = document.getElementById('lesson-audio');
    if (!audio) return;

    audio.currentTime = secs;
    startAudioPlayback();

    // Destaque visual
    highlightSTTChapterByTime(secs);
}

function syncSTTWithAudio() {
    const audio = document.getElementById('lesson-audio');
    if (!audio || typeof PODCAST_STT_CHAPTERS === 'undefined') return;

    const curTime = audio.currentTime;
    let activeChap = null;

    for (let i = PODCAST_STT_CHAPTERS.length - 1; i >= 0; i--) {
        if (curTime >= PODCAST_STT_CHAPTERS[i].timeSec) {
            activeChap = PODCAST_STT_CHAPTERS[i];
            break;
        }
    }

    if (activeChap && activeChap.id !== currentHighlightedChapter) {
        currentHighlightedChapter = activeChap.id;
        document.querySelectorAll('.stt-chapter-card').forEach(function(card) {
            card.classList.remove('highlight');
        });
        const activeCard = document.getElementById('stt-card-' + activeChap.id);
        if (activeCard) {
            activeCard.classList.add('highlight');
        }
    }
}

function highlightSTTChapterByTime(secs) {
    if (typeof PODCAST_STT_CHAPTERS === 'undefined') return;
    let chap = PODCAST_STT_CHAPTERS[0];
    for (let i = PODCAST_STT_CHAPTERS.length - 1; i >= 0; i--) {
        if (secs >= PODCAST_STT_CHAPTERS[i].timeSec) {
            chap = PODCAST_STT_CHAPTERS[i];
            break;
        }
    }
    if (chap) {
        document.querySelectorAll('.stt-chapter-card').forEach(function(c) {
            c.classList.remove('highlight');
        });
        const card = document.getElementById('stt-card-' + chap.id);
        if (card) {
            card.classList.add('highlight');
            try {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (e) {}
        }
    }
}

function copyPodcastSTT() {
    if (typeof PODCAST_STT_CHAPTERS === 'undefined') return;
    let fullText = '=== TRANSCRIÇÃO INTEGRAL STT: TELECOM ACADEMY PRO ===\n\n';
    PODCAST_STT_CHAPTERS.forEach(function(chap) {
        fullText += '[' + chap.timeLabel + '] ' + chap.title + '\n';
        chap.paragraphs.forEach(function(p) {
            fullText += p + '\n\n';
        });
    });

    navigator.clipboard.writeText(fullText).then(function() {
        const copyBtn = document.querySelector('.btn-copy-stt');
        if (copyBtn) {
            const original = copyBtn.textContent;
            copyBtn.textContent = '✓ Copiado!';
            copyBtn.style.borderColor = 'var(--accent)';
            copyBtn.style.color = 'var(--accent)';
            setTimeout(function() {
                copyBtn.textContent = original;
                copyBtn.style.borderColor = '';
                copyBtn.style.color = '';
            }, 2500);
        }
    }).catch(function(err) {
        console.error('Falha ao copiar:', err);
    });
}

function toggleSlideTTS() {
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            updateTTSButtonState(false);
            return;
        }
        speakCurrentSlide();
    } else {
        alert('Seu navegador não possui suporte nativo à síntese de voz (Web Speech API). Utilize a leitura do texto dos slides.');
    }
}

function speakCurrentSlide() {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const lesson = allLessons[currentLessonIndex];
    if (!lesson || !lesson.slides || !lesson.slides[currentSlideIndex]) return;

    const slide = lesson.slides[currentSlideIndex];
    const textToSpeak = slide.speakerNotes || (slide.title + '. ' + slide.subtitle);

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(function(v) { return v.lang.startsWith('pt'); });
    if (ptVoice) utterance.voice = ptVoice;

    utterance.onstart = function() {
        updateTTSButtonState(true);
    };

    utterance.onend = function() {
        updateTTSButtonState(false);
    };

    utterance.onerror = function() {
        updateTTSButtonState(false);
    };

    window.speechSynthesis.speak(utterance);
}

function updateTTSButtonState(isSpeaking) {
    const btn = document.getElementById('btn-slide-tts');
    if (!btn) return;

    if (isSpeaking) {
        btn.textContent = '⏸ Pausar Narração';
        btn.classList.add('speaking');
    } else {
        btn.textContent = '🔊 Ouvir Narração';
        btn.classList.remove('speaking');
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
}


/**
 * ====================================================================
 * DOCKER LAB & EXERCICIOS MAO NA MASSA
 * ====================================================================
 */

function updateLessonDockerLab(lesson) {
    if (!lesson) return;
    
    const labData = (typeof LESSON_DOCKER_LABS !== 'undefined') ? LESSON_DOCKER_LABS[lesson.id] : null;

    const titleEl = document.getElementById('docker-lesson-title');
    const goalEl = document.getElementById('docker-lesson-goal');
    const cmdEl = document.getElementById('docker-lesson-cmd');
    const stepsEl = document.getElementById('docker-lesson-steps');
    const exerciseEl = document.getElementById('docker-lesson-exercise');
    const expectedEl = document.getElementById('docker-lesson-expected');
    const tipEl = document.getElementById('docker-lesson-tip');

    if (labData) {
        if (titleEl) titleEl.textContent = lesson.id + ' — ' + labData.title;
        if (goalEl) goalEl.textContent = labData.goal;
        if (cmdEl) cmdEl.textContent = labData.dockerCmd;
        
        if (stepsEl) {
            stepsEl.innerHTML = '';
            if (Array.isArray(labData.steps)) {
                labData.steps.forEach(function(step) {
                    const li = document.createElement('li');
                    li.textContent = step;
                    stepsEl.appendChild(li);
                });
            }
        }

        if (exerciseEl) exerciseEl.textContent = labData.exercise;
        if (expectedEl) expectedEl.textContent = labData.expectedOutput;
        if (tipEl) tipEl.textContent = labData.quickTip;
    } else {
        if (titleEl) titleEl.textContent = lesson.id + ' — Laboratorio Pratico Confinado';
        if (goalEl) goalEl.textContent = 'Suba os containers do laboratorio Docker para testar na pratica os conceitos desta aula.';
        if (cmdEl) cmdEl.textContent = 'docker compose up -d';
        if (stepsEl) {
            stepsEl.innerHTML = '<li>Abra o terminal na pasta docker-lab.</li><li>Execute: docker compose up -d.</li><li>Acesse a WebUI em http://localhost:9999.</li>';
        }
        if (exerciseEl) exerciseEl.textContent = 'Inicie os containers e verifique com docker compose ps.';
        if (expectedEl) expectedEl.textContent = 'Todos os servicos de telecom operando normalmente em background.';
        if (tipEl) tipEl.textContent = 'Consulte o arquivo COMO_SUBIR_O_LABORATORIO.md na pasta do projeto.';
    }
}

function copyDockerCmd(button) {
    const cmdEl = document.getElementById('docker-lesson-cmd');
    if (!cmdEl) return;
    const text = cmdEl.textContent.trim();
    
    navigator.clipboard.writeText(text).then(function() {
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Copiado!';
        button.style.background = 'var(--accent)';
        button.style.color = '#ffffff';
        setTimeout(function() {
            button.innerHTML = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }).catch(function(err) {
        console.warn('Erro ao copiar comando:', err);
    });
}

function copyGitCloneCommand(button) {
    const text = 'git clone https://github.com/programandosolucoes/lab-openbts.git';
    
    navigator.clipboard.writeText(text).then(function() {
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Copiado!';
        button.style.background = 'var(--accent)';
        button.style.color = '#ffffff';
        setTimeout(function() {
            button.innerHTML = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }).catch(function(err) {
        console.warn('Erro ao copiar comando Git:', err);
    });
}
