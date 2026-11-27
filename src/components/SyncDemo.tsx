import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCheck, FiClock, FiPlus, FiRepeat, FiServer, FiSmartphone, FiWifi, FiWifiOff } from 'react-icons/fi'

type Status = 'queued' | 'sending' | 'stored'
interface Sale {
  id: string
  item: string
  centavos: number
  status: Status
}
interface LogLine {
  key: number
  id: string
  reply: 'stored' | 'duplicate'
}

const MENU: [string, number][] = [
  ['Spanish latte', 16500],
  ['Flat white', 14000],
  ['Croissant', 12000],
  ['Iced mocha', 18500],
  ['Ensaymada', 9500],
  ['Cold brew', 15000],
]

const peso = (c: number) => `₱${(c / 100).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`
const newId = () => Math.random().toString(16).slice(2, 6)
const SEND_MS = 700

/**
 * A small, honest simulation of the POS sync idea: sales get their ID on the
 * device, queue while offline, and the server answers "stored" or "duplicate"
 * so a retry can never charge twice. No network involved.
 */
export default function SyncDemo() {
  const [online, setOnline] = useState(true)
  const [sales, setSales] = useState<Sale[]>([
    { id: 'a41c', item: 'Flat white', centavos: 14000, status: 'stored' },
    { id: '9e07', item: 'Croissant', centavos: 12000, status: 'stored' },
  ])
  const [retry, setRetry] = useState<string | null>(null)
  const [log, setLog] = useState<LogLine[]>([])
  const logKey = useRef(0)
  const menuIndex = useRef(0)

  const addLog = useCallback((id: string, reply: LogLine['reply']) => {
    const key = ++logKey.current
    setLog((l) => [{ key, id, reply }, ...l].slice(0, 4))
  }, [])

  // The outbox drains one sale at a time, oldest first, whenever there is a connection.
  useEffect(() => {
    if (!online || retry) return
    const sending = sales.find((s) => s.status === 'sending')
    if (sending) {
      const t = window.setTimeout(() => {
        setSales((all) => all.map((s) => (s.id === sending.id ? { ...s, status: 'stored' } : s)))
        addLog(sending.id, 'stored')
      }, SEND_MS)
      return () => window.clearTimeout(t)
    }
    const next = sales.find((s) => s.status === 'queued')
    if (next) setSales((all) => all.map((s) => (s.id === next.id ? { ...s, status: 'sending' } : s)))
  }, [online, sales, retry, addLog])

  // Re-sending something the server already has: it answers "duplicate" and changes nothing.
  useEffect(() => {
    if (!retry) return
    const t = window.setTimeout(() => {
      addLog(retry, 'duplicate')
      setRetry(null)
    }, SEND_MS)
    return () => window.clearTimeout(t)
  }, [retry, addLog])

  const ringUp = () => {
    const [item, centavos] = MENU[menuIndex.current++ % MENU.length]
    setSales((all) => [...all, { id: newId(), item, centavos, status: 'queued' }])
  }

  const toggle = () => {
    setOnline((o) => !o)
    // Anything in flight goes back to the queue; it is simply sent again later.
    setSales((all) => all.map((s) => (s.status === 'sending' ? { ...s, status: 'queued' } : s)))
    setRetry(null)
  }

  const stored = sales.filter((s) => s.status === 'stored')
  const waiting = sales.length - stored.length
  const lastStored = stored[stored.length - 1]
  const inFlight = retry ?? sales.find((s) => s.status === 'sending')?.id ?? null
  const deviceTotal = sales.reduce((n, s) => n + s.centavos, 0)
  const serverTotal = stored.reduce((n, s) => n + s.centavos, 0)
  const shown = sales.slice(-5)
  const shownServer = stored.slice(-5)

  return (
    <figure className="card p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">Try it · simplified simulation</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={ringUp} className="btn-primary !px-3 !py-2 !text-xs">
            <FiPlus size={13} /> Ring up a sale
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={!online}
            className={`btn !px-3 !py-2 !text-xs border ${
              online ? 'border-line text-fg hover:bg-raised' : 'border-amber-500/40 bg-amber-500/10 text-amber-500'
            }`}
          >
            {online ? <FiWifiOff size={13} /> : <FiWifi size={13} />}
            {online ? 'Cut the internet' : 'Reconnect'}
          </button>
          <button
            type="button"
            onClick={() => lastStored && setRetry(lastStored.id)}
            disabled={!online || !lastStored || inFlight !== null}
            className="btn-ghost !px-3 !py-2 !text-xs disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiRepeat size={13} /> Send the last one again
          </button>
        </div>
      </div>

      <div className="mt-5 grid items-stretch gap-0 md:grid-cols-[1fr_auto_1fr]">
        {/* Counter */}
        <div className="rounded-xl border border-line bg-bg p-4">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold text-fg">
              <FiSmartphone className="text-accent" size={15} /> Counter
            </p>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[11px] ${
                online ? 'bg-accent/10 text-accent' : 'bg-amber-500/10 text-amber-500'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${online ? 'bg-accent' : 'bg-amber-500'}`} />
              {online ? 'Online' : `Offline · ${waiting} waiting`}
            </span>
          </div>
          <ul className="mt-3 min-h-[11.5rem] space-y-1.5">
            <AnimatePresence initial={false}>
              {shown.map((s) => (
                <motion.li
                  key={s.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 rounded-md border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] text-muted"
                >
                  <span className="text-subtle">#{s.id}</span>
                  <span className="flex-1 truncate">{s.item}</span>
                  <span>{peso(s.centavos)}</span>
                  <span
                    className={`flex w-[4.6rem] items-center justify-end gap-1 ${
                      s.status === 'stored' ? 'text-accent' : 'text-amber-500'
                    }`}
                  >
                    {s.status === 'stored' ? <FiCheck size={11} /> : <FiClock size={11} />}
                    {s.status === 'stored' ? 'synced' : s.status}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <p className="mt-3 flex justify-between border-t border-line pt-3 font-mono text-[11px] text-subtle">
            <span>Rung up at the till</span>
            <span className="text-fg">{peso(deviceTotal)}</span>
          </p>
        </div>

        {/* Wire */}
        <div className="relative mx-auto h-10 w-px md:mx-0 md:h-px md:w-20 md:self-center" aria-hidden>
          <div
            className={`absolute inset-0 ${
              online
                ? 'bg-accent/40'
                : 'bg-[repeating-linear-gradient(0deg,rgb(245_158_11/0.7)_0_4px,transparent_4px_8px)] md:bg-[repeating-linear-gradient(90deg,rgb(245_158_11/0.7)_0_4px,transparent_4px_8px)]'
            }`}
          />
          {online && inFlight && (
            <span
              key={`${inFlight}-${retry ? 'r' : 's'}-${log[0]?.key ?? 0}`}
              className="packet h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgb(var(--accent))]"
            />
          )}
        </div>

        {/* Server */}
        <div className="rounded-xl border border-line bg-bg p-4">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold text-fg">
              <FiServer className="text-accent" size={15} /> Server
            </p>
            <span className="font-mono text-[11px] text-subtle">{stored.length} sales stored</span>
          </div>
          <ul className="mt-3 min-h-[11.5rem] space-y-1.5">
            <AnimatePresence initial={false}>
              {shownServer.map((s) => (
                <motion.li
                  key={s.id}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2 rounded-md border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] text-muted"
                >
                  <span className="text-subtle">#{s.id}</span>
                  <span className="flex-1 truncate">{s.item}</span>
                  <span>{peso(s.centavos)}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <p className="mt-3 flex justify-between border-t border-line pt-3 font-mono text-[11px] text-subtle">
            <span>On the books</span>
            <span className={serverTotal === deviceTotal ? 'text-accent' : 'text-amber-500'}>{peso(serverTotal)}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 min-h-[2.5rem] rounded-lg border border-line bg-bg px-3 py-2 font-mono text-[11px]" aria-live="polite">
        {log.length === 0 ? (
          <span className="text-subtle">Server replies appear here. Cut the internet, ring up a few sales, then reconnect.</span>
        ) : (
          <ul className="space-y-1">
            {log.map((l, i) => (
              <li key={l.key} className={i === 0 ? 'text-fg' : 'text-subtle'}>
                <span className="text-subtle">sale #{l.id} → </span>
                {l.reply === 'stored' ? (
                  <span className="text-accent">stored</span>
                ) : (
                  <>
                    <span className="text-amber-500">duplicate</span>
                    <span className="text-subtle"> · already have it, total unchanged</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <figcaption className="mt-4 text-sm text-subtle">
        Every sale gets its ID at the till, so sending it twice is harmless: the till never waits for the
        network, and the two totals always meet again.
      </figcaption>
    </figure>
  )
}
