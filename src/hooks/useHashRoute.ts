import { useEffect, useState } from 'react'

export type Route = 'home' | 'pos'

const routeFromHash = (hash: string): Route => (hash.startsWith('#/pos') ? 'pos' : 'home')

/**
 * Tiny hash router: `#/pos` shows the POS case study, anything else is the
 * home page (where plain `#section` hashes are in-page anchors). Works on
 * GitHub Pages without a 404 fallback.
 */
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => routeFromHash(window.location.hash))

  useEffect(() => {
    const onChange = () => {
      const next = routeFromHash(window.location.hash)
      setRoute((prev) => {
        if (prev !== next) window.scrollTo({ top: 0 })
        return next
      })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  // After returning home with a section hash (e.g. "#work"), scroll to it.
  useEffect(() => {
    if (route !== 'home') return
    const id = window.location.hash.slice(1)
    if (!id || id.startsWith('/')) return
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [route])

  return route
}
