/**
 * @file module5.mjs
 * @description Módulo 5: Hardphones, Softphones e Validação Ponta a Ponta de Clientes VoIP / IMS
 */

export const module5 = {
  id: 5,
  title: "Módulo 5: Hardphones, Softphones e Validação Ponta a Ponta de Clientes VoIP / IMS",
  summary: "A homologação prática e o comissionamento dos terminais de usuário: configuração detalhada de softphones (MicroSIP) e hardphones IP, negociação de codecs HD (Opus, G.711), matriz de testes de chamadas locais e internacionais, troubleshooting sistemático de erros SIP e análise de qualidade de voz (MOS, Jitter e Delay).",
  lessons: [
    {
      id: "5.1",
      title: "5.1 Provisionamento do MicroSIP e Telefones IP com Codecs de Alta Fidelidade (G.711 / Opus)",
      duration: "45 min",
      tag: "Terminais e Codecs",
      slides: [
        {
          title: "Homologação de Terminais no Núcleo de Telefonia",
          subtitle: "Integração de Softphones e Telefones IP Físicos na Rede do Laboratório",
          bullets: [
            "Os Dois Tipos de Terminais: Softphones em estações de trabalho (MicroSIP) e aparelhos físicos SIP (Grandstream, Yealink).",
            "Parâmetros de Registro Obrigatórios: SIP Server IP, Domain/Realm, Username, Auth ID e Secret criptografado.",
            "Portas de Sinalização: UDP/TCP 5060 para SIP padrão, TLS 5061 para sinalização criptografada carrier-grade.",
            "Suporte a Múltiplos Registros: Ramais configurados simultaneamente para os nós de São Paulo (+5511) e Rio de Janeiro (+5521)."
          ],
          speakerNotes: "O terminal SIP é a ponta visível da rede para o assinante. Seu provisionamento correto é o primeiro passo para garantir a integridade da comunicação."
        },
        {
          title: "A Batalha dos Codecs: G.711a/u vs Opus vs AMR-WB",
          subtitle: "Largura de Banda, Complexidade Computacional e Qualidade Subjetiva de Voz",
          bullets: [
            "G.711 (PCMA / PCMU): Taxa fixa de 64 kbps, sem compressão, latência de amostragem de 0,125 ms, fidelidade convencional de PSTN.",
            "Opus Interactive Audio Codec: Bitrate adaptativo de 6 a 510 kbps, amostragem de até 48 kHz (Fullband), resiliência nativa à perda de pacotes.",
            "AMR-WB (G.722.2): O codec padrão do VoLTE/VoNR, taxa de amostragem de 16 kHz com voz em alta definição (HD Voice).",
            "Ordem de Preferência SDP: O terminal envia no INVITE a lista priorizada m=audio para negociação mútua com o nó de telefonia."
          ],
          speakerNotes: "Em nossa rede MVNO 2026, configuramos o codec Opus com amostragem de 48 kHz como prioridade absoluta para chamadas internas e o G.711 como fallback obrigatório para interconexões com a rede pública."
        },
        {
          title: "Provisionamento Automatizado via XML e Arquivos INI",
          subtitle: "Zero-Touch Provisioning e Configuração Pré-Empacotada para Usuários",
          bullets: [
            "Estrutura do contacts.xml: Livro de endereços corporativo centralizado com ramais de São Paulo, Rio, Miami, Nova York e Lisboa.",
            "Arquivo microsip.ini: Configurações de servidor, codecs habilitados, detecção de silêncio (VAD) e buffer de jitter pré-calibrado.",
            "Distribuição Centralizada: Scripts PowerShell e Ansible para entrega de configurações automáticas em massa nas estações dos analistas.",
            "Prevenção de Ataques de Registro: Autenticação MD5/SHA-256 com nonce gerado dinamicamente para neutralizar ataques de repetição."
          ],
          speakerNotes: "Em operadoras reais, o usuário não digita senhas ou servidores: o aparelho baixa via TFTP ou HTTPS o arquivo de configuração provisionado pelo OSS/BSS."
        },
        {
          title: "Sinalização de Registro SIP (REGISTER Flow)",
          subtitle: "O Desafio Digest Authentication e a Manutenção do Binding de NAT",
          bullets: [
            "REGISTER Inicial sem Credenciais: O softphone envia REGISTER para o nó Asterisk/Yate sem o cabeçalho Authorization.",
            "Resposta 401 Unauthorized: O nó responde com o cabeçalho WWW-Authenticate contendo realm, nonce e algoritmo.",
            "REGISTER Autenticado: O terminal recalcula o hash MD5 (username:realm:password + nonce + URI) e reenvia a requisição.",
            "Resposta 200 OK e Tempo de Expiração: O servidor aceita o registro, atualiza sua Location Table e define o header Expires (ex: 3600s)."
          ],
          speakerNotes: "O processo de Digest Authentication é análogo ao padrão HTTP RFC 2617 e garante que a senha do assinante nunca transite em texto claro pela rede."
        }
      ],
      theory: `### 1. A Importância da Homologação de Terminais em Operadoras Virtuais (MVNOs)

Na arquitetura de telecomunicações de uma operadora móvel virtual ou de um provedor de serviços de voz sobre IP (VoIP), a interface com o usuário final é estabelecida pelo terminal SIP (Session Initiation Protocol User Agent - UA). Esse terminal pode assumir a forma de um **Softphone** (aplicação de software em computadores ou smartphones), um **Hardphone IP** dedicado (aparelhos de mesa conectados via Ethernet com chips DSP de áudio) ou um **Gateway de Telefonia ATA** (Analog Telephone Adapter) que conecta aparelhos telefônicos analógicos tradicionais a um enlace SIP.

No Laboratório MVNO Telecom 2026, adotamos como cliente de referência oficial para as bancadas de teste o **MicroSIP**, um softphone open source de alta performance baseado na pilha SIP PJSIP, com baixo consumo de memória RAM, suporte nativo a 64 bits e compatibilidade total com codecs de áudio de alta definição, em especial o **Opus** e o **G.711 (PCMA/PCMU)**.

---

### 2. Fundamentos da Engenharia de Codecs de Áudio

A qualidade da chamada de voz percebida pelo usuário humano depende diretamente do algoritmo de codificação e decodificação (codec) empregado na camada de mídia. Existem três gerações principais de codecs coexistindo nas redes de telecomunicações:

1. **G.711 (Pulse Code Modulation - PCM)**: Padronizado pelo ITU-T em 1972, é a base da telefonia digital convencional (SDH/PDH e canais E1/T1). Opera com amostragem de 8.000 amostras por segundo (8 kHz) com 8 bits por amostra, resultando em uma taxa de dados constante de **64 kbps**. Possui duas leis de quantização logarítmica:
   - **A-law (PCMA)**: Utilizada no Brasil, Europa e na maior parte do mundo, otimizada para sinais de amplitude moderada.
   - **μ-law (PCMU)**: Utilizada nos Estados Unidos e Japão, com faixa dinâmica ligeiramente superior para sinais fracos.
   - Vantagens: Atraso algorítmico quase nulo (0,125 ms) e nenhum custo de licenciamento ou compressão pesada na CPU.
   - Desvantagens: Qualidade de áudio restrita à faixa vocal estreita (300 Hz a 3.400 Hz - narrowband).

2. **G.722 e G.722.2 (AMR-WB - Adaptive Multi-Rate Wideband)**: Codecs de banda larga (wideband) com amostragem em 16 kHz (50 Hz a 7.000 Hz). É o codec padrão adotado na tecnologia **HD Voice** de redes móveis 3G, 4G (VoLTE) e 5G (VoNR), oferecendo clareza cristalina para consoantes sibilantes (s, f, z).

3. **Opus Interactive Audio Codec (RFC 6716)**: Desenvolvido pelo IETF, funde a tecnologia do codec Skype SILK (para fala humana em baixos bitrates) com o codec CELT (para música e fidelidade extrema). É um codec de espectro completo (Fullband) com suporte a amostragem de até **48 kHz**, bitrates dinâmicos de 6 kbps até 510 kbps e adaptação automática de taxa em caso de congestionamento de rede. No laboratório, o Opus é priorizado para chamadas de ramal para ramal e testes de qualidade máxima.

---

### 3. Mecanismo de Digest Authentication (RFC 2617 / RFC 3261)

A segurança no registro de terminais evita que atores mal-intencionados sequestrem ramais telefônicos para originar fraudes internacionais (toll fraud). O protocolo SIP utiliza a autenticação Digest em quatro etapas:

\`\`\`
  Terminal (MicroSIP)                             Nó de Telefonia (Asterisk/Yate)
          |                                                     |
   (1)    |-------------- REGISTER (sem auth) ----------------->|
          |                                                     |
   (2)    |<------------- 401 Unauthorized ---------------------|
          |              (WWW-Authenticate: nonce="4fa2b...")   |
          |                                                     |
   (3)    |-------------- REGISTER (com Digest) --------------->|
          |              (Authorization: Digest response="c8...")
          |                                                     |
   (4)    |<------------- 200 OK -------------------------------|
          |              (Contact: <sip:1001@ip:5060>;expires) |
\`\`\`

O cálculo do parâmetro **response** é dado por:
$$HA1 = MD5(Username : Realm : Password)$$
$$HA2 = MD5(Method : DigestURI)$$
$$Response = MD5(HA1 : Nonce : HA2)$$

Como o **nonce** é um valor aleatório gerado pelo servidor e expira após poucos segundos, ataques de repetição (replay attacks) são sumariamente rejeitados.

---

### 4. Manutenção de NAT e Keepalive (SIP OPTIONS / STUN)

Quando o softphone opera atrás de um roteador doméstico ou empresarial com NAT (Network Address Translation), a tabela de tradução de portas fecha o canal após 30 a 60 segundos de inatividade. Para manter o fluxo bidirecional e permitir o recebimento de chamadas entrantes, duas técnicas são empregadas:
- **Keepalive UDP**: O terminal envia pequenos pacotes de ping (ou CRLF vazio) a cada 20 segundos para a porta 5060 do nó de telefonia, renovando a entrada NAT no roteador.
- **Symmetric RTP e rewrite_contact**: No nó de telefonia Asterisk, configuramos \`rtp_symmetric=yes\` e \`force_rport=yes\` para que o servidor desconsidere os IPs privados anunciados no corpo da mensagem SIP e responda diretamente para o IP público e a porta UDP de onde o pacote efetivamente partiu.`,
      configCode: `; ==============================================================================
; ARQUIVO DE CONFIGURAÇÃO DE REFERÊNCIA: microsip.ini (Fragmento Homologado)
; Local de Armazenamento: %APPDATA%\\MicroSIP\\microsip.ini
; Responsável Técnico: Carlos Alberto (Engenharia de Telecomunicações)
; ==============================================================================

[Account1]
Label=Carlos Alberto - SP 1001
Server=192.168.10.10:5060
Proxy=192.168.10.10:5060
Domain=192.168.10.10
User=1001
AuthID=1001
Password=SecretSuperSafeToken2026!
DisplayName=Carlos Alberto (Engenharia SP)
Expires=3600
KeepAlive=20
Transport=UDP
Encryption=Disabled
AutoPublish=1
MediaEncryption=Disabled

[Audio]
; Prioridade Rigorosa de Codecs (Opus Fullband em 1º lugar, fallback G.711a)
Codecs=opus/48000/2,pcma/8000/1,pcmu/8000/1,g722/16000/1
DTMF=RFC2833
DisableVAD=1
EchoCancellation=1
AudioGainControl=1
NoiseSuppression=1

; ==============================================================================
; LIVRO DE ENDEREÇOS CENTRALIZADO: contacts.xml
; Permite discagem em um clique para os nós de todos os países
; ==============================================================================
<!--
<contacts>
  <contact name="Laboratório Eco Local SP" number="8001" presence="0" />
  <contact name="Sala de Conferência Global" number="8000" presence="0" />
  <contact name="Mariana Santos - RJ" number="55212001" presence="1" />
  <contact name="John Doe - Miami" number="13053001" presence="1" />
  <contact name="Sarah Connor - Nova York" number="12124001" presence="1" />
  <contact name="António Silva - Lisboa" number="351215001" presence="1" />
</contacts>
-->`,
      traceDissection: `No.     Time           Source                Destination           Protocol Length Info
------------------------------------------------------------------------------------------------------------------------
    1   0.000000       192.168.10.50         192.168.10.10         SIP      542    Request: REGISTER sip:192.168.10.10 (sem credenciais)
    2   0.002140       192.168.10.10         192.168.10.50         SIP      612    Status: 401 Unauthorized | WWW-Authenticate: Digest
    3   0.015320       192.168.10.50         192.168.10.10         SIP      894    Request: REGISTER sip:192.168.10.10 (Digest Response)
    4   0.018450       192.168.10.10         192.168.10.50         SIP      580    Status: 200 OK (Contact binding aceito: 3600s)

DETALHAMENTO DO PACOTE 3 (REGISTER com Digest):
Session Initiation Protocol (SIP)
    Request-Line: REGISTER sip:192.168.10.10 SIP/2.0
    Via: SIP/2.0/UDP 192.168.10.50:5060;rport;branch=z9hG4bKPj9a81f8c4-7b12-4f88
    Max-Forwards: 70
    From: <sip:1001@192.168.10.10>;tag=82fa91bd-3412-4c22-98ab-30129bc41289
    To: <sip:1001@192.168.10.10>
    Call-ID: c5e412a8-1294-4321-ba32-849201928374@192.168.10.50
    CSeq: 2 REGISTER
    User-Agent: MicroSIP/3.21.3 (x64 Windows)
    Contact: <sip:1001@192.168.10.50:5060;ob>
    Expires: 3600
    Allow: PRACK, INVITE, ACK, BYE, CANCEL, UPDATE, INFO, SUBSCRIBE, NOTIFY, REFER, MESSAGE, OPTIONS
    Authorization: Digest username="1001", realm="asterisk", nonce="1729511942/d8fa19e27301bc5", uri="sip:192.168.10.10", response="b7e289410ca385920a1f9401827419e5", algorithm=MD5
    Content-Length: 0`,
      diagram: "brasil"
    },
    {
      id: "5.2",
      title: "5.2 Bateria de Testes Funcionais: Chamadas Locais, Interurbanas, DDI e Serviços de Eco (8001) e Conferência (8000)",
      duration: "50 min",
      tag: "Homologação Prática",
      slides: [
        {
          title: "O Plano Metodológico de Homologação de Voz",
          subtitle: "Procedimento Operacional Padrão (POP) para Validação de Redes MVNO",
          bullets: [
            "Fase 1 - Autoteste em Loopback: Chamada para o ramal de eco interativo 8001 (validação imediata de áudio full-duplex).",
            "Fase 2 - Chamadas Intranó (Mesmo POP): Teste entre ramais 1001 e 1002 em São Paulo (comutação direta via Asterisk).",
            "Fase 3 - Chamadas Interurbanas Nacionais: Ramal de SP (1001) discando para o ramal do RJ (55212001) via tronco Yate.",
            "Fase 4 - Chamadas Internacionais DDI: Ramais brasileiros discando para Miami (+1305), NYC (+1212) e Lisboa (+35121)."
          ],
          speakerNotes: "Nenhuma rede de telecomunicações é colocada em produção comercial sem passar por uma bateria sistemática de aceitação que teste desde o eco local até a comutação intercontinental."
        },
        {
          title: "O Serviço de Eco de Áudio (Ramal 8001)",
          subtitle: "Como o Nó Asterisk Reflete a Mídia para Diagnóstico de Atraso e Clareza",
          bullets: [
            "Aplicação Echo() no Dialplan: O Asterisk recebe o fluxo RTP na porta UDP negociada e o retransmite instantaneamente de volta ao remetente.",
            "Detecção Imediata de Atraso: Se o usuário falar 'Teste de Áudio', ele deve ouvir sua própria voz em menos de 40 ms.",
            "Isolamento de Falhas Unidirecionais (One-Way Audio): Se o usuário falar e não ouvir retorno, há bloqueio de firewall ou NAT no sentido reverso.",
            "Avaliação de Clipping e Distorção: Permite ao operador ajustar os ganhos de microfone e eliminar microfonia ou ruídos de fundo."
          ],
          speakerNotes: "O teste de eco é a ferramenta de diagnóstico mais rápida do engenheiro de telecomunicações. Se o eco não funcionar, nenhuma chamada para ramais externos funcionará perfeitamente."
        },
        {
          title: "A Sala de Conferência Global Multiusuário (Ramal 8000)",
          subtitle: "Mixagem de Mídia Carrier-Grade com a Aplicação ConfBridge()",
          bullets: [
            "O Motor de Mixagem do Asterisk: Combina em tempo real até 50 fluxos de áudio simultâneos em um único barramento unificado.",
            "Transcodificação Dinâmica Automática: Assinantes falando via Opus (48 kHz) conversam de forma transparente com telefones em G.711 (8 kHz).",
            "Aviso de Entrada e Saída Sonoro: Tons e anúncios pré-gravados notificam a presença de novos participantes na sala.",
            "Otimização de Largura de Banda: Silêncio não é retransmitido, economizando pacotes IP na infraestrutura de rede."
          ],
          speakerNotes: "A aplicação ConfBridge do Asterisk 20 reúne participantes de três continentes em uma mesma sala com sincronismo estrito de clock de jitter."
        },
        {
          title: "Matriz de Resultados e Critérios de Aceitação de Teste",
          subtitle: "Validação Cruzada entre as 6 Praças do Laboratório Internacional",
          bullets: [
            "Origem SP (1001) -> Destino SP (1002): PDD < 50 ms | Jitter < 2 ms | Perda de Pacote: 0.0% | Status: APROVADO.",
            "Origem SP (1001) -> Destino RJ (55212001): PDD < 120 ms | Jitter < 6 ms | Perda de Pacote: 0.0% | Status: APROVADO.",
            "Origem SP (1001) -> Destino Miami (13053001): PDD < 450 ms | Jitter < 14 ms | Perda de Pacote: 0.1% | Status: APROVADO.",
            "Origem SP (1001) -> Destino Lisboa (351215001): PDD < 600 ms | Jitter < 22 ms | Perda de Pacote: 0.2% | Status: APROVADO."
          ],
          speakerNotes: "O PDD (Post-Dial Delay) mede o tempo exato entre o envio do último dígito pelo assinante e o recebimento do tom de chamada (180 Ringing). Todos os testes cumpriram as metas da Anatel e ITU-T."
        }
      ],
      theory: `### 1. Metodologia de Aceitação de Redes de Voz (VoIP Acceptance Testing)

A validação de uma infraestrutura de telecomunicações recém-implantada exige a execução de uma bateria de testes funcionais padronizada. Em operadoras reais, essa bateria compõe o Procedimento de Aceitação de Rede (ATP - Acceptance Test Procedure), validando tanto os fluxos de sinalização SIP (plano de controle) quanto os fluxos de áudio RTP (plano de usuário).

No Laboratório MVNO Telecom 2026, dividimos os testes em quatro camadas de complexidade crescente:

\`\`\`
  [1. Autoteste de Eco] ----> [2. Chamadas Locais Intranó] ----> [3. Interurbano Nacional] ----> [4. Roteamento Internacional]
      (Ramal 8001)                (Ramal 1001 -> 1002)             (SP -> RJ via Yate)          (Brasil -> EUA / Portugal)
\`\`\`

---

### 2. Engenharia do Serviço de Eco de Áudio (Ramal 8001)

O serviço de eco é um mecanismo em que o PBX atende a chamada de forma automatizada e estabelece uma ponte de loopback imediata no canal de mídia. O pacote RTP recebido na porta UDP local é devolvido ao endereço de socket de origem com carimbo de tempo (timestamp) preservado ou atualizado.

Principais diagnósticos obtidos no teste de eco:
1. **Verificação de Áudio Bidirecional (Full-Duplex)**: Em redes VoIP com NAT ou regras incorretas de firewall, é frequente o sintoma de *One-Way Audio*, onde um interlocutor fala mas não ouve ou vice-versa. O eco confirma que tanto o canal de transmissão (Tx) quanto o canal de recepção (Rx) estão totalmente desimpedidos.
2. **Cálculo de Atraso de Ida e Volta (Round-Trip Delay)**: Se o usuário emite um som percussivo (uma palma ou estalo) e o retorno é percebido instantaneamente, o atraso é inferior a 100 ms, considerado padrão classe A pela norma ITU-T G.114.
3. **Avaliação Subjetiva de Distorção**: Permite calibrar a sensibilidade do microfone (Gain Control) e verificar se o algoritmo de cancelamento de eco acústico (AEC) do terminal está ativo.

---

### 3. Engenharia da Sala de Conferência Multiusuário (Ramal 8000)

Diferente de uma chamada ponto a ponto (onde dois terminais trocam pacotes RTP diretamente ou via nó simples), uma conferência multiusuário exige um **Mixer de Áudio Carrier-Grade**. No Asterisk 20, essa função é desempenhada pelo módulo \`app_confbridge.so\`.

O ConfBridge opera da seguinte forma:
- Cada participante envia seu fluxo RTP para uma porta UDP dedicada no Asterisk.
- O Asterisk decodifica cada fluxo para sinal linear não comprimido (SLIN 8, 16 ou 48 kHz).
- O motor de mixagem soma os sinais de áudio de todos os participantes exceto do próprio orador (técnica conhecida como *N-1 mix-minus*), evitando que o participante ouça sua própria voz com eco.
- O sinal mixado resultante é recodificado no codec preferencial de cada participante (Opus para softphones, G.711 para hardphones convencionais) e enviado aos respectivos clientes.

---

### 4. Roteamento de Chamadas Nacionais e Internacionais Passo a Passo

Ao discar para o número \`55212001\` a partir do softphone de São Paulo (\`1001\`):
1. O Asterisk SP consulta o contexto \`[interurbano-nacional]\` em \`extensions.conf\`.
2. A expressão regular \`_5521XXXX\` é correspondida.
3. O Asterisk normaliza o número e envia um SIP INVITE para o nó **Yate C++** (\`192.168.10.20:5060\`).
4. O Yate consulta sua tabela de roteamento regex e identifica que o prefixo \`5521\` pertence ao gateway do Rio de Janeiro.
5. O Yate repassa o INVITE para o nó do Rio (\`192.168.20.10:5060\`).
6. O nó do Rio faz tocar o terminal da analista Mariana Santos (\`2001\`).
7. Quando Mariana atende, o status 200 OK viaja de volta pelo anel, e o áudio RTP é estabelecido diretamente entre os nós.`,
      configCode: `; ==============================================================================
; ARQUIVO: /etc/asterisk/extensions.conf (Serviços de Teste e Roteamento)
; ==============================================================================

; --- Contexto de Testes e Diagnóstico Automatizado ---
[servicos-diagnostico]
; Ramal de Eco de Áudio (8001)
exten => 8001,1,NoOp(--- INICIANDO TESTE DE ECO DE AUDIO (RAMAL 8001) ---)
 same => n,Answer(500)
 same => n,Playback(beep)
 same => n,NoOp(Canal conectado: \${CHANNEL} | Codec Lido: \${CHANNEL(audionativeformat)})
 same => n,Echo()
 same => n,Hangup()

; Ramal de Conferência Global (8000)
exten => 8000,1,NoOp(--- ENTRANDO NA SALA DE CONFERENCIA GLOBAL 8000 ---)
 same => n,Answer()
 same => n,ConfBridge(sala-global-2026,padrao-bridge,padrao-usuario)
 same => n,Hangup()

; --- Contexto de Interconexão Interurbana e Internacional ---
[interconexao-global]
; Rota Brasil Rio de Janeiro (5521 + ramal)
exten => _5521XXXX,1,NoOp(--- ROTEANDO PARA O NÓ DO RIO DE JANEIRO VIA YATE ---)
 same => n,Dial(PJSIP/\${EXTEN}@tronco-yate-central,60,Tt)
 same => n,Hangup()

; Rota Estados Unidos Miami (1305 + ramal)
exten => _1305XXXX,1,NoOp(--- ROTEANDO PARA MIAMI VIA GATEWAY INTERNACIONAL ---)
 same => n,Dial(PJSIP/\${EXTEN}@tronco-yate-central,60,Tt)
 same => n,Hangup()

; Rota Portugal Lisboa (35121 + ramal)
exten => _35121XXXX,1,NoOp(--- ROTEANDO PARA LISBOA VIA GATEWAY INTERNACIONAL ---)
 same => n,Dial(PJSIP/\${EXTEN}@tronco-yate-central,60,Tt)
 same => n,Hangup()`,
      traceDissection: `No.     Time           Source                Destination           Protocol Length Info
------------------------------------------------------------------------------------------------------------------------
    1   0.000000       192.168.10.50         192.168.10.10         SIP      850    Request: INVITE sip:8001@192.168.10.10 | m=audio (Opus, PCMA)
    2   0.001200       192.168.10.10         192.168.10.50         SIP      340    Status: 100 Trying
    3   0.002800       192.168.10.10         192.168.10.50         SIP      910    Status: 200 OK (Answered) | m=audio 10002 (Opus 48kHz)
    4   0.004100       192.168.10.50         192.168.10.10         SIP      410    Request: ACK sip:8001@192.168.10.10
    5   0.024000       192.168.10.50         192.168.10.10         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x74A1B2C3, Seq=1
    6   0.024150       192.168.10.10         192.168.10.50         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x19283746, Seq=1 (ECHO REFLECTION)

ANÁLISE DE FLUXO RTP REFLETIDO (PACOTES 5 E 6):
Delta de Tempo entre Pacote Tx e Rx no Nó Asterisk: 0.150 milissegundos (150 microssegundos)
Codec Utilizado: Opus 48000 Hz, estéreo full-band
Buffer de Jitter: Zero perdas acumuladas, sincronização perfeita de relógio RTP.`,
      diagram: "global"
    },
    {
      id: "5.3",
      title: "5.3 Troubleshooting Avançado de Falhas e Códigos de Erro SIP (401, 403, 404, 486, 488, 503)",
      duration: "45 min",
      tag: "Troubleshooting SIP",
      slides: [
        {
          title: "A Taxonomia dos Códigos de Erro SIP (RFC 3261)",
          subtitle: "Como Diagnosticar Falhas a Partir das Respostas de Resposta de Erro",
          bullets: [
            "Classe 4xx (Client Error): Falhas atribuíveis à configuração ou requisição do terminal do usuário.",
            "Classe 5xx (Server Failure): Falhas internas na infraestrutura do nó de telefonia ou esgotamento de recursos.",
            "Classe 6xx (Global Failure): Falhas universais onde nenhum destino possível pode atender a chamada.",
            "A Importância do Cabeçalho Reason e Warning: Textos descritivos que esclarecem a causa raiz exata da recusa."
          ],
          speakerNotes: "O domínio dos códigos de erro SIP é o divisor de águas entre um técnico de suporte básico e um verdadeiro engenheiro sênior de telecomunicações."
        },
        {
          title: "Erros de Autenticação e Permissão: 401 vs 403",
          subtitle: "Diferenciando Falha de Credencial de Falha de Autorização de Rota",
          bullets: [
            "401 Unauthorized: O nó solicita credenciais Digest (comportamento normal no primeiro handshake de registro).",
            "403 Forbidden (Senha Incorreta): Se após o envio do Digest o hash não bater com o banco de dados do Asterisk.",
            "403 Forbidden (Rota Bloqueada): Se o ramal 1001 não tiver permissão de discagem internacional (DDI) no dialplan.",
            "Prevenção contra Brute Force: Fail2Ban monitorando os logs do Asterisk e bloqueando temporariamente o IP atacante."
          ],
          speakerNotes: "O erro 403 Forbidden significa que o servidor compreendeu a identidade do usuário, mas deliberadamente se recusa a autorizar a operação solicitada."
        },
        {
          title: "Erros de Destino e Disponibilidade: 404 Not Found e 486 Busy Here",
          subtitle: "Tratamento de Números Inexistentes e Ocupação de Canal de Assinante",
          bullets: [
            "404 Not Found: O número discado não coincide com nenhum padrão (pattern match) nas extensões ativas.",
            "Diagnóstico de 404: Verificar ausência de dígito de país (+55), falta de pontuação ou erro de digitação do usuário.",
            "486 Busy Here: O ramal de destino já está em outra chamada ativa e não possui suporte a chamada em espera.",
            "Tratamento de 486 no Dialplan: Transbordo automático para correio de voz corporativo ou segundo ramal do grupo."
          ],
          speakerNotes: "Um 404 Not Found originado na borda internacional geralmente indica que um país alterou suas regras de prefixo ou que o gateway normalizador removeu dígitos indevidos."
        },
        {
          title: "Incompatibilidade de Codec e Falha de Tronco: 488 vs 503",
          subtitle: "Resolução de Falhas Críticas de Negociação de Mídia e Esgotamento de Gateway",
          bullets: [
            "488 Not Acceptable Here: O terminal exige um codec que o servidor não suporta (ex: cliente só oferece G.729 e o nó só aceita Opus/PCMA).",
            "Solução para 488: Habilitar transcodificação no nó Asterisk ou adicionar o codec G.711a na lista permitida do terminal.",
            "503 Service Unavailable: O gateway de destino está desligado, com CPU travada ou sem circuitos de mídia disponíveis.",
            "Estratégia de Failover para 503: O dialplan deve interceptar o código de causa 503 e desviar a chamada para uma rota secundária."
          ],
          speakerNotes: "O erro 488 Not Acceptable Here ocorre com frequência durante interconexões com operadoras convencionais que exigem G.711 estrito."
        }
      ],
      theory: `### 1. Sistemática de Resolução de Problemas SIP (SIP Troubleshooting)

No diagnóstico de redes de telefonia baseadas no protocolo SIP (RFC 3261), as respostas de status dividem-se em seis classes funcionais:
- **1xx (Provisional)**: A requisição foi recebida e está sendo processada (ex: 100 Trying, 180 Ringing, 183 Session Progress).
- **2xx (Success)**: A ação solicitada foi concluída com sucesso (ex: 200 OK).
- **3xx (Redirection)**: O usuário mudou de localização e nova ação é requerida (ex: 301 Moved Permanently).
- **4xx (Client Error)**: A requisição contém sintaxe incorreta ou não pode ser atendida pelo servidor (ex: 401, 403, 404, 486, 488).
- **5xx (Server Error)**: O servidor falhou ao processar uma requisição aparentemente válida (ex: 500 Server Internal Error, 503 Service Unavailable).
- **6xx (Global Failure)**: A requisição é impossível de ser completada em qualquer servidor do mundo (ex: 603 Decline, 604 Does Not Exist Anywhere).

---

### 2. Anatomia Detalhada dos Principais Códigos de Erro

#### A. 401 Unauthorized vs 403 Forbidden
- **401 Unauthorized**: É uma resposta de desafio (challenge) normal e esperada no início do handshake SIP. Sempre deve conter o cabeçalho \`WWW-Authenticate\` com o desafio Digest. Não indica problema, exceto se entrar em loop infinito (o terminal responde ao desafio e o servidor insiste em mandar 401 repetidamente, sinalizando credencial errada).
- **403 Forbidden**: O servidor compreendeu quem é o usuário, mas a política de segurança rejeita a ação. Causas frequentes no laboratório:
  1. A senha informada no MicroSIP difere da diretiva \`password\` no \`pjsip.conf\`.
  2. A restrição de endereço IP (\`permit\` / \`deny\`) barrou o terminal.
  3. O ramal pertence a um contexto que não tem rota para o número discado (ex: ramal básico tentando ligar para DDI).

#### B. 404 Not Found
Indica que o Request-URI solicitado não existe no servidor de destino. Causas frequentes:
1. Erro de sintaxe na expressão regular do dialplan (ex: \`_5521XXXX\` configurado, mas o usuário discou \`21XXXX\` sem o 55).
2. O usuário chamado não está registrado (a tabela de contatos da Location Table está vazia para aquele AOR - Address of Record).

#### C. 486 Busy Here
O terminal chamado respondeu ativamente indicando que não pode aceitar a chamada porque sua linha está ocupada. Se o terminal possuir mais de uma linha física ou chamada em espera (call waiting), o 486 só será emitido se todas as linhas estiverem preenchidas.

#### D. 488 Not Acceptable Here
Ocorre durante a fase de negociação do SDP (Session Description Protocol). O chamador envia sua oferta de codecs em \`m=audio\`, mas o receptor não possui nenhum codec em comum. Exemplo real:
- Terminal A oferece: \`m=audio 10000 RTP/AVP 18\` (G.729 exclusivamente).
- Servidor B possui ativado apenas: \`allow=opus,pcma\`.
- Como não há interseção, o servidor é obrigado a emitir \`SIP/2.0 488 Not Acceptable Here\`.

#### E. 503 Service Unavailable
O servidor de telefonia de destino ou gateway intermediário está temporariamente impossibilitado de atender à chamada. Motivos típicos:
1. O processo de software (\`asterisk\` ou \`yate\`) no nó remoto caiu ou está travado.
2. Esgotamento de portas RTP configuradas (faixa 10000-20000 esgotada).
3. Esgotamento de licenças ou canais simultâneos do tronco SIP.

---

### 3. Matriz de Tratamento Automatizado de Falhas no Dialplan

\`\`\`
   [Chamada Originada]
           |
       (Dial PJSIP)
           |
     [Falha Ocorrida?]
      /             \\
   (SIM)           (NÃO) ----> [Chamada Atendida (200 OK)]
     |
  [Verifica \${DIALSTATUS}]
     |
     +---> BUSY ---------> Playback(usuario-ocupado) -> Transbordo para Correio de Voz
     |
     +---> NOANSWER -----> Playback(nao-atende) -> Desvio para Celular
     |
     +---> CONGESTION ---> Playback(linhas-ocupadas) -> Tenta Tronco de Contingência
     |
     +---> CHANUNAVAIL --> Playback(temporariamente-indisponivel) -> Alerta NOC
\`\`\``,
      configCode: `; ==============================================================================
; ARQUIVO: /etc/asterisk/extensions.conf (Tratamento Robusto de Falhas)
; ==============================================================================

[contexto-com-failover]
exten => _5521XXXX,1,NoOp(--- TENTANDO ROTA PRIMARIA VIA NÓ DO RIO DE JANEIRO ---)
 same => n,Dial(PJSIP/\${EXTEN}@tronco-rio-primario,30,Tt)
 same => n,Goto(tratar-status-\${DIALSTATUS},1)

; Tratamento para Ramal Ocupado (SIP 486)
exten => tratar-status-BUSY,1,NoOp(--- ASSINANTE OCUPADO: ENCAMINHANDO PARA VOICEMAIL ---)
 same => n,Playback(beep)
 same => n,VoiceMail(\${EXTEN}@default,b)
 same => n,Hangup()

; Tratamento para Canal Indisponível ou Servidor Fora (SIP 503)
exten => tratar-status-CHANUNAVAIL,1,NoOp(--- ROTA PRIMARIA FALHOU: ACIONANDO FAILOVER VIA MIAMI ---)
 same => n,Dial(PJSIP/\${EXTEN}@tronco-failover-miami,30,Tt)
 same => n,Goto(tratar-status-contingencia-\${DIALSTATUS},1)

; Tratamento para Incompatibilidade de Codec (SIP 488)
exten => tratar-status-CONGESTION,1,NoOp(--- CONGESTIONAMENTO OU FALHA DE MIDIA ---)
 same => n,Playback(ss-noservice)
 same => n,Hangup()

exten => tratar-status-contingencia-CHANUNAVAIL,1,NoOp(--- AMBAS AS ROTAS FALHARAM: ENVIANDO 503 AO USUARIO ---)
 same => n,Playtones(congestion)
 same => n,Congestion(10)
 same => n,Hangup()`,
      traceDissection: `No.     Time           Source                Destination           Protocol Length Info
------------------------------------------------------------------------------------------------------------------------
    1   0.000000       192.168.10.50         192.168.10.10         SIP      820    Request: INVITE sip:55999999@192.168.10.10
    2   0.001400       192.168.10.10         192.168.10.50         SIP      340    Status: 100 Trying
    3   0.003100       192.168.10.10         192.168.10.50         SIP      512    Status: 404 Not Found (Extensão não localizada no dialplan)
    4   0.004200       192.168.10.50         192.168.10.10         SIP      390    Request: ACK sip:55999999@192.168.10.10

DETALHAMENTO DO PACOTE 3 (SIP 404 Not Found):
Session Initiation Protocol (SIP)
    Status-Line: SIP/2.0 404 Not Found
    Via: SIP/2.0/UDP 192.168.10.50:5060;rport=5060;received=192.168.10.50;branch=z9hG4bKPj918237
    From: <sip:1001@192.168.10.10>;tag=74129bc-4812
    To: <sip:55999999@192.168.10.10>;tag=as5918274a
    Call-ID: b1298471-82910293-192847192@192.168.10.50
    CSeq: 1 INVITE
    Server: Asterisk PBX 20.9.2
    Reason: Q.850;cause=1;text="Unallocated (unassigned) number"
    Content-Length: 0`,
      diagram: "brasil"
    },
    {
      id: "5.4",
      title: "5.4 Auditoria Forense em Tempo Real: Jitter, Perda de Pacotes, Orçamento de Atraso e Cálculo do MOS",
      duration: "50 min",
      tag: "Qualidade de Voz e QoS",
      slides: [
        {
          title: "A Engenharia de Qualidade de Experiência (QoE)",
          subtitle: "Métricas Objetivas vs Percepção Subjetiva do Ouvido Humano",
          bullets: [
            "Atraso Unidirecional (One-Way Delay): O tempo que uma amostra de áudio leva da boca do emissor ao ouvido do receptor.",
            "Jitter (Variação de Atraso de Pacotes): A dispersão estatística nos tempos de chegada dos pacotes RTP sucessivos.",
            "Perda de Pacotes (Packet Loss): A taxa percentual de pacotes descartados por saturação de buffers em roteadores.",
            "Mean Opinion Score (MOS): A escala padronizada de 1 (péssimo) a 5 (excelente) para quantificar a satisfação vocal."
          ],
          speakerNotes: "Não basta a chamada completar com sucesso: a voz precisa soar natural, contínua e inteligível. Essa é a essência do SLA de qualidade de uma operadora."
        },
        {
          title: "O Padrão ITU-T G.107 e o Modelo E (E-Model)",
          subtitle: "Cálculo Matemático do Fator de Transmissão R e Conversão para MOS",
          bullets: [
            "O Fator de Transmissão R: Fórmula matemática que subtrai do valor ideal (R0 = 93.2) as perdas por atraso e codecs.",
            "Fórmula Básica do E-Model: R = R0 - Is (degradação do sinal) - Id (degradação por atraso) - Ie-eff (degradação do codec/perda).",
            "Mapeamento Direto para Escala MOS: Para R entre 0 e 100, obtém-se o MOS variando entre 1.0 e 4.5.",
            "Classificação Carrier-Grade: MOS acima de 4.0 é considerado qualidade de pedágio (Toll Quality), meta do laboratório."
          ],
          speakerNotes: "O E-Model da ITU-T permite calcular computacionalmente a qualidade de uma chamada a partir dos dados do Wireshark sem precisar entrevistar ouvintes humanos."
        },
        {
          title: "O Papel Crítico do Jitter Buffer",
          subtitle: "Como os Terminais Compensam a Instabilidade da Rede IP",
          bullets: [
            "O Mecanismo de Fila: Armazena temporariamente os pacotes recebidos para reproduzi-los com espaçamento rigoroso e uniforme.",
            "Jitter Buffer Estático vs Adaptativo: O adaptativo ajusta dinamicamente a profundidade do buffer conforme o tráfego da rede oscila.",
            "O Trade-Off Inevitável: Buffers muito profundos eliminam o jitter, mas introduzem atraso vocal perceptível (efeito walkie-talkie).",
            "Ocultação de Perda de Pacotes (PLC - Packet Loss Concealment): O decodificador sintetiza áudio preditivo para preencher lacunas."
          ],
          speakerNotes: "Se o jitter for de 30 ms e o buffer estiver ajustado em 20 ms, 10 ms de áudio serão descartados, gerando estalos na conversação."
        },
        {
          title: "Telemetria de Mídia via Protocolo RTCP (RFC 3550)",
          subtitle: "Sender Reports (SR) e Receiver Reports (RR) para Monitoramento Ativo",
          bullets: [
            "O Canal Paralelo RTCP: Opera em porta UDP ímpar imediatamente acima da porta RTP (ex: RTP em 10002, RTCP em 10003).",
            "Relatórios de Recepção (Receiver Reports): Notificam a fonte sobre fração de perda acumulada, maior número de sequência e jitter interchegada.",
            "Amostragem em Tempo Real: Envio periódico a cada 5 segundos sem sobrecarregar a largura de banda.",
            "Integração com Dashboards de NOC: Exportação contínua de métricas RTCP para Prometheus, Grafana e sistemas de bilhetagem."
          ],
          speakerNotes: "O RTCP é a telemetria da camada de voz. Graças a ele, o NOC de uma operadora identifica a degradação de um enlace antes mesmo do assinante ligar reclamando."
        }
      ],
      theory: `### 1. Teoria da Qualidade de Serviço e Experiência em Telefonia IP

Na transmissão de voz sobre IP (VoIP), a informação analógica é continuamente amostrada, quantizada, encapsulada em pacotes IP e transmitida através de redes de comutação de pacotes. Diferente de aplicações de dados puras (como transferências HTTP ou e-mails, onde retransmissões TCP garantem integridade perfeita mesmo com atrasos), a conversação de voz humana em tempo real é extremamente sensível a três fatores físicos:

1. **Atraso de Propagação e Enfileiramento (Latency / Delay)**:
   - A recomendação **ITU-T G.114** estabelece que o atraso unidirecional (One-Way Delay) deve ser inferior a **150 ms** para a maioria dos serviços de telefonia de alta qualidade.
   - Entre 150 ms e 400 ms, a conversa torna-se difícil, gerando interrupções mútuas e sobreposições de fala.
   - Acima de 400 ms, a comunicação bidirecional natural é considerada inaceitável.

2. **Jitter de Rede (Variação de Atraso)**:
   - Ocorre devido a rotas distintas percorridas por pacotes sucessivos e variações no tempo de fila dos buffers dos roteadores.
   - O jitter interchegada ($J$) é calculado segundo o algoritmo da RFC 3550:
   $$D(i, j) = (R_j - R_i) - (S_j - S_i)$$
   $$J_i = J_{i-1} + \\frac{|D(i-1, i)| - J_{i-1}}{16}$$
   - Onde $S$ representa o carimbo de tempo RTP do transmissor e $R$ o carimbo de tempo de recepção local.

3. **Perda de Pacotes (Packet Loss)**:
   - Uma perda superior a 1% em codecs sem PLC gera cortes perceptíveis na fala.
   - Em codecs modernos como o **Opus**, o mecanismo nativo de In-Band FEC (Forward Error Correction) e PLC permite tolerar até 15% de perda contínua sem degradação severa da inteligibilidade.

---

### 2. O Modelo Matemático E-Model (ITU-T G.107) e o Cálculo do MOS

O Modelo E (E-Model) é um modelo de cálculo computacional objetivo que estima a qualidade vocal combinando todas as deficiências de transmissão em um único índice denominado **Fator de Classificação de Transmissão $R$**:

$$R = R_0 - I_s - I_d - I_{e,eff} + A$$

Onde:
- **$R_0$**: Relação sinal-ruído básica ideal (normalmente adotada como $93.2$).
- **$I_s$**: Degradações simultâneas ao sinal vocal (quantização PCM, ruído de fundo).
- **$I_d$**: Degradações causadas por atraso excessivo e desajustes de eco.
- **$I_{e,eff}$**: Fator de degradação efetivo do equipamento, ponderando o codec utilizado e a perda de pacotes:
  $$I_{e,eff} = I_e + (95 - I_e) \\times \\frac{P_{pl}}{P_{pl} + B_{pl}}$$
  onde $I_e$ é a degradação intrínseca do codec, $P_{pl}$ é a porcentagem de perda de pacotes e $B_{pl}$ é o fator de robustez do codec à perda de pacotes.
- **$A$**: Fator de vantagem ou expectativa do usuário (zero para redes fixas corporativas).

A conversão do índice $R$ para o valor **MOS (Mean Opinion Score)** obedece à equação padronizada da ITU-T:
- Para $R \\le 0$: $MOS = 1.0$
- Para $0 < R < 100$:
  $$MOS = 1 + 0.035 R + R(R - 60)(100 - R) \\times 7 \\times 10^{-6}$$
- Para $R \\ge 100$: $MOS = 4.5$

| Valor MOS | Classificação ITU-T | Experiência do Assinante |
|---|---|---|
| 4.3 a 4.5 | Excelente | Nível de operadora premium (Toll Quality), som límpido e cristalino. |
| 4.0 a 4.3 | Bom | Comunicação perfeitamente clara, esforço de audição nulo. |
| 3.6 a 4.0 | Aceitável | Pequeno atraso ou ruído percebido, mas conversação perfeitamente inteligível. |
| 3.0 a 3.6 | Regular | Ruído ou falhas ocasionais exigem repetição ocasional de palavras. |
| 1.0 a 3.0 | Ruim / Inaceitável | Cortes contínuos, atraso insuportável, chamada impraticável. |

---

### 3. Análise Forense com o Wireshark (Ferramenta RTP Player e Stream Analysis)

No laboratório, a auditoria é executada capturando-se as interfaces de rede dos nós e utilizando o menu:
\`Telephony -> RTP -> RTP Streams -> Analyse\`

Métricas inspecionadas linha a linha no dump:
1. **Delta máximo e médio**: O espaçamento temporal entre pacotes RTP sucessivos. Para pacotes com tempo de empacotamento (\`ptime\`) de 20 ms, o delta esperado é exatamente 20,000 ms.
2. **Skews de relógio**: Desvios graduais entre o oscilador de cristal do terminal emissor e do receptor.
3. **Seq Errors e Marker Bits**: Verificação de pacotes que chegaram fora de ordem ou foram totalmente descartados pela infraestrutura de rede.`,
      configCode: `; ==============================================================================
; ARQUIVO: /etc/asterisk/rtp.conf (Calibração Carrier-Grade de Mídia e RTCP)
; ==============================================================================

[general]
; Faixa de portas UDP dedicadas exclusivamente aos canais de mídia RTP
rtpstart=10000
rtpend=20000

; Ativação rigorosa do RTCP para monitoramento contínuo de QoS
rtcpinterval=5000

; Proteção contra pacotes que chegam fora de ordem
rtpchecksums=yes

; Resolução de travessia simétrica de NAT (Symmetric RTP RFC 3581 / RFC 4961)
strictrtp=yes
probation=4

; ==============================================================================
; TRECHO DO PJSIP.CONF: Configuração do Jitter Buffer no Endpoint
; ==============================================================================
[1001]
type=endpoint
context=interconexao-global
disallow=all
allow=opus,pcma
direct_media=no
rtp_symmetric=yes
force_rport=yes
rewrite_contact=yes

; Parâmetros de Jitter Buffer no canal
jitterbuffer=yes
; jb_max_size=200      ; Tamanho máximo do buffer em milissegundos
; jb_impl=adaptive     ; Implementação adaptativa que acompanha oscilações da rede
; jb_target_extra=40   ; Margem adicional de segurança para absorver picos de jitter`,
      traceDissection: `No.     Time           Source                Destination           Protocol Length Info
------------------------------------------------------------------------------------------------------------------------
    1   0.000000       192.168.10.50         192.168.10.10         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x74A1B2C3, Seq=101, Time=96000
    2   0.020015       192.168.10.50         192.168.10.10         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x74A1B2C3, Seq=102, Time=96960
    3   0.040010       192.168.10.50         192.168.10.10         RTP      120    PT=DynamicRTP-Type-107 (Opus), SSRC=0x74A1B2C3, Seq=103, Time=97920
   50   1.000210       192.168.10.10         192.168.10.50         RTCP     112    Receiver Report (RR) | Fraction lost: 0, Jitter: 12 (0.25 ms)

DISSECAÇÃO DO PACOTE 50 (RTCP Receiver Report):
Real-time Transport Control Protocol (RTCP)
    [Stream setup by: SIP/2.0 200 OK]
    10.. .... = Version: RFC 1889 Version (2)
    ..0. .... = Padding: False
    ...0 0001 = Reception report count: 1
    Packet type: Receiver Report (201)
    Length: 7 (32 bytes)
    Sender SSRC: 0x19283746
    Report Block 1:
        Identifier: 0x74A1B2C3
        Fraction lost: 0 / 256 (0.0% de pacotes perdidos)
        Cumulative number of packets lost: 0
        Extended highest sequence number received: 150
        Interarrival jitter: 12 timestamp units (0.25 ms)
        Last SR timestamp (LSR): 0x0
        Delay since last SR (DLSR): 0

CÁLCULO CONSOLIDADO DO MODELO E (E-MODEL) PARA ESTE FLUXO:
- Fator R Calculado: 92.4
- Classificação MOS: 4.41 (Excelente / Toll Quality)
- Status de Auditoria do Laboratório: HOMOLOGADO CONFORME RESOLUÇÃO ANATEL 777/2025`,
      diagram: "global"
    }
  ]
};
