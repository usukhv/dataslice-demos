// Цэцэг салон: Google Sheets-ийн "Bookings" хуудсанд захиалга хадгална.
// Хүснэгтийн Extensions > Apps Script цонхонд paste хийнэ.
// Project Settings > Script Properties-д SHARED_SECRET нэмэхээ бүү март.

const SHEET_NAME = 'Bookings';
// Баганын дараалал: created_at, booking_id, service, date, time, name, phone, note, price, deposit, status, payment_id
const COL = { id: 1, date: 3, time: 4, deposit: 9, status: 10, paymentId: 11 }; // 0-ээс эхэлсэн индекс

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: 'bad_json' });
  }

  // 1. Нууц түлхүүр шалгах: зөвхөн манай Vercel Function бичиж чадна
  const secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
  if (!secret || data.secret !== secret) {
    return json({ ok: false, error: 'unauthorized' });
  }

  // 2. Түгжээ: 2 хүсэлт зэрэг ирвэл ээлжлүүлнэ (давхар захиалгаас сэргийлнэ)
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (data.action === 'create') return json(createBooking(sheet, data.booking));
    if (data.action === 'taken') return json({ ok: true, taken: takenTimes(sheet, data.date) });
    if (data.action === 'get') return json(getBooking(sheet, data.bookingId));
    if (data.action === 'setPayment') return json(updateRow(sheet, data.bookingId, { paymentId: data.paymentId }));
    if (data.action === 'markPaid') return json(markPaid(sheet, data.bookingId, data.status, data.paymentId));
    return json({ ok: false, error: 'unknown_action' });
  } finally {
    lock.releaseLock(); // алдаа гарсан ч түгжээг заавал сулална
  }
}

function createBooking(sheet, b) {
  if (takenTimes(sheet, b.date).indexOf(b.time) !== -1) {
    return { ok: false, error: 'slot_taken' };
  }
  // ' тэмдэг нь утгыг текст хэвээр хадгална (огноо, утас хувирахгүй, = томьёо ажиллахгүй)
  sheet.appendRow([new Date(), b.bookingId, text(b.serviceName), text(b.date), text(b.time),
    text(b.name), text(b.phone), text(b.note), b.price, b.deposit, 'PENDING', '']);
  return { ok: true };
}

// Тухайн өдрийн CANCELLED биш захиалгуудын цаг
function takenTimes(sheet, date) {
  return rows(sheet)
    .filter(function (r) { return r[COL.date] === date && r[COL.status] !== 'CANCELLED'; })
    .map(function (r) { return r[COL.time]; });
}

function getBooking(sheet, bookingId) {
  const r = rows(sheet).filter(function (row) { return row[COL.id] === bookingId; })[0];
  if (!r) return { ok: false, error: 'not_found' };
  return { ok: true, booking: { booking_id: r[COL.id], date: r[COL.date], time: r[COL.time],
    deposit: r[COL.deposit], status: r[COL.status], payment_id: r[COL.paymentId] } };
}

// Зөвхөн PENDING захиалгыг төлсөн болгоно. 2 дахь callback юу ч өөрчлөхгүй.
function markPaid(sheet, bookingId, status, paymentId) {
  const found = getBooking(sheet, bookingId);
  if (!found.ok) return found;
  if (found.booking.status !== 'PENDING') return { ok: true, status: found.booking.status, already: true };
  return updateRow(sheet, bookingId, { status: status, paymentId: paymentId });
}

function updateRow(sheet, bookingId, changes) {
  const all = rows(sheet);
  for (let i = 0; i < all.length; i++) {
    if (all[i][COL.id] !== bookingId) continue;
    const rowNumber = i + 2; // 1-р мөр нь гарчиг
    if (changes.status) sheet.getRange(rowNumber, COL.status + 1).setValue(changes.status);
    if (changes.paymentId) sheet.getRange(rowNumber, COL.paymentId + 1).setValue(text(changes.paymentId));
    return { ok: true, status: changes.status || all[i][COL.status] };
  }
  return { ok: false, error: 'not_found' };
}

// Гарчгаас доорх бүх мөр. Үнээс бусад утгыг текст болгоно.
function rows(sheet) {
  const last = sheet.getLastRow();
  if (last < 2) return [];
  return sheet.getRange(2, 1, last - 1, 12).getValues().map(function (r) {
    return r.map(function (v, i) { return i === COL.deposit ? Number(v) : String(v); });
  });
}

function text(value) {
  return "'" + String(value == null ? '' : value);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
