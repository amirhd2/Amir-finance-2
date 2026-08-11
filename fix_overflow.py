import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

app = app.replace('overflow-y-auto', 'overflow-y-auto overflow-x-hidden')
# Prevent duplicates if it was already there
app = app.replace('overflow-x-hidden overflow-x-hidden', 'overflow-x-hidden')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

print("Added overflow-x-hidden!")
