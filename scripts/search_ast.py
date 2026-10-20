import urllib.request
import json
import urllib.parse

q = 'title:("Asterisk" AND "Definitive Guide") AND mediatype:texts'
url = f"https://archive.org/advancedsearch.php?q={urllib.parse.quote(q)}&fl[]=identifier,title,downloads&output=json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        for d in data.get('response', {}).get('docs', []):
            print(d.get('identifier'), d.get('title'))
except Exception as e:
    print(e)
