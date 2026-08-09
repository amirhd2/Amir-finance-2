import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """                    const timer = setTimeout(() => {
                        const el = document.getElementById(`tx-card-${highlightedTxId}`);
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 450);"""

replacement = """                    const timer = setTimeout(() => {
                        const els = document.querySelectorAll(`[id="tx-card-${highlightedTxId}"]`);
                        if (els.length > 0) {
                            const el = els[els.length - 1]; // Always pick the one in the foreground/active page
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 450);"""

if target in content:
    content = content.replace(target, replacement)
    print("Fixed scrollIntoView")
else:
    print("Not found scrollIntoView")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
