import { useEffect, useState } from "react";

const ScanningAnimation = ({ active = true }: { active?: boolean }) => {
  const [lines, setLines] = useState<string[]>([]);

  const logMessages = [
    "INIT :: CyberRaksha Threat Engine v3.1.7",
    "LOAD :: NLP fraud pattern database...",
    "SCAN :: Analyzing lexical patterns...",
    "SCAN :: Cross-referencing known scam templates...",
    "SCAN :: Evaluating urgency indicators...",
    "SCAN :: Checking for impersonation markers...",
    "PROC :: Running sentiment analysis...",
    "PROC :: Calculating threat vector...",
    "PROC :: Generating risk assessment...",
    "DONE :: Analysis complete. Rendering results...",
  ];

  useEffect(() => {
    if (!active) {
      setLines([]);
      return;
    }

    setLines([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < logMessages.length) {
        setLines((prev) => [...prev, logMessages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 350);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="rounded-lg border border-border bg-background/80 p-4 font-mono text-xs overflow-hidden">
      <div className="flex items-center gap-2 mb-3 text-muted-foreground">
        <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
        THREAT ANALYSIS ENGINE
      </div>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1;
          const prefix = line.split(" :: ")[0];
          const rest = line.split(" :: ")[1];
          const prefixColor =
            prefix === "DONE"
              ? "text-safe"
              : prefix === "SCAN"
              ? "text-primary"
              : prefix === "PROC"
              ? "text-accent"
              : "text-muted-foreground";

          return (
            <div key={i} className={`flex gap-2 ${isLast ? "animate-fade-in" : ""}`}>
              <span className="text-muted-foreground/50">{String(i + 1).padStart(2, "0")}</span>
              <span className={prefixColor}>[{prefix}]</span>
              <span className="text-foreground/70">{rest}</span>
              {isLast && (
                <span className="inline-block w-1.5 h-3 bg-primary animate-typing-cursor" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScanningAnimation;
