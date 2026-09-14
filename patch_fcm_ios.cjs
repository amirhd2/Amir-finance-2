const fs = require('fs');
let code = fs.readFileSync('fcm-client.js', 'utf8');

const target = "const permission = await Notification.requestPermission();";
const replacement = `if (!('Notification' in window)) {
      alert('مرورگر شما از اعلان‌ها پشتیبانی نمی‌کند. اگر کاربر آیفون هستید، ابتدا باید برنامه را از طریق منوی Share به صفحه اصلی (Add to Home Screen) اضافه کنید.');
      return null;
    }
    const permission = await Notification.requestPermission();`;

code = code.replace(target, replacement);

// And update the catch block alert to be more descriptive
code = code.replace(
  "alert('خطای فایربیس: ' + error.message);",
  "alert('خطا در ارتباط با سرور اعلان: ' + error.message);"
);

fs.writeFileSync('fcm-client.js', code);
