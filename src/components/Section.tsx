export function Section({
  title,
  titleClass = "section-title",
  children,
}: {
  title?: string;
  titleClass?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      {title ? <h2 className={titleClass}>{title}</h2> : null}
      {children}
    </section>
  );
}
