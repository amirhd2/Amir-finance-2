const fs = require('fs');

let appJsx = fs.readFileSync('src/App.jsx', 'utf8');
const vData = JSON.parse(fs.readFileSync('version.json', 'utf8'));

// Delete the old defaultVersionData block entirely up to its closing brace
const oldBlockRegex = /const defaultVersionData = \{[\s\S]*?latestBuild:\s*212,\s*isUpdateAvailable:\s*false,\s*history:\s*\[[\s\S]*?\]\n\s*\}\n\s*\}\n\s*\}\s*\};\s*/;

const fullReplaceRegex = /const defaultVersionData = \{[\s\S]*?isUpdateAvailable:\s*false,\s*history:\s*\[[\s\S]*?\]\s*\}\s*\]\s*\};/;
// Wait, since it's already corrupted, let's just find `const defaultVersionData = {` and remove it to the end of the history array.
// Because it's corrupted, let's restore App.jsx from git? No, there is no git.
