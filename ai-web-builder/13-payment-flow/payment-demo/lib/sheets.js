// Apps Script Web App руу нууц түлхүүртэй хүсэлт илгээнэ.
// SHEETS_WEBHOOK_URL, SHEETS_SECRET нь зөвхөн environment variable-д байна.
export async function callSheets(payload) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_SECRET;
  if (!url || !secret) {
    throw new Error('SHEETS_WEBHOOK_URL эсвэл SHEETS_SECRET тохируулаагүй байна');
  }
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
