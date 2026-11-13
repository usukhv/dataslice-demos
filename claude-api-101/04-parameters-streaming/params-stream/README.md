# params-stream

Claude API 101, 4-р хичээлийн 3 скрипт.

- `params.py`: `max_tokens`, `stop_sequences`, `effort`-ийг туршиж, `stop_reason`, `usage`-ийг хэвлэнэ.
- `count.py`: монгол ба англи өгүүлбэрийн token-ыг илгээхээс өмнө тоолно.
- `stream.py`: хариуг бичигдэх тусам хэвлэнэ.
- `requirements.txt`, `env.example`, `gitignore.txt`: тохиргооны загвар.

Ажиллуулах:

1. `cp env.example .env`, `mv gitignore.txt .gitignore` (Windows: `copy`, `ren`). `.env` доторх `YOUR_API_KEY`-г өөрийн key-ээр соль.
2. `python3 -m venv .venv`, `source .venv/bin/activate`, `pip install -r requirements.txt`.
3. `python params.py`, `python count.py`, `python stream.py`

Өөрийнхөөрөө солих: `MODEL`-ийг `claude-opus-5-5`, `claude-sonnet-5-5`, `claude-haiku-5-5`-ийн аль нэгээр соль, `max_tokens`, `stop_sequences`-ийг өөрчилж үр дүнг харьцуул.
