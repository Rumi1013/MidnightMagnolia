import Link from 'next/link';
import Layout from '../components/Layout';
import PageIllustration from '../components/PageIllustration';
import { PAGE_ILLUSTRATIONS } from '../lib/brandAssets';
import { URLS } from '../lib/constants';

export default function Library() {
  return (
    <Layout
      title="The Library"
      description="Reading room for Southern Gothic craft, archival practice, and quiet study paths into the Grimoire and shop."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">The Library</p>
          <h1>Read, study, return.</h1>
          <div className="divider" />
          <p className="hero__subtitle" style={{ maxWidth: '60ch' }}>
            A calm shelf between the Sanctuary and the Grimoire. Long-form lives on the{' '}
            <Link href="/blog">public blog</Link> and Dusk Letters;
            digital products and memberships live on Buy Me a Coffee. Nothing here is paywalled by accident—only pointed clearly.
          </p>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.portfolio} />

        <section className="section">
          <h2>Where to go next.</h2>
          <div className="divider" />
          <ul style={{ maxWidth: '52ch', lineHeight: 1.7, color: 'var(--color-muted)' }}>
            <li style={{ marginBottom: '0.75rem' }}>
              <Link href="/sanctuary">The Sanctuary</Link>
              {' — '}
              services, booking, and the shape of the work.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <Link href="/grimoire">The Grimoire</Link>
              {' — '}
              member writing and gated paths; start on the site, then follow through Gumroad or Buy Me a Coffee when you are ready.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <a href={URLS.gumroad} target="_blank" rel="noopener noreferrer">Gumroad</a>
              {' — '}
              journals, kits, and digital downloads.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <a href={URLS.bmac} target="_blank" rel="noopener noreferrer">Buy Me a Coffee</a>
              {' — '}
              Magnolia Circle membership and tips.
            </li>
            <li>
              <a href={URLS.wixHome} target="_blank" rel="noopener noreferrer">Public Wix site</a>
              {' — '}
              gallery, blog entry points, and legacy pages not yet mirrored in this Next build.
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
