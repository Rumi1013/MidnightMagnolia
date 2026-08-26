import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import HubShell from '../components/command-hub/HubShell';
import { HubProvider, HubSection } from '../components/command-hub/HubPanels';
import { DEFAULT_OUTCOMES, STORAGE_KEY } from '../lib/commandHub';

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

function readHubState() {
  if (typeof window === 'undefined') {
    return { outcomes: DEFAULT_OUTCOMES, checks: {} };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { outcomes: DEFAULT_OUTCOMES, checks: {} };
    const parsed = JSON.parse(raw);
    const outcomes = Array.isArray(parsed.outcomes) && parsed.outcomes.length === 3
      ? parsed.outcomes.map((item) => String(item ?? ''))
      : DEFAULT_OUTCOMES;
    return { outcomes, checks: parsed.checks && typeof parsed.checks === 'object' ? parsed.checks : {} };
  } catch {
    return { outcomes: DEFAULT_OUTCOMES, checks: {} };
  }
}

function UnlockForm({ tokenInput, setTokenInput, onSubmit, message }) {
  return (
    <form onSubmit={onSubmit} className="card" style={{ maxWidth: 480, margin: '0 auto', padding: 'var(--space-xl)' }}>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Unlock Command Hub</h2>
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
  const [section, setSection] = useState('today');
  const [adminToken, setAdminToken] = useState(storedAdminToken);
  const [tokenInput, setTokenInput] = useState(storedAdminToken);
  const [authRequired, setAuthRequired] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState(null);
  const [resumes, setResumes] = useState(null);
  const [mlis, setMlis] = useState(null);
  const [outcomes, setOutcomes] = useState(DEFAULT_OUTCOMES);
  const [checks, setChecks] = useState({});
  const [copied, setCopied] = useState('');
  const [hubReady, setHubReady] = useState(false);
  const [packet, setPacket] = useState(null);
  const [packetAvailable, setPacketAvailable] = useState(false);

  useEffect(() => {
    const token = storedAdminToken();
    if (token) setAdminTokenCookie(token);
    const saved = readHubState();
    setOutcomes(saved.outcomes);
    setChecks(saved.checks);
    setHubReady(true);
  }, []);

  useEffect(() => {
    if (!hubReady || typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ outcomes, checks }));
  }, [outcomes, checks, hubReady]);

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
        const [jobsRes, resumesRes, mlisRes, packetRes] = await Promise.allSettled([
          loadJson('/api/airtable/career?table=opportunities'),
          loadJson('/api/airtable/career?table=resumes'),
          loadJson('/api/airtable/career?table=mlis'),
          loadJson('/api/career-command/packet'),
        ]);
        if (cancelled) return;
        const authFailure = [jobsRes, resumesRes, mlisRes, packetRes].find(
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
        else setJobs(null);
        if (resumesRes.status === 'fulfilled' && Array.isArray(resumesRes.value)) setResumes(resumesRes.value);
        else setResumes(null);
        if (mlisRes.status === 'fulfilled' && Array.isArray(mlisRes.value)) setMlis(mlisRes.value);
        else setMlis(null);
        if (packetRes.status === 'fulfilled' && packetRes.value?.available && packetRes.value.packet) {
          setPacketAvailable(true);
          setPacket(packetRes.value.packet);
          const packetOutcomes = packetRes.value.packet.DEFAULT_OUTCOMES;
          setOutcomes((current) => {
            const blank = !current.some((item) => String(item || '').trim());
            return blank && Array.isArray(packetOutcomes) && packetOutcomes.length === 3
              ? packetOutcomes.map((item) => String(item ?? ''))
              : current;
          });
        } else {
          setPacketAvailable(false);
          setPacket(null);
        }
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

  const onOutcome = useCallback((index, value) => {
    setOutcomes((prev) => prev.map((item, i) => (i === index ? value : item)));
  }, []);

  const onCheck = useCallback((id) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const onCopy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied('Copied.');
      window.setTimeout(() => setCopied(''), 1600);
    } catch {
      setCopied('Copy failed.');
    }
  }, []);

  return (
    <Layout title="Command Hub" description="Private Career Command Hub — daily outcomes, application bank, case studies, and the 90-day plan.">
      {authRequired ? (
        <div className="container" style={{ padding: 'var(--space-xl) 0 var(--space-2xl)' }}>
          <UnlockForm
            tokenInput={tokenInput}
            setTokenInput={setTokenInput}
            onSubmit={unlock}
            message={authMessage}
          />
        </div>
      ) : loading ? (
        <div className="container" style={{ padding: 'var(--space-xl) 0' }}>
          <p className="muted" style={{ textAlign: 'center' }}>Loading Command Hub…</p>
        </div>
      ) : (
        <>
          <HubProvider packet={packet} available={packetAvailable}>
            <HubShell section={section} onSection={setSection}>
            {section === 'today' && mlis?.length ? (
              <p className="muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
                MLIS shortlist connected · {mlis.length} program{mlis.length === 1 ? '' : 's'}. Timeline panel holds the six-week sprint.
              </p>
            ) : null}
            {section === 'today' && !mlis?.length ? (
              <p className="muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
                MLIS table stays empty until <code>AIRTABLE_TBL_MLIS</code> is set.{' '}
                <Link href="/dashboard">Ops dashboard</Link>
                {' · '}
                local ATS lives in CareerSystem/Career-command.
              </p>
            ) : null}
            <HubSection
              section={section}
              jobs={jobs}
              resumes={resumes}
              mlis={mlis}
              outcomes={outcomes}
              onOutcome={onOutcome}
              checks={checks}
              onCheck={onCheck}
              onCopy={onCopy}
            />
            {copied ? <p className="muted" style={{ marginTop: '1rem', fontSize: '0.8rem' }}>{copied}</p> : null}
            </HubShell>
          </HubProvider>
        </>
      )}
    </Layout>
  );
}
