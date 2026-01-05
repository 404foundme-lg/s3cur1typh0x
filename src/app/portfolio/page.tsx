import Link from "next/link";
import { Section } from "@/components/Section";
import { NetworkMap } from "@/components/NetworkMap";
import { caseStudies } from "@/content/caseStudies";

export default function PortfolioPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <p className="kicker">Case Studies & Reports</p>
        <h1 className="page-title">Portfolio</h1>
        <p className="page-lede">
          Real engagement scenarios emphasizing decision logic, defensive visibility,
          and actionable remediation. All details are sanitized and authorized.
        </p>
      </section>

      {/* Live Network Recon Demo */}
      <Section title="Attack Simulation Preview">
        <NetworkMap />
      </Section>

      {/* Case Studies */}
      <Section title="Engagement Case Studies">
        <div className="grid-cards-2">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/portfolio/case-studies/${cs.slug}`}
              className="card-interactive group"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold tracking-tight group-hover:text-accent transition-colors">
                    {cs.title}
                  </h3>
                  <p className="mt-2 text-sm text-mutedForeground line-clamp-3">
                    {cs.scenario}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cs.mitre.slice(0, 3).map((m) => (
                      <span key={m.techniqueId} className="tag">
                        {m.techniqueId}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-mutedForeground group-hover:text-accent transition-colors">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Reports CTA */}
      <Section title="Red Team Reports">
        <div className="surface surface-pad flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="label">Executive & Technical Deliverables</p>
            <p className="mt-1 text-sm text-mutedForeground">
              View report formats with defensible risk rationale and business impact mapping.
            </p>
          </div>
          <Link href="/portfolio/reports" className="action-primary">
            View Reports →
          </Link>
        </div>
      </Section>
    </div>
  );
}
