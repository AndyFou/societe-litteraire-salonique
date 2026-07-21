// ─────────────────────────────────────────────────────────────────────────────
// THE SHELF
//
// Books are numbered as the club numbers them. The record here starts at #38;
// everything before that was read before this log began, and the site works out
// the club's true total from the highest number rather than counting rows.
//
//   number     The club's own count — 38ο Βιβλίο, 39ο Βιβλίο, …
//   titleEn /  Give whichever exist. At least one is required. The English title
//   titleGr    leads on the card when both are present, with the Greek beneath;
//              Greek-language books show the Greek title alone.
//   readOn     "YYYY-MM" — the month the book was read.
//   readThrough Optional second month, for books that spanned two.
//   metOn      "YYYY-MM-DD" — the discussion date.
//   inPerson   Meetings are remote by default; set true for the rare live one.
//   goodreads  Link on the title.
//   cover      Any image URL; omit and a typographic cover is drawn instead.
//   pages      Omit rather than guess — the page-count stat hides itself when
//              nothing is recorded, but a wrong number silently corrupts it.
// ─────────────────────────────────────────────────────────────────────────────

/** At least one title is required; either language satisfies it. */
type Titles =
  | { titleEn: string; titleGr?: string }
  | { titleEn?: string; titleGr: string }

export type Book = Titles & {
  number: number
  author: string
  readOn: string
  readThrough?: string
  metOn?: string
  inPerson?: boolean
  goodreads?: string
  country?: string
  language?: string
  genre?: string
  pages?: number
  cover?: string
  pickedBy?: string
  note?: string
}

// ⚠️ country / language / genre were filled in from general knowledge about each
// author, not from your notes — worth a skim. Everything else comes from the list
// you provided.
export const books: Book[] = [
  {
    number: 46,
    titleEn: 'Range',
    author: 'David Epstein',
    readOn: '2026-04',
    readThrough: '2026-05',
    metOn: '2026-06-04',
    country: 'United States',
    language: 'English',
    genre: 'Non-fiction',
    goodreads:
      'https://www.goodreads.com/book/show/197005113-range-by-david-epstein-war-how-conflict-shaped-us-by-professor-margaret',
    cover: 'https://covers.openlibrary.org/b/id/8782615-L.jpg',
  },
  {
    number: 45,
    titleEn: 'The Three-Body Problem',
    author: 'Cixin Liu',
    readOn: '2026-03',
    metOn: '2026-04-08',
    country: 'China',
    language: 'Chinese',
    genre: 'Novel',
    goodreads: 'https://www.goodreads.com/en/book/show/20518872-the-three-body-problem',
    cover: 'https://covers.openlibrary.org/b/id/8478888-L.jpg',
  },
  {
    number: 44,
    titleEn: 'Stoner',
    author: 'John Williams',
    readOn: '2026-02',
    metOn: '2026-03-01',
    country: 'United States',
    language: 'English',
    genre: 'Novel',
    goodreads: 'https://www.goodreads.com/book/show/166997.Stoner',
    cover: 'https://covers.openlibrary.org/b/id/8310729-L.jpg',
  },
  {
    number: 43,
    titleEn: 'Burial Rites',
    titleGr: 'Έθιμα Ταφής',
    author: 'Hannah Kent',
    readOn: '2026-01',
    metOn: '2026-01-29',
    country: 'Australia',
    language: 'English',
    genre: 'Novel',
    goodreads: 'https://www.goodreads.com/book/show/17333319-burial-rites',
    cover: 'https://covers.openlibrary.org/b/id/9030751-L.jpg',
  },
  {
    number: 42,
    titleEn: 'Reservoir Bitches',
    titleGr: 'Αδέσποτες σκύλες',
    author: 'Dahlia de la Cerda',
    readOn: '2025-12',
    metOn: '2025-12-18',
    inPerson: true,
    country: 'Mexico',
    language: 'Spanish',
    genre: 'Short stories',
    goodreads: 'https://www.goodreads.com/en/book/show/210678433-reservoir-bitches',
    cover: 'https://covers.openlibrary.org/b/id/14747980-L.jpg',
  },
  {
    number: 41,
    titleEn: 'Time Shelter',
    author: 'Georgi Gospodinov',
    readOn: '2025-11',
    metOn: '2025-12-02',
    country: 'Bulgaria',
    language: 'Bulgarian',
    genre: 'Novel',
    goodreads: 'https://www.goodreads.com/en/book/show/58999261-time-shelter',
    cover: 'https://covers.openlibrary.org/b/id/13125096-L.jpg',
  },
  {
    number: 40,
    titleGr: "Ένας Αιγύπτιος, ένας Βαβυλώνιος κι ένας Βίκινγκ μπαίνουν σ' ένα μπαρ",
    author: 'Θεόδωρος Παπακώστας',
    readOn: '2025-10',
    metOn: '2025-11-03',
    country: 'Greece',
    language: 'Greek',
    genre: 'Non-fiction',
    goodreads: 'https://www.goodreads.com/book/show/236871772',
    cover: 'https://cdn.politeianet.gr/data/images/Product/383893/1/el/7289-0203.jpg?d=20250628113058',
  },
  {
    number: 39,
    titleEn: 'Mornings in Jenin',
    author: 'Susan Abulhawa',
    readOn: '2025-09',
    metOn: '2025-09-30',
    country: 'Palestine',
    language: 'English',
    genre: 'Novel',
    goodreads: 'https://www.goodreads.com/book/show/6692041-mornings-in-jenin',
    cover: 'https://covers.openlibrary.org/b/id/6935052-L.jpg',
  },
  {
    number: 38,
    titleEn: 'The Vegetarian',
    titleGr: 'Η Χορτοφάγος',
    author: 'Han Kang',
    readOn: '2025-07',
    readThrough: '2025-08',
    metOn: '2025-08-19',
    country: 'South Korea',
    language: 'Korean',
    genre: 'Novel',
    goodreads: 'https://www.goodreads.com/book/show/25489025-the-vegetarian',
    cover: 'https://covers.openlibrary.org/b/isbn/9781101906118-L.jpg',
  },
]

// What the club is reading right now. Set to `null` between books.
// When you finish it, move the book into the array above and set its `metOn`.
export const currentlyReading: { book: Book; progress?: string } | null = {
  book: {
    number: 47,
    titleEn: 'Born a Crime',
    author: 'Trevor Noah',
    readOn: '2026-06',
    readThrough: '2026-07',
    country: 'South Africa',
    language: 'English',
    genre: 'Memoir',
    goodreads: 'https://www.goodreads.com/book/show/29780253-born-a-crime',
    cover: 'https://covers.openlibrary.org/b/id/8294078-L.jpg',
  },
  progress: undefined,
}

// Books under consideration. Leave the array empty to hide the section.
export const upNext: { title: string; author: string }[] = []
