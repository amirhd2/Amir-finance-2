import re

with open('index.html', 'r') as f:
    content = f.read()

# Let's check where handleRefreshData is placed and move it AFTER showToast definition
# Or define handleRefreshData inside App after showToast.

# First, let's fix the SwipeBackWrapper tags:
# 1) contact-detail
content = content.replace(
    "<SwipeBackWrapper onBack={() => setCurrentTab('contacts')}>\n                            <div className=\"space-y-4 animate-fade-in\">",
    "<SwipeBackWrapper onBack={() => setCurrentTab('contacts')}>\n                            <div className=\"space-y-4 animate-fade-in\">"
)

# Replace end of contact-detail block:
old_cd_end = """                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Loan Detail Tab */}"""

new_cd_end = """                                        </div>
                                    )}
                                </div>
                            </div>
                            </SwipeBackWrapper>
                        )}

                        {/* Loan Detail Tab */}"""

if old_cd_end in content:
    content = content.replace(old_cd_end, new_cd_end)
    print("Fixed contact-detail closing tag")

# 2) loan-detail end
old_ld_end = """                                    <Icon name="file-output" className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>خروجی پرونده وام</span>
                                </button>
                            </div>
                        )}

                        {/* View All Transactions Tab */}"""

new_ld_end = """                                    <Icon name="file-output" className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    <span>خروجی پرونده وام</span>
                                </button>
                            </div>
                            </SwipeBackWrapper>
                        )}

                        {/* View All Transactions Tab */}"""

if old_ld_end in content:
    content = content.replace(old_ld_end, new_ld_end)
    print("Fixed loan-detail closing tag")

# 3) Remove SwipeBackWrapper from showStackWizard if it doesn't have closing tag
content = content.replace(
    """                    {/* Stack Wizard Modal (وام، طلب، قرض، قسط) */}
                    {showStackWizard && (
                        <SwipeBackWrapper onBack={() => {
                            if (currentCardIdx > 0) {
                                handlePrevCard();
                            } else {
                                setShowStackWizard(false);
                            }
                        }}>
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex flex-col justify-start p-4 pt-5 animate-fade-in overflow-hidden">""",
    """                    {/* Stack Wizard Modal (وام، طلب، قرض، قسط) */}
                    {showStackWizard && (
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex flex-col justify-start p-4 pt-5 animate-fade-in overflow-hidden">"""
)

with open('index.html', 'w') as f:
    f.write(content)

print("Updated index.html tags!")
