import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { URLS } from '../../lib/constants';
import { PRINT_SAMPLES } from '../../lib/printSamples';

export async function getStaticProps() {
  const samples = PRINT_SAMPLES.filter((sample) => {
    const rel = sample.src.replace(/^\//, '');
    return fs.existsSync(path.join(process.cwd(), 'public', rel));
  });
  return {
    props: { samples },
    revalidate: 600,
  };
}

export default function PublicationDesignCaseStudy({ samples = [] }) {
  const covers = samples.filter((s) => s.kind === 'cover');
  const spreads = samples.filter((s) => s.kind === 'spread');

  return (
    <Layout
      title="Publication and graphic design"
      description="Catalog covers and interiors designed and produced for SC State 1890 Community Education. InDesign, Photoshop, Acrobat."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Lookbook</p>
          <h1>Catalogs, laid out and produced.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Designed and produced for SC State 1890 Community Education. Covers and one interior
            spread — InDesign, Photoshop, Acrobat. Teaching from this period is technology classes
            only: Word, internet safety, email, Techbridge, SMART camp, and professional development.
          </p>
        </div>

        <section className="section">
          <h2>Community Education catalogs.</h2>
          <div className="divider" />
          {covers.length === 0 && spreads.length === 0 ? (
            <p className="muted" style={{ marginTop: 'var(--space-md)', maxWidth: '62ch' }}>
              Previews are prepared as cropped JPGs. Source files stay off this site.
            </p>
          ) : (
            <>
              {covers.length > 0 ? (
                <div className="print-strip print-strip--covers" style={{ marginTop: 'var(--space-lg)' }}>
                  {covers.map((img) => (
                    <figure key={img.id} className="print-strip__frame">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={720}
                        height={960}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <figcaption className="print-strip__cap">
                        {img.title}
                        <span className="print-strip__medium"> · {img.caption}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
              {spreads.map((img) => (
                <figure key={img.id} className="print-strip__frame print-strip__frame--spread">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={1400}
                    height={900}
                    sizes="(max-width: 900px) 100vw, 70vw"
                  />
                  <figcaption className="print-strip__cap">
                    {img.title}
                    <span className="print-strip__medium"> · {img.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </>
          )}
        </section>

        <section className="section section--dusk" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
          <h2>What this sample shows.</h2>
          <div className="divider" />
          <ul style={{ marginTop: 'var(--space-lg)', maxWidth: '68ch', lineHeight: 1.7 }}>
            <li>Cover hierarchy, season identity, and institutional branding for a statewide catalog</li>
            <li>Interior editorial layout for a multi-program Community Education book</li>
            <li>Production through InDesign, Photoshop, and Acrobat — not a purchased template pack</li>
          </ul>
          <p className="muted" style={{ marginTop: 'var(--space-lg)', maxWidth: '62ch' }}>
            School handbook and brochure interiors stay off this page until a student-privacy sweep.
            Original Midnight Magnolia artwork lives in the gallery.
          </p>
        </section>

        <section className="section" style={{ paddingBottom: 'var(--space-2xl)' }}>
          <h2>Skills demonstrated</h2>
          <div className="divider" />
          <p className="muted" style={{ marginTop: 'var(--space-md)', maxWidth: '62ch' }}>
            InDesign · Photoshop · Acrobat · editorial layout · cover design
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginTop: 'var(--space-xl)' }}>
            <Link href="/portfolio" className="btn btn--outline">Back to Portfolio</Link>
            <Link href="/gallery" className="btn btn--ghost">Open the gallery</Link>
            <a href={URLS.linkedin} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
