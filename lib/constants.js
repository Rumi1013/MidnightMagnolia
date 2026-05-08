// ── URLs ────────────────────────────────────────────────────
export const URLS = {
  booking:   'https://www.midnight-magnolia.com/booking-calendar',
  stanStore: 'https://stan.store/MidnightMagnoliaSC',
  patreon:   process.env.NEXT_PUBLIC_PATREON_URL || 'https://www.patreon.com/',
  bmac:      process.env.NEXT_PUBLIC_BMAC_URL || 'https://www.buymeacoffee.com/',
  amazon:    'https://amzn.to/4dbaYz5',
  /** Public Wix sanctuary (blog, gallery, booking entry points). */
  wixHome:   'https://www.midnight-magnolia.com',
  gumroad:   'https://gumroad.com/midnightmagnolia',
  tiktok:    'https://www.tiktok.com/@midnightmagnoliasc',
  linkedin:  'https://linkedin.com/in/latishavwaters',
  github:    'https://github.com/rumi1013',
  email:     'mailto:bgconscious@gmail.com',
};

// ── Navigation ───────────────────────────────────────────────
export const NAV = [
  { label: 'The Sanctuary', href: '/sanctuary' },
  { label: 'About',          href: '/about' },
  { label: 'Work With Me',  href: '/work-with-me' },
  { label: 'Membership',    href: '/membership' },
  { label: 'Portfolio',     href: '/portfolio' },
  { label: 'The Shop',      href: '/shop' },
  { label: 'The Grimoire',  href: '/grimoire' },
  { label: 'Resources',     href: '/resources' },
  { label: 'Dashboard',     href: '/dashboard' },
];

// ── Products ─────────────────────────────────────────────────
export const PRODUCTS = [
  {
    id: 'career-docs',
    title: 'Career Docs Package',
    subtitle: 'AI Enablement + Digital Transformation',
    price: '$29',
    description:
      'Build with clarity, not guesswork. Crafted from real experience, this bundle helps you move toward aligned, well-paid work—without rewriting yourself from scratch.',
    url: URLS.stanStore,
    tag: 'Bestseller',
  },
  {
    id: 'workflow-starter',
    title: 'Workflow Starter Kit',
    subtitle: 'Notion + Airtable templates',
    price: '$19',
    description:
      'Create structure that breathes. Designed for overwhelmed minds, these templates help you track, plan, and reset—without rigidity.',
    url: URLS.stanStore,
    tag: 'New',
  },
  {
    id: 'shadow-journal',
    title: 'Shadow Work Journal',
    subtitle: 'Digital download — guided prompts',
    price: '$9',
    description:
      'Sit gently with yourself. This journal holds space for truth, healing, and reflection—one page at a time.',
    url: URLS.gumroad,
    tag: '',
  },
  {
    id: 'soft-biz-guide',
    title: 'Soft Business Guide',
    subtitle: 'Anti-hustle digital strategy',
    price: '$15',
    description: 'Build income in 10 hours a week. Systems, not hustle. Built for quiet creators.',
    url: URLS.stanStore,
    tag: '',
  },
  {
    id: 'grimoire-library',
    title: 'Digital Grimoire Prompt Library',
    subtitle: '100+ prompts across 7 categories',
    price: '$35',
    description: 'AI writing, tarot, ancestral research, shadow work, and digital product prompts. Your signature tool.',
    url: URLS.gumroad,
    tag: 'Signature',
  },
  {
    id: 'magnolia-circle',
    title: 'Magnolia Circle',
    subtitle: 'Monthly membership',
    price: '$9/mo',
    description: 'Monthly prompts, affirmation cards, reflection worksheets, and community for quiet builders.',
    url: URLS.stanStore,
    tag: 'Coming Soon',
  },
];

// ── Services ─────────────────────────────────────────────────
export const SERVICES = [
  {
    id: 'consulting',
    title: 'Workflow & Ops Consulting',
    price: 'Book a call',
    description: 'One-on-one systems setup for program managers and nonprofit leaders. We map your workflow, remove the chaos, build structure that holds.',
    bullets: ['Career OS setup (Notion + Airtable)', 'Automation wiring (Zapier)', 'AI tool integration + training'],
    cta: 'Book a Session',
    url: URLS.booking,
  },
  {
    id: 'ai-workshop',
    title: 'AI Literacy Workshop',
    price: 'Org pricing available',
    description: 'Practical AI tools for nonprofits, program managers, and ops leads. Built for people who need to work smarter, not perform productivity.',
    bullets: ['Prompt engineering basics', 'Tool stack recommendations', 'Workflow + reporting integration'],
    cta: 'Book a Session',
    url: URLS.booking,
  },
  {
    id: 'resume-package',
    title: 'Resume & Career Docs',
    price: '$29',
    description: 'Done-for-you ATS-optimized resume suite. Built for $100K+ remote roles in AI enablement and digital transformation.',
    bullets: ['2 resume tracks (AI Enablement + Implementation)', 'Cover letter template', 'LinkedIn headline + summary copy'],
    cta: 'Get the Package',
    url: URLS.stanStore,
  },
];

// ── Portfolio case studies ───────────────────────────────────
export const CASE_STUDIES = [
  {
    id: 'funding',
    metric: '$1.5M+',
    label: 'in Funding Secured',
    description: 'Grant writing, compliance management, and funder relationship stewardship for a community justice nonprofit. Managed 12+ funder relationships simultaneously across a 3-year program cycle.',
    tags: ['Grant Management', 'Nonprofit', 'Compliance'],
  },
  {
    id: 'participants',
    metric: '610+',
    label: 'Program Participants Served',
    description: 'Designed and directed a reentry education program across 4 sites in 4 counties. Coordinated curriculum development, staffing, and wraparound services for justice-impacted individuals.',
    tags: ['Program Design', 'Multi-site', 'Community'],
  },
  {
    id: 'cost',
    metric: '25%',
    label: 'Cost Reduction via Systems Redesign',
    description: 'Rebuilt operational workflows using Notion, Airtable, and automation. Reduced administrative overhead and improved cross-team reporting accuracy without adding staff.',
    tags: ['Process Design', 'Automation', 'Ops'],
  },
  {
    id: 'budget',
    metric: '$300K+',
    label: 'Annual Budget Managed',
    description: 'Full budget oversight including forecasting, reconciliation, and reporting to board and funders. Maintained financial compliance across multiple program streams.',
    tags: ['Budget Management', 'Reporting', 'Finance'],
  },
];

// ── Skills + tools for Portfolio ─────────────────────────────
export const SKILLS = {
  'Program Management': ['Cross-functional leadership', 'Grant writing + compliance', 'Budget management', 'Multi-site coordination', 'Stakeholder reporting'],
  'Digital + Technical': ['Notion', 'Airtable', 'Zapier', 'SQL (in progress)', 'Database Admin (cert)', 'HTML/CSS', 'Python basics'],
  'AI + Enablement': ['Prompt engineering', 'Claude / ChatGPT', 'AI literacy curriculum', 'Workflow automation', 'LLM tool integration'],
  'Archival + Digital Preservation': ['Digital archiving methodology', 'Oral history collection', 'Genealogical research', 'Freedmen\'s Bureau records', 'Cultural heritage documentation'],
};

// ── Resources / affiliate tools ──────────────────────────────
export const TOOLS = [
  { name: 'Notion',           desc: 'My primary workspace for content, projects, and Career OS. Free plan is genuinely good.', url: 'https://notion.so' },
  { name: 'Canva Pro',        desc: 'Every graphic on this site. The template library alone earns the subscription.', url: 'https://canva.com' },
  { name: 'Airtable',         desc: 'Where I track jobs, content, and affiliate links. Pair with Zapier for automation.', url: 'https://airtable.com' },
  { name: 'Amazon Storefront', desc: 'Books I actually read. Tools I actually use. Journals, tech, and workspace essentials.', url: URLS.amazon },
  {
    name: 'Midnight Magnolia (Wix)',
    desc: 'The public sanctuary site—blog, free resources, gallery, and paths into booking.',
    url: URLS.wixHome,
  },
  { name: 'Stan Store',       desc: 'Where my digital products live. Simple setup, instant delivery, low fees.', url: URLS.stanStore },
  { name: 'Gumroad',          desc: 'No monthly fee. My first launch platform for digital downloads.', url: URLS.gumroad },
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
        desc: 'Daily structure for transformation, writing & reflection.',
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