# Yate ExtModule Protocol Client em Node.js
# Arquitetura para Controle Programático de PABX / PSTN com Yate

const net = require('net');
const EventEmitter = require('events');

class YateClient extends EventEmitter {
    constructor(host = '127.0.0.1', port = 5039) {
        super();
        this.host = host;
        this.port = port;
        this.socket = null;
        this.buffer = '';
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.socket = net.createConnection({ host: this.host, port: this.port }, () => {
                console.log(`[Yate-Node] Conectado ao Yate ExtModule em ${this.host}:${this.port}`);
                // Notifica o Yate que este script gerencia eventos
                this.watch('call.route');
                this.watch('call.execute');
                this.watch('chan.disconnected');
                resolve();
            });

            this.socket.on('data', (data) => {
                this.buffer += data.toString('utf-8');
                let lines = this.buffer.split('\n');
                this.buffer = lines.pop(); // Guarda pedaço incompleto

                for (const line of lines) {
                    this.handleLine(line.trim());
                }
            });

            this.socket.on('error', (err) => {
                console.error('[Yate-Node] Erro de socket:', err.message);
                reject(err);
            });

            this.socket.on('close', () => {
                console.log('[Yate-Node] Conexão encerrada.');
                this.emit('close');
            });
        });
    }

    send(command) {
        if (this.socket && !this.socket.destroyed) {
            this.socket.write(command + '\n');
        }
    }

    // Registra interesse em mensagens do Yate
    watch(eventName) {
        console.log(`[Yate-Node] Observando evento: ${eventName}`);
        this.send(`%%>watch:${eventName}`);
    }

    // Instala handler para interceptar ou rotear mensagens
    install(eventName, priority = 50) {
        this.send(`%%>install:${priority}:${eventName}`);
    }

    // Trata mensagens recebidas do Yate
    handleLine(line) {
        if (!line) return;

        // Formatos padrão Yate ExtModule:
        // %%<message:<id>:<processed>:[<name>]:[<retval>]:[<param>=<val>...]
        if (line.startsWith('%%<message:')) {
            const parts = line.substring(11).split(':');
            const msgId = parts[0];
            const processed = parts[1] === 'true';
            const name = parts[2];
            const retValue = parts[3];

            // Parâmetros chave=valor
            const params = {};
            for (let i = 4; i < parts.length; i++) {
                const eqIdx = parts[i].indexOf('=');
                if (eqIdx !== -1) {
                    const k = parts[i].substring(0, eqIdx);
                    const v = parts[i].substring(eqIdx + 1);
                    params[k] = decodeURIComponent(v);
                }
            }

            this.emit('message', { msgId, processed, name, retValue, params });

            // Lógica de Roteamento Inteligente (PBX B2B / MVNO)
            if (name === 'call.route') {
                this.handleCallRoute(msgId, params);
            }
        }
    }

    handleCallRoute(msgId, params) {
        const caller = params.caller || 'Desconhecido';
        const called = params.called || '';
        console.log(`\n📞 [Nova Chamada] De: ${caller} -> Para: ${called}`);

        // Regra de exemplo: Roteamento inteligente para SIP ou Gateway PSTN
        let targetRoute = 'sip/sip:100@127.0.0.1:5060';
        if (called.startsWith('0800') || called.length > 8) {
            // Rota para PSTN / MNO Partner
            targetRoute = `sip/sip:${called}@pstn-gateway.local`;
        }

        console.log(`➡️ [Roteando] Destino resolvido: ${targetRoute}`);
        // Responde ao Yate com o destino
        this.send(`%%>message:${msgId}:true::${targetRoute}:handled=true`);
    }
}

// Inicialização em modo standalone ou importado
if (require.main === module) {
    const host = process.env.YATE_HOST || '127.0.0.1';
    const port = parseInt(process.env.YATE_PORT || '5039', 10);
    const client = new YateClient(host, port);

    function tryConnect() {
        console.log(`[Yate-Node] Tentando conectar ao Yate em ${host}:${port}...`);
        client.connect().catch((err) => {
            console.log(`[Yate-Node] Conexão falhou (${err.message}). Tentando novamente em 5s...`);
            setTimeout(tryConnect, 5000);
        });
    }

    tryConnect();
}

module.exports = YateClient;
