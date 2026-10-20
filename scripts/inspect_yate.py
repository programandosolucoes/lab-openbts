import urllib.request
import re
from bs4 import BeautifulSoup
import os

headers = {'User-Agent': 'Mozilla/5.0'}

def get_links(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r:
            html = r.read().decode('utf-8', errors='ignore')
            soup = BeautifulSoup(html, 'html.parser')
            links = []
            for a in soup.find_all('a', href=True):
                href = a['href']
                text = a.get_text(strip=True)
                links.append((href, text))
            return links
    except Exception as e:
        print(f"Error {url}: {e}")
        return []

print("=== Links from yate.ro ===")
for h, t in get_links('https://yate.ro/'):
    if any(k in h.lower() or k in t.lower() for k in ['download', 'doc', 'tarball', 'pdf', 'git', 'book', 'manual', 'source']):
        print(f"  {t} -> {h}")

print("\n=== Links from yatebts.com ===")
for h, t in get_links('https://yatebts.com/'):
    if any(k in h.lower() or k in t.lower() for k in ['download', 'doc', 'pdf', 'manual', 'source', 'git', 'tarball', 'release']):
        print(f"  {t} -> {h}")
