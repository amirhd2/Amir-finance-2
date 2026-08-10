import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

static_splash_html = """<body class="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-[100dvh] w-full h-full flex flex-col p-0 m-0 overflow-hidden">
    <!-- Instant HTML Splash Screen overlay for zero-delay startup in Preview & PWA -->
    <div id="app-static-splash" style="position:fixed;inset:0;z-index:99999;background:#0b101d;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:opacity 0.5s ease, visibility 0.5s ease;">
        <picture style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <source media="(orientation: landscape)" srcset="./splash-landscape.png" />
            <img src="./splash-portrait.png" alt="Amir Finance Splash" style="width:100%;height:100%;object-fit:cover;object-position:center;" />
        </picture>
    </div>"""

if 'id="app-static-splash"' not in html:
    html = re.sub(
        r'<body class="[^"]*">',
        static_splash_html,
        html,
        count=1
    )
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Updated index.html with static splash screen!")
else:
    print("index.html already contains app-static-splash")

# 2. Update src/App.jsx
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_code = f.read()

# Add showSplashScreen state and useEffect in App
splash_state_code = """            const [showSplashScreen, setShowSplashScreen] = useState(true);

            useEffect(() => {
                // Hide static HTML splash overlay if present
                const staticSplash = document.getElementById('app-static-splash');
                if (staticSplash) {
                    staticSplash.style.opacity = '0';
                    staticSplash.style.pointerEvents = 'none';
                    setTimeout(() => {
                        if (staticSplash && staticSplash.parentNode) {
                            staticSplash.parentNode.removeChild(staticSplash);
                        }
                    }, 550);
                }
                const timer = setTimeout(() => {
                    setShowSplashScreen(false);
                }, 1800);
                return () => clearTimeout(timer);
            }, []);"""

if 'const [showSplashScreen, setShowSplashScreen]' not in app_code:
    # Insert before showStackWizard
    target_str = "const [showStackWizard, setShowStackWizard] = useState(false);"
    app_code = app_code.replace(target_str, splash_state_code + "\n            " + target_str)
    print("Added showSplashScreen state & useEffect to App.jsx!")

# Add JSX Splash Overlay in return statement of App
splash_jsx = """                <div className={`w-full h-full flex flex-col justify-between ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F4F7FC] text-slate-800'}`}>
                    {/* Startup Splash Screen Overlay */}
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
                                    <source media="(orientation: landscape)" srcSet="./splash-landscape.png" />
                                    <img 
                                        src="./splash-portrait.png" 
                                        alt="Amir Finance Splash Screen" 
                                        className="w-full h-full object-cover object-center" 
                                    />
                                </picture>
                                <div className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center space-y-2 pointer-events-none">
                                    <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>"""

target_return = """                <div className={`w-full h-full flex flex-col justify-between ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F4F7FC] text-slate-800'}`}>"""

if 'key="app-splash-screen"' not in app_code:
    app_code = app_code.replace(target_return, splash_jsx)
    print("Added Splash Screen JSX to App.jsx return!")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("add_splash_screen.py completed successfully!")
