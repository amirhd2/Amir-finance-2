import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = "onClick={() => { setAllTxsPage(1); setCurrentTab('all-transactions'); }}"
replacement = "onClick={() => { setAllTxsPage(1); navigateToTab('all-transactions', 'forward'); }}"

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed all-transactions navigation")
else:
    print("Not found all-transactions nav")
