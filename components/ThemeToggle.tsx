'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

/**
 * A sun/moon switch that overrides the system light/dark preference.
 * The choice is stored and re-applied before paint by the inline script in
 * the layout, so there's no flash on return visits.
 */
export function ThemeToggle() {
  // Null until mounted: the resolved theme is only known in the browser, so we
  // render nothing on the server to avoid a hydration mismatch.
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    } else {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="text-ink-soft transition-colors hover:text-accent"
    >
      {/* Fixed box so the nav doesn't shift as the icon resolves after mount. */}
      <span className="flex h-4 w-4 items-center justify-center">
        {theme === 'dark' ? <SunIcon /> : theme === 'light' ? <MoonIcon /> : null}
      </span>
    </button>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="4.5" />
      <path
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path strokeLinejoin="round" d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  )
}
