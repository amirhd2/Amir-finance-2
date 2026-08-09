with open('src/App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "case 'archived-period-detail':" in line:
        print("".join(lines[i:i+40]))
        break
