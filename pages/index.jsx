import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { BRAND_ASSETS } from '../lib/brandAssets';
import { URLS, PRODUCTS } from '../lib/constants';

export default function Home() {
  const featuredProducts = PRODUCTS.filter((p) => ['gentle-beginning', 'shadow-work-starter', 'deep-roots'].includes(p.id));

  return (
    <Layout
      title="Journals, membership, and publishing help"
      description="Midnight Magnolia is a Lowcountry studio for shadow-work journals, a $9 membership, and publishing and systems sessions. Buy a journal, join Magnolia Circle, or book help."
    >
      <div className="home">
        <section className="hero hero--day section--linen">
          <div className="container hero--day__grid">
            <div>
              <p className="hero__eyebrow">Midnight Magnolia · Lowcountry, SC</p>
              <h1 className="hero__title">Journals, a membership, and publishing help.</h1>
              <p className="hero__subtitle">
                Buy a shadow-work journal, join Magnolia Circle, or book a session
                to get a manuscript or a messy filing system into working order.
                Made for neurodivergent creators who keep a human pace.
              </p>
              <div className="hero__actions">
                <a href={URLS.gumroad} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                  Open the shop
                </a>
                <Link href="/services" className="btn btn--outline">
                  Book a session
                </Link>
              </div>
              <p className="muted" style={{ marginTop: 'var(--space-md)', fontSize: '0.9rem', maxWidth: '52ch' }}>
                Journals live in the shop. The $9 circle lives on{' '}
                <a href={URLS.bmac} target="_blank" rel="noopener noreferrer">Buy Me a Coffee</a>
                . Publishing and systems work is booked here.
              </p>
            </div>
            <figure className="hero--day__art">
              <Image
                src={BRAND_ASSETS.hero}
                alt="Magnolia priestess illustration from the Midnight Magnolia library"
                width={720}
                height={900}
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </figure>
          </div>
        </section>

        <section className="section section--linen" aria-labelledby="doors-heading">
          <div className="container">
            <h2 id="doors-heading">What you can do here.</h2>
            <div className="divider" />
            <p className="muted" style={{ maxWidth: '54ch' }}>
              Three doors. Pick the one that matches what you came for.
            </p>
            <div className="grid-3" style={{ marginTop: 'var(--space-lg)' }}>
              {[
                {
                  title: 'Buy a journal',
                  desc: 'Free starter prompts, a $9 thirty-day kit, and the Deep Roots system. Digital products, ready to download.',
                  href: URLS.gumroad,
                  cta: 'Open the shop',
                  external: true,
                },
                {
                  title: 'Join Magnolia Circle',
                  desc: '$9 a month: prompts, ritual practice, and the member edition of Dusk Letters.',
                  href: URLS.bmac,
                  cta: 'Join the circle',
                  external: true,
                },
                {
                  title: 'Book a session',
                  desc: 'Publishing help, manuscript development, and systems work. See the live bookings list and choose a time.',
                  href: '/services',
                  cta: 'See bookings',
                },
              ].map((door) => (
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

        <section className="section section--linen" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="flex-between" style={{ marginBottom: 'var(--space-lg)' }}>
              <div>
                <h2>A light place to start.</h2>
                <div className="divider" />
                <p className="muted" style={{ maxWidth: '46ch', marginTop: 'var(--space-sm)', fontSize: '0.9rem' }}>
                  You do not need the whole catalog. One PDF is enough for the first sitting.
                </p>
              </div>
              <Link href="/shop" className="btn btn--outline">Print and merch</Link>
            </div>
            <div className="grid-3">
              {featuredProducts.map((p) => (
                <div className="card" key={p.id}>
                  {p.tag ? <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>{p.tag}</span> : null}
                  <h3>{p.title}</h3>
                  <p className="muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{p.description}</p>
                  <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                    <span className="home__price">{p.price}</span>
                    <a href={p.url} className="btn btn--primary" style={{ padding: '0.5rem 1.2rem' }} target="_blank" rel="noopener">
                      View in shop
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="catalog" className="section section--linen" style={{ paddingTop: 0 }}>
          <div className="container">
            <h2>From the illustration library.</h2>
            <div className="divider" />
            <p className="muted" style={{ maxWidth: '52ch', marginTop: 'var(--space-md)' }}>
              Original pieces from the Magnolia Priestess and Riverwalk Lantern Path series. The gallery holds more.
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
              <Link href="/gallery">Open the gallery</Link>
              {' · '}
              <Link href="/about">Who makes this</Link>
            </p>
          </div>
        </section>

        <section className="section section--linen home-quote" aria-labelledby="philosophy-heading" style={{ paddingTop: 0 }}>
          <div className="container">
            <h2 id="philosophy-heading" className="home-quote__lead">
              The work is not to do more.
              {' '}
              It is to build something that holds.
            </h2>
            <p className="muted home-quote__support">
              You do not have to hustle your way here. Start with one journal, one session, or the story of the house.
            </p>
            <div style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/sanctuary" className="btn btn--outline">Read the story</Link>
              <a href={URLS.gumroad} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Open the shop</a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
