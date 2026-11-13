# Сарын тайлан

`workflow.json`: Schedule Trigger (сар бүрийн 1-нд 9:00), Google Sheets **Get Row(s)**, Code (`Build report`), Telegram **Send Message**. `build-report.js`: Code node-ийн код.

Ашиглах:

1. n8n-д **...** > **Import** > **From file** дарж `workflow.json`-ийг сонго.
2. `Last month rows` node-д Google Sheets credential сонгоод **Document** талбарт өөрийн хүснэгтийн холбоосыг тавь (`YOUR_SHEET_ID`).
3. `Send report` node-д Telegram credential сонгоод **Chat ID** талбарт `YOUR_CHAT_ID`-ийн оронд өөрийн chat ID-г бич.
4. Workflow-ийн **Settings** дотор **Timezone** нь `Asia/Ulaanbaatar` эсэхийг шалга.
5. **Execute workflow** дарж турш. Жишээ мөрүүдийн `month` өнгөрсөн сартай таарахгүй бол хүснэгтэд гараар соль.
6. Ажиллавал **Publish** хий.
