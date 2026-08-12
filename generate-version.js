import fs from 'fs';
import path from 'path';

const versionPath = path.join(process.cwd(), 'version.json');
let vData = { installedVersion: '2.2.3', buildNumber: 217, releaseDate: new Date().toISOString() };

if (fs.existsSync(versionPath)) {
  try {
    const existing = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
    vData.installedVersion = '2.2.3';
    vData.buildNumber = (existing.buildNumber || 204) + 1;
    vData.releaseDate = new Date().toISOString();
  } catch (e) {
    console.warn('Could not read version.json, creating new one');
  }
}

fs.writeFileSync(versionPath, JSON.stringify(vData, null, 2), 'utf8');
console.log(`[generate-version] Incremented build number to ${vData.buildNumber}`);
