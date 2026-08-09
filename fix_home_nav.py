import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("setCurrentTab('accounts')", "navigateToTab('accounts', 'forward')")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed Home page links to accounts")
