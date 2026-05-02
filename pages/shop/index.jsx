import Layout from '../../components/Layout';
import PageIllustration from '../../components/PageIllustration';
import { PAGE_ILLUSTRATIONS } from '../../lib/brandAssets';
import { PRODUCTS, URLS } from '../../lib/constants';

export default function Shop() {
  const active  = PRODUCTS.filter(p => p.tag !== 'Coming Soon');
  const coming  = PRODUCTS.find(p => p.tag === 'Coming Soon');

  return (
    <Layout title="The Shop" description="Digital products for quiet builders — journals, planners, career tools, and the Soft Business Guide. From $9.">
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">The Shop</p>
          <h1>Tools for quiet builders.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Digital products to help you move with intention — from career documents to shadow work journals.
            No subscriptions required. Instant download.
          </p>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.shop} />

        <section className="section">
          <div className="grid-3">
            {active.map(p => (
              <div className="card" key={p.id} style={{ display: 'flex', flexDirection: 'column' }}>
                {p.tag && <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>{p.tag}</span>}
                <h3 style={{ fontSize: '1.2rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-amber)', margin: '0.25rem 0 0.75rem', letterSpacing: '0.05em' }}>{p.subtitle}</p>
                <p className="muted" style={{ fontSize: '0.875rem', flex: 1 }}>{p.description}</p>
                <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--color-amber)' }}>{p.price}</span>
                  <a href={p.url} className="btn btn--primary" style={{ padding: '0.5rem 1.2rem' }} target="_blank" rel="noopener">Get It Now</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {coming && (
          <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
            <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>Coming Soon</span>
            <h2>{coming.title}</h2>
            <p className="muted" style={{ margin: 'var(--space-md) auto var(--space-lg)', maxWidth: '48ch' }}>{coming.description}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-amber)', marginBottom: 'var(--space-lg)' }}>{coming.price}</p>
            <a href={URLS.email} className="btn btn--outline">Notify Me at Launch</a>
          </section>
        )}

        <div className="section" style={{ paddingTop: 0, paddingBottom: 'var(--space-2xl)', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
          All sales are final. Digital products are delivered instantly via email. Questions? <a href={URLS.email}>bgconscious@gmail.com</a>
        </div>
      </div>
    </Layout>
  );
}