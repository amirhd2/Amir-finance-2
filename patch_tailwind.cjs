const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(/fontFamily: \{[\s\S]*?sans: \['Vazirmatn', 'sans-serif'\],[\s\S]*?\},/, "fontFamily: {\n                        sans: ['Vazirmatn', 'sans-serif'],\n                        mono: ['Vazirmatn', 'ui-monospace', 'monospace'],\n                    },");

fs.writeFileSync('index.html', code);
console.log('Patched tailwind mono font');
