# error-handling

Claude API 101, 7-р хичээлийн алдаа барих жишээ.

- `errors.py`: `AuthenticationError`, `NotFoundError`, `RateLimitError`, `BadRequestError`, `APIConnectionError`, `APIStatusError`-ийг барьж ойлгомжтой мессеж хэвлэнэ. `stop_reason`-ийг шалгана.
- `requirements.txt`, `env.example`, `gitignore.txt`: тохиргооны загвар.

Ажиллуулах:

1. `cp env.example .env`, `mv gitignore.txt .gitignore` (Windows: `copy`, `ren`). `.env` доторх `YOUR_API_KEY`-г өөрийн key-ээр соль.
2. `python3 -m venv .venv`, `source .venv/bin/activate`, `pip install -r requirements.txt`.
3. `python errors.py` (зөв), `python errors.py claude-opus-5.5` (буруу загвар), `ANTHROPIC_API_KEY=sk-ant-wrong python errors.py` (буруу key, macOS/Linux).

Өөрийнхөөрөө солих: `except` хэсгийн мессежүүдийг өөрийн скриптэд хуулж ашигла.
