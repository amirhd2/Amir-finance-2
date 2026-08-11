import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

app = app.replace('const APP_VERSION = "2.2.0";', 'const APP_VERSION = "2.2.1";')
app = app.replace('v=2.2.0', 'v=2.2.1')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('v=2.2.0', 'v=2.2.1')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
    
with open('sw.js', 'r', encoding='utf-8') as f:
    sw = f.read()

sw = sw.replace('v2.2.0', 'v2.2.1')

with open('sw.js', 'w', encoding='utf-8') as f:
    f.write(sw)
    
print("Updated version to 2.2.1")
