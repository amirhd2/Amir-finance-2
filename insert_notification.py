import sys

with open('src/App.jsx', 'r') as f:
    content = f.read()

target = """        ), React.createElement("button", {
          type: "button",
          onClick: handleExportBackup,"""

replacement = """        ), 
        React.createElement("div", {
          className: "p-4 bg-purple-50/50 dark:bg-purple-900/10 border-b border-slate-200/50 dark:border-slate-700/50"
        },
          React.createElement("div", {
            className: "flex items-start gap-3"
          },
            React.createElement("div", {
              className: "w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0 border border-purple-200 dark:border-purple-800/50"
            },
              React.createElement(Icon, {
                name: "bell",
                className: "w-5 h-5 text-purple-600 dark:text-purple-400"
              })
            ),
            React.createElement("div", {
              className: "text-right min-w-0 flex-1 space-y-1"
            },
              React.createElement("p", {
                className: "text-xs font-bold text-slate-900 dark:text-white"
              }, "اعلان هوشمند اقساط"),
              React.createElement("p", {
                className: "text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2"
              }, "با فعال‌سازی این بخش، موعد اقساط به صورت نوتیفیکیشن روی گوشی شما یادآوری می‌شود."),
              React.createElement("button", {
                type: "button",
                onClick: async () => {
                  if (window.requestNotificationPermission) {
                    const token = await window.requestNotificationPermission();
                    if (token) {
                      if (typeof window.showToast === 'function') window.showToast('اعلان‌ها با موفقیت فعال شدند');
                      else alert('اعلان‌ها با موفقیت فعال شدند');
                    } else {
                      if (typeof window.showToast === 'function') window.showToast('دسترسی اعلان رد شد یا خطایی رخ داد');
                      else alert('دسترسی اعلان رد شد یا خطایی رخ داد');
                    }
                  } else {
                    alert('امکان فعال‌سازی اعلان در این نسخه پشتیبانی نمی‌شود');
                  }
                },
                className: "w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              },
                "فعال‌سازی اعلان‌ها"
              )
            )
          )
        ), 
        React.createElement("button", {
          type: "button",
          onClick: handleExportBackup,"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.jsx', 'w') as f:
        f.write(content)
    print("Successfully replaced.")
else:
    print("Target string not found.")
