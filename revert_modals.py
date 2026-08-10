import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace iosModalVariants for delete-tx-panel
target_delete_tx = """                                <motion.div 
                                    key="delete-tx-panel"
                                    variants={iosModalVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    style={{ transformOrigin: "center center" }}"""

replacement_delete_tx = """                                <motion.div 
                                    key="delete-tx-panel"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}"""

content = content.replace(target_delete_tx, replacement_delete_tx)

# Replace iosModalVariants for GlobalConfirmDialog
target_global_confirm = """                            <motion.div 
                                key="global-confirm-modal"
                                variants={iosModalVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                style={{ transformOrigin: "bottom center" }}"""

replacement_global_confirm = """                            <motion.div 
                                key="global-confirm-modal"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}"""

content = content.replace(target_global_confirm, replacement_global_confirm)

# Fix iosBackdropVariants to simpler opacity for these
content = re.sub(r'variants=\{iosBackdropVariants\}\s*initial="initial"\s*animate="animate"\s*exit="exit"\s*(onClick=\{\(e\).*?className="fixed inset-0 bg-black/60)', 
                 r'initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}\n                            \1', content, flags=re.DOTALL)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
