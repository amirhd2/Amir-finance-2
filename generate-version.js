import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const VERSION_FILE = path.join(process.cwd(), 'version.json');

// Map commit types to Persian/English end-user release note transformations
function convertCommitToReleaseNote(commitMsg) {
  const cleanMsg = commitMsg.trim();
  
  if (/^fix:\s*/i.test(cleanMsg)) {
    const detail = cleanMsg.replace(/^fix:\s*/i, '');
    if (/wheel picker/i.test(detail)) return "بهبود روان‌سازی انتخابی تاریخ و اعداد (Wheel Picker)";
    if (/loan/i.test(detail)) return "رفع خطا و تصحیح محاسبات اقساط و پرونده‌های وام";
    if (/keyboard/i.test(detail)) return "ارتقاء عملکرد کیبورد و بسته شدن خودکار فرم‌ها";
    if (/gesture|swipe/i.test(detail)) return "تصحیح و روان‌سازی ژست حرکتی بازگشت (Swipe Back)";
    return `رفع خطا و بهبود پایداری: ${detail}`;
  }

  if (/^feat:\s*/i.test(cleanMsg)) {
    const detail = cleanMsg.replace(/^feat:\s*/i, '');
    if (/version/i.test(detail)) return "افزودن سیستم هوشمند مدیریت نسخه و تاریخچه بروزرسانی‌ها";
    if (/report/i.test(detail)) return "افزودن بخش جدید گزارشات و نمودارهای مالی";
    if (/swipe/i.test(detail)) return "افزودن ناوبری ژست حرکتی بازگشت به سبک iOS";
    return `ویژگی جدید: ${detail}`;
  }

  if (/^perf:\s*/i.test(cleanMsg)) {
    const detail = cleanMsg.replace(/^perf:\s*/i, '');
    if (/fab|animation/i.test(detail)) return "افزایش روانی و نرخ فریم انیمیشن‌های برنامه (FAB & Motion)";
    return `بهبود سرعت و روانی: ${detail}`;
  }

  if (/^refactor:\s*/i.test(cleanMsg)) {
    return "بهبود زیرساخت و معماری داخلی برنامه";
  }

  return cleanMsg;
}

export function updateVersionData(newCommitMessage = null, commitType = 'patch', channel = 'Stable') {
  let data = {
    appName: "Amir Finance",
    appLogo: "/apple-touch-icon.png",
    installedVersion: "1.1.0",
    buildNumber: 128,
    releaseDate: new Date().toISOString().split('T')[0],
    releaseChannel: channel,
    channelLabel: channel === 'Stable' ? 'نسخه پایدار' : channel,
    latestVersion: "1.1.0",
    isUpdateAvailable: false,
    history: []
  };

  if (fs.existsSync(VERSION_FILE)) {
    try {
      data = JSON.parse(fs.readFileSync(VERSION_FILE, 'utf8'));
    } catch (e) {
      console.error('Error reading version.json:', e);
    }
  }

  if (newCommitMessage) {
    const newBuildNumber = (data.buildNumber || 128) + 1;
    let [major, minor, patch] = (data.installedVersion || "1.1.0").split('.').map(Number);

    if (commitType === 'major') {
      major += 1;
      minor = 0;
      patch = 0;
    } else if (commitType === 'minor') {
      minor += 1;
      patch = 0;
    } else {
      patch += 1;
    }

    const newVersion = `${major}.${minor}.${patch}`;
    const releaseNote = convertCommitToReleaseNote(newCommitMessage);

    const newHistoryEntry = {
      version: newVersion,
      buildNumber: newBuildNumber,
      releaseDate: new Date().toISOString().split('T')[0],
      releaseChannel: channel,
      commitHash: Math.random().toString(36).substring(2, 9),
      commitMessage: newCommitMessage,
      changes: [releaseNote]
    };

    data.installedVersion = newVersion;
    data.latestVersion = newVersion;
    data.buildNumber = newBuildNumber;
    data.releaseDate = newHistoryEntry.releaseDate;
    data.releaseChannel = channel;
    data.channelLabel = channel === 'Stable' ? 'نسخه پایدار' : channel;
    data.isUpdateAvailable = false;
    data.history.unshift(newHistoryEntry);

    fs.writeFileSync(VERSION_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated version to ${newVersion} (Build ${newBuildNumber})`);
  }

  return data;
}

// Run standalone if called directly with custom commit message
if (process.argv[1] && process.argv[1].endsWith('generate-version.js')) {
  const customMsg = process.argv[2];
  if (customMsg) {
    const commitType = process.argv[3] || 'patch';
    updateVersionData(customMsg, commitType);
  } else {
    console.log('generate-version: keeping current version data');
  }
}
