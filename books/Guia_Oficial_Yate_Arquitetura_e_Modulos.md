# GUIA OFICIAL DE ARQUITETURA E MÓDULOS DO YATE
## Compilação de Referência Técnica (docs.yate.ro & ExtModule Protocol)

### 1. O que é o Yate?
O **Yate (Yet Another Telephony Engine)** é um software de telecomunicações escrito em C++ de altíssimo desempenho, mantido pela empresa SS7ware e comunidade open-source.

Diferente do Asterisk (focado em PABX TDM/SIP tradicional), o Yate foi projetado com uma abstração agnóstica a protocolos. O núcleo (*Core*) não sabe o que é uma chamada SIP, um circuito E1 ou um canal de voz: ele processa **mensagens assíncronas nomeadas** com parâmetros `chave=valor`.

---

### 2. O Ecossistema de Software Yate
1. **Yate Core (Open Source - GPL):**
   - Motor central, comutação SIP, H.323, Jabber, RTP, roteamento por regex e JavaScript.
   - Repositório clonado no seu PC: `mvno-telecom-lab/yate-software/yate-source`
2. **YateBTS (Open Source - AGPLv3 + GPL):**
   - Software-Defined Mobile Network para GSM (2G) e GPRS.
   - Divide-se em:
     - `MBTS`: Camada física e de rádio (derivada do OpenBTS) para transceptores SDR.
     - `ybts` (Módulo do Yate): Camada de controle, gerenciamento de mobilidade e SMS.
3. **YateUCN (Unified Core Network - Comercial / Carrier):**
   - Núcleo unificado de rede para operadoras e MVNOs (suporta GSM, UMTS, LTE, IMS, HSS, MSC, SGSN e GGSN em uma única máquina).
4. **YateHSS/HLR:**
   - Base de dados centralizada de assinantes com autenticação criptográfica (Milenage/COMP128) e suporte a Diameter e SS7/MAP.

---

### 3. Protocolo ExtModule (Integração com Node.js / Python)
O módulo `extmodule` do Yate permite que scripts externos controlem o fluxo de chamadas e a sinalização através de uma conexão de socket TCP (porta `5039`) ou via `stdin/stdout`.

#### Gramática das Mensagens:
- **Para registrar interesse em um evento:**
  `%%>watch:<nome_do_evento>` (Ex: `%%>watch:call.route`)
- **Para instalar um manipulador de decisão (com prioridade):**
  `%%>install:<prioridade>:<nome_do_evento>` (Ex: `%%>install:50:call.route`)
- **Mensagem recebida do Yate:**
  `%%<message:<id>:<processed>:[<name>]:[<retval>]:[param1=val1]:[param2=val2]...`
- **Resposta do seu script para o Yate:**
  `%%>message:<id>:<processed>:[<name>]:[<retval>]:[param1=val1]...`

#### Exemplo Prático em `call.route`:
1. Um usuário disca um número.
2. O Yate despacha a mensagem:
   `%%<message:1234:false:call.route::caller=2001:called=0800123456:billid=1729...`
3. O controlador Node.js intercepta e devolve a rota resolvida:
   `%%>message:1234:true::sip/sip:0800123456@gw-pstn.operadora.com:handled=true`
4. O Yate imediatamente conecta a chamada para a rota informada pelo Node.js.

---

### 4. Manuais e Livros Recomendados para o Yate

1. **Livro de Referência em Português:**
   - *Redes de Telefonia Aberta e Convergente* (Prof. Angelo Delphini, 2026) — Capítulos 6 e 7.
2. **Wiki Oficial do Projeto:**
   - `http://docs.yate.ro/` — Portal com o índice completo de classes C++, módulos e tutoriais para iniciantes.
3. **Página Oficial do YateBTS:**
   - `https://yatebts.com/` — Manuais de configuração de BTS, calibração de rádio e suporte a transceptores bladeRF.
4. **Documentação Interna do Código-Fonte:**
   - Localizada em: `mvno-telecom-lab/yate-software/yate-source/docs/extmodule.html`
