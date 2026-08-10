import re
import os

files = ['manifest.webmanifest', 'site.webmanifest']

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace "/icon-..." with "./icon-..." etc
        content = re.sub(r'"src":\s*"/([^"]+)"', r'"src": "./\1"', content)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"done {file}")
