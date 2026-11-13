# inbox-summary

Claude API 101, төгсгөлийн төсөл: харилцагчийн мессежийг ангилж, товчилж, хариуны санал бичдэг terminal скрипт.

- `summarize.py`: `messages.txt`-ийг уншиж, мессеж бүрийг Claude-аар JSON бүтэцтэй боловсруулж, `report.md` бичнэ.
- `messages.txt`: хоосон мөрөөр тусгаарласан 8 зохиомол мессеж.
- `requirements.txt`, `env.example`, `gitignore.txt`: тохиргооны загвар.

Ажиллуулах:

1. `cp env.example .env`, `mv gitignore.txt .gitignore`, `.env`-д өөрийн key-г тавь.
2. `python3 -m venv .venv`, `source .venv/bin/activate`, `pip install -r requirements.txt`.
3. `python summarize.py messages.txt`

Өөрийнхөөрөө солих: `SYSTEM` доторх компанийн нэр, дүрэм; `SCHEMA` доторх ангиллын жагсаалт; `messages.txt`-ийн мессежүүд.
Бодит мессежээс нэр, утас, хаягийг хасаж ашигла.
