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

export async function getStaticProps() {
  const raw = await getBookingServices(50);
  const services = (raw || [])
    .filter((s) => s?.hidden !== true)
    .map((s) => ({
      id: s._id,
      name: s.name || 'Untitled service',
      tagline: s.tagLine || '',
      description: s.description || '',
      price: formatServicePrice(s),
      duration: formatServiceDuration(s),
      category: s.category?.name || null,
      url: getServiceBookingUrl(s) || URLS.booking,
      online: s.payment?.options?.online === true,
      inPerson: s.payment?.options?.inPerson === true,
    }));
  return {
    props: { services },
    revalidate: 300,
  };
}

export default function Services({ services }) {
  return (
    <Layout
      title="Work With Me"
      description="Book a session with Latisha — creative direction, publishing, brand voice, and Notion sanctuary work for healing-centered creators."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Work With Me</p>
          <h1>Sessions for the messy middle.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            One-on-one strategy, publishing, and systems work for creators who refuse to hustle
            their way to wholeness. Booking happens on the secure Wix booking page.
          </p>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.services} />

        <section className="section">
          {services.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
              <h3>Bookings are paused right now.</h3>
              <p className="muted" style={{ marginTop: 'var(--space-md)' }}>
                Send a note and we&rsquo;ll find time when the calendar opens again.
              </p>
              <a
                href={URLS.email}
                className="btn btn--outline"
                style={{ marginTop: 'var(--space-md)' }}
              >
                Email Latisha
              </a>
            </div>
          ) : (
            <div className="grid-2">
              {services.map((s) => (
                <article
                  className="card"
                  key={s.id}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {s.category && (
                    <p
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--color-eyebrow-on-dark)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {s.category}
                    </p>
                  )}

                  <h3 style={{ fontSize: '1.3rem' }}>{s.name}</h3>

                  {s.tagline && (
                    <p className="muted" style={{ fontSize: '0.95rem', marginTop: '0.4rem' }}>
                      {s.tagline}
                    </p>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                      marginTop: 'var(--space-md)',
                      marginBottom: 'var(--space-md)',
                    }}
                  >
                    {s.duration && (
                      <span
                        className="tag"
                        style={{ fontSize: '0.72rem' }}
                      >
                        {s.duration}
                      </span>
                    )}
                    {s.online && (
                      <span className="tag" style={{ fontSize: '0.72rem' }}>
                        Virtual
                      </span>
                    )}
                  </div>

                  {s.description && (
                    <p
                      className="muted"
                      style={{
                        fontSize: '0.875rem',
                        flex: 1,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {s.description.length > 280
                        ? `${s.description.slice(0, 280).trimEnd()}…`
                        : s.description}
                    </p>
                  )}

                  <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                    {s.price && (
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.5rem',
                          color: 'var(--color-amber)',
                        }}
                      >
                        {s.price}
                      </span>
                    )}
                    <a
                      href={s.url}
                      className="btn btn--primary"
                      style={{ padding: '0.5rem 1.2rem' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Now
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section
          className="section section--dark"
          style={{
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-xl)',
            marginBottom: 'var(--space-2xl)',
            textAlign: 'center',
          }}
        >
          <h2>Not sure where to start?</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '52ch', margin: 'var(--space-md) auto var(--space-lg)' }}>
            Send a quick note about what you&rsquo;re working on and what season you&rsquo;re in.
            I&rsquo;ll point you to the session that fits — or tell you honestly when none of them does.
          </p>
          <a href={URLS.email} className="btn btn--outline">
            Email Latisha
          </a>
        </section>
      </div>
    </Layout>
  );
}
