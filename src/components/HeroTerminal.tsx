"use client";

import { useState, useEffect, useCallback } from "react";

interface TerminalLine {
  type: "command" | "output" | "system" | "ascii";
  text: string;
  color?: string;
}

const terminalSequence: TerminalLine[] = [
  { type: "system", text: "[*] Initializing secure connection..." },
  { type: "system", text: "[+] Connection established" },
  { type: "command", text: "whoami" },
  { type: "output", text: "offensive-security-professional" },
  { type: "command", text: "cat /etc/profile | grep ROLE" },
  { type: "output", text: 'ROLE="Red Team Operator | Penetration Tester"' },
  { type: "command", text: "ls -la ./skills/" },
  { type: "output", text: "drwxr-xr-x  adversary-simulation/" },
  { type: "output", text: "drwxr-xr-x  exploit-development/" },
  { type: "output", text: "drwxr-xr-x  social-engineering/" },
  { type: "output", text: "-rwxr-xr-x  tradecraft.sh" },
  { type: "command", text: "./tradecraft.sh --status" },
  { type: "ascii", text: "╔══════════════════════════════════════╗" },
  { type: "ascii", text: "║  STATUS: READY FOR ENGAGEMENT        ║" },
  { type: "ascii", text: "║  CLEARANCE: AUTHORIZED OPS ONLY      ║" },
  { type: "ascii", text: "╚══════════════════════════════════════╝" },
  { type: "command", text: "echo $MISSION" },
  { type: "output", text: "Break systems. Strengthen defenses. Document everything." },
];

export function HeroTerminal() {
  const [displayedLines, setDisplayedLines] = useState<{ line: TerminalLine; text: string; complete: boolean }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (currentLineIndex >= terminalSequence.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = terminalSequence[currentLineIndex];
    const isCommand = currentLine.type === "command";
    
    // Commands type character by character, outputs appear faster
    const baseDelay = isCommand ? 45 : 15;
    // Add some randomness for realistic typing feel
    const randomDelay = isCommand ? Math.random() * 30 : Math.random() * 10;
    const delay = baseDelay + randomDelay;

    // Pause between lines
    if (currentCharIndex === 0 && displayedLines.length > 0) {
      const pauseDelay = currentLine.type === "command" ? 400 : 
                         currentLine.type === "system" ? 600 : 80;
      const pauseTimer = setTimeout(() => {
        setDisplayedLines((prev) => [
          ...prev,
          { line: currentLine, text: "", complete: false },
        ]);
        setCurrentCharIndex(1);
      }, pauseDelay);
      return () => clearTimeout(pauseTimer);
    }

    // Initialize first line
    if (displayedLines.length === 0) {
      setDisplayedLines([{ line: currentLine, text: "", complete: false }]);
      return;
    }

    // Type characters
    if (currentCharIndex <= currentLine.text.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          const lastIndex = newLines.length - 1;
          newLines[lastIndex] = {
            ...newLines[lastIndex],
            text: currentLine.text.slice(0, currentCharIndex),
            complete: currentCharIndex === currentLine.text.length,
          };
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }

    // Move to next line
    if (currentCharIndex > currentLine.text.length) {
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }
  }, [currentLineIndex, currentCharIndex, displayedLines.length]);

  const getLinePrefix = (line: TerminalLine) => {
    switch (line.type) {
      case "command":
        return <span className="text-accent">$</span>;
      case "output":
        return <span className="text-success">→</span>;
      case "system":
        return null;
      case "ascii":
        return null;
      default:
        return null;
    }
  };

  const getLineColor = (line: TerminalLine) => {
    switch (line.type) {
      case "command":
        return "text-foreground";
      case "output":
        return "text-mutedForeground";
      case "system":
        return "text-info";
      case "ascii":
        return "text-accent";
      default:
        return "text-mutedForeground";
    }
  };

  const restartAnimation = useCallback(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTyping(true);
  }, []);

  return (
    <div className="surface overflow-hidden animate-fade-in group">
      {/* Terminal header */}
      <div className="flex items-center justify-between border-b px-4 py-2 bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-danger transition-transform group-hover:scale-110" />
          <div className="w-3 h-3 rounded-full bg-warning transition-transform group-hover:scale-110 delay-75" />
          <div className="w-3 h-3 rounded-full bg-success transition-transform group-hover:scale-110 delay-150" />
          <span className="ml-2 text-xs text-mutedForeground font-mono">
            ~/offensive-security
          </span>
        </div>
        {!isTyping && (
          <button
            onClick={restartAnimation}
            className="text-xs text-mutedForeground hover:text-accent transition-colors font-mono opacity-0 group-hover:opacity-100"
            title="Replay animation"
          >
            ↻ replay
          </button>
        )}
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-sm space-y-1 min-h-[280px] bg-gradient-to-b from-transparent to-muted/5">
        {displayedLines.map((item, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 ${getLineColor(item.line)} ${
              item.line.type === "ascii" ? "font-bold tracking-tight" : ""
            }`}
          >
            {getLinePrefix(item.line)}
            <span className={item.line.type === "command" ? "font-semibold" : ""}>
              {item.text}
              {/* Show cursor at end of current typing line */}
              {i === displayedLines.length - 1 && isTyping && !item.complete && (
                <span
                  className={`inline-block w-2 h-4 ml-0.5 bg-accent align-middle ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </span>
          </div>
        ))}
        
        {/* Final cursor after all lines complete */}
        {!isTyping && (
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="text-accent">$</span>
            <span
              className={`inline-block w-2 h-4 bg-accent ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        )}
      </div>

      {/* Subtle scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] opacity-30" />
    </div>
  );
}
