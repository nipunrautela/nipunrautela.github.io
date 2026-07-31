/**
 * Inline SVG icon registry — no runtime, no icon font, no extra dependency.
 *
 * Outline icons use Lucide geometry (24x24, stroked). Brand marks are filled
 * paths from Simple Icons. To add an icon, paste its inner SVG markup here.
 */

export type IconDef = {
  /** Inner SVG markup for a 24x24 viewBox. */
  d: string;
  /** Brand marks are filled; UI icons are stroked. */
  filled?: boolean;
};

export const ICONS = {
  // --- Brand ---
  github: {
    filled: true,
    d: '<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"/>',
  },
  linkedin: {
    filled: true,
    d: '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/>',
  },
  stackoverflow: {
    filled: true,
    d: '<path d="M18.99 21.3v-6.36h2.11V24H2.9v-9.06h2.1v6.36h13.99Z"/><path d="m7.11 15.16 10.29 2.16.44-2.08-10.29-2.16-.44 2.08Zm1.36-4.9 9.53 4.44.9-1.92-9.53-4.45-.9 1.93Zm2.64-4.66 8.08 6.73 1.35-1.62-8.08-6.73-1.35 1.62ZM16.34 0l-1.7 1.27 6.28 8.43 1.7-1.27L16.34 0ZM6.9 19.24h10.5v-2.1H6.9v2.1Z"/>',
  },

  // --- UI ---
  code: {
    d: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  },
  mail: {
    d: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  },
  "arrow-right": {
    d: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  },
  "arrow-left": {
    d: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  },
  "arrow-up-right": {
    d: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  },
  download: {
    d: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  },
  sun: {
    d: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  },
  moon: {
    d: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  },
  menu: {
    d: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  },
  close: {
    d: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  },
  "map-pin": {
    d: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  },
  calendar: {
    d: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  },
  briefcase: {
    d: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  },
  "graduation-cap": {
    d: '<path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/><path d="M2 10 12 5l10 5-10 5z"/>',
  },
  rss: {
    d: '<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>',
  },
  copy: {
    d: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  },
  check: {
    d: '<path d="M20 6 9 17l-5-5"/>',
  },
  layers: {
    d: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m6.08 10.37-3.48 1.6a1 1 0 0 0 0 1.83l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.48-1.6"/><path d="m6.08 15.87-3.48 1.6a1 1 0 0 0 0 1.83l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.48-1.6"/>',
  },
  terminal: {
    d: '<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',
  },
  zap: {
    d: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  },
} as const satisfies Record<string, IconDef>;

export type IconName = keyof typeof ICONS;
