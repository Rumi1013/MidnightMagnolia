import Layout from '../components/Layout';
import { URLS } from '../lib/constants';

const MEMBERSHIP_PATHS = [
  {
    name: 'Magnolia Circle',
    focus: 'Monthly membership',
    includes: [
      'Monthly shadow work prompts',
      'Ritual practice notes',
      'Member edition of Dusk Letters',
      'Community for quiet builders',
    ],
    cta: 'Join on Wix',
    url: URLS.wixHome,
  },
  {
    name: 'Digital goods + kits',
    focus: 'Gumroad products',
    includes: [
      'The Gentle Beginning (free starter)',
      'Shadow Work Starter Kit ($9)',
      'Journals, workbooks, and Deep Roots bundle',
    ],
    cta: 'Open Gumroad',
    url: URLS.gumroad,
  },
];

export default function MembershipPage() {
  return (
    <Layout
      title="Membership"
      description="Wix-first membership path, Gumroad product downloads, and Buy Me a Coffee for one-time support."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Membership</p>
          <h1>Wix launch first. Gumroad for products. BMAC for tips.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Magnolia Circle routes through the Wix launch. Digital downloads can live on Gumroad, and Buy Me a Coffee stays available for one-time support.
          </p>
        </div>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h2>Where to go first</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="card">
              <h3>Wix launch</h3>
              <p className="muted">Membership, booking, public sanctuary pages, and the primary launch path.</p>
              <a href={URLS.wixHome} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Open Wix Launch</a>
            </div>
            <div className="card">
              <h3>Buy Me a Coffee</h3>
              <p className="muted">One-time gratitude tips without subscribing.</p>
              <a href={URLS.bmac} className="btn btn--outline" target="_blank" rel="noopener noreferrer">Open Buy Me a Coffee</a>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Membership paths</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            {MEMBERSHIP_PATHS.map((tier) => (
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
            When the Patreon account is accessible again, you can mirror tier names there. This site treats Wix, Gumroad, and BMAC as the primary membership and support surfaces.
          </p>
          <a href={URLS.patreon} className="btn btn--ghost" style={{ marginTop: 'var(--space-md)' }} target="_blank" rel="noopener noreferrer">
            Patreon (if active)
          </a>
        </section>
      </div>
    </Layout>
  );
}
