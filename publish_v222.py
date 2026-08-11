import json, re

# 1. Update version.json
vdata = {
  "appName": "Amir Finance",
  "appLogo": "apple-touch-icon.png",
  "installedVersion": "2.2.2",
  "buildNumber": 212,
  "releaseDate": "2026-08-11",
  "releaseChannel": "Stable",
  "channelLabel": "نسخه پایدار",
  "latestVersion": "2.2.2",
  "latestBuild": 212,
  "isUpdateAvailable": False,
  "history": [
    {
      "version": "2.2.2",
      "buildNumber": 212,
      "releaseDate": "2026-08-11",
      "releaseChannel": "Stable",
      "commitHash": "v222rel",
      "commitMessage": "feat: official release 2.2.2 with app icons, leather wallet splash screen, and card gestures",
      "changes": [
        "ارتقاء و پیاده‌سازی آیکون رسمی برنامه برای اندروید و iOS (طرح ۳بعدی سکه طلایی با نماد A و نمودار رشد)",
        "بازسازی کامل اسپلش اسکرین با تصویر باکیفیت کیف چرمی و کارت‌های اعتباری و رفع مشکل صفحه سیاه",
        "بهبود انیمیشن بازگشت و لمس بیرون کارت‌ها (بستن خودکار کارت‌های بازشده با لمس خارج از کارت)",
        "بازگردانی و بهبود بخش تاریخچه تغییرات و نسخه‌ها (Changelog) در تنظیمات"
      ]
    },
    {
      "version": "2.2.1",
      "buildNumber": 211,
      "releaseDate": "2026-08-11",
      "releaseChannel": "Stable",
      "commitHash": "v221rel",
      "commitMessage": "fix & feat: fix black splash screen with leather wallet theme and improve card back animations",
      "changes": [
        "بازسازی کامل اسپلش اسکرین با تصویر باکیفیت کیف چرمی و کارت‌های اعتباری و رفع مشکل صفحه سیاه",
        "بهبود انیمیشن بازگشت و لمس بیرون کارت‌ها (بستن خودکار کارت‌های بازشده با لمس خارج از کارت)",
        "رفع مشکل عدم نمایش کامل گزینه‌ها در برخی بخش‌ها"
      ]
    }
  ]
}

with open('version.json', 'w', encoding='utf-8') as f:
    json.dump(vdata, f, ensure_ascii=False, indent=2)

print("Updated version.json successfully")

# 2. Update src/App.jsx
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_jsx = f.read()

# Update EMBEDDED_BUILD and EMBEDDED_VERSION
app_jsx = app_jsx.replace('const EMBEDDED_BUILD = 211;', 'const EMBEDDED_BUILD = 212;')
app_jsx = app_jsx.replace('const EMBEDDED_VERSION = "2.2.1";', 'const EMBEDDED_VERSION = "2.2.2";')

# Update defaultVersionData fields
app_jsx = app_jsx.replace(
    'installedVersion: localStorage.getItem(\'amir_installed_version\') || "2.2.1",',
    'installedVersion: localStorage.getItem(\'amir_installed_version\') || "2.2.2",'
)
app_jsx = app_jsx.replace(
    'buildNumber: parseInt(localStorage.getItem(\'amir_installed_build\') || \'211\', 10),',
    'buildNumber: parseInt(localStorage.getItem(\'amir_installed_build\') || \'212\', 10),'
)
app_jsx = app_jsx.replace('latestVersion: "2.2.1",', 'latestVersion: "2.2.2",')
app_jsx = app_jsx.replace('latestBuild: 210,', 'latestBuild: 212,')
app_jsx = app_jsx.replace('latestBuild: 211,', 'latestBuild: 212,')

# Insert new entries at the top of defaultVersionData.history
old_history_start = 'history: ['
new_history_start = """history: [
                    {
                        version: "2.2.2",
                        buildNumber: 212,
                        releaseDate: "2026-08-11",
                        releaseChannel: "Stable",
                        commitHash: "v222rel",
                        commitMessage: "feat: official release 2.2.2 with app icons, leather wallet splash screen, and card gestures",
                        changes: [
                            "ارتقاء و پیاده‌سازی آیکون رسمی برنامه برای اندروید و iOS (طرح ۳بعدی سکه طلایی با نماد A و نمودار رشد)",
                            "بازسازی کامل اسپلش اسکرین با تصویر باکیفیت کیف چرمی و کارت‌های اعتباری و رفع مشکل صفحه سیاه",
                            "بهبود انیمیشن بازگشت و لمس بیرون کارت‌ها (بستن خودکار کارت‌های بازشده با لمس خارج از کارت)",
                            "بازگردانی و بهبود بخش تاریخچه تغییرات و نسخه‌ها (Changelog) در تنظیمات"
                        ]
                    },
                    {
                        version: "2.2.1",
                        buildNumber: 211,
                        releaseDate: "2026-08-11",
                        releaseChannel: "Stable",
                        commitHash: "v221rel",
                        commitMessage: "fix & feat: fix black splash screen with leather wallet theme and improve card back animations",
                        changes: [
                            "بازسازی کامل اسپلش اسکرین با تصویر باکیفیت کیف چرمی و کارت‌های اعتباری و رفع مشکل صفحه سیاه",
                            "بهبود انیمیشن بازگشت و لمس بیرون کارت‌ها (بستن خودکار کارت‌های بازشده با لمس خارج از کارت)",
                            "رفع مشکل عدم نمایش کامل گزینه‌ها در برخی بخش‌ها"
                        ]
                    },"""

if old_history_start in app_jsx:
    app_jsx = app_jsx.replace(old_history_start, new_history_start, 1)
    print("Inserted v2.2.2 into defaultVersionData.history in src/App.jsx")
else:
    print("Could not find old_history_start in src/App.jsx")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app_jsx)

