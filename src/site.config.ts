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
    "Software engineer at Visa, building scalable distributed systems: event-driven, active-active and multi-region. Java/Spring, Hazelcast, Azure and Kubernetes.",
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
    "I build software that scales, self-heals, and stays online through change.",
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
    "I'm a software engineer at Visa, working on an Ansible automation orchestration platform as it moves off a large BPMN monolith and onto event-driven processors, built on self-healing active-active queues, a cross-region scheduler, and the migration machinery that let all of it ship without a minute of downtime.",
    "Before that, close to two years at Societe Generale Global Solution Centre: moving on-premise applications onto Azure, automating the parts of that migration nobody wants to do twice, and taking a nightly database job from five and a half hours down to three.",
    "The through-line is systems other people depend on. I'm drawn to the problems where correctness under failure matters more than throughput on a good day: in-flight state you can't drop, cutovers that can't take an outage, and jobs that have to fire across two data centres and still run exactly once.",
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
  { label: "Projects", href: "/#projects" },
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
