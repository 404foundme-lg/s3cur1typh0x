import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { caseStudies } from "@/content/caseStudies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

function InfoList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((x) => (
        <li key={x} className="flex items-start gap-2 text-sm text-mutedForeground">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {x}
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return notFound();

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="space-y-4">
        <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm text-mutedForeground hover:text-accent transition-colors">
          ← Back to Portfolio
        </Link>
        <h1 className="page-title">{cs.title}</h1>
        <p className="page-lede">{cs.scenario}</p>
        <div className="flex flex-wrap gap-2">
          {cs.mitre.map((m) => (
            <span key={m.techniqueId} className="tag">
              {m.techniqueId}
            </span>
          ))}
        </div>
      </header>

      <div className="divider" />

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Assumed Scope">
          <div className="surface surface-pad">
            <InfoList items={cs.assumedScope} />
          </div>
        </Section>

        <Section title="Initial Access Vectors">
          <div className="surface surface-pad">
            <InfoList items={cs.initialAccessVectorsConsidered} />
          </div>
        </Section>

        <Section title="Exploitation Path">
          <div className="surface surface-pad">
            <InfoList items={cs.exploitationPathWithDecisionLogic} />
          </div>
        </Section>

        <Section title="Privilege Escalation & Lateral Movement">
          <div className="surface surface-pad">
            <InfoList items={cs.privilegeEscalationAndLateralMovement} />
          </div>
        </Section>
      </div>

      {/* Impact */}
      <Section title="Impact Summary">
        <div className="surface surface-pad">
          <InfoList items={cs.impactSummary} />
        </div>
      </Section>

      {/* Detection */}
      <Section title="Defensive Visibility & Detection">
        <div className="surface surface-pad">
          <InfoList items={cs.defensiveVisibilityAndDetectionPoints} />
        </div>
      </Section>

      {/* Remediation */}
      <Section title="Remediation Guidance">
        <div className="surface surface-pad">
          <InfoList items={cs.remediationGuidance} />
        </div>
      </Section>

      {/* MITRE */}
      <Section title="MITRE ATT&CK References">
        <div className="surface surface-pad">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cs.mitre.map((m) => (
              <div key={m.techniqueId} className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-mutedForeground">{m.tactic}</p>
                <p className="mt-1 text-sm font-medium">{m.technique}</p>
                <p className="mt-1 text-xs text-accent">{m.techniqueId}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Artifacts */}
      <Section title="Artifacts (Redacted)">
        <div className="grid gap-4 sm:grid-cols-2">
          {cs.assets.map((a) => (
            <figure key={a.src} className="surface overflow-hidden">
              <img
                src={a.src}
                alt={a.label}
                className="h-auto w-full"
              />
              <figcaption className="border-t p-3 text-xs text-mutedForeground">
                {a.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </div>
  );
}
