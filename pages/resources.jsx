import Layout from '../components/Layout';
import PageIllustration from '../components/PageIllustration';
import { PAGE_ILLUSTRATIONS } from '../lib/brandAssets';
import { TOOLS, URLS } from '../lib/constants';

export default function Resources() {
  return (
    <Layout title="Resources" description="Tools Latisha Vincent-Waters actually uses. No fluff, no paid recommendations without disclosure.">
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Resources</p>
          <h1>Tools I actually use.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            No fluff. No paid recommendations without disclosure.
            These are the tools that keep Midnight Magnolia running on 10 hours a week.
          </p>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.resources} />

        <section className="section">
          <div className="grid-2">
            {TOOLS.map(tool => (
              <a href={tool.url} className="card" key={tool.name} target="_blank" rel="noopener" style={{ display: 'block', textDecoration: 'none' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-magnolia)' }}>{tool.name}</h3>
                <div className="divider" style={{ width: 24 }} />
                <p className="muted" style={{ fontSize: '0.875rem' }}>{tool.desc}</p>
                <span style={{ display: 'inline-block', marginTop: 'var(--space-md)', fontSize: '0.75rem', color: 'var(--color-amber)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Visit →
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
          <h2>Amazon Storefront</h2>
          <div className="divider" />
          <p className="muted" style={{ marginBottom: 'var(--space-lg)' }}>
            Books I actually read. Tools I actually use. Journals, tech, and workspace essentials.
          </p>
          <a href={URLS.amazon} className="btn btn--primary" target="_blank" rel="noopener">Browse the Storefront</a>
        </section>

        <p className="muted" style={{ fontSize: '0.8rem', paddingBottom: 'var(--space-2xl)' }}>
          Some links on this page are affiliate links. I may earn a small commission at no extra cost to you.
          I only recommend tools I use myself.
        </p>
      </div>
    </Layout>
  );
}