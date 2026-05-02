import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { BRAND_ASSETS } from '../lib/brandAssets';
import { URLS, PRODUCTS } from '../lib/constants';

export default function Home() {
  const featuredProducts = PRODUCTS.filter(p => p.tag !== 'Coming Soon').slice(0, 3);

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <p className="hero__eyebrow">Midnight Magnolia · Lowcountry, SC</p>
          <h1 className="hero__title">
            A sanctuary for<br />
            <em style={{ color: 'var(--color-amber)', fontStyle: 'italic' }}>quiet builders.</em>
          </h1>
          <p className="hero__subtitle">
            Southern Gothic healing tools, digital products, and consulting for neurodivergent creators
            who are done performing urgency they don't feel.
          </p>
          <div className="hero__actions">
            <a href={URLS.booking} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
              Book a Session
            </a>
            <Link href="/shop" className="btn btn--outline">Visit the Shop</Link>
          </div>
        </div>
      </section>

      {/* ── Artwork · organized library ───────────────────────── */}
      <section className="section section--linen">
        <div className="container">
          <h2>From the organized library.</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '52ch', marginTop: 'var(--space-md)' }}>
            Pieces from <strong>magnolia priestess</strong> and <strong>riverwalk lantern path</strong>—two lanes in your
            Midnight Magnolia artwork catalog.
          </p>
          <div className="art-strip">
            {BRAND_ASSETS.gallery.map((img) => (
              <figure key={img.src} className="art-strip__frame">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={720}
                  height={540}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
                />
                <figcaption className="art-strip__cap">
                  {img.series}
                  {img.medium ? <span className="art-strip__medium"> · {img.medium}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="section section--dark">
        <div className="container">
          <div className="stat-grid">
            {[
              { number: '$1.5M+', label: 'Funding Secured' },
              { number: '610+',   label: 'Program Participants' },
              { number: '15+',    label: 'Years of Leadership' },
              { number: '$300K+', label: 'Annual Budget Managed' },
            ].map(s => (
              <div className="stat-block" key={s.label}>
                <span className="stat-number">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Doors ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <h2>Three ways in.</h2>
          <div className="divider" />
          <div className="grid-3" style={{ marginTop: 'var(--space-lg)' }}>
            {[
              {
                title: 'Work With Me',
                desc:  'Workflow consulting, AI literacy workshops, and career docs for $100K+ remote roles.',
                href:  '/work-with-me',
                cta:   'See Services',
              },
              {
                title: 'The Shop',
                desc:  'Digital products from $9 — journals, planners, career tools, and the Soft Business Guide.',
                href:  '/shop',
                cta:   'Browse Products',
              },
              {
                title: 'The Grimoire',
                desc:  'Southern Gothic writing, public domain Black literature, and healing resources for the long haul.',
                href:  '/grimoire',
                cta:   'Read the Grimoire',
              },
            ].map(door => (
              <div className="card" key={door.title}>
                <h3>{door.title}</h3>
                <div className="divider" style={{ width: 32 }} />
                <p className="muted">{door.desc}</p>
                <Link href={door.href} className="btn btn--ghost" style={{ marginTop: 'var(--space-lg)', display: 'inline-block' }}>
                  {door.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────── */}
      <section className="section section--dusk">
        <div className="container">
          <div className="flex-between" style={{ marginBottom: 'var(--space-lg)' }}>
            <div>
              <h2>From the shop.</h2>
              <div className="divider" />
            </div>
            <Link href="/shop" className="btn btn--outline">All Products</Link>
          </div>
          <div className="grid-3">
            {featuredProducts.map(p => (
              <div className="card" key={p.id}>
                {p.tag && <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>{p.tag}</span>}
                <h3>{p.title}</h3>
                <p className="muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{p.description}</p>
                <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-amber)' }}>{p.price}</span>
                  <a href={p.url} className="btn btn--primary" style={{ padding: '0.5rem 1.2rem' }} target="_blank" rel="noopener">
                    Get It Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="section section--dark" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ maxWidth: '18ch', margin: '0 auto' }}>
            "The work is not to do more.<br />
            <em style={{ color: 'var(--color-amber)' }}>It is to build something that holds.</em>"
          </h2>
          <div style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/sanctuary" className="btn btn--outline">Read the Story</Link>
            <a href={URLS.stanStore} className="btn btn--primary" target="_blank" rel="noopener">Visit the Shop</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}