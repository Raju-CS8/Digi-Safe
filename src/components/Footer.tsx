import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="font-heading text-xs tracking-wider text-primary">CYBERRAKSHA</span>
        </div>
        <p className="text-[10px] text-muted-foreground tracking-wider text-center">
          DIGITAL INDIA • CERT-IN ALIGNED • CLASSIFIED OPERATIONS INTERFACE
        </p>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-safe" />
          ALL SYSTEMS NOMINAL
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
