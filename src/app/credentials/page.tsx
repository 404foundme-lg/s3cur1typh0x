import { Section } from "@/components/Section";
import { CertVerifier } from "@/components/CertVerifier";
import { certifications, disclosures, talks, training } from "@/content/credentials";

function CredentialList({ items }: { items: { name: string; date?: string; note?: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={`${i.name}-${i.date ?? ""}`} className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
          <div>
            <p className="text-sm font-medium text-foreground">{i.name}</p>
            {(i.date || i.note) && (
              <p className="mt-0.5 text-xs text-mutedForeground">
                {i.date}{i.date && i.note && " · "}{i.note}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function CredentialsPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <p className="kicker">Professional Background</p>
        <h1 className="page-title">Credentials</h1>
        <p className="page-lede">
          Curated for relevance to offensive security and red team roles.
        </p>
      </section>

      {/* Certifications - Terminal Verifier */}
      <Section title="Certifications">
        <CertVerifier credentials={certifications} title="Certifications" />
      </Section>

      {/* Training */}
      <Section title="Training">
        <div className="surface surface-pad">
          <CredentialList items={training} />
        </div>
      </Section>

      {/* Talks */}
      <Section title="Talks & Meetups">
        <div className="surface surface-pad">
          <CredentialList items={talks} />
        </div>
      </Section>

      {/* Disclosures */}
      <Section title="Responsible Disclosure">
        <div className="surface surface-pad">
          <CredentialList items={disclosures} />
        </div>
      </Section>
    </div>
  );
}
