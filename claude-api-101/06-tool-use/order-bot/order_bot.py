import json

import anthropic
from dotenv import load_dotenv

load_dotenv()
client = anthropic.Anthropic()

# Жинхэнэ системд энэ мэдээлэл өгөгдлийн сангаас ирнэ.
ORDERS = {
    "A1024": {"status": "хүргэлтэд гарсан", "eta": "өнөөдөр 18:00 хүртэл"},
    "A1025": {"status": "агуулахад савлаж байна", "eta": "маргааш"},
}


def get_order_status(order_id):
    order = ORDERS.get(order_id.strip().upper())
    if order is None:
        return {"error": f"{order_id} дугаартай захиалга олдсонгүй"}
    return order


TOOLS = [
    {
        "name": "get_order_status",
        "description": "Захиалгын дугаараар захиалгын төлөв, хүргэлтийн хугацааг шалгана. "
        "Хэрэглэгч захиалгынхаа талаар асуувал ашигла.",
        "input_schema": {
            "type": "object",
            "properties": {
                "order_id": {"type": "string", "description": "Захиалгын дугаар, жишээ нь A1024"}
            },
            "required": ["order_id"],
        },
    }
]

SYSTEM = "Чи онлайн дэлгүүрийн туслах. Монголоор, 2 өгүүлбэрээр хариул. Захиалгын мэдээллийг зөвхөн tool-оос ав."


def ask(messages):
    return client.messages.create(
        model="claude-opus-5-5",
        max_tokens=4096,
        system=SYSTEM,
        tools=TOOLS,
        messages=messages,
    )


messages = [{"role": "user", "content": "Сайн байна уу, A1024 захиалга маань хэзээ ирэх вэ?"}]
response = ask(messages)

while response.stop_reason == "tool_use":
    messages.append({"role": "assistant", "content": response.content})

    results = []
    for block in response.content:
        if block.type == "tool_use":
            print(f"[tool] {block.name} {block.input}")
            output = get_order_status(**block.input)
            results.append(
                {
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": json.dumps(output, ensure_ascii=False),
                    "is_error": "error" in output,
                }
            )

    messages.append({"role": "user", "content": results})
    response = ask(messages)

print("".join(block.text for block in response.content if block.type == "text"))
