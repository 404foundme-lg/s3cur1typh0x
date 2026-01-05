"use client";

import { useState, useEffect } from "react";

interface ConnectionTerminalProps {
  onComplete?: () => void;
}

const connectionSequence = [
  { text: "Initializing secure channel...", type: "info", delay: 0 },
  { text: "Generating ephemeral keypair...", type: "info", delay: 400 },
  { text: "ECDH-P384 keypair generated", type: "success", delay: 800 },
  { text: "Establishing TLS 1.3 handshake...", type: "info", delay: 1100 },
  { text: "Certificate chain validated ✓", type: "success", delay: 1500 },
  { text: "Perfect forward secrecy: ENABLED", type: "success", delay: 1800 },
  { text: "Verifying endpoint authenticity...", type: "info", delay: 2100 },
  { text: "Fingerprint: SHA256:a4Xb...7Kp9", type: "muted", delay: 2400 },
  { text: "Identity confirmed", type: "success", delay: 2700 },
  { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", type: "divider", delay: 3000 },
  { text: "SECURE CONNECTION ESTABLISHED", type: "highlight", delay: 3200 },
  { text: "Cipher: TLS_AES_256_GCM_SHA384", type: "muted", delay: 3400 },
  { text: "Ready for communication", type: "success", delay: 3600 },
];

export function ConnectionTerminal({ onComplete }: ConnectionTerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<typeof connectionSequence>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Connection sequence
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    connectionSequence.forEach((line, index) => {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        if (index === connectionSequence.length - 1) {
          setIsComplete(true);
          onComplete?.();
        }
      }, line.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const getLineStyle = (type: string) => {
    switch (type) {
      case "info": return "text-info";
      case "success": return "text-success";
      case "muted": return "text-mutedForeground";
      case "highlight": return "text-accent font-bold";
      case "divider": return "text-muted";
      default: return "text-foreground";
    }
  };

  const getPrefix = (type: string) => {
    switch (type) {
      case "info": return "[*]";
      case "success": return "[+]";
      case "muted": return "   ";
      case "highlight": return "[✓]";
      case "divider": return "";
      default: return "";
    }
  };

  return (
    <div className="surface overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b px-4 py-2 bg-muted/30">
        <div className="w-3 h-3 rounded-full bg-danger" />
        <div className="w-3 h-3 rounded-full bg-warning" />
        <div className="w-3 h-3 rounded-full bg-success" />
        <span className="ml-2 text-xs text-mutedForeground font-mono">secure-connect.sh</span>
        {isComplete && (
          <span className="ml-auto flex items-center gap-1.5 text-xs font-mono text-success">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            ENCRYPTED
          </span>
        )}
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-xs sm:text-sm space-y-1 min-h-[180px]">
        <p className="text-mutedForeground mb-2">
          <span className="text-accent">$</span> ./establish-secure-channel.sh --verify
        </p>
        
        {displayedLines.map((line, i) => (
          <p key={i} className={`animate-fade-in ${getLineStyle(line.type)}`}>
            {getPrefix(line.type)} {line.text}
          </p>
        ))}

        {/* Cursor */}
        {!isComplete && (
          <p className="mt-2">
            <span className="text-accent">$</span>{" "}
            <span className={`inline-block w-2 h-4 bg-accent ${showCursor ? "opacity-100" : "opacity-0"}`} />
          </p>
        )}
      </div>
    </div>
  );
}
