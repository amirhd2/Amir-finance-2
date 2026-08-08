import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """                                                                animate={{ 
                                                                    opacity: isOtherCardBlur ? 0.35 : 1, 
                                                                    scale: isEditingThis ? 1.0 : (isOtherCardBlur ? 0.95 : 0.98),
                                                                    y: 0
                                                                }}"""

replacement = """                                                                animate={{ 
                                                                    opacity: isOtherCardBlur ? 0.6 : 1, 
                                                                    scale: isEditingThis ? 1.0 : (isOtherCardBlur ? 0.95 : 0.98),
                                                                    y: 0
                                                                }}"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Adjusted opacity.")
else:
    print("Target not found.")

