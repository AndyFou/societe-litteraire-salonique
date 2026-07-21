// ─────────────────────────────────────────────────────────────────────────────
// CLUB IDENTITY — the words that appear across the site.
// Edit freely; nothing here is structural.
// ─────────────────────────────────────────────────────────────────────────────

export const club = {
  name: 'Société Littéraire du Salonique',
  shortName: 'La Société',
  tagline: 'A reading club of Thessaloniki, meeting from wherever we happen to be.',
  foundedYear: 2020,
  city: 'Thessaloniki',

  // The history section on the homepage. Each string is one paragraph.
  history: [
    `We began in ${2020} around a table in Thessaloniki, with the modest ambition of finishing one book a month and the immodest one of having something to argue about while doing it.`,
    `Six years on, the table is gone and the arguments have not. We are scattered now — different cities, occasionally different continents — so the club lives on a video call, one evening a month, cameras optional and opinions mandatory.`,
    `We read slowly and widely: Greek writers we grew up half-avoiding, translations we would never have picked alone, the occasional doorstop that takes two meetings. There is no reading list beyond the next book, and no rule except that whoever chooses has to defend the choice.`,
  ],

  // How books get picked. Set to null to hide this section.
  ritual: `Each month one member chooses, and the turn rotates. The only constraint is that you cannot pick an author the club has already read — which, six years in, is starting to require some effort.`,
}
