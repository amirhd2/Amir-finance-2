import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

old_prog = '''                                                                                        <div className="flex justify-between items-center text-[10px] font-bold">
                                                                                            <span className="text-emerald-600 dark:text-emerald-400">{nextDueInfo.paidInst} پرداخت شده</span>
                                                                                            <span className="text-slate-400 dark:text-slate-500">مانده {Math.max(0, loan.installmentCount - nextDueInfo.paidInst)}</span>
                                                                                        </div>
                                                                                        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700/80">
                                                                                            <div 
                                                                                                className="h-full bg-gradient-to-l from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-full transition-all duration-500" 
                                                                                                style={{ width: `${Math.min(100, (loan.installmentCount > 0 ? (nextDueInfo.paidInst / loan.installmentCount) * 100 : 0))}%` }}
                                                                                            />
                                                                                        </div>'''

new_prog = '''                                                                                        <div className="flex justify-between items-center text-[10px] font-bold">
                                                                                            <span className="text-emerald-600 dark:text-emerald-400">{nextDueInfo.paidInst} پرداخت شده</span>
                                                                                            <span className="text-slate-400 dark:text-slate-500">مانده {nextDueInfo.remainingInst}</span>
                                                                                        </div>
                                                                                        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700/80 flex justify-end">
                                                                                            <div 
                                                                                                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-full transition-all duration-500" 
                                                                                                style={{ width: `${Math.min(100, (nextDueInfo.totalInst > 0 ? (nextDueInfo.paidInst / nextDueInfo.totalInst) * 100 : 0))}%` }}
                                                                                            />
                                                                                        </div>'''

app = app.replace(old_prog, new_prog)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

print("Fixed progress bar bug!")
