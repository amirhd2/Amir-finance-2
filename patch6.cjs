const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

code = code.replace(/نسخه \{versionData\.installedVersion \|\| '3\.2\.0'\}/g, "نسخه {toAppDigits(versionData.installedVersion || '3.2.0')}");
code = code.replace(/نسخه \{versionData\.latestVersion\}/g, "نسخه {toAppDigits(versionData.latestVersion)}");
code = code.replace(/نسخه \{installedVersion\}/g, "نسخه {toAppDigits(installedVersion)}");
code = code.replace(/نسخه \{latestVersion\}/g, "نسخه {toAppDigits(latestVersion)}");

fs.writeFileSync('src/App.jsx', code);
console.log('Patched dashboard version and others');
