# Echo бот

- `workflow.json`: **Telegram Trigger** ба **Send a text message** гэсэн 2 node. Бичсэн мессежийг буцааж давтана.
- Import: **...** цэснээс **Import**, дараа нь **From file** сонгоод файлаа сонго.
- Хоёр node-ийг нээж **Credential** талбарт өөрийн **Telegram API** credential-ээ сонго (BotFather-ийн token).
- **Append n8n Attribution** аль хэдийн унтраалттай.
- **Execute workflow** дараад ботдоо мессеж бич. Token-оо энэ файлд хэзээ ч бүү бич.
