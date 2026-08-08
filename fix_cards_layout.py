import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'id=\{`sticky-card-\$\{card\.id\}`\}\s+layout', r'id={`sticky-card-${card.id}`}', content)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done layout")
