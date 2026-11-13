# Баримт шалгагч: бүтэн workflow

`workflow.json`: зураг хүлээн авахаас хүснэгтэд бичиж, баталгаа илгээх хүртэлх 14 node. `check-receipt.js`: `Check receipt` Code node-ийн код.

Ашиглах:

1. n8n-д **...** > **Import** > **From file** дарж `workflow.json`-ийг сонго.
2. Telegram node бүрт (Trigger-ийг оруулаад 6 ширхэг) Telegram credential, `Read receipt` node-д Gemini credential сонго.
3. `Find duplicate`, `Log receipt` node-д Google Sheets credential сонгоод **Document** талбарт өөрийн хүснэгтийн холбоосыг тавь (`YOUR_SHEET_ID`).
4. **Execute workflow** дараад ботдоо баримт илгээж турш. Ажиллавал **Publish** дар.
