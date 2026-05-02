import Layout from '../components/Layout';
import PageIllustration from '../components/PageIllustration';
import { PAGE_ILLUSTRATIONS } from '../lib/brandAssets';
import { SERVICES, URLS } from '../lib/constants';

export default function WorkWithMe() {
  return (
    <Layout title="Work With Me" description="Workflow consulting, AI literacy workshops, and career docs for program managers and nonprofit leaders.">
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Services</p>
          <h1>Work With Me</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Systems setup, AI literacy, and career documents — built for program managers,
            nonprofit leaders, and quiet builders ready to move differently.
          </p>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.workWithMe} />

        <section className="section">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {SERVICES.map((service, i) => (
              <div className="card" key={service.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-lg)', alignItems: 'start' }}>
                <div>
                  <h3>{service.title}</h3>
                  <div className="divider" style={{ width: 32 }} />
                  <p style={{ marginBottom: 'var(--space-md)', color: 'var(--color-muted)' }}>{service.description}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {service.bullets.map(b => (
                      <li key={b} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                        <span style={{ color: 'var(--color-amber)' }}>◆</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ textAlign: 'right', minWidth: '140px' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--color-amber)', marginBottom: 'var(--space-md)' }}>{service.price}</p>
                  <a href={service.url} className="btn btn--primary" target="_blank" rel="noopener">{service.cta}</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section" style={{ paddingTop: 0, paddingBottom: 'var(--space-2xl)', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
          Sessions are booked via the calendar. Response within 24 hours. All sessions are virtual.
        </div>
      </div>
    </Layout>
  );
}