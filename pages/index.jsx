import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { BRAND_ASSETS } from '../lib/brandAssets';
import { URLS, PRODUCTS } from '../lib/constants';

export default function Home() {
  // Show 3 featured products: the free starter, the $9 journal, and the flagship $49 bundle
  const featuredProducts = PRODUCTS.filter(p => ['gentle-beginning', 'shadow-work-starter', 'deep-roots'].includes(p.id));

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <p className="hero__eyebrow">Midnight Magnolia · Lowcountry, SC</p>
          <h1 className="hero__title">
            A sanctuary for <em style={{ color: 'var(--color-amber)', fontStyle: 'italic' }}>quiet builders.</em>
          </h1>
          <p className="hero__subtitle">
            Shadow work journals, a healing membership, and slow-build consulting — made for neurodivergent
            creators who know their pace is not a problem.
          </p>
          <div className="hero__actions">
            <a href={URLS.gumroad} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
              Start Here
            </a>
            <a href={URLS.bmac} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
              Magnolia Circle
            </a>
          </div>
          <p className="muted" style={{ marginTop: 'var(--space-md)', fontSize: '0.85rem', maxWidth: '52ch' }}>
            One door in. Journals and kits live in{' '}
            <a href={URLS.gumroad} target="_blank" rel="noopener noreferrer">the shop</a>
            . Membership and tips live on{' '}
            <a href={URLS.bmac} target="_blank" rel="noopener noreferrer">Buy Me a Coffee</a>
            . Sessions live on{' '}
            <Link href="/services">Bookings</Link>
            — after you know where you are.
          </p>
        </div>
      </section>

      {/* ── Catalog (living archive) ─────────────────────────── */}
      <section id="catalog" className="section section--linen">
        <div className="container">
          <h2>From the illustration library.</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '52ch', marginTop: 'var(--space-md)' }}>
            Original pieces from the <strong>Magnolia Priestess</strong> and <strong>Riverwalk Lantern Path</strong> series — two collections in the Midnight Magnolia catalog.
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
          <p className="muted" style={{ marginTop: 'var(--space-lg)', fontSize: '0.875rem', maxWidth: '48ch' }}>
            <Link href="/services">Book a session</Link>
            {' · '}
            <Link href="/work-with-me">See how we work together</Link>
          </p>
        </div>
      </section>

      {/* ── About / positioning ───────────────────────────────── */}
      <section className="section section--dusk home-about" aria-labelledby="about-heading">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>Who this house is for.</h2>
          <p className="muted" style={{ textAlign: 'center', maxWidth: '52ch', margin: '0 auto' }}>
            Neurodivergent creators, women in transition, and quiet builders who need structure that holds on a low-energy day.
          </p>
        </div>
      </section>

      {/* ── Three pathways ───────────────────────────────────── */}
      <section className="section" aria-labelledby="doors-heading">
        <div className="container">
          <h2 id="doors-heading">Three ways in.</h2>
          <div className="divider" />
          <div className="grid-3" style={{ marginTop: 'var(--space-lg)' }}>
            {[
              {
                title: 'The Healing Shop',
                desc:  'Journals, kits, and the Deep Roots Shadow Work System. Begin with the free starter. Take what you need.',
                href:  URLS.gumroad,
                cta:   'Browse the Shop',
                external: true,
              },
              {
                title: 'Magnolia Circle',
                desc:  'A $9/month membership with monthly shadow work prompts, ritual practices, and the member edition of Dusk Letters.',
                href:  URLS.bmac,
                cta:   'Join Magnolia Circle',
                external: true,
              },
              {
                title: 'Work With Me',
                desc:  'One-on-one consulting, AI literacy workshops, and done-for-you career docs — built for quiet builders ready to move.',
                href:  '/work-with-me',
                cta:   'See Services',
              },
            ].map(door => (
              <div className="card" key={door.title}>
                <h3>{door.title}</h3>
                <div className="divider" style={{ width: 32 }} />
                <p className="muted">{door.desc}</p>
                {door.external ? (
                  <a href={door.href} className="btn btn--ghost" style={{ marginTop: 'var(--space-lg)', display: 'inline-block' }} target="_blank" rel="noopener noreferrer">
                    {door.cta}
                  </a>
                ) : (
                  <Link href={door.href} className="btn btn--ghost" style={{ marginTop: 'var(--space-lg)', display: 'inline-block' }}>
                    {door.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop feature ──────────────────────────────────────── */}
      <section className="section section--dusk">
        <div className="container">
          <div className="flex-between" style={{ marginBottom: 'var(--space-lg)' }}>
            <div>
              <h2>Start where it feels light.</h2>
              <div className="divider" />
              <p className="muted" style={{ maxWidth: '46ch', marginTop: 'var(--space-sm)', fontSize: '0.9rem' }}>
                You don&apos;t need everything. Just one tool that meets you where you are.
              </p>
            </div>
            <Link href="/shop" className="btn btn--outline">Print &amp; merch</Link>
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
                    View in shop
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy / quote ─────────────────────────────────── */}
      <section className="section section--dark home-quote" aria-labelledby="philosophy-heading">
        <div className="container">
          <h2 style={{ maxWidth: '20ch', margin: '0 auto' }}>
            "The work is not to do more.<br />
            <em style={{ color: 'var(--color-amber)' }}>It is to build something that holds.</em>"
          </h2>
          <p className="muted" style={{ maxWidth: '44ch', margin: 'var(--space-md) auto 0' }}>
            You don't have to hustle your way here. Start where you are.
          </p>
          <div style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/sanctuary" className="btn btn--outline">Read the Story</Link>
            <a href={URLS.gumroad} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Start Here</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
