import Link from 'next/link';
import Layout from '../components/Layout';
import PageIllustration from '../components/PageIllustration';
import { PAGE_ILLUSTRATIONS } from '../lib/brandAssets';
import { URLS, CASE_STUDIES, SKILLS } from '../lib/constants';

// ── Resume track config ───────────────────────────────────────
const RESUME_TRACKS = [
  {
    id: 'A',
    title: 'Track A — AI Enablement / Senior PM',
    desc:  'Optimized for AI literacy, digital transformation, and technology program management roles.',
    url:   process.env.RESUME_TRACK_A_URL || '#',
  },
  {
    id: 'B',
    title: 'Track B — Implementation PM',
    desc:  'Optimized for implementation, operations, and cross-functional program management roles.',
    url:   process.env.RESUME_TRACK_B_URL || '#',
  },
];

export default function Portfolio() {
  return (
    <Layout
      title="Portfolio"
      description="Latisha Vincent-Waters · Senior Program Manager, Digital Entrepreneur · 15+ years, $1.5M+ secured, 610+ served. Available for remote $100K+ roles."
    >
      <div className="container">

        {/* ── Page Hero ──────────────────────────────────────── */}
        <div className="page-hero">
          <p className="page-hero__eyebrow">Portfolio</p>
          <h1>The work speaks.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            15+ years building programs, securing funding, and leading digital operations
            in nonprofit and technology environments. Available for remote roles targeting $100K+
            in AI enablement, digital transformation, and archival/cultural heritage work.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginTop: 'var(--space-lg)' }}>
            <a href={URLS.linkedin} className="btn btn--primary" target="_blank" rel="noopener">LinkedIn Profile</a>
            <a href={URLS.github} className="btn btn--outline" target="_blank" rel="noopener">GitHub · Rumi1013</a>
            <a href={URLS.email} className="btn btn--ghost">Email Latisha</a>
          </div>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.portfolio} />

        {/* ── Impact Stats ───────────────────────────────────── */}
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

        {/* ── Resume Downloads ───────────────────────────────── */}
        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>Resume tracks.</h2>
          <div className="divider" />
          <p className="muted" style={{ marginBottom: 'var(--space-lg)', maxWidth: '58ch' }}>
            Two ATS-optimized tracks built for $100K+ remote roles. Both current as of 2026.
          </p>
          <div className="grid-2">
            {RESUME_TRACKS.map(track => (
              <div className="card" key={track.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>Track {track.id}</span>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>{track.title}</h3>
                  <p className="muted" style={{ fontSize: '0.875rem' }}>{track.desc}</p>
                </div>
                <a
                  href={track.url}
                  className="btn btn--outline"
                  style={{ marginTop: 'var(--space-lg)', alignSelf: 'flex-start' }}
                  target="_blank"
                  rel="noopener"
                  download
                >
                  Download PDF
                </a>
              </div>
            ))}
          </div>
          <p className="muted" style={{ fontSize: '0.8rem', marginTop: 'var(--space-md)' }}>
            Additional tracks available (Digital Learning, Operations/Compliance, CRM/Tech) — contact for specific versions.
          </p>
        </section>

        {/* ── Case Studies ───────────────────────────────────── */}
        <section className="section">
          <h2>Selected work.</h2>
          <div className="divider" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', marginTop: 'var(--space-lg)' }}>
            {CASE_STUDIES.map((study, i) => (
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

        {/* ── Skills + Tools ─────────────────────────────────── */}
        <section className="section section--dusk" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>Skills + tools.</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            {Object.entries(SKILLS).map(([category, items]) => (
              <div className="card" key={category} style={{ background: 'rgba(26,28,46,0.5)' }}>
                <h4 style={{ color: 'var(--color-amber)', marginBottom: 'var(--space-md)' }}>{category}</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {items.map(item => (
                    <li key={item} style={{ fontSize: '0.875rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--color-amber)', fontSize: '0.6rem' }}>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education + Credentials ────────────────────────── */}
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
                <p style={{ color: 'var(--color-amber)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{cred.institution}</p>
                <p className="muted" style={{ fontSize: '0.8rem' }}>{cred.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Consulting CTA ─────────────────────────────────── */}
        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
          <h2>Interested in working together?</h2>
          <p className="muted" style={{ margin: 'var(--space-md) auto var(--space-lg)', maxWidth: '50ch' }}>
            Available for remote roles in AI enablement, digital transformation, and cultural heritage archiving.
            Also available for consulting engagements.
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