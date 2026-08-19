/**
 * Static artwork under /public/brand.
 * Source folders on disk (for swapping files):
 * - …/organized_artwork/magnolia_priestess
 * - …/organized_artwork/riverwalk_lantern_path
 *
 * Magnolia bloom PNGs are synced from Cursor workspace:
 * …/MidnightMagnolia_Evaluation/assets (copy into /public/brand/illustrations).
 */
export const BRAND_ASSETS = {
  logo: '/brand/logo-circular.jpg',
  /** Full-bleed hero (from magnolia_priestess set). */
  hero: '/brand/hero-magnolia-priestess.jpg',
  /** Home gallery: magnolia library PNGs + riverwalk lantern path (mixed mediums). */
  gallery: [
    {
      src: '/brand/illustrations/magnolia-bloom-141.png',
      alt: 'Magnolia bloom — digital illustration, priestess library',
      series: 'Magnolia priestess',
      medium: 'Digital illustration',
      objectPosition: '42% 48%',
    },
    {
      src: '/brand/illustrations/magnolia-bloom-154.png',
      alt: 'Magnolia bloom — digital illustration, priestess library',
      series: 'Magnolia priestess',
      medium: 'Digital illustration',
      objectPosition: '46% 45%',
    },
    {
      src: '/brand/gallery-riverwalk-nyamedua-illustration.png',
      alt: 'Nyamedua — mixed media illustration, riverwalk lantern path',
      series: 'Riverwalk lantern path',
      medium: 'Illustration',
      objectPosition: '36% 50%',
    },
    {
      src: '/brand/gallery-riverwalk-2.png',
      alt: 'Dream art — digital painting, riverwalk lantern path',
      series: 'Riverwalk lantern path',
      medium: 'Digital painting',
      objectPosition: '30% 48%',
    },
  ],
};

/** Hero-adjacent spotlight: one bold piece + copy (body paragraphs live on the home page). */
export const HOME_SPOTLIGHT = {
  src: '/brand/illustrations/magnolia-bloom-263.png',
  alt: 'Magnolia bloom — dramatic digital illustration from the Midnight Magnolia library',
  objectPosition: '42% 48%',
  eyebrow: 'Visual language',
  title: 'Build from artwork that holds you.',
};

/** One illustration per “door” on the home page (order matches Three ways in). */
export const HOME_DOOR_ART = [
  {
    href: '/work-with-me',
    src: '/brand/illustrations/magnolia-bloom-128.png',
    alt: 'Magnolia bloom illustration — services and consulting',
    objectPosition: '48% 45%',
  },
  {
    href: '/shop',
    src: '/brand/illustrations/magnolia-bloom-146.png',
    alt: 'Magnolia bloom illustration — digital shop',
    objectPosition: '44% 48%',
  },
  {
    href: '/grimoire',
    src: '/brand/illustrations/magnolia-bloom-100.png',
    alt: 'Magnolia bloom illustration — writing and the Grimoire',
    objectPosition: '46% 42%',
  },
];

/** Split CTA band at bottom of home: art + quote + actions */
export const HOME_CTA_ART = {
  src: '/brand/illustrations/magnolia-bloom-142.png',
  alt: 'Magnolia bloom illustration — invitation to book or browse',
  objectPosition: '40% 50%',
};

/** All magnolia bloom PNGs in /brand/illustrations — swap or reference in PAGE_ILLUSTRATIONS */
export const ILLUSTRATION_POOL = [
  '/brand/illustrations/magnolia-bloom-048.png',
  '/brand/illustrations/magnolia-bloom-055.png',
  '/brand/illustrations/magnolia-bloom-059.png',
  '/brand/illustrations/magnolia-bloom-060.png',
  '/brand/illustrations/magnolia-bloom-067.png',
  '/brand/illustrations/magnolia-bloom-078.png',
  '/brand/illustrations/magnolia-bloom-080.png',
  '/brand/illustrations/magnolia-bloom-081.png',
  '/brand/illustrations/magnolia-bloom-082.png',
  '/brand/illustrations/magnolia-bloom-083.png',
  '/brand/illustrations/magnolia-bloom-084.png',
  '/brand/illustrations/magnolia-bloom-085.png',
  '/brand/illustrations/magnolia-bloom-088.png',
  '/brand/illustrations/magnolia-bloom-089.png',
  '/brand/illustrations/magnolia-bloom-096.png',
  '/brand/illustrations/magnolia-bloom-098.png',
  '/brand/illustrations/magnolia-bloom-099.png',
  '/brand/illustrations/magnolia-bloom-100.png',
  '/brand/illustrations/magnolia-bloom-103.png',
  '/brand/illustrations/magnolia-bloom-128.png',
  '/brand/illustrations/magnolia-bloom-141.png',
  '/brand/illustrations/magnolia-bloom-142.png',
  '/brand/illustrations/magnolia-bloom-143.png',
  '/brand/illustrations/magnolia-bloom-144.png',
  '/brand/illustrations/magnolia-bloom-146.png',
  '/brand/illustrations/magnolia-bloom-150.png',
  '/brand/illustrations/magnolia-bloom-152.png',
  '/brand/illustrations/magnolia-bloom-154.png',
  '/brand/illustrations/magnolia-bloom-156.png',
  '/brand/illustrations/magnolia-bloom-158.png',
  '/brand/illustrations/magnolia-bloom-159.png',
  '/brand/illustrations/magnolia-bloom-162.png',
  '/brand/illustrations/magnolia-bloom-163.png',
  '/brand/illustrations/magnolia-bloom-167.png',
  '/brand/illustrations/magnolia-bloom-263.png',
];

/**
 * Product hero illustrations — keyed by exact Wix product name.
 * Use these to render heroes on the Next.js shop, OR upload to Wix so the
 * Wix-hosted product page surfaces them through the Stores API.
 *
 * Wix product names (case-sensitive) are the keys for direct lookup.
 */
export const PRODUCT_HERO_ART = {
  'The Gentle Beginning — Free Shadow Work Starter': {
    src: '/brand/illustrations/magnolia-bloom-048.png',
    alt: 'Magnolia bloom at first light — a gentle invitation into shadow work',
    objectPosition: '46% 50%',
    palette: 'dawn',
  },
  'Shadow Work Starter Kit': {
    src: '/brand/illustrations/magnolia-bloom-067.png',
    alt: 'Magnolia bloom in moonlit reflection — beginning the shadow work',
    objectPosition: '44% 48%',
    palette: 'twilight',
  },
  'Ancestral Healing Journal': {
    src: '/brand/illustrations/magnolia-bloom-089.png',
    alt: 'Magnolia rooted deep — ancestral healing and lineage work',
    objectPosition: '48% 52%',
    palette: 'amber-earth',
  },
  'Creative Foundations Workbook': {
    src: '/brand/illustrations/magnolia-bloom-099.png',
    alt: 'Magnolia bloom unfurling — creative foundations and first practice',
    objectPosition: '46% 46%',
    palette: 'ink-and-bloom',
  },
  'Deep Roots Shadow Work System': {
    src: '/brand/illustrations/magnolia-bloom-159.png',
    alt: 'Full magnolia — the flagship Deep Roots system, mature and complete',
    objectPosition: '42% 48%',
    palette: 'midnight-flagship',
  },
};

/**
 * Service hero illustrations — keyed by exact Wix service name.
 * Same purpose as PRODUCT_HERO_ART. Upload to Wix Bookings so the booking
 * page surfaces these through the Bookings API.
 */
export const SERVICE_HERO_ART = {
  'WhollyInspired Publishing Package': {
    src: '/brand/illustrations/magnolia-bloom-167.png',
    alt: 'Magnolia in full bloom — the flagship publishing partnership',
    objectPosition: '44% 46%',
    palette: 'midnight-gold',
  },
  'Free 15-Minute Publishing Consultation': {
    src: '/brand/illustrations/magnolia-bloom-055.png',
    alt: 'Magnolia bloom by lantern — first conversation, gentle introduction',
    objectPosition: '48% 50%',
    palette: 'lantern-soft',
  },
  'Manuscript Development': {
    src: '/brand/illustrations/magnolia-bloom-143.png',
    alt: 'Magnolia bloom over pages — manuscript refinement and editorial care',
    objectPosition: '46% 48%',
    palette: 'ink-and-paper',
  },
  'KDP Self-Publishing Setup': {
    src: '/brand/illustrations/magnolia-bloom-156.png',
    alt: 'Magnolia bloom rising — self-publishing launch and setup',
    objectPosition: '44% 44%',
    palette: 'launch-amber',
  },
  'Book + Journal Bundle Package': {
    src: '/brand/illustrations/magnolia-bloom-162.png',
    alt: 'Paired magnolia blooms — book and journal bundle, two practices held together',
    objectPosition: '46% 48%',
    palette: 'paired-bloom',
  },
};

export function getProductHero(nameOrKey) {
  if (!nameOrKey) return null;
  return PRODUCT_HERO_ART[nameOrKey] || null;
}

/** One pick per route — change `src` to any path in ILLUSTRATION_POOL */
export const PAGE_ILLUSTRATIONS = {
  sanctuary: {
    src: '/brand/illustrations/magnolia-bloom-103.png',
    alt: 'Magnolia bloom illustration from the Midnight Magnolia library',
    caption: 'Magnolia priestess · library artwork',
    objectPosition: '45% 48%',
  },
  workWithMe: {
    src: '/brand/illustrations/magnolia-bloom-154.png',
    alt: 'Magnolia bloom illustration',
    caption: 'Magnolia priestess · library artwork',
    objectPosition: '48% 45%',
  },
  resources: {
    src: '/brand/illustrations/magnolia-bloom-141.png',
    alt: 'Magnolia bloom illustration',
    caption: 'Magnolia priestess · library artwork',
    objectPosition: '42% 50%',
  },
  portfolio: {
    src: '/brand/illustrations/magnolia-bloom-142.png',
    alt: 'Magnolia bloom illustration',
    caption: 'Magnolia priestess · library artwork',
    objectPosition: '46% 48%',
  },
  shop: {
    src: '/brand/illustrations/magnolia-bloom-263.png',
    alt: 'Magnolia bloom illustration',
    caption: 'Magnolia priestess · library artwork',
    objectPosition: '38% 46%',
  },
  services: {
    src: '/brand/illustrations/magnolia-bloom-150.png',
    alt: 'Magnolia bloom illustration',
    caption: 'Magnolia priestess · library artwork',
    objectPosition: '44% 48%',
  },
};
