import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace updateVisuals
target_visuals = """            const updateVisuals = (currentOffset, dragging) => {
                const cardEl = cardRef.current;
                const btnEl = btnRef.current;
                if (!cardEl || !btnEl) return;
                
                cardEl.style.transition = dragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
                cardEl.style.transform = `translate3d(${-currentOffset}px, 0, 0)`;
                
                btnEl.style.transition = dragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
                btnEl.style.transform = `translate3d(${Math.max(0, 72 - currentOffset)}px, -50%, 0)`;
                btnEl.style.visibility = currentOffset > 2 ? 'visible' : 'hidden';
            };"""

replacement_visuals = """            const updateVisuals = (currentOffset, dragging) => {
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
            };"""

if target_visuals in code:
    code = code.replace(target_visuals, replacement_visuals)
    print("updateVisuals replaced!")
else:
    print("target_visuals not found, regex replacing...")
    code = re.sub(
        r'const updateVisuals = \(currentOffset, dragging\) => \{.*?\n\s*\};',
        replacement_visuals.strip(),
        code,
        flags=re.DOTALL
    )

# Replace Morphing Red Delete Button element
btn_pattern = r'<div\s+ref=\{btnRef\}\s+className="[^"]*"\s+style=\{\{[^\}]*\}\}\s+onClick=\{(?:.|\n)*?</div>\s*</div>'

btn_replacement = """<div 
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
                    </div>"""

code = re.sub(btn_pattern, btn_replacement, code)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("restore_morph_swipe completed!")
