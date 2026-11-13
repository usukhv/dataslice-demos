# Зургийг ботоос Gemini руу

`workflow.json`: Telegram Trigger, If (`Has photo?`), Telegram **Get a file**, Google Gemini **Analyze an image**, зураггүй мессежид хариулах Telegram node.

Ашиглах:

1. n8n-д **...** > **Import** > **From file** дарж `workflow.json`-ийг сонго.
2. Telegram node-уудад (`Telegram Trigger`, `Get file`, `Ask for photo`) өөрийн Telegram credential-ээ сонго.
3. `Read receipt` node-д Gemini credential-ээ сонго. **Model** талбарт `models/gemini-3.6-flash` байгаа. Жагсаалтад байхгүй бол өөр Flash загвар сонго.
4. **Execute workflow** дараад ботдоо баримтын зураг илгээ.
