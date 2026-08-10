import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """                if (page1 && page2 && overlay) {
                        page1.classList.remove('smooth-transition');
                        page2.classList.remove('smooth-transition');
                        overlay.classList.remove('smooth-overlay');
                        page2.style.transform = 'translateX(0%)';
                        page1.style.transform = 'translateX(-25%)';
                        overlay.style.opacity = '0.4';
                    }
                    return;
                }"""

content = content.replace(target, "")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
