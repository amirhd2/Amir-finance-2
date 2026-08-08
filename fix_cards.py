import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove 'layout' from the sticky-card
content = content.replace('id={`sticky-card-${card.id}`}\\n                                                            layout', 'id={`sticky-card-${card.id}`}')

# Fix animate block (remove zIndex)
old_animate = """animate={{ 
                                                                opacity: isOtherCardBlur ? 0.35 : 1, 
                                                                scale: isEditingThis ? 1.0 : (isOtherCardBlur ? 0.95 : 0.98),
                                                                y: 0,
                                                                zIndex: isEditingThis ? 40 : 10 + index
                                                            }}"""
new_animate = """animate={{ 
                                                                opacity: isOtherCardBlur ? 0.35 : 1, 
                                                                scale: isEditingThis ? 1.0 : (isOtherCardBlur ? 0.95 : 0.98),
                                                                y: 0 
                                                            }}"""
content = content.replace(old_animate, new_animate)

# Fix style block (add zIndex)
old_style = """style={{
                                                                top: `${12 + index * 8}px`
                                                            }}"""
new_style = """style={{
                                                                top: `${12 + index * 8}px`,
                                                                zIndex: isEditingThis ? 40 : 10 + index
                                                            }}"""
content = content.replace(old_style, new_style)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
