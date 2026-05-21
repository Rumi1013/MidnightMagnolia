import Layout from '../components/Layout';
import PageIllustration from '../components/PageIllustration';
import { PAGE_ILLUSTRATIONS } from '../lib/brandAssets';
import { AMAZON_PICKS, TOOLS, URLS } from '../lib/constants';

const AMAZON_PICK_BADGE = {
  recovery: 'Healing',
  genealogy: 'Lineage',
  pens: 'Studio',
  reading: 'Reading',
};

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
          <div className="grid-3">
            {TOOLS.map(tool => (
              <div className="card" key={tool.name} style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block', alignSelf: 'flex-start' }}>Tool</span>
                <h3 style={{ fontSize: '1.2rem' }}>{tool.name}</h3>
                <div className="divider" style={{ width: 32 }} />
                <p className="muted" style={{ fontSize: '0.875rem', flex: 1 }}>{tool.desc}</p>
                <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                  <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-eyebrow-on-dark)' }}>External</span>
                  <a href={tool.url} className="btn btn--primary" style={{ padding: '0.5rem 1.2rem' }} target="_blank" rel="noopener noreferrer">Open</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section amazon-picks" aria-labelledby="amazon-picks-heading">
          <p className="page-hero__eyebrow" id="amazon-picks-heading">Amazon · curated</p>
          <h2>Healing, lineage & studio picks.</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '52ch', marginBottom: 'var(--space-xl)' }}>
            Every link below is from your Associates shortlist—recovery journals, genealogy standards, archival pens, and
            one Kindle title in the family line. For the full rotating storefront, use the button after this list. The
            public Wix sanctuary lives at{' '}
            <a href={URLS.wixHome} target="_blank" rel="noopener noreferrer">{URLS.wixHome}</a>.
          </p>
          {AMAZON_PICKS.map((cat) => (
            <div className="amazon-picks__block" key={cat.id}>
              <h3 className="amazon-picks__title">{cat.title}</h3>
              <p className="muted amazon-picks__intro">{cat.intro}</p>
              <div className="grid-3">
                {cat.items.map((item) => (
                  <div className="card" key={`${cat.id}-${item.url}`} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block', alignSelf: 'flex-start' }}>
                      {AMAZON_PICK_BADGE[cat.id] || 'Amazon'}
                    </span>
                    <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 1.35 }}>{item.name}</h4>
                    <p className="muted" style={{ fontSize: '0.875rem', flex: 1, marginTop: 'var(--space-sm)' }}>{item.desc}</p>
                    <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-amber)' }}>Amazon</span>
                      <a
                        href={item.url}
                        className="btn btn--primary"
                        style={{ padding: '0.5rem 1.2rem' }}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                      >
                        View pick
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
          <h2>Amazon Storefront</h2>
          <div className="divider" />
          <p className="muted" style={{ marginBottom: 'var(--space-lg)' }}>
            Books I actually read. Tools I actually use. Journals, tech, and workspace essentials.
          </p>
          <a href={URLS.amazon} className="btn btn--primary" target="_blank" rel="noopener noreferrer sponsored">Browse the Storefront</a>
        </section>

        <p className="muted" style={{ fontSize: '0.8rem', paddingBottom: 'var(--space-2xl)' }}>
          Some links on this page are affiliate links. I may earn a small commission at no extra cost to you.
          I only recommend tools I use myself.
        </p>
      </div>
    </Layout>
  );
}