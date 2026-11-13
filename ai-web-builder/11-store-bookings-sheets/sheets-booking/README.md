# Захиалгыг Google Sheets-д хадгалах (11-р хичээл)

- `bookings-template.csv`: хүснэгтийн баганууд ба 3 жишээ мөр. Google Sheets-д **File > Import**.
- `apps-script/Code.gs`: нууц шалгаад `Bookings` хуудсанд мөр нэмдэг `doPost`.
- `api/booking.js`: Vercel Function. Шалгаад, үнийг серверээс авч, Apps Script руу дамжуулна.
- `script.js`: формыг `/api/booking` руу `fetch`-ээр илгээнэ. `env.example`: 2 environment variable.

Тохируулах: хүснэгтийн хуудасны нэр `Bookings` байна. Code.gs-ийг Apps Script-д paste хийгээд
Script Properties-д `SHARED_SECRET` нэм, Web app болгож deploy хий.
Vercel-д `SHEETS_WEBHOOK_URL`, `SHEETS_SECRET` нэмээд `vercel dev` ажиллуул.
Zip-д цэгтэй файл ордоггүй: `gitignore`-ийг `.gitignore` болгож нэрийг нь соль. `YOUR_...` утгыг кодонд бүү бич.
