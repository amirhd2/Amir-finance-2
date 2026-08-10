import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """            const pageSlideVariants = {
                initial: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '-30vw' : '100vw'),
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
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '100vw' : '-30vw'),
                    opacity: direction === 'none' ? 0 : (direction === 'back' ? 1 : 0.8),
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1]
                    }
                })
            };"""

replacement = """            const pageSlideVariants = {
                initial: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '-100vw' : '100vw'),
                    opacity: 1,
                }),
                animate: (direction) => ({
                    x: '0vw',
                    opacity: 1,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }),
                exit: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '100vw' : '-100vw'),
                    opacity: direction === 'none' ? 0 : 1,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                    }
                })
            };"""

content = content.replace(target, replacement)

# Change setTimeout in SwipeBackWrapper's closePage
content = content.replace("setTimeout(finishBack, 280);", "setTimeout(finishBack, 500);")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
