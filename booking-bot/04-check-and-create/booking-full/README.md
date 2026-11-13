# Booking Bot: сул цаг шалгаж захиалга үүсгэх

- `workflow.json`: 03-р хичээлийн workflow дээр Check slot, Is free, Create event, Log booking, Confirm, Busy reply node нэмэгдсэн бүтэн хувилбар.

1. n8n-д шинэ workflow нээгээд **...** цэсний **Import > From file** дээр `workflow.json`-г сонго. Хуучин `Booking Bot`-оо Unpublish хийсэн байх.
2. Бүх Telegram node-д Telegram credential, Google Sheets ба Google Calendar node-д Google credential сонго.
3. Google Calendar node бүрийн **Calendar**-т `Salon Bookings`-ийг жагсаалтаас сонго (`YOUR_CALENDAR_ID`-г солих).
4. Get services, Log booking node-ийн **Document**-д өөрийн хүснэгтийг сонго (`YOUR_SHEET_ID`).
5. AI Agent-ийн **System Message**-д салоны нэр, ажлын цагаа засна.
