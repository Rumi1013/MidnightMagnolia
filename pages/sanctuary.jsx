import Link from 'next/link';
import Layout from '../components/Layout';
import PageIllustration from '../components/PageIllustration';
import { PAGE_ILLUSTRATIONS } from '../lib/brandAssets';
import { URLS } from '../lib/constants';

export default function Sanctuary() {
  return (
    <Layout
      title="The Sanctuary"
      description="The story of Midnight Magnolia and Latisha Vincent-Waters — Senior Program Manager, digital entrepreneur, and Lowcountry SC native."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">About</p>
          <h1>You found the right quiet.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            This is a space for neurodivergent creators, healing-centered women, and quiet builders
            who are done performing urgency they don't feel.
          </p>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.sanctuary} />

        {/* Story */}
        <section className="section">
          <div style={{ maxWidth: '680px' }}>
            <h2>The story.</h2>
            <div className="divider" />
            <p style={{ marginBottom: 'var(--space-md)' }}>
              I am Latisha Vincent-Waters — a Senior Program Manager, digital entrepreneur,
              and Lowcountry South Carolina native with 15+ years building systems that actually hold people.
            </p>
            <p style={{ marginBottom: 'var(--space-md)' }}>
              I have secured over $1.5 million in funding, managed $300K+ budgets, and directed programs
              serving 600+ community members across four counties. I am a Soros Justice Fellow,
              completing my A.A.S. in Information Technology at Trident Technical College,
              and building toward an M.L.I.S. with a concentration in digital archival science
              and cultural heritage preservation.
            </p>
            <p>
              Now I am building Midnight Magnolia — because the tools that help people should feel like rest, not labor.
            </p>
          </div>
        </section>

        {/* Who this is for */}
        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>This space is for you if:</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            {[
              'You are neurodivergent and done apologizing for how your brain works.',
              'You want to build income without burning yourself down.',
              'You are a quiet builder who needs structure that breathes.',
              'You are in transition and need real tools, not motivation.',
            ].map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-amber)', fontFamily: 'var(--font-display)', fontSize: '1.5rem', lineHeight: 1 }}>—</span>
                <p>{line}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Credentials */}
        <section className="section">
          <h2>Credentials.</h2>
          <div className="divider" />
          <div className="grid-2">
            {[
              { label: 'Education', items: ['B.A. Mass Communications · Claflin University', 'A.A.S. Information Technology (in progress) · Trident Technical College', 'Database Administrator Cert (concurrent) · Trident Tech'] },
              { label: 'Recognition', items: ['Soros Justice Fellow · Open Society Foundations 2022', 'Workforce Development Scholarship Recipient', 'Google Data Analytics Certificate (2025)'] },
            ].map(col => (
              <div className="card" key={col.label}>
                <h4 style={{ color: 'var(--color-amber)', marginBottom: 'var(--space-md)' }}>{col.label}</h4>
                {col.items.map(item => <p key={item} style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>{item}</p>)}
              </div>
            ))}
          </div>
        </section>

        {/* CTAs */}
        <section className="section" style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', paddingBottom: 'var(--space-2xl)' }}>
          <a href={URLS.booking} className="btn btn--primary" target="_blank" rel="noopener">Book a Session</a>
          <Link href="/portfolio" className="btn btn--outline">View the Portfolio</Link>
          <a href={URLS.stanStore} className="btn btn--ghost" target="_blank" rel="noopener">Visit the Shop</a>
        </section>
      </div>
    </Layout>
  );
}