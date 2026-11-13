import anthropic
from dotenv import load_dotenv

load_dotenv()
client = anthropic.Anthropic()

with client.messages.stream(
    model="claude-opus-5-5",
    max_tokens=4096,
    messages=[
        {
            "role": "user",
            "content": "Цагаан сарын баяраар хамт олондоо илгээх 2 догол мөр мэндчилгээ бич.",
        }
    ],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
    final = stream.get_final_message()

print()
print("output_tokens:", final.usage.output_tokens)
