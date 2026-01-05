import { Section } from "@/components/Section";
import { SkillBar, SkillGrid } from "@/components/SkillBar";
import { SkillsScanner } from "@/components/SkillsScanner";
import { Timeline } from "@/components/Timeline";
import { site } from "@/content/site";
import { Target, Lock, Users, ShieldCheck } from "lucide-react";

const principles = [
  {
    title: "Rules of Engagement Awareness",
    description: "I operate strictly within agreed scope, time windows, and stop conditions.",
    icon: <Target className="w-5 h-5" />,
  },
  {
    title: "Data Handling Discipline",
    description: "Evidence is minimized, redacted, and handled according to client requirements.",
    icon: <Lock className="w-5 h-5" />,
  },
  {
    title: "Collaboration with Blue Teams",
    description: "I prioritize findings that improve detection and response, not just exploitation.",
    icon: <Users className="w-5 h-5" />,
  },
];

const coreSkills = [
  { name: "Red Team Operations", level: 95 },
  { name: "Penetration Testing", level: 90 },
  { name: "Adversary Simulation", level: 88 },
  { name: "Security Research", level: 85 },
  { name: "Malware Analysis", level: 80 },
  { name: "Exploit Development", level: 75 },
];

const techSkills = [
  { name: "Cobalt Strike" },
  { name: "Metasploit" },
  { name: "Burp Suite" },
  { name: "BloodHound" },
  { name: "Mimikatz" },
  { name: "PowerShell" },
  { name: "Python" },
  { name: "C/C++" },
  { name: "Wireshark" },
];

const experience = [
  {
    date: "2022 - Present",
    title: "Senior Red Team Operator",
    subtitle: "Fortune 500 Consulting",
    badge: "Current",
    description: "Leading adversary simulation engagements against enterprise environments.",
  },
  {
    date: "2019 - 2022",
    title: "Penetration Tester",
    subtitle: "Security Consulting Firm",
    description: "Web application, network, and cloud security assessments.",
  },
  {
    date: "2017 - 2019",
    title: "Security Analyst",
    subtitle: "SOC Operations",
    description: "Detection engineering and incident response.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <p className="kicker">Background & Philosophy</p>
        <h1 className="page-title">About</h1>
        <p className="page-lede">
          Replace this section with a short background that matches your target roles
          and highlights the environments you operate in.
        </p>
      </section>

      {/* Core Skills - Terminal Scanner */}
      <Section title="Core Competencies">
        <SkillsScanner skills={coreSkills} title="Core Competencies" />
      </Section>

      {/* Technical Skills */}
      <Section title="Technical Skills">
        <SkillGrid skills={techSkills} />
      </Section>

      {/* Experience Timeline */}
      <Section title="Experience">
        <div className="surface surface-pad">
          <Timeline items={experience} />
        </div>
      </Section>

      {/* Operating Principles */}
      <Section title="Operating Principles">
        <div className="grid gap-4 sm:grid-cols-3">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="surface surface-pad card-lift animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-accent">
                {p.icon}
              </div>
              <h3 className="mt-4 text-sm font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-mutedForeground">{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Ethics Statement */}
      <Section title="Ethics Statement">
        <div className="surface surface-pad flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="label">Commitment to Ethical Practice</p>
            <p className="mt-1 text-sm text-mutedForeground">{site.ethicsNotice}</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
