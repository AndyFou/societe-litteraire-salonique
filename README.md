# Société Littéraire du Salonique

A small static site for the reading club: who we are, what we have read, and what we are reading now.

No database, no login. Everything the site knows lives in two files.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Editing the content

Everything you will ever need to change is in `data/`:

| File            | Holds                                                            |
| --------------- | ---------------------------------------------------------------- |
| `data/books.ts` | The shelf, the current book, the shortlist                       |
| `data/club.ts`  | Club name, tagline, the history paragraphs, the selection ritual |

### Adding a book you've just finished

1. Move the entry out of `currentlyReading` and into the top of the `books` array.
2. Set `readOn` to the month you discussed it, as `"YYYY-MM"`.
3. Point `currentlyReading` at whatever is next, and update `meetingOn`.

Only `title`, `author` and `readOn` are required. Every other field is optional —
the cards, filters and stats all skip what isn't there, so it's fine to backfill
page counts and countries gradually.

### Covers

`cover` takes any image URL. Books without one get a typographic cover drawn from
the title and author, which is why the shelf still looks deliberate with no images
at all. If you do want real covers, the Open Library cover API works well:

```
https://covers.openlibrary.org/b/isbn/9780156031820-L.jpg
```

## Pages

- `/` — the club, the current book and next meeting, four most recent reads, the shortlist
- `/shelf` — everything read, filterable by year / genre / origin, sortable five ways
- `/stats` — counts, books per year, rankings by author / country / language / genre, extremes

## Structure

```
app/
  layout.tsx        nav, fonts, footer
  page.tsx          home
  shelf/page.tsx    the archive
  stats/page.tsx    by the numbers
components/
  BookCard.tsx      cover (or drawn fallback) + title + author + note
  Shelf.tsx         client component: the filter and sort controls
data/
  books.ts          ← the reading list
  club.ts           ← the words
lib/
  books.ts          sorting, date formatting, stat aggregation
```

## Notes

- Type is EB Garamond + Inter. EB Garamond is used because it has real Greek
  glyphs — most display serifs on Google Fonts don't, and much of the shelf is Greek.
- The site follows the reader's system light/dark preference.
- Deploys to Vercel as-is: import the repo, no environment variables needed.
