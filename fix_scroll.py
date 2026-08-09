import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """                if (highlightedTxId) {
                    const timer = setTimeout(() => {
                        const el = document.getElementById(`tx-card-${highlightedTxId}`);
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 200);

                    const clearTimer = setTimeout(() => {
                        setHighlightedTxId(null);
                    }, 2600);"""

replacement = """                if (highlightedTxId) {
                    const timer = setTimeout(() => {
                        const el = document.getElementById(`tx-card-${highlightedTxId}`);
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 450);

                    const clearTimer = setTimeout(() => {
                        setHighlightedTxId(null);
                    }, 3000);"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced scroll wait time")
else:
    print("Not found scroll wait time")
