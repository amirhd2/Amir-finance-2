import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("y: (peekAnim && index > 0) ? -20 : 0", "y: (peekAnim && index > 0) ? -40 : 0")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated peek amount")
