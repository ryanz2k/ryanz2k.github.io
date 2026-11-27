// Screenshots are optional at build time, like the POS ones: any WebP in
// src/assets/campusshare/ is picked up here.
const files = import.meta.glob<string>('../assets/campusshare/*.webp', { eager: true, import: 'default' })

export function campusShot(name: string): string | undefined {
  return files[`../assets/campusshare/${name}.webp`]
}

export const CAMPUS = {
  name: 'CampusShare',
  tagline: 'A buy-and-rent marketplace for students in Cebu, built for Android.',
  pitch:
    'Students list textbooks, calculators and lab gear; others buy or rent them. Payment is locked in the buyer’s wallet until the two meet and the hand-over is confirmed, so nobody pays for something they never received.',
  stats: [
    { value: '981', label: 'security-rule checks' },
    { value: '480', label: 'unit tests' },
    { value: '2', label: 'apps: Android and admin panel' },
  ],
  chips: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Firebase', 'PayMongo', 'Next.js'],
}

/** Phone screenshots, in the order they appear. `name` is the file name without extension. */
export const CAMPUS_SHOTS = [
  { name: 'app-home', alt: 'CampusShare home with a wallet card, categories and fresh listings', caption: 'Home: wallet, categories and fresh listings' },
  { name: 'app-listing', alt: 'A textbook listing with the seller, rating and total including the fee', caption: 'Listing: seller, rating and total with fee' },
  { name: 'app-wallet', alt: 'Wallet showing available money, locked money per deal and a ledger', caption: 'Wallet: available, locked per deal, ledger' },
  { name: 'app-transaction', alt: 'Hand-over screen with locked money, the seller’s photo and the release time', caption: 'Hand-over: photos in, money still locked' },
  { name: 'app-chat', alt: 'Chat between a buyer and a seller arranging where to meet', caption: 'Chat, with location sharing and SOS' },
  { name: 'app-public-market', alt: 'The public market in its orange theme', caption: 'The public market, in orange' },
]

export const CAMPUS_ADMIN_SHOTS = [
  { name: 'admin-dashboard', alt: 'Admin dashboard with totals, a transaction chart and queues that need attention', caption: 'Admin dashboard: totals, volume and the queues waiting on an admin' },
  { name: 'admin-users', alt: 'ID verification queue with pending students', caption: 'ID verification queue, with an age check' },
  { name: 'admin-transactions', alt: 'A disputed purchase with the locked amount, hand-over photo and reported problem', caption: 'Settling a dispute: locked amount, photo and the reported problem' },
]

export const CAMPUS_PROBLEMS = [
  {
    title: 'Money that waits for the hand-over',
    body: 'Checkout moves the price, fee and any deposit into a lock on the buyer’s own wallet. The seller is paid only after sending hand-over photos and the buyer confirming, or a two-hour objection window passing. No photos within 12 hours means a full refund.',
  },
  {
    title: 'Security rules as the only backend',
    body: 'There is no server on the student side, so Firestore rules enforce everything: who may write which field, that a balance only moves as part of a real deal step, and by exactly the amount owed. A 981-check emulator suite replays the full batches the app writes.',
  },
  {
    title: 'One timing policy, three places',
    body: 'The hold windows live in one pure Kotlin object, mirrored line for line in the admin panel’s TypeScript and in the rules. A parity script runs the same cases against both so they cannot drift.',
  },
  {
    title: 'Two markets, one identity model',
    body: 'Verified students get a student market; everyone 18 and over gets a public one. Real names, IDs and contact details live in owner-only documents, and each listing chooses how its owner appears.',
  },
]

export const CAMPUS_FEATURES = [
  'ID verification with an age check before anything unlocks',
  'Buy outright or rent by day, week or month, with a deposit',
  'Wallet top-ups through PayMongo: QR Ph, GCash, Maya, GrabPay',
  'Two-step rental returns, damage claims with photo evidence',
  'Deposit splits the two sides can agree without an admin',
  'Suggested safe meeting places and live-location sharing with trusted contacts',
  'Chat, ratings, saved items and live notifications',
  'Two-step verification with an authenticator app',
  'Admin panel: ID approvals, disputes, suspensions, revenue and audit log',
  'Integer-centavo money with a ledger row for every peso moved',
]

export const CAMPUS_STACK = [
  'Kotlin',
  'Jetpack Compose',
  'Hilt',
  'Navigation Compose',
  'Firebase Auth',
  'Firestore',
  'Firestore security rules',
  'Firebase Emulator Suite',
  'PayMongo',
  'Cloudinary',
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Firebase Admin SDK',
]
