def make_final_decision(rule_result, nlp_result):
    total_score = rule_result["rule_score"] + (nlp_result["probability"] * 4)

    if total_score >= 4:
        return "HIGH RISK"
    elif total_score >= 2:
        return "MEDIUM RISK"
    else:
        return "LOW RISK"