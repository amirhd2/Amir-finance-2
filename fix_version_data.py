import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

app = app.replace(
'''            // Application Version Management State
            const defaultVersionData = {
                appName: "Amir Finance",
                appLogo: "apple-touch-icon.png",
                installedVersion: localStorage.getItem('amir_installed_version') || "2.2.0",
                buildNumber: parseInt(localStorage.getItem('amir_installed_build') || '210', 10),
                releaseDate: "2026-08-07",
                releaseChannel: "Stable",
                channelLabel: "نسخه پایدار",
                latestVersion: "2.2.0",''',
'''            // Application Version Management State
            const defaultVersionData = {
                appName: "Amir Finance",
                appLogo: "apple-touch-icon.png",
                installedVersion: localStorage.getItem('amir_installed_version') || "2.2.1",
                buildNumber: parseInt(localStorage.getItem('amir_installed_build') || '211', 10),
                releaseDate: "2026-08-11",
                releaseChannel: "Stable",
                channelLabel: "نسخه پایدار",
                latestVersion: "2.2.1",''')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

print("Updated versions in App.jsx!")
