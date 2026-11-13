# Каталогоос хариулдаг Telegram агент

- `workflow.json`: Telegram Trigger, AI Agent (Google Gemini Chat Model, Simple Memory, Products ба FAQ tool), Send Reply
- `system-message.txt`: агентын заавар (AI Agent > Options > System Message-д аль хэдийн орсон)

Import: n8n дээр шинэ workflow нээгээд баруун дээд **...** > **Import** > **From file** > `workflow.json`.
Солих зүйл: Telegram Trigger ба Send Reply-д Telegram credential, Gemini node-д Gemini credential, Products ба FAQ-д Google Sheets credential сонго.
Products, FAQ node-ийн **Document**-оос өөрийн `Shop Bot` файлыг сонго. Дэлгүүрийн нэрийг System Message-д соль.
