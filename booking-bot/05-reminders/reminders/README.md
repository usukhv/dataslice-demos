# Booking Reminders

- `workflow.json`: Schedule Trigger (өдөр бүр 18:00), Tomorrow events (Google Calendar, Get Many), Bot bookings (Filter), Send reminder (Telegram).

1. n8n-д шинэ workflow нээгээд **...** цэсний **Import > From file** дээр `workflow.json`-г сонго.
2. Tomorrow events node-д Google Calendar credential, **Calendar**-т `Salon Bookings`-ийг сонго (`YOUR_CALENDAR_ID`).
3. Send reminder node-д Telegram credential сонго.
4. **Settings** дотор **Timezone** нь `Asia/Ulaanbaatar` эсэхийг шалга.
5. Маргаашийн туршилтын захиалгатайгаар **Execute workflow** дараад, дараа нь **Publish** хий.
