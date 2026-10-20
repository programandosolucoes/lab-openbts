# 🚀 Laboratório de Telecomunicações & MVNO (OpenBTS, Yate, 5G Core & SDR)

Este repositório contém a biblioteca de livros técnicos, documentação de arquitetura e um laboratório completo conteinerizado (Docker Compose) para aprendizado e prototipação de **MVNO (Mobile Virtual Network Operator)**, **SDR (Software Defined Radio)**, **OpenBTS/Yate** e **Core 4G/5G**.

---

## 📚 1. Biblioteca de Livros e Referências Baixadas

Os arquivos estão localizados no diretório [`./books`](file:///C:/Users/carlo/.gemini/antigravity/scratch/mvno-telecom-lab/books):

1. **Getting Started with OpenBTS (Range Networks / O'Reilly)**
   - *Arquivo:* `Getting_Started_with_OpenBTS_Range_Networks.pdf` (8.26 MB)
   - *Conteúdo:* Arquitetura da Estação Rádio Base (BTS) definida por software, transceptores SDR, interface com o Asterisk via SIP, controle de assinantes e mobilidade GSM.
2. **OpenBTS Application Suite User Manual**
   - *Arquivo:* `OpenBTS_Application_Suite_User_Manual.pdf` (0.93 MB)
   - *Conteúdo:* Guia operacional do OpenBTS, SIPAuthServe, Smqueue (SMS) e ferramentas CLI.
3. **OpenBTS for Dummies**
   - *Arquivo:* `OpenBTS_for_Dummies.pdf` (1.31 MB)
   - *Conteúdo:* Passo a passo didático de configuração e primeiros testes de bancada.
4. **Understanding LTE and its Performance (Yahiya)**
   - *Arquivo:* `Understanding_LTE_and_its_Performance.pdf` (4.04 MB)
   - *Conteúdo:* Fundamentos de redes celulares 4G LTE, OFDMA, canais físicos, E-UTRAN e EPC.
5. **PySDR: A Guide to SDR and DSP using Python**
   - *Arquivo:* `PySDR_guide.html`
   - *Conteúdo:* Teoria prática de DSP, amostragem I/Q, constelações de modulação e controle de rádios via software.

---

## 🎙️ 2. Síntese Técnica da Discussão (Yate, IvozProvider e SDR)

### Yate vs Asterisk no Cenário Celular / MVNO
- **Asterisk:** Projetado historicamente para telefonia corporativa (PABX TDM/SIP). Excelente como servidor de aplicação de voz (IVR/URA, Voicemail, bilhetagem).
- **Yate (Yet Another Telephony Engine):** Arquitetura C++ orientada a eventos e mensagens assíncronas agnósticas de protocolo. É o padrão da indústria para **YateBTS** (2G/3G via SDR) e **YateUCN** (Unified Core Network com suporte a GSM, UMTS, LTE, SS7 e SIGTRAN).
- **Yate + Node.js (ExtModule):** O Yate expõe uma interface de socket (`extmodule`) orientada a texto. Um controlador em Node.js pode interceptar o evento `call.route` em milissegundos para implementar regras corporativas avançadas de PABX e roteamento MVNO.

### IvozProvider (Irontec)
- Plataforma multitenant voltada a operadoras e provedores de voz.
- Combina a robustez de proxy/roteamento SIP do **Kamailio** com as funcionalidades de mídia e PBX do **Asterisk**, oferecendo um portal web para gerenciar centenas de clientes corporativos com isolamento total.

### Hardware SDR Citados e Comparativo:
- **USRP B200mini-i / B210 (Ettus Research):** Padrão de excelência acadêmico e industrial (chipset AD9361/AD9364, 70 MHz a 6 GHz, suporte nativo OpenBTS, YateBTS, Open5GS, srsRAN).
- **bladeRF 2.0 micro (Nuand):** Excelente custo-benefício, 47 MHz a 6 GHz, 56 MHz de largura de banda, 2x2 MIMO.
- **LimeNET Micro / LimeSDR:** Plataforma integrada com processador embarcado para BTS autônomas.
- **USRP X310:** Equipamento de alta performance para redes de alta densidade (banda de 160 MHz, conexões 10GbE).

---

## 🐳 3. Laboratório Conteinerizado (`docker-lab`)

O laboratório permite estudar o ciclo de vida completo de uma rede móvel sem precisar de rádio físico logo no primeiro dia, usando simulação de protocolo:

```
[ UERANSIM ]  <-- (NGAP / SCTP) --> [ Open5GS 5G Core ] <--> [ MongoDB (SIM Cards) ]
(gNodeB + UE)                             │                           ▲
                                    (GTP-U Data / Tun)                │
                                          │                     [ Open5GS WebUI ]
                                          ▼                      (Porta 9999)
                                    [ Internet ]
                                          
[ Yate Core ] <==== (TCP 5039) ====> [ Yate Node.js Controller ]
 (SIP / PSTN)                        (Lógica de Roteamento PABX)
```

### Como Executar o Laboratório:

1. Inicie o Docker Desktop no seu Windows.
2. Abra um terminal no diretório do laboratório:
   ```powershell
   cd C:\Users\carlo\.gemini\antigravity\scratch\mvno-telecom-lab\docker-lab
   docker compose up -d
   ```
3. Acesse os serviços disponíveis:
   - **Open5GS WebUI (Cadastro de SIM Cards e Planos):** `http://localhost:9999`
     - Usuário padrão: `admin` | Senha padrão: `1423`
   - **Yate ExtModule Controller (Node.js):** Conecta automaticamente na porta `5039` do Yate Core e processa as chamadas via eventos.
   - **Asterisk PABX:** SIP escutando na porta `5080`.
   - **UERANSIM:** Conecta na porta SCTP `38412` do Open5GS simulando uma antena 5G e celulares registrando tráfego.

---

## 📈 4. Roteiro de Estudos Sugerido

1. **Semana 1:** Leitura dos Capítulos 1 a 4 do `Getting_Started_with_OpenBTS_Range_Networks.pdf` para dominar os conceitos de BTS, ARFCN, IMSI, IMEI e enlace de rádio.
2. **Semana 2:** Explorar a WebUI do Open5GS no laboratório (`http://localhost:9999`), cadastrar um perfil de assinante (IMSI, Ki, OPc) e analisar os logs de autenticação.
3. **Semana 3:** Estudo do script [`yate_controller.js`](file:///C:/Users/carlo/.gemini/antigravity/scratch/mvno-telecom-lab/docker-lab/yate-node/yate_controller.js) e entendimento de como o Node.js programa rotas para clientes B2B.
4. **Semana 4:** Estudo do `Understanding_LTE_and_its_Performance.pdf` para entender os requisitos da Anatel e operadoras parceiras (MNOs/MVNAs como Surf Telecom e Arqia).
