// pages/dashboard.jsx
// Unified dashboard: Supabase (tasks + genealogy) + Notion (content) + Airtable (all 3 bases)
// Each integration degrades gracefully — shows "Connect" state until env vars are added.

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

// ── Static data (no DB needed) ────────────────────────────────
const DROPSHIP = [
  { name: 'Printify',        phase: 1, products: 'Branded journal, Magnolia soy candle, tote bag',    action: 'Sign up free — design Phase 1 products' },
  { name: 'Enchanted Soul',  phase: 1, products: 'Crystal sets, ritual candles, spell oils',          action: 'Apply at enchantedsoul.store/pages/dropshipping' },
  { name: 'Printful',        phase: 2, products: 'Premium apparel, wall art (Magnolia Circle gifts)',  action: 'Connect to Wix/Stan Store — 20% sample discount' },
  { name: 'Starlinks Gifts', phase: 3, products: 'Gothic healing charm pendants, tarot card bags',    action: 'Apply for wholesale account' },
];

// ── Priority + status styling ──────────────────────────────────
const PRI = {
  critical: { label: 'Critical', color: '#c0392b', bg: 'rgba(192,57,43,0.14)' },
  high:     { label: 'High',     color: '#e67e22', bg: 'rgba(230,126,34,0.14)' },
  medium:   { label: 'Medium',   color: '#7f8c8d', bg: 'rgba(127,140,141,0.14)' },
};

const STATUS_COLOR = {
  'Draft':          '#7f8c8d',
  'Ready':          '#e67e22',
  'Scheduled':      '#2980b9',
  'Published':      '#27ae60',
  'Sent':           '#27ae60',
  'Idea':           '#7f8c8d',
  'Not Started':    '#7f8c8d',
  'In Progress':    '#e67e22',
  'Design':         '#2980b9',
  'Live':           '#27ae60',
  'Not Contacted':  '#7f8c8d',
  'Reached Out':    '#e67e22',
  'In Discussion':  '#2980b9',
};

// ── Shared components ─────────────────────────────────────────
function Badge({ priority }) {
  const s = PRI[priority?.toLowerCase()] || PRI.medium;
  return (
    <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: s.color, background: s.bg, borderRadius: 4, padding: '2px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}>
      {s.label}
    </span>
  );
}

function StatusPill({ status }) {
  const color = STATUS_COLOR[status] ?? '#7f8c8d';
  return (
    <span style={{ fontSize: '0.7rem', fontWeight: 600, color, background: `${color}22`, borderRadius: 99, padding: '2px 10px', whiteSpace: 'nowrap' }}>
      {status || '—'}
      {status}
    </span>
  );
}

function SectionHeader({ title, sub, source }) {
  const SOURCE_STYLE = { Notion: '#c0a0f0', Airtable: '#f7ae3f', Supabase: '#3ecf8e' };
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-md)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      {sub    && <span className="muted" style={{ fontSize: '0.85rem' }}>{sub}</span>}
      {source && <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', color: SOURCE_STYLE[source] ?? '#aaa', background: `${SOURCE_STYLE[source] ?? '#aaa'}22`, borderRadius: 4, padding: '1px 7px' }}>{source}</span>}
    </div>
  );
}

function NotConnected({ name, hint }) {
  return (
    <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px dashed rgba(255,255,255,0.12)', color: 'var(--color-muted)', fontSize: '0.85rem' }}>
      <strong style={{ color: 'inherit' }}>{name} not connected.</strong> {hint}
    </div>
  );
}

function EmptyPanel({ text }) {
  return (
    <div style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px dashed rgba(255,255,255,0.08)', color: 'var(--color-muted)', fontSize: '0.85rem' }}>
      {text}
    </div>
  );
}

function ProgressBar({ done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
      <div style={{ flex: 1, height: 6, background: 'rgba(201,168,76,0.18)', borderRadius: 3 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--color-amber)', borderRadius: 3, transition: 'width 0.4s ease' }} />
      </div>
      <span className="muted" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{done}/{total} · {pct}%</span>
    </div>
  );
}

// ── Supabase task list ────────────────────────────────────────
function TaskList({ tasks, title, onToggle, saving, source = 'Supabase' }) {
  const done = tasks.filter(t => t.done).length;
  return (
    <div style={{ marginBottom: 'var(--space-xl)' }}>
      <SectionHeader title={title} source={source} />
      <div style={{ marginBottom: 'var(--space-md)' }}>
        <ProgressBar done={done} total={tasks.length} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tasks.map(task => (
          <button
            key={task.id}
            onClick={() => onToggle(task.id, !task.done)}
            disabled={saving}
            style={{ all: 'unset', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)', padding: '0.7rem 1rem', background: task.done ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: `3px solid ${task.done ? 'var(--color-amber)' : 'rgba(255,255,255,0.1)'}`, cursor: saving ? 'not-allowed' : 'pointer', width: '100%', boxSizing: 'border-box', textAlign: 'left' }}
          >
            <span style={{ fontSize: '1rem', marginTop: 2, color: task.done ? 'var(--color-amber)' : 'var(--color-muted)', flexShrink: 0 }}>{task.done ? '✓' : '○'}</span>
            <span style={{ flex: 1, color: task.done ? 'var(--color-muted)' : 'inherit', textDecoration: task.done ? 'line-through' : 'none', fontSize: '0.87rem' }}>
              {task.label}
              {task.price && <strong style={{ color: 'var(--color-amber)', marginLeft: '0.5rem' }}>{task.price}</strong>}
            </span>
            <Badge priority={task.priority} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Notion content calendar ───────────────────────────────────
function ContentCalendar({ items }) {
  if (!items?.length) return <NotConnected name="Notion Content Calendar" hint="Add NOTION_TOKEN + NOTION_DB_CONTENT_CALENDAR to .env.local, share the DB with your integration, and restart." />;

  const upcoming = items.filter(i => i.status !== 'Published').slice(0, 8);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {upcoming.map(item => (
        <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 'var(--space-md)', alignItems: 'center', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: '3px solid rgba(192,160,240,0.4)' }}>
          <div>
            <span style={{ fontSize: '0.87rem' }}>{item.name}</span>
            {item.type && <span className="muted" style={{ fontSize: '0.72rem', marginLeft: '0.5rem' }}>· {item.type}</span>}
            {item.publishDate && <div className="muted" style={{ fontSize: '0.72rem', marginTop: 2 }}>{new Date(item.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>}
          </div>
          {item.tags?.length > 0 && <span className="muted" style={{ fontSize: '0.7rem' }}>{item.tags[0]}</span>}
          <StatusPill status={item.status} />
        </a>
      ))}
    </div>
  );
}

// ── Notion Dusk Letters drafts ────────────────────────────────
function DuskLettersDrafts({ items }) {
  if (!items?.length) return <NotConnected name="Dusk Letters DB" hint="Add NOTION_DB_DUSK_LETTERS to .env.local." />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map(item => (
        <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 'var(--space-md)', alignItems: 'center', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: '3px solid rgba(192,160,240,0.4)' }}>
          <div>
            <span style={{ fontSize: '0.87rem' }}>{item.title}</span>
            {item.theme && <div className="muted" style={{ fontSize: '0.72rem', marginTop: 2 }}>{item.theme}</div>}
          </div>
          {item.sendDate && <span className="muted" style={{ fontSize: '0.72rem' }}>{new Date(item.sendDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
          <StatusPill status={item.status} />
        </a>
      ))}
    </div>
  );
}

// ── Airtable content pipeline ─────────────────────────────────
function ContentPipeline({ items, onStatusChange, saving }) {
  if (!items?.length) return <NotConnected name="Airtable Content Pipeline" hint="Add AIRTABLE_API_KEY + AIRTABLE_BASE_ID to .env.local and create a 'Content Pipeline' table." />;

  const STATUS_OPTIONS = ['Idea', 'Draft', 'Ready', 'Published'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.slice(0, 10).map(item => (
        <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 'var(--space-md)', alignItems: 'center', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: '3px solid rgba(247,174,63,0.4)' }}>
          <div>
            <span style={{ fontSize: '0.87rem' }}>{item.title}</span>
            <div style={{ display: 'flex', gap: 6, marginTop: 3, flexWrap: 'wrap' }}>
              {item.type      && <span className="muted" style={{ fontSize: '0.7rem' }}>{item.type}</span>}
              {item.platform?.map(p => <span key={p} className="muted" style={{ fontSize: '0.7rem' }}>· {p}</span>)}
              {item.isAffiliate && <span style={{ fontSize: '0.68rem', color: 'var(--color-amber)' }}>· Affiliate</span>}
            </div>
          </div>
          {item.publishDate && <span className="muted" style={{ fontSize: '0.72rem' }}>{new Date(item.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
          <select
            value={item.status}
            disabled={saving}
            aria-label={`Status for ${item.title}`}
            onChange={(e) => onStatusChange(item.id, e.target.value)}
            style={{ all: 'unset', fontSize: '0.7rem', fontWeight: 600, color: STATUS_COLOR[item.status] ?? '#aaa', background: `${STATUS_COLOR[item.status] ?? '#aaa'}22`, borderRadius: 99, padding: '2px 10px', cursor: 'pointer' }}
          >
            {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ background: '#1a1d2e', color: '#fff' }}>{s}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
}

// ── Airtable affiliate tracker ────────────────────────────────
function AirtableAffiliates({ partners, onStatusChange, saving }) {
  if (partners === null) {
    return <NotConnected name="Airtable Affiliate Partners" hint="Add AIRTABLE_API_KEY + AIRTABLE_BASE_ID to .env.local and create an 'Affiliate Partners' table (see lib/airtable.js)." />;
  }
  if (!partners.length) return <EmptyPanel text="No affiliate rows yet." />;

  const STATUS_OPTIONS = ['Not Contacted', 'Reached Out', 'In Discussion', 'Live'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {partners.map(a => (
        <div key={a.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 'var(--space-md)', alignItems: 'start', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: `3px solid ${a.tier === 1 ? 'var(--color-amber)' : 'rgba(255,255,255,0.12)'}` }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <strong style={{ fontSize: '0.87rem' }}>{a.name}</strong>
              <span className="muted" style={{ fontSize: '0.7rem' }}>T{a.tier} · {a.score}</span>
              {a.commission && <span style={{ fontSize: '0.7rem', color: 'var(--color-amber)' }}>{a.commission}</span>}
            </div>
            <div className="muted" style={{ fontSize: '0.78rem', marginTop: 2 }}>{a.action}</div>
          </div>
          <code style={{ fontSize: '0.68rem', color: 'var(--color-amber)', wordBreak: 'break-all' }}>{a.contact}</code>
          <select
            value={a.status}
            disabled={saving}
            aria-label={`Status for ${a.name}`}
            onChange={(e) => onStatusChange(a.id, e.target.value)}
            style={{ all: 'unset', fontSize: '0.7rem', fontWeight: 600, color: STATUS_COLOR[a.status] ?? '#aaa', background: `${STATUS_COLOR[a.status] ?? '#aaa'}22`, borderRadius: 99, padding: '2px 10px', cursor: 'pointer' }}
          >
            {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ background: '#1a1d2e', color: '#fff' }}>{s}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
}

// ── Airtable services tracker (Wix Bookings inventory) ───────
function AirtableServices({ services }) {
  if (services === null) {
    return <NotConnected name="Airtable Services" hint="Import data/inventory-services.csv into the Midnight Operations base, then set AIRTABLE_TBL_SERVICES in .env.local." />;
  }
  if (!services.length) return <EmptyPanel text="No service rows in Airtable yet — import data/inventory-services.csv." />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {services.map(s => {
        const gaps = [];
        if (!s.hasImage)       gaps.push('img');
        if (!s.hasTagline)     gaps.push('tag');
        if (!s.hasDescription) gaps.push('desc');
        const allReady = gaps.length === 0;
        return (
          <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 'var(--space-md)', alignItems: 'center', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: `3px solid ${allReady ? 'rgba(46,204,113,0.5)' : 'rgba(247,174,63,0.5)'}` }}>
            <div>
              <span style={{ fontSize: '0.87rem' }}>{s.name}</span>
              <div className="muted" style={{ fontSize: '0.72rem', marginTop: 2 }}>{s.tagline || s.category || '—'}</div>
            </div>
            <span className="muted" style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}>{s.price || '—'} · {s.durationMinutes ? `${s.durationMinutes}m` : '—'}</span>
            <span style={{ fontSize: '0.68rem', fontWeight: 600, color: allReady ? '#27ae60' : '#e67e22' }}>
              {allReady ? '✓ ready' : `gaps: ${gaps.join(', ')}`}
            </span>
            {s.bookingUrl ? (
              <a href={s.bookingUrl} target="_blank" rel="noopener" className="muted" style={{ fontSize: '0.7rem', color: 'var(--color-amber)' }}>open ↗</a>
            ) : <span style={{ width: 36 }} />}
          </div>
        );
      })}
    </div>
  );
}

function AirtableProducts({ items }) {
  if (items === null) {
    return <NotConnected name="Airtable Products" hint="Create the Products table in MM Command (see lib/airtable.js)." />;
  }
  if (!items.length) return <EmptyPanel text="No rows in Products yet." />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.slice(0, 12).map(row => (
        <div key={row.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 'var(--space-md)', alignItems: 'center', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: '3px solid rgba(247,174,63,0.35)' }}>
          <div>
            <span style={{ fontSize: '0.87rem' }}>{row.name}</span>
            <div className="muted" style={{ fontSize: '0.72rem', marginTop: 2 }}>{row.sku || '— SKU'}</div>
          </div>
          <span className="muted" style={{ fontSize: '0.72rem' }}>Whole {row.wholesale ?? '—'} · Retail {row.retail ?? '—'}</span>
          <StatusPill status={row.status} />
        </div>
      ))}
    </div>
  );
}

// ── Revenue panel ─────────────────────────────────────────────
function RevenueLog({ months }) {
  if (!months?.length) return <NotConnected name="Monthly Revenue Log" hint="Add AIRTABLE_BASE_ID + create 'Monthly Revenue Log' table in Airtable." />;
  const latest = months[0];
  const goal   = 4000;
  const pct    = Math.min(100, Math.round(((latest.totalRevenue ?? 0) / goal) * 100));
  return (
    <div>
      <div className="grid-3" style={{ marginBottom: 'var(--space-md)' }}>
        {[
          { label: 'Total MTD',    value: `$${(latest.totalRevenue ?? 0).toLocaleString()}` },
          { label: 'Goal ($4k)',   value: `${pct}%` },
          { label: 'Gap to Goal', value: `$${(latest.goalGap ?? 0).toLocaleString()}` },
        ].map(m => (
          <div className="card" key={m.label} style={{ textAlign: 'center', padding: 'var(--space-md)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-amber)' }}>{m.value}</span>
            <p className="muted" style={{ fontSize: '0.75rem', marginTop: 4 }}>{m.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[
          { label: 'Stan Store',  value: latest.stanRevenue },
          { label: 'Patreon',     value: latest.patreonRevenue },
          { label: 'Gumroad',     value: latest.gumroadRevenue },
          { label: 'KDP',         value: latest.kdpRoyalties },
          { label: 'Other',       value: latest.otherRevenue },
        ].map(s => (
          <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 8, alignItems: 'center', fontSize: '0.82rem' }}>
            <span className="muted">{s.label}</span>
            <div style={{ height: 4, background: 'rgba(201,168,76,0.1)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${Math.min(100, ((s.value ?? 0) / goal) * 100)}%`, background: 'var(--color-amber)', borderRadius: 2 }} />
            </div>
            <span style={{ color: 'var(--color-amber)', minWidth: 40, textAlign: 'right' }}>${(s.value ?? 0).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Career Command panel ──────────────────────────────────────
function CareerPanel({ jobs, resumes, mlis }) {
  const activeJobs = jobs?.filter(j => !['Rejected', 'Withdrawn'].includes(j.status)) ?? [];
  return (
    <div>
      {/* MLIS programs */}
      {mlis?.length > 0 && (
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 6 }}>MLIS Programs</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {mlis.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: `3px solid ${p.priority === 'Top Choice' ? 'var(--color-amber)' : 'rgba(255,255,255,0.1)'}` }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{p.programName}</span>
                  <span className="muted" style={{ fontSize: '0.72rem', marginLeft: 8 }}>· {p.institution}</span>
                  <div style={{ display: 'flex', gap: 5, marginTop: 2, flexWrap: 'wrap' }}>
                    {p.alaAccredited && <span style={{ fontSize: '0.65rem', color: '#3ecf8e' }}>ALA ✓</span>}
                    {p.hbcu          && <span style={{ fontSize: '0.65rem', color: '#f7ae3f' }}>HBCU ✓</span>}
                    {p.inStateTuition && <span style={{ fontSize: '0.65rem', color: '#3ecf8e' }}>In-State ✓</span>}
                    <span className="muted" style={{ fontSize: '0.65rem' }}>{p.format}</span>
                  </div>
                </div>
                <StatusPill status={p.priority} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active job applications */}
      {activeJobs.length > 0 && (
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 6 }}>Active Applications ({activeJobs.length})</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {activeJobs.slice(0, 8).map(j => (
              <div key={j.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 8, alignItems: 'center', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                <div>
                  <span style={{ fontSize: '0.85rem' }}>{j.roleTitle}</span>
                  <span className="muted" style={{ fontSize: '0.72rem', marginLeft: 6 }}>· {j.company}</span>
                  <div className="muted" style={{ fontSize: '0.68rem' }}>{j.track} · {j.remote ? 'Remote' : j.location}</div>
                </div>
                {j.salaryMin > 0 && <span style={{ fontSize: '0.72rem', color: 'var(--color-amber)', whiteSpace: 'nowrap' }}>${j.salaryMin.toLocaleString()}–${j.salaryMax.toLocaleString()}</span>}
                <StatusPill status={j.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resume tracks */}
      {resumes?.length > 0 && (
        <div>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 6 }}>Resume Vault ({resumes.length} active)</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {resumes.map(r => (
              <a key={r.id} href={r.fileUrl || '#'} target="_blank" rel="noopener" style={{ textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-amber)', background: 'rgba(201,168,76,0.1)', borderRadius: 99, padding: '3px 10px', border: '1px solid rgba(201,168,76,0.25)' }}>
                {r.versionName}
              </a>
            ))}
          </div>
        </div>
      )}

      {!mlis?.length && !activeJobs.length && !resumes?.length && (
        <NotConnected name="Career Command" hint="Add AIRTABLE_CAREER_BASE_ID to .env.local and create the Career Command base." />
      )}
    </div>
  );
}

// ── Genealogy stats panel ─────────────────────────────────────
function GenealogyPanel({ stats }) {
  if (!stats) return <NotConnected name="Genealogy Database" hint="Run: node scripts/seed-genealogy.mjs after adding SUPABASE_SERVICE_ROLE_KEY to .env.local." />;
  return (
    <div>
      <div className="grid-3" style={{ marginBottom: 'var(--space-md)' }}>
        {[
          { label: 'Total Individuals', value: stats.total },
          { label: 'Vincent Line',      value: stats.vincentLine },
          { label: 'Caswell County',    value: stats.caswellCounty },
        ].map(s => (
          <div className="card" key={s.label} style={{ textAlign: 'center', padding: 'var(--space-md)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-amber)' }}>{s.value}</span>
            <p className="muted" style={{ fontSize: '0.72rem', marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <a href="/api/genealogy?type=people" target="_blank" className="btn btn--outline" style={{ fontSize: '0.8rem' }}>Browse Individuals API</a>
        <a href="/api/genealogy?type=search&q=Vincent" target="_blank" className="btn btn--outline" style={{ fontSize: '0.8rem' }}>Search Vincents</a>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function Dashboard() {
  // Supabase state
  const [tasks,    setTasks]    = useState([]);
  const [genealogyStats, setGenealogyStats] = useState(null);
  // Notion state
  const [calendar, setCalendar] = useState(null);
  const [duskLetters, setDuskLetters] = useState(null);
  // Airtable — MM Operations
  const [pipeline,     setPipeline]     = useState(null);
  const [atAffiliates, setAtAffiliates] = useState(null);
  const [atServices,   setAtServices]   = useState(null);
  const [revenue,      setRevenue]      = useState(null);
  // Airtable — Writing / Creative base
  const [jobs,    setJobs]    = useState(null);
  const [resumes, setResumes] = useState(null);
  // UI state
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [errors,   setErrors]   = useState({});

  useEffect(() => {
    async function load() {
      setLoading(true);
      const errs = {};

      // All fetches run in parallel — failures are isolated
      const [taskRes, geoRes, notionRes, pipelineRes, atAffRes, atSvcRes, revenueRes, jobsRes, resumesRes] =
        await Promise.allSettled([
          fetch('/api/tasks').then(r => r.json()),
          fetch('/api/genealogy?type=people').then(r => r.json()),
          fetch('/api/notion/content').then(r => r.json()),
          fetch('/api/airtable/operations?table=content').then(r => r.json()),
          fetch('/api/airtable/operations?table=affiliatePipeline').then(r => r.json()),
          fetch('/api/airtable/operations?table=services').then(r => r.json()),
          fetch('/api/airtable/career?table=income&limit=1').then(r => r.json()),
          fetch('/api/airtable/career?table=opportunities').then(r => r.json()),
          fetch('/api/airtable/career?table=resumes').then(r => r.json()),
        ]);

      if (taskRes.status === 'fulfilled' && !taskRes.value.error) {
        setTasks(taskRes.value);
      } else {
        errs.tasks = taskRes.value?.error ?? taskRes.reason?.message;
      }

      if (geoRes.status === 'fulfilled' && Array.isArray(geoRes.value)) {
        const people = geoRes.value;
        setGenealogyStats({
          total:        people.length,
          vincentLine:  people.filter(p => p.is_vincent_line).length,
          caswellCounty: people.filter(p => p.is_caswell_county).length,
        });
      }

      if (notionRes.status === 'fulfilled' && !notionRes.value.error) {
        setCalendar(notionRes.value.calendar ?? []);
        setDuskLetters(notionRes.value.duskLetters ?? []);
      }

      if (pipelineRes.status === 'fulfilled' && !pipelineRes.value.error) {
        setPipeline(Array.isArray(pipelineRes.value) ? pipelineRes.value : null);
      }

      if (atAffRes.status === 'fulfilled' && !atAffRes.value.error) {
        setAtAffiliates(Array.isArray(atAffRes.value) ? atAffRes.value : null);
      }

      // services: null (uninitialised) when AIRTABLE_TBL_SERVICES env var is missing;
      // array (possibly empty) when the table exists.
      if (atSvcRes.status === 'fulfilled' && !atSvcRes.value?.error) {
        setAtServices(Array.isArray(atSvcRes.value) ? atSvcRes.value : null);
      }

      if (revenueRes.status === 'fulfilled' && Array.isArray(revenueRes.value)) {
        setRevenue(revenueRes.value);
      }

      if (jobsRes.status === 'fulfilled' && Array.isArray(jobsRes.value))     setJobs(jobsRes.value);
      if (resumesRes.status === 'fulfilled' && Array.isArray(resumesRes.value)) setResumes(resumesRes.value);

      setErrors(errs);
      setLoading(false);
    }
    load();
  }, []);

  // Supabase task toggle
  const toggleTask = useCallback(async (id, done) => {
    setSaving(true);
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done } : t));
    try {
      const res = await fetch('/api/tasks', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, done }) });
      if (!res.ok) throw new Error();
    } catch {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !done } : t));
    } finally { setSaving(false); }
  }, []);

  // Airtable pipeline status update
  const updatePipelineStatus = useCallback(async (id, status) => {
    setSaving(true);
    setPipeline(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    try {
      await fetch('/api/airtable/pipeline', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    } catch { /* silently revert isn't critical here */ }
    finally { setSaving(false); }
  }, []);

  // Airtable affiliate status update
  const updateAffiliateStatus = useCallback(async (id, status) => {
    setSaving(true);
    setAtAffiliates(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    try {
      await fetch('/api/airtable/affiliates', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    } catch { /* */ }
    finally { setSaving(false); }
  }, []);

  // ── Derived ────────────────────────────────────────────────
  const byCategory   = cat => tasks.filter(t => t.category === cat);
  const allDone      = tasks.filter(t => t.done).length;
  const overallPct   = tasks.length ? Math.round((allDone / tasks.length) * 100) : 0;
  const divider      = <div className="divider" style={{ margin: 'var(--space-xl) 0' }} />;

  return (
    <Layout>
      <section className="section">
        <div className="container">

          {/* ── Header ─────────────────────────────────────── */}
          <p className="hero__eyebrow">Midnight Magnolia · Business Dashboard</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-lg)', flexWrap: 'wrap', marginBottom: 'var(--space-sm)' }}>
            <h1 style={{ margin: 0 }}>Launch Tracker</h1>
            {saving && <span className="muted" style={{ fontSize: '0.8rem' }}>Saving…</span>}
          </div>
          <p className="muted" style={{ maxWidth: '52ch', marginBottom: 'var(--space-xl)' }}>
            Supabase · Notion · Airtable (3 bases) — one view. Tasks toggle on click. Statuses update in place.
          </p>

          {/* ── Integration status pills ────────────────────── */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
            {[
              { name: 'Supabase',         connected: tasks.length > 0,      color: '#3ecf8e' },
              { name: 'Genealogy DB',      connected: !!genealogyStats,      color: '#3ecf8e' },
              { name: 'Notion',           connected: calendar !== null,      color: '#c0a0f0' },
              { name: 'MM Operations',  connected: pipeline !== null, color: '#f7ae3f' },
              { name: 'Services Inv.',  connected: atServices !== null, color: '#f7ae3f' },
              { name: 'Writing Base',   connected: jobs !== null,     color: '#f7ae3f' },
            ].map(s => (
              <span key={s.name} style={{ fontSize: '0.75rem', fontWeight: 600, color: s.connected ? s.color : '#7f8c8d', background: s.connected ? `${s.color}22` : 'rgba(127,140,141,0.12)', borderRadius: 99, padding: '4px 12px', border: `1px solid ${s.connected ? `${s.color}44` : 'rgba(127,140,141,0.2)'}` }}>
                {s.connected ? '● ' : '○ '}{s.name}
              </span>
            ))}
          </div>

          {/* ── Supabase error ───────────────────────────────── */}
          {errors.tasks && (
            <div style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.4)', borderRadius: 8, padding: '1rem', marginBottom: 'var(--space-lg)', color: '#e74c3c', fontSize: '0.85rem' }}>
              <strong>Supabase error:</strong> {errors.tasks} — check .env.local and run the schema.
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--color-muted)' }}>Loading dashboard…</div>
          ) : (
            <>
              {/* ── Overall progress ─────────────────────────── */}
              <div className="card" style={{ marginBottom: 'var(--space-xl)', textAlign: 'center', padding: 'var(--space-xl)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: 'var(--color-amber)' }}>{overallPct}%</span>
                <p className="muted" style={{ marginTop: '0.25rem' }}>Overall launch — {allDone} of {tasks.length} tasks complete</p>
                <div style={{ height: 8, background: 'rgba(201,168,76,0.15)', borderRadius: 4, marginTop: 'var(--space-md)', maxWidth: 400, margin: 'var(--space-md) auto 0' }}>
                  <div style={{ height: '100%', width: `${overallPct}%`, background: 'var(--color-amber)', borderRadius: 4, transition: 'width 0.4s ease' }} />
                </div>
              </div>

              {/* ── SUPABASE: Task checklists ────────────────── */}
              {divider}
              <TaskList tasks={byCategory('product')} title="Product Builds"       onToggle={toggleTask} saving={saving} />
              {divider}
              <TaskList tasks={byCategory('stan')}    title="Stan Store Setup"     onToggle={toggleTask} saving={saving} />
              {divider}
              <TaskList tasks={byCategory('site')}    title="Site Tasks (Next.js)" onToggle={toggleTask} saving={saving} />

              {/* ── NOTION: Content Calendar ─────────────────── */}
              {divider}
              <SectionHeader title="Content Calendar" sub={calendar?.length ? `${calendar.filter(i => i.status !== 'Published').length} upcoming` : ''} source="Notion" />
              <ContentCalendar items={calendar} />

              {/* ── NOTION: Dusk Letters drafts ──────────────── */}
              {divider}
              <SectionHeader title="Dusk Letters — Upcoming" sub={duskLetters?.length ? `${duskLetters.length} in queue` : ''} source="Notion" />
              <DuskLettersDrafts items={duskLetters} />

              {/* ── AIRTABLE: Content Pipeline ───────────────── */}
              {divider}
              <SectionHeader title="Content Pipeline" sub={pipeline?.length ? `${pipeline.length} active pieces` : ''} source="Airtable" />
              <ContentPipeline items={pipeline} onStatusChange={updatePipelineStatus} saving={saving} />

              {/* ── AIRTABLE: Affiliate Tracker ──────────────── */}
              {divider}
              <SectionHeader
                title="Affiliate Outreach"
                sub={atAffiliates?.length ? `${atAffiliates.filter(a => a.status === 'Partner').length} live · ${atAffiliates.filter(a => a.status === 'Replied').length} replied` : ''}
                source="Airtable"
              />
              <AirtableAffiliates partners={atAffiliates} onStatusChange={updateAffiliateStatus} saving={saving} />

              {/* ── AIRTABLE: Services Inventory (Wix Bookings) ─ */}
              {divider}
              <SectionHeader
                title="Services Inventory"
                sub={atServices?.length ? `${atServices.length} services · ${atServices.filter(s => s.hasImage && s.hasTagline && s.hasDescription).length} fully ready` : ''}
                source="Airtable"
              />
              <AirtableServices services={atServices} />

              {/* ── AIRTABLE: Monthly Revenue ────────────────── */}
              {divider}
              <SectionHeader
                title={`Revenue — ${revenue?.[0]?.month ?? 'Current Month'}`}
                sub="vs $4,000/mo goal"
                source="Airtable"
              />
              <RevenueLog months={revenue} />

              {/* ── CAREER COMMAND ───────────────────────────── */}
              {divider}
              <SectionHeader
                title="Career Command"
                sub={jobs?.length ? `${jobs.filter(j => !['Rejected','Withdrawn'].includes(j.status)).length} active applications` : ''}
                source="Airtable"
              />
              <CareerPanel jobs={jobs} resumes={resumes} mlis={null} />

              {/* ── SUPABASE: Genealogy ──────────────────────── */}
              {divider}
              <SectionHeader
                title="Vincent Family Tree"
                sub={genealogyStats ? `${genealogyStats.total} individuals · ${genealogyStats.vincentLine} Vincent line` : ''}
                source="Supabase"
              />
              <GenealogyPanel stats={genealogyStats} />

              {/* ── Dropship roadmap (static) ────────────────── */}
              {divider}
              <SectionHeader title="Physical Products — Dropship Roadmap" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {DROPSHIP.map(d => (
                  <div key={d.name} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 2fr', gap: 'var(--space-md)', alignItems: 'start', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-amber)' }}>P{d.phase}</span>
                    <div>
                      <strong style={{ fontSize: '0.88rem' }}>{d.name}</strong>
                      <div className="muted" style={{ fontSize: '0.75rem', marginTop: 2 }}>{d.products}</div>
                    </div>
                    <span className="muted" style={{ fontSize: '0.83rem' }}>{d.action}</span>
                  </div>
                ))}
              </div>

              {/* ── Revenue projections ──────────────────────── */}
              {divider}
              <SectionHeader title="Magnolia Circle Revenue Model" />
              <div className="grid-3" style={{ marginTop: 'var(--space-md)' }}>
                {[{ members: 100, monthly: '$900' }, { members: 250, monthly: '$2,250' }, { members: 500, monthly: '$4,500' }].map(r => (
                  <div className="card" key={r.members} style={{ textAlign: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-amber)' }}>{r.monthly}</span>
                    <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{r.members} members · $9/month</p>
                  </div>
                ))}
              </div>

              {/* ── Quick links ──────────────────────────────── */}
              {divider}
              <SectionHeader title="Quick Links" />
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <a href="https://stan.store/MidnightMagnoliaSC"                                    className="btn btn--outline" target="_blank" rel="noopener">Stan Store</a>
                <a href="https://www.midnight-magnolia.com"                                         className="btn btn--outline" target="_blank" rel="noopener">Wix Site</a>
                <a href={`https://supabase.com/dashboard/project/ucgdtqkzjibsevgmnlqj`}            className="btn btn--outline" target="_blank" rel="noopener">Supabase</a>
                <a href="https://notion.so"                                                         className="btn btn--outline" target="_blank" rel="noopener">Notion</a>
                <a href="https://airtable.com"                                                      className="btn btn--outline" target="_blank" rel="noopener">Airtable</a>
                <a href="https://ancestry.com"                                                      className="btn btn--outline" target="_blank" rel="noopener">Ancestry.com</a>
                <Link href="/shop"      className="btn btn--outline">Shop Page</Link>
                <Link href="/sanctuary" className="btn btn--outline">The Sanctuary</Link>
                <Link href="/grimoire"  className="btn btn--outline">The Grimoire</Link>
              </div>
            </>
          )}

        </div>
      </section>
    </Layout>
  );
}
