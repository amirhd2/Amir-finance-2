import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update SwipeToDeleteItem containerRef className & data attribute
old_container = """            return (
                <div 
                    ref={containerRef}
                    className={`relative transition-all duration-300 ${
                        isDeleting 
                            ? 'overflow-hidden max-h-0 opacity-0 my-0 py-0 scale-95 pointer-events-none' 
                            : 'max-h-[500px] opacity-100 my-1'
                    } ${className}`}
                >"""

new_container = """            return (
                <div 
                    ref={containerRef}
                    data-swipe-item="true"
                    className={`relative overflow-hidden transition-all duration-300 ${
                        isDeleting 
                            ? 'max-h-0 opacity-0 my-0 py-0 scale-95 pointer-events-none' 
                            : 'max-h-[500px] opacity-100 my-1'
                    } ${className}`}
                >"""

if old_container in content:
    content = content.replace(old_container, new_container)
    print("Successfully updated containerRef in SwipeToDeleteItem")
else:
    print("Could not match old_container exactly, checking variations...")

# 2. Add data-swipe-item to cardRef
old_card_div = """                    <div
                        ref={cardRef}
                        style={{
                            transform: 'translate3d(0, 0, 0)',
                            willChange: 'transform',
                            touchAction: 'pan-y'
                        }}"""

new_card_div = """                    <div
                        ref={cardRef}
                        data-swipe-item="true"
                        style={{
                            transform: 'translate3d(0, 0, 0)',
                            willChange: 'transform',
                            touchAction: 'pan-y'
                        }}"""

if old_card_div in content:
    content = content.replace(old_card_div, new_card_div)
    print("Successfully updated cardRef in SwipeToDeleteItem")
else:
    print("Could not match old_card_div")

# 3. Update handleStart in SwipeToDeleteItem to stopPropagation and use passive: false
old_handle_start = """                const handleStart = (e) => {
                    if (isDeletingRef.current) return;
                    if (e.type === 'mousedown' && e.button !== 0) return;
                    
                    const { x, y } = getCoords(e);"""

new_handle_start = """                const handleStart = (e) => {
                    if (isDeletingRef.current) return;
                    if (e.type === 'mousedown' && e.button !== 0) return;
                    if (e.stopPropagation) e.stopPropagation();
                    
                    const { x, y } = getCoords(e);"""

if old_handle_start in content:
    content = content.replace(old_handle_start, new_handle_start)
    print("Successfully updated handleStart in SwipeToDeleteItem")
else:
    print("Could not match old_handle_start")

# 4. Update handleMove in SwipeToDeleteItem
old_handle_move_drag = """                    if (g.isHorizontalDrag) {
                        if (e.cancelable) e.preventDefault();
                        let newOffset = g.startOffset + deltaX;"""

new_handle_move_drag = """                    if (g.isHorizontalDrag) {
                        if (e.cancelable) e.preventDefault();
                        if (e.stopPropagation) e.stopPropagation();
                        let newOffset = g.startOffset + deltaX;"""

if old_handle_move_drag in content:
    content = content.replace(old_handle_move_drag, new_handle_move_drag)
    print("Successfully updated handleMove in SwipeToDeleteItem")
else:
    print("Could not match old_handle_move_drag")

# 5. Change touchstart listener to passive: false in SwipeToDeleteItem
old_listener = "cardEl.addEventListener('touchstart', handleStart, { passive: true });"
new_listener = "cardEl.addEventListener('touchstart', handleStart, { passive: false });"

if old_listener in content:
    content = content.replace(old_listener, new_listener)
    print("Successfully updated touchstart listener to passive: false")
else:
    print("Could not match old_listener")

# 6. Update SwipeBackWrapper handleStart & handleMove to ignore [data-swipe-item]
old_sb_start = """                const handleStart = (e) => {
                    if (isClosingRef.current) return;
                    if (e.button !== undefined && e.button !== 0) return;

                    const { x, y } = getCoords(e);"""

new_sb_start = """                const handleStart = (e) => {
                    if (isClosingRef.current) return;
                    if (e.button !== undefined && e.button !== 0) return;

                    if (e.target && e.target.closest && e.target.closest('[data-swipe-item]')) {
                        gestureRef.current.isEdgeCandidate = false;
                        gestureRef.current.isDragging = false;
                        return;
                    }

                    const { x, y } = getCoords(e);"""

if old_sb_start in content:
    content = content.replace(old_sb_start, new_sb_start)
    print("Successfully updated SwipeBackWrapper handleStart")
else:
    print("Could not match old_sb_start")

old_sb_move = """                const handleMove = (e) => {
                    const g = gestureRef.current;
                    if (isClosingRef.current) return;
                    if (!g.isEdgeCandidate && !g.isDragging) return;

                    const { x, y } = getCoords(e);"""

new_sb_move = """                const handleMove = (e) => {
                    const g = gestureRef.current;
                    if (isClosingRef.current) return;
                    if (!g.isEdgeCandidate && !g.isDragging) return;

                    if (e.target && e.target.closest && e.target.closest('[data-swipe-item]')) {
                        g.isEdgeCandidate = false;
                        g.isDragging = false;
                        return;
                    }

                    const { x, y } = getCoords(e);"""

if old_sb_move in content:
    content = content.replace(old_sb_move, new_sb_move)
    print("Successfully updated SwipeBackWrapper handleMove")
else:
    print("Could not match old_sb_move")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished App.jsx updates!")
