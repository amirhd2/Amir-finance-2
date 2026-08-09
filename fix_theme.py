import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target_theme = """            // Status bar meta color synchronization when Stack Wizard or Sticky Cards are open
            useEffect(() => {
                const metaTheme = document.querySelector('meta[name="theme-color"]');
                if (metaTheme) {
                    if (showStackWizard) {
                        metaTheme.setAttribute('content', isDark ? '#0f172a' : '#f8fafc');
                    } else {
                        metaTheme.setAttribute('content', isDark ? '#020617' : '#f8fafc');
                    }
                }
            }, [showStackWizard, isDark]);"""

replacement_theme = """            // Status bar meta color synchronization when Stack Wizard or Sticky Cards are open
            useEffect(() => {
                const metaTheme = document.querySelector('meta[name="theme-color"]');
                if (metaTheme) {
                    if (showStackWizard) {
                        metaTheme.setAttribute('content', isDark ? '#0f172a' : '#0f172a'); // Keep dark for both modes to match the wizard backdrop
                    } else {
                        metaTheme.setAttribute('content', isDark ? '#020617' : '#f8fafc');
                    }
                }
            }, [showStackWizard, isDark]);"""

content = content.replace(target_theme, replacement_theme)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed metaTheme")
