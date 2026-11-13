# Цэцэг салон: бэлэн төсөл (14-р хичээл)

Энэ бол курсийн эцсийн сайт: нүүр хуудас, захиалгын форм, Google Sheets, demo төлбөр.

## Нээх
1. Zip-ээ задлаад хавтсыг VS Code-оор нээ (**File > Open Folder**).
2. `apps-script/Code.gs`-ийг хүснэгтийнхээ **Extensions > Apps Script**-д хуул (11-р хичээл).
3. Zip-д цэгтэй файл ордоггүй тул 3 файлын нэрийг соль: `gitignore` болгож `.gitignore`, `vercelignore` болгож `.vercelignore`, `env.example` болгож `.env.example`.
4. `.env.example`-д бүх environment variable жагссан. Жинхэнэ утгыг Vercel-ийн **Settings > Environment Variables**-д нэм.
5. Терминалд `vercel dev` ажиллуулаад `http://localhost:3000` нээ.

## Environment variable (утгыг энд бичихгүй)
- `SHEETS_WEBHOOK_URL`, `SHEETS_SECRET`: Secret. Apps Script холболт.
- `PAYMENT_MODE`: Config. `demo` эсвэл `qpay`.
- `SITE_URL`: Config. Сайтын бүтэн хаяг.
- `QPAY_BASE_URL`: Config. `QPAY_CLIENT_ID`, `QPAY_CLIENT_SECRET`, `QPAY_INVOICE_CODE`: Secret.

## Солих зүйл
Салоны нэр, хаяг, утас, үнийг `index.html`, `privacy.html`, `lib/services.js`-д өөрийнхөөрөө соль.
`.vercelignore` нь зөвхөн сайтын файлыг deploy хийнэ: шинэ файл нэмбэл тэнд `!файл` мөр нэм.
