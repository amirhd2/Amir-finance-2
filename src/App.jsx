function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
const {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  Component
} = React;
const Motion = window.Motion || window.framerMotion || {};
const motionProxy = Motion.motion || new Proxy({}, {
  get: (target, tag) => {
    return function MotionFallback({
      children,
      initial,
      animate,
      exit,
      transition,
      variants,
      custom,
      whileHover,
      whileTap,
      drag,
      dragConstraints,
      ...props
    }) {
      return <tag>{children}</tag>;
    };
  }
});
const motion = Motion.motion || motionProxy;
const AnimatePresence = Motion.AnimatePresence || (({
  children
}) => <>{children}</>);
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/<div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-slate-950 text-white text-center font-vazir dir-rtl">{/*#__PURE__*/<div className="text-5xl mb-4 animate-bounce">⚡</div>}{/*#__PURE__*/<h2 className="text-lg font-bold mb-2 text-slate-100">راه‌اندازی مجدد امیر فایننس</h2>}{/*#__PURE__*/<p className="text-xs text-slate-400 mb-6 max-w-xs leading-relaxed">{this.state.error ? String(this.state.error) : 'نسخه جدید برنامه آماده است. جهت بارگذاری دکمه زیر را لمس کنید.'}</p>}{/*#__PURE__*/<div className="flex gap-3">{/*#__PURE__*/<button onClick={() => {
            this.setState({
              hasError: false,
              error: null
            });
            window.location.reload();
          }} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all cursor-pointer">ورود به برنامه</button>}{/*#__PURE__*/<button onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
          }} className="bg-slate-800 text-slate-300 px-5 py-2.5 rounded-xl font-bold text-xs active:scale-95 transition-all cursor-pointer">پاکسازی حافظه و بازیابی</button>}</div>}</div>;
    }
    return this.props.children;
  }
}
const avatarColors = ['bg-blue-600', 'bg-amber-600', 'bg-emerald-600', 'bg-indigo-600', 'bg-teal-600', 'bg-rose-600', 'bg-purple-600', 'bg-cyan-600', 'bg-orange-600', 'bg-violet-600'];
const getAvatarColor = (id, name) => {
  let hash = 0;
  const str = (name || '') + id;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
};
const getContactCardTheme = contactId => {
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
    // 2: Wallet Watermark (Amber Warm)
    {
      watermark: 'account_balance_wallet',
      containerClass: 'bg-amber-600 dark:bg-amber-800 text-white border-amber-500 dark:border-amber-700 shadow-md',
      avatarClass: 'bg-amber-100 text-amber-900 font-black',
      nameClass: 'text-white font-bold',
      phoneClass: 'text-amber-100 dark:text-amber-200',
      buttonClass: 'bg-white/20 hover:bg-white/30 text-white',
      rowClass: 'bg-white/15 dark:bg-black/20',
      rowLabelClass: 'text-amber-100 dark:text-amber-200',
      rowTextClass: 'text-white font-bold',
      accentColorClass: 'text-amber-200',
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
    // 4: Briefcase Watermark (Emerald Green)
    {
      watermark: 'work',
      containerClass: 'bg-emerald-600 dark:bg-emerald-800 text-white border-emerald-500 dark:border-emerald-700 shadow-md',
      avatarClass: 'bg-emerald-100 text-emerald-950 font-black',
      nameClass: 'text-white font-bold',
      phoneClass: 'text-emerald-100 dark:text-emerald-200',
      buttonClass: 'bg-white/20 hover:bg-white/30 text-white',
      rowClass: 'bg-white/15 dark:bg-black/20',
      rowLabelClass: 'text-emerald-100 dark:text-emerald-200',
      rowTextClass: 'text-white font-bold',
      accentColorClass: 'text-emerald-200',
      watermarkColor: 'text-white'
    },
    // 5: Team Watermark (Blue / Indigo)
    {
      watermark: 'groups',
      containerClass: 'bg-blue-600 dark:bg-blue-800 text-white border-blue-500 dark:border-blue-700 shadow-md',
      avatarClass: 'bg-sky-100 text-blue-950 font-black',
      nameClass: 'text-white font-bold',
      phoneClass: 'text-blue-100 dark:text-blue-200',
      buttonClass: 'bg-white/20 hover:bg-white/30 text-white',
      rowClass: 'bg-white/15 dark:bg-black/20',
      rowLabelClass: 'text-blue-100 dark:text-blue-200',
      rowTextClass: 'text-white font-bold',
      accentColorClass: 'text-sky-200',
      watermarkColor: 'text-white'
    },
    // 6: Document Watermark (Rose Pink/Red)
    {
      watermark: 'description',
      containerClass: 'bg-rose-600 dark:bg-rose-800 text-white border-rose-500 dark:border-rose-700 shadow-md',
      avatarClass: 'bg-rose-100 text-rose-950 font-black',
      nameClass: 'text-white font-bold',
      phoneClass: 'text-rose-100 dark:text-rose-200',
      buttonClass: 'bg-white/20 hover:bg-white/30 text-white',
      rowClass: 'bg-white/15 dark:bg-black/20',
      rowLabelClass: 'text-rose-100 dark:text-rose-200',
      rowTextClass: 'text-white font-bold',
      accentColorClass: 'text-rose-200',
      watermarkColor: 'text-white'
    }
  ];
  return themes[Math.abs(idNum) % themes.length];
};
const jalaliMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
const gregorianToJalali = (gy, gm, gd) => {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days = 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  jy += Math.floor((days - 1) / 365);
  if (days > 0) days = (days - 1) % 365;
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return {
    jy,
    jm,
    jd
  };
};
const getDeviceJalaliDate = () => {
  try {
    const now = new Date();
    const gy = now.getFullYear();
    const gm = now.getMonth() + 1;
    const gd = now.getDate();
    const {
      jy,
      jm,
      jd
    } = gregorianToJalali(gy, gm, gd);
    return {
      day: jd,
      month: jalaliMonths[jm - 1] || 'مرداد',
      year: jy
    };
  } catch (e) {
    return {
      day: 3,
      month: 'مرداد',
      year: 1405
    };
  }
};
const jalaliToGregorian = (jy, jm, jd) => {
  let gy = jy <= 979 ? 621 : 1600;
  jy -= jy <= 979 ? 0 : 979;
  let days = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4) + 78 + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
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
  const g_d_m = [0, 31, gy % 4 === 0 && gy % 100 !== 0 || gy % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let gm = 0;
  while (days >= g_d_m[gm]) {
    days -= g_d_m[gm];
    gm++;
  }
  return {
    gy,
    gm,
    gd: days + 1
  };
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
const parseJalaliDateStr = dateStr => {
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
      return {
        day,
        month,
        year
      };
    }
  } catch (e) {
    console.error("Error parsing Jalali date:", e);
  }
  return defaultDate;
};
let globalNumberFormat = 'latin';
try {
  if (typeof window !== 'undefined') {
    globalNumberFormat = localStorage.getItem('amir_fin_num_format') || 'latin';
  }
} catch (e) {}
const toPersianDigits = n => {
  if (n === undefined || n === null) return '';
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(n).replace(/\d/g, x => farsiDigits[x]);
};
const toEnglishDigits = str => {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
};
const toAppDigits = n => {
  if (n === undefined || n === null) return '';
  if (globalNumberFormat === 'persian') {
    return toPersianDigits(n);
  }
  return toEnglishDigits(String(n));
};
const formatAppNumber = val => {
  if (val === null || val === undefined || val === '') return '';
  const strVal = String(val);
  const isNegative = strVal.startsWith('-') || strVal.startsWith('−');
  const clean = parseRawNumber(strVal);
  if (!clean && clean !== '0' && clean !== 0) return '';
  const formatted = Number(clean).toLocaleString('en-US');
  const resultWithDigits = globalNumberFormat === 'persian' ? toPersianDigits(formatted) : formatted;
  return isNegative ? `-${resultWithDigits}` : resultWithDigits;
};
const parseRawNumber = val => {
  if (val === null || val === undefined) return '';
  const normalized = toEnglishDigits(String(val));
  return normalized.replace(/\D/g, '');
};
const parseRawDecimal = (val, allowNegative = false) => {
  if (val === null || val === undefined) return '';
  let s = toEnglishDigits(String(val)).replace(/٫/g, '.').replace(/,/g, '');
  let isNegative = false;
  if (allowNegative && (s.startsWith('-') || s.startsWith('−'))) {
    isNegative = true;
  }
  s = s.replace(/[^\d.]/g, '');
  const parts = s.split('.');
  let result = parts[0];
  if (parts.length > 1) {
    result += '.' + parts.slice(1).join('');
  }
  return isNegative && result ? '-' + result : result;
};
const formatWithCommas = val => {
  if (val === null || val === undefined || val === '') return '';
  const clean = parseRawNumber(val);
  if (!clean && clean !== '0' && clean !== 0) return '';
  const formatted = Number(clean).toLocaleString('en-US');
  return globalNumberFormat === 'persian' ? toPersianDigits(formatted) : formatted;
};
const formatCardNumber = val => {
  if (!val) return '';
  const clean = parseRawNumber(val).slice(0, 16);
  return clean.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};
const normalizePhoneNumber = val => {
  if (!val) return '';
  const eng = toEnglishDigits(String(val));
  const hasPlus = eng.trim().startsWith('+');
  const clean = eng.replace(/\D/g, '');
  return hasPlus ? '+' + clean : clean;
};
const normalizeIBAN = val => {
  if (!val) return '';
  const eng = toEnglishDigits(String(val)).toUpperCase().replace(/[^A-Z0-9]/g, '');
  return eng.slice(0, 26);
};
const getBankNameFromCard = cardNo => {
  if (!cardNo) return '';
  const clean = parseRawNumber(cardNo);
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
    '589463': 'بانک رفاه کارگران',
    '627760': 'پست بانک ایران',
    '585983': 'بانک تجارت',
    '627353': 'بانک تجارت'
  };
  return bankMap[prefix6] || '';
};
const isJalaliLeapYear = year => {
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
const formatDateToNumericJalali = dateStr => {
  if (!dateStr || dateStr === '-' || dateStr === 'نامشخص') return '-';
  if (dateStr === 'امروز') {
    const today = getDeviceJalaliDate();
    const m = String(jalaliMonths.indexOf(today.month) + 1).padStart(2, '0');
    const d = String(today.day).padStart(2, '0');
    return `${toAppDigits(today.year)}/${toAppDigits(m)}/${toAppDigits(d)}`;
  }
  const parsed = parseJalaliDateStr(dateStr);
  if (!parsed || !parsed.year) return toAppDigits(dateStr);
  let monthNum = 1;
  if (typeof parsed.month === 'string' && jalaliMonths.includes(parsed.month)) {
    monthNum = jalaliMonths.indexOf(parsed.month) + 1;
  } else {
    monthNum = parseInt(parsed.month, 10) || 1;
  }
  const y = String(parsed.year);
  const m = String(monthNum).padStart(2, '0');
  const d = String(parsed.day).padStart(2, '0');
  return `${toAppDigits(y)}/${toAppDigits(m)}/${toAppDigits(d)}`;
};
const numToPersianWords = num => {
  if (num === null || num === undefined || num === '') return '';
  const n = Math.abs(Number(num));
  if (isNaN(n) || n === 0) return '';
  const yekan = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
  const dahna = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هیجده', 'نوزده'];
  const dahgan = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
  const sadgan = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
  const maghadir = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];
  const threeDigitsToWords = number => {
    let sad = Math.floor(number / 100);
    let dah = Math.floor(number % 100 / 10);
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
  if (!loan || instNum < 1) return {
    dateStr: 'نامشخص',
    year: 1403,
    monthIdx: 0,
    day: 1,
    daysLeft: 0
  };
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
  const dueDay = loan.firstInstallmentDate ? parseJalaliDateStr(loan.firstInstallmentDate).day : loan.dueDayOfMonth || startDay || 25;
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
  const dateStr = `${toAppDigits(targetDay)} ${targetMonthName} ${toAppDigits(targetYear)}`;
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
  if (!loan) return {
    nextDueNum: 1,
    nextDueDateStr: 'نامشخص',
    daysLeft: 0,
    totalInst: 12,
    paidInst: 0,
    remainingInst: 12,
    isCompleted: false
  };
  const instAmt = Number(loan.installmentAmount) || 0;
  const totalRepay = Number(loan.totalRepayment) || Number(loan.principalAmount) || 0;
  const totalInst = loan.totalInstallments && loan.totalInstallments > 0 ? loan.totalInstallments : instAmt > 0 && totalRepay > 0 ? Math.ceil(totalRepay / instAmt) : 12;
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
    ctx.font = 'bold 22px Vazir, Vazirmatn, Tahoma, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`صورت‌حساب پرونده وام: ${loan.title || ''}`, width - 35, 48);
    ctx.fillStyle = '#64748b';
    ctx.font = '13px Vazir, Vazirmatn, Tahoma, sans-serif';
    ctx.fillText(`نام مخاطب / طرف حساب: ${loan.contactName || ''}    •    شماره تماس: ${loan.phone ? toAppDigits(loan.phone) : '-'}`, width - 35, 75);

    // Card background
    ctx.fillStyle = '#f8fafc';
    drawRoundRect(ctx, 35, 92, width - 70, 125, 14);
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.stroke();
    ctx.fillStyle = '#334155';
    ctx.font = '13px Vazir, Vazirmatn, Tahoma, sans-serif';

    // Row 1
    ctx.fillText(`اصل مبلغ وام: ${formatAppNumber(loan.principalAmount || 0)} تومان`, width - 60, 125);
    ctx.fillText(`پرداختی تا امروز: ${formatAppNumber(loan.paidAmount || 0)} تومان`, width / 2 - 20, 125);

    // Row 2
    ctx.fillText(`مبلغ کل بازپرداخت: ${formatAppNumber(loan.totalRepayment || 0)} تومان`, width - 60, 158);
    ctx.fillText(`مبلغ باقی‌مانده: ${formatAppNumber(loan.remainingAmount || 0)} تومان`, width / 2 - 20, 158);

    // Row 3
    ctx.fillText(`موعد اقساط: روز ${toAppDigits(loan.dueDayOfMonth || 1)}ام هر ماه`, width - 60, 190);
    ctx.fillText(`اقساط پرداخت‌شده: ${toAppDigits(paidInst)} از ${toAppDigits(totalInst)} قسط`, width / 2 - 20, 190);

    // Section header
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 15px Vazir, Vazirmatn, Tahoma, sans-serif';
    ctx.fillText('ریز سوابق پرداخت اقساط', width - 35, 242);

    // Table Header
    const tableTop = 252;
    ctx.fillStyle = '#4f46e5';
    ctx.fillRect(35, tableTop, width - 70, 38);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Vazir, Vazirmatn, Tahoma, sans-serif';
    ctx.fillText('ردیف', width - 60, tableTop + 24);
    ctx.fillText('عنوان / بابت', width - 140, tableTop + 24);
    ctx.fillText('تاریخ پرداخت', width - 420, tableTop + 24);
    ctx.fillText('مبلغ (تومان)', width - 620, tableTop + 24);
    let currentY = tableTop + 38;
    if (repayments.length === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(35, currentY, width - 70, 44);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '13px Vazir, Vazirmatn, Tahoma, sans-serif';
      ctx.fillText('هیچ قسطی تاکنون برای این وام ثبت نشده است', width / 2 + 100, currentY + 28);
      currentY += 44;
    } else {
      repayments.forEach((tx, idx) => {
        ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
        ctx.fillRect(35, currentY, width - 70, rowHeight);
        ctx.strokeStyle = '#f1f5f9';
        ctx.strokeRect(35, currentY, width - 70, rowHeight);
        ctx.fillStyle = '#334155';
        ctx.font = '12px Vazir, Vazirmatn, Tahoma, sans-serif';
        ctx.fillText(String(toAppDigits(idx + 1)), width - 60, currentY + 26);
        ctx.fillText(tx.title || 'پرداخت قسط', width - 140, currentY + 26);
        ctx.fillText(formatDateToNumericJalali(tx.dateStr), width - 420, currentY + 26);
        ctx.fillStyle = '#16a34a';
        ctx.font = 'bold 12px Vazir, Vazirmatn, Tahoma, sans-serif';
        ctx.fillText(formatAppNumber(tx.amount || 0), width - 620, currentY + 26);
        currentY += rowHeight;
      });
    }

    // Footer
    const nowJalali = getDeviceJalaliDate();
    const reportDateStr = formatDateToNumericJalali(`${nowJalali.day} ${nowJalali.month} ${nowJalali.year}`);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Vazir, Vazirmatn, Tahoma, sans-serif';
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
    const contactName = contact ? `${contact.firstName} ${contact.lastName}` : period.contactName || 'مخاطب';
    const phone = contact ? contact.phone || '-' : period.phone || '-';
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
    ctx.font = 'bold 22px Vazir, Vazirmatn, Tahoma, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`گزارش پرونده تسویه‌حساب آرشیو شده`, width - 35, 48);
    ctx.fillStyle = '#64748b';
    ctx.font = '13px Vazir, Vazirmatn, Tahoma, sans-serif';
    ctx.fillText(`طرف حساب: ${contactName}    •    شماره تماس: ${toAppDigits(phone)}`, width - 35, 75);

    // Card background
    ctx.fillStyle = '#f8fafc';
    drawRoundRect(ctx, 35, 92, width - 70, 105, 14);
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.stroke();
    ctx.fillStyle = '#334155';
    ctx.font = '13px Vazir, Vazirmatn, Tahoma, sans-serif';
    const startStr = formatDateToNumericJalali(period.startDate) || '-';
    const endStr = formatDateToNumericJalali(period.endDate) || '-';
    ctx.fillText(`تاریخ شروع دوره: ${startStr}`, width - 60, 125);
    ctx.fillText(`تاریخ تسویه نهایی: ${endStr}`, width / 2 - 20, 125);
    ctx.fillText(`نوع پرونده: ${isDebt ? 'تسویه بدهی (پرداخت‌شده)' : 'تسویه طلب (دریافت‌شده)'}`, width - 60, 160);
    ctx.fillText(`مبلغ کل تسویه‌شده: ${formatAppNumber(period.totalAmount || 0)} تومان`, width / 2 - 20, 160);

    // Section header
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 15px Vazir, Vazirmatn, Tahoma, sans-serif';
    ctx.fillText('ریز تراکنش‌ها و دریافتی/پرداختی‌های این دوره', width - 35, 222);

    // Table Header
    const tableTop = 232;
    ctx.fillStyle = isDebt ? '#e11d48' : '#10b981';
    ctx.fillRect(35, tableTop, width - 70, 38);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Vazir, Vazirmatn, Tahoma, sans-serif';
    ctx.fillText('ردیف', width - 60, tableTop + 24);
    ctx.fillText('عنوان تراکنش', width - 140, tableTop + 24);
    ctx.fillText('تاریخ', width - 420, tableTop + 24);
    ctx.fillText('مبلغ (تومان)', width - 620, tableTop + 24);
    let currentY = tableTop + 38;
    if (periodTxs.length === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(35, currentY, width - 70, 44);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '13px Vazir, Vazirmatn, Tahoma, sans-serif';
      ctx.fillText('هیچ تراکنشی در این دوره ثبت نشده است', width / 2 + 100, currentY + 28);
      currentY += 44;
    } else {
      periodTxs.forEach((tx, idx) => {
        ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
        ctx.fillRect(35, currentY, width - 70, rowHeight);
        ctx.strokeStyle = '#f1f5f9';
        ctx.strokeRect(35, currentY, width - 70, rowHeight);
        ctx.fillStyle = '#334155';
        ctx.font = '12px Vazir, Vazirmatn, Tahoma, sans-serif';
        ctx.fillText(String(toAppDigits(idx + 1)), width - 60, currentY + 26);
        ctx.fillText(tx.title || (isDebt ? 'بازپرداخت بدهی' : 'دریافت طلب'), width - 140, currentY + 26);
        ctx.fillText(formatDateToNumericJalali(tx.dateStr), width - 420, currentY + 26);
        ctx.fillStyle = isDebt ? '#e11d48' : '#10b981';
        ctx.font = 'bold 12px Vazir, Vazirmatn, Tahoma, sans-serif';
        ctx.fillText(formatAppNumber(Math.abs(tx.amount || 0)), width - 620, currentY + 26);
        currentY += rowHeight;
      });
    }

    // Footer
    const nowJalali = getDeviceJalaliDate();
    const reportDateStr = formatDateToNumericJalali(`${nowJalali.day} ${nowJalali.month} ${nowJalali.year}`);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Vazir, Vazirmatn, Tahoma, sans-serif';
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
    let csv = '\﻿';
    const contactName = contact ? `${contact.firstName} ${contact.lastName}` : period.contactName || 'مخاطب';
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
    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });
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
                                <div class="grid-item"><span class="label">اصل مبلغ وام:</span> <span class="value">${formatAppNumber(loan.principalAmount || 0)} تومان</span></div>
                                <div class="grid-item"><span class="label">پرداختی تا امروز:</span> <span class="value" style="color:#16a34a">${formatAppNumber(loan.paidAmount || 0)} تومان</span></div>
                                <div class="grid-item"><span class="label">کل مبلغ بازپرداخت:</span> <span class="value">${formatAppNumber(loan.totalRepayment || 0)} تومان</span></div>
                                <div class="grid-item"><span class="label">باقی‌مانده:</span> <span class="value" style="color:#ef4444">${formatAppNumber(loan.remainingAmount || 0)} تومان</span></div>
                                <div class="grid-item"><span class="label">موعد اقساط:</span> <span class="value">روز ${toAppDigits(loan.dueDayOfMonth || 1)}ام هر ماه</span></div>
                                <div class="grid-item"><span class="label">تعداد اقساط پرداخت‌شده:</span> <span class="value">${toAppDigits(paidInst)} از ${toAppDigits(totalInst)} قسط</span></div>
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
                                        <td>${toAppDigits(i + 1)}</td>
                                        <td>${tx.title || 'پرداخت قسط'} ${tx.notes ? ' - ' + tx.notes : ''}</td>
                                        <td>${formatDateToNumericJalali(tx.dateStr) || '-'}</td>
                                        <td class="amount">${formatAppNumber(tx.amount || 0)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>

                        <div class="footer">
                            تاریخ صدور گزارش: ${toAppDigits(nowJalali.day)} ${nowJalali.month} ${toAppDigits(nowJalali.year)}
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
    let csv = '\﻿';
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
    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });
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
const initialContacts = [{
  id: 1,
  firstName: 'محمد',
  lastName: 'احمدی',
  phone: '09121234567',
  bankName: 'بانک ملی ایران',
  bankCard: '6037 9975 4321 4582',
  iban: 'IR12 0120 0000 0001 2345 6789 01',
  isPinned: true,
  activeLoansCount: 1,
  totalDemand: 15000000,
  totalDebt: 0,
  monthlyInstallment: 20000000,
  isFavorite: true
}, {
  id: 2,
  firstName: 'علی',
  lastName: 'رضایی',
  phone: '09129876543',
  bankName: 'بانک ملت',
  bankCard: '6104 3378 9012 1175',
  iban: 'IR88 0170 0000 0009 8765 4321 00',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 0,
  totalDebt: 10000000,
  monthlyInstallment: 0,
  isFavorite: false
}, {
  id: 3,
  firstName: 'سارا',
  lastName: 'محمدی',
  phone: '09351112233',
  bankName: 'بانک پاسارگاد',
  bankCard: '5022 2910 1122 3344',
  iban: 'IR44 0570 0000 0005 0222 9101 12',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 0,
  totalDebt: 0,
  monthlyInstallment: 0,
  isFavorite: true
}, {
  id: 4,
  firstName: 'رضا',
  lastName: 'اکبری',
  phone: '09123334455',
  bankName: 'بانک تجارت',
  bankCard: '5892 1012 4455 1123',
  iban: 'IR55 0180 0000 0005 8921 0124 45',
  isPinned: false,
  activeLoansCount: 1,
  totalDemand: 8000000,
  totalDebt: 0,
  monthlyInstallment: 20000000,
  isFavorite: false
}, {
  id: 5,
  firstName: 'مریم',
  lastName: 'حسینی',
  phone: '09194445566',
  bankName: 'بانک سامان',
  bankCard: '6219 8610 2233 4455',
  iban: 'IR66 0560 0000 0006 2198 6102 23',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 0,
  totalDebt: 8000000,
  monthlyInstallment: 0,
  isFavorite: false
}, {
  id: 6,
  firstName: 'حسین',
  lastName: 'کریمی',
  phone: '09125556677',
  bankName: 'بانک پارسیان',
  bankCard: '6273 8111 5566 7788',
  iban: 'IR77 0540 0000 0006 2738 1115 56',
  isPinned: true,
  activeLoansCount: 1,
  totalDemand: 35000000,
  totalDebt: 0,
  monthlyInstallment: 10000000,
  isFavorite: true
}, {
  id: 7,
  firstName: 'زهرا',
  lastName: 'صادقی',
  phone: '09366667788',
  bankName: 'بانک سپه',
  bankCard: '6037 6919 8899 0011',
  iban: 'IR88 0150 0000 0006 0376 9198 89',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 7000000,
  totalDebt: 0,
  monthlyInstallment: 0,
  isFavorite: false
}, {
  id: 8,
  firstName: 'مهدی',
  lastName: 'موسوی',
  phone: '09127778899',
  bankName: 'بانک رفاه کارگران',
  bankCard: '5894 6311 2233 4411',
  iban: 'IR99 0130 0000 0005 8946 3112 23',
  isPinned: false,
  activeLoansCount: 1,
  totalDemand: 18000000,
  totalDebt: 0,
  monthlyInstallment: 10000000,
  isFavorite: false
}, {
  id: 9,
  firstName: 'نرگس',
  lastName: 'قاسمی',
  phone: '09308889900',
  bankName: 'بانک اقتصاد نوین',
  bankCard: '6274 1211 3344 5566',
  iban: 'IR10 0550 0000 0006 2741 2113 34',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 0,
  totalDebt: 15000000,
  monthlyInstallment: 0,
  isFavorite: false
}, {
  id: 10,
  firstName: 'امیرحسین',
  lastName: 'زارعی',
  phone: '09129990011',
  bankName: 'بانک شهر',
  bankCard: '5041 7210 6677 8899',
  iban: 'IR11 0610 0000 0005 0417 2106 67',
  isPinned: false,
  activeLoansCount: 1,
  totalDemand: 15000000,
  totalDebt: 0,
  monthlyInstallment: 16666000,
  isFavorite: true
}, {
  id: 11,
  firstName: 'فاطمه',
  lastName: 'نوری',
  phone: '09370001122',
  bankName: 'بانک آینده',
  bankCard: '6393 4610 7788 9900',
  iban: 'IR12 0620 0000 0006 3934 6107 78',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 0,
  totalDebt: 12000000,
  monthlyInstallment: 0,
  isFavorite: false
}, {
  id: 12,
  firstName: 'سعید',
  lastName: 'نجفی',
  phone: '09121113355',
  bankName: 'بانک مهر ایران',
  bankCard: '6063 7310 1122 3344',
  iban: 'IR13 0630 0000 0006 0637 3101 12',
  isPinned: false,
  activeLoansCount: 1,
  totalDemand: 16000000,
  totalDebt: 0,
  monthlyInstallment: 12500000,
  isFavorite: false
}, {
  id: 13,
  firstName: 'الناز',
  lastName: 'ابراهیمی',
  phone: '09382224466',
  bankName: 'بانک آینده',
  bankCard: '6362 1410 2233 4455',
  iban: 'IR14 0640 0000 0006 3621 4102 23',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 0,
  totalDebt: 6000000,
  monthlyInstallment: 0,
  isFavorite: false
}, {
  id: 14,
  firstName: 'کامران',
  lastName: 'طاهری',
  phone: '09123335577',
  bankName: 'بانک سپه',
  bankCard: '5058 0110 3344 5566',
  iban: 'IR15 0690 0000 0005 0580 1103 34',
  isPinned: false,
  activeLoansCount: 1,
  totalDemand: 25000000,
  totalDebt: 0,
  monthlyInstallment: 10000000,
  isFavorite: false
}, {
  id: 15,
  firstName: 'مبینا',
  lastName: 'قربانی',
  phone: '09394446688',
  bankName: 'بانک سرمایه',
  bankCard: '6396 0710 4455 6677',
  iban: 'IR16 0600 0000 0006 3960 7104 45',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 0,
  totalDebt: 14000000,
  monthlyInstallment: 0,
  isFavorite: false
}, {
  id: 16,
  firstName: 'آرش',
  lastName: 'شریفی',
  phone: '09125557799',
  bankName: 'بانک صنعت و معدن',
  bankCard: '6279 6110 5566 7788',
  iban: 'IR17 0590 0000 0006 2796 1105 56',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 9000000,
  totalDebt: 0,
  monthlyInstallment: 0,
  isFavorite: false
}, {
  id: 17,
  firstName: 'شیما',
  lastName: 'کاظمی',
  phone: '09306668800',
  bankName: 'بانک کشاورزی',
  bankCard: '6037 7010 6677 8899',
  iban: 'IR18 0110 0000 0006 0377 0106 67',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 0,
  totalDebt: 20000000,
  monthlyInstallment: 0,
  isFavorite: false
}, {
  id: 18,
  firstName: 'فرزاد',
  lastName: 'مرادی',
  phone: '09127779911',
  bankName: 'بانک مسکن',
  bankCard: '6280 2310 7788 9900',
  iban: 'IR19 0510 0000 0006 2802 3107 78',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 20000000,
  totalDebt: 9500000,
  monthlyInstallment: 0,
  isFavorite: false
}, {
  id: 19,
  firstName: 'مینا',
  lastName: 'مرادی‌نیا',
  phone: '09338880022',
  bankName: 'بانک کارآفرین',
  bankCard: '6369 4910 8899 0011',
  iban: 'IR20 0530 0000 0006 3694 9108 89',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 0,
  totalDebt: 15000000,
  monthlyInstallment: 0,
  isFavorite: false
}, {
  id: 20,
  firstName: 'پیمان',
  lastName: 'باقری',
  phone: '09129991133',
  bankName: 'بانک دی',
  bankCard: '5029 0810 9900 1122',
  iban: 'IR21 0580 0000 0005 0290 8109 90',
  isPinned: false,
  activeLoansCount: 0,
  totalDemand: 0,
  totalDebt: 4000000,
  monthlyInstallment: 0,
  isFavorite: false
}];
const initialLoans = [{
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
}, {
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
}, {
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
}, {
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
}, {
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
}, {
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
}, {
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
}, {
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
}, {
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
}, {
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
}];
const initialCompletedPeriods = [
// 5 Settled Debts
{
  id: 'p_debt_101',
  contactId: 2,
  contactName: 'علی رضایی',
  type: 'debt',
  title: 'دوره تسویه‌شده بدهی به علی رضایی',
  totalAmount: 7000000,
  startDate: '1403/01/15',
  endDate: '1403/04/10'
}, {
  id: 'p_debt_102',
  contactId: 5,
  contactName: 'مریم حسینی',
  type: 'debt',
  title: 'دوره تسویه‌شده بدهی به مریم حسینی',
  totalAmount: 14000000,
  startDate: '1403/02/01',
  endDate: '1403/05/15'
}, {
  id: 'p_debt_103',
  contactId: 8,
  contactName: 'مهدی موسوی',
  type: 'debt',
  title: 'دوره تسویه‌شده بدهی به مهدی موسوی',
  totalAmount: 20000000,
  startDate: '1402/10/10',
  endDate: '1403/03/20'
}, {
  id: 'p_debt_104',
  contactId: 11,
  contactName: 'فاطمه نوری',
  type: 'debt',
  title: 'دوره تسویه‌شده بدهی به فاطمه نوری',
  totalAmount: 9000000,
  startDate: '1403/03/05',
  endDate: '1403/06/12'
}, {
  id: 'p_debt_105',
  contactId: 14,
  contactName: 'کامران طاهری',
  type: 'debt',
  title: 'دوره تسویه‌شده بدهی به کامران طاهری',
  totalAmount: 35000000,
  startDate: '1402/11/15',
  endDate: '1403/04/25'
},
// 5 Settled Demands
{
  id: 'p_demand_201',
  contactId: 1,
  contactName: 'محمد احمدی',
  type: 'demand',
  title: 'دوره تسویه‌شده طلب از محمد احمدی',
  totalAmount: 10000000,
  startDate: '1403/01/10',
  endDate: '1403/03/15'
}, {
  id: 'p_demand_202',
  contactId: 3,
  contactName: 'سارا محمدی',
  type: 'demand',
  title: 'دوره تسویه‌شده طلب از سارا محمدی',
  totalAmount: 15000000,
  startDate: '1403/02/05',
  endDate: '1403/05/01'
}, {
  id: 'p_demand_203',
  contactId: 6,
  contactName: 'حسین کریمی',
  type: 'demand',
  title: 'دوره تسویه‌شده طلب از حسین کریمی',
  totalAmount: 28000000,
  startDate: '1402/09/12',
  endDate: '1403/02/20'
}, {
  id: 'p_demand_204',
  contactId: 9,
  contactName: 'نرگس قاسمی',
  type: 'demand',
  title: 'دوره تسویه‌شده طلب از نرگس قاسمی',
  totalAmount: 12500000,
  startDate: '1403/03/01',
  endDate: '1403/06/10'
}, {
  id: 'p_demand_205',
  contactId: 13,
  contactName: 'الناز ابراهیمی',
  type: 'demand',
  title: 'دوره تسویه‌شده طلب از الناز ابراهیمی',
  totalAmount: 22000000,
  startDate: '1402/12/01',
  endDate: '1403/04/18'
}];
const initialTransactions = [
// Active Debts Transactions
{
  id: 1001,
  contactId: 2,
  type: 'debt',
  title: 'ثبت بدهی جدید - خرید تجهیزات',
  dateStr: '۱۵ فروردین ۱۴۰۳',
  amount: -15000000,
  isPositive: false
}, {
  id: 1002,
  contactId: 2,
  type: 'debt_repayment',
  title: 'بازپرداخت بدهی به علی رضایی',
  dateStr: '۲۰ اردیبهشت ۱۴۰۳',
  amount: 5000000,
  isPositive: true
}, {
  id: 1003,
  contactId: 5,
  type: 'debt',
  title: 'ثبت بدهی جدید - قرض شخصی',
  dateStr: '۰۱ خرداد ۱۴۰۳',
  amount: -8000000,
  isPositive: false
}, {
  id: 1004,
  contactId: 9,
  type: 'debt',
  title: 'ثبت بدهی جدید - کمک هزینه سفارشی',
  dateStr: '۱۰ اردیبهشت ۱۴۰۳',
  amount: -25000000,
  isPositive: false
}, {
  id: 1005,
  contactId: 9,
  type: 'debt_repayment',
  title: 'بازپرداخت بدهی به نرگس قاسمی',
  dateStr: '۱۵ تیر ۱۴۰۳',
  amount: 10000000,
  isPositive: true
}, {
  id: 1006,
  contactId: 11,
  type: 'debt',
  title: 'ثبت بدهی جدید - رزرو خدمات',
  dateStr: '۰۵ تیر ۱۴۰۳',
  amount: -12000000,
  isPositive: false
}, {
  id: 1007,
  contactId: 13,
  type: 'debt',
  title: 'ثبت بدهی جدید - خرید کالا',
  dateStr: '۲۰ خرداد ۱۴۰۳',
  amount: -6000000,
  isPositive: false
}, {
  id: 1008,
  contactId: 15,
  type: 'debt',
  title: 'ثبت بدهی جدید - بلیت هوایی',
  dateStr: '۱۲ فروردین ۱۴۰۳',
  amount: -18000000,
  isPositive: false
}, {
  id: 1009,
  contactId: 15,
  type: 'debt_repayment',
  title: 'بازپرداخت بدهی به مبینا قربانی',
  dateStr: '۲۵ اردیبهشت ۱۴۰۳',
  amount: 4000000,
  isPositive: true
}, {
  id: 1010,
  contactId: 17,
  type: 'debt',
  title: 'ثبت بدهی جدید - سرمایه‌گذاری خرد',
  dateStr: '۰۱ اردیبهشت ۱۴۰۳',
  amount: -30000000,
  isPositive: false
}, {
  id: 1011,
  contactId: 17,
  type: 'debt_repayment',
  title: 'بازپرداخت بدهی به شیما کاظمی',
  dateStr: '۱۸ خرداد ۱۴۰۳',
  amount: 10000000,
  isPositive: true
}, {
  id: 1012,
  contactId: 18,
  type: 'debt',
  title: 'ثبت بدهی جدید - خدمات کارگاهی',
  dateStr: '۰۸ تیر ۱۴۰۳',
  amount: -9500000,
  isPositive: false
}, {
  id: 1013,
  contactId: 19,
  type: 'debt',
  title: 'ثبت بدهی جدید - سفارش اقلام',
  dateStr: '۱۵ فروردین ۱۴۰۳',
  amount: -22000000,
  isPositive: false
}, {
  id: 1014,
  contactId: 19,
  type: 'debt_repayment',
  title: 'بازپرداخت بدهی به مینا مرادی‌نیا',
  dateStr: '۰۲ تیر ۱۴۰۳',
  amount: 7000000,
  isPositive: true
}, {
  id: 1015,
  contactId: 20,
  type: 'debt',
  title: 'ثبت بدهی جدید - شارژ کارگاه',
  dateStr: '۱۰ تیر ۱۴۰۳',
  amount: -4000000,
  isPositive: false
},
// Active Demands Transactions
{
  id: 2001,
  contactId: 1,
  type: 'demand',
  title: 'ثبت طلب جدید - امانت کاری',
  dateStr: '۱۰ فروردین ۱۴۰۳',
  amount: 20000000,
  isPositive: true
}, {
  id: 2002,
  contactId: 1,
  type: 'demand_repayment',
  title: 'دریافت بازپرداخت طلب از محمد احمدی',
  dateStr: '۱۵ اردیبهشت ۱۴۰۳',
  amount: -5000000,
  isPositive: false
}, {
  id: 2003,
  contactId: 4,
  type: 'demand',
  title: 'ثبت طلب جدید - فروش تجهیزات',
  dateStr: '۰۵ اردیبهشت ۱۴۰۳',
  amount: 12000000,
  isPositive: true
}, {
  id: 2004,
  contactId: 4,
  type: 'demand_repayment',
  title: 'دریافت بازپرداخت طلب از رضا اکبری',
  dateStr: '۲۰ خرداد ۱۴۰۳',
  amount: -4000000,
  isPositive: false
}, {
  id: 2005,
  contactId: 6,
  type: 'demand',
  title: 'ثبت طلب جدید - ودیعه تجاری',
  dateStr: '۰۱ فروردین ۱۴۰۳',
  amount: 35000000,
  isPositive: true
}, {
  id: 2006,
  contactId: 7,
  type: 'demand',
  title: 'ثبت طلب جدید - پروژه برنامه‌نویسی',
  dateStr: '۱۸ خرداد ۱۴۰۳',
  amount: 10000000,
  isPositive: true
}, {
  id: 2007,
  contactId: 7,
  type: 'demand_repayment',
  title: 'دریافت بازپرداخت طلب از زهرا صادقی',
  dateStr: '۱۰ تیر ۱۴۰۳',
  amount: -3000000,
  isPositive: false
}, {
  id: 2008,
  contactId: 8,
  type: 'demand',
  title: 'ثبت طلب جدید - مشاوره اقتصادی',
  dateStr: '۲۵ اردیبهشت ۱۴۰۳',
  amount: 18000000,
  isPositive: true
}, {
  id: 2009,
  contactId: 10,
  type: 'demand',
  title: 'ثبت طلب جدید - شراکت پروژه‌ای',
  dateStr: '۱۴ فروردین ۱۴۰۳',
  amount: 25000000,
  isPositive: true
}, {
  id: 2010,
  contactId: 10,
  type: 'demand_repayment',
  title: 'دریافت بازپرداخت طلب از امیرحسین زارعی',
  dateStr: '۰۵ تیر ۱۴۰۳',
  amount: -10000000,
  isPositive: false
}, {
  id: 2011,
  contactId: 12,
  type: 'demand',
  title: 'ثبت طلب جدید - فروش ابزار دقیق',
  dateStr: '۰۲ خرداد ۱۴۰۳',
  amount: 16000000,
  isPositive: true
}, {
  id: 2012,
  contactId: 14,
  type: 'demand',
  title: 'ثبت طلب جدید - سرمایه‌گذاری متقابل',
  dateStr: '۲۰ فروردین ۱۴۰۳',
  amount: 40000000,
  isPositive: true
}, {
  id: 2013,
  contactId: 14,
  type: 'demand_repayment',
  title: 'دریافت بازپرداخت طلب از کامران طاهری',
  dateStr: '۱۲ خرداد ۱۴۰۳',
  amount: -15000000,
  isPositive: false
}, {
  id: 2014,
  contactId: 16,
  type: 'demand',
  title: 'ثبت طلب جدید - برندینگ و تبلیغات',
  dateStr: '۰۱ تیر ۱۴۰۳',
  amount: 9000000,
  isPositive: true
}, {
  id: 2015,
  contactId: 18,
  type: 'demand',
  title: 'ثبت طلب جدید - تامین قطعات',
  dateStr: '۱۵ اردیبهشت ۱۴۰۳',
  amount: 30000000,
  isPositive: true
}, {
  id: 2016,
  contactId: 18,
  type: 'demand_repayment',
  title: 'دریافت بازپرداخت طلب از فرزاد مرادی',
  dateStr: '۲۸ خرداد ۱۴۰۳',
  amount: -10000000,
  isPositive: false
},
// Settled Debts Archived Transactions
{
  id: 3001,
  periodId: 'p_debt_101',
  contactId: 2,
  type: 'debt',
  title: 'ثبت بدهی قدیمی',
  dateStr: '۱۵ فروردین ۱۴۰۳',
  amount: -7000000,
  isPositive: false
}, {
  id: 3002,
  periodId: 'p_debt_101',
  contactId: 2,
  type: 'debt_repayment',
  title: 'تسویه کامل بدهی به علی رضایی',
  dateStr: '۱۰ تیر ۱۴۰۳',
  amount: 7000000,
  isPositive: true
}, {
  id: 3003,
  periodId: 'p_debt_102',
  contactId: 5,
  type: 'debt',
  title: 'ثبت بدهی قدیمی',
  dateStr: '۰۱ اردیبهشت ۱۴۰۳',
  amount: -14000000,
  isPositive: false
}, {
  id: 3004,
  periodId: 'p_debt_102',
  contactId: 5,
  type: 'debt_repayment',
  title: 'تسویه کامل بدهی به مریم حسینی',
  dateStr: '۱۵ مرداد ۱۴۰۳',
  amount: 14000000,
  isPositive: true
}, {
  id: 3005,
  periodId: 'p_debt_103',
  contactId: 8,
  type: 'debt',
  title: 'ثبت بدهی قدیمی',
  dateStr: '۱۰ دی ۱۴۰۲',
  amount: -20000000,
  isPositive: false
}, {
  id: 3006,
  periodId: 'p_debt_103',
  contactId: 8,
  type: 'debt_repayment',
  title: 'تسویه کامل بدهی به مهدی موسوی',
  dateStr: '۲۰ اسفند ۱۴۰۲',
  amount: 20000000,
  isPositive: true
}, {
  id: 3007,
  periodId: 'p_debt_104',
  contactId: 11,
  type: 'debt',
  title: 'ثبت بدهی قدیمی',
  dateStr: '۰۵ خرداد ۱۴۰۳',
  amount: -9000000,
  isPositive: false
}, {
  id: 3008,
  periodId: 'p_debt_104',
  contactId: 11,
  type: 'debt_repayment',
  title: 'تسویه کامل بدهی به فاطمه نوری',
  dateStr: '۱۲ تیر ۱۴۰۳',
  amount: 9000000,
  isPositive: true
}, {
  id: 3009,
  periodId: 'p_debt_105',
  contactId: 14,
  type: 'debt',
  title: 'ثبت بدهی قدیمی',
  dateStr: '۱۵ بهمن ۱۴۰۲',
  amount: -35000000,
  isPositive: false
}, {
  id: 3010,
  periodId: 'p_debt_105',
  contactId: 14,
  type: 'debt_repayment',
  title: 'تسویه کامل بدهی به کامران طاهری',
  dateStr: '۲۵ فروردین ۱۴۰۳',
  amount: 35000000,
  isPositive: true
},
// Settled Demands Archived Transactions
{
  id: 4001,
  periodId: 'p_demand_201',
  contactId: 1,
  type: 'demand',
  title: 'ثبت طلب قدیمی',
  dateStr: '۱۰ فروردین ۱۴۰۳',
  amount: 10000000,
  isPositive: true
}, {
  id: 4002,
  periodId: 'p_demand_201',
  contactId: 1,
  type: 'demand_repayment',
  title: 'تسویه کامل طلب از محمد احمدی',
  dateStr: '۱۵ خرداد ۱۴۰۳',
  amount: -10000000,
  isPositive: false
}, {
  id: 4003,
  periodId: 'p_demand_202',
  contactId: 3,
  type: 'demand',
  title: 'ثبت طلب قدیمی',
  dateStr: '۰۵ اردیبهشت ۱۴۰۳',
  amount: 15000000,
  isPositive: true
}, {
  id: 4004,
  periodId: 'p_demand_202',
  contactId: 3,
  type: 'demand_repayment',
  title: 'تسویه کامل طلب از سارا محمدی',
  dateStr: '۰۱ مرداد ۱۴۰۳',
  amount: -15000000,
  isPositive: false
}, {
  id: 4005,
  periodId: 'p_demand_203',
  contactId: 6,
  type: 'demand',
  title: 'ثبت طلب قدیمی',
  dateStr: '۱۲ آذر ۱۴۰۲',
  amount: 28000000,
  isPositive: true
}, {
  id: 4006,
  periodId: 'p_demand_203',
  contactId: 6,
  type: 'demand_repayment',
  title: 'تسویه کامل طلب از حسین کریمی',
  dateStr: '۲۰ اردیبهشت ۱۴۰۳',
  amount: -28000000,
  isPositive: false
}, {
  id: 4007,
  periodId: 'p_demand_204',
  contactId: 9,
  type: 'demand',
  title: 'ثبت طلب قدیمی',
  dateStr: '۰۱ خرداد ۱۴۰۳',
  amount: 12500000,
  isPositive: true
}, {
  id: 4008,
  periodId: 'p_demand_204',
  contactId: 9,
  type: 'demand_repayment',
  title: 'تسویه کامل طلب از نرگس قاسمی',
  dateStr: '۱۰ شهریور ۱۴۰۳',
  amount: -12500000,
  isPositive: false
}, {
  id: 4009,
  periodId: 'p_demand_205',
  contactId: 13,
  type: 'demand',
  title: 'ثبت طلب قدیمی',
  dateStr: '۰۱ اسفند ۱۴۰۲',
  amount: 22000000,
  isPositive: true
}, {
  id: 4010,
  periodId: 'p_demand_205',
  contactId: 13,
  type: 'demand_repayment',
  title: 'تسویه کامل طلب از الناز ابراهیمی',
  dateStr: '۱۸ اردیبهشت ۱۴۰۳',
  amount: -22000000,
  isPositive: false
},
// Loan Repayment Transactions
{
  id: 5001,
  loanId: 501,
  contactId: 1,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۶ - وام خودرو',
  dateStr: '۲۵ مهر ۱۴۰۳',
  amount: 20000000,
  isPositive: true
}, {
  id: 5002,
  loanId: 501,
  contactId: 1,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۵ - وام خودرو',
  dateStr: '۲۵ شهریور ۱۴۰۳',
  amount: 20000000,
  isPositive: true
}, {
  id: 5003,
  loanId: 501,
  contactId: 1,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۴ - وام خودرو',
  dateStr: '۲۵ مرداد ۱۴۰۳',
  amount: 20000000,
  isPositive: true
}, {
  id: 5004,
  loanId: 501,
  contactId: 1,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۳ - وام خودرو',
  dateStr: '۲۵ تیر ۱۴۰۳',
  amount: 20000000,
  isPositive: true
}, {
  id: 5005,
  loanId: 501,
  contactId: 1,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۲ - وام خودرو',
  dateStr: '۲۵ خرداد ۱۴۰۳',
  amount: 20000000,
  isPositive: true
}, {
  id: 5006,
  loanId: 501,
  contactId: 1,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۱ - وام خودرو',
  dateStr: '۲۵ اردیبهشت ۱۴۰۳',
  amount: 20000000,
  isPositive: true
}, {
  id: 5007,
  loanId: 502,
  contactId: 4,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۸ - وام مسکن',
  dateStr: '۱۰ آبان ۱۴۰۳',
  amount: 20000000,
  isPositive: true
}, {
  id: 5008,
  loanId: 502,
  contactId: 4,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۷ - وام مسکن',
  dateStr: '۱۰ مهر ۱۴۰۳',
  amount: 20000000,
  isPositive: true
}, {
  id: 5009,
  loanId: 502,
  contactId: 4,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۶ - وام مسکن',
  dateStr: '۱۰ شهریور ۱۴۰۳',
  amount: 20000000,
  isPositive: true
}, {
  id: 5010,
  loanId: 503,
  contactId: 6,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۱۰ - وام ازدواج',
  dateStr: '۰۱ مرداد ۱۴۰۳',
  amount: 10000000,
  isPositive: true
}, {
  id: 5011,
  loanId: 503,
  contactId: 6,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۹ - وام ازدواج',
  dateStr: '۰۱ تیر ۱۴۰۳',
  amount: 10000000,
  isPositive: true
}, {
  id: 5012,
  loanId: 504,
  contactId: 8,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۴ - وام لوازم خانگی',
  dateStr: '۱۵ شهریور ۱۴۰۳',
  amount: 10000000,
  isPositive: true
}, {
  id: 5013,
  loanId: 505,
  contactId: 10,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۳ - وام اشتغال',
  dateStr: '۲۰ تیر ۱۴۰۳',
  amount: 16666000,
  isPositive: true
}, {
  id: 5014,
  loanId: 506,
  contactId: 12,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۵ - وام تعمیرات مسکن',
  dateStr: '۰۵ مرداد ۱۴۰۳',
  amount: 12500000,
  isPositive: true
}, {
  id: 5015,
  loanId: 507,
  contactId: 14,
  type: 'repayment',
  title: 'پرداخت قسط شماره ۷ - وام ودیعه مسکن',
  dateStr: '۲۰ خرداد ۱۴۰۳',
  amount: 10000000,
  isPositive: true
}];
const initialReminders = [{
  id: 1,
  title: 'قسط خودرو',
  category: 'خودرو',
  daysLeft: 4,
  dateStr: 'شنبه ۲۵ مرداد ۱۴۰۴',
  icon: 'car',
  color: 'bg-red-50 text-red-500 dark:bg-red-950/40'
}, {
  id: 2,
  title: 'بازپرداخت به علی رضایی',
  category: 'شخص',
  daysLeft: 8,
  dateStr: 'سه‌شنبه ۲۸ مرداد ۱۴۰۴',
  icon: 'user',
  color: 'bg-amber-50 text-amber-500 dark:bg-amber-950/40'
}, {
  id: 3,
  title: 'قسط وام مسکن',
  category: 'مسکن',
  daysLeft: 18,
  dateStr: 'پنج‌شنبه ۱۰ شهریور ۱۴۰۴',
  icon: 'home',
  color: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950/40'
}];

// variants انیمیشن iOS برای پاپ‌آپ‌ها (Pop Out بانس سریع 1.05 و کوچک‌شدن ملموس به 0.45 با فیدآوت نرم)
const iosModalVariants = {
  initial: {
    opacity: 0,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      opacity: {
        duration: 0.15
      }
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};
const iosBackdropVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};
function Icon({
  name,
  className = "w-5 h-5",
  style = {},
  ...props
}) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current && window.lucide && name) {
      containerRef.current.innerHTML = `<i data-lucide="${name}" class="block w-full h-full flex items-center justify-center shrink-0 ${className || ''}"></i>`;
      window.lucide.createIcons({
        root: containerRef.current
      });
    }
  }, [name, className]);
  return /*#__PURE__*/<span ref={containerRef} className="inline-flex items-center justify-center shrink-0" style={style} {...props} />;
}
function PullToRefresh({
  onRefresh,
  children,
  className = ""
}) {
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
    const onPointerDown = e => {
      if (e.button !== undefined && e.button !== 0) return;
      handleStart(e.clientX, e.clientY);
    };
    const onPointerMove = e => {
      handleMove(e.clientX, e.clientY, e);
    };
    const onPointerUp = () => {
      handleEnd();
    };
    const onTouchStart = e => {
      if (e.touches && e.touches[0]) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = e => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY, e);
      }
    };
    const onTouchEnd = () => {
      handleEnd();
    };
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, {
      passive: false
    });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    container.addEventListener('touchstart', onTouchStart, {
      passive: true
    });
    container.addEventListener('touchmove', onTouchMove, {
      passive: false
    });
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
  const opacity = isExiting ? 0 : isRefreshing ? 1 : Math.min(1, pullY / 25);
  const scale = isExiting ? 0.4 : isRefreshing ? 1 : 0.5 + 0.5 * progress;
  const rotation = progress * 360;
  return /*#__PURE__*/<div ref={containerRef} className={`relative overflow-y-auto overflow-x-hidden overscroll-x-none hide-scrollbar ${className}`} style={{
    WebkitOverflowScrolling: 'touch',
    overscrollBehaviorY: 'contain'
  }}>{(pullY > 0 || isRefreshing || isExiting) && /*#__PURE__*/<div className="absolute left-1/2 -translate-x-1/2 z-40 pointer-events-none flex items-center justify-center" style={{
      top: `${Math.max(12, pullY / 2 - 20)}px`,
      transform: `translate3d(-50%, 0, 0) scale(${scale})`,
      opacity: opacity,
      transition: isDraggingRef.current ? 'none' : 'transform 320ms cubic-bezier(0.32, 0.72, 0, 1), opacity 200ms ease',
      willChange: 'transform, opacity'
    }}>{/*#__PURE__*/<div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400">{isRefreshing ? /*#__PURE__*/<div className="w-5 h-5 border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin shrink-0" /> : /*#__PURE__*/<div className="flex items-center justify-center" style={{
          transform: `rotate(${rotation}deg)`,
          transition: isDraggingRef.current ? 'none' : 'transform 200ms ease-out'
        }}>{/*#__PURE__*/<Icon name="refresh-cw" className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}</div>}</div>}</div>}{/*#__PURE__*/<div className="w-full min-h-full" style={{
      transform: pullY > 0 ? `translate3d(0, ${pullY}px, 0)` : 'translate3d(0, 0, 0)',
      transition: isDraggingRef.current ? 'none' : 'transform 320ms cubic-bezier(0.32, 0.72, 0, 1)',
      willChange: 'transform'
    }}>{children}</div>}</div>;
}
function SwipeBackWrapper({
  onBack,
  onRefresh,
  underlyingContent,
  children,
  className = "",
  navDirection = "forward"
}) {
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

    const getCoords = e => {
      if (e.touches && e.touches.length > 0) {
        return {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
      if (e.changedTouches && e.changedTouches.length > 0) {
        return {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY
        };
      }
      return {
        x: e.clientX || 0,
        y: e.clientY || 0
      };
    };
    const handleStart = e => {
      if (isClosingRef.current) return;
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target && e.target.closest && e.target.closest('[data-swipe-item]')) {
        gestureRef.current.isEdgeCandidate = false;
        gestureRef.current.isDragging = false;
        return;
      }
      const {
        x,
        y
      } = getCoords(e);
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
    const handleMove = e => {
      const g = gestureRef.current;
      if (isClosingRef.current) return;
      if (!g.isEdgeCandidate && !g.isDragging) return;
      if (e.target && e.target.closest && e.target.closest('[data-swipe-item]')) {
        g.isEdgeCandidate = false;
        g.isDragging = false;
        return;
      }
      const {
        x,
        y
      } = getCoords(e);
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
        const screenWidth = page2Ref.current ? page2Ref.current.offsetWidth : window.innerWidth || 360;
        const progress = Math.min(dragDelta / screenWidth, 1);
        const page1 = page1Ref.current;
        const page2 = page2Ref.current;
        const overlay = overlayRef.current;
        if (page1 && page2 && overlay) {
          page2.style.transform = `translateX(${dragDelta}px)`;
          const page1Offset = -25 + progress * 25;
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
      const screenWidth = page2Ref.current ? page2Ref.current.offsetWidth : window.innerWidth || 360;
      const deltaX = g.currentX - g.startX;
      const elapsed = Math.max(1, Date.now() - g.startTime);
      const velocityX = deltaX / elapsed;
      if (deltaX > screenWidth * 0.25 || deltaX > 40 && velocityX > 0.25) {
        closePage('swipe');
      } else {
        openPage();
      }
    };
    window.addEventListener('touchstart', handleStart, {
      passive: true
    });
    window.addEventListener('touchmove', handleMove, {
      passive: false
    });
    window.addEventListener('touchend', handleEnd, {
      passive: true
    });
    window.addEventListener('touchcancel', handleEnd, {
      passive: true
    });
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
  return /*#__PURE__*/<div className={`app-viewport fixed inset-0 w-full h-full overflow-hidden bg-[#F4F7FC] dark:bg-slate-950 z-30 ${className}`}>{/*#__PURE__*/<div ref={page1Ref} className="page-view z-10 touch-pan-y bg-[#F4F7FC] dark:bg-slate-950 overflow-y-auto overflow-x-hidden overscroll-x-none w-full h-full">{/*#__PURE__*/<div className="px-4 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] pb-20 min-h-full">{underlyingContent}</div>}</div>}{/*#__PURE__*/<div ref={overlayRef} className="backdrop-overlay" />}{/*#__PURE__*/<div ref={page2Ref} className="page-view z-20 touch-pan-y bg-[#F4F7FC] dark:bg-slate-950 w-full h-full overflow-hidden">{onRefresh ? /*#__PURE__*/<PullToRefresh onRefresh={onRefresh} className="w-full h-full px-4 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] pb-20">{typeof children === 'function' ? children({
          onBack: handleHeaderBack
        }) : children}</PullToRefresh> : /*#__PURE__*/<div className="w-full h-full overflow-y-auto overflow-x-hidden overscroll-x-none px-4 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] pb-20">{typeof children === 'function' ? children({
          onBack: handleHeaderBack
        }) : children}</div>}</div>}</div>;
}
function playHapticTick() {
  // Mute date picker scrolling audio feedback as requested
  return;
}
function WheelColumn({
  items = [],
  selectedIndex = 0,
  onSelectIndex,
  flexClass = "flex-1",
  ariaLabel
}) {
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

      const animateScroll = now => {
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
  return /*#__PURE__*/<div ref={elementRef} onScroll={handleScroll} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onMouseDown={handleTouchStart} onMouseUp={handleTouchEnd} className={`${flexClass} h-full overflow-y-scroll no-scrollbar wheel-scroll relative cursor-grab active:cursor-grabbing`} tabIndex={0} aria-label={ariaLabel}>{/*#__PURE__*/<div style={{
      height: `${SPACER_HEIGHT}px`
    }} className="w-full shrink-0" />}{/*#__PURE__*/<div ref={containerRef} className="w-full">{items.map((item, idx) => /*#__PURE__*/<div key={idx} onClick={() => {
        isUserInteractingRef.current = true;
        isProgrammaticRef.current = false;
        if (elementRef.current) {
          elementRef.current.scrollTo({
            top: idx * ITEM_HEIGHT,
            behavior: 'smooth'
          });
        }
        if (onSelectIndex) onSelectIndex(idx);
      }} className="wheel-item h-[44px] flex items-center justify-center font-normal text-base text-slate-400 dark:text-slate-400">{item.display}</div>)}</div>}{/*#__PURE__*/<div style={{
      height: `${SPACER_HEIGHT}px`
    }} className="w-full shrink-0" />}</div>;
}
function FullJalaliDatePicker({
  day = 1,
  month = 'فروردین',
  year = 1403,
  onChange
}) {
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
    return Array.from({
      length: daysInMonth
    }, (_, i) => ({
      value: i + 1,
      display: toAppDigits(i + 1)
    }));
  }, [daysInMonth]);
  const monthItems = useMemo(() => {
    return monthNames.map((mName, i) => ({
      value: mName,
      display: `${mName} - ${toAppDigits(i + 1)}`
    }));
  }, [monthNames]);
  const yearItems = useMemo(() => {
    return years.map(y => ({
      value: y,
      display: toAppDigits(y)
    }));
  }, [years]);
  const selectedDayIdx = Math.max(0, Math.min(numericDay - 1, dayItems.length - 1));
  const foundYearIdx = years.indexOf(numericYear);
  const selectedYearIdx = foundYearIdx !== -1 ? foundYearIdx : Math.max(0, years.indexOf(1403));
  const handleToday = () => {
    playHapticTick();
    const devDate = getDeviceJalaliDate();
    if (onChange) {
      onChange({
        day: devDate.day,
        month: devDate.month,
        year: devDate.year
      });
    }
  };
  return /*#__PURE__*/<div className="w-full space-y-3 select-none">{/*#__PURE__*/<div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-xs">{/*#__PURE__*/<div className="flex items-center space-x-2 space-x-reverse">{/*#__PURE__*/<span className="text-xs font-medium text-slate-500 dark:text-slate-400">تاریخ انتخاب‌شده:</span>}{/*#__PURE__*/<span className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-blue-400 tracking-tight">{toAppDigits(numericDay)} {monthStr} {toAppDigits(numericYear)}</span>}</div>}{/*#__PURE__*/<button type="button" onClick={handleToday} className="py-1 px-2.5 bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 active:scale-95 transition text-xs font-semibold rounded-xl text-indigo-600 dark:text-slate-200 border border-indigo-200 dark:border-slate-700/50 flex items-center space-x-1 space-x-reverse shrink-0 cursor-pointer">{/*#__PURE__*/<Icon name="clock" className="w-3.5 h-3.5 text-indigo-500 dark:text-blue-400" />}{/*#__PURE__*/<span>امروز</span>}</button>}</div>}{/*#__PURE__*/<div className="relative w-full h-[210px] bg-[#F4F7FC]/70 dark:bg-slate-950/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/50 flex shadow-inner">{/*#__PURE__*/<div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-[44px] bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur-md rounded-xl pointer-events-none border border-slate-300/60 dark:border-slate-700/50 shadow-xs z-10" />}{/*#__PURE__*/<div className="relative w-full h-full wheel-mask flex z-20" dir="ltr">{/*#__PURE__*/<WheelColumn items={yearItems} selectedIndex={selectedYearIdx} onSelectIndex={idx => {
          const newYear = years[idx];
          if (newYear !== numericYear && onChange) {
            onChange({
              day: numericDay,
              month: monthStr,
              year: newYear
            });
          }
        }} flexClass="flex-1" ariaLabel=" " />}{/*#__PURE__*/<WheelColumn items={monthItems} selectedIndex={selectedMonthIdx} onSelectIndex={idx => {
          const newMonth = monthNames[idx];
          if (newMonth !== monthStr && onChange) {
            onChange({
              day: numericDay,
              month: newMonth,
              year: numericYear
            });
          }
        }} flexClass="flex-[1.3]" ariaLabel=" " />}{/*#__PURE__*/<WheelColumn items={dayItems} selectedIndex={selectedDayIdx} onSelectIndex={idx => {
          const newDay = dayItems[idx].value;
          if (newDay !== numericDay && onChange) {
            onChange({
              day: newDay,
              month: monthStr,
              year: numericYear
            });
          }
        }} flexClass="flex-1" ariaLabel=" " />}</div>}</div>}</div>;
}
function IOSWheelPicker({
  items = [],
  selectedValue,
  onChange,
  label
}) {
  const formattedItems = useMemo(() => {
    return items.map(it => ({
      value: it,
      display: typeof it === 'number' ? toAppDigits(it) : String(it)
    }));
  }, [items]);
  const selectedIndex = Math.max(0, items.indexOf(selectedValue));
  return /*#__PURE__*/<div className="flex flex-col items-center flex-1 min-w-0 select-none">{label && /*#__PURE__*/<span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">{label}</span>}{/*#__PURE__*/<div className="relative w-full h-[180px] bg-[#F4F7FC]/70 dark:bg-slate-950/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/50 flex">{/*#__PURE__*/<div className="absolute left-1 right-1 top-1/2 -translate-y-1/2 h-[44px] bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur-md rounded-xl pointer-events-none border border-slate-300/60 dark:border-slate-700/50 z-10" />}{/*#__PURE__*/<div className="relative w-full h-full wheel-mask flex z-20">{/*#__PURE__*/<WheelColumn items={formattedItems} selectedIndex={selectedIndex} onSelectIndex={idx => {
          if (onChange && items[idx] !== undefined) onChange(items[idx]);
        }} flexClass="flex-1" ariaLabel={label || "wheel"} />}</div>}</div>}</div>;
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
  return /*#__PURE__*/<AnimatePresence>{isOpen && /*#__PURE__*/<motion.div key="global-confirm-backdrop" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={e => {
      if (e.target === e.currentTarget && allowBackdropClose) {
        onCancel();
      }
    }} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">{/*#__PURE__*/<motion.div key="global-confirm-modal" initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0.9,
        opacity: 0
      }} transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }} className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl w-full max-w-xs sm:max-w-sm rounded-[28px] p-5 space-y-4 text-center shadow-2xl border border-slate-100 dark:border-slate-700/80">{/*#__PURE__*/<div className={`w-14 h-14 rounded-full ${iconBgColor} mx-auto flex items-center justify-center shadow-sm active:scale-95 transition-transform duration-200`}>{/*#__PURE__*/<Icon name={iconName} className="w-7 h-7" />}</div>}{/*#__PURE__*/<div className="space-y-1.5">{/*#__PURE__*/<h4 className="text-base font-extrabold text-slate-900 dark:text-white">{title}</h4>}{/*#__PURE__*/<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{message}</p>}{details && details.length > 0 && /*#__PURE__*/<div className="mt-3 p-3 bg-[#F4F7FC] dark:bg-slate-900/80 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-right space-y-1.5 text-xs">{/*#__PURE__*/<span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 block mb-1">موارد در حال حذف:</span>}{details.map((item, idx) => /*#__PURE__*/<div key={idx} className="flex items-center space-x-2 space-x-reverse text-slate-700 dark:text-slate-300 font-bold">{/*#__PURE__*/<span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />}{/*#__PURE__*/<span>{item}</span>}</div>)}</div>}</div>}{/*#__PURE__*/<div className="flex space-x-2.5 space-x-reverse pt-2">{/*#__PURE__*/<button onClick={onConfirm} className={`flex-1 font-extrabold py-3 rounded-2xl text-xs shadow-md active:scale-[0.95] transition-all duration-150 ${isDestructive ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/20' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'}`}>{confirmLabel}</button>}{/*#__PURE__*/<button onClick={onCancel} className="flex-1 bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-3 rounded-2xl text-xs active:scale-[0.95] transition-all duration-150">{cancelLabel}</button>}</div>}</motion.div>}</motion.div>}</AnimatePresence>;
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
    const transitionStr = dragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
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
    const handleGlobalClick = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        snapTo(0, false);
        setSwipedOpen(false);
      }
    };
    window.addEventListener('pointerdown', handleGlobalClick, {
      capture: true
    });
    window.addEventListener('touchstart', handleGlobalClick, {
      capture: true,
      passive: true
    });
    window.addEventListener('mousedown', handleGlobalClick, {
      capture: true
    });
    return () => {
      window.removeEventListener('pointerdown', handleGlobalClick, {
        capture: true
      });
      window.removeEventListener('touchstart', handleGlobalClick, {
        capture: true
      });
      window.removeEventListener('mousedown', handleGlobalClick, {
        capture: true
      });
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
    const getCoords = e => {
      if (e.touches && e.touches.length > 0) {
        return {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
      if (e.changedTouches && e.changedTouches.length > 0) {
        return {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY
        };
      }
      return {
        x: e.clientX || 0,
        y: e.clientY || 0
      };
    };
    const handleStart = e => {
      if (isDeletingRef.current) return;
      if (e.type === 'mousedown' && e.button !== 0) return;
      if (e.stopPropagation) e.stopPropagation();
      const {
        x,
        y
      } = getCoords(e);
      gestureRef.current = {
        startX: x,
        startY: y,
        startOffset: offsetRef.current,
        isSlopPassed: false,
        isHorizontalDrag: false
      };
    };
    const handleMove = e => {
      const g = gestureRef.current;
      if (isDeletingRef.current || !g.startX) return;
      const {
        x,
        y
      } = getCoords(e);
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
    const handleEnd = e => {
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
    cardEl.addEventListener('touchstart', handleStart, {
      passive: false
    });
    cardEl.addEventListener('touchmove', handleMove, {
      passive: false
    });
    cardEl.addEventListener('touchend', handleEnd);
    cardEl.addEventListener('touchcancel', handleEnd);
    cardEl.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove, {
      passive: false
    });
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
  return /*#__PURE__*/<div ref={containerRef} data-swipe-item="true" style={{
    touchAction: 'pan-y'
  }} className={`relative transition-[max-height,opacity,transform] duration-300 overflow-hidden rounded-2xl ${isDeleting ? 'max-h-0 opacity-0 my-0 py-0 scale-95 pointer-events-none' : 'max-h-[500px] opacity-100 my-0.5 swipe-container-safe'} ${className}`}>{/*#__PURE__*/<div ref={btnRef} className="absolute right-1 top-1/2 z-0 flex items-center justify-center bg-red-600 hover:bg-red-700 active:bg-red-800 text-white cursor-pointer shadow-md select-none transition-colors" style={{
      width: '52px',
      height: '52px',
      borderRadius: '26px',
      opacity: 0,
      transform: 'translate3d(0, -50%, 0) scale(0.5)',
      transformOrigin: 'right center',
      visibility: 'hidden',
      willChange: 'transform, width, border-radius'
    }} onClick={e => {
      e.stopPropagation();
      triggerDeleteModal();
    }}>{/*#__PURE__*/<div className="flex items-center justify-center w-full h-full">{/*#__PURE__*/<Icon name="trash-2" className="w-5 h-5 text-white shrink-0" />}</div>}</div>}{/*#__PURE__*/<div ref={cardRef} data-swipe-item="true" style={{
      touchAction: 'pan-y'
    }} style={{
      transform: 'translate3d(0, 0, 0)',
      willChange: 'transform',
      touchAction: 'pan-y'
    }} className={`relative z-10 transition-shadow duration-200 ${isDragging || swipedOpen ? 'rounded-2xl shadow-xl' : ''}`}>{children}</div>}</div>;
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
  colorTheme = 'indigo',
  actions = []
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);
  const themeConfig = {
    indigo: {
      activeTextColor: 'text-indigo-600 dark:text-indigo-400',
      underlineBg: 'bg-indigo-600 dark:bg-indigo-400',
      btnGradient: 'from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700',
      badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300'
    },
    blue: {
      activeTextColor: 'text-indigo-600 dark:text-indigo-400',
      underlineBg: 'bg-indigo-600 dark:bg-indigo-400',
      btnGradient: 'from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700',
      badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300'
    },
    rose: {
      activeTextColor: 'text-rose-600 dark:text-rose-400',
      underlineBg: 'bg-rose-600 dark:bg-rose-400',
      btnGradient: 'from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700',
      badgeBg: 'bg-rose-500/10 text-rose-600 dark:bg-rose-400/15 dark:text-rose-300'
    },
    emerald: {
      activeTextColor: 'text-emerald-600 dark:text-emerald-400',
      underlineBg: 'bg-emerald-600 dark:bg-emerald-400',
      btnGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300'
    }
  }[colorTheme] || {
    activeTextColor: 'text-indigo-600 dark:text-indigo-400',
    underlineBg: 'bg-indigo-600 dark:bg-indigo-400',
    btnGradient: 'from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700',
    badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300'
  };
  const isRightActive = currentFilter === 'active';
  const isLeftActive = currentFilter === 'archived';
  return /*#__PURE__*/<div className="w-full relative my-2.5 select-none flex items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-700/60 pb-2">{/*#__PURE__*/<div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-2xl text-xs font-bold border border-slate-200/70 dark:border-slate-700/50">{/*#__PURE__*/<button type="button" onClick={() => onChange('active')} className={`py-1.5 px-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${isRightActive ? `bg-white dark:bg-slate-700 ${themeConfig.activeTextColor} shadow-xs font-black` : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium'}`}>{/*#__PURE__*/<span>{activeLabel}</span>}{/*#__PURE__*/<span className="dir-ltr text-[11px] font-extrabold opacity-80">({toAppDigits(activeCount)})</span>}</button>}{/*#__PURE__*/<button type="button" onClick={() => onChange('archived')} className={`py-1.5 px-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${isLeftActive ? `bg-white dark:bg-slate-700 ${themeConfig.activeTextColor} shadow-xs font-black` : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium'}`}>{/*#__PURE__*/<span>بایگانی</span>}{/*#__PURE__*/<span className="dir-ltr text-[11px] font-extrabold opacity-80">({toAppDigits(archiveCount)})</span>}</button>}</div>}{actions && actions.length > 0 && /*#__PURE__*/<div className="relative" ref={dropdownRef}>{/*#__PURE__*/<button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className={`py-1.5 px-3 rounded-full bg-gradient-to-r ${themeConfig.btnGradient} text-white font-extrabold text-xs shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer`}>{/*#__PURE__*/<Icon name="plus" className="w-3.5 h-3.5" />}{/*#__PURE__*/<span>ثبت جدید</span>}{/*#__PURE__*/<Icon name="chevron-down" className={`w-3 h-3 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />}</button>}{/*#__PURE__*/<AnimatePresence>{isMenuOpen && /*#__PURE__*/<motion.div key="actions-dropdown-menu" initial={{
          opacity: 0,
          scale: 0.92,
          y: -6
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 4
        }} exit={{
          opacity: 0,
          scale: 0.92,
          y: -6
        }} transition={{
          duration: 0.15,
          ease: "easeOut"
        }} className="absolute left-0 top-full z-50 min-w-[170px] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-700/80 p-1.5 space-y-1 overflow-hidden">{actions.map((act, idx) => /*#__PURE__*/<button key={idx} type="button" onClick={() => {
            setIsMenuOpen(false);
            act.onClick();
          }} className="w-full py-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 text-xs font-bold flex items-center gap-2.5 transition-colors text-right cursor-pointer group">{/*#__PURE__*/<div className={`w-6 h-6 rounded-lg ${themeConfig.badgeBg} flex items-center justify-center shrink-0`}>{/*#__PURE__*/<Icon name={act.icon || 'plus'} className="w-3.5 h-3.5" />}</div>}{/*#__PURE__*/<span className="truncate">{act.label}</span>}</button>)}</motion.div>}</AnimatePresence>}</div>}</div>;
}
function TxBorderFocusOverlay({
  tx,
  isHighlighted
}) {
  const [dims, setDims] = useState({
    width: 0,
    height: 0
  });
  const [animActive, setAnimActive] = useState(false);
  const containerRef = useRef(null);

  // Determine category color based on transaction type
  const isLoanTx = tx.loanId || tx.type === 'loan_installment' || tx.type === 'installment' || tx.type === 'repayment' || tx.installmentNumber;
  const isDebtTx = tx.type === 'debt' || tx.type === 'debt_repayment';
  const isDemandTx = tx.type === 'demand' || tx.type === 'demand_repayment';

  // Loan: #3B82F6, Debt: #EF4444, Receivable: #22C55E
  const colorHex = isLoanTx ? '#3B82F6' : isDebtTx ? '#EF4444' : isDemandTx ? '#22C55E' : '#3B82F6';
  const lightTint = isLoanTx ? '#DBEAFE' : isDebtTx ? '#FEE2E2' : isDemandTx ? '#DCFCE7' : '#DBEAFE';
  useEffect(() => {
    if (!isHighlighted) {
      setAnimActive(false);
      return;
    }
    const updateDims = () => {
      if (containerRef.current && containerRef.current.parentElement) {
        const rect = containerRef.current.parentElement.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDims({
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          });
        }
      }
    };
    updateDims();

    // Wait for page scroll to finish (450ms initial + ~300ms scroll) + ~200ms pause
    const startTimer = setTimeout(() => {
      updateDims();
      setAnimActive(true);
    }, 950);

    // Auto-stop and remove after animation sequence completes (950ms + 1400ms = 2350ms)
    const stopTimer = setTimeout(() => {
      setAnimActive(false);
    }, 2450);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, [isHighlighted]);
  if (!isHighlighted || !animActive || dims.width === 0 || dims.height === 0) {
    return /*#__PURE__*/<div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
  }
  const w = dims.width;
  const h = dims.height;
  const r = 16; // 16px radius for rounded-2xl

  // Two symmetrical paths along the exact card border perimeter:
  // Path 1 (Clockwise): Top-Center -> Top-Right -> Right-Edge -> Bottom-Right -> Bottom-Center
  const path1 = `M ${w / 2} 1 L ${w - 1 - r} 1 A ${r} ${r} 0 0 1 ${w - 1} ${1 + r} L ${w - 1} ${h - 1 - r} A ${r} ${r} 0 0 1 ${w - 1 - r} ${h - 1} L ${w / 2} ${h - 1}`;

  // Path 2 (Counter-Clockwise): Top-Center -> Top-Left -> Left-Edge -> Bottom-Left -> Bottom-Center
  const path2 = `M ${w / 2} 1 L ${1 + r} 1 A ${r} ${r} 0 0 0 1 ${1 + r} L 1 ${h - 1 - r} A ${r} ${r} 0 0 0 ${1 + r} ${h - 1} L ${w / 2} ${h - 1}`;
  return /*#__PURE__*/<div ref={containerRef} className="absolute inset-0 pointer-events-none z-30 overflow-visible" aria-hidden="true">{/*#__PURE__*/<svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 w-full h-full overflow-visible pointer-events-none tx-focus-container">{/*#__PURE__*/<defs>{/*#__PURE__*/<filter id={`tx-glow-${tx.id}`} x="-20%" y="-20%" width="140%" height="140%">{/*#__PURE__*/<feGaussianBlur stdDeviation="2.5" result="blur" />}{/*#__PURE__*/<feMerge>{/*#__PURE__*/<feMergeNode in="blur" />}{/*#__PURE__*/<feMergeNode in="SourceGraphic" />}</feMerge>}</filter>}{/*#__PURE__*/<radialGradient id={`tx-meet-grad-${tx.id}`} cx="50%" cy="50%" r="50%">{/*#__PURE__*/<stop offset="0%" stopColor={lightTint} stopOpacity="1" />}{/*#__PURE__*/<stop offset="35%" stopColor={colorHex} stopOpacity="0.85" />}{/*#__PURE__*/<stop offset="100%" stopColor={colorHex} stopOpacity="0" />}</radialGradient>}</defs>}{/*#__PURE__*/<path d={path1} pathLength="100" fill="none" stroke={colorHex} strokeWidth="4" strokeLinecap="round" strokeOpacity="0.45" className="tx-focus-beam-glow" filter={`url(#tx-glow-${tx.id})`} />}{/*#__PURE__*/<path d={path2} pathLength="100" fill="none" stroke={colorHex} strokeWidth="4" strokeLinecap="round" strokeOpacity="0.45" className="tx-focus-beam-glow" filter={`url(#tx-glow-${tx.id})`} />}{/*#__PURE__*/<path d={path1} pathLength="100" fill="none" stroke={colorHex} strokeWidth="2.2" strokeLinecap="round" className="tx-focus-beam-core" />}{/*#__PURE__*/<path d={path2} pathLength="100" fill="none" stroke={colorHex} strokeWidth="2.2" strokeLinecap="round" className="tx-focus-beam-core" />}{/*#__PURE__*/<path d={path1} pathLength="100" fill="none" stroke={lightTint} strokeWidth="1.6" strokeLinecap="round" className="tx-focus-beam-head" />}{/*#__PURE__*/<path d={path2} pathLength="100" fill="none" stroke={lightTint} strokeWidth="1.6" strokeLinecap="round" className="tx-focus-beam-head" />}{/*#__PURE__*/<circle cx={w / 2} cy={h - 1} r="14" fill={`url(#tx-meet-grad-${tx.id})`} className="tx-focus-meet-pulse" />}</svg>}</div>;
}
function SwipeableTxCard({
  tx,
  index,
  totalCount,
  onEdit,
  onDelete,
  colorType = 'indigo',
  contactName,
  contacts = [],
  loans = [],
  transactions = [],
  isHighlighted = false,
  hasShadow = true
}) {
  const isRepay = tx.type === 'repayment' || tx.type === 'debt_repayment' || tx.type === 'demand_repayment';

  // Resolve target loan and calculated installment number for loan repayments
  const isLoanTx = tx.type === 'repayment' || tx.type === 'loan_installment' || tx.type === 'installment' || Boolean(tx.loanId);
  let targetLoan = null;
  if (isLoanTx) {
    targetLoan = tx.loan || (tx.loanId && Array.isArray(loans) && loans.length > 0 ? loans.find(l => Number(l.id) === Number(tx.loanId)) : null);
    if (!targetLoan && tx.loanId && typeof loans !== 'undefined' && Array.isArray(loans)) {
      targetLoan = loans.find(l => Number(l.id) === Number(tx.loanId));
    }
  }
  let instNum = null;
  if (isLoanTx) {
    if (tx.installmentNum) {
      instNum = tx.installmentNum;
    } else if (tx.installmentNumber) {
      instNum = tx.installmentNumber;
    } else if (tx.title) {
      const normalizedTitle = toEnglishDigits(String(tx.title));
      const match = normalizedTitle.match(/قسط\s*(?:شماره\s*)?(\d+)/i) || normalizedTitle.match(/(\d+)\s*(?:ام)?\s*قسط/i);
      if (match && match[1]) {
        instNum = parseInt(match[1], 10);
      }
    }
    if (!instNum && targetLoan && Array.isArray(transactions) && transactions.length > 0) {
      const loanRepayments = transactions.filter(t => Number(t.loanId) === Number(targetLoan.id) && (t.type === 'repayment' || t.type === 'loan_installment' || t.type === 'installment')).sort((a, b) => (a.id || 0) - (b.id || 0));
      const idxInLoan = loanRepayments.findIndex(t => t.id === tx.id);
      if (idxInLoan !== -1) {
        instNum = idxInLoan + 1;
      }
    }
    if (!instNum && totalCount !== undefined && index !== undefined) {
      instNum = totalCount - index;
    }
  }
  const {
    line1,
    line2,
    line3
  } = (() => {
    let rawContactName = contactName || tx.contactName || (tx.contact ? `${tx.contact.firstName || ''} ${tx.contact.lastName || ''}`.trim() : tx.firstName ? `${tx.firstName || ''} ${tx.lastName || ''}`.trim() : '');
    if (!rawContactName && tx.contactId && Array.isArray(contacts) && contacts.length > 0) {
      const foundContact = contacts.find(c => c.id === tx.contactId);
      if (foundContact) rawContactName = `${foundContact.firstName || ''} ${foundContact.lastName || ''}`.trim();
    }
    let l1 = '';
    let l2 = '';
    let l3 = tx.notes && tx.notes.trim() ? tx.notes.trim() : tx.description && tx.description.trim() ? tx.description.trim() : 'توضیحات ثبت نشده';
    if (isLoanTx) {
      // Get exact loan title from the loans section
      let loanName = targetLoan ? targetLoan.title : tx.loanTitle || (tx.loan ? tx.loan.title : '');
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
      let loanNameClean = loanName.replace(/^وام\s*/, '').trim();
      if (!loanNameClean) loanNameClean = 'بانک';
      l1 = instNum ? `پرداخت قسط ${toAppDigits(instNum)} وام ${loanNameClean}` : `پرداخت قسط وام ${loanNameClean}`;
      let contactInfo = rawContactName.trim();
      if (!contactInfo && targetLoan) {
        if (targetLoan.contactId && Array.isArray(contacts)) {
          const foundC = contacts.find(c => c.id === targetLoan.contactId);
          if (foundC) contactInfo = `${foundC.firstName || ''} ${foundC.lastName || ''}`.trim();
        }
        if (!contactInfo && targetLoan.contactName) contactInfo = targetLoan.contactName.trim();
        if (!contactInfo && targetLoan.lender) contactInfo = targetLoan.lender.trim();
      }
      l2 = contactInfo ? contactInfo : loanName || 'وام';
    } else if (tx.type === 'debt') {
      l1 = 'بدهی جدید ثبت شد';
      l2 = rawContactName.trim();
    } else if (tx.type === 'debt_repayment') {
      l1 = 'بازپرداخت جدید ثبت شد';
      l2 = rawContactName.trim();
    } else if (tx.type === 'demand') {
      l1 = 'طلب جدید ثبت شد';
      l2 = rawContactName.trim();
    } else if (tx.type === 'demand_repayment') {
      l1 = 'بازپرداخت جدید ثبت شد';
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
    return {
      line1: l1,
      line2: l2,
      line3: l3
    };
  })();
  const txVisualConfig = (() => {
    const type = tx.type;
    if (type === 'repayment' || type === 'loan_installment' || type === 'installment' || tx.loanId) {
      return {
        isLoan: true,
        iconBg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/40',
        iconName: 'receipt',
        microBadgeIcon: 'check',
        microBadgeClass: 'bg-indigo-600 text-white',
        borderAccent: 'border-r-indigo-500 dark:border-r-indigo-400',
        amountClass: 'text-indigo-700 dark:text-indigo-300',
        sign: ''
      };
    }
    if (type === 'demand') {
      return {
        isLoan: false,
        iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40',
        iconName: 'arrow-up-right',
        microBadgeIcon: 'plus',
        microBadgeClass: 'bg-emerald-600 text-white',
        borderAccent: 'border-r-emerald-500 dark:border-r-emerald-400',
        amountClass: 'text-emerald-700 dark:text-emerald-300',
        sign: '+'
      };
    }
    if (type === 'demand_repayment') {
      return {
        isLoan: false,
        iconBg: 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-800/40',
        iconName: 'check-circle-2',
        microBadgeIcon: 'check',
        microBadgeClass: 'bg-teal-600 text-white',
        borderAccent: 'border-r-teal-500 dark:border-r-teal-400',
        amountClass: 'text-teal-700 dark:text-teal-300',
        sign: '+'
      };
    }
    if (type === 'debt') {
      return {
        isLoan: false,
        iconBg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-800/40',
        iconName: 'arrow-down-left',
        microBadgeIcon: 'minus',
        microBadgeClass: 'bg-rose-600 text-white',
        borderAccent: 'border-r-rose-500 dark:border-r-rose-400',
        amountClass: 'text-rose-700 dark:text-rose-300',
        sign: '-'
      };
    }
    if (type === 'debt_repayment') {
      return {
        isLoan: false,
        iconBg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/40',
        iconName: 'corner-down-left',
        microBadgeIcon: 'check',
        microBadgeClass: 'bg-amber-600 text-white',
        borderAccent: 'border-r-amber-500 dark:border-r-amber-400',
        amountClass: 'text-amber-700 dark:text-amber-300',
        sign: '-'
      };
    }
    if (type === 'income') {
      return {
        isLoan: false,
        iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/40',
        iconName: 'arrow-down-left',
        microBadgeIcon: 'plus',
        microBadgeClass: 'bg-emerald-600 text-white',
        borderAccent: 'border-r-emerald-500 dark:border-r-emerald-400',
        amountClass: 'text-emerald-700 dark:text-emerald-300',
        sign: '+'
      };
    }
    if (type === 'expense') {
      return {
        isLoan: false,
        iconBg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-800/40',
        iconName: 'arrow-up-right',
        microBadgeIcon: 'minus',
        microBadgeClass: 'bg-rose-600 text-white',
        borderAccent: 'border-r-rose-500 dark:border-r-rose-400',
        amountClass: 'text-rose-700 dark:text-rose-300',
        sign: '-'
      };
    }
    return {
      isLoan: false,
      iconBg: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600',
      iconName: 'receipt',
      microBadgeIcon: 'receipt',
      microBadgeClass: 'bg-slate-600 text-white',
      borderAccent: 'border-r-slate-400 dark:border-r-slate-500',
      amountClass: 'text-slate-800 dark:text-slate-100',
      sign: ''
    };
  })();
  return /*#__PURE__*/<SwipeToDeleteItem onDelete={confirmCb => onDelete && onDelete(tx, confirmCb)} onCardClick={() => onEdit && onEdit(tx)}>{/*#__PURE__*/<div id={`tx-card-${tx.id}`} className={`${hasShadow ? 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-sm hover:shadow-md' : 'bg-[#F8FAFC] dark:bg-slate-700/40 border-slate-100/90 dark:border-slate-700/50 hover:bg-slate-100/80 dark:hover:bg-slate-700/70'} rounded-2xl border border-r-[3.5px] ${txVisualConfig.borderAccent} pl-3 sm:pl-5 pr-2.5 sm:pr-3.5 py-2.5 sm:py-3 transition-all cursor-pointer flex items-center justify-between gap-2 sm:gap-3 min-h-[72px] h-auto relative overflow-visible`}>{/*#__PURE__*/<TxBorderFocusOverlay tx={tx} isHighlighted={isHighlighted} />}{/*#__PURE__*/<div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">{/*#__PURE__*/<div className="relative shrink-0">{/*#__PURE__*/<div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base ${txVisualConfig.iconBg} flex items-center justify-center shadow-xs select-none`}>{txVisualConfig.isLoan && instNum ? /*#__PURE__*/<span className="font-extrabold font-mono tracking-tight text-indigo-700 dark:text-indigo-300">{toAppDigits(instNum)}</span> : /*#__PURE__*/<Icon name={txVisualConfig.iconName} className="w-5 h-5 sm:w-5.5 sm:h-5.5" />}</div>}{/*#__PURE__*/<div className={`absolute -top-1 -right-1 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full ${txVisualConfig.microBadgeClass} border-2 border-white dark:border-slate-800 flex items-center justify-center shadow-xs pointer-events-none`}>{/*#__PURE__*/<Icon name={txVisualConfig.microBadgeIcon} className="w-2.5 h-2.5 stroke-[3]" />}</div>}</div>}{/*#__PURE__*/<div className="min-w-0 flex-1 text-right flex flex-col gap-0.5">{/*#__PURE__*/<h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white leading-snug truncate">{line1}</h3>}{line2 && /*#__PURE__*/<div className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 truncate leading-snug">{line2}</div>}{/*#__PURE__*/<p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-400 truncate leading-relaxed mt-0.5">{line3}</p>}</div>}</div>}{/*#__PURE__*/<div className="text-center shrink-0 flex flex-col items-center justify-center min-w-[70px] sm:min-w-[90px] pl-0 sm:pl-1">{/*#__PURE__*/<div className={`font-black text-sm sm:text-[15px] leading-tight text-center ${txVisualConfig.amountClass} dir-ltr font-mono font-numeric`}>{txVisualConfig.sign && /*#__PURE__*/<span className="ml-0.5 text-xs">{txVisualConfig.sign}</span>}{formatAppNumber(Math.abs(tx.amount))}</div>}{/*#__PURE__*/<div className={`text-[10px] sm:text-xs font-semibold text-center w-full mt-0.5 ${txVisualConfig.amountClass}`}>تومان</div>}{(() => {
          const rawDate = tx.dateStr || tx.date || tx.receiveDate || tx.startDate || tx.createdAt || '';
          const numericDate = formatDateToNumericJalali(rawDate);
          if (!numericDate || numericDate === '-') return null;
          return /*#__PURE__*/<div className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 font-mono mt-0.5 text-center whitespace-nowrap">{numericDate}</div>;
        })()}</div>}</div>}</SwipeToDeleteItem>;
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
        const targetInput = cardRef.current.querySelector('input[autofocus]') || cardRef.current.querySelector('input:not([type="hidden"]):not([type="file"]):not([type="radio"]):not([type="checkbox"]):not([readonly]), textarea:not([readonly])');
        if (targetInput) {
          try {
            targetInput.focus({
              preventScroll: false
            });
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
  if (isReturningPrevCard || isExitingNextCard || depth === 0) depthAttr = '0';else if (depth === 1) depthAttr = '1';else if (depth === 2) depthAttr = '2';
  const isExitNext = isExitingNextCard;
  const isEnterPrev = isReturningPrevCard;
  const isFirstCard = currentCardIdx === 0;
  return /*#__PURE__*/<div ref={cardRef} key={card.id} data-depth={depthAttr} className={`stack-card bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  flex flex-col justify-between ${depth !== 0 && !isReturningPrevCard && !isExitingNextCard ? 'pointer-events-none select-none' : ''} ${isShaking ? 'animate-shake' : ''} ${isExitNext ? 'animating-next' : ''} ${isEnterPrev ? 'animating-prev' : ''}`}>{/*#__PURE__*/<div className="flex-1 py-2 overflow-y-auto overflow-x-hidden overscroll-x-none hide-scrollbar touch-pan-y" onClick={e => {
      if (e.target.closest('input, textarea, select, button, label, a')) return;
      if (cardRef.current) {
        const targetInput = cardRef.current.querySelector('input:not([type="hidden"]):not([type="file"]):not([type="radio"]):not([type="checkbox"]):not([readonly]), textarea:not([readonly])');
        if (targetInput && e.target !== targetInput) {
          try {
            targetInput.focus();
          } catch (err) {}
        }
      }
    }}>{card.render()}</div>}{/*#__PURE__*/<div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center space-x-2 space-x-reverse h-12">{/*#__PURE__*/<button type="button" onClick={!isFirstCard ? handlePrevCard : undefined} disabled={isFirstCard} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1 space-x-reverse ${isFirstCard ? 'bg-slate-100 dark:bg-slate-800/60 text-slate-300 dark:text-slate-600 border border-slate-200/50 dark:border-slate-700/50 cursor-not-allowed opacity-40 pointer-events-none' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 cursor-pointer opacity-100 active:scale-95 shadow-2xs'}`}>{/*#__PURE__*/<Icon name="arrow-right" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>مرحله قبلی</span>}</button>}{/*#__PURE__*/<button type="button" onClick={handleNextCard} className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1 space-x-reverse">{/*#__PURE__*/<span>{index === totalCards - 1 ? 'ثبت و ذخیره نهایی' : 'مرحله بعدی'}</span>}</button>}</div>}</div>;
}
function ContactAvatar({
  contact,
  id,
  name,
  avatar,
  className = "w-10 h-10 text-xs sm:text-sm",
  iconClassName = "w-5 h-5"
}) {
  const contactAvatar = avatar || contact && contact.avatar;
  const contactId = id || contact && contact.id || 0;
  const contactName = name || (contact ? `${contact.firstName || ''} ${contact.lastName || ''}` : '');
  const bgClass = getAvatarColor(contactId, contactName);
  if (contactAvatar) {
    return /*#__PURE__*/<div className={`rounded-full flex-shrink-0 overflow-hidden shadow-xs border border-white/10 ${className}`}>{/*#__PURE__*/<img src={contactAvatar} alt={contactName} className="w-full h-full object-cover" />}</div>;
  }
  return /*#__PURE__*/<div className={`rounded-full ${bgClass} flex-shrink-0 flex items-center justify-center text-white font-bold shadow-xs ${className}`}>{/*#__PURE__*/<Icon name="user" className={`${iconClassName} text-white/95`} />}</div>;
}
const LOAN_ICON_CATEGORIES = [{
  id: 'all',
  label: 'همه'
}, {
  id: 'finance',
  label: 'بانک و مالی'
}, {
  id: 'vehicles',
  label: 'خودرو و نقلیه'
}, {
  id: 'housing',
  label: 'مسکن و املاک'
}, {
  id: 'shopping',
  label: 'کالا و دیجیتال'
}, {
  id: 'work',
  label: 'کار و آموزش'
}, {
  id: 'family',
  label: 'خانواده و سلامت'
}, {
  id: 'general',
  label: 'عمومی و شخصی'
}];
const LOAN_ICONS_LIST = [
// Finance & Bank
{
  name: 'landmark',
  label: 'بانک و موسسه',
  category: 'finance',
  keywords: 'بانک موسسه مالی شعبه قرض الحسنه صندوق'
}, {
  name: 'banknote',
  label: 'اسکناس و پول',
  category: 'finance',
  keywords: 'اسکناس پول نقد تومان ریال سرمایه'
}, {
  name: 'credit-card',
  label: 'کارت بانکی',
  category: 'finance',
  keywords: 'کارت عابربانک حساب بانکی واریز'
}, {
  name: 'wallet',
  label: 'کیف پول',
  category: 'finance',
  keywords: 'کیف پول جیب پس انداز موجودی'
}, {
  name: 'coins',
  label: 'سکه‌ها و طلا',
  category: 'finance',
  keywords: 'سکه طلا نقره ارز سرمایه گذاری'
}, {
  name: 'piggy-bank',
  label: 'قلک پس‌انداز',
  category: 'finance',
  keywords: 'قلک پس انداز اندوخته ذخیره'
}, {
  name: 'scale',
  label: 'ترازوی حساب',
  category: 'finance',
  keywords: 'ترازو تعادل عدالت قسط حقوقی'
}, {
  name: 'receipt',
  label: 'فاکتور و رسید',
  category: 'finance',
  keywords: 'رسید فاکتور قبض پرداخت بدهی'
}, {
  name: 'badge-percent',
  label: 'سود و کارمزد',
  category: 'finance',
  keywords: 'درصد سود کارمزد بهره تخفیف'
}, {
  name: 'circle-dollar-sign',
  label: 'ارز و دلار',
  category: 'finance',
  keywords: 'دلار ارز یورو تومان مالی'
}, {
  name: 'calculator',
  label: 'ماشین حساب',
  category: 'finance',
  keywords: 'حسابداری ماشین حساب محاسبات قسط'
}, {
  name: 'vault',
  label: 'گاوصندوق',
  category: 'finance',
  keywords: 'گاوصندوق امن صندوق امانات طلا'
}, {
  name: 'gem',
  label: 'طلا و جواهرات',
  category: 'finance',
  keywords: 'الماس جواهر طلا نگین ارزشمند'
},
// Vehicles
{
  name: 'car',
  label: 'خودرو سواری',
  category: 'vehicles',
  keywords: 'ماشین خودرو سواری پژو پراید ایرانخودرو سایپا'
}, {
  name: 'truck',
  label: 'کامیون و باربری',
  category: 'vehicles',
  keywords: 'کامیون وانت بار تریلی خاور حمل'
}, {
  name: 'bus',
  label: 'اتوبوس و سرویس',
  category: 'vehicles',
  keywords: 'اتوبوس مینی بوس ون سرویس مسافرتی'
}, {
  name: 'bike',
  label: 'موتور و دوچرخه',
  category: 'vehicles',
  keywords: 'موتور سیکلت دوچرخه موتور اسکوتر'
}, {
  name: 'plane',
  label: 'هواپیما و پرواز',
  category: 'vehicles',
  keywords: 'هواپیما پرواز سفر گردشگری بلیط'
}, {
  name: 'ship',
  label: 'کشتی و قایق',
  category: 'vehicles',
  keywords: 'کشتی قایق لنج دریایی باربری'
}, {
  name: 'fuel',
  label: 'سوخت و بنزین',
  category: 'vehicles',
  keywords: 'بنزین گازوییل گاز پمپ سوخت خودرو'
}, {
  name: 'train',
  label: 'قطار و مترو',
  category: 'vehicles',
  keywords: 'قطار ریل مترو مسافرت حمل'
}, {
  name: 'gauge',
  label: 'کیلومتر و سرعت',
  category: 'vehicles',
  keywords: 'کیلومتر سرعت سنج فنی تعمیرات'
},
// Housing & Real Estate
{
  name: 'home',
  label: 'خانه و مسکن',
  category: 'housing',
  keywords: 'خانه منزل مسکن آپارتمان رهن اجاره خرید'
}, {
  name: 'building',
  label: 'ساختمان و برج',
  category: 'housing',
  keywords: 'ساختمان برج مجتمع سازمانی تجاری'
}, {
  name: 'building-2',
  label: 'مجتمع مسکونی',
  category: 'housing',
  keywords: 'مجتمع شهرک آپارتمان پروژه ساخت'
}, {
  name: 'warehouse',
  label: 'انبار و سوله',
  category: 'housing',
  keywords: 'انبار سوله کارگاه ذخیره سازی کارخانه'
}, {
  name: 'key',
  label: 'کلید ملک',
  category: 'housing',
  keywords: 'کلید خرید خانه رهن تحویل سند'
}, {
  name: 'hammer',
  label: 'ساخت و بازسازی',
  category: 'housing',
  keywords: 'چکش تعمیرات بازسازی ساخت نوسازی'
}, {
  name: 'wrench',
  label: 'ابزار و تاسیسات',
  category: 'housing',
  keywords: 'آچار تاسیسات لوله کشی ابزار فنی'
}, {
  name: 'trees',
  label: 'باغ و ویلا',
  category: 'housing',
  keywords: 'باغ ویلا زمین کشاورزی باغچه شمال'
}, {
  name: 'bed',
  label: 'سرویس خواب',
  category: 'housing',
  keywords: 'تخت خواب اتاق مبلمان جهیزیه'
}, {
  name: 'bath',
  label: 'تجهیزات منزل',
  category: 'housing',
  keywords: 'حمام سرویس شیرآلات دکوراسیون'
},
// Shopping & Tech
{
  name: 'shopping-bag',
  label: 'خرید و پوشاک',
  category: 'shopping',
  keywords: 'خرید لباس بازار فروشگاه کیسه'
}, {
  name: 'shopping-cart',
  label: 'سبد خرید',
  category: 'shopping',
  keywords: 'سبد خرید سوپرمارکت سفارش کالا'
}, {
  name: 'gift',
  label: 'هدیه و کادو',
  category: 'shopping',
  keywords: 'کادو هدیه جایزه عیدی سورپرایز'
}, {
  name: 'tag',
  label: 'تخفیف و کالا',
  category: 'shopping',
  keywords: 'اتیکت قیمت برچسب حراج جنس'
}, {
  name: 'smartphone',
  label: 'موبایل و گوشی',
  category: 'shopping',
  keywords: 'گوشی موبایل آیفون سامسونگ تبلت تلفن'
}, {
  name: 'laptop',
  label: 'لپ‌تاپ و رایانه',
  category: 'shopping',
  keywords: 'لپ تاپ کامپیوتر سیستم پی سی مک'
}, {
  name: 'tv',
  label: 'تلویزیون و صوتی',
  category: 'shopping',
  keywords: 'تلویزیون مانیتور سینما خانگی نمایشگر'
}, {
  name: 'camera',
  label: 'دوربین عکاسی',
  category: 'shopping',
  keywords: 'دوربین فیلمبرداری عکاسی لنز آتلیه'
}, {
  name: 'watch',
  label: 'ساعت هوشمند',
  category: 'shopping',
  keywords: 'ساعت مچی اکسسوری اپل واچ'
}, {
  name: 'shirt',
  label: 'پوشاک و لباس',
  category: 'shopping',
  keywords: 'لباس پیراهن پوشاک مد بوتیک'
}, {
  name: 'headphones',
  label: 'لوازم دیجیتال',
  category: 'shopping',
  keywords: 'هدفون هندزفری اسپیکر صوتی موسیقی'
}, {
  name: 'package',
  label: 'بسته و محموله',
  category: 'shopping',
  keywords: 'بسته جعبه کارتن پست بار کالا'
},
// Work & Education
{
  name: 'graduation-cap',
  label: 'تحصیل و دانشگاه',
  category: 'work',
  keywords: 'دانشگاه شهریه دانشجو درس کنکور مدرسه کلاه'
}, {
  name: 'book-open',
  label: 'کتاب و آموزش',
  category: 'work',
  keywords: 'کتاب دوره کلاس تدریس جزوه مطالعه'
}, {
  name: 'briefcase',
  label: 'کسب‌وکار و شغل',
  category: 'work',
  keywords: 'کیف کار شغل استخدام اداری بیزینس شرکت'
}, {
  name: 'award',
  label: 'پاداش و موفقیت',
  category: 'work',
  keywords: 'مدال جایزه رتبه برتر افتخار تقدیر'
}, {
  name: 'file-text',
  label: 'قرارداد و پرونده',
  category: 'work',
  keywords: 'قرارداد پرونده مدارک سند برگه چک'
}, {
  name: 'folder',
  label: 'پوشه اسناد',
  category: 'work',
  keywords: 'پوشه بایگانی اسناد مدارک بایگانی'
}, {
  name: 'printer',
  label: 'لوازم اداری',
  category: 'work',
  keywords: 'پرینتر چاپگر کپی دفتر کار لوازم'
},
// Family & Health
{
  name: 'heart-pulse',
  label: 'درمان و سلامت',
  category: 'family',
  keywords: 'قلب پزشکی درمان بیمارستان سلامتی دارو عمل جراحی'
}, {
  name: 'baby',
  label: 'فرزند و کودک',
  category: 'family',
  keywords: 'نوزاد بچه فرزند سیسمونی زایمان تولد'
}, {
  name: 'users',
  label: 'خانواده و فامیل',
  category: 'family',
  keywords: 'خانواده جمع دوستان فامیل دورهمی'
}, {
  name: 'user',
  label: 'شخصی و انفرادی',
  category: 'family',
  keywords: 'شخصی فرد مخاطب قرض شخصی فردی'
}, {
  name: 'shield-check',
  label: 'بیمه و ضمانت',
  category: 'family',
  keywords: 'بیمه ضمانت گارانتی امنیت سپر'
}, {
  name: 'activity',
  label: 'ورزش و سلامت',
  category: 'family',
  keywords: 'ورزش باشگاه سلامت فعالیت چکاپ'
},
// General & Lifestyle
{
  name: 'sparkles',
  label: 'ویژه و ستاره‌دار',
  category: 'general',
  keywords: 'درخشان ستاره شانس اکسترا خاص ویژه'
}, {
  name: 'sun',
  label: 'فصل و روشنایی',
  category: 'general',
  keywords: 'خورشید تابستان تعطیلات روشنایی روز'
}, {
  name: 'coffee',
  label: 'کافه و نوشیدنی',
  category: 'general',
  keywords: 'کافه قهوه چای خوراک رستوران مهمانی'
}, {
  name: 'utensils',
  label: 'رستوران و غذا',
  category: 'general',
  keywords: 'غذا قاشق چنگال ناهار شام ضیافت'
}, {
  name: 'plane-takeoff',
  label: 'سفر و گردشگری',
  category: 'general',
  keywords: 'مسافرت تفریح تور پرواز خارج'
}, {
  name: 'compass',
  label: 'هدف و مسیر',
  category: 'general',
  keywords: 'جهت یاب مسیر برنامه ریزی آینده'
}, {
  name: 'flame',
  label: 'اضطراری و فوری',
  category: 'general',
  keywords: 'فوری ضروری آتش اورژانسی داغ'
}, {
  name: 'trophy',
  label: 'جام و دستاورد',
  category: 'general',
  keywords: 'جام مسابقه پیروزی دستاورد برنده'
}, {
  name: 'star',
  label: 'ستاره طلایی',
  category: 'general',
  keywords: 'ستاره برگزیده مهم امتیاز عالی'
}, {
  name: 'heart',
  label: 'ازدواج و جهیزیه',
  category: 'general',
  keywords: 'ازدواج عروسی جهیزیه عشق همسر عقد'
}, {
  name: 'zap',
  label: 'برق و انرژی',
  category: 'general',
  keywords: 'انرژی رعد برق شتاب فوری سریع'
}, {
  name: 'crown',
  label: 'لوکس و طلایی',
  category: 'general',
  keywords: 'تاج پادشاهی لوکس وی آی پی درجه یک'
}];
function LoanIconPickerModal({
  isOpen,
  selectedIcon = 'landmark',
  onSelect = () => {},
  onClose = () => {}
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredIcons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return LOAN_ICONS_LIST.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchCategory) return false;
      if (!q) return true;
      return item.label.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q) || item.name.toLowerCase().includes(q);
    });
  }, [searchQuery, selectedCategory]);
  return /*#__PURE__*/<AnimatePresence>{isOpen && /*#__PURE__*/<motion.div key="loan-icon-picker-backdrop" variants={iosBackdropVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4" onClick={onClose}>{/*#__PURE__*/<motion.div key="loan-icon-picker-panel" variants={iosModalVariants} initial="initial" animate="animate" exit="exit" style={{
        transformOrigin: "center center"
      }} onClick={e => e.stopPropagation()} className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[28px] p-4 sm:p-5 space-y-3.5 border border-slate-100 dark:border-slate-800 shadow-2xl max-h-[85vh] flex flex-col">{/*#__PURE__*/<div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto shrink-0" />}{/*#__PURE__*/<div className="flex items-center justify-between shrink-0">{/*#__PURE__*/<div className="text-right">{/*#__PURE__*/<h3 className="font-extrabold text-slate-900 dark:text-white text-base">انتخاب آیکون وام</h3>}{/*#__PURE__*/<p className="text-xs text-slate-400 mt-0.5">یک آیکون متناسب با موضوع پرونده انتخاب کنید</p>}</div>}{/*#__PURE__*/<button type="button" onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center transition-colors">{/*#__PURE__*/<Icon name="x" className="w-4 h-4" />}</button>}</div>}{/*#__PURE__*/<div className="relative shrink-0">{/*#__PURE__*/<Icon name="search" className="w-4 h-4 absolute right-3 top-3 text-slate-400" />}{/*#__PURE__*/<input type="text" placeholder="  (:    )..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-[#F4F7FC] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pr-9 pl-8 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />}{searchQuery && /*#__PURE__*/<button type="button" onClick={() => setSearchQuery('')} className="absolute left-3 top-3 text-slate-400 hover:text-slate-600">{/*#__PURE__*/<Icon name="x" className="w-3.5 h-3.5" />}</button>}</div>}{/*#__PURE__*/<div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar shrink-0 text-xs">{LOAN_ICON_CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return /*#__PURE__*/<button key={cat.id} type="button" onClick={() => setSelectedCategory(cat.id)} className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${isActive ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{cat.label}</button>;
          })}</div>}{/*#__PURE__*/<div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar min-h-[220px] max-h-[320px] p-1">{filteredIcons.length > 0 ? /*#__PURE__*/<div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">{filteredIcons.map(item => {
              const isSelected = selectedIcon === item.name;
              return /*#__PURE__*/<button key={item.name} type="button" onClick={() => onSelect(item.name)} className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all cursor-pointer group active:scale-95 ${isSelected ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/30 text-indigo-600 dark:text-indigo-300 shadow-xs' : 'bg-[#F4F7FC]/70 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/40'}`}>{/*#__PURE__*/<div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mb-1.5 transition-transform group-hover:scale-110">{/*#__PURE__*/<Icon name={item.name} className="w-6 h-6" />}</div>}{/*#__PURE__*/<span className="text-[10px] font-bold truncate max-w-full text-center leading-tight">{item.label}</span>}</button>;
            })}</div> : /*#__PURE__*/<div className="text-center py-10 text-xs text-slate-400">آیکونی با این مشخصات یافت نشد</div>}</div>}</motion.div>}</motion.div>}</AnimatePresence>;
}
function ContactImageCropperModal({
  isOpen,
  imageSrc,
  onConfirm = () => {},
  onCancel = () => {}
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({
    x: 0,
    y: 0
  });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({
    x: 0,
    y: 0
  });
  const panStartRef = useRef({
    x: 0,
    y: 0
  });
  const imgRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPan({
        x: 0,
        y: 0
      });
      setRotation(0);
    }
  }, [isOpen, imageSrc]);
  const handleMouseDown = e => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY
    };
    panStartRef.current = {
      ...pan
    };
  };
  const handleMouseMove = e => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy
    });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleTouchStart = e => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
      panStartRef.current = {
        ...pan
      };
    }
  };
  const handleTouchMove = e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy
    });
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  const handleConfirmCrop = () => {
    if (!imgRef.current) return;
    const canvas = document.createElement('canvas');
    const size = 800; // High resolution 800x800 output
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Fill background with clean white if image doesn't cover area
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.save();

    // Preview viewport circular mask is 192px (w-48) centered inside 240px container
    // Output canvas size represents the 192px circular mask viewport
    const ratio = size / 192;

    // Move canvas origin to center of output canvas
    ctx.translate(size / 2, size / 2);

    // Apply panning in screen coordinates (before rotation and scaling)
    ctx.translate(pan.x * ratio, pan.y * ratio);

    // Apply rotation and zoom scale
    ctx.rotate(rotation * Math.PI / 180);
    ctx.scale(zoom, zoom);
    const img = imgRef.current;
    const naturalW = img.naturalWidth || 1;
    const naturalH = img.naturalHeight || 1;
    const aspect = naturalW / naturalH;

    // Base dimensions of the image inside 240px container at zoom=1
    let baseW = 240 * ratio;
    let baseH = 240 * ratio;
    if (aspect >= 1) {
      baseH = 240 / aspect * ratio;
    } else {
      baseW = 240 * aspect * ratio;
    }
    ctx.drawImage(img, -baseW / 2, -baseH / 2, baseW, baseH);
    ctx.restore();
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    onConfirm(dataUrl);
  };
  return /*#__PURE__*/<AnimatePresence>{isOpen && /*#__PURE__*/<motion.div key="contact-image-cropper-backdrop" variants={iosBackdropVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4" onClick={onCancel}>{/*#__PURE__*/<motion.div key="contact-image-cropper-panel" variants={iosModalVariants} initial="initial" animate="animate" exit="exit" style={{
        transformOrigin: "center center"
      }} onClick={e => e.stopPropagation()} className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-[28px] p-5 space-y-4 border border-slate-100 dark:border-slate-800 shadow-2xl text-center">{/*#__PURE__*/<div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto" />}{/*#__PURE__*/<div>{/*#__PURE__*/<h3 className="font-extrabold text-slate-900 dark:text-white text-base">تنظیم و برش تصویر مخاطب</h3>}{/*#__PURE__*/<p className="text-xs text-slate-400 mt-0.5">تصویر را حرکت داده و با اندازه دلخواه تنظیم کنید</p>}</div>}{/*#__PURE__*/<div className="relative w-60 h-60 mx-auto rounded-2xl bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing border border-slate-700 select-none shadow-inner" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>{imageSrc && /*#__PURE__*/<img ref={imgRef} src={imageSrc} alt="Crop target" draggable={false} style={{
            transform: `translate(${pan.x}px, ${pan.y}px) rotate(${rotation}deg) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }} className="w-full h-full object-contain pointer-events-none" />}{/*#__PURE__*/<div className="absolute inset-0 pointer-events-none flex items-center justify-center">{/*#__PURE__*/<div className="w-48 h-48 rounded-full border-2 border-white/80 border-dashed shadow-[0_0_0_9999px_rgba(15,23,42,0.65)] ring-1 ring-indigo-500/50" />}</div>}</div>}{/*#__PURE__*/<div className="space-y-2.5 pt-1">{/*#__PURE__*/<div className="flex items-center gap-3 px-2">{/*#__PURE__*/<button type="button" onClick={() => setZoom(z => Math.max(0.6, z - 0.15))} className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 active:scale-95 shrink-0" title="">{/*#__PURE__*/<Icon name="minus" className="w-4 h-4" />}</button>}{/*#__PURE__*/<input type="range" min="0.6" max="3.5" step="0.05" value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} className="flex-1 accent-indigo-600 cursor-pointer" />}{/*#__PURE__*/<button type="button" onClick={() => setZoom(z => Math.min(3.5, z + 0.15))} className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 active:scale-95 shrink-0" title="">{/*#__PURE__*/<Icon name="plus" className="w-4 h-4" />}</button>}</div>}{/*#__PURE__*/<div className="flex items-center justify-center gap-2">{/*#__PURE__*/<button type="button" onClick={() => setRotation(r => (r + 90) % 360)} className="py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all">{/*#__PURE__*/<Icon name="rotate-cw" className="w-3.5 h-3.5" />}{/*#__PURE__*/<span>چرخش ۹۰°</span>}</button>}{/*#__PURE__*/<button type="button" onClick={() => {
              setZoom(1);
              setPan({
                x: 0,
                y: 0
              });
              setRotation(0);
            }} className="py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all">{/*#__PURE__*/<Icon name="rotate-ccw" className="w-3.5 h-3.5" />}{/*#__PURE__*/<span>تنظیم مجدد</span>}</button>}</div>}</div>}{/*#__PURE__*/<div className="flex items-center gap-2 pt-2">{/*#__PURE__*/<button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all active:scale-95">انصراف</button>}{/*#__PURE__*/<button type="button" onClick={handleConfirmCrop} className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5">{/*#__PURE__*/<Icon name="check" className="w-4 h-4" />}{/*#__PURE__*/<span>تایید و ذخیره تصویر</span>}</button>}</div>}</motion.div>}</motion.div>}</AnimatePresence>;
}
function LoanIconSelectorModal({
  isOpen,
  onClose,
  onSelect,
  selectedIcon
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const loanIconCategories = [
    { id: 'all', label: 'همه آیکون‌ها' },
    { id: 'finance', label: 'بانک و مالی' },
    { id: 'vehicles', label: 'خودرو و نقلیه' },
    { id: 'housing', label: 'مسکن و ملک' },
    { id: 'shopping', label: 'خرید و کالا' },
    { id: 'work', label: 'کار و آموزش' },
    { id: 'family', label: 'سلامت و فردی' },
    { id: 'general', label: 'عمومی و ویژه' }
  ];

  const loanIconsCatalog = [
    // Finance & Banking
    { name: 'landmark', label: 'بانک و شعبه', category: 'finance', keywords: 'بانک شعبه موسسه قرض الحسنه صندوق' },
    { name: 'banknote', label: 'اسکناس و پول', category: 'finance', keywords: 'اسکناس پول نقد تومان ریال سرمایه' },
    { name: 'credit-card', label: 'کارت بانکی', category: 'finance', keywords: 'کارت عابربانک حساب بانکی واریز' },
    { name: 'wallet', label: 'کیف پول', category: 'finance', keywords: 'کیف پول جیب پس انداز موجودی' },
    { name: 'coins', label: 'سکه‌ها و طلا', category: 'finance', keywords: 'سکه طلا نقره ارز سرمایه گذاری' },
    { name: 'piggy-bank', label: 'قلک پس‌انداز', category: 'finance', keywords: 'قلک پس انداز اندوخته ذخیره' },
    { name: 'scale', label: 'ترازوی حساب', category: 'finance', keywords: 'ترازو تعادل عدالت قسط حقوقی' },
    { name: 'receipt', label: 'فاکتور و رسید', category: 'finance', keywords: 'رسید فاکتور قبض پرداخت بدهی' },
    { name: 'badge-percent', label: 'سود و کارمزد', category: 'finance', keywords: 'درصد سود کارمزد بهره تخفیف' },
    { name: 'circle-dollar-sign', label: 'ارز و دلار', category: 'finance', keywords: 'دلار ارز یورو تومان مالی' },
    { name: 'calculator', label: 'ماشین‌حساب', category: 'finance', keywords: 'حسابداری ماشین حساب محاسبات قسط' },
    { name: 'vault', label: 'گاوصندوق', category: 'finance', keywords: 'گاوصندوق امن صندوق امانات طلا' },
    { name: 'gem', label: 'طلا و جواهرات', category: 'finance', keywords: 'طلا الماس جواهر نقره دارایی' },
    { name: 'hand-coins', label: 'وام و کمک‌هزینه', category: 'finance', keywords: 'وام کمک هزینه دستی قرض نقدینگی' },
    { name: 'chart-candlestick', label: 'بورس و سرمایه', category: 'finance', keywords: 'بورس ترید سهام نمودار سرمایه' },
    { name: 'percent', label: 'نرخ سود و بهره', category: 'finance', keywords: 'درصد سود اقساطی کارمزد بهره' },

    // Vehicles & Transport
    { name: 'car', label: 'خودرو سواری', category: 'vehicles', keywords: 'خودرو ماشین اتومبیل سواری پراید پژو دنا' },
    { name: 'truck', label: 'کامیون و باربری', category: 'vehicles', keywords: 'کامیون تریلی وانت خاور باربری سنگین' },
    { name: 'bus', label: 'اتوبوس و سرویس', category: 'vehicles', keywords: 'اتوبوس مینی بوس ون سرویس مسافرتی' },
    { name: 'bike', label: 'موتور و دوچرخه', category: 'vehicles', keywords: 'موتور سیکلت دوچرخه اسکوتر هوندا' },
    { name: 'plane', label: 'هواپیما و پرواز', category: 'vehicles', keywords: 'هواپیما پرواز سفر مسافرت بلیط هوایی' },
    { name: 'ship', label: 'کشتی و قایق', category: 'vehicles', keywords: 'کشتی قایق لنج دریایی باربری لنج' },
    { name: 'fuel', label: 'سوخت و بنزین', category: 'vehicles', keywords: 'بنزین گازوییل گاز پمپ سوخت خودرو باک' },
    { name: 'train', label: 'قطار و مترو', category: 'vehicles', keywords: 'قطار ریل مترو مسافرت حمل راه آهن' },
    { name: 'gauge', label: 'کیلومتر و سرعت', category: 'vehicles', keywords: 'کیلومتر سرعت سنج فنی تعمیرات شتاب' },
    { name: 'wrench', label: 'تعمیرات خودرو', category: 'vehicles', keywords: 'تعمیرگاه آچار مکانیکی سرویس دوره ای' },
    { name: 'car-taxi-front', label: 'تاکسی و کرایه', category: 'vehicles', keywords: 'تاکسی آژانس اسنپ تپسی کرایه خودرو' },
    { name: 'anchor', label: 'دریانوردی و لنج', category: 'vehicles', keywords: 'لنگر دریا شیلات صیادی قایق' },

    // Housing & Real Estate
    { name: 'home', label: 'خانه و مسکن', category: 'housing', keywords: 'خانه منزل مسکن آپارتمان رهن اجاره خرید' },
    { name: 'building', label: 'ساختمان و برج', category: 'housing', keywords: 'ساختمان برج مجتمع سازمانی تجاری' },
    { name: 'building-2', label: 'مجتمع مسکونی', category: 'housing', keywords: 'مجتمع شهرک آپارتمان پروژه ساخت بلوک' },
    { name: 'warehouse', label: 'انبار و سوله', category: 'housing', keywords: 'انبار سوله کارگاه ذخیره سازی کارخانه' },
    { name: 'key', label: 'کلید و سند ملک', category: 'housing', keywords: 'کلید خرید خانه رهن تحویل سند مالکیت' },
    { name: 'hammer', label: 'ساخت و بازسازی', category: 'housing', keywords: 'چکش تعمیرات بازسازی ساخت نوسازی بنایی' },
    { name: 'trees', label: 'باغ و ویلا', category: 'housing', keywords: 'باغ ویلا زمین کشاورزی باغچه شمال مزرعه' },
    { name: 'bed', label: 'سرویس خواب', category: 'housing', keywords: 'تخت خواب اتاق مبلمان جهیزیه دکوراسیون' },
    { name: 'bath', label: 'تجهیزات و تاسیسات', category: 'housing', keywords: 'حمام سرویس شیرآلات دکوراسیون پکیج' },
    { name: 'hotel', label: 'هتل و اقامتگاه', category: 'housing', keywords: 'هتل سوئیت اقامتگاه ویلا بومگردی' },
    { name: 'castle', label: 'عمارت و باغ', category: 'housing', keywords: 'عمارت کاخ قصر باغ ویلا لوکس' },
    { name: 'fence', label: 'حصار و محوطه', category: 'housing', keywords: 'حصار نرده محوطه زمین فنس حصارکشی' },

    // Shopping & Tech
    { name: 'shopping-bag', label: 'خرید و پوشاک', category: 'shopping', keywords: 'خرید لباس بازار فروشگاه کیسه مد' },
    { name: 'shopping-cart', label: 'سبد خرید', category: 'shopping', keywords: 'سبد خرید سوپرمارکت سفارش کالا آنلاین' },
    { name: 'gift', label: 'هدیه و کادو', category: 'shopping', keywords: 'کادو هدیه جایزه عیدی سورپرایز جشن' },
    { name: 'tag', label: 'تخفیف و کالا', category: 'shopping', keywords: 'اتیکت قیمت برچسب حراج جنس مارک' },
    { name: 'smartphone', label: 'موبایل و گوشی', category: 'shopping', keywords: 'گوشی موبایل آیفون سامسونگ تبلت تلفن' },
    { name: 'laptop', label: 'لپ‌تاپ و کامپیوتر', category: 'shopping', keywords: 'لپ تاپ کامپیوتر سیستم پی سی مک رایانه' },
    { name: 'tv', label: 'تلویزیون و صوتی', category: 'shopping', keywords: 'تلویزیون مانیتور سینما خانگی نمایشگر ال ای دی' },
    { name: 'camera', label: 'دوربین عکاسی', category: 'shopping', keywords: 'دوربین فیلمبرداری عکاسی لنز آتلیه کانن' },
    { name: 'watch', label: 'ساعت هوشمند', category: 'shopping', keywords: 'ساعت مچی اکسسوری اپل واچ گارمین' },
    { name: 'shirt', label: 'پوشاک و لباس', category: 'shopping', keywords: 'لباس پیراهن پوشاک مد بوتیک کت شلوار' },
    { name: 'headphones', label: 'لوازم دیجیتال', category: 'shopping', keywords: 'هدفون هندزفری اسپیکر صوتی موسیقی ایرپاد' },
    { name: 'package', label: 'بسته و محموله', category: 'shopping', keywords: 'بسته جعبه کارتن پست بار کالا ارسال' },
    { name: 'monitor', label: 'نمایشگر و مانیتور', category: 'shopping', keywords: 'مانیتور ال سی دی صفحه نمایش سیستم گیمینگ' },
    { name: 'tablet', label: 'تببلت و آیپد', category: 'shopping', keywords: 'تبلت آیپد قلم دیوایس هوشمند قلم نوری' },
    { name: 'speaker', label: 'اسپیکر و سیستم صوتی', category: 'shopping', keywords: 'اسپیکر باند صوتی ضبط صدا سیستم' },
    { name: 'radio', label: 'رادیو و تجهیزات', category: 'shopping', keywords: 'رادیو بیسیم مخابرات امواج فرستنده' },

    // Work & Education
    { name: 'graduation-cap', label: 'تحصیل و دانشگاه', category: 'work', keywords: 'دانشگاه شهریه دانشجو درس کنکور مدرسه کلاه' },
    { name: 'book-open', label: 'کتاب و آموزش', category: 'work', keywords: 'کتاب دوره کلاس تدریس جزوه مطالعه دانش' },
    { name: 'book', label: 'کتاب و پژوهش', category: 'work', keywords: 'کتاب منبع کتابخانه پژوهش پایان نامه مقاله' },
    { name: 'briefcase', label: 'کسب‌وکار و شغل', category: 'work', keywords: 'کیف کار شغل استخدام اداری بیزینس شرکت قرارداد' },
    { name: 'award', label: 'پاداش و موفقیت', category: 'work', keywords: 'مدال جایزه رتبه برتر افتخار تقدیر لوح' },
    { name: 'file-text', label: 'قرارداد و پرونده', category: 'work', keywords: 'قرارداد پرونده مدارک سند برگه چک قولنامه' },
    { name: 'folder', label: 'پوشه اسناد', category: 'work', keywords: 'پوشه بایگانی اسناد مدارک زونکن پوشه' },
    { name: 'printer', label: 'لوازم اداری', category: 'work', keywords: 'پرینتر چاپگر کپی دفتر کار لوازم تحریر اسکنر' },
    { name: 'pencil', label: 'نوشت‌افزار و طراحی', category: 'work', keywords: 'مداد خودکار اتود لوازم التحریر نقشه کشی' },
    { name: 'newspaper', label: 'مطبوعات و رسانه', category: 'work', keywords: 'روزنامه مجله خبر نشر انتشارات چاپ' },
    { name: 'presentation', label: 'جلسه و پرزنتیشن', category: 'work', keywords: 'پرزنت کنفرانس ویدیو پروژکتور جلسه سمینار' },
    { name: 'hard-hat', label: 'عمران و مهندسی', category: 'work', keywords: 'کلاه ایمنی مهندسی عمران ساختمان کارگاه پیمانکار' },

    // Family & Health
    { name: 'heart-pulse', label: 'درمان و بیمارستان', category: 'family', keywords: 'قلب پزشکی درمان بیمارستان سلامتی دارو عمل جراحی کلینیک' },
    { name: 'baby', label: 'فرزند و کودک', category: 'family', keywords: 'نوزاد بچه فرزند سیسمونی زایمان تولد اسباب بازی' },
    { name: 'users', label: 'خانواده و فامیل', category: 'family', keywords: 'خانواده جمع دوستان فامیل دورهمی والدین' },
    { name: 'user', label: 'شخصی و انفرادی', category: 'family', keywords: 'شخصی فرد مخاطب قرض شخصی فردی خود' },
    { name: 'shield-check', label: 'بیمه و ضمانت', category: 'family', keywords: 'بیمه ضمانت گارانتی امنیت سپر تامین اجتماعی' },
    { name: 'activity', label: 'ورزش و سلامت', category: 'family', keywords: 'ورزش باشگاه سلامت فعالیت چکاپ تناسب اندام' },
    { name: 'pill', label: 'دارو و درمان', category: 'family', keywords: 'قرص کپسول داروخانه نسخه درمانی ویتامین' },
    { name: 'stethoscope', label: 'پزشکی و معاینه', category: 'family', keywords: 'گوشی پزشکی دکتر ویزیت متخصص درمانگاه' },
    { name: 'heart-handshake', label: 'همیاری و خیریه', category: 'family', keywords: 'همدلی خیریه کمک دستی قرض الحسنه دست خیر' },
    { name: 'dumbbell', label: 'باشگاه و تندرستی', category: 'family', keywords: 'دمبل پرورش اندام بدنسازی تمرین فیتنس' },

    // General & Lifestyle
    { name: 'sparkles', label: 'ویژه و ستاره‌دار', category: 'general', keywords: 'درخشان ستاره شانس اکسترا خاص ویژه تاپ' },
    { name: 'sun', label: 'فصل و روشنایی', category: 'general', keywords: 'خورشید تابستان تعطیلات روشنایی روز انرژی خورشیدی' },
    { name: 'coffee', label: 'کافه و نوشیدنی', category: 'general', keywords: 'کافه قهوه چای خوراک رستوران مهمانی اسپرسو' },
    { name: 'utensils', label: 'رستوران و غذا', category: 'general', keywords: 'غذا قاشق چنگال ناهار شام ضیافت کترینگ' },
    { name: 'plane-takeoff', label: 'سفر و توریسم', category: 'general', keywords: 'مسافرت تفریح تور پرواز خارج زیارت گردشگری' },
    { name: 'compass', label: 'هدف و برنامه‌ریزی', category: 'general', keywords: 'جهت یاب مسیر برنامه ریزی آینده قطب نما' },
    { name: 'flame', label: 'فوری و اضطراری', category: 'general', keywords: 'فوری ضروری آتش اورژانسی داغ بحران' },
    { name: 'trophy', label: 'جام و دستاورد', category: 'general', keywords: 'جام مسابقه پیروزی دستاورد برنده قهرمانی' },
    { name: 'star', label: 'ستاره طلایی', category: 'general', keywords: 'ستاره برگزیده مهم امتیاز عالی برتر' },
    { name: 'heart', label: 'ازدواج و جهیزیه', category: 'general', keywords: 'ازدواج عروسی جهیزیه عشق همسر عقد نامزدی' },
    { name: 'zap', label: 'شتاب و انرژی', category: 'general', keywords: 'انرژی رعد برق شتاب فوری سریع برق' },
    { name: 'crown', label: 'لوکس و VIP', category: 'general', keywords: 'تاج پادشاهی لوکس وی آی پی درجه یک خاص' },
    { name: 'music', label: 'موسیقی و هنر', category: 'general', keywords: 'آهنگ ساز گیتار پیانو کنسرت نواختن هنر' },
    { name: 'video', label: 'فیلم و سینما', category: 'general', keywords: 'سینما فیلم ویدیو تدوین استودیو تولید محتوا' },
    { name: 'palette', label: 'طراحی و نقاشی', category: 'general', keywords: 'نقاشی رنگ آمیزی گرافیک پالت هنر دکور' },
    { name: 'umbrella', label: 'پشتیبانی و بیمه', category: 'general', keywords: 'چتر حامی مراقبت روز مبادا پوشش حفاظتی' }
  ];

  const filteredIcons = loanIconsCatalog.filter(iconItem => {
    const matchesCategory = activeCategory === 'all' || iconItem.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || iconItem.label.toLowerCase().includes(query) || (iconItem.keywords && iconItem.keywords.toLowerCase().includes(query)) || iconItem.name.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="loan-icon-selector-backdrop"
          variants={iosBackdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            key="loan-icon-selector-panel"
            variants={iosModalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={e => e.stopPropagation()}
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[28px] p-4 sm:p-5 space-y-3.5 border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col max-h-[85vh]"
            dir="rtl"
          >
            <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto shrink-0" />
            
            <div className="text-center shrink-0">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">انتخاب نماد و موضوع وام</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">آیکون متناسب با هدف وام خود را انتخاب فرمایید</p>
            </div>

            <div className="relative shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="جستجوی موضوع وام (مثال: خودرو، مسکن، ازدواج، لپ‌تاپ...)"
                className="w-full py-2.5 pr-9 pl-8 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Icon name="search" className="w-4 h-4" />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                >
                  <Icon name="x" className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar shrink-0">
              {loanIconCategories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${activeCategory === cat.id ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20' : 'bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 overflow-y-auto p-1 max-h-60 sm:max-h-72 min-h-[160px] hide-scrollbar border border-slate-100 dark:border-slate-800/60 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40">
              {filteredIcons.length > 0 ? (
                filteredIcons.map(iconItem => {
                  const isSelected = selectedIcon === iconItem.name;
                  return (
                    <button
                      key={iconItem.name}
                      type="button"
                      onClick={() => {
                        onSelect(iconItem.name);
                        onClose();
                      }}
                      title={iconItem.label}
                      className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all aspect-square relative group ${isSelected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-102 ring-2 ring-indigo-500/50' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/60 hover:scale-105'}`}
                    >
                      <Icon name={iconItem.name} className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                      <span className={`text-[10px] mt-1.5 text-center truncate max-w-full font-medium ${isSelected ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                        {iconItem.label}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="col-span-full py-8 text-center text-slate-400 text-xs">
                  <p>هیچ آیکونی با این عنوان یافت نشد</p>
                </div>
              )}
            </div>

            <div className="pt-1 shrink-0 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {filteredIcons.length} آیکون موجود
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all active:scale-95"
              >
                انصراف
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
function ContactSelectorCard({
  contacts = [],
  selectedContactId,
  onSelect = () => {},
  wizardType,
  wizardMode,
  error
}) {
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
  const filtered = filteredContacts.filter(c => `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchQ) || c.phone && c.phone.includes(searchQ));
  if (selectedC && !isExpanded) {
    return /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-600 dark:text-slate-300 font-bold">مخاطب انتخاب‌شده:</label>}{/*#__PURE__*/<div className="bg-indigo-50/90 dark:bg-indigo-950/70 border-2 border-indigo-500 rounded-2xl p-3.5 flex items-center justify-between shadow-xs">{/*#__PURE__*/<div className="flex items-center space-x-3 space-x-reverse">{/*#__PURE__*/<ContactAvatar contact={selectedC} className="w-10 h-10" iconClassName="w-5 h-5" />}{/*#__PURE__*/<div>{/*#__PURE__*/<div className="text-xs font-bold text-indigo-950 dark:text-indigo-100">{selectedC.firstName} {selectedC.lastName}</div>}{/*#__PURE__*/<div className="text-[10px] text-indigo-600 dark:text-indigo-300 font-mono">{selectedC.phone ? toAppDigits(selectedC.phone) : 'بدون شماره تماس'}</div>}</div>}</div>}{/*#__PURE__*/<button type="button" onClick={() => setIsExpanded(true)} className="text-xs font-bold text-indigo-600 dark:text-indigo-300 bg-white dark:bg-indigo-900/80 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-700 shadow-2xs hover:bg-indigo-100 active:scale-95 transition-all">تغییر مخاطب</button>}</div>}</div>;
  }
  return /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-600 dark:text-slate-300 font-bold">مخاطب خود را انتخاب کنید:</label>}{/*#__PURE__*/<div className="relative">{/*#__PURE__*/<Icon name="search" className="w-4 h-4 absolute right-3 top-3 text-slate-400" />}{/*#__PURE__*/<input type="text" placeholder="  (   )..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className={`w-full bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl py-2.5 pr-9 pl-3 text-xs focus:outline-none focus:ring-2 ${error ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500'}`} />}</div>}{/*#__PURE__*/<div className={`max-h-52 overflow-y-auto overflow-x-hidden overscroll-x-none space-y-1.5 hide-scrollbar p-1 rounded-2xl border transition-all ${error ? 'border-rose-500/80 bg-rose-50/10 dark:bg-rose-950/10' : 'border-transparent'}`}>{filtered.length > 0 ? filtered.map(c => {
        const isSelected = Number(selectedContactId) === c.id;
        return /*#__PURE__*/<div key={c.id} onClick={() => {
          onSelect(c);
          setIsExpanded(false);
        }} className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${isSelected ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 dark:border-indigo-600 font-bold text-indigo-700 dark:text-indigo-300' : 'bg-[#F4F7FC] dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'}`}>{/*#__PURE__*/<div className="flex items-center space-x-2.5 space-x-reverse">{/*#__PURE__*/<ContactAvatar contact={c} className="w-8 h-8" iconClassName="w-4 h-4" />}{/*#__PURE__*/<div>{/*#__PURE__*/<div className="text-xs">{c.firstName} {c.lastName}</div>}{/*#__PURE__*/<div className="text-[10px] text-slate-400">{c.phone ? toAppDigits(c.phone) : ''}</div>}</div>}</div>}{isSelected && /*#__PURE__*/<Icon name="check-circle-2" className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}</div>;
      }) : /*#__PURE__*/<div className="text-center py-6 text-xs text-slate-400">مخاطبی جهت انتخاب یافت نشد.</div>}</div>}{error && /*#__PURE__*/<p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>{error}</span>}</p>}</div>;
}
function LoanSelectorCard({
  loans = [],
  transactions = [],
  contacts = [],
  selectedLoanId,
  editingTxId,
  wizardMode,
  onSelectLoan = () => {},
  error
}) {
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
    const total = l.totalRepayment > 0 ? l.totalRepayment : l.principalAmount;
    const remaining = total - paid;
    return remaining > 0;
  });
  const searchQ = searchQuery.toLowerCase();
  const filtered = activeLoans.filter(l => {
    const contact = contacts.find(c => c.id === l.contactId);
    const cName = contact ? `${contact.firstName} ${contact.lastName}` : l.contactName || '';
    return l.title.toLowerCase().includes(searchQ) || cName.toLowerCase().includes(searchQ);
  });
  const selectedLoanObj = loans.find(l => l.id === Number(selectedLoanId));
  const handleSelect = l => {
    onSelectLoan(l);
    setIsExpanded(false);
  };
  if (selectedLoanObj) {
    const repaymentTxs = transactions.filter(t => t.loanId === selectedLoanObj.id && t.type === 'repayment');
    const paidInstCount = repaymentTxs.length;
    const nextInstNum = paidInstCount + 1;
    const totalInst = selectedLoanObj.totalInstallments || (selectedLoanObj.installmentAmount > 0 ? Math.ceil(selectedLoanObj.totalRepayment / selectedLoanObj.installmentAmount) : 12);
    const contact = contacts.find(c => c.id === selectedLoanObj.contactId);
    const contactName = contact ? `${contact.firstName} ${contact.lastName}` : selectedLoanObj.contactName || 'بانک/سازمان';
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
    const nextDueDateFormatted = nextDueDate ? `${toAppDigits(nextDueDate.year)}/${toAppDigits(String(monthNum).padStart(2, '0'))}/${toAppDigits(String(nextDueDate.day).padStart(2, '0'))}` : '-';
    const instAmountFormatted = formatAppNumber(selectedLoanObj.installmentAmount || 0);
    const editingTx = editingTxId ? transactions.find(t => t.id === editingTxId) : null;
    const isEditingMode = wizardMode === 'edit' || !!editingTx;
    let displayInstNum = nextInstNum;
    let displayDateStr = nextDueDateFormatted;
    let displayAmount = instAmountFormatted;
    if (isEditingMode && editingTx) {
      displayInstNum = getInstallmentNumberForTx(editingTx, repaymentTxs);
      displayDateStr = formatDateToNumericJalali(editingTx.dateStr) || toAppDigits(editingTx.dateStr);
      displayAmount = formatAppNumber(editingTx.amount || 0);
    }
    return /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white rounded-2xl p-4 shadow-lg border border-indigo-500/30 space-y-3.5">{/*#__PURE__*/<div className="flex items-center justify-between">{/*#__PURE__*/<div className="space-y-1">{/*#__PURE__*/<div className="text-[11px] text-indigo-200 font-bold flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="landmark" className="w-4 h-4 text-indigo-300" />}{/*#__PURE__*/<span>{isEditingMode ? 'ویرایش قسط پرونده:' : 'پرونده وام انتخاب‌شده:'}</span>}</div>}{/*#__PURE__*/<div className="text-sm font-extrabold text-white">{selectedLoanObj.title}</div>}{/*#__PURE__*/<div className="text-xs text-indigo-100 font-medium">طرف حساب: {contactName}</div>}</div>}{/*#__PURE__*/<div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl px-4 py-3 shadow-inner text-white dir-rtl shrink-0 min-w-[100px]">{/*#__PURE__*/<span className="text-[10px] text-indigo-100 font-bold">{isEditingMode ? 'ویرایش قسط' : 'قسط شماره'}</span>}{/*#__PURE__*/<span className="text-3xl font-black tracking-tight leading-none my-1 text-white font-mono">{toAppDigits(displayInstNum)}</span>}{/*#__PURE__*/<span className="text-[11px] text-indigo-200 font-bold">از {toAppDigits(totalInst)}</span>}</div>}</div>}{/*#__PURE__*/<div className="pt-3 border-t border-indigo-400/30 space-y-2 dir-rtl">{/*#__PURE__*/<div className="flex items-center justify-between">{/*#__PURE__*/<span className="text-xs text-indigo-200 font-medium">{isEditingMode ? 'تاریخ ثبت‌شده این قسط:' : 'تاریخ پرداخت این قسط:'}</span>}{/*#__PURE__*/<span className="text-sm font-extrabold text-white bg-white/15 px-3 py-1 rounded-xl border border-white/20 font-mono tracking-wider whitespace-nowrap" dir="ltr">{displayDateStr}</span>}</div>}{/*#__PURE__*/<div className="flex items-center justify-between">{/*#__PURE__*/<span className="text-xs text-indigo-200 font-medium">مبلغ قسط:</span>}{/*#__PURE__*/<span className="text-base font-black text-amber-300 font-mono">{displayAmount} تومان</span>}</div>}</div>}</div>}{isExpanded ? /*#__PURE__*/<div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">{/*#__PURE__*/<div className="flex justify-between items-center">{/*#__PURE__*/<span className="text-xs font-bold text-slate-700 dark:text-slate-300">انتخاب وام دیگر:</span>}{/*#__PURE__*/<button type="button" onClick={() => setIsExpanded(false)} className="text-[11px] font-bold text-slate-500 hover:underline">بستن منو</button>}</div>}{/*#__PURE__*/<div className="relative">{/*#__PURE__*/<Icon name="search" className="w-4 h-4 absolute right-3 top-3 text-slate-400" />}{/*#__PURE__*/<input type="text" placeholder="    ..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pr-9 pl-3 text-xs focus:outline-none" />}</div>}{/*#__PURE__*/<div className="max-h-44 overflow-y-auto overflow-x-hidden overscroll-x-none space-y-1.5 hide-scrollbar p-1">{filtered.length > 0 ? filtered.map(l => /*#__PURE__*/<div key={l.id} onClick={() => handleSelect(l)} className="p-2.5 rounded-xl border bg-[#F4F7FC] dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 flex justify-between items-center cursor-pointer hover:border-indigo-400">{/*#__PURE__*/<div>{/*#__PURE__*/<div className="text-xs font-bold text-slate-900 dark:text-white">{l.title}</div>}{/*#__PURE__*/<div className="text-[10px] text-slate-400 font-mono">{l.installmentAmount ? formatAppNumber(l.installmentAmount) : 0} تومان در ماه</div>}</div>}{/*#__PURE__*/<Icon name="chevron-left" className="w-4 h-4 text-slate-400" />}</div>) : /*#__PURE__*/<div className="text-center py-4 text-xs text-slate-400">وام فعالی یافت نشد</div>}</div>}</div> : /*#__PURE__*/<button type="button" onClick={() => setIsExpanded(true)} className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 space-x-reverse">{/*#__PURE__*/<Icon name="repeat" className="w-3.5 h-3.5 text-indigo-600" />}{/*#__PURE__*/<span>تغییر وام انتخاب‌شده</span>}</button>}</div>;
  }
  return /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs font-bold text-slate-700 dark:text-slate-300">یک وام فعال جهت پرداخت قسط انتخاب کنید:</label>}{/*#__PURE__*/<div className="relative">{/*#__PURE__*/<Icon name="search" className="w-4 h-4 absolute right-3 top-3 text-slate-400" />}{/*#__PURE__*/<input type="text" placeholder="     ..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pr-9 pl-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />}</div>}{/*#__PURE__*/<div className={`max-h-52 overflow-y-auto overflow-x-hidden overscroll-x-none space-y-1.5 hide-scrollbar p-1 rounded-2xl border transition-all ${error ? 'border-rose-500/80 bg-rose-50/10 dark:bg-rose-950/10' : 'border-transparent'}`}>{filtered.length > 0 ? filtered.map(l => {
        const contact = contacts.find(c => c.id === l.contactId);
        const cName = contact ? `${contact.firstName} ${contact.lastName}` : l.contactName || 'بانک/سازمان';
        return /*#__PURE__*/<div key={l.id} onClick={() => handleSelect(l)} className="p-3 rounded-2xl border bg-[#F4F7FC] dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-all shadow-2xs">{/*#__PURE__*/<div className="flex items-center space-x-3 space-x-reverse">{/*#__PURE__*/<div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs">{/*#__PURE__*/<Icon name="landmark" className="w-4 h-4" />}</div>}{/*#__PURE__*/<div>{/*#__PURE__*/<div className="text-xs font-bold text-slate-900 dark:text-white">{l.title}</div>}{/*#__PURE__*/<div className="text-[10px] text-slate-400">{cName}</div>}</div>}</div>}{/*#__PURE__*/<div className="text-left ltr">{/*#__PURE__*/<div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">{l.installmentAmount ? formatAppNumber(l.installmentAmount) : '-'} تومان</div>}{/*#__PURE__*/<div className="text-[9px] text-slate-400">مبلغ قسط</div>}</div>}</div>;
      }) : /*#__PURE__*/<div className="text-center py-6 text-xs text-slate-400">هیچ وام فعالی جهت پرداخت قسط یافت نشد.</div>}</div>}{error && /*#__PURE__*/<p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>{error}</span>}</p>}</div>;
}

// Brand Avatar Component with Multi-Fallback Strategy
const BrandAvatar = ({
  className = "w-10 h-10",
  logoUrl
}) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = useMemo(() => {
    const list = [];
    if (logoUrl) {
      list.push(logoUrl);
      if (!logoUrl.startsWith('/')) list.push(`/${logoUrl}`);
      if (!logoUrl.startsWith('./')) list.push(`./${logoUrl}`);
    }
    list.push('./apple-touch-icon.png', '/apple-touch-icon.png', 'apple-touch-icon.png', './public/apple-touch-icon.png', '/public/apple-touch-icon.png', './favicon-96x96.png', '/favicon-96x96.png', 'favicon-96x96.png', './web-app-manifest-192x192.png', '/web-app-manifest-192x192.png', 'web-app-manifest-192x192.png', './icon-192x192.png', '/icon-192x192.png', 'icon-192x192.png');
    return [...new Set(list)];
  }, [logoUrl]);
  if (srcIndex >= sources.length) {
    return /*#__PURE__*/<div className={`rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-black flex items-center justify-center shadow-sm border border-indigo-400/30 shrink-0 ${className}`}>{/*#__PURE__*/<span className="text-sm font-black tracking-tight">AF</span>}</div>;
  }
  return /*#__PURE__*/<img src={sources[srcIndex]} onError={() => setSrcIndex(prev => prev + 1)} alt="Amir Finance" className={`rounded-2xl object-cover shadow-sm border border-slate-200/80 dark:border-slate-700 active:scale-95 transition-transform shrink-0 ${className}`} />;
};

// NavRippleButton Component with Smooth Ripple Effect
function NavRippleButton({
  id,
  onClick,
  isActive,
  iconName,
  label
}) {
  const [ripples, setRipples] = useState([]);
  const handlePointerDown = e => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const x = e.clientX ? e.clientX - rect.left - size / 2 : rect.width / 2 - size / 2;
    const y = e.clientY ? e.clientY - rect.top - size / 2 : rect.height / 2 - size / 2;
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size
    };
    setRipples(prev => [...prev.slice(-2), newRipple]);
  };
  const removeRipple = rippleId => {
    setRipples(prev => prev.filter(r => r.id !== rippleId));
  };
  return /*#__PURE__*/<button id={id} onPointerDown={handlePointerDown} onClick={onClick} className={`relative overflow-hidden flex flex-col items-center justify-center w-14 h-12 rounded-2xl transition-all duration-200 select-none cursor-pointer ${isActive ? 'text-indigo-600 dark:text-indigo-400 font-extrabold scale-105' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>{/*#__PURE__*/<AnimatePresence>{ripples.map(ripple => /*#__PURE__*/<motion.span key={ripple.id} initial={{
        scale: 0,
        opacity: 0.45
      }} animate={{
        scale: 2.5,
        opacity: 0
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.55,
        ease: [0.1, 0.8, 0.3, 1]
      }} onAnimationComplete={() => removeRipple(ripple.id)} className="absolute rounded-full bg-indigo-500/25 dark:bg-indigo-400/30 pointer-events-none" style={{
        top: ripple.y,
        left: ripple.x,
        width: ripple.size,
        height: ripple.size
      }} />)}</AnimatePresence>}{/*#__PURE__*/<Icon name={iconName} className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />}{/*#__PURE__*/<span className="text-[10px] mt-0.5 font-medium tracking-tight">{label}</span>}</button>;
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
  const navigateBack = targetTab => {
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
    initial: direction => ({
      x: direction === 'none' ? '0px' : direction === 'back' ? '-50px' : '50px',
      opacity: direction === 'none' ? 1 : 0
    }),
    animate: direction => ({
      x: '0px',
      opacity: 1,
      transition: direction === 'none' ? {
        duration: 0
      } : {
        duration: 0.32,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    exit: direction => ({
      x: direction === 'none' ? '0px' : direction === 'back' ? '50px' : '-50px',
      opacity: 0,
      transition: direction === 'none' ? {
        duration: 0
      } : {
        duration: 0.22,
        ease: [0.7, 0, 0.84, 0]
      }
    })
  };

  // Application Version Management State
  const defaultVersionData = {
    "appName": "Amir Finance",
    "appLogo": "apple-touch-icon.png",
    "installedVersion": "3.2.8",
    "buildNumber": 458,
    "releaseDate": "2026-08-22",
    "releaseChannel": "Stable",
    "channelLabel": "نسخه پایدار",
    "latestVersion": "3.2.8",
    "latestBuild": 458,
    "isUpdateAvailable": false,
    "history": [{"version": "3.2.8", "buildNumber": 458, "releaseDate": "2026-08-27", "releaseChannel": "Stable", "commitHash": "v328b458", "commitMessage": "feat: comprehensive contact photo & loan icon backup audit, enhanced loan icon catalog with 90+ categorized icons, and release v3.2.8", "changes": ["بررسی جامع و اعتبارسنجی ۱۰۰٪ جریان‌های پشتیبان‌گیری، بازیابی و حذف داده برای تصاویر مخاطبین و آیکون‌های وام", "توسعه اساسی پالت آیکون‌های وام به بیش از ۹۰ آیکون متنوع و تخصصی با دسته‌بندی موضوعی (بانکی، نقلیه، مسکن، خرید، کار، خانواده و عمومی)", "افزودن قابلیت جستجوی زنده در موضوعات و کلمات کلیدی آیکون‌های وام", "اصلاح و جایگزینی کامل آیکون خالی/سفید با آیکون‌های استاندارد Lucide", "بهبود هماهنگی نام‌گذاری ۳ خطی تراکنش‌ها و ارتقای یکپارچه به نسخه 3.2.8"]}, {
      "version": "3.2.3",
      "buildNumber": 380,
      "releaseDate": "2026-08-22",
      "releaseChannel": "Stable",
      "commitHash": "v323b380",
      "commitMessage": "feat: dual opposite moving light segments focus animation and release v3.2.3",
      "changes": ["انیمیشن فوکوس نوری دونقطه‌ای از مرکز بالای کارت در دو جهت ساعت‌گرد و پادساعت‌گرد با ملاقات در مرکز پایین و پالس ملایم نهایی", "تفکیک رنگ هوشمند انیمیشن فوکوس بر اساس نوع تراکنش (آبی برای وام و اقساط، قرمز برای بدهی، سبز برای طلب)", "حرکت نرم و رفتن کارت استیکی به جایگاه بالای صفحه قبل از ورود به حالت ویرایش و باز شدن کیبورد", "هم‌اندازه شدن دکمه‌های انصراف و ثبت تغییرات در ماژول کارت‌های استیکی مشابه کارت‌های استک", "ثبت دقیق و بلادرنگ حذف انواع تراکنش‌ها در نشانگر زنگوله و لیست تغییرات پشتیبان‌گیری", "استانداردسازی کی‌بورد عددی در تمامی فرم‌ها (مبالغ، اقساط، شماره کارت و شبا)", "انتشار رسمی نسخه 3.2.3"]
    }, {
      "version": "3.2.2",
      "buildNumber": 379,
      "releaseDate": "2026-08-22",
      "releaseChannel": "Stable",
      "commitHash": "v322b379",
      "commitMessage": "fix: universal numeric input keyboard modes, arabic digit parsing, and delete backup tracking in v3.2.2",
      "changes": ["ثبت دقیق و بلادرنگ حذف انواع تراکنش‌ها در نشانگر زنگوله و لیست تغییرات پشتیبان‌گیری", "استانداردسازی کی‌بورد عددی در تمامی فرم‌ها (مبالغ، اقساط، شماره کارت و شبا با inputmode عددی)", "تبدیل خودکار و بی‌درنگ ارقام فارسی و عربی به اعداد انگلیسی استاندارد در ورودی‌ها", "تشخیص و فرمت خودکار شماره کارت و شبا در افزودن و ویرایش مخاطبین", "انتشار رسمی نسخه 3.2.2"]
    }, {
      "version": "3.2.1",
      "buildNumber": 367,
      "releaseDate": "2026-08-22",
      "releaseChannel": "Stable",
      "commitHash": "v321b367",
      "commitMessage": "fix: resolve missing backup logs and bell indicator on dashboard transaction deletion and release v3.2.1",
      "changes": ["رفع کامل مشکل عدم ثبت لاگ در نشانگر زنگوله هنگام حذف تراکنش‌ها از صفحه داشبورد و بخش آخرین تراکنش‌ها", "پشتیبانی جامع و دقیق از حذف کلیه انواع تراکنش‌ها شامل اقساط، بازپرداخت‌ها، بدهی‌ها، طلب‌ها و تراکنش‌های عمومی", "به‌روزرسانی خودکار و بلادرنگ مانده وام‌ها و وضعیت مخاطبین پس از حذف تراکنش‌ها", "انتشار رسمی نسخه 3.2.1"]
    }, {
      "version": "3.2.0",
      "buildNumber": 363,
      "releaseDate": "2026-08-19",
      "releaseChannel": "Stable",
      "commitHash": "v320b363",
      "commitMessage": "feat: redesign dashboard header layout and update to version 3.2.0",
      "changes": ["بازطراحی مدرن و خلوت هدر داشبورد: چینش برند Amir Finance و نسخه در سمت چپ، خوش‌آمدگویی و تاریخ در سمت راست", "کاهش و بهینه‌سازی فاصله استاتوس بار با هدر صفحه داشبورد", "حذف آیکون زنگوله اعلان‌ها جهت ساده‌سازی و زیبایی بصری هدر", "تراز وسط تاریخ نسبت به متن خوش‌آمدگویی در سمت راست هدر", "ارتقا به نسخه 3.2.0"]
    }, {
      "version": "3.1.9",
      "buildNumber": 328,
      "releaseDate": "2026-08-15",
      "releaseChannel": "Stable",
      "commitHash": "v319stable",
      "commitMessage": "fix: universal viewport bottom gap fix and version synchronization",
      "changes": ["حل ریشه‌ای و کامل مشکل جای خالی پایین صفحه در تمام مرورگرها و دیوایس‌ها", "همگام‌سازی دقیق نسخه نصب‌شده با سرور و بارگذاری سریع بدون نیاز به کش قدیمی", "تراز دقیق نوار ناوبری پایین صفحه با لبه استاندارد دستگاه", "بهینه‌سازی نهایی کارکرد آفلاین PWA"]
    }, {
      "version": "3.1.8",
      "buildNumber": 321,
      "releaseDate": "2026-08-15",
      "releaseChannel": "Stable",
      "commitHash": "v318bottomfix",
      "commitMessage": "fix: fix bottom navigation bar floating gap in iOS PWA and mobile",
      "changes": ["تثبیت نوار ناوبری پایین صفحه چسبیده به لبه فیزیکی دستگاه (Fixed Bottom 0)", "حذف فاصله و فضای خالی زیر نوار ناوبری در حالت Standalone / PWA", "پوشش یکپارچه پس‌زمینه نوار پایین تا انتهای صفحه در زیر نوار هوم (Home Indicator)", "انتشار رسمی نسخه ۳.۱.۸"]
    }, {
      "version": "3.1.7",
      "buildNumber": 320,
      "releaseDate": "2026-08-15",
      "releaseChannel": "Stable",
      "commitHash": "v317safefix",
      "commitMessage": "fix: fix iOS PWA safe area insets and viewport scrolling alignment",
      "changes": ["حل مشکل جابجایی صفحه در حالت PWA و Standalone روی گوشی‌های همراه", "سازگاری دقیق با بریدگی ناچ (Notch) و جزیره پویا (Dynamic Island) در بالای صفحه با safe-area-inset-top", "اصلاح ارتفاع و فاصله ایمن نوار ناوبری پایین صفحه با safe-area-inset-bottom و نوار هوم آیفون", "قفل‌سازی موقعیت Viewport برای جلوگیری از بالا رفتن محتوا و ایجاد فضای خالی زیر برنامه", "انتشار رسمی نسخه ۳.۱.۷"]
    }, {
      "version": "3.1.6",
      "buildNumber": 319,
      "releaseDate": "2026-08-15",
      "releaseChannel": "Stable",
      "commitHash": "v316dashlogo",
      "commitMessage": "feat: release version 3.1.6 with resized favicon-96x96 logo in dashboard header",
      "changes": ["استفاده از فایل favicon-96x96.png به عنوان تصویر لوگوی بالای صفحه داشبورد", "افزایش ابعاد لوگوی داشبورد به میزان ۱.۵ برابر (۶۰ در ۶۰ پیکسل) با گوشه‌های گرد مدرن", "انتشار رسمی نسخه ۳.۱.۶"]
    }, {
      "version": "3.1.5",
      "buildNumber": 317,
      "releaseDate": "2026-08-15",
      "releaseChannel": "Stable",
      "commitHash": "v315logo",
      "commitMessage": "feat: release version 3.1.5 with enlarged settings brand logo and preview asset compatibility",
      "changes": ["افزایش اندازه تصویر و لوگوی بالای صفحه تنظیمات به حدود دو سوم ارتفاع باکس سربرگ برای نمایش هرچه زیباتر و برجسته‌تر", "بهبود رندرینگ و سازگاری کامل لود تصویر در محیط Preview و مرورگر وب", "انتشار رسمی نسخه ۳.۱.۵"]
    }, {
      "version": "3.1.4",
      "buildNumber": 316,
      "releaseDate": "2026-08-15",
      "releaseChannel": "Stable",
      "commitHash": "v314settings",
      "commitMessage": "feat: release version 3.1.4 with aligned settings header logo to right",
      "changes": ["انتقال تصویر و لوگوی بالای صفحه تنظیمات به سمت راست باکس و متون برای زیبایی و هماهنگی بیشتر با چیدمان راست‌چین", "انتشار رسمی نسخه ۳.۱.۴"]
    }, {
      "version": "3.1.3",
      "buildNumber": 315,
      "releaseDate": "2026-08-15",
      "releaseChannel": "Stable",
      "commitHash": "v313cascade",
      "commitMessage": "feat: release version 3.1.3 with perfected sticky cards stack cascade behavior",
      "changes": ["تنظیم دقیق رفتار اسکرول کارت آخر در حالت استیکی به طوری که هنگام اسکرول تا ابتدای کارت قبلی بالا بیاید و متوقف شود", "جلوگیری از بالاتر رفتن کارت آخر نسبت به چیدمان پله‌ای و یکپارچه‌سازی رفتار همه کارت‌های دسته", "محاسبه پویا و هوشمند فضای اسکرول کارت‌ها متناسب با ابعاد صفحه نمایش", "انتشار رسمی نسخه ۳.۱.۳"]
    }, {
      "version": "3.1.2",
      "buildNumber": 312,
      "releaseDate": "2026-08-15",
      "releaseChannel": "Stable",
      "commitHash": "v312cache",
      "commitMessage": "fix: force aggressive cache clear and service worker update for PWA to sync latest sticky UI changes",
      "changes": ["تغییر مکانیزم کش مرورگر در نسخه نصب‌شده (PWA) برای دریافت قطعی آخرین تغییرات و کدهای جدید", "به‌روزرسانی اجباری Service Worker و شکستن کش فایل index.html برای اعمال صد در صدی تغییرات ظاهری (استیکی شدن کارت آخر روی کارت ماقبل)", "همسان‌سازی کامل نسخه نصبی روی گوشی با نسخه Preview"]
    }, {
      "version": "3.1.1",
      "buildNumber": 311,
      "releaseDate": "2026-08-14",
      "releaseChannel": "Stable",
      "commitHash": "v311layout",
      "commitMessage": "feat: release version 3.1.1 with optimized top spacing and perfected sticky cards layering",
      "changes": ["حذف فاصله و فضای خالی اضافه در بالای کارت‌ها تا status bar و بالا کشیدن موقعیت کارت‌ها در ماژول‌های استیکی و استک", "جلوگیری از رفتن کارت‌ها زیر کیبورد در هنگام تایپ", "اصلاح اولویت لایه‌بندی (z-index) کارت‌های استیکی و قرارگیری صحیح کارت آخر روی کارت ماقبل در نسخه وب و موبایل", "انتشار رسمی نسخه ۳.۱.۱"]
    }, {
      "version": "3.1.0",
      "buildNumber": 310,
      "releaseDate": "2026-08-14",
      "releaseChannel": "Stable",
      "commitHash": "v310clean",
      "commitMessage": "feat: release version 3.1.0 with seamless sticky cards, edit buttons restoration, and clean overflow containment",
      "changes": ["رفع کامل بیرون‌زدگی محتوا و حذف نوشته و دکمه‌های زائد خارج از کارت استیکی در همه پرونده‌ها", "بازگردانی و تثبیت دکمه «ویرایش» در گوشه پایین سمت چپ تمام کارت‌ها از جمله کارت آخر (۷ از ۷)", "بهینه‌سازی ریسپانسیو و کپسوله‌سازی اسکرول داخلی کارت‌ها", "انتشار رسمی نسخه ۳.۱.۰"]
    }, {
      "version": "3.0.0",
      "buildNumber": 300,
      "releaseDate": "2026-08-14",
      "releaseChannel": "Stable",
      "commitHash": "v300major",
      "commitMessage": "feat: official release 3.0.0 with perfected sticky cards experience, loan card actions, and clean layout",
      "changes": ["تکمیل و بهینه‌سازی نهایی رفتار اسکرول و چیدمان پله‌ای کارت‌های استیکی در تمامی ویزاردها و پرونده‌های وام", "جلوگیری از بالاتر رفتن کارت آخر نسبت به کارت یکی مانده به آخر هنگام اسکرول به بالا", "نمایش کامل شماره کارت و دکمه ویرایش درون کارت در تمام کارت‌ها از جمله کارت آخر", "حذف نوشته و دکمه‌های زائد خارج از کارت در ماژول استیکی و ارتقاء یکپارچگی ظاهری", "انتشار رسمی نسخه عمده ۳.۰.۰"]
    }, {
      "version": "2.2.6",
      "buildNumber": 235,
      "releaseDate": "2026-08-14",
      "releaseChannel": "Stable",
      "commitHash": "v226rel",
      "commitMessage": "feat: release version 2.2.6 with equal sized stack card navigation buttons",
      "changes": ["هم‌اندازه شدن دکمه‌های «مرحله بعدی» و «مرحله قبلی» در تمام ویزاردهای کارت استک برنامه", "انتشار رسمی نسخه ۲.۲.۶"]
    }, {
      "version": "2.2.5",
      "buildNumber": 230,
      "releaseDate": "2026-08-13",
      "releaseChannel": "Stable",
      "commitHash": "v225rel",
      "commitMessage": "feat: release version 2.2.5 with universal stack wizard styling and close button contrast fix",
      "changes": ["یکپارچه‌سازی و یونیورسال کردن کامل ظاهر پنجره کارت‌های استک و استیکی کارت‌ها در تمام مسیرهای ورودی برنامه و منوی شناور", "بهبود کنتراست و خوانایی دکمه ضربدر بستن کارت‌های استک در تم روشن و تاریک", "انتشار رسمی نسخه ۲.۲.۵"]
    }, {
      "version": "2.2.4",
      "buildNumber": 219,
      "releaseDate": "2026-08-13",
      "releaseChannel": "Stable",
      "commitHash": "v224rel",
      "commitMessage": "feat: release version 2.2.4 with card shadow consistency and return animation fix",
      "changes": ["یکسان‌سازی سایه کارت‌های تراکنش در تمام بخش‌های بدهی و طلب فعال", "اصلاح انیمیشن بازگشت از صفحات جزئیات مخاطب، وام و طلب به صفحه اصلی", "انتشار رسمی نسخه ۲.۲.۴"]
    }, {
      "version": "2.2.3",
      "buildNumber": 217,
      "releaseDate": "2026-08-12",
      "releaseChannel": "Stable",
      "commitHash": "v223rel",
      "commitMessage": "feat: release version 2.2.3 with accordion transactions card redesign & smooth animation fix",
      "changes": ["یکسان‌سازی کامل سبک کارت‌ها و سایه تراکنش‌ها با بخش یادآوری‌های مهم", "بهبود و روان‌سازی انیمیشن باز و بسته شدن آکاردئون تراکنش‌ها و رفع پرش هنگام بستن", "انتشار رسمی نسخه ۲.۲.۳"]
    }, {
      "version": "2.2.2",
      "buildNumber": 212,
      "releaseDate": "2026-08-11",
      "releaseChannel": "Stable",
      "commitHash": "v222rel",
      "commitMessage": "feat: official release 2.2.2 with app icons, leather wallet splash screen, and card gestures",
      "changes": ["ارتقاء و پیاده‌سازی آیکون رسمی برنامه برای اندروید و iOS (طرح ۳بعدی سکه طلایی با نماد A و نمودار رشد)", "بازسازی کامل اسپلش اسکرین با تصویر باکیفیت کیف چرمی و کارت‌های اعتباری و رفع مشکل صفحه سیاه", "بهبود انیمیشن بازگشت و لمس بیرون کارت‌ها (بستن خودکار کارت‌های بازشده با لمس خارج از کارت)", "بازگردانی و بهبود بخش تاریخچه تغییرات و نسخه‌ها (Changelog) در تنظیمات"]
    }, {
      "version": "2.2.1",
      "buildNumber": 211,
      "releaseDate": "2026-08-11",
      "releaseChannel": "Stable",
      "commitHash": "v221rel",
      "commitMessage": "fix & feat: fix black splash screen with leather wallet theme and improve card back animations",
      "changes": ["بازسازی کامل اسپلش اسکرین با تصویر باکیفیت کیف چرمی و کارت‌های اعتباری و رفع مشکل صفحه سیاه", "بهبود انیمیشن بازگشت و لمس بیرون کارت‌ها (بستن خودکار کارت‌های بازشده با لمس خارج از کارت)", "رفع مشکل عدم نمایش کامل گزینه‌ها در برخی بخش‌ها"]
    }, {
      "version": "2.1.5",
      "buildNumber": 206,
      "releaseDate": "2026-08-08",
      "releaseChannel": "Stable",
      "commitHash": "v215stackFix",
      "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
      "changes": ["حذف دکمه «نمای یکجای کارت‌ها» از بالای مدال استک کارت‌ها", "تطبیق و یکسان‌سازی دقیق ارتفاع تمامی کارت‌های استک و استیکی جهت حذف فضای خالی اضافه در پایین کارت‌ها", "هم‌رنگ شدن هوشمند status bar با پس‌زمینه برنامه در زمان باز بودن مدال استک کارت و کارت‌های استیکی", "اعمال انیمیشن دقیق بازگشت (Rewind) عینا معکوس انیمیشن خروج کارت در زمان کلیک روی دکمه «مرحله قبلی»", "رفع مشکل پرش و عدم اجرای انیمیشن در صفحات دارای اسکرول عمودی موبایل (Uniform Card Height)", "افزودن سایه برجسته بالای کارت‌ها هنگام حرکت استیکی و قرارگیری روی کارت قبلی (Top Overlapping Shadow)", "حذف کامل منوی بالای صفحه در حالت ویرایش کارت‌ها جهت نمایش خالص کارت‌ها در صفحه", "افزودن دکمه شناور ضربدر (X) در پایین کارت‌ها جهت خروج سریع و آسان", "اصلاح موقعیت و لایه منوی تغییرات ذخیره‌نشده در پایین صفحه بدون ایجاد مزاحمت برای ویرایش سایر کارت‌ها"]
    }, {
      "version": "2.1.0",
      "buildNumber": 202,
      "releaseDate": "2026-08-07",
      "releaseChannel": "Stable",
      "commitHash": "v210mobileEdit",
      "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
      "changes": ["طراحی و پیاده‌سازی تجربه جدید و اختصاصی ویرایش کارت‌های استک (Sticky Stacked Cards) در نسخه موبایل PWA", "پشتیبانی از اسکرول عمودی روان، چسبندگی کارت‌ها در بالای صفحه به سبک iOS (Sticky Headers) و لغزش نرم کارت بعدی روی کارت قبلی با Scroll Snap", "نمایش کارت‌ها به‌صورت شناور با عرض اولیه ۹۲٪، گوشه‌های گرد، فواصل بهینه و حذف کامل دکمه‌های قبلی/بعدی در حالت ویرایش", "قابلیت ویرایش درون‌خطی کارت فعال با لمس، بزرگ‌نمایی نرم (از ۰.۹۲ به ۱.۰) و انیمیشن مات و کم‌رنگ شدن سایر کارت‌ها (Blur & Dimming)", "افزودن دکمه‌های «ثبت تغییرات» و «انصراف» به همراه نشانگر سبز «اصلاح‌شده» برای شناسایی کارت‌های تغییریافته", "افزودن نوار شناور پایین صفحه با شمارنده تغییرات ذخیره‌نشده و دکمه «ثبت همه تغییرات» جهت ذخیره یکجای داده‌ها", "نمایش پنجره هشدار تایید هوشمند هنگام تمایل کاربر به خروج از ویرایشگر در صورت وجود تغییرات ذخیره‌نشده"]
    }, {
      "version": "2.0.1",
      "buildNumber": 201,
      "releaseDate": "2026-08-07",
      "releaseChannel": "Stable",
      "commitHash": "v201rel",
      "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
      "changes": ["حذف دکمه «حذف مخاطب» از بالای کارت ویرایش مخاطب در استک کارت جهت جلوگیری از نیاز به اسکرول کارت", "اصلاح و روان‌سازی کامل عملکرد کلیک روی کادرهای ورودی در کارت‌های استک جهت باز شدن آنی کیبورد و فوکوس بدون مشکل روی موبایل و آیفون", "بازطراحی عناوین بخش‌های وام‌ها، طلب‌ها و بدهی‌ها در صفحه حساب‌ها به صورت مرکزچین و حاشیه‌دار در تمام عرض صفحه", "افزودن دکمه‌های فیلتر دوگانه (اصلی و بایگانی به همراه شمارنده تعداد) در صفحه پروفایل مخاطب برای هر ۳ بخش وام‌ها، بدهی‌ها و طلب‌ها"]
    }, {
      "version": "2.0.0",
      "buildNumber": 200,
      "releaseDate": "2026-08-07",
      "releaseChannel": "Stable",
      "commitHash": "v200major",
      "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
      "changes": ["حل ساختاری و کامل مشکل نمایش ناقص صفحه برنامه در حالت Preview و iFrame با تنظیم ارتفاع ۱۰۰٪ روی html، body و root#", "جلوگیری کامل از زوم ناخواسته صفحه‌نمایش هنگام باز شدن کیبورد مجازی در تمامی فیلدهای ورودی (موبایل و آیفون) با تنظیم اندازه فونت استاندارد ۱۶پیکسل و viewport-fit=cover", "بررسی دقیق و تطبیق ۱۰۰٪ مسیر تمامی فایل‌های Favicon، Apple Touch Icon، Web Manifest و تصاویر Splash Screen در index.html و public/index.html جهت نمایش دقیق آیکون در آیفون و PWA", "بهینه‌سازی انیمیشن‌های ورود و خروج (AnimatePresence) و سیستم فوکوس خودکار (autoFocus) در فرم‌ها و کارت‌های استک لایه‌ای (Stack Wizard)", "به‌روزرسانی سرویس ورکر (Service Worker v2.0.0-b200) جهت کش آفلاین و به‌روزرسانی آنی نسخه جدید"]
    }, {
      "version": "1.9.1",
      "buildNumber": 175,
      "releaseDate": "2026-08-05",
      "releaseChannel": "Stable",
      "commitHash": "v191rel",
      "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
      "changes": ["حذف کامل کارت انتخاب سررسید/ریمایندر از کارت استک ثبت وام", "بازگرداندن جدول انتخاب روزهای ۱ تا ۳۱ ماه به کارت سررسید اولین قسط وام با حذف عنوان بالای جدول", "پیاده‌سازی کارت استک برای ثبت مخاطب جدید (کارت اول: نام و نام خانوادگی در ۲ کادر مجزا، کارت دوم: شماره تماس، شماره کارت و شماره شبا)", "استفاده از کارت استک جدید برای ویرایش مخاطب به همراه دکمه حذف مخاطب", "ثبت رسمی بیلد 175 و انتشار نسخه 1.9.1"]
    }, {
      "version": "1.9.0",
      "buildNumber": 174,
      "releaseDate": "2026-08-05",
      "releaseChannel": "Stable",
      "commitHash": "v190rel",
      "commitMessage": "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
      "changes": ["معرفی سیستم جدید ویزارد لایه‌ای (Stack Wizard) برای ثبت وام جدید به جای مودال‌های تو در تو و پیچیده", "امکان حرکت نرم و انیمیشن‌دار بین مراحل ثبت وام (مشخصات، مخاطب، زمان‌بندی، کارمزد) به صورت کارت‌های روی هم افتاده (Stacked)", "بهبود چشمگیر تجربه کاربری و بصری در ثبت اطلاعات پیچیده و چندمرحله‌ای"]
    }]
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
    setIsVersionCardExpanded(prev => !prev);
  };
  const [openSettingsSection, setOpenSettingsSection] = useState(null);
  const toggleSettingsSection = sectionName => {
    setOpenSettingsSection(prev => prev === sectionName ? null : sectionName);
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
    const EMBEDDED_BUILD = 458;
    const EMBEDDED_VERSION = "3.2.8";
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
    const activeVersion = localBuild > EMBEDDED_BUILD && localVersion ? localVersion : EMBEDDED_VERSION;
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
      const isUpdateAvailable = serverBuild > localBuild || hasSWUpdate || swFoundUpdate;
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
          history: serverData && serverData.history && serverData.history.length > 0 ? serverData.history : prev.history && prev.history.length > 0 ? prev.history : defaultVersionData.history
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
  const handleCheckForUpdates = e => {
    if (e) e.stopPropagation();
    checkAppVersion(true);
  };
  const handleApplyUpdate = async e => {
    if (e) e.stopPropagation();
    setIsCheckingUpdate(true);
    try {
      showToast('در حال دریافت جدیدترین نسخه و پاکسازی حافظه پنهان...');

      // Fetch latest version.json and update localStorage
      const res = await fetch('version.json?t=' + Date.now(), {
        cache: 'no-store'
      });
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
        swRegistration.waiting.postMessage({
          type: 'SKIP_WAITING'
        });
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
    const ro = new ResizeObserver(entries => {
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
    icon: 'landmark',
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
  const [showLoanIconSelector, setShowLoanIconSelector] = useState(false);
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
  const [newContactForm, setNewContactForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bankName: '',
    bankCard: '',
    iban: ''
  });
  const [editContactForm, setEditContactForm] = useState({
    id: null,
    firstName: '',
    lastName: '',
    phone: '',
    bankName: '',
    bankCard: '',
    iban: ''
  });
  const [contactWizardForm, setContactWizardForm] = useState({
    id: null,
    firstName: '',
    lastName: '',
    phone: '',
    bankName: '',
    bankCard: '',
    iban: '',
    profileImage: null
  });
  const [showContactImageCropper, setShowContactImageCropper] = useState(false);
  const [contactImageCropperSrc, setContactImageCropperSrc] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportModalConfig, setExportModalConfig] = useState(null);
  const openUniversalExportModal = (type, data) => {
    setExportModalConfig({
      isOpen: true,
      type,
      data
    });
  };
  const [deleteTxModal, setDeleteTxModal] = useState({
    show: false,
    tx: null,
    type: null
  });
  const [showCompletedExportModal, setShowCompletedExportModal] = useState({
    show: false,
    contact: null,
    type: 'debt'
  });
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
  const handleRefreshData = async tabName => {
    try {
      isRestoringOrClearingRef.current = true;
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
      setTimeout(() => {
        isRestoringOrClearingRef.current = false;
      }, 400);
    } catch (e) {
      console.error('Refresh error:', e);
      isRestoringOrClearingRef.current = false;
    }
  };
  const [completedPeriods, setCompletedPeriods] = useState(() => loadSavedArray('amir_fin_completed_periods_v3', ['amir_fin_completed_periods_v2', 'amir_fin_completed_periods'], initialCompletedPeriods));
  useEffect(() => {
    try {
      localStorage.setItem('amir_fin_completed_periods_v3', JSON.stringify(completedPeriods));
    } catch (e) {}
  }, [completedPeriods]);

  // App Saved Data States
  const [contacts, setContacts] = useState(() => loadSavedArray('amir_fin_contacts_v3', ['amir_fin_contacts_v2', 'amir_fin_contacts'], initialContacts));
  const [loans, setLoans] = useState(() => loadSavedArray('amir_fin_loans_v3', ['amir_fin_loans_v2', 'amir_fin_loans'], initialLoans));
  const [transactions, setTransactions] = useState(() => loadSavedArray('amir_fin_txs_v3', ['amir_fin_txs_v2', 'amir_fin_tx'], initialTransactions));

  // Backup Status & Unsaved Changes Tracking State
  const initialBackupStatus = (() => {
    try {
      const saved = localStorage.getItem('amir_fin_backup_status_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          const catCounts = parsed.categoryCounts && typeof parsed.categoryCounts === 'object' ? parsed.categoryCounts : {};
          const total = Object.values(catCounts).reduce((a, b) => a + (Number(b) || 0), 0) || Number(parsed.unbackedChangesCount) || 0;
          return {
            unbackedChangesCount: Math.max(0, total),
            lastBackupTimestamp: parsed.lastBackupTimestamp || null,
            lastBackupFormatted: parsed.lastBackupFormatted || null,
            categoryCounts: catCounts
          };
        }
      }
    } catch (e) {
      console.error('Error loading backup status:', e);
    }
    return {
      unbackedChangesCount: 0,
      lastBackupTimestamp: null,
      lastBackupFormatted: null,
      categoryCounts: {}
    };
  })();
  const [backupStatus, setBackupStatus] = useState(initialBackupStatus);
  const [showBackupPopover, setShowBackupPopover] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupError, setBackupError] = useState(null);
  const [isBellWiggling, setIsBellWiggling] = useState(false);
  const isInitialMountRef = useRef(true);
  const isRestoringOrClearingRef = useRef(false);

  // GLOBAL UNDO SYSTEM
  const appStateRef = useRef({
    contacts,
    loans,
    transactions,
    completedPeriods,
    backupStatus
  });
  useEffect(() => {
    appStateRef.current = {
      contacts,
      loans,
      transactions,
      completedPeriods,
      backupStatus
    };
  }, [contacts, loans, transactions, completedPeriods, backupStatus]);
  const [undoState, setUndoState] = useState(null);
  useEffect(() => {
    if (undoState) {
      const timer = setTimeout(() => setUndoState(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [undoState]);
  const triggerUndo = (message, customSnapshot = null) => {
    setUndoState({
      message,
      state: customSnapshot ? {
        ...customSnapshot
      } : {
        ...appStateRef.current
      },
      timestamp: Date.now()
    });
  };
  const handleUndo = () => {
    if (!undoState || !undoState.state) return;
    const restored = undoState.state;
    isRestoringOrClearingRef.current = true;
    setContacts(restored.contacts || []);
    setLoans(restored.loans || []);
    setTransactions(restored.transactions || []);
    setCompletedPeriods(restored.completedPeriods || []);
    if (restored.backupStatus) {
      setBackupStatus(restored.backupStatus);
      try {
        localStorage.setItem('amir_fin_backup_status_v1', JSON.stringify(restored.backupStatus));
      } catch (e) {}
    }
    prevContactsMapRef.current = new Map((restored.contacts || []).map(c => [String(c.id), c]));
    prevLoansMapRef.current = new Map((restored.loans || []).map(l => [String(l.id), l]));
    prevTxsMapRef.current = new Map((restored.transactions || []).map(t => [String(t.id), t]));
    prevPeriodsSetRef.current = new Set((restored.completedPeriods || []).map(p => String(p.id || JSON.stringify(p))));
    setUndoState(null);
    showToast('تغییرات لغو و اطلاعات بازگردانی شد');
  };

  // Entity snapshot maps for precise single-log mutation diffing
  const prevContactsMapRef = useRef(new Map());
  const prevLoansMapRef = useRef(new Map());
  const prevTxsMapRef = useRef(new Map());
  const prevPeriodsSetRef = useRef(new Set());
  const formatBackupDateTime = (date = new Date()) => {
    try {
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const timeStr = `${hours}:${minutes}`;
      if (isToday) {
        return `امروز، ${timeStr}`;
      }
      const jalali = getDeviceJalaliDate(date);
      return `${jalali.day} ${jalali.month}، ${timeStr}`;
    } catch (e) {
      return 'امروز';
    }
  };
  const markBackupAsSuccessful = () => {
    const formatted = formatBackupDateTime(new Date());
    const newStatus = {
      unbackedChangesCount: 0,
      lastBackupTimestamp: Date.now(),
      lastBackupFormatted: formatted,
      categoryCounts: {}
    };
    setBackupStatus(newStatus);
    try {
      localStorage.setItem('amir_fin_backup_status_v1', JSON.stringify(newStatus));
    } catch (e) {}
  };

  // Periodic gentle wiggle animation every 7.5 seconds when unbacked changes exist
  useEffect(() => {
    if (!backupStatus || backupStatus.unbackedChangesCount === 0) {
      setIsBellWiggling(false);
      return;
    }
    const interval = setInterval(() => {
      setIsBellWiggling(true);
      setTimeout(() => {
        setIsBellWiggling(false);
      }, 700);
    }, 7500);
    return () => clearInterval(interval);
  }, [backupStatus?.unbackedChangesCount]);

  // Precise entity-level semantic mutation tracker
  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      prevContactsMapRef.current = new Map(contacts.map(c => [String(c.id), c]));
      prevLoansMapRef.current = new Map(loans.map(l => [String(l.id), l]));
      prevTxsMapRef.current = new Map(transactions.map(t => [String(t.id), t]));
      prevPeriodsSetRef.current = new Set(completedPeriods.map(p => String(p.id || JSON.stringify(p))));
      return;
    }
    if (isRestoringOrClearingRef.current) {
      isRestoringOrClearingRef.current = false;
      prevContactsMapRef.current = new Map(contacts.map(c => [String(c.id), c]));
      prevLoansMapRef.current = new Map(loans.map(l => [String(l.id), l]));
      prevTxsMapRef.current = new Map(transactions.map(t => [String(t.id), t]));
      prevPeriodsSetRef.current = new Set(completedPeriods.map(p => String(p.id || JSON.stringify(p))));
      return;
    }
    const batchCategoryCounts = {};
    const addCat = (label, count = 1) => {
      if (!label || count <= 0) return;
      batchCategoryCounts[label] = (batchCategoryCounts[label] || 0) + count;
    };
    const currentTxsMap = new Map(transactions.map(t => [String(t.id), t]));
    const currentLoansMap = new Map(loans.map(l => [String(l.id), l]));
    const currentContactsMap = new Map(contacts.map(c => [String(c.id), c]));
    const currentPeriodsSet = new Set(completedPeriods.map(p => String(p.id || JSON.stringify(p))));

    // 1. Transactions Diffing
    const addedTxs = transactions.filter(t => !prevTxsMapRef.current.has(String(t.id)));
    const deletedTxs = [];
    for (const [id, t] of prevTxsMapRef.current.entries()) {
      if (!currentTxsMap.has(String(id))) deletedTxs.push(t);
    }
    const editedTxs = transactions.filter(t => {
      if (!prevTxsMapRef.current.has(String(t.id))) return false;
      const prevT = prevTxsMapRef.current.get(String(t.id));
      return prevT.amount !== t.amount || prevT.dateStr !== t.dateStr || prevT.date !== t.date || prevT.note !== t.note || prevT.notes !== t.notes || prevT.title !== t.title;
    });
    addedTxs.forEach(t => {
      const type = t.type || '';
      if (type === 'loan_installment' || type === 'installment' || type === 'repayment' || t.installmentNumber || t.loanId && !type.includes('debt') && !type.includes('demand')) {
        addCat('ثبت قسط جدید');
      } else if (type === 'debt') {
        addCat('ثبت بدهی جدید');
      } else if (type === 'demand') {
        addCat('ثبت طلب جدید');
      } else if (type === 'debt_repayment' || type === 'demand_repayment') {
        addCat('ثبت بازپرداخت جدید');
      } else {
        addCat('ثبت تراکنش جدید');
      }
    });
    deletedTxs.forEach(t => {
      const type = t.type || '';
      if (type === 'loan_installment' || type === 'installment' || type === 'repayment' || t.installmentNumber || t.loanId && !type.includes('debt') && !type.includes('demand')) {
        addCat('حذف قسط');
      } else if (type === 'debt') {
        addCat('حذف بدهی');
      } else if (type === 'demand') {
        addCat('حذف طلب');
      } else if (type === 'debt_repayment' || type === 'demand_repayment') {
        addCat('حذف بازپرداخت');
      } else {
        addCat('حذف تراکنش');
      }
    });
    editedTxs.forEach(t => {
      const type = t.type || '';
      if (type === 'loan_installment' || type === 'installment' || type === 'repayment' || t.installmentNumber || t.loanId && !type.includes('debt') && !type.includes('demand')) {
        addCat('ویرایش قسط');
      } else if (type === 'debt') {
        addCat('ویرایش بدهی');
      } else if (type === 'demand') {
        addCat('ویرایش طلب');
      } else if (type === 'debt_repayment' || type === 'demand_repayment') {
        addCat('ویرایش بازپرداخت');
      } else {
        addCat('ویرایش تراکنش');
      }
    });

    // 2. Loans Diffing
    const addedLoans = loans.filter(l => !prevLoansMapRef.current.has(String(l.id)));
    const deletedLoans = [];
    for (const [id, l] of prevLoansMapRef.current.entries()) {
      if (!currentLoansMap.has(String(id))) deletedLoans.push(l);
    }
    const editedLoans = loans.filter(l => {
      if (!prevLoansMapRef.current.has(String(l.id))) return false;
      const prevL = prevLoansMapRef.current.get(String(l.id));
      const titleChanged = prevL.title !== l.title;
      const amountChanged = prevL.totalAmount !== l.totalAmount || prevL.amount !== l.amount || prevL.principalAmount !== l.principalAmount || prevL.totalRepayment !== l.totalRepayment;
      const totalInstChanged = prevL.totalInstallments !== l.totalInstallments;
      const contactChanged = prevL.contactId !== l.contactId;
      const noteChanged = prevL.notes !== l.notes && prevL.note !== l.note;
      return titleChanged || amountChanged || totalInstChanged || contactChanged || noteChanged;
    });
    addedLoans.forEach(l => {
      const type = l.type || '';
      if (type === 'debt') {
        addCat('ثبت بدهی جدید');
      } else if (type === 'demand') {
        addCat('ثبت طلب جدید');
      } else {
        addCat('ثبت وام جدید');
      }
    });
    deletedLoans.forEach(l => {
      const type = l.type || '';
      if (type === 'debt') {
        addCat('حذف بدهی');
      } else if (type === 'demand') {
        addCat('حذف طلب');
      } else {
        addCat('حذف وام');
      }
    });
    editedLoans.forEach(l => {
      const type = l.type || '';
      if (type === 'debt') {
        addCat('ویرایش بدهی');
      } else if (type === 'demand') {
        addCat('ویرایش طلب');
      } else {
        addCat('ویرایش وام');
      }
    });

    // 3. Contacts Diffing
    const addedContacts = contacts.filter(c => !prevContactsMapRef.current.has(String(c.id)));
    const deletedContacts = [];
    for (const [id, c] of prevContactsMapRef.current.entries()) {
      if (!currentContactsMap.has(String(id))) deletedContacts.push(c);
    }
    const editedContacts = contacts.filter(c => {
      if (!prevContactsMapRef.current.has(String(c.id))) return false;
      const prevC = prevContactsMapRef.current.get(String(c.id));
      return prevC.firstName !== c.firstName || prevC.lastName !== c.lastName || prevC.phone !== c.phone || prevC.bankName !== c.bankName || prevC.bankCard !== c.bankCard || prevC.cardNumber !== c.cardNumber || prevC.iban !== c.iban || prevC.note !== c.note && prevC.notes !== c.notes;
    });
    addedContacts.forEach(() => addCat('ثبت مخاطب جدید'));
    deletedContacts.forEach(() => addCat('حذف مخاطب'));
    editedContacts.forEach(() => addCat('ویرایش مخاطب'));

    // 4. Completed Periods Diffing
    let addedPeriodsCount = 0;
    for (const key of currentPeriodsSet) {
      if (!prevPeriodsSetRef.current.has(key)) addedPeriodsCount++;
    }
    if (addedPeriodsCount > 0) {
      addCat('تسویه و بایگانی دوره', addedPeriodsCount);
    }
    let deletedPeriodsCount = 0;
    for (const key of prevPeriodsSetRef.current) {
      if (!currentPeriodsSet.has(key)) deletedPeriodsCount++;
    }
    if (deletedPeriodsCount > 0) {
      addCat('حذف دوره تسویه‌شده', deletedPeriodsCount);
    }

    // Update snapshot refs
    prevContactsMapRef.current = currentContactsMap;
    prevLoansMapRef.current = currentLoansMap;
    prevTxsMapRef.current = currentTxsMap;
    prevPeriodsSetRef.current = currentPeriodsSet;

    // Update aggregated backup state
    const batchTotal = Object.values(batchCategoryCounts).reduce((a, b) => a + b, 0);
    if (batchTotal > 0) {
      setBackupStatus(prevStatus => {
        const existingCatCounts = prevStatus?.categoryCounts || {};
        const mergedCatCounts = {
          ...existingCatCounts
        };
        for (const [key, count] of Object.entries(batchCategoryCounts)) {
          mergedCatCounts[key] = (mergedCatCounts[key] || 0) + count;
        }
        const totalUnbacked = Object.values(mergedCatCounts).reduce((a, b) => a + (Number(b) || 0), 0);
        const updated = {
          ...prevStatus,
          unbackedChangesCount: totalUnbacked,
          categoryCounts: mergedCatCounts
        };
        try {
          localStorage.setItem('amir_fin_backup_status_v1', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  }, [contacts, loans, transactions, completedPeriods]);
  const [accountsSearchQuery, setAccountsSearchQuery] = useState('');
  const [showCompletedLoans, setShowCompletedLoans] = useState(() => {
    try {
      return localStorage.getItem('showCompletedLoans') !== 'false';
    } catch (e) {
      return true;
    }
  });
  const getSettledPeriodCount = (contactId, type) => {
    if (!contactId) return 0;
    const directPeriods = completedPeriods.filter(p => p.contactId === contactId && p.type === type);
    const archivedTxs = transactions.filter(t => t.contactId === contactId && t.periodId && (type === 'debt' && (t.type === 'debt' || t.type === 'debt_repayment') || type === 'demand' && (t.type === 'demand' || t.type === 'demand_repayment')));
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
      const matchDirect = title.includes(accountsQuery) || contactName.includes(accountsQuery) || principal.includes(accountsQuery) || repayment.includes(accountsQuery) || installment.includes(accountsQuery) || note.includes(accountsQuery);
      if (matchDirect) return true;
      return transactions.some(t => t.loanId === loan.id && ((t.note || '').toLowerCase().includes(accountsQuery) || (t.description || '').toLowerCase().includes(accountsQuery) || (t.amount || '').toString().includes(accountsQuery) || (t.dateStr || '').includes(accountsQuery)));
    });
    if (accountsSubTab === 'archived') {
      list = list.filter(loan => {
        const info = getLoanNextDueInfo(loan, transactions);
        return info.isCompleted || loan.remainingAmount !== undefined && loan.remainingAmount <= 0;
      });
    } else {
      list = list.filter(loan => {
        const info = getLoanNextDueInfo(loan, transactions);
        return !info.isCompleted && (loan.remainingAmount === undefined || loan.remainingAmount > 0);
      });
    }
    return list.sort((a, b) => {
      const aCompleted = getLoanNextDueInfo(a, transactions).isCompleted || a.remainingAmount !== undefined && a.remainingAmount <= 0 ? 1 : 0;
      const bCompleted = getLoanNextDueInfo(b, transactions).isCompleted || b.remainingAmount !== undefined && b.remainingAmount <= 0 ? 1 : 0;
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
      const matchTx = transactions.some(t => t.contactId === contact.id && (t.type === 'demand' || t.type === 'demand_repayment') && ((t.note || '').toLowerCase().includes(accountsQuery) || (t.description || '').toLowerCase().includes(accountsQuery) || (t.amount || '').toString().includes(accountsQuery) || (t.dateStr || '').includes(accountsQuery)));
      if (matchTx) return true;
      return completedPeriods.some(p => p.contactId === contact.id && p.type === 'demand' && ((p.title || '').toLowerCase().includes(accountsQuery) || (p.totalAmount || '').toString().includes(accountsQuery) || (p.startDate || '').includes(accountsQuery) || (p.endDate || '').includes(accountsQuery)));
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
      const matchTx = transactions.some(t => t.contactId === contact.id && (t.type === 'debt' || t.type === 'debt_repayment') && ((t.note || '').toLowerCase().includes(accountsQuery) || (t.description || '').toLowerCase().includes(accountsQuery) || (t.amount || '').toString().includes(accountsQuery) || (t.dateStr || '').includes(accountsQuery)));
      if (matchTx) return true;
      return completedPeriods.some(p => p.contactId === contact.id && p.type === 'debt' && ((p.title || '').toLowerCase().includes(accountsQuery) || (p.totalAmount || '').toString().includes(accountsQuery) || (p.startDate || '').includes(accountsQuery) || (p.endDate || '').includes(accountsQuery)));
    });
  }, [contacts, transactions, completedPeriods, accountsQuery, accountsSubTab]);
  const [reminders, setReminders] = useState(initialReminders);
  const [expandedReminders, setExpandedReminders] = useState(false);
  const [expandedRecentTxs, setExpandedRecentTxs] = useState(true);
  const recentTxsAccordionRef = useRef(null);
  const toggleRecentTxsAccordion = e => {
    if (e) e.stopPropagation();
    setExpandedRecentTxs(prev => {
      const nextState = !prev;
      if (!nextState && recentTxsAccordionRef.current) {
        const rect = recentTxsAccordionRef.current.getBoundingClientRect();
        if (rect.top < 10 || rect.bottom > window.innerHeight) {
          recentTxsAccordionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
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
  const [numberFormat, setNumberFormat] = useState(() => {
    try {
      const saved = localStorage.getItem('amir_fin_num_format');
      if (saved) {
        globalNumberFormat = saved;
        return saved;
      }
    } catch (e) {}
    return 'latin';
  });
  const handleSetNumberFormat = newFormat => {
    setNumberFormat(newFormat);
    globalNumberFormat = newFormat;
    try {
      localStorage.setItem('amir_fin_num_format', newFormat);
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-number-format', newFormat);
        if (newFormat === 'persian') {
          document.documentElement.classList.add('num-format-persian');
          document.body.classList.add('num-format-persian');
        } else {
          document.documentElement.classList.remove('num-format-persian');
          document.body.classList.remove('num-format-persian');
        }
      }
    } catch (e) {}
  };
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-number-format', numberFormat);
      if (numberFormat === 'persian') {
        document.documentElement.classList.add('num-format-persian');
        document.body.classList.add('num-format-persian');
      } else {
        document.documentElement.classList.remove('num-format-persian');
        document.body.classList.remove('num-format-persian');
      }
    }
  }, [numberFormat]);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('amir_fin_theme') || 'system' : 'system';
    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // All Transactions Subpage State
  const [allTxsPage, setAllTxsPage] = useState(1);
  const [allTxsSearchQuery, setAllTxsSearchQuery] = useState('');
  const [allTxsFilterType, setAllTxsFilterType] = useState('all');
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
      if (w >= 1024 || h >= 1000) setDynamicPageSize(18);else if (w >= 768 || h >= 850) setDynamicPageSize(12);else setDynamicPageSize(8);
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
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 450);
      const clearTimer = setTimeout(() => {
        setHighlightedTxId(null);
      }, 4000);
      return () => {
        clearTimeout(timer);
        clearTimeout(clearTimer);
      };
    }
  }, [highlightedTxId]);
  const handleTransactionClick = tx => {
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
  const closePlusMenu = callback => {
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
  const isAnyModalOpen = showStackWizard || showAddContactModal || showEditContactModal || showDeleteConfirmModal || showExportModal || showCompletedExportModal && showCompletedExportModal.show || showResetConfirmModal || showRestoreConfirmModal || showDeleteLoanModal || deleteTxModal && deleteTxModal.show || showUnsavedConfirmDialog;
  useEffect(() => {
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    const darkBackdropColor = '#0b101d';
    if (isAnyModalOpen) {
      const modalThemeColor = showStackWizard && !isDark ? '#F4F7FC' : darkBackdropColor;
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
      const blob = new Blob([jsonStr], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const now = getDeviceJalaliDate();
      a.download = `amir-finance-backup-${now.year}-${now.month}-${now.day}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      markBackupAsSuccessful();
      showToast('فایل پشتیبان با موفقیت دانلود شد');
      return true;
    } catch (e) {
      showToast('خطا در ایجاد فایل پشتیبان');
      return false;
    }
  };
  const handleRestoreFileChange = e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
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
              isRestoringOrClearingRef.current = true;
              if (Array.isArray(parsed.contacts)) setContacts(parsed.contacts);
              if (Array.isArray(parsed.loans)) setLoans(parsed.loans);
              if (Array.isArray(parsed.transactions)) setTransactions(parsed.transactions);
              if (Array.isArray(parsed.reminders)) setReminders(parsed.reminders);
              if (Array.isArray(parsed.completedPeriods)) setCompletedPeriods(parsed.completedPeriods);
              if (parsed.theme) setTheme(parsed.theme);
              markBackupAsSuccessful();
              showToast('اطلاعات دیتابیس با موفقیت بازیابی شد');
              setTimeout(() => {
                isRestoringOrClearingRef.current = false;
              }, 500);
            } catch (err) {
              showToast('خطا در اعمال اطلاعات پشتیبان');
              isRestoringOrClearingRef.current = false;
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
      details: ['تمام مخاطبین و حساب‌ها', 'تمام پرونده‌های وام', 'تمام طلب‌ها و بدهی‌ها', 'سوابق و تراکنش‌ها'],
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
      isRestoringOrClearingRef.current = true;
      if (Array.isArray(pendingRestoreData.contacts)) setContacts(pendingRestoreData.contacts);
      if (Array.isArray(pendingRestoreData.loans)) setLoans(pendingRestoreData.loans);
      if (Array.isArray(pendingRestoreData.transactions)) setTransactions(pendingRestoreData.transactions);
      if (Array.isArray(pendingRestoreData.reminders)) setReminders(pendingRestoreData.reminders);
      if (Array.isArray(pendingRestoreData.completedPeriods)) setCompletedPeriods(pendingRestoreData.completedPeriods);
      if (pendingRestoreData.theme) setTheme(pendingRestoreData.theme);
      markBackupAsSuccessful();
      setShowRestoreConfirmModal(false);
      setPendingRestoreData(null);
      showToast('اطلاعات دیتابیس با موفقیت بازیابی شد');
      setTimeout(() => {
        isRestoringOrClearingRef.current = false;
      }, 500);
    } catch (e) {
      showToast('خطا در اعمال اطلاعات پشتیبان');
      isRestoringOrClearingRef.current = false;
    }
  };
  const handleConfirmDeleteAllData = () => {
    isRestoringOrClearingRef.current = true;
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
    const resetStatus = {
      unbackedChangesCount: 0,
      lastBackupTimestamp: null,
      lastBackupFormatted: null,
      categoryCounts: {}
    };
    setBackupStatus(resetStatus);
    try {
      localStorage.setItem('amir_fin_backup_status_v1', JSON.stringify(resetStatus));
    } catch (e) {}
    setShowResetConfirmModal(false);
    showToast('کل اطلاعات برنامه با موفقیت پاک شد');
    setTimeout(() => {
      isRestoringOrClearingRef.current = false;
    }, 500);
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
    const amtFormatted = formatAppNumber(Math.abs(txItem.amount || 0));
    const titleStr = txItem.title || (type === 'loan_installment' ? 'پرداخت قسط' : type === 'debt' ? 'تراکنش بدهی' : 'تراکنش طلب');
    setConfirmConfig({
      title: 'حذف تراکنش',
      message: 'آیا از حذف این تراکنش اطمینان دارید؟',
      details: [`عنوان: ${titleStr}`, `مبلغ: ${amtFormatted} تومان`],
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
    const effectiveType = txType || txToDelete.type || 'tx';
    let updatedTxs = transactions.filter(t => String(t.id) !== String(txToDelete.id));
    const periodId = txToDelete.periodId;
    if (periodId) {
      setCompletedPeriods(prev => prev.filter(p => String(p.id) !== String(periodId)));
      updatedTxs = updatedTxs.map(t => String(t.periodId) === String(periodId) ? {
        ...t,
        periodId: undefined
      } : t);
      if (selectedPeriod && String(selectedPeriod.id) === String(periodId)) {
        setSelectedPeriod(null);
        navigateToTab(loanReturnTab || 'contact-detail', 'back');
      }
    }
    setTransactions(updatedTxs);
    if (effectiveType === 'loan_installment' || effectiveType === 'installment' || effectiveType === 'repayment' || txToDelete.installmentNumber || txToDelete.loanId && !effectiveType.includes('debt') && !effectiveType.includes('demand')) {
      const targetLoan = loans.find(l => String(l.id) === String(txToDelete.loanId));
      if (targetLoan) {
        const deletedAmt = Math.abs(txToDelete.amount || 0);
        const newPaid = Math.max(0, (targetLoan.paidAmount || 0) - deletedAmt);
        const newRemaining = Math.max(0, (targetLoan.totalRepayment || 0) - newPaid);
        const updatedLoans = loans.map(l => {
          if (String(l.id) === String(targetLoan.id)) {
            return {
              ...l,
              paidAmount: newPaid,
              remainingAmount: newRemaining
            };
          }
          return l;
        });
        setLoans(updatedLoans);
        if (selectedLoan && String(selectedLoan.id) === String(targetLoan.id)) {
          setSelectedLoan(prev => ({
            ...prev,
            paidAmount: newPaid,
            remainingAmount: newRemaining
          }));
        }
      }
      triggerUndo('قسط با موفقیت حذف گردید');
      return;
    }
    if (effectiveType === 'debt' || effectiveType === 'debt_repayment') {
      if (txToDelete.contactId) {
        const contactDebts = updatedTxs.filter(t => String(t.contactId) === String(txToDelete.contactId) && (t.type === 'debt' || t.type === 'debt_repayment') && !t.periodId);
        let netDebt = 0;
        contactDebts.forEach(t => {
          if (t.type === 'debt') netDebt += Math.abs(t.amount);
          if (t.type === 'debt_repayment') netDebt -= Math.abs(t.amount);
        });
        netDebt = Math.max(0, netDebt);
        const updatedContacts = contacts.map(c => {
          if (String(c.id) === String(txToDelete.contactId)) {
            return {
              ...c,
              totalDebt: netDebt
            };
          }
          return c;
        });
        setContacts(updatedContacts);
        if (selectedContact && String(selectedContact.id) === String(txToDelete.contactId)) {
          setSelectedContact(prev => ({
            ...prev,
            totalDebt: netDebt
          }));
        }
      }
      triggerUndo(periodId ? 'تراکنش حذف شد و بدهی از حالت بایگانی خارج گردید' : effectiveType === 'debt_repayment' ? 'بازپرداخت بدهی با موفقیت حذف شد' : 'تراکنش بدهی با موفقیت حذف گردید');
      return;
    }
    if (effectiveType === 'demand' || effectiveType === 'demand_repayment') {
      if (txToDelete.contactId) {
        const contactDemands = updatedTxs.filter(t => String(t.contactId) === String(txToDelete.contactId) && (t.type === 'demand' || t.type === 'demand_repayment') && !t.periodId);
        let netDemand = 0;
        contactDemands.forEach(t => {
          if (t.type === 'demand') netDemand += Math.abs(t.amount);
          if (t.type === 'demand_repayment') netDemand -= Math.abs(t.amount);
        });
        netDemand = Math.max(0, netDemand);
        const updatedContacts = contacts.map(c => {
          if (String(c.id) === String(txToDelete.contactId)) {
            return {
              ...c,
              totalDemand: netDemand
            };
          }
          return c;
        });
        setContacts(updatedContacts);
        if (selectedContact && String(selectedContact.id) === String(txToDelete.contactId)) {
          setSelectedContact(prev => ({
            ...prev,
            totalDemand: netDemand
          }));
        }
      }
      triggerUndo(periodId ? 'تراکنش حذف شد و طلب از حالت بایگانی خارج گردید' : effectiveType === 'demand_repayment' ? 'بازپرداخت طلب با موفقیت حذف شد' : 'تراکنش طلب با موفقیت حذف گردید');
      return;
    }
    triggerUndo('تراکنش با موفقیت حذف گردید');
  };
  const exportPeriodAsPNG = period => {
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
      ctx.font = 'bold 22px Vazir, Vazirmatn, Tahoma, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`صورت‌حساب دوره تسویه‌شده ${isDebt ? 'قرض / بدهی' : 'طلب'}`, width - 35, 52);
      ctx.fillStyle = '#64748b';
      ctx.font = '13px Vazir, Vazirmatn, Tahoma, sans-serif';
      ctx.fillText(`نام مخاطب: ${period.contactName || ''}    •    بازه زمانی: از ${formatDateToNumericJalali(period.startDate)} تا ${formatDateToNumericJalali(period.endDate)}`, width - 35, 78);
      ctx.fillStyle = isDebt ? '#fff1f2' : '#ecfdf5';
      drawRoundRect(ctx, 35, 96, width - 70, 100, 14);
      ctx.fill();
      ctx.strokeStyle = isDebt ? '#fecdd3' : '#a7f3d0';
      ctx.stroke();
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 16px Vazir, Vazirmatn, Tahoma, sans-serif';
      ctx.fillText(`مبلغ کل دوره: ${formatAppNumber(period.totalAmount || 0)} تومان`, width - 60, 132);
      ctx.fillStyle = isDebt ? '#be123c' : '#047857';
      ctx.font = 'bold 14px Vazir, Vazirmatn, Tahoma, sans-serif';
      ctx.fillText(`وضعیت: تسویه‌شده و کامل (مانده: ۰ تومان)`, width - 60, 168);
      const tableTop = 216;
      ctx.fillStyle = isDebt ? '#e11d48' : '#059669';
      ctx.fillRect(35, tableTop, width - 70, 38);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Vazir, Vazirmatn, Tahoma, sans-serif';
      ctx.fillText('ردیف', width - 60, tableTop + 24);
      ctx.fillText('شرح / عنوان تراکنش', width - 140, tableTop + 24);
      ctx.fillText('تاریخ', width - 420, tableTop + 24);
      ctx.fillText('مبلغ (تومان)', width - 620, tableTop + 24);
      let currentY = tableTop + 38;
      if (txs.length === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(35, currentY, width - 70, 44);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px Vazir, Vazirmatn, Tahoma, sans-serif';
        ctx.fillText('هیچ تراکنشی در این دوره ثبت نشده است', width / 2 + 80, currentY + 28);
        currentY += 44;
      } else {
        txs.forEach((tx, idx) => {
          ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
          ctx.fillRect(35, currentY, width - 70, rowHeight);
          ctx.strokeStyle = '#f1f5f9';
          ctx.strokeRect(35, currentY, width - 70, rowHeight);
          ctx.fillStyle = '#334155';
          ctx.font = '12px Vazir, Vazirmatn, Tahoma, sans-serif';
          ctx.fillText(String(toAppDigits(idx + 1)), width - 60, currentY + 26);
          ctx.fillText(tx.title || 'تراکنش', width - 140, currentY + 26);
          ctx.fillText(formatDateToNumericJalali(tx.dateStr), width - 420, currentY + 26);
          const isRepay = tx.type === 'debt_repayment' || tx.type === 'demand_repayment';
          ctx.fillStyle = isRepay ? '#16a34a' : '#e11d48';
          ctx.font = 'bold 12px Vazir, Vazirmatn, Tahoma, sans-serif';
          ctx.fillText(formatAppNumber(Math.abs(tx.amount) || 0), width - 620, currentY + 26);
          currentY += rowHeight;
        });
      }
      const nowJalali = getDeviceJalaliDate();
      const periodDateStr = formatDateToNumericJalali(`${nowJalali.day} ${nowJalali.month} ${nowJalali.year}`);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Vazir, Vazirmatn, Tahoma, sans-serif';
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
  const handleSetupNotification = optionVal => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
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
      const startDayVal = mode === 'edit' && data && data.startDate ? parseJalaliDateStr(data.startDate).day : deviceDate.day;
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
          icon: data.icon || 'landmark',
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
        const isFromFab = Boolean(data && data.fromFab || mode === 'add' && currentTab === 'dashboard');
        const passedContactId = isFromFab ? '' : data && data.contactId ? data.contactId : selectedContact ? selectedContact.id : '';
        const defaultContact = passedContactId ? contacts.find(c => c.id === Number(passedContactId)) : null;
        const defaultName = defaultContact ? `${defaultContact.firstName} ${defaultContact.lastName}` : '';
        setLoanForm({
          id: null,
          title: '',
          icon: 'landmark',
          selectedContactId: passedContactId || '',
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
      const isFromFab = Boolean(data && data.fromFab || mode === 'add' && currentTab === 'dashboard');
      const passedContactId = isFromFab ? '' : data && data.contactId ? data.contactId : selectedContact ? selectedContact.id : '';
      const isEditTx = mode === 'edit' && data && data.id;
      const editAmt = isEditTx ? Math.abs(data.amount || 0) : mode === 'edit' && data && data.amount ? Math.abs(data.amount || 0) : '';
      const editNotes = mode === 'edit' && data && data.notes ? data.notes : '';
      setDemandDebtForm({
        id: isEditTx ? data.id : null,
        selectedContactId: passedContactId || '',
        contactSearchQuery: '',
        amount: editAmt,
        notes: editNotes
      });
    } else if (type === 'installment') {
      const isFromFab = Boolean(data && data.fromFab || mode === 'add' && currentTab === 'dashboard');
      const isEditTx = mode === 'edit' && data && data.id && data.amount !== undefined;
      const passedLoan = data && data.id && !isEditTx && !isFromFab ? data : null;
      const activeLoans = loans.filter(l => {
        const paid = transactions.filter(t => t.loanId === l.id && t.type === 'repayment').reduce((s, t) => s + Math.abs(t.amount || 0), 0);
        const total = l.totalRepayment > 0 ? l.totalRepayment : l.principalAmount;
        return total - paid > 0;
      });
      const activeTargetLoan = isFromFab ? null : passedLoan || selectedLoan || (selectedContact ? activeLoans.find(l => l.contactId === selectedContact.id) : null) || (activeLoans.length > 0 ? activeLoans[0] : null);
      const editLoanId = isEditTx ? data.loanId || (activeTargetLoan ? activeTargetLoan.id : '') : activeTargetLoan ? activeTargetLoan.id : '';
      const targetLoan = isFromFab ? null : editLoanId ? loans.find(l => l.id === Number(editLoanId)) || activeTargetLoan : null;
      const editAmt = isEditTx ? Math.abs(data.amount || 0) : targetLoan ? targetLoan.installmentAmount : '';
      const editNotes = isEditTx && data && data.notes ? data.notes : '';
      if (isEditTx && data && data.dateStr) {
        const parsedDate = parseJalaliDateStr(data.dateStr);
        setPickerDay(parsedDate.day);
        setPickerMonth(parsedDate.month);
        setPickerYear(parsedDate.year);
      } else if (targetLoan) {
        // Automatically calculate next installment date (or 1st installment date)
        const nextInstDate = getInstallmentNextDueDate(targetLoan, transactions);
        setPickerDay(nextInstDate.day);
        setPickerMonth(nextInstDate.month);
        setPickerYear(nextInstDate.year);
      } else {
        setPickerDay(deviceDate.day);
        setPickerMonth(deviceDate.month);
        setPickerYear(deviceDate.year);
      }
      setInstallmentForm({
        id: isEditTx ? data.id : null,
        selectedLoanId: targetLoan ? targetLoan.id : '',
        amount: editAmt,
        notes: editNotes
      });
    } else if (type === 'debt_repayment' || type === 'demand_repayment') {
      const isFromFab = Boolean(data && data.fromFab || mode === 'add' && currentTab === 'dashboard');
      const isEditTx = mode === 'edit' && data && data.id;
      const editAmt = isEditTx ? Math.abs(data.amount || 0) : '';
      const editNotes = isEditTx && data && data.notes ? data.notes : '';
      const passedContactId = isFromFab ? '' : data && data.contactId ? data.contactId : selectedContact ? selectedContact.id : '';
      if (isEditTx && data && data.dateStr) {
        const parsedDate = parseJalaliDateStr(data.dateStr);
        setPickerDay(parsedDate.day);
        setPickerMonth(parsedDate.month);
        setPickerYear(parsedDate.year);
      }
      setDemandDebtForm(prev => ({
        ...prev,
        selectedContactId: passedContactId || '',
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
          iban: data.iban || '',
          profileImage: data.profileImage || null
        });
      } else {
        setContactWizardForm({
          id: null,
          firstName: '',
          lastName: '',
          phone: '',
          bankName: '',
          bankCard: '',
          iban: '',
          profileImage: null
        });
      }
    }
    setIsFinalSubmitting(false);
    setShowPlusMenu(false);
    if (window.ReactDOM && window.ReactDOM.flushSync) {
      window.ReactDOM.flushSync(() => {
        setShowStackWizard(true);
      });
      const activeCardNode = document.querySelector('.stack-wizard-overlay .stack-card[data-depth="0"]');
      if (activeCardNode) {
        const targetInput = activeCardNode.querySelector('input[autofocus]') || activeCardNode.querySelector('input:not([type="hidden"]):not([type="file"]):not([readonly]), textarea:not([readonly])');
        if (targetInput) {
          try {
            targetInput.focus();
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) targetInput.click();
          } catch (e) {}
        }
      }
    } else {
      setShowStackWizard(true);
    }
  };
  const handlePrevCard = () => {
    if (animatingCard || animatingPrevCard) return;
    if (currentCardIdx > 0) {
      const prevIdx = currentCardIdx - 1;
      if (window.ReactDOM && window.ReactDOM.flushSync) {
        window.ReactDOM.flushSync(() => {
          setAnimatingPrevCard(true);
          setCurrentCardIdx(prevIdx);
        });
        const activeCardNode = document.querySelector(`.stack-card[data-depth="0"]`);
        if (activeCardNode) {
          const targetInput = activeCardNode.querySelector('input[autofocus]') || activeCardNode.querySelector('input:not([type="hidden"]):not([type="file"]):not([readonly]), textarea:not([readonly])');
          if (targetInput) {
            try {
              targetInput.focus();
              if ('ontouchstart' in window || navigator.maxTouchPoints > 0) targetInput.click();
            } catch (e) {}
          }
        }
      } else {
        setAnimatingPrevCard(true);
        setCurrentCardIdx(prevIdx);
      }
      setTimeout(() => {
        setAnimatingPrevCard(false);
      }, 750);
    }
  };
  const handleNextCard = cardsList => {
    if (animatingCard || animatingPrevCard) return;
    const triggerCardError = (fieldKey, errorMsg) => {
      setValidationErrors({
        [fieldKey]: errorMsg
      });
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        try {
          navigator.vibrate([15, 30, 15]);
        } catch (e) {}
      }
      const activeCard = cardsList && cardsList[currentCardIdx];
      if (activeCard) {
        setShakeCardId(activeCard.id);
        setTimeout(() => setShakeCardId(null), 450);
      }
      const syncFocus = () => {
        const activeCardNode = document.querySelector(`.stack-card[data-depth="0"]`);
        if (activeCardNode) {
          const targetInput = activeCardNode.querySelector('input[inputmode="numeric"]') || activeCardNode.querySelector('input:not([type="hidden"]):not([type="file"]):not([readonly]), textarea:not([readonly])');
          if (targetInput) {
            try {
              targetInput.focus();
              if ('ontouchstart' in window || navigator.maxTouchPoints > 0) targetInput.click();
            } catch (e) {}
            targetInput.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
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
      if (currentCardIdx === 2) {
        // principal_amount
        const amt = Number(loanForm.principalAmount) || 0;
        if (amt <= 0) {
          triggerCardError('principal_amount', 'لطفاً مبلغ اصل وام را وارد نمایید');
          return;
        }
      }
      if (currentCardIdx === 3) {
        // total_repayment
        const amt = Number(loanForm.totalRepayment) || 0;
        if (amt <= 0) {
          triggerCardError('total_repayment', 'لطفاً مبلغ کل بازپرداخت را وارد نمایید');
          return;
        }
      }
      if (currentCardIdx === 4) {
        // installment_amount
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
      if (currentCardIdx === 1) {
        // demand_amount
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
      if (currentCardIdx === 1) {
        // debt_amount
        const amt = Number(demandDebtForm.amount) || 0;
        if (amt <= 0) {
          triggerCardError('debt_amount', 'لطفاً مبلغ بدهی را وارد نمایید');
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
      if (currentCardIdx === 2) {
        // inst_amount
        const inputAmt = Number(installmentForm.amount) || 0;
        if (inputAmt <= 0) {
          triggerCardError('inst_amount', 'لطفاً مبلغ پرداخت قسط را وارد نمایید');
          return;
        }
        const targetLoan = loans.find(l => l.id === Number(installmentForm.selectedLoanId));
        if (targetLoan) {
          const editingTx = installmentForm.id ? transactions.find(t => t.id === installmentForm.id) : null;
          const editingTxAmt = editingTx && editingTx.loanId === targetLoan.id ? Math.abs(editingTx.amount || 0) : 0;
          const loanPaid = transactions.filter(t => t.loanId === targetLoan.id && t.type === 'repayment').reduce((sum, t) => sum + Math.abs(t.amount || 0), 0);
          const loanPaidExceptCurrent = Math.max(0, loanPaid - editingTxAmt);
          const loanTotal = targetLoan.totalRepayment > 0 ? targetLoan.totalRepayment : targetLoan.principalAmount;
          const loanRemaining = Math.max(0, loanTotal - loanPaidExceptCurrent);
          if (inputAmt > loanRemaining) {
            triggerCardError('inst_amount', `مبلغ پرداختی نمی‌تواند از مانده وام (${formatAppNumber(loanRemaining)} تومان) بیشتر باشد`);
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
      if (currentCardIdx === 1) {
        // debt_repay_amount
        const inputAmt = Number(repaymentForm.amount) || 0;
        if (inputAmt <= 0) {
          triggerCardError('debt_repay_amount', 'لطفاً مبلغ بازپرداخت بدهی را وارد نمایید');
          return;
        }
        const targetContact = contacts.find(c => c.id === Number(demandDebtForm.selectedContactId));
        const editingTx = repaymentForm.id ? transactions.find(t => t.id === repaymentForm.id) : null;
        const editingTxAmt = editingTx ? Math.abs(editingTx.amount || 0) : 0;
        const totalDebt = (targetContact ? targetContact.totalDebt || 0 : 0) + editingTxAmt;
        if (inputAmt > totalDebt) {
          triggerCardError('debt_repay_amount', `مبلغ پرداختی نمی‌تواند از کل بدهی (${formatAppNumber(totalDebt)} تومان) بیشتر باشد`);
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
      if (currentCardIdx === 1) {
        // demand_repay_amount
        const inputAmt = Number(repaymentForm.amount) || 0;
        if (inputAmt <= 0) {
          triggerCardError('demand_repay_amount', 'لطفاً مبلغ دریافتی را وارد نمایید');
          return;
        }
        const targetContact = contacts.find(c => c.id === Number(demandDebtForm.selectedContactId));
        const editingTx = repaymentForm.id ? transactions.find(t => t.id === repaymentForm.id) : null;
        const editingTxAmt = editingTx ? Math.abs(editingTx.amount || 0) : 0;
        const totalDemand = (targetContact ? targetContact.totalDemand || 0 : 0) + editingTxAmt;
        if (inputAmt > totalDemand) {
          triggerCardError('demand_repay_amount', `مبلغ دریافتی نمی‌تواند از کل طلب (${formatAppNumber(totalDemand)} تومان) بیشتر باشد`);
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
      if (window.ReactDOM && window.ReactDOM.flushSync) {
        window.ReactDOM.flushSync(() => {
          setAnimatingCard(true);
          setCurrentCardIdx(nextIdx);
        });
        const activeCardNode = document.querySelector(`.stack-card[data-depth="0"]`);
        if (activeCardNode) {
          const targetInput = activeCardNode.querySelector('input[autofocus]') || activeCardNode.querySelector('input:not([type="hidden"]):not([type="file"]):not([readonly]), textarea:not([readonly])');
          if (targetInput) {
            try {
              targetInput.focus();
              if ('ontouchstart' in window || navigator.maxTouchPoints > 0) targetInput.click();
            } catch (e) {}
          }
        }
      } else {
        setAnimatingCard(true);
        setCurrentCardIdx(nextIdx);
      }
      setTimeout(() => {
        setAnimatingCard(false);
      }, 850);
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
      const userCustomInst = loanForm.customInstallmentCount !== undefined && loanForm.customInstallmentCount !== '' ? Number(loanForm.customInstallmentCount) : 0;
      const calcTotalInst = userCustomInst > 0 ? userCustomInst : instAmt > 0 ? Math.ceil(totalRepay / instAmt) : 12;
      const startDateFormatted = `${pickerYear}/${String(jalaliMonths.indexOf(pickerMonth) + 1).padStart(2, '0')}/${String(pickerDay).padStart(2, '0')}`;
      const firstInstDay = loanForm.firstInstallmentDay || loanForm.dueDayOfMonth || pickerDay;
      const firstInstMonth = loanForm.firstInstallmentMonth || pickerMonth;
      const firstInstYear = loanForm.firstInstallmentYear || pickerYear;
      const firstInstallmentDateStr = `${firstInstDay} ${firstInstMonth} ${firstInstYear}`;
      if (wizardMode === 'edit' && loanForm.id) {
        const existingLoan = loans.find(l => String(l.id) === String(loanForm.id));
        const oldTitle = existingLoan ? (existingLoan.title || '').trim() : '';
        const newTitle = (loanForm.title || 'وام جدید').trim();
        const updatedLoans = loans.map(l => {
          if (String(l.id) === String(loanForm.id)) {
            return {
              ...l,
              title: newTitle,
              icon: loanForm.icon,
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

        // Propagate loan title updates to all associated transactions (including past installments, dashboard, and all-transactions)
        setTransactions(prevTxs => prevTxs.map(t => {
          if (String(t.loanId) === String(loanForm.id)) {
            let updatedTitle = t.title || '';
            if (oldTitle && updatedTitle.includes(oldTitle)) {
              updatedTitle = updatedTitle.split(oldTitle).join(newTitle);
            } else if (t.installmentNum || t.installmentNumber) {
              const instN = t.installmentNum || t.installmentNumber;
              updatedTitle = `پرداخت قسط شماره ${instN} - ${newTitle}`;
            } else if (t.type === 'repayment') {
              updatedTitle = `پرداخت قسط - ${newTitle}`;
            } else if (t.type === 'loan_creation') {
              updatedTitle = `ثبت وام ${newTitle}`;
            }
            return {
              ...t,
              loanTitle: newTitle,
              title: updatedTitle,
              loan: t.loan ? {
                ...t.loan,
                title: newTitle
              } : t.loan
            };
          }
          return t;
        }));
        const currentUpdated = updatedLoans.find(l => String(l.id) === String(loanForm.id));
        if (currentUpdated) setSelectedLoan(currentUpdated);
        showToast('پرونده وام و تراکنش‌های آن با موفقیت بروزرسانی شد');
      } else {
        const newLoan = {
          id: Date.now(),
          title: loanForm.title || 'وام جدید',
          icon: loanForm.icon,
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
              return {
                ...c,
                totalDemand: Math.max(0, (c.totalDemand || 0) + diff)
              };
            }
            return c;
          });
          setContacts(updatedContacts);
          if (selectedContact && selectedContact.id === targetContact.id) {
            setSelectedContact(prev => ({
              ...prev,
              totalDemand: Math.max(0, (prev.totalDemand || 0) + diff)
            }));
          }
        }
        const updatedTxs = transactions.map(t => {
          if (t.id === demandDebtForm.id) {
            return {
              ...t,
              amount: amt,
              dateStr,
              notes: demandDebtForm.notes
            };
          }
          return t;
        });
        setTransactions(updatedTxs);
        showToast('اطلاعات طلب با موفقیت به‌روزرسانی شد');
      } else if (wizardMode === 'edit' && !demandDebtForm.id && targetContact) {
        const updatedContacts = contacts.map(c => {
          if (c.id === targetContact.id) {
            return {
              ...c,
              totalDemand: amt
            };
          }
          return c;
        });
        setContacts(updatedContacts);
        if (selectedContact && selectedContact.id === targetContact.id) {
          setSelectedContact(prev => ({
            ...prev,
            totalDemand: amt
          }));
        }
        showToast('مبلغ طلب به‌روزرسانی شد');
      } else {
        if (targetContact) {
          const updatedContacts = contacts.map(c => {
            if (c.id === targetContact.id) {
              return {
                ...c,
                totalDemand: (c.totalDemand || 0) + amt
              };
            }
            return c;
          });
          setContacts(updatedContacts);
          if (selectedContact && selectedContact.id === targetContact.id) {
            setSelectedContact(prev => ({
              ...prev,
              totalDemand: (prev.totalDemand || 0) + amt
            }));
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
              return {
                ...c,
                totalDebt: Math.max(0, (c.totalDebt || 0) + diff)
              };
            }
            return c;
          });
          setContacts(updatedContacts);
          if (selectedContact && selectedContact.id === targetContact.id) {
            setSelectedContact(prev => ({
              ...prev,
              totalDebt: Math.max(0, (prev.totalDebt || 0) + diff)
            }));
          }
        }
        const updatedTxs = transactions.map(t => {
          if (t.id === demandDebtForm.id) {
            return {
              ...t,
              amount: -amt,
              dateStr,
              notes: demandDebtForm.notes
            };
          }
          return t;
        });
        setTransactions(updatedTxs);
        showToast('اطلاعات بدهی با موفقیت به‌روزرسانی شد');
      } else if (wizardMode === 'edit' && !demandDebtForm.id && targetContact) {
        const updatedContacts = contacts.map(c => {
          if (c.id === targetContact.id) {
            return {
              ...c,
              totalDebt: amt
            };
          }
          return c;
        });
        setContacts(updatedContacts);
        if (selectedContact && selectedContact.id === targetContact.id) {
          setSelectedContact(prev => ({
            ...prev,
            totalDebt: amt
          }));
        }
        showToast('مبلغ بدهی به‌روزرسانی شد');
      } else {
        if (targetContact) {
          const updatedContacts = contacts.map(c => {
            if (c.id === targetContact.id) {
              return {
                ...c,
                totalDebt: (c.totalDebt || 0) + amt
              };
            }
            return c;
          });
          setContacts(updatedContacts);
          if (selectedContact && selectedContact.id === targetContact.id) {
            setSelectedContact(prev => ({
              ...prev,
              totalDebt: (prev.totalDebt || 0) + amt
            }));
          }
        }
        const newTx = {
          id: Date.now(),
          contactId: targetContact ? targetContact.id : null,
          type: 'debt',
          title: `ثبت بدهی جدید ${targetContact ? 'به ' + targetContact.firstName + ' ' + targetContact.lastName : ''}`.trim(),
          dateStr: dateStr,
          amount: -amt,
          notes: demandDebtForm.notes,
          isPositive: false
        };
        setTransactions([newTx, ...transactions]);
        showToast('بدهی جدید با موفقیت ثبت گردید');
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
          contactId: selectedContact ? selectedContact.id : targetLoan ? targetLoan.contactId : null,
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
              return {
                ...c,
                totalDebt: newDebt
              };
            }
            return c;
          });
          setContacts(updatedContacts);
          if (selectedContact && selectedContact.id === targetContact.id) {
            setSelectedContact(prev => ({
              ...prev,
              totalDebt: newDebt
            }));
          }
        }
        const updatedTxs = transactions.map(t => {
          if (t.id === repaymentForm.id) {
            return {
              ...t,
              amount: amt,
              dateStr: dateStr,
              notes: repaymentForm.notes
            };
          }
          return t;
        });
        setTransactions(updatedTxs);
        showToast('بازپرداخت بدهی با موفقیت به‌روزرسانی شد');
      } else if (targetContact) {
        const newDebt = Math.max(0, (targetContact.totalDebt || 0) - amt);
        const updatedContacts = contacts.map(c => {
          if (c.id === targetContact.id) {
            return {
              ...c,
              totalDebt: newDebt
            };
          }
          return c;
        });
        setContacts(updatedContacts);
        if (selectedContact && selectedContact.id === targetContact.id) {
          setSelectedContact(prev => ({
            ...prev,
            totalDebt: newDebt
          }));
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
            cycleTxs.forEach(t => {
              if (t.type === 'debt') totalCycleAmt += Math.abs(t.amount);
            });
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
            const archivedTxs = updatedAllTxs.map(t => cycleTxs.some(cTx => cTx.id === t.id) ? {
              ...t,
              periodId
            } : t);
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
              return {
                ...c,
                totalDemand: newDemand
              };
            }
            return c;
          });
          setContacts(updatedContacts);
          if (selectedContact && selectedContact.id === targetContact.id) {
            setSelectedContact(prev => ({
              ...prev,
              totalDemand: newDemand
            }));
          }
        }
        const updatedTxs = transactions.map(t => {
          if (t.id === repaymentForm.id) {
            return {
              ...t,
              amount: -amt,
              dateStr: dateStr,
              notes: repaymentForm.notes
            };
          }
          return t;
        });
        setTransactions(updatedTxs);
        showToast('بازپرداخت طلب با موفقیت به‌روزرسانی شد');
      } else if (targetContact) {
        const newDemand = Math.max(0, (targetContact.totalDemand || 0) - amt);
        const updatedContacts = contacts.map(c => {
          if (c.id === targetContact.id) {
            return {
              ...c,
              totalDemand: newDemand
            };
          }
          return c;
        });
        setContacts(updatedContacts);
        if (selectedContact && selectedContact.id === targetContact.id) {
          setSelectedContact(prev => ({
            ...prev,
            totalDemand: newDemand
          }));
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
            cycleTxs.forEach(t => {
              if (t.type === 'demand') totalCycleAmt += Math.abs(t.amount);
            });
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
            const archivedTxs = updatedAllTxs.map(t => cycleTxs.some(cTx => cTx.id === t.id) ? {
              ...t,
              periodId
            } : t);
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
              iban: ib,
              profileImage: contactWizardForm.profileImage
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
          profileImage: contactWizardForm.profileImage,
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
  const focusCardElementInput = cardId => {
    const cardElem = document.getElementById(`sticky-card-${cardId}`);
    if (cardElem) {
      const targetInput = cardElem.querySelector('input[autofocus]') || cardElem.querySelector('input:not([type="hidden"]):not([type="file"]):not([readonly]):not([type="radio"]):not([type="checkbox"]), textarea:not([readonly]), select');
      if (targetInput) {
        try {
          targetInput.focus({
            preventScroll: true
          });
          if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            targetInput.click();
          }
        } catch (e) {}
        return true;
      }
    }
    return false;
  };
  const startEditingCard = card => {
    setEditingCardId(card.id);
    setCardFormBackup({
      loanForm: {
        ...loanForm
      },
      demandDebtForm: {
        ...demandDebtForm
      },
      installmentForm: {
        ...installmentForm
      },
      repaymentForm: {
        ...repaymentForm
      },
      contactWizardForm: {
        ...contactWizardForm
      },
      pickerDay,
      pickerMonth,
      pickerYear
    });
  };
  const handleStartEditingCard = card => {
    if (editingCardId !== null) return;

    // 1. Immediately enter editing mode synchronously to preserve user gesture context for keyboard
    startEditingCard(card);

    // 2. Immediately focus the input on the user tap/click stack
    focusCardElementInput(card.id);
    const container = editCardsContainerRef.current;
    const cardElem = document.getElementById(`sticky-card-${card.id}`);
    if (container && cardElem) {
      const cards = typeof getCurrentWizardCards === 'function' ? getCurrentWizardCards() : [];
      const cardIndex = cards.findIndex(c => c.id === card.id);
      const topOffset = cardIndex >= 0 ? cardIndex * 8 : 0;
      const targetScrollTop = Math.max(0, cardElem.offsetTop - topOffset);

      // 3. Smoothly glide card to its docked position at the top of the stack
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  };

  // Automatically focus and show keyboard when a sticky card enters edit mode
  useEffect(() => {
    if (editingCardId) {
      const focusCardInput = () => {
        focusCardElementInput(editingCardId);
      };
      focusCardInput();
      const r1 = requestAnimationFrame(focusCardInput);
      const t1 = setTimeout(focusCardInput, 40);
      const t2 = setTimeout(focusCardInput, 150);
      const t3 = setTimeout(focusCardInput, 280);
      return () => {
        cancelAnimationFrame(r1);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [editingCardId]);
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
  const saveEditingCard = card => {
    const triggerError = (fKey, msg) => {
      setValidationErrors({
        [fKey]: msg
      });
      setShakeCardId(card.id);
      setTimeout(() => setShakeCardId(null), 450);
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        try {
          navigator.vibrate([15, 30, 15]);
        } catch (e) {}
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
    setNewContactForm({
      firstName: '',
      lastName: '',
      phone: '',
      bankName: '',
      bankCard: '',
      iban: ''
    });
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
      details: [`${contactLoans.length} پرونده وام`, `${contactTxs.length} تراکنش مرتبط`],
      iconName: 'trash-2',
      iconBgColor: 'bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400',
      confirmLabel: 'حذف مخاطب',
      cancelLabel: 'انصراف',
      isDestructive: true,
      onConfirm: () => {
        if (typeof confirmCb === 'function') confirmCb();
        setContacts(prev => prev.filter(c => String(c.id) !== String(targetContactId)));
        setLoans(prev => prev.filter(l => String(l.contactId) !== String(targetContactId)));
        setTransactions(prev => prev.filter(t => String(t.contactId) !== String(targetContactId)));
        setShowEditContactModal(false);
        if (selectedContact && String(selectedContact.id) === String(targetContactId)) {
          setSelectedContact(null);
          navigateToTab('contacts', 'back');
        }
        setConfirmConfig(null);
        triggerUndo('مخاطب با موفقیت حذف گردید');
      },
      onCancel: () => setConfirmConfig(null)
    });
  };
  const handleDeleteLoanClick = (loan, confirmCb = null) => {
    if (!loan || typeof loan !== 'object') return;
    const loanTxs = transactions.filter(t => String(t.loanId) === String(loan.id));
    const paymentTxs = loanTxs.filter(t => t.type === 'repayment');
    const totalInstallmentsCount = loan.totalInstallments || loanTxs.length || 0;
    setConfirmConfig({
      title: 'حذف پرونده وام',
      message: 'این وام شامل تاریخچه اقساط و تراکنش‌های مربوطه می‌باشد. حذف این وام، تمامی رکوردهای مرتبط را به صورت دائمی پاک خواهد کرد. این عملیات قابل بازگشت نیست.',
      details: [`${totalInstallmentsCount} قسط`, `${paymentTxs.length} پرداخت ثبت‌شده`, `${loanTxs.length} تراکنش مرتبط`],
      iconName: 'trash-2',
      iconBgColor: 'bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400',
      confirmLabel: 'حذف',
      cancelLabel: 'انصراف',
      isDestructive: true,
      onConfirm: () => {
        if (typeof confirmCb === 'function') confirmCb();
        const loanIdToDelete = loan.id;
        setLoans(prev => prev.filter(l => String(l.id) !== String(loanIdToDelete)));
        setTransactions(prev => prev.filter(t => String(t.loanId) !== String(loanIdToDelete)));
        setSelectedLoan(null);
        navigateToTab(loanReturnTab || 'accounts', 'back');
        setConfirmConfig(null);
        triggerUndo('پرونده وام با موفقیت حذف گردید');
      },
      onCancel: () => setConfirmConfig(null)
    });
  };
  const handleDeleteArchivedPeriodClick = period => {
    if (!period) return;
    let periodTxs = transactions.filter(t => String(t.periodId) === String(period.id));
    if (periodTxs.length === 0 && period.transactions && period.transactions.length > 0) {
      periodTxs = period.transactions;
    }
    const repaymentTxs = periodTxs.filter(t => t.type === 'demand_repayment' || t.type === 'debt_repayment');
    const startDateFormatted = formatDateToNumericJalali(period.startDate) || 'نامشخص';
    const endDateFormatted = formatDateToNumericJalali(period.endDate) || 'امروز';
    setConfirmConfig({
      title: 'حذف تسویه‌حساب آرشیو شده',
      message: 'این تسویه‌حساب آرشیو شده شامل تاریخچه کامل تراکنش‌ها می‌باشد. حذف آن، تسویه‌حساب و تمامی تراکنش‌های مربوطه را به صورت دائمی پاک خواهد کرد. این عملیات قابل بازگشت نیست.',
      details: [`${periodTxs.length} تراکنش مرتبط`, `${repaymentTxs.length} بازپرداخت/دریافت ثبت‌شده`, `دوره: ${startDateFormatted} تا ${endDateFormatted}`],
      iconName: 'trash-2',
      iconBgColor: 'bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400',
      confirmLabel: 'حذف',
      cancelLabel: 'انصراف',
      isDestructive: true,
      onConfirm: () => {
        const periodIdToDelete = period.id;
        setCompletedPeriods(prev => prev.filter(p => String(p.id) !== String(periodIdToDelete)));
        setTransactions(prev => prev.filter(t => String(t.periodId) !== String(periodIdToDelete)));
        setSelectedPeriod(null);
        navigateToTab(loanReturnTab || 'contact-detail', 'back');
        setConfirmConfig(null);
        triggerUndo('تسویه‌حساب آرشیو شده با موفقیت حذف گردید');
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
    const nameMatch = fullName.includes(searchQuery.toLowerCase()) || c.phone && c.phone.includes(searchQuery);
    if (!nameMatch) return false;
    if (contactFilter === 'demand') return c.totalDemand > 0;
    if (contactFilter === 'debt') return c.totalDebt > 0;
    if (contactFilter === 'loan') {
      const contactLoans = loans.filter(l => l.contactId === c.id);
      return contactLoans.some(l => !getLoanNextDueInfo(l, transactions).isCompleted && (l.remainingAmount === undefined || l.remainingAmount > 0));
    }
    if (contactFilter === 'settled') {
      const contactLoans = loans.filter(l => l.contactId === c.id);
      const hasSettledLoan = contactLoans.some(l => getLoanNextDueInfo(l, transactions).isCompleted || l.remainingAmount !== undefined && l.remainingAmount <= 0);
      const hasSettledDemand = getSettledPeriodCount(c.id, 'demand') > 0;
      const hasSettledDebt = getSettledPeriodCount(c.id, 'debt') > 0;
      return hasSettledLoan || hasSettledDemand || hasSettledDebt;
    }
    if (contactFilter === 'favorite') return c.isFavorite;
    return true;
  });

  // Card Deck Lists for Wizards
  const loanWizardCards = [{
    id: 'title_contact',
    title: 'عنوان وام و مخاطب',
    render: () => /*#__PURE__*/<div className="space-y-4">{/*#__PURE__*/<div>{/*#__PURE__*/<label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">عنوان وام</label>}{/*#__PURE__*/<div className="flex gap-2">{/*#__PURE__*/<input type="text" placeholder=":     " value={loanForm.title} onChange={e => {
            const val = e.target.value;
            setLoanForm(prev => ({
              ...prev,
              title: val
            }));
            if (val.trim()) {
              setValidationErrors(errs => {
                const {
                  loan_title,
                  ...rest
                } = errs;
                return rest;
              });
            }
          }} className={`flex-1 min-w-0 bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-xs focus:outline-none transition-all ${validationErrors.loan_title ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500'}`} />}{/*#__PURE__*/<button type="button" onClick={() => setShowLoanIconSelector(true)} className="w-[46px] h-[46px] bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all shrink-0">{/*#__PURE__*/<Icon name={loanForm.icon || 'landmark'} className="w-5 h-5" />}</button>}</div>}{validationErrors.loan_title && /*#__PURE__*/<p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>{validationErrors.loan_title}</span>}</p>}</div>}{/*#__PURE__*/<ContactSelectorCard contacts={contacts} selectedContactId={loanForm.selectedContactId} onSelect={c => {
        setLoanForm(prev => ({
          ...prev,
          selectedContactId: c.id,
          contactName: `${c.firstName} ${c.lastName}`
        }));
        setValidationErrors(errs => {
          const {
            loan_contact,
            ...rest
          } = errs;
          return rest;
        });
      }} error={validationErrors.loan_contact} wizardType="loan" wizardMode={wizardMode} />}</div>
  }, {
    id: 'start_date',
    title: 'زمان دریافت وام',
    render: () => /*#__PURE__*/<FullJalaliDatePicker day={pickerDay} month={pickerMonth} year={pickerYear} onChange={({
      day,
      month,
      year
    }) => {
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
    }} />
  }, {
    id: 'principal_amount',
    title: 'مبلغ اصل وام',
    render: () => /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">مبلغ اصل وامی که دریافت کرده‌اید (تومان):</label>}{/*#__PURE__*/<input type="text" inputMode="numeric" placeholder=": ,," value={formatWithCommas(loanForm.principalAmount)} onChange={e => {
        const raw = parseRawNumber(e.target.value);
        setLoanForm(prev => ({
          ...prev,
          principalAmount: raw
        }));
        if (Number(raw) > 0) {
          setValidationErrors(errs => {
            const {
              principal_amount,
              ...rest
            } = errs;
            return rest;
          });
        }
      }} className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${validationErrors.principal_amount ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700'}`} />}{validationErrors.principal_amount && /*#__PURE__*/<p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>{validationErrors.principal_amount}</span>}</p>}{loanForm.principalAmount && Number(loanForm.principalAmount) > 0 && /*#__PURE__*/<div className="space-y-1.5 mt-2">{/*#__PURE__*/<div className="text-xs text-indigo-600 font-bold text-left ltr font-mono">{formatAppNumber(loanForm.principalAmount)} تومان</div>}{/*#__PURE__*/<div className="p-2.5 bg-indigo-50/80 dark:bg-indigo-950/60 rounded-xl text-xs font-bold text-indigo-900 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800/40">{numToPersianWords(loanForm.principalAmount)}</div>}</div>}</div>
  }, {
    id: 'total_repayment',
    title: 'مبلغ کل بازپرداخت',
    render: () => /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">مجموع کل مبلغ بازپرداخت شامل اصل و کارمزد:</label>}{/*#__PURE__*/<input type="text" inputMode="numeric" placeholder=": ,," value={formatWithCommas(loanForm.totalRepayment)} onChange={e => {
        const raw = parseRawNumber(e.target.value);
        setLoanForm(prev => ({
          ...prev,
          totalRepayment: raw
        }));
        if (Number(raw) > 0) {
          setValidationErrors(errs => {
            const {
              total_repayment,
              ...rest
            } = errs;
            return rest;
          });
        }
      }} className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${validationErrors.total_repayment ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700'}`} />}{validationErrors.total_repayment && /*#__PURE__*/<p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>{validationErrors.total_repayment}</span>}</p>}{loanForm.totalRepayment && Number(loanForm.totalRepayment) > 0 && /*#__PURE__*/<div className="space-y-1.5 mt-2">{/*#__PURE__*/<div className="text-xs text-indigo-600 font-bold text-left ltr font-mono">{formatAppNumber(loanForm.totalRepayment)} تومان</div>}{/*#__PURE__*/<div className="p-2.5 bg-indigo-50/80 dark:bg-indigo-950/60 rounded-xl text-xs font-bold text-indigo-900 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800/40">{numToPersianWords(loanForm.totalRepayment)}</div>}</div>}</div>
  }, {
    id: 'installment_amount',
    title: 'مبلغ هر قسط',
    render: () => /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">مبلغ هر قسط ماهانه (تومان):</label>}{/*#__PURE__*/<input type="text" inputMode="numeric" placeholder=": ,," value={formatWithCommas(loanForm.installmentAmount)} onChange={e => {
        const raw = parseRawNumber(e.target.value);
        setLoanForm(prev => ({
          ...prev,
          installmentAmount: raw
        }));
        if (Number(raw) > 0) {
          setValidationErrors(errs => {
            const {
              installment_amount,
              ...rest
            } = errs;
            return rest;
          });
        }
      }} className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${validationErrors.installment_amount ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700'}`} />}{validationErrors.installment_amount && /*#__PURE__*/<p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>{validationErrors.installment_amount}</span>}</p>}{loanForm.installmentAmount && Number(loanForm.installmentAmount) > 0 && /*#__PURE__*/<div className="p-2.5 bg-indigo-50/80 dark:bg-indigo-950/60 rounded-xl text-xs font-bold text-indigo-900 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800/40 mt-1.5">{numToPersianWords(loanForm.installmentAmount)}</div>}{loanForm.installmentAmount && Number(loanForm.installmentAmount) > 0 && (() => {
        const baseAmount = Number(loanForm.totalRepayment) > 0 ? Number(loanForm.totalRepayment) : Number(loanForm.principalAmount);
        const instAmt = Number(loanForm.installmentAmount);
        if (baseAmount > 0 && instAmt > 0) {
          const defaultNumInst = Math.ceil(baseAmount / instAmt);
          const hasCustom = loanForm.customInstallmentCount !== undefined && loanForm.customInstallmentCount !== '';
          const displayVal = hasCustom ? loanForm.customInstallmentCount : String(defaultNumInst);
          const currentNumInst = hasCustom && !isNaN(Number(loanForm.customInstallmentCount)) && Number(loanForm.customInstallmentCount) > 0 ? Number(loanForm.customInstallmentCount) : defaultNumInst;
          const totalCalc = currentNumInst * instAmt;
          const diff = totalCalc - baseAmount;
          return /*#__PURE__*/<div className="space-y-2 mt-2">{/*#__PURE__*/<div className="p-2.5 bg-indigo-50/70 dark:bg-indigo-950/50 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/50 flex items-center justify-between gap-2">{/*#__PURE__*/<span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 shrink-0">تعداد کل اقساط:</span>}{/*#__PURE__*/<div className="flex items-center space-x-1.5 space-x-reverse">{/*#__PURE__*/<button type="button" onClick={() => {
                  const cur = Number(displayVal) || defaultNumInst;
                  const newVal = Math.max(1, cur - 1);
                  setLoanForm(prev => ({
                    ...prev,
                    customInstallmentCount: String(newVal)
                  }));
                }} className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 font-extrabold text-lg flex items-center justify-center shadow-2xs hover:bg-indigo-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer shrink-0">-</button>}{/*#__PURE__*/<div className="relative w-16 h-9 flex items-center">{/*#__PURE__*/<input type="text" inputMode="numeric" dir="ltr" placeholder="" value={displayVal} onChange={e => {
                    const raw = parseRawNumber(e.target.value);
                    setLoanForm(prev => ({
                      ...prev,
                      customInstallmentCount: raw
                    }));
                  }} onBlur={() => {
                    if (loanForm.customInstallmentCount === '') {
                      setLoanForm(prev => ({
                        ...prev,
                        customInstallmentCount: undefined
                      }));
                    }
                  }} className="w-full h-full text-center font-mono bg-white dark:bg-slate-900 border-2 border-indigo-400 dark:border-indigo-600 rounded-xl px-1 text-sm font-black text-indigo-700 dark:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-300 dark:placeholder:text-slate-600 placeholder:font-normal" />}</div>}{/*#__PURE__*/<button type="button" onClick={() => {
                  const cur = Number(displayVal) || defaultNumInst;
                  const newVal = cur + 1;
                  setLoanForm(prev => ({
                    ...prev,
                    customInstallmentCount: String(newVal)
                  }));
                }} className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 font-extrabold text-lg flex items-center justify-center shadow-2xs hover:bg-indigo-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer shrink-0">+</button>}{/*#__PURE__*/<button type="button" onClick={() => {
                  setLoanForm(prev => ({
                    ...prev,
                    customInstallmentCount: undefined
                  }));
                  showToast('تعداد اقساط مجدداً طبق فرمول محاسبه شد');
                }} title="     " className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-2xs hover:bg-emerald-100 dark:hover:bg-emerald-900/50 active:scale-95 transition-all cursor-pointer shrink-0">{/*#__PURE__*/<Icon name="rotate-cw" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}</button>}</div>}</div>}{diff === 0 ? /*#__PURE__*/<div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between shadow-2xs">{/*#__PURE__*/<div className="flex items-center space-x-1.5 space-x-reverse">{/*#__PURE__*/<Icon name="check-circle-2" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}{/*#__PURE__*/<span>تراز مالی اقساط:</span>}</div>}{/*#__PURE__*/<span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400">تراز دقیق (بدون باقیمانده)</span>}</div> : diff > 0 ? /*#__PURE__*/<div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 rounded-xl text-xs font-bold text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800 flex items-center justify-between shadow-2xs">{/*#__PURE__*/<div className="flex items-center space-x-1.5 space-x-reverse">{/*#__PURE__*/<Icon name="info" className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />}{/*#__PURE__*/<span>تراز مالی باقیمانده (اضافه):</span>}</div>}{/*#__PURE__*/<span className="font-mono text-xs dir-ltr font-black text-blue-700 dark:text-blue-300">+{formatAppNumber(diff)} تومان</span>}</div> : /*#__PURE__*/<div className="p-2.5 bg-rose-50 dark:bg-rose-950/60 rounded-xl text-xs font-bold text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800 flex items-center justify-between shadow-2xs">{/*#__PURE__*/<div className="flex items-center space-x-1.5 space-x-reverse">{/*#__PURE__*/<Icon name="alert-triangle" className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />}{/*#__PURE__*/<span>تراز مالی باقیمانده (کسری):</span>}</div>}{/*#__PURE__*/<span className="font-mono text-xs dir-ltr font-black text-rose-600 dark:text-rose-400">{formatAppNumber(diff)} تومان</span>}</div>}</div>;
        }
        return null;
      })()}</div>
  }, {
    id: 'due_date',
    title: 'تاریخ اولین قسط وام',
    render: () => {
      const activeDueDay = loanForm.firstInstallmentDay || loanForm.dueDayOfMonth || pickerDay;
      const curMonthName = loanForm.firstInstallmentMonth || pickerMonth;
      const curYear = loanForm.firstInstallmentYear !== undefined && loanForm.firstInstallmentYear !== null && loanForm.firstInstallmentYear !== '' ? loanForm.firstInstallmentYear : pickerYear;
      const rawYearNum = parseInt(toEnglishDigits(String(curYear)).replace(/\D/g, ''), 10);
      const activeYear = !isNaN(rawYearNum) && rawYearNum > 1300 && rawYearNum < 1500 ? rawYearNum : pickerYear || 1403;
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
      return /*#__PURE__*/<div className="space-y-2">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">تاریخ و ماه اولین قسط وام:</label>}{/*#__PURE__*/<div className="bg-[#F4F7FC] dark:bg-slate-900 rounded-2xl p-2.5 border border-slate-200 dark:border-slate-800 space-y-2">{/*#__PURE__*/<div className="p-2 bg-indigo-50/90 dark:bg-indigo-950/70 rounded-xl border border-indigo-200/80 dark:border-indigo-800/60 flex items-center justify-between shadow-2xs">{/*#__PURE__*/<button type="button" onClick={handlePrevMonth} title=" " className="p-1 rounded-lg bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 shadow-2xs hover:bg-indigo-100 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center cursor-pointer shrink-0">{/*#__PURE__*/<Icon name="chevron-right" className="w-4 h-4" />}</button>}{/*#__PURE__*/<div className="text-center min-w-0 px-2 flex flex-col items-center">{/*#__PURE__*/<div className="text-[9px] text-indigo-700/80 dark:text-indigo-300/80 font-bold">ماه و سال اولین قسط</div>}{/*#__PURE__*/<div className="flex items-center justify-center gap-1.5 mt-0.5">{/*#__PURE__*/<span className="text-xs sm:text-sm font-extrabold text-indigo-900 dark:text-indigo-100">{curMonthName}</span>}{/*#__PURE__*/<input type="text" inputMode="numeric" pattern="[0-9]*" dir="ltr" value={curYear} onFocus={e => e.target.select()} onClick={e => e.target.select()} onChange={e => {
                  const raw = toEnglishDigits(e.target.value).replace(/\D/g, '');
                  const clean = raw.slice(0, 4);
                  setLoanForm(prev => ({
                    ...prev,
                    firstInstallmentYear: clean ? clean.length === 4 ? parseInt(clean, 10) : clean : ''
                  }));
                }} onBlur={() => {
                  const num = parseInt(toEnglishDigits(String(loanForm.firstInstallmentYear)).replace(/\D/g, ''), 10);
                  if (isNaN(num) || num < 1300 || num > 1500) {
                    setLoanForm(prev => ({
                      ...prev,
                      firstInstallmentYear: activeYear
                    }));
                  } else {
                    setLoanForm(prev => ({
                      ...prev,
                      firstInstallmentYear: num
                    }));
                  }
                }} className="w-14 h-6 text-center font-extrabold text-xs text-indigo-900 dark:text-indigo-100 bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-600 rounded-md shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono transition-all cursor-pointer" title="    " />}</div>}</div>}{/*#__PURE__*/<button type="button" onClick={handleNextMonth} title=" " className="p-1 rounded-lg bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 shadow-2xs hover:bg-indigo-100 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center cursor-pointer shrink-0">{/*#__PURE__*/<Icon name="chevron-left" className="w-4 h-4" />}</button>}</div>}{/*#__PURE__*/<div className="p-1.5 bg-blue-50/80 dark:bg-indigo-900/40 rounded-xl text-center text-xs font-bold text-blue-800 dark:text-blue-200 border border-blue-200/60 dark:border-indigo-800/40 shadow-2xs flex items-center justify-center space-x-1.5 space-x-reverse">{/*#__PURE__*/<span>سررسید اولین قسط:</span>}{/*#__PURE__*/<span className="font-mono text-xs tracking-wider font-extrabold dir-ltr text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-700 shadow-2xs">{formattedDueDateStr}</span>}</div>}{/*#__PURE__*/<div className="grid grid-cols-7 gap-1 text-center text-xs font-bold pt-0.5">{Array.from({
              length: 31
            }, (_, i) => i + 1).map(day => /*#__PURE__*/<button key={day} type="button" onClick={() => setLoanForm(prev => ({
              ...prev,
              dueDayOfMonth: day,
              firstInstallmentDay: day
            }))} className={`h-6 sm:h-6.5 rounded-lg flex items-center justify-center transition-all cursor-pointer ${activeDueDay === day ? 'bg-indigo-600 text-white font-black shadow-md scale-105' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>{day}</button>)}</div>}</div>}</div>;
    }
  }, {
    id: 'notes',
    title: 'توضیحات تکمیلی',
    render: () => /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500">یادداشت یا توضیحات اضافی برای این پرونده وام:</label>}{/*#__PURE__*/<textarea rows="3" placeholder="      ..." value={loanForm.notes} onChange={e => setLoanForm({
        ...loanForm,
        notes: e.target.value
      })} className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs focus:outline-none" />}</div>
  }];
  const demandWizardCards = [{
    id: 'demand_contact',
    title: 'انتخاب مخاطب',
    render: () => /*#__PURE__*/<ContactSelectorCard contacts={contacts} selectedContactId={demandDebtForm.selectedContactId} onSelect={c => {
      setDemandDebtForm(prev => ({
        ...prev,
        selectedContactId: c.id
      }));
      setValidationErrors(errs => {
        const {
          demand_contact,
          ...rest
        } = errs;
        return rest;
      });
    }} error={validationErrors.demand_contact} wizardType="demand" wizardMode={wizardMode} />
  }, {
    id: 'demand_amount',
    title: 'مبلغ طلب',
    render: () => /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">مبلغ طلب (تومان):</label>}{/*#__PURE__*/<input type="text" inputMode="numeric" placeholder=": ,," value={formatWithCommas(demandDebtForm.amount)} onChange={e => {
        const raw = parseRawNumber(e.target.value);
        setDemandDebtForm(prev => ({
          ...prev,
          amount: raw
        }));
        if (Number(raw) > 0) {
          setValidationErrors(errs => {
            const {
              demand_amount,
              ...rest
            } = errs;
            return rest;
          });
        }
      }} className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${validationErrors.demand_amount ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700'}`} />}{validationErrors.demand_amount && /*#__PURE__*/<p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>{validationErrors.demand_amount}</span>}</p>}{demandDebtForm.amount && Number(demandDebtForm.amount) > 0 && /*#__PURE__*/<div className="space-y-1.5 mt-2">{/*#__PURE__*/<div className="text-xs text-emerald-600 font-bold text-left ltr font-numeric">{formatAppNumber(demandDebtForm.amount)} تومان</div>}{/*#__PURE__*/<div className="p-2.5 bg-emerald-50/80 dark:bg-emerald-950/60 rounded-xl text-xs font-bold text-emerald-900 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-800/40">{numToPersianWords(demandDebtForm.amount)}</div>}</div>}</div>
  }, {
    id: 'demand_date',
    title: 'تاریخ طلب',
    render: () => /*#__PURE__*/<FullJalaliDatePicker day={pickerDay} month={pickerMonth} year={pickerYear} onChange={({
      day,
      month,
      year
    }) => {
      setPickerDay(day);
      setPickerMonth(month);
      setPickerYear(year);
    }} />
  }, {
    id: 'demand_notes',
    title: 'توضیحات تکمیلی',
    render: () => /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">توضیحات و بابت طلب:</label>}{/*#__PURE__*/<textarea rows="3" placeholder="   ..." value={demandDebtForm.notes} onChange={e => setDemandDebtForm({
        ...demandDebtForm,
        notes: e.target.value
      })} className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs focus:outline-none" />}</div>
  }];
  const debtWizardCards = [{
    id: 'debt_contact',
    title: 'انتخاب مخاطب',
    render: () => /*#__PURE__*/<ContactSelectorCard contacts={contacts} selectedContactId={demandDebtForm.selectedContactId} onSelect={c => {
      setDemandDebtForm(prev => ({
        ...prev,
        selectedContactId: c.id
      }));
      setValidationErrors(errs => {
        const {
          debt_contact,
          ...rest
        } = errs;
        return rest;
      });
    }} error={validationErrors.debt_contact} wizardType="debt" wizardMode={wizardMode} />
  }, {
    id: 'debt_amount',
    title: 'مبلغ بدهی',
    render: () => /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">مبلغ بدهی (تومان):</label>}{/*#__PURE__*/<input type="text" inputMode="numeric" placeholder=": ,," value={formatWithCommas(demandDebtForm.amount)} onChange={e => {
        const raw = parseRawNumber(e.target.value);
        setDemandDebtForm(prev => ({
          ...prev,
          amount: raw
        }));
        if (Number(raw) > 0) {
          setValidationErrors(errs => {
            const {
              debt_amount,
              ...rest
            } = errs;
            return rest;
          });
        }
      }} className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${validationErrors.debt_amount ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700'}`} />}{validationErrors.debt_amount && /*#__PURE__*/<p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>{validationErrors.debt_amount}</span>}</p>}{demandDebtForm.amount && Number(demandDebtForm.amount) > 0 && /*#__PURE__*/<div className="space-y-1.5 mt-2">{/*#__PURE__*/<div className="text-xs text-rose-500 font-bold text-left ltr">{Number(demandDebtForm.amount).toLocaleString()} تومان</div>}{/*#__PURE__*/<div className="p-2.5 bg-rose-50/80 dark:bg-rose-950/60 rounded-xl text-xs font-bold text-rose-900 dark:text-rose-200 border border-rose-200/60 dark:border-rose-800/40">{numToPersianWords(demandDebtForm.amount)}</div>}</div>}</div>
  }, {
    id: 'debt_date',
    title: 'تاریخ بدهی',
    render: () => /*#__PURE__*/<FullJalaliDatePicker day={pickerDay} month={pickerMonth} year={pickerYear} onChange={({
      day,
      month,
      year
    }) => {
      setPickerDay(day);
      setPickerMonth(month);
      setPickerYear(year);
    }} />
  }, {
    id: 'debt_notes',
    title: 'توضیحات تکمیلی',
    render: () => /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">توضیحات تکمیلی:</label>}{/*#__PURE__*/<textarea rows="3" placeholder="  ..." value={demandDebtForm.notes} onChange={e => setDemandDebtForm({
        ...demandDebtForm,
        notes: e.target.value
      })} className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs focus:outline-none" />}</div>
  }];
  const installmentWizardCards = [{
    id: 'inst_select_loan',
    title: 'انتخاب وام',
    render: () => /*#__PURE__*/<LoanSelectorCard loans={loans} transactions={transactions} contacts={contacts} selectedLoanId={installmentForm.selectedLoanId} editingTxId={installmentForm.id} onSelectLoan={l => {
      const nextD = getInstallmentNextDueDate(l, transactions);
      setPickerDay(nextD.day);
      setPickerMonth(nextD.month);
      setPickerYear(nextD.year);
      setInstallmentForm(prev => ({
        ...prev,
        selectedLoanId: l.id,
        amount: l.installmentAmount
      }));
      setValidationErrors(errs => {
        const {
          inst_select_loan,
          ...rest
        } = errs;
        return rest;
      });
    }} error={validationErrors.inst_select_loan} wizardMode={wizardMode} />
  }, {
    id: 'inst_date',
    title: 'تاریخ پرداخت',
    render: () => /*#__PURE__*/<FullJalaliDatePicker day={pickerDay} month={pickerMonth} year={pickerYear} onChange={({
      day,
      month,
      year
    }) => {
      setPickerDay(day);
      setPickerMonth(month);
      setPickerYear(year);
    }} />
  }, {
    id: 'inst_amount',
    title: 'مبلغ پرداخت',
    render: () => {
      const targetLoan = loans.find(l => l.id === Number(installmentForm.selectedLoanId));
      const editingTx = installmentForm.id ? transactions.find(t => t.id === installmentForm.id) : null;
      const editingTxAmt = editingTx && targetLoan && editingTx.loanId === targetLoan.id ? Math.abs(editingTx.amount || 0) : 0;
      const loanPaid = targetLoan ? transactions.filter(t => t.loanId === targetLoan.id && t.type === 'repayment').reduce((sum, t) => sum + Math.abs(t.amount || 0), 0) : 0;
      const loanPaidExceptCurrent = Math.max(0, loanPaid - editingTxAmt);
      const loanTotal = targetLoan ? targetLoan.totalRepayment > 0 ? targetLoan.totalRepayment : targetLoan.principalAmount : 0;
      const loanRemaining = Math.max(0, loanTotal - loanPaidExceptCurrent);
      const inputAmt = Number(installmentForm.amount) || 0;
      const isOver = targetLoan && inputAmt > loanRemaining;
      return /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">مبلغ پرداخت قسط (بارگذاری شده از وام - قابل ویرایش):</label>}{/*#__PURE__*/<input type="text" inputMode="numeric" value={formatWithCommas(installmentForm.amount)} onChange={e => {
          const raw = parseRawNumber(e.target.value);
          setInstallmentForm(prev => ({
            ...prev,
            amount: raw
          }));
          if (Number(raw) > 0) {
            setValidationErrors(errs => {
              const {
                inst_amount,
                ...rest
              } = errs;
              return rest;
            });
          }
        }} className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${validationErrors.inst_amount || isOver ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700'}`} />}{validationErrors.inst_amount && /*#__PURE__*/<p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>{validationErrors.inst_amount}</span>}</p>}{inputAmt > 0 && /*#__PURE__*/<div className="space-y-1.5 mt-2">{/*#__PURE__*/<div className="text-xs text-indigo-600 font-bold text-left ltr font-numeric">{formatAppNumber(inputAmt)} تومان</div>}{/*#__PURE__*/<div className="p-2.5 bg-indigo-50/80 dark:bg-indigo-950/60 rounded-xl text-xs font-bold text-indigo-900 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800/40">{numToPersianWords(installmentForm.amount)}</div>}</div>}{targetLoan && /*#__PURE__*/<div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl space-y-1.5 border border-slate-200 dark:border-slate-700">{/*#__PURE__*/<div className="flex justify-between items-center text-xs">{/*#__PURE__*/<span className="text-slate-500 dark:text-slate-400 font-medium">کل مانده پرداختی وام:</span>}{/*#__PURE__*/<span className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">{formatAppNumber(loanRemaining)} تومان</span>}</div>}{isOver && /*#__PURE__*/<div className="p-2 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 rounded-lg text-xs font-bold border border-rose-200 dark:border-rose-800 flex items-center space-x-1.5 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-4 h-4 shrink-0" />}{/*#__PURE__*/<span>مبلغ وارد شده بیشتر از مانده کل وام ({formatAppNumber(loanRemaining)} تومان) است!</span>}</div>}</div>}</div>;
    }
  }, {
    id: 'inst_notes',
    title: 'توضیحات تکمیلی',
    render: () => /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">توضیحات یا شماره پیگیری پرداخت:</label>}{/*#__PURE__*/<textarea rows="3" placeholder="    ..." value={installmentForm.notes} onChange={e => setInstallmentForm({
        ...installmentForm,
        notes: e.target.value
      })} className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs focus:outline-none" />}</div>
  }];
  const debtRepaymentWizardCards = [{
    id: 'debt_repay_contact',
    title: 'انتخاب مخاطب',
    render: () => /*#__PURE__*/<ContactSelectorCard contacts={contacts} selectedContactId={demandDebtForm.selectedContactId} onSelect={c => {
      setDemandDebtForm(prev => ({
        ...prev,
        selectedContactId: c.id
      }));
      setValidationErrors(errs => {
        const {
          debt_repay_contact,
          ...rest
        } = errs;
        return rest;
      });
    }} error={validationErrors.debt_repay_contact} wizardType="debt_repayment" wizardMode={wizardMode} />
  }, {
    id: 'debt_repay_amount',
    title: 'مبلغ بازپرداخت بدهی',
    render: () => {
      const targetContact = contacts.find(c => c.id === Number(demandDebtForm.selectedContactId));
      const editingTx = repaymentForm.id ? transactions.find(t => t.id === repaymentForm.id) : null;
      const editingTxAmt = editingTx ? Math.abs(editingTx.amount || 0) : 0;
      const totalDebt = (targetContact ? targetContact.totalDebt || 0 : 0) + editingTxAmt;
      const inputAmt = Number(repaymentForm.amount) || 0;
      const isOver = inputAmt > totalDebt;
      return /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">مبلغ پرداختی جهت کسر از بدهی به {targetContact ? `${targetContact.firstName} ${targetContact.lastName}` : 'مخاطب'} (تومان):</label>}{/*#__PURE__*/<input type="text" inputMode="numeric" placeholder=": ," value={formatWithCommas(repaymentForm.amount)} onChange={e => {
          const raw = parseRawNumber(e.target.value);
          setRepaymentForm(prev => ({
            ...prev,
            amount: raw
          }));
          if (Number(raw) > 0) {
            setValidationErrors(errs => {
              const {
                debt_repay_amount,
                ...rest
              } = errs;
              return rest;
            });
          }
        }} className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${validationErrors.debt_repay_amount || isOver ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700'}`} />}{validationErrors.debt_repay_amount && /*#__PURE__*/<p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>{validationErrors.debt_repay_amount}</span>}</p>}{inputAmt > 0 && /*#__PURE__*/<div className="space-y-1.5 mt-2">{/*#__PURE__*/<div className="text-xs text-rose-500 font-bold text-left ltr font-numeric">{formatAppNumber(inputAmt)} تومان</div>}{/*#__PURE__*/<div className="p-2.5 bg-rose-50/80 dark:bg-rose-950/60 rounded-xl text-xs font-bold text-rose-900 dark:text-rose-200 border border-rose-200/60 dark:border-rose-800/40">{numToPersianWords(repaymentForm.amount)}</div>}</div>}{/*#__PURE__*/<div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl space-y-1.5 border border-slate-200 dark:border-slate-700">{/*#__PURE__*/<div className="flex justify-between items-center text-xs">{/*#__PURE__*/<span className="text-slate-500 dark:text-slate-400 font-medium">کل بدهی به این مخاطب:</span>}{/*#__PURE__*/<span className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">{formatAppNumber(totalDebt)} تومان</span>}</div>}{isOver && /*#__PURE__*/<div className="p-2 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 rounded-lg text-xs font-bold border border-rose-200 dark:border-rose-800 flex items-center space-x-1.5 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-4 h-4 shrink-0" />}{/*#__PURE__*/<span>مبلغ وارد شده بیشتر از کل بدهی ({formatAppNumber(totalDebt)} تومان) است!</span>}</div>}</div>}</div>;
    }
  }, {
    id: 'debt_repay_date',
    title: 'تاریخ بازپرداخت',
    render: () => /*#__PURE__*/<FullJalaliDatePicker day={pickerDay} month={pickerMonth} year={pickerYear} onChange={({
      day,
      month,
      year
    }) => {
      setPickerDay(day);
      setPickerMonth(month);
      setPickerYear(year);
    }} />
  }, {
    id: 'debt_repay_notes',
    title: 'توضیحات تکمیلی',
    render: () => /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">توضیحات و بابت بازپرداخت:</label>}{/*#__PURE__*/<textarea rows="3" placeholder="    ..." value={repaymentForm.notes} onChange={e => setRepaymentForm({
        ...repaymentForm,
        notes: e.target.value
      })} className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs focus:outline-none" />}</div>
  }];
  const demandRepaymentWizardCards = [{
    id: 'demand_repay_contact',
    title: 'انتخاب مخاطب',
    render: () => /*#__PURE__*/<ContactSelectorCard contacts={contacts} selectedContactId={demandDebtForm.selectedContactId} onSelect={c => {
      setDemandDebtForm(prev => ({
        ...prev,
        selectedContactId: c.id
      }));
      setValidationErrors(errs => {
        const {
          demand_repay_contact,
          ...rest
        } = errs;
        return rest;
      });
    }} error={validationErrors.demand_repay_contact} wizardType="demand_repayment" wizardMode={wizardMode} />
  }, {
    id: 'demand_repay_amount',
    title: 'مبلغ بازپرداخت طلب',
    render: () => {
      const targetContact = contacts.find(c => c.id === Number(demandDebtForm.selectedContactId));
      const editingTx = repaymentForm.id ? transactions.find(t => t.id === repaymentForm.id) : null;
      const editingTxAmt = editingTx ? Math.abs(editingTx.amount || 0) : 0;
      const totalDemand = (targetContact ? targetContact.totalDemand || 0 : 0) + editingTxAmt;
      const inputAmt = Number(repaymentForm.amount) || 0;
      const isOver = inputAmt > totalDemand;
      return /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">مبلغ دریافتی جهت کسر از طلب از {targetContact ? `${targetContact.firstName} ${targetContact.lastName}` : 'مخاطب'} (تومان):</label>}{/*#__PURE__*/<input type="text" inputMode="numeric" placeholder=": ,," value={formatWithCommas(repaymentForm.amount)} onChange={e => {
          const raw = parseRawNumber(e.target.value);
          setRepaymentForm(prev => ({
            ...prev,
            amount: raw
          }));
          if (Number(raw) > 0) {
            setValidationErrors(errs => {
              const {
                demand_repay_amount,
                ...rest
              } = errs;
              return rest;
            });
          }
        }} className={`w-full font-mono text-lg font-bold bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none transition-all ${validationErrors.demand_repay_amount || isOver ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700'}`} />}{validationErrors.demand_repay_amount && /*#__PURE__*/<p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>{validationErrors.demand_repay_amount}</span>}</p>}{inputAmt > 0 && /*#__PURE__*/<div className="space-y-1.5 mt-2">{/*#__PURE__*/<div className="text-xs text-emerald-600 font-bold text-left ltr font-numeric">{formatAppNumber(inputAmt)} تومان</div>}{/*#__PURE__*/<div className="p-2.5 bg-emerald-50/80 dark:bg-emerald-950/60 rounded-xl text-xs font-bold text-emerald-900 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-800/40">{numToPersianWords(repaymentForm.amount)}</div>}</div>}{/*#__PURE__*/<div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl space-y-1.5 border border-slate-200 dark:border-slate-700">{/*#__PURE__*/<div className="flex justify-between items-center text-xs">{/*#__PURE__*/<span className="text-slate-500 dark:text-slate-400 font-medium font-sans">کل طلب از این مخاطب:</span>}{/*#__PURE__*/<span className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">{formatAppNumber(totalDemand)} تومان</span>}</div>}{isOver && /*#__PURE__*/<div className="p-2 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 rounded-lg text-xs font-bold border border-rose-200 dark:border-rose-800 flex items-center space-x-1.5 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-4 h-4 shrink-0" />}{/*#__PURE__*/<span>مبلغ وارد شده بیشتر از کل طلب ({formatAppNumber(totalDemand)} تومان) است!</span>}</div>}</div>}</div>;
    }
  }, {
    id: 'demand_repay_date',
    title: 'تاریخ دریافت',
    render: () => /*#__PURE__*/<FullJalaliDatePicker day={pickerDay} month={pickerMonth} year={pickerYear} onChange={({
      day,
      month,
      year
    }) => {
      setPickerDay(day);
      setPickerMonth(month);
      setPickerYear(year);
    }} />
  }, {
    id: 'demand_repay_notes',
    title: 'توضیحات تکمیلی',
    render: () => /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<label className="block text-xs text-slate-500 font-bold">توضیحات بابت دریافتی:</label>}{/*#__PURE__*/<textarea rows="3" placeholder="    ..." value={repaymentForm.notes} onChange={e => setRepaymentForm({
        ...repaymentForm,
        notes: e.target.value
      })} className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs focus:outline-none" />}</div>
  }];
  const contactWizardCards = [{
    id: 'contact_names',
    title: wizardMode === 'edit' ? 'ویرایش نام و نام خانوادگی' : 'نام و نام خانوادگی مخاطب',
    render: () => /*#__PURE__*/<div className="space-y-4">{/*#__PURE__*/<div className="flex flex-col items-center justify-center pt-1 pb-2">{/*#__PURE__*/<div className="relative">{/*#__PURE__*/<div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-lg ring-4 ring-indigo-500/15 dark:ring-indigo-400/20 cursor-pointer group relative overflow-hidden" onClick={() => {
            if (contactWizardForm.profileImage) {
              setContactImageCropperSrc(contactWizardForm.originalImage || contactWizardForm.profileImage);
              setShowContactImageCropper(true);
            } else {
              document.getElementById('contact-image-upload-input').click();
            }
          }}>{/*#__PURE__*/<input id="contact-image-upload-input" type="file" accept="image/*" className="hidden" onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = ev => {
                  setContactWizardForm(prev => ({
                    ...prev,
                    originalImage: ev.target.result
                  }));
                  setContactImageCropperSrc(ev.target.result);
                  setShowContactImageCropper(true);
                };
                reader.readAsDataURL(file);
              }
              e.target.value = '';
            }} />}{contactWizardForm.profileImage ? /*#__PURE__*/<div className="w-full h-full rounded-full overflow-hidden">{/*#__PURE__*/<img src={contactWizardForm.profileImage} alt="profile" className="w-full h-full object-cover" />}</div> : contactWizardForm.firstName.trim() || contactWizardForm.lastName.trim() ? /*#__PURE__*/<span className="text-2xl font-black tracking-tight">{(contactWizardForm.firstName.trim()[0] || '') + (contactWizardForm.lastName.trim()[0] || '')}</span> : /*#__PURE__*/<Icon name="user-plus" className="w-9 h-9 opacity-90" />}{/*#__PURE__*/<div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">{/*#__PURE__*/<Icon name={contactWizardForm.profileImage ? "crop" : "camera"} className="w-6 h-6 text-white" />}</div>}</div>}{contactWizardForm.profileImage && /*#__PURE__*/<div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm z-10 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors" onClick={e => {
            e.stopPropagation();
            document.getElementById('contact-image-upload-input').click();
          }} title="  ">{/*#__PURE__*/<Icon name="upload" className="w-3.5 h-3.5" />}</div>}</div>}{/*#__PURE__*/<span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2">{contactWizardForm.firstName.trim() || contactWizardForm.lastName.trim() ? `${contactWizardForm.firstName.trim()} ${contactWizardForm.lastName.trim()}`.trim() : 'اطلاعات مخاطب جدید'}</span>}</div>}{/*#__PURE__*/<div>{/*#__PURE__*/<label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">نام</label>}{/*#__PURE__*/<input type="text" placeholder="    " value={contactWizardForm.firstName} onChange={e => {
          const val = e.target.value;
          setContactWizardForm(prev => ({
            ...prev,
            firstName: val
          }));
          if (val.trim()) {
            setValidationErrors(errs => {
              const {
                contact_firstname,
                ...rest
              } = errs;
              return rest;
            });
          }
        }} className={`w-full bg-[#F4F7FC] dark:bg-slate-900 border rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none transition-all ${validationErrors.contact_firstname ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500'}`} />}{validationErrors.contact_firstname && /*#__PURE__*/<p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 mt-1 animate-fade-in flex items-center space-x-1 space-x-reverse">{/*#__PURE__*/<Icon name="alert-circle" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span>{validationErrors.contact_firstname}</span>}</p>}</div>}{/*#__PURE__*/<div>{/*#__PURE__*/<label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">نام خانوادگی</label>}{/*#__PURE__*/<input type="text" placeholder="     " value={contactWizardForm.lastName} onChange={e => {
          const val = e.target.value;
          setContactWizardForm(prev => ({
            ...prev,
            lastName: val
          }));
        }} className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />}</div>}</div>
  }, {
    id: 'contact_info',
    title: wizardMode === 'edit' ? 'ویرایش تماس و حساب بانکی' : 'شماره تماس و اطلاعات حساب بانکی',
    render: () => /*#__PURE__*/<div className="space-y-3.5">{/*#__PURE__*/<div>{/*#__PURE__*/<label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">شماره تماس</label>}{/*#__PURE__*/<input type="tel" inputMode="tel" dir="ltr" placeholder=": 09121234567" value={contactWizardForm.phone} onChange={e => setContactWizardForm(prev => ({
          ...prev,
          phone: normalizePhoneNumber(e.target.value)
        }))} className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ltr font-mono" />}</div>}{/*#__PURE__*/<div>{/*#__PURE__*/<div className="flex items-center justify-between mb-1.5">{/*#__PURE__*/<label className="block text-xs font-bold text-slate-700 dark:text-slate-300">شماره کارت (۱۶ رقمی - اختیاری)</label>}{contactWizardForm.bankName && /*#__PURE__*/<span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">{contactWizardForm.bankName}</span>}</div>}{/*#__PURE__*/<input type="text" inputMode="numeric" dir="ltr" placeholder=": 6037 9975 4321 4582" value={contactWizardForm.bankCard} onChange={e => {
          const val = e.target.value;
          const formatted = formatCardNumber(val);
          const detectedBank = getBankNameFromCard(val) || contactWizardForm.bankName;
          setContactWizardForm(prev => ({
            ...prev,
            bankCard: formatted,
            bankName: detectedBank
          }));
        }} className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ltr font-mono" />}</div>}{/*#__PURE__*/<div>{/*#__PURE__*/<label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">شماره شبا (اختیاری)</label>}{/*#__PURE__*/<input type="text" dir="ltr" placeholder=": IR12 0120 0000 0001 2345 6789 01" value={contactWizardForm.iban} onChange={e => setContactWizardForm(prev => ({
          ...prev,
          iban: normalizeIBAN(e.target.value)
        }))} className="w-full bg-[#F4F7FC] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ltr font-mono" />}</div>}</div>
  }];
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
  const getUnderlyingTabForSubpage = subpageTab => {
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
        return /*#__PURE__*/<div className="space-y-3 animate-fade-in">{/*#__PURE__*/<div className="flex justify-between items-center pt-0 pb-0 relative">{/*#__PURE__*/<div className="flex flex-col items-start text-right">{/*#__PURE__*/<p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 text-right leading-tight">سلام وقت به خیر 👋</p>}{/*#__PURE__*/<p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 text-right">امروز: {toAppDigits(getDeviceJalaliDate().day)} {getDeviceJalaliDate().month} {toAppDigits(getDeviceJalaliDate().year)}</p>}</div>}{/*#__PURE__*/<AnimatePresence>{backupStatus && backupStatus.unbackedChangesCount > 0 && /*#__PURE__*/<motion.div key="dashboard-backup-status-pill" initial={{
                opacity: 0,
                scale: 0.7
              }} animate={{
                opacity: 1,
                scale: 1
              }} exit={{
                opacity: 0,
                scale: 0.7
              }} transition={{
                duration: 0.2
              }} className="absolute left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">{/*#__PURE__*/<button onClick={() => {
                  setShowBackupPopover(true);
                  setBackupError(null);
                }} className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-400/50 dark:border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-xs hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer" title={`${backupStatus.unbackedChangesCount} تغییر جدید بدون پشتیبان`} aria-label=" ">{/*#__PURE__*/<Icon name="bell" className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isBellWiggling ? 'animate-bell-wiggle' : ''}`} />}{/*#__PURE__*/<span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold px-1 rounded-full min-w-[17px] h-[17px] flex items-center justify-center shadow-xs border-2 border-white dark:border-slate-900 leading-none font-sans">{toAppDigits(backupStatus.unbackedChangesCount > 99 ? '+99' : backupStatus.unbackedChangesCount)}</span>}</button>}</motion.div>}</AnimatePresence>}{/*#__PURE__*/<div className="flex items-center gap-2.5" dir="ltr">{/*#__PURE__*/<BrandAvatar className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-2xl object-cover shadow-sm shrink-0" logoUrl="favicon-96x96.png" />}{/*#__PURE__*/<div className="flex flex-col items-start text-left">{/*#__PURE__*/<h1 className="text-[15px] sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight font-sans tracking-wide">Amir Finance</h1>}{/*#__PURE__*/<span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight mt-0.5">نسخه {toAppDigits(versionData.installedVersion || '3.2.0')}</span>}</div>}</div>}</div>}{(() => {
            const loanReminders = loans.map(loan => {
              const nextDueInfo = getLoanNextDueInfo(loan, transactions);
              if (nextDueInfo.isCompleted) return null;
              let iconName = loan.icon || 'landmark';
              if (!loan.icon) {
                const titleLower = (loan.title || '').toLowerCase();
                if (titleLower.includes('خودرو') || titleLower.includes('ماشین') || titleLower.includes('car')) {
                  iconName = 'car';
                } else if (titleLower.includes('مسکن') || titleLower.includes('خانه') || titleLower.includes('ملک') || titleLower.includes('آپارتمان')) {
                  iconName = 'home';
                } else if (titleLower.includes('رضایی') || titleLower.includes('شخصی') || titleLower.includes('بازپرداخت') || titleLower.includes('پرداخت')) {
                  iconName = 'user';
                } else {
                  const hash = String(loan.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                  const icons = ['car', 'user', 'home', 'credit-card'];
                  iconName = icons[hash % icons.length];
                }
              }
              let iconBgClass = '';
              const daysLeft = nextDueInfo.daysLeft;
              if (daysLeft < 0) {
                iconBgClass = 'bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400';
              } else if (daysLeft === 0) {
                iconBgClass = 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-500';
              } else if (daysLeft < 6) {
                iconBgClass = 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-500 dark:text-yellow-400';
              } else {
                iconBgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400';
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
            const renderReminderCard = item => {
              const isOverdue = item.daysLeft < 0;
              const isToday = item.daysLeft === 0;
              const isSoon = item.daysLeft > 0 && item.daysLeft < 6;
              let iconName = item.icon || 'landmark';
              let iconBgClass = '';
              let badgeClass = '';
              if (isOverdue) {
                iconBgClass = 'bg-rose-50 dark:bg-rose-950/60 text-rose-500 dark:text-rose-400';
                badgeClass = 'bg-rose-100/90 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/60';
              } else if (isToday) {
                iconBgClass = 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400';
                badgeClass = 'bg-indigo-100/90 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60';
              } else if (isSoon) {
                iconBgClass = 'bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400';
                badgeClass = 'bg-orange-100/90 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 border border-orange-200/80 dark:border-orange-800/60';
              } else {
                iconBgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400';
                badgeClass = 'bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-600/50';
              }
              const daysBadgeText = isOverdue ? `${toAppDigits(Math.abs(item.daysLeft))} روز تأخیر` : isToday ? 'امروز سررسید' : `${toAppDigits(item.daysLeft)} روز مانده`;
              return /*#__PURE__*/<div key={item.id} onClick={() => item.loanObj && openLoanDetail(item.loanObj)} className={`bg-[#F8FAFC] dark:bg-slate-700/40 rounded-2xl p-3 sm:p-3.5 border border-slate-100/90 dark:border-slate-700/50 flex items-center justify-between gap-3 transition-all hover:bg-slate-100/80 dark:hover:bg-slate-700/70 ${item.loanObj ? 'cursor-pointer active:scale-[0.99]' : ''}`}>{/*#__PURE__*/<div className="flex items-center space-x-3 space-x-reverse min-w-0">{/*#__PURE__*/<div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 ${iconBgClass}`}>{/*#__PURE__*/<Icon name={iconName} className="w-5 h-5 sm:w-5.5 sm:h-5.5" />}</div>}{/*#__PURE__*/<div className="min-w-0">{/*#__PURE__*/<h4 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white truncate">{item.title}</h4>}{/*#__PURE__*/<p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5 truncate">{item.dateStr}</p>}</div>}</div>}{/*#__PURE__*/<div className="shrink-0">{/*#__PURE__*/<span className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-bold text-[11px] sm:text-xs inline-block ${badgeClass}`}>{daysBadgeText}</span>}</div>}</div>;
            };
            return /*#__PURE__*/<div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] dark:shadow-sm border border-slate-100 dark:border-slate-700/60 transition-all space-y-3.5">{/*#__PURE__*/<div onClick={() => setExpandedReminders(!expandedReminders)} className="flex justify-between items-center cursor-pointer select-none group px-0.5">{/*#__PURE__*/<div className="flex items-center space-x-3 space-x-reverse">{/*#__PURE__*/<div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform shrink-0">{/*#__PURE__*/<Icon name="calendar-clock" className="w-5.5 h-5.5" />}</div>}{/*#__PURE__*/<div>{/*#__PURE__*/<h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">یادآوری‌های مهم</h3>}{/*#__PURE__*/<p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">نزدیک‌ترین سررسیدها</p>}</div>}</div>}{/*#__PURE__*/<button type="button" onClick={e => {
                  e.stopPropagation();
                  setExpandedReminders(!expandedReminders);
                }} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors p-1 cursor-pointer">{/*#__PURE__*/<Icon name="chevron-down" className={`w-5 h-5 transition-transform duration-300 ${expandedReminders ? 'rotate-180' : 'rotate-0'}`} />}</button>}</div>}{/*#__PURE__*/<div className="space-y-2.5">{firstThree.map(item => renderReminderCard(item))}{sortedList.length === 0 && /*#__PURE__*/<div className="text-center py-4 text-xs text-slate-400">سررسیدی نزدیک نیست</div>}{/*#__PURE__*/<div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedReminders && extraList.length > 0 ? 'grid-rows-[1fr] opacity-100 mt-2.5' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'}`}>{/*#__PURE__*/<div className="overflow-hidden space-y-2.5">{extraList.map(item => renderReminderCard(item))}</div>}</div>}</div>}</div>;
          })()}{/*#__PURE__*/<div className="grid grid-cols-3 gap-2.5">{/*#__PURE__*/<div onClick={() => {
              setAccountsSubTab('loans');
              navigateToTab('accounts', 'forward');
            }} className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 text-white rounded-2xl p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer flex flex-col justify-between min-h-[82px] border border-white/15 overflow-hidden group">{/*#__PURE__*/<div className="absolute -left-2.5 -bottom-2.5 pointer-events-none text-white/20 group-hover:text-white/30 group-hover:scale-110 transition-all duration-300">{/*#__PURE__*/<Icon name="landmark" className="w-16 h-16 sm:w-18 sm:h-18" />}</div>}{/*#__PURE__*/<div className="flex items-center justify-between w-full relative z-10">{/*#__PURE__*/<span className="text-xs sm:text-[13px] font-bold text-white/95">وام‌ها</span>}</div>}{/*#__PURE__*/<div className="flex flex-col items-start justify-end mt-1.5 relative z-10">{/*#__PURE__*/<div className="text-[15px] sm:text-base font-black tracking-tight leading-none text-white font-mono font-numeric">{toAppDigits(loans.length)}</div>}{/*#__PURE__*/<div className="text-[9px] sm:text-[10px] text-indigo-100 font-medium mt-0.5">وام فعال</div>}</div>}</div>}{/*#__PURE__*/<div onClick={() => {
              setAccountsSubTab('debts');
              navigateToTab('accounts', 'forward');
            }} className="relative bg-gradient-to-br from-rose-500 via-rose-600 to-red-600 text-white rounded-2xl p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer flex flex-col justify-between min-h-[82px] border border-white/15 overflow-hidden group">{/*#__PURE__*/<div className="absolute -left-2.5 -bottom-2.5 pointer-events-none text-white/20 group-hover:text-white/30 group-hover:scale-110 transition-all duration-300">{/*#__PURE__*/<Icon name="arrow-down-left" className="w-16 h-16 sm:w-18 sm:h-18" />}</div>}{/*#__PURE__*/<div className="flex items-center justify-between w-full relative z-10">{/*#__PURE__*/<span className="text-xs sm:text-[13px] font-bold text-white/95">بدهی</span>}</div>}{/*#__PURE__*/<div className="flex flex-col items-start justify-end mt-1.5 relative z-10">{/*#__PURE__*/<div className="text-[13px] sm:text-[14px] font-black tracking-tight leading-none text-white font-mono font-numeric truncate max-w-full">{formatAppNumber(totalDebt)}</div>}{/*#__PURE__*/<div className="text-[9px] sm:text-[10px] text-rose-100 font-medium mt-0.5">تومان</div>}</div>}</div>}{/*#__PURE__*/<div onClick={() => {
              setAccountsSubTab('demands');
              navigateToTab('accounts', 'forward');
            }} className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white rounded-2xl p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer flex flex-col justify-between min-h-[82px] border border-white/15 overflow-hidden group">{/*#__PURE__*/<div className="absolute -left-2.5 -bottom-2.5 pointer-events-none text-white/20 group-hover:text-white/30 group-hover:scale-110 transition-all duration-300">{/*#__PURE__*/<Icon name="arrow-up-right" className="w-16 h-16 sm:w-18 sm:h-18" />}</div>}{/*#__PURE__*/<div className="flex items-center justify-between w-full relative z-10">{/*#__PURE__*/<span className="text-xs sm:text-[13px] font-bold text-white/95">طلب</span>}</div>}{/*#__PURE__*/<div className="flex flex-col items-start justify-end mt-1.5 relative z-10">{/*#__PURE__*/<div className="text-[13px] sm:text-[14px] font-black tracking-tight leading-none text-white font-mono font-numeric truncate max-w-full">{formatAppNumber(totalDemand)}</div>}{/*#__PURE__*/<div className="text-[9px] sm:text-[10px] text-emerald-100 font-medium mt-0.5">تومان</div>}</div>}</div>}</div>}{/*#__PURE__*/<div ref={recentTxsAccordionRef} className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] dark:shadow-sm border border-slate-100 dark:border-slate-700/60 transition-all">{/*#__PURE__*/<div onClick={toggleRecentTxsAccordion} className="flex justify-between items-center cursor-pointer select-none group px-0.5">{/*#__PURE__*/<div className="flex items-center space-x-3 space-x-reverse">{/*#__PURE__*/<div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform shrink-0">{/*#__PURE__*/<Icon name="history" className="w-5.5 h-5.5" />}</div>}{/*#__PURE__*/<div>{/*#__PURE__*/<h3 className="text-sm sm:text-base font-extrabold text-indigo-600 dark:text-indigo-400 leading-tight">آخرین تراکنش‌ها</h3>}{/*#__PURE__*/<p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">تراکنش‌های اخیر ثبت‌شده</p>}</div>}</div>}{/*#__PURE__*/<div className="flex items-center space-x-2 space-x-reverse">{/*#__PURE__*/<button onClick={toggleRecentTxsAccordion} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors p-1 cursor-pointer">{/*#__PURE__*/<Icon name="chevron-down" className={`w-5 h-5 transition-transform duration-300 ${expandedRecentTxs ? 'rotate-180' : 'rotate-0'}`} />}</button>}</div>}</div>}{/*#__PURE__*/<div className={`grid transition-[grid-template-rows,opacity,margin,padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedRecentTxs ? 'grid-rows-[1fr] opacity-100 mt-3.5' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'}`}>{/*#__PURE__*/<div className="overflow-hidden space-y-2.5">{transactions.slice(0, 5).map((tx, idx) => /*#__PURE__*/<SwipeableTxCard key={tx.id || idx} tx={tx} contacts={contacts} loans={loans} transactions={transactions} isHighlighted={highlightedTxId !== null && String(tx.id) === String(highlightedTxId)} onEdit={txItem => handleTransactionClick(txItem)} onDelete={(txItem, confirmCb) => requestDeleteTx(txItem, txItem.type || 'tx', confirmCb)} />)}{transactions.length === 0 && /*#__PURE__*/<div className="bg-[#F8FAFC] dark:bg-slate-700/40 rounded-2xl p-6 text-center text-xs text-slate-400 border border-slate-100/90 dark:border-slate-700/50">تراکنشی ثبت نشده است</div>}{transactions.length > 0 && /*#__PURE__*/<button onClick={() => {
                  setAllTxsPage(1);
                  navigateToTab('all-transactions', 'none');
                }} className="w-full mt-1.5 py-3 px-4 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100/90 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 border border-indigo-100/80 dark:border-indigo-800/50 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 space-x-reverse active:scale-[0.98] transition-all cursor-pointer group/viewall">{/*#__PURE__*/<span>مشاهده همه تراکنش‌ها</span>}{/*#__PURE__*/<Icon name="chevron-left" className="w-4 h-4 text-indigo-500 dark:text-indigo-400 group-hover/viewall:-translate-x-1 transition-transform" />}</button>}</div>}</div>}</div>}</div>;
      case 'accounts':
        return /*#__PURE__*/<div className="space-y-4 animate-fade-in">{/*#__PURE__*/<div className="flex items-center justify-between py-1.5 mb-3">{/*#__PURE__*/<div className="flex items-center gap-2">{/*#__PURE__*/<Icon name="wallet" className="w-7 h-7 text-slate-800 dark:text-slate-100" />}{/*#__PURE__*/<h1 className="text-xl font-bold text-slate-900 dark:text-white">مدیریت حساب‌ها</h1>}</div>}</div>}{/*#__PURE__*/<div className="flex items-center gap-3 mb-3">{/*#__PURE__*/<div className="flex-1 relative">{/*#__PURE__*/<input type="text" value={accountsSearchQuery} onChange={e => setAccountsSearchQuery(e.target.value)} placeholder="..." className="w-full h-12 pr-10 pl-4 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-full focus:ring-2 focus:ring-indigo-600/20 text-sm text-right text-slate-900 dark:text-white placeholder:text-slate-400 shadow-inner" />}{/*#__PURE__*/<Icon name="search" className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />}</div>}{/*#__PURE__*/<button onClick={() => setAccountsSearchQuery('')} className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-md active:scale-90 transition-transform" title=" ">{/*#__PURE__*/<Icon name="x" className="w-6 h-6" />}</button>}</div>}{/*#__PURE__*/<div className="bg-slate-100 dark:bg-slate-800/80 rounded-full p-1 flex items-center justify-between no-scrollbar border border-slate-200/50 dark:border-slate-700/50 text-sm font-medium mb-4 shadow-xs">{[{
              id: 'all',
              label: 'همه',
              activeClass: 'bg-indigo-600 text-white shadow-sm font-bold'
            }, {
              id: 'loans',
              label: 'وام',
              activeClass: 'bg-blue-600 text-white shadow-sm font-bold'
            }, {
              id: 'debts',
              label: 'بدهی',
              activeClass: 'bg-rose-600 text-white shadow-sm font-bold'
            }, {
              id: 'demands',
              label: 'طلب',
              activeClass: 'bg-emerald-600 text-white shadow-sm font-bold'
            }, {
              id: 'archived',
              label: 'بایگانی',
              activeClass: 'bg-purple-600 text-white shadow-sm font-bold'
            }].map(tab => /*#__PURE__*/<button key={tab.id} onClick={() => setAccountsSubTab(tab.id)} className={`py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap px-3 sm:px-4 active:scale-95 transition-all duration-200 ${accountsSubTab === tab.id ? tab.activeClass : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>{tab.label}</button>)}</div>}{/*#__PURE__*/<div className="space-y-6">{(accountsSubTab === 'all' || accountsSubTab === 'loans' || accountsSubTab === 'archived') && (() => {
              const loansToDisplay = filteredAccountsLoans;
              if (loansToDisplay.length === 0) return null;
              return /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<div className="w-full flex items-center justify-center mb-3">{/*#__PURE__*/<div className="w-full text-center bg-indigo-50/90 dark:bg-indigo-950/70 border-2 border-indigo-500/80 dark:border-indigo-400/60 text-indigo-700 dark:text-indigo-300 py-2.5 px-4 rounded-2xl text-sm font-black shadow-xs">وام‌ها</div>}</div>}{/*#__PURE__*/<div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3">{loansToDisplay.map(loan => {
                    const nextDueInfo = getLoanNextDueInfo(loan, transactions);
                    const isCompleted = nextDueInfo.isCompleted || loan.remainingAmount !== undefined && loan.remainingAmount <= 0;
                    return /*#__PURE__*/<SwipeToDeleteItem key={loan.id} onDelete={confirmCb => handleDeleteLoanClick(loan, confirmCb)} onCardClick={() => openLoanDetail(loan)}>{isCompleted ? /*#__PURE__*/<div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/80 shadow-sm p-4 sm:p-5 overflow-hidden relative transition-all cursor-pointer hover:border-emerald-300">{/*#__PURE__*/<div className="w-full flex flex-col opacity-75 gap-2">{/*#__PURE__*/<div className="flex items-center justify-between w-full">{/*#__PURE__*/<div className="w-14 h-14 bg-indigo-50/50 dark:bg-indigo-950/50 rounded-2xl flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0">{/*#__PURE__*/<Icon name={loan.icon || 'landmark'} className="w-8 h-8 text-blue-500 dark:text-blue-400" />}</div>}{/*#__PURE__*/<div className="flex-1 text-right flex flex-col gap-1 pl-4 pr-2">{/*#__PURE__*/<h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm">{loan.title}</h3>}{/*#__PURE__*/<p className="text-slate-400 text-xs whitespace-normal">{loan.contactName || "بانک"}</p>}</div>}{/*#__PURE__*/<div className="text-left shrink-0 flex flex-col items-center">{/*#__PURE__*/<div className="font-bold text-base leading-none line-through text-slate-400 font-mono font-numeric">{formatAppNumber(loan.principalAmount)}</div>}{/*#__PURE__*/<div className="text-slate-400 text-xs">تومان</div>}</div>}</div>}{/*#__PURE__*/<div className="flex justify-center">{/*#__PURE__*/<span className="text-slate-500 dark:text-slate-400 font-bold text-xs">آخرین قسط پرداخت شده : {nextDueInfo.lastPaidDateStr || "تمامی اقساط پرداخت شده"}</span>}</div>}{/*#__PURE__*/<div className="bg-indigo-50/30 dark:bg-indigo-950/30 rounded-lg py-2 px-4 text-center">{/*#__PURE__*/<span className="text-blue-500 dark:text-blue-400 font-bold text-sm">تمامی اقساط پرداخت شده است</span>}</div>}</div>}{/*#__PURE__*/<div className="absolute bottom-4 left-4 w-12 h-12 bg-emerald-50 dark:bg-emerald-950 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-500 z-10">{/*#__PURE__*/<Icon name="check" className="w-6 h-6 stroke-[3]" />}</div>}</div> : /*#__PURE__*/<div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  p-3 sm:p-4 transition-all cursor-pointer hover:border-indigo-400">{/*#__PURE__*/<div className="w-full flex flex-col gap-3">{/*#__PURE__*/<div className="flex items-center justify-between w-full">{/*#__PURE__*/<div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-inner">{/*#__PURE__*/<Icon name={loan.icon || 'landmark'} className="w-6 h-6" />}</div>}{/*#__PURE__*/<div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">{/*#__PURE__*/<h3 className="font-bold text-slate-800 dark:text-white text-sm leading-tight">{loan.title}</h3>}{/*#__PURE__*/<p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal line-clamp-1">{loan.contactName || "بانک"}</p>}</div>}{/*#__PURE__*/<div className="text-left shrink-0 flex flex-col items-center">{/*#__PURE__*/<div className="text-indigo-600 dark:text-indigo-400 font-bold text-base leading-none font-mono font-numeric">{formatAppNumber(loan.principalAmount)}</div>}{/*#__PURE__*/<div className="text-indigo-600 dark:text-indigo-400 text-[10px] mt-1 font-medium">تومان</div>}</div>}</div>}{/*#__PURE__*/<div className="flex flex-col gap-2">{/*#__PURE__*/<div className="flex items-center justify-between w-full bg-[#F4F7FC] dark:bg-slate-900/50 rounded-xl px-3 py-1.5 border border-slate-200/50 dark:border-slate-700/50">{/*#__PURE__*/<span className="text-slate-500 dark:text-slate-400 font-medium text-xs">سررسید قسط {toAppDigits(nextDueInfo.paidInst + 1)}</span>}{/*#__PURE__*/<span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs font-mono">{formatDateToNumericJalali(nextDueInfo.nextDueDateStr) || toAppDigits(nextDueInfo.nextDueDateStr)}</span>}</div>}{/*#__PURE__*/<div className="w-full flex flex-col gap-1.5 px-1 mt-1">{/*#__PURE__*/<div className="flex justify-between items-center text-[10px] font-bold">{/*#__PURE__*/<span className="text-emerald-600 dark:text-emerald-400">{toAppDigits(nextDueInfo.paidInst)} پرداخت شده</span>}{/*#__PURE__*/<span className="text-slate-400 dark:text-slate-500">مانده {toAppDigits(nextDueInfo.remainingInst)}</span>}</div>}{/*#__PURE__*/<div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700/80 flex">{/*#__PURE__*/<div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-full transition-all duration-500" style={{
                                  width: `${Math.min(100, nextDueInfo.totalInst > 0 ? nextDueInfo.paidInst / nextDueInfo.totalInst * 100 : 0)}%`
                                }} />}</div>}</div>}</div>}</div>}</div>}</SwipeToDeleteItem>;
                  })}</div>}</div>;
            })()}{(accountsSubTab === 'all' || accountsSubTab === 'demands' || accountsSubTab === 'archived') && filteredAccountsDemands.length > 0 && /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<div className="w-full flex items-center justify-center mb-3">{/*#__PURE__*/<div className="w-full text-center bg-emerald-50/90 dark:bg-emerald-950/70 border-2 border-emerald-500/80 dark:border-emerald-400/60 text-emerald-700 dark:text-emerald-300 py-2.5 px-4 rounded-2xl text-sm font-black shadow-xs">طلب‌ها</div>}</div>}{/*#__PURE__*/<div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3">{filteredAccountsDemands.map(contact => {
                  const settledCount = getSettledPeriodCount(contact.id, 'demand');
                  const isArchived = settledCount > 0 || accountsSubTab === 'archived' || contact.totalDemand === 0;
                  return /*#__PURE__*/<SwipeToDeleteItem key={contact.id} onDelete={confirmCb => handleDeleteContact(contact, confirmCb)} onCardClick={() => openContactDetail(contact, 'demands', 'accounts')}>{/*#__PURE__*/<div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between">{/*#__PURE__*/<div className="w-full flex flex-col gap-1">{/*#__PURE__*/<div className="flex items-center justify-between w-full">{/*#__PURE__*/<div className="flex flex-col items-center gap-1 shrink-0">{/*#__PURE__*/<div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center text-emerald-500 dark:text-emerald-400">{/*#__PURE__*/<Icon name="arrow-up-right" className="w-6 h-6" />}</div>}{isArchived ? /*#__PURE__*/<span className="bg-emerald-500 text-white text-[10px] px-3 py-0.5 rounded-full font-bold shadow-md">بایگانی</span> : /*#__PURE__*/<span className="bg-slate-400 dark:bg-slate-600 text-white text-[10px] px-3 py-0.5 rounded-full font-bold shadow-md opacity-50">بایگانی</span>}</div>}{/*#__PURE__*/<div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">{/*#__PURE__*/<h3 className="font-bold text-slate-800 dark:text-white text-sm">{contact.firstName} {contact.lastName}</h3>}{/*#__PURE__*/<p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{contact.note || "طلب شخصی"}</p>}</div>}{/*#__PURE__*/<div className="text-left shrink-0 flex flex-col items-center">{/*#__PURE__*/<div className="text-emerald-600 dark:text-emerald-400 font-bold text-base leading-none font-mono font-numeric">{formatAppNumber(contact.totalDemand)}</div>}{/*#__PURE__*/<div className="text-emerald-600 dark:text-emerald-400 text-xs">تومان</div>}</div>}</div>}</div>}</div>}</SwipeToDeleteItem>;
                })}</div>}</div>}{(accountsSubTab === 'all' || accountsSubTab === 'debts' || accountsSubTab === 'archived') && filteredAccountsDebts.length > 0 && /*#__PURE__*/<div className="space-y-3">{/*#__PURE__*/<div className="w-full flex items-center justify-center mb-3">{/*#__PURE__*/<div className="w-full text-center bg-rose-50/90 dark:bg-rose-950/70 border-2 border-rose-500/80 dark:border-rose-400/60 text-rose-700 dark:text-rose-300 py-2.5 px-4 rounded-2xl text-sm font-black shadow-xs">بدهی‌ها</div>}</div>}{/*#__PURE__*/<div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3">{filteredAccountsDebts.map(contact => {
                  const settledCount = getSettledPeriodCount(contact.id, 'debt');
                  const isArchived = settledCount > 0 || accountsSubTab === 'archived' || contact.totalDebt === 0;
                  return /*#__PURE__*/<SwipeToDeleteItem key={contact.id} onDelete={confirmCb => handleDeleteContact(contact, confirmCb)} onCardClick={() => openContactDetail(contact, 'debts', 'accounts')}>{/*#__PURE__*/<div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 hover:border-rose-400 transition-all cursor-pointer flex items-center justify-between">{/*#__PURE__*/<div className="w-full flex flex-col gap-1">{/*#__PURE__*/<div className="flex items-center justify-between w-full">{/*#__PURE__*/<div className="flex flex-col items-center gap-1 shrink-0">{/*#__PURE__*/<div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/50 rounded-2xl flex items-center justify-center text-rose-500 dark:text-rose-400">{/*#__PURE__*/<Icon name="arrow-down-left" className="w-6 h-6" />}</div>}{isArchived ? /*#__PURE__*/<span className="bg-rose-500 text-white text-[10px] px-3 py-0.5 rounded-full font-bold shadow-md">بایگانی</span> : /*#__PURE__*/<span className="bg-slate-400 dark:bg-slate-600 text-white text-[10px] px-3 py-0.5 rounded-full font-bold shadow-md opacity-50">بایگانی</span>}</div>}{/*#__PURE__*/<div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">{/*#__PURE__*/<h3 className="font-bold text-slate-800 dark:text-white text-sm">{contact.firstName} {contact.lastName}</h3>}{/*#__PURE__*/<p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{contact.note || "بدهی شخصی"}</p>}</div>}{/*#__PURE__*/<div className="text-left shrink-0 flex flex-col items-center">{/*#__PURE__*/<div className="text-rose-600 dark:text-rose-400 font-bold text-base leading-none font-mono font-numeric">{formatAppNumber(contact.totalDebt)}</div>}{/*#__PURE__*/<div className="text-rose-600 dark:text-rose-400 text-xs">تومان</div>}</div>}</div>}</div>}</div>}</SwipeToDeleteItem>;
                })}</div>}</div>}{filteredAccountsLoans.length === 0 && filteredAccountsDemands.length === 0 && filteredAccountsDebts.length === 0 && /*#__PURE__*/<div className="bg-white dark:bg-slate-800 p-8 rounded-2xl text-center border border-slate-100 dark:border-slate-700/60 my-4">{/*#__PURE__*/<Icon name="search-x" className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />}{/*#__PURE__*/<div className="text-xs font-bold text-slate-600 dark:text-slate-300">{accountsSearchQuery ? `هیچ موردی با عبارت "${accountsSearchQuery}" یافت نشد.` : 'هیچ حساب یا پرونده‌ای برای نمایش وجود ندارد.'}</div>}{accountsSearchQuery && /*#__PURE__*/<button onClick={() => setAccountsSearchQuery('')} className="mt-3 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-bold text-indigo-600 dark:text-indigo-400 rounded-xl transition-all">پاک‌سازی جستجو</button>}</div>}</div>}</div>;
      case 'contacts':
        return /*#__PURE__*/<div className="space-y-4 animate-fade-in">{/*#__PURE__*/<div className="flex items-center justify-between py-1.5 mb-3">{/*#__PURE__*/<div className="flex items-center gap-2">{/*#__PURE__*/<Icon name="users" className="w-7 h-7 text-slate-800 dark:text-slate-100" />}{/*#__PURE__*/<h1 className="text-xl font-bold text-slate-900 dark:text-white">مخاطبین</h1>}</div>}{/*#__PURE__*/<button onClick={() => openStackWizard('contact', 'add')} className="w-11 h-11 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-all shrink-0" title="  ">{/*#__PURE__*/<Icon name="plus" className="w-6 h-6" />}</button>}</div>}{/*#__PURE__*/<div className="flex items-center gap-3 mb-3">{/*#__PURE__*/<div className="flex-1 relative">{/*#__PURE__*/<input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="..." className="w-full h-12 pr-10 pl-4 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-full focus:ring-2 focus:ring-indigo-600/20 text-sm text-right text-slate-900 dark:text-white placeholder:text-slate-400 shadow-inner" />}{/*#__PURE__*/<Icon name="search" className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />}</div>}{/*#__PURE__*/<button onClick={() => setSearchQuery('')} className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-md active:scale-90 transition-transform" title=" ">{/*#__PURE__*/<Icon name="x" className="w-6 h-6" />}</button>}</div>}{/*#__PURE__*/<div className="bg-slate-100 dark:bg-slate-800/80 rounded-full p-1 flex items-center justify-between no-scrollbar border border-slate-200/50 dark:border-slate-700/50 text-sm font-medium mb-4 shadow-xs">{/*#__PURE__*/<button onClick={() => setContactFilter(contactFilter === 'favorite' ? 'all' : 'favorite')} title="" className={`flex items-center justify-center w-9 h-9 rounded-full transition-all shrink-0 ${contactFilter === 'favorite' ? 'bg-amber-100 dark:bg-amber-950 text-amber-500' : 'text-slate-400 hover:text-amber-500'}`}>{/*#__PURE__*/<Icon name="star" className={`w-5 h-5 ${contactFilter === 'favorite' ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`} />}</button>}{[{
              id: 'all',
              label: 'همه',
              activeClass: 'bg-indigo-600 text-white shadow-sm font-bold'
            }, {
              id: 'loan',
              label: 'وام',
              activeClass: 'bg-blue-600 text-white shadow-sm font-bold'
            }, {
              id: 'debt',
              label: 'بدهی',
              activeClass: 'bg-rose-600 text-white shadow-sm font-bold'
            }, {
              id: 'demand',
              label: 'طلب',
              activeClass: 'bg-emerald-600 text-white shadow-sm font-bold'
            }, {
              id: 'settled',
              label: 'بایگانی',
              activeClass: 'bg-purple-600 text-white shadow-sm font-bold'
            }].map(tab => /*#__PURE__*/<button key={tab.id} onClick={() => setContactFilter(tab.id)} className={`py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap px-3 sm:px-4 active:scale-95 transition-all duration-200 ${contactFilter === tab.id ? tab.activeClass : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>{tab.label}</button>)}</div>}{/*#__PURE__*/<div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">{filteredContacts.map(contact => {
              const contactLoans = loans.filter(l => l.contactId === contact.id);
              const hasActiveLoan = contactLoans.some(l => !getLoanNextDueInfo(l, transactions).isCompleted && (l.remainingAmount === undefined || l.remainingAmount > 0));
              const hasSettledLoan = contactLoans.some(l => getLoanNextDueInfo(l, transactions).isCompleted || l.remainingAmount !== undefined && l.remainingAmount <= 0);
              const hasSettledDemand = getSettledPeriodCount(contact.id, 'demand') > 0;
              const hasActiveDemand = contact.totalDemand > 0;
              const hasSettledDebt = getSettledPeriodCount(contact.id, 'debt') > 0;
              const hasActiveDebt = contact.totalDebt > 0;
              const colorMappings = {
                'bg-blue-600': {
                  bg: 'bg-gradient-to-br from-blue-50/80 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/10',
                  border: 'border-blue-200/80 dark:border-slate-700/60 hover:border-blue-400 dark:hover:border-blue-600',
                  watermark: 'users',
                  watermarkColor: 'text-blue-500 dark:text-blue-400 opacity-[0.16] dark:opacity-[0.13]',
                  ring: 'ring-4 ring-blue-500/15'
                },
                'bg-amber-600': {
                  bg: 'bg-gradient-to-br from-amber-50/80 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10',
                  border: 'border-amber-200/80 dark:border-slate-700/60 hover:border-amber-400 dark:hover:border-amber-600',
                  watermark: 'star',
                  watermarkColor: 'text-amber-500 dark:text-amber-400 opacity-[0.16] dark:opacity-[0.13]',
                  ring: 'ring-4 ring-amber-500/15'
                },
                'bg-emerald-600': {
                  bg: 'bg-gradient-to-br from-emerald-50/80 to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/10',
                  border: 'border-emerald-200/80 dark:border-slate-700/60 hover:border-emerald-400 dark:hover:border-emerald-600',
                  watermark: 'briefcase',
                  watermarkColor: 'text-emerald-500 dark:text-emerald-400 opacity-[0.16] dark:opacity-[0.13]',
                  ring: 'ring-4 ring-emerald-500/15'
                },
                'bg-indigo-600': {
                  bg: 'bg-gradient-to-br from-indigo-50/80 to-purple-50/30 dark:from-indigo-950/20 dark:to-purple-950/10',
                  border: 'border-indigo-200/80 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-600',
                  watermark: 'landmark',
                  watermarkColor: 'text-indigo-500 dark:text-indigo-400 opacity-[0.16] dark:opacity-[0.13]',
                  ring: 'ring-4 ring-indigo-500/15'
                },
                'bg-teal-600': {
                  bg: 'bg-gradient-to-br from-teal-50/80 to-emerald-50/30 dark:from-teal-950/20 dark:to-emerald-950/10',
                  border: 'border-teal-200/80 dark:border-slate-700/60 hover:border-teal-400 dark:hover:border-teal-600',
                  watermark: 'shield',
                  watermarkColor: 'text-teal-500 dark:text-teal-400 opacity-[0.16] dark:opacity-[0.13]',
                  ring: 'ring-4 ring-teal-500/15'
                },
                'bg-rose-600': {
                  bg: 'bg-gradient-to-br from-rose-50/80 to-pink-50/30 dark:from-rose-950/20 dark:to-pink-950/10',
                  border: 'border-rose-200/80 dark:border-slate-700/60 hover:border-rose-400 dark:hover:border-rose-600',
                  watermark: 'heart',
                  watermarkColor: 'text-rose-500 dark:text-rose-400 opacity-[0.16] dark:opacity-[0.13]',
                  ring: 'ring-4 ring-rose-500/15'
                },
                'bg-purple-600': {
                  bg: 'bg-gradient-to-br from-purple-50/80 to-fuchsia-50/30 dark:from-purple-950/20 dark:to-fuchsia-950/10',
                  border: 'border-purple-200/80 dark:border-slate-700/60 hover:border-purple-400 dark:hover:border-purple-600',
                  watermark: 'award',
                  watermarkColor: 'text-purple-500 dark:text-purple-400 opacity-[0.16] dark:opacity-[0.13]',
                  ring: 'ring-4 ring-purple-500/15'
                },
                'bg-cyan-600': {
                  bg: 'bg-gradient-to-br from-cyan-50/80 to-blue-50/30 dark:from-cyan-950/20 dark:to-blue-950/10',
                  border: 'border-cyan-200/80 dark:border-slate-700/60 hover:border-cyan-400 dark:hover:border-cyan-600',
                  watermark: 'anchor',
                  watermarkColor: 'text-cyan-500 dark:text-cyan-400 opacity-[0.16] dark:opacity-[0.13]',
                  ring: 'ring-4 ring-cyan-500/15'
                },
                'bg-orange-600': {
                  bg: 'bg-gradient-to-br from-orange-50/80 to-amber-50/30 dark:from-orange-950/20 dark:to-amber-950/10',
                  border: 'border-orange-200/80 dark:border-slate-700/60 hover:border-orange-400 dark:hover:border-orange-600',
                  watermark: 'sun',
                  watermarkColor: 'text-orange-500 dark:text-orange-400 opacity-[0.16] dark:opacity-[0.13]',
                  ring: 'ring-4 ring-orange-500/15'
                },
                'bg-violet-600': {
                  bg: 'bg-gradient-to-br from-violet-50/80 to-purple-50/30 dark:from-violet-950/20 dark:to-purple-950/10',
                  border: 'border-violet-200/80 dark:border-slate-700/60 hover:border-violet-400 dark:hover:border-violet-600',
                  watermark: 'hexagon',
                  watermarkColor: 'text-violet-500 dark:text-violet-400 opacity-[0.16] dark:opacity-[0.13]',
                  ring: 'ring-4 ring-violet-500/15'
                }
              };
              const avatarBg = getAvatarColor(contact.id, contact.firstName + contact.lastName);
              const theme = colorMappings[avatarBg] || colorMappings['bg-indigo-600'];
              return /*#__PURE__*/<SwipeToDeleteItem key={contact.id} onDelete={confirmCb => handleDeleteContact(contact, confirmCb)} onCardClick={() => {
                let f = 'all';
                if (contactFilter === 'demand') f = 'demands';else if (contactFilter === 'debt') f = 'debts';else if (contactFilter === 'loan') f = 'loans';
                openContactDetail(contact, f, 'contacts');
              }}>{/*#__PURE__*/<div className={`relative overflow-hidden bg-white dark:bg-slate-800 ${theme.bg} rounded-2xl sm:rounded-[24px] border p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-sm ${theme.border} transition-all cursor-pointer group`}>{/*#__PURE__*/<div className={`absolute -bottom-8 -left-8 pointer-events-none transition-transform group-hover:scale-[1.15] duration-500 ${theme.watermarkColor}`}>{contact.profileImage ? /*#__PURE__*/<div className="w-44 h-44 rounded-full overflow-hidden opacity-80">{/*#__PURE__*/<img src={contact.profileImage} alt="" className="w-full h-full object-cover" />}</div> : /*#__PURE__*/<div className="w-44 h-44 flex items-center justify-center text-[160px] font-black leading-none opacity-80 tracking-tighter">{contact.firstName.charAt(0)}</div>}</div>}{/*#__PURE__*/<div className="relative z-10 flex flex-col gap-5">{/*#__PURE__*/<div className="flex flex-row items-start justify-between">{/*#__PURE__*/<div className="flex items-center gap-4">{/*#__PURE__*/<div className={`rounded-full ${avatarBg} ${theme.ring} flex-shrink-0 flex items-center justify-center text-white font-bold w-16 h-16 sm:w-18 sm:h-18 text-lg sm:text-xl shadow-md border-2 border-white/60 dark:border-slate-700/60 overflow-hidden transition-transform group-hover:scale-105`}>{contact.profileImage ? /*#__PURE__*/<img src={contact.profileImage} alt={`${contact.firstName} ${contact.lastName}`} className="w-full h-full object-cover" /> : /*#__PURE__*/<>{contact.firstName.charAt(0)} {contact.lastName.charAt(0)}</>}</div>}{/*#__PURE__*/<div className="flex flex-col">{/*#__PURE__*/<span className="text-slate-900 dark:text-white font-extrabold text-base sm:text-lg tracking-tight">{contact.firstName} {contact.lastName}</span>}{/*#__PURE__*/<span className="text-slate-500 dark:text-slate-400 tracking-wider font-mono text-xs dir-ltr mt-0.5">{contact.phone}</span>}</div>}</div>}</div>}{/*#__PURE__*/<div className="flex gap-2.5 justify-between w-full">{/*#__PURE__*/<button onClick={e => {
                        e.stopPropagation();
                        openContactDetail(contact, 'loans', 'contacts');
                      }} className={`relative flex-1 flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-[18px] transition-all overflow-hidden ${hasActiveLoan ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 active:scale-95 border border-blue-500/80 hover:from-blue-700 hover:to-indigo-700 font-extrabold' : 'bg-white/90 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border border-white dark:border-slate-700/50 shadow-sm cursor-default'}`}>{hasSettledLoan && /*#__PURE__*/<div className="absolute top-1.5 right-1.5 w-[14px] h-[14px] bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm z-10 border border-slate-100 dark:border-slate-700">{/*#__PURE__*/<Icon name="check" className="w-2.5 h-2.5" strokeWidth={3.5} />}</div>}{/*#__PURE__*/<Icon name="landmark" className={`w-4.5 h-4.5 ${hasActiveLoan ? 'text-white' : 'opacity-60'}`} />}{/*#__PURE__*/<span className="text-[11px] font-bold leading-none">وام‌ها</span>}</button>}{/*#__PURE__*/<button onClick={e => {
                        e.stopPropagation();
                        openContactDetail(contact, 'demands', 'contacts');
                      }} className={`relative flex-1 flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-[18px] transition-all overflow-hidden ${hasActiveDemand ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25 active:scale-95 border border-emerald-500/80 hover:from-emerald-700 hover:to-teal-700 font-extrabold' : 'bg-white/90 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border border-white dark:border-slate-700/50 shadow-sm cursor-default'}`}>{hasSettledDemand && /*#__PURE__*/<div className="absolute top-1.5 right-1.5 w-[14px] h-[14px] bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm z-10 border border-slate-100 dark:border-slate-700">{/*#__PURE__*/<Icon name="check" className="w-2.5 h-2.5" strokeWidth={3.5} />}</div>}{/*#__PURE__*/<Icon name="arrow-down-left" className={`w-4.5 h-4.5 ${hasActiveDemand ? 'text-white' : 'opacity-60'}`} />}{/*#__PURE__*/<span className="text-[11px] font-bold leading-none">طلب‌ها</span>}</button>}{/*#__PURE__*/<button onClick={e => {
                        e.stopPropagation();
                        openContactDetail(contact, 'debts', 'contacts');
                      }} className={`relative flex-1 flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-[18px] transition-all overflow-hidden ${hasActiveDebt ? 'bg-gradient-to-br from-rose-600 to-red-600 text-white shadow-md shadow-rose-500/25 active:scale-95 border border-rose-500/80 hover:from-rose-700 hover:to-red-700 font-extrabold' : 'bg-white/90 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border border-white dark:border-slate-700/50 shadow-sm cursor-default'}`}>{hasSettledDebt && /*#__PURE__*/<div className="absolute top-1.5 right-1.5 w-[14px] h-[14px] bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-sm z-10 border border-slate-100 dark:border-slate-700">{/*#__PURE__*/<Icon name="check" className="w-2.5 h-2.5" strokeWidth={3.5} />}</div>}{/*#__PURE__*/<Icon name="arrow-up-right" className={`w-4.5 h-4.5 ${hasActiveDebt ? 'text-white' : 'opacity-60'}`} />}{/*#__PURE__*/<span className="text-[11px] font-bold leading-none">بدهی‌ها</span>}</button>}</div>}</div>}</div>}</SwipeToDeleteItem>;
            })}</div>}</div>;
      case 'contact-detail':
        if (!selectedContact) return null;
        return /*#__PURE__*/<div className="space-y-4 animate-fade-in">{/*#__PURE__*/<div className="flex justify-between items-center py-1">{/*#__PURE__*/<button onClick={onBack ? () => onBack('button') : () => navigateBack(loanReturnTab === 'accounts' ? 'accounts' : 'contacts')} className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 active:scale-95 transition-transform">{/*#__PURE__*/<Icon name="arrow-right" className="w-5 h-5 text-slate-700 dark:text-slate-200" />}</button>}{/*#__PURE__*/<h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">پروفایل مخاطب</h3>}{/*#__PURE__*/<div className="flex items-center space-x-1.5 space-x-reverse">{/*#__PURE__*/<button onClick={() => openStackWizard('contact', 'edit', selectedContact)} className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-200 active:scale-95 transition-transform" title=" ">{/*#__PURE__*/<Icon name="pencil" className="w-4 h-4" />}</button>}{/*#__PURE__*/<button onClick={handleDeleteContact} className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-950/60 flex items-center justify-center shadow-sm border border-red-200 dark:border-red-800/60 active:scale-95 transition-transform text-red-600 dark:text-red-400" title=" ">{/*#__PURE__*/<Icon name="trash-2" className="w-4 h-4" />}</button>}{/*#__PURE__*/<button onClick={() => {
                const updated = contacts.map(c => c.id === selectedContact.id ? {
                  ...c,
                  isFavorite: !c.isFavorite
                } : c);
                setContacts(updated);
                setSelectedContact({
                  ...selectedContact,
                  isFavorite: !selectedContact.isFavorite
                });
                showToast(selectedContact.isFavorite ? 'از علاقه مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد');
              }} className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 text-amber-500 active:scale-95 transition-transform" title="">{/*#__PURE__*/<Icon name="star" className={`w-5 h-5 ${selectedContact.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />}</button>}</div>}</div>}{(() => {
            const cardTheme = getContactCardTheme(selectedContact.id);
            const contactInitials = (selectedContact.firstName ? selectedContact.firstName.charAt(0) : '') + (selectedContact.lastName ? selectedContact.lastName.charAt(0) : '');
            return /*#__PURE__*/<div className={`relative overflow-hidden rounded-2xl p-4 border flex flex-col gap-3 group transition-transform duration-200 ${cardTheme.containerClass}`}>{/*#__PURE__*/<div className={`absolute -top-2 -left-2 ${cardTheme.watermarkColor}`} style={{
                opacity: 0.08,
                zIndex: 0,
                pointerEvents: "none"
              }}>{/*#__PURE__*/<Icon name="landmark" className="w-28 h-28 sm:w-32 sm:h-32" />}</div>}{/*#__PURE__*/<div className="relative z-10 w-full flex flex-col gap-3">{/*#__PURE__*/<div className="flex gap-3 items-center min-w-0">{/*#__PURE__*/<div className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden ${cardTheme.avatarClass} flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md border-2 border-white/60 dark:border-slate-700/60 shrink-0`}>{selectedContact.profileImage ? /*#__PURE__*/<img src={selectedContact.profileImage} alt={`${selectedContact.firstName} ${selectedContact.lastName}`} className="w-full h-full object-cover" /> : contactInitials || '؟'}</div>}{/*#__PURE__*/<div className="min-w-0 flex-1">{/*#__PURE__*/<h2 className={`text-base sm:text-lg font-bold leading-tight truncate ${cardTheme.nameClass}`}>{selectedContact.firstName} {selectedContact.lastName}</h2>}{/*#__PURE__*/<p className={`text-xs flex items-center gap-1.5 mt-0.5 ${cardTheme.phoneClass}`}>{/*#__PURE__*/<Icon name="phone" className="w-3.5 h-3.5 shrink-0" />}{/*#__PURE__*/<span dir="ltr" className="font-mono">{selectedContact.phone || 'بدون شماره تماس'}</span>}</p>}</div>}</div>}{/*#__PURE__*/<div className="space-y-2 mt-1">{/*#__PURE__*/<div className={`flex items-center justify-between p-2 rounded-xl backdrop-blur-sm ${cardTheme.rowClass}`}>{/*#__PURE__*/<div className="flex items-center gap-2 shrink-0">{/*#__PURE__*/<Icon name="credit-card" className={`w-4 h-4 shrink-0 ${cardTheme.accentColorClass}`} />}{/*#__PURE__*/<span className={`text-xs font-bold ${cardTheme.rowLabelClass}`}>کارت</span>}</div>}{/*#__PURE__*/<div className="flex items-center gap-2 min-w-0 flex-1 justify-end">{/*#__PURE__*/<span className={`font-mono text-sm sm:text-base font-bold tracking-wider dir-ltr truncate ${cardTheme.rowTextClass}`}>{selectedContact.bankCard ? selectedContact.bankCard : 'ثبت نشده'}</span>}{selectedContact.bankCard && /*#__PURE__*/<button onClick={() => copyToClipboard(selectedContact.bankCard, 'شماره کارت')} className={`${cardTheme.accentColorClass} active:opacity-50 shrink-0 p-1`} title="  ">{/*#__PURE__*/<Icon name="copy" className="w-4 h-4 shrink-0" />}</button>}</div>}</div>}{/*#__PURE__*/<div className={`flex items-center justify-between p-2 rounded-xl backdrop-blur-sm ${cardTheme.rowClass}`}>{/*#__PURE__*/<div className="flex items-center gap-2 shrink-0">{/*#__PURE__*/<Icon name="landmark" className={`w-4 h-4 shrink-0 ${cardTheme.accentColorClass}`} />}{/*#__PURE__*/<span className={`text-xs font-bold ${cardTheme.rowLabelClass}`}>شبا</span>}</div>}{/*#__PURE__*/<div className="flex items-center gap-2 min-w-0 flex-1 justify-end">{/*#__PURE__*/<span className={`font-mono text-[11px] sm:text-xs font-bold dir-ltr truncate ${cardTheme.rowTextClass}`}>{selectedContact.iban ? selectedContact.iban : 'ثبت نشده'}</span>}{selectedContact.iban && /*#__PURE__*/<button onClick={() => copyToClipboard(selectedContact.iban, 'شماره شبا')} className={`${cardTheme.accentColorClass} active:opacity-50 shrink-0 p-1`} title="  ">{/*#__PURE__*/<Icon name="copy" className="w-4 h-4 shrink-0" />}</button>}</div>}</div>}</div>}</div>}</div>;
          })()}{/*#__PURE__*/<div className="space-y-2.5">{/*#__PURE__*/<div className="grid grid-cols-3 gap-2.5">{(() => {
                const contactLoansCount = loans.filter(l => l.contactId === selectedContact.id).length;
                const isActive = profileFilter === 'loans';
                return /*#__PURE__*/<div onClick={() => setProfileFilter(prev => prev === 'loans' ? 'all' : 'loans')} className={`relative bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 text-white rounded-2xl p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer flex flex-col justify-between min-h-[82px] border overflow-hidden group ${isActive ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 border-white/40 shadow-indigo-500/25 scale-[1.02]' : 'border-white/15 opacity-90 hover:opacity-100'}`}>{/*#__PURE__*/<div className="flex items-center justify-between w-full">{/*#__PURE__*/<span className="text-xs sm:text-[13px] font-bold text-white/95">وام‌ها</span>}{/*#__PURE__*/<div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${isActive ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'bg-white/20 text-white backdrop-blur-xs group-hover:scale-110'}`}>{/*#__PURE__*/<Icon name="landmark" className="w-3 h-3" />}</div>}</div>}{/*#__PURE__*/<div className="flex flex-col items-start justify-end mt-1.5">{/*#__PURE__*/<div className="text-[15px] sm:text-base font-black tracking-tight leading-none text-white font-mono font-numeric">{toAppDigits(contactLoansCount)}</div>}{/*#__PURE__*/<div className="text-[9px] sm:text-[10px] text-indigo-100 font-medium mt-0.5">{contactLoansCount === 0 ? 'بدون وام' : 'وام فعال'}</div>}</div>}</div>;
              })()}{(() => {
                const isActive = profileFilter === 'debts';
                return /*#__PURE__*/<div onClick={() => setProfileFilter(prev => prev === 'debts' ? 'all' : 'debts')} className={`relative bg-gradient-to-br from-rose-500 via-rose-600 to-red-600 text-white rounded-2xl p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer flex flex-col justify-between min-h-[82px] border overflow-hidden group ${isActive ? 'ring-2 ring-rose-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 border-white/40 shadow-rose-500/25 scale-[1.02]' : 'border-white/15 opacity-90 hover:opacity-100'}`}>{/*#__PURE__*/<div className="flex items-center justify-between w-full">{/*#__PURE__*/<span className="text-xs sm:text-[13px] font-bold text-white/95">بدهی</span>}{/*#__PURE__*/<div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${isActive ? 'bg-white text-rose-700 font-bold shadow-xs' : 'bg-white/20 text-white backdrop-blur-xs group-hover:scale-110'}`}>{/*#__PURE__*/<Icon name="arrow-down-left" className="w-3 h-3" />}</div>}</div>}{/*#__PURE__*/<div className="flex flex-col items-start justify-end mt-1.5">{/*#__PURE__*/<div className="text-[13px] sm:text-[14px] font-black tracking-tight leading-none text-white font-mono font-numeric truncate max-w-full">{formatAppNumber(selectedContact.totalDebt || 0)}</div>}{/*#__PURE__*/<div className="text-[9px] sm:text-[10px] text-rose-100 font-medium mt-0.5">تومان</div>}</div>}</div>;
              })()}{(() => {
                const isActive = profileFilter === 'demands';
                return /*#__PURE__*/<div onClick={() => setProfileFilter(prev => prev === 'demands' ? 'all' : 'demands')} className={`relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white rounded-2xl p-2.5 sm:p-3 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer flex flex-col justify-between min-h-[82px] border overflow-hidden group ${isActive ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 border-white/40 shadow-emerald-500/25 scale-[1.02]' : 'border-white/15 opacity-90 hover:opacity-100'}`}>{/*#__PURE__*/<div className="flex items-center justify-between w-full">{/*#__PURE__*/<span className="text-xs sm:text-[13px] font-bold text-white/95">طلب</span>}{/*#__PURE__*/<div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${isActive ? 'bg-white text-emerald-700 font-bold shadow-xs' : 'bg-white/20 text-white backdrop-blur-xs group-hover:scale-110'}`}>{/*#__PURE__*/<Icon name="arrow-up-right" className="w-3 h-3" />}</div>}</div>}{/*#__PURE__*/<div className="flex flex-col items-start justify-end mt-1.5">{/*#__PURE__*/<div className="text-[13px] sm:text-[14px] font-black tracking-tight leading-none text-white font-mono font-numeric truncate max-w-full">{formatAppNumber(selectedContact.totalDemand || 0)}</div>}{/*#__PURE__*/<div className="text-[9px] sm:text-[10px] text-emerald-100 font-medium mt-0.5">تومان</div>}</div>}</div>;
              })()}</div>}</div>}{/*#__PURE__*/<div className="space-y-3">{profileFilter === 'all' && (() => {
              const contactLoans = loans.filter(l => l.contactId === selectedContact.id);
              const activeLoans = contactLoans.filter(l => l.remainingAmount > 0);
              const closedLoans = contactLoans.filter(l => l.remainingAmount <= 0);
              const totalLoanRemaining = activeLoans.reduce((acc, l) => acc + (l.remainingAmount || 0), 0);

              const contactDebts = transactions.filter(t => t.contactId === selectedContact.id && (t.type === 'debt' || t.type === 'debt_repayment') && !t.periodId);
              let archivedDebtPeriods = completedPeriods.filter(p => p.contactId === selectedContact.id && p.type === 'debt');
              const archivedDebtTxs = transactions.filter(t => t.contactId === selectedContact.id && (t.type === 'debt' || t.type === 'debt_repayment') && t.periodId);
              const archivedDebtSum = archivedDebtPeriods.reduce((acc, p) => acc + (p.totalAmount || 0), 0) + (archivedDebtPeriods.length === 0 ? archivedDebtTxs.filter(t => t.type === 'debt').reduce((acc, t) => acc + Math.abs(t.amount), 0) : 0);

              const contactDemands = transactions.filter(t => t.contactId === selectedContact.id && (t.type === 'demand' || t.type === 'demand_repayment') && !t.periodId);
              let archivedDemandPeriods = completedPeriods.filter(p => p.contactId === selectedContact.id && p.type === 'demand');
              const archivedDemandTxs = transactions.filter(t => t.contactId === selectedContact.id && (t.type === 'demand' || t.type === 'demand_repayment') && t.periodId);
              const archivedDemandSum = archivedDemandPeriods.reduce((acc, p) => acc + (p.totalAmount || 0), 0) + (archivedDemandPeriods.length === 0 ? archivedDemandTxs.filter(t => t.type === 'demand').reduce((acc, t) => acc + Math.abs(t.amount), 0) : 0);

              const netBalance = (selectedContact.totalDemand || 0) - (selectedContact.totalDebt || 0);

              return (
                <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-3xl p-3.5 sm:p-4 shadow-xl border border-slate-200/80 dark:border-slate-700/60 relative overflow-hidden space-y-3 animate-fade-in mb-2">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Header & Net Balance */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-3 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-2xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30 shrink-0 shadow-xs">
                        <Icon name="bar-chart-3" className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white">کارنامه و خلاصه رفتار مالی</h3>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">تحلیل وضعیت در یک نگاه</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 border shadow-xs ${
                      netBalance > 0 
                        ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40' 
                        : netBalance < 0 
                        ? 'bg-rose-50 dark:bg-rose-500/20 text-rose-900 dark:text-rose-300 border-rose-300 dark:border-rose-500/40' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}>
                      <span className="w-2 h-2 rounded-full animate-pulse bg-current shrink-0" />
                      <span className="font-numeric" dir="rtl">
                        {netBalance > 0 ? `تراز: +${formatAppNumber(netBalance)} تومان (طلبکار)` : netBalance < 0 ? `تراز: -${formatAppNumber(Math.abs(netBalance))} تومان (بدهکار)` : 'تراز حساب: تسویه متوازن'}
                      </span>
                    </div>
                  </div>

                  {/* 3 Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
                    {/* 1. Loans Summary Card */}
                    <div 
                      onClick={() => setProfileFilter('loans')} 
                      className="bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100/90 dark:hover:bg-slate-700/70 rounded-2xl p-3.5 border border-slate-200/90 dark:border-slate-700/60 transition-all cursor-pointer group hover:border-indigo-400/60 flex flex-col justify-between space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-black text-xs">
                          <div className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-700 dark:text-indigo-300">
                            <Icon name="landmark" className="w-4 h-4" />
                          </div>
                          <span>وام‌ها</span>
                        </div>
                        <span className="text-[11px] text-indigo-900 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-500/25 border border-indigo-200 dark:border-indigo-500/30 px-2.5 py-0.5 rounded-full font-black font-numeric" dir="rtl">
                          {toAppDigits(contactLoans.length)} پرونده
                        </span>
                      </div>
                      <div className="space-y-2 text-right">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">وام‌های در جریان:</span>
                          <span className="font-bold text-slate-900 dark:text-slate-100 font-numeric" dir="rtl">
                            {toAppDigits(activeLoans.length)} مورد
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">وام‌های تسویه‌شده:</span>
                          <span className="font-bold text-slate-900 dark:text-slate-100 font-numeric" dir="rtl">
                            {toAppDigits(closedLoans.length)} مورد
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-200 dark:border-white/10">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">مانده بدهی اقساط:</span>
                          <span className="font-black text-indigo-950 dark:text-indigo-300 font-numeric" dir="rtl">
                            {formatAppNumber(totalLoanRemaining)} تومان
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Debts Summary Card */}
                    <div 
                      onClick={() => setProfileFilter('debts')} 
                      className="bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100/90 dark:hover:bg-slate-700/70 rounded-2xl p-3.5 border border-slate-200/90 dark:border-slate-700/60 transition-all cursor-pointer group hover:border-rose-400/60 flex flex-col justify-between space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-black text-xs">
                          <div className="w-7 h-7 rounded-xl bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center text-rose-700 dark:text-rose-300">
                            <Icon name="arrow-down-left" className="w-4 h-4" />
                          </div>
                          <span>بدهی‌ها</span>
                        </div>
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-black border ${
                          selectedContact.totalDebt > 0 
                            ? 'text-rose-900 dark:text-rose-200 bg-rose-100 dark:bg-rose-500/25 border-rose-200 dark:border-rose-500/30' 
                            : 'text-slate-800 dark:text-slate-300 bg-slate-200/80 dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                        }`}>
                          {selectedContact.totalDebt > 0 ? 'بدهکار' : 'تسویه'}
                        </span>
                      </div>
                      <div className="space-y-2 text-right">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">بدهی فعلی (در جریان):</span>
                          <span className="font-black text-rose-950 dark:text-rose-400 font-numeric" dir="rtl">
                            {formatAppNumber(selectedContact.totalDebt || 0)} تومان
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">بایگانی تسویه‌شده:</span>
                          <span className="font-bold text-slate-900 dark:text-slate-100 font-numeric" dir="rtl">
                            {archivedDebtSum > 0 ? `${formatAppNumber(archivedDebtSum)} تومان` : 'بدون بایگانی'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-200 dark:border-white/10">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">تراکنش‌های فعال:</span>
                          <span className="font-bold text-rose-900 dark:text-rose-300 font-numeric" dir="rtl">
                            {toAppDigits(contactDebts.length)} مورد
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 3. Demands Summary Card */}
                    <div 
                      onClick={() => setProfileFilter('demands')} 
                      className="bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100/90 dark:hover:bg-slate-700/70 rounded-2xl p-3.5 border border-slate-200/90 dark:border-slate-700/60 transition-all cursor-pointer group hover:border-emerald-400/60 flex flex-col justify-between space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-xs">
                          <div className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                            <Icon name="arrow-up-right" className="w-4 h-4" />
                          </div>
                          <span>طلب‌ها</span>
                        </div>
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-black border ${
                          selectedContact.totalDemand > 0 
                            ? 'text-emerald-900 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-500/25 border-emerald-200 dark:border-emerald-500/30' 
                            : 'text-slate-800 dark:text-slate-300 bg-slate-200/80 dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                        }`}>
                          {selectedContact.totalDemand > 0 ? 'طلبکار' : 'تسویه'}
                        </span>
                      </div>
                      <div className="space-y-2 text-right">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">طلب فعلی (در جریان):</span>
                          <span className="font-black text-emerald-950 dark:text-emerald-400 font-numeric" dir="rtl">
                            {formatAppNumber(selectedContact.totalDemand || 0)} تومان
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">بایگانی تسویه‌شده:</span>
                          <span className="font-bold text-slate-900 dark:text-slate-100 font-numeric" dir="rtl">
                            {archivedDemandSum > 0 ? `${formatAppNumber(archivedDemandSum)} تومان` : 'بدون بایگانی'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-200 dark:border-white/10">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">تراکنش‌های فعال:</span>
                          <span className="font-bold text-emerald-900 dark:text-emerald-300 font-numeric" dir="rtl">
                            {toAppDigits(contactDemands.length)} مورد
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}{profileFilter === 'loans' && /*#__PURE__*/<div className="space-y-2">{(() => {const contactLoans = loans.filter(l => l.contactId === selectedContact.id);
                const activeLoans = contactLoans.filter(l => l.remainingAmount > 0);
                const closedLoans = contactLoans.filter(l => l.remainingAmount <= 0);
                return /*#__PURE__*/<div className="space-y-2.5">{/*#__PURE__*/<ActiveArchiveSegmentedControl activeLabel="وام‌های فعال" activeCount={toAppDigits(activeLoans.length)} archiveCount={closedLoans.length} currentFilter={contactLoansSubFilter} onChange={setContactLoansSubFilter} colorTheme="indigo" actions={[{
                    label: 'ثبت وام جدید',
                    icon: 'landmark',
                    onClick: () => openStackWizard('loan', 'add')
                  }, {
                    label: 'ثبت قسط جدید',
                    icon: 'receipt',
                    onClick: () => openStackWizard('installment', 'add')
                  }]} />}{contactLoansSubFilter === 'active' ? activeLoans.length > 0 ? activeLoans.map(loan => /*#__PURE__*/<div key={loan.id} onClick={() => openLoanDetail(loan)} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[72px] h-auto">{/*#__PURE__*/<div className="flex items-center space-x-3 space-x-reverse min-w-0 flex-1">{/*#__PURE__*/<div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">{/*#__PURE__*/<Icon name={loan.icon || 'landmark'} className="w-6 h-6" />}</div>}{/*#__PURE__*/<div className="min-w-0 flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">{/*#__PURE__*/<h3 className="text-sm font-bold text-slate-800 dark:text-white leading-snug break-words whitespace-normal">{loan.title}</h3>}{/*#__PURE__*/<p className="text-xs text-slate-500 dark:text-slate-400 whitespace-normal">اقساط: {/*#__PURE__*/<span className="font-mono font-numeric">{formatAppNumber(loan.installmentAmount)}</span>} تومان</p>}</div>}</div>}{/*#__PURE__*/<div className="text-left shrink-0 flex flex-col items-center">{/*#__PURE__*/<div className="font-bold text-base leading-none text-indigo-600 dark:text-indigo-400 font-mono font-numeric">{formatAppNumber(loan.principalAmount)}</div>}{/*#__PURE__*/<div className="text-xs text-indigo-600 dark:text-indigo-400">تومان</div>}</div>}</div>) : /*#__PURE__*/<div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60">هیچ وام فعالی برای این شخص ثبت نشده است.</div> : closedLoans.length > 0 ? closedLoans.map(loan => /*#__PURE__*/<div key={loan.id} onClick={() => openLoanDetail(loan)} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 opacity-75 hover:opacity-100 transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[72px] h-auto">{/*#__PURE__*/<div className="flex items-center space-x-3 space-x-reverse min-w-0 flex-1">{/*#__PURE__*/<div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">{/*#__PURE__*/<Icon name="check-circle-2" className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}</div>}{/*#__PURE__*/<div className="min-w-0 flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">{/*#__PURE__*/<h3 className="text-sm font-bold text-slate-800 dark:text-white leading-snug break-words whitespace-normal line-through decoration-slate-400">{loan.title}</h3>}{/*#__PURE__*/<p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold whitespace-normal">تسویه کامل شد</p>}</div>}</div>}{/*#__PURE__*/<div className="text-left shrink-0 flex flex-col items-center">{/*#__PURE__*/<div className="font-bold text-base leading-none text-slate-500 font-mono font-numeric">{formatAppNumber(loan.principalAmount)}</div>}{/*#__PURE__*/<div className="text-xs text-slate-500">تومان</div>}</div>}</div>) : /*#__PURE__*/<div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60">هیچ وام تسویه‌شده یا بایگانی‌شده‌ای وجود ندارد.</div>}</div>;
              })()}</div>}{profileFilter === 'debts' && /*#__PURE__*/<div className="space-y-2">{(() => {
                const contactDebts = transactions.filter(t => t.contactId === selectedContact.id && (t.type === 'debt' || t.type === 'debt_repayment') && !t.periodId);
                let archivedDebtPeriods = completedPeriods.filter(p => p.contactId === selectedContact.id && p.type === 'debt');
                const archivedDebtTxs = transactions.filter(t => t.contactId === selectedContact.id && (t.type === 'debt' || t.type === 'debt_repayment') && t.periodId);
                if (archivedDebtPeriods.length === 0 && archivedDebtTxs.length > 0) {
                  let sum = 0;
                  archivedDebtTxs.forEach(t => {
                    if (t.type === 'debt') sum += Math.abs(t.amount);
                  });
                  archivedDebtPeriods = [{
                    id: archivedDebtTxs[0].periodId || 'p_auto_debt_' + selectedContact.id,
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
                const activeDebtCount = contactDebts.length > 0 ? contactDebts.length : selectedContact.totalDebt > 0 ? 1 : 0;
                return /*#__PURE__*/<div className="space-y-2">{/*#__PURE__*/<ActiveArchiveSegmentedControl activeLabel="بدهی‌های فعال" activeCount={activeDebtCount} archiveCount={archivedDebtPeriods.length} currentFilter={contactDebtsSubFilter} onChange={setContactDebtsSubFilter} colorTheme="rose" actions={[{
                    label: 'ثبت بدهی جدید',
                    icon: 'arrow-down-left',
                    onClick: () => openStackWizard('debt', 'add')
                  }, {
                    label: 'ثبت بازپرداخت',
                    icon: 'check-circle-2',
                    onClick: () => openStackWizard('debt_repayment', 'add')
                  }]} />}{contactDebtsSubFilter === 'active' ? contactDebts.length > 0 ? contactDebts.map(tx => {
                    const isRepay = tx.type === 'debt_repayment';
                    return /*#__PURE__*/<SwipeableTxCard key={tx.id} tx={tx} contacts={contacts} loans={loans} colorType="rose" hasShadow={true} isHighlighted={highlightedTxId !== null && String(tx.id) === String(highlightedTxId)} onEdit={txItem => openStackWizard(isRepay ? 'debt_repayment' : 'debt', 'edit', txItem)} onDelete={txItem => requestDeleteTx(txItem, 'debt')} />;
                  }) : selectedContact.totalDebt > 0 ? /*#__PURE__*/<div onClick={() => openStackWizard('debt', 'edit', {
                    contactId: selectedContact.id,
                    amount: selectedContact.totalDebt
                  })} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 hover:border-rose-400 transition-all cursor-pointer flex items-center justify-between">{/*#__PURE__*/<div className="w-full flex flex-col gap-1">{/*#__PURE__*/<div className="flex items-center justify-between w-full">{/*#__PURE__*/<div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/50 rounded-2xl flex items-center justify-center text-rose-500 dark:text-rose-400 shrink-0">{/*#__PURE__*/<Icon name="arrow-down-left" className="w-6 h-6" />}</div>}{/*#__PURE__*/<div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">{/*#__PURE__*/<h3 className="font-bold text-slate-800 dark:text-white text-sm">ثبت بدهی جدید به {selectedContact.firstName} {selectedContact.lastName}</h3>}{/*#__PURE__*/<p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{selectedContact.note || 'توضیحات ثبت نشده'}</p>}</div>}{/*#__PURE__*/<div className="text-left shrink-0 flex flex-col items-center">{/*#__PURE__*/<div className="text-rose-600 dark:text-rose-400 font-bold text-base leading-none font-mono font-numeric">{formatAppNumber(selectedContact.totalDebt)}</div>}{/*#__PURE__*/<div className="text-rose-600 dark:text-rose-400 text-xs">تومان</div>}</div>}</div>}</div>}</div> : /*#__PURE__*/<div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60">هیچ بدهی فعالی برای این شخص ثبت نشده است.</div> : archivedDebtPeriods.length > 0 ? archivedDebtPeriods.map(period => /*#__PURE__*/<div key={period.id} onClick={() => openArchivedPeriodDetail(period)} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 opacity-75 hover:opacity-100 transition-all cursor-pointer flex items-center justify-between">{/*#__PURE__*/<div className="w-full flex flex-col gap-1">{/*#__PURE__*/<div className="flex items-center justify-between w-full">{/*#__PURE__*/<div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/50 rounded-2xl flex items-center justify-center text-rose-500 dark:text-rose-400 shrink-0">{/*#__PURE__*/<Icon name="arrow-down-left" className="w-6 h-6" />}</div>}{/*#__PURE__*/<div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">{/*#__PURE__*/<h3 className="font-bold text-slate-800 dark:text-white text-sm">{period.title || 'دوره تسویه‌شده بدهی'}</h3>}{/*#__PURE__*/<p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{formatDateToNumericJalali(period.startDate)} تا {formatDateToNumericJalali(period.endDate)}</p>}</div>}{/*#__PURE__*/<div className="text-left shrink-0 flex flex-col items-center">{/*#__PURE__*/<div className="text-rose-600 dark:text-rose-400 font-bold text-base leading-none font-mono font-numeric">{formatAppNumber(period.totalAmount || 0)}</div>}{/*#__PURE__*/<div className="text-rose-600 dark:text-rose-400 text-xs">تومان</div>}</div>}</div>}</div>}</div>) : /*#__PURE__*/<div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60">هیچ دوره بدهی تسویه‌شده یا بایگانی‌شده‌ای وجود ندارد.</div>}</div>;
              })()}</div>}{profileFilter === 'demands' && /*#__PURE__*/<div className="space-y-2">{(() => {
                const contactDemands = transactions.filter(t => t.contactId === selectedContact.id && (t.type === 'demand' || t.type === 'demand_repayment') && !t.periodId);
                let archivedDemandPeriods = completedPeriods.filter(p => p.contactId === selectedContact.id && p.type === 'demand');
                const archivedDemandTxs = transactions.filter(t => t.contactId === selectedContact.id && (t.type === 'demand' || t.type === 'demand_repayment') && t.periodId);
                if (archivedDemandPeriods.length === 0 && archivedDemandTxs.length > 0) {
                  let sum = 0;
                  archivedDemandTxs.forEach(t => {
                    if (t.type === 'demand') sum += Math.abs(t.amount);
                  });
                  archivedDemandPeriods = [{
                    id: archivedDemandTxs[0].periodId || 'p_auto_demand_' + selectedContact.id,
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
                const activeDemandCount = contactDemands.length > 0 ? contactDemands.length : selectedContact.totalDemand > 0 ? 1 : 0;
                return /*#__PURE__*/<div className="space-y-2">{/*#__PURE__*/<ActiveArchiveSegmentedControl activeLabel="طلب‌های فعال" activeCount={activeDemandCount} archiveCount={archivedDemandPeriods.length} currentFilter={contactDemandsSubFilter} onChange={setContactDemandsSubFilter} colorTheme="emerald" actions={[{
                    label: 'ثبت طلب جدید',
                    icon: 'arrow-up-right',
                    onClick: () => openStackWizard('demand', 'add')
                  }, {
                    label: 'ثبت بازپرداخت',
                    icon: 'check-circle-2',
                    onClick: () => openStackWizard('demand_repayment', 'add')
                  }]} />}{contactDemandsSubFilter === 'active' ? contactDemands.length > 0 ? contactDemands.map(tx => {
                    const isRepay = tx.type === 'demand_repayment';
                    return /*#__PURE__*/<SwipeableTxCard key={tx.id} tx={tx} contacts={contacts} loans={loans} colorType="emerald" hasShadow={true} isHighlighted={highlightedTxId !== null && String(tx.id) === String(highlightedTxId)} onEdit={txItem => openStackWizard(isRepay ? 'demand_repayment' : 'demand', 'edit', txItem)} onDelete={txItem => requestDeleteTx(txItem, 'demand')} />;
                  }) : selectedContact.totalDemand > 0 ? /*#__PURE__*/<div onClick={() => openStackWizard('demand', 'edit', {
                    contactId: selectedContact.id,
                    amount: selectedContact.totalDemand
                  })} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between">{/*#__PURE__*/<div className="w-full flex flex-col gap-1">{/*#__PURE__*/<div className="flex items-center justify-between w-full">{/*#__PURE__*/<div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center text-emerald-500 dark:text-emerald-400 shrink-0">{/*#__PURE__*/<Icon name="arrow-up-right" className="w-6 h-6" />}</div>}{/*#__PURE__*/<div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">{/*#__PURE__*/<h3 className="font-bold text-slate-800 dark:text-white text-sm">طلب شخصی</h3>}{/*#__PURE__*/<p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{selectedContact.note || `طلب از ${selectedContact.firstName} ${selectedContact.lastName}`}</p>}</div>}{/*#__PURE__*/<div className="text-left shrink-0 flex flex-col items-center">{/*#__PURE__*/<div className="text-emerald-600 dark:text-emerald-400 font-bold text-base leading-none font-mono font-numeric">{formatAppNumber(selectedContact.totalDemand)}</div>}{/*#__PURE__*/<div className="text-emerald-600 dark:text-emerald-400 text-xs">تومان</div>}</div>}</div>}</div>}</div> : /*#__PURE__*/<div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60">هیچ طلبی از این شخص ثبت نشده است.</div> : archivedDemandPeriods.length > 0 ? archivedDemandPeriods.map(period => /*#__PURE__*/<div key={period.id} onClick={() => openArchivedPeriodDetail(period)} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-sm  pl-6 pr-4 py-3 opacity-75 hover:opacity-100 transition-all cursor-pointer flex items-center justify-between">{/*#__PURE__*/<div className="w-full flex flex-col gap-1">{/*#__PURE__*/<div className="flex items-center justify-between w-full">{/*#__PURE__*/<div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center text-emerald-500 dark:text-emerald-400 shrink-0">{/*#__PURE__*/<Icon name="arrow-up-right" className="w-6 h-6" />}</div>}{/*#__PURE__*/<div className="flex-1 text-right flex flex-col gap-0.5 pl-4 pr-2">{/*#__PURE__*/<h3 className="font-bold text-slate-800 dark:text-white text-sm">{period.title || 'دوره تسویه‌شده طلب'}</h3>}{/*#__PURE__*/<p className="text-slate-500 dark:text-slate-400 text-xs whitespace-normal">{formatDateToNumericJalali(period.startDate)} تا {formatDateToNumericJalali(period.endDate)}</p>}</div>}{/*#__PURE__*/<div className="text-left shrink-0 flex flex-col items-center">{/*#__PURE__*/<div className="text-emerald-600 dark:text-emerald-400 font-bold text-base leading-none font-mono font-numeric">{formatAppNumber(period.totalAmount || 0)}</div>}{/*#__PURE__*/<div className="text-emerald-600 dark:text-emerald-400 text-xs">تومان</div>}</div>}</div>}</div>}</div>) : /*#__PURE__*/<div className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center text-xs text-slate-400 border border-slate-100 dark:border-slate-700/60">هیچ دوره طلب تسویه‌شده یا بایگانی‌شده‌ای وجود ندارد.</div>}</div>;
              })()}</div>}</div>}{/*#__PURE__*/<div className="h-12 shrink-0 pointer-events-none" />}</div>;
      case 'loan-detail':
        if (!selectedLoan) return null;
        const loanContactObj = contacts.find(c => c.id === selectedLoan.contactId);
        const loanContactDisplayName = loanContactObj ? `${loanContactObj.firstName || ''} ${loanContactObj.lastName || ''}`.trim() : selectedLoan.contactName || '';
        const isClosed = selectedLoan.remainingAmount <= 0 || getLoanNextDueInfo(selectedLoan, transactions).isCompleted;
        const totalInst = selectedLoan.totalInstallments || (selectedLoan.installmentAmount > 0 ? Math.ceil(selectedLoan.totalRepayment / selectedLoan.installmentAmount) : 12);
        const repaymentTxs = transactions.filter(t => t.loanId === selectedLoan.id && t.type === 'repayment');
        const paidInst = repaymentTxs.length;
        const installmentAmount = Number(selectedLoan.installmentAmount || (totalInst > 0 ? Math.round(selectedLoan.totalRepayment / totalInst) : 0));
        const nextDueInfo = getLoanNextDueInfo(selectedLoan, transactions);
        const progressPct = totalInst > 0 ? Math.min(100, Math.round(paidInst / totalInst * 100)) : 0;
        return /*#__PURE__*/<div className="space-y-4 animate-fade-in pb-8">{/*#__PURE__*/<div className="flex justify-between items-center py-1">{/*#__PURE__*/<button onClick={onBack ? () => onBack('button') : () => navigateBack(loanReturnTab || 'accounts')} className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 active:scale-95 transition-transform">{/*#__PURE__*/<Icon name="arrow-right" className="w-5 h-5 text-slate-700 dark:text-slate-200" />}</button>}{/*#__PURE__*/<h1 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate px-2">{selectedLoan.title}</h1>}{/*#__PURE__*/<div className="flex items-center space-x-1.5 space-x-reverse shrink-0">{/*#__PURE__*/<button onClick={() => openStackWizard('loan', 'edit', selectedLoan)} className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-200 active:scale-95 transition-transform" title=" ">{/*#__PURE__*/<Icon name="pencil" className="w-4 h-4" />}</button>}{/*#__PURE__*/<button onClick={() => handleDeleteLoanClick(selectedLoan)} className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-950/60 flex items-center justify-center shadow-sm border border-red-200 dark:border-red-800/60 active:scale-95 transition-transform text-red-600 dark:text-red-400" title=" ">{/*#__PURE__*/<Icon name="trash-2" className="w-4 h-4" />}</button>}</div>}</div>}{/*#__PURE__*/<div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-900 rounded-3xl p-5 text-white relative overflow-hidden card-shadow border border-blue-400/30 space-y-4" data-purpose="loan-summary-header">{/*#__PURE__*/<div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />}{/*#__PURE__*/<div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />}{/*#__PURE__*/<div className="absolute left-4 bottom-1 opacity-15 pointer-events-none text-white">{/*#__PURE__*/<svg fill="currentColor" height="180" viewBox="0 0 24 24" width="180" xmlns="http://www.w3.org/2000/svg">{/*#__PURE__*/<path d="M12 2L2 7v2h20V7L12 2zm0 18H4v-9h1v9h2v-9h2v9h2v-9h2v9h2v-9h2v9h1v-9h1v9h-2zm-10-9h20v2H2v-2z" />}</svg>}</div>}{/*#__PURE__*/<div className="relative z-10 space-y-3">{/*#__PURE__*/<div className="flex items-start justify-between gap-2">{/*#__PURE__*/<div className="flex items-start gap-3 min-w-0 flex-1">{/*#__PURE__*/<div className="bg-white/15 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 shrink-0 mt-0.5">{/*#__PURE__*/<Icon name={selectedLoan.icon || 'landmark'} className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-200" />}</div>}{/*#__PURE__*/<div className="min-w-0 flex-1">{/*#__PURE__*/<h2 className="text-base sm:text-lg font-bold text-white break-words leading-snug">{selectedLoan.title}</h2>}{/*#__PURE__*/<div className="flex items-center gap-1.5 text-xs opacity-90 mt-1">{/*#__PURE__*/<span className={`w-2 h-2 rounded-full ${isClosed ? 'bg-emerald-400' : 'bg-emerald-400 animate-pulse'}`} />}{/*#__PURE__*/<span className="text-indigo-200 font-medium">{isClosed ? `پرونده تسویه‌شده${loanContactDisplayName ? ` (${loanContactDisplayName})` : ''}` : `پرونده فعال${loanContactDisplayName ? ` (${loanContactDisplayName})` : ''}`}</span>}</div>}</div>}</div>}</div>}{/*#__PURE__*/<div className="bg-white/10 backdrop-blur-md rounded-2xl px-3.5 py-2 border border-white/10 flex items-center justify-between">{/*#__PURE__*/<span className="text-xs text-indigo-200 font-medium">مانده وام</span>}{/*#__PURE__*/<div className="flex items-baseline gap-1.5 font-mono font-numeric">{/*#__PURE__*/<span className="text-xl sm:text-2xl font-black text-white">{formatAppNumber(selectedLoan.remainingAmount)}</span>}{/*#__PURE__*/<span className="text-xs text-indigo-200 font-normal">تومان</span>}</div>}</div>}</div>}{/*#__PURE__*/<div className="pt-2 relative z-10 space-y-1.5">{/*#__PURE__*/<div className="flex justify-between items-center text-xs opacity-90">{/*#__PURE__*/<span className="text-indigo-200">پیشرفت پرداخت اقساط</span>}{/*#__PURE__*/<span className="text-emerald-300 font-bold">{toAppDigits(paidInst)} از {toAppDigits(totalInst)} قسط پرداخت شده</span>}</div>}{/*#__PURE__*/<div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">{/*#__PURE__*/<div className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500 shadow-xs" style={{
                  width: `${progressPct}%`
                }} />}</div>}</div>}</div>}{/*#__PURE__*/<div className="bg-white dark:bg-slate-800 rounded-2xl card-shadow border border-slate-100 dark:border-slate-700/60 p-2 sm:p-3 grid grid-cols-3 divide-x divide-x-reverse divide-slate-100 dark:divide-slate-700/60 text-center" data-purpose="loan-quick-stats">{/*#__PURE__*/<div className="px-1 py-1.5 flex flex-col items-center justify-center text-center min-w-0">{/*#__PURE__*/<div className="bg-green-50 dark:bg-green-950/60 p-2 rounded-xl inline-flex items-center justify-center mb-1.5 shrink-0">{/*#__PURE__*/<svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">{/*#__PURE__*/<path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />}</svg>}</div>}{/*#__PURE__*/<div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium text-center">مبلغ اصل وام</div>}{/*#__PURE__*/<div className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400 font-mono font-numeric mt-0.5 break-words max-w-full text-center leading-tight">{formatAppNumber(selectedLoan.principalAmount)}</div>}{/*#__PURE__*/<div className="text-[9px] text-gray-400 font-medium text-center mt-0.5">تومان</div>}</div>}{/*#__PURE__*/<div className="px-1 py-1.5 flex flex-col items-center justify-center text-center min-w-0">{/*#__PURE__*/<div className="bg-blue-50 dark:bg-blue-950/60 p-2 rounded-xl inline-flex items-center justify-center mb-1.5 shrink-0">{/*#__PURE__*/<svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">{/*#__PURE__*/<path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />}</svg>}</div>}{/*#__PURE__*/<div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium text-center">مبلغ هر قسط</div>}{/*#__PURE__*/<div className="text-xs sm:text-sm font-bold text-gray-800 dark:text-slate-100 font-mono font-numeric mt-0.5 break-words max-w-full text-center leading-tight">{formatAppNumber(installmentAmount)}</div>}{/*#__PURE__*/<div className="text-[9px] text-gray-400 font-medium text-center mt-0.5">تومان</div>}</div>}{/*#__PURE__*/<div className="px-1 py-1.5 flex flex-col items-center justify-center text-center min-w-0">{/*#__PURE__*/<div className="bg-indigo-50 dark:bg-indigo-950/60 p-2 rounded-xl inline-flex items-center justify-center mb-1.5 shrink-0">{/*#__PURE__*/<svg className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viex��}ۖ�ƕ�{���h��A�ٝH^m�{V��X�s��hY �n"/�n������A_1/�x2�r�999�;��[���]U �
�ټ�䶒&Y 
uٵwƳ[�:��	������*�0�޼yvvV;k����M�^��NO*����ɏ?���_~�����&v8 �[�:d��ưC���8 ��Y��E,s`6m�X��z�2�O��_�|�%�$֩i%7�i��?~���9={r�⏧�����;R�������U!7o?��?������ࡍ�<;>��έJ��B�Y����ķύV�N����6�:Fڎǣ�:}w:dw��Q�����6����d���o�o�Q�ճ�C��!�;���X:����Xƣ1�6���ah�k-����q6���3��8�z�8h�9v���{2a�Gp���yt<�����p�9��'o���7���Ͽq��9���C;�y0����_l��ܪ�������E�� �w�wO�F[Zިn�y��5)����_�t����^��2���K���D�>~���g �o��7�����{�A�8!5�Tu���>'��.������^������wd�-�������Ϳy���[�n�w��_^|u�gx�����o	F�2,�h��@g//����qI}>��O�����q6pC�m�b�� M��73�L�&��~�v|F��A�w�C x֋غ�]'���9ƹѨ�=�mL��d� ��=2�Nh�^ ����P�2b����7�G,rbO�
�(~mu �|��{�{���<��_Wf~ �mյd{��5��d�,�`|H0 r�93�<"��c.��!��3t4Ynq��� S���4����g0������lqt �3�ӱ�y�*��ȉp��Jo���ݝ�7�+��u�VH���iyXY��4�@�,Ӄ/�} M��A?�H�Lb"�2��-�i��47L�p�aCw�^��{�<��z�����|���g���t���O"�"@0>���+S�֎aY�geS?��!3� ����C Z]ǯ��� ���D-����3�χ Z�������h�W8����p��5�(ڥ;��:j}MP���Q�Ĳ�tl���'�U7���~�#���'�l�2���vr�K�ӪO��v�GC؎�SM������Çi���`��>�p��F���j�F	����k$��UZ(a~��d���d� шĘ�)1�A\m����K�"�ӦL��m4~�Y����?~�"�W@xs�g�$�w��;�g���5�}mt�2*�Ǌ+W�O�_ο�����T�_^^��p�ʁ;�Jr��,٪d_�����oK�kAh��T1� Q׆�o��B=���@^akX�/TD��f���a�'�C�abȐ�y�hW�<]#at��$I��"��2��M׈ⵒ$.>G����K����RBE��(Op��HI �>���_ ��N@��$_��u��Sxɟ�0G����C�{	�^���c�5�lpS>��c�P�:��L���:�[�!@�����	�_<ӹ��M��a�a{��$��ڊTn�R�@�iX�Fkh����4�/�f�V�cu��sӤ?��{�m�:�V�mп���� ���m�g�w�������#\ �O�qH[sn¹�Ϟ9}�OJ"��q���7I���K��\#��T%N��_rz�_���|zd��p&��Wp0�7�؛�R��*HD�dm�*�g�T�#�کK�$r`ʦ�]'<s�����)��E9�h����F_�L�T�m�S'�d-���������`���Y�dr�$ڝ:�V�O�6�`�-�g��K�2j�����8~㿧 �1��F�V���n-�Ӭ��v�a}��Nè��r+��xt�:��;w�k�i�m�j|��Ӗǐ#:���̧:\�F��"�|�cw��7�c��	`,&`��9}��t��F��&3:��9�ӣ]�ޤ�`X��҉l1���q�����p�L����uR�M{��x@@����y��� ��?�y�Կ rC�,pb�H�;�4J`p B���7"��F8<MO�[�ċ��$�O��S��#�DĿ��"ڗ$۳��p:�}�x�����,�z��%ܐ�D��g�ٖy�?7�4)�xṿ�tb7�����V������."�>�# U[hx��^�˹D?.�A|�9��\ⱸ^����k�������^ތs\by�J���/������)�KC$ \�Af e�D
����!)V5�f�n���(f@�4~�G�xr[&G���� |ƙ�E���4�#2���ޓ[�@�u��'��~h�W�S�{�;.����o��ٱ�}�� }7���ӿ� ߃��.�y�PԔ����걘�ϸp�;!�o�7t�#FG�2ƇA��P%�#	������~_�ӣf�(��?������Ep��/�[ ��O?V����|�������^�)60��m ���G�H�iw���6�&_a��>9(�hK*kh�]VD��rzx:�7Z�� �N�U����I�"Ӧ��؎�����.�Zf�=6���A8��KH��H
PX4Kh�L��Qdx](�uW+FsT�Op��U�0��{��`,�TV��ʘ�k� �rh[C��)��WEY*b�,�%O$	c�xJ�bC[�	��S�(j�8Jh<��R�7cf����?�p�8�'F��{�g�%KG�ЂpS�K��e�1G��d�֜1@����O�7efR(Ǿ^G��S��(T��,�y���a���#0�2���o�"�H-W� PE���)I�x����2�ОU�{$v'ѝ���s�G#w���wg�s�p��}�]tM��r/�1�m	���V�2< �� �m�ֳg?"�c �nx~H�{�k��Q�?'6mng���z�3g�K�Ќ+9���S��k�c�J?�eOn?��k�l$��VQ�/�~$%�`s]4@YT�߾���oMY�lC����B.���ig��ОT��l�����r7��܉��؃�:�g��@���s��
<gg�zr����'��$�[Ϣo�	�$h�\�	��/|d��d1�)��=�d�:��A�����>y�b����7���wG'U:�]
.�Ey��x�n@8{hS9ց��=@{���F��w~3u��]x0��+�0N�S�C�����D�NpHz�U����5���[�T�� q�E��Nn���O5�Ǥ�<v�VB�v�/"�q8�G�(����Y�)�Z�:TA�KA�Q{'��G�G8�w�bg(X0�#[��鋆�xI�@
Y�r:���J7my�K�:�I��P���&�V�N���%A���c<��P�8�JO��3a��DZ@��G����>��#.ܒ@�[��)4�L z���[Y��^�g�l���	�O$��(.��n@Dvm2U�+��>����=�Z��Ǥ��v�-s�#|���Y �v9UIwA��cNn<�k|j��+�5i �3�8@�N{�gD��*Y>[%�Ό8x�e�j�q
i�B,�E2�B��h�-�2������%�H����խ��^9+sU�OG=����?�7��H�/3�0���q�a�V2���@�
��5��7e���1���DB�e�'�(�<4&p�!�0���AGZyPh2��������R����I\��``���8���6&u5��H�7�r\�o� o���G}���
���*�F;�F-"�2���%$�G%���1J�*��F�.ҭl�g�t�6K���e�2�%)Q4��k4����n&��|��+���KQcQ���,`����=u���ޝM�~���o{U�W��2�JH/��6x�C��v1�0�6\���;)m?U�Ĺ��<�q�B�i8��
�@��F�I-��G ��
������l��?����/�ﰪ�@�gٱ�� ��7&���}�Ao�0�;�h߈v�#z�n�ڢ�%�P�ϻ�]����L�L�ڇ�;�c��w����_C���v����i���i'J������j���]7�x�9.8�,��(�P[�>p&��oK*��Dsl�x���3�0c�ѽU�e6�5�x2��UP�Q]�96�3�D�����B܁��n{_���T�)�p��<�\���M�h)N ��d��`����P��
�saM�i�N�s�U���#!ť�d�j��|A��ʍCކV�u}Sڃ�'C�	����� x�s�5�V��'F8 ��ٌ�}Ʊ�wwD&]�SI�'���W�.1"JTYQ"@U�����F��q�x_�A�η	'��g�)vad��'�-��D�c�s�.=� ��Aew/c	T�5�seI�%DKJˀ�f����>��ѯȖ�e3�\�1b�c�>̅�g��@H�͋蹝�}ww��40s`<��<W~�T�uZoￋ&�mv��6��������8�75����a��u
ӧ�M�*����Ie�52�߿� ɘ���3 0���*W�J����-fʎ���B|�PC @��,?G��bԃަ��� ��H�C'��]`)!щ��e� LU{�-��g���3$d��+m0/'�+���c9�LH��ͱ{8p�}9��$Ĝ�.:�F� �ķ�.:v�c��c<L4	���\g*�X���7u�	2�-(�c��^ԥ`�Q�H���ŝ������e	%���n�Y�-0+��P+���hU'����Bޚh�j��+o�\L`4 [@��՝�WߊW_\:�N ��Ͽ;�840����@�����`�k�P�jmq�I��t3Z32kfK;5A��z4ߥ��'0�>�=�
����xB��Ϥh��b-��az��x0�9�a��x��wÕ��[�~��Κ�8��8���p�'�2�>���Oڽ:0�Q;@�p�zo�g�R�"�F��RA:0�J���|:�{���҆���>0��S���a�4-�U";�pY0�g%��T���˂�e�sj�m�{J��Z(,p������֡�a ,4#X >NM`�# �(aȃ
!L�t�3ᆧ�&�@{zL�4�X@�����H�ĿG�d8���Y��H��m��Lӂim�֕�d�fֹ5)?�{�M�ڽ'}8J��}��(�} ��m�<A�F��i����?jPk1�	>�iGK�7xf6���HS�E�@d��NT��P��SRX���u���"P�vd��1�v���׳�h�������H�qk�*��,�j��SO�xXRA�����(c�D"�hf���wS-�����e�,9K�xT@�n�(gǥ��xH�h1G��Y�V&�T��(�ۋ�A�^�E$׋.��l�J(�V��3��i�3O��9���0)����S
eD��X=�B�!ߞ�4�Ac�hz.H���{Hmq�2s�d�'T��F�����K�I:��m�gƒUS�|ؘ`��d�����5�m^��N�0��5~5�o�2v���23�*b�"=�{t������Q�M�^>:��|�Y� ���k���H/���	+`��s[xE�b�h2��A�6ؤ��u�6�Y�%�R���H .U��y�c��j����>��񗘗�J�R+�_a���B�o�.0�Ah��6�h�c��ȷ\ �F��#�������J[w��Qh�F����j�Ok�ee�W͔=-��i&0� �+�i����t�S�iƯ������ϫ��$�Q2� ��.�6���I~�WM|�J~K��<���i��i'�_q���%m�>W��3�]�1����=�s0��Y`
ő��d���9*�$JƐ�y����#<�GTO�q&�ӕ���V�b���nfd�����3�-�m6E�x����sJSrM;K�΢M�%�,(9����)swM'���1�ǵ�
xN�4��_���+��##�
[�����������\��
S����%uK���,�,�k�ZR��#?L��Pi�kR�BR��_�R�D��+@�Q?��I��)b�uc�$V�ԭ�T7(K�=[<~/��X��E��,Ϋ3ْ�`F���P[��W�2���I����?A"mo���҃����Rm�FX.�.ݜ1��"S��z̔�7��Yg��>�'W%
�WJݬ�9搅=��C`����ZR7�P6���de���*��G�L��n�$����p]�GQ�i��ؽ�����Q��l����:�JM���q)�u�>q�	MT�<"�Z
���5�ߒ'C9���Wib�C�!�K�s�JR���$��$;�.��d�4Φ�C�b���0�����o'�����;TnK���g�"�I��6����w��y����lv�َ��$i����	]����N���)?z��Z�Ai�8-��Ia+喒k{��ȹ�hs�W!�3���,���+�4��W�Q~u�1�ߞJ̫��1��p^��ّ��Y�Ǹ��TF-9F�GX�8�r­�	C@���bk-9~�Id*�&��̰��8��C/�a�� �)�05��Y�&�! Uޕ�~"*`�h�Z���4>j���S�&���?�Lf�6���?�V�{�_���}$��`=�{ʨ
b�������¤�ͫ��h��q� ]��S;��<�21]�)Sո��b�Śpm	ͤ��V_K�ղQ�%0������O�#{�s6i}L�&=�g�=�u�h�b�,���[��0.�i�G��jecZ!s20��'�hȜS{�C�gAv���FjehԬZs�z���UQQ*l5�˫л�&�E�����w���gWlo;�BBě|� {�أ��2��������	����Å�\^��� �����ɠ�(��l@��/�aY�J�/'��8�C���T��Q�b�v~�V����p1 <���»'E$Zۉ��J7�N=	'S/�%r�J~sV��ɪ���T�w�0w>�.�VJL��oRy\�
��"�*6�/ a��G�����,?m@�l:���LtR�-�&\` ���Ub�a��<n�y���Qh�B�@�KF�6�6�5�J�ef�Q������Ļ�J𨒿���R�.uu1G� �xe�¹mF�l��I�F�k?V؊�$�ɝ��pz�G;���j�<| 3)�㥋"�7}�a�#ol�s{*��^j�iI�o�ߑ��_^|��/�{�u�V�V��\|Ekg������%���cg���@Ngvo쳙W��[r���{��KT�Ŧ�:`�α��w�ڏ9hS�R�#*���R12�w䔦�'�V���h�Ӓ�h�˕8'q���xNo|B����8�j�O�,��j�C��7o���[�q��	��E�`�;��&OBg���l�؀��?�`1z z]%,�+���N&�u���'Ն���g����eG��O4j�!��6���%ͦ�`�p|r�9����>���ؓ�c������%s^L�\�+5�uRf6��@!s�H�zm:�Kz_�AEy���`�:���R�r�ò�C7��'@i��)��Xo���s��s+���g��8+uC��M��?]ĉB�,�?�! �+�]\}'j��J�b7��E�^��ԋRk[�*"D�r��'Q�yj����>�t�y*
�9xRQ�Ø~��.3��+�@�U g��	@K�ʵ�,)����y�?J�#0У����/�fB�u��alG�.��N-Ǔ�|x��N���DZ@DԜhI��b�Y.��t�+��LfӸy]�ll橴hL�)x{�V�?�0t��������Np �"3�.�x�`�3�n���xM�&n�A\�h̅�������Տ�ć��/o�E@��*V�̆-�Z����.2�Iyg�.����Ǚ	�c�����{=s�K�Ŋeg]ŀJ����a��2CDV-�CD�0���@߬,wu_����
(�
р�L\�啑�*b���D�T��b>%k��@B��F�1F
��+r�}.�}pę�/^=�C�|�zJ2A�K�x���L:Q���z؂�r�g�e�ѕĺ�m�5�x֒�k�k$4��b���`�9�7E�4v,Q5A��b�>׳6�)��~5�7^��i�I�Tt=����Zu�#q�iQԠoM�c�v��t�	Y��=��
$)�#Fff4,�Ao�",�H<�k��Y��rl��h��Ќ`R0K��F�bZ��f��qD�ϕ ��u"�!W��)
>�'�kQ峋|N&D�r��UGUt�����ʢ�h�kk//�D1ý���'��@�b��To�P��:*f�� 4,��W��?���7�h���Q\;�];�]u�6(
9I�d�T��uf�:�w��VޓM�4�\2R���Z���"a�R>l�w�?�`T��������-���'����.=�kW�K��Y[,�����};1��^����;�Ҍ2`-]2?�U';�� L��r(�$��u$��=,�g&/�9/y V{(A��(�,��h'xc߉�)ǔF\Oo%���d���/�������2�j��e2�N��CH?v� � ;]}Ñrr��(f�e1si"��Ä�AB!��P^�5:��J�wNb�}Ŭ�1J�UΖr�9��L@>gPji؃t�3����B��l3��5Xn%WC��J`�ܱ�J0!)��Ҋ\��8q�ˠ.F��7��M�xs$<�3ɡ(��E���k������a����M!���`q% WC������
ܫ����#IKD�-m�����
+o���p2�Q�շ�Ar�h�k��-7EIM{W`K�$��^)K��k����w����
6JX�5����y�M�)ݲ{�����Mf�9�����(�%���9�p�^)1�&����ڢ�p<�ZPԢk�8�7U%O�@A���W �h-�k �4-^�RT �*�x�K(�[�6��d�ڽ'�ɵ��Z�qՕ]o*G��Q�Ad�m��ʏ�7��e^��}ě!1Ḧ́�q������#���jF��f3�WRqsdV1ə��25�H<)�0.��zkF8q{�u#���#�Ԏ�)���ک�(),�*�9>�?�J��>>��s�,'M�e����z��vA�����I���:�NvPa���*�p�����EF��3�B�me�V<.�V��zH��<�͖�P��+Q��⩒N��Yט�O`'�*�o\WI�B�� ρT�G�,���[�����LK����O�Z� �������F�R2rz���)��v�2��:M!�\6)]O���YnX�Y"�#�'�4af���^*02�)�GIyC��u128�Yh����/���d�9Ϋ���(��(��pO[�u�T�i��A'W(~\�j���C���7�.�z�|5S�uM��	�L���k2�2�z%���wT���i�����(����4�,sM����4:VO8!ִ�bed��j��4��ӟ�H"״wi��W7���.Aw�YT�u�Ks�-2ťMۣ�0�``X�wA����
Ă|�Hh�^y�է���o���c	�6S��^�R�R��iaG�+K�#�N��XM��fyB|E�[$`7<������^�y/:zDm��G�&ӑ��
{|ׁ��&��Ǣ9�8�k�R�Uu�`A�<�s�TU�t@��c"����b7���1!{�=:�9^�t\դC≬���c�1���x���gZ�Z*���m��]�9���i	�2��Q��k�T&�h̙�z�*[G�����`B�,�� .fvkv�(�BZ)Oj����b^i	I��즻�"��H:�8�Z��v�ܵ�q-p\u�㵮�펎��BƢ����HV$.-M�J��R�����f�Vn_��R���]\a4�5�U�	^*�
�!����R�j1�ޢ�CJ(��C[ �h���;���Z�R)���(�i�W��[�'�P녡zQ�5�&	��[:� ?�BqL�ܩ]���viJ�bҐ\��BMx�o�P˻�S���+�F�g�A�;��0�)���;(�g>���~y��4�gu�98��H�٧.������Ŵa��;������ف	o�y���Vj(����y��ߒ#���j8����?8�8��{L�6폍���
��ѧ.�.����^�a�����3Ь����>�O���V���;u�z�����WÇ���*���PP�1H��F4�]�;���c����ā����;C��r�#�$ߐ���>M��{�g.5�nɷvW�Eg�<����g�c��A��a����㟣Gq����uv~�&�Z8������ Ҫ���=��@/q*�c�6�=D�po�p�$�2��܎c'��{|�������s�\d/^y,Y��kC�?qB<t�V������߇u�T=��.�oHp@�d��7�p*U�o鉶�C�{c���Zy�8��b�{+��h:A�8�ɑ`�	z�;��s��aȺ��jv7����x:
��z֒��JT�� a��)���J���䨗�uU/����Zt��j�_��ПJ�=O��� W�	l�w���-����!j?�'�i�V�:����>E쟃���>�Z`��O��Ǜp���Y��c�{��U�ތ� �)?�,�{�;sGU�W�w�,��[����XeU���jU|�A�]�xp{�P�v�kX����oz(cL,퇜�Ξ���]ǃ+_^|~�厸�{D�C���w7y�o�?�_��J.����̉yF��l��?~�����˲}	�+�ׯa�������·?ο!������_~�b���r΋�P�O�$�ȿJ���<Mb��!J&�v�d�5L���$6gIG��K���3KI�%��P#u����_�P���)�s��2��iȲG-c*4��>g>Q��b-�&����N�h�;Wl������<k����6V�ھ�c��y���,��J��l���i��Y����Ꝑ`���5��w�^����đ��x �|)4���Ř�� ®ה����,�J��j,4:6R�)eȔ�;4UY���\�!RU����J�)[��#�mhG,�~_�;e�����iP�R5$T߁�X�wC��=UG��G�ث;;)a/�/�N�M%�N�&��r�y6A�1)2���f���nDL���#����A�H�Uʞ�$ȍ�i��FM�E^6D��z�S�.{kw��7��G'4ЪH����I�N�$s'!��(��x�dZ@6�F�D�rPJP�z8(]ҫ8p�J��M�R
%�x���rJ�%�Ɣ�5���a��؀֫�iD��Z-w�Y�!,�п�/5O�(*3V$���9w|q��8=�����xz��a�Κddת�)C�a2������%m�,�� 6��FC�k�(;n\1�-44[m��, i%~&3Þ�c�AB�G�{^��ٱ0�3�D�A�؈��ОT'�-}�����؂�X��ٚۗnIZ�!�s~�iO�Vp��l�+u��NR�,ɎL�_��i��%q�ٲ���|{R��"7�Ż��#�H+)Y�5޴�RqY8����2�@�\V��i���u���Q]��?�ӽ�u��X�3����=��g�+��3w�`���;��WK�:&�Q��!(��^�۰�*4�����dv<ս�:���0�����{�>�W�&��/e��{�{�;�C2H~<��ߧR*���X��s��Ю�ܽ�wC\��)#ja��ɘ(⩲RO�u<'��i�c����|a��:A��z0��b�̷ Ͳ�lG|T�v���N��&��0�`!4����É��<��\*����\���g����ѻ��R�����j�!���f�N�q'�
�}X��u�{)���3o-R�$VI�xX�Q�Ū ��{j|��q��Z��L��B�R�"K��\|5��ŗd�5�����/.>�3����+2������_}���_��v�����g��݋�_�zK.>������~?��\|�k��������O-���`������v�����\|N��	Êz�a�����$nsش�([:l͊�	-�[�u������ �=<~v��)e�R�Y��' 9a��B�Ѝd7_=�к���l��LIo
��:1</
��b$d�y��hb?�3��
��8���T�2�<�R�\�%�$���g�-��~]�8!,�G͚��;
E���fs���|�"���i�XA|y4��uO�0=�v�*Xq�E�^�'l���R�}K@�Kcw$L���������C�7��ct�.~��Ke+��4%�7k�9��^�ĥp����|�_��/��2����a �+�)��v�8�:9����#2��u�ȒچZ�� s�{$� ���Gʱ$��,!0����n��[7�#����Ψ�D��g�'0��}��Ly�e^0㹯�zF�I�@{21�#���p� Q��ax<��0��Y��?� �d\�1g����3u��Z�51=n�7����lwG�1�uI�Q)t\���H�C�^3�{0H�Ԁ�Gb_�Μ>����S�!����Pبwͺ�T,����l#	kix�L�8Gwx*��)�����~/z��0���w�:���a�'�. P�T1!�L�^h���?h݄��������t (ak��m��A�6�Ё�n}�@�p��:����̪w`fM�
ͬ��?3>�5:0�v�����G�gVm���F���|�3�dߢ�T<r4��y�ʅ��C8�ue&�ʟ�wѴ��S��i���*9�:E�+�;<��+z�G<����)r_�v����k�u	v���IF�[�}����m��e�7Fwb��s�13�
����'N��{
�^��g����Bv"�ER	��,2~b�9��<��	&��W�1c�����x`<tF���>v�m�Kp�^X�G�6[��w��7���H�0I����	�t���'PH_��/0��C`�{ռ	�e���M]�̛a�F�=�OQ�O�R��<�|dŴ��,���	�ٙєA�k���Uխ����?�A����?��d��p� �tq��I�|0���C�
q��Y^E�����yu�\�5K�.y�T�_4��� }'�]jzl�x8����aW߮��珉�W��!�Q��|mS�}c����G�b��N�"0{1OmߵG��@cL=��|�ծ�oq���
�V��
~D�5<��������t'N�G>���>qiQ�c@�����u=*P��4Dѝݜ{�$`�wA!��9�D<Ӹ��-�1�(�L�(�41	}"U�ٓ�a/s��4�W%��	�쒷7�	�̊�țo�,O���ǯ|�?3�+�O&���1U���%�����m�N�xBt�e��D/�j��F��SUg�{F
�{�����A�#X3h��8�/���po�ߟv�H���ek^�M�-sĉ�L����XI�,� b�;e�z裵���}�m��*�G���ޠ,�/����ޭ4�[��e,�e�/�۲;���s6UE��<9��ʷI�ܥ7(�a�Q�L6e�.���{0�SN��paZ�Q�3ZKe�IXF�����j&]ê���L)O���W5���i+��gb��<�k�	x�L���}�2�v�a�#o|����7j�]Y۾?�ڳ�"��c�o˲W��Y�,�fś��'Z���Sl70�]�����4���d�ui��ބ���z�f������PV+o�N���tQ�!O2o�O
�J���)1y"��z�;���?��Oƣj��Ox�?�v�����[)	���R�3���^���'_ؠ�c*e��U�,X'o\>�}��jE�j��qE�뎳|���FlT�o�Ѩl5c�r�n��'xj0���x��=9ApH	����:$��Q�A�%��#tͧG�$F^���1L����a�11B0<��#�=�y�J��b���9��Y��������C��Uh�R)���7���o��<�`Ǳ�B�GH����%b�˥���*��gi��+�t�d���\�!���E(�M����|t���xx��Ҵz>w5��+SDR?��]�~Ϣ't	���ƴ	�ɋ����#M$�Z�0X����+��Q��n�<�<m���h��E$�����U�`' HZ{]�ݶ�F<üP-Id��1b����]r�x�����7�=q�B�V^麟\�9�J���Jgd���z6�:�yH���$7�D���Ϝ��)�sj
�!&�_>!cI���ϫt���.Zk�V0 � 1E�i]�W@���KR������K��)���T!�HV\�t����N� �5Ј����N��p$���(&Y}��e���<�tX⁤�i�����H�=����Y��QkCQ^�ռ�A�b9�w���Pw_o|��"\A|@�%⃨A��x�[&�X�L�Rz�B�6�� m�B�I�_��hc��+x ٸ��Zd��~{4z�`���\�Jg��Fg��7\]�9��"�Ғ��� 5���xAgT��-�i��k|'S#s��9��!o�ϡ0���C9{֫tKc1�|c�Rdx���mB�|R��eX<�m:"Hc�h'�&�<bM����'�}G�|��:�&��I�Ϩ���;�hv��F�g㈂x�bB�g�q�<hމ�m�q}h�~�b�;~�bU���>5�����Q\��e]Q�԰��v'� �2�ky	�����_\|y�8�2s�\K�;˹={���π9�:���٢�f�c�E9�I�IRJ���pO���p�=�=I�x
�z��b��vo������h'�!U�q���WaM�Lt_袊\Qr�893�I��%G�+x%�I�C�Y�����h�V��&�S*N��c�b=}��Ӓ�G��Nr���7��a��&����V#*�j�����䮛��&�I�:�KJë0����_J���/�?�oe=MX�޶�y��nW��e:��aa�I&����2���|�K!٬X�l$�<�"Yt�	{�9R��_�_����S�ȹ���cO�ғO�P'��8�1�\|1�?0��a����ς4�z�� ;7�h�~%뎃w��U�Ɋ� �"O#���`�~�x��|�\Z.��I��S�D��9�P�W��K��5�:h�+?��	-إ �Z��A����94;�g���ϚI&^�5����F4�Ő��NB�_��̚��w�n��!���'�����W�b�2��7B ����.����]8&�>|<9'�Yw���������\NNӯ� Y?������w�����!�e���q����?v�u�h<f�$�#.����z���Y�I�8�;7�9l��eb	��IE�3�x���8��eb�8�S:�B=ZC���x����퀮��n��$��+���� �SG�S�>�q��_�,G�����zL,򐾢�N�{�:8�!��	�� �A.{��4K����XPdP��xɸ����q�"a����	��k&�W�PX���7����	�<���7��}^�Cڢ�	j��&�E�z�D�����Q`�~��W�31S#
�I%}����I'��[�R��h¸hx���)F`R��m���PL\��lu�f�����*
�:{�&���@<	l�n�:�ot��$Zܤ��d	�#�A"C��h�\����D����!+y!FW�i����@��B�sN���3�*P(��(1��bV]�};�,��y���5�}ju��ҵ�fk�j�5�=LY��󥨷7��v<)��n���:!3���Q[r�����$(/x�h`��.�
�;��Z,]�N׊>+��I��#N ���'b|�~J�F�`�!�~�����F�n�~E�w��)Ѥ\^	�R����3�CWF��8T�@aN��e��#��#��0U7_p>O�1,μ�7W?�
pXh�I�9�(�ŕ���qa�����U�bF/��	�N��-��+�wL���n�1�P�t�.�D�E�)=�"Sr\p�+��;��w�N�ʶe��W�b�$G�8̩��}�}BgZP�az"�J��5����%�mQ�tz��e_T['�Q9�bK����bT��H��L	c~V���쨜�?U�T���k�Ԓ��/�5��J��0(���Ij�؜���`&J�=�Lp��2L�K��M&�����fq�GI ��ΝM�*Qv�u��S�9�]L�����E�YZ5�f�6N�%ϩ��Jڄ-%kF��"w V8�{8G��BI�.���RZ!���m�����L�B���[��#Z�=�k�%mjP#Bl�Jǥ����F� �]0w*����F}K���)?�n�����{uG��n��+�����,��V�Z�*�`�8���z��k����:ۂ,�XY���-�͎�'�-M�L�K`�ș����(�7��h=>xs�=�e=�Z���O��+\���Ƴ��%&��?(8W3�4H�ӂ�2A�a�� �Lgw-�<f�OfH>�^ �o��;z��#ӪCG��\'���$�����-��c>����ˡֱN����:�Q��5��4��ֿY�'9�¾)��AJ����,2%e~Ė��+���^d���
Lj����l����T�ӛ?!�C�}n�'��S;8���u��E�����cj�d�qDN}����*��iw�R�&��c�؀^4�%��KN��6�����5	Ds+�`M�#�y����t1U��P�-��p�P�����^宨������6��xχp�=b�ܨUĽ���Pc���Fv;T��b+ˡ��G�sX�͜���s�"T�;ä��S��K��4d
_n�d 1����T%���lW��BD$E���W�4��uk�j�h��eYgt1Z��f3.0��=�}A&pؽd��k����8��r�b��q��û��OV��:eoA"���~�캥2`����]=��%�Nx�:յ}:S)���6�+�z,g�K�m����.$����90�{s��&�9&���� g������U+?���#v���L7��c;��xz�_�u�\,�ܖ�"#]q��Z��RK!���2,_V=�o¬�ڑ�#��ҳ�d''�#{3��ȷ�q��0ɻ0}6R�5tu�K)g�#e}�r]j������ J�Zc�-�m_Lw*�ɘ>XΜZ~���x���U��=abB
V~�/iG��ZJ����zP|�yo�Z)�Y}�/���<HR��dr���~e�1RJ�E�=���E�f���X��MI�4tu�����$������E�2�(w҉��i+@B�up�Ug���i�擷kn���3¸���Mn�]����6c�/�v,���^Z%����u�.��bQ�} ���S��h����t�.
�kc���j��Z|/�2�|kͲ��JKT��ځ#�N�S��&�k!Y�= r;�ʴ\�>��k#V*`
n��[+�C��G`���S��   ���][oG�~ϯ��fA!�I��1dKx�8�ʙ}�E�$:��I�R����A��covf0o�;��m~�֩K��[���������������9�	�Zr�#���"?g¼~b�䙎�\�<��ˁ"�w�ᕢ��/�0�zZ�K<�Q�G��@��7�dW �$������'�r�����8gQ�R��C�B�(��XPh=�#�����4 ���Sl3��2���;w��ރN	:��)�@;��� ��F(�����|t:h-�"�V!�x����	��P$	��t�Z�FM��f�$��U�L��$��0\55�����4p���M�8��ߛ �T�T�,�`Cò�E�S�Ī�h�c��;�m�W�:RV�{�R��1d[/�4�2{9���+2}��Oӿ�^�韧�������w��~{5}M�o��Z���m���&�ᝂ��xx��E��X$���j���ݒ`�?��?�"����S%Y��ݞ#�������B䵦�Z��-5�$��I:$',x-Dnǧ���)y��n9rh`]:��ؐIr�d�&Y�_C
�"VX�6�д$�����lJ� 	�M$\p運#�§$ǡ��F2�8a<M�I.Y���6�oIS=SX��Ԅ� �_��!p����NME��Hg엶ˍC�F����7����ߧ�^O�>{I��_����Oo�f�q!'#i��pyi���\<���'��,wጥ�Ē+�b�+f:��~7�] �E;)�Pl(����E*���ޙ�6����,V�54ۆT&#rH$�5���u�uk�*RZg%�5��<2o���M�_M�蝡@��D���"�5	�c����#*��4`U�����-uc��x���Qe#��$��h��2L~9�Q7F�%����@�paq�Z�������To���]5BXG�4�J՛ُo�X����T�W�Ig���ط���W��$Am	h\Bd�R�' )^�v���k�6�K�J����3<C�P���p��� �p4`�@ �
BPb�E��=/� z5\"�G)z�hށ�(���<����8Q� h*�3_F��D�	�3���g*�c5>���T�IF{�5�"=cv��)�1�N;�a����ϥ>���!-�E�ḗ�����q�t�������{���(N9v�38����|�?-���8,�O�6����s��G�@���������[�n~�j#�����y|��O���2����P5���ԉ���N��O�X�-6�h�J��|��F�j�7�z��0\�ߛ���3�ɟ�/������dM��� ��j7����΁	i
�Ä�J&Ի�dj&f�3��)(���ي|9y�a�c[�������<��rU��.=�l[�.���aɶ�tH�v���T~?�lbmN9�7E��<�s$l����1u������k445�e0��BO�k�[ұg�|^/�R�\[��(���C���⫡yi�i��v��E-�?���s����\ꊬ�+Wpd�v1!L+ڪ8����n�M���F�u2	���)7�^G�`� ȭ(�p$(��χ�(l�%5�Hx�����ZV�������2��n>��P�ȉ
���<�J�2J�]�B8ƸwSA���+�][��z��O��7.N�m38�~�5�Ҫ�" �J���k���e���v�J���:���truZ�kS0p�i>#D=�-� �d�ʏ:.�Yύ�1ch��U��R#�/6H�Zqh�M��2�pr%f3�����R�U:e\o�7tYt|���y�l�3*����LӪ�c�L4Hɘn]'q�e��Q�T��7A��/�HSx���7A�'A:Q����%w"�uGd(i�CZ�Ƨ!��{ʧ���~��)l�m��7l���9]OY?��}�c@�5���Nia<
is�_���ϣ����[c��p��;�d,�N�[![|}#�5�_���3W��oT��K��&8����0?�S,�y�,A��3<�jV�7Ǫ���n�HEy2W.��K$N����`(qJ���$�H2���L�;/.ŭ���f#��4�u:2��%󔻦8��ڵ��$�ҥi���pp�gGF��R�B@���"�Ә$3a!�!�_�-����D���ދY���?��I7+�.��l��s�W��y�l�e�w�c��d��{��7�j���$�l��p�*{�s�� 3dSx�.���\j;xJ���Ď�t�j� ��̸G���O_�v�0	�I���0��fF��h���~�?���̢�U齘,Bǌo��� �[傟���"!���9�_g����~C�N8��������N��P�~�$E���$�|��UU�^j�ěLXm�74-�!Z��V�Pub[��>�;h�����>�/����ȱ�PT�c5Ŭ'��8yz�s�"_H����e� �tH�Һt@��
�-�U?����_�^:ɖ�R�NXe1Iq�?��"��i��J�ª�@���PS���i�:�4�|�b����<0Ȫ�/���Hݠ�������ŽǹHB�XJx;He���!�N��y�y�an�y% �����' v$�wĂ�yI��/K��m���P
	��6d���I
�S4ΏN�dp܎zh��n 9S���y���c�ɥ��������X.-,�O�<\n�9�A�@��O��˹��\�)nA�@s�Bs�K-�[|/����h�Q�ڠ9ᧄ#̐�?7�c�Q5�'o�Nǩn�2������1a�U��U��x�9ͥ��2�M��ߚ��i��/Y�D2�o���r��^4�&SL@�l�,��_6 �QsO�r�X.R�>/�b�f؉�WǓ���j�-Z�IҀ�މ�EBXҨ��c��X:� �l�
��Lo�~f{�3�nJB��l�:D::bȓx�#�ć7s���I���2�b�$l�*#3-��άV/�^K�oz��~� �_�yGtOؼ�$� %��j,��E?3���7/�B_��gx#�0m,^yx��%!��/�G�4!��K#�XP!*��B�-�_ᆧ#O��t� us��K�@�c)���*at�6���s�6c�â�9��m���9=�:LY�ş���G�<v}DU<TѰaڭ��Tj,����c�1]�M����<E���EwJ��,��$[��	�i�����`*C���m*3o�Dk��t��-���2=�&^�o�]u��u�f]�����ҝF'����e�<�(�%}�����?�%���^�j�ŋ2�IGc�Rg�I��o���_�o�t����(���i2����'�ɸ���tYz��T��	�mò��0��(�I�sp[��RZ�x�Hۛ�OI->�q�1����8`�*dN�ÄO����Ł��'��R�h�%��L�b<�����hϸK
B�YS����\��A�RG�1��J=�d�NY�p�˙��7�d�V�ȣ�S?sNgl�I��شsH��m�O ��F,I�x8%>���	���I�>�à2v���e�,r�Jz�A��UڛO6!$YS�3���jH�Z�Y�7�5���+�6IS�E,(GF��Fz��:�t�g���
ٌ~1����KB����&~d2����Ҡ���*ֲY�1$U:r��f��]LlF.$ihp�CIn�2�r{Y�W��;�Ǟ�DU��Vk�o���pI�u�.���`�&�5t�`$=�[�糌5�{FBB�cj���[BK�p��N��o{}��R��Ҁ>C�^�_L/��F[Jʡ29�FȩGµ����ݿ¨�-��ꍨXۂ=��l$�� ��ףv@��?�/�&+zsV��Kuy��o�	 ���h{u?M���ɠK^����09N�VV*�U�".r��(����g�jL���mix��ǝ�,K�V�?Md<Nf9����h�W ө�W�� q��$����]�; �Ş�
���WFI����ʤ�;�C�6ģR�fO���t�1���*����Y�@ة����r�(q�Y_@����LM.��o��'�԰_D��d9̜(��+~�at&����o� ʊVsM�r6,�.=86T�/�LGk�YX�4"H���7�<��X�r�����ѣ��#�Z�����c�E�v^���`2�2�dm =b/^���^r�j�|�HWN3�q���d��B,w�P����U�w�`�W��q�I4O�B+��	��j��_��ۗ��a��,g�n���F�5��W70�آ��5��f*�ӛ����V�����Yq����R�/��!ݶ��ҁ���k��U��a�F�	N��b�����@I(��뮵J��un�`�bN�o*�����fm�.�a7�`�S�����`��Ik��I����a;'���fy�Q�터��E>y�BS��D�<��.��_|�*���D��eL�H
�fm��v}�eR�$�:fd�ϏOъRZ���$�^�HD�#e@0���f$��;p�εH��B؝TCR�9*��y���"��t?L��v� �6W��*h��)��G`1��{���K�8��L+�f������	�)���:�Z�v�[˚qH�&�}��*-�D�n|&�³R���j���5S����P�6L��ͣn��tÅ�79߭��4���( H5�SԹy��aa��G�MB��[v�<�| �-����,P�긝�;cױ-Ė+��6�x��<[<�3f{mb��az�IgN�:
�ݺE��`�>5���4�5�+#4]$pI6�N�?��:�v'�j��q�����U���M��b;�cb@��GO}��V�~Z��p��Z$��$�f;W��
v�dvU�{��~�jz3W����ˡf� ��k�b�<�Dh�Aן�JD����a���쀉T�O���[���}���0����r{��%�R�X8��4�L.��ֲ�����f��k�t�`x6�A��[|^�F >Ōp	�^ ^Ϣ�(K'���|����3#D�B*3񞎩���"��gNZ�\�h�O�!%����Lq0P&�3�ċ�Ʉ�4�v��n.I�
��f
���!�,s돳 �*�}7}��j��������W,����y�	L��A�`8VvU�[�B�ʮ����Px;��S��3�����E�,���d�y݉�j)#���> F1ʉp~�#�M@aHӉ�`)8UI$�5��.4�a������$\ ����)X��i��%
��{G=�.��;P��f�������=�n(�5	0���ȏ�Y��!ⅇ��<j������5|��u.or�Q�3���+����B���ӿL_��r�,����� �݌{����&��6�gx�?�t���~�^����;�z��I<	�_��H�E�s�����?T@��Z�����ņ�B�\��������R�!r�)� *�)�%����%� ^�x'�3�E��B�E?�㢌:����x�dϣ��e�k" c&��y"]�a�Va�$���h�0S��,`)�.)L_�^�]�od�=�~�L߰h
�A��_�n�CA��-ۭχ� Fd����:%��;'�M��W��!��*�z]�K��!��.��1ƌ��a�(�b�=|ד��< ���7IO4T��0��������h��RW8�@�^�ޔ)AqZ�"O(E��KVM;��C����t�e!�`x����A�yy���g�.f�D��b"�/��~�a~��a�����FO�!�V~�<'�te<�� M�=�Z��Q�^I�ѡ�.����� �^��ʦz�1m�y�^��h�����6�R��d�TN-�ȋ��1] ��g~o=[ ^O :����]���#Sy�j��5���R���]_�YW�Z���}鸛Se�JL����\��>��I��Kl�*5>N��q����Kl�O#D���d͌qXA�aT�S(�L�0$
i�<�Y��;wq�C�
z|�"��ӊɮ[�%*�^��}m~f�^Jn/�X�>��_W�ݠ���N;(`G�I�H�(��`�_,�T��#�>�[s�OuE�i�VU�6WB6��
;wt��I
�Q5L6-��۰PW�ژ����DǊ��.F�U0+%h�޿�dE%w�������\�s�䴣$���|��ːP��}>��L��BY�}ox��d�U**O��"��G�t���&�9N�F�"?ؗ��`��=�/�H�qҮ�n����c��Ϡ
�ݝ;� K�;�;���k�"Z�w�S,�����ލ�kP���s�Q&B����_~!zIC��E��R5�ig���i���ˬ�=��h����"yaO�zlY�!�&yN�������֣G�_|����;ۇ�t�
e�pfd��>� ��ϒ'w'�'��6ew��a����5�{�7�G�C{�]��_�q�{ֱ�����  �� I�!