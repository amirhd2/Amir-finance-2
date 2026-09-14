with open('src/App.jsx', 'r') as f:
    content = f.read()

target = """                if (window.requestNotificationPermission) {
                  const token = await window.requestNotificationPermission();
                  if (token) {
                    if (typeof window.showToast === 'function') window.showToast('اعلان‌ها با موفقیت فعال شدند');
                    else alert('اعلان‌ها با موفقیت فعال شدند');
                  } else {
                    if (typeof window.showToast === 'function') window.showToast('دسترسی اعلان رد شد یا خطایی رخ داد');
                    else alert('دسترسی اعلان رد شد یا خطایی رخ داد');
                  }
                } else {
                  alert('امکان فعال‌سازی اعلان در این نسخه پشتیبانی نمی‌شود');
                }"""

replacement = """                if (window.requestNotificationPermission) {
                  const token = await window.requestNotificationPermission();
                  if (token) {
                    showToast('اعلان‌ها با موفقیت فعال شدند');
                  } else {
                    showToast('دسترسی اعلان رد شد یا خطایی رخ داد');
                  }
                } else {
                  showToast('امکان فعال‌سازی اعلان در این نسخه پشتیبانی نمی‌شود');
                }"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.jsx', 'w') as f:
        f.write(content)
    print("Fixed toast calls")
else:
    print("Target not found")
