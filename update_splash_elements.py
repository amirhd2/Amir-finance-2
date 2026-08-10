import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_splash_html_pattern = r'<div id="app-static-splash".*?</div>'
new_splash_html = """<div id="app-static-splash" style="position:fixed;inset:0;z-index:99999;background:#0b101d;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;transition:opacity 0.5s ease, visibility 0.5s ease;">
        <picture style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <source media="(orientation: landscape)" srcset="./splash-landscape.png?v=2.2.0" />
            <img src="./splash-portrait.png?v=2.2.0" alt="Amir Finance Splash" onerror="this.onerror=null;this.style.display='none';" style="width:100%;height:100%;object-fit:cover;object-position:center;" />
        </picture>
        <div style="position:absolute;bottom:2.5rem;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.5rem;pointer-events:none;">
            <div style="width:2rem;height:2rem;border:2px solid #818cf8;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;"></div>
        </div>
    </div>"""

html = re.sub(old_splash_html_pattern, new_splash_html, html, flags=re.DOTALL)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated index.html splash screen with cache buster & onError handler!")

# 2. Update src/App.jsx
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_code = f.read()

old_app_splash = """                                <picture className="w-full h-full flex items-center justify-center">
                                    <source media="(orientation: landscape)" srcSet="./splash-landscape.png" />
                                    <img 
                                        src="./splash-portrait.png" 
                                        alt="Amir Finance Splash Screen" 
                                        className="w-full h-full object-cover object-center" 
                                    />
                                </picture>"""

new_app_splash = """                                <picture className="w-full h-full flex items-center justify-center">
                                    <source media="(orientation: landscape)" srcSet="./splash-landscape.png?v=2.2.0" />
                                    <img 
                                        src="./splash-portrait.png?v=2.2.0" 
                                        alt="Amir Finance Splash Screen" 
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        className="w-full h-full object-cover object-center" 
                                    />
                                </picture>"""

if old_app_splash in app_code:
    app_code = app_code.replace(old_app_splash, new_app_splash)
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(app_code)
    print("Updated src/App.jsx splash element with cache buster & onError handler!")
else:
    print("old_app_splash not found in App.jsx, doing regex check...")

print("update_splash_elements completed!")
