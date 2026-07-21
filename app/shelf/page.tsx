import type { Metadata } from 'next'
import { Shelf } from '@/components/Shelf'
import { shelf, years, genres, countries, getCounts } from '@/lib/books'
import { club } from '@/data/club'

export const metadata: Metadata = {
  title: `The Shelf · ${club.name}`,
  description: `Every book read by ${club.name} since ${club.foundedYear}.`,
}

export default function ShelfPage() {
  const { read } = getCounts()

  return (
    <div>
      <h1 className="font-serif text-4xl sm:text-5xl">The Shelf</h1>
      <p className="mt-3 max-w-xl font-serif text-lg italic text-ink-soft">
        All {read} books, in the order we read them.
      </p>

      <div className="mt-10">
        <Shelf books={shelf} years={years} genres={genres} countries={countries} />
      </div>
    </div>
  )
}
