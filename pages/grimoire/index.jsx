import Layout from '../../components/Layout';
import { getGrimoirePosts, formatPostDate } from '../../lib/wix';
import Link from 'next/link';

const CATEGORIES = ['All', 'Shadow Work', 'Southern Gothic', 'Soft Business School', 'Literary Archive', 'Healing Resources'];

export async function getStaticProps() {
  const posts = await getGrimoirePosts(12);
  return { props: { posts }, revalidate: 300 }; // ISR: refresh every 5 min
}

export default function Grimoire({ posts }) {
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

        {/* Category filter — visual only; filter logic added once Wix Blog is live */}
        <section className="section" style={{ paddingBottom: 0 }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`btn ${i === 0 ? 'btn--outline' : 'btn--ghost'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {posts.length > 0 ? (
            <div className="grid-2">
              {posts.map(post => (
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
                    {post.excerpt && <p className="muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{post.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
              <h3>The Grimoire is being filled.</h3>
              <p className="muted" style={{ marginTop: 'var(--space-md)' }}>
                Connect your Wix Blog in the dashboard and posts will appear here automatically.
              </p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}