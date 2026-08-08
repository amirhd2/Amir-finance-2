import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """        const iosModalVariants = {
            initial: { opacity: 0, scale: 0.75 },
            animate: { 
                opacity: [0, 1, 1, 1], 
                scale: [0.75, 1.05, 0.97, 1],
                transition: { 
                    duration: 0.45, 
                    times: [0, 0.65, 0.85, 1],
                    ease: [
                        [0.175, 0.885, 0.32, 1.275],
                        [0.175, 0.885, 0.32, 1.275],
                        [0.175, 0.885, 0.32, 1.275],
                    ] 
                } 
            },
            exit: { 
                opacity: 0, 
                scale: 0.75, 
                transition: { 
                    duration: 0.3, 
                    ease: ["easeOut", "easeInOut"] 
                } 
            }
        };"""

replacement = """        const iosModalVariants = {
            initial: { opacity: 0, scale: 0.9 },
            animate: { 
                opacity: 1, 
                scale: 1,
                transition: { 
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                    opacity: { duration: 0.2 }
                } 
            },
            exit: { 
                opacity: 0, 
                scale: 0.9, 
                transition: { 
                    duration: 0.2, 
                    ease: "easeIn" 
                } 
            }
        };"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced modal variants")
else:
    print("Target not found for modal variants")
