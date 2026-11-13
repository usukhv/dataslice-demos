import anthropic
from dotenv import load_dotenv

load_dotenv()
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=2048,
    messages=[{"role": "user", "content": "Сайн уу? Нэг өгүүлбэрээр хариул."}],
)

print("id:", response.id)
print("model:", response.model)
print("stop_reason:", response.stop_reason)
print("blocks:", [block.type for block in response.content])
print("usage:", response.usage.input_tokens, response.usage.output_tokens)
