import Link from 'next/link';
import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import PageIllustration from '../components/PageIllustration';
import { PAGE_ILLUSTRATIONS } from '../lib/brandAssets';
import { URLS } from '../lib/constants';
import {
  getBookingServices,
  formatServicePrice,
  formatServiceDuration,
  getServiceBookingUrl,
} from '../lib/wix';
import { resolveServiceTagline } from '../lib/serviceTaglines';

export async function getStaticProps() {
  const raw = await getBookingServices(20);
  const previewServices = (raw || [])
    .filter((s) => s?.hidden !== true)
    .slice(0, 3)
    .map((s) => ({
      id: s._id,
      name: s.name || 'Untitled service',
      tagline: resolveServiceTagline(s.name || '', s.tagLine),
      price: formatServicePrice(s),
      duration: formatServiceDuration(s),
      url: getServiceBookingUrl(s) || URLS.booking,
    }));
  return {
    props: { previewServices },
    revalidate: 300,
  };
}

export default function Sanctuary({ previewServices = [] }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const mailtoHref = useMemo(
    () =>
      `mailto:bgconscious@gmail.com?subject=${encodeURIComponent(
        `Sanctuary contact from ${form.name || 'Website visitor'}`
      )}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )}`,
    [form.name, form.email, form.message]
  );

  return (
    <Layout
      title="The Sanctuary"
      description="Free resources, Magnolia Circle pathways, and a direct contact entry point for Midnight Magnolia."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">The Sanctuary</p>
          <h1>You found the right quiet.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            A soft landing for neurodivergent creators, healing-centered women, and quiet builders.
            Start with free resources, then choose the next step that fits your energy.
          </p>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.sanctuary} />

        {/* Free Resources (3 cards) */}
        <section className="section">
          <h2>Free resources.</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '56ch', marginBottom: 'var(--space-lg)' }}>
            Pick one entry point. No pressure to do everything at once.
          </p>
          <div className="grid-3">
            {[
              {
                title: 'Gentle Beginning',
                desc: 'Start with grounding prompts and low-spoon structure.',
                href: URLS.gumroad,
                cta: 'Get the free starter',
              },
              {
                title: 'Dusk Letters',
                desc: 'Read reflective writing at the intersection of healing, lineage, and creativity.',
                href: '/grimoire',
                cta: 'Read now',
                internal: true,
              },
              {
                title: 'Tools Library',
                desc: 'Curated tools for systems, content, and archive-centered work.',
                href: '/resources',
                cta: 'Browse resources',
                internal: true,
              },
            ].map((item) => (
              <div className="card" key={item.title} style={{ display: 'flex', flexDirection: 'column' }}>
                <h3>{item.title}</h3>
                <p className="muted" style={{ flex: 1 }}>{item.desc}</p>
                {item.internal ? (
                  <Link href={item.href} className="btn btn--outline">{item.cta}</Link>
                ) : (
                  <a href={item.href} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
                    {item.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>Magnolia Circle</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '58ch', marginBottom: 'var(--space-md)' }}>
            A gentle monthly membership for reflection, prompts, and community practice.
            Begin with Candle Tender, then scale only when it still feels sustainable.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href={URLS.wixHome} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
              Join on Wix
            </a>
            <Link href="/membership" className="btn btn--outline">Membership details</Link>
            <a href={URLS.bmac} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
              Tip on Buy Me a Coffee
            </a>
            <a href={URLS.patreon} className="muted" style={{ fontSize: '0.82rem' }} target="_blank" rel="noopener noreferrer">
              Patreon (if active)
            </a>
          </div>
        </section>

        {previewServices.length > 0 && (
          <section className="section">
            <h2>Work with me.</h2>
            <div className="divider" />
            <p className="muted" style={{ maxWidth: '56ch', marginBottom: 'var(--space-lg)' }}>
              A few sessions to help you move with intention. Booking happens on the secure Wix
              calendar — pick a time that fits your week.
            </p>
            <div className="grid-3">
              {previewServices.map((s) => (
                <article
                  className="card"
                  key={s.id}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <h3 style={{ fontSize: '1.15rem' }}>{s.name}</h3>
                  {s.tagline && (
                    <p className="muted" style={{ fontSize: '0.875rem', flex: 1, marginTop: '0.4rem' }}>
                      {s.tagline}
                    </p>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                      marginTop: 'var(--space-md)',
                    }}
                  >
                    {s.duration && (
                      <span className="tag" style={{ fontSize: '0.7rem' }}>
                        {s.duration}
                      </span>
                    )}
                    {s.price && (
                      <span
                        className="tag"
                        style={{
                          fontSize: '0.7rem',
                          background: 'var(--color-amber)',
                          color: 'var(--color-ink)',
                        }}
                      >
                        {s.price}
                      </span>
                    )}
                  </div>
                  <a
                    href={s.url}
                    className="btn btn--outline"
                    style={{ marginTop: 'var(--space-md)', alignSelf: 'flex-start' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book this session
                  </a>
                </article>
              ))}
            </div>
            <div style={{ marginTop: 'var(--space-lg)' }}>
              <Link href="/services" className="btn btn--ghost">
                View all sessions →
              </Link>
            </div>
          </section>
        )}

        <section className="section">
          <h2>About Latisha.</h2>
          <div className="divider" />
          <div style={{ maxWidth: '70ch' }}>
            <p style={{ marginBottom: 'var(--space-md)' }}>
              I am Latisha Vincent-Waters, a Senior Program Manager, systems strategist, and Lowcountry
              South Carolina builder with 15+ years of program, funding, and operations leadership.
            </p>
            <p style={{ marginBottom: 'var(--space-md)' }} className="muted">
              Midnight Magnolia grows from a healing-centered framework and a living family archive:
              work that honors lineage, sustainability, and practical structure for real life.
            </p>
            <p className="muted">
              If you want the full story and brand roots, visit the About page.
            </p>
            <div style={{ marginTop: 'var(--space-md)' }}>
              <Link href="/about" className="btn btn--outline">Read full About page</Link>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingBottom: 'var(--space-2xl)' }}>
          <h2>Contact</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '56ch', marginBottom: 'var(--space-md)' }}>
            Send a quick note for services, collaborations, or support questions.
          </p>
          <div className="card" style={{ maxWidth: 760 }}>
            <div className="grid-2" style={{ marginBottom: 'var(--space-md)' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.85rem' }}>Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  style={{ padding: '0.7rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: 'inherit' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.85rem' }}>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  style={{ padding: '0.7rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: 'inherit' }}
                />
              </label>
            </div>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 'var(--space-md)' }}>
              <span style={{ fontSize: '0.85rem' }}>Message</span>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                style={{ padding: '0.7rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: 'inherit' }}
              />
            </label>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <a href={mailtoHref} className="btn btn--primary">Send Message</a>
              <a href={URLS.booking} className="btn btn--outline" target="_blank" rel="noopener noreferrer">Book a Session</a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
