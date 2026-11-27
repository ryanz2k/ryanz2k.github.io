import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'

export interface Shot {
  src: string
  alt: string
  caption: string
}

/** Full-screen image viewer. Arrow keys move, Escape closes. */
export default function Lightbox({
  shots,
  index,
  onIndex,
}: {
  shots: Shot[]
  /** Index of the open shot, or null when closed. */
  index: number | null
  onIndex: (i: number | null) => void
}) {
  const isOpen = index !== null
  const count = shots.length

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onIndex(null)
      if (e.key === 'ArrowRight') onIndex(((index ?? 0) + 1) % count)
      if (e.key === 'ArrowLeft') onIndex(((index ?? 0) - 1 + count) % count)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, index, count, onIndex])

  const shot = index !== null ? shots[index] : null
  const arrow =
    'absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-3 text-white transition-colors hover:bg-black/80'

  return (
    <AnimatePresence>
      {shot && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={shot.caption}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.target === e.currentTarget && onIndex(null)}
        >
          <button type="button" autoFocus onClick={() => onIndex(null)} aria-label="Close" className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-black/50 p-2.5 text-white hover:bg-black/80">
            <FiX size={18} />
          </button>
          {count > 1 && (
            <>
              <button type="button" onClick={() => onIndex((index - 1 + count) % count)} aria-label="Previous image" className={`${arrow} left-3 sm:left-6`}>
                <FiChevronLeft size={20} />
              </button>
              <button type="button" onClick={() => onIndex((index + 1) % count)} aria-label="Next image" className={`${arrow} right-3 sm:right-6`}>
                <FiChevronRight size={20} />
              </button>
            </>
          )}
          <motion.img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          />
          <p className="mt-4 text-center text-sm text-white/80">
            {shot.caption}
            {count > 1 && <span className="ml-3 font-mono text-xs text-white/50">{index + 1} / {count}</span>}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
