
        const { useState, useEffect, useRef, useMemo, useCallback } = React;
        const Motion = window.Motion || {};
        const motion = Motion.motion || {
            div: (props) => <div {...props} />,
            button: (props) => <button {...props} />
        };
        const AnimatePresence = Motion.AnimatePresence || (({ children }) => <React.Fragment>{children}</React.Fragment>);

        const avatarColors = [
            'bg-blue-600', 'bg-amber-600', 'bg-emerald-600', 'bg-indigo-600', 'bg-teal-600',
            'bg-rose-600', 'bg-purple-600', 'bg-cyan-600', 'bg-orange-600', 'bg-violet-600'
        ];

        const getAvatarColor = (id, name) => {
            let hash = 0;
            const str = (name || '') + id;
            for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            return avatarColors[Math.abs(hash) % avatarColors.length];
        };

        const getContactCardTheme = (contactId) => {
            let idNum = 0;
            if (typeof contactId === 'number') {
                idNum = contactId;
            } else if (contactId) {
                idNum = String(contactId).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
            }
            const themes = [
                // 1: Building Watermark (Light Surface)
                {
                    watermark: 'apartment',
                    containerClass: 'bg-slate-100 dark:bg-slate-800/95 text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-700/80 shadow-sm',
                    avatarClass: 'bg-indigo-600 text-white',
                    nameClass: 'text-slate-900 dark:text-white',
                    phoneClass: 'text-slate-500 dark:text-slate-400',
                    buttonClass: 'bg-white/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-200 hover:bg-white',
                    rowClass: 'bg-white/70 dark:bg-slate-700/50',
                    rowLabelClass: 'text-slate-500 dark:text-slate-400',
                    rowTextClass: 'text-slate-900 dark:text-white',
                    accentColorClass: 'text-indigo-600 dark:text-indigo-400',
                    watermarkColor: 'text-slate-900 dark:text-white'
                },
                // 2: Wallet Watermark (Dark Theme)
                {
                    watermark: 'account_balance_wallet',
                    containerClass: 'bg-slate-900 text-white border-slate-800 shadow-lg',
                    avatarClass: 'bg-amber-400 text-slate-950',
                    nameClass: 'text-white',
                    phoneClass: 'text-slate-300',
                    buttonClass: 'bg-white/10 text-white hover:bg-white/20',
                    rowClass: 'bg-white/10',
                    rowLabelClass: 'text-slate-300',
                    rowTextClass: 'text-white',
                    accentColorClass: 'text-amber-400',
                    watermarkColor: 'text-white'
                },
                // 3: Handshake Watermark (Tinted Surface)
                {
                    watermark: 'handshake',
                    containerClass: 'bg-indigo-100/90 dark:bg-indigo-950/80 text-indigo-950 dark:text-indigo-100 border-indigo-200 dark:border-indigo-900 shadow-sm',
                    avatarClass: 'bg-indigo-600 text-white',
                    nameClass: 'text-indigo-950 dark:text-indigo-100',
                    phoneClass: 'text-indigo-700 dark:text-indigo-300',
                    buttonClass: 'bg-white/60 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200 hover:bg-white/80',
                    rowClass: 'bg-white/60 dark:bg-indigo-900/50',
                    rowLabelClass: 'text-indigo-700 dark:text-indigo-300',
                    rowTextClass: 'text-indigo-950 dark:text-indigo-100',
                    accentColorClass: 'text-indigo-600 dark:text-indigo-400',
                    watermarkColor: 'text-indigo-600 dark:text-indigo-400'
                },
                // 4: Briefcase Watermark (Emerald Dark)
                {
                    watermark: 'work',
                    containerClass: 'bg-emerald-900 text-white border-emerald-800 shadow-lg',
                    avatarClass: 'bg-emerald-400 text-emerald-950',
                    nameClass: 'text-white',
                    phoneClass: 'text-emerald-200',
                    buttonClass: 'bg-white/10 text-white hover:bg-white/20',
                    rowClass: 'bg-white/10',
                    rowLabelClass: 'text-emerald-200',
                    rowTextClass: 'text-white',
                    accentColorClass: 'text-emerald-300',
                    watermarkColor: 'text-white'
                },
                // 5: Team Watermark (Deep Blue Dark)
                {
                    watermark: 'groups',
                    containerClass: 'bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white border-indigo-900/80 shadow-lg',
                    avatarClass: 'bg-sky-400 text-slate-950',
                    nameClass: 'text-white',
                    phoneClass: 'text-blue-200',
                    buttonClass: 'bg-white/10 text-white hover:bg-white/20',
                    rowClass: 'bg-white/10',
                    rowLabelClass: 'text-blue-200',
                    rowTextClass: 'text-white',
                    accentColorClass: 'text-sky-400',
                    watermarkColor: 'text-white'
                },
                // 6: Document Watermark (Rose Dark)
                {
                    watermark: 'description',
                    containerClass: 'bg-rose-900 text-white border-rose-800 shadow-lg',
                    avatarClass: 'bg-rose-400 text-rose-950',
                    nameClass: 'text-white',
                    phoneClass: 'text-rose-200',
                    buttonClass: 'bg-white/10 text-white hover:bg-white/20',
                    rowClass: 'bg-white/10',
                    rowLabelClass: 'text-rose-200',
                    rowTextClass: 'text-white',
                    accentColorClass: 'text-rose-300',
                    watermarkColor: 'text-white'
                }
            ];
            return themes[Math.abs(idNum) % themes.length];
        };

        const jalaliMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

        const gregorianToJalali = (gy, gm, gd) => {
            const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            let jy = (gy <= 1600) ? 0 : 979;
            gy -= (gy <= 1600) ? 621 : 1600;
            const gy2 = (gm > 2) ? (gy + 1) : gy;
            let days = (365 * gy) + (Math.floor((gy2 + 3) / 4)) - (Math.floor((gy2 + 99) / 100)) + (Math.floor((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
            jy += 33 * Math.floor(days / 12053);
            days %= 12053;
            jy += 4 * Math.floor(days / 1461);
            days %= 1461;
            jy += Math.floor((days - 1) / 365);
            if (days > 0) days = (days - 1) % 365;
            const jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
            const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
            return { jy, jm, jd };
        };

        const getDeviceJalaliDate = () => {
            try {
                const now = new Date();
                const gy = now.getFullYear();
                const gm = now.getMonth() + 1;
                const gd = now.getDate();
                const { jy, jm, jd } = gregorianToJalali(gy, gm, gd);
                return {
                    day: jd,
                    month: jalaliMonths[jm - 1] || 'مرداد',
                    year: jy
                };
            } catch (e) {
                return { day: 3, month: 'مرداد', year: 1405 };
            }
        };

        const jalaliToGregorian = (jy, jm, jd) => {
            let gy = (jy <= 979) ? 621 : 1600;
            jy -= (jy <= 979) ? 0 : 979;
            let days = (365 * jy) + (Math.floor(jy / 33) * 8) + Math.floor(((jy % 33) + 3) / 4) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
            gy += 400 * Math.floor(days / 146097);
            days %= 146097;
            if (days > 36524) {
                gy += 100 * Math.floor(--days / 36524);
                days %= 36524;
                if (days >= 365) days++;
            }
            gy += 4 * Math.floor(days / 1461);
            days %= 1461;
            if (days > 365) {
                gy += Math.floor((days - 1) / 365);
                days = (days - 1) % 365;
            }
            const g_d_m = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            let gm = 0;
            while (days >= g_d_m[gm]) {
                days -= g_d_m[gm];
                gm++;
            }
            return { gy, gm, gd: days + 1 };
        };

        const getDaysDiffFromToday = (jy, jm, jd) => {
            const todayJ = getDeviceJalaliDate();
            const todayMIdx = jalaliMonths.indexOf(todayJ.month) + 1;
            const gToday = jalaliToGregorian(todayJ.year, todayMIdx > 0 ? todayMIdx : 1, todayJ.day);
            const gTarget = jalaliToGregorian(jy, jm, jd);
            
            const dToday = new Date(gToday.gy, gToday.gm - 1, gToday.gd);
            const dTarget = new Date(gTarget.gy, gTarget.gm - 1, gTarget.gd);
            
            const diffTime = dTarget.getTime() - dToday.getTime();
            return Math.round(diffTime / (1000 * 60 * 60 * 24));
        };

        const parseJalaliDateStr = (dateStr) => {
            const defaultDate = getDeviceJalaliDate();
            if (!dateStr || typeof dateStr !== 'string') return defaultDate;

            try {
                const cleanStr = dateStr.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).trim();
                const parts = cleanStr.split(/[\s/.-]+/);
                if (parts.length >= 3) {
                    let p0 = parseInt(parts[0], 10);
                    let p1 = parts[1];
                    let p2 = parseInt(parts[2], 10);

                    let year, month, day;

                    if (p0 > 1300) {
                        year = p0;
                        month = p1;
                        day = p2;
                    } else if (p2 > 1300) {
                        day = p0;
                        month = p1;
                        year = p2;
                    } else {
                        year = defaultDate.year;
                        month = p1;
                        day = p0 || defaultDate.day;
                    }

                    if (!isNaN(parseInt(month, 10))) {
                        const mNum = parseInt(month, 10);
                        if (mNum >= 1 && mNum <= 12) {
                            month = jalaliMonths[mNum - 1];
                        }
                    }

                    if (!day || isNaN(day)) day = defaultDate.day;
                    if (!month || !jalaliMonths.includes(month)) month = defaultDate.month;
                    if (!year || isNaN(year)) year = defaultDate.year;

                    return { day, month, year };
                }
            } catch (e) {
                console.error("Error parsing Jalali date:", e);
            }
            return defaultDate;
        };

        const toPersianDigits = (n) => {
            if (n === undefined || n === null) return '';
            const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            return String(n).replace(/\d/g, x => farsiDigits[x]);
        };

        const formatCardNumber = (val) => {
            if (!val) return '';
            const clean = String(val).replace(/\D/g, '').slice(0, 16);
            return clean.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
        };

        const getBankNameFromCard = (cardNo) => {
            if (!cardNo) return '';
            const clean = String(cardNo).replace(/\D/g, '');
            if (clean.length < 6) return '';
            const prefix6 = clean.slice(0, 6);
            const bankMap = {
                '603799': 'بانک ملی ایران',
                '610433': 'بانک ملت',
                '621986': 'بانک سامان',
                '589210': 'بانک سپه',
                '627381': 'بانک انصار',
                '603770': 'بانک کشاورزی',
                '628023': 'بانک مسکن',
                '627412': 'بانک کارآفرین',
                '627488': 'بانک خاورمیانه',
                '502229': 'بانک پاسارگاد',
                '639346': 'بانک سینا',
                '639607': 'بانک سرمایه',
                '636214': 'بانک آینده',
                '502908': 'بانک توسعه تعاون',
                '504172': 'قرض‌الحسنه رسالت',
                '505416': 'بانک گردشگری',
                '606373': 'قرض‌الحسنه مهر ایران',
                '622106': 'بانک پارسیان',
                '639194': 'بانک پارسیان',
                '505785': 'بانک ایران زمین',
                '636949': 'بانک حکمت ایرانیان',
                '502938': 'بانک دی',
                '603769': 'بانک صادرات',
                '610000': 'بانک صادرات',
                '589463': 'بانک رفاه کارگران'
            };
            return bankMap[prefix6] || '';
        };

        const isJalaliLeapYear = (year) => {
            const y = Number(year) || 1403;
            const r = y % 33;
            return [1, 5, 9, 13, 17, 22, 26, 30].includes(r);
        };

        const getJalaliDaysInMonth = (monthNum, year) => {
            const m = Number(monthNum);
            if (m >= 1 && m <= 6) return 31;
            if (m >= 7 && m <= 11) return 30;
            if (m === 12) return isJalaliLeapYear(year) ? 30 : 29;
            return 30;
        };

        const formatDateToNumericJalali = (dateStr) => {
            if (!dateStr || dateStr === '-' || dateStr === 'نامشخص') return '-';
            if (dateStr === 'امروز') {
                const today = getDeviceJalaliDate();
                const m = String(jalaliMonths.indexOf(today.month) + 1).padStart(2, '0');
                const d = String(today.day).padStart(2, '0');
                return `${today.year}/${m}/${d}`;
            }
            const parsed = parseJalaliDateStr(dateStr);
            if (!parsed || !parsed.year) return dateStr;

            let monthNum = 1;
            if (typeof parsed.month === 'string' && jalaliMonths.includes(parsed.month)) {
                monthNum = jalaliMonths.indexOf(parsed.month) + 1;
            } else {
                monthNum = parseInt(parsed.month, 10) || 1;
            }

            const y = String(parsed.year);
            const m = String(monthNum).padStart(2, '0');
            const d = String(parsed.day).padStart(2, '0');

            return `${y}/${m}/${d}`;
        };

        const parseRawNumber = (val) => {
            if (val === null || val === undefined) return '';
            return String(val).replace(/\D/g, '');
        };

        const formatWithCommas = (val) => {
            if (val === null || val === undefined || val === '') return '';
            const clean = String(val).replace(/\D/g, '');
            if (!clean) return '';
            return Number(clean).toLocaleString('en-US');
        };

        const numToPersianWords = (num) => {
            if (num === null || num === undefined || num === '') return '';
            const n = Math.abs(Number(num));
            if (isNaN(n) || n === 0) return '';

            const yekan = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
            const dahna = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هیجده', 'نوزده'];
            const dahgan = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
            const sadgan = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
            const maghadir = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

            const threeDigitsToWords = (number) => {
                let sad = Math.floor(number / 100);
                let dah = Math.floor((number % 100) / 10);
                let yek = number % 10;
                let parts = [];

                if (sad > 0) parts.push(sadgan[sad]);

                if (dah === 1) {
                    parts.push(dahna[yek]);
                } else {
                    if (dah > 1) parts.push(dahgan[dah]);
                    if (yek > 0) parts.push(yekan[yek]);
                }

                return parts.join(' و ');
            };

            let splitted = [];
            let temp = Math.floor(n);
            while (temp > 0) {
                splitted.push(temp % 1000);
                temp = Math.floor(temp / 1000);
            }

            let resultParts = [];
            for (let i = splitted.length - 1; i >= 0; i--) {
                const val = splitted[i];
                if (val > 0) {
                    const word = threeDigitsToWords(val);
                    const unit = maghadir[i];
                    resultParts.push(word + (unit ? ' ' + unit : ''));
                }
            }

            return resultParts.join(' و ') + ' تومان';
        };

        const getInstallmentDueDate = (loan, instNum) => {
            if (!loan || instNum < 1) return { dateStr: 'نامشخص', year: 1403, monthIdx: 0, day: 1, daysLeft: 0 };

            let startYear, startMonthIdx, startDay;
            if (loan.firstInstallmentDate) {
                const parsed = parseJalaliDateStr(loan.firstInstallmentDate);
                startYear = parsed.year;
                startMonthIdx = jalaliMonths.indexOf(parsed.month);
                if (startMonthIdx === -1) startMonthIdx = 0;
                startDay = parsed.day;
            } else if (loan.startDate) {
                const parsedStart = parseJalaliDateStr(loan.startDate);
                startYear = parsedStart.year;
                startMonthIdx = jalaliMonths.indexOf(parsedStart.month);
                if (startMonthIdx === -1) startMonthIdx = 0;
                startDay = parsedStart.day;
            } else {
                const todayJ = getDeviceJalaliDate();
                startYear = todayJ.year;
                startMonthIdx = jalaliMonths.indexOf(todayJ.month);
                if (startMonthIdx === -1) startMonthIdx = 0;
                startDay = todayJ.day;
            }

            const dueDay = loan.firstInstallmentDate 
                ? parseJalaliDateStr(loan.firstInstallmentDate).day 
                : (loan.dueDayOfMonth || startDay || 25);

            let firstDueMonthIdx = startMonthIdx;
            let firstDueYear = startYear;

            if (!loan.firstInstallmentDate && dueDay <= startDay) {
                firstDueMonthIdx += 1;
                if (firstDueMonthIdx >= 12) {
                    firstDueMonthIdx = 0;
                    firstDueYear += 1;
                }
            }

            const monthsToAdd = instNum - 1;
            let targetMonthIdx = firstDueMonthIdx + monthsToAdd;
            let targetYear = firstDueYear + Math.floor(targetMonthIdx / 12);
            targetMonthIdx = targetMonthIdx % 12;

            const targetMonthName = jalaliMonths[targetMonthIdx];
            const maxDays = getJalaliDaysInMonth(targetMonthIdx + 1, targetYear);
            const targetDay = Math.min(dueDay, maxDays);

            const dateStr = `${targetDay} ${targetMonthName} ${targetYear}`;
            const daysLeft = getDaysDiffFromToday(targetYear, targetMonthIdx + 1, targetDay);

            return {
                dateStr,
                year: targetYear,
                monthIdx: targetMonthIdx,
                monthName: targetMonthName,
                day: targetDay,
                daysLeft
            };
        };

        const getLoanNextDueInfo = (loan, txList) => {
            if (!loan) return { nextDueNum: 1, nextDueDateStr: 'نامشخص', daysLeft: 0, totalInst: 12, paidInst: 0, remainingInst: 12, isCompleted: false };

            const instAmt = Number(loan.installmentAmount) || 0;
            const totalRepay = Number(loan.totalRepayment) || Number(loan.principalAmount) || 0;
            const totalInst = (loan.totalInstallments && loan.totalInstallments > 0)
                ? loan.totalInstallments
                : (instAmt > 0 && totalRepay > 0 ? Math.ceil(totalRepay / instAmt) : 12);

            const loanTxs = (txList || []).filter(t => t.loanId === loan.id && t.type === 'repayment');
            const paidInst = loanTxs.length;
            const remainingInst = Math.max(0, totalInst - paidInst);

            if (remainingInst <= 0) {
                return {
                    nextDueNum: totalInst,
                    nextDueDateStr: 'کلیه اقساط پرداخت شده‌اند',
                    daysLeft: 0,
                    totalInst,
                    paidInst,
                    remainingInst: 0,
                    isCompleted: true
                };
            }

            const nextDueNum = paidInst + 1;
            const dueInfo = getInstallmentDueDate(loan, nextDueNum);

            return {
                nextDueNum,
                nextDueDateStr: dueInfo.dateStr,
                daysLeft: dueInfo.daysLeft,
                totalInst,
                paidInst,
                remainingInst,
                isCompleted: false
            };
        };

        const calculateNextInstallmentDate = (loan, txList) => {
            if (!loan) return getDeviceJalaliDate();
            const info = getLoanNextDueInfo(loan, txList);
            if (info.isCompleted) return getDeviceJalaliDate();
            return parseJalaliDateStr(info.nextDueDateStr);
        };

        const getInstallmentNextDueDate = (targetLoan, txList) => {
            if (!targetLoan) return getDeviceJalaliDate();
            const info = getLoanNextDueInfo(targetLoan, txList);
            if (info && info.nextDueDateStr && !info.isCompleted && info.nextDueDateStr !== 'نامشخص' && info.nextDueDateStr !== 'کلیه اقساط پرداخت شده‌اند') {
                return parseJalaliDateStr(info.nextDueDateStr);
            }
            const startStr = targetLoan.startDate || targetLoan.receiveDate;
            if (startStr) {
                return parseJalaliDateStr(startStr);
            }
            return getDeviceJalaliDate();
        };

        const drawRoundRect = (ctx, x, y, w, h, r) => {
            try {
                if (typeof ctx.roundRect === 'function') {
                    ctx.beginPath();
                    ctx.roundRect(x, y, w, h, r);
                    return;
                }
            } catch (e) {}
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
        };

        const exportLoanAsPNG = (loan, txList) => {
            if (!loan) return;
            try {
                const repayments = (txList || []).filter(t => t.loanId === loan.id && t.type === 'repayment');
                const totalInst = loan.totalInstallments || (loan.installmentAmount > 0 ? Math.ceil(loan.totalRepayment / loan.installmentAmount) : 12);
                const paidInst = repayments.length;

                const canvas = document.createElement('canvas');
                const width = 800;
                const rowHeight = 44;
                const headerHeight = 240;
                const tableHeaderHeight = 42;
                const footerHeight = 60;
                const height = headerHeight + tableHeaderHeight + Math.max(1, repayments.length) * rowHeight + footerHeight;

                const scale = 2;
                canvas.width = width * scale;
                canvas.height = height * scale;
                const ctx = canvas.getContext('2d');
                ctx.scale(scale, scale);

                // Background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, width, height);

                // Top Header Bar
                ctx.fillStyle = '#4f46e5';
                ctx.fillRect(0, 0, width, 10);

                // Title & Info
                ctx.fillStyle = '#0f172a';
                ctx.font = 'bold 22px Tahoma, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(`صورت‌حساب پرونده وام: ${loan.title || ''}`, width - 35, 48);

                ctx.fillStyle = '#64748b';
                ctx.font = '13px Tahoma, sans-serif';
                ctx.fillText(`نام مخاطب / طرف حساب: ${loan.contactName || ''}    •    شماره تماس: ${loan.phone || '-'}`, width - 35, 75);

                // Card background
                ctx.fillStyle = '#f8fafc';
                drawRoundRect(ctx, 35, 92, width - 70, 125, 14);
                ctx.fill();
                ctx.strokeStyle = '#cbd5e1';
                ctx.stroke();

                ctx.fillStyle = '#334155';
                ctx.font = '13px Tahoma, sans-serif';
                
                // Row 1
                ctx.fillText(`اصل مبلغ وام: ${(loan.principalAmount || 0).toLocaleString()} تومان`, width - 60, 125);
                ctx.fillText(`پرداختی تا امروز: ${(loan.paidAmount || 0).toLocaleString()} تومان`, width / 2 - 20, 125);

                // Row 2
                ctx.fillText(`مبلغ کل بازپرداخت: ${(loan.totalRepayment || 0).toLocaleString()} تومان`, width - 60, 158);
                ctx.fillText(`مبلغ باقی‌مانده: ${(loan.remainingAmount || 0).toLocaleString()} تومان`, width / 2 - 20, 158);

                // Row 3
                ctx.fillText(`موعد اقساط: روز ${loan.dueDayOfMonth || 1}ام هر ماه`, width - 60, 190);
                ctx.fillText(`اقساط پرداخت‌شده: ${paidInst} از ${totalInst} قسط`, width / 2 - 20, 190);

                // Section header
                ctx.fillStyle = '#0f172a';
                ctx.font = 'bold 15px Tahoma, sans-serif';
                ctx.fillText('ریز سوابق پرداخت اقساط', width - 35, 242);

                // Table Header
                const tableTop = 252;
                ctx.fillStyle = '#4f46e5';
                ctx.fillRect(35, tableTop, width - 70, 38);

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 12px Tahoma, sans-serif';
                ctx.fillText('ردیف', width - 60, tableTop + 24);
                ctx.fillText('عنوان / بابت', width - 140, tableTop + 24);
                ctx.fillText('تاریخ پرداخت', width - 420, tableTop + 24);
                ctx.fillText('مبلغ (تومان)', width - 620, tableTop + 24);

                let currentY = tableTop + 38;
                if (repayments.length === 0) {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(35, currentY, width - 70, 44);
                    ctx.fillStyle = '#94a3b8';
                    ctx.font = '13px Tahoma, sans-serif';
                    ctx.fillText('هیچ قسطی تاکنون برای این وام ثبت نشده است', width / 2 + 100, currentY + 28);
                    currentY += 44;
                } else {
                    repayments.forEach((tx, idx) => {
                        ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                        ctx.fillRect(35, currentY, width - 70, rowHeight);
                        
                        ctx.strokeStyle = '#f1f5f9';
                        ctx.strokeRect(35, currentY, width - 70, rowHeight);

                        ctx.fillStyle = '#334155';
                        ctx.font = '12px Tahoma, sans-serif';
                        ctx.fillText(String(idx + 1), width - 60, currentY + 26);
                        ctx.fillText(tx.title || 'پرداخت قسط', width - 140, currentY + 26);
                        ctx.fillText(formatDateToNumericJalali(tx.dateStr), width - 420, currentY + 26);

                        ctx.fillStyle = '#16a34a';
                        ctx.font = 'bold 12px Tahoma, sans-serif';
                        ctx.fillText(Number(tx.amount || 0).toLocaleString(), width - 620, currentY + 26);

                        currentY += rowHeight;
                    });
                }

                // Footer
                const nowJalali = getDeviceJalaliDate();
                const reportDateStr = formatDateToNumericJalali(`${nowJalali.day} ${nowJalali.month} ${nowJalali.year}`);
                ctx.fillStyle = '#94a3b8';
                ctx.font = '11px Tahoma, sans-serif';
                ctx.fillText(`تاریخ صدور گزارش: ${reportDateStr}    •    برنامه مدیریت مالی شخصی`, width - 35, currentY + 30);

                const imageURI = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = `پرونده_وام_${(loan.title || 'وام').replace(/\s+/g, '_')}.png`;
                link.href = imageURI;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (err) {
                console.error("Export PNG error:", err);
            }
        };

        const exportPeriodAsPNG = (period, contact) => {
            if (!period) return;
            try {
                const contactName = contact ? `${contact.firstName} ${contact.lastName}` : (period.contactName || 'مخاطب');
                const phone = contact ? (contact.phone || '-') : (period.phone || '-');
                const periodTxs = period.transactions || [];
                const isDebt = period.type === 'debt';

                const canvas = document.createElement('canvas');
                const width = 800;
                const rowHeight = 44;
                const headerHeight = 220;
                const tableHeaderHeight = 42;
                const footerHeight = 60;
                const height = headerHeight + tableHeaderHeight + Math.max(1, periodTxs.length) * rowHeight + footerHeight;

                const scale = 2;
                canvas.width = width * scale;
                canvas.height = height * scale;
                const ctx = canvas.getContext('2d');
                ctx.scale(scale, scale);

                // Background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, width, height);

                // Top Header Bar
                ctx.fillStyle = isDebt ? '#e11d48' : '#10b981';
                ctx.fillRect(0, 0, width, 10);

                // Title & Info
                ctx.fillStyle = '#0f172a';
                ctx.font = 'bold 22px Tahoma, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(`گزارش پرونده تسویه‌حساب آرشیو شده`, width - 35, 48);

                ctx.fillStyle = '#64748b';
                ctx.font = '13px Tahoma, sans-serif';
                ctx.fillText(`طرف حساب: ${contactName}    •    شماره تماس: ${phone}`, width - 35, 75);

                // Card background
                ctx.fillStyle = '#f8fafc';
                drawRoundRect(ctx, 35, 92, width - 70, 105, 14);
                ctx.fill();
                ctx.strokeStyle = '#cbd5e1';
                ctx.stroke();

                ctx.fillStyle = '#334155';
                ctx.font = '13px Tahoma, sans-serif';
                
                const startStr = formatDateToNumericJalali(period.startDate) || '-';
                const endStr = formatDateToNumericJalali(period.endDate) || '-';
                ctx.fillText(`تاریخ شروع دوره: ${startStr}`, width - 60, 125);
                ctx.fillText(`تاریخ تسویه نهایی: ${endStr}`, width / 2 - 20, 125);

                ctx.fillText(`نوع پرونده: ${isDebt ? 'تسویه بدهی (پرداخت‌شده)' : 'تسویه طلب (دریافت‌شده)'}`, width - 60, 160);
                ctx.fillText(`مبلغ کل تسویه‌شده: ${Number(period.totalAmount || 0).toLocaleString()} تومان`, width / 2 - 20, 160);

                // Section header
                ctx.fillStyle = '#0f172a';
                ctx.font = 'bold 15px Tahoma, sans-serif';
                ctx.fillText('ریز تراکنش‌ها و دریافتی/پرداختی‌های این دوره', width - 35, 222);

                // Table Header
                const tableTop = 232;
                ctx.fillStyle = isDebt ? '#e11d48' : '#10b981';
                ctx.fillRect(35, tableTop, width - 70, 38);

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 12px Tahoma, sans-serif';
                ctx.fillText('ردیف', width - 60, tableTop + 24);
                ctx.fillText('عنوان تراکنش', width - 140, tableTop + 24);
                ctx.fillText('تاریخ', width - 420, tableTop + 24);
                ctx.fillText('مبلغ (تومان)', width - 620, tableTop + 24);

                let currentY = tableTop + 38;
                if (periodTxs.length === 0) {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(35, currentY, width - 70, 44);
                    ctx.fillStyle = '#94a3b8';
                    ctx.font = '13px Tahoma, sans-serif';
                    ctx.fillText('هیچ تراکنشی در این دوره ثبت نشده است', width / 2 + 100, currentY + 28);
                    currentY += 44;
                } else {
                    periodTxs.forEach((tx, idx) => {
                        ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                        ctx.fillRect(35, currentY, width - 70, rowHeight);
                        
                        ctx.strokeStyle = '#f1f5f9';
                        ctx.strokeRect(35, currentY, width - 70, rowHeight);

                        ctx.fillStyle = '#334155';
                        ctx.font = '12px Tahoma, sans-serif';
                        ctx.fillText(String(idx + 1), width - 60, currentY + 26);
                        ctx.fillText(tx.title || (isDebt ? 'بازپرداخت بدهی' : 'دریافت طلب'), width - 140, currentY + 26);
                        ctx.fillText(formatDateToNumericJalali(tx.dateStr), width - 420, currentY + 26);

                        ctx.fillStyle = isDebt ? '#e11d48' : '#10b981';
                        ctx.font = 'bold 12px Tahoma, sans-serif';
                        ctx.fillText(Number(Math.abs(tx.amount || 0)).toLocaleString(), width - 620, currentY + 26);

                        currentY += rowHeight;
                    });
                }

                // Footer
                const nowJalali = getDeviceJalaliDate();
                const reportDateStr = formatDateToNumericJalali(`${nowJalali.day} ${nowJalali.month} ${nowJalali.year}`);
                ctx.fillStyle = '#94a3b8';
                ctx.font = '11px Tahoma, sans-serif';
                ctx.fillText(`تاریخ صدور گزارش: ${reportDateStr}    •    برنامه مدیریت مالی شخصی`, width - 35, currentY + 30);

                const imageURI = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = `تسویه‌حساب_${contactName.replace(/\s+/g, '_')}_${period.id}.png`;
                link.href = imageURI;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (err) {
                console.error("Export Period PNG error:", err);
            }
        };

        const exportPeriodAsExcel = (period, contact) => {
            if (!period) return;
            try {
                let csv = '\uFEFF';
                const contactName = contact ? `${contact.firstName} ${contact.lastName}` : (period.contactName || 'مخاطب');
                csv += `تسویه‌حساب آرشیو شده,${contactName}\n`;
                csv += `تاریخ شروع,${formatDateToNumericJalali(period.startDate) || '-'}\n`;
                csv += `تاریخ تسویه,${formatDateToNumericJalali(period.endDate) || '-'}\n`;
                csv += `نوع تسویه,${period.type === 'demand' ? 'طلب (دریافت)' : 'بدهی (پرداخت)'}\n`;
                csv += `مبلغ کل,${period.totalAmount || 0}\n\n`;

                csv += `ردیف,عنوان,تاریخ,مبلغ (تومان),نوع,توضیحات\n`;
                const txs = period.transactions || [];
                txs.forEach((tx, idx) => {
                    csv += `${idx + 1},"${tx.title || ''}","${tx.dateStr || ''}",${Math.abs(tx.amount || 0)},"${tx.type || ''}","${tx.notes || ''}"\n`;
                });

                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `تسویه_حساب_${contactName.replace(/\s+/g, '_')}_${period.id}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } catch (err) {
                console.error("Export Period Excel error:", err);
            }
        };

        const exportLoanAsPDF = (loan, txList) => {
            if (!loan) return;
            try {
                const repayments = (txList || []).filter(t => t.loanId === loan.id && t.type === 'repayment');
                const totalInst = loan.totalInstallments || (loan.installmentAmount > 0 ? Math.ceil(loan.totalRepayment / loan.installmentAmount) : 12);
                const paidInst = repayments.length;
                const nowJalali = getDeviceJalaliDate();

                const printIframe = document.createElement('iframe');
                printIframe.style.position = 'fixed';
                printIframe.style.right = '-9999px';
                printIframe.style.bottom = '-9999px';
                printIframe.style.width = '0px';
                printIframe.style.height = '0px';
                printIframe.style.border = 'none';
                document.body.appendChild(printIframe);

                const htmlContent = `
                    <!DOCTYPE html>
                    <html dir="rtl" lang="fa">
                    <head>
                        <meta charset="utf-8">
                        <title>پرونده وام ${loan.title || ''}</title>
                        <style>
                            body { font-family: Tahoma, Vazirmatn, sans-serif; padding: 25px; color: #1e293b; background: #fff; margin: 0; }
                            .header { border-bottom: 2px solid #4f46e5; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
                            .title { font-size: 20px; font-weight: bold; color: #1e293b; }
                            .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
                            .card { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; margin-bottom: 24px; }
                            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 13px; }
                            .grid-item { padding: 4px 0; }
                            .label { color: #64748b; }
                            .value { font-weight: bold; color: #0f172a; }
                            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
                            th { background: #4f46e5; color: #fff; text-align: right; padding: 10px; }
                            td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
                            tr:nth-child(even) { background: #f8fafc; }
                            .amount { font-weight: bold; color: #16a34a; }
                            .footer { margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px; }
                            @media print {
                                body { padding: 0; }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <div>
                                <div class="title">صورت‌حساب پرونده: ${loan.title || ''}</div>
                                <div class="subtitle">طرف حساب: ${loan.contactName || ''} (${loan.phone || '-'})</div>
                            </div>
                            <div style="font-size: 12px; color: #4f46e5; font-weight: bold;">صندوق مدیریت مالی</div>
                        </div>

                        <div class="card">
                            <div class="grid">
                                <div class="grid-item"><span class="label">اصل مبلغ وام:</span> <span class="value">${(loan.principalAmount || 0).toLocaleString()} تومان</span></div>
                                <div class="grid-item"><span class="label">پرداختی تا امروز:</span> <span class="value" style="color:#16a34a">${(loan.paidAmount || 0).toLocaleString()} تومان</span></div>
                                <div class="grid-item"><span class="label">کل مبلغ بازپرداخت:</span> <span class="value">${(loan.totalRepayment || 0).toLocaleString()} تومان</span></div>
                                <div class="grid-item"><span class="label">باقی‌مانده:</span> <span class="value" style="color:#ef4444">${(loan.remainingAmount || 0).toLocaleString()} تومان</span></div>
                                <div class="grid-item"><span class="label">موعد اقساط:</span> <span class="value">روز ${loan.dueDayOfMonth || 1}ام هر ماه</span></div>
                                <div class="grid-item"><span class="label">تعداد اقساط پرداخت‌شده:</span> <span class="value">${paidInst} از ${totalInst} قسط</span></div>
                            </div>
                        </div>

                        <h3 style="font-size: 15px; margin-bottom: 8px;">ریز سوابق پرداخت اقساط</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ردیف</th>
                                    <th>عنوان / بابت</th>
                                    <th>تاریخ پرداخت</th>
                                    <th>مبلغ (تومان)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${repayments.length === 0 ? `
                                    <tr><td colspan="4" style="text-align:center; color:#94a3b8;">هیچ قسطی تاکنون ثبت نشده است</td></tr>
                                ` : repayments.map((tx, i) => `
                                    <tr>
                                        <td>${i + 1}</td>
                                        <td>${tx.title || 'پرداخت قسط'} ${tx.notes ? ' - ' + tx.notes : ''}</td>
                                        <td>${tx.dateStr || '-'}</td>
                                        <td class="amount">${Number(tx.amount || 0).toLocaleString()}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>

                        <div class="footer">
                            تاریخ صدور گزارش: ${nowJalali.day} ${nowJalali.month} ${nowJalali.year}
                        </div>
                        <!-- Fail-safe PWA / Standalone Babel Execution & Auto-Recovery Script -->
    <script>
        (function() {
            function runBabelStandalone() {
                if (window.__APP_MOUNTED__) return;
                if (window.Babel && typeof window.Babel.transformScriptTags === 'function') {
                    try {
                        window.Babel.transformScriptTags();
                    } catch (e) {
                        console.error('Babel transform error:', e);
                    }
                }
            }

            // Trigger immediately in case DOMContentLoaded already fired
            runBabelStandalone();

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', runBabelStandalone);
                window.addEventListener('load', runBabelStandalone);
            } else {
                setTimeout(runBabelStandalone, 10);
                setTimeout(runBabelStandalone, 100);
                setTimeout(runBabelStandalone, 300);
            }

            // Emergency Root Check for Standalone / Web App Mode
            setTimeout(function() {
                var root = document.getElementById('root');
                if (root && (!root.children || root.children.length === 0) && !window.__APP_MOUNTED__) {
                    console.warn('Root element empty after 1.5s in Web App mode. Forcing Babel execution...');
                    runBabelStandalone();
                }
            }, 1500);

            // Ultimate Fallback Screen if App Fails to Mount after 3.5s
            setTimeout(function() {
                var root = document.getElementById('root');
                if (root && (!root.children || root.children.length === 0) && !window.__APP_MOUNTED__) {
                    root.innerHTML = '<div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.5rem;background:#0b101d;color:#fff;text-align:center;font-family:Vazirmatn,sans-serif;direction:rtl;">' +
                        '<div style="font-size:3.5rem;margin-bottom:1rem;animation:pulse 1.5s infinite;">⚡</div>' +
                        '<h2 style="font-size:1.25rem;font-weight:bold;margin-bottom:0.5rem;color:#f8fafc;">راه‌اندازی مجدد امیر فایننس</h2>' +
                        '<p style="font-size:0.875rem;color:#94a3b8;margin-bottom:1.5rem;max-width:320px;line-height:1.6;">نسخه جدید برنامه آماده است. جهت بارگذاری دکمه زیر را لمس کنید:</p>' +
                        '<button onclick="localStorage.clear();sessionStorage.clear();if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(rs){for(var r of rs)r.unregister();});}window.location.reload(true);" style="background:#4f46e5;color:#fff;padding:0.875rem 1.75rem;border-radius:0.875rem;font-weight:bold;border:none;cursor:pointer;box-shadow:0 10px 15px -3px rgba(79,70,229,0.3);">' +
                        'بروزرسانی و ورود به برنامه' +
                        '</button>' +
                        '</div>';
                }
            }, 3500);
        })();
    