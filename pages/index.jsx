import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { BRAND_ASSETS, HOME_DOOR_ART, getProductHero } from '../lib/brandAssets';
import { URLS, PRODUCTS } from '../lib/constants';

const HOME_DOORS = [
  {
    title: 'Buy',
    desc: 'Journals, kits, and digital tools. Start small. Take what you need.',
    href: '/shop',
    cta: 'Open the shop',
  },
  {
    title: 'Book',
    desc: 'A session for the messy middle: publishing, systems, or a short honest consult.',
    href: '/services',
    cta: 'See sessions',
  },
  {
    title: 'Look',
    desc: 'Original artwork and print samples. Atmosphere first. No checkout required.',
    href: '/gallery',
    cta: 'Open the gallery',
  },
];

export default function Home() {
  const featuredProducts = PRODUCTS.filter((p) =>
    ['gentle-beginning', 'shadow-work-starter', 'deep-roots'].includes(p.id)
  );

  return (
    <Layout>
      <section className="hero">
        <div className="container">
          <p className="hero__eyebrow">Midnight Magnolia · Lowcountry, SC</p>
          <h1 className="hero__title">
            A sanctuary for <em style={{ color: 'var(--color-amber)', fontStyle: 'italic' }}>quiet builders.</em>
          </h1>
          <p className="hero__subtitle">
            Three doors. Buy a tool. Book a session. Or look at the work.
          </p>
          <div className="hero__actions">
            <Link href="/shop" className="btn btn--primary">
              Shop
            </Link>
            <Link href="/services" className="btn btn--outline">
              Book
            </Link>
            <Link href="/gallery" className="btn btn--ghost">
              Look
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="doors-heading">
        <div className="container">
          <h2 id="doors-heading">Buy. Book. Look.</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '52ch', marginBottom: 'var(--space-lg)' }}>
            You do not have to do all three. Pick the door that matches the energy you have today.
          </p>
          <div className="grid-3" style={{ marginTop: 'var(--space-lg)' }}>
            {HOME_DOORS.map((door, i) => {
              const art = HOME_DOOR_ART[i];
              return (
                <article className="card" key={door.title}>
                  {art ? (
                    <div className="card__media">
                      <Image
                        src={art.src}
                        alt={art.alt}
                        width={640}
                        height={420}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={art.objectPosition ? { objectPosition: art.objectPosition, objectFit: 'cover' } : { objectFit: 'cover' }}
                      />
                    </div>
                  ) : null}
                  <h3>{door.title}</h3>
                  <div className="divider" style={{ width: 32 }} />
                  <p className="muted">{door.desc}</p>
                  <Link href={door.href} className="btn btn--ghost" style={{ marginTop: 'var(--space-lg)', display: 'inline-block' }}>
                    {door.cta}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="catalog" className="section section--linen">
        <div className="container">
          <h2>From the illustration library.</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '52ch', marginTop: 'var(--space-md)' }}>
            Original pieces from the <strong>Magnolia Priestess</strong> and{' '}
            <strong>Riverwalk Lantern Path</strong> series.
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
            <Link href="/gallery">Look</Link>
            {' · '}
            <Link href="/publication-design">Print samples</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex-between" style={{ marginBottom: 'var(--space-lg)' }}>
            <div>
              <h2>Start where it feels light.</h2>
              <div className="divider" />
              <p className="muted" style={{ maxWidth: '46ch', marginTop: 'var(--space-sm)', fontSize: '0.9rem' }}>
                You don&apos;t need everything. One tool that meets you where you are.
              </p>
            </div>
            <Link href="/shop" className="btn btn--outline">Open the shop</Link>
          </div>
          <div className="grid-3">
            {featuredProducts.map((p) => {
              const hero = getProductHero(p.artKey);
              return (
                <article className="card" key={p.id} id={p.id}>
                  {hero ? (
                    <div className="card__media">
                      <Image
                        src={hero.src}
                        alt={hero.alt}
                        width={640}
                        height={420}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover', objectPosition: hero.objectPosition || 'center' }}
                      />
                    </div>
                  ) : null}
                  {p.tag ? <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>{p.tag}</span> : null}
                  <h3>{p.title}</h3>
                  <p className="muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{p.description}</p>
                  <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-deep-honey)' }}>{p.price}</span>
                    <Link href={`/shop#${p.id}`} className="btn btn--primary" style={{ padding: '0.5rem 1.2rem' }}>
                      View
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--dusk home-quote" aria-labelledby="philosophy-heading">
        <div className="container">
          <h2 id="philosophy-heading" style={{ maxWidth: '20ch', margin: '0 auto' }}>
            The work is not to do more.
            <br />
            <em style={{ color: 'var(--color-amber)' }}>It is to build something that holds.</em>
          </h2>
          <p className="muted" style={{ maxWidth: '44ch', margin: 'var(--space-md) auto 0' }}>
            You don&apos;t have to hustle your way here. Start where you are.
          </p>
          <div style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shop" className="btn btn--primary">Shop</Link>
            <Link href="/services" className="btn btn--outline">Book</Link>
            <Link href="/gallery" className="btn btn--ghost">Look</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
