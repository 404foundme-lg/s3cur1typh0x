import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { markdownToHtml } from "@/lib/markdown";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  readingTime?: number; // minutes
};

export type BlogPost = {
  meta: BlogPostMeta;
  html: string;
};

const blogDir = path.join(process.cwd(), "content", "blog");

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

async function listMarkdownFiles() {
  const entries = await fs.readdir(blogDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name);
}

export const getAllPostMeta = cache(async (): Promise<BlogPostMeta[]> => {
  const files = await listMarkdownFiles();

  const metas = await Promise.all(
    files.map(async (filename) => {
      const fullPath = path.join(blogDir, filename);
      const raw = await fs.readFile(fullPath, "utf8");
      const parsed = matter(raw);
      const slug = filename.replace(/\.md$/, "");

      const title = String(parsed.data.title ?? slug);
      const date = String(parsed.data.date ?? "");
      const summary = String(parsed.data.summary ?? "");
      const tags = Array.isArray(parsed.data.tags)
        ? parsed.data.tags.map(String)
        : undefined;
      const readingTime = calculateReadingTime(parsed.content);

      return { slug, title, date, summary, tags, readingTime } satisfies BlogPostMeta;
    })
  );

  return metas
    .filter((m) => m.date)
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost> => {
  const fullPath = path.join(blogDir, `${slug}.md`);
  const raw = await fs.readFile(fullPath, "utf8");
  const parsed = matter(raw);

  const meta: BlogPostMeta = {
    slug,
    title: String(parsed.data.title ?? slug),
    date: String(parsed.data.date ?? ""),
    summary: String(parsed.data.summary ?? ""),
    tags: Array.isArray(parsed.data.tags)
      ? parsed.data.tags.map(String)
      : undefined,
    readingTime: calculateReadingTime(parsed.content),
  };

  const html = await markdownToHtml(parsed.content);
  return { meta, html };
});
