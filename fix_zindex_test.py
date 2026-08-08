import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.finditer(r'id=\{`sticky-card-\$\{card\.id\}`\}(.*?)className=\{', content, re.DOTALL)
for m in matches:
    print(m.group(1))

