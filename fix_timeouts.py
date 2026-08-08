import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'setTimeout\(\(\) => \{\s*setAnimatingCard\(false\);\s*\}, 420\);',
    r'setTimeout(() => {\n                        setAnimatingCard(false);\n                    }, 850);',
    content
)

content = re.sub(
    r'setTimeout\(\(\) => \{\s*setAnimatingPrevCard\(false\);\s*\}, 420\);',
    r'setTimeout(() => {\n                        setAnimatingPrevCard(false);\n                    }, 750);',
    content
)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
