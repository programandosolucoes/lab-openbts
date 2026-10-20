import urllib.request
import json
import os

target_dir = r"C:\Users\carlo\.gemini\antigravity\scratch\mvno-telecom-lab\books"

queries = [
    'title:(GSM) AND mediatype:texts',
    'title:(LTE) AND mediatype:texts',
    'title:(VoLTE) AND mediatype:texts',
    'title:(Kamailio) AND mediatype:texts',
    'title:(Asterisk) AND mediatype:texts',
    'title:(IMS) AND title:(3GPP) AND mediatype:texts'
]

for q in queries:
    encoded = urllib.parse.quote(q)
    url = f"https://archive.org/advancedsearch.php?q={encoded}&fl[]=identifier,title,downloads&sort[]=downloads+desc&rows=5&output=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            docs = data.get('response', {}).get('docs', [])
            print(f"=== Query: {q} ===")
            for d in docs:
                print(f"  {d.get('identifier')}: {d.get('title')} ({d.get('downloads')} dls)")
    except Exception as e:
        print(f"Error {q}: {e}")
