# 🛠️ Como Subir o Laboratório Prático de Telecomunicações & MVNO (Docker)

Bem-vindo ao laboratório prático da **Telecom Academy Pro**.
Este ambiente foi projetado para que você execute no seu próprio computador toda a infraestrutura de rede móvel (Core 4G EPC / 5G Core, WebUI de Gestão de SIM Cards, PABX SIP com Yate, Asterisk e Simulador UERANSIM) de forma 100% segura, isolada e sem necessidade de hardware adicional.

---

## 🚀 Requisitos Mínimos

1. **Docker Desktop** (Windows ou macOS) ou **Docker Engine + Docker Compose** (Linux).
2. Pelo menos **4 GB de RAM** livre.
3. Conexão à internet apenas para o primeiro download das imagens.

---

## ⚡ Passo a Passo em 3 Minutos

### Passo 1: Abrir o Terminal na Pasta do Laboratório
Abra o PowerShell, Prompt de Comando ou Terminal Linux na pasta `docker-lab`:
```bash
cd docker-lab
```

### Passo 2: Iniciar os Serviços do Laboratório
Execute o comando abaixo para iniciar todos os serviços essenciais em segundo plano:
```bash
docker compose up -d mongodb open5gs-core open5gs-webui yate-core yate-node-controller asterisk
```
*(Se você quiser subir absolutamente tudo de uma só vez, basta rodar `docker compose up -d`)*

### Passo 3: Acessar a Interface Visual de SIM Cards
Abra o seu navegador de internet e acesse:
👉 **URL:** [http://localhost:9999](http://localhost:9999)
- **Usuário:** `admin`
- **Senha:** `1423`

Pronto! Seu Core de Rede Móvel Open5GS já está rodando localmente!

---

## 🧭 Mapa de Serviços e Portas

| Serviço | Função Prática | Onde Acessar / Porta |
| :--- | :--- | :--- |
| **Open5GS WebUI** | Painel visual para criar chips, IMSI, chaves K/OPc e planos APN | `http://localhost:9999` (admin / 1423) |
| **Open5GS Core** | Core 4G/5G (MME, SGW, PGW, HSS, PCRF, SMF, UPF) | S1AP (36412 SCTP), GTP-U (2152 UDP) |
| **Yate Telephony** | Engine de telefonia móvel e sinalização SIP/SS7/GSM | `localhost:5060` (UDP / TCP) |
| **Yate Node.js** | Regras de roteamento de chamadas e tarifação MVNO | Comunicação interna via socket (5039) |
| **Asterisk AS** | Servidor de voz, URA de atendimento, correio de voz e IMS | `localhost:5080` (SIP) / `8088` (WebRTC) |
| **UERANSIM** | Simulador de antena 5G (gNodeB) e smartphone virtual | Container de execução para testes |

---

## 🧪 Comandos Úteis no Dia a Dia

- **Ver o status dos containers:**
  ```bash
  docker compose ps
  ```

- **Ver os logs em tempo real do Core Móvel (registro de chips e sinalização):**
  ```bash
  docker compose logs -f open5gs-core
  ```

- **Ver os logs da telefonia Yate:**
  ```bash
  docker compose logs -f yate-core
  ```

- **Pausar o laboratório:**
  ```bash
  docker compose stop
  ```

- **Encerrar e liberar recursos:**
  ```bash
  docker compose down
  ```

---

## 🐙 Repositório Oficial no GitHub

Você também pode clonar ou acompanhar as atualizações diretamente pelo GitHub:
```bash
git clone https://github.com/programandosolucoes/lab-openbts.git
```
Repositório: [https://github.com/programandosolucoes/lab-openbts](https://github.com/programandosolucoes/lab-openbts)
