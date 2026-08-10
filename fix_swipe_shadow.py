import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

app = app.replace(
    'className={`relative overflow-hidden transition-all duration-300 ${',
    'className={`relative transition-all duration-300 ${'
)

# And make sure isDeleting has overflow-hidden
app = app.replace(
    "? 'max-h-0 opacity-0 my-0 py-0 scale-95 pointer-events-none'",
    "? 'overflow-hidden max-h-0 opacity-0 my-0 py-0 scale-95 pointer-events-none'"
)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

print("Fixed swipe shadow clipping!")
