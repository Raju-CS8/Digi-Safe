import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Terminal,
  Target,
} from "lucide-react";
import type { AnalysisResponse } from "@/lib/api";
import RiskBadge from "./RiskBadge";

interface Props {
  result: AnalysisResponse;
  originalMessage: string;
}

const ResultsDashboard = ({ result, originalMessage }: Props) => {
  // ✅ SAFE NORMALIZATION (CRITICAL)
  const highlightedPhrases = result.highlighted_phrases ?? [];
  const explanation = result.explanation ?? [];
  const guidance = result.user_guidance ?? [];

  const highlightMessage = () => {
    if (highlightedPhrases.length === 0) {
      return (
        <p className="text-foreground/80 leading-relaxed">
          {originalMessage}
        </p>
      );
    }

    const lowerMsg = originalMessage.toLowerCase();
    const sortedPhrases = [...highlightedPhrases].sort(
      (a, b) =>
        lowerMsg.indexOf(a.toLowerCase()) -
        lowerMsg.indexOf(b.toLowerCase())
    );

    let lastIndex = 0;
    const elements: JSX.Element[] = [];

    sortedPhrases.forEach((phrase, i) => {
      const idx = lowerMsg.indexOf(phrase.toLowerCase(), lastIndex);
      if (idx === -1) return;

      if (idx > lastIndex) {
        elements.push(
          <span key={`t-${i}`}>
            {originalMessage.slice(lastIndex, idx)}
          </span>
        );
      }

      elements.push(
        <mark
          key={`h-${i}`}
          className="bg-danger/20 text-danger border-b border-danger/50 px-0.5 rounded-sm cursor-help"
          title={`⚠ FLAGGED: "${phrase}"`}
        >
          {originalMessage.slice(idx, idx + phrase.length)}
        </mark>
      );

      lastIndex = idx + phrase.length;
    });

    if (lastIndex < originalMessage.length) {
      elements.push(
        <span key="end">{originalMessage.slice(lastIndex)}</span>
      );
    }

    return (
      <p className="text-foreground/80 leading-relaxed">{elements}</p>
    );
  };

  const riskBorderColor =
    result.risk_level === "SAFE"
      ? "border-safe/40"
      : result.risk_level === "SUSPICIOUS"
      ? "border-warning/40"
      : "border-danger/40";

  const scoreBarColor =
    result.risk_level === "SAFE"
      ? "bg-safe"
      : result.risk_level === "SUSPICIOUS"
      ? "bg-warning"
      : "bg-danger";

  const scoreBarGlow =
    result.risk_level === "SAFE"
      ? "shadow-[0_0_10px_hsl(145_80%_42%/0.5)]"
      : result.risk_level === "SUSPICIOUS"
      ? "shadow-[0_0_10px_hsl(38_92%_50%/0.5)]"
      : "shadow-[0_0_10px_hsl(0_72%_50%/0.5)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Risk Summary */}
      <div className={`rounded-lg border ${riskBorderColor} bg-card p-5 glow-box`}>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground tracking-wider mb-4">
          <Target className="h-3 w-3" /> THREAT ASSESSMENT REPORT
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <RiskBadge level={result.risk_level} size="lg" />

          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-3xl font-heading font-bold glow-text">
                {result.risk_score}
              </p>
              <p className="text-[10px] text-muted-foreground tracking-wider">
                RISK SCORE
              </p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-heading font-bold glow-text">
                {result.scam_probability}%
              </p>
              <p className="text-[10px] text-muted-foreground tracking-wider">
                SCAM PROB
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.risk_score}%` }}
              transition={{ duration: 1 }}
              className={`h-full rounded-full ${scoreBarColor} ${scoreBarGlow}`}
            />
          </div>
        </div>
      </div>

      {/* Intercepted Message */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="flex items-center gap-2 text-[10px] tracking-wider text-muted-foreground mb-3">
          <Terminal className="h-3 w-3" /> INTERCEPTED MESSAGE
        </h3>

        <div className="bg-background rounded-md p-4 font-mono text-sm border border-border">
          {highlightMessage()}
        </div>

        {highlightedPhrases.length > 0 && (
          <p className="mt-2 text-[10px] text-danger/80 tracking-wider">
            ■ RED MARKERS INDICATE FLAGGED PHRASES
          </p>
        )}
      </div>

      {/* Threat Analysis */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="flex items-center gap-2 text-[10px] tracking-wider text-warning mb-3">
          <AlertTriangle className="h-3 w-3" /> THREAT ANALYSIS
        </h3>

        <ul className="space-y-2">
          {explanation.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2 text-sm text-foreground/80"
            >
              <ShieldAlert className="h-4 w-4 text-accent mt-0.5" />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Operational Guidance */}
      <div className="rounded-lg border border-safe/30 bg-safe/5 p-5">
        <h3 className="flex items-center gap-2 text-[10px] tracking-wider text-safe mb-3">
          <CheckCircle2 className="h-3 w-3" /> OPERATIONAL GUIDANCE
        </h3>

        <ul className="space-y-2">
          {guidance.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-foreground/80"
            >
              <ArrowRight className="h-4 w-4 text-safe mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ResultsDashboard;