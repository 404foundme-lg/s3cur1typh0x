"use client";

import { useState, useEffect } from "react";
import { tools, type ToolItem } from "@/content/tools";

export function ToolLoader() {
  const [phase, setPhase] = useState(0);
  const [loadedTools, setLoadedTools] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Loading animation
  useEffect(() => {
    if (phase === 0) {
      const timer = setTimeout(() => setPhase(1), 400);
      return () => clearTimeout(timer);
    }
    if (phase === 1) {
      const timer = setTimeout(() => setPhase(2), 600);
      return () => clearTimeout(timer);
    }
    if (phase === 2) {
      const timer = setTimeout(() => setPhase(3), 500);
      return () => clearTimeout(timer);
    }
    if (phase >= 3 && loadedTools.length < tools.length) {
      const timer = setTimeout(() => {
        setLoadedTools((prev) => [...prev, tools[prev.length].slug]);
      }, 80);
      return () => clearTimeout(timer);
    }
    if (loadedTools.length === tools.length && phase === 3) {
      const timer = setTimeout(() => setPhase(4), 300);
      return () => clearTimeout(timer);
    }
  }, [phase, loadedTools.length]);

  const getStatusColor = (status: ToolItem["status"]) => {
    switch (status) {
      case "Active": return "text-success";
      case "Maintained": return "text-info";
      case "In Development": return "text-warning";
      case "Archived": return "text-mutedForeground";
    }
  };

  const isComplete = phase === 4;

  return (
    <div className="surface overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b px-4 py-2 bg-muted/30">
        <div className="w-3 h-3 rounded-full bg-danger" />
        <div className="w-3 h-3 rounded-full bg-warning" />
        <div className="w-3 h-3 rounded-full bg-success" />
        <span className="ml-2 text-xs text-mutedForeground font-mono">arsenal-loader.sh</span>
        {isComplete && (
          <span className="ml-auto text-xs font-mono text-success">
            {tools.length} TOOLS LOADED
          </span>
        )}
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-xs sm:text-sm space-y-1 max-h-[300px] overflow-y-auto">
        <p className="text-mutedForeground">
          <span className="text-accent">$</span> ./load-arsenal.sh --verify --stats
        </p>

        {phase >= 1 && (
          <p className="text-info animate-fade-in mt-2">
            [*] Initializing tool repository...
          </p>
        )}
        {phase >= 2 && (
          <p className="text-info animate-fade-in">
            [*] Validating tool signatures...
          </p>
        )}
        {phase >= 3 && (
          <p className="text-success animate-fade-in">
            [+] Loading {tools.length} tools from arsenal
          </p>
        )}

        {/* Tool loading */}
        {phase >= 3 && (
          <div className="mt-2 space-y-0.5">
            {tools.map((tool) => (
              loadedTools.includes(tool.slug) && (
                <p key={tool.slug} className="animate-fade-in flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span className="text-foreground truncate flex-1">{tool.name}</span>
                  <span className={`text-xs ${getStatusColor(tool.status)}`}>
                    [{tool.status}]
                  </span>
                </p>
              )
            ))}
          </div>
        )}

        {/* Completion stats */}
        {isComplete && (
          <div className="mt-4 pt-3 border-t border-muted/50 space-y-1 animate-fade-in">
            <p className="text-success">[+] Arsenal loaded successfully</p>
            <p className="text-mutedForeground">
              ├─ Active: {tools.filter(t => t.status === "Active").length}
            </p>
            <p className="text-mutedForeground">
              ├─ Maintained: {tools.filter(t => t.status === "Maintained").length}
            </p>
            <p className="text-mutedForeground">
              ├─ In Development: {tools.filter(t => t.status === "In Development").length}
            </p>
            <p className="text-mutedForeground">
              └─ Archived: {tools.filter(t => t.status === "Archived").length}
            </p>
          </div>
        )}

        {/* Cursor */}
        {!isComplete && phase >= 3 && (
          <p className="mt-2">
            <span className="text-accent">$</span>{" "}
            <span className={`inline-block w-2 h-4 bg-accent ${showCursor ? "opacity-100" : "opacity-0"}`} />
          </p>
        )}
      </div>
    </div>
  );
}
