# Gemini Telegram бот

- `workflow.json`: **Telegram Trigger**, `Typing тэмдэг`, **Message a model**, **Send a text message** гэсэн 4 node.
- `system-prompt.txt`: **Message a model** node-ийн **Options** доторх **System Message**-тэй ижил текст. Засварлахад хялбар болгож тусад нь гаргасан.
- Import: **...** цэснээс **Import**, дараа нь **From file** сонгоод `workflow.json`-оо сонго.
- Telegram node-уудад **Telegram API**, **Message a model**-д Gemini credential-ээ сонго. **Model** жагсаалтаас `flash` загвар сонго.
- **System Message** доторх Номин цэцэг дэлгүүрийн мэдээллийг өөрийн бизнесээр соль. Утасны дугаар зохиомол.
- **Execute workflow** дараад ботдоо асуулт бич.
