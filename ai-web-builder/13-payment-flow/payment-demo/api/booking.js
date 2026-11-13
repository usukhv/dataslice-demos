// POST /api/booking: захиалга шалгаж, Google Sheets-д хадгалж, төлбөрийн алхам бэлдэнэ.
// GET  /api/booking?date=YYYY-MM-DD: тухайн өдрийн захиалагдсан цагууд.
import { SERVICES, SLOTS, todayUB } from '../lib/services.js';
import { callSheets } from '../lib/sheets.js';
import { createInvoice } from '../lib/qpay.js';

const json = (body, status = 200) => Response.json(body, { status });
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Browser-ын шалгалтыг тойрч болдог тул сервер бүгдийг ДАХИН шалгана
function validate(input) {
  const errors = {};
  const phone = String(input.phone || '').replace(/[\s-]/g, '');
  const name = String(input.name || '').trim();
  if (!SERVICES[input.service]) errors.service = 'Үйлчилгээгээ сонгоно уу.';
  if (!DATE_RE.test(input.date || '')) errors.date = 'Огноогоо сонгоно уу.';
  else if (input.date < todayUB()) errors.date = 'Өнгөрсөн огноо сонгох боломжгүй.';
  if (!SLOTS.includes(input.time)) errors.time = 'Цагаа сонгоно уу.';
  if (name.length < 2 || name.length > 60) errors.name = 'Нэрээ бичнэ үү.';
  if (!/^\d{8}$/.test(phone)) errors.phone = 'Утасны дугаараа 8 цифрээр бичнэ үү.';
  if (String(input.note || '').length > 300) errors.note = 'Тэмдэглэл 300 тэмдэгтээс ихгүй.';
  if (input.agree !== true) errors.agree = 'Нөхцөлийг зөвшөөрнө үү.';
  return { errors, clean: { service: input.service, date: input.date, time: input.time, name, phone, note: String(input.note || '').trim() } };
}

function newBookingId() {
  // Жишээ: B7K2M9QX4T. Давхцахгүй, богино.
  return 'B' + (Date.now().toString(36) + Math.random().toString(36).slice(2, 6)).toUpperCase();
}

async function takenSlots(request) {
  const date = new URL(request.url).searchParams.get('date') || '';
  if (!DATE_RE.test(date)) return json({ ok: false, error: 'date буруу' }, 400);
  const result = await callSheets({ action: 'taken', date });
  return json({ ok: true, taken: result.taken || [] });
}

export default {
  async fetch(request) {
    try {
      if (request.method === 'GET') return await takenSlots(request);
      if (request.method !== 'POST') return json({ ok: false, error: 'Зөвхөн POST хүсэлт авна.' }, 405);

      const input = await request.json().catch(() => null);
      if (!input) return json({ ok: false, error: 'JSON буруу байна.' }, 400);
      const { errors, clean } = validate(input);
      if (Object.keys(errors).length) {
        return json({ ok: false, error: 'Формын алдааг засна уу.', fields: errors }, 400);
      }

      const service = SERVICES[clean.service];
      const bookingId = newBookingId();
      const saved = await callSheets({
        action: 'create',
        booking: { bookingId, ...clean, serviceName: service.name, price: service.price, deposit: service.deposit },
      });
      if (saved.error === 'slot_taken') {
        return json({ ok: false, error: 'Энэ цаг аль хэдийн захиалагдсан байна. Өөр цаг сонгоно уу.' }, 409);
      }
      if (!saved.ok) throw new Error(`Sheets: ${saved.error}`);

      const reply = { ok: true, bookingId, service: clean.service, date: clean.date, time: clean.time, deposit: service.deposit };
      const mode = process.env.PAYMENT_MODE || 'demo';
      if (mode === 'qpay') {
        const site = process.env.SITE_URL || new URL(request.url).origin;
        const invoice = await createInvoice({
          bookingId,
          amount: service.deposit,
          description: `${service.name} ${clean.date} ${clean.time} урьдчилгаа`,
          callbackUrl: `${site}/api/payment-callback?booking=${bookingId}`,
        });
        await callSheets({ action: 'setPayment', bookingId, paymentId: invoice.invoiceId });
        reply.payment = { mode: 'qpay', qrImage: invoice.qrImage, urls: invoice.urls };
      } else {
        reply.payment = { mode: 'demo' };
      }
      return json(reply);
    } catch (err) {
      console.error('booking error:', err); // Vercel-ийн Logs хэсэгт харагдана
      return json({ ok: false, error: 'Серверт алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.' }, 500);
    }
  },
};
