# Société Littéraire de Salonique

A small static site for the reading club: who we are, what we have read, and what we are reading now.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Editing the content

Everything you will ever need to change is in `data/`:

| File            | Holds                                                              |
| --------------- | ----------------------------------------------------------------- |
| `data/books.ts` | The shelf, the current book, the shortlist                        |
| `data/club.ts`  | Club name, tagline, monogram, history paragraphs, selection ritual |

### Adding a book you've just finished

1. Move the entry out of `currentlyReading` into the top of the `books` array, and give it the next number.
2. Set `metOn` to the meeting date (`"YYYY-MM-DD"`) and `readOn` to the month (`"YYYY-MM"`, or just `"YYYY"` if that's all you know).
3. Point `currentlyReading` at whatever is next.

Only a `number`, an `author`, and at least one title (`titleEn` or `titleGr`) are required. Every other field is optional — the cards, filters and stats all skip what isn't there, so undated older books simply gather under "Earlier".

### Covers

Covers live in `public/covers/`, one image per book number (e.g. `public/covers/38.jpg`), referenced as `cover: '/covers/38.jpg'`. To add one, drop the image in that folder and point `cover` at it. A book with no cover gets a typographic spine drawn from its title and author, so the shelf still looks deliberate.

(If you have cover image URLs instead of files, you can paste them straight into `cover` — they can be pulled local in a batch later.)

## Pages

- `/` — the wordmark, a face-out shelf of every cover, the current book, and the four most recent reads
- `/club` — the club's history, how it chooses its books, and a few facts (founded, home, how it meets, total read)
- `/shelf` — everything read, grouped by year with undated early books under "Earlier"; filterable by year / genre / origin and sortable
- `/stats` — totals and rankings by country / language / genre / author; date-based views (per-year, how-we-meet) appear once the books carry dates

## Structure

```
app/
  layout.tsx        nav (SLS mark, links, theme toggle), fonts, footer
  page.tsx          home — wordmark, cover shelf, current book, recent reads
  club/page.tsx     the club — history, ritual, facts
  shelf/page.tsx    the archive — filter + sort
  stats/page.tsx    by the numbers
components/
  BookCard.tsx      cover (or drawn spine) + titles + author + dates + Goodreads link
  CoverShelf.tsx    the face-out row of covers on the home page
  Shelf.tsx         client component: the filter and sort controls
  ThemeToggle.tsx   light/dark switch
data/
  books.ts          ← the reading list
  club.ts           ← the club's words
lib/
  books.ts          sorting, date formatting, stat aggregation
public/
  covers/           book cover images, one per book number
```

## Notes

- Type is EB Garamond + Inter. EB Garamond is used because it has real Greek
  glyphs — most display serifs on Google Fonts don't, and much of the shelf is Greek.
- The site follows the reader's system light/dark preference, with a toggle to override it.
- Deploys to Vercel as-is: import the repo, no environment variables needed.
