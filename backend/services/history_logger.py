import json
from datetime import datetime

FILE_PATH = "data/history.json"

def log_history(message, decision):
    entry = {
        "message": message,
        "decision": decision,
        "time": datetime.now().isoformat()
    }

    try:
        with open(FILE_PATH, "r") as f:
            data = json.load(f)
    except:
        data = []

    data.append(entry)

    with open(FILE_PATH, "w") as f:
        json.dump(data, f, indent=2)