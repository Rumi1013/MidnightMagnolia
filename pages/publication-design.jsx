import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { BRAND_ASSETS } from '../lib/brandAssets';
import {
  PRINT_DESIGN_GROUPS,
  PRINT_DESIGN_SAMPLES,
  samplesForGroup,
} from '../lib/printDesignSamples';

function publicFileExists(publicSrc) {
  if (!publicSrc || !publicSrc.startsWith('/')) return false;
  return fs.existsSync(path.join(process.cwd(), 'public', publicSrc.slice(1)));
}

function PrintFrame({ sample }) {
  return (
    <figure
      className={`print-strip__frame print-strip__frame--${sample.kind}`}
    >
      {sample.available ? (
        <Image
          src={sample.src}
          alt={sample.alt}
          width={sample.kind === 'spread' ? 1200 : 720}
          height={sample.kind === 'spread' ? 675 : 960}
          sizes={
            sample.kind === 'spread'
              ? '(max-width: 768px) 100vw, 70vw'
              : '(max-width: 768px) 50vw, 22vw'
          }
        />
      ) : (
        <div className="print-strip__pending" aria-label={`${sample.title} — preview pending`}>
          <span className="print-strip__pending-title">{sample.title}</span>
          <span className="print-strip__pending-note">Preview crop pending source export</span>
        </div>
      )}
      <figcaption className="print-strip__cap">
        <span className="print-strip__title">{sample.title}</span>
        <span className="print-strip__medium"> · {sample.caption}</span>
      </figcaption>
    </figure>
  );
}

export default function PublicationDesignPage({ samples }) {
  const originals = BRAND_ASSETS.gallery;

  return (
    <Layout
      title="Publication Design"
      description="Print samples: SC State 1890 Community Education catalogs, commemorative programs used with permission, and original Midnight Magnolia artwork."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Publication design</p>
          <h1>Print that already lived in the world.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Seasonal community-education catalogs, commemorative programs, and original artwork.
            Press samples — not purchased templates.
          </p>
        </div>

        <section className="section" id="this-pass">
          <h2>This pass.</h2>
          <div className="divider" />
          <p style={{ maxWidth: '64ch', marginBottom: 'var(--space-md)' }}>
            A small strip, on purpose. Three SC State 1890 Community Education covers — Fall 2014,
            Winter 2015, Spring–Summer 2015 — and one Fall 2014 interior spread. Two commemorative
            programs, used with permission. Original artwork already on the gallery.
          </p>
          <p className="muted" style={{ maxWidth: '64ch' }}>
            Not here: GraphicRiver, purchased invitation templates, CDA handbook interiors, draft
            cover dumps, or the 2013 A-Team report. Invitations wait until the Seabrook jpgs can be
            checked for other families&apos; minors.
          </p>
        </section>

        {PRINT_DESIGN_GROUPS.map((group) => {
          const groupSamples = samplesForGroup(group.id, samples);
          return (
            <section className="section" id={group.id} key={group.id}>
              <h2>{group.title}</h2>
              <div className="divider" />
              <p style={{ maxWidth: '64ch', marginBottom: group.teachingNote ? 'var(--space-md)' : 'var(--space-lg)' }}>
                {group.intro}
              </p>
              {group.teachingNote ? (
                <p className="muted" style={{ maxWidth: '64ch', marginBottom: 'var(--space-lg)' }}>
                  {group.teachingNote}
                </p>
              ) : null}
              <div className="print-strip">
                {groupSamples.map((sample) => (
                  <PrintFrame key={sample.id} sample={sample} />
                ))}
              </div>
            </section>
          );
        })}

        <section className="section section--linen" id="originals" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>Original artwork.</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '56ch', marginBottom: 'var(--space-lg)' }}>
            Priestess, Riverwalk, and the bloom library live on the gallery. They stay there so
            sanctuary art is not mixed with client and family print.
          </p>
          <div className="art-strip">
            {originals.map((img) => (
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
          <div style={{ marginTop: 'var(--space-lg)' }}>
            <Link href="/gallery" className="btn btn--outline">
              Open the gallery
            </Link>
          </div>
        </section>

        <section className="section" style={{ paddingBottom: 'var(--space-2xl)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <Link href="/portfolio" className="btn btn--primary">
              View portfolio
            </Link>
            <Link href="/services" className="btn btn--ghost">
              Book a session
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const samples = PRINT_DESIGN_SAMPLES.map((sample) => ({
    ...sample,
    available: publicFileExists(sample.src),
  }));

  return {
    props: { samples },
    revalidate: 300,
  };
}
