// ─────────────────────────────────────────────────────────────────────────────
// CLUB IDENTITY — the words that appear across the site.
// Edit freely; nothing here is structural.
// ─────────────────────────────────────────────────────────────────────────────

export const club = {
  // The seal, shown large on the homepage. Save the logo to `public/` and put
  // its path here — e.g. '/logo.png'. Leave it null and the homepage simply
  // opens on the title instead.
  seal: null as string | null,

  name: 'Société Littéraire de Salonique',
  shortName: 'La Société',
  tagline: 'A reading club of Thessaloniki, meeting from wherever we happen to be.',
  foundedYear: 2020,
  city: 'Thessaloniki',

  // ⚠️ DRAFT — written to fit the reading record, not from your account of it.
  // Rewrite freely. Each string is one paragraph.
  history: [
    `We began in 2020 in Thessaloniki, with the modest ambition of finishing a book together and the immodest one of having something to argue about while doing it. Forty-seven books later, we are still counting them in order.`,
    `The club is scattered now — different cities, occasionally different continents — so it lives on a video call, one evening every month or two, cameras optional and opinions mandatory. Once in a while we manage to be in the same room, and it is always worth the trouble.`,
    `We read widely and without a plan: Korean and Bulgarian and Mexican novels, Greek popular history, the occasional doorstop that takes two months. There is no reading list beyond the next book.`,
  ],

  // How books get picked. Set to null to hide this section.
  // ⚠️ DRAFT — replace with how the club actually chooses.
  ritual: null as string | null,
}
