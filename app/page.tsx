import Link from 'next/link'
import { club } from '@/data/club'
import { currentlyReading, upNext } from '@/data/books'
import { shelf, bookId } from '@/lib/books'
import { BookCard } from '@/components/BookCard'

export default function Home() {
  const recent = shelf.slice(0, 4)

  return (
    <div className="space-y-20">
      <section className="flex flex-col items-center text-center">
        {club.seal && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={club.seal} alt="" className="mb-10 h-40 w-40 object-contain" />
        )}
        <h1 className="font-serif text-4xl leading-tight text-balance sm:text-6xl">
          {club.name}
        </h1>
        <p className="mt-4 max-w-xl font-serif text-xl italic leading-snug text-ink-soft">
          {club.tagline}
        </p>
      </section>

      {currentlyReading && (
        <section className="border-y border-rule py-8">
          <p className="eyebrow mb-5">Currently reading</p>
          <div className="max-w-md">
            <BookCard book={currentlyReading.book} />
          </div>
          {currentlyReading.progress && (
            <p className="mt-5 text-sm text-ink-soft">{currentlyReading.progress}</p>
          )}
        </section>
      )}

      <section>
        <p className="eyebrow mb-5">The club</p>
        <div className="max-w-2xl space-y-4 text-[1.125rem] leading-relaxed text-ink-soft">
          {club.history.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-baseline justify-between">
          <p className="eyebrow">Recently read</p>
          <Link href="/shelf" className="text-sm text-ink-soft transition-colors hover:text-accent">
            The whole shelf →
          </Link>
        </div>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {recent.map((book) => (
            <BookCard key={bookId(book)} book={book} />
          ))}
        </div>
      </section>

      {upNext.length > 0 && (
        <section>
          <p className="eyebrow mb-5">Under consideration</p>
          <ul className="max-w-2xl divide-y divide-rule border-y border-rule">
            {upNext.map((b) => (
              <li
                key={`${b.title}-${b.author}`}
                className="flex flex-wrap items-baseline gap-x-3 py-3"
              >
                <span className="font-serif text-lg">{b.title}</span>
                <span className="text-sm text-ink-soft">{b.author}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {club.ritual && (
        <section className="max-w-2xl">
          <p className="eyebrow mb-4">How we choose</p>
          <p className="text-[1.125rem] leading-relaxed text-ink-soft">{club.ritual}</p>
        </section>
      )}
    </div>
  )
}
