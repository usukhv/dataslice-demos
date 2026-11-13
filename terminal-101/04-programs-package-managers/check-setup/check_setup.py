import shutil
import subprocess

TOOLS = ["git", "python3", "python", "brew", "winget"]

for tool in TOOLS:
    path = shutil.which(tool)
    if not path:
        print(f"{tool:8} not found")
        continue
    result = subprocess.run([tool, "--version"], capture_output=True, text=True)
    version = (result.stdout or result.stderr).strip().splitlines()
    print(f"{tool:8} {version[0] if version else ''}  ({path})")
