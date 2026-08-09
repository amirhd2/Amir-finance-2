import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

target = """        @keyframes txHighlightBlink {
            0% {
                background-color: transparent;
                box-shadow: none;
                transform: scale(1);
            }
            15% {
                background-color: rgba(99, 102, 241, 0.12);
                box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.3), 0 4px 12px rgba(99, 102, 241, 0.15);
                transform: scale(1.01);
            }
            100% {
                background-color: transparent;
                box-shadow: none;
                transform: scale(1);
            }
        }
        .tx-highlight-blink {
            animation: txHighlightBlink 1.5s ease-out forwards;
            border-radius: 1rem;
        }"""

replacement = """        @keyframes txHighlightBlink {
            0% {
                background-color: rgba(99, 102, 241, 0.15);
            }
            100% {
                background-color: transparent;
            }
        }
        .tx-highlight-blink {
            animation: txHighlightBlink 1.2s ease-out forwards;
            border-radius: 1rem;
        }"""

if target in content:
    content = content.replace(target, replacement)
    print("Replaced CSS")
else:
    print("CSS target not found")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
