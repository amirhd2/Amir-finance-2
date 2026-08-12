const fs = require('fs');

let appJsx = fs.readFileSync('src/App.jsx', 'utf8');
const vData = JSON.parse(fs.readFileSync('version.json', 'utf8'));

// We need to replace everything from `const defaultVersionData = {` down to its actual closing brace.
// Let's just find the start:
const startIndex = appJsx.indexOf('const defaultVersionData = {');

// The corrupted block ends around `version: "1.9.0"`... wait, no, the old one went all the way to 1.9.0 and then there's an extra `}, { version: "2.2.1"`.
// Actually, let's just use a regex to match from `const defaultVersionData = {` to the next `const [versionData, setVersionData] = useState(defaultVersionData);`
// and then put the new defaultVersionData right before it.

const endIndex = appJsx.indexOf('const [versionData, setVersionData] = useState(defaultVersionData);');

if (startIndex !== -1 && endIndex !== -1) {
    const before = appJsx.substring(0, startIndex);
    const after = appJsx.substring(endIndex);

    // construct new defaultVersionData
    const newVersionDataString = `const defaultVersionData = ${JSON.stringify(vData, null, 4)};\n\n            `;

    fs.writeFileSync('src/App.jsx', before + newVersionDataString + after, 'utf8');
    console.log('Fixed syntax in src/App.jsx');
} else {
    console.log('Could not find markers');
}
