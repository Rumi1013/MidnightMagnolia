import Layout from '../../components/Layout';
import Link from 'next/link';
import { getGrimoirePosts, getPostBySlug, formatPostDate } from '../../lib/wix';
import { getSanityPostBySlug, getSanityPostSlugs } from '../../lib/sanity';
import { useEffect, useState } from 'react';
import { URLS } from '../../lib/constants';

function PortableText({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null;
  return (
    <div>
      {blocks.map((block, i) => {
        if (block._type !== 'block') return null;
        const Tag = block.style === 'h2' ? 'h2'
          : block.style === 'h3' ? 'h3'
          : block.style === 'blockquote' ? 'blockquote'
          : 'p';
        const text = block.children?.map((c) => c.text).join('') || '';
        return <Tag key={block._key || i} style={{ marginBottom: 'var(--space-md)' }}>{text}</Tag>;
      })}
    </div>
  );
}

export async function getStaticPaths() {
  const [sanitySlugList, wixPosts] = await Promise.all([
    getSanityPostSlugs(),
    getGrimoirePosts(50),
  ]);

  const paths = [
    ...sanitySlugList.map((slug) => ({ params: { slug } })),
    ...(wixPosts || []).filter((p) => p.slug && !sanitySlugList.includes(p.slug)).map((p) => ({ params: { slug: p.slug } })),
  ];

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const sanityPost = await getSanityPostBySlug(slug);
  if (sanityPost) {
    return {
      props: {
        post: {
          _id: sanityPost._id,
          title: sanityPost.title,
          publishedDate: sanityPost.publishedAt,
          coverMedia: sanityPost.coverImage ? { image: { url: sanityPost.coverImage } } : null,
          excerpt: null,
          body: sanityPost.body || null,
          richContent: null,
          _source: 'sanity',
        },
      },
      revalidate: 300,
    };
  }

  const post = await getPostBySlug(slug);
  if (!post) return { notFound: true };
  return { props: { post: { ...post, _source: 'wix' } }, revalidate: 300 };
}

export default function GrimoirePost({ post }) {
  const [gateOpen, setGateOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const title = post.title || 'Post';
  const excerpt = post.excerpt || '';
  const wixBody = post.richContent || post.content || '';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setGateOpen(window.localStorage.getItem('mm_grimoire_unlocked') === '1');
    setHasHydrated(true);
  }, []);

  return (
    <Layout title={title} description={excerpt}>
      <div className="container">
        {!hasHydrated ? null : !gateOpen ? (
          <section className="section">
            <div className="card" style={{ maxWidth: 760, margin: '0 auto' }}>
              <h2 style={{ marginBottom: 'var(--space-sm)' }}>Grimoire access required</h2>
              <div className="divider" />
              <p className="muted" style={{ marginBottom: 'var(--space-lg)' }}>
                Unlock the Grimoire from the main page to read this entry.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <Link href="/grimoire" className="btn btn--primary">Go to Grimoire gate</Link>
                <a href={URLS.stanStore} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
                  Get the Gentle Beginning
                </a>
              </div>
            </div>
          </section>
        ) : (
          <>
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
              <p className="hero__subtitle" style={{ marginBottom: 'var(--space-lg)' }}>{excerpt}</p>
            )}

            <article className="section" style={{ paddingTop: 0 }}>
              {post._source === 'sanity' && post.body ? (
                <PortableText blocks={post.body} />
              ) : wixBody ? (
                <div dangerouslySetInnerHTML={{ __html: typeof wixBody === 'string' ? wixBody : '' }} />
              ) : (
                <p className="muted">No content yet for this post.</p>
              )}
            </article>
          </>
        )}
      </div>
    </Layout>
  );
}
