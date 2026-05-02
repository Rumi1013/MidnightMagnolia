// ── URLs ────────────────────────────────────────────────────
export const URLS = {
  booking:   'https://www.midnight-magnolia.com/booking-calendar',
  stanStore: 'https://stan.store/MidnightMagnoliaSC',
  amazon:    'https://amzn.to/4dbaYz5',
  gumroad:   'https://gumroad.com/midnightmagnolia',
  tiktok:    'https://www.tiktok.com/@midnightmagnoliasc',
  linkedin:  'https://linkedin.com/in/latishavwaters',
  github:    'https://github.com/rumi1013',
  email:     'mailto:bgconscious@gmail.com',
};

// ── Navigation ───────────────────────────────────────────────
export const NAV = [
  { label: 'The Sanctuary', href: '/sanctuary' },
  { label: 'Work With Me',  href: '/work-with-me' },
  { label: 'Portfolio',     href: '/portfolio' },
  { label: 'The Shop',      href: '/shop' },
  { label: 'The Grimoire',  href: '/grimoire' },
  { label: 'Resources',     href: '/resources' },
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
  { name: 'Stan Store',       desc: 'Where my digital products live. Simple setup, instant delivery, low fees.', url: URLS.stanStore },
  { name: 'Gumroad',          desc: 'No monthly fee. My first launch platform for digital downloads.', url: URLS.gumroad },
];