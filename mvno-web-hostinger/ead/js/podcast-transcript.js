/**
 * @file podcast-transcript.js
 * @description Transcrição Integral Speech-to-Text (STT) do Podcast Técnico de Telecomunicações
 * Duração: 25 minutos e 57 segundos (8 Capítulos Estruturados com Timestamps)
 */

const PODCAST_STT_CHAPTERS = [
    {
        id: "cap-1",
        timeSec: 0,
        timeLabel: "00:00",
        title: "1. Abertura & A Revolução All-IP e Desagregação de Telecomunicações",
        paragraphs: [
            "Sejam muito bem-vindos ao podcast técnico oficial da formação Telecom Academy Pro. Neste episódio especial de imersão profunda, vamos percorrer os alicerces fundamentais da engenharia de redes móveis modernas, focando na transição das centrais proprietárias para arquiteturas abertas, convergentes e desverticalizadas.",
            "Historicamente, a telefonia tradicional operava com comutação de circuitos TDM rígidos de 64 kbit/s, com base na norma ITU-T G.711 e sinalização proprietária SS7. Essas redes dependiam de hardware confinado e de altíssimo custo de aquisição e manutenção. A grande virada tecnológica dos últimos anos foi a migração universal para o modelo All-IP, onde voz, sinalização e dados trafegam unificados sobre o protocolo IP.",
            "Com ferramentas abertas consolidadas como Open5GS, Yate, OpenBTS e Asterisk, os engenheiros de telecomunicações e de software conquistaram a capacidade de implantar núcleos celulares 2G, 4G e 5G com uma fração do custo anterior, mantendo controle total sobre cada pacote, temporizador e cabeçalho do protocolo."
        ]
    },
    {
        id: "cap-2",
        timeSec: 195,
        timeLabel: "03:15",
        title: "2. Bancada de RF Cabeada Confinada (60 dB) e Segurança Regulatória",
        paragraphs: [
            "Um dos pilares inegociáveis de qualquer laboratório de telecomunicações é a legalidade e a conformidade regulatória. No Brasil, o Artigo 183 da Lei Geral de Telecomunicações (Lei nº 9.472/1997) tipifica expressamente como crime a atividade clandestina de telecomunicações, punindo com detenção e multa severa a transmissão não autorizada de radiofrequência no ar.",
            "Para viabilizar a pesquisa, desenvolvimento e treinamento de engenharia sem qualquer infração legal, adotamos o método de Bancada Cabeada Confinada com orçamento de atenuação de 60 dB. Como isso funciona na prática? Nós removemos fisicamente as antenas dos rádios transmissores (SDR) e dos telefones celulares de teste.",
            "As saídas de RF são interconectadas diretamente por cabos coaxiais SMA blindados de dupla malha, passando por atenuadores coaxiais de 30 dB de potência e atenuadores de precisão de bancada de mais 30 dB. O celular de bancada fica acondicionado dentro de uma Caixa de Faraday metálica vedada com junta eletromagnética. O sinal atinge o receptor em torno de -70 dBm a -85 dBm (potência ideal para sincronismo celular), enquanto a emissão que escapa para o ar é inferior a -110 dBm, totalmente indetectável além de 1 metro e protegida pelo Princípio da Insignificância."
        ]
    },
    {
        id: "cap-3",
        timeSec: 400,
        timeLabel: "06:40",
        title: "3. Rádio Definido por Software (SDR) e Ambientes de Emulação Virtual",
        paragraphs: [
            "Para os laboratórios físicos que possuem equipamentos de hardware, o ecossistema utiliza transceptores SDR de ampla cobertura, como o Ettus USRP B210, o BladeRF x40/xA4 e o HackRF One. Esses dispositivos digitalizam a camada física de radiofrequência em banda base (amostras I/Q complexas) e entregam o fluxo digital via USB 3.0 para processamento em bibliotecas C++ no Linux, através de drivers como UHD e SoapySDR.",
            "Entretanto, para quem não dispõe de hardware SDR físico ou necessita de esteiras de teste automatizadas (CI/CD), a plataforma foi desenhada para operar com emuladores de rádio 100% virtuais. No ecossistema OpenBTS e YateBTS, utilizamos drivers dummyradio, que simulam a interface de rádio em memória sem necessidade de hardware externo.",
            "No universo do 5G Standalone, o UERANSIM brilha como a solução de referência mundial: ele emula tanto a estação rádio-base gNodeB quanto o equipamento de usuário (UE), estabelecendo sessões SCTP NGAP reais com o núcleo Open5GS e instanciando interfaces tuneladas de dados reais no sistema operacional."
        ]
    },
    {
        id: "cap-4",
        timeSec: 615,
        timeLabel: "10:15",
        title: "4. Arquitetura Baseada em Serviços (SBA) no Núcleo 5G Standalone (Open5GS)",
        paragraphs: [
            "Ao entrarmos no núcleo 5G Standalone (3GPP Release 16 e 17), encontramos a grande revolução arquitetural da computação moderna: a Service Based Architecture (SBA). No 5G, todas as funções do plano de controle comunicam-se entre si através de uma malha HTTP/2 com serialização JSON e APIs RESTful, exatamente como microsserviços de nuvem corporativa.",
            "O AMF (Access and Mobility Management Function) atua como o ponto focal de terminação da sinalização de controle, recebendo mensagens NGAP sobre conexões SCTP na porta 38412. O SMF (Session Management Function) comanda a criação e modificação de sessões de dados PDU, interagindo com o plano de usuário (UPF) através do protocolo PFCP (Packet Forwarding Control Protocol) pela porta UDP 8805.",
            "O tráfego de dados dos usuários navega encapsulado em túneis GTP-U sobre UDP na porta 2152, conectando a antena diretamente ao gateway UPF de saída para a Internet. Toda a autenticação de segurança é executada pelas funções UDM e AUSF, que aplicam o algoritmo criptográfico 5G-AKA e o framework Milenage com chaves de 128 e 256 bits para garantir imunidade absoluta a ataques de falsa estação rádio-base (IMSI catchers)."
        ]
    },
    {
        id: "cap-5",
        timeSec: 830,
        timeLabel: "13:50",
        title: "5. O Motor C++ Yate e o Roteamento Least Cost Routing (LCR)",
        paragraphs: [
            "Na camada de comutação telefônica inteligente e agregação de protocolos, o Yate (Yet Another Telephony Engine) desempenha um papel cirúrgico. Desenvolvido em C++ puro com arquitetura orientada a eventos e passagem de mensagens thread-safe, o Yate é capaz de gerenciar milhares de chamadas concorrentes com baixíssimo consumo de CPU e memória RAM.",
            "O motor de decisão de rotas do Yate opera através do arquivo regexroute.conf e de módulos dinâmicos em Javascript ou Node.js conectados via socket. É aqui que implementamos o Least Cost Routing (LCR): quando um usuário disca um número no formato internacional E.164, o roteador analisa o código do país (DDI) e o código de área (DDD).",
            "Se uma chamada parte de São Paulo (+55 11) com destino ao Rio de Janeiro (+55 21), a chamada é desviada internamente por um túnel VoIP privado inter-cidades, eliminando tarifas de interconexão pública. Da mesma forma, chamadas com destino a Nova York (+1 212) ou Lisboa (+351 21) são despachadas diretamente para os pontos de presença (POPs) locais no exterior, transformando uma ligação internacional cara em uma terminação local com custo zero."
        ]
    },
    {
        id: "cap-6",
        timeSec: 1045,
        timeLabel: "17:25",
        title: "6. Asterisk Carrier-Grade, Troncos PJSIP, Criptografia e Codecs HD",
        paragraphs: [
            "O Asterisk atua como o servidor de PABX IP carrier-grade e nó de terminação de serviços corporativos do laboratório. Substituindo a biblioteca anterior chan_sip, utilizamos exclusivamente a moderna stack `res_pjsip`, estruturada de forma modular em objetos desacoplados: endpoint, aor (address of record), auth, registration e identify.",
            "Para garantir sigilo e integridade às conversações em redes públicas e na Internet, implementamos criptografia ponta a ponta: a sinalização SIP trafega protegida por TLS (Transport Layer Security) na porta TCP 5061, e os pacotes de áudio RTP são cifrados por SRTP (Secure Real-time Transport Protocol) com chaves negociadas via SDES ou DTLS.",
            "No domínio do processamento digital de sinais (DSP), a escolha dos codecs de áudio dita a experiência auditiva. O codec adaptativo Opus destaca-se com taxa de amostragem de até 48 kHz (Fullband HD Voice) e resistência extraordinária a jitter e perda de pacotes. Avaliamos a qualidade do canal de áudio através do E-Model da ITU-T (Recomendação G.107), que quantifica o fator de classificação R e gera notas MOS (Mean Opinion Score) que variam de 1.0 a 4.5."
        ]
    },
    {
        id: "cap-7",
        timeSec: 1270,
        timeLabel: "21:10",
        title: "7. Operação Comercial Full MVNO, BSS/OSS e Faturamento em Tempo Real",
        paragraphs: [
            "Para consolidar a atuação como uma Operadora Móvel Virtual (MVNO), o laboratório explora a arquitetura do modelo Autorizada (Full MVNO), conforme regulamentado pela Anatel através da histórica Resolução nº 550/2010 e do moderno Regulamento dos Serviços de Telecomunicações nº 777/2025.",
            "Uma Full MVNO possui sua própria rede central: mantém seu próprio HLR/HSS, seu próprio código de rede móvel (MNC), seus próprios cartões SIM físicos e perfis eSIM (eUICC), contratando da operadora de rede de rádio (MNO) apenas o compartilhamento do espectro de radiofrequência e das torres.",
            "Na camada de suporte ao negócio (BSS/OSS), o coração financeiro da operadora é o OCS (Online Charging System). Utilizando o protocolo Diameter com a aplicação Ro/Gy sobre TCP/SCTP, o núcleo debita saldo em tempo real antes de autorizar a terminação de cada segundo de voz ou megabyte de dados trafegado pelo usuário, garantindo faturamento sem perdas e suporte a planos pré-pagos e pós-pagos instantâneos."
        ]
    },
    {
        id: "cap-8",
        timeSec: 1470,
        timeLabel: "24:30",
        title: "8. Conclusão Técnica, Metodologia de Laboratório e Próximos Passos",
        paragraphs: [
            "Concluímos este podcast com um convite à prática deliberada de bancada. Cada conceito explorado aqui está diretamente conectado às 32 aulas práticas do currículo, aos arquivos de configuração reais (yate.conf, pjsip.conf, open5gs yaml) e aos traços decodificados do Wireshark disponíveis na plataforma.",
            "Ao dominar tanto a teoria matemática e regulatória quanto a linha de comando de sistemas abertos, você se posiciona no mais alto patamar de capacitação em telecomunicações, apto a desenhar, implantar e operar redes privativas 5G industriais, MVNOs inovadoras e sistemas de missão crítica.",
            "Recomendamos que você explore as abas de simulação, estude a topologia dos diagramas e acompanhe as notas técnicas de cada aula. Bons estudos e excelente aprendizado prático!"
        ]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PODCAST_STT_CHAPTERS };
}
