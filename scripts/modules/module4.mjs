/**
 * @file module4.mjs
 * @description Módulo 4: Topologia Multi-País e Roteamento Interurbano e Internacional
 */

export const module4 = {
  id: 4,
  title: "Módulo 4: Topologia Multi-País e Roteamento Interurbano e Internacional",
  summary: "A engenharia completa da malha de telecomunicações internacional do laboratório: o anel de sinalização e mídia interconectando Brasil, Estados Unidos e Portugal, os POPs locais em cada cidade, a conformidade com o plano global de numeração E.164 e a análise dos cabeçalhos SIP entre os países.",
  lessons: [
    {
      id: "4.1",
      title: "4.1 Topologia Geral Multi-País: O Anel de Sinalização Brasil ↔ Estados Unidos ↔ Portugal",
      duration: "40 min",
      tag: "Topologia Global",
      slides: [
        {
          title: "O Anel Global de Telecomunicações do Laboratório",
          subtitle: "Interconexão de Três Países com Roteamento Carrier-Grade",
          bullets: [
            "Os 3 Países Centrais: Brasil (São Paulo e Rio), Estados Unidos (Miami e Nova York) e Portugal (Lisboa e Porto).",
            "Dupla Camada de Rede: Sinalização de controle SIP trocada entre gateways e tráfego de mídia RTP direto.",
            "Plano de Numeração Global: Formatação uniforme E.164 com código de país (+55, +1, +351) e planos de discagem curtos.",
            "Resiliência e Rota de Transbordo (Failover): Se o enlace direto Brasil-Portugal cair, o tráfego é reencaminhado via Miami."
          ],
          speakerNotes: "Desenhamos no laboratório uma verdadeira rede internacional de operadora móvel virtual (MVNO) capaz de originar, comutar e terminar chamadas em três continentes com regras rígidas de roteamento."
        },
        {
          title: "A Arquitetura de Session Border Controllers (SBC)",
          subtitle: "Proteção de Borda, Normalização de Cabeçalhos e Adaptação de Mídia",
          bullets: [
            "Isolamento de Topologia (Topology Hiding): Os endereços IP internos do Core 5G nunca são expostos à internet pública.",
            "Normalização de Protocolo: Correção de dialetos SIP e incompatibilidades de codecs entre operadoras parceiras.",
            "Limitação de Taxa de Requisições (Rate Limiting): Defesa ativa contra ataques volumétricos de negação de serviço (DoS).",
            "Ancoragem de Mídia (Media Anchoring): Garantia de travessia limpa de firewalls e NATs internacionais."
          ],
          speakerNotes: "O Session Border Controller é a alfândega da rede de telefonia. Nenhuma mensagem internacional entra ou sai do núcleo sem ser inspecionada e sanitizada pelo SBC."
        },
        {
          title: "Orçamento de Latência e Jitter Transcontinental",
          subtitle: "Recomendações da ITU-T G.114 e a Física dos Cabos Submarinos",
          bullets: [
            "Atraso Unidirecional Aceitável (One-Way Delay): Limite estrito de 150 ms para conversação natural sem sobreposição de vozes.",
            "Tempo de Propagação Óptica: Aproximadamente 5 microsegundos por quilômetro de fibra óptica no fundo do oceano.",
            "Trajeto Brasil - EUA (Cabo Seabras-1 / Monet): Latência de ida e volta (RTT) de cerca de 110 ms entre São Paulo e Miami.",
            "Trajeto EUA - Europa: RTT de 70 ms; Trajeto Brasil - Europa direto (EllaLink): RTT de cerca de 120 ms."
          ],
          speakerNotes: "Compreender a velocidade da luz na fibra de vidro é essencial para desenhar rotas VoIP internacionais. Você não pode desafiar a física; deve desenhar o jitter buffer de acordo com a rota."
        },
        {
          title: "Matriz de Interconexão e Encaminhamento de Custos (LCR)",
          subtitle: "Least Cost Routing: A Economia do Roteamento Telefônico Internacional",
          bullets: [
            "Tabelas de Menor Custo (LCR): O motor analisa o prefixo discado e escolhe o gateway mais barato em tempo real.",
            "Terminação Localizada (Bypass DDI): A chamada discada no Brasil para Lisboa é entregue via IP localmente em Portugal.",
            "Qualidade vs. Preço: Algoritmos de roteamento baseados em qualidade média de chamada (ASR e ACD).",
            "Bilhetagem e Fraude: Monitoramento de minutos atípicos em horários de madrugada para evitar prejuízos milionários."
          ],
          speakerNotes: "O modelo de negócio de qualquer operadora VoIP ou MVNO depende do LCR. Rotear uma chamada pelo canal errado pode custar dez vezes mais caro e inviabilizar a margem da empresa."
        }
      ],
      theoryText: `
        <h3>1. A Malha de Telecomunicações Global Brasil - EUA - Portugal</h3>
        <p>A arquitetura multi-país implantada no laboratório simula uma operadora global convergente com presença em três continentes, interconectando 6 pontos de presença (POPs) metropolitanos:</p>

        <table border="1" cellpadding="6" style="border-collapse:collapse; width:100%; margin:15px 0;">
            <tr style="background:#f0f4f8;">
                <th>País</th>
                <th>Cidades / POPs</th>
                <th>Código País</th>
                <th>Área / Região</th>
                <th>Faixa de Ramais</th>
            </tr>
            <tr>
                <td><strong>Brasil</strong></td>
                <td>São Paulo / Rio de Janeiro</td>
                <td>+55</td>
                <td>DDD 11 / DDD 21</td>
                <td>1101, 1102 / 2101, 2102</td>
            </tr>
            <tr>
                <td><strong>Estados Unidos</strong></td>
                <td>Miami / Nova York</td>
                <td>+1</td>
                <td>NPA 305 / NPA 212</td>
                <td>3051, 3052 / 2121, 2122</td>
            </tr>
            <tr>
                <td><strong>Portugal</strong></td>
                <td>Lisboa / Porto</td>
                <td>+351</td>
                <td>Prefixo 21 / Prefixo 22</td>
                <td>3511, 3513 / 3512, 3514</td>
            </tr>
        </table>

        <h3>2. O Desafio da Latência e Acordo de Nível de Serviço (SLA)</h3>
        <p>A norma internacional <strong>ITU-T G.114 (One-way transmission time)</strong> estabelece os limites aceitáveis para atraso de transmissão em telefonia:</p>
        <ul>
            <li><strong>0 a 150 ms:</strong> Qualidade excelente; conversação perfeitamente natural e fluida.</li>
            <li><strong>150 a 400 ms:</strong> Qualidade aceitável com restrições; os interlocutores começam a se interromper inadvertidamente.</li>
            <li><strong>Acima de 400 ms:</strong> Inaceitável para uso comercial em tempo real.</li>
        </ul>
        <p>Na interconexão entre São Paulo e Lisboa, o atraso de propagação na fibra óptica submarina (cerca de 10.000 km) introduz um RTT físico de aproximadamente 100 a 120 ms. Somando-se o tempo de empacotamento do codec (20 ms), o atraso de serialização e o jitter buffer, o sistema opera estritamente dentro da faixa nobre de <strong>80 a 140 ms unidirecionais</strong>.</p>
      `,
      softwareConfig: {
        software: "Yate Global Multi-Country Dialplan",
        file: "config/regexroute.conf",
        code: `[default]
; --- Rotas Locais Curtas ---
^[1-3][0-9]{3}$=lateroute/\${called}

; --- Interconexao Brasil (Sao Paulo +55 11 / Rio +55 21) ---
^\\+5511\\([0-9]+\\)$=sip/sip:carrier_sp/\\1
^\\+5521\\([0-9]+\\)$=sip/sip:carrier_rj/\\1

; --- Interconexao Estados Unidos (Miami +1 305 / NYC +1 212) ---
^\\+1305\\([0-9]+\\)$=sip/sip:carrier_mia/\\1
^\\+1212\\([0-9]+\\)$=sip/sip:carrier_nyc/\\1

; --- Interconexao Portugal (Lisboa +351 21 / Porto +351 22) ---
^\\+35121\\([0-9]+\\)$=sip/sip:carrier_lis/\\1
^\\+35122\\([0-9]+\\)$=sip/sip:carrier_opo/\\1

; Bloqueio estrito de seguranca
.*=-;error=noroute`,
        explanation: "O dialplan global do Yate comuta chamadas locais diretamente e despacha chamadas internacionais formatadas em E.164 para os gateways específicos de cada país, garantindo isolamento e segurança."
      },
      wiresharkAnalysis: {
        protocol: "SIP / Route Header",
        summary: "Mensagem INVITE com cabeçalhos de rota internacional e P-Asserted-Identity",
        rawTrace: `INVITE sip:+351211234567@carrier-lis.telecom.net:5060 SIP/2.0
Via: SIP/2.0/UDP 172.28.0.20:5060;branch=z9hG4bK-global-route-01
Route: <sip:172.28.0.30:5060;lr>
From: "Carlos SP" <sip:+5511999991101@carrier-sp.telecom.net>;tag=sp-8812a
To: <sip:+351211234567@carrier-lis.telecom.net>
Call-ID: intl-call-9921b-0291-11eb-9812@172.28.0.20
CSeq: 101 INVITE
P-Asserted-Identity: "Carlos Alberto" <sip:+5511999991101@carrier-sp.telecom.net>
Max-Forwards: 68
Content-Type: application/sdp
Content-Length: 198`
      },
      diagramType: "global"
    },

    {
      id: "4.2",
      title: "4.2 Roteamento Brasil: POP São Paulo (DDD 11, 1101/1102) vs. POP Rio de Janeiro (DDD 21, 2101/2102)",
      duration: "35 min",
      tag: "POPs Brasil",
      slides: [
        {
          title: "A Estrutura de Numeração Nacional (Plano da Anatel)",
          subtitle: "O Plano Geral de Metas de Numeração no Brasil",
          bullets: [
            "Formato Nacional: Código Nacional de 2 dígitos (DDD) + Número de Assinante de 8 ou 9 dígitos.",
            "DDD 11 (São Paulo): A maior região metropolitana e o principal ponto de troca de tráfego do país (IX.br SP).",
            "DDD 21 (Rio de Janeiro): Segundo maior pólo econômico e ponto de conexão de múltiplos cabos submarinos.",
            "Ramais do Laboratório: 1101/1102 (Diretoria e Engenharia SP) e 2101/2102 (Operações e NOC RJ)."
          ],
          speakerNotes: "Compreendemos a hierarquia do plano de numeração brasileiro e como as chamadas entre DDDs distintos (interurbanas) são tarifadas e roteadas pela operadora."
        },
        {
          title: "Comutação Interurbana: Código de Seleção de Prestadora (CSP)",
          subtitle: "O Famoso Código da Operadora (XX) nas Chamadas Nacionais",
          bullets: [
            "Formato de Discagem: 0 + CSP (ex: 99) + DDD (ex: 21) + Número Telefônico.",
            "Papel do Softswitch: Remover o CSP local e traduzir o destino para o formato padronizado E.164.",
            "Tolerância a Falhas: Se o tronco de fibra ótica da Dutra entre SP e RJ degradar, a comutação transborda pela nuvem.",
            "Roteamento Direto entre Ramais: Discagem curta direta de 4 dígitos entre SP (1101) e RJ (2101) sem tarifação."
          ],
          speakerNotes: "O usuário disca apenas 2101 e a central sabe que se trata do escritório do Rio de Janeiro, roteando o pacote IP pela malha privada sem gerar bilhete de longa distância."
        },
        {
          title: "Preservação de Identidade: P-Asserted-Identity (PAI)",
          subtitle: "Garantindo a Origem Correta e Atendendo às Normas Anti-Spam",
          bullets: [
            "Regulação Anatel Anti-Golpes: Obrigatoriedade de identificação fidedigna do originador (Regras de 2024/2026).",
            "Cabeçalho P-Asserted-Identity (RFC 3325): Carrega o número real do assinante validado pela central.",
            "Cabeçalho From: Pode conter um nome de exibição amigável ('Diretoria SP'), mas o PAI preserva o número técnico.",
            "Prevenção de Spoofing: Operadoras modernas bloqueiam chamadas onde o número do PAI não pertence ao cliente."
          ],
          speakerNotes: "A Anatel declarou guerra às ligações de telemarketing falsas (spoofing). Nosso laboratório já nasce em total conformidade técnica com os novos padrões de autenticação de chamadas."
        },
        {
          title: "Análise da Troca de Mídia entre São Paulo e Rio de Janeiro",
          subtitle: "Métricas de Qualidade em Enlace Terrestre Nacional",
          bullets: [
            "Distância Geográfica: Cerca de 430 km entre as capitais de SP e RJ.",
            "Latência de Ida e Volta (RTT): Inferior a 12 milissegundos em fibra óptica direta.",
            "Jitter Esperado: Abaixo de 2 ms em condições normais de rede de dados.",
            "Codec Utilizado: G.711a (PCMA) ou G.711u (PCMU) em 64 kbps garantindo voz em qualidade de linha fixa clássica."
          ],
          speakerNotes: "A rota SP-RJ é o laboratório ideal para validar o core de telecomunicações antes de avançar para as rotas internacionais com maior latência."
        }
      ],
      theoryText: `
        <h3>1. O Roteamento de Chamadas Nacionais no Brasil</h3>
        <p>No Brasil, a comutação de telecomunicações é regida pelo <strong>Regulamento de Numeração dos Serviços de Telecomunicações</strong> da Anatel. As chamadas entre diferentes áreas locais (diferentes DDDs) exigem historicamente a inserção de um Código de Seleção de Prestadora (CSP):</p>
        <p><code>0 + CSP + DDD + Número Local</code></p>
        
        <p>Em nossa operadora virtual privada, o núcleo Yate implementa um módulo de normalização de dialplan que intercepta discagens curtas corporativas e chamadas com numeração completa:</p>
        <ul>
            <li><strong>Discagem Curta Direta (On-Net):</strong> O ramal <code>1101</code> em São Paulo disca simplesmente <code>2101</code> para falar com a equipe de operações no Rio de Janeiro. A chamada é comutada 100% sobre a rede IP interna, com custo zero e latência ínfima (&lt; 15 ms).</li>
            <li><strong>Discagem E.164 Internacional/Nacional:</strong> Discagens iniciando por <code>+5511...</code> ou <code>+5521...</code> são direcionadas aos gateways SIP regionais homologados correspondentes.</li>
        </ul>
      `,
      softwareConfig: {
        software: "Yate RegFile & Regexroute SP/RJ",
        file: "config/regfile.conf",
        code: `[1101]
password=SecretSP1101!
description=Ramal Brasil - Sao Paulo (Diretoria)

[1102]
password=SecretSP1102!
description=Ramal Brasil - Sao Paulo (Engenharia)

[2101]
password=SecretRJ2101!
description=Ramal Brasil - Rio de Janeiro (Operacoes NOC)

[2102]
password=SecretRJ2102!
description=Ramal Brasil - Rio de Janeiro (Suporte)`,
        explanation: "O arquivo regfile.conf cadastra os assinantes SIP do Brasil, associando senhas de alta entropia aos ramais de São Paulo (1101/1102) e Rio de Janeiro (2101/2102)."
      },
      wiresharkAnalysis: {
        protocol: "SIP / Brazil Routing",
        summary: "Chamada completada entre São Paulo (1101) e Rio de Janeiro (2101)",
        rawTrace: `INVITE sip:2101@172.28.0.20:5060 SIP/2.0
Via: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-sp-rj-01
From: "Sao Paulo 1101" <sip:1101@172.28.0.20>;tag=sp1101tag
To: <sip:2101@172.28.0.20>
Call-ID: call-sp-rj-8192a-11eb@10.11.0.50
CSeq: 101 INVITE
Contact: <sip:1101@10.11.0.50:5060>
P-Asserted-Identity: "Carlos Alberto" <sip:+5511999991101@programandosolucoes.com.br>
Content-Type: application/sdp
Content-Length: 180`
      },
      diagramType: "brasil"
    },

    {
      id: "4.3",
      title: "4.3 Roteamento Estados Unidos: POP Miami (NPA 305, 3051) vs. POP Nova York (NPA 212, 2121) e Plano NANP",
      duration: "35 min",
      tag: "POPs EUA NANP",
      slides: [
        {
          title: "O Plano de Numeração Norte-Americano (NANP)",
          subtitle: "A Estrutura de Numeração nos EUA, Canadá e Caribe (+1)",
          bullets: [
            "Código de País Compartilhado: O prefixo global +1 atende a 20 países do continente norte-americano.",
            "Formato de 10 Dígitos: NPA (Numbering Plan Area / Código de Área de 3 dígitos) + NXX (Central Office) + XXXX (Linha).",
            "NPA 305 (Miami / Flórida): O principal gateway de telecomunicações entre a América do Norte e a América Latina.",
            "NPA 212 (Nova York / Manhattan): Um dos códigos de área mais cobiçados e densos do planeta."
          ],
          speakerNotes: "Compreendemos a lógica do NANP. Nos Estados Unidos não existe o dígito '9' adicional de celular; a mesma estrutura de 10 dígitos atende indistintamente celulares e linhas fixas."
        },
        {
          title: "Os POPs do Laboratório: Miami (3051) e Nova York (2121)",
          subtitle: "A Conexão com o Mercado Financeiro e o Ponto de Troca de Tráfego de Miami",
          bullets: [
            "Ramal 3051: Representa a operação de Miami, interconectada com os data centers do NAP of the Americas.",
            "Ramal 2121: Representa o escritório de Nova York em Manhattan.",
            "Roteamento de Menor Latência: Tráfego da América Latina entra prioritariamente por Miami.",
            "Trunk SIP com Provedor de Terminação US: Roteamento de chamadas de saída usando gateways norte-americanos."
          ],
          speakerNotes: "O NAP of the Americas em Miami é o ponto focal de quase todos os cabos submarinos que saem do Brasil rumo aos Estados Unidos. Nosso POP de Miami simula exatamente esse ponto de entrada."
        },
        {
          title: "Protocolo STIR/SHAKEN: A Autenticação Criptográfica de Chamadas nos EUA",
          subtitle: "O Fim dos Robocalls através de Certificados Digitais",
          bullets: [
            "Exigência da FCC (Federal Communications Commission): Nenhuma chamada trafega nos EUA sem token criptográfico.",
            "Cabeçalho Identity (PASSporT / RFC 8224): Um token JWT assinado pela chave privada da operadora de origem.",
            "Níveis de Atestação: Nível A (Atestação Completa), Nível B (Atestação Parcial), Nível C (Origem do Gateway).",
            "Verificação no Destino: A central receptora consulta o certificado da operadora e carimba 'Caller Verified' na tela do celular."
          ],
          speakerNotes: "O STIR/SHAKEN revolucionou a segurança de telecom nos EUA. Uma chamada sem assinatura válida é imediatamente rotulada como 'Spam Risk' ou bloqueada pelo núcleo da operadora."
        },
        {
          title: "Codecs e Adaptação de Mídia: PCMU vs. PCMA",
          subtitle: "A Divisão Histórica entre Lei-u (América do Norte/Japão) e Lei-A (Resto do Mundo)",
          bullets: [
            "G.711 μ-law (PCMU): Padrão obrigatório nos Estados Unidos (Payload Type 0 no SDP).",
            "G.711 A-law (PCMA): Padrão obrigatório na Europa e no Brasil (Payload Type 8 no SDP).",
            "Transcodificação no Gateway: O Yate e o Asterisk realizam a conversão matemática de μ-law para A-law em tempo real.",
            "Perda de Qualidade Zero: Ambas as leis operam a 64 kbps; a transcodificação é apenas uma tabela de mapeamento de 8 bits."
          ],
          speakerNotes: "Se você enviar G.711 A-law diretamente para uma operadora dos EUA que só aceita μ-law, o usuário escutará apenas um chiado ensurdecedor de ruído branco."
        }
      ],
      theoryText: `
        <h3>1. O Plano de Numeração Norte-Americano (NANP - North American Numbering Plan)</h3>
        <p>Nos Estados Unidos e em outros 19 territórios associados, a numeração segue estritamente o formato de 10 dígitos padronizado pela AT&T na década de 1940 e hoje administrado pela NANPA sob supervisão da <strong>FCC (Federal Communications Commission)</strong>:</p>
        <p><code>NPA - NXX - XXXX</code></p>
        <ul>
            <li><strong>NPA (Numbering Plan Area):</strong> Código de 3 dígitos (onde o primeiro dígito 'N' varia de 2 a 9). O código <strong>305</strong> identifica Miami/Flórida; o código <strong>212</strong> identifica Nova York/Manhattan.</li>
            <li><strong>NXX (Central Office Code):</strong> 3 dígitos que identificavam antigamente o comutador da cidade.</li>
            <li><strong>XXXX (Line Number):</strong> 4 dígitos atribuídos ao assinante final.</li>
        </ul>

        <h3>2. O Framework Criptográfico STIR/SHAKEN (RFC 8224 / ATIS-1000074)</h3>
        <p>Para erradicar fraudes de identidade e chamadas robóticas abusivas (Robocalls), a regulação norte-americana tornou compulsório o framework <strong>STIR (Secure Telephone Identity Revisited)</strong> e <strong>SHAKEN (Signature-based Handling of Asserted information using toKENs)</strong>.</p>
        <p>Ao originar uma chamada, o servidor de telecomunicações gera um cabeçalho SIP <code>Identity:</code> contendo um token JWT (JSON Web Token) criptografado com chave privada elliptic curve (ECDSA P-256), atestando perante a rede que o cliente tem o direito legal de apresentar aquele número de chamada.</p>
      `,
      softwareConfig: {
        software: "Yate US Routing Configuration",
        file: "config/regexroute.conf",
        code: `[default]
; --- Roteamento POP Estados Unidos ---
; Chamadas locais curtas entre Miami e Nova York
^305[0-9]$=lateroute/\${called}
^212[0-9]$=lateroute/\${called}

; Encaminhamento NANP com codigo do pais +1
^\\+1305\\([0-9]+\\)$=sip/sip:gateway_mia/\\1;callername=US-Miami
^\\+1212\\([0-9]+\\)$=sip/sip:gateway_nyc/\\1;callername=US-NewYork

; Forca transcodificacao para G.711 u-law nos EUA
^\\+1.*=sip/sip:us_carrier;format=mulaw`,
        explanation: "As regras direcionam o tráfego norte-americano para os gateways locais de Miami e Nova York, impondo automaticamente o codec G.711 mulaw exigido pelas operadoras americanas."
      },
      wiresharkAnalysis: {
        protocol: "SIP / US NANP Routing",
        summary: "Chamada originada em São Paulo e entregue no POP de Miami (3051) com codec PCMU",
        rawTrace: `INVITE sip:3051@172.28.0.20:5060 SIP/2.0
Via: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-us-call-3051
From: "Sao Paulo 1101" <sip:1101@172.28.0.20>;tag=sp1101
To: <sip:3051@172.28.0.20>
Call-ID: call-sp-mia-9921b-11eb@10.11.0.50
CSeq: 101 INVITE
Contact: <sip:1101@10.11.0.50:5060>
Content-Type: application/sdp
Content-Length: 178

v=0
o=sp-yate 1792167000 1 IN IP4 10.11.0.50
s=US Interconnect
c=IN IP4 10.11.0.50
t=0 0
m=audio 40000 RTP/AVP 0 101
a=rtpmap:0 PCMU/8000
a=rtpmap:101 telephone-event/8000`
      },
      diagramType: "eua"
    },

    {
      id: "4.4",
      title: "4.4 Roteamento Portugal: POP Lisboa (+351 21, 3511) vs. POP Porto (+351 22, 3512) e Formato E.164 Europeu",
      duration: "35 min",
      tag: "POPs Portugal E.164",
      slides: [
        {
          title: "O Plano Nacional de Numeração em Portugal (ANACOM)",
          subtitle: "A Estrutura de Numeração Fechada a 9 Dígitos",
          bullets: [
            "Código de País Europeu: Prefixo internacional +351.",
            "Plano Fechado a 9 Dígitos: Todos os números telefônicos em Portugal possuem exatamente nove dígitos.",
            "Prefixo Geográfico 21 (Lisboa): A capital e principal centro administrativo e econômico.",
            "Prefixo Geográfico 22 (Porto): A região metropolitana do norte e importante polo industrial.",
            "Redes Móveis (Prefixos 91, 92, 93, 96): Identificam as operadoras móveis celulares do país."
          ],
          speakerNotes: "Em Portugal e na maior parte da Europa, o plano de numeração é fechado. Não existem códigos de operadora interurbanos para discar; o número geográfico já identifica unicamente a central de terminação."
        },
        {
          title: "Os POPs do Laboratório em Portugal: Lisboa (3511) e Porto (3512)",
          subtitle: "Integração Européia com Conformidade com a RGPD / GDPR",
          bullets: [
            "Ramal 3511: Escritório corporativo de Lisboa, atuando como o gateway europeu da nossa operadora.",
            "Ramal 3512: Escritório do Porto, com suporte a conferência e operações regionais.",
            "Proteção de Dados Europeia (GDPR): Proibição rigorosa de gravação de chamadas sem consentimento explícito prévio.",
            "Tronco SIP Europeu: Interconexão com operadoras europeias aceitando exclusivamente sinalização segura SIP-TLS."
          ],
          speakerNotes: "Operar em território europeu impõe o cumprimento rigoroso da GDPR. A gravação de áudio sem aviso sonoro inicial constitui infração gravíssima sujeita a multas pesadas da autoridade de dados (CNPD)."
        },
        {
          title: "Roteamento pelo Cabo Submarino EllaLink",
          subtitle: "A Conexão Óptica Direta entre Fortaleza (Brasil) e Sines (Portugal)",
          bullets: [
            "Conexão Transatlântica Direta: O cabo submarino EllaLink evita a tradicional passagem pelos Estados Unidos.",
            "Redução Dramática de Latência: Atraso de ida e volta (RTT) de cerca de 120 ms entre Brasil e Portugal.",
            "Eliminação de Interceptações Terceiras: O tráfego de dados não fica sujeito às leis de vigilância dos EUA (Cloud Act).",
            "Codec Predileto: G.711 A-law (PCMA) compartilhado nativamente entre o Brasil e Portugal sem necessidade de conversão."
          ],
          speakerNotes: "O cabo EllaLink foi um marco para as comunicações luso-brasileiras. Uma chamada VoIP entre São Paulo e Lisboa agora viaja direto pelo Atlântico Sul, garantindo tempo de resposta soberbo."
        },
        {
          title: "O Ponto de Presença Virtual e Numeração Nômade (+351 30)",
          subtitle: "Serviço VoIP Nômade Regulado pela ANACOM",
          bullets: [
            "Faixa de Numeração 30 (Serviços de Voz Nômades): Números VoIP não atrelados a uma morada física fixa.",
            "Uso em Empresas Multinacionais: Permite que funcionários no Brasil atendam ligações locais de clientes portugueses.",
            "Convergência com o Softphone MicroSIP: O ramal 3511 recebe chamadas de Lisboa diretamente no computador em SP.",
            "Cobrança Local em Euros: A operadora virtual fatura chamadas locais em Portugal com custo mínimo de terminação."
          ],
          speakerNotes: "A numeração nômade da ANACOM foi feita sob medida para a nossa arquitetura: ela legaliza que um profissional em São Paulo atenda um telefone fixo português como se estivesse no centro de Lisboa."
        }
      ],
      theoryText: `
        <h3>1. O Plano Nacional de Numeração em Portugal (PNN / ANACOM)</h3>
        <p>A <strong>ANACOM (Autoridade Nacional de Comunicações)</strong> estabelece em Portugal um <em>Plano de Numeração Fechado</em>, onde todos os números nacionais de telecomunicações são compostos invariavelmente por <strong>9 dígitos</strong>, sem necessidade de prefixos de seleção interurbana:</p>
        
        <ul>
            <li><strong>Números Geográficos (Iniciados por 2):</strong> Identificam áreas geográficas locais. O código <strong>21</strong> cobre toda a área metropolitana de Lisboa; o código <strong>22</strong> cobre o distrito do Porto.</li>
            <li><strong>Números Móveis (Iniciados por 9):</strong> As faixas 91 (Vodafone), 92 (MEO/Uzo), 93 (NOS) e 96 (MEO).</li>
            <li><strong>Serviços de Utilização Nômade (Iniciados por 30):</strong> Faixa criada pela ANACOM para serviços de Voz sobre IP (VoIP) independentes de localização física.</li>
        </ul>

        <h3>2. O Cabo Submarino EllaLink e a Rota Direta Brasil-Portugal</h3>
        <p>Historicamente, quase todo o tráfego de internet e telefonia entre o Brasil e a Europa era roteado através de cabos submarinos que passavam obrigatoriamente pelos Estados Unidos (Fortaleza -&gt; Miami -&gt; Nova York -&gt; Londres), gerando uma penalidade de latência de mais de <strong>200 ms RTT</strong>.</p>
        <p>Com a entrada em operação do cabo submarino de fibra óptica <strong>EllaLink</strong> (conectando diretamente Praia Grande/Fortaleza em território brasileiro até Sines e Lisboa em território português), a distância percorrida pelo sinal caiu para cerca de 6.000 km sob o oceano, derrubando o RTT transatlântico direto para meros <strong>115 a 125 ms</strong>. Esse avanço permite que o protocolo SIP mantenha chamadas de altíssima fidelidade sonora (HD Voice) entre São Paulo e Lisboa sem qualquer percepção de retardo na conversa.</p>
      `,
      softwareConfig: {
        software: "Yate Portugal Routing Configuration",
        file: "config/regexroute.conf",
        code: `[default]
; --- Roteamento POP Portugal ---
; Ramais internos de Lisboa (3511) e Porto (3512)
^351[1-9]$=lateroute/\${called}

; Encaminhamento de chamadas nacionais de Portugal (+351)
^\\+35121\\([0-9]{7}\\)$=sip/sip:gateway_lisboa/\\1;format=alaw
^\\+35122\\([0-9]{7}\\)$=sip/sip:gateway_porto/\\1;format=alaw

; Encaminhamento para redes moveis portuguesas
^\\+3519[1-6]\\([0-9]{7}\\)$=sip/sip:gateway_lisboa/\\1;format=alaw`,
        explanation: "As regras de dialplan validam o formato exato de 9 dígitos de Portugal e encaminham o fluxo para os gateways de Lisboa e Porto com formato G.711 alaw nativo europeu."
      },
      wiresharkAnalysis: {
        protocol: "SIP / Portugal Routing",
        summary: "Chamada completada com sucesso em Lisboa (Ramal 3511)",
        rawTrace: `INVITE sip:3511@172.28.0.20:5060 SIP/2.0
Via: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-lis-call-3511
From: "Carlos SP" <sip:1101@172.28.0.20>;tag=sp1101lis
To: <sip:3511@172.28.0.20>
Call-ID: call-sp-lis-8812a-11eb@10.11.0.50
CSeq: 101 INVITE
Contact: <sip:1101@10.11.0.50:5060>
Content-Type: application/sdp
Content-Length: 182

v=0
o=sp-yate 1792167000 1 IN IP4 10.11.0.50
s=Portugal Telecom Call
c=IN IP4 10.11.0.50
t=0 0
m=audio 40000 RTP/AVP 8 101
a=rtpmap:8 PCMA/8000
a=rtpmap:101 telephone-event/8000`
      },
      diagramType: "portugal"
    },

    {
      id: "4.5",
      title: "4.5 Wireshark Deep-Dive no Roteamento: Headers SIP (INVITE, Via, PAI, Diversion, Route) entre os 3 Países",
      duration: "40 min",
      tag: "Roteamento Multi-País",
      slides: [
        {
          title: "Dissecção Completa da Chamada Internacional Fim-a-Fim",
          subtitle: "O Rastreamento da Mensagem INVITE Atravessando Três Fusos Horários",
          bullets: [
            "Origem: Softphone em São Paulo (1101) discando para Lisboa (+351 21 123 4567).",
            "Hop 1: Ingress SBC em São Paulo inserindo cabeçalhos Via e validando autenticação Digest.",
            "Hop 2: Core Routing Engine no Yate avaliando o plano de numeração E.164 e tabela de rotas.",
            "Hop 3: Egress SBC em Portugal entregando a chamada ao terminal de Lisboa com áudio confirmado."
          ],
          speakerNotes: "Esta aula é o auge da engenharia de sinalização do curso. Dissecamos cada linha de cabeçalho que permite a uma chamada nascer em um computador em São Paulo e tocar num telefone em Portugal."
        },
        {
          title: "O Mecanismo da Pilha de Cabeçalhos 'Via:'",
          subtitle: "Como o SIP Garante que as Respostas Voltem pelo Caminho Exato",
          bullets: [
            "Inserção no Topo (LIFO - Last In, First Out): Cada servidor que repassa o pacote adiciona sua linha Via: no início.",
            "O Parâmetro 'branch=z9hG4bK...': Um identificador de transação único criptograficamente gerado por cada proxy.",
            "Parâmetros 'rport' e 'received': Permitem que respostas atravessem NATs mesmo que o IP interno seja privado.",
            "Remoção no Retorno: Na volta do 200 OK, cada servidor remove seu próprio Via antes de repassar ao próximo."
          ],
          speakerNotes: "O cabeçalho Via é a trilha de migalhas de pão do SIP. Ele garante que nenhuma resposta se perca no retorno através da internet internacional."
        },
        {
          title: "Cabeçalhos de Roteamento Estrito: Route e Record-Route",
          subtitle: "Forçando a Passagem de Mensagens Futuras pelos Servidores de Bilhetagem",
          bullets: [
            "Record-Route (RFC 3261): Inserido pelos proxies para exigir que mensagens subsequentes (como o BYE) passem por eles.",
            "Inversão no Diálogo: O cliente receptor inverte a lista de Record-Route e a transforma no cabeçalho 'Route:'.",
            "Importância para Bilhetagem (Billing): Se o BYE não passar pelo proxy da operadora, ela não sabe quando a ligação terminou.",
            "Roteamento Solto (Loose Routing / ';lr'): Mecanismo moderno que preserva o Request-URI sem corromper o destino."
          ],
          speakerNotes: "Sem o Record-Route, o BYE de encerramento de chamada iria direto de cliente para cliente, e a operadora ficaria com a bilhetagem aberta cobrando minutos fantasmas."
        },
        {
          title: "Cabeçalhos de Identidade e Desvio: PAI e Diversion",
          subtitle: "Rastreando Redirecionamentos e Atendendo às Exigências Regulatórias",
          bullets: [
            "P-Asserted-Identity (RFC 3325): Prova irrefutável de quem está pagando e originando a chamada.",
            "Diversion Header (RFC 5806): Informa o número original quando a chamada sofreu um transbordo ou siga-me.",
            "Prevenção de Loops de Desvio: Contadores de salto evitam que dois ramais redirecionados entre si criem tempestade de pacotes.",
            "Relatório Final de Sinalização: Exportação do fluxo completo para auditoria e comissionamento."
          ],
          speakerNotes: "Com esses cabeçalhos dominados, o aluno possui o conjunto completo de ferramentas técnicas para operar qualquer central telefônica pública ou privada no mundo."
        }
      ],
      theoryText: `
        <h3>1. A Dissecção Anatômica de uma Transação Internacional SIP</h3>
        <p>Abaixo apresentamos a captura real de uma mensagem SIP INVITE internacional trafegando entre o gateway de São Paulo e o comutador de Lisboa, detalhando cada linha de sinalização:</p>

        <pre style="background:#1e1e1e; color:#d4d4d4; padding:15px; border-radius:5px; font-family:monospace; font-size:12px;">
INVITE sip:+351211234567@172.28.0.20:5060 SIP/2.0
Via: SIP/2.0/UDP 10.11.0.50:5060;branch=z9hG4bK-sp-771a;rport
Via: SIP/2.0/UDP 172.28.0.5:5060;branch=z9hG4bK-core-1102;received=172.28.0.5
Record-Route: &lt;sip:172.28.0.20:5060;lr&gt;
Record-Route: &lt;sip:172.28.0.5:5060;lr&gt;
Max-Forwards: 67
From: "Carlos Alberto" &lt;sip:1101@programandosolucoes.com.br&gt;;tag=sp-orig-8821
To: &lt;sip:+351211234567@programandosolucoes.com.br&gt;
Call-ID: intl-sess-8192a-11eb-ae93-0242ac110002@10.11.0.50
CSeq: 101 INVITE
Contact: &lt;sip:1101@10.11.0.50:5060&gt;
P-Asserted-Identity: &lt;sip:+5511999991101@programandosolucoes.com.br&gt;
Diversion: &lt;sip:1102@programandosolucoes.com.br&gt;;reason=unconditional;counter=1
User-Agent: Yate-Core-MVNO/2026
Content-Type: application/sdp
Content-Length: 210

v=0
o=carlos-sp 1792167000 1 IN IP4 10.11.0.50
s=International MVNO Session
c=IN IP4 10.11.0.50
t=0 0
m=audio 40000 RTP/AVP 8 0 101
a=rtpmap:8 PCMA/8000
a=rtpmap:0 PCMU/8000
a=rtpmap:101 telephone-event/8000
a=sendrecv
        </pre>

        <h3>2. O Papel do Cabeçalho Diversion (RFC 5806)</h3>
        <p>No exemplo acima, a chamada foi originalmente disparada para o ramal <code>1102</code> em São Paulo, que possuía uma regra de transbordo incondicional (Call Forwarding Unconditional) configurada para encaminhar a ligação para o celular de plantão em Lisboa (<code>+351 21 123 4567</code>).</p>
        <p>O cabeçalho <code>Diversion:</code> preserva o histórico dessa operação:</p>
        <ul>
            <li>Informa à central de Lisboa que quem atende a chamada é o destinatário final, mas que a ligação foi desviada do ramal 1102.</li>
            <li>O parâmetro <code>counter=1</code> é incrementado a cada desvio; se atingir um limite predefinido (ex: 5), o servidor aborta a chamada para prevenir loops infinitos de transferência entre ramais.</li>
        </ul>
      `,
      softwareConfig: {
        software: "Yate Advanced Header Manipulation",
        file: "config/regexroute.conf",
        code: `[extra]
; Adiciona cabecalhos PAI e Diversion em chamadas internacionais
^\\+351.*=call.route
.*=set_param;p_asserted_identity="Carlos SP" <sip:+5511999991101@telecom.net>
.*=set_param;record_route=<sip:172.28.0.20:5060;lr>`,
        explanation: "O Yate manipula dinamicamente os cabeçalhos SIP da mensagem antes de transmiti-la pela rede WAN, garantindo que o cabeçalho P-Asserted-Identity atenda às exigências regulatórias internacionais."
      },
      wiresharkAnalysis: {
        protocol: "SIP / SDP / RTP Stream",
        summary: "Fluxo RTP bidirecional confirmado entre São Paulo e Lisboa com codec G.711a",
        rawTrace: `Real-time Transport Protocol
  [Stream Setup by SIP Call-ID: intl-sess-8192a-11eb-ae93-0242ac110002@10.11.0.50]
  10.. .... = Version: RFC 1889 Version (2)
  ..0. .... = Padding: False
  ...0 .... = Extension: False
  .... 0000 = Contributing source identifiers count: 0
  0... .... = Marker: False
  Payload type: ITU-T G.711 PCMA (8)
  Sequence number: 4182
  Timestamp: 19827360
  Synchronization Source identifier: 0x9812a7f1 (2551359473)
  Payload: 160 bytes of audio data (20 ms duration)`
      },
      diagramType: "global"
    }
  ]
};
