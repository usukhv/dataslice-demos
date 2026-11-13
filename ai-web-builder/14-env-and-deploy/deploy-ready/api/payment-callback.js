// /api/payment-callback?booking=ID (QPay callback) эсвэл POST { bookingId } (сайтын товч).
// Хэн дуудсан ч сервер өөрөө баталгаажуулна: demo үед PAID_DEMO, qpay үед QPay-ээс шалгана.
import { callSheets } from '../lib/sheets.js';
import { paidAmount } from '../lib/qpay.js';

const json = (body, status = 200) => Response.json(body, { status });

export default {
  async fetch(request) {
    try {
      let bookingId = new URL(request.url).searchParams.get('booking');
      if (!bookingId && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        bookingId = body.bookingId;
      }
      if (!/^B[A-Z0-9]{6,20}$/.test(bookingId || '')) return json({ ok: false, error: 'Захиалгын код буруу.' }, 400);

      const found = await callSheets({ action: 'get', bookingId });
      if (!found.ok) return json({ ok: false, error: 'Захиалга олдсонгүй.' }, 404);
      const booking = found.booking;

      // Callback 2 удаа ирсэн ч дахин шинэчлэхгүй
      if (booking.status.startsWith('PAID')) return json({ ok: true, status: booking.status });
      if (booking.status !== 'PENDING') return json({ ok: false, status: booking.status, error: 'Захиалга цуцлагдсан.' });

      const mode = process.env.PAYMENT_MODE || 'demo';
      if (mode === 'demo') {
        const r = await callSheets({ action: 'markPaid', bookingId, status: 'PAID_DEMO', paymentId: `DEMO-${Date.now()}` });
        return json({ ok: r.ok, status: r.status });
      }

      // QPay: callback-ийн агуулгад итгэхгүй, /v2/payment/check-ээр дахин шалгана
      const paid = await paidAmount(booking.payment_id);
      if (paid.amount >= Number(booking.deposit)) {
        const r = await callSheets({ action: 'markPaid', bookingId, status: 'PAID', paymentId: paid.paymentId || booking.payment_id });
        return json({ ok: r.ok, status: r.status });
      }
      return json({ ok: true, status: 'PENDING' });
    } catch (err) {
      console.error('payment-callback error:', err);
      return json({ ok: false, error: 'Серверт алдаа гарлаа.' }, 500);
    }
  },
};
