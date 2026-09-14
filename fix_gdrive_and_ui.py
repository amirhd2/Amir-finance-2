import sys

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Remove the notification block from the Backup section
backup_notification_block = """        ), 
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

if backup_notification_block in content:
    content = content.replace(backup_notification_block, """        ), React.createElement("button", {
          type: "button",
          onClick: handleExportBackup,""")
    print("Removed from Backup section.")
else:
    print("Could not find backup notification block.")


# 2. Add it to the notifications section
notifications_target = """        React.createElement("div", {
          className: `w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${enableDailyAlerts ? '-translate-x-5' : 'translate-x-0'}`
        })))))), /*#__PURE__*/"""

notifications_replacement = """        React.createElement("div", {
          className: `w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${enableDailyAlerts ? '-translate-x-5' : 'translate-x-0'}`
        }))), /*#__PURE__*/
        /*#__PURE__*/
        React.createElement("div", {
          className: "flex items-start gap-3 p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-800/50 mt-2"
        },
          React.createElement("div", {
            className: "w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0 border border-purple-200 dark:border-purple-800/50"
          },
            React.createElement(Icon, {
              name: "bell",
              className: "w-4.5 h-4.5 text-purple-600 dark:text-purple-400"
            })
          ),
          React.createElement("div", {
            className: "text-right min-w-0 flex-1 space-y-1"
          },
            React.createElement("p", {
              className: "text-xs font-bold text-slate-900 dark:text-white"
            }, "اعلان هوشمند اقساط (Push)"),
            React.createElement("p", {
              className: "text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2"
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
              className: "w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1.5"
            },
              "فعال‌سازی اعلان‌ها"
            )
          )
        )
        )))), /*#__PURE__*/"""

if notifications_target in content:
    content = content.replace(notifications_target, notifications_replacement)
    print("Added to Notifications section.")
else:
    print("Could not find notifications target.")

with open('src/App.jsx', 'w') as f:
    f.write(content)
