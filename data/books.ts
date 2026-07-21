// ─────────────────────────────────────────────────────────────────────────────
// THE SHELF — every book the club has read.
//
// To add a book, copy an entry below and edit it. Only `title`, `author` and
// `readOn` are required; everything else is optional and the site adapts if a
// field is missing.
//
//   readOn   "YYYY-MM" — the month you discussed it. Drives sorting and stats.
//   country  Author's country. Used for the "around the world" stat.
//   language Original language of the book, not the one you read it in.
//   cover    Any image URL. Leave it out and a typographic cover is drawn instead.
//   pickedBy Whoever chose it that month.
//   note     One line of club verdict. Keep it short — it shows on the card.
// ─────────────────────────────────────────────────────────────────────────────

export type Book = {
  title: string
  author: string
  readOn: string
  year?: number
  country?: string
  language?: string
  genre?: string
  pages?: number
  cover?: string
  pickedBy?: string
  note?: string
}

// ⚠️ PLACEHOLDER DATA — replace all of this with the club's real reading list.
export const books: Book[] = [
  {
    title: 'Το Τρίτο Στεφάνι',
    author: 'Κώστας Ταχτσής',
    readOn: '2025-11',
    year: 1962,
    country: 'Greece',
    language: 'Greek',
    genre: 'Novel',
    pages: 320,
    pickedBy: 'Antigoni',
    note: 'Everyone arrived furious at a different character.',
  },
  {
    title: 'Austerlitz',
    author: 'W. G. Sebald',
    readOn: '2025-09',
    year: 2001,
    country: 'Germany',
    language: 'German',
    genre: 'Novel',
    pages: 416,
    note: 'Two hours on whether the photographs are load-bearing.',
  },
  {
    title: 'The Vegetarian',
    author: 'Han Kang',
    readOn: '2025-06',
    year: 2007,
    country: 'South Korea',
    language: 'Korean',
    genre: 'Novel',
    pages: 188,
    pickedBy: 'Maria',
  },
  {
    title: 'Ζορμπάς',
    author: 'Νίκος Καζαντζάκης',
    readOn: '2025-03',
    year: 1946,
    country: 'Greece',
    language: 'Greek',
    genre: 'Novel',
    pages: 352,
  },
  {
    title: 'Speak, Memory',
    author: 'Vladimir Nabokov',
    readOn: '2024-12',
    year: 1951,
    country: 'Russia',
    language: 'English',
    genre: 'Memoir',
    pages: 268,
    note: 'The butterfly chapter divided us permanently.',
  },
  {
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    readOn: '2024-10',
    year: 1967,
    country: 'Colombia',
    language: 'Spanish',
    genre: 'Novel',
    pages: 417,
  },
]

// What the club is reading right now. Set to `null` between books.
export const currentlyReading: {
  book: Book
  meetingOn: string // ISO date — "2026-08-14T20:00:00+03:00"
  progress?: string // optional nudge, e.g. "through part two"
} | null = {
  book: {
    title: 'Η Δασκάλα με τα Χρυσά Μάτια',
    author: 'Στράτης Μυριβήλης',
    readOn: '2026-08',
    year: 1933,
    country: 'Greece',
    language: 'Greek',
    genre: 'Novel',
    pages: 384,
    pickedBy: 'Eleni',
  },
  meetingOn: '2026-08-14T20:00:00+03:00',
  progress: 'aim for part two by the meeting',
}

// Books under consideration. Order is meaningless — it's a shortlist, not a queue.
export const upNext: Pick<Book, 'title' | 'author' | 'country'>[] = [
  { title: 'Στου Χατζηφράγκου', author: 'Κοσμάς Πολίτης', country: 'Greece' },
  { title: 'The Emigrants', author: 'W. G. Sebald', country: 'Germany' },
  { title: 'Kitchen', author: 'Banana Yoshimoto', country: 'Japan' },
]
