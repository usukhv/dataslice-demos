# Gemini prompt туршилт

- `workflow.json`: `Асуулт`, **Message a model**, `Хариу` гэсэн node-уудтай. **Options** хэсэгт **System Message** бэлэн бичигдсэн.
- `prompts.md`: 5 хэсэгтэй prompt-ын загвар ба бизнесийн 3 жишээ. Хуулж ашигла.
- Import: **...** цэснээс **Import**, дараа нь **From file** сонгоод `workflow.json`-оо сонго.
- **Message a model** дээр Gemini credential, **Model** жагсаалтаас `flash` загвар сонго.
- `Асуулт` node-ийн `question` утгыг сольж **Execute workflow** дар. Хариу `Хариу` node-ийн `answer` талбарт гарна.
- **System Message** доторх дэлгүүрийн мэдээллийг өөрийн бизнесээр соль.
