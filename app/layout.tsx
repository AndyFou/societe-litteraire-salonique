import type { Metadata } from 'next'
import { EB_Garamond, Inter } from 'next/font/google'
import Link from 'next/link'
import { club } from '@/data/club'
import { ThemeToggle } from '@/components/ThemeToggle'
import './globals.css'

// Runs before first paint: re-applies a stored theme choice so return visitors
// never see a flash of the wrong palette. No choice stored → the CSS media
// query decides, matching the device.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})()`

// EB Garamond is one of the few Google display serifs with real Greek glyphs —
// necessary since roughly half the shelf is in Greek.
const display = EB_Garamond({
  subsets: ['latin', 'greek'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const body = Inter({
  subsets: ['latin', 'greek'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: club.name,
  description: club.tagline,
}

const links = [
  { href: '/', label: 'The Club' },
  { href: '/shelf', label: 'The Shelf' },
  { href: '/stats', label: 'By the Numbers' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <header className="border-b border-rule">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between">
            <Link href="/" aria-label={club.name} className="leading-none text-ink">
              {club.seal ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={club.seal} alt="" className="h-11 w-11 object-contain" />
              ) : (
                <span className="font-serif text-2xl tracking-[0.14em]">{club.monogram}</span>
              )}
            </Link>
            <nav className="flex items-center gap-6 text-sm text-ink-soft">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              ))}
              <ThemeToggle />
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">{children}</main>

        <footer className="mt-20 border-t border-rule">
          <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-ink-faint">
            {club.name} · {club.city}, since {club.foundedYear}
          </div>
        </footer>
      </body>
    </html>
  )
}
