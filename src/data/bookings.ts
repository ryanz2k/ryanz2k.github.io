import landing from '../assets/bookings/phone-1-landing.webp'
import services from '../assets/bookings/phone-2-services.webp'
import slots from '../assets/bookings/phone-3-time-slots.webp'
import checkout from '../assets/bookings/phone-4-deposit-checkout.webp'
import confirmation from '../assets/bookings/phone-5-confirmation.webp'
import today from '../assets/bookings/desktop-1-owner-today.webp'
import calendarWeek from '../assets/bookings/desktop-3-owner-calendar-week.webp'
import calendarDay from '../assets/bookings/desktop-2-owner-calendar.webp'
import settings from '../assets/bookings/desktop-4-owner-settings.webp'
import flow from '../assets/bookings/booking-flow.mp4'

export const BOOKINGS = {
  name: 'Ryan’s Bookings',
  tagline: 'Online booking with a deposit, for salons and clinics.',
  pitch:
    'A customer picks a service, a staff member and a time, pays a deposit, and the chair is theirs. The owner runs the day from a calendar on their phone. Two people can never end up with the same slot.',
  stats: [
    { value: '206', label: 'automated tests' },
    { value: '20', label: 'simultaneous requests for one slot, one winner' },
    { value: '<1 min', label: 'to book on a phone' },
  ],
  chips: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Playwright'],
  video: flow,
  featured: [slots, landing, checkout],
}

export const BOOKINGS_PHONES = [
  { src: landing, alt: 'Tala Salon & Spa landing page with opening hours and a Book now button', caption: 'Landing page for the demo salon' },
  { src: services, alt: 'Choosing a service, with prices and durations', caption: 'Step 1: choose a service' },
  { src: slots, alt: 'Choosing a date and a time slot', caption: 'Step 3: pick a time' },
  { src: checkout, alt: 'Deposit checkout showing the held time, total, deposit and cancellation rule', caption: 'Step 4: pay the deposit' },
  { src: confirmation, alt: 'Booking confirmed, with reference, time, staff member and balance', caption: 'Confirmed, with reschedule and cancel' },
]

export const BOOKINGS_OWNER = [
  { src: today, alt: 'Owner’s Today view: bookings, deposits collected and appointments by staff member', caption: 'Owner: today’s appointments by staff member' },
  { src: calendarWeek, alt: 'Owner’s calendar in week view', caption: 'Owner: the week at a glance' },
  { src: calendarDay, alt: 'Owner’s calendar in day view with a column per staff member', caption: 'Owner: day view, one column per staff member' },
  { src: settings, alt: 'Settings with branding, services, staff, opening hours and booking rules', caption: 'Settings: branding, services, hours and booking rules' },
]

export const BOOKINGS_PROBLEMS = [
  {
    title: 'The database refuses a double booking',
    body: 'A PostgreSQL exclusion constraint over the staff member and the time range means an overlapping booking cannot be stored, whatever the app does. A test fires 20 requests at one slot and exactly one wins.',
  },
  {
    title: 'Twenty people, no deadlock',
    body: 'Under that race PostgreSQL first answered with deadlock errors instead of clean refusals. Writers to one staff member’s calendar now take turns through a transaction-scoped advisory lock, with the constraint still the final guard.',
  },
  {
    title: 'Only a signed webhook confirms',
    body: 'The browser never confirms a booking. A payment event is checked with an HMAC signature, and the same event arriving twice, or three times at once, confirms once. A payment that lands after the hold lapsed is honoured if the time is still free, otherwise refunded.',
  },
  {
    title: 'One clock, one currency',
    body: 'Times are stored in UTC and shown in Philippine time by a single module, tested around midnight and closed days. Money is integer centavos from end to end.',
  },
]

export const BOOKINGS_FEATURES = [
  'Four-step booking that works at 360 px wide',
  'Choose a staff member, or anyone available',
  'Slots held for 10 minutes while paying, released if abandoned',
  'Reschedule or cancel from the confirmation, within the shop’s cut-off',
  'Owner’s Today view: arrived, done, no-show, walk-ins',
  'Week and day calendar with breaks and time off',
  'Settings for services, staff hours, closed dates and deposit rules',
  'Per-shop branding: name, colour and logo',
  'Demo mode that hides other visitors’ names and reseeds itself',
  'Accessible forms with labels, focus states and keyboard support',
]

export const BOOKINGS_STACK = [
  'Next.js (App Router)',
  'TypeScript',
  'Tailwind CSS',
  'PostgreSQL',
  'Prisma',
  'PayMongo Checkout',
  'Vitest',
  'Playwright',
  'GitHub Actions',
]
