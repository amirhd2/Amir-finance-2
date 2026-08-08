import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Locate the exact block to replace
target_block = """                                                    return (
                                                        <motion.div 
                                                            key={card.id}
                                                            id={`sticky-card-${card.id}`}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ 
                                                                opacity: isOtherCardBlur ? 0.35 : 1, 
                                                                scale: isEditingThis ? 1.0 : (isOtherCardBlur ? 0.95 : 0.98),
                                                                y: 0,
                                                                z: isEditingThis ? 10 : 0
                                                            }}
                                                            transition={{ type: "spring", stiffness: 380, damping: 26 }}
                                                            style={{
                                                                top: `${12 + index * 8}px`,
                                                                zIndex: isEditingThis ? 50 : (isOtherCardBlur ? index : 10 + index)
                                                            }}
                                                            className={`sticky rounded-3xl p-5 sm:p-6 border transition-all duration-200 ease-out bg-white dark:bg-slate-800 h-[385px] max-h-[385px] flex flex-col justify-between w-[96%] max-w-md mx-auto ${
                                                                isEditingThis 
                                                                    ? 'shadow-2xl shadow-indigo-500/20 ring-2 ring-indigo-500/50 border-indigo-500 dark:border-indigo-400 z-40' 
                                                                    : 'shadow-[0_-12px_28px_rgba(15,23,42,0.16)] dark:shadow-[0_-12px_32px_rgba(0,0,0,0.65)] border-slate-200/80 dark:border-slate-700/80 border-t-white dark:border-t-slate-700/90 hover:border-indigo-300 dark:hover:border-indigo-600 cursor-pointer'
                                                            } ${
                                                                isOtherCardBlur ? 'pointer-events-none select-none' : ''
                                                            } ${
                                                                shakeCardId === card.id ? 'animate-shake' : ''
                                                            }`}
                                                            onClick={(e) => {
                                                                if (!isEditingThis && editingCardId === null) {
                                                                    handleStartEditingCard(card);
                                                                }
                                                            }}
                                                        >"""

replacement_block = """                                                    return (
                                                        <div 
                                                            key={card.id}
                                                            id={`sticky-card-${card.id}`}
                                                            className="sticky w-[96%] max-w-md mx-auto"
                                                            style={{
                                                                top: `${12 + index * 8}px`,
                                                                zIndex: isEditingThis ? 50 : (isOtherCardBlur ? index : 10 + index)
                                                            }}
                                                        >
                                                            <motion.div 
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ 
                                                                    opacity: isOtherCardBlur ? 0.35 : 1, 
                                                                    scale: isEditingThis ? 1.0 : (isOtherCardBlur ? 0.95 : 0.98),
                                                                    y: 0
                                                                }}
                                                                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                                                                className={`w-full rounded-3xl p-5 sm:p-6 border transition-all duration-200 ease-out bg-white dark:bg-slate-800 h-[385px] max-h-[385px] flex flex-col justify-between ${
                                                                    isEditingThis 
                                                                        ? 'shadow-2xl shadow-indigo-500/20 ring-2 ring-indigo-500/50 border-indigo-500 dark:border-indigo-400' 
                                                                        : 'shadow-[0_-12px_28px_rgba(15,23,42,0.16)] dark:shadow-[0_-12px_32px_rgba(0,0,0,0.65)] border-slate-200/80 dark:border-slate-700/80 border-t-white dark:border-t-slate-700/90 hover:border-indigo-300 dark:hover:border-indigo-600 cursor-pointer'
                                                                } ${
                                                                    isOtherCardBlur ? 'pointer-events-none select-none' : ''
                                                                } ${
                                                                    shakeCardId === card.id ? 'animate-shake' : ''
                                                                }`}
                                                                onClick={(e) => {
                                                                    if (!isEditingThis && editingCardId === null) {
                                                                        handleStartEditingCard(card);
                                                                    }
                                                                }}
                                                            >"""

# Find the closing tag for motion.div that corresponds to this. 
# It should be </motion.div>
closing_target_block = """                                                        </motion.div>
                                                    );"""

closing_replacement_block = """                                                            </motion.div>
                                                        </div>
                                                    );"""

if target_block in content and closing_target_block in content:
    content = content.replace(target_block, replacement_block)
    content = content.replace(closing_target_block, closing_replacement_block)
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Could not find the target block")

