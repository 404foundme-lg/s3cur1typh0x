interface TimelineItem {
  date: string;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="timeline-item animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="caption">{item.date}</span>
            {item.badge && <span className="badge">{item.badge}</span>}
          </div>
          <h3 className="text-base font-semibold text-foreground">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-sm text-accent">{item.subtitle}</p>
          )}
          {item.description && (
            <p className="mt-2 text-sm text-mutedForeground">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
