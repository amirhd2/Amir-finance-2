import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix openContactDetail
content = content.replace("setNavDirection('forward');\n                setCurrentTab('contact-detail');", "setNavDirection('none');\n                setCurrentTab('contact-detail');")

# Fix openLoanDetail
content = content.replace("setNavDirection('forward');\n                setCurrentTab('loan-detail');", "setNavDirection('none');\n                setCurrentTab('loan-detail');")

# Fix openArchivedPeriodDetail
content = content.replace("setNavDirection('forward');\n                setCurrentTab('archived-period-detail');", "setNavDirection('none');\n                setCurrentTab('archived-period-detail');")

# Fix all-transactions link
content = content.replace("navigateToTab('all-transactions', 'forward')", "navigateToTab('all-transactions', 'none')")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
