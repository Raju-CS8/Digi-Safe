import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ShieldCheck, Wifi, ArrowRight, Lock, Server, Brain, Scan, Crosshair } from "lucide-react";
import MatrixRain from "@/components/MatrixRain";
import RadarPulse from "@/components/RadarPulse";
import TypingText from "@/components/TypingText";

const trustItems = [
  { icon: Lock, label: "ZERO DATA RETENTION", code: "0x00" },
  { icon: Server, label: "OFFLINE-CAPABLE ENGINE", code: "0x01" },
  { icon: Brain, label: "EXPLAINABLE AI CORE", code: "0x02" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <MatrixRain />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

        {/* Scan line overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-px bg-primary/20 animate-scan-line" />
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block h-2 w-2 rounded-full bg-safe animate-pulse-slow" />
                <span className="text-[10px] font-heading tracking-[0.3em] text-muted-foreground">
                  CLASSIFIED // DIGITAL INDIA INITIATIVE
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-heading font-black text-primary glow-text-strong leading-none mb-4">
                CYBER
                <br />
                RAKSHA
              </h1>

              <div className="h-8 mb-6">
                <TypingText
                  text="AI-powered threat detection for Indian citizens"
                  speed={30}
                  className="text-sm text-foreground/70 font-mono"
                />
              </div>

              <p className="text-xs text-muted-foreground mb-8 max-w-md leading-relaxed">
                Advanced scam detection & digital fraud awareness platform. 
                Analyze suspicious SMS, WhatsApp messages, and call transcripts 
                with military-grade AI intelligence.
              </p>

              <Link
                to="/analyze"
                className="group inline-flex items-center gap-3 rounded border border-primary/50 bg-primary/10 px-6 py-3 text-sm font-heading tracking-wider text-primary hover:bg-primary/20 transition-all glow-border"
              >
                <Crosshair className="h-4 w-4" />
                INITIATE SCAN
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <RadarPulse size={320} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trustItems.map(({ icon: Icon, label, code }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="flex items-center gap-4 p-4 rounded border border-border bg-background/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded border border-primary/30 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground font-mono">[{code}]</span>
                  <p className="text-xs font-heading tracking-wider text-foreground">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center gap-2 mb-2">
          <Scan className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-heading tracking-[0.3em] text-muted-foreground">
            OPERATIONAL PROTOCOL
          </span>
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-10 glow-text">
          HOW IT WORKS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {[
            { step: "01", icon: Scan, title: "INTERCEPT", desc: "Paste the suspicious message — SMS, WhatsApp, or call transcript" },
            { step: "02", icon: ShieldCheck, title: "ANALYZE", desc: "AI engine scans for fraud patterns, urgency markers, and impersonation" },
            { step: "03", icon: Wifi, title: "SECURE", desc: "Receive threat assessment with actionable protection steps" },
          ].map(({ step, icon: Icon, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-5 rounded border border-border bg-card hover:glow-border transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-heading font-bold text-primary/30">{step}</span>
                <Icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-heading text-sm tracking-wider text-foreground mb-2">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "10K+", label: "THREATS ANALYZED" },
              { value: "99.2%", label: "DETECTION RATE" },
              { value: "<2s", label: "RESPONSE TIME" },
              { value: "0", label: "DATA STORED" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl md:text-3xl font-heading font-bold text-primary glow-text">{value}</p>
                <p className="text-[10px] text-muted-foreground tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
