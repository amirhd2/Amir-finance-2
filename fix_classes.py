import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Global background from bg-slate-50 to bg-[#F4F7FC]
content = re.sub(r'bg-slate-50\b', r'bg-[#F4F7FC]', content)

# 2. Fix document.body.style.backgroundColor
content = content.replace("document.body.style.backgroundColor = '#f8fafc';", "document.body.style.backgroundColor = '#F4F7FC';")
content = content.replace("metaTheme.setAttribute('content', isDark ? '#020617' : '#f8fafc');", "metaTheme.setAttribute('content', isDark ? '#020617' : '#F4F7FC');")

# 3. Replace contact cards in contacts page
target_contact_card = 'className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-[24px] border border-slate-100 dark:border-slate-700/60 p-4 shadow-sm hover:border-indigo-300 transition-all cursor-pointer"'
replacement_contact_card = 'className="bg-[#FDFDFE] dark:bg-slate-800 rounded-2xl sm:rounded-[24px] border border-[rgba(70,80,120,0.06)] dark:border-slate-700/60 p-4 shadow-[0_2px_8px_rgba(28,35,60,0.05),0_12px_28px_rgba(28,35,60,0.07)] hover:border-indigo-300 transition-all cursor-pointer"'
content = content.replace(target_contact_card, replacement_contact_card)

# 4. Replace other cards (tx cards) bg-white to bg-[#FDFDFE]
# The pattern is: bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-sm pl-6 pr-4 py-3
content = re.sub(r'bg-white dark:bg-slate-800 rounded-2xl border border-slate-100( dark:border-slate-700/80 shadow-sm pl-6 pr-4 py-3)', r'bg-[#FDFDFE] dark:bg-slate-800 rounded-2xl border border-slate-100\1', content)

# And for stack cards (maybe?)
content = content.replace('bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700', 'bg-[#FDFDFE] dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixes applied.")
