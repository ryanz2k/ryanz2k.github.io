import { PROFILE } from './data/content'

// Privacy-friendly visit counting with GoatCounter (no cookies, no personal
// data). Does nothing until PROFILE.goatcounter holds your site code, e.g.
// 'johnryan' for https://johnryan.goatcounter.com.
type Counter = { count?: (vars: { path: string; title?: string; event?: boolean }) => void }
const counter = () => (window as unknown as { goatcounter?: Counter }).goatcounter

export function track(name: string) {
  counter()?.count?.({ path: name, title: name, event: true })
}

export function startAnalytics() {
  const code = PROFILE.goatcounter
  if (!code || location.hostname === 'localhost') return
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://gc.zgo.at/count.js'
  s.dataset.goatcounter = `https://${code}.goatcounter.com/count`
  document.head.appendChild(s)

  // Case studies are hash routes, so count them as their own pages.
  window.addEventListener('hashchange', () => {
    if (location.hash.startsWith('#/')) counter()?.count?.({ path: location.hash.slice(1) })
  })
  // Count the clicks that matter: résumé, email, LinkedIn, GitHub.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest?.('a')
    const href = a?.getAttribute('href') ?? ''
    if (href.endsWith('.pdf')) track('click: résumé')
    else if (href.startsWith('mailto:')) track('click: email')
    else if (href.includes('linkedin.com')) track('click: LinkedIn')
    else if (href.includes('github.com')) track('click: GitHub')
  })
}
