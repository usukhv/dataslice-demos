# chat-bot

Claude API 101, 3-р хичээлийн terminal чат бот.

- `chat.py`: system prompt-той, ярианы түүхийг `messages`-д хадгалдаг чат. `гарах` гэж бичвэл дуусна.
- `requirements.txt`, `env.example`, `gitignore.txt`: тохиргооны загвар.

Ажиллуулах:

1. `cp env.example .env`, `mv gitignore.txt .gitignore` (Windows: `copy`, `ren`). `.env` доторх `YOUR_API_KEY`-г өөрийн key-ээр соль.
2. `python3 -m venv .venv`, `source .venv/bin/activate`, `pip install -r requirements.txt`.
3. `python chat.py`

Өөрийнхөөрөө солих: `SYSTEM` доторх дэлгүүрийн нэр, цаг, хаяг, дүрмийг өөрийн байгууллагын мэдээллээр соль.
