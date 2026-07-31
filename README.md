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
├── data/               # CV data as JSON (experience, education, skills, stats)
├── content/
│   ├── projects/       # one markdown file per project → /work/<slug>/
│   ├── blog/           # one markdown file per post → /blog/<slug>/
│   └── pages/          # prose for /uses and /now
├── components/
│   ├── ui/             # Button, Tag, Icon, Section
│   ├── layout/         # BaseHead, Header, Footer, theme toggle
│   ├── cards/          # ProjectCard, PostCard
│   ├── sections/       # Hero, ExperienceTimeline, SkillGrid, Stats
│   └── visuals/        # Aurora, HeroScene, Marquee, reveals, spotlight
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

`src/data/*.json` — `experience.json`, `education.json`, `skills.json` and
`stats.json` (the four headline metrics on the home page). Each file is an array
of objects validated by the schema in `src/content.config.ts`, so a missing or
misspelled field fails the build rather than rendering blank.

`skills.json` also feeds the marquee under the hero, so adding a skill shows up
in three places at once.

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

**Dark is the default.** The `dark` class is rendered server-side on `<html>`,
and the inline `ThemeScript` only ever *removes* it — when the visitor has
explicitly chosen light. That means no flash in either direction, and no
dependence on the OS setting. The site is designed dark-first; light is an
opt-in, stored in `localStorage`.

Fonts (Inter and JetBrains Mono) are self-hosted and subsetted by Astro's Fonts
API — configured in `astro.config.mjs`, with no runtime request to a font CDN.

## Motion and graphics

Everything here degrades to a static, readable page. `prefers-reduced-motion`
disables the lot.

The art direction follows what the current award-winning work actually does:
atmosphere and framing rather than spectacle, one full-screen wash plus one
object with real weight, and each section staged as a beat.

**Atmosphere** (`Aurora.astro`) — a slow-drifting aurora of blurred accent blobs
plus an SVG-turbulence film grain, both fixed behind all content. Deliberately
pure CSS: the hero already spends a WebGL context, and a second one purely for
background colour would be waste. It renders everywhere, including where WebGL
is refused.

**Hero scene** (`HeroScene.astro`) — one object, rendered with weight. A
noise-displaced icosahedron core shaded by fresnel alone, wrapped in a shell of
150 glowing nodes and the edges between them. Everything is a custom
`ShaderMaterial` — 3D simplex noise displaces the core in the vertex shader and
drives the colour mix in the fragment shader, and the nodes are procedural soft
discs, so there are no lights to configure and no textures to download.

Dark mode composites additively, which accumulates toward white — correct on a
dark background. Light mode switches to normal blending and leans on the fresnel
rim instead, because additive on white washes out to a pale blob.

three.js is `await import()`ed into its own ~724 KB chunk (~180 KB gzipped) that
no other page loads. It is skipped under reduced motion, below 640 px, and where
WebGL is unavailable — the CSS aurora is the fallback. The loop pauses when the
hero scrolls out of view or the tab is hidden, edge topology is computed once
rather than per frame, and the frame delta is clamped so a long pause cannot
fast-forward the animation on resume.

**Kinetic type** — the hero name is split into characters at build time with
staggered `animation-delay`, so the entrance needs no JavaScript. `aria-label`
carries the real name for screen readers.

**Stats** (`Stats.astro`) — headline metrics from `src/data/stats.json`, counting
up once when scrolled into view. The final values are server-rendered, so the
figures are correct with JavaScript off.

**Marquee** (`Marquee.astro`) — two counter-scrolling rows of the stack. The
track holds the list twice and translates exactly -50%, so the loop is seamless;
the visible copy is `aria-hidden` and a real list sits behind it for assistive
tech.

**Scroll progress** — native `animation-timeline: scroll()`, so no scroll
listener and no main-thread work. Behind `@supports`; where unsupported the bar
just stays empty.

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
