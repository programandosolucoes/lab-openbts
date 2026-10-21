const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Modelo de Dados da Topologia Global (3 Países x 2 Cidades cada)
const globalTopology = {
    countries: [
        {
            id: 'BR',
            name: 'Brasil',
            mcc: '724',
            ddi: '+55',
            cities: [
                { id: 'SP', name: 'São Paulo', ddd: '11', popIp: '172.28.10.1', sipTrunk: 'gw-sp.telecom.local' },
                { id: 'RJ', name: 'Rio de Janeiro', ddd: '21', popIp: '172.28.10.2', sipTrunk: 'gw-rj.telecom.local' }
            ]
        },
        {
            id: 'US',
            name: 'Estados Unidos',
            mcc: '310',
            ddi: '+1',
            cities: [
                { id: 'MIA', name: 'Miami (FL)', npa: '305', popIp: '172.28.20.1', sipTrunk: 'gw-mia.us.telecom.local' },
                { id: 'NYC', name: 'Nova York (NY)', npa: '212', popIp: '172.28.20.2', sipTrunk: 'gw-nyc.us.telecom.local' }
            ]
        },
        {
            id: 'PT',
            name: 'Portugal',
            mcc: '268',
            ddi: '+351',
            cities: [
                { id: 'LIS', name: 'Lisboa', prefix: '21', popIp: '172.28.30.1', sipTrunk: 'gw-lis.eu.telecom.local' },
                { id: 'OPO', name: 'Porto', prefix: '22', popIp: '172.28.30.2', sipTrunk: 'gw-opo.eu.telecom.local' }
            ]
        }
    ]
};

// Motor de Roteamento Didático (LCR - Least Cost Routing & E.164)
function calculateRoute(caller, destination) {
    let cleanDest = destination.replace(/[\s\-\(\)]/g, '');
    let matchedCountry = null;
    let matchedCity = null;
    let routeGateway = 'gw-default.telecom.local';
    let callType = 'Local / Ramal';

    if (cleanDest.startsWith('+55') || cleanDest.startsWith('0055')) {
        matchedCountry = globalTopology.countries[0];
        let num = cleanDest.replace(/^\+55|^0055/, '');
        if (num.startsWith('11')) {
            matchedCity = matchedCountry.cities[0];
            routeGateway = matchedCity.sipTrunk;
            callType = 'Nacional (Brasil - São Paulo)';
        } else if (num.startsWith('21')) {
            matchedCity = matchedCountry.cities[1];
            routeGateway = matchedCity.sipTrunk;
            callType = 'Nacional (Brasil - Rio de Janeiro)';
        } else {
            routeGateway = 'gw-br-transit.telecom.local';
            callType = 'Nacional (Brasil - Outros DDDs)';
        }
    } else if (cleanDest.startsWith('+1') || cleanDest.startsWith('001')) {
        matchedCountry = globalTopology.countries[1];
        let num = cleanDest.replace(/^\+1|^001/, '');
        if (num.startsWith('305') || num.startsWith('786')) {
            matchedCity = matchedCountry.cities[0];
            routeGateway = matchedCity.sipTrunk;
            callType = 'Internacional DDI (EUA - Miami POP)';
        } else if (num.startsWith('212') || num.startsWith('646')) {
            matchedCity = matchedCountry.cities[1];
            routeGateway = matchedCity.sipTrunk;
            callType = 'Internacional DDI (EUA - Nova York POP)';
        } else {
            routeGateway = 'gw-us-transit.telecom.local';
            callType = 'Internacional DDI (EUA Geral)';
        }
    } else if (cleanDest.startsWith('+351') || cleanDest.startsWith('00351')) {
        matchedCountry = globalTopology.countries[2];
        let num = cleanDest.replace(/^\+351|^00351/, '');
        if (num.startsWith('21')) {
            matchedCity = matchedCountry.cities[0];
            routeGateway = matchedCity.sipTrunk;
            callType = 'Internacional DDI (Portugal - Lisboa POP)';
        } else if (num.startsWith('22')) {
            matchedCity = matchedCountry.cities[1];
            routeGateway = matchedCity.sipTrunk;
            callType = 'Internacional DDI (Portugal - Porto POP)';
        } else {
            routeGateway = 'gw-eu-transit.telecom.local';
            callType = 'Internacional DDI (Portugal Geral)';
        }
    } else {
        callType = 'Ramal Interno / PBX Direto';
        routeGateway = 'pabx-core.internal:5060';
    }

    return {
        caller,
        destination,
        cleanDest,
        callType,
        matchedCountry: matchedCountry ? matchedCountry.name : 'Rede Privada',
        matchedCity: matchedCity ? matchedCity.name : 'Local',
        gateway: routeGateway,
        protocol: 'SIP / RTP (SRTP opcional)',
        latencyEstimatedMs: matchedCountry && matchedCountry.id === 'BR' ? 15 : (matchedCountry ? 120 : 2)
    };
}

// Rotas da API
app.get('/api/topology', (req, res) => {
    res.json(globalTopology);
});

app.post('/api/simulate-route', (req, res) => {
    const { caller, destination } = req.body;
    const result = calculateRoute(caller || '2001', destination || '+5511987654321');
    res.json(result);
});

app.get('/api/lessons', (req, res) => {
    const lessons = [
        {
            id: 1,
            title: "Módulo 1: O Que É Telefonia Aberta, Marco Legal e a Revolução do SDR",
            duration: "25 min",
            category: "Fundamentos & Jurídico",
            summary: "Como a comutação de pacotes e o SDR tornaram obsoletas as centrais telefônicas fechadas, e como estudar no Brasil conforme o art. 183 da LGT e Resolução Anatel nº 777/2025."
        },
        {
            id: 2,
            title: "Módulo 2: O Motor Yate & Programação em Node.js via ExtModule",
            duration: "35 min",
            category: "Engenharia de Software",
            summary: "Desvendando o modelo de eventos do Yate em C++ (call.route, call.execute). Como criar um PABX inteligente corporativo em Node.js escutando a porta 5039."
        },
        {
            id: 3,
            title: "Módulo 3: OpenBTS & YateBTS com Drivers Virtuais e de Rede (Sem Antena Física)",
            duration: "40 min",
            category: "Radioacesso & Simulação",
            summary: "Como o OpenBTS e o YateBTS utilizam transceptores virtuais (dummyradio e sockets de rede UDP) para simular o rádio GSM sem gastar com placas físicas."
        },
        {
            id: 4,
            title: "Módulo 4: Simulação Global de Rádio 4G LTE (srsRAN ZeroMQ) e 5G Standalone (Open5GS + UERANSIM)",
            duration: "45 min",
            category: "4G LTE & 5G Core",
            summary: "Criando células LTE e 5G puramente em software. Amostras I/Q sobre ZeroMQ e interface uesimtun0 gerando tráfego real na rede de pacotes."
        },
        {
            id: 5,
            title: "Módulo 5: Roteamento Global (3 Países x 2 Cidades cada) e LCR",
            duration: "30 min",
            category: "Roteamento & Interconexão",
            summary: "Mapeamento E.164, MCC/MNC, regras de Least Cost Routing (LCR) e gestão de roaming internacional entre Brasil (SP/RJ), EUA (Miami/NY) e Portugal (Lisboa/Porto)."
        },
        {
            id: 6,
            title: "Módulo 6: Montagem Física Real de Bancada & Implantação de MVNO Comercial",
            duration: "40 min",
            category: "Hardware & Negócios",
            summary: "Guia passo a passo da bancada cabeada com atenuação de 60 dB (PlutoSDR / bladeRF) e o plano de lançamento de MVNO Credenciada até fevereiro."
        }
    ];
    res.json(lessons);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Telecom-Academy] Plataforma Educacional iniciada em http://0.0.0.0:${PORT}`);
});
