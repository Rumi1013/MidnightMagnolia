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
};
