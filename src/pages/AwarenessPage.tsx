import { motion } from "framer-motion";
import {
  BookOpen,
  CreditCard,
  Truck,
  Briefcase,
  Key,
  Building2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Trophy,
} from "lucide-react";

const scamTypes = [
  { icon: CreditCard, title: "KYC SCAMS", code: "THR-001", desc: "Fraudsters impersonate banks asking to update KYC via fake links or calls." },
  { icon: Building2, title: "BANK IMPERSONATION", code: "THR-002", desc: "Fake messages from SBI, HDFC, etc., requesting card details or OTP." },
  { icon: Truck, title: "COURIER SCAMS", code: "THR-003", desc: "Fake delivery alerts requesting fees or address verification via phishing." },
  { icon: Briefcase, title: "JOB SCAMS", code: "THR-004", desc: "High-paying job offers requiring upfront payments or personal data." },
  { icon: Key, title: "OTP FRAUD", code: "THR-005", desc: "Callers trick victims into sharing OTP pretending to be support agents." },
  { icon: Trophy, title: "LOTTERY SCAMS", code: "THR-006", desc: "Messages claiming prize wins requiring processing fee payments." },
];

const dos = [
  "Verify via official bank apps or helplines",
  "Report to cybercrime.gov.in immediately",
  "Keep devices and apps updated",
  "Enable two-factor authentication",
  "Cross-check sender identity",
];

const donts = [
  "Never share OTP with anyone",
  "Do not click unknown or shortened links",
  "Avoid apps from unofficial sources",
  "Never transfer money to unknown accounts",
  "Do not respond to urgent/threatening messages",
];

const AwarenessPage = () => {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block h-2 w-2 rounded-full bg-warning animate-pulse-slow" />
            <span className="text-[10px] font-heading tracking-[0.3em] text-muted-foreground">
              MODULE :: THREAT DATABASE
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary glow-text mb-1">
            THREAT INTELLIGENCE
          </h1>
          <p className="text-xs text-muted-foreground mb-10 font-mono">
            &gt; Known attack vectors and countermeasures_
          </p>

          {/* Scam Types */}
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-[10px] font-heading tracking-[0.2em] text-warning">
              CLASSIFIED THREAT PATTERNS
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-14">
            {scamTypes.map(({ icon: Icon, title, code, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded border border-border bg-card p-4 hover:glow-border transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded border border-primary/20 bg-primary/5">
                    <Icon className="h-4 w-4 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <span className="text-[9px] text-muted-foreground font-mono">{code}</span>
                </div>
                <h3 className="font-heading text-xs tracking-wider text-foreground mb-1">{title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded border border-safe/30 bg-safe/5 p-5">
              <h3 className="font-heading text-xs tracking-wider text-safe mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> DEFENSIVE PROTOCOLS
              </h3>
              <ul className="space-y-2.5">
                {dos.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11px] text-foreground/80">
                    <CheckCircle2 className="h-3.5 w-3.5 text-safe mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded border border-danger/30 bg-danger/5 p-5">
              <h3 className="font-heading text-xs tracking-wider text-danger mb-4 flex items-center gap-2">
                <XCircle className="h-4 w-4" /> THREAT AMPLIFIERS
              </h3>
              <ul className="space-y-2.5">
                {donts.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11px] text-foreground/80">
                    <XCircle className="h-3.5 w-3.5 text-danger mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AwarenessPage;
