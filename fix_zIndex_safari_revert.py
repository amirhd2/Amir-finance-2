import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_style = """style={{
                                                                top: `${12 + index * 8}px`,
                                                                zIndex: isEditingThis ? 50 : (isOtherCardBlur ? index : 10 + index),
                                                                transform: isEditingThis ? 'translateZ(1px)' : 'translateZ(0px)',
                                                                isolation: 'isolate'
                                                            }}"""
new_style = """style={{
                                                                top: `${12 + index * 8}px`,
                                                                zIndex: isEditingThis ? 50 : (isOtherCardBlur ? index : 10 + index)
                                                            }}"""
content = content.replace(old_style, new_style)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Reverted inline transform")
