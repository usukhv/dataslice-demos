"""Харилцагчийн мессежүүдийг ангилж, товчилж, хариуны санал бичнэ.

Ажиллуулах:  python summarize.py messages.txt
Үр дүн:      дэлгэцэнд товч жагсаалт, report.md файлд дэлгэрэнгүй тайлан
"""
import json
import sys
from pathlib import Path

import anthropic
from dotenv import load_dotenv

load_dotenv()
client = anthropic.Anthropic(max_retries=3)

MODEL = "claude-opus-5-5"

SYSTEM = """Чи "Наран хүнс" хүнсний хүргэлтийн компанийн харилцагчийн үйлчилгээний ахлах ажилтан.
Харилцагчийн мессеж бүрийг ангилж, нэг өгүүлбэрээр товчилж, ажилтанд хариуны санал бичнэ.

Дүрэм:
- Монголоор, эелдэг бич. Хариуны санал 3 өгүүлбэрээс ихгүй.
- Мессежид байхгүй хугацаа, нөхөн олговор бүү амла, учир нь ажилтан хариуг шууд илгээж магадгүй.
- Утасны дугаар, гэрийн хаягийг товчлолд бүү оруул.
- Эрүүл мэнд, аюулгүй байдал, давхар төлбөрийн асуудал бол яаралтай гэж тэмдэглэ."""

SCHEMA = {
    "type": "object",
    "properties": {
        "category": {"type": "string", "enum": ["хүргэлт", "чанар", "төлбөр", "санал", "бусад"]},
        "urgent": {"type": "boolean"},
        "summary": {"type": "string"},
        "reply": {"type": "string"},
    },
    "required": ["category", "urgent", "summary", "reply"],
    "additionalProperties": False,
}


def analyze(message):
    response = client.messages.create(
        model=MODEL,
        max_tokens=2048,
        system=SYSTEM,
        output_config={
            "effort": "low",
            "format": {"type": "json_schema", "schema": SCHEMA},
        },
        messages=[{"role": "user", "content": f"<message>\n{message}\n</message>"}],
    )
    if response.stop_reason == "refusal":
        raise ValueError("Claude энэ мессежийг боловсруулахаас татгалзлаа")
    if response.stop_reason == "max_tokens":
        raise ValueError("хариу max_tokens-д хүрч тасарлаа")
    text = next(block.text for block in response.content if block.type == "text")
    return json.loads(text), response.usage


def main():
    if len(sys.argv) != 2:
        print("Ашиглах: python summarize.py messages.txt")
        sys.exit(1)

    raw = Path(sys.argv[1]).read_text(encoding="utf-8")
    messages = [m.strip() for m in raw.split("\n\n") if m.strip()]

    results = []
    input_tokens = output_tokens = 0
    for i, message in enumerate(messages, start=1):
        try:
            data, usage = analyze(message)
        except (anthropic.APIError, ValueError) as e:
            print(f"[{i}/{len(messages)}] алгаслаа: {e}")
            continue
        input_tokens += usage.input_tokens
        output_tokens += usage.output_tokens
        results.append({"n": i, **data})
        flag = "ЯАРАЛТАЙ" if data["urgent"] else "энгийн"
        print(f"[{i}/{len(messages)}] {flag} · {data['category']}: {data['summary']}")

    results.sort(key=lambda r: not r["urgent"])
    lines = ["# Харилцагчийн мессежийн тайлан", ""]
    for r in results:
        flag = "Яаралтай" if r["urgent"] else "Энгийн"
        lines += [
            f"## {r['n']}. {r['category']} ({flag})",
            "",
            f"Товч: {r['summary']}",
            "",
            f"Хариуны санал: {r['reply']}",
            "",
        ]
    Path("report.md").write_text("\n".join(lines), encoding="utf-8")

    print()
    print(f"{len(results)} мессеж боловсруулж, report.md-д хадгаллаа.")
    print(f"Нийт token: input {input_tokens}, output {output_tokens}")


if __name__ == "__main__":
    main()
