import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace 1. Loan (وام)
loan_btn_old = """                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openContactDetail(contact, 'loans', 'contacts');
                                                                }}
                                                                className={`flex-1 rounded-2xl h-8 text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                                                                    hasActiveLoan 
                                                                        ? 'bg-blue-600 text-white shadow-sm active:scale-95' 
                                                                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-default'
                                                                }`}
                                                            >
                                                                {hasSettledLoan && <Icon name="check" className="w-4 h-4 shrink-0" />}
                                                                <span>وام</span>
                                                            </button>"""

loan_btn_new = """                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openContactDetail(contact, 'loans', 'contacts');
                                                                }}
                                                                className={`relative flex-1 rounded-2xl h-8 text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                                                                    hasActiveLoan 
                                                                        ? 'bg-blue-600 text-white shadow-sm active:scale-95' 
                                                                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-default'
                                                                }`}
                                                            >
                                                                {hasSettledLoan && (
                                                                    <div className="absolute right-1.5 w-[14px] h-[14px] rounded-full border border-current flex items-center justify-center shrink-0 opacity-90">
                                                                        <Icon name="check" className="w-2.5 h-2.5" strokeWidth={3} />
                                                                    </div>
                                                                )}
                                                                <span>وام</span>
                                                            </button>"""
content = content.replace(loan_btn_old, loan_btn_new)

# Replace 2. Demand (طلب)
demand_btn_old = """                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openContactDetail(contact, 'demands', 'contacts');
                                                                }}
                                                                className={`flex-1 rounded-2xl h-8 text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                                                                    hasActiveDemand 
                                                                        ? 'bg-emerald-600 text-white shadow-sm active:scale-95' 
                                                                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-default'
                                                                }`}
                                                            >
                                                                {hasSettledDemand && <Icon name="check" className="w-4 h-4 shrink-0" />}
                                                                <span>طلب</span>
                                                            </button>"""
demand_btn_new = """                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openContactDetail(contact, 'demands', 'contacts');
                                                                }}
                                                                className={`relative flex-1 rounded-2xl h-8 text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                                                                    hasActiveDemand 
                                                                        ? 'bg-emerald-600 text-white shadow-sm active:scale-95' 
                                                                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-default'
                                                                }`}
                                                            >
                                                                {hasSettledDemand && (
                                                                    <div className="absolute right-1.5 w-[14px] h-[14px] rounded-full border border-current flex items-center justify-center shrink-0 opacity-90">
                                                                        <Icon name="check" className="w-2.5 h-2.5" strokeWidth={3} />
                                                                    </div>
                                                                )}
                                                                <span>طلب</span>
                                                            </button>"""
content = content.replace(demand_btn_old, demand_btn_new)

# Replace 3. Debt (بدهی)
debt_btn_old = """                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openContactDetail(contact, 'debts', 'contacts');
                                                                }}
                                                                className={`flex-1 rounded-2xl h-8 text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                                                                    hasActiveDebt 
                                                                        ? 'bg-rose-600 text-white shadow-sm active:scale-95' 
                                                                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-default'
                                                                }`}
                                                            >
                                                                {hasSettledDebt && <Icon name="check" className="w-4 h-4 shrink-0" />}
                                                                <span>بدهی</span>
                                                            </button>"""
debt_btn_new = """                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openContactDetail(contact, 'debts', 'contacts');
                                                                }}
                                                                className={`relative flex-1 rounded-2xl h-8 text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                                                                    hasActiveDebt 
                                                                        ? 'bg-rose-600 text-white shadow-sm active:scale-95' 
                                                                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-default'
                                                                }`}
                                                            >
                                                                {hasSettledDebt && (
                                                                    <div className="absolute right-1.5 w-[14px] h-[14px] rounded-full border border-current flex items-center justify-center shrink-0 opacity-90">
                                                                        <Icon name="check" className="w-2.5 h-2.5" strokeWidth={3} />
                                                                    </div>
                                                                )}
                                                                <span>بدهی</span>
                                                            </button>"""
content = content.replace(debt_btn_old, debt_btn_new)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Buttons fixed.")
