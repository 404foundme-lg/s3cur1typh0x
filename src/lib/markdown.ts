import { remark } from "remark";
import remarkHtml from "remark-html";

export async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await remark().use(remarkHtml).process(markdown);
  return processed.toString();
}
