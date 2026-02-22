def run_rule_engine(message: str):
    score = 0
    flags = []

    keywords = ["otp", "urgent", "account", "blocked", "verify", "bank"]

    for word in keywords:
        if word in message.lower():
            score += 1
            flags.append(word)

    return {
        "rule_score": score,
        "flags": flags
    }