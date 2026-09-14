const fs = require('fs');

let content = fs.readFileSync('gdrive.js', 'utf8');

// Update executeSync to set local sync time when up to date and user initiated
const upToDateTarget = `      // 5. Already synchronized
      isSyncing = false;
      syncStatus = 'success';
      notifyListeners();
      return { success: true, action: 'up_to_date' };`;

const upToDateReplacement = `      // 5. Already synchronized
      if (isUserInitiated) {
        originalSetItem.call(localStorage, 'amir_fin_gdrive_sync_time', new Date().toISOString());
      }
      isSyncing = false;
      syncStatus = 'success';
      notifyListeners();
      return { success: true, action: 'up_to_date' };`;

content = content.replace(upToDateTarget, upToDateReplacement);

// Fix the prompt issue: use empty prompt instead of 'select_account' 
// to allow auto-login flash instead of forcing user to pick account every time.
content = content.replace(/prompt: 'select_account'/g, `prompt: ''`);

fs.writeFileSync('gdrive.js', content);
console.log("Patched gdrive.js");
