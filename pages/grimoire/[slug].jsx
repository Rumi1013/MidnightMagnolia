import Layout from '../../components/Layout';
import Link from 'next/link';
import { getGrimoirePosts, getPostBySlug, formatPostDate, jsonForProps } from '../../lib/wix';
import { useEffect, useState } from 'react';
import { URLS, gumroadProductUrl } from '../../lib/constants';

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
  const previewPost = {
    title: post.title || 'Post',
    excerpt: post.excerpt || '',
    slug: post.slug || params.slug,
    publishedDate: post.publishedDate || null,
    coverMedia: post.coverMedia || null,
  };
  return { props: jsonForProps({ post: previewPost }), revalidate: 300 };
}

export default function GrimoirePost({ post }) {
  const [gateOpen, setGateOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const title = post.title || 'Post';
  const excerpt = post.excerpt || '';

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
              <h2 style={{ marginBottom: 'var(--space-sm)' }}>Enter the Grimoire</h2>
              <div className="divider" />
              <p className="muted" style={{ marginBottom: 'var(--space-lg)' }}>
                This letter is held in the Grimoire. Enter from the main page to read it.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <Link href="/grimoire" className="btn btn--primary">Enter the Grimoire</Link>
                <a href={gumroadProductUrl('gentle-beginning')} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
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
          <p className="hero__subtitle" style={{ marginBottom: 'var(--space-lg)' }}>
            {excerpt}
          </p>
        )}

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="card" style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ marginBottom: 'var(--space-sm)' }}>Continue in the archive</h2>
            <div className="divider" />
            <p className="muted" style={{ marginBottom: 'var(--space-lg)' }}>
              More letters live in the Grimoire. Journals and kits live in the shop.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <Link href="/grimoire" className="btn btn--primary">Back to the Grimoire</Link>
              <a href={URLS.gumroad} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
                Browse the Shop
              </a>
            </div>
          </div>
        </section>
        </>
        )}
      </div>
    </Layout>
  );
}
