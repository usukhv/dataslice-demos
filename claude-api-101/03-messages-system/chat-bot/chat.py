import anthropic
from dotenv import load_dotenv

load_dotenv()
client = anthropic.Anthropic()

SYSTEM = """Чи "Ном Сан" номын дэлгүүрийн чат туслах.
Монголоор, эелдэг, 3 өгүүлбэрээс ихгүй хариул.
Дэлгүүрийн цаг: Даваа-Бямба 10:00-20:00, Ням амарна.
Хаяг: Сүхбаатар дүүрэг, 1-р хороо.
Мэдэхгүй зүйлээ зохиохгүй, "Ажилтнаас лавлана уу" гэж хэл."""

history = []

while True:
    question = input("Та: ").strip()
    if question in ("", "гарах"):
        break

    history.append({"role": "user", "content": question})
    response = client.messages.create(
        model="claude-opus-5-5",
        max_tokens=2048,
        system=SYSTEM,
        messages=history,
    )
    history.append({"role": "assistant", "content": response.content})

    answer = "".join(block.text for block in response.content if block.type == "text")
    print("Claude:", answer)
