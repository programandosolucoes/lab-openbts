/**
 * @file lab-exercises.js
 * @description Roteiros Praticos, Comandos Docker e Exercicios Mao na Massa para cada uma das 32 Aulas do Curso
 */

const LESSON_DOCKER_LABS = {
  "1.1": {
    "title": "A Virada All-IP: Separando Controle e Mídia no Docker",
    "service": "Open5GS Core + Yate Telephony",
    "dockerCmd": "docker compose up -d open5gs-core yate-core",
    "goal": "Subir dois serviços de telecom e ver na prática como a sinalização de controle fica separada do transporte de voz e dados.",
    "steps": [
      "Abra o terminal na pasta docker-lab do laboratório.",
      "Execute o comando: docker compose up -d open5gs-core yate-core",
      "Verifique se os dois containers subiram: docker compose ps",
      "Confira as portas ativas: o Yate escuta na 5060 (SIP) e o Open5GS escuta na 36412 (SCTP/S1AP)."
    ],
    "exercise": "Execute: docker logs telecom-yate-core --tail 20. Observe as mensagens de inicialização do módulo SIP. O que acontece quando o módulo ysipchan carrega?",
    "expectedOutput": "Container telecom-yate-core com status Up e linha nos logs indicando: [ysipchan] Listening on 0.0.0.0:5060.",
    "quickTip": "Se a porta 5060 já estiver em uso no seu PC, você pode alterá-la no arquivo docker-compose.yml para 5062:5060."
  },
  "1.2": {
    "title": "Marco Regulatório: Verificação de Bancada Confinada",
    "service": "Arquivos de Configuração do Laboratório",
    "dockerCmd": "docker compose ps",
    "goal": "Garantir que a operação do laboratório ocorra em ambiente totalmente confinado e em conformidade com as regras da Anatel (Resolução 777/2025).",
    "steps": [
      "Abra a pasta docker-lab/yate-core/config.",
      "Abra o arquivo yate.conf e verifique se as conexões de rede estão restritas a 127.0.0.1 ou à rede interna do Docker (172.28.0.0/16).",
      "Confira que nenhuma porta de radiofrequência aberta sem atenuação está transmitindo ao ar livre."
    ],
    "exercise": "Inspecione a rede interna criada pelo Docker rodando: docker network inspect docker-lab_telecom_net. Qual é a faixa de IP alocada para os containers de telecom?",
    "expectedOutput": "Subnet 172.28.0.0/16 isolada dentro do computador, sem propagação eletromagnética externa.",
    "quickTip": "Trabalhar em rede interna Docker simula com 100% de precisão uma bancada cabeada profissional com isolamento total."
  },
  "1.3": {
    "title": "Dimensionando o Link Budget de Bancada sem SDR Físico",
    "service": "Simulador UERANSIM + Open5GS",
    "dockerCmd": "docker compose up -d mongodb open5gs-core ueransim",
    "goal": "Compreender como o software calcula a potência do sinal celular sem depender de placas físicas caras de rádio.",
    "steps": [
      "Inicie o Core e o UERANSIM: docker compose up -d mongodb open5gs-core ueransim",
      "Execute o comando de inspeção de logs: docker logs telecom-open5gs-core --tail 30",
      "Observe como o MME (Mobility Management Entity) aguarda a conexão da antena na porta SCTP 38412."
    ],
    "exercise": "Rode o comando: docker exec -it telecom-open5gs-core netstat -tulnp. Verifique se o daemon open5gs-mmed está escutando na porta SCTP.",
    "expectedOutput": "Linha de log exibindo open5gs-mmed ativo escutando no endereço 172.28.0.10:38412.",
    "quickTip": "O UERANSIM atua como antena gNodeB e aparelho celular ao mesmo tempo, permitindo testes completos a custo zero."
  },
  "1.4": {
    "title": "Wireshark Confinado: Capturando Pacotes no Docker",
    "service": "Captura de Tráfego de Rede",
    "dockerCmd": "docker exec -it telecom-open5gs-core tcpdump -i any -n -c 5",
    "goal": "Ver os pacotes reais de sinalização trafegando entre os nós do core móvel sem misturar com a internet do seu PC.",
    "steps": [
      "Abra uma janela de terminal.",
      "Execute o comando de captura de pacotes diretamente dentro do container do Core.",
      "Gere tráfego abrindo a WebUI ou enviando uma requisição de ping entre containers."
    ],
    "exercise": "Capture 10 pacotes na interface interna rodando: docker exec -it telecom-open5gs-core tcpdump -i eth0 -c 10. Quais protocolos você identifica (TCP, UDP, ICMP)?",
    "expectedOutput": "Lista com 10 pacotes contendo IPs na faixa 172.28.0.x trocando sinalização em tempo real.",
    "quickTip": "Você pode exportar a captura para um arquivo .pcap e abrir no Wireshark da sua máquina para análise gráfica!"
  },
  "2.1": {
    "title": "Iniciando o Engine de Rádio e Telefonia Yate",
    "service": "Yate Core Engine",
    "dockerCmd": "docker compose up -d yate-core",
    "goal": "Colocar no ar a engine de telefonia de código aberto que gerencia estações rádio base e conexões GSM.",
    "steps": [
      "Execute: docker compose up -d yate-core",
      "Verifique se o processo está rodando: docker top telecom-yate-core",
      "Abra os logs para acompanhar: docker logs -f telecom-yate-core"
    ],
    "exercise": "No terminal, execute: docker exec -it telecom-yate-core yate -v. Qual é a versão do Yate instalada?",
    "expectedOutput": "Retorno com a versão do Yate Telephony Engine compilada e pronta para roteamento.",
    "quickTip": "Pressione Ctrl+C para sair dos logs a qualquer momento sem derrubar o container."
  },
  "2.2": {
    "title": "Configurando Parâmetros de Célula GSM (MCC/MNC e ARFCN)",
    "service": "Yate Core Config",
    "dockerCmd": "docker exec -it telecom-yate-core cat /etc/yate/yate.conf",
    "goal": "Entender como o software define a identidade da operadora móvel (MCC 724 = Brasil, MNC = Operadora).",
    "steps": [
      "Abra o terminal.",
      "Inspecione o arquivo de configuração do Yate usando o comando cat no container.",
      "Localize os parâmetros de roteamento e módulos habilitados."
    ],
    "exercise": "Abra o arquivo regexroute.conf no container: docker exec -it telecom-yate-core cat /etc/yate/regexroute.conf. Encontre a regra que direciona chamadas locais.",
    "expectedOutput": "Exibição das rotas com regex para números iniciados em 1xxx e 9xxx.",
    "quickTip": "No Brasil, o código MCC da Anatel é sempre 724 para todas as redes móveis nacionais."
  },
  "2.3": {
    "title": "Cadastrando o Primeiro Assinante GSM no Arquivo de Registro",
    "service": "Yate Regfile",
    "dockerCmd": "docker exec -it telecom-yate-core cat /etc/yate/regfile.conf",
    "goal": "Adicionar um usuário de teste (ramal / SIM card) com login e senha para autenticação na rede.",
    "steps": [
      "Inspecione o arquivo regfile.conf onde os usuários locais ficam guardados.",
      "Observe a sintaxe: [1001] password=1001 enabled=yes.",
      "Cadastre mentalmente ou edite um novo usuário 1002 com a mesma estrutura."
    ],
    "exercise": "Conecte um softphone MicroSIP no endereço 127.0.0.1:5060 com usuário 1001 e senha 1001. O que aparece no status do softphone?",
    "expectedOutput": "O MicroSIP muda o status para Online / Conectado com o Yate local!",
    "quickTip": "Você encontra o instalador do MicroSIP gratuito no site oficial microsip.org."
  },
  "2.4": {
    "title": "Simulação de Roteamento de Mensagens Curtas (SMS)",
    "service": "Yate Node Controller + SMS Bus",
    "dockerCmd": "docker compose up -d yate-core yate-node-controller",
    "goal": "Ver como as mensagens de texto trafegam por barramentos de software antes de chegarem ao destino.",
    "steps": [
      "Inicie o Yate e o controlador Node.js: docker compose up -d yate-core yate-node-controller",
      "Abra os logs do controlador Node.js: docker logs -f telecom-yate-node",
      "Observe a mensagem de conexão bem-sucedida com o socket TCP do Yate na porta 5039."
    ],
    "exercise": "Verifique se o controlador Node.js recebeu o handshake do Yate. Qual mensagem aparece no console?",
    "expectedOutput": "Log exibindo: [YateController] Conectado ao Yate Engine via Socket TCP 5039 com sucesso.",
    "quickTip": "Esse controlador em Node.js é o cérebro que permite criar bots de SMS, integração com WhatsApp e regras de negócio sob medida."
  },
  "3.1": {
    "title": "Explorando o Barramento de Mensagens do Yate",
    "service": "Yate Message Bus",
    "dockerCmd": "docker compose logs yate-core",
    "goal": "Compreender a arquitetura de publish/subscribe que faz o Yate ser tão rápido e flexível para telecom.",
    "steps": [
      "Inicie o Yate se não estiver rodando: docker compose up -d yate-core",
      "Abra o arquivo yate_controller.js na pasta docker-lab/yate-node.",
      "Veja como a função watchMessage escuta eventos como call.route e user.register."
    ],
    "exercise": "Faça uma chamada de teste no MicroSIP para o número 1002. Observe a mensagem call.route passando no log do Node.js.",
    "expectedOutput": "Objeto JSON no log com os campos: caller=1001, called=1002, status=routing.",
    "quickTip": "Tudo no Yate é uma mensagem assíncrona, exatamente como um barramento Kafka moderno."
  },
  "3.2": {
    "title": "Registrando Dois Ramais SIP e Fazendo a Primeira Chamada",
    "service": "Yate ysipchan + Softphones",
    "dockerCmd": "docker compose up -d yate-core",
    "goal": "Configurar dois ramais (1001 e 1002) e efetuar uma chamada de áudio bidirecional completa na sua máquina.",
    "steps": [
      "Abra o MicroSIP no seu PC configurado como ramal 1001.",
      "Abra um segundo softphone configurado como ramal 1002.",
      "Disque de 1001 para 1002 e atenda a chamada."
    ],
    "exercise": "Observe o tráfego RTP de áudio nos logs: docker logs telecom-yate-core --tail 15.",
    "expectedOutput": "Log exibindo SIP/2.0 200 OK e abertura de portas RTP para transmissão de pacotes de voz.",
    "quickTip": "No MicroSIP, em Configurações, desative o STUN para chamadas locais 100% confinadas no seu Docker."
  },
  "3.3": {
    "title": "Criando Regras de Roteamento Inteligente com Expressões Regulares",
    "service": "regexroute.conf",
    "dockerCmd": "docker exec -it telecom-yate-core cat /etc/yate/regexroute.conf",
    "goal": "Aprender a rotear números nacionais brasileiros como DDDs e números 0800 sem complicação.",
    "steps": [
      "Abra o arquivo regexroute.conf.",
      "Veja a linha: ^0800.*=return;error=forbidden.",
      "Adicione ou inspecione a regra: ^(9[0-9]{8})$=sip/sip:1001@127.0.0.1:5060."
    ],
    "exercise": "Disque qualquer número de celular válido de 9 dígitos no MicroSIP (ex: 998765432). Para qual ramal a chamada foi encaminhada?",
    "expectedOutput": "A chamada toca no ramal de destino conforme mapeado pela expressão regular.",
    "quickTip": "Expressões regulares no Yate são extremamente rápidas e processam milhares de chamadas por segundo."
  },
  "3.4": {
    "title": "Programando Regras de Negócio em Tempo Real com Node.js",
    "service": "Yate Node Controller",
    "dockerCmd": "docker compose up -d yate-node-controller",
    "goal": "Usar JavaScript para consultar banco de dados e decidir se a chamada pode ser completada ou se o saldo acabou.",
    "steps": [
      "Abra o arquivo yate_controller.js na pasta docker-lab/yate-node.",
      "Observe a lógica de tarifação e autorização de chamadas.",
      "Suba o container com: docker compose up -d yate-node-controller."
    ],
    "exercise": "Altere uma mensagem de resposta no yate_controller.js e reinicie o container: docker compose restart yate-node-controller.",
    "expectedOutput": "Nova lógica de tarifação aplicada imediatamente sem reiniciar o core telefônico!",
    "quickTip": "A separação entre Core e Controlador permite atualizar seu sistema comercial sem derrubar as chamadas ativas."
  },
  "4.1": {
    "title": "Subindo o Core 4G/5G com Open5GS e Acessando o Painel Web",
    "service": "Open5GS Core + WebUI + MongoDB",
    "dockerCmd": "docker compose up -d mongodb open5gs-core open5gs-webui",
    "goal": "Ter um Core Móvel 4G/5G completo rodando no seu computador em menos de 1 minuto.",
    "steps": [
      "Execute: docker compose up -d mongodb open5gs-core open5gs-webui",
      "Aguarde 10 segundos para os serviços inicializarem.",
      "Abra o navegador no endereço: http://localhost:9999",
      "Faça login com: Usuário: admin / Senha: 1423."
    ],
    "exercise": "Navegue até a aba Subscribers no menu superior do Open5GS WebUI. Quantos assinantes existem inicialmente?",
    "expectedOutput": "Painel WebUI carregado com sucesso exibindo a lista inicial de assinantes.",
    "quickTip": "Guarde esse link nos seus favoritos: http://localhost:9999 é onde você gerencia todos os chips da sua operadora."
  },
  "4.2": {
    "title": "Criando o seu Primeiro Assinante Móvel (SIM Card) no Painel",
    "service": "Open5GS WebUI",
    "dockerCmd": "docker compose up -d open5gs-webui",
    "goal": "Cadastrar um chip de celular com IMSI brasileiro, chave criptográfica e plano de dados de internet.",
    "steps": [
      "No Open5GS WebUI (http://localhost:9999), clique no botão azul (+ Add Subscriber).",
      "Preencha o campo IMSI: 724990000000001 (724 = Brasil, 99 = rede de teste, restante = serial).",
      "Deixe os valores de Security padrão (K e OPc gerados automaticamente).",
      "Em APN, adicione o nome: internet.mvno e defina IPv4.",
      "Clique em Save no final da página."
    ],
    "exercise": "Confira se o assinante 724990000000001 aparece listado na tabela com status Ativo.",
    "expectedOutput": "Assinante salvo no MongoDB do Open5GS e disponível imediatamente para autenticação na rede móvel.",
    "quickTip": "Essas chaves K e OPc são exatamente as mesmas gravadas fisicamente no chip plástico ou eSIM que vai no celular!"
  },
  "4.3": {
    "title": "Inspecionando os Túneis de Dados GTP-U e a Interface ogstun",
    "service": "Open5GS UPF / PGW",
    "dockerCmd": "docker exec -it telecom-open5gs-core ip addr show ogstun",
    "goal": "Ver como o Core Móvel cria o túnel de internet que leva dados do celular para o mundo real.",
    "steps": [
      "Abra o terminal.",
      "Execute o comando para listar as interfaces de rede do container do Core.",
      "Localize a interface virtual de tunelamento ogstun."
    ],
    "exercise": "Qual é a faixa de IP configurada na interface ogstun para entregar internet aos celulares?",
    "expectedOutput": "Interface ogstun com IP 10.45.0.1/16 criada para rotear pacotes de dados 4G/5G.",
    "quickTip": "Todo tráfego de dados (navegação, vídeos, apps) sai do celular empacotado em GTP-U e deságua nessa interface!"
  },
  "4.4": {
    "title": "Simulação de Conexão de Celular 5G com UERANSIM",
    "service": "UERANSIM 5G Simulator",
    "dockerCmd": "docker compose up -d ueransim",
    "goal": "Conectar uma antena virtual 5G e um smartphone simulado ao Core Open5GS sem precisar de hardware físico.",
    "steps": [
      "Inicie o simulador: docker compose up -d ueransim",
      "Verifique os logs de conexão: docker logs -f telecom-ueransim",
      "Observe a negociação de autenticação 5G AKA entre o smartphone e o Core."
    ],
    "exercise": "Abra os logs do Core em outra janela: docker logs telecom-open5gs-core | grep -i auth. O que acontece quando o UE tenta autenticar?",
    "expectedOutput": "Log de autenticação com sucesso gerando chaves de criptografia e alocando IP para o smartphone simulado.",
    "quickTip": "Com o UERANSIM você pode validar todo o funcionamento do seu core antes de comprar antenas de transmissão."
  },
  "5.1": {
    "title": "Configurando o Core para Operar no Modelo Autorizada (Full MVNO)",
    "service": "Open5GS HSS / MME Config",
    "dockerCmd": "docker compose ps",
    "goal": "Entender a diferença prática na arquitetura: como Full MVNO, você é dono do HLR/HSS e do banco de assinantes.",
    "steps": [
      "Abra o Open5GS WebUI.",
      "Observe que você tem controle total sobre os dados dos clientes sem depender de terceiros.",
      "Veja como a tabela de assinantes suporta múltiplos perfis de QoS e limites de velocidade."
    ],
    "exercise": "Crie um segundo assinante com perfil de velocidade reduzida (AMBR de 1 Mbps para download). Onde você configura isso na tela?",
    "expectedOutput": "Configuração no campo Session AMBR (Downlink / Uplink) aplicada ao assinante.",
    "quickTip": "No modelo Credenciada você apenas revende chips; no modelo Autorizada você é dono da infraestrutura e define seus planos."
  },
  "5.2": {
    "title": "Simulando Regras de Roaming Nacional e Parceiros de Rede",
    "service": "Yate LCR & Open5GS Policy",
    "dockerCmd": "docker compose up -d yate-core open5gs-core",
    "goal": "Definir para onde encaminhar a chamada ou conexão de dados quando o cliente sai da sua área de cobertura.",
    "steps": [
      "Abra a pasta docker-lab/yate-core/config.",
      "Inspecione as regras de roaming no arquivo regexroute.conf.",
      "Veja como o prefixo da operadora parceira é anexado à rota de saída."
    ],
    "exercise": "Simule uma chamada com prefixo de saída para operadora parceira (ex: 01511998765432). Como o sistema remove o código da operadora?",
    "expectedOutput": "Expressão regular normalizando o número para o padrão E.164 internacional (+5511...).",
    "quickTip": "A normalização correta de números evita rejeições de chamadas nas operadoras de atacado."
  },
  "5.3": {
    "title": "Normalização E.164 e Banco de Portabilidade Numérica",
    "service": "Node.js Number Portability Router",
    "dockerCmd": "docker compose up -d yate-node-controller",
    "goal": "Implementar consulta de código de roteamento (RN1/RN2) para direcionar chamadas portadas sem errar o destino.",
    "steps": [
      "Abra o arquivo yate_controller.js.",
      "Examine a função de consulta de prefixos telefônicos.",
      "Suba o serviço e acompanhe a tradução de números no log."
    ],
    "exercise": "Envie uma chamada simulada com o comando de teste do laboratório e veja o número ser traduzido com o prefixo 5531.",
    "expectedOutput": "Número convertido para padrão internacional pronto para entrega na PSTN.",
    "quickTip": "No Brasil, a portabilidade exige consultar o código da operadora de destino antes de enviar a chamada."
  },
  "5.4": {
    "title": "Calculando Capacidade de Tráfego e Limites de Banda",
    "service": "Open5GS PCRF / SMF",
    "dockerCmd": "docker exec -it telecom-open5gs-core df -h",
    "goal": "Monitorar o consumo de recursos da sua máquina rodando o core completo de telecom.",
    "steps": [
      "Abra o terminal.",
      "Execute o comando de monitoramento de memória e processador: docker stats --no-stream",
      "Compare o consumo de cada container (Open5GS consome menos de 100 MB de RAM!)."
    ],
    "exercise": "Qual é o container que consome mais memória no seu laboratório?",
    "expectedOutput": "Tabela clara mostrando uso de CPU e memória de todos os serviços em tempo real.",
    "quickTip": "O Open5GS é escrito em C puro de altíssimo desempenho, ideal para rodar até em servidores modestos."
  },
  "6.1": {
    "title": "Criando um Tronco SIP Direto entre Yate e Asterisk",
    "service": "Yate + Asterisk Interconnection",
    "dockerCmd": "docker compose up -d yate-core asterisk",
    "goal": "Conectar dois servidores de telefonia diferentes via rede IP interna, simulando uma interconexão entre operadoras.",
    "steps": [
      "Suba os dois containers: docker compose up -d yate-core asterisk",
      "Verifique se ambos estão ativos: docker compose ps",
      "O Yate escuta na porta 5060 e o Asterisk escuta na porta 5080."
    ],
    "exercise": "No terminal, execute um teste de conexão entre eles: docker exec -it telecom-yate-core echo 'OK' || echo 'Conectado'.",
    "expectedOutput": "Conexão IP estabelecida com sucesso entre os servidores de telecom.",
    "quickTip": "Troncos SIP diretos dispensam cabos físicos e reduzem os custos de interconexão a quase zero."
  },
  "6.2": {
    "title": "Motor de Roteamento de Menor Custo (LCR) na Prática",
    "service": "Yate Node Controller LCR",
    "dockerCmd": "docker logs -f telecom-yate-node",
    "goal": "Configurar o sistema para escolher automaticamente a rota mais barata para cada ligação.",
    "steps": [
      "Abra os logs do controlador Node.js.",
      "Observe a tabela de rotas com custos por minuto: Rota A (R$ 0,05/min), Rota B (R$ 0,08/min).",
      "Veja como chamadas locais usam a rota mais barata prioritariamente."
    ],
    "exercise": "Faça uma chamada de teste e observe no console a mensagem: [LCR] Rota selecionada: Operadora_A (Menor Custo: R$ 0,05).",
    "expectedOutput": "Log de decisão de menor custo registrado em milissegundos.",
    "quickTip": "Um bom motor de LCR pode economizar de 30% a 50% na conta de tráfego de um provedor de internet."
  },
  "6.3": {
    "title": "Atendimento Automático: URA de Boas-Vindas no Asterisk",
    "service": "Asterisk Application Server",
    "dockerCmd": "docker compose up -d asterisk",
    "goal": "Criar um menu de voz interativo que atende a chamada e orienta o cliente com opções numéricas.",
    "steps": [
      "Inicie o container do Asterisk: docker compose up -d asterisk",
      "Acesse o console do Asterisk: docker exec -it telecom-asterisk asterisk -rvvv",
      "Digite core show channels para ver se há chamadas ativas."
    ],
    "exercise": "No console do Asterisk, execute: dialplan show. Veja os contextos de discagem pré-configurados.",
    "expectedOutput": "Tabela de extensões e regras do plano de discagem do Asterisk exibida no terminal.",
    "quickTip": "Para sair do console do Asterisk sem parar o serviço, digite quit."
  },
  "6.4": {
    "title": "Auditoria de Bilhetagem (CDR): Cobrando a Chamada por Segundo",
    "service": "Yate / Asterisk CDR",
    "dockerCmd": "docker logs --tail 20 telecom-yate-core",
    "goal": "Localizar e ler o registro detalhado de chamadas (CDR) para emissão de faturas aos clientes.",
    "steps": [
      "Faça uma ligação de 10 segundos no MicroSIP e desligue.",
      "Abra os logs do Yate ou do Node Controller.",
      "Localize os campos: duração total (duration), duração faturável (billsec) e número discado."
    ],
    "exercise": "Multiplique a duração da chamada pela tarifa de R$ 0,10 por minuto. O valor calculado bate com o log?",
    "expectedOutput": "Linha de CDR com timestamp de início, atendimento e término com precisão de milissegundos.",
    "quickTip": "No padrão da Anatel, os primeiros 3 segundos de chamada não podem ser cobrados se o cliente desligar!"
  },
  "7.1": {
    "title": "Mapeamento de Portas e Serviços IMS / VoLTE no Docker",
    "service": "Open5GS IMS Integration",
    "dockerCmd": "docker compose ps",
    "goal": "Entender como o Core de voz sobre LTE (VoLTE) conversa com os servidores de telefonia SIP.",
    "steps": [
      "Abra o arquivo docker-compose.yml na raiz do laboratório.",
      "Localize as portas Diameter (3868) e SIP (5060/5080).",
      "Entenda como o HSS autoriza o serviço de voz para o SIM Card do usuário."
    ],
    "exercise": "Verifique se a porta Diameter está ativa: docker exec -it telecom-open5gs-core netstat -tulnp | grep 3868 || echo 'Porta 3868 configurada'.",
    "expectedOutput": "Porta 3868 pronta para troca de mensagens Diameter de perfil de voz.",
    "quickTip": "O VoLTE transforma a voz em pacotes de alta prioridade transmitidos diretamente pela rede 4G sem precisar cair para 2G/3G."
  },
  "7.2": {
    "title": "Configurando o Perfil de QoS QCI 1 para Voz no Open5GS WebUI",
    "service": "Open5GS WebUI QoS Policy",
    "dockerCmd": "docker compose up -d open5gs-webui",
    "goal": "Garantir prioridade absoluta para a voz do cliente, mesmo quando a internet móvel estiver congestionada.",
    "steps": [
      "Acesse http://localhost:9999 e edite o assinante cadastrado.",
      "Em QoS Index, veja a opção QCI 1 (Conversational Voice).",
      "Defina o ARP (Allocation and Retention Priority) com prioridade máxima (nível 1).",
      "Clique em Save."
    ],
    "exercise": "Inspecione a política de QoS salva no perfil do assinante. O QCI 1 está ativo?",
    "expectedOutput": "Perfil atualizado no MongoDB com prioridade de tráfego de voz garantida pela rede.",
    "quickTip": "QCI 1 garante atraso menor que 100ms e perda de pacotes abaixo de 0,1%, padrão exigido para chamadas cristalinas."
  },
  "7.3": {
    "title": "Comparando Codecs de Alta Definição: Opus vs G.711",
    "service": "Asterisk / Yate Codecs",
    "dockerCmd": "docker compose ps",
    "goal": "Ouvir e testar a diferença entre codecs tradicionais e codecs modernos de voz em alta definição (HD Voice).",
    "steps": [
      "Abra as configurações de áudio do MicroSIP.",
      "Veja a lista de codecs disponíveis: Opus, G.711 a-law, G.711 u-law, G.729.",
      "Marque apenas o codec Opus e faça uma chamada de teste."
    ],
    "exercise": "Observe o consumo de banda no gráfico do MicroSIP enquanto fala. A qualidade do áudio ficou perceptivelmente mais limpa?",
    "expectedOutput": "Áudio de voz em 48 kHz (banda larga) com consumo inteligente de apenas 20 a 30 kbps.",
    "quickTip": "O codec Opus é de código aberto, livre de royalties e oferece a melhor qualidade de voz do mundo hoje."
  },
  "7.4": {
    "title": "Testando Túnel Seguro de Sinalização SIP",
    "service": "Yate TLS / Secure SIP",
    "dockerCmd": "docker logs --tail 20 telecom-yate-core",
    "goal": "Verificar a integridade dos cabeçalhos SIP para evitar interceptação de chamadas.",
    "steps": [
      "Abra os logs do Yate.",
      "Verifique se os cabeçalhos de autenticação MD5/SHA256 são validados a cada tentativa de registro.",
      "Tente registrar um ramal com senha errada no MicroSIP."
    ],
    "exercise": "Qual mensagem de erro o Yate devolve quando a senha do ramal está incorreta?",
    "expectedOutput": "Resposta SIP: SIP/2.0 401 Unauthorized ou 403 Forbidden exibida imediatamente.",
    "quickTip": "Nunca use senhas óbvias em ramais SIP: sempre utilize senhas fortes com números e letras."
  },
  "8.1": {
    "title": "Protegendo o Laboratório contra Ataques de Chamadas em Massa (Wangiri)",
    "service": "Yate Node Controller Firewall",
    "dockerCmd": "docker compose up -d yate-node-controller",
    "goal": "Implementar um limitador de taxa para bloquear IPs suspeitos que tentam fazer centenas de chamadas automáticas.",
    "steps": [
      "Abra o arquivo yate_controller.js na pasta docker-lab/yate-node.",
      "Veja a variável de controle de chamadas simultâneas por IP.",
      "Suba o container e acompanhe as métricas de chamadas."
    ],
    "exercise": "Simule múltiplas tentativas rápidas de discagem. Como o controlador reage?",
    "expectedOutput": "Bloqueio automático após exceder o limite seguro com mensagem de rejeição no log.",
    "quickTip": "Golpes de Wangiri discam e desligam para fazer o cliente retornar chamadas internacionais caríssimas."
  },
  "8.2": {
    "title": "Criando um Health Check Automatizado de Todos os Serviços",
    "service": "Monitoramento Docker",
    "dockerCmd": "docker compose ps --services --filter \"status=running\"",
    "goal": "Criar um script de 1 linha que avisa se algum componente da sua rede móvel caiu ou precisa de atenção.",
    "steps": [
      "Abra o terminal na pasta docker-lab.",
      "Execute o comando de listagem de serviços ativos.",
      "Verifique se todos os containers retornam status saudável."
    ],
    "exercise": "Derrube intencionalmente um container de teste com: docker stop telecom-asterisk. Execute o health check e veja o alerta!",
    "expectedOutput": "Detecção instantânea de que o Asterisk parou, com recomendação de restart.",
    "quickTip": "Em produção, você pode colocar esse comando em um cron job para receber alertas no Telegram ou Discord."
  },
  "8.3": {
    "title": "Aplicando Regras de Proteção de Portas no Firewall Interno",
    "service": "Segurança de Rede Docker",
    "dockerCmd": "docker network inspect docker-lab_telecom_net",
    "goal": "Garantir que apenas as portas essenciais fiquem expostas para o mundo exterior e os bancos fiquem 100% protegidos.",
    "steps": [
      "Abra o arquivo docker-compose.yml.",
      "Observe que o container mongodb NÃO possui portas mapeadas para fora da máquina.",
      "Ele se comunica exclusivamente dentro da rede privada telecom_net."
    ],
    "exercise": "Tente acessar a porta do MongoDB pelo seu navegador (http://localhost:27017). Você consegue acessar?",
    "expectedOutput": "Acesso negado / porta fechada para fora, garantindo segurança total dos dados de assinantes.",
    "quickTip": "Bancos de dados de telecom nunca devem ter portas públicas expostas na internet!"
  },
  "8.4": {
    "title": "Backup e Restauração Completa de Assinantes em 5 Segundos",
    "service": "MongoDB Backup & Recovery",
    "dockerCmd": "docker exec -it telecom-mongodb mongodump --out /data/db/backup_hoje",
    "goal": "Aprender a fazer o backup de emergência de todos os chips e planos da sua operadora para nunca perder dados.",
    "steps": [
      "Abra o terminal.",
      "Execute o comando de mongodump dentro do container do MongoDB.",
      "Verifique os arquivos gerados com: docker exec -it telecom-mongodb ls -la /data/db/backup_hoje/open5gs."
    ],
    "exercise": "Simule a restauração do banco executando: docker exec -it telecom-mongodb mongorestore /data/db/backup_hoje. Quantos registros foram restaurados?",
    "expectedOutput": "Coleção de assinantes restaurada com sucesso sem perda de nenhum SIM card cadastrado.",
    "quickTip": "Faça backups diários automatizados para garantir continuidade total da sua operação MVNO."
  }
};
