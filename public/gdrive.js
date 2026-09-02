/**
 * Amir Finance - Google Drive Cloud Sync Module
 * Integrated with Google Identity Services (GIS) & Google Drive REST API v3 (appDataFolder)
 * Supports persistent authentication, silent background token refresh, proactive renewal, and resilient sync
 */

(function () {
  const DEFAULT_CLIENT_ID = '854434128560-kimu77i3h604seki8b4fi3vsjr4kogvk.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file';
  const BACKUP_FILE_NAME = 'amir-finance-backup.json';

  function getEffectiveClientId() {
    try {
      const custom = localStorage.getItem('amir_fin_custom_client_id');
      if (custom && custom.trim().length > 10) {
        return custom.trim();
      }
    } catch (e) {}
    return DEFAULT_CLIENT_ID;
  }

  // --- State ---
  let tokenClient = null;
  let accessToken = null;
  let tokenExpiresAt = 0;
  let isConnected = false;
  let isSyncing = false;
  let syncStatus = 'idle'; // 'idle' | 'syncing' | 'success' | 'error'
  let isDirty = false;
  let lastLocalChange = 0;
  let syncInterval = null;
  let proactiveRefreshTimer = null;
  let refreshPromise = null;
  const listeners = new Set();

  // Restore stored session if user was connected
  try {
    const savedConnected = localStorage.getItem('amir_fin_gdrive_connected') === 'true';
    const savedToken = localStorage.getItem('amir_fin_gdrive_access_token');
    const savedExpiry = parseInt(localStorage.getItem('amir_fin_gdrive_token_expires') || '0', 10);
    if (savedConnected) {
      isConnected = true;
      if (savedToken && savedExpiry > Date.now()) {
        accessToken = savedToken;
        tokenExpiresAt = savedExpiry;
      }
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
      isSignedIn: Boolean(isConnected),
      isTokenValid: Boolean(accessToken && tokenExpiresAt > Date.now()),
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

  // --- Token Management & Proactive Refresh ---
  function scheduleProactiveRefresh(expiresInSeconds) {
    if (proactiveRefreshTimer) {
      clearTimeout(proactiveRefreshTimer);
      proactiveRefreshTimer = null;
    }
    // Refresh 5 minutes before expiration (or half the duration if less than 10 mins)
    const safetyBuffer = Math.min(300, Math.floor(expiresInSeconds * 0.2));
    const delayMs = Math.max(15000, (expiresInSeconds - safetyBuffer) * 1000);
    
    proactiveRefreshTimer = setTimeout(() => {
      if (isConnected) {
        console.log('[GDrive] Proactively refreshing Google access token before expiration...');
        refreshTokenSilently().catch(err => {
          console.warn('[GDrive] Proactive token refresh failed, will retry on next sync:', err);
        });
      }
    }, delayMs);
  }

  function refreshTokenSilently() {
    if (refreshPromise) return refreshPromise;

    refreshPromise = new Promise((resolve, reject) => {
      if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
        refreshPromise = null;
        return reject(new Error('Google Identity Services not loaded'));
      }

      if (!tokenClient) {
        initGIS();
      }

      if (!tokenClient) {
        refreshPromise = null;
        return reject(new Error('Token client could not be initialized'));
      }

      const timeoutId = setTimeout(() => {
        refreshPromise = null;
        reject(new Error('Silent token refresh timed out'));
      }, 12000);

      const previousCallback = tokenClient.callback;
      tokenClient.callback = (tokenResponse) => {
        clearTimeout(timeoutId);
        tokenClient.callback = previousCallback;
        refreshPromise = null;

        if (tokenResponse && tokenResponse.access_token) {
          accessToken = tokenResponse.access_token;
          const expiresIn = parseInt(tokenResponse.expires_in || '3599', 10);
          tokenExpiresAt = Date.now() + (expiresIn * 1000);
          isConnected = true;

          try {
            localStorage.setItem('amir_fin_gdrive_connected', 'true');
            localStorage.setItem('amir_fin_gdrive_access_token', accessToken);
            localStorage.setItem('amir_fin_gdrive_token_expires', String(tokenExpiresAt));
          } catch (e) {}

          scheduleProactiveRefresh(expiresIn);
          notifyListeners();
          console.log('[GDrive] Silent token refresh successful.');
          resolve(accessToken);
        } else {
          console.warn('[GDrive] Silent refresh received error or rejection:', tokenResponse);
          reject(new Error(tokenResponse?.error || 'Silent token refresh failed'));
        }
      };

      try {
        // Request token silently without showing user interaction prompt
        tokenClient.requestAccessToken({ prompt: '' });
      } catch (err) {
        clearTimeout(timeoutId);
        tokenClient.callback = previousCallback;
        refreshPromise = null;
        reject(err);
      }
    });

    return refreshPromise;
  }

  async function ensureValidToken() {
    // If token is currently valid with at least 90 seconds safety margin
    if (accessToken && (tokenExpiresAt - Date.now() > 90000)) {
      return accessToken;
    }

    // If user is supposed to be connected, attempt silent token refresh
    if (isConnected) {
      try {
        return await refreshTokenSilently();
      } catch (e) {
        console.warn('[GDrive] ensureValidToken silent refresh failed:', e);
        // If cached token still has qualche seconds, return it as fallback
        if (accessToken && tokenExpiresAt > Date.now()) {
          return accessToken;
        }
        return null;
      }
    }

    return null;
  }

  // --- Google Identity Services Initialization ---
  function initGIS() {
    if (typeof window === 'undefined') return;
    if (window.google && window.google.accounts && window.google.accounts.oauth2) {
      try {
        const activeClientId = getEffectiveClientId();
        tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: activeClientId,
          scope: SCOPES,
          callback: async (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              accessToken = tokenResponse.access_token;
              const expiresIn = parseInt(tokenResponse.expires_in || '3599', 10);
              tokenExpiresAt = Date.now() + (expiresIn * 1000);
              isConnected = true;
              try {
                localStorage.setItem('amir_fin_gdrive_connected', 'true');
                localStorage.setItem('amir_fin_gdrive_access_token', accessToken);
                localStorage.setItem('amir_fin_gdrive_token_expires', String(tokenExpiresAt));
              } catch (e) {}

              if (typeof window.showAppToast === 'function') {
                window.showAppToast('اتصال با حساب گوگل با موفقیت برقرار شد');
              }

              scheduleProactiveRefresh(expiresIn);
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

        // If user was previously connected but token is expired, trigger silent background re-authentication
        if (isConnected) {
          if (!syncInterval) {
            syncInterval = setInterval(autoSyncLoop, 15000);
          }
          if (!accessToken || tokenExpiresAt <= Date.now()) {
            ensureValidToken().then(token => {
              if (token) {
                executeSync({ isUserInitiated: false });
              }
            }).catch(() => {});
          } else {
            const remainingSeconds = Math.floor((tokenExpiresAt - Date.now()) / 1000);
            scheduleProactiveRefresh(remainingSeconds);
          }
        }
      } catch (err) {
        console.warn('[GDrive] GIS init error:', err);
      }
    }
  }

  // --- Data Packaging ---
  function getLocalBackupData() {
    return {
      appName: "Amir Finance",
      version: "3.2.9",
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

  // --- Authenticated Fetch Helper with Auto-Retry on 401 ---
  async function fetchWithAuth(url, options = {}) {
    let token = await ensureValidToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    let headers = {
      ...(options.headers || {}),
      Authorization: 'Bearer ' + token
    };

    let res = await fetch(url, { ...options, headers });

    // If 401 Unauthorized, token may have been revoked or invalidated on server
    if (res.status === 401 && isConnected) {
      console.log('[GDrive] 401 Unauthorized received. Attempting silent token renewal...');
      accessToken = null;
      tokenExpiresAt = 0;
      token = await ensureValidToken();
      if (token) {
        headers = {
          ...(options.headers || {}),
          Authorization: 'Bearer ' + token
        };
        res = await fetch(url, { ...options, headers });
      }
    }

    return res;
  }

  // --- Google Drive REST API Calls ---
  async function findBackupFile() {
    try {
      const url = 'https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=name%3D%27' + 
                  encodeURIComponent(BACKUP_FILE_NAME) + '%27+and+trashed%3Dfalse&fields=files(id,name,modifiedTime)&pageSize=1';
      const res = await fetchWithAuth(url);
      if (!res.ok) return null;
      const data = await res.json();
      return (data.files && data.files.length > 0) ? data.files[0] : null;
    } catch (e) {
      console.warn('[GDrive] findBackupFile error:', e);
      return null;
    }
  }

  async function uploadToDrive() {
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

    const res = await fetchWithAuth(url, {
      method: existingFile ? 'PATCH' : 'POST',
      body: form
    });

    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}`);
    }

    const data = await res.json();
    const modTime = data.modifiedTime || new Date().toISOString();
    originalSetItem.call(localStorage, 'amir_fin_gdrive_sync_time', modTime);
    return modTime;
  }

  async function downloadFromDrive(file) {
    if (!file) return false;
    const url = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
    const res = await fetchWithAuth(url);

    if (!res.ok) return false;

    const data = await res.json();
    const ok = applyRemoteData(data);
    if (ok) {
      originalSetItem.call(localStorage, 'amir_fin_gdrive_sync_time', file.modifiedTime || new Date().toISOString());
      window.dispatchEvent(new CustomEvent('gdrive-remote-updated', { detail: data }));
    }
    return ok;
  }

  // --- Unified Sync Execution ---
  async function executeSync({ isUserInitiated = false } = {}) {
    if (!isConnected) {
      return { success: false, action: 'not_signed_in' };
    }

    const token = await ensureValidToken();
    if (!token) {
      return { success: false, action: 'token_unavailable' };
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
    if (isSyncing || !isConnected) return;
    try {
      if (isDirty) {
        if (Date.now() - lastLocalChange > 3500) {
          await executeSync({ isUserInitiated: false });
        }
      } else {
        const token = await ensureValidToken();
        if (token) {
          const file = await findBackupFile();
          if (file) {
            const localSyncTime = localStorage.getItem('amir_fin_gdrive_sync_time');
            if (!localSyncTime || new Date(file.modifiedTime).getTime() > new Date(localSyncTime).getTime()) {
              await executeSync({ isUserInitiated: false });
            }
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
      return Boolean(isConnected);
    },
    isTokenValid: function () {
      return Boolean(accessToken && tokenExpiresAt > Date.now());
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
          tokenClient.requestAccessToken({ prompt: 'select_account' });
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
            tokenClient.requestAccessToken({ prompt: 'select_account' });
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
      isConnected = false;
      accessToken = null;
      tokenExpiresAt = 0;
      if (proactiveRefreshTimer) {
        clearTimeout(proactiveRefreshTimer);
        proactiveRefreshTimer = null;
      }
      try {
        localStorage.removeItem('amir_fin_gdrive_connected');
        localStorage.removeItem('amir_fin_gdrive_access_token');
        localStorage.removeItem('amir_fin_gdrive_token_expires');
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
    getClientId: function () {
      return getEffectiveClientId();
    },
    getCustomClientId: function () {
      try {
        return localStorage.getItem('amir_fin_custom_client_id') || '';
      } catch (e) {
        return '';
      }
    },
    getDefaultClientId: function () {
      return DEFAULT_CLIENT_ID;
    },
    setCustomClientId: function (newId) {
      try {
        if (newId && typeof newId === 'string' && newId.trim().length > 10) {
          localStorage.setItem('amir_fin_custom_client_id', newId.trim());
        } else {
          localStorage.removeItem('amir_fin_custom_client_id');
        }
      } catch (e) {}
      tokenClient = null;
      initGIS();
      notifyListeners();
    },
    subscribe: function (listener) {
      if (typeof listener === 'function') {
        listeners.add(listener);
        listener({
          isSignedIn: Boolean(isConnected),
          isTokenValid: Boolean(accessToken && tokenExpiresAt > Date.now()),
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

  if (isConnected) {
    syncInterval = setInterval(autoSyncLoop, 15000);
  }
})();
