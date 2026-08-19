import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { BRAND_ASSETS, ILLUSTRATION_POOL } from '../lib/brandAssets';

const FEATURED = BRAND_ASSETS.gallery;

/** Extra catalog pieces beyond the home strip — still from the local illustration library. */
const CATALOG = ILLUSTRATION_POOL.slice(0, 12).map((src, i) => ({
  src,
  alt: `Magnolia bloom illustration ${i + 1} from the Midnight Magnolia library`,
  series: 'Magnolia priestess',
  medium: 'Digital illustration',
}));

export default function GalleryPage() {
  return (
    <Layout
      title="Art Gallery"
      description="Southern Gothic sacred artwork from the Magnolia Priestess and Riverwalk Lantern Path series — the Midnight Magnolia illustration library."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Art Gallery</p>
          <h1>From the illustration library.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Original pieces from the <strong>Magnolia Priestess</strong> and{' '}
            <strong>Riverwalk Lantern Path</strong> series — atmosphere for the sanctuary, not stock decoration.
          </p>
        </div>

        <section className="section">
          <h2>Featured series.</h2>
          <div className="divider" />
          <div className="art-strip" style={{ marginTop: 'var(--space-lg)' }}>
            {FEATURED.map((img) => (
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
        </section>

        <section className="section" style={{ paddingBottom: 'var(--space-2xl)' }}>
          <h2>More from the library.</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '56ch', marginBottom: 'var(--space-lg)' }}>
            More Magnolia Priestess pieces. Same hand. Sit with them as long as you want.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 'var(--space-md)',
            }}
          >
            {CATALOG.map((img) => (
              <figure
                key={img.src}
                style={{
                  margin: 0,
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  background: 'var(--color-ink)',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={640}
                  height={480}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
                <figcaption
                  className="muted"
                  style={{ padding: '0.65rem 0.75rem', fontSize: '0.75rem' }}
                >
                  {img.series} · {img.medium}
                </figcaption>
              </figure>
            ))}
          </div>
          <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <Link href="/publication-design" className="btn btn--outline">
              Publication design samples
            </Link>
            <Link href="/portfolio" className="btn btn--ghost">
              View portfolio
            </Link>
            <Link href="/services" className="btn btn--ghost">
              Book a session
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
