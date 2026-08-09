import Link from 'next/link';
import Layout from '../../components/Layout';
import { URLS } from '../../lib/constants';
import {
  getGrimoirePosts,
  formatPostDate,
  getBlogPostUrl,
  jsonForProps,
} from '../../lib/wix';

export async function getStaticProps() {
  const posts = await getGrimoirePosts(24);
  const items = (posts || []).map((p) => ({
    id: p._id || p.slug,
    title: p.title || 'Untitled',
    excerpt: p.excerpt || '',
    slug: p.slug || '',
    publishedDate: p.firstPublishedDate || p.publishedDate || null,
    coverUrl: p.coverMedia?.image?.url || null,
    href: getBlogPostUrl(p) || (p.slug ? `/blog/${p.slug}` : null),
  }));
  return {
    props: jsonForProps({ posts: items }),
    revalidate: 300,
  };
}

export default function BlogIndex({ posts }) {
  return (
    <Layout
      title="Blog · Dusk Letters"
      description="Public writing from Midnight Magnolia — Dusk Letters and healing-centered posts via Wix Blog Headless."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Wix Blog</p>
          <h1>Dusk Letters &amp; public writing.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Ungated posts from the Wix Blog. Member pacing and deeper archive live in{' '}
            <Link href="/grimoire">The Grimoire</Link>.
          </p>
        </div>

        <section className="section" style={{ paddingBottom: 'var(--space-2xl)' }}>
          {!posts?.length ? (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
              <h3>Posts are syncing.</h3>
              <p className="muted" style={{ marginTop: 'var(--space-md)' }}>
                When Wix Blog credentials are live, published posts appear here automatically.
              </p>
              <a href={URLS.wixHome} className="btn btn--outline" style={{ marginTop: 'var(--space-md)' }} target="_blank" rel="noopener noreferrer">
                Open Wix sanctuary
              </a>
            </div>
          ) : (
            <div className="grid-2" style={{ gap: 'var(--space-lg)' }}>
              {posts.map((post) => (
                <article className="card" key={post.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  {post.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.coverUrl}
                      alt=""
                      style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, marginBottom: 'var(--space-md)' }}
                    />
                  ) : null}
                  <p className="muted" style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {formatPostDate(post.publishedDate)}
                  </p>
                  <h3 style={{ fontSize: '1.2rem', marginTop: '0.35rem' }}>{post.title}</h3>
                  {post.excerpt ? (
                    <p className="muted" style={{ fontSize: '0.9rem', marginTop: '0.75rem', flex: 1 }}>
                      {post.excerpt.length > 200 ? `${post.excerpt.slice(0, 200).trimEnd()}…` : post.excerpt}
                    </p>
                  ) : null}
                  {post.href ? (
                    post.href.startsWith('http') ? (
                      <a href={post.href} className="btn btn--outline" style={{ marginTop: 'var(--space-md)', alignSelf: 'flex-start' }} target="_blank" rel="noopener noreferrer">
                        Read on Wix
                      </a>
                    ) : (
                      <Link href={post.href} className="btn btn--outline" style={{ marginTop: 'var(--space-md)', alignSelf: 'flex-start' }}>
                        Read post
                      </Link>
                    )
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
