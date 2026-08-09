import json

with open('version.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update the latest history entry with the new fix
if "اصلاح پرش افقی (Bounce) انیمیشن در هنگام اسکرول خودکار به تراکنش انتخاب شده و اصلاح انیمیشن دوگانه" not in data['history'][0]['changes']:
    data['history'][0]['changes'].append("اصلاح پرش افقی (Bounce) انیمیشن در هنگام اسکرول خودکار به تراکنش انتخاب شده و اصلاح انیمیشن دوگانه")

with open('version.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

with open('public/version.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
