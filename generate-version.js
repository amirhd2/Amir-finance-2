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
  buildNumber: 330,
  releaseDate: new Date().toISOString().split('T')[0],
  releaseChannel: "Stable",
  channelLabel: "نسخه پایدار",
  latestVersion: pkgVersion,
  latestBuild: 330,
  isUpdateAvailable: false,
  history: [
    {
      version: pkgVersion,
      buildNumber: 350,
      releaseDate: new Date().toISOString().split('T')[0],
      releaseChannel: "Stable",
      commitHash: "v3120stable",
      commitMessage: "fix: prevent entire page horizontal shift during swipe-to-delete",
      changes: [
        "رفع کامل جابجایی افقی کل صفحه هنگام سوایپ کارت‌ها برای حذف در موبایل",
        "محدودسازی و کانتینمنت دقیق محدوده ترنسفرم کارت با overflow-hidden و rounded-2xl",
        "اصلاح و جایگزینی جامع overflow-x: hidden در تمام تب‌ها، صفحات و پنجره‌های اسکرول",
        "بهبود رویدادهای لمسی و جلوگیری از انتشار ناخواسته رویداد سوایپ به کانتینر والد"
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
      buildNumber: Math.max(330, (existing.buildNumber || 329) + 1),
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
          commitMessage: "feat: redesign dashboard header layout and update to version 3.2.0",
          changes: [
            "بازطراحی مدرن و خلوت هدر داشبورد: چینش برند Amir Finance و نسخه در سمت چپ، خوش‌آمدگویی و تاریخ در سمت راست",
            "کاهش و بهینه‌سازی فاصله استاتوس بار با هدر صفحه داشبورد",
            "حذف آیکون زنگوله اعلان‌ها جهت ساده‌سازی و زیبایی بصری هدر",
            "تراز وسط تاریخ نسبت به متن خوش‌آمدگویی در سمت راست هدر",
            "ارتقا به نسخه 3.2.0"
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
