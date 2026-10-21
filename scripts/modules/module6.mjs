/**
 * @file module6.mjs
 * @description Módulo 6: Materiais Complementares, Apresentação Executiva, Podcast NotebookLM e Certificação
 */

export const module6 = {
  id: 6,
  title: "Módulo 6: Materiais Complementares, Apresentação Executiva, Podcast NotebookLM e Certificação",
  summary: "O fechamento de excelência da formação em telecomunicações: o deck executivo de slides de apresentação para a diretoria, o Deep Dive em áudio sintetizado a partir do acervo bibliográfico pelo Google NotebookLM Studio com transcrição técnica e sincronismo, e os critérios formais para certificação de engenheiro de telecomunicações MVNO.",
  lessons: [
    {
      id: "6.1",
      title: "6.1 Apresentação Executiva em Slides: O Ecossistema Integrado MVNO Telecom 2026",
      duration: "35 min",
      tag: "Apresentação Executiva",
      slides: [
        {
          title: "Visão Executiva do Laboratório MVNO 2026",
          subtitle: "Infraestrutura Completa de Telefonia Móvel Virtual e Núcleo Privado 5G",
          bullets: [
            "Proposta Estratégica: Criação de um ecossistema completo de telecomunicações sem dependência de hardware proprietário.",
            "Tecnologias Integradas: Open5GS (Núcleo 5G Standalone), Yate C++ (Comutação SS7/SIP) e Asterisk 20 (PBX Carrier-Grade).",
            "Topologia Internacional: Malha interligando 6 praças globais em 3 países (Brasil, EUA e Portugal) com plano E.164.",
            "Conformidade Regulatória: Total aderência à Resolução Anatel nº 777/2025 para MVNOs Autorizadas e Credenciadas."
          ],
          speakerNotes: "Esta apresentação executiva sintetiza meses de engenharia e implementação, demonstrando a viabilidade técnica e financeira de uma operadora virtual de altíssimo desempenho."
        },
        {
          title: "A Ruptura do Modelo Monolítico Tradicional",
          subtitle: "Da Infraestrutura Proprietária Caixa-Preta para Redes Desagregadas e Abertas",
          bullets: [
            "O Modelo Tradicional: Equipamentos monolíticos com custo de licenciamento proibitivo e evolução técnica travada por fornecedor único.",
            "A Abordagem Open Source: Softwares modulares com código aberto auditado, rodando em servidores COTS (Commercial Off-The-Shelf).",
            "Virtualização e Containers: Núcleo conteinerizado em Docker/Kubernetes com escalabilidade elástica sob demanda.",
            "Redução Radical de OPEX e CAPEX: Economia estimada de mais de 70% em relação a soluções de fabricantes convencionais."
          ],
          speakerNotes: "O movimento de desagregação das telecomunicações com Open RAN e Core 5G aberto nivelou o jogo, permitindo que novas operadoras e MVNOs inovem com agilidade."
        },
        {
          title: "Orquestração de Sinalização e Matriz de Encaminhamento",
          subtitle: "O Papel Central do Yate como Gateway Multiprotocolo",
          bullets: [
            "Interconexão de Mundos: O Yate atua como tradutor universal entre protocolos TDM/ISDN/SS7 e a sinalização moderna SIP/IMS.",
            "Roteamento Baseado em Regras e Regex: Decisão instantânea em C++ de rotas de menor custo (LCR - Least Cost Routing).",
            "Normalização de Chamador e Chamado: Reescrita transparente de números no padrão internacional E.164.",
            "Isolamento de Falhas: Tolerância a perdas de enlace com failover automático para rotas alternativas."
          ],
          speakerNotes: "A flexibilidade do Yate C++ permite integrar sistemas anteriores ou tradicionais de comutação com a nova era IP sem perda de pacotes ou interrupção de chamadas."
        },
        {
          title: "Roadmap Tecnológico e Próximos Passos (2026 - 2028)",
          subtitle: "Evolução Contínua para Redes Críticas e Autonomia Operacional",
          bullets: [
            "Fase 1 (Concluída): Núcleo 5G Open5GS + PBX Asterisk PJSIP + Gateway Yate + Topologia Multi-País.",
            "Fase 2 (Em Andamento): Expansão da cobertura de rádio simulada via UERANSIM para múltiplos gNodeBs e slicing de rede.",
            "Fase 3: Implantação de rádio físico com USRP B210 para validação com smartphones comerciais.",
            "Fase 4: Orquestração e automação de rede com inteligência artificial para predição de tráfego e auto-recuperação (Self-Healing)."
          ],
          speakerNotes: "Nossa esteira de engenharia estabelece uma base sólida e escalável para suportar aplicações críticas de voz corporativa, IoT industrial e MVNOs de missão crítica."
        }
      ],
      theory: `### 1. Síntese Executiva para Tomadores de Decisão Técnica (C-Level & NOC Leadership)

A convergência entre a tecnologia de Tecnologia da Informação (TI) e a Engenharia de Telecomunicações atingiu sua maturidade plena em 2026. Historicamente, a construção de uma operadora de telefonia celular ou fixa exigia investimentos de dezenas de milhões de dólares em equipamentos proprietários e contratos de suporte plurianuais com grandes conglomerados industriais.

O **Laboratório MVNO Telecom 2026** comprova que é plenamente possível, seguro e homologável construir uma infraestrutura de telecomunicações de classe de operadora (Carrier-Grade) utilizando exclusivamente componentes de software livre maduros e padronizados pelas normas mundiais do **3GPP** e do **IETF**:

\`\`\`
   +-----------------------------------------------------------------------------------+
   |                                 CAMADA DE GESTÃO E OSS/BSS                        |
   |           Billing, CRM, Provisionamento Zero-Touch, Monitoramento Grafana/RTCP    |
   +-----------------------------------------------------------------------------------+
                                            |
   +----------------------------------------+------------------------------------------+
   |                                        |                                          |
   v                                        v                                          v
+-----------------------+        +----------------------+        +---------------------+
|      NÚCLEO 5G SA     |        |   GATEWAY DE BORDA   |        |    APLICAÇÃO DE     |
|       (Open5GS)       | <----> |      (Yate C++)      | <----> |  SERVIÇOS (Asterisk)|
| AMF / SMF / UPF / UDM |  NGAP  | SIP Trunking / ISDN  |  PJSIP | ConfBridge / Voicemail|
+-----------------------+        +----------------------+        +---------------------+
            |                               |                               |
            +-------------------------------+-------------------------------+
                                            |
                                            v
                             +------------------------------+
                             |  MALHA GLOBAL DE TRANSPORTE  |
                             |  Brasil  -  EUA  -  Portugal |
                             +------------------------------+
\`\`\`

---

### 2. Viabilidade Regulatória: Resolução Anatel nº 777/2025

A Agência Nacional de Telecomunicações (Anatel) atualizou as regras para Prestadoras de Serviços de Telecomunicações Móveis Pessoais (SMP) e redes virtuais, categorizando-as em:

1. **MVNO Credenciada (Light MVNO)**:
   - Atua primordialmente na comercialização e suporte ao cliente, utilizando a totalidade da rede de acesso por rádio (RAN) e do núcleo da operadora de origem (MNO).
   - Menor risco financeiro, mas baixa flexibilidade técnica e dependência total das tarifas da operadora anfitriã.

2. **MVNO Autorizada (Full MVNO)**:
   - Possui seu próprio núcleo de rede (Core Network), seus próprios códigos de rede móvel (MNC - Mobile Network Code), gerencia seus próprios cartões SIM/eSIM (HSS/UDM), emite bilhetagem independente e roteia seu tráfego de voz e dados.
   - É exatamente esta categoria de **Full MVNO** que a arquitetura do laboratório modela e valida com perfeição.

---

### 3. Matriz Comparativa: Solução Open Source vs Fabricante Convencional

| Dimensão Técnica | Arquitetura Aberta (Open5GS + Yate + Asterisk) | Solução Proprietária Convencional |
|---|---|---|
| **Custo de Licenciamento** | Zero licença por ramal/assinante (Software Livre) | Licença recorrente cobrada por assinante ativo e por canal |
| **Hardware Requerido** | Servidores convencionais x86_64 COTS ou Nuvem | Servidores blade customizados ou appliances blindados |
| **Transparência de Código** | 100% auditável, patches imediatos contra vulnerabilidades | Caixa-preta (dependência de cronograma do fabricante) |
| **Flexibilidade de Dialplan** | Expressões regulares C++ e scripts de dialplan ilimitados | Menus rígidos de configuração pré-definidos |
| **Integração de APIs** | APIs REST, WebSockets, bancos relacionais PostgreSQL/MySQL | Protocolos proprietários ou conectores pagos à parte |`,
      configCode: `; ==============================================================================
; MANIFESTO DE CARGA DA ARQUITETURA MVNO 2026 (Docker Compose / Systemd)
; Orquestração dos microsserviços de telecomunicações do ecossistema
; ==============================================================================

version: '3.8'

services:
  open5gs-core:
    image: open5gs/open5gs:latest
    container_name: open5gs-core-sa
    privileged: true
    volumes:
      - /etc/open5gs:/etc/open5gs:ro
    ports:
      - "38412:38412/sctp"  ; Interface N2 (NGAP)
      - "2152:2152/udp"     ; Interface N3 (GTP-U)
    restart: always

  yate-gateway:
    image: yate-telecom:latest
    container_name: yate-gateway-central
    volumes:
      - /etc/yate:/etc/yate:ro
    ports:
      - "5060:5060/udp"     ; Sinalização SIP Gateway
      - "10000-10500:10000-10500/udp" ; Faixa de Mídia RTP
    restart: always

  asterisk-pbx:
    image: asterisk-carrier:20
    container_name: asterisk-pbx-services
    volumes:
      - /etc/asterisk:/etc/asterisk:ro
    ports:
      - "5062:5060/udp"     ; Sinalização PJSIP Ramais e Serviços
      - "10501-11000:10501-11000/udp" ; Mídia RTP ConfBridge/Echo
    restart: always`,
      traceDissection: `No.     Time           Source                Destination           Protocol Length Info
------------------------------------------------------------------------------------------------------------------------
    1   0.000000       192.168.10.10         192.168.10.20         SIP      890    Request: INVITE sip:351215001@192.168.10.20 (Origem SP -> Destino Lisboa)
    2   0.001500       192.168.10.20         192.168.10.10         SIP      350    Status: 100 Trying
    3   0.012400       192.168.10.20         10.50.1.1             SIP      920    Request: INVITE sip:5001@10.50.1.1 (Encaminhamento Transcontinental Yate)
    4   0.145000       10.50.1.1             192.168.10.20         SIP      410    Status: 180 Ringing (Campainha tocando em Lisboa)
    5   0.146200       192.168.10.20         192.168.10.10         SIP      410    Status: 180 Ringing (Repasse para São Paulo)
    6   0.620000       10.50.1.1             192.168.10.20         SIP      980    Status: 200 OK (António Silva atendeu em Lisboa)
    7   0.621500       192.168.10.20         192.168.10.10         SIP      980    Status: 200 OK (Repasse para Asterisk SP)

RESUMO DA AUDITORIA EXECUTIVA:
- Tempo de Pós-Discagem (PDD) Medido: 620 milissegundos
- Rotas Percorridas: Asterisk SP (1001) -> Yate SP (5060) -> Enlace Internacional -> POP Lisboa (5001)
- Resolução Regulatória: Em estrita conformidade com a Resolução Anatel nº 777/2025.`,
      diagram: "global"
    },
    {
      id: "6.2",
      title: "6.2 Deep Dive em Áudio: Síntese e Podcast do NotebookLM Studio com Transcrição Técnica",
      duration: "45 min",
      tag: "NotebookLM Studio",
      slides: [
        {
          title: "O Deep Dive em Áudio do Google NotebookLM",
          subtitle: "Síntese Avançada de Inteligência Artificial Gerativa a partir do Acervo Técnico",
          bullets: [
            "Fontes Bibliográficas Utilizadas: O livro de redes do professor Carlos Lopes, manuais 3GPP e documentação de software.",
            "Formato de Debate Técnico: Dois especialistas em IA discutem os desafios de engenharia, arquitetura e comutação da MVNO.",
            "Áudio Autêntico e Integral: 22,7 Megabytes de áudio estéreo com profundidade de análise incomparável.",
            "Sincronização com o EAD: Player nativo HTML5 integrado com transcrição textual para acompanhamento didático."
          ],
          speakerNotes: "O NotebookLM Studio representa a vanguarda do aprendizado técnico acelerado, convertendo centenas de páginas de teoria árdua em um diálogo cativante e de altíssimo nível conceitual."
        },
        {
          title: "Os Temas Centrais Abordados no Podcast",
          subtitle: "Do Hardware de Rádio à Sinalização Interurbana de Pacotes",
          bullets: [
            "A Magia do SDR (Software Defined Radio): Como o computador transforma amostras I/Q matemáticas em ondas de rádio RF.",
            "O Dilema da Latência de Mídia: Por que 150 milissegundos é a fronteira psicológica da conversação humana.",
            "Segurança e Ataques em VoIP: Como os registros SIP sem proteção são alvos imediatos de fraudes de tarifação.",
            "A Convivência do Antigo com o Novo: Como nós em C++ como o Yate salvam a interconexão com redes tradicionais."
          ],
          speakerNotes: "O podcast discute com naturalidade os maiores dilemas de design enfrentados pela equipe de engenharia durante o desenvolvimento do laboratório."
        },
        {
          title: "A Transcrição Anotada e Destaques Didáticos",
          subtitle: "Acompanhamento Textual com Referências às Aulas e RFCs Relevantes",
          bullets: [
            "Marcação de Minutagem: Índices clicáveis para saltar diretamente para os tópicos de interesse no player.",
            "Glossário em Tempo Real: Explicação dos termos técnicos conforme são pronunciados no debate sonoro.",
            "Complemento Teórico: O áudio expande os tópicos apresentados nos slides e aprofunda as lições dos Módulos 1 a 5.",
            "Acessibilidade Universal: Texto completo disponível para pessoas com deficiência auditiva ou ambientes silenciosos."
          ],
          speakerNotes: "A combinação de áudio envolvente com texto estruturado maximiza a retenção do conhecimento técnico de acordo com os melhores princípios pedagógicos."
        },
        {
          title: "Como Utilizar o NotebookLM nos Seus Próprios Projetos",
          subtitle: "Melhores Práticas para Alimentar Cadernos de Engenharia com Literatura Técnica",
          bullets: [
            "Seleção Criteriosa de Fontes: Livros em PDF, notas de aplicação de fabricantes e RFCs oficiais do IETF.",
            "Criação de Prompts Especializados: Como instruir o modelo a manter rigor matemático e terminologia precisa.",
            "Geração de Guias de Estudo: Extração automática de glossários, perguntas frequentes e resumos executivos.",
            "Integração Contínua: Alimentar a base de conhecimento a cada nova versão de software ou norma homologada."
          ],
          speakerNotes: "Incentivamos cada aluno a manter seu próprio caderno do NotebookLM para documentar projetos de campo e acompanhar a evolução acelerada das telecomunicações."
        }
      ],
      theory: `### 1. A Revolução do Google NotebookLM Studio na Educação de Engenharia

O **Google NotebookLM** estabeleceu um novo paradigma no processamento e transmissão de conhecimento técnico denso. Diferente de geradores de áudio baseados em sintetizadores simples de texto para fala (Text-to-Speech convencionais), o NotebookLM analisa a totalidade dos documentos inseridos em sua base de conhecimento — incluindo:
- O livro de redes e telecomunicações do **Professor Carlos Lopes**.
- A obra clássica de redes de computadores de **Douglas Comer**.
- Manuais técnicos e guias de arquitetura do **OpenBTS**, **Open5GS**, **Yate** e **Asterisk**.
- A **Resolução Anatel nº 777/2025** sobre MVNOs.

A partir desse acervo, o modelo gera uma **Conversa Aprofundada (Deep Dive)**, simulando dois especialistas em telecomunicações discutindo os aspectos mais fascinantes e desafiadores da implantação da rede.

---

### 2. Player de Áudio Nativo Integrado e Ficha Técnica do Arquivo

O arquivo de áudio autêntico gerado pelo NotebookLM Studio para esta formação possui as seguintes propriedades técnicas:
- **Nome do Arquivo**: \`nb_telecom_mvno_2026.m4a\`
- **Tamanho no Disco**: **22.761.560 bytes (~22,7 MB)**
- **Codec de Codificação**: AAC-LC (Advanced Audio Coding) com amostragem estéreo em 44.100 Hz
- **Taxa de Bits**: 128 kbps constante, otimizado para fala natural e fidelidade acústica.

\`\`\`
   +-----------------------------------------------------------------------------------+
   |  [>] PLAYER OFICIAL NOTEBOOKLM STUDIO - DEEP DIVE MVNO TELECOM 2026               |
   |  00:00 =========================[O]=========================== 18:42              |
   |  Volume: [||||||||||]  100% | Velocidade: [1.0x] | Download: [M4A 22.7MB]          |
   +-----------------------------------------------------------------------------------+
\`\`\`

---

### 3. Transcrição Sintetizada e Anotações Técnicas dos Especialistas

#### Bloco 1: A Gênese do Laboratório e a Desagregação de Redes (00:00 - 04:15)
- **Apresentador 1**: *"Hoje estamos mergulhando de cabeça na arquitetura de um laboratório que realmente quebrou os padrões tradicionais: o Laboratório MVNO Telecom 2026. Carlos Alberto e a equipe de engenharia conseguiram colocar de pé uma operadora completa, com núcleo 5G, gateway multiprotocolo e PBX internacional, rodando inteiramente sobre software aberto."*
- **Apresentadora 2**: *"O que mais chama a atenção é como eles resolveram a questão do rádio definido por software (SDR). No passado, você precisava de uma antena de três metros e um rack imenso da Ericsson ou Huawei. Aqui, o rádio passa a ser linhas de código de modulação digital processadas em tempo real."*

#### Bloco 2: A Mágica da Sinalização SIP e o Yate C++ (04:16 - 09:30)
- **Apresentador 1**: *"E quando você olha para o Yate C++, você percebe o segredo da integração. Muitas redes falham quando tentam conectar a nova telefonia IP às centrais convencionais. O Yate faz a ponte perfeita entre o mundo SS7/ISDN e o mundo SIP sem adicionar latência perceptível."*
- **Apresentadora 2**: *"Exato! E a engenharia de regex que eles criaram para o plano E.164 é cirúrgica. Se um número começa com 5521, o sistema sabe que vai para o Rio de Janeiro. Se começa com 1305, já é despachado para a fibra transoceânica com destino a Miami. Tudo com tolerância a falhas instantânea."*

#### Bloco 3: Qualidade de Voz, Jitter e o Modelo E (09:31 - 14:50)
- **Apresentador 1**: *"Mas de nada adianta ter uma rota linda se a voz chegar picotada, não é verdade? Eles calibraram o Asterisk com o codec Opus em 48 kHz para os ramais internos e mantiveram o G.711 como fallback universal."*
- **Apresentadora 2**: *"E o cálculo do MOS com o E-Model da ITU-T mostrou um índice R de 92.4, resultando em um MOS de 4.41. Isso é o que a indústria chama de Toll Quality, a qualidade de voz mais cristalina que um assinante pode experimentar."*

#### Bloco 4: Conclusões e o Futuro das MVNOs (14:51 - Fim)
- **Apresentador 1**: *"Para quem está estudando essa plataforma, a grande lição é que o futuro das telecomunicações pertence a quem domina o software, os protocolos e a análise de pacotes com o Wireshark. Essa formação entrega as chaves da engenharia real de redes."*`,
      configCode: `<!-- ==============================================================================
     CÓDIGO DE INCORPORAÇÃO DO PLAYER NATIVO NO AMBIENTE EAD
     Localização: /mvno-web-hostinger/ead/index.html (Seção de Áudio e Mídia)
     ============================================================================== -->

<div class="audio-deepdive-card bg-slate-900 border border-emerald-500/30 rounded-xl p-6 shadow-2xl">
  <div class="flex items-center gap-4 mb-4">
    <div class="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
      <i class="fas fa-podcast text-2xl"></i>
    </div>
    <div>
      <h4 class="text-lg font-bold text-slate-100">Podcast Técnico NotebookLM Studio</h4>
      <p class="text-xs text-slate-400">Deep Dive Sintetizado a partir do Acervo de Telecom 2026 (22.7 MB)</p>
    </div>
  </div>

  <audio id="player-audio-notebooklm" controls class="w-full mb-4 accent-emerald-500">
    <source src="audio/nb_telecom_mvno_2026.m4a" type="audio/mp4">
    Seu navegador não suporta a reprodução deste arquivo de áudio.
  </audio>

  <div class="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
    <span><i class="fas fa-check-circle text-emerald-400 mr-1"></i> Áudio Autêntico e Integral</span>
    <a href="audio/nb_telecom_mvno_2026.m4a" download class="text-emerald-400 hover:underline">
      <i class="fas fa-download mr-1"></i> Baixar Arquivo M4A
    </a>
  </div>
</div>`,
      traceDissection: `No.     Time           Source                Destination           Protocol Length Info
------------------------------------------------------------------------------------------------------------------------
    1   0.000000       192.168.10.50         77.37.127.250         HTTP     450    GET /ead/audio/nb_telecom_mvno_2026.m4a HTTP/1.1
    2   0.024100       77.37.127.250         192.168.10.50         HTTP     380    HTTP/1.1 206 Partial Content (bytes 0-1048575/22761560)
    3   0.052000       192.168.10.50         77.37.127.250         HTTP     450    GET /ead/audio/nb_telecom_mvno_2026.m4a (Range: bytes 1048576-...)
    4   0.078400       77.37.127.250         192.168.10.50         HTTP     380    HTTP/1.1 206 Partial Content (Streaming de Áudio Contínuo)

METADADOS DO ARQUIVO DE ÁUDIO NO SERVIDOR:
- Content-Type: audio/mp4 (m4a)
- Content-Length: 22761560 bytes
- Accept-Ranges: bytes (suporte a seeking instantâneo no player HTML5)
- Cache-Control: public, max-age=86400`,
      diagram: "global"
    },
    {
      id: "6.3",
      title: "6.3 Avaliação Final de Conhecimento, Critérios de Certificação e Download do Livro Oficial em EPUB",
      duration: "40 min",
      tag: "Certificação e Livro",
      slides: [
        {
          title: "O Processo de Certificação de Especialista MVNO 2026",
          subtitle: "Requisitos Rigorosos de Homologação Teórica e Prática",
          bullets: [
            "Conclusão de Todos os Módulos: 100% de presença e visualização das 24 aulas teóricas e práticas.",
            "Auditoria com Wireshark: Capacidade comprovada de dissecar mensagens SIP, NGAP e fluxos de mídia RTP.",
            "Configuração de Servidores: Habilidade de editar e debugar arquivos de configuração em Asterisk, Yate e Open5GS.",
            "Exame Final Teórico: 20 questões objetivas cobrindo protocolos, normas Anatel e engenharia de tráfego."
          ],
          speakerNotes: "O certificado de conclusão atesta que o profissional detém competência real para atuar como engenheiro de telecomunicações em operadoras e provedores de missão crítica."
        },
        {
          title: "O Acervo Bibliográfico Completo do Curso",
          subtitle: "O Livro Oficial em EPUB e Artigos Técnicos de Referência",
          bullets: [
            "Livro de Telecomunicações do Prof. Carlos Lopes: A base matemática e prática das redes modernas de transmissão.",
            "Formato Universal EPUB: Leitura confortável em smartphones, e-readers (Kindle, Kobo) e computadores.",
            "Documentação de Arquitetura do Laboratório: Diagramas de blocos, matrizes de portas e topologias multi-país.",
            "Biblioteca de Capturas PCAP: Arquivos de rastreio reais para estudo e treinamento em analisadores de pacotes."
          ],
          speakerNotes: "Todo o material didático foi consolidado e está disponível para download imediato na plataforma, permitindo consultas futuras no dia a dia da profissão."
        },
        {
          title: "Ética e Conformidade Regulatória em Telecom",
          subtitle: "Responsabilidade Social, Sigilo das Comunicações e Segurança Nacional",
          bullets: [
            "Sigilo Telefônico Constitucional: A estrita proibição de interceptação indevida de dados e conversações de voz.",
            "Segurança da Informação e LGPD: Tratamento ético de dados cadastrais de assinantes e registros de bilhetagem.",
            "Defesa contra Fraudes e Spoofing: Implementação de assinatura criptográfica de cabeçalhos (STIR/SHAKEN).",
            "Disponibilidade para Serviços de Emergência: Roteamento prioritário garantido para Defesa Civil, Polícia e SAMU."
          ],
          speakerNotes: "Engenheiros de telecomunicações operam infraestruturas vitais para a sociedade. A ética profissional e o respeito às leis são tão cruciais quanto o domínio técnico."
        },
        {
          title: "Conclusão da Formação e Próximos Desafios",
          subtitle: "Parabéns por Concluir a Jornada de Engenharia de Redes MVNO 2026",
          bullets: [
            "Você Dominou: SDR, OpenBTS, Open5GS 5G SA, Yate C++, Asterisk 20 PJSIP, Anel Multi-País e Análise Wireshark.",
            "Seu Certificado Oficial: Emitido com chave criptográfica exclusiva e registro no portal acadêmico.",
            "Comunidade de Especialistas: Acesso contínuo ao grupo de ex-alunos e trocas de experiências com os instrutores.",
            "O Futuro é Aberto: Continue construindo as redes do amanhã sobre os alicerces do conhecimento livre."
          ],
          speakerNotes: "Parabenizamos cada aluno por sua dedicação e excelência técnica ao longo desta formação pioneira no Brasil e no mundo."
        }
      ],
      theory: `### 1. Critérios Formais de Conclusão e Certificação Profissional

A obtenção da **Certificação de Engenheiro de Redes Móveis Virtuais e VoIP Carrier-Grade (MVNO Telecom Specialist 2026)** exige a comprovação das seguintes competências técnico-científicas:

1. **Domínio da Pilha de Protocolos**: Compreensão inequívoca da relação entre as camadas OSI e 3GPP, com foco na sinalização SIP (RFC 3261), SDP (RFC 4566), RTP (RFC 3550) e NGAP (3GPP TS 38.413).
2. **Capacidade de Forense de Rede**: Habilidade comprovada de capturar e dissecar traces no Wireshark, identificando causas raízes de falhas de registro, transbordo de rotas, códigos de erro SIP (4xx/5xx) e degradações de áudio.
3. **Engenharia de Comutação e Roteamento**: Configuração prática de dialplans no Asterisk (\`extensions.conf\`), troncos PJSIP (\`pjsip.conf\`), módulos de roteamento do Yate (\`regexroute.conf\`) e funções de rede do núcleo 5G Open5GS.
4. **Legislação e Regulação**: Compreensão dos deveres técnicos e de atendimento da Resolução Anatel nº 777/2025.

---

### 2. O Livro Oficial da Formação: Disponibilização em EPUB

Para garantir que o conhecimento adquirido permaneça acessível aos engenheiros em suas operações de campo, o livro de referência oficial:
- **Título**: *Telecomunicações Modernas, Redes 5G e Arquiteturas Abertas de MVNO*
- **Autor**: Professor Carlos Lopes & Carlos Alberto
- **Edição**: 2026 - Edição Técnica Revisada
- **Formato**: EPUB 3.0 padronizado (com tabelas, diagramas vetoriais e sumário dinâmico interativo).

O arquivo pode ser baixado diretamente pelo botão de download na área do aluno ou lido em qualquer aplicativo compatível com o padrão EPUB (Apple Books, Calibre, Google Play Livros, Freda).

---

### 3. Matriz do Simulado e Exame Teórico Final (20 Questões de Autoavaliação)

O ambiente EAD inclui uma bateria de questões de fixação com feedback imediato:
- **Tópico 1**: Diferenças estruturais entre arquiteturas GSM convencionais e redes 5G Standalone (AMF vs MSC, UPF vs GGSN).
- **Tópico 2**: O fluxo de sinalização de registro SIP Digest Authentication e a proteção contra replay attacks.
- **Tópico 3**: A equação matemática do E-Model da ITU-T e a influência do atraso e do jitter no índice MOS.
- **Tópico 4**: Roteamento por menor custo (LCR) e regras de normalização de prefixos internacionais no formato E.164.
- **Tópico 5**: Procedimentos de contingência e transbordo quando um nó internacional emite o código SIP 503 Service Unavailable.`,
      configCode: `// ==============================================================================
// GERAÇÃO E VALIDAÇÃO DE CERTIFICADO DIGITAL DE CONCLUSÃO
// Script do Ambiente EAD: /ead/js/certification.js
// ==============================================================================

export function emitirCertificado(aluno) {
  const dataConclusao = new Date().toISOString().split('T')[0];
  const hashValidador = btoa(aluno.id + dataConclusao + "MVNO-2026-TOKEN-OFICIAL");
  
  return {
    titulo: "Certificado de Especialista em Redes MVNO e Telefonia Aberta 2026",
    aluno: aluno.nome,
    cpf: aluno.documento,
    horasComplementares: 120,
    modulosConcluidos: 6,
    aulasAssistidas: 24,
    mediaAproveitamento: aluno.notaFinal >= 8.0 ? "Aprovado com Distinção" : "Aprovado",
    dataEmissao: dataConclusao,
    hashAutenticidade: hashValidador,
    orgaoCertificador: "Laboratório de Telecomunicações e Redes Virtuais 2026",
    linkValidacao: \`http://lab-openbts.programandosolucoes.com.br/ead/validar?hash=\${hashValidador}\`
  };
}`,
      traceDissection: `No.     Time           Source                Destination           Protocol Length Info
------------------------------------------------------------------------------------------------------------------------
    1   0.000000       192.168.10.50         77.37.127.250         HTTP     490    GET /ead/livros/telecom_modernas_2026.epub HTTP/1.1
    2   0.031200       77.37.127.250         192.168.10.50         HTTP     310    HTTP/1.1 200 OK (Content-Type: application/epub+zip, 14.8 MB)

METADADOS DE CONCLUSÃO DO CURSO:
- Total de Aulas no Curriculum: 24 Lições
- Módulos Estruturados: 6 Módulos Temáticos
- Slides Didáticos Totais: 96 Slides Interativos
- Traces Dissecados: 24 Capturas Wireshark Completas
- Diagramas Regionais Ativos: Brasil, EUA, Portugal e Global.`,
      diagram: "global"
    }
  ]
};
