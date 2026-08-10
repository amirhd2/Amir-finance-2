import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update status bar useEffect
old_effect = """            // Status bar meta color synchronization when Stack Wizard or Sticky Cards are open
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

new_effect = """            // Status bar meta color and body/documentElement background synchronization
            const isAnyModalOpen = showStackWizard || 
                showAddContactModal || 
                showEditContactModal || 
                showDeleteConfirmModal || 
                showExportModal || 
                (showCompletedExportModal && showCompletedExportModal.show) || 
                showResetConfirmModal || 
                showRestoreConfirmModal || 
                showDeleteLoanModal || 
                (deleteTxModal && deleteTxModal.show) || 
                showUnsavedConfirmDialog;

            useEffect(() => {
                const metaTheme = document.querySelector('meta[name="theme-color"]');
                const darkBackdropColor = '#0b101d';

                if (isAnyModalOpen) {
                    if (metaTheme) metaTheme.setAttribute('content', darkBackdropColor);
                    if (document.body) document.body.style.backgroundColor = darkBackdropColor;
                    if (document.documentElement) document.documentElement.style.backgroundColor = darkBackdropColor;
                } else {
                    const activeColor = isDark ? '#020617' : '#F4F7FC';
                    if (metaTheme) metaTheme.setAttribute('content', activeColor);
                    if (document.body) document.body.style.backgroundColor = activeColor;
                    if (document.documentElement) document.documentElement.style.backgroundColor = activeColor;
                }
            }, [isAnyModalOpen, isDark]);"""

if old_effect in code:
    code = code.replace(old_effect, new_effect)
    print("Replaced status bar useEffect!")
else:
    print("old_effect not found, doing regex replace...")
    code = re.sub(
        r'// Status bar meta color synchronization when Stack Wizard.*?\n\s*\}, \[showStackWizard, isDark\]\);',
        new_effect.strip(),
        code,
        flags=re.DOTALL
    )

# 2. Update Stack Wizard backdrop overlay and safe area cover
old_backdrop = 'className="absolute inset-0 bg-slate-900/65 backdrop-blur-md z-50 flex flex-col justify-start items-center p-3 pt-2.5 overflow-hidden"'
new_backdrop = 'className="absolute inset-0 bg-[#0b101d]/90 backdrop-blur-md z-50 flex flex-col justify-start items-center p-3 pt-2.5 overflow-hidden"'

old_safe_area = '<div className="fixed top-0 inset-x-0 h-[env(safe-area-inset-top,0px)] bg-slate-900/65 backdrop-blur-md z-[60]"></div>'
new_safe_area = '<div className="fixed top-0 inset-x-0 h-[max(env(safe-area-inset-top,0px),24px)] bg-[#0b101d] backdrop-blur-md z-[60]"></div>'

if old_backdrop in code:
    code = code.replace(old_backdrop, new_backdrop)
    print("Replaced stack wizard backdrop!")

if old_safe_area in code:
    code = code.replace(old_safe_area, new_safe_area)
    print("Replaced safe area cover!")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("fix_statusbar_color completed successfully!")
