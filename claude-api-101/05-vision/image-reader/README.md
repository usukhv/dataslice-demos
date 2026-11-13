# image-reader

Claude API 101, 5-р хичээлийн зураг уншигч.

- `vision.py`: зургийг base64 болгож, асуулттай хамт Claude руу илгээнэ. JPEG, PNG, WebP, GIF дэмжинэ.
- `requirements.txt`, `env.example`, `gitignore.txt`: тохиргооны загвар.

Ажиллуулах:

1. `cp env.example .env`, `mv gitignore.txt .gitignore` (Windows: `copy`, `ren`). `.env` доторх `YOUR_API_KEY`-г өөрийн key-ээр соль.
2. `python3 -m venv .venv`, `source .venv/bin/activate`, `pip install -r requirements.txt`.
3. Зарын хуудасны зургаа хавтсанд `notice.jpg` нэрээр хуулаад `python vision.py notice.jpg`

Өөрийнхөөрөө солих: `"text"` доторх асуултыг зурагныхаа төрөлд тааруул (цэс, хуваарь, шошго). Хувийн мэдээлэлтэй зураг бүү илгээ.
