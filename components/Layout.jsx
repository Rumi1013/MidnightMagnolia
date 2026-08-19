import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAV, FOOTER_NAV, URLS } from '../lib/constants';
import { BRAND_ASSETS } from '../lib/brandAssets';

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
              Midnight Magnolia
            </span>
          </Link>
          <div className="nav__links">
            {NAV.map(item => {
              const active = !item.external && router.pathname === item.href;
              const className = active ? 'active' : '';
              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={className}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={className}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
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
                <span>Midnight Magnolia</span>
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
              {FOOTER_NAV.map(item => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
            </div>
            <div className="footer__col">
              <h4>Connect</h4>
              <Link href="/shop">Shop</Link>
              <Link href="/services">Book a session</Link>
              <Link href="/gallery">Look</Link>
              <a href={URLS.gumroad} target="_blank" rel="noopener noreferrer">Gumroad</a>
              <a href={URLS.bmac} target="_blank" rel="noopener noreferrer">Buy Me a Coffee</a>
              <a href={URLS.email}>Email Latisha</a>
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