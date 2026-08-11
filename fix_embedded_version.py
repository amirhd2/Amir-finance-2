import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

app = app.replace('const EMBEDDED_BUILD = 210;', 'const EMBEDDED_BUILD = 211;')
app = app.replace('const EMBEDDED_VERSION = "2.2.0";', 'const EMBEDDED_VERSION = "2.2.1";')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

print("Fixed embedded version!")
