import Link from 'next/link';
import Layout from '../components/Layout';
import { PRODUCTS, SERVICES } from '../lib/constants';

// ── Business Status Data ──────────────────────────────────────
// Update these manually as tasks are completed.

const SITE_TASKS = [
  { id: 'footer-wix',     label: 'Remove Wix-branded footer social links',       done: false, priority: 'critical' },
  { id: 'nav-shop',       label: 'Fix Shop nav → Stan Store URL',                 done: false, priority: 'critical' },
  { id: 'nav-about',      label: 'Fix About nav link (build page or redirect)',   done: false, priority: 'critical' },
  { id: 'nav-contact',    label: 'Fix Contact nav link',                          done: false, priority: 'critical' },
  { id: 'nav-grimoire',   label: 'Fix Grimoire submenu links (point to homepage)', done: false, priority: 'critical' },
  { id: 'sanctuary',      label: 'Rebuild The Sanctuary page (remove placeholders)', done: false, priority: 'critical' },
  { id: 'library',        label: 'Rebuild The Library page (choose Option A/B/C)', done: false, priority: 'critical' },
  { id: 'about-page',     label: 'Build standalone About page',                   done: false, priority: 'high' },
  { id: 'email-capture',  label: 'Add email capture form above fold on homepage', done: false, priority: 'high' },
  { id: 'grimoire-page',  label: 'Build The Grimoire page (gated with email optin)', done: false, priority: 'high' },
  { id: 'blog-rename',    label: 'Rename "Blog" to "Dusk Letters" in nav',        done: false, priority: 'high' },
  { id: 'legal-audit',    label: 'Audit legal pages for placeholder content',     done: false, priority: 'high' },
  { id: 'mobile-audit',   label: 'Full mobile audit — every page on iPhone',      done: false, priority: 'medium' },
];

const PRODUCT_TASKS = [
  { id: 'p1', label: 'The Gentle Beginning (FREE) — Design in Canva + upload to Stan Store', done: false, priority: 'critical', price: 'Free' },
  { id: 'p4', label: 'Magnolia Circle ($9/mo) — Set up membership tier + welcome email',    done: false, priority: 'critical', price: '$9/mo' },
  { id: 'p2', label: 'Shadow Work Starter Kit ($9) — Build 30 prompts + design + publish',  done: false, priority: 'critical', price: '$9' },
  { id: 'p3', label: 'Ancestral Healing Journal ($19) — Build + design + publish',          done: false, priority: 'high',     price: '$19' },
  { id: 'p5', label: 'Creative Foundations Workbook ($29) — Build 7 modules + publish',    done: false, priority: 'high',     price: '$29' },
  { id: 'p6', label: 'Deep Roots Shadow Work System ($49) — Bundle + Integration Guide',   done: false, priority: 'medium',   price: '$49' },
];

const STAN_TASKS = [
  { id: 's1', label: 'Configure Stan Store profile (photo, bio, brand colors)',   done: false, priority: 'critical' },
  { id: 's2', label: 'Set up 3-email welcome sequence for freebie (Day 0, 3, 7)', done: false, priority: 'high' },
  { id: 's3', label: 'Set up Magnolia Circle onboarding email',                   done: false, priority: 'high' },
  { id: 's4', label: 'Add upsell offers on product pages',                        done: false, priority: 'medium' },
  { id: 's5', label: 'Publish 1:1 Creative Strategy Session booking ($97–$147)', done: false, priority: 'medium' },
];

const AFFILIATE_PRIORITY = [
  { name: 'Neurodivergent Rebel',    tier: 1, score: '10/10', action: 'Email Lyric Rivera — mention shared ND values',              contact: 'neurodivergentrebel.com/contact' },
  { name: 'Sober Black Girls Club',  tier: 1, score: '10/10', action: 'Send custom email to info@soberblackgirlsclub.com',           contact: 'info@soberblackgirlsclub.com' },
  { name: 'Neurodivergent Insights', tier: 1, score: '9/10',  action: 'Email Dr. Megan Anna Neff — clinical alignment angle',       contact: 'neurodivergentinsights.com/contact' },
  { name: 'Balanced Black Girl',     tier: 1, score: '9/10',  action: 'Email info@balancedblackgirl.com — sisterhood framing',      contact: 'info@balancedblackgirl.com' },
  { name: 'Ancestry.com',            tier: 1, score: '9/10',  action: 'Apply via Partnerize — 10% DNA kits, 20% subscriptions',     contact: 'ancestry.com/c/affiliates' },
  { name: 'MyHeritage',              tier: 1, score: '9/10',  action: 'Apply via Impact/Awin — African diaspora angle',             contact: 'myheritage.com/affiliates' },
  { name: 'Served Up Sober',         tier: 1, score: '9/10',  action: 'DM on Instagram first, then email',                         contact: 'servedupsober.com/contact' },
  { name: 'Sacred Bombshell',        tier: 2, score: '8/10',  action: 'Email Abiola Abrams — Southern Gothic healing angle',        contact: 'abiola@sacredbombshell.com' },
  { name: 'Brown Girl Self-Care',    tier: 2, score: '8/10',  action: 'Open with sisterhood. DM on Instagram first',               contact: '@browngirls_selfcare' },
  { name: 'The Sober Curator',       tier: 2, score: '8/10',  action: 'Submit sober poetry/guest essay first, then pitch',         contact: 'thesobercurator.com/contact' },
];

const DROPSHIP_PRIORITY = [
  { name: 'Printify',       phase: 1, products: 'Branded journal, Magnolia soy candle, tote bag',      action: 'Sign up free — design Phase 1 products' },
  { name: 'Enchanted Soul', phase: 1, products: 'Crystal sets, ritual candles, spell oils',            action: 'Apply at enchantedsoul.store/pages/dropshipping' },
  { name: 'Printful',       phase: 2, products: 'Premium apparel, wall art (Magnolia Circle gifts)',   action: 'Connect to Wix/Stan Store — 20% sample discount' },
  { name: 'Starlinks Gifts',phase: 3, products: 'Gothic healing charm pendants, tarot card bags',     action: 'Apply for wholesale account' },
];

// ── Helpers ───────────────────────────────────────────────────

const PRIORITY_STYLE = {
  critical: { label: 'Critical', color: '#c0392b', bg: 'rgba(192,57,43,0.12)' },
  high:     { label: 'High',     color: '#e67e22', bg: 'rgba(230,126,34,0.12)' },
  medium:   { label: 'Medium',   color: '#7f8c8d', bg: 'rgba(127,140,141,0.12)' },
};

function Badge({ priority }) {
  const s = PRIORITY_STYLE[priority] || PRIORITY_STYLE.medium;
  return (
    <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: s.color, background: s.bg, borderRadius: 4, padding: '2px 8px', whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  );
}

function TaskList({ tasks, title }) {
  const done   = tasks.filter(t => t.done).length;
  const total  = tasks.length;
  const pct    = Math.round((done / total) * 100);

  return (
    <div style={{ marginBottom: 'var(--space-xl)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-md)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span className="muted" style={{ fontSize: '0.85rem' }}>{done}/{total} complete · {pct}%</span>
      </div>
      {/* Progress bar */}
      <div style={{ height: 6, background: 'rgba(201,168,76,0.2)', borderRadius: 3, marginBottom: 'var(--space-md)' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--color-amber)', borderRadius: 3, transition: 'width 0.4s ease' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        {tasks.map(task => (
          <div key={task.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)', padding: '0.75rem 1rem', background: task.done ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: `3px solid ${task.done ? 'var(--color-amber)' : 'rgba(255,255,255,0.1)'}` }}>
            <span style={{ fontSize: '1.1rem', marginTop: 1 }}>{task.done ? '✓' : '○'}</span>
            <span style={{ flex: 1, color: task.done ? 'var(--color-muted)' : 'inherit', textDecoration: task.done ? 'line-through' : 'none', fontSize: '0.9rem' }}>{task.label}{task.price ? <strong style={{ color: 'var(--color-amber)', marginLeft: '0.5rem' }}>{task.price}</strong> : null}</span>
            <Badge priority={task.priority} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export default function Dashboard() {
  const allTasks  = [...SITE_TASKS, ...PRODUCT_TASKS, ...STAN_TASKS];
  const totalDone = allTasks.filter(t => t.done).length;
  const totalAll  = allTasks.length;
  const overallPct = Math.round((totalDone / totalAll) * 100);

  return (
    <Layout>
      <section className="section">
        <div className="container">

          {/* ── Header ──────────────────────────────────────── */}
          <p className="hero__eyebrow">Midnight Magnolia · Business Dashboard</p>
          <h1 style={{ marginBottom: 'var(--space-sm)' }}>Launch Tracker</h1>
          <p className="muted" style={{ maxWidth: '52ch', marginBottom: 'var(--space-xl)' }}>
            Your live status board — site tasks, product builds, Stan Store setup, and affiliate priorities. Update task statuses directly in <code>pages/dashboard.jsx</code>.
          </p>

          {/* ── Overall progress ────────────────────────────── */}
          <div className="card" style={{ marginBottom: 'var(--space-xl)', textAlign: 'center', padding: 'var(--space-xl)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: 'var(--color-amber)' }}>{overallPct}%</span>
            <p className="muted" style={{ marginTop: '0.25rem' }}>Overall launch completion — {totalDone} of {totalAll} tasks done</p>
            <div style={{ height: 8, background: 'rgba(201,168,76,0.15)', borderRadius: 4, marginTop: 'var(--space-md)', maxWidth: 400, margin: 'var(--space-md) auto 0' }}>
              <div style={{ height: '100%', width: `${overallPct}%`, background: 'var(--color-amber)', borderRadius: 4 }} />
            </div>
          </div>

          {/* ── Task sections ───────────────────────────────── */}
          <div className="divider" style={{ marginBottom: 'var(--space-xl)' }} />
          <TaskList tasks={PRODUCT_TASKS} title="Product Builds" />
          <div className="divider" style={{ marginBottom: 'var(--space-xl)' }} />
          <TaskList tasks={STAN_TASKS}    title="Stan Store Setup" />
          <div className="divider" style={{ marginBottom: 'var(--space-xl)' }} />
          <TaskList tasks={SITE_TASKS}    title="Site Tasks (Next.js)" />

          {/* ── Affiliate priorities ────────────────────────── */}
          <div className="divider" style={{ marginBottom: 'var(--space-xl)' }} />
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Affiliate Outreach — Priority Queue</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {AFFILIATE_PRIORITY.map(a => (
              <div key={a.name} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 'var(--space-md)', alignItems: 'start', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: `3px solid ${a.tier === 1 ? 'var(--color-amber)' : 'rgba(255,255,255,0.15)'}` }}>
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>{a.name}</strong>
                  <div className="muted" style={{ fontSize: '0.75rem' }}>Tier {a.tier} · {a.score}</div>
                </div>
                <span className="muted" style={{ fontSize: '0.85rem' }}>{a.action}</span>
                <code style={{ fontSize: '0.72rem', color: 'var(--color-amber)', whiteSpace: 'nowrap', wordBreak: 'break-all' }}>{a.contact}</code>
              </div>
            ))}
          </div>

          {/* ── Dropship roadmap ────────────────────────────── */}
          <div className="divider" style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }} />
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Physical Products — Dropship Roadmap</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {DROPSHIP_PRIORITY.map(d => (
              <div key={d.name} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 2fr', gap: 'var(--space-md)', alignItems: 'start', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-amber)' }}>P{d.phase}</span>
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>{d.name}</strong>
                  <div className="muted" style={{ fontSize: '0.78rem', marginTop: 2 }}>{d.products}</div>
                </div>
                <span className="muted" style={{ fontSize: '0.85rem' }}>{d.action}</span>
              </div>
            ))}
          </div>

          {/* ── Revenue projection ──────────────────────────── */}
          <div className="divider" style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }} />
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Magnolia Circle Revenue Model</h3>
          <div className="grid-3" style={{ marginTop: 'var(--space-md)' }}>
            {[
              { members: 100,  monthly: '$900' },
              { members: 250,  monthly: '$2,250' },
              { members: 500,  monthly: '$4,500' },
            ].map(r => (
              <div className="card" key={r.members} style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-amber)' }}>{r.monthly}</span>
                <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{r.members} members · $9/month</p>
              </div>
            ))}
          </div>

          {/* ── Quick links ─────────────────────────────────── */}
          <div className="divider" style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }} />
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Quick Links</h3>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <a href="https://stan.store/MidnightMagnoliaSC" className="btn btn--outline" target="_blank" rel="noopener">Stan Store</a>
            <a href="https://www.midnight-magnolia.com" className="btn btn--outline" target="_blank" rel="noopener">Wix Site</a>
            <Link href="/shop" className="btn btn--outline">Shop Page</Link>
            <Link href="/sanctuary" className="btn btn--outline">The Sanctuary</Link>
            <Link href="/grimoire" className="btn btn--outline">The Grimoire</Link>
            <a href="https://gumroad.com/midnightmagnolia" className="btn btn--outline" target="_blank" rel="noopener">Gumroad</a>
          </div>

        </div>
      </section>
    </Layout>
  );
}
