import zipfile
import os
import shutil
import time

epub_title = "Engenharia de Telecomunicações e MVNO Convergente"
epub_author = "Carlos Lopes"
epub_publisher = "Programando Soluções / OSTS"
epub_year = "2026"

chapters = [
    {
        "id": "intro",
        "title": "Introdução: A Descentralização das Telecomunicações",
        "content": """
        <h1>Introdução: A Descentralização das Telecomunicações</h1>
        <p>Durante décadas, construir e operar uma rede telefônica ou celular foi privilégio de grandes monopólios protegidos por equipamentos proprietários de custo astronômico e segredo industrial. A inteligência da rede era soldada nos circuitos.</p>
        <p>Com o advento das Redes de Próxima Geração (NGN), da comutação por pacotes e, sobretudo, do Rádio Definido por Software (SDR), todo o ecossistema foi democratizado. Hoje, um computador padrão x86 rodando Linux é capaz de processar modulação digital de radiofrequência, controlar sinalização celular e comutar milhares de canais de voz simultâneos.</p>
        <p>Esta obra consolida o caminho técnico e regulatório para engenheiros, provedores regionais e empresas de tecnologia que desejam criar suas próprias Operadoras Móveis Virtuais (MVNO) e soluções de telefonia corporativa convergente.</p>
        """
    },
    {
        "id": "cap1",
        "title": "Capítulo 1: Marco Legal Brasileiro & Conformidade Inegociável",
        "content": """
        <h1>Capítulo 1: Marco Legal Brasileiro & Conformidade Inegociável</h1>
        <p>O primeiro compromisso de qualquer pesquisador ou empresário de telecomunicações no Brasil é com a legalidade. A Lei Geral de Telecomunicações (Lei nº 9.472/1997), em seu artigo 183, tipifica como crime o desenvolvimento clandestino de atividades de telecomunicação, cominando pena de detenção de dois a quatro anos e multa.</p>
        <p>A jurisprudência brasileira é cristalina: a alegação de finalidade acadêmica, experimental ou didática <strong>não afasta a tipicidade penal</strong> se houver emissão radioelétrica sem autorização no ambiente aberto.</p>
        <h2>A Bancada Confinada Cabeada (Desenho A)</h2>
        <p>Para aprender e homologar sistemas celulares sem risco de crime, o laboratório deve adotar a <strong>bancada 100% cabeada</strong>:</p>
        <ul>
            <li>Nenhuma antena transmissora conectada ao SDR.</li>
            <li>Cabo coaxial de 50 ohms interligando a saída do SDR diretamente à entrada de antena do terminal de testes.</li>
            <li>Atenuadores calibrados de 60 dB em cascata (dois atenuadores de 30 dB), garantindo que a potência recebida seja da ordem de -60 dBm a -80 dBm, sem qualquer fuga eletromagnética para o ambiente.</li>
        </ul>
        """
    },
    {
        "id": "cap2",
        "title": "Capítulo 2: Yate Telephony Engine & Controle Assíncrono com Node.js",
        "content": """
        <h1>Capítulo 2: Yate Telephony Engine & Controle Assíncrono com Node.js</h1>
        <p>O Yate (Yet Another Telephony Engine) diferencia-se de centrais convencionais como o Asterisk por não ser centrado em canais telefônicos rígidos. O Yate é um motor assíncrono de despacho de mensagens nomeadas.</p>
        <p>Ele processa eventos atômicos: <code>call.route</code> para decidir destinos, <code>call.execute</code> para estabelecer sessões e <code>user.auth</code> para validar credenciais.</p>
        <h2>O Protocolo ExtModule</h2>
        <p>Através do módulo <code>extmodule</code>, o Yate expõe uma conexão de socket TCP na porta <code>5039</code> (restrita a 127.0.0.1 por segurança). Um controlador escrito em Node.js intercepta chamadas e executa regras de negócio, tarifas dinâmicas e direcionamento para gateways PSTN locais em tempo real.</p>
        """
    },
    {
        "id": "cap3",
        "title": "Capítulo 3: OpenBTS, YateBTS e Simulação por Software",
        "content": """
        <h1>Capítulo 3: OpenBTS, YateBTS e Simulação por Software</h1>
        <p>O OpenBTS revolucionou a telefonia ao colapsar os elementos clássicos da rede celular (BSC, MSC, interfaces proprietárias Abis) e fazer a antena falar diretamente SIP sobre protocolo IP.</p>
        <h2>Operação Sem Antena Física</h2>
        <p>Não é obrigatório possuir um hardware SDR para validar o comportamento da rede:</p>
        <ul>
            <li><strong>dummyradio:</strong> Módulo nativo do YateBTS que emula a interface de rádio GSM, gerando os canais de controle BCCH e a sinalização TDMA em memória.</li>
            <li><strong>Transceptor de Rede UDP:</strong> Comunicação entre a camada de rádio e a camada de controle via pacotes UDP locais.</li>
            <li><strong>ZeroMQ (srsRAN):</strong> Transporte de amostras I/Q de radiofrequência 4G LTE sobre sockets TCP de alta velocidade.</li>
        </ul>
        """
    },
    {
        "id": "cap4",
        "title": "Capítulo 4: 5G Standalone & Núcleo de Pacotes com Open5GS",
        "content": """
        <h1>Capítulo 4: 5G Standalone & Núcleo de Pacotes com Open5GS</h1>
        <p>A quinta geração móvel (5G Standalone) adota uma arquitetura orientada a serviços (Service-Based Architecture - SBA), onde cada função de rede atua como um microserviço HTTP/2 RESTful:</p>
        <ul>
            <li><strong>AMF (Access and Mobility Management Function):</strong> Controle de sinalização e autenticação do assinante.</li>
            <li><strong>SMF (Session Management Function):</strong> Alocação de endereços IP e gestão de túneis de pacotes.</li>
            <li><strong>UPF (User Plane Function):</strong> Roteamento de pacotes de dados em altíssima velocidade.</li>
            <li><strong>UDM / UDR:</strong> Gerenciamento unificado de dados do assinante com chaves criptográficas Milenage.</li>
        </ul>
        <p>Com o <strong>UERANSIM</strong>, o laboratório emula uma antena gNodeB e terminais celulares virtuais, criando interfaces de rede <code>uesimtun0</code> capazes de navegar na internet real através do Core 5G.</p>
        """
    },
    {
        "id": "cap5",
        "title": "Capítulo 5: Roteamento Global Multi-País e LCR (Brasil, EUA e Portugal)",
        "content": """
        <h1>Capítulo 5: Roteamento Global Multi-País e LCR (Brasil, EUA e Portugal)</h1>
        <p>Uma operadora moderna atua em malha distribuída com presença em múltiplos pontos de troca de tráfego (POPs). Analisamos o cenário com três países estratégicos:</p>
        <ul>
            <li><strong>Brasil (MCC 724 / DDI +55):</strong> POPs em São Paulo (DDD 11) e Rio de Janeiro (DDD 21).</li>
            <li><strong>Estados Unidos (MCC 310 / DDI +1):</strong> POPs em Miami (FL 305) e Nova York (NY 212).</li>
            <li><strong>Portugal (MCC 268 / DDI +351):</strong> POPs em Lisboa (21) e Porto (22).</li>
        </ul>
        <p>O algoritmo de <strong>Least Cost Routing (LCR)</strong> garante que uma chamada originada no Brasil para os Estados Unidos não seja tarifada como DDI tradicional por operadoras de trânsito: o tráfego viaja via túnel SIP IPsec corporativo até o POP americano mais próximo e é descarregado na rede telefônica local com custo irrisório.</p>
        """
    },
    {
        "id": "cap6",
        "title": "Capítulo 6: O Modelo de MVNO no Brasil sob a Resolução Anatel nº 777/2025",
        "content": """
        <h1>Capítulo 6: O Modelo de MVNO no Brasil sob a Resolução Anatel nº 777/2025</h1>
        <p>Em 28 de abril de 2025, a Anatel revogou a antiga Resolução 550/2010 e promulgou a <strong>Resolução nº 777/2025</strong>, estabelecendo o novo marco para o Serviço Móvel Pessoal.</p>
        <h2>Credenciada vs. Autorizada</h2>
        <p>Para o lançamento em prazo acelerado (como a meta de fevereiro), o modelo de <strong>MVNO Credenciada (Light)</strong> é o caminho ótimo: a empresa atua mediante Contrato de Representação com a operadora hospedeira (ou agregadora como Surf Telecom, Arqia ou Telecall), sem necessidade de arcar com outorga SMP direta ou tributação pesada de FUST/FUNTTEL.</p>
        <p>O diferencial competitivo está na <strong>camada de software</strong>: agregar valor corporativo entregando PABX na nuvem, controle de rotas por inteligência artificial e conectividade móvel unificada em uma única fatura.</p>
        """
    }
]

def build_epub(output_filepath):
    temp_dir = r"C:\Users\carlo\.gemini\antigravity\scratch\mvno-telecom-lab\temp_epub_build"
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)
    
    oebps_dir = os.path.join(temp_dir, "OEBPS")
    metainf_dir = os.path.join(temp_dir, "META-INF")
    os.makedirs(oebps_dir, exist_ok=True)
    os.makedirs(metainf_dir, exist_ok=True)

    # 1. mimetype
    with open(os.path.join(temp_dir, "mimetype"), "w", encoding="utf-8") as f:
        f.write("application/epub+zip")

    # 2. container.xml
    container_xml = """<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
    <rootfiles>
        <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
    </rootfiles>
</container>"""
    with open(os.path.join(metainf_dir, "container.xml"), "w", encoding="utf-8") as f:
        f.write(container_xml)

    # 3. CSS
    style_css = """
    body { font-family: sans-serif; line-height: 1.6; margin: 5%; color: #111; }
    h1 { color: #1e3a8a; border-bottom: 2px solid #3b82f6; padding-bottom: 6px; }
    h2 { color: #1e40af; margin-top: 1.5em; }
    p { margin-bottom: 1em; text-align: justify; }
    code { font-family: monospace; background: #f1f5f9; padding: 2px 4px; border-radius: 3px; }
    pre { background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; border-radius: 4px; font-family: monospace; }
    .alert-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px; margin: 15px 0; }
    """
    with open(os.path.join(oebps_dir, "style.css"), "w", encoding="utf-8") as f:
        f.write(style_css)

    # 4. Chapters
    manifest_items = ['<item id="style" href="style.css" media-type="text/css"/>',
                      '<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>']
    spine_items = []
    nav_points = []

    for idx, c in enumerate(chapters):
        c_file = f"{c['id']}.xhtml"
        xhtml_content = f"""<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-BR">
<head>
    <title>{c['title']}</title>
    <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
{c['content']}
</body>
</html>"""
        with open(os.path.join(oebps_dir, c_file), "w", encoding="utf-8") as f:
            f.write(xhtml_content)

        manifest_items.append(f'<item id="{c["id"]}" href="{c_file}" media-type="application/xhtml+xml"/>')
        spine_items.append(f'<itemref idref="{c["id"]}"/>')
        nav_points.append(f"""
        <navPoint id="navPoint-{idx+1}" playOrder="{idx+1}">
            <navLabel><text>{c['title']}</text></navLabel>
            <content src="{c_file}"/>
        </navPoint>""")

    # 5. content.opf
    opf_content = f"""<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId" version="2.0">
    <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
        <dc:title>{epub_title}</dc:title>
        <dc:creator opf:role="aut">{epub_author}</dc:creator>
        <dc:publisher>{epub_publisher}</dc:publisher>
        <dc:language>pt-BR</dc:language>
        <dc:identifier id="BookId">urn:uuid:ost-telecom-carlos-lopes-2026</dc:identifier>
        <dc:date>{epub_year}</dc:date>
    </metadata>
    <manifest>
        {''.join(manifest_items)}
    </manifest>
    <spine toc="ncx">
        {''.join(spine_items)}
    </spine>
</package>"""
    with open(os.path.join(oebps_dir, "content.opf"), "w", encoding="utf-8") as f:
        f.write(opf_content)

    # 6. toc.ncx
    ncx_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
    <head>
        <meta name="dtb:uid" content="urn:uuid:ost-telecom-carlos-lopes-2026"/>
        <meta name="dtb:depth" content="1"/>
        <meta name="dtb:totalPageCount" content="0"/>
        <meta name="dtb:maxPageNumber" content="0"/>
    </head>
    <docTitle><text>{epub_title}</text></docTitle>
    <navMap>
        {''.join(nav_points)}
    </navMap>
</ncx>"""
    with open(os.path.join(oebps_dir, "toc.ncx"), "w", encoding="utf-8") as f:
        f.write(ncx_content)

    # Compacta em ZIP no padrão rigoroso do EPUB (mimetype sem compressão como primeiro arquivo)
    os.makedirs(os.path.dirname(output_filepath), exist_ok=True)
    with zipfile.ZipFile(output_filepath, "w") as z:
        z.write(os.path.join(temp_dir, "mimetype"), "mimetype", compress_type=zipfile.ZIP_STORED)
        for root, dirs, files in os.walk(metainf_dir):
            for file in files:
                p = os.path.join(root, file)
                rel = os.path.relpath(p, temp_dir)
                z.write(p, rel, compress_type=zipfile.ZIP_DEFLATED)
        for root, dirs, files in os.walk(oebps_dir):
            for file in files:
                p = os.path.join(root, file)
                rel = os.path.relpath(p, temp_dir)
                z.write(p, rel, compress_type=zipfile.ZIP_DEFLATED)

    shutil.rmtree(temp_dir)
    print(f"EPUB criado com sucesso em: {output_filepath} ({os.path.getsize(output_filepath)} bytes)")

out1 = r"C:\Users\carlo\.gemini\antigravity\scratch\mvno-telecom-lab\books\Engenharia_Telecom_MVNO_Convergente_Carlos_Lopes.epub"
out2 = r"C:\Users\carlo\.gemini\antigravity\scratch\mvno-telecom-lab\telecom-academy\public\downloads\Engenharia_Telecom_MVNO_Convergente_Carlos_Lopes.epub"

build_epub(out1)
build_epub(out2)
