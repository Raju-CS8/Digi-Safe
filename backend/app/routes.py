from fastapi import APIRouter
from services.rule_engine import run_rule_engine
from services.nlp_engine import run_nlp_engine
from services.decision_engine import make_final_decision
from services.explainability import generate_explanation
from services.history_logger import log_history

router = APIRouter()

@router.post("/analyze")
def analyze_message(payload: dict):
    message = payload.get("message", "")

    rule_result = run_rule_engine(message)
    nlp_result = run_nlp_engine(message)
    decision = make_final_decision(rule_result, nlp_result)
    explanation = generate_explanation(rule_result, nlp_result, decision)

    log_history(message, decision)

    return {
        "message": message,
        "rule_result": rule_result,
        "nlp_result": nlp_result,
        "decision": decision,
        "explanation": explanation
    }