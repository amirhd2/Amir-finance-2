import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace theme-color effect to match better
target_effect = """            // Status bar meta color synchronization when Stack Wizard or Sticky Cards are open
            useEffect(() => {
                const metaTheme = document.querySelector('meta[name="theme-color"]');
                if (metaTheme) {
                    if (showStackWizard) {
                        metaTheme.setAttribute('content', isDark ? '#0f172a' : '#0f172a'); // Keep dark for both modes to match the wizard backdrop
                    } else {
                        metaTheme.setAttribute('content', isDark ? '#020617' : '#F4F7FC');
                    }
                }
            }, [showStackWizard, isDark]);"""

replacement_effect = """            // Status bar meta color synchronization when Stack Wizard or Sticky Cards are open
            useEffect(() => {
                const metaTheme = document.querySelector('meta[name="theme-color"]');
                if (metaTheme) {
                    if (showStackWizard) {
                        // Mix of #0f172a (65%) and #F4F7FC (35%) -> ~ #5E697C
                        metaTheme.setAttribute('content', isDark ? '#0f172a' : '#5E697C');
                    } else {
                        metaTheme.setAttribute('content', isDark ? '#020617' : '#F4F7FC');
                    }
                }
            }, [showStackWizard, isDark]);"""

content = content.replace(target_effect, replacement_effect)

# Inject safe-area-inset cover
target_modal = """                    {/* Stack Wizard Modal (وام، طلب، قرض، قسط) */}
                    <AnimatePresence>
                        {showStackWizard && (
                            <motion.div 
                                key="stack-wizard-backdrop"
                                variants={iosBackdropVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0 bg-slate-900/65 backdrop-blur-md z-50 flex flex-col justify-start items-center p-3 pt-2.5 overflow-hidden"
                            >"""

replacement_modal = """                    {/* Stack Wizard Modal (وام، طلب، قرض، قسط) */}
                    <AnimatePresence>
                        {showStackWizard && (
                            <motion.div 
                                key="stack-wizard-backdrop"
                                variants={iosBackdropVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0 bg-slate-900/65 backdrop-blur-md z-50 flex flex-col justify-start items-center p-3 pt-2.5 overflow-hidden"
                            >
                                {/* PWA Status Bar Safe Area Cover */}
                                <div className="fixed top-0 inset-x-0 h-[env(safe-area-inset-top,0px)] bg-slate-900/65 backdrop-blur-md z-[60]"></div>"""

content = content.replace(target_modal, replacement_modal)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
