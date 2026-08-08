import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the peek amount from -40 to -80
content = content.replace("y: (peekAnim && index > 0) ? -40 : 0", "y: (peekAnim && index > 0) ? -80 : 0")

# Fix the blink: the modal already fades in, so cards don't need to start at opacity: 0.
content = content.replace("initial={{ opacity: 0, y: 20 }}", "initial={{ y: 20 }}")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Applied fixes")
