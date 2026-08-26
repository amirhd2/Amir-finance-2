const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

code = code.replace(/const dateStr = \`\$\{targetDay\} \$\{targetMonthName\} \$\{targetYear\}\`;/g, "const dateStr = \`${toAppDigits(targetDay)} ${targetMonthName} ${toAppDigits(targetYear)}\`;");
code = code.replace(/dateDisplay = \`\(\$\{jalaliMonths\[jm - 1\]\} \$\{toPersianDigits\(jy\)\}\)\`;/g, "dateDisplay = \`(\${jalaliMonths[jm - 1]} \${toAppDigits(jy)})\`;");
code = code.replace(/dateDisplay = \`\(\$\{jalaliMonths\[m - 1\] \|\| m\} \$\{toPersianDigits\(y\)\}\)\`;/g, "dateDisplay = \`(\${jalaliMonths[m - 1] || m} \${toAppDigits(y)})\`;");
code = code.replace(/dateDisplay = \`\(\$\{toPersianDigits\(ver\.releaseDate\)\}\)\`;/g, "dateDisplay = \`(\${toAppDigits(ver.releaseDate)})\`;");
code = code.replace(/dateDisplay = ver\.releaseDate \? \`\(\$\{toPersianDigits\(ver\.releaseDate\)\}\)\` : '';/g, "dateDisplay = ver.releaseDate ? \`(\${toAppDigits(ver.releaseDate)})\` : '';");

fs.writeFileSync('src/App.jsx', code);
console.log('Patched date strings in functions');
