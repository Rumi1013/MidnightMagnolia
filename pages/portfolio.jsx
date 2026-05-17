import Layout from '../components/Layout';
import PageIllustration from '../components/PageIllustration';
import { PAGE_ILLUSTRATIONS } from '../lib/brandAssets';
import { URLS, CASE_STUDIES, SKILLS, FEATURED_PORTFOLIO_CARDS } from '../lib/constants';

const RESUME_TRACK_META = [
  {
    id: 'A',
    title: 'Track A — Archival Systems & Preservation',
    desc: 'Optimized for Digital Archivist, Metadata Specialist, Repository Coordinator, and MLIS-track roles.',
  },
  {
    id: 'B',
    title: 'Track B — Program Management & Operations',
    desc: 'Optimized for Management Analyst, Program Coordinator, and operations-focused roles.',
  },
];

const RESUME_REQUEST_LINKS = {
  A: 'mailto:bgconscious@gmail.com?subject=Resume Request — Archival Track',
  B: 'mailto:bgconscious@gmail.com?subject=Resume Request — PM Track',
};

export default function Portfolio({ links }) {
  const featured = FEATURED_PORTFOLIO_CARDS.map((card) => {
    const href = links[card.linkKey] || '';
    return { ...card, href };
  });

  return (
    <Layout
      title="Portfolio"
      description="Latisha Vincent-Waters · Archival Systems & Knowledge Management · 15+ years, $1.5M+ secured, 610+ served. Soros Justice Fellow. Open to archival, library, and documentation roles."
    >
      <div className="container">

        <div className="page-hero">
          <p className="page-hero__eyebrow">Portfolio</p>
          <h1>The work speaks.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            15+ years building programs, securing funding, and managing knowledge systems in nonprofit and technology environments. Archival systems, digital preservation, and documentation — rooted in community, justice, and ancestral memory. Soros Justice Fellow. Open to archival, library, metadata, and documentation roles. Available to relocate.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginTop: 'var(--space-lg)' }}>
            <a href={URLS.linkedin} className="btn btn--primary" target="_blank" rel="noopener">LinkedIn Profile</a>
            <a href={URLS.github} className="btn btn--outline" target="_blank" rel="noopener">GitHub · rumi1013</a>
            <a href={URLS.email} className="btn btn--ghost">Email Latisha</a>
          </div>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.portfolio} />

        <section className="section">
          <h2>Featured work.</h2>
          <div className="divider" />
          <p className="muted" style={{ marginBottom: 'var(--space-lg)', maxWidth: '62ch' }}>
            Same four blocks as LinkedIn Featured: proof of lineage archive, statewide documentation IA, COVID-era
            digitization and taxonomy, and Midnight Magnolia as a live knowledge system.
          </p>
          <div className="grid-2" style={{ gap: 'var(--space-lg)' }}>
            {featured.map((card) => (
              <div className="card" key={card.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-md)', lineHeight: 1.35 }}>{card.title}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-md)', flex: 1 }}>{card.summary}</p>
                <p className="muted" style={{ fontSize: '0.78rem', marginBottom: 'var(--space-md)', lineHeight: 1.5 }}>
                  {card.skills}
                </p>
                {card.href ? (
                  <a href={card.href} className="btn btn--outline" style={{ alignSelf: 'flex-start' }} target="_blank" rel="noopener noreferrer">
                    {card.cta}
                  </a>
                ) : (
                  <p className="muted" style={{ fontSize: '0.8rem', margin: 0 }}>
                    {card.linkKey === 'statewide' && (
                      <>Set <code style={{ fontSize: '0.75rem' }}>NEXT_PUBLIC_PORTFOLIO_FEATURED_STATEWIDE_URL</code> in <code style={{ fontSize: '0.75rem' }}>.env.local</code> when the hosted case study is ready.</>
                    )}
                    {card.linkKey === 'digitization' && (
                      <>Set <code style={{ fontSize: '0.75rem' }}>NEXT_PUBLIC_PORTFOLIO_FEATURED_DIGITIZATION_URL</code> in <code style={{ fontSize: '0.75rem' }}>.env.local</code> when the hosted case study is ready.</>
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Impact at a glance.</h2>
          <div className="divider" />
          <div className="stat-grid">
            {CASE_STUDIES.map(c => (
              <div className="stat-block" key={c.id}>
                <span className="stat-number">{c.metric}</span>
                <span className="stat-label">{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>Resume tracks.</h2>
          <div className="divider" />
          <p className="muted" style={{ marginBottom: 'var(--space-lg)', maxWidth: '58ch' }}>
            Two resume tracks, both current as of 2026. Contact for additional versions.
          </p>
          <div className="grid-2">
            {RESUME_TRACK_META.map((track) => {
              const url = RESUME_REQUEST_LINKS[track.id];
              return (
                <div className="card" key={track.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>Track {track.id}</span>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>{track.title}</h3>
                    <p className="muted" style={{ fontSize: '0.875rem' }}>{track.desc}</p>
                  </div>
                  <a
                    href={url}
                    className="btn btn--outline"
                    style={{ marginTop: 'var(--space-lg)', alignSelf: 'flex-start' }}
                  >
                    Request Resume
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section">
          <h2>Selected work.</h2>
          <div className="divider" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', marginTop: 'var(--space-lg)' }}>
            {CASE_STUDIES.map(study => (
              <div className="card" key={study.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--space-xl)', alignItems: 'start' }}>
                <div style={{ textAlign: 'center', minWidth: '100px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-amber)', display: 'block', lineHeight: 1 }}>{study.metric}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)', letterSpacing: '0.05em' }}>{study.label}</span>
                </div>
                <div>
                  <p style={{ marginBottom: 'var(--space-md)' }}>{study.description}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {study.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section section--dusk" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>Skills + tools.</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            {Object.entries(SKILLS).map(([category, items]) => (
              <div className="card" key={category} style={{ background: 'rgba(26,28,46,0.5)' }}>
                <h4 style={{ color: 'var(--color-burnt-rose)', marginBottom: 'var(--space-md)' }}>{category}</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {items.map(item => (
                    <li key={item} style={{ fontSize: '0.875rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--color-eyebrow-on-dark)', fontSize: '0.6rem' }} aria-hidden>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Education + credentials.</h2>
          <div className="divider" />
          <div className="grid-2">
            {[
              {
                institution: 'Claflin University',
                credential:  'B.A. Mass Communications',
                note:        'Orangeburg, SC',
              },
              {
                institution: 'Trident Technical College',
                credential:  'A.A.S. Information Technology (in progress, exp. 2026)',
                note:        'Concurrent: Database Administrator Certification · GPA 3.58',
              },
              {
                institution: 'Open Society Foundations',
                credential:  'Soros Justice Fellow, 2022',
                note:        'Community justice and digital equity focus',
              },
              {
                institution: 'Google / Coursera',
                credential:  'Data Analytics Certificate, 2025',
                note:        'Workforce Development Scholarship Recipient',
              },
            ].map(cred => (
              <div key={cred.institution} style={{ borderLeft: '2px solid var(--color-amber)', paddingLeft: 'var(--space-lg)', paddingTop: 'var(--space-sm)', paddingBottom: 'var(--space-sm)' }}>
                <h4 style={{ color: 'var(--color-magnolia)', marginBottom: '0.25rem', fontSize: '1rem', letterSpacing: 0 }}>{cred.credential}</h4>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{cred.institution}</p>
                <p className="muted" style={{ fontSize: '0.8rem' }}>{cred.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
          <h2>Interested in working together?</h2>
          <p className="muted" style={{ margin: 'var(--space-md) auto var(--space-lg)', maxWidth: '50ch' }}>
            Available for remote roles that honor preservation practice, clear documentation, and humane pacing. Consulting
            for workflow, archives-adjacent systems, and AI literacy stays open through Midnight Magnolia.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={URLS.booking} className="btn btn--primary" target="_blank" rel="noopener">Book a Strategy Session</a>
            <a href={URLS.email} className="btn btn--outline">Send an Email</a>
          </div>
        </section>

      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.midnight-magnolia.com').replace(/\/$/, '');
  const genealogy = process.env.NEXT_PUBLIC_PORTFOLIO_FEATURED_GENEALOGY_URL?.trim() || site;
  const statewide = process.env.NEXT_PUBLIC_PORTFOLIO_FEATURED_STATEWIDE_URL?.trim() || '';
  const digitization = process.env.NEXT_PUBLIC_PORTFOLIO_FEATURED_DIGITIZATION_URL?.trim() || '';

  return {
    props: {
      links: {
        genealogy,
        statewide,
        digitization,
        mm: site,
      },
    },
    revalidate: 300,
  };
}
