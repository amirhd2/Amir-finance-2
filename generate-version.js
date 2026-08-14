import fs from 'fs';
import path from 'path';

const versionPath = path.join(process.cwd(), 'version.json');
const pkgPath = path.join(process.cwd(), 'package.json');

let pkgVersion = '3.0.0';
if (fs.existsSync(pkgPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (pkg.version) pkgVersion = pkg.version;
  } catch (e) {}
}

let vData = { installedVersion: pkgVersion, buildNumber: 300, releaseDate: new Date().toISOString() };

if (fs.existsSync(versionPath)) {
  try {
    const existing = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
    vData.installedVersion = pkgVersion;
    vData.buildNumber = Math.max(300, (existing.buildNumber || 299) + 1);
    vData.releaseDate = new Date().toISOString();
  } catch (e) {
    console.warn('Could not read version.json, creating new one');
  }
}

fs.writeFileSync(versionPath, JSON.stringify(vData, null, 2), 'utf8');
console.log(`[generate-version] Updated version to ${vData.installedVersion} and build number to ${vData.buildNumber}`);
