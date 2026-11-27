import elHealthImg from '../assets/el-health.webp'
import elGlamImg from '../assets/el-glam-pos.webp'
import smartquestImg from '../assets/smartquest.webp'
import pulseImg from '../assets/pulse.webp'
import zonaImg from '../assets/zonafloors wordpress.webp'
import lenkaImg from '../assets/lenka wordpress.webp'
import petjetImg from '../assets/petjet shopify.webp'

export const PROFILE = {
  name: 'John Ryan Gomez',
  role: 'Software Engineer',
  company: 'Avanta Innovations',
  location: 'Cebu, Philippines',
  email: 'johnryangomez812@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ryanz2k/',
  github: 'https://github.com/ryanz2k',
  resume: `${import.meta.env.BASE_URL}John-Ryan-Gomez-Resume.pdf`,
  /** GoatCounter site code for visit counting; leave empty to switch analytics off. */
  goatcounter: 'ryanz2k',
  /**
   * Shows an explicit "Open to new roles" badge in the hero and contact
   * sections. Off by default because the site names a current employer.
   */
  openToWork: true,
}

/** Headline numbers under the hero. Each one is backed by a section below. */
export const IMPACT = [
  { value: '14', label: 'ERP modules shipped, API to UI' },
  { value: '43', label: 'pull requests merged into the component library' },
  { value: '4,100+', label: 'automated tests on a product I built alone' },
  { value: '4', label: 'business locations running software I deployed' },
]

export interface Service {
  id: 'systems' | 'websites' | 'ads'
  title: string
  summary: string
  points: string[]
  results?: { value: string; label: string }[]
  resultsNote?: string
  proof: { label: string; href: string }
}

/** What a business owner can hire me for. Every card links to proof on this site. */
export const SERVICES: Service[] = [
  {
    id: 'systems',
    title: 'Business systems',
    summary: 'Point of sale, inventory, booking and back-office tools shaped around how your shop actually runs.',
    points: [
      'Keeps working when the internet drops',
      'Local rules built in: VAT, Senior and PWD discounts, GCash and Maya',
      'Installed, backed up and supported, with staff training',
    ],
    proof: { label: 'See the POS and booking case studies', href: '#work' },
  },
  {
    id: 'websites',
    title: 'Websites and online stores',
    summary: 'WordPress and Shopify sites that load fast, read well on a phone and are easy for you to update.',
    points: [
      'New builds, redesigns and ongoing care',
      'Multilingual sites and landing pages',
      'Checkout, newsletter and booking integrations',
    ],
    proof: { label: 'See client websites', href: '#clients' },
  },
  {
    id: 'ads',
    title: 'Google Ads and tracking',
    summary: 'Campaigns that spend on the right searches, and tracking you can trust when you read the numbers.',
    points: [
      'Search campaigns, keywords and ad copy',
      'Conversion tracking in Tag Manager and GA4, consent included',
      'SEO and tracking audits, plain-language monthly reports',
    ],
    results: [
      { value: '+30%', label: 'click-through rate' },
      { value: '−12%', label: 'cost per click' },
      { value: '~0%', label: 'spend on irrelevant searches, from 10%' },
    ],
    resultsNote: 'One client’s Czech search campaign, first two weeks after I took it over (Nov 2026).',
    proof: { label: 'See the client work', href: '#experience' },
  },
]

export const WORKING_TERMS = [
  { title: 'A price before any work', body: 'You approve a fixed price first. No surprise invoices.' },
  { title: 'Every change written down', body: 'A dated log of what changed on your site, ads and tracking.' },
  { title: 'Reports you can read', body: 'What was done, what it cost and what it changed, without jargon.' },
]

/** What a hiring manager wants to know before they email. */
export const FIT = [
  { k: 'Roles', v: 'Full-stack, frontend or backend engineer' },
  { k: 'Strongest in', v: 'Angular · .NET · TypeScript · PostgreSQL / SQL Server' },
  { k: 'Based in', v: 'Cebu, Philippines (UTC+8) · on-site, hybrid or remote' },
  { k: 'Clients so far', v: 'Philippines, US, Australia, UK' },
]

export interface ExperienceItem {
  role: string
  org: string
  period: string
  meta: string
  points: string[]
  tags?: string[]
  clients?: { name: string; role: string; period: string; note?: string; results?: string[] }[]
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Software Engineer',
    org: 'Avanta Innovations Corporation',
    period: 'Sep 2026 — Present',
    meta: 'Full-time · On-site, Cebu',
    points: [
      'Co-built the in-house Angular component library and design system that every Avanta frontend is built on: data grid, tree, dock layout, search, calculator and amount inputs, date ranges, dialogs and alerts. Took it from first build to its first stable releases.',
      'Built the library’s CI/CD on Azure Pipelines: automated prerelease publishing to the package feed, cross-browser test stability across Chromium and WebKit, and dependency audits.',
      'Delivered ERP modules end to end, from the .NET API to the Angular UI: Journal Voucher, General Ledger, Trial Balance with drill-down to journal entries, Income Statement, Subsidiary Ledgers, Posting Periods, Items, Contacts, Bank & Cash Accounts, Warehouse, Company Info, Canvass, Request for Purchase and Sales Quote.',
      'Hardened the ERP pipeline: per-project coverage floors, NuGet and npm vulnerability scanning, formatting gates and scripted IIS deployments.',
    ],
    tags: ['Angular', 'TypeScript', 'C# / .NET', 'SQL Server', 'Azure DevOps'],
  },
  {
    role: 'Full-Stack Developer Intern',
    org: 'EL Glam',
    period: 'Jan 2026 — Jun 2026',
    meta: 'Internship · On-site',
    points: [
      'Built a multi-branch point of sale (.NET MAUI Blazor, offline SQLite with Firebase sync) and a PayPal-integrated e-commerce site.',
      'Rolled both out across four locations, with automated financial reporting, Brevo marketing integration, system testing and staff training.',
    ],
    tags: ['.NET MAUI', 'Blazor', 'EF Core', 'Next.js', 'PayPal'],
  },
  {
    role: 'Web & E-commerce Developer',
    org: 'Freelance',
    period: 'Nov 2022 — Present',
    meta: 'Remote · US, Australia, UK clients',
    points: [],
    clients: [
      {
        name: 'GlobeLight Marketing',
        role: 'WordPress Developer',
        period: 'Nov 2022 — Present',
        note: 'Site builds and SEO for US clients.',
      },
      {
        name: 'Lenka Charvátová',
        role: 'WordPress, SEO & Google Ads',
        period: 'Jun 2023 — Present',
        note: 'Natural-health practice with Czech, Slovak and English sites. I build and maintain the WordPress sites and landing pages, run the Czech and Slovak Google Ads search campaigns, and own conversion tracking in Tag Manager and GA4, plus SEO and tracking audits, the newsletter lead magnet and regular client reports.',
        results: ['Click-through rate +30%', 'Cost per click −12%', 'Wasted ad spend 10% → ~0%'],
      },
      {
        name: 'PetJetCo',
        role: 'Shopify Product Manager',
        period: 'Jan 2025 — Oct 2026',
        note: 'Google Ads, Merchant Center and Analytics; feed and SKU fixes; conversion tracking.',
      },
    ],
  },
]

export interface Project {
  title: string
  kind: string
  summary: string
  highlights: string[]
  stack: string[]
  image?: string
  links?: { label: string; href: string }[]
  note?: string
}

export const PROJECTS: Project[] = [
  {
    title: 'CampusShare',
    kind: 'Android app + admin panel',
    summary:
      'A marketplace where Cebu students buy and rent textbooks and lab materials, with a wallet that holds payment until the hand-over is confirmed.',
    highlights: [
      'Escrow-style wallet with PayMongo top-ups (GCash, Maya, QR Ph)',
      'ID verification and live-location safety sharing',
      'Security rules covered by a 981-check emulator suite',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Firebase', 'PayMongo', 'Next.js'],
    note: 'Private repository',
  },
  {
    title: 'SmartQuest',
    kind: 'Capstone · team of 4',
    summary:
      'A gamified learning app for elementary students, with battle-style quizzes and dashboards for students, parents and lesson creators.',
    highlights: [
      'Top contributor across the Godot client',
      'Realtime progress and role-based access on Firebase',
      'TypeScript Cloud Functions and a React web companion',
    ],
    stack: ['Godot 4.5', 'GDScript', 'Firebase', 'Cloud Functions', 'React'],
    image: smartquestImg,
  },
  {
    title: 'Pulse',
    kind: 'Technical assessment',
    summary:
      'Anonymous users on a 3D globe who can open text and video chats with each other over WebRTC.',
    highlights: [
      'Found and fixed signalling, heartbeat and busy-state bugs',
      'Rate limiting and sanitised chat input',
      'Postgres on Neon through Prisma',
    ],
    stack: ['Next.js', 'WebRTC', 'Mapbox GL', 'Prisma', 'PostgreSQL'],
    image: pulseImg,
    links: [
      { label: 'Live', href: 'https://pulse-technical-assessment-nine.vercel.app' },
      { label: 'Code', href: 'https://github.com/ryanz2k/Pulse-Technical-Assessment' },
    ],
  },
  {
    title: 'EL Health & Wellness',
    kind: 'Client e-commerce',
    summary:
      'An online store for a wellness brand with variant pricing, PayPal checkout, order emails and an admin dashboard.',
    highlights: [
      'PayPal checkout and transactional email',
      'Bulk product import from Excel',
      'Admin dashboard for products and orders',
    ],
    stack: ['Next.js', 'React', 'Prisma', 'PayPal', 'Tailwind CSS'],
    image: elHealthImg,
  },
  {
    title: 'EL Glam POS',
    kind: 'Client point of sale',
    summary:
      'A desktop POS for a salon and clinic group: offline SQLite at each branch, synced to Firebase for central reporting.',
    highlights: [
      'Bluetooth, USB and network receipt printers',
      'Staff commission calculation',
      'Deployed across four branches',
    ],
    stack: ['.NET MAUI', 'Blazor', 'EF Core', 'SQLite', 'Firebase'],
    image: elGlamImg,
  },
]

export const MORE_PROJECTS = [
  {
    title: 'Smart Desk Posture',
    stack: 'ESP32 · Kotlin · Firebase',
    href: 'https://github.com/ryanz2k/SmartDeskPosture',
  },
  {
    title: 'College Survivor',
    stack: 'Phaser 3 browser game',
    href: 'https://college-survivor-stc.vercel.app',
  },
]

export const CLIENT_SITES = [
  { title: 'Zona Floors', kind: 'WordPress', href: 'https://www.zonafloors.com/', image: zonaImg },
  { title: 'Lenka Charvátová', kind: 'WordPress · Google Ads · SEO', href: 'https://lenkacharvatova.com/', image: lenkaImg },
  { title: 'PetJet', kind: 'Shopify', href: 'https://thepetjetco.com/', image: petjetImg },
]

export const STACK: { group: string; items: string[] }[] = [
  { group: 'At work, daily', items: ['Angular', 'TypeScript', 'C#', '.NET / ASP.NET Core', 'SQL Server', 'Azure DevOps'] },
  { group: 'Frontend', items: ['Angular', 'React', 'Next.js', 'Tailwind CSS', 'PWA / Service Workers', 'IndexedDB (Dexie)'] },
  { group: 'Backend', items: ['NestJS', 'ASP.NET Core', 'Node.js / Express', 'Prisma', 'EF Core', 'Cloud Functions'] },
  { group: 'Data', items: ['PostgreSQL', 'SQL Server', 'SQLite', 'Firestore', 'Firebase Realtime DB'] },
  { group: 'Mobile, desktop & games', items: ['Kotlin', 'Jetpack Compose', '.NET MAUI Blazor', 'Godot', 'Phaser'] },
  { group: 'Testing & DevOps', items: ['Vitest', 'Playwright', 'Testcontainers', 'Azure Pipelines', 'GitHub Actions', 'Docker', 'Caddy'] },
  { group: 'Platforms & payments', items: ['WordPress', 'Shopify', 'PayPal', 'PayMongo', 'Google Ads', 'Google Tag Manager', 'GA4', 'SEO'] },
]

export const EDUCATION = [
  {
    title: 'BS Information Technology',
    org: 'University of Cebu — Banilad',
    period: '2022 — 2026',
    note: 'High Honors · 5× Dean’s Lister',
  },
  {
    title: 'Senior High School, ICT',
    org: 'University of Cebu — Pri',
    period: '2015 — 2021',
  },
]

export const CERTIFICATIONS = [
  'Cisco CCNA',
  'Cisco Cybersecurity Essentials',
  'Cisco Networking Essentials',
  'TESDA NC II — Computer Systems Servicing',
]
