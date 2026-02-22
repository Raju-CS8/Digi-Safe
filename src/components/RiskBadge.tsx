import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

type RiskLevel = "SAFE" | "SUSPICIOUS" | "HIGH";

const config: Record<RiskLevel, { icon: typeof ShieldCheck; label: string; bg: string; glow: string }> = {
  SAFE: {
    icon: ShieldCheck,
    label: "SAFE",
    bg: "bg-safe/20 text-safe border border-safe/30",
    glow: "shadow-[0_0_12px_hsl(145_80%_42%/0.3)]",
  },
  SUSPICIOUS: {
    icon: ShieldAlert,
    label: "SUSPICIOUS",
    bg: "bg-warning/20 text-warning border border-warning/30",
    glow: "shadow-[0_0_12px_hsl(38_92%_50%/0.3)]",
  },
  HIGH: {
    icon: ShieldX,
    label: "HIGH RISK",
    bg: "bg-danger/20 text-danger border border-danger/30",
    glow: "shadow-[0_0_12px_hsl(0_72%_50%/0.3)]",
  },
};

const RiskBadge = ({ level, size = "md" }: { level: RiskLevel; size?: "sm" | "md" | "lg" }) => {
  const { icon: Icon, label, bg, glow } = config[level];
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-3 py-1 text-xs gap-1.5",
    lg: "px-4 py-1.5 text-sm gap-2",
  };

  return (
    <span className={`inline-flex items-center rounded font-heading tracking-wider ${bg} ${glow} ${sizeClasses[size]}`}>
      <Icon className={size === "sm" ? "h-3 w-3" : size === "md" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {label}
    </span>
  );
};

export default RiskBadge;
