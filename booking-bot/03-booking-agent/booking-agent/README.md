# Booking Bot: AI Agent хэсэг

- `workflow.json`: Telegram Trigger, Get services, Services list (Aggregate), AI Agent (Gemini, Simple Memory, Structured Output Parser), Ready? IF, хоёр Telegram хариу.
- `system-prompt.txt`: AI Agent-ийн **System Message**. Салоны нэр, ажлын цагийг өөрийнхөөрөө соль.

1. n8n-д шинэ workflow нээгээд баруун дээд **...** цэсний **Import > From file** дээр `workflow.json`-г сонго.
2. Telegram Trigger, хоёр Telegram node-д Telegram credential, Get services-д Google Sheets credential, Gemini node-д Gemini credential сонго. **Model**-ийг жагсаалтаас flash загвараар соль.
3. Get services node-ийн **Document**-д өөрийн `Booking Bot` хүснэгтийг сонго (`YOUR_SHEET_ID`-г солих).
4. **Settings** дотор **Timezone** нь `Asia/Ulaanbaatar` байгааг шалга.
5. **Execute workflow** дараад ботдоо бичиж турш.
