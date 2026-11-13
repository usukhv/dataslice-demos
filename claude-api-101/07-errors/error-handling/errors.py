import sys

import anthropic
from dotenv import load_dotenv

load_dotenv()
client = anthropic.Anthropic(max_retries=3)
MODEL = sys.argv[1] if len(sys.argv) > 1 else "claude-opus-5-5"

try:
    response = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        messages=[{"role": "user", "content": "Сайн уу? Нэг өгүүлбэрээр хариул."}],
    )
except anthropic.AuthenticationError:
    print("API key буруу эсвэл хүчингүй болсон. .env файлаа шалга.")
except anthropic.NotFoundError:
    print(f"{MODEL} загвар олдсонгүй. Нэрийг нь шалга.")
except anthropic.RateLimitError:
    print("Хязгаарт хүрлээ. Хэсэг хүлээгээд дахин оролд.")
except anthropic.BadRequestError as e:
    print("Хүсэлт буруу:", e.message)
except anthropic.APIConnectionError:
    print("Сервертэй холбогдож чадсангүй. Интернэтээ шалга.")
except anthropic.APIStatusError as e:
    print(f"Серверийн алдаа ({e.status_code}). Дараа дахин оролд.")
else:
    if response.stop_reason == "refusal":
        print("Claude энэ хүсэлтэд хариулахаас татгалзлаа.")
    elif response.stop_reason == "max_tokens":
        print("Хариу max_tokens-д хүрч тасарлаа.")
    print("".join(block.text for block in response.content if block.type == "text"))
    print("request id:", response._request_id)
