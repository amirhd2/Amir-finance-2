import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update openLoanDetail, openArchivedPeriodDetail, openContactDetail to setNavDirection('forward')
code = re.sub(
    r'(const openLoanDetail = [^}]+?setNavDirection\()\'none\'(\);)',
    r"\1'forward'\2",
    code
)

code = re.sub(
    r'(const openArchivedPeriodDetail = [^}]+?setNavDirection\()\'none\'(\);)',
    r"\1'forward'\2",
    code
)

code = re.sub(
    r'(const openContactDetail = [^}]+?setNavDirection\()\'none\'(\);)',
    r"\1'forward'\2",
    code
)

# 2. Update pageSlideVariants with smooth duration (0.6s) and ease [0.25, 1, 0.5, 1] with -30vw parallax
target_variants = """            // Page Slide Transition Animation Variants
            const pageSlideVariants = {
                initial: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '-100vw' : '100vw'),
                    opacity: 1,
                }),
                animate: (direction) => ({
                    x: '0vw',
                    opacity: 1,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }),
                exit: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '100vw' : '-100vw'),
                    opacity: direction === 'none' ? 0 : 1,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                    }
                })
            };"""

replacement_variants = """            // Page Slide Transition Animation Variants
            const pageSlideVariants = {
                initial: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '-30vw' : '100vw'),
                    opacity: 1,
                }),
                animate: (direction) => ({
                    x: '0vw',
                    opacity: 1,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.6,
                        ease: [0.25, 1, 0.5, 1]
                    }
                }),
                exit: (direction) => ({
                    x: direction === 'none' ? '0vw' : (direction === 'back' ? '100vw' : '-30vw'),
                    opacity: direction === 'none' ? 0 : 1,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.6,
                        ease: [0.25, 1, 0.5, 1]
                    }
                })
            };"""

if target_variants in code:
    code = code.replace(target_variants, replacement_variants)
    print("pageSlideVariants replaced successfully!")
else:
    print("WARNING: target_variants not found exactly, attempting regex replace...")
    code = re.sub(
        r'const pageSlideVariants = \{.*?\n\s*\};',
        replacement_variants.strip(),
        code,
        flags=re.DOTALL
    )

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("src/App.jsx updated!")
