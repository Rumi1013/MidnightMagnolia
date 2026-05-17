import Layout from '../components/Layout';
import { URLS } from '../lib/constants';

const STAN_MEMBERSHIP = [
  {
    name: 'Magnolia Circle',
    focus: 'Monthly membership',
    includes: [
      'Monthly shadow work prompts',
      'Ritual practice notes',
      'Member edition of Dusk Letters',
      'Community for quiet builders',
    ],
    cta: 'Join on Stan',
    url: URLS.stanStore,
  },
  {
    name: 'Digital goods + kits',
    focus: 'Stan storefront',
    includes: [
      'The Gentle Beginning (free starter)',
      'Shadow Work Starter Kit ($9)',
      'Journals, workbooks, and Deep Roots bundle',
    ],
    cta: 'Open Gumroad',
    url: URLS.stanStore,
  },
];

export default function MembershipPage() {
  return (
    <Layout
      title="Membership"
      description="Stan-first membership and digital goods, with Buy Me a Coffee for tips. Patreon remains optional when the account is active."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Membership</p>
          <h1>Stan first. BMAC for tips. Patreon when it is live.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Magnolia Circle and digital products live on Stan. Buy Me a Coffee is for one-time support.
            If your Patreon is restored, keep it linked from the footer as a secondary path.
          </p>
        </div>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h2>Where to go first</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="card">
              <h3>Stan</h3>
              <p className="muted">Membership (Magnolia Circle), free starter, journals, and bundles.</p>
              <a href={URLS.gumroad} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Open Gumroad</a>
            </div>
            <div className="card">
              <h3>Buy Me a Coffee</h3>
              <p className="muted">One-time gratitude tips without subscribing.</p>
              <a href={URLS.bmac} className="btn btn--outline" target="_blank" rel="noopener noreferrer">Open Buy Me a Coffee</a>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Stan offerings</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            {STAN_MEMBERSHIP.map((tier) => (
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

        <section className="section section--dusk" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
          <h3>Patreon (optional)</h3>
          <p className="muted" style={{ maxWidth: '56ch', marginTop: 'var(--space-sm)' }}>
            When the Patreon account is accessible again, you can mirror tier names there. This site treats Stan + BMAC as the primary membership and support surfaces.
          </p>
          <a href={URLS.patreon} className="btn btn--ghost" style={{ marginTop: 'var(--space-md)' }} target="_blank" rel="noopener noreferrer">
            Patreon (if active)
          </a>
        </section>
      </div>
    </Layout>
  );
}
