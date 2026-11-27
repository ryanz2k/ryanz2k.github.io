import { useCallback, useState } from 'react'

export type Theme = 'light' | 'dark'

const current = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'

/** Theme is applied pre-paint by the inline script in index.html; this keeps it in sync. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(current)

  const toggle = useCallback(() => {
    const next: Theme = current() === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'light' ? '#fafaf9' : '#0a0a0b')
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    setTheme(next)
  }, [])

  return { theme, toggle }
}
