import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any occurrence of window._isSwipeBackNav blocks
content = re.sub(r'window\._isSwipeBackNav\s*=\s*true;', '', content)
content = re.sub(r'if\s*\(\s*window\._isSwipeBackNav\s*\)\s*\{.*?(?=if\s*\(\s*page1\s*&&\s*page2\s*&&\s*overlay\s*\))', '', content, flags=re.DOTALL)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("removed")
