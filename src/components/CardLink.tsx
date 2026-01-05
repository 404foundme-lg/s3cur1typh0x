import Link from "next/link";

export function CardLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group surface surface-pad surface-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-base font-semibold tracking-tight">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-mutedForeground">
            {description}
          </p>
        </div>
        <span className="text-sm text-mutedForeground group-hover:text-foreground">
          →
        </span>
      </div>
    </Link>
  );
}
