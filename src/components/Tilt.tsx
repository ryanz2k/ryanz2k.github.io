import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from './ui'

/** Leans its content a few degrees toward the cursor. Pointer devices only. */
export default function Tilt({ children, className = '', max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 160, damping: 18 })
  const sy = useSpring(ry, { stiffness: 160, damping: 18 })

  if (prefersReducedMotion()) return <div className={className}>{children}</div>

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div className="w-full" style={{ perspective: 1200 }} onMouseMove={onMove} onMouseLeave={reset}>
      <motion.div className={className} style={{ rotateX: sx, rotateY: sy }}>
        {children}
      </motion.div>
    </div>
  )
}
