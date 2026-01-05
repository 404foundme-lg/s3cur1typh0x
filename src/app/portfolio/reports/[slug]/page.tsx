import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { Section } from "@/components/Section";
import { reports } from "@/content/reports";

export function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
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

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = reports.find((r) => r.slug === slug);
  if (!report) return notFound();

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="space-y-4">
        <Link href="/portfolio/reports" className="inline-flex items-center gap-1 text-sm text-mutedForeground hover:text-accent transition-colors">
          ← Back to Reports
        </Link>
        <span className="badge">{report.audience}</span>
        <h1 className="page-title">{report.title}</h1>
        <p className="page-lede">{report.summary}</p>
        <Link href={report.pdfPath} className="action-primary inline-flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Link>
      </header>

      <div className="divider" />

      {/* Executive Summary */}
      <Section title="Executive Summary">
        <div className="surface surface-pad">
          <InfoList items={report.webView.executiveSummary} />
        </div>
      </Section>

      {/* Technical Findings */}
      <Section title="Technical Findings (For Defenders)">
        <div className="space-y-6">
          {report.webView.technicalFindingsForDefenders.map((f) => (
            <div key={f.title} className="surface surface-pad">
              <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>

              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="label">What we observed</p>
                  <div className="mt-2">
                    <InfoList items={f.whatWeObserved} />
                  </div>
                </div>
                <div>
                  <p className="label">Why it matters</p>
                  <div className="mt-2">
                    <InfoList items={f.whyItMatters} />
                  </div>
                </div>
                <div>
                  <p className="label">Detection</p>
                  <div className="mt-2">
                    <InfoList items={f.detection} />
                  </div>
                </div>
                <div>
                  <p className="label">Remediation</p>
                  <div className="mt-2">
                    <InfoList items={f.remediation} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Risk Scoring */}
      <Section title="Risk Scoring Rationale">
        <div className="surface surface-pad">
          <InfoList items={report.webView.riskScoringRationale} />
        </div>
      </Section>

      {/* Business Impact */}
      <Section title="Business Impact Mapping">
        <div className="surface surface-pad">
          <InfoList items={report.webView.businessImpactMapping} />
        </div>
      </Section>
    </div>
  );
}
