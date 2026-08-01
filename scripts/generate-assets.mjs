/**
 * Generates the static social-share image and the apple-touch icon.
 *
 * These are build inputs, not build outputs — they are committed to `public/`
 * so the site builds without needing image tooling in CI. Re-run with
 * `npm run assets` after changing the name, role or palette below.
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public");

const NAME = "Nipun Rautela";
const ROLE = "Software Engineer";
const TAGLINE = "Distributed systems · Event-driven backends";
const DOMAIN = "nipunrautela.me";

const BG = "#0a0a0d";
const FG = "#f2f2f5";
const MUTED = "#a3a3b0";
const ACCENT = "#8b8cf8";

/** System stack — resolved by librsvg at render time, not by the browser. */
const FONT = "Segoe UI, Inter, Helvetica Neue, Arial, sans-serif";

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="0" y="0" width="1200" height="6" fill="${ACCENT}"/>

  <g opacity="0.07" stroke="${FG}" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="630"/>`).join("")}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1200" y2="${i * 100}"/>`).join("")}
  </g>

  <text x="90" y="250" font-family="${FONT}" font-size="82" font-weight="700"><tspan fill="${FG}">${NAME}</tspan><tspan fill="${ACCENT}">.</tspan></text>

  <rect x="90" y="292" width="72" height="4" rx="2" fill="${ACCENT}"/>

  <text x="90" y="360" font-family="${FONT}" font-size="38" font-weight="500" fill="${MUTED}">${ROLE}</text>
  <text x="90" y="418" font-family="${FONT}" font-size="30" fill="${MUTED}" opacity="0.8">${TAGLINE}</text>

  <text x="90" y="545" font-family="${FONT}" font-size="26" font-weight="500" fill="${ACCENT}">${DOMAIN}</text>
</svg>`;

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#4f46e5"/>
  <path d="M20 45V19h5.6l13.2 17.1V19H44v26h-5.5L25.2 27.7V45z" fill="#fff"/>
  <circle cx="47" cy="43" r="3" fill="#a5b4fc"/>
</svg>`;

await mkdir(outDir, { recursive: true });

await sharp(Buffer.from(ogSvg))
  .png({ compressionLevel: 9 })
  .toFile(join(outDir, "og-default.png"));

await sharp(Buffer.from(iconSvg))
  .png({ compressionLevel: 9 })
  .toFile(join(outDir, "apple-touch-icon.png"));

console.log("Wrote public/og-default.png and public/apple-touch-icon.png");
