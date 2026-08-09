import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """            const getUnderlyingTabForSubpage = (subpageTab) => {
                if (subpageTab === 'contact-detail') {
                    if (loanReturnTab === 'accounts') return 'accounts';
                    if (loanReturnTab === 'dashboard') return 'dashboard';
                    return 'contacts';
                }
                if (subpageTab === 'loan-detail') {
                    if (loanReturnTab === 'contact-detail' && selectedContact) return 'contact-detail';
                    if (loanReturnTab === 'dashboard') return 'dashboard';
                    return 'accounts';
                }
                if (subpageTab === 'archived-period-detail') {
                    if ((loanReturnTab || 'contact-detail') === 'contact-detail' && selectedContact) return 'contact-detail';
                    if (loanReturnTab === 'dashboard') return 'dashboard';
                    return 'accounts';
                }
                if (subpageTab === 'all-transactions') return 'dashboard';
                return 'accounts';
            };"""

replacement = """            const getUnderlyingTabForSubpage = (subpageTab) => {
                if (subpageTab === 'contact-detail') {
                    if (loanReturnTab === 'accounts') return 'accounts';
                    if (loanReturnTab === 'dashboard') return 'dashboard';
                    if (loanReturnTab === 'all-transactions') return 'all-transactions';
                    return 'contacts';
                }
                if (subpageTab === 'loan-detail') {
                    if (loanReturnTab === 'contact-detail' && selectedContact) return 'contact-detail';
                    if (loanReturnTab === 'dashboard') return 'dashboard';
                    if (loanReturnTab === 'all-transactions') return 'all-transactions';
                    return 'accounts';
                }
                if (subpageTab === 'archived-period-detail') {
                    if ((loanReturnTab || 'contact-detail') === 'contact-detail' && selectedContact) return 'contact-detail';
                    if (loanReturnTab === 'dashboard') return 'dashboard';
                    if (loanReturnTab === 'all-transactions') return 'all-transactions';
                    return 'accounts';
                }
                if (subpageTab === 'all-transactions') return 'dashboard';
                return 'accounts';
            };"""

if target in content:
    content = content.replace(target, replacement)
    print("Fixed all-transactions underlying")
else:
    print("Not found underlying")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
