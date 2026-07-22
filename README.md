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
  asset.ts          prefixes image paths with the base path (for the Pages subpath)
public/
  covers/           book cover images, one per book number
scripts/
  check-export.mjs  post-build guard: fails if any link/asset is broken
.github/workflows/
  deploy.yml        build → verify → publish to GitHub Pages on every push
```

## Deployment

The site deploys to **GitHub Pages** automatically. Every push to `main` triggers
`.github/workflows/deploy.yml`, which:

1. **builds** a static export (`next build` with `output: 'export'` → an `out/` folder),
2. **verifies** it with `npm run check:export` — this crawls every exported page and
   fails if any internal link or cover doesn't resolve, and
3. **publishes** to Pages — but only if the check passed. A broken build blocks the
   deploy, so the currently-live site stays up rather than going dark.

Live at **https://andyfou.github.io/societe-litteraire-salonique/**.

### One-time setup

In the repo on GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions.**
(Only needed once; after that, pushes deploy on their own.)

### Preview the real thing before pushing

```bash
npm run verify:pages
```

This builds exactly as CI does — under the `/societe-litteraire-salonique/` subpath —
and runs the same check, so you catch a "works locally, broken live" problem on your
machine in seconds. The subpath is why covers go through `lib/asset.ts`: GitHub Pages
serves the site under `/<repo>/`, and a bare `/covers/…` path would 404 there.

> **If you rename the repo,** update `NEXT_PUBLIC_BASE_PATH` in `.github/workflows/deploy.yml`
> (and in the `verify:pages` script in `package.json`) to match the new name.

Deploying to **Vercel** instead needs no config and no subpath — import the repo and it
just works (the base path stays empty unless the Pages workflow sets it).

## Notes

- Type is EB Garamond + Inter. EB Garamond is used because it has real Greek
  glyphs — most display serifs on Google Fonts don't, and much of the shelf is Greek.
- The site follows the reader's system light/dark preference, with a toggle to override it.
