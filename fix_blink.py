import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """                exit: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '100vw' : '-30vw'),
                    opacity: direction === 'none' ? 1 : (direction === 'back' ? 1 : 0.8),
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1]
                    }
                })"""

replacement = """                exit: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '100vw' : '-30vw'),
                    opacity: direction === 'none' ? 0 : (direction === 'back' ? 1 : 0.8),
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1]
                    }
                })"""

if target in content:
    content = content.replace(target, replacement)
    print("Replaced opacity for blink fix")
else:
    print("Not found exit variants")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
