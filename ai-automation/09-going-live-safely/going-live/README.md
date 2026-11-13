# Production-д гаргах бэлэн 2 workflow

- `gemini-bot-safe.json`: **If** шүүлтүүр, typing тэмдэг, **Retry On Fail** (3 оролдлого), алдааны output-тэй Gemini бот.
- `error-handler.json`: **Error Trigger** ба Telegram мэдэгдэл. `YOUR_CHAT_ID`-г өөрийн chat ID-аар соль.
- `system-prompt.txt`: ботын **System Message**. Өөрийн бизнесийн мэдээллээр соль.
- Хоёр файлыг тус тусад нь шинэ workflow болгож **Import**, **From file**-аар оруул. Credential-үүдээ сонго.
- Бот workflow-ийн **...** цэснээс **Settings** нээж **Error workflow**-д `Error Handler`-ийг сонго.
- Бот workflow-оо **Publish** хий. `Error Handler`-ийг Publish хийх шаардлагагүй.
