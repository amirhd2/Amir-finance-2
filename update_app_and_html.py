import re

# --- 1. Update src/App.jsx ---
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_code = f.read()

# Replace SwipeToDeleteItem updateVisuals & useEffect in App.jsx
old_swipe_item_code = """            const updateVisuals = (currentOffset, dragging) => {
                const cardEl = cardRef.current;
                const btnEl = btnRef.current;
                if (!cardEl || !btnEl) return;

                const gap = 8;
                const rawBtnWidth = Math.max(0, currentOffset - gap);
                
                // Appearance (Fade in & Scale)
                const appearanceProgress = Math.min(1, Math.max(0, (currentOffset - 4) / 36));
                const btnOpacity = appearanceProgress;
                const btnScale = 0.5 + 0.5 * appearanceProgress;

                // Circle (52px wide, 26px radius) -> Rounded Rect (expands with swipe, 16px radius)
                const btnWidthPx = Math.max(52, rawBtnWidth);
                const morphProgress = Math.min(1, Math.max(0, (btnWidthPx - 52) / 30));
                const borderRadiusPx = 26 - (26 - 16) * morphProgress;

                const transitionStr = dragging 
                    ? 'none' 
                    : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s linear';
                
                cardEl.style.transition = dragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
                cardEl.style.transform = `translate3d(${-currentOffset}px, 0, 0)`;

                btnEl.style.transition = transitionStr;
                btnEl.style.width = `${btnWidthPx}px`;
                btnEl.style.height = '52px';
                btnEl.style.borderRadius = `${borderRadiusPx}px`;
                btnEl.style.opacity = `${btnOpacity}`;
                btnEl.style.transform = `translate3d(0, -50%, 0) scale(${btnScale})`;
                btnEl.style.visibility = currentOffset > 2 ? 'visible' : 'hidden';
            };

            const snapTo = (targetOffset, dragging = false) => {
                offsetRef.current = targetOffset;
                updateVisuals(targetOffset, dragging);
            };

            useEffect(() => {
                if (!swipedOpen) return;
                const handleGlobalClick = (e) => {
                    if (containerRef.current && !containerRef.current.contains(e.target)) {
                        snapTo(0, false);
                        setSwipedOpen(false);
                    }
                };
                window.addEventListener('touchstart', handleGlobalClick, { passive: true });
                window.addEventListener('mousedown', handleGlobalClick);
                return () => {
                    window.removeEventListener('touchstart', handleGlobalClick);
                    window.removeEventListener('mousedown', handleGlobalClick);
                };
            }, [swipedOpen]);"""

new_swipe_item_code = """            const updateVisuals = (currentOffset, dragging) => {
                const cardEl = cardRef.current;
                const btnEl = btnRef.current;
                if (!cardEl || !btnEl) return;

                const gap = 8;
                const rawBtnWidth = Math.max(0, currentOffset - gap);
                
                // Appearance (Fade in & Scale)
                const appearanceProgress = Math.min(1, Math.max(0, (currentOffset - 4) / 36));
                const btnOpacity = appearanceProgress;
                const btnScale = 0.5 + 0.5 * appearanceProgress;

                // Circle (52px wide, 26px radius) -> Rounded Rect (expands with swipe, 16px radius)
                const btnWidthPx = Math.max(52, rawBtnWidth);
                const morphProgress = Math.min(1, Math.max(0, (btnWidthPx - 52) / 30));
                const borderRadiusPx = 26 - (26 - 16) * morphProgress;

                const transitionStr = dragging 
                    ? 'none' 
                    : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
                
                cardEl.style.transition = dragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                cardEl.style.transform = `translate3d(${-currentOffset}px, 0, 0)`;

                btnEl.style.transition = transitionStr;
                btnEl.style.width = `${btnWidthPx}px`;
                btnEl.style.height = '52px';
                btnEl.style.borderRadius = `${borderRadiusPx}px`;
                btnEl.style.opacity = `${btnOpacity}`;
                btnEl.style.transform = `translate3d(0, -50%, 0) scale(${btnScale})`;
                
                if (currentOffset > 2) {
                    btnEl.style.visibility = 'visible';
                } else if (!dragging) {
                    btnEl.style.visibility = 'visible';
                    setTimeout(() => {
                        if (offsetRef.current === 0 && btnRef.current) {
                            btnRef.current.style.visibility = 'hidden';
                        }
                    }, 300);
                } else {
                    btnEl.style.visibility = 'hidden';
                }
            };

            const snapTo = (targetOffset, dragging = false) => {
                offsetRef.current = targetOffset;
                updateVisuals(targetOffset, dragging);
            };

            useEffect(() => {
                if (!swipedOpen) return;
                const handleGlobalClick = (e) => {
                    if (containerRef.current && !containerRef.current.contains(e.target)) {
                        snapTo(0, false);
                        setSwipedOpen(false);
                    }
                };
                window.addEventListener('pointerdown', handleGlobalClick, { capture: true });
                window.addEventListener('touchstart', handleGlobalClick, { capture: true, passive: true });
                window.addEventListener('mousedown', handleGlobalClick, { capture: true });
                return () => {
                    window.removeEventListener('pointerdown', handleGlobalClick, { capture: true });
                    window.removeEventListener('touchstart', handleGlobalClick, { capture: true });
                    window.removeEventListener('mousedown', handleGlobalClick, { capture: true });
                };
            }, [swipedOpen]);"""

if old_swipe_item_code in app_code:
    app_code = app_code.replace(old_swipe_item_code, new_swipe_item_code)
    print("Successfully updated SwipeToDeleteItem smooth closing and global click!")
else:
    print("Could not match old_swipe_item_code exact match in App.jsx")

# Update React Splash Screen in App.jsx
old_react_splash = """                    {/* Startup Splash Screen Overlay */}
                    <AnimatePresence>
                        {showSplashScreen && (
                            <motion.div
                                key="app-splash-screen"
                                initial={{ opacity: 1, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
                                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                className="fixed inset-0 z-[100000] bg-[#0b101d] flex items-center justify-center overflow-hidden pointer-events-auto"
                            >
                                <picture className="w-full h-full flex items-center justify-center">
                                    <source media="(orientation: landscape)" srcSet="./splash-landscape.png?v=2.2.1-b220" />
                                    <img 
                                        src="./splash-portrait.png?v=2.2.1-b220" 
                                        alt="Amir Finance Splash Screen" 
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        className="w-full h-full object-cover object-center" 
                                    />
                                </picture>
                                <div className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center space-y-2 pointer-events-none">
                                    <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>"""

new_react_splash = """                    {/* Startup Splash Screen Overlay */}
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

if old_react_splash in app_code:
    app_code = app_code.replace(old_react_splash, new_react_splash)
    print("Successfully updated React splash screen in App.jsx!")
else:
    print("Could not match old_react_splash exact match in App.jsx")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app_code)

# --- 2. Update index.html ---
with open('index.html', 'r', encoding='utf-8') as f:
    html_code = f.read()

old_html_splash = """    <!-- Instant HTML Splash Screen overlay for zero-delay startup in Preview & PWA -->
    <div id="app-static-splash" style="position:fixed;inset:0;z-index:99999;background:#0b101d;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;transition:opacity 0.5s ease, visibility 0.5s ease;">
        <picture style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <source media="(orientation: landscape)" srcset="./splash-landscape.png?v=2.2.1-b220" />
            <img src="./splash-portrait.png?v=2.2.1-b220" alt="Amir Finance Splash" onerror="this.onerror=null;this.style.display='none';" style="width:100%;height:100%;object-fit:cover;object-position:center;" />
        </picture>
        <div style="position:absolute;bottom:2.5rem;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.5rem;pointer-events:none;">
            <div style="width:2rem;height:2rem;border:2px solid #818cf8;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;"></div>
        </div>
    </div>"""

new_html_splash = """    <!-- Instant HTML Splash Screen overlay for zero-delay startup in Preview & PWA -->
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

if old_html_splash in html_code:
    html_code = html_code.replace(old_html_splash, new_html_splash)
    print("Successfully updated index.html splash screen!")
else:
    print("Could not match old_html_splash in index.html")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_code)

print("Updates complete!")
