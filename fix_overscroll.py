import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('overscroll-behavior-y: contain;', 'overscroll-behavior: none;\n            overscroll-behavior-x: none;\n            overscroll-behavior-y: none;')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Fixed overscroll in index.html")
