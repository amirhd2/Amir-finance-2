import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """            const getUnderlyingTabForSubpage = (subpageTab) => {
                if (subpageTab === 'contact-detail') {
                    if (loanReturnTab === 'accounts') return 'accounts';
                    return 'contacts';
                }"""

replacement = """            const getUnderlyingTabForSubpage = (subpageTab) => {
                if (subpageTab === 'contact-detail') {
                    if (loanReturnTab === 'accounts') return 'accounts';
                    if (loanReturnTab === 'dashboard') return 'dashboard';
                    return 'contacts';
                }"""

if target in content:
    content = content.replace(target, replacement)
    print("Fixed getUnderlyingTabForSubpage")
else:
    print("Not found getUnderlyingTabForSubpage")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
