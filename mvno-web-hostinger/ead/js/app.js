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

// Inicialização ao carregar o DOM
document.addEventListener('DOMContentLoaded', function() {
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

    // Atualiza Teoria
    const theoryEl = document.getElementById('active-lesson-theory');
    if (theoryEl) theoryEl.innerHTML = lesson.theoryText || lesson.theory || "";

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
    }
}

function switchDiagram(type) {
    const img = document.getElementById('active-diagram-img');
    const buttons = document.querySelectorAll('.diag-btn');
    if (!img) return;

    buttons.forEach(function(btn) { btn.classList.remove('active'); });

    const map = {
        'bancada': { file: 'img/diagrama-bancada-rf.svg', idx: 0 },
        'brasil': { file: 'img/diagrama-brasil.svg', idx: 1 },
        'eua': { file: 'img/diagrama-eua.svg', idx: 2 },
        'portugal': { file: 'img/diagrama-portugal.svg', idx: 3 },
        'global': { file: 'img/diagrama-global.svg', idx: 4 }
    };

    const target = map[type] || map['bancada'];
    img.src = target.file;

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
