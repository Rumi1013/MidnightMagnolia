import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { BRAND_ASSETS, getProductHero } from '../lib/brandAssets';
import { PRODUCTS } from '../lib/constants';

export default function Home() {
  const featuredProducts = PRODUCTS.filter((p) =>
    ['gentle-beginning', 'shadow-work-starter', 'deep-roots'].includes(p.id)
  );

  return (
    <Layout>
      <section className="hero">
        <div className="container">
          <p className="hero__eyebrow">Lowcountry, SC</p>
          <h1 className="hero__title">
            A sanctuary for <em style={{ fontStyle: 'italic' }}>quiet builders.</em>
          </h1>
          <p className="hero__subtitle">
            Journals and kits in the shop. Sessions on the calendar.
          </p>
          <div className="hero__actions">
            <Link href="/shop" className="btn btn--primary">
              Open the shop
            </Link>
            <Link href="/services" className="btn btn--outline">
              Book a session
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="shop-heading">
        <div className="container">
          <div className="flex-between" style={{ marginBottom: 'var(--space-lg)' }}>
            <div>
              <h2 id="shop-heading">Start where it feels light.</h2>
              <div className="divider" />
              <p className="muted" style={{ maxWidth: '46ch', marginTop: 'var(--space-sm)', fontSize: '0.9rem' }}>
                One tool. You do not need the whole shelf.
              </p>
            </div>
            <Link href="/shop" className="btn btn--outline">All listings</Link>
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
                    <Link href={`/shop/${p.id}`} className="btn btn--primary" style={{ padding: '0.5rem 1.2rem' }}>
                      View
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--linen" aria-labelledby="look-heading">
        <div className="container">
          <h2 id="look-heading">Look.</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '52ch', marginTop: 'var(--space-md)' }}>
            Original pieces from Magnolia Priestess and Riverwalk Lantern Path.
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
          <p style={{ marginTop: 'var(--space-lg)' }}>
            <Link href="/gallery" className="btn btn--outline">Open the gallery</Link>
          </p>
        </div>
      </section>

      <section className="section section--dusk home-quote" aria-labelledby="book-heading">
        <div className="container">
          <h2 id="book-heading" style={{ maxWidth: '22ch', margin: '0 auto' }}>
            If a listing is not enough, sit down for an hour.
          </h2>
          <p className="muted" style={{ maxWidth: '44ch', margin: 'var(--space-md) auto 0' }}>
            Publishing, systems, or a short honest consult.
          </p>
          <div style={{ marginTop: 'var(--space-lg)', display: 'flex', justifyContent: 'center' }}>
            <Link href="/services" className="btn btn--primary">Book a session</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
