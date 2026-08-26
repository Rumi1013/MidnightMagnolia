import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { NAV, URLS } from '../lib/constants';
import { BRAND_ASSETS } from '../lib/brandAssets';

const PRIMARY_NAV = NAV.filter(item => item.primary);
const MORE_NAV = NAV.filter(item => !item.primary);

function NavLink({ item, className, onClick }) {
  if (item.external) {
    return (
      <a href={item.href} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export default function Layout({ children, title, description }) {
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreRef = useRef(null);
  const pageTitle = title ? `${title} · Midnight Magnolia` : 'Midnight Magnolia · A Southern Gothic Digital Sanctuary';
  const pageDesc  = description || 'A Southern Gothic sanctuary for healing, creation, and quiet growth. Digital offerings, gentle strategy, and tools for neurodivergent creators.';
  const siteBase = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  const pathOnly = router.asPath.split('?')[0];
  const canonicalHref = siteBase ? `${siteBase}${pathOnly === '/' ? '' : pathOnly}` : null;

  // Close the "More" dropdown and mobile drawer on route change, outside click, or Escape.
  useEffect(() => {
    const closeAll = () => { setMoreOpen(false); setMobileOpen(false); };
    router.events.on('routeChangeStart', closeAll);
    return () => router.events.off('routeChangeStart', closeAll);
  }, [router.events]);

  useEffect(() => {
    function handleClick(e) {
      if (moreOpen && moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') { setMoreOpen(false); setMobileOpen(false); }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [moreOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="p:domain_verify" content="884b629c74f83688db9ae10a4090f7d7" />
        <meta property="og:title" content={pageTitle} />

        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        {canonicalHref ? <link rel="canonical" href={canonicalHref} /> : null}
        {canonicalHref ? <meta property="og:url" content={canonicalHref} /> : null}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="nav">
        <div className="nav__inner">
          <Link href="/" className="nav__logo">
            <Image
              className="nav__logo-img"
              src={BRAND_ASSETS.logo}
              alt="Midnight Magnolia"
              width={42}
              height={42}
              priority
            />
            <span className="nav__wordmark">
              Midnight <span className="nav__accent">Magnolia</span>
            </span>
          </Link>
          <div className="nav__links">
            {PRIMARY_NAV.map(item => {
              const active = !item.external && router.pathname === item.href;
              return (
                <NavLink
                  key={item.label}
                  item={item}
                  className={active ? 'active' : ''}
                />
              );
            })}
            <div className="nav__more" ref={moreRef}>
              <button
                type="button"
                className="nav__more-trigger"
                aria-haspopup="true"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen(o => !o)}
              >
                More
              </button>
              {moreOpen ? (
                <div className="nav__more-menu" role="menu">
                  {MORE_NAV.map(item => {
                    const active = !item.external && router.pathname === item.href;
                    return (
                      <NavLink
                        key={item.label}
                        item={item}
                        className={active ? 'active' : ''}
                        onClick={() => setMoreOpen(false)}
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
            <Link href={URLS.booking} className="nav__cta">
              Book a Session
            </Link>
          </div>

          <button
            type="button"
            className={`nav__toggle${mobileOpen ? ' is-open' : ''}`}
            aria-haspopup="true"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(o => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {mobileOpen ? (
          <div className="nav__drawer" role="menu">
            {NAV.map(item => {
              const active = !item.external && router.pathname === item.href;
              return (
                <NavLink
                  key={item.label}
                  item={item}
                  className={active ? 'active' : ''}
                  onClick={() => setMobileOpen(false)}
                />
              );
            })}
            <Link href={URLS.booking} className="nav__cta" onClick={() => setMobileOpen(false)}>
              Book a Session
            </Link>
          </div>
        ) : null}
      </nav>

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Image src={BRAND_ASSETS.logo} alt="" width={40} height={40} className="nav__logo-img" aria-hidden />
                <span>
                  Midnight <span style={{ color: 'var(--color-amber)' }}>Magnolia</span>
                </span>
              </h3>
              <p>A Southern Gothic sanctuary for healing, creation, and quiet growth.</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                <a href={URLS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={URLS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={URLS.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
                <a href={URLS.amazon} target="_blank" rel="noopener noreferrer">Amazon</a>
              </div>
            </div>
            <div className="footer__col">
              <h4>Navigate</h4>
              {NAV.map(item => (
                item.external ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
                ) : (
                  <Link key={item.href} href={item.href}>{item.label}</Link>
                )
              ))}
            </div>
            <div className="footer__col">
              <h4>Connect</h4>
              <a href={URLS.gumroad} target="_blank" rel="noopener noreferrer">Gumroad</a>
              <a href={URLS.bmac} target="_blank" rel="noopener noreferrer">Buy Me a Coffee</a>
              <Link href="/membership">Membership</Link>
              <Link href="/services">Book a Session</Link>
              <Link href="/blog">Blog</Link>
              <a href={URLS.email}>Email Latisha</a>
              <a href={URLS.patreon} target="_blank" rel="noopener noreferrer" className="muted" style={{ fontSize: '0.9rem', opacity: 0.85 }}>Patreon (if active)</a>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} Midnight Magnolia · Rumi-Nations LLC</span>
            <span className="footer__legal">
              <Link href="/privacy-policy" style={{ marginRight: '1rem' }}>Privacy</Link>
              <Link href="/terms-conditions">Terms</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}