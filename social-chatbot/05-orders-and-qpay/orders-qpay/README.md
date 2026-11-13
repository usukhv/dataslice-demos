# Захиалга ба QPay нэхэмжлэх

- `create-order-tool.json`: CreateOrder tool (Google Sheets Tool, Append Row, `$fromAI` талбартай). Файлын агуулгыг хуулаад агентын workflow-ийн canvas дээр **Cmd/Ctrl + V** хий, AI Agent-ийн **Tool**-д холбо.
- `system-message-orders.txt`: System Message-ийн төгсгөлд нэмэх 4 мөр
- `qpay-invoice.json`: QPay sandbox загвар. Token, нэхэмжлэх, Telegram-аар холбоос, 3 минут хүлээгээд төлбөр шалгах, `Orders`-д `paid` бичих

PLACEHOLDER: `YOUR_INVOICE_CODE`, `YOUR-N8N-DOMAIN`, `YOUR_TEST_CHAT_ID`. Утгыг QPay-ээс авсан merchant мэдээллээр соль.
QPay token node-д **Basic Auth** credential үүсгэ (User = client_id, Password = client_secret). Нууцыг workflow-д бүү бич.
Эхлээд `https://merchant-sandbox.qpay.mn` дээр турш. Бодит төлбөрт `https://merchant.qpay.mn` болго.
