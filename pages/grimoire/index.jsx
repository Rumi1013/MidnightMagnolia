import Layout from '../../components/Layout';
import { getGrimoirePosts, formatPostDate } from '../../lib/wix';
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
  return { props: { posts }, revalidate: 300 }; // ISR: refresh every 5 min
}

export default function Grimoire({ posts }) {
  const [gateOpen, setGateOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const unlocked = window.localStorage.getItem('mm_grimoire_unlocked') === '1';
    setGateOpen(unlocked);
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

        {!gateOpen ? (
          <section className="section">
            <div className="card" style={{ maxWidth: 760, margin: '0 auto' }}>
              <h2 style={{ marginBottom: 'var(--space-sm)' }}>Enter the Grimoire</h2>
              <div className="divider" />
              <p className="muted" style={{ marginBottom: 'var(--space-lg)' }}>
                Join Dusk Letters for access to Shadow Work, Moon Phase, Ancestral Healing,
                ND Creator Guides, and archive entries.
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
                  <a href={URLS.stanStore} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
                    Get the Gentle Beginning
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