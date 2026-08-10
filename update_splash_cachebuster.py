import re

# Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('./splash-landscape.png?v=2.2.0', './splash-landscape.png?v=2.2.0-b220')
html = html.replace('./splash-portrait.png?v=2.2.0', './splash-portrait.png?v=2.2.0-b220')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Update App.jsx
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_code = f.read()

app_code = app_code.replace('./splash-landscape.png?v=2.2.0', './splash-landscape.png?v=2.2.0-b220')
app_code = app_code.replace('./splash-portrait.png?v=2.2.0', './splash-portrait.png?v=2.2.0-b220')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("Updated cache buster to ?v=2.2.0-b220!")
