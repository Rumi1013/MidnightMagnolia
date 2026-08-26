import Layout from '../Layout';
import Link from 'next/link';
import { URLS } from '../../lib/constants';

export default function CaseStudyPage({
  title,
  description,
  challenge,
  method,
  evidence,
  outcome,
  skills,
  liveHref,
  liveLabel,
}) {
  return (
    <Layout title={title} description={description}>
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Case study</p>
          <h1>{title}</h1>
          <div className="divider" />
          <p className="hero__subtitle">{description}</p>
        </div>

        <section className="section">
          <h2>The challenge.</h2>
          <div className="divider" />
          <p style={{ maxWidth: '68ch', marginTop: 'var(--space-md)' }}>{challenge}</p>
        </section>

        <section className="section section--dusk" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h2>What was built.</h2>
          <div className="divider" />
          <p style={{ maxWidth: '68ch', marginTop: 'var(--space-md)' }}>{method}</p>
          {evidence ? (
            <p className="muted" style={{ maxWidth: '68ch', marginTop: 'var(--space-md)' }}>
              Evidence on request: {evidence}
            </p>
          ) : null}
        </section>

        <section className="section">
          <h2>What it made possible.</h2>
          <div className="divider" />
          <p style={{ maxWidth: '68ch', marginTop: 'var(--space-md)' }}>{outcome}</p>
          {skills ? (
            <p className="muted" style={{ marginTop: 'var(--space-lg)', maxWidth: '62ch' }}>{skills}</p>
          ) : null}
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginTop: 'var(--space-xl)' }}>
            {liveHref ? (
              <a href={liveHref} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                {liveLabel || 'View live work'}
              </a>
            ) : null}
            <Link href="/portfolio" className="btn btn--outline">Back to Portfolio</Link>
            <a href={URLS.linkedin} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
