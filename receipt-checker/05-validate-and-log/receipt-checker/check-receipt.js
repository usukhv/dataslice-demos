// Code node "Check receipt" · Mode: Run Once for Each Item
// Дутуу талбар, нийлбэрийн зөрүүг шалгаж, хүснэгтийн мөрөө бэлдэнэ.
const r = $json;
const missing = [];
if (!r.is_receipt) missing.push('баримт танигдсангүй');
else {
  if (!r.date) missing.push('огноо');
  if (!r.vendor) missing.push('худалдагч');
  if (!r.amount) missing.push('дүн');
}

let needs_review = 'no';
if (r.items_total && r.amount && Math.abs(r.items_total - r.amount) > r.amount * 0.01) {
  needs_review = 'yes';
}

const dedupe_key = r.receipt_no ? `no:${r.receipt_no}` : `${r.date}|${r.vendor}|${r.amount}`;
const msg = $('Telegram Trigger').item.json.message;

return {
  json: {
    ...r,
    missing: missing.join(', '),
    needs_review,
    dedupe_key,
    month: r.date ? r.date.slice(0, 7) : '',
    telegram_user: msg.from?.first_name || '',
    chat_id: msg.chat.id,
    created_at: $now.toFormat('yyyy-MM-dd HH:mm'),
  },
};
