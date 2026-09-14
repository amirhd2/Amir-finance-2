const fs = require('fs');
let code = fs.readFileSync('fcm-client.js', 'utf8');
code = code.replace(
  "console.error('Error requesting notification permission:', error);",
  "console.error('Error requesting notification permission:', error);\n    alert('خطای فایربیس: ' + error.message);"
);
fs.writeFileSync('fcm-client.js', code);
