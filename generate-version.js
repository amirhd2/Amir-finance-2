import fs from 'fs';
import path from 'path';

const versionPath = path.join(process.cwd(), 'version.json');
const pkgPath = path.join(process.cwd(), 'package.json');

let pkgVersion = '3.3.0';
if (fs.existsSync(pkgPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (pkg.version) pkgVersion = pkg.version;
  } catch (e) {}
}

const CURRENT_CHANGELOG = {
  "3.3.0": {
    commitMessage: "feat: release version 3.3.0 with robust activity-driven Google Drive token renewal and smart numeric keyboard stability",
    changes: [
      "حل ریشه‌ای و دائمی مشکل انقضای توکن گوگل درایو پس از چند ساعت عدم فعالیت با مکانیسم تجدید خودکار پیش‌دستانه (Activity-Driven Token Renewal) در هنگام تعامل با صفحه و عملیات Pull-to-Refresh",
      "رفع مشکل بسته شدن ناخواسته کیبورد عددی هوشمند هنگام تایپ و بهبود پایداری آن روی تمامی فیلدهای عددی، تلفن و شبا",
      "انتشار رسمی نسخه ۳.۳.۰"
    ]
  },
  "3.2.9": {
    commitMessage: "feat: persistent google drive authentication with silent background token renewal, redesign google drive sync card in settings, fix delete-all-data confirmation dialog & database reset, release v3.2.9",
    changes: [
      "حفظ دائمی نشست اتصال گوگل درایو و تمدید خودکار و نامحسوس توکن در پس‌زمینه بدون نیاز به ورود مجدد بعد از ۲ یا ۳ ساعت",
      "بازطراحی و ارتقای بخش همگام‌سازی ابری گوگل درایو در تنظیمات با کارت مدرن، نشانگر وضعیت فعال و دکمه‌های کنترل سریع",
      "رفع کامل مشکل عدم باز شدن کادر تایید و اجرای قطعی دکمه «حذف کلیه اطلاعات» و پاکسازی کامل دیتابیس",
      "اتصال یکپارچه پنجره سراسری تایید عملیات (GlobalConfirmDialog) برای پاکسازی داده‌ها و قطع اتصال حساب ابری",
      "انتشار رسمی نسخه 3.2.9"
    ]
  },
  "3.2.8": {
    commitMessage: "feat: comprehensive contact photo & loan icon backup audit, enhanced loan icon catalog with 90+ categorized icons, and release v3.2.8",
    changes: [
      "بررسی جامع و اعتبارسنجی ۱۰۰٪ جریان‌های پشتیبان‌گیری، بازیابی و حذف داده برای تصاویر مخاطبین و آیکون‌های وام",
      "توسعه اساسی پالت آیکون‌های وام به بیش از ۹۰ آیکون متنوع و تخصصی با دسته‌بندی موضوعی (بانکی، نقلیه، مسکن، خرید، کار، خانواده و عمومی)",
      "افزودن قابلیت جستجوی زنده در موضوعات و کلمات کلیدی آیکون‌های وام",
      "اصلاح و جایگزینی کامل آیکون خالی/سفید با آیکون‌های استاندارد Lucide",
      "بهبود هماهنگی نام‌گذاری ۳ خطی تراکنش‌ها و ارتقای یکپارچه به نسخه 3.2.8"
    ]
  }
};

let vData = {
  appName: "Amir Finance",
  appLogo: "apple-touch-icon.png",
  installedVersion: pkgVersion,
  buildNumber: 462,
  releaseDate: new Date().toISOString().split('T')[0],
  releaseChannel: "Stable",
  channelLabel: "نسخه پایدار",
  latestVersion: pkgVersion,
  latestBuild: 462,
  isUpdateAvailable: false,
  history: []
};

if (fs.existsSync(versionPath)) {
  try {
    const existing = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
    const nextBuild = Math.max(462, (existing.buildNumber || 460) + 1);
    vData = {
      ...vData,
      ...existing,
      installedVersion: pkgVersion,
      latestVersion: pkgVersion,
      buildNumber: nextBuild,
      latestBuild: nextBuild,
      releaseDate: new Date().toISOString().split('T')[0],
      isUpdateAvailable: false
    };

    let existingHistory = Array.isArray(existing.history) ? existing.history : [];
    if (existingHistory.length === 0 && Array.isArray(existing.versionHistory)) {
      existingHistory = existing.versionHistory;
    }

    // Filter out entries that match the current version to put the fresh entry at the top
    const otherHistory = existingHistory.filter(h => h.version !== pkgVersion);

    // Make sure 3.2.8 is in otherHistory if not present
    if (!otherHistory.some(h => h.version === '3.2.8')) {
      otherHistory.unshift({
        version: "3.2.8",
        buildNumber: 458,
        releaseDate: "2026-08-27",
        releaseChannel: "Stable",
        commitHash: "v328b458",
        commitMessage: CURRENT_CHANGELOG["3.2.8"].commitMessage,
        changes: CURRENT_CHANGELOG["3.2.8"].changes
      });
    }

    const currentDetails = CURRENT_CHANGELOG[pkgVersion] || {
      commitMessage: `release version ${pkgVersion}`,
      changes: [`انتشار رسمی نسخه ${pkgVersion}`]
    };

    vData.history = [
      {
        version: pkgVersion,
        buildNumber: vData.buildNumber,
        releaseDate: vData.releaseDate,
        releaseChannel: "Stable",
        commitHash: `v${pkgVersion.replace(/\./g, '')}b${vData.buildNumber}`,
        commitMessage: currentDetails.commitMessage,
        changes: currentDetails.changes
      },
      ...otherHistory
    ];
  } catch (e) {
    console.warn('Could not read version.json, creating clean one', e);
  }
}

fs.writeFileSync(versionPath, JSON.stringify(vData, null, 2), 'utf8');
console.log(`[generate-version] Updated version to ${vData.installedVersion} (Build ${vData.buildNumber})`);

