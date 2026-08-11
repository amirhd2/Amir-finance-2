import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

old_prog = '''                                                                                        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700/80 flex justify-end">'''
new_prog = '''                                                                                        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700/80 flex">'''

app = app.replace(old_prog, new_prog)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

print("Fixed flex on progress bar!")
