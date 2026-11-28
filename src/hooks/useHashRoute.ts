import { useEffect, useState } from 'react'

export type Route = 'home' | 'pos' | 'campusshare' | 'bookings' | 'payroll'

const routeFromHash = (hash: string): Route =>
  hash.startsWith('#/pos')
    ? 'pos'
    : hash.startsWith('#/campusshare')
      ? 'campusshare'
      : hash.startsWith('#/bookings')
        ? 'bookings'
        : hash.startsWith('#/payroll')
          ? 'payroll'
          : 'home'

/**
 * Tiny hash router: `#/pos`, `#/campusshare`, `#/bookings` and `#/payroll` are case studies, anything
 * else is the home page (where plain `#section` hashes are in-page anchors).
 * Works on GitHub Pages without a 404 fallback. Each page restores its own
 * scroll position when it mounts, after the page transition.
 */
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => routeFromHash(window.location.hash))

  useEffect(() => {
    const onChange = () => setRoute(routeFromHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

/** Go to a home-page section from anywhere, even if the hash is already set. */
export function goToSection(id: string) {
  if (window.location.hash === `#${id}`) document.getElementById(id)?.scrollIntoView()
  else window.location.hash = `#${id}`
}

/** Call when a routed page mounts: jump to its section hash, or to the top. */
export function restoreScroll() {
  const id = window.location.hash.slice(1)
  const el = id && !id.startsWith('/') ? document.getElementById(id) : null
  if (el) el.scrollIntoView({ behavior: 'instant' })
  else window.scrollTo({ top: 0, behavior: 'instant' })
}
