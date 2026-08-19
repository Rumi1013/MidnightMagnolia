import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getProductHero } from '../../lib/brandAssets';
import { PRODUCTS } from '../../lib/constants';
import {
  getProductById,
  getProductCheckoutLabel,
  getProductCheckoutNote,
  getProductCheckoutUrl,
  getProductPath,
  getRelatedProducts,
} from '../../lib/products';

export async function getStaticPaths() {
  return {
    paths: PRODUCTS.map((p) => ({ params: { id: p.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = getProductById(params.id);
  if (!product) {
    return { notFound: true };
  }
  return {
    props: { product },
    revalidate: 300,
  };
}

export default function ProductPage({ product }) {
  const hero = getProductHero(product.artKey);
  const checkoutUrl = getProductCheckoutUrl(product);
  const checkoutLabel = getProductCheckoutLabel(product);
  const checkoutNote = getProductCheckoutNote(product);
  const related = getRelatedProducts(product, 3);
  const isExternal = /^https?:\/\//i.test(checkoutUrl);

  return (
    <Layout
      title={product.title}
      description={product.description}
    >
      <div className="container">
        <p className="page-hero__eyebrow" style={{ marginTop: 'var(--space-xl)' }}>
          <Link href="/shop">The Shop</Link>
        </p>

        <section className="product-page">
          {hero ? (
            <div className="product-page__media">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: hero.objectPosition || 'center' }}
                priority
              />
            </div>
          ) : null}

          <div className="product-page__copy">
            {product.tag ? <span className="tag">{product.tag}</span> : null}
            <h1 style={{ marginTop: product.tag ? 'var(--space-md)' : 0 }}>{product.title}</h1>
            <div className="divider" />
            {product.subtitle ? (
              <p className="muted" style={{ fontSize: '1rem', marginBottom: 'var(--space-md)' }}>
                {product.subtitle}
              </p>
            ) : null}
            <p className="hero__subtitle" style={{ marginBottom: 'var(--space-lg)' }}>
              {product.description}
            </p>
            <p className="product-page__price">{product.price}</p>
            <a
              href={checkoutUrl}
              className="btn btn--primary"
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {checkoutLabel}
            </a>
            <p className="muted" style={{ marginTop: 'var(--space-md)', fontSize: '0.85rem', maxWidth: '46ch' }}>
              {checkoutNote}
            </p>
          </div>
        </section>

        {product.includes?.length ? (
          <section className="section">
            <h2>What is inside.</h2>
            <div className="divider" />
            <ul className="product-page__includes">
              {product.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {product.format ? (
              <p className="muted" style={{ marginTop: 'var(--space-lg)', maxWidth: '52ch' }}>
                {product.format}
              </p>
            ) : null}
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="section" style={{ paddingBottom: 'var(--space-2xl)' }}>
            <h2>Also in the shop.</h2>
            <div className="divider" />
            <div className="grid-3" style={{ marginTop: 'var(--space-lg)' }}>
              {related.map((p) => {
                const relatedHero = getProductHero(p.artKey);
                return (
                  <article className="card" key={p.id}>
                    {relatedHero ? (
                      <div className="card__media">
                        <Image
                          src={relatedHero.src}
                          alt={relatedHero.alt}
                          width={640}
                          height={420}
                          sizes="(max-width: 700px) 100vw, 33vw"
                          style={{ objectFit: 'cover', objectPosition: relatedHero.objectPosition || 'center' }}
                        />
                      </div>
                    ) : null}
                    <h3 style={{ fontSize: '1.15rem' }}>{p.title}</h3>
                    <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>{p.price}</p>
                    <Link href={getProductPath(p)} className="btn btn--ghost" style={{ marginTop: 'var(--space-md)', display: 'inline-block' }}>
                      View
                    </Link>
                  </article>
                );
              })}
            </div>
            <p style={{ marginTop: 'var(--space-xl)' }}>
              <Link href="/shop" className="btn btn--outline">Back to the shop</Link>
            </p>
          </section>
        ) : null}
      </div>
    </Layout>
  );
}
