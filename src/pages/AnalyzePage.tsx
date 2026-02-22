import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Crosshair, Terminal, AlertCircle } from "lucide-react";
import { analyzeMessage, type AnalysisResponse } from "@/lib/api";
import ResultsDashboard from "@/components/ResultsDashboard";
import ScanningAnimation from "@/components/ScanningAnimation";

const MAX_CHARS = 2000;

const AnalyzePage = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeMessage(message.trim());
      setResult(data);
    } catch (err: any) {
      setError(err.message || "ANALYSIS FAILED — Connection to threat engine lost.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
            <span className="text-[10px] font-heading tracking-[0.3em] text-muted-foreground">
              MODULE :: THREAT SCANNER
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary glow-text mb-1">
            MESSAGE ANALYSIS
          </h1>
          <p className="text-xs text-muted-foreground mb-8 font-mono">
            &gt; Paste intercepted communication for threat assessment_
          </p>

          {/* Input Section */}
          <div className="rounded-lg border border-border bg-card p-5 mb-4 glow-box">
            <div className="flex items-center gap-2 mb-3 text-[10px] text-muted-foreground tracking-wider">
              <Terminal className="h-3 w-3" /> INPUT STREAM
            </div>
            <textarea
              value={message}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS) setMessage(e.target.value);
              }}
              placeholder="// Paste suspicious SMS / WhatsApp message / call transcript here..."
              className="w-full min-h-[160px] resize-y rounded border border-border bg-background p-4 text-sm text-foreground font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:glow-border transition-all"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-[10px] text-muted-foreground font-mono">
                [{message.length}/{MAX_CHARS}] BYTES
              </span>
              <div className="flex gap-2">
                {message && (
                  <button
                    onClick={() => {
                      setMessage("");
                      setResult(null);
                      setError(null);
                    }}
                    className="inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-[10px] font-heading tracking-wider text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                  >
                    <X className="h-3 w-3" /> CLEAR
                  </button>
                )}
                <button
                  onClick={handleAnalyze}
                  disabled={!message.trim() || loading}
                  className="inline-flex items-center gap-2 rounded border border-primary/50 bg-primary/10 px-5 py-1.5 text-[10px] font-heading tracking-wider text-primary hover:bg-primary/20 transition-all glow-border disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  <Crosshair className="h-3 w-3" /> EXECUTE SCAN
                </button>
              </div>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded border border-danger/30 bg-danger/10 p-4 mb-4"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-danger" />
                  <p className="text-xs text-danger font-mono">[ERROR] {error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scanning Animation */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4"
            >
              <ScanningAnimation active={loading} />
            </motion.div>
          )}

          {/* Results */}
          {result && !loading && (
            <ResultsDashboard result={result} originalMessage={message} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyzePage;
