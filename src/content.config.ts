import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Collections come in two shapes here:
 *
 *   - JSON collections (`file()` loader) for structured CV data you edit as a
 *     list: experience, education, skills.
 *   - Markdown collections (`glob()` loader) for anything with prose in it:
 *     projects, blog posts, and standalone pages like /uses and /now.
 *
 * Both are schema-validated, so a typo in a date or a missing field fails the
 * build instead of silently rendering an empty page.
 */

const experience = defineCollection({
  loader: file("src/data/experience.json"),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    /** Free-form so "Feb 2024" and "2024-02" both read correctly on the page. */
    start: z.string(),
    /** Omit or set to null for a current role — renders as "Present". */
    end: z.string().nullable().default(null),
    location: z.string(),
    type: z
      .enum(["Full-time", "Internship", "Freelance", "Contract", "Part-time"])
      .default("Full-time"),
    url: z.url().optional(),
    summary: z.string().optional(),
    highlights: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    /** Higher sorts first. Ties fall back to start date. */
    order: z.number().default(0),
  }),
});

const education = defineCollection({
  loader: file("src/data/education.json"),
  schema: z.object({
    institution: z.string(),
    qualification: z.string(),
    field: z.string().optional(),
    start: z.string(),
    end: z.string().nullable().default(null),
    location: z.string().optional(),
    /** e.g. "CGPA 8.99" or "91%" — rendered verbatim as a chip. */
    result: z.string().optional(),
    coursework: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const skills = defineCollection({
  loader: file("src/data/skills.json"),
  schema: z.object({
    /** Group heading, e.g. "Languages". */
    category: z.string(),
    items: z.array(z.string()),
    order: z.number().default(0),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One line. Used on cards, in listings and as the meta description. */
      description: z.string(),
      /** Sorts the listing, newest first. */
      date: z.coerce.date(),
      /** Drives the filter chips on /work. */
      category: z.enum([
        "Backend",
        "Cloud",
        "Web",
        "Mobile",
        "Data",
        "Tooling",
      ]),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().default(""),
      repo: z.url().optional(),
      demo: z.url().optional(),
      /** Pins to the home page. Home shows the newest `featured` entries. */
      featured: z.boolean().default(false),
      status: z.enum(["shipped", "in-progress", "archived"]).default("shipped"),
      draft: z.boolean().default(false),
    }),
});

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().default(""),
      /** Drafts are excluded from listings, RSS and the sitemap. */
      draft: z.boolean().default(false),
    }),
});

/**
 * Standalone prose pages (/uses, /now). Adding `src/content/pages/foo.md`
 * does not create a route by itself — pair it with a page in `src/pages`.
 */
const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = {
  experience,
  education,
  skills,
  projects,
  blog,
  pages,
};
