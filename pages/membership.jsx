import Layout from '../components/Layout';
import Link from 'next/link';
import { URLS } from '../lib/constants';

const BMAC_OFFERINGS = [
  {
    name: 'Magnolia Circle',
    focus: 'Monthly membership',
    includes: [
      'Monthly shadow work prompts',
      'Ritual practice notes',
      'Member edition of Dusk Letters',
      'Community for quiet builders',
    ],
    cta: 'Join on Buy Me a Coffee',
    url: URLS.bmac,
  },
  {
    name: 'Digital goods + kits',
    focus: 'BMAC storefront',
    includes: [
      'The Gentle Beginning (free starter)',
      'Shadow Work Starter Kit ($9)',
      'Journals, workbooks, and Deep Roots bundle',
    ],
    cta: 'Open Buy Me a Coffee',
    url: URLS.bmac,
  },
];

export default function MembershipPage() {
  return (
    <Layout
      title="Membership"
      description="Buy Me a Coffee–first membership and digital goods. Stan is deferred for cost. Patreon remains optional when the account is active."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Membership</p>
          <h1>BMAC first. Tips and membership in one place.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Magnolia Circle and digital products live on Buy Me a Coffee.
            Physical merch and bookings stay on Wix Headless. Stan Store is paused for cost.
          </p>
        </div>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h2>Where to go first</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="card">
              <h3>Buy Me a Coffee</h3>
              <p className="muted">Membership (Magnolia Circle), free starter, journals, tips, and bundles.</p>
              <a href={URLS.bmac} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Open Buy Me a Coffee</a>
            </div>
            <div className="card">
              <h3>Wix catalog / bookings</h3>
              <p className="muted">Optional physical catalog and session booking via the Headless storefront.</p>
              <Link href="/shop" className="btn btn--outline">Browse Wix Catalog</Link>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>BMAC offerings</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            {BMAC_OFFERINGS.map((tier) => (
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
            When the Patreon account is accessible again, you can mirror tier names there. This site treats Buy Me a Coffee as the primary membership and support surface.
          </p>
          <a href={URLS.patreon} className="btn btn--ghost" style={{ marginTop: 'var(--space-md)' }} target="_blank" rel="noopener noreferrer">
            Patreon (if active)
          </a>
        </section>
      </div>
    </Layout>
  );
}
