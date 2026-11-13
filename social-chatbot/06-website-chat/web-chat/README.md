# Нэг төв агент ба вэбсайтын чат

- `shop-brain.json`: төв агент (When Executed by Another Workflow оролт: text, session_id, channel)
- `telegram-channel.json`: Telegram суваг, агентын оронд Shop Brain-ийг дууддаг
- `web-chat.json`: Chat Trigger (Embedded Chat) + Shop Brain + `[ХҮН]` тэмдэг арилгах
- `index.html`: @n8n/chat widget-тэй жишээ хуудас

Дараалал: эхлээд `shop-brain.json`-ийг import хийж credential-уудаа сонгоод **Save**. Дараа нь бусад 2-ыг import хийж **Shop Brain** node-оос түүнийгээ сонго.
Chat Trigger-ийн **Allowed Origins (CORS)**-д `https://YOUR-DOMAIN.mn`-ийг өөрийн домэйноор соль. Publish хийгээд **Chat URL**-ийг `index.html`-ийн `CHAT_URL`-д тавь.
Шалгах: `python3 -m http.server 8000` ажиллуулаад `http://localhost:8000` нээ (CORS-д `http://localhost:8000` түр нэм).
