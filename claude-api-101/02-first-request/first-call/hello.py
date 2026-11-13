import anthropic
from dotenv import load_dotenv

load_dotenv()  # .env файлаас ANTHROPIC_API_KEY-г уншина
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=2048,
    messages=[
        {
            "role": "user",
            "content": "Улаанбаатарын өвөлд тохирох 3 хувцасны зөвлөгөө өг. Тус бүр нэг өгүүлбэр.",
        }
    ],
)

for block in response.content:
    if block.type == "text":
        print(block.text)
