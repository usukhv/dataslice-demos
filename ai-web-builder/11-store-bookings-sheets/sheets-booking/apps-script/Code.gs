// Цэцэг салон: Google Sheets-ийн "Bookings" хуудсанд захиалга нэмнэ.
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

  // 3. Шинэ мөр нэмнэ. ' тэмдэг нь утгыг текст хэвээр үлдээнэ (огноо, утас хувирахгүй)
  const b = data.booking;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bookings');
  sheet.appendRow([new Date(), b.bookingId, text(b.serviceName), text(b.date), text(b.time),
    text(b.name), text(b.phone), text(b.note), b.price, '', 'PENDING', '']);
  return json({ ok: true });
}

function text(value) {
  return "'" + String(value == null ? '' : value);
}

// Хариуг JSON болгож буцаана
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
