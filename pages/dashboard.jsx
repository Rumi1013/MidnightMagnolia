// pages/dashboard.jsx
// Unified dashboard: Supabase (tasks) + Notion + Airtable. Each integration degrades
// gracefully until configured (see lib/notion.js + lib/airtable.js comments).

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const DROPSHIP = [
  { name: 'Printify',        phase: 1, products: 'Branded journal, Magnolia soy candle, tote bag',    action: 'Sign up free — design Phase 1 products' },
  { name: 'Enchanted Soul',  phase: 1, products: 'Crystal sets, ritual candles, spell oils',          action: 'Apply at enchantedsoul.store/pages/dropshipping' },
  { name: 'Printful',        phase: 2, products: 'Premium apparel, wall art (Magnolia Circle gifts)',  action: 'Connect to Wix/Stan Store — 20% sample discount' },
  { name: 'Starlinks Gifts', phase: 3, products: 'Gothic healing charm pendants, tarot card bags',    action: 'Apply for wholesale account' },
];

const PRI = {
  critical: { label: 'Critical', color: '#c0392b', bg: 'rgba(192,57,43,0.14)' },
  high:     { label: 'High',     color: '#e67e22', bg: 'rgba(230,126,34,0.14)' },
  medium:   { label: 'Medium',   color: '#7f8c8d', bg: 'rgba(127,140,141,0.14)' },
};

const STATUS_COLOR = {
  Draft: '#7f8c8d',
  Ready: '#e67e22',
  Scheduled: '#2980b9',
  Published: '#27ae60',
  Sent: '#27ae60',
  Idea: '#7f8c8d',
  'Not Started': '#7f8c8d',
  'In Progress': '#e67e22',
  Design: '#2980b9',
  Live: '#27ae60',
  'Not Contacted': '#7f8c8d',
  'Reached Out': '#e67e22',
  'In Discussion': '#2980b9',
};

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
  return <p className="muted" style={{ fontSize: '0.85rem', margin: 0 }}>{text}</p>;
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
            type="button"
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

function ContentCalendar({ items }) {
  if (items === null) {
    return <NotConnected name="Notion Content Calendar" hint="Set NOTION_TOKEN + NOTION_DB_CONTENT_CALENDAR (and sibling DB IDs) in .env.local per lib/notion.js, invite the integration in Notion → Share." />;
  }
  if (!items.length) return <EmptyPanel text="No upcoming items yet — pull dates into Published when live." />;
  const upcoming = items.filter(i => i.status !== 'Published').slice(0, 8);
  if (!upcoming.length) return <EmptyPanel text="Nothing scheduled ahead — all listed items are published or queue is empty." />;
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

function DuskLettersDrafts({ items }) {
  if (items === null) {
    return <NotConnected name="Dusk Letters" hint="Set NOTION_DB_DUSK_LETTERS in .env.local (see lib/notion.js)." />;
  }
  if (!items.length) return <EmptyPanel text="No letters in queue." />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.slice(0, 12).map(item => (
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

function NotionProductTracker({ items }) {
  if (items === null) {
    return <NotConnected name="Notion Product Tracker" hint="Set NOTION_DB_PRODUCT_TRACKER in .env.local (see lib/notion.js)." />;
  }
  if (!items.length) return <EmptyPanel text="No products in Notion yet." />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.slice(0, 12).map(item => (
        <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-md)', alignItems: 'center', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: '3px solid rgba(192,160,240,0.4)' }}>
          <div>
            <span style={{ fontSize: '0.87rem' }}>{item.name}</span>
            <div className="muted" style={{ fontSize: '0.72rem', marginTop: 2 }}>
              {item.sku && <>{item.sku} · </>}
              {item.phase && <>{item.phase} · </>}
              Wholesale {item.wholesale ?? '—'} · Inventory {item.inventory ?? '—'}
            </div>
          </div>
          <StatusPill status={item.status} />
        </a>
      ))}
    </div>
  );
}

function ContentPipeline({ items, onStatusChange, saving }) {
  if (items === null) {
    return <NotConnected name="Airtable Content Pipeline" hint="Set AIRTABLE_API_KEY + AIRTABLE_BASE_ID and create the Content Pipeline table (lib/airtable.js)." />;
  }
  if (!items.length) return <EmptyPanel text="No rows in Content Pipeline yet." />;
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

function AirtableAffiliates({ partners, onStatusChange, saving }) {
  if (partners === null) {
    return <NotConnected name="Airtable Affiliate Partners" hint="Create the Affiliate Partners table in MM Command and invite the token’s workspace (see lib/airtable.js)." />;
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

function IntegrationPills({ supabase, notion, airtable }) {
  const rows = [
    { name: 'Supabase', key: 'supabase', color: '#3ecf8e' },
    { name: 'Notion', key: 'notion', color: '#c0a0f0' },
    { name: 'Airtable', key: 'airtable', color: '#f7ae3f' },
  ];
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
      {rows.map((s) => {
        const v = integrationsValue(s.key, supabase, notion, airtable);
        const connected = v === true;
        const loading = v === null;
        const muted = loading ? '#5c6370' : '#7f8c8d';
        const fg = loading ? muted : connected ? s.color : muted;
        return (
          <span
            key={s.name}
            title={loading ? 'Loading…' : connected ? 'Live' : 'Not connected'}
            style={{ fontSize: '0.75rem', fontWeight: 600, color: fg, background: loading ? 'rgba(127,140,141,0.08)' : connected ? `${s.color}22` : 'rgba(127,140,141,0.12)', borderRadius: 99, padding: '4px 12px', border: `1px solid ${connected ? `${s.color}44` : 'rgba(127,140,141,0.2)'}` }}
          >
            {connected ? '● ' : '○ '}{s.name}
          </span>
        );
      })}
    </div>
  );
}

function integrationsValue(key, supabase, notion, airtable) {
  if (key === 'supabase') return supabase;
  if (key === 'notion') return notion;
  return airtable;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [calendar, setCalendar] = useState(null);
  const [duskLetters, setDuskLetters] = useState(null);
  const [notionProducts, setNotionProducts] = useState(null);
  const [pipeline, setPipeline] = useState(null);
  const [atAffiliates, setAtAffiliates] = useState(null);
  const [atProducts, setAtProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [pillSupabase, setPillSupabase] = useState(null);
  const [pillNotion, setPillNotion] = useState(null);
  const [pillAirtable, setPillAirtable] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setPillSupabase(null);
      setPillNotion(null);
      setPillAirtable(null);
      const errs = {};

      const [taskRes, notionRes, pipelineRes, affRes, productsRes] = await Promise.allSettled([
        fetch('/api/tasks').then((r) => r.json()),
        fetch('/api/notion/content').then((r) => r.json()),
        fetch('/api/airtable/pipeline').then((r) => r.json()),
        fetch('/api/airtable/affiliates').then((r) => r.json()),
        fetch('/api/airtable/products').then((r) => r.json()),
      ]);

      if (taskRes.status === 'fulfilled' && !taskRes.value.error) {
        setTasks(Array.isArray(taskRes.value) ? taskRes.value : []);
        setPillSupabase(true);
      } else {
        errs.tasks = taskRes.status === 'fulfilled'
          ? taskRes.value?.error
          : taskRes.reason?.message;
        setTasks([]);
        setPillSupabase(false);
      }

      if (notionRes.status === 'fulfilled' && notionRes.value.connected) {
        setCalendar(notionRes.value.calendar ?? []);
        setDuskLetters(notionRes.value.duskLetters ?? []);
        setNotionProducts(notionRes.value.products ?? []);
        setPillNotion(true);
      } else {
        setCalendar(null);
        setDuskLetters(null);
        setNotionProducts(null);
        setPillNotion(false);
      }

      const pl = pipelineRes.status === 'fulfilled' ? pipelineRes.value : null;
      const af = affRes.status === 'fulfilled' ? affRes.value : null;
      const pr = productsRes.status === 'fulfilled' ? productsRes.value : null;

      if (pl?.connected) setPipeline(pl.data ?? []);
      else setPipeline(null);

      if (af?.connected) setAtAffiliates(af.data ?? []);
      else setAtAffiliates(null);

      if (pr?.connected) setAtProducts(pr.data ?? []);
      else setAtProducts(null);

      setPillAirtable(!!(pl?.connected && af?.connected && pr?.connected));

      setErrors(errs);
      setLoading(false);
    }
    load();
  }, []);

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

  const updatePipelineStatus = useCallback(async (id, status) => {
    const prevStatus = pipeline?.find(i => i.id === id)?.status;
    setSaving(true);
    setPipeline(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    try {
      const res = await fetch('/api/airtable/pipeline', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      if (prevStatus !== undefined) {
        setPipeline(prev => prev.map(i => i.id === id ? { ...i, status: prevStatus } : i));
      }
    } finally { setSaving(false); }
  }, [pipeline]);

  const updateAffiliateStatus = useCallback(async (id, status) => {
    const prevStatus = atAffiliates?.find(a => a.id === id)?.status;
    setSaving(true);
    setAtAffiliates(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    try {
      const res = await fetch('/api/airtable/affiliates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      if (prevStatus !== undefined) {
        setAtAffiliates(prev => prev.map(a => a.id === id ? { ...a, status: prevStatus } : a));
      }
    } finally { setSaving(false); }
  }, [atAffiliates]);

  const byCategory = cat => tasks.filter(t => t.category === cat);
  const allDone = tasks.filter(t => t.done).length;
  const overallPct = tasks.length ? Math.round((allDone / tasks.length) * 100) : 0;
  const divider = <div className="divider" style={{ margin: 'var(--space-xl) 0' }} />;

  return (
    <Layout title="Dashboard" description="Midnight Magnolia launch tracker · Supabase, Notion, Airtable">
      <section className="section">
        <div className="container">

          <p className="hero__eyebrow">Midnight Magnolia · Business Dashboard</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-lg)', flexWrap: 'wrap', marginBottom: 'var(--space-sm)' }}>
            <h1 style={{ margin: 0 }}>Launch Tracker</h1>
            {saving && <span className="muted" style={{ fontSize: '0.8rem' }}>Saving…</span>}
          </div>
          <p className="muted" style={{ maxWidth: '52ch', marginBottom: 'var(--space-xl)' }}>
            ● Green = credentials live · ○ Grey = missing env / API error · Panels degrade until each service connects.
          </p>

          <IntegrationPills supabase={loading ? null : pillSupabase} notion={loading ? null : pillNotion} airtable={loading ? null : pillAirtable} />

          {errors.tasks && (
            <div style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.4)', borderRadius: 8, padding: '1rem', marginBottom: 'var(--space-lg)', color: '#e74c3c', fontSize: '0.85rem' }}>
              <strong>Supabase error:</strong> {errors.tasks} — check .env.local and the dashboard_tasks schema.
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--color-muted)' }}>Loading dashboard…</div>
          ) : (
            <>
              <div className="card" style={{ marginBottom: 'var(--space-xl)', textAlign: 'center', padding: 'var(--space-xl)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: 'var(--color-amber)' }}>{overallPct}%</span>
                <p className="muted" style={{ marginTop: '0.25rem' }}>Overall launch — {allDone} of {tasks.length} tasks complete</p>
                <div style={{ height: 8, background: 'rgba(201,168,76,0.15)', borderRadius: 4, marginTop: 'var(--space-md)', maxWidth: 400, margin: 'var(--space-md) auto 0' }}>
                  <div style={{ height: '100%', width: `${overallPct}%`, background: 'var(--color-amber)', borderRadius: 4, transition: 'width 0.4s ease' }} />
                </div>
              </div>

              {divider}
              <TaskList tasks={byCategory('product')} title="Product Builds"       onToggle={toggleTask} saving={saving} />
              {divider}
              <TaskList tasks={byCategory('stan')}    title="Stan Store Setup"     onToggle={toggleTask} saving={saving} />
              {divider}
              <TaskList tasks={byCategory('site')}    title="Site Tasks (Next.js)" onToggle={toggleTask} saving={saving} />

              {divider}
              <SectionHeader title="Content Calendar" sub={calendar?.length ? `${calendar.filter(i => i.status !== 'Published').length} not published` : ''} source="Notion" />
              <ContentCalendar items={calendar} />

              {divider}
              <SectionHeader title="Product Tracker (Notion)" sub={notionProducts?.length ? `${notionProducts.length} rows` : ''} source="Notion" />
              <NotionProductTracker items={notionProducts} />

              {divider}
              <SectionHeader title="Dusk Letters — Upcoming" sub={duskLetters?.length ? `${duskLetters.length} in queue` : ''} source="Notion" />
              <DuskLettersDrafts items={duskLetters} />

              {divider}
              <SectionHeader title="Content Pipeline" sub={pipeline?.length ? `${pipeline.length} rows` : ''} source="Airtable" />
              <ContentPipeline items={pipeline} onStatusChange={updatePipelineStatus} saving={saving} />

              {divider}
              <SectionHeader title="Affiliate Partners" sub={atAffiliates?.length ? `${atAffiliates.filter(a => a.status === 'Live').length} live` : ''} source="Airtable" />
              <AirtableAffiliates partners={atAffiliates} onStatusChange={updateAffiliateStatus} saving={saving} />

              {divider}
              <SectionHeader title="Products (Airtable)" sub={atProducts?.length ? `${atProducts.length} SKUs` : ''} source="Airtable" />
              <AirtableProducts items={atProducts} />

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

              {divider}
              <SectionHeader title="Quick Links" />
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <a href="https://stan.store/MidnightMagnoliaSC" className="btn btn--outline" target="_blank" rel="noopener noreferrer">Stan Store</a>
                <a href="https://www.midnight-magnolia.com"      className="btn btn--outline" target="_blank" rel="noopener noreferrer">Wix Site</a>
                <a href="https://app.supabase.com"               className="btn btn--outline" target="_blank" rel="noopener noreferrer">Supabase</a>
                <a href="https://notion.so"                      className="btn btn--outline" target="_blank" rel="noopener noreferrer">Notion</a>
                <a href="https://airtable.com"                   className="btn btn--outline" target="_blank" rel="noopener noreferrer">Airtable</a>
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
