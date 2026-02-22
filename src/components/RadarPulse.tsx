import { motion } from "framer-motion";

const RadarPulse = ({ size = 200, className = "" }: { size?: number; className?: string }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Circles */}
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <div
          key={scale}
          className="absolute inset-0 rounded-full border border-primary/20"
          style={{
            width: size * scale,
            height: size * scale,
            top: (size - size * scale) / 2,
            left: (size - size * scale) / 2,
          }}
        />
      ))}

      {/* Cross lines */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-primary/10" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-primary/10" />

      {/* Sweep line */}
      <motion.div
        className="absolute top-1/2 left-1/2 origin-bottom-left"
        style={{
          width: size / 2,
          height: 2,
          marginTop: -1,
          background: "linear-gradient(90deg, hsl(160 100% 40% / 0.8), transparent)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Center dot */}
      <div
        className="absolute rounded-full bg-primary glow-text"
        style={{
          width: 6,
          height: 6,
          top: size / 2 - 3,
          left: size / 2 - 3,
          boxShadow: "0 0 10px hsl(160 100% 50% / 0.8)",
        }}
      />

      {/* Random blips */}
      {[
        { x: 30, y: 25, delay: 0 },
        { x: 70, y: 40, delay: 1 },
        { x: 55, y: 70, delay: 2 },
      ].map(({ x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent"
          style={{
            width: 4,
            height: 4,
            left: `${x}%`,
            top: `${y}%`,
            boxShadow: "0 0 6px hsl(30 90% 52% / 0.8)",
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay }}
        />
      ))}
    </div>
  );
};

export default RadarPulse;
