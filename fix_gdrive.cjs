const fs = require('fs');
let text = fs.readFileSync('src/App.jsx', 'utf-8');

const startIdx = text.indexOf('{/*#__PURE__*/<GDriveSyncButton');
const endIdx = text.indexOf('/>}', startIdx) + 3;

if (startIdx !== -1) {
    const btnText = text.substring(startIdx, endIdx - 1); // remove the trailing } from `/>}`
    // wait, `btnText` is `{/*#__PURE__*/<GDriveSyncButton ... />`
    
    // The problem area:
    // ...</div>}</div>}</div>{/*#__PURE__*/<GDriveSyncButton ... />}}{(() => {
    
    // We will extract it completely first:
    const toRemove = text.substring(startIdx, endIdx + 1); // up to the extra }
    text = text.substring(0, startIdx) + text.substring(endIdx + 1);
    
    // Now the text is: ...</div>}</div>}</div>{(() => {
    // We want to insert `btnText` (which is just `{/*...*/<... />}`) BEFORE `{(() => {`
    // And actually it needs to be inside the parent JSX tree, which is a `<div className="space-y-3">`.
    // Wait, `{(() => {` is an expression. `{btnText}` is an expression if we wrap it in braces? No, `<GDriveSyncButton />` is a JSX element. Since it's inside `<div>`, we can just write `{/*...*/<GDriveSyncButton />}`
    
    const insertIdx = text.indexOf('{(() => {', startIdx - 10);
    const newInject = btnText + '}'; // Wait, btnText starts with `{`, so we add `}` at the end to make it a valid JSX expression.
    
    text = text.substring(0, insertIdx) + newInject + text.substring(insertIdx);
    
    fs.writeFileSync('src/App.jsx', text, 'utf-8');
    console.log("Fixed successfully!");
}
