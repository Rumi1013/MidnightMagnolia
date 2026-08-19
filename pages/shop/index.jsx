import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import PageIllustration from '../../components/PageIllustration';
import { PAGE_ILLUSTRATIONS, getProductHero } from '../../lib/brandAssets';
import { PRODUCTS, URLS } from '../../lib/constants';
import { getProductPath } from '../../lib/products';
import {
  getShopProducts,
  formatProductPrice,
  getProductImageUrl,
  getProductPageUrl,
  stripHtml,
} from '../../lib/wix';

export async function getStaticProps() {
  const raw = await getShopProducts();
  const merch = (raw || [])
    .filter((p) => p?.visible !== false)
    .map((p) => {
      const name = p.name || 'Untitled';
      const wixImg = getProductImageUrl(p);
      const hero = getProductHero(name);
      const image = wixImg || hero?.src || null;
      return {
        id: p._id,
        name,
        description: stripHtml(p.description, 240),
        price: formatProductPrice(p),
        image,
        imageAlt: hero?.alt || name,
        imagePosition: hero?.objectPosition || 'center',
        url: getProductPageUrl(p) || URLS.gumroad,
        external: true,
      };
    });

  const products = PRODUCTS.map((p) => {
    const hero = getProductHero(p.artKey);
    return {
      id: p.id,
      name: p.title,
      description: p.description,
      price: p.price,
      tag: p.tag || null,
      image: hero?.src || null,
      imageAlt: hero?.alt || p.title,
      imagePosition: hero?.objectPosition || 'center',
      href: getProductPath(p),
      cta: 'View',
    };
  });

  return {
    props: { products, merch },
    revalidate: 300,
  };
}

function ProductCard({ p }) {
  return (
    <article className="card" id={p.id} style={{ display: 'flex', flexDirection: 'column' }}>
      {p.image ? (
        <div className="card__media">
          <Image
            src={p.image}
            alt={p.imageAlt || p.name}
            width={640}
            height={420}
            sizes="(max-width: 700px) 100vw, 33vw"
            style={{ objectFit: 'cover', objectPosition: p.imagePosition || 'center' }}
          />
        </div>
      ) : null}

      {p.tag ? (
        <span className="tag" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block', alignSelf: 'flex-start' }}>
          {p.tag}
        </span>
      ) : null}

      <h3 style={{ fontSize: '1.2rem' }}>{p.name}</h3>

      {p.description ? (
        <p className="muted" style={{ fontSize: '0.875rem', flex: 1, whiteSpace: 'pre-line' }}>
          {p.description}
        </p>
      ) : null}

      <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
        {p.price ? (
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: 'var(--color-deep-honey)',
            }}
          >
            {p.price}
          </span>
        ) : null}
        {p.external ? (
          <a
            href={p.url}
            className="btn btn--primary"
            style={{ padding: '0.5rem 1.2rem' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {p.cta || 'View listing'}
          </a>
        ) : (
          <Link href={p.href || `/shop/${p.id}`} className="btn btn--primary" style={{ padding: '0.5rem 1.2rem' }}>
            {p.cta || 'View'}
          </Link>
        )}
      </div>
    </article>
  );
}

export default function Shop({ products, merch }) {
  return (
    <Layout
      title="The Shop"
      description="Journals, kits, and membership from Midnight Magnolia. Digital listings on Gumroad. Magnolia Circle on Buy Me a Coffee."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">The Shop</p>
          <h1>Tools you can hold.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Journals, kits, and a monthly circle. Digital listings live on Gumroad.
            Magnolia Circle lives on Buy Me a Coffee.
          </p>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.shop} />

        <section className="section">
          <div className="grid-3">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>

        {merch.length > 0 ? (
          <section className="section">
            <h2>Merch when it is stocked.</h2>
            <div className="divider" />
            <p className="muted" style={{ maxWidth: '52ch', marginBottom: 'var(--space-lg)' }}>
              Physical pieces from the store catalog. Digital still leads.
            </p>
            <div className="grid-3">
              {merch.map((p) => (
                <ProductCard key={p.id} p={{ ...p, cta: 'View listing' }} />
              ))}
            </div>
          </section>
        ) : null}

        <div
          className="section"
          style={{
            paddingTop: 0,
            paddingBottom: 'var(--space-2xl)',
            fontSize: '0.8rem',
            color: 'var(--color-muted)',
          }}
        >
          Questions? <a href={URLS.email}>bgconscious@gmail.com</a>
        </div>
      </div>
    </Layout>
  );
}
