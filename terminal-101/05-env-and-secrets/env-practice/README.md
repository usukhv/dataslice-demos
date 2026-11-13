# .env дадлага

- `env.example`: нэрийг `.env.example` болгож соль. Хуулаад `.env` үүсгэж утгаа бич.
- `gitignore`: нэрийг `.gitignore` болгож соль. `.env`-ийг Git-ээс хасна.
- `check_env.py`: `STUDENT_NAME`, `DEMO_API_KEY` тохируулагдсан эсэхийг шалгана. Нууц утгыг бүтнээр нь хэвлэхгүй.

Ашиглах: terminal-д `$env:` (Windows) эсвэл `export` (Mac)-аар утга тохируулаад `python3 check_env.py` (Windows: `python check_env.py`).
`DEMO_API_KEY`-д жинхэнэ түлхүүр бүү тавь, `test-123` гэх мэт дурын текст хангалттай.
