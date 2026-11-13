// Code node "Build report" · Mode: Run Once for All Items
// Өнгөрсөн сарын мөрүүдийг ангиллаар нэмж, Telegram мессежийн текст бэлдэнэ.
const month = $now.minus({ months: 1 }).toFormat('yyyy-MM');
const totals = {};
let count = 0;

for (const item of $input.all()) {
  const row = item.json;
  if (!row.category) continue;
  totals[row.category] = (totals[row.category] || 0) + Number(row.amount || 0);
  count++;
}

const fmt = (n) => n.toLocaleString('en-US');
const lines = Object.entries(totals)
  .sort((a, b) => b[1] - a[1])
  .map(([category, sum]) => `- ${category}: ${fmt(sum)}`);
const total = Object.values(totals).reduce((a, b) => a + b, 0);

const text = count
  ? `${month} сарын зардал (MNT)\n\n${lines.join('\n')}\n\nНийт: ${fmt(total)}\nБаримт: ${count}`
  : `${month} сард бүртгэсэн баримт алга.`;

return [{ json: { text } }];
