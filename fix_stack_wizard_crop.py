import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app = f.read()

# Fix Stack Wizard cropping
old_backdrop_class = 'className="absolute inset-0 bg-[#0b101d]/90 backdrop-blur-md z-50 flex flex-col justify-start items-center p-3 pt-2.5 overflow-hidden"'
new_backdrop_class = 'className="absolute inset-0 bg-[#0b101d]/90 backdrop-blur-md z-50 flex flex-col justify-start items-center p-3 pt-[calc(max(env(safe-area-inset-top,0px),24px)+10px)] overflow-hidden"'

app = app.replace(old_backdrop_class, new_backdrop_class)

# The user also mentions other modals (e.g., Edit Contact, Add Contact). Let's check if they have safe area covers too.
with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app)

print("Fixed Stack Wizard cropping!")
