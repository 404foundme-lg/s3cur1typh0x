"use client";

import { useState, useEffect, useCallback } from "react";

interface AttackStep {
  phase: string;
  command: string;
  output: string;
  tactic?: string;
}

interface AttackChainTerminalProps {
  steps: AttackStep[];
  title?: string;
}

export function AttackChainTerminal({ steps, title = "Attack Simulation" }: AttackChainTerminalProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [typedCommand, setTypedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    if (isPaused) return;
    
    // Initial delay
    if (currentStep === -1) {
      const timer = setTimeout(() => setCurrentStep(0), 800);
      return () => clearTimeout(timer);
    }

    if (currentStep >= steps.length) {
      setIsComplete(true);
      return;
    }

    const step = steps[currentStep];

    // Type command character by character
    if (typedCommand.length < step.command.length) {
      const timer = setTimeout(() => {
        setTypedCommand(step.command.slice(0, typedCommand.length + 1));
      }, 30 + Math.random() * 20);
      return () => clearTimeout(timer);
    }

    // Show output after command is typed
    if (!showOutput) {
      const timer = setTimeout(() => setShowOutput(true), 300);
      return () => clearTimeout(timer);
    }

    // Move to next step
    const timer = setTimeout(() => {
      setTypedCommand("");
      setShowOutput(false);
      setCurrentStep((prev) => prev + 1);
    }, 1200);
    return () => clearTimeout(timer);
  }, [currentStep, typedCommand, showOutput, steps, isPaused]);

  const restart = useCallback(() => {
    setCurrentStep(-1);
    setTypedCommand("");
    setShowOutput(false);
    setIsComplete(false);
    setIsPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  return (
    <div className="surface overflow-hidden group">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b px-4 py-2 bg-muted/30">
        <div className="w-3 h-3 rounded-full bg-danger" />
        <div className="w-3 h-3 rounded-full bg-warning" />
        <div className="w-3 h-3 rounded-full bg-success" />
        <span className="ml-2 text-xs text-mutedForeground font-mono">{title.toLowerCase().replace(/\s+/g, "-")}.sh</span>
        
        <div className="ml-auto flex items-center gap-2">
          {!isComplete && currentStep >= 0 && (
            <span className="text-xs font-mono text-info">
              {currentStep + 1}/{steps.length}
            </span>
          )}
          {isComplete && (
            <span className="text-xs font-mono text-success">COMPLETE</span>
          )}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {!isComplete && (
              <button
                onClick={togglePause}
                className="text-xs text-mutedForeground hover:text-accent transition-colors font-mono px-1"
              >
                {isPaused ? "▶" : "⏸"}
              </button>
            )}
            <button
              onClick={restart}
              className="text-xs text-mutedForeground hover:text-accent transition-colors font-mono px-1"
            >
              ↻
            </button>
          </div>
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-xs sm:text-sm min-h-[200px] max-h-[400px] overflow-y-auto">
        {/* Completed steps */}
        {steps.slice(0, currentStep).map((step, i) => (
          <div key={i} className="mb-4">
            <p className="text-mutedForeground/60 text-xs mb-1">
              # Phase: {step.phase} {step.tactic && `| ${step.tactic}`}
            </p>
            <p>
              <span className="text-accent">$</span>{" "}
              <span className="text-foreground">{step.command}</span>
            </p>
            <p className="text-success mt-1 pl-4">{step.output}</p>
          </div>
        ))}

        {/* Current step */}
        {currentStep >= 0 && currentStep < steps.length && (
          <div className="mb-4">
            <p className="text-info text-xs mb-1 animate-fade-in">
              # Phase: {steps[currentStep].phase} {steps[currentStep].tactic && `| ${steps[currentStep].tactic}`}
            </p>
            <p>
              <span className="text-accent">$</span>{" "}
              <span className="text-foreground">{typedCommand}</span>
              {!showOutput && (
                <span className={`inline-block w-2 h-4 ml-0.5 bg-accent align-middle ${showCursor ? "opacity-100" : "opacity-0"}`} />
              )}
            </p>
            {showOutput && (
              <p className="text-success mt-1 pl-4 animate-fade-in">
                {steps[currentStep].output}
              </p>
            )}
          </div>
        )}

        {/* Completion */}
        {isComplete && (
          <div className="mt-4 pt-3 border-t border-muted/50 animate-fade-in">
            <p className="text-success">[+] Attack chain simulation complete</p>
            <p className="text-mutedForeground text-xs mt-1">
              {steps.length} phases executed | All objectives achieved
            </p>
            <p className="mt-3">
              <span className="text-accent">$</span>{" "}
              <span className={`inline-block w-2 h-4 bg-accent ${showCursor ? "opacity-100" : "opacity-0"}`} />
            </p>
          </div>
        )}

        {/* Initial cursor */}
        {currentStep === -1 && (
          <p>
            <span className="text-accent">$</span>{" "}
            <span className={`inline-block w-2 h-4 bg-accent ${showCursor ? "opacity-100" : "opacity-0"}`} />
          </p>
        )}
      </div>
    </div>
  );
}
