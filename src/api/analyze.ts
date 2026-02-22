export interface AnalysisRequest {
  message: string;
}

/** BACKEND RAW RESPONSE */
interface BackendResponse {
  rule_result?: {
    rule_score?: number;
    flags?: string[];
  };
  nlp_result?: {
    probability?: number;
    phrases?: string[];
  };
  decision?: string;
  explanation?: {
    rules_triggered?: string[];
    nlp_phrases?: string[];
  };
  advice?: string;
}

/** FRONTEND SAFE RESPONSE */
export interface AnalysisResponse {
  risk_level: "SAFE" | "SUSPICIOUS" | "HIGH";
  risk_score: number;
  scam_probability: number;
  highlighted_phrases: string[];
  explanation: string[];
  user_guidance: string[];
}

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function analyzeMessage(
  message: string
): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error("Failed to analyze message");
  }

  const data: BackendResponse = await res.json();

  // 🔥 NORMALIZATION (CRITICAL)
  return {
    risk_level: data.decision?.includes("HIGH")
      ? "HIGH"
      : data.decision?.includes("SUSPICIOUS")
      ? "SUSPICIOUS"
      : "SAFE",

    risk_score: data.rule_result?.rule_score ?? 0,

    scam_probability: Math.round(
      (data.nlp_result?.probability ?? 0) * 100
    ),

    highlighted_phrases: data.rule_result?.flags ?? [],

    explanation: data.explanation?.rules_triggered ?? [],

    user_guidance: data.advice ? [data.advice] : [],
  };
}