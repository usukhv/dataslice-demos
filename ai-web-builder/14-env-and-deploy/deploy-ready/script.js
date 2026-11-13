// Цэцэг салон: захиалгын форм, шалгалт, төлбөрийн алхам (browser талын код).
// Нууц түлхүүр энд ХЭЗЭЭ Ч байхгүй. Бүх нууц api/ доторх Vercel Function-д.

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

function formatWhen(date, time) {
  const [y, m, d] = date.split('-').map(Number);
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  return `${date}, ${weekday}, ${time}`;
}

const formatMoney = (n) => n.toLocaleString('mn-MN').replace(/,/g, ' ') + '₮';

if (typeof document !== 'undefined') {
  const $ = (id) => document.getElementById(id);
  const form = $('booking-form');
  const submitBtn = $('submit-btn');
  const formMessage = $('form-message');
  let current = null; // сүүлийн амжилттай захиалга

  $('year').textContent = new Date().getFullYear();
  $('date').min = today();

  // Цагийн сонголтыг бөглөнө. Захиалагдсан цагийг идэвхгүй болгоно.
  function fillSlots(taken = []) {
    const select = $('time');
    const chosen = select.value;
    select.innerHTML = '<option value="">Сонгоно уу</option>';
    for (const slot of SLOTS) {
      const opt = new Option(taken.includes(slot) ? `${slot} (захиалагдсан)` : slot, slot);
      opt.disabled = taken.includes(slot);
      select.add(opt);
    }
    if (chosen && !taken.includes(chosen)) select.value = chosen;
  }
  fillSlots();

  // Огноо сонгоход тухайн өдрийн захиалагдсан цагуудыг серверээс асууна
  $('date').addEventListener('change', async () => {
    const date = $('date').value;
    if (!date) return fillSlots();
    try {
      const res = await fetch(`/api/booking?date=${encodeURIComponent(date)}`);
      const body = await res.json();
      fillSlots(body.ok ? body.taken : []);
    } catch {
      fillSlots(); // сүлжээ тасарвал бүх цагийг харуулна, илгээх үед сервер дахин шалгана
    }
  });

  function showErrors(errors) {
    for (const field of ['service', 'date', 'time', 'name', 'phone', 'agree']) {
      $(`${field}-error`).textContent = errors[field] || '';
      $(field).setAttribute('aria-invalid', errors[field] ? 'true' : 'false');
    }
    const first = Object.keys(errors)[0];
    if (first) $(first).focus();
  }

  function setMessage(el, text, isError) {
    el.textContent = text;
    el.classList.toggle('is-error', Boolean(isError));
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
      service: $('service').value,
      date: $('date').value,
      time: $('time').value,
      name: $('name').value,
      phone: $('phone').value,
      note: $('note').value,
      agree: $('agree').checked,
    };
    const errors = validateBooking(data);
    showErrors(errors);
    if (Object.keys(errors).length) return;

    submitBtn.disabled = true; // давхар дарахаас сэргийлнэ
    submitBtn.textContent = 'Илгээж байна...';
    setMessage(formMessage, '');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (res.status === 409) {
        showErrors({ time: body.error });
        $('date').dispatchEvent(new Event('change'));
      } else if (!res.ok || !body.ok) {
        if (body.fields) showErrors(body.fields);
        setMessage(formMessage, body.error || 'Алдаа гарлаа. Дахин оролдоно уу.', true);
      } else {
        current = body;
        form.hidden = true;
        showPayment(body);
      }
    } catch {
      setMessage(formMessage, 'Холболт тасарлаа. Интернэтээ шалгаад дахин оролдоно уу.', true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Цаг захиалах';
    }
  });

  function showPayment(booking) {
    $('pay-amount').textContent = formatMoney(booking.deposit);
    $('payment').hidden = false;
    if (booking.payment.mode === 'qpay') {
      $('pay-qr').src = `data:image/png;base64,${booking.payment.qrImage}`;
      $('pay-qpay').hidden = false;
    } else {
      $('pay-demo').hidden = false;
    }
    $('payment').scrollIntoView({ behavior: 'smooth' });
  }

  // Demo: "төлсөн" гэж тэмдэглэнэ. QPay: сервер QPay-ээс дахин шалгана.
  async function confirmPayment(button) {
    button.disabled = true;
    setMessage($('pay-message'), 'Шалгаж байна...');
    try {
      const res = await fetch('/api/payment-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: current.bookingId }),
      });
      const body = await res.json();
      if (body.ok && body.status.startsWith('PAID')) {
        $('payment').hidden = true;
        $('c-service').textContent = SERVICE_NAMES[current.service];
        $('c-when').textContent = formatWhen(current.date, current.time);
        $('c-code').textContent = current.bookingId;
        $('confirmation').hidden = false;
        $('confirmation').focus();
      } else {
        setMessage($('pay-message'), body.error || 'Төлбөр хараахан ороогүй байна. Хэдэн секундын дараа дахин шалгана уу.', true);
      }
    } catch {
      setMessage($('pay-message'), 'Холболт тасарлаа. Дахин оролдоно уу.', true);
    } finally {
      button.disabled = false;
    }
  }
  $('demo-paid-btn').addEventListener('click', (e) => confirmPayment(e.currentTarget));
  $('check-paid-btn').addEventListener('click', (e) => confirmPayment(e.currentTarget));
}
