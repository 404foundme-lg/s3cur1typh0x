import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { getAllPostMeta, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getAllPostMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);

    return (
      <div className="space-y-10">
        {/* Header */}
        <header className="space-y-4">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-mutedForeground hover:text-accent transition-colors">
            ← Back to Blog
          </Link>
          <h1 className="page-title">{post.meta.title}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <span className="caption">{post.meta.date}</span>
            {post.meta.readingTime && (
              <span className="caption flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.meta.readingTime} min read
              </span>
            )}
            {post.meta.tags && (
              <div className="flex flex-wrap gap-2">
                {post.meta.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <p className="page-lede">{post.meta.summary}</p>
        </header>

        <div className="divider" />

        {/* Content */}
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {/* Footer */}
        <div className="divider" />
        <footer className="flex items-center justify-between">
          <Link href="/blog" className="action">
            ← All Posts
          </Link>
          <Link href="/contact" className="action-primary">
            Get in Touch
          </Link>
        </footer>
      </div>
    );
  } catch {
    return notFound();
  }
}
