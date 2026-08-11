import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add to the existing css in <style>
html = html.replace('body {', 'html, body {\n            overscroll-behavior-x: none;\n        }\n        body {')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Added overscroll-behavior-x to html, body")
