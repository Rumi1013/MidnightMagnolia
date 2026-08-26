import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { BRAND_ASSETS } from '../lib/brandAssets';
import { URLS, PRODUCTS, SERVICES } from '../lib/constants';

const STATS = [
  { number: '$1.5M+', label: 'Funding Secured' },
  { number: '610+',   label: 'Program Participants' },
  { number: '15+',    label: 'Years of Leadership' },
  { number: '$300K+', label: 'Annual Budget Managed' },
];

export default function Home() {
  // The Sanctuary side keeps the same three-rung pricing ladder as the shop:
  // free entry point, $9 starter, $49 flagship.
  const sanctuaryProducts = PRODUCTS.filter(p => ['gentle-beginning', 'shadow-work-starter', 'deep-roots'].includes(p.id));

  return (
    <Layout>
      {/* ── Hero — Work With Me ─────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <p className="hero__eyebrow">Midnight Magnolia · Lowcountry, SC</p>
          <h1 className="hero__title">
            Clarity for the work that <em style={{ color: 'var(--color-amber)', fontStyle: 'italic' }}>actually matters.</em>
          </h1>
          <p className="hero__subtitle">
            Information governance, AI enablement, and knowledge systems strategy — for people and
            organizations who need less noise, not more frameworks.
          </p>
          <div className="hero__actions">
            <Link href="/services" className="btn btn--primary">
              Book a Session
            </Link>
            <Link href="/work-with-me" className="btn btn--outline">
              See How We Work Together
            </Link>
          </div>
        </div>
      </section>

      {/* ── The work, in numbers ───────────────────────────────── */}
      <section className="section section--dusk home-about" aria-labelledby="numbers-heading">
        <div className="container">
          <h2 id="numbers-heading" style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>The work, in numbers.</h2>
          <div className="stat-grid">
            {STATS.map(s => (
              <div className="stat-block" key={s.label}>
                <span className="stat-number">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="muted" style={{ textAlign: 'center', maxWidth: '56ch', margin: 'var(--space-lg) auto 0' }}>
            Fifteen years turning scattered systems into ones people can actually use — now available
            for your team, your archive, or your next transition.
          </p>
        </div>
      </section>

      {/* ── Services — three offers ────────────────────────────── */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <h2 id="services-heading">Ways to work together.</h2>
          <div className="divider" />
          <div className="grid-3" style={{ marginTop: 'var(--space-lg)' }}>
            {SERVICES.map(s => (
              <div className="card" key={s.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <h3>{s.title}</h3>
                <p className="muted" style={{ marginTop: '0.5rem', flex: 1 }}>{s.description}</p>
                <ul style={{ margin: 'var(--space-md) 0', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {s.bullets.map(b => (
                    <li key={b} className="muted" style={{ fontSize: '0.8rem', paddingLeft: '0.9rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--color-amber)' }}>·</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex-between" style={{ marginTop: 'var(--space-md)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-amber)' }}>
                    {s.price}
                  </span>
                  <Link href={s.url} className="btn btn--primary" style={{ padding: '0.5rem 1.2rem' }}>
                    {s.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof ────────────────────────────────────────── */}
      <section className="section section--dark home-quote" aria-labelledby="proof-heading">
        <div className="container">
          <h2 id="proof-heading" style={{ maxWidth: '26ch', margin: '0 auto' }}>Fifteen years of proof, not promises.</h2>
          <p className="home-quote__support" style={{ maxWidth: '58ch', marginTop: 'var(--space-md)' }}>
            I spent fifteen years running the systems nonprofits and schools don&rsquo;t see until they
            break — funder reporting, program documentation, records that had to hold up under audit.
            That&rsquo;s the same discipline behind the funding and participant numbers above. This
            consulting practice exists because that kind of steadiness is rare, and because most AI
            and knowledge-management advice out there wasn&rsquo;t built by someone who has actually run
            the operations underneath it.
          </p>
          <p className="muted" style={{ marginTop: 'var(--space-md)', fontSize: '0.85rem' }}>
            — Latisha Vincent-Waters
          </p>
          <div style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/portfolio" className="btn btn--outline">See the Portfolio</Link>
            <Link href="/about" className="btn btn--ghost">Read the Full Story</Link>
          </div>
        </div>
      </section>

      {/* ── The Sanctuary side (condensed) ─────────────────────── */}
      <section id="sanctuary" className="section section--dusk" aria-labelledby="sanctuary-heading">
        <div className="container">
          <h2 id="sanctuary-heading">And when you need a slower kind of work —</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '60ch', marginTop: 'var(--space-md)' }}>
            Shadow work journals, a $9/month healing membership, and original illustration — the outlet
            side of Midnight Magnolia, for quiet builders who know their pace isn&rsquo;t the problem.
          </p>

          <div className="grid-3" style={{ marginTop: 'var(--space-lg)' }}>
            {sanctuaryProducts.map(p => (
              <div className="card" key={p.id}>
                {p.tag && <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>{p.tag}</span>}
                <h3>{p.title}</h3>
                <p className="muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{p.description}</p>
                <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-amber)' }}>{p.price}</span>
                  <a href={p.url} className="btn btn--primary" style={{ padding: '0.5rem 1.2rem' }} target="_blank" rel="noopener noreferrer">
                    Get It
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="muted" style={{ marginTop: 'var(--space-xl)', maxWidth: '52ch' }}>
            Original pieces from the <strong>Magnolia Priestess</strong> and <strong>Riverwalk Lantern
            Path</strong> collections.
          </p>
          <div className="art-strip">
            {BRAND_ASSETS.gallery.map((img) => (
              <figure key={img.src} className="art-strip__frame">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={720}
                  height={540}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
                />
                <figcaption className="art-strip__cap">
                  {img.series}
                  {img.medium ? <span className="art-strip__medium"> · {img.medium}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="card" style={{ marginTop: 'var(--space-xl)', maxWidth: 560 }}>
            <span className="tag">Membership</span>
            <h3 style={{ marginTop: '0.5rem' }}>Magnolia Circle — $9/month</h3>
            <p className="muted" style={{ marginTop: '0.4rem' }}>
              Monthly shadow work prompts, ritual practices, and the member edition of Dusk Letters.
            </p>
            <a
              href={URLS.bmac}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 'var(--space-md)', display: 'inline-block' }}
            >
              Join on Buy Me a Coffee
            </a>
          </div>
        </div>
      </section>

      {/* ── Closing line ────────────────────────────────────────── */}
      <section className="section section--dark home-quote" aria-labelledby="philosophy-heading">
        <div className="container">
          <h2 id="philosophy-heading" style={{ maxWidth: '20ch', margin: '0 auto' }}>
            &ldquo;The work is not to do more.<br />
            <em style={{ color: 'var(--color-amber)' }}>It is to build something that holds.</em>&rdquo;
          </h2>
          <p className="muted" style={{ maxWidth: '44ch', margin: 'var(--space-md) auto 0' }}>
            You don&rsquo;t have to hustle your way here. Start where you are.
          </p>
        </div>
      </section>
    </Layout>
  );
}
