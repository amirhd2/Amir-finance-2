import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

old_loan_card = '''                                                                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-sm p-4 sm:p-5 transition-all cursor-pointer hover:border-indigo-300">
                                                                            <div className="w-full flex flex-col gap-2">
                                                                                <div className="flex items-center justify-between w-full">
                                                                                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                                                                        <Icon name="landmark" className="w-6 h-6" />
                                                                                    </div>
                                                                                    <div className="flex-1 text-right flex flex-col gap-1 pl-4 pr-2">
                                                                                        <h3 className="font-bold text-slate-800 dark:text-white text-sm">{loan.title}</h3>
                                                                                        <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{loan.contactName || "بانک"}</p>
                                                                                    </div>
                                                                                    <div className="text-left shrink-0 flex flex-col items-center">
                                                                                        <div className="text-indigo-600 dark:text-indigo-400 font-bold text-base leading-none">{loan.principalAmount.toLocaleString()}</div>
                                                                                        <div className="text-indigo-600 dark:text-indigo-400 text-xs">تومان</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex justify-center">
                                                                                    <span className="text-slate-500 dark:text-slate-400 font-bold text-xs">آخرین قسط پرداخت شده : {nextDueInfo.lastPaidDateStr || "هنوز پرداختی ثبت نشده"}</span>
                                                                                </div>
                                                                                <div className="bg-indigo-50/50 dark:bg-indigo-950/40 rounded-lg py-2 px-4 text-center">
                                                                                    <span className="text-slate-600 dark:text-slate-300 font-bold text-sm">سررسید قسط {nextDueInfo.paidInst + 1}: {nextDueInfo.nextDueDateStr}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>'''

new_loan_card = '''                                                                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm ring-1 ring-slate-900/5 dark:ring-0 p-3 sm:p-4 transition-all cursor-pointer hover:border-indigo-400">
                                                                            <div className="w-full flex flex-col gap-3">
                                                                                <div className="flex items-center justify-between w-full">
                                                                                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-inner">
                                                                                        <Icon name="landmark" className="w-6 h-6" />
                                                                                    </div>
                                                                                    <div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">
                                                                                        <h3 className="font-bold text-slate-800 dark:text-white text-sm leading-tight">{loan.title}</h3>
                                                                                        <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal line-clamp-1">{loan.contactName || "بانک"}</p>
                                                                                    </div>
                                                                                    <div className="text-left shrink-0 flex flex-col items-center">
                                                                                        <div className="text-indigo-600 dark:text-indigo-400 font-bold text-base leading-none">{loan.principalAmount.toLocaleString()}</div>
                                                                                        <div className="text-indigo-600 dark:text-indigo-400 text-[10px] mt-1 font-medium">تومان</div>
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                                <div className="flex flex-col gap-2">
                                                                                    <div className="flex items-center justify-between w-full bg-[#F4F7FC] dark:bg-slate-900/50 rounded-xl px-3 py-1.5 border border-slate-200/50 dark:border-slate-700/50">
                                                                                        <span className="text-slate-500 dark:text-slate-400 font-medium text-xs">سررسید قسط {nextDueInfo.paidInst + 1}</span>
                                                                                        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">{nextDueInfo.nextDueDateStr}</span>
                                                                                    </div>
                                                                                    
                                                                                    <div className="w-full flex flex-col gap-1 px-1">
                                                                                        <div className="flex justify-between items-center text-[10px] font-bold">
                                                                                            <span className="text-emerald-600 dark:text-emerald-400">{nextDueInfo.paidInst} پرداخت شده</span>
                                                                                            <span className="text-slate-400 dark:text-slate-500">{loan.installmentCount} کل اقساط</span>
                                                                                        </div>
                                                                                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                                                                                            <div 
                                                                                                className="h-full bg-gradient-to-l from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-full transition-all duration-500" 
                                                                                                style={{ width: `${Math.min(100, (nextDueInfo.paidInst / loan.installmentCount) * 100)}%` }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>'''

app = app.replace(old_loan_card, new_loan_card)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

print("Updated Loan Card Style!")
