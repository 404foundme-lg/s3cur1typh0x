import { techniques, categoryInfo, type TechniqueCategory } from "@/content/techniques";
import {
  CheckCircle,
  Settings,
  Lightbulb,
  Eye,
  AlertTriangle,
  Info,
  DoorOpen,
  Key,
  TrendingUp,
  ArrowLeftRight,
  Radio,
  EyeOff,
  Box,
} from "lucide-react";

const categories: TechniqueCategory[] = [
  "Initial Access",
  "Credential Access",
  "Privilege Escalation",
  "Lateral Movement",
  "Command and Control",
  "Defense Evasion",
];

// Map icon names to components
const categoryIcons: Record<string, React.ReactNode> = {
  DoorOpen: <DoorOpen className="w-6 h-6" />,
  Key: <Key className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  ArrowLeftRight: <ArrowLeftRight className="w-6 h-6" />,
  Radio: <Radio className="w-6 h-6" />,
  EyeOff: <EyeOff className="w-6 h-6" />,
};

// Difficulty badge component
function DifficultyBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Low: "bg-green-500/20 text-green-400 border-green-500/30",
    Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    High: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    Expert: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${colors[level] || colors.Medium}`}>
      {level}
    </span>
  );
}

// MITRE ATT&CK badge component
function MitreBadge({ id }: { id?: string }) {
  if (!id) return null;
  return (
    <a 
      href={`https://attack.mitre.org/techniques/${id.replace('.', '/')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-accent/10 text-accent border border-accent/30 rounded hover:bg-accent/20 transition-colors"
    >
      <Box className="w-3 h-3" />
      {id}
    </a>
  );
}

// Info block with icon
function InfoBlock({ 
  label, 
  items, 
  icon,
  variant = "default" 
}: { 
  label: string; 
  items: string[]; 
  icon: React.ReactNode;
  variant?: "default" | "warning" | "danger" | "success";
}) {
  const variantStyles = {
    default: "border-border/50",
    warning: "border-yellow-500/30 bg-yellow-500/5",
    danger: "border-red-500/30 bg-red-500/5",
    success: "border-green-500/30 bg-green-500/5",
  };

  const iconColors = {
    default: "text-accent",
    warning: "text-yellow-400",
    danger: "text-red-400",
    success: "text-green-400",
  };

  return (
    <div className={`rounded-lg border p-4 ${variantStyles[variant]}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={iconColors[variant]}>{icon}</span>
        <p className="text-sm font-semibold text-foreground">{label}</p>
      </div>
      <ul className="space-y-2">
        {items.map((x, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-mutedForeground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Category header with icon and stats
function CategoryHeader({ category, count }: { category: TechniqueCategory; count: number }) {
  const info = categoryInfo[category];
  const IconComponent = categoryIcons[info.iconName];
  
  return (
    <div className="flex items-center gap-4 mb-6">
      <div 
        className="flex items-center justify-center w-12 h-12 rounded-lg"
        style={{ backgroundColor: `${info.color}20`, border: `1px solid ${info.color}40`, color: info.color }}
      >
        {IconComponent}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-foreground">{category}</h2>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-surface text-mutedForeground border border-border">
            {count} technique{count !== 1 ? 's' : ''}
          </span>
        </div>
        <p className="text-sm text-mutedForeground mt-1">{info.description}</p>
      </div>
    </div>
  );
}

// Terminal-style command display
function TerminalCommand({ command }: { command: string }) {
  return (
    <div className="font-mono text-xs bg-black/40 rounded px-2 py-1 border border-green-500/20 text-green-400">
      <span className="text-green-600">$</span> {command}
    </div>
  );
}

// Icons for info blocks
const icons = {
  preconditions: <CheckCircle className="w-4 h-4" />,
  tooling: <Settings className="w-4 h-4" />,
  logic: <Lightbulb className="w-4 h-4" />,
  detection: <Eye className="w-4 h-4" />,
  failure: <AlertTriangle className="w-4 h-4" />,
};

export default function TechniquesPage() {
  const totalTechniques = techniques.length;
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-accent font-mono">~/techniques</span>
            <span className="text-mutedForeground">•</span>
            <span className="text-mutedForeground">Operator Reasoning Framework</span>
          </div>
          
          <h1 className="page-title">
            Techniques & <span className="text-accent">Tradecraft</span>
          </h1>
          
          <p className="page-lede max-w-3xl">
            A structured decision framework for offensive operations. Each technique documents 
            preconditions, tooling options, selection criteria, detection artifacts, and 
            failure modes—enabling informed operator choices rather than blind execution.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <span className="text-accent font-bold text-sm">{totalTechniques}</span>
              </div>
              <span className="text-sm text-mutedForeground">Total Techniques</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <span className="text-purple-400 font-bold text-sm">{categories.length}</span>
              </div>
              <span className="text-sm text-mutedForeground">Attack Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-sm text-mutedForeground">MITRE ATT&CK Mapped</span>
            </div>
          </div>

          {/* Terminal preview */}
          <div className="mt-8 rounded-lg border border-border bg-black/40 p-4 font-mono text-sm max-w-2xl">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-mutedForeground text-xs">tradecraft.sh</span>
            </div>
            <div className="space-y-1 text-green-400">
              <p><span className="text-purple-400">$</span> ./enumerate_techniques.sh --category all</p>
              <p className="text-mutedForeground">[*] Loading technique database...</p>
              <p className="text-mutedForeground">[+] Found {totalTechniques} documented techniques</p>
              <p className="text-mutedForeground">[+] Categories: {categories.length} kill chain phases</p>
              <p className="text-accent">[✓] Ready for operator review</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick navigation */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-foreground">Quick Navigation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const info = categoryInfo[cat];
            const count = techniques.filter(t => t.category === cat).length;
            return (
              <a
                key={cat}
                href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="group flex flex-col items-center gap-2 p-4 rounded-lg border border-border bg-surface hover:border-accent/50 transition-all duration-200"
              >
                <span className="group-hover:scale-110 transition-transform" style={{ color: info.color }}>
                  {categoryIcons[info.iconName]}
                </span>
                <span className="text-xs font-medium text-center text-mutedForeground group-hover:text-foreground transition-colors">
                  {cat.split(' ').slice(0, 2).join(' ')}
                </span>
                <span className="text-xs text-accent">{count}</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat) => {
        const items = techniques.filter((t) => t.category === cat);
        if (items.length === 0) return null;

        return (
          <section 
            key={cat} 
            id={cat.toLowerCase().replace(/\s+/g, '-')}
            className="scroll-mt-20"
          >
            <CategoryHeader category={cat} count={items.length} />
            
            <div className="space-y-6">
              {items.map((t, index) => (
                <article 
                  key={t.id} 
                  className="group relative rounded-xl border border-border bg-surface overflow-hidden hover:border-accent/30 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient accent line */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, ${categoryInfo[cat].color}, transparent)` }}
                  />
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                            {t.name}
                          </h3>
                          <DifficultyBadge level={t.difficulty} />
                        </div>
                        <div className="flex items-center gap-3">
                          <MitreBadge id={t.mitreId} />
                          <span className="text-xs font-mono text-mutedForeground">{t.id.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <InfoBlock 
                        label="Preconditions" 
                        items={t.preconditions} 
                        icon={icons.preconditions}
                        variant="default"
                      />
                      <InfoBlock 
                        label="Tooling Options" 
                        items={t.toolingOptions} 
                        icon={icons.tooling}
                        variant="default"
                      />
                      <InfoBlock 
                        label="Selection Logic" 
                        items={t.selectionLogic} 
                        icon={icons.logic}
                        variant="success"
                      />
                      <InfoBlock 
                        label="Detection Artifacts" 
                        items={t.detectionArtifacts} 
                        icon={icons.detection}
                        variant="warning"
                      />
                    </div>

                    {/* Failure Cases */}
                    <div className="mt-4">
                      <InfoBlock 
                        label="Failure Cases" 
                        items={t.failureCases} 
                        icon={icons.failure}
                        variant="danger"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {/* Footer note */}
      <section className="border-t border-border pt-8">
        <div className="flex items-start gap-4 p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
          <Info className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Responsible Disclosure</h3>
            <p className="text-sm text-mutedForeground">
              These techniques are documented for educational and authorized security testing purposes only. 
              All activities should be conducted within proper legal frameworks and with explicit authorization. 
              The goal is to help defenders understand attacker methodologies and improve security postures.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
