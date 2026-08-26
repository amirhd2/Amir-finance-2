const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// Replace specific toPersianDigits with toAppDigits
code = code.replace(/display: toPersianDigits\(i \+ 1\)/g, "display: toAppDigits(i + 1)");
code = code.replace(/display: \`\$\{mName\} - \$\{toPersianDigits\(i \+ 1\)\}\`/g, "display: \`${mName} - \${toAppDigits(i + 1)}\`");
code = code.replace(/display: toPersianDigits\(y\)/g, "display: toAppDigits(y)");
code = code.replace(/\{toPersianDigits\(numericDay\)\} \{monthStr\} \{toPersianDigits\(numericYear\)\}/g, "{toAppDigits(numericDay)} {monthStr} {toAppDigits(numericYear)}");
code = code.replace(/display: typeof it === 'number' \? toPersianDigits\(it\) : String\(it\)/g, "display: typeof it === 'number' ? toAppDigits(it) : String(it)");
code = code.replace(/\(\{toPersianDigits\(activeCount\)\}\)/g, "({toAppDigits(activeCount)})");
code = code.replace(/\(\{toPersianDigits\(archiveCount\)\}\)/g, "({toAppDigits(archiveCount)})");

fs.writeFileSync('src/App.jsx', code);
console.log('Patched toPersianDigits usage');
