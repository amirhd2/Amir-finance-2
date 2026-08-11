import json

# 1. Update src/App.jsx
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_code = f.read()

# Fix setVersionData to preserve history
old_set_version = """                    setVersionData({
                        ...serverData,
                        installedVersion: localVersion || EMBEDDED_VERSION,
                        buildNumber: localBuild,
                        latestVersion: serverVersion,
                        latestBuild: serverBuild,
                        isUpdateAvailable: isUpdateAvailable
                    });"""

new_set_version = """                    setVersionData(prev => ({
                        ...serverData,
                        installedVersion: localVersion || EMBEDDED_VERSION,
                        buildNumber: localBuild,
                        latestVersion: serverVersion,
                        latestBuild: serverBuild,
                        isUpdateAvailable: isUpdateAvailable,
                        history: (serverData && serverData.history && serverData.history.length > 0)
                            ? serverData.history
                            : (prev.history && prev.history.length > 0 ? prev.history : defaultVersionData.history)
                    }));"""

if old_set_version in app_code:
    app_code = app_code.replace(old_set_version, new_set_version)
    print("Successfully updated setVersionData in App.jsx to preserve history!")
else:
    print("Could not match old_set_version in App.jsx")

# Fix Splash screen in App.jsx
old_splash_app = """                    {/* Startup Splash Screen Overlay */}
                    <AnimatePresence>
                        {showSplashScreen && (
                            <motion.div
                                key="app-splash-screen"
                                initial={{ opacity: 1, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="fixed inset-0 z-[100000] bg-[#0b101d] flex flex-col items-center justify-center overflow-hidden pointer-events-auto text-white dir-rtl"
                            >
                                {/* Background Image Layer if present */}
                                <picture className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                                    <source media="(orientation: landscape)" srcSet="./splash-landscape.png" />
                                    <img 
                                        src="./splash-portrait.png" 
                                        alt="" 
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        className="w-full h-full object-cover object-center" 
                                    />
                                </picture>

                                {/* Rich Central Splash Content */}
                                <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-4">
                                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-2xl shadow-indigo-500/30 ring-1 ring-white/20 animate-pulse">
                                        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="5" width="20" height="14" rx="3" />
                                            <line x1="2" y1="10" x2="22" y2="10" />
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h1 className="text-2xl font-black tracking-tight text-white font-vazir">امیر فایننس</h1>
                                        <p className="text-xs font-semibold text-indigo-300/80 font-vazir">مدیریت هوشمند مالی، وام‌ها و اقساط</p>
                                    </div>
                                </div>

                                {/* Bottom Spinner */}
                                <div className="absolute bottom-12 inset-x-0 flex flex-col items-center justify-center space-y-3 pointer-events-none z-10">
                                    <div className="w-7 h-7 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-[10px] font-medium text-slate-400 tracking-wider">نسخه ۲.۲.۱</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>"""

new_splash_app = """                    {/* Startup Splash Screen Overlay */}
                    <AnimatePresence>
                        {showSplashScreen && (
                            <motion.div
                                key="app-splash-screen"
                                initial={{ opacity: 1, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="fixed inset-0 z-[100000] bg-[#0b101d] flex items-center justify-center overflow-hidden pointer-events-auto"
                            >
                                <picture className="w-full h-full flex items-center justify-center">
                                    <source media="(orientation: landscape)" srcSet="./splash-landscape.png?v=2.2.1-b211" />
                                    <img 
                                        src="./splash-portrait.png?v=2.2.1-b211" 
                                        alt="Amir Finance Splash Screen" 
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        className="w-full h-full object-cover object-center" 
                                    />
                                </picture>
                                <div className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center space-y-2 pointer-events-none z-10">
                                    <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>"""

if old_splash_app in app_code:
    app_code = app_code.replace(old_splash_app, new_splash_app)
    print("Successfully updated React splash screen in App.jsx!")
else:
    print("Could not match old_splash_app in App.jsx")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app_code)

# 2. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html_code = f.read()

old_splash_html = """    <!-- Instant HTML Splash Screen overlay for zero-delay startup in Preview & PWA -->
    <div id="app-static-splash" style="position:fixed;inset:0;z-index:99999;background:#0b101d;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;transition:opacity 0.5s ease, visibility 0.5s ease;direction:rtl;font-family:'Vazirmatn',sans-serif;">
        <!-- Background Image Layer -->
        <picture style="position:absolute;inset:0;width:100%;height:100%;opacity:0.3;pointer-events:none;">
            <source media="(orientation: landscape)" srcset="./splash-landscape.png" />
            <img src="./splash-portrait.png" alt="" onerror="this.style.display='none';" style="width:100%;height:100%;object-fit:cover;object-position:center;" />
        </picture>
        <!-- Center Branding Content -->
        <div style="position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:1.5rem;gap:1rem;">
            <div style="width:6rem;height:6rem;border-radius:1.5rem;background:linear-gradient(135deg, #4f46e5, #6366f1);display:flex;align-items:center;justify-content:center;box-shadow:0 20px 25px -5px rgba(79, 70, 229, 0.4);border:1px solid rgba(255,255,255,0.2);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="3" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
            </div>
            <div style="display:flex;flex-direction:column;gap:0.25rem;">
                <h1 style="color:#ffffff;font-size:1.5rem;font-weight:900;margin:0;letter-spacing:-0.02em;">امیر فایننس</h1>
                <p style="color:#a5b4fc;font-size:0.8rem;font-weight:600;margin:0;opacity:0.85;">مدیریت هوشمند مالی، وام‌ها و اقساط</p>
            </div>
        </div>
        <!-- Bottom Spinner -->
        <div style="position:absolute;bottom:3rem;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.75rem;pointer-events:none;z-index:10;">
            <div style="width:1.75rem;height:1.75rem;border:2.5px solid #818cf8;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;"></div>
            <span style="font-size:10px;font-weight:500;color:#94a3b8;letter-spacing:1px;">نسخه ۲.۲.۱</span>
        </div>
    </div>"""

new_splash_html = """    <!-- Instant HTML Splash Screen overlay for zero-delay startup in Preview & PWA -->
    <div id="app-static-splash" style="position:fixed;inset:0;z-index:99999;background:#0b101d;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;transition:opacity 0.5s ease, visibility 0.5s ease;">
        <picture style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <source media="(orientation: landscape)" srcset="./splash-landscape.png?v=2.2.1-b211" />
            <img src="./splash-portrait.png?v=2.2.1-b211" alt="Amir Finance Splash" onerror="this.onerror=null;this.style.display='none';" style="width:100%;height:100%;object-fit:cover;object-position:center;" />
        </picture>
        <div style="position:absolute;bottom:2.5rem;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.5rem;pointer-events:none;z-index:10;">
            <div style="width:2rem;height:2rem;border:2px solid #818cf8;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;"></div>
        </div>
    </div>"""

if old_splash_html in html_code:
    html_code = html_code.replace(old_splash_html, new_splash_html)
    print("Successfully updated index.html splash screen!")
else:
    print("Could not match old_splash_html in index.html")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_code)

