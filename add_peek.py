import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

state_target = "const [shakeCardId, setShakeCardId] = useState(null);"
state_replacement = """const [shakeCardId, setShakeCardId] = useState(null);
            const [peekAnim, setPeekAnim] = useState(false);

            React.useEffect(() => {
                if (showStackWizard && (wizardMode === 'edit' || wizardViewStyle === 'stacked')) {
                    const t1 = setTimeout(() => setPeekAnim(true), 600);
                    const t2 = setTimeout(() => setPeekAnim(false), 1300);
                    return () => {
                        clearTimeout(t1);
                        clearTimeout(t2);
                    };
                } else {
                    setPeekAnim(false);
                }
            }, [showStackWizard, wizardMode, wizardViewStyle]);"""

if state_target in content:
    content = content.replace(state_target, state_replacement)
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added state")
else:
    print("State target not found")
