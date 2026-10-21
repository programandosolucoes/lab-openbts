# ACERVO TÉCNICO OFICIAL: LABORATÓRIO MVNO TELECOM 2026 & CORE 5G CONVERGENTE
**Autores e Instrutores:** Carlos Alberto (Engenharia de Telecomunicações) & Prof. Angelo Delphini  
**Instituição:** Programando Soluções • OSTS Telecom  
**Marco Regulatório:** Resolução Anatel nº 777/2025 • Lei Geral de Telecomunicações nº 9.472/1997 (Artigo 183)  
**Versão do Documento:** 2026.10 - Edição Oficial para Ingestão no Google NotebookLM Studio  

---

## 1. O FRAGMENTO TECNOLÓGICO: DA TELEFONIA CONVENCIONAL TDM/SS7 ÀS REDES ABERTAS ALL-IP

Historicamente, a implementação de uma rede de telecomunicações pública ou corporativa dependia de equipamentos monolíticos proprietários (centrais comutadas fabricadas por corporações como Ericsson, Siemens, Lucent e Alcatel). Nesses equipamentos, o plano de sinalização de controle, o plano de comutação de circuitos e o hardware físico eram rigidamente acoplados. Uma chamada telefônica convencional ocupava de forma permanente um canal PCM (Pulse Code Modulation) de 64 kbps (G.711 a 8.000 amostras/segundo com quantização logarítmica de 8 bits), desperdiçando largura de banda em mais de 60% do tempo devido aos períodos de silêncio natural da conversação.

A sinalização entre centrais telefônicas era governada pela pilha SS7 (Signaling System No. 7), trafegando sobre enlaces dedicados MTP2/MTP3 e mensagens ISUP (ISDN User Part), totalmente inacessíveis para desenvolvedores independentes e pequenas operadoras.

A virada de chave para as Redes de Próxima Geração (NGN) e para as arquiteturas 3GPP modernas (4G LTE e 5G Standalone) ocorreu com a **desagregação horizontal** em três camadas:
1. **Camada de Aplicação e Serviços:** PBX corporativo, correio de voz, discadores preditivos e salas de conferência implementados em software de alto desempenho (C++, Node.js, Rust, Python).
2. **Camada de Controle de Sessão:** O protocolo SIP (Session Initiation Protocol - RFC 3261) operando em texto claro, e a arquitetura SBA (Service-Based Architecture) do 5G baseada em APIs HTTP/2 REST e JSON.
3. **Camada de Transporte e Mídia:** Pacotes IP roteáveis carregando áudio digital em tempo real via RTP (Real-Time Transport Protocol - RFC 3550) sobre Ethernet e fibra óptica.

---

## 2. O NOVO MARCO REGULATÓRIO DA ANATEL E A ENGENHARIA DE BANCADA CONFINADA

### 2.1 A Resolução Anatel nº 777/2025
Em 28 de abril de 2025, o Conselho Diretor da Agência Nacional de Telecomunicações aprovou a **Resolução nº 777/2025**, revogando a clássica Resolução nº 550/2010 e consolidando as diretrizes para Prestadoras de Serviços de Telecomunicações Móveis Pessoais (SMP) e Operadoras Móveis Virtuais (MVNOs).
O regulamento categoriza as redes virtuais em:
- **MVNO Credenciada (Light MVNO):** Atua apenas na comercialização e atendimento ao cliente, utilizando 100% da rede de rádio e do núcleo da operadora de origem (MNO).
- **MVNO Autorizada (Full MVNO):** Detém seu próprio núcleo de rede (Core Network), emite seus próprios cartões SIM/eSIM através de seu próprio HSS/UDM, possui seus próprios códigos de rede móvel (MNC), bilhetagem independente e roteamento internacional soberano. É este padrão que o nosso laboratório reproduz.

### 2.2 O Artigo 183 da Lei Geral de Telecomunicações (Lei nº 9.472/1997)
O Artigo 183 da LGT tipifica como **crime federal**:
> *"Desenvolver clandestinamente atividades de telecomunicação: Pena - detenção de dois a quatro anos, aumentada da metade se houver dano a terceiro, e multa de R$ 10.000,00."*

A transmissão de radiofrequência (RF) no ar sem licença de bloco de espectro outorgada pela Anatel gera interferência perigosa nos canais de operadoras comerciais e serviços de emergência (SAMU, Polícia, Bombeiros, Controle de Tráfego Aéreo).

### 2.3 Engenharia de RF Confinada
Para operar com estrita legalidade, o laboratório adota o confinamento físico:
- **Cabo Coaxial Blindado RG-316 / LMR-200** com conectores SMA rosqueados com torque calibrado.
- **Atenuadores de RF de 50 Ohms:** Bloco em linha de **60 dB** (composto por atenuadores de 30 dB + 20 dB + 10 dB) interposto entre o transmissor de rádio e o receptor.
- Uma potência típica de saída de SDR (+10 dBm / 10 mW), ao passar por 60 dB de atenuação, chega ao terminal em **-50 dBm** (0,00001 mW) — um sinal limpo, perfeitamente decodificável pelo modem do smartphone, com **vazamento de RF no ambiente inferior a -110 dBm** (abaixo do limiar de ruído térmico cósmico de fundo).

---

## 3. ARQUITETURA SOFTWARE A SOFTWARE DO ECOSSISTEMA

### 3.1 Open5GS: O Núcleo 5G Standalone (3GPP Release 16/17)
O Open5GS é uma implementação aberta de alta performance escrita em linguagem C do Core 5G Standalone (5GS) e EPC (4G):
- **AMF (Access and Mobility Management Function):** Ponto de terminação da sinalização de controle da rede de rádio (N2 / NGAP via SCTP na porta 38412) e do terminal de usuário (N1 / NAS). Gerencia registro, autenticação 5G-AKA e mobilidade.
- **SMF (Session Management Function):** Controla o ciclo de vida das sessões de dados do usuário (PDU Sessions), aloca endereços IPv4/IPv6 e seleciona o plano de dados.
- **UPF (User Plane Function):** Encapsula e desencapsula o tráfego do plano de usuário via túneis GTP-U (GPRS Tunnelling Protocol User Plane) sobre UDP na porta 2152, aplicando regras de tarifação e QoS.
- **UDM / UDR / AUSF:** O repositório central de assinantes (substitutos do antigo HLR/HSS). Armazena as chaves de criptografia simétricas K e OPc dos cartões SIM/eSIM e calcula os vetores de autenticação (RAND, AUTN, XRES*).
- **NRF (Network Repository Function):** Barramento de registro e descoberta de funções de rede SBA via HTTP/2 REST na porta 7777.

### 3.2 Yate C++: O Gateway Multiprotocolo e Orquestrador de Comutação
O Yate (Yet Another Telephony Engine) é construído sobre uma arquitetura C++ pura e assíncrona orientada a troca de mensagens em fila:
- **Papel na Rede:** Atua como o maestro de comutação e tradutor universal, conectando a nova sinalização SIP com sistemas anteriores baseados em ISDN/SS7 e gerenciando troncos internacionais.
- **regexroute.conf:** Módulo de alta velocidade em C++ que aplica expressões regulares para tomar decisões de menor custo (LCR - Least Cost Routing) e normalizar números chamadores e chamados para o padrão internacional E.164.
- **extmodule.conf:** Interface de comunicação assíncrona que expõe eventos do núcleo (como `call.route` e `chan.hangup`) para controladores externos desenvolvidos em Node.js ou Rust.

### 3.3 Asterisk 20+ PJSIP: A Plataforma de Serviços de Voz Carrier-Grade
O Asterisk opera como o PBX corporativo de serviços:
- **PJSIP Moderno:** Arquitetura baseada em objetos independentes (`endpoint`, `aor`, `auth`, `identify`, `transport`), garantindo suporte nativo a múltiplos registros simultâneos e alta escalabilidade.
- **Ramal de Eco Interativo (8001):** Aplicação `Echo()` no dialplan que reflete instantaneamente o fluxo de áudio RTP recebido para diagnóstico de latência de ida e volta (Round-Trip Time) e áudio unidirecional.
- **Sala de Conferência Global (8000):** Aplicação `ConfBridge()` que realiza mixagem digital multiusuário em tempo real (*N-1 mix-minus*) com transcodificação automática de codecs.

### 3.4 UERANSIM: O Simulador Avançado de Rádio 5G
Permite simular gNodeBs e equipamentos de usuário (UEs) comerciais sem necessidade de transceptores SDR de hardware:
- Gera a pilha completa 3GPP TS 38.413 (NGAP), RRC, NAS e estabelece interfaces de rede virtuais (`uesimtun0`) conectadas ao UPF do Open5GS.

---

## 4. TOPOLOGIA MULTI-PAÍS E ROTEAMENTO INTERNACIONAL (E.164)

A malha do laboratório interconecta 6 praças globais em 3 países:
1. **Brasil (América do Sul):**
   - São Paulo: DDD 11 | Ramais `1001`, `1002` | Prefixo E.164: `+55 11`
   - Rio de Janeiro: DDD 21 | Ramais `2001`, `2002` | Prefixo E.164: `+55 21`
2. **Estados Unidos (América do Norte - NANP):**
   - Miami: Área 305 | Ramais `3001`, `3002` | Prefixo E.164: `+1 305`
   - Nova York: Área 212 | Ramais `4001`, `4002` | Prefixo E.164: `+1 212`
3. **Portugal (Europa):**
   - Lisboa: Código 21 | Ramais `5001`, `5002` | Prefixo E.164: `+351 21`
   - Porto: Código 22 | Ramais `6001`, `6002` | Prefixo E.164: `+351 22`

### O Anel de Sinalização e Tolerância a Falhas (Failover)
- Uma chamada originada em São Paulo com destino a Lisboa (`351215001`) é normalizada pelo Asterisk SP e despachada para o gateway central Yate via tronco SIP.
- O Yate identifica o código de país `351` e comuta a chamada diretamente pelo túnel transcontinental de fibra óptica para o POP de Lisboa.
- Caso o enlace direto Brasil-Portugal sofra indisponibilidade (código SIP `503 Service Unavailable`), o dialplan aciona automaticamente a rota de contingência via **Miami (+1 305)**, garantindo resiliência operacional contínua sem que a chamada seja derrubada.

---

## 5. ENGENHARIA DE VOZ, CODECS HD E QUALIDADE DE SERVIÇO (QoS / QoE)

### 5.1 Comparativo de Codecs de Áudio
- **Opus Interactive Audio Codec (RFC 6716):** Codec prioritário da rede para ramais internos. Taxa de amostragem de até **48 kHz (Fullband)**, bitrates adaptativos de 6 a 510 kbps, tolerância nativa a perdas de até 15% de pacotes com Forward Error Correction (FEC) e Packet Loss Concealment (PLC).
- **G.711 A-law / µ-law:** Taxa fixa de 64 kbps, sem compressão, amostragem de 8 kHz (Narrowband 300 - 3.400 Hz), latência algorítmica de 0,125 ms. Mantido como fallback obrigatório para interconexões com a rede pública de telefonia.

### 5.2 O Modelo E (ITU-T G.107) e o Cálculo do MOS (Mean Opinion Score)
A qualidade subjetiva percebida pelo assinante humano é avaliada pelo **Fator de Transmissão R**:
$$R = R_0 - I_s - I_d - I_{e,eff} + A$$
Onde $R_0 = 93.2$, $I_s$ representa degradações de sinal, $I_d$ representa o atraso excessivo (> 150 ms conforme ITU-T G.114), e $I_{e,eff}$ calcula o impacto das perdas de pacotes e do codec.
O valor de $R$ é convertido para a escala MOS de 1 a 5.
Nas medições forenses com Wireshark no laboratório, com Jitter inferior a 2 ms e perda de pacotes de 0.0%, o fator R obtido é de **92.4**, resultando em um **MOS de 4.41** — classificado formalmente pela ITU-T como **Toll Quality (Excelente)**.
