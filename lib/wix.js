import { createClient, OAuthStrategy, ApiKeyStrategy, media } from '@wix/sdk';
import { posts, draftPosts } from '@wix/blog';
import { products, collections } from '@wix/stores';
import { services, availabilityTimeSlots, bookings } from '@wix/bookings';
import { wixEventsV2 } from '@wix/events';
import { items } from '@wix/data';

// Auth precedence:
//   1. WIX_API_KEY + WIX_SITE_ID  → server-side, elevated scopes (admin reads)
//   2. WIX_CLIENT_ID + server-only tokens → OAuth with stored visitor/member tokens
//   3. WIX_CLIENT_ID alone        → public/anonymous read-only (catalog, CMS)
function getWixAuth() {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  if (
    apiKey &&
    siteId &&
    apiKey !== 'your_wix_api_key_here' &&
    siteId !== 'your_wix_site_id_here'
  ) {
    return ApiKeyStrategy({ apiKey, siteId });
  }

  const clientId = process.env.WIX_CLIENT_ID || process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
  if (!clientId || clientId === 'your_wix_client_id_here') {
    return null;
  }

  const accessToken =
    process.env.WIX_ACCESS_TOKEN ||
    process.env.WIX_TOKEN;
  const refreshToken = process.env.WIX_REFRESH_TOKEN;

  if (accessToken && refreshToken) {
    return OAuthStrategy({
      clientId,
      tokens: {
        accessToken: { value: accessToken, expiresAt: 0 },
        refreshToken: { value: refreshToken },
      },
    });
  }

  return OAuthStrategy({ clientId });
}

/** Headless Wix client (blog, stores, bookings, events, CMS). */
function getWixClient() {
  const auth = getWixAuth();
  if (!auth) {
    return null;
  }
  return createClient({
    modules: {
      posts,
      draftPosts,
      products,
      collections,
      services,
      availabilityTimeSlots,
      bookings,
      wixEventsV2,
      items,
    },
    auth,
  });
}

function logWixError(label, err) {
  const cause = err?.cause;
  const details = {
    message: err?.message || 'Wix request failed',
    code: err?.code,
    status: err?.status,
    cause: cause?.code || cause?.message,
    hostname: cause?.hostname,
  };
  console.error(label, details);
}

// ── Blog: fetch all Grimoire posts ───────────────────────────
export async function getGrimoirePosts(limit = 12) {
  try {
    const client = getWixClient();
    if (!client) return [];
    const res = await client.posts.queryPosts()
      .limit(limit)
      .find();
    return res.items || [];
  } catch (err) {
    logWixError('Wix Blog fetch error:', err);
    return [];
  }
}

// ── Blog: fetch single post by slug ──────────────────────────
export async function getPostBySlug(slug) {
  try {
    const client = getWixClient();
    if (!client) return null;
    const res = await client.posts.queryPosts()
      .eq('slug', slug)
      .limit(1)
      .find();
    return res.items[0] || null;
  } catch (err) {
    logWixError('Wix Blog single post error:', err);
    return null;
  }
}

/**
 * Blog drafts (Wix Blog v3). Requires **WIX_API_KEY + WIX_SITE_ID** (or OAuth with
 * equivalent scopes). Anonymous OAuth cannot list drafts; callers get `[]`.
 */
export async function getWixBlogDraftPosts(limit = 50) {
  try {
    const client = getWixClient();
    if (!client?.draftPosts) return [];
    const cap = Math.min(Math.max(Number(limit) || 50, 1), 100);
    const res = await client.draftPosts.listDraftPosts({
      paging: { limit: cap, offset: 0 },
    });
    return res.draftPosts || [];
  } catch (err) {
    logWixError('Wix Blog draft posts error:', err);
    return [];
  }
}

/** Serialize Wix/API objects for `getStaticProps` (Wix SDK may use Date instances). */
export function jsonForProps(value) {
  return JSON.parse(JSON.stringify(value));
}

// ── Shop: fetch all products ─────────────────────────────────
export async function getShopProducts() {
  try {
    const client = getWixClient();
    if (!client) return [];
    const res = await client.products.queryProducts()
      .limit(20)
      .find();
    return res.items || [];
  } catch (err) {
    logWixError('Wix Store fetch error:', err);
    return [];
  }
}

// ── Bookings: list bookable services ──────────────────────────
export async function getBookingServices(limit = 50) {
  try {
    const client = getWixClient();
    if (!client) return [];
    const res = await client.services.queryServices().limit(limit).find();
    return res.items || [];
  } catch (err) {
    logWixError('Wix Bookings services error:', err);
    return [];
  }
}

/** Resolve a service by mainSlug.name (e.g. creative-direction-session). */
export async function getBookingServiceBySlug(slug) {
  if (!slug) return null;
  const all = await getBookingServices(50);
  return (
    (all || []).find(
      (s) => s?.mainSlug?.name === slug || s?.supportedSlugs?.some((x) => x?.name === slug),
    ) || null
  );
}

/**
 * Bookable time slots for a service (Time Slots V2).
 * Includes staff resources when the service has a primaryResourceType.
 */
export async function listServiceAvailabilitySlots(service, { days = 14 } = {}) {
  try {
    const client = getWixClient();
    if (!client || !service?._id) return [];

    const from = new Date();
    const to = new Date(from);
    to.setDate(to.getDate() + days);

    const params = {
      serviceId: service._id,
      fromLocalDate: from.toISOString().slice(0, 19),
      toLocalDate: to.toISOString().slice(0, 19),
      bookable: true,
      timeZone: 'America/New_York',
    };
    if (service.primaryResourceType) {
      params.includeResourceTypeIds = [service.primaryResourceType];
    }

    const res = await client.availabilityTimeSlots.listAvailabilityTimeSlots(params);
    return res.timeSlots || [];
  } catch (err) {
    logWixError('Wix Bookings availability error:', err);
    return [];
  }
}

/**
 * Create + confirm an appointment booking (API key / elevated client).
 * Prefer for NO_FEE or in-person payment; online paid checkout needs Headless OAuth redirects.
 */
export async function createConfirmedAppointmentBooking({
  service,
  slot,
  contact,
}) {
  const client = getWixClient();
  if (!client) throw new Error('Wix client is not configured');
  if (!service?._id || !slot?.localStartDate || !slot?.localEndDate || !slot?.scheduleId) {
    throw new Error('Missing service or slot details');
  }
  if (!contact?.email || !contact?.firstName) {
    throw new Error('Name and email are required');
  }

  const resourceFromSlot =
    slot.availableResources?.[0]?.resources?.[0]?.id ||
    slot.availableResources?.[0]?.resources?.[0]?._id ||
    null;
  const resourceId = resourceFromSlot || service.staffMemberIds?.[0] || null;
  if (!resourceId) throw new Error('No staff resource available for this slot');

  const locationType =
    slot.location?.locationType === 'BUSINESS'
      ? 'OWNER_BUSINESS'
      : slot.location?.locationType === 'CUSTOM'
        ? 'OWNER_CUSTOM'
        : 'OWNER_BUSINESS';

  const created = await client.bookings.createBooking({
    bookedEntity: {
      slot: {
        serviceId: service._id,
        scheduleId: slot.scheduleId,
        startDate: slot.localStartDate,
        endDate: slot.localEndDate,
        timezone: 'America/New_York',
        resource: { id: resourceId },
        location: { locationType },
      },
    },
    contactDetails: {
      firstName: contact.firstName,
      lastName: contact.lastName || '',
      email: contact.email,
      ...(contact.phone ? { phone: contact.phone } : {}),
    },
    totalParticipants: 1,
  });

  const booking = created?.booking || created;
  const bookingId = booking?._id || booking?.id;
  const revision = booking?.revision;
  if (!bookingId || revision == null) {
    throw new Error('Booking created but missing id/revision for confirm');
  }

  const paymentStatus =
    service?.payment?.rateType === 'NO_FEE' ? 'EXEMPT' : 'NOT_PAID';

  await client.bookings.confirmBooking(bookingId, revision, {
    paymentStatus,
  });

  return { bookingId, paymentStatus };
}

// ── Events: list published events (Wix Events v2) ─────────────
export async function getWixEvents(limit = 10) {
  try {
    const client = getWixClient();
    if (!client) return [];
    const res = await client.wixEventsV2.queryEvents().limit(limit).find();
    return res.items || [];
  } catch (err) {
    logWixError('Wix Events query error:', err);
    return [];
  }
}

// ── CMS: query a Wix Data collection by ID or name ────────────
export async function getDataCollectionItems(collectionId, limit = 50) {
  if (!collectionId) return [];
  try {
    const client = getWixClient();
    if (!client) return [];
    const res = await client.items.query(collectionId).limit(limit).find();
    return res.items || [];
  } catch (err) {
    logWixError('Wix Data items error:', err);
    return [];
  }
}

// ── Format Wix post date ─────────────────────────────────────
export function formatPostDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ── URL helpers ──────────────────────────────────────────────
// Rewrites the host of an absolute Wix URL to NEXT_PUBLIC_WIX_STOREFRONT_URL
// if set (useful when the Next.js app takes over the primary domain and
// Wix moves to a subdomain like wix.midnight-magnolia.com). Otherwise the
// embedded URL is returned untouched.
export function rewriteWixUrl(absoluteUrl) {
  if (!absoluteUrl) return null;
  const storefront = process.env.NEXT_PUBLIC_WIX_STOREFRONT_URL?.replace(/\/$/, '');
  if (!storefront) return absoluteUrl;
  try {
    const url = new URL(absoluteUrl);
    return `${storefront}${url.pathname}${url.search}${url.hash}`;
  } catch {
    return absoluteUrl;
  }
}

/** Hosts served by this Next app — classic Wix `/product-page/*` 404s here after DNS cutover. */
function nextFrontDoorHosts() {
  const hosts = new Set(['www.midnight-magnolia.com', 'midnight-magnolia.com']);
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (site) {
    try {
      hosts.add(new URL(site).hostname);
    } catch {
      /* ignore invalid SITE_URL */
    }
  }
  return hosts;
}

/**
 * True when a Wix catalog URL would hit the Next front door (www) instead of
 * a Wix-hosted storefront subdomain. Those paths 404 on Vercel.
 */
export function isDeadWixStorefrontUrl(absoluteUrl) {
  if (!absoluteUrl) return true;
  try {
    const url = new URL(absoluteUrl);
    if (!nextFrontDoorHosts().has(url.hostname)) return false;
    return (
      url.pathname.startsWith('/product-page/') ||
      url.pathname.startsWith('/booking-calendar/') ||
      url.pathname.startsWith('/post/')
    );
  } catch {
    return true;
  }
}

export function getProductPageUrl(product) {
  const base = product?.productPageUrl?.base || '';
  const path = product?.productPageUrl?.path || '';
  if (!base && !path) return null;
  const joined = `${base.replace(/\/$/, '')}${path}`;
  const rewritten = rewriteWixUrl(joined);
  if (!rewritten || isDeadWixStorefrontUrl(rewritten)) return null;
  return rewritten;
}

/**
 * In-app booking calendar after DNS cutover (classic /booking-calendar/* on www 404s on Vercel).
 * Falls back to rewritten Wix URL only when no slug is available.
 */
export function getServiceBookingUrl(service) {
  const slug = service?.mainSlug?.name;
  if (slug) return `/booking-calendar/${slug}`;
  const url = service?.urls?.bookingPage || service?.urls?.servicePage || null;
  return rewriteWixUrl(url);
}

/** Public Wix Blog post URL when Headless returns one; else in-app /blog/[slug]. */
export function getBlogPostUrl(post) {
  let external = post?.url || null;
  if (!external && post?.postPageUrl?.base) {
    external = `${String(post.postPageUrl.base).replace(/\/$/, '')}${post.postPageUrl.path || ''}`;
  }
  if (external) return rewriteWixUrl(external);
  if (post?.slug) return `/blog/${post.slug}`;
  return null;
}

// ── Image helpers ────────────────────────────────────────────
// Wix returns two image shapes:
//   - Stores products: { url, width, height } (direct CDN URL)
//   - Bookings services: "wix:image://v1/..." URI requiring media helper
//   - CMS items: plain string URL (depends on collection schema)
export function getProductImageUrl(product) {
  return product?.media?.mainMedia?.image?.url || null;
}

export function getServiceImageUrl(service) {
  const raw = service?.media?.mainMedia?.image;
  if (!raw) return null;
  if (typeof raw === 'string' && raw.startsWith('wix:image://')) {
    try {
      return media.getImageUrl(raw)?.url || null;
    } catch {
      return null;
    }
  }
  if (typeof raw === 'object' && raw.url) return raw.url;
  return null;
}

// ── Service / product formatting ─────────────────────────────
export function formatProductPrice(product) {
  return (
    product?.price?.formatted?.discountedPrice ||
    product?.price?.formatted?.price ||
    product?.priceData?.formatted?.price ||
    null
  );
}

export function formatServicePrice(service) {
  const fixed = service?.payment?.fixed?.price;
  if (fixed?.value) {
    const currency = fixed.currency || 'USD';
    const symbol = currency === 'USD' ? '$' : `${currency} `;
    return `${symbol}${fixed.value}`;
  }
  if (service?.payment?.rateLabel) return service.payment.rateLabel;
  return null;
}

export function getServiceDurationMinutes(service) {
  const minutes =
    service?.schedule?.availabilityConstraints?.sessionDurations?.[0] ??
    service?.schedule?.availabilityConstraints?.durations?.[0]?.minutes;
  return Number.isFinite(minutes) ? minutes : null;
}

export function formatServiceDuration(service) {
  const minutes = getServiceDurationMinutes(service);
  if (!minutes) return null;
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  if (Number.isInteger(hours)) return `${hours} hr`;
  return `${Math.floor(minutes / 60)} hr ${minutes % 60} min`;
}

// ── Strip HTML for plain-text descriptions ───────────────────
export function stripHtml(html, maxChars = 280) {
  if (!html) return '';
  const text = String(html)
    .replace(/<br\s*\/?>(\s*)/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars).trimEnd()}…`;
}
