import type { Metadata } from 'next'
import { getStats, primaryTitle } from '@/lib/books'
import { club } from '@/data/club'

export const metadata: Metadata = {
  title: `By the Numbers · ${club.name}`,
  description: `Six years of reading, counted.`,
}

function Tile({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="border-t border-rule pt-3">
      <div className="font-serif text-3xl leading-none sm:text-4xl">{value}</div>
      <div className="mt-2 text-sm text-ink-soft">{label}</div>
    </div>
  )
}

/** Horizontal bar list — used for authors, countries, languages, genres. */
function Ranking({ title, rows }: { title: string; rows: [string, number][] }) {
  if (rows.length === 0) return null
  const max = rows[0][1]

  return (
    <section>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="space-y-2">
        {rows.slice(0, 8).map(([name, count]) => (
          <li key={name} className="flex items-center gap-3">
            <span className="w-40 shrink-0 truncate text-sm text-ink-soft" title={name}>
              {name}
            </span>
            <span
              className="h-2 bg-accent-soft"
              style={{ width: `${Math.max((count / max) * 100, 4)}%` }}
            />
            <span className="text-xs tabular-nums text-ink-faint">{count}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function StatsPage() {
  const s = getStats()
  const tallestYear = Math.max(...s.perYear.map((y) => y.count), 1)

  return (
    <div className="space-y-16">
      <div>
        <h1 className="font-serif text-4xl sm:text-5xl">By the Numbers</h1>
        <p className="mt-3 max-w-xl font-serif text-lg italic text-ink-soft">
          What {s.recorded} books look like from a distance.
        </p>
      </div>

      {/* `clubTotal` counts from the club's own numbering; everything below it is
          drawn only from the books recorded here, so the two are labelled apart. */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <Tile value={s.clubTotal} label="books read by the club" />
        <Tile value={s.recorded} label="recorded here" />
        <Tile value={s.countries.length} label="countries represented" />
        <Tile value={s.languages.length} label="original languages" />
        {s.pagesKnown > 0 && (
          <Tile
            value={s.totalPages.toLocaleString('en-GB')}
            label={
              s.pagesKnown === s.recorded
                ? 'pages, all told'
                : `pages (${s.pagesKnown} of ${s.recorded} books)`
            }
          />
        )}
      </div>

      {s.beforeRecord > 0 && (
        <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
          The club has read {s.clubTotal} books. The {s.beforeRecord} that came before №
          {s.firstRecorded} predate this record, so every count below describes only the{' '}
          {s.recorded} listed on the shelf.
        </p>
      )}

      <section>
        <p className="eyebrow mb-4">Books per year</p>
        <div className="flex items-end gap-3">
          {s.perYear.map(({ year, count }) => (
            <div key={year} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs tabular-nums text-ink-faint">{count}</span>
              {/* Capped so a short club history doesn't render as wide slabs. */}
              <div
                className="w-full max-w-[64px] bg-accent-soft"
                style={{ height: `${Math.max((count / tallestYear) * 120, 4)}px` }}
              />
              <span className="text-xs text-ink-soft">{year}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-12 sm:grid-cols-2">
        <Ranking title="Most-read authors" rows={s.authors.filter(([, n]) => n > 1)} />
        <Ranking title="Where the books come from" rows={s.countries} />
        <Ranking title="Original language" rows={s.languages} />
        <Ranking title="Genre" rows={s.genres} />
      </div>

      {/* Renders only once page counts are recorded — nothing is guessed. */}
      {(s.shortest || s.longest) && (
        <section>
          <p className="eyebrow mb-4">Extremes</p>
          <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {[
              s.shortest && { label: `Shortest (${s.shortest.pages} pp.)`, book: s.shortest },
              s.longest && { label: `Longest (${s.longest.pages} pp.)`, book: s.longest },
            ]
              .filter((x) => x !== null && x !== undefined)
              .map(({ label, book }) => (
                <div key={label} className="border-t border-rule pt-3">
                  <dt className="text-xs uppercase tracking-wider text-ink-faint">{label}</dt>
                  <dd className="mt-1 font-serif text-lg leading-snug">
                    {primaryTitle(book)}
                    <span className="block text-sm not-italic text-ink-soft">{book.author}</span>
                  </dd>
                </div>
              ))}
          </dl>
        </section>
      )}

      <section>
        <p className="eyebrow mb-4">How we meet</p>
        <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
          {s.inPerson === 0
            ? `All ${s.recorded} of these meetings happened over video.`
            : `${s.recorded - s.inPerson} of these ${s.recorded} meetings happened over video;
               ${s.inPerson === 1 ? 'one was' : `${s.inPerson} were`} in the same room.`}
        </p>
      </section>
    </div>
  )
}
