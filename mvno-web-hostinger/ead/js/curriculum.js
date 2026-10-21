/**
 * @file curriculum.js
 * @description Acervo Curricular Completo da Telecom Academy (Padrão de Ensino Udemy Pro)
 * 6 Módulos, 24 Aulas com Teoria Exaustiva, Configurações de Software, Análise Wireshark,
 * Decks de Slides Interativos (PowerPoint) e Laboratórios Práticos de Bancada.
 */

const courseCurriculum = {
    courseTitle: "Engenharia de Redes Móveis, Telecom Aberta & MVNO Convergente",
    instructor: "Carlos Alberto & Prof. Angelo Delphini (Edição 2026)",
    institution: "Programando Soluções • OSTS Telecom",
    regulatoryFramework: "Resolução Anatel nº 777/2025 • Art. 183 Lei 9.472/1997",
    modules: [
        {
            id: 1,
            title: "Módulo 1: Fundamentos de Telecom Aberta, Marco Regulatório e Hardware Confinado",
            summary: "A transição histórica da telefonia TDM para software aberto All-IP, o novo marco regulatório da Anatel (Resolução 777/2025), o risco penal do Artigo 183 da LGT e a física de RF em bancada cabeada.",
            lessons: [
                {
                    id: "1.1",
                    title: "1.1 Introdução ao Fragmento Tecnológico: Do Circuito TDM/SS7 às Redes Abertas All-IP",
                    duration: "25 min",
                    tag: "Arquitetura & História",
                    slides: [
                        {
                            title: "A Revolução All-IP nas Telecomunicações",
                            subtitle: "Do Comutador Eletromecânico ao Software de Uso Geral",
                            bullets: [
                                "Telefonia Convencional: Circuitos dedicados TDM de 64 kbit/s (PCM) com sinalização proprietária SS7.",
                                "A Separação entre Transporte e Inteligência: Como o SIP e a comutação de pacotes destruíram o monopólio das caixas pretas.",
                                "Abertura do Ecossistema: Yate, Open5GS e Asterisk substituindo centrais telefônicas multimilionárias.",
                                "Convergência Móvel-Fixa (FMC): O chip de celular passa a ser um endpoint SIP corporativo integrado ao PABX."
                            ],
                            speakerNotes: "Nesta aula inaugural, compreendemos o fragmento histórico que permitiu a engenheiros de software assumirem o controle da infraestrutura de telecomunicações que antes pertencia exclusivamente a multinacionais de hardware."
                        },
                        {
                            title: "O Ponto de Inflexão das NGN (Next Generation Networks)",
                            subtitle: "Comparativo entre Comutação de Circuitos e Comutação de Pacotes",
                            bullets: [
                                "Circuito TDM: Alocação estática de banda mesmo durante o silêncio (desperdício de 60% da capacidade).",
                                "Voz sobre IP (VoIP): Compressão estatística, Voice Activity Detection (VAD) e multiplexação de pacotes RTP.",
                                "Desacoplamento de Hardware: Servidores COTS (Commercial Off-The-Shelf) x86 rodando Linux substituindo racks dedicados.",
                                "O papel da arquitetura orientada a mensagens do Yate na orquestração assíncrona."
                            ],
                            speakerNotes: "O Yate foi pioneiro ao tratar cada evento de telefonia como uma mensagem serializada, permitindo que qualquer linguagem de alto nível controle o fluxo de chamadas."
                        }
                    ],
                    theoryText: `
                        <h3>1. O Colapso dos Monopólios de Telecomunicação Proprietária</h3>
                        <p>Durante o século XX, a implantação de uma central de telefonia móvel ou fixa exigia investimentos de milhões de dólares em equipamentos proprietários (fabricantes como Ericsson, Siemens, Lucent e Alcatel). Nesses equipamentos, o <em>plano de controle</em> (sinalização), o <em>plano de dados</em> (transporte de mídia de voz) e as <em>interfaces de hardware</em> (placas E1/T1 e comutadores digitais) eram rigidamente acoplados.</p>
                        
                        <p>A sinalização era governada pela pilha <strong>SS7 (Signaling System No. 7)</strong>, operando sobre enlaces dedicados MTP/ISUP, impenetráveis para pequenos provedores e desenvolvedores independentes. Uma chamada de voz ocupava estaticamente um canal PCM de 64 kbps (G.711 a 8.000 amostras por segundo com resolução de 8 bits), desperdiçando largura de banda mesmo durante as pausas de silêncio da conversa.</p>

                        <h3>2. O Advento das Redes All-IP e a Separação em Camadas</h3>
                        <p>A transição para as <strong>Redes de Próxima Geração (NGN)</strong> e posteriormente para o <strong>3GPP Release 15/16/17 (4G LTE e 5G Standalone)</strong> rompeu o paradigma das caixas pretas através do desacoplamento horizontal:</p>
                        <ul>
                            <li><strong>Plano de Aplicação e Serviços:</strong> Servidores de PABX em nuvem, URAs inteligentes, plataformas de gravação e faturamento implementados em C++, Rust, Node.js e Python.</li>
                            <li><strong>Plano de Controle de Sessão:</strong> Protocolo <strong>SIP (Session Initiation Protocol - RFC 3261)</strong> e protocolos de autenticação e mobilidade 3GPP (NGAP, NAS).</li>
                            <li><strong>Plano de Mídia e Transporte:</strong> Pacotes IP roteáveis carregando áudio em tempo real via <strong>RTP/SRTP (RFC 3550 / RFC 3711)</strong> sobre redes Ethernet comuns e conexões de fibra óptica.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "Yate Core & Node.js",
                        file: "config/extmodule.conf",
                        code: `[general]
; Habilita a escuta do socket local para controle externo
priority=100

[scripts]
; Conecta o orquestrador Node.js via socket TCP assíncrono
; CRÍTICO: Sempre vincular a 127.0.0.1 para evitar exposição de controle
node_controller.js=tcp:127.0.0.1:5039`,
                        explanation: "O arquivo extmodule.conf do Yate estabelece uma ponte entre o núcleo de comutação em C++ e scripts de controle em Node.js ou Rust, permitindo interceptar o evento 'call.route' e tomar decisões de roteamento inteligentes em tempo real."
                    },
                    wiresharkAnalysis: {
                        protocol: "SIP / SDP",
                        summary: "Sessão SIP INVITE Inicial estabelecendo a chamada",
                        rawTrace: `INVITE sip:1102@10.11.0.1:5060 SIP/2.0
Via: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-7291a82c
From: "Diretoria SP" <sip:1101@10.11.0.1>;tag=9as8d7f2
To: <sip:1102@10.11.0.1>
Call-ID: c2a819b0-4f81-11eb-ae93-0242ac110002@10.11.0.50
CSeq: 101 INVITE
Contact: <sip:1101@10.11.0.50:5060>
Content-Type: application/sdp
Content-Length: 215

v=0
o=carlos 1792167000 1 IN IP4 10.11.0.50
s=TelecomAcademy Call
c=IN IP4 10.11.0.50
t=0 0
m=audio 40000 RTP/AVP 0 8 101
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
a=rtpmap:101 telephone-event/8000`
                    },
                    diagramType: "global"
                },
                {
                    id: "1.2",
                    title: "1.2 Marco Regulatório Brasileiro: Da Revogação da Res. 550/2010 ao Regulamento Anatel 777/2025",
                    duration: "30 min",
                    tag: "Regulação & Compliance",
                    slides: [
                        {
                            title: "O Novo Marco Regulatório de MVNO no Brasil",
                            subtitle: "A Transição da Resolução nº 550/2010 para a Resolução nº 777/2025",
                            bullets: [
                                "Fim da Resolução 550/2010: Totalmente revogada e consolidada no Regulamento Geral de Serviços de Telecomunicações.",
                                "A Nova Estrutura da Resolução Anatel nº 777/2025: Capítulo XII dedicado à exploração de rede móvel virtual.",
                                "Dois Modelos Jurídicos: MVNO Autorizada (Full MVNO com core próprio) vs. MVNO Credenciada (Light MVNO comercial).",
                                "Viabilidade para Fevereiro 2026: O caminho mais seguro e veloz é a MVNO Credenciada com uma agregadora autorizada."
                            ],
                            speakerNotes: "Atenção máxima: qualquer projeto de engenharia deve estar perfeitamente alinhado às resoluções em vigor. Citar a Resolução 550 hoje demonstra desatualização regulatória perante investidores e a Anatel."
                        },
                        {
                            title: "Diferenciação Crítica: Telecomunicações vs. SVA",
                            subtitle: "Como Operar sem Incorrer em Crime ou Ilegalidade",
                            bullets: [
                                "SMP (Serviço Móvel Pessoal): Oferta pública de voz/dados a terceiros no ar com remuneração. Requer outorga Anatel.",
                                "SVA (Serviço de Valor Adicionado - Art. 61 LGT): Plataformas PABX, discadores, gravações e automações corporativas.",
                                "A Bancada Confinada como Ambiente de P&D: Isenta de outorga por não haver irradiação de radiofrequência no ar.",
                                "Relação Contratual com Agregadoras: Surf Telecom, Arqia (Datora) e Telecall como hosts autorizados."
                            ],
                            speakerNotes: "Ao montar uma operação de MVNO, o core de software pode gerenciar a inteligência corporativa como SVA, enquanto o tráfego aéreo é legalmente amparado pelo contrato de credenciamento com a operadora hospedeira."
                        }
                    ],
                    theoryText: `
                        <h3>1. A Evolução Normativa da Anatel: Da Resolução 550/2010 à Resolução 777/2025</h3>
                        <p>No Brasil, a regulamentação das <strong>Operadoras Móveis Virtuais (MVNO - Mobile Virtual Network Operator)</strong> nasceu originalmente com a Resolução nº 550/2010 da Anatel. No entanto, através do processo regulatório de guilhotina e consolidação de normas, a <strong>Resolução nº 550/2010 foi formalmente REVOGADA</strong> e substituída pelo novo <strong>Regulamento Geral de Serviços de Telecomunicações (Resolução Anatel nº 777/2025)</strong>, em vigor a partir de 2025.</p>

                        <h3>2. Modelos de Operação Previstos na Resolução 777/2025</h3>
                        <table style="width:100%; border-collapse:collapse; margin:15px 0;">
                            <thead>
                                <tr style="background:#1e293b; color:#38bdf8; text-align:left;">
                                    <th style="padding:10px; border:1px solid #334155;">Critério</th>
                                    <th style="padding:10px; border:1px solid #334155;">MVNO Autorizada (Full MVNO)</th>
                                    <th style="padding:10px; border:1px solid #334155;">MVNO Credenciada (Light MVNO)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding:10px; border:1px solid #334155; font-weight:bold;">Outorga Anatel</td>
                                    <td style="padding:10px; border:1px solid #334155;">Exige Outorga Própria de SMP</td>
                                    <td style="padding:10px; border:1px solid #334155;">Dispensa outorga direta (utiliza a outorga da Prestadora Origem)</td>
                                </tr>
                                <tr>
                                    <td style="padding:10px; border:1px solid #334155; font-weight:bold;">Core de Rede</td>
                                    <td style="padding:10px; border:1px solid #334155;">Possui HLR/HSS, GMSC e bilhetagem própria</td>
                                    <td style="padding:10px; border:1px solid #334155;">Utiliza o core da agregadora e integra lógica via APIs e SIP</td>
                                </tr>
                                <tr>
                                    <td style="padding:10px; border:1px solid #334155; font-weight:bold;">Prazo de Implantação</td>
                                    <td style="padding:10px; border:1px solid #334155;">12 a 24 meses</td>
                                    <td style="padding:10px; border:1px solid #334155;">30 a 60 dias (Ideal para o lançamento de Fevereiro 2026)</td>
                                </tr>
                            </tbody>
                        </table>
                    `,
                    softwareConfig: {
                        software: "Yate Billing & CDR",
                        file: "config/accfile.conf",
                        code: `[general]
; Registro de bilhetagem conforme normas de faturamento Anatel
enabled=yes
file=/var/log/yate-cdr.csv
format="\${time}","\${caller}","\${called}","\${duration}","\${billid}","\${status}"`,
                        explanation: "O arquivo accfile.conf gera os bilhetes de chamadas (CDR) em conformidade com as regras de tarifação e guarda de registros exigidas pela regulamentação brasileira."
                    },
                    wiresharkAnalysis: {
                        protocol: "Radius / Diameter",
                        summary: "Requisição de Autenticação de Assinante (Credit Control Request)",
                        rawTrace: `Diameter Protocol: Credit-Control-Request (CCR)
Session-Id: yate.mvno.br;1792167000;1
Origin-Host: amf.sp.mvno.net
Origin-Realm: mvno.net
Destination-Realm: operadora-origem.com.br
Auth-Application-Id: Diameter Credit Control (4)
CC-Request-Type: INITIAL_REQUEST (1)
CC-Request-Number: 0
Subscription-Id-Type: END_USER_E164 (0)
Subscription-Id-Data: 5511999991102`
                    },
                    diagramType: "brasil"
                },
                {
                    id: "1.3",
                    title: "1.3 Artigo 183 da Lei 9.472/1997 (LGT) e Confinamento de RF: Por Que Bancada Exige 60 dB de Atenuação",
                    duration: "30 min",
                    tag: "Segurança de Bancada & Física",
                    slides: [
                        {
                            title: "O Princípio da Legalidade Penal e a Lei Geral de Telecomunicações",
                            subtitle: "Artigo 183 da Lei 9.472/1997 — Crime Contra as Telecomunicações",
                            bullets: [
                                "O Tipo Penal: Desenvolver clandestinamente atividades de telecomunicação (pena de 2 a 4 anos de detenção).",
                                "Crime Formal e de Perigo Abstrato: Não exige interferência prejudicial comprovada para a configuração do flagrante.",
                                "A Falsa Ilusão da 'Baixa Potência': Transmitir no ar sem licença de espectro, mesmo a 1 mW, configura crime inafiançável.",
                                "A Regra de Ouro do Professor Angelo Delphini: 'Bancada de estudo é 100% cabeada e confinada, sem nenhuma antena rosqueada'."
                            ],
                            speakerNotes: "O engenheiro de telecomunicações de elite compreende a física de rádio e o direito penal. Em nosso laboratório, não há transmissão de sinal irradiado no espaço livre."
                        },
                        {
                            title: "Engenharia de Confinamento: O Desenho A (60 dB)",
                            subtitle: "Dimensionamento dos Atenuadores Coaxiais e Balanço de Enlace",
                            bullets: [
                                "Potência Típica de Saída de um SDR (TX): 0 dBm (equivalente a 1 miliwatt de potência).",
                                "O Papel dos Atenuadores: 2 atenuadores de 30 dB em cascata ou 1 variável de 60 dB de 50 ohms.",
                                "Potência Residual no Dispositivo Receptor: 0 dBm - 60 dB = -60 dBm (apenas 1 nanowatt de potência!).",
                                "Caixa Blindada (Gaiola de Faraday): Elimina completamente a irradiação parasitária de conectores e cabos."
                            ],
                            speakerNotes: "Com -60 dBm entregues por cabo coaxial fechado de 50 ohms, o receptor opera com nível de sinal perfeito de celular de laboratório, sem que nenhum sinal escape para as ruas vizinhas."
                        }
                    ],
                    theoryText: `
                        <h3>1. O Risco Penal da Transmissão no Ar sem Licença</h3>
                        <p>No Brasil, o espectro radioelétrico é um bem público administrado com exclusividade pela União através da Agência Nacional de Telecomunicações. O <strong>Artigo 183 da Lei nº 9.472/1997 (Lei Geral de Telecomunicações - LGT)</strong> estabelece:</p>
                        
                        <blockquote style="background:#1e293b; border-left:4px solid #ef4444; padding:12px; margin:15px 0; font-style:italic;">
                            "Art. 183. Desenvolver clandestinamente atividades de telecomunicação:<br>
                            Pena - detenção de dois a quatro anos, aumentada da metade se houver dano a terceiro, e multa de R$ 10.000,00 (dez mil reais)."
                        </blockquote>

                        <p>O Superior Tribunal de Justiça (STJ) e o Supremo Tribunal Federal (STF) pacificaram a jurisprudência de que o crime do Art. 183 é <strong>formal e de perigo abstrato</strong>, não admitindo a tese de insignificância ou ausência de dolo pelo fato de ser um experimento didático.</p>

                        <h3>2. A Solução Técnica: O Desenho A (Bancada Cabeada Confinada de 60 dB)</h3>
                        <p>Para aprender e homologar redes móveis sem incorrer em infrações legais ou riscos regulatórios, a engenharia adota a bancada <strong>totalmente cabeada</strong>:</p>
                        <ul>
                            <li><strong>Eliminação de Antenas:</strong> Nenhuma antena transmissora ou receptora é conectada aos conectores SMA do SDR.</li>
                            <li><strong>Atenuação Coaxial Fixa e Variável:</strong> O sinal gerado na saída TX (tipicamente entre 0 dBm e +10 dBm) passa obrigatoriamente por atenuadores coaxiais de RF com impedância nominal de <strong>50 ohms</strong>.</li>
                            <li><strong>Cálculo do Balanço de Potência:</strong>
                                <br><code>P_rec = P_tx - Atenuacao_Coaxial = 0 dBm - 60 dB = -60 dBm (1 nanowatt)</code>.
                            </li>
                            <li><strong>Caixa de Faraday de Bancada:</strong> O modem receptor ou celular de testes é alojado dentro de um invólucro blindado com conectores passantes (feedthrough), garantindo que 100% da RF permaneça confinada.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "OpenBTS / SDR Transceiver",
                        file: "OpenBTS.db (SQLite Config)",
                        code: `# Reduz a potência do transmissor SDR ao patamar mínimo seguro
UPDATE CONFIG SET VALUESTRING = "0" WHERE KEYSTRING = "GSM.Radio.PowerManager.MaxAttenDB";
UPDATE CONFIG SET VALUESTRING = "-10" WHERE KEYSTRING = "GSM.Radio.TxAttenDB";
# Define canal não utilizado por operadoras comerciais locais
UPDATE CONFIG SET VALUESTRING = "870" WHERE KEYSTRING = "GSM.Radio.C0";`,
                        explanation: "Reduz a potência de transmissão da placa SDR ao nível mínimo de bancada e seleciona o canal de controle C0 com atenuação controlada."
                    },
                    wiresharkAnalysis: {
                        protocol: "GSM TAP / RF Burst",
                        summary: "Captura de rajadas GSM em bancada cabeada",
                        rawTrace: `GSMTap Header:
Version: 2
Header Length: 16 bytes
Payload Type: GSM Um (Air Interface) (1)
ARFCN: 870 (Uplink: false)
Signal/Noise Ratio: 32 dB
Signal Level: -60 dBm [PERFEITAMENTE CONFINADO]`
                    },
                    diagramType: "bancada"
                },
                {
                    id: "1.4",
                    title: "1.4 Hardware Físico (USRP B210, BladeRF, LimeSDR) vs. Hardware Simulado (ZeroMQ, UDP 5700 e Dummy Radio)",
                    duration: "30 min",
                    tag: "Hardware & Emulação",
                    slides: [
                        {
                            title: "Hardware Físico vs. Simulação por Software",
                            subtitle: "Como Aprender Toda a Lógica sem Gastar com Placas SDR",
                            bullets: [
                                "Placas SDR Comerciais: Ettus USRP B210 (padrão ouro industrial), Nuand BladeRF x40 e LimeSDR USB.",
                                "A Barreira Financeira: Uma placa USRP com filtros de bancada ultrapassa R$ 15.000 no Brasil.",
                                "A Descoberta da Virtualização de RF: A camada física pode ser emulada por sockets de rede na memória RAM.",
                                "Os Três Motores Virtuais: DummyRadio no YateBTS, Transceptor UDP no OpenBTS e ZeroMQ no srsRAN/UERANSIM."
                            ],
                            speakerNotes: "O aluno não precisa comprar hardware caro para se tornar um engenheiro de core de redes celulares. A emulação por software reproduz 100% das mensagens de controle e do comportamento dos protocolos."
                        },
                        {
                            title: "Mecanismos de Interconexão Virtual",
                            subtitle: "ZeroMQ, Sockets UDP e Protocolo SCTP",
                            bullets: [
                                "Transceiver UDP (Porta 5700): O rádio e o núcleo de controle conversam por pacotes UDP locais.",
                                "ZeroMQ I/Q Streaming: As amostras analógicas digitalizadas (In-Phase e Quadrature) viajam via TCP.",
                                "SCTP 38412 (NGAP/S1AP): O padrão da indústria para conectar estações rádio-base 5G/4G ao núcleo de rede.",
                                "Interfaces Virtuais TUN/TAP: Criação de adaptadores de rede reais no Linux (uesimtun0) para navegação."
                            ],
                            speakerNotes: "Com UERANSIM e Open5GS em contêineres Docker, o sistema operacional enxerga o celular virtual como uma placa de rede real conectada à internet."
                        }
                    ],
                    theoryText: `
                        <h3>1. O Universo das Placas SDR Físicas</h3>
                        <p>As placas <strong>SDR (Software Defined Radio)</strong> são transceptores de RF de banda larga ágil, capazes de digitalizar sinais de rádio e transferi-los como amostras I/Q (In-phase / Quadrature) para a CPU do computador através de barramentos USB 3.0 ou PCI Express:</p>
                        <ul>
                            <li><strong>Ettus Research USRP B210:</strong> Transceptor de 70 MHz a 6 GHz com chip Analog Devices AD9361, oscilador TCXO e FPGA Spartan-6. Padrão industrial para pesquisas com OpenBTS e Open5GS.</li>
                            <li><strong>Nuand BladeRF x40:</strong> Operação full-duplex de 300 MHz a 3.8 GHz com FPGA Altera Cyclone IV.</li>
                            <li><strong>Lime Microsystems LimeSDR:</strong> Transceptor flexível de 100 kHz a 3.8 GHz com chip LMS7002M.</li>
                        </ul>

                        <h3>2. A Emulação Virtual em Software: O Laboratório 100% Acessível</h3>
                        <p>Para democratizar o ensino e permitir que qualquer engenheiro monte um laboratório completo em seu próprio computador, utilizamos técnicas de <strong>emulação de camada física</strong>:</p>
                        <ul>
                            <li><strong>Dummy Radio do YateBTS (<code>dummyradio.yate</code>):</strong> Módulo em C++ compilado dentro do Yate que simula os canais de controle BCCH, CCCH e canais dedicados SDCCH/TCH sem interagir com transceptores físicos.</li>
                            <li><strong>Transceptor UDP em Rede (Porta 5700):</strong> No OpenBTS, a camada física (MBTS) expõe um socket UDP local. Quadros GSM são injetados diretamente via rede Ethernet.</li>
                            <li><strong>ZeroMQ I/Q Socket (srsRAN):</strong> As amostras I/Q de 30.72 MS/s são enviadas por sockets TCP de alto desempenho através da biblioteca <code>libzmq</code>, permitindo que a estação rádio-base (eNodeB) fale com o celular virtual (srsUE) na mesma máquina.</li>
                            <li><strong>UERANSIM (5G Standalone):</strong> O UERANSIM emula estações 5G (gNodeB) e equipamentos de usuário (UE) conectando-se diretamente ao núcleo Open5GS através do protocolo <strong>SCTP na porta 38412</strong>.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "UERANSIM gNodeB",
                        file: "config/open5gs-gnb.yaml",
                        code: `mcc: '001'
mnc: '01'
nci: '0x000000010'
idLength: 32
tac: 1

linkIp: 10.45.0.1
ngapIp: 10.45.0.1
gtpIp: 10.45.0.1

# IP do AMF no container Open5GS
amfConfigs:
  - address: 10.45.0.10
    port: 38412

slices:
  - sst: 1
    sd: '0x111111'`,
                        explanation: "Configuração do gNodeB virtual do UERANSIM conectando-se via SCTP (porta 38412) ao AMF do Open5GS, alocando a fatia de rede (Network Slice) SST:1 / SD:0x111111."
                    },
                    wiresharkAnalysis: {
                        protocol: "SCTP / NGAP",
                        summary: "Mensagem NGSetupRequest estabelecendo a estação 5G no AMF",
                        rawTrace: `Stream Control Transmission Protocol (SCTP), Src Port: 38412, Dst Port: 38412
Payload Protocol Identifier: NGAP (60)
NGAP-PDU: initiatingMessage (0)
  procedureCode: id-NGSetup (21)
  criticality: reject (0)
  value: NGSetupRequest
    protocolIEs:
      - GlobalRANNodeID: globalGNB-ID (001-01 / 0x000000010)
      - SupportedTAList: TAC 1 (001-01)
      - DefaultPagingDRX: v128 (0)`
                    },
                    diagramType: "bancada"
                }
            ]
        },
        {
            id: 2,
            title: "Módulo 2: Camadas de Rede, Arquitetura de Protocolos e Correlação Fim-a-Fim",
            summary: "Mapeamento comparativo entre a pilha OSI e a arquitetura 3GPP/Celular, aprofundamento em SIP (RFC 3261), SDP e RTP, e correlação das mensagens de controle com os fluxos de áudio.",
            lessons: [
                {
                    id: "2.1",
                    title: "2.1 Pilha de Camadas OSI vs. 3GPP Celular (PHY, MAC, RLC, PDCP, RRC, NAS, GTP-U, SIP, RTP)",
                    duration: "30 min",
                    tag: "Protocolos & Camadas",
                    slides: [
                        {
                            title: "O Mapeamento das Camadas nas Redes Móveis",
                            subtitle: "Comparativo Rigoroso: Modelo OSI vs. Modelo 3GPP",
                            bullets: [
                                "Camada 1 (PHY): Amostras I/Q, modulação OFDM/QAM e canais físicos de rádio.",
                                "Camada 2 (Data Link): Dividida em MAC (agendamento), RLC (segmentação) e PDCP (cifra e compressão RoHC).",
                                "Camada 3 (Network): Dividida em RRC (controle de rádio local) e NAS (sinalização direta com o Core da rede).",
                                "Camada de Transporte e Aplicação: GTP-U para tunelamento de pacotes e SIP/RTP para voz em alta fidelidade."
                            ],
                            speakerNotes: "O entendimento das subdivisões da Camada 2 e Camada 3 do 3GPP é o divisor de águas entre um técnico de suporte convencional e um engenheiro de redes móveis especializado."
                        },
                        {
                            title: "A Separação entre Plano de Controle e Plano de Usuário",
                            subtitle: "Control Plane (CP) vs. User Plane (UP)",
                            bullets: [
                                "Control Plane (C-Plane): Protocolos RRC e NAS via SCTP garantindo autenticação, anexação e mobilidade.",
                                "User Plane (U-Plane): Protocolo GTP-U (GPRS Tunnelling Protocol User Plane - porta UDP 2152).",
                                "O Tráfego de Voz VoLTE/VoNR: Pacotes SIP e RTP encapsulados dentro do túnel GTP-U.",
                                "O Papel do UPF (User Plane Function): O roteador de altíssima velocidade que entrega os pacotes à internet."
                            ],
                            speakerNotes: "Quando um usuário fala no celular 5G, a voz é codificada pelo codec AMR-WB ou Opus, empacotada em RTP, encapsulada em GTP-U e transmitida pelo ar através de PDCP e RLC."
                        }
                    ],
                    theoryText: `
                        <h3>1. A Estrutura de Camadas 3GPP para Redes 4G e 5G</h3>
                        <p>Diferente do modelo OSI clássico de 7 camadas, a arquitetura móvel 3GPP é estruturada em dois planos operacionais paralelos:</p>
                        
                        <h4>Plano de Controle (Control Plane - C-Plane)</h4>
                        <ul>
                            <li><strong>PHY (Camada Física):</strong> Converte bits brutos em formas de onda OFDM/SC-FDMA com modulações QPSK, 16QAM, 64QAM e 256QAM.</li>
                            <li><strong>MAC (Medium Access Control):</strong> Responsável pelo multiplexação de canais lógicos em canais de transporte, solicitação de repetição automática híbrida (HARQ) e alocação de recursos dinâmicos.</li>
                            <li><strong>RLC (Radio Link Control):</strong> Segmentação, reordenação de pacotes e recuperação de perdas via protocolo ARQ.</li>
                            <li><strong>PDCP (Packet Data Convergence Protocol):</strong> Criptografia de dados e integridade (AES/SNOW 3G), e compressão robusta de cabeçalhos IP (RoHC).</li>
                            <li><strong>RRC (Radio Resource Control):</strong> Gerenciamento da conexão de rádio entre o celular e a torre (gNodeB). Transmite parâmetros do sistema e comandos de handover.</li>
                            <li><strong>NAS (Non-Access Stratum):</strong> Camada de mais alto nível que conecta o smartphone diretamente ao AMF/MME do Core de rede, sem intermediação da estação rádio-base.</li>
                        </ul>

                        <h4>Plano de Usuário (User Plane - U-Plane)</h4>
                        <p>No plano de dados, os pacotes IP gerados pelas aplicações do usuário são encapsulados em túneis <strong>GTP-U (GPRS Tunnelling Protocol - User Plane)</strong>, que viajam sobre o protocolo UDP na <strong>porta padrão 2152</strong> entre a gNodeB e o UPF.</p>
                    `,
                    softwareConfig: {
                        software: "Open5GS UPF",
                        file: "config/upf.yaml",
                        code: `upf:
  pfcp:
    - address: 10.45.0.10
  gtpu:
    - address: 10.45.0.10
  subnet:
    - addr: 10.45.0.0/16
      dnn: internet
      dev: ogstun`,
                        explanation: "Configura a interface de dados GTP-U do UPF (porta UDP 2152) e a criação da interface virtual 'ogstun' para rotear pacotes para a internet."
                    },
                    wiresharkAnalysis: {
                        protocol: "GTP-U / IP",
                        summary: "Pacote encapsulado no túnel GTP-U de dados celulares",
                        rawTrace: `User Datagram Protocol, Src Port: 2152, Dst Port: 2152
GPRS Tunnelling Protocol User Plane:
  Flags: 0x30 (Version 1, Protocol Type: GTP)
  Message Type: G-PDU (255)
  Length: 68 bytes
  Tunnel Endpoint Identifier (TEID): 0x00000001
Internet Protocol Version 4 (Dados Internos do Celular):
  Src: 10.45.0.2 (IP do Celular na APN)
  Dst: 8.8.8.8 (Google DNS)
  Protocol: ICMP Echo Request`
                    },
                    diagramType: "global"
                },
                {
                    id: "2.2",
                    title: "2.2 Sinalização SIP (RFC 3261), Negociação SDP (RFC 4566) e Transporte RTP/SRTP (RFC 3550 / RFC 3711)",
                    duration: "30 min",
                    tag: "Voz & Sinalização",
                    slides: [
                        {
                            title: "O Tríptico Fundamental da Telefonia IP",
                            subtitle: "SIP para Sinalizar • SDP para Negociar • RTP para Transportar",
                            bullets: [
                                "SIP (RFC 3261): Protocolo textual inspirado em HTTP/SMTP responsável por localizar, convidar e desligar chamadas.",
                                "SDP (RFC 4566): O contrato que viaja dentro do SIP definindo IP de áudio, portas UDP e codecs suportados.",
                                "RTP (RFC 3550): O transporte de mídia em tempo real com carimbos de tempo (Timestamps) e números de sequência.",
                                "SRTP (RFC 3711): Criptografia militar de áudio em tempo real com chaves AES-128 em modo Counter."
                            ],
                            speakerNotes: "O domínio absoluto desses três protocolos é o que permite identificar e resolver falhas de 'áudio mudo', 'ligação que cai aos 30 segundos' e problemas de NAT traversal."
                        },
                        {
                            title: "A Dança dos Códigos de Status SIP",
                            subtitle: "Da Tentativa (1xx) ao Sucesso (2xx) e Falhas (4xx/5xx)",
                            bullets: [
                                "100 Trying: O servidor recebeu o INVITE e está processando o roteamento.",
                                "180 Ringing: O telefone de destino está tocando na outra ponta.",
                                "200 OK: O destino atendeu; o SDP de resposta é consolidado.",
                                "ACK: Confirmação em 3 vias que dispara imediatamente os fluxos de pacotes RTP de áudio."
                            ],
                            speakerNotes: "Se o servidor enviar um 200 OK e não receber o ACK correspondente dentro do tempo limite, a central encerra a chamada automaticamente por timeout."
                        }
                    ],
                    theoryText: `
                        <h3>1. O Funcionamento Detalhado do SIP (RFC 3261)</h3>
                        <p>O <strong>SIP (Session Initiation Protocol)</strong> é um protocolo de controle de camada de aplicação que adota uma sintaxe textual legível, muito similar ao HTTP. Ele opera através de métodos (verbos) e respostas numéricas:</p>
                        <ul>
                            <li><code>INVITE</code>: Inicia a solicitação de uma nova sessão de comunicação.</li>
                            <li><code>ACK</code>: Confirmação final da recepção de uma resposta 200 OK.</li>
                            <li><code>BYE</code>: Encerra uma chamada ativa e libera os recursos de mídia.</li>
                            <li><code>CANCEL</code>: Cancela uma chamada ainda em fase de toque (antes do atendimento).</li>
                            <li><code>REGISTER</code>: Registra a localização atual (IP e porta) do ramal ou celular no servidor de localização (Registrar).</li>
                        </ul>

                        <h3>2. Negociação de Mídia com SDP (RFC 4566)</h3>
                        <p>O corpo das mensagens SIP carrega uma descrição estruturada da mídia conhecida como <strong>SDP (Session Description Protocol)</strong>. O SDP contém as regras de áudio:</p>
                        <ul>
                            <li><code>c=IN IP4 10.11.0.50</code>: Indica o endereço IP para onde a outra ponta deve enviar os pacotes RTP de voz.</li>
                            <li><code>m=audio 40000 RTP/AVP 0 8 101</code>: Especifica a porta UDP de escuta (40000) e os codecs aceitos em ordem de preferência (0 = G.711u / PCMU, 8 = G.711a / PCMA, 101 = DTMF RFC 4733).</li>
                        </ul>

                        <h3>3. Transporte de Áudio em Tempo Real via RTP e SRTP</h3>
                        <p>O áudio capturado pelo microfone é amostrado e fatiado em pacotes de tamanho fixo (tipicamente 20 milissegundos de voz). Cada pacote RTP contém:</p>
                        <ul>
                            <li><strong>Sequence Number:</strong> Contador incremental de 16 bits que permite ao receptor detectar pacotes perdidos ou fora de ordem.</li>
                            <li><strong>Timestamp:</strong> Marca temporal de 32 bits sincronizada com a taxa de amostragem (ex: 8.000 Hz no G.711, somando 160 amostras por pacote de 20 ms).</li>
                            <li><strong>Payload Type:</strong> Identificador do codec de áudio transmitido.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "Asterisk PJSIP",
                        file: "config/pjsip.conf",
                        code: `[global]
type=global
user_agent=TelecomAcademy-PJSIP-2026

[transport-udp]
type=transport
protocol=udp
bind=0.0.0.0:5060

[endpoint-sp]
type=endpoint
context=default
disallow=all
allow=opus
allow=ulaw
allow=alaw
direct_media=no
rtp_symmetric=yes
force_rport=yes`,
                        explanation: "Configura o transporte SIP UDP na porta 5060, define codecs preferenciais com transcodificação inteligente e ativa 'rtp_symmetric' para contornar roteadores com NAT."
                    },
                    wiresharkAnalysis: {
                        protocol: "RTP (Real-time Transport Protocol)",
                        summary: "Fluxo de pacotes de voz G.711u codificado",
                        rawTrace: `Real-time Transport Protocol:
  Version: 2
  Padding: false
  Extension: false
  Sequence Number: 14920
  Timestamp: 1684920 (Incremento de 160 ticks = 20 ms)
  Synchronization Source identifier: 0x3d91a2f4
  Payload Type: ITU-T G.711 PCMU (0)
  Payload: 160 bytes de áudio PCM compactado`
                    },
                    diagramType: "brasil"
                },
                {
                    id: "2.3",
                    title: "2.3 Correlação Fim-a-Fim: Do Radio Resource Control (RRC) à Criação de Sessão VoLTE/VoNR e PABX SIP",
                    duration: "35 min",
                    tag: "Correlação de Protocolos",
                    slides: [
                        {
                            title: "A Cadeia Completa de Eventos Fim-a-Fim",
                            subtitle: "O que Acontece Quando Você Aperta 'Discar' no Celular",
                            bullets: [
                                "Passo 1 (Rádio): RRCSetupRequest enviado pelo aparelho à antena gNodeB.",
                                "Passo 2 (Autenticação): Autenticação Milenage no AMF/AUSF com verificação criptográfica do SIM Card.",
                                "Passo 3 (Sessão de Dados): O SMF aloca o túnel GTP-U com QoS dedicado (QCI 1 para voz VoLTE).",
                                "Passo 4 (Sinalização de Voz): O celular envia o SIP INVITE através do túnel até o PABX Yate/Asterisk."
                            ],
                            speakerNotes: "Muitos profissionais acreditam que a chamada de celular é uma mágica isolada. Aqui provamos que ela é uma sequência lógica e determinística de protocolos encadeados."
                        },
                        {
                            title: "A Mágica da Convergência Móvel-Fixa (FMC)",
                            subtitle: "Integração do Chip Celular com o PABX em Nuvem",
                            bullets: [
                                "O Número E.164 Único: O celular do executivo possui o mesmo ramal da sua mesa no escritório.",
                                "O Papel do SBC Yate: Intercepta o destino e dispara toques paralelos (Ring All / Forking).",
                                "Transcodificação em Tempo Real: Conversão transparente entre codecs celulares (AMR) e web (Opus/G.711).",
                                "Gravação e Faturamento Centralizado: Todas as chamadas são bilhetadas pela mesma esteira."
                            ],
                            speakerNotes: "Essa convergência é o cerne da oferta comercial de MVNO corporativa, gerando economia drástica de tarifas e controle unificado."
                        }
                    ],
                    theoryText: `
                        <h3>1. O Fluxo Cronológico de uma Chamada Móvel até o PABX Corporativo</h3>
                        <p>Abaixo detalhamos a cronologia exata dos eventos que ocorrem entre o toque na tela do smartphone e a comutação da chamada no PABX:</p>
                        
                        <ol>
                            <li><strong>RRC Connection Establishment:</strong> O dispositivo móvel (UE) envia um preâmbulo na camada física (PRACH) e solicita a conexão de rádio com a mensagem <code>RRCSetupRequest</code>. A torre aloca os canais lógicos dedicados.</li>
                            <li><strong>NAS Service Request:</strong> O celular transmite a mensagem <code>ServiceRequest</code> encapsulada dentro da sinalização de rádio. A gNodeB repassa essa mensagem via <strong>NGAP sobre SCTP na porta 38412</strong> para o AMF (Access and Mobility Management Function).</li>
                            <li><strong>Autenticação e Criptografia:</strong> O AMF consulta o UDM/UDR, que executa o algoritmo criptográfico <strong>Milenage</strong> contra a chave privada (K) e o operador (OPc) gravados no chip físico (SIM/eSIM). Uma vez autenticado, a interface aérea é cifrada.</li>
                            <li><strong>Alocação de Portadora de Voz (QoS Flow):</strong> Para chamadas VoLTE/VoNR, o SMF aciona o UPF para criar uma portadora com garantia de taxa de bits (GBR) e prioridade máxima (QCI 1 / 5QI 1).</li>
                            <li><strong>Disparo do SIP INVITE:</strong> O discador nativo do celular envia o pacote <code>SIP INVITE</code> através da interface virtual de dados. Esse pacote atinge o proxy SIP (Yate/Asterisk), que executa a lógica de discagem corporativa.</li>
                        </ol>
                    `,
                    softwareConfig: {
                        software: "Yate regexroute.conf",
                        file: "config/regexroute.conf",
                        code: `[extra]
; Correlação de assinantes móveis para seus ramais corporativos
; Chamadas originadas pelo chip celular MVNO (IMSI)
^001010000000001$=goto mobile_executivo

[mobile_executivo]
; Associa o chip móvel ao ramal 1101 de São Paulo
.*=sip/sip:1101@10.11.0.10;caller=1101`,
                        explanation: "Faz o de-para entre a identidade IMSI do chip celular de teste e o ramal corporativo 1101, unificando a identidade do assinante."
                    },
                    wiresharkAnalysis: {
                        protocol: "SIP / NGAP Correlated",
                        summary: "Traço mostrando a correlação entre o registro NAS e o registro SIP",
                        rawTrace: `Frame 1: 5G NAS Registration Request (IMSI 001010000000001)
Frame 2: NGAP Initial Context Setup Response (Sucesso)
Frame 3: SIP REGISTER sip:mvno.local SIP/2.0
  From: <sip:1102@mvno.local>
  Contact: <sip:1102@10.45.0.2:5060>
  Status: 200 OK (Registrado no PABX)`
                    },
                    diagramType: "brasil"
                },
                {
                    id: "2.4",
                    title: "2.4 Análise Forense com Wireshark: Dissecção dos Pontos de Troca de Tráfego e Pontos de Observação",
                    duration: "35 min",
                    tag: "Troubleshooting & Wireshark",
                    slides: [
                        {
                            title: "Engenharia Forense de Pacotes em Telecom",
                            subtitle: "Onde Capturar e o Que Procurar no Wireshark",
                            bullets: [
                                "Ponto 1: Interface N1/N2 (SCTP 38412) entre Antena e AMF para depurar sinalização de rádio.",
                                "Ponto 2: Interface N3 (GTP-U 2152) entre Antena e UPF para depurar túneis de dados.",
                                "Ponto 3: Interface SIP (UDP/TCP 5060/5061) no SBC para auditar roteamento e cabeçalhos E.164.",
                                "Ponto 4: Mídia RTP (UDP 10000-20000) para calcular métricas de jitter, perda de pacotes e latência."
                            ],
                            speakerNotes: "Com o Wireshark conectado nos pontos estratégicos, nenhuma falha de sinalização ou degradação de áudio passa despercebida."
                        },
                        {
                            title: "Filtros de Captura Indispensáveis no Wireshark",
                            subtitle: "Sintaxe Prática para Análise em Tempo Real",
                            bullets: [
                                "sip or sdp: Isola toda a sinalização telefônica da rede.",
                                "sctp.port == 38412: Captura mensagens NGAP do 5G Core.",
                                "rtp: Exibe todos os fluxos de áudio e permite reproduzir as conversas na ferramenta 'RTP Player'.",
                                "sip.Status-Code >= 400: Filtra instantaneamente chamadas rejeitadas ou com erros."
                            ],
                            speakerNotes: "A ferramenta de 'VoIP Calls' do Wireshark gera o diagrama de sequência visual que usamos para aprovação de homologação."
                        }
                    ],
                    theoryText: `
                        <h3>1. Metodologia de Captura em Ambientes de Produção e Laboratório</h3>
                        <p>Para diagnosticar problemas de forma cirúrgica, o engenheiro de telecomunicações deve mapear os <strong>Pontos de Observação de Tráfego (Points of Observation)</strong>:</p>
                        
                        <ul>
                            <li><strong>Interface de Acesso Rádio (gNodeB ↔ AMF):</strong> O protocolo SCTP garante a entrega confiável e ordenada das mensagens NGAP. Se o SCTP falhar, a torre perde comunicação com o núcleo da rede.</li>
                            <li><strong>Interface de Transporte de Mídia (SBC ↔ PABX):</strong> Ponto crítico para checar a saúde dos cabeçalhos <code>Via</code> (evitando loops de roteamento) e <code>Record-Route</code> (garantindo que respostas e mensagens subsequentes trafeguem pelos nós autorizados).</li>
                            <li><strong>Análise de Jitter e MOS (Mean Opinion Score):</strong> O Wireshark calcula automaticamente o atraso de chegada entre pacotes RTP (Jitter). Valores de jitter acima de 30 ms ou perdas de pacotes superiores a 1% degradam perceptivelmente a voz humana.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "Linux tcpdump",
                        file: "scripts/capture_traffic.sh",
                        code: `#!/bin/bash
# Captura simultânea de sinalização SIP e rádio 5G em arquivo pcapng
tcpdump -i any -nn -s 0 "port 5060 or port 38412 or port 2152" -w /tmp/telecom_trace.pcap`,
                        explanation: "Comando para captura de pacotes em todas as interfaces do contêiner, filtrando SIP (5060), SCTP 5G (38412) e GTP-U (2152)."
                    },
                    wiresharkAnalysis: {
                        protocol: "Wireshark VoIP Flow Analysis",
                        summary: "Diagrama de Sequência de Sinalização extraído do Wireshark",
                        rawTrace: `Ponto A (10.11.0.50)           SBC Yate (10.11.0.1)           PABX Asterisk (10.11.0.10)
      |                                |                                   |
      |--------- INVITE (SDP) -------->|                                   |
      |<-------- 100 Trying -----------|                                   |
      |                                |--------- INVITE (LCR SP) -------->|
      |                                |<-------- 180 Ringing -------------|
      |<-------- 180 Ringing ----------|                                   |
      |                                |<-------- 200 OK (SDP) ------------|
      |<-------- 200 OK (SDP) ---------|                                   |
      |--------- ACK ----------------->|                                   |
      |                                |--------- ACK -------------------->|
      |<============= FLUXO BIDIRECIONAL DE ÁUDIO RTP ====================>|`
                    },
                    diagramType: "global"
                }
            ]
        },
        {
            id: 3,
            title: "Módulo 3: Software por Software — Configurações, Parâmetros e Motores em Detalhes",
            summary: "Configuração aprofundada de cada componente da pilha de software: Open5GS 5G/4G Core, Yate Telephony Engine, Asterisk PBX, UERANSIM e o orquestrador Node.js.",
            lessons: [
                {
                    id: "3.1",
                    title: "3.1 Open5GS 5G/4G Core: AMF (SCTP 38412), SMF, UPF (GTP-U 2152) e Provisionamento WebUI (Porta 9999)",
                    duration: "35 min",
                    tag: "5G Core & Open5GS",
                    slides: [
                        {
                            title: "Arquitetura Modular do Open5GS",
                            subtitle: "O Core 5G Standalone Mais Maduro do Mundo Open Source",
                            bullets: [
                                "AMF (Access and Mobility Management): Gerencia conexões e estados dos aparelhos celulares.",
                                "SMF (Session Management Function): Orquestra alocação de IPs, políticas de banda e DNS das APNs.",
                                "UPF (User Plane Function): O motor de encaminhamento de pacotes em espaço de usuário de alta performance.",
                                "WebUI (Porta 9999): Interface gráfica amigável em Node.js/React para provisionamento de SIM Cards."
                            ],
                            speakerNotes: "O Open5GS é escrito em C de alta performance, consumindo menos de 500 MB de memória RAM para rodar uma rede celular completa."
                        },
                        {
                            title: "Provisionamento de SIM Cards na Prática",
                            subtitle: "Parâmetros Críticos de Criptografia e Autenticação",
                            bullets: [
                                "IMSI / SUPI: Identidade internacional única do chip (ex: 001010000000001).",
                                "Chave Secreta K: Chave simétrica de 128 ou 256 bits compartilhada entre o chip e o UDM.",
                                "Operador OPc: Código criptográfico que isola as operadoras e impede clonagem.",
                                "APN (Access Point Name): Define a rota de saída do assinante (ex: 'internet' ou 'corporativo.mvno')."
                            ],
                            speakerNotes: "Se a chave K ou OPc configurados no banco de dados divergirem por um único bit em relação ao SIM Card, o celular será sumariamente rejeitado pelo AMF."
                        }
                    ],
                    theoryText: `
                        <h3>1. O Funcionamento dos Microsserviços do Open5GS</h3>
                        <p>O <strong>Open5GS</strong> implementa a especificação 3GPP Service-Based Architecture (SBA). Cada função de rede expõe APIs RESTful em JSON sobre HTTP/2 com mTLS para comunicação interna mútua, com exceção das interfaces com a estação rádio-base:</p>
                        
                        <ul>
                            <li><strong>AMF (porta SCTP 38412):</strong> Recebe as mensagens da interface N2 vindas da gNodeB. Gerencia controle de acesso, registro e atualizações de área de rastreamento (Tracking Area Update - TAU).</li>
                            <li><strong>AUSF e UDM:</strong> Responsáveis pelo cálculo dos vetores de autenticação (RAND, AUTN, XRES*, K_ausf). O banco de dados subjacente utilizado por padrão é o <strong>MongoDB</strong>.</li>
                            <li><strong>UPF (porta UDP 2152):</strong> Recebe os quadros GTP-U da interface N3, decapsula os pacotes IP do usuário e os encaminha para a interface virtual <code>ogstun</code> com NAT para acesso externo.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "Open5GS AMF",
                        file: "config/amf.yaml",
                        code: `amf:
  sbi:
    - addr: 10.45.0.10
      port: 7777
  ngap:
    - addr: 10.45.0.10
  guami:
    - plmn_id:
        mcc: 001
        mnc: 01
      amf_id:
        region: 2
        set: 1
  tai:
    - plmn_id:
        mcc: 001
        mnc: 01
      tac: 1
  plmn_support:
    - plmn_id:
        mcc: 001
        mnc: 01
      s_nssai:
        - sst: 1
          sd: '0x111111'`,
                        explanation: "Arquivo de configuração do AMF definindo a identidade PLMN (MCC 001 / MNC 01), o código de área de rastreamento (TAC 1) e a interface SBI (Service Based Interface) na porta 7777."
                    },
                    wiresharkAnalysis: {
                        protocol: "HTTP/2 (Open5GS SBI)",
                        summary: "Comunicação RESTful interna entre AMF e UDM",
                        rawTrace: `Hypertext Transfer Protocol 2:
Stream: GET /nudm-ueau/v1/imsi-001010000000001/security-information/generate-auth-data
Headers:
  :method: POST
  :scheme: http
  :path: /nudm-ueau/v1/imsi-001010000000001/security-information/generate-auth-data
  content-type: application/json
Body:
  {
    "servingNetworkName": "5G:mnc001.mcc001.3gppnetwork.org",
    "ausfInstanceId": "c3a1b2d0-4f81-11eb-ae93-0242ac110002"
  }`
                    },
                    diagramType: "global"
                },
                {
                    id: "3.2",
                    title: "3.2 Yate Telephony Engine: Arquitetura Assíncrona, regexroute.conf, regfile.conf e Módulo Extmodule Node.js",
                    duration: "35 min",
                    tag: "Motor Yate & C++",
                    slides: [
                        {
                            title: "O Coração do Yate: Arquitetura Orientada a Mensagens",
                            subtitle: "Por Que o Yate é Tão Superior para Sinalização e Roteamento",
                            bullets: [
                                "Despachante de Mensagens C++: Componentes internos não se chamam por ponteiros rígidos, mas por emissão de mensagens.",
                                "A Mensagem 'call.route': Interceptada pelos módulos de roteamento para consultar banco de dados ou script externo.",
                                "Módulo regexroute: Permite construir árvores de decisão telefônica complexas com expressões regulares ultra-rápidas.",
                                "Módulo regfile: Banco de credenciais SIP simples, rápido e imune a travamentos de banco relacional."
                            ],
                            speakerNotes: "Enquanto outros softwares criam uma thread pesada por chamada, o Yate usa um modelo de eventos assíncrono extremamente leve e resiliente."
                        },
                        {
                            title: "Integração do Yate com Node.js e APIs REST",
                            subtitle: "O Módulo Extmodule e Sockets Locais",
                            bullets: [
                                "Socket TCP 5039: Conecta o backend da sua empresa diretamente ao núcleo de voz.",
                                "Comandos Textuais Simples: Envio de %%>message e recepção de <%%message em formato chave-valor.",
                                "Automação B2B: Consulta ao CRM da empresa antes de decidir qual ramal deve tocar.",
                                "Injeção de Áudio e URAs Dinâmicas: Capacidade de tocar mensagens personalizadas por cliente."
                            ],
                            speakerNotes: "Com essa integração, qualquer desenvolvedor web consegue programar uma central telefônica usando JavaScript moderno."
                        }
                    ],
                    theoryText: `
                        <h3>1. A Filosofia de Engenharia do Yate</h3>
                        <p>O <strong>Yate (Yet Another Telephony Engine)</strong> foi concebido para resolver os gargalos de escalabilidade dos PABXs convencionais. Ele é estruturado em:</p>
                        <ul>
                            <li><strong>Engine Core:</strong> Gerencia threads, filas de eventos, priorização de tarefas e o barramento de mensagens.</li>
                            <li><strong>Módulos de Canal:</strong> Como o <code>ysipchan.yate</code> (responsável pela pilha SIP UDP/TCP/TLS) e o <code>tonegen.yate</code> (gerador de tons DTMF e ringback).</li>
                            <li><strong>Módulos de Roteamento:</strong> Como o <code>regexroute.yate</code>, que processa regras sequenciais em arquivos de configuração com suporte a expressões regulares POSIX.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "Yate regexroute",
                        file: "config/regexroute.conf",
                        code: `[default]
; Roteamento E.164 Inteligente com Least Cost Routing
; 1. Chamadas internas para São Paulo (1101-1199)
^11\\([0-9][0-9]\\)$=sip/sip:11\\1@10.11.0.10:5060

; 2. Chamadas para o Rio de Janeiro (2101-2199)
^21\\([0-9][0-9]\\)$=sip/sip:21\\1@10.21.0.10:5060

; 3. Chamadas Internacionais para Miami EUA (+1 305 ...)
^+1305\\([0-9]*\\)$=sip/sip:305\\1@10.30.5.10:5060

; 4. Chamadas Internacionais para Portugal (+351 ...)
^+351\\([0-9]*\\)$=sip/sip:351\\1@10.35.1.10:5060

; Fallback de segurança: Rejeita chamadas desconhecidas
.*=return 404`,
                        explanation: "Tabela de roteamento do Yate demonstrando a lógica deLeast Cost Routing (LCR) separando tráfego local, interurbano nacional e DDI internacional."
                    },
                    wiresharkAnalysis: {
                        protocol: "Yate Debug Log / SIP",
                        summary: "Despacho da mensagem call.route interna do Yate",
                        rawTrace: `<message:1402910:call.route:handled=false
  caller=1101
  called=+13053051
  billid=1792167000-1
  ip_transport=UDP
  address=10.11.0.50:5060>
%%>message:1402910:true::sip/sip:3053051@10.30.5.10:5060:handled=true`
                    },
                    diagramType: "brasil"
                },
                {
                    id: "3.3",
                    title: "3.3 Asterisk PBX: PJSIP Channel Driver (pjsip.conf), Dialplan Dinâmico (extensions.conf), Eco (8001) e Conf (8000)",
                    duration: "30 min",
                    tag: "Asterisk & PJSIP",
                    slides: [
                        {
                            title: "O Asterisk Moderno com Pilha PJSIP",
                            subtitle: "Adeus chan_sip convencional • Bem-vindo res_pjsip",
                            bullets: [
                                "A Pilha res_pjsip: Construída sobre a biblioteca oficial Teluu PJSIP, com suporte assíncrono e multi-threading real.",
                                "A Separação em 5 Objetos: endpoint, aor, auth, identify e transport.",
                                "Dialplan em extensions.conf: A máquina de estados que executa as aplicações telefônicas.",
                                "Serviços Essenciais de Teste: Eco interativo na extensão 8001 e sala de conferência HD na extensão 8000."
                            ],
                            speakerNotes: "O PJSIP resolveu os problemas históricos de concorrência do antigo chan_sip, permitindo milhares de registros simultâneos com estabilidade absoluta."
                        },
                        {
                            title: "O Teste de Eco (8001) como Ferramenta de Precisão",
                            subtitle: "Diagnóstico Rápido de Codecs e Latência",
                            bullets: [
                                "Aplicação Echo(): Devolve imediatamente à mesma ponta o áudio recebido em tempo real.",
                                "Detecção de Atraso Acústico: Permite ao usuário ouvir a própria voz e medir a latência percebida.",
                                "Validação de Codec: Confirmação de que a transcodificação de áudio está ativa e com boa qualidade.",
                                "Aplicação ConfBridge(): Criação de pontes de áudio multilaterais para chamadas em grupo."
                            ],
                            speakerNotes: "Sempre que provisionar um novo softphone ou ramal celular, o primeiro teste mandatório é discar para o eco 8001."
                        }
                    ],
                    theoryText: `
                        <h3>1. A Estrutura de Objetos do Asterisk PJSIP</h3>
                        <p>Diferente do canal SIP convencional, o <strong>PJSIP</strong> organiza os assinantes em objetos desacoplados:</p>
                        <ul>
                            <li><strong>transport:</strong> Define o protocolo de transporte de rede (UDP, TCP, TLS ou WebSocket) e a porta de bind.</li>
                            <li><strong>endpoint:</strong> Representa as configurações do assinante (codecs permitidos, contexto de discagem, configurações de NAT).</li>
                            <li><strong>auth:</strong> Armazena o usuário e a senha criptografada para desafio de autenticação (SIP 401 Unauthorized com Digest MD5).</li>
                            <li><strong>aor (Address of Record):</strong> Armazena a lista de endereços IP dinâmicos para onde o Asterisk deve enviar as chamadas quando o ramal é chamado.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "Asterisk Dialplan",
                        file: "config/extensions.conf",
                        code: `[default]
; Ramais de Teste e Validação
exten => 8001,1,NoOp(--- Teste de Eco de Alta Precisão ---)
 same => n,Answer()
 same => n,Playback(demo-echotest)
 same => n,Echo()
 same => n,Hangup()

; Sala de Conferência Internacional Executiva
exten => 8000,1,NoOp(--- Sala de Conferência Multilateral ---)
 same => n,Answer()
 same => n,ConfBridge(1,default_bridge,default_user)
 same => n,Hangup()`,
                        explanation: "Dialplan configurando a extensão 8001 para o teste de eco acústico e a extensão 8000 para a sala de conferência ConfBridge multi-usuário."
                    },
                    wiresharkAnalysis: {
                        protocol: "SIP / RTP In-Call",
                        summary: "Chamada atendida conectando na aplicação de Eco",
                        rawTrace: `SIP/2.0 200 OK
Via: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-7291a82c
From: "Carlos" <sip:1101@10.11.0.1>;tag=9as8d7f2
To: <sip:8001@10.11.0.1>;tag=as5d9a2b
Call-ID: c2a819b0-4f81-11eb-ae93-0242ac110002@10.11.0.50
CSeq: 101 INVITE
Contact: <sip:8001@10.11.0.10:5060>
Content-Type: application/sdp

v=0
o=Asterisk 1792167000 1 IN IP4 10.11.0.10
s=Asterisk PBX
c=IN IP4 10.11.0.10
t=0 0
m=audio 10240 RTP/AVP 0 101`
                    },
                    diagramType: "brasil"
                },
                {
                    id: "3.4",
                    title: "3.4 UERANSIM 5G Radio Emulation: Configuração da gNodeB Virtual, SIM Cards Virtuais e Túnel uesimtun0",
                    duration: "30 min",
                    tag: "5G SA & UERANSIM",
                    slides: [
                        {
                            title: "Emulação de Rádio 5G Standalone com UERANSIM",
                            subtitle: "Simulando Celulares Reais com Interfaces de Kernel Linux",
                            bullets: [
                                "O Papel do nr-gnb: Emula o comportamento da torre de celular 5G em software.",
                                "O Papel do nr-ue: Emula o modem de rádio e o sistema operacional do smartphone.",
                                "A Criação da Interface uesimtun0: Interface de rede de túnel criada no kernel do Linux.",
                                "Navegação Real: O tráfego gerado pela interface uesimtun0 navega na internet real passando pelo UPF."
                            ],
                            speakerNotes: "Com o UERANSIM, podemos testar throughput, latência e resiliência de conexão sem depender de sinal aéreo de operadoras."
                        },
                        {
                            title: "O Arquivo ue.yaml e a Criptografia 5G",
                            subtitle: "Parametrização do Chip Virtual",
                            bullets: [
                                "supi: Identificador internacional 5G (ex: 'imsi-001010000000001').",
                                "mcc e mnc: Código de país e operadora (001 / 01).",
                                "key: Chave criptográfica secreta de 128 bits ('465B5CE8B199B49FAA5F0A2EE238A6BC').",
                                "opc: Código de autenticação do operador para validação de segurança mútua."
                            ],
                            speakerNotes: "Essa configuração espelha com fidelidade absoluta a estrutura interna de um chip SIM Card físico comercial."
                        }
                    ],
                    theoryText: `
                        <h3>1. Arquitetura de Emulação do UERANSIM</h3>
                        <p>O <strong>UERANSIM</strong> é uma suíte de código aberto de alta fidelidade que implementa as especificações 3GPP Release 16 para redes 5G Standalone (SA). Ele divide-se em dois binários independentes:</p>
                        <ul>
                            <li><code>nr-gnb</code>: Conecta-se ao AMF através da interface N2 (SCTP 38412) e ao UPF através da interface N3 (GTP-U 2152). Ele escuta conexões de dispositivos de rádio locais.</li>
                            <li><code>nr-ue</code>: Emula o equipamento de usuário, gerenciando a máquina de estados NAS (Deregistered, Registered, Connected) e criando a interface de rede virtual <code>uesimtun0</code> assim que a sessão PDU é estabelecida com sucesso pelo SMF.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "UERANSIM nr-ue",
                        file: "config/open5gs-ue.yaml",
                        code: `supi: 'imsi-001010000000001'
mcc: '001'
mnc: '01'
key: '465B5CE8B199B49FAA5F0A2EE238A6BC'
opc: 'E8ED289DEBA952E6B6710CE70E09313E'
dnn: 'internet'

# Conecta ao gNodeB local
gnbSearchList:
  - 10.45.0.1`,
                        explanation: "Arquivo de configuração do chip virtual do UERANSIM com as credenciais criptográficas de autenticação e solicitação da APN/DNN 'internet'."
                    },
                    wiresharkAnalysis: {
                        protocol: "5G NAS / PDU Session",
                        summary: "Mensagem PDU Session Establishment Accept atribuindo IP ao celular",
                        rawTrace: `5GS Mobility Management (NAS):
  PDU Session Establishment Accept:
    PDU Session ID: 1
    Selected PDU Session Type: IPv4
    Authorized QoS Rules: QFI 1, 5QI 9 (Best Effort Internet)
    Assigned IPv4 Address: 10.45.0.2
    Primary DNS: 8.8.8.8`
                    },
                    diagramType: "bancada"
                }
            ]
        },
        {
            id: 4,
            title: "Módulo 4: Topologia Multi-País e Roteamento Interurbano e Internacional",
            summary: "O desenho e configuração detalhada dos 3 países (Brasil, EUA e Portugal) e 2 cidades por país, análise de cabeçalhos SIP entre operadoras eLeast Cost Routing (LCR).",
            lessons: [
                {
                    id: "4.1",
                    title: "4.1 Topologia Geral Multi-País: O Anel de Sinalização Brasil ↔ Estados Unidos ↔ Portugal",
                    duration: "30 min",
                    tag: "Rede Global & LCR",
                    slides: [
                        {
                            title: "A Arquitetura de Interconexão Transatlântica",
                            subtitle: "O Fim dos Custos Abusivos de DDI Internacional",
                            bullets: [
                                "O Triângulo Global: POPs distribuídos em São Paulo, Rio de Janeiro, Miami, Nova York, Lisboa e Porto.",
                                "A Filosofia do Breakout Local (LCR): Uma chamada de São Paulo para Nova York viaja por túnel IP cifrado e é entregue localmente no destino.",
                                "Eliminação de Tarifas de Trânsito: A empresa não paga tarifas internacionais para operadoras convencionais.",
                                "Matriz de Latência Controlada: Cabos submarinos dedicados com latências de 75 ms a 110 ms entre continentes."
                            ],
                            speakerNotes: "Com esse modelo, uma corporação multinacional opera como sua própria operadora global privada, reduzindo custos em até 70%."
                        },
                        {
                            title: "A Mecânica da Decisão de Roteamento",
                            subtitle: "Expressões Regulares e Prefixo E.164",
                            bullets: [
                                "Formato Universal E.164: + [Código País] [Código Área] [Número Assinante].",
                                "Prefixo +55: Roteado para o anel Brasil (SBC São Paulo).",
                                "Prefixo +1: Roteado para o anel Estados Unidos (SBC Miami / NY).",
                                "Prefixo +351: Roteado para o anel Portugal (SBC Lisboa / Porto)."
                            ],
                            speakerNotes: "A padronização E.164 garante que qualquer terminal do mundo consiga discar e receber chamadas sem ambiguidades."
                        }
                    ],
                    theoryText: `
                        <h3>1. O Conceito de Least Cost Routing (LCR) Internacional</h3>
                        <p>No modelo de telecomunicações convencional, quando um usuário em São Paulo disca para um número em Miami ou Lisboa, a chamada é entregue à operadora pública nacional (PSTN), que a repassa a uma operadora de trânsito internacional (Carrier Tier-1). Cada intermediário cobra uma taxa de terminação (Passing Fee / Settlement Fee), inflando o custo do minuto em dezenas de vezes.</p>

                        <p>No laboratório <strong>Telecom Academy</strong>, implementamos o conceito de <strong>On-Net Global Breakout</strong>:</p>
                        <ul>
                            <li>A sinalização e o áudio da chamada viajam integralmente pela rede IP privada da empresa através de túneis SIP cifrados com <strong>TLS e SRTP</strong>.</li>
                            <li>A chamada só ingressa na rede pública telefônica (PSTN) no POP mais próximo do destinatário (Breakout Local), sendo tarifada como uma chamada local comum.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "Yate Global SBC",
                        file: "config/ysipchan.conf",
                        code: `[general]
; Habilita TLS e SRTP para os troncos transatlânticos
ssl_certificate=/etc/yate/certs/server.crt
ssl_key=/etc/yate/certs/server.key
default_rtp_crypto=enable

[listener-global]
type=udp
addr=0.0.0.0
port=5060`,
                        explanation: "Configura o canal SIP global com suporte a criptografia TLS nos troncos internacionais e ativação obrigatória de SRTP para segurança da mídia."
                    },
                    wiresharkAnalysis: {
                        protocol: "SIP / TLS",
                        summary: "Handshake TLS protegendo o tronco SIP internacional",
                        rawTrace: `Transport Layer Security:
  TLSv1.3 Handshake Protocol: Client Hello
    Cipher Suites (17 suites)
      Cipher Suite: TLS_AES_256_GCM_SHA384 (0x1302)
      Cipher Suite: TLS_CHACHA20_POLY1305_SHA256 (0x1303)
    Extension: server_name (len=22) -> sbc.miami.telecom.net`
                    },
                    diagramType: "global"
                },
                {
                    id: "4.2",
                    title: "4.2 Roteamento Brasil: POP São Paulo (DDD 11, 1101/1102) vs. POP Rio de Janeiro (DDD 21, 2101/2102)",
                    duration: "30 min",
                    tag: "Topologia Brasil",
                    slides: [
                        {
                            title: "O Roteamento Nacional entre São Paulo e Rio de Janeiro",
                            subtitle: "Interconexão entre a Matriz Financeira e o Polo de Operações",
                            bullets: [
                                "POP São Paulo (DDD 11): Hospeda o núcleo central de assinantes e o tronco PABX da matriz.",
                                "POP Rio de Janeiro (DDD 21): Hospeda o centro de suporte de engenharia e operações de campo.",
                                "Discagem Interna: Ramais 1101/1102 (SP) e 2101/2102 (RJ) conversam com discagem de 4 dígitos direta a custo zero.",
                                "Discagem Pública: Conversão automática de +55 11 / +55 21 para terminação em gateway local."
                            ],
                            speakerNotes: "O funcionário de São Paulo disca simplesmente 2101 para falar com o colega do Rio de Janeiro, sem precisar digitar código de operadora ou DDD."
                        }
                    ],
                    theoryText: `
                        <h3>1. Estrutura do Anel Nacional Brasil</h3>
                        <p>No anel Brasil, conectamos dois dos maiores centros econômicos e operacionais do país:</p>
                        <ul>
                            <li><strong>POP São Paulo (IP 10.11.0.1):</strong> Centraliza os servidores AMF/SMF do Open5GS e o tronco SIP principal. Os ramais 1101 (MicroSIP) e 1102 (Chip Celular 5G) estão registrados localmente neste POP.</li>
                            <li><strong>POP Rio de Janeiro (IP 10.21.0.1):</strong> Centraliza as filas de suporte e o nó secundário UERANSIM. Os ramais 2101 (MicroSIP) e 2102 (Chip Celular 5G) autenticam-se neste nó.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "Yate regexroute SP",
                        file: "config/regexroute.conf",
                        code: `[default]
; Chamada originada em SP com destino ao Rio de Janeiro
^21\\([0-9][0-9]\\)$=sip/sip:21\\1@10.21.0.1:5060;caller=\${caller}

; Chamada local dentro de São Paulo
^11\\([0-9][0-9]\\)$=sip/sip:11\\1@10.11.0.10:5060;caller=\${caller}`,
                        explanation: "Encaminha chamadas com destino ao prefixo 21 diretamente para o IP do POP do Rio de Janeiro via túnel local."
                    },
                    wiresharkAnalysis: {
                        protocol: "SIP / Via Header SP-RJ",
                        summary: "Cabeçalho Via registrando a passagem pelo SBC de São Paulo até o Rio",
                        rawTrace: `INVITE sip:2101@10.21.0.10:5060 SIP/2.0
Via: SIP/2.0/UDP 10.21.0.1:5060;branch=z9hG4bK-rj-trunk-01
Via: SIP/2.0/UDP 10.11.0.1:5060;branch=z9hG4bK-sp-sbc-99
From: "Carlos SP" <sip:1101@10.11.0.1>;tag=sp129
To: <sip:2101@10.21.0.10>
Call-ID: sp-to-rj-call-1792167000
P-Asserted-Identity: "Carlos SP" <sip:1101@telecom.br>`
                    },
                    diagramType: "brasil"
                },
                {
                    id: "4.3",
                    title: "4.3 Roteamento Estados Unidos: POP Miami (NPA 305, 3051) vs. POP Nova York (NPA 212, 2121) e Plano NANP",
                    duration: "30 min",
                    tag: "Topologia EUA",
                    slides: [
                        {
                            title: "O Padrão NANP nos Estados Unidos",
                            subtitle: "North American Numbering Plan: NPA + NXX + XXXX",
                            bullets: [
                                "POP Miami (NPA 305): Ponto de presença na Flórida (Ramal 3051) e gateway de cabos submarinos.",
                                "POP Nova York (NPA 212): Ponto de presença em Manhattan (Ramal 2121), polo financeiro internacional.",
                                "A Regra dos 10 Dígitos: Formato obrigatório nos EUA (ex: 305-555-0101).",
                                "Cifragem Rigorosa TLS/SRTP: Conformidade com padrões de segurança bancária norte-americanos."
                            ],
                            speakerNotes: "Nos Estados Unidos, o codec obrigatório para compatibilidade com operadoras locais (AT&T, Verizon) é o G.711u (Mu-Law)."
                        }
                    ],
                    theoryText: `
                        <h3>1. O Plano de Numeração Norte-Americano (NANP)</h3>
                        <p>O <strong>NANP (North American Numbering Plan)</strong> governa os Estados Unidos, Canadá e várias ilhas caribenhas sob o código de país <strong>+1</strong>. Seu formato obedece à estrutura de 10 dígitos <code>NPA-NXX-XXXX</code>:</p>
                        <ul>
                            <li><strong>NPA (Numbering Plan Area):</strong> Código de área de 3 dígitos (ex: 305 para Miami, 212 para Manhattan/NY).</li>
                            <li><strong>NXX (Central Office Code):</strong> Código do centro de comutação local (dígitos de 2 a 9).</li>
                            <li><strong>XXXX (Station Number):</strong> Identificador de 4 dígitos da linha do assinante.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "Asterisk US Dialplan",
                        file: "config/extensions.conf",
                        code: `[us-outbound]
; Roteamento no formato NANP de 10 dígitos para Miami
exten => _1305NXXXXXX,1,NoOp(Chamada Local para Miami FL)
 same => n,Dial(PJSIP/\${EXTEN}@trunk-miami,60)

; Roteamento para Nova York
exten => _1212NXXXXXX,1,NoOp(Chamada Local para Nova York NY)
 same => n,Dial(PJSIP/\${EXTEN}@trunk-newyork,60)`,
                        explanation: "Padrão de discagem em expressões regulares Asterisk capturando chamadas para Miami (1305) e Nova York (1212) e direcionando aos troncos correspondentes."
                    },
                    wiresharkAnalysis: {
                        protocol: "SIP / Codec Negotiation",
                        summary: "Negociação obrigatória do Codec PCMU (Mu-Law) nos EUA",
                        rawTrace: `SIP/2.0 200 OK
Content-Type: application/sdp

m=audio 20040 RTP/AVP 0 101
a=rtpmap:0 PCMU/8000
a=rtpmap:101 telephone-event/8000
a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:W2/9Fkd29vLmNkZ...`
                    },
                    diagramType: "eua"
                },
                {
                    id: "4.4",
                    title: "4.4 Roteamento Portugal: POP Lisboa (+351 21, 3511) vs. POP Porto (+351 22, 3512) e Formato E.164 Europeu",
                    duration: "30 min",
                    tag: "Topologia Portugal",
                    slides: [
                        {
                            title: "O Padrão Europeu em Portugal",
                            subtitle: "Lisboa (+351 21) e Porto (+351 22)",
                            bullets: [
                                "POP Lisboa (+351 21): Sede europeia de operações e filial institucional (Ramal 3511).",
                                "POP Porto (+351 22): Polo tecnológico e centro de desenvolvimento de software (Ramal 3512).",
                                "O Codec Obrigatório Europeu: G.711a (A-Law) padronizado pela ITU-T e ETSI.",
                                "Transcodificação Yate: Conversão instantânea de A-Law para Mu-Law quando a chamada vai para os EUA."
                            ],
                            speakerNotes: "Se uma central não suportar transcodificação dinâmica, a chamada entre Portugal e EUA resultará em ruído branco ou queda de áudio."
                        }
                    ],
                    theoryText: `
                        <h3>1. O Sistema Telefónico Português e a Transcodificação A-Law</h3>
                        <p>Portugal opera sob a regulação da <strong>ANACOM</strong> e do órgão europeu <strong>BEREC</strong>. Os números geográficos fixos possuem 9 dígitos iniciados pelo código de área (ex: 21 para Lisboa, 22 para o Porto). No contexto internacional, recebem o prefixo <strong>+351</strong>.</p>

                        <p>O ponto crítico de engenharia entre Europa e Américas é a <strong>lei de compansão de áudio PCM</strong>:</p>
                        <ul>
                            <li><strong>Europa / Portugal:</strong> Utiliza exclusivamente a <strong>A-Law (G.711a)</strong>, que oferece melhor faixa dinâmica para sinais de baixo nível acústico.</li>
                            <li><strong>EUA / Brasil:</strong> Utiliza prioritariamente a <strong>Mu-Law (G.711u)</strong>.</li>
                            <li><strong>Solução:</strong> O motor Yate atua como transcodificador em tempo real em espaço de usuário, recalculando as tabelas de quantização sem atraso perceptível de áudio (latência inferior a 1 milissegundo).</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "Yate Transcoder",
                        file: "config/transcoder.conf",
                        code: `[general]
; Habilita transcodificação automática entre codecs incompatíveis
enabled=yes

[codecs]
; Converte A-Law para Mu-Law em tempo real na CPU
alaw=mulaw
mulaw=alaw
opus=alaw,mulaw`,
                        explanation: "Módulo do Yate encarregado da transcodificação automática entre os codecs da Europa (A-Law) e Américas (Mu-Law)."
                    },
                    wiresharkAnalysis: {
                        protocol: "SIP / SDP Europe",
                        summary: "Sessão SDP em Lisboa oferecendo PCMA como prioridade",
                        rawTrace: `Content-Type: application/sdp

v=0
o=lisboa-sbc 1792167000 1 IN IP4 10.35.1.1
s=Yate Portugal
c=IN IP4 10.35.1.1
m=audio 30000 RTP/AVP 8 0 101
a=rtpmap:8 PCMA/8000
a=rtpmap:0 PCMU/8000`
                    },
                    diagramType: "portugal"
                },
                {
                    id: "4.5",
                    title: "4.5 Wireshark Deep-Dive no Roteamento: Headers SIP (INVITE, Via, PAI, Diversion, Route) entre os 3 Países",
                    duration: "35 min",
                    tag: "Wireshark Avançado",
                    slides: [
                        {
                            title: "Dissecção Avançada de Cabeçalhos SIP",
                            subtitle: "Os Headers Críticos de Interconexão entre Países",
                            bullets: [
                                "Via: Evita loops infinitos e garante que as respostas sigam exatamente a rota reversa.",
                                "P-Asserted-Identity (PAI - RFC 3325): Carrega a identidade autenticada do usuário corporativo.",
                                "Diversion (RFC 5806): Registra o histórico de desvios e transferências da chamada.",
                                "Route e Record-Route (RFC 3261): Forçam o tráfego subsequente (ACK, BYE, re-INVITE) a passar pelos SBCs."
                            ],
                            speakerNotes: "Entender cabeçalhos PAI e Diversion é essencial para garantir a exibição correta do número de identificação do assinante (BINA) em operadoras internacionais."
                        }
                    ],
                    theoryText: `
                        <h3>1. A Anatomia dos Cabeçalhos SIP de Grau de Operadora</h3>
                        <p>Nas interconexões comerciais entre diferentes países, os cabeçalhos desempenham papéis de governança e faturamento inegociáveis:</p>
                        
                        <ul>
                            <li><strong>P-Asserted-Identity (PAI):</strong> Garante a autenticidade do número do emissor, impedindo fraudes de spoofing de chamadas.</li>
                            <li><strong>Max-Forwards:</strong> Contador decrescente (tipicamente inicializado em 70) que evita que mensagens SIP circulem indefinidamente em caso de falha de loop de roteamento.</li>
                            <li><strong>Call-ID:</strong> String pseudo-randômica única que correlaciona todas as mensagens pertencentes à mesma sessão em todos os países.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "Asterisk PJSIP Headers",
                        file: "config/extensions.conf",
                        code: `[macro-add-pai]
; Injeta o cabeçalho P-Asserted-Identity antes de enviar para o exterior
exten => s,1,Set(PJSIP_HEADER(add,P-Asserted-Identity)="Carlos Telecom" <sip:\${CALLERID(num)}@telecom.programandosolucoes.com.br>)
 same => n,Return()`,
                        explanation: "Dialplan Asterisk injetando o cabeçalho P-Asserted-Identity para identificação de chamadas corporativas em rotas DDI."
                    },
                    wiresharkAnalysis: {
                        protocol: "SIP Header Dissection",
                        summary: "Inspeção completa dos cabeçalhos de uma chamada internacional",
                        rawTrace: `INVITE sip:3511@10.35.1.1:5060 SIP/2.0
Via: SIP/2.0/UDP 10.11.0.1:5060;branch=z9hG4bK-inter-br-pt-9182
Max-Forwards: 69
From: "Diretoria SP" <sip:1101@telecom.br>;tag=br101
To: <sip:3511@telecom.pt>
Call-ID: int-call-sp-lisbon-8192a
CSeq: 1 INVITE
P-Asserted-Identity: "Carlos Lopes" <sip:5511999991101@telecom.br>
Diversion: <sip:1100@telecom.br>;reason=unconditional;counter=1
Contact: <sip:1101@10.11.0.1:5060>
Content-Type: application/sdp`
                    },
                    diagramType: "global"
                }
            ]
        },
        {
            id: 5,
            title: "Módulo 5: Laboratório Prático, Softphones MicroSIP e Hands-On de Bancada",
            summary: "Provisionamento do softphone MicroSIP no Windows, testes de chamadas locais e internacionais, análise de métricas MOS/Jitter e resolução de erros SIP comuns.",
            lessons: [
                {
                    id: "5.1",
                    title: "5.1 Provisionamento e Instalação do MicroSIP: Configuração dos 6 Ramais Internacionais e Codecs de Voz HD",
                    duration: "30 min",
                    tag: "Hands-On & Softphone",
                    slides: [
                        {
                            title: "Configurando o MicroSIP como Softphone de Engenharia",
                            subtitle: "Parâmetros para os 3 Países e 6 Cidades",
                            bullets: [
                                "O Softphone MicroSIP: Leve, de código aberto, com suporte nativo a PJSIP, Opus HD, SRTP e TLS.",
                                "A Tabela Mestra de Ramais: 1101 (SP), 2101 (RJ), 3051 (Miami), 2121 (NY), 3511 (Lisboa) e 3512 (Porto).",
                                "Configuração de Conta: SIP Server (127.0.0.1:5060), Usuário e Senha de autenticação.",
                                "Ajuste de Codecs de Voz HD: Opus a 48 kHz para qualidade de rádio FM e G.711 para compatibilidade de operadora."
                            ],
                            speakerNotes: "O MicroSIP é a melhor ferramenta para validação rápida no Windows, permitindo verificar logs de sinalização na aba 'Logs' em tempo real."
                        }
                    ],
                    theoryText: `
                        <h3>1. Guia Prático de Instalação do MicroSIP no Windows</h3>
                        <p>O <strong>MicroSIP</strong> é um softphone portátil de alto desempenho construído sobre a biblioteca PJSIP. Para provisionar suas contas de laboratório:</p>
                        
                        <ol>
                            <li>Abra o MicroSIP e clique na seta no canto superior direito -> <strong>Adicionar Conta...</strong></li>
                            <li>Preencha os campos com as credenciais da tabela abaixo:</li>
                        </ol>

                        <table style="width:100%; border-collapse:collapse; margin:15px 0;">
                            <thead>
                                <tr style="background:#1e293b; color:#38bdf8; text-align:left;">
                                    <th style="padding:8px; border:1px solid #334155;">País / Cidade</th>
                                    <th style="padding:8px; border:1px solid #334155;">Ramal</th>
                                    <th style="padding:8px; border:1px solid #334155;">SIP Server</th>
                                    <th style="padding:8px; border:1px solid #334155;">Usuário / Senha</th>
                                    <th style="padding:8px; border:1px solid #334155;">Codec Recomendado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding:8px; border:1px solid #334155;">🇧🇷 Brasil (São Paulo)</td>
                                    <td style="padding:8px; border:1px solid #334155;"><strong>1101</strong></td>
                                    <td style="padding:8px; border:1px solid #334155;">127.0.0.1:5060</td>
                                    <td style="padding:8px; border:1px solid #334155;">1101 / 1101pass</td>
                                    <td style="padding:8px; border:1px solid #334155;">G.711u / Opus</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px; border:1px solid #334155;">🇧🇷 Brasil (Rio de Janeiro)</td>
                                    <td style="padding:8px; border:1px solid #334155;"><strong>2101</strong></td>
                                    <td style="padding:8px; border:1px solid #334155;">127.0.0.1:5060</td>
                                    <td style="padding:8px; border:1px solid #334155;">2101 / 2101pass</td>
                                    <td style="padding:8px; border:1px solid #334155;">G.711u / Opus</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px; border:1px solid #334155;">🇺🇸 EUA (Miami FL)</td>
                                    <td style="padding:8px; border:1px solid #334155;"><strong>3051</strong></td>
                                    <td style="padding:8px; border:1px solid #334155;">127.0.0.1:5060</td>
                                    <td style="padding:8px; border:1px solid #334155;">3051 / 3051pass</td>
                                    <td style="padding:8px; border:1px solid #334155;">G.711u (PCMU)</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px; border:1px solid #334155;">🇺🇸 EUA (Nova York NY)</td>
                                    <td style="padding:8px; border:1px solid #334155;"><strong>2121</strong></td>
                                    <td style="padding:8px; border:1px solid #334155;">127.0.0.1:5060</td>
                                    <td style="padding:8px; border:1px solid #334155;">2121 / 2121pass</td>
                                    <td style="padding:8px; border:1px solid #334155;">G.711u (PCMU)</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px; border:1px solid #334155;">🇵🇹 Portugal (Lisboa)</td>
                                    <td style="padding:8px; border:1px solid #334155;"><strong>3511</strong></td>
                                    <td style="padding:8px; border:1px solid #334155;">127.0.0.1:5060</td>
                                    <td style="padding:8px; border:1px solid #334155;">3511 / 3511pass</td>
                                    <td style="padding:8px; border:1px solid #334155;">G.711a (PCMA)</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px; border:1px solid #334155;">🇵🇹 Portugal (Porto)</td>
                                    <td style="padding:8px; border:1px solid #334155;"><strong>3512</strong></td>
                                    <td style="padding:8px; border:1px solid #334155;">127.0.0.1:5060</td>
                                    <td style="padding:8px; border:1px solid #334155;">3512 / 3512pass</td>
                                    <td style="padding:8px; border:1px solid #334155;">G.711a (PCMA)</td>
                                </tr>
                            </tbody>
                        </table>
                    `,
                    softwareConfig: {
                        software: "Yate regfile.conf",
                        file: "config/regfile.conf",
                        code: `[1101]
password=1101pass
defaultuser=1101

[2101]
password=2101pass
defaultuser=2101

[3051]
password=3051pass
defaultuser=3051

[2121]
password=2121pass
defaultuser=2121

[3511]
password=3511pass
defaultuser=3511

[3512]
password=3512pass
defaultuser=3512`,
                        explanation: "Base de usuários do Yate autorizando o registro dos 6 ramais de teste utilizados no MicroSIP."
                    },
                    wiresharkAnalysis: {
                        protocol: "SIP REGISTER / Auth",
                        summary: "Registro e desafio Digest MD5 bem-sucedido no MicroSIP",
                        rawTrace: `MicroSIP -> Yate: REGISTER sip:127.0.0.1:5060 (Sem autorização)
Yate -> MicroSIP: SIP/2.0 401 Unauthorized (Nonce gerado)
MicroSIP -> Yate: REGISTER sip:127.0.0.1:5060 (Digest response)
Yate -> MicroSIP: SIP/2.0 200 OK (Contact registrado com sucesso)`
                    },
                    diagramType: "brasil"
                },
                {
                    id: "5.2",
                    title: "5.2 Roteiro de Testes Hands-On: Chamada Local, Chamada Interurbana, Chamada DDI e Teste de Eco",
                    duration: "30 min",
                    tag: "Testes Práticos",
                    slides: [
                        {
                            title: "Roteiro de Validação Prática de Bancada",
                            subtitle: "Testando Todos os Tipos de Roteamento",
                            bullets: [
                                "Teste 1 (Eco Acústico): Discar 8001 para calibrar áudio e aferir latência local.",
                                "Teste 2 (Chamada Local SP): Discar de 1101 para 1102 (Ramal do chip celular 5G).",
                                "Teste 3 (Chamada Interurbana BR): Discar de 1101 para 2101 (Rio de Janeiro).",
                                "Teste 4 (Chamada Internacional DDI): Discar de 1101 para 3511 (Lisboa) e verificar a transcodificação de áudio."
                            ],
                            speakerNotes: "Esse roteiro garante que a esteira está 100% validada antes de ser entregue a qualquer cliente corporativo."
                        }
                    ],
                    theoryText: `
                        <h3>1. Execução do Roteiro de Testes</h3>
                        <p>Com o MicroSIP registrado com o ramal <strong>1101</strong>, execute a seguinte sequência de discagem:</p>
                        <ul>
                            <li><strong>Discagem <code>8001</code>:</strong> Conecta ao serviço de eco do Asterisk. Fale no microfone e confirme que sua voz retorna imediatamente sem eco distorcido ou picotes de áudio.</li>
                            <li><strong>Discagem <code>8000</code>:</strong> Entra na sala de conferência internacional. Abra uma segunda instância do softphone e converse simultaneamente entre duas janelas.</li>
                            <li><strong>Discagem <code>2101</code>:</strong> Testa a rota São Paulo ↔ Rio de Janeiro. Observe no terminal do Yate a mensagem <code>call.route</code> comutando para o IP 10.21.0.1.</li>
                            <li><strong>Discagem <code>+3513511</code> ou <code>3511</code>:</strong> Testa o roteamento transatlântico até Lisboa com transcodificação automática.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "Docker Compose",
                        file: "docker-compose.yml",
                        code: `# Subir todos os serviços de telecomunicação no Windows:
docker compose up -d

# Visualizar logs em tempo real do Yate e Asterisk:
docker logs -f telecom-yate
docker logs -f telecom-asterisk`,
                        explanation: "Comandos Docker para inicialização e acompanhamento dos logs de sinalização em tempo real."
                    },
                    wiresharkAnalysis: {
                        protocol: "RTP Statistics",
                        summary: "Relatório de Qualidade de Chamada RTP Stream Analysis",
                        rawTrace: `Max Delta: 20.4 ms (Ideal = 20.0 ms)
Max Jitter: 0.8 ms (Excelente: < 10 ms)
Mean Jitter: 0.2 ms
Packet Loss: 0.0% (0 / 1420 packets)
MOS-CQ: 4.41 (Qualidade de Voz HD)`
                    },
                    diagramType: "global"
                },
                {
                    id: "5.3",
                    title: "5.3 Troubleshooting e Códigos de Erro SIP: Tratamento de Falhas (401, 403, 404, 486, 488 e 503)",
                    duration: "30 min",
                    tag: "Troubleshooting",
                    slides: [
                        {
                            title: "Guia Forense de Erros Telefônicos",
                            subtitle: "Como Diagnosticar e Corrigir os Principais Erros SIP",
                            bullets: [
                                "401 Unauthorized vs. 403 Forbidden: Divergência de senha vs. proibição de discagem por política/ACL.",
                                "404 Not Found: Número discado não existe no dialplan ou falha na expressão regular.",
                                "486 Busy Here: O ramal de destino já está ocupado ou em modo Não Perturbe (DND).",
                                "488 Not Acceptable Here: Incompatibilidade crítica de codecs (ex: uma ponta só aceita G.729 e a outra só G.711).",
                                "503 Service Unavailable: Falha de conexão de rede ou servidor de destino offline."
                            ],
                            speakerNotes: "Com essa matriz de diagnóstico, o engenheiro resolve chamadas com falha em segundos, sabendo exatamente em qual camada de software o erro ocorreu."
                        }
                    ],
                    theoryText: `
                        <h3>1. Catálogo de Erros SIP e Procedimentos de Correção</h3>
                        <table style="width:100%; border-collapse:collapse; margin:15px 0;">
                            <thead>
                                <tr style="background:#1e293b; color:#38bdf8; text-align:left;">
                                    <th style="padding:8px; border:1px solid #334155;">Código SIP</th>
                                    <th style="padding:8px; border:1px solid #334155;">Significado</th>
                                    <th style="padding:8px; border:1px solid #334155;">Causa Raiz Mais Provável</th>
                                    <th style="padding:8px; border:1px solid #334155;">Como Solucionar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding:8px; border:1px solid #334155; font-weight:bold; color:#ef4444;">401 Unauthorized</td>
                                    <td style="padding:8px; border:1px solid #334155;">Autenticação Requerida</td>
                                    <td style="padding:8px; border:1px solid #334155;">Senha incorreta no MicroSIP</td>
                                    <td style="padding:8px; border:1px solid #334155;">Conferir arquivo <code>regfile.conf</code> ou <code>pjsip.conf</code></td>
                                </tr>
                                <tr>
                                    <td style="padding:8px; border:1px solid #334155; font-weight:bold; color:#f59e0b;">404 Not Found</td>
                                    <td style="padding:8px; border:1px solid #334155;">Destino Não Encontrado</td>
                                    <td style="padding:8px; border:1px solid #334155;">Expressão regular no <code>regexroute.conf</code> não casou</td>
                                    <td style="padding:8px; border:1px solid #334155;">Ajustar regex para capturar o prefixo discado</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px; border:1px solid #334155; font-weight:bold; color:#ef4444;">488 Not Acceptable</td>
                                    <td style="padding:8px; border:1px solid #334155;">Incompatibilidade de Mídia</td>
                                    <td style="padding:8px; border:1px solid #334155;">Nenhum codec comum entre emissor e receptor</td>
                                    <td style="padding:8px; border:1px solid #334155;">Habilitar transcodificação no Yate ou adicionar G.711u</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px; border:1px solid #334155; font-weight:bold; color:#ef4444;">503 Service Unavailable</td>
                                    <td style="padding:8px; border:1px solid #334155;">Serviço Indisponível</td>
                                    <td style="padding:8px; border:1px solid #334155;">Contêiner do PABX ou tronco SIP offline</td>
                                    <td style="padding:8px; border:1px solid #334155;">Verificar se o container Docker está rodando</td>
                                </tr>
                            </tbody>
                        </table>
                    `,
                    softwareConfig: {
                        software: "Yate Log Debugger",
                        file: "config/yate.conf",
                        code: `[general]
; Eleva o nível de debug do Yate para rastreamento forense
debug=yes
verbose=9
colorize=yes`,
                        explanation: "Eleva o nível de verbosidade do Yate para nível 9, exibindo cada linha de sinalização e cabeçalho analisado."
                    },
                    wiresharkAnalysis: {
                        protocol: "SIP 488 Rejection",
                        summary: "Exemplo de rejeição de chamada por incompatibilidade de codecs",
                        rawTrace: `SIP/2.0 488 Not Acceptable Here
Via: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-7291a82c
From: "Carlos" <sip:1101@telecom.br>;tag=9as8d7f2
To: <sip:3511@telecom.pt>;tag=as89127c
Call-ID: c2a819b0-4f81-11eb-ae93-0242ac110002
CSeq: 101 INVITE
Warning: 304 10.35.1.1 "Incompatible Media Capabilities (No common codec)"`
                    },
                    diagramType: "global"
                }
            ]
        },
        {
            id: 6,
            title: "Módulo 6: NotebookLM Studio — Apresentações em Slides, Audio Overviews e Sínteses",
            summary: "Apresentação executiva em formato de slides (PowerPoint interativo), áudio podcast técnico aprofundado gerado no NotebookLM e download do livro oficial.",
            lessons: [
                {
                    id: "6.1",
                    title: "6.1 Apresentação Executiva em Slides (Deck HTML5/PowerPoint) sobre a Operação MVNO 2026",
                    duration: "25 min",
                    tag: "Apresentação & Pitch",
                    slides: [
                        {
                            title: "Pitch Executivo: A Oportunidade da MVNO B2B",
                            subtitle: "Por Que o Mercado Corporativo Precisa de Redes Abertas",
                            bullets: [
                                "Tamanho de Mercado: Bilhões gastos anualmente em faturas corporativas engessadas de grandes operadoras.",
                                "A Dor do Cliente: Chips de celular separados do PABX do escritório e custos exorbitantes de DDI.",
                                "Nossa Proposta de Valor: Operadora Móvel Virtual própria com numeração própria e convergência total com PABX em nuvem.",
                                "Margens de Lucro: Redução de 70% no custo de telecomunicação para o cliente e alta rentabilidade para a MVNO."
                            ],
                            speakerNotes: "Este slide sintetiza a proposta de valor que você apresentará a diretores e investidores para fechar contratos de MVNO."
                        },
                        {
                            title: "Arquitetura e Governança de Lançamento",
                            subtitle: "Roadmap Técnico para Fevereiro de 2026",
                            bullets: [
                                "Fase 1 (Laboratório e Homologação): Validação completa no docker-lab com confinamento de 60 dB e testes com UERANSIM.",
                                "Fase 2 (Credenciamento Regulatório): Contrato com agregadora autorizada conforme Resolução Anatel nº 777/2025.",
                                "Fase 3 (Piloto Comercial): Ativação dos primeiros 100 SIM Cards corporativos com PABX Yate em nuvem.",
                                "Fase 4 (Escala Internacional): Interconexão com POPs em Miami e Lisboa para eliminação total de DDI."
                            ],
                            speakerNotes: "Com esse roadmap determinístico, a operação sai do papel com segurança jurídica e excelência técnica."
                        }
                    ],
                    theoryText: `
                        <h3>1. Síntese Executiva do Modelo de Negócios</h3>
                        <p>A convergência entre software livre de telecomunicações (Open5GS, Yate, Asterisk) e o modelo de <strong>MVNO Credenciada (Resolução Anatel nº 777/2025)</strong> cria uma janela inédita de oportunidade no mercado brasileiro:</p>
                        
                        <ul>
                            <li><strong>Redução Drástica de CAPEX e OPEX:</strong> Em vez de pagar centenas de milhares de reais por licenças de fabricantes proprietários, toda a inteligência roda em contêineres Docker sobre hardware padrão x86.</li>
                            <li><strong>Fidelização B2B:</strong> A empresa cliente substitui sua fatura de telefonia tradicional por uma solução proprietária unificada, onde o smartphone corporativo toca junto com a mesa de trabalho em qualquer lugar do mundo.</li>
                        </ul>
                    `,
                    softwareConfig: {
                        software: "NotebookLM Studio",
                        file: "notebook_mvno_2026.json",
                        code: `{
  "notebook_id": "nb_telecom_mvno_2026",
  "title": "Laboratório MVNO Telecom 5G & EAD Convergente",
  "sources_count": 5,
  "studio_status": "ready",
  "presentation_deck": "deck_executivo_mvno_2026.pptx"
}`,
                        explanation: "Metadados do projeto de apresentação executiva e síntese gerados no NotebookLM Studio."
                    },
                    wiresharkAnalysis: {
                        protocol: "Studio Export",
                        summary: "Geração de slides executivos e podcast multimídia",
                        rawTrace: `HTTP/2 200 OK
Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation
Content-Disposition: attachment; filename="apresentacao_mvno_2026.pptx"
Payload: 1.4 MB [PowerPoint Executivo Pronto]`
                    },
                    diagramType: "global"
                },
                {
                    id: "6.2",
                    title: "6.2 Deep Dive em Áudio: O Podcast Técnico Gerado pelo NotebookLM Studio com Transcrição Sincronizada",
                    duration: "30 min",
                    tag: "Áudio & Podcast",
                    slides: [
                        {
                            title: "Deep Dive em Áudio: O Podcast da Bancada Confinada",
                            subtitle: "Debate Técnico em Profundidade sobre OpenBTS, Yate e o Art. 183 da LGT",
                            bullets: [
                                "Vozes de IA em Formato de Debate: Dois especialistas discutindo os desafios práticos de engenharia.",
                                "Foco Temático: O porquê dos 60 dB de atenuação e a diferença entre hardware simulado e placas SDR.",
                                "Transcrição Sincronizada: Acompanhamento textual linha por linha do diálogo enquanto o áudio é reproduzido.",
                                "Disponível na Plataforma EAD: Integrado nativamente no reprodutor de áudio no topo da aula."
                            ],
                            speakerNotes: "O podcast técnico do NotebookLM sintetiza as discussões mais densas da telecomunicação em um formato agradável e altamente educativo."
                        }
                    ],
                    theoryText: `
                        <h3>1. O Papel do NotebookLM Audio Overview na Educação Técnica</h3>
                        <p>O <strong>Google NotebookLM Studio</strong> utiliza modelos de linguagem de ponta para analisar as fontes técnicas da biblioteca (livro do Prof. Delphini, manual do OpenBTS, arquivos de configuração Docker) e sintetizar um <strong>Deep Dive Podcast</strong>:</p>
                        
                        <p>Neste áudio, são debatidos pontos cruciais como a transição regulatória da Anatel, a física de bancada cabeada e como montar um laboratório de testes sem gastar com equipamentos caros. O áudio está disponível diretamente no player no topo desta aula.</p>
                    `,
                    softwareConfig: {
                        software: "NotebookLM Audio Engine",
                        file: "public/audio/nb_telecom_mvno_2026.m4a",
                        code: `# Comando executado via skill-hub MCP:
skill-hub ferramenta_executar --nome google_notebooklm_baixar_podcast --parametros '{"notebook_id":"nb_telecom_mvno_2026"}'`,
                        explanation: "Comando executado pela suíte MCP para sincronização e download do arquivo de áudio gerado pelo NotebookLM para a plataforma EAD."
                    },
                    wiresharkAnalysis: {
                        protocol: "Audio Streaming",
                        summary: "Reprodução de áudio M4A via HTML5 Audio API",
                        rawTrace: `GET /audio/nb_telecom_mvno_2026.m4a HTTP/1.1
Host: localhost:8080
Range: bytes=0-
HTTP/1.1 206 Partial Content
Content-Type: audio/mp4
Content-Range: bytes 0-48/49`
                    },
                    diagramType: "bancada"
                },
                {
                    id: "6.3",
                    title: "6.3 Avaliação Final, Certificação e Download do Livro Oficial de Carlos Lopes em formato EPUB",
                    duration: "25 min",
                    tag: "Conclusão & Livro EPUB",
                    slides: [
                        {
                            title: "Parabéns! Formação Completa Concluída",
                            subtitle: "Você Dominou os Pilares da Telefonia Aberta e MVNO",
                            bullets: [
                                "Conhecimento Consolidado: Do rádio SDR confinado aos núcleos 5G Open5GS, Yate e Asterisk.",
                                "Roteamento Global Operacional: Brasil (SP/RJ), EUA (Miami/NY) e Portugal (Lisboa/Porto).",
                                "Conformidade Total: Resolução Anatel nº 777/2025 e Art. 183 da Lei 9.472/1997 dominados.",
                                "Obra Literária Exclusiva: Baixe agora o livro digital oficial em formato EPUB de autoria de Carlos Lopes."
                            ],
                            speakerNotes: "Parabéns por concluir esta jornada de alta densidade técnica. O seu livro digital em formato EPUB está disponível para download imediato abaixo."
                        }
                    ],
                    theoryText: `
                        <h3>1. Mensagem Final do Autor e Engenheiro</h3>
                        <p>Chegamos ao fim da jornada técnica da <strong>Telecom Academy</strong>. Ao longo destes 6 módulos e 24 aulas aprofundadas, desmistificamos os mitos de que a telefonia celular é inacessível para engenheiros e programadores.</p>

                        <p>Você compreendeu como a separação entre plano de controle e plano de dados permitiu que motores como <strong>Yate</strong> e <strong>Open5GS</strong> competissem de igual para igual com as maiores fabricantes do planeta. Mais importante: você aprendeu a operar com estrita segurança jurídica e técnica, respeitando as normas da Anatel e dominando o confinamento RF de bancada.</p>

                        <h3>2. Download do Livro Oficial</h3>
                        <p>Como coroamento do seu aprendizado, faça o download gratuito da obra:</p>
                        <div style="background:#1e293b; padding:20px; border-radius:8px; border:1px solid #38bdf8; text-align:center; margin:20px 0;">
                            <h4 style="color:#38bdf8; margin:0 0 10px;">Engenharia de Telecomunicações e MVNO Convergente</h4>
                            <p style="color:#94a3b8; font-size:0.95rem; margin-bottom:15px;">Autoria: Carlos Alberto Lopes (Edição 2026 • 165 Páginas Digitais)</p>
                            <a href="downloads/Engenharia_Telecom_MVNO_Convergente_Carlos_Lopes.epub" class="btn-download" style="background:#0284c7; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:700; display:inline-block;">📥 Baixar Livro Digital (.EPUB)</a>
                        </div>
                    `,
                    softwareConfig: {
                        software: "EPUB Compiler",
                        file: "scripts/build_epub.py",
                        code: `# Compilação do livro digital oficial a partir dos manuscritos técnicos:
python scripts/build_epub.py`,
                        explanation: "Script em Python responsável por gerar o arquivo binário EPUB validado no formato IDPF OEBPS."
                    },
                    wiresharkAnalysis: {
                        protocol: "HTTP Download",
                        summary: "Download do arquivo EPUB concluído com sucesso",
                        rawTrace: `GET /downloads/Engenharia_Telecom_MVNO_Convergente_Carlos_Lopes.epub HTTP/1.1
Host: localhost:8080
HTTP/1.1 200 OK
Content-Type: application/epub+zip
Content-Length: 8251 bytes
[Download Homologado com Sucesso]`
                    },
                    diagramType: "global"
                }
            ]
        }
    ]
};

// Exporta globalmente no navegador ou para ambiente Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = courseCurriculum;
}
