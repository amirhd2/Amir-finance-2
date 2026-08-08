import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("isOtherCardBlur ? 'blur-[1.5px] pointer-events-none select-none' : ''", "isOtherCardBlur ? 'pointer-events-none select-none' : ''")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed blur")
