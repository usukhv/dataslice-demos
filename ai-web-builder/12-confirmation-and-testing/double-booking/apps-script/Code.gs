// Цэцэг салон: Google Sheets-ийн "Bookings" хуудсанд захиалга нэмнэ, давхар захиалгыг хориглоно.
// Хүснэгтийн Extensions > Apps Script цонхонд paste хийнэ.
// Project Settings > Script Properties-д SHARED_SECRET нэмэхээ бүү март.

function doPost(e) {
  // 1. Ирсэн JSON-ийг уншина
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: 'bad_json' });
  }

  // 2. Нууц түлхүүр таарахгүй бол юу ч бичихгүй
  const secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
  if (!secret || data.secret !== secret) {
    return json({ ok: false, error: 'unauthorized' });
  }

  // 3. Түгжээ: 2 хүсэлт зэрэг ирвэл ээлжлүүлнэ. Нэг нь шалгаж бичиж дуустал нөгөө нь хүлээнэ.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bookings');
    if (data.action === 'taken') {
      return json({ ok: true, taken: takenTimes(sheet, data.date) });
    }
    // 4. Тухайн цаг сул эсэхийг шалгана
    const b = data.booking;
    if (takenTimes(sheet, b.date).indexOf(b.time) !== -1) {
      return json({ ok: false, error: 'slot_taken' });
    }
    // 5. Шинэ мөр нэмнэ. ' тэмдэг нь утгыг текст хэвээр үлдээнэ (огноо, утас хувирахгүй)
    sheet.appendRow([new Date(), b.bookingId, text(b.serviceName), text(b.date), text(b.time),
      text(b.name), text(b.phone), text(b.note), b.price, '', 'PENDING', '']);
    return json({ ok: true });
  } finally {
    lock.releaseLock(); // алдаа гарсан ч түгжээг заавал сулална
  }
}

// Тухайн өдрийн CANCELLED биш захиалгуудын цаг. Багана: D=date(3), E=time(4), K=status(10)
function takenTimes(sheet, date) {
  const last = sheet.getLastRow();
  if (last < 2) return [];
  return sheet.getRange(2, 1, last - 1, 12).getValues()
    .filter(function (r) { return String(r[3]) === date && String(r[10]) !== 'CANCELLED'; })
    .map(function (r) { return String(r[4]); });
}

function text(value) {
  return "'" + String(value == null ? '' : value);
}

// Хариуг JSON болгож буцаана
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
