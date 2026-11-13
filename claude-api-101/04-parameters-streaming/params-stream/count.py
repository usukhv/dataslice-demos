import anthropic
from dotenv import load_dotenv

load_dotenv()
client = anthropic.Anthropic()

for text in [
    "Сайн байна уу, маргааш цаг агаар ямар байх вэ?",
    "Hello, what will the weather be like tomorrow?",
]:
    count = client.messages.count_tokens(
        model="claude-haiku-5-5",
        messages=[{"role": "user", "content": text}],
    )
    print(count.input_tokens, text)
