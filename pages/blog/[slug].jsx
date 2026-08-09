import Link from 'next/link';
import Layout from '../../components/Layout';
import {
  getGrimoirePosts,
  getPostBySlug,
  formatPostDate,
  getBlogPostUrl,
  jsonForProps,
  rewriteWixUrl,
} from '../../lib/wix';

export async function getStaticPaths() {
  const posts = await getGrimoirePosts(50);
  const paths = (posts || [])
    .filter((p) => p.slug)
    .map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { notFound: true };

  const wixUrl = getBlogPostUrl(post);
  const externalWix =
    wixUrl && wixUrl.startsWith('http')
      ? wixUrl
      : rewriteWixUrl(`https://www.midnight-magnolia.com/post/${params.slug}`);

  return {
    props: jsonForProps({
      post: {
        title: post.title || 'Post',
        excerpt: post.excerpt || '',
        slug: post.slug || params.slug,
        publishedDate: post.firstPublishedDate || post.publishedDate || null,
        coverUrl: post.coverMedia?.image?.url || null,
        externalWix,
      },
    }),
    revalidate: 300,
  };
}

export default function BlogPost({ post }) {
  return (
    <Layout title={post.title} description={post.excerpt}>
      <div className="container" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="page-hero">
          <p className="page-hero__eyebrow">
            <Link href="/blog" style={{ color: 'inherit' }}>← Blog</Link>
          </p>
          <h1>{post.title}</h1>
          <div className="divider" />
          <p style={{ fontSize: '0.75rem', color: 'var(--color-eyebrow-on-dark)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {formatPostDate(post.publishedDate)}
          </p>
        </div>

        {post.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverUrl}
            alt=""
            style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-xl)' }}
          />
        ) : null}

        {post.excerpt ? (
          <p className="hero__subtitle" style={{ marginBottom: 'var(--space-lg)' }}>{post.excerpt}</p>
        ) : null}

        <div className="card" style={{ maxWidth: 720, margin: '0 auto' }}>
          <p className="muted" style={{ marginBottom: 'var(--space-lg)' }}>
            Full post bodies stay on Wix Blog (Headless lists metadata here). Open the published article for the complete letter —
            or enter The Grimoire for paced member reading.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            {post.externalWix ? (
              <a href={post.externalWix} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                Read full post on Wix
              </a>
            ) : null}
            <Link href="/grimoire" className="btn btn--outline">The Grimoire</Link>
            <Link href="/blog" className="btn btn--ghost">All posts</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
