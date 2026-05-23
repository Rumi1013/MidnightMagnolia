import { createClient } from '@sanity/client';

function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  if (!projectId || projectId === 'your_sanity_project_id') return null;
  return createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: true });
}

export async function getSanityPosts(limit = 12) {
  try {
    const client = getSanityClient();
    if (!client) return [];
    const posts = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) [0...$limit] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        "coverImage": image.asset->url,
        body
      }`,
      { limit }
    );
    return posts || [];
  } catch (err) {
    console.error('Sanity fetch error:', err);
    return [];
  }
}

export async function getSanityPostBySlug(slug) {
  try {
    const client = getSanityClient();
    if (!client) return null;
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        "coverImage": image.asset->url,
        body
      }`,
      { slug }
    );
    return post || null;
  } catch (err) {
    console.error('Sanity single post error:', err);
    return null;
  }
}

export async function getSanityPostSlugs() {
  try {
    const client = getSanityClient();
    if (!client) return [];
    const slugs = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`);
    return (slugs || []).map((s) => s.slug).filter(Boolean);
  } catch (err) {
    console.error('Sanity slug list error:', err);
    return [];
  }
}
