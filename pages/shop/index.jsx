import Link from 'next/link';
import Layout from '../../components/Layout';
import PageIllustration from '../../components/PageIllustration';
import { PAGE_ILLUSTRATIONS } from '../../lib/brandAssets';
import { PRODUCTS, URLS } from '../../lib/constants';

const FEATURED_PRODUCT_IDS = [
  'gentle-beginning',
  'shadow-work-starter',
  'ancestral-healing',
  'creative-foundations',
  'deep-roots',
  'magnolia-circle',
];

const PRODUCT_DETAILS = {
  'gentle-beginning': {
    eyebrow: 'Start free',
    summary:
      'Five shadow work prompts, a welcome letter, gentle framing, and breathing cues for the part of you that is ready to look without being rushed.',
    includes: ['5 guided prompts', 'Founder welcome letter', 'Breathing cues', 'Instant free download'],
    cta: 'Get It Now',
  },
  'shadow-work-starter': {
    eyebrow: '30-day journal',
    summary:
      'A guided journal for quiet, honest healing on your own terms. Built in three arcs: The Foundation, The Pattern, and The Return.',
    includes: ['30 prompts', '3 themed sections', 'Non-linear use note', 'Closing reflection'],
    cta: 'Notify Me When Live',
  },
  'ancestral-healing': {
    eyebrow: 'Lineage work',
    summary:
      'A journal rooted in the African diaspora, the American South, oral storytelling, family memory, and the careful work of naming what was passed down.',
    includes: ['40 lineage prompts', 'Lowcountry framing', 'Diaspora-centered reflection', 'Space to write and return'],
    cta: 'Notify Me When Live',
  },
  'creative-foundations': {
    eyebrow: 'Creator systems',
    summary:
      'A workbook for neurodivergent creators who need structure that works with their brain instead of asking them to perform productivity.',
    includes: ['Creative energy mapping', 'Project planning tools', 'Weekly rhythm template', 'Values and boundaries prompts'],
    cta: 'Notify Me When Live',
  },
  'deep-roots': {
    eyebrow: 'Flagship system',
    summary:
      'The complete shadow work curriculum: excavation, inheritance, reckoning, reclamation, and return, paced for deep work without force.',
    includes: ['5-module curriculum', '150 deep-dive prompts', 'Ritual transition guide', 'Neurodivergent-friendly pacing'],
    cta: 'Notify Me When Live',
  },
  'magnolia-circle': {
    eyebrow: 'Membership',
    summary:
      'A monthly home for prompts, ritual practice, the member edition of Dusk Letters, and community for quiet builders.',
    includes: ['Monthly prompts', 'Ritual practice', 'Dusk Letters member edition', 'Quiet community rhythm'],
    cta: 'Notify Me When Live',
  },
};

const LAUNCH_STEPS = [
  {
    title: 'Begin gently',
    text: 'Download The Gentle Beginning and test the tone of the work without pressure.',
  },
  {
    title: 'Choose your next doorway',
    text: 'Move into shadow work, ancestral healing, creative systems, or the membership depending on what is asking for care.',
  },
  {
    title: 'Build a rhythm',
    text: 'Use the tools slowly, return as needed, and pair them with consulting or career support when structure would help.',
  },
];

export default function Shop() {
  const products = FEATURED_PRODUCT_IDS.map((id) => {
    const product = PRODUCTS.find((item) => item.id === id);
    return product ? { ...product, ...PRODUCT_DETAILS[id] } : null;
  }).filter(Boolean);

  return (
    <Layout
      title="The Shop"
      description="Digital tools for quiet builders — shadow work journals, healing resources, and ancestral practice guides. Products launching soon."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">The Shop</p>
          <h1>Healing tools for quiet builders.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Shadow work journals, ancestral practice guides, creative systems, and membership support are being gathered into one clear Wix launch home. Start with the free guide, then follow the storefront as each paid tool goes live.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginTop: 'var(--space-lg)' }}>
            <a href={URLS.wixHome} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
              Open Wix Launch
            </a>
            <a href={URLS.gumroad} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
              View Gumroad Products
            </a>
            <Link href="/work-with-me" className="btn btn--outline">
              Pair With Support
            </Link>
          </div>
        </div>

        <PageIllustration illustration={PAGE_ILLUSTRATIONS.shop} />

        <section className="section section--dusk" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <div className="flex-between" style={{ alignItems: 'end', marginBottom: 'var(--space-lg)' }}>
            <div>
              <p className="page-hero__eyebrow">Launch ecosystem</p>
              <h2>Begin anywhere. Return often.</h2>
              <div className="divider" />
            </div>
            <a href={URLS.wixHome} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
              Visit the Storefront
            </a>
          </div>
          <div className="grid-3">
            {LAUNCH_STEPS.map((step, index) => (
              <div className="card" key={step.title}>
                <span className="tag" style={{ marginBottom: 'var(--space-md)' }}>Step {index + 1}</span>
                <h3>{step.title}</h3>
                <p className="muted" style={{ fontSize: '0.9rem' }}>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="flex-between" style={{ marginBottom: 'var(--space-lg)' }}>
            <div>
              <p className="page-hero__eyebrow">Digital products</p>
              <h2>The current catalog.</h2>
              <div className="divider" />
              <p className="muted" style={{ maxWidth: '56ch' }}>
                The launch is anchored on Wix, with digital downloads and product notices mirrored through Gumroad. The free starter stays available as the first doorway while the rest of the catalog comes online.
              </p>
            </div>
          </div>

          <div className="grid-3">
            {products.map((product) => (
              <article className="card" key={product.id} style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-md)', alignItems: 'start' }}>
                  <span className="tag">{product.eyebrow}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--color-amber)', lineHeight: 1 }}>
                    {product.price}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginTop: 'var(--space-md)' }}>{product.title}</h3>
                <p className="muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem', flex: 1 }}>
                  {product.summary}
                </p>
                <ul style={{ display: 'grid', gap: '0.35rem', marginTop: 'var(--space-md)' }}>
                  {product.includes.map((item) => (
                    <li key={item} className="muted" style={{ fontSize: '0.8rem', display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--color-eyebrow-on-dark)' }} aria-hidden>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={product.id === 'magnolia-circle' ? URLS.wixHome : URLS.gumroad}
                  className={product.id === 'gentle-beginning' ? 'btn btn--primary' : 'btn btn--outline'}
                  style={{ marginTop: 'var(--space-lg)', alignSelf: 'flex-start' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {product.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--linen" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <p className="page-hero__eyebrow" style={{ color: 'var(--color-link-on-light)' }}>Need structure with the tools?</p>
          <h2>Pair the catalog with systems support.</h2>
          <div className="divider" />
          <p className="muted" style={{ maxWidth: '58ch' }}>
            The shop holds the self-paced tools. Work With Me is where the same approach becomes consulting, AI literacy workshops, career documents, and quiet systems for real life.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginTop: 'var(--space-lg)' }}>
            <Link href="/work-with-me" className="btn btn--outline">
              See Services
            </Link>
            <a href={URLS.email} className="btn btn--primary">
              Ask a Question
            </a>
          </div>
        </section>

        <div
          className="section"
          style={{
            paddingTop: 0,
            paddingBottom: 'var(--space-2xl)',
            fontSize: '0.8rem',
            color: 'var(--color-muted)',
          }}
        >
          Checkout, booking, and launch updates are hosted through the Wix launch.
          Questions? <a href={URLS.email}>bgconscious@gmail.com</a>
        </div>
      </div>
    </Layout>
  );
}
