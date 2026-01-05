import Link from "next/link";
import { Home, Briefcase, BookOpen, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      {/* Glitch effect title */}
      <div className="relative mb-8">
        <h1 className="text-8xl font-bold text-foreground tracking-tighter animate-fade-in">
          4<span className="text-accent">0</span>4
        </h1>
        <div className="absolute inset-0 text-8xl font-bold tracking-tighter text-accent/20 blur-sm animate-pulse">
          404
        </div>
      </div>

      {/* Terminal-style error */}
      <div className="surface max-w-2xl w-full mb-8 text-left font-mono text-sm overflow-hidden animate-fade-in-delay">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-danger" />
            <div className="w-3 h-3 rounded-full bg-warning" />
            <div className="w-3 h-3 rounded-full bg-success" />
          </div>
          <span className="ml-2 text-xs text-mutedForeground">root@security-ops:~</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-danger flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
              ERROR
            </span>
          </div>
        </div>
        
        {/* Terminal content */}
        <div className="p-4 space-y-2 text-mutedForeground">
          <p className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-success">┌──(</span>
            <span className="text-accent">root㉿kali</span>
            <span className="text-success">)-[</span>
            <span className="text-foreground">~</span>
            <span className="text-success">]</span>
          </p>
          <p className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="text-success">└─</span>
            <span className="text-accent">$</span> curl -I https://site.com/requested-page
          </p>
          <p className="animate-fade-in text-danger" style={{ animationDelay: "0.4s" }}>
            HTTP/2 404 Not Found
          </p>
          <p className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <span className="text-mutedForeground">server: nginx</span>
          </p>
          <p className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <span className="text-mutedForeground">x-content-type-options: nosniff</span>
          </p>
          <p className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <span className="text-mutedForeground">x-frame-options: DENY</span>
          </p>
          <p className="mt-4 animate-fade-in" style={{ animationDelay: "0.9s" }}>
            <span className="text-success">└─</span>
            <span className="text-accent">$</span> nmap -p 404 localhost
          </p>
          <p className="animate-fade-in text-warning" style={{ animationDelay: "1.1s" }}>
            PORT    STATE  SERVICE
          </p>
          <p className="animate-fade-in" style={{ animationDelay: "1.2s" }}>
            404/tcp <span className="text-danger">closed</span> unknown
          </p>
          <p className="mt-4 animate-fade-in" style={{ animationDelay: "1.4s" }}>
            <span className="text-success">└─</span>
            <span className="text-accent">$</span> <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
          </p>
        </div>
      </div>

      {/* Cybersecurity Message */}
      <div className="space-y-4 max-w-xl animate-fade-in-delay-2">
        <h2 className="text-xl font-semibold text-foreground">Access Denied</h2>
        <p className="text-mutedForeground">
          The requested resource could not be located. This could be due to:
        </p>
        <ul className="text-sm text-mutedForeground space-y-2 text-left inline-block">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Page has been moved or archived
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            URL was mistyped or is malformed
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Resource requires authentication
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Content is behind a firewall
          </li>
        </ul>
      </div>

      {/* Quick Navigation */}
      <div className="mt-10 animate-fade-in-delay-3">
        <p className="text-xs text-mutedForeground uppercase tracking-wider mb-4">Quick Navigation</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="action-primary glow-border">
            <Home className="w-4 h-4" />
            Return Home
          </Link>
          <Link href="/portfolio" className="action">
            <Briefcase className="w-4 h-4" />
            Portfolio
          </Link>
          <Link href="/blog" className="action">
            <BookOpen className="w-4 h-4" />
            Blog
          </Link>
          <Link href="/contact" className="action">
            <Mail className="w-4 h-4" />
            Contact
          </Link>
        </div>
      </div>

      {/* Fun Statistics */}
      <div className="mt-12 surface surface-pad w-full max-w-2xl animate-fade-in-delay-3">
        <p className="text-xs text-mutedForeground uppercase tracking-wider mb-4 text-center">System Status</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <p className="text-2xl font-bold text-accent">∞</p>
            <p className="text-xs text-mutedForeground mt-1">Valid Pages</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <p className="text-2xl font-bold text-danger">1</p>
            <p className="text-xs text-mutedForeground mt-1">Not Found</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <p className="text-2xl font-bold text-success">99.9%</p>
            <p className="text-xs text-mutedForeground mt-1">Uptime</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <p className="text-2xl font-bold text-warning">0</p>
            <p className="text-xs text-mutedForeground mt-1">Breaches</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-mutedForeground">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          All other systems operational
        </div>
      </div>

      {/* Easter egg hint */}
      <p className="mt-8 text-xs text-mutedForeground/50 font-mono">
        {/* Error logged: incident_id=0x404 */}
        error_code: 0x404 | status: page_not_found | action: redirect_home
      </p>
    </div>
  );
}
