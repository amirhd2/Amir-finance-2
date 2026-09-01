import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Insert GDrive Sync Hook and Component before 'export default function App() {' or before 'const App = () => {'
# Looking for 'const App = () => {' or 'function App()'
app_decl = text.find('const App = () => {')
if app_decl == -1:
    app_decl = text.find('function App()')

hook_code = """
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
    <div className="flex gap-2">
      <button 
        onClick={handleDownload} 
        disabled={isSyncing}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg font-bold text-xs shadow-sm hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors active:scale-95"
      >
        <Icon name="download-cloud" className={`w-4 h-4 ${isSyncing ? 'animate-pulse' : ''}`} />
        دریافت
      </button>
      <button 
        onClick={handleUpload} 
        disabled={isSyncing}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg font-bold text-xs shadow-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors active:scale-95"
      >
        <Icon name="upload-cloud" className={`w-4 h-4 ${isSyncing ? 'animate-pulse' : ''}`} />
        ارسال
      </button>
    </div>
  );
};
// --- End GDrive Sync Hook ---
"""

text = text[:app_decl] + hook_code + text[app_decl:]

# Now inject it into the Dashboard header.
# We will find: <div className="flex flex-col items-start text-left">
# And inject our GDriveSyncButton into this wrapper block or just beside the Bell icon.
# Let's find: `return /*#__PURE__*/<div className="space-y-3 animate-fade-in">{/*#__PURE__*/<div className="flex justify-between items-center pt-0 pb-0 relative">`

dash_header = 'className="flex flex-col items-start text-left">'
pos = text.find(dash_header)
if pos != -1:
    inject_point = text.find('</div>', pos) + 6
    inject_str = """
{/*#__PURE__*/<div className="mt-2 w-full"><GDriveSyncButton 
  contacts={contacts} loans={loans} transactions={transactions} 
  reminders={reminders} completedPeriods={completedPeriods} theme={theme}
  setContacts={setContacts} setLoans={setLoans} setTransactions={setTransactions} 
  setReminders={setReminders} setCompletedPeriods={setCompletedPeriods} 
  setTheme={setTheme} showToast={showToast} 
/></div>}
"""
    # Wait, the structure is <div class="flex items-center gap-2.5"> ... </div>
    # Let's put it below the name/version.
    # Actually, putting it next to the Bell icon might be easier.
    # Where is backupStatus?
    # `<AnimatePresence>{backupStatus`
    pass

with open('src/App.jsx.patched', 'w', encoding='utf-8') as f:
    f.write(text)

print('Done')
