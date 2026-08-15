import fs from 'fs';
import path from 'path';

const versionPath = path.join(process.cwd(), 'version.json');
const pkgPath = path.join(process.cwd(), 'package.json');

let pkgVersion = '3.1.9';
if (fs.existsSync(pkgPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (pkg.version) pkgVersion = pkg.version;
  } catch (e) {}
}

let vData = {
  appName: "Amir Finance",
  appLogo: "apple-touch-icon.png",
  installedVersion: pkgVersion,
  buildNumber: 328,
  releaseDate: new Date().toISOString().split('T')[0],
  releaseChannel: "Stable",
  channelLabel: "نسخه پایدار",
  latestVersion: pkgVersion,
  latestBuild: 328,
  isUpdateAvailable: false,
  history: [
    {
      version: pkgVersion,
      buildNumber: 328,
      releaseDate: new Date().toISOString().split('T')[0],
      releaseChannel: "Stable",
      commitHash: "v319stable",
      commitMessage: "fix: universal viewport bottom gap fix and version synchronization",
      changes: [
        "حل ریشه‌ای و کامل مشکل جای خالی پایین صفحه در تمام مرورگرها و دیوایس‌ها",
        "همگام‌سازی دقیق نسخه نصب‌شده با سرور و بارگذاری سریع بدون نیاز به کش قدیمی",
        "تراز دقیق نوار ناوبری پایین صفحه با لبه استاندارد دستگاه",
        "بهینه‌سازی نهایی کارکرد آفلاین PWA"
      ]
    }
  ]
};

if (fs.existsSync(versionPath)) {
  try {
    const existing = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
    vData = {
      ...vData,
      ...existing,
      installedVersion: pkgVersion,
      latestVersion: pkgVersion,
      buildNumber: Math.max(328, (existing.buildNumber || 327) + 1),
      releaseDate: new Date().toISOString().split('T')[0],
      isUpdateAvailable: false
    };
    vData.latestBuild = vData.buildNumber;
    
    // Ensure current version is top of history
    if (Array.isArray(existing.history) && existing.history.length > 0) {
      const otherHistory = existing.history.filter(h => h.buildNumber !== vData.buildNumber && h.version !== pkgVersion);
      vData.history = [
        {
          version: pkgVersion,
          buildNumber: vData.buildNumber,
          releaseDate: vData.releaseDate,
          releaseChannel: "Stable",
          commitHash: `v${pkgVersion.replace(/\./g, '')}b${vData.buildNumber}`,
          commitMessage: "fix: universal viewport bottom gap fix and version synchronization",
          changes: [
            "حل ریشه‌ای و کامل مشکل جای خالی پایین صفحه در تمام مرورگرها و دیوایس‌ها",
            "همگام‌سازی دقیق نسخه نصب‌شده با سرور و بارگذاری سریع بدون نیاز به کش قدیمی",
            "تراز دقیق نوار ناوبری پایین صفحه با لبه استاندارد دستگاه",
            "بهینه‌سازی نهایی کارکرد آفلاین PWA"
          ]
        },
        ...otherHistory
      ];
    }
  } catch (e) {
    console.warn('Could not read version.json, creating clean one');
  }
}

fs.writeFileSync(versionPath, JSON.stringify(vData, null, 2), 'utf8');
console.log(`[generate-version] Updated version to ${vData.installedVersion} (Build ${vData.buildNumber})`);
