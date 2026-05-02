import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAV, URLS } from '../lib/constants';
import { BRAND_ASSETS } from '../lib/brandAssets';

export default function Layout({ children, title, description }) {
  const router = useRouter();
  const pageTitle = title ? `${title} · Midnight Magnolia` : 'Midnight Magnolia · A Southern Gothic Digital Sanctuary';
  const pageDesc  = description || 'A Southern Gothic sanctuary for neurodivergent creators and quiet builders. Digital products, consulting, and healing-centered tools.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
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
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={router.pathname === item.href ? 'active' : ''}
              >
                {item.label}
              </Link>
            ))}
            <Link href={URLS.booking} className="nav__cta" target="_blank" rel="noopener noreferrer">
              Book a Session
            </Link>
          </div>
        </div>
      </nav>

      <main>{children}</main>

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
              <p>A Southern Gothic sanctuary for neurodivergent creators, healing-centered women, and quiet builders.</p>
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
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
            </div>
            <div className="footer__col">
              <h4>Connect</h4>
              <a href={URLS.booking} target="_blank" rel="noopener noreferrer">Book a Session</a>
              <a href={URLS.stanStore} target="_blank" rel="noopener noreferrer">Shop Products</a>
              <a href={URLS.email}>Email Latisha</a>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} Midnight Magnolia · Rumi-Nations LLC</span>
            <span>
              <Link href="/privacy-policy" style={{ color: 'inherit', marginRight: '1rem' }}>Privacy</Link>
              <Link href="/terms-conditions" style={{ color: 'inherit' }}>Terms</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}