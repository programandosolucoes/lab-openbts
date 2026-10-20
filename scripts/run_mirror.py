import urllib.request
import re
import os
import time

out_dir = r"C:\Users\carlo\.gemini\antigravity\scratch\mvno-telecom-lab\yate-docs-mirror"
os.makedirs(out_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

# Páginas centrais da wiki e documentação do Yate / YateBTS
pages_to_crawl = [
    ('http://docs.yate.ro/wiki/Main_Page', 'Main_Page.html'),
    ('http://docs.yate.ro/wiki/Beginners_Guide', 'Beginners_Guide.html'),
    ('http://docs.yate.ro/wiki/Architecture', 'Architecture.html'),
    ('http://docs.yate.ro/wiki/Messages', 'Messages.html'),
    ('http://docs.yate.ro/wiki/Routing', 'Routing.html'),
    ('http://docs.yate.ro/wiki/External_Module', 'External_Module.html'),
    ('http://docs.yate.ro/wiki/Javascript', 'Javascript.html'),
    ('http://docs.yate.ro/wiki/SIP_Channel', 'SIP_Channel.html'),
    ('http://docs.yate.ro/wiki/Regexroute', 'Regexroute.html'),
    ('http://docs.yate.ro/wiki/YateBTS', 'YateBTS_Overview.html'),
    ('https://yatebts.com/', 'YateBTS_Home.html'),
    ('https://yatebts.com/documentation/subscribers_and_sims/', 'YateBTS_Subscribers_and_SIMs.html'),
    ('https://yatebts.com/documentation/configuration_files/', 'YateBTS_Configuration_Files.html')
]

for url, filename in pages_to_crawl:
    dest = os.path.join(out_dir, filename)
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"Already mirrored: {filename}")
        continue
    print(f"Mirroring {url} -> {filename}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            content = resp.read()
            with open(dest, 'wb') as f:
                f.write(content)
            print(f"Saved {filename} ({len(content)} bytes)")
    except Exception as e:
        print(f"Error mirroring {url}: {e}")
    time.sleep(0.5)

print("Mirror complete.")
