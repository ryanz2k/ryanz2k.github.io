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
    { value: '969', label: 'security-rule checks' },
    { value: '390', label: 'unit tests' },
    { value: '2', label: 'apps: Android and admin panel' },
  ],
  chips: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Firebase', 'PayMongo', 'Next.js'],
}

/** Phone screenshots, in the order they appear. `name` is the file name without extension. */
export const CAMPUS_SHOTS = [
  { name: 'app-home', alt: 'CampusShare home feed with student listings', caption: 'Browse: listings for sale and for rent' },
  { name: 'app-listing', alt: 'A CampusShare listing with price, owner and rent terms', caption: 'Listing detail' },
  { name: 'app-wallet', alt: 'CampusShare wallet showing available and locked balances', caption: 'Wallet: available and locked money' },
  { name: 'app-transaction', alt: 'A CampusShare deal waiting for hand-over', caption: 'A deal on hold until hand-over' },
  { name: 'app-chat', alt: 'A chat between a buyer and a seller in CampusShare', caption: 'Chat with the owner' },
  { name: 'app-profile', alt: 'A CampusShare profile', caption: 'Profile' },
]

export const CAMPUS_ADMIN_SHOTS = [
  { name: 'admin-dashboard', alt: 'CampusShare admin dashboard', caption: 'Admin panel: dashboard' },
  { name: 'admin-users', alt: 'CampusShare admin user verification queue', caption: 'Admin panel: ID verification' },
  { name: 'admin-transactions', alt: 'CampusShare admin transactions view', caption: 'Admin panel: transactions' },
]

export const CAMPUS_PROBLEMS = [
  {
    title: 'Money that waits for the hand-over',
    body: 'Checkout moves the price, fee and any deposit into a lock on the buyer’s own wallet. The seller is paid only after sending hand-over photos and the buyer confirming, or a two-hour objection window passing. No photos within 12 hours means a full refund.',
  },
  {
    title: 'Security rules as the only backend',
    body: 'There is no server on the student side, so Firestore rules enforce everything: who may write which field, that a balance only moves as part of a real deal step, and by exactly the amount owed. A 969-check emulator suite replays the full batches the app writes.',
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
