import base64
import mimetypes
import sys

import anthropic
from dotenv import load_dotenv

load_dotenv()
client = anthropic.Anthropic()

path = sys.argv[1]
media_type = mimetypes.guess_type(path)[0]  # image/jpeg, image/png, image/webp, image/gif
with open(path, "rb") as f:
    image_data = base64.standard_b64encode(f.read()).decode("utf-8")

response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=4096,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {"type": "base64", "media_type": media_type, "data": image_data},
                },
                {
                    "type": "text",
                    "text": (
                        "Энэ зарын хуудаснаас огноо, цаг, газар, холбогдох утсыг жагсаа. "
                        "Уншигдахгүй хэсгийг [уншигдахгүй] гэж тэмдэглэ, таамаглаж бүү бөглө."
                    ),
                },
            ],
        }
    ],
)

print("".join(block.text for block in response.content if block.type == "text"))
