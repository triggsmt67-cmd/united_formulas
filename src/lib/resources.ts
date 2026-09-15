import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ResourceArticle {
  title: string;
  slug: string;
  description: string;
  metaTitle: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  locality: string;
  readingTime: string;
  printable: boolean;
  ogImage?: string;
  draft: boolean;
}

const RESOURCES_DIR = path.join(process.cwd(), "content/resources");

function validateAndFormatArticle(filename: string, rawData: Record<string, unknown>): ResourceArticle {
  const fileRef = `content/resources/${filename}`;

  if (!rawData.title || typeof rawData.title !== "string") {
    throw new Error(`[Resource Validation Error] Missing or invalid 'title' in ${fileRef}`);
  }

  const slug = (typeof rawData.slug === "string" && rawData.slug.trim())
    ? rawData.slug.trim()
    : filename.replace(/\.md$/, "");

  if (!rawData.description || typeof rawData.description !== "string") {
    throw new Error(`[Resource Validation Error] Missing or invalid 'description' in ${fileRef}`);
  }

  const metaTitle = typeof rawData.metaTitle === "string"
    ? rawData.metaTitle
    : typeof rawData.metatitle === "string"
    ? rawData.metatitle
    : rawData.title;

  if (!metaTitle || typeof metaTitle !== "string") {
    throw new Error(`[Resource Validation Error] Missing or invalid 'metaTitle' in ${fileRef}`);
  }

  if (!rawData.date) {
    throw new Error(`[Resource Validation Error] Missing 'date' in ${fileRef}`);
  }
  const dateStr = rawData.date instanceof Date
    ? rawData.date.toISOString().slice(0, 10)
    : String(rawData.date);

  if (!rawData.author || typeof rawData.author !== "string") {
    throw new Error(`[Resource Validation Error] Missing or invalid 'author' in ${fileRef}`);
  }

  if (!rawData.category || typeof rawData.category !== "string") {
    throw new Error(`[Resource Validation Error] Missing or invalid 'category' in ${fileRef}`);
  }

  if (!Array.isArray(rawData.tags)) {
    throw new Error(`[Resource Validation Error] Missing or non-array 'tags' in ${fileRef}`);
  }

  if (!rawData.primaryKeyword || typeof rawData.primaryKeyword !== "string") {
    throw new Error(`[Resource Validation Error] Missing or invalid 'primaryKeyword' in ${fileRef}`);
  }

  if (!Array.isArray(rawData.secondaryKeywords)) {
    throw new Error(`[Resource Validation Error] Missing or non-array 'secondaryKeywords' in ${fileRef}`);
  }

  if (!rawData.locality || typeof rawData.locality !== "string") {
    throw new Error(`[Resource Validation Error] Missing or invalid 'locality' in ${fileRef}`);
  }

  if (!rawData.readingTime || typeof rawData.readingTime !== "string") {
    throw new Error(`[Resource Validation Error] Missing or invalid 'readingTime' in ${fileRef}`);
  }

  const printable = rawData.printable === undefined ? true : Boolean(rawData.printable);
  const draft = Boolean(rawData.draft);
  const ogImage = typeof rawData.ogImage === "string" ? rawData.ogImage : undefined;

  return {
    title: rawData.title,
    slug,
    description: rawData.description,
    metaTitle,
    date: dateStr,
    author: rawData.author,
    category: rawData.category,
    tags: rawData.tags as string[],
    primaryKeyword: rawData.primaryKeyword,
    secondaryKeywords: rawData.secondaryKeywords as string[],
    locality: rawData.locality,
    readingTime: rawData.readingTime,
    printable,
    ogImage,
    draft,
  };
}

export function getAllResources(): ResourceArticle[] {
  if (!fs.existsSync(RESOURCES_DIR)) {
    return [];
  }

  const filenames = fs.readdirSync(RESOURCES_DIR).filter((file) => file.endsWith(".md"));

  const articles: ResourceArticle[] = [];

  for (const filename of filenames) {
    const fullPath = path.join(RESOURCES_DIR, filename);
    const rawFile = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(rawFile);
    const meta = validateAndFormatArticle(filename, parsed.data);

    if (!meta.draft) {
      articles.push(meta);
    }
  }

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getResourceBySlug(slug: string): { meta: ResourceArticle; body: string } | null {
  if (!fs.existsSync(RESOURCES_DIR)) {
    return null;
  }

  const filenames = fs.readdirSync(RESOURCES_DIR).filter((file) => file.endsWith(".md"));

  for (const filename of filenames) {
    const fullPath = path.join(RESOURCES_DIR, filename);
    const rawFile = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(rawFile);
    const meta = validateAndFormatArticle(filename, parsed.data);

    if (meta.slug === slug) {
      if (meta.draft) return null;
      return {
        meta,
        body: parsed.content,
      };
    }
  }

  return null;
}
