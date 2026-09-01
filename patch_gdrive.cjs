const fs = require('fs');

let text = fs.readFileSync('src/App.jsx', 'utf-8');

// The file seems to be UTF-8 mostly, but maybe has some invalid sequences? 
// Let's hope node handles it better.
const appDecl = text.indexOf('const App = () => {');

const hookCode = `
// --- GDrive Sync Hook & Component ---
const GDriveSyncButton = ({ contacts, loans, transactions, reminders, completedPeriods, theme, setContacts, setLoans, setTransactions, setReminders, setCompletedPeriods, setTheme, showToast }) => {
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [tokenClient, setTokenClient] = React.useState(null);
  
  React.useEffect(() => {
    // Initialize GAPI and GSI
    const initDriveSync = () => {
      if (window.google && window.gapi) {
        window.gapi.load('client', () => {
          window.gapi.client.init({}).then(() => {
            window.gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest');
          });
        });
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: '759840178251-4td2a33e3slede05eslfmmsnaio61t7v.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/drive.appdata',
          callback: async (response) => {
            if (response.error !== undefined) {
              showToast('خطا در احراز هویت گوگل', 'error');
              return;
            }
            setIsSignedIn(true);
            showToast('با موفقیت به حساب گوگل متصل شد', 'success');
          }
        });
        setTokenClient(client);
      } else {
        setTimeout(initDriveSync, 1000);
      }
    };
    initDriveSync();
  }, []);

  const handleAuth = () => {
    if (tokenClient) {
      tokenClient.requestAccessToken({ prompt: '' });
    } else {
      showToast('سرویس گوگل درایو در حال بارگذاری است', 'warning');
    }
  };

  const findBackupFile = async () => {
    try {
      const res = await window.gapi.client.drive.files.list({
        spaces: 'appDataFolder',
        fields: 'files(id, name, modifiedTime)',
        q: "name='amir-finance-backup.json'",
        pageSize: 1
      });
      return res.result.files && res.result.files.length > 0 ? res.result.files[0] : null;
    } catch (err) {
      console.error('Error finding backup', err);
      return null;
    }
  };

  const handleUpload = async () => {
    if (!isSignedIn) return handleAuth();
    setIsSyncing(true);
    try {
      const data = {
        appName: "Amir Finance",
        version: "1.0.0",
        exportDate: new Date().toISOString(),
        contacts, loans, transactions, reminders, completedPeriods, theme
      };
      const fileContent = JSON.stringify(data);
      const fileData = new Blob([fileContent], { type: 'application/json' });
      const metadata = {
        name: 'amir-finance-backup.json',
        parents: ['appDataFolder']
      };

      const file = await findBackupFile();
      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', fileData);

      const fetchOptions = {
        method: file ? 'PATCH' : 'POST',
        headers: {
          Authorization: 'Bearer ' + window.gapi.client.getToken().access_token
        },
        body: form
      };
      
      const url = file 
        ? 'https://www.googleapis.com/upload/drive/v3/files/' + file.id + '?uploadType=multipart'
        : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';

      const res = await fetch(url, fetchOptions);
      if (!res.ok) throw new Error('Upload failed');
      
      showToast('همگام‌سازی با گوگل درایو انجام شد', 'success');
    } catch (err) {
      console.error(err);
      showToast('خطا در ارسال اطلاعات به گوگل درایو', 'error');
    }
    setIsSyncing(false);
  };

  const handleDownload = async () => {
    if (!isSignedIn) return handleAuth();
    setIsSyncing(true);
    try {
      const file = await findBackupFile();
      if (!file) {
        showToast('فایل پشتیبان در گوگل درایو یافت نشد', 'warning');
        setIsSyncing(false);
        return;
      }
      
      const res = await window.gapi.client.drive.files.get({
        fileId: file.id,
        alt: 'media'
      });
      
      const parsed = res.result;
      if (parsed) {
        if (Array.isArray(parsed.contacts)) setContacts(parsed.contacts);
        if (Array.isArray(parsed.loans)) setLoans(parsed.loans);
        if (Array.isArray(parsed.transactions)) setTransactions(parsed.transactions);
        if (Array.isArray(parsed.reminders)) setReminders(parsed.reminders);
        if (Array.isArray(parsed.completedPeriods)) setCompletedPeriods(parsed.completedPeriods);
        if (parsed.theme) setTheme(parsed.theme);
        showToast('اطلاعات از گوگل درایو دریافت شد', 'success');
      }
    } catch (err) {
      console.error(err);
      showToast('خطا در دریافت اطلاعات', 'error');
    }
    setIsSyncing(false);
  };

  return (
    /*#__PURE__*/<div className="flex gap-2 w-full justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
      {/*#__PURE__*/<span className="text-xs font-bold text-slate-500 self-center flex items-center gap-1.5"><Icon name="cloud" className="w-4 h-4"/> درایو:</span>}
      {/*#__PURE__*/<div className="flex gap-1.5">
        {/*#__PURE__*/<button 
          onClick={handleDownload} 
          disabled={isSyncing}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg font-bold text-xs shadow-sm hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors active:scale-95 cursor-pointer"
        >
          {/*#__PURE__*/<Icon name="download-cloud" className={"w-4 h-4 " + (isSyncing ? "animate-pulse" : "")} />}
          دریافت
        </button>}
        {/*#__PURE__*/<button 
          onClick={handleUpload} 
          disabled={isSyncing}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg font-bold text-xs shadow-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors active:scale-95 cursor-pointer"
        >
          {/*#__PURE__*/<Icon name="upload-cloud" className={"w-4 h-4 " + (isSyncing ? "animate-pulse" : "")} />}
          ارسال
        </button>}
      </div>}
    </div>
  );
};
// --- End GDrive Sync Hook ---
`;

text = text.substring(0, appDecl) + hookCode + text.substring(appDecl);

// We want to insert the button below the Amir Finance version in the dashboard.
// Looking for: <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight mt-0.5">نسخه {toAppDigits(versionData.installedVersion || '3.2.0')}</span>}</div>}</div>}</div>
const dashStr = `<span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight mt-0.5">نسخه {toAppDigits(versionData.installedVersion || '3.2.0')}</span>}</div>}</div>}</div>}`;
let idx = text.indexOf(dashStr);

if (idx !== -1) {
    const injectStr = `
{/*#__PURE__*/<GDriveSyncButton 
  contacts={contacts} loans={loans} transactions={transactions} 
  reminders={reminders} completedPeriods={completedPeriods} theme={theme}
  setContacts={setContacts} setLoans={setLoans} setTransactions={setTransactions} 
  setReminders={setReminders} setCompletedPeriods={setCompletedPeriods} 
  setTheme={setTheme} showToast={showToast} 
/>}
`;
    // Wait, let's inject it right after the closing </div> of the dashboard header.
    const splitPoint = idx + dashStr.length - 1; // before the final closing brace of the conditional IIFE maybe? Wait, dashStr ends with `</div>}`
    text = text.substring(0, splitPoint) + injectStr + text.substring(splitPoint);
    fs.writeFileSync('src/App.jsx', text, 'utf-8');
    console.log("Patched successfully!");
} else {
    console.log("Could not find insertion point!");
}

