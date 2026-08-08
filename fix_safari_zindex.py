import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """                                                        <div 
                                                            key={card.id}
                                                            id={`sticky-card-${card.id}`}
                                                            className="sticky w-[96%] max-w-md mx-auto"
                                                            style={{
                                                                top: `${12 + index * 8}px`,
                                                                zIndex: isEditingThis ? 50 : (isOtherCardBlur ? index : 10 + index)
                                                            }}
                                                        >"""

replacement = """                                                        <div 
                                                            key={card.id}
                                                            id={`sticky-card-${card.id}`}
                                                            className={`sticky w-[96%] max-w-md mx-auto isolate ${isEditingThis ? 'z-[100]' : 'z-0'}`}
                                                            style={{
                                                                top: `${12 + index * 8}px`,
                                                                zIndex: isEditingThis ? 100 : index,
                                                                transform: isEditingThis ? 'translate3d(0,0,1px)' : 'translate3d(0,0,0)',
                                                                WebkitTransform: isEditingThis ? 'translate3d(0,0,1px)' : 'translate3d(0,0,0)'
                                                            }}
                                                        >"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced target.")
else:
    print("Target not found.")

