import { posShot } from '../data/pos'

/**
 * Shows a real POS screenshot when one exists in src/assets/pos/, otherwise a
 * light illustration of the counter so the layout never looks broken.
 */
export default function PosScreen({
  name,
  alt,
  className = '',
  eager = false,
}: {
  name: string
  alt: string
  className?: string
  eager?: boolean
}) {
  const src = posShot(name)
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`block h-auto w-full ${className}`}
      />
    )
  }
  return <CounterIllustration className={className} label={alt} />
}

function CounterIllustration({ className, label }: { className: string; label: string }) {
  const items = ['Flat white', 'Spanish latte', 'Matcha', 'Croissant', 'Cold brew', 'Ensaymada', 'Americano', 'Iced mocha', 'Ham & cheese']
  return (
    <div
      role="img"
      aria-label={label}
      className={`grid aspect-[16/10] w-full grid-cols-[2fr_1fr] gap-2 bg-[#f5f5f4] p-3 text-[9px] text-zinc-600 sm:text-[10px] ${className}`}
    >
      <div className="grid grid-cols-3 content-start gap-2">
        {items.map((it, i) => (
          <div key={it} className="rounded-md bg-white p-2 shadow-sm ring-1 ring-black/5">
            <div className="mb-1.5 h-6 rounded bg-emerald-100 sm:h-10" style={{ opacity: 0.6 + (i % 3) * 0.15 }} />
            <div className="truncate font-medium text-zinc-800">{it}</div>
            <div>₱{120 + i * 15}.00</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col rounded-md bg-white p-2 shadow-sm ring-1 ring-black/5">
        <div className="font-semibold text-zinc-800">Order</div>
        <div className="mt-2 space-y-1.5">
          <div className="flex justify-between"><span>Flat white</span><span>₱140</span></div>
          <div className="flex justify-between"><span>Croissant</span><span>₱165</span></div>
          <div className="flex justify-between"><span>Iced mocha</span><span>₱225</span></div>
        </div>
        <div className="mt-auto">
          <div className="mb-1.5 flex justify-between border-t border-zinc-200 pt-1.5 font-semibold text-zinc-800">
            <span>Total</span><span>₱530.00</span>
          </div>
          <div className="rounded bg-emerald-600 py-1.5 text-center font-medium text-white">Charge</div>
        </div>
      </div>
    </div>
  )
}
