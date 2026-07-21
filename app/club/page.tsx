import type { Metadata } from 'next'
import { club } from '@/data/club'
import { getCounts } from '@/lib/books'

export const metadata: Metadata = {
  title: `The Club · ${club.name}`,
  description: club.tagline,
}

export default function ClubPage() {
  const { read } = getCounts()

  const facts: { label: string; value: string }[] = [
    { label: 'Founded', value: String(club.foundedYear) },
    { label: 'Home', value: club.city },
    { label: 'We meet', value: 'Remotely, once a month or two' },
    { label: 'Read so far', value: `${read} books` },
  ]

  return (
    <div className="space-y-14">
      <div>
        <h1 className="font-serif text-4xl sm:text-5xl">The Club</h1>
        <p className="mt-3 max-w-xl font-serif text-lg italic text-ink-soft">{club.tagline}</p>
      </div>

      <div className="max-w-2xl space-y-4 text-[1.125rem] leading-relaxed text-ink-soft">
        {club.history.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {club.ritual && (
        <section className="max-w-2xl">
          <p className="eyebrow mb-4">How we choose</p>
          <p className="text-[1.125rem] leading-relaxed text-ink-soft">{club.ritual}</p>
        </section>
      )}

      <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-8 sm:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="eyebrow mb-1.5">{f.label}</dt>
            <dd className="font-serif text-lg leading-snug text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
