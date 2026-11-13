# Баримт унших prompt ба JSON бүтэц

- `prompt.txt`: Google Gemini node-ийн **Text Input** талбарт бүтнээр нь хуулж тавих prompt.
- `receipt.schema.json`: Gemini-ээс авах JSON-ийн бүтэц (JSON Schema). Талбар бүрийн төрөл, зөвшөөрөгдөх утга бий.
- `parse-receipt.js`: `Parse receipt` Code node-ийн код. **Mode**: **Run Once for Each Item**.
- `sample-response.txt`: Gemini-ийн жишээ хариу. Code node яг ийм текстийг цэвэр JSON болгоно.

Ангиллаа өөрчлөх бол `prompt.txt`, `parse-receipt.js` хоёрын ангиллын жагсаалтыг хамт соль.
