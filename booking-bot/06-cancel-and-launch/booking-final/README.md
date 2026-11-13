# Booking Bot: эцсийн хувилбар (цуцлалттай)

- `workflow.json`: захиалга, сул цаг шалгалт, цуцлалтын салаа (Wants cancel, Find bookings, Has booking, Delete event, Mark cancelled, Cancel reply, No booking) бүгд багтсан.
- `system-prompt.txt`: `cancel` талбартай System Message.

1. n8n-д шинэ workflow нээгээд **...** цэсний **Import > From file** дээр `workflow.json`-г сонго. Өмнөх `Booking Bot`-оо Unpublish хий.
2. Telegram, Google Sheets, Google Calendar, Gemini credential-ээ node бүрт сонго.
3. **Calendar**-т `Salon Bookings`, **Document**-д `Booking Bot` хүснэгтээ сонго (`YOUR_CALENDAR_ID`, `YOUR_SHEET_ID`).
4. Захиалах, цуцлах, захиалгагүйгээр цуцлах гурван яриаг туршаад **Publish** хий.
