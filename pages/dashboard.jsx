// pages/dashboard.jsx
// Live dashboard — tasks and affiliates read from Supabase.
// Click any task row to toggle done/undone. Changes persist immediately.

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

// ── Dropship roadmap (static — no DB needed) ──────────────────
const DROPSHIP = [
  { name: 'Printify',        phase: 1, products: 'Branded journal, Magnolia soy candle, tote bag',   action: 'Sign up free — design Phase 1 products' },
  { name: 'Enchanted Soul',  phase: 1, products: 'Crystal sets, ritual candles, spell oils',         action: 'Apply at enchantedsoul.store/pages/dropshipping' },
  { name: 'Printful',        phase: 2, products: 'Premium apparel, wall art (Magnolia Circle gifts)', action: 'Connect to Wix/Stan Store — 20% sample discount' },
  { name: 'Starlinks Gifts', phase: 3, products: 'Gothic healing charm pendants, tarot card bags',   action: 'Apply for wholesale account' },
];

// ── Priority styling ──────────────────────────────────────────
const PRI = {
  critical: { label: 'Critical', color: '#c0392b', bg: 'rgba(192,57,43,0.14)' },
  high:     { label: 'High',     color: '#e67e22', bg: 'rgba(230,126,34,0.14)' },
  medium:   { label: 'Medium',   color: '#7f8c8d', bg: 'rgba(127,140,141,0.14)' },
};

function Badge({ priority }) {
  const s = PRI[priority] || PRI.medium;
  return (
    <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: s.color, background: s.bg, borderRadius: 4, padding: '2px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}>
      {s.label}
    </span>
  );
}

// ── TaskList ──────────────────────────────────────────────────
function TaskList({ tasks, title, onToggle, loading }) {
  const done  = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const pct   = total ? Math.round((done / total) * 100) : 0;

  return (
    <div style={{ marginBottom: 'var(--space-xl)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-md)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span className="muted" style={{ fontSize: '0.85rem' }}>{done}/{total} complete · {pct}%</span>
      </div>
      <div style={{ height: 6, background: 'rgba(201,168,76,0.18)', borderRadius: 3, marginBottom: 'var(--space-md)' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--color-amber)', borderRadius: 3, transition: 'width 0.4s ease' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tasks.map(task => (
          <button
            key={task.id}
            onClick={() => onToggle(task.id, !task.done)}
            disabled={loading}
            style={{
              all: 'unset',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-md)',
              padding: '0.75rem 1rem',
              background: task.done ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.03)',
              borderRadius: 8,
              borderLeft: `3px solid ${task.done ? 'var(--color-amber)' : 'rgba(255,255,255,0.1)'}`,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              width: '100%',
              boxSizing: 'border-box',
              textAlign: 'left',
            }}
          >
            <span style={{ fontSize: '1.1rem', marginTop: 2, color: task.done ? 'var(--color-amber)' : 'var(--color-muted)', flexShrink: 0 }}>
              {task.done ? '✓' : '○'}
            </span>
            <span style={{ flex: 1, color: task.done ? 'var(--color-muted)' : 'inherit', textDecoration: task.done ? 'line-through' : 'none', fontSize: '0.88rem' }}>
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

// ── AffiliateTable ────────────────────────────────────────────
function AffiliateTable({ partners, onToggle, loading }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {partners.map(a => (
        <div
          key={a.id}
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr 2fr auto',
            gap: 'var(--space-md)',
            alignItems: 'start',
            padding: '0.75rem 1rem',
            background: a.contacted ? 'rgba(201,168,76,0.07)' : 'rgba(255,255,255,0.03)',
            borderRadius: 8,
            borderLeft: `3px solid ${a.tier === 1 ? 'var(--color-amber)' : 'rgba(255,255,255,0.15)'}`,
          }}
        >
          <button
            onClick={() => onToggle(a.id, !a.contacted)}
            disabled={loading}
            title="Mark contacted"
            style={{ all: 'unset', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.1rem', color: a.contacted ? 'var(--color-amber)' : 'var(--color-muted)', marginTop: 2, flexShrink: 0 }}
          >
            {a.contacted ? '✓' : '○'}
          </button>
          <div>
            <strong style={{ fontSize: '0.88rem', textDecoration: a.contacted ? 'line-through' : 'none', color: a.contacted ? 'var(--color-muted)' : 'inherit' }}>{a.name}</strong>
            <div className="muted" style={{ fontSize: '0.72rem' }}>Tier {a.tier} · {a.score}</div>
          </div>
          <span className="muted" style={{ fontSize: '0.82rem' }}>{a.action}</span>
          <code style={{ fontSize: '0.7rem', color: 'var(--color-amber)', whiteSpace: 'nowrap', wordBreak: 'break-all' }}>{a.contact}</code>
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function Dashboard() {
  const [tasks,     setTasks]     = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [error,     setError]     = useState(null);

  // Fetch all data on mount
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [taskRes, affRes] = await Promise.all([
          fetch('/api/tasks'),
          fetch('/api/affiliates'),
        ]);
        if (!taskRes.ok || !affRes.ok) throw new Error('Failed to load dashboard data');
        const [taskData, affData] = await Promise.all([taskRes.json(), affRes.json()]);
        setTasks(taskData);
        setAffiliates(affData);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Toggle a task's done state
  const toggleTask = useCallback(async (id, done) => {
    setSaving(true);
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done } : t));
    try {
      const res = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, done }),
      });
      if (!res.ok) throw new Error('Save failed');
    } catch {
      // Revert on failure
      setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !done } : t));
    } finally {
      setSaving(false);
    }
  }, []);

  // Toggle an affiliate's contacted state
  const toggleAffiliate = useCallback(async (id, contacted) => {
    setSaving(true);
    setAffiliates(prev => prev.map(a => a.id === id ? { ...a, contacted } : a));
    try {
      const res = await fetch('/api/affiliates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, contacted }),
      });
      if (!res.ok) throw new Error('Save failed');
    } catch {
      setAffiliates(prev => prev.map(a => a.id === id ? { ...a, contacted: !contacted } : a));
    } finally {
      setSaving(false);
    }
  }, []);

  // ── Derived stats ─────────────────────────────────────────
  const byCategory = (cat) => tasks.filter(t => t.category === cat);
  const allDone    = tasks.filter(t => t.done).length;
  const overallPct = tasks.length ? Math.round((allDone / tasks.length) * 100) : 0;

  // ── Render ────────────────────────────────────────────────
  return (
    <Layout>
      <section className="section">
        <div className="container">

          {/* Header */}
          <p className="hero__eyebrow">Midnight Magnolia · Business Dashboard</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-lg)', flexWrap: 'wrap', marginBottom: 'var(--space-md)' }}>
            <h1 style={{ margin: 0 }}>Launch Tracker</h1>
            {saving && <span className="muted" style={{ fontSize: '0.8rem' }}>Saving…</span>}
          </div>
          <p className="muted" style={{ maxWidth: '52ch', marginBottom: 'var(--space-xl)' }}>
            Click any task to mark it done. Changes save instantly to Supabase.
          </p>

          {/* Error state */}
          {error && (
            <div style={{ background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.4)', borderRadius: 8, padding: '1rem', marginBottom: 'var(--space-lg)', color: '#e74c3c' }}>
              <strong>Error loading dashboard:</strong> {error}
              <br />
              <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Check that your Supabase env vars are set in .env.local and the schema has been run.</span>
            </div>
          )}

          {/* Loading state */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--color-muted)' }}>
              Loading dashboard…
            </div>
          ) : (
            <>
              {/* Overall progress */}
              <div className="card" style={{ marginBottom: 'var(--space-xl)', textAlign: 'center', padding: 'var(--space-xl)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: 'var(--color-amber)' }}>{overallPct}%</span>
                <p className="muted" style={{ marginTop: '0.25rem' }}>Overall launch completion — {allDone} of {tasks.length} tasks done</p>
                <div style={{ height: 8, background: 'rgba(201,168,76,0.15)', borderRadius: 4, marginTop: 'var(--space-md)', maxWidth: 400, margin: 'var(--space-md) auto 0' }}>
                  <div style={{ height: '100%', width: `${overallPct}%`, background: 'var(--color-amber)', borderRadius: 4, transition: 'width 0.4s ease' }} />
                </div>
              </div>

              {/* Task sections */}
              <div className="divider" style={{ marginBottom: 'var(--space-xl)' }} />
              <TaskList tasks={byCategory('product')} title="Product Builds"       onToggle={toggleTask} loading={saving} />
              <div className="divider" style={{ marginBottom: 'var(--space-xl)' }} />
              <TaskList tasks={byCategory('stan')}    title="Stan Store Setup"     onToggle={toggleTask} loading={saving} />
              <div className="divider" style={{ marginBottom: 'var(--space-xl)' }} />
              <TaskList tasks={byCategory('site')}    title="Site Tasks (Next.js)" onToggle={toggleTask} loading={saving} />

              {/* Affiliate outreach */}
              <div className="divider" style={{ marginBottom: 'var(--space-xl)' }} />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-md)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0 }}>Affiliate Outreach — Priority Queue</h3>
                <span className="muted" style={{ fontSize: '0.85rem' }}>{affiliates.filter(a => a.contacted).length}/{affiliates.length} contacted</span>
              </div>
              <AffiliateTable partners={affiliates} onToggle={toggleAffiliate} loading={saving} />

              {/* Dropship roadmap */}
              <div className="divider" style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }} />
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Physical Products — Dropship Roadmap</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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

              {/* Revenue projections */}
              <div className="divider" style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }} />
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Magnolia Circle Revenue Model</h3>
              <div className="grid-3" style={{ marginTop: 'var(--space-md)' }}>
                {[
                  { members: 100, monthly: '$900' },
                  { members: 250, monthly: '$2,250' },
                  { members: 500, monthly: '$4,500' },
                ].map(r => (
                  <div className="card" key={r.members} style={{ textAlign: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-amber)' }}>{r.monthly}</span>
                    <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{r.members} members · $9/month</p>
                  </div>
                ))}
              </div>

              {/* Quick links */}
              <div className="divider" style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }} />
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Quick Links</h3>
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <a href="https://stan.store/MidnightMagnoliaSC" className="btn btn--outline" target="_blank" rel="noopener">Stan Store</a>
                <a href="https://www.midnight-magnolia.com"      className="btn btn--outline" target="_blank" rel="noopener">Wix Site</a>
                <a href="https://app.supabase.com"               className="btn btn--outline" target="_blank" rel="noopener">Supabase</a>
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
