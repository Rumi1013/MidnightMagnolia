import Layout from '../components/Layout';
import { URLS } from '../lib/constants';

const TIERS = [
  {
    name: 'Candle Tender',
    focus: 'Grounding + reflection',
    includes: ['Monthly reflection note', 'Prompt set', 'Member update'],
    cta: 'Join on Patreon',
    url: URLS.patreon,
  },
  {
    name: 'Circle Keeper',
    focus: 'Practice + momentum',
    includes: ['Everything in Candle Tender', 'Audio ritual or guided reflection', 'Bonus resource'],
    cta: 'Join on Patreon',
    url: URLS.patreon,
  },
  {
    name: 'Altar Keeper',
    focus: 'Deep support',
    includes: ['Everything in Circle Keeper', 'Quarterly private session support', 'Priority member notes'],
    cta: 'Join on Patreon',
    url: URLS.patreon,
  },
];

export default function MembershipPage() {
  return (
    <Layout
      title="Membership"
      description="Patreon and Buy Me a Coffee options for supporting Midnight Magnolia."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Membership</p>
          <h1>Support the work, choose your pace.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Patreon is for recurring tiered membership. Buy Me a Coffee is for one-time support.
          </p>
        </div>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h2>Patreon vs Buy Me a Coffee</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="card">
              <h3>Patreon</h3>
              <p className="muted">Best if you want monthly support and tier benefits.</p>
              <a href={URLS.patreon} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Open Patreon</a>
            </div>
            <div className="card">
              <h3>Buy Me a Coffee</h3>
              <p className="muted">Best for one-time gratitude support or occasional giving.</p>
              <a href={URLS.bmac} className="btn btn--outline" target="_blank" rel="noopener noreferrer">Open Buy Me a Coffee</a>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Membership tiers</h2>
          <div className="divider" />
          <div className="grid-3" style={{ marginTop: 'var(--space-lg)' }}>
            {TIERS.map((tier) => (
              <div className="card" key={tier.name} style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>{tier.focus}</span>
                <h3>{tier.name}</h3>
                <ul style={{ marginTop: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                  {tier.includes.map((item) => (
                    <li key={item} className="muted" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={tier.url} className="btn btn--primary" target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto' }}>
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0, paddingBottom: 'var(--space-2xl)' }}>
          <p className="muted" style={{ maxWidth: '58ch' }}>
            If you are unsure where to begin, start with one month at Candle Tender.
            You can move up only if it still feels aligned and sustainable.
          </p>
        </section>
      </div>
    </Layout>
  );
}
