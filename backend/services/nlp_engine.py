def run_nlp_engine(message: str):
    suspicious_phrases = [
        "you have won",
        "click the link",
        "verify immediately",
        "legal action"
    ]

    hits = [p for p in suspicious_phrases if p in message.lower()]
    probability = min(len(hits) * 0.25, 1.0)

    return {
        "probability": probability,
        "phrases": hits
    }