import Link from "next/link";
import { Section } from "@/components/Section";
import { ConnectionTerminal } from "@/components/ConnectionTerminal";
import { Linkedin, Github, FileDown, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/your-handle",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/your-handle",
    icon: <Github className="h-5 w-5" />,
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <p className="kicker">Get in Touch</p>
        <h1 className="page-title">Contact</h1>
        <p className="page-lede">
          Use professional, attributable contact paths. Optional PGP is supported.
        </p>
      </section>

      {/* Secure Connection Terminal */}
      <ConnectionTerminal />

      {/* Contact Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Resume */}
        <div className="surface surface-pad">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <FileDown className="h-5 w-5" />
            </div>
            <div>
              <p className="label">Resume</p>
              <p className="mt-1 text-sm text-mutedForeground">Download my latest resume in PDF format.</p>
              <Link href="/resume.pdf" className="action mt-4">
                Download Resume
              </Link>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="surface surface-pad">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="label">Email</p>
              <p className="mt-1 text-sm text-mutedForeground">Reach out directly via email.</p>
              <p className="mt-4 text-sm font-medium text-accent">you@domain.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <Section title="Connect">
        <div className="grid gap-4 sm:grid-cols-2">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="card-interactive group flex items-center gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-mutedForeground group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                {link.icon}
              </div>
              <div>
                <p className="font-medium group-hover:text-accent transition-colors">{link.name}</p>
                <p className="text-sm text-mutedForeground">View profile →</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* PGP */}
      <Section title="PGP Key">
        <div className="surface surface-pad flex items-center justify-between gap-4">
          <div>
            <p className="label">Encrypted Communication</p>
            <p className="mt-1 text-sm text-mutedForeground">For sensitive communications, use my PGP public key.</p>
          </div>
          <Link href="/pgp-publickey.txt" className="action">
            Download Key
          </Link>
        </div>
      </Section>
    </div>
  );
}
