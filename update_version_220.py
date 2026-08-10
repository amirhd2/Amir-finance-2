import json
import re

# 1. Update version.json
with open('version.json', 'r', encoding='utf-8') as f:
    vdata = json.load(f)

new_version = "2.2.0"
new_build = 210
release_date = "2026-08-10"

vdata["installedVersion"] = new_version
vdata["latestVersion"] = new_version
vdata["buildNumber"] = new_build
vdata["latestBuild"] = new_build
vdata["releaseDate"] = release_date
vdata["releaseChannel"] = "Stable"
vdata["channelLabel"] = "نسخه پایدار"
vdata["isUpdateAvailable"] = False

# New history entry for v2.2.0
new_entry = {
    "version": new_version,
    "buildNumber": new_build,
    "releaseDate": release_date,
    "releaseChannel": "Stable",
    "commitHash": "v220rel",
    "commitMessage": "fix & release: resolve GitHub Pages 404 on update reload, restore swipe-to-delete morph animation, release v2.2.0 (build 210)",
    "changes": [
        "رفع کامل خطای 404 در گیتهاب پیجز هنگام زدن دکمه بروزرسانی با اصلاح مسیر بازخوانی صفحه (Navigation URL Path)",
        "بازگردانی و تنظیم دقیق انیمیشن مورفینگ سوایپ برای پاک کردن (تبدیل آیکون دایره به مستطیل با کشیده شدن کارت)",
        "ثبت رسمی و انتشار نسخه جدید 2.2.0 (بیلد 210)"
    ]
}

# Ensure v2.2.0 is at the top of history
if not any(h.get("version") == new_version for h in vdata.get("history", [])):
    vdata["history"].insert(0, new_entry)
else:
    for i, h in enumerate(vdata["history"]):
        if h.get("version") == new_version:
            vdata["history"][i] = new_entry
            break

with open('version.json', 'w', encoding='utf-8') as f:
    json.dump(vdata, f, ensure_ascii=False, indent=2)

print("version.json updated to 2.2.0!")

# 2. Update src/App.jsx
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_code = f.read()

# Update handleApplyUpdate reload logic
old_reload = "window.location.href = '/?v=' + Date.now();"
new_reload = """const currentUrl = new URL(window.location.href);
                        currentUrl.searchParams.set('v', Date.now().toString());
                        window.location.replace(currentUrl.toString());"""

if old_reload in app_code:
    app_code = app_code.replace(old_reload, new_reload)
    print("Replaced reload logic in App.jsx!")

# Update EMBEDDED_BUILD & EMBEDDED_VERSION
app_code = re.sub(
    r'const EMBEDDED_BUILD = \d+;',
    f'const EMBEDDED_BUILD = {new_build};',
    app_code
)
app_code = re.sub(
    r'const EMBEDDED_VERSION = "[^"]+";',
    f'const EMBEDDED_VERSION = "{new_version}";',
    app_code
)

# Update defaultVersionData in App.jsx
app_code = re.sub(
    r'installedVersion: localStorage\.getItem\(\'amir_installed_version\'\) \|\| "[^"]+"',
    f'installedVersion: localStorage.getItem(\'amir_installed_version\') || "{new_version}"',
    app_code
)
app_code = re.sub(
    r'buildNumber: parseInt\(localStorage\.getItem\(\'amir_installed_build\'\) \|\| \'\d+\', 10\)',
    f'buildNumber: parseInt(localStorage.getItem(\'amir_installed_build\') || \'{new_build}\', 10)',
    app_code
)
app_code = re.sub(
    r'latestVersion: "[^"]+"',
    f'latestVersion: "{new_version}"',
    app_code,
    count=1
)
app_code = re.sub(
    r'latestBuild: \d+',
    f'latestBuild: {new_build}',
    app_code,
    count=1
)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("src/App.jsx updated to 2.2.0 and fixed update redirect!")
