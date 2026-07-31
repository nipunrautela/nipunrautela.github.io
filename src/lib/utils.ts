import type { CollectionEntry } from "astro:content";

/** Ensure a path has exactly one leading and one trailing slash. */
export function normalizePath(path: string): string {
  const trimmed = path.replace(/\/+$/, "").replace(/^\/*/, "/");
  return trimmed === "/" ? "/" : `${trimmed}/`;
}

/**
 * True when `current` is `href` or lives beneath it, so `/blog/my-post/`
 * highlights the "Writing" nav item. `/` only ever matches itself.
 *
 * Anchor links (`/#work`) always return false here — there is no hash at build
 * time, so the header's scroll-spy script owns their state on the client.
 */
export function isActivePath(current: string, href: string): boolean {
  if (href.includes("#")) return false;

  const a = normalizePath(current);
  const b = normalizePath(href);
  return b === "/" ? a === "/" : a === b || a.startsWith(b);
}

/** e.g. "12 March 2026" */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** e.g. "Mar 2026" — for compact timeline entries. */
export function formatMonth(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(date);
}

/** Renders an experience/education span, treating a null end as ongoing. */
export function formatRange(start: string, end: string | null): string {
  return `${start} — ${end ?? "Present"}`;
}

/** Rough reading time from word count, floored at one minute. */
export function readingTime(body: string | undefined): string {
  const words = (body ?? "").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/** Newest first, excluding drafts in production builds. */
export function sortByDate<
  T extends { data: { pubDate?: Date; date?: Date } },
>(entries: T[]): T[] {
  return [...entries].sort(
    (a, b) =>
      (b.data.pubDate ?? b.data.date ?? new Date(0)).valueOf() -
      (a.data.pubDate ?? a.data.date ?? new Date(0)).valueOf(),
  );
}

/**
 * Drafts stay visible in `astro dev` so you can preview them, and are dropped
 * from production builds, RSS and the sitemap.
 */
export function isPublished(entry: { data: { draft?: boolean } }): boolean {
  return import.meta.env.DEV || !entry.data.draft;
}

/** Unique tags across entries, with counts, sorted by frequency then name. */
export function collectTags(
  entries: Array<CollectionEntry<"blog"> | CollectionEntry<"projects">>,
): Array<{ tag: string; count: number }> {
  const counts = new Map<string, number>();

  for (const entry of entries) {
    for (const tag of entry.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** URL-safe slug, used for tag routes. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
