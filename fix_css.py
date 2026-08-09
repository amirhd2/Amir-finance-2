import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

target = """        @keyframes txHighlightBlink {
            0%, 100% {
                background-color: transparent;
                box-shadow: none;
                transform: scale(1);
            }
            15%, 55% {
                background-color: rgba(99, 102, 241, 0.28);
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.65), 0 10px 25px -4px rgba(99, 102, 241, 0.4);
                transform: scale(1.025);
            }
            35%, 75% {
                background-color: rgba(245, 158, 11, 0.32);
                box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.65), 0 10px 25px -4px rgba(245, 158, 11, 0.4);
                transform: scale(1.025);
            }
        }
        .tx-highlight-blink {
            animation: txHighlightBlink 0.65s ease-in-out 3;
            border-radius: 1rem;
        }"""

replacement = """        @keyframes txHighlightBlink {
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

if target in content:
    content = content.replace(target, replacement)
    print("Replaced CSS")
else:
    print("CSS target not found")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
