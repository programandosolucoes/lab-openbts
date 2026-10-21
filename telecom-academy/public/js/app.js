let lessons = [];
let currentLessonIndex = 0;
let completedLessons = new Set();

const lessonDetails = [
    {
        content: `
            <h2>1. Do Circuito ao Pacote (A Morte das Caixas Proprietárias)</h2>
            <p>Durante quase 100 anos, uma rede telefônica exigia equipamentos caros e proprietários (Siemens, Ericsson, Lucent) onde a inteligência e o transporte eram inseparáveis. Uma chamada reservava um circuito físico permanente de 64 kbit/s mesmo durante o silêncio.</p>
            <p>Com as <strong>Redes de Próxima Geração (NGN)</strong>, a telefonia virou apenas mais uma aplicação sobre pacotes IP. A inteligência migrou dos comutadores pesados para o <strong>software de uso geral</strong>.</p>

            <div class="alert-box">
                <div class="alert-title">⚖️ Princípio da Legalidade Absoluta (Marco Legal Brasileiro)</div>
                <p>O <strong>art. 183 da Lei Geral de Telecomunicações (Lei 9.472/1997)</strong> tipifica como crime desenvolver clandestinamente telecomunicações, com pena de 2 a 4 anos de detenção. A alegação de "estudo acadêmico" <strong>não</strong> afasta o crime se você transmitir sinal no ar sem título habilitante.</p>
                <p><strong>A regra de ouro da bancada:</strong> Para estudar sem riscos jurídicos, a bancada deve ser <strong>integralmente cabeada com atenuadores coaxiais de 60 dB e sem nenhuma antena instalada</strong>. Assim, a energia eletromagnética nunca vaza para o meio externo.</p>
            </div>

            <h2>2. Serviço de Telecomunicações vs. Serviço de Valor Adicionado (SVA)</h2>
            <ul>
                <li><strong>SVA (Serviço de Valor Adicionado):</strong> PABX corporativo, URAs, correio de voz e ramais internos rodando sobre a internet da própria empresa. <em>Não requer outorga de telecomunicações da Anatel.</em></li>
                <li><strong>SMP (Serviço Móvel Pessoal):</strong> Oferta de chamadas para números públicos a terceiros com remuneração e uso de radiofrequência. <em>Exige outorga própria ou contrato de MVNO regulado.</em></li>
            </ul>
        `
    },
    {
        content: `
            <h2>1. Por Que o Yate é o Motor Favorito para Redes Móveis?</h2>
            <p>O <strong>Asterisk</strong> nasceu para PABX corporativo TDM/SIP clássico, centrado em canais bidirecionais rígidos. Já o <strong>Yate (Yet Another Telephony Engine)</strong> foi desenhado em C++ com uma arquitetura puramente orientada a <strong>mensagens assíncronas</strong>.</p>
            <p>Para o núcleo do Yate, uma chamada telefônica, uma mensagem SMS ou um registro de assinante 4G são a mesma coisa: um despacho de mensagens nomeadas com parâmetros <code>chave=valor</code>.</p>

            <h3>Fluxo de Mensagens Principais:</h3>
            <ul>
                <li><code>call.route</code>: Disparada quando alguém disca. Permite ao roteador decidir o destino da chamada.</li>
                <li><code>call.execute</code>: Disparada para criar o canal de saída efetivo até o destino.</li>
                <li><code>call.answered</code>: Momento exato em que o destino atende (início de tarifação).</li>
                <li><code>call.drop</code>: Liberação dos recursos e corte da chamada.</li>
            </ul>

            <h2>2. Como o Node.js Controla o Yate via ExtModule</h2>
            <p>O módulo <code>extmodule</code> permite que um script em Node.js se conecte via socket TCP local (porta <code>5039</code>) e assuma o controle do fluxo:</p>
            <pre><code>// Interceptando a chamada no Node.js
client.on('message', (msg) => {
    if (msg.name === 'call.route') {
        const caller = msg.params.caller;
        const called = msg.params.called;
        console.log(\`Chamada recebida de \${caller} para \${called}\`);
        
        // Regra inteligente B2B: Roteia para o gateway PSTN
        const rota = \`sip/sip:\${called}@gw-pstn.operadora.com\`;
        client.send(\`%%>message:\${msg.msgId}:true::\${rota}:handled=true\`);
    }
});</code></pre>
            <div class="alert-box warning">
                <div class="alert-title">🔒 Regra de Segurança Crítica (Prof. Delphini)</div>
                <p>O socket do <code>extmodule.conf</code> deve <strong>sempre</strong> escutar em <code>127.0.0.1</code> e nunca em <code>0.0.0.0</code>. Quem tem acesso a essa porta tem controle total sobre o áudio e a sinalização da central.</p>
            </div>
        `
    },
    {
        content: `
            <h2>1. A Sacada Genial do OpenBTS</h2>
            <p>No GSM clássico de operadora, a antena (BTS) fala com um controlador (BSC) via interface proprietária Abis, que por sua vez se conecta à central móvel (MSC) via cabos E1 e sinalização pesada SS7.</p>
            <p>O <strong>OpenBTS</strong> colapsou toda essa hierarquia: ele faz a antena falar <strong>diretamente SIP</strong> pela rede IP! Para a central telefônica, uma torre de celular vira um mero "ramal SIP".</p>

            <h2>2. É Possível Usar o OpenBTS Sem Antena Física? (Drivers Virtuais e de Rede)</h2>
            <p><strong>SIM!</strong> Você não precisa de uma antena de R$ 15 mil para aprender:</p>
            <ul>
                <li><strong>YateBTS com <code>dummyradio.yate</code>:</strong> O YateBTS possui um módulo transceptor virtual em software que simula as rajadas de rádio e canais lógicos GSM internamente na CPU sem nenhuma placa de rádio conectada.</li>
                <li><strong>Transceiver UDP de Rede:</strong> No OpenBTS e no YateBTS, a camada de rádio (MBTS) comunica-se com a camada de controle através de sockets UDP locais na porta <code>5700</code>. Você pode injetar e capturar quadros GSM via rede Ethernet!</li>
                <li><strong>srsRAN com ZeroMQ (ZMQ):</strong> Em redes LTE/5G modernas, a camada física de radiofrequência é transmitida via sockets ZeroMQ (amostras I/Q sobre TCP/VLAN). O computador roda a antena e o celular virtual trocando rádio digital por dentro do Linux.</li>
            </ul>
        `
    },
    {
        content: `
            <h2>1. Do 4G LTE ao 5G Standalone (Open5GS)</h2>
            <p>A partir do 4G LTE e do 5G, toda a telefonia celular passa a ser comutação de pacotes pura. A voz não trafega mais em circuito dedicado: ela viaja como pacotes de dados através do <strong>VoLTE / VoNR</strong> (baseados em SIP/IMS).</p>
            <p>O <strong>Open5GS</strong> é a implementação aberta em C mais madura do mundo para:</p>
            <ul>
                <li><strong>AMF / MME:</strong> Gerenciamento de mobilidade e autenticação.</li>
                <li><strong>SMF / SGW-C:</strong> Gestão de sessão de dados e alocação de IPs nas APNs.</li>
                <li><strong>UPF / PGW-U:</strong> Encaminhamento do tráfego de dados de alta velocidade.</li>
                <li><strong>UDM / UDR / HSS:</strong> Base mestra de chaves criptográficas e identidades dos chips.</li>
            </ul>

            <h2>2. Como o UERANSIM Simula Celulares 5G no Laboratório Docker</h2>
            <p>No nosso laboratório Docker, o container <code>telecom-ueransim</code> conecta na porta SCTP <code>38412</code> do Open5GS:</p>
            <ol>
                <li>Simula a antena 5G (gNodeB) se registrando no AMF.</li>
                <li>Simula o aparelho celular (UE) enviando o IMSI de teste.</li>
                <li>Executa a autenticação criptográfica <strong>Milenage</strong> contra o banco MongoDB.</li>
                <li>Cria no kernel da máquina a interface virtual <code>uesimtun0</code>.</li>
            </ol>
            <pre><code># Testando a navegação de dados dentro da rede celular virtual:
$ ping -I uesimtun0 8.8.8.8
PING 8.8.8.8 (8.8.8.8) from 10.45.0.2 uesimtun0: 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=14.2 ms</code></pre>
        `
    },
    {
        content: `
            <h2>1. Topologia de 3 Países e 2 Cidades Cada</h2>
            <p>Em uma operadora real ou MVNO global, o roteamento segue a hierarquia internacional <strong>E.164</strong>:</p>
            <ul>
                <li><strong>Brasil (MCC 724 / DDI +55):</strong> POP São Paulo (DDD 11) e POP Rio de Janeiro (DDD 21).</li>
                <li><strong>Estados Unidos (MCC 310 / DDI +1):</strong> POP Miami (305) e POP Nova York (212).</li>
                <li><strong>Portugal (MCC 268 / DDI +351):</strong> POP Lisboa (21) e POP Porto (22).</li>
            </ul>

            <h2>2. Roteamento de Menor Custo (LCR - Least Cost Routing)</h2>
            <p>Quando um assinante disca de São Paulo para Miami (<code>+1 305 555 1234</code>):</p>
            <ol>
                <li>O controlador Yate analisa o prefixo internacional <code>+1 305</code>.</li>
                <li>Em vez de entregar para uma operadora de trânsito internacional cara no Brasil, ele envia a chamada através de um <strong>túnel SIP IPsec interno diretamente para o POP de Miami (172.28.20.1)</strong>.</li>
                <li>O POP de Miami injeta a chamada na PSTN local americana a custo de chamada local. É assim que grandes MVNOs e PABX corporativos globais reduzem os custos de telefonia em até 80%!</li>
            </ol>
        `
    },
    {
        content: `
            <h2>1. Montagem Física de Bancada Cabeada (Conforme o Livro do Prof. Delphini)</h2>
            <p>Quando você decidir testar com aparelhos celulares físicos e chips reais gravados com <em>PySIM</em>, a montagem deve seguir rigorosamente a seguinte cadeia:</p>
            <ol>
                <li><strong>Transceptor SDR (PlutoSDR ou bladeRF):</strong> Conectado via USB 3.0 ao computador.</li>
                <li><strong>Desconecte todas as antenas:</strong> Jamais coloque antena transmissora no SDR em bancada de laboratório.</li>
                <li><strong>Dois Atenuadores Coaxiais de 30 dB (Total: 60 dB):</strong> Conectados em cascata diretamente na saída SMA do SDR. Isso reduz a potência de 1 mW (0 dBm) para 1 picowatt (-60 dBm), impedindo qualquer fuga de sinal.</li>
                <li><strong>Cabo Coaxial até o Aparelho de Teste:</strong> Ligado na entrada de antena do modem ou telefone de teste.</li>
            </ol>

            <h2>2. O Caminho para Lançar sua MVNO em Fevereiro (Resolução Anatel 777/2025)</h2>
            <p>Para cumprir o prazo de <strong>fevereiro</strong> citado pelo Elton nos áudios:</p>
            <ul>
                <li><strong>Modelo Recomendado: MVNO Credenciada (Light MVNO):</strong>
                    Você celebra um <em>Contrato de Representação</em> com uma agregadora credenciada (como Surf Telecom, Arqia/Datora ou Telecall). O contrato é protocolado na Anatel.
                </li>
                <li><strong>Seu Diferencial Tecnológico:</strong>
                    Enquanto a operadora fornece o sinal de rádio e os chips, você entrega para as empresas clientes o <strong>PABX na nuvem integrado ao chip móvel</strong> (desenvolvido no Yate + Node.js), unificando ramais do escritório e celulares corporativos na mesma plataforma!
                </li>
            </ul>
        `
    }
];

async function loadLessons() {
    try {
        const resp = await fetch('/api/lessons');
        lessons = await resp.json();
        renderSidebar();
        renderLesson(0);
    } catch (e) {
        console.error('Erro carregando aulas:', e);
    }
}

function renderSidebar() {
    const nav = document.getElementById('module-nav');
    nav.innerHTML = '';
    lessons.forEach((l, index) => {
        const isCompleted = completedLessons.has(index);
        const a = document.createElement('a');
        a.className = `nav-item ${index === currentLessonIndex ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
        a.onclick = () => {
            showView('lesson');
            renderLesson(index);
        };
        a.innerHTML = `
            <span class="module-num">${isCompleted ? '✓' : index + 1}</span>
            <span>${l.title.split(':')[0]}</span>
        `;
        nav.appendChild(a);
    });
    updateProgress();
}

function renderLesson(index) {
    currentLessonIndex = index;
    const l = lessons[index];
    const detail = lessonDetails[index] || { content: '<p>Conteúdo em atualização.</p>' };

    document.getElementById('lesson-title').innerText = l.title;
    document.getElementById('lesson-category').innerText = l.category;
    document.getElementById('lesson-duration').innerText = `⏱️ ${l.duration}`;
    document.getElementById('lesson-body').innerHTML = detail.content;

    document.getElementById('btn-prev').disabled = index === 0;
    document.getElementById('btn-next').disabled = index === lessons.length - 1;

    renderSidebar();
}

function nextLesson() {
    if (currentLessonIndex < lessons.length - 1) {
        renderLesson(currentLessonIndex + 1);
    }
}

function prevLesson() {
    if (currentLessonIndex > 0) {
        renderLesson(currentLessonIndex - 1);
    }
}

function markCompleted() {
    completedLessons.add(currentLessonIndex);
    renderSidebar();
    if (currentLessonIndex < lessons.length - 1) {
        nextLesson();
    }
}

function updateProgress() {
    const total = lessons.length || 6;
    const count = completedLessons.size;
    const pct = Math.round((count / total) * 100);
    document.getElementById('progress-text').innerText = `Progresso: ${count}/${total} Módulos (${pct}%)`;
    document.getElementById('progress-fill').style.width = `${pct}%`;
}

function showView(viewName) {
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.special-nav').forEach(n => n.classList.remove('active'));

    if (viewName === 'lesson') {
        document.getElementById('view-lesson').classList.add('active');
    } else if (viewName === 'routing') {
        document.getElementById('view-routing').classList.add('active');
    } else if (viewName === 'hardware') {
        document.getElementById('view-hardware').classList.add('active');
    } else if (viewName === 'docker') {
        document.getElementById('view-docker').classList.add('active');
    }
}

async function simulateCall() {
    const caller = document.getElementById('dial-caller').value;
    const destination = document.getElementById('dial-dest').value;

    const resp = await fetch('/api/simulate-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caller, destination })
    });
    const data = await resp.json();

    const out = document.getElementById('route-output');
    out.style.display = 'block';
    out.innerHTML = `
        <h4 style="color: #38bdf8; margin-bottom: 8px;">📡 Análise do Evento Yate (call.route)</h4>
        <p><strong>Origem:</strong> <code>${data.caller}</code> ➡️ <strong>Destino Discado:</strong> <code>${data.destination}</code></p>
        <p><strong>Tipo de Chamada Classificada:</strong> <span style="color: #34d399; font-weight: bold;">${data.callType}</span></p>
        <p><strong>País / Cidade Identificados:</strong> ${data.matchedCountry} (${data.matchedCity})</p>
        <p><strong>Tronco / Gateway SIP Selecionado:</strong> <code>${data.gateway}</code></p>
        <p><strong>Protocolo & Latência Estimada:</strong> ${data.protocol} (~${data.latencyEstimatedMs} ms)</p>
        <p style="margin-top: 10px; font-size: 0.85rem; color: #94a3b8;">
            <em>O controlador Node.js respondeu ao motor Yate: <code>%%>message:ID:true::sip/sip:${data.cleanDest}@${data.gateway}:handled=true</code></em>
        </p>
    `;
}

// Inicializa ao carregar
window.addEventListener('DOMContentLoaded', () => {
    loadLessons();
});
