const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Phone numbers
code = code.replace(/\{contact\.phone \|\| 'بدون شماره تماس'\}/g, "{contact.phone ? toAppDigits(contact.phone) : 'بدون شماره تماس'}");
code = code.replace(/\{c\.phone\}/g, "{c.phone ? toAppDigits(c.phone) : ''}");
code = code.replace(/\{selectedC\.phone \|\| 'بدون شماره تماس'\}/g, "{selectedC.phone ? toAppDigits(selectedC.phone) : 'بدون شماره تماس'}");
code = code.replace(/شماره تماس: \$\{loan\.phone \|\| '-'\}/g, "شماره تماس: ${loan.phone ? toAppDigits(loan.phone) : '-'}");
code = code.replace(/شماره تماس: \$\{phone\}/g, "شماره تماس: ${toAppDigits(phone)}");
code = code.replace(/\(\{loan\.phone \|\| '-'\}\)/g, "(${loan.phone ? toAppDigits(loan.phone) : '-'})");

// 2. Bell window (unbacked changes count)
code = code.replace(/\{backupStatus\.unbackedChangesCount > 99 \? '\+99' : backupStatus\.unbackedChangesCount\}/g, "{toAppDigits(backupStatus.unbackedChangesCount > 99 ? '+99' : backupStatus.unbackedChangesCount)}");
code = code.replace(/\{backupStatus\?\.unbackedChangesCount \|\| 0\} تغییر/g, "{toAppDigits(backupStatus?.unbackedChangesCount || 0)} تغییر");

// 3. App Version
code = code.replace(/نسخه \{toPersianDigits\(ver\.version\)\}/g, "نسخه {toAppDigits(ver.version)}");
code = code.replace(/v\{toPersianDigits\(APP_VERSION\)\}/g, "v{toAppDigits(APP_VERSION)}");
code = code.replace(/v\{APP_VERSION\}/g, "v{toAppDigits(APP_VERSION)}");
code = code.replace(/\{APP_VERSION\}/g, "{toAppDigits(APP_VERSION)}");

// 4. Date in header
code = code.replace(/امروز: \{getDeviceJalaliDate\(\)\.day\} \{getDeviceJalaliDate\(\)\.month\} \{getDeviceJalaliDate\(\)\.year\}/g, "امروز: {toAppDigits(getDeviceJalaliDate().day)} {getDeviceJalaliDate().month} {toAppDigits(getDeviceJalaliDate().year)}");

// 5. Important Reminders card
// "کارت یادآوری های مهم"
code = code.replace(/\{toPersianDigits\(activeLoans\.length\)\}/g, "{toAppDigits(activeLoans.length)}");
code = code.replace(/\{activeLoans\.length\}/g, "{toAppDigits(activeLoans.length)}");

// Let's write the patched code back
fs.writeFileSync('src/App.jsx', code);
console.log('Patched basic occurrences');
