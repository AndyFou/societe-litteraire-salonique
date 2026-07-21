import { books, currentlyReading, type Book } from '@/data/books'

/** The title that leads on a card: English when we have it, Greek otherwise. */
export function primaryTitle(b: Book) {
  return b.titleEn ?? b.titleGr!
}

/** The other title, shown beneath — undefined when the book has only one. */
export function altTitle(b: Book) {
  return b.titleEn ? b.titleGr : undefined
}

export function bookId(b: Book) {
  return String(b.number)
}

function monthName(ym: string) {
  const [y, m] = ym.split('-').map(Number)
  if (!y || !m) return null
  return {
    month: new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-GB', {
      month: 'long',
      timeZone: 'UTC',
    }),
    year: String(y),
  }
}

/**
 * "2025-07" → "July 2025"
 * "2025-07" + "2025-08" → "July–August 2025"   (year stated once)
 * "2025-12" + "2026-01" → "December 2025–January 2026"
 */
export function formatReadOn(readOn: string, readThrough?: string) {
  const from = monthName(readOn)
  if (!from) return readOn
  if (!readThrough) return `${from.month} ${from.year}`

  const to = monthName(readThrough)
  if (!to) return `${from.month} ${from.year}`

  return from.year === to.year
    ? `${from.month}–${to.month} ${from.year}`
    : `${from.month} ${from.year}–${to.month} ${to.year}`
}

/** "2025-08-19" → "19 August 2025" */
export function formatMeeting(date: string) {
  const d = new Date(`${date}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** Newest first. Book numbers are the club's own count, so they sort reliably. */
export const shelf = [...books].sort((a, b) => b.number - a.number)

// Only books with a known read-date contribute years.
export const years = Array.from(
  new Set(shelf.map((b) => b.readOn?.slice(0, 4)).filter(Boolean) as string[]),
)
  .sort()
  .reverse()
export const genres = Array.from(new Set(shelf.map((b) => b.genre).filter(Boolean) as string[])).sort()
export const countries = Array.from(
  new Set(shelf.map((b) => b.country).filter(Boolean) as string[]),
).sort()

export function getCounts() {
  return {
    /** Books the club has finished. */
    read: shelf.length,
    /** The number of the book on the go, if any. */
    current: currentlyReading?.book.number ?? null,
  }
}

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
  const totalPages = withPages.reduce((sum, b) => sum + (b.pages ?? 0), 0)

  const dated = shelf.filter((b) => b.readOn)
  const perYear = years
    .map((y) => ({ year: y, count: shelf.filter((b) => b.readOn?.startsWith(y)).length }))
    .sort((a, b) => a.year.localeCompare(b.year))

  const logged = shelf.filter((b) => b.metOn) // meetings we have a record of
  const withPageCounts = [...withPages].sort((a, b) => (a.pages ?? 0) - (b.pages ?? 0))

  return {
    ...getCounts(),
    total: shelf.length,
    totalPages,
    pagesKnown: withPages.length,
    // Date-based views only make sense once every book carries a date.
    allDated: dated.length === shelf.length,
    perYear,
    authors: tally(shelf.map((b) => b.author)),
    countries: tally(shelf.map((b) => b.country)),
    languages: tally(shelf.map((b) => b.language)),
    genres: tally(shelf.map((b) => b.genre)),
    loggedMeetings: logged.length,
    inPerson: logged.filter((b) => b.inPerson).length,
    shortest: withPageCounts[0] ?? null,
    longest: withPageCounts[withPageCounts.length - 1] ?? null,
  }
}
