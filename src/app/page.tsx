import Link from "next/link";
import { Target, ClipboardList, Wrench, FileText, ShieldCheck, FileDown } from "lucide-react";
import { Section } from "@/components/Section";
import { HeroTerminal } from "@/components/HeroTerminal";
import { site } from "@/content/site";

const features = [
  {
    href: "/portfolio",
    title: "Portfolio",
    description: "Case studies with decision logic, attack paths, and remediation.",
    icon: Target,
  },
  {
    href: "/portfolio/reports",
    title: "Reports",
    description: "Executive and technical deliverables with risk rationale.",
    icon: ClipboardList,
  },
  {
    href: "/tools",
    title: "Tools",
    description: "Custom operator tooling and framework extensions.",
    icon: Wrench,
  },
  {
    href: "/blog",
    title: "Blog",
    description: "Lessons learned, failures, and tradecraft notes.",
    icon: FileText,
  },
];

const signals = [
  {
    label: "Seniority",
    value: site.senioritySignal,
  },
  {
    label: "Primary Focus",
    value: site.primaryFocus,
  },
  {
    label: "Legitimacy",
    value: "Controlled, documented, authorized.",
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="hero-glow relative py-8 sm:py-12">
        {/* Dynamic Terminal */}
        <div className="mb-8">
          <HeroTerminal />
        </div>

        <div className="space-y-6 animate-fade-in-delay">
          <p className="kicker">{site.location}</p>
          <h1 className="page-title max-w-4xl">{site.professionalTitle}</h1>
          <p className="page-lede animate-fade-in-delay-2">{site.positioningStatement}</p>

          <div className="flex flex-wrap gap-3 pt-2 animate-fade-in-delay-3">
            <Link href="/portfolio" className="action-primary glow-border">
              View Portfolio
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/contact" className="action">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Ethics Notice */}
      <section className="animate-fade-in-delay">
        <div className="surface surface-pad-sm flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="label">Ethics & Authorization</p>
            <p className="mt-1 text-sm text-mutedForeground">{site.ethicsNotice}</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <Section title="Explore" titleClass="section-title">
        <div className="grid-cards-4">
          {features.map((feature, i) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="card-interactive card-lift group animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-accent">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold tracking-tight group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-mutedForeground">{feature.description}</p>
              <div className="mt-4 flex items-center text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <span className="ml-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Recruiter Signals */}
      <Section title="At a Glance" titleClass="section-title">
        <div className="grid gap-4 sm:grid-cols-3">
          {signals.map((signal) => (
            <div key={signal.label} className="stat-card">
              <p className="caption">{signal.label}</p>
              <p className="mt-2 text-base font-medium text-foreground">{signal.value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Quick Links */}
      <section className="surface surface-pad">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="label">Ready to connect?</p>
            <p className="mt-1 text-sm text-mutedForeground">
              Download my resume or reach out directly.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/resume.pdf" className="action">
              <FileDown className="h-4 w-4" />
              Resume
            </Link>
            <Link href="/contact" className="action-primary">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
