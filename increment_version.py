import json

with open('package.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# The user explicitly asked for version 2.1.8
data['version'] = '2.1.8'

with open('package.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

with open('public/version.json', 'w', encoding='utf-8') as f:
    json.dump({"version": "2.1.8"}, f)
