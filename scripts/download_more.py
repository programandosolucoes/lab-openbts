import urllib.request
import json
import os

target_dir = r"C:\Users\carlo\.gemini\antigravity\scratch\mvno-telecom-lab\books"

def get_files_for_identifier(ident):
    url = f"https://archive.org/metadata/{ident}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            files = data.get('files', [])
            pdf_files = [f for f in files if f.get('name', '').lower().endswith('.pdf')]
            return pdf_files
    except Exception as e:
        print(f"Error fetching metadata for {ident}: {e}")
        return []

def download_file(ident, filename, output_name):
    out_path = os.path.join(target_dir, output_name)
    if os.path.exists(out_path):
        print(f"Already exists: {output_name}")
        return
    url = f"https://archive.org/download/{ident}/{urllib.parse.quote(filename)}"
    print(f"Downloading {output_name} from {url}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=60) as resp, open(out_path, 'wb') as f:
            f.write(resp.read())
        size_mb = os.path.getsize(out_path) / (1024 * 1024)
        print(f"Successfully saved {output_name} ({size_mb:.2f} MB)")
    except Exception as e:
        print(f"Failed to download {output_name}: {e}")

items_to_check = [
    ('manualzilla-id-5719999', 'OpenBTS_Application_Suite_User_Manual.pdf'),
    ('manualzilla-id-5891399', 'OpenBTS_for_Dummies.pdf'),
    ('TheHobbyistsGuideToRTLSDRCarlLaufer', 'The_Hobbyists_Guide_to_RTL-SDR.pdf'),
]

for ident, target_name in items_to_check:
    pdfs = get_files_for_identifier(ident)
    if pdfs:
        # Pick the largest PDF (usually full book) or exact match
        best_pdf = sorted(pdfs, key=lambda x: int(x.get('size', 0)), reverse=True)[0]
        download_file(ident, best_pdf['name'], target_name)
