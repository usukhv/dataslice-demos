# order-bot

Claude API 101, 6-р хичээлийн tool use жишээ.

- `order_bot.py`: `get_order_status` tool-той дэлгүүрийн туслах. Claude tool хүссээр байх хугацаанд функцийг ажиллуулж, `tool_result` буцаана.
- `requirements.txt`, `env.example`, `gitignore.txt`: тохиргооны загвар.

Ажиллуулах:

1. `cp env.example .env`, `mv gitignore.txt .gitignore` (Windows: `copy`, `ren`). `.env` доторх `YOUR_API_KEY`-г өөрийн key-ээр соль.
2. `python3 -m venv .venv`, `source .venv/bin/activate`, `pip install -r requirements.txt`.
3. `python order_bot.py`

Өөрийнхөөрөө солих:

- `ORDERS` толь бичгийг өөрийн жишээ өгөгдлөөр соль.
- 2 дахь tool нэмэх бол `TOOLS`-д шинэ тайлбар нэмээд, давталт дотор `block.name`-ээр аль функцийг дуудахаа салга.
- `messages` доторх асуултыг сольж, tool дуудагдах ба дуудагдахгүй тохиолдлыг турш.
