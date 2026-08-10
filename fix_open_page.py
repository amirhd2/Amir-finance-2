with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """            const openPage = () => {
                const page1 = page1Ref.current;
                const page2 = page2Ref.current;
                const overlay = overlayRef.current;
                if (page1 && page2 && overlay) {
                    page1.classList.add('smooth-transition');
                    page2.classList.add('smooth-transition');
                    overlay.classList.add('smooth-overlay');
                    void page2.offsetHeight;
                    page2.style.transform = 'translate3d(0%, 0, 0)';
                    page1.style.transform = 'translate3d(-25%, 0, 0)';
                    overlay.style.opacity = '0.4';
                }
            };"""

replacement = """            const openPage = () => {
                const page1 = page1Ref.current;
                const page2 = page2Ref.current;
                const overlay = overlayRef.current;
                if (page1 && page2 && overlay) {
                    page1.classList.add('smooth-transition');
                    page2.classList.add('smooth-transition');
                    overlay.classList.add('smooth-overlay');
                    void page2.offsetHeight;
                    requestAnimationFrame(() => {
                        page2.style.transform = 'translate3d(0%, 0, 0)';
                        page1.style.transform = 'translate3d(-25%, 0, 0)';
                        overlay.style.opacity = '0.4';
                    });
                }
            };"""

content = content.replace(target, replacement)
with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed openPage")
