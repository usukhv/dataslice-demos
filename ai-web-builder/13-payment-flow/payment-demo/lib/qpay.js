// QPay Merchant API v2 (https://developer.qpay.mn). PAYMENT_MODE=qpay үед л ажиллана.
// Хүсэлтийн body нь QPay-ийн албан ёсны Postman collection-оос авсан.
// Хариуны талбарын нэрийг (access_token, invoice_id, qr_image, paid_amount, rows)
// өөрийн sandbox хариутай заавал тулгаж шалга.

function env(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} тохируулаагүй байна`);
  return value;
}

async function qpay(path, { token, body }) {
  const res = await fetch(env('QPAY_BASE_URL') + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`QPay ${path} алдаа: ${res.status} ${await res.text()}`);
  return res.json();
}

// 1. Access token авах: client_id:client_secret-ийг Basic Auth-аар илгээнэ
export async function getToken() {
  const basic = Buffer.from(`${env('QPAY_CLIENT_ID')}:${env('QPAY_CLIENT_SECRET')}`).toString('base64');
  const res = await fetch(env('QPAY_BASE_URL') + '/v2/auth/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}` },
  });
  if (!res.ok) throw new Error(`QPay token алдаа: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

// 2. Нэхэмжлэх үүсгэх. Дүнг сервер тогтооно.
export async function createInvoice({ bookingId, amount, description, callbackUrl }) {
  const token = await getToken();
  const invoice = await qpay('/v2/invoice', {
    token,
    body: {
      invoice_code: env('QPAY_INVOICE_CODE'),
      sender_invoice_no: bookingId,
      invoice_receiver_code: 'terminal',
      invoice_description: description,
      amount,
      callback_url: callbackUrl,
    },
  });
  return { invoiceId: invoice.invoice_id, qrImage: invoice.qr_image, urls: invoice.urls || [] };
}

// 3. Төлбөр шалгах: callback-д шууд итгэхгүй, QPay-ээс өөрөөс нь асууна
export async function paidAmount(invoiceId) {
  const token = await getToken();
  const result = await qpay('/v2/payment/check', {
    token,
    body: { object_type: 'INVOICE', object_id: invoiceId, offset: { page_number: 1, page_limit: 100 } },
  });
  const paidRow = (result.rows || []).find((row) => row.payment_status === 'PAID');
  return { amount: Number(result.paid_amount || 0), paymentId: paidRow ? String(paidRow.payment_id) : '' };
}
