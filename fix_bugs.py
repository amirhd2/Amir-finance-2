import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: archived-period-detail SwipeableTxCard onEdit
# We can find this specifically inside `case 'archived-period-detail':`
# The exact match for that map:
target1 = """                                            {periodTxs.map((tx, idx) => (
                                                <SwipeableTxCard
                                                    key={tx.id || idx}
                                                    tx={tx}
                                                    contacts={contacts}
                                                    loans={loans}
                                                    isHighlighted={highlightedTxId !== null && String(tx.id) === String(highlightedTxId)}
                                                    onEdit={(txItem) => handleTransactionClick(txItem)}
                                                    onDelete={(txItem, confirmCb) => requestDeleteTx(txItem, txItem.type || 'tx', confirmCb)}
                                                />
                                            ))}"""

replacement1 = """                                            {periodTxs.map((tx, idx) => (
                                                <SwipeableTxCard
                                                    key={tx.id || idx}
                                                    tx={tx}
                                                    contacts={contacts}
                                                    loans={loans}
                                                    isHighlighted={highlightedTxId !== null && String(tx.id) === String(highlightedTxId)}
                                                    onEdit={(txItem) => openStackWizard(txItem.type === 'debt_repayment' || txItem.type === 'demand_repayment' || txItem.type === 'repayment' ? (isDebt ? 'debt_repayment' : 'demand_repayment') : (isDebt ? 'debt' : 'demand'), 'edit', txItem)}
                                                    onDelete={(txItem, confirmCb) => requestDeleteTx(txItem, txItem.type || 'tx', confirmCb)}
                                                />
                                            ))}"""

content = content.replace(target1, replacement1)

# Fix 2: Sync focus on openStackWizard
target2 = """                setIsFinalSubmitting(false);
                setShowPlusMenu(false);
                setShowStackWizard(true);
            };"""

replacement2 = """                setIsFinalSubmitting(false);
                setShowPlusMenu(false);
                
                if (window.ReactDOM && window.ReactDOM.flushSync) {
                    window.ReactDOM.flushSync(() => {
                        setShowStackWizard(true);
                    });
                    const activeCardNode = document.querySelector('.stack-wizard-overlay .stack-card[data-depth="0"]');
                    if (activeCardNode) {
                        const targetInput = activeCardNode.querySelector('input[autofocus]') || activeCardNode.querySelector('input:not([type="hidden"]):not([readonly]), textarea:not([readonly])');
                        if (targetInput) {
                            try {
                                targetInput.focus();
                                if ('ontouchstart' in window || navigator.maxTouchPoints > 0) targetInput.click();
                            } catch(e) {}
                        }
                    }
                } else {
                    setShowStackWizard(true);
                }
            };"""

content = content.replace(target2, replacement2)

# Fix 3: Sync focus on handlePrevCard
target3 = """                    setAnimatingPrevCard(true);
                    setCurrentCardIdx(prevIdx);
                    setTimeout(() => {
                        setAnimatingPrevCard(false);
                    }, 750);

                    requestAnimationFrame(() => {
                        const activeCardNode = document.querySelector(`.stack-card[data-depth="0"]`);
                        if (activeCardNode) {
                            const targetInput = activeCardNode.querySelector('input:not([type="hidden"]):not([readonly]), textarea:not([readonly])');
                            if (targetInput) {
                                try {
                                    targetInput.focus();
                                    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) targetInput.click();
                                } catch(e) {}
                            }
                        }
                    });"""

replacement3 = """                    if (window.ReactDOM && window.ReactDOM.flushSync) {
                        window.ReactDOM.flushSync(() => {
                            setAnimatingPrevCard(true);
                            setCurrentCardIdx(prevIdx);
                        });
                        const activeCardNode = document.querySelector(`.stack-card[data-depth="0"]`);
                        if (activeCardNode) {
                            const targetInput = activeCardNode.querySelector('input[autofocus]') || activeCardNode.querySelector('input:not([type="hidden"]):not([readonly]), textarea:not([readonly])');
                            if (targetInput) {
                                try {
                                    targetInput.focus();
                                    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) targetInput.click();
                                } catch(e) {}
                            }
                        }
                    } else {
                        setAnimatingPrevCard(true);
                        setCurrentCardIdx(prevIdx);
                    }
                    setTimeout(() => {
                        setAnimatingPrevCard(false);
                    }, 750);"""

content = content.replace(target3, replacement3)

# Fix 4: Sync focus on handleNextCard
target4 = """                    setAnimatingCard(true);
                    setCurrentCardIdx(nextIdx);
                    setTimeout(() => {
                        setAnimatingCard(false);
                    }, 850);

                    requestAnimationFrame(() => {
                        const activeCardNode = document.querySelector(`.stack-card[data-depth="0"]`);
                        if (activeCardNode) {
                            const targetInput = activeCardNode.querySelector('input:not([type="hidden"]):not([readonly]), textarea:not([readonly])');
                            if (targetInput) {
                                try {
                                    targetInput.focus();
                                    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) targetInput.click();
                                } catch(e) {}
                            }
                        }
                    });"""

replacement4 = """                    if (window.ReactDOM && window.ReactDOM.flushSync) {
                        window.ReactDOM.flushSync(() => {
                            setAnimatingCard(true);
                            setCurrentCardIdx(nextIdx);
                        });
                        const activeCardNode = document.querySelector(`.stack-card[data-depth="0"]`);
                        if (activeCardNode) {
                            const targetInput = activeCardNode.querySelector('input[autofocus]') || activeCardNode.querySelector('input:not([type="hidden"]):not([readonly]), textarea:not([readonly])');
                            if (targetInput) {
                                try {
                                    targetInput.focus();
                                    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) targetInput.click();
                                } catch(e) {}
                            }
                        }
                    } else {
                        setAnimatingCard(true);
                        setCurrentCardIdx(nextIdx);
                    }
                    setTimeout(() => {
                        setAnimatingCard(false);
                    }, 850);"""

content = content.replace(target4, replacement4)


with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done replacing.")
