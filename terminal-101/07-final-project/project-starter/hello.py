import os
from datetime import date
from pathlib import Path

# .env байвал НЭР=утга мөрүүдийг уншина
env = Path(".env")
if env.exists():
    for line in env.read_text(encoding="utf-8-sig").splitlines():
        if "=" in line and not line.startswith("#"):
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())

name = os.environ.get("STUDENT_NAME", "найз")
print(f"Сайн уу, {name}!")
print("Өнөөдөр:", date.today())
print("Хавтсанд:", ", ".join(sorted(os.listdir("."))))
