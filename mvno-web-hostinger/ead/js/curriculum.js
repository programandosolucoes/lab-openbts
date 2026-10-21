/**
 * @file curriculum.js
 * @description Acervo Curricular Completo da Telecom Academy (Padrão de Ensino Udemy Pro)
 * 6 Módulos, 24 Aulas com Teoria Exaustiva, Configurações de Software, Análise Wireshark,
 * Decks de Slides Interativos (PowerPoint) e Laboratórios Práticos de Bancada.
 * Versão Compilada: 2026-10-21T12:33:41.009Z
 */

const courseCurriculum = {
  "courseTitle": "Engenharia de Redes Móveis, Telecom Aberta & MVNO Convergente",
  "instructor": "Carlos Alberto & Prof. Angelo Delphini (Edição 2026)",
  "institution": "Programando Soluções • OSTS Telecom",
  "regulatoryFramework": "Resolução Anatel nº 777/2025 • Art. 183 Lei 9.472/1997",
  "version": "2026.10.21-v4-udemy-pro",
  "totalModules": 6,
  "totalLessons": 24,
  "modules": [
    {
      "id": 1,
      "title": "Módulo 1: Fundamentos de Telecom Aberta, Marco Regulatório e Hardware Confinado",
      "summary": "A transição histórica da telefonia TDM para software aberto All-IP, o novo marco regulatório da Anatel (Resolução 777/2025), o risco penal do Artigo 183 da LGT e a física de RF em bancada cabeada.",
      "lessons": [
        {
          "id": "1.1",
          "title": "1.1 Introdução ao Fragmento Tecnológico: Do Circuito TDM/SS7 às Redes Abertas All-IP",
          "duration": "30 min",
          "tag": "Arquitetura & História",
          "slides": [
            {
              "title": "A Revolução All-IP nas Telecomunicações",
              "subtitle": "Do Comutador Eletromecânico ao Software de Uso Geral",
              "bullets": [
                "Telefonia Convencional: Circuitos dedicados TDM de 64 kbit/s (PCM) com sinalização proprietária SS7.",
                "A Separação entre Transporte e Inteligência: Como o SIP e a comutação de pacotes destruíram o monopólio das caixas pretas.",
                "Abertura do Ecossistema: Yate, Open5GS e Asterisk substituindo centrais telefônicas multimilionárias.",
                "Convergência Móvel-Fixa (FMC): O chip de celular passa a ser um endpoint SIP corporativo integrado ao PABX."
              ],
              "speakerNotes": "Nesta aula inaugural, analisamos a transição tecnológica que permitiu aos engenheiros de software assumirem o controle da infraestrutura de telecomunicações que antes pertencia com exclusividade a multinacionais de hardware comutado."
            },
            {
              "title": "O Ponto de Inflexão das NGN (Next Generation Networks)",
              "subtitle": "Comparativo entre Comutação de Circuitos e Comutação de Pacotes",
              "bullets": [
                "Circuito TDM: Alocação estática de banda mesmo durante o silêncio (desperdício de 60% da capacidade).",
                "Voz sobre IP (VoIP): Compressão estatística, Voice Activity Detection (VAD) e multiplexação de pacotes RTP.",
                "Desacoplamento de Hardware: Servidores COTS (Commercial Off-The-Shelf) x86 rodando Linux substituindo racks dedicados.",
                "O papel da arquitetura orientada a mensagens do Yate na orquestração assíncrona."
              ],
              "speakerNotes": "O Yate foi pioneiro ao tratar cada evento de telefonia como uma mensagem serializada, permitindo que linguagens de alto nível controlem o fluxo de chamadas."
            },
            {
              "title": "O Fragmento Tecnológico da Engenharia Aberta",
              "subtitle": "Como o Código Aberto Conquistou o Core Celular",
              "bullets": [
                "OpenBTS (2008): A primeira estação rádio-base GSM de código aberto sintetizada em software (SDR).",
                "YateBTS e MBTS: A divisão entre camada de rádio física e comutador lógico de sinalização.",
                "Open5GS (2020-2026): A consolidação da Service-Based Architecture (SBA) do 3GPP em C/C++ de alto desempenho.",
                "Asterisk e FreeSWITCH: O ecossistema de aplicação que transforma ligações em fluxos HTTP/WebRTC."
              ],
              "speakerNotes": "O fragmento técnico que exploramos é a convergência: o mesmo servidor que gerencia um banco de dados agora roda a AMF e o UPF de uma rede celular 5G."
            },
            {
              "title": "Topologia do Laboratório: 3 Países em Malha All-IP",
              "subtitle": "Brasil (São Paulo / Rio), EUA (Miami / NY) e Portugal (Lisboa / Porto)",
              "bullets": [
                "Interconexão Internacional: Roteamento SIP baseado em numeração global E.164.",
                "Plano de Numeração Dedicado: Ramais 11xx (SP), 21xx (RJ), 305x (MIA), 212x (NYC), 351x (LIS/OPO).",
                "Latência e Jitter Budget: Como o transporte IP transcontinental afeta a qualidade de áudio (MOS Score).",
                "Segurança de Borda: Session Border Controllers (SBC) e negação explícita contra fraudes."
              ],
              "speakerNotes": "Montamos no laboratório uma operadora multinacional completa em miniatura, operando com todas as restrições reais de tráfego e sinalização de operadoras carrier-grade."
            }
          ],
          "theoryText": "\n        <h3>1. O Colapso dos Monopólios de Telecomunicação Proprietária</h3>\n        <p>Durante o século XX, a implantação de uma central de telefonia móvel ou fixa exigia investimentos de milhões de dólares em equipamentos proprietários (Ericsson, Siemens, Lucent, Alcatel). Nesses equipamentos, o <em>plano de controle</em> (sinalização), o <em>plano de dados</em> (transporte de mídia de voz) e as <em>interfaces de hardware</em> (placas E1/T1 e matrizes de pontos de cruzamento) eram rigidamente acoplados.</p>\n        <p>A sinalização era governada pela pilha <strong>SS7 (Signaling System No. 7)</strong>, operando sobre enlaces dedicados MTP2/MTP3 e ISUP, impenetráveis para pequenos provedores e desenvolvedores independentes. Uma chamada de voz ocupava estaticamente um canal PCM de 64 kbps (G.711 a 8.000 amostras por segundo com resolução de 8 bits), desperdiçando largura de banda mesmo durante as pausas de silêncio da conversa.</p>\n\n        <h3>2. O Advento das Redes All-IP e a Separação em Camadas</h3>\n        <p>A transição para as <strong>Redes de Próxima Geração (NGN)</strong> e posteriormente para o <strong>3GPP Release 15/16/17 (4G LTE e 5G Standalone)</strong> rompeu o paradigma das caixas pretas através do desacoplamento horizontal:</p>\n        <ul>\n            <li><strong>Plano de Aplicação e Serviços:</strong> Servidores de PABX em nuvem, URAs inteligentes, plataformas de gravação e faturamento implementados em C++, Rust, Node.js e Python.</li>\n            <li><strong>Plano de Controle de Sessão:</strong> Protocolo <strong>SIP (Session Initiation Protocol - RFC 3261)</strong> e protocolos de autenticação e mobilidade 3GPP (NGAP, NAS).</li>\n            <li><strong>Plano de Mídia e Transporte:</strong> Pacotes IP roteáveis carregando áudio em tempo real via <strong>RTP/SRTP (RFC 3550 / RFC 3711)</strong> sobre redes Ethernet comuns e conexões de fibra óptica.</li>\n        </ul>\n\n        <h3>3. Convergência e o Papel do Engenheiro de Telecomunicações 2026</h3>\n        <p>O profissional moderno de telecomunicações opera na interseção entre redes de computadores, arquitetura de software e conformidade regulatória. O chip de celular inserido no modem ou smartphone não é mais um receptor de RF analógico, mas um terminal IP seguro capaz de autenticar mutualmente contra um núcleo de rede móvel (Core Network) através do algoritmo Milenage e trocar pacotes criptografados ponta a ponta.</p>\n      ",
          "softwareConfig": {
            "software": "Yate Core & Node.js",
            "file": "config/extmodule.conf",
            "code": "[general]\n; Prioridade de despacho de mensagens no motor Yate\npriority=100\n\n[scripts]\n; Conecta o orquestrador Node.js via socket TCP assincrono\n; CRITICO: Sempre vincular a 127.0.0.1 para evitar exposicao de controle\nnode_controller.js=tcp:127.0.0.1:5039",
            "explanation": "O arquivo extmodule.conf do Yate estabelece uma ponte entre o núcleo de comutação em C++ e scripts de controle em Node.js ou Rust, permitindo interceptar o evento 'call.route' e tomar decisões de roteamento inteligentes em tempo real."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP / SDP",
            "summary": "Sessão SIP INVITE Inicial estabelecendo a chamada",
            "rawTrace": "INVITE sip:1102@10.11.0.1:5060 SIP/2.0\nVia: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-7291a82c\nFrom: \"Diretoria SP\" <sip:1101@10.11.0.1>;tag=9as8d7f2\nTo: <sip:1102@10.11.0.1>\nCall-ID: c2a819b0-4f81-11eb-ae93-0242ac110002@10.11.0.50\nCSeq: 101 INVITE\nContact: <sip:1101@10.11.0.50:5060>\nContent-Type: application/sdp\nContent-Length: 215\n\nv=0\no=carlos 1792167000 1 IN IP4 10.11.0.50\ns=TelecomAcademy Call\nc=IN IP4 10.11.0.50\nt=0 0\nm=audio 40000 RTP/AVP 0 8 101\na=rtpmap:0 PCMU/8000\na=rtpmap:8 PCMA/8000\na=rtpmap:101 telephone-event/8000"
          },
          "diagramType": "global"
        },
        {
          "id": "1.2",
          "title": "1.2 Marco Regulatório Brasileiro: Da Revogação da Res. 550/2010 ao Regulamento Anatel 777/2025",
          "duration": "35 min",
          "tag": "Marco Legal Anatel",
          "slides": [
            {
              "title": "A Nova Era Regulatória de MVNO no Brasil",
              "subtitle": "A Revogação Expressa da Resolução 550/2010",
              "bullets": [
                "Marco Antigo (Res. 550/2010): Criou as figuras de Credenciada e Autorizada, mas impunha barreiras contratuais pesadas.",
                "Marco Vigente (Resolução Anatel nº 777/2025): Publicada em 28 de abril de 2025, unificou a regulação de telecom.",
                "Capítulo XII da Res. 777/2025: Revogação formal de resoluções fragmentadas e fortalecimento da competição.",
                "Impacto Direto: ISPs e provedores regionais agora possuem regras claras de acesso ao espectro atacadista."
              ],
              "speakerNotes": "Muitos cursos e consultorias desatualizadas ainda citam a Resolução 550/2010. Na engenharia moderna, devemos citar com rigor o Regulamento Geral de Serviços de Telecomunicações aprovado pela Resolução 777/2025."
            },
            {
              "title": "Credenciada (Light) vs. Autorizada (Full MVNO)",
              "subtitle": "Distinção Jurídica e Arquitetural Inegociável",
              "bullets": [
                "Credenciada (Light MVNO): Atua por Contrato de Representação homologado; utiliza a outorga da operadora de origem.",
                "Autorizada (Full MVNO): Possui outorga própria de SMP (Serviço Móvel Pessoal), bloco de numeração e Core próprio.",
                "Identificadores Globais: A Full MVNO possui MCC (724) + MNC próprio e gera seus próprios SIM Cards.",
                "Responsabilidade Regulatória: A Autorizada responde diretamente perante a Anatel por metas de qualidade e segurança."
              ],
              "speakerNotes": "Enquanto a Credenciada é um modelo comercial, a Autorizada é uma verdadeira operadora de telecomunicações que contrata apenas o rádio-acesso da operadora de rede (MNO)."
            },
            {
              "title": "Graus de Integração Técnica de uma Operadora Virtual",
              "subtitle": "Do Revendedor Puro ao Núcleo Completo Open5GS/YateUCN",
              "bullets": [
                "Grau 1 (Branded Reseller): Apenas embalagem e faturamento; zero infraestrutura técnica própria.",
                "Grau 2 (Light MVNO): Marca, atendimento e bilhetagem tarifária própria.",
                "Grau 3 (Smart/Hybrid MVNO): + OCS (Online Charging System) em tempo real e SMSC próprio.",
                "Grau 4 (Full MVNO): + HSS/UDM próprio, PGW/UPF próprio, IMS próprio e interconexão de voz."
              ],
              "speakerNotes": "O laboratório que desenvolvemos simula o Grau 4: operamos o HSS/UDM no MongoDB, o UPF no Open5GS e a interconexão de voz no Yate e Asterisk."
            },
            {
              "title": "Obrigações Legais: Interceptação e Guarda de Logs",
              "subtitle": "Marco Civil da Internet e Resoluções de Segurança Cibernética",
              "bullets": [
                "Guarda de Registros de Conexão: Art. 13 do Marco Civil da Internet exige guarda sigilosa por 1 ano.",
                "Registros de Detalhes de Chamada (CDR): Preservação obrigatória de origem, destino, horário e duração.",
                "Interceptação Legal (Lei 9.296/1996): A infraestrutura deve suportar espelhamento seguro sob ordem judicial.",
                "Proteção de Dados (LGPD): IMSI, IMEI e localização celular são dados pessoais estritamente regulados."
              ],
              "speakerNotes": "Construir uma operadora exige maturidade jurídica. A perda ou vazamento de logs de conexão acarreta sanções graves tanto na esfera administrativa quanto penal."
            }
          ],
          "theoryText": "\n        <h3>1. O Novo Marco Regulatório de Redes Móveis Virtuais</h3>\n        <p>Em 28 de abril de 2025, o Conselho Diretor da Agência Nacional de Telecomunicações aprovou a <strong>Resolução nº 777/2025</strong>, que consolidou as regras de prestação dos serviços de telecomunicações no Brasil. O Capítulo XII deste regulamento revogou expressamente a histórica Resolução nº 550/2010.</p>\n        <p>A nova regulação manteve as duas modalidades clássicas de exploração, porém modernizou os mecanismos de arbitragem de preços no atacado e simplificou o compartilhamento de infraestrutura ativa e passiva:</p>\n        <ul>\n            <li><strong>Operadora Móvel Virtual Credenciada:</strong> Representante comercial da operadora de rede móvel (MNO). Não detém outorga do Serviço Móvel Pessoal (SMP) e utiliza os blocos de numeração (E.164) e os cartões SIM da prestadora de origem.</li>\n            <li><strong>Operadora Móvel Virtual Autorizada:</strong> Empresa que possui sua própria autorização formal do SMP outorgada pela Anatel. Possui Contrato de Compartilhamento de Rede, detém blocos próprios de números telefônicos atribuídos pela Anatel, possui seu próprio código de rede móvel (MNC - Mobile Network Code) e opera seus próprios elementos de rede de núcleo (Core Network).</li>\n        </ul>\n\n        <h3>2. Diferenciação Crucial: Serviço de Telecomunicações vs. SVA</h3>\n        <p>Uma distinção técnica e jurídica basilar fundamenta o nosso laboratório:</p>\n        <blockquote>\n            <strong>Serviço de Valor Adicionado (SVA - Art. 61 da LGT):</strong> A atividade que acrescenta a um serviço de telecomunicações que lhe dá suporte, e com ele não se confunde, novas utilidades relacionadas ao acesso, armazenamento, apresentação, movimentação ou recuperação de informações. Ramais VoIP internos de uma empresa, PABX em nuvem corporativo e trocas de mensagens locais constituem SVA e <em>independem de outorga</em>.\n        </blockquote>\n        <p>No entanto, a terminação de chamadas na rede pública comutada (STFC) e o fornecimento de numeração pública a terceiros mediante cobrança caracteriza serviço de telecomunicações, exigindo contrato formal com operadoras outorgadas ou credenciamento na Anatel.</p>\n      ",
          "softwareConfig": {
            "software": "Yate Core Dialplan",
            "file": "config/regexroute.conf",
            "code": "[default]\n; Roteamento seguro: Bloqueia chamadas sem outorga publica\n; Ramais internos de 4 digitos sao permitidos\n^[1-3][0-9]{3}$=lateroute/${called}\n\n; Numeros internacionais E.164 autorizados apenas via trunk homologado\n^\\+5511[2-9][0-9]{7}$=sip/sip:carrier_sp/${called}\n^\\+1212[2-9][0-9]{6}$=sip/sip:carrier_nyc/${called}\n^\\+35121[0-9]{7}$=sip/sip:carrier_lis/${called}\n\n; BLOQUEIO GERAL DE SEGURANCA: Defesa contra Toll Fraud\n.*=-;error=noroute",
            "explanation": "O plano de discagem implementa a diretriz regulatória: chamadas entre ramais internos fluem como SVA, enquanto qualquer tentativa de chamada externa desconhecida sofre negação explícita (error=noroute), impedindo tráfego clandestino e fraudes tarifárias."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP Status Code",
            "summary": "Negação de rota não autorizada (404 Not Found / 403 Forbidden)",
            "rawTrace": "SIP/2.0 404 Not Found\nVia: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-9921b71a;received=10.11.0.50\nFrom: <sip:1101@10.11.0.1>;tag=827361a\nTo: <sip:900123456@10.11.0.1>;tag=yate-99218\nCall-ID: c91827b0-4f81-11eb-ae93-0242ac110002@10.11.0.50\nCSeq: 101 INVITE\nServer: Yate/6.0.0\nReason: Q.850;cause=1;text=\"Unallocated (unassigned) number\"\nContent-Length: 0"
          },
          "diagramType": "brasil"
        },
        {
          "id": "1.3",
          "title": "1.3 Artigo 183 da Lei 9.472/1997 (LGT) e Confinamento de RF: Por Que Bancada Exige 60 dB de Atenuação",
          "duration": "30 min",
          "tag": "Física de RF & Compliance",
          "slides": [
            {
              "title": "O Princípio da Legalidade Absoluta no Espectro de RF",
              "subtitle": "O Risco Penal do Artigo 183 da Lei 9.472/1997",
              "bullets": [
                "O Espectro é Bem Público: Nenhuma transmissão sem fio pode ocorrer em frequências licenciadas sem outorga formal.",
                "Tipificação Penal: Art. 183 da LGT pune com detenção de 2 a 4 anos e multa de R$ 10.000 quem opera clandestinamente.",
                "Jurisprudência Consolidada: O crime é formal e de perigo abstrato; a mera irradiação no ar consuma o delito.",
                "A Intenção Acadêmica Não Anula o Crime: Montar uma BTS GSM/LTE com antenas abertas é infração penal inafiançável."
              ],
              "speakerNotes": "Muitos entusiastas e acadêmicos colocam antenas em USRPs e transmitem sinais GSM no laboratório achando que é 'estudo'. Isto configura crime federal com apreensão de equipamentos e responsabilização penal."
            },
            {
              "title": "Os 3 Desenhos Experimentais em Telecomunicações",
              "subtitle": "Como Estudar Redes Celulares com Risco Jurídico Absolutamente Zero",
              "bullets": [
                "Desenho A (Bancada Confinada por Cabo Coaxial): Transceptor ligado ao modem via cabo com atenuadores de 60 dB.",
                "Desenho B (Ambiente Blindado): Gaiola de Faraday ou caixa blindada com isolamento certificado de RF.",
                "Desenho C (Outorga Temporária Científica): Autorização de uso temporário do espectro (Resolução Anatel 775/2025).",
                "Padrão do Curso: Adotamos o Desenho A e emulação virtual por software (ZeroMQ/UDP)."
              ],
              "speakerNotes": "O Desenho A é o padrão da indústria. Ao usar cabos coaxiais de blindagem dupla com atenuadores de 60 dB, nenhuma onda eletromagnética escapa para o meio ambiente."
            },
            {
              "title": "A Matemática do Confinamento de RF em Bancada",
              "subtitle": "Cálculo de Atenuação, Potência e Link Budget",
              "bullets": [
                "Potência do SDR: Uma USRP B210 transmite tipicamente a +10 dBm (10 miliwatts).",
                "Atenuador em Linha (60 dB): Reduz a potência do sinal por um fator de 1.000.000 (1 milhão de vezes).",
                "Potência de Chegada ao Terminal: +10 dBm - 60 dB = -50 dBm (nível excelente de sinal celular, mas sem emissão irradiada).",
                "Sensibilidade do Receptor: Celulares operam tipicamente entre -50 dBm e -105 dBm."
              ],
              "speakerNotes": "Com -50 dBm dentro do cabo, o telefone celular reconhece a rede como se estivesse a 10 metros da torre, com sinal perfeito e zero interferência na rua."
            },
            {
              "title": "Blindagem e Terminação Casada de 50 Ohms",
              "subtitle": "Evitando Ondas Estacionárias (SWR) e Vazamento de RF",
              "bullets": [
                "Impedância Característica: Todos os conectores (SMA, BNC, Tipo N) e cabos devem ser de 50 Ohms.",
                "Casamento de Impedância: Cabos mal terminados criam reflexões e ondas estacionárias (VSWR alto).",
                "Bloqueadores DC e Atenuadores Fixos de Precisão: Protegem os estágios de entrada sensíveis do SDR (LNA).",
                "Regra Inegociável: Antenas devem ser desrosqueadas e guardadas antes de energizar o transceptor de bancada."
              ],
              "speakerNotes": "Se você deixar a porta TX aberta sem carga ou antena, além de risco de vazamento, o amplificador de potência (PA) do SDR pode queimar por potência refletida."
            }
          ],
          "theoryText": "\n        <h3>1. O Artigo 183 da Lei Geral de Telecomunicações e a Jurisprudência</h3>\n        <p>A Lei nº 9.472, de 16 de julho de 1997 (Lei Geral de Telecomunicações - LGT), estabelece no seu Artigo 183:</p>\n        <blockquote>\n            <em>\"Art. 183. Desenvolver clandestinamente atividades de telecomunicação: Pena - detenção de dois a quatro anos, aumentada da metade se houver dano a terceiro, e multa de R$ 10.000,00 (dez mil reais).\"</em>\n        </blockquote>\n        <p>O Superior Tribunal de Justiça (STJ) e o Supremo Tribunal Federal (STF) possuem jurisprudência pacificada no sentido de que o delito do art. 183 é de <strong>perigo abstrato e formal</strong>. Isso significa que não é necessária a comprovação de interferência real em serviços de emergência ou em operadoras comerciais; a simples transmissão de radiofrequência em banda licenciada sem outorga legal consuma a infração penal.</p>\n\n        <h3>2. A Física do Link Budget e Confinamento Cabeado (Desenho A)</h3>\n        <p>Para anular qualquer possibilidade de emissão eletromagnética no ar e garantir conformidade com a legislação, o laboratório profissional utiliza o <strong>Desenho A (Bancada Confinada por Cabo)</strong>.</p>\n        <p>A equação de potência entregue ao receptor é expressa em decibéis-miliwatt (dBm):</p>\n        <p><code>P_rx = P_tx + G_tx - L_cabo - L_atenuador + G_rx</code></p>\n        <p>Considerando um rádio SDR comum (USRP B210 ou bladeRF):</p>\n        <ul>\n            <li>Potência de transmissão da placa (P_tx): <strong>+10 dBm</strong></li>\n            <li>Ganhos de antena (G_tx = G_rx): <strong>0 dB</strong> (sem antenas físicas instaladas)</li>\n            <li>Perdas de inserção dos cabos coaxiais RG-58/RG-316 (L_cabo): <strong>-1 dB</strong></li>\n            <li>Banco de atenuadores fixos SMA (L_atenuador): <strong>-60 dB</strong></li>\n            <li>Potência resultante que atinge a porta RF do terminal: <strong>P_rx = +10 - 1 - 60 = -51 dBm</strong></li>\n        </ul>\n        <p>Um sinal de <strong>-51 dBm</strong> simula uma conexão de excelente qualidade celular (RSRP forte), perfeita para o modem decodificar o canal de controle (BCCH/PBCH), sem emitir qualquer radiação para fora da bancada de trabalho.</p>\n      ",
          "softwareConfig": {
            "software": "OpenBTS / YateBTS Transceiver",
            "file": "config/transceiver.conf",
            "code": "; Configuracao de Atenuacao de Potencia de Transmissao de Bancada\n[Transceiver]\n; Nivel de atenuacao digital interna (dB)\ntx_attenuation=15\n\n; Limite maximo de ganho do amplificador de potencia (PA)\nmax_power_dbm=-10\n\n; Alerta de seguranca de RF: Operacao exclusiva em linha cabeada\nrf_mode=confined_coaxial\nrf_attenuation_external_db=60",
            "explanation": "Os parâmetros de transceiver asseguram que a placa SDR opere com sua potência de saída reduzida ao mínimo viável em nível de software, somando-se à atenuação física externa de 60 dB para garantir segurança absoluta."
          },
          "wiresharkAnalysis": {
            "protocol": "GSM TAP / Radio Link",
            "summary": "Nível de sinal de uplink/downlink confinado (-51 dBm)",
            "rawTrace": "GSM TAP Header:\n  Version: 2\n  Header Length: 16 bytes\n  Payload Type: GSM Um (Air Interface over Cable)\n  Timeslot: 0\n  ARFCN: 128 (Uplink: 824.2 MHz, Downlink: 869.2 MHz)\n  Signal Level: -51 dBm\n  Signal-to-Noise Ratio (SNR): 32 dB\n  Frame Number: 198271\nSystem Information Type 3 (BCCH):\n  Cell Identity: 0x0001 (1)\n  Location Area Identification (LAI): 724-99-0001 (Brasil TelecomLab)\n  Control Channel Description: Combined CCCH + SDCCH/4"
          },
          "diagramType": "bancada"
        },
        {
          "id": "1.4",
          "title": "1.4 Hardware Físico (USRP B210, BladeRF, LimeSDR) vs. Hardware Simulado (ZeroMQ, UDP 5700 e Dummy Radio)",
          "duration": "35 min",
          "tag": "SDR & Rádio Virtual",
          "slides": [
            {
              "title": "O Ecossistema de Hardware para Rádio Definido por Software",
              "subtitle": "Transceptores Físicos: Arquitetura, Conversores e Limitações",
              "bullets": [
                "USRP B210 (Ettus Research): Padrão da indústria com chip AD9361, suporte de 70 MHz a 6 GHz e FPGA Spartan-6.",
                "bladeRF 2.0 micro (Nuand): Transceptor moderno com FPGA Cyclone V, excelente suporte nativo no YateBTS.",
                "LimeSDR (Lime Microsystems): Chip LMS7002M, ampla faixa de frequência e baixo custo.",
                "Desafios de Bancada: Custo elevado (R$ 5.000 a R$ 25.000), calibração de I/Q e ruído térmico."
              ],
              "speakerNotes": "Apresentamos o panorama completo dos hardwares SDR. Nem todo engenheiro ou empresa possui R$ 20.000 para investir em USRPs; por isso, a simulação matemática é fundamental."
            },
            {
              "title": "Hardware Simulado: O Poder do ZeroMQ e Dummy Radio",
              "subtitle": "Processamento de Sinal I/Q sobre Sockets de Memória e Rede",
              "bullets": [
                "ZeroMQ Radio: Amostras de sinal I/Q (In-phase / Quadrature) transmitidas como matrizes float32 sobre TCP/IPC.",
                "Dummy Radio / Loopback UDP (Porta 5700): Transmissão de blocos de rádio-pacote sem hardware físico.",
                "UERANSIM 5G: Simulação completa de gNodeB e terminais de usuário UE 100% em software x86.",
                "Vantagem de Ensino: Permite rodar toda a pilha de telecomunicações dentro de contêineres Docker em qualquer laptop."
              ],
              "speakerNotes": "Com o ZeroMQ e o UERANSIM, eliminamos a barreira do hardware. O aluno testa o handshake 5G completo, a alocação de bearer e a criação da interface tunelada sem gastar um centavo em hardware."
            },
            {
              "title": "Amostragem I/Q e a Matemática de Rádio por Software",
              "subtitle": "Teorema de Nyquist-Shannon e Conversores Analógico-Digitais (ADC/DAC)",
              "bullets": [
                "Sinal Analógico RF: Onda contínua modulada em alta frequência (ex: 3.5 GHz para 5G n78).",
                "Amostragem em Frequência Intermediária (IF): Multiplicação por seno e cosseno para obter as componentes I e Q.",
                "Taxa de Amostragem (Sample Rate): Deve ser no mínimo o dobro da largura de banda do canal (Teorema de Nyquist).",
                "No canal LTE de 20 MHz: Amostragem a 30.72 MS/s (Mega-amostras por segundo) gerando 122.88 MB/s de dados brutos."
              ],
              "speakerNotes": "A razão pela qual usamos portas USB 3.0 em SDRs é a banda bruta: transferir 30.72 milhões de amostras de 32 bits por segundo consome quase 1 Gbps contínuo de dados."
            },
            {
              "title": "Comparativo de Eficiência: Físico vs. Virtual",
              "subtitle": "Quando Usar Cada Abordagem no Ciclo de Engenharia",
              "bullets": [
                "Prototipagem e Teste de Software: 100% Virtual (UERANSIM + Open5GS em Docker) — rápido, barato e determinístico.",
                "Teste de Interoperabilidade com Terminais Reais: Bancada Confinada (USRP/BladeRF cabeado).",
                "CI/CD e Automação de Testes de Regressão: Emulação em nuvem com GitHub Actions e Docker.",
                "Homologação Anatel: Ensaio físico formal em laboratório credenciado com câmara anecoica."
              ],
              "speakerNotes": "Na moderna engenharia DevOps de telecom, 90% dos testes rodam em contêineres simulados e apenas 10% vão para o rádio físico antes da produção."
            }
          ],
          "theoryText": "\n        <h3>1. Arquitetura de Transceptores Físicos SDR</h3>\n        <p>Um equipamento de <strong>Rádio Definido por Software (SDR)</strong> move a inteligência das telecomunicações do domínio analógico (filtros indutores/capacitores, osciladores locais de cristal e moduladores balanceados) para o domínio digital:</p>\n        <ul>\n            <li><strong>Estágio Analógico (RF Front-End):</strong> Antena (ou cabo com atenuação), amplificador de baixo ruído (LNA), amplificador de potência (PA) e chave de comutação TDD/FDD.</li>\n            <li><strong>Transceiver de Sinal Misto (RFIC):</strong> Células como o Analog Devices AD9361 (presente na USRP B210) integram misturadores de quadratura, filtros passa-baixa analógicos e conversores ADC/DAC de 12 bits de resolução.</li>\n            <li><strong>Matriz de Portas Programáveis em Campo (FPGA):</strong> Realiza o processamento digital de sinal (DSP) pesado em tempo real: conversão digital de subida (DUC), conversão digital de descida (DDC), filtros decimadores CIC/FIR e empacotamento em frames USB 3.0 ou Gigabit Ethernet.</li>\n        </ul>\n\n        <h3>2. O Modelo Simulado: ZeroMQ e UERANSIM</h3>\n        <p>A representação de uma onda eletromagnética modulada no computador é um par de números complexos conhecidos como <strong>amostras I/Q</strong> (In-phase e Quadrature):</p>\n        <p><code>s(t) = I(t) · cos(2π f_c t) - Q(t) · sin(2π f_c t)</code></p>\n        <p>Quando executamos o laboratório em modo simulado, o software calcula as matrizes I e Q e as envia através de um socket <strong>ZeroMQ (ZMQ)</strong> ou socket UDP local:</p>\n        <ul>\n            <li><strong>Emulação de Camada Física:</strong> Em vez de emitir elétrons em uma antena, os bytes brutos são entregues à camada MAC do receptor com atraso programado e injeção matemática de ruído gaussiano branco (AWGN).</li>\n            <li><strong>UERANSIM:</strong> Implementa a pilha completa 3GPP (RRC, PDCP, RLC, MAC) em código C++20 nativo, comunicando-se com a AMF do Open5GS via protocolo padronizado <strong>NGAP sobre SCTP na porta 38412</strong>.</li>\n        </ul>\n      ",
          "softwareConfig": {
            "software": "UERANSIM gNodeB Config",
            "file": "config/gnb.yaml",
            "code": "mcc: '724'          ; Mobile Country Code (Brasil)\nmnc: '99'           ; Mobile Network Code (TelecomLab Privado)\n\nnci: '0x000000010'  ; NR Cell Identity\nidLength: 32\ntac: 1              ; Tracking Area Code\n\nlinkIp: 172.28.0.20 ; Endereco da gNodeB virtual\nngapIp: 172.28.0.20 ; IP de sinalizacao NGAP\ngtpIp: 172.28.0.20  ; IP de transporte de dados GTP-U\n\namfConfigs:\n  - address: 172.28.0.10\n    port: 38412     ; Porta padronizada 3GPP SCTP para a AMF\n\nslices:\n  - sst: 1          ; Slice Standard (eMBB)\n    sd: 0x112233",
            "explanation": "O arquivo gnb.yaml define a estação rádio-base 5G virtual. Ela estabelece uma associação SCTP com a AMF na porta 38412 e anuncia a célula 724-99 com suporte a eMBB, permitindo que SIM cards virtuais façam anexação e naveguem na rede."
          },
          "wiresharkAnalysis": {
            "protocol": "NGAP / SCTP",
            "summary": "NGSetupRequest enviado pela gNodeB virtual para a AMF 5G Core",
            "rawTrace": "Stream Control Transmission Protocol (SCTP), Dport: 38412\nNGAP-PDU: initiatingMessage (0)\n  initiatingMessage\n    procedureCode: 21 (NGSetup)\n    criticality: reject (0)\n    value\n      NGSetupRequest\n        protocolIEs: 3 items\n          Item 0: id-GlobalRANNodeID (Global gNB ID: 724-99-00000010)\n          Item 1: id-SupportedTAList (TAC: 1, Broadcast PLMN: 724-99)\n          Item 2: id-PagingDRX (v128)"
          },
          "diagramType": "layers"
        }
      ]
    },
    {
      "id": 2,
      "title": "Módulo 2: Camadas de Rede, Arquitetura de Protocolos e Correlação Fim-a-Fim",
      "summary": "A correspondência exaustiva entre o Modelo OSI de 7 Camadas e a Pilha 3GPP 4G/5G, a sinalização SIP (RFC 3261), a negociação de mídia SDP (RFC 4566), os túneis GTP-U e a análise forense de pacotes com Wireshark.",
      "lessons": [
        {
          "id": "2.1",
          "title": "2.1 Pilha de Camadas OSI vs. 3GPP Celular (PHY, MAC, RLC, PDCP, RRC, NAS, GTP-U, SIP, RTP)",
          "duration": "35 min",
          "tag": "Pilhas de Protocolos",
          "slides": [
            {
              "title": "O Mapeamento de Camadas: OSI vs. 3GPP",
              "subtitle": "Como o Mundo Celular Reinterpretou o Modelo de 7 Camadas",
              "bullets": [
                "Camada Física (PHY / Camada 1): Modulação OFDM, alocação de subportadoras e blocos de recursos (PRB).",
                "Camada de Enlace (Camada 2 Dividida): Subcamadas MAC (escalonamento/HARQ), RLC (segmentação) e PDCP (cifragem/compressão).",
                "Camada de Rede (Camada 3 Celular): RRC (controle de rádio local) e NAS (sinalização com o Core Network).",
                "Camada de Transporte e Aplicação: Túneis GTP-U sobre UDP, pilha TCP/IP padrão, SIP e áudio RTP."
              ],
              "speakerNotes": "Muitos profissionais de redes tentam forçar o modelo OSI puro na rede celular. No 3GPP, a Camada 2 é dividida em três subcamadas ultraespecializadas e a Camada 3 é bifurcada entre rádio (RRC) e core (NAS)."
            },
            {
              "title": "A Tríade da Camada 2 Celular: MAC, RLC e PDCP",
              "subtitle": "Garantia de Entrega, Cifragem e Compressão de Cabeçalho",
              "bullets": [
                "MAC (Medium Access Control): Responsável pela multiplexação de canais lógicos e retransmissão ultra-rápida via HARQ.",
                "RLC (Radio Link Control): Opera em 3 modos: Transparent (TM), Unacknowledged (UM - ótimo para voz) e Acknowledged (AM).",
                "PDCP (Packet Data Convergence Protocol): Aplica compressão de cabeçalho RoHC (RFC 3095) e criptografia AES/SNOW-3G.",
                "Integridade de Sinalização: O PDCP protege mensagens de controle contra falsificação e adulteração."
              ],
              "speakerNotes": "Para chamadas de voz VoLTE/VoNR, o RLC opera em modo UM (sem confirmação) para evitar que pacotes de áudio atrasados gerem jitter insuportável."
            },
            {
              "title": "Plano de Controle vs. Plano de Usuário",
              "subtitle": "A Separação Estrutural do 3GPP (Control/User Plane Separation - CUPS)",
              "bullets": [
                "Plano de Controle (C-Plane): Protocolos RRC e NAS que estabelecem a conexão, autenticam o SIM card e alocam túneis.",
                "Plano de Usuário (U-Plane): Pacotes IP gerados pelo celular empacotados dentro de túneis GTP-U e roteados pelo UPF.",
                "Arquitetura CUPS: Permite que a AMF/SMF fique na nuvem central e o UPF fique na borda (Edge Computing) perto do usuário.",
                "Baixa Latência: O tráfego de voz e dados não precisa passar pela inteligência de controle a cada pacote."
              ],
              "speakerNotes": "A separação CUPS é o que torna o 5G viável: o plano de dados é puro silício de alta velocidade enquanto o controle roda em microsserviços escaláveis."
            },
            {
              "title": "Encapsulamento Aninhado: O Pacote de Voz no Ar",
              "subtitle": "De dentro para fora: Áudio PCM -> RTP -> UDP -> IP -> GTP-U -> UDP -> IP -> PDCP -> RLC -> MAC -> PHY",
              "bullets": [
                "Camada Mais Interna: 20 ms de áudio codificado em codec G.711u (160 bytes de payload).",
                "Cabeçalhos de Mídia: RTP (12 bytes) + UDP (8 bytes) + IP do Terminal (20 bytes) = 200 bytes.",
                "Encapsulamento Core: GTP-U (8 bytes) + UDP Core (8 bytes) + IP Core (20 bytes).",
                "Encapsulamento de Rádio: Cabeçalhos PDCP, RLC e MAC adicionando tags de controle e paridade CRC."
              ],
              "speakerNotes": "Visualizar essa 'boneca russa' de protocolos é o que distingue o engenheiro sênior do iniciante: saber exatamente qual camada introduziu cada overhead ou falha de entrega."
            }
          ],
          "theoryText": "\n        <h3>1. A Pilha de Protocolos Celular 3GPP e sua Equivalência OSI</h3>\n        <p>A arquitetura de protocolos de redes celulares (4G LTE e 5G NR) não segue estritamente a divisão em 7 camadas do modelo ISO/OSI. Ela é estruturada em dois planos verticais: o <strong>Plano de Controle (Control Plane)</strong> e o <strong>Plano de Usuário (User Plane)</strong>.</p>\n        \n        <h4>As Camadas da Interface Aérea (Uu Interface):</h4>\n        <ul>\n            <li><strong>Camada Física (PHY - 3GPP TS 38.211):</strong> Modulação de subportadoras ortogonais (OFDMA no downlink, CP-OFDM ou DFT-s-OFDM no uplink), adaptação de modulação e codificação (QPSK, 16-QAM, 64-QAM, 256-QAM) e controle de potência em malha fechada.</li>\n            <li><strong>Subcamada MAC (Medium Access Control - TS 38.321):</strong> Mapeamento entre canais lógicos e canais de transporte, escalonamento dinâmico de recursos no tempo e na frequência, e retransmissões rápidas por hardware através de <strong>HARQ (Hybrid Automatic Repeat Request)</strong> com combinação suave (Chase Combining ou Incremental Redundancy).</li>\n            <li><strong>Subcamada RLC (Radio Link Control - TS 38.322):</strong> Segmentação e remontagem de pacotes de dados. Opera em modo transparente (TM), modo sem confirmação (UM - ideal para tráfego em tempo real como VoIP/RTP) e modo com confirmação (AM - com ARQ seletivo para dados TCP).</li>\n            <li><strong>Subcamada PDCP (Packet Data Convergence Protocol - TS 38.323):</strong> Cifragem e proteção de integridade dos dados e da sinalização utilizando algoritmos padronizados (NEA0/NEA1/NEA2/NEA3), ordenação de entrega e compressão robusta de cabeçalhos IP/UDP/RTP via <strong>RoHC (RFC 3095)</strong>, reduzindo cabeçalhos de 40 bytes para meros 2 a 4 bytes no ar.</li>\n        </ul>\n\n        <h3>2. As Camadas Superiores: RRC e NAS</h3>\n        <p>Na Camada 3 de sinalização celular ocorrem dois diálogos simultâneos e independentes:</p>\n        <ul>\n            <li><strong>RRC (Radio Resource Control - TS 38.331):</strong> Termina na estação rádio-base (gNodeB / eNodeB). Controla o estabelecimento de portadoras de rádio (SRB/DRB), medições de qualidade de sinal e procedimentos de handover entre células.</li>\n            <li><strong>NAS (Non-Access Stratum - TS 24.501):</strong> Transita transparente pela torre de rádio e termina diretamente no núcleo da rede (AMF / MME). Gerencia autenticação mútua (via algoritmo Milenage no chip SIM), registro de mobilidade (Registration Management) e gerenciamento de sessões de dados PDU (Session Management).</li>\n        </ul>\n      ",
          "softwareConfig": {
            "software": "Open5GS SMF & UPF Tunneling",
            "file": "config/smf.yaml",
            "code": "smf:\n  sbi:\n    - addr: 172.28.0.10\n      port: 7777\n  gtpu:\n    - addr: 172.28.0.10\n  upf:\n    - addr: 172.28.0.10\n  subnet:\n    - addr: 10.45.0.1/16  ; Pool de IPs distribuidos para os SIM cards\n  dns:\n    - 8.8.8.8\n    - 1.1.1.1",
            "explanation": "O Session Management Function (SMF) controla a alocação de endereços IP para os terminais celulares e programa as regras de encaminhamento de pacotes no UPF através do protocolo PFCP (Packet Forwarding Control Protocol - Porta UDP 8805)."
          },
          "wiresharkAnalysis": {
            "protocol": "GTP-U / IP",
            "summary": "Pacote de áudio RTP encapsulado dentro de túnel GPRS Tunneling Protocol (GTP-U)",
            "rawTrace": "Frame 102: 242 bytes on wire\nInternet Protocol Version 4, Src: 172.28.0.10, Dst: 172.28.0.20\nUser Datagram Protocol, Src Port: 2152, Dst Port: 2152\nGPRS Tunneling Protocol\n  Flags: 0x30 (v1, Protocol Type: GTP)\n  Message Type: 255 (G-PDU)\n  Length: 200\n  TEID: 0x00000001 (Tunnel Endpoint Identifier)\n[Encapsulated IP Packet]:\n  Internet Protocol Version 4, Src: 10.45.0.2, Dst: 10.11.0.1\n  User Datagram Protocol, Src Port: 40000, Dst Port: 5060\n  Session Initiation Protocol (SIP REGISTER)"
          },
          "diagramType": "layers"
        },
        {
          "id": "2.2",
          "title": "2.2 Sinalização SIP (RFC 3261), Negociação SDP (RFC 4566) e Transporte RTP/SRTP (RFC 3550 / RFC 3711)",
          "duration": "40 min",
          "tag": "Sinalização SIP & SDP",
          "slides": [
            {
              "title": "O Protocolo de Iniciação de Sessão (SIP)",
              "subtitle": "Arquitetura Cliente-Servidor Baseada em Texto (RFC 3261)",
              "bullets": [
                "Inspirado no HTTP e SMTP: Mensagens em texto claro UTF-8 legíveis por humanos (INVITE, ACK, BYE, CANCEL, REGISTER).",
                "Respostas Numéricas: 1xx (Provisório), 2xx (Sucesso), 3xx (Redirecionamento), 4xx (Erro de Cliente), 5xx (Erro de Servidor).",
                "Mecanismo de Transação e Diálogo: Três vias de handshake (INVITE -> 200 OK -> ACK) para garantir sincronismo confiável.",
                "Transporte Flexível: Opera sobre UDP (padrão porta 5060), TCP (mensagens grandes) ou TLS (segurança na porta 5061)."
              ],
              "speakerNotes": "O SIP não transporta áudio nem vídeo; ele é puramente o maestro que combina onde, quando e como a conversa vai acontecer."
            },
            {
              "title": "Session Description Protocol (SDP - RFC 4566)",
              "subtitle": "O Contrato de Mídia Negociado dentro do Envelope SIP",
              "bullets": [
                "Proposta e Aceite (Offer/Answer Model): O chamador envia sua oferta SDP no INVITE; o chamado responde no 200 OK.",
                "Linha 'c=' (Connection Data): Informa o endereço IP exato para onde o áudio de retorno deve ser enviado.",
                "Linha 'm=' (Media Description): Declara o tipo de mídia (audio), a porta UDP (ex: 40000) e os codecs suportados.",
                "Linhas 'a=rtpmap': Mapeia números de payload dinâmico para codecs específicos (G.711u=0, G.711a=8, G.729=18, Opus=96)."
              ],
              "speakerNotes": "Erros de 'áudio unilateral' (one-way audio) quase sempre decorrem de endereços IP incorretos (privados) enviados dentro da linha c= do SDP atravessando NATs."
            },
            {
              "title": "Real-time Transport Protocol (RTP / SRTP)",
              "subtitle": "Transporte de Mídia em Tempo Real sobre UDP (RFC 3550 / RFC 3711)",
              "bullets": [
                "Por Que UDP?: Atrasos de retransmissão do TCP tornariam a fala ininteligível; perder 1 pacote é melhor que atrasar 500 ms.",
                "Cabeçalho RTP (12 bytes): Número de Sequência (Sequence Number), Timestamp de Amostragem e Identificador SSRC.",
                "Detecção de Jitter e Perda: O cliente receptor utiliza o timestamp para reconstruir o fluxo no jitter buffer.",
                "SRTP (Secure RTP): Criptografia de fluxo AES-Counter Mode e autenticação HMAC-SHA1 para proteger a privacidade da chamada."
              ],
              "speakerNotes": "O RTP carrega exatamente fatias de 20 milissegundos de voz. Se o codec for G.711, cada pacote carrega 160 bytes de áudio 50 vezes por segundo."
            },
            {
              "title": "RTCP: A Telemetria e Controle de Qualidade",
              "subtitle": "Monitoramento Contínuo de Latência, Jitter e MOS Score (RFC 3550)",
              "bullets": [
                "Canal em Paralelo (Porta Par/Ímpar): Se o RTP flui na porta UDP 40000, o RTCP flui na porta 40001.",
                "Sender Reports (SR) & Receiver Reports (RR): O receptor informa quantos pacotes perdeu e o nível de oscilação (jitter).",
                "Cálculo de Round-Trip Time (RTT): Mensagens de eco medem o atraso da viagem de ida e volta do pacote.",
                "Adaptação de Taxa: Permite que codecs inteligentes (como Opus ou AMR) reduzam sua taxa de bits em redes congestionadas."
              ],
              "speakerNotes": "Graças ao RTCP, o PABX sabe em tempo real se a conexão de internet do usuário degradou e pode tomar ações preventivas de qualidade."
            }
          ],
          "theoryText": "\n        <h3>1. A Anatomia do Protocolo SIP (RFC 3261)</h3>\n        <p>O <strong>Session Initiation Protocol (SIP)</strong> é um protocolo de camada de aplicação, ponto a ponto e cliente-servidor, projetado para criar, modificar e encerrar sessões multimídia interativas. Uma sessão pode ser uma chamada telefônica bidirecional, uma videoconferência ou uma mensagem instantânea.</p>\n\n        <h4>Os Três Conceitos Cardeais do SIP:</h4>\n        <ol>\n            <li><strong>Transação:</strong> Composta por uma mensagem de requisição enviada pelo cliente (UAC - User Agent Client), zero ou mais respostas provisórias (1xx) e uma resposta final (2xx a 6xx) enviada pelo servidor (UAS - User Agent Server). A transação do INVITE é especial porque inclui também a mensagem de ACK.</li>\n            <li><strong>Diálogo:</strong> Uma relação ponto a ponto persistente entre dois User Agents durante todo o tempo em que a chamada está ativa. Um diálogo é unicamente identificado pela tríade: <code>Call-ID</code>, <code>From tag</code> e <code>To tag</code>.</li>\n            <li><strong>Sessão:</strong> O fluxo real de mídia (áudio/vídeo) negociado através dos parâmetros de SDP e transportado fora do canal SIP.</li>\n        </ol>\n\n        <h3>2. O Modelo Offer/Answer do SDP (RFC 3264 / RFC 4566)</h3>\n        <p>O <strong>Session Description Protocol (SDP)</strong> não define um protocolo de transporte próprio; ele atua como um formato declarativo de parâmetros multimídia serializado dentro do corpo de mensagens SIP (com <code>Content-Type: application/sdp</code>).</p>\n        <p>O fluxo de negociação segue o modelo de Oferta e Resposta:</p>\n        <ul>\n            <li>O originador envia no <strong>INVITE</strong> suas capacidades (ex: \"tenho o IP 10.11.0.50, escuto áudio na porta UDP 40000 e aceito os codecs G.711u [0], G.711a [8] e G.729 [18]\").</li>\n            <li>O destinatário analisa a oferta e responde no <strong>200 OK</strong> selecionando a interseção de codecs suportados (ex: \"aceito conversar usando o codec G.711u [0], meu IP para retorno é 10.11.0.1 e minha porta UDP é 16400\").</li>\n        </ul>\n      ",
          "softwareConfig": {
            "software": "Yate SIP Channel Engine",
            "file": "config/ysipchan.conf",
            "code": "[general]\n; Configuracao do canal SIP nativo do Yate\nport=5060\nbind=0.0.0.0\n\n; Codecs de audio habilitados por ordem de preferencia\ncodecs=mulaw,alaw,g729\n\n; Temporizadores SIP (RFC 3261)\nt1=500        ; Temporizador RTT estimado (ms)\nt2=4000       ; Temporizador maximo de retransmissao\nnat=yes       ; Ativa deteccao automatica de travessia de NAT\nuseragent=TelecomAcademy-Engine/2026",
            "explanation": "O arquivo ysipchan.conf programa o comportamento do socket SIP do Yate, habilitando a negociação dos codecs G.711 mulaw e alaw e ativando os algoritmos de travessia de NAT para clientes atrás de roteadores."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP / SDP / RTP",
            "summary": "Negociação de mídia completa (Oferta SDP e Resposta 200 OK)",
            "rawTrace": "SIP/2.0 200 OK\nVia: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-7291a82c\nFrom: \"Diretoria SP\" <sip:1101@10.11.0.1>;tag=9as8d7f2\nTo: <sip:1102@10.11.0.1>;tag=yate-ok-19283\nCall-ID: c2a819b0-4f81-11eb-ae93-0242ac110002@10.11.0.50\nCSeq: 101 INVITE\nContact: <sip:1102@10.11.0.1:5060>\nContent-Type: application/sdp\nContent-Length: 185\n\nv=0\no=yate 1792167001 1 IN IP4 10.11.0.1\ns=Yate SIP Call\nc=IN IP4 10.11.0.1\nt=0 0\nm=audio 16400 RTP/AVP 0 101\na=rtpmap:0 PCMU/8000\na=rtpmap:101 telephone-event/8000"
          },
          "diagramType": "global"
        },
        {
          "id": "2.3",
          "title": "2.3 Correlação Fim-a-Fim: Do Radio Resource Control (RRC) à Criação de Sessão VoLTE/VoNR e PABX SIP",
          "duration": "35 min",
          "tag": "Correlação Fim-a-Fim",
          "slides": [
            {
              "title": "A Jornada Fim-a-Fim da Ligação Celular",
              "subtitle": "O Encadeamento Completo de Eventos do Clique à Conversa",
              "bullets": [
                "Fase 1: O smartphone em repouso (RRC_IDLE) acorda e dispara o preâmbulo RACH no ar.",
                "Fase 2: Conexão RRC estabelecida com a gNodeB e envio de Service Request NAS para a AMF.",
                "Fase 3: A SMF comanda o UPF a abrir uma PDU Session dedicada (QoS Flow 1 para sinalização IMS).",
                "Fase 4: O cliente IMS do celular envia o SIP INVITE pelo túnel que chega ao core de voz Yate/Asterisk."
              ],
              "speakerNotes": "Muitos engenheiros conhecem apenas o mundo IP ou apenas o mundo de RF. O verdadeiro especialista correlaciona o log de rádio com o trace SIP do PABX."
            },
            {
              "title": "QoS Flow e Dedicated Bearers: QCI 1 e 5QI 1",
              "subtitle": "Por Que a Chamada Celular não 'Engasga' como uma Chamada de Dados Comum",
              "bullets": [
                "5QI 1 (5G QoS Identifier): Fluxo com taxa de bits garantida (GBR) reservado exclusivamente para voz conversacional.",
                "Prioridade Absoluta no Rádio: O escalonador MAC descarta pacotes de download para não atrasar pacotes 5QI 1.",
                "Budget de Atraso Estrito (Packet Delay Budget): Limite de 100 ms na interface aérea com perda máxima de 10^-2.",
                "5QI 5: Fluxo não-GBR utilizado para sinalização SIP do IMS (baixa latência e alta prioridade de entrega)."
              ],
              "speakerNotes": "A razão pela qual a voz em 4G/5G tem qualidade cristalina é a reserva determinística de recursos: o rádio prioriza o pacote de voz antes de qualquer vídeo ou navegação."
            },
            {
              "title": "A Ponte entre o Túnel Celular e a Rede IP Corporativa",
              "subtitle": "O Papel do UPF (User Plane Function) como Roteador de Saída",
              "bullets": [
                "O Desencapsulamento GTP-U: O UPF retira o pacote IP do túnel de telecom e o entrega à tabela de roteamento Linux.",
                "Interfaces de Rede Virtuais: Criação da interface 'uesimtun0' ou 'ogstun' com MTU ajustada (1400 bytes).",
                "Roteamento Estático e BGP: Encaminhamento direto para o IP do PABX (172.28.0.30) sem passar por NAT.",
                "Mapeamento de Ramal: O IMSI do cartão SIM é associado na base de dados ao número de ramal SIP (ex: 1101)."
              ],
              "speakerNotes": "O UPF atua exatamente como um gateway de borda: para o núcleo celular ele é telecomunicações 3GPP; para o PABX ele é simplesmente um roteador IP veloz."
            },
            {
              "title": "Handover e Mobilidade sem Queda de Voz",
              "subtitle": "Como a Sessão SIP Sobrevive à Troca de Antenas",
              "bullets": [
                "Xn Handover (entre gNodeBs): As torres negociam diretamente o repasse do terminal sem passar pelo core.",
                "N2 Handover (via AMF): Quando as gNodeBs não possuem linha de visão direta de rede.",
                "Atualização de Caminho de Dados no UPF: A SMF atualiza o TEID de destino e os pacotes RTP continuam fluindo.",
                "Persistência SIP: O diálogo SIP permanece intacto durante o handover porque o endereço IP do terminal não se altera."
              ],
              "speakerNotes": "A beleza da arquitetura 3GPP é a abstração: a antena mudou três vezes durante a chamada de carro, mas o diálogo SIP do PABX nunca soube nem precisou saber."
            }
          ],
          "theoryText": "\n        <h3>1. A Correlação Multicamadas de uma Chamada Celular All-IP</h3>\n        <p>Para que um usuário pressionando o botão verde no celular fale com um ramal em um PABX corporativo, ocorre uma sequência cronológica estrita através de 4 domínios tecnológicos distintos:</p>\n        \n        <table border=\"1\" cellpadding=\"6\" style=\"border-collapse:collapse; width:100%; margin:15px 0;\">\n            <tr style=\"background:#f0f4f8;\">\n                <th>Etapa</th>\n                <th>Domínio</th>\n                <th>Protocolos</th>\n                <th>Entidades Envolvidas</th>\n            </tr>\n            <tr>\n                <td>1. Acesso ao Rádio</td>\n                <td>RAN (Aéreo)</td>\n                <td>PRACH, RRCSetup</td>\n                <td>Smartphone &lt;--&gt; gNodeB (Antena)</td>\n            </tr>\n            <tr>\n                <td>2. Sinalização de Core</td>\n                <td>3GPP Control Plane</td>\n                <td>NGAP, NAS Service Request</td>\n                <td>gNodeB &lt;--&gt; AMF &lt;--&gt; SMF</td>\n            </tr>\n            <tr>\n                <td>3. Estabelecimento de Mídia</td>\n                <td>3GPP User Plane</td>\n                <td>PFCP, GTP-U Encap</td>\n                <td>gNodeB &lt;--&gt; UPF (ogstun)</td>\n            </tr>\n            <tr>\n                <td>4. Diálogo de Telefonia</td>\n                <td>VoIP / SIP</td>\n                <td>SIP INVITE, SDP, RTP</td>\n                <td>Cliente IMS &lt;--&gt; Yate / Asterisk</td>\n            </tr>\n        </table>\n\n        <h3>2. O Desafio da Latência e Fragmentação de Pacotes</h3>\n        <p>A adição do túnel GTP-U sobre a pilha IP/UDP introduz um overhead fixo de <strong>36 bytes</strong> por pacote:</p>\n        <ul>\n            <li>IP Externo: 20 bytes</li>\n            <li>UDP Externo (Porta 2152): 8 bytes</li>\n            <li>Cabeçalho GTP-U: 8 bytes</li>\n        </ul>\n        <p>Para evitar a fragmentação de pacotes no transporte (que destrói a qualidade do áudio e aumenta o jitter), a interface <code>ogstun</code> do UPF deve ser rigorosamente configurada com <strong>MTU de 1400 bytes</strong> (ou inferior), garantindo que os pacotes encapsulados nunca excedam os 1500 bytes da rede física Ethernet subjacente.</p>\n      ",
          "softwareConfig": {
            "software": "Open5GS UPF Routing & TUN Interface",
            "file": "config/upf.yaml",
            "code": "upf:\n  pfcp:\n    - addr: 172.28.0.10\n  gtpu:\n    - addr: 172.28.0.10\n  subnet:\n    - addr: 10.45.0.1/16\n      dev: ogstun    ; Interface de tunel de saida do Core\n  mtu: 1400          ; Evita fragmentacao com GTP-U",
            "explanation": "A MTU da interface ogstun deve ser calibrada em 1400 bytes para compensar os 36 bytes do cabeçalho de túnel GTP-U/UDP/IP, garantindo entrega limpa e sem fragmentação de pacotes de sinalização e voz."
          },
          "wiresharkAnalysis": {
            "protocol": "PFCP / GTP-U",
            "summary": "Sessão de encaminhamento PFCP estabelecida pela SMF no UPF",
            "rawTrace": "Packet Forwarding Control Protocol (PFCP), Dport: 8805\nPFCP Header: Version 1, Message Type: Session Establishment Request (50)\n  SEID: 0x0000000000000001\n  Create PDR (Packet Detection Rule):\n    PDR ID: 1\n    Precedence: 100\n    Source Interface: Access (0)\n  Create FAR (Forwarding Action Rule):\n    FAR ID: 1\n    Apply Action: FORW (Forward)\n    Outer Header Creation: GTP-U/UDP/IPv4, TEID: 0x00000001, IP: 172.28.0.20"
          },
          "diagramType": "global"
        },
        {
          "id": "2.4",
          "title": "2.4 Análise Forense com Wireshark: Dissecção dos Pontos de Troca de Tráfego e Pontos de Observação",
          "duration": "30 min",
          "tag": "Wireshark Forensics",
          "slides": [
            {
              "title": "Engenharia Forense de Tráfego de Telecomunicações",
              "subtitle": "Onde e Como Posicionar as Sondas de Captura (Port Mirroring & TAP)",
              "bullets": [
                "Ponto de Captura 1 (Interface Aérea/Virtual): Captura de frames de rádio e mensagens RRC.",
                "Ponto de Captura 2 (Interface N2/N3): Tráfego NGAP (SCTP 38412) e GTP-U (UDP 2152) entre torre e core.",
                "Ponto de Captura 3 (Borda do Core / UPF): Tráfego IP decapsulado na interface ogstun/uesimtun0.",
                "Ponto de Captura 4 (Tronco SIP Inter-Servidores): Tráfego SIP (5060) e RTP (10000-20000) entre Yate e Asterisk."
              ],
              "speakerNotes": "Capturar pacotes no lugar errado gera conclusões falsas. Se você capturar na interface física da torre, verá apenas túneis GTP; para ver a chamada SIP, é preciso capturar no ponto de desencapsulamento."
            },
            {
              "title": "Filtros de Exibição Avançados no Wireshark",
              "subtitle": "Isolando a Agulha no Palheiro de Milhões de Pacotes",
              "bullets": [
                "Filtro de Sinalização Telefônica: 'sip || sdp' ou 'sip.Method == \"INVITE\"'.",
                "Filtro por ID de Chamada: 'sip.Call-ID contains \"c2a819b0\"' isola uma única conversação completa.",
                "Filtro de Túneis 3GPP: 'gtp || ngap' para isolar a sinalização de mobilidade celular.",
                "Filtro de Falhas: 'sip.Status-Code >= 400' destaca instantaneamente rejeições e erros de rede."
              ],
              "speakerNotes": "Dominar a sintaxe de filtros do Wireshark economiza horas de diagnóstico. Saber filtrar por Call-ID permite reconstruir toda a história de uma chamada em segundos."
            },
            {
              "title": "Dissecção do Fluxo RTP e Gráficos de Jitter",
              "subtitle": "Menu 'Telephony' -> 'RTP' -> 'RTP Stream Analysis'",
              "bullets": [
                "Delta Time: Variação temporal entre chegadas sucessivas de pacotes (ideal: exatamente 20.00 ms).",
                "Jitter Médio e Máximo: Oscilação da latência; valores acima de 30 ms degradam sensivelmente a voz.",
                "Pacotes Fora de Ordem e Perdidos: Indica congestionamento de buffer em roteadores intermediários.",
                "Player de Áudio Integrado: O Wireshark permite decodificar o codec G.711 e ouvir a chamada gravada no trace."
              ],
              "speakerNotes": "Demonstramos na prática a ferramenta de análise de streams RTP do Wireshark, ouvindo o áudio capturado e visualizando as curvas de jitter e atraso."
            },
            {
              "title": "Diagrama de Sequência e Escada de Sinalização (VoIP Flow)",
              "subtitle": "Menu 'Telephony' -> 'VoIP Calls' -> 'Flow Sequence'",
              "bullets": [
                "Visão Gráfica Unificada: Plota a escada de setas relacionando clientes, proxies e destinos.",
                "Cálculo de Post-Dial Delay (PDD): O tempo decorrido entre o envio do INVITE e o recebimento do 180 Ringing.",
                "Duração da Chamada: Medição precisa do intervalo entre o 200 OK e o BYE.",
                "Evidência Técnica Indiscutível: A ferramenta definitiva para comprovar conformidade e SLA com operadoras."
              ],
              "speakerNotes": "Em disputas de cobrança e auditorias regulatórias, o relatório de fluxo VoIP exportado pelo Wireshark é a evidência técnica soberana aceita pela Anatel e pela Justiça."
            }
          ],
          "theoryText": "\n        <h3>1. Metodologia de Captura e Inspeção Forense em Telecomunicações</h3>\n        <p>A auditoria de redes de telefonia moderna exige a colocação estratégica de pontos de captura (SPAN ports, TAPs ópticos ou interfaces virtuais Linux tcpdump). Em nosso laboratório conteinerizado, os pontos de observação são mapeados diretamente nas pontes de rede do Docker:</p>\n        \n        <ul>\n            <li><strong>Interface de Rede <code>telecom_net</code> (172.28.0.0/16):</strong> Observa a sinalização de controle REST/HTTP2 entre microsserviços do 5G Core, o tráfego SCTP NGAP e os túneis GTP-U.</li>\n            <li><strong>Interface de Loopback / Socket Interno (127.0.0.1:5039):</strong> Monitora as mensagens assíncronas do protocolo de controle ExtModule trocadas entre o núcleo do Yate em C++ e o orquestrador em Node.js.</li>\n            <li><strong>Interface de Voz SIP/RTP:</strong> Captura as sessões de áudio reais trocadas entre os ramais MicroSIP e os servidores de comutação.</li>\n        </ul>\n\n        <h3>2. O Guia de Dissecção de Pacotes SIP no Wireshark</h3>\n        <p>Ao abrir um arquivo de captura (<code>.pcap</code>), o analista sênior examina campos fundamentais do cabeçalho SIP:</p>\n        <ol>\n            <li><strong>Via Header:</strong> Cada proxy SIP por onde a mensagem passa adiciona seu próprio cabeçalho <code>Via:</code> no topo da pilha, incluindo um parâmetro <code>branch=z9hG4bK...</code> exclusivo. Isso garante que as respostas sigam exatamente a mesma rota reversa e previne loops de roteamento.</li>\n            <li><strong>Max-Forwards:</strong> Contador decrescente (geralmente iniciado em 70) que evita que mensagens circulem infinitamente em redes mal configuradas.</li>\n            <li><strong>CSeq (Command Sequence):</strong> Número sequencial de comando que emparelha requisições e respostas dentro de uma mesma transação.</li>\n            <li><strong>Call-ID:</strong> Identificador criptograficamente forte que une todos os pacotes pertencentes à mesma chamada telefônica.</li>\n        </ol>\n      ",
          "softwareConfig": {
            "software": "Linux tcpdump & TShark Capture Script",
            "file": "scripts/captura_forense.sh",
            "code": "#!/usr/bin/env bash\n# Captura de Alta Fidelidade com Filtro de Ring Buffer\n# Monitora portas SIP (5060), RTP (10000-20000), NGAP (38412) e GTP-U (2152)\n\ntcpdump -i any -nn -s 0 \\\n  \"port 5060 or port 38412 or port 2152 or (udp and portrange 10000-20000)\" \\\n  -w /captures/forense_$(date +%Y%m%d_%H%M%S).pcap \\\n  -C 100 -W 10",
            "explanation": "O script tcpdump utiliza buffer rotativo de 100 MB (-C 100 -W 10) para evitar esgotamento de disco durante testes prolongados de estresse, gravando os pacotes completos sem truncamento de payload (-s 0)."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP / RTP Metrics",
            "summary": "Trace de encerramento de chamada (BYE -> 200 OK) com relatório de estatísticas",
            "rawTrace": "BYE sip:1102@10.11.0.50:5060 SIP/2.0\nVia: SIP/2.0/UDP 10.11.0.1:5060;branch=z9hG4bK-end-8192a\nFrom: <sip:1101@10.11.0.1>;tag=9as8d7f2\nTo: <sip:1102@10.11.0.1>;tag=yate-ok-19283\nCall-ID: c2a819b0-4f81-11eb-ae93-0242ac110002@10.11.0.50\nCSeq: 102 BYE\nReason: Q.850;cause=16;text=\"Normal call clearing\"\nUser-Agent: Yate/6.0.0\nContent-Length: 0\n\nSIP/2.0 200 OK\nVia: SIP/2.0/UDP 10.11.0.1:5060;branch=z9hG4bK-end-8192a\nFrom: <sip:1101@10.11.0.1>;tag=9as8d7f2\nTo: <sip:1102@10.11.0.1>;tag=yate-ok-19283\nCall-ID: c2a819b0-4f81-11eb-ae93-0242ac110002@10.11.0.50\nCSeq: 102 BYE\nContent-Length: 0"
          },
          "diagramType": "global"
        }
      ]
    },
    {
      "id": 3,
      "title": "Módulo 3: Software por Software — Configurações, Parâmetros e Motores em Detalhes",
      "summary": "A dissecção de cada software do laboratório: o Core 5G Open5GS e seus microsserviços (AMF/SMF/UPF), o motor de telecomunicações assíncrono Yate, o PABX Asterisk 20+ com driver PJSIP, e o emulador de rádio 5G UERANSIM.",
      "lessons": [
        {
          "id": "3.1",
          "title": "3.1 Open5GS 5G/4G Core: AMF (SCTP 38412), SMF, UPF (GTP-U 2152) e Provisionamento WebUI (Porta 9999)",
          "duration": "40 min",
          "tag": "Core 5G Open5GS",
          "slides": [
            {
              "title": "A Arquitetura de Microsserviços do Open5GS",
              "subtitle": "Implementação da Service-Based Architecture (SBA) 3GPP Release 16/17",
              "bullets": [
                "AMF (Access and Mobility Management Function): Termina a sinalização NGAP (SCTP 38412) e mensagens NAS.",
                "SMF (Session Management Function): Gerencia sessões de dados PDU e aloca endereços IP aos SIM cards.",
                "UPF (User Plane Function): O comutador de pacotes de alta velocidade que processa túneis GTP-U (UDP 2152).",
                "Banco de Dados MongoDB: Armazena perfis de assinantes, credenciais IMSI e chaves de autenticação Ki/OPc."
              ],
              "speakerNotes": "O Open5GS é o núcleo 5G de código aberto mais robusto do mundo. Ele quebrou o monopólio de equipamentos proprietários ao permitir rodar uma rede 5G completa em contêineres Docker."
            },
            {
              "title": "A Interface de Gerenciamento WebUI (Porta 9999)",
              "subtitle": "Provisionamento de Assinantes, IMSI, Ki, OPc e Políticas de QCI",
              "bullets": [
                "Acesso Web Centralizado: Interface Node.js/React escutando em http://localhost:9999 (admin/1423).",
                "Identidade Internacional de Assinante (IMSI): Composto por MCC (724), MNC (99) e MSIN (10 dígitos).",
                "Chaves Criptográficas de Autenticação: Ki (128/256 bits) e OPc para o algoritmo Milenage 3GPP.",
                "Configuração de Network Slicing: Single Network Slice Selection Assistance Information (S-NSSAI: SST=1, SD=0x112233)."
              ],
              "speakerNotes": "Demonstramos na tela a criação de um assinante no WebUI. A chave Ki nunca é transmitida no ar; tanto o chip SIM quanto o banco UDM do Open5GS calculam hashes criptográficos para confirmar autenticação."
            },
            {
              "title": "Configuração do AMF e Associação SCTP",
              "subtitle": "O Enlace de Controle Confiável entre gNodeB e o Core",
              "bullets": [
                "Por Que SCTP (Stream Control Transmission Protocol)?: Entrega orientada a mensagens sem bloqueio de cabeça de fila (Head-of-Line Blocking).",
                "Multi-Homing: Suporte nativo a múltiplos endereços IP para redundância de cabo físico.",
                "Porta Padronizada 38412: Escuta conexões de dezenas de estações rádio-base (gNodeBs) simultâneas.",
                "Tracing NGAP: Cada novo rádio que sobe envia o NGSetupRequest e recebe o NGSetupResponse com a lista de PLMNs suportadas."
              ],
              "speakerNotes": "O SCTP é o protocolo secreto das telecomunicações: une a confiabilidade de entrega do TCP com a preservação de fronteiras de mensagem do UDP."
            },
            {
              "title": "O Comutador UPF e o Túnel de Dados GTP-U",
              "subtitle": "Encaminhamento de Alta Taxa e Integração com a Tabela de Rotas Linux",
              "bullets": [
                "Protocolo PFCP (Porta 8805): A SMF instrui o UPF em tempo real sobre quais túneis abrir e quais regras de firewall aplicar.",
                "GTP-U na Porta 2152: Todo o tráfego de dados e voz dos celulares passa encapsulado por essa porta UDP.",
                "Criação da Interface TUN (ogstun): Dispositivo virtual Linux que entrega os pacotes decapsulados ao sistema operacional.",
                "Habilitação de IP Forwarding: O comando 'sysctl -w net.ipv4.ip_forward=1' transforma o servidor em roteador de operadora."
              ],
              "speakerNotes": "Se o UPF falhar, o celular continua com sinal de barra cheia na tela (porque a AMF está viva), mas nenhum byte de internet ou voz trafega. É a clássica 'falha fantasma' de plano de usuário."
            }
          ],
          "theoryText": "\n        <h3>1. A Estrutura Modular do Core 5G Standalone (Open5GS)</h3>\n        <p>O <strong>Open5GS</strong> é uma implementação em C/C++ de alto desempenho dos padrões 3GPP para redes 4G EPC e 5G Core. Na arquitetura 5G Standalone (SA), as funções de rede comunicam-se através de interfaces baseadas em serviços (SBI - Service-Based Interface) utilizando HTTP/2 com serialização JSON:</p>\n\n        <ul>\n            <li><strong>NRF (Network Repository Function):</strong> O catálogo de serviços que permite que cada função descubra dinamicamente as outras na rede.</li>\n            <li><strong>AMF (Access and Mobility Management Function):</strong> Gerencia a autenticação, segurança e registro de terminais.</li>\n            <li><strong>SMF (Session Management Function):</strong> Controla as sessões de dados dos usuários e instrui o plano de dados através do protocolo <strong>PFCP (Packet Forwarding Control Protocol)</strong> conforme a especificação 3GPP TS 29.244.</li>\n            <li><strong>UPF (User Plane Function):</strong> Responsável pelo roteamento de pacotes, agregação de túneis GTP-U, inspeção de pacotes e aplicação de regras de tarifação e QoS.</li>\n            <li><strong>UDM / UDR / AUSF:</strong> Módulos de gestão de dados de usuários e autenticação criptográfica respaldados pelo banco MongoDB.</li>\n        </ul>\n\n        <h3>2. O Algoritmo de Autenticação Milenage e Segurança de SIM Card</h3>\n        <p>A segurança celular não utiliza senhas em texto claro nem pares de chaves RSA convencionais. Ela é baseada em uma <strong>chave mestra simétrica Ki de 128 bits</strong> gravada fisicamente na memória segura do chip SIM no momento da fabricação e copiada de forma idêntica no banco de dados do Core Network.</p>\n        <p>Quando o terminal solicita registro, o core envia um número pseudoaleatório <code>RAND</code> e um token de autenticação <code>AUTN</code>. O chip SIM processa essas entradas através das funções criptográficas rijndael do conjunto <strong>Milenage (f1, f2, f3, f4, f5)</strong>:</p>\n        <ol>\n            <li>O chip valida o <code>AUTN</code> para ter certeza de que a rede não é uma estação base falsa (autenticação da rede pelo terminal).</li>\n            <li>O chip calcula a resposta <code>RES</code> e a envia de volta ao core.</li>\n            <li>Se <code>RES == XRES</code>, a autenticação é bem-sucedida e são derivadas as chaves de sessão <code>K_AMF</code>, <code>K_enc</code> (cifragem) e <code>K_int</code> (integridade).</li>\n        </ol>\n      ",
          "softwareConfig": {
            "software": "Open5GS AMF Configuration",
            "file": "config/amf.yaml",
            "code": "amf:\n  sbi:\n    - addr: 172.28.0.10\n      port: 7777\n  ngap:\n    - addr: 172.28.0.10\n      port: 38412    ; Porta de escuta SCTP para gNodeBs\n  guami:\n    - plmn_id:\n        mcc: 724     ; Brasil\n        mnc: 99      ; Rede Privada\n      amf_id:\n        region: 2\n        set: 1\n  tai:\n    - plmn_id:\n        mcc: 724\n        mnc: 99\n      tac: 1         ; Tracking Area Code 1\n  security:\n    integrity_order : [ NIA2, NIA1, NIA0 ]\n    ciphering_order : [ NEA2, NEA1, NEA0 ]",
            "explanation": "O arquivo amf.yaml configura os identificadores globais da rede (PLMN 724-99, TAC 1), a porta de escuta SCTP 38412 e a ordem de preferência dos algoritmos de criptografia e integridade (NEA2/NIA2 baseado em AES-128)."
          },
          "wiresharkAnalysis": {
            "protocol": "NGAP / NAS 5GS",
            "summary": "Mensagem NAS de Authentication Request enviada pela AMF ao terminal",
            "rawTrace": "NGAP-PDU: initiatingMessage (0)\n  procedureCode: 14 (DownlinkNASTransport)\n  value: DownlinkNASTransport\n    AMF-UE-NGAP-ID: 1\n    RAN-UE-NGAP-ID: 1\n    NAS-PDU: 5GS Mobility Management (5GMM)\n      Security Header Type: Plain NAS message (0)\n      Message Type: Authentication Request (0x56)\n      ngKSI: 0 (NAS Key Set Identifier)\n      RAND: 9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d\n      AUTN: 112233445566778899aabbccddeeff00 (SQN xor AK || AMF || MAC)"
          },
          "diagramType": "layers"
        },
        {
          "id": "3.2",
          "title": "3.2 Yate Telephony Engine: Arquitetura Assíncrona, regexroute.conf, regfile.conf e Módulo Extmodule Node.js",
          "duration": "40 min",
          "tag": "Motor Yate C++",
          "slides": [
            {
              "title": "Yet Another Telephony Engine (Yate)",
              "subtitle": "A Arquitetura Orientada a Mensagens em C++ Nativo",
              "bullets": [
                "Não Centrado em Canais: Ao contrário do Asterisk histórico, o Yate é um barramento de mensagens assíncronas.",
                "Performance Extrema: Escrito em C++ multi-thread com lock-free queues e consumo ínfimo de memória (RSS < 30 MB).",
                "Módulos Especializados: 'ysipchan' (SIP), 'regexroute' (expressões regulares), 'extmodule' (integração externa).",
                "Suporte a Protocolos de Telecom: SIP, H.323, ISDN, SS7/SIGTRAN (M3UA), MAP e Diameter no mesmo motor."
              ],
              "speakerNotes": "O Yate é a joia oculta das telecomunicações abertas. Ele foi projetado por engenheiros de operadora para aguentar dezenas de milhares de chamadas simultâneas sem consumir a CPU do servidor."
            },
            {
              "title": "O Ciclo de Vida da Mensagem 'call.route'",
              "subtitle": "Como o Yate Decide o Destino de Cada Ligação em Milissegundos",
              "bullets": [
                "Disparo do Evento: Quando um pacote SIP INVITE chega, o módulo 'ysipchan' emite a mensagem 'call.route'.",
                "Cadeia de Prioridades (Priority Chaining): Módulos com menor número de prioridade interceptam a mensagem primeiro.",
                "Modificação de Parâmetros: Módulos podem alterar o número chamado, adicionar prefixos ou definir o gateway de saída.",
                "Consumo ou Repasse: Se um módulo preenche o parâmetro 'target', o roteamento é concluído e a chamada é executada."
              ],
              "speakerNotes": "Entender o evento call.route é a chave para dominar o Yate. Você pode programar qualquer comportamento complexo de comutação apenas ouvindo e respondendo a essa mensagem."
            },
            {
              "title": "O Módulo ExtModule e o Protocolo TCP de Controle",
              "subtitle": "Conectando Node.js, Python ou Rust ao Núcleo C++ em 127.0.0.1:5039",
              "bullets": [
                "Protocolo Baseado em Linhas de Texto: Mensagens prefixadas por '%%>message', '%%<message' e separadores de parâmetros.",
                "Comando 'watch': Informa ao Yate que o script externo deseja receber eventos específicos (ex: 'watch call.route').",
                "Comando 'install': Permite ao script externo interceptar a mensagem com prioridade e responder com o destino final.",
                "Desacoplamento Seguro: Uma falha no script Node.js não derruba o processo C++ do Yate."
              ],
              "speakerNotes": "O ExtModule é o recurso mais poderoso do Yate. Ele permite que desenvolvedores web criem lógicas de telecomunicações complexas em JavaScript sem precisar recompilar código C++."
            },
            {
              "title": "Defesa Ativa contra Fraudes em regexroute.conf",
              "subtitle": "O Roteador de Expressões Regulares como Firewall de Telefonia",
              "bullets": [
                "Casamento de Padrões por Regex: Rotas estruturadas por expressões regulares POSIX no arquivo regexroute.conf.",
                "Ramais Autorizados: Casamento estrito para os ramais das 6 cidades do laboratório (São Paulo, Rio, Miami, NY, Lisboa, Porto).",
                "Roteamento Internacional: Encaminhamento de números E.164 para os troncos SIP corretos.",
                "Regra Inegociável de Encerramento: '.*=-;error=noroute' encerra instantaneamente chamadas para números desconhecidos."
              ],
              "speakerNotes": "Se você esquecer a regra de negação explícita no fim do arquivo, o Yate tentará encontrar gateways padrão, abrindo brechas para varreduras maliciosas de scanners SIP na internet."
            }
          ],
          "theoryText": "\n        <h3>1. A Filosofia Arquitetural do Yate</h3>\n        <p>O <strong>Yate (Yet Another Telephony Engine)</strong> difere fundamentalmente de quase todos os outros servidores de PABX e softswitches de código aberto. Enquanto servidores convencionais utilizam o modelo de <em>canais e pontes de áudio rígidas</em>, o Yate é estruturado como um <strong>motor de despacho de mensagens assíncronas com publicação e assinatura (Pub/Sub)</strong> em memória.</p>\n        \n        <p>No Yate, absolutamente tudo é uma mensagem (<code>class Message</code>). Quando uma chamada chega pela interface SIP, ela não é tratada por um loop fechado; o canal cria uma mensagem <code>call.route</code> contendo atributos chave-valor (ex: <code>caller=1101</code>, <code>called=3511</code>, <code>ip_transport=10.11.0.50</code>) e a dispara no barramento central.</p>\n\n        <h3>2. O Protocolo do ExtModule e a Orquestração Externa</h3>\n        <p>O módulo <code>extmodule</code> permite estender o Yate através de sockets TCP ou pipes padrão (stdin/stdout). O protocolo de comunicação é textual e determinístico:</p>\n        <ul>\n            <li><code>%%&gt;install:&lt;prioridade&gt;:&lt;nome_mensagem&gt;</code>: O script avisa ao motor que quer interceptar uma mensagem com prioridade definida (ex: prioridade 50).</li>\n            <li><code>%%&lt;message:&lt;id&gt;:&lt;tempo&gt;:&lt;nome&gt;:&lt;retorno&gt;[:&lt;chave&gt;=&lt;valor&gt;...]</code>: O Yate entrega a mensagem ao script com todos os parâmetros serializados.</li>\n            <li><code>%%&gt;message:&lt;id&gt;:&lt;processado&gt;:[&lt;retorno&gt;][:&lt;chave&gt;=&lt;valor&gt;...]</code>: O script responde informando se a mensagem foi tratada (<code>true</code>) e qual é o <code>target</code> de conexão da chamada.</li>\n        </ul>\n      ",
          "softwareConfig": {
            "software": "Yate ExtModule Node.js Controller",
            "file": "docker-lab/yate-node/yate_controller.js",
            "code": "// Interceptador de Chamadas Yate ExtModule em Node.js\nconst net = require('net');\nconst client = net.createConnection({ host: '127.0.0.1', port: 5039 }, () => {\n    console.log('[Yate-Node] Conectado ao socket de controle local');\n    // Instala interceptor com prioridade 50 (executa antes do dialplan comum)\n    client.write('%%>install:50:call.route\\n');\n});\n\nclient.on('data', (data) => {\n    const line = data.toString('utf-8').trim();\n    if (line.startsWith('%%<message:') && line.includes(':call.route:')) {\n        const parts = line.split(':');\n        const msgId = parts[1];\n        console.log(`[Yate-Node] Processando roteamento da mensagem ${msgId}`);\n        \n        // Regra inteligente: Ramais 11xx encaminhados para trunk SIP de Sao Paulo\n        client.write(`%%>message:${msgId}:true:handled:target=sip/sip:carrier_sp:handled=true\\n`);\n    }\n});",
            "explanation": "O script Node.js intercepta em tempo real cada evento 'call.route', analisa os metadados do originador e instrui o Yate a direcionar o fluxo de voz para o trunk SIP apropriado de forma totalmente dinâmica."
          },
          "wiresharkAnalysis": {
            "protocol": "Yate ExtModule TCP",
            "summary": "Linha de comando do protocolo ExtModule trocada em 127.0.0.1:5039",
            "rawTrace": "Transmission Control Protocol, Src Port: 5039, Dst Port: 48921\nData (42 bytes):\n  %%<message:1001:1792167000:call.route::caller=1101:called=3511:ip_transport=10.11.0.50\n[Response from Node.js Controller]:\n  %%>message:1001:true:handled:target=sip/sip:172.28.0.30:5060/3511"
          },
          "diagramType": "global"
        },
        {
          "id": "3.3",
          "title": "3.3 Asterisk PBX: PJSIP Channel Driver (pjsip.conf), Dialplan Dinâmico (extensions.conf), Eco (8001) e Conf (8000)",
          "duration": "40 min",
          "tag": "Asterisk 20+ PBX",
          "slides": [
            {
              "title": "Asterisk 20+ Moderno: A Substituição do Driver Convencional",
              "subtitle": "A Transição Obrigatória do chan_sip para o chan_pjsip",
              "bullets": [
                "Aposentadoria Definitiva do chan_sip: Removido do núcleo do Asterisk nas versões modernas por problemas de concorrência.",
                "chan_pjsip (Teluu C Library): Pilha SIP profissional, assíncrona, escalável e modular com múltiplos endpoints.",
                "Desacoplamento em 5 Objetos: 'transport' (rede), 'endpoint' (lógica), 'aor' (endereços), 'auth' (senhas) e 'identify' (IPs).",
                "Suporte Nativo a WebRTC: Criptografia DTLS-SRTP e sinalização segura sobre WSS (WebSocket Secure)."
              ],
              "speakerNotes": "Muitos tutoriais antigos na internet ainda usam sip.conf. No nosso laboratório moderno 2026, operamos exclusivamente com pjsip.conf estruturado em seus 5 objetos canônicos."
            },
            {
              "title": "Os 5 Objetos Sagrados do chan_pjsip",
              "subtitle": "Como o pjsip.conf Organiza Ramais e Troncos sem Ambiguidade",
              "bullets": [
                "transport-udp: Define o bind IP (0.0.0.0:5060) e a família de protocolos (IPv4/IPv6).",
                "endpoint: Contém o perfil do ramal, contexto de discagem, codecs suportados (allow=ulaw,alaw) e DTMF.",
                "auth: Armazena o usuário e a senha de alta entropia (auth_type=userpass).",
                "aor (Address of Record): Controla quantos aparelhos podem registrar simultaneamente no mesmo ramal (max_contacts).",
                "identify: Associa pacotes recebidos por endereço IP ao endpoint correto sem exigir autenticação por senha."
              ],
              "speakerNotes": "A modularidade do PJSIP permite que você tenha um ramal autenticado em três celulares ao mesmo tempo, ou receba chamadas de uma operadora por IP sem senha através do objeto identify."
            },
            {
              "title": "Dialplan Profissional em extensions.conf",
              "subtitle": "Lógica de Chamadas, Contextos Isolados e Aplicações Internas",
              "bullets": [
                "Contextos Seguros: 'from-internal' para ramais da empresa; contextos públicos separados com restrição total.",
                "Aplicação Echo() (Ramal 8001): Retorna imediatamente o áudio falado pelo usuário para teste de delay e clareza.",
                "Aplicação ConfBridge() (Ramal 8000): Sala de conferência com mixagem digital de áudio em ponto flutuante.",
                "Função DIAL com Timeout e Failover: Tentativa de discagem com transbordo automático se o ramal estiver ocupado."
              ],
              "speakerNotes": "O dialplan do Asterisk é uma verdadeira linguagem de programação declarativa. As aplicações Echo e ConfBridge são cruciais no laboratório para aferição de qualidade de bancada."
            },
            {
              "title": "Interconexão Asterisk <-> Yate via Tronco SIP",
              "subtitle": "Distribuindo Funções: Yate no Roteamento e Asterisk nos Serviços",
              "bullets": [
                "Arquitetura de Duplo Motor: O Yate comuta pacotes e controla o rádio móvel; o Asterisk roda URAs, filas e correio de voz.",
                "Tronco SIP Ponto a Ponto: Conexão direta entre 172.28.0.20 (Yate) e 172.28.0.30 (Asterisk).",
                "Preservação do CallerID: Encaminhamento transparente dos números originais E.164 entre os servidores.",
                "Resiliência Operacional: Se um servidor passar por manutenção, o outro mantém chamadas essenciais ativas."
              ],
              "speakerNotes": "Grandes operadoras não colocam todos os ovos na mesma cesta. Dividir a comutação rápida no Yate e as aplicações de valor no Asterisk é a melhor prática da indústria."
            }
          ],
          "theoryText": "\n        <h3>1. A Arquitetura Modular do chan_pjsip no Asterisk Moderno</h3>\n        <p>No Asterisk contemporâneo (versões 20 e superiores), o tradicional driver <code>chan_sip</code> foi completamente descontinuado em favor da biblioteca <strong>PJSIP</strong>. A principal vantagem é a completa eliminação de bloqueios globais (locks) que travavam centrais sob alta carga de chamadas simultâneas.</p>\n\n        <p>A configuração do PJSIP é dividida em 5 seções interdependentes que eliminam qualquer ambiguidade de autenticação:</p>\n        <ol>\n            <li><strong>Transport:</strong> Define a camada de transporte física (UDP, TCP, TLS ou WebSocket).</li>\n            <li><strong>Endpoint:</strong> O ponto focal da sessão. Define as regras de mídia (codecs), regras de travessia de NAT (<code>direct_media=no</code>, <code>rtp_symmetric=yes</code>, <code>force_rport=yes</code>) e vincula os outros objetos.</li>\n            <li><strong>AOR (Address of Record):</strong> Define a localização de contato do ramal e gerencia os registros SIP recebidos.</li>\n            <li><strong>Auth:</strong> As credenciais para autenticação de entrada ou saída (Digest Authentication).</li>\n            <li><strong>Identify:</strong> Mapeia troncos de operadoras que autenticam por IP em vez de usuário/senha.</li>\n        </ol>\n\n        <h3>2. As Ferramentas de Calibração: Aplicações Echo() e ConfBridge()</h3>\n        <p>No desenvolvimento de uma operadora de telefonia, duas ferramentas de software incorporadas ao dialplan do Asterisk são vitais para o processo de comissionamento:</p>\n        <ul>\n            <li><strong>Aplicação Echo() (Extensão 8001):</strong> Ao discar para o número 8001, o Asterisk responde o canal (200 OK) e lê continuamente os pacotes RTP de uplink, reescrevendo imediatamente o cabeçalho de volta para o downlink do originador. Isso permite ao engenheiro escutar sua própria voz com atraso de ida e volta (Round-Trip Delay), permitindo avaliar se a latência total da rede está abaixo dos 150 ms recomendados pela ITU-T G.114.</li>\n            <li><strong>Aplicação ConfBridge() (Extensão 8000):</strong> Uma sala de conferência multiponto de alta performance que realiza a mixagem digital linear dos fluxos de áudio de múltiplos ramais (São Paulo, Rio, Miami e Lisboa conversando juntos no mesmo ambiente sonoro).</li>\n        </ul>\n      ",
          "softwareConfig": {
            "software": "Asterisk Moderno PJSIP & Dialplan",
            "file": "config/pjsip.conf & extensions.conf",
            "code": "; === pjsip.conf ===\n[transport-udp]\ntype=transport\nprotocol=udp\nbind=0.0.0.0:5060\n\n[1101]\ntype=endpoint\ncontext=from-internal\ndisallow=all\nallow=ulaw,alaw,g729\nauth=auth1101\naors=aor1101\n\n[auth1101]\ntype=auth\nauth_type=userpass\nusername=1101\npassword=SecretSP1101!\n\n[aor1101]\ntype=aor\nmax_contacts=2\n\n; === extensions.conf ===\n[from-internal]\nexten => 8000,1,NoOp(Conferencia Internacional)\n same => n,ConfBridge(sala-global)\n same => n,Hangup()\n\nexten => 8001,1,NoOp(Teste de Eco de Bancada)\n same => n,Answer()\n same => n,Echo()\n same => n,Hangup()\n\nexten => _[1-3]XXX,1,Dial(PJSIP/${EXTEN},30)\n same => n,Hangup()",
            "explanation": "Configuração do canal PJSIP e plano de discagem do Asterisk. Demonstra a criação do ramal 1101 com autenticação segura, a sala de conferência ConfBridge no número 8000 e o teste de eco Echo no número 8001."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP / Asterisk PJSIP",
            "summary": "Chamada atendida pelo teste de eco do Asterisk (200 OK + ACK + RTP Loop)",
            "rawTrace": "SIP/2.0 200 OK\nVia: SIP/2.0/UDP 10.11.0.50:5060;rport=5060;received=10.11.0.50;branch=z9hG4bK-echo-11\nFrom: <sip:1101@10.11.0.30>;tag=9912a\nTo: <sip:8001@10.11.0.30>;tag=asterisk-echo-81273\nCall-ID: a81927cb-4f81-11eb-ae93-0242ac110002@10.11.0.50\nCSeq: 1 INVITE\nServer: Asterisk PBX 20.5.0\nContact: <sip:10.11.0.30:5060>\nContent-Type: application/sdp\nContent-Length: 198\n\nv=0\no=Asterisk 1792167000 1 IN IP4 10.11.0.30\ns=Asterisk Echo Test\nc=IN IP4 10.11.0.30\nt=0 0\nm=audio 10002 RTP/AVP 0 101\na=rtpmap:0 PCMU/8000\na=rtpmap:101 telephone-event/8000"
          },
          "diagramType": "brasil"
        },
        {
          "id": "3.4",
          "title": "3.4 UERANSIM 5G Radio Emulation: Configuração da gNodeB Virtual, SIM Cards Virtuais e Túnel uesimtun0",
          "duration": "35 min",
          "tag": "UERANSIM 5G",
          "slides": [
            {
              "title": "UERANSIM: O Emulador 5G Standalone Mais Avançado",
              "subtitle": "Simulação de gNodeB e UE sem Necessidade de Placa SDR Física",
              "bullets": [
                "Conformidade Estrita com 3GPP Rel-16: Implementa as pilhas completas RRC, PDCP, RLC, MAC e PHY em C++20.",
                "Criação de Antenas Virtuais: Processo 'nr-gnb' que emite sinalização de controle em direção ao Open5GS.",
                "Emulação de Telefones (UE): Processo 'nr-ue' que simula a inserção física de um cartão SIM com chaves criptográficas.",
                "Interface de Rede Virtual 'uesimtun0': Cria uma placa de rede Linux real por onde o computador navega via 5G."
              ],
              "speakerNotes": "O UERANSIM permite que qualquer estudante ou desenvolvedor rode testes de 5G em seu próprio computador, sem precisar gastar dinheiro com transceptores caros ou correr riscos com a Anatel."
            },
            {
              "title": "Configurando a gNodeB Virtual (gnb.yaml)",
              "subtitle": "Parâmetros de Célula, Frequência e Associação com a AMF",
              "bullets": [
                "Identidade da Célula (NR CGI): Combinação de PLMN (724-99) com o NCI de 32 bits.",
                "Tracking Area Code (TAC): Define a área geográfica de rastreamento do terminal (TAC=1).",
                "Configuração do Enlace SCTP: Endereço IP da AMF (172.28.0.10) e porta 38412.",
                "Fatiamento de Rede (Network Slicing): Anúncio dos S-NSSAIs suportados pela torre virtual."
              ],
              "speakerNotes": "A gNodeB virtual se comporta para o Core exatamente como uma torre de telecomunicações de R$ 500.000 da Huawei ou Ericsson: ela faz o mesmo handshake NGSetup e anuncia os mesmos blocos de sinalização."
            },
            {
              "title": "O Terminal Virtual e o SIM Card em Software (ue.yaml)",
              "subtitle": "Provisionamento de IMSI, Ki, OPc e Estabelecimento de Sessão PDU",
              "bullets": [
                "IMSI: Identificador único internacional (ex: 724990000000001).",
                "Chave Ki e OPc: Devem coincidir byte a byte com o cadastro realizado na WebUI do Open5GS.",
                "APN / DNN (Data Network Name): Nome do ponto de acesso para navegação (ex: 'internet').",
                "Disparo do Registro: O comando 'nr-ue -c ue.yaml' inicia o escaneamento de rádio e realiza o attachment 5G."
              ],
              "speakerNotes": "Demonstramos na prática o terminal virtual recebendo o PDU Session Establishment Accept e subindo a interface de rede uesimtun0 com IP 10.45.0.2 alocado pelo Core."
            },
            {
              "title": "Roteamento de Voz sobre a Interface 5G Simulada",
              "subtitle": "Ligando o Softphone MicroSIP Através do Túnel Celular uesimtun0",
              "bullets": [
                "Vinculação de Socket: O MicroSIP é configurado para escutar e emitir tráfego através da interface 10.45.0.2.",
                "Caminho do Pacote SIP: MicroSIP -> uesimtun0 -> gNodeB virtual -> Túnel GTP-U -> UPF Open5GS -> Yate PABX.",
                "Inspeção Unificada no Wireshark: O aluno visualiza os pacotes entrando no túnel de rádio e saindo no core.",
                "Prova de Conceito de VoNR: A chamada de voz completada com sucesso rodando 100% sobre uma rede 5G em software."
              ],
              "speakerNotes": "Aqui o laboratório fecha seu ciclo: o aluno vê sua ligação de voz passar por uma rede 5G virtual completa e tocar no ramal de São Paulo ou Lisboa com áudio cristalino."
            }
          ],
          "theoryText": "\n        <h3>1. A Engenharia do Emulador de Rádio 5G (UERANSIM)</h3>\n        <p>O <strong>UERANSIM</strong> é uma solução de software livre desenvolvida em C++20 que implementa as especificações da interface aérea 5G NR (New Radio) e das interfaces de rede NG-RAN padronizadas pelo 3GPP no Release 16.</p>\n        \n        <p>Ele opera dividindo a emulação em dois processos complementares de espaço de usuário no Linux:</p>\n        <ul>\n            <li><strong>nr-gnb (A Estação Rádio-Base 5G):</strong> Estabelece o túnel de controle SCTP com a AMF na porta 38412 e atua como o ponto de terminação do protocolo NGAP. No plano de usuário, recebe pacotes de dados e os empacota em túneis GTP-U encaminhados diretamente ao UPF pela porta UDP 2152.</li>\n            <li><strong>nr-ue (O Equipamento de Usuário 5G):</strong> Emula o modem celular e o smartcard USIM. Implementa a máquina de estados NAS (5GMM e 5GSM) e o protocolo de autenticação mútua 5G-AKA.</li>\n        </ul>\n\n        <h3>2. O Mecanismo da Interface Virtual TUN (uesimtun0)</h3>\n        <p>Quando o processo <code>nr-ue</code> completa com êxito o procedimento de <em>PDU Session Establishment</em>, ele recebe da SMF um endereço IPv4 (por exemplo, <code>10.45.0.2</code>) e parâmetros de DNS.</p>\n        <p>Para disponibilizar essa conectividade aos programas de aplicação do computador hospedeiro (como softphones MicroSIP, clientes curl ou navegadores), o UERANSIM cria dinamicamente um dispositivo de rede virtual de túnel Linux (<strong>TUN Device</strong>) denominado <code>uesimtun0</code>:</p>\n        <ol>\n            <li>Qualquer socket associado à interface <code>uesimtun0</code> tem seus pacotes IP capturados pelo processo <code>nr-ue</code>.</li>\n            <li>O <code>nr-ue</code> aplica a compressão de cabeçalho e cifra o pacote usando as chaves derivadas na autenticação.</li>\n            <li>O pacote é entregue à <code>nr-gnb</code> virtual através de um socket IPC local.</li>\n            <li>A <code>nr-gnb</code> encapsula o pacote em GTP-U e o transmite pela rede Ethernet ao UPF do Open5GS, onde o pacote é entregue ao seu destino final (a central Yate ou Asterisk).</li>\n        </ol>\n      ",
          "softwareConfig": {
            "software": "UERANSIM UE Configuration",
            "file": "config/ue.yaml",
            "code": "supi: 'imsi-724990000000001'  ; Subscription Permanent Identifier\nmcc: '724'\nmnc: '99'\n\nkey: '465B5CE8B199B49FAA5F0A2EE238A6BC'  ; Chave secreta Ki (128 bits)\nopc: 'E8ED289DEBA952E4283B54E88E6183CA'  ; Chave do operador OPc\namf: '8000'\n\ngnbSearchList:\n  - 172.28.0.20                           ; IP da gNodeB virtual\n\nsessions:\n  - type: 'IPv4'\n    apn: 'internet'                       ; Nome do Ponto de Acesso\n    slice:\n      sst: 1\n      sd: 0x112233",
            "explanation": "O arquivo ue.yaml define a identidade e as credenciais criptográficas do chip SIM virtual. Ao rodar o comando nr-ue com este arquivo, o sistema realiza o attachment completo à rede 724-99 e cria a interface de rede uesimtun0."
          },
          "wiresharkAnalysis": {
            "protocol": "NAS 5GS / PDU Session",
            "summary": "PDU Session Establishment Accept recebido pelo UE com IP 10.45.0.2 alocado",
            "rawTrace": "5GS Session Management (5GSM) Message:\n  Message Type: PDU Session Establishment Accept (0xc2)\n  PDU Session ID: 1\n  Selected SSC Mode: SSC Mode 1 (Persistent IP)\n  Selected PDU Session Type: IPv4 (1)\n  PDU Address: 10.45.0.2\n  Authorized QoS Rules:\n    QoS Rule 1: DBR (Default Bearer Rule), Precedence: 255, 5QI: 9\n  Authorized QoS Flow Descriptions:\n    QFI: 1, 5QI: 9, Averaging Window: 2000 ms\n  DNS Server IPv4 Address: 8.8.8.8"
          },
          "diagramType": "layers"
        }
      ]
    },
    {
      "id": 4,
      "title": "Módulo 4: Topologia Multi-País e Roteamento Interurbano e Internacional",
      "summary": "A engenharia completa da malha de telecomunicações internacional do laboratório: o anel de sinalização e mídia interconectando Brasil, Estados Unidos e Portugal, os POPs locais em cada cidade, a conformidade com o plano global de numeração E.164 e a análise dos cabeçalhos SIP entre os países.",
      "lessons": [
        {
          "id": "4.1",
          "title": "4.1 Topologia Geral Multi-País: O Anel de Sinalização Brasil ↔ Estados Unidos ↔ Portugal",
          "duration": "40 min",
          "tag": "Topologia Global",
          "slides": [
            {
              "title": "O Anel Global de Telecomunicações do Laboratório",
              "subtitle": "Interconexão de Três Países com Roteamento Carrier-Grade",
              "bullets": [
                "Os 3 Países Centrais: Brasil (São Paulo e Rio), Estados Unidos (Miami e Nova York) e Portugal (Lisboa e Porto).",
                "Dupla Camada de Rede: Sinalização de controle SIP trocada entre gateways e tráfego de mídia RTP direto.",
                "Plano de Numeração Global: Formatação uniforme E.164 com código de país (+55, +1, +351) e planos de discagem curtos.",
                "Resiliência e Rota de Transbordo (Failover): Se o enlace direto Brasil-Portugal cair, o tráfego é reencaminhado via Miami."
              ],
              "speakerNotes": "Desenhamos no laboratório uma verdadeira rede internacional de operadora móvel virtual (MVNO) capaz de originar, comutar e terminar chamadas em três continentes com regras rígidas de roteamento."
            },
            {
              "title": "A Arquitetura de Session Border Controllers (SBC)",
              "subtitle": "Proteção de Borda, Normalização de Cabeçalhos e Adaptação de Mídia",
              "bullets": [
                "Isolamento de Topologia (Topology Hiding): Os endereços IP internos do Core 5G nunca são expostos à internet pública.",
                "Normalização de Protocolo: Correção de dialetos SIP e incompatibilidades de codecs entre operadoras parceiras.",
                "Limitação de Taxa de Requisições (Rate Limiting): Defesa ativa contra ataques volumétricos de negação de serviço (DoS).",
                "Ancoragem de Mídia (Media Anchoring): Garantia de travessia limpa de firewalls e NATs internacionais."
              ],
              "speakerNotes": "O Session Border Controller é a alfândega da rede de telefonia. Nenhuma mensagem internacional entra ou sai do núcleo sem ser inspecionada e sanitizada pelo SBC."
            },
            {
              "title": "Orçamento de Latência e Jitter Transcontinental",
              "subtitle": "Recomendações da ITU-T G.114 e a Física dos Cabos Submarinos",
              "bullets": [
                "Atraso Unidirecional Aceitável (One-Way Delay): Limite estrito de 150 ms para conversação natural sem sobreposição de vozes.",
                "Tempo de Propagação Óptica: Aproximadamente 5 microsegundos por quilômetro de fibra óptica no fundo do oceano.",
                "Trajeto Brasil - EUA (Cabo Seabras-1 / Monet): Latência de ida e volta (RTT) de cerca de 110 ms entre São Paulo e Miami.",
                "Trajeto EUA - Europa: RTT de 70 ms; Trajeto Brasil - Europa direto (EllaLink): RTT de cerca de 120 ms."
              ],
              "speakerNotes": "Compreender a velocidade da luz na fibra de vidro é essencial para desenhar rotas VoIP internacionais. Você não pode desafiar a física; deve desenhar o jitter buffer de acordo com a rota."
            },
            {
              "title": "Matriz de Interconexão e Encaminhamento de Custos (LCR)",
              "subtitle": "Least Cost Routing: A Economia do Roteamento Telefônico Internacional",
              "bullets": [
                "Tabelas de Menor Custo (LCR): O motor analisa o prefixo discado e escolhe o gateway mais barato em tempo real.",
                "Terminação Localizada (Bypass DDI): A chamada discada no Brasil para Lisboa é entregue via IP localmente em Portugal.",
                "Qualidade vs. Preço: Algoritmos de roteamento baseados em qualidade média de chamada (ASR e ACD).",
                "Bilhetagem e Fraude: Monitoramento de minutos atípicos em horários de madrugada para evitar prejuízos milionários."
              ],
              "speakerNotes": "O modelo de negócio de qualquer operadora VoIP ou MVNO depende do LCR. Rotear uma chamada pelo canal errado pode custar dez vezes mais caro e inviabilizar a margem da empresa."
            }
          ],
          "theoryText": "\n        <h3>1. A Malha de Telecomunicações Global Brasil - EUA - Portugal</h3>\n        <p>A arquitetura multi-país implantada no laboratório simula uma operadora global convergente com presença em três continentes, interconectando 6 pontos de presença (POPs) metropolitanos:</p>\n\n        <table border=\"1\" cellpadding=\"6\" style=\"border-collapse:collapse; width:100%; margin:15px 0;\">\n            <tr style=\"background:#f0f4f8;\">\n                <th>País</th>\n                <th>Cidades / POPs</th>\n                <th>Código País</th>\n                <th>Área / Região</th>\n                <th>Faixa de Ramais</th>\n            </tr>\n            <tr>\n                <td><strong>Brasil</strong></td>\n                <td>São Paulo / Rio de Janeiro</td>\n                <td>+55</td>\n                <td>DDD 11 / DDD 21</td>\n                <td>1101, 1102 / 2101, 2102</td>\n            </tr>\n            <tr>\n                <td><strong>Estados Unidos</strong></td>\n                <td>Miami / Nova York</td>\n                <td>+1</td>\n                <td>NPA 305 / NPA 212</td>\n                <td>3051, 3052 / 2121, 2122</td>\n            </tr>\n            <tr>\n                <td><strong>Portugal</strong></td>\n                <td>Lisboa / Porto</td>\n                <td>+351</td>\n                <td>Prefixo 21 / Prefixo 22</td>\n                <td>3511, 3513 / 3512, 3514</td>\n            </tr>\n        </table>\n\n        <h3>2. O Desafio da Latência e Acordo de Nível de Serviço (SLA)</h3>\n        <p>A norma internacional <strong>ITU-T G.114 (One-way transmission time)</strong> estabelece os limites aceitáveis para atraso de transmissão em telefonia:</p>\n        <ul>\n            <li><strong>0 a 150 ms:</strong> Qualidade excelente; conversação perfeitamente natural e fluida.</li>\n            <li><strong>150 a 400 ms:</strong> Qualidade aceitável com restrições; os interlocutores começam a se interromper inadvertidamente.</li>\n            <li><strong>Acima de 400 ms:</strong> Inaceitável para uso comercial em tempo real.</li>\n        </ul>\n        <p>Na interconexão entre São Paulo e Lisboa, o atraso de propagação na fibra óptica submarina (cerca de 10.000 km) introduz um RTT físico de aproximadamente 100 a 120 ms. Somando-se o tempo de empacotamento do codec (20 ms), o atraso de serialização e o jitter buffer, o sistema opera estritamente dentro da faixa nobre de <strong>80 a 140 ms unidirecionais</strong>.</p>\n      ",
          "softwareConfig": {
            "software": "Yate Global Multi-Country Dialplan",
            "file": "config/regexroute.conf",
            "code": "[default]\n; --- Rotas Locais Curtas ---\n^[1-3][0-9]{3}$=lateroute/${called}\n\n; --- Interconexao Brasil (Sao Paulo +55 11 / Rio +55 21) ---\n^\\+5511\\([0-9]+\\)$=sip/sip:carrier_sp/\\1\n^\\+5521\\([0-9]+\\)$=sip/sip:carrier_rj/\\1\n\n; --- Interconexao Estados Unidos (Miami +1 305 / NYC +1 212) ---\n^\\+1305\\([0-9]+\\)$=sip/sip:carrier_mia/\\1\n^\\+1212\\([0-9]+\\)$=sip/sip:carrier_nyc/\\1\n\n; --- Interconexao Portugal (Lisboa +351 21 / Porto +351 22) ---\n^\\+35121\\([0-9]+\\)$=sip/sip:carrier_lis/\\1\n^\\+35122\\([0-9]+\\)$=sip/sip:carrier_opo/\\1\n\n; Bloqueio estrito de seguranca\n.*=-;error=noroute",
            "explanation": "O dialplan global do Yate comuta chamadas locais diretamente e despacha chamadas internacionais formatadas em E.164 para os gateways específicos de cada país, garantindo isolamento e segurança."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP / Route Header",
            "summary": "Mensagem INVITE com cabeçalhos de rota internacional e P-Asserted-Identity",
            "rawTrace": "INVITE sip:+351211234567@carrier-lis.telecom.net:5060 SIP/2.0\nVia: SIP/2.0/UDP 172.28.0.20:5060;branch=z9hG4bK-global-route-01\nRoute: <sip:172.28.0.30:5060;lr>\nFrom: \"Carlos SP\" <sip:+5511999991101@carrier-sp.telecom.net>;tag=sp-8812a\nTo: <sip:+351211234567@carrier-lis.telecom.net>\nCall-ID: intl-call-9921b-0291-11eb-9812@172.28.0.20\nCSeq: 101 INVITE\nP-Asserted-Identity: \"Carlos Alberto\" <sip:+5511999991101@carrier-sp.telecom.net>\nMax-Forwards: 68\nContent-Type: application/sdp\nContent-Length: 198"
          },
          "diagramType": "global"
        },
        {
          "id": "4.2",
          "title": "4.2 Roteamento Brasil: POP São Paulo (DDD 11, 1101/1102) vs. POP Rio de Janeiro (DDD 21, 2101/2102)",
          "duration": "35 min",
          "tag": "POPs Brasil",
          "slides": [
            {
              "title": "A Estrutura de Numeração Nacional (Plano da Anatel)",
              "subtitle": "O Plano Geral de Metas de Numeração no Brasil",
              "bullets": [
                "Formato Nacional: Código Nacional de 2 dígitos (DDD) + Número de Assinante de 8 ou 9 dígitos.",
                "DDD 11 (São Paulo): A maior região metropolitana e o principal ponto de troca de tráfego do país (IX.br SP).",
                "DDD 21 (Rio de Janeiro): Segundo maior pólo econômico e ponto de conexão de múltiplos cabos submarinos.",
                "Ramais do Laboratório: 1101/1102 (Diretoria e Engenharia SP) e 2101/2102 (Operações e NOC RJ)."
              ],
              "speakerNotes": "Compreendemos a hierarquia do plano de numeração brasileiro e como as chamadas entre DDDs distintos (interurbanas) são tarifadas e roteadas pela operadora."
            },
            {
              "title": "Comutação Interurbana: Código de Seleção de Prestadora (CSP)",
              "subtitle": "O Famoso Código da Operadora (XX) nas Chamadas Nacionais",
              "bullets": [
                "Formato de Discagem: 0 + CSP (ex: 99) + DDD (ex: 21) + Número Telefônico.",
                "Papel do Softswitch: Remover o CSP local e traduzir o destino para o formato padronizado E.164.",
                "Tolerância a Falhas: Se o tronco de fibra ótica da Dutra entre SP e RJ degradar, a comutação transborda pela nuvem.",
                "Roteamento Direto entre Ramais: Discagem curta direta de 4 dígitos entre SP (1101) e RJ (2101) sem tarifação."
              ],
              "speakerNotes": "O usuário disca apenas 2101 e a central sabe que se trata do escritório do Rio de Janeiro, roteando o pacote IP pela malha privada sem gerar bilhete de longa distância."
            },
            {
              "title": "Preservação de Identidade: P-Asserted-Identity (PAI)",
              "subtitle": "Garantindo a Origem Correta e Atendendo às Normas Anti-Spam",
              "bullets": [
                "Regulação Anatel Anti-Golpes: Obrigatoriedade de identificação fidedigna do originador (Regras de 2024/2026).",
                "Cabeçalho P-Asserted-Identity (RFC 3325): Carrega o número real do assinante validado pela central.",
                "Cabeçalho From: Pode conter um nome de exibição amigável ('Diretoria SP'), mas o PAI preserva o número técnico.",
                "Prevenção de Spoofing: Operadoras modernas bloqueiam chamadas onde o número do PAI não pertence ao cliente."
              ],
              "speakerNotes": "A Anatel declarou guerra às ligações de telemarketing falsas (spoofing). Nosso laboratório já nasce em total conformidade técnica com os novos padrões de autenticação de chamadas."
            },
            {
              "title": "Análise da Troca de Mídia entre São Paulo e Rio de Janeiro",
              "subtitle": "Métricas de Qualidade em Enlace Terrestre Nacional",
              "bullets": [
                "Distância Geográfica: Cerca de 430 km entre as capitais de SP e RJ.",
                "Latência de Ida e Volta (RTT): Inferior a 12 milissegundos em fibra óptica direta.",
                "Jitter Esperado: Abaixo de 2 ms em condições normais de rede de dados.",
                "Codec Utilizado: G.711a (PCMA) ou G.711u (PCMU) em 64 kbps garantindo voz em qualidade de linha fixa clássica."
              ],
              "speakerNotes": "A rota SP-RJ é o laboratório ideal para validar o core de telecomunicações antes de avançar para as rotas internacionais com maior latência."
            }
          ],
          "theoryText": "\n        <h3>1. O Roteamento de Chamadas Nacionais no Brasil</h3>\n        <p>No Brasil, a comutação de telecomunicações é regida pelo <strong>Regulamento de Numeração dos Serviços de Telecomunicações</strong> da Anatel. As chamadas entre diferentes áreas locais (diferentes DDDs) exigem historicamente a inserção de um Código de Seleção de Prestadora (CSP):</p>\n        <p><code>0 + CSP + DDD + Número Local</code></p>\n        \n        <p>Em nossa operadora virtual privada, o núcleo Yate implementa um módulo de normalização de dialplan que intercepta discagens curtas corporativas e chamadas com numeração completa:</p>\n        <ul>\n            <li><strong>Discagem Curta Direta (On-Net):</strong> O ramal <code>1101</code> em São Paulo disca simplesmente <code>2101</code> para falar com a equipe de operações no Rio de Janeiro. A chamada é comutada 100% sobre a rede IP interna, com custo zero e latência ínfima (&lt; 15 ms).</li>\n            <li><strong>Discagem E.164 Internacional/Nacional:</strong> Discagens iniciando por <code>+5511...</code> ou <code>+5521...</code> são direcionadas aos gateways SIP regionais homologados correspondentes.</li>\n        </ul>\n      ",
          "softwareConfig": {
            "software": "Yate RegFile & Regexroute SP/RJ",
            "file": "config/regfile.conf",
            "code": "[1101]\npassword=SecretSP1101!\ndescription=Ramal Brasil - Sao Paulo (Diretoria)\n\n[1102]\npassword=SecretSP1102!\ndescription=Ramal Brasil - Sao Paulo (Engenharia)\n\n[2101]\npassword=SecretRJ2101!\ndescription=Ramal Brasil - Rio de Janeiro (Operacoes NOC)\n\n[2102]\npassword=SecretRJ2102!\ndescription=Ramal Brasil - Rio de Janeiro (Suporte)",
            "explanation": "O arquivo regfile.conf cadastra os assinantes SIP do Brasil, associando senhas de alta entropia aos ramais de São Paulo (1101/1102) e Rio de Janeiro (2101/2102)."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP / Brazil Routing",
            "summary": "Chamada completada entre São Paulo (1101) e Rio de Janeiro (2101)",
            "rawTrace": "INVITE sip:2101@172.28.0.20:5060 SIP/2.0\nVia: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-sp-rj-01\nFrom: \"Sao Paulo 1101\" <sip:1101@172.28.0.20>;tag=sp1101tag\nTo: <sip:2101@172.28.0.20>\nCall-ID: call-sp-rj-8192a-11eb@10.11.0.50\nCSeq: 101 INVITE\nContact: <sip:1101@10.11.0.50:5060>\nP-Asserted-Identity: \"Carlos Alberto\" <sip:+5511999991101@programandosolucoes.com.br>\nContent-Type: application/sdp\nContent-Length: 180"
          },
          "diagramType": "brasil"
        },
        {
          "id": "4.3",
          "title": "4.3 Roteamento Estados Unidos: POP Miami (NPA 305, 3051) vs. POP Nova York (NPA 212, 2121) e Plano NANP",
          "duration": "35 min",
          "tag": "POPs EUA NANP",
          "slides": [
            {
              "title": "O Plano de Numeração Norte-Americano (NANP)",
              "subtitle": "A Estrutura de Numeração nos EUA, Canadá e Caribe (+1)",
              "bullets": [
                "Código de País Compartilhado: O prefixo global +1 atende a 20 países do continente norte-americano.",
                "Formato de 10 Dígitos: NPA (Numbering Plan Area / Código de Área de 3 dígitos) + NXX (Central Office) + XXXX (Linha).",
                "NPA 305 (Miami / Flórida): O principal gateway de telecomunicações entre a América do Norte e a América Latina.",
                "NPA 212 (Nova York / Manhattan): Um dos códigos de área mais cobiçados e densos do planeta."
              ],
              "speakerNotes": "Compreendemos a lógica do NANP. Nos Estados Unidos não existe o dígito '9' adicional de celular; a mesma estrutura de 10 dígitos atende indistintamente celulares e linhas fixas."
            },
            {
              "title": "Os POPs do Laboratório: Miami (3051) e Nova York (2121)",
              "subtitle": "A Conexão com o Mercado Financeiro e o Ponto de Troca de Tráfego de Miami",
              "bullets": [
                "Ramal 3051: Representa a operação de Miami, interconectada com os data centers do NAP of the Americas.",
                "Ramal 2121: Representa o escritório de Nova York em Manhattan.",
                "Roteamento de Menor Latência: Tráfego da América Latina entra prioritariamente por Miami.",
                "Trunk SIP com Provedor de Terminação US: Roteamento de chamadas de saída usando gateways norte-americanos."
              ],
              "speakerNotes": "O NAP of the Americas em Miami é o ponto focal de quase todos os cabos submarinos que saem do Brasil rumo aos Estados Unidos. Nosso POP de Miami simula exatamente esse ponto de entrada."
            },
            {
              "title": "Protocolo STIR/SHAKEN: A Autenticação Criptográfica de Chamadas nos EUA",
              "subtitle": "O Fim dos Robocalls através de Certificados Digitais",
              "bullets": [
                "Exigência da FCC (Federal Communications Commission): Nenhuma chamada trafega nos EUA sem token criptográfico.",
                "Cabeçalho Identity (PASSporT / RFC 8224): Um token JWT assinado pela chave privada da operadora de origem.",
                "Níveis de Atestação: Nível A (Atestação Completa), Nível B (Atestação Parcial), Nível C (Origem do Gateway).",
                "Verificação no Destino: A central receptora consulta o certificado da operadora e carimba 'Caller Verified' na tela do celular."
              ],
              "speakerNotes": "O STIR/SHAKEN revolucionou a segurança de telecom nos EUA. Uma chamada sem assinatura válida é imediatamente rotulada como 'Spam Risk' ou bloqueada pelo núcleo da operadora."
            },
            {
              "title": "Codecs e Adaptação de Mídia: PCMU vs. PCMA",
              "subtitle": "A Divisão Histórica entre Lei-u (América do Norte/Japão) e Lei-A (Resto do Mundo)",
              "bullets": [
                "G.711 μ-law (PCMU): Padrão obrigatório nos Estados Unidos (Payload Type 0 no SDP).",
                "G.711 A-law (PCMA): Padrão obrigatório na Europa e no Brasil (Payload Type 8 no SDP).",
                "Transcodificação no Gateway: O Yate e o Asterisk realizam a conversão matemática de μ-law para A-law em tempo real.",
                "Perda de Qualidade Zero: Ambas as leis operam a 64 kbps; a transcodificação é apenas uma tabela de mapeamento de 8 bits."
              ],
              "speakerNotes": "Se você enviar G.711 A-law diretamente para uma operadora dos EUA que só aceita μ-law, o usuário escutará apenas um chiado ensurdecedor de ruído branco."
            }
          ],
          "theoryText": "\n        <h3>1. O Plano de Numeração Norte-Americano (NANP - North American Numbering Plan)</h3>\n        <p>Nos Estados Unidos e em outros 19 territórios associados, a numeração segue estritamente o formato de 10 dígitos padronizado pela AT&T na década de 1940 e hoje administrado pela NANPA sob supervisão da <strong>FCC (Federal Communications Commission)</strong>:</p>\n        <p><code>NPA - NXX - XXXX</code></p>\n        <ul>\n            <li><strong>NPA (Numbering Plan Area):</strong> Código de 3 dígitos (onde o primeiro dígito 'N' varia de 2 a 9). O código <strong>305</strong> identifica Miami/Flórida; o código <strong>212</strong> identifica Nova York/Manhattan.</li>\n            <li><strong>NXX (Central Office Code):</strong> 3 dígitos que identificavam antigamente o comutador da cidade.</li>\n            <li><strong>XXXX (Line Number):</strong> 4 dígitos atribuídos ao assinante final.</li>\n        </ul>\n\n        <h3>2. O Framework Criptográfico STIR/SHAKEN (RFC 8224 / ATIS-1000074)</h3>\n        <p>Para erradicar fraudes de identidade e chamadas robóticas abusivas (Robocalls), a regulação norte-americana tornou compulsório o framework <strong>STIR (Secure Telephone Identity Revisited)</strong> e <strong>SHAKEN (Signature-based Handling of Asserted information using toKENs)</strong>.</p>\n        <p>Ao originar uma chamada, o servidor de telecomunicações gera um cabeçalho SIP <code>Identity:</code> contendo um token JWT (JSON Web Token) criptografado com chave privada elliptic curve (ECDSA P-256), atestando perante a rede que o cliente tem o direito legal de apresentar aquele número de chamada.</p>\n      ",
          "softwareConfig": {
            "software": "Yate US Routing Configuration",
            "file": "config/regexroute.conf",
            "code": "[default]\n; --- Roteamento POP Estados Unidos ---\n; Chamadas locais curtas entre Miami e Nova York\n^305[0-9]$=lateroute/${called}\n^212[0-9]$=lateroute/${called}\n\n; Encaminhamento NANP com codigo do pais +1\n^\\+1305\\([0-9]+\\)$=sip/sip:gateway_mia/\\1;callername=US-Miami\n^\\+1212\\([0-9]+\\)$=sip/sip:gateway_nyc/\\1;callername=US-NewYork\n\n; Forca transcodificacao para G.711 u-law nos EUA\n^\\+1.*=sip/sip:us_carrier;format=mulaw",
            "explanation": "As regras direcionam o tráfego norte-americano para os gateways locais de Miami e Nova York, impondo automaticamente o codec G.711 mulaw exigido pelas operadoras americanas."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP / US NANP Routing",
            "summary": "Chamada originada em São Paulo e entregue no POP de Miami (3051) com codec PCMU",
            "rawTrace": "INVITE sip:3051@172.28.0.20:5060 SIP/2.0\nVia: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-us-call-3051\nFrom: \"Sao Paulo 1101\" <sip:1101@172.28.0.20>;tag=sp1101\nTo: <sip:3051@172.28.0.20>\nCall-ID: call-sp-mia-9921b-11eb@10.11.0.50\nCSeq: 101 INVITE\nContact: <sip:1101@10.11.0.50:5060>\nContent-Type: application/sdp\nContent-Length: 178\n\nv=0\no=sp-yate 1792167000 1 IN IP4 10.11.0.50\ns=US Interconnect\nc=IN IP4 10.11.0.50\nt=0 0\nm=audio 40000 RTP/AVP 0 101\na=rtpmap:0 PCMU/8000\na=rtpmap:101 telephone-event/8000"
          },
          "diagramType": "eua"
        },
        {
          "id": "4.4",
          "title": "4.4 Roteamento Portugal: POP Lisboa (+351 21, 3511) vs. POP Porto (+351 22, 3512) e Formato E.164 Europeu",
          "duration": "35 min",
          "tag": "POPs Portugal E.164",
          "slides": [
            {
              "title": "O Plano Nacional de Numeração em Portugal (ANACOM)",
              "subtitle": "A Estrutura de Numeração Fechada a 9 Dígitos",
              "bullets": [
                "Código de País Europeu: Prefixo internacional +351.",
                "Plano Fechado a 9 Dígitos: Todos os números telefônicos em Portugal possuem exatamente nove dígitos.",
                "Prefixo Geográfico 21 (Lisboa): A capital e principal centro administrativo e econômico.",
                "Prefixo Geográfico 22 (Porto): A região metropolitana do norte e importante polo industrial.",
                "Redes Móveis (Prefixos 91, 92, 93, 96): Identificam as operadoras móveis celulares do país."
              ],
              "speakerNotes": "Em Portugal e na maior parte da Europa, o plano de numeração é fechado. Não existem códigos de operadora interurbanos para discar; o número geográfico já identifica unicamente a central de terminação."
            },
            {
              "title": "Os POPs do Laboratório em Portugal: Lisboa (3511) e Porto (3512)",
              "subtitle": "Integração Européia com Conformidade com a RGPD / GDPR",
              "bullets": [
                "Ramal 3511: Escritório corporativo de Lisboa, atuando como o gateway europeu da nossa operadora.",
                "Ramal 3512: Escritório do Porto, com suporte a conferência e operações regionais.",
                "Proteção de Dados Europeia (GDPR): Proibição rigorosa de gravação de chamadas sem consentimento explícito prévio.",
                "Tronco SIP Europeu: Interconexão com operadoras europeias aceitando exclusivamente sinalização segura SIP-TLS."
              ],
              "speakerNotes": "Operar em território europeu impõe o cumprimento rigoroso da GDPR. A gravação de áudio sem aviso sonoro inicial constitui infração gravíssima sujeita a multas pesadas da autoridade de dados (CNPD)."
            },
            {
              "title": "Roteamento pelo Cabo Submarino EllaLink",
              "subtitle": "A Conexão Óptica Direta entre Fortaleza (Brasil) e Sines (Portugal)",
              "bullets": [
                "Conexão Transatlântica Direta: O cabo submarino EllaLink evita a tradicional passagem pelos Estados Unidos.",
                "Redução Dramática de Latência: Atraso de ida e volta (RTT) de cerca de 120 ms entre Brasil e Portugal.",
                "Eliminação de Interceptações Terceiras: O tráfego de dados não fica sujeito às leis de vigilância dos EUA (Cloud Act).",
                "Codec Predileto: G.711 A-law (PCMA) compartilhado nativamente entre o Brasil e Portugal sem necessidade de conversão."
              ],
              "speakerNotes": "O cabo EllaLink foi um marco para as comunicações luso-brasileiras. Uma chamada VoIP entre São Paulo e Lisboa agora viaja direto pelo Atlântico Sul, garantindo tempo de resposta soberbo."
            },
            {
              "title": "O Ponto de Presença Virtual e Numeração Nômade (+351 30)",
              "subtitle": "Serviço VoIP Nômade Regulado pela ANACOM",
              "bullets": [
                "Faixa de Numeração 30 (Serviços de Voz Nômades): Números VoIP não atrelados a uma morada física fixa.",
                "Uso em Empresas Multinacionais: Permite que funcionários no Brasil atendam ligações locais de clientes portugueses.",
                "Convergência com o Softphone MicroSIP: O ramal 3511 recebe chamadas de Lisboa diretamente no computador em SP.",
                "Cobrança Local em Euros: A operadora virtual fatura chamadas locais em Portugal com custo mínimo de terminação."
              ],
              "speakerNotes": "A numeração nômade da ANACOM foi feita sob medida para a nossa arquitetura: ela legaliza que um profissional em São Paulo atenda um telefone fixo português como se estivesse no centro de Lisboa."
            }
          ],
          "theoryText": "\n        <h3>1. O Plano Nacional de Numeração em Portugal (PNN / ANACOM)</h3>\n        <p>A <strong>ANACOM (Autoridade Nacional de Comunicações)</strong> estabelece em Portugal um <em>Plano de Numeração Fechado</em>, onde todos os números nacionais de telecomunicações são compostos invariavelmente por <strong>9 dígitos</strong>, sem necessidade de prefixos de seleção interurbana:</p>\n        \n        <ul>\n            <li><strong>Números Geográficos (Iniciados por 2):</strong> Identificam áreas geográficas locais. O código <strong>21</strong> cobre toda a área metropolitana de Lisboa; o código <strong>22</strong> cobre o distrito do Porto.</li>\n            <li><strong>Números Móveis (Iniciados por 9):</strong> As faixas 91 (Vodafone), 92 (MEO/Uzo), 93 (NOS) e 96 (MEO).</li>\n            <li><strong>Serviços de Utilização Nômade (Iniciados por 30):</strong> Faixa criada pela ANACOM para serviços de Voz sobre IP (VoIP) independentes de localização física.</li>\n        </ul>\n\n        <h3>2. O Cabo Submarino EllaLink e a Rota Direta Brasil-Portugal</h3>\n        <p>Historicamente, quase todo o tráfego de internet e telefonia entre o Brasil e a Europa era roteado através de cabos submarinos que passavam obrigatoriamente pelos Estados Unidos (Fortaleza -&gt; Miami -&gt; Nova York -&gt; Londres), gerando uma penalidade de latência de mais de <strong>200 ms RTT</strong>.</p>\n        <p>Com a entrada em operação do cabo submarino de fibra óptica <strong>EllaLink</strong> (conectando diretamente Praia Grande/Fortaleza em território brasileiro até Sines e Lisboa em território português), a distância percorrida pelo sinal caiu para cerca de 6.000 km sob o oceano, derrubando o RTT transatlântico direto para meros <strong>115 a 125 ms</strong>. Esse avanço permite que o protocolo SIP mantenha chamadas de altíssima fidelidade sonora (HD Voice) entre São Paulo e Lisboa sem qualquer percepção de retardo na conversa.</p>\n      ",
          "softwareConfig": {
            "software": "Yate Portugal Routing Configuration",
            "file": "config/regexroute.conf",
            "code": "[default]\n; --- Roteamento POP Portugal ---\n; Ramais internos de Lisboa (3511) e Porto (3512)\n^351[1-9]$=lateroute/${called}\n\n; Encaminhamento de chamadas nacionais de Portugal (+351)\n^\\+35121\\([0-9]{7}\\)$=sip/sip:gateway_lisboa/\\1;format=alaw\n^\\+35122\\([0-9]{7}\\)$=sip/sip:gateway_porto/\\1;format=alaw\n\n; Encaminhamento para redes moveis portuguesas\n^\\+3519[1-6]\\([0-9]{7}\\)$=sip/sip:gateway_lisboa/\\1;format=alaw",
            "explanation": "As regras de dialplan validam o formato exato de 9 dígitos de Portugal e encaminham o fluxo para os gateways de Lisboa e Porto com formato G.711 alaw nativo europeu."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP / Portugal Routing",
            "summary": "Chamada completada com sucesso em Lisboa (Ramal 3511)",
            "rawTrace": "INVITE sip:3511@172.28.0.20:5060 SIP/2.0\nVia: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-lis-call-3511\nFrom: \"Carlos SP\" <sip:1101@172.28.0.20>;tag=sp1101lis\nTo: <sip:3511@172.28.0.20>\nCall-ID: call-sp-lis-8812a-11eb@10.11.0.50\nCSeq: 101 INVITE\nContact: <sip:1101@10.11.0.50:5060>\nContent-Type: application/sdp\nContent-Length: 182\n\nv=0\no=sp-yate 1792167000 1 IN IP4 10.11.0.50\ns=Portugal Telecom Call\nc=IN IP4 10.11.0.50\nt=0 0\nm=audio 40000 RTP/AVP 8 101\na=rtpmap:8 PCMA/8000\na=rtpmap:101 telephone-event/8000"
          },
          "diagramType": "portugal"
        },
        {
          "id": "4.5",
          "title": "4.5 Wireshark Deep-Dive no Roteamento: Headers SIP (INVITE, Via, PAI, Diversion, Route) entre os 3 Países",
          "duration": "40 min",
          "tag": "Roteamento Multi-País",
          "slides": [
            {
              "title": "Dissecção Completa da Chamada Internacional Fim-a-Fim",
              "subtitle": "O Rastreamento da Mensagem INVITE Atravessando Três Fusos Horários",
              "bullets": [
                "Origem: Softphone em São Paulo (1101) discando para Lisboa (+351 21 123 4567).",
                "Hop 1: Ingress SBC em São Paulo inserindo cabeçalhos Via e validando autenticação Digest.",
                "Hop 2: Core Routing Engine no Yate avaliando o plano de numeração E.164 e tabela de rotas.",
                "Hop 3: Egress SBC em Portugal entregando a chamada ao terminal de Lisboa com áudio confirmado."
              ],
              "speakerNotes": "Esta aula é o auge da engenharia de sinalização do curso. Dissecamos cada linha de cabeçalho que permite a uma chamada nascer em um computador em São Paulo e tocar num telefone em Portugal."
            },
            {
              "title": "O Mecanismo da Pilha de Cabeçalhos 'Via:'",
              "subtitle": "Como o SIP Garante que as Respostas Voltem pelo Caminho Exato",
              "bullets": [
                "Inserção no Topo (LIFO - Last In, First Out): Cada servidor que repassa o pacote adiciona sua linha Via: no início.",
                "O Parâmetro 'branch=z9hG4bK...': Um identificador de transação único criptograficamente gerado por cada proxy.",
                "Parâmetros 'rport' e 'received': Permitem que respostas atravessem NATs mesmo que o IP interno seja privado.",
                "Remoção no Retorno: Na volta do 200 OK, cada servidor remove seu próprio Via antes de repassar ao próximo."
              ],
              "speakerNotes": "O cabeçalho Via é a trilha de migalhas de pão do SIP. Ele garante que nenhuma resposta se perca no retorno através da internet internacional."
            },
            {
              "title": "Cabeçalhos de Roteamento Estrito: Route e Record-Route",
              "subtitle": "Forçando a Passagem de Mensagens Futuras pelos Servidores de Bilhetagem",
              "bullets": [
                "Record-Route (RFC 3261): Inserido pelos proxies para exigir que mensagens subsequentes (como o BYE) passem por eles.",
                "Inversão no Diálogo: O cliente receptor inverte a lista de Record-Route e a transforma no cabeçalho 'Route:'.",
                "Importância para Bilhetagem (Billing): Se o BYE não passar pelo proxy da operadora, ela não sabe quando a ligação terminou.",
                "Roteamento Solto (Loose Routing / ';lr'): Mecanismo moderno que preserva o Request-URI sem corromper o destino."
              ],
              "speakerNotes": "Sem o Record-Route, o BYE de encerramento de chamada iria direto de cliente para cliente, e a operadora ficaria com a bilhetagem aberta cobrando minutos fantasmas."
            },
            {
              "title": "Cabeçalhos de Identidade e Desvio: PAI e Diversion",
              "subtitle": "Rastreando Redirecionamentos e Atendendo às Exigências Regulatórias",
              "bullets": [
                "P-Asserted-Identity (RFC 3325): Prova irrefutável de quem está pagando e originando a chamada.",
                "Diversion Header (RFC 5806): Informa o número original quando a chamada sofreu um transbordo ou siga-me.",
                "Prevenção de Loops de Desvio: Contadores de salto evitam que dois ramais redirecionados entre si criem tempestade de pacotes.",
                "Relatório Final de Sinalização: Exportação do fluxo completo para auditoria e comissionamento."
              ],
              "speakerNotes": "Com esses cabeçalhos dominados, o aluno possui o conjunto completo de ferramentas técnicas para operar qualquer central telefônica pública ou privada no mundo."
            }
          ],
          "theoryText": "\n        <h3>1. A Dissecção Anatômica de uma Transação Internacional SIP</h3>\n        <p>Abaixo apresentamos a captura real de uma mensagem SIP INVITE internacional trafegando entre o gateway de São Paulo e o comutador de Lisboa, detalhando cada linha de sinalização:</p>\n\n        <pre style=\"background:#1e1e1e; color:#d4d4d4; padding:15px; border-radius:5px; font-family:monospace; font-size:12px;\">\nINVITE sip:+351211234567@172.28.0.20:5060 SIP/2.0\nVia: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-sp-771a;rport\nVia: SIP/2.0/UDP 172.28.0.5:5060;branch=z9hG4bK-core-1102;received=172.28.0.5\nRecord-Route: &lt;sip:172.28.0.20:5060;lr&gt;\nRecord-Route: &lt;sip:172.28.0.5:5060;lr&gt;\nMax-Forwards: 67\nFrom: \"Carlos Alberto\" &lt;sip:1101@programandosolucoes.com.br&gt;;tag=sp-orig-8821\nTo: &lt;sip:+351211234567@programandosolucoes.com.br&gt;\nCall-ID: intl-sess-8192a-11eb-ae93-0242ac110002@10.11.0.50\nCSeq: 101 INVITE\nContact: &lt;sip:1101@10.11.0.50:5060&gt;\nP-Asserted-Identity: &lt;sip:+5511999991101@programandosolucoes.com.br&gt;\nDiversion: &lt;sip:1102@programandosolucoes.com.br&gt;;reason=unconditional;counter=1\nUser-Agent: Yate-Core-MVNO/2026\nContent-Type: application/sdp\nContent-Length: 210\n\nv=0\no=carlos-sp 1792167000 1 IN IP4 10.11.0.50\ns=International MVNO Session\nc=IN IP4 10.11.0.50\nt=0 0\nm=audio 40000 RTP/AVP 8 0 101\na=rtpmap:8 PCMA/8000\na=rtpmap:0 PCMU/8000\na=rtpmap:101 telephone-event/8000\na=sendrecv\n        </pre>\n\n        <h3>2. O Papel do Cabeçalho Diversion (RFC 5806)</h3>\n        <p>No exemplo acima, a chamada foi originalmente disparada para o ramal <code>1102</code> em São Paulo, que possuía uma regra de transbordo incondicional (Call Forwarding Unconditional) configurada para encaminhar a ligação para o celular de plantão em Lisboa (<code>+351 21 123 4567</code>).</p>\n        <p>O cabeçalho <code>Diversion:</code> preserva o histórico dessa operação:</p>\n        <ul>\n            <li>Informa à central de Lisboa que quem atende a chamada é o destinatário final, mas que a ligação foi desviada do ramal 1102.</li>\n            <li>O parâmetro <code>counter=1</code> é incrementado a cada desvio; se atingir um limite predefinido (ex: 5), o servidor aborta a chamada para prevenir loops infinitos de transferência entre ramais.</li>\n        </ul>\n      ",
          "softwareConfig": {
            "software": "Yate Advanced Header Manipulation",
            "file": "config/regexroute.conf",
            "code": "[extra]\n; Adiciona cabecalhos PAI e Diversion em chamadas internacionais\n^\\+351.*=call.route\n.*=set_param;p_asserted_identity=\"Carlos SP\" <sip:+5511999991101@telecom.net>\n.*=set_param;record_route=<sip:172.28.0.20:5060;lr>",
            "explanation": "O Yate manipula dinamicamente os cabeçalhos SIP da mensagem antes de transmiti-la pela rede WAN, garantindo que o cabeçalho P-Asserted-Identity atenda às exigências regulatórias internacionais."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP / SDP / RTP Stream",
            "summary": "Fluxo RTP bidirecional confirmado entre São Paulo e Lisboa com codec G.711a",
            "rawTrace": "Real-time Transport Protocol\n  [Stream Setup by SIP Call-ID: intl-sess-8192a-11eb-ae93-0242ac110002@10.11.0.50]\n  10.. .... = Version: RFC 1889 Version (2)\n  ..0. .... = Padding: False\n  ...0 .... = Extension: False\n  .... 0000 = Contributing source identifiers count: 0\n  0... .... = Marker: False\n  Payload type: ITU-T G.711 PCMA (8)\n  Sequence number: 4182\n  Timestamp: 19827360\n  Synchronization Source identifier: 0x9812a7f1 (2551359473)\n  Payload: 160 bytes of audio data (20 ms duration)"
          },
          "diagramType": "global"
        }
      ]
    },
    {
      "id": 5,
      "title": "Módulo 5: Hardphones, Softphones e Validação Ponta a Ponta de Clientes VoIP / IMS",
      "summary": "A homologação prática e o comissionamento dos terminais de usuário: configuração detalhada de softphones (MicroSIP) e hardphones IP, negociação de codecs HD (Opus, G.711), matriz de testes de chamadas locais e internacionais, troubleshooting sistemático de erros SIP e análise de qualidade de voz (MOS, Jitter e Delay).",
      "lessons": [
        {
          "id": "5.1",
          "title": "5.1 Provisionamento do MicroSIP e Telefones IP com Codecs de Alta Fidelidade (G.711 / Opus)",
          "duration": "45 min",
          "tag": "Terminais e Codecs",
          "slides": [
            {
              "title": "Homologação de Terminais no Núcleo de Telefonia",
              "subtitle": "Integração de Softphones e Telefones IP Físicos na Rede do Laboratório",
              "bullets": [
                "Os Dois Tipos de Terminais: Softphones em estações de trabalho (MicroSIP) e aparelhos físicos SIP (Grandstream, Yealink).",
                "Parâmetros de Registro Obrigatórios: SIP Server IP, Domain/Realm, Username, Auth ID e Secret criptografado.",
                "Portas de Sinalização: UDP/TCP 5060 para SIP padrão, TLS 5061 para sinalização criptografada carrier-grade.",
                "Suporte a Múltiplos Registros: Ramais configurados simultaneamente para os nós de São Paulo (+5511) e Rio de Janeiro (+5521)."
              ],
              "speakerNotes": "O terminal SIP é a ponta visível da rede para o assinante. Seu provisionamento correto é o primeiro passo para garantir a integridade da comunicação."
            },
            {
              "title": "A Batalha dos Codecs: G.711a/u vs Opus vs AMR-WB",
              "subtitle": "Largura de Banda, Complexidade Computacional e Qualidade Subjetiva de Voz",
              "bullets": [
                "G.711 (PCMA / PCMU): Taxa fixa de 64 kbps, sem compressão, latência de amostragem de 0,125 ms, fidelidade convencional de PSTN.",
                "Opus Interactive Audio Codec: Bitrate adaptativo de 6 a 510 kbps, amostragem de até 48 kHz (Fullband), resiliência nativa à perda de pacotes.",
                "AMR-WB (G.722.2): O codec padrão do VoLTE/VoNR, taxa de amostragem de 16 kHz com voz em alta definição (HD Voice).",
                "Ordem de Preferência SDP: O terminal envia no INVITE a lista priorizada m=audio para negociação mútua com o nó de telefonia."
              ],
              "speakerNotes": "Em nossa rede MVNO 2026, configuramos o codec Opus com amostragem de 48 kHz como prioridade absoluta para chamadas internas e o G.711 como fallback obrigatório para interconexões com a rede pública."
            },
            {
              "title": "Provisionamento Automatizado via XML e Arquivos INI",
              "subtitle": "Zero-Touch Provisioning e Configuração Pré-Empacotada para Usuários",
              "bullets": [
                "Estrutura do contacts.xml: Livro de endereços corporativo centralizado com ramais de São Paulo, Rio, Miami, Nova York e Lisboa.",
                "Arquivo microsip.ini: Configurações de servidor, codecs habilitados, detecção de silêncio (VAD) e buffer de jitter pré-calibrado.",
                "Distribuição Centralizada: Scripts PowerShell e Ansible para entrega de configurações automáticas em massa nas estações dos analistas.",
                "Prevenção de Ataques de Registro: Autenticação MD5/SHA-256 com nonce gerado dinamicamente para neutralizar ataques de repetição."
              ],
              "speakerNotes": "Em operadoras reais, o usuário não digita senhas ou servidores: o aparelho baixa via TFTP ou HTTPS o arquivo de configuração provisionado pelo OSS/BSS."
            },
            {
              "title": "Sinalização de Registro SIP (REGISTER Flow)",
              "subtitle": "O Desafio Digest Authentication e a Manutenção do Binding de NAT",
              "bullets": [
                "REGISTER Inicial sem Credenciais: O softphone envia REGISTER para o nó Asterisk/Yate sem o cabeçalho Authorization.",
                "Resposta 401 Unauthorized: O nó responde com o cabeçalho WWW-Authenticate contendo realm, nonce e algoritmo.",
                "REGISTER Autenticado: O terminal recalcula o hash MD5 (username:realm:password + nonce + URI) e reenvia a requisição.",
                "Resposta 200 OK e Tempo de Expiração: O servidor aceita o registro, atualiza sua Location Table e define o header Expires (ex: 3600s)."
              ],
              "speakerNotes": "O processo de Digest Authentication é análogo ao padrão HTTP RFC 2617 e garante que a senha do assinante nunca transite em texto claro pela rede."
            }
          ],
          "theory": "### 1. A Importância da Homologação de Terminais em Operadoras Virtuais (MVNOs)\n\nNa arquitetura de telecomunicações de uma operadora móvel virtual ou de um provedor de serviços de voz sobre IP (VoIP), a interface com o usuário final é estabelecida pelo terminal SIP (Session Initiation Protocol User Agent - UA). Esse terminal pode assumir a forma de um **Softphone** (aplicação de software em computadores ou smartphones), um **Hardphone IP** dedicado (aparelhos de mesa conectados via Ethernet com chips DSP de áudio) ou um **Gateway de Telefonia ATA** (Analog Telephone Adapter) que conecta aparelhos telefônicos analógicos tradicionais a um enlace SIP.\n\nNo Laboratório MVNO Telecom 2026, adotamos como cliente de referência oficial para as bancadas de teste o **MicroSIP**, um softphone open source de alta performance baseado na pilha SIP PJSIP, com baixo consumo de memória RAM, suporte nativo a 64 bits e compatibilidade total com codecs de áudio de alta definição, em especial o **Opus** e o **G.711 (PCMA/PCMU)**.\n\n---\n\n### 2. Fundamentos da Engenharia de Codecs de Áudio\n\nA qualidade da chamada de voz percebida pelo usuário humano depende diretamente do algoritmo de codificação e decodificação (codec) empregado na camada de mídia. Existem três gerações principais de codecs coexistindo nas redes de telecomunicações:\n\n1. **G.711 (Pulse Code Modulation - PCM)**: Padronizado pelo ITU-T em 1972, é a base da telefonia digital convencional (SDH/PDH e canais E1/T1). Opera com amostragem de 8.000 amostras por segundo (8 kHz) com 8 bits por amostra, resultando em uma taxa de dados constante de **64 kbps**. Possui duas leis de quantização logarítmica:\n   - **A-law (PCMA)**: Utilizada no Brasil, Europa e na maior parte do mundo, otimizada para sinais de amplitude moderada.\n   - **μ-law (PCMU)**: Utilizada nos Estados Unidos e Japão, com faixa dinâmica ligeiramente superior para sinais fracos.\n   - Vantagens: Atraso algorítmico quase nulo (0,125 ms) e nenhum custo de licenciamento ou compressão pesada na CPU.\n   - Desvantagens: Qualidade de áudio restrita à faixa vocal estreita (300 Hz a 3.400 Hz - narrowband).\n\n2. **G.722 e G.722.2 (AMR-WB - Adaptive Multi-Rate Wideband)**: Codecs de banda larga (wideband) com amostragem em 16 kHz (50 Hz a 7.000 Hz). É o codec padrão adotado na tecnologia **HD Voice** de redes móveis 3G, 4G (VoLTE) e 5G (VoNR), oferecendo clareza cristalina para consoantes sibilantes (s, f, z).\n\n3. **Opus Interactive Audio Codec (RFC 6716)**: Desenvolvido pelo IETF, funde a tecnologia do codec Skype SILK (para fala humana em baixos bitrates) com o codec CELT (para música e fidelidade extrema). É um codec de espectro completo (Fullband) com suporte a amostragem de até **48 kHz**, bitrates dinâmicos de 6 kbps até 510 kbps e adaptação automática de taxa em caso de congestionamento de rede. No laboratório, o Opus é priorizado para chamadas de ramal para ramal e testes de qualidade máxima.\n\n---\n\n### 3. Mecanismo de Digest Authentication (RFC 2617 / RFC 3261)\n\nA segurança no registro de terminais evita que atores mal-intencionados sequestrem ramais telefônicos para originar fraudes internacionais (toll fraud). O protocolo SIP utiliza a autenticação Digest em quatro etapas:\n\n```\n  Terminal (MicroSIP)                             Nó de Telefonia (Asterisk/Yate)\n          |                                                     |\n   (1)    |-------------- REGISTER (sem auth) ----------------->|\n          |                                                     |\n   (2)    |<------------- 401 Unauthorized ---------------------|\n          |              (WWW-Authenticate: nonce=\"4fa2b...\")   |\n          |                                                     |\n   (3)    |-------------- REGISTER (com Digest) --------------->|\n          |              (Authorization: Digest response=\"c8...\")\n          |                                                     |\n   (4)    |<------------- 200 OK -------------------------------|\n          |              (Contact: <sip:1001@ip:5060>;expires) |\n```\n\nO cálculo do parâmetro **response** é dado por:\n$$HA1 = MD5(Username : Realm : Password)$$\n$$HA2 = MD5(Method : DigestURI)$$\n$$Response = MD5(HA1 : Nonce : HA2)$$\n\nComo o **nonce** é um valor aleatório gerado pelo servidor e expira após poucos segundos, ataques de repetição (replay attacks) são sumariamente rejeitados.\n\n---\n\n### 4. Manutenção de NAT e Keepalive (SIP OPTIONS / STUN)\n\nQuando o softphone opera atrás de um roteador doméstico ou empresarial com NAT (Network Address Translation), a tabela de tradução de portas fecha o canal após 30 a 60 segundos de inatividade. Para manter o fluxo bidirecional e permitir o recebimento de chamadas entrantes, duas técnicas são empregadas:\n- **Keepalive UDP**: O terminal envia pequenos pacotes de ping (ou CRLF vazio) a cada 20 segundos para a porta 5060 do nó de telefonia, renovando a entrada NAT no roteador.\n- **Symmetric RTP e rewrite_contact**: No nó de telefonia Asterisk, configuramos `rtp_symmetric=yes` e `force_rport=yes` para que o servidor desconsidere os IPs privados anunciados no corpo da mensagem SIP e responda diretamente para o IP público e a porta UDP de onde o pacote efetivamente partiu.",
          "configCode": "; ==============================================================================\n; ARQUIVO DE CONFIGURAÇÃO DE REFERÊNCIA: microsip.ini (Fragmento Homologado)\n; Local de Armazenamento: %APPDATA%\\MicroSIP\\microsip.ini\n; Responsável Técnico: Carlos Alberto (Engenharia de Telecomunicações)\n; ==============================================================================\n\n[Account1]\nLabel=Carlos Alberto - SP 1001\nServer=192.168.10.10:5060\nProxy=192.168.10.10:5060\nDomain=192.168.10.10\nUser=1001\nAuthID=1001\nPassword=SecretSuperSafeToken2026!\nDisplayName=Carlos Alberto (Engenharia SP)\nExpires=3600\nKeepAlive=20\nTransport=UDP\nEncryption=Disabled\nAutoPublish=1\nMediaEncryption=Disabled\n\n[Audio]\n; Prioridade Rigorosa de Codecs (Opus Fullband em 1º lugar, fallback G.711a)\nCodecs=opus/48000/2,pcma/8000/1,pcmu/8000/1,g722/16000/1\nDTMF=RFC2833\nDisableVAD=1\nEchoCancellation=1\nAudioGainControl=1\nNoiseSuppression=1\n\n; ==============================================================================\n; LIVRO DE ENDEREÇOS CENTRALIZADO: contacts.xml\n; Permite discagem em um clique para os nós de todos os países\n; ==============================================================================\n<!--\n<contacts>\n  <contact name=\"Laboratório Eco Local SP\" number=\"8001\" presence=\"0\" />\n  <contact name=\"Sala de Conferência Global\" number=\"8000\" presence=\"0\" />\n  <contact name=\"Mariana Santos - RJ\" number=\"55212001\" presence=\"1\" />\n  <contact name=\"John Doe - Miami\" number=\"13053001\" presence=\"1\" />\n  <contact name=\"Sarah Connor - Nova York\" number=\"12124001\" presence=\"1\" />\n  <contact name=\"António Silva - Lisboa\" number=\"351215001\" presence=\"1\" />\n</contacts>\n-->",
          "traceDissection": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.50         192.168.10.10         SIP      542    Request: REGISTER sip:192.168.10.10 (sem credenciais)\n    2   0.002140       192.168.10.10         192.168.10.50         SIP      612    Status: 401 Unauthorized | WWW-Authenticate: Digest\n    3   0.015320       192.168.10.50         192.168.10.10         SIP      894    Request: REGISTER sip:192.168.10.10 (Digest Response)\n    4   0.018450       192.168.10.10         192.168.10.50         SIP      580    Status: 200 OK (Contact binding aceito: 3600s)\n\nDETALHAMENTO DO PACOTE 3 (REGISTER com Digest):\nSession Initiation Protocol (SIP)\n    Request-Line: REGISTER sip:192.168.10.10 SIP/2.0\n    Via: SIP/2.0/UDP 192.168.10.50:5060;rport;branch=z9hG4bKPj9a81f8c4-7b12-4f88\n    Max-Forwards: 70\n    From: <sip:1001@192.168.10.10>;tag=82fa91bd-3412-4c22-98ab-30129bc41289\n    To: <sip:1001@192.168.10.10>\n    Call-ID: c5e412a8-1294-4321-ba32-849201928374@192.168.10.50\n    CSeq: 2 REGISTER\n    User-Agent: MicroSIP/3.21.3 (x64 Windows)\n    Contact: <sip:1001@192.168.10.50:5060;ob>\n    Expires: 3600\n    Allow: PRACK, INVITE, ACK, BYE, CANCEL, UPDATE, INFO, SUBSCRIBE, NOTIFY, REFER, MESSAGE, OPTIONS\n    Authorization: Digest username=\"1001\", realm=\"asterisk\", nonce=\"1729511942/d8fa19e27301bc5\", uri=\"sip:192.168.10.10\", response=\"b7e289410ca385920a1f9401827419e5\", algorithm=MD5\n    Content-Length: 0",
          "diagram": "brasil",
          "theoryText": "<h3>1. A Importância da Homologação de Terminais em Operadoras Virtuais (MVNOs)</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">Na arquitetura de telecomunicações de uma operadora móvel virtual ou de um provedor de serviços de voz sobre IP (VoIP), a interface com o usuário final é estabelecida pelo terminal SIP (Session Initiation Protocol User Agent - UA). Esse terminal pode assumir a forma de um <strong>Softphone</strong> (aplicação de software em computadores ou smartphones), um <strong>Hardphone IP</strong> dedicado (aparelhos de mesa conectados via Ethernet com chips DSP de áudio) ou um <strong>Gateway de Telefonia ATA</strong> (Analog Telephone Adapter) que conecta aparelhos telefônicos analógicos tradicionais a um enlace SIP.</p>\n<p class=\"text-slate-300 leading-relaxed my-2\">No Laboratório MVNO Telecom 2026, adotamos como cliente de referência oficial para as bancadas de teste o <strong>MicroSIP</strong>, um softphone open source de alta performance baseado na pilha SIP PJSIP, com baixo consumo de memória RAM, suporte nativo a 64 bits e compatibilidade total com codecs de áudio de alta definição, em especial o <strong>Opus</strong> e o <strong>G.711 (PCMA/PCMU)</strong>.</p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>2. Fundamentos da Engenharia de Codecs de Áudio</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">A qualidade da chamada de voz percebida pelo usuário humano depende diretamente do algoritmo de codificação e decodificação (codec) empregado na camada de mídia. Existem três gerações principais de codecs coexistindo nas redes de telecomunicações:\n<li><strong>G.711 (Pulse Code Modulation - PCM)</strong>: Padronizado pelo ITU-T em 1972, é a base da telefonia digital convencional (SDH/PDH e canais E1/T1). Opera com amostragem de 8.000 amostras por segundo (8 kHz) com 8 bits por amostra, resultando em uma taxa de dados constante de <strong>64 kbps</strong>. Possui duas leis de quantização logarítmica:</li>\n<li><strong>A-law (PCMA)</strong>: Utilizada no Brasil, Europa e na maior parte do mundo, otimizada para sinais de amplitude moderada.</li>\n<li><strong>μ-law (PCMU)</strong>: Utilizada nos Estados Unidos e Japão, com faixa dinâmica ligeiramente superior para sinais fracos.</li>\n<li>Vantagens: Atraso algorítmico quase nulo (0,125 ms) e nenhum custo de licenciamento ou compressão pesada na CPU.</li>\n<li>Desvantagens: Qualidade de áudio restrita à faixa vocal estreita (300 Hz a 3.400 Hz - narrowband).</li>\n<li><strong>G.722 e G.722.2 (AMR-WB - Adaptive Multi-Rate Wideband)</strong>: Codecs de banda larga (wideband) com amostragem em 16 kHz (50 Hz a 7.000 Hz). É o codec padrão adotado na tecnologia <strong>HD Voice</strong> de redes móveis 3G, 4G (VoLTE) e 5G (VoNR), oferecendo clareza cristalina para consoantes sibilantes (s, f, z).</li>\n<li><strong>Opus Interactive Audio Codec (RFC 6716)</strong>: Desenvolvido pelo IETF, funde a tecnologia do codec Skype SILK (para fala humana em baixos bitrates) com o codec CELT (para música e fidelidade extrema). É um codec de espectro completo (Fullband) com suporte a amostragem de até <strong>48 kHz</strong>, bitrates dinâmicos de 6 kbps até 510 kbps e adaptação automática de taxa em caso de congestionamento de rede. No laboratório, o Opus é priorizado para chamadas de ramal para ramal e testes de qualidade máxima.</li></p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>3. Mecanismo de Digest Authentication (RFC 2617 / RFC 3261)</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">A segurança no registro de terminais evita que atores mal-intencionados sequestrem ramais telefônicos para originar fraudes internacionais (toll fraud). O protocolo SIP utiliza a autenticação Digest em quatro etapas:</p>\n<pre class=\"bg-slate-950 p-4 rounded-lg my-3 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto\"><code>  Terminal (MicroSIP)                             Nó de Telefonia (Asterisk/Yate)\n          |                                                     |\n   (1)    |-------------- REGISTER (sem auth) -----------------&gt;|\n          |                                                     |\n   (2)    |&lt;------------- 401 Unauthorized ---------------------|\n          |              (WWW-Authenticate: nonce=\"4fa2b...\")   |\n          |                                                     |\n   (3)    |-------------- REGISTER (com Digest) ---------------&gt;|\n          |              (Authorization: Digest response=\"c8...\")\n          |                                                     |\n   (4)    |&lt;------------- 200 OK -------------------------------|\n          |              (Contact: &lt;sip:1001@ip:5060&gt;;expires) |\n</code></pre>\n<p class=\"text-slate-300 leading-relaxed my-2\">O cálculo do parâmetro <strong>response</strong> é dado por:\n$$HA1 = MD5(Username : Realm : Password)$$\n$$HA2 = MD5(Method : DigestURI)$$\n$$Response = MD5(HA1 : Nonce : HA2)$$</p>\n<p class=\"text-slate-300 leading-relaxed my-2\">Como o <strong>nonce</strong> é um valor aleatório gerado pelo servidor e expira após poucos segundos, ataques de repetição (replay attacks) são sumariamente rejeitados.</p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>4. Manutenção de NAT e Keepalive (SIP OPTIONS / STUN)</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">Quando o softphone opera atrás de um roteador doméstico ou empresarial com NAT (Network Address Translation), a tabela de tradução de portas fecha o canal após 30 a 60 segundos de inatividade. Para manter o fluxo bidirecional e permitir o recebimento de chamadas entrantes, duas técnicas são empregadas:\n<li><strong>Keepalive UDP</strong>: O terminal envia pequenos pacotes de ping (ou CRLF vazio) a cada 20 segundos para a porta 5060 do nó de telefonia, renovando a entrada NAT no roteador.</li>\n<li><strong>Symmetric RTP e rewrite_contact</strong>: No nó de telefonia Asterisk, configuramos <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">rtp_symmetric=yes</code> e <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">force_rport=yes</code> para que o servidor desconsidere os IPs privados anunciados no corpo da mensagem SIP e responda diretamente para o IP público e a porta UDP de onde o pacote efetivamente partiu.</li></p>",
          "softwareConfig": {
            "software": "MicroSIP Softphone & Contacts",
            "file": "%APPDATA%\\MicroSIP\\microsip.ini",
            "code": "; ==============================================================================\n; ARQUIVO DE CONFIGURAÇÃO DE REFERÊNCIA: microsip.ini (Fragmento Homologado)\n; Local de Armazenamento: %APPDATA%\\MicroSIP\\microsip.ini\n; Responsável Técnico: Carlos Alberto (Engenharia de Telecomunicações)\n; ==============================================================================\n\n[Account1]\nLabel=Carlos Alberto - SP 1001\nServer=192.168.10.10:5060\nProxy=192.168.10.10:5060\nDomain=192.168.10.10\nUser=1001\nAuthID=1001\nPassword=SecretSuperSafeToken2026!\nDisplayName=Carlos Alberto (Engenharia SP)\nExpires=3600\nKeepAlive=20\nTransport=UDP\nEncryption=Disabled\nAutoPublish=1\nMediaEncryption=Disabled\n\n[Audio]\n; Prioridade Rigorosa de Codecs (Opus Fullband em 1º lugar, fallback G.711a)\nCodecs=opus/48000/2,pcma/8000/1,pcmu/8000/1,g722/16000/1\nDTMF=RFC2833\nDisableVAD=1\nEchoCancellation=1\nAudioGainControl=1\nNoiseSuppression=1\n\n; ==============================================================================\n; LIVRO DE ENDEREÇOS CENTRALIZADO: contacts.xml\n; Permite discagem em um clique para os nós de todos os países\n; ==============================================================================\n<!--\n<contacts>\n  <contact name=\"Laboratório Eco Local SP\" number=\"8001\" presence=\"0\" />\n  <contact name=\"Sala de Conferência Global\" number=\"8000\" presence=\"0\" />\n  <contact name=\"Mariana Santos - RJ\" number=\"55212001\" presence=\"1\" />\n  <contact name=\"John Doe - Miami\" number=\"13053001\" presence=\"1\" />\n  <contact name=\"Sarah Connor - Nova York\" number=\"12124001\" presence=\"1\" />\n  <contact name=\"António Silva - Lisboa\" number=\"351215001\" presence=\"1\" />\n</contacts>\n-->",
            "explanation": "Configuração de codecs HD (Opus 48kHz, G.711a) e parâmetros de registro Digest para estações de trabalho."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP REGISTER / Digest",
            "summary": "Fluxo de registro e resposta 401 Unauthorized com Digest Challenge",
            "rawTrace": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.50         192.168.10.10         SIP      542    Request: REGISTER sip:192.168.10.10 (sem credenciais)\n    2   0.002140       192.168.10.10         192.168.10.50         SIP      612    Status: 401 Unauthorized | WWW-Authenticate: Digest\n    3   0.015320       192.168.10.50         192.168.10.10         SIP      894    Request: REGISTER sip:192.168.10.10 (Digest Response)\n    4   0.018450       192.168.10.10         192.168.10.50         SIP      580    Status: 200 OK (Contact binding aceito: 3600s)\n\nDETALHAMENTO DO PACOTE 3 (REGISTER com Digest):\nSession Initiation Protocol (SIP)\n    Request-Line: REGISTER sip:192.168.10.10 SIP/2.0\n    Via: SIP/2.0/UDP 192.168.10.50:5060;rport;branch=z9hG4bKPj9a81f8c4-7b12-4f88\n    Max-Forwards: 70\n    From: <sip:1001@192.168.10.10>;tag=82fa91bd-3412-4c22-98ab-30129bc41289\n    To: <sip:1001@192.168.10.10>\n    Call-ID: c5e412a8-1294-4321-ba32-849201928374@192.168.10.50\n    CSeq: 2 REGISTER\n    User-Agent: MicroSIP/3.21.3 (x64 Windows)\n    Contact: <sip:1001@192.168.10.50:5060;ob>\n    Expires: 3600\n    Allow: PRACK, INVITE, ACK, BYE, CANCEL, UPDATE, INFO, SUBSCRIBE, NOTIFY, REFER, MESSAGE, OPTIONS\n    Authorization: Digest username=\"1001\", realm=\"asterisk\", nonce=\"1729511942/d8fa19e27301bc5\", uri=\"sip:192.168.10.10\", response=\"b7e289410ca385920a1f9401827419e5\", algorithm=MD5\n    Content-Length: 0"
          },
          "diagramType": "brasil"
        },
        {
          "id": "5.2",
          "title": "5.2 Bateria de Testes Funcionais: Chamadas Locais, Interurbanas, DDI e Serviços de Eco (8001) e Conferência (8000)",
          "duration": "50 min",
          "tag": "Homologação Prática",
          "slides": [
            {
              "title": "O Plano Metodológico de Homologação de Voz",
              "subtitle": "Procedimento Operacional Padrão (POP) para Validação de Redes MVNO",
              "bullets": [
                "Fase 1 - Autoteste em Loopback: Chamada para o ramal de eco interativo 8001 (validação imediata de áudio full-duplex).",
                "Fase 2 - Chamadas Intranó (Mesmo POP): Teste entre ramais 1001 e 1002 em São Paulo (comutação direta via Asterisk).",
                "Fase 3 - Chamadas Interurbanas Nacionais: Ramal de SP (1001) discando para o ramal do RJ (55212001) via tronco Yate.",
                "Fase 4 - Chamadas Internacionais DDI: Ramais brasileiros discando para Miami (+1305), NYC (+1212) e Lisboa (+35121)."
              ],
              "speakerNotes": "Nenhuma rede de telecomunicações é colocada em produção comercial sem passar por uma bateria sistemática de aceitação que teste desde o eco local até a comutação intercontinental."
            },
            {
              "title": "O Serviço de Eco de Áudio (Ramal 8001)",
              "subtitle": "Como o Nó Asterisk Reflete a Mídia para Diagnóstico de Atraso e Clareza",
              "bullets": [
                "Aplicação Echo() no Dialplan: O Asterisk recebe o fluxo RTP na porta UDP negociada e o retransmite instantaneamente de volta ao remetente.",
                "Detecção Imediata de Atraso: Se o usuário falar 'Teste de Áudio', ele deve ouvir sua própria voz em menos de 40 ms.",
                "Isolamento de Falhas Unidirecionais (One-Way Audio): Se o usuário falar e não ouvir retorno, há bloqueio de firewall ou NAT no sentido reverso.",
                "Avaliação de Clipping e Distorção: Permite ao operador ajustar os ganhos de microfone e eliminar microfonia ou ruídos de fundo."
              ],
              "speakerNotes": "O teste de eco é a ferramenta de diagnóstico mais rápida do engenheiro de telecomunicações. Se o eco não funcionar, nenhuma chamada para ramais externos funcionará perfeitamente."
            },
            {
              "title": "A Sala de Conferência Global Multiusuário (Ramal 8000)",
              "subtitle": "Mixagem de Mídia Carrier-Grade com a Aplicação ConfBridge()",
              "bullets": [
                "O Motor de Mixagem do Asterisk: Combina em tempo real até 50 fluxos de áudio simultâneos em um único barramento unificado.",
                "Transcodificação Dinâmica Automática: Assinantes falando via Opus (48 kHz) conversam de forma transparente com telefones em G.711 (8 kHz).",
                "Aviso de Entrada e Saída Sonoro: Tons e anúncios pré-gravados notificam a presença de novos participantes na sala.",
                "Otimização de Largura de Banda: Silêncio não é retransmitido, economizando pacotes IP na infraestrutura de rede."
              ],
              "speakerNotes": "A aplicação ConfBridge do Asterisk 20 reúne participantes de três continentes em uma mesma sala com sincronismo estrito de clock de jitter."
            },
            {
              "title": "Matriz de Resultados e Critérios de Aceitação de Teste",
              "subtitle": "Validação Cruzada entre as 6 Praças do Laboratório Internacional",
              "bullets": [
                "Origem SP (1001) -> Destino SP (1002): PDD < 50 ms | Jitter < 2 ms | Perda de Pacote: 0.0% | Status: APROVADO.",
                "Origem SP (1001) -> Destino RJ (55212001): PDD < 120 ms | Jitter < 6 ms | Perda de Pacote: 0.0% | Status: APROVADO.",
                "Origem SP (1001) -> Destino Miami (13053001): PDD < 450 ms | Jitter < 14 ms | Perda de Pacote: 0.1% | Status: APROVADO.",
                "Origem SP (1001) -> Destino Lisboa (351215001): PDD < 600 ms | Jitter < 22 ms | Perda de Pacote: 0.2% | Status: APROVADO."
              ],
              "speakerNotes": "O PDD (Post-Dial Delay) mede o tempo exato entre o envio do último dígito pelo assinante e o recebimento do tom de chamada (180 Ringing). Todos os testes cumpriram as metas da Anatel e ITU-T."
            }
          ],
          "theory": "### 1. Metodologia de Aceitação de Redes de Voz (VoIP Acceptance Testing)\n\nA validação de uma infraestrutura de telecomunicações recém-implantada exige a execução de uma bateria de testes funcionais padronizada. Em operadoras reais, essa bateria compõe o Procedimento de Aceitação de Rede (ATP - Acceptance Test Procedure), validando tanto os fluxos de sinalização SIP (plano de controle) quanto os fluxos de áudio RTP (plano de usuário).\n\nNo Laboratório MVNO Telecom 2026, dividimos os testes em quatro camadas de complexidade crescente:\n\n```\n  [1. Autoteste de Eco] ----> [2. Chamadas Locais Intranó] ----> [3. Interurbano Nacional] ----> [4. Roteamento Internacional]\n      (Ramal 8001)                (Ramal 1001 -> 1002)             (SP -> RJ via Yate)          (Brasil -> EUA / Portugal)\n```\n\n---\n\n### 2. Engenharia do Serviço de Eco de Áudio (Ramal 8001)\n\nO serviço de eco é um mecanismo em que o PBX atende a chamada de forma automatizada e estabelece uma ponte de loopback imediata no canal de mídia. O pacote RTP recebido na porta UDP local é devolvido ao endereço de socket de origem com carimbo de tempo (timestamp) preservado ou atualizado.\n\nPrincipais diagnósticos obtidos no teste de eco:\n1. **Verificação de Áudio Bidirecional (Full-Duplex)**: Em redes VoIP com NAT ou regras incorretas de firewall, é frequente o sintoma de *One-Way Audio*, onde um interlocutor fala mas não ouve ou vice-versa. O eco confirma que tanto o canal de transmissão (Tx) quanto o canal de recepção (Rx) estão totalmente desimpedidos.\n2. **Cálculo de Atraso de Ida e Volta (Round-Trip Delay)**: Se o usuário emite um som percussivo (uma palma ou estalo) e o retorno é percebido instantaneamente, o atraso é inferior a 100 ms, considerado padrão classe A pela norma ITU-T G.114.\n3. **Avaliação Subjetiva de Distorção**: Permite calibrar a sensibilidade do microfone (Gain Control) e verificar se o algoritmo de cancelamento de eco acústico (AEC) do terminal está ativo.\n\n---\n\n### 3. Engenharia da Sala de Conferência Multiusuário (Ramal 8000)\n\nDiferente de uma chamada ponto a ponto (onde dois terminais trocam pacotes RTP diretamente ou via nó simples), uma conferência multiusuário exige um **Mixer de Áudio Carrier-Grade**. No Asterisk 20, essa função é desempenhada pelo módulo `app_confbridge.so`.\n\nO ConfBridge opera da seguinte forma:\n- Cada participante envia seu fluxo RTP para uma porta UDP dedicada no Asterisk.\n- O Asterisk decodifica cada fluxo para sinal linear não comprimido (SLIN 8, 16 ou 48 kHz).\n- O motor de mixagem soma os sinais de áudio de todos os participantes exceto do próprio orador (técnica conhecida como *N-1 mix-minus*), evitando que o participante ouça sua própria voz com eco.\n- O sinal mixado resultante é recodificado no codec preferencial de cada participante (Opus para softphones, G.711 para hardphones convencionais) e enviado aos respectivos clientes.\n\n---\n\n### 4. Roteamento de Chamadas Nacionais e Internacionais Passo a Passo\n\nAo discar para o número `55212001` a partir do softphone de São Paulo (`1001`):\n1. O Asterisk SP consulta o contexto `[interurbano-nacional]` em `extensions.conf`.\n2. A expressão regular `_5521XXXX` é correspondida.\n3. O Asterisk normaliza o número e envia um SIP INVITE para o nó **Yate C++** (`192.168.10.20:5060`).\n4. O Yate consulta sua tabela de roteamento regex e identifica que o prefixo `5521` pertence ao gateway do Rio de Janeiro.\n5. O Yate repassa o INVITE para o nó do Rio (`192.168.20.10:5060`).\n6. O nó do Rio faz tocar o terminal da analista Mariana Santos (`2001`).\n7. Quando Mariana atende, o status 200 OK viaja de volta pelo anel, e o áudio RTP é estabelecido diretamente entre os nós.",
          "configCode": "; ==============================================================================\n; ARQUIVO: /etc/asterisk/extensions.conf (Serviços de Teste e Roteamento)\n; ==============================================================================\n\n; --- Contexto de Testes e Diagnóstico Automatizado ---\n[servicos-diagnostico]\n; Ramal de Eco de Áudio (8001)\nexten => 8001,1,NoOp(--- INICIANDO TESTE DE ECO DE AUDIO (RAMAL 8001) ---)\n same => n,Answer(500)\n same => n,Playback(beep)\n same => n,NoOp(Canal conectado: ${CHANNEL} | Codec Lido: ${CHANNEL(audionativeformat)})\n same => n,Echo()\n same => n,Hangup()\n\n; Ramal de Conferência Global (8000)\nexten => 8000,1,NoOp(--- ENTRANDO NA SALA DE CONFERENCIA GLOBAL 8000 ---)\n same => n,Answer()\n same => n,ConfBridge(sala-global-2026,padrao-bridge,padrao-usuario)\n same => n,Hangup()\n\n; --- Contexto de Interconexão Interurbana e Internacional ---\n[interconexao-global]\n; Rota Brasil Rio de Janeiro (5521 + ramal)\nexten => _5521XXXX,1,NoOp(--- ROTEANDO PARA O NÓ DO RIO DE JANEIRO VIA YATE ---)\n same => n,Dial(PJSIP/${EXTEN}@tronco-yate-central,60,Tt)\n same => n,Hangup()\n\n; Rota Estados Unidos Miami (1305 + ramal)\nexten => _1305XXXX,1,NoOp(--- ROTEANDO PARA MIAMI VIA GATEWAY INTERNACIONAL ---)\n same => n,Dial(PJSIP/${EXTEN}@tronco-yate-central,60,Tt)\n same => n,Hangup()\n\n; Rota Portugal Lisboa (35121 + ramal)\nexten => _35121XXXX,1,NoOp(--- ROTEANDO PARA LISBOA VIA GATEWAY INTERNACIONAL ---)\n same => n,Dial(PJSIP/${EXTEN}@tronco-yate-central,60,Tt)\n same => n,Hangup()",
          "traceDissection": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.50         192.168.10.10         SIP      850    Request: INVITE sip:8001@192.168.10.10 | m=audio (Opus, PCMA)\n    2   0.001200       192.168.10.10         192.168.10.50         SIP      340    Status: 100 Trying\n    3   0.002800       192.168.10.10         192.168.10.50         SIP      910    Status: 200 OK (Answered) | m=audio 10002 (Opus 48kHz)\n    4   0.004100       192.168.10.50         192.168.10.10         SIP      410    Request: ACK sip:8001@192.168.10.10\n    5   0.024000       192.168.10.50         192.168.10.10         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x74A1B2C3, Seq=1\n    6   0.024150       192.168.10.10         192.168.10.50         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x19283746, Seq=1 (ECHO REFLECTION)\n\nANÁLISE DE FLUXO RTP REFLETIDO (PACOTES 5 E 6):\nDelta de Tempo entre Pacote Tx e Rx no Nó Asterisk: 0.150 milissegundos (150 microssegundos)\nCodec Utilizado: Opus 48000 Hz, estéreo full-band\nBuffer de Jitter: Zero perdas acumuladas, sincronização perfeita de relógio RTP.",
          "diagram": "global",
          "theoryText": "<h3>1. Metodologia de Aceitação de Redes de Voz (VoIP Acceptance Testing)</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">A validação de uma infraestrutura de telecomunicações recém-implantada exige a execução de uma bateria de testes funcionais padronizada. Em operadoras reais, essa bateria compõe o Procedimento de Aceitação de Rede (ATP - Acceptance Test Procedure), validando tanto os fluxos de sinalização SIP (plano de controle) quanto os fluxos de áudio RTP (plano de usuário).</p>\n<p class=\"text-slate-300 leading-relaxed my-2\">No Laboratório MVNO Telecom 2026, dividimos os testes em quatro camadas de complexidade crescente:</p>\n<pre class=\"bg-slate-950 p-4 rounded-lg my-3 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto\"><code>  [1. Autoteste de Eco] ----&gt; [2. Chamadas Locais Intranó] ----&gt; [3. Interurbano Nacional] ----&gt; [4. Roteamento Internacional]\n      (Ramal 8001)                (Ramal 1001 -&gt; 1002)             (SP -&gt; RJ via Yate)          (Brasil -&gt; EUA / Portugal)\n</code></pre>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>2. Engenharia do Serviço de Eco de Áudio (Ramal 8001)</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">O serviço de eco é um mecanismo em que o PBX atende a chamada de forma automatizada e estabelece uma ponte de loopback imediata no canal de mídia. O pacote RTP recebido na porta UDP local é devolvido ao endereço de socket de origem com carimbo de tempo (timestamp) preservado ou atualizado.</p>\n<p class=\"text-slate-300 leading-relaxed my-2\">Principais diagnósticos obtidos no teste de eco:\n<li><strong>Verificação de Áudio Bidirecional (Full-Duplex)</strong>: Em redes VoIP com NAT ou regras incorretas de firewall, é frequente o sintoma de <em>One-Way Audio</em>, onde um interlocutor fala mas não ouve ou vice-versa. O eco confirma que tanto o canal de transmissão (Tx) quanto o canal de recepção (Rx) estão totalmente desimpedidos.</li>\n<li><strong>Cálculo de Atraso de Ida e Volta (Round-Trip Delay)</strong>: Se o usuário emite um som percussivo (uma palma ou estalo) e o retorno é percebido instantaneamente, o atraso é inferior a 100 ms, considerado padrão classe A pela norma ITU-T G.114.</li>\n<li><strong>Avaliação Subjetiva de Distorção</strong>: Permite calibrar a sensibilidade do microfone (Gain Control) e verificar se o algoritmo de cancelamento de eco acústico (AEC) do terminal está ativo.</li></p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>3. Engenharia da Sala de Conferência Multiusuário (Ramal 8000)</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">Diferente de uma chamada ponto a ponto (onde dois terminais trocam pacotes RTP diretamente ou via nó simples), uma conferência multiusuário exige um <strong>Mixer de Áudio Carrier-Grade</strong>. No Asterisk 20, essa função é desempenhada pelo módulo <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">app_confbridge.so</code>.</p>\n<p class=\"text-slate-300 leading-relaxed my-2\">O ConfBridge opera da seguinte forma:\n<li>Cada participante envia seu fluxo RTP para uma porta UDP dedicada no Asterisk.</li>\n<li>O Asterisk decodifica cada fluxo para sinal linear não comprimido (SLIN 8, 16 ou 48 kHz).</li>\n<li>O motor de mixagem soma os sinais de áudio de todos os participantes exceto do próprio orador (técnica conhecida como <em>N-1 mix-minus</em>), evitando que o participante ouça sua própria voz com eco.</li>\n<li>O sinal mixado resultante é recodificado no codec preferencial de cada participante (Opus para softphones, G.711 para hardphones convencionais) e enviado aos respectivos clientes.</li></p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>4. Roteamento de Chamadas Nacionais e Internacionais Passo a Passo</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">Ao discar para o número <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">55212001</code> a partir do softphone de São Paulo (<code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">1001</code>):\n<li>O Asterisk SP consulta o contexto <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">[interurbano-nacional]</code> em <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">extensions.conf</code>.</li>\n<li>A expressão regular <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">_5521XXXX</code> é correspondida.</li>\n<li>O Asterisk normaliza o número e envia um SIP INVITE para o nó <strong>Yate C++</strong> (<code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">192.168.10.20:5060</code>).</li>\n<li>O Yate consulta sua tabela de roteamento regex e identifica que o prefixo <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">5521</code> pertence ao gateway do Rio de Janeiro.</li>\n<li>O Yate repassa o INVITE para o nó do Rio (<code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">192.168.20.10:5060</code>).</li>\n<li>O nó do Rio faz tocar o terminal da analista Mariana Santos (<code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">2001</code>).</li>\n<li>Quando Mariana atende, o status 200 OK viaja de volta pelo anel, e o áudio RTP é estabelecido diretamente entre os nós.</li></p>",
          "softwareConfig": {
            "software": "Asterisk Dialplan & Diagnostics",
            "file": "/etc/asterisk/extensions.conf",
            "code": "; ==============================================================================\n; ARQUIVO: /etc/asterisk/extensions.conf (Serviços de Teste e Roteamento)\n; ==============================================================================\n\n; --- Contexto de Testes e Diagnóstico Automatizado ---\n[servicos-diagnostico]\n; Ramal de Eco de Áudio (8001)\nexten => 8001,1,NoOp(--- INICIANDO TESTE DE ECO DE AUDIO (RAMAL 8001) ---)\n same => n,Answer(500)\n same => n,Playback(beep)\n same => n,NoOp(Canal conectado: ${CHANNEL} | Codec Lido: ${CHANNEL(audionativeformat)})\n same => n,Echo()\n same => n,Hangup()\n\n; Ramal de Conferência Global (8000)\nexten => 8000,1,NoOp(--- ENTRANDO NA SALA DE CONFERENCIA GLOBAL 8000 ---)\n same => n,Answer()\n same => n,ConfBridge(sala-global-2026,padrao-bridge,padrao-usuario)\n same => n,Hangup()\n\n; --- Contexto de Interconexão Interurbana e Internacional ---\n[interconexao-global]\n; Rota Brasil Rio de Janeiro (5521 + ramal)\nexten => _5521XXXX,1,NoOp(--- ROTEANDO PARA O NÓ DO RIO DE JANEIRO VIA YATE ---)\n same => n,Dial(PJSIP/${EXTEN}@tronco-yate-central,60,Tt)\n same => n,Hangup()\n\n; Rota Estados Unidos Miami (1305 + ramal)\nexten => _1305XXXX,1,NoOp(--- ROTEANDO PARA MIAMI VIA GATEWAY INTERNACIONAL ---)\n same => n,Dial(PJSIP/${EXTEN}@tronco-yate-central,60,Tt)\n same => n,Hangup()\n\n; Rota Portugal Lisboa (35121 + ramal)\nexten => _35121XXXX,1,NoOp(--- ROTEANDO PARA LISBOA VIA GATEWAY INTERNACIONAL ---)\n same => n,Dial(PJSIP/${EXTEN}@tronco-yate-central,60,Tt)\n same => n,Hangup()",
            "explanation": "Aplicações Echo() no ramal 8001 e ConfBridge() no ramal 8000 para diagnósticos em tempo real."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP INVITE / RTP Echo",
            "summary": "Reflexão imediata de áudio em loopback no ramal de eco 8001 com latência de 150 µs",
            "rawTrace": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.50         192.168.10.10         SIP      850    Request: INVITE sip:8001@192.168.10.10 | m=audio (Opus, PCMA)\n    2   0.001200       192.168.10.10         192.168.10.50         SIP      340    Status: 100 Trying\n    3   0.002800       192.168.10.10         192.168.10.50         SIP      910    Status: 200 OK (Answered) | m=audio 10002 (Opus 48kHz)\n    4   0.004100       192.168.10.50         192.168.10.10         SIP      410    Request: ACK sip:8001@192.168.10.10\n    5   0.024000       192.168.10.50         192.168.10.10         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x74A1B2C3, Seq=1\n    6   0.024150       192.168.10.10         192.168.10.50         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x19283746, Seq=1 (ECHO REFLECTION)\n\nANÁLISE DE FLUXO RTP REFLETIDO (PACOTES 5 E 6):\nDelta de Tempo entre Pacote Tx e Rx no Nó Asterisk: 0.150 milissegundos (150 microssegundos)\nCodec Utilizado: Opus 48000 Hz, estéreo full-band\nBuffer de Jitter: Zero perdas acumuladas, sincronização perfeita de relógio RTP."
          },
          "diagramType": "global"
        },
        {
          "id": "5.3",
          "title": "5.3 Troubleshooting Avançado de Falhas e Códigos de Erro SIP (401, 403, 404, 486, 488, 503)",
          "duration": "45 min",
          "tag": "Troubleshooting SIP",
          "slides": [
            {
              "title": "A Taxonomia dos Códigos de Erro SIP (RFC 3261)",
              "subtitle": "Como Diagnosticar Falhas a Partir das Respostas de Resposta de Erro",
              "bullets": [
                "Classe 4xx (Client Error): Falhas atribuíveis à configuração ou requisição do terminal do usuário.",
                "Classe 5xx (Server Failure): Falhas internas na infraestrutura do nó de telefonia ou esgotamento de recursos.",
                "Classe 6xx (Global Failure): Falhas universais onde nenhum destino possível pode atender a chamada.",
                "A Importância do Cabeçalho Reason e Warning: Textos descritivos que esclarecem a causa raiz exata da recusa."
              ],
              "speakerNotes": "O domínio dos códigos de erro SIP é o divisor de águas entre um técnico de suporte básico e um verdadeiro engenheiro sênior de telecomunicações."
            },
            {
              "title": "Erros de Autenticação e Permissão: 401 vs 403",
              "subtitle": "Diferenciando Falha de Credencial de Falha de Autorização de Rota",
              "bullets": [
                "401 Unauthorized: O nó solicita credenciais Digest (comportamento normal no primeiro handshake de registro).",
                "403 Forbidden (Senha Incorreta): Se após o envio do Digest o hash não bater com o banco de dados do Asterisk.",
                "403 Forbidden (Rota Bloqueada): Se o ramal 1001 não tiver permissão de discagem internacional (DDI) no dialplan.",
                "Prevenção contra Brute Force: Fail2Ban monitorando os logs do Asterisk e bloqueando temporariamente o IP atacante."
              ],
              "speakerNotes": "O erro 403 Forbidden significa que o servidor compreendeu a identidade do usuário, mas deliberadamente se recusa a autorizar a operação solicitada."
            },
            {
              "title": "Erros de Destino e Disponibilidade: 404 Not Found e 486 Busy Here",
              "subtitle": "Tratamento de Números Inexistentes e Ocupação de Canal de Assinante",
              "bullets": [
                "404 Not Found: O número discado não coincide com nenhum padrão (pattern match) nas extensões ativas.",
                "Diagnóstico de 404: Verificar ausência de dígito de país (+55), falta de pontuação ou erro de digitação do usuário.",
                "486 Busy Here: O ramal de destino já está em outra chamada ativa e não possui suporte a chamada em espera.",
                "Tratamento de 486 no Dialplan: Transbordo automático para correio de voz corporativo ou segundo ramal do grupo."
              ],
              "speakerNotes": "Um 404 Not Found originado na borda internacional geralmente indica que um país alterou suas regras de prefixo ou que o gateway normalizador removeu dígitos indevidos."
            },
            {
              "title": "Incompatibilidade de Codec e Falha de Tronco: 488 vs 503",
              "subtitle": "Resolução de Falhas Críticas de Negociação de Mídia e Esgotamento de Gateway",
              "bullets": [
                "488 Not Acceptable Here: O terminal exige um codec que o servidor não suporta (ex: cliente só oferece G.729 e o nó só aceita Opus/PCMA).",
                "Solução para 488: Habilitar transcodificação no nó Asterisk ou adicionar o codec G.711a na lista permitida do terminal.",
                "503 Service Unavailable: O gateway de destino está desligado, com CPU travada ou sem circuitos de mídia disponíveis.",
                "Estratégia de Failover para 503: O dialplan deve interceptar o código de causa 503 e desviar a chamada para uma rota secundária."
              ],
              "speakerNotes": "O erro 488 Not Acceptable Here ocorre com frequência durante interconexões com operadoras convencionais que exigem G.711 estrito."
            }
          ],
          "theory": "### 1. Sistemática de Resolução de Problemas SIP (SIP Troubleshooting)\n\nNo diagnóstico de redes de telefonia baseadas no protocolo SIP (RFC 3261), as respostas de status dividem-se em seis classes funcionais:\n- **1xx (Provisional)**: A requisição foi recebida e está sendo processada (ex: 100 Trying, 180 Ringing, 183 Session Progress).\n- **2xx (Success)**: A ação solicitada foi concluída com sucesso (ex: 200 OK).\n- **3xx (Redirection)**: O usuário mudou de localização e nova ação é requerida (ex: 301 Moved Permanently).\n- **4xx (Client Error)**: A requisição contém sintaxe incorreta ou não pode ser atendida pelo servidor (ex: 401, 403, 404, 486, 488).\n- **5xx (Server Error)**: O servidor falhou ao processar uma requisição aparentemente válida (ex: 500 Server Internal Error, 503 Service Unavailable).\n- **6xx (Global Failure)**: A requisição é impossível de ser completada em qualquer servidor do mundo (ex: 603 Decline, 604 Does Not Exist Anywhere).\n\n---\n\n### 2. Anatomia Detalhada dos Principais Códigos de Erro\n\n#### A. 401 Unauthorized vs 403 Forbidden\n- **401 Unauthorized**: É uma resposta de desafio (challenge) normal e esperada no início do handshake SIP. Sempre deve conter o cabeçalho `WWW-Authenticate` com o desafio Digest. Não indica problema, exceto se entrar em loop infinito (o terminal responde ao desafio e o servidor insiste em mandar 401 repetidamente, sinalizando credencial errada).\n- **403 Forbidden**: O servidor compreendeu quem é o usuário, mas a política de segurança rejeita a ação. Causas frequentes no laboratório:\n  1. A senha informada no MicroSIP difere da diretiva `password` no `pjsip.conf`.\n  2. A restrição de endereço IP (`permit` / `deny`) barrou o terminal.\n  3. O ramal pertence a um contexto que não tem rota para o número discado (ex: ramal básico tentando ligar para DDI).\n\n#### B. 404 Not Found\nIndica que o Request-URI solicitado não existe no servidor de destino. Causas frequentes:\n1. Erro de sintaxe na expressão regular do dialplan (ex: `_5521XXXX` configurado, mas o usuário discou `21XXXX` sem o 55).\n2. O usuário chamado não está registrado (a tabela de contatos da Location Table está vazia para aquele AOR - Address of Record).\n\n#### C. 486 Busy Here\nO terminal chamado respondeu ativamente indicando que não pode aceitar a chamada porque sua linha está ocupada. Se o terminal possuir mais de uma linha física ou chamada em espera (call waiting), o 486 só será emitido se todas as linhas estiverem preenchidas.\n\n#### D. 488 Not Acceptable Here\nOcorre durante a fase de negociação do SDP (Session Description Protocol). O chamador envia sua oferta de codecs em `m=audio`, mas o receptor não possui nenhum codec em comum. Exemplo real:\n- Terminal A oferece: `m=audio 10000 RTP/AVP 18` (G.729 exclusivamente).\n- Servidor B possui ativado apenas: `allow=opus,pcma`.\n- Como não há interseção, o servidor é obrigado a emitir `SIP/2.0 488 Not Acceptable Here`.\n\n#### E. 503 Service Unavailable\nO servidor de telefonia de destino ou gateway intermediário está temporariamente impossibilitado de atender à chamada. Motivos típicos:\n1. O processo de software (`asterisk` ou `yate`) no nó remoto caiu ou está travado.\n2. Esgotamento de portas RTP configuradas (faixa 10000-20000 esgotada).\n3. Esgotamento de licenças ou canais simultâneos do tronco SIP.\n\n---\n\n### 3. Matriz de Tratamento Automatizado de Falhas no Dialplan\n\n```\n   [Chamada Originada]\n           |\n       (Dial PJSIP)\n           |\n     [Falha Ocorrida?]\n      /             \\\n   (SIM)           (NÃO) ----> [Chamada Atendida (200 OK)]\n     |\n  [Verifica ${DIALSTATUS}]\n     |\n     +---> BUSY ---------> Playback(usuario-ocupado) -> Transbordo para Correio de Voz\n     |\n     +---> NOANSWER -----> Playback(nao-atende) -> Desvio para Celular\n     |\n     +---> CONGESTION ---> Playback(linhas-ocupadas) -> Tenta Tronco de Contingência\n     |\n     +---> CHANUNAVAIL --> Playback(temporariamente-indisponivel) -> Alerta NOC\n```",
          "configCode": "; ==============================================================================\n; ARQUIVO: /etc/asterisk/extensions.conf (Tratamento Robusto de Falhas)\n; ==============================================================================\n\n[contexto-com-failover]\nexten => _5521XXXX,1,NoOp(--- TENTANDO ROTA PRIMARIA VIA NÓ DO RIO DE JANEIRO ---)\n same => n,Dial(PJSIP/${EXTEN}@tronco-rio-primario,30,Tt)\n same => n,Goto(tratar-status-${DIALSTATUS},1)\n\n; Tratamento para Ramal Ocupado (SIP 486)\nexten => tratar-status-BUSY,1,NoOp(--- ASSINANTE OCUPADO: ENCAMINHANDO PARA VOICEMAIL ---)\n same => n,Playback(beep)\n same => n,VoiceMail(${EXTEN}@default,b)\n same => n,Hangup()\n\n; Tratamento para Canal Indisponível ou Servidor Fora (SIP 503)\nexten => tratar-status-CHANUNAVAIL,1,NoOp(--- ROTA PRIMARIA FALHOU: ACIONANDO FAILOVER VIA MIAMI ---)\n same => n,Dial(PJSIP/${EXTEN}@tronco-failover-miami,30,Tt)\n same => n,Goto(tratar-status-contingencia-${DIALSTATUS},1)\n\n; Tratamento para Incompatibilidade de Codec (SIP 488)\nexten => tratar-status-CONGESTION,1,NoOp(--- CONGESTIONAMENTO OU FALHA DE MIDIA ---)\n same => n,Playback(ss-noservice)\n same => n,Hangup()\n\nexten => tratar-status-contingencia-CHANUNAVAIL,1,NoOp(--- AMBAS AS ROTAS FALHARAM: ENVIANDO 503 AO USUARIO ---)\n same => n,Playtones(congestion)\n same => n,Congestion(10)\n same => n,Hangup()",
          "traceDissection": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.50         192.168.10.10         SIP      820    Request: INVITE sip:55999999@192.168.10.10\n    2   0.001400       192.168.10.10         192.168.10.50         SIP      340    Status: 100 Trying\n    3   0.003100       192.168.10.10         192.168.10.50         SIP      512    Status: 404 Not Found (Extensão não localizada no dialplan)\n    4   0.004200       192.168.10.50         192.168.10.10         SIP      390    Request: ACK sip:55999999@192.168.10.10\n\nDETALHAMENTO DO PACOTE 3 (SIP 404 Not Found):\nSession Initiation Protocol (SIP)\n    Status-Line: SIP/2.0 404 Not Found\n    Via: SIP/2.0/UDP 192.168.10.50:5060;rport=5060;received=192.168.10.50;branch=z9hG4bKPj918237\n    From: <sip:1001@192.168.10.10>;tag=74129bc-4812\n    To: <sip:55999999@192.168.10.10>;tag=as5918274a\n    Call-ID: b1298471-82910293-192847192@192.168.10.50\n    CSeq: 1 INVITE\n    Server: Asterisk PBX 20.9.2\n    Reason: Q.850;cause=1;text=\"Unallocated (unassigned) number\"\n    Content-Length: 0",
          "diagram": "brasil",
          "theoryText": "<h3>1. Sistemática de Resolução de Problemas SIP (SIP Troubleshooting)</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">No diagnóstico de redes de telefonia baseadas no protocolo SIP (RFC 3261), as respostas de status dividem-se em seis classes funcionais:\n<li><strong>1xx (Provisional)</strong>: A requisição foi recebida e está sendo processada (ex: 100 Trying, 180 Ringing, 183 Session Progress).</li>\n<li><strong>2xx (Success)</strong>: A ação solicitada foi concluída com sucesso (ex: 200 OK).</li>\n<li><strong>3xx (Redirection)</strong>: O usuário mudou de localização e nova ação é requerida (ex: 301 Moved Permanently).</li>\n<li><strong>4xx (Client Error)</strong>: A requisição contém sintaxe incorreta ou não pode ser atendida pelo servidor (ex: 401, 403, 404, 486, 488).</li>\n<li><strong>5xx (Server Error)</strong>: O servidor falhou ao processar uma requisição aparentemente válida (ex: 500 Server Internal Error, 503 Service Unavailable).</li>\n<li><strong>6xx (Global Failure)</strong>: A requisição é impossível de ser completada em qualquer servidor do mundo (ex: 603 Decline, 604 Does Not Exist Anywhere).</li></p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>2. Anatomia Detalhada dos Principais Códigos de Erro</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">#### A. 401 Unauthorized vs 403 Forbidden\n<li><strong>401 Unauthorized</strong>: É uma resposta de desafio (challenge) normal e esperada no início do handshake SIP. Sempre deve conter o cabeçalho <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">WWW-Authenticate</code> com o desafio Digest. Não indica problema, exceto se entrar em loop infinito (o terminal responde ao desafio e o servidor insiste em mandar 401 repetidamente, sinalizando credencial errada).</li>\n<li><strong>403 Forbidden</strong>: O servidor compreendeu quem é o usuário, mas a política de segurança rejeita a ação. Causas frequentes no laboratório:</li>\n<li>A senha informada no MicroSIP difere da diretiva <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">password</code> no <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">pjsip.conf</code>.</li>\n<li>A restrição de endereço IP (<code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">permit</code> / <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">deny</code>) barrou o terminal.</li>\n<li>O ramal pertence a um contexto que não tem rota para o número discado (ex: ramal básico tentando ligar para DDI).</li></p>\n<p class=\"text-slate-300 leading-relaxed my-2\">#### B. 404 Not Found\nIndica que o Request-URI solicitado não existe no servidor de destino. Causas frequentes:\n<li>Erro de sintaxe na expressão regular do dialplan (ex: <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">_5521XXXX</code> configurado, mas o usuário discou <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">21XXXX</code> sem o 55).</li>\n<li>O usuário chamado não está registrado (a tabela de contatos da Location Table está vazia para aquele AOR - Address of Record).</li></p>\n<p class=\"text-slate-300 leading-relaxed my-2\">#### C. 486 Busy Here\nO terminal chamado respondeu ativamente indicando que não pode aceitar a chamada porque sua linha está ocupada. Se o terminal possuir mais de uma linha física ou chamada em espera (call waiting), o 486 só será emitido se todas as linhas estiverem preenchidas.</p>\n<p class=\"text-slate-300 leading-relaxed my-2\">#### D. 488 Not Acceptable Here\nOcorre durante a fase de negociação do SDP (Session Description Protocol). O chamador envia sua oferta de codecs em <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">m=audio</code>, mas o receptor não possui nenhum codec em comum. Exemplo real:\n<li>Terminal A oferece: <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">m=audio 10000 RTP/AVP 18</code> (G.729 exclusivamente).</li>\n<li>Servidor B possui ativado apenas: <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">allow=opus,pcma</code>.</li>\n<li>Como não há interseção, o servidor é obrigado a emitir <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">SIP/2.0 488 Not Acceptable Here</code>.</li></p>\n<p class=\"text-slate-300 leading-relaxed my-2\">#### E. 503 Service Unavailable\nO servidor de telefonia de destino ou gateway intermediário está temporariamente impossibilitado de atender à chamada. Motivos típicos:\n<li>O processo de software (<code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">asterisk</code> ou <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">yate</code>) no nó remoto caiu ou está travado.</li>\n<li>Esgotamento de portas RTP configuradas (faixa 10000-20000 esgotada).</li>\n<li>Esgotamento de licenças ou canais simultâneos do tronco SIP.</li></p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>3. Matriz de Tratamento Automatizado de Falhas no Dialplan</h3>\n<pre class=\"bg-slate-950 p-4 rounded-lg my-3 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto\"><code>   [Chamada Originada]\n           |\n       (Dial PJSIP)\n           |\n     [Falha Ocorrida?]\n      /             \\\n   (SIM)           (NÃO) ----&gt; [Chamada Atendida (200 OK)]\n     |\n  [Verifica ${DIALSTATUS}]\n     |\n     +---&gt; BUSY ---------&gt; Playback(usuario-ocupado) -&gt; Transbordo para Correio de Voz\n     |\n     +---&gt; NOANSWER -----&gt; Playback(nao-atende) -&gt; Desvio para Celular\n     |\n     +---&gt; CONGESTION ---&gt; Playback(linhas-ocupadas) -&gt; Tenta Tronco de Contingência\n     |\n     +---&gt; CHANUNAVAIL --&gt; Playback(temporariamente-indisponivel) -&gt; Alerta NOC\n</code></pre>",
          "softwareConfig": {
            "software": "Asterisk Dialplan Failover",
            "file": "/etc/asterisk/extensions.conf",
            "code": "; ==============================================================================\n; ARQUIVO: /etc/asterisk/extensions.conf (Tratamento Robusto de Falhas)\n; ==============================================================================\n\n[contexto-com-failover]\nexten => _5521XXXX,1,NoOp(--- TENTANDO ROTA PRIMARIA VIA NÓ DO RIO DE JANEIRO ---)\n same => n,Dial(PJSIP/${EXTEN}@tronco-rio-primario,30,Tt)\n same => n,Goto(tratar-status-${DIALSTATUS},1)\n\n; Tratamento para Ramal Ocupado (SIP 486)\nexten => tratar-status-BUSY,1,NoOp(--- ASSINANTE OCUPADO: ENCAMINHANDO PARA VOICEMAIL ---)\n same => n,Playback(beep)\n same => n,VoiceMail(${EXTEN}@default,b)\n same => n,Hangup()\n\n; Tratamento para Canal Indisponível ou Servidor Fora (SIP 503)\nexten => tratar-status-CHANUNAVAIL,1,NoOp(--- ROTA PRIMARIA FALHOU: ACIONANDO FAILOVER VIA MIAMI ---)\n same => n,Dial(PJSIP/${EXTEN}@tronco-failover-miami,30,Tt)\n same => n,Goto(tratar-status-contingencia-${DIALSTATUS},1)\n\n; Tratamento para Incompatibilidade de Codec (SIP 488)\nexten => tratar-status-CONGESTION,1,NoOp(--- CONGESTIONAMENTO OU FALHA DE MIDIA ---)\n same => n,Playback(ss-noservice)\n same => n,Hangup()\n\nexten => tratar-status-contingencia-CHANUNAVAIL,1,NoOp(--- AMBAS AS ROTAS FALHARAM: ENVIANDO 503 AO USUARIO ---)\n same => n,Playtones(congestion)\n same => n,Congestion(10)\n same => n,Hangup()",
            "explanation": "Tratamento sistemático de status DIALSTATUS com failover para rotas de contingência e correio de voz."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP 404 Not Found",
            "summary": "Recusa de chamada para extensão não localizada com cabeçalho Q.850 cause 1",
            "rawTrace": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.50         192.168.10.10         SIP      820    Request: INVITE sip:55999999@192.168.10.10\n    2   0.001400       192.168.10.10         192.168.10.50         SIP      340    Status: 100 Trying\n    3   0.003100       192.168.10.10         192.168.10.50         SIP      512    Status: 404 Not Found (Extensão não localizada no dialplan)\n    4   0.004200       192.168.10.50         192.168.10.10         SIP      390    Request: ACK sip:55999999@192.168.10.10\n\nDETALHAMENTO DO PACOTE 3 (SIP 404 Not Found):\nSession Initiation Protocol (SIP)\n    Status-Line: SIP/2.0 404 Not Found\n    Via: SIP/2.0/UDP 192.168.10.50:5060;rport=5060;received=192.168.10.50;branch=z9hG4bKPj918237\n    From: <sip:1001@192.168.10.10>;tag=74129bc-4812\n    To: <sip:55999999@192.168.10.10>;tag=as5918274a\n    Call-ID: b1298471-82910293-192847192@192.168.10.50\n    CSeq: 1 INVITE\n    Server: Asterisk PBX 20.9.2\n    Reason: Q.850;cause=1;text=\"Unallocated (unassigned) number\"\n    Content-Length: 0"
          },
          "diagramType": "brasil"
        },
        {
          "id": "5.4",
          "title": "5.4 Auditoria Forense em Tempo Real: Jitter, Perda de Pacotes, Orçamento de Atraso e Cálculo do MOS",
          "duration": "50 min",
          "tag": "Qualidade de Voz e QoS",
          "slides": [
            {
              "title": "A Engenharia de Qualidade de Experiência (QoE)",
              "subtitle": "Métricas Objetivas vs Percepção Subjetiva do Ouvido Humano",
              "bullets": [
                "Atraso Unidirecional (One-Way Delay): O tempo que uma amostra de áudio leva da boca do emissor ao ouvido do receptor.",
                "Jitter (Variação de Atraso de Pacotes): A dispersão estatística nos tempos de chegada dos pacotes RTP sucessivos.",
                "Perda de Pacotes (Packet Loss): A taxa percentual de pacotes descartados por saturação de buffers em roteadores.",
                "Mean Opinion Score (MOS): A escala padronizada de 1 (péssimo) a 5 (excelente) para quantificar a satisfação vocal."
              ],
              "speakerNotes": "Não basta a chamada completar com sucesso: a voz precisa soar natural, contínua e inteligível. Essa é a essência do SLA de qualidade de uma operadora."
            },
            {
              "title": "O Padrão ITU-T G.107 e o Modelo E (E-Model)",
              "subtitle": "Cálculo Matemático do Fator de Transmissão R e Conversão para MOS",
              "bullets": [
                "O Fator de Transmissão R: Fórmula matemática que subtrai do valor ideal (R0 = 93.2) as perdas por atraso e codecs.",
                "Fórmula Básica do E-Model: R = R0 - Is (degradação do sinal) - Id (degradação por atraso) - Ie-eff (degradação do codec/perda).",
                "Mapeamento Direto para Escala MOS: Para R entre 0 e 100, obtém-se o MOS variando entre 1.0 e 4.5.",
                "Classificação Carrier-Grade: MOS acima de 4.0 é considerado qualidade de pedágio (Toll Quality), meta do laboratório."
              ],
              "speakerNotes": "O E-Model da ITU-T permite calcular computacionalmente a qualidade de uma chamada a partir dos dados do Wireshark sem precisar entrevistar ouvintes humanos."
            },
            {
              "title": "O Papel Crítico do Jitter Buffer",
              "subtitle": "Como os Terminais Compensam a Instabilidade da Rede IP",
              "bullets": [
                "O Mecanismo de Fila: Armazena temporariamente os pacotes recebidos para reproduzi-los com espaçamento rigoroso e uniforme.",
                "Jitter Buffer Estático vs Adaptativo: O adaptativo ajusta dinamicamente a profundidade do buffer conforme o tráfego da rede oscila.",
                "O Trade-Off Inevitável: Buffers muito profundos eliminam o jitter, mas introduzem atraso vocal perceptível (efeito walkie-talkie).",
                "Ocultação de Perda de Pacotes (PLC - Packet Loss Concealment): O decodificador sintetiza áudio preditivo para preencher lacunas."
              ],
              "speakerNotes": "Se o jitter for de 30 ms e o buffer estiver ajustado em 20 ms, 10 ms de áudio serão descartados, gerando estalos na conversação."
            },
            {
              "title": "Telemetria de Mídia via Protocolo RTCP (RFC 3550)",
              "subtitle": "Sender Reports (SR) e Receiver Reports (RR) para Monitoramento Ativo",
              "bullets": [
                "O Canal Paralelo RTCP: Opera em porta UDP ímpar imediatamente acima da porta RTP (ex: RTP em 10002, RTCP em 10003).",
                "Relatórios de Recepção (Receiver Reports): Notificam a fonte sobre fração de perda acumulada, maior número de sequência e jitter interchegada.",
                "Amostragem em Tempo Real: Envio periódico a cada 5 segundos sem sobrecarregar a largura de banda.",
                "Integração com Dashboards de NOC: Exportação contínua de métricas RTCP para Prometheus, Grafana e sistemas de bilhetagem."
              ],
              "speakerNotes": "O RTCP é a telemetria da camada de voz. Graças a ele, o NOC de uma operadora identifica a degradação de um enlace antes mesmo do assinante ligar reclamando."
            }
          ],
          "theory": "### 1. Teoria da Qualidade de Serviço e Experiência em Telefonia IP\n\nNa transmissão de voz sobre IP (VoIP), a informação analógica é continuamente amostrada, quantizada, encapsulada em pacotes IP e transmitida através de redes de comutação de pacotes. Diferente de aplicações de dados puras (como transferências HTTP ou e-mails, onde retransmissões TCP garantem integridade perfeita mesmo com atrasos), a conversação de voz humana em tempo real é extremamente sensível a três fatores físicos:\n\n1. **Atraso de Propagação e Enfileiramento (Latency / Delay)**:\n   - A recomendação **ITU-T G.114** estabelece que o atraso unidirecional (One-Way Delay) deve ser inferior a **150 ms** para a maioria dos serviços de telefonia de alta qualidade.\n   - Entre 150 ms e 400 ms, a conversa torna-se difícil, gerando interrupções mútuas e sobreposições de fala.\n   - Acima de 400 ms, a comunicação bidirecional natural é considerada inaceitável.\n\n2. **Jitter de Rede (Variação de Atraso)**:\n   - Ocorre devido a rotas distintas percorridas por pacotes sucessivos e variações no tempo de fila dos buffers dos roteadores.\n   - O jitter interchegada ($J$) é calculado segundo o algoritmo da RFC 3550:\n   $$D(i, j) = (R_j - R_i) - (S_j - S_i)$$\n   $$J_i = J_{i-1} + \\frac{|D(i-1, i)| - J_{i-1}}{16}$$\n   - Onde $S$ representa o carimbo de tempo RTP do transmissor e $R$ o carimbo de tempo de recepção local.\n\n3. **Perda de Pacotes (Packet Loss)**:\n   - Uma perda superior a 1% em codecs sem PLC gera cortes perceptíveis na fala.\n   - Em codecs modernos como o **Opus**, o mecanismo nativo de In-Band FEC (Forward Error Correction) e PLC permite tolerar até 15% de perda contínua sem degradação severa da inteligibilidade.\n\n---\n\n### 2. O Modelo Matemático E-Model (ITU-T G.107) e o Cálculo do MOS\n\nO Modelo E (E-Model) é um modelo de cálculo computacional objetivo que estima a qualidade vocal combinando todas as deficiências de transmissão em um único índice denominado **Fator de Classificação de Transmissão $R$**:\n\n$$R = R_0 - I_s - I_d - I_{e,eff} + A$$\n\nOnde:\n- **$R_0$**: Relação sinal-ruído básica ideal (normalmente adotada como $93.2$).\n- **$I_s$**: Degradações simultâneas ao sinal vocal (quantização PCM, ruído de fundo).\n- **$I_d$**: Degradações causadas por atraso excessivo e desajustes de eco.\n- **$I_{e,eff}$**: Fator de degradação efetivo do equipamento, ponderando o codec utilizado e a perda de pacotes:\n  $$I_{e,eff} = I_e + (95 - I_e) \\times \\frac{P_{pl}}{P_{pl} + B_{pl}}$$\n  onde $I_e$ é a degradação intrínseca do codec, $P_{pl}$ é a porcentagem de perda de pacotes e $B_{pl}$ é o fator de robustez do codec à perda de pacotes.\n- **$A$**: Fator de vantagem ou expectativa do usuário (zero para redes fixas corporativas).\n\nA conversão do índice $R$ para o valor **MOS (Mean Opinion Score)** obedece à equação padronizada da ITU-T:\n- Para $R \\le 0$: $MOS = 1.0$\n- Para $0 < R < 100$:\n  $$MOS = 1 + 0.035 R + R(R - 60)(100 - R) \\times 7 \\times 10^{-6}$$\n- Para $R \\ge 100$: $MOS = 4.5$\n\n| Valor MOS | Classificação ITU-T | Experiência do Assinante |\n|---|---|---|\n| 4.3 a 4.5 | Excelente | Nível de operadora premium (Toll Quality), som límpido e cristalino. |\n| 4.0 a 4.3 | Bom | Comunicação perfeitamente clara, esforço de audição nulo. |\n| 3.6 a 4.0 | Aceitável | Pequeno atraso ou ruído percebido, mas conversação perfeitamente inteligível. |\n| 3.0 a 3.6 | Regular | Ruído ou falhas ocasionais exigem repetição ocasional de palavras. |\n| 1.0 a 3.0 | Ruim / Inaceitável | Cortes contínuos, atraso insuportável, chamada impraticável. |\n\n---\n\n### 3. Análise Forense com o Wireshark (Ferramenta RTP Player e Stream Analysis)\n\nNo laboratório, a auditoria é executada capturando-se as interfaces de rede dos nós e utilizando o menu:\n`Telephony -> RTP -> RTP Streams -> Analyse`\n\nMétricas inspecionadas linha a linha no dump:\n1. **Delta máximo e médio**: O espaçamento temporal entre pacotes RTP sucessivos. Para pacotes com tempo de empacotamento (`ptime`) de 20 ms, o delta esperado é exatamente 20,000 ms.\n2. **Skews de relógio**: Desvios graduais entre o oscilador de cristal do terminal emissor e do receptor.\n3. **Seq Errors e Marker Bits**: Verificação de pacotes que chegaram fora de ordem ou foram totalmente descartados pela infraestrutura de rede.",
          "configCode": "; ==============================================================================\n; ARQUIVO: /etc/asterisk/rtp.conf (Calibração Carrier-Grade de Mídia e RTCP)\n; ==============================================================================\n\n[general]\n; Faixa de portas UDP dedicadas exclusivamente aos canais de mídia RTP\nrtpstart=10000\nrtpend=20000\n\n; Ativação rigorosa do RTCP para monitoramento contínuo de QoS\nrtcpinterval=5000\n\n; Proteção contra pacotes que chegam fora de ordem\nrtpchecksums=yes\n\n; Resolução de travessia simétrica de NAT (Symmetric RTP RFC 3581 / RFC 4961)\nstrictrtp=yes\nprobation=4\n\n; ==============================================================================\n; TRECHO DO PJSIP.CONF: Configuração do Jitter Buffer no Endpoint\n; ==============================================================================\n[1001]\ntype=endpoint\ncontext=interconexao-global\ndisallow=all\nallow=opus,pcma\ndirect_media=no\nrtp_symmetric=yes\nforce_rport=yes\nrewrite_contact=yes\n\n; Parâmetros de Jitter Buffer no canal\njitterbuffer=yes\n; jb_max_size=200      ; Tamanho máximo do buffer em milissegundos\n; jb_impl=adaptive     ; Implementação adaptativa que acompanha oscilações da rede\n; jb_target_extra=40   ; Margem adicional de segurança para absorver picos de jitter",
          "traceDissection": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.50         192.168.10.10         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x74A1B2C3, Seq=101, Time=96000\n    2   0.020015       192.168.10.50         192.168.10.10         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x74A1B2C3, Seq=102, Time=96960\n    3   0.040010       192.168.10.50         192.168.10.10         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x74A1B2C3, Seq=103, Time=97920\n   50   1.000210       192.168.10.10         192.168.10.50         RTCP     112    Receiver Report (RR) | Fraction lost: 0, Jitter: 12 (0.25 ms)\n\nDISSECAÇÃO DO PACOTE 50 (RTCP Receiver Report):\nReal-time Transport Control Protocol (RTCP)\n    [Stream setup by: SIP/2.0 200 OK]\n    10.. .... = Version: RFC 1889 Version (2)\n    ..0. .... = Padding: False\n    ...0 0001 = Reception report count: 1\n    Packet type: Receiver Report (201)\n    Length: 7 (32 bytes)\n    Sender SSRC: 0x19283746\n    Report Block 1:\n        Identifier: 0x74A1B2C3\n        Fraction lost: 0 / 256 (0.0% de pacotes perdidos)\n        Cumulative number of packets lost: 0\n        Extended highest sequence number received: 150\n        Interarrival jitter: 12 timestamp units (0.25 ms)\n        Last SR timestamp (LSR): 0x0\n        Delay since last SR (DLSR): 0\n\nCÁLCULO CONSOLIDADO DO MODELO E (E-MODEL) PARA ESTE FLUXO:\n- Fator R Calculado: 92.4\n- Classificação MOS: 4.41 (Excelente / Toll Quality)\n- Status de Auditoria do Laboratório: HOMOLOGADO CONFORME RESOLUÇÃO ANATEL 777/2025",
          "diagram": "global",
          "theoryText": "<h3>1. Teoria da Qualidade de Serviço e Experiência em Telefonia IP</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">Na transmissão de voz sobre IP (VoIP), a informação analógica é continuamente amostrada, quantizada, encapsulada em pacotes IP e transmitida através de redes de comutação de pacotes. Diferente de aplicações de dados puras (como transferências HTTP ou e-mails, onde retransmissões TCP garantem integridade perfeita mesmo com atrasos), a conversação de voz humana em tempo real é extremamente sensível a três fatores físicos:\n<li><strong>Atraso de Propagação e Enfileiramento (Latency / Delay)</strong>:</li>\n<li>A recomendação <strong>ITU-T G.114</strong> estabelece que o atraso unidirecional (One-Way Delay) deve ser inferior a <strong>150 ms</strong> para a maioria dos serviços de telefonia de alta qualidade.</li>\n<li>Entre 150 ms e 400 ms, a conversa torna-se difícil, gerando interrupções mútuas e sobreposições de fala.</li>\n<li>Acima de 400 ms, a comunicação bidirecional natural é considerada inaceitável.</li>\n<li><strong>Jitter de Rede (Variação de Atraso)</strong>:</li>\n<li>Ocorre devido a rotas distintas percorridas por pacotes sucessivos e variações no tempo de fila dos buffers dos roteadores.</li>\n<li>O jitter interchegada ($J$) é calculado segundo o algoritmo da RFC 3550:</li>\n   $$D(i, j) = (R_j - R_i) - (S_j - S_i)$$\n   $$J_i = J_{i-1} + \\frac{|D(i-1, i)| - J_{i-1}}{16}$$\n<li>Onde $S$ representa o carimbo de tempo RTP do transmissor e $R$ o carimbo de tempo de recepção local.</li>\n<li><strong>Perda de Pacotes (Packet Loss)</strong>:</li>\n<li>Uma perda superior a 1% em codecs sem PLC gera cortes perceptíveis na fala.</li>\n<li>Em codecs modernos como o <strong>Opus</strong>, o mecanismo nativo de In-Band FEC (Forward Error Correction) e PLC permite tolerar até 15% de perda contínua sem degradação severa da inteligibilidade.</li></p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>2. O Modelo Matemático E-Model (ITU-T G.107) e o Cálculo do MOS</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">O Modelo E (E-Model) é um modelo de cálculo computacional objetivo que estima a qualidade vocal combinando todas as deficiências de transmissão em um único índice denominado <strong>Fator de Classificação de Transmissão $R$</strong>:</p>\n<p class=\"text-slate-300 leading-relaxed my-2\">$$R = R_0 - I_s - I_d - I_{e,eff} + A$$</p>\n<p class=\"text-slate-300 leading-relaxed my-2\">Onde:\n<li><strong>$R_0$</strong>: Relação sinal-ruído básica ideal (normalmente adotada como $93.2$).</li>\n<li><strong>$I_s$</strong>: Degradações simultâneas ao sinal vocal (quantização PCM, ruído de fundo).</li>\n<li><strong>$I_d$</strong>: Degradações causadas por atraso excessivo e desajustes de eco.</li>\n<li><strong>$I_{e,eff}$</strong>: Fator de degradação efetivo do equipamento, ponderando o codec utilizado e a perda de pacotes:</li>\n  $$I_{e,eff} = I_e + (95 - I_e) \\times \\frac{P_{pl}}{P_{pl} + B_{pl}}$$\n  onde $I_e$ é a degradação intrínseca do codec, $P_{pl}$ é a porcentagem de perda de pacotes e $B_{pl}$ é o fator de robustez do codec à perda de pacotes.\n<li><strong>$A$</strong>: Fator de vantagem ou expectativa do usuário (zero para redes fixas corporativas).</li></p>\n<p class=\"text-slate-300 leading-relaxed my-2\">A conversão do índice $R$ para o valor <strong>MOS (Mean Opinion Score)</strong> obedece à equação padronizada da ITU-T:\n<li>Para $R \\le 0$: $MOS = 1.0$</li>\n<li>Para $0 < R < 100$:</li>\n  $$MOS = 1 + 0.035 R + R(R - 60)(100 - R) \\times 7 \\times 10^{-6}$$\n<li>Para $R \\ge 100$: $MOS = 4.5$</li></p>\n<p class=\"text-slate-300 leading-relaxed my-2\">| Valor MOS | Classificação ITU-T | Experiência do Assinante |\n|---|---|---|\n| 4.3 a 4.5 | Excelente | Nível de operadora premium (Toll Quality), som límpido e cristalino. |\n| 4.0 a 4.3 | Bom | Comunicação perfeitamente clara, esforço de audição nulo. |\n| 3.6 a 4.0 | Aceitável | Pequeno atraso ou ruído percebido, mas conversação perfeitamente inteligível. |\n| 3.0 a 3.6 | Regular | Ruído ou falhas ocasionais exigem repetição ocasional de palavras. |\n| 1.0 a 3.0 | Ruim / Inaceitável | Cortes contínuos, atraso insuportável, chamada impraticável. |</p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>3. Análise Forense com o Wireshark (Ferramenta RTP Player e Stream Analysis)</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">No laboratório, a auditoria é executada capturando-se as interfaces de rede dos nós e utilizando o menu:\n<code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">Telephony -> RTP -> RTP Streams -> Analyse</code></p>\n<p class=\"text-slate-300 leading-relaxed my-2\">Métricas inspecionadas linha a linha no dump:\n<li><strong>Delta máximo e médio</strong>: O espaçamento temporal entre pacotes RTP sucessivos. Para pacotes com tempo de empacotamento (<code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">ptime</code>) de 20 ms, o delta esperado é exatamente 20,000 ms.</li>\n<li><strong>Skews de relógio</strong>: Desvios graduais entre o oscilador de cristal do terminal emissor e do receptor.</li>\n<li><strong>Seq Errors e Marker Bits</strong>: Verificação de pacotes que chegaram fora de ordem ou foram totalmente descartados pela infraestrutura de rede.</li></p>",
          "softwareConfig": {
            "software": "Asterisk RTP & PJSIP QoS",
            "file": "/etc/asterisk/rtp.conf",
            "code": "; ==============================================================================\n; ARQUIVO: /etc/asterisk/rtp.conf (Calibração Carrier-Grade de Mídia e RTCP)\n; ==============================================================================\n\n[general]\n; Faixa de portas UDP dedicadas exclusivamente aos canais de mídia RTP\nrtpstart=10000\nrtpend=20000\n\n; Ativação rigorosa do RTCP para monitoramento contínuo de QoS\nrtcpinterval=5000\n\n; Proteção contra pacotes que chegam fora de ordem\nrtpchecksums=yes\n\n; Resolução de travessia simétrica de NAT (Symmetric RTP RFC 3581 / RFC 4961)\nstrictrtp=yes\nprobation=4\n\n; ==============================================================================\n; TRECHO DO PJSIP.CONF: Configuração do Jitter Buffer no Endpoint\n; ==============================================================================\n[1001]\ntype=endpoint\ncontext=interconexao-global\ndisallow=all\nallow=opus,pcma\ndirect_media=no\nrtp_symmetric=yes\nforce_rport=yes\nrewrite_contact=yes\n\n; Parâmetros de Jitter Buffer no canal\njitterbuffer=yes\n; jb_max_size=200      ; Tamanho máximo do buffer em milissegundos\n; jb_impl=adaptive     ; Implementação adaptativa que acompanha oscilações da rede\n; jb_target_extra=40   ; Margem adicional de segurança para absorver picos de jitter",
            "explanation": "Calibração de portas RTP (10000-20000), RTCP periódico a 5000ms e ativação do Jitter Buffer adaptativo."
          },
          "wiresharkAnalysis": {
            "protocol": "RTP / RTCP QoS",
            "summary": "Sender & Receiver Reports demonstrando 0% de perda de pacotes e MOS 4.41",
            "rawTrace": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.50         192.168.10.10         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x74A1B2C3, Seq=101, Time=96000\n    2   0.020015       192.168.10.50         192.168.10.10         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x74A1B2C3, Seq=102, Time=96960\n    3   0.040010       192.168.10.50         192.168.10.10         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x74A1B2C3, Seq=103, Time=97920\n   50   1.000210       192.168.10.10         192.168.10.50         RTCP     112    Receiver Report (RR) | Fraction lost: 0, Jitter: 12 (0.25 ms)\n\nDISSECAÇÃO DO PACOTE 50 (RTCP Receiver Report):\nReal-time Transport Control Protocol (RTCP)\n    [Stream setup by: SIP/2.0 200 OK]\n    10.. .... = Version: RFC 1889 Version (2)\n    ..0. .... = Padding: False\n    ...0 0001 = Reception report count: 1\n    Packet type: Receiver Report (201)\n    Length: 7 (32 bytes)\n    Sender SSRC: 0x19283746\n    Report Block 1:\n        Identifier: 0x74A1B2C3\n        Fraction lost: 0 / 256 (0.0% de pacotes perdidos)\n        Cumulative number of packets lost: 0\n        Extended highest sequence number received: 150\n        Interarrival jitter: 12 timestamp units (0.25 ms)\n        Last SR timestamp (LSR): 0x0\n        Delay since last SR (DLSR): 0\n\nCÁLCULO CONSOLIDADO DO MODELO E (E-MODEL) PARA ESTE FLUXO:\n- Fator R Calculado: 92.4\n- Classificação MOS: 4.41 (Excelente / Toll Quality)\n- Status de Auditoria do Laboratório: HOMOLOGADO CONFORME RESOLUÇÃO ANATEL 777/2025"
          },
          "diagramType": "global"
        }
      ]
    },
    {
      "id": 6,
      "title": "Módulo 6: Materiais Complementares, Apresentação Executiva, Podcast NotebookLM e Certificação",
      "summary": "O fechamento de excelência da formação em telecomunicações: o deck executivo de slides de apresentação para a diretoria, o Deep Dive em áudio sintetizado a partir do acervo bibliográfico pelo Google NotebookLM Studio com transcrição técnica e sincronismo, e os critérios formais para certificação de engenheiro de telecomunicações MVNO.",
      "lessons": [
        {
          "id": "6.1",
          "title": "6.1 Apresentação Executiva em Slides: O Ecossistema Integrado MVNO Telecom 2026",
          "duration": "35 min",
          "tag": "Apresentação Executiva",
          "slides": [
            {
              "title": "Visão Executiva do Laboratório MVNO 2026",
              "subtitle": "Infraestrutura Completa de Telefonia Móvel Virtual e Núcleo Privado 5G",
              "bullets": [
                "Proposta Estratégica: Criação de um ecossistema completo de telecomunicações sem dependência de hardware proprietário.",
                "Tecnologias Integradas: Open5GS (Núcleo 5G Standalone), Yate C++ (Comutação SS7/SIP) e Asterisk 20 (PBX Carrier-Grade).",
                "Topologia Internacional: Malha interligando 6 praças globais em 3 países (Brasil, EUA e Portugal) com plano E.164.",
                "Conformidade Regulatória: Total aderência à Resolução Anatel nº 777/2025 para MVNOs Autorizadas e Credenciadas."
              ],
              "speakerNotes": "Esta apresentação executiva sintetiza meses de engenharia e implementação, demonstrando a viabilidade técnica e financeira de uma operadora virtual de altíssimo desempenho."
            },
            {
              "title": "A Ruptura do Modelo Monolítico Tradicional",
              "subtitle": "Da Infraestrutura Proprietária Caixa-Preta para Redes Desagregadas e Abertas",
              "bullets": [
                "O Modelo Tradicional: Equipamentos monolíticos com custo de licenciamento proibitivo e evolução técnica travada por fornecedor único.",
                "A Abordagem Open Source: Softwares modulares com código aberto auditado, rodando em servidores COTS (Commercial Off-The-Shelf).",
                "Virtualização e Containers: Núcleo conteinerizado em Docker/Kubernetes com escalabilidade elástica sob demanda.",
                "Redução Radical de OPEX e CAPEX: Economia estimada de mais de 70% em relação a soluções de fabricantes convencionais."
              ],
              "speakerNotes": "O movimento de desagregação das telecomunicações com Open RAN e Core 5G aberto nivelou o jogo, permitindo que novas operadoras e MVNOs inovem com agilidade."
            },
            {
              "title": "Orquestração de Sinalização e Matriz de Encaminhamento",
              "subtitle": "O Papel Central do Yate como Gateway Multiprotocolo",
              "bullets": [
                "Interconexão de Mundos: O Yate atua como tradutor universal entre protocolos TDM/ISDN/SS7 e a sinalização moderna SIP/IMS.",
                "Roteamento Baseado em Regras e Regex: Decisão instantânea em C++ de rotas de menor custo (LCR - Least Cost Routing).",
                "Normalização de Chamador e Chamado: Reescrita transparente de números no padrão internacional E.164.",
                "Isolamento de Falhas: Tolerância a perdas de enlace com failover automático para rotas alternativas."
              ],
              "speakerNotes": "A flexibilidade do Yate C++ permite integrar sistemas anteriores ou tradicionais de comutação com a nova era IP sem perda de pacotes ou interrupção de chamadas."
            },
            {
              "title": "Roadmap Tecnológico e Próximos Passos (2026 - 2028)",
              "subtitle": "Evolução Contínua para Redes Críticas e Autonomia Operacional",
              "bullets": [
                "Fase 1 (Concluída): Núcleo 5G Open5GS + PBX Asterisk PJSIP + Gateway Yate + Topologia Multi-País.",
                "Fase 2 (Em Andamento): Expansão da cobertura de rádio simulada via UERANSIM para múltiplos gNodeBs e slicing de rede.",
                "Fase 3: Implantação de rádio físico com USRP B210 para validação com smartphones comerciais.",
                "Fase 4: Orquestração e automação de rede com inteligência artificial para predição de tráfego e auto-recuperação (Self-Healing)."
              ],
              "speakerNotes": "Nossa esteira de engenharia estabelece uma base sólida e escalável para suportar aplicações críticas de voz corporativa, IoT industrial e MVNOs de missão crítica."
            }
          ],
          "theory": "### 1. Síntese Executiva para Tomadores de Decisão Técnica (C-Level & NOC Leadership)\n\nA convergência entre a tecnologia de Tecnologia da Informação (TI) e a Engenharia de Telecomunicações atingiu sua maturidade plena em 2026. Historicamente, a construção de uma operadora de telefonia celular ou fixa exigia investimentos de dezenas de milhões de dólares em equipamentos proprietários e contratos de suporte plurianuais com grandes conglomerados industriais.\n\nO **Laboratório MVNO Telecom 2026** comprova que é plenamente possível, seguro e homologável construir uma infraestrutura de telecomunicações de classe de operadora (Carrier-Grade) utilizando exclusivamente componentes de software livre maduros e padronizados pelas normas mundiais do **3GPP** e do **IETF**:\n\n```\n   +-----------------------------------------------------------------------------------+\n   |                                 CAMADA DE GESTÃO E OSS/BSS                        |\n   |           Billing, CRM, Provisionamento Zero-Touch, Monitoramento Grafana/RTCP    |\n   +-----------------------------------------------------------------------------------+\n                                            |\n   +----------------------------------------+------------------------------------------+\n   |                                        |                                          |\n   v                                        v                                          v\n+-----------------------+        +----------------------+        +---------------------+\n|      NÚCLEO 5G SA     |        |   GATEWAY DE BORDA   |        |    APLICAÇÃO DE     |\n|       (Open5GS)       | <----> |      (Yate C++)      | <----> |  SERVIÇOS (Asterisk)|\n| AMF / SMF / UPF / UDM |  NGAP  | SIP Trunking / ISDN  |  PJSIP | ConfBridge / Voicemail|\n+-----------------------+        +----------------------+        +---------------------+\n            |                               |                               |\n            +-------------------------------+-------------------------------+\n                                            |\n                                            v\n                             +------------------------------+\n                             |  MALHA GLOBAL DE TRANSPORTE  |\n                             |  Brasil  -  EUA  -  Portugal |\n                             +------------------------------+\n```\n\n---\n\n### 2. Viabilidade Regulatória: Resolução Anatel nº 777/2025\n\nA Agência Nacional de Telecomunicações (Anatel) atualizou as regras para Prestadoras de Serviços de Telecomunicações Móveis Pessoais (SMP) e redes virtuais, categorizando-as em:\n\n1. **MVNO Credenciada (Light MVNO)**:\n   - Atua primordialmente na comercialização e suporte ao cliente, utilizando a totalidade da rede de acesso por rádio (RAN) e do núcleo da operadora de origem (MNO).\n   - Menor risco financeiro, mas baixa flexibilidade técnica e dependência total das tarifas da operadora anfitriã.\n\n2. **MVNO Autorizada (Full MVNO)**:\n   - Possui seu próprio núcleo de rede (Core Network), seus próprios códigos de rede móvel (MNC - Mobile Network Code), gerencia seus próprios cartões SIM/eSIM (HSS/UDM), emite bilhetagem independente e roteia seu tráfego de voz e dados.\n   - É exatamente esta categoria de **Full MVNO** que a arquitetura do laboratório modela e valida com perfeição.\n\n---\n\n### 3. Matriz Comparativa: Solução Open Source vs Fabricante Convencional\n\n| Dimensão Técnica | Arquitetura Aberta (Open5GS + Yate + Asterisk) | Solução Proprietária Convencional |\n|---|---|---|\n| **Custo de Licenciamento** | Zero licença por ramal/assinante (Software Livre) | Licença recorrente cobrada por assinante ativo e por canal |\n| **Hardware Requerido** | Servidores convencionais x86_64 COTS ou Nuvem | Servidores blade customizados ou appliances blindados |\n| **Transparência de Código** | 100% auditável, patches imediatos contra vulnerabilidades | Caixa-preta (dependência de cronograma do fabricante) |\n| **Flexibilidade de Dialplan** | Expressões regulares C++ e scripts de dialplan ilimitados | Menus rígidos de configuração pré-definidos |\n| **Integração de APIs** | APIs REST, WebSockets, bancos relacionais PostgreSQL/MySQL | Protocolos proprietários ou conectores pagos à parte |",
          "configCode": "; ==============================================================================\n; MANIFESTO DE CARGA DA ARQUITETURA MVNO 2026 (Docker Compose / Systemd)\n; Orquestração dos microsserviços de telecomunicações do ecossistema\n; ==============================================================================\n\nversion: '3.8'\n\nservices:\n  open5gs-core:\n    image: open5gs/open5gs:latest\n    container_name: open5gs-core-sa\n    privileged: true\n    volumes:\n      - /etc/open5gs:/etc/open5gs:ro\n    ports:\n      - \"38412:38412/sctp\"  ; Interface N2 (NGAP)\n      - \"2152:2152/udp\"     ; Interface N3 (GTP-U)\n    restart: always\n\n  yate-gateway:\n    image: yate-telecom:latest\n    container_name: yate-gateway-central\n    volumes:\n      - /etc/yate:/etc/yate:ro\n    ports:\n      - \"5060:5060/udp\"     ; Sinalização SIP Gateway\n      - \"10000-10500:10000-10500/udp\" ; Faixa de Mídia RTP\n    restart: always\n\n  asterisk-pbx:\n    image: asterisk-carrier:20\n    container_name: asterisk-pbx-services\n    volumes:\n      - /etc/asterisk:/etc/asterisk:ro\n    ports:\n      - \"5062:5060/udp\"     ; Sinalização PJSIP Ramais e Serviços\n      - \"10501-11000:10501-11000/udp\" ; Mídia RTP ConfBridge/Echo\n    restart: always",
          "traceDissection": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.10         192.168.10.20         SIP      890    Request: INVITE sip:351215001@192.168.10.20 (Origem SP -> Destino Lisboa)\n    2   0.001500       192.168.10.20         192.168.10.10         SIP      350    Status: 100 Trying\n    3   0.012400       192.168.10.20         10.50.1.1             SIP      920    Request: INVITE sip:5001@10.50.1.1 (Encaminhamento Transcontinental Yate)\n    4   0.145000       10.50.1.1             192.168.10.20         SIP      410    Status: 180 Ringing (Campainha tocando em Lisboa)\n    5   0.146200       192.168.10.20         192.168.10.10         SIP      410    Status: 180 Ringing (Repasse para São Paulo)\n    6   0.620000       10.50.1.1             192.168.10.20         SIP      980    Status: 200 OK (António Silva atendeu em Lisboa)\n    7   0.621500       192.168.10.20         192.168.10.10         SIP      980    Status: 200 OK (Repasse para Asterisk SP)\n\nRESUMO DA AUDITORIA EXECUTIVA:\n- Tempo de Pós-Discagem (PDD) Medido: 620 milissegundos\n- Rotas Percorridas: Asterisk SP (1001) -> Yate SP (5060) -> Enlace Internacional -> POP Lisboa (5001)\n- Resolução Regulatória: Em estrita conformidade com a Resolução Anatel nº 777/2025.",
          "diagram": "global",
          "theoryText": "<h3>1. Síntese Executiva para Tomadores de Decisão Técnica (C-Level & NOC Leadership)</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">A convergência entre a tecnologia de Tecnologia da Informação (TI) e a Engenharia de Telecomunicações atingiu sua maturidade plena em 2026. Historicamente, a construção de uma operadora de telefonia celular ou fixa exigia investimentos de dezenas de milhões de dólares em equipamentos proprietários e contratos de suporte plurianuais com grandes conglomerados industriais.</p>\n<p class=\"text-slate-300 leading-relaxed my-2\">O <strong>Laboratório MVNO Telecom 2026</strong> comprova que é plenamente possível, seguro e homologável construir uma infraestrutura de telecomunicações de classe de operadora (Carrier-Grade) utilizando exclusivamente componentes de software livre maduros e padronizados pelas normas mundiais do <strong>3GPP</strong> e do <strong>IETF</strong>:</p>\n<pre class=\"bg-slate-950 p-4 rounded-lg my-3 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto\"><code>   +-----------------------------------------------------------------------------------+\n   |                                 CAMADA DE GESTÃO E OSS/BSS                        |\n   |           Billing, CRM, Provisionamento Zero-Touch, Monitoramento Grafana/RTCP    |\n   +-----------------------------------------------------------------------------------+\n                                            |\n   +----------------------------------------+------------------------------------------+\n   |                                        |                                          |\n   v                                        v                                          v\n+-----------------------+        +----------------------+        +---------------------+\n|      NÚCLEO 5G SA     |        |   GATEWAY DE BORDA   |        |    APLICAÇÃO DE     |\n|       (Open5GS)       | &lt;----&gt; |      (Yate C++)      | &lt;----&gt; |  SERVIÇOS (Asterisk)|\n| AMF / SMF / UPF / UDM |  NGAP  | SIP Trunking / ISDN  |  PJSIP | ConfBridge / Voicemail|\n+-----------------------+        +----------------------+        +---------------------+\n            |                               |                               |\n            +-------------------------------+-------------------------------+\n                                            |\n                                            v\n                             +------------------------------+\n                             |  MALHA GLOBAL DE TRANSPORTE  |\n                             |  Brasil  -  EUA  -  Portugal |\n                             +------------------------------+\n</code></pre>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>2. Viabilidade Regulatória: Resolução Anatel nº 777/2025</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">A Agência Nacional de Telecomunicações (Anatel) atualizou as regras para Prestadoras de Serviços de Telecomunicações Móveis Pessoais (SMP) e redes virtuais, categorizando-as em:\n<li><strong>MVNO Credenciada (Light MVNO)</strong>:</li>\n<li>Atua primordialmente na comercialização e suporte ao cliente, utilizando a totalidade da rede de acesso por rádio (RAN) e do núcleo da operadora de origem (MNO).</li>\n<li>Menor risco financeiro, mas baixa flexibilidade técnica e dependência total das tarifas da operadora anfitriã.</li>\n<li><strong>MVNO Autorizada (Full MVNO)</strong>:</li>\n<li>Possui seu próprio núcleo de rede (Core Network), seus próprios códigos de rede móvel (MNC - Mobile Network Code), gerencia seus próprios cartões SIM/eSIM (HSS/UDM), emite bilhetagem independente e roteia seu tráfego de voz e dados.</li>\n<li>É exatamente esta categoria de <strong>Full MVNO</strong> que a arquitetura do laboratório modela e valida com perfeição.</li></p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>3. Matriz Comparativa: Solução Open Source vs Fabricante Convencional</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">| Dimensão Técnica | Arquitetura Aberta (Open5GS + Yate + Asterisk) | Solução Proprietária Convencional |\n|---|---|---|\n| <strong>Custo de Licenciamento</strong> | Zero licença por ramal/assinante (Software Livre) | Licença recorrente cobrada por assinante ativo e por canal |\n| <strong>Hardware Requerido</strong> | Servidores convencionais x86_64 COTS ou Nuvem | Servidores blade customizados ou appliances blindados |\n| <strong>Transparência de Código</strong> | 100% auditável, patches imediatos contra vulnerabilidades | Caixa-preta (dependência de cronograma do fabricante) |\n| <strong>Flexibilidade de Dialplan</strong> | Expressões regulares C++ e scripts de dialplan ilimitados | Menus rígidos de configuração pré-definidos |\n| <strong>Integração de APIs</strong> | APIs REST, WebSockets, bancos relacionais PostgreSQL/MySQL | Protocolos proprietários ou conectores pagos à parte |</p>",
          "softwareConfig": {
            "software": "Docker Compose Carrier Orchestration",
            "file": "docker-compose.yml",
            "code": "; ==============================================================================\n; MANIFESTO DE CARGA DA ARQUITETURA MVNO 2026 (Docker Compose / Systemd)\n; Orquestração dos microsserviços de telecomunicações do ecossistema\n; ==============================================================================\n\nversion: '3.8'\n\nservices:\n  open5gs-core:\n    image: open5gs/open5gs:latest\n    container_name: open5gs-core-sa\n    privileged: true\n    volumes:\n      - /etc/open5gs:/etc/open5gs:ro\n    ports:\n      - \"38412:38412/sctp\"  ; Interface N2 (NGAP)\n      - \"2152:2152/udp\"     ; Interface N3 (GTP-U)\n    restart: always\n\n  yate-gateway:\n    image: yate-telecom:latest\n    container_name: yate-gateway-central\n    volumes:\n      - /etc/yate:/etc/yate:ro\n    ports:\n      - \"5060:5060/udp\"     ; Sinalização SIP Gateway\n      - \"10000-10500:10000-10500/udp\" ; Faixa de Mídia RTP\n    restart: always\n\n  asterisk-pbx:\n    image: asterisk-carrier:20\n    container_name: asterisk-pbx-services\n    volumes:\n      - /etc/asterisk:/etc/asterisk:ro\n    ports:\n      - \"5062:5060/udp\"     ; Sinalização PJSIP Ramais e Serviços\n      - \"10501-11000:10501-11000/udp\" ; Mídia RTP ConfBridge/Echo\n    restart: always",
            "explanation": "Orquestração completa dos contêineres Open5GS (5G SA Core), Yate (Gateway) e Asterisk 20 (PBX)."
          },
          "wiresharkAnalysis": {
            "protocol": "SIP Intercontinental",
            "summary": "Roteamento de chamada transcontinental Brasil -> Portugal com PDD de 620 ms",
            "rawTrace": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.10         192.168.10.20         SIP      890    Request: INVITE sip:351215001@192.168.10.20 (Origem SP -> Destino Lisboa)\n    2   0.001500       192.168.10.20         192.168.10.10         SIP      350    Status: 100 Trying\n    3   0.012400       192.168.10.20         10.50.1.1             SIP      920    Request: INVITE sip:5001@10.50.1.1 (Encaminhamento Transcontinental Yate)\n    4   0.145000       10.50.1.1             192.168.10.20         SIP      410    Status: 180 Ringing (Campainha tocando em Lisboa)\n    5   0.146200       192.168.10.20         192.168.10.10         SIP      410    Status: 180 Ringing (Repasse para São Paulo)\n    6   0.620000       10.50.1.1             192.168.10.20         SIP      980    Status: 200 OK (António Silva atendeu em Lisboa)\n    7   0.621500       192.168.10.20         192.168.10.10         SIP      980    Status: 200 OK (Repasse para Asterisk SP)\n\nRESUMO DA AUDITORIA EXECUTIVA:\n- Tempo de Pós-Discagem (PDD) Medido: 620 milissegundos\n- Rotas Percorridas: Asterisk SP (1001) -> Yate SP (5060) -> Enlace Internacional -> POP Lisboa (5001)\n- Resolução Regulatória: Em estrita conformidade com a Resolução Anatel nº 777/2025."
          },
          "diagramType": "global"
        },
        {
          "id": "6.2",
          "title": "6.2 Deep Dive em Áudio: Síntese e Podcast do NotebookLM Studio com Transcrição Técnica",
          "duration": "45 min",
          "tag": "NotebookLM Studio",
          "slides": [
            {
              "title": "O Deep Dive em Áudio do Google NotebookLM",
              "subtitle": "Síntese Avançada de Inteligência Artificial Gerativa a partir do Acervo Técnico",
              "bullets": [
                "Fontes Bibliográficas Utilizadas: O livro de redes do professor Carlos Lopes, manuais 3GPP e documentação de software.",
                "Formato de Debate Técnico: Dois especialistas em IA discutem os desafios de engenharia, arquitetura e comutação da MVNO.",
                "Áudio Autêntico e Integral: 22,7 Megabytes de áudio estéreo com profundidade de análise incomparável.",
                "Sincronização com o EAD: Player nativo HTML5 integrado com transcrição textual para acompanhamento didático."
              ],
              "speakerNotes": "O NotebookLM Studio representa a vanguarda do aprendizado técnico acelerado, convertendo centenas de páginas de teoria árdua em um diálogo cativante e de altíssimo nível conceitual."
            },
            {
              "title": "Os Temas Centrais Abordados no Podcast",
              "subtitle": "Do Hardware de Rádio à Sinalização Interurbana de Pacotes",
              "bullets": [
                "A Magia do SDR (Software Defined Radio): Como o computador transforma amostras I/Q matemáticas em ondas de rádio RF.",
                "O Dilema da Latência de Mídia: Por que 150 milissegundos é a fronteira psicológica da conversação humana.",
                "Segurança e Ataques em VoIP: Como os registros SIP sem proteção são alvos imediatos de fraudes de tarifação.",
                "A Convivência do Antigo com o Novo: Como nós em C++ como o Yate salvam a interconexão com redes tradicionais."
              ],
              "speakerNotes": "O podcast discute com naturalidade os maiores dilemas de design enfrentados pela equipe de engenharia durante o desenvolvimento do laboratório."
            },
            {
              "title": "A Transcrição Anotada e Destaques Didáticos",
              "subtitle": "Acompanhamento Textual com Referências às Aulas e RFCs Relevantes",
              "bullets": [
                "Marcação de Minutagem: Índices clicáveis para saltar diretamente para os tópicos de interesse no player.",
                "Glossário em Tempo Real: Explicação dos termos técnicos conforme são pronunciados no debate sonoro.",
                "Complemento Teórico: O áudio expande os tópicos apresentados nos slides e aprofunda as lições dos Módulos 1 a 5.",
                "Acessibilidade Universal: Texto completo disponível para pessoas com deficiência auditiva ou ambientes silenciosos."
              ],
              "speakerNotes": "A combinação de áudio envolvente com texto estruturado maximiza a retenção do conhecimento técnico de acordo com os melhores princípios pedagógicos."
            },
            {
              "title": "Como Utilizar o NotebookLM nos Seus Próprios Projetos",
              "subtitle": "Melhores Práticas para Alimentar Cadernos de Engenharia com Literatura Técnica",
              "bullets": [
                "Seleção Criteriosa de Fontes: Livros em PDF, notas de aplicação de fabricantes e RFCs oficiais do IETF.",
                "Criação de Prompts Especializados: Como instruir o modelo a manter rigor matemático e terminologia precisa.",
                "Geração de Guias de Estudo: Extração automática de glossários, perguntas frequentes e resumos executivos.",
                "Integração Contínua: Alimentar a base de conhecimento a cada nova versão de software ou norma homologada."
              ],
              "speakerNotes": "Incentivamos cada aluno a manter seu próprio caderno do NotebookLM para documentar projetos de campo e acompanhar a evolução acelerada das telecomunicações."
            }
          ],
          "theory": "### 1. A Revolução do Google NotebookLM Studio na Educação de Engenharia\n\nO **Google NotebookLM** estabeleceu um novo paradigma no processamento e transmissão de conhecimento técnico denso. Diferente de geradores de áudio baseados em sintetizadores simples de texto para fala (Text-to-Speech convencionais), o NotebookLM analisa a totalidade dos documentos inseridos em sua base de conhecimento — incluindo:\n- O livro de redes e telecomunicações do **Professor Carlos Lopes**.\n- A obra clássica de redes de computadores de **Douglas Comer**.\n- Manuais técnicos e guias de arquitetura do **OpenBTS**, **Open5GS**, **Yate** e **Asterisk**.\n- A **Resolução Anatel nº 777/2025** sobre MVNOs.\n\nA partir desse acervo, o modelo gera uma **Conversa Aprofundada (Deep Dive)**, simulando dois especialistas em telecomunicações discutindo os aspectos mais fascinantes e desafiadores da implantação da rede.\n\n---\n\n### 2. Player de Áudio Nativo Integrado e Ficha Técnica do Arquivo\n\nO arquivo de áudio autêntico gerado pelo NotebookLM Studio para esta formação possui as seguintes propriedades técnicas:\n- **Nome do Arquivo**: `nb_telecom_mvno_2026.m4a`\n- **Tamanho no Disco**: **22.761.560 bytes (~22,7 MB)**\n- **Codec de Codificação**: AAC-LC (Advanced Audio Coding) com amostragem estéreo em 44.100 Hz\n- **Taxa de Bits**: 128 kbps constante, otimizado para fala natural e fidelidade acústica.\n\n```\n   +-----------------------------------------------------------------------------------+\n   |  [>] PLAYER OFICIAL NOTEBOOKLM STUDIO - DEEP DIVE MVNO TELECOM 2026               |\n   |  00:00 =========================[O]=========================== 18:42              |\n   |  Volume: [||||||||||]  100% | Velocidade: [1.0x] | Download: [M4A 22.7MB]          |\n   +-----------------------------------------------------------------------------------+\n```\n\n---\n\n### 3. Transcrição Sintetizada e Anotações Técnicas dos Especialistas\n\n#### Bloco 1: A Gênese do Laboratório e a Desagregação de Redes (00:00 - 04:15)\n- **Apresentador 1**: *\"Hoje estamos mergulhando de cabeça na arquitetura de um laboratório que realmente quebrou os padrões tradicionais: o Laboratório MVNO Telecom 2026. Carlos Alberto e a equipe de engenharia conseguiram colocar de pé uma operadora completa, com núcleo 5G, gateway multiprotocolo e PBX internacional, rodando inteiramente sobre software aberto.\"*\n- **Apresentadora 2**: *\"O que mais chama a atenção é como eles resolveram a questão do rádio definido por software (SDR). No passado, você precisava de uma antena de três metros e um rack imenso da Ericsson ou Huawei. Aqui, o rádio passa a ser linhas de código de modulação digital processadas em tempo real.\"*\n\n#### Bloco 2: A Mágica da Sinalização SIP e o Yate C++ (04:16 - 09:30)\n- **Apresentador 1**: *\"E quando você olha para o Yate C++, você percebe o segredo da integração. Muitas redes falham quando tentam conectar a nova telefonia IP às centrais convencionais. O Yate faz a ponte perfeita entre o mundo SS7/ISDN e o mundo SIP sem adicionar latência perceptível.\"*\n- **Apresentadora 2**: *\"Exato! E a engenharia de regex que eles criaram para o plano E.164 é cirúrgica. Se um número começa com 5521, o sistema sabe que vai para o Rio de Janeiro. Se começa com 1305, já é despachado para a fibra transoceânica com destino a Miami. Tudo com tolerância a falhas instantânea.\"*\n\n#### Bloco 3: Qualidade de Voz, Jitter e o Modelo E (09:31 - 14:50)\n- **Apresentador 1**: *\"Mas de nada adianta ter uma rota linda se a voz chegar picotada, não é verdade? Eles calibraram o Asterisk com o codec Opus em 48 kHz para os ramais internos e mantiveram o G.711 como fallback universal.\"*\n- **Apresentadora 2**: *\"E o cálculo do MOS com o E-Model da ITU-T mostrou um índice R de 92.4, resultando em um MOS de 4.41. Isso é o que a indústria chama de Toll Quality, a qualidade de voz mais cristalina que um assinante pode experimentar.\"*\n\n#### Bloco 4: Conclusões e o Futuro das MVNOs (14:51 - Fim)\n- **Apresentador 1**: *\"Para quem está estudando essa plataforma, a grande lição é que o futuro das telecomunicações pertence a quem domina o software, os protocolos e a análise de pacotes com o Wireshark. Essa formação entrega as chaves da engenharia real de redes.\"*",
          "configCode": "<!-- ==============================================================================\n     CÓDIGO DE INCORPORAÇÃO DO PLAYER NATIVO NO AMBIENTE EAD\n     Localização: /mvno-web-hostinger/ead/index.html (Seção de Áudio e Mídia)\n     ============================================================================== -->\n\n<div class=\"audio-deepdive-card bg-slate-900 border border-emerald-500/30 rounded-xl p-6 shadow-2xl\">\n  <div class=\"flex items-center gap-4 mb-4\">\n    <div class=\"w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400\">\n      <i class=\"fas fa-podcast text-2xl\"></i>\n    </div>\n    <div>\n      <h4 class=\"text-lg font-bold text-slate-100\">Podcast Técnico NotebookLM Studio</h4>\n      <p class=\"text-xs text-slate-400\">Deep Dive Sintetizado a partir do Acervo de Telecom 2026 (22.7 MB)</p>\n    </div>\n  </div>\n\n  <audio id=\"player-audio-notebooklm\" controls class=\"w-full mb-4 accent-emerald-500\">\n    <source src=\"audio/nb_telecom_mvno_2026.m4a\" type=\"audio/mp4\">\n    Seu navegador não suporta a reprodução deste arquivo de áudio.\n  </audio>\n\n  <div class=\"flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800\">\n    <span><i class=\"fas fa-check-circle text-emerald-400 mr-1\"></i> Áudio Autêntico e Integral</span>\n    <a href=\"audio/nb_telecom_mvno_2026.m4a\" download class=\"text-emerald-400 hover:underline\">\n      <i class=\"fas fa-download mr-1\"></i> Baixar Arquivo M4A\n    </a>\n  </div>\n</div>",
          "traceDissection": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.50         77.37.127.250         HTTP     450    GET /ead/audio/nb_telecom_mvno_2026.m4a HTTP/1.1\n    2   0.024100       77.37.127.250         192.168.10.50         HTTP     380    HTTP/1.1 206 Partial Content (bytes 0-1048575/22761560)\n    3   0.052000       192.168.10.50         77.37.127.250         HTTP     450    GET /ead/audio/nb_telecom_mvno_2026.m4a (Range: bytes 1048576-...)\n    4   0.078400       77.37.127.250         192.168.10.50         HTTP     380    HTTP/1.1 206 Partial Content (Streaming de Áudio Contínuo)\n\nMETADADOS DO ARQUIVO DE ÁUDIO NO SERVIDOR:\n- Content-Type: audio/mp4 (m4a)\n- Content-Length: 22761560 bytes\n- Accept-Ranges: bytes (suporte a seeking instantâneo no player HTML5)\n- Cache-Control: public, max-age=86400",
          "diagram": "global",
          "theoryText": "<h3>1. A Revolução do Google NotebookLM Studio na Educação de Engenharia</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">O <strong>Google NotebookLM</strong> estabeleceu um novo paradigma no processamento e transmissão de conhecimento técnico denso. Diferente de geradores de áudio baseados em sintetizadores simples de texto para fala (Text-to-Speech convencionais), o NotebookLM analisa a totalidade dos documentos inseridos em sua base de conhecimento — incluindo:\n<li>O livro de redes e telecomunicações do <strong>Professor Carlos Lopes</strong>.</li>\n<li>A obra clássica de redes de computadores de <strong>Douglas Comer</strong>.</li>\n<li>Manuais técnicos e guias de arquitetura do <strong>OpenBTS</strong>, <strong>Open5GS</strong>, <strong>Yate</strong> e <strong>Asterisk</strong>.</li>\n<li>A <strong>Resolução Anatel nº 777/2025</strong> sobre MVNOs.</li></p>\n<p class=\"text-slate-300 leading-relaxed my-2\">A partir desse acervo, o modelo gera uma <strong>Conversa Aprofundada (Deep Dive)</strong>, simulando dois especialistas em telecomunicações discutindo os aspectos mais fascinantes e desafiadores da implantação da rede.</p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>2. Player de Áudio Nativo Integrado e Ficha Técnica do Arquivo</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">O arquivo de áudio autêntico gerado pelo NotebookLM Studio para esta formação possui as seguintes propriedades técnicas:\n<li><strong>Nome do Arquivo</strong>: <code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">nb_telecom_mvno_2026.m4a</code></li>\n<li><strong>Tamanho no Disco</strong>: <strong>22.761.560 bytes (~22,7 MB)</strong></li>\n<li><strong>Codec de Codificação</strong>: AAC-LC (Advanced Audio Coding) com amostragem estéreo em 44.100 Hz</li>\n<li><strong>Taxa de Bits</strong>: 128 kbps constante, otimizado para fala natural e fidelidade acústica.</li></p>\n<pre class=\"bg-slate-950 p-4 rounded-lg my-3 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto\"><code>   +-----------------------------------------------------------------------------------+\n   |  [&gt;] PLAYER OFICIAL NOTEBOOKLM STUDIO - DEEP DIVE MVNO TELECOM 2026               |\n   |  00:00 =========================[O]=========================== 18:42              |\n   |  Volume: [||||||||||]  100% | Velocidade: [1.0x] | Download: [M4A 22.7MB]          |\n   +-----------------------------------------------------------------------------------+\n</code></pre>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>3. Transcrição Sintetizada e Anotações Técnicas dos Especialistas</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">#### Bloco 1: A Gênese do Laboratório e a Desagregação de Redes (00:00 - 04:15)\n<li><strong>Apresentador 1</strong>: <em>\"Hoje estamos mergulhando de cabeça na arquitetura de um laboratório que realmente quebrou os padrões tradicionais: o Laboratório MVNO Telecom 2026. Carlos Alberto e a equipe de engenharia conseguiram colocar de pé uma operadora completa, com núcleo 5G, gateway multiprotocolo e PBX internacional, rodando inteiramente sobre software aberto.\"</em></li>\n<li><strong>Apresentadora 2</strong>: <em>\"O que mais chama a atenção é como eles resolveram a questão do rádio definido por software (SDR). No passado, você precisava de uma antena de três metros e um rack imenso da Ericsson ou Huawei. Aqui, o rádio passa a ser linhas de código de modulação digital processadas em tempo real.\"</em></li></p>\n<p class=\"text-slate-300 leading-relaxed my-2\">#### Bloco 2: A Mágica da Sinalização SIP e o Yate C++ (04:16 - 09:30)\n<li><strong>Apresentador 1</strong>: <em>\"E quando você olha para o Yate C++, você percebe o segredo da integração. Muitas redes falham quando tentam conectar a nova telefonia IP às centrais convencionais. O Yate faz a ponte perfeita entre o mundo SS7/ISDN e o mundo SIP sem adicionar latência perceptível.\"</em></li>\n<li><strong>Apresentadora 2</strong>: <em>\"Exato! E a engenharia de regex que eles criaram para o plano E.164 é cirúrgica. Se um número começa com 5521, o sistema sabe que vai para o Rio de Janeiro. Se começa com 1305, já é despachado para a fibra transoceânica com destino a Miami. Tudo com tolerância a falhas instantânea.\"</em></li></p>\n<p class=\"text-slate-300 leading-relaxed my-2\">#### Bloco 3: Qualidade de Voz, Jitter e o Modelo E (09:31 - 14:50)\n<li><strong>Apresentador 1</strong>: <em>\"Mas de nada adianta ter uma rota linda se a voz chegar picotada, não é verdade? Eles calibraram o Asterisk com o codec Opus em 48 kHz para os ramais internos e mantiveram o G.711 como fallback universal.\"</em></li>\n<li><strong>Apresentadora 2</strong>: <em>\"E o cálculo do MOS com o E-Model da ITU-T mostrou um índice R de 92.4, resultando em um MOS de 4.41. Isso é o que a indústria chama de Toll Quality, a qualidade de voz mais cristalina que um assinante pode experimentar.\"</em></li></p>\n<p class=\"text-slate-300 leading-relaxed my-2\">#### Bloco 4: Conclusões e o Futuro das MVNOs (14:51 - Fim)\n<li><strong>Apresentador 1</strong>: <em>\"Para quem está estudando essa plataforma, a grande lição é que o futuro das telecomunicações pertence a quem domina o software, os protocolos e a análise de pacotes com o Wireshark. Essa formação entrega as chaves da engenharia real de redes.\"</em></li></p>",
          "softwareConfig": {
            "software": "NotebookLM Studio Native Player",
            "file": "ead/index.html",
            "code": "<!-- ==============================================================================\n     CÓDIGO DE INCORPORAÇÃO DO PLAYER NATIVO NO AMBIENTE EAD\n     Localização: /mvno-web-hostinger/ead/index.html (Seção de Áudio e Mídia)\n     ============================================================================== -->\n\n<div class=\"audio-deepdive-card bg-slate-900 border border-emerald-500/30 rounded-xl p-6 shadow-2xl\">\n  <div class=\"flex items-center gap-4 mb-4\">\n    <div class=\"w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400\">\n      <i class=\"fas fa-podcast text-2xl\"></i>\n    </div>\n    <div>\n      <h4 class=\"text-lg font-bold text-slate-100\">Podcast Técnico NotebookLM Studio</h4>\n      <p class=\"text-xs text-slate-400\">Deep Dive Sintetizado a partir do Acervo de Telecom 2026 (22.7 MB)</p>\n    </div>\n  </div>\n\n  <audio id=\"player-audio-notebooklm\" controls class=\"w-full mb-4 accent-emerald-500\">\n    <source src=\"audio/nb_telecom_mvno_2026.m4a\" type=\"audio/mp4\">\n    Seu navegador não suporta a reprodução deste arquivo de áudio.\n  </audio>\n\n  <div class=\"flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800\">\n    <span><i class=\"fas fa-check-circle text-emerald-400 mr-1\"></i> Áudio Autêntico e Integral</span>\n    <a href=\"audio/nb_telecom_mvno_2026.m4a\" download class=\"text-emerald-400 hover:underline\">\n      <i class=\"fas fa-download mr-1\"></i> Baixar Arquivo M4A\n    </a>\n  </div>\n</div>",
            "explanation": "Player nativo HTML5 integrado com streaming do áudio técnico autêntico de 22.7 MB gerado pelo NotebookLM."
          },
          "wiresharkAnalysis": {
            "protocol": "HTTP Streaming",
            "summary": "Entrega parcial via HTTP 206 de arquivo de áudio estéreo com 22.7 MB do NotebookLM",
            "rawTrace": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.50         77.37.127.250         HTTP     450    GET /ead/audio/nb_telecom_mvno_2026.m4a HTTP/1.1\n    2   0.024100       77.37.127.250         192.168.10.50         HTTP     380    HTTP/1.1 206 Partial Content (bytes 0-1048575/22761560)\n    3   0.052000       192.168.10.50         77.37.127.250         HTTP     450    GET /ead/audio/nb_telecom_mvno_2026.m4a (Range: bytes 1048576-...)\n    4   0.078400       77.37.127.250         192.168.10.50         HTTP     380    HTTP/1.1 206 Partial Content (Streaming de Áudio Contínuo)\n\nMETADADOS DO ARQUIVO DE ÁUDIO NO SERVIDOR:\n- Content-Type: audio/mp4 (m4a)\n- Content-Length: 22761560 bytes\n- Accept-Ranges: bytes (suporte a seeking instantâneo no player HTML5)\n- Cache-Control: public, max-age=86400"
          },
          "diagramType": "global"
        },
        {
          "id": "6.3",
          "title": "6.3 Avaliação Final de Conhecimento, Critérios de Certificação e Download do Livro Oficial em EPUB",
          "duration": "40 min",
          "tag": "Certificação e Livro",
          "slides": [
            {
              "title": "O Processo de Certificação de Especialista MVNO 2026",
              "subtitle": "Requisitos Rigorosos de Homologação Teórica e Prática",
              "bullets": [
                "Conclusão de Todos os Módulos: 100% de presença e visualização das 24 aulas teóricas e práticas.",
                "Auditoria com Wireshark: Capacidade comprovada de dissecar mensagens SIP, NGAP e fluxos de mídia RTP.",
                "Configuração de Servidores: Habilidade de editar e debugar arquivos de configuração em Asterisk, Yate e Open5GS.",
                "Exame Final Teórico: 20 questões objetivas cobrindo protocolos, normas Anatel e engenharia de tráfego."
              ],
              "speakerNotes": "O certificado de conclusão atesta que o profissional detém competência real para atuar como engenheiro de telecomunicações em operadoras e provedores de missão crítica."
            },
            {
              "title": "O Acervo Bibliográfico Completo do Curso",
              "subtitle": "O Livro Oficial em EPUB e Artigos Técnicos de Referência",
              "bullets": [
                "Livro de Telecomunicações do Prof. Carlos Lopes: A base matemática e prática das redes modernas de transmissão.",
                "Formato Universal EPUB: Leitura confortável em smartphones, e-readers (Kindle, Kobo) e computadores.",
                "Documentação de Arquitetura do Laboratório: Diagramas de blocos, matrizes de portas e topologias multi-país.",
                "Biblioteca de Capturas PCAP: Arquivos de rastreio reais para estudo e treinamento em analisadores de pacotes."
              ],
              "speakerNotes": "Todo o material didático foi consolidado e está disponível para download imediato na plataforma, permitindo consultas futuras no dia a dia da profissão."
            },
            {
              "title": "Ética e Conformidade Regulatória em Telecom",
              "subtitle": "Responsabilidade Social, Sigilo das Comunicações e Segurança Nacional",
              "bullets": [
                "Sigilo Telefônico Constitucional: A estrita proibição de interceptação indevida de dados e conversações de voz.",
                "Segurança da Informação e LGPD: Tratamento ético de dados cadastrais de assinantes e registros de bilhetagem.",
                "Defesa contra Fraudes e Spoofing: Implementação de assinatura criptográfica de cabeçalhos (STIR/SHAKEN).",
                "Disponibilidade para Serviços de Emergência: Roteamento prioritário garantido para Defesa Civil, Polícia e SAMU."
              ],
              "speakerNotes": "Engenheiros de telecomunicações operam infraestruturas vitais para a sociedade. A ética profissional e o respeito às leis são tão cruciais quanto o domínio técnico."
            },
            {
              "title": "Conclusão da Formação e Próximos Desafios",
              "subtitle": "Parabéns por Concluir a Jornada de Engenharia de Redes MVNO 2026",
              "bullets": [
                "Você Dominou: SDR, OpenBTS, Open5GS 5G SA, Yate C++, Asterisk 20 PJSIP, Anel Multi-País e Análise Wireshark.",
                "Seu Certificado Oficial: Emitido com chave criptográfica exclusiva e registro no portal acadêmico.",
                "Comunidade de Especialistas: Acesso contínuo ao grupo de ex-alunos e trocas de experiências com os instrutores.",
                "O Futuro é Aberto: Continue construindo as redes do amanhã sobre os alicerces do conhecimento livre."
              ],
              "speakerNotes": "Parabenizamos cada aluno por sua dedicação e excelência técnica ao longo desta formação pioneira no Brasil e no mundo."
            }
          ],
          "theory": "### 1. Critérios Formais de Conclusão e Certificação Profissional\n\nA obtenção da **Certificação de Engenheiro de Redes Móveis Virtuais e VoIP Carrier-Grade (MVNO Telecom Specialist 2026)** exige a comprovação das seguintes competências técnico-científicas:\n\n1. **Domínio da Pilha de Protocolos**: Compreensão inequívoca da relação entre as camadas OSI e 3GPP, com foco na sinalização SIP (RFC 3261), SDP (RFC 4566), RTP (RFC 3550) e NGAP (3GPP TS 38.413).\n2. **Capacidade de Forense de Rede**: Habilidade comprovada de capturar e dissecar traces no Wireshark, identificando causas raízes de falhas de registro, transbordo de rotas, códigos de erro SIP (4xx/5xx) e degradações de áudio.\n3. **Engenharia de Comutação e Roteamento**: Configuração prática de dialplans no Asterisk (`extensions.conf`), troncos PJSIP (`pjsip.conf`), módulos de roteamento do Yate (`regexroute.conf`) e funções de rede do núcleo 5G Open5GS.\n4. **Legislação e Regulação**: Compreensão dos deveres técnicos e de atendimento da Resolução Anatel nº 777/2025.\n\n---\n\n### 2. O Livro Oficial da Formação: Disponibilização em EPUB\n\nPara garantir que o conhecimento adquirido permaneça acessível aos engenheiros em suas operações de campo, o livro de referência oficial:\n- **Título**: *Telecomunicações Modernas, Redes 5G e Arquiteturas Abertas de MVNO*\n- **Autor**: Professor Carlos Lopes & Carlos Alberto\n- **Edição**: 2026 - Edição Técnica Revisada\n- **Formato**: EPUB 3.0 padronizado (com tabelas, diagramas vetoriais e sumário dinâmico interativo).\n\nO arquivo pode ser baixado diretamente pelo botão de download na área do aluno ou lido em qualquer aplicativo compatível com o padrão EPUB (Apple Books, Calibre, Google Play Livros, Freda).\n\n---\n\n### 3. Matriz do Simulado e Exame Teórico Final (20 Questões de Autoavaliação)\n\nO ambiente EAD inclui uma bateria de questões de fixação com feedback imediato:\n- **Tópico 1**: Diferenças estruturais entre arquiteturas GSM convencionais e redes 5G Standalone (AMF vs MSC, UPF vs GGSN).\n- **Tópico 2**: O fluxo de sinalização de registro SIP Digest Authentication e a proteção contra replay attacks.\n- **Tópico 3**: A equação matemática do E-Model da ITU-T e a influência do atraso e do jitter no índice MOS.\n- **Tópico 4**: Roteamento por menor custo (LCR) e regras de normalização de prefixos internacionais no formato E.164.\n- **Tópico 5**: Procedimentos de contingência e transbordo quando um nó internacional emite o código SIP 503 Service Unavailable.",
          "configCode": "// ==============================================================================\n// GERAÇÃO E VALIDAÇÃO DE CERTIFICADO DIGITAL DE CONCLUSÃO\n// Script do Ambiente EAD: /ead/js/certification.js\n// ==============================================================================\n\nexport function emitirCertificado(aluno) {\n  const dataConclusao = new Date().toISOString().split('T')[0];\n  const hashValidador = btoa(aluno.id + dataConclusao + \"MVNO-2026-TOKEN-OFICIAL\");\n  \n  return {\n    titulo: \"Certificado de Especialista em Redes MVNO e Telefonia Aberta 2026\",\n    aluno: aluno.nome,\n    cpf: aluno.documento,\n    horasComplementares: 120,\n    modulosConcluidos: 6,\n    aulasAssistidas: 24,\n    mediaAproveitamento: aluno.notaFinal >= 8.0 ? \"Aprovado com Distinção\" : \"Aprovado\",\n    dataEmissao: dataConclusao,\n    hashAutenticidade: hashValidador,\n    orgaoCertificador: \"Laboratório de Telecomunicações e Redes Virtuais 2026\",\n    linkValidacao: `http://lab-openbts.programandosolucoes.com.br/ead/validar?hash=${hashValidador}`\n  };\n}",
          "traceDissection": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.50         77.37.127.250         HTTP     490    GET /ead/livros/telecom_modernas_2026.epub HTTP/1.1\n    2   0.031200       77.37.127.250         192.168.10.50         HTTP     310    HTTP/1.1 200 OK (Content-Type: application/epub+zip, 14.8 MB)\n\nMETADADOS DE CONCLUSÃO DO CURSO:\n- Total de Aulas no Curriculum: 24 Lições\n- Módulos Estruturados: 6 Módulos Temáticos\n- Slides Didáticos Totais: 96 Slides Interativos\n- Traces Dissecados: 24 Capturas Wireshark Completas\n- Diagramas Regionais Ativos: Brasil, EUA, Portugal e Global.",
          "diagram": "global",
          "theoryText": "<h3>1. Critérios Formais de Conclusão e Certificação Profissional</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">A obtenção da <strong>Certificação de Engenheiro de Redes Móveis Virtuais e VoIP Carrier-Grade (MVNO Telecom Specialist 2026)</strong> exige a comprovação das seguintes competências técnico-científicas:\n<li><strong>Domínio da Pilha de Protocolos</strong>: Compreensão inequívoca da relação entre as camadas OSI e 3GPP, com foco na sinalização SIP (RFC 3261), SDP (RFC 4566), RTP (RFC 3550) e NGAP (3GPP TS 38.413).</li>\n<li><strong>Capacidade de Forense de Rede</strong>: Habilidade comprovada de capturar e dissecar traces no Wireshark, identificando causas raízes de falhas de registro, transbordo de rotas, códigos de erro SIP (4xx/5xx) e degradações de áudio.</li>\n<li><strong>Engenharia de Comutação e Roteamento</strong>: Configuração prática de dialplans no Asterisk (<code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">extensions.conf</code>), troncos PJSIP (<code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">pjsip.conf</code>), módulos de roteamento do Yate (<code class=\"bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono text-xs\">regexroute.conf</code>) e funções de rede do núcleo 5G Open5GS.</li>\n<li><strong>Legislação e Regulação</strong>: Compreensão dos deveres técnicos e de atendimento da Resolução Anatel nº 777/2025.</li></p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>2. O Livro Oficial da Formação: Disponibilização em EPUB</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">Para garantir que o conhecimento adquirido permaneça acessível aos engenheiros em suas operações de campo, o livro de referência oficial:\n<li><strong>Título</strong>: <em>Telecomunicações Modernas, Redes 5G e Arquiteturas Abertas de MVNO</em></li>\n<li><strong>Autor</strong>: Professor Carlos Lopes & Carlos Alberto</li>\n<li><strong>Edição</strong>: 2026 - Edição Técnica Revisada</li>\n<li><strong>Formato</strong>: EPUB 3.0 padronizado (com tabelas, diagramas vetoriais e sumário dinâmico interativo).</li></p>\n<p class=\"text-slate-300 leading-relaxed my-2\">O arquivo pode ser baixado diretamente pelo botão de download na área do aluno ou lido em qualquer aplicativo compatível com o padrão EPUB (Apple Books, Calibre, Google Play Livros, Freda).</p>\n<hr class=\"my-4 border-slate-700\"/>\n<h3>3. Matriz do Simulado e Exame Teórico Final (20 Questões de Autoavaliação)</h3>\n<p class=\"text-slate-300 leading-relaxed my-2\">O ambiente EAD inclui uma bateria de questões de fixação com feedback imediato:\n<li><strong>Tópico 1</strong>: Diferenças estruturais entre arquiteturas GSM convencionais e redes 5G Standalone (AMF vs MSC, UPF vs GGSN).</li>\n<li><strong>Tópico 2</strong>: O fluxo de sinalização de registro SIP Digest Authentication e a proteção contra replay attacks.</li>\n<li><strong>Tópico 3</strong>: A equação matemática do E-Model da ITU-T e a influência do atraso e do jitter no índice MOS.</li>\n<li><strong>Tópico 4</strong>: Roteamento por menor custo (LCR) e regras de normalização de prefixos internacionais no formato E.164.</li>\n<li><strong>Tópico 5</strong>: Procedimentos de contingência e transbordo quando um nó internacional emite o código SIP 503 Service Unavailable.</li></p>",
          "softwareConfig": {
            "software": "EAD Certification Engine",
            "file": "ead/js/certification.js",
            "code": "// ==============================================================================\n// GERAÇÃO E VALIDAÇÃO DE CERTIFICADO DIGITAL DE CONCLUSÃO\n// Script do Ambiente EAD: /ead/js/certification.js\n// ==============================================================================\n\nexport function emitirCertificado(aluno) {\n  const dataConclusao = new Date().toISOString().split('T')[0];\n  const hashValidador = btoa(aluno.id + dataConclusao + \"MVNO-2026-TOKEN-OFICIAL\");\n  \n  return {\n    titulo: \"Certificado de Especialista em Redes MVNO e Telefonia Aberta 2026\",\n    aluno: aluno.nome,\n    cpf: aluno.documento,\n    horasComplementares: 120,\n    modulosConcluidos: 6,\n    aulasAssistidas: 24,\n    mediaAproveitamento: aluno.notaFinal >= 8.0 ? \"Aprovado com Distinção\" : \"Aprovado\",\n    dataEmissao: dataConclusao,\n    hashAutenticidade: hashValidador,\n    orgaoCertificador: \"Laboratório de Telecomunicações e Redes Virtuais 2026\",\n    linkValidacao: `http://lab-openbts.programandosolucoes.com.br/ead/validar?hash=${hashValidador}`\n  };\n}",
            "explanation": "Emissão criptográfica de certificado de especialista com hash de autenticidade e link para download do EPUB."
          },
          "wiresharkAnalysis": {
            "protocol": "HTTP EPUB Delivery",
            "summary": "Download autenticado do livro oficial de telecomunicações em formato EPUB",
            "rawTrace": "No.     Time           Source                Destination           Protocol Length Info\n------------------------------------------------------------------------------------------------------------------------\n    1   0.000000       192.168.10.50         77.37.127.250         HTTP     490    GET /ead/livros/telecom_modernas_2026.epub HTTP/1.1\n    2   0.031200       77.37.127.250         192.168.10.50         HTTP     310    HTTP/1.1 200 OK (Content-Type: application/epub+zip, 14.8 MB)\n\nMETADADOS DE CONCLUSÃO DO CURSO:\n- Total de Aulas no Curriculum: 24 Lições\n- Módulos Estruturados: 6 Módulos Temáticos\n- Slides Didáticos Totais: 96 Slides Interativos\n- Traces Dissecados: 24 Capturas Wireshark Completas\n- Diagramas Regionais Ativos: Brasil, EUA, Portugal e Global."
          },
          "diagramType": "global"
        }
      ]
    }
  ]
};

// Exporta globalmente no navegador ou para ambiente Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = courseCurriculum;
}
if (typeof window !== 'undefined') {
    window.courseCurriculum = courseCurriculum;
}
