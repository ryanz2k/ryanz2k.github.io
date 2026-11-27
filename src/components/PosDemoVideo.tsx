import { useEffect, useRef, useState } from 'react'
import { FiPlay } from 'react-icons/fi'
import { POS_VIDEO_BEATS } from '../data/pos'
import { prefersReducedMotion } from './ui'

// Optional at build time, like the screenshots: drop pos-demo.mp4 / .webm /
// -poster.webp into src/assets/pos/video/ and the section appears.
const media = import.meta.glob<string>('../assets/pos/video/*', { eager: true, import: 'default', query: '?url' })
const file = (name: string) => media[`../assets/pos/video/${name}`]

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

/** Screen recording of the POS with chapter buttons that follow playback and seek on click. */
export default function PosDemoVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [time, setTime] = useState(0)
  const [started, setStarted] = useState(false)
  const mp4 = file('pos-demo.mp4')
  const webm = file('pos-demo.webm')
  const poster = file('pos-demo-poster.webp')

  // Play only while on screen; never autoplay for reduced-motion visitors.
  useEffect(() => {
    const video = ref.current
    if (!video || prefersReducedMotion()) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined)
        else video.pause()
      },
      { threshold: 0.5 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  if (!mp4 && !webm) return null

  const active = POS_VIDEO_BEATS.reduce((found, b, i) => (time >= b.at ? i : found), 0)
  const seek = (at: number) => {
    const video = ref.current
    if (!video) return
    video.currentTime = at
    void video.play().catch(() => undefined)
  }

  return (
    <section className="page mt-24">
      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <div>
          <p className="eyebrow">One-minute demo</p>
          <p className="mt-3 hidden text-sm leading-relaxed text-subtle md:block">
            A real recording of the counter. Pick a chapter to jump to it.
          </p>
        </div>
    <figure className="card overflow-hidden">
      <div className="relative bg-black">
        <video
          ref={ref}
          className="block h-auto w-full"
          poster={poster}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onPlay={() => setStarted(true)}
          aria-label="Screen recording of Ryan’s POS selling online, then offline, then syncing"
        >
          {webm && <source src={webm} type="video/webm" />}
          {mp4 && <source src={mp4} type="video/mp4" />}
        </video>
        {!started && (
          <button
            type="button"
            onClick={() => seek(0)}
            className="absolute inset-0 flex items-center justify-center bg-black/30 text-white transition-colors hover:bg-black/20"
            aria-label="Play the demo"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <FiPlay size={26} className="ml-1" />
            </span>
          </button>
        )}
      </div>
      <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {POS_VIDEO_BEATS.map((b, i) => (
          <li key={b.at} className="bg-surface">
            <button
              type="button"
              onClick={() => seek(b.at)}
              aria-current={started && i === active ? 'step' : undefined}
              className={`h-full w-full border-t-2 p-4 text-left transition-colors hover:bg-raised ${
                started && i === active ? 'border-accent' : 'border-transparent'
              }`}
            >
              <span className="font-mono text-[11px] text-subtle">{clock(b.at)}</span>
              <span className={`mt-1 block text-sm font-medium ${started && i === active ? 'text-fg' : 'text-muted'}`}>
                {b.title}
              </span>
              <span className="mt-1 block text-xs leading-snug text-subtle">{b.body}</span>
            </button>
          </li>
        ))}
      </ol>
    </figure>
      </div>
    </section>
  )
}
