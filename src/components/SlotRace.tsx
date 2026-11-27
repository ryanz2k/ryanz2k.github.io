import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCheckCircle, FiDatabase, FiRotateCcw, FiUser, FiXCircle, FiZap } from 'react-icons/fi'

type Who = 'a' | 'b'
const PEOPLE: Record<Who, string> = { a: 'Isabel', b: 'Marco' }
const OTHER_TIMES = ['10:00 AM', '10:15 AM', '10:45 AM', '11:00 AM']

function Customer({ who, winner }: { who: Who; winner: Who | null }) {
  const state = winner === null ? 'ready' : winner === who ? 'won' : 'lost'
  return (
    <div className="flex-1 rounded-xl border border-line bg-bg p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-fg">
        <FiUser className="text-accent" size={14} /> {PEOPLE[who]}
      </p>
      <p className="mt-1 font-mono text-[11px] text-subtle">Haircut · with Liza · Sun 10:30 AM</p>
      <div className="mt-3 min-h-[7.5rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {state === 'ready' && (
              <p className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm text-muted">
                On the details step, about to press <span className="text-fg">Continue to pay</span>.
              </p>
            )}
            {state === 'won' && (
              <p className="flex gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2.5 text-sm text-accent">
                <FiCheckCircle className="mt-0.5 flex-none" size={15} />
                <span>On the payment page. The time is held for 10:00 while they pay the deposit.</span>
              </p>
            )}
            {state === 'lost' && (
              <>
                <p className="flex gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-sm text-amber-500">
                  <FiXCircle className="mt-0.5 flex-none" size={15} />
                  <span>“Sorry, that time was just taken by someone else.”</span>
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {OTHER_TIMES.map((t) => (
                    <li key={t} className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/** Two customers want the same slot. Whoever the database accepts first gets it; the other is sent back. */
export default function SlotRace() {
  const [winner, setWinner] = useState<Who | null>(null)
  const [tie, setTie] = useState(false)
  const done = winner !== null
  const loser: Who | null = winner === null ? null : winner === 'a' ? 'b' : 'a'

  const press = (w: Who, together = false) => {
    setTie(together)
    setWinner(w)
  }
  const action = 'btn !px-3 !py-2 !text-xs border border-line text-fg hover:bg-raised disabled:cursor-not-allowed disabled:opacity-35'

  return (
    <figure className="card p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">Try it · two customers, one slot</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={action} disabled={done} onClick={() => press('a')}>
            Isabel pays first
          </button>
          <button type="button" className={action} disabled={done} onClick={() => press('b')}>
            Marco pays first
          </button>
          <button
            type="button"
            className={done ? action : 'btn-primary !px-3 !py-2 !text-xs'}
            disabled={done}
            onClick={() => press(Math.random() < 0.5 ? 'a' : 'b', true)}
          >
            <FiZap size={13} /> Both at the same moment
          </button>
          <button
            type="button"
            className={done ? 'btn-primary !px-3 !py-2 !text-xs' : action}
            disabled={!done}
            onClick={() => setWinner(null)}
          >
            <FiRotateCcw size={13} /> Start over
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row">
        <Customer who="a" winner={winner} />
        <Customer who="b" winner={winner} />
      </div>

      <div className="mt-3 rounded-lg border border-line bg-bg px-3 py-2.5 font-mono text-[11px]" aria-live="polite">
        <p className="flex items-center gap-2 text-subtle">
          <FiDatabase size={12} /> PostgreSQL · one booking per staff member per time range
        </p>
        <p className="mt-1.5 min-h-[2.5rem] leading-relaxed sm:min-h-[1.25rem]">
          {winner && loser ? (
            <>
              <span className="text-fg">{PEOPLE[winner]}</span> <span className="text-accent">stored</span>
              <span className="text-subtle"> · </span>
              <span className="text-fg">{PEOPLE[loser]}</span> <span className="text-amber-500">refused: overlaps an existing booking</span>
              {tie && <span className="text-subtle"> · same instant, the database picked one</span>}
            </>
          ) : (
            <span className="text-subtle">Liza, Sun 10:30 to 11:15 AM: free.</span>
          )}
        </p>
      </div>

      <figcaption className="mt-4 text-sm text-subtle">
        The rule lives in the database as a constraint, so it holds even when both requests arrive in the same
        millisecond. The app’s job is only to explain the refusal kindly and offer the next free times.
      </figcaption>
    </figure>
  )
}
