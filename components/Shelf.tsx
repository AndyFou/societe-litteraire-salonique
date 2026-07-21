'use client'

import { useMemo, useState } from 'react'
import type { Book } from '@/data/books'
import { bookId, primaryTitle } from '@/lib/books'
import { BookCard } from './BookCard'

type Sort = 'recent' | 'oldest' | 'title' | 'author'

const SORTS: { key: Sort; label: string }[] = [
  { key: 'recent', label: 'Recently read' },
  { key: 'oldest', label: 'First read' },
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
]

/** A row of pill buttons; `null` is the "all" option. */
function Filter({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string | null
  onChange: (v: string | null) => void
}) {
  if (options.length < 2) return null

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
      <span className="eyebrow w-16 shrink-0">{label}</span>
      {[null, ...options].map((opt) => (
        <button
          key={opt ?? '__all'}
          onClick={() => onChange(opt)}
          className={`text-sm transition-colors ${
            value === opt ? 'text-accent' : 'text-ink-soft hover:text-ink'
          }`}
        >
          {opt ?? 'All'}
        </button>
      ))}
    </div>
  )
}

export function Shelf({
  books,
  years,
  genres,
  countries,
}: {
  books: Book[]
  years: string[]
  genres: string[]
  countries: string[]
}) {
  const [year, setYear] = useState<string | null>(null)
  const [genre, setGenre] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [sort, setSort] = useState<Sort>('recent')

  const visible = useMemo(() => {
    const filtered = books.filter(
      (b) =>
        (!year || (b.readOn?.startsWith(year) ?? false)) &&
        (!genre || b.genre === genre) &&
        (!country || b.country === country),
    )

    // Book number is the club's own ordering, so it beats parsing dates.
    const by: Record<Sort, (a: Book, b: Book) => number> = {
      recent: (a, b) => b.number - a.number,
      oldest: (a, b) => a.number - b.number,
      title: (a, b) => primaryTitle(a).localeCompare(primaryTitle(b), 'el'),
      author: (a, b) => a.author.localeCompare(b.author, 'el'),
    }

    return [...filtered].sort(by[sort])
  }, [books, year, genre, country, sort])

  // Year headings only make sense when the list runs in date order; any other
  // sort gets one flat grid. Books with no known date gather under "Earlier".
  const sections = useMemo(() => {
    if (sort !== 'recent' && sort !== 'oldest') return [{ heading: null, books: visible }]

    const out: { heading: string; books: Book[] }[] = []
    for (const book of visible) {
      const heading = book.readOn ? book.readOn.slice(0, 4) : 'Earlier'
      if (out[out.length - 1]?.heading !== heading) out.push({ heading, books: [] })
      out[out.length - 1].books.push(book)
    }
    return out
  }, [visible, sort])

  return (
    <>
      <div className="mb-10 space-y-3 border-y border-rule py-5">
        <Filter label="Year" options={years} value={year} onChange={setYear} />
        <Filter label="Genre" options={genres} value={genre} onChange={setGenre} />
        <Filter label="Origin" options={countries} value={country} onChange={setCountry} />

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <span className="eyebrow w-16 shrink-0">Sort</span>
          {SORTS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={`text-sm transition-colors ${
                sort === s.key ? 'text-accent' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <p className="eyebrow mb-8">
        {visible.length} {visible.length === 1 ? 'book' : 'books'}
      </p>

      {visible.length === 0 ? (
        <p className="font-serif text-lg italic text-ink-faint">
          Nothing on the shelf matches that.
        </p>
      ) : (
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.heading ?? '__all'}>
              {section.heading && (
                <h2 className="mb-6 font-serif text-2xl text-ink-faint">{section.heading}</h2>
              )}
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {section.books.map((book) => (
                  <BookCard key={bookId(book)} book={book} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  )
}
