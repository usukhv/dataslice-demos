# project-setup

Claude API 101, 1-р хичээлийн төслийн хавтасны загвар.

- `env.example`: `.env` файлын загвар. Нэг мөр: `ANTHROPIC_API_KEY=YOUR_API_KEY`.
- `gitignore.txt`: `.gitignore`-ийн загвар, `.env` ба `.venv/`-ийг Git-ээс нууна.
- `requirements.txt`: дараагийн хичээлд суулгах сангууд.

Сервер цэгээр эхэлсэн файлыг zip-д оруулдаггүй тул нэрийг нь ингэж өгсөн. Хавтсандаа:

1. `cp env.example .env`, `mv gitignore.txt .gitignore` (Windows: `copy`, `ren`). `.env` доторх `YOUR_API_KEY`-г өөрийн key-ээр соль.
2. `python3 -m venv .venv`, `source .venv/bin/activate`, `pip install -r requirements.txt`.

Key-г зөвхөн `.env`-д бич. Кодонд, чатад, GitHub-д хэзээ ч бүү тавь.
