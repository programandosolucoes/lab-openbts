/**
 * @file module1.mjs
 * @description Módulo 1: Fundamentos de Telecom Aberta, Marco Regulatório e Hardware Confinado
 */

export const module1 = {
  id: 1,
  title: "Módulo 1: Fundamentos de Telecom Aberta, Marco Regulatório e Hardware Confinado",
  summary: "A transição histórica da telefonia TDM para software aberto All-IP, o novo marco regulatório da Anatel (Resolução 777/2025), o risco penal do Artigo 183 da LGT e a física de RF em bancada cabeada.",
  lessons: [
    {
      id: "1.1",
      title: "1.1 Introdução ao Fragmento Tecnológico: Do Circuito TDM/SS7 às Redes Abertas All-IP",
      duration: "30 min",
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
          speakerNotes: "Nesta aula inaugural, analisamos a transição tecnológica que permitiu aos engenheiros de software assumirem o controle da infraestrutura de telecomunicações que antes pertencia com exclusividade a multinacionais de hardware comutado."
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
          speakerNotes: "O Yate foi pioneiro ao tratar cada evento de telefonia como uma mensagem serializada, permitindo que linguagens de alto nível controlem o fluxo de chamadas."
        },
        {
          title: "O Fragmento Tecnológico da Engenharia Aberta",
          subtitle: "Como o Código Aberto Conquistou o Core Celular",
          bullets: [
            "OpenBTS (2008): A primeira estação rádio-base GSM de código aberto sintetizada em software (SDR).",
            "YateBTS e MBTS: A divisão entre camada de rádio física e comutador lógico de sinalização.",
            "Open5GS (2020-2026): A consolidação da Service-Based Architecture (SBA) do 3GPP em C/C++ de alto desempenho.",
            "Asterisk e FreeSWITCH: O ecossistema de aplicação que transforma ligações em fluxos HTTP/WebRTC."
          ],
          speakerNotes: "O fragmento técnico que exploramos é a convergência: o mesmo servidor que gerencia um banco de dados agora roda a AMF e o UPF de uma rede celular 5G."
        },
        {
          title: "Topologia do Laboratório: 3 Países em Malha All-IP",
          subtitle: "Brasil (São Paulo / Rio), EUA (Miami / NY) e Portugal (Lisboa / Porto)",
          bullets: [
            "Interconexão Internacional: Roteamento SIP baseado em numeração global E.164.",
            "Plano de Numeração Dedicado: Ramais 11xx (SP), 21xx (RJ), 305x (MIA), 212x (NYC), 351x (LIS/OPO).",
            "Latência e Jitter Budget: Como o transporte IP transcontinental afeta a qualidade de áudio (MOS Score).",
            "Segurança de Borda: Session Border Controllers (SBC) e negação explícita contra fraudes."
          ],
          speakerNotes: "Montamos no laboratório uma operadora multinacional completa em miniatura, operando com todas as restrições reais de tráfego e sinalização de operadoras carrier-grade."
        }
      ],
      theoryText: `
        <h3>1. O Colapso dos Monopólios de Telecomunicação Proprietária</h3>
        <p>Durante o século XX, a implantação de uma central de telefonia móvel ou fixa exigia investimentos de milhões de dólares em equipamentos proprietários (Ericsson, Siemens, Lucent, Alcatel). Nesses equipamentos, o <em>plano de controle</em> (sinalização), o <em>plano de dados</em> (transporte de mídia de voz) e as <em>interfaces de hardware</em> (placas E1/T1 e matrizes de pontos de cruzamento) eram rigidamente acoplados.</p>
        <p>A sinalização era governada pela pilha <strong>SS7 (Signaling System No. 7)</strong>, operando sobre enlaces dedicados MTP2/MTP3 e ISUP, impenetráveis para pequenos provedores e desenvolvedores independentes. Uma chamada de voz ocupava estaticamente um canal PCM de 64 kbps (G.711 a 8.000 amostras por segundo com resolução de 8 bits), desperdiçando largura de banda mesmo durante as pausas de silêncio da conversa.</p>

        <h3>2. O Advento das Redes All-IP e a Separação em Camadas</h3>
        <p>A transição para as <strong>Redes de Próxima Geração (NGN)</strong> e posteriormente para o <strong>3GPP Release 15/16/17 (4G LTE e 5G Standalone)</strong> rompeu o paradigma das caixas pretas através do desacoplamento horizontal:</p>
        <ul>
            <li><strong>Plano de Aplicação e Serviços:</strong> Servidores de PABX em nuvem, URAs inteligentes, plataformas de gravação e faturamento implementados em C++, Rust, Node.js e Python.</li>
            <li><strong>Plano de Controle de Sessão:</strong> Protocolo <strong>SIP (Session Initiation Protocol - RFC 3261)</strong> e protocolos de autenticação e mobilidade 3GPP (NGAP, NAS).</li>
            <li><strong>Plano de Mídia e Transporte:</strong> Pacotes IP roteáveis carregando áudio em tempo real via <strong>RTP/SRTP (RFC 3550 / RFC 3711)</strong> sobre redes Ethernet comuns e conexões de fibra óptica.</li>
        </ul>

        <h3>3. Convergência e o Papel do Engenheiro de Telecomunicações 2026</h3>
        <p>O profissional moderno de telecomunicações opera na interseção entre redes de computadores, arquitetura de software e conformidade regulatória. O chip de celular inserido no modem ou smartphone não é mais um receptor de RF analógico, mas um terminal IP seguro capaz de autenticar mutualmente contra um núcleo de rede móvel (Core Network) através do algoritmo Milenage e trocar pacotes criptografados ponta a ponta.</p>
      `,
      softwareConfig: {
        software: "Yate Core & Node.js",
        file: "config/extmodule.conf",
        code: `[general]
; Prioridade de despacho de mensagens no motor Yate
priority=100

[scripts]
; Conecta o orquestrador Node.js via socket TCP assincrono
; CRITICO: Sempre vincular a 127.0.0.1 para evitar exposicao de controle
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
      duration: "35 min",
      tag: "Marco Legal Anatel",
      slides: [
        {
          title: "A Nova Era Regulatória de MVNO no Brasil",
          subtitle: "A Revogação Expressa da Resolução 550/2010",
          bullets: [
            "Marco Antigo (Res. 550/2010): Criou as figuras de Credenciada e Autorizada, mas impunha barreiras contratuais pesadas.",
            "Marco Vigente (Resolução Anatel nº 777/2025): Publicada em 28 de abril de 2025, unificou a regulação de telecom.",
            "Capítulo XII da Res. 777/2025: Revogação formal de resoluções fragmentadas e fortalecimento da competição.",
            "Impacto Direto: ISPs e provedores regionais agora possuem regras claras de acesso ao espectro atacadista."
          ],
          speakerNotes: "Muitos cursos e consultorias desatualizadas ainda citam a Resolução 550/2010. Na engenharia moderna, devemos citar com rigor o Regulamento Geral de Serviços de Telecomunicações aprovado pela Resolução 777/2025."
        },
        {
          title: "Credenciada (Light) vs. Autorizada (Full MVNO)",
          subtitle: "Distinção Jurídica e Arquitetural Inegociável",
          bullets: [
            "Credenciada (Light MVNO): Atua por Contrato de Representação homologado; utiliza a outorga da operadora de origem.",
            "Autorizada (Full MVNO): Possui outorga própria de SMP (Serviço Móvel Pessoal), bloco de numeração e Core próprio.",
            "Identificadores Globais: A Full MVNO possui MCC (724) + MNC próprio e gera seus próprios SIM Cards.",
            "Responsabilidade Regulatória: A Autorizada responde diretamente perante a Anatel por metas de qualidade e segurança."
          ],
          speakerNotes: "Enquanto a Credenciada é um modelo comercial, a Autorizada é uma verdadeira operadora de telecomunicações que contrata apenas o rádio-acesso da operadora de rede (MNO)."
        },
        {
          title: "Graus de Integração Técnica de uma Operadora Virtual",
          subtitle: "Do Revendedor Puro ao Núcleo Completo Open5GS/YateUCN",
          bullets: [
            "Grau 1 (Branded Reseller): Apenas embalagem e faturamento; zero infraestrutura técnica própria.",
            "Grau 2 (Light MVNO): Marca, atendimento e bilhetagem tarifária própria.",
            "Grau 3 (Smart/Hybrid MVNO): + OCS (Online Charging System) em tempo real e SMSC próprio.",
            "Grau 4 (Full MVNO): + HSS/UDM próprio, PGW/UPF próprio, IMS próprio e interconexão de voz."
          ],
          speakerNotes: "O laboratório que desenvolvemos simula o Grau 4: operamos o HSS/UDM no MongoDB, o UPF no Open5GS e a interconexão de voz no Yate e Asterisk."
        },
        {
          title: "Obrigações Legais: Interceptação e Guarda de Logs",
          subtitle: "Marco Civil da Internet e Resoluções de Segurança Cibernética",
          bullets: [
            "Guarda de Registros de Conexão: Art. 13 do Marco Civil da Internet exige guarda sigilosa por 1 ano.",
            "Registros de Detalhes de Chamada (CDR): Preservação obrigatória de origem, destino, horário e duração.",
            "Interceptação Legal (Lei 9.296/1996): A infraestrutura deve suportar espelhamento seguro sob ordem judicial.",
            "Proteção de Dados (LGPD): IMSI, IMEI e localização celular são dados pessoais estritamente regulados."
          ],
          speakerNotes: "Construir uma operadora exige maturidade jurídica. A perda ou vazamento de logs de conexão acarreta sanções graves tanto na esfera administrativa quanto penal."
        }
      ],
      theoryText: `
        <h3>1. O Novo Marco Regulatório de Redes Móveis Virtuais</h3>
        <p>Em 28 de abril de 2025, o Conselho Diretor da Agência Nacional de Telecomunicações aprovou a <strong>Resolução nº 777/2025</strong>, que consolidou as regras de prestação dos serviços de telecomunicações no Brasil. O Capítulo XII deste regulamento revogou expressamente a histórica Resolução nº 550/2010.</p>
        <p>A nova regulação manteve as duas modalidades clássicas de exploração, porém modernizou os mecanismos de arbitragem de preços no atacado e simplificou o compartilhamento de infraestrutura ativa e passiva:</p>
        <ul>
            <li><strong>Operadora Móvel Virtual Credenciada:</strong> Representante comercial da operadora de rede móvel (MNO). Não detém outorga do Serviço Móvel Pessoal (SMP) e utiliza os blocos de numeração (E.164) e os cartões SIM da prestadora de origem.</li>
            <li><strong>Operadora Móvel Virtual Autorizada:</strong> Empresa que possui sua própria autorização formal do SMP outorgada pela Anatel. Possui Contrato de Compartilhamento de Rede, detém blocos próprios de números telefônicos atribuídos pela Anatel, possui seu próprio código de rede móvel (MNC - Mobile Network Code) e opera seus próprios elementos de rede de núcleo (Core Network).</li>
        </ul>

        <h3>2. Diferenciação Crucial: Serviço de Telecomunicações vs. SVA</h3>
        <p>Uma distinção técnica e jurídica basilar fundamenta o nosso laboratório:</p>
        <blockquote>
            <strong>Serviço de Valor Adicionado (SVA - Art. 61 da LGT):</strong> A atividade que acrescenta a um serviço de telecomunicações que lhe dá suporte, e com ele não se confunde, novas utilidades relacionadas ao acesso, armazenamento, apresentação, movimentação ou recuperação de informações. Ramais VoIP internos de uma empresa, PABX em nuvem corporativo e trocas de mensagens locais constituem SVA e <em>independem de outorga</em>.
        </blockquote>
        <p>No entanto, a terminação de chamadas na rede pública comutada (STFC) e o fornecimento de numeração pública a terceiros mediante cobrança caracteriza serviço de telecomunicações, exigindo contrato formal com operadoras outorgadas ou credenciamento na Anatel.</p>
      `,
      softwareConfig: {
        software: "Yate Core Dialplan",
        file: "config/regexroute.conf",
        code: `[default]
; Roteamento seguro: Bloqueia chamadas sem outorga publica
; Ramais internos de 4 digitos sao permitidos
^[1-3][0-9]{3}$=lateroute/\${called}

; Numeros internacionais E.164 autorizados apenas via trunk homologado
^\\+5511[2-9][0-9]{7}$=sip/sip:carrier_sp/\${called}
^\\+1212[2-9][0-9]{6}$=sip/sip:carrier_nyc/\${called}
^\\+35121[0-9]{7}$=sip/sip:carrier_lis/\${called}

; BLOQUEIO GERAL DE SEGURANCA: Defesa contra Toll Fraud
.*=-;error=noroute`,
        explanation: "O plano de discagem implementa a diretriz regulatória: chamadas entre ramais internos fluem como SVA, enquanto qualquer tentativa de chamada externa desconhecida sofre negação explícita (error=noroute), impedindo tráfego clandestino e fraudes tarifárias."
      },
      wiresharkAnalysis: {
        protocol: "SIP Status Code",
        summary: "Negação de rota não autorizada (404 Not Found / 403 Forbidden)",
        rawTrace: `SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-9921b71a;received=10.11.0.50
From: <sip:1101@10.11.0.1>;tag=827361a
To: <sip:900123456@10.11.0.1>;tag=yate-99218
Call-ID: c91827b0-4f81-11eb-ae93-0242ac110002@10.11.0.50
CSeq: 101 INVITE
Server: Yate/6.0.0
Reason: Q.850;cause=1;text="Unallocated (unassigned) number"
Content-Length: 0`
      },
      diagramType: "brasil"
    },

    {
      id: "1.3",
      title: "1.3 Artigo 183 da Lei 9.472/1997 (LGT) e Confinamento de RF: Por Que Bancada Exige 60 dB de Atenuação",
      duration: "30 min",
      tag: "Física de RF & Compliance",
      slides: [
        {
          title: "O Princípio da Legalidade Absoluta no Espectro de RF",
          subtitle: "O Risco Penal do Artigo 183 da Lei 9.472/1997",
          bullets: [
            "O Espectro é Bem Público: Nenhuma transmissão sem fio pode ocorrer em frequências licenciadas sem outorga formal.",
            "Tipificação Penal: Art. 183 da LGT pune com detenção de 2 a 4 anos e multa de R$ 10.000 quem opera clandestinamente.",
            "Jurisprudência Consolidada: O crime é formal e de perigo abstrato; a mera irradiação no ar consuma o delito.",
            "A Intenção Acadêmica Não Anula o Crime: Montar uma BTS GSM/LTE com antenas abertas é infração penal inafiançável."
          ],
          speakerNotes: "Muitos entusiastas e acadêmicos colocam antenas em USRPs e transmitem sinais GSM no laboratório achando que é 'estudo'. Isto configura crime federal com apreensão de equipamentos e responsabilização penal."
        },
        {
          title: "Os 3 Desenhos Experimentais em Telecomunicações",
          subtitle: "Como Estudar Redes Celulares com Risco Jurídico Absolutamente Zero",
          bullets: [
            "Desenho A (Bancada Confinada por Cabo Coaxial): Transceptor ligado ao modem via cabo com atenuadores de 60 dB.",
            "Desenho B (Ambiente Blindado): Gaiola de Faraday ou caixa blindada com isolamento certificado de RF.",
            "Desenho C (Outorga Temporária Científica): Autorização de uso temporário do espectro (Resolução Anatel 775/2025).",
            "Padrão do Curso: Adotamos o Desenho A e emulação virtual por software (ZeroMQ/UDP)."
          ],
          speakerNotes: "O Desenho A é o padrão da indústria. Ao usar cabos coaxiais de blindagem dupla com atenuadores de 60 dB, nenhuma onda eletromagnética escapa para o meio ambiente."
        },
        {
          title: "A Matemática do Confinamento de RF em Bancada",
          subtitle: "Cálculo de Atenuação, Potência e Link Budget",
          bullets: [
            "Potência do SDR: Uma USRP B210 transmite tipicamente a +10 dBm (10 miliwatts).",
            "Atenuador em Linha (60 dB): Reduz a potência do sinal por um fator de 1.000.000 (1 milhão de vezes).",
            "Potência de Chegada ao Terminal: +10 dBm - 60 dB = -50 dBm (nível excelente de sinal celular, mas sem emissão irradiada).",
            "Sensibilidade do Receptor: Celulares operam tipicamente entre -50 dBm e -105 dBm."
          ],
          speakerNotes: "Com -50 dBm dentro do cabo, o telefone celular reconhece a rede como se estivesse a 10 metros da torre, com sinal perfeito e zero interferência na rua."
        },
        {
          title: "Blindagem e Terminação Casada de 50 Ohms",
          subtitle: "Evitando Ondas Estacionárias (SWR) e Vazamento de RF",
          bullets: [
            "Impedância Característica: Todos os conectores (SMA, BNC, Tipo N) e cabos devem ser de 50 Ohms.",
            "Casamento de Impedância: Cabos mal terminados criam reflexões e ondas estacionárias (VSWR alto).",
            "Bloqueadores DC e Atenuadores Fixos de Precisão: Protegem os estágios de entrada sensíveis do SDR (LNA).",
            "Regra Inegociável: Antenas devem ser desrosqueadas e guardadas antes de energizar o transceptor de bancada."
          ],
          speakerNotes: "Se você deixar a porta TX aberta sem carga ou antena, além de risco de vazamento, o amplificador de potência (PA) do SDR pode queimar por potência refletida."
        }
      ],
      theoryText: `
        <h3>1. O Artigo 183 da Lei Geral de Telecomunicações e a Jurisprudência</h3>
        <p>A Lei nº 9.472, de 16 de julho de 1997 (Lei Geral de Telecomunicações - LGT), estabelece no seu Artigo 183:</p>
        <blockquote>
            <em>"Art. 183. Desenvolver clandestinamente atividades de telecomunicação: Pena - detenção de dois a quatro anos, aumentada da metade se houver dano a terceiro, e multa de R$ 10.000,00 (dez mil reais)."</em>
        </blockquote>
        <p>O Superior Tribunal de Justiça (STJ) e o Supremo Tribunal Federal (STF) possuem jurisprudência pacificada no sentido de que o delito do art. 183 é de <strong>perigo abstrato e formal</strong>. Isso significa que não é necessária a comprovação de interferência real em serviços de emergência ou em operadoras comerciais; a simples transmissão de radiofrequência em banda licenciada sem outorga legal consuma a infração penal.</p>

        <h3>2. A Física do Link Budget e Confinamento Cabeado (Desenho A)</h3>
        <p>Para anular qualquer possibilidade de emissão eletromagnética no ar e garantir conformidade com a legislação, o laboratório profissional utiliza o <strong>Desenho A (Bancada Confinada por Cabo)</strong>.</p>
        <p>A equação de potência entregue ao receptor é expressa em decibéis-miliwatt (dBm):</p>
        <p><code>P_rx = P_tx + G_tx - L_cabo - L_atenuador + G_rx</code></p>
        <p>Considerando um rádio SDR comum (USRP B210 ou bladeRF):</p>
        <ul>
            <li>Potência de transmissão da placa (P_tx): <strong>+10 dBm</strong></li>
            <li>Ganhos de antena (G_tx = G_rx): <strong>0 dB</strong> (sem antenas físicas instaladas)</li>
            <li>Perdas de inserção dos cabos coaxiais RG-58/RG-316 (L_cabo): <strong>-1 dB</strong></li>
            <li>Banco de atenuadores fixos SMA (L_atenuador): <strong>-60 dB</strong></li>
            <li>Potência resultante que atinge a porta RF do terminal: <strong>P_rx = +10 - 1 - 60 = -51 dBm</strong></li>
        </ul>
        <p>Um sinal de <strong>-51 dBm</strong> simula uma conexão de excelente qualidade celular (RSRP forte), perfeita para o modem decodificar o canal de controle (BCCH/PBCH), sem emitir qualquer radiação para fora da bancada de trabalho.</p>
      `,
      softwareConfig: {
        software: "OpenBTS / YateBTS Transceiver",
        file: "config/transceiver.conf",
        code: `; Configuracao de Atenuacao de Potencia de Transmissao de Bancada
[Transceiver]
; Nivel de atenuacao digital interna (dB)
tx_attenuation=15

; Limite maximo de ganho do amplificador de potencia (PA)
max_power_dbm=-10

; Alerta de seguranca de RF: Operacao exclusiva em linha cabeada
rf_mode=confined_coaxial
rf_attenuation_external_db=60`,
        explanation: "Os parâmetros de transceiver asseguram que a placa SDR opere com sua potência de saída reduzida ao mínimo viável em nível de software, somando-se à atenuação física externa de 60 dB para garantir segurança absoluta."
      },
      wiresharkAnalysis: {
        protocol: "GSM TAP / Radio Link",
        summary: "Nível de sinal de uplink/downlink confinado (-51 dBm)",
        rawTrace: `GSM TAP Header:
  Version: 2
  Header Length: 16 bytes
  Payload Type: GSM Um (Air Interface over Cable)
  Timeslot: 0
  ARFCN: 128 (Uplink: 824.2 MHz, Downlink: 869.2 MHz)
  Signal Level: -51 dBm
  Signal-to-Noise Ratio (SNR): 32 dB
  Frame Number: 198271
System Information Type 3 (BCCH):
  Cell Identity: 0x0001 (1)
  Location Area Identification (LAI): 724-99-0001 (Brasil TelecomLab)
  Control Channel Description: Combined CCCH + SDCCH/4`
      },
      diagramType: "bancada"
    },

    {
      id: "1.4",
      title: "1.4 Hardware Físico (USRP B210, BladeRF, LimeSDR) vs. Hardware Simulado (ZeroMQ, UDP 5700 e Dummy Radio)",
      duration: "35 min",
      tag: "SDR & Rádio Virtual",
      slides: [
        {
          title: "O Ecossistema de Hardware para Rádio Definido por Software",
          subtitle: "Transceptores Físicos: Arquitetura, Conversores e Limitações",
          bullets: [
            "USRP B210 (Ettus Research): Padrão da indústria com chip AD9361, suporte de 70 MHz a 6 GHz e FPGA Spartan-6.",
            "bladeRF 2.0 micro (Nuand): Transceptor moderno com FPGA Cyclone V, excelente suporte nativo no YateBTS.",
            "LimeSDR (Lime Microsystems): Chip LMS7002M, ampla faixa de frequência e baixo custo.",
            "Desafios de Bancada: Custo elevado (R$ 5.000 a R$ 25.000), calibração de I/Q e ruído térmico."
          ],
          speakerNotes: "Apresentamos o panorama completo dos hardwares SDR. Nem todo engenheiro ou empresa possui R$ 20.000 para investir em USRPs; por isso, a simulação matemática é fundamental."
        },
        {
          title: "Hardware Simulado: O Poder do ZeroMQ e Dummy Radio",
          subtitle: "Processamento de Sinal I/Q sobre Sockets de Memória e Rede",
          bullets: [
            "ZeroMQ Radio: Amostras de sinal I/Q (In-phase / Quadrature) transmitidas como matrizes float32 sobre TCP/IPC.",
            "Dummy Radio / Loopback UDP (Porta 5700): Transmissão de blocos de rádio-pacote sem hardware físico.",
            "UERANSIM 5G: Simulação completa de gNodeB e terminais de usuário UE 100% em software x86.",
            "Vantagem de Ensino: Permite rodar toda a pilha de telecomunicações dentro de contêineres Docker em qualquer laptop."
          ],
          speakerNotes: "Com o ZeroMQ e o UERANSIM, eliminamos a barreira do hardware. O aluno testa o handshake 5G completo, a alocação de bearer e a criação da interface tunelada sem gastar um centavo em hardware."
        },
        {
          title: "Amostragem I/Q e a Matemática de Rádio por Software",
          subtitle: "Teorema de Nyquist-Shannon e Conversores Analógico-Digitais (ADC/DAC)",
          bullets: [
            "Sinal Analógico RF: Onda contínua modulada em alta frequência (ex: 3.5 GHz para 5G n78).",
            "Amostragem em Frequência Intermediária (IF): Multiplicação por seno e cosseno para obter as componentes I e Q.",
            "Taxa de Amostragem (Sample Rate): Deve ser no mínimo o dobro da largura de banda do canal (Teorema de Nyquist).",
            "No canal LTE de 20 MHz: Amostragem a 30.72 MS/s (Mega-amostras por segundo) gerando 122.88 MB/s de dados brutos."
          ],
          speakerNotes: "A razão pela qual usamos portas USB 3.0 em SDRs é a banda bruta: transferir 30.72 milhões de amostras de 32 bits por segundo consome quase 1 Gbps contínuo de dados."
        },
        {
          title: "Comparativo de Eficiência: Físico vs. Virtual",
          subtitle: "Quando Usar Cada Abordagem no Ciclo de Engenharia",
          bullets: [
            "Prototipagem e Teste de Software: 100% Virtual (UERANSIM + Open5GS em Docker) — rápido, barato e determinístico.",
            "Teste de Interoperabilidade com Terminais Reais: Bancada Confinada (USRP/BladeRF cabeado).",
            "CI/CD e Automação de Testes de Regressão: Emulação em nuvem com GitHub Actions e Docker.",
            "Homologação Anatel: Ensaio físico formal em laboratório credenciado com câmara anecoica."
          ],
          speakerNotes: "Na moderna engenharia DevOps de telecom, 90% dos testes rodam em contêineres simulados e apenas 10% vão para o rádio físico antes da produção."
        }
      ],
      theoryText: `
        <h3>1. Arquitetura de Transceptores Físicos SDR</h3>
        <p>Um equipamento de <strong>Rádio Definido por Software (SDR)</strong> move a inteligência das telecomunicações do domínio analógico (filtros indutores/capacitores, osciladores locais de cristal e moduladores balanceados) para o domínio digital:</p>
        <ul>
            <li><strong>Estágio Analógico (RF Front-End):</strong> Antena (ou cabo com atenuação), amplificador de baixo ruído (LNA), amplificador de potência (PA) e chave de comutação TDD/FDD.</li>
            <li><strong>Transceiver de Sinal Misto (RFIC):</strong> Células como o Analog Devices AD9361 (presente na USRP B210) integram misturadores de quadratura, filtros passa-baixa analógicos e conversores ADC/DAC de 12 bits de resolução.</li>
            <li><strong>Matriz de Portas Programáveis em Campo (FPGA):</strong> Realiza o processamento digital de sinal (DSP) pesado em tempo real: conversão digital de subida (DUC), conversão digital de descida (DDC), filtros decimadores CIC/FIR e empacotamento em frames USB 3.0 ou Gigabit Ethernet.</li>
        </ul>

        <h3>2. O Modelo Simulado: ZeroMQ e UERANSIM</h3>
        <p>A representação de uma onda eletromagnética modulada no computador é um par de números complexos conhecidos como <strong>amostras I/Q</strong> (In-phase e Quadrature):</p>
        <p><code>s(t) = I(t) · cos(2π f_c t) - Q(t) · sin(2π f_c t)</code></p>
        <p>Quando executamos o laboratório em modo simulado, o software calcula as matrizes I e Q e as envia através de um socket <strong>ZeroMQ (ZMQ)</strong> ou socket UDP local:</p>
        <ul>
            <li><strong>Emulação de Camada Física:</strong> Em vez de emitir elétrons em uma antena, os bytes brutos são entregues à camada MAC do receptor com atraso programado e injeção matemática de ruído gaussiano branco (AWGN).</li>
            <li><strong>UERANSIM:</strong> Implementa a pilha completa 3GPP (RRC, PDCP, RLC, MAC) em código C++20 nativo, comunicando-se com a AMF do Open5GS via protocolo padronizado <strong>NGAP sobre SCTP na porta 38412</strong>.</li>
        </ul>
      `,
      softwareConfig: {
        software: "UERANSIM gNodeB Config",
        file: "config/gnb.yaml",
        code: `mcc: '724'          ; Mobile Country Code (Brasil)
mnc: '99'           ; Mobile Network Code (TelecomLab Privado)

nci: '0x000000010'  ; NR Cell Identity
idLength: 32
tac: 1              ; Tracking Area Code

linkIp: 172.28.0.20 ; Endereco da gNodeB virtual
ngapIp: 172.28.0.20 ; IP de sinalizacao NGAP
gtpIp: 172.28.0.20  ; IP de transporte de dados GTP-U

amfConfigs:
  - address: 172.28.0.10
    port: 38412     ; Porta padronizada 3GPP SCTP para a AMF

slices:
  - sst: 1          ; Slice Standard (eMBB)
    sd: 0x112233`,
        explanation: "O arquivo gnb.yaml define a estação rádio-base 5G virtual. Ela estabelece uma associação SCTP com a AMF na porta 38412 e anuncia a célula 724-99 com suporte a eMBB, permitindo que SIM cards virtuais façam anexação e naveguem na rede."
      },
      wiresharkAnalysis: {
        protocol: "NGAP / SCTP",
        summary: "NGSetupRequest enviado pela gNodeB virtual para a AMF 5G Core",
        rawTrace: `Stream Control Transmission Protocol (SCTP), Dport: 38412
NGAP-PDU: initiatingMessage (0)
  initiatingMessage
    procedureCode: 21 (NGSetup)
    criticality: reject (0)
    value
      NGSetupRequest
        protocolIEs: 3 items
          Item 0: id-GlobalRANNodeID (Global gNB ID: 724-99-00000010)
          Item 1: id-SupportedTAList (TAC: 1, Broadcast PLMN: 724-99)
          Item 2: id-PagingDRX (v128)`
      },
      diagramType: "layers"
    }
  ]
};
