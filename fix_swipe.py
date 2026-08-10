import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix SwipeToDeleteItem Visuals
def replace_visuals():
    global content
    
    start_idx = content.find('const updateVisuals = (currentOffset, dragging) => {')
    if start_idx == -1: return
    
    end_idx = content.find('};', start_idx) + 2
    
    new_visuals = """const updateVisuals = (currentOffset, dragging) => {
                const cardEl = cardRef.current;
                const btnEl = btnRef.current;
                if (!cardEl || !btnEl) return;
                
                cardEl.style.transition = dragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
                cardEl.style.transform = `translate3d(${-currentOffset}px, 0, 0)`;
                
                btnEl.style.transition = dragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
                btnEl.style.transform = `translate3d(${Math.max(0, 72 - currentOffset)}px, -50%, 0)`;
                btnEl.style.visibility = currentOffset > 2 ? 'visible' : 'hidden';
            };"""
            
    content = content[:start_idx] + new_visuals + content[end_idx:]

replace_visuals()

# Fix the button style
btn_start = content.find('<div \n                        ref={btnRef}')
if btn_start != -1:
    btn_end = content.find('onClick={(e) => {', btn_start)
    if btn_end != -1:
        new_btn = """<div 
                        ref={btnRef}
                        className="absolute right-0 top-1/2 z-0 flex items-center justify-center bg-red-500 hover:bg-red-600 active:bg-red-700 text-white cursor-pointer shadow-sm select-none rounded-2xl"
                        style={{
                            width: '72px',
                            height: '100%',
                            transform: 'translate3d(72px, -50%, 0)',
                            willChange: 'transform',
                            visibility: 'hidden'
                        }}
                        """
        content = content[:btn_start] + new_btn + content[btn_end:]

# Fix SwipeBackNav to remove window._isSwipeBackNav which breaks animation
content = content.replace("window._isSwipeBackNav = true;", "")

swipe_back_nav_block = """                if (window._isSwipeBackNav) {
                    window._isSwipeBackNav = false;
                    if (page1 && page2 && overlay) {
                        page1.classList.remove('smooth-transition');
                        page2.classList.remove('smooth-transition');
                        overlay.classList.remove('smooth-overlay');
                        page2.style.transform = 'translateX(0%)';
                        page1.style.transform = 'translateX(-25%)';
                        overlay.style.opacity = '0.4';
                    }
                    return;
                }"""
content = content.replace(swipe_back_nav_block, "")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated")
