import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_animate = """animate={{ 
                                                                opacity: isOtherCardBlur ? 0.35 : 1, 
                                                                scale: isEditingThis ? 1.0 : (isOtherCardBlur ? 0.95 : 0.98),
                                                                y: 0 
                                                            }}"""
new_animate = """animate={{ 
                                                                opacity: isOtherCardBlur ? 0.35 : 1, 
                                                                scale: isEditingThis ? 1.0 : (isOtherCardBlur ? 0.95 : 0.98),
                                                                y: 0,
                                                                z: isEditingThis ? 10 : 0
                                                            }}"""
content = content.replace(old_animate, new_animate)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied framer motion z")
