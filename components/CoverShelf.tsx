import type { Book } from '@/data/books'
import { primaryTitle } from '@/lib/books'

/** A slim drawn spine for a book with no cover image, sized to stand in the row. */
function MiniSpine({ book }: { book: Book }) {
  return (
    <div className="spine flex h-[150px] w-[100px] flex-col justify-between border border-rule p-2.5">
      <span className="line-clamp-6 font-serif text-[13px] leading-tight text-ink-soft">
        {primaryTitle(book)}
      </span>
      <span className="text-[9px] uppercase leading-tight tracking-wide text-ink-faint">
        {book.author}
      </span>
    </div>
  )
}

/**
 * A face-out row of covers standing on a shelf line — the reading list as an
 * object, not a list. Purely visual, so it's hidden from assistive tech; the
 * cards and the shelf page carry the same books with full detail and links.
 */
export function CoverShelf({ books }: { books: Book[] }) {
  return (
    <div aria-hidden className="-mx-6 overflow-x-auto px-6 pb-px">
      <div className="flex min-w-max items-end gap-4 border-b border-rule pb-3">
        {books.map((book) => (
          <div key={book.number} className="shrink-0">
            {book.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={book.cover}
                alt=""
                loading="lazy"
                className="h-[150px] w-auto border border-rule object-cover shadow-[0_3px_10px_rgba(0,0,0,0.14)]"
              />
            ) : (
              <MiniSpine book={book} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
