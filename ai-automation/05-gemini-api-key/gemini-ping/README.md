# Gemini холболт шалгах

- `workflow.json`: **Manual Trigger** ба **Google Gemini** (**Message a model**) гэсэн 2 node.
- Import: **...** цэснээс **Import**, дараа нь **From file** сонгоод файлаа сонго.
- **Message a model** node-ийг нээж **Credential** талбарт өөрийн Gemini credential-ээ сонго.
- **Model** жагсаалтаас нэрэндээ `flash` гэсэн загвар сонго. Файлд `gemini-3.5-flash-lite` бичсэн ч таны акаунтад өөр загвар нээлттэй байж болно.
- **Execute workflow** дар. Output-д `content.parts[0].text` дотор Gemini-ийн хариу гарна.
