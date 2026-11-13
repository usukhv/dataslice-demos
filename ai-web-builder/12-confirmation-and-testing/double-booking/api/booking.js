// POST /api/booking: захиалгыг шалгаад Google Sheets-д хадгална (Apps Script-ээр дамжуулж).
// GET  /api/booking?date=YYYY-MM-DD: тухайн өдрийн захиалагдсан цагууд.
// SHEETS_WEBHOOK_URL, SHEETS_SECRET нь зөвхөн Vercel-ийн environment variable-д байна.

// Үнийг browser-оос ХЭЗЭЭ Ч авахгүй, зөвхөн эндээс
const SERVICES = {
  'women-cut': { name: 'Эмэгтэй үс засалт', price: 45000 },
  'men-cut': { name: 'Эрэгтэй үс засалт', price: 25000 },
  color: { name: 'Үс будалт', price: 120000 },
};
const SLOTS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

const json = (body, status = 200) => Response.json(body, { status });
const todayUB = () => new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10); // UTC+8

// Browser-ын шалгалтыг тойрч болдог тул сервер бүгдийг ДАХИН шалгана
function validate(input) {
  const errors = {};
  const phone = String(input.phone || '').replace(/[\s-]/g, '');
  const name = String(input.name || '').trim();
  if (!SERVICES[input.service]) errors.service = 'Үйлчилгээгээ сонгоно уу.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date || '')) errors.date = 'Огноогоо сонгоно уу.';
  else if (input.date < todayUB()) errors.date = 'Өнгөрсөн огноо сонгох боломжгүй.';
  if (!SLOTS.includes(input.time)) errors.time = 'Цагаа сонгоно уу.';
  if (name.length < 2 || name.length > 60) errors.name = 'Нэрээ бичнэ үү.';
  if (!/^\d{8}$/.test(phone)) errors.phone = 'Утасны дугаараа 8 цифрээр бичнэ үү.';
  if (String(input.note || '').length > 300) errors.note = 'Тэмдэглэл 300 тэмдэгтээс ихгүй.';
  if (input.agree !== true) errors.agree = 'Нөхцөлийг зөвшөөрнө үү.';
  return { errors, clean: { service: input.service, date: input.date, time: input.time, name, phone, note: String(input.note || '').trim() } };
}

// Apps Script руу нууц түлхүүртэй хамт илгээнэ
async function callSheets(payload) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_SECRET;
  if (!url || !secret) throw new Error('SHEETS_WEBHOOK_URL эсвэл SHEETS_SECRET тохируулаагүй байна');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, secret }),
    redirect: 'follow', // Apps Script хариуг өөр хаяг руу redirect хийдэг
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Apps Script JSON биш хариу буцаалаа (${res.status}): ${text.slice(0, 120)}`);
  }
}

async function takenSlots(request) {
  const date = new URL(request.url).searchParams.get('date') || '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json({ ok: false, error: 'date буруу' }, 400);
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
      const bookingId = 'B' + (Date.now().toString(36) + Math.random().toString(36).slice(2, 6)).toUpperCase();
      const saved = await callSheets({
        action: 'create',
        booking: { bookingId, ...clean, serviceName: service.name, price: service.price },
      });
      if (saved.error === 'slot_taken') {
        return json({ ok: false, error: 'Энэ цаг аль хэдийн захиалагдсан байна. Өөр цаг сонгоно уу.' }, 409);
      }
      if (!saved.ok) throw new Error(`Sheets: ${saved.error}`);
      return json({ ok: true, bookingId });
    } catch (err) {
      console.error('booking error:', err); // vercel dev-ийн терминалд, Vercel-ийн Logs-д харагдана
      return json({ ok: false, error: 'Серверт алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.' }, 500);
    }
  },
};
