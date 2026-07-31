# nipunrautela.me

Personal site and portfolio, built with [Astro](https://astro.build) and
Tailwind CSS. Static output, deployed to GitHub Pages.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve the production build
npm run check    # type-check .astro and .ts files
```

Requires Node 22 or later.

## Routes

The portfolio itself is **one page**. About, experience, work and contact are
sections of `/`, and the header links to them as anchors with scroll-spy
highlighting. Only content that wants its own URL gets a route:

| Route | What it is |
| --- | --- |
| `/` | The portfolio — hero, about, skills, experience, education, work, recent writing, contact |
| `/work/<slug>/` | Project write-up, one per file in `src/content/projects/` |
| `/blog/` | Post index with tag filters |
| `/blog/<slug>/` | A post |
| `/blog/tags/<tag>/` | Posts by tag |
| `/resume/` | HTML résumé, rendered from the same JSON as the home page |
| `/uses/`, `/now/` | Standalone prose pages |
| `/rss.xml`, `/sitemap-index.xml`, `/404` | Generated |

## Where things live

```
src/
├── site.config.ts      # name, role, email, socials, navigation
├── content.config.ts   # collection schemas — the contract for all content
├── data/               # CV data as JSON (experience, education, skills)
├── content/
│   ├── projects/       # one markdown file per project → /work/<slug>/
│   ├── blog/           # one markdown file per post → /blog/<slug>/
│   └── pages/          # prose for /uses and /now
├── components/
│   ├── ui/             # Button, Tag, Icon, Section
│   ├── layout/         # BaseHead, Header, Footer, theme toggle
│   ├── cards/          # ProjectCard, PostCard
│   └── sections/       # Hero, ExperienceTimeline, SkillGrid
├── layouts/            # BaseLayout → PageLayout / ProseLayout
├── pages/              # routes; index.astro is the whole portfolio
├── lib/                # utils and the SVG icon registry
├── assets/             # images processed by Astro (optimised at build)
└── styles/global.css   # design tokens, base styles, prose styles

public/                 # served verbatim: CNAME, résumé PDF, favicon, OG image
scripts/                # one-off asset generation
```

The guiding rule: **content is data, not markup.** You should never need to edit
a component to change what the site says.

## Editing content

### Personal details, links, navigation

`src/site.config.ts`. Name, role, headline, location, email, availability
status, the intro paragraphs on the home page, social links and both navigation
menus all live there.

Nav entries whose `href` contains `#` are treated as anchors into the home page
and get scroll-spy highlighting; plain paths are highlighted by route. So adding
a new section is: give the `<Section>` an `id`, add `{ label, href: "/#id" }` to
`NAV`, and the header wires itself up.

Adding a social link needs an icon key that exists in `src/lib/icons.ts` — paste
new SVG path data there if the one you want is missing.

### Experience, education, skills

`src/data/*.json`. Each file is an array of objects validated by the schema in
`src/content.config.ts`, so a missing or misspelled field fails the build rather
than rendering blank.

Ordering is by the `order` field, highest first. For a current role, set
`"end": null` and it renders as "Present".

### A new project

Create `src/content/projects/my-project.md`. The filename becomes the URL.

```markdown
---
title: "My Project"
description: "One line, used on cards and as the meta description."
date: 2026-07-01
category: "Backend" # Backend | Cloud | Web | Mobile | Data | Tooling
tags: ["Python", "PostgreSQL"]
cover: "../../assets/projects/my-project.png" # optional
coverAlt: "Screenshot of my project"
repo: "https://github.com/nipunrautela/my-project" # optional
demo: "https://example.com" # optional
featured: true # pins it to the home page
status: "shipped" # shipped | in-progress | archived
---

Markdown body.
```

The project appears in the Work section of the home page automatically, and gets
its own page at `/work/<slug>/`. Categories drive the filter chips — add a value
to the enum in `content.config.ts` and the chip appears.

`featured: true` currently only affects the Selected Projects list on
`/resume/`; the home page shows every project.

### A new blog post

Create `src/content/blog/my-post.md`.

```markdown
---
title: "My Post"
description: "One line summary."
pubDate: 2026-07-01
updatedDate: 2026-07-15 # optional
tags: ["PostgreSQL", "Performance"]
draft: false
---

Markdown body. Code blocks are highlighted by Shiki in both themes.
```

Tag pages at `/blog/tags/<tag>/` and the RSS feed are generated from posts — no
extra wiring. Drafts (`draft: true`) render in `npm run dev` so you can preview
them, and are excluded from production builds, RSS and the sitemap.

### /uses and /now

`src/content/pages/uses.md` and `src/content/pages/now.md`. Plain markdown; bump
`updatedDate` when you change them.

### Résumé PDF

Replace `public/nipunrautela_resume.pdf`. The link in `site.config.ts` points at
it, and `/resume/` renders an HTML version from the same JSON data — update
`src/data/*.json` alongside the PDF so the two agree.

## Design

Design tokens are CSS custom properties in `src/styles/global.css`, mapped into
Tailwind utilities via `@theme inline`. To restyle the site, change the values
under `:root` and `.dark` — every component reads from those, so nothing else
needs touching.

Dark mode is class-based on `<html>`, set before first paint by an inline script
so there is no flash. It follows the OS preference until the user picks a theme,
after which the choice is stored in `localStorage`.

Fonts (Inter and JetBrains Mono) are self-hosted and subsetted by Astro's Fonts
API — configured in `astro.config.mjs`, with no runtime request to a font CDN.

## Motion and graphics

Everything here degrades to a static, readable page. `prefers-reduced-motion`
disables the lot.

**Hero scene** (`components/visuals/HeroScene.astro`) — a three.js node graph:
130 points on a jittered Fibonacci sphere, edges drawn between neighbours within
a fixed radius, rotating slowly with pointer parallax. It reads the live
`--accent` token so it follows the theme toggle.

three.js is `await import()`ed, so it lands in its own ~724 KB chunk (~180 KB
gzipped) that no other page loads. It is skipped entirely under reduced motion,
under 640 px wide, and where WebGL is unavailable — the CSS gradient underneath
is the fallback, so nothing looks broken when it never arrives. The render loop
pauses when the hero scrolls out of view or the tab is hidden, and edge topology
is computed once rather than per frame.

**Page transitions** use the native CSS `@view-transition` rule — no client-side
router. Project cards and their detail pages share a `view-transition-name`, so
clicking a card morphs it into the article header rather than cross-fading.

**Scroll reveals** (`ScrollReveal.astro`) — elements marked `data-reveal` fade
and rise in via IntersectionObserver, with `data-reveal-delay` for staggering.
The hidden state is applied from JS, so content is never stranded invisible if
the script fails.

**Spotlight cards** (`Spotlight.astro`) — cards marked `data-spotlight` track the
cursor into CSS custom properties, driving a radial highlight and a gradient
border. Skipped on coarse pointers.

Excluding the lazy three.js chunk, total JavaScript is a few kilobytes: theme
toggle, mobile menu, scroll spy, project filter, reveals, spotlight and the
copy-email button.

## Social image

`public/og-default.png` is committed, and regenerated with:

```bash
npm run assets
```

Edit the name, tagline and colours at the top of `scripts/generate-assets.mjs`.
Per-page OG images are not generated; `BaseHead.astro` accepts an `image` prop if
you want to point a specific page at its own.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which type-checks,
builds, and publishes `dist/` to GitHub Pages.

The custom domain is set by `public/CNAME`, which the build copies into `dist/`
on every deploy — so it survives, unlike a CNAME configured only in the repo
settings.

**One-time setup:** in the repository settings, under Pages, set the source to
**GitHub Actions**. Serving from a branch will keep publishing the old site.

## Licence

MIT — see [LICENSE](./LICENSE).
