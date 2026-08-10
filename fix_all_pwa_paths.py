import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace any href="/..." with href="./..." for images, webmanifests, icons
html = re.sub(r'href="/([^"]+)"', r'href="./\1"', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update manifest.webmanifest and site.webmanifest
for manifest_file in ['manifest.webmanifest', 'site.webmanifest']:
    with open(manifest_file, 'r', encoding='utf-8') as f:
        m = f.read()
    
    m = re.sub(r'"start_url":\s*"/[^"]*"', '"start_url": "./"', m)
    m = re.sub(r'"scope":\s*"/[^"]*"', '"scope": "./"', m)
    m = re.sub(r'"id":\s*"/[^"]*"', '"id": "./"', m)
    
    with open(manifest_file, 'w', encoding='utf-8') as f:
        f.write(m)

print("PWA relative paths fixed!")
