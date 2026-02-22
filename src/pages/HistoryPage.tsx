import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Database, Eye } from "lucide-react";
import RiskBadge from "@/components/RiskBadge";
import type { AnalysisResponse } from "@/lib/api";
import ResultsDashboard from "@/components/ResultsDashboard";

interface HistoryItem {
  id: string;
  date: string;
  message: string;
  result: AnalysisResponse;
}

const HistoryPage = () => {
  const [history] = useState<HistoryItem[]>([]);
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  if (selected) {
    return (
      <div className="min-h-screen bg-background cyber-grid">
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <button
            onClick={() => setSelected(null)}
            className="mb-6 text-[10px] font-heading tracking-wider text-primary hover:text-accent transition-colors"
          >
            ← BACK TO INTEL LOG
          </button>
          <ResultsDashboard result={selected.result} originalMessage={selected.message} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
            <span className="text-[10px] font-heading tracking-[0.3em] text-muted-foreground">
              MODULE :: INTELLIGENCE LOG
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary glow-text mb-1">
            ANALYSIS HISTORY
          </h1>
          <p className="text-xs text-muted-foreground mb-8 font-mono">
            &gt; Previous threat assessments and scan records_
          </p>

          {history.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="relative mb-6">
                <Database className="h-16 w-16 text-muted-foreground/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary/50 animate-pulse-slow" />
                </div>
              </div>
              <p className="text-xs font-heading tracking-wider text-muted-foreground mb-2">
                NO RECORDS FOUND
              </p>
              <p className="text-[10px] text-muted-foreground/60 font-mono max-w-sm">
                // Intel log awaiting backend connection. Scan records will populate once the threat engine API is linked.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="w-full text-left rounded border border-border bg-card p-4 hover:glow-border transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-muted-foreground font-mono">{item.date}</span>
                    <RiskBadge level={item.result.risk_level} size="sm" />
                  </div>
                  <p className="text-xs text-foreground/70 font-mono line-clamp-2">{item.message}</p>
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HistoryPage;
