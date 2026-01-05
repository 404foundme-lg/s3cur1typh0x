"use client";

import { useState, useEffect } from "react";

interface Credential {
  name: string;
  date?: string;
  note?: string;
}

interface CertVerifierProps {
  credentials: Credential[];
  title: string;
}

export function CertVerifier({ credentials, title }: CertVerifierProps) {
  const [phase, setPhase] = useState(0);
  const [verifiedCerts, setVerifiedCerts] = useState<number[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Verification sequence
  useEffect(() => {
    if (phase === 0) {
      const timer = setTimeout(() => setPhase(1), 300);
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
    if (phase >= 3 && verifiedCerts.length < credentials.length) {
      const timer = setTimeout(() => {
        setVerifiedCerts((prev) => [...prev, prev.length]);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [phase, verifiedCerts.length, credentials.length]);

  const isComplete = verifiedCerts.length === credentials.length;

  return (
    <div className="surface overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b px-4 py-2 bg-muted/30">
        <div className="w-3 h-3 rounded-full bg-danger" />
        <div className="w-3 h-3 rounded-full bg-warning" />
        <div className="w-3 h-3 rounded-full bg-success" />
        <span className="ml-2 text-xs text-mutedForeground font-mono">verify-credentials.sh</span>
        {isComplete && (
          <span className="ml-auto text-xs font-mono text-success">
            {credentials.length}/{credentials.length} VERIFIED
          </span>
        )}
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-xs sm:text-sm space-y-1">
        {/* Command */}
        <p className="text-mutedForeground">
          <span className="text-accent">$</span> gpg --verify {title.toLowerCase().replace(/\s+/g, "-")}.sig
        </p>

        {/* Init phases */}
        {phase >= 1 && (
          <p className="text-info animate-fade-in mt-2">
            [*] Loading certificate store...
          </p>
        )}
        {phase >= 2 && (
          <p className="text-info animate-fade-in">
            [*] Validating signatures against trusted roots...
          </p>
        )}
        {phase >= 3 && (
          <p className="text-success animate-fade-in mb-2">
            [+] {credentials.length} credentials found for verification
          </p>
        )}

        {/* Credentials */}
        <div className="space-y-2 mt-3">
          {credentials.map((cred, i) => (
            verifiedCerts.includes(i) && (
              <div
                key={`${cred.name}-${i}`}
                className="flex items-start gap-3 animate-fade-in p-2 rounded bg-muted/20"
              >
                <span className="text-success mt-0.5">✓</span>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-medium truncate">{cred.name}</p>
                  <div className="flex flex-wrap gap-x-3 text-xs text-mutedForeground">
                    {cred.date && <span>Issued: {cred.date}</span>}
                    {cred.note && <span className="text-info">{cred.note}</span>}
                  </div>
                </div>
                <span className="text-success text-xs shrink-0">VALID</span>
              </div>
            )
          ))}
        </div>

        {/* Completion */}
        {isComplete && (
          <div className="mt-4 pt-3 border-t border-muted/50">
            <p className="text-success animate-fade-in">
              [+] All credentials verified successfully
            </p>
            <p className="text-mutedForeground text-xs mt-1">
              Signature validation: SHA-256 | Status: TRUSTED
            </p>
          </div>
        )}

        {/* Cursor */}
        {!isComplete && phase >= 3 && (
          <p className="mt-3">
            <span className="text-accent">$</span>{" "}
            <span className={`inline-block w-2 h-4 bg-accent ${showCursor ? "opacity-100" : "opacity-0"}`} />
          </p>
        )}
      </div>
    </div>
  );
}
