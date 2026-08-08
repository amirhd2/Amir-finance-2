import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r'const iosModalVariants = \{.*?\};\n'
replacement = """const iosModalVariants = {
            initial: { opacity: 0, scale: 0.95 },
            animate: { 
                opacity: 1, 
                scale: 1,
                transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    opacity: { duration: 0.15 }
                } 
            },
            exit: { 
                opacity: 0, 
                scale: 0.95, 
                transition: { duration: 0.2, ease: "easeIn" } 
            }
        };
"""

content = re.sub(pattern, replacement, content, flags=re.DOTALL)
with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Replaced with regex")
