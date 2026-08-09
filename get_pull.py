with open('src/App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start = -1
for i, line in enumerate(lines):
    if "function PullToRefresh(" in line:
        start = i
        break

if start != -1:
    print("".join(lines[start+180:start+220]))
