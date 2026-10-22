# LIVRO MESTRE: ENGENHARIA DE REDES MÓVEIS, TELECOM ABERTA & MVNO CONVERGENTE (EDIÇÃO 2026)

**Autoria & Compilação Curricular:** Carlos Alberto Lopes & Prof. Angelo de Barros Delphini  
**Instituição:** Programando Soluções • OSTS Telecom • Telecom Academy  
**Marco Regulatório:** Resolução Anatel nº 777/2025 • Artigo 183 da Lei 9.472/1997 (LGT)  
**Fontes e Referências Oficiais Cruzadas no Laboratório Avançado de Síntese de Telecomunicações:**
- *Range Networks* (David Burgess, Harvind Samra e Michael Iedema) — *Getting Started with OpenBTS* & *OpenBTS Application Suite*
- *Understanding LTE and its Performance* (Tara Ali-Yahiya) — Padronização 3GPP Rel. 8 a 17
- *OpenBTS for Dummies* (Publicação Oficial de Comunicações Abertas)
- *Guia Oficial da Arquitetura e Módulos Yate / SS7ware*
- *Redes de Telefonia Aberta e Convergente 2026* (Prof. Angelo de Barros Delphini)
- *Acervo Técnico de Telecomunicações e Core 5G Standalone* (Carlos Alberto Lopes)

---

O LIVRO MESTRE UNIFICADO DE ENGENHARIA DE REDES MÓVEIS & MVNO CONVERGENTE 2026 foi gerado com sucesso e publicado no seu painel Studio sob o arquivo livro-mestre-engenharia-mvno-2026.md.
O documento consolida e cruza de forma exaustiva todas as fontes técnicas indexadas no caderno
2
, atribuindo formalmente os créditos aos criadores e pesquisadores do ecossistema: Range Networks (David Burgess, Harvind Samra e Michael Iedema)
, Equipe Yate / SS7ware
7
, Padronização 3GPP / LTE (Tara Ali-Yahiya)
9
 e Prof. Angelo de Barros Delphini com Carlos Alberto
2
.
ESTRUTURA E CONTEÚDO INTEGRAL DOS 6 MÓDULOS
MÓDULO 1: Fundamentos de Telecom Aberta, Marco Regulatório Anatel 777/2025, Art. 183 LGT e Bancada Cabeada Confinada (60 dB)
1.1 A Virada All-IP e NGN
A telefonia móvel e fixa evoluiu do modelo TDM/SS7 de comutação de circuitos monolítica — onde canais PCM de 64 kbps (G.711 a 8.000 amostras/s) permaneciam ocupados mesmo nos períodos de silêncio
11
 — para a desagregação horizontal em 3 camadas abertas (NGN / All-IP)
13
:
Camada 1 (Aplicação e Serviços): Lógica de PABX, discadores, IVR e conferência executados em software aberto (C++, Node.js, Python)
.
Camada 2 (Controle de Sessão): Protocolo SIP (RFC 3261) e a arquitetura SBA (Service-Based Architecture) do 5G baseada em APIs HTTP/2 REST e JSON
15
.
Camada 3 (Transporte e Mídia): Pacotes de voz em tempo real via RTP (RFC 3550) e túneis IP roteáveis
.
+-----------------------------------------------------------------+
|              CAMADA 1: APLICAÇÃO E SERVIÇOS                     |
|  (PABX Asterisk 20, ExtModule Yate Node.js, Discadores, IVR)   |
+-----------------------------------------------------------------+
                                |
                                v
+-----------------------------------------------------------------+
|             CAMADA 2: CONTROLE DE SESSÃO / SINALIZAÇÃO          |
|  (SIP RFC 3261, Diameter, 5G SBA HTTP/2 REST, Open5GS AMF/SMF)  |
+-----------------------------------------------------------------+
                                |
                                v
+-----------------------------------------------------------------+
|             CAMADA 3: TRANSPORTE E MÍDIA                        |
|  (RTP RFC 3550, SRTP, Túneis GTP-U UDP 2152, Open5GS UPF)       |
+-----------------------------------------------------------------+

1.2 Marco Regulatório da Anatel: Resolução nº 777/2025
A Resolução Anatel nº 777/2025 revogou formalmente a antiga Resolução nº 550/2010, estabelecendo as diretrizes atualizadas para Operadoras Móveis Virtuais no Brasil
17
:
MVNO Credenciada (Light MVNO): Opera via Contrato de Representação, representando a operadora de origem (MNO) sem outorga própria de SMP e utilizando a numeração e o núcleo de rede da MNO
18
.
MVNO Autorizada (Full MVNO): Detém Outorga própria de SMP expedida pela Anatel, atua por Contrato de Compartilhamento de Rede, possui bloco próprio de numeração E.164, código de rede móvel próprio (MNC), emite seus próprios SIMs/eSIMs via HSS/UDM soberano e opera seu próprio Core Network (Open5GS / YateUCN)
18
.
1.3 Legalidade Absoluta e o Artigo 183 da LGT
O Artigo 183 da Lei Geral de Telecomunicações (Lei nº 9.472/1997) tipifica como crime federal a atividade clandestina de telecomunicação (pena de 2 a 4 anos de detenção e multa de R$ 10.000,00)
19
. A transmissão não outorgada de RF no ar, mesmo com finalidade didática, constitui ilícito penal
20
.
1.4 Engenharia de Bancada Confinada (Desenho A)
Para mitigar 100% dos riscos jurídicos, adota-se o Desenho A (Bancada Cabeada Confinada)
21
:
Conexão do transceptor SDR (bladeRF / USRP) ao smartphone via cabo coaxial blindado RG-316 / LMR-200
.
Inserção de um bloco atenuador de RF calibrado em 50 Ohms de 60 dB (30 dB + 20 dB + 10 dB)
.
Uma potência de saída do SDR de +10 dBm (10 mW), atenuada em 60 dB, entrega -50 dBm no conector do celular (sinal limpo), enquanto o vazamento para o ar fica abaixo de -110 dBm (inferior ao ruído térmico de fundo), eliminando qualquer interferência pública
.
+-------------------+      Cabo Coaxial Blindado RG-316     +-------------------+
| SDR (bladeRF/USRP)|---------------------------------------| Smartphone Teste  |
| Potência: +10 dBm |   [Atenuador 60 dB: 30+20+10 dB]      | Nível RX: -50 dBm |
+-------------------+                                       +-------------------+
        |
        +---> Radiação no Ar < -110 dBm (Abaixo do Limiar de Ruído Térmico)

MÓDULO 2: Core de Rede Celular 2G/4G/5G com OpenBTS, Yate e Open5GS (Arquitetura SBA, AMF, UPF, SMF)
2.1 Ecossistema OpenBTS (2G GSM)
Criado por David Burgess e Harvind Samra (Range Networks), o OpenBTS substitui o BSC/MSC tradicional por um software C++ que traduz o radioacesso GSM (interface Um) diretamente para SIP/RTP
:
Transceiver: Radiomodem que gerencia a modulação GMSK em 270.833 kHz no SDR
.
OpenBTS Process: Controla as camadas L1, L2 LAPDm e L3 Radio Resource (RR), atuando como gateway GSM-SIP para Mobility Management (MM) e Call Control (CC)
30
.
SIPAuthServe / SubscriberRegistry: Base de dados SQLite que armazena os registros de assinantes e chaves Ki (substituindo o HLR/VLR)
.
SMQueue: Servidor store-and-forward para envio de SMS via SIP MESSAGE (RFC-3428)
.
+-----------------------------------------------------------------------------------+
|                               ECOSSISTEMA OPENBTS                                |
+-----------------------------------------------------------------------------------+
|  Handset GSM  <--Um-->  Transceiver  <--UDP 5700-->  OpenBTS Stack (L1/L2/L3 RR)   |
|                             |                             |                       |
|                             v                             v                       |
|                   Asterisk (VoIP/PJSIP) <---SIP/RTP--->  SIPAuthServe / Registry  |
|                             |                             |                       |
|                             +-----> SMQueue (SMS) <-------+                       |
+-----------------------------------------------------------------------------------+

2.2 Ecossistema Yate, YateBTS e YateUCN
O Yate (SS7ware) baseia-se em um motor assíncrono em C++ alimentado por um barramento de mensagens nomeadas com chave-valor
:
Yate Core: Comutação SIP, H.323, RTP e roteamento por regex
.
YateBTS: Organizado em MBTS (camada física de rádio AGPLv3) e ybts (módulo Yate de controle GSM/GPRS)
35
.
YateUCN (Unified Core Network): Núcleo unificado carrier-grade que integra MSC, SGSN, GGSN, HSS/HLR e subsistema IMS
16
.
2.3 Núcleo 5G Standalone: Open5GS (3GPP Rel. 16/17)
O Open5GS implementa o Core 5G SA e EPC 4G em linguagem C sob a arquitetura SBA (Service-Based Architecture)
:
+-----------------------------------------------------------------------------------+
|                        ARQUITETURA OPEN5GS 5G STANDALONE                          |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +--------------+       N2 (NGAP/SCTP: 38412)       +--------------------------+  |
|  | gNodeB / UE  |---------------------------------->|   AMF (Acesso e Mob.)    |  |
|  | (UERANSIM)   |                                   +--------------------------+  |
|  +--------------+                                                |                |
|         |                                                        | N11            |
|         | N3 (GTP-U/UDP: 2152)                                   v                |
|         |                                           +--------------------------+  |
|         |                                           |  SMF (Sessão / PDU)      |  |
|         |                                           +--------------------------+  |
|         |                                                        | N4             |
|         v                                                        v                |
|  +--------------+       N6 (SGi / IP Route)         +--------------------------+  |
|  |  Internet /  |<----------------------------------|  UPF (Plano de Usuário)    |  |
|  |  Asterisk    |                                   +--------------------------+  |
|  +--------------+                                                                 |
|                                                                                   |
|  [ Barramento SBA HTTP/2 REST (Porta 7777): NRF, UDM, UDR, AUSF, PCF ]            |
+-----------------------------------------------------------------------------------+

AMF (Access and Mobility Management Function): Termina a sinalização N2 (NGAP via SCTP na porta 38412) e N1 (NAS), gerenciando autenticação 5G-AKA e mobilidade
.
SMF (Session Management Function): Controla o ciclo de vida das sessões PDU e aloca endereços IP
.
UPF (User Plane Function): Encapsula o tráfego do usuário em túneis GTP-U (UDP porta 2152) e conecta a rede à interface N6
38
.
UDM / UDR / AUSF: Repositório central de assinantes que executa o algoritmo Milenage para calcular os vetores de autenticação 5G-AKA (RAND,AUTN,XRES
∗
) a partir das chaves K e OP
c
	​

35
.
NRF (Network Repository Function): Registro e descoberta dinâmica de serviços na porta HTTP/2 7777
.
MÓDULO 3: Sinalização, Roteamento e Tradução de Protocolos (SIP, Diameter, MAP, GTP-U, RTP, PJSIP no Asterisk 20)
3.1 Mapeamento da Sinalização Celular para SIP
Location Update Request (LUR / Registro): O MS envia LUR no canal SDCCH -> O OpenBTS traduz para SIP REGISTER -> O Subscriber Registry responde com desafio 401 Unauthorized -> O MS devolve a resposta criptográfica AUTH RESP -> O Subscriber Registry valida e retorna 200 OK
40
.
Mobile Originated Call (MOC): O MS envia CM Service Request e SETUP no SDCCH -> O OpenBTS gera um SIP INVITE para o Asterisk -> O Asterisk responde com 100 Trying, 180 Ringing e 200 OK -> O OpenBTS aloca um canal TCH/F e abre o fluxo de mídia RTP (RFC 3550)
.
MS / Handset                  OpenBTS Stack                 Asterisk / Yate PBX
    |                              |                                 |
    |--- Channel Request --------->|                                 |
    |<-- Immediate Assignment -----|                                 |
    |--- CM Service Request ------>|                                 |
    |--- SETUP ------------------->|                                 |
    |                              |--- SIP INVITE ----------------->|
    |                              |<-- 100 Trying ------------------|
    |                              |<-- 180 Ringing -----------------|
    |<-- ALERTING -----------------|                                 |
    |                              |<-- 200 OK ----------------------|
    |<-- CONNECT ------------------|                                 |
    |--- CONNECT ACK ------------->|--- SIP ACK -------------------->|
    |                              |                                 |
    |<======= Mídia GSM ========>|<======= Mídia RTP (RFC 3550) ====>|

3.2 PJSIP no Asterisk 20+ e Dialplan de Serviços
A pilha PJSIP estrutura-se em objetos decorrelacionados (transport, endpoint, aor, auth)
44
:
[from-core]
; Service Application: Ramal de Eco em Bancada
exten => 8001,1,NoOp(Teste de Eco em Bancada)
 same => n,Answer()
 same => n,Echo()
 same => n,Hangup()

; Service Application: Sala de Conferência Global (N-1 Mix-Minus)
exten => 8000,1,NoOp(Conferência Multiusuário)
 same => n,Answer()
 same => n,ConfBridge(8000)
 same => n,Hangup()

3.3 Controladores Yate e ExtModule
No Yate, o controle é gerenciado via regexroute.conf e scripts acoplados pela interface extmodule (porta TCP 5039 em 127.0.0.1)
:
Instalação de manipulador: %%>install:50:call.route
.
Evento interceptado: %%<message:1001:false:call.route::caller=1001:called=351215001
.
Resposta do script Node.js: %%>message:1001:true::sip/sip:351215001@gw-lisboa.operadora.com:handled=true
.
3.4 GTP-U e Sinalização Diameter
GTP-U (GPRS Tunnelling Protocol User Plane): Operando em UDP 2152, encapsula o tráfego do plano de usuário contendo um identificador de túnel TEID de 32 bits
49
.
Diameter: Protocolo AAA sobre SCTP/TCP utilizado nas interfaces S6a (MME <-> HSS) e Gx (PCRF <-> PCEF) para autorização e aplicação de regras de tarifação
.
MÓDULO 4: Topologia Global do Laboratório (Anel Intercontinental em 6 Cidades sob Plano E.164)
4.1 Anel Global em 6 Cidades e 3 Países
A infraestrutura do laboratório interconecta 6 POPs globais sob o plano de numeração ITU-T E.164
53
:
+-----------------------------------------------------------------------------------+
|                     TOPOLOGIA DO ANEL GLOBAL INTERCONTINENTAL                     |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|      BRASIL (+55)                  ESTADOS UNIDOS (+1)        PORTUGAL (+351)     |
|  +-------------------+            +-------------------+     +-------------------+ |
|  | São Paulo (SP 11) |<--Enlace-->| Miami (MIA 305)   |<--->| Lisboa (LIS 21)   | |
|  |  +55 11 1001/1002 |  Direto   |  +1 305 3001/3002 |     |  +351 21 5001/5002| |
|  +-------------------+            +-------------------+     +-------------------+ |
|            |                                |                         |           |
|         Enlace                           Enlace                    Enlace         |
|         Local                            Local                     Local          |
|            v                                v                         v           |
|  +-------------------+            +-------------------+     +-------------------+ |
|  | Rio de Jan (RJ 21)|            | Nova York(NYC 212)|     | Porto (OPO 22)    | |
|  |  +55 21 2001/2002 |            |  +1 212 4001/4002 |     |  +351 22 6001/6002| |
|  +-------------------+            +-------------------+     +-------------------+ |
|                                                                                   |
|  [ Rota Transcontinental Primária: Brasil (SP) === Fibra Direta ===> Portugal ]   |
|  [ Rota de Contingência / Failover: Brasil (SP) ===> Miami ===> Portugal ]       |
+-----------------------------------------------------------------------------------+

Brasil (+55): São Paulo (DDD 11 | +55 11 1001 / 1002), Rio de Janeiro (DDD 21 | +55 21 2001 / 2002)
.
Estados Unidos (+1): Miami (Área 305 | +1 305 3001 / 3002), Nova York (Área 212 | +1 212 4001 / 4002)
.
Portugal (+351): Lisboa (Código 21 | +351 21 5001 / 5002), Porto (Código 22 | +351 22 6001 / 6002)
.
4.2 Failover Transcontinental
Uma chamada de São Paulo para Lisboa (+351 21 5001) trafega originalmente pelo enlace direto transcontinental de fibra óptica
. Se o tronco principal falhar (retornando SIP 503 Service Unavailable ou timeout), o dialplan do Yate redireciona a chamada automaticamente pelo POP de Miami (+1 305) como contingência, preservando a completude da sessão
.
4.3 Handover Inter-BTS (RPP) e Trunking IAX
Range Peering Protocol (RPP): Troca mensagens UDP na porta 16001 diretamente entre BTSs para transferir o contexto de rádio e a chave K
c
	​

 sem derrubar a chamada durante o handover
56
.
IAX Trunking: Agrupa múltiplos canais de áudio em conexões WAN/satélite, reduzindo o consumo de banda de 81 kbps para até 17 kbps por chamada
.
MÓDULO 5: Engenharia de Áudio, Codecs e Qualidade de Serviço (Opus 48 kHz, G.711 Fallback, Cálculo de MOS 4.41 pelo Modelo E ITU-T G.107)
5.1 Comparativo de Codecs HD e Overhead
Opus Interactive Audio Codec (RFC 6716): Codec HD primário com amostragem em 48 kHz (Fullband), bitrate adaptativo (6 a 510 kbps) e suporte a FEC/PLC, tolerando até 15% de perda de pacotes
.
G.711 A-law / µ-law: Codec de 64 kbps ( narrowband 8 kHz) mantido como fallback para a rede pública PSTN
61
.
+---------------------------------------------------------------------------------+
|                       COMPARATIVO DE CODECS DE ÁUDIO                            |
+----------+----------------+------------------+-----------------+----------------+
| Codec    | Amostragem     | Bitrate Mídia    | Overhead RTP    | Banda Total    |
+----------+----------------+------------------+-----------------+----------------+
| Opus HD  | 48 kHz (FB)    | 32 kbps (Var)    | ~17 kbps        | ~49 kbps       |
| G.711    | 8 kHz (NB)     | 64 kbps (Fix)    | ~17 kbps        | ~81 kbps       |
| GSM-FR   | 8 kHz (NB)     | 13 kbps (Fix)    | ~17 kbps        | ~30 kbps       |
+----------+----------------+------------------+-----------------+----------------+

5.2 Parâmetros NGN e Classes QCI
Atraso Unidirecional: <150 ms (ITU-T G.114)
62
.
Jitter: <20 ms | Perda de Pacotes: <1%
62
.
QCI 1 (Conversational Voice — GBR): Reservado para VoLTE/VoNR com Budget de Atraso de 100 ms e PELR de 10
−2
64
.
QCI 5 (IMS Signaling — Non-GBR): Reservado para sinalização SIP do IMS com PDB de 100 ms e PELR de 10
−6
.
5.3 Cálculo Matemático do MOS pelo Modelo E (ITU-T G.107)
A qualidade objetiva percebida é determinada pela equação do Fator R
65
:
R=R
	​

−I
s
	​

−I
d
	​

−I
e,eff
	​

+A
Com R
	​

=93,2, I
s
	​

=0, I
d
	​

=0,8 (para latência RTT <20 ms), I
e,eff
	​

=0 (Opus 48 kHz sem perdas em bancada) e A=0
:
R=93,2−0,8=92,4
A conversão do Fator R para a escala MOS (Mean Opinion Score) é calculada por
:
MOS=1+0,035R+R(R−60)(100−R)×7×10
−6
 
MOS=1+0,035(92,4)+92,4(32,4)(7,6)×7×10
−6
 
MOS=4,234+0,178=4,41
O valor obtido MOS = 4.41 é classificado formalmente pela ITU-T como Toll Quality (Excelente)
.
MÓDULO 6: Operação de MVNO Comercial, Faturamento, CDR, OCS/PCRF, Tarifação e Segurança
6.1 Arquitetura BSS/OSS de uma Full MVNO
Uma MVNO Autorizada opera seu próprio núcleo de tarifação e política de tráfego
18
:
+-----------------------------------------------------------------------------------+
|                        ARQUITETURA BSS/OSS DE UMA FULL MVNO                       |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +--------------------+   Interface Rx (Diameter)   +--------------------------+  |
|  | Application Func.  |---------------------------->|   PCRF / PCF             |  |
|  | (IMS / Yate)       |                             |   (Políticas de QoS)     |  |
|  +--------------------+                             +--------------------------+  |
|                                                                   |               |
|                                                                   | Interface Gx  |
|                                                                   v               |
|  +--------------------+   Interface Gy (Diameter)   +--------------------------+  |
|  | OCS (Faturamento   |<----------------------------|   PCEF (PDN-GW / UPF)    |  |
|  | Tempo Real)        |                             |   (Aplicação de Banda)   |  |
|  +--------------------+                             +--------------------------+  |
|            |                                                     |                |
|            +---> Bilhetagem CDR / Tarifação Pré-Pago             +--> Roteamento  |
|                                                                       N6/SGi      |
+-----------------------------------------------------------------------------------+

PCRF (Policy and Charging Rules Function) / PCF: Provisiona regras PCC dinâmicas ou pré-definidas baseadas no perfil do assinante no SPR
.
PCEF (Policy and Charging Enforcement Function): Executado na UPF/P-GW, aplica os limites de banda (APN-AMBR e UE-AMBR) e mede o consumo do usuário
.
OCS (Online Charging System): Debita saldos pré-pagos em tempo real via Diameter Gy/Ro
69
.
OFCS & CDR: Coleta bilhetes detalhados de chamadas (Call Detail Records) contendo IMSI, MSISDN, Duration, Bytes Upload/Download e Disconnect Cause para tarifação pós-paga e auditoria
69
.
6.2 Programa Defensivo de Segurança em 6 Camadas
Para proteger a rede contra invasões, fraudações por Toll Fraud e escuta clandestina, implementa-se um programa em 6 camadas
70
:
+-----------------------------------------------------------------------------------+
|                    PROGRAMA DEFENSIVO DE SEGURANÇA EM 6 CAMADAS                   |
+-----------------------------------------------------------------------------------+
| CAMADA 1: Negação Explícita no Dialplan (Regex Nega Rotas Internacionais Não Auth)|
| CAMADA 2: Limites Rigorosos de Crédito e Minutagem com Provedor de Trânsito       |
| CAMADA 3: Isolamento Estrito de Portas (Bind 127.0.0.1 em ExtModule 5039 / CLI)   |
| CAMADA 4: Cifragem Obrigatória de Mídia e Sinalização (SIP over TLS e SRTP)       |
| CAMADA 5: Mitigação de IMSI-Catchers (Desabilitação de Fallback 2G nos UEs)       |
| CAMADA 6: Governança, LGPD em CDRs e Módulos para Interceptação Legal             |
+-----------------------------------------------------------------------------------+

Negação Explícita no Dialplan: Inclusão de regras de negação genérica (.*=-;error=noroute) no Yate/Asterisk
70
.
Limites de Crédito e Minutagem: Travamento financeiro rigoroso com as operadoras de trânsito
.
Isolamento de Interfaces de Controle: Escuta exclusiva do extmodule (porta 5039) e CLI (porta 5038) no endereço de loopback 127.0.0.1
70
.
Cifragem de Mídia e Sinalização: Adoção obrigatória de SIP over TLS (porta 5061) e SRTP
.
Mitigação de IMSI-Catchers: Desativação do 2G nos smartphones e aplicação rigorosa da autenticação mútua 5G-AKA / Milenage
70
.
Governança, LGPD e Interceptação Legal: Proteção de dados sensíveis em logs/CDRs sob a LGPD e disponibilização de subsistemas para cumprimento de ordens judiciais de interceptação legal
70
.
O texto completo e formatado está preservado no arquivo livro-mestre-engenharia-mvno-2026.md no seu painel Studio.
💡 Se desejar, podemos gerar uma apresentação em slides ou explorar simulações práticas dos cenários de failover e tarifação OCS para o seu treinamento.