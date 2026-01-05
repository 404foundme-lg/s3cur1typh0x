import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Github, Star, Clock, Tag, Layers, Terminal, ExternalLink } from "lucide-react";
import { Section } from "@/components/Section";
import { tools, toolCategories } from "@/content/tools";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
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

function TerminalExample({ commands }: { commands: string[] }) {
  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center gap-2 border-b px-4 py-2 bg-muted/30">
        <div className="w-3 h-3 rounded-full bg-danger" />
        <div className="w-3 h-3 rounded-full bg-warning" />
        <div className="w-3 h-3 rounded-full bg-success" />
        <span className="ml-2 text-xs text-mutedForeground font-mono">usage-examples</span>
      </div>
      <div className="p-4 font-mono text-xs sm:text-sm space-y-2">
        {commands.map((cmd, i) => (
          <p key={i} className={cmd.startsWith("$") || cmd.startsWith("beacon>") ? "text-foreground" : "text-success"}>
            {cmd.startsWith("$") || cmd.startsWith("beacon>") ? (
              <>
                <span className="text-accent">{cmd.split(" ")[0]}</span>
                <span> {cmd.split(" ").slice(1).join(" ")}</span>
              </>
            ) : (
              <span className="text-mutedForeground pl-4">{cmd}</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

const statusColors: Record<string, string> = {
  Active: "bg-success/20 text-success border-success/30",
  Maintained: "bg-info/20 text-info border-info/30",
  "In Development": "bg-warning/20 text-warning border-warning/30",
  Archived: "bg-muted text-mutedForeground border-muted",
};

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return notFound();

  const categoryInfo = toolCategories[tool.category];

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="space-y-4">
        <Link href="/tools" className="inline-flex items-center gap-1 text-sm text-mutedForeground hover:text-accent transition-colors">
          ← Back to Arsenal
        </Link>
        
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge">{tool.type}</span>
          <span className="badge">{tool.category}</span>
          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${statusColors[tool.status]}`}>
            {tool.status}
          </span>
        </div>
        
        <h1 className="page-title">{tool.name}</h1>
        <p className="page-lede">{tool.problemStatement}</p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-mutedForeground">
          {tool.lastUpdated && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Updated {tool.lastUpdated}
            </span>
          )}
          {tool.stars && (
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning" />
              {tool.stars} stars
            </span>
          )}
        </div>
      </header>

      {/* Tech Stack */}
      <Section title="Tech Stack">
        <div className="flex flex-wrap gap-2">
          {tool.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm font-medium text-foreground"
            >
              <Layers className="w-3 h-3 text-accent" />
              {tech}
            </span>
          ))}
        </div>
      </Section>

      {/* Architecture */}
      <Section title="Architecture & Logic">
        <div className="surface surface-pad">
          <InfoList items={tool.architectureAndLogic} />
        </div>
      </Section>

      {/* Examples - Terminal Style */}
      <Section title="Usage Examples">
        <TerminalExample commands={tool.screenshotsOrExamples} />
      </Section>

      {/* Safety */}
      <Section title="Safety & Compliance">
        <div className="surface surface-pad flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="label">Responsible Use Notice</p>
            <p className="mt-1 text-sm text-mutedForeground">{tool.safetyNote}</p>
          </div>
        </div>
      </Section>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {tool.githubUrl && (
          <Link 
            href={tool.githubUrl} 
            className="action-primary" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            View Source on GitHub
            <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        )}
        <Link href="/tools" className="action">
          ← Browse All Tools
        </Link>
      </div>

      {/* Related Tools */}
      <Section title="Related Tools">
        <div className="grid gap-4 sm:grid-cols-2">
          {tools
            .filter((t) => t.category === tool.category && t.slug !== tool.slug)
            .slice(0, 2)
            .map((related) => (
              <Link
                key={related.slug}
                href={`/tools/${related.slug}`}
                className="card-interactive group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="badge text-xs">{related.type}</span>
                    <h3 className="mt-2 text-sm font-semibold tracking-tight group-hover:text-accent transition-colors">
                      {related.name}
                    </h3>
                    <p className="mt-1 text-xs text-mutedForeground line-clamp-2">
                      {related.problemStatement}
                    </p>
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
