// ─────────────────────────────────────────────────────────────────────────────
// THE SHELF
//
// The full record, books #1–47, numbered as the club numbers them. Only the
// recent books carry dates; the early years are known by title alone.
//
//   number     The club's own count — 1ο Βιβλίο … 47ο Βιβλίο.
//   titleEn /  Give whichever exist. At least one is required. The English title
//   titleGr    leads on the card when both are present, with the Greek beneath;
//              Greek-language books show the Greek title alone.
//   readOn     "YYYY-MM" the book was read (or just "YYYY" if only the year is
//              known). Optional — undated books gather under "Earlier".
//   readThrough Optional second month, for books that spanned two.
//   metOn      "YYYY-MM-DD" — the discussion date.
//   inPerson   Meetings are remote by default; set true for the rare live one.
//   goodreads  Link on the title.
//   cover      Image path. Covers are hosted locally under /public/covers; omit
//              and a typographic spine is drawn instead.
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
  /** "YYYY-MM" the book was read. Unknown for the club's early years, so optional. */
  readOn?: string
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
    cover: '/covers/46.jpg',
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
    cover: '/covers/45.jpg',
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
    cover: '/covers/44.jpg',
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
    cover: '/covers/43.jpg',
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
    cover: '/covers/42.jpg',
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
    cover: '/covers/41.jpg',
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
    cover: '/covers/40.jpg',
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
    cover: '/covers/39.jpg',
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
    cover: '/covers/38.jpg',
  },

  // ── Books 1–37: the club's first five years ──────────────────────────────────
  // Recovered from the club's own list. Mostly no read-dates survive, so these
  // show by number alone and gather under "Earlier" on the shelf. country /
  // language / genre are inferred from each author and are worth a check.
  // Goodreads links can be added later.
  {
    number: 37,
    titleEn: 'Lessons in Chemistry',
    author: 'Bonnie Garmus',
    readOn: '2025-07',
    metOn: '2025-07-19',
    country: 'United States',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/37.jpg',
  },
  {
    number: 36,
    titleEn: 'The Left Hand of Darkness',
    author: 'Ursula K. Le Guin',
    readOn: '2025', // year known, month not — shows and groups as "2025"
    country: 'United States',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/36.jpg',
  },
  {
    number: 35,
    titleEn: 'We Have Always Lived in the Castle',
    author: 'Shirley Jackson',
    country: 'United States',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/35.jpg',
  },
  {
    number: 34,
    titleEn: 'Between the World and Me',
    author: 'Ta-Nehisi Coates',
    country: 'United States',
    language: 'English',
    genre: 'Non-fiction',
    cover: '/covers/34.jpg',
  },
  {
    number: 33,
    titleEn: 'Prophet Song',
    author: 'Paul Lynch',
    country: 'Ireland',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/33.jpg',
  },
  {
    number: 32,
    titleEn: 'Exhalation',
    author: 'Ted Chiang',
    country: 'United States',
    language: 'English',
    genre: 'Short stories',
    cover: '/covers/32.jpg',
  },
  {
    number: 31,
    titleEn: 'Poor Things',
    author: 'Alasdair Gray',
    country: 'United Kingdom',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/31.jpg',
  },
  {
    number: 30,
    titleEn: '84, Charing Cross Road',
    author: 'Helene Hanff',
    country: 'United States',
    language: 'English',
    genre: 'Non-fiction',
    cover: '/covers/30.jpg',
  },
  {
    number: 29,
    titleEn: 'Small Things Like These',
    author: 'Claire Keegan',
    country: 'Ireland',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/29.jpg',
  },
  {
    number: 28,
    titleEn: 'Assembly',
    author: 'Natasha Brown',
    country: 'United Kingdom',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/28.jpg',
  },
  {
    number: 27,
    titleEn: 'Things We Lost in the Fire',
    author: 'Mariana Enriquez',
    country: 'Argentina',
    language: 'Spanish',
    genre: 'Short stories',
    cover: '/covers/27.jpg',
  },
  {
    number: 26,
    titleEn: 'Elephant',
    titleGr: 'Ελέφαντας',
    author: 'Raymond Carver',
    country: 'United States',
    language: 'English',
    genre: 'Short stories',
    cover: '/covers/26.jpg',
  },
  {
    number: 25,
    titleEn: 'The People on Platform 5',
    author: 'Clare Pooley',
    country: 'United Kingdom',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/25.jpg',
  },
  {
    number: 24,
    titleEn: 'Homegoing',
    author: 'Yaa Gyasi',
    country: 'Ghana',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/24.jpg',
  },
  {
    number: 23,
    titleEn: 'Diary of a Void',
    author: 'Emi Yagi',
    country: 'Japan',
    language: 'Japanese',
    genre: 'Novel',
    cover: '/covers/23.jpg',
  },
  {
    number: 22,
    titleEn: 'The Fire Next Time',
    author: 'James Baldwin',
    country: 'United States',
    language: 'English',
    genre: 'Non-fiction',
    cover: '/covers/22.jpg',
  },
  {
    number: 21,
    titleEn: "The Rotters' Club",
    author: 'Jonathan Coe',
    country: 'United Kingdom',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/21.jpg',
  },
  {
    number: 20,
    titleEn: 'The Death of Ivan Ilyich',
    titleGr: 'Ο Θάνατος του Ιβάν Ίλιτς',
    author: 'Leo Tolstoy',
    country: 'Russia',
    language: 'Russian',
    genre: 'Novella',
    cover: '/covers/20.jpg',
  },
  {
    number: 19,
    titleEn: 'The Years',
    titleGr: 'Τα Χρόνια',
    author: 'Annie Ernaux',
    country: 'France',
    language: 'French',
    genre: 'Memoir',
    cover: '/covers/19.jpg',
  },
  {
    number: 18,
    titleEn: 'A Man Called Ove',
    author: 'Fredrik Backman',
    country: 'Sweden',
    language: 'Swedish',
    genre: 'Novel',
    cover: '/covers/18.jpg',
  },
  {
    number: 17,
    titleEn: 'The Island of Missing Trees',
    author: 'Elif Shafak',
    country: 'Turkey',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/17.jpg',
  },
  {
    number: 16,
    titleEn: 'Kim Jiyoung, Born 1982',
    author: 'Cho Nam-Joo',
    country: 'South Korea',
    language: 'Korean',
    genre: 'Novel',
    cover: '/covers/16.jpg',
  },
  {
    number: 15,
    titleEn: 'Open Water',
    author: 'Caleb Azumah Nelson',
    country: 'United Kingdom',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/15.jpg',
  },
  {
    number: 14,
    titleEn: 'Fear',
    author: 'Stefan Zweig',
    country: 'Austria',
    language: 'German',
    genre: 'Novella',
    cover: '/covers/14.jpg',
  },
  {
    number: 13,
    titleEn: 'Z',
    titleGr: 'Ζ',
    author: 'Vassilis Vassilikos',
    country: 'Greece',
    language: 'Greek',
    genre: 'Novel',
    cover: '/covers/13.jpg',
  },
  {
    number: 12,
    titleEn: 'Never Let Me Go',
    author: 'Kazuo Ishiguro',
    country: 'United Kingdom',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/12.jpg',
  },
  {
    number: 11,
    titleEn: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    country: 'United Kingdom',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/11.jpg',
  },
  {
    number: 10,
    titleEn: 'Beloved',
    titleGr: 'Αγαπημένη',
    author: 'Toni Morrison',
    country: 'United States',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/10.jpg',
  },
  {
    number: 9,
    titleEn: "The Handmaid's Tale",
    author: 'Margaret Atwood',
    country: 'Canada',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/9.jpg',
  },
  {
    number: 8,
    titleEn: 'At the Existentialist Café',
    titleGr: 'Στο Καφέ των Υπαρξιστών',
    author: 'Sarah Bakewell',
    country: 'United Kingdom',
    language: 'English',
    genre: 'Non-fiction',
    cover: '/covers/8.jpg',
  },
  {
    number: 7,
    titleEn: "One Flew Over the Cuckoo's Nest",
    titleGr: 'Στη Φωλιά του Κούκου',
    author: 'Ken Kesey',
    country: 'United States',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/7.jpg',
  },
  {
    number: 6,
    titleEn: 'Three Sisters',
    titleGr: 'Οι Τρεις Αδερφές',
    author: 'Anton Chekhov',
    country: 'Russia',
    language: 'Russian',
    genre: 'Play',
    cover: '/covers/6.jpg',
  },
  {
    number: 5,
    titleEn: 'Justice',
    titleGr: 'Δικαιοσύνη',
    author: 'Michael J. Sandel',
    country: 'United States',
    language: 'English',
    genre: 'Non-fiction',
    cover: '/covers/5.jpg',
  },
  {
    number: 4,
    titleEn: 'A Room of One’s Own',
    titleGr: 'Ένα Δικό της Δωμάτιο',
    author: 'Virginia Woolf',
    country: 'United Kingdom',
    language: 'English',
    genre: 'Non-fiction',
    cover: '/covers/4.jpg',
  },
  {
    number: 3,
    titleEn: "The Incorrigible Optimists' Club",
    titleGr: 'Η Λέσχη των Αθεράπευτα Αισιόδοξων',
    author: 'Jean-Michel Guenassia',
    country: 'France',
    language: 'French',
    genre: 'Novel',
    cover: '/covers/3.jpg',
  },
  {
    number: 2,
    titleEn: 'The Man Who Mistook His Wife for a Hat',
    author: 'Oliver Sacks',
    country: 'United Kingdom',
    language: 'English',
    genre: 'Non-fiction',
    cover: '/covers/2.jpg',
  },
  {
    number: 1,
    titleEn: 'Lord of the Flies',
    author: 'William Golding',
    country: 'United Kingdom',
    language: 'English',
    genre: 'Novel',
    cover: '/covers/1.jpg',
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
    cover: '/covers/47.jpg',
  },
  progress: undefined,
}

// Books under consideration. Leave the array empty to hide the section.
export const upNext: { title: string; author: string }[] = []
