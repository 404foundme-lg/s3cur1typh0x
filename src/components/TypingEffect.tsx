"use client";

import { useEffect, useState } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}

export function TypingEffect({
  text,
  speed = 50,
  className = "",
  showCursor = true,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span
          className={`inline-block w-0.5 h-[1em] bg-accent ml-1 ${
            isComplete ? "animate-pulse" : ""
          }`}
          style={{
            animation: isComplete ? "blink 0.8s step-end infinite" : "none",
          }}
        />
      )}
    </span>
  );
}
