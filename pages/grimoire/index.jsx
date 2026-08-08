import Layout from '../../components/Layout';
import {
  getGrimoirePosts,
  formatPostDate,
  jsonForProps,
} from '../../lib/wix';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { URLS } from '../../lib/constants';

const CATEGORIES = [
  'All',
  'Shadow Work',
  'Moon Phase',
  'Ancestral Healing',
  'ND Creator Guides',
  'Dusk Letters Archive',
];

const CATEGORY_CONTENT = {
  All: {
    anchor: 'Full Archive',
    description:
      'Browse everything in the Grimoire across shadow work, moon rhythm, ancestral healing, ND creator guides, and Dusk Letters.',
    prompts: [
      'What kind of support do you need most right now: grounding, release, structure, or reflection?',
      'Choose one post that matches your current capacity and focus on only one next step.',
      'What theme keeps returning in this season of your life?',
    ],
  },
  'Shadow Work': {
    anchor: 'Name It · Burn It · Examine It',
    description:
      'Emotional literacy, gentle release, and honest inventory. Start where language is soft and specific.',
    prompts: [
      'Name one feeling under the surface today. What sits underneath it?',
      'What story about your worth are you ready to release without shaming yourself?',
      'What pattern did you inherit that you are choosing to interrupt this month?',
    ],
  },
  'Moon Phase': {
    anchor: 'Tend It',
    description:
      'Seasonal and lunar rhythm practices for low-spoon planning, reflection, and restoration.',
    prompts: [
      'New moon: what is one intention small enough to keep?',
      'Full moon: what did you complete that deserves witness, not perfection?',
      'Waning moon: what can you set down to protect your energy this week?',
    ],
  },
  'Ancestral Healing': {
    anchor: 'Root It · Ancestral Ground',
    description:
      'Lineage-centered writing from Caswell County to the Lowcountry, with care for names, memory, and context.',
    prompts: [
      'Which ancestor name appears in your family line more than once? What might that repetition be carrying?',
      'Write one page about a place your people moved through and what survived there.',
      'What truth in your family history became clearer when you said it out loud?',
    ],
  },
  'ND Creator Guides': {
    anchor: 'Tend It',
    description:
      'Neurodivergent-friendly systems, anti-hustle pacing, and practical support for creative consistency.',
    prompts: [
      'Design one 20-minute task that still counts on a low-energy day.',
      'Where are you over-correcting instead of cultivating?',
      'What support structure would make your next step easier to repeat?',
    ],
  },
  'Dusk Letters Archive': {
    anchor: 'Root It',
    description:
      'Long-form reflections and archive letters that bridge healing, business, and community memory.',
    prompts: [
      'What are you becoming that your old schedule cannot hold?',
      'Write a letter to your future self about the pace you are choosing now.',
      'What does community medicine look like in your current season?',
    ],
  },
};

function normalize(s) {
  return String(s || '').toLowerCase();
}

function inferCategory(post) {
  const haystack = [
    post?.title,
    post?.excerpt,
    post?.plainContent,
    Array.isArray(post?.hashtags) ? post.hashtags.join(' ') : '',
    Array.isArray(post?.tags) ? post.tags.join(' ') : '',
    Array.isArray(post?.categoryIds) ? post.categoryIds.join(' ') : '',
  ]
    .filter(Boolean)
    .join(' ');
  const text = normalize(haystack);

  if (/(shadow|inner child|grief|healing prompt|journal prompt)/.test(text)) {
    return 'Shadow Work';
  }
  if (/(moon|new moon|full moon|lunar|eclipse)/.test(text)) {
    return 'Moon Phase';
  }
  if (/(ancestor|ancestral|lineage|vincent|vinson|caswell|lowcountry|gullah)/.test(text)) {
    return 'Ancestral Healing';
  }
  if (/(neurodivergent|adhd|autistic|executive function|quiet builder|soft business|systems)/.test(text)) {
    return 'ND Creator Guides';
  }
  return 'Dusk Letters Archive';
}

export async function getStaticProps() {
  const posts = await getGrimoirePosts(12);

  return {
    props: jsonForProps({ posts }),
    revalidate: 300,
  };
}

export default function Grimoire({ posts }) {
  const [gateOpen, setGateOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [email, setEmail] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const unlocked = window.localStorage.getItem('mm_grimoire_unlocked') === '1';
    setGateOpen(unlocked);
    setHasHydrated(true);
  }, []);

  const postsWithCategory = useMemo(
    () =>
      (posts || []).map((post) => ({
        ...post,
        mmCategory: inferCategory(post),
      })),
    [posts]
  );

  const visiblePosts = useMemo(() => {
    if (activeCategory === 'All') return postsWithCategory;
    return postsWithCategory.filter((p) => p.mmCategory === activeCategory);
  }, [activeCategory, postsWithCategory]);

  const unlockGrimoire = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('mm_grimoire_unlocked', '1');
      window.localStorage.setItem('mm_grimoire_email', email.trim());
    }
    setGateOpen(true);
  };

  return (
    <Layout title="The Grimoire" description="Writing from the Lowcountry. Shadow work, Southern Gothic stories, public domain Black literature, and a soft business school.">
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">The Grimoire</p>
          <h1>Writing from the Lowcountry.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Shadow work for the soul. Public domain Black literature recovered and remembered.
            A soft business school for people who refuse to hustle their way to wholeness.
          </p>
        </div>

        {!hasHydrated ? null : !gateOpen ? (
          <section className="section">
            <div className="card" style={{ maxWidth: 760, margin: '0 auto' }}>
              <h2 style={{ marginBottom: 'var(--space-sm)' }}>Enter the Grimoire</h2>
              <div className="divider" />
              <p className="muted" style={{ marginBottom: 'var(--space-lg)' }}>
                Full archive access is gated here while email capture is wired to your chosen platform.
                Start on{' '}
                <a href={URLS.bmac} target="_blank" rel="noopener noreferrer">Buy Me a Coffee</a>
                {' '}for Magnolia Circle, Gentle Beginning, kits, or a tip — then enter your email below to unlock reading on this device.
              </p>
              <form onSubmit={unlockGrimoire}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 'var(--space-md)' }}>
                  <span style={{ fontSize: '0.85rem' }}>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    style={{ padding: '0.7rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: 'inherit' }}
                  />
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn btn--primary">Unlock the Grimoire</button>
                  <a href={URLS.bmac} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
                    Open Buy Me a Coffee
                  </a>
                </div>
              </form>
              <p className="muted" style={{ fontSize: '0.8rem', marginTop: 'var(--space-md)' }}>
                This gate currently unlocks in-browser and stores access on this device.
              </p>
            </div>
          </section>
        ) : (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
            {Object.entries(CATEGORY_CONTENT).map(([name, content]) => (
              <article
                key={name}
                className="card"
                style={{
                  borderLeft:
                    activeCategory === name ? '3px solid var(--color-amber)' : '3px solid rgba(255,255,255,0.09)',
                }}
              >
                <p style={{ fontSize: '0.7rem', color: 'var(--color-eyebrow-on-dark)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  {content.anchor}
                </p>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>{name}</h3>
                <p className="muted" style={{ fontSize: '0.86rem', marginBottom: '0.7rem' }}>{content.description}</p>
                <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                  {content.prompts.map((prompt) => (
                    <li key={prompt} className="muted" style={{ fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                      {prompt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`btn ${activeCategory === cat ? 'btn--outline' : 'btn--ghost'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {visiblePosts.length > 0 ? (
            <div className="grid-2">
              {visiblePosts.map(post => (
                <Link href={`/grimoire/${post.slug}`} key={post._id} className="card-link">
                  <div className="card">
                    {post.coverMedia?.image && (
                      <div style={{ width: '100%', height: '180px', background: 'var(--color-ink)', borderRadius: 'var(--radius)', marginBottom: 'var(--space-md)', overflow: 'hidden' }}>
                        <img src={post.coverMedia.image.url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-eyebrow-on-dark)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      {formatPostDate(post.publishedDate)}
                    </p>
                    <h3 style={{ fontSize: '1.3rem' }}>{post.title}</h3>
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-eyebrow-on-dark)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.35rem' }}>
                      {post.mmCategory}
                    </p>
                    {post.excerpt && <p className="muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{post.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
              <h3>No posts in this category yet.</h3>
              <p className="muted" style={{ marginTop: 'var(--space-md)' }}>
                Switch categories or add matching posts in Wix Blog.
              </p>
            </div>
          )}
        </section>
        )}
      </div>
    </Layout>
  );
}