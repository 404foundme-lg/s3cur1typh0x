import { Section } from "@/components/Section";
import { FlaskConical } from "lucide-react";
import { research } from "@/content/research";

export default function ResearchPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <p className="kicker">Analysis & Notes</p>
        <h1 className="page-title">Research</h1>
        <p className="page-lede">
          Analytical and restrained notes on security research, exploit-development
          learning, AD path analysis, and defense-bypass tradeoffs under constraints.
        </p>
      </section>

      {/* Write-Ups */}
      <Section title="Write-Ups">
        <div className="grid-cards-2">
          {research.map((r) => (
            <div key={r.slug} className="surface surface-pad">
              <h3 className="text-base font-semibold tracking-tight">{r.title}</h3>
              <p className="mt-2 text-sm text-mutedForeground">{r.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.topics.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Labs */}
      <Section title="Labs & Controlled Demonstrations">
        <div className="surface surface-pad">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-accent">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <p className="label">Coming Soon</p>
              <p className="mt-1 text-sm text-mutedForeground">
                Add controlled demonstrations here (Docker labs, intentionally vulnerable
                services, private CTF-style challenges) with:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-mutedForeground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Setup instructions
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Learning objectives
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Intended exploitation path (high-level)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
