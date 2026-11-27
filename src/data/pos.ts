// Screenshots are optional at build time: any WebP dropped into src/assets/pos/
// is picked up here, and components fall back to an illustration when missing.
const files = import.meta.glob<string>('../assets/pos/*.webp', { eager: true, import: 'default' })

export function posShot(name: string): string | undefined {
  return files[`../assets/pos/${name}.webp`]
}

export const POS = {
  name: 'Ryan’s POS',
  tagline: 'Offline-first point of sale for Philippine cafés, salons and retail.',
  pitch:
    'Keeps selling when the internet drops, and syncs safely when it comes back. Built for the details local shops actually deal with: VAT breakdowns, Senior and PWD discounts, X and Z readings, GCash and Maya.',
  stats: [
    { value: '4,100+', label: 'automated tests' },
    { value: '100%', label: 'offline counter' },
    { value: '8 weeks', label: 'first commit to production-ready' },
  ],
  chips: ['Angular', 'NestJS', 'PostgreSQL', 'Prisma', 'PWA', 'Docker'],
}

export const POS_PROBLEMS = [
  {
    title: 'Sync that can’t double-charge',
    body: 'Every record gets its ID on the device, so retries are harmless. The server stores each item in its own serializable transaction and answers stored, duplicate, deferred or rejected. Anything rejected lands in a Needs Attention queue for a manager instead of disappearing.',
  },
  {
    title: 'The server trusts nothing',
    body: 'Client and server share one TypeScript rules package for pricing, VAT and discounts. The server recomputes every sale it receives and flags any mismatch on a reconciliation report.',
  },
  {
    title: 'Money is append-only',
    body: 'Amounts are integer centavos. Voids and refunds are new records, never edits, and every counter issues gap-free invoice numbers, so the books always add up.',
  },
  {
    title: 'Sign-in without a connection',
    body: 'Staff log in with a PIN that can be verified offline. Discounts, refunds and voids ask for a manager PIN, with lockouts and rate limits on every path.',
  },
]

export const POS_FEATURES = [
  'Shifts with cash in/out, X-readings, Z-reading close and optional blind count',
  'Append-only stock ledger with live LOW / OUT badges, even offline',
  'Reports: KPIs, gross profit, by hour, cashier, category and item',
  'Owner, Manager and Cashier roles with role-aware navigation',
  'Modifiers and add-ons, discount presets, held orders, split tender',
  'Catalog import from Excel or CSV with a review step',
  'Per-client branding with automatic WCAG contrast checks',
  '58/80 mm thermal receipts, cash drawer and barcode scanners',
  'Responsive counter for phone, tablet and desktop',
  'One-command client setup, encrypted nightly backups, tested restore',
]

export const POS_QUALITY = [
  { value: '~4,100', label: 'tests across unit, integration and end-to-end' },
  { value: '31', label: 'architecture decision records' },
  { value: '~59k', label: 'lines of application code' },
  { value: '~66k', label: 'lines of tests' },
]

export const POS_STACK = [
  'TypeScript',
  'Angular (PWA, CDK)',
  'Tailwind CSS',
  'Dexie / IndexedDB',
  'NestJS',
  'Prisma',
  'PostgreSQL',
  'zod',
  'argon2 + JWT',
  'Vitest',
  'Testcontainers',
  'Playwright',
  'pnpm workspaces',
  'GitHub Actions',
  'Docker Compose',
  'Caddy',
]

/** Chapters for the demo recording: `at` is seconds into the video. */
export const POS_VIDEO_BEATS = [
  { at: 0, title: 'A normal sale', body: 'Four items, cash payment, change and a receipt.' },
  { at: 17, title: 'The internet drops', body: 'The status bar turns amber: Offline.' },
  { at: 19, title: 'Selling continues', body: 'Two more sales, queued on the device to sync later.' },
  { at: 39, title: 'Back online', body: 'The queue syncs by itself and the sales appear under Orders.' },
]
