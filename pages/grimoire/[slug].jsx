import Layout from '../../components/Layout';
import Link from 'next/link';
import { getGrimoirePosts, getPostBySlug, formatPostDate } from '../../lib/wix';

export async function getStaticPaths() {
  const posts = await getGrimoirePosts(50);
  const paths = (posts || [])
    .filter((p) => p.slug)
    .map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { notFound: true };
  }
  return { props: { post }, revalidate: 300 };
}

export default function GrimoirePost({ post }) {
  const title = post.title || 'Post';
  const excerpt = post.excerpt || '';
  const body = post.richContent || post.content || '';

  return (
    <Layout title={title} description={excerpt}>
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">
            <Link href="/grimoire" style={{ color: 'inherit' }}>
              ← The Grimoire
            </Link>
          </p>
          <h1>{title}</h1>
          <div className="divider" />
          <p style={{ fontSize: '0.75rem', color: 'var(--color-eyebrow-on-dark)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {formatPostDate(post.publishedDate)}
          </p>
        </div>

        {post.coverMedia?.image?.url && (
          <div style={{ marginBottom: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', maxHeight: '420px' }}>
            <img src={post.coverMedia.image.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {excerpt && (
          <p className="hero__subtitle" style={{ marginBottom: 'var(--space-lg)' }}>
            {excerpt}
          </p>
        )}

        {body ? (
          <article
            className="section"
            style={{ paddingTop: 0 }}
            dangerouslySetInnerHTML={{ __html: typeof body === 'string' ? body : '' }}
          />
        ) : (
          <p className="muted">No body content returned for this post yet.</p>
        )}
      </div>
    </Layout>
  );
}
