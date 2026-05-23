# Midnight Magnolia · Next.js Headless Site
> Drop into: `/Development/Projects/Active/MidnightMagnolia/`
> Wix Dashboard = your content backend. Next.js + Vercel = your frontend.

---

## FILE: package.json

```json
{
  "name": "midnight-magnolia",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@wix/sdk": "^1.21.7",
    "@wix/blog": "^1.0.600",
    "@wix/stores": "^1.0.759"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "eslint-config-next": "14.2.3"
  }
}
```

---

## FILE: next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['static.wixstatic.com', 'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com'],
  },
};
module.exports = nextConfig;
```

---

## FILE: .env.local.example
> Rename to `.env.local` and fill in. Get values from Wix Dashboard → Settings → Headless Settings.

```
NEXT_PUBLIC_WIX_CLIENT_ID=your_wix_client_id_here
RESUME_TRACK_A_URL=https://static.wixstatic.com/media/REPLACE.pdf
RESUME_TRACK_B_URL=https://static.wixstatic.com/media/REPLACE.pdf
```

---

## FILE: styles/globals.css

```css
/* ── Google Fonts ─────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

/* ── Midnight Magnolia Design Tokens ─────────────────────── */
:root {
  --color-midnight:   #2B2F4A;
  --color-amber:      #C9A84C;
  --color-magnolia:   #F5F0E8;
  --color-ink:        #1A1C2E;
  --color-dusk:       #373B5C;
  --color-sage:       #8B9E8A;
  --color-muted:      rgba(245,240,232,0.55);

  --font-display:     'Cormorant Garamond', Georgia, serif;
  --font-body:        'DM Sans', system-ui, sans-serif;

  --max-width:        1100px;
  --radius:           4px;
  --radius-lg:        12px;
  --transition:       180ms ease;

  --space-xs:  0.25rem;
  --space-sm:  0.5rem;
  --space-md:  1rem;
  --space-lg:  2rem;
  --space-xl:  4rem;
  --space-2xl: 8rem;
}

/* ── Reset ───────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--color-midnight);
  color: var(--color-magnolia);
  line-height: 1.75;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
}

/* ── Typography ─────────────────────────────────────────── */
h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 1.2;
  color: var(--color-magnolia);
}
h1 { font-size: clamp(2.8rem, 7vw, 5rem); }
h2 { font-size: clamp(1.9rem, 4vw, 3rem); }
h3 { font-size: clamp(1.3rem, 3vw, 1.9rem); }
h4 { font-size: 1rem; letter-spacing: 0.07em; text-transform: uppercase; font-family: var(--font-body); font-weight: 500; }

p { max-width: 65ch; line-height: 1.8; }
a { color: var(--color-amber); text-decoration: none; transition: opacity var(--transition); }
a:hover { opacity: 0.75; }
ul { list-style: none; }

/* ── Layout ─────────────────────────────────────────────── */
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-lg);
}
.section        { padding: var(--space-xl) 0; }
.section--dark  { background: var(--color-ink); }
.section--dusk  { background: var(--color-dusk); }

/* ── Buttons ────────────────────────────────────────────── */
.btn {
  display: inline-block;
  padding: 0.8rem 1.9rem;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--transition);
  border: none;
  text-align: center;
}
.btn--primary  { background: var(--color-amber); color: var(--color-ink); }
.btn--primary:hover { background: #d9b85c; opacity: 1; }
.btn--outline  { background: transparent; color: var(--color-amber); border: 1px solid var(--color-amber); }
.btn--outline:hover { background: var(--color-amber); color: var(--color-ink); opacity: 1; }
.btn--ghost    { background: transparent; color: var(--color-magnolia); border: 1px solid rgba(245,240,232,0.25); }
.btn--ghost:hover { border-color: var(--color-magnolia); opacity: 1; }

/* ── Cards ──────────────────────────────────────────────── */
.card {
  background: var(--color-dusk);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  border: 1px solid rgba(201,168,76,0.12);
  transition: border-color var(--transition), transform var(--transition);
}
.card:hover { border-color: rgba(201,168,76,0.35); transform: translateY(-2px); }

/* ── Utility ────────────────────────────────────────────── */
.divider      { width: 48px; height: 2px; background: var(--color-amber); margin: var(--space-md) 0 var(--space-lg); }
.tag          { display: inline-block; padding: 0.2rem 0.7rem; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(201,168,76,0.12); color: var(--color-amber); border-radius: 2px; border: 1px solid rgba(201,168,76,0.3); }
.muted        { color: var(--color-muted); }
.grid-2       { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-lg); }
.grid-3       { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-lg); }
.flex-between { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md); }
.stat-grid    { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: var(--space-md); }

.stat-block {
  text-align: center;
  padding: var(--space-lg) var(--space-md);
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: var(--radius-lg);
}
.stat-block .stat-number {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--color-amber);
  display: block;
}
.stat-block .stat-label {
  font-size: 0.8rem;
  color: var(--color-muted);
  letter-spacing: 0.05em;
}

/* ── Nav ────────────────────────────────────────────────── */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(26,28,46,0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(201,168,76,0.12);
}
.nav__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem var(--space-lg);
  max-width: var(--max-width);
  margin: 0 auto;
}
.nav__logo {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--color-magnolia);
  letter-spacing: 0.02em;
}
.nav__logo span { color: var(--color-amber); }
.nav__links { display: flex; gap: var(--space-lg); align-items: center; }
.nav__links a { font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-muted); transition: color var(--transition); }
.nav__links a:hover, .nav__links a.active { color: var(--color-magnolia); opacity: 1; }
.nav__cta { font-size: 0.75rem !important; background: var(--color-amber); color: var(--color-ink) !important; padding: 0.5rem 1.2rem; border-radius: var(--radius); }
.nav__cta:hover { background: #d9b85c; opacity: 1 !important; }

/* ── Footer ─────────────────────────────────────────────── */
.footer {
  background: var(--color-ink);
  border-top: 1px solid rgba(201,168,76,0.12);
  padding: var(--space-xl) 0 var(--space-lg);
}
.footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: var(--space-xl); margin-bottom: var(--space-xl); }
.footer__brand p { color: var(--color-muted); font-size: 0.9rem; margin-top: var(--space-sm); max-width: 36ch; }
.footer__col h4 { color: var(--color-amber); margin-bottom: var(--space-md); font-size: 0.75rem; }
.footer__col a { display: block; color: var(--color-muted); font-size: 0.875rem; margin-bottom: 0.5rem; transition: color var(--transition); }
.footer__col a:hover { color: var(--color-magnolia); opacity: 1; }
.footer__bottom { border-top: 1px solid rgba(245,240,232,0.08); padding-top: var(--space-lg); display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--color-muted); flex-wrap: wrap; gap: var(--space-sm); }

/* ── Hero ───────────────────────────────────────────────── */
.hero {
  min-height: 92vh;
  display: flex;
  align-items: center;
  padding: var(--space-xl) 0;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(43,47,74,0.8) 0%, transparent 50%);
  pointer-events: none;
}
.hero__eyebrow { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-amber); margin-bottom: var(--space-md); }
.hero__title { margin-bottom: var(--space-md); }
.hero__subtitle { font-size: 1.15rem; color: var(--color-muted); margin-bottom: var(--space-xl); max-width: 52ch; }
.hero__actions { display: flex; gap: var(--space-md); flex-wrap: wrap; }

/* ── Page Hero (inner pages) ────────────────────────────── */
.page-hero { padding: var(--space-xl) 0 var(--space-lg); border-bottom: 1px solid rgba(201,168,76,0.12); margin-bottom: var(--space-xl); }
.page-hero__eyebrow { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-amber); margin-bottom: var(--space-sm); }

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 768px) {
  .nav__links { display: none; }
  .footer__grid { grid-template-columns: 1fr; }
  .grid-3 { grid-template-columns: 1fr; }
  .hero { min-height: 80vh; }
}
```

---

## FILE: lib/constants.js

```js
// ── URLs ────────────────────────────────────────────────────
export const URLS = {
  booking:   'https://www.midnight-magnolia.com/booking-calendar',
  stanStore: 'https://stan.store/MidnightMagnoliaSC',
  amazon:    'https://amzn.to/4dbaYz5',
  gumroad:   'https://gumroad.com/midnightmagnolia',
  tiktok:    'https://www.tiktok.com/@midnightmagnoliasc',
  linkedin:  'https://linkedin.com/in/latishavwaters',
  github:    'https://github.com/Rumi1013',
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
    description: '2 ATS-optimized resumes, cover letter template, and LinkedIn swipe copy built for $100K+ remote roles.',
    url: URLS.stanStore,
    tag: 'Bestseller',
  },
  {
    id: 'workflow-starter',
    title: 'Workflow Starter Kit',
    subtitle: 'Notion + Airtable templates',
    price: '$19',
    description: 'Pre-built Career OS templates for job tracking, content pipelines, and weekly planning.',
    url: URLS.stanStore,
    tag: 'New',
  },
  {
    id: 'shadow-journal',
    title: 'Shadow Work Journal',
    subtitle: 'Digital download — guided prompts',
    price: '$9',
    description: 'A healing-centered journal for neurodivergent women doing deep inner work. 90 guided pages.',
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
    metric: 'Secured funding',
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
```

---

## FILE: lib/wix.js

```js
import { createClient, OAuthStrategy } from '@wix/sdk';
import { posts } from '@wix/blog';
import { products, collections } from '@wix/stores';

// ── Wix Headless Client ──────────────────────────────────────
function getWixClient() {
  return createClient({
    modules: { posts, products, collections },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
    }),
  });
}

// ── Blog: fetch all Grimoire posts ───────────────────────────
export async function getGrimoirePosts(limit = 12) {
  try {
    const client = getWixClient();
    const res = await client.posts.queryPosts()
      .limit(limit)
      .descending('publishedDate')
      .find();
    return res.items || [];
  } catch (err) {
    console.error('Wix Blog fetch error:', err);
    return [];
  }
}

// ── Blog: fetch single post by slug ──────────────────────────
export async function getPostBySlug(slug) {
  try {
    const client = getWixClient();
    const res = await client.posts.queryPosts()
      .eq('slug', slug)
      .limit(1)
      .find();
    return res.items[0] || null;
  } catch (err) {
    console.error('Wix Blog single post error:', err);
    return null;
  }
}

// ── Shop: fetch all products ─────────────────────────────────
export async function getShopProducts() {
  try {
    const client = getWixClient();
    const res = await client.products.queryProducts()
      .limit(20)
      .find();
    return res.items || [];
  } catch (err) {
    console.error('Wix Store fetch error:', err);
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
```

---

## FILE: components/Layout.jsx

```jsx
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAV, URLS } from '../lib/constants';

export default function Layout({ children, title, description }) {
  const router = useRouter();
  const pageTitle = title ? `${title} · Midnight Magnolia` : 'Midnight Magnolia · A Southern Gothic Digital Sanctuary';
  const pageDesc  = description || 'A Southern Gothic sanctuary for neurodivergent creators and quiet builders. Digital products, consulting, and healing-centered tools.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="nav">
        <div className="nav__inner">
          <Link href="/" className="nav__logo">
            Midnight <span>Magnolia</span>
          </Link>
          <div className="nav__links">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={router.pathname === item.href ? 'active' : ''}
              >
                {item.label}
              </Link>
            ))}
            <Link href={URLS.booking} className="nav__cta" target="_blank" rel="noopener">
              Book a Session
            </Link>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>
                Midnight <span style={{ color: 'var(--color-amber)' }}>Magnolia</span>
              </h3>
              <p>A Southern Gothic sanctuary for neurodivergent creators, healing-centered women, and quiet builders.</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                <a href={URLS.linkedin} target="_blank" rel="noopener">LinkedIn</a>
                <a href={URLS.github} target="_blank" rel="noopener">GitHub</a>
                <a href={URLS.tiktok} target="_blank" rel="noopener">TikTok</a>
                <a href={URLS.amazon} target="_blank" rel="noopener">Amazon</a>
              </div>
            </div>
            <div className="footer__col">
              <h4>Navigate</h4>
              {NAV.map(item => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
            </div>
            <div className="footer__col">
              <h4>Connect</h4>
              <a href={URLS.booking} target="_blank" rel="noopener">Book a Session</a>
              <a href={URLS.stanStore} target="_blank" rel="noopener">Shop Products</a>
              <a href={URLS.email}>Email Latisha</a>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} Midnight Magnolia · Rumi-Nations LLC</span>
            <span>
              <Link href="/privacy-policy" style={{ color: 'inherit', marginRight: '1rem' }}>Privacy</Link>
              <Link href="/terms-conditions" style={{ color: 'inherit' }}>Terms</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
```

---

## FILE: pages/_app.jsx

```jsx
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

---

## FILE: pages/index.jsx

```jsx
import Link from 'next/link';
import Layout from '../components/Layout';
import { URLS, PRODUCTS } from '../lib/constants';

export default function Home() {
  const featuredProducts = PRODUCTS.filter(p => p.tag !== 'Coming Soon').slice(0, 3);

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <p className="hero__eyebrow">Midnight Magnolia · Lowcountry, SC</p>
          <h1 className="hero__title">
            A sanctuary for<br />
            <em style={{ color: 'var(--color-amber)', fontStyle: 'italic' }}>quiet builders.</em>
          </h1>
          <p className="hero__subtitle">
            Southern Gothic healing tools, digital products, and consulting for neurodivergent creators
            who are done performing urgency they don't feel.
          </p>
          <div className="hero__actions">
            <a href={URLS.booking} className="btn btn--primary" target="_blank" rel="noopener">
              Book a Session
            </a>
            <Link href="/shop" className="btn btn--outline">Visit the Shop</Link>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="section section--dark">
        <div className="container">
          <div className="stat-grid">
            {[
              { number: 'Secured funding', label: 'Funding Secured' },
              { number: '610+',   label: 'Program Participants' },
              { number: '15+',    label: 'Years of Leadership' },
              { number: '$300K+', label: 'Annual Budget Managed' },
            ].map(s => (
              <div className="stat-block" key={s.label}>
                <span className="stat-number">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Doors ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <h2>Three ways in.</h2>
          <div className="divider" />
          <div className="grid-3" style={{ marginTop: 'var(--space-lg)' }}>
            {[
              {
                title: 'Work With Me',
                desc:  'Workflow consulting, AI literacy workshops, and career docs for $100K+ remote roles.',
                href:  '/work-with-me',
                cta:   'See Services',
              },
              {
                title: 'The Shop',
                desc:  'Digital products from $9 — journals, planners, career tools, and the Soft Business Guide.',
                href:  '/shop',
                cta:   'Browse Products',
              },
              {
                title: 'The Grimoire',
                desc:  'Southern Gothic writing, public domain Black literature, and healing resources for the long haul.',
                href:  '/grimoire',
                cta:   'Read the Grimoire',
              },
            ].map(door => (
              <div className="card" key={door.title}>
                <h3>{door.title}</h3>
                <div className="divider" style={{ width: 32 }} />
                <p className="muted">{door.desc}</p>
                <Link href={door.href} className="btn btn--ghost" style={{ marginTop: 'var(--space-lg)', display: 'inline-block' }}>
                  {door.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────── */}
      <section className="section section--dusk">
        <div className="container">
          <div className="flex-between" style={{ marginBottom: 'var(--space-lg)' }}>
            <div>
              <h2>From the shop.</h2>
              <div className="divider" />
            </div>
            <Link href="/shop" className="btn btn--outline">All Products</Link>
          </div>
          <div className="grid-3">
            {featuredProducts.map(p => (
              <div className="card" key={p.id}>
                {p.tag && <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>{p.tag}</span>}
                <h3>{p.title}</h3>
                <p className="muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{p.description}</p>
                <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-amber)' }}>{p.price}</span>
                  <a href={p.url} className="btn btn--primary" style={{ padding: '0.5rem 1.2rem' }} target="_blank" rel="noopener">
                    Get It Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="section section--dark" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ maxWidth: '18ch', margin: '0 auto' }}>
            "The work is not to do more.<br />
            <em style={{ color: 'var(--color-amber)' }}>It is to build something that holds.</em>"
          </h2>
          <div style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/sanctuary" className="btn btn--outline">Read the Story</Link>
            <a href={URLS.stanStore} className="btn btn--primary" target="_blank" rel="noopener">Visit the Shop</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
```

---

## FILE: pages/sanctuary.jsx

```jsx
import Link from 'next/link';
import Layout from '../components/Layout';
import { URLS } from '../lib/constants';

export default function Sanctuary() {
  return (
    <Layout
      title="The Sanctuary"
      description="The story of Midnight Magnolia and Latisha Vincent-Waters — Senior Program Manager, digital entrepreneur, and Lowcountry SC native."
    >
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">About</p>
          <h1>You found the right quiet.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            This is a space for neurodivergent creators, healing-centered women, and quiet builders
            who are done performing urgency they don't feel.
          </p>
        </div>

        {/* Story */}
        <section className="section">
          <div style={{ maxWidth: '680px' }}>
            <h2>The story.</h2>
            <div className="divider" />
            <p style={{ marginBottom: 'var(--space-md)' }}>
              I am Latisha Vincent-Waters — a Senior Program Manager, digital entrepreneur,
              and Lowcountry South Carolina native with 15+ years building systems that actually hold people.
            </p>
            <p style={{ marginBottom: 'var(--space-md)' }}>
              I have secured project funding, managed six-figure budgets, and directed programs
              serving hundreds of community members across multiple counties. I am a Soros Justice Fellow,
              completing my A.A.S. in Information Technology at Trident Technical College,
              and building toward an M.L.I.S. with a concentration in digital archival science
              and cultural heritage preservation.
            </p>
            <p>
              Now I am building Midnight Magnolia — because the tools that help people should feel like rest, not labor.
            </p>
          </div>
        </section>

        {/* Who this is for */}
        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>This space is for you if:</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            {[
              'You are neurodivergent and done apologizing for how your brain works.',
              'You want to build income without burning yourself down.',
              'You are a quiet builder who needs structure that breathes.',
              'You are in transition and need real tools, not motivation.',
            ].map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-amber)', fontFamily: 'var(--font-display)', fontSize: '1.5rem', lineHeight: 1 }}>—</span>
                <p>{line}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Credentials */}
        <section className="section">
          <h2>Credentials.</h2>
          <div className="divider" />
          <div className="grid-2">
            {[
              { label: 'Education', items: ['B.A. Mass Communications · Claflin University', 'A.A.S. Information Technology (in progress) · Trident Technical College', 'Database Administrator Cert (concurrent) · Trident Tech'] },
              { label: 'Recognition', items: ['Soros Justice Fellow · Open Society Foundations 2022', 'Workforce Development Scholarship Recipient', 'Google Data Analytics Certificate (2025)'] },
            ].map(col => (
              <div className="card" key={col.label}>
                <h4 style={{ color: 'var(--color-amber)', marginBottom: 'var(--space-md)' }}>{col.label}</h4>
                {col.items.map(item => <p key={item} style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>{item}</p>)}
              </div>
            ))}
          </div>
        </section>

        {/* CTAs */}
        <section className="section" style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', paddingBottom: 'var(--space-2xl)' }}>
          <a href={URLS.booking} className="btn btn--primary" target="_blank" rel="noopener">Book a Session</a>
          <Link href="/portfolio" className="btn btn--outline">View the Portfolio</Link>
          <a href={URLS.stanStore} className="btn btn--ghost" target="_blank" rel="noopener">Visit the Shop</a>
        </section>
      </div>
    </Layout>
  );
}
```

---

## FILE: pages/portfolio.jsx

```jsx
import Link from 'next/link';
import Layout from '../components/Layout';
import { URLS, CASE_STUDIES, SKILLS } from '../lib/constants';

// ── Resume track config ───────────────────────────────────────
const RESUME_TRACKS = [
  {
    id: 'A',
    title: 'Track A — AI Enablement / Senior PM',
    desc:  'Optimized for AI literacy, digital transformation, and technology program management roles.',
    url:   process.env.RESUME_TRACK_A_URL || '#',
  },
  {
    id: 'B',
    title: 'Track B — Implementation PM',
    desc:  'Optimized for implementation, operations, and cross-functional program management roles.',
    url:   process.env.RESUME_TRACK_B_URL || '#',
  },
];

export default function Portfolio() {
  return (
    <Layout
      title="Portfolio"
      description="Latisha Vincent-Waters · Senior Program Manager, Digital Entrepreneur · 15+ years, secured funding, 610+ served. Available for remote $100K+ roles."
    >
      <div className="container">

        {/* ── Page Hero ──────────────────────────────────────── */}
        <div className="page-hero">
          <p className="page-hero__eyebrow">Portfolio</p>
          <h1>The work speaks.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            15+ years building programs, securing funding, and leading digital operations
            in nonprofit and technology environments. Available for remote roles targeting $100K+
            in AI enablement, digital transformation, and archival/cultural heritage work.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginTop: 'var(--space-lg)' }}>
            <a href={URLS.linkedin} className="btn btn--primary" target="_blank" rel="noopener">LinkedIn Profile</a>
            <a href={URLS.github} className="btn btn--outline" target="_blank" rel="noopener">GitHub · Rumi1013</a>
            <a href={URLS.email} className="btn btn--ghost">Email Latisha</a>
          </div>
        </div>

        {/* ── Impact Stats ───────────────────────────────────── */}
        <section className="section">
          <h2>Impact at a glance.</h2>
          <div className="divider" />
          <div className="stat-grid">
            {CASE_STUDIES.map(c => (
              <div className="stat-block" key={c.id}>
                <span className="stat-number">{c.metric}</span>
                <span className="stat-label">{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Resume Downloads ───────────────────────────────── */}
        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>Resume tracks.</h2>
          <div className="divider" />
          <p className="muted" style={{ marginBottom: 'var(--space-lg)', maxWidth: '58ch' }}>
            Two ATS-optimized tracks built for $100K+ remote roles. Both current as of 2026.
          </p>
          <div className="grid-2">
            {RESUME_TRACKS.map(track => (
              <div className="card" key={track.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>Track {track.id}</span>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>{track.title}</h3>
                  <p className="muted" style={{ fontSize: '0.875rem' }}>{track.desc}</p>
                </div>
                <a
                  href={track.url}
                  className="btn btn--outline"
                  style={{ marginTop: 'var(--space-lg)', alignSelf: 'flex-start' }}
                  target="_blank"
                  rel="noopener"
                  download
                >
                  Download PDF
                </a>
              </div>
            ))}
          </div>
          <p className="muted" style={{ fontSize: '0.8rem', marginTop: 'var(--space-md)' }}>
            Additional tracks available (Digital Learning, Operations/Compliance, CRM/Tech) — contact for specific versions.
          </p>
        </section>

        {/* ── Case Studies ───────────────────────────────────── */}
        <section className="section">
          <h2>Selected work.</h2>
          <div className="divider" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', marginTop: 'var(--space-lg)' }}>
            {CASE_STUDIES.map((study, i) => (
              <div className="card" key={study.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--space-xl)', alignItems: 'start' }}>
                <div style={{ textAlign: 'center', minWidth: '100px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-amber)', display: 'block', lineHeight: 1 }}>{study.metric}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)', letterSpacing: '0.05em' }}>{study.label}</span>
                </div>
                <div>
                  <p style={{ marginBottom: 'var(--space-md)' }}>{study.description}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {study.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills + Tools ─────────────────────────────────── */}
        <section className="section section--dusk" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          <h2>Skills + tools.</h2>
          <div className="divider" />
          <div className="grid-2" style={{ marginTop: 'var(--space-lg)' }}>
            {Object.entries(SKILLS).map(([category, items]) => (
              <div className="card" key={category} style={{ background: 'rgba(26,28,46,0.5)' }}>
                <h4 style={{ color: 'var(--color-amber)', marginBottom: 'var(--space-md)' }}>{category}</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {items.map(item => (
                    <li key={item} style={{ fontSize: '0.875rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--color-amber)', fontSize: '0.6rem' }}>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education + Credentials ────────────────────────── */}
        <section className="section">
          <h2>Education + credentials.</h2>
          <div className="divider" />
          <div className="grid-2">
            {[
              {
                institution: 'Claflin University',
                credential:  'B.A. Mass Communications',
                note:        'Orangeburg, SC',
              },
              {
                institution: 'Trident Technical College',
                credential:  'A.A.S. Information Technology (in progress, exp. 2026)',
                note:        'Concurrent: Database Administrator Certification · GPA 3.58',
              },
              {
                institution: 'Open Society Foundations',
                credential:  'Soros Justice Fellow, 2022',
                note:        'Community justice and digital equity focus',
              },
              {
                institution: 'Google / Coursera',
                credential:  'Data Analytics Certificate, 2025',
                note:        'Workforce Development Scholarship Recipient',
              },
            ].map(cred => (
              <div key={cred.institution} style={{ borderLeft: '2px solid var(--color-amber)', paddingLeft: 'var(--space-lg)', paddingTop: 'var(--space-sm)', paddingBottom: 'var(--space-sm)' }}>
                <h4 style={{ color: 'var(--color-magnolia)', marginBottom: '0.25rem', fontSize: '1rem', letterSpacing: 0 }}>{cred.credential}</h4>
                <p style={{ color: 'var(--color-amber)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{cred.institution}</p>
                <p className="muted" style={{ fontSize: '0.8rem' }}>{cred.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Consulting CTA ─────────────────────────────────── */}
        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
          <h2>Interested in working together?</h2>
          <p className="muted" style={{ margin: 'var(--space-md) auto var(--space-lg)', maxWidth: '50ch' }}>
            Available for remote roles in AI enablement, digital transformation, and cultural heritage archiving.
            Also available for consulting engagements.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={URLS.booking} className="btn btn--primary" target="_blank" rel="noopener">Book a Strategy Session</a>
            <a href={URLS.email} className="btn btn--outline">Send an Email</a>
          </div>
        </section>

      </div>
    </Layout>
  );
}
```

---

## FILE: pages/work-with-me.jsx

```jsx
import Layout from '../components/Layout';
import { SERVICES, URLS } from '../lib/constants';

export default function WorkWithMe() {
  return (
    <Layout title="Work With Me" description="Workflow consulting, AI literacy workshops, and career docs for program managers and nonprofit leaders.">
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Services</p>
          <h1>Work With Me</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Systems setup, AI literacy, and career documents — built for program managers,
            nonprofit leaders, and quiet builders ready to move differently.
          </p>
        </div>

        <section className="section">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {SERVICES.map((service, i) => (
              <div className="card" key={service.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-lg)', alignItems: 'start' }}>
                <div>
                  <h3>{service.title}</h3>
                  <div className="divider" style={{ width: 32 }} />
                  <p style={{ marginBottom: 'var(--space-md)', color: 'var(--color-muted)' }}>{service.description}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {service.bullets.map(b => (
                      <li key={b} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                        <span style={{ color: 'var(--color-amber)' }}>◆</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ textAlign: 'right', minWidth: '140px' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--color-amber)', marginBottom: 'var(--space-md)' }}>{service.price}</p>
                  <a href={service.url} className="btn btn--primary" target="_blank" rel="noopener">{service.cta}</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section" style={{ paddingTop: 0, paddingBottom: 'var(--space-2xl)', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
          Sessions are booked via the calendar. Response within 24 hours. All sessions are virtual.
        </div>
      </div>
    </Layout>
  );
}
```

---

## FILE: pages/shop/index.jsx

```jsx
import Layout from '../../components/Layout';
import { PRODUCTS, URLS } from '../../lib/constants';

export default function Shop() {
  const active  = PRODUCTS.filter(p => p.tag !== 'Coming Soon');
  const coming  = PRODUCTS.find(p => p.tag === 'Coming Soon');

  return (
    <Layout title="The Shop" description="Digital products for quiet builders — journals, planners, career tools, and the Soft Business Guide. From $9.">
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">The Shop</p>
          <h1>Tools for quiet builders.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Digital products to help you move with intention — from career documents to shadow work journals.
            No subscriptions required. Instant download.
          </p>
        </div>

        <section className="section">
          <div className="grid-3">
            {active.map(p => (
              <div className="card" key={p.id} style={{ display: 'flex', flexDirection: 'column' }}>
                {p.tag && <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>{p.tag}</span>}
                <h3 style={{ fontSize: '1.2rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-amber)', margin: '0.25rem 0 0.75rem', letterSpacing: '0.05em' }}>{p.subtitle}</p>
                <p className="muted" style={{ fontSize: '0.875rem', flex: 1 }}>{p.description}</p>
                <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--color-amber)' }}>{p.price}</span>
                  <a href={p.url} className="btn btn--primary" style={{ padding: '0.5rem 1.2rem' }} target="_blank" rel="noopener">Get It Now</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {coming && (
          <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
            <span className="tag" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>Coming Soon</span>
            <h2>{coming.title}</h2>
            <p className="muted" style={{ margin: 'var(--space-md) auto var(--space-lg)', maxWidth: '48ch' }}>{coming.description}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-amber)', marginBottom: 'var(--space-lg)' }}>{coming.price}</p>
            <a href={URLS.email} className="btn btn--outline">Notify Me at Launch</a>
          </section>
        )}

        <div className="section" style={{ paddingTop: 0, paddingBottom: 'var(--space-2xl)', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
          All sales are final. Digital products are delivered instantly via email. Questions? <a href={URLS.email}>bgconscious@gmail.com</a>
        </div>
      </div>
    </Layout>
  );
}
```

---

## FILE: pages/grimoire/index.jsx

```jsx
import Layout from '../../components/Layout';
import { getGrimoirePosts, formatPostDate } from '../../lib/wix';
import Link from 'next/link';

const CATEGORIES = ['All', 'Shadow Work', 'Southern Gothic', 'Soft Business School', 'Literary Archive', 'Healing Resources'];

export async function getStaticProps() {
  const posts = await getGrimoirePosts(12);
  return { props: { posts }, revalidate: 300 }; // ISR: refresh every 5 min
}

export default function Grimoire({ posts }) {
  return (
    <Layout title="The Grimoire" description="Writing from the Lowcountry. Shadow work, Southern Gothic stories, public domain Black literature, and a soft business school.">
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">The Grimoire</p>
          <h1>Writing from the Lowcountry.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Shadow work for the soul. Public domain Black literature recovered and remembered.
            A soft business school for people who refuse to hustle their way to wholeness.
          </p>
        </div>

        {/* Category filter — visual only; filter logic added once Wix Blog is live */}
        <section className="section" style={{ paddingBottom: 0 }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`btn ${i === 0 ? 'btn--outline' : 'btn--ghost'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {posts.length > 0 ? (
            <div className="grid-2">
              {posts.map(post => (
                <Link href={`/grimoire/${post.slug}`} key={post._id} style={{ textDecoration: 'none' }}>
                  <div className="card">
                    {post.coverMedia?.image && (
                      <div style={{ width: '100%', height: '180px', background: 'var(--color-ink)', borderRadius: 'var(--radius)', marginBottom: 'var(--space-md)', overflow: 'hidden' }}>
                        <img src={post.coverMedia.image.url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-amber)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      {formatPostDate(post.publishedDate)}
                    </p>
                    <h3 style={{ fontSize: '1.3rem' }}>{post.title}</h3>
                    {post.excerpt && <p className="muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{post.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
              <h3>The Grimoire is being filled.</h3>
              <p className="muted" style={{ marginTop: 'var(--space-md)' }}>
                Connect your Wix Blog in the dashboard and posts will appear here automatically.
              </p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
```

---

## FILE: pages/resources.jsx

```jsx
import Layout from '../components/Layout';
import { TOOLS, URLS } from '../lib/constants';

export default function Resources() {
  return (
    <Layout title="Resources" description="Tools Latisha Vincent-Waters actually uses. No fluff, no paid recommendations without disclosure.">
      <div className="container">
        <div className="page-hero">
          <p className="page-hero__eyebrow">Resources</p>
          <h1>Tools I actually use.</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            No fluff. No paid recommendations without disclosure.
            These are the tools that keep Midnight Magnolia running on 10 hours a week.
          </p>
        </div>

        <section className="section">
          <div className="grid-2">
            {TOOLS.map(tool => (
              <a href={tool.url} className="card" key={tool.name} target="_blank" rel="noopener" style={{ display: 'block', textDecoration: 'none' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-magnolia)' }}>{tool.name}</h3>
                <div className="divider" style={{ width: 24 }} />
                <p className="muted" style={{ fontSize: '0.875rem' }}>{tool.desc}</p>
                <span style={{ display: 'inline-block', marginTop: 'var(--space-md)', fontSize: '0.75rem', color: 'var(--color-amber)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Visit →
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="section section--dark" style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
          <h2>Amazon Storefront</h2>
          <div className="divider" />
          <p className="muted" style={{ marginBottom: 'var(--space-lg)' }}>
            Books I actually read. Tools I actually use. Journals, tech, and workspace essentials.
          </p>
          <a href={URLS.amazon} className="btn btn--primary" target="_blank" rel="noopener">Browse the Storefront</a>
        </section>

        <p className="muted" style={{ fontSize: '0.8rem', paddingBottom: 'var(--space-2xl)' }}>
          Some links on this page are affiliate links. I may earn a small commission at no extra cost to you.
          I only recommend tools I use myself.
        </p>
      </div>
    </Layout>
  );
}
```

---

## README: Setup & Deploy

```md
# Midnight Magnolia — Next.js Headless Setup

## 1. Install
npm install

## 2. Environment
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_WIX_CLIENT_ID from:
# Wix Dashboard → Settings → Headless Settings → Create OAuth App

## 3. Wix Dashboard setup
- Enable: Wix Blog, Wix Stores, Wix Bookings
- Blog categories to create: Shadow Work · Southern Gothic · Soft Business School · Literary Archive · Healing Resources
- Upload resume PDFs to Media Manager → paste URLs into .env.local

## 4. Run locally
npm run dev
# → http://localhost:3000

## 5. Deploy to Vercel
npx vercel
# Add env vars in Vercel dashboard → Settings → Environment Variables

## Portfolio Resume URLs
After uploading PDFs to Wix Media Manager:
RESUME_TRACK_A_URL=https://static.wixstatic.com/media/YOUR_FILE.pdf
RESUME_TRACK_B_URL=https://static.wixstatic.com/media/YOUR_FILE.pdf

## Updating content
All URLs, product data, and copy → lib/constants.js
Blog posts → Wix Dashboard (appear automatically via ISR)
Shop products → Wix Dashboard Stores (appear automatically)
```
