import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

# We need to extract the SwipeToDeleteItem code and replace it.
# It starts at `function SwipeToDeleteItem({` and ends before `function SwipeableTxCard`

start_idx = app.find('function SwipeToDeleteItem({')
end_idx = app.find('function SwipeableTxCard({')

if start_idx != -1 and end_idx != -1:
    old_code = app[start_idx:end_idx]
    
    new_code = '''function SwipeToDeleteItem({
            children,
            onDelete,
            onCardClick,
            className = ""
        }) {
            const [isDragging, setIsDragging] = useState(false);
            const [swipedOpen, setSwipedOpen] = useState(false);
            const [isDeleting, setIsDeleting] = useState(false);
            
            const isDeletingRef = useRef(false);
            useEffect(() => {
                isDeletingRef.current = isDeleting;
            }, [isDeleting]);

            const containerRef = useRef(null);
            const cardRef = useRef(null);
            const btnRef = useRef(null);
            const offsetRef = useRef(0);
            const rafIdRef = useRef(null);
            
            const gestureRef = useRef({
                startX: 0,
                startY: 0,
                startOffset: 0,
                isSlopPassed: false,
                isHorizontalDrag: false
            });

            const updateVisuals = (currentOffset, dragging) => {
                const cardEl = cardRef.current;
                const btnEl = btnRef.current;
                if (!cardEl || !btnEl) return;

                const gap = 8;
                const rawBtnWidth = Math.max(0, currentOffset - gap);
                
                // Appearance (Fade in & Scale)
                const appearanceProgress = Math.min(1, Math.max(0, (currentOffset - 4) / 36));
                const btnOpacity = appearanceProgress;
                const btnScale = 0.5 + 0.5 * appearanceProgress;

                // Circle (52px wide, 26px radius) -> Rounded Rect (expands with swipe, 16px radius)
                const btnWidthPx = Math.max(52, rawBtnWidth);
                const morphProgress = Math.min(1, Math.max(0, (btnWidthPx - 52) / 30));
                const borderRadiusPx = 26 - (26 - 16) * morphProgress;

                const transitionStr = dragging 
                    ? 'none' 
                    : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s linear';
                
                cardEl.style.transition = dragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
                cardEl.style.transform = `translate3d(${-currentOffset}px, 0, 0)`;

                btnEl.style.transition = transitionStr;
                btnEl.style.width = `${btnWidthPx}px`;
                btnEl.style.height = '52px';
                btnEl.style.borderRadius = `${borderRadiusPx}px`;
                btnEl.style.opacity = `${btnOpacity}`;
                btnEl.style.transform = `translate3d(0, -50%, 0) scale(${btnScale})`;
                btnEl.style.visibility = currentOffset > 2 ? 'visible' : 'hidden';
            };

            const snapTo = (targetOffset, dragging = false) => {
                offsetRef.current = targetOffset;
                updateVisuals(targetOffset, dragging);
            };

            useEffect(() => {
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

            const triggerDeleteModal = useCallback(() => {
                if (onDelete) {
                    onDelete(() => {
                        setIsDeleting(true);
                    });
                }
                snapTo(0, false);
                setSwipedOpen(false);
            }, [onDelete]);

            useEffect(() => {
                const cardEl = cardRef.current;
                if (!cardEl) return;

                const getCoords = (e) => {
                    if (e.touches && e.touches.length > 0) {
                        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
                    }
                    if (e.changedTouches && e.changedTouches.length > 0) {
                        return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
                    }
                    return { x: e.clientX || 0, y: e.clientY || 0 };
                };

                const handleStart = (e) => {
                    if (isDeletingRef.current) return;
                    if (e.type === 'mousedown' && e.button !== 0) return;
                    
                    const { x, y } = getCoords(e);
                    gestureRef.current = {
                        startX: x,
                        startY: y,
                        startOffset: offsetRef.current,
                        isSlopPassed: false,
                        isHorizontalDrag: false
                    };
                };

                const handleMove = (e) => {
                    const g = gestureRef.current;
                    if (isDeletingRef.current || !g.startX) return;
                    
                    const { x, y } = getCoords(e);
                    const deltaX = g.startX - x; 
                    const deltaY = y - g.startY;

                    if (!g.isSlopPassed) {
                        const absX = Math.abs(deltaX);
                        const absY = Math.abs(deltaY);
                        if (absX > 4 || absY > 4) {
                            g.isSlopPassed = true;
                            if (absX > absY * 0.8) {
                                g.isHorizontalDrag = true;
                                setIsDragging(true);
                            } else {
                                g.startX = 0; 
                                return;
                            }
                        }
                    }

                    if (g.isHorizontalDrag) {
                        if (e.cancelable) e.preventDefault();
                        let newOffset = g.startOffset + deltaX;
                        const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 320;
                        if (newOffset < 0) newOffset = 0;
                        if (newOffset > containerWidth) newOffset = containerWidth;
                        
                        offsetRef.current = newOffset;
                        
                        if (!rafIdRef.current) {
                            rafIdRef.current = requestAnimationFrame(() => {
                                rafIdRef.current = null;
                                updateVisuals(offsetRef.current, true);
                            });
                        }
                    }
                };

                const handleEnd = (e) => {
                    const g = gestureRef.current;
                    if (!g.startX) return;

                    const isDrag = g.isHorizontalDrag;
                    g.startX = 0;
                    g.isSlopPassed = false;
                    g.isHorizontalDrag = false;
                    setIsDragging(false);

                    if (rafIdRef.current) {
                        cancelAnimationFrame(rafIdRef.current);
                        rafIdRef.current = null;
                    }

                    if (isDrag) {
                        const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 320;
                        const ratio = offsetRef.current / containerWidth;
                        if (ratio >= 0.7) {
                            triggerDeleteModal();
                        } else if (offsetRef.current > 50) {
                            snapTo(84, false);
                            setSwipedOpen(true);
                        } else {
                            snapTo(0, false);
                            setSwipedOpen(false);
                        }
                    } else {
                        if (swipedOpen) {
                            snapTo(0, false);
                            setSwipedOpen(false);
                        } else if (onCardClick) {
                            onCardClick(e);
                        }
                    }
                };

                cardEl.addEventListener('touchstart', handleStart, { passive: true });
                cardEl.addEventListener('touchmove', handleMove, { passive: false });
                cardEl.addEventListener('touchend', handleEnd);
                cardEl.addEventListener('touchcancel', handleEnd);
                cardEl.addEventListener('mousedown', handleStart);
                window.addEventListener('mousemove', handleMove, { passive: false });
                window.addEventListener('mouseup', handleEnd);

                return () => {
                    cardEl.removeEventListener('touchstart', handleStart);
                    cardEl.removeEventListener('touchmove', handleMove);
                    cardEl.removeEventListener('touchend', handleEnd);
                    cardEl.removeEventListener('touchcancel', handleEnd);
                    cardEl.removeEventListener('mousedown', handleStart);
                    window.removeEventListener('mousemove', handleMove);
                    window.removeEventListener('mouseup', handleEnd);
                };
            }, [triggerDeleteModal, onCardClick, swipedOpen]);

            return (
                <div 
                    ref={containerRef}
                    className={`relative transition-all duration-300 ${
                        isDeleting 
                            ? 'overflow-hidden max-h-0 opacity-0 my-0 py-0 scale-95 pointer-events-none' 
                            : 'max-h-[500px] opacity-100 my-1'
                    } ${className}`}
                >
                    {/* Morphing Red Delete Button */}
                    <div 
                        ref={btnRef}
                        className="absolute right-1 top-1/2 z-0 flex items-center justify-center bg-red-600 hover:bg-red-700 active:bg-red-800 text-white cursor-pointer shadow-md select-none transition-colors"
                        style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '26px',
                            opacity: 0,
                            transform: 'translate3d(0, -50%, 0) scale(0.5)',
                            transformOrigin: 'right center',
                            visibility: 'hidden',
                            willChange: 'transform, width, border-radius'
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            triggerDeleteModal();
                        }}
                    >
                        <div className="flex items-center justify-center w-full h-full">
                            <Icon name="trash-2" className="w-5 h-5 text-white shrink-0" />
                        </div>
                    </div>

                    {/* Swiping Card */}
                    <div
                        ref={cardRef}
                        style={{
                            transform: 'translate3d(0, 0, 0)',
                            willChange: 'transform',
                            touchAction: 'pan-y'
                        }}
                        className={`relative z-10 transition-shadow duration-200 ${
                            (isDragging || swipedOpen) ? 'rounded-2xl shadow-xl' : ''
                        }`}
                    >
                        {children}
                    </div>
                </div>
            );
        }

        '''
    app = app.replace(old_code, new_code)
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(app)
    print("Replaced SwipeToDeleteItem with robust native events implementation!")
else:
    print("Could not find boundaries")
