import json

with open('version.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['installedVersion'] = "2.1.9"
data['latestVersion'] = "2.1.9"
data['buildNumber'] = 208
data['latestBuild'] = 208

with open('version.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

with open('public/version.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
