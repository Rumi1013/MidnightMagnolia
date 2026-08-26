// ── URLs ────────────────────────────────────────────────────
export const URLS = {
  /** In-app Wix Bookings catalog (Headless). Per-service CTAs use Wix booking URLs when available. */
  booking:   '/services',
  patreon:   process.env.NEXT_PUBLIC_PATREON_URL || 'https://www.patreon.com/',
  /** Membership + tips (Magnolia Circle). */
  bmac:      process.env.NEXT_PUBLIC_BMAC_URL || 'https://www.buymeacoffee.com/midnightmagnolia',
  amazon:    'https://amzn.to/4dbaYz5',
  /** Public Wix sanctuary (legacy publish / Headless storefront host). */
  wixHome:   process.env.NEXT_PUBLIC_WIX_STOREFRONT_URL || 'https://www.midnight-magnolia.com',
  /** Primary digital product storefront (live creator page). */
  gumroad:   process.env.NEXT_PUBLIC_GUMROAD_URL || 'https://midnightmagnoliasc.gumroad.com',
  /** Public Wix Blog index in this Next app. */
  blog:      '/blog',
  tiktok:    'https://www.tiktok.com/@midnightmagnoliasc',
  linkedin:  'https://linkedin.com/in/latishavwaters',
  github:    'https://github.com/rumi1013',
  email:     'mailto:bgconscious@gmail.com',
  /** Live BLF public site (Wix). Proof of work on /portfolio/statewide-documentation. */
  blfSite:   'https://legacytoliberation.wixsite.com/mysite-1',
};

// ── Navigation ───────────────────────────────────────────────
export const NAV = [
  { label: 'The Sanctuary', href: '/sanctuary' },
  { label: 'About',          href: '/about' },
  { label: 'Work With Me',  href: '/work-with-me' },
  { label: 'Bookings',      href: '/services' },
  { label: 'Membership',    href: '/membership' },
  { label: 'Portfolio',     href: '/portfolio' },
  { label: 'Gallery',       href: '/gallery' },
  /** Primary digital storefront — Gumroad (membership stays on BMAC). */
  { label: 'The Shop',      href: URLS.gumroad, external: true },
  { label: 'Blog',          href: '/blog' },
  { label: 'The Library',   href: '/library' },
  { label: 'The Grimoire',  href: '/grimoire' },
  { label: 'Resources',     href: '/resources' },
];

// ── Products ─────────────────────────────────────────────────
// Six products built as a complete healing ecosystem.
// Each product is a doorway into the next.
export const PRODUCTS = [
  {
    id: 'career-docs',
    title: 'Career Docs Package',
    subtitle: 'Information Governance + Knowledge Systems',
    price: '$29',
    description:
      'Flagship Executive ATS and Executive Networking tracks — built for information governance, digital stewardship, and knowledge systems roles, without rewriting yourself from scratch.',
    url: URLS.gumroad,
    tag: 'Bestseller',
  },
  {
    id: 'workflow-starter',
    title: 'Workflow Starter Kit',
    subtitle: 'Notion + Airtable templates',
    price: '$19',
    description:
      'Create structure that breathes. Designed for overwhelmed minds, these templates help you track, plan, and reset—without rigidity.',
    url: URLS.gumroad,
    tag: '',
  },
  {
    id: 'gentle-beginning',
    title: 'The Gentle Beginning',
    subtitle: 'Free shadow work starter kit',
    price: 'Free',
    description:
      'Five shadow work prompts to begin — no rush, no pressure. A free PDF designed to meet you exactly where you are.',
    url: URLS.gumroad,
    tag: 'Free',
  },
  {
    id: 'shadow-work-starter',
    title: 'Shadow Work Starter Kit',
    subtitle: '30-prompt guided journal',
    price: '$9',
    description: 'Thirty days of turning inward, one prompt at a time. Structured in three arcs: Foundation, Pattern, Return.',
    url: URLS.gumroad,
    tag: 'Start Here',
  },
  {
    id: 'ancestral-healing',
    title: 'Ancestral Healing Journal',
    subtitle: '40-prompt lineage + reclamation journal',
    price: '$19',
    description: 'You carry more than you know. A journal rooted in the African diaspora and the American South — for the deep work of lineage healing.',
    url: URLS.gumroad,
    tag: '',
  },
  {
    id: 'magnolia-circle',
    title: 'Magnolia Circle',
    subtitle: 'Monthly membership',
    price: '$9/mo',
    description: 'Monthly shadow work prompts, a ritual practice, the member edition of Dusk Letters, and community for quiet builders.',
    url: URLS.bmac,
    tag: 'Membership',
  },
  {
    id: 'creative-foundations',
    title: 'Creative Foundations Workbook',
    subtitle: '7-module guided workbook',
    price: '$29',
    description: 'For neurodivergent creators building a creative practice while healing. Anti-hustle. ADHD-informed. Built for the way your brain actually works.',
    url: URLS.gumroad,
    tag: '',
  },
  {
    id: 'deep-roots',
    title: 'Deep Roots Shadow Work System',
    subtitle: 'The complete healing framework',
    price: '$49',
    description: 'Three components. One uninterrupted arc. The Shadow Work Starter Kit + Ancestral Healing Journal + an exclusive Integration Guide.',
    url: URLS.gumroad,
    tag: 'Flagship',
  },
];

// ── Services ─────────────────────────────────────────────────
export const SERVICES = [
  {
    id: 'consulting',
    title: 'Knowledge Systems & Workflow Consulting',
    price: 'Book a call',
    description:
      'One-on-one systems setup for nonprofit and education leaders who need records, documentation, and tooling that people can actually find and trust.',
    bullets: [
      'Information architecture + Notion/Airtable knowledge bases',
      'Automation wiring (Make.com)',
      'AI enablement with role-based SOPs and training',
    ],
    cta: 'Book a Session',
    url: URLS.booking,
  },
  {
    id: 'ai-workshop',
    title: 'AI Literacy Workshop',
    price: 'Org pricing available',
    description:
      'Practical AI adoption for nonprofits and ops teams — role-based learning paths, not productivity theater. Paired with documentation and governance habits.',
    bullets: ['Prompt basics + safe data handling', 'Tool stack recommendations', 'SOP + training handoff'],
    cta: 'Book a Session',
    url: URLS.booking,
  },
  {
    id: 'resume-package',
    title: 'Resume & Career Docs',
    price: '$29',
    description:
      'Done-for-you suite aligned to the Flagship Executive ATS and Executive Networking tracks — information governance, digital stewardship, and knowledge systems.',
    bullets: [
      'Track A Flagship Executive ATS + Track B Networking',
      'Cover letter framing for archival / IG roles',
      'LinkedIn headline + summary aligned to the same story',
    ],
    cta: 'Get the Package',
    url: URLS.gumroad,
  },
];

// ── Portfolio impact metrics (public, verified-enough — no unverified $1.1M / 610 mix) ─
export const CASE_STUDIES = [
  {
    id: 'years',
    metric: '15+',
    label: 'Years of practice',
    description:
      'Knowledge systems, records, and program operations across nonprofit, education, and public service — paced as stewardship, not hustle.',
    tags: ['Knowledge Systems', 'Records', 'Nonprofit'],
  },
  {
    id: 'publications',
    metric: 'Print',
    label: 'Catalogs and handbooks designed',
    description:
      'InDesign, Photoshop, and Acrobat production for Community Education catalogs, a school handbook, brochure, and newsletter.',
    tags: ['InDesign', 'Editorial', 'Layout'],
  },
  {
    id: 'site',
    metric: 'Live',
    label: 'Public site as work sample',
    description:
      'A statewide justice nonprofit’s public web presence, listed here as proof of work. Client records stay off this page.',
    tags: ['Web', 'Information Architecture', 'Nonprofit'],
  },
  {
    id: 'systems',
    metric: 'Six',
    label: 'Verified case studies',
    description:
      'Records governance, statewide documentation, a community resource database, onboarding/SOPs, communications governance, and grant reporting. Two further cases stay labeled planned until the artifacts exist.',
    tags: ['Process', 'Governance', 'Operations'],
  },
];

/**
 * Selected projects from Career Command Working Master + Networking resumes —
 * proof-of-work blocks surfaced on /portfolio (linked to hosted case studies when available).
 */
export const SELECTED_PROJECTS = [
  {
    id: 'digital-records-migration',
    title: 'Case 1 · Records governance & remote digitization',
    summary:
      'Policies, intake, classification, and digitization so records stayed findable when the work moved off-site.',
    skills: 'Digitization · taxonomy · retention schedules · metadata',
    href: '/portfolio/records-digitization',
  },
  {
    id: 'statewide-ia',
    title: 'Case 2 · Statewide documentation & referral platform',
    summary:
      'Controlled terminology, navigation, and contributor review for legal and procedural information. Live public site listed as proof of work.',
    skills: 'IA · content governance · metadata · accessible archival design · web publishing',
    href: '/portfolio/statewide-documentation',
  },
  {
    id: 'community-resource',
    title: 'Case 3 · Community resource database',
    summary:
      'Researched, vetted, and structured a searchable directory covering healthcare, legal, housing, and mental-health resources.',
    skills: 'Resource research · taxonomy · data quality · public information systems',
    href: '/portfolio/community-resource-database',
  },
  {
    id: 'program-onboarding',
    title: 'Case 4 · Program onboarding & SOP system',
    summary:
      'Milestone-based onboarding, SOP structure, and quick-reference training so new staff could find the instruction.',
    skills: 'Program operations · SOP design · training · workflow documentation',
    href: '/portfolio/program-onboarding',
  },
  {
    id: 'comms-governance',
    title: 'Case 5 · Public engagement & communications governance',
    summary:
      'Audience-first writing, review, version control, and event tools. Print catalogs remain a separate lookbook.',
    skills: 'Content governance · public engagement · plain language · event operations',
    href: '/portfolio/communications-governance',
  },
  {
    id: 'grant-compliance',
    title: 'Case 6 · Grant compliance & program reporting',
    summary:
      'Participant records, federal documentation, and reporting that held up across grant cycles.',
    skills: 'Grant compliance · program records · public-sector administration · reporting',
    href: '/portfolio/grant-compliance',
  },
];

/**
 * LinkedIn Featured + /portfolio — four canonical cards (static copy).
 * Outbound URLs come from `getStaticProps` / env (see .env.local.example).
 */
export const FEATURED_PORTFOLIO_CARDS = [
  {
    id: 'covid-digitization',
    linkKey: 'digitization',
    title: 'Case 1 · Records governance & remote digitization',
    summary:
      'Policies, intake, classification, and digitization so records stayed findable when the work moved off-site.',
    skills:
      'Digital preservation workflows · archival taxonomy · records lifecycle management',
    cta: 'Read the case study',
  },
  {
    id: 'statewide-docs',
    linkKey: 'statewide',
    title: 'Case 2 · Statewide documentation & referral platform',
    summary:
      'Information architecture, controlled terminology, and contributor review for a statewide documentation platform. The public site is listed as proof of work.',
    skills:
      'Repository structure · metadata standards · content governance · accessible archival system design',
    cta: 'Read the case study',
  },
  {
    id: 'community-resource',
    linkKey: 'community',
    title: 'Case 3 · Community resource database',
    summary:
      'A searchable directory of healthcare, legal, housing, and mental-health resources — researched, vetted, and structured for public language.',
    skills:
      'Resource research · taxonomy · data quality · public information systems',
    cta: 'Read the case study',
  },
  {
    id: 'vincent-vinson',
    linkKey: 'genealogy',
    title: 'Case 7 · Vincent-Phifer genealogy (in progress)',
    summary:
      'Active genealogical research across Caswell County, NC; southern Virginia; and the South Carolina Lowcountry. Planned as a public digital archive until the relational artifact and evidence exist — do not read this as a finished case study.',
    skills:
      'Metadata organization · historical records research · primary source documentation · community-centered archival practice',
    cta: 'View the work in progress',
  },
];

// ── Skills + tools for Portfolio ─────────────────────────────
export const SKILLS = {
  'Information Governance': ['Records management', 'Retention schedules', 'Compliance reporting', 'Document handling standards', 'Knowledge transfer'],
  'Digital + Technical': ['Notion', 'Airtable', 'Make.com', 'SQL (in progress)', 'Database Admin (cert)', 'HTML/CSS', 'Python basics'],
  'AI + Enablement': ['Role-based AI learning paths', 'SOPs + staff training', 'Prompt literacy', 'Workflow automation', 'Safe data handling'],
  'Archival + Digital Stewardship': ['Digitization + taxonomy', 'Metadata standards', 'Genealogical / primary source research', 'Repository coordination', 'Community archives'],
};

// ── Resources / affiliate tools ──────────────────────────────
export const TOOLS = [
  { name: 'Notion',           desc: 'Primary workspace for content, projects, and knowledge systems. The free plan is genuinely good.', url: 'https://notion.so' },
  { name: 'Canva Pro',        desc: 'Every graphic on this site. The template library alone earns the subscription.', url: 'https://canva.com' },
  { name: 'Airtable',         desc: 'Where jobs, content, and operations live. Pair with Zapier for automation.', url: 'https://airtable.com' },
  { name: 'Amazon Storefront', desc: 'Books I actually read. Tools I actually use. Journals, tech, and workspace essentials.', url: URLS.amazon },
  { name: 'Gumroad',          desc: 'Journals, kits, and career docs.', url: URLS.gumroad },
  { name: 'Buy Me a Coffee',  desc: 'Magnolia Circle membership and tips.', url: URLS.bmac },
];

/**
 * Amazon Associates picks (short links as generated in your storefront).
 * Renders below core tools on /resources — one row per category.
 */
export const AMAZON_PICKS = [
  {
    id: 'recovery',
    title: 'Recovery, grief & sober-curious journals',
    intro:
      'Gentle paper tools for reflection, inventories, and the long middle of healing. Affiliate links.',
    items: [
      {
        name: 'Companion Recovery Journal — Reflection & Reclaiming',
        desc: 'Tactile companion alongside digital prompts.',
        url: 'https://amzn.to/4taC6Cw',
      },
      {
        name: 'The Addiction Recovery Journal · 366 days (hardcover)',
        desc: 'Daily structure for writing and reflection.',
        url: 'https://amzn.to/4t8YiwM',
      },
      {
        name: 'The Addiction Recovery Journal (paperback alt.)',
        desc: 'Same lineage of prompts in a lighter binding.',
        url: 'https://amzn.to/4eknZH7',
      },
      {
        name: 'Addiction Recovery Journal — black debossed cover',
        desc: 'Minimal exterior; interior holds the work.',
        url: 'https://amzn.to/4tYEo8Q',
      },
      {
        name: 'One Day at a Time — meditations reader',
        desc: 'Short readings for steady mornings.',
        url: 'https://amzn.to/4tlAKoM',
      },
      {
        name: 'Step workbook — self-reflection & accountability',
        desc: 'Worksheets for inventory-style honesty.',
        url: 'https://amzn.to/4w71QlZ',
      },
      {
        name: 'Step workbook — guided worksheets (alt. edition)',
        desc: 'Second binding option in the same workflow lane.',
        url: 'https://amzn.to/4d1ZAnc',
      },
      {
        name: 'Step journal — inventory worksheets',
        desc: 'Structured pages for sponsorship-style work.',
        url: 'https://amzn.to/4tbHzZI',
      },
      {
        name: 'Journal — inventory worksheets (rainbow cover)',
        desc: 'Bright cover if color helps you return to the page.',
        url: 'https://amzn.to/4eoo10K',
      },
      {
        name: 'Hardcore Grief Recovery Workbook (paperback)',
        desc: 'For seasons when loss rides shotgun.',
        url: 'https://amzn.to/4t6zc1z',
      },
      {
        name: 'Hardcore Grief Recovery Workbook (spiral)',
        desc: 'Lays flat when you cannot hold much else steady.',
        url: 'https://amzn.to/4upfwqW',
      },
    ],
  },
  {
    id: 'genealogy',
    title: 'Genealogy standards, paperwork & lineage care',
    intro:
      'What I reach for when evidence, citations, and family lines need to stay truthful. Affiliate links.',
    items: [
      {
        name: 'Evidence Explained (hardcover)',
        desc: 'Citation bible for historians and genealogists.',
        url: 'https://amzn.to/4ndXTIg',
      },
      {
        name: 'Evidence Explained (Kindle)',
        desc: 'Searchable when you travel light.',
        url: 'https://amzn.to/3OC0XRG',
      },
      {
        name: 'Blank Genealogy Forms starter kit (EasyGenie)',
        desc: 'Seven core form types, archival paper, hole-punched.',
        url: 'https://amzn.to/3Pj4QuS',
      },
      {
        name: 'Blank pedigree charts — 10 pack (8 generations)',
        desc: 'Big-picture trees before you digitize.',
        url: 'https://amzn.to/4n35b1g',
      },
      {
        name: 'Genealogy Standards (2nd ed., hardcover)',
        desc: 'Board-for-certification rigor in one volume.',
        url: 'https://amzn.to/497TX5O',
      },
      {
        name: 'Genealogy Standards (spiral-bound)',
        desc: 'Desk copy that stays open.',
        url: 'https://amzn.to/4tbI8CO',
      },
      {
        name: 'Genealogy Standards (revised edition)',
        desc: 'Updated framing for current practice.',
        url: 'https://amzn.to/4vWgnki',
      },
      {
        name: 'Professional Genealogy',
        desc: 'Preparation, practice, and standards — the long game.',
        url: 'https://amzn.to/4t6H1Et',
      },
      {
        name: 'The Genealogist’s Magazine — Getting Organized',
        desc: 'Portable systems thinking for piles of proofs.',
        url: 'https://amzn.to/4n5E3P2',
      },
      {
        name: 'Family Genealogy Tracker & ancestry workbook',
        desc: 'One volume to catch names, dates, and leads.',
        url: 'https://amzn.to/4n5u5xj',
      },
      {
        name: 'Ancestry’s Concise Genealogical Dictionary',
        desc: 'When terminology needs a humane decoder.',
        url: 'https://amzn.to/4vWnOIe',
      },
      {
        name: 'Becoming an Accredited Genealogist',
        desc: 'If credential paths are calling.',
        url: 'https://amzn.to/4w5Y4sV',
      },
      {
        name: 'SUNEE hanging file folders · 50 (assorted tabs)',
        desc: 'Keeps courthouse copies from becoming chaos.',
        url: 'https://amzn.to/3OQWbjf',
      },
      {
        name: 'SUNEE hanging file folders · 50 (pastel)',
        desc: 'Gentler color coding for long projects.',
        url: 'https://amzn.to/4taEUj2',
      },
      {
        name: 'EXLIFBAG fireproof organizer (charcoal)',
        desc: 'Protective shell for deeds, letters, DVDs of scans.',
        url: 'https://amzn.to/3RgDvKl',
      },
      {
        name: 'EXLIFBAG fireproof organizer (silver)',
        desc: 'Alternate finish for partitioned storage.',
        url: 'https://amzn.to/495oAZG',
      },
      {
        name: 'EXLIFBAG fireproof organizer (expanded)',
        desc: 'When your proof bundle outgrew the first box.',
        url: 'https://amzn.to/4d21OD4',
      },
      {
        name: 'Ovesmusl leather D-ring binder — tree cover (1.5")',
        desc: 'Holds letter-size forms; feels like an heirloom kit.',
        url: 'https://amzn.to/4w5hNsX',
      },
      {
        name: 'Ovesmusl leather binder — alternate tree finish',
        desc: 'Second tone option in the same workshop lane.',
        url: 'https://amzn.to/48FkJlT',
      },
      {
        name: 'Genealogy dividers & supplies organizer set',
        desc: 'Tabbed separation for mixed media in one binder.',
        url: 'https://amzn.to/3OIeA1I',
      },
      {
        name: 'Foldable lap desk — long archive sessions',
        desc: 'Raises your laptop or binders off the couch when research runs late.',
        url: 'https://amzn.to/4d21dRQ',
      },
      {
        name: 'Research-station add-on (see listing details)',
        desc: 'Pair with folders and binders—confirm dimensions in the listing.',
        url: 'https://amzn.to/4eWRf6P',
      },
    ],
  },
  {
    id: 'pens',
    title: 'Archival pens, fineliners & mixed-media outlining',
    intro: 'Ink that stays put when journaling, lining art, or annotating proofs. Affiliate links.',
    items: [
      {
        name: 'SAKURA Pigma Micron — black · 6 sizes',
        desc: 'Industry default for archival line work.',
        url: 'https://amzn.to/3PdP9Fk',
      },
      {
        name: 'SAKURA Pigma Micron — alternate SKU / packaging',
        desc: 'Sibling listing if your preferred nib pack shifts.',
        url: 'https://amzn.to/4w7B8tl',
      },
      {
        name: 'Uni / liquid-ink archival ballpoints (fine)',
        desc: 'When you want ballpoint glide with document-minded ink.',
        url: 'https://amzn.to/4n6og2J',
      },
      {
        name: 'DICEKOO micro-line ballpoints',
        desc: 'Non-bleed, quick-drying option for planners.',
        url: 'https://amzn.to/4tdPHJn',
      },
      {
        name: 'Grabie 20-pack — black + color fineliners',
        desc: 'Budget-friendly watercolor-friendly outlines.',
        url: 'https://amzn.to/4cOf4MQ',
      },
    ],
  },
  {
    id: 'reading',
    title: 'Words that meet you where you are',
    intro: 'Kindle-friendly truth-telling in the lineage of Black Southern narrative. Affiliate link.',
    items: [
      {
        name: 'My Story in Words Truth — memoir (Kindle)',
        desc: 'Dakari Waters · personal history as witness.',
        url: 'https://amzn.to/4tlKhMA',
      },
    ],
  },
];