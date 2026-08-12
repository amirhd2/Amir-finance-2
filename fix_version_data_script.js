const fs = require('fs');
const vData = JSON.parse(fs.readFileSync('version.json', 'utf8'));

vData.history = [
  {
      version: "2.2.2",
      buildNumber: 212,
      releaseDate: "2026-08-11",
      releaseChannel: "Stable",
      commitHash: "v222rel",
      commitMessage: "feat: official release 2.2.2 with app icons, leather wallet splash screen, and card gestures",
      changes: [
          "ارتقاء و پیاده‌سازی آیکون رسمی برنامه برای اندروید و iOS (طرح ۳بعدی سکه طلایی با نماد A و نمودار رشد)",
          "بازسازی کامل اسپلش اسکرین با تصویر باکیفیت کیف چرمی و کارت‌های اعتباری و رفع مشکل صفحه سیاه",
          "بهبود انیمیشن بازگشت و لمس بیرون کارت‌ها (بستن خودکار کارت‌های بازشده با لمس خارج از کارت)",
          "بازگردانی و بهبود بخش تاریخچه تغییرات و نسخه‌ها (Changelog) در تنظیمات"
      ]
  },
  {
      version: "2.2.1",
      buildNumber: 211,
      releaseDate: "2026-08-11",
      releaseChannel: "Stable",
      commitHash: "v221rel",
      commitMessage: "fix & feat: fix black splash screen with leather wallet theme and improve card back animations",
      changes: [
          "بازسازی کامل اسپلش اسکرین با تصویر باکیفیت کیف چرمی و کارت‌های اعتباری و رفع مشکل صفحه سیاه",
          "بهبود انیمیشن بازگشت و لمس بیرون کارت‌ها (بستن خودکار کارت‌های بازشده با لمس خارج از کارت)",
          "رفع مشکل عدم نمایش کامل گزینه‌ها در برخی بخش‌ها"
      ]
  },
  {
      version: "2.1.5",
      buildNumber: 206,
      releaseDate: "2026-08-08",
      releaseChannel: "Stable",
      commitHash: "v215stackFix",
      commitMessage: "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
      changes: [
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
      version: "2.1.0",
      buildNumber: 202,
      releaseDate: "2026-08-07",
      releaseChannel: "Stable",
      commitHash: "v210mobileEdit",
      commitMessage: "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
      changes: [
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
      version: "2.0.1",
      buildNumber: 201,
      releaseDate: "2026-08-07",
      releaseChannel: "Stable",
      commitHash: "v201rel",
      commitMessage: "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
      changes: [
          "حذف دکمه «حذف مخاطب» از بالای کارت ویرایش مخاطب در استک کارت جهت جلوگیری از نیاز به اسکرول کارت",
          "اصلاح و روان‌سازی کامل عملکرد کلیک روی کادرهای ورودی در کارت‌های استک جهت باز شدن آنی کیبورد و فوکوس بدون مشکل روی موبایل و آیفون",
          "بازطراحی عناوین بخش‌های وام‌ها، طلب‌ها و بدهی‌ها در صفحه حساب‌ها به صورت مرکزچین و حاشیه‌دار در تمام عرض صفحه",
          "افزودن دکمه‌های فیلتر دوگانه (اصلی و بایگانی به همراه شمارنده تعداد) در صفحه پروفایل مخاطب برای هر ۳ بخش وام‌ها، بدهی‌ها و طلب‌ها"
      ]
  },
  {
      version: "2.0.0",
      buildNumber: 200,
      releaseDate: "2026-08-07",
      releaseChannel: "Stable",
      commitHash: "v200major",
      commitMessage: "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
      changes: [
          "حل ساختاری و کامل مشکل نمایش ناقص صفحه برنامه در حالت Preview و iFrame با تنظیم ارتفاع ۱۰۰٪ روی html، body و root#",
          "جلوگیری کامل از زوم ناخواسته صفحه‌نمایش هنگام باز شدن کیبورد مجازی در تمامی فیلدهای ورودی (موبایل و آیفون) با تنظیم اندازه فونت استاندارد ۱۶پیکسل و viewport-fit=cover",
          "بررسی دقیق و تطبیق ۱۰۰٪ مسیر تمامی فایل‌های Favicon، Apple Touch Icon، Web Manifest و تصاویر Splash Screen در index.html و public/index.html جهت نمایش دقیق آیکون در آیفون و PWA",
          "بهینه‌سازی انیمیشن‌های ورود و خروج (AnimatePresence) و سیستم فوکوس خودکار (autoFocus) در فرم‌ها و کارت‌های استک لایه‌ای (Stack Wizard)",
          "به‌روزرسانی سرویس ورکر (Service Worker v2.0.0-b200) جهت کش آفلاین و به‌روزرسانی آنی نسخه جدید"
      ]
  },
  {
      version: "1.9.1",
      buildNumber: 175,
      releaseDate: "2026-08-05",
      releaseChannel: "Stable",
      commitHash: "v191rel",
      commitMessage: "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
      changes: [
          "حذف کامل کارت انتخاب سررسید/ریمایندر از کارت استک ثبت وام",
          "بازگرداندن جدول انتخاب روزهای ۱ تا ۳۱ ماه به کارت سررسید اولین قسط وام با حذف عنوان بالای جدول",
          "پیاده‌سازی کارت استک برای ثبت مخاطب جدید (کارت اول: نام و نام خانوادگی در ۲ کادر مجزا، کارت دوم: شماره تماس، شماره کارت و شماره شبا)",
          "استفاده از کارت استک جدید برای ویرایش مخاطب به همراه دکمه حذف مخاطب",
          "ثبت رسمی بیلد 175 و انتشار نسخه 1.9.1"
      ]
  },
  {
      version: "1.9.0",
      buildNumber: 174,
      releaseDate: "2026-08-05",
      releaseChannel: "Stable",
      commitHash: "v190rel",
      commitMessage: "feat & fix: resolve animation skip on swipe pages, sync status bar color for wizard modals, release v2.1.9",
      changes: [
          "معرفی سیستم جدید ویزارد لایه‌ای (Stack Wizard) برای ثبت وام جدید به جای مودال‌های تو در تو و پیچیده",
          "امکان حرکت نرم و انیمیشن‌دار بین مراحل ثبت وام (مشخصات، مخاطب، زمان‌بندی، کارمزد) به صورت کارت‌های روی هم افتاده (Stacked)",
          "بهبود چشمگیر تجربه کاربری و بصری در ثبت اطلاعات پیچیده و چندمرحله‌ای"
      ]
  }
];

fs.writeFileSync('version.json', JSON.stringify(vData, null, 2));
console.log('Updated version.json');
