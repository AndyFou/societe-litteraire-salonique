import type { Book } from '@/data/books'
import { formatReadOn } from '@/lib/books'

/** Drawn in place of a cover image when a book has no `cover` URL. */
function Spine({ book }: { book: Book }) {
  return (
    // Decorative: the title and author are already announced by the card itself.
    <div
      aria-hidden
      className="spine flex h-full w-full flex-col justify-between gap-1 overflow-hidden border border-rule p-2"
    >
      <span className="line-clamp-4 min-h-0 font-serif text-[12px] leading-tight text-ink-soft">
        {book.title}
      </span>
      <span className="line-clamp-2 shrink-0 text-[8px] uppercase leading-tight tracking-wide text-ink-faint">
        {book.author}
      </span>
    </div>
  )
}

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex gap-4">
      <div className="h-[104px] w-[70px] shrink-0 overflow-hidden">
        {book.cover ? (
          // Covers come from arbitrary hosts, so plain <img> avoids next/image config.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.cover}
            alt=""
            className="h-full w-full border border-rule object-cover"
          />
        ) : (
          <Spine book={book} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-lg leading-snug text-ink">{book.title}</h3>
        <p className="text-sm text-ink-soft">{book.author}</p>

        <p className="mt-1.5 text-xs text-ink-faint">
          {formatReadOn(book.readOn)}
          {book.year ? ` · first published ${book.year}` : ''}
          {book.pickedBy ? ` · chosen by ${book.pickedBy}` : ''}
        </p>

        {book.note && (
          <p className="mt-2 font-serif text-[15px] italic leading-snug text-ink-soft">
            {book.note}
          </p>
        )}
      </div>
    </article>
  )
}
