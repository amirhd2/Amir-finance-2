import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_css = """@keyframes cardFallDownNext {
            0% {
                transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
                opacity: 1;
            }
            30% {
                transform: translate3d(8px, -15px, 0) scale(1.02) rotate(3deg);
                opacity: 1;
            }
            100% {
                transform: translate3d(-15px, 300px, 0) scale(0.75) rotate(-6deg);
                opacity: 0;
            }
        }

        .card-exit-to-back, .animating-next {
            animation: cardFallDownNext 0.85s cubic-bezier(0.25, 0.1, 0.25, 1) forwards !important;
            z-index: 150 !important;
            pointer-events: none !important;
            will-change: transform, opacity !important;
            transform-origin: top center;
        }

        .card-enter-from-back, .animating-prev {
            animation: cardFallDownNext 0.75s cubic-bezier(0.25, 0.1, 0.25, 1) reverse forwards !important;
            z-index: 200 !important;
            pointer-events: none !important;
            will-change: transform, opacity !important;
            transform-origin: top center;
        }"""

pattern = re.compile(r'@keyframes cardFallDownNext \{.*?.card-enter-from-back, .animating-prev \{.*?\}', re.DOTALL)
content = pattern.sub(new_css, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
