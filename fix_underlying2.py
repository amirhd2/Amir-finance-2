import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """                if (subpageTab === 'archived-period-detail') {
                    if ((loanReturnTab || 'contact-detail') === 'contact-detail' && selectedContact) return 'contact-detail';
                    return 'accounts';
                }"""

replacement = """                if (subpageTab === 'archived-period-detail') {
                    if ((loanReturnTab || 'contact-detail') === 'contact-detail' && selectedContact) return 'contact-detail';
                    if (loanReturnTab === 'dashboard') return 'dashboard';
                    return 'accounts';
                }"""

if target in content:
    content = content.replace(target, replacement)
    print("Fixed archived-period-detail underlying")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
