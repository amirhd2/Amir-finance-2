import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace /favicon with ./favicon
content = re.sub(r'href="/(favicon[^"]*)"', r'href="./\1"', content)
# Replace /apple-touch with ./apple-touch
content = re.sub(r'href="/(apple-touch[^"]*)"', r'href="./\1"', content)
# Replace /manifest with ./manifest
content = re.sub(r'href="/(manifest[^"]*)"', r'href="./\1"', content)
# Replace /icon- with ./icon-
content = re.sub(r'href="/(icon-[^"]*)"', r'href="./\1"', content)
# Replace /site.webmanifest with ./site.webmanifest
content = re.sub(r'href="/(site\.webmanifest)"', r'href="./\1"', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("done index.html")

# Let's also check sw.js for absolute paths to these icons
with open('sw.js', 'r', encoding='utf-8') as f:
    sw_content = f.read()

sw_content = re.sub(r"'/(favicon[^']*)'", r"'./\1'", sw_content)
sw_content = re.sub(r"'/(apple-touch[^']*)'", r"'./\1'", sw_content)
sw_content = re.sub(r"'/(manifest[^']*)'", r"'./\1'", sw_content)
sw_content = re.sub(r"'/(icon-[^']*)'", r"'./\1'", sw_content)
sw_content = re.sub(r"'/(site\.webmanifest)'", r"'./\1'", sw_content)

with open('sw.js', 'w', encoding='utf-8') as f:
    f.write(sw_content)
print("done sw.js")

