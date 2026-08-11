import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

target = '''            useEffect(() => {
                if (!swipedOpen) return;
                const handleGlobalClick = (e) => {
                    if (containerRef.current && !containerRef.current.contains(e.target)) {
                        snapTo(0, false);
                        setSwipedOpen(false);
                    }
                };
                window.addEventListener('touchstart', handleGlobalClick, { passive: true });
                window.addEventListener('mousedown', handleGlobalClick);
                return () => {
                    window.removeEventListener('touchstart', handleGlobalClick);
                    window.removeEventListener('mousedown', handleGlobalClick);
                };
            }, [swipedOpen]);'''

replacement = '''            useEffect(() => {
                if (!swipedOpen) return;
                const handleGlobalClick = (e) => {
                    if (containerRef.current && !containerRef.current.contains(e.target)) {
                        snapTo(0, false);
                        setSwipedOpen(false);
                    }
                };
                window.addEventListener('touchstart', handleGlobalClick, { passive: true });
                window.addEventListener('mousedown', handleGlobalClick);
                return () => {
                    window.removeEventListener('touchstart', handleGlobalClick);
                    window.removeEventListener('mousedown', handleGlobalClick);
                };
            }, [swipedOpen]);

            useEffect(() => {
                const cardEl = cardRef.current;
                if (!cardEl) return;
                const onTouchMoveNative = (e) => {
                    const g = gestureRef.current;
                    if (g && g.isHorizontalDrag) {
                        if (e.cancelable) e.preventDefault();
                    }
                };
                cardEl.addEventListener('touchmove', onTouchMoveNative, { passive: false });
                return () => {
                    cardEl.removeEventListener('touchmove', onTouchMoveNative);
                };
            }, []);'''

app = app.replace(target, replacement)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

print("Added native touchmove to SwipeToDeleteItem")
