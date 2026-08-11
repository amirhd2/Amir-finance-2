with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target = """        html, body, #root {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
            position: relative;
        }

        html, body {
            overscroll-behavior-x: none;
        }"""

replacement = """        html, body, #root {
            height: 100%;
            width: 100%;
            max-width: 100vw;
            margin: 0;
            padding: 0;
            overflow: hidden;
            overflow-x: hidden !important;
            position: relative;
            overscroll-behavior: none;
            overscroll-behavior-x: none;
            touch-action: pan-y;
        }"""

if target in html:
    html = html.replace(target, replacement)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully updated index.html CSS!")
else:
    print("Could not find target in index.html")
