with open('src/App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace setNavDirection('none') inside openLoanDetail, openArchivedPeriodDetail, openContactDetail
code = code.replace(
    """            const openLoanDetail = (loan, overrideReturnTab) => {
                setSelectedLoan(loan);
                if (overrideReturnTab) {
                    setLoanReturnTab(overrideReturnTab);
                } else if (currentTab !== 'loan-detail') {
                    setLoanReturnTab(currentTab);
                }
                setNavDirection('none');
                setCurrentTab('loan-detail');
            };""",
    """            const openLoanDetail = (loan, overrideReturnTab) => {
                setSelectedLoan(loan);
                if (overrideReturnTab) {
                    setLoanReturnTab(overrideReturnTab);
                } else if (currentTab !== 'loan-detail') {
                    setLoanReturnTab(currentTab);
                }
                setNavDirection('forward');
                setCurrentTab('loan-detail');
            };"""
)

code = code.replace(
    """            const openArchivedPeriodDetail = (period, overrideReturnTab) => {
                setSelectedPeriod(period);
                if (overrideReturnTab) {
                    setLoanReturnTab(overrideReturnTab);
                } else if (currentTab !== 'archived-period-detail') {
                    setLoanReturnTab(currentTab);
                }
                setNavDirection('none');
                setCurrentTab('archived-period-detail');
            };""",
    """            const openArchivedPeriodDetail = (period, overrideReturnTab) => {
                setSelectedPeriod(period);
                if (overrideReturnTab) {
                    setLoanReturnTab(overrideReturnTab);
                } else if (currentTab !== 'archived-period-detail') {
                    setLoanReturnTab(currentTab);
                }
                setNavDirection('forward');
                setCurrentTab('archived-period-detail');
            };"""
)

code = code.replace(
    """            const openContactDetail = (contact, filter = 'all', returnTab = 'contacts') => {
                setSelectedContact(contact);
                if (filter) setProfileFilter(filter);
                setLoanReturnTab(returnTab);
                setNavDirection('none');
                setCurrentTab('contact-detail');
            };""",
    """            const openContactDetail = (contact, filter = 'all', returnTab = 'contacts') => {
                setSelectedContact(contact);
                if (filter) setProfileFilter(filter);
                setLoanReturnTab(returnTab);
                setNavDirection('forward');
                setCurrentTab('contact-detail');
            };"""
)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("open detail functions updated successfully!")
