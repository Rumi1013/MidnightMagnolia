import Layout from '../components/Layout';
import Link from 'next/link';
import { URLS } from '../lib/constants';

const OFFERINGS = [
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
    focus: 'Gumroad storefront',
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
      description="Magnolia Circle and tips on Buy Me a Coffee. Journals and kits on Gumroad."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Membership</p>
          <h1>The circle lives on Buy Me a Coffee.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Magnolia Circle and tips live on Buy Me a Coffee.
            Journals and kits live on Gumroad.
            Book a session when you want company for the work.
          </p>
        </div>

        <section className="section">
          <h2>Where to go first</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="card">
              <h3>Buy Me a Coffee</h3>
              <p className="muted">Magnolia Circle membership and tips.</p>
              <a href={URLS.bmac} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Open Buy Me a Coffee</a>
            </div>
            <div className="card">
              <h3>Gumroad</h3>
              <p className="muted">Digital products — free starter, journals, workbooks, and bundles.</p>
              <a href={URLS.gumroad} className="btn btn--outline" target="_blank" rel="noopener noreferrer">Open Gumroad</a>
            </div>
          </div>
          <p className="muted" style={{ marginTop: 'var(--space-lg)' }}>
            <Link href="/shop">Open the shop</Link>
            {' · '}
            <Link href="/services">Book a session</Link>
          </p>
        </section>

        <section className="section">
          <h2>Offerings</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            {OFFERINGS.map((tier) => (
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
      </div>
    </Layout>
  );
}
