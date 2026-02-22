def generate_explanation(rule_result, nlp_result, decision):
    return {
        "decision": decision,
        "why": {
            "rules_triggered": rule_result["flags"],
            "nlp_phrases": nlp_result["phrases"]
        },
        "advice": "Do not click links or share OTPs if risk is medium or high."
    }