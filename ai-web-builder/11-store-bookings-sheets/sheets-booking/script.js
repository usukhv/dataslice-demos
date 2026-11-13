// Цэцэг салон: захиалгын форм, шалгалт, /api/booking руу илгээх (browser талын код).
// Нууц түлхүүр энд ХЭЗЭЭ Ч байхгүй. Бүх нууц api/booking.js-д.

const SLOTS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
const SERVICE_NAMES = { 'women-cut': 'Эмэгтэй үс засалт', 'men-cut': 'Эрэгтэй үс засалт', color: 'Үс будалт' };
const WEEKDAYS = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];

// Өнөөдрийн огноо YYYY-MM-DD хэлбэрээр (хэрэглэгчийн компьютерийн цагаар)
function today() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Формын өгөгдлийг шалгаж, алдааны мессежүүдийг буцаана. Алдаагүй бол хоосон объект.
function validateBooking(data) {
  const errors = {};
  if (!SERVICE_NAMES[data.service]) errors.service = 'Үйлчилгээгээ сонгоно уу.';
  if (!data.date) errors.date = 'Огноогоо сонгоно уу.';
  else if (data.date < today()) errors.date = 'Өнгөрсөн огноо сонгох боломжгүй.';
  if (!SLOTS.includes(data.time)) errors.time = 'Цагаа сонгоно уу.';
  if (data.name.trim().length < 2) errors.name = 'Нэрээ бичнэ үү.';
  const digits = data.phone.replace(/[\s-]/g, '');
  if (!/^\d{8}$/.test(digits)) errors.phone = 'Утасны дугаараа 8 цифрээр бичнэ үү. Жишээ: 99112233';
  if (!data.agree) errors.agree = 'Нөхцөлийг зөвшөөрнө үү.';
  return errors;
}

if (typeof document !== 'undefined') {
  const $ = (id) => document.getElementById(id);
  const form = $('booking-form');
  const submitBtn = $('submit-btn');
  const formMessage = $('form-message');

  $('year').textContent = new Date().getFullYear();
  $('date').min = today(); // өнгөрсөн огноо сонгогдохгүй

  for (const slot of SLOTS) $('time').add(new Option(slot, slot));

  function showErrors(errors) {
    for (const field of ['service', 'date', 'time', 'name', 'phone', 'agree']) {
      $(`${field}-error`).textContent = errors[field] || '';
      $(field).setAttribute('aria-invalid', errors[field] ? 'true' : 'false');
    }
    const first = Object.keys(errors)[0];
    if (first) $(first).focus();
  }

  function readForm() {
    return {
      service: $('service').value,
      date: $('date').value,
      time: $('time').value,
      name: $('name').value,
      phone: $('phone').value,
      note: $('note').value,
      agree: $('agree').checked,
    };
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = readForm();
    const errors = validateBooking(data);
    showErrors(errors);
    if (Object.keys(errors).length) return;

    submitBtn.disabled = true; // давхар дарахаас сэргийлнэ
    submitBtn.textContent = 'Илгээж байна...';
    formMessage.textContent = '';
    formMessage.classList.remove('is-error');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        if (body.fields) showErrors(body.fields);
        formMessage.textContent = body.error || 'Алдаа гарлаа. Дахин оролдоно уу.';
        formMessage.classList.add('is-error');
      } else {
        form.reset();
        formMessage.textContent = `Захиалга бүртгэгдлээ. Таны код: ${body.bookingId}`;
      }
    } catch {
      formMessage.textContent = 'Холболт тасарлаа. Интернэтээ шалгаад дахин оролдоно уу.';
      formMessage.classList.add('is-error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Цаг захиалах';
    }
  });
}
