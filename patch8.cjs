const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');
code = code.replace(/<span>بیلد <span className="font-mono tracking-tight">\{versionData\.buildNumber \|\| '387'\}<\/span><\/span>/g, '<span>بیلد <span className="font-mono tracking-tight">{toAppDigits(versionData.buildNumber || "387")}</span></span>');
fs.writeFileSync('src/App.jsx', code);
