import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

# Replace C with X in clear search buttons
app = app.replace(
'''                                        title="پاک‌سازی جستجو">
                                        C
                                    </button>''',
'''                                        title="پاک‌سازی جستجو">
                                        <Icon name="x" className="w-6 h-6" />
                                    </button>''')

app = app.replace(
'''                                            title="پاک‌سازی جستجو">
                                            C
                                        </button>''',
'''                                            title="پاک‌سازی جستجو">
                                            <Icon name="x" className="w-6 h-6" />
                                        </button>''')


# Change Accounts search box class
app = app.replace(
'className="w-full h-12 pr-10 pl-4 bg-slate-100 dark:bg-slate-800 border-none rounded-full focus:ring-2 focus:ring-indigo-600/20 text-sm text-right text-slate-900 dark:text-white placeholder:text-slate-400 shadow-xs"',
'className="w-full h-12 pr-10 pl-4 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-full focus:ring-2 focus:ring-indigo-600/20 text-sm text-right text-slate-900 dark:text-white placeholder:text-slate-400 shadow-inner"'
)

# Remove the Accounts plus button
accounts_header = '''                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">مدیریت حساب‌ها</h1>
                                    </div>
                                    <button 
                                        onClick={() => setIsAddTxOpen(true)}
                                        className="w-11 h-11 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-all shrink-0"
                                        title="افزودن حساب / تراکنش جدید">
                                        <Icon name="plus" className="w-6 h-6" />
                                    </button>
                                </div>'''

accounts_header_new = '''                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">مدیریت حساب‌ها</h1>
                                    </div>
                                </div>'''

app = app.replace(accounts_header, accounts_header_new)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

print("Fixed search box, replaced C with X, removed Plus button.")
