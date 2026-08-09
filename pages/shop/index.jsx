import Image from 'next/image';
import Layout from '../../components/Layout';
import PageIllustration from '../../components/PageIllustration';
import { PAGE_ILLUSTRATIONS, PRODUCT_HERO_ART } from '../../lib/brandAssets';
import { URLS } from '../../lib/constants';
import {
  getShopProducts,
  formatProductPrice,
  getProductImageUrl,
  getProductPageUrl,
  stripHtml,
} from '../../lib/wix';

export async function getStaticProps() {
  const raw = await getShopProducts();
  const products = (raw || [])
    .filter((p) => p?.visible !== false)
    .map((p) => {
      const name = p.name || 'Untitled';
      const wixImg = getProductImageUrl(p);
      const hero = PRODUCT_HERO_ART[name];
      const image = wixImg || hero?.src || null;
      return {
        id: p._id,
        name,
        slug: p.slug || '',
        description: stripHtml(p.description, 240),
        price: formatProductPrice(p),
        image,
        imageAlt: hero?.alt || name,
        imagePosition: hero?.objectPosition || 'center',
        url: getProductPageUrl(p) || URLS.gumroad,
        ribbon: p.ribbon || null,
        inStock: p.stock?.inStock !== false,
      };
    });
  return {
    props: { products },
    revalidate: 300,
  };
}

export default function Shop({ products }) {
  return (
    <Layout
      title="The Shop"
      description="Digital and physical products from Midnight Magnolia — journals, planners, shadow work tools, and apparel for quiet builders."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">The Shop</p>
          <h1>Tools for quiet builders.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Healing-centered journals, shadow work tools, and apparel rooted in Lowcountry care.
            Checkout happens on the Wix storefront — secure and instant.
          </p>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.shop} />

        <section className="section">
          {products.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
              <h3>The shop is being restocked.</h3>
              <p className="muted" style={{ marginTop: 'var(--space-md)' }}>
                Check back soon — products are syncing from the Wix store.
              </p>
              <a
                href={URLS.gumroad}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
                style={{ marginTop: 'var(--space-md)' }}
              >
                Visit Gumroad
              </a>
            </div>
          ) : (
            <div className="grid-3">
              {products.map((p) => (
                <article
                  className="card"
                  key={p.id}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {p.image && (
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        background: 'var(--color-ink)',
                        borderRadius: 'var(--radius)',
                        marginBottom: 'var(--space-md)',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={p.image}
                        alt={p.imageAlt || p.name}
                        fill
                        sizes="(max-width: 700px) 100vw, 33vw"
                        style={{ objectFit: 'cover', objectPosition: p.imagePosition || 'center' }}
                      />
                    </div>
                  )}

                  {p.ribbon && (
                    <span
                      className="tag"
                      style={{ marginBottom: 'var(--space-sm)', display: 'inline-block', alignSelf: 'flex-start' }}
                    >
                      {p.ribbon}
                    </span>
                  )}

                  <h3 style={{ fontSize: '1.2rem' }}>{p.name}</h3>

                  {p.description && (
                    <p
                      className="muted"
                      style={{ fontSize: '0.875rem', flex: 1, whiteSpace: 'pre-line' }}
                    >
                      {p.description}
                    </p>
                  )}

                  <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                    {p.price && (
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.5rem',
                          color: 'var(--color-amber)',
                        }}
                      >
                        {p.price}
                      </span>
                    )}
                    <a
                      href={p.url}
                      className="btn btn--primary"
                      style={{ padding: '0.5rem 1.2rem' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.inStock ? 'Get It Now' : 'View'}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div
          className="section"
          style={{
            paddingTop: 0,
            paddingBottom: 'var(--space-2xl)',
            fontSize: '0.8rem',
            color: 'var(--color-muted)',
          }}
        >
          Checkout is hosted on the Wix storefront. Digital products deliver instantly via email.
          Questions? <a href={URLS.email}>bgconscious@gmail.com</a>
        </div>
      </div>
    </Layout>
  );
}
