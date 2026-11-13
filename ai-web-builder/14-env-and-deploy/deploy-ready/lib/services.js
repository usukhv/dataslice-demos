// Үйлчилгээ, үнэ, урьдчилгаа. Үнийг browser-оос ХЭЗЭЭ Ч авахгүй, зөвхөн эндээс.
export const SERVICES = {
  'women-cut': { name: 'Эмэгтэй үс засалт', minutes: 45, price: 45000, deposit: 10000 },
  'men-cut': { name: 'Эрэгтэй үс засалт', minutes: 30, price: 25000, deposit: 5000 },
  color: { name: 'Үс будалт', minutes: 120, price: 120000, deposit: 30000 },
};

export const SLOTS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

// Улаанбаатарын (UTC+8) өнөөдрийн огноо, YYYY-MM-DD
export function todayUB() {
  return new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);
}
