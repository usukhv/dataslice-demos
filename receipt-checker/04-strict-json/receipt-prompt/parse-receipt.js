// Code node "Parse receipt" · Mode: Run Once for Each Item
// Gemini-ийн хариу текстээс JSON-оо салгаж, талбар бүрийг шалгана.
const parts = $json.content?.parts || [];
const raw = parts.map((p) => p.text || '').join('');

let r = {};
try {
  r = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
} catch (e) {
  r = {};
}

const CATEGORIES = ['Хүнс', 'Хоол кафе', 'Тээвэр', 'Шатахуун', 'Оффис', 'Харилцаа холбоо', 'Бусад'];
const num = (v) => {
  const n = Number(String(v ?? '').replace(/[^\d.]/g, ''));
  return n > 0 ? n : null;
};

return {
  json: {
    is_receipt: r.is_receipt === true,
    date: /^\d{4}-\d{2}-\d{2}$/.test(r.date) ? r.date : null,
    vendor: r.vendor || null,
    amount: num(r.amount),
    currency: r.currency || 'MNT',
    category: CATEGORIES.includes(r.category) ? r.category : 'Бусад',
    receipt_no: r.receipt_no ? String(r.receipt_no) : null,
    items_total: num(r.items_total),
  },
};
