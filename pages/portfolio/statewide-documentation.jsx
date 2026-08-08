import Layout from '../../components/Layout';
import Link from 'next/link';
import { URLS } from '../../lib/constants';

export default function StatewideDocumentationCaseStudy() {
  return (
    <Layout
      title="Statewide Digital Documentation Platform"
      description="Information architecture, metadata schema, and archival governance for a statewide digital documentation platform serving justice-impacted families in South Carolina."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Case study</p>
          <h1>Statewide Digital Documentation Platform</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Information architecture, content taxonomy, metadata schema, and archival governance framing for a
            statewide digital documentation platform serving justice-impacted families and legal service providers
            in South Carolina.
          </p>
        </div>

        <section className="section">
          <h2>Role &amp; context</h2>
          <div className="divider" />
          <p style={{ maxWidth: '68ch', marginTop: 'var(--space-md)' }}>
            Led structure and governance thinking for a multi-agency documentation environment where records must
            remain findable, privacy-aware, and usable by advocates who are often under time and capacity pressure.
            The work sat at the intersection of program operations, legal service delivery, and long-term archival access.
          </p>
        </section>

        <section className="section section--dusk" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h2>What was delivered</h2>
          <div className="divider" />
          <ul style={{ marginTop: 'var(--space-lg)', maxWidth: '68ch', lineHeight: 1.7 }}>
            <li>Repository structure and navigation patterns for statewide content collections</li>
            <li>Metadata standards and content taxonomy for legal and family-support records</li>
            <li>Content governance framing (roles, retention-aware thinking, accessible archival design)</li>
            <li>Documentation that non-technical partners could use without a separate systems team</li>
          </ul>
        </section>

        <section className="section">
          <h2>Skills demonstrated</h2>
          <div className="divider" />
          <p className="muted" style={{ marginTop: 'var(--space-md)', maxWidth: '62ch' }}>
            Repository structure · metadata standards · content governance · accessible archival system design
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
