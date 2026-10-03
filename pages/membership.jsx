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
    cta: 'Join Magnolia Circle',
    url: URLS.bmac,
  },
  {
    name: 'Journals and kits',
    focus: 'Digital goods',
    includes: [
      'The Gentle Beginning (free starter)',
      'Shadow Work Starter Kit ($9)',
      'Journals, workbooks, and Deep Roots bundle',
    ],
    cta: 'Browse the Shop',
    url: URLS.gumroad,
  },
];

export default function MembershipPage() {
  return (
    <Layout
      title="Membership"
      description="Magnolia Circle membership and tips, plus journals and kits from the shop."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Membership</p>
          <h1>Magnolia Circle. Journals when you are ready.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            A monthly membership for reflection and prompts.
            Journals, kits, and career docs live in the shop.
            Book a session when you want one-on-one work.
          </p>
        </div>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h2>Where to go first</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            <div className="card">
              <h3>Magnolia Circle</h3>
              <p className="muted">Membership and tips on Buy Me a Coffee.</p>
              <a href={URLS.bmac} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Join Magnolia Circle</a>
            </div>
            <div className="card">
              <h3>The Shop</h3>
              <p className="muted">Digital products — free starter, journals, workbooks, and bundles.</p>
              <a href={URLS.gumroad} className="btn btn--outline" target="_blank" rel="noopener noreferrer">Browse the Shop</a>
            </div>
          </div>
          <p className="muted" style={{ marginTop: 'var(--space-lg)' }}>
            Print, merch, and bookings:{' '}
            <Link href="/shop">print &amp; merch</Link>
            {' · '}
            <Link href="/services">book a session</Link>.
          </p>
        </section>

        <section className="section" style={{ paddingBottom: 'var(--space-2xl)' }}>
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
