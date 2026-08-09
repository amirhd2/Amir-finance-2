import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = "onBack={() => navigateToTab(loanReturnTab === 'accounts' ? 'accounts' : 'contacts', 'none')}"
replacement = "onBack={() => navigateToTab(loanReturnTab || 'contacts', 'none')}"

if target in content:
    content = content.replace(target, replacement)
    print("Fixed contact-detail back navigation")
else:
    print("Not found")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
