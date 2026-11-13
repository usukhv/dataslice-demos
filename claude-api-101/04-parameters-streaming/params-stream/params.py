import anthropic
from dotenv import load_dotenv

load_dotenv()
client = anthropic.Anthropic()

MODEL = "claude-haiku-5-5"

response = client.messages.create(
    model=MODEL,
    max_tokens=4096,
    output_config={"effort": "low"},
    stop_sequences=["6."],
    messages=[
        {
            "role": "user",
            "content": "Монголын 21 аймгийг цагаан толгойн дарааллаар дугаарлан жагсаа. Зөвхөн нэрийг нь бич.",
        }
    ],
)

text = "".join(block.text for block in response.content if block.type == "text")
print(text)
print("stop_reason:", response.stop_reason)
print("stop_sequence:", response.stop_sequence)
print("input_tokens:", response.usage.input_tokens)
print("output_tokens:", response.usage.output_tokens)
