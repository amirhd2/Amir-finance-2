import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Page Slide Animation Directions for RTL
target_variants = """            const pageSlideVariants = {
                initial: (direction) => ({
                    x: direction === 'none' ? '0%' : (direction === 'back' ? '30vw' : '-100vw'),
                    opacity: 1,
                }),
                animate: (direction) => ({
                    x: '0vw',
                    opacity: 1,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1]
                    }
                }),
                exit: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '-100vw' : '30vw'),
                    opacity: direction === 'none' ? 1 : (direction === 'back' ? 1 : 0.8),
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1]
                    }
                })
            };"""

replacement_variants = """            const pageSlideVariants = {
                initial: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '-30vw' : '100vw'),
                    opacity: 1,
                }),
                animate: (direction) => ({
                    x: '0vw',
                    opacity: 1,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1]
                    }
                }),
                exit: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '100vw' : '-30vw'),
                    opacity: direction === 'none' ? 1 : (direction === 'back' ? 1 : 0.8),
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1]
                    }
                })
            };"""

if target_variants in content:
    content = content.replace(target_variants, replacement_variants)
    print("Replaced pageSlideVariants")
else:
    print("Not found pageSlideVariants")


# Fix 2: Remove mode="popLayout" to fix blink
target_presence = '<AnimatePresence mode="popLayout" custom={navDirection} initial={false}>'
replacement_presence = '<AnimatePresence custom={navDirection} initial={false}>'
if target_presence in content:
    content = content.replace(target_presence, replacement_presence)
    print("Replaced AnimatePresence mode")
else:
    print("Not found AnimatePresence mode")

# Fix 3: transaction nav back issue
target_contact_nav = "openContactDetail(targetContact, currentTab);"
replacement_contact_nav = "openContactDetail(targetContact, 'all', currentTab);"
if target_contact_nav in content:
    content = content.replace(target_contact_nav, replacement_contact_nav)
    print("Replaced openContactDetail call")
else:
    print("Not found openContactDetail call")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
