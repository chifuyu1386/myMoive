# 🎬 myMovie | سینمای هوشمند شیشه‌ای

یک وب‌اپلیکیشن کاوش و مدیریت فیلم مدرن، کاملاً ریسپانسیو و **موبایل‌فرست (Mobile-First)** بر پایه دیتابیس TMDB با طراحی دارک مات، بنفش نئونی و **Glassmorphism**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Website-8b5cf6?style=for-the-badge&logo=vercel&logoColor=white)](https://chifuyu1386.github.io/myMoive/)
[![CI/CD](https://img.shields.io/badge/GitHub_Actions-Automated_Deploy-2ea44f?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/chifuyu1386/myMoive/actions)
[![React](https://img.shields.io/badge/React_19-TypeScript-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-CSS--First-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand_Persist-orange?style=for-the-badge)](https://zustand.docs.pmnd.rs/)

---

## 🌐 لایو دمو (Live Demo)
نسخه آنلاین پروژه به‌صورت خودکار با GitHub Actions بر روی GitHub Pages دیپلوی شده است:  
🔗 **[مشاهده پروژه لایو (Live Preview)](https://chifuyu1386.github.io/myMoive/)**

---

## ✨ ویژگی‌های کلیدی محصول (Key Features)

- 📱 **طراحی کاملاً Mobile-First:**
  - نوار ناوبری چسبان پایین صفحه (Sticky Bottom Navigation) برای تجربه کاربری شبیه اپ‌های Native.
  - کشوی پایین صفحه شیشه‌ای (Bottom Sheet Drawer) برای انتخاب و فیلتر ژانرها با یک دست (Thumb-Zone Friendly).
  - هدر واکنش‌گرا و سازگار با انواع صفحات نمایش و تبلت.
- ⚡ **جستجوی زنده بهینه‌سازی‌شده (Live Debounced Search):**
  - پیاده‌سازی کاستوم‌هوک اختصاصی `useDebounce` برای جلوگیری از ارسال ریکوئست‌های تکراری و افت پرفورمنس شبکه.
- 🧠 **مدیریت استیت سراسری با Zustand:**
  - سیستم نشان‌شده‌ها (Watchlist) با قابلیت ذخیره‌سازی ماندگار (`LocalStorage Persistence`).
  - قابلیت نشان کردن مستقیم فیلم‌ها از روی کارت‌ها یا صفحه جزئیات.
  - تفکیک فیلم‌ها بر اساس «دیده‌شده» و «در انتظار تماشا».
- 🎭 **صفحه جزئیات عمیق اثر (Movie Details View):**
  - متد اختصاصی `append_to_response` برای دریافت همزمان اطلاعات، تریلر، بازیگران و فیلم‌های مشابه در **یک ریکوئست شبکه**.
  - مودال شیشه‌ای پخش تریلر رسمی یوتیوب.
  - کاروسل اسکرول افقی بازیگران و آثار پیشنهادی.
- 📄 **صفحه‌بندی پایدار و بهینه (Fast Numbered Pagination):**
  - محدود به ۲۰ آیتم در هر صفحه جهت حفظ سلامت پرفورمنس DOM و جلوگیری از ری‌رندرهای سنگین.
  - اسکرول نرم خودکار به بالای صفحه هنگام تغییر صفحات.

---

## 🛠 استک فنی (Tech Stack)

| تکنولوژی | کاربرد در پروژه |
| :--- | :--- |
| **React + Vite** | هسته اصلی توسعه وب‌اپلیکیشن با سرعت بیلد بالا |
| **TypeScript** | تضمین تایپ استاتیک، تایپ داده‌های API و عدم استفاده از `any` |
| **Tailwind CSS v4** | استایل‌دهی مدرن CSS-First، پیکربندی اختصاصی گلس و تم بنفش مات |
| **Zustand** | مدیریت استیت سبک، سریع و ماژولار با میدل‌ویر `persist` |
| **React Router** | مسیریابی SPA با کنترل داینامیک روت‌ها (`/movie/:id`, `/explore`, `/watchlist`) |
| **Lucide Icons** | آیکون‌های وکتوری مدرن و سبک |
| **GitHub Actions** | پایپ‌لاین یکپارچه‌سازی و استقرار پیوسته (CI/CD) روی GitHub Pages |

---

## 📐 تصمیمات معماری و مهندسی (Architectural Decisions)

### ۱. معماری تفکیک دغدغه‌ها (Clean Separation of Concerns)
پروژه از ساختار لایه‌ای بهره می‌برد:
- لایه `services/` مسئول واکشی شبکه است و کامپوننت‌های UI مستقیماً ریکوئست نمی‌زنند.
- لایه `store/` منطق وضعیت واچ‌لیست را مدیریت می‌کند.
- لایه `hooks/` منطق‌های قابل استفاده مجدد (مانند `useDebounce`) را کپسوله کرده است.

### ۲. حل چالش داده‌های ناقص در TMDB (Resilient Data Fallback)
سرویس TMDB در زبان فارسی (`fa-IR`) در برخی فیلدها مانند اسامی ژانرها رشته خالی (`""`) بازمی‌گرداند. برای مقابله با شکست ظاهر نرم‌افزار، یک دیکشنری محلی ثابت (`TMDB_GENRES_MAP`) در لایه ثابت‌ها پیاده‌سازی شده تا داده‌ها در صورت نبود ترجمه سرور، به صورت شفاف جایگزین شوند.

### ۳. استفاده از `append_to_response` در TMDB
به جای ارسال ۴ ریکوئست جداگانه برای دریافت فیلم، بازیگران، تریلرها و پیشنهادات، تمام این موارد در یک ترانزکشن شبکه خلاصه شده‌اند تا بار شبکه و زمان بارگذاری صفحه به حداقل برسد.

---

## 📂 ساختار پوشه‌بندی (Folder Structure)

```text
src/
├── components/          # کامپوننت‌های مشترک رابط کاربری
│   ├── common/          # کامپوننت‌های چندمنظوره (TrailerModal)
│   ├── layout/          # کامپوننت‌های اسکلت چیدمان (Navbar, BottomNav, RootLayout)
│   └── ui/              # کامپوننت‌های پایه دیزاین‌سیستم (Button, Badge, Skeleton)
├── constants/           # مقادیر ثابت و دیکشنری فال‌بک ژانرها
├── features/            # ماژول‌های وابسته به دامنه پروژه
│   └── movies/          # کارت‌های فیلم، ردیف‌ها، بنر هیرو و منوی کشویی ژانرها
├── hooks/               # کاستوم‌هوک‌های بازاستفاده‌پذیر (useDebounce)
├── pages/               # ویوهای اصلی روت‌ها (Home, Explore, Details, Watchlist)
├── services/            # لایه کلاینت شبکه و ارتباط با TMDB API
├── store/               # استورهای Zustand با قابلیت ماندگاری داده
├── types/               # تایپ‌ها و اینترفیس‌های دقیق TypeScript
└── index.css            # پیکربندی تم اختصاصی Tailwind v4 (Glassmorphism & Matte Black)



👨‍💻 توسعه‌دهنده (Author)
پویان (Pooyan) - فرانت‌اند دولوپر
GitHub: @chifuyu1386