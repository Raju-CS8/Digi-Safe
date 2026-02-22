import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { path: "/", label: "HOME" },
  { path: "/analyze", label: "ANALYZE" },
  { path: "/history", label: "INTEL LOG" },
  { path: "/awareness", label: "THREAT DB" },
  { path: "/about", label: "ABOUT" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Shield className="h-7 w-7 text-primary" />
            <div className="absolute inset-0 h-7 w-7 text-primary blur-sm opacity-50">
              <Shield className="h-7 w-7" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-heading font-bold text-primary glow-text tracking-wider">
              CYBERRAKSHA
            </span>
            <span className="text-[9px] text-muted-foreground tracking-[0.2em]">
              THREAT DETECTION UNIT
            </span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 text-xs font-heading tracking-wider transition-all duration-200 border ${
                location.pathname === item.path
                  ? "border-primary/50 bg-primary/10 text-primary glow-border"
                  : "border-transparent text-muted-foreground hover:text-primary hover:border-primary/20"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-3 flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-safe animate-pulse-slow" />
            SYSTEM ONLINE
          </div>
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="flex flex-col p-3 gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 text-xs font-heading tracking-wider border-l-2 transition-all ${
                    location.pathname === item.path
                      ? "border-l-primary bg-primary/10 text-primary"
                      : "border-l-transparent text-muted-foreground hover:text-primary hover:border-l-primary/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
