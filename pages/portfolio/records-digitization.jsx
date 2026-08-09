import Layout from '../../components/Layout';
import Link from 'next/link';
import { URLS } from '../../lib/constants';

export default function RecordsDigitizationCaseStudy() {
  return (
    <Layout
      title="Organizational Records Digitization"
      description="COVID-era imaging and digitization with taxonomy, metadata schemas, and retention-aligned thinking for institutional memory."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Case study</p>
          <h1>Organizational Records Digitization</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Led imaging and digitization through a COVID-era operations transition; taxonomy, metadata schemas, and
            retention-aligned thinking for long-term repository access and institutional memory.
          </p>
        </div>

        <section className="section">
          <h2>Role &amp; context</h2>
          <div className="divider" />
          <p style={{ maxWidth: '68ch', marginTop: 'var(--space-md)' }}>
            When in-person file access collapsed, paper and hybrid records had to become a reliable digital corpus —
            without losing chain-of-custody thinking or drowning staff in ad-hoc folder trees. The mandate was
            continuity of service plus a path toward durable preservation, not a one-time scan dump.
          </p>
        </section>

        <section className="section section--dusk" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h2>What was delivered</h2>
          <div className="divider" />
          <ul style={{ marginTop: 'var(--space-lg)', maxWidth: '68ch', lineHeight: 1.7 }}>
            <li>Digitization and imaging workflows that staff could run under remote constraints</li>
            <li>Archival taxonomy and metadata schemas for retrieval after the emergency ended</li>
            <li>Records lifecycle framing aligned with retention and access needs</li>
            <li>Documentation so successors could extend the repository without rebuilding from scratch</li>
          </ul>
        </section>

        <section className="section">
          <h2>Skills demonstrated</h2>
          <div className="divider" />
          <p className="muted" style={{ marginTop: 'var(--space-md)', maxWidth: '62ch' }}>
            Digital preservation workflows · archival taxonomy · records lifecycle management
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginTop: 'var(--space-xl)' }}>
            <Link href="/portfolio" className="btn btn--outline">Back to Portfolio</Link>
            <a href={URLS.linkedin} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
