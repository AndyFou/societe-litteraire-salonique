import { books, type Book } from '@/data/books'

/** Stable id for a book — used for React keys and anchors. */
export function bookId(b: Book) {
  return `${b.readOn}-${b.title}`.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-')
}

/** "2025-11" → "November 2025". Falls back to the raw string if unparseable. */
export function formatReadOn(readOn: string) {
  const [y, m] = readOn.split('-').map(Number)
  if (!y || !m) return readOn
  const d = new Date(Date.UTC(y, m - 1, 1))
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export function formatMeeting(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Newest first. */
export const shelf = [...books].sort((a, b) => b.readOn.localeCompare(a.readOn))

export const years = Array.from(new Set(shelf.map((b) => b.readOn.slice(0, 4)))).sort().reverse()
export const genres = Array.from(new Set(shelf.map((b) => b.genre).filter(Boolean) as string[])).sort()
export const countries = Array.from(
  new Set(shelf.map((b) => b.country).filter(Boolean) as string[]),
).sort()

// ── Stats ────────────────────────────────────────────────────────────────────

function tally<T extends string>(values: (T | undefined)[]) {
  const counts = new Map<T, number>()
  for (const v of values) {
    if (!v) continue
    counts.set(v, (counts.get(v) ?? 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
}

export function getStats() {
  const withPages = shelf.filter((b) => b.pages)
  const withYear = shelf.filter((b) => b.year)
  const totalPages = withPages.reduce((sum, b) => sum + (b.pages ?? 0), 0)

  const perYear = years
    .map((y) => ({ year: y, count: shelf.filter((b) => b.readOn.startsWith(y)).length }))
    .sort((a, b) => a.year.localeCompare(b.year))

  const sortedByYear = [...withYear].sort((a, b) => (a.year ?? 0) - (b.year ?? 0))
  const sortedByPages = [...withPages].sort((a, b) => (a.pages ?? 0) - (b.pages ?? 0))

  return {
    total: shelf.length,
    totalPages,
    // Only meaningful if we know the length of most books.
    pagesKnown: withPages.length,
    avgPages: withPages.length ? Math.round(totalPages / withPages.length) : null,
    perYear,
    authors: tally(shelf.map((b) => b.author)),
    countries: tally(shelf.map((b) => b.country)),
    languages: tally(shelf.map((b) => b.language)),
    genres: tally(shelf.map((b) => b.genre)),
    oldest: sortedByYear[0] ?? null,
    newest: sortedByYear[sortedByYear.length - 1] ?? null,
    shortest: sortedByPages[0] ?? null,
    longest: sortedByPages[sortedByPages.length - 1] ?? null,
  }
}
