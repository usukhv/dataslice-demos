# first-call

Claude API 101, 2-р хичээлийн анхны хүсэлтийн скриптүүд.

- `hello.py`: Claude руу нэг асуулт илгээж, хариуны текстийг хэвлэнэ.
- `inspect_response.py`: response-ийн id, model, stop_reason, block-ууд, usage-ийг хэвлэнэ.
- `requirements.txt`: `anthropic`, `python-dotenv`.
- `env.example`, `gitignore.txt`: тохиргооны загвар.

Ажиллуулах:

1. `cp env.example .env`, `mv gitignore.txt .gitignore` (Windows: `copy`, `ren`).
2. `.env` доторх `YOUR_API_KEY`-г Console-оос авсан өөрийн key-ээр соль.
3. `python3 -m venv .venv`, `source .venv/bin/activate`, `pip install -r requirements.txt`.
4. `python hello.py`

`.env` файлыг хэзээ ч Git-д commit хийж, бусадтай хуваалцаж болохгүй.
