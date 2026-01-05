import Link from "next/link";
import { site } from "@/content/site";
import { SocialLinks } from "./SocialLinks";

const footerLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-card/30">
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent font-bold text-sm">
                {site.name.charAt(0)}
              </div>
              <span className="font-semibold text-sm">{site.name}</span>
            </div>
            <p className="max-w-xs text-sm text-mutedForeground">
              {site.footerLine}
            </p>
            <SocialLinks />
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-mutedForeground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="divider mt-8" />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-mutedForeground">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
