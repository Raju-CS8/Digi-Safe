import { motion } from "framer-motion";
import { Shield, Lock, Brain, Server, Fingerprint, Eye } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
            <span className="text-[10px] font-heading tracking-[0.3em] text-muted-foreground">
              MODULE :: ABOUT
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary glow-text mb-1">
            ABOUT CYBERRAKSHA
          </h1>
          <p className="text-xs text-muted-foreground mb-10 font-mono">
            &gt; Mission briefing and operational parameters_
          </p>

          {/* Mission */}
          <div className="rounded border border-border bg-card p-5 mb-4 glow-box">
            <div className="flex items-center gap-2 text-[10px] font-heading tracking-wider text-accent mb-3">
              <Fingerprint className="h-3 w-3" /> MISSION BRIEF
            </div>
            <p className="text-xs text-foreground/70 leading-relaxed font-mono">
              CyberRaksha is an AI-powered digital fraud awareness and detection platform 
              designed for Indian citizens. With the explosive growth of UPI, digital banking, 
              and online services, cyber threats have multiplied exponentially. Our mission: 
              equip every citizen with intelligence-grade tools to identify, assess, and 
              neutralize digital fraud threats — regardless of technical expertise.
            </p>
          </div>

          {/* Core Principles */}
          <div className="space-y-3 mb-10">
            {[
              {
                icon: Lock,
                code: "PROTO-001",
                title: "ZERO DATA RETENTION",
                desc: "All messages are analyzed in real-time memory and immediately purged. No logs, no storage, no traces.",
              },
              {
                icon: Brain,
                code: "PROTO-002",
                title: "EXPLAINABLE AI",
                desc: "Every threat assessment comes with human-readable reasoning. No black boxes — full transparency.",
              },
              {
                icon: Server,
                code: "PROTO-003",
                title: "OFFLINE ARCHITECTURE",
                desc: "Designed for low-connectivity environments. Works across urban metros and rural India alike.",
              },
              {
                icon: Eye,
                code: "PROTO-004",
                title: "CITIZEN FIRST",
                desc: "Built for non-technical users. Simple interface, clear language, actionable guidance.",
              },
            ].map(({ icon: Icon, code, title, desc }) => (
              <div key={code} className="flex gap-4 p-4 rounded border border-border bg-card hover:glow-border transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded border border-primary/30 bg-primary/10 shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] text-muted-foreground font-mono">[{code}]</span>
                    <h3 className="font-heading text-xs tracking-wider text-foreground">{title}</h3>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Aligned With */}
          <div className="rounded border border-accent/30 bg-accent/5 p-5">
            <div className="flex items-center gap-2 text-[10px] font-heading tracking-wider text-accent mb-4">
              <Shield className="h-3 w-3" /> ALLIED INITIATIVES
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Digital India", "CERT-In", "Cyber Surakshit Bharat", "cybercrime.gov.in"].map(
                (name) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 rounded border border-border bg-background px-3 py-2.5"
                  >
                    <Shield className="h-3 w-3 text-accent shrink-0" />
                    <span className="text-[10px] font-heading tracking-wider text-foreground">{name.toUpperCase()}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
