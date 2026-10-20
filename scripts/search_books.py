import urllib.request
import json
import os
import sys

target_dir = r"C:\Users\carlo\.gemini\antigravity\scratch\mvno-telecom-lab\books"
os.makedirs(target_dir, exist_ok=True)

queries = [
    'OpenBTS',
    'YateBTS',
    '"Software Defined Radio"',
    'Osmocom GSM',
    'Open5GS',
    '"Mobile Telecommunications"'
]

def search_archive(query):
    encoded = urllib.parse.quote(f"({query}) AND mediatype:texts")
    url = f"https://archive.org/advancedsearch.php?q={encoded}&fl[]=identifier,title,downloads,format&sort[]=downloads+desc&rows=10&output=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return data.get('response', {}).get('docs', [])
    except Exception as e:
        print(f"Error querying {query}: {e}")
        return []

print("Searching archive.org...")
candidates = {}
for q in queries:
    docs = search_archive(q)
    for d in docs:
        ident = d.get('identifier')
        title = d.get('title')
        dls = d.get('downloads', 0)
        if ident and ident not in candidates:
            candidates[ident] = {'title': title, 'downloads': dls}

for ident, info in list(candidates.items())[:20]:
    print(f"- [{ident}] {info['title']} ({info['downloads']} dls)")
