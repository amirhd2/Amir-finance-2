import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_html_pic = """        <picture style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <source media="(orientation: landscape)" srcset="./splash-landscape.png?v=2.2.1-b211" />
            <img src="./splash-portrait.png?v=2.2.1-b211" alt="Amir Finance Splash" onerror="this.onerror=null;this.style.display='none';" style="width:100%;height:100%;object-fit:cover;object-position:center;" />
        </picture>"""

new_html_pic = """        <picture style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <source media="(orientation: landscape)" srcset="./splash-landscape.png?v=2.2.2, ./splash-landscape.jpg?v=2.2.2" />
            <source media="(orientation: portrait)" srcset="./splash-portrait.png?v=2.2.2, ./splash-portrait.jpg?v=2.2.2" />
            <img src="./splash-portrait.png?v=2.2.2" alt="Amir Finance Splash" onerror="if(!this.dataset.retry){this.dataset.retry='1';this.src='./splash-portrait.jpg';}" style="width:100%;height:100%;object-fit:cover;object-position:center;" />
        </picture>"""

if old_html_pic in html:
    html = html.replace(old_html_pic, new_html_pic)
    print("Updated index.html picture element")
else:
    print("Could not match old_html_pic in index.html")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)


# 2. Update src/App.jsx
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_jsx = f.read()

old_app_pic = """                                <picture className="w-full h-full flex items-center justify-center">
                                    <source media="(orientation: landscape)" srcSet="./splash-landscape.png?v=2.2.1-b211" />
                                    <img 
                                        src="./splash-portrait.png?v=2.2.1-b211" 
                                        alt="Amir Finance Splash Screen" 
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        className="w-full h-full object-cover object-center" 
                                    />
                                </picture>"""

new_app_pic = """                                <picture className="w-full h-full flex items-center justify-center">
                                    <source media="(orientation: landscape)" srcSet="./splash-landscape.png?v=2.2.2, ./splash-landscape.jpg?v=2.2.2" />
                                    <source media="(orientation: portrait)" srcSet="./splash-portrait.png?v=2.2.2, ./splash-portrait.jpg?v=2.2.2" />
                                    <img 
                                        src="./splash-portrait.png?v=2.2.2" 
                                        alt="Amir Finance Splash Screen" 
                                        onError={(e) => { 
                                            if (!e.currentTarget.dataset.retry) {
                                                e.currentTarget.dataset.retry = '1';
                                                e.currentTarget.src = './splash-portrait.jpg';
                                            }
                                        }}
                                        className="w-full h-full object-cover object-center" 
                                    />
                                </picture>"""

if old_app_pic in app_jsx:
    app_jsx = app_jsx.replace(old_app_pic, new_app_pic)
    print("Updated src/App.jsx picture element")
else:
    print("Could not match old_app_pic in App.jsx")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app_jsx)

