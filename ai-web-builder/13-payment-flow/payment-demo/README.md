# Урьдчилгаа төлбөр: demo горим (13-р хичээл)

- `api/booking.js`: захиалга хадгалаад төлбөрийн алхам буцаана. `PAYMENT_MODE=qpay` үед QPay нэхэмжлэх үүсгэнэ.
- `api/payment-callback.js`: demo үед `PAID_DEMO` болгоно. QPay үед `/v2/payment/check`-ээр дахин шалгаж `PAID` болгоно. 2 дахь дуудлага юу ч өөрчлөхгүй.
- `lib/services.js` (үнэ, урьдчилгаа), `lib/sheets.js`, `lib/qpay.js` (token, invoice, payment check).
- `apps-script/Code.gs`: `create`, `taken`, `get`, `setPayment`, `markPaid` үйлдэлтэй. `env.example`: бүх environment variable.

Ажиллуулах: Code.gs-ийг шинэ хувилбараар deploy хий. Vercel-д `PAYMENT_MODE=demo` (Config) нэмээд `vercel dev`.
QPay горим бол зөвхөн sandbox эрхтэй үед. QPay-ийн хариуны талбарын нэрийг (`invoice_id`, `qr_image`, `paid_amount`) өөрийн sandbox хариутай тулга.
