import json

with open('version.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['installedVersion'] = '2.1.8'
data['latestVersion'] = '2.1.8'
data['history'][0]['version'] = '2.1.8'
data['history'][0]['changes'] = ["اصلاح مشکل فلش در پس‌زمینه در زمان بازگشت از جزئیات تراکنش به صفحه همه تراکنش‌ها"]

with open('version.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

with open('public/version.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
