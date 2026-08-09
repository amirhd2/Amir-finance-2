import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """            const pageSlideVariants = {
                initial: (direction) => ({
                    x: direction === 'none' ? '0%' : (direction === 'back' ? '-28%' : '100%'),
                    opacity: 1,
                }),
                animate: (direction) => ({
                    x: '0%',
                    opacity: 1,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.36,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }),
                exit: (direction) => ({
                    x: direction === 'none' ? '0%' : (direction === 'back' ? '100%' : '-28%'),
                    opacity: 1,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.36,
                        ease: [0.22, 1, 0.36, 1]
                    }
                })
            };"""

replacement = """            const pageSlideVariants = {
                initial: (direction) => ({
                    x: direction === 'none' ? '0%' : (direction === 'back' ? '30vw' : '-100vw'),
                    opacity: 1,
                }),
                animate: (direction) => ({
                    x: '0vw',
                    opacity: 1,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1]
                    }
                }),
                exit: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '-100vw' : '30vw'),
                    opacity: direction === 'none' ? 1 : (direction === 'back' ? 1 : 0.8),
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1]
                    }
                })
            };"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced variants")
else:
    print("Not found variants")
