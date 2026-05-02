import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import {
  BRAND_ASSETS,
  HOME_SPOTLIGHT,
  HOME_DOOR_ART,
  HOME_CTA_ART,
} from '../lib/brandAssets';
import { URLS, PRODUCTS } from '../lib/constants';

const HOME_DOORS = [
  {
    title: 'Work With Me',
    desc: (
      <>
        Gentle, structured support for your workflows, career materials, and digital systems.
        <br /><br />
        We focus on clarity, not pressure—so you can move forward without burning out.
      </>
    ),
    href: '/work-with-me',
    cta: 'See Services',
  },
  {
    title: 'The Shop',
    desc: (
      <>
        Journals, planners, and digital tools designed for real life—low energy days included.
        <br /><br />
        Start small. Take what you need. Come back when you&apos;re ready.
      </>
    ),
    href: '/shop',
    cta: 'Browse Products',
  },
  {
    title: 'The Grimoire',
    desc: (
      <>
        Writing, archives, and healing-centered resources for the long haul.
        <br /><br />
        This is where story meets survival—and turns into something sacred.
      </>
    ),
    href: '/grimoire',
    cta: 'Read the Grimoire',
  },
];

export default function Home() {
  const featuredProducts = PRODUCTS.filter(p => p.tag !== 'Coming Soon').slice(0, 3);

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <p className="hero__eyebrow">Midnight Magnolia · Lowcountry, SC</p>
          <h1 className="hero__title">
            A sanctuary for <em style={{ color: 'var(--color-amber)', fontStyle: 'italic' }}>quiet builders.</em>
          </h1>
          <p className="hero__subtitle">
            Southern Gothic tools, digital offerings, and gentle strategy for neurodivergent creators who are done forcing urgency.
          </p>
          <p className="muted" style={{ maxWidth: '52ch', marginBottom: 'var(--space-xl)', fontSize: '1.05rem' }}>
            You don&apos;t have to move faster to build something meaningful. You just need something that holds.
          </p>
          <div className="hero__actions">
            <a href={URLS.booking} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
              Book a Session
            </a>
            <Link href="/shop" className="btn btn--outline">Visit the Shop</Link>
          </div>
        </div>
      </section>

      {/* ── Visual language / art ─────────────────────────────── */}
      <section className="section section--dark section--spotlight" aria-labelledby="spotlight-heading">
        <div className="container home-spotlight">
          <div className="home-spotlight__media">
            <Image
              src={HOME_SPOTLIGHT.src}
              alt={HOME_SPOTLIGHT.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: HOME_SPOTLIGHT.objectPosition }}
            />
          </div>
          <div className="home-spotlight__copy">
            <p className="page-hero__eyebrow" style={{ marginBottom: 'var(--space-sm)' }}>{HOME_SPOTLIGHT.eyebrow}</p>
            <h2 id="spotlight-heading">{HOME_SPOTLIGHT.title}</h2>
            <div className="divider" />
            <p className="muted" style={{ marginBottom: 'var(--space-md)', maxWidth: '48ch' }}>
              Every piece you see here is part of a living archive—magnolia blooms, lantern paths, quiet altars, and ancestral symbols that ground the work.
            </p>
            <p className="muted" style={{ marginBottom: 'var(--space-md)', maxWidth: '42ch' }}>
              This isn&apos;t decoration.
              <br />
              It&apos;s structure.
            </p>
            <p className="muted" style={{ marginBottom: 'var(--space-lg)', maxWidth: '48ch' }}>
              The same visual language flows through the shop, the sessions, and the systems we build together—so your brand doesn&apos;t just look good…{' '}
              <em style={{ color: 'var(--color-amber)', fontStyle: 'italic' }}>it feels like home</em>.
            </p>
            <div className="home-spotlight__ctas">
              <Link href="#catalog" className="btn btn--primary">View the Catalog</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Catalog (living archive) ─────────────────────────── */}
      <section id="catalog" className="section section--linen">
        <div className="container">
          <h2>The catalog</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '52ch', marginTop: 'var(--space-md)' }}>
            Magnolia priestess and riverwalk lantern path—pieces from the organized library that show up across the shop, sessions, and story.
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
          <p className="muted" style={{ marginTop: 'var(--space-lg)', fontSize: '0.875rem', maxWidth: '48ch' }}>
            <a href={URLS.booking} target="_blank" rel="noopener noreferrer">Book a session</a>
            {' · '}
            <Link href="/work-with-me">See how we work together</Link>
          </p>
        </div>
      </section>

      {/* ── About / positioning ───────────────────────────────── */}
      <section className="section section--dusk home-about" aria-labelledby="about-heading">
        <div className="container">
          <h2 id="about-heading" className="visually-hidden">About this space</h2>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.5vw, 1.65rem)', maxWidth: '40ch', lineHeight: 1.45, marginBottom: 'var(--space-lg)' }}>
            This space was built for creators who think deeply, feel everything, and are tired of pretending that burnout is normal.
          </p>
          <div className="divider" />
          <div className="home-about__body muted">
            <p style={{ marginBottom: 'var(--space-md)' }}>Here, we move differently.</p>
            <p style={{ marginBottom: 'var(--space-md)' }}>
              We build businesses that respect our energy.
              <br />
              We create systems that don&apos;t punish inconsistency.
              <br />
              We design work that can hold grief, healing, joy, and ambition—all at once.
            </p>
            <p>You&apos;re allowed to build something soft… and still be powerful.</p>
          </div>
        </div>
      </section>

      {/* ── Three pathways ───────────────────────────────────── */}
      <section className="section" aria-labelledby="doors-heading">
        <div className="container">
          <h2 id="doors-heading">Three ways in.</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '52ch', marginTop: 'var(--space-md)' }}>
            Each path is rooted in the same intention: build something that supports your life—not the other way around.
          </p>
          <div className="grid-3 door-grid" style={{ marginTop: 'var(--space-lg)' }}>
            {HOME_DOORS.map((door, i) => {
              const art = HOME_DOOR_ART[i];
              return (
                <Link key={door.title} href={door.href} className="door-card card-link">
                  <div className="door-card__media">
                    <Image
                      src={art.src}
                      alt={art.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover', objectPosition: art.objectPosition }}
                    />
                  </div>
                  <div className="door-card__body">
                    <h3>{door.title}</h3>
                    <div className="divider" style={{ width: 32 }} />
                    <div className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.75 }}>{door.desc}</div>
                    <span className="btn btn--ghost door-card__btn">{door.cta}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Shop feature ──────────────────────────────────────── */}
      <section className="section section--dusk">
        <div className="container">
          <div className="flex-between" style={{ marginBottom: 'var(--space-lg)' }}>
            <div>
              <h2>Start where it feels light.</h2>
              <div className="divider" />
              <p className="muted" style={{ maxWidth: '46ch', marginTop: 'var(--space-sm)', fontSize: '0.9rem' }}>
                You don&apos;t need everything. Just one tool that meets you where you are.
              </p>
            </div>
            <Link href="/shop" className="btn btn--outline">All Products</Link>
          </div>
          <div className="grid-3">
            {featuredProducts.map(p => (
              <div className="card" key={p.id}>
                {p.tag && <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>{p.tag}</span>}
                <h3>{p.title}</h3>
                <p className="muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{p.description}</p>
                <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-amber)' }}>{p.price}</span>
                  <a href={p.url} className="btn btn--primary" style={{ padding: '0.5rem 1.2rem' }} target="_blank" rel="noopener">
                    Get It Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy / quote ─────────────────────────────────── */}
      <section className="section section--dark home-quote" aria-labelledby="philosophy-heading">
        <div className="container">
          <h2 id="philosophy-heading" className="visually-hidden">Philosophy</h2>
          <blockquote className="home-quote__blockquote">
            <p className="home-quote__lead">
              &ldquo;The work is not to do more.
              <br />
              <em style={{ color: 'var(--color-amber)', fontStyle: 'italic' }}>It is to build something that holds.&rdquo;</em>
            </p>
          </blockquote>
          <p className="muted home-quote__support">
            You&apos;re not behind.
            <br />
            You&apos;re building differently.
            <br /><br />
            And that difference is the point.
          </p>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="section section--dark section--cta-split" aria-labelledby="final-cta-heading">
        <div className="container home-cta-split">
          <div className="home-cta-split__media">
            <Image
              src={HOME_CTA_ART.src}
              alt={HOME_CTA_ART.alt}
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              style={{ objectFit: 'cover', objectPosition: HOME_CTA_ART.objectPosition }}
            />
          </div>
          <div className="home-cta-split__copy">
            <h2 id="final-cta-heading" style={{ maxWidth: '22ch', textAlign: 'left' }}>
              Begin where you are.
            </h2>
            <div className="divider" />
            <p className="muted" style={{ marginTop: 'var(--space-md)', maxWidth: '44ch' }}>
              Whether you need structure, softness, or support—there&apos;s a path here for you.
            </p>
            <p className="muted" style={{ marginTop: 'var(--space-sm)', maxWidth: '40ch' }}>
              Take a step.
              <br />
              We&apos;ll meet you there.
            </p>
            <div className="home-cta-split__actions">
              <a href={URLS.booking} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                Book a Session
              </a>
              <a href={URLS.stanStore} className="btn btn--outline" target="_blank" rel="noopener noreferrer">Visit the Shop</a>
              <Link href="/sanctuary" className="btn btn--ghost">Read the Story</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
