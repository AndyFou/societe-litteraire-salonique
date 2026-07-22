import type { Book } from '@/data/books'
import { primaryTitle, altTitle, formatReadOn, formatMeeting } from '@/lib/books'
import { asset } from '@/lib/asset'

/** Drawn in place of a cover image when a book has no `cover` URL. */
function Spine({ book }: { book: Book }) {
  return (
    // Decorative: the title and author are already announced by the card itself.
    <div
      aria-hidden
      className="spine flex h-full w-full flex-col justify-between gap-1 overflow-hidden border border-rule p-2"
    >
      <span className="line-clamp-4 min-h-0 font-serif text-[12px] leading-tight text-ink-soft">
        {primaryTitle(book)}
      </span>
      <span className="line-clamp-2 shrink-0 text-[8px] uppercase leading-tight tracking-wide text-ink-faint">
        {book.author}
      </span>
    </div>
  )
}

export function BookCard({ book }: { book: Book }) {
  const title = primaryTitle(book)
  const alt = altTitle(book)

  return (
    <article className="flex gap-4">
      <div className="h-[104px] w-[70px] shrink-0 overflow-hidden">
        {book.cover ? (
          // Covers come from arbitrary hosts, so plain <img> avoids next/image config.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(book.cover)} alt="" className="h-full w-full border border-rule object-cover" />
        ) : (
          <Spine book={book} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-lg leading-snug text-ink">
          {book.goodreads ? (
            <a
              href={book.goodreads}
              target="_blank"
              rel="noreferrer"
              className="decoration-rule underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>

        {alt && <p className="font-serif text-[0.9375rem] italic leading-snug text-ink-faint">{alt}</p>}

        <p className="mt-0.5 text-sm text-ink-soft">{book.author}</p>

        <p className="mt-1.5 text-xs text-ink-faint">
          №{book.number}
          {book.readOn ? ` · ${formatReadOn(book.readOn, book.readThrough)}` : ''}
          {book.pickedBy ? ` · chosen by ${book.pickedBy}` : ''}
        </p>

        {book.metOn && (
          <p className="mt-0.5 text-xs text-ink-faint">
            Met {formatMeeting(book.metOn)}
            {book.inPerson && <span className="text-accent"> · in person</span>}
          </p>
        )}

        {book.note && (
          <p className="mt-2 font-serif text-[0.9375rem] italic leading-snug text-ink-soft">
            {book.note}
          </p>
        )}
      </div>
    </article>
  )
}
