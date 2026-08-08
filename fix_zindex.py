import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace animate block
old_animate = """animate={{ 
                                                                opacity: isOtherCardBlur ? 0.35 : 1, 
                                                                scale: isEditingThis ? 1.0 : (isOtherCardBlur ? 0.95 : 0.98),
                                                                y: 0 
                                                            }}"""
new_animate = """animate={{ 
                                                                opacity: isOtherCardBlur ? 0.35 : 1, 
                                                                scale: isEditingThis ? 1.0 : (isOtherCardBlur ? 0.95 : 0.98),
                                                                y: 0,
                                                                zIndex: isEditingThis ? 40 : 10 + index
                                                            }}"""

# Replace style block
old_style = """style={{
                                                                top: `${12 + index * 8}px`,
                                                                zIndex: isEditingThis ? 40 : 10 + index
                                                            }}"""
new_style = """style={{
                                                                top: `${12 + index * 8}px`
                                                            }}"""

content = content.replace(old_animate, new_animate)
content = content.replace(old_style, new_style)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
