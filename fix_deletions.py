import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("setCurrentTab('contacts');", "navigateToTab('contacts', 'back');")
content = content.replace("setCurrentTab(loanReturnTab || 'accounts');", "navigateToTab(loanReturnTab || 'accounts', 'back');")
content = content.replace("setCurrentTab(loanReturnTab || 'contact-detail');", "navigateToTab(loanReturnTab || 'contact-detail', 'back');")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed deletion navigations")
