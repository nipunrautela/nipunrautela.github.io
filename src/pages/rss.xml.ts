import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE, PROFILE } from "../site.config";
import { sortByDate } from "../lib/utils";

export async function GET(context: APIContext) {
  // Drafts never reach the feed, regardless of environment.
  const posts = sortByDate(
    await getCollection("blog", ({ data }) => !data.draft),
  );

  return rss({
    title: `${SITE.title} · Writing`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
      author: `${PROFILE.email} (${PROFILE.name})`,
    })),
    customData: `<language>en-gb</language>`,
  });
}
