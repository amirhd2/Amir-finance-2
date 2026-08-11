import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

# Replace for transactions and accounts list items
app = app.replace(
    'bg-[#FDFDFE] dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-sm',
    'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm ring-1 ring-slate-900/5 dark:ring-0'
)

# Fix settings cards
# There are 4 sections: Appearance, Backup, About, Developer
settings_old_style = 'bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700/60 cursor-pointer transition-all hover:border-indigo-300'
settings_new_style = 'bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm ring-1 ring-slate-900/5 dark:ring-0 cursor-pointer transition-all hover:border-indigo-400'

app = app.replace(settings_old_style, settings_new_style)

# Stack cards
stack_old = 'bg-[#FDFDFE] dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700'
stack_new = 'bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm ring-1 ring-slate-900/5 dark:ring-0'

app = app.replace(stack_old, stack_new)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

print("Updated card styles!")
