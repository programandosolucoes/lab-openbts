/**
 * @file module3.mjs
 * @description Módulo 3: Software por Software — Configurações, Parâmetros e Motores em Detalhes
 */

export const module3 = {
  id: 3,
  title: "Módulo 3: Software por Software — Configurações, Parâmetros e Motores em Detalhes",
  summary: "A dissecção de cada software do laboratório: o Core 5G Open5GS e seus microsserviços (AMF/SMF/UPF), o motor de telecomunicações assíncrono Yate, o PABX Asterisk 20+ com driver PJSIP, e o emulador de rádio 5G UERANSIM.",
  lessons: [
    {
      id: "3.1",
      title: "3.1 Open5GS 5G/4G Core: AMF (SCTP 38412), SMF, UPF (GTP-U 2152) e Provisionamento WebUI (Porta 9999)",
      duration: "40 min",
      tag: "Core 5G Open5GS",
      slides: [
        {
          title: "A Arquitetura de Microsserviços do Open5GS",
          subtitle: "Implementação da Service-Based Architecture (SBA) 3GPP Release 16/17",
          bullets: [
            "AMF (Access and Mobility Management Function): Termina a sinalização NGAP (SCTP 38412) e mensagens NAS.",
            "SMF (Session Management Function): Gerencia sessões de dados PDU e aloca endereços IP aos SIM cards.",
            "UPF (User Plane Function): O comutador de pacotes de alta velocidade que processa túneis GTP-U (UDP 2152).",
            "Banco de Dados MongoDB: Armazena perfis de assinantes, credenciais IMSI e chaves de autenticação Ki/OPc."
          ],
          speakerNotes: "O Open5GS é o núcleo 5G de código aberto mais robusto do mundo. Ele quebrou o monopólio de equipamentos proprietários ao permitir rodar uma rede 5G completa em contêineres Docker."
        },
        {
          title: "A Interface de Gerenciamento WebUI (Porta 9999)",
          subtitle: "Provisionamento de Assinantes, IMSI, Ki, OPc e Políticas de QCI",
          bullets: [
            "Acesso Web Centralizado: Interface Node.js/React escutando em http://localhost:9999 (admin/1423).",
            "Identidade Internacional de Assinante (IMSI): Composto por MCC (724), MNC (99) e MSIN (10 dígitos).",
            "Chaves Criptográficas de Autenticação: Ki (128/256 bits) e OPc para o algoritmo Milenage 3GPP.",
            "Configuração de Network Slicing: Single Network Slice Selection Assistance Information (S-NSSAI: SST=1, SD=0x112233)."
          ],
          speakerNotes: "Demonstramos na tela a criação de um assinante no WebUI. A chave Ki nunca é transmitida no ar; tanto o chip SIM quanto o banco UDM do Open5GS calculam hashes criptográficos para confirmar autenticação."
        },
        {
          title: "Configuração do AMF e Associação SCTP",
          subtitle: "O Enlace de Controle Confiável entre gNodeB e o Core",
          bullets: [
            "Por Que SCTP (Stream Control Transmission Protocol)?: Entrega orientada a mensagens sem bloqueio de cabeça de fila (Head-of-Line Blocking).",
            "Multi-Homing: Suporte nativo a múltiplos endereços IP para redundância de cabo físico.",
            "Porta Padronizada 38412: Escuta conexões de dezenas de estações rádio-base (gNodeBs) simultâneas.",
            "Tracing NGAP: Cada novo rádio que sobe envia o NGSetupRequest e recebe o NGSetupResponse com a lista de PLMNs suportadas."
          ],
          speakerNotes: "O SCTP é o protocolo secreto das telecomunicações: une a confiabilidade de entrega do TCP com a preservação de fronteiras de mensagem do UDP."
        },
        {
          title: "O Comutador UPF e o Túnel de Dados GTP-U",
          subtitle: "Encaminhamento de Alta Taxa e Integração com a Tabela de Rotas Linux",
          bullets: [
            "Protocolo PFCP (Porta 8805): A SMF instrui o UPF em tempo real sobre quais túneis abrir e quais regras de firewall aplicar.",
            "GTP-U na Porta 2152: Todo o tráfego de dados e voz dos celulares passa encapsulado por essa porta UDP.",
            "Criação da Interface TUN (ogstun): Dispositivo virtual Linux que entrega os pacotes decapsulados ao sistema operacional.",
            "Habilitação de IP Forwarding: O comando 'sysctl -w net.ipv4.ip_forward=1' transforma o servidor em roteador de operadora."
          ],
          speakerNotes: "Se o UPF falhar, o celular continua com sinal de barra cheia na tela (porque a AMF está viva), mas nenhum byte de internet ou voz trafega. É a clássica 'falha fantasma' de plano de usuário."
        }
      ],
      theoryText: `
        <h3>1. A Estrutura Modular do Core 5G Standalone (Open5GS)</h3>
        <p>O <strong>Open5GS</strong> é uma implementação em C/C++ de alto desempenho dos padrões 3GPP para redes 4G EPC e 5G Core. Na arquitetura 5G Standalone (SA), as funções de rede comunicam-se através de interfaces baseadas em serviços (SBI - Service-Based Interface) utilizando HTTP/2 com serialização JSON:</p>

        <ul>
            <li><strong>NRF (Network Repository Function):</strong> O catálogo de serviços que permite que cada função descubra dinamicamente as outras na rede.</li>
            <li><strong>AMF (Access and Mobility Management Function):</strong> Gerencia a autenticação, segurança e registro de terminais.</li>
            <li><strong>SMF (Session Management Function):</strong> Controla as sessões de dados dos usuários e instrui o plano de dados através do protocolo <strong>PFCP (Packet Forwarding Control Protocol)</strong> conforme a especificação 3GPP TS 29.244.</li>
            <li><strong>UPF (User Plane Function):</strong> Responsável pelo roteamento de pacotes, agregação de túneis GTP-U, inspeção de pacotes e aplicação de regras de tarifação e QoS.</li>
            <li><strong>UDM / UDR / AUSF:</strong> Módulos de gestão de dados de usuários e autenticação criptográfica respaldados pelo banco MongoDB.</li>
        </ul>

        <h3>2. O Algoritmo de Autenticação Milenage e Segurança de SIM Card</h3>
        <p>A segurança celular não utiliza senhas em texto claro nem pares de chaves RSA convencionais. Ela é baseada em uma <strong>chave mestra simétrica Ki de 128 bits</strong> gravada fisicamente na memória segura do chip SIM no momento da fabricação e copiada de forma idêntica no banco de dados do Core Network.</p>
        <p>Quando o terminal solicita registro, o core envia um número pseudoaleatório <code>RAND</code> e um token de autenticação <code>AUTN</code>. O chip SIM processa essas entradas através das funções criptográficas rijndael do conjunto <strong>Milenage (f1, f2, f3, f4, f5)</strong>:</p>
        <ol>
            <li>O chip valida o <code>AUTN</code> para ter certeza de que a rede não é uma estação base falsa (autenticação da rede pelo terminal).</li>
            <li>O chip calcula a resposta <code>RES</code> e a envia de volta ao core.</li>
            <li>Se <code>RES == XRES</code>, a autenticação é bem-sucedida e são derivadas as chaves de sessão <code>K_AMF</code>, <code>K_enc</code> (cifragem) e <code>K_int</code> (integridade).</li>
        </ol>
      `,
      softwareConfig: {
        software: "Open5GS AMF Configuration",
        file: "config/amf.yaml",
        code: `amf:
  sbi:
    - addr: 172.28.0.10
      port: 7777
  ngap:
    - addr: 172.28.0.10
      port: 38412    ; Porta de escuta SCTP para gNodeBs
  guami:
    - plmn_id:
        mcc: 724     ; Brasil
        mnc: 99      ; Rede Privada
      amf_id:
        region: 2
        set: 1
  tai:
    - plmn_id:
        mcc: 724
        mnc: 99
      tac: 1         ; Tracking Area Code 1
  security:
    integrity_order : [ NIA2, NIA1, NIA0 ]
    ciphering_order : [ NEA2, NEA1, NEA0 ]`,
        explanation: "O arquivo amf.yaml configura os identificadores globais da rede (PLMN 724-99, TAC 1), a porta de escuta SCTP 38412 e a ordem de preferência dos algoritmos de criptografia e integridade (NEA2/NIA2 baseado em AES-128)."
      },
      wiresharkAnalysis: {
        protocol: "NGAP / NAS 5GS",
        summary: "Mensagem NAS de Authentication Request enviada pela AMF ao terminal",
        rawTrace: `NGAP-PDU: initiatingMessage (0)
  procedureCode: 14 (DownlinkNASTransport)
  value: DownlinkNASTransport
    AMF-UE-NGAP-ID: 1
    RAN-UE-NGAP-ID: 1
    NAS-PDU: 5GS Mobility Management (5GMM)
      Security Header Type: Plain NAS message (0)
      Message Type: Authentication Request (0x56)
      ngKSI: 0 (NAS Key Set Identifier)
      RAND: 9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d
      AUTN: 112233445566778899aabbccddeeff00 (SQN xor AK || AMF || MAC)`
      },
      diagramType: "layers"
    },

    {
      id: "3.2",
      title: "3.2 Yate Telephony Engine: Arquitetura Assíncrona, regexroute.conf, regfile.conf e Módulo Extmodule Node.js",
      duration: "40 min",
      tag: "Motor Yate C++",
      slides: [
        {
          title: "Yet Another Telephony Engine (Yate)",
          subtitle: "A Arquitetura Orientada a Mensagens em C++ Nativo",
          bullets: [
            "Não Centrado em Canais: Ao contrário do Asterisk histórico, o Yate é um barramento de mensagens assíncronas.",
            "Performance Extrema: Escrito em C++ multi-thread com lock-free queues e consumo ínfimo de memória (RSS < 30 MB).",
            "Módulos Especializados: 'ysipchan' (SIP), 'regexroute' (expressões regulares), 'extmodule' (integração externa).",
            "Suporte a Protocolos de Telecom: SIP, H.323, ISDN, SS7/SIGTRAN (M3UA), MAP e Diameter no mesmo motor."
          ],
          speakerNotes: "O Yate é a joia oculta das telecomunicações abertas. Ele foi projetado por engenheiros de operadora para aguentar dezenas de milhares de chamadas simultâneas sem consumir a CPU do servidor."
        },
        {
          title: "O Ciclo de Vida da Mensagem 'call.route'",
          subtitle: "Como o Yate Decide o Destino de Cada Ligação em Milissegundos",
          bullets: [
            "Disparo do Evento: Quando um pacote SIP INVITE chega, o módulo 'ysipchan' emite a mensagem 'call.route'.",
            "Cadeia de Prioridades (Priority Chaining): Módulos com menor número de prioridade interceptam a mensagem primeiro.",
            "Modificação de Parâmetros: Módulos podem alterar o número chamado, adicionar prefixos ou definir o gateway de saída.",
            "Consumo ou Repasse: Se um módulo preenche o parâmetro 'target', o roteamento é concluído e a chamada é executada."
          ],
          speakerNotes: "Entender o evento call.route é a chave para dominar o Yate. Você pode programar qualquer comportamento complexo de comutação apenas ouvindo e respondendo a essa mensagem."
        },
        {
          title: "O Módulo ExtModule e o Protocolo TCP de Controle",
          subtitle: "Conectando Node.js, Python ou Rust ao Núcleo C++ em 127.0.0.1:5039",
          bullets: [
            "Protocolo Baseado em Linhas de Texto: Mensagens prefixadas por '%%>message', '%%<message' e separadores de parâmetros.",
            "Comando 'watch': Informa ao Yate que o script externo deseja receber eventos específicos (ex: 'watch call.route').",
            "Comando 'install': Permite ao script externo interceptar a mensagem com prioridade e responder com o destino final.",
            "Desacoplamento Seguro: Uma falha no script Node.js não derruba o processo C++ do Yate."
          ],
          speakerNotes: "O ExtModule é o recurso mais poderoso do Yate. Ele permite que desenvolvedores web criem lógicas de telecomunicações complexas em JavaScript sem precisar recompilar código C++."
        },
        {
          title: "Defesa Ativa contra Fraudes em regexroute.conf",
          subtitle: "O Roteador de Expressões Regulares como Firewall de Telefonia",
          bullets: [
            "Casamento de Padrões por Regex: Rotas estruturadas por expressões regulares POSIX no arquivo regexroute.conf.",
            "Ramais Autorizados: Casamento estrito para os ramais das 6 cidades do laboratório (São Paulo, Rio, Miami, NY, Lisboa, Porto).",
            "Roteamento Internacional: Encaminhamento de números E.164 para os troncos SIP corretos.",
            "Regra Inegociável de Encerramento: '.*=-;error=noroute' encerra instantaneamente chamadas para números desconhecidos."
          ],
          speakerNotes: "Se você esquecer a regra de negação explícita no fim do arquivo, o Yate tentará encontrar gateways padrão, abrindo brechas para varreduras maliciosas de scanners SIP na internet."
        }
      ],
      theoryText: `
        <h3>1. A Filosofia Arquitetural do Yate</h3>
        <p>O <strong>Yate (Yet Another Telephony Engine)</strong> difere fundamentalmente de quase todos os outros servidores de PABX e softswitches de código aberto. Enquanto servidores convencionais utilizam o modelo de <em>canais e pontes de áudio rígidas</em>, o Yate é estruturado como um <strong>motor de despacho de mensagens assíncronas com publicação e assinatura (Pub/Sub)</strong> em memória.</p>
        
        <p>No Yate, absolutamente tudo é uma mensagem (<code>class Message</code>). Quando uma chamada chega pela interface SIP, ela não é tratada por um loop fechado; o canal cria uma mensagem <code>call.route</code> contendo atributos chave-valor (ex: <code>caller=1101</code>, <code>called=3511</code>, <code>ip_transport=10.11.0.50</code>) e a dispara no barramento central.</p>

        <h3>2. O Protocolo do ExtModule e a Orquestração Externa</h3>
        <p>O módulo <code>extmodule</code> permite estender o Yate através de sockets TCP ou pipes padrão (stdin/stdout). O protocolo de comunicação é textual e determinístico:</p>
        <ul>
            <li><code>%%&gt;install:&lt;prioridade&gt;:&lt;nome_mensagem&gt;</code>: O script avisa ao motor que quer interceptar uma mensagem com prioridade definida (ex: prioridade 50).</li>
            <li><code>%%&lt;message:&lt;id&gt;:&lt;tempo&gt;:&lt;nome&gt;:&lt;retorno&gt;[:&lt;chave&gt;=&lt;valor&gt;...]</code>: O Yate entrega a mensagem ao script com todos os parâmetros serializados.</li>
            <li><code>%%&gt;message:&lt;id&gt;:&lt;processado&gt;:[&lt;retorno&gt;][:&lt;chave&gt;=&lt;valor&gt;...]</code>: O script responde informando se a mensagem foi tratada (<code>true</code>) e qual é o <code>target</code> de conexão da chamada.</li>
        </ul>
      `,
      softwareConfig: {
        software: "Yate ExtModule Node.js Controller",
        file: "docker-lab/yate-node/yate_controller.js",
        code: `// Interceptador de Chamadas Yate ExtModule em Node.js
const net = require('net');
const client = net.createConnection({ host: '127.0.0.1', port: 5039 }, () => {
    console.log('[Yate-Node] Conectado ao socket de controle local');
    // Instala interceptor com prioridade 50 (executa antes do dialplan comum)
    client.write('%%>install:50:call.route\\n');
});

client.on('data', (data) => {
    const line = data.toString('utf-8').trim();
    if (line.startsWith('%%<message:') && line.includes(':call.route:')) {
        const parts = line.split(':');
        const msgId = parts[1];
        console.log(\`[Yate-Node] Processando roteamento da mensagem \${msgId}\`);
        
        // Regra inteligente: Ramais 11xx encaminhados para trunk SIP de Sao Paulo
        client.write(\`%%>message:\${msgId}:true:handled:target=sip/sip:carrier_sp:handled=true\\n\`);
    }
});`,
        explanation: "O script Node.js intercepta em tempo real cada evento 'call.route', analisa os metadados do originador e instrui o Yate a direcionar o fluxo de voz para o trunk SIP apropriado de forma totalmente dinâmica."
      },
      wiresharkAnalysis: {
        protocol: "Yate ExtModule TCP",
        summary: "Linha de comando do protocolo ExtModule trocada em 127.0.0.1:5039",
        rawTrace: `Transmission Control Protocol, Src Port: 5039, Dst Port: 48921
Data (42 bytes):
  %%<message:1001:1792167000:call.route::caller=1101:called=3511:ip_transport=10.11.0.50
[Response from Node.js Controller]:
  %%>message:1001:true:handled:target=sip/sip:172.28.0.30:5060/3511`
      },
      diagramType: "global"
    },

    {
      id: "3.3",
      title: "3.3 Asterisk PBX: PJSIP Channel Driver (pjsip.conf), Dialplan Dinâmico (extensions.conf), Eco (8001) e Conf (8000)",
      duration: "40 min",
      tag: "Asterisk 20+ PBX",
      slides: [
        {
          title: "Asterisk 20+ Moderno: A Substituição do Driver Convencional",
          subtitle: "A Transição Obrigatória do chan_sip para o chan_pjsip",
          bullets: [
            "Aposentadoria Definitiva do chan_sip: Removido do núcleo do Asterisk nas versões modernas por problemas de concorrência.",
            "chan_pjsip (Teluu C Library): Pilha SIP profissional, assíncrona, escalável e modular com múltiplos endpoints.",
            "Desacoplamento em 5 Objetos: 'transport' (rede), 'endpoint' (lógica), 'aor' (endereços), 'auth' (senhas) e 'identify' (IPs).",
            "Suporte Nativo a WebRTC: Criptografia DTLS-SRTP e sinalização segura sobre WSS (WebSocket Secure)."
          ],
          speakerNotes: "Muitos tutoriais antigos na internet ainda usam sip.conf. No nosso laboratório moderno 2026, operamos exclusivamente com pjsip.conf estruturado em seus 5 objetos canônicos."
        },
        {
          title: "Os 5 Objetos Sagrados do chan_pjsip",
          subtitle: "Como o pjsip.conf Organiza Ramais e Troncos sem Ambiguidade",
          bullets: [
            "transport-udp: Define o bind IP (0.0.0.0:5060) e a família de protocolos (IPv4/IPv6).",
            "endpoint: Contém o perfil do ramal, contexto de discagem, codecs suportados (allow=ulaw,alaw) e DTMF.",
            "auth: Armazena o usuário e a senha de alta entropia (auth_type=userpass).",
            "aor (Address of Record): Controla quantos aparelhos podem registrar simultaneamente no mesmo ramal (max_contacts).",
            "identify: Associa pacotes recebidos por endereço IP ao endpoint correto sem exigir autenticação por senha."
          ],
          speakerNotes: "A modularidade do PJSIP permite que você tenha um ramal autenticado em três celulares ao mesmo tempo, ou receba chamadas de uma operadora por IP sem senha através do objeto identify."
        },
        {
          title: "Dialplan Profissional em extensions.conf",
          subtitle: "Lógica de Chamadas, Contextos Isolados e Aplicações Internas",
          bullets: [
            "Contextos Seguros: 'from-internal' para ramais da empresa; contextos públicos separados com restrição total.",
            "Aplicação Echo() (Ramal 8001): Retorna imediatamente o áudio falado pelo usuário para teste de delay e clareza.",
            "Aplicação ConfBridge() (Ramal 8000): Sala de conferência com mixagem digital de áudio em ponto flutuante.",
            "Função DIAL com Timeout e Failover: Tentativa de discagem com transbordo automático se o ramal estiver ocupado."
          ],
          speakerNotes: "O dialplan do Asterisk é uma verdadeira linguagem de programação declarativa. As aplicações Echo e ConfBridge são cruciais no laboratório para aferição de qualidade de bancada."
        },
        {
          title: "Interconexão Asterisk <-> Yate via Tronco SIP",
          subtitle: "Distribuindo Funções: Yate no Roteamento e Asterisk nos Serviços",
          bullets: [
            "Arquitetura de Duplo Motor: O Yate comuta pacotes e controla o rádio móvel; o Asterisk roda URAs, filas e correio de voz.",
            "Tronco SIP Ponto a Ponto: Conexão direta entre 172.28.0.20 (Yate) e 172.28.0.30 (Asterisk).",
            "Preservação do CallerID: Encaminhamento transparente dos números originais E.164 entre os servidores.",
            "Resiliência Operacional: Se um servidor passar por manutenção, o outro mantém chamadas essenciais ativas."
          ],
          speakerNotes: "Grandes operadoras não colocam todos os ovos na mesma cesta. Dividir a comutação rápida no Yate e as aplicações de valor no Asterisk é a melhor prática da indústria."
        }
      ],
      theoryText: `
        <h3>1. A Arquitetura Modular do chan_pjsip no Asterisk Moderno</h3>
        <p>No Asterisk contemporâneo (versões 20 e superiores), o tradicional driver <code>chan_sip</code> foi completamente descontinuado em favor da biblioteca <strong>PJSIP</strong>. A principal vantagem é a completa eliminação de bloqueios globais (locks) que travavam centrais sob alta carga de chamadas simultâneas.</p>

        <p>A configuração do PJSIP é dividida em 5 seções interdependentes que eliminam qualquer ambiguidade de autenticação:</p>
        <ol>
            <li><strong>Transport:</strong> Define a camada de transporte física (UDP, TCP, TLS ou WebSocket).</li>
            <li><strong>Endpoint:</strong> O ponto focal da sessão. Define as regras de mídia (codecs), regras de travessia de NAT (<code>direct_media=no</code>, <code>rtp_symmetric=yes</code>, <code>force_rport=yes</code>) e vincula os outros objetos.</li>
            <li><strong>AOR (Address of Record):</strong> Define a localização de contato do ramal e gerencia os registros SIP recebidos.</li>
            <li><strong>Auth:</strong> As credenciais para autenticação de entrada ou saída (Digest Authentication).</li>
            <li><strong>Identify:</strong> Mapeia troncos de operadoras que autenticam por IP em vez de usuário/senha.</li>
        </ol>

        <h3>2. As Ferramentas de Calibração: Aplicações Echo() e ConfBridge()</h3>
        <p>No desenvolvimento de uma operadora de telefonia, duas ferramentas de software incorporadas ao dialplan do Asterisk são vitais para o processo de comissionamento:</p>
        <ul>
            <li><strong>Aplicação Echo() (Extensão 8001):</strong> Ao discar para o número 8001, o Asterisk responde o canal (200 OK) e lê continuamente os pacotes RTP de uplink, reescrevendo imediatamente o cabeçalho de volta para o downlink do originador. Isso permite ao engenheiro escutar sua própria voz com atraso de ida e volta (Round-Trip Delay), permitindo avaliar se a latência total da rede está abaixo dos 150 ms recomendados pela ITU-T G.114.</li>
            <li><strong>Aplicação ConfBridge() (Extensão 8000):</strong> Uma sala de conferência multiponto de alta performance que realiza a mixagem digital linear dos fluxos de áudio de múltiplos ramais (São Paulo, Rio, Miami e Lisboa conversando juntos no mesmo ambiente sonoro).</li>
        </ul>
      `,
      softwareConfig: {
        software: "Asterisk Moderno PJSIP & Dialplan",
        file: "config/pjsip.conf & extensions.conf",
        code: `; === pjsip.conf ===
[transport-udp]
type=transport
protocol=udp
bind=0.0.0.0:5060

[1101]
type=endpoint
context=from-internal
disallow=all
allow=ulaw,alaw,g729
auth=auth1101
aors=aor1101

[auth1101]
type=auth
auth_type=userpass
username=1101
password=SecretSP1101!

[aor1101]
type=aor
max_contacts=2

; === extensions.conf ===
[from-internal]
exten => 8000,1,NoOp(Conferencia Internacional)
 same => n,ConfBridge(sala-global)
 same => n,Hangup()

exten => 8001,1,NoOp(Teste de Eco de Bancada)
 same => n,Answer()
 same => n,Echo()
 same => n,Hangup()

exten => _[1-3]XXX,1,Dial(PJSIP/\${EXTEN},30)
 same => n,Hangup()`,
        explanation: "Configuração do canal PJSIP e plano de discagem do Asterisk. Demonstra a criação do ramal 1101 com autenticação segura, a sala de conferência ConfBridge no número 8000 e o teste de eco Echo no número 8001."
      },
      wiresharkAnalysis: {
        protocol: "SIP / Asterisk PJSIP",
        summary: "Chamada atendida pelo teste de eco do Asterisk (200 OK + ACK + RTP Loop)",
        rawTrace: `SIP/2.0 200 OK
Via: SIP/2.0/UDP 10.11.0.50:5060;rport=5060;received=10.11.0.50;branch=z9hG4bK-echo-11
From: <sip:1101@10.11.0.30>;tag=9912a
To: <sip:8001@10.11.0.30>;tag=asterisk-echo-81273
Call-ID: a81927cb-4f81-11eb-ae93-0242ac110002@10.11.0.50
CSeq: 1 INVITE
Server: Asterisk PBX 20.5.0
Contact: <sip:10.11.0.30:5060>
Content-Type: application/sdp
Content-Length: 198

v=0
o=Asterisk 1792167000 1 IN IP4 10.11.0.30
s=Asterisk Echo Test
c=IN IP4 10.11.0.30
t=0 0
m=audio 10002 RTP/AVP 0 101
a=rtpmap:0 PCMU/8000
a=rtpmap:101 telephone-event/8000`
      },
      diagramType: "brasil"
    },

    {
      id: "3.4",
      title: "3.4 UERANSIM 5G Radio Emulation: Configuração da gNodeB Virtual, SIM Cards Virtuais e Túnel uesimtun0",
      duration: "35 min",
      tag: "UERANSIM 5G",
      slides: [
        {
          title: "UERANSIM: O Emulador 5G Standalone Mais Avançado",
          subtitle: "Simulação de gNodeB e UE sem Necessidade de Placa SDR Física",
          bullets: [
            "Conformidade Estrita com 3GPP Rel-16: Implementa as pilhas completas RRC, PDCP, RLC, MAC e PHY em C++20.",
            "Criação de Antenas Virtuais: Processo 'nr-gnb' que emite sinalização de controle em direção ao Open5GS.",
            "Emulação de Telefones (UE): Processo 'nr-ue' que simula a inserção física de um cartão SIM com chaves criptográficas.",
            "Interface de Rede Virtual 'uesimtun0': Cria uma placa de rede Linux real por onde o computador navega via 5G."
          ],
          speakerNotes: "O UERANSIM permite que qualquer estudante ou desenvolvedor rode testes de 5G em seu próprio computador, sem precisar gastar dinheiro com transceptores caros ou correr riscos com a Anatel."
        },
        {
          title: "Configurando a gNodeB Virtual (gnb.yaml)",
          subtitle: "Parâmetros de Célula, Frequência e Associação com a AMF",
          bullets: [
            "Identidade da Célula (NR CGI): Combinação de PLMN (724-99) com o NCI de 32 bits.",
            "Tracking Area Code (TAC): Define a área geográfica de rastreamento do terminal (TAC=1).",
            "Configuração do Enlace SCTP: Endereço IP da AMF (172.28.0.10) e porta 38412.",
            "Fatiamento de Rede (Network Slicing): Anúncio dos S-NSSAIs suportados pela torre virtual."
          ],
          speakerNotes: "A gNodeB virtual se comporta para o Core exatamente como uma torre de telecomunicações de R$ 500.000 da Huawei ou Ericsson: ela faz o mesmo handshake NGSetup e anuncia os mesmos blocos de sinalização."
        },
        {
          title: "O Terminal Virtual e o SIM Card em Software (ue.yaml)",
          subtitle: "Provisionamento de IMSI, Ki, OPc e Estabelecimento de Sessão PDU",
          bullets: [
            "IMSI: Identificador único internacional (ex: 724990000000001).",
            "Chave Ki e OPc: Devem coincidir byte a byte com o cadastro realizado na WebUI do Open5GS.",
            "APN / DNN (Data Network Name): Nome do ponto de acesso para navegação (ex: 'internet').",
            "Disparo do Registro: O comando 'nr-ue -c ue.yaml' inicia o escaneamento de rádio e realiza o attachment 5G."
          ],
          speakerNotes: "Demonstramos na prática o terminal virtual recebendo o PDU Session Establishment Accept e subindo a interface de rede uesimtun0 com IP 10.45.0.2 alocado pelo Core."
        },
        {
          title: "Roteamento de Voz sobre a Interface 5G Simulada",
          subtitle: "Ligando o Softphone MicroSIP Através do Túnel Celular uesimtun0",
          bullets: [
            "Vinculação de Socket: O MicroSIP é configurado para escutar e emitir tráfego através da interface 10.45.0.2.",
            "Caminho do Pacote SIP: MicroSIP -> uesimtun0 -> gNodeB virtual -> Túnel GTP-U -> UPF Open5GS -> Yate PABX.",
            "Inspeção Unificada no Wireshark: O aluno visualiza os pacotes entrando no túnel de rádio e saindo no core.",
            "Prova de Conceito de VoNR: A chamada de voz completada com sucesso rodando 100% sobre uma rede 5G em software."
          ],
          speakerNotes: "Aqui o laboratório fecha seu ciclo: o aluno vê sua ligação de voz passar por uma rede 5G virtual completa e tocar no ramal de São Paulo ou Lisboa com áudio cristalino."
        }
      ],
      theoryText: `
        <h3>1. A Engenharia do Emulador de Rádio 5G (UERANSIM)</h3>
        <p>O <strong>UERANSIM</strong> é uma solução de software livre desenvolvida em C++20 que implementa as especificações da interface aérea 5G NR (New Radio) e das interfaces de rede NG-RAN padronizadas pelo 3GPP no Release 16.</p>
        
        <p>Ele opera dividindo a emulação em dois processos complementares de espaço de usuário no Linux:</p>
        <ul>
            <li><strong>nr-gnb (A Estação Rádio-Base 5G):</strong> Estabelece o túnel de controle SCTP com a AMF na porta 38412 e atua como o ponto de terminação do protocolo NGAP. No plano de usuário, recebe pacotes de dados e os empacota em túneis GTP-U encaminhados diretamente ao UPF pela porta UDP 2152.</li>
            <li><strong>nr-ue (O Equipamento de Usuário 5G):</strong> Emula o modem celular e o smartcard USIM. Implementa a máquina de estados NAS (5GMM e 5GSM) e o protocolo de autenticação mútua 5G-AKA.</li>
        </ul>

        <h3>2. O Mecanismo da Interface Virtual TUN (uesimtun0)</h3>
        <p>Quando o processo <code>nr-ue</code> completa com êxito o procedimento de <em>PDU Session Establishment</em>, ele recebe da SMF um endereço IPv4 (por exemplo, <code>10.45.0.2</code>) e parâmetros de DNS.</p>
        <p>Para disponibilizar essa conectividade aos programas de aplicação do computador hospedeiro (como softphones MicroSIP, clientes curl ou navegadores), o UERANSIM cria dinamicamente um dispositivo de rede virtual de túnel Linux (<strong>TUN Device</strong>) denominado <code>uesimtun0</code>:</p>
        <ol>
            <li>Qualquer socket associado à interface <code>uesimtun0</code> tem seus pacotes IP capturados pelo processo <code>nr-ue</code>.</li>
            <li>O <code>nr-ue</code> aplica a compressão de cabeçalho e cifra o pacote usando as chaves derivadas na autenticação.</li>
            <li>O pacote é entregue à <code>nr-gnb</code> virtual através de um socket IPC local.</li>
            <li>A <code>nr-gnb</code> encapsula o pacote em GTP-U e o transmite pela rede Ethernet ao UPF do Open5GS, onde o pacote é entregue ao seu destino final (a central Yate ou Asterisk).</li>
        </ol>
      `,
      softwareConfig: {
        software: "UERANSIM UE Configuration",
        file: "config/ue.yaml",
        code: `supi: 'imsi-724990000000001'  ; Subscription Permanent Identifier
mcc: '724'
mnc: '99'

key: '465B5CE8B199B49FAA5F0A2EE238A6BC'  ; Chave secreta Ki (128 bits)
opc: 'E8ED289DEBA952E4283B54E88E6183CA'  ; Chave do operador OPc
amf: '8000'

gnbSearchList:
  - 172.28.0.20                           ; IP da gNodeB virtual

sessions:
  - type: 'IPv4'
    apn: 'internet'                       ; Nome do Ponto de Acesso
    slice:
      sst: 1
      sd: 0x112233`,
        explanation: "O arquivo ue.yaml define a identidade e as credenciais criptográficas do chip SIM virtual. Ao rodar o comando nr-ue com este arquivo, o sistema realiza o attachment completo à rede 724-99 e cria a interface de rede uesimtun0."
      },
      wiresharkAnalysis: {
        protocol: "NAS 5GS / PDU Session",
        summary: "PDU Session Establishment Accept recebido pelo UE com IP 10.45.0.2 alocado",
        rawTrace: `5GS Session Management (5GSM) Message:
  Message Type: PDU Session Establishment Accept (0xc2)
  PDU Session ID: 1
  Selected SSC Mode: SSC Mode 1 (Persistent IP)
  Selected PDU Session Type: IPv4 (1)
  PDU Address: 10.45.0.2
  Authorized QoS Rules:
    QoS Rule 1: DBR (Default Bearer Rule), Precedence: 255, 5QI: 9
  Authorized QoS Flow Descriptions:
    QFI: 1, 5QI: 9, Averaging Window: 2000 ms
  DNS Server IPv4 Address: 8.8.8.8`
      },
      diagramType: "layers"
    }
  ]
};
