import os

for name in ["STUDENT_NAME", "DEMO_API_KEY"]:
    value = os.environ.get(name)
    if not value:
        print(f"{name}: тохируулаагүй")
    elif "KEY" in name:
        print(f"{name}: тохируулсан ({value[:2]}***)")
    else:
        print(f"{name}: {value}")
