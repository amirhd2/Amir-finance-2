import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1) !important;", "transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) !important;")
content = content.replace("transition: opacity 0.28s linear !important;", "transition: opacity 0.5s linear !important;")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
