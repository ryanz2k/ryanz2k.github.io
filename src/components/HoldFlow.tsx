import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'
import { FiCamera, FiCheckCircle, FiLock, FiRotateCcw, FiShoppingCart } from 'react-icons/fi'
import { prefersReducedMotion } from './ui'

// A ₱450 purchase: 10% convenience fee, charged to the buyer.
const START = 235000
const PRICE = 45000
const FEE = 4500

type Step = 'before' | 'checkout' | 'photos' | 'released' | 'refunded'

const STATE: Record<Step, { available: number; locked: number; seller: number; fee: number; status: string; note: string }> = {
  before: { available: START, locked: 0, seller: 0, fee: 0, status: 'Listing active', note: 'The buyer has ₱2,350.00 in their wallet. Press Checkout to start a deal.' },
  checkout: {
    available: START - PRICE - FEE,
    locked: PRICE + FEE,
    seller: 0,
    fee: 0,
    status: 'awaiting_handover',
    note: 'Price and fee move into a lock on the buyer’s own wallet, and the listing is reserved. Nobody is paid yet. The seller has 12 hours to hand the item over.',
  },
  photos: {
    available: START - PRICE - FEE,
    locked: PRICE + FEE,
    seller: 0,
    fee: 0,
    status: 'awaiting_handover · photos sent',
    note: 'They meet, and the seller sends hand-over photos taken in the app. The buyer can confirm, or object within two hours. The money is still locked.',
  },
  released: {
    available: START - PRICE - FEE,
    locked: 0,
    seller: PRICE,
    fee: FEE,
    status: 'completed',
    note: 'The buyer taps “I received it”. The seller is paid the price, and only now does the platform record its fee.',
  },
  refunded: {
    available: START,
    locked: 0,
    seller: 0,
    fee: 0,
    status: 'refunded',
    note: 'No photos by the deadline, or the seller cancels: everything goes back to the buyer, fee included, and the listing is active again.',
  },
}

function Peso({ centavos, className = '' }: { centavos: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(centavos)
  const fmt = (c: number) => `₱${(c / 100).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  useEffect(() => {
    const node = ref.current
    const from = prev.current
    prev.current = centavos
    if (!node || from === centavos) return
    if (prefersReducedMotion()) {
      node.textContent = fmt(centavos)
      return
    }
    const controls = animate(from, centavos, {
      duration: 0.6,
      ease: 'easeOut',
      onUpdate: (v) => {
        node.textContent = fmt(Math.round(v / 100) * 100)
      },
      onComplete: () => {
        node.textContent = fmt(centavos)
      },
    })
    return () => controls.stop()
  }, [centavos])
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {fmt(centavos)}
    </span>
  )
}

/** Interactive walk through CampusShare's hand-over hold, using the app's real fee rule. */
export default function HoldFlow() {
  const [step, setStep] = useState<Step>('before')
  const s = STATE[step]
  const open = step === 'checkout' || step === 'photos'

  const action =
    'btn !px-3 !py-2 !text-xs border border-line text-fg hover:bg-raised disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent'

  const cell = (label: string, centavos: number, tone: string, icon?: React.ReactNode) => (
    <div className="rounded-xl border border-line bg-bg p-4">
      <p className="flex items-center gap-1.5 font-mono text-[11px] text-subtle">
        {icon}
        {label}
      </p>
      <p className={`mt-2 text-xl font-semibold tracking-tight ${tone}`}>
        <Peso centavos={centavos} />
      </p>
    </div>
  )

  return (
    <figure className="card p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">Try it · a ₱450.00 purchase</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={step === 'before' ? 'btn-primary !px-3 !py-2 !text-xs' : action} disabled={step !== 'before'} onClick={() => setStep('checkout')}>
            <FiShoppingCart size={13} /> Checkout
          </button>
          <button type="button" className={step === 'checkout' ? 'btn-primary !px-3 !py-2 !text-xs' : action} disabled={step !== 'checkout'} onClick={() => setStep('photos')}>
            <FiCamera size={13} /> Send hand-over photos
          </button>
          <button type="button" className={step === 'photos' ? 'btn-primary !px-3 !py-2 !text-xs' : action} disabled={step !== 'photos'} onClick={() => setStep('released')}>
            <FiCheckCircle size={13} /> “I received it”
          </button>
          <button type="button" className={action} disabled={step !== 'checkout'} onClick={() => setStep('refunded')}>
            Deadline passes
          </button>
          <button
            type="button"
            className={step === 'released' || step === 'refunded' ? 'btn-primary !px-3 !py-2 !text-xs' : action}
            disabled={step === 'before'}
            onClick={() => setStep('before')}
          >
            <FiRotateCcw size={13} /> Start over
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cell('Buyer · available', s.available, 'text-fg')}
        {cell('Buyer · locked', s.locked, open ? 'text-amber-500' : 'text-subtle', <FiLock size={11} />)}
        {cell('Seller · wallet', s.seller, s.seller ? 'text-accent' : 'text-subtle')}
        {cell('Platform · fee', s.fee, s.fee ? 'text-accent' : 'text-subtle')}
      </div>

      <div className="mt-3 rounded-lg border border-line bg-bg px-3 py-2.5" aria-live="polite">
        <p className="font-mono text-[11px] text-subtle">
          status: <span className={open ? 'text-amber-500' : 'text-accent'}>{s.status}</span>
        </p>
        <p className="mt-1.5 min-h-[3.75rem] text-sm leading-relaxed text-muted sm:min-h-[2.75rem]">{s.note}</p>
      </div>

      <figcaption className="mt-4 text-sm text-subtle">
        The fee is 10% with a ₱5 minimum, charged to the buyer and never on a deposit. A refunded deal records no
        revenue, so the fee is never taken from a buyer who got nothing.
      </figcaption>
    </figure>
  )
}
