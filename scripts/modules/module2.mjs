/**
 * @file module2.mjs
 * @description Módulo 2: Camadas de Rede, Arquitetura de Protocolos e Correlação Fim-a-Fim
 */

export const module2 = {
  id: 2,
  title: "Módulo 2: Camadas de Rede, Arquitetura de Protocolos e Correlação Fim-a-Fim",
  summary: "A correspondência exaustiva entre o Modelo OSI de 7 Camadas e a Pilha 3GPP 4G/5G, a sinalização SIP (RFC 3261), a negociação de mídia SDP (RFC 4566), os túneis GTP-U e a análise forense de pacotes com Wireshark.",
  lessons: [
    {
      id: "2.1",
      title: "2.1 Pilha de Camadas OSI vs. 3GPP Celular (PHY, MAC, RLC, PDCP, RRC, NAS, GTP-U, SIP, RTP)",
      duration: "35 min",
      tag: "Pilhas de Protocolos",
      slides: [
        {
          title: "O Mapeamento de Camadas: OSI vs. 3GPP",
          subtitle: "Como o Mundo Celular Reinterpretou o Modelo de 7 Camadas",
          bullets: [
            "Camada Física (PHY / Camada 1): Modulação OFDM, alocação de subportadoras e blocos de recursos (PRB).",
            "Camada de Enlace (Camada 2 Dividida): Subcamadas MAC (escalonamento/HARQ), RLC (segmentação) e PDCP (cifragem/compressão).",
            "Camada de Rede (Camada 3 Celular): RRC (controle de rádio local) e NAS (sinalização com o Core Network).",
            "Camada de Transporte e Aplicação: Túneis GTP-U sobre UDP, pilha TCP/IP padrão, SIP e áudio RTP."
          ],
          speakerNotes: "Muitos profissionais de redes tentam forçar o modelo OSI puro na rede celular. No 3GPP, a Camada 2 é dividida em três subcamadas ultraespecializadas e a Camada 3 é bifurcada entre rádio (RRC) e core (NAS)."
        },
        {
          title: "A Tríade da Camada 2 Celular: MAC, RLC e PDCP",
          subtitle: "Garantia de Entrega, Cifragem e Compressão de Cabeçalho",
          bullets: [
            "MAC (Medium Access Control): Responsável pela multiplexação de canais lógicos e retransmissão ultra-rápida via HARQ.",
            "RLC (Radio Link Control): Opera em 3 modos: Transparent (TM), Unacknowledged (UM - ótimo para voz) e Acknowledged (AM).",
            "PDCP (Packet Data Convergence Protocol): Aplica compressão de cabeçalho RoHC (RFC 3095) e criptografia AES/SNOW-3G.",
            "Integridade de Sinalização: O PDCP protege mensagens de controle contra falsificação e adulteração."
          ],
          speakerNotes: "Para chamadas de voz VoLTE/VoNR, o RLC opera em modo UM (sem confirmação) para evitar que pacotes de áudio atrasados gerem jitter insuportável."
        },
        {
          title: "Plano de Controle vs. Plano de Usuário",
          subtitle: "A Separação Estrutural do 3GPP (Control/User Plane Separation - CUPS)",
          bullets: [
            "Plano de Controle (C-Plane): Protocolos RRC e NAS que estabelecem a conexão, autenticam o SIM card e alocam túneis.",
            "Plano de Usuário (U-Plane): Pacotes IP gerados pelo celular empacotados dentro de túneis GTP-U e roteados pelo UPF.",
            "Arquitetura CUPS: Permite que a AMF/SMF fique na nuvem central e o UPF fique na borda (Edge Computing) perto do usuário.",
            "Baixa Latência: O tráfego de voz e dados não precisa passar pela inteligência de controle a cada pacote."
          ],
          speakerNotes: "A separação CUPS é o que torna o 5G viável: o plano de dados é puro silício de alta velocidade enquanto o controle roda em microsserviços escaláveis."
        },
        {
          title: "Encapsulamento Aninhado: O Pacote de Voz no Ar",
          subtitle: "De dentro para fora: Áudio PCM -> RTP -> UDP -> IP -> GTP-U -> UDP -> IP -> PDCP -> RLC -> MAC -> PHY",
          bullets: [
            "Camada Mais Interna: 20 ms de áudio codificado em codec G.711u (160 bytes de payload).",
            "Cabeçalhos de Mídia: RTP (12 bytes) + UDP (8 bytes) + IP do Terminal (20 bytes) = 200 bytes.",
            "Encapsulamento Core: GTP-U (8 bytes) + UDP Core (8 bytes) + IP Core (20 bytes).",
            "Encapsulamento de Rádio: Cabeçalhos PDCP, RLC e MAC adicionando tags de controle e paridade CRC."
          ],
          speakerNotes: "Visualizar essa 'boneca russa' de protocolos é o que distingue o engenheiro sênior do iniciante: saber exatamente qual camada introduziu cada overhead ou falha de entrega."
        }
      ],
      theoryText: `
        <h3>1. A Pilha de Protocolos Celular 3GPP e sua Equivalência OSI</h3>
        <p>A arquitetura de protocolos de redes celulares (4G LTE e 5G NR) não segue estritamente a divisão em 7 camadas do modelo ISO/OSI. Ela é estruturada em dois planos verticais: o <strong>Plano de Controle (Control Plane)</strong> e o <strong>Plano de Usuário (User Plane)</strong>.</p>
        
        <h4>As Camadas da Interface Aérea (Uu Interface):</h4>
        <ul>
            <li><strong>Camada Física (PHY - 3GPP TS 38.211):</strong> Modulação de subportadoras ortogonais (OFDMA no downlink, CP-OFDM ou DFT-s-OFDM no uplink), adaptação de modulação e codificação (QPSK, 16-QAM, 64-QAM, 256-QAM) e controle de potência em malha fechada.</li>
            <li><strong>Subcamada MAC (Medium Access Control - TS 38.321):</strong> Mapeamento entre canais lógicos e canais de transporte, escalonamento dinâmico de recursos no tempo e na frequência, e retransmissões rápidas por hardware através de <strong>HARQ (Hybrid Automatic Repeat Request)</strong> com combinação suave (Chase Combining ou Incremental Redundancy).</li>
            <li><strong>Subcamada RLC (Radio Link Control - TS 38.322):</strong> Segmentação e remontagem de pacotes de dados. Opera em modo transparente (TM), modo sem confirmação (UM - ideal para tráfego em tempo real como VoIP/RTP) e modo com confirmação (AM - com ARQ seletivo para dados TCP).</li>
            <li><strong>Subcamada PDCP (Packet Data Convergence Protocol - TS 38.323):</strong> Cifragem e proteção de integridade dos dados e da sinalização utilizando algoritmos padronizados (NEA0/NEA1/NEA2/NEA3), ordenação de entrega e compressão robusta de cabeçalhos IP/UDP/RTP via <strong>RoHC (RFC 3095)</strong>, reduzindo cabeçalhos de 40 bytes para meros 2 a 4 bytes no ar.</li>
        </ul>

        <h3>2. As Camadas Superiores: RRC e NAS</h3>
        <p>Na Camada 3 de sinalização celular ocorrem dois diálogos simultâneos e independentes:</p>
        <ul>
            <li><strong>RRC (Radio Resource Control - TS 38.331):</strong> Termina na estação rádio-base (gNodeB / eNodeB). Controla o estabelecimento de portadoras de rádio (SRB/DRB), medições de qualidade de sinal e procedimentos de handover entre células.</li>
            <li><strong>NAS (Non-Access Stratum - TS 24.501):</strong> Transita transparente pela torre de rádio e termina diretamente no núcleo da rede (AMF / MME). Gerencia autenticação mútua (via algoritmo Milenage no chip SIM), registro de mobilidade (Registration Management) e gerenciamento de sessões de dados PDU (Session Management).</li>
        </ul>
      `,
      softwareConfig: {
        software: "Open5GS SMF & UPF Tunneling",
        file: "config/smf.yaml",
        code: `smf:
  sbi:
    - addr: 172.28.0.10
      port: 7777
  gtpu:
    - addr: 172.28.0.10
  upf:
    - addr: 172.28.0.10
  subnet:
    - addr: 10.45.0.1/16  ; Pool de IPs distribuidos para os SIM cards
  dns:
    - 8.8.8.8
    - 1.1.1.1`,
        explanation: "O Session Management Function (SMF) controla a alocação de endereços IP para os terminais celulares e programa as regras de encaminhamento de pacotes no UPF através do protocolo PFCP (Packet Forwarding Control Protocol - Porta UDP 8805)."
      },
      wiresharkAnalysis: {
        protocol: "GTP-U / IP",
        summary: "Pacote de áudio RTP encapsulado dentro de túnel GPRS Tunneling Protocol (GTP-U)",
        rawTrace: `Frame 102: 242 bytes on wire
Internet Protocol Version 4, Src: 172.28.0.10, Dst: 172.28.0.20
User Datagram Protocol, Src Port: 2152, Dst Port: 2152
GPRS Tunneling Protocol
  Flags: 0x30 (v1, Protocol Type: GTP)
  Message Type: 255 (G-PDU)
  Length: 200
  TEID: 0x00000001 (Tunnel Endpoint Identifier)
[Encapsulated IP Packet]:
  Internet Protocol Version 4, Src: 10.45.0.2, Dst: 10.11.0.1
  User Datagram Protocol, Src Port: 40000, Dst Port: 5060
  Session Initiation Protocol (SIP REGISTER)`
      },
      diagramType: "layers"
    },

    {
      id: "2.2",
      title: "2.2 Sinalização SIP (RFC 3261), Negociação SDP (RFC 4566) e Transporte RTP/SRTP (RFC 3550 / RFC 3711)",
      duration: "40 min",
      tag: "Sinalização SIP & SDP",
      slides: [
        {
          title: "O Protocolo de Iniciação de Sessão (SIP)",
          subtitle: "Arquitetura Cliente-Servidor Baseada em Texto (RFC 3261)",
          bullets: [
            "Inspirado no HTTP e SMTP: Mensagens em texto claro UTF-8 legíveis por humanos (INVITE, ACK, BYE, CANCEL, REGISTER).",
            "Respostas Numéricas: 1xx (Provisório), 2xx (Sucesso), 3xx (Redirecionamento), 4xx (Erro de Cliente), 5xx (Erro de Servidor).",
            "Mecanismo de Transação e Diálogo: Três vias de handshake (INVITE -> 200 OK -> ACK) para garantir sincronismo confiável.",
            "Transporte Flexível: Opera sobre UDP (padrão porta 5060), TCP (mensagens grandes) ou TLS (segurança na porta 5061)."
          ],
          speakerNotes: "O SIP não transporta áudio nem vídeo; ele é puramente o maestro que combina onde, quando e como a conversa vai acontecer."
        },
        {
          title: "Session Description Protocol (SDP - RFC 4566)",
          subtitle: "O Contrato de Mídia Negociado dentro do Envelope SIP",
          bullets: [
            "Proposta e Aceite (Offer/Answer Model): O chamador envia sua oferta SDP no INVITE; o chamado responde no 200 OK.",
            "Linha 'c=' (Connection Data): Informa o endereço IP exato para onde o áudio de retorno deve ser enviado.",
            "Linha 'm=' (Media Description): Declara o tipo de mídia (audio), a porta UDP (ex: 40000) e os codecs suportados.",
            "Linhas 'a=rtpmap': Mapeia números de payload dinâmico para codecs específicos (G.711u=0, G.711a=8, G.729=18, Opus=96)."
          ],
          speakerNotes: "Erros de 'áudio unilateral' (one-way audio) quase sempre decorrem de endereços IP incorretos (privados) enviados dentro da linha c= do SDP atravessando NATs."
        },
        {
          title: "Real-time Transport Protocol (RTP / SRTP)",
          subtitle: "Transporte de Mídia em Tempo Real sobre UDP (RFC 3550 / RFC 3711)",
          bullets: [
            "Por Que UDP?: Atrasos de retransmissão do TCP tornariam a fala ininteligível; perder 1 pacote é melhor que atrasar 500 ms.",
            "Cabeçalho RTP (12 bytes): Número de Sequência (Sequence Number), Timestamp de Amostragem e Identificador SSRC.",
            "Detecção de Jitter e Perda: O cliente receptor utiliza o timestamp para reconstruir o fluxo no jitter buffer.",
            "SRTP (Secure RTP): Criptografia de fluxo AES-Counter Mode e autenticação HMAC-SHA1 para proteger a privacidade da chamada."
          ],
          speakerNotes: "O RTP carrega exatamente fatias de 20 milissegundos de voz. Se o codec for G.711, cada pacote carrega 160 bytes de áudio 50 vezes por segundo."
        },
        {
          title: "RTCP: A Telemetria e Controle de Qualidade",
          subtitle: "Monitoramento Contínuo de Latência, Jitter e MOS Score (RFC 3550)",
          bullets: [
            "Canal em Paralelo (Porta Par/Ímpar): Se o RTP flui na porta UDP 40000, o RTCP flui na porta 40001.",
            "Sender Reports (SR) & Receiver Reports (RR): O receptor informa quantos pacotes perdeu e o nível de oscilação (jitter).",
            "Cálculo de Round-Trip Time (RTT): Mensagens de eco medem o atraso da viagem de ida e volta do pacote.",
            "Adaptação de Taxa: Permite que codecs inteligentes (como Opus ou AMR) reduzam sua taxa de bits em redes congestionadas."
          ],
          speakerNotes: "Graças ao RTCP, o PABX sabe em tempo real se a conexão de internet do usuário degradou e pode tomar ações preventivas de qualidade."
        }
      ],
      theoryText: `
        <h3>1. A Anatomia do Protocolo SIP (RFC 3261)</h3>
        <p>O <strong>Session Initiation Protocol (SIP)</strong> é um protocolo de camada de aplicação, ponto a ponto e cliente-servidor, projetado para criar, modificar e encerrar sessões multimídia interativas. Uma sessão pode ser uma chamada telefônica bidirecional, uma videoconferência ou uma mensagem instantânea.</p>

        <h4>Os Três Conceitos Cardeais do SIP:</h4>
        <ol>
            <li><strong>Transação:</strong> Composta por uma mensagem de requisição enviada pelo cliente (UAC - User Agent Client), zero ou mais respostas provisórias (1xx) e uma resposta final (2xx a 6xx) enviada pelo servidor (UAS - User Agent Server). A transação do INVITE é especial porque inclui também a mensagem de ACK.</li>
            <li><strong>Diálogo:</strong> Uma relação ponto a ponto persistente entre dois User Agents durante todo o tempo em que a chamada está ativa. Um diálogo é unicamente identificado pela tríade: <code>Call-ID</code>, <code>From tag</code> e <code>To tag</code>.</li>
            <li><strong>Sessão:</strong> O fluxo real de mídia (áudio/vídeo) negociado através dos parâmetros de SDP e transportado fora do canal SIP.</li>
        </ol>

        <h3>2. O Modelo Offer/Answer do SDP (RFC 3264 / RFC 4566)</h3>
        <p>O <strong>Session Description Protocol (SDP)</strong> não define um protocolo de transporte próprio; ele atua como um formato declarativo de parâmetros multimídia serializado dentro do corpo de mensagens SIP (com <code>Content-Type: application/sdp</code>).</p>
        <p>O fluxo de negociação segue o modelo de Oferta e Resposta:</p>
        <ul>
            <li>O originador envia no <strong>INVITE</strong> suas capacidades (ex: "tenho o IP 10.11.0.50, escuto áudio na porta UDP 40000 e aceito os codecs G.711u [0], G.711a [8] e G.729 [18]").</li>
            <li>O destinatário analisa a oferta e responde no <strong>200 OK</strong> selecionando a interseção de codecs suportados (ex: "aceito conversar usando o codec G.711u [0], meu IP para retorno é 10.11.0.1 e minha porta UDP é 16400").</li>
        </ul>
      `,
      softwareConfig: {
        software: "Yate SIP Channel Engine",
        file: "config/ysipchan.conf",
        code: `[general]
; Configuracao do canal SIP nativo do Yate
port=5060
bind=0.0.0.0

; Codecs de audio habilitados por ordem de preferencia
codecs=mulaw,alaw,g729

; Temporizadores SIP (RFC 3261)
t1=500        ; Temporizador RTT estimado (ms)
t2=4000       ; Temporizador maximo de retransmissao
nat=yes       ; Ativa deteccao automatica de travessia de NAT
useragent=TelecomAcademy-Engine/2026`,
        explanation: "O arquivo ysipchan.conf programa o comportamento do socket SIP do Yate, habilitando a negociação dos codecs G.711 mulaw e alaw e ativando os algoritmos de travessia de NAT para clientes atrás de roteadores."
      },
      wiresharkAnalysis: {
        protocol: "SIP / SDP / RTP",
        summary: "Negociação de mídia completa (Oferta SDP e Resposta 200 OK)",
        rawTrace: `SIP/2.0 200 OK
Via: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-7291a82c
From: "Diretoria SP" <sip:1101@10.11.0.1>;tag=9as8d7f2
To: <sip:1102@10.11.0.1>;tag=yate-ok-19283
Call-ID: c2a819b0-4f81-11eb-ae93-0242ac110002@10.11.0.50
CSeq: 101 INVITE
Contact: <sip:1102@10.11.0.1:5060>
Content-Type: application/sdp
Content-Length: 185

v=0
o=yate 1792167001 1 IN IP4 10.11.0.1
s=Yate SIP Call
c=IN IP4 10.11.0.1
t=0 0
m=audio 16400 RTP/AVP 0 101
a=rtpmap:0 PCMU/8000
a=rtpmap:101 telephone-event/8000`
      },
      diagramType: "global"
    },

    {
      id: "2.3",
      title: "2.3 Correlação Fim-a-Fim: Do Radio Resource Control (RRC) à Criação de Sessão VoLTE/VoNR e PABX SIP",
      duration: "35 min",
      tag: "Correlação Fim-a-Fim",
      slides: [
        {
          title: "A Jornada Fim-a-Fim da Ligação Celular",
          subtitle: "O Encadeamento Completo de Eventos do Clique à Conversa",
          bullets: [
            "Fase 1: O smartphone em repouso (RRC_IDLE) acorda e dispara o preâmbulo RACH no ar.",
            "Fase 2: Conexão RRC estabelecida com a gNodeB e envio de Service Request NAS para a AMF.",
            "Fase 3: A SMF comanda o UPF a abrir uma PDU Session dedicada (QoS Flow 1 para sinalização IMS).",
            "Fase 4: O cliente IMS do celular envia o SIP INVITE pelo túnel que chega ao core de voz Yate/Asterisk."
          ],
          speakerNotes: "Muitos engenheiros conhecem apenas o mundo IP ou apenas o mundo de RF. O verdadeiro especialista correlaciona o log de rádio com o trace SIP do PABX."
        },
        {
          title: "QoS Flow e Dedicated Bearers: QCI 1 e 5QI 1",
          subtitle: "Por Que a Chamada Celular não 'Engasga' como uma Chamada de Dados Comum",
          bullets: [
            "5QI 1 (5G QoS Identifier): Fluxo com taxa de bits garantida (GBR) reservado exclusivamente para voz conversacional.",
            "Prioridade Absoluta no Rádio: O escalonador MAC descarta pacotes de download para não atrasar pacotes 5QI 1.",
            "Budget de Atraso Estrito (Packet Delay Budget): Limite de 100 ms na interface aérea com perda máxima de 10^-2.",
            "5QI 5: Fluxo não-GBR utilizado para sinalização SIP do IMS (baixa latência e alta prioridade de entrega)."
          ],
          speakerNotes: "A razão pela qual a voz em 4G/5G tem qualidade cristalina é a reserva determinística de recursos: o rádio prioriza o pacote de voz antes de qualquer vídeo ou navegação."
        },
        {
          title: "A Ponte entre o Túnel Celular e a Rede IP Corporativa",
          subtitle: "O Papel do UPF (User Plane Function) como Roteador de Saída",
          bullets: [
            "O Desencapsulamento GTP-U: O UPF retira o pacote IP do túnel de telecom e o entrega à tabela de roteamento Linux.",
            "Interfaces de Rede Virtuais: Criação da interface 'uesimtun0' ou 'ogstun' com MTU ajustada (1400 bytes).",
            "Roteamento Estático e BGP: Encaminhamento direto para o IP do PABX (172.28.0.30) sem passar por NAT.",
            "Mapeamento de Ramal: O IMSI do cartão SIM é associado na base de dados ao número de ramal SIP (ex: 1101)."
          ],
          speakerNotes: "O UPF atua exatamente como um gateway de borda: para o núcleo celular ele é telecomunicações 3GPP; para o PABX ele é simplesmente um roteador IP veloz."
        },
        {
          title: "Handover e Mobilidade sem Queda de Voz",
          subtitle: "Como a Sessão SIP Sobrevive à Troca de Antenas",
          bullets: [
            "Xn Handover (entre gNodeBs): As torres negociam diretamente o repasse do terminal sem passar pelo core.",
            "N2 Handover (via AMF): Quando as gNodeBs não possuem linha de visão direta de rede.",
            "Atualização de Caminho de Dados no UPF: A SMF atualiza o TEID de destino e os pacotes RTP continuam fluindo.",
            "Persistência SIP: O diálogo SIP permanece intacto durante o handover porque o endereço IP do terminal não se altera."
          ],
          speakerNotes: "A beleza da arquitetura 3GPP é a abstração: a antena mudou três vezes durante a chamada de carro, mas o diálogo SIP do PABX nunca soube nem precisou saber."
        }
      ],
      theoryText: `
        <h3>1. A Correlação Multicamadas de uma Chamada Celular All-IP</h3>
        <p>Para que um usuário pressionando o botão verde no celular fale com um ramal em um PABX corporativo, ocorre uma sequência cronológica estrita através de 4 domínios tecnológicos distintos:</p>
        
        <table border="1" cellpadding="6" style="border-collapse:collapse; width:100%; margin:15px 0;">
            <tr style="background:#f0f4f8;">
                <th>Etapa</th>
                <th>Domínio</th>
                <th>Protocolos</th>
                <th>Entidades Envolvidas</th>
            </tr>
            <tr>
                <td>1. Acesso ao Rádio</td>
                <td>RAN (Aéreo)</td>
                <td>PRACH, RRCSetup</td>
                <td>Smartphone &lt;--&gt; gNodeB (Antena)</td>
            </tr>
            <tr>
                <td>2. Sinalização de Core</td>
                <td>3GPP Control Plane</td>
                <td>NGAP, NAS Service Request</td>
                <td>gNodeB &lt;--&gt; AMF &lt;--&gt; SMF</td>
            </tr>
            <tr>
                <td>3. Estabelecimento de Mídia</td>
                <td>3GPP User Plane</td>
                <td>PFCP, GTP-U Encap</td>
                <td>gNodeB &lt;--&gt; UPF (ogstun)</td>
            </tr>
            <tr>
                <td>4. Diálogo de Telefonia</td>
                <td>VoIP / SIP</td>
                <td>SIP INVITE, SDP, RTP</td>
                <td>Cliente IMS &lt;--&gt; Yate / Asterisk</td>
            </tr>
        </table>

        <h3>2. O Desafio da Latência e Fragmentação de Pacotes</h3>
        <p>A adição do túnel GTP-U sobre a pilha IP/UDP introduz um overhead fixo de <strong>36 bytes</strong> por pacote:</p>
        <ul>
            <li>IP Externo: 20 bytes</li>
            <li>UDP Externo (Porta 2152): 8 bytes</li>
            <li>Cabeçalho GTP-U: 8 bytes</li>
        </ul>
        <p>Para evitar a fragmentação de pacotes no transporte (que destrói a qualidade do áudio e aumenta o jitter), a interface <code>ogstun</code> do UPF deve ser rigorosamente configurada com <strong>MTU de 1400 bytes</strong> (ou inferior), garantindo que os pacotes encapsulados nunca excedam os 1500 bytes da rede física Ethernet subjacente.</p>
      `,
      softwareConfig: {
        software: "Open5GS UPF Routing & TUN Interface",
        file: "config/upf.yaml",
        code: `upf:
  pfcp:
    - addr: 172.28.0.10
  gtpu:
    - addr: 172.28.0.10
  subnet:
    - addr: 10.45.0.1/16
      dev: ogstun    ; Interface de tunel de saida do Core
  mtu: 1400          ; Evita fragmentacao com GTP-U`,
        explanation: "A MTU da interface ogstun deve ser calibrada em 1400 bytes para compensar os 36 bytes do cabeçalho de túnel GTP-U/UDP/IP, garantindo entrega limpa e sem fragmentação de pacotes de sinalização e voz."
      },
      wiresharkAnalysis: {
        protocol: "PFCP / GTP-U",
        summary: "Sessão de encaminhamento PFCP estabelecida pela SMF no UPF",
        rawTrace: `Packet Forwarding Control Protocol (PFCP), Dport: 8805
PFCP Header: Version 1, Message Type: Session Establishment Request (50)
  SEID: 0x0000000000000001
  Create PDR (Packet Detection Rule):
    PDR ID: 1
    Precedence: 100
    Source Interface: Access (0)
  Create FAR (Forwarding Action Rule):
    FAR ID: 1
    Apply Action: FORW (Forward)
    Outer Header Creation: GTP-U/UDP/IPv4, TEID: 0x00000001, IP: 172.28.0.20`
      },
      diagramType: "global"
    },

    {
      id: "2.4",
      title: "2.4 Análise Forense com Wireshark: Dissecção dos Pontos de Troca de Tráfego e Pontos de Observação",
      duration: "30 min",
      tag: "Wireshark Forensics",
      slides: [
        {
          title: "Engenharia Forense de Tráfego de Telecomunicações",
          subtitle: "Onde e Como Posicionar as Sondas de Captura (Port Mirroring & TAP)",
          bullets: [
            "Ponto de Captura 1 (Interface Aérea/Virtual): Captura de frames de rádio e mensagens RRC.",
            "Ponto de Captura 2 (Interface N2/N3): Tráfego NGAP (SCTP 38412) e GTP-U (UDP 2152) entre torre e core.",
            "Ponto de Captura 3 (Borda do Core / UPF): Tráfego IP decapsulado na interface ogstun/uesimtun0.",
            "Ponto de Captura 4 (Tronco SIP Inter-Servidores): Tráfego SIP (5060) e RTP (10000-20000) entre Yate e Asterisk."
          ],
          speakerNotes: "Capturar pacotes no lugar errado gera conclusões falsas. Se você capturar na interface física da torre, verá apenas túneis GTP; para ver a chamada SIP, é preciso capturar no ponto de desencapsulamento."
        },
        {
          title: "Filtros de Exibição Avançados no Wireshark",
          subtitle: "Isolando a Agulha no Palheiro de Milhões de Pacotes",
          bullets: [
            "Filtro de Sinalização Telefônica: 'sip || sdp' ou 'sip.Method == \"INVITE\"'.",
            "Filtro por ID de Chamada: 'sip.Call-ID contains \"c2a819b0\"' isola uma única conversação completa.",
            "Filtro de Túneis 3GPP: 'gtp || ngap' para isolar a sinalização de mobilidade celular.",
            "Filtro de Falhas: 'sip.Status-Code >= 400' destaca instantaneamente rejeições e erros de rede."
          ],
          speakerNotes: "Dominar a sintaxe de filtros do Wireshark economiza horas de diagnóstico. Saber filtrar por Call-ID permite reconstruir toda a história de uma chamada em segundos."
        },
        {
          title: "Dissecção do Fluxo RTP e Gráficos de Jitter",
          subtitle: "Menu 'Telephony' -> 'RTP' -> 'RTP Stream Analysis'",
          bullets: [
            "Delta Time: Variação temporal entre chegadas sucessivas de pacotes (ideal: exatamente 20.00 ms).",
            "Jitter Médio e Máximo: Oscilação da latência; valores acima de 30 ms degradam sensivelmente a voz.",
            "Pacotes Fora de Ordem e Perdidos: Indica congestionamento de buffer em roteadores intermediários.",
            "Player de Áudio Integrado: O Wireshark permite decodificar o codec G.711 e ouvir a chamada gravada no trace."
          ],
          speakerNotes: "Demonstramos na prática a ferramenta de análise de streams RTP do Wireshark, ouvindo o áudio capturado e visualizando as curvas de jitter e atraso."
        },
        {
          title: "Diagrama de Sequência e Escada de Sinalização (VoIP Flow)",
          subtitle: "Menu 'Telephony' -> 'VoIP Calls' -> 'Flow Sequence'",
          bullets: [
            "Visão Gráfica Unificada: Plota a escada de setas relacionando clientes, proxies e destinos.",
            "Cálculo de Post-Dial Delay (PDD): O tempo decorrido entre o envio do INVITE e o recebimento do 180 Ringing.",
            "Duração da Chamada: Medição precisa do intervalo entre o 200 OK e o BYE.",
            "Evidência Técnica Indiscutível: A ferramenta definitiva para comprovar conformidade e SLA com operadoras."
          ],
          speakerNotes: "Em disputas de cobrança e auditorias regulatórias, o relatório de fluxo VoIP exportado pelo Wireshark é a evidência técnica soberana aceita pela Anatel e pela Justiça."
        }
      ],
      theoryText: `
        <h3>1. Metodologia de Captura e Inspeção Forense em Telecomunicações</h3>
        <p>A auditoria de redes de telefonia moderna exige a colocação estratégica de pontos de captura (SPAN ports, TAPs ópticos ou interfaces virtuais Linux tcpdump). Em nosso laboratório conteinerizado, os pontos de observação são mapeados diretamente nas pontes de rede do Docker:</p>
        
        <ul>
            <li><strong>Interface de Rede <code>telecom_net</code> (172.28.0.0/16):</strong> Observa a sinalização de controle REST/HTTP2 entre microsserviços do 5G Core, o tráfego SCTP NGAP e os túneis GTP-U.</li>
            <li><strong>Interface de Loopback / Socket Interno (127.0.0.1:5039):</strong> Monitora as mensagens assíncronas do protocolo de controle ExtModule trocadas entre o núcleo do Yate em C++ e o orquestrador em Node.js.</li>
            <li><strong>Interface de Voz SIP/RTP:</strong> Captura as sessões de áudio reais trocadas entre os ramais MicroSIP e os servidores de comutação.</li>
        </ul>

        <h3>2. O Guia de Dissecção de Pacotes SIP no Wireshark</h3>
        <p>Ao abrir um arquivo de captura (<code>.pcap</code>), o analista sênior examina campos fundamentais do cabeçalho SIP:</p>
        <ol>
            <li><strong>Via Header:</strong> Cada proxy SIP por onde a mensagem passa adiciona seu próprio cabeçalho <code>Via:</code> no topo da pilha, incluindo um parâmetro <code>branch=z9hG4bK...</code> exclusivo. Isso garante que as respostas sigam exatamente a mesma rota reversa e previne loops de roteamento.</li>
            <li><strong>Max-Forwards:</strong> Contador decrescente (geralmente iniciado em 70) que evita que mensagens circulem infinitamente em redes mal configuradas.</li>
            <li><strong>CSeq (Command Sequence):</strong> Número sequencial de comando que emparelha requisições e respostas dentro de uma mesma transação.</li>
            <li><strong>Call-ID:</strong> Identificador criptograficamente forte que une todos os pacotes pertencentes à mesma chamada telefônica.</li>
        </ol>
      `,
      softwareConfig: {
        software: "Linux tcpdump & TShark Capture Script",
        file: "scripts/captura_forense.sh",
        code: `#!/usr/bin/env bash
# Captura de Alta Fidelidade com Filtro de Ring Buffer
# Monitora portas SIP (5060), RTP (10000-20000), NGAP (38412) e GTP-U (2152)

tcpdump -i any -nn -s 0 \\
  "port 5060 or port 38412 or port 2152 or (udp and portrange 10000-20000)" \\
  -w /captures/forense_\$(date +%Y%m%d_%H%M%S).pcap \\
  -C 100 -W 10`,
        explanation: "O script tcpdump utiliza buffer rotativo de 100 MB (-C 100 -W 10) para evitar esgotamento de disco durante testes prolongados de estresse, gravando os pacotes completos sem truncamento de payload (-s 0)."
      },
      wiresharkAnalysis: {
        protocol: "SIP / RTP Metrics",
        summary: "Trace de encerramento de chamada (BYE -> 200 OK) com relatório de estatísticas",
        rawTrace: `BYE sip:1102@10.11.0.50:5060 SIP/2.0
Via: SIP/2.0/UDP 10.11.0.1:5060;branch=z9hG4bK-end-8192a
From: <sip:1101@10.11.0.1>;tag=9as8d7f2
To: <sip:1102@10.11.0.1>;tag=yate-ok-19283
Call-ID: c2a819b0-4f81-11eb-ae93-0242ac110002@10.11.0.50
CSeq: 102 BYE
Reason: Q.850;cause=16;text="Normal call clearing"
User-Agent: Yate/6.0.0
Content-Length: 0

SIP/2.0 200 OK
Via: SIP/2.0/UDP 10.11.0.1:5060;branch=z9hG4bK-end-8192a
From: <sip:1101@10.11.0.1>;tag=9as8d7f2
To: <sip:1102@10.11.0.1>;tag=yate-ok-19283
Call-ID: c2a819b0-4f81-11eb-ae93-0242ac110002@10.11.0.50
CSeq: 102 BYE
Content-Length: 0`
      },
      diagramType: "global"
    }
  ]
};
