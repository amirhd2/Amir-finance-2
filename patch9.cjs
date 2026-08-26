const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

code = code.replace(/ctx\.fillText\(\`اقساط پرداخت‌شده: \$\{paidInst\} از \$\{totalInst\} قسط\`/g, "ctx.fillText(`اقساط پرداخت‌شده: ${toAppDigits(paidInst)} از ${toAppDigits(totalInst)} قسط`");
code = code.replace(/<span class="value">\$\{paidInst\} از \$\{totalInst\} قسط<\/span>/g, '<span class="value">${toAppDigits(paidInst)} از ${toAppDigits(totalInst)} قسط</span>');
code = code.replace(/ctx\.fillText\(\`مبلغ کل بازپرداخت: \$\{\(loan\.totalRepayment \|\| 0\)\.toLocaleString\(\)\} تومان\`/g, "ctx.fillText(`مبلغ کل بازپرداخت: ${formatAppNumber(loan.totalRepayment || 0)} تومان`");
code = code.replace(/<span class="value">\$\{\(loan\.totalRepayment \|\| 0\)\.toLocaleString\(\)\} تومان<\/span>/g, '<span class="value">${formatAppNumber(loan.totalRepayment || 0)} تومان</span>');

fs.writeFileSync('src/App.jsx', code);
