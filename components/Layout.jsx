import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAV, MORE_NAV, URLS, COLLECTION_SURVEY_URL } from '../lib/constants';
import { BRAND_ASSETS } from '../lib/brandAssets';


function NavigationLink({ item, active = false }) {
  const closeMenu = event => {
    const menu = event.currentTarget.closest('details');
    if (menu) menu.open = false;
  };
  if (item.external) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>{item.label}</a>;
  }
  return <Link href={item.href} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined} onClick={closeMenu}>{item.label}</Link>;
}

export default function Layout({ children, title, description }) {
  const router = useRouter();
  const pageTitle = title ? `${title} · Midnight Magnolia` : 'Midnight Magnolia · A Southern Gothic Digital Sanctuary';
  const pageDesc  = description || 'A Southern Gothic sanctuary for healing, creation, and quiet growth. Digital offerings, gentle strategy, and tools for neurodivergent creators.';
  const siteBase = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  const pathOnly = router.asPath.split('?')[0];
  const canonicalHref = siteBase ? `${siteBase}${pathOnly === '/' ? '' : pathOnly}` : null;

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

      <nav className="nav" aria-label="Main navigation">
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
            {NAV.map(item => <NavigationLink key={item.href} item={item} active={router.pathname === item.href} />)}
            <details className="nav__more">
              <summary>More</summary>
              <div className="nav__dropdown">
                {MORE_NAV.map(item => <NavigationLink key={item.href} item={item} active={router.pathname === item.href} />)}
              </div>
            </details>
            <a href={COLLECTION_SURVEY_URL} className="nav__cta" target="_blank" rel="noopener noreferrer">Shape the collection</a>
          </div>
          <details className="nav__mobile">
            <summary>Menu</summary>
            <div className="nav__mobile-panel">
              {NAV.map(item => <NavigationLink key={item.href} item={item} active={router.pathname === item.href} />)}
              <a href={COLLECTION_SURVEY_URL} className="nav__cta" target="_blank" rel="noopener noreferrer">Help Shape Our First Collection</a>
              <p className="nav__group-label">More from Midnight Magnolia</p>
              {MORE_NAV.map(item => <NavigationLink key={item.href} item={item} active={router.pathname === item.href} />)}
            </div>
          </details>
        </div>
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
              <p>A Southern Gothic-inspired bookshop and curiosity boutique. Books, thoughtful gifts, keepsakes, and intimate gatherings.</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                <a href={URLS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={URLS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={URLS.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
                <a href={URLS.amazon} target="_blank" rel="noopener noreferrer">Amazon</a>
              </div>
            </div>
            <div className="footer__col">
              <h4>Books &amp; Curiosities</h4>
              {NAV.map(item => <NavigationLink key={item.href} item={item} />)}
              <a href={COLLECTION_SURVEY_URL} target="_blank" rel="noopener noreferrer">Shape the first collection</a>
            </div>
            <div className="footer__col">
              <h4>More to explore</h4>
              {MORE_NAV.map(item => <NavigationLink key={item.href} item={item} />)}
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
            <span>© {new Date().getFullYear()} Midnight Magnolia</span>
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