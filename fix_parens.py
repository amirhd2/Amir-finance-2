with open('src/App.jsx', 'r') as f:
    content = f.read()

target = """              className: "w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1.5"
            },
              "فعال‌سازی اعلان‌ها"
            )
          )
        )
        )))), /*#__PURE__*/"""

replacement = """              className: "w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1.5"
            },
              "فعال‌سازی اعلان‌ها"
            )
          )
        )
        ))), /*#__PURE__*/"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.jsx', 'w') as f:
        f.write(content)
    print("Fixed parens.")
else:
    print("Not found.")
