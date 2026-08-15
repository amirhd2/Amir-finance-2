
        const { useState, useEffect, useRef, useMemo, useCallback, Component } = React;
        const Motion = window.Motion || window.framerMotion || {};
        const motionProxy = Motion.motion || new Proxy({}, {
            get: (target, tag) => {
                return function MotionFallback({ children, initial, animate, exit, transition, variants, custom, whileHover, whileTap, drag, dragConstraints, ...props }) {
                    return React.createElement(tag, props, children);
                };
            }
        });
        const motion = Motion.motion || motionProxy;
        const AnimatePresence = Motion.AnimatePresence || (({ children }) => React.createElement(React.Fragment, null, children));

        class ErrorBoundary extends Component {
            constructor(props) {
                super(props);
                this.state = { hasError: false, error: null };
            }
            static getDerivedStateFromError(error) {
                return { hasError: true, error };
            }
            componentDidCatch(error, errorInfo) {
                console.error('ErrorBoundary caught an error:', error, errorInfo);
            }
            render() {
                if (this.state.hasError) {
                    return (
                        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-slate-950 text-white text-center font-vazir dir-rtl">
                            <div className="text-5xl mb-4 animate-bounce">⚡</div>
                            <h2 className="text-lg font-bold mb-2 text-slate-100">راه‌اندازی مجدد امیر فایننس</h2>
                            <p className="text-xs text-slate-400 mb-6 max-w-xs leading-relaxed">
                                {this.state.error ? String(this.state.error) : 'نسخه جدید برنامه آماده است. جهت بارگذاری دکمه زیر را لمس کنید.'}
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
                                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all cursor-pointer"
                                >
                                    ورود به برنامه
                                </button>
                                <button
                                    onClick={() => { localStorage.clear(); sessionStorage.clear(); window.location.reload(); }}
                                    className="bg-slate-800 text-slate-300 px-5 py-2.5 rounded-xl font-bold text-xs active:scale-95 transition-all cursor-pointer"
                                >
                                    پاکسازی حافظه و بازیابی
                                </button>
                            </div>
                        </div>
                    );
                }
                return this.props.children;
            }
        }

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
                '62.1.7': 'بانک پارسیان',
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

        const toEnglishDigits = (str) => {
            if (!str) return '';
            return String(str)
                .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
                .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
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
                        </body></html>`;

                const win = printIframe.contentWindow || printIframe.contentDocument;
                const doc = win.document || win;
                doc.open();
                doc.write(htmlContent);
                doc.close();

                setTimeout(() => {
                    try {
                        printIframe.contentWindow.focus();
                        printIframe.contentWindow.print();
                    } catch (e) {
                        console.error("Print invocation error:", e);
                    }
                    setTimeout(() => {
                        if (document.body.contains(printIframe)) {
                            document.body.removeChild(printIframe);
                        }
                    }, 2000);
                }, 500);
            } catch (err) {
                console.error("Export PDF error:", err);
            }
        };

        const exportLoanAsExcel = (loan, txList) => {
            if (!loan) return;
            try {
                const repayments = (txList || []).filter(t => t.loanId === loan.id && t.type === 'repayment');
                let csv = '\uFEFF';
                csv += `عنوان وام,${loan.title || ''}\n`;
                csv += `طرف حساب,${loan.contactName || ''}\n`;
                csv += `شماره تماس,${loan.phone || ''}\n`;
                csv += `اصل مبلغ وام,${loan.principalAmount || 0}\n`;
                csv += `کل مبلغ بازپرداخت,${loan.totalRepayment || 0}\n`;
                csv += `پرداختی تا امروز,${loan.paidAmount || 0}\n`;
                csv += `باقی‌مانده,${loan.remainingAmount || 0}\n\n`;

                csv += `ردیف,عنوان,تاریخ پرداخت,مبلغ (تومان),توضیحات\n`;
                repayments.forEach((tx, idx) => {
                    csv += `${idx + 1},"${tx.title || 'پرداخت قسط'}","${tx.dateStr || ''}",${tx.amount || 0},"${tx.notes || ''}"\n`;
                });

                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `پرونده_وام_${(loan.title || 'وام').replace(/\s+/g, '_')}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } catch (err) {
                console.error("Export Excel error:", err);
            }
        };

        const initialContacts = [
            { id: 1, firstName: 'محمد', lastName: 'احمدی', phone: '09121234567', bankName: 'بانک ملی ایران', bankCard: '6037 9975 4321 4582', iban: 'IR12 0120 0000 0001 2345 6789 01', isPinned: true, activeLoansCount: 1, totalDemand: 15000000, totalDebt: 0, monthlyInstallment: 20000000, isFavorite: true },
            { id: 2, firstName: 'علی', lastName: 'رضایی', phone: '09129876543', bankName: 'بانک ملت', bankCard: '6104 3378 9012 1175', iban: 'IR88 0170 0000 0009 8765 4321 00', isPinned: false, activeLoansCount: 0, totalDemand: 0, totalDebt: 10000000, monthlyInstallment: 0, isFavorite: false },
            { id: 3, firstName: 'سارا', lastName: 'محمدی', phone: '09351112233', bankName: 'بانک پاسارگاد', bankCard: '5022 2910 1122 3344', iban: 'IR44 0570 0000 0005 0222 9101 12', isPinned: false, activeLoansCount: 0, totalDemand: 0, totalDebt: 0, monthlyInstallment: 0, isFavorite: true },
            { id: 4, firstName: 'رضا', lastName: 'اکبری', phone: '09123334455', bankName: 'بانک تجارت', bankCard: '5892 1012 4455 1123', iban: 'IR55 0180 0000 0005 8921 0124 45', isPinned: false, activeLoansCount: 1, totalDemand: 8000000, totalDebt: 0, monthlyInstallment: 20000000, isFavorite: false },
            { id: 5, firstName: 'مریم', lastName: 'حسینی', phone: '09194445566', bankName: 'بانک سامان', bankCard: '6219 8610 2233 4455', iban: 'IR66 0560 0000 0006 2198 6102 23', isPinned: false, activeLoansCount: 0, totalDemand: 0, totalDebt: 8000000, monthlyInstallment: 0, isFavorite: false },
            { id: 6, firstName: 'حسین', lastName: 'کریمی', phone: '09125556677', bankName: 'بانک پارسیان', bankCard: '6273 8111 5566 7788', iban: 'IR77 0540 0000 0006 2738 1115 56', isPinned: true, activeLoansCount: 1, totalDemand: 35000000, totalDebt: 0, monthlyInstallment: 10000000, isFavorite: true },
            { id: 7, firstName: 'زهرا', lastName: 'صادقی', phone: '09366667788', bankName: 'بانک سپه', bankCard: '6037 6919 8899 0011', iban: 'IR88 0150 0000 0006 0376 9198 89', isPinned: false, activeLoansCount: 0, totalDemand: 7000000, totalDebt: 0, monthlyInstallment: 0, isFavorite: false },
            { id: 8, firstName: 'مهدی', lastName: 'موسوی', phone: '09127778899', bankName: 'بانک رفاه کارگران', bankCard: '5894 6311 2233 4411', iban: 'IR99 0130 0000 0005 8946 3112 23', isPinned: false, activeLoansCount: 1, totalDemand: 18000000, totalDebt: 0, monthlyInstallment: 10000000, isFavorite: false },
            { id: 9, firstName: 'نرگس', lastName: 'قاسمی', phone: '09308889900', bankName: 'بانک اقتصاد نوین', bankCard: '6274 1211 3344 5566', iban: 'IR10 0550 0000 0006 2741 2113 34', isPinned: false, activeLoansCount: 0, totalDemand: 0, totalDebt: 15000000, monthlyInstallment: 0, isFavorite: false },
            { id: 10, firstName: 'امیرحسین', lastName: 'زارعی', phone: '09129990011', bankName: 'بانک شهر', bankCard: '5041 7210 6677 8899', iban: 'IR11 0610 0000 0005 0417 2106 67', isPinned: false, activeLoansCount: 1, totalDemand: 15000000, totalDebt: 0, monthlyInstallment: 16666000, isFavorite: true },
            { id: 11, firstName: 'فاطمه', lastName: 'نوری', phone: '09370001122', bankName: 'بانک آینده', bankCard: '6393 4610 7788 9900', iban: 'IR12 0620 0000 0006 3934 6107 78', isPinned: false, activeLoansCount: 0, totalDemand: 0, totalDebt: 12000000, monthlyInstallment: 0, isFavorite: false },
            { id: 12, firstName: 'سعید', lastName: 'نجفی', phone: '09121113355', bankName: 'بانک مهر ایران', bankCard: '6063 7310 1122 3344', iban: 'IR13 0630 0000 0006 0637 3101 12', isPinned: false, activeLoansCount: 1, totalDemand: 16000000, totalDebt: 0, monthlyInstallment: 12500000, isFavorite: false },
            { id: 13, firstName: 'الناز', lastName: 'ابراهیمی', phone: '09382224466', bankName: 'بانک آینده', bankCard: '6362 1410 2233 4455', iban: 'IR14 0640 0000 0006 3621 4102 23', isPinned: false, activeLoansCount: 0, totalDemand: 0, totalDebt: 6000000, monthlyInstallment: 0, isFavorite: false },
            { id: 14, firstName: 'کامران', lastName: 'طاهری', phone: '09123335577', bankName: 'بانک سپه', bankCard: '5058 0110 3344 5566', iban: 'IR15 0690 0000 0005 0580 1103 34', isPinned: false, activeLoansCount: 1, totalDemand: 25000000, totalDebt: 0, monthlyInstallment: 10000000, isFavorite: false },
            { id: 15, firstName: 'مبینا', lastName: 'قربانی', phone: '09394446688', bankName: 'بانک سرمایه', bankCard: '6396 0710 4455 6677', iban: 'IR16 0600 0000 0006 3960 7104 45', isPinned: false, activeLoansCount: 0, totalDemand: 0, totalDebt: 14000000, monthlyInstallment: 0, isFavorite: false },
            { id: 16, firstName: 'آرش', lastName: 'شریفی', phone: '09125557799', bankName: 'بانک صنعت و معدن', bankCard: '6279 6110 5566 7788', iban: 'IR17 0590 0000 0006 2796 1105 56', isPinned: false, activeLoansCount: 0, totalDemand: 9000000, totalDebt: 0, monthlyInstallment: 0, isFavorite: false },
            { id: 17, firstName: 'شیما', lastName: 'کاظمی', phone: '09306668800', bankName: 'بانک کشاورزی', bankCard: '6037 7010 6677 8899', iban: 'IR18 0110 0000 0006 0377 0106 67', isPinned: false, activeLoansCount: 0, totalDemand: 0, totalDebt: 20000000, monthlyInstallment: 0, isFavorite: false },
            { id: 18, firstName: 'فرزاد', lastName: 'مرادی', phone: '09127779911', bankName: 'بانک مسکن', bankCard: '6280 2310 7788 9900', iban: 'IR19 0510 0000 0006 2802 3107 78', isPinned: false, activeLoansCount: 0, totalDemand: 20000000, totalDebt: 9500000, monthlyInstallment: 0, isFavorite: false },
            { id: 19, firstName: 'مینا', lastName: 'مرادی‌نیا', phone: '09338880022', bankName: 'بانک کارآفرین', bankCard: '6369 4910 8899 0011', iban: 'IR20 0530 0000 0006 3694 9108 89', isPinned: false, activeLoansCount: 0, totalDemand: 0, totalDebt: 15000000, monthlyInstallment: 0, isFavorite: false },
            { id: 20, firstName: 'پیمان', lastName: 'باقری', phone: '09129991133', bankName: 'بانک دی', bankCard: '5029 0810 9900 1122', iban: 'IR21 0580 0000 0005 0290 8109 90', isPinned: false, activeLoansCount: 0, totalDemand: 0, totalDebt: 4000000, monthlyInstallment: 0, isFavorite: false }
        ];

        const initialLoans = [
            {
                id: 501,
                title: 'وام خودرو',
                contactId: 1,
                contactName: 'محمد احمدی',
                phone: '09121234567',
                principalAmount: 300000000,
                totalRepayment: 360000000,
                installmentAmount: 20000000,
                receiveDate: '1403/01/15',
                startDate: '1403/02/12',
                firstInstallmentDate: '25 اردیبهشت ۱۴۰۳',
                dueDate: '1404/07/25',
                totalInstallments: 18,
                status: 'در حال پرداخت',
                paidAmount: 120000000,
                remainingAmount: 240000000,
                dueDayOfMonth: 25,
                reminderDays: '1روز قبل',
                nextDueNum: 7,
                nextDueDateStr: '۲۵ آبان ۱۴۰۳',
                daysLeft: 12,
                notes: 'اقساط خرید خودروی ثبت‌نامی'
            },
            {
                id: 502,
                title: 'وام مسکن',
                contactId: 4,
                contactName: 'رضا اکبری',
                phone: '09123334455',
                principalAmount: 400000000,
                totalRepayment: 480000000,
                installmentAmount: 20000000,
                receiveDate: '1402/11/10',
                startDate: '1402/12/10',
                firstInstallmentDate: '10 دی ۱۴۰۲',
                dueDate: '1404/12/10',
                totalInstallments: 24,
                status: 'در حال پرداخت',
                paidAmount: 160000000,
                remainingAmount: 320000000,
                dueDayOfMonth: 10,
                reminderDays: '2روز قبل',
                nextDueNum: 9,
                nextDueDateStr: '۱۰ آذر ۱۴۰۳',
                daysLeft: 27,
                notes: 'وام جعاله و خرید مسکن'
            },
            {
                id: 503,
                title: 'وام ازدواج',
                contactId: 6,
                contactName: 'حسین کریمی',
                phone: '09125556677',
                principalAmount: 300000000,
                totalRepayment: 300000000,
                installmentAmount: 10000000,
                receiveDate: '1402/09/01',
                startDate: '1402/10/01',
                firstInstallmentDate: '01 آبان ۱۴۰۲',
                dueDate: '1405/04/01',
                totalInstallments: 30,
                status: 'در حال پرداخت',
                paidAmount: 100000000,
                remainingAmount: 200000000,
                dueDayOfMonth: 1,
                reminderDays: '1روز قبل',
                nextDueNum: 11,
                nextDueDateStr: '۰۱ شهریور ۱۴۰۳',
                daysLeft: 18,
                notes: 'وام ازدواج بانک پارسیان'
            },
            {
                id: 504,
                title: 'وام لوازم خانگی',
                contactId: 8,
                contactName: 'مهدی موسوی',
                phone: '09127778899',
                principalAmount: 100000000,
                totalRepayment: 120000000,
                installmentAmount: 10000000,
                receiveDate: '1403/02/15',
                startDate: '1403/03/15',
                firstInstallmentDate: '15 خرداد ۱۴۰۳',
                dueDate: '1404/03/15',
                totalInstallments: 12,
                status: 'در حال پرداخت',
                paidAmount: 40000000,
                remainingAmount: 80000000,
                dueDayOfMonth: 15,
                reminderDays: '1روز قبل',
                nextDueNum: 5,
                nextDueDateStr: '۱۵ مهر ۱۴۰۳',
                daysLeft: 2,
                notes: 'خرید اقساطی جهیزیه'
            },
            {
                id: 505,
                title: 'وام اشتغال',
                contactId: 10,
                contactName: 'امیرحسین زارعی',
                phone: '09129990011',
                principalAmount: 200000000,
                totalRepayment: 200000000,
                installmentAmount: 16666000,
                receiveDate: '1403/01/20',
                startDate: '1403/02/20',
                firstInstallmentDate: '20 اردیبهشت ۱۴۰۳',
                dueDate: '1404/02/20',
                totalInstallments: 12,
                status: 'در حال پرداخت',
                paidAmount: 50000000,
                remainingAmount: 150000000,
                dueDayOfMonth: 20,
                reminderDays: '3روز قبل',
                nextDueNum: 4,
                nextDueDateStr: '۲۰ مرداد ۱۴۰۳',
                daysLeft: 8,
                notes: 'وام توسعه کارگاه'
            },
            {
                id: 506,
                title: 'وام تعمیرات مسکن',
                contactId: 12,
                contactName: 'سعید نجفی',
                phone: '09121113355',
                principalAmount: 120000000,
                totalRepayment: 150000000,
                installmentAmount: 12500000,
                receiveDate: '1402/12/05',
                startDate: '1403/01/05',
                firstInstallmentDate: '05 فروردین ۱۴۰۳',
                dueDate: '1404/01/05',
                totalInstallments: 12,
                status: 'در حال پرداخت',
                paidAmount: 62500000,
                remainingAmount: 87500000,
                dueDayOfMonth: 5,
                reminderDays: '1روز قبل',
                nextDueNum: 6,
                nextDueDateStr: '۰۵ شهریور ۱۴۰۳',
                daysLeft: 22,
                notes: 'بازسازی و نقاشی منزل'
            },
            {
                id: 507,
                title: 'وام ودیعه مسکن',
                contactId: 14,
                contactName: 'کامران طاهری',
                phone: '09123335577',
                principalAmount: 200000000,
                totalRepayment: 240000000,
                installmentAmount: 10000000,
                receiveDate: '1402/08/20',
                startDate: '1402/09/20',
                firstInstallmentDate: '20 آذر ۱۴۰۲',
                dueDate: '1404/09/20',
                totalInstallments: 24,
                status: 'در حال پرداخت',
                paidAmount: 70000000,
                remainingAmount: 170000000,
                dueDayOfMonth: 20,
                reminderDays: '2روز قبل',
                nextDueNum: 8,
                nextDueDateStr: '۲۰ تیر ۱۴۰۳',
                daysLeft: -15,
                notes: 'کمک‌هزینه رهن آپارتمان'
            },
            {
                id: 508,
                title: 'وام خرید تجهیزات',
                contactId: 16,
                contactName: 'آرش شریفی',
                phone: '09125557799',
                principalAmount: 150000000,
                totalRepayment: 180000000,
                installmentAmount: 15000000,
                receiveDate: '1402/01/10',
                startDate: '1402/02/10',
                firstInstallmentDate: '10 اردیبهشت ۱۴۰۲',
                dueDate: '1403/02/10',
                totalInstallments: 12,
                status: 'تسویه‌شده',
                paidAmount: 180000000,
                remainingAmount: 0,
                dueDayOfMonth: 10,
                reminderDays: '1روز قبل',
                nextDueNum: 12,
                nextDueDateStr: 'کلیه اقساط پرداخت شده‌اند',
                daysLeft: 0,
                notes: 'خرید لپ‌تاپ و تجهیزات فنی'
            },
            {
                id: 509,
                title: 'وام ضروری رفاه',
                contactId: 7,
                contactName: 'زهرا صادقی',
                phone: '09366667788',
                principalAmount: 80000000,
                totalRepayment: 100000000,
                installmentAmount: 10000000,
                receiveDate: '1402/03/15',
                startDate: '1402/04/15',
                firstInstallmentDate: '15 تیر ۱۴۰۲',
                dueDate: '1403/01/15',
                totalInstallments: 10,
                status: 'تسویه‌شده',
                paidAmount: 100000000,
                remainingAmount: 0,
                dueDayOfMonth: 15,
                reminderDays: '1روز قبل',
                nextDueNum: 10,
                nextDueDateStr: 'کلیه اقساط پرداخت شده‌اند',
                daysLeft: 0,
                notes: 'وام کوتاه مدت بانک سپه'
            },
            {
                id: 510,
                title: 'وام اعتباری سامان',
                contactId: 3,
                contactName: 'سارا محمدی',
                phone: '09351112233',
                principalAmount: 50000000,
                totalRepayment: 60000000,
                installmentAmount: 5000000,
                receiveDate: '1402/04/01',
                startDate: '1402/05/01',
                firstInstallmentDate: '01 مرداد ۱۴۰۲',
                dueDate: '1403/04/01',
                totalInstallments: 12,
                status: 'تسویه‌شده',
                paidAmount: 60000000,
                remainingAmount: 0,
                dueDayOfMonth: 1,
                reminderDays: '1روز قبل',
                nextDueNum: 12,
                nextDueDateStr: 'کلیه اقساط پرداخت شده‌اند',
                daysLeft: 0,
                notes: 'وام خرد اعتباری'
            }
        ];

        const initialCompletedPeriods = [
            // 5 Settled Debts
            { id: 'p_debt_101', contactId: 2, contactName: 'علی رضایی', type: 'debt', title: 'دوره تسویه‌شده بدهی به علی رضایی', totalAmount: 7000000, startDate: '1403/01/15', endDate: '1403/04/10' },
            { id: 'p_debt_102', contactId: 5, contactName: 'مریم حسینی', type: 'debt', title: 'دوره تسویه‌شده بدهی به مریم حسینی', totalAmount: 14000000, startDate: '1403/02/01', endDate: '1403/05/15' },
            { id: 'p_debt_103', contactId: 8, contactName: 'مهدی موسوی', type: 'debt', title: 'دوره تسویه‌شده بدهی به مهدی موسوی', totalAmount: 20000000, startDate: '1402/10/10', endDate: '1403/03/20' },
            { id: 'p_debt_104', contactId: 11, contactName: 'فاطمه نوری', type: 'debt', title: 'دوره تسویه‌شده بدهی به فاطمه نوری', totalAmount: 9000000, startDate: '1403/03/05', endDate: '1403/06/12' },
            { id: 'p_debt_105', contactId: 14, contactName: 'کامران طاهری', type: 'debt', title: 'دوره تسویه‌شده بدهی به کامران طاهری', totalAmount: 35000000, startDate: '1402/11/15', endDate: '1403/04/25' },
            // 5 Settled Demands
            { id: 'p_demand_201', contactId: 1, contactName: 'محمد احمدی', type: 'demand', title: 'دوره تسویه‌شده طلب از محمد احمدی', totalAmount: 10000000, startDate: '1403/01/10', endDate: '1403/03/15' },
            { id: 'p_demand_202', contactId: 3, contactName: 'سارا محمدی', type: 'demand', title: 'دوره تسویه‌شده طلب از سارا محمدی', totalAmount: 15000000, startDate: '1403/02/05', endDate: '1403/05/01' },
            { id: 'p_demand_203', contactId: 6, contactName: 'حسین کریمی', type: 'demand', title: 'دوره تسویه‌شده طلب از حسین کریمی', totalAmount: 28000000, startDate: '1402/09/12', endDate: '1403/02/20' },
            { id: 'p_demand_204', contactId: 9, contactName: 'نرگس قاسمی', type: 'demand', title: 'دوره تسویه‌شده طلب از نرگس قاسمی', totalAmount: 12500000, startDate: '1403/03/01', endDate: '1403/06/10' },
            { id: 'p_demand_205', contactId: 13, contactName: 'الناز ابراهیمی', type: 'demand', title: 'دوره تسویه‌شده طلب از الناز ابراهیمی', totalAmount: 22000000, startDate: '1402/12/01', endDate: '1403/04/18' }
        ];

        const initialTransactions = [
            // Active Debts Transactions
            { id: 1001, contactId: 2, type: 'debt', title: 'ثبت بدهی جدید - خرید تجهیزات', dateStr: '۱۵ فروردین ۱۴۰۳', amount: -15000000, isPositive: false },
            { id: 1002, contactId: 2, type: 'debt_repayment', title: 'بازپرداخت بدهی به علی رضایی', dateStr: '۲۰ اردیبهشت ۱۴۰۳', amount: 5000000, isPositive: true },
            { id: 1003, contactId: 5, type: 'debt', title: 'ثبت بدهی جدید - قرض شخصی', dateStr: '۰۱ خرداد ۱۴۰۳', amount: -8000000, isPositive: false },
            { id: 1004, contactId: 9, type: 'debt', title: 'ثبت بدهی جدید - کمک هزینه سفارشی', dateStr: '۱۰ اردیبهشت ۱۴۰۳', amount: -25000000, isPositive: false },
            { id: 1005, contactId: 9, type: 'debt_repayment', title: 'بازپرداخت بدهی به نرگس قاسمی', dateStr: '۱۵ تیر ۱۴۰۳', amount: 10000000, isPositive: true },
            { id: 1006, contactId: 11, type: 'debt', title: 'ثبت بدهی جدید - رزرو خدمات', dateStr: '۰۵ تیر ۱۴۰۳', amount: -12000000, isPositive: false },
            { id: 1007, contactId: 13, type: 'debt', title: 'ثبت بدهی جدید - خرید کالا', dateStr: '۲۰ خرداد ۱۴۰۳', amount: -6000000, isPositive: false },
            { id: 1008, contactId: 15, type: 'debt', title: 'ثبت بدهی جدید - بلیت هوایی', dateStr: '۱۲ فروردین ۱۴۰۳', amount: -18000000, isPositive: false },
            { id: 1009, contactId: 15, type: 'debt_repayment', title: 'بازپرداخت بدهی به مبینا قربانی', dateStr: '۲۵ اردیبهشت ۱۴۰۳', amount: 4000000, isPositive: true },
            { id: 1010, contactId: 17, type: 'debt', title: 'ثبت بدهی جدید - سرمایه‌گذاری خرد', dateStr: '۰۱ اردیبهشت ۱۴۰۳', amount: -30000000, isPositive: false },
            { id: 1011, contactId: 17, type: 'debt_repayment', title: 'بازپرداخت بدهی به شیما کاظمی', dateStr: '۱۸ خرداد ۱۴۰۳', amount: 10000000, isPositive: true },
            { id: 1012, contactId: 18, type: 'debt', title: 'ثبت بدهی جدید - خدمات کارگاهی', dateStr: '۰۸ تیر ۱۴۰۳', amount: -9500000, isPositive: false },
            { id: 1013, contactId: 19, type: 'debt', title: 'ثبت بدهی جدید - سفارش اقلام', dateStr: '۱۵ فروردین ۱۴۰۳', amount: -22000000, isPositive: false },
            { id: 1014, contactId: 19, type: 'debt_repayment', title: 'بازپرداخت بدهی به مینا مرادی‌نیا', dateStr: '۰۲ تیر ۱۴۰۳', amount: 7000000, isPositive: true },
            { id: 1015, contactId: 20, type: 'debt', title: 'ثبت بدهی جدید - شارژ کارگاه', dateStr: '۱۰ تیر ۱۴۰۳', amount: -4000000, isPositive: false },

            // Active Demands Transactions
            { id: 2001, contactId: 1, type: 'demand', title: 'ثبت طلب جدید - امانت کاری', dateStr: '۱۰ فروردین ۱۴۰۳', amount: 20000000, isPositive: true },
            { id: 2002, contactId: 1, type: 'demand_repayment', title: 'دریافت بازپرداخت طلب از محمد احمدی', dateStr: '۱۵ اردیبهشت ۱۴۰۳', amount: -5000000, isPositive: false },
            { id: 2003, contactId: 4, type: 'demand', title: 'ثبت طلب جدید - فروش تجهیزات', dateStr: '۰۵ اردیبهشت ۱۴۰۳', amount: 12000000, isPositive: true },
            { id: 2004, contactId: 4, type: 'demand_repayment', title: 'دریافت بازپرداخت طلب از رضا اکبری', dateStr: '۲۰ خرداد ۱۴۰۳', amount: -4000000, isPositive: false },
            { id: 2005, contactId: 6, type: 'demand', title: 'ثبت طلب جدید - ودیعه تجاری', dateStr: '۰۱ فروردین ۱۴۰۳', amount: 35000000, isPositive: true },
            { id: 2006, contactId: 7, type: 'demand', title: 'ثبت طلب جدید - پروژه برنامه‌نویسی', dateStr: '۱۸ خرداد ۱۴۰۳', amount: 10000000, isPositive: true },
            { id: 2007, contactId: 7, type: 'demand_repayment', title: 'دریافت بازپرداخت طلب از زهرا صادقی', dateStr: '۱۰ تیر ۱۴۰۳', amount: -3000000, isPositive: false },
            { id: 2008, contactId: 8, type: 'demand', title: 'ثبت طلب جدید - مشاوره اقتصادی', dateStr: '۲۵ اردیبهشت ۱۴۰۳', amount: 18000000, isPositive: true },
            { id: 2009, contactId: 10, type: 'demand', title: 'ثبت طلب جدید - شراکت پروژه‌ای', dateStr: '۱۴ فروردین ۱۴۰۳', amount: 25000000, isPositive: true },
            { id: 2010, contactId: 10, type: 'demand_repayment', title: 'دریافت بازپرداخت طلب از امیرحسین زارعی', dateStr: '۰۵ تیر ۱۴۰۳', amount: -10000000, isPositive: false },
            { id: 2011, contactId: 12, type: 'demand', title: 'ثبت طلب جدید - فروش ابزار دقیق', dateStr: '۰۲ خرداد ۱۴۰۳', amount: 16000000, isPositive: true },
            { id: 2012, contactId: 14, type: 'demand', title: 'ثبت طلب جدید - سرمایه‌گذاری متقابل', dateStr: '۲۰ فروردین ۱۴۰۳', amount: 40000000, isPositive: true },
            { id: 2013, contactId: 14, type: 'demand_repayment', title: 'دریافت بازپرداخت طلب از کامران طاهری', dateStr: '۱۲ خرداد ۱۴۰۳', amount: -15000000, isPositive: false },
            { id: 2014, contactId: 16, type: 'demand', title: 'ثبت طلب جدید - برندینگ و تبلیغات', dateStr: '۰۱ تیر ۱۴۰۳', amount: 9000000, isPositive: true },
            { id: 2015, contactId: 18, type: 'demand', title: 'ثبت طلب جدید - تامین قطعات', dateStr: '۱۵ اردیبهشت ۱۴۰۳', amount: 30000000, isPositive: true },
            { id: 2016, contactId: 18, type: 'demand_repayment', title: 'دریافت بازپرداخت طلب از فرزاد مرادی', dateStr: '۲۸ خرداد ۱۴۰۳', amount: -10000000, isPositive: false },

            // Settled Debts Archived Transactions
            { id: 3001, periodId: 'p_debt_101', contactId: 2, type: 'debt', title: 'ثبت بدهی قدیمی', dateStr: '۱۵ فروردین ۱۴۰۳', amount: -7000000, isPositive: false },
            { id: 3002, periodId: 'p_debt_101', contactId: 2, type: 'debt_repayment', title: 'تسویه کامل بدهی به علی رضایی', dateStr: '۱۰ تیر ۱۴۰۳', amount: 7000000, isPositive: true },
            { id: 3003, periodId: 'p_debt_102', contactId: 5, type: 'debt', title: 'ثبت بدهی قدیمی', dateStr: '۰۱ اردیبهشت ۱۴۰۳', amount: -14000000, isPositive: false },
            { id: 3004, periodId: 'p_debt_102', contactId: 5, type: 'debt_repayment', title: 'تسویه کامل بدهی به مریم حسینی', dateStr: '۱۵ مرداد ۱۴۰۳', amount: 14000000, isPositive: true },
            { id: 3005, periodId: 'p_debt_103', contactId: 8, type: 'debt', title: 'ثبت بدهی قدیمی', dateStr: '۱۰ دی ۱۴۰۲', amount: -20000000, isPositive: false },
            { id: 3006, periodId: 'p_debt_103', contactId: 8, type: 'debt_repayment', title: 'تسویه کامل بدهی به مهدی موسوی', dateStr: '۲۰ اسفند ۱۴۰۲', amount: 20000000, isPositive: true },
            { id: 3007, periodId: 'p_debt_104', contactId: 11, type: 'debt', title: 'ثبت بدهی قدیمی', dateStr: '۰۵ خرداد ۱۴۰۳', amount: -9000000, isPositive: false },
            { id: 3008, periodId: 'p_debt_104', contactId: 11, type: 'debt_repayment', title: 'تسویه کامل بدهی به فاطمه نوری', dateStr: '۱۲ تیر ۱۴۰۳', amount: 9000000, isPositive: true },
            { id: 3009, periodId: 'p_debt_105', contactId: 14, type: 'debt', title: 'ثبت بدهی قدیمی', dateStr: '۱۵ بهمن ۱۴۰۲', amount: -35000000, isPositive: false },
            { id: 3010, periodId: 'p_debt_105', contactId: 14, type: 'debt_repayment', title: 'تسویه کامل بدهی به کامران طاهری', dateStr: '۲۵ فروردین ۱۴۰۳', amount: 35000000, isPositive: true },

            // Settled Demands Archived Transactions
            { id: 4001, periodId: 'p_demand_201', contactId: 1, type: 'demand', title: 'ثبت طلب قدیمی', dateStr: '۱۰ فروردین ۱۴۰۳', amount: 10000000, isPositive: true },
            { id: 4002, periodId: 'p_demand_201', contactId: 1, type: 'demand_repayment', title: 'تسویه کامل طلب از محمد احمدی', dateStr: '۱۵ خرداد ۱۴۰۳', amount: -10000000, isPositive: false },
            { id: 4003, periodId: 'p_demand_202', contactId: 3, type: 'demand', title: 'ثبت طلب قدیمی', dateStr: '۰۵ اردیبهشت ۱۴۰۳', amount: 15000000, isPositive: true },
            { id: 4004, periodId: 'p_demand_202', contactId: 3, type: 'demand_repayment', title: 'تسویه کامل طلب از سارا محمدی', dateStr: '۰۱ مرداد ۱۴۰۳', amount: -15000000, isPositive: false },
            { id: 4005, periodId: 'p_demand_203', contactId: 6, type: 'demand', title: 'ثبت طلب قدیمی', dateStr: '۱۲ آذر ۱۴۰۲', amount: 28000000, isPositive: true },
            { id: 4006, periodId: 'p_demand_203', contactId: 6, type: 'demand_repayment', title: 'تسویه کامل طلب از حسین کریمی', dateStr: '۲۰ اردیبهشت ۱۴۰۳', amount: -28000000, isPositive: false },
            { id: 4007, periodId: 'p_demand_204', contactId: 9, type: 'demand', title: 'ثبت طلب قدیمی', dateStr: '۰۱ خرداد ۱۴۰۳', amount: 12500000, isPositive: true },
            { id: 4008, periodId: 'p_demand_204', contactId: 9, type: 'demand_repayment', title: 'تسویه کامل طلب از نرگس قاسمی', dateStr: '۱۰ شهریور ۱۴۰۳', amount: -12500000, isPositive: false },
            { id: 4009, periodId: 'p_demand_205', contactId: 13, type: 'demand', title: 'ثبت طلب قدیمی', dateStr: '۰۱ اسفند ۱۴۰۲', amount: 22000000, isPositive: true },
            { id: 4010, periodId: 'p_demand_205', contactId: 13, type: 'demand_repayment', title: 'تسویه کامل طلب از الناز ابراهیمی', dateStr: '۱۸ اردیبهشت ۱۴۰۳', amount: -22000000, isPositive: false },

            // Loan Repayment Transactions
            { id: 5001, loanId: 501, contactId: 1, type: 'repayment', title: 'پرداخت قسط شماره ۶ - وام خودرو', dateStr: '۲۵ مهر ۱۴۰۳', amount: 20000000, isPositive: true },
            { id: 5002, loanId: 501, contactId: 1, type: 'repayment', title: 'پرداخت قسط شماره ۵ - وام خودرو', dateStr: '۲۵ شهریور ۱۴۰۳', amount: 20000000, isPositive: true },
            { id: 5003, loanId: 501, contactId: 1, type: 'repayment', title: 'پرداخت قسط شماره ۴ - وام خودرو', dateStr: '۲۵ مرداد ۱۴۰۳', amount: 20000000, isPositive: true },
            { id: 5004, loanId: 501, contactId: 1, type: 'repayment', title: 'پرداخت قسط شماره ۳ - وام خودرو', dateStr: '۲۵ تیر ۱۴۰۳', amount: 20000000, isPositive: true },
            { id: 5005, loanId: 501, contactId: 1, type: 'repayment', title: 'پرداخت قسط شماره ۲ - وام خودرو', dateStr: '۲۵ خرداد ۱۴۰۳', amount: 20000000, isPositive: true },
            { id: 5006, loanId: 501, contactId: 1, type: 'repayment', title: 'پرداخت قسط شماره ۱ - وام خودرو', dateStr: '۲۵ اردیبهشت ۱۴۰۳', amount: 20000000, isPositive: true },

            { id: 5007, loanId: 502, contactId: 4, type: 'repayment', title: 'پرداخت قسط شماره ۸ - وام مسکن', dateStr: '۱۰ آبان ۱۴۰۳', amount: 20000000, isPositive: true },
            { id: 5008, loanId: 502, contactId: 4, type: 'repayment', title: 'پرداخت قسط شماره ۷ - وام مسکن', dateStr: '۱۰ مهر ۱۴۰۳', amount: 20000000, isPositive: true },
            { id: 5009, loanId: 502, contactId: 4, type: 'repayment', title: 'پرداخت قسط شماره ۶ - وام مسکن', dateStr: '۱۰ شهریور ۱۴۰۳', amount: 20000000, isPositive: true },

            { id: 5010, loanId: 503, contactId: 6, type: 'repayment', title: 'پرداخت قسط شماره ۱۰ - وام ازدواج', dateStr: '۰۱ مرداد ۱۴۰۳', amount: 10000000, isPositive: true },
            { id: 5011, loanId: 503, contactId: 6, type: 'repayment', title: 'پرداخت قسط شماره ۹ - وام ازدواج', dateStr: '۰۱ تیر ۱۴۰۳', amount: 10000000, isPositive: true },

            { id: 5012, loanId: 504, contactId: 8, type: 'repayment', title: 'پرداخت قسط شماره ۴ - وام لوازم خانگی', dateStr: '۱۵ شهریور ۱۴۰۳', amount: 10000000, isPositive: true },
            { id: 5013, loanId: 505, contactId: 10, type: 'repayment', title: 'پرداخت قسط شماره ۳ - وام اشتغال', dateStr: '۲۰ تیر ۱۴۰۳', amount: 16666000, isPositive: true },
            { id: 5014, loanId: 506, contactId: 12, type: 'repayment', title: 'پرداخت قسط شماره ۵ - وام تعمیرات مسکن', dateStr: '۰۵ مرداد ۱۴۰۳', amount: 12500000, isPositive: true },
            { id: 5015, loanId: 507, contactId: 14, type: 'repayment', title: 'پرداخت قسط شماره ۷ - وام ودیعه مسکن', dateStr: '۲۰ خرداد ۱۴۰۳', amount: 10000000, isPositive: true }
        ];

        const initialReminders = [
            { id: 1, title: 'قسط خودرو', category: 'خودرو', daysLeft: 4, dateStr: 'شنبه ۲۵ مرداد ۱۴۰۴', icon: 'car', color: 'bg-red-50 text-red-500 dark:bg-red-950/40' },
            { id: 2, title: 'بازپرداخت به علی رضایی', category: 'شخص', daysLeft: 8, dateStr: 'سه‌شنبه ۲۸ مرداد ۱۴۰۴', icon: 'user', color: 'bg-amber-50 text-amber-500 dark:bg-amber-950/40' },
            { id: 3, title: 'قسط وام مسکن', category: 'مسکن', daysLeft: 18, dateStr: 'پنج‌شنبه ۱۰ شهریور ۱۴۰۴', icon: 'home', color: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950/40' }
        ];

        // variants انیمیشن iOS برای پاپ‌آپ‌ها (Pop Out بانس سریع 1.05 و کوچک‌شدن ملموس به 0.45 با فیدآوت نرم)
        const iosModalVariants = {
            initial: { opacity: 0, scale: 0.95 },
            animate: { 
                opacity: 1, 
                scale: 1,
                transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    opacity: { duration: 0.15 }
                } 
            },
            exit: { 
                opacity: 0, 
                scale: 0.95, 
                transition: { duration: 0.2, ease: "easeIn" } 
            }
        };

        const iosBackdropVariants = {
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
            exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
        };

        function Icon({ name, className = "w-5 h-5", style = {}, ...props }) {
            const containerRef = useRef(null);

            useEffect(() => {
                if (containerRef.current && window.lucide && name) {
                    containerRef.current.innerHTML = `<i data-lucide="${name}" class="block w-full h-full flex items-center justify-center shrink-0 ${className || ''}"></i>`;
                    window.lucide.createIcons({
                        root: containerRef.current
                    });
                }
            }, [name, className]);

            return <span ref={containerRef} className="inline-flex items-center justify-center shrink-0 leading-none p-0" style={style} {...props} />;
        }

        
        function PullToRefresh({ onRefresh, children, className = "" }) {
            const containerRef = useRef(null);
            const [pullY, setPullY] = useState(0);
            const [isRefreshing, setIsRefreshing] = useState(false);
            const [isExiting, setIsExiting] = useState(false);
            
            const startYRef = useRef(0);
            const startXRef = useRef(0);
            const isDraggingRef = useRef(false);

            const PULL_THRESHOLD = 75;
            const MAX_PULL = 120;
            const RESISTANCE = 0.45;

            useEffect(() => {
                const container = containerRef.current;
                if (!container) return;

                const handleStart = (clientX, clientY) => {
                    if (isRefreshing || isExiting) return;
                    const isAtTop = container.scrollTop <= 0 && window.scrollY <= 0;
                    if (isAtTop) {
                        startYRef.current = clientY;
                        startXRef.current = clientX;
                        isDraggingRef.current = true;
                    } else {
                        isDraggingRef.current = false;
                    }
                };

                const handleMove = (clientX, clientY, e) => {
                    if (!isDraggingRef.current || isRefreshing || isExiting) return;
                    const deltaY = clientY - startYRef.current;
                    const deltaX = Math.abs(clientX - startXRef.current);
                    const isAtTop = container.scrollTop <= 0;

                    if (deltaY > 0 && deltaY > deltaX && isAtTop) {
                        const rawPull = deltaY * RESISTANCE;
                        const clampedPull = Math.min(MAX_PULL, rawPull);
                        setPullY(clampedPull);

                        if (e && e.cancelable && deltaY > 8) {
                            e.preventDefault();
                        }
                    } else if (deltaY <= 0) {
                        setPullY(0);
                        isDraggingRef.current = false;
                    }
                };

                const handleEnd = async () => {
                    if (!isDraggingRef.current && !isRefreshing) return;
                    isDraggingRef.current = false;

                    if (pullY >= PULL_THRESHOLD) {
                        setIsRefreshing(true);
                        setPullY(PULL_THRESHOLD); // Lock content at 75px

                        try {
                            if (onRefresh) {
                                await Promise.resolve(onRefresh());
                            }
                            await new Promise(r => setTimeout(r, 600));
                        } catch (err) {
                            console.error(err);
                        } finally {
                            // Stage 1: Spinner fades out & scales down
                            setIsExiting(true);
                            await new Promise(r => setTimeout(r, 200));

                            // Stage 2: Content smoothly returns to translateY(0)
                            setPullY(0);
                            setIsRefreshing(false);
                            await new Promise(r => setTimeout(r, 320));
                            setIsExiting(false);
                        }
                    } else {
                        setPullY(0);
                    }
                };

                const onPointerDown = (e) => {
                    if (e.button !== undefined && e.button !== 0) return;
                    handleStart(e.clientX, e.clientY);
                };

                const onPointerMove = (e) => {
                    handleMove(e.clientX, e.clientY, e);
                };

                const onPointerUp = () => {
                    handleEnd();
                };

                const onTouchStart = (e) => {
                    if (e.touches && e.touches[0]) {
                        handleStart(e.touches[0].clientX, e.touches[0].clientY);
                    }
                };

                const onTouchMove = (e) => {
                    if (e.touches && e.touches[0]) {
                        handleMove(e.touches[0].clientX, e.touches[0].clientY, e);
                    }
                };

                const onTouchEnd = () => {
                    handleEnd();
                };

                container.addEventListener('pointerdown', onPointerDown);
                window.addEventListener('pointermove', onPointerMove, { passive: false });
                window.addEventListener('pointerup', onPointerUp);
                window.addEventListener('pointercancel', onPointerUp);

                container.addEventListener('touchstart', onTouchStart, { passive: true });
                container.addEventListener('touchmove', onTouchMove, { passive: false });
                container.addEventListener('touchend', onTouchEnd);
                container.addEventListener('touchcancel', onTouchEnd);

                return () => {
                    container.removeEventListener('pointerdown', onPointerDown);
                    window.removeEventListener('pointermove', onPointerMove);
                    window.removeEventListener('pointerup', onPointerUp);
                    window.removeEventListener('pointercancel', onPointerUp);

                    container.removeEventListener('touchstart', onTouchStart);
                    container.removeEventListener('touchmove', onTouchMove);
                    container.removeEventListener('touchend', onTouchEnd);
                    container.removeEventListener('touchcancel', onTouchEnd);
                };
            }, [pullY, isRefreshing, isExiting, onRefresh]);

            const progress = Math.min(1, Math.max(0, pullY / PULL_THRESHOLD));
            const opacity = isExiting ? 0 : (isRefreshing ? 1 : Math.min(1, pullY / 25));
            const scale = isExiting ? 0.4 : (isRefreshing ? 1 : 0.5 + 0.5 * progress);
            const rotation = progress * 360;

            return (
                <div 
                    ref={containerRef}
                    className={`relative overflow-y-auto overflow-x-clip overscroll-x-none hide-scrollbar ${className}`}
                    style={{ 
                        WebkitOverflowScrolling: 'touch',
                        overscrollBehaviorY: 'contain'
                    }}
                >
                    {/* Centered Refresh Spinner in the top elastic gap */}
                    {(pullY > 0 || isRefreshing || isExiting) && (
                        <div 
                            className="absolute left-1/2 -translate-x-1/2 z-40 pointer-events-none flex items-center justify-center"
                            style={{
                                top: `${Math.max(12, (pullY / 2) - 20)}px`,
                                transform: `translate3d(-50%, 0, 0) scale(${scale})`,
                                opacity: opacity,
                                transition: isDraggingRef.current 
                                    ? 'none' 
                                    : 'transform 320ms cubic-bezier(0.32, 0.72, 0, 1), opacity 200ms ease',
                                willChange: 'transform, opacity'
                            }}
                        >
                            <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                {isRefreshing ? (
                                    <div className="w-5 h-5 border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin shrink-0" />
                                ) : (
                                    <div 
                                        className="flex items-center justify-center"
                                        style={{ 
                                            transform: `rotate(${rotation}deg)`,
                                            transition: isDraggingRef.current ? 'none' : 'transform 200ms ease-out'
                                        }}
                                    >
                                        <Icon name="refresh-cw" className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Content Container (App Wrapper Elastic Gap Translation) */}
                    <div 
                        className="w-full min-h-full"
                        style={{
                            transform: pullY > 0 ? `translate3d(0, ${pullY}px, 0)` : 'translate3d(0, 0, 0)',
                            transition: isDraggingRef.current 
                                ? 'none' 
                                : 'transform 320ms cubic-bezier(0.32, 0.72, 0, 1)',
                            willChange: 'transform'
                        }}
                    >
                        {children}
                    </div>
                </div>
            );
        }

        function SwipeBackWrapper({ onBack, onRefresh, underlyingContent, children, className = "", navDirection = "forward" }) {
            const page1Ref = useRef(null);
            const page2Ref = useRef(null);
            const overlayRef = useRef(null);
            const isClosingRef = useRef(false);

            const gestureRef = useRef({
                isEdgeCandidate: false,
                isDragging: false,
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                startTime: 0
            });

            const openPage = () => {
                const page1 = page1Ref.current;
                const page2 = page2Ref.current;
                const overlay = overlayRef.current;

                if (page1 && page2 && overlay) {
                    page1.classList.add('smooth-transition');
                    page2.classList.add('smooth-transition');
                    overlay.classList.add('smooth-overlay');
                    void page2.offsetHeight;

                    page2.style.transform = 'translate3d(0%, 0, 0)';
                    page1.style.transform = 'translate3d(-25%, 0, 0)';
                    overlay.style.opacity = '0.4';
                }
            };

            const closePage = (mode = 'button') => {
                if (isClosingRef.current) return;
                isClosingRef.current = true;
                

                const page1 = page1Ref.current;
                const page2 = page2Ref.current;
                const overlay = overlayRef.current;

                if (page1 && page2 && overlay) {
                    page1.classList.add('smooth-transition');
                    page2.classList.add('smooth-transition');
                    overlay.classList.add('smooth-overlay');
                    void page2.offsetHeight;

                    page2.style.transform = 'translate3d(100%, 0, 0)';
                    page1.style.transform = 'translate3d(0%, 0, 0)';
                    overlay.style.opacity = '0';

                    let triggered = false;
                    const finishBack = () => {
                        if (triggered) return;
                        triggered = true;
                        if (page2) page2.removeEventListener('transitionend', finishBack);
                        if (onBack) onBack(mode);
                    };

                    page2.addEventListener('transitionend', finishBack);
                    setTimeout(finishBack, 500);
                } else {
                    if (onBack) onBack(mode);
                }
            };

            useEffect(() => {
                const page1 = page1Ref.current;
                const page2 = page2Ref.current;
                const overlay = overlayRef.current;

                if (page1 && page2 && overlay) {
                    if (navDirection === 'none') {
                        page1.classList.remove('smooth-transition');
                        page2.classList.remove('smooth-transition');
                        overlay.classList.remove('smooth-overlay');
                        page2.style.transform = 'translate3d(0%, 0, 0)';
                        page1.style.transform = 'translate3d(-25%, 0, 0)';
                        overlay.style.opacity = '0.4';
                    } else {
                        page1.classList.remove('smooth-transition');
                        page2.classList.remove('smooth-transition');
                        overlay.classList.remove('smooth-overlay');
                        page2.style.transform = 'translate3d(100%, 0, 0)';
                        page1.style.transform = 'translate3d(0%, 0, 0)';
                        overlay.style.opacity = '0';
                        void page2.offsetHeight;
                        requestAnimationFrame(() => requestAnimationFrame(() => openPage()));
                    }
                }
            }, []);

            useEffect(() => {
                const EDGE_THRESHOLD = 45; // Generous 45px edge drag zone

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
                    if (isClosingRef.current) return;
                    if (e.button !== undefined && e.button !== 0) return;

                    if (e.target && e.target.closest && e.target.closest('[data-swipe-item]')) {
                        gestureRef.current.isEdgeCandidate = false;
                        gestureRef.current.isDragging = false;
                        return;
                    }

                    const { x, y } = getCoords(e);
                    const rect = page2Ref.current ? page2Ref.current.getBoundingClientRect() : null;
                    const relX = rect ? x - rect.left : x;

                    if (relX <= EDGE_THRESHOLD) {
                        gestureRef.current.isEdgeCandidate = true;
                        gestureRef.current.isDragging = false;
                        gestureRef.current.startX = x;
                        gestureRef.current.startY = y;
                        gestureRef.current.currentX = x;
                        gestureRef.current.currentY = y;
                        gestureRef.current.startTime = Date.now();
                    }
                };

                const handleMove = (e) => {
                    const g = gestureRef.current;
                    if (isClosingRef.current) return;
                    if (!g.isEdgeCandidate && !g.isDragging) return;

                    if (e.target && e.target.closest && e.target.closest('[data-swipe-item]')) {
                        g.isEdgeCandidate = false;
                        g.isDragging = false;
                        return;
                    }

                    const { x, y } = getCoords(e);
                    g.currentX = x;
                    g.currentY = y;

                    const deltaX = g.currentX - g.startX;
                    const deltaY = g.currentY - g.startY;

                    // Lock gesture into active horizontal drag if swiping right
                    if (!g.isDragging && g.isEdgeCandidate) {
                        if (deltaX > 4 && Math.abs(deltaX) > Math.abs(deltaY) * 0.3) {
                            g.isDragging = true;
                            g.isEdgeCandidate = false;

                            const page1 = page1Ref.current;
                            const page2 = page2Ref.current;
                            const overlay = overlayRef.current;

                            if (page1 && page2 && overlay) {
                                page1.classList.remove('smooth-transition');
                                page2.classList.remove('smooth-transition');
                                overlay.classList.remove('smooth-overlay');
                            }
                        } else if (Math.abs(deltaY) > 25 && deltaX < 4) {
                            g.isEdgeCandidate = false;
                        }
                    }

                    if (g.isDragging) {
                        if (e.cancelable) {
                            e.preventDefault();
                        }

                        const dragDelta = Math.max(0, deltaX);
                        const screenWidth = page2Ref.current ? page2Ref.current.offsetWidth : (window.innerWidth || 360);
                        const progress = Math.min(dragDelta / screenWidth, 1);

                        const page1 = page1Ref.current;
                        const page2 = page2Ref.current;
                        const overlay = overlayRef.current;

                        if (page1 && page2 && overlay) {
                            page2.style.transform = `translateX(${dragDelta}px)`;
                            const page1Offset = -25 + (progress * 25);
                            page1.style.transform = `translateX(${page1Offset}%)`;
                            overlay.style.opacity = `${0.4 * (1 - progress)}`;
                        }
                    }
                };

                const handleEnd = () => {
                    const g = gestureRef.current;
                    if (!g.isDragging || isClosingRef.current) {
                        g.isEdgeCandidate = false;
                        g.isDragging = false;
                        return;
                    }

                    g.isDragging = false;
                    g.isEdgeCandidate = false;

                    const screenWidth = page2Ref.current ? page2Ref.current.offsetWidth : (window.innerWidth || 360);
                    const deltaX = g.currentX - g.startX;
                    const elapsed = Math.max(1, Date.now() - g.startTime);
                    const velocityX = deltaX / elapsed;

                    if (deltaX > screenWidth * 0.25 || (deltaX > 40 && velocityX > 0.25)) {
                        closePage('swipe');
                    } else {
                        openPage();
                    }
                };

                window.addEventListener('touchstart', handleStart, { passive: true });
                window.addEventListener('touchmove', handleMove, { passive: false });
                window.addEventListener('touchend', handleEnd, { passive: true });
                window.addEventListener('touchcancel', handleEnd, { passive: true });

                window.addEventListener('pointerdown', handleStart);
                window.addEventListener('pointermove', handleMove);
                window.addEventListener('pointerup', handleEnd);

                return () => {
                    window.removeEventListener('touchstart', handleStart);
                    window.removeEventListener('touchmove', handleMove);
                    window.removeEventListener('touchend', handleEnd);
                    window.removeEventListener('touchcancel', handleEnd);

                    window.removeEventListener('pointerdown', handleStart);
                    window.removeEventListener('pointermove', handleMove);
                    window.removeEventListener('pointerup', handleEnd);
                };
            }, []);

            const handleHeaderBack = () => {
                closePage('button');
            };

            return (
                <div className={`app-viewport fixed inset-0 w-full h-full overflow-hidden bg-[#F4F7FC] dark:bg-slate-950 z-30 ${className}`}>
                    {/* Page 1 (Underlying Page) */}
                    <div 
                        ref={page1Ref}
                        className="page-view z-10 touch-pan-y bg-[#F4F7FC] dark:bg-slate-950 overflow-y-auto overflow-x-clip overscroll-x-none w-full h-full"
                    >
                        <div className="px-4 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] pb-[4.25rem] min-h-full">
                            {underlyingContent}
                        </div>
                    </div>

                    {/* Backdrop Overlay */}
                    <div 
                        ref={overlayRef}
                        className="backdrop-overlay"
                    />

                    {/* Page 2 (Active Subpage) */}
                    <div 
                        ref={page2Ref}
                        className="page-view z-20 touch-pan-y bg-[#F4F7FC] dark:bg-slate-950 w-full h-full overflow-hidden"
                    >
                        {onRefresh ? (
                            <PullToRefresh onRefresh={onRefresh} className="w-full h-full px-4 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] pb-[4.25rem]">
                                {typeof children === 'function' ? children({ onBack: handleHeaderBack }) : children}
                            </PullToRefresh>
                        ) : (
                            <div className="w-full h-full overflow-y-auto overflow-x-clip overscroll-x-none px-4 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] pb-[4.25rem]">
                                {typeof children === 'function' ? children({ onBack: handleHeaderBack }) : children}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        function playHapticTick() {
            // Mute date picker scrolling audio feedback as requested
            return;
        }

        function WheelColumn({ items = [], selectedIndex = 0, onSelectIndex, flexClass = "flex-1", ariaLabel }) {
            const elementRef = useRef(null);
            const containerRef = useRef(null);
            const lastSelectedIndexRef = useRef(-1);
            const scrollTimeoutRef = useRef(null);
            const rafIdRef = useRef(null);
            const isProgrammaticRef = useRef(false);
            const isUserInteractingRef = useRef(false);
            const programTimeoutRef = useRef(null);

            const ITEM_HEIGHT = 44;
            const VISIBLE_HEIGHT = 210;
            const SPACER_HEIGHT = (VISIBLE_HEIGHT - ITEM_HEIGHT) / 2;

            const update3DEffects = useCallback(() => {
                if (!elementRef.current || !containerRef.current) return;
                const scrollTop = elementRef.current.scrollTop;
                const children = containerRef.current.children;
                if (!children) return;

                let closestIndex = Math.round(scrollTop / ITEM_HEIGHT);
                closestIndex = Math.max(0, Math.min(closestIndex, items.length - 1));

                if (closestIndex !== lastSelectedIndexRef.current && isUserInteractingRef.current) {
                    playHapticTick();
                    lastSelectedIndexRef.current = closestIndex;
                }

                for (let i = 0; i < children.length; i++) {
                    const item = children[i];
                    const itemTop = i * ITEM_HEIGHT;
                    const distanceFromCenter = itemTop - scrollTop;
                    const normalizedDist = distanceFromCenter / ITEM_HEIGHT;
                    const absDist = Math.abs(normalizedDist);

                    if (absDist > 3.5) {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.7)';
                    } else {
                        const opacity = Math.max(0.18, 1 - Math.pow(absDist / 2.8, 1.5));
                        const scale = Math.max(0.75, 1 - absDist * 0.08);
                        const rotateX = Math.min(Math.max(normalizedDist * -24, -70), 70);

                        item.style.opacity = opacity.toFixed(2);
                        item.style.transform = `rotateX(${rotateX}deg) scale(${scale.toFixed(3)})`;

                        if (absDist < 0.5) {
                            item.className = 'wheel-item h-[44px] flex items-center justify-center font-bold text-base text-indigo-600 dark:text-blue-400 transition-colors duration-75';
                        } else {
                            item.className = 'wheel-item h-[44px] flex items-center justify-center font-normal text-base text-slate-400 dark:text-slate-400 transition-colors duration-75';
                        }
                    }
                }
            }, [items.length]);

            useEffect(() => {
                if (!elementRef.current) return;
                const safeIdx = Math.max(0, Math.min(selectedIndex, items.length - 1));
                const targetScrollTop = safeIdx * ITEM_HEIGHT;

                if (isUserInteractingRef.current) return;

                isProgrammaticRef.current = true;
                if (programTimeoutRef.current) clearTimeout(programTimeoutRef.current);

                const currentTop = elementRef.current.scrollTop;
                const diff = Math.abs(currentTop - targetScrollTop);

                if (diff > 1) {
                    const startTop = currentTop;
                    const distance = targetScrollTop - startTop;
                    const startTime = performance.now();
                    const duration = 320; // ms

                    const animateScroll = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(1, elapsed / duration);
                        // easeOutCubic
                        const ease = 1 - Math.pow(1 - progress, 3);
                        if (elementRef.current) {
                            elementRef.current.scrollTop = startTop + distance * ease;
                            update3DEffects();
                        }
                        if (progress < 1) {
                            requestAnimationFrame(animateScroll);
                        } else {
                            if (elementRef.current) {
                                elementRef.current.scrollTop = targetScrollTop;
                                update3DEffects();
                            }
                            isProgrammaticRef.current = false;
                        }
                    };
                    requestAnimationFrame(animateScroll);
                } else {
                    elementRef.current.scrollTop = targetScrollTop;
                    update3DEffects();
                    isProgrammaticRef.current = false;
                }

                programTimeoutRef.current = setTimeout(() => {
                    isProgrammaticRef.current = false;
                    if (elementRef.current) update3DEffects();
                }, 350);

                lastSelectedIndexRef.current = safeIdx;

                return () => {
                    if (programTimeoutRef.current) clearTimeout(programTimeoutRef.current);
                };
            }, [selectedIndex, items.length, update3DEffects]);

            const snapAndSelect = () => {
                if (!elementRef.current || isProgrammaticRef.current) return;
                const scrollTop = elementRef.current.scrollTop;
                const targetIndex = Math.max(0, Math.min(Math.round(scrollTop / ITEM_HEIGHT), items.length - 1));
                const targetScrollTop = targetIndex * ITEM_HEIGHT;

                if (Math.abs(elementRef.current.scrollTop - targetScrollTop) > 1) {
                    elementRef.current.scrollTo({
                        top: targetScrollTop,
                        behavior: 'smooth'
                    });
                }
                if (onSelectIndex && targetIndex !== selectedIndex) {
                    onSelectIndex(targetIndex);
                }
            };

            const handleScroll = () => {
                if (!rafIdRef.current) {
                    rafIdRef.current = requestAnimationFrame(() => {
                        update3DEffects();
                        rafIdRef.current = null;
                    });
                }
                if (isProgrammaticRef.current) return;

                clearTimeout(scrollTimeoutRef.current);
                scrollTimeoutRef.current = setTimeout(() => {
                    snapAndSelect();
                }, 80);
            };

            const handleTouchStart = () => {
                isUserInteractingRef.current = true;
                isProgrammaticRef.current = false;
            };

            const handleTouchEnd = () => {
                setTimeout(() => {
                    isUserInteractingRef.current = false;
                }, 300);
            };

            return (
                <div 
                    ref={elementRef}
                    onScroll={handleScroll}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleTouchStart}
                    onMouseUp={handleTouchEnd}
                    className={`${flexClass} h-full overflow-y-scroll no-scrollbar wheel-scroll relative cursor-grab active:cursor-grabbing`}
                    tabIndex={0}
                    aria-label={ariaLabel}
                >
                    <div style={{ height: `${SPACER_HEIGHT}px` }} className="w-full shrink-0" />
                    <div ref={containerRef} className="w-full">
                        {items.map((item, idx) => (
                            <div 
                                key={idx}
                                onClick={() => {
                                    isUserInteractingRef.current = true;
                                    isProgrammaticRef.current = false;
                                    if (elementRef.current) {
                                        elementRef.current.scrollTo({ top: idx * ITEM_HEIGHT, behavior: 'smooth' });
                                    }
                                    if (onSelectIndex) onSelectIndex(idx);
                                }}
                                className="wheel-item h-[44px] flex items-center justify-center font-normal text-base text-slate-400 dark:text-slate-400"
                            >
                                {item.display}
                            </div>
                        ))}
                    </div>
                    <div style={{ height: `${SPACER_HEIGHT}px` }} className="w-full shrink-0" />
                </div>
            );
        }

        function FullJalaliDatePicker({ day = 1, month = 'فروردین', year = 1403, onChange }) {
            const START_YEAR = 1390;
            const END_YEAR = 1420;

            const monthNames = jalaliMonths;
            const years = useMemo(() => {
                const arr = [];
                for (let y = START_YEAR; y <= END_YEAR; y++) arr.push(y);
                return arr;
            }, []);

            // Robust type conversion for year, month, and day
            const numericYear = useMemo(() => {
                if (typeof year === 'number' && !isNaN(year)) return year;
                const clean = toEnglishDigits(String(year || '')).replace(/\D/g, '');
                return parseInt(clean, 10) || getDeviceJalaliDate().year;
            }, [year]);

            const monthStr = useMemo(() => {
                if (typeof month === 'number') {
                    return monthNames[Math.max(0, Math.min(month - 1, 11))] || monthNames[0];
                }
                const str = String(month || '').trim();
                return monthNames.includes(str) ? str : monthNames[0];
            }, [month, monthNames]);

            const numericDay = useMemo(() => {
                if (typeof day === 'number' && !isNaN(day)) return day;
                const clean = toEnglishDigits(String(day || '')).replace(/\D/g, '');
                return parseInt(clean, 10) || 1;
            }, [day]);

            const selectedMonthIdx = Math.max(0, monthNames.indexOf(monthStr));
            const daysInMonth = getJalaliDaysInMonth(selectedMonthIdx + 1, numericYear);

            const dayItems = useMemo(() => {
                return Array.from({ length: daysInMonth }, (_, i) => ({
                    value: i + 1,
                    display: toPersianDigits(i + 1)
                }));
            }, [daysInMonth]);

            const monthItems = useMemo(() => {
                return monthNames.map((mName, i) => ({
                    value: mName,
                    display: `${mName} - ${toPersianDigits(i + 1)}`
                }));
            }, [monthNames]);

            const yearItems = useMemo(() => {
                return years.map(y => ({
                    value: y,
                    display: toPersianDigits(y)
                }));
            }, [years]);

            const selectedDayIdx = Math.max(0, Math.min(numericDay - 1, dayItems.length - 1));
            const foundYearIdx = years.indexOf(numericYear);
            const selectedYearIdx = foundYearIdx !== -1 ? foundYearIdx : Math.max(0, years.indexOf(1403));

            const handleToday = () => {
                playHapticTick();
                const devDate = getDeviceJalaliDate();
                if (onChange) {
                    onChange({ day: devDate.day, month: devDate.month, year: devDate.year });
                }
            };

            return (
                <div className="w-full space-y-3 select-none">
                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-xs">
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">تاریخ انتخاب‌شده:</span>
                            <span className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-blue-400 tracking-tight">
                                {toPersianDigits(numericDay)} {monthStr} {toPersianDigits(numericYear)}
                            </span>
                        </div>
                        <button 
                            type="button" 
                            onClick={handleToday}
                            className="py-1 px-2.5 bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 active:scale-95 transition text-xs font-semibold rounded-xl text-indigo-600 dark:text-slate-200 border border-indigo-200 dark:border-slate-700/50 flex items-center space-x-1 space-x-reverse shrink-0 cursor-pointer"
                        >
                            <Icon name="clock" className="w-3.5 h-3.5 text-indigo-500 dark:text-blue-400" />
                            <span>امروز</span>
                        </button>
                    </div>

                    <div className="relative w-full h-[210px] bg-[#F4F7FC]/70 dark:bg-slate-950/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/50 flex shadow-inner">
                        <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-[44px] bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur-md rounded-xl pointer-events-none border border-slate-300/60 dark:border-slate-700/50 shadow-xs z-10" />

                        <div className="relative w-full h-full wheel-mask flex z-20" dir="ltr">
                            <WheelColumn 
                                items={yearItems}
                                selectedIndex={selectedYearIdx}
                                onSelectIndex={(idx) => {
                                    const newYear = years[idx];
                                    if (newYear !== numericYear && onChange) {
                                        onChange({ day: numericDay, month: monthStr, year: newYear });
                                    }
                                }}
                                flexClass="flex-1"
                                ariaLabel="انتخاب سال"
                            />

                            <WheelColumn 
                                items={monthItems}
                                selectedIndex={selectedMonthIdx}
                                onSelectIndex={(idx) => {
                                    const newMonth = monthNames[idx];
                                    if (newMonth !== monthStr && onChange) {
                                        onChange({ day: numericDay, month: newMonth, year: numericYear });
                                    }
                                }}
                                flexClass="flex-[1.3]"
                                ariaLabel="انتخاب ماه"
                            />

                            <WheelColumn 
                                items={dayItems}
                                selectedIndex={selectedDayIdx}
                                onSelectIndex={(idx) => {
                                    const newDay = dayItems[idx].value;
                                    if (newDay !== numericDay && onChange) {
                                        onChange({ day: newDay, month: monthStr, year: numericYear });
                                    }
                                }}
                                flexClass="flex-1"
                                ariaLabel="انتخاب روز"
                            />
                        </div>
                    </div>
                </div>
            );
        }

        function IOSWheelPicker({ items = [], selectedValue, onChange, label }) {
            const formattedItems = useMemo(() => {
                return items.map(it => ({
                    value: it,
                    display: typeof it === 'number' ? toPersianDigits(it) : String(it)
                }));
            }, [items]);

            const selectedIndex = Math.max(0, items.indexOf(selectedValue));

            return (
                <div className="flex flex-col items-center flex-1 min-w-0 select-none">
                    {label && <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">{label}</span>}
                    <div className="relative w-full h-[180px] bg-[#F4F7FC]/70 dark:bg-slate-950/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/50 flex">
                        <div className="absolute left-1 right-1 top-1/2 -translate-y-1/2 h-[44px] bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur-md rounded-xl pointer-events-none border border-slate-300/60 dark:border-slate-700/50 z-10" />
                        <div className="relative w-full h-full wheel-mask flex z-20">
                            <WheelColumn 
                                items={formattedItems}
                                selectedIndex={selectedIndex}
                                onSelectIndex={(idx) => {
                                    if (onChange && items[idx] !== undefined) onChange(items[idx]);
                                }}
                                flexClass="flex-1"
                                ariaLabel={label || "wheel"}
                            />
                        </div>
                    </div>
                </div>
            );
        }

        function GlobalConfirmDialog({
            isOpen,
            title,
            message,
            details = [],
            iconName = "trash-2",
            iconBgColor = "bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400",
            confirmLabel = "حذف",
            cancelLabel = "انصراف",
            isDestructive = true,
            onConfirm = () => {},
            onCancel = () => {},
            allowBackdropClose = true
        }) {
            return (
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            key="global-confirm-backdrop"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={(e) => {
                                if (e.target === e.currentTarget && allowBackdropClose) {
                                    onCancel();
                                }
                            }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
                        >
                            <motion.div 
                                key="global-confirm-modal"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl w-full max-w-xs sm:max-w-sm rounded-[28px] p-5 space-y-4 text-center shadow-2xl border border-slate-100 dark:border-slate-700/80"
                            >
                                <div className={`w-14 h-14 rounded-full ${iconBgColor} mx-auto flex items-center justify-center shadow-sm active:scale-95 transition-transform duration-200`}>
                                    <Icon name={iconName} className="w-7 h-7" />
                                </div>
                                
                                <div className="space-y-1.5">
                                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                        {message}
                                    </p>

                                    {details && details.length > 0 && (
                                        <div className="mt-3 p-3 bg-[#F4F7FC] dark:bg-slate-900/80 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-right space-y-1.5 text-xs">
                                            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 block mb-1">موارد در حال حذف:</span>
                                            {details.map((item, idx) => (
                                                <div key={idx} className="flex items-center space-x-2 space-x-reverse text-slate-700 dark:text-slate-300 font-bold">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex space-x-2.5 space-x-reverse pt-2">
                                    <button 
                                        onClick={onConfirm}
                                        className={`flex-1 font-extrabold py-3 rounded-2xl text-xs shadow-md active:scale-[0.95] transition-all duration-150 ${
                                            isDestructive 
                                                ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/20' 
                                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                                        }`}>
                                        {confirmLabel}
                                    </button>
                                    <button 
                                        onClick={onCancel}
                                        className="flex-1 bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-3 rounded-2xl text-xs active:scale-[0.95] transition-all duration-150">
                                        {cancelLabel}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            );
        }

        function SwipeToDeleteItem({
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
                    : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
                
                cardEl.style.transition = dragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                cardEl.style.transform = `translate3d(${-currentOffset}px, 0, 0)`;

                btnEl.style.transition = transitionStr;
                btnEl.style.width = `${btnWidthPx}px`;
                btnEl.style.height = '52px';
                btnEl.style.borderRadius = `${borderRadiusPx}px`;
                btnEl.style.opacity = `${btnOpacity}`;
                btnEl.style.transform = `translate3d(0, -50%, 0) scale(${btnScale})`;
                
                if (currentOffset > 2) {
                    btnEl.style.visibility = 'visible';
                } else if (!dragging) {
                    btnEl.style.visibility = 'visible';
                    setTimeout(() => {
                        if (offsetRef.current === 0 && btnRef.current) {
                            btnRef.current.style.visibility = 'hidden';
                        }
                    }, 300);
                } else {
                    btnEl.style.visibility = 'hidden';
                }
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
                window.addEventListener('pointerdown', handleGlobalClick, { capture: true });
                window.addEventListener('touchstart', handleGlobalClick, { capture: true, passive: true });
                window.addEventListener('mousedown', handleGlobalClick, { capture: true });
                return () => {
                    window.removeEventListener('pointerdown', handleGlobalClick, { capture: true });
                    window.removeEventListener('touchstart', handleGlobalClick, { capture: true });
                    window.removeEventListener('mousedown', handleGlobalClick, { capture: true });
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
                    if (e.stopPropagation) e.stopPropagation();
                    
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
                        if (e.stopPropagation) e.stopPropagation();
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

                cardEl.addEventListener('touchstart', handleStart, { passive: false });
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
                    data-swipe-item="true" style={{ touchAction: 'pan-y' }}
                    className={`relative transition-[max-height,opacity,transform] duration-300 ${
                        isDeleting 
                            ? 'max-h-0 opacity-0 my-0 py-0 scale-95 pointer-events-none overflow-hidden' 
                            : 'max-h-[500px] opacity-100 my-0.5 swipe-container-safe'
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
                        data-swipe-item="true" style={{ touchAction: 'pan-y' }}
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

        function getInstallmentNumberForTx(tx, repaymentTxs, totalCount, index) {
            if (!tx) return 1;
            if (tx.installmentNum) return tx.installmentNum;
            if (tx.title) {
                const match = tx.title.match(/قسط\s*(?:شماره\s*)?(\d+)/);
                if (match && match[1]) {
                    return parseInt(match[1], 10);
                }
            }
            if (totalCount !== undefined && index !== undefined) {
                return totalCount - index;
            }
            if (Array.isArray(repaymentTxs) && repaymentTxs.length > 0) {
                const idx = repaymentTxs.findIndex(t => t.id === tx.id);
                if (idx !== -1) {
                    return repaymentTxs.length - idx;
                }
            }
            return 1;
        }

        function ActiveArchiveSegmentedControl({ 
            activeLabel, 
            activeCount = 0, 
            archiveCount = 0, 
            currentFilter, 
            onChange, 
            colorTheme = 'indigo' 
        }) {
            const themeConfig = {
                indigo: {
                    activeTextColor: 'text-indigo-600 dark:text-indigo-400',
                    underlineBg: 'bg-indigo-600 dark:bg-indigo-400'
                },
                blue: {
                    activeTextColor: 'text-indigo-600 dark:text-indigo-400',
                    underlineBg: 'bg-indigo-600 dark:bg-indigo-400'
                },
                rose: {
                    activeTextColor: 'text-rose-600 dark:text-rose-400',
                    underlineBg: 'bg-rose-600 dark:bg-rose-400'
                },
                emerald: {
                    activeTextColor: 'text-emerald-600 dark:text-emerald-400',
                    underlineBg: 'bg-emerald-600 dark:bg-emerald-400'
                }
            }[colorTheme] || {
                activeTextColor: 'text-indigo-600 dark:text-indigo-400',
                underlineBg: 'bg-indigo-600 dark:bg-indigo-400'
            };

            const isRightActive = currentFilter === 'active';
            const isLeftActive = currentFilter === 'archived';

            return (
                <div className="w-full relative mt-2 mb-3 select-none">
                    {/* Full width bottom track baseline */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-slate-200/80 dark:bg-slate-700/60" />

                    {/* The 2 Filter Options */}
                    <div className="grid grid-cols-2 w-full relative z-10 pb-2">
                        {/* RIGHT SIDE: Active Records (1st column in RTL) */}
                        <button
                            type="button"
                            onClick={() => onChange('active')}
                            className={`py-1 px-2 text-center text-xs transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                                isRightActive
                                    ? `font-extrabold ${themeConfig.activeTextColor}`
                                    : 'font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                            }`}
                        >
                            <span>{activeLabel}</span>
                            <span className="dir-ltr text-[11px] font-bold">
                                ({toPersianDigits(activeCount)})
                            </span>
                        </button>

                        {/* LEFT SIDE: Archive (2nd column in RTL) */}
                        <button
                            type="button"
                            onClick={() => onChange('archived')}
                            className={`py-1 px-2 text-center text-xs transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                                isLeftActive
                                    ? `font-extrabold ${themeConfig.activeTextColor}`
                                    : 'font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                            }`}
                        >
                            <span>بایگانی</span>
                            <span className="dir-ltr text-[11px] font-bold">
                                ({toPersianDigits(archiveCount)})
                            </span>
                        </button>
                    </div>

                    {/* Animated Underline */}
                    <div
                        className={`absolute bottom-0 h-[2.5px] rounded-full transition-all duration-200 ease-out z-20 ${themeConfig.underlineBg}`}
                        style={{
                            width: '50%',
                            right: isRightActive ? '0%' : '50%'
                        }}
                    />
                </div>
            );
        }

        function SwipeableTxCard({ tx, index, totalCount, onEdit, onDelete, colorType = 'indigo', contactName, contacts = [], loans = [], isHighlighted = false, hasShadow = true }) {
            const isRepay = tx.type === 'repayment' || tx.type === 'debt_repayment' || tx.type === 'demand_repayment';

            const { line1, line2, line3 } = (() => {
                let rawContactName = contactName || tx.contactName || (tx.contact ? `${tx.contact.firstName || ''} ${tx.contact.lastName || ''}`.trim() : (tx.firstName ? `${tx.firstName || ''} ${tx.lastName || ''}`.trim() : ''));
                if (!rawContactName && tx.contactId && Array.isArray(contacts) && contacts.length > 0) {
                    const foundContact = contacts.find(c => c.id === tx.contactId);
                    if (foundContact) rawContactName = `${foundContact.firstName || ''} ${foundContact.lastName || ''}`.trim();
                }

                let l1 = '';
                let l2 = '';
                let l3 = tx.notes && tx.notes.trim() ? tx.notes.trim() : (tx.description && tx.description.trim() ? tx.description.trim() : (tx.type === 'repayment' ? 'پرداخت مستقیم قسط وام' : 'توضیحات ثبت نشده'));

                if (tx.type === 'repayment') {
                    // Look up matching loan object
                    let targetLoan = tx.loan || (tx.loanId && Array.isArray(loans) && loans.length > 0 ? loans.find(l => Number(l.id) === Number(tx.loanId)) : null);
                    if (!targetLoan && tx.loanId && typeof loans !== 'undefined' && Array.isArray(loans)) {
                        targetLoan = loans.find(l => Number(l.id) === Number(tx.loanId));
                    }

                    // Get exact loan title from the loans section
                    let loanName = targetLoan ? targetLoan.title : (tx.loanTitle || (tx.loan ? tx.loan.title : ''));
                    if (!loanName && tx.title) {
                        if (tx.title.includes('-')) {
                            const parts = tx.title.split('-');
                            loanName = parts[parts.length - 1].trim();
                        } else if (tx.title.includes('وام')) {
                            loanName = tx.title.substring(tx.title.indexOf('وام')).trim();
                        } else {
                            loanName = tx.title.replace(/^پرداخت\s*قسط\s*(?:شماره\s*\d+\s*)?[-–—]?\s*/, '').trim();
                        }
                    }
                    if (!loanName) loanName = 'وام';

                    // Determine installment number
                    let instNum = tx.installmentNum;
                    if (!instNum && tx.title) {
                        const match = tx.title.match(/قسط\s*(?:شماره\s*)?(\d+)/);
                        if (match && match[1]) {
                            instNum = parseInt(match[1], 10);
                        }
                    }
                    if (!instNum && targetLoan && typeof transactions !== 'undefined' && Array.isArray(transactions)) {
                        const loanRepayments = transactions.filter(t => Number(t.loanId) === Number(targetLoan.id) && t.type === 'repayment').sort((a, b) => (a.id || 0) - (b.id || 0));
                        const idxInLoan = loanRepayments.findIndex(t => t.id === tx.id);
                        if (idxInLoan !== -1) {
                            instNum = idxInLoan + 1;
                        }
                    }
                    if (!instNum && totalCount !== undefined && index !== undefined) {
                        instNum = totalCount - index;
                    }

                    l1 = instNum ? `پرداخت قسط شماره ${instNum} - ${loanName}` : `پرداخت قسط - ${loanName}`;

                    let contactInfo = rawContactName.trim();
                    if (!contactInfo && targetLoan) {
                        if (targetLoan.lender) contactInfo = targetLoan.lender;
                        else if (targetLoan.contactId && Array.isArray(contacts)) {
                            const foundC = contacts.find(c => c.id === targetLoan.contactId);
                            if (foundC) contactInfo = `${foundC.firstName || ''} ${foundC.lastName || ''}`.trim();
                        }
                    }
                    l2 = contactInfo ? contactInfo : `اقساط ${loanName}`;
                } else if (tx.type === 'demand') {
                    l1 = tx.title || 'ثبت طلب جدید';
                    l2 = rawContactName.trim();
                } else if (tx.type === 'demand_repayment') {
                    l1 = tx.title || 'بازپرداخت طلب';
                    l2 = rawContactName.trim();
                } else if (tx.type === 'debt') {
                    l1 = tx.title || 'ثبت بدهی جدید';
                    l2 = rawContactName.trim();
                } else if (tx.type === 'debt_repayment') {
                    l1 = tx.title || 'بازپرداخت بدهی';
                    l2 = rawContactName.trim();
                } else if (tx.type === 'income') {
                    l1 = tx.title || 'درآمد';
                    l2 = rawContactName.trim() || tx.category || 'درآمد عمومی';
                } else if (tx.type === 'expense') {
                    l1 = tx.title || 'هزینه';
                    l2 = rawContactName.trim() || tx.category || 'هزینه عمومی';
                } else {
                    l1 = tx.title || 'تراکنش';
                    l2 = rawContactName.trim() || (tx.category ? tx.category : '');
                }

                return { line1: l1, line2: l2, line3: l3 };
            })();

            const isRedAmount = tx.isPositive !== undefined ? !tx.isPositive : (tx.type === 'debt' || tx.type === 'demand_repayment' || tx.type === 'expense' || (colorType === 'rose' && tx.type !== 'debt_repayment' && tx.type !== 'repayment' && tx.type !== 'income'));

            return (
                <SwipeToDeleteItem
                    onDelete={(confirmCb) => onDelete && onDelete(tx, confirmCb)}
                    onCardClick={() => onEdit && onEdit(tx)}
                >
                    <div 
                        id={`tx-card-${tx.id}`}
                        className={`${
                            hasShadow 
                                ? 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-sm hover:shadow-md' 
                                : 'bg-[#F8FAFC] dark:bg-slate-700/40 border-slate-100/90 dark:border-slate-700/50 hover:bg-slate-100/80 dark:hover:bg-slate-700/70'
                        } rounded-2xl border pl-4 pr-3.5 sm:pl-5 sm:pr-4 py-3 transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[72px] h-auto ${
                            isHighlighted ? 'tx-highlight-blink ring-2 ring-indigo-500 shadow-lg' : ''
                        }`}
                    >
                        <div className="flex items-center space-x-3 space-x-reverse min-w-0 flex-1">
                            <div className={`w-12 h-12 rounded-2xl font-bold text-lg ${ isRedAmount ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-500 dark:text-rose-400' : isRepay ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' : colorType === 'rose' ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-500 dark:text-rose-400' : colorType === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 dark:text-emerald-400' : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'} flex items-center justify-center shrink-0`}>
                                {totalCount ? (totalCount - index) : <Icon name={tx.type === 'demand_repayment' ? "arrow-down-left" : isRepay ? "check-circle-2" : (isRedAmount ? "arrow-up-right" : "arrow-down-left")} className="w-6 h-6" />}
                            </div>
                            <div className="min-w-0 flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">
                                <h3 className="text-sm font-extrabold text-slate-800 dark:text-white leading-snug break-words whitespace-normal">{line1}</h3>
                                {line2 && (
                                    <div className="text-xs font-bold text-slate-600 dark:text-slate-300 break-words whitespace-normal leading-snug">
                                        {line2}
                                    </div>
                                )}
                                <p className="text-xs text-slate-500 dark:text-slate-400 break-words whitespace-normal leading-relaxed mt-0.5">
                                    {line3}
                                </p>
                            </div>
                        </div>

                        <div className="text-center shrink-0 flex flex-col items-center justify-center min-w-[76px] sm:min-w-[90px] pl-1">
                            <div className={`font-bold text-[15px] leading-tight text-center ${isRedAmount ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                {Math.abs(tx.amount).toLocaleString()}
                            </div>
                            <div className={`text-xs font-semibold text-center w-full mt-0.5 ${isRedAmount ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>تومان</div>
                            {(() => {
                                const rawDate = tx.dateStr || tx.date || tx.receiveDate || tx.startDate || tx.createdAt || '';
                                const numericDate = formatDateToNumericJalali(rawDate);
                                if (!numericDate || numericDate === '-') return null;
                                return (
                                    <div className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 font-mono mt-1 text-center whitespace-nowrap">
                                        {numericDate}
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                </SwipeToDeleteItem>
            );
        }

        function StackCardItem({ 
            card, 
            index, 
            currentCardIdx, 
            animatingCard, 
            animatingPrevCard, 
            handlePrevCard, 
            handleNextCard, 
            totalCards, 
            showStackWizard,
            shakeCardId 
        }) {
            const cardRef = useRef(null);
            const depth = index - currentCardIdx;
            
            const isExitingNextCard = animatingCard && index === currentCardIdx - 1;
            const isReturningPrevCard = animatingPrevCard && index === currentCardIdx;
            const isShaking = shakeCardId === card.id;

            // Focus input smoothly and immediately when changing card step or opening stack wizard
            useEffect(() => {
                if (depth === 0 && showStackWizard && cardRef.current) {
                    const focusActiveInput = () => {
                        if (!cardRef.current) return;
                        const targetInput = cardRef.current.querySelector('input[autofocus]') ||
                                            cardRef.current.querySelector('input:not([type="hidden"]):not([type="radio"]):not([type="checkbox"]):not([readonly]), textarea:not([readonly])');
                        if (targetInput) {
                            try {
                                targetInput.focus({ preventScroll: false });
                                if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                                    targetInput.click();
                                }
                            } catch (e) {}
                        }
                    };

                    focusActiveInput();
                    const r1 = requestAnimationFrame(focusActiveInput);
                    const t1 = setTimeout(focusActiveInput, 30);
                    const t2 = setTimeout(focusActiveInput, 120);

                    return () => {
                        cancelAnimationFrame(r1);
                        clearTimeout(t1);
                        clearTimeout(t2);
                    };
                }
            }, [depth, currentCardIdx, showStackWizard]);

            if (depth < 0 && !isExitingNextCard) return null;

            let depthAttr = 'hidden';
            if (isReturningPrevCard || isExitingNextCard || depth === 0) depthAttr = '0';
            else if (depth === 1) depthAttr = '1';
            else if (depth === 2) depthAttr = '2';

            const isExitNext = isExitingNextCard;
            const isEnterPrev = isReturningPrevCard;

            const isFirstCard = currentCardIdx === 0;

            return (
                <div 
                    ref={cardRef}
                    key={card.id}
                    data-depth={depthAttr}
                    className={`stack-card bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  flex flex-col justify-between ${
                        depth !== 0 && !isReturningPrevCard && !isExitingNextCard ? 'pointer-events-none select-none' : ''
                    } ${
                        isShaking ? 'animate-shake' : ''
                    } ${
                        isExitNext ? 'animating-next' : ''
                    } ${
                        isEnterPrev ? 'animating-prev' : ''
                    }`}
                >
                    <div 
                        className="flex-1 py-2 overflow-y-auto overflow-x-clip overscroll-x-none hide-scrollbar touch-pan-y"
                        onClick={(e) => {
                            if (e.target.closest('input, textarea, select, button, label, a')) return;
                            if (cardRef.current) {
                                const targetInput = cardRef.current.querySelector('input:not([type="hidden"]):not([type="radio"]):not([type="checkbox"]):not([readonly]), textarea:not([readonly])');
                                if (targetInput && e.target !== targetInput) {
                                    try { targetInput.focus(); } catch (err) {}
                                }
                            }
                        }}
                    >
                        {card.render()}
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center space-x-2 space-x-reverse h-12">
                        <button 
                            type="button"
                            onClick={!isFirstCard ? handlePrevCard : undefined}
                            disabled={isFirstCard}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1 space-x-reverse ${
                                isFirstCard
                                    ? 'bg-slate-100 dark:bg-slate-800/60 text-slate-300 dark:text-slate-600 border border-slate-200/50 dark:border-slate-700/50 cursor-not-allowed opacity-40 pointer-events-none'
                                    : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 cursor-pointer opacity-100 active:scale-95 shadow-2xs'
                            }`}
                        >
                            <Icon name="arrow-right" className="w-3.5 h-3.5 shrink-0" />
                            <span>مرحله قبلی</span>
                        </button>

                        <button 
                            type="button"
                            onClick={handleNextCard}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1 space-x-reverse"
                        >
                            <span>{index === totalCards - 1 ? 'ثبت و ذخیره نهایی' : 'مرحله بعدی'}</span>
                        </button>
                    </div>
                </div>
            );
        }

        function ContactSelectorCard({ contacts = [], selectedContactId, onSelect = () => {}, wizardType, wizardMode, error }) {
            const [searchQuery, setSearchQuery] = useState('');
            const [isExpanded, setIsExpanded] = useState(!selectedContactId);

            React.useEffect(() => {
                if (selectedContactId) {
                    setIsExpanded(false);
                } else {
                    setIsExpanded(true);
                }
            }, [selectedContactId]);

            const selectedC = contacts.find(c => c.id === Number(selectedContactId));

            const searchQ = searchQuery.toLowerCase();
            let filteredContacts = contacts;
            if (wizardType === 'demand_repayment' && wizardMode === 'add') {
                filteredContacts = contacts.filter(c => (c.totalDemand || 0) > 0);
            } else if (wizardType === 'debt_repayment' && wizardMode === 'add') {
                filteredContacts = contacts.filter(c => (c.totalDebt || 0) > 0);
            }

            const filtered = filteredContacts.filter(c => 
                `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchQ) || 
                (c.phone && c.phone.includes(searchQ))
            );

            if (selectedC && !isExpanded) {
                return (
                    <div className="space-y-3">
                        <label className="block text-xs text-slate-600 dark:text-slate-300 font-bold">
                            مخاطب انتخاب‌شده:
                        </label>
                        <div className="bg-indigo-50/90 dark:bg-indigo-950/70 border-2 border-indigo-500 rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
                            <div className="flex items-center space-x-3 space-x-reverse">
                                <div className={`w-10 h-10 rounded-full ${getAvatarColor(selectedC.id, selectedC.firstName + selectedC.lastName)} text-white font-bold text-sm flex items-center justify-center shadow-xs`}>
                                    {selectedC.firstName.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-indigo-950 dark:text-indigo-100">
                                        {selectedC.firstName} {selectedC.lastName}
                                    </div>
                                    <div className="text-[10px] text-indigo-600 dark:text-indigo-300 font-mono">
                                        {selectedC.phone || 'بدون شماره تماس'}
                                    </div>
                                </div>
                            </div>
                            <button 
                                type="button"
                                onClick={() => setIsExpanded(true)}
                                className="text-xs font-bold text-indigo-600 dark:text-indigo-300 bg-white dark:bg-indigo-900/80 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-700 shadow-2xs hover:bg-indigo-100 active:scale-95 transition-all">
                                تغییر مخاطب
                            </button>
                        </div>
                    </div>
                );
            }

            return (
                <div className="space-y-3">
                    <label className="block text-xs text-slate-600 dark:text-slate-300 font-bold">
                        مخاطب خود را انتخاب کنید:
                    </label>
                    
                    <div className="relative">
                        <Icon name="search" className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                        <input 
                            type="text"
                            placeholder="جستجوی مخاطب (نام یا شماره تلفن)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl py-2.5 pr-9 pl-3 text-xs focus:outline-none focus:ring-2 ${
                                error ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'
                            }`}
                        />
                    </div>

                    <div className={`max-h-52 overflow-y-auto overflow-x-clip overscroll-x-none space-y-1.5 hide-scrollbar p-1 rounded-2xl border transition-all ${
                        error ? 'border-rose-500/80 bg-rose-50/10 dark:bg-rose-950/10' : 'border-transparent'
                    }`}>
                        {filtered.length > 0 ? (
                            filtered.map(c => {
                                const isSelected = Number(selectedContactId) === c.id;
                                return (
                                    <div 
                                        key={c.id}
                                        onClick={() => {
                                            onSelect(c);
                                            setIsExpanded(false);
                                        }}
                                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                                            isSelected 
                                                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 dark:border-indigo-600 font-bold text-indigo-700 dark:text-indigo-300' 
                                                : 'bg-[#F4F7FC] dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                                        }`}>
                                        <div className="flex items-center space-x-2.5 space-x-reverse">
                                            <div className={`w-8 h-8 rounded-full ${getAvatarColor(c.id, c.firstName + c.lastName)} text-white font-bold text-xs flex items-center justify-center`}>
                                                {c.firstName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-xs">{c.firstName} {c.lastName}</div>
                                                <div className="text-[10px] text-slate-400">{c.phone}</div>
                                            </div>
                                        </div>
                                        {isSelected && <Icon name="check-circle-2" className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-6 text-xs text-slate-400">
                                مخاطبی جهت انتخاب یافت نشد.
                            </div>
                        )}
                    </div>
                    {error && (
                        <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">
                            <Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />
                            <span>{error}</span>
                        </p>
                    )}
                </div>
            );
        }

        function LoanSelectorCard({ loans = [], transactions = [], contacts = [], selectedLoanId, editingTxId, wizardMode, onSelectLoan = () => {}, error }) {
            const [searchQuery, setSearchQuery] = useState('');
            const [isExpanded, setIsExpanded] = useState(!selectedLoanId);

            React.useEffect(() => {
                if (selectedLoanId) {
                    setIsExpanded(false);
                } else {
                    setIsExpanded(true);
                }
            }, [selectedLoanId]);

            const activeLoans = loans.filter(l => {
                const paid = transactions.filter(t => t.loanId === l.id && t.type === 'repayment').reduce((s, t) => s + Math.abs(t.amount || 0), 0);
                const total = (l.totalRepayment > 0) ? l.totalRepayment : l.principalAmount;
                const remaining = total - paid;
                return remaining > 0;
            });

            const searchQ = searchQuery.toLowerCase();
            const filtered = activeLoans.filter(l => {
                const contact = contacts.find(c => c.id === l.contactId);
                const cName = contact ? `${contact.firstName} ${contact.lastName}` : (l.contactName || '');
                return l.title.toLowerCase().includes(searchQ) || cName.toLowerCase().includes(searchQ);
            });

            const selectedLoanObj = loans.find(l => l.id === Number(selectedLoanId));

            const handleSelect = (l) => {
                onSelectLoan(l);
                setIsExpanded(false);
            };

            if (selectedLoanObj) {
                const repaymentTxs = transactions.filter(t => t.loanId === selectedLoanObj.id && t.type === 'repayment');
                const paidInstCount = repaymentTxs.length;
                const nextInstNum = paidInstCount + 1;
                const totalInst = selectedLoanObj.totalInstallments || (selectedLoanObj.installmentAmount > 0 ? Math.ceil(selectedLoanObj.totalRepayment / selectedLoanObj.installmentAmount) : 12);
                const contact = contacts.find(c => c.id === selectedLoanObj.contactId);
                const contactName = contact ? `${contact.firstName} ${contact.lastName}` : (selectedLoanObj.contactName || 'بانک/سازمان');
                const nextDueDate = getInstallmentNextDueDate(selectedLoanObj, transactions);
                const jalaliMonthsList = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
                let monthNum = 1;
                if (nextDueDate) {
                    if (typeof nextDueDate.month === 'number') {
                        monthNum = nextDueDate.month;
                    } else if (typeof nextDueDate.month === 'string') {
                        const idx = jalaliMonthsList.indexOf(nextDueDate.month.trim());
                        if (idx !== -1) {
                            monthNum = idx + 1;
                        } else if (!isNaN(parseInt(nextDueDate.month, 10))) {
                            monthNum = parseInt(nextDueDate.month, 10);
                        }
                    }
                }
                const nextDueDateFormatted = nextDueDate ? `${nextDueDate.year}/${String(monthNum).padStart(2, '0')}/${String(nextDueDate.day).padStart(2, '0')}` : '-';
                const instAmountFormatted = Number(selectedLoanObj.installmentAmount || 0).toLocaleString();

                const editingTx = editingTxId ? transactions.find(t => t.id === editingTxId) : null;
                const isEditingMode = wizardMode === 'edit' || !!editingTx;

                let displayInstNum = nextInstNum;
                let displayDateStr = nextDueDateFormatted;
                let displayAmount = instAmountFormatted;

                if (isEditingMode && editingTx) {
                    displayInstNum = getInstallmentNumberForTx(editingTx, repaymentTxs);
                    displayDateStr = formatDateToNumericJalali(editingTx.dateStr) || editingTx.dateStr;
                    displayAmount = Number(editingTx.amount || 0).toLocaleString();
                }

                return (
                    <div className="space-y-3">
                        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white rounded-2xl p-4 shadow-lg border border-indigo-500/30 space-y-3.5">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="text-[11px] text-indigo-200 font-bold flex items-center space-x-1 space-x-reverse">
                                        <Icon name="landmark" className="w-4 h-4 text-indigo-300" />
                                        <span>{isEditingMode ? 'ویرایش قسط پرونده:' : 'پرونده وام انتخاب‌شده:'}</span>
                                    </div>
                                    <div className="text-sm font-extrabold text-white">
                                        {selectedLoanObj.title}
                                    </div>
                                    <div className="text-xs text-indigo-100 font-medium">
                                        طرف حساب: {contactName}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl px-4 py-3 shadow-inner text-white dir-rtl shrink-0 min-w-[100px]">
                                    <span className="text-[10px] text-indigo-100 font-bold">{isEditingMode ? 'ویرایش قسط' : 'قسط شماره'}</span>
                                    <span className="text-3xl font-black tracking-tight leading-none my-1 text-white">{displayInstNum}</span>
                                    <span className="text-[11px] text-indigo-200 font-bold">از {totalInst}</span>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-indigo-400/30 space-y-2 dir-rtl">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-indigo-200 font-medium">{isEditingMode ? 'تاریخ ثبت‌شده این قسط:' : 'تاریخ پرداخت این قسط:'}</span>
                                    <span className="text-sm font-extrabold text-white bg-white/15 px-3 py-1 rounded-xl border border-white/20 font-mono tracking-wider whitespace-nowrap" dir="ltr">
                                        {displayDateStr}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-indigo-200 font-medium">مبلغ قسط:</span>
                                    <span className="text-base font-black text-amber-300">
                                        {displayAmount} تومان
                                    </span>
                                </div>
                            </div>
                        </div>

                        {isExpanded ? (
                            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">انتخاب وام دیگر:</span>
                                    <button 
                                        type="button"
                                        onClick={() => setIsExpanded(false)}
                                        className="text-[11px] font-bold text-slate-500 hover:underline">
                                        بستن منو
                                    </button>
                                </div>
                                <div className="relative">
                                    <Icon name="search" className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                                    <input 
                                        type="text"
                                        placeholder="جستجوی عنوان وام یا مخاطب..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pr-9 pl-3 text-xs focus:outline-none"
                                    />
                                </div>
                                <div className="max-h-44 overflow-y-auto overflow-x-clip overscroll-x-none space-y-1.5 hide-scrollbar p-1">
                                    {filtered.length > 0 ? (
                                        filtered.map(l => (
                                            <div 
                                                key={l.id}
                                                onClick={() => handleSelect(l)}
                                                className="p-2.5 rounded-xl border bg-[#F4F7FC] dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 flex justify-between items-center cursor-pointer hover:border-indigo-400">
                                                <div>
                                                    <div className="text-xs font-bold text-slate-900 dark:text-white">{l.title}</div>
                                                    <div className="text-[10px] text-slate-400">{l.installmentAmount ? l.installmentAmount.toLocaleString() : 0} تومان در ماه</div>
                                                </div>
                                                <Icon name="chevron-left" className="w-4 h-4 text-slate-400" />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4 text-xs text-slate-400">وام فعالی یافت نشد</div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <button 
                                type="button"
                                onClick={() => setIsExpanded(true)}
                                className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 space-x-reverse">
                                <Icon name="repeat" className="w-3.5 h-3.5 text-indigo-600" />
                                <span>تغییر وام انتخاب‌شده</span>
                            </button>
                        )}
                    </div>
                );
            }

            return (
                <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        یک وام فعال جهت پرداخت قسط انتخاب کنید:
                    </label>
                    <div className="relative">
                        <Icon name="search" className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
                        <input 
                            type="text"
                            placeholder="جستجوی عنوان وام یا نام مخاطب..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pr-9 pl-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className={`max-h-52 overflow-y-auto overflow-x-clip overscroll-x-none space-y-1.5 hide-scrollbar p-1 rounded-2xl border transition-all ${
                        error ? 'border-rose-500/80 bg-rose-50/10 dark:bg-rose-950/10' : 'border-transparent'
                    }`}>
                        {filtered.length > 0 ? (
                            filtered.map(l => {
                                const contact = contacts.find(c => c.id === l.contactId);
                                const cName = contact ? `${contact.firstName} ${contact.lastName}` : (l.contactName || 'بانک/سازمان');
                                return (
                                    <div 
                                        key={l.id}
                                        onClick={() => handleSelect(l)}
                                        className="p-3 rounded-2xl border bg-[#F4F7FC] dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-all shadow-2xs">
                                        <div className="flex items-center space-x-3 space-x-reverse">
                                            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs">
                                                <Icon name="landmark" className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-slate-900 dark:text-white">{l.title}</div>
                                                <div className="text-[10px] text-slate-400">{cName}</div>
                                            </div>
                                        </div>
                                        <div className="text-left ltr">
                                            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{l.installmentAmount ? l.installmentAmount.toLocaleString() : '-'} تومان</div>
                                            <div className="text-[9px] text-slate-400">مبلغ قسط</div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-6 text-xs text-slate-400">
                                هیچ وام فعالی جهت پرداخت قسط یافت نشد.
                            </div>
                        )}
                    </div>
                    {error && (
                        <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">
                            <Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />
                            <span>{error}</span>
                        </p>
                    )}
                </div>
            );
        }

        // Brand Avatar Component with Multi-Fallback Strategy
        const BrandAvatar = ({ className = "w-10 h-10", logoUrl }) => {
            const [srcIndex, setSrcIndex] = useState(0);
            const sources = useMemo(() => {
                const list = [];
                if (logoUrl) {
                    list.push(logoUrl);
                    if (!logoUrl.startsWith('/')) list.push(`/${logoUrl}`);
                    if (!logoUrl.startsWith('./')) list.push(`./${logoUrl}`);
                }
                list.push(
                    './apple-touch-icon.png',
                    '/apple-touch-icon.png',
                    'apple-touch-icon.png',
                    './public/apple-touch-icon.png',
                    '/public/apple-touch-icon.png',
                    './favicon-96x96.png',
                    '/favicon-96x96.png',
                    'favicon-96x96.png',
                    './web-app-manifest-192x192.png',
                    '/web-app-manifest-192x192.png',
                    'web-app-manifest-192x192.png',
                    './icon-192x192.png',
                    '/icon-192x192.png',
                    'icon-192x192.png'
                );
                return [...new Set(list)];
            }, [logoUrl]);

            if (srcIndex >= sources.length) {
                return (
                    <div className={`rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-black flex items-center justify-center shadow-sm border border-indigo-400/30 shrink-0 ${className}`}>
                        <span className="text-sm font-black tracking-tight">AF</span>
                    </div>
                );
            }

            return (
                <img
                    src={sources[srcIndex]}
                    onError={() => setSrcIndex(prev => prev + 1)}
                    alt="Amir Finance"
                    className={`rounded-2xl object-cover shadow-sm border border-slate-200/80 dark:border-slate-700 active:scale-95 transition-transform shrink-0 ${className}`}
                />
            );
        };

        // NavRippleButton Component with Smooth Ripple Effect
        function NavRippleButton({ id, onClick, isActive, iconName, label }) {
            const [ripples, setRipples] = useState([]);

            const handlePointerDown = (e) => {
                const button = e.currentTarget;
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 1.6;
                const x = e.clientX ? (e.clientX - rect.left - size / 2) : (rect.width / 2 - size / 2);
                const y = e.clientY ? (e.clientY - rect.top - size / 2) : (rect.height / 2 - size / 2);
                const newRipple = {
                    id: Date.now() + Math.random(),
                    x,
                    y,
                    size
                };

                setRipples((prev) => [...prev.slice(-2), newRipple]);
            };

            const removeRipple = (rippleId) => {
                setRipples((prev) => prev.filter((r) => r.id !== rippleId));
            };

            return (
                <button 
                    id={id}
                    onPointerDown={handlePointerDown}
                    onClick={onClick}
                    className={`relative overflow-hidden flex flex-col items-center justify-center w-14 h-12 rounded-2xl transition-all duration-200 select-none cursor-pointer ${
                        isActive ? 'text-indigo-600 dark:text-indigo-400 font-extrabold scale-105' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                >
                    <AnimatePresence>
                        {ripples.map((ripple) => (
                            <motion.span
                                key={ripple.id}
                                initial={{ scale: 0, opacity: 0.45 }}
                                animate={{ scale: 2.5, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.55, ease: [0.1, 0.8, 0.3, 1] }}
                                onAnimationComplete={() => removeRipple(ripple.id)}
                                className="absolute rounded-full bg-indigo-500/25 dark:bg-indigo-400/30 pointer-events-none"
                                style={{
                                    top: ripple.y,
                                    left: ripple.x,
                                    width: ripple.size,
                                    height: ripple.size,
                                }}
                            />
                        ))}
                    </AnimatePresence>
                    <Icon name={iconName} className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                    <span className="text-[10px] mt-0.5 font-medium tracking-tight">{label}</span>
                </button>
            );
        }

        function App() {
            const [currentTab, setCurrentTab] = useState('dashboard');
            const [navDirection, setNavDirection] = useState('forward');
            const [selectedContact, setSelectedContact] = useState(null);
            const [selectedLoan, setSelectedLoan] = useState(null);
            const [selectedPeriod, setSelectedPeriod] = useState(null);
            const [loanReturnTab, setLoanReturnTab] = useState('accounts');
            const [accountsSubTab, setAccountsSubTab] = useState('all');
            const [loanTabFilter, setLoanTabFilter] = useState('paid');

            const navigateToTab = (tabName, direction = 'forward') => {
                setNavDirection(direction);
                setCurrentTab(tabName);
            };

            const navigateBack = (targetTab) => {
                setNavDirection('back');
                setCurrentTab(targetTab);
            };

            const openLoanDetail = (loan, overrideReturnTab) => {
                setSelectedLoan(loan);
                if (overrideReturnTab) {
                    setLoanReturnTab(overrideReturnTab);
                } else if (currentTab !== 'loan-detail') {
                    setLoanReturnTab(currentTab);
                }
                setNavDirection('forward');
                setCurrentTab('loan-detail');
            };

            const openArchivedPeriodDetail = (period, overrideReturnTab) => {
                setSelectedPeriod(period);
                if (overrideReturnTab) {
                    setLoanReturnTab(overrideReturnTab);
                } else if (currentTab !== 'archived-period-detail') {
                    setLoanReturnTab(currentTab);
                }
                setNavDirection('forward');
                setCurrentTab('archived-period-detail');
            };
            
            const openContactDetail = (contact, filter = 'all', returnTab = 'contacts') => {
                setSelectedContact(contact);
                if (filter) setProfileFilter(filter);
                setLoanReturnTab(returnTab);
                setNavDirection('forward');
                setCurrentTab('contact-detail');
            };
            
            const [toastMessage, setToastMessage] = useState('');
            const [showPlusMenu, setShowPlusMenu] = useState(false);

            // Page Slide Transition Animation Variants (Matching reference code smooth slide & fade)
            const pageSlideVariants = {
                initial: (direction) => ({
                    x: direction === 'none' ? '0px' : (direction === 'back' ? '-50px' : '50px'),
                    opacity: direction === 'none' ? 1 : 0,
                }),
                animate: (direction) => ({
                    x: '0px',
                    opacity: 1,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.32,
                        ease: [0.16, 1, 0.3, 1]
                    }
                }),
                exit: (direction) => ({
                    x: direction === 'none' ? '0px' : (direction === 'back' ? '50px' : '-50px'),
                    opacity: 0,
                    transition: direction === 'none' ? { duration: 0 } : {
                        duration: 0.22,
                        ease: [0.7, 0, 0.84, 0]
                    }
                })
            };

            // Application Version Management State
            const defaultVersionData = {
    "appName": "Amir Finance",
    "appLogo": "apple-touch-icon.png",
    "installedVersion": "3.1.11",
    "buildNumber": 332,
    "releaseDate": "2026-08-15",
    "releaseChannel": "Stable",
    "channelLabel": "نسخه پایدار",
    "latestVersion": "3.1.11",
    "latestBuild": 332,
    "isUpdateAvailable": false,
    "history": [
        {
            "version": "3.1.9",
            "buildNumber": 328,
            "releaseDate": "2026-08-15",
            "releaseChannel": "Stable",
            "commitHash": "v319stable",
            "commitMessage": "fix: universal viewport bottom gap fix and version synchronization",
            "changes": [
                "حل ریشه‌ای و کامل مشکل جای خالی پایین صفحه در تمام مرورگرها و دیوایس‌ها",
                "همگام‌سازی دقیق نسخه نصب‌شده با سرور و بارگذاری سریع بدون نیاز به کش قدیمی",
                "تراز دقیق نوار ناوبری پایین صفحه با لبه استاندارد دستگاه",
                "بهینه‌سازی نهایی کارکرد آفلاین PWA"
            ]
        },
        {
            "version": "3.1.8",
            "buildNumber": 321,
            "releaseDate": "2026-08-15",
            "releaseChannel": "Stable",
            "commitHash": "v318bottomfix",
            "commitMessage": "fix: fix bottom navigation bar floating gap in iOS PWA and mobile",
            "changes": [
                "تثبیت نوار ناوبری پایین صفحه چسبیده به لبه فیزیکی دستگاه (Fixed Bottom 0)",
                "حذف فاصله و فضای خالی زیر نوار ناوبری در حالت Standalone / PWA",
                "پوشش یکپارچه پس‌زمینه نوار پایین تا انتهای صفحه در زیر نوار هوم (Home Indicator)",
                "انتشار رسمی نسخه ۳.۱.۸"
            ]
        },
        {
            "version": "3.1.7",
            "buildNumber": 320,
            "releaseDate": "2026-08-15",
            "releaseChannel": "Stable",
            "commitHash": "v317safefix",
            "commitMessage": "fix: fix iOS PWA safe area insets and viewport scrolling alignment",
            "changes": [
                "حل مشکل جابجایی صفحه در حالت PWA و Standalone روی گوشی‌های همراه",
                "سازگاری دقیق با بریدگی ناچ (Notch) و جزیره پویا (Dynamic Island) در بالای صفحه با safe-area-inset-top",
                "اصلاح ارتفاع و فاصله ایمن نوار ناوبری پایین صفحه با safe-area-inset-bottom و نوار هوم آیفون",
                "قفل‌سازی موقعیت Viewport برای جلوگیری از بالا رفتن محتوا و ایجاد فضای خالی زیر برنامه",
                "انتشار رسمی نسخه ۳.۱.۷"
            ]
        },
        {
            "version": "3.1.6",
            "buildNumber": 319,
            "releaseDate": "2026-08-15",
            "releaseChannel": "Stable",
            "commitHash": "v316dashlogo",
            "commitMessage": "feat: release version 3.1.6 with resized favicon-96x96 logo in dashboard header",
            "changes": [
                "استفاده از فایل favicon-96x96.png به عنوان تصویر لوگوی بالای صفحه داشبورد",
                "افزایش ابعاد لوگوی داشبورد به میزان ۱.۵ برابر (۶۰ در ۶۰ پیکسل) با گوشه‌های گرد مدرن",
                "انتشار رسمی نسخه ۳.۱.۶"
            ]
        },
        {
            "version": "3.1.5",
            "buildNumber": 317,
            "releaseDate": "2026-08-15",
            "releaseChannel": "Stable",
            "commitHash": "v315logo",
            "commitMessage": "feat: release version 3.1.5 with enlarged settings brand logo and preview asset compatibility",
            "changes": [
                "افزایش اندازه تصویر و لوگوی بالای صفحه تنظیمات به حدود دو سوم ارتفاع باکس سربرگ برای نمایش هرچه زیباتر و برجسته‌تر",
                "بهبود رندرینگ و سازگاری کامل لود تصویر در محیط Preview و مرورگر وب",
                "انتشار رسمی نسخه ۳.۱.۵"
            ]
        },
        {
            "version": "3.1.4",
            "buildNumber": 316,
            "releaseDate": "2026-08-15",
            "releaseChannel": "Stable",
            "commitHash": "v314settings",
            "commitMessage": "feat: release version 3.1.4 with aligned settings header logo to right",
            "changes": [
                "انتقال تصویر و لوگوی بالای صفحه تنظیمات به سمت راست باکس و متون برای زیبایی و هماهنگی بیشتر با چیدمان راست‌چین",
                "انتشار رسمی نسخه ۳.۱.۴"
            ]
        },
        {
            "version": "3.1.3",
            "buildNumber": 315,
            "releaseDate": "2026-08-15",
            "releaseChannel": "Stable",
            "commitHash": "v313cascade",
            "commitMessage": "feat: release version 3.1.3 with perfected sticky cards stack cascade behavior",
            "changes": [
                "تنظیم دقیق رفتار اسکرول کارت آخر در حالت استیکی به طوری که هنگام اسکرول تا ابتدای کارت قبلی بالا بیاید و متوقف شود",
                "جلوگیری از بالاتر رفتن کارت آخر نسبت به چیدمان پله‌ای و یکپارچه‌سازی رفتار همه کارت‌های دسته",
                "محاسبه پویا و هوشمند فضای اسکرول کارت‌ها متناسب با ابعاد صفحه نمایش",
                "انتشار رسمی نسخه ۳.۱.۳"
            ]
        },
        {
            "version": "3.1.2",
            "buildNumber": 312,
            "releaseDate": "2026-08-15",
            "releaseChannel": "Stable",
            "commitHash": "v312cache",
            "commitMessage": "fix: force aggressive cache clear and service worker update for PWA to sync latest sticky UI changes",
            "changes": [
                "تغییر مکانیزم کش مرورگر در نسخه نصب‌شده (PWA) برای دریافت قطعی آخرین تغییرات و کدهای جدید",
                "به‌روزرسانی اجباری Service Worker و شکستن کش فایل index.html برای اعمال صد در صدی تغییرات ظاهری (استیکی شدن کارت آخر روی کارت ماقبل)",
                "همسان‌سازی کامل نسخه نصبی روی گوشی با نسخه Preview"
            ]
        },
        {
            "version": "3.1.1",
            "buildNumber": 311,
            "releaseDate": "2026-08-14",
            "releaseChannel": "Stable",
            "commitHash": "v311layout",
            "commitMessage": "feat: release version 3.1.1 with optimized top spacing and perfected sticky cards layering",
            "changes": [
                "حذف فاصله و فضای خالی اضافه در بالای کارت‌ها تا status bar و بالا کشیدن موقعیت کارت‌ها در ماژول‌های استیکی و استک",
                "جلوگیری از رفتن کارت‌ها زیر کیبورد در هنگام تایپ",
                "اصلاح اولویت لایه‌بندی (z-index) کارت‌های استیکی و قرارگیری صحیح کارت آخر روی کارت ماقبل در نسخه وب و موبایل",
                "انتشار رسمی نسخه ۳.۱.۱"
            ]
        },
        {
            "version": "3.1.0",
            "buildNumber": 310,
            "releaseDate": "2026-08-14",
            "releaseChannel": "Stable",
            "commitHash": "v310clean",
            "commitMessage": "feat: release version 3.1.0 with seamless sticky cards, edit buttons restoration, and clean overflow containment",
            "changes": [
                "رفع کامل بیرون‌زدگی محتوا و حذف نوشته و دکمه‌های زائد خارج از کارت استیکی در همه پرونده‌ها",
                "بازگردانی و تثبیت دکمه «ویرایش» در گوشه پایین سمت چپ تمام کارت‌ها از جمله کارت آخر (۷ از ۷)",
                "بهینه‌سازی ریسپانسیو و کپسوله‌سازی اسکرول داخلی کارت‌ها",
                "انتشار رسمی نسخه ۳.۱.۰"
            ]
        },
        {
            "version": "3.0.0",
            "buildNumber": 300,
            "releaseDate": "2026-08-14",
            "releaseChannel": "Stable",
            "commitHash": "v300major",
            "commitMessage": "feat: official release 3.0.0 with perfected sticky cards experience, loan card actions, and clean layout",
            "changes": [
                "تکمیل و بهینه‌سازی نهایی رفتار اسکرول و چیدمان پله‌ای کارت‌های استیکی در تمامی ویزاردها و پرونده‌های وام",
                "جلوگیری از بالاتر رفتن کارت آخر نسبت به کارت یکی مانده به آخر هنگام اسکرول به بالا",
                "نمایش کامل شماره کارت و دکمه ویرایش درون کارت در تمام کارت‌ها از جمله کارت آخر",
                "حذف نوشته و دکمه‌های زائد خارج از کارت در ماژول استیکی و ارتقاء یکپارچگی ظاهری",
                "انتشار رسمی نسخه عمده ۳.۰.۰"
            ]
        },
        {
            "version": "2.2.6",
            "buildNumber": 235,
            "releaseDate": "2026-08-14",
            "releaseChannel": "Stable",
            "commitHash": "v226rel",
            "commitMessage": "feat: release version 2.2.6 with equal sized stack card navigation buttons",
            "changes": [
                "هم‌اندازه شدن دکمه‌های «مرحله بعدی» و «مرحله قبلی» در تمام ویزاردهای کارت استک برنامه",
                "انتشار رسمی نسخه ۲.۲.۶"
            ]
        },
        {
            "version": "2.2.5",
            "buildNumber": 230,
            "releaseDate": "2026-08-13",
            "releaseChannel": "Stable",
            "commitHash": "v225rel",
            "commitMessage": "feat: release version 2.2.5 with universal stack wizard styling and close button contrast fix",
            "changes": [
                "یکپارچه‌سازی و یونیورسال کردن کامل ظاهر پنجره کارت‌های استک و استیکی کارت‌ها در تمام مسیرهای ورودی برنامه و منوی شناور",
                "بهبود کنتراست و خوانایی دکمه ضربدر بستن کارت‌های استک در تم روشن و تاریک",
                "انتشار رسمی نسخه ۲.۲.۵"
            ]
        },
        {
            "version": "2.2.4",
            "buildNumber": 219,
            "releaseDate": "2026-08-13",
            "releaseChannel": "Stable",
            "commitHash": "v224rel",
            "commitMessage": "feat: release version 2.2.4 with card shadow consistency and return animation fix",
            "changes": [
                "یکسان‌سازی سایه کارت‌های تراکنش در تمام بخش‌های بدهی و طلب فعال",
                "اصلاح انیمیشن بازگشت از صفحات جزئیات مخاطب، وام و طلب به صفحه اصلی",
                "انتشار رسمی نسخه ۲.۲.۴"
            ]
        },
        {
            "version": "2.2.3",
            "buildNumber": 217,
            "releaseDate": "2026-08-12",
            "releaseChannel": "Stable",
            "commitHash": "v223rel",
            "commitMessage": "feat: release version 2.2.3 with accordion transactions card redesign & smooth animation fix",
            "changes": [
                "یکسان‌سازی کامل سبک کارت‌ها و سایه تراکنش‌ها با بخش یادآوری‌های مهم",
                "بهبود و روان‌سازی انیمیشن باز و بسته شدن آکاردئون تراکنش‌ها و رفع پرش هنگام بستن",
                "انتشار رسمی نسخه ۲.۲.۳"
            ]
        },
        {
            "version": "2.2.2",
            "buildNumber": 212,
            "releaseDate": "2026-08-11",
            "releaseChannel": "Stable",
            "commitHash": "v222rel",
            "commitMessage": "feat: official release 2.2.2 with app icons, leather wallet splash screen, and card gestures",
            "changes": [
                "ارتقاء و پیاده‌سازی آیکون رسمی برنامه برای اندروید و iOS (طرح ۳بعدی سکه طلایی با نماد A و نمودار رشد)",
                "بازسازی کامل اسپلش اسکرین با تصویر باکیفیت کیف چرمی و کارت‌های اعتباری و رفع مشکل صفحه سیاه",
                "بهبود انیمیشن بازگشت و لمس بیرون کارت‌ها (بستن خودکار کارت‌های بازشده با لمس خارج از کارت)",
                "بازگردانی و بهبود بخش تاریخچه تغییرات و نسخه‌ها (Changelog) در تنظیمات"
            ]
        },
        {
            "version": "2.2.1",
            "buildNumber": 211,
            "releaseDate": "2026-08-11",
            "releaseChannel": "Stable",
            "commitHash": "v221rel",
            "commitMessage": "fix & feat: fix black splash screen with leather wallet theme and improve card back animations",
            "changes": [
                "بازسازی کامل اسپلش اسکرین با تصویر باکیفیت کیف چرمی و کارت‌های اعتباری و رفع مشکل صفحه سیاه",
                "بهبود انیمیشن بازگشت و لمس بیرون کارت‌ها (بستن خودکار کارت‌های بازشده با لمس خارج از کارت)",
                "رفع مشکل عدم نمایش کامل گزینه‌ها در برخی بخش‌ها"
            ]
        },
        {
            "version": "2.1.5",
            "buildNumber": 206,
            "releaseDate": "2026-08-08",
            "releaseChannel": "Stable",
            "commitHash": "v215stackFix",
            "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
            "changes": [
                "حذف دکمه «نمای یکجای کارت‌ها» از بالای مدال استک کارت‌ها",
                "تطبیق و یکسان‌سازی دقیق ارتفاع تمامی کارت‌های استک و استیکی جهت حذف فضای خالی اضافه در پایین کارت‌ها",
                "هم‌رنگ شدن هوشمند status bar با پس‌زمینه برنامه در زمان باز بودن مدال استک کارت و کارت‌های استیکی",
                "اعمال انیمیشن دقیق بازگشت (Rewind) عینا معکوس انیمیشن خروج کارت در زمان کلیک روی دکمه «مرحله قبلی»",
                "رفع مشکل پرش و عدم اجرای انیمیشن در صفحات دارای اسکرول عمودی موبایل (Uniform Card Height)",
                "افزودن سایه برجسته بالای کارت‌ها هنگام حرکت استیکی و قرارگیری روی کارت قبلی (Top Overlapping Shadow)",
                "حذف کامل منوی بالای صفحه در حالت ویرایش کارت‌ها جهت نمایش خالص کارت‌ها در صفحه",
                "افزودن دکمه شناور ضربدر (X) در پایین کارت‌ها جهت خروج سریع و آسان",
                "اصلاح موقعیت و لایه منوی تغییرات ذخیره‌نشده در پایین صفحه بدون ایجاد مزاحمت برای ویرایش سایر کارت‌ها"
            ]
        },
        {
            "version": "2.1.0",
            "buildNumber": 202,
            "releaseDate": "2026-08-07",
            "releaseChannel": "Stable",
            "commitHash": "v210mobileEdit",
            "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
            "changes": [
                "طراحی و پیاده‌سازی تجربه جدید و اختصاصی ویرایش کارت‌های استک (Sticky Stacked Cards) در نسخه موبایل PWA",
                "پشتیبانی از اسکرول عمودی روان، چسبندگی کارت‌ها در بالای صفحه به سبک iOS (Sticky Headers) و لغزش نرم کارت بعدی روی کارت قبلی با Scroll Snap",
                "نمایش کارت‌ها به‌صورت شناور با عرض اولیه ۹۲٪، گوشه‌های گرد، فواصل بهینه و حذف کامل دکمه‌های قبلی/بعدی در حالت ویرایش",
                "قابلیت ویرایش درون‌خطی کارت فعال با لمس، بزرگ‌نمایی نرم (از ۰.۹۲ به ۱.۰) و انیمیشن مات و کم‌رنگ شدن سایر کارت‌ها (Blur & Dimming)",
                "افزودن دکمه‌های «ثبت تغییرات» و «انصراف» به همراه نشانگر سبز «اصلاح‌شده» برای شناسایی کارت‌های تغییریافته",
                "افزودن نوار شناور پایین صفحه با شمارنده تغییرات ذخیره‌نشده و دکمه «ثبت همه تغییرات» جهت ذخیره یکجای داده‌ها",
                "نمایش پنجره هشدار تایید هوشمند هنگام تمایل کاربر به خروج از ویرایشگر در صورت وجود تغییرات ذخیره‌نشده"
            ]
        },
        {
            "version": "2.0.1",
            "buildNumber": 201,
            "releaseDate": "2026-08-07",
            "releaseChannel": "Stable",
            "commitHash": "v201rel",
            "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
            "changes": [
                "حذف دکمه «حذف مخاطب» از بالای کارت ویرایش مخاطب در استک کارت جهت جلوگیری از نیاز به اسکرول کارت",
                "اصلاح و روان‌سازی کامل عملکرد کلیک روی کادرهای ورودی در کارت‌های استک جهت باز شدن آنی کیبورد و فوکوس بدون مشکل روی موبایل و آیفون",
                "بازطراحی عناوین بخش‌های وام‌ها، طلب‌ها و بدهی‌ها در صفحه حساب‌ها به صورت مرکزچین و حاشیه‌دار در تمام عرض صفحه",
                "افزودن دکمه‌های فیلتر دوگانه (اصلی و بایگانی به همراه شمارنده تعداد) در صفحه پروفایل مخاطب برای هر ۳ بخش وام‌ها، بدهی‌ها و طلب‌ها"
            ]
        },
        {
            "version": "2.0.0",
            "buildNumber": 200,
            "releaseDate": "2026-08-07",
            "releaseChannel": "Stable",
            "commitHash": "v200major",
            "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
            "changes": [
                "حل ساختاری و کامل مشکل نمایش ناقص صفحه برنامه در حالت Preview و iFrame با تنظیم ارتفاع ۱۰۰٪ روی html، body و root#",
                "جلوگیری کامل از زوم ناخواسته صفحه‌نمایش هنگام باز شدن کیبورد مجازی در تمامی فیلدهای ورودی (موبایل و آیفون) با تنظیم اندازه فونت استاندارد ۱۶پیکسل و viewport-fit=cover",
                "بررسی دقیق و تطبیق ۱۰۰٪ مسیر تمامی فایل‌های Favicon، Apple Touch Icon، Web Manifest و تصاویر Splash Screen در index.html و public/index.html جهت نمایش دقیق آیکون در آیفون و PWA",
                "بهینه‌سازی انیمیشن‌های ورود و خروج (AnimatePresence) و سیستم فوکوس خودکار (autoFocus) در فرم‌ها و کارت‌های استک لایه‌ای (Stack Wizard)",
                "به‌روزرسانی سرویس ورکر (Service Worker v2.0.0-b200) جهت کش آفلاین و به‌روزرسانی آنی نسخه جدید"
            ]
        },
        {
            "version": "1.9.1",
            "buildNumber": 175,
            "releaseDate": "2026-08-05",
            "releaseChannel": "Stable",
            "commitHash": "v191rel",
            "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
            "changes": [
                "حذف کامل کارت انتخاب سررسید/ریمایندر از کارت استک ثبت وام",
                "بازگرداندن جدول انتخاب روزهای ۱ تا ۳۱ ماه به کارت سررسید اولین قسط وام با حذف عنوان بالای جدول",
                "پیاده‌سازی کارت استک برای ثبت مخاطب جدید (کارت اول: نام و نام خانوادگی در ۲ کادر مجزا، کارت دوم: شماره تماس، شماره کارت و شماره شبا)",
                "استفاده از کارت استک جدید برای ویرایش مخاطب به همراه دکمه حذف مخاطب",
                "ثبت رسمی بیلد 175 و انتشار نسخه 1.9.1"
            ]
        },
        {
            "version": "1.9.0",
            "buildNumber": 174,
            "releaseDate": "2026-08-05",
            "releaseChannel": "Stable",
            "commitHash": "v190rel",
            "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
            "changes": [
                "معرفی سیستم جدید ویزارد لایه‌ای (Stack Wizard) برای ثبت وام جدید به جای مودال‌های تو در تو و پیچیده",
                "امکان حرکت نرم و انیمیشن‌دار بین مراحل ثبت وام (مشخصات، مخاطب، زمان‌بندی، کارمزد) به صورت کارت‌های روی هم افتاده (Stacked)",
                "بهبود چشمگیر تجربه کاربری و بصری در ثبت اطلاعات پیچیده و چندمرحله‌ای"
            ]
        }
    ]
};

            const [versionData, setVersionData] = useState(defaultVersionData);
            const [isVersionCardExpanded, setIsVersionCardExpanded] = useState(false);
            const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
            const [expandedChangelogVersion, setExpandedChangelogVersion] = useState(null);
            const [isChangelogModalOpen, setIsChangelogModalOpen] = useState(false);
            const [showAllVersions, setShowAllVersions] = useState(false);
            const [swRegistration, setSwRegistration] = useState(null);
            const [hasSWUpdate, setHasSWUpdate] = useState(false);

            const toggleVersionCard = () => {
                setIsVersionCardExpanded(prev => {
                    const next = !prev;
                    if (next) {
                        setOpenSettingsSection(null);
                    }
                    return next;
                });
            };

            const toggleSettingsSection = (sectionName) => {
                setOpenSettingsSection(prev => {
                    const next = prev === sectionName ? null : sectionName;
                    if (next) {
                        setIsVersionCardExpanded(false);
                    }
                    return next;
                });
            };

            // Register Service Worker and monitor updates
            useEffect(() => {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('./sw.js').then(reg => {
                        setSwRegistration(reg);

                        if (reg.waiting) {
                            setHasSWUpdate(true);
                        }

                        reg.onupdatefound = () => {
                            const installingWorker = reg.installing;
                            if (installingWorker) {
                                installingWorker.onstatechange = () => {
                                    if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                        setHasSWUpdate(true);
                                    }
                                };
                            }
                        };
                    }).catch(err => {
                        console.log('SW registration note:', err.message);
                    });

                    let refreshing = false;
                    navigator.serviceWorker.addEventListener('controllerchange', () => {
                        if (!refreshing) {
                            refreshing = true;
                            window.location.reload();
                        }
                    });
                }
            }, []);

            // Check version logic against server with cache-busting & SW inspection
            const checkAppVersion = async (isManual = false) => {
                if (isManual) setIsCheckingUpdate(true);

                let swFoundUpdate = false;
                // Trigger Service Worker background check if supported
                if ('serviceWorker' in navigator && swRegistration) {
                    try {
                        await swRegistration.update();
                        if (swRegistration.waiting || swRegistration.installing) {
                            swFoundUpdate = true;
                            setHasSWUpdate(true);
                        }
                    } catch (e) {
                        console.log('SW update check:', e.message);
                    }
                }

                const EMBEDDED_BUILD = 332;
                const EMBEDDED_VERSION = "3.1.11";

                let localBuildStr = localStorage.getItem('amir_installed_build');
                let localVersion = localStorage.getItem('amir_installed_version');

                // If local build is missing or older than current running code bundle, synchronize it
                if (!localBuildStr || parseInt(localBuildStr, 10) < EMBEDDED_BUILD) {
                    localStorage.setItem('amir_installed_build', EMBEDDED_BUILD.toString());
                    localStorage.setItem('amir_installed_version', EMBEDDED_VERSION);
                    localBuildStr = EMBEDDED_BUILD.toString();
                    localVersion = EMBEDDED_VERSION;
                }

                const localBuild = Math.max(EMBEDDED_BUILD, parseInt(localBuildStr || '0', 10));
                const activeVersion = (localBuild > EMBEDDED_BUILD && localVersion) ? localVersion : EMBEDDED_VERSION;

                try {
                    const res = await fetch('version.json?t=' + Date.now(), { 
                        cache: 'no-store',
                        headers: { 
                            'Cache-Control': 'no-cache, no-store, must-revalidate',
                            'Pragma': 'no-cache' 
                        } 
                    });
                    if (!res.ok) throw new Error('version.json fetch failed');
                    const serverData = await res.json();

                    const serverBuild = parseInt(serverData.buildNumber || serverData.latestBuild || localBuild.toString(), 10);
                    const serverVersion = serverData.installedVersion || serverData.latestVersion || activeVersion;

                    const isUpdateAvailable = (serverBuild > localBuild) || hasSWUpdate || swFoundUpdate;

                    setVersionData(prev => {
                        const wasAlreadyAvailable = prev.isUpdateAvailable;
                        if (!isManual && isUpdateAvailable && !wasAlreadyAvailable) {
                            setTimeout(() => {
                                showToast('نسخه ' + serverVersion + ' آماده دریافت است. برای نصب به تنظیمات بروید.', 'info', 5000);
                            }, 1000);
                        }
                        return {
                            ...defaultVersionData,
                            ...serverData,
                            installedVersion: activeVersion,
                            buildNumber: localBuild,
                            latestVersion: serverVersion,
                            latestBuild: serverBuild,
                            isUpdateAvailable: isUpdateAvailable,
                            history: (serverData && serverData.history && serverData.history.length > 0)
                                ? serverData.history
                                : (prev.history && prev.history.length > 0 ? prev.history : defaultVersionData.history)
                        };
                    });

                    if (isManual) {
                        setIsCheckingUpdate(false);
                        if (isUpdateAvailable) {
                            showToast('نسخه جدیدتر ' + serverVersion + ' (بیلد ' + serverBuild + ') آماده دانلود و نصب است');
                        } else {
                            showToast('شما از آخرین نسخه استفاده می‌کنید (بیلد ' + localBuild + ')');
                        }
                    }
                } catch (err) {
                    console.log('Error checking version:', err);
                    const isUpdateAvailable = hasSWUpdate || swFoundUpdate;
                    setVersionData(prev => ({
                        ...prev,
                        installedVersion: localVersion || EMBEDDED_VERSION,
                        buildNumber: localBuild,
                        latestVersion: EMBEDDED_VERSION,
                        latestBuild: EMBEDDED_BUILD,
                        isUpdateAvailable: isUpdateAvailable
                    }));

                    if (isManual) {
                        setIsCheckingUpdate(false);
                        if (isUpdateAvailable) {
                            showToast('یک نسخه جدیدتر آماده بروزرسانی است');
                        } else {
                            showToast('شما از آخرین نسخه استفاده می‌کنید (بیلد ' + localBuild + ')');
                        }
                    }
                }
            };

            useEffect(() => {
                checkAppVersion(false);
            }, [hasSWUpdate]);

            const handleCheckForUpdates = (e) => {
                if (e) e.stopPropagation();
                checkAppVersion(true);
            };

            const handleApplyUpdate = async (e) => {
                if (e) e.stopPropagation();
                setIsCheckingUpdate(true);

                try {
                    showToast('در حال دریافت جدیدترین نسخه و پاکسازی حافظه پنهان...');

                    // Fetch latest version.json and update localStorage
                    const res = await fetch('version.json?t=' + Date.now(), { cache: 'no-store' });
                    if (res.ok) {
                        const serverData = await res.json();
                        const latestBuild = parseInt(serverData.buildNumber || '0', 10);
                        const latestVersion = serverData.installedVersion || '1.0.0';

                        localStorage.setItem('amir_installed_build', latestBuild.toString());
                        localStorage.setItem('amir_installed_version', latestVersion);
                    }

                    // 1. Clear all CacheStorage caches
                    if ('caches' in window) {
                        const cacheKeys = await caches.keys();
                        await Promise.all(cacheKeys.map(key => caches.delete(key)));
                    }

                    // 2. Skip waiting if service worker is waiting
                    if (swRegistration && swRegistration.waiting) {
                        swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
                    }

                    // 3. Unregister existing service workers to ensure fresh reload
                    if ('serviceWorker' in navigator) {
                        const registrations = await navigator.serviceWorker.getRegistrations();
                        for (let reg of registrations) {
                            await reg.unregister();
                        }
                    }

                    // 4. Force hard reload with cache-busting parameter
                    setTimeout(() => {
                        const currentUrl = new URL(window.location.href);
                        currentUrl.searchParams.set('v', Date.now().toString());
                        window.location.replace(currentUrl.toString());
                    }, 600);
                } catch (err) {
                    console.error('Apply update failed:', err);
                    setIsCheckingUpdate(false);
                    showToast('خطا در اعمال بروزرسانی');
                }
            };
            
            // Stack Wizard Modals
                        const [showSplashScreen, setShowSplashScreen] = useState(true);

            useEffect(() => {
                // Hide static HTML splash overlay if present
                const staticSplash = document.getElementById('app-static-splash');
                if (staticSplash) {
                    staticSplash.style.opacity = '0';
                    staticSplash.style.pointerEvents = 'none';
                    setTimeout(() => {
                        if (staticSplash && staticSplash.parentNode) {
                            staticSplash.parentNode.removeChild(staticSplash);
                        }
                    }, 550);
                }
                const timer = setTimeout(() => {
                    setShowSplashScreen(false);
                }, 1800);
                return () => clearTimeout(timer);
            }, []);
            const [showStackWizard, setShowStackWizard] = useState(false);
            const [wizardType, setWizardType] = useState('loan');
            const [wizardMode, setWizardMode] = useState('add');
            const [currentCardIdx, setCurrentCardIdx] = useState(0);
            const [animatingCard, setAnimatingCard] = useState(false);
            const [animatingPrevCard, setAnimatingPrevCard] = useState(false);
            const [isFinalSubmitting, setIsFinalSubmitting] = useState(false);
            const [validationErrors, setValidationErrors] = useState({});
            const [shakeCardId, setShakeCardId] = useState(null);

            // Premium Mobile Editing Experience States
            const [editingCardId, setEditingCardId] = useState(null);
            const [modifiedCardIds, setModifiedCardIds] = useState([]);
            const [cardFormBackup, setCardFormBackup] = useState(null);
            const [showUnsavedConfirmDialog, setShowUnsavedConfirmDialog] = useState(false);
            const [wizardViewStyle, setWizardViewStyle] = useState('auto'); // 'auto', 'stacked', 'step'
            const [peekAnim, setPeekAnim] = useState(false);

            React.useEffect(() => {
                if (showStackWizard && (wizardMode === 'edit' || wizardViewStyle === 'stacked')) {
                    const t1 = setTimeout(() => setPeekAnim(true), 600);
                    const t2 = setTimeout(() => setPeekAnim(false), 1300);
                    return () => {
                        clearTimeout(t1);
                        clearTimeout(t2);
                    };
                } else {
                    setPeekAnim(false);
                }
            }, [showStackWizard, wizardMode, wizardViewStyle]);

            const editCardsContainerRef = useRef(null);
            const [editCardsContainerHeight, setEditCardsContainerHeight] = useState(0);

            useEffect(() => {
                const el = editCardsContainerRef.current;
                if (!el) return;
                const updateHeight = () => {
                    if (el.clientHeight > 0) {
                        setEditCardsContainerHeight(el.clientHeight);
                    }
                };
                updateHeight();
                const ro = new ResizeObserver((entries) => {
                    for (let entry of entries) {
                        if (entry.contentRect && entry.contentRect.height > 0) {
                            setEditCardsContainerHeight(entry.contentRect.height);
                        }
                    }
                });
                ro.observe(el);
                return () => ro.disconnect();
            }, [showStackWizard, wizardMode, wizardViewStyle]);

            useEffect(() => {
                if (showStackWizard) {
                    setCurrentCardIdx(0);
                    setEditingCardId(null);
                    const scrollToTop = () => {
                        if (editCardsContainerRef.current) {
                            editCardsContainerRef.current.scrollTop = 0;
                        }
                    };
                    scrollToTop();
                    const t1 = setTimeout(scrollToTop, 40);
                    const t2 = setTimeout(scrollToTop, 120);
                    return () => {
                        clearTimeout(t1);
                        clearTimeout(t2);
                    };
                }
            }, [showStackWizard, wizardMode, wizardType]);



            // Wheel Picker Date States
            const initialDevDate = getDeviceJalaliDate();
            const [pickerDay, setPickerDay] = useState(initialDevDate.day);
            const [pickerMonth, setPickerMonth] = useState(initialDevDate.month);
            const [pickerYear, setPickerYear] = useState(initialDevDate.year);

            // Wheel Picker Date States for Reminder Custom
            const [remDay, setRemDay] = useState(initialDevDate.day);
            const [remMonth, setRemMonth] = useState(initialDevDate.month);
            const [remHour, setRemHour] = useState('09:00');

            // Form Data States for Stack Wizards
            const [loanForm, setLoanForm] = useState({
                id: null,
                title: '',
                selectedContactId: '',
                contactName: '',
                contactSearchQuery: '',
                startDate: `${initialDevDate.year}/${String(jalaliMonths.indexOf(initialDevDate.month) + 1).padStart(2, '0')}/${String(initialDevDate.day).padStart(2, '0')}`,
                principalAmount: '',
                totalRepayment: '',
                installmentAmount: '',
                customInstallmentCount: '',
                dueDayOfMonth: initialDevDate.day,
                firstInstallmentDay: initialDevDate.day,
                firstInstallmentMonth: initialDevDate.month,
                firstInstallmentYear: initialDevDate.year,
                reminderOption: '1روز قبل',
                customReminderDate: '',
                notes: ''
            });

            const [demandDebtForm, setDemandDebtForm] = useState({
                id: null,
                selectedContactId: '',
                contactSearchQuery: '',
                amount: '',
                notes: ''
            });

            const [installmentForm, setInstallmentForm] = useState({
                selectedLoanId: '',
                amount: '',
                notes: ''
            });

            const [repaymentForm, setRepaymentForm] = useState({
                amount: '',
                notes: ''
            });

            // Global Confirmation Dialog State
            const [confirmConfig, setConfirmConfig] = useState(null);

            // Contact Modals & Filters
            const [showAddContactModal, setShowAddContactModal] = useState(false);
            const [showEditContactModal, setShowEditContactModal] = useState(false);
            const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
            const [newContactForm, setNewContactForm] = useState({ firstName: '', lastName: '', phone: '', bankName: '', bankCard: '', iban: '' });
            const [editContactForm, setEditContactForm] = useState({ id: null, firstName: '', lastName: '', phone: '', bankName: '', bankCard: '', iban: '' });
            const [contactWizardForm, setContactWizardForm] = useState({ id: null, firstName: '', lastName: '', phone: '', bankName: '', bankCard: '', iban: '' });
            const [showExportModal, setShowExportModal] = useState(false);
            const [exportModalConfig, setExportModalConfig] = useState(null);

            const openUniversalExportModal = (type, data) => {
                setExportModalConfig({ isOpen: true, type, data });
            };
            const [deleteTxModal, setDeleteTxModal] = useState({ show: false, tx: null, type: null });
            const [showCompletedExportModal, setShowCompletedExportModal] = useState({ show: false, contact: null, type: 'debt' });
            
            
            const loadSavedArray = (primaryKey, legacyKeys, defaultFallback = []) => {
                try {
                    if (localStorage.getItem('amir_fin_data_cleared') === 'true') {
                        return [];
                    }
                    const primary = localStorage.getItem(primaryKey);
                    if (primary !== null && primary !== 'undefined') {
                        const parsed = JSON.parse(primary);
                        if (Array.isArray(parsed)) return parsed;
                    }
                    for (const legKey of legacyKeys) {
                        const legacy = localStorage.getItem(legKey);
                        if (legacy !== null && legacy !== 'undefined') {
                            const parsed = JSON.parse(legacy);
                            if (Array.isArray(parsed)) return parsed;
                        }
                    }
                } catch (e) {
                    console.error('Error loading data from storage:', e);
                }
                return defaultFallback;
            };

            const handleRefreshData = async (tabName) => {
                try {
                    const savedLoans = loadSavedArray('amir_fin_loans_v3', ['amir_fin_loans_v2', 'amir_fin_loans'], loans);
                    setLoans(savedLoans);

                    const savedTx = loadSavedArray('amir_fin_txs_v3', ['amir_fin_txs_v2', 'amir_fin_tx'], transactions);
                    setTransactions(savedTx);

                    const savedContacts = loadSavedArray('amir_fin_contacts_v3', ['amir_fin_contacts_v2', 'amir_fin_contacts'], contacts);
                    setContacts(savedContacts);

                    const savedPeriods = loadSavedArray('amir_fin_completed_periods_v3', ['amir_fin_completed_periods_v2', 'amir_fin_completed_periods'], completedPeriods);
                    setCompletedPeriods(savedPeriods);

                    if (tabName === 'contact-detail' && selectedContact) {
                        const updatedContact = savedContacts.find(c => c.id === selectedContact.id);
                        if (updatedContact) setSelectedContact(updatedContact);
                    }

                    if (tabName === 'loan-detail' && selectedLoan) {
                        const updatedLoan = savedLoans.find(l => l.id === selectedLoan.id);
                        if (updatedLoan) setSelectedLoan(updatedLoan);
                    }
                } catch (e) {
                    console.error('Refresh error:', e);
                }
            };

            const [completedPeriods, setCompletedPeriods] = useState(() => 
                loadSavedArray('amir_fin_completed_periods_v3', ['amir_fin_completed_periods_v2', 'amir_fin_completed_periods'], initialCompletedPeriods)
            );

            useEffect(() => {
                try {
                    localStorage.setItem('amir_fin_completed_periods_v3', JSON.stringify(completedPeriods));
                } catch (e) {}
            }, [completedPeriods]);

            // App Saved Data States
            const [contacts, setContacts] = useState(() => 
                loadSavedArray('amir_fin_contacts_v3', ['amir_fin_contacts_v2', 'amir_fin_contacts'], initialContacts)
            );

            const [loans, setLoans] = useState(() => 
                loadSavedArray('amir_fin_loans_v3', ['amir_fin_loans_v2', 'amir_fin_loans'], initialLoans)
            );
            
            const [transactions, setTransactions] = useState(() => 
                loadSavedArray('amir_fin_txs_v3', ['amir_fin_txs_v2', 'amir_fin_tx'], initialTransactions)
            );

            const [accountsSearchQuery, setAccountsSearchQuery] = useState('');
            const [showCompletedLoans, setShowCompletedLoans] = useState(() => {
                try {
                    return localStorage.getItem('showCompletedLoans') !== 'false';
                } catch(e) {
                    return true;
                }
            });

            const getSettledPeriodCount = (contactId, type) => {
                if (!contactId) return 0;
                const directPeriods = completedPeriods.filter(p => p.contactId === contactId && p.type === type);
                const archivedTxs = transactions.filter(t => t.contactId === contactId && t.periodId && (
                    (type === 'debt' && (t.type === 'debt' || t.type === 'debt_repayment')) ||
                    (type === 'demand' && (t.type === 'demand' || t.type === 'demand_repayment'))
                ));
                const pIds = new Set();
                directPeriods.forEach(p => pIds.add(p.id));
                archivedTxs.forEach(t => pIds.add(t.periodId));
                return pIds.size;
            };

            const accountsQuery = accountsSearchQuery.trim().toLowerCase();

            const filteredAccountsLoans = useMemo(() => {
                let list = loans.filter(loan => {
                    if (!accountsQuery) return true;
                    const title = (loan.title || '').toLowerCase();
                    const contactName = (loan.contactName || '').toLowerCase();
                    const principal = (loan.principalAmount || '').toString();
                    const repayment = (loan.totalRepayment || '').toString();
                    const installment = (loan.installmentAmount || '').toString();
                    const note = (loan.notes || loan.note || loan.description || '').toLowerCase();

                    const matchDirect = title.includes(accountsQuery) ||
                        contactName.includes(accountsQuery) ||
                        principal.includes(accountsQuery) ||
                        repayment.includes(accountsQuery) ||
                        installment.includes(accountsQuery) ||
                        note.includes(accountsQuery);

                    if (matchDirect) return true;

                    return transactions.some(t => t.loanId === loan.id && (
                        (t.note || '').toLowerCase().includes(accountsQuery) ||
                        (t.description || '').toLowerCase().includes(accountsQuery) ||
                        (t.amount || '').toString().includes(accountsQuery) ||
                        (t.dateStr || '').includes(accountsQuery)
                    ));
                });

                if (accountsSubTab === 'archived') {
                    list = list.filter(loan => {
                        const info = getLoanNextDueInfo(loan, transactions);
                        return info.isCompleted || (loan.remainingAmount !== undefined && loan.remainingAmount <= 0);
                    });
                } else {
                    list = list.filter(loan => {
                        const info = getLoanNextDueInfo(loan, transactions);
                        return !info.isCompleted && (loan.remainingAmount === undefined || loan.remainingAmount > 0);
                    });
                }

                return list.sort((a, b) => {
                    const aCompleted = (getLoanNextDueInfo(a, transactions).isCompleted || (a.remainingAmount !== undefined && a.remainingAmount <= 0)) ? 1 : 0;
                    const bCompleted = (getLoanNextDueInfo(b, transactions).isCompleted || (b.remainingAmount !== undefined && b.remainingAmount <= 0)) ? 1 : 0;
                    return aCompleted - bCompleted;
                });
            }, [loans, transactions, accountsQuery, accountsSubTab]);

            const filteredAccountsDemands = useMemo(() => {
                return contacts.filter(contact => {
                    const settledCount = getSettledPeriodCount(contact.id, 'demand');
                    const hasActiveDemand = contact.totalDemand > 0;
                    const hasArchivedDemand = settledCount > 0 || completedPeriods.some(p => p.contactId === contact.id && p.type === 'demand');

                    if (accountsSubTab === 'archived') {
                        if (!hasArchivedDemand) return false;
                    } else {
                        if (!hasActiveDemand) return false;
                    }

                    if (!accountsQuery) return true;

                    const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.toLowerCase();
                    const phone = (contact.phone || '').toLowerCase();
                    const demandAmt = (contact.totalDemand || '').toString();

                    if (fullName.includes(accountsQuery) || phone.includes(accountsQuery) || demandAmt.includes(accountsQuery)) {
                        return true;
                    }

                    const matchTx = transactions.some(t => t.contactId === contact.id && (t.type === 'demand' || t.type === 'demand_repayment') && (
                        (t.note || '').toLowerCase().includes(accountsQuery) ||
                        (t.description || '').toLowerCase().includes(accountsQuery) ||
                        (t.amount || '').toString().includes(accountsQuery) ||
                        (t.dateStr || '').includes(accountsQuery)
                    ));
                    if (matchTx) return true;

                    return completedPeriods.some(p => p.contactId === contact.id && p.type === 'demand' && (
                        (p.title || '').toLowerCase().includes(accountsQuery) ||
                        (p.totalAmount || '').toString().includes(accountsQuery) ||
                        (p.startDate || '').includes(accountsQuery) ||
                        (p.endDate || '').includes(accountsQuery)
                    ));
                });
            }, [contacts, transactions, completedPeriods, accountsQuery, accountsSubTab]);

            const filteredAccountsDebts = useMemo(() => {
                return contacts.filter(contact => {
                    const settledCount = getSettledPeriodCount(contact.id, 'debt');
                    const hasActiveDebt = contact.totalDebt > 0;
                    const hasArchivedDebt = settledCount > 0 || completedPeriods.some(p => p.contactId === contact.id && p.type === 'debt');

                    if (accountsSubTab === 'archived') {
                        if (!hasArchivedDebt) return false;
                    } else {
                        if (!hasActiveDebt) return false;
                    }

                    if (!accountsQuery) return true;

                    const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.toLowerCase();
                    const phone = (contact.phone || '').toLowerCase();
                    const debtAmt = (contact.totalDebt || '').toString();

                    if (fullName.includes(accountsQuery) || phone.includes(accountsQuery) || debtAmt.includes(accountsQuery)) {
                        return true;
                    }

                    const matchTx = transactions.some(t => t.contactId === contact.id && (t.type === 'debt' || t.type === 'debt_repayment') && (
                        (t.note || '').toLowerCase().includes(accountsQuery) ||
                        (t.description || '').toLowerCase().includes(accountsQuery) ||
                        (t.amount || '').toString().includes(accountsQuery) ||
                        (t.dateStr || '').includes(accountsQuery)
                    ));
                    if (matchTx) return true;

                    return completedPeriods.some(p => p.contactId === contact.id && p.type === 'debt' && (
                        (p.title || '').toLowerCase().includes(accountsQuery) ||
                        (p.totalAmount || '').toString().includes(accountsQuery) ||
                        (p.startDate || '').includes(accountsQuery) ||
                        (p.endDate || '').includes(accountsQuery)
                    ));
                });
            }, [contacts, transactions, completedPeriods, accountsQuery, accountsSubTab]);

            const [reminders, setReminders] = useState(initialReminders);
            const [expandedReminders, setExpandedReminders] = useState(false);
            const [expandedRecentTxs, setExpandedRecentTxs] = useState(true);
            const recentTxsAccordionRef = useRef(null);
            const toggleRecentTxsAccordion = (e) => {
                if (e) e.stopPropagation();
                setExpandedRecentTxs(prev => {
                    const nextState = !prev;
                    if (!nextState && recentTxsAccordionRef.current) {
                        const rect = recentTxsAccordionRef.current.getBoundingClientRect();
                        if (rect.top < 10 || rect.bottom > window.innerHeight) {
                            recentTxsAccordionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    }
                    return nextState;
                });
            };
            const [contactFilter, setContactFilter] = useState('all');
            const [profileFilter, setProfileFilter] = useState('all');
            const [contactLoansSubFilter, setContactLoansSubFilter] = useState('active');
            const [contactDebtsSubFilter, setContactDebtsSubFilter] = useState('active');
            const [contactDemandsSubFilter, setContactDemandsSubFilter] = useState('active');
            const [searchQuery, setSearchQuery] = useState('');
            const [theme, setTheme] = useState(() => {
                try {
                    return localStorage.getItem('amir_fin_theme') || 'system';
                } catch (e) {
                    return 'system';
                }
            });

            const [isDark, setIsDark] = useState(() => {
                const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('amir_fin_theme') || 'system' : 'system';
                if (savedTheme === 'dark') return true;
                if (savedTheme === 'light') return false;
                return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            });

            const [openSettingsSection, setOpenSettingsSection] = useState(null);
            const [allTxsPage, setAllTxsPage] = useState(1);
            const [dynamicPageSize, setDynamicPageSize] = useState(() => {
                if (typeof window === 'undefined') return 8;
                const h = window.innerHeight;
                const w = window.innerWidth;
                if (w >= 1024 || h >= 1000) return 18;
                if (w >= 768 || h >= 850) return 12;
                return 8;
            });

            useEffect(() => {
                const handleResize = () => {
                    if (typeof window === 'undefined') return;
                    const h = window.innerHeight;
                    const w = window.innerWidth;
                    if (w >= 1024 || h >= 1000) setDynamicPageSize(18);
                    else if (w >= 768 || h >= 850) setDynamicPageSize(12);
                    else setDynamicPageSize(8);
                };
                window.addEventListener('resize', handleResize);
                return () => window.removeEventListener('resize', handleResize);
            }, []);
            const [highlightedTxId, setHighlightedTxId] = useState(null);
            const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
            const [showRestoreConfirmModal, setShowRestoreConfirmModal] = useState(false);
            const [showDeleteLoanModal, setShowDeleteLoanModal] = useState(false);
            const [isPlusMenuClosing, setIsPlusMenuClosing] = useState(false);
            const [pendingRestoreData, setPendingRestoreData] = useState(null);
            const [enableReminders, setEnableReminders] = useState(true);
            const [enableDailyAlerts, setEnableDailyAlerts] = useState(true);
            const restoreInputRef = useRef(null);

            useEffect(() => {
                if (highlightedTxId) {
                    const timer = setTimeout(() => {
                        const els = document.querySelectorAll(`[id="tx-card-${highlightedTxId}"]`);
                        if (els.length > 0) {
                            const el = els[els.length - 1]; // Always pick the one in the foreground/active page
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 450);

                    const clearTimer = setTimeout(() => {
                        setHighlightedTxId(null);
                    }, 3000);

                    return () => {
                        clearTimeout(timer);
                        clearTimeout(clearTimer);
                    };
                }
            }, [highlightedTxId]);

            const handleTransactionClick = (tx) => {
                if (!tx) return;
                
                // Set highlighted transaction ID for blinking effect
                setHighlightedTxId(tx.id);

                // 1. If transaction belongs to a Loan
                if (tx.loanId) {
                    const targetLoan = loans.find(l => l.id === tx.loanId);
                    if (targetLoan) {
                        setLoanTabFilter('paid');
                        openLoanDetail(targetLoan, currentTab);
                        return;
                    }
                }

                // 2. If transaction belongs to an Archived Period
                if (tx.periodId) {
                    let targetPeriod = completedPeriods.find(p => p.id === tx.periodId);
                    if (!targetPeriod && tx.contactId) {
                        const contactObj = contacts.find(c => c.id === tx.contactId);
                        const periodTxs = transactions.filter(t => t.periodId === tx.periodId);
                        if (contactObj) {
                            targetPeriod = {
                                id: tx.periodId,
                                contactId: contactObj.id,
                                contactName: `${contactObj.firstName || ''} ${contactObj.lastName || ''}`.trim(),
                                type: tx.type === 'debt' || tx.type === 'debt_repayment' ? 'debt' : 'demand',
                                title: `دوره تسویه‌شده ${contactObj.firstName || ''} ${contactObj.lastName || ''}`,
                                totalAmount: periodTxs.reduce((acc, curr) => acc + Math.abs(curr.amount || 0), 0),
                                transactions: periodTxs
                            };
                        }
                    }
                    if (targetPeriod) {
                        openArchivedPeriodDetail(targetPeriod, currentTab);
                        return;
                    }
                }

                // 3. If transaction belongs to a Contact
                if (tx.contactId) {
                    const targetContact = contacts.find(c => c.id === tx.contactId);
                    if (targetContact) {
                        let filter = 'all';
                        if (tx.type === 'debt' || tx.type === 'debt_repayment') {
                            filter = 'debts';
                            setContactDebtsSubFilter(tx.periodId ? 'archived' : 'active');
                        } else if (tx.type === 'demand' || tx.type === 'demand_repayment') {
                            filter = 'demands';
                            setContactDemandsSubFilter(tx.periodId ? 'archived' : 'active');
                        } else if (tx.type === 'repayment' || tx.type === 'creation' || tx.type === 'loan') {
                            filter = 'loans';
                            setContactLoansSubFilter('active');
                        }
                        openContactDetail(targetContact, filter, currentTab);
                        return;
                    }
                }

                // 4. Fallback: Search loans by title
                if (tx.title) {
                    const matchedLoan = loans.find(l => l.title && (tx.title.includes(l.title) || l.title.includes(tx.title)));
                    if (matchedLoan) {
                        setLoanTabFilter('paid');
                        openLoanDetail(matchedLoan, currentTab);
                        return;
                    }
                }
            };

            const closePlusMenu = (callback) => {
                setShowPlusMenu(false);
                setIsPlusMenuClosing(false);
                if (callback) callback();
            };

            useEffect(() => {
                try {
                    localStorage.setItem('amir_fin_theme', theme);
                } catch (e) {}

                const applyTheme = () => {
                    let activeDark = false;
                    if (theme === 'dark') {
                        activeDark = true;
                    } else if (theme === 'light') {
                        activeDark = false;
                    } else if (theme === 'system') {
                        activeDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                    }

                    setIsDark(activeDark);

                    if (activeDark) {
                        document.documentElement.classList.add('dark');
                        if (document.body) document.body.style.backgroundColor = '#020617';
                        const metaTheme = document.querySelector('meta[name="theme-color"]');
                        if (metaTheme) metaTheme.setAttribute('content', '#020617');
                    } else {
                        document.documentElement.classList.remove('dark');
                        if (document.body) document.body.style.backgroundColor = '#F4F7FC';
                        const metaTheme = document.querySelector('meta[name="theme-color"]');
                        if (metaTheme) metaTheme.setAttribute('content', '#F4F7FC');
                    }
                };

                applyTheme();

                if (theme === 'system' && window.matchMedia) {
                    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                    const handleChange = () => applyTheme();
                    if (mediaQuery.addEventListener) {
                        mediaQuery.addEventListener('change', handleChange);
                        return () => mediaQuery.removeEventListener('change', handleChange);
                    } else if (mediaQuery.addListener) {
                        mediaQuery.addListener(handleChange);
                        return () => mediaQuery.removeListener(handleChange);
                    }
                }
            }, [theme]);

            // Status bar meta color and body/documentElement background synchronization
            const isAnyModalOpen = showStackWizard || 
                showAddContactModal || 
                showEditContactModal || 
                showDeleteConfirmModal || 
                showExportModal || 
                (showCompletedExportModal && showCompletedExportModal.show) || 
                showResetConfirmModal || 
                showRestoreConfirmModal || 
                showDeleteLoanModal || 
                (deleteTxModal && deleteTxModal.show) || 
                showUnsavedConfirmDialog;

            useEffect(() => {
                const metaTheme = document.querySelector('meta[name="theme-color"]');
                const darkBackdropColor = '#0b101d';

                if (isAnyModalOpen) {
                    const modalThemeColor = (showStackWizard && !isDark) ? '#F4F7FC' : darkBackdropColor;
                    if (metaTheme) metaTheme.setAttribute('content', modalThemeColor);
                    if (document.body) document.body.style.backgroundColor = modalThemeColor;
                    if (document.documentElement) document.documentElement.style.backgroundColor = modalThemeColor;
                } else {
                    const activeColor = isDark ? '#020617' : '#F4F7FC';
                    if (metaTheme) metaTheme.setAttribute('content', activeColor);
                    if (document.body) document.body.style.backgroundColor = activeColor;
                    if (document.documentElement) document.documentElement.style.backgroundColor = activeColor;
                }
            }, [isAnyModalOpen, isDark, showStackWizard]);

            const handleExportBackup = () => {
                try {
                    const data = {
                        appName: "Amir Finance",
                        version: "1.0.0",
                        exportDate: new Date().toISOString(),
                        contacts,
                        loans,
                        transactions,
                        reminders,
                        completedPeriods,
                        theme
                    };
                    const jsonStr = JSON.stringify(data, null, 2);
                    const blob = new Blob([jsonStr], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    const now = getDeviceJalaliDate();
                    a.download = `amir-finance-backup-${now.year}-${now.month}-${now.day}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    showToast('فایل پشتیبان با موفقیت دانلود شد');
                } catch (e) {
                    showToast('خطا در ایجاد فایل پشتیبان');
                }
            };

            const handleRestoreFileChange = (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const parsed = JSON.parse(event.target.result);
                        if (!parsed || typeof parsed !== 'object') {
                            showToast('فایل پشتیبان معتبر نمی‌باشد');
                            return;
                        }
                        setConfirmConfig({
                            title: 'بازیابی اطلاعات',
                            message: 'آیا از بازیابی فایل پشتیبان اطمینان دارید؟ تمامی اطلاعات فعلی با اطلاعات فایل پشتیبان جایگزین خواهند شد.',
                            iconName: 'upload-cloud',
                            iconBgColor: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400',
                            confirmLabel: 'تأیید و بازیابی',
                            cancelLabel: 'انصراف',
                            isDestructive: false,
                            onConfirm: () => {
                                try {
                                    if (Array.isArray(parsed.contacts)) setContacts(parsed.contacts);
                                    if (Array.isArray(parsed.loans)) setLoans(parsed.loans);
                                    if (Array.isArray(parsed.transactions)) setTransactions(parsed.transactions);
                                    if (Array.isArray(parsed.reminders)) setReminders(parsed.reminders);
                                    if (Array.isArray(parsed.completedPeriods)) setCompletedPeriods(parsed.completedPeriods);
                                    if (parsed.theme) setTheme(parsed.theme);
                                    showToast('اطلاعات دیتابیس با موفقیت بازیابی شد');
                                } catch (err) {
                                    showToast('خطا در اعمال اطلاعات پشتیبان');
                                }
                                setConfirmConfig(null);
                            },
                            onCancel: () => setConfirmConfig(null)
                        });
                    } catch (err) {
                        showToast('خطا در خواندن فایل پشتیبان');
                    }
                };
                reader.readAsText(file);
                e.target.value = '';
            };

            const handleResetDatabaseClick = () => {
                setConfirmConfig({
                    title: 'حذف کلیه اطلاعات',
                    message: 'آیا از پاکسازی کامل دیتابیس اطمینان دارید؟ تمام مخاطبین، وام‌ها، طلب‌ها، بدهی‌ها و تراکنش‌ها به صورت دائمی حذف خواهند شد.',
                    details: [
                        'تمام مخاطبین و حساب‌ها',
                        'تمام پرونده‌های وام',
                        'تمام طلب‌ها و بدهی‌ها',
                        'سوابق و تراکنش‌ها'
                    ],
                    iconName: 'alert-triangle',
                    iconBgColor: 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400',
                    confirmLabel: 'حذف کامل',
                    cancelLabel: 'انصراف',
                    isDestructive: true,
                    onConfirm: () => {
                        handleConfirmDeleteAllData();
                        setConfirmConfig(null);
                    },
                    onCancel: () => setConfirmConfig(null)
                });
            };

            const handleConfirmRestoreData = () => {
                if (!pendingRestoreData) return;
                try {
                    if (Array.isArray(pendingRestoreData.contacts)) setContacts(pendingRestoreData.contacts);
                    if (Array.isArray(pendingRestoreData.loans)) setLoans(pendingRestoreData.loans);
                    if (Array.isArray(pendingRestoreData.transactions)) setTransactions(pendingRestoreData.transactions);
                    if (Array.isArray(pendingRestoreData.reminders)) setReminders(pendingRestoreData.reminders);
                    if (Array.isArray(pendingRestoreData.completedPeriods)) setCompletedPeriods(pendingRestoreData.completedPeriods);
                    if (pendingRestoreData.theme) setTheme(pendingRestoreData.theme);

                    setShowRestoreConfirmModal(false);
                    setPendingRestoreData(null);
                    showToast('اطلاعات دیتابیس با موفقیت بازیابی شد');
                } catch (e) {
                    showToast('خطا در اعمال اطلاعات پشتیبان');
                }
            };

            const handleConfirmDeleteAllData = () => {
                setContacts([]);
                setLoans([]);
                setTransactions([]);
                setReminders([]);
                setCompletedPeriods([]);
                localStorage.setItem('amir_fin_data_cleared', 'true');
                localStorage.removeItem('amir_fin_contacts_v3');
                localStorage.removeItem('amir_fin_loans_v3');
                localStorage.removeItem('amir_fin_txs_v3');
                localStorage.removeItem('amir_fin_completed_periods_v3');
                localStorage.removeItem('amir_fin_contacts_v2');
                localStorage.removeItem('amir_fin_loans_v2');
                localStorage.removeItem('amir_fin_txs_v2');
                localStorage.removeItem('amir_fin_completed_periods');
                localStorage.removeItem('amir_fin_contacts');
                localStorage.removeItem('amir_fin_loans');
                localStorage.removeItem('amir_fin_tx');
                setShowResetConfirmModal(false);
                showToast('کل اطلاعات برنامه با موفقیت پاک شد');
            };

            useEffect(() => {
                localStorage.setItem('amir_fin_contacts_v3', JSON.stringify(contacts));
                if (contacts.length > 0) localStorage.removeItem('amir_fin_data_cleared');
            }, [contacts]);

            useEffect(() => {
                localStorage.setItem('amir_fin_loans_v3', JSON.stringify(loans));
                if (loans.length > 0) localStorage.removeItem('amir_fin_data_cleared');
            }, [loans]);

            useEffect(() => {
                localStorage.setItem('amir_fin_txs_v3', JSON.stringify(transactions));
                if (transactions.length > 0) localStorage.removeItem('amir_fin_data_cleared');
            }, [transactions]);



            function showToast(msg) {
                setToastMessage(msg);
                setTimeout(() => setToastMessage(''), 2800);
            }

            const copyToClipboard = (text, label) => {
                if (!text) return;
                const dummy = document.createElement('textarea');
                document.body.appendChild(dummy);
                dummy.value = text.replace(/\s+/g, '');
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);
                showToast(`${label} کپی شد`);
            };

            const requestDeleteTx = (txItem, type, confirmCb = null) => {
                if (!txItem) return;
                const amtFormatted = Math.abs(txItem.amount || 0).toLocaleString('fa-IR');
                const titleStr = txItem.title || (type === 'loan_installment' ? 'پرداخت قسط' : (type === 'debt' ? 'تراکنش بدهی' : 'تراکنش طلب'));

                setConfirmConfig({
                    title: 'حذف تراکنش',
                    message: 'آیا از حذف این تراکنش اطمینان دارید؟',
                    details: [
                        `عنوان: ${titleStr}`,
                        `مبلغ: ${amtFormatted} تومان`
                    ],
                    iconName: 'trash-2',
                    iconBgColor: 'bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400',
                    confirmLabel: 'حذف تراکنش',
                    cancelLabel: 'انصراف',
                    isDestructive: true,
                    onConfirm: () => {
                        if (typeof confirmCb === 'function') confirmCb();
                        performDeleteTx(txItem, type);
                        setConfirmConfig(null);
                    },
                    onCancel: () => setConfirmConfig(null)
                });
            };

            const performDeleteTx = (txToDelete, txType) => {
                if (!txToDelete) return;

                if (txType === 'loan_installment') {
                    const updatedTxs = transactions.filter(t => t.id !== txToDelete.id);
                    setTransactions(updatedTxs);

                    const targetLoan = loans.find(l => l.id === txToDelete.loanId);
                    if (targetLoan) {
                        const deletedAmt = Math.abs(txToDelete.amount || 0);
                        const newPaid = Math.max(0, (targetLoan.paidAmount || 0) - deletedAmt);
                        const newRemaining = Math.max(0, (targetLoan.totalRepayment || 0) - newPaid);

                        const updatedLoans = loans.map(l => {
                            if (l.id === targetLoan.id) {
                                return {
                                    ...l,
                                    paidAmount: newPaid,
                                    remainingAmount: newRemaining
                                };
                            }
                            return l;
                        });
                        setLoans(updatedLoans);
                        if (selectedLoan && selectedLoan.id === targetLoan.id) {
                            setSelectedLoan(prev => ({
                                ...prev,
                                paidAmount: newPaid,
                                remainingAmount: newRemaining
                            }));
                        }
                    }
                    showToast('قسط با موفقیت حذف گردید');
                } else if (txType === 'debt') {
                    let updatedTxs = transactions.filter(t => t.id !== txToDelete.id);
                    const periodId = txToDelete.periodId;

                    if (periodId) {
                        setCompletedPeriods(prev => prev.filter(p => p.id !== periodId));
                        updatedTxs = updatedTxs.map(t => t.periodId === periodId ? { ...t, periodId: undefined } : t);
                        if (selectedPeriod && selectedPeriod.id === periodId) {
                            setSelectedPeriod(null);
                            navigateToTab(loanReturnTab || 'contact-detail', 'back');
                        }
                    }
                    setTransactions(updatedTxs);

                    if (txToDelete.contactId) {
                        const contactDebts = updatedTxs.filter(t => t.contactId === txToDelete.contactId && (t.type === 'debt' || t.type === 'debt_repayment') && !t.periodId);
                        let netDebt = 0;
                        contactDebts.forEach(t => {
                            if (t.type === 'debt') netDebt += Math.abs(t.amount);
                            if (t.type === 'debt_repayment') netDebt -= Math.abs(t.amount);
                        });
                        netDebt = Math.max(0, netDebt);

                        const updatedContacts = contacts.map(c => {
                            if (c.id === txToDelete.contactId) {
                                return { ...c, totalDebt: netDebt };
                            }
                            return c;
                        });
                        setContacts(updatedContacts);
                        if (selectedContact && selectedContact.id === txToDelete.contactId) {
                            setSelectedContact(prev => ({ ...prev, totalDebt: netDebt }));
                        }
                    }
                    showToast(periodId ? 'تراکنش حذف شد و بدهی از حالت بایگانی خارج گردید' : 'تراکنش بدهی با موفقیت حذف گردید');
                } else if (txType === 'demand') {
                    let updatedTxs = transactions.filter(t => t.id !== txToDelete.id);
                    const periodId = txToDelete.periodId;

                    if (periodId) {
                        setCompletedPeriods(prev => prev.filter(p => p.id !== periodId));
                        updatedTxs = updatedTxs.map(t => t.periodId === periodId ? { ...t, periodId: undefined } : t);
                        if (selectedPeriod && selectedPeriod.id === periodId) {
                            setSelectedPeriod(null);
                            navigateToTab(loanReturnTab || 'contact-detail', 'back');
                        }
                    }
                    setTransactions(updatedTxs);

                    if (txToDelete.contactId) {
                        const contactDemands = updatedTxs.filter(t => t.contactId === txToDelete.contactId && (t.type === 'demand' || t.type === 'demand_repayment') && !t.periodId);
                        let netDemand = 0;
                        contactDemands.forEach(t => {
                            if (t.type === 'demand') netDemand += Math.abs(t.amount);
                            if (t.type === 'demand_repayment') netDemand -= Math.abs(t.amount);
                        });
                        netDemand = Math.max(0, netDemand);

                        const updatedContacts = contacts.map(c => {
                            if (c.id === txToDelete.contactId) {
                                return { ...c, totalDemand: netDemand };
                            }
                            return c;
                        });
                        setContacts(updatedContacts);
                        if (selectedContact && selectedContact.id === txToDelete.contactId) {
                            setSelectedContact(prev => ({ ...prev, totalDemand: netDemand }));
                        }
                    }
                    showToast(periodId ? 'تراکنش حذف شد و طلب از حالت بایگانی خارج گردید' : 'تراکنش طلب با موفقیت حذف گردید');
                }
            };

            const exportPeriodAsPNG = (period) => {
                if (!period) return;
                try {
                    const isDebt = period.type === 'debt';
                    const txs = period.transactions || [];

                    const canvas = document.createElement('canvas');
                    const width = 800;
                    const rowHeight = 44;
                    const headerHeight = 220;
                    const tableHeaderHeight = 42;
                    const footerHeight = 60;
                    const height = headerHeight + tableHeaderHeight + Math.max(1, txs.length) * rowHeight + footerHeight;

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');

                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, width, height);

                    ctx.fillStyle = isDebt ? '#e11d48' : '#059669';
                    ctx.fillRect(0, 0, width, 12);

                    ctx.fillStyle = '#0f172a';
                    ctx.font = 'bold 22px Tahoma, sans-serif';
                    ctx.textAlign = 'right';
                    ctx.fillText(`صورت‌حساب دوره تسویه‌شده ${isDebt ? 'قرض / بدهی' : 'طلب'}`, width - 35, 52);

                    ctx.fillStyle = '#64748b';
                    ctx.font = '13px Tahoma, sans-serif';
                    ctx.fillText(`نام مخاطب: ${period.contactName || ''}    •    بازه زمانی: از ${formatDateToNumericJalali(period.startDate)} تا ${formatDateToNumericJalali(period.endDate)}`, width - 35, 78);

                    ctx.fillStyle = isDebt ? '#fff1f2' : '#ecfdf5';
                    drawRoundRect(ctx, 35, 96, width - 70, 100, 14);
                    ctx.fill();
                    ctx.strokeStyle = isDebt ? '#fecdd3' : '#a7f3d0';
                    ctx.stroke();

                    ctx.fillStyle = '#0f172a';
                    ctx.font = 'bold 16px Tahoma, sans-serif';
                    ctx.fillText(`مبلغ کل دوره: ${Number(period.totalAmount || 0).toLocaleString()} تومان`, width - 60, 132);

                    ctx.fillStyle = isDebt ? '#be123c' : '#047857';
                    ctx.font = 'bold 14px Tahoma, sans-serif';
                    ctx.fillText(`وضعیت: تسویه‌شده و کامل (مانده: ۰ تومان)`, width - 60, 168);

                    const tableTop = 216;
                    ctx.fillStyle = isDebt ? '#e11d48' : '#059669';
                    ctx.fillRect(35, tableTop, width - 70, 38);

                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 12px Tahoma, sans-serif';
                    ctx.fillText('ردیف', width - 60, tableTop + 24);
                    ctx.fillText('شرح / عنوان تراکنش', width - 140, tableTop + 24);
                    ctx.fillText('تاریخ', width - 420, tableTop + 24);
                    ctx.fillText('مبلغ (تومان)', width - 620, tableTop + 24);

                    let currentY = tableTop + 38;
                    if (txs.length === 0) {
                        ctx.fillStyle = '#ffffff';
                        ctx.fillRect(35, currentY, width - 70, 44);
                        ctx.fillStyle = '#94a3b8';
                        ctx.font = '13px Tahoma, sans-serif';
                        ctx.fillText('هیچ تراکنشی در این دوره ثبت نشده است', width / 2 + 80, currentY + 28);
                        currentY += 44;
                    } else {
                        txs.forEach((tx, idx) => {
                            ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                            ctx.fillRect(35, currentY, width - 70, rowHeight);

                            ctx.strokeStyle = '#f1f5f9';
                            ctx.strokeRect(35, currentY, width - 70, rowHeight);

                            ctx.fillStyle = '#334155';
                            ctx.font = '12px Tahoma, sans-serif';
                            ctx.fillText(String(idx + 1), width - 60, currentY + 26);
                            ctx.fillText(tx.title || 'تراکنش', width - 140, currentY + 26);
                            ctx.fillText(formatDateToNumericJalali(tx.dateStr), width - 420, currentY + 26);

                            const isRepay = tx.type === 'debt_repayment' || tx.type === 'demand_repayment';
                            ctx.fillStyle = isRepay ? '#16a34a' : '#e11d48';
                            ctx.font = 'bold 12px Tahoma, sans-serif';
                            ctx.fillText(Number(Math.abs(tx.amount) || 0).toLocaleString(), width - 620, currentY + 26);

                            currentY += rowHeight;
                        });
                    }

                    const nowJalali = getDeviceJalaliDate();
                    const periodDateStr = formatDateToNumericJalali(`${nowJalali.day} ${nowJalali.month} ${nowJalali.year}`);
                    ctx.fillStyle = '#94a3b8';
                    ctx.font = '11px Tahoma, sans-serif';
                    ctx.fillText(`تاریخ صدور: ${periodDateStr}    •    برنامه مدیریت مالی شخصی`, width - 35, currentY + 32);

                    const imageURI = canvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.download = `خروجی_تسویه_${isDebt ? 'بدهی' : 'طلب'}_${(period.contactName || '').replace(/\s+/g, '_')}.png`;
                    link.href = imageURI;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } catch (err) {
                    console.error("Export Period PNG error:", err);
                }
            };

            const handleSetupNotification = (optionVal) => {
                if ('Notification' in window) {
                    Notification.requestPermission().then((permission) => {
                        if (permission === 'granted') {
                            showToast(`اعلان یادآوری برای (${optionVal}) با موفقیت فعال شد`);
                        } else {
                            showToast(`اعلان برنامه ثبت شد: ${optionVal}`);
                        }
                    });
                } else {
                    showToast(`اعلان یادآوری تنظیم شد: ${optionVal}`);
                }
            };

            // Open Wizard Methods for Stack Cards
            const openStackWizard = (type, mode = 'add', data = null) => {
                setWizardType(type);
                setWizardMode(mode);
                setCurrentCardIdx(0);
                setEditingCardId(null);
                setModifiedCardIds([]);
                setCardFormBackup(null);
                setShowUnsavedConfirmDialog(false);
                setValidationErrors({});

                const deviceDate = getDeviceJalaliDate();
                const todayFormatted = `${deviceDate.year}/${String(jalaliMonths.indexOf(deviceDate.month) + 1).padStart(2, '0')}/${String(deviceDate.day).padStart(2, '0')}`;

                if (mode === 'edit' && data && (data.dateStr || data.startDate)) {
                    const parsedDate = parseJalaliDateStr(data.dateStr || data.startDate);
                    setPickerDay(parsedDate.day);
                    setPickerMonth(parsedDate.month);
                    setPickerYear(parsedDate.year);
                } else {
                    setPickerDay(deviceDate.day);
                    setPickerMonth(deviceDate.month);
                    setPickerYear(deviceDate.year);
                    setRemDay(deviceDate.day);
                    setRemMonth(deviceDate.month);
                }

                if (type === 'loan') {
                    const startDayVal = (mode === 'edit' && data && data.startDate) 
                        ? parseJalaliDateStr(data.startDate).day 
                        : deviceDate.day;

                    if (mode === 'edit' && data && data.title) {
                        let fMonth = deviceDate.month;
                        let fYear = deviceDate.year;
                        let fDay = data.dueDayOfMonth || startDayVal;
                        if (data.firstInstallmentDate) {
                            const parsedF = parseJalaliDateStr(data.firstInstallmentDate);
                            fDay = parsedF.day;
                            fMonth = parsedF.month;
                            fYear = parsedF.year;
                        }

                        setLoanForm({
                            id: data.id,
                            title: data.title || '',
                            selectedContactId: data.contactId || '',
                            contactName: data.contactName || '',
                            contactSearchQuery: '',
                            startDate: data.startDate || todayFormatted,
                            principalAmount: data.principalAmount || '',
                            totalRepayment: data.totalRepayment || '',
                            installmentAmount: data.installmentAmount || '',
                            customInstallmentCount: data.totalInstallments || '',
                            dueDayOfMonth: fDay,
                            firstInstallmentDay: fDay,
                            firstInstallmentMonth: fMonth,
                            firstInstallmentYear: fYear,
                            reminderOption: data.reminderDays || '1روز قبل',
                            customReminderDate: '',
                            notes: data.notes || ''
                        });
                    } else {
                        const passedContactId = (data && data.fromFab) ? '' : ((data && data.contactId) ? data.contactId : (selectedContact ? selectedContact.id : ''));
                        const defaultContact = contacts.find(c => c.id === Number(passedContactId));
                        const defaultName = defaultContact ? `${defaultContact.firstName} ${defaultContact.lastName}` : '';
                        setLoanForm({
                            id: null,
                            title: '',
                            selectedContactId: passedContactId,
                            contactName: defaultName,
                            contactSearchQuery: '',
                            startDate: todayFormatted,
                            principalAmount: '',
                            totalRepayment: '',
                            installmentAmount: '',
                            customInstallmentCount: '',
                            dueDayOfMonth: deviceDate.day,
                            firstInstallmentDay: deviceDate.day,
                            firstInstallmentMonth: deviceDate.month,
                            firstInstallmentYear: deviceDate.year,
                            reminderOption: '1روز قبل',
                            customReminderDate: '',
                            notes: ''
                        });
                    }
                } else if (type === 'demand' || type === 'debt') {
                    const passedContactId = (data && data.fromFab) ? '' : ((data && data.contactId) ? data.contactId : (selectedContact ? selectedContact.id : ''));
                    const isEditTx = mode === 'edit' && data && data.id;
                    const editAmt = isEditTx ? Math.abs(data.amount || 0) : (mode === 'edit' && data && data.amount ? Math.abs(data.amount || 0) : '');
                    const editNotes = (mode === 'edit' && data && data.notes) ? data.notes : '';

                    setDemandDebtForm({
                        id: isEditTx ? data.id : null,
                        selectedContactId: passedContactId,
                        contactSearchQuery: '',
                        amount: editAmt,
                        notes: editNotes
                    });
                } else if (type === 'installment') {
                    const isFromFab = data && data.fromFab;
                    const isEditTx = mode === 'edit' && data && data.id && (data.amount !== undefined);
                    const passedLoan = (data && data.id && !isEditTx && !isFromFab) ? data : null;
                    const activeLoans = loans.filter(l => {
                        const paid = transactions.filter(t => t.loanId === l.id && t.type === 'repayment').reduce((s, t) => s + Math.abs(t.amount || 0), 0);
                        const total = (l.totalRepayment > 0) ? l.totalRepayment : l.principalAmount;
                        return (total - paid) > 0;
                    });
                    const activeTargetLoan = isFromFab ? null : (passedLoan || selectedLoan || (selectedContact ? activeLoans.find(l => l.contactId === selectedContact.id) : null) || (activeLoans.length > 0 ? activeLoans[0] : null));
                    
                    const editLoanId = isEditTx ? (data.loanId || (activeTargetLoan ? activeTargetLoan.id : '')) : (activeTargetLoan ? activeTargetLoan.id : '');
                    const targetLoan = editLoanId ? (loans.find(l => l.id === Number(editLoanId)) || activeTargetLoan) : null;
                    const editAmt = isEditTx ? Math.abs(data.amount || 0) : (targetLoan ? targetLoan.installmentAmount : '');
                    const editNotes = (isEditTx && data && data.notes) ? data.notes : '';

                    if (isEditTx && data && data.dateStr) {
                        const parsedDate = parseJalaliDateStr(data.dateStr);
                        setPickerDay(parsedDate.day);
                        setPickerMonth(parsedDate.month);
                        setPickerYear(parsedDate.year);
                    } else {
                        // Automatically calculate next installment date (or 1st installment date)
                        const nextInstDate = getInstallmentNextDueDate(targetLoan, transactions);
                        setPickerDay(nextInstDate.day);
                        setPickerMonth(nextInstDate.month);
                        setPickerYear(nextInstDate.year);
                    }

                    setInstallmentForm({
                        id: isEditTx ? data.id : null,
                        selectedLoanId: targetLoan ? targetLoan.id : '',
                        amount: editAmt,
                        notes: editNotes
                    });
                } else if (type === 'debt_repayment' || type === 'demand_repayment') {
                    const isEditTx = mode === 'edit' && data && data.id;
                    const editAmt = isEditTx ? Math.abs(data.amount || 0) : '';
                    const editNotes = (isEditTx && data && data.notes) ? data.notes : '';
                    const passedContactId = (data && data.fromFab) ? '' : ((data && data.contactId) ? data.contactId : (selectedContact ? selectedContact.id : ''));

                    if (isEditTx && data && data.dateStr) {
                        const parsedDate = parseJalaliDateStr(data.dateStr);
                        setPickerDay(parsedDate.day);
                        setPickerMonth(parsedDate.month);
                        setPickerYear(parsedDate.year);
                    }

                    setDemandDebtForm(prev => ({
                        ...prev,
                        selectedContactId: passedContactId,
                        contactSearchQuery: ''
                    }));

                    setRepaymentForm({
                        id: isEditTx ? data.id : null,
                        amount: editAmt,
                        notes: editNotes
                    });
                } else if (type === 'contact') {
                    const isEdit = mode === 'edit' && data && data.id;
                    if (isEdit) {
                        setContactWizardForm({
                            id: data.id,
                            firstName: data.firstName || '',
                            lastName: data.lastName || '',
                            phone: data.phone || '',
                            bankName: data.bankName || '',
                            bankCard: data.bankCard || '',
                            iban: data.iban || ''
                        });
                    } else {
                        setContactWizardForm({
                            id: null,
                            firstName: '',
                            lastName: '',
                            phone: '',
                            bankName: '',
                            bankCard: '',
                            iban: ''
                        });
                    }
                }

                setIsFinalSubmitting(false);
                setShowPlusMenu(false);
                setShowStackWizard(true);
            };

            const handlePrevCard = () => {
                if (animatingCard || animatingPrevCard) return;
                if (currentCardIdx > 0) {
                    const prevIdx = currentCardIdx - 1;
                    setAnimatingPrevCard(true);
                    setCurrentCardIdx(prevIdx);
                    setTimeout(() => {
                        setAnimatingPrevCard(false);
                    }, 750);

                    requestAnimationFrame(() => {
                        const activeCardNode = document.querySelector(`.stack-card[data-depth="0"]`);
                        if (activeCardNode) {
                            const targetInput = activeCardNode.querySelector('input:not([type="hidden"]):not([readonly]), textarea:not([readonly])');
                            if (targetInput) {
                                try {
                                    targetInput.focus();
                                    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) targetInput.click();
                                } catch(e) {}
                            }
                        }
                    });
                }
            };

            const handleNextCard = (cardsList) => {
                if (animatingCard || animatingPrevCard) return;

                const triggerCardError = (fieldKey, errorMsg) => {
                    setValidationErrors({ [fieldKey]: errorMsg });
                    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                        try { navigator.vibrate([15, 30, 15]); } catch (e) {}
                    }
                    const activeCard = cardsList && cardsList[currentCardIdx];
                    if (activeCard) {
                        setShakeCardId(activeCard.id);
                        setTimeout(() => setShakeCardId(null), 450);
                    }
                    const syncFocus = () => {
                        const activeCardNode = document.querySelector(`.stack-card[data-depth="0"]`);
                        if (activeCardNode) {
                            const targetInput = activeCardNode.querySelector('input[inputmode="numeric"]') ||
                                                activeCardNode.querySelector('input:not([type="hidden"]):not([readonly]), textarea:not([readonly])');
                            if (targetInput) {
                                try {
                                    targetInput.focus();
                                    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) targetInput.click();
                                } catch(e) {}
                                targetInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        }
                    };
                    syncFocus();
                    setTimeout(syncFocus, 50);
                    setTimeout(syncFocus, 150);
                };

                // Validation for loan wizard
                if (wizardType === 'loan') {
                    if (currentCardIdx === 0) {
                        if (!loanForm.title.trim()) {
                            triggerCardError('loan_title', 'لطفاً عنوان وام را وارد کنید');
                            return;
                        }
                        if (!loanForm.selectedContactId) {
                            triggerCardError('loan_contact', 'لطفاً یک مخاطب انتخاب کنید');
                            return;
                        }
                    }
                    if (currentCardIdx === 2) { // principal_amount
                        const amt = Number(loanForm.principalAmount) || 0;
                        if (amt <= 0) {
                            triggerCardError('principal_amount', 'لطفاً مبلغ اصل وام را وارد نمایید');
                            return;
                        }
                    }
                    if (currentCardIdx === 3) { // total_repayment
                        const amt = Number(loanForm.totalRepayment) || 0;
                        if (amt <= 0) {
                            triggerCardError('total_repayment', 'لطفاً مبلغ کل بازپرداخت را وارد نمایید');
                            return;
                        }
                    }
                    if (currentCardIdx === 4) { // installment_amount
                        const amt = Number(loanForm.installmentAmount) || 0;
                        if (amt <= 0) {
                            triggerCardError('installment_amount', 'لطفاً مبلغ هر قسط را وارد نمایید');
                            return;
                        }
                    }
                }

                // Validation for demand wizard
                if (wizardType === 'demand') {
                    if (currentCardIdx === 0 && !demandDebtForm.selectedContactId) {
                        triggerCardError('demand_contact', 'لطفاً یک مخاطب انتخاب کنید');
                        return;
                    }
                    if (currentCardIdx === 1) { // demand_amount
                        const amt = Number(demandDebtForm.amount) || 0;
                        if (amt <= 0) {
                            triggerCardError('demand_amount', 'لطفاً مبلغ طلب را وارد نمایید');
                            return;
                        }
                    }
                }

                // Validation for debt wizard
                if (wizardType === 'debt') {
                    if (currentCardIdx === 0 && !demandDebtForm.selectedContactId) {
                        triggerCardError('debt_contact', 'لطفاً یک مخاطب انتخاب کنید');
                        return;
                    }
                    if (currentCardIdx === 1) { // debt_amount
                        const amt = Number(demandDebtForm.amount) || 0;
                        if (amt <= 0) {
                            triggerCardError('debt_amount', 'لطفاً مبلغ قرض را وارد نمایید');
                            return;
                        }
                    }
                }

                // Validation for installment wizard
                if (wizardType === 'installment') {
                    if (currentCardIdx === 0 && !installmentForm.selectedLoanId) {
                        triggerCardError('inst_select_loan', 'لطفاً یک وام را انتخاب کنید');
                        return;
                    }
                    if (currentCardIdx === 2) { // inst_amount
                        const inputAmt = Number(installmentForm.amount) || 0;
                        if (inputAmt <= 0) {
                            triggerCardError('inst_amount', 'لطفاً مبلغ پرداخت قسط را وارد نمایید');
                            return;
                        }
                        const targetLoan = loans.find(l => l.id === Number(installmentForm.selectedLoanId));
                        if (targetLoan) {
                            const editingTx = installmentForm.id ? transactions.find(t => t.id === installmentForm.id) : null;
                            const editingTxAmt = (editingTx && editingTx.loanId === targetLoan.id) ? Math.abs(editingTx.amount || 0) : 0;
                            const loanPaid = transactions.filter(t => t.loanId === targetLoan.id && t.type === 'repayment').reduce((sum, t) => sum + Math.abs(t.amount || 0), 0);
                            const loanPaidExceptCurrent = Math.max(0, loanPaid - editingTxAmt);
                            const loanTotal = (targetLoan.totalRepayment > 0) ? targetLoan.totalRepayment : targetLoan.principalAmount;
                            const loanRemaining = Math.max(0, loanTotal - loanPaidExceptCurrent);
                            if (inputAmt > loanRemaining) {
                                triggerCardError('inst_amount', `مبلغ پرداختی نمی‌تواند از مانده وام (${loanRemaining.toLocaleString()} تومان) بیشتر باشد`);
                                return;
                            }
                        }
                    }
                }

                // Validation for debt repayment wizard
                if (wizardType === 'debt_repayment') {
                    if (currentCardIdx === 0 && !demandDebtForm.selectedContactId) {
                        triggerCardError('debt_repay_contact', 'لطفاً یک مخاطب انتخاب کنید');
                        return;
                    }
                    if (currentCardIdx === 1) { // debt_repay_amount
                        const inputAmt = Number(repaymentForm.amount) || 0;
                        if (inputAmt <= 0) {
                            triggerCardError('debt_repay_amount', 'لطفاً مبلغ بازپرداخت بدهی را وارد نمایید');
                            return;
                        }
                        const targetContact = contacts.find(c => c.id === Number(demandDebtForm.selectedContactId));
                        const editingTx = repaymentForm.id ? transactions.find(t => t.id === repaymentForm.id) : null;
                        const editingTxAmt = editingTx ? Math.abs(editingTx.amount || 0) : 0;
                        const totalDebt = (targetContact ? (targetContact.totalDebt || 0) : 0) + editingTxAmt;
                        if (inputAmt > totalDebt) {
                            triggerCardError('debt_repay_amount', `مبلغ پرداختی نمی‌تواند از کل بدهی (${totalDebt.toLocaleString()} تومان) بیشتر باشد`);
                            return;
                        }
                    }
                }

                // Validation for demand repayment wizard
                if (wizardType === 'demand_repayment') {
                    if (currentCardIdx === 0 && !demandDebtForm.selectedContactId) {
                        triggerCardError('demand_repay_contact', 'لطفاً یک مخاطب انتخاب کنید');
                        return;
                    }
                    if (currentCardIdx === 1) { // demand_repay_amount
                        const inputAmt = Number(repaymentForm.amount) || 0;
                        if (inputAmt <= 0) {
                            triggerCardError('demand_repay_amount', 'لطفاً مبلغ دریافتی را وارد نمایید');
                            return;
                        }
                        const targetContact = contacts.find(c => c.id === Number(demandDebtForm.selectedContactId));
                        const editingTx = repaymentForm.id ? transactions.find(t => t.id === repaymentForm.id) : null;
                        const editingTxAmt = editingTx ? Math.abs(editingTx.amount || 0) : 0;
                        const totalDemand = (targetContact ? (targetContact.totalDemand || 0) : 0) + editingTxAmt;
                        if (inputAmt > totalDemand) {
                            triggerCardError('demand_repay_amount', `مبلغ دریافتی نمی‌تواند از کل طلب (${totalDemand.toLocaleString()} تومان) بیشتر باشد`);
                            return;
                        }
                    }
                }

                // Validation for contact wizard
                if (wizardType === 'contact') {
                    if (currentCardIdx === 0) {
                        if (!contactWizardForm.firstName.trim()) {
                            triggerCardError('contact_firstname', 'لطفاً نام مخاطب را وارد کنید');
                            return;
                        }
                    }
                }

                setValidationErrors({});
                if (currentCardIdx < cardsList.length - 1) {
                    const nextIdx = currentCardIdx + 1;
                    setAnimatingCard(true);
                    setCurrentCardIdx(nextIdx);
                    setTimeout(() => {
                        setAnimatingCard(false);
                    }, 850);

                    requestAnimationFrame(() => {
                        const activeCardNode = document.querySelector(`.stack-card[data-depth="0"]`);
                        if (activeCardNode) {
                            const targetInput = activeCardNode.querySelector('input:not([type="hidden"]):not([readonly]), textarea:not([readonly])');
                            if (targetInput) {
                                try {
                                    targetInput.focus();
                                    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) targetInput.click();
                                } catch(e) {}
                            }
                        }
                    });
                } else {
                    setIsFinalSubmitting(true);
                    setTimeout(() => {
                        saveWizardData();
                        setIsFinalSubmitting(false);
                    }, 450);
                }
            };

            const saveWizardData = () => {
                const dateStr = `${pickerDay} ${pickerMonth} ${pickerYear}`;

                if (wizardType === 'loan') {
                    const principal = Number(loanForm.principalAmount) || 0;
                    const totalRepay = Number(loanForm.totalRepayment) || principal;
                    const instAmt = Number(loanForm.installmentAmount) || Math.round(totalRepay / 12);
                    const userCustomInst = (loanForm.customInstallmentCount !== undefined && loanForm.customInstallmentCount !== '') ? Number(loanForm.customInstallmentCount) : 0;
                    const calcTotalInst = userCustomInst > 0 ? userCustomInst : (instAmt > 0 ? Math.ceil(totalRepay / instAmt) : 12);
                    const startDateFormatted = `${pickerYear}/${String(jalaliMonths.indexOf(pickerMonth)+1).padStart(2, '0')}/${String(pickerDay).padStart(2, '0')}`;
                    
                    const firstInstDay = loanForm.firstInstallmentDay || loanForm.dueDayOfMonth || pickerDay;
                    const firstInstMonth = loanForm.firstInstallmentMonth || pickerMonth;
                    const firstInstYear = loanForm.firstInstallmentYear || pickerYear;
                    const firstInstallmentDateStr = `${firstInstDay} ${firstInstMonth} ${firstInstYear}`;

                    if (wizardMode === 'edit' && loanForm.id) {
                        const updatedLoans = loans.map(l => {
                            if (l.id === loanForm.id) {
                                return {
                                    ...l,
                                    title: loanForm.title || 'وام جدید',
                                    contactId: loanForm.selectedContactId,
                                    contactName: loanForm.contactName,
                                    principalAmount: principal,
                                    totalRepayment: totalRepay,
                                    installmentAmount: instAmt,
                                    totalInstallments: calcTotalInst,
                                    startDate: startDateFormatted,
                                    dueDayOfMonth: firstInstDay,
                                    firstInstallmentDate: firstInstallmentDateStr,
                                    reminderDays: loanForm.reminderOption,
                                    notes: loanForm.notes
                                };
                            }
                            return l;
                        });
                        setLoans(updatedLoans);
                        const currentUpdated = updatedLoans.find(l => l.id === loanForm.id);
                        if (currentUpdated) setSelectedLoan(currentUpdated);
                        showToast('پرونده وام با موفقیت ویرایش شد');
                    } else {
                        const newLoan = {
                            id: Date.now(),
                            title: loanForm.title || 'وام جدید',
                            contactId: loanForm.selectedContactId,
                            contactName: loanForm.contactName,
                            phone: selectedContact ? selectedContact.phone : '09120000000',
                            principalAmount: principal,
                            totalRepayment: totalRepay,
                            installmentAmount: instAmt,
                            startDate: startDateFormatted,
                            dueDate: '1406/08/15',
                            totalInstallments: calcTotalInst,
                            status: 'در حال پرداخت',
                            paidAmount: 0,
                            remainingAmount: totalRepay,
                            dueDayOfMonth: firstInstDay,
                            firstInstallmentDate: firstInstallmentDateStr,
                            reminderDays: loanForm.reminderOption,
                            nextDueNum: 1,
                            nextDueDateStr: firstInstallmentDateStr,
                            daysLeft: 5,
                            notes: loanForm.notes || ''
                        };
                        setLoans([newLoan, ...loans]);
                        
                        const newTx = {
                            id: Date.now() + 1,
                            loanId: newLoan.id,
                            contactId: loanForm.selectedContactId,
                            type: 'creation',
                            title: `ثبت ${newLoan.title}`,
                            dateStr: 'امروز',
                            amount: -principal,
                            isPositive: false
                        };
                        setTransactions([newTx, ...transactions]);

                        setSelectedLoan(newLoan);
                        setCurrentTab('loan-detail');
                        showToast('وام جدید با موفقیت ثبت گردید');
                    }
                } else if (wizardType === 'demand') {
                    const amt = Number(demandDebtForm.amount) || 0;
                    const targetContact = contacts.find(c => c.id === Number(demandDebtForm.selectedContactId));

                    if (wizardMode === 'edit' && demandDebtForm.id) {
                        const existingTx = transactions.find(t => t.id === demandDebtForm.id);
                        const oldAmt = existingTx ? Math.abs(existingTx.amount) : 0;
                        const diff = amt - oldAmt;

                        if (targetContact) {
                            const updatedContacts = contacts.map(c => {
                                if (c.id === targetContact.id) {
                                    return { ...c, totalDemand: Math.max(0, (c.totalDemand || 0) + diff) };
                                }
                                return c;
                            });
                            setContacts(updatedContacts);
                            if (selectedContact && selectedContact.id === targetContact.id) {
                                setSelectedContact(prev => ({ ...prev, totalDemand: Math.max(0, (prev.totalDemand || 0) + diff) }));
                            }
                        }

                        const updatedTxs = transactions.map(t => {
                            if (t.id === demandDebtForm.id) {
                                return { ...t, amount: amt, dateStr, notes: demandDebtForm.notes };
                            }
                            return t;
                        });
                        setTransactions(updatedTxs);
                        showToast('اطلاعات طلب با موفقیت به‌روزرسانی شد');
                    } else if (wizardMode === 'edit' && !demandDebtForm.id && targetContact) {
                        const updatedContacts = contacts.map(c => {
                            if (c.id === targetContact.id) {
                                return { ...c, totalDemand: amt };
                            }
                            return c;
                        });
                        setContacts(updatedContacts);
                        if (selectedContact && selectedContact.id === targetContact.id) {
                            setSelectedContact(prev => ({ ...prev, totalDemand: amt }));
                        }
                        showToast('مبلغ طلب به‌روزرسانی شد');
                    } else {
                        if (targetContact) {
                            const updatedContacts = contacts.map(c => {
                                if (c.id === targetContact.id) {
                                    return { ...c, totalDemand: (c.totalDemand || 0) + amt };
                                }
                                return c;
                            });
                            setContacts(updatedContacts);
                            if (selectedContact && selectedContact.id === targetContact.id) {
                                setSelectedContact(prev => ({ ...prev, totalDemand: (prev.totalDemand || 0) + amt }));
                            }
                        }

                        const newTx = {
                            id: Date.now(),
                            contactId: targetContact ? targetContact.id : null,
                            type: 'demand',
                            title: `ثبت طلب ${targetContact ? 'از ' + targetContact.firstName + ' ' + targetContact.lastName : ''}`,
                            dateStr: dateStr,
                            amount: amt,
                            notes: demandDebtForm.notes,
                            isPositive: true
                        };
                        setTransactions([newTx, ...transactions]);
                        showToast('طلب با موفقیت ثبت گردید');
                    }
                } else if (wizardType === 'debt') {
                    const amt = Number(demandDebtForm.amount) || 0;
                    const targetContact = contacts.find(c => c.id === Number(demandDebtForm.selectedContactId));

                    if (wizardMode === 'edit' && demandDebtForm.id) {
                        const existingTx = transactions.find(t => t.id === demandDebtForm.id);
                        const oldAmt = existingTx ? Math.abs(existingTx.amount) : 0;
                        const diff = amt - oldAmt;

                        if (targetContact) {
                            const updatedContacts = contacts.map(c => {
                                if (c.id === targetContact.id) {
                                    return { ...c, totalDebt: Math.max(0, (c.totalDebt || 0) + diff) };
                                }
                                return c;
                            });
                            setContacts(updatedContacts);
                            if (selectedContact && selectedContact.id === targetContact.id) {
                                setSelectedContact(prev => ({ ...prev, totalDebt: Math.max(0, (prev.totalDebt || 0) + diff) }));
                            }
                        }

                        const updatedTxs = transactions.map(t => {
                            if (t.id === demandDebtForm.id) {
                                return { ...t, amount: -amt, dateStr, notes: demandDebtForm.notes };
                            }
                            return t;
                        });
                        setTransactions(updatedTxs);
                        showToast('اطلاعات قرض / بدهی با موفقیت به‌روزرسانی شد');
                    } else if (wizardMode === 'edit' && !demandDebtForm.id && targetContact) {
                        const updatedContacts = contacts.map(c => {
                            if (c.id === targetContact.id) {
                                return { ...c, totalDebt: amt };
                            }
                            return c;
                        });
                        setContacts(updatedContacts);
                        if (selectedContact && selectedContact.id === targetContact.id) {
                            setSelectedContact(prev => ({ ...prev, totalDebt: amt }));
                        }
                        showToast('مبلغ بدهی به‌روزرسانی شد');
                    } else {
                        if (targetContact) {
                            const updatedContacts = contacts.map(c => {
                                if (c.id === targetContact.id) {
                                    return { ...c, totalDebt: (c.totalDebt || 0) + amt };
                                }
                                return c;
                            });
                            setContacts(updatedContacts);
                            if (selectedContact && selectedContact.id === targetContact.id) {
                                setSelectedContact(prev => ({ ...prev, totalDebt: (prev.totalDebt || 0) + amt }));
                            }
                        }

                        const newTx = {
                            id: Date.now(),
                            contactId: targetContact ? targetContact.id : null,
                            type: 'debt',
                            title: `ثبت قرض / بدهی ${targetContact ? 'به ' + targetContact.firstName + ' ' + targetContact.lastName : ''}`,
                            dateStr: dateStr,
                            amount: -amt,
                            notes: demandDebtForm.notes,
                            isPositive: false
                        };
                        setTransactions([newTx, ...transactions]);
                        showToast('قرض / بدهی با موفقیت ثبت گردید');
                    }
                } else if (wizardType === 'installment') {
                    const amt = Number(installmentForm.amount) || 0;
                    const targetLoan = loans.find(l => l.id === Number(installmentForm.selectedLoanId));

                    if (wizardMode === 'edit' && installmentForm.id) {
                        const existingTx = transactions.find(t => t.id === installmentForm.id);
                        const oldAmt = existingTx ? Math.abs(existingTx.amount || 0) : 0;
                        const diff = amt - oldAmt;

                        if (targetLoan) {
                            const updatedLoans = loans.map(l => {
                                if (l.id === targetLoan.id) {
                                    const newPaid = Math.max(0, (l.paidAmount || 0) + diff);
                                    return {
                                        ...l,
                                        paidAmount: newPaid,
                                        remainingAmount: Math.max(0, (l.totalRepayment || 0) - newPaid)
                                    };
                                }
                                return l;
                            });
                            setLoans(updatedLoans);
                            const updatedTarget = updatedLoans.find(l => l.id === targetLoan.id);
                            if (selectedLoan && selectedLoan.id === targetLoan.id) {
                                setSelectedLoan(updatedTarget);
                            }
                        }

                        const updatedTxs = transactions.map(t => {
                            if (t.id === installmentForm.id) {
                                return {
                                    ...t,
                                    amount: amt,
                                    dateStr: dateStr,
                                    notes: installmentForm.notes,
                                    title: `پرداخت قسط - ${targetLoan ? targetLoan.title : 'وام'}`
                                };
                            }
                            return t;
                        });
                        setTransactions(updatedTxs);
                        showToast('اطلاعات قسط با موفقیت به‌روزرسانی شد');
                    } else {
                        if (targetLoan) {
                            const updatedLoans = loans.map(l => {
                                if (l.id === targetLoan.id) {
                                    const newPaid = (l.paidAmount || 0) + amt;
                                    return {
                                        ...l,
                                        paidAmount: newPaid,
                                        remainingAmount: Math.max(0, (l.totalRepayment || 0) - newPaid)
                                    };
                                }
                                return l;
                            });
                            setLoans(updatedLoans);
                            const updatedTarget = updatedLoans.find(l => l.id === targetLoan.id);
                            if (selectedLoan && selectedLoan.id === targetLoan.id) {
                                setSelectedLoan(updatedTarget);
                            }
                        }
                        const newTx = {
                            id: Date.now(),
                            loanId: Number(installmentForm.selectedLoanId),
                            contactId: selectedContact ? selectedContact.id : (targetLoan ? targetLoan.contactId : null),
                            type: 'repayment',
                            title: `پرداخت قسط - ${targetLoan ? targetLoan.title : 'وام'}`,
                            dateStr: dateStr,
                            amount: amt,
                            notes: installmentForm.notes,
                            isPositive: true
                        };
                        setTransactions([newTx, ...transactions]);
                        showToast('قسط جدید با موفقیت ثبت گردید');
                    }
                } else if (wizardType === 'debt_repayment') {
                    const amt = Number(repaymentForm.amount) || 0;
                    const targetContact = selectedContact || (contacts.length > 0 ? contacts[0] : null);

                    if (wizardMode === 'edit' && repaymentForm.id) {
                        const existingTx = transactions.find(t => t.id === repaymentForm.id);
                        const oldAmt = existingTx ? Math.abs(existingTx.amount || 0) : 0;
                        const diff = amt - oldAmt;

                        if (targetContact) {
                            const newDebt = Math.max(0, (targetContact.totalDebt || 0) - diff);
                            const updatedContacts = contacts.map(c => {
                                if (c.id === targetContact.id) {
                                    return { ...c, totalDebt: newDebt };
                                }
                                return c;
                            });
                            setContacts(updatedContacts);
                            if (selectedContact && selectedContact.id === targetContact.id) {
                                setSelectedContact(prev => ({ ...prev, totalDebt: newDebt }));
                            }
                        }

                        const updatedTxs = transactions.map(t => {
                            if (t.id === repaymentForm.id) {
                                return { ...t, amount: amt, dateStr: dateStr, notes: repaymentForm.notes };
                            }
                            return t;
                        });
                        setTransactions(updatedTxs);
                        showToast('بازپرداخت بدهی با موفقیت به‌روزرسانی شد');
                    } else if (targetContact) {
                        const newDebt = Math.max(0, (targetContact.totalDebt || 0) - amt);
                        const updatedContacts = contacts.map(c => {
                            if (c.id === targetContact.id) {
                                return { ...c, totalDebt: newDebt };
                            }
                            return c;
                        });
                        setContacts(updatedContacts);
                        if (selectedContact && selectedContact.id === targetContact.id) {
                            setSelectedContact(prev => ({ ...prev, totalDebt: newDebt }));
                        }

                        const newTx = {
                            id: Date.now(),
                            contactId: targetContact.id,
                            type: 'debt_repayment',
                            title: `بازپرداخت بدهی به ${targetContact.firstName} ${targetContact.lastName}`,
                            dateStr: dateStr,
                            amount: amt,
                            notes: repaymentForm.notes,
                            isPositive: true
                        };
                        const updatedAllTxs = [newTx, ...transactions];
                        
                        if (newDebt === 0) {
                            const cycleTxs = updatedAllTxs.filter(t => t.contactId === targetContact.id && (t.type === 'debt' || t.type === 'debt_repayment') && !t.periodId);
                            if (cycleTxs.length > 0) {
                                let totalCycleAmt = 0;
                                cycleTxs.forEach(t => { if (t.type === 'debt') totalCycleAmt += Math.abs(t.amount); });
                                const periodId = 'p_debt_' + Date.now();
                                const newPeriod = {
                                    id: periodId,
                                    contactId: targetContact.id,
                                    contactName: `${targetContact.firstName} ${targetContact.lastName}`,
                                    type: 'debt',
                                    title: `دوره تسویه‌شده بدهی به ${targetContact.firstName} ${targetContact.lastName}`,
                                    totalAmount: totalCycleAmt || amt,
                                    startDate: cycleTxs[cycleTxs.length - 1]?.dateStr || dateStr,
                                    endDate: dateStr,
                                    transactions: cycleTxs
                                };
                                setCompletedPeriods(prev => [newPeriod, ...prev]);
                                const archivedTxs = updatedAllTxs.map(t => cycleTxs.some(cTx => cTx.id === t.id) ? { ...t, periodId } : t);
                                setTransactions(archivedTxs);
                                showToast('این بدهی تسویه گردید و در پرونده دوره‌های پایان‌یافته ثبت شد');
                            } else {
                                setTransactions(updatedAllTxs);
                                showToast('بازپرداخت بدهی با موفقیت ثبت شد');
                            }
                        } else {
                            setTransactions(updatedAllTxs);
                            showToast('بازپرداخت بدهی با موفقیت ثبت شد');
                        }
                    }
                } else if (wizardType === 'demand_repayment') {
                    const amt = Number(repaymentForm.amount) || 0;
                    const targetContact = selectedContact || (contacts.length > 0 ? contacts[0] : null);

                    if (wizardMode === 'edit' && repaymentForm.id) {
                        const existingTx = transactions.find(t => t.id === repaymentForm.id);
                        const oldAmt = existingTx ? Math.abs(existingTx.amount || 0) : 0;
                        const diff = amt - oldAmt;

                        if (targetContact) {
                            const newDemand = Math.max(0, (targetContact.totalDemand || 0) - diff);
                            const updatedContacts = contacts.map(c => {
                                if (c.id === targetContact.id) {
                                    return { ...c, totalDemand: newDemand };
                                }
                                return c;
                            });
                            setContacts(updatedContacts);
                            if (selectedContact && selectedContact.id === targetContact.id) {
                                setSelectedContact(prev => ({ ...prev, totalDemand: newDemand }));
                            }
                        }

                        const updatedTxs = transactions.map(t => {
                            if (t.id === repaymentForm.id) {
                                return { ...t, amount: -amt, dateStr: dateStr, notes: repaymentForm.notes };
                            }
                            return t;
                        });
                        setTransactions(updatedTxs);
                        showToast('بازپرداخت طلب با موفقیت به‌روزرسانی شد');
                    } else if (targetContact) {
                        const newDemand = Math.max(0, (targetContact.totalDemand || 0) - amt);
                        const updatedContacts = contacts.map(c => {
                            if (c.id === targetContact.id) {
                                return { ...c, totalDemand: newDemand };
                            }
                            return c;
                        });
                        setContacts(updatedContacts);
                        if (selectedContact && selectedContact.id === targetContact.id) {
                            setSelectedContact(prev => ({ ...prev, totalDemand: newDemand }));
                        }

                        const newTx = {
                            id: Date.now(),
                            contactId: targetContact.id,
                            type: 'demand_repayment',
                            title: `بازپرداخت طلب از ${targetContact.firstName} ${targetContact.lastName}`,
                            dateStr: dateStr,
                            amount: -amt,
                            notes: repaymentForm.notes,
                            isPositive: false
                        };
                        const updatedAllTxs = [newTx, ...transactions];

                        if (newDemand === 0) {
                            const cycleTxs = updatedAllTxs.filter(t => t.contactId === targetContact.id && (t.type === 'demand' || t.type === 'demand_repayment') && !t.periodId);
                            if (cycleTxs.length > 0) {
                                let totalCycleAmt = 0;
                                cycleTxs.forEach(t => { if (t.type === 'demand') totalCycleAmt += Math.abs(t.amount); });
                                const periodId = 'p_demand_' + Date.now();
                                const newPeriod = {
                                    id: periodId,
                                    contactId: targetContact.id,
                                    contactName: `${targetContact.firstName} ${targetContact.lastName}`,
                                    type: 'demand',
                                    title: `دوره تسویه‌شده طلب از ${targetContact.firstName} ${targetContact.lastName}`,
                                    totalAmount: totalCycleAmt || amt,
                                    startDate: cycleTxs[cycleTxs.length - 1]?.dateStr || dateStr,
                                    endDate: dateStr,
                                    transactions: cycleTxs
                                };
                                setCompletedPeriods(prev => [newPeriod, ...prev]);
                                const archivedTxs = updatedAllTxs.map(t => cycleTxs.some(cTx => cTx.id === t.id) ? { ...t, periodId } : t);
                                setTransactions(archivedTxs);
                                showToast('این طلب تسویه گردید و در پرونده دوره‌های پایان‌یافته ثبت شد');
                            } else {
                                setTransactions(updatedAllTxs);
                                showToast('بازپرداخت طلب با موفقیت ثبت شد');
                            }
                        } else {
                            setTransactions(updatedAllTxs);
                            showToast('بازپرداخت طلب با موفقیت ثبت شد');
                        }
                    }
                } else if (wizardType === 'contact') {
                    const fn = contactWizardForm.firstName.trim();
                    const ln = contactWizardForm.lastName.trim();
                    const ph = contactWizardForm.phone.trim();
                    const card = contactWizardForm.bankCard.trim();
                    const ib = contactWizardForm.iban.trim();
                    const bName = contactWizardForm.bankName || getBankNameFromCard(card) || '';

                    if (wizardMode === 'edit' && contactWizardForm.id) {
                        const updatedContacts = contacts.map(c => {
                            if (c.id === contactWizardForm.id) {
                                return {
                                    ...c,
                                    firstName: fn,
                                    lastName: ln,
                                    phone: ph,
                                    bankName: bName,
                                    bankCard: card,
                                    iban: ib
                                };
                            }
                            return c;
                        });
                        setContacts(updatedContacts);
                        const currentUpdated = updatedContacts.find(c => c.id === contactWizardForm.id);
                        if (currentUpdated) setSelectedContact(currentUpdated);
                        showToast('اطلاعات مخاطب با موفقیت به‌روزرسانی شد');
                    } else {
                        const newContact = {
                            id: Date.now(),
                            firstName: fn,
                            lastName: ln,
                            phone: ph,
                            bankName: bName,
                            bankCard: card,
                            iban: ib,
                            totalDemand: 0,
                            totalDebt: 0,
                            monthlyInstallment: 0,
                            isFavorite: false
                        };
                        setContacts([newContact, ...contacts]);
                        showToast('مخاطب جدید با موفقیت اضافه شد');
                    }
                }

                setShowStackWizard(false);
            };

            // Stack Wizard Close & Mobile Editing Handlers
            const closeStackWizard = (force = false) => {
                if (!force && modifiedCardIds.length > 0) {
                    setShowUnsavedConfirmDialog(true);
                    return;
                }
                setEditingCardId(null);
                setModifiedCardIds([]);
                setCardFormBackup(null);
                setShowUnsavedConfirmDialog(false);
                setShowStackWizard(false);
            };

            const startEditingCard = (card) => {
                setEditingCardId(card.id);
                setCardFormBackup({
                    loanForm: { ...loanForm },
                    demandDebtForm: { ...demandDebtForm },
                    installmentForm: { ...installmentForm },
                    repaymentForm: { ...repaymentForm },
                    contactWizardForm: { ...contactWizardForm },
                    pickerDay,
                    pickerMonth,
                    pickerYear
                });
            };

            const handleStartEditingCard = (card) => {
                if (editingCardId !== null) return;

                const container = editCardsContainerRef.current;
                const cardElem = document.getElementById(`sticky-card-${card.id}`);

                if (container && cardElem) {
                    const containerRect = container.getBoundingClientRect();
                    const cardRect = cardElem.getBoundingClientRect();
                    const offsetTop = cardRect.top - containerRect.top;
                    const targetScrollTop = container.scrollTop + offsetTop;

                    container.scrollTo({
                        top: Math.max(0, targetScrollTop),
                        behavior: 'smooth'
                    });

                    setTimeout(() => {
                        startEditingCard(card);
                        setTimeout(() => {
                            const targetInput = cardElem.querySelector('input:not([type="hidden"]):not([readonly]), textarea:not([readonly]), select');
                            if (targetInput) {
                                try {
                                    targetInput.focus({ preventScroll: true });
                                } catch (e) {}
                            }
                        }, 60);
                    }, 260);
                } else {
                    startEditingCard(card);
                }
            };

            const cancelEditingCard = () => {
                if (cardFormBackup) {
                    setLoanForm(cardFormBackup.loanForm);
                    setDemandDebtForm(cardFormBackup.demandDebtForm);
                    setInstallmentForm(cardFormBackup.installmentForm);
                    setRepaymentForm(cardFormBackup.repaymentForm);
                    setContactWizardForm(cardFormBackup.contactWizardForm);
                    setPickerDay(cardFormBackup.pickerDay);
                    setPickerMonth(cardFormBackup.pickerMonth);
                    setPickerYear(cardFormBackup.pickerYear);
                }
                setEditingCardId(null);
            };

            const saveEditingCard = (card) => {
                const triggerError = (fKey, msg) => {
                    setValidationErrors({ [fKey]: msg });
                    setShakeCardId(card.id);
                    setTimeout(() => setShakeCardId(null), 450);
                    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                        try { navigator.vibrate([15, 30, 15]); } catch (e) {}
                    }
                };

                let isValid = true;
                if (wizardType === 'loan') {
                    if (card.id === 'title_contact') {
                        if (!loanForm.title.trim()) {
                            triggerError('loan_title', 'لطفاً عنوان وام را وارد کنید');
                            isValid = false;
                        } else if (!loanForm.selectedContactId) {
                            triggerError('loan_contact', 'لطفاً یک مخاطب انتخاب کنید');
                            isValid = false;
                        }
                    } else if (card.id === 'principal_amount') {
                        if ((Number(loanForm.principalAmount) || 0) <= 0) {
                            triggerError('principal_amount', 'لطفاً مبلغ اصل وام را وارد نمایید');
                            isValid = false;
                        }
                    } else if (card.id === 'total_repayment') {
                        if ((Number(loanForm.totalRepayment) || 0) <= 0) {
                            triggerError('total_repayment', 'لطفاً مبلغ کل بازپرداخت را وارد نمایید');
                            isValid = false;
                        }
                    } else if (card.id === 'installment_amount') {
                        if ((Number(loanForm.installmentAmount) || 0) <= 0) {
                            triggerError('installment_amount', 'لطفاً مبلغ هر قسط را وارد نمایید');
                            isValid = false;
                        }
                    }
                } else if (wizardType === 'demand' || wizardType === 'debt') {
                    if (card.id === 'demand_contact' || card.id === 'debt_contact') {
                        if (!demandDebtForm.selectedContactId) {
                            triggerError('contact', 'لطفاً یک مخاطب انتخاب کنید');
                            isValid = false;
                        }
                    } else if (card.id === 'demand_amount' || card.id === 'debt_amount') {
                        if ((Number(demandDebtForm.amount) || 0) <= 0) {
                            triggerError('amount', 'لطفاً مبلغ را وارد نمایید');
                            isValid = false;
                        }
                    }
                } else if (wizardType === 'installment') {
                    if (card.id === 'inst_select_loan') {
                        if (!installmentForm.selectedLoanId) {
                            triggerError('inst_select_loan', 'لطفاً یک وام را انتخاب کنید');
                            isValid = false;
                        }
                    } else if (card.id === 'inst_amount') {
                        if ((Number(installmentForm.amount) || 0) <= 0) {
                            triggerError('inst_amount', 'لطفاً مبلغ پرداخت قسط را وارد نمایید');
                            isValid = false;
                        }
                    }
                } else if (wizardType === 'contact') {
                    if (card.id === 'contact_firstname' || card.id === 'contact_info') {
                        if (!contactWizardForm.firstName.trim()) {
                            triggerError('contact_firstname', 'لطفاً نام مخاطب را وارد کنید');
                            isValid = false;
                        }
                    }
                }

                if (!isValid) return;

                setValidationErrors({});
                if (!modifiedCardIds.includes(card.id)) {
                    setModifiedCardIds(prev => [...prev, card.id]);
                }
                if (wizardMode === 'edit') {
                    saveWizardData();
                }
                setEditingCardId(null);
                showToast('تغییرات کارت ثبت شد');
            };

            const handleSaveAllChanges = () => {
                saveWizardData();
                setModifiedCardIds([]);
                setEditingCardId(null);
                setShowStackWizard(false);
                showToast('تمامی تغییرات با موفقیت ثبت و ذخیره شدند');
            };

            const handleCreateContact = () => {
                if (!newContactForm.firstName) {
                    showToast('نام مخاطب الزامی است');
                    return;
                }
                const newContact = {
                    id: Date.now(),
                    firstName: newContactForm.firstName,
                    lastName: newContactForm.lastName,
                    phone: newContactForm.phone,
                    bankName: newContactForm.bankName,
                    bankCard: newContactForm.bankCard,
                    iban: newContactForm.iban,
                    isPinned: false,
                    activeLoansCount: 0,
                    totalDemand: 0,
                    totalDebt: 0,
                    monthlyInstallment: 0,
                    isFavorite: false
                };
                setContacts([newContact, ...contacts]);
                setShowAddContactModal(false);
                setNewContactForm({ firstName: '', lastName: '', phone: '', bankName: '', bankCard: '', iban: '' });
                showToast('مخاطب جدید افزوده شد');
            };

            const handleUpdateContact = () => {
                if (!editContactForm.firstName) {
                    showToast('نام مخاطب الزامی است');
                    return;
                }
                const updatedContacts = contacts.map(c => {
                    if (c.id === editContactForm.id) {
                        return {
                            ...c,
                            firstName: editContactForm.firstName,
                            lastName: editContactForm.lastName,
                            phone: editContactForm.phone,
                            bankName: editContactForm.bankName,
                            bankCard: editContactForm.bankCard,
                            iban: editContactForm.iban
                        };
                    }
                    return c;
                });
                setContacts(updatedContacts);
                const currentUpdated = updatedContacts.find(c => c.id === editContactForm.id);
                if (currentUpdated) setSelectedContact(currentUpdated);
                setShowEditContactModal(false);
                showToast('اطلاعات مخاطب به‌روزرسانی شد');
            };

            const handleDeleteContact = (contactParam = null, confirmCb = null) => {
                let targetContact = null;
                if (contactParam && typeof contactParam === 'object' && contactParam.id) {
                    targetContact = contactParam;
                } else {
                    const targetContactId = (selectedContact ? selectedContact.id : null) || editContactForm.id;
                    if (targetContactId) {
                        targetContact = contacts.find(c => c.id === targetContactId);
                    }
                }
                if (!targetContact) return;
                const targetContactId = targetContact.id;
                const contactName = targetContact ? `${targetContact.firstName || ''} ${targetContact.lastName || ''}`.trim() : 'این مخاطب';
                const contactLoans = loans.filter(l => l.contactId === targetContactId);
                const contactTxs = transactions.filter(t => t.contactId === targetContactId);

                setConfirmConfig({
                    title: 'حذف مخاطب',
                    message: `آیا از حذف «${contactName}» اطمینان دارید؟ تمامی پرونده‌ها، وام‌ها و تراکنش‌های مربوط به این مخاطب نیز به صورت دائمی پاک خواهند شد.`,
                    details: [
                        `${contactLoans.length} پرونده وام`,
                        `${contactTxs.length} تراکنش مرتبط`
                    ],
                    iconName: 'trash-2',
                    iconBgColor: 'bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400',
                    confirmLabel: 'حذف مخاطب',
                    cancelLabel: 'انصراف',
                    isDestructive: true,
                    onConfirm: () => {
                        if (typeof confirmCb === 'function') confirmCb();
                        setContacts(prev => prev.filter(c => c.id !== targetContactId));
                        setLoans(prev => prev.filter(l => l.contactId !== targetContactId));
                        setTransactions(prev => prev.filter(t => t.contactId !== targetContactId));
                        setShowEditContactModal(false);
                        if (selectedContact && selectedContact.id === targetContactId) {
                            setSelectedContact(null);
                            navigateToTab('contacts', 'back');
                        }
                        setConfirmConfig(null);
                        showToast('مخاطب با موفقیت حذف گردید');
                    },
                    onCancel: () => setConfirmConfig(null)
                });
            };

            const handleDeleteLoanClick = (loan, confirmCb = null) => {
                if (!loan || typeof loan !== 'object') return;
                const loanTxs = transactions.filter(t => t.loanId === loan.id);
                const paymentTxs = loanTxs.filter(t => t.type === 'repayment');
                const totalInstallmentsCount = loan.totalInstallments || loanTxs.length || 0;

                setConfirmConfig({
                    title: 'حذف پرونده وام',
                    message: 'این وام شامل تاریخچه اقساط و تراکنش‌های مربوطه می‌باشد. حذف این وام، تمامی رکوردهای مرتبط را به صورت دائمی پاک خواهد کرد. این عملیات قابل بازگشت نیست.',
                    details: [
                        `${totalInstallmentsCount} قسط`,
                        `${paymentTxs.length} پرداخت ثبت‌شده`,
                        `${loanTxs.length} تراکنش مرتبط`
                    ],
                    iconName: 'trash-2',
                    iconBgColor: 'bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400',
                    confirmLabel: 'حذف',
                    cancelLabel: 'انصراف',
                    isDestructive: true,
                    onConfirm: () => {
                        if (typeof confirmCb === 'function') confirmCb();
                        const loanIdToDelete = loan.id;
                        setLoans(prev => prev.filter(l => l.id !== loanIdToDelete));
                        setTransactions(prev => prev.filter(t => t.loanId !== loanIdToDelete));
                        setSelectedLoan(null);
                        navigateToTab(loanReturnTab || 'accounts', 'back');
                        setConfirmConfig(null);
                        showToast('پرونده وام با موفقیت حذف گردید');
                    },
                    onCancel: () => setConfirmConfig(null)
                });
            };

            const handleDeleteArchivedPeriodClick = (period) => {
                if (!period) return;
                let periodTxs = transactions.filter(t => t.periodId === period.id);
                if (periodTxs.length === 0 && period.transactions && period.transactions.length > 0) {
                    periodTxs = period.transactions;
                }
                const repaymentTxs = periodTxs.filter(t => t.type === 'demand_repayment' || t.type === 'debt_repayment');
                const startDateFormatted = formatDateToNumericJalali(period.startDate) || 'نامشخص';
                const endDateFormatted = formatDateToNumericJalali(period.endDate) || 'امروز';

                setConfirmConfig({
                    title: 'حذف تسویه‌حساب آرشیو شده',
                    message: 'این تسویه‌حساب آرشیو شده شامل تاریخچه کامل تراکنش‌ها می‌باشد. حذف آن، تسویه‌حساب و تمامی تراکنش‌های مربوطه را به صورت دائمی پاک خواهد کرد. این عملیات قابل بازگشت نیست.',
                    details: [
                        `${periodTxs.length} تراکنش مرتبط`,
                        `${repaymentTxs.length} بازپرداخت/دریافت ثبت‌شده`,
                        `دوره: ${startDateFormatted} تا ${endDateFormatted}`
                    ],
                    iconName: 'trash-2',
                    iconBgColor: 'bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400',
                    confirmLabel: 'حذف',
                    cancelLabel: 'انصراف',
                    isDestructive: true,
                    onConfirm: () => {
                        const periodIdToDelete = period.id;
                        setCompletedPeriods(prev => prev.filter(p => p.id !== periodIdToDelete));
                        setTransactions(prev => prev.filter(t => t.periodId !== periodIdToDelete));
                        setSelectedPeriod(null);
                        navigateToTab(loanReturnTab || 'contact-detail', 'back');
                        setConfirmConfig(null);
                        showToast('تسویه‌حساب آرشیو شده با موفقیت حذف گردید');
                    },
                    onCancel: () => setConfirmConfig(null)
                });
            };

            // Totals
            const totalDemand = contacts.reduce((sum, c) => sum + (c.totalDemand || 0), 0);
            const totalDebt = contacts.reduce((sum, c) => sum + (c.totalDebt || 0), 0);

            // Filter contacts
            const filteredContacts = contacts.filter(c => {
                const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
                const nameMatch = fullName.includes(searchQuery.toLowerCase()) || (c.phone && c.phone.includes(searchQuery));
                if (!nameMatch) return false;
                if (contactFilter === 'demand') return c.totalDemand > 0;
                if (contactFilter === 'debt') return c.totalDebt > 0;
                if (contactFilter === 'loan') {
                    const contactLoans = loans.filter(l => l.contactId === c.id);
                    return contactLoans.some(l => 
                        !getLoanNextDueInfo(l, transactions).isCompleted && (l.remainingAmount === undefined || l.remainingAmount > 0)
                    );
                }
                if (contactFilter === 'settled') {
                    const contactLoans = loans.filter(l => l.contactId === c.id);
                    const hasSettledLoan = contactLoans.some(l => 
                        getLoanNextDueInfo(l, transactions).isCompleted || (l.remainingAmount !== undefined && l.remainingAmount <= 0)
                    );
                    const hasSettledDemand = getSettledPeriodCount(c.id, 'demand') > 0;
                    const hasSettledDebt = getSettledPeriodCount(c.id, 'debt') > 0;
                    return hasSettledLoan || hasSettledDemand || hasSettledDebt;
                }
                if (contactFilter === 'favorite') return c.isFavorite;
                return true;
            });

            // Card Deck Lists for Wizards
            const loanWizardCards = [
                {
                    id: 'title_contact',
                    title: 'عنوان وام و مخاطب',
                    render: () => (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">عنوان وام</label>
                                <input 
                                    type="text"
                                    placeholder="مثلاً: وام خرید خودرو، وام مسکن"
                                    value={loanForm.title}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setLoanForm(prev => ({ ...prev, title: val }));
                                        if (val.trim()) {
                                            setValidationErrors(errs => { const { loan_title, ...rest } = errs; return rest; });
                                        }
                                    }}
                                    className={`w-full bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-xs focus:outline-none transition-all ${
                                        validationErrors.loan_title 
                                            ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' 
                                            : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500'
                                    }`}
                                />
                                {validationErrors.loan_title && (
                                    <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">
                                        <Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />
                                        <span>{validationErrors.loan_title}</span>
                                    </p>
                                )}
                            </div>

                            <ContactSelectorCard 
                                contacts={contacts}
                                selectedContactId={loanForm.selectedContactId}
                                onSelect={(c) => {
                                    setLoanForm(prev => ({ ...prev, selectedContactId: c.id, contactName: `${c.firstName} ${c.lastName}` }));
                                    setValidationErrors(errs => { const { loan_contact, ...rest } = errs; return rest; });
                                }}
                                error={validationErrors.loan_contact}
                                wizardType="loan"
                                wizardMode={wizardMode}
                            />
                        </div>
                    )
                },
                {
                    id: 'start_date',
                    title: 'زمان دریافت وام',
                    render: () => (
                        <FullJalaliDatePicker 
                            day={pickerDay}
                            month={pickerMonth}
                            year={pickerYear}
                            onChange={({ day, month, year }) => {
                                setPickerDay(day);
                                setPickerMonth(month);
                                setPickerYear(year);
                                setLoanForm(prev => ({
                                    ...prev,
                                    startDate: `${year}/${String(jalaliMonths.indexOf(month) + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}`,
                                    firstInstallmentYear: year,
                                    firstInstallmentMonth: month,
                                    firstInstallmentDay: day,
                                    dueDayOfMonth: day
                                }));
                            }}
                        />
                    )
                },
                {
                    id: 'principal_amount',
                    title: 'مبلغ اصل وام',
                    render: () => (
                        <div className="space-y-3">
                            <label className="block text-xs text-slate-500 font-bold">مبلغ اصل وامی که دریافت کرده‌اید (تومان):</label>
                            <input 
                                type="text"
                                inputMode="numeric"
                                placeholder="مثلا: ۵۰۰,۰۰۰,۰۰۰"
                                value={formatWithCommas(loanForm.principalAmount)}
                                onChange={(e) => {
                                    const raw = parseRawNumber(e.target.value);
                                    setLoanForm(prev => ({ ...prev, principalAmount: raw }));
                                    if (Number(raw) > 0) {
                                        setValidationErrors(errs => { const { principal_amount, ...rest } = errs; return rest; });
                                    }
                                }}
                                className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${
                                    validationErrors.principal_amount 
                                        ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' 
                                        : 'border-slate-200 dark:border-slate-700'
                                }`}
                            />
                            {validationErrors.principal_amount && (
                                <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">
                                    <Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />
                                    <span>{validationErrors.principal_amount}</span>
                                </p>
                            )}
                            {loanForm.principalAmount && Number(loanForm.principalAmount) > 0 && (
                                <div className="space-y-1.5 mt-2">
                                    <div className="text-xs text-indigo-600 font-bold text-left ltr">
                                        {Number(loanForm.principalAmount).toLocaleString()} تومان
                                    </div>
                                    <div className="p-2.5 bg-indigo-50/80 dark:bg-indigo-950/60 rounded-xl text-xs font-bold text-indigo-900 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800/40">
                                        {numToPersianWords(loanForm.principalAmount)}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                },
                {
                    id: 'total_repayment',
                    title: 'مبلغ کل بازپرداخت',
                    render: () => (
                        <div className="space-y-3">
                            <label className="block text-xs text-slate-500 font-bold">مجموع کل مبلغ بازپرداخت شامل اصل و کارمزد:</label>
                            <input 
                                type="text"
                                inputMode="numeric"
                                placeholder="مثلا: ۵۵۰,۰۰۰,۰۰۰"
                                value={formatWithCommas(loanForm.totalRepayment)}
                                onChange={(e) => {
                                    const raw = parseRawNumber(e.target.value);
                                    setLoanForm(prev => ({ ...prev, totalRepayment: raw }));
                                    if (Number(raw) > 0) {
                                        setValidationErrors(errs => { const { total_repayment, ...rest } = errs; return rest; });
                                    }
                                }}
                                className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${
                                    validationErrors.total_repayment 
                                        ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' 
                                        : 'border-slate-200 dark:border-slate-700'
                                }`}
                            />
                            {validationErrors.total_repayment && (
                                <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">
                                    <Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />
                                    <span>{validationErrors.total_repayment}</span>
                                </p>
                            )}
                            {loanForm.totalRepayment && Number(loanForm.totalRepayment) > 0 && (
                                <div className="space-y-1.5 mt-2">
                                    <div className="text-xs text-indigo-600 font-bold text-left ltr">
                                        {Number(loanForm.totalRepayment).toLocaleString()} تومان
                                    </div>
                                    <div className="p-2.5 bg-indigo-50/80 dark:bg-indigo-950/60 rounded-xl text-xs font-bold text-indigo-900 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800/40">
                                        {numToPersianWords(loanForm.totalRepayment)}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                },
                {
                    id: 'installment_amount',
                    title: 'مبلغ هر قسط',
                    render: () => (
                        <div className="space-y-3">
                            <label className="block text-xs text-slate-500 font-bold">مبلغ هر قسط ماهانه (تومان):</label>
                            <input 
                                type="text"
                                inputMode="numeric"
                                placeholder="مثلا: ۲۸,۰۰۰,۰۰۰"
                                value={formatWithCommas(loanForm.installmentAmount)}
                                onChange={(e) => {
                                    const raw = parseRawNumber(e.target.value);
                                    setLoanForm(prev => ({ ...prev, installmentAmount: raw }));
                                    if (Number(raw) > 0) {
                                        setValidationErrors(errs => { const { installment_amount, ...rest } = errs; return rest; });
                                    }
                                }}
                                className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${
                                    validationErrors.installment_amount 
                                        ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' 
                                        : 'border-slate-200 dark:border-slate-700'
                                }`}
                            />
                            {validationErrors.installment_amount && (
                                <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">
                                    <Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />
                                    <span>{validationErrors.installment_amount}</span>
                                </p>
                            )}
                            {loanForm.installmentAmount && Number(loanForm.installmentAmount) > 0 && (
                                <div className="p-2.5 bg-indigo-50/80 dark:bg-indigo-950/60 rounded-xl text-xs font-bold text-indigo-900 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800/40 mt-1.5">
                                    {numToPersianWords(loanForm.installmentAmount)}
                                </div>
                            )}
                            {loanForm.installmentAmount && Number(loanForm.installmentAmount) > 0 && (() => {
                                const baseAmount = Number(loanForm.totalRepayment) > 0 ? Number(loanForm.totalRepayment) : Number(loanForm.principalAmount);
                                const instAmt = Number(loanForm.installmentAmount);
                                if (baseAmount > 0 && instAmt > 0) {
                                    const defaultNumInst = Math.ceil(baseAmount / instAmt);
                                    const hasCustom = loanForm.customInstallmentCount !== undefined && loanForm.customInstallmentCount !== '';
                                    const displayVal = hasCustom ? loanForm.customInstallmentCount : String(defaultNumInst);
                                    const currentNumInst = (hasCustom && !isNaN(Number(loanForm.customInstallmentCount)) && Number(loanForm.customInstallmentCount) > 0)
                                        ? Number(loanForm.customInstallmentCount)
                                        : defaultNumInst;
                                    const totalCalc = currentNumInst * instAmt;
                                    const diff = totalCalc - baseAmount;

                                    return (
                                        <div className="space-y-2 mt-2">
                                            {/* Compact Header Row for Installment Count */}
                                            <div className="p-2.5 bg-indigo-50/70 dark:bg-indigo-950/50 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/50 flex items-center justify-between gap-2">
                                                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 shrink-0">تعداد کل اقساط:</span>

                                                <div className="flex items-center space-x-1.5 space-x-reverse">
                                                    {/* Minus Button */}
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            const cur = Number(displayVal) || defaultNumInst;
                                                            const newVal = Math.max(1, cur - 1);
                                                            setLoanForm(prev => ({ ...prev, customInstallmentCount: String(newVal) }));
                                                        }}
                                                        className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 font-extrabold text-lg flex items-center justify-center shadow-2xs hover:bg-indigo-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer shrink-0">
                                                        -
                                                    </button>

                                                    {/* Count Input Box with Faint 'قسط' Text */}
                                                    <div className="relative w-16 h-9 flex items-center">
                                                        <input 
                                                            type="text" 
                                                            inputMode="numeric"
                                                            placeholder="قسط"
                                                            value={displayVal} 
                                                            onChange={(e) => {
                                                                const raw = e.target.value.replace(/\D/g, '');
                                                                setLoanForm(prev => ({ ...prev, customInstallmentCount: raw }));
                                                            }}
                                                            onBlur={() => {
                                                                if (loanForm.customInstallmentCount === '') {
                                                                    setLoanForm(prev => ({ ...prev, customInstallmentCount: undefined }));
                                                                }
                                                            }}
                                                            className="w-full h-full text-center font-mono bg-white dark:bg-slate-900 border-2 border-indigo-400 dark:border-indigo-600 rounded-xl px-1 text-sm font-black text-indigo-700 dark:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-300 dark:placeholder:text-slate-600 placeholder:font-normal"
                                                        />
                                                    </div>

                                                    {/* Plus Button */}
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            const cur = Number(displayVal) || defaultNumInst;
                                                            const newVal = cur + 1;
                                                            setLoanForm(prev => ({ ...prev, customInstallmentCount: String(newVal) }));
                                                        }}
                                                        className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 font-extrabold text-lg flex items-center justify-center shadow-2xs hover:bg-indigo-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer shrink-0">
                                                        +
                                                    </button>

                                                    {/* Square Green Refresh Button (Directly Left of + in RTL) */}
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            setLoanForm(prev => ({ ...prev, customInstallmentCount: undefined }));
                                                            showToast('تعداد اقساط مجدداً طبق فرمول محاسبه شد');
                                                        }}
                                                        title="محاسبه مجدد تعداد اقساط طبق فرمول"
                                                        className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-2xs hover:bg-emerald-100 dark:hover:bg-emerald-900/50 active:scale-95 transition-all cursor-pointer shrink-0">
                                                        <Icon name="rotate-cw" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Financial Balance Remainder Card with Color Coding */}
                                            {diff === 0 ? (
                                                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between shadow-2xs">
                                                    <div className="flex items-center space-x-1.5 space-x-reverse">
                                                        <Icon name="check-circle-2" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                                        <span>تراز مالی اقساط:</span>
                                                    </div>
                                                    <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400">تراز دقیق (بدون باقیمانده)</span>
                                                </div>
                                            ) : diff > 0 ? (
                                                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 rounded-xl text-xs font-bold text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800 flex items-center justify-between shadow-2xs">
                                                    <div className="flex items-center space-x-1.5 space-x-reverse">
                                                        <Icon name="info" className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                                                        <span>تراز مالی باقیمانده (اضافه):</span>
                                                    </div>
                                                    <span className="font-mono text-xs dir-ltr font-black text-blue-700 dark:text-blue-300">
                                                        +{diff.toLocaleString()} تومان
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="p-2.5 bg-rose-50 dark:bg-rose-950/60 rounded-xl text-xs font-bold text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800 flex items-center justify-between shadow-2xs">
                                                    <div className="flex items-center space-x-1.5 space-x-reverse">
                                                        <Icon name="alert-triangle" className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                                                        <span>تراز مالی باقیمانده (کسری):</span>
                                                    </div>
                                                    <span className="font-mono text-xs dir-ltr font-black text-rose-600 dark:text-rose-400">
                                                        {diff.toLocaleString()} تومان
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                                return null;
                            })()}
                        </div>
                    )
                },
                {
                    id: 'due_date',
                    title: 'تاریخ اولین قسط وام',
                    render: () => {
                        const activeDueDay = loanForm.firstInstallmentDay || loanForm.dueDayOfMonth || pickerDay;
                        const curMonthName = loanForm.firstInstallmentMonth || pickerMonth;
                        const curYear = loanForm.firstInstallmentYear !== undefined && loanForm.firstInstallmentYear !== null && loanForm.firstInstallmentYear !== '' ? loanForm.firstInstallmentYear : pickerYear;

                        const rawYearNum = parseInt(toEnglishDigits(String(curYear)).replace(/\D/g, ''), 10);
                        const activeYear = (!isNaN(rawYearNum) && rawYearNum > 1300 && rawYearNum < 1500) ? rawYearNum : (pickerYear || 1403);

                        const monthIdx = jalaliMonths.indexOf(curMonthName) + 1;
                        const monthStr = String(monthIdx > 0 ? monthIdx : 1).padStart(2, '0');
                        const dayStr = String(activeDueDay).padStart(2, '0');
                        const yearStr = String(activeYear);
                        const formattedDueDateStr = `${yearStr}/${monthStr}/${dayStr}`;

                        const handleNextMonth = () => {
                            const curIdx = jalaliMonths.indexOf(curMonthName);
                            let nextIdx = curIdx + 1;
                            let nextYear = activeYear;
                            if (nextIdx >= 12) {
                                nextIdx = 0;
                                nextYear = activeYear + 1;
                            }
                            setLoanForm(prev => ({
                                ...prev,
                                firstInstallmentMonth: jalaliMonths[nextIdx],
                                firstInstallmentYear: nextYear
                            }));
                        };

                        const handlePrevMonth = () => {
                            const curIdx = jalaliMonths.indexOf(curMonthName);
                            let prevIdx = curIdx - 1;
                            let prevYear = activeYear;
                            if (prevIdx < 0) {
                                prevIdx = 11;
                                prevYear = activeYear - 1;
                            }
                            setLoanForm(prev => ({
                                ...prev,
                                firstInstallmentMonth: jalaliMonths[prevIdx],
                                firstInstallmentYear: prevYear
                            }));
                        };

                        return (
                            <div className="space-y-2">
                                <label className="block text-xs text-slate-500 font-bold">تاریخ و ماه اولین قسط وام:</label>
                                <div className="bg-[#F4F7FC] dark:bg-slate-900 rounded-2xl p-2.5 border border-slate-200 dark:border-slate-800 space-y-2">
                                    
                                    {/* Top Box for Month Selection: Right = Prev Month, Left = Next Month */}
                                    <div className="p-2 bg-indigo-50/90 dark:bg-indigo-950/70 rounded-xl border border-indigo-200/80 dark:border-indigo-800/60 flex items-center justify-between shadow-2xs">
                                        {/* Right Button (Previous Month) */}
                                        <button 
                                            type="button"
                                            onClick={handlePrevMonth}
                                            title="ماه قبل"
                                            className="p-1 rounded-lg bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 shadow-2xs hover:bg-indigo-100 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center cursor-pointer shrink-0">
                                            <Icon name="chevron-right" className="w-4 h-4" />
                                        </button>

                                        {/* Month & Year Display Box */}
                                        <div className="text-center min-w-0 px-2 flex flex-col items-center">
                                            <div className="text-[9px] text-indigo-700/80 dark:text-indigo-300/80 font-bold">ماه و سال اولین قسط</div>
                                            <div className="flex items-center justify-center gap-1.5 mt-0.5">
                                                <span className="text-xs sm:text-sm font-extrabold text-indigo-900 dark:text-indigo-100">{curMonthName}</span>
                                                <input 
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    dir="ltr"
                                                    value={curYear}
                                                    onFocus={(e) => e.target.select()}
                                                    onClick={(e) => e.target.select()}
                                                    onChange={(e) => {
                                                        const raw = toEnglishDigits(e.target.value).replace(/\D/g, '');
                                                        const clean = raw.slice(0, 4);
                                                        setLoanForm(prev => ({
                                                            ...prev,
                                                            firstInstallmentYear: clean ? (clean.length === 4 ? parseInt(clean, 10) : clean) : ''
                                                        }));
                                                    }}
                                                    onBlur={() => {
                                                        const num = parseInt(toEnglishDigits(String(loanForm.firstInstallmentYear)).replace(/\D/g, ''), 10);
                                                        if (isNaN(num) || num < 1300 || num > 1500) {
                                                            setLoanForm(prev => ({ ...prev, firstInstallmentYear: activeYear }));
                                                        } else {
                                                            setLoanForm(prev => ({ ...prev, firstInstallmentYear: num }));
                                                        }
                                                    }}
                                                    className="w-14 h-6 text-center font-extrabold text-xs text-indigo-900 dark:text-indigo-100 bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-600 rounded-md shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono transition-all cursor-pointer"
                                                    title="جهت تغییر سال کلیک کنید"
                                                />
                                            </div>
                                        </div>

                                        {/* Left Button (Next Month) */}
                                        <button 
                                            type="button"
                                            onClick={handleNextMonth}
                                            title="ماه بعد"
                                            className="p-1 rounded-lg bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 shadow-2xs hover:bg-indigo-100 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center cursor-pointer shrink-0">
                                            <Icon name="chevron-left" className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Summary Badge formatted as YYYY/MM/DD */}
                                    <div className="p-1.5 bg-blue-50/80 dark:bg-indigo-900/40 rounded-xl text-center text-xs font-bold text-blue-800 dark:text-blue-200 border border-blue-200/60 dark:border-indigo-800/40 shadow-2xs flex items-center justify-center space-x-1.5 space-x-reverse">
                                        <span>سررسید اولین قسط:</span>
                                        <span className="font-mono text-xs tracking-wider font-extrabold dir-ltr text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-700 shadow-2xs">{formattedDueDateStr}</span>
                                    </div>

                                    {/* Days Grid (1 to 31, without top label) */}
                                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold pt-0.5">
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                            <button 
                                                key={day}
                                                type="button"
                                                onClick={() => setLoanForm(prev => ({ ...prev, dueDayOfMonth: day, firstInstallmentDay: day }))}
                                                className={`h-6 sm:h-6.5 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                                                    activeDueDay === day 
                                                        ? 'bg-indigo-600 text-white font-black shadow-md scale-105' 
                                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                                                }`}>
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                },
                {
                    id: 'notes',
                    title: 'توضیحات تکمیلی',
                    render: () => (
                        <div className="space-y-3">
                            <label className="block text-xs text-slate-500">یادداشت یا توضیحات اضافی برای این پرونده وام:</label>
                            <textarea 
                                rows="3"
                                placeholder="شماره قرارداد، نام ضامن یا جزییات حساب..."
                                value={loanForm.notes}
                                onChange={(e) => setLoanForm({...loanForm, notes: e.target.value})}
                                className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs focus:outline-none"
                            ></textarea>
                        </div>
                    )
                }
            ];

            const demandWizardCards = [
                {
                    id: 'demand_contact',
                    title: 'انتخاب مخاطب',
                    render: () => (
                        <ContactSelectorCard 
                            contacts={contacts}
                            selectedContactId={demandDebtForm.selectedContactId}
                            onSelect={(c) => {
                                setDemandDebtForm(prev => ({ ...prev, selectedContactId: c.id }));
                                setValidationErrors(errs => { const { demand_contact, ...rest } = errs; return rest; });
                            }}
                            error={validationErrors.demand_contact}
                            wizardType="demand"
                            wizardMode={wizardMode}
                        />
                    )
                },
                {
                    id: 'demand_amount',
                    title: 'مبلغ طلب',
                    render: () => (
                        <div className="space-y-3">
                            <label className="block text-xs text-slate-500 font-bold">مبلغ طلب (تومان):</label>
                            <input 
                                type="text"
                                inputMode="numeric"
                                placeholder="مثلاً: ۵,۰۰۰,۰۰۰"
                                value={formatWithCommas(demandDebtForm.amount)}
                                onChange={(e) => {
                                    const raw = parseRawNumber(e.target.value);
                                    setDemandDebtForm(prev => ({ ...prev, amount: raw }));
                                    if (Number(raw) > 0) {
                                        setValidationErrors(errs => { const { demand_amount, ...rest } = errs; return rest; });
                                    }
                                }}
                                className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${
                                    validationErrors.demand_amount 
                                        ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' 
                                        : 'border-slate-200 dark:border-slate-700'
                                }`}
                            />
                            {validationErrors.demand_amount && (
                                <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">
                                    <Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />
                                    <span>{validationErrors.demand_amount}</span>
                                </p>
                            )}
                            {demandDebtForm.amount && Number(demandDebtForm.amount) > 0 && (
                                <div className="space-y-1.5 mt-2">
                                    <div className="text-xs text-emerald-600 font-bold text-left ltr">
                                        {Number(demandDebtForm.amount).toLocaleString()} تومان
                                    </div>
                                    <div className="p-2.5 bg-emerald-50/80 dark:bg-emerald-950/60 rounded-xl text-xs font-bold text-emerald-900 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-800/40">
                                        {numToPersianWords(demandDebtForm.amount)}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                },
                {
                    id: 'demand_date',
                    title: 'تاریخ طلب',
                    render: () => (
                        <FullJalaliDatePicker 
                            day={pickerDay}
                            month={pickerMonth}
                            year={pickerYear}
                            onChange={({ day, month, year }) => {
                                setPickerDay(day);
                                setPickerMonth(month);
                                setPickerYear(year);
                            }}
                        />
                    )
                },
                {
                    id: 'demand_notes',
                    title: 'توضیحات تکمیلی',
                    render: () => (
                        <div className="space-y-3">
                            <label className="block text-xs text-slate-500 font-bold">توضیحات و بابت طلب:</label>
                            <textarea 
                                rows="3"
                                placeholder="توضیحات مربوط به طلب..."
                                value={demandDebtForm.notes}
                                onChange={(e) => setDemandDebtForm({...demandDebtForm, notes: e.target.value})}
                                className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs focus:outline-none"
                            ></textarea>
                        </div>
                    )
                }
            ];

            const debtWizardCards = [
                {
                    id: 'debt_contact',
                    title: 'انتخاب مخاطب',
                    render: () => (
                        <ContactSelectorCard 
                            contacts={contacts}
                            selectedContactId={demandDebtForm.selectedContactId}
                            onSelect={(c) => {
                                setDemandDebtForm(prev => ({ ...prev, selectedContactId: c.id }));
                                setValidationErrors(errs => { const { debt_contact, ...rest } = errs; return rest; });
                            }}
                            error={validationErrors.debt_contact}
                            wizardType="debt"
                            wizardMode={wizardMode}
                        />
                    )
                },
                {
                    id: 'debt_amount',
                    title: 'مبلغ قرض',
                    render: () => (
                        <div className="space-y-3">
                            <label className="block text-xs text-slate-500 font-bold">مبلغ قرض (تومان):</label>
                            <input 
                                type="text"
                                inputMode="numeric"
                                placeholder="مثلاً: ۲,۰۰۰,۰۰۰"
                                value={formatWithCommas(demandDebtForm.amount)}
                                onChange={(e) => {
                                    const raw = parseRawNumber(e.target.value);
                                    setDemandDebtForm(prev => ({ ...prev, amount: raw }));
                                    if (Number(raw) > 0) {
                                        setValidationErrors(errs => { const { debt_amount, ...rest } = errs; return rest; });
                                    }
                                }}
                                className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${
                                    validationErrors.debt_amount 
                                        ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' 
                                        : 'border-slate-200 dark:border-slate-700'
                                }`}
                            />
                            {validationErrors.debt_amount && (
                                <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">
                                    <Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />
                                    <span>{validationErrors.debt_amount}</span>
                                </p>
                            )}
                            {demandDebtForm.amount && Number(demandDebtForm.amount) > 0 && (
                                <div className="space-y-1.5 mt-2">
                                    <div className="text-xs text-rose-500 font-bold text-left ltr">
                                        {Number(demandDebtForm.amount).toLocaleString()} تومان
                                    </div>
                                    <div className="p-2.5 bg-rose-50/80 dark:bg-rose-950/60 rounded-xl text-xs font-bold text-rose-900 dark:text-rose-200 border border-rose-200/60 dark:border-rose-800/40">
                                        {numToPersianWords(demandDebtForm.amount)}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                },
                {
                    id: 'debt_date',
                    title: 'تاریخ قرض',
                    render: () => (
                        <FullJalaliDatePicker 
                            day={pickerDay}
                            month={pickerMonth}
                            year={pickerYear}
                            onChange={({ day, month, year }) => {
                                setPickerDay(day);
                                setPickerMonth(month);
                                setPickerYear(year);
                            }}
                        />
                    )
                },
                {
                    id: 'debt_notes',
                    title: 'توضیحات تکمیلی',
                    render: () => (
                        <div className="space-y-3">
                            <label className="block text-xs text-slate-500 font-bold">توضیحات تکمیلی:</label>
                            <textarea 
                                rows="3"
                                placeholder="توضیحات بابت قرض..."
                                value={demandDebtForm.notes}
                                onChange={(e) => setDemandDebtForm({...demandDebtForm, notes: e.target.value})}
                                className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs focus:outline-none"
                            ></textarea>
                        </div>
                    )
                }
            ];

            const installmentWizardCards = [
                {
                    id: 'inst_select_loan',
                    title: 'انتخاب وام',
                    render: () => (
                        <LoanSelectorCard 
                            loans={loans}
                            transactions={transactions}
                            contacts={contacts}
                            selectedLoanId={installmentForm.selectedLoanId}
                            editingTxId={installmentForm.id}
                            onSelectLoan={(l) => {
                                const nextD = getInstallmentNextDueDate(l, transactions);
                                setPickerDay(nextD.day);
                                setPickerMonth(nextD.month);
                                setPickerYear(nextD.year);
                                setInstallmentForm(prev => ({ ...prev, selectedLoanId: l.id, amount: l.installmentAmount }));
                                setValidationErrors(errs => { const { inst_select_loan, ...rest } = errs; return rest; });
                            }}
                            error={validationErrors.inst_select_loan}
                            wizardMode={wizardMode}
                        />
                    )
                },
                {
                    id: 'inst_date',
                    title: 'تاریخ پرداخت',
                    render: () => (
                        <FullJalaliDatePicker 
                            day={pickerDay}
                            month={pickerMonth}
                            year={pickerYear}
                            onChange={({ day, month, year }) => {
                                setPickerDay(day);
                                setPickerMonth(month);
                                setPickerYear(year);
                            }}
                        />
                    )
                },
                {
                    id: 'inst_amount',
                    title: 'مبلغ پرداخت',
                    render: () => {
                        const targetLoan = loans.find(l => l.id === Number(installmentForm.selectedLoanId));
                        const editingTx = installmentForm.id ? transactions.find(t => t.id === installmentForm.id) : null;
                        const editingTxAmt = (editingTx && targetLoan && editingTx.loanId === targetLoan.id) ? Math.abs(editingTx.amount || 0) : 0;
                        const loanPaid = targetLoan 
                            ? transactions.filter(t => t.loanId === targetLoan.id && t.type === 'repayment').reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)
                            : 0;
                        const loanPaidExceptCurrent = Math.max(0, loanPaid - editingTxAmt);
                        const loanTotal = targetLoan ? ((targetLoan.totalRepayment > 0) ? targetLoan.totalRepayment : targetLoan.principalAmount) : 0;
                        const loanRemaining = Math.max(0, loanTotal - loanPaidExceptCurrent);
                        const inputAmt = Number(installmentForm.amount) || 0;
                        const isOver = targetLoan && inputAmt > loanRemaining;

                        return (
                            <div className="space-y-3">
                                <label className="block text-xs text-slate-500 font-bold">مبلغ پرداخت قسط (بارگذاری شده از وام - قابل ویرایش):</label>
                                <input 
                                    type="text"
                                    inputMode="numeric"
                                    value={formatWithCommas(installmentForm.amount)}
                                    onChange={(e) => {
                                        const raw = parseRawNumber(e.target.value);
                                        setInstallmentForm(prev => ({ ...prev, amount: raw }));
                                        if (Number(raw) > 0) {
                                            setValidationErrors(errs => { const { inst_amount, ...rest } = errs; return rest; });
                                        }
                                    }}
                                    className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${
                                        validationErrors.inst_amount || isOver
                                            ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' 
                                            : 'border-slate-200 dark:border-slate-700'
                                    }`}
                                />
                                {validationErrors.inst_amount && (
                                    <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">
                                        <Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />
                                        <span>{validationErrors.inst_amount}</span>
                                    </p>
                                )}
                                {inputAmt > 0 && (
                                    <div className="space-y-1.5 mt-2">
                                        <div className="text-xs text-indigo-600 font-bold text-left ltr">
                                            {inputAmt.toLocaleString()} تومان
                                        </div>
                                        <div className="p-2.5 bg-indigo-50/80 dark:bg-indigo-950/60 rounded-xl text-xs font-bold text-indigo-900 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800/40">
                                            {numToPersianWords(installmentForm.amount)}
                                        </div>
                                    </div>
                                )}
                                
                                {targetLoan && (
                                    <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl space-y-1.5 border border-slate-200 dark:border-slate-700">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-500 dark:text-slate-400 font-medium">کل مانده پرداختی وام:</span>
                                            <span className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                                                {loanRemaining.toLocaleString()} تومان
                                            </span>
                                        </div>
                                        {isOver && (
                                            <div className="p-2 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 rounded-lg text-xs font-bold border border-rose-200 dark:border-rose-800 flex items-center space-x-1.5 space-x-reverse">
                                                <Icon name="alert-circle" className="w-4 h-4 shrink-0" />
                                                <span>مبلغ وارد شده بیشتر از مانده کل وام ({loanRemaining.toLocaleString()} تومان) است!</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    }
                },
                {
                    id: 'inst_notes',
                    title: 'توضیحات تکمیلی',
                    render: () => (
                        <div className="space-y-3">
                            <label className="block text-xs text-slate-500 font-bold">توضیحات یا شماره پیگیری پرداخت:</label>
                            <textarea 
                                rows="3"
                                placeholder="شماره ارجاع، کد پیگیری و..."
                                value={installmentForm.notes}
                                onChange={(e) => setInstallmentForm({...installmentForm, notes: e.target.value})}
                                className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs focus:outline-none"
                            ></textarea>
                        </div>
                    )
                }
            ];

            const debtRepaymentWizardCards = [
                {
                    id: 'debt_repay_contact',
                    title: 'انتخاب مخاطب',
                    render: () => (
                        <ContactSelectorCard 
                            contacts={contacts}
                            selectedContactId={demandDebtForm.selectedContactId}
                            onSelect={(c) => {
                                setDemandDebtForm(prev => ({ ...prev, selectedContactId: c.id }));
                                setValidationErrors(errs => { const { debt_repay_contact, ...rest } = errs; return rest; });
                            }}
                            error={validationErrors.debt_repay_contact}
                            wizardType="debt_repayment"
                            wizardMode={wizardMode}
                        />
                    )
                },
                {
                    id: 'debt_repay_amount',
                    title: 'مبلغ بازپرداخت بدهی',
                    render: () => {
                        const targetContact = contacts.find(c => c.id === Number(demandDebtForm.selectedContactId));
                        const editingTx = repaymentForm.id ? transactions.find(t => t.id === repaymentForm.id) : null;
                        const editingTxAmt = editingTx ? Math.abs(editingTx.amount || 0) : 0;
                        const totalDebt = (targetContact ? (targetContact.totalDebt || 0) : 0) + editingTxAmt;
                        const inputAmt = Number(repaymentForm.amount) || 0;
                        const isOver = inputAmt > totalDebt;

                        return (
                            <div className="space-y-3">
                                <label className="block text-xs text-slate-500 font-bold">
                                    مبلغ پرداختی جهت کسر از بدهی به {targetContact ? `${targetContact.firstName} ${targetContact.lastName}` : 'مخاطب'} (تومان):
                                </label>
                                <input 
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="مثلاً: ۵۰۰,۰۰۰"
                                    value={formatWithCommas(repaymentForm.amount)}
                                    onChange={(e) => {
                                        const raw = parseRawNumber(e.target.value);
                                        setRepaymentForm(prev => ({ ...prev, amount: raw }));
                                        if (Number(raw) > 0) {
                                            setValidationErrors(errs => { const { debt_repay_amount, ...rest } = errs; return rest; });
                                        }
                                    }}
                                    className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${
                                        validationErrors.debt_repay_amount || isOver 
                                            ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' 
                                            : 'border-slate-200 dark:border-slate-700'
                                    }`}
                                />
                                {validationErrors.debt_repay_amount && (
                                    <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">
                                        <Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />
                                        <span>{validationErrors.debt_repay_amount}</span>
                                    </p>
                                )}
                                {inputAmt > 0 && (
                                    <div className="space-y-1.5 mt-2">
                                        <div className="text-xs text-rose-500 font-bold text-left ltr">
                                            {inputAmt.toLocaleString()} تومان
                                        </div>
                                        <div className="p-2.5 bg-rose-50/80 dark:bg-rose-950/60 rounded-xl text-xs font-bold text-rose-900 dark:text-rose-200 border border-rose-200/60 dark:border-rose-800/40">
                                            {numToPersianWords(repaymentForm.amount)}
                                        </div>
                                    </div>
                                )}

                                <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl space-y-1.5 border border-slate-200 dark:border-slate-700">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-500 dark:text-slate-400 font-medium">کل بدهی به این مخاطب:</span>
                                        <span className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                                            {totalDebt.toLocaleString()} تومان
                                        </span>
                                    </div>
                                    {isOver && (
                                        <div className="p-2 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 rounded-lg text-xs font-bold border border-rose-200 dark:border-rose-800 flex items-center space-x-1.5 space-x-reverse">
                                            <Icon name="alert-circle" className="w-4 h-4 shrink-0" />
                                            <span>مبلغ وارد شده بیشتر از کل بدهی ({totalDebt.toLocaleString()} تومان) است!</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }
                },
                {
                    id: 'debt_repay_date',
                    title: 'تاریخ بازپرداخت',
                    render: () => (
                        <FullJalaliDatePicker 
                            day={pickerDay}
                            month={pickerMonth}
                            year={pickerYear}
                            onChange={({ day, month, year }) => {
                                setPickerDay(day);
                                setPickerMonth(month);
                                setPickerYear(year);
                            }}
                        />
                    )
                },
                {
                    id: 'debt_repay_notes',
                    title: 'توضیحات تکمیلی',
                    render: () => (
                        <div className="space-y-3">
                            <label className="block text-xs text-slate-500 font-bold">توضیحات و بابت بازپرداخت:</label>
                            <textarea 
                                rows="3"
                                placeholder="شماره پیگیری، فیش و توضیحات..."
                                value={repaymentForm.notes}
                                onChange={(e) => setRepaymentForm({...repaymentForm, notes: e.target.value})}
                                className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs focus:outline-none"
                            ></textarea>
                        </div>
                    )
                }
            ];

            const demandRepaymentWizardCards = [
                {
                    id: 'demand_repay_contact',
                    title: 'انتخاب مخاطب',
                    render: () => (
                        <ContactSelectorCard 
                            contacts={contacts}
                            selectedContactId={demandDebtForm.selectedContactId}
                            onSelect={(c) => {
                                setDemandDebtForm(prev => ({ ...prev, selectedContactId: c.id }));
                                setValidationErrors(errs => { const { demand_repay_contact, ...rest } = errs; return rest; });
                            }}
                            error={validationErrors.demand_repay_contact}
                            wizardType="demand_repayment"
                            wizardMode={wizardMode}
                        />
                    )
                },
                {
                    id: 'demand_repay_amount',
                    title: 'مبلغ بازپرداخت طلب',
                    render: () => {
                        const targetContact = contacts.find(c => c.id === Number(demandDebtForm.selectedContactId));
                        const editingTx = repaymentForm.id ? transactions.find(t => t.id === repaymentForm.id) : null;
                        const editingTxAmt = editingTx ? Math.abs(editingTx.amount || 0) : 0;
                        const totalDemand = (targetContact ? (targetContact.totalDemand || 0) : 0) + editingTxAmt;
                        const inputAmt = Number(repaymentForm.amount) || 0;
                        const isOver = inputAmt > totalDemand;

                        return (
                            <div className="space-y-3">
                                <label className="block text-xs text-slate-500 font-bold">
                                    مبلغ دریافتی جهت کسر از طلب از {targetContact ? `${targetContact.firstName} ${targetContact.lastName}` : 'مخاطب'} (تومان):
                                </label>
                                <input 
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="مثلاً: ۱,۰۰۰,۰۰۰"
                                    value={formatWithCommas(repaymentForm.amount)}
                                    onChange={(e) => {
                                        const raw = parseRawNumber(e.target.value);
                                        setRepaymentForm(prev => ({ ...prev, amount: raw }));
                                        if (Number(raw) > 0) {
                                            setValidationErrors(errs => { const { demand_repay_amount, ...rest } = errs; return rest; });
                                        }
                                    }}
                                    className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${
                                        validationErrors.demand_repay_amount || isOver 
                                            ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' 
                                            : 'border-slate-200 dark:border-slate-700'
                                    }`}
                                />
                                {validationErrors.demand_repay_amount && (
                                    <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">
                                        <Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />
                                        <span>{validationErrors.demand_repay_amount}</span>
                                    </p>
                                )}
                                {inputAmt > 0 && (
                                    <div className="space-y-1.5 mt-2">
                                        <div className="text-xs text-emerald-600 font-bold text-left ltr">
                                            {inputAmt.toLocaleString()} تومان
                                        </div>
                                        <div className="p-2.5 bg-emerald-50/80 dark:bg-emerald-950/60 rounded-xl text-xs font-bold text-emerald-900 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-800/40">
                                            {numToPersianWords(repaymentForm.amount)}
                                        </div>
                                    </div>
                                )}

                                <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl space-y-1.5 border border-slate-200 dark:border-slate-700">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-500 dark:text-slate-400 font-medium font-sans">کل طلب از این مخاطب:</span>
                                        <span className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                                            {totalDemand.toLocaleString()} تومان
                                        </span>
                                    </div>
                                    {isOver && (
                                        <div className="p-2 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 rounded-lg text-xs font-bold border border-rose-200 dark:border-rose-800 flex items-center space-x-1.5 space-x-reverse">
                                            <Icon name="alert-circle" className="w-4 h-4 shrink-0" />
                                            <span>مبلغ وارد شده بیشتر از کل طلب ({totalDemand.toLocaleString()} تومان) است!</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }
                },
                {
                    id: 'demand_repay_date',
                    title: 'تاریخ دریافت',
                    render: () => (
                        <FullJalaliDatePicker 
                            day={pickerDay}
                            month={pickerMonth}
                            year={pickerYear}
                            onChange={({ day, month, year }) => {
                                setPickerDay(day);
                                setPickerMonth(month);
                                setPickerYear(year);
                            }}
                        />
                    )
                },
                {
                    id: 'demand_repay_notes',
                    title: 'توضیحات تکمیلی',
                    render: () => (
                        <div className="space-y-3">
                            <label className="block text-xs text-slate-500 font-bold">توضیحات بابت دریافتی:</label>
                            <textarea 
                                rows="3"
                                placeholder="شماره پیگیری، فیش و توضیحات..."
                                value={repaymentForm.notes}
                                onChange={(e) => setRepaymentForm({...repaymentForm, notes: e.target.value})}
                                className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs focus:outline-none"
                            ></textarea>
                        </div>
                    )
                }
            ];

            const contactWizardCards = [
                {
                    id: 'contact_names',
                    title: wizardMode === 'edit' ? 'ویرایش نام و نام خانوادگی' : 'نام و نام خانوادگی مخاطب',
                    render: () => (
                        <div className="space-y-4">
                            {/* Center Avatar Display Box */}
                            <div className="flex flex-col items-center justify-center pt-1 pb-2">
                                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-lg ring-4 ring-indigo-500/15 dark:ring-indigo-400/20">
                                    {contactWizardForm.firstName.trim() || contactWizardForm.lastName.trim() ? (
                                        <span className="text-2xl font-black tracking-tight">
                                            {(contactWizardForm.firstName.trim()[0] || '') + (contactWizardForm.lastName.trim()[0] || '')}
                                        </span>
                                    ) : (
                                        <Icon name="user-plus" className="w-9 h-9 opacity-90" />
                                    )}
                                    <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
                                        <Icon name="user" className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2">
                                    {contactWizardForm.firstName.trim() || contactWizardForm.lastName.trim() 
                                        ? `${contactWizardForm.firstName.trim()} ${contactWizardForm.lastName.trim()}`.trim()
                                        : 'اطلاعات مخاطب جدید'}
                                </span>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">نام</label>
                                <input 
                                    type="text"
                                    placeholder="نام مخاطب را وارد کنید"
                                    value={contactWizardForm.firstName}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setContactWizardForm(prev => ({ ...prev, firstName: val }));
                                        if (val.trim()) {
                                            setValidationErrors(errs => { const { contact_firstname, ...rest } = errs; return rest; });
                                        }
                                    }}
                                    className={`w-full bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none transition-all ${
                                        validationErrors.contact_firstname 
                                            ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' 
                                            : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500'
                                    }`}
                                />
                                {validationErrors.contact_firstname && (
                                    <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">
                                        <Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />
                                        <span>{validationErrors.contact_firstname}</span>
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">نام خانوادگی</label>
                                <input 
                                    type="text"
                                    placeholder="نام خانوادگی مخاطب را وارد کنید"
                                    value={contactWizardForm.lastName}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setContactWizardForm(prev => ({ ...prev, lastName: val }));
                                    }}
                                    className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                />
                            </div>
                        </div>
                    )
                },
                {
                    id: 'contact_info',
                    title: wizardMode === 'edit' ? 'ویرایش تماس و حساب بانکی' : 'شماره تماس و اطلاعات حساب بانکی',
                    render: () => (
                        <div className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">شماره تماس</label>
                                <input 
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="مثلاً: 09121234567"
                                    value={contactWizardForm.phone}
                                    onChange={(e) => setContactWizardForm(prev => ({ ...prev, phone: e.target.value }))}
                                    className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ltr font-mono"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">شماره کارت (۱۶ رقمی - اختیاری)</label>
                                    {contactWizardForm.bankName && (
                                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                                            {contactWizardForm.bankName}
                                        </span>
                                    )}
                                </div>
                                <input 
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="مثلاً: 6037 9975 4321 4582"
                                    value={contactWizardForm.bankCard}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const formatted = formatCardNumber(val);
                                        const detectedBank = getBankNameFromCard(val) || contactWizardForm.bankName;
                                        setContactWizardForm(prev => ({ ...prev, bankCard: formatted, bankName: detectedBank }));
                                    }}
                                    className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ltr font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">شماره شبا (اختیاری)</label>
                                <input 
                                    type="text"
                                    placeholder="مثلاً: IR12 0120 0000 0001 2345 6789 01"
                                    value={contactWizardForm.iban}
                                    onChange={(e) => setContactWizardForm(prev => ({ ...prev, iban: e.target.value }))}
                                    className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ltr font-mono"
                                />
                            </div>
                        </div>
                    )
                }
            ];

            const getCurrentWizardCards = () => {
                if (wizardType === 'loan') return loanWizardCards;
                if (wizardType === 'demand') return demandWizardCards;
                if (wizardType === 'debt') return debtWizardCards;
                if (wizardType === 'installment') return installmentWizardCards;
                if (wizardType === 'debt_repayment') return debtRepaymentWizardCards;
                if (wizardType === 'demand_repayment') return demandRepaymentWizardCards;
                if (wizardType === 'contact') return contactWizardCards;
                return loanWizardCards;
            };

            const getUnderlyingTabForSubpage = (subpageTab) => {
                if (subpageTab === 'contact-detail') {
                    if (loanReturnTab === 'accounts') return 'accounts';
                    if (loanReturnTab === 'dashboard') return 'dashboard';
                    if (loanReturnTab === 'all-transactions') return 'all-transactions';
                    return 'contacts';
                }
                if (subpageTab === 'loan-detail') {
                    if (loanReturnTab === 'contact-detail' && selectedContact) return 'contact-detail';
                    if (loanReturnTab === 'dashboard') return 'dashboard';
                    if (loanReturnTab === 'all-transactions') return 'all-transactions';
                    return 'accounts';
                }
                if (subpageTab === 'archived-period-detail') {
                    if ((loanReturnTab || 'contact-detail') === 'contact-detail' && selectedContact) return 'contact-detail';
                    if (loanReturnTab === 'dashboard') return 'dashboard';
                    if (loanReturnTab === 'all-transactions') return 'all-transactions';
                    return 'accounts';
                }
                if (subpageTab === 'all-transactions') return 'dashboard';
                return 'accounts';
            };

            const renderTab = (tabName, onBack) => {
                switch (tabName) {
                    case 'dashboard':
                        return (
                            <div className="space-y-5 animate-fade-in">
                                <div className="flex justify-between items-center py-2">
                                    <button onClick={() => showToast('اعلان جدیدی وجود ندارد')} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 relative text-slate-600 dark:text-slate-300">
                                        <Icon name="bell" className="w-5 h-5" />
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                                    </button>

                                    <div className="text-center">
                                        <h1 className="text-base font-bold text-slate-900 dark:text-white">Amir Finance</h1>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">سلام وقت به خیر 👋</p>
                                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                                            امروز: {getDeviceJalaliDate().day} {getDeviceJalaliDate().month} {getDeviceJalaliDate().year}
                                        </p>
                                    </div>

                                    <BrandAvatar className="w-[60px] h-[60px] rounded-2xl object-cover shadow-sm" logoUrl="favicon-96x96.png" />
                                </div>

                                {/* Reminders Box */}
                                {(() => {
                                    const loanReminders = loans.map(loan => {
                                        const nextDueInfo = getLoanNextDueInfo(loan, transactions);
                                        if (nextDueInfo.isCompleted) return null;

                                        let iconName = 'landmark';
                                        let iconBgClass = 'bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400';
                                        
                                        const titleLower = (loan.title || '').toLowerCase();
                                        if (titleLower.includes('خودرو') || titleLower.includes('ماشین') || titleLower.includes('car')) {
                                            iconName = 'car';
                                            iconBgClass = 'bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400';
                                        } else if (titleLower.includes('مسکن') || titleLower.includes('خانه') || titleLower.includes('ملک') || titleLower.includes('آپارتمان')) {
                                            iconName = 'home';
                                            iconBgClass = 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 dark:text-emerald-400';
                                        } else if (titleLower.includes('رضایی') || titleLower.includes('شخصی') || titleLower.includes('بازپرداخت') || titleLower.includes('پرداخت')) {
                                            iconName = 'user';
                                            iconBgClass = 'bg-amber-50 dark:bg-amber-950/60 text-amber-500 dark:text-amber-400';
                                        } else {
                                            const hash = String(loan.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                                            const variants = [
                                                { bg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400', icon: 'car' },
                                                { bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-500 dark:text-amber-400', icon: 'user' },
                                                { bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 dark:text-emerald-400', icon: 'home' },
                                                { bg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 dark:text-indigo-400', icon: 'credit-card' }
                                            ];
                                            const choice = variants[hash % variants.length];
                                            iconName = choice.icon;
                                            iconBgClass = choice.bg;
                                        }

                                        return {
                                            id: `loan-${loan.id}`,
                                            loanObj: loan,
                                            title: loan.title,
                                            dateStr: nextDueInfo.nextDueDateStr,
                                            daysLeft: nextDueInfo.daysLeft,
                                            icon: iconName,
                                            iconColor: iconBgClass
                                        };
                                    }).filter(Boolean);

                                    const activeList = loanReminders.length > 0 ? loanReminders : reminders;
                                    const sortedList = [...activeList].sort((a, b) => a.daysLeft - b.daysLeft);
                                    const firstThree = sortedList.slice(0, 3);
                                    const extraList = sortedList.slice(3);

                                    const renderReminderCard = (item) => {
                                        let iconName = item.icon || 'landmark';
                                        let iconBgClass = item.iconColor || 'bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400';

                                        const daysBadgeText = item.daysLeft < 0 
                                            ? `${Math.abs(item.daysLeft)} روز تأخیر` 
                                            : item.daysLeft === 0 
                                                ? 'امروز سررسید' 
                                                : `${item.daysLeft} روز مانده`;

                                        return (
                                            <div 
                                                key={item.id}
                                                onClick={() => item.loanObj && openLoanDetail(item.loanObj)}
                                                className={`bg-[#F8FAFC] dark:bg-slate-700/40 rounded-2xl p-3 sm:p-3.5 border border-slate-100/90 dark:border-slate-700/50 flex items-center justify-between gap-3 transition-all hover:bg-slate-100/80 dark:hover:bg-slate-700/70 ${item.loanObj ? 'cursor-pointer active:scale-[0.99]' : ''}`}
                                            >
                                                <div className="flex items-center space-x-3 space-x-reverse min-w-0">
                                                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 ${iconBgClass}`}>
                                                        <Icon name={iconName} className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white truncate">{item.title}</h4>
                                                        <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5 truncate">{item.dateStr}</p>
                                                    </div>
                                                </div>
                                                <div className="shrink-0">
                                                    <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-bold text-[11px] sm:text-xs bg-rose-100/90 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 inline-block">
                                                        {daysBadgeText}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    };

                                    return (
                                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] dark:shadow-sm border border-slate-100 dark:border-slate-700/60 transition-all space-y-3.5">
                                            <div 
                                                onClick={() => setExpandedReminders(!expandedReminders)}
                                                className="flex justify-between items-center cursor-pointer select-none group px-0.5"
                                            >
                                                <div className="flex items-center space-x-3 space-x-reverse">
                                                    <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-500 dark:text-rose-400 group-hover:scale-105 transition-transform shrink-0">
                                                        <Icon name="calendar-clock" className="w-5.5 h-5.5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-sm sm:text-base font-extrabold text-rose-600 dark:text-rose-400 leading-tight">یادآوری‌های مهم</h3>
                                                        <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">نزدیک‌ترین سررسیدها</p>
                                                    </div>
                                                </div>
                                                <button 
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setExpandedReminders(!expandedReminders);
                                                    }} 
                                                    className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors p-1 cursor-pointer"
                                                >
                                                    <Icon name="chevron-down" className={`w-5 h-5 transition-transform duration-300 ${expandedReminders ? 'rotate-180' : 'rotate-0'}`} />
                                                </button>
                                            </div>

                                            <div className="space-y-2.5">
                                                {firstThree.map(item => renderReminderCard(item))}

                                                {sortedList.length === 0 && (
                                                    <div className="text-center py-4 text-xs text-slate-400">
                                                        سررسیدی نزدیک نیست
                                                    </div>
                                                )}

                                                <div 
                                                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                                        expandedReminders && extraList.length > 0 
                                                            ? 'grid-rows-[1fr] opacity-100 mt-2.5' 
                                                            : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                                                    }`}
                                                >
                                                    <div className="overflow-hidden space-y-2.5">
                                                        {extraList.map(item => renderReminderCard(item))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}

                                {/* Summary Grid Cards */}
                                <div className="grid grid-cols-3 gap-2.5">
                                    <div 
                                        onClick={() => { setAccountsSubTab('loans'); navigateToTab('accounts', 'forward'); }}
                                        className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-3 shadow-md cursor-pointer hover:shadow-lg transition-all active:scale-95 text-center">
                                        <div className="w-7 h-7 rounded-xl bg-white/20 text-white flex items-center justify-center mx-auto mb-1.5 backdrop-blur-sm">
                                            <Icon name="landmark" className="w-4 h-4" />
                                        </div>
                                        <div className="text-xs font-bold">وام‌ها</div>
                                        <div className="text-[10px] text-white/80 mt-1">{loans.length} پرونده</div>
                                    </div>

                                    <div 
                                        onClick={() => { setAccountsSubTab('debts'); navigateToTab('accounts', 'forward'); }}
                                        className="bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl p-3 shadow-md cursor-pointer hover:shadow-lg transition-all active:scale-95 text-center">
                                        <div className="w-7 h-7 rounded-xl bg-white/20 text-white flex items-center justify-center mx-auto mb-1.5 backdrop-blur-sm">
                                            <Icon name="arrow-down-left" className="w-4 h-4" />
                                        </div>
                                        <div className="text-xs font-bold">بدهی</div>
                                        <div className="text-[11px] font-extrabold mt-1">{totalDebt.toLocaleString()}</div>
                                        <div className="text-[9px] text-white/70">تومان</div>
                                    </div>

                                    <div 
                                        onClick={() => { setAccountsSubTab('demands'); navigateToTab('accounts', 'forward'); }}
                                        className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-3 shadow-md cursor-pointer hover:shadow-lg transition-all active:scale-95 text-center">
                                        <div className="w-7 h-7 rounded-xl bg-white/20 text-white flex items-center justify-center mx-auto mb-1.5 backdrop-blur-sm">
                                            <Icon name="arrow-up-right" className="w-4 h-4" />
                                        </div>
                                        <div className="text-xs font-bold">طلب</div>
                                        <div className="text-[11px] font-extrabold mt-1">{totalDemand.toLocaleString()}</div>
                                        <div className="text-[9px] text-white/70">تومان</div>
                                    </div>
                                </div>

                                {/* Dashboard Bottom: Recent Transactions Accordion */}
                                <div 
                                    ref={recentTxsAccordionRef}
                                    className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] dark:shadow-sm border border-slate-100 dark:border-slate-700/60 transition-all"
                                >
                                    <div 
                                        onClick={toggleRecentTxsAccordion}
                                        className="flex justify-between items-center cursor-pointer select-none group px-0.5"
                                    >
                                        <div className="flex items-center space-x-3 space-x-reverse">
                                            <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
                                                <Icon name="history" className="w-5.5 h-5.5" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm sm:text-base font-extrabold text-indigo-600 dark:text-indigo-400 leading-tight">آخرین تراکنش‌ها</h3>
                                                <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">تراکنش‌های اخیر ثبت‌شده</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 space-x-reverse">
                                            <button 
                                                onClick={toggleRecentTxsAccordion} 
                                                className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors p-1 cursor-pointer"
                                            >
                                                <Icon name="chevron-down" className={`w-5 h-5 transition-transform duration-300 ${expandedRecentTxs ? 'rotate-180' : 'rotate-0'}`} />
                                            </button>
                                        </div>
                                    </div>

                                    <div 
                                        className={`grid transition-[grid-template-rows,opacity,margin,padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                            expandedRecentTxs 
                                                ? 'grid-rows-[1fr] opacity-100 mt-3.5' 
                                                : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                                        }`}
                                    >
                                        <div className="overflow-hidden space-y-2.5">
                                            {transactions.slice(0, 5).map((tx, idx) => (
                                                <SwipeableTxCard
                                                    key={tx.id || idx}
                                                    tx={tx}
                                                    contacts={contacts}
                                                    isHighlighted={tx.id === highlightedTxId}
                                                    onEdit={(txItem) => handleTransactionClick(txItem)}
                                                    onDelete={(txItem, confirmCb) => requestDeleteTx(txItem, txItem.type || 'tx', confirmCb)}
                                                />
                                            ))}
                                            {transactions.length === 0 && (
                                                <div className="bg-[#F8FAFC] dark:bg-slate-700/40 rounded-2xl p-6 text-center text-xs text-slate-400 border border-slate-100/90 dark:border-slate-700/50">
                                                    تراکنشی ثبت نشده است
                                                </div>
                                            )}
                                            {transactions.length > 0 && (
                                                <button
                                                    onClick={() => {
                                                        setAllTxsPage(1);
                                                        navigateToTab('all-transactions', 'none');
                                                    }}
                                                    className="w-full mt-1.5 py-3 px-4 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100/90 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 border border-indigo-100/80 dark:border-indigo-800/50 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 space-x-reverse active:scale-[0.98] transition-all cursor-pointer group/viewall"
                                                >
                                                    <span>مشاهده همه تراکنش‌ها</span>
                                                    <Icon name="chevron-left" className="w-4 h-4 text-indigo-500 dark:text-indigo-400 group-hover/viewall:-translate-x-1 transition-transform" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    case 'accounts':
                        return (
                            <div className="space-y-4 animate-fade-in">
                                {/* Header */}
                                <div className="flex items-center justify-between py-1.5 mb-3">
                                    <div className="flex items-center gap-2">
                                        <Icon name="wallet" className="w-7 h-7 text-slate-800 dark:text-slate-100" />
                                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">مدیریت حساب‌ها</h1>
                                    </div>
                                    <button 
                                        onClick={() => setIsAddTxOpen(true)}
                                        className="w-11 h-11 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-all shrink-0"
                                        title="افزودن حساب / تراکنش جدید">
                                        <Icon name="plus" className="w-6 h-6" />
                                    </button>
                                </div>

                                 {/* Search Bar Section */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex-1 relative">
                                        <input 
                                            type="text" 
                                            value={accountsSearchQuery}
                                            onChange={(e) => setAccountsSearchQuery(e.target.value)}
                                            placeholder="جستجو..." 
                                            className="w-full h-12 pr-10 pl-4 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-full focus:ring-2 focus:ring-indigo-600/20 text-sm text-right text-slate-900 dark:text-white placeholder:text-slate-400 shadow-inner"
                                        />
                                        <Icon name="search" className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                    <button 
                                        onClick={() => setAccountsSearchQuery('')}
                                        className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-md active:scale-90 transition-transform"
                                        title="پاک‌سازی جستجو">
                                        <Icon name="x" className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Filter Bar */}
                                <div className="bg-slate-100 dark:bg-slate-800/80 rounded-full p-1 flex items-center justify-between no-scrollbar border border-slate-200/50 dark:border-slate-700/50 text-sm font-medium mb-4 shadow-xs">
                                    {[
                                        { id: 'all', label: 'همه', activeClass: 'bg-indigo-600 text-white shadow-sm font-bold' },
                                        { id: 'loans', label: 'وام', activeClass: 'bg-blue-600 text-white shadow-sm font-bold' },
                                        { id: 'debts', label: 'بدهی', activeClass: 'bg-rose-600 text-white shadow-sm font-bold' },
                                        { id: 'demands', label: 'طلب', activeClass: 'bg-emerald-600 text-white shadow-sm font-bold' },
                                        { id: 'archived', label: 'بایگانی', activeClass: 'bg-purple-600 text-white shadow-sm font-bold' }
                                    ].map(tab => (
                                        <button 
                                            key={tab.id}
                                            onClick={() => setAccountsSubTab(tab.id)}
                                            className={`py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap px-3 sm:px-4 active:scale-95 transition-all duration-200 ${
                                                accountsSubTab === tab.id 
                                                    ? tab.activeClass 
                                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                            }`}>
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    {/* LOANS SECTION */}
                                    {(accountsSubTab === 'all' || accountsSubTab === 'loans' || accountsSubTab === 'archived') && (
                                        (() => {
                                            const loansToDisplay = filteredAccountsLoans;

                                            if (loansToDisplay.length === 0) return null;

                                            return (
                                                <div className="space-y-3">
                                                    <div className="w-full flex items-center justify-center mb-3">
                                                        <div className="w-full text-center bg-indigo-50/90 dark:bg-indigo-950/70 border-2 border-indigo-500/80 dark:border-indigo-400/60 text-indigo-700 dark:text-indigo-300 py-2.5 px-4 rounded-2xl text-sm font-black shadow-xs">
                                                            وام‌ها
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3">
                                                        {loansToDisplay.map(loan => {
                                                            const nextDueInfo = getLoanNextDueInfo(loan, transactions);
                                                            const isCompleted = nextDueInfo.isCompleted || (loan.remainingAmount !== undefined && loan.remainingAmount <= 0);

                                                            return (
                                                                <SwipeToDeleteItem
                                                                    key={loan.id}
                                                                    onDelete={(confirmCb) => handleDeleteLoanClick(loan, confirmCb)}
                                                                    onCardClick={() => openLoanDetail(loan)}
                                                                >
                                                                    {isCompleted ? (
                                                                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-sm p-4 sm:p-5 overflow-hidden relative transition-all cursor-pointer hover:border-emerald-300">
                                                                            <div className="w-full flex flex-col opacity-75 gap-2">
                                                                                <div className="flex items-center justify-between w-full">
                                                                                    <div className="w-14 h-14 bg-indigo-50/50 dark:bg-indigo-950/50 rounded-2xl flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0">
                                                                                        <Icon name="landmark" className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                                                                                    </div>
                                                                                    <div className="flex-1 text-right flex flex-col gap-1 pl-4 pr-2">
                                                                                        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm">{loan.title}</h3>
                                                                                        <p className="text-slate-400 text-xs whitespace-normal">{loan.contactName || "بانک"}</p>
                                                                                    </div>
                                                                                    <div className="text-left shrink-0 flex flex-col items-center">
                                                                                        <div className="font-bold text-base leading-none line-through text-slate-400">{loan.principalAmount.toLocaleString()}</div>
                                                                                        <div className="text-slate-400 text-xs">تومان</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex justify-center">
                                                                                    <span className="text-slate-500 dark:text-slate-400 font-bold text-xs">آخرین قسط پرداخت شده : {nextDueInfo.lastPaidDateStr || "تمامی اقساط پرداخت شده"}</span>
                                                                                </div>
                                                                                <div className="bg-indigo-50/30 dark:bg-indigo-950/30 rounded-lg py-2 px-4 text-center">
                                                                                    <span className="text-blue-500 dark:text-blue-400 font-bold text-sm">تمامی اقساط پرداخت شده است</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="absolute bottom-4 left-4 w-12 h-12 bg-emerald-50 dark:bg-emerald-950 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-500 z-10">
                                                                                <Icon name="check" className="w-6 h-6 stroke-[3]" />
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  p-3 sm:p-4 transition-all cursor-pointer hover:border-indigo-400">
                                                                            <div className="w-full flex flex-col gap-3">
                                                                                <div className="flex items-center justify-between w-full">
                                                                                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-inner">
                                                                                        <Icon name="landmark" className="w-6 h-6" />
                                                                                    </div>
                                                                                    <div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">
                                                                                        <h3 className="font-bold text-slate-800 dark:text-white text-sm leading-tight">{loan.title}</h3>
                                                                                        <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal line-clamp-1">{loan.contactName || "بانک"}</p>
                                                                                    </div>
                                                                                    <div className="text-left shrink-0 flex flex-col items-center">
                                                                                        <div className="text-indigo-600 dark:text-indigo-400 font-bold text-base leading-none">{loan.principalAmount.toLocaleString()}</div>
                                                                                        <div className="text-indigo-600 dark:text-indigo-400 text-[10px] mt-1 font-medium">تومان</div>
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                                <div className="flex flex-col gap-2">
                                                                                    <div className="flex items-center justify-between w-full bg-[#F4F7FC] dark:bg-slate-900/50 rounded-xl px-3 py-1.5 border border-slate-200/50 dark:border-slate-700/50">
                                                                                        <span className="text-slate-500 dark:text-slate-400 font-medium text-xs">سررسید قسط {nextDueInfo.paidInst + 1}</span>
                                                                                        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">{nextDueInfo.nextDueDateStr}</span>
                                                                                    </div>
                                                                                    
                                                                                    <div className="w-full flex flex-col gap-1.5 px-1 mt-1">
                                                                                        <div className="flex justify-between items-center text-[10px] font-bold">
                                                                                            <span className="text-emerald-600 dark:text-emerald-400">{nextDueInfo.paidInst} پرداخت شده</span>
                                                                                            <span className="text-slate-400 dark:text-slate-500">مانده {nextDueInfo.remainingInst}</span>
                                                                                        </div>
                                                                                        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700/80 flex">
                                                                                            <div 
                                                                                                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-full transition-all duration-500" 
                                                                                                style={{ width: `${Math.min(100, (nextDueInfo.totalInst > 0 ? (nextDueInfo.paidInst / nextDueInfo.totalInst) * 100 : 0))}%` }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </SwipeToDeleteItem>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })()
                                    )}

                                    {/* DEMANDS SECTION */}
                                    {(accountsSubTab === 'all' || accountsSubTab === 'demands' || accountsSubTab === 'archived') && filteredAccountsDemands.length > 0 && (
                                        <div className="space-y-3">
                                            <div className="w-full flex items-center justify-center mb-3">
                                                <div className="w-full text-center bg-emerald-50/90 dark:bg-emerald-950/70 border-2 border-emerald-500/80 dark:border-emerald-400/60 text-emerald-700 dark:text-emerald-300 py-2.5 px-4 rounded-2xl text-sm font-black shadow-xs">
                                                    طلب‌ها
                                                </div>
                                            </div>
                                            <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3">
                                                {filteredAccountsDemands.map(contact => {
                                                    const settledCount = getSettledPeriodCount(contact.id, 'demand');
                                                    const isArchived = settledCount > 0 || accountsSubTab === 'archived' || contact.totalDemand === 0;
                                                    return (
                                                        <SwipeToDeleteItem
                                                            key={contact.id}
                                                            onDelete={(confirmCb) => handleDeleteContact(contact, confirmCb)}
                                                            onCardClick={() => openContactDetail(contact, 'demands', 'accounts')}
                                                        >
                                                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between">
                                                                <div className="w-full flex flex-col gap-1">
                                                                    <div className="flex items-center justify-between w-full">
                                                                        <div className="flex flex-col items-center gap-1 shrink-0">
                                                                            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center text-emerald-500 dark:text-emerald-400">
                                                                                <Icon name="arrow-up-right" className="w-6 h-6" />
                                                                            </div>
                                                                            {isArchived ? (
                                                                                <span className="bg-emerald-500 text-white text-[10px] px-3 py-0.5 rounded-full font-bold shadow-md">بایگانی</span>
                                                                            ) : (
                                                                                <span className="bg-slate-400 dark:bg-slate-600 text-white text-[10px] px-3 py-0.5 rounded-full font-bold shadow-md opacity-50">بایگانی</span>
                                                                            )}
                                                                        </div>
                                                                        <div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">
                                                                            <h3 className="font-bold text-slate-800 dark:text-white text-sm">{contact.firstName} {contact.lastName}</h3>
                                                                            <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{contact.note || "طلب شخصی"}</p>
                                                                        </div>
                                                                        <div className="text-left shrink-0 flex flex-col items-center">
                                                                            <div className="text-emerald-600 dark:text-emerald-400 font-bold text-base leading-none">{contact.totalDemand.toLocaleString()}</div>
                                                                            <div className="text-emerald-600 dark:text-emerald-400 text-xs">تومان</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwipeToDeleteItem>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* DEBTS SECTION */}
                                    {(accountsSubTab === 'all' || accountsSubTab === 'debts' || accountsSubTab === 'archived') && filteredAccountsDebts.length > 0 && (
                                        <div className="space-y-3">
                                            <div className="w-full flex items-center justify-center mb-3">
                                                <div className="w-full text-center bg-rose-50/90 dark:bg-rose-950/70 border-2 border-rose-500/80 dark:border-rose-400/60 text-rose-700 dark:text-rose-300 py-2.5 px-4 rounded-2xl text-sm font-black shadow-xs">
                                                    بدهی‌ها
                                                </div>
                                            </div>
                                            <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3">
                                                {filteredAccountsDebts.map(contact => {
                                                    const settledCount = getSettledPeriodCount(contact.id, 'debt');
                                                    const isArchived = settledCount > 0 || accountsSubTab === 'archived' || contact.totalDebt === 0;
                                                    return (
                                                        <SwipeToDeleteItem
                                                            key={contact.id}
                                                            onDelete={(confirmCb) => handleDeleteContact(contact, confirmCb)}
                                                            onCardClick={() => openContactDetail(contact, 'debts', 'accounts')}
                                                        >
                                                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 hover:border-rose-400 transition-all cursor-pointer flex items-center justify-between">
                                                                <div className="w-full flex flex-col gap-1">
                                                                    <div className="flex items-center justify-between w-full">
                                                                        <div className="flex flex-col items-center gap-1 shrink-0">
                                                                            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/50 rounded-2xl flex items-center justify-center text-rose-500 dark:text-rose-400">
                                                                                <Icon name="arrow-down-left" className="w-6 h-6" />
                                                                            </div>
                                                                            {isArchived ? (
                                                                                <span className="bg-rose-500 text-white text-[10px] px-3 py-0.5 rounded-full font-bold shadow-md">بایگانی</span>
                                                                            ) : (
                                                                                <span className="bg-slate-400 dark:bg-slate-600 text-white text-[10px] px-3 py-0.5 rounded-full font-bold shadow-md opacity-50">بایگانی</span>
                                                                            )}
                                                                        </div>
                                                                        <div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">
                                                                            <h3 className="font-bold text-slate-800 dark:text-white text-sm">{contact.firstName} {contact.lastName}</h3>
                                                                            <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{contact.note || "بدهی شخصی"}</p>
                                                                        </div>
                                                                        <div className="text-left shrink-0 flex flex-col items-center">
                                                                            <div className="text-rose-600 dark:text-rose-400 font-bold text-base leading-none">{contact.totalDebt.toLocaleString()}</div>
                                                                            <div className="text-rose-600 dark:text-rose-400 text-xs">تومان</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwipeToDeleteItem>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* EMPTY STATE */}
                                    {filteredAccountsLoans.length === 0 && filteredAccountsDemands.length === 0 && filteredAccountsDebts.length === 0 && (
                                        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl text-center border border-slate-100 dark:border-slate-700/60 my-4">
                                            <Icon name="search-x" className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                                            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                                                {accountsSearchQuery ? `هیچ موردی با عبارت "${accountsSearchQuery}" یافت نشد.` : 'هیچ حساب یا پرونده‌ای برای نمایش وجود ندارد.'}
                                            </div>
                                            {accountsSearchQuery && (
                                                <button 
                                                    onClick={() => setAccountsSearchQuery('')}
                                                    className="mt-3 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-bold text-indigo-600 dark:text-indigo-400 rounded-xl transition-all">
                                                    پاک‌سازی جستجو
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    case 'contacts':
                        return (
                            <div className="space-y-4 animate-fade-in">
                                {/* Header */}
                                <div className="flex items-center justify-between py-1.5 mb-3">
                                    <div className="flex items-center gap-2">
                                        <Icon name="users" className="w-7 h-7 text-slate-800 dark:text-slate-100" />
                                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">مخاطبین</h1>
                                    </div>
                                    <button 
                                        onClick={() => openStackWizard('contact', 'add')} 
                                        className="w-11 h-11 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-all shrink-0"
                                        title="افزودن مخاطب جدید">
                                        <Icon name="plus" className="w-6 h-6" />
                                    </button>
                                </div>

                                    {/* Search Bar Section */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex-1 relative">
                                            <input 
                                                type="text" 
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="جستجو..." 
                                                className="w-full h-12 pr-10 pl-4 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-full focus:ring-2 focus:ring-indigo-600/20 text-sm text-right text-slate-900 dark:text-white placeholder:text-slate-400 shadow-inner"
                                            />
                                            <Icon name="search" className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        </div>
                                        <button 
                                            onClick={() => setSearchQuery('')}
                                            className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-md active:scale-90 transition-transform"
                                            title="پاک‌سازی جستجو">
                                            <Icon name="x" className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Filters Bar Section */}
                                    <div className="bg-slate-100 dark:bg-slate-800/80 rounded-full p-1 flex items-center justify-between no-scrollbar border border-slate-200/50 dark:border-slate-700/50 text-sm font-medium mb-4 shadow-xs">
                                        <button 
                                            onClick={() => setContactFilter(contactFilter === 'favorite' ? 'all' : 'favorite')}
                                            title="علاقه‌مندی‌ها"
                                            className={`flex items-center justify-center w-9 h-9 rounded-full transition-all shrink-0 ${contactFilter === 'favorite' ? 'bg-amber-100 dark:bg-amber-950 text-amber-500' : 'text-slate-400 hover:text-amber-500'}`}>
                                            <Icon name="star" className={`w-5 h-5 ${contactFilter === 'favorite' ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />
                                        </button>
                                        {[
                                            { id: 'all', label: 'همه', activeClass: 'bg-indigo-600 text-white shadow-sm font-bold' },
                                            { id: 'loan', label: 'وام', activeClass: 'bg-blue-600 text-white shadow-sm font-bold' },
                                            { id: 'debt', label: 'بدهی', activeClass: 'bg-rose-600 text-white shadow-sm font-bold' },
                                            { id: 'demand', label: 'طلب', activeClass: 'bg-emerald-600 text-white shadow-sm font-bold' },
                                            { id: 'settled', label: 'بایگانی', activeClass: 'bg-purple-600 text-white shadow-sm font-bold' }
                                        ].map(tab => (
                                            <button 
                                                key={tab.id}
                                                onClick={() => setContactFilter(tab.id)}
                                                className={`py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap px-3 sm:px-4 active:scale-95 transition-all duration-200 ${
                                                    contactFilter === tab.id 
                                                        ? tab.activeClass 
                                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                                }`}>
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                {/* Contacts List Cards */}
                                <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                                    {filteredContacts.map((contact) => {
                                        const contactLoans = loans.filter(l => l.contactId === contact.id);
                                        const hasActiveLoan = contactLoans.some(l => 
                                            !getLoanNextDueInfo(l, transactions).isCompleted && (l.remainingAmount === undefined || l.remainingAmount > 0)
                                        );
                                        const hasSettledLoan = contactLoans.some(l => 
                                            getLoanNextDueInfo(l, transactions).isCompleted || (l.remainingAmount !== undefined && l.remainingAmount <= 0)
                                        );

                                        const hasSettledDemand = getSettledPeriodCount(contact.id, 'demand') > 0;
                                        const hasActiveDemand = contact.totalDemand > 0;

                                        const hasSettledDebt = getSettledPeriodCount(contact.id, 'debt') > 0;
                                        const hasActiveDebt = contact.totalDebt > 0;

                                        return (
                                            <SwipeToDeleteItem
                                                key={contact.id}
                                                onDelete={(confirmCb) => handleDeleteContact(contact, confirmCb)}
                                                onCardClick={() => {
                                                    let f = 'all';
                                                    if (contactFilter === 'demand') f = 'demands';
                                                    else if (contactFilter === 'debt') f = 'debts';
                                                    else if (contactFilter === 'loan') f = 'loans';
                                                    openContactDetail(contact, f, 'contacts');
                                                }}
                                            >
                                                <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-[24px] border border-slate-200/80 dark:border-slate-700/60 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm hover:border-indigo-400 transition-all cursor-pointer ">
                                                    <div className="flex flex-col gap-3">
                                                        {/* Row 1: Avatar + Name (Right), Phone (Left) */}
                                                        <div className="flex flex-row items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`rounded-full ${getAvatarColor(contact.id, contact.firstName + contact.lastName)} flex-shrink-0 flex items-center justify-center text-white font-bold w-10 h-10 text-xs sm:text-sm shadow-xs`}>
                                                                    {contact.firstName.charAt(0)} {contact.lastName.charAt(0)}
                                                                </div>
                                                                <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base">{contact.firstName} {contact.lastName}</span>
                                                            </div>
                                                            <span className="text-slate-400 dark:text-slate-500 tracking-wider font-mono text-xs dir-ltr">{contact.phone}</span>
                                                        </div>

                                                        {/* Row 2: 3 Equal Width Buttons (وام, طلب, بدهی) */}
                                                        <div className="flex gap-2 justify-start w-full">
                                                            {/* 1. Loan (وام) */}
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openContactDetail(contact, 'loans', 'contacts');
                                                                }}
                                                                className={`relative flex-1 rounded-2xl h-8 text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                                                                    hasActiveLoan 
                                                                        ? 'bg-blue-600 text-white shadow-sm active:scale-95' 
                                                                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-default'
                                                                }`}
                                                            >
                                                                {hasSettledLoan && (
                                                                    <div className="absolute right-1.5 w-[14px] h-[14px] rounded-full border border-current flex items-center justify-center shrink-0 opacity-90">
                                                                        <Icon name="check" className="w-2.5 h-2.5" strokeWidth={3} />
                                                                    </div>
                                                                )}
                                                                <span>وام</span>
                                                            </button>

                                                            {/* 2. Demand (طلب) */}
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openContactDetail(contact, 'demands', 'contacts');
                                                                }}
                                                                className={`relative flex-1 rounded-2xl h-8 text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                                                                    hasActiveDemand 
                                                                        ? 'bg-emerald-600 text-white shadow-sm active:scale-95' 
                                                                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-default'
                                                                }`}
                                                            >
                                                                {hasSettledDemand && (
                                                                    <div className="absolute right-1.5 w-[14px] h-[14px] rounded-full border border-current flex items-center justify-center shrink-0 opacity-90">
                                                                        <Icon name="check" className="w-2.5 h-2.5" strokeWidth={3} />
                                                                    </div>
                                                                )}
                                                                <span>طلب</span>
                                                            </button>

                                                            {/* 3. Debt (بدهی) */}
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openContactDetail(contact, 'debts', 'contacts');
                                                                }}
                                                                className={`relative flex-1 rounded-2xl h-8 text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                                                                    hasActiveDebt 
                                                                        ? 'bg-rose-600 text-white shadow-sm active:scale-95' 
                                                                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-default'
                                                                }`}
                                                            >
                                                                {hasSettledDebt && (
                                                                    <div className="absolute right-1.5 w-[14px] h-[14px] rounded-full border border-current flex items-center justify-center shrink-0 opacity-90">
                                                                        <Icon name="check" className="w-2.5 h-2.5" strokeWidth={3} />
                                                                    </div>
                                                                )}
                                                                <span>بدهی</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwipeToDeleteItem>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    case 'contact-detail':
                        if (!selectedContact) return null;
                        return (
                            <div className="space-y-4 animate-fade-in">
                                 {/* Header Bar */}
                                 <div className="flex justify-between items-center py-1">
                                     <button onClick={onBack ? () => onBack('button') : (() => navigateBack(loanReturnTab === 'accounts' ? 'accounts' : 'contacts'))} className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 active:scale-95 transition-transform">
                                         <Icon name="arrow-right" className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                                     </button>
                                     <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">پروفایل مخاطب</h3>
                                     <div className="flex items-center space-x-1.5 space-x-reverse">
                                         <button 
                                             onClick={() => openStackWizard('contact', 'edit', selectedContact)}
                                             className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-200 active:scale-95 transition-transform"
                                             title="ویرایش مخاطب">
                                             <Icon name="pencil" className="w-4 h-4" />
                                         </button>
                                         <button 
                                             onClick={handleDeleteContact}
                                             className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-950/60 flex items-center justify-center shadow-sm border border-red-200 dark:border-red-800/60 active:scale-95 transition-transform text-red-600 dark:text-red-400"
                                             title="حذف مخاطب">
                                             <Icon name="trash-2" className="w-4 h-4" />
                                         </button>
                                         <button 
                                             onClick={() => {
                                                 const updated = contacts.map(c => c.id === selectedContact.id ? {...c, isFavorite: !c.isFavorite} : c);
                                                 setContacts(updated);
                                                 setSelectedContact({...selectedContact, isFavorite: !selectedContact.isFavorite});
                                                 showToast(selectedContact.isFavorite ? 'از علاقه مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد');
                                             }}
                                             className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 text-amber-500 active:scale-95 transition-transform"
                                             title="علاقه‌مندی">
                                             <Icon name="star" className={`w-5 h-5 ${selectedContact.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                                         </button>
                                     </div>
                                 </div>

                                 {/* Contact Card with Watermark Theme */}
                                 {(() => {
                                     const cardTheme = getContactCardTheme(selectedContact.id);
                                     const contactInitials = (selectedContact.firstName ? selectedContact.firstName.charAt(0) : '') + (selectedContact.lastName ? selectedContact.lastName.charAt(0) : '');
                                     return (
                                         <div className={`relative overflow-hidden rounded-2xl p-4 border flex flex-col gap-3 group transition-transform duration-200 ${cardTheme.containerClass}`}>
                                             {/* Background Watermark Icon */}
                                             <div className={`absolute -top-2 -left-2 ${cardTheme.watermarkColor}`} style={{ opacity: 0.08, zIndex: 0, pointerEvents: "none" }}>
                                                 <Icon name="landmark" className="w-28 h-28 sm:w-32 sm:h-32" />
                                             </div>

                                             <div className="relative z-10 w-full flex flex-col gap-3">
                                                 {/* Top Row: Avatar, Name & Phone */}
                                                 <div className="flex gap-3 items-center min-w-0">
                                                     <div className={`w-12 h-12 rounded-full ${cardTheme.avatarClass} flex items-center justify-center font-bold text-lg shadow-md shrink-0`}>
                                                         {contactInitials || '؟'}
                                                     </div>
                                                     <div className="min-w-0 flex-1">
                                                         <h2 className={`text-base sm:text-lg font-bold leading-tight truncate ${cardTheme.nameClass}`}>
                                                             {selectedContact.firstName} {selectedContact.lastName}
                                                         </h2>
                                                         <p className={`text-xs flex items-center gap-1.5 mt-0.5 ${cardTheme.phoneClass}`}>
                                                             <Icon name="phone" className="w-3.5 h-3.5 shrink-0" />
                                                             <span dir="ltr" className="font-mono">{selectedContact.phone || 'بدون شماره تماس'}</span>
                                                         </p>
                                                     </div>
                                                 </div>

                                                 {/* Card Number & Sheba Number Rows */}
                                                 <div className="space-y-2 mt-1">
                                                     {/* Card Row */}
                                                     <div className={`flex items-center justify-between p-2 rounded-xl backdrop-blur-sm ${cardTheme.rowClass}`}>
                                                         <div className="flex items-center gap-2 shrink-0">
                                                             <Icon name="credit-card" className={`w-4 h-4 shrink-0 ${cardTheme.accentColorClass}`} />
                                                             <span className={`text-xs font-bold ${cardTheme.rowLabelClass}`}>کارت</span>
                                                         </div>
                                                         <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                                                             <span className={`font-mono text-sm sm:text-base font-bold tracking-wider dir-ltr truncate ${cardTheme.rowTextClass}`}>
                                                                 {selectedContact.bankCard ? selectedContact.bankCard : 'ثبت نشده'}
                                                             </span>
                                                             {selectedContact.bankCard && (
                                                                 <button 
                                                                     onClick={() => copyToClipboard(selectedContact.bankCard, 'شماره کارت')}
                                                                     className={`${cardTheme.accentColorClass} active:opacity-50 shrink-0 p-1`}
                                                                     title="کپی شماره کارت">
                                                                     <Icon name="copy" className="w-4 h-4 shrink-0" />
                                                                 </button>
                                                             )}
                                                         </div>
                                                     </div>

                                                     {/* Sheba Row */}
                                                     <div className={`flex items-center justify-between p-2 rounded-xl backdrop-blur-sm ${cardTheme.rowClass}`}>
                                                         <div className="flex items-center gap-2 shrink-0">
                                                             <Icon name="landmark" className={`w-4 h-4 shrink-0 ${cardTheme.accentColorClass}`} />
                                                             <span className={`text-xs font-bold ${cardTheme.rowLabelClass}`}>شبا</span>
                                                         </div>
                                                         <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                                                             <span className={`font-mono text-[11px] sm:text-xs font-bold dir-ltr truncate ${cardTheme.rowTextClass}`}>
                                                                 {selectedContact.iban ? selectedContact.iban : 'ثبت نشده'}
                                                             </span>
                                                             {selectedContact.iban && (
                                                                 <button 
                                                                     onClick={() => copyToClipboard(selectedContact.iban, 'شماره شبا')}
                                                                     className={`${cardTheme.accentColorClass} active:opacity-50 shrink-0 p-1`}
                                                                     title="کپی شماره شبا">
                                                                     <Icon name="copy" className="w-4 h-4 shrink-0" />
                                                                 </button>
                                                             )}
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                     );
                                 })()}

                                 {/* Summary 3 Cards in Contact Profile (وام، طلب، قرض) */}
                                 <div className="space-y-2.5">
                                     <div className="grid grid-cols-3 gap-2.5">
                                         <div 
                                             onClick={() => setProfileFilter(prev => prev === 'loans' ? 'all' : 'loans')}
                                             className={`bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-3 shadow-md cursor-pointer hover:shadow-lg transition-all active:scale-95 text-center ${
                                                 profileFilter === 'loans' ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 scale-[1.02]' : ''
                                             }`}>
                                             <div className="w-7 h-7 rounded-xl bg-white/20 text-white flex items-center justify-center mx-auto mb-1.5 backdrop-blur-sm">
                                                 <Icon name="landmark" className="w-4 h-4" />
                                             </div>
                                             <div className="text-xs font-bold">وام‌ها</div>
                                             <div className="text-[10px] text-white/80 mt-1">{loans.filter(l => l.contactId === selectedContact.id).length} پرونده</div>
                                         </div>

                                         <div 
                                             onClick={() => setProfileFilter(prev => prev === 'debts' ? 'all' : 'debts')}
                                             className={`bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl p-3 shadow-md cursor-pointer hover:shadow-lg transition-all active:scale-95 text-center ${
                                                 profileFilter === 'debts' ? 'ring-2 ring-rose-500 ring-offset-2 dark:ring-offset-slate-900 scale-[1.02]' : ''
                                             }`}>
                                             <div className="w-7 h-7 rounded-xl bg-white/20 text-white flex items-center justify-center mx-auto mb-1.5 backdrop-blur-sm">
                                                 <Icon name="arrow-down-left" className="w-4 h-4" />
                                             </div>
                                             <div className="text-xs font-bold">بدهی</div>
                                             <div className="text-[11px] font-extrabold mt-1">{(selectedContact.totalDebt || 0).toLocaleString()}</div>
                                             <div className="text-[9px] text-white/70">تومان</div>
                                         </div>

                                         <div 
                                             onClick={() => setProfileFilter(prev => prev === 'demands' ? 'all' : 'demands')}
                                             className={`bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-3 shadow-md cursor-pointer hover:shadow-lg transition-all active:scale-95 text-center ${
                                                 profileFilter === 'demands' ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900 scale-[1.02]' : ''
                                             }`}>
                                             <div className="w-7 h-7 rounded-xl bg-white/20 text-white flex items-center justify-center mx-auto mb-1.5 backdrop-blur-sm">
                                                 <Icon name="arrow-up-right" className="w-4 h-4" />
                                             </div>
                                             <div className="text-xs font-bold">طلب</div>
                                             <div className="text-[11px] font-extrabold mt-1">{(selectedContact.totalDemand || 0).toLocaleString()}</div>
                                             <div className="text-[9px] text-white/70">تومان</div>
                                         </div>
                                     </div>

                                     {/* Sub-Action Buttons Under Active Selected Card */}
                                     {profileFilter === 'loans' && (
                                         <div className="grid grid-cols-2 gap-2 animate-fade-in pt-1">
                                             <button 
                                                 onClick={() => openStackWizard('loan', 'add')}
                                                 className="py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 space-x-reverse active:scale-95 transition-all">
                                                 <Icon name="landmark" className="w-4 h-4" />
                                                 <span>وام جدید</span>
                                             </button>
                                             <button 
                                                 onClick={() => openStackWizard('installment', 'add')}
                                                 className="py-2.5 px-3 bg-gradient-to-r from-indigo-500 to-sky-600 hover:from-indigo-600 hover:to-sky-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 space-x-reverse active:scale-95 transition-all">
                                                 <Icon name="receipt" className="w-4 h-4" />
                                                 <span>قسط جدید</span>
                                             </button>
                                         </div>
                                     )}

                                     {profileFilter === 'debts' && (
                                         <div className="grid grid-cols-2 gap-2 animate-fade-in pt-1">
                                             <button 
                                                 onClick={() => openStackWizard('debt', 'add')}
                                                 className="py-2.5 px-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 space-x-reverse active:scale-95 transition-all">
                                                 <Icon name="arrow-down-left" className="w-4 h-4" />
                                                 <span>ثبت بدهی</span>
                                             </button>
                                             <button 
                                                 onClick={() => openStackWizard('debt_repayment', 'add')}
                                                 className="py-2.5 px-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 space-x-reverse active:scale-95 transition-all">
                                                 <Icon name="check-circle-2" className="w-4 h-4" />
                                                 <span>بازپرداخت جدید</span>
                                             </button>
                                         </div>
                                     )}

                                     {profileFilter === 'demands' && (
                                         <div className="grid grid-cols-2 gap-2 animate-fade-in pt-1">
                                             <button 
                                                 onClick={() => openStackWizard('demand', 'add')}
                                                 className="py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 space-x-reverse active:scale-95 transition-all">
                                                 <Icon name="arrow-up-right" className="w-4 h-4" />
                                                 <span>طلب جدید</span>
                                             </button>
                                             <button 
                                                 onClick={() => openStackWizard('demand_repayment', 'add')}
                                                 className="py-2.5 px-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 space-x-reverse active:scale-95 transition-all">
                                                 <Icon name="check-circle-2" className="w-4 h-4" />
                                                 <span>بازپرداخت جدید</span>
                                             </button>
                                         </div>
                                     )}
                                 </div>

                                {/* Filtered Items Section */}
                                <div className="space-y-3">
                                    {profileFilter === 'all' && (
                                        <div className="flex justify-between items-center px-1 mb-1">
                                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">همه موارد مرتبط با مخاطب</span>
                                        </div>
                                    )}

                                    {/* LOANS LIST */}
                                    {(profileFilter === 'all' || profileFilter === 'loans') && (
                                        <div className="space-y-2">
                                            {(() => {
                                                const contactLoans = loans.filter(l => l.contactId === selectedContact.id);
                                                const activeLoans = contactLoans.filter(l => l.remainingAmount > 0);
                                                const closedLoans = contactLoans.filter(l => l.remainingAmount <= 0);

                                                return (
                                                    <div className="space-y-2.5">
                                                        <ActiveArchiveSegmentedControl 
                                                            activeLabel="وام‌های فعال"
                                                            activeCount={activeLoans.length}
                                                            archiveCount={closedLoans.length}
                                                            currentFilter={contactLoansSubFilter}
                                                            onChange={setContactLoansSubFilter}
                                                            colorTheme="indigo"
                                                        />

                                                        {contactLoansSubFilter === 'active' ? (
                                                            activeLoans.length > 0 ? (
                                                                activeLoans.map(loan => (
                                                                    <div 
                                                                        key={loan.id}
                                                                        onClick={() => openLoanDetail(loan)}
                                                                        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[72px] h-auto">
                                                                        <div className="flex items-center space-x-3 space-x-reverse min-w-0 flex-1">
                                                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                                                                <Icon name="landmark" className="w-6 h-6" />
                                                                            </div>
                                                                            <div className="min-w-0 flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">
                                                                                <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-snug break-words whitespace-normal">{loan.title}</h3>
                                                                                <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-normal">اقساط: {loan.installmentAmount.toLocaleString()} تومان</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-left shrink-0 flex flex-col items-center">
                                                                            <div className="font-bold text-base leading-none text-indigo-600 dark:text-indigo-400">{loan.principalAmount.toLocaleString()}</div>
                                                                            <div className="text-xs text-indigo-600 dark:text-indigo-400">تومان</div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60">
                                                                    هیچ وام فعالی برای این شخص ثبت نشده است.
                                                                </div>
                                                            )
                                                        ) : (
                                                            closedLoans.length > 0 ? (
                                                                closedLoans.map(loan => (
                                                                    <div 
                                                                        key={loan.id}
                                                                        onClick={() => openLoanDetail(loan)}
                                                                        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 opacity-75 hover:opacity-100 transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[72px] h-auto">
                                                                        <div className="flex items-center space-x-3 space-x-reverse min-w-0 flex-1">
                                                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                                                                <Icon name="check-circle-2" className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                                                            </div>
                                                                            <div className="min-w-0 flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">
                                                                                <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-snug break-words whitespace-normal line-through decoration-slate-400">{loan.title}</h3>
                                                                                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold whitespace-normal">تسویه کامل شد</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-left shrink-0 flex flex-col items-center">
                                                                            <div className="font-bold text-base leading-none text-slate-500">{loan.principalAmount.toLocaleString()}</div>
                                                                            <div className="text-xs text-slate-500">تومان</div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60">
                                                                    هیچ وام تسویه‌شده یا بایگانی‌شده‌ای وجود ندارد.
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    )}

                                    {/* DEBTS LIST */}
                                    {(profileFilter === 'all' || profileFilter === 'debts') && (
                                        <div className="space-y-2">
                                            {(() => {
                                                const contactDebts = transactions.filter(t => t.contactId === selectedContact.id && (t.type === 'debt' || t.type === 'debt_repayment') && !t.periodId);
                                                let archivedDebtPeriods = completedPeriods.filter(p => p.contactId === selectedContact.id && p.type === 'debt');
                                                const archivedDebtTxs = transactions.filter(t => t.contactId === selectedContact.id && (t.type === 'debt' || t.type === 'debt_repayment') && t.periodId);

                                                if (archivedDebtPeriods.length === 0 && archivedDebtTxs.length > 0) {
                                                    let sum = 0;
                                                    archivedDebtTxs.forEach(t => { if (t.type === 'debt') sum += Math.abs(t.amount); });
                                                    archivedDebtPeriods = [{
                                                        id: archivedDebtTxs[0].periodId || ('p_auto_debt_' + selectedContact.id),
                                                        contactId: selectedContact.id,
                                                        contactName: `${selectedContact.firstName} ${selectedContact.lastName}`,
                                                        type: 'debt',
                                                        title: `دوره تسویه‌شده بدهی به ${selectedContact.firstName} ${selectedContact.lastName}`,
                                                        totalAmount: sum,
                                                        startDate: archivedDebtTxs[archivedDebtTxs.length - 1]?.dateStr || 'نامشخص',
                                                        endDate: archivedDebtTxs[0]?.dateStr || 'امروز',
                                                        transactions: archivedDebtTxs
                                                    }];
                                                }

                                                const activeDebtCount = contactDebts.length > 0 ? contactDebts.length : (selectedContact.totalDebt > 0 ? 1 : 0);

                                                return (
                                                    <div className="space-y-2">
                                                        <ActiveArchiveSegmentedControl 
                                                            activeLabel="بدهی‌های فعال"
                                                            activeCount={activeDebtCount}
                                                            archiveCount={archivedDebtPeriods.length}
                                                            currentFilter={contactDebtsSubFilter}
                                                            onChange={setContactDebtsSubFilter}
                                                            colorTheme="rose"
                                                        />

                                                        {contactDebtsSubFilter === 'active' ? (
                                                            contactDebts.length > 0 ? (
                                                                contactDebts.map(tx => {
                                                                    const isRepay = tx.type === 'debt_repayment';
                                                                    return (
                                                                        <SwipeableTxCard 
                                                                            key={tx.id}
                                                                            tx={tx}
                                                                            colorType="rose"
                                                                            hasShadow={true}
                                                                            isHighlighted={tx.id === highlightedTxId}
                                                                            onEdit={(txItem) => openStackWizard(isRepay ? 'debt_repayment' : 'debt', 'edit', txItem)}
                                                                            onDelete={(txItem) => requestDeleteTx(txItem, 'debt')}
                                                                        />
                                                                    );
                                                                })
                                                            ) : selectedContact.totalDebt > 0 ? (
                                                                <div 
                                                                    onClick={() => openStackWizard('debt', 'edit', { contactId: selectedContact.id, amount: selectedContact.totalDebt })}
                                                                    className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 hover:border-rose-400 transition-all cursor-pointer flex items-center justify-between">
                                                                    <div className="w-full flex flex-col gap-1">
                                                                        <div className="flex items-center justify-between w-full">
                                                                            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/50 rounded-2xl flex items-center justify-center text-rose-500 dark:text-rose-400 shrink-0">
                                                                                <Icon name="arrow-down-left" className="w-6 h-6" />
                                                                            </div>
                                                                            <div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">
                                                                                <h3 className="font-bold text-slate-800 dark:text-white text-sm">بدهی شخصی</h3>
                                                                                <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{selectedContact.note || `بدهی به ${selectedContact.firstName} ${selectedContact.lastName}`}</p>
                                                                            </div>
                                                                            <div className="text-left shrink-0 flex flex-col items-center">
                                                                                <div className="text-rose-600 dark:text-rose-400 font-bold text-base leading-none">{selectedContact.totalDebt.toLocaleString()}</div>
                                                                                <div className="text-rose-600 dark:text-rose-400 text-xs">تومان</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60">
                                                                    هیچ بدهی فعالی برای این شخص ثبت نشده است.
                                                                </div>
                                                            )
                                                        ) : (
                                                            archivedDebtPeriods.length > 0 ? (
                                                                archivedDebtPeriods.map(period => (
                                                                    <div 
                                                                        key={period.id}
                                                                        onClick={() => openArchivedPeriodDetail(period)}
                                                                        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 opacity-75 hover:opacity-100 transition-all cursor-pointer flex items-center justify-between">
                                                                        <div className="w-full flex flex-col gap-1">
                                                                            <div className="flex items-center justify-between w-full">
                                                                                <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/50 rounded-2xl flex items-center justify-center text-rose-500 dark:text-rose-400 shrink-0">
                                                                                    <Icon name="arrow-down-left" className="w-6 h-6" />
                                                                                </div>
                                                                                <div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">
                                                                                    <h3 className="font-bold text-slate-800 dark:text-white text-sm">{period.title || 'دوره تسویه‌شده بدهی'}</h3>
                                                                                    <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{formatDateToNumericJalali(period.startDate)} تا {formatDateToNumericJalali(period.endDate)}</p>
                                                                                </div>
                                                                                <div className="text-left shrink-0 flex flex-col items-center">
                                                                                    <div className="text-rose-600 dark:text-rose-400 font-bold text-base leading-none">{Number(period.totalAmount || 0).toLocaleString()}</div>
                                                                                    <div className="text-rose-600 dark:text-rose-400 text-xs">تومان</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60">
                                                                    هیچ دوره بدهی تسویه‌شده یا بایگانی‌شده‌ای وجود ندارد.
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    )}

                                    {/* DEMANDS LIST */}
                                    {(profileFilter === 'all' || profileFilter === 'demands') && (
                                        <div className="space-y-2">
                                            {(() => {
                                                const contactDemands = transactions.filter(t => t.contactId === selectedContact.id && (t.type === 'demand' || t.type === 'demand_repayment') && !t.periodId);
                                                let archivedDemandPeriods = completedPeriods.filter(p => p.contactId === selectedContact.id && p.type === 'demand');
                                                const archivedDemandTxs = transactions.filter(t => t.contactId === selectedContact.id && (t.type === 'demand' || t.type === 'demand_repayment') && t.periodId);

                                                if (archivedDemandPeriods.length === 0 && archivedDemandTxs.length > 0) {
                                                    let sum = 0;
                                                    archivedDemandTxs.forEach(t => { if (t.type === 'demand') sum += Math.abs(t.amount); });
                                                    archivedDemandPeriods = [{
                                                        id: archivedDemandTxs[0].periodId || ('p_auto_demand_' + selectedContact.id),
                                                        contactId: selectedContact.id,
                                                        contactName: `${selectedContact.firstName} ${selectedContact.lastName}`,
                                                        type: 'demand',
                                                        title: `دوره تسویه‌شده طلب از ${selectedContact.firstName} ${selectedContact.lastName}`,
                                                        totalAmount: sum,
                                                        startDate: archivedDemandTxs[archivedDemandTxs.length - 1]?.dateStr || 'نامشخص',
                                                        endDate: archivedDemandTxs[0]?.dateStr || 'امروز',
                                                        transactions: archivedDemandTxs
                                                    }];
                                                }

                                                const activeDemandCount = contactDemands.length > 0 ? contactDemands.length : (selectedContact.totalDemand > 0 ? 1 : 0);

                                                return (
                                                    <div className="space-y-2">
                                                        <ActiveArchiveSegmentedControl 
                                                            activeLabel="طلب‌های فعال"
                                                            activeCount={activeDemandCount}
                                                            archiveCount={archivedDemandPeriods.length}
                                                            currentFilter={contactDemandsSubFilter}
                                                            onChange={setContactDemandsSubFilter}
                                                            colorTheme="emerald"
                                                        />

                                                        {contactDemandsSubFilter === 'active' ? (
                                                            contactDemands.length > 0 ? (
                                                                contactDemands.map(tx => {
                                                                    const isRepay = tx.type === 'demand_repayment';
                                                                    return (
                                                                        <SwipeableTxCard 
                                                                            key={tx.id}
                                                                            tx={tx}
                                                                            colorType="emerald"
                                                                            hasShadow={true}
                                                                            isHighlighted={tx.id === highlightedTxId}
                                                                            onEdit={(txItem) => openStackWizard(isRepay ? 'demand_repayment' : 'demand', 'edit', txItem)}
                                                                            onDelete={(txItem) => requestDeleteTx(txItem, 'demand')}
                                                                        />
                                                                    );
                                                                })
                                                            ) : selectedContact.totalDemand > 0 ? (
                                                                <div 
                                                                    onClick={() => openStackWizard('demand', 'edit', { contactId: selectedContact.id, amount: selectedContact.totalDemand })}
                                                                    className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between">
                                                                    <div className="w-full flex flex-col gap-1">
                                                                        <div className="flex items-center justify-between w-full">
                                                                            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center text-emerald-500 dark:text-emerald-400 shrink-0">
                                                                                <Icon name="arrow-up-right" className="w-6 h-6" />
                                                                            </div>
                                                                            <div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">
                                                                                <h3 className="font-bold text-slate-800 dark:text-white text-sm">طلب شخصی</h3>
                                                                                <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{selectedContact.note || `طلب از ${selectedContact.firstName} ${selectedContact.lastName}`}</p>
                                                                            </div>
                                                                            <div className="text-left shrink-0 flex flex-col items-center">
                                                                                <div className="text-emerald-600 dark:text-emerald-400 font-bold text-base leading-none">{selectedContact.totalDemand.toLocaleString()}</div>
                                                                                <div className="text-emerald-600 dark:text-emerald-400 text-xs">تومان</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60">
                                                                    هیچ طلبی از این شخص ثبت نشده است.
                                                                </div>
                                                            )
                                                        ) : (
                                                            archivedDemandPeriods.length > 0 ? (
                                                                archivedDemandPeriods.map(period => (
                                                                    <div 
                                                                        key={period.id}
                                                                        onClick={() => openArchivedPeriodDetail(period)}
                                                                        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 opacity-75 hover:opacity-100 transition-all cursor-pointer flex items-center justify-between">
                                                                        <div className="w-full flex flex-col gap-1">
                                                                            <div className="flex items-center justify-between w-full">
                                                                                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center text-emerald-500 dark:text-emerald-400 shrink-0">
                                                                                    <Icon name="arrow-up-right" className="w-6 h-6" />
                                                                                </div>
                                                                                <div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">
                                                                                    <h3 className="font-bold text-slate-800 dark:text-white text-sm">{period.title || 'دوره تسویه‌شده طلب'}</h3>
                                                                                    <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{formatDateToNumericJalali(period.startDate)} تا {formatDateToNumericJalali(period.endDate)}</p>
                                                                                </div>
                                                                                <div className="text-left shrink-0 flex flex-col items-center">
                                                                                    <div className="text-emerald-600 dark:text-emerald-400 font-bold text-base leading-none">{Number(period.totalAmount || 0).toLocaleString()}</div>
                                                                                    <div className="text-emerald-600 dark:text-emerald-400 text-xs">تومان</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60">
                                                                    هیچ دوره طلب تسویه‌شده یا بایگانی‌شده‌ای وجود ندارد.
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    )}
                                </div>
                                <div className="h-12 shrink-0 pointer-events-none" />
                            </div>
                        );
                    case 'loan-detail':
                        if (!selectedLoan) return null;
                        const loanContactObj = contacts.find(c => c.id === selectedLoan.contactId);
                        const loanContactDisplayName = loanContactObj ? `${loanContactObj.firstName || ''} ${loanContactObj.lastName || ''}`.trim() : (selectedLoan.contactName || '');
                        const isClosed = selectedLoan.remainingAmount <= 0 || getLoanNextDueInfo(selectedLoan, transactions).isCompleted;
                        const totalInst = selectedLoan.totalInstallments || (selectedLoan.installmentAmount > 0 ? Math.ceil(selectedLoan.totalRepayment / selectedLoan.installmentAmount) : 12);
                        const repaymentTxs = transactions.filter(t => t.loanId === selectedLoan.id && t.type === 'repayment');
                        const paidInst = repaymentTxs.length;
                        const installmentAmount = Number(selectedLoan.installmentAmount || (totalInst > 0 ? Math.round(selectedLoan.totalRepayment / totalInst) : 0));
                        const nextDueInfo = getLoanNextDueInfo(selectedLoan, transactions);
                        const progressPct = totalInst > 0 ? Math.min(100, Math.round((paidInst / totalInst) * 100)) : 0;

                        return (
                            <div className="space-y-4 animate-fade-in pb-8">
                                {/* Top Header Bar */}
                                <div className="flex justify-between items-center py-1">
                                    <button onClick={onBack ? () => onBack('button') : (() => navigateBack(loanReturnTab || 'accounts'))} className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 active:scale-95 transition-transform">
                                        <Icon name="arrow-right" className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                                    </button>
                                    <h1 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate px-2">{selectedLoan.title}</h1>
                                    <div className="flex items-center space-x-1.5 space-x-reverse shrink-0">
                                        <button 
                                            onClick={() => openStackWizard('loan', 'edit', selectedLoan)} 
                                            className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-200 active:scale-95 transition-transform" 
                                            title="ویرایش وام">
                                            <Icon name="pencil" className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteLoanClick(selectedLoan)} 
                                            className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-950/60 flex items-center justify-center shadow-sm border border-red-200 dark:border-red-800/60 active:scale-95 transition-transform text-red-600 dark:text-red-400" 
                                            title="حذف وام">
                                            <Icon name="trash-2" className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* BEGIN: Loan Summary Card */}
                                <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-900 rounded-3xl p-5 text-white relative overflow-hidden card-shadow border border-blue-400/30 space-y-4" data-purpose="loan-summary-header">
                                    {/* Decorative Glowing Light & Background Watermark SVG */}
                                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
                                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
                                    <div className="absolute left-4 bottom-1 opacity-15 pointer-events-none text-white">
                                        <svg fill="currentColor" height="180" viewBox="0 0 24 24" width="180" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L2 7v2h20V7L12 2zm0 18H4v-9h1v9h2v-9h2v9h2v-9h2v9h2v-9h2v9h1v-9h1v9h-2zm-10-9h20v2H2v-2z"></path>
                                        </svg>
                                    </div>
                                    
                                    <div className="relative z-10 space-y-3">
                                        {/* Top Header Row: Icon, Title & Status Badge */}
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-start gap-3 min-w-0 flex-1">
                                                <div className="bg-white/15 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 shrink-0 mt-0.5">
                                                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m-5 10h.01M15 7h.01M15 14h.01M15 18h.01M9 18h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                                    </svg>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h2 className="text-base sm:text-lg font-bold text-white break-words leading-snug">{selectedLoan.title}</h2>
                                                    <div className="flex items-center gap-1.5 text-xs opacity-90 mt-1">
                                                        <span className={`w-2 h-2 rounded-full ${isClosed ? 'bg-emerald-400' : 'bg-emerald-400 animate-pulse'}`}></span>
                                                        <span className="text-indigo-200 font-medium">
                                                            {isClosed 
                                                                ? `پرونده تسویه‌شده${loanContactDisplayName ? ` (${loanContactDisplayName})` : ''}` 
                                                                : `پرونده فعال${loanContactDisplayName ? ` (${loanContactDisplayName})` : ''}`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remaining Loan Amount Compact Section */}
                                        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-3.5 py-2 border border-white/10 flex items-center justify-between">
                                            <span className="text-xs text-indigo-200 font-medium">مانده وام</span>
                                            <div className="flex items-baseline gap-1.5 font-mono">
                                                <span className="text-xl sm:text-2xl font-black text-white">{selectedLoan.remainingAmount.toLocaleString()}</span>
                                                <span className="text-xs text-indigo-200 font-normal">تومان</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Progress Section */}
                                    <div className="pt-2 relative z-10 space-y-1.5">
                                        <div className="flex justify-between items-center text-xs opacity-90">
                                            <span className="text-indigo-200">پیشرفت پرداخت اقساط</span>
                                            <span className="text-emerald-300 font-bold">{paidInst} از {totalInst} قسط پرداخت شده</span>
                                        </div>
                                        <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                                            <div className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500 shadow-xs" style={{ width: `${progressPct}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                                {/* END: Loan Summary Card */}

                                {/* BEGIN: Quick Info Connected Single Box */}
                                <div className="bg-white dark:bg-slate-800 rounded-2xl card-shadow border border-slate-100 dark:border-slate-700/60 p-2 sm:p-3 grid grid-cols-3 divide-x divide-x-reverse divide-slate-100 dark:divide-slate-700/60 text-center" data-purpose="loan-quick-stats">
                                    {/* Box 1: Principal */}
                                    <div className="px-1 py-1.5 flex flex-col items-center justify-center text-center min-w-0">
                                        <div className="bg-green-50 dark:bg-green-950/60 p-2 rounded-xl inline-flex items-center justify-center mb-1.5 shrink-0">
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                        </div>
                                        <div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium text-center">مبلغ اصل وام</div>
                                        <div className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400 font-mono mt-0.5 break-words max-w-full text-center leading-tight">
                                            {selectedLoan.principalAmount.toLocaleString()}
                                        </div>
                                        <div className="text-[9px] text-gray-400 font-medium text-center mt-0.5">تومان</div>
                                    </div>

                                    {/* Box 2: Installment Amount */}
                                    <div className="px-1 py-1.5 flex flex-col items-center justify-center text-center min-w-0">
                                        <div className="bg-blue-50 dark:bg-blue-950/60 p-2 rounded-xl inline-flex items-center justify-center mb-1.5 shrink-0">
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                        </div>
                                        <div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium text-center">مبلغ هر قسط</div>
                                        <div className="text-xs sm:text-sm font-bold text-gray-800 dark:text-slate-100 font-mono mt-0.5 break-words max-w-full text-center leading-tight">
                                            {installmentAmount.toLocaleString()}
                                        </div>
                                        <div className="text-[9px] text-gray-400 font-medium text-center mt-0.5">تومان</div>
                                    </div>

                                    {/* Box 3: Next Due Date */}
                                    <div className="px-1 py-1.5 flex flex-col items-center justify-center text-center min-w-0">
                                        <div className="bg-indigo-50 dark:bg-indigo-950/60 p-2 rounded-xl inline-flex items-center justify-center mb-1.5 shrink-0">
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                        </div>
                                        <div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium text-center">قسط بعدی</div>
                                        <div className="text-xs sm:text-sm font-bold text-gray-800 dark:text-slate-100 font-mono mt-0.5 break-words max-w-full text-center leading-tight">
                                            {nextDueInfo.isCompleted ? 'تکمیل' : formatDateToNumericJalali(nextDueInfo.nextDueDateStr)}
                                        </div>
                                        <div className="text-[9px] text-indigo-600 dark:text-indigo-400 font-medium mt-0.5 text-center leading-tight break-words">
                                            {nextDueInfo.isCompleted 
                                                ? 'تسویه‌شده' 
                                                : nextDueInfo.daysLeft < 0 
                                                ? `${Math.abs(nextDueInfo.daysLeft)} روز تاخیر در پرداخت` 
                                                : nextDueInfo.daysLeft === 0 
                                                ? 'امروز سررسید قسط' 
                                                : `${nextDueInfo.daysLeft} روز مانده تا سررسید`}
                                        </div>
                                    </div>
                                </div>
                                {/* END: Quick Info Connected Single Box */}

                                {/* BEGIN: Detailed Info Grid with 8 Separated Bordered Sub-Boxes */}
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 card-shadow border border-slate-100 dark:border-slate-700/60 space-y-3" data-purpose="loan-details-grid">
                                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                                        {/* Item 1: Total Repayment Amount */}
                                        <div className="bg-[#F4F7FC]/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-[10px] text-gray-500 dark:text-slate-400 block font-medium">مبلغ بازپرداخت کل</span>
                                                <span className="text-xs font-bold text-gray-800 dark:text-slate-200 font-mono leading-tight block mt-0.5">{selectedLoan.totalRepayment.toLocaleString()} تومان</span>
                                            </div>
                                        </div>

                                        {/* Item 2: Paid To Date */}
                                        <div className="bg-[#F4F7FC]/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-[10px] text-gray-500 dark:text-slate-400 block font-medium">پرداختی تا امروز</span>
                                                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 font-mono leading-tight block mt-0.5">{selectedLoan.paidAmount.toLocaleString()} تومان</span>
                                            </div>
                                        </div>

                                        {/* Item 3: Total Installments Count */}
                                        <div className="bg-[#F4F7FC]/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-[10px] text-gray-500 dark:text-slate-400 block font-medium">تعداد کل اقساط</span>
                                                <span className="text-xs font-bold text-gray-800 dark:text-slate-200 leading-tight block mt-0.5">{totalInst} قسط</span>
                                            </div>
                                        </div>

                                        {/* Item 4: Remaining Balance */}
                                        <div className="bg-[#F4F7FC]/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-[10px] text-gray-500 dark:text-slate-400 block font-medium">باقی‌مانده</span>
                                                <span className="text-xs font-extrabold text-rose-500 dark:text-rose-400 font-mono leading-tight block mt-0.5">{selectedLoan.remainingAmount.toLocaleString()} تومان</span>
                                            </div>
                                        </div>

                                        {/* Item 5: Loan Date Received */}
                                        <div className="bg-[#F4F7FC]/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0 text-right">
                                                <span className="text-[10px] text-gray-500 dark:text-slate-400 block font-medium">تاریخ دریافت وام</span>
                                                <span className="text-xs font-bold text-gray-800 dark:text-slate-200 font-mono leading-tight block mt-0.5 text-right">{formatDateToNumericJalali(selectedLoan.receiveDate || selectedLoan.startDate)}</span>
                                            </div>
                                        </div>

                                        {/* Item 6: Installments Start Date */}
                                        <div className="bg-[#F4F7FC]/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0 text-right">
                                                <span className="text-[10px] text-gray-500 dark:text-slate-400 block font-medium">تاریخ شروع اقساط</span>
                                                <span className="text-xs font-bold text-gray-800 dark:text-slate-200 font-mono leading-tight block mt-0.5 text-right">{formatDateToNumericJalali(getLoanNextDueInfo(selectedLoan, []).nextDueDateStr || selectedLoan.startDate)}</span>
                                            </div>
                                        </div>

                                        {/* Item 7: Due Day Of Month */}
                                        <div className="bg-[#F4F7FC]/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-[10px] text-gray-500 dark:text-slate-400 block font-medium">موعد قسط در هر ماه</span>
                                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 leading-tight block mt-0.5">روز {selectedLoan.dueDayOfMonth} ماه</span>
                                            </div>
                                        </div>

                                        {/* Item 8: Paid Installments Count */}
                                        <div className="bg-[#F4F7FC]/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/70 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-[10px] text-gray-500 dark:text-slate-400 block font-medium">اقساط پرداخت شده</span>
                                                <span className="text-xs font-bold text-gray-800 dark:text-slate-200 leading-tight block mt-0.5">{paidInst} قسط</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description Box */}
                                    <div className="p-3 bg-blue-50/70 dark:bg-indigo-950/40 rounded-2xl flex items-center gap-3 border border-blue-100/80 dark:border-indigo-900/40">
                                        <div className="bg-white dark:bg-indigo-900/60 p-2 rounded-xl text-blue-600 dark:text-blue-300 shrink-0">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block">توضیحات وام</span>
                                            <p className="text-[10px] text-gray-600 dark:text-slate-300 leading-relaxed break-words">{selectedLoan.notes && selectedLoan.notes.trim() ? selectedLoan.notes : 'توضیحاتی برای این وام ثبت نشده است.'}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* END: Detailed Info Grid */}

                                {/* BEGIN: Reminder Card */}
                                <div className="bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800/40 rounded-3xl p-4 flex items-center justify-between card-shadow" data-purpose="reminder-banner">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="relative shrink-0">
                                            <div className="bg-amber-100 dark:bg-amber-900/60 p-3 rounded-2xl">
                                                <svg className="h-10 w-10 text-amber-500 fill-amber-500/20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 4.36 6 6.92 6 10v5l-2 2v1h16v-1l-2-2z"></path>
                                                </svg>
                                            </div>
                                            {!nextDueInfo.isCompleted && (
                                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-slate-800">
                                                    {nextDueInfo.daysLeft < 0 ? Math.abs(nextDueInfo.daysLeft) : nextDueInfo.daysLeft}
                                                </span>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-bold text-amber-800 dark:text-amber-200">نزدیک‌ترین یادآوری</h3>
                                            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1 leading-snug">
                                                {nextDueInfo.isCompleted ? 'کلیه اقساط پرداخت شده‌اند' : `قسط شماره ${nextDueInfo.nextDueNum}`}
                                                {!nextDueInfo.isCompleted && <br />}
                                                {!nextDueInfo.isCompleted && formatDateToNumericJalali(nextDueInfo.nextDueDateStr)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-center shrink-0">
                                        <div className={`text-xl sm:text-2xl font-black ${nextDueInfo.isCompleted ? 'text-emerald-600 dark:text-emerald-400' : nextDueInfo.daysLeft < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                            {nextDueInfo.isCompleted 
                                                ? 'تکمیل' 
                                                : `${Math.abs(nextDueInfo.daysLeft)} روز`}
                                        </div>
                                        <div className={`text-[10px] sm:text-xs font-bold mt-0.5 ${nextDueInfo.isCompleted ? 'text-emerald-700 dark:text-emerald-300' : nextDueInfo.daysLeft < 0 ? 'text-rose-700 dark:text-rose-300' : 'text-amber-700 dark:text-amber-300'}`}>
                                            {nextDueInfo.isCompleted 
                                                ? 'تسویه‌شده' 
                                                : nextDueInfo.daysLeft < 0 
                                                ? 'تاخیر در پرداخت' 
                                                : 'مانده تا سررسید'}
                                        </div>
                                        <div className="mt-2 bg-white/60 dark:bg-slate-800/80 px-2 py-0.5 rounded-full text-[10px] text-amber-800 dark:text-amber-200 flex items-center gap-1 justify-center">
                                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                            <span>یادآوری فعال است</span>
                                        </div>
                                    </div>
                                </div>
                                {/* END: Reminder Card */}

                                {/* BEGIN: Action Button */}
                                <button 
                                    onClick={() => openStackWizard('installment', 'add', selectedLoan)}
                                    disabled={isClosed}
                                    className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95 ${
                                        isClosed 
                                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed shadow-none' 
                                            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-blue-200 dark:shadow-blue-950/50 cursor-pointer'
                                    }`}
                                    data-purpose="submit-payment-button"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                    </svg>
                                    <span>ثبت پرداخت قسط</span>
                                </button>
                                {/* END: Action Button */}

                                {/* BEGIN: Transactions Section */}
                                <section className="space-y-3" data-purpose="transaction-history">
                                    {/* Installment Filter Tabs */}
                                    <div className="bg-slate-200/80 dark:bg-slate-800/90 p-1 rounded-2xl flex items-center gap-1 border border-slate-300/50 dark:border-slate-700/60 shadow-inner">
                                        <button
                                            type="button"
                                            onClick={() => setLoanTabFilter('paid')}
                                            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                                loanTabFilter === 'paid'
                                                    ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-md'
                                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                            }`}
                                        >
                                            <Icon name="check-circle-2" className="w-4 h-4" />
                                            <span>پرداخت شده</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                                                loanTabFilter === 'paid'
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-slate-300/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                            }`}>
                                                {repaymentTxs.length}
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setLoanTabFilter('unpaid')}
                                            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                                loanTabFilter === 'unpaid'
                                                    ? 'bg-amber-600 dark:bg-amber-600 text-white shadow-md'
                                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                            }`}
                                        >
                                            <Icon name="clock" className="w-4 h-4" />
                                            <span>پرداخت نشده</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                                                loanTabFilter === 'unpaid'
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-slate-300/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                            }`}>
                                                {Math.max(0, totalInst - repaymentTxs.length)}
                                            </span>
                                        </button>
                                    </div>

                                    {/* Tab Content List with AnimatePresence */}
                                    <AnimatePresence mode="wait">
                                        {loanTabFilter === 'paid' ? (
                                            <motion.div
                                                key="paid-list"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.2 }}
                                                className="space-y-3"
                                            >
                                                {repaymentTxs.length === 0 ? (
                                                    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60 card-shadow">
                                                        هنوز قسطی برای این وام پرداخت نشده است
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3">
                                                        {repaymentTxs.map((tx, idx) => (
                                                            <SwipeableTxCard 
                                                                key={tx.id}
                                                                tx={tx}
                                                                index={idx}
                                                                totalCount={repaymentTxs.length}
                                                                colorType="indigo"
                                                                isHighlighted={tx.id === highlightedTxId}
                                                                onEdit={(txItem) => openStackWizard('installment', 'edit', txItem)}
                                                                onDelete={(txItem) => requestDeleteTx(txItem, 'loan_installment')}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="unpaid-list"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.2 }}
                                                className="space-y-3"
                                            >
                                                {(() => {
                                                    const paidCount = repaymentTxs.length;
                                                    if (paidCount >= totalInst) {
                                                        return (
                                                            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-3xl text-center text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 card-shadow flex flex-col items-center gap-2">
                                                                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                                                    <Icon name="check-circle-2" className="w-6 h-6" />
                                                                </div>
                                                                <span>تمامی اقساط این وام با موفقیت پرداخت شده‌اند</span>
                                                            </div>
                                                        );
                                                    }

                                                    const unpaidItems = [];
                                                    for (let i = paidCount + 1; i <= totalInst; i++) {
                                                        const dueInfo = getInstallmentDueDate(selectedLoan, i);
                                                        unpaidItems.push({
                                                            instNum: i,
                                                            ...dueInfo
                                                        });
                                                    }

                                                    return (
                                                        <div className="space-y-2.5">
                                                            {unpaidItems.map((item) => (
                                                                <div 
                                                                    key={`unpaid-${item.instNum}`}
                                                                    className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/70 card-shadow flex items-center justify-between gap-3"
                                                                >
                                                                    <div className="flex items-center gap-3 min-w-0">
                                                                        <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs">
                                                                            <span>#{item.instNum}</span>
                                                                        </div>
                                                                        <div className="min-w-0">
                                                                            <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 truncate">
                                                                                قسط {item.instNum} از {totalInst}
                                                                            </div>
                                                                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                                                                                <Icon name="calendar" className="w-3.5 h-3.5 text-slate-400" />
                                                                                <span>موعد: {formatDateToNumericJalali(item.dateStr)}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-left shrink-0 flex flex-col items-end gap-1">
                                                                        <div className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 dir-ltr">
                                                                            {formatWithCommas(installmentAmount)} <span className="font-sans text-[10px] text-slate-500">تومان</span>
                                                                        </div>
                                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                                            item.daysLeft < 0 
                                                                                ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                                                                                : item.daysLeft === 0
                                                                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                                                                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                                                        }`}>
                                                                            {item.daysLeft < 0 
                                                                                ? `${Math.abs(item.daysLeft)} روز تاخیر` 
                                                                                : item.daysLeft === 0 
                                                                                ? 'سررسید امروز' 
                                                                                : `${item.daysLeft} روز مانده`}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    );
                                                })()}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </section>
                                {/* END: Transactions Section */}

                                                                 {/* Loan Export Button */}
                                 <button 
                                     onClick={() => openUniversalExportModal("loan", selectedLoan)}
                                     className="w-full py-3.5 sm:py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-lg shadow-blue-200 dark:shadow-blue-950/50 active:scale-95 transition-all cursor-pointer"
                                 >
                                     <Icon name="file-output" className="w-5 h-5 text-white" />
                                     <span>خروجی گرفتن از گزارش وام</span>
                                 </button>
                             </div>
                         );

                     case 'archived-period-detail':
                        if (!selectedPeriod) return null;
                        const isDebt = selectedPeriod.type === 'debt';
                        const periodContactObj = contacts.find(c => c.id === selectedPeriod.contactId);
                        const contactDisplayName = periodContactObj 
                            ? `${periodContactObj.firstName || ""} ${periodContactObj.lastName || ""}`.trim() 
                            : (selectedPeriod.contactName || (selectedPeriod.contact ? `${selectedPeriod.contact.firstName || ""} ${selectedPeriod.contact.lastName || ""}`.trim() : "مخاطب"));
                        
                        let periodTxs = transactions.filter(t => t.periodId === selectedPeriod.id);
                        if (periodTxs.length === 0 && selectedPeriod.transactions && selectedPeriod.transactions.length > 0) {
                            periodTxs = selectedPeriod.transactions;
                        }
                        const totalAmt = selectedPeriod.totalAmount || periodTxs.reduce((acc, t) => acc + (t.type === "debt" || t.type === "demand" ? t.amount : 0), 0);

                        return (
                            <div className="space-y-4 animate-fade-in pb-8">
                                {/* Top Header Bar */}
                                <div className="flex justify-between items-center py-1">
                                    <button onClick={onBack ? () => onBack("button") : (() => navigateBack(loanReturnTab || "accounts"))} className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 active:scale-95 transition-transform">
                                        <Icon name="arrow-right" className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                                    </button>
                                    <h1 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                        پرونده تسویه‌شده ({isDebt ? "بدهی" : "طلب"})
                                    </h1>
                                    <div className="flex items-center space-x-1.5 space-x-reverse shrink-0">
                                        <button 
                                            onClick={() => handleDeleteArchivedPeriodClick(selectedPeriod)} 
                                            className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-950/60 flex items-center justify-center shadow-sm border border-red-200 dark:border-red-800/60 active:scale-95 transition-transform text-red-600 dark:text-red-400" 
                                            title="حذف پرونده تسویه‌شده">
                                            <Icon name="trash-2" className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* BEGIN: Archived Period Hero Card (Loan Summary Card Style) */}
                                <div 
                                    className={`rounded-3xl p-5 text-white relative overflow-hidden card-shadow space-y-4 border ${
                                        isDebt 
                                            ? "bg-gradient-to-br from-rose-600 via-red-600 to-rose-900 border-rose-400/30" 
                                            : "bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-900 border-emerald-400/30"
                                    }`}
                                    data-purpose="archived-period-summary-header"
                                >
                                    {/* Decorative Glowing Light & Background Watermark SVG */}
                                    <div className={`absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full blur-2xl pointer-events-none ${isDebt ? "bg-rose-400/20" : "bg-emerald-400/20"}`} />
                                    <div className={`absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 rounded-full blur-2xl pointer-events-none ${isDebt ? "bg-red-500/20" : "bg-teal-500/20"}`} />
                                    
                                    {/* Watermark Icon depending on type */}
                                    <div className="absolute left-4 bottom-1 opacity-15 pointer-events-none text-white">
                                        {isDebt ? (
                                            /* Red Debt Watermark SVG */
                                            <svg fill="currentColor" height="170" viewBox="0 0 24 24" width="170" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 14V6c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4zm-2 4H7V6h10v12zm-9-7h8v2H8zm0 4h5v2H8z"/>
                                            </svg>
                                        ) : (
                                            /* Green Demand Watermark SVG */
                                            <svg fill="currentColor" height="170" viewBox="0 0 24 24" width="170" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                                            </svg>
                                        )}
                                    </div>

                                    <div className="relative z-10 space-y-3">
                                        {/* Top Header Row: Contact Name & Status Badge */}
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-start gap-3 min-w-0 flex-1">
                                                <div className="bg-white/15 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 shrink-0 mt-0.5">
                                                    <Icon name="user" className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h2 className="text-base sm:text-lg font-bold text-white break-words leading-snug">{contactDisplayName}</h2>
                                                    <div className="flex items-center gap-1.5 text-xs opacity-90 mt-1">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                                        <span className="text-white/90 font-medium">
                                                            {isDebt ? "پرونده بدهی تسویه‌شده" : "پرونده طلب تسویه‌شده"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/20 flex items-center space-x-1 space-x-reverse shrink-0">
                                                <Icon name="check-circle-2" className="w-3.5 h-3.5 text-emerald-300" />
                                                <span>تسویه‌شده</span>
                                            </span>
                                        </div>

                                        {/* Total Settled Amount Section */}
                                        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-3.5 py-2 border border-white/10 flex items-center justify-between">
                                            <span className="text-xs text-white/80 font-medium">
                                                {isDebt ? "مبلغ کل بدهی تسویه‌شده" : "مبلغ کل طلب تسویه‌شده"}
                                            </span>
                                            <div className="flex items-baseline gap-1.5 font-mono">
                                                <span className="text-xl sm:text-2xl font-black text-white">{Number(totalAmt).toLocaleString()}</span>
                                                <span className="text-xs text-white/80 font-normal">تومان</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress/Completed Status Bar */}
                                    <div className="pt-2 relative z-10 space-y-1.5">
                                        <div className="flex justify-between items-center text-xs opacity-90">
                                            <span className="text-white/80">وضعیت پرونده</span>
                                            <span className="text-emerald-300 font-bold">۱۰۰٪ تسویه کامل</span>
                                        </div>
                                        <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                                            <div className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full w-full shadow-xs"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* END: Archived Period Hero Card */}

                                {/* BEGIN: Quick Info Connected Single Box (Loan Quick Stats Style) */}
                                <div className="bg-white dark:bg-slate-800 rounded-2xl card-shadow border border-slate-100 dark:border-slate-700/60 p-2 sm:p-3 grid grid-cols-3 divide-x divide-x-reverse divide-slate-100 dark:divide-slate-700/60 text-center" data-purpose="archived-period-quick-stats">
                                    {/* Box 1: Transactions Count */}
                                    <div className="px-1 py-1.5 flex flex-col items-center justify-center text-center min-w-0">
                                        <div className="bg-blue-50 dark:bg-blue-950/60 p-2 rounded-xl inline-flex items-center justify-center mb-1.5 shrink-0">
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 022 2h2a2 2 0 022-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                        </div>
                                        <div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium text-center">تعداد تراکنش‌ها</div>
                                        <div className="text-xs sm:text-sm font-bold text-gray-800 dark:text-slate-100 font-mono mt-0.5 break-words max-w-full text-center leading-tight">
                                            {periodTxs.length}
                                        </div>
                                        <div className="text-[9px] text-gray-400 font-medium text-center mt-0.5">مورد ثبت شده</div>
                                    </div>

                                    {/* Box 2: Start Date */}
                                    <div className="px-1 py-1.5 flex flex-col items-center justify-center text-center min-w-0">
                                        <div className="bg-indigo-50 dark:bg-indigo-950/60 p-2 rounded-xl inline-flex items-center justify-center mb-1.5 shrink-0">
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                        </div>
                                        <div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium text-center">تاریخ شروع</div>
                                        <div className="text-xs sm:text-sm font-bold text-gray-800 dark:text-slate-100 font-mono mt-0.5 break-words max-w-full text-center leading-tight">
                                            {formatDateToNumericJalali(selectedPeriod.startDate) || "نامشخص"}
                                        </div>
                                        <div className="text-[9px] text-gray-400 font-medium text-center mt-0.5">افتتاح پرونده</div>
                                    </div>

                                    {/* Box 3: End Date */}
                                    <div className="px-1 py-1.5 flex flex-col items-center justify-center text-center min-w-0">
                                        <div className="bg-emerald-50 dark:bg-emerald-950/60 p-2 rounded-xl inline-flex items-center justify-center mb-1.5 shrink-0">
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                        </div>
                                        <div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium text-center">تاریخ تسویه</div>
                                        <div className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 break-words max-w-full text-center leading-tight">
                                            {formatDateToNumericJalali(selectedPeriod.endDate) || "امروز"}
                                        </div>
                                        <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 text-center leading-tight break-words">
                                            تسویه‌شده
                                        </div>
                                    </div>
                                </div>
                                {/* END: Quick Info Connected Single Box */}

                                {/* BEGIN: Transactions Section */}
                                <section className="space-y-4" data-purpose="transaction-history">
                                    <div className="flex items-center justify-between px-1">
                                        <div className="flex items-center gap-2">
                                            <svg className="h-5 w-5 text-gray-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-100">تراکنش‌ها</h3>
                                        </div>
                                        <span className={`${isDebt ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"} text-xs font-semibold`}>
                                            {periodTxs.length} تراکنش ثبت‌شده
                                        </span>
                                    </div>

                                    {periodTxs.length === 0 ? (
                                        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60 card-shadow">
                                            هنوز تراکنشی برای این دوره ثبت نشده است
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {periodTxs.map((tx, idx) => {
                                                const isRepay = tx.type === "debt_repayment" || tx.type === "demand_repayment";
                                                return (
                                                    <SwipeableTxCard 
                                                        key={tx.id || idx}
                                                        tx={tx}
                                                        colorType={isDebt ? "rose" : "emerald"}
                                                        contactName={contactDisplayName}
                                                        contacts={contacts}
                                                     loans={loans}
                                                        isHighlighted={tx.id === highlightedTxId}
                                                        onEdit={(txItem) => openStackWizard(isDebt ? (isRepay ? "debt_repayment" : "debt") : (isRepay ? "demand_repayment" : "demand"), "edit", txItem)}
                                                        onDelete={(txItem) => requestDeleteTx(txItem, isDebt ? "debt" : "demand")}
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                                </section>
                                {/* END: Transactions Section */}

                                {/* Export Button */}
                                <button 
                                    onClick={() => {
                                        const exportObj = {
                                            ...selectedPeriod,
                                            transactions: periodTxs
                                        };
                                        openUniversalExportModal("period", exportObj);
                                    }}
                                    className={`w-full py-3.5 sm:py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 text-white shadow-lg active:scale-95 transition-all cursor-pointer ${
                                        isDebt 
                                            ? "bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 shadow-rose-200 dark:shadow-rose-950/50" 
                                            : "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-emerald-200 dark:shadow-emerald-950/50"
                                    }`}
                                >
                                    <Icon name="file-output" className="w-5 h-5 text-white" />
                                    <span>خروجی پرونده تسویه‌حساب</span>
                                </button>
                            </div>
                        );
                    case 'all-transactions':
                        return (
                            <div className="space-y-4 animate-fade-in pb-4">
                                {/* Header in style of Contacts and Accounts pages */}
                                <div className="flex items-center justify-between py-1.5 mb-3">
                                    <div className="flex items-center gap-2.5">
                                        <button 
                                            onClick={onBack ? () => onBack('button') : (() => navigateBack('dashboard'))} 
                                            className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 active:scale-95 transition-transform cursor-pointer shrink-0"
                                            title="بازگشت"
                                        >
                                            <Icon name="arrow-right" className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                                        </button>
                                        <div className="flex items-center gap-2">
                                            <Icon name="receipt" className="w-7 h-7 text-slate-800 dark:text-slate-100" />
                                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">همه تراکنش‌ها</h1>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-2xl border border-indigo-100 dark:border-indigo-800/60 shadow-2xs shrink-0">
                                        <Icon name="layers" className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                                        <span className="text-xs font-extrabold dir-ltr">
                                            {toPersianDigits(transactions.length)}
                                        </span>
                                        <span className="text-xs font-bold opacity-80">تراکنش</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {transactions.slice((allTxsPage - 1) * dynamicPageSize, allTxsPage * dynamicPageSize).map((tx, idx) => (
                                        <SwipeableTxCard
                                            key={tx.id || idx}
                                            tx={tx}
                                            contacts={contacts}
                                            loans={loans}
                                            hasShadow={true}
                                            isHighlighted={tx.id === highlightedTxId}
                                            onEdit={(txItem) => handleTransactionClick(txItem)}
                                            onDelete={(txItem, confirmCb) => requestDeleteTx(txItem, txItem.type || 'tx', confirmCb)}
                                        />
                                    ))}

                                    {transactions.length === 0 && (
                                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60 shadow-sm">
                                            تراکنشی ثبت نشده است
                                        </div>
                                    )}
                                </div>

                                {transactions.length > 0 && (() => {
                                    const totalPages = Math.max(1, Math.ceil(transactions.length / dynamicPageSize));
                                    return (
                                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-sm border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold">
                                            <button 
                                                disabled={allTxsPage <= 1}
                                                onClick={() => setAllTxsPage(p => Math.max(1, p - 1))}
                                                className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1 space-x-reverse transition-all cursor-pointer ${
                                                    allTxsPage <= 1 
                                                        ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent' 
                                                        : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100'
                                                }`}>
                                                <Icon name="chevron-right" className="w-4 h-4" />
                                                <span>صفحه قبل</span>
                                            </button>

                                            <span className="text-slate-600 dark:text-slate-300 font-extrabold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/60">
                                                صفحه {allTxsPage} از {totalPages}
                                            </span>

                                            <button 
                                                disabled={allTxsPage >= totalPages}
                                                onClick={() => setAllTxsPage(p => Math.min(totalPages, p + 1))}
                                                className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1 space-x-reverse transition-all cursor-pointer ${
                                                    allTxsPage >= totalPages 
                                                        ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent' 
                                                        : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100'
                                                }`}>
                                                <span>صفحه بعد</span>
                                                <Icon name="chevron-left" className="w-4 h-4" />
                                            </button>
                                        </div>
                                    );
                                })()}
                            </div>
                        );
                    case 'settings':
                        return (
                            <div className="space-y-3.5 animate-fade-in pb-4">
                                {/* Header / Application Version Card (Single Source of Truth) */}
                                <div 
                                    onClick={toggleVersionCard}
                                    className="bg-white dark:bg-slate-800 rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-slate-700/60 cursor-pointer transition-all hover:border-indigo-300 dark:hover:border-indigo-800 overflow-hidden relative">
                                    
                                    {/* App Header Row (Image on Right, Texts in Middle, Expand Indicator on Left) */}
                                    <div className="flex items-center justify-between py-1">
                                        {/* Right side in RTL: Brand Avatar + Texts */}
                                        <div className="flex items-center space-x-3.5 space-x-reverse min-w-0">
                                            <BrandAvatar className="w-[72px] h-[72px] rounded-2xl shrink-0" logoUrl={versionData.appLogo} />
                                            
                                            <div className="flex flex-col text-right space-y-1 min-w-0">
                                                {/* Line 1: App Name */}
                                                <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight truncate">
                                                    {versionData.appName || "Amir Finance"}
                                                </h2>
                                                
                                                {/* Line 2: Version & Build */}
                                                <div className="flex items-center space-x-2 space-x-reverse text-xs">
                                                    <span className="text-slate-600 dark:text-slate-300 font-mono font-medium">نسخه {versionData.installedVersion}</span>
                                                    <span className="text-slate-300 dark:text-slate-600">•</span>
                                                    <span className="text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded-md text-[11px]">بیلد {versionData.buildNumber}</span>
                                                </div>

                                                {/* Line 3: Latest Version Status */}
                                                <div className="flex items-center pt-0.5">
                                                    {versionData.isUpdateAvailable ? (
                                                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 px-2.5 py-0.5 rounded-full flex items-center space-x-1 space-x-reverse shrink-0">
                                                            <Icon name="arrow-up-circle" className="w-3 h-3" />
                                                            <span>بروزرسانی موجود</span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full flex items-center space-x-1 space-x-reverse shrink-0">
                                                            <Icon name="check-circle-2" className="w-3 h-3" />
                                                            <span>آخرین نسخه</span>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expand indicator (Left in RTL) */}
                                        <div className="flex items-center space-x-1 space-x-reverse shrink-0 self-center pl-1">
                                            <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">{isVersionCardExpanded ? 'بستن' : 'جزئیات'}</span>
                                            <Icon name="chevron-down" className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isVersionCardExpanded ? 'rotate-180' : 'rotate-0'}`} />
                                        </div>
                                    </div>

                                    {/* Expanded Version Management Accordion */}
                                    <div 
                                        className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVersionCardExpanded ? 'grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}
                                        onClick={e => e.stopPropagation()}>
                                        <div className="overflow-hidden space-y-3">
                                            {/* Update Banner & Actions */}
                                            <div className="bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl p-3.5 border border-indigo-100 dark:border-indigo-900/50 flex flex-col space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2.5 space-x-reverse">
                                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${versionData.isUpdateAvailable ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'}`}>
                                                            <Icon name={versionData.isUpdateAvailable ? 'arrow-up-circle' : 'check-circle-2'} className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                                                {versionData.isUpdateAvailable ? `نسخه جدیدتر ${versionData.latestVersion} موجود است` : 'برنامه شما کاملاً بروز است'}
                                                            </div>
                                                            <div className="text-[10px] text-slate-400 mt-0.5">
                                                                {versionData.isUpdateAvailable ? 'امکانات و بهبودهای جدید آماده دریافت است.' : 'شما از آخرین نسخه پایدار Amir Finance استفاده می‌کنید.'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2 space-x-reverse pt-1">
                                                    <button
                                                        onClick={handleCheckForUpdates}
                                                        disabled={isCheckingUpdate}
                                                        className="flex-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 space-x-reverse active:scale-95 transition-all shadow-xs">
                                                        <Icon name={isCheckingUpdate ? 'refresh-cw' : 'rotate-cw'} className={`w-3.5 h-3.5 ${isCheckingUpdate ? 'animate-spin' : ''}`} />
                                                        <span>{isCheckingUpdate ? 'در حال بررسی...' : 'بررسی بروزرسانی'}</span>
                                                    </button>

                                                    {versionData.isUpdateAvailable && (
                                                        <button
                                                            onClick={handleApplyUpdate}
                                                            disabled={isCheckingUpdate}
                                                            className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 space-x-reverse active:scale-95 transition-all shadow-sm">
                                                            <Icon name="download" className="w-3.5 h-3.5" />
                                                            <span>بروزرسانی</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Changelog Card Button (Styled matching the version card) */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsChangelogModalOpen(true);
                                                    setExpandedChangelogVersion(null);
                                                }}
                                                className="w-full py-3 px-4 bg-indigo-50/80 hover:bg-indigo-100/80 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200 rounded-2xl text-xs font-bold transition-all flex items-center justify-between border border-indigo-200/80 dark:border-indigo-800/60 active:scale-98 shadow-2xs font-vazir">
                                                <div className="flex items-center space-x-2.5 space-x-reverse">
                                                    <div className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0">
                                                        <Icon name="history" className="w-4 h-4" />
                                                    </div>
                                                    <span>تاریخچه تغییرات نسخه‌ها (Changelog)</span>
                                                </div>
                                                <div className="flex items-center space-x-1 space-x-reverse text-indigo-600 dark:text-indigo-400">
                                                    <span className="text-[11px] font-bold">مشاهده تغییرات</span>
                                                    <Icon name="chevron-left" className="w-4 h-4" />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                 {/* Settings Sections */}
                                 <div className="space-y-3.5 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 md:items-start">
                                     {/* 1. Appearance (Bento Style in Accordion) */}
                                     <div 
                                         onClick={() => toggleSettingsSection('appearance')}
                                         className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  cursor-pointer transition-all hover:border-indigo-400">
                                         <div className="flex items-center justify-between">
                                             <div className="flex items-center space-x-3.5 space-x-reverse">
                                                 <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                                     <Icon name="palette" className="w-5 h-5" />
                                                 </div>
                                                 <div>
                                                     <h3 className="text-sm font-bold text-slate-900 dark:text-white">ظاهر</h3>
                                                     <p className="text-xs text-slate-400 mt-0.5">تنظیم تم و پوسته برنامه</p>
                                                 </div>
                                             </div>
                                             <Icon name="chevron-down" className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openSettingsSection === 'appearance' ? 'rotate-180' : 'rotate-0'}`} />
                                         </div>

                                         <div className={`grid transition-all duration-300 ease-in-out ${openSettingsSection === 'appearance' ? 'grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`} onClick={e => e.stopPropagation()}>
                                             <div className="overflow-hidden space-y-2.5">
                                                 <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-[20px]">
                                                     {/* System Option */}
                                                     <button 
                                                         type="button"
                                                         onClick={() => setTheme('system')}
                                                         id="theme-system"
                                                         className={`flex flex-col items-center justify-center rounded-[14px] transition-all duration-300 active:scale-95 py-2.5 ${
                                                             theme === 'system' 
                                                                 ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold' 
                                                                 : 'hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium'
                                                         }`}>
                                                         <Icon name="monitor" className={`w-5 h-5 mb-1 scale-90 ${theme === 'system' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`} />
                                                         <span className="text-xs scale-90">سیستم</span>
                                                         {theme === 'system' && <div className="mt-1 w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>}
                                                     </button>

                                                     {/* Light Option */}
                                                     <button 
                                                         type="button"
                                                         onClick={() => setTheme('light')}
                                                         id="theme-light"
                                                         className={`flex flex-col items-center justify-center rounded-[14px] transition-all duration-300 active:scale-95 py-2.5 ${
                                                             theme === 'light' 
                                                                 ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold' 
                                                                 : 'hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium'
                                                         }`}>
                                                         <Icon name="sun" className={`w-5 h-5 mb-1 scale-90 ${theme === 'light' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`} />
                                                         <span className="text-xs scale-90">روشن</span>
                                                         {theme === 'light' && <div className="mt-1 w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>}
                                                     </button>

                                                     {/* Dark Option */}
                                                     <button 
                                                         type="button"
                                                         onClick={() => setTheme('dark')}
                                                         id="theme-dark"
                                                         className={`flex flex-col items-center justify-center rounded-[14px] transition-all duration-300 active:scale-95 py-2.5 ${
                                                             theme === 'dark' 
                                                                 ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400 font-bold' 
                                                                 : 'hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium'
                                                         }`}>
                                                         <Icon name="moon" className={`w-5 h-5 mb-1 scale-90 ${theme === 'dark' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`} />
                                                         <span className="text-xs scale-90">تیره</span>
                                                         {theme === 'dark' && <div className="mt-1 w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>}
                                                     </button>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>

                                     {/* 2. Backup & Restore (Accordion) */}
                                     <div 
                                         onClick={() => toggleSettingsSection('backup')}
                                         className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  cursor-pointer transition-all hover:border-indigo-400">
                                         <div className="flex items-center justify-between">
                                             <div className="flex items-center space-x-3.5 space-x-reverse">
                                                 <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                                     <Icon name="cloud" className="w-5 h-5" />
                                                 </div>
                                                 <div>
                                                     <h3 className="text-sm font-bold text-slate-900 dark:text-white">پشتیبان‌گیری</h3>
                                                     <p className="text-xs text-slate-400 mt-0.5">بکاپ و بازیابی اطلاعات</p>
                                                 </div>
                                             </div>
                                             <Icon name="chevron-down" className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openSettingsSection === 'backup' ? 'rotate-180' : 'rotate-0'}`} />
                                         </div>

                                         <div className={`grid transition-all duration-300 ease-in-out ${openSettingsSection === 'backup' ? 'grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`} onClick={e => e.stopPropagation()}>
                                             <div className="overflow-hidden space-y-1">
                                                 <input 
                                                     type="file" 
                                                     ref={restoreInputRef} 
                                                     onChange={handleRestoreFileChange} 
                                                     accept=".json" 
                                                     className="hidden" 
                                                 />
                                                 <div className="divide-y divide-slate-100 dark:divide-slate-700/60 rounded-xl overflow-hidden">
                                                     {/* Backup Row */}
                                                     <button 
                                                         type="button"
                                                         onClick={handleExportBackup}
                                                          className="w-full flex items-center justify-between p-3.5 hover:bg-[#F4F7FC] dark:hover:bg-slate-700/40 transition-colors group text-right">
                                                          <div className="flex items-center gap-3.5">
                                                              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition-colors text-indigo-600 dark:text-indigo-400 shrink-0">
                                                                  <Icon name="download" className="w-4 h-4" />
                                                              </div>
                                                              <div className="text-right min-w-0">
                                                                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">تهیه نسخه پشتیبان</p>
                                                                  <p className="text-[11px] text-slate-400 mt-0.5">دانلود فایل کامل دیتابیس (JSON)</p>
                                                              </div>
                                                          </div>
                                                          <Icon name="chevron-left" className="w-4 h-4 text-slate-400 scale-90 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors shrink-0" />
                                                      </button>

                                                      {/* Restore Row */}
                                                      <button 
                                                          type="button"
                                                          onClick={() => restoreInputRef.current && restoreInputRef.current.click()}
                                                          className="w-full flex items-center justify-between p-3.5 hover:bg-[#F4F7FC] dark:hover:bg-slate-700/40 transition-colors group text-right">
                                                          <div className="flex items-center gap-3.5">
                                                              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition-colors text-indigo-600 dark:text-indigo-400 shrink-0">
                                                                  <Icon name="upload" className="w-4 h-4" />
                                                              </div>
                                                              <div className="text-right min-w-0">
                                                                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">بازیابی اطلاعات</p>
                                                                  <p className="text-[11px] text-slate-400 mt-0.5">جایگزینی دیتابیس از فایل پشتیبان</p>
                                                              </div>
                                                          </div>
                                                          <Icon name="chevron-left" className="w-4 h-4 text-slate-400 scale-90 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors shrink-0" />
                                                      </button>

                                                      {/* Danger Zone Row */}
                                                      <button 
                                                          type="button" 
                                                          onClick={handleResetDatabaseClick}
                                                         className="w-full flex items-center justify-between p-3.5 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-colors group text-right">
                                                         <div className="flex items-center gap-3.5">
                                                             <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center group-hover:bg-rose-100 dark:group-hover:bg-rose-900/60 transition-colors text-rose-600 dark:text-rose-400 shrink-0">
                                                                 <Icon name="trash-2" className="w-4 h-4" />
                                                             </div>
                                                             <div className="text-right min-w-0">
                                                                 <p className="text-xs font-bold text-rose-600 dark:text-rose-400">حذف کلیه اطلاعات</p>
                                                                 <p className="text-[11px] text-slate-400 mt-0.5">پاکسازی کامل کلیه حساب‌ها و تراکنش‌ها</p>
                                                             </div>
                                                         </div>
                                                         <Icon name="chevron-left" className="w-4 h-4 text-rose-400/60 scale-90 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors shrink-0" />
                                                     </button>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                    {/* 3. Notifications */}
                                    <div 
                                        onClick={() => toggleSettingsSection('notifications')}
                                        className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  cursor-pointer transition-all hover:border-indigo-400">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3.5 space-x-reverse">
                                                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                                                    <Icon name="bell" className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">اعلان‌ها</h3>
                                                    <p className="text-xs text-slate-400 mt-0.5">مدیریت یادآوری‌ها و اعلان‌ها</p>
                                                </div>
                                            </div>
                                            <Icon name="chevron-down" className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openSettingsSection === 'notifications' ? 'rotate-180' : 'rotate-0'}`} />
                                        </div>

                                        <div className={`grid transition-all duration-300 ease-in-out ${openSettingsSection === 'notifications' ? 'grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`} onClick={e => e.stopPropagation()}>
                                            <div className="overflow-hidden space-y-2.5">
                                                <div className="flex items-center justify-between p-3 bg-[#F4F7FC] dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700">
                                                    <div>
                                                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">یادآوری سررسید اقساط</div>
                                                        <div className="text-[10px] text-slate-400 mt-0.5">هشدار پیش‌فرض قبل از سررسید قسط وام</div>
                                                    </div>
                                                    <button 
                                                        onClick={() => setEnableReminders(!enableReminders)}
                                                        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${enableReminders ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${enableReminders ? '-translate-x-5' : 'translate-x-0'}`}></div>
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between p-3 bg-[#F4F7FC] dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700">
                                                    <div>
                                                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">خلاصه روزانه حساب‌ها</div>
                                                        <div className="text-[10px] text-slate-400 mt-0.5">اعلان وضعیت کلی اقساط و سررسیدها</div>
                                                    </div>
                                                    <button 
                                                        onClick={() => setEnableDailyAlerts(!enableDailyAlerts)}
                                                        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${enableDailyAlerts ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${enableDailyAlerts ? '-translate-x-5' : 'translate-x-0'}`}></div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 4. Security */}
                                    <div 
                                        onClick={() => toggleSettingsSection('security')}
                                        className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  cursor-pointer transition-all hover:border-indigo-400">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3.5 space-x-reverse">
                                                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                                    <Icon name="shield-check" className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">امنیت</h3>
                                                    <p className="text-xs text-slate-400 mt-0.5">قفل برنامه و حریم خصوصی</p>
                                                </div>
                                            </div>
                                            <Icon name="chevron-down" className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openSettingsSection === 'security' ? 'rotate-180' : 'rotate-0'}`} />
                                        </div>

                                        <div className={`grid transition-all duration-300 ease-in-out ${openSettingsSection === 'security' ? 'grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`} onClick={e => e.stopPropagation()}>
                                            <div className="overflow-hidden space-y-2.5">
                                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                                    تمامی داده‌ها و تراکنش‌های شما صرفاً روی حافظه دستگاه ذخیره می‌شوند و دارای بالاترین سطح حریم خصوصی می‌باشند.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 5. Data Management */}
                                    <div 
                                        onClick={() => toggleSettingsSection('data')}
                                        className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  cursor-pointer transition-all hover:border-indigo-400">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3.5 space-x-reverse">
                                                <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                                                    <Icon name="folder" className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">داده‌ها</h3>
                                                    <p className="text-xs text-slate-400 mt-0.5">مدیریت داده‌ها و حافظه</p>
                                                </div>
                                            </div>
                                            <Icon name="chevron-down" className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openSettingsSection === 'data' ? 'rotate-180' : 'rotate-0'}`} />
                                        </div>

                                        <div className={`grid transition-all duration-300 ease-in-out ${openSettingsSection === 'data' ? 'grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`} onClick={e => e.stopPropagation()}>
                                            <div className="overflow-hidden space-y-2 text-xs">
                                                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/50">
                                                    <span className="text-slate-500">تعداد مخاطبین:</span>
                                                    <span className="font-bold">{contacts.length} مورد</span>
                                                </div>
                                                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/50">
                                                    <span className="text-slate-500">پرونده‌های وام:</span>
                                                    <span className="font-bold">{loans.length} مورد</span>
                                                </div>
                                                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/50">
                                                    <span className="text-slate-500">تراکنش‌های ثبت‌شده:</span>
                                                    <span className="font-bold">{transactions.length} مورد</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 6. About App */}
                                    <div 
                                        onClick={() => toggleSettingsSection('about')}
                                        className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  cursor-pointer transition-all hover:border-indigo-400">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3.5 space-x-reverse">
                                                <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                                    <Icon name="info" className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">درباره برنامه</h3>
                                                    <p className="text-xs text-slate-400 mt-0.5">اطلاعات برنامه و ارتباط با ما</p>
                                                </div>
                                            </div>
                                            <Icon name="chevron-down" className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openSettingsSection === 'about' ? 'rotate-180' : 'rotate-0'}`} />
                                        </div>

                                        <div className={`grid transition-all duration-300 ease-in-out ${openSettingsSection === 'about' ? 'grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`} onClick={e => e.stopPropagation()}>
                                            <div className="overflow-hidden space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                                <p>برنامه مدیریت مالی Amir Finance ابزاری جهت ثبت و مدیریت وام‌ها، اقساط، طلب‌ها و بدهی‌های شخصی.</p>
                                                <p className="text-[11px] text-slate-400">طراحی و توسعه: Amir Finance</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    default:
                        return null;
                }
            };

            const activeCards = getCurrentWizardCards();

            return (
                <div className={`w-full h-full relative flex flex-col justify-between overflow-hidden ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F4F7FC] text-slate-800'}`}>
                    {/* Startup Splash Screen Overlay */}
                    <AnimatePresence>
                        {showSplashScreen && (
                            <motion.div
                                key="app-splash-screen"
                                initial={{ opacity: 1, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="fixed inset-0 z-[100000] bg-[#0b101d] flex items-center justify-center overflow-hidden pointer-events-auto"
                            >
                                <picture className="w-full h-full flex items-center justify-center">
                                    <source media="(orientation: landscape)" srcSet="./splash-landscape.png?v=2.2.6, ./splash-landscape.jpg?v=2.2.6" />
                                    <source media="(orientation: portrait)" srcSet="./splash-portrait.png?v=2.2.6, ./splash-portrait.jpg?v=2.2.6" />
                                    <img 
                                        src="./splash-portrait.png?v=2.2.6" 
                                        alt="Amir Finance Splash Screen" 
                                        onError={(e) => { 
                                            if (!e.currentTarget.dataset.retry) {
                                                e.currentTarget.dataset.retry = '1';
                                                e.currentTarget.src = './splash-portrait.jpg';
                                            }
                                        }}
                                        className="w-full h-full object-cover object-center" 
                                    />
                                </picture>
                                <div className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center space-y-2 pointer-events-none z-10">
                                    <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* PWA Status Bar Safe Area Top Cover */}
                    <div className={`fixed top-0 inset-x-0 h-[env(safe-area-inset-top,0px)] z-[45] pointer-events-none transition-colors ${
                        !isDark ? 'bg-[#F4F7FC]' : 'bg-slate-950'
                    }`}></div>

                    {/* Notification Toast */}
                    {toastMessage && (
                        <div className="absolute top-[calc(env(safe-area-inset-top,0px)+1rem)] left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white dark:bg-slate-100 dark:text-slate-900 text-xs py-2 px-4 rounded-full shadow-lg border border-slate-700/50 transition-all duration-300">
                            {toastMessage}
                        </div>
                    )}

                    {/* App Content Body */}
                    <div className="flex-1 relative w-full h-full overflow-hidden">
                        <AnimatePresence custom={navDirection} initial={false}>
                            <motion.div
                                key={currentTab + (currentTab === 'contact-detail' ? `-${selectedContact?.id}` : currentTab === 'loan-detail' ? `-${selectedLoan?.id}` : currentTab === 'archived-period-detail' ? `-${selectedPeriod?.id}` : '')}
                                custom={navDirection}
                                variants={pageSlideVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                style={{ willChange: 'transform', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
                                className="w-full h-full absolute inset-0 overflow-y-auto overflow-x-clip overscroll-x-none bg-[#F4F7FC] dark:bg-slate-950 z-10"
                            >
                                {['contact-detail', 'loan-detail', 'archived-period-detail', 'all-transactions'].includes(currentTab) ? (
                                    <div className="flex-1 relative w-full h-full">
                                        {currentTab === 'contact-detail' && selectedContact && (
                                            <SwipeBackWrapper 
                                                onBack={() => navigateToTab(loanReturnTab || 'contacts', 'none')}
                                                navDirection={navDirection}
                                                onRefresh={() => handleRefreshData('contact-detail')}
                                                underlyingContent={renderTab(getUnderlyingTabForSubpage('contact-detail'))}
                                            >
                                                {({ onBack }) => renderTab('contact-detail', onBack)}
                                            </SwipeBackWrapper>
                                        )}

                                        {currentTab === 'loan-detail' && selectedLoan && (
                                            <SwipeBackWrapper 
                                                onBack={() => navigateToTab(loanReturnTab || 'accounts', 'none')}
                                                navDirection={navDirection}
                                                onRefresh={() => handleRefreshData('loan-detail')}
                                                underlyingContent={renderTab(getUnderlyingTabForSubpage('loan-detail'))}
                                            >
                                                {({ onBack }) => renderTab('loan-detail', onBack)}
                                            </SwipeBackWrapper>
                                        )}

                                        {currentTab === 'archived-period-detail' && selectedPeriod && (
                                            <SwipeBackWrapper 
                                                onBack={() => navigateToTab(loanReturnTab || 'contact-detail', 'none')}
                                                navDirection={navDirection}
                                                onRefresh={() => handleRefreshData('archived-period-detail')}
                                                underlyingContent={renderTab(getUnderlyingTabForSubpage('archived-period-detail'))}
                                            >
                                                {({ onBack }) => renderTab('archived-period-detail', onBack)}
                                            </SwipeBackWrapper>
                                        )}

                                        {currentTab === 'all-transactions' && (
                                            <SwipeBackWrapper 
                                                onBack={() => navigateToTab('dashboard', 'none')}
                                                navDirection={navDirection}
                                                onRefresh={() => handleRefreshData('all-transactions')}
                                                underlyingContent={renderTab(getUnderlyingTabForSubpage('all-transactions'))}
                                            >
                                                {({ onBack }) => renderTab('all-transactions', onBack)}
                                            </SwipeBackWrapper>
                                        )}
                                    </div>
                                ) : (
                                    <PullToRefresh onRefresh={() => handleRefreshData(currentTab)} className="flex-1 px-4 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] pb-[4.25rem] h-full overflow-y-auto overflow-x-clip overscroll-x-none">
                                        {currentTab === 'dashboard' && renderTab('dashboard')}
                                        {currentTab === 'accounts' && renderTab('accounts')}
                                        {currentTab === 'contacts' && renderTab('contacts')}
                                        {currentTab === 'settings' && renderTab('settings')}
                                    </PullToRefresh>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Backdrop Overlay when FAB Menu is open */}
                    <AnimatePresence>
                        {showPlusMenu && (
                            <motion.div 
                                key="fab-backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => closePlusMenu()}
                                className="absolute inset-0 bg-black/40 backdrop-blur-xs z-30"
                            />
                        )}
                    </AnimatePresence>

                    {/* FAB Genie Menu Floating Container (Anchored ABOVE the bottom bar FAB button) */}
                    <div className="fixed bottom-[3.85rem] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none">
                        <AnimatePresence>
                            {showPlusMenu && (
                                <motion.div
                                    key="genie-fixed"
                                    initial={{ opacity: 0, scaleX: 0.1, scaleY: 0.05, y: 100, clipPath: "polygon(40% 100%, 60% 100%, 50% 100%, 50% 100%)" }}
                                    animate={{ opacity: 1, scaleX: 1, scaleY: 1, y: -16, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                                    exit={{ 
                                        opacity: 0, 
                                        scaleX: 0.08, 
                                        scaleY: 0.05, 
                                        y: 80, 
                                        clipPath: "polygon(30% 0%, 70% 0%, 55% 100%, 45% 100%)",
                                        transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } 
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                    style={{ transformOrigin: "bottom center" }}
                                    className="pointer-events-auto w-[310px] sm:w-[330px] bg-white/95 dark:bg-slate-800/95 backdrop-blur-3xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xl p-5 mb-2 flex flex-col gap-3 rounded-3xl text-slate-800 dark:text-slate-100"
                                >
                                    <h3 className="text-center font-extrabold text-slate-900 dark:text-white text-sm mb-0.5">ثبت و مدیریت جدید</h3>

                                    {/* مخاطب جدید */}
                                    <button 
                                        onClick={() => closePlusMenu(() => openStackWizard('contact', 'add'))}
                                        className="w-full bg-[#F4F7FC]/90 dark:bg-slate-900/60 p-2.5 rounded-2xl flex items-center space-x-3 space-x-reverse border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-400 active:scale-[0.97] transition-all">
                                        <div className="w-8.5 h-8.5 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                                            <Icon name="user-plus" className="w-4 h-4" />
                                        </div>
                                        <div className="text-right min-w-0 flex-1">
                                            <span className="font-bold text-xs text-slate-800 dark:text-slate-100 block">مخاطب جدید</span>
                                            <span className="text-[10px] text-slate-400 font-normal truncate block">افزودن شخص جدید به دفتر مخاطبین</span>
                                        </div>
                                    </button>

                                    {/* طلب / بازپرداخت طلب */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <button 
                                            onClick={() => closePlusMenu(() => openStackWizard('demand', 'add'))}
                                            className="bg-[#F4F7FC]/90 dark:bg-slate-900/60 p-2.5 rounded-2xl flex items-center space-x-2 space-x-reverse border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-400 active:scale-[0.97] transition-all">
                                            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                                <Icon name="arrow-up-right" className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-xs text-slate-800 dark:text-slate-100">ثبت طلب</span>
                                        </button>

                                        <button 
                                            onClick={() => closePlusMenu(() => openStackWizard('demand_repayment', 'add'))}
                                            className="bg-[#F4F7FC]/90 dark:bg-slate-900/60 p-2.5 rounded-2xl flex items-center space-x-2 space-x-reverse border border-slate-200/80 dark:border-slate-700/60 hover:border-teal-400 active:scale-[0.97] transition-all">
                                            <div className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                                                <Icon name="check-circle-2" className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-xs text-slate-800 dark:text-slate-100">بازپرداخت طلب</span>
                                        </button>
                                    </div>

                                    {/* بدهی / بازپرداخت بدهی */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <button 
                                            onClick={() => closePlusMenu(() => openStackWizard('debt', 'add'))}
                                            className="bg-[#F4F7FC]/90 dark:bg-slate-900/60 p-2.5 rounded-2xl flex items-center space-x-2 space-x-reverse border border-slate-200/80 dark:border-slate-700/60 hover:border-rose-400 active:scale-[0.97] transition-all">
                                            <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0">
                                                <Icon name="arrow-down-left" className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-xs text-slate-800 dark:text-slate-100">ثبت بدهی</span>
                                        </button>

                                        <button 
                                            onClick={() => closePlusMenu(() => openStackWizard('debt_repayment', 'add'))}
                                            className="bg-[#F4F7FC]/90 dark:bg-slate-900/60 p-2.5 rounded-2xl flex items-center space-x-2 space-x-reverse border border-slate-200/80 dark:border-slate-700/60 hover:border-amber-400 active:scale-[0.97] transition-all">
                                            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                                                <Icon name="corner-down-left" className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-xs text-slate-800 dark:text-slate-100">بازپرداخت بدهی</span>
                                        </button>
                                    </div>

                                    {/* وام / پرداخت قسط */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <button 
                                            onClick={() => closePlusMenu(() => openStackWizard('loan', 'add'))}
                                            className="bg-[#F4F7FC]/90 dark:bg-slate-900/60 p-2.5 rounded-2xl flex items-center space-x-2 space-x-reverse border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-400 active:scale-[0.97] transition-all">
                                            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                                <Icon name="landmark" className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-xs text-slate-800 dark:text-slate-100">ثبت وام</span>
                                        </button>

                                        <button 
                                            onClick={() => closePlusMenu(() => openStackWizard('installment', 'add'))}
                                            className="bg-[#F4F7FC]/90 dark:bg-slate-900/60 p-2.5 rounded-2xl flex items-center space-x-2 space-x-reverse border border-slate-200/80 dark:border-slate-700/60 hover:border-purple-400 active:scale-[0.97] transition-all">
                                            <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                                                <Icon name="receipt" className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-xs text-slate-800 dark:text-slate-100">پرداخت قسط</span>
                                        </button>
                                    </div>

                                    <button onClick={() => closePlusMenu()} className="w-full py-1 text-center font-bold text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                        انصراف
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Bar at Bottom */}
                    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 flex flex-col justify-end">
                        <div className="w-full flex items-center justify-around px-2 h-14 max-w-lg mx-auto">
                            <NavRippleButton 
                                id="nav-btn-home"
                                onClick={() => navigateToTab('dashboard', 'none')}
                                isActive={currentTab === 'dashboard'}
                                iconName="home"
                                label="خانه"
                            />

                            <NavRippleButton 
                                id="nav-btn-accounts"
                                onClick={() => navigateToTab('accounts', 'none')}
                                isActive={currentTab === 'accounts'}
                                iconName="wallet"
                                label="حساب‌ها"
                            />

                            {/* Plus Button Slot */}
                            <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
                                <motion.button 
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => {
                                        if (showPlusMenu) {
                                            closePlusMenu();
                                        } else {
                                            setShowPlusMenu(true);
                                        }
                                    }}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg absolute -top-3 z-[50] transition-colors duration-300 ${
                                        showPlusMenu 
                                            ? 'bg-red-500 hover:bg-red-600 shadow-red-500/35 ring-4 ring-red-500/25' 
                                            : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
                                    }`}>
                                    <motion.div 
                                        className="flex items-center justify-center w-full h-full leading-none shrink-0"
                                        animate={{ rotate: showPlusMenu ? 135 : 0 }} 
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                                        <Icon name="plus" className="w-6 h-6 shrink-0 block" />
                                    </motion.div>
                                </motion.button>
                            </div>

                            <NavRippleButton 
                                id="nav-btn-contacts"
                                onClick={() => navigateToTab('contacts', 'none')}
                                isActive={currentTab === 'contacts'}
                                iconName="users"
                                label="مخاطبین"
                            />

                            <NavRippleButton 
                                id="nav-btn-settings"
                                onClick={() => navigateToTab('settings', 'none')}
                                isActive={currentTab === 'settings'}
                                iconName="settings"
                                label="تنظیمات"
                            />
                        </div>
                    </div>

                    {/* Stack Wizard Modal (وام، طلب، قرض، قسط) */}
                    <AnimatePresence>
                        {showStackWizard && (
                            <motion.div 
                                key="stack-wizard-backdrop"
                                variants={iosBackdropVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className={`absolute inset-0 z-50 flex flex-col justify-start items-center px-3 pb-2 pt-[calc(env(safe-area-inset-top,0px)+4px)] overflow-hidden ${
                                    !isDark ? 'bg-[#F4F7FC]' : 'bg-[#0b101d]/90 backdrop-blur-md'
                                }`}
                            >
                                {/* PWA Status Bar Safe Area Cover */}
                                <div className={`fixed top-0 inset-x-0 h-[env(safe-area-inset-top,0px)] z-[60] ${
                                    !isDark ? 'bg-[#F4F7FC]' : 'bg-[#0b101d] backdrop-blur-md'
                                }`}></div>
                                <motion.div
                                    key="stack-wizard-panel"
                                    variants={iosModalVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    style={{ transformOrigin: "center center" }}
                                    className="w-full max-w-md md:max-w-2xl flex flex-col items-center mx-auto h-full pt-0.5"
                                >
                                    {(wizardMode === 'edit' || wizardViewStyle === 'stacked') ? (
                                        /* Premium Mobile Vertical Sticky Stacked Cards Editing View */
                                        <div className="w-full flex flex-col items-center h-full max-h-[96vh] relative">
                                            {/* Scrollable Floating Cards Area */}
                                            <div 
                                                ref={editCardsContainerRef}
                                                className={`w-full flex-1 hide-scrollbar pt-0.5 px-1 space-y-4 relative pb-2 ${editingCardId !== null ? "overflow-hidden touch-none" : "overflow-y-auto overflow-x-clip overscroll-x-none"}`}
                                            >
                                                {activeCards.map((card, index) => {
                                                    const isLastCard = index === activeCards.length - 1;
                                                    const isEditingThis = editingCardId === card.id;
                                                    const isOtherCardBlur = editingCardId !== null && editingCardId !== card.id;
                                                    const isModified = modifiedCardIds.includes(card.id);

                                                    return (
                                                        <div 
                                                            key={card.id}
                                                            id={`sticky-card-${card.id}`}
                                                            className="sticky w-[96%] max-w-md mx-auto"
                                                            style={{
                                                                top: `${index * 8}px`,
                                                                zIndex: isEditingThis ? 200 : (index + 10),
                                                                transform: isEditingThis ? 'translate3d(0,0,1px)' : 'none',
                                                                WebkitTransform: isEditingThis ? 'translate3d(0,0,1px)' : 'none'
                                                            }}
                                                        >
                                                            <motion.div 
                                                                initial={{ y: 20 }}
                                                                animate={{ 
                                                                    opacity: isOtherCardBlur ? 0.6 : 1, 
                                                                    scale: isEditingThis ? 1.0 : (isOtherCardBlur ? 0.95 : 0.98),
                                                                    y: (peekAnim && index > 0) ? -80 : 0
                                                                }}
                                                                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                                                                className={`w-full rounded-3xl p-5 sm:p-6 border transition-all duration-200 ease-out bg-white dark:bg-slate-800 h-[385px] max-h-[385px] flex flex-col justify-between overflow-hidden ${
                                                                    isEditingThis 
                                                                        ? 'shadow-2xl shadow-indigo-500/20 ring-2 ring-indigo-500/50 border-indigo-500 dark:border-indigo-400' 
                                                                        : 'shadow-[0_-12px_28px_rgba(15,23,42,0.16)] dark:shadow-[0_-12px_32px_rgba(0,0,0,0.65)] border-slate-200/80 dark:border-slate-700/80 border-t-white dark:border-t-slate-700/90 hover:border-indigo-300 dark:hover:border-indigo-600 cursor-pointer'
                                                                } ${
                                                                    isOtherCardBlur ? 'pointer-events-none select-none' : ''
                                                                } ${
                                                                    shakeCardId === card.id ? 'animate-shake' : ''
                                                                }`}
                                                                onClick={(e) => {
                                                                    if (!isEditingThis && editingCardId === null) {
                                                                        handleStartEditingCard(card);
                                                                    }
                                                                }}
                                                            >
                                                            {/* Card Editable Inputs Body - Exact match to stack card appearance */}
                                                            <div className={`flex-1 min-h-0 py-1 overflow-y-auto hide-scrollbar transition-all duration-200 ${!isEditingThis ? 'pointer-events-none opacity-95' : ''}`}>
                                                                {card.render()}
                                                            </div>

                                                            {/* Card Action Bar */}
                                                            <div className="pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between shrink-0 h-12">
                                                                <AnimatePresence mode="wait">
                                                                    {isEditingThis ? (
                                                                        <motion.div 
                                                                            key="editing-actions"
                                                                            initial={{ opacity: 0, y: 5 }}
                                                                            animate={{ opacity: 1, y: 0 }}
                                                                            exit={{ opacity: 0, y: -5 }}
                                                                            transition={{ duration: 0.18 }}
                                                                            className="w-full flex items-center space-x-2 space-x-reverse"
                                                                        >
                                                                            <button 
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    cancelEditingCard();
                                                                                }}
                                                                                className="w-1/3 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-1 space-x-reverse"
                                                                            >
                                                                                <Icon name="x" className="w-3.5 h-3.5 shrink-0" />
                                                                                <span>انصراف</span>
                                                                            </button>

                                                                            <button 
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    saveEditingCard(card);
                                                                                }}
                                                                                className="w-2/3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5 space-x-reverse"
                                                                            >
                                                                                <Icon name="check" className="w-3.5 h-3.5 shrink-0" />
                                                                                <span>ثبت تغییرات</span>
                                                                            </button>
                                                                        </motion.div>
                                                                    ) : (
                                                                        <motion.div 
                                                                            key="view-actions"
                                                                            initial={{ opacity: 0, y: -5 }}
                                                                            animate={{ opacity: 1, y: 0 }}
                                                                            exit={{ opacity: 0, y: 5 }}
                                                                            transition={{ duration: 0.18 }}
                                                                            className="w-full flex items-center justify-between"
                                                                        >
                                                                            <div className="flex items-center space-x-2 space-x-reverse">
                                                                                <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400">
                                                                                    کارت {index + 1} از {activeCards.length}: {card.title}
                                                                                </span>
                                                                                {isModified && (
                                                                                    <span className="inline-flex items-center gap-1 bg-emerald-500/15 dark:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-emerald-500/30">
                                                                                        <Icon name="check" className="w-3 h-3" />
                                                                                        <span>اصلاح‌شده</span>
                                                                                    </span>
                                                                                )}
                                                                            </div>

                                                                            <button 
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleStartEditingCard(card);
                                                                                }}
                                                                                className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 space-x-reverse"
                                                                            >
                                                                                <Icon name="edit-2" className="w-3.5 h-3.5 shrink-0" />
                                                                                <span>ویرایش</span>
                                                                            </button>
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                            </div>
                                                            </motion.div>
                                                        </div>
                                                    );
                                                })}

                                                {/* Dynamic bottom spacer allowing the last card to scroll up exactly to its cascade position in the sticky stack */}
                                                <div 
                                                    aria-hidden="true" 
                                                    className="w-full shrink-0 pointer-events-none"
                                                    style={{
                                                        height: editCardsContainerHeight > 0 
                                                            ? `${Math.max(24, Math.round(editCardsContainerHeight - 385 - (activeCards.length - 1) * 8 + 8))}px`
                                                            : `max(24px, calc(100vh - ${385 + (activeCards.length - 1) * 8 + 120}px))`
                                                    }}
                                                />
                                            </div>

                                            {/* Floating Close X Button at Bottom */}
                                            <div className="w-full flex justify-center items-center py-2 shrink-0 z-40 relative">
                                                <motion.button 
                                                    type="button"
                                                    whileTap={{ scale: 0.88 }}
                                                    onClick={() => closeStackWizard(false)}
                                                    className="w-12 h-12 rounded-full bg-slate-900/85 hover:bg-slate-900 active:scale-90 text-white flex items-center justify-center border border-white/20 shadow-2xl transition-all cursor-pointer backdrop-blur-lg"
                                                    title="بستن"
                                                >
                                                    <Icon name="x" className="w-6 h-6" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Step-by-Step Stack Card Mode */
                                        <div className="w-full flex flex-col items-center pt-0.5">


                                            <div className={`card-stack-container w-full ${isFinalSubmitting ? 'card-stack-fall-submit' : ''}`}>
                                                {activeCards.map((card, index) => (
                                                    <StackCardItem 
                                                        key={card.id}
                                                        card={card}
                                                        index={index}
                                                        currentCardIdx={currentCardIdx}
                                                        animatingCard={animatingCard}
                                                        animatingPrevCard={animatingPrevCard}
                                                        handlePrevCard={handlePrevCard}
                                                        handleNextCard={() => handleNextCard(activeCards)}
                                                        totalCards={activeCards.length}
                                                        showStackWizard={showStackWizard}
                                                        shakeCardId={shakeCardId}
                                                    />
                                                ))}
                                            </div>

                                            {/* Progress dots */}
                                            <div className="flex justify-center items-center space-x-1.5 space-x-reverse mt-2.5">
                                                {activeCards.map((_, i) => (
                                                    <div 
                                                        key={i} 
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                                            i === currentCardIdx ? 'w-6 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'w-1.5 bg-slate-400/40'
                                                        }`}
                                                    />
                                                ))}
                                            </div>

                                            {/* Bottom Center Close X Button */}
                                            <div className="flex justify-center items-center mt-3.5 mb-1">
                                                <motion.button 
                                                    type="button"
                                                    whileTap={{ scale: 0.88 }}
                                                    onClick={() => closeStackWizard(false)}
                                                    className="w-12 h-12 rounded-full bg-slate-900/85 hover:bg-slate-900 active:scale-90 text-white flex items-center justify-center border border-white/20 shadow-2xl transition-all cursor-pointer backdrop-blur-lg"
                                                    title="بستن"
                                                >
                                                    <Icon name="x" className="w-6 h-6" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Exit Confirmation Dialog for Unsaved Changes */}
                    <AnimatePresence>
                        {showUnsavedConfirmDialog && (
                            <motion.div 
                                key="unsaved-confirm-backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
                            >
                                <motion.div 
                                    key="unsaved-confirm-panel"
                                    initial={{ scale: 0.88, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.88, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                    className="bg-white dark:bg-slate-800 rounded-3xl p-5 max-w-xs w-full text-center space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-500 mx-auto flex items-center justify-center">
                                        <Icon name="alert-triangle" className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-slate-800 dark:text-white text-sm">تغییرات ذخیره‌نشده</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                            شما {modifiedCardIds.length} تغییر ذخیره‌نشده دارید. آیا مایلید تغییرات نادیده گرفته شوند و خارج شوید؟
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            type="button"
                                            onClick={() => setShowUnsavedConfirmDialog(false)}
                                            className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                        >
                                            ادامه ویرایش
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => closeStackWizard(true)}
                                            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
                                        >
                                            خروج بدون ذخیره
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Universal Export Modal */}
                    <AnimatePresence>
                        {(exportModalConfig?.isOpen || showExportModal) && (
                            <motion.div 
                                key="universal-export-modal-backdrop"
                                variants={iosBackdropVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
                            >
                                <motion.div 
                                    key="universal-export-modal-panel"
                                    variants={iosModalVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    style={{ transformOrigin: "center center" }}
                                    className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-[28px] p-5 space-y-4 border border-slate-100 dark:border-slate-800 shadow-2xl"
                                >
                                    <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto"></div>
                                    <div className="text-center">
                                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">دریافت خروجی گزارش</h3>
                                        <p className="text-xs text-slate-400 mt-1">فرمت مورد نظر خود جهت ذخیره‌سازی را انتخاب کنید</p>
                                    </div>
                                    <div className="space-y-2.5">
                                        <button 
                                            onClick={() => {
                                                const type = exportModalConfig?.type || 'loan';
                                                const targetData = exportModalConfig?.data || selectedLoan;
                                                if (type === 'period') {
                                                    exportPeriodAsExcel(targetData);
                                                    showToast('خروجی اکسل دوره با موفقیت دانلود شد');
                                                } else {
                                                    exportLoanToCSV(targetData, transactions);
                                                    showToast('خروجی اکسل وام با موفقیت دانلود شد');
                                                }
                                                setExportModalConfig(null);
                                                setShowExportModal(false);
                                            }}
                                            className="w-full bg-[#F4F7FC] dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 p-3.5 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-slate-700 transition-all">
                                            <div className="flex items-center space-x-3 space-x-reverse">
                                                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                                                    CSV
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-xs text-slate-800 dark:text-slate-100">دانلود فایل اکسل / CSV</div>
                                                    <div className="text-[10px] text-slate-400">مناسب جهت بررسی و باز کردن در اکسل</div>
                                                </div>
                                            </div>
                                            <Icon name="download" className="w-4 h-4 text-slate-400" />
                                        </button>

                                        <button 
                                            onClick={() => {
                                                const type = exportModalConfig?.type || 'loan';
                                                const targetData = exportModalConfig?.data || selectedLoan;
                                                if (type === 'period') {
                                                    exportPeriodAsPNG(targetData);
                                                    showToast('خروجی تصویر باکیفیت دوره با موفقیت دانلود شد');
                                                } else {
                                                    exportLoanAsPNG(targetData, transactions);
                                                    showToast('خروجی تصویر باکیفیت وام با موفقیت دانلود شد');
                                                }
                                                setExportModalConfig(null);
                                                setShowExportModal(false);
                                            }}
                                            className="w-full bg-[#F4F7FC] dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 p-3.5 rounded-2xl flex items-center justify-between border border-slate-100 dark:border-slate-700 transition-all">
                                            <div className="flex items-center space-x-3 space-x-reverse">
                                                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
                                                    PNG
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-xs text-slate-800 dark:text-slate-100">دانلود تصویر گرافیکی (PNG)</div>
                                                    <div className="text-[10px] text-slate-400">تصویر با وضوح بالا همراه با کارت اطلاعات و پرداختی‌ها</div>
                                                </div>
                                            </div>
                                            <Icon name="download" className="w-4 h-4 text-slate-400" />
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setExportModalConfig(null);
                                            setShowExportModal(false);
                                        }} 
                                        className="w-full py-2 text-center font-bold text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                    >
                                        انصراف
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Modal: Export Completed Periods */}
                    <AnimatePresence>
                        {showCompletedExportModal.show && (
                            <motion.div 
                                key="completed-export-modal-backdrop"
                                variants={iosBackdropVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
                            >
                                <motion.div 
                                    key="completed-export-modal-panel"
                                    variants={iosModalVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    style={{ transformOrigin: "center center" }}
                                    className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-[28px] p-5 pb-8 space-y-4 border border-slate-100 dark:border-slate-800 shadow-2xl max-h-[85vh] overflow-y-auto overflow-x-clip overscroll-x-none"
                                >
                                    <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto"></div>
                                    <div className="text-center">
                                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                                            خروجی دوره‌های تسویه‌شده {showCompletedExportModal.type === 'debt' ? 'بدهی' : 'طلب'}
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-1">
                                            مخاطب: {showCompletedExportModal.contact ? `${showCompletedExportModal.contact.firstName} ${showCompletedExportModal.contact.lastName}` : '-'}
                                        </p>
                                    </div>

                                    {(() => {
                                        const contact = showCompletedExportModal.contact;
                                        const type = showCompletedExportModal.type;
                                        if (!contact) return null;

                                        let periods = completedPeriods.filter(p => p.contactId === contact.id && p.type === type);

                                        if (periods.length === 0) {
                                            const contactTxs = transactions.filter(t => t.contactId === contact.id && (t.type === type || t.type === `${type}_repayment`));
                                            if (contactTxs.length > 0) {
                                                let sum = 0;
                                                let initialSum = 0;
                                                contactTxs.forEach(t => {
                                                    if (t.type === type) { sum += Math.abs(t.amount); initialSum += Math.abs(t.amount); }
                                                    if (t.type === `${type}_repayment`) { sum -= Math.abs(t.amount); }
                                                });
                                                if (sum <= 0 && initialSum > 0) {
                                                    periods = [{
                                                        id: 'p_auto_' + Date.now(),
                                                        contactId: contact.id,
                                                        contactName: `${contact.firstName} ${contact.lastName}`,
                                                        type: type,
                                                        title: `دوره تسویه‌شده ${type === 'debt' ? 'بدهی' : 'طلب'}`,
                                                        totalAmount: initialSum,
                                                        startDate: contactTxs[contactTxs.length - 1]?.dateStr || 'نامشخص',
                                                        endDate: contactTxs[0]?.dateStr || 'امروز',
                                                        transactions: contactTxs
                                                    }];
                                                }
                                            }
                                        }

                                        if (periods.length === 0) {
                                            return (
                                                <div className="bg-[#F4F7FC] dark:bg-slate-800/60 p-6 rounded-2xl text-center text-xs text-slate-400">
                                                    هنوز هیچ دوره تسویه‌شده‌ای برای این مخاطب ثبت نشده است.
                                                </div>
                                            );
                                        }

                                        return (
                                            <div className="space-y-3">
                                                {periods.map(period => (
                                                    <div key={period.id} className="bg-[#F4F7FC] dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/80 space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs font-bold text-slate-900 dark:text-white">{period.title}</span>
                                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                                                                تسویه‌شده
                                                            </span>
                                                        </div>
                                                        <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                                                            <div>مبلغ کل دوره: <strong className="text-slate-800 dark:text-slate-200">{Number(period.totalAmount).toLocaleString()} تومان</strong></div>
                                                            <div>بازه زمانی: {period.startDate} تا {period.endDate}</div>
                                                            <div>تعداد پرداختی‌ها: {period.transactions ? period.transactions.length : 0} مورد</div>
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                exportPeriodAsPNG(period);
                                                                showToast('خروجی PNG دوره تسویه ساخته و دانلود شد');
                                                            }}
                                                            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 space-x-reverse shadow-md transition-colors">
                                                            <Icon name="download" className="w-3.5 h-3.5" />
                                                            <span>دانلود خروجی PNG</span>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })()}

                                    <button onClick={() => setShowCompletedExportModal({ show: false, contact: null, type: 'debt' })} className="w-full py-2 text-center font-bold text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">انصراف</button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Modal: Confirm Delete Transaction */}
                    <AnimatePresence>
                        {deleteTxModal.show && (
                            <motion.div 
                                key="delete-tx-backdrop"
                                variants={iosBackdropVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                            >
                                <motion.div 
                                    key="delete-tx-panel"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="bg-white dark:bg-slate-800 w-full max-w-xs rounded-3xl p-5 space-y-4 text-center shadow-2xl border border-slate-100 dark:border-slate-700"
                                >
                                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center">
                                        <Icon name="trash-2" className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">حذف تراکنش</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">آیا از حذف اطمینان دارید؟</p>
                                        {deleteTxModal.tx && (
                                            <div className="mt-2 p-2.5 bg-[#F4F7FC] dark:bg-slate-900 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-300">
                                                {deleteTxModal.tx.title} ({Math.abs(deleteTxModal.tx.amount).toLocaleString()} تومان)
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex space-x-2 space-x-reverse pt-1">
                                        <button 
                                            onClick={handleConfirmDeleteTx}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors">
                                            بله
                                        </button>
                                        <button 
                                            onClick={() => setDeleteTxModal({ show: false, tx: null, type: null })}
                                            className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2.5 rounded-xl text-xs hover:bg-slate-200 transition-colors">
                                            خیر
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Modal: Add New Contact */}
                    <AnimatePresence>
                        {showAddContactModal && (
                            <motion.div 
                                key="add-contact-backdrop"
                                variants={iosBackdropVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-6 overflow-y-auto overflow-x-clip overscroll-x-none"
                            >
                                <motion.div 
                                    key="add-contact-panel"
                                    variants={iosModalVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    style={{ transformOrigin: "center center" }}
                                    className="bg-white dark:bg-slate-800 w-full rounded-3xl p-5 space-y-3 mt-0 shadow-2xl"
                                >
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">افزودن مخاطب جدید</h3>
                                    <input 
                                        type="text" 
                                        placeholder="نام" 
                                        value={newContactForm.firstName} 
                                        onChange={(e) => setNewContactForm({...newContactForm, firstName: e.target.value})}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="نام خانوادگی" 
                                        value={newContactForm.lastName} 
                                        onChange={(e) => setNewContactForm({...newContactForm, lastName: e.target.value})}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="شماره تماس" 
                                        value={newContactForm.phone} 
                                        onChange={(e) => setNewContactForm({...newContactForm, phone: e.target.value})}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="نام بانک / حساب (مثلاً بانک ملی)" 
                                        value={newContactForm.bankName} 
                                        onChange={(e) => setNewContactForm({...newContactForm, bankName: e.target.value})}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="شماره کارت (اختیاری)" 
                                        value={newContactForm.bankCard} 
                                        onChange={(e) => setNewContactForm({...newContactForm, bankCard: e.target.value})}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="شماره شبا (اختیاری)" 
                                        value={newContactForm.iban} 
                                        onChange={(e) => setNewContactForm({...newContactForm, iban: e.target.value})}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs" 
                                    />
                                    <div className="flex space-x-2 space-x-reverse pt-2">
                                        <button onClick={handleCreateContact} className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold">ذخیره</button>
                                        <button onClick={() => setShowAddContactModal(false)} className="flex-1 bg-slate-100 dark:bg-slate-700 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300">انصراف</button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Modal: Edit Contact */}
                    <AnimatePresence>
                        {showEditContactModal && (
                            <motion.div 
                                key="edit-contact-backdrop"
                                variants={iosBackdropVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-6 overflow-y-auto overflow-x-clip overscroll-x-none"
                            >
                                <motion.div 
                                    key="edit-contact-panel"
                                    variants={iosModalVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    style={{ transformOrigin: "center center" }}
                                    className="bg-white dark:bg-slate-800 w-full rounded-3xl p-5 space-y-3 mt-0 shadow-2xl"
                                >
                                    <div className="flex justify-between items-center pb-1">
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">ویرایش اطلاعات مخاطب</h3>
                                        <button 
                                            type="button"
                                            onClick={handleDeleteContact}
                                            className="bg-red-500 hover:bg-red-600 active:scale-95 text-white px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-sm flex items-center space-x-1 space-x-reverse transition-all">
                                            <Icon name="trash-2" className="w-3.5 h-3.5" />
                                            <span>حذف مخاطب</span>
                                        </button>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="نام" 
                                        value={editContactForm.firstName} 
                                        onChange={(e) => setEditContactForm({...editContactForm, firstName: e.target.value})}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="نام خانوادگی" 
                                        value={editContactForm.lastName} 
                                        onChange={(e) => setEditContactForm({...editContactForm, lastName: e.target.value})}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="شماره تماس" 
                                        value={editContactForm.phone} 
                                        onChange={(e) => setEditContactForm({...editContactForm, phone: e.target.value})}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="نام بانک / حساب (مثلاً بانک ملی)" 
                                        value={editContactForm.bankName} 
                                        onChange={(e) => setEditContactForm({...editContactForm, bankName: e.target.value})}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="شماره کارت" 
                                        value={editContactForm.bankCard} 
                                        onChange={(e) => setEditContactForm({...editContactForm, bankCard: e.target.value})}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="شماره شبا" 
                                        value={editContactForm.iban} 
                                        onChange={(e) => setEditContactForm({...editContactForm, iban: e.target.value})}
                                        className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs" 
                                    />
                                    <div className="flex space-x-2 space-x-reverse pt-2">
                                        <button onClick={handleUpdateContact} className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold">به‌روزرسانی</button>
                                        <button onClick={() => setShowEditContactModal(false)} className="flex-1 bg-slate-100 dark:bg-slate-700 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300">انصراف</button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Modal: Version History / Changelog Popup */}
                    <AnimatePresence>
                        {isChangelogModalOpen && (
                            <motion.div 
                                key="changelog-backdrop"
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                onClick={() => setIsChangelogModalOpen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 sm:p-6"
                            >
                                <motion.div 
                                    key="changelog-modal-panel"
                                    initial={{ scale: 0.92, opacity: 0, y: 10 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.92, opacity: 0, y: 10 }}
                                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-2xl border border-slate-100 dark:border-slate-700/80 flex flex-col max-h-[85vh] relative overflow-hidden font-vazir"
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80 dark:border-slate-700/80 shrink-0">
                                        <button 
                                            type="button"
                                            onClick={() => setIsChangelogModalOpen(false)}
                                            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700/70 text-slate-500 dark:text-slate-400 transition-colors"
                                            aria-label="بستن"
                                        >
                                            <Icon name="x" className="w-5 h-5" />
                                        </button>
                                        <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white font-vazir">
                                            تغییرات نسخه‌ها
                                        </h3>
                                    </div>

                                    {/* Body: Scrollable Accordion List */}
                                    <div className="overflow-y-auto flex-1 my-3.5 py-1 pr-1 space-y-3.5 text-right dir-rtl custom-scrollbar">
                                        {versionData.history && versionData.history.map((ver, idx) => {
                                            const isLatest = idx === 0;
                                            const isExpanded = expandedChangelogVersion === ver.version || (isLatest && expandedChangelogVersion === null);

                                            let dateDisplay = '';
                                            try {
                                                if (ver.releaseDate) {
                                                    const parts = ver.releaseDate.split('-');
                                                    if (parts.length === 3) {
                                                        const y = parseInt(parts[0], 10);
                                                        const m = parseInt(parts[1], 10);
                                                        const d = parseInt(parts[2], 10);
                                                        if (y > 1700) {
                                                            const { jy, jm } = gregorianToJalali(y, m, d);
                                                            dateDisplay = `(${jalaliMonths[jm - 1]} ${toPersianDigits(jy)})`;
                                                        } else {
                                                            dateDisplay = `(${jalaliMonths[m - 1] || m} ${toPersianDigits(y)})`;
                                                        }
                                                    } else {
                                                        dateDisplay = `(${toPersianDigits(ver.releaseDate)})`;
                                                    }
                                                }
                                            } catch (e) {
                                                dateDisplay = ver.releaseDate ? `(${toPersianDigits(ver.releaseDate)})` : '';
                                            }

                                            return (
                                                <div 
                                                    key={ver.version || idx} 
                                                    className={`rounded-[20px] border transition-all duration-300 overflow-hidden ${
                                                        isExpanded 
                                                            ? 'border-emerald-300 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-2xs' 
                                                            : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800'
                                                    }`}
                                                >
                                                    {/* Accordion Header Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (isExpanded) {
                                                                setExpandedChangelogVersion('closed_all');
                                                            } else {
                                                                setExpandedChangelogVersion(ver.version);
                                                            }
                                                        }}
                                                        className="w-full p-3.5 sm:p-4 flex items-center justify-between text-right cursor-pointer select-none"
                                                    >
                                                        {/* Left side (in RTL layout): Chevron Toggle Icon */}
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                                            isExpanded 
                                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300' 
                                                                : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                                                        }`}>
                                                            <Icon name={isExpanded ? "chevron-up" : "chevron-down"} className="w-4 h-4" />
                                                        </div>

                                                        {/* Right side (in RTL layout): Version Title + Badge + Date */}
                                                        <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-1.5 min-w-0">
                                                            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white font-vazir">
                                                                نسخه {toPersianDigits(ver.version)}
                                                            </span>
                                                            {isLatest && (
                                                                <span className="text-[11px] font-bold bg-[#d1fae5] text-[#047857] dark:bg-emerald-900/60 dark:text-emerald-300 px-2.5 py-0.5 rounded-full whitespace-nowrap font-vazir">
                                                                    جدیدترین نسخه
                                                                </span>
                                                            )}
                                                            {dateDisplay && (
                                                                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium font-vazir">
                                                                    {dateDisplay}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </button>

                                                    {/* Accordion Body */}
                                                    <AnimatePresence initial={false}>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.22, ease: "easeInOut" }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="px-4 pb-4 pt-0">
                                                                    <div className="border-t border-emerald-200/80 dark:border-emerald-800/60 pt-3 space-y-2.5">
                                                                        {ver.changes && ver.changes.map((change, cIdx) => (
                                                                            <div key={cIdx} className="flex items-start space-x-2.5 space-x-reverse text-right">
                                                                                <span className="text-slate-500 dark:text-slate-400 font-bold text-sm shrink-0 mt-0.5">•</span>
                                                                                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-vazir">
                                                                                    {change}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}

                                        {(!versionData.history || versionData.history.length === 0) && (
                                            <div className="text-center py-8 text-slate-400 text-xs font-vazir">
                                                تاریخچه‌ای برای نمایش وجود ندارد
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="pt-3.5 border-t border-slate-200/80 dark:border-slate-700/80 shrink-0 flex justify-start">
                                        <button 
                                            type="button"
                                            onClick={() => setIsChangelogModalOpen(false)}
                                            className="bg-[#f1f5f9] hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white px-8 py-2 rounded-full text-sm font-bold active:scale-95 transition-all shadow-2xs font-vazir"
                                        >
                                            بستن
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Global Confirmation Dialog */}
                    <GlobalConfirmDialog 
                        isOpen={!!confirmConfig}
                        {...confirmConfig}
                    />

                </div>
            );
        }

        function RootApp() {
            return (
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            );
        }

        if (typeof document !== 'undefined' && document.getElementById('root')) {
            const rootEl = document.getElementById('root');
            try {
                if (ReactDOM.createRoot) {
                    ReactDOM.createRoot(rootEl).render(<RootApp />);
                } else {
                    ReactDOM.render(<RootApp />, rootEl);
                }
                window.__APP_MOUNTED__ = true;
            } catch (err) {
                console.error('Error mounting React app:', err);
                try {
                    ReactDOM.render(<RootApp />, rootEl);
                    window.__APP_MOUNTED__ = true;
                } catch (e2) {
                    console.error('Fallback render error:', e2);
                }
            }
        }
    