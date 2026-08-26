const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

code = code.replace(/\`\$\{Math\.abs\(item\.daysLeft\)\} روز تأخیر\`/g, "\`${toAppDigits(Math.abs(item.daysLeft))} روز تأخیر\`");
code = code.replace(/\`\$\{item\.daysLeft\} روز مانده\`/g, "\`${toAppDigits(item.daysLeft)} روز مانده\`");

fs.writeFileSync('src/App.jsx', code);
console.log('Patched reminder card days');
