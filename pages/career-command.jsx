import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const ADMIN_TOKEN_STORAGE_KEY = 'mm_dashboard_admin_token';
const ADMIN_TOKEN_HEADER = 'x-mm-admin-token';
const ADMIN_TOKEN_COOKIE = 'mm_dashboard_admin';

function storedAdminToken() {
  if (typeof window === 'undefined') return '';
  return window.sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || '';
}

function setAdminTokenCookie(token) {
  if (typeof document === 'undefined') return;
  if (!token) {
    document.cookie = `${ADMIN_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Strict`;
    return;
  }
  const secure = typeof window !== 'undefined' && window.location?.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${ADMIN_TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=/; SameSite=Strict${secure}`;
}

function adminFetch(url, token, options = {}) {
  const headers = {
    ...(options.headers || {}),
    ...(token ? { [ADMIN_TOKEN_HEADER]: token } : {}),
  };
  return fetch(url, { ...options, headers });
}

const BUILDERS = [
  { id: 'jobs', label: 'Job Tracker', blurb: 'Active applications from Airtable Opportunities.' },
  { id: 'resumes', label: 'Resume Vault', blurb: 'Active resume tracks + public portfolio PDFs.' },
  { id: 'mlis', label: 'MLIS Programs', blurb: 'School shortlist when AIRTABLE_TBL_MLIS is set.' },
  { id: 'ats', label: 'ATS Optimizer', blurb: 'Checklist for Flagship Executive ATS (Track A).' },
  { id: 'cover', label: 'Cover Letters', blurb: 'Prompts aligned to archival / MLIS pivot.' },
  { id: 'skills', label: 'Skills Inventory', blurb: 'Portfolio skills mirror for LinkedIn Featured.' },
];

function StatusPill({ status }) {
  const color = status === 'Top Choice' || status === 'Interview' ? 'var(--color-amber)' : 'rgba(255,255,255,0.45)';
  return (
    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color, border: `1px solid ${color}`, borderRadius: 99, padding: '2px 8px' }}>
      {status || '—'}
    </span>
  );
}

function UnlockForm({ tokenInput, setTokenInput, onSubmit, message }) {
  return (
    <form onSubmit={onSubmit} className="card" style={{ maxWidth: 480, margin: '0 auto', padding: 'var(--space-xl)' }}>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Unlock Career Command</h2>
      <p className="muted" style={{ marginBottom: 'var(--space-md)' }}>
        Same token as `/dashboard` (`MM_DASHBOARD_TOKEN`).
      </p>
      <input
        type="password"
        value={tokenInput}
        onChange={(e) => setTokenInput(e.target.value)}
        placeholder="Dashboard token"
        style={{ width: '100%', padding: '0.7rem', marginBottom: 'var(--space-md)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: 'inherit' }}
      />
      <button type="submit" className="btn btn--primary">Unlock</button>
      {message ? <p style={{ color: '#e74c3c', marginTop: 'var(--space-md)', fontSize: '0.85rem' }}>{message}</p> : null}
    </form>
  );
}

export default function CareerCommandPage() {
  const [tab, setTab] = useState('jobs');
  const [adminToken, setAdminToken] = useState(storedAdminToken);
  const [tokenInput, setTokenInput] = useState(storedAdminToken);
  const [authRequired, setAuthRequired] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState(null);
  const [resumes, setResumes] = useState(null);
  const [mlis, setMlis] = useState(null);

  useEffect(() => {
    const token = storedAdminToken();
    if (token) setAdminTokenCookie(token);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setAuthMessage('');
      try {
        const loadJson = async (url) => {
          const response = await adminFetch(url, adminToken);
          const json = await response.json();
          if (response.status === 401 || response.status === 503) {
            const error = new Error(json?.error || 'Admin authorization required');
            error.status = response.status;
            throw error;
          }
          return json;
        };
        const [jobsRes, resumesRes, mlisRes] = await Promise.allSettled([
          loadJson('/api/airtable/career?table=opportunities'),
          loadJson('/api/airtable/career?table=resumes'),
          loadJson('/api/airtable/career?table=mlis'),
        ]);
        if (cancelled) return;
        const authFailure = [jobsRes, resumesRes, mlisRes].find(
          (r) => r.status === 'rejected' && [401, 503].includes(r.reason?.status),
        );
        if (authFailure) {
          setAuthRequired(true);
          setAuthMessage(authFailure.reason.message);
          setLoading(false);
          return;
        }
        setAuthRequired(false);
        if (jobsRes.status === 'fulfilled' && Array.isArray(jobsRes.value)) setJobs(jobsRes.value);
        if (resumesRes.status === 'fulfilled' && Array.isArray(resumesRes.value)) setResumes(resumesRes.value);
        if (mlisRes.status === 'fulfilled' && Array.isArray(mlisRes.value)) setMlis(mlisRes.value);
        else setMlis(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [adminToken]);

  const unlock = useCallback((event) => {
    event.preventDefault();
    const token = tokenInput.trim();
    if (typeof window !== 'undefined') {
      if (token) window.sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
      else window.sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
      setAdminTokenCookie(token);
    }
    setAdminToken(token);
  }, [tokenInput]);

  const activeJobs = jobs?.filter((j) => !['Rejected', 'Withdrawn'].includes(j.status)) ?? [];

  return (
    <Layout title="Career Command" description="Private Career Command Center — job tracker, resumes, MLIS, and builder checklists.">
      <div className="container" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="page-hero">
          <p className="page-hero__eyebrow">Private ops</p>
          <h1>Career Command Center</h1>
          <div className="divider" />
          <p className="hero__subtitle">
            Daily career workflow for the archival / MLIS pivot. Public story lives on{' '}
            <Link href="/portfolio">/portfolio</Link>. Ops overview on{' '}
            <Link href="/dashboard">/dashboard</Link>.
          </p>
        </div>

        {authRequired ? (
          <UnlockForm
            tokenInput={tokenInput}
            setTokenInput={setTokenInput}
            onSubmit={unlock}
            message={authMessage}
          />
        ) : loading ? (
          <p className="muted" style={{ textAlign: 'center' }}>Loading Career Command…</p>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
              {BUILDERS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={tab === b.id ? 'btn btn--primary' : 'btn btn--ghost'}
                  onClick={() => setTab(b.id)}
                  style={{ fontSize: '0.8rem' }}
                >
                  {b.label}
                </button>
              ))}
            </div>

            <div className="card" style={{ padding: 'var(--space-xl)' }}>
              <p className="muted" style={{ marginBottom: 'var(--space-md)', fontSize: '0.85rem' }}>
                {BUILDERS.find((b) => b.id === tab)?.blurb}
              </p>

              {tab === 'jobs' && (
                activeJobs.length ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {activeJobs.map((j) => (
                      <div key={j.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <div>
                          <strong>{j.roleTitle}</strong>
                          <span className="muted" style={{ marginLeft: 8 }}>· {j.company}</span>
                          <div className="muted" style={{ fontSize: '0.75rem' }}>{j.track} · {j.remote ? 'Remote' : j.location}</div>
                        </div>
                        <StatusPill status={j.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="muted">No active applications (or Airtable Opportunities not connected).</p>
                )
              )}

              {tab === 'resumes' && (
                <>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 'var(--space-md)' }}>
                    <a className="btn btn--outline" href="/resumes/resume-track-a-flagship-executive-ats.pdf" target="_blank" rel="noopener noreferrer">Track A — Flagship ATS</a>
                    <a className="btn btn--outline" href="/resumes/resume-track-b-executive-networking.pdf" target="_blank" rel="noopener noreferrer">Track B — Networking</a>
                  </div>
                  {resumes?.length ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {resumes.map((r) => (
                        <li key={r.id} style={{ marginBottom: 8 }}>
                          <a href={r.fileUrl || '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-amber)' }}>
                            {r.versionName || r.track}
                          </a>
                          <span className="muted" style={{ marginLeft: 8, fontSize: '0.75rem' }}>{r.targetRole}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="muted">Airtable resume vault empty or not connected — public PDFs above still work.</p>
                  )}
                </>
              )}

              {tab === 'mlis' && (
                mlis?.length ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {mlis.map((p) => (
                      <div key={p.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <strong>{p.programName}</strong>
                        <span className="muted" style={{ marginLeft: 8 }}>· {p.institution}</span>
                        <div style={{ marginTop: 4, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                          <StatusPill status={p.priority} />
                          {p.alaAccredited ? <span className="muted" style={{ fontSize: '0.7rem' }}>ALA</span> : null}
                          {p.hbcu ? <span className="muted" style={{ fontSize: '0.7rem' }}>HBCU</span> : null}
                          <span className="muted" style={{ fontSize: '0.7rem' }}>{p.format}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="muted">
                    Set <code>AIRTABLE_TBL_MLIS</code> (and optional <code>AIRTABLE_CAREER_BASE_ID</code>) in env after creating an MLIS Programs table.
                    Until then this tab stays empty by design.
                  </p>
                )
              )}

              {tab === 'ats' && (
                <ol style={{ paddingLeft: '1.2rem', lineHeight: 1.7 }}>
                  <li>Open Track A Flagship Executive ATS PDF from Resume Vault.</li>
                  <li>Paste the target JD; mark must-have keywords missing from the resume.</li>
                  <li>Keep archival / digital preservation language primary; retire ops/PM framing.</li>
                  <li>Export a role-specific variant name in Airtable Resumes when ready.</li>
                </ol>
              )}

              {tab === 'cover' && (
                <ol style={{ paddingLeft: '1.2rem', lineHeight: 1.7 }}>
                  <li>One paragraph: why this archive / library / digital preservation role.</li>
                  <li>One proof: statewide IA, digitization, or Vincent/Vinson research.</li>
                  <li>One close: recovery-aware pacing + availability.</li>
                  <li>Store final letter next to the Opportunity record notes in Airtable.</li>
                </ol>
              )}

              {tab === 'skills' && (
                <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.7 }}>
                  <li>Metadata · taxonomy · digital preservation workflows</li>
                  <li>Information architecture · content governance</li>
                  <li>Genealogy / primary source research · community archives</li>
                  <li>Notion · Airtable · documentation systems</li>
                  <li>Mirror these on LinkedIn Featured + `/portfolio` cards</li>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
