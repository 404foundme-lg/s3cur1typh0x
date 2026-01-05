import Link from "next/link";
import { site } from "@/content/site";

const nav = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/techniques", label: "Techniques" },
  { href: "/tools", label: "Tools" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/credentials", label: "Credentials" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 py-4">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent font-bold text-sm transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            {site.name.charAt(0)}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-tight">{site.name}</p>
            <p className="text-xs text-mutedForeground">{site.professionalTitle.split("·")[0].trim()}</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link px-2.5 py-1.5">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
