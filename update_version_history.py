import json

with open('version.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Create a new version entry
new_version = {
  "version": "2.1.9",
  "buildNumber": data['history'][0]['buildNumber'] + 1,
  "releaseDate": "2026-08-09",
  "releaseChannel": "Stable",
  "commitHash": "v219rel",
  "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
  "changes": [
    "حل ریشه‌ای مشکل اسکیپ شدن انیمیشن راست به چپ هنگام باز کردن صفحات داخلی (مانند جزئیات مخاطب و تراکنش‌ها)",
    "همگام‌سازی رنگ status bar در دستگاه‌های موبایل هنگام باز بودن پنجره‌های کارت استک و کارت‌های استیکی با پس‌زمینه تیره آن‌ها"
  ]
}

data['history'].insert(0, new_version)

with open('version.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

with open('public/version.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
