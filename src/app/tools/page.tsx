"use client";

import { useState } from "react";
import Link from "next/link";
import { Section } from "@/components/Section";
import { ToolLoader } from "@/components/ToolLoader";
import { tools, toolCategories, toolStats, type ToolCategory } from "@/content/tools";
import {
  Search,
  Zap,
  Network,
  EyeOff,
  FileText,
  Server,
  Star,
  GitBranch,
  Clock,
  Filter,
  Terminal,
} from "lucide-react";

// Map category icons
const categoryIcons: Record<string, React.ReactNode> = {
  Search: <Search className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  EyeOff: <EyeOff className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
};

const statusColors: Record<string, string> = {
  Active: "bg-success/20 text-success border-success/30",
  Maintained: "bg-info/20 text-info border-info/30",
  "In Development": "bg-warning/20 text-warning border-warning/30",
  Archived: "bg-muted text-mutedForeground border-muted",
};

const typeColors: Record<string, string> = {
  "Custom Tool": "bg-accent/20 text-accent border-accent/30",
  "Framework Extension": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Script Collection": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "PoC": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Library": "bg-teal-500/20 text-teal-400 border-teal-500/30",
};

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = Object.keys(toolCategories) as ToolCategory[];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <p className="kicker">Engineering & Automation</p>
        <h1 className="page-title">Arsenal</h1>
        <p className="page-lede">
          Custom tools and extensions that reduce operator effort, improve evidence
          quality, and support stealthy-but-defensible workflows. No weaponized
          binaries are hosted—source code and documentation only.
        </p>
      </section>

      {/* Tool Loader Terminal */}
      <ToolLoader />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="stat-card text-center">
          <div className="flex items-center justify-center gap-2 text-accent">
            <Terminal className="w-4 h-4" />
            <span className="text-2xl font-bold">{toolStats.totalTools}</span>
          </div>
          <p className="caption mt-1">Total Tools</p>
        </div>
        <div className="stat-card text-center">
          <div className="flex items-center justify-center gap-2 text-success">
            <GitBranch className="w-4 h-4" />
            <span className="text-2xl font-bold">{toolStats.activeTools}</span>
          </div>
          <p className="caption mt-1">Active</p>
        </div>
        <div className="stat-card text-center">
          <div className="flex items-center justify-center gap-2 text-warning">
            <Star className="w-4 h-4" />
            <span className="text-2xl font-bold">{toolStats.totalStars.toLocaleString()}</span>
          </div>
          <p className="caption mt-1">GitHub Stars</p>
        </div>
        <div className="stat-card text-center">
          <div className="flex items-center justify-center gap-2 text-info">
            <Filter className="w-4 h-4" />
            <span className="text-2xl font-bold">{toolStats.categories}</span>
          </div>
          <p className="caption mt-1">Categories</p>
        </div>
      </div>

      {/* Category Filter */}
      <Section title="Browse by Category">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`p-3 rounded-lg border text-center transition-all ${
              selectedCategory === "All"
                ? "bg-accent/20 border-accent text-accent"
                : "bg-muted/30 border-border text-mutedForeground hover:border-accent/50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Terminal className="w-4 h-4" />
              <span className="text-sm font-medium">All</span>
            </div>
            <span className="text-xs text-mutedForeground">{tools.length}</span>
          </button>
          {categories.map((cat) => {
            const count = tools.filter((t) => t.category === cat).length;
            const iconName = toolCategories[cat].iconName;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`p-3 rounded-lg border text-center transition-all ${
                  selectedCategory === cat
                    ? "bg-accent/20 border-accent text-accent"
                    : "bg-muted/30 border-border text-mutedForeground hover:border-accent/50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {categoryIcons[iconName]}
                  <span className="text-sm font-medium hidden sm:inline">{cat.split("-")[0]}</span>
                </div>
                <span className="text-xs text-mutedForeground">{count}</span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mutedForeground" />
        <input
          type="text"
          placeholder="Search tools by name, description, or tech stack..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-lg text-foreground placeholder:text-mutedForeground focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Tools Grid */}
      <Section title={`${selectedCategory === "All" ? "All Tools" : selectedCategory} (${filteredTools.length})`}>
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredTools.map((tool, i) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="card-interactive group animate-fade-in"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${typeColors[tool.type]}`}>
                      {tool.type}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${statusColors[tool.status]}`}>
                      {tool.status}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight group-hover:text-accent transition-colors truncate">
                    {tool.name}
                  </h3>
                </div>
                <span className="text-mutedForeground group-hover:text-accent transition-colors shrink-0">
                  →
                </span>
              </div>

              {/* Description */}
              <p className="mt-2 text-sm text-mutedForeground line-clamp-2">
                {tool.problemStatement}
              </p>

              {/* Tech Stack */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tool.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs bg-muted rounded text-mutedForeground"
                  >
                    {tech}
                  </span>
                ))}
                {tool.techStack.length > 4 && (
                  <span className="px-2 py-0.5 text-xs text-mutedForeground">
                    +{tool.techStack.length - 4}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-mutedForeground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {tool.lastUpdated}
                </span>
                {tool.stars && (
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {tool.stars}
                  </span>
                )}
                {tool.githubUrl && (
                  <span className="flex items-center gap-1 text-accent">
                    <GitBranch className="w-3 h-3" />
                    Source
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Terminal className="w-12 h-12 mx-auto text-mutedForeground mb-4" />
            <p className="text-mutedForeground">No tools match your criteria</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 action"
            >
              Clear Filters
            </button>
          </div>
        )}
      </Section>

      {/* Safety Notice */}
      <div className="surface surface-pad flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning">
          <EyeOff className="w-5 h-5" />
        </div>
        <div>
          <p className="label">Responsible Disclosure</p>
          <p className="mt-1 text-sm text-mutedForeground">
            All tools are provided for authorized security testing and research only. 
            No pre-compiled weaponized binaries are distributed. Source code is documented 
            with safety considerations and detection guidance for defenders.
          </p>
        </div>
      </div>
    </div>
  );
}
