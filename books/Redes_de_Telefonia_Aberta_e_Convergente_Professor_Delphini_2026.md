# REDES DE TELEFONIA ABERTA E CONVERGENTE
## OpenBTS, YATE, malhas resilientes, segurança SIP e operadoras móveis virtuais no marco regulatório brasileiro
**Autor:** Angelo de Barros Delphini ("Professor Delphini")  
**Publicação:** Open Source Telephony Systems (OSTS), Mairinque - SP, 2026 (Licença CC BY-NC-SA 4.0)

---

## 📌 Sumário Executivo da Obra

Este livro é o guia definitivo em língua portuguesa para engenharia de telecomunicações aberta no Brasil. Ele une, em 165 páginas e 25 capítulos, o que a literatura mundial trata de forma fragmentada: **telefonia VoIP/SIP**, **redes celulares abertas (OpenBTS/Yate/Open5GS)**, **segurança defensiva**, **redes mesh resilientes** e a **regulação da Anatel para operadoras móveis virtuais (MVNO)**.

---

## 📖 Estrutura Detalhada por Partes

### PARTE I – FUNDAMENTOS, MÉTODO E MARCO LEGAL (Cap. 1 a 3)
- **A Virada NGN:** A transição da comutação de circuitos para comutação de pacotes e a descida da telefonia celular para software de uso geral via SDR.
- **Princípio da Legalidade Absoluta:** O art. 183 da Lei 9.472/1997 (LGT) tipifica como crime desenvolver clandestinamente telecomunicações (pena de 2 a 4 anos de detenção). A intenção acadêmica não anula o crime se houver transmissão no ar sem outorga.
- **Os 3 Desenhos Experimentais:**
  1. *Desenho A (Bancada Cabeada Confinada):* Transceptor ligado ao telefone por cabo coaxial com atenuadores calibrados (ex: 60 dB) e sem antenas conectadas. **Risco jurídico nulo.** (Padrão recomendado).
  2. *Desenho B (Blindado):* Gaiola de Faraday com atenuação documentada.
  3. *Desenho C (Autorizado):* Autorização formal de uso temporário para fins científicos (Res. Anatel 775/2025).
- **Distinção Crucial: Serviço de Telecomunicações vs. SVA:** PABX interno e ramais sobre rede IP privada = Serviço de Valor Adicionado / Uso Próprio. Oferta de terminação/numeração pública a terceiros = Serviço de Telecomunicações sujeito a outorga.

### PARTE II – COMUTAÇÃO CONVERGENTE: NGN, SIP E O MOTOR YATE (Cap. 4 a 7)
- **Arquitetura NGN & QoS:** Orçamento de atraso (<150 ms para voz aceitável), jitter (<20 ms) e descarte de pacotes (<1%).
- **Protocolo SIP a Fundo:** Separação entre sinalização (SIP) e mídia (RTP). Transação vs. Diálogo vs. Sessão (SDP). Soluções de travessia de NAT e áudio unilateral.
- **Arquitetura Interna do Yate:**
  - O Yate não é centrado em canais como o Asterisk; é um **motor assíncrono de despacho de mensagens nomeadas** com prioridade (`call.route`, `call.execute`, `user.auth`).
  - **ExtModule:** Permite acoplar scripts externos (Node.js, Python) via TCP socket local (`127.0.0.1:5039`) para controlar roteamento e lógica de negócio em milissegundos.
  - Segurança essencial: O `extmodule` e consoles de gerenciamento (`telnet 5038`) devem **sempre** escutar em `127.0.0.1`, jamais em `0.0.0.0`.
- **Roteiro de Bancada de PABX Privado:** Compilação do código C++, configuração de ramais com senhas de alta entropia, conferência e plano de discagem com negação explícita.

### PARTE III – RADIOACESSO CELULAR ABERTO (Cap. 8 a 13)
- **GSM/GPRS:** Estrutura temporal TDMA (quadro de 4,615 ms, 8 timeslots), canais lógicos (BCCH, RACH, SDCCH, TCH), identidades (IMSI vs IMEI vs MSISDN).
- **A Falha Estrutural do 2G:** O terminal prova quem é para a rede, mas a rede GSM não prova nada para o terminal (ausência de autenticação mútua). Cifragem A5 frágil.
- **OpenBTS:** Colapsa BSC, MSC e SS7 em um processo C++ que fala diretamente SIP.
- **YateBTS:** Separação entre **MBTS** (camada física/rádio derivada do OpenBTS com licença AGPLv3) e **Yate** (camada de controle e sinalização celular com módulos `ybts`, SS7/SIGTRAN, MAP e Diameter).
- **SDR Hardware Reality Check:** Alerta sobre transceptores: o YateBTS recente concentrou suporte na família bladeRF, enquanto USRP e LimeSDR têm suporte variável em derivações comunitárias.
- **Osmocom, srsRAN e Open5GS:**
  - *Osmocom:* Fidelidade total à arquitetura modular 2G/3G com BSC/MSC reais.
  - *srsRAN & Open5GS:* Pilhas de 4G LTE e 5G Standalone onde o controle de voz migra definitivamente para IMS/SIP (VoLTE / VoNR).
- **Cartões SIM e Raiz de Confiança:** Funcionamento do smartcard, chave secreta Ki que nunca sai do chip, algoritmos COMP128 (obsoleto) vs. Milenage (3G/4G/5G).

### PARTE IV – SEGURANÇA DE REDES DE TELEFONIA (Cap. 14 a 16)
- **Economia do Ataque SIP:** Centrais invadidas convertem-se em dinheiro instantâneo através de chamadas fraudulentas para destinos internacionais e números de alta tarifação (*Toll Fraud*).
- **Programa Defensivo em 6 Camadas:**
  - Negação explícita no plano de discagem (`.*=-;error=noroute`).
  - Limites de crédito/minutagem com o provedor de trânsito (o controle que evita a catástrofe).
  - Isolamento estrito de portas de controle.
  - Cifragem simultânea de sinalização (SIP over TLS) e mídia (SRTP).
- **Estação Base Ilegítima (IMSI-Catcher):** Mecânica de downgrade forçado para 2G e mitigação por política de dispositivo (desabilitar 2G nos aparelhos modernos).
- **Governança & LGPD:** Identificadores IMSI, IMEI e registros CDR são dados pessoais sensíveis; gravação de chamadas exige base legal e informação clara prévia.

### PARTE V – REDES EM MALHA E RESILIÊNCIA (Cap. 17 a 19)
- **Malhas de Baixa Potência (Meshtastic, MeshCore, Reticulum):**
  - Uso de LoRa e modulação por espalhamento espectral (Chirp Spread Spectrum).
  - Operação com aparelhos autônomos com tela e-ink e teclado, sem dependência de celular.
  - Enquadramento na Anatel: Regulamento de Radiação Restrita (dispensa outorga, mas exige homologação e respeito a frequências/potências).
- **Arquitetura Integrada em 4 Camadas:**
  1. *Camada 1:* Malha LoRa de mensagens (autonomia de dias/semanas, última a falhar).
  2. *Camada 2:* Wi-Fi mesh local (entorno de postos de saúde, escolas).
  3. *Camada 3:* Núcleo de serviços locais (Yate + mensagens offline).
  4. *Camada 4:* Enlace externo (internet/satélite comercial).

### PARTE VI – OPERADORAS MÓVEIS VIRTUAIS NO BRASIL (Cap. 20 a 23)
- **O Marco Regulatório Vigente (Resolução Anatel nº 777/2025):**
  - **Atenção:** A antiga Resolução 550/2010 foi **expressamente revogada** pela Resolução nº 777 de 28 de abril de 2025 (Capítulo XII).
- **Comparação Jurídica das Duas Formas de Exploração:**
  - **Credenciado (Light MVNO):** Atua por *Contrato de Representação* homologado na Anatel. Representa a operadora de origem. Não tem outorga própria de SMP. Utiliza numeração da origem. Ideal para ISPs e marcas comerciais iniciais.
  - **Autorizada (Full MVNO):** Possui *Outorga própria de SMP*. Atua por *Contrato de Compartilhamento de Rede*. Possui bloco próprio de numeração (E.164), IMSI/MNC próprio e opera seu próprio Core Network (HSS, PGW, PCRF, SMSC).
- **Graus de Integração Técnica:**
  - *Revendedor:* Apenas canal de vendas/marca.
  - *Virtual Leve:* Marca + precificação + canais de atendimento.
  - *Virtual Intermediário:* + OCS em tempo real e SMSC próprio.
  - *Virtual Completo:* + HSS/HLR próprio, PGW/UPF próprio, subsistema IMS.
- **Relação com Softwares Livres:** O ecossistema YateUCN e Open5GS fornece exatamente os elementos que uma Full MVNO precisa operar.
- **Obrigações Regulatórias Inegociáveis:** Interceptação legal (ordem judicial), preservação de logs e proteção de dados.

### PARTE VII & APÊNDICES – PROJETO INTEGRADOR E BANCADA PRÁTICA (Cap. 24 e 25)
- **Projeto Vila Esperança:** Exercício didático de enquadramento de uma rede isolada. Mostra por que erguer torre celular sem outorga é ilegal e como a combinação de malha e VoIP privado atende à comunidade dentro da lei.
- **Apêndice A:** Roteiro prático de bancada passo a passo (comandos `ss -tulpn`, `ip route`, verificação de portas e chamadas).
- **Apêndice B:** Checklist de conformidade jurídica para laboratórios.
- **Apêndice C:** Matriz curricular para formação de engenheiros em telecomunicações abertas (180 horas).
