"use client";

import { useEffect, useState, useRef } from "react";

interface Skill {
  name: string;
  level: number; // 0-100
  category?: string;
}

interface SkillBarProps {
  skills: Skill[];
}

export function SkillBar({ skills }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-4">
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {skill.name}
            </span>
            <span className="text-xs text-mutedForeground">{skill.level}%</span>
          </div>
          <div className="skill-bar">
            <div
              className="skill-bar-fill"
              style={{
                width: isVisible ? `${skill.level}%` : "0%",
                transitionDelay: `${index * 0.1}s`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface SkillGridProps {
  skills: Array<{
    name: string;
    description?: string;
  }>;
}

export function SkillGrid({ skills }: SkillGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className="surface surface-pad-sm surface-hover card-lift animate-fade-in"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <p className="text-sm font-medium text-foreground">{skill.name}</p>
          {skill.description && (
            <p className="mt-1 text-xs text-mutedForeground">
              {skill.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
