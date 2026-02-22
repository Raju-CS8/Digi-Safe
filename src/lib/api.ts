// src/lib/api.ts

export interface AnalysisRequest {
  message: string;
}

export interface AnalysisResponse {
  risk_level: "SAFE" | "SUSPICIOUS" | "HIGH";
  risk_score: number;
  scam_probability: number;
  highlighted_phrases: string[];
  explanation: string[];
  user_guidance: string[];
}

/**
 * DIRECT backend URL
 * (No proxy, no /api, avoids CORS & fetch failures)
 */
const API_BASE = "http://127.0.0.1:8000";

export async function analyzeMessage(
  message: string
): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message } as AnalysisRequest),
  });

  if (!res.ok) {
    throw new Error(`Analysis failed: ${res.status} ${res.statusText}`);
  }

  const raw = await res.json();

  /**
   * 🔥 BACKEND → FRONTEND ADAPTER
   * Converts FastAPI response into UI-safe format
   */
  return {
    risk_level: raw.decision?.includes("HIGH")
      ? "HIGH"
      : raw.decision?.includes("MEDIUM")
      ? "SUSPICIOUS"
      : "SAFE",

    risk_score: raw.rule_result?.rule_score ?? 0,

    scam_probability: (raw.rule_result?.rule_score ?? 0) * 20,

    highlighted_phrases: raw.rule_result?.flags ?? [],

    explanation: raw.explanation?.why?.rules_triggered
      ? raw.explanation.why.rules_triggered.map(
          (flag: string) => `Suspicious keyword detected: "${flag}"`
        )
      : [],

    user_guidance: raw.explanation?.advice
      ? [raw.explanation.advice]
      : ["Do not click unknown links or share OTPs."],
  };
}