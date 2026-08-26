const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

code = code.replace(/<span className="font-mono tracking-tight">\{versionData\.installedVersion \|\| '3\.2\.4'\}<\/span>/g, '<span className="font-mono tracking-tight">{toAppDigits(versionData.installedVersion || "3.2.4")}</span>');
code = code.replace(/<span className="font-mono tracking-tight text-\[11px\] mt-1">بیلد \{versionData\.installedBuild \|\| '324'\}<\/span>/g, '<span className="font-mono tracking-tight text-[11px] mt-1">بیلد {toAppDigits(versionData.installedBuild || "324")}</span>');

fs.writeFileSync('src/App.jsx', code);
