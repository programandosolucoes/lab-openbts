import urllib.request
import json
import os
import sys

target_dir = r"C:\Users\carlo\.gemini\antigravity\scratch\mvno-telecom-lab\books"

def download_item(ident, out_name):
    url = f"https://archive.org/metadata/{ident}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            files = data.get('files', [])
            pdfs = [f for f in files if f.get('name', '').lower().endswith('.pdf')]
            if not pdfs:
                print(f"No PDFs found for {ident}")
                return
            best = sorted(pdfs, key=lambda x: int(x.get('size', 0)), reverse=True)[0]
            fname = best['name']
            dl_url = f"https://archive.org/download/{ident}/{urllib.parse.quote(fname)}"
            out_file = os.path.join(target_dir, out_name)
            if os.path.exists(out_file):
                print(f"Already exists: {out_name}")
                return
            print(f"Downloading {out_name} from {dl_url}...")
            r2 = urllib.request.Request(dl_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(r2, timeout=60) as res, open(out_file, 'wb') as f:
                f.write(res.read())
            print(f"Downloaded {out_name}: {os.path.getsize(out_file)/(1024*1024):.2f} MB")
    except Exception as e:
        print(f"Error {ident}: {e}")

download_item('Yahiya_Understanding_LTE_and_its_Performance', 'Understanding_LTE_and_its_Performance.pdf')
