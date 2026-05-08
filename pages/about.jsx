import Link from 'next/link';
import Layout from '../components/Layout';
import { URLS } from '../lib/constants';

export default function AboutPage() {
  return (
    <Layout
      title="About"
      description="Voice-first story, roots, and values behind Midnight Magnolia."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">About Midnight Magnolia</p>
          <h1>Built in the Lowcountry, for quiet builders.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            This work is for people who are healing, creating, and rebuilding at the same time.
          </p>
        </div>

        <section className="section">
          <div style={{ maxWidth: '70ch' }}>
            <h2>Our voice.</h2>
            <div className="divider" />
            <p>
              Midnight Magnolia is Southern Gothic strategy with soft edges: practical systems,
              beautiful tools, and honest language for people who do not move in hustle rhythms.
            </p>
            <p className="muted" style={{ marginTop: 'var(--space-md)' }}>
              We center neurodivergent creators, women in transition, and purpose-led builders who
              need clarity that respects energy, grief, and real life.
            </p>
          </div>
        </section>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h2>Brand values.</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            {[
              ['Clarity over chaos', 'We simplify until the next step is clear.'],
              ['Beauty with function', 'Design supports action, not performance.'],
              ['Sustainable pace', 'Systems should hold on low-energy days.'],
              ['Truth over noise', 'We do not sell urgency we do not believe in.'],
            ].map(([title, desc]) => (
              <div className="card" key={title}>
                <h3 style={{ fontSize: '1.05rem' }}>{title}</h3>
                <p className="muted" style={{ fontSize: '0.9rem' }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{ paddingBottom: 'var(--space-2xl)' }}>
          <h2>Where to begin.</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '56ch', marginBottom: 'var(--space-lg)' }}>
            Start with free resources in the Sanctuary, then choose your next step:
            products, services, or membership support.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <Link href="/sanctuary" className="btn btn--primary">Enter the Sanctuary</Link>
            <Link href="/membership" className="btn btn--outline">View Membership</Link>
            <a href={URLS.stanStore} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">Visit the Shop</a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
