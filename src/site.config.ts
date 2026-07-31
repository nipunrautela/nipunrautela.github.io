/**
 * Single source of truth for identity, navigation and metadata.
 *
 * Almost everything you will want to change day-to-day lives either here or in
 * `src/data/*.json`. Nothing in `src/components` should need editing to update
 * copy, links or personal details.
 */

export const SITE = {
  /** Canonical origin, no trailing slash. Also used by astro.config.mjs. */
  url: "https://nipunrautela.me",
  title: "Nipun Rautela",
  /** `%s` is replaced by the per-page title. */
  titleTemplate: "%s · Nipun Rautela",
  description:
    "Software engineer working on cloud infrastructure, backend systems and developer tooling. Azure, Kubernetes, Java/Spring and Python.",
  locale: "en",
  /** Shown in the footer next to the copyright. */
  startYear: 2022,
} as const;

export const PROFILE = {
  name: "Nipun Rautela",
  firstName: "Nipun",
  /** Short role label, used under the name in the hero and in JSON-LD. */
  role: "Software Engineer",
  /** The one-liner at the top of the home page. Keep it to a sentence or two. */
  headline:
    "I build and migrate cloud infrastructure, and the backend systems that run on it.",
  location: "Bangalore, India",
  email: "rautelanipun@gmail.com",

  /**
   * Availability banner. Set `open: false` to hide the pill in the hero and the
   * prompt on the contact page.
   */
  availability: {
    open: true,
    label: "Open to new opportunities",
  },

  /** Home page "about" paragraphs. Plain strings, rendered in order. */
  intro: [
    "I'm a software engineer with a background in cloud platform work — moving on-premise applications onto Azure, automating the parts of that migration nobody wants to do twice, and keeping the systems underneath fast and boring.",
    "Most recently I spent close to two years at Societe Generale Global Solution Centre, where I led container registry and CI migrations, architected AKS-based deployments, and cut a five-and-a-half hour database job down to three.",
    "Before that I worked on computer vision and data pipelines at TVS Motor, and shipped an LLM-backed email security plugin as a freelancer.",
  ],

  resume: {
    /** Lives in `public/`, so this is served verbatim. */
    href: "/nipunrautela_resume.pdf",
    label: "Résumé",
  },
} as const;

/**
 * Social links. `icon` must match a key in `src/components/ui/Icon.astro`.
 * Add or remove entries freely — the header, footer and contact page all read
 * from this array.
 */
export const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/nipunrautela",
    icon: "github",
    handle: "@nipunrautela",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nipunrautela/",
    icon: "linkedin",
    handle: "in/nipunrautela",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/nipunrautela/",
    icon: "code",
    handle: "nipunrautela",
  },
  {
    label: "Stack Overflow",
    href: "https://stackoverflow.com/users/13910633/nipun",
    icon: "stackoverflow",
    handle: "users/13910633",
  },
] as const;

/**
 * Primary navigation. Order here is the order in the header.
 *
 * The portfolio itself is a single page, so most entries are anchors into
 * sections of `/`. Entries whose href contains `#` get scroll-spy highlighting;
 * plain paths are highlighted by route.
 */
export const NAV = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Writing", href: "/blog/" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Secondary links, footer only. */
export const FOOTER_NAV = [
  { label: "Résumé", href: "/resume/" },
  { label: "Uses", href: "/uses/" },
  { label: "Now", href: "/now/" },
  { label: "RSS", href: "/rss.xml" },
] as const;
