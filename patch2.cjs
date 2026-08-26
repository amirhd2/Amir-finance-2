const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

code = code.replace(/صفحه \{currentPage\} از \{totalPages\}/g, "صفحه {toAppDigits(currentPage)} از {toAppDigits(totalPages)}");
code = code.replace(/کارت \{index \+ 1\} از \{activeCards\.length\}/g, "کارت {toAppDigits(index + 1)} از {toAppDigits(activeCards.length)}");
code = code.replace(/کارت \{idx \+ 1\} از \{cards\.length\}/g, "کارت {toAppDigits(idx + 1)} از {toAppDigits(cards.length)}");
code = code.replace(/کارت \{i \+ 1\} از \{.*\}/g, "کارت {toAppDigits(i + 1)} از {toAppDigits(cards.length)}");

fs.writeFileSync('src/App.jsx', code);
console.log('Patched sticky cards and pagination');
