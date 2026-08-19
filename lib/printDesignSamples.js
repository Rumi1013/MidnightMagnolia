/**
 * Public print-design sample strip.
 * Preview JPGs live under /public/brand/print-samples/.
 * Source PDFs / InDesign files stay off git — paths are in
 * CareerSystem/Career-command/02 Achievement Library/EVIDENCE_REGISTRY.md only.
 */

export const PUBLICATION_DESIGN_HREF = '/publication-design';

export const PRINT_DESIGN_GROUPS = [
  {
    id: 'scstate-1890',
    title: 'SC State 1890 Community Education',
    intro:
      'Seasonal catalogs designed and produced for SC State 1890 Community Education. Covers and one interior spread — not every draft cover.',
    teachingNote:
      'Technology programming named in these issues: Word, internet safety, email, Techbridge, SMART camp, and PD.',
  },
  {
    id: 'commemorative',
    title: 'Commemorative print',
    intro:
      'Funeral programs and obituaries, used with family permission. Covers and selected spreads. No addresses, phones, or extra family identifiers.',
  },
];

/** Small, permission-clean set for the public strip. */
export const PRINT_DESIGN_SAMPLES = [
  {
    id: 'scstate-fall-2014-cover',
    group: 'scstate-1890',
    kind: 'cover',
    title: 'Fall 2014 cover',
    caption: 'Designed and produced for SC State 1890 Community Education.',
    alt: 'Cover of the Fall 2014 SC State 1890 Community Education catalog',
    src: '/brand/print-samples/scstate-fall-2014-cover.jpg',
    evidenceId: 'EVD-013',
  },
  {
    id: 'scstate-winter-2015-cover',
    group: 'scstate-1890',
    kind: 'cover',
    title: 'Winter 2015 cover',
    caption: 'Designed and produced for SC State 1890 Community Education.',
    alt: 'Cover of the Winter 2015 SC State 1890 Community Education catalog',
    src: '/brand/print-samples/scstate-winter-2015-cover.jpg',
    evidenceId: 'EVD-013',
  },
  {
    id: 'scstate-spring-summer-2015-cover',
    group: 'scstate-1890',
    kind: 'cover',
    title: 'Spring–Summer 2015 cover',
    caption: 'Designed and produced for SC State 1890 Community Education.',
    alt: 'Cover of the Spring–Summer 2015 SC State 1890 Community Education catalog',
    src: '/brand/print-samples/scstate-spring-summer-2015-cover.jpg',
    evidenceId: 'EVD-013',
  },
  {
    id: 'scstate-fall-2014-interior',
    group: 'scstate-1890',
    kind: 'spread',
    title: 'Fall 2014 interior spread',
    caption: 'Designed and produced for SC State 1890 Community Education.',
    alt: 'Interior spread from the Fall 2014 SC State 1890 Community Education catalog',
    src: '/brand/print-samples/scstate-fall-2014-interior.jpg',
    evidenceId: 'EVD-013',
  },
  {
    id: 'commemorative-simmons',
    group: 'commemorative',
    kind: 'cover',
    title: 'George Simmons',
    caption: 'Commemorative print, used with permission.',
    alt: 'Cover of a commemorative funeral program for George Simmons',
    src: '/brand/print-samples/commemorative-simmons-cover.jpg',
    evidenceId: 'EVD-014',
  },
  {
    id: 'commemorative-nobles',
    group: 'commemorative',
    kind: 'cover',
    title: 'Nobles',
    caption: 'Commemorative print, used with permission.',
    alt: 'Cover of a commemorative obituary program, Nobles family, used with permission',
    src: '/brand/print-samples/commemorative-nobles-cover.jpg',
    evidenceId: 'EVD-014',
  },
];

export function samplesForGroup(groupId, samples = PRINT_DESIGN_SAMPLES) {
  return samples.filter((sample) => sample.group === groupId);
}
