"use client";

import { useState, useEffect } from "react";

interface Skill {
  name: string;
  level: number;
}

interface SkillsScannerProps {
  skills: Skill[];
  title?: string;
}

export function SkillsScanner({ skills, title = "Core Competencies" }: SkillsScannerProps) {
  const [scanPhase, setScanPhase] = useState(0);
  const [scannedSkills, setScannedSkills] = useState<number[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [scanComplete, setScanComplete] = useState(false);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Scan animation sequence
  useEffect(() => {
    if (scanPhase === 0) {
      const timer = setTimeout(() => setScanPhase(1), 500);
      return () => clearTimeout(timer);
    }
    if (scanPhase === 1) {
      const timer = setTimeout(() => setScanPhase(2), 800);
      return () => clearTimeout(timer);
    }
    if (scanPhase === 2) {
      const timer = setTimeout(() => setScanPhase(3), 600);
      return () => clearTimeout(timer);
    }
    if (scanPhase >= 3 && scannedSkills.length < skills.length) {
      const timer = setTimeout(() => {
        setScannedSkills((prev) => [...prev, prev.length]);
      }, 150);
      return () => clearTimeout(timer);
    }
    if (scannedSkills.length === skills.length && !scanComplete) {
      const timer = setTimeout(() => setScanComplete(true), 500);
      return () => clearTimeout(timer);
    }
  }, [scanPhase, scannedSkills.length, skills.length, scanComplete]);

  const getProgressBar = (level: number) => {
    const filled = Math.floor(level / 5);
    const empty = 20 - filled;
    return `[${"█".repeat(filled)}${"░".repeat(empty)}]`;
  };

  const getLevelColor = (level: number) => {
    if (level >= 90) return "text-success";
    if (level >= 75) return "text-accent";
    if (level >= 60) return "text-warning";
    return "text-mutedForeground";
  };

  return (
    <div className="surface overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b px-4 py-2 bg-muted/30">
        <div className="w-3 h-3 rounded-full bg-danger" />
        <div className="w-3 h-3 rounded-full bg-warning" />
        <div className="w-3 h-3 rounded-full bg-success" />
        <span className="ml-2 text-xs text-mutedForeground font-mono">skill-enumeration.sh</span>
        {scanComplete && (
          <span className="ml-auto text-xs text-success font-mono">✓ COMPLETE</span>
        )}
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-xs sm:text-sm space-y-1 min-h-[200px]">
        {/* Init phase */}
        {scanPhase >= 1 && (
          <p className="text-info animate-fade-in">
            [*] Initializing skill enumeration module...
          </p>
        )}
        
        {/* Target phase */}
        {scanPhase >= 2 && (
          <p className="text-info animate-fade-in">
            [*] Target: {title}
          </p>
        )}

        {/* Scan start */}
        {scanPhase >= 3 && (
          <>
            <p className="text-success animate-fade-in">
              [+] Scan initiated - {skills.length} capabilities detected
            </p>
            <p className="text-mutedForeground animate-fade-in mt-2">
              ─────────────────────────────────────────────
            </p>
          </>
        )}

        {/* Skill results */}
        <div className="space-y-1 mt-2">
          {skills.map((skill, i) => (
            scannedSkills.includes(i) && (
              <div
                key={skill.name}
                className="flex flex-wrap items-center gap-2 animate-fade-in"
              >
                <span className="text-accent w-4">→</span>
                <span className="text-foreground min-w-[180px]">{skill.name}</span>
                <span className={`font-mono ${getLevelColor(skill.level)}`}>
                  {getProgressBar(skill.level)}
                </span>
                <span className={`${getLevelColor(skill.level)} w-12 text-right`}>
                  {skill.level}%
                </span>
              </div>
            )
          ))}
        </div>

        {/* Completion message */}
        {scanComplete && (
          <>
            <p className="text-mutedForeground mt-2">
              ─────────────────────────────────────────────
            </p>
            <p className="text-success animate-fade-in">
              [+] Enumeration complete. {skills.length} skills profiled.
            </p>
            <p className="text-info animate-fade-in">
              [*] Average proficiency: {Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length)}%
            </p>
          </>
        )}

        {/* Cursor */}
        {!scanComplete && scanPhase >= 3 && (
          <p className="mt-2">
            <span className="text-accent">$</span>{" "}
            <span className={`inline-block w-2 h-4 bg-accent ${showCursor ? "opacity-100" : "opacity-0"}`} />
          </p>
        )}
      </div>
    </div>
  );
}
