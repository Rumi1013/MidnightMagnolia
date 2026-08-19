import Link from 'next/link';
import Layout from '../components/Layout';
import PageIllustration from '../components/PageIllustration';
import { PAGE_ILLUSTRATIONS, BRAND_ASSETS } from '../lib/brandAssets';
import {
  URLS,
  CASE_STUDIES,
  SKILLS,
  FEATURED_PORTFOLIO_CARDS,
  SELECTED_PROJECTS,
} from '../lib/constants';

/** Career Command archive / KM resumes shipped under public/resumes/. */
const DEFAULT_RESUME_A = '/resumes/resume-track-a-flagship-executive-ats.pdf';
const DEFAULT_RESUME_B = '/resumes/resume-track-b-executive-networking.pdf';

const RESUME_TRACK_META = [
  {
    id: 'A',
    title: 'Track A — Flagship Executive ATS (primary)',
    desc:
      'Career Command Working Master: information governance, knowledge systems, digital stewardship, records management, and AI enablement — ATS-ready.',
  },
  {
    id: 'B',
    title: 'Track B — Executive Networking (secondary)',
    desc:
      'Career Command Networking draft: same IG / stewardship story for warm intros — lighter packet than Track A.',
  },
];

function isExternalHref(href) {
  return Boolean(href && /^https?:\/\//i.test(href));
}

export default function Portfolio({ links, resumeA, resumeB }) {
  const featured = FEATURED_PORTFOLIO_CARDS.map((card) => {
    const href = links[card.linkKey] || '';
    return { ...card, href };
  });

  return (
    <Layout
      title="Portfolio"
      description="Latisha Vincent-Waters — information governance, digital stewardship, and knowledge systems. Career Command archive/KM resumes plus proof-of-work projects."
    >
      <div className="container">

        <div className="page-hero">
          <p className="page-hero__eyebrow">Portfolio</p>
          <h1>The work speaks.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Fifteen-plus years across knowledge systems, digital governance, records management, and AI enablement in
            nonprofit, education, and public service. Direction today: information stewardship and archival practice —
            with recovery-oriented pacing in how work is scoped and carried.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginTop: 'var(--space-lg)' }}>
            <a href={URLS.linkedin} className="btn btn--primary" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            <a href={resumeA} className="btn btn--outline" target="_blank" rel="noopener noreferrer" download>
              Download Flagship ATS
            </a>
            <a href={URLS.email} className="btn btn--ghost">Email Latisha</a>
          </div>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.portfolio} />

        <section className="section">
          <h2>Featured work.</h2>
          <div className="divider" />
          <p className="muted" style={{ marginBottom: 'var(--space-lg)', maxWidth: '62ch' }}>
            Print samples, statewide documentation IA, COVID-era
            digitization and taxonomy, and Midnight Magnolia as a live knowledge system.
          </p>
          <div className="grid-2" style={{ gap: 'var(--space-lg)' }}>
            {featured.map((card) => (
              <div className="card" key={card.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-md)', lineHeight: 1.35 }}>{card.title}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-md)', flex: 1 }}>{card.summary}</p>
                <p className="muted" style={{ fontSize: '0.78rem', marginBottom: 'var(--space-md)', lineHeight: 1.5 }}>
                  {card.skills}
                </p>
                {card.href ? (
                  isExternalHref(card.href) ? (
                    <a href={card.href} className="btn btn--outline" style={{ alignSelf: 'flex-start' }} target="_blank" rel="noopener noreferrer">
                      {card.cta}
                    </a>
                  ) : (
                    <Link href={card.href} className="btn btn--outline" style={{ alignSelf: 'flex-start' }}>
                      {card.cta}
                    </Link>
                  )
                ) : (
                  <p className="muted" style={{ fontSize: '0.8rem', margin: 0 }}>Case study link coming soon.</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Selected projects.</h2>
          <div className="divider" />
          <p className="muted" style={{ marginBottom: 'var(--space-lg)', maxWidth: '62ch' }}>
            Proof of work from the Career Command archive / knowledge-management resumes — publication
            design, digitization, statewide IA, AI enablement, and workflow systems.
          </p>
          <div className="grid-2" style={{ gap: 'var(--space-lg)' }}>
            {SELECTED_PROJECTS.map((project) => (
              <article className="card" key={project.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: 'var(--space-md)' }}>{project.title}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-md)', flex: 1 }}>{project.summary}</p>
                <p className="muted" style={{ fontSize: '0.78rem', marginBottom: 'var(--space-md)' }}>{project.skills}</p>
                {project.href?.startsWith('http') ? (
                  <a href={project.href} className="btn btn--outline" style={{ alignSelf: 'flex-start' }} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                ) : (
                  <Link href={project.href || '/portfolio'} className="btn btn--outline" style={{ alignSelf: 'flex-start' }}>
                    View details
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Impact at a glance.</h2>
          <div className="divider" />
          <div className="stat-grid">
            {CASE_STUDIES.map((c) => (
              <div className="stat-block" key={c.id}>
                <span className="stat-number">{c.metric}</span>
                <span className="stat-label">{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>Resume tracks.</h2>
          <div className="divider" />
          <p className="muted" style={{ marginBottom: 'var(--space-lg)', maxWidth: '58ch' }}>
            Archive / knowledge-management PDFs from Career Command.{' '}
            <strong>Track A</strong> is the Flagship Executive ATS Working Master.{' '}
            <strong>Track B</strong> is the Executive Networking draft.
          </p>
          <div className="grid-2">
            {RESUME_TRACK_META.map((track, index) => {
              const url = index === 0 ? resumeA : resumeB;
              return (
                <div className="card" key={track.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>Track {track.id}</span>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>{track.title}</h3>
                    <p className="muted" style={{ fontSize: '0.875rem' }}>{track.desc}</p>
                  </div>
                  <a
                    href={url}
                    className="btn btn--outline"
                    style={{ marginTop: 'var(--space-lg)', alignSelf: 'flex-start' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    Download PDF
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section">
          <h2>Impact detail.</h2>
          <div className="divider" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', marginTop: 'var(--space-lg)' }}>
            {CASE_STUDIES.map((study) => (
              <div className="card" key={study.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--space-xl)', alignItems: 'start' }}>
                <div style={{ textAlign: 'center', minWidth: '100px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-amber)', display: 'block', lineHeight: 1 }}>{study.metric}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)', letterSpacing: '0.05em' }}>{study.label}</span>
                </div>
                <div>
                  <p style={{ marginBottom: 'var(--space-md)' }}>{study.description}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {study.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section section--linen" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>Art gallery.</h2>
          <div className="divider" />
          <p className="muted" style={{ marginBottom: 'var(--space-lg)', maxWidth: '56ch' }}>
            Southern Gothic sacred artwork from the Magnolia Priestess and Riverwalk Lantern Path series.
          </p>
          <div className="art-strip">
            {BRAND_ASSETS.gallery.map((img) => (
              // eslint-disable-next-line @next/next/no-img-element
              <figure key={img.src} className="art-strip__frame">
                <img
                  src={img.src}
                  alt={img.alt}
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
            <Link href="/gallery" className="btn btn--outline">Open full gallery</Link>
          </div>
        </section>

        <section className="section section--dusk" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>Skills + tools.</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            {Object.entries(SKILLS).map(([category, items]) => (
              <div className="card" key={category} style={{ background: 'rgba(26,28,46,0.5)' }}>
                <h4 style={{ color: 'var(--color-burnt-rose)', marginBottom: 'var(--space-md)' }}>{category}</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {items.map((item) => (
                    <li key={item} style={{ fontSize: '0.875rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--color-eyebrow-on-dark)', fontSize: '0.6rem' }} aria-hidden>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Education + credentials.</h2>
          <div className="divider" />
          <div className="grid-2">
            {[
              {
                institution: 'Claflin University',
                credential: 'B.A. Mass Communications',
                note: 'Orangeburg, SC',
              },
              {
                institution: 'Trident Technical College',
                credential: 'A.A.S. Information Technology (in progress, exp. 2026)',
                note: 'Concurrent: Database Administrator Certification · GPA 3.58',
              },
              {
                institution: 'Open Society Foundations',
                credential: 'Soros Justice Fellow, 2022',
                note: 'Community justice and digital equity focus',
              },
              {
                institution: 'Google / Coursera',
                credential: 'Data Analytics Certificate, 2025',
                note: 'Workforce Development Scholarship Recipient',
              },
            ].map((cred) => (
              <div key={cred.institution} style={{ borderLeft: '2px solid var(--color-amber)', paddingLeft: 'var(--space-lg)', paddingTop: 'var(--space-sm)', paddingBottom: 'var(--space-sm)' }}>
                <h4 style={{ color: 'var(--color-magnolia)', marginBottom: '0.25rem', fontSize: '1rem', letterSpacing: 0 }}>{cred.credential}</h4>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{cred.institution}</p>
                <p className="muted" style={{ fontSize: '0.8rem' }}>{cred.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
          <h2>Interested in working together?</h2>
          <p className="muted" style={{ margin: 'var(--space-md) auto var(--space-lg)', maxWidth: '50ch' }}>
            Available for remote roles that honor preservation practice, clear documentation, and humane pacing. Consulting
            for workflow, archives-adjacent systems, and AI literacy stays open through Midnight Magnolia.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/services" className="btn btn--primary">Book a Strategy Session</Link>
            <a href={URLS.email} className="btn btn--outline">Send an Email</a>
          </div>
        </section>

      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const resumeA = process.env.RESUME_TRACK_A_URL?.trim() || DEFAULT_RESUME_A;
  const resumeB = process.env.RESUME_TRACK_B_URL?.trim() || DEFAULT_RESUME_B;
  const genealogy = process.env.NEXT_PUBLIC_PORTFOLIO_FEATURED_GENEALOGY_URL?.trim() || '';
  const statewide =
    process.env.NEXT_PUBLIC_PORTFOLIO_FEATURED_STATEWIDE_URL?.trim() || '/portfolio/statewide-documentation';
  const digitization =
    process.env.NEXT_PUBLIC_PORTFOLIO_FEATURED_DIGITIZATION_URL?.trim() || '/portfolio/records-digitization';

  return {
    props: {
      resumeA,
      resumeB,
      links: {
        print: '/publication-design',
        genealogy,
        statewide,
        digitization,
        mm: '/gallery',
      },
    },
    revalidate: 300,
  };
}
