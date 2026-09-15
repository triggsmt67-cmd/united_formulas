import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

export async function renderMarkdown(body: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm) // task lists, autolinks, strikethrough, tables
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug) // heading anchors for future TOC
    .use(rehypeStringify)
    .process(body);
  return String(file);
}
