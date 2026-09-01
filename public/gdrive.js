/**
 * Amir Finance - Google Drive Cloud Sync Module
 * Integrated with Google Identity Services (GIS) & Google Drive REST API v3 (appDataFolder)
 * Fully headless - Controlled via React UI (Settings & Pull-To-Refresh)
 */

(function () {
  const CLIENT_ID = '759840178251-4td2a33e3slede05eslfmmsnaio61t7v.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file';
  const BACKUP_FILE_NAME = 'amir-finance-backup.json';

  // --- State ---
  let tokenClient = null;
  let accessToken = null;
  let tokenExpiresAt = 0;
  let isSignedIn = false;
  let isSyncing = false;
  let syncStatus = 'idle'; // 'idle' | 'syncing' | 'success' | 'error'
  let isDirty = false;
  let lastLocalChange = 0;
  let syncInterval = null;
  const listeners = new Set();

  // Restore stored session if still valid
  try {
    const savedToken = localStorage.getItem('amir_fin_gdrive_access_token');
    const savedExpiry = parseInt(localStorage.getItem('amir_fin_gdrive_token_expires') || '0', 10);
    if (savedToken && savedExpiry > Date.now()) {
      accessToken = savedToken;
      tokenExpiresAt = savedExpiry;
      isSignedIn = true;
    }
  } catch (e) {
    console.warn('[GDrive] Could not restore cached session:', e);
  }

  // --- Local Storage Interceptors for Live Change Tracking ---
  const originalSetItem = localStorage.setItem;
  const originalRemoveItem = localStorage.removeItem;
  const originalClear = localStorage.clear;

  function markDirty(key) {
    if (key && key.startsWith('amir_fin_') && !key.includes('gdrive_')) {
      isDirty = true;
      lastLocalChange = Date.now();
    }
  }

  localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, arguments);
    markDirty(key);
  };

  localStorage.removeItem = function (key) {
    originalRemoveItem.apply(this, arguments);
    markDirty(key);
  };

  localStorage.clear = function () {
    originalClear.apply(this, arguments);
    isDirty = true;
    lastLocalChange = Date.now();
  };

  // --- Listener Notification ---
  function notifyListeners() {
    const state = {
      isSignedIn: Boolean(isSignedIn && accessToken && tokenExpiresAt > Date.now()),
      isSyncing: isSyncing,
      syncStatus: syncStatus,
      lastSyncTime: localStorage.getItem('amir_fin_gdrive_sync_time') || null
    };
    listeners.forEach(fn => {
      try {
        fn(state);
      } catch (e) {
        console.error('[GDrive] Listener error:', e);
      }
    });
  }

  // --- Jalali / Persian Date Formatter ---
  function formatSyncTime(isoStr) {
    if (!isoStr) return 'هنوز همگام‌سازی نشده';
    try {
      const d = new Date(isoStr);
      if (isNaN(d.getTime())) return 'هنوز همگام‌سازی نشده';
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffMins = Math.floor(diffMs / (60 * 1000));
      if (diffMins < 1) return 'چند لحظه پیش';
      if (diffMins < 60) return `${diffMins} دقیقه پیش`;
      
      return d.toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'همگام شده';
    }
  }

  // --- Google Identity Services Initialization ---
  function initGIS() {
    if (typeof window === 'undefined') return;
    if (window.google && window.google.accounts && window.google.accounts.oauth2) {
      try {
        tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: async (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              accessToken = tokenResponse.access_token;
              const expiresIn = parseInt(tokenResponse.expires_in || '3599', 10);
              tokenExpiresAt = Date.now() + (expiresIn * 1000);
              isSignedIn = true;
              try {
                localStorage.setItem('amir_fin_gdrive_access_token', accessToken);
                localStorage.setItem('amir_fin_gdrive_token_expires', String(tokenExpiresAt));
              } catch (e) {}

              if (typeof window.showAppToast === 'function') {
                window.showAppToast('اتصال با حساب گوگل با موفقیت برقرار شد');
              }

              notifyListeners();

              if (!syncInterval) {
                syncInterval = setInterval(autoSyncLoop, 15000);
              }

              // Initial sync immediately after connecting
              await executeSync({ isUserInitiated: false });
            } else if (tokenResponse && tokenResponse.error) {
              console.error('[GDrive] Token error:', tokenResponse);
              syncStatus = 'error';
              if (typeof window.showAppToast === 'function') {
                window.showAppToast('خطا در اتصال به حساب گوگل');
              }
              notifyListeners();
            }
          }
        });
        console.log('[GDrive] Google Identity Services client initialized successfully.');
      } catch (err) {
        console.warn('[GDrive] GIS init error:', err);
      }
    }
  }

  // --- Data Packaging ---
  function getLocalBackupData() {
    return {
      appName: "Amir Finance",
      version: "3.2.8",
      exportDate: new Date().toISOString(),
      contacts: JSON.parse(localStorage.getItem('amir_fin_contacts_v3') || '[]'),
      loans: JSON.parse(localStorage.getItem('amir_fin_loans_v3') || '[]'),
      transactions: JSON.parse(localStorage.getItem('amir_fin_txs_v3') || '[]'),
      reminders: JSON.parse(localStorage.getItem('amir_fin_reminders_v1') || '[]'),
      completedPeriods: JSON.parse(localStorage.getItem('amir_fin_completed_periods_v3') || '[]'),
      theme: localStorage.getItem('amir_fin_theme') || 'system',
      numFormat: localStorage.getItem('amir_fin_num_format') || 'fa'
    };
  }

  function applyRemoteData(parsed) {
    if (!parsed || typeof parsed !== 'object') return false;
    try {
      if (Array.isArray(parsed.contacts)) {
        originalSetItem.call(localStorage, 'amir_fin_contacts_v3', JSON.stringify(parsed.contacts));
      }
      if (Array.isArray(parsed.loans)) {
        originalSetItem.call(localStorage, 'amir_fin_loans_v3', JSON.stringify(parsed.loans));
      }
      if (Array.isArray(parsed.transactions)) {
        originalSetItem.call(localStorage, 'amir_fin_txs_v3', JSON.stringify(parsed.transactions));
      }
      if (Array.isArray(parsed.reminders)) {
        originalSetItem.call(localStorage, 'amir_fin_reminders_v1', JSON.stringify(parsed.reminders));
      }
      if (Array.isArray(parsed.completedPeriods)) {
        originalSetItem.call(localStorage, 'amir_fin_completed_periods_v3', JSON.stringify(parsed.completedPeriods));
      }
      if (parsed.theme) {
        originalSetItem.call(localStorage, 'amir_fin_theme', parsed.theme);
      }
      if (parsed.numFormat) {
        originalSetItem.call(localStorage, 'amir_fin_num_format', parsed.numFormat);
      }
      return true;
    } catch (e) {
      console.error('[GDrive] Error applying remote data to localStorage:', e);
      return false;
    }
  }

  // --- Google Drive REST API Calls ---
  async function findBackupFile() {
    if (!accessToken) return null;
    try {
      const url = 'https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=name%3D%27' + 
                  encodeURIComponent(BACKUP_FILE_NAME) + '%27+and+trashed%3Dfalse&fields=files(id,name,modifiedTime)&pageSize=1';
      const res = await fetch(url, {
        headers: { Authorization: 'Bearer ' + accessToken }
      });
      if (res.status === 401) {
        handleTokenExpired();
        return null;
      }
      if (!res.ok) return null;
      const data = await res.json();
      return (data.files && data.files.length > 0) ? data.files[0] : null;
    } catch (e) {
      console.warn('[GDrive] findBackupFile error:', e);
      return null;
    }
  }

  async function uploadToDrive() {
    if (!accessToken) throw new Error('Not authenticated');
    const backupObj = getLocalBackupData();
    const jsonString = JSON.stringify(backupObj);
    const blob = new Blob([jsonString], { type: 'application/json' });

    const existingFile = await findBackupFile();
    const metadata = {
      name: BACKUP_FILE_NAME,
      ...(existingFile ? {} : { parents: ['appDataFolder'] })
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', blob);

    const url = existingFile
      ? `https://www.googleapis.com/upload/drive/v3/files/${existingFile.id}?uploadType=multipart&fields=id,modifiedTime`
      : `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,modifiedTime`;

    const res = await fetch(url, {
      method: existingFile ? 'PATCH' : 'POST',
      headers: { Authorization: 'Bearer ' + accessToken },
      body: form
    });

    if (res.status === 401) {
      handleTokenExpired();
      throw new Error('Token expired');
    }
    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}`);
    }

    const data = await res.json();
    const modTime = data.modifiedTime || new Date().toISOString();
    originalSetItem.call(localStorage, 'amir_fin_gdrive_sync_time', modTime);
    return modTime;
  }

  async function downloadFromDrive(file) {
    if (!accessToken || !file) return false;
    const url = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
    const res = await fetch(url, {
      headers: { Authorization: 'Bearer ' + accessToken }
    });

    if (res.status === 401) {
      handleTokenExpired();
      return false;
    }
    if (!res.ok) return false;

    const data = await res.json();
    const ok = applyRemoteData(data);
    if (ok) {
      originalSetItem.call(localStorage, 'amir_fin_gdrive_sync_time', file.modifiedTime || new Date().toISOString());
      window.dispatchEvent(new CustomEvent('gdrive-remote-updated', { detail: data }));
    }
    return ok;
  }

  function handleTokenExpired() {
    accessToken = null;
    isSignedIn = false;
    tokenExpiresAt = 0;
    try {
      localStorage.removeItem('amir_fin_gdrive_access_token');
      localStorage.removeItem('amir_fin_gdrive_token_expires');
    } catch (e) {}
    notifyListeners();
  }

  // --- Unified Sync Execution ---
  async function executeSync({ isUserInitiated = false } = {}) {
    if (!isSignedIn || !accessToken || tokenExpiresAt <= Date.now()) {
      if (isSignedIn && tokenExpiresAt <= Date.now()) {
        handleTokenExpired();
      }
      return { success: false, action: 'not_signed_in' };
    }
    if (isSyncing) {
      return { success: true, action: 'already_syncing' };
    }

    isSyncing = true;
    syncStatus = 'syncing';
    notifyListeners();

    try {
      const file = await findBackupFile();
      const localSyncTime = localStorage.getItem('amir_fin_gdrive_sync_time');

      // 1. Remote doesn't exist -> Upload
      if (!file) {
        await uploadToDrive();
        isDirty = false;
        isSyncing = false;
        syncStatus = 'success';
        notifyListeners();
        return { success: true, action: 'uploaded' };
      }

      const remoteTime = new Date(file.modifiedTime).getTime();
      const localTime = localSyncTime ? new Date(localSyncTime).getTime() : 0;

      // 2. Remote is newer and local is not dirty -> Download
      if (remoteTime > localTime && !isDirty) {
        await downloadFromDrive(file);
        isSyncing = false;
        syncStatus = 'success';
        notifyListeners();
        return { success: true, action: 'downloaded' };
      }

      // 3. Local has newer changes -> Upload
      if (isDirty) {
        await uploadToDrive();
        isDirty = false;
        isSyncing = false;
        syncStatus = 'success';
        notifyListeners();
        return { success: true, action: 'uploaded' };
      }

      // 4. User force refreshed and remote has content
      if (isUserInitiated && remoteTime > localTime) {
        await downloadFromDrive(file);
        isSyncing = false;
        syncStatus = 'success';
        notifyListeners();
        return { success: true, action: 'downloaded' };
      }

      // 5. Already synchronized
      isSyncing = false;
      syncStatus = 'success';
      notifyListeners();
      return { success: true, action: 'up_to_date' };

    } catch (err) {
      console.error('[GDrive] Sync error:', err);
      isSyncing = false;
      syncStatus = 'error';
      notifyListeners();
      return { success: false, action: 'error', error: err.message || 'خطا در همگام‌سازی' };
    }
  }

  // --- Background Periodic Auto-Sync ---
  async function autoSyncLoop() {
    if (isSyncing || !isSignedIn || !accessToken || tokenExpiresAt <= Date.now()) return;
    try {
      if (isDirty) {
        if (Date.now() - lastLocalChange > 3500) {
          await executeSync({ isUserInitiated: false });
        }
      } else {
        const file = await findBackupFile();
        if (file) {
          const localSyncTime = localStorage.getItem('amir_fin_gdrive_sync_time');
          if (!localSyncTime || new Date(file.modifiedTime).getTime() > new Date(localSyncTime).getTime()) {
            await executeSync({ isUserInitiated: false });
          }
        }
      }
    } catch (e) {
      console.warn('[GDrive] autoSyncLoop error:', e);
    }
  }

  // --- Public API Export ---
  window.GoogleDriveSync = {
    init: initGIS,
    isSignedIn: function () {
      return Boolean(isSignedIn && accessToken && tokenExpiresAt > Date.now());
    },
    isSyncing: function () {
      return isSyncing;
    },
    getSyncStatus: function () {
      return syncStatus;
    },
    getLastSyncTime: function () {
      return localStorage.getItem('amir_fin_gdrive_sync_time') || null;
    },
    getLastSyncFormatted: function () {
      return formatSyncTime(localStorage.getItem('amir_fin_gdrive_sync_time'));
    },
    signIn: function () {
      if (typeof window.showAppToast === 'function') {
        window.showAppToast('در حال باز کردن پنجره اتصال حساب گوگل...');
      }
      if (!tokenClient) {
        initGIS();
      }
      if (tokenClient) {
        try {
          tokenClient.requestAccessToken({ prompt: 'consent' });
        } catch (e) {
          console.error('[GDrive] requestAccessToken error:', e);
          if (typeof window.showAppToast === 'function') {
            window.showAppToast('امکان باز کردن پنجره احراز هویت گوگل وجود ندارد');
          }
        }
      } else {
        setTimeout(() => {
          if (!tokenClient) initGIS();
          if (tokenClient) {
            tokenClient.requestAccessToken({ prompt: 'consent' });
          } else {
            console.warn('[GDrive] Google Identity Services script not yet loaded.');
            if (typeof window.showAppToast === 'function') {
              window.showAppToast('سرویس گوگل در حال بارگذاری است، لطفاً دوباره تلاش کنید');
            }
          }
        }, 600);
      }
    },
    signOut: function () {
      if (accessToken && window.google && window.google.accounts && window.google.accounts.oauth2) {
        try {
          window.google.accounts.oauth2.revoke(accessToken, () => {});
        } catch (e) {}
      }
      handleTokenExpired();
      try {
        localStorage.removeItem('amir_fin_gdrive_sync_time');
      } catch (e) {}
      if (syncInterval) {
        clearInterval(syncInterval);
        syncInterval = null;
      }
      syncStatus = 'idle';
      notifyListeners();
    },
    forceSync: async function (options) {
      return await executeSync(options || { isUserInitiated: true });
    },
    subscribe: function (listener) {
      if (typeof listener === 'function') {
        listeners.add(listener);
        listener({
          isSignedIn: Boolean(isSignedIn && accessToken && tokenExpiresAt > Date.now()),
          isSyncing: isSyncing,
          syncStatus: syncStatus,
          lastSyncTime: localStorage.getItem('amir_fin_gdrive_sync_time') || null
        });
        return () => listeners.delete(listener);
      }
      return () => {};
    }
  };

  // Start initialization
  if (document.readyState === 'complete') {
    initGIS();
  } else {
    window.addEventListener('load', initGIS);
  }

  // Periodic check if GIS loads late
  let checkGisCount = 0;
  const gisCheckInterval = setInterval(() => {
    checkGisCount++;
    if (!tokenClient && window.google && window.google.accounts && window.google.accounts.oauth2) {
      initGIS();
      clearInterval(gisCheckInterval);
    } else if (checkGisCount > 20) {
      clearInterval(gisCheckInterval);
    }
  }, 500);

  if (isSignedIn) {
    syncInterval = setInterval(autoSyncLoop, 15000);
  }
})();
