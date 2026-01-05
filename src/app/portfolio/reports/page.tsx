import Link from "next/link";
import { Section } from "@/components/Section";
import { reports } from "@/content/reports";

export default function ReportsPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm text-mutedForeground hover:text-accent transition-colors">
          ← Back to Portfolio
        </Link>
        <p className="kicker">Deliverables</p>
        <h1 className="page-title">Red Team Reports</h1>
        <p className="page-lede">
          Web-viewable reports plus downloadable PDFs. The focus is stakeholder clarity
          (executive) and defender usefulness (technical).
        </p>
      </section>

      {/* Report Library */}
      <Section title="Report Library">
        <div className="grid-cards-2">
          {reports.map((r) => (
            <Link
              key={r.slug}
              href={`/portfolio/reports/${r.slug}`}
              className="card-interactive group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="badge">{r.audience}</span>
                  <h3 className="mt-3 text-base font-semibold tracking-tight group-hover:text-accent transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-mutedForeground">{r.summary}</p>
                </div>
                <span className="text-mutedForeground group-hover:text-accent transition-colors">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
