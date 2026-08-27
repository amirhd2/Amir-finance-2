with open('src/App.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

pos_net = text.find('const netBalance =')
if pos_net != -1:
    end_summary_marker = '</div>;            })()'
    pos_end = text.find(end_summary_marker, pos_net)
    if pos_end != -1:
        pos_end_full = pos_end + len(end_summary_marker)
        pos_loans_logic = text.find('const contactLoans = loans.filter', pos_end_full)
        if pos_loans_logic != -1:
            new_text = text[:pos_end_full] + "{profileFilter === 'loans' && /*#__PURE__*/<div className=\"space-y-2\">" + text[pos_loans_logic:]
            with open('src/App.jsx', 'w', encoding='utf-8') as f:
                f.write(new_text)
            print('Successfully cleaned up App.jsx!')
        else:
            print('Could not find contactLoans logic')
    else:
        print('Could not find end summary marker')
else:
    print('Could not find netBalance')
