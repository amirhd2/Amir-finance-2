with open('src/App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "function SwipeBackWrapper(" in line:
        print("".join(lines[i:i+60]))
        break
