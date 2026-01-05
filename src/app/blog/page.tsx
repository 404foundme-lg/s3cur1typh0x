import Link from "next/link";
import { Clock } from "lucide-react";
import { Section } from "@/components/Section";
import { getAllPostMeta } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getAllPostMeta();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <p className="kicker">Insights & Notes</p>
        <h1 className="page-title">Blog</h1>
        <p className="page-lede">
          Operator-focused writing: failures, tradeoffs, and how detection influenced
          decisions. Content is curated for mid-to-senior audiences.
        </p>
      </section>

      {/* Posts */}
      <Section title="Recent Posts">
        <div className="space-y-4">
          {posts.map((p, i) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card-interactive card-lift group block animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold tracking-tight group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-mutedForeground line-clamp-2">
                    {p.summary}
                  </p>
                  {p.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="caption">{p.date}</span>
                  {p.readingTime && (
                    <span className="caption flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {p.readingTime} min
                    </span>
                  )}
                  <span className="text-mutedForeground group-hover:text-accent transition-colors">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
