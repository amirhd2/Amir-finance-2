import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """                if (page1 && page2 && overlay) {
                    page1.classList.remove('smooth-transition');
                    page2.classList.remove('smooth-transition');
                    overlay.classList.remove('smooth-overlay');
                    page2.style.transform = 'translate3d(100%, 0, 0)';
                    page1.style.transform = 'translate3d(0%, 0, 0)';
                    overlay.style.opacity = '0';
                    void page2.offsetHeight;
                    openPage();
                }"""

replacement = """                if (page1 && page2 && overlay) {
                    page1.classList.remove('smooth-transition');
                    page2.classList.remove('smooth-transition');
                    overlay.classList.remove('smooth-overlay');
                    page2.style.transform = 'translate3d(100%, 0, 0)';
                    page1.style.transform = 'translate3d(0%, 0, 0)';
                    overlay.style.opacity = '0';
                    void page2.offsetHeight;
                    requestAnimationFrame(() => requestAnimationFrame(() => openPage()));
                }"""

# Fix by ignoring precise whitespace
target_regex = re.compile(r"if\s*\(page1\s*&&\s*page2\s*&&\s*overlay\)\s*\{\s*page1\.classList\.remove\('smooth-transition'\);\s*page2\.classList\.remove\('smooth-transition'\);\s*overlay\.classList\.remove\('smooth-overlay'\);\s*page2\.style\.transform\s*=\s*'translate3d\(100%,\s*0,\s*0\)';\s*page1\.style\.transform\s*=\s*'translate3d\(0%,\s*0,\s*0\)';\s*overlay\.style\.opacity\s*=\s*'0';\s*void\s*page2\.offsetHeight;\s*openPage\(\);\s*\}")

if target_regex.search(content):
    content = target_regex.sub(replacement, content)
    print("Fixed SwipeBackWrapper enter animation")
else:
    print("Target not found")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
