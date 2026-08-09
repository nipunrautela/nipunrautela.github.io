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
    "Software engineer building large-scale distributed backends: event-driven, active-active and multi-region. Java/Spring, Hazelcast, Azure and Kubernetes.",
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
    "I build large-scale distributed backends that scale, self-heal, and stay online through change.",
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
    "I'm a backend engineer working on large-scale distributed systems: event-driven services, self-healing active-active clusters, cross-region schedulers, and the migration machinery that lets platforms change shape underneath their users without going offline. Most of what I build is orchestration at volume, where a request is not one call but hundreds of moving executions that all have to land.",
    "The work is mostly the unglamorous half of a backend: designing service boundaries and APIs, moving live state between two architectures without dropping any of it, rate limiting the callers that would otherwise take the platform down, and putting enough observability in place to know what actually happened at 3am. Around that sits the ordinary craft, tests worth trusting, pipelines that deploy without ceremony, and cloud infrastructure and CI provisioned as code rather than by hand.",
    "I also spend time on the tooling that makes all of this testable: simulators that stand in for systems too expensive to hit for real, and, lately, tool-calling LLM agents layered over them so the tedious parts of the job take minutes instead of an afternoon.",
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
