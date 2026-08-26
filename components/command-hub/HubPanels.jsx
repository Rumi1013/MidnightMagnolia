import { createContext, useContext } from 'react';
import Link from 'next/link';
import * as publicHub from '../../lib/commandHub';

export const HubContext = createContext({ ...publicHub, packetAvailable: false });

export function HubProvider({ packet, available, children }) {
  const value = {
    ...publicHub,
    ...(packet && typeof packet === 'object' ? packet : {}),
    matchJobToTrack: publicHub.matchJobToTrack,
    packetAvailable: Boolean(available),
  };
  return <HubContext.Provider value={value}>{children}</HubContext.Provider>;
}

function useHub() {
  return useContext(HubContext);
}

function Eyebrow({ children }) {
  return <p className="hub-eb">{children}</p>;
}

function CopyLine({ text, onCopy }) {
  return (
    <div className="hub-copy" role="button" tabIndex={0} onClick={() => onCopy(text)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCopy(text); } }}>
      {text}
    </div>
  );
}

function StatusPill({ status }) {
  const color = status === 'Top Choice' || status === 'Interview' ? 'var(--color-deep-honey)' : 'rgba(45, 30, 47, 0.55)';
  return (
    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color, border: `1px solid ${color}`, borderRadius: 99, padding: '2px 8px' }}>
      {status || '—'}
    </span>
  );
}

export function TodayPanel({ outcomes, onOutcome, checks, onCheck }) {
  const {
    SPRINT, GOALS, TIME_BUDGET, TIME_BUDGET_NOTE, WEEK_RHYTHM,
    TRAFFIC_LIGHT, FIRST_WEEK_CHECKLIST, FRIDAY_QUESTIONS, PRIORITY_ORDER,
  } = useHub();
  return (
    <section>
      <Eyebrow>{SPRINT.label}</Eyebrow>
      <h1 className="hub-title">Today</h1>
      <p className="hub-lede">Three outcomes, not a task list. Everything else on this page exists so you never have to leave the hub to find a number, a bullet, or a next step.</p>

      {GOALS.length ? (
        <div className="hub-goals">
          {GOALS.map((goal) => (
            <div className="hub-dark" key={goal.id}>
              <p className="hub-eb">{goal.eyebrow}</p>
              <p className="hub-dark__value">{goal.value}</p>
              <p style={{ fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{goal.detail}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <Eyebrow>This week&apos;s three outcomes</Eyebrow>
          <p className="muted" style={{ fontSize: '0.8rem', marginBottom: '0.85rem' }}>Chosen Monday. Click to edit. Saved on this computer.</p>
          {outcomes.map((value, index) => (
            <div key={index} style={{ display: 'grid', gridTemplateColumns: '22px 1fr', gap: 10, alignItems: 'start', marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-deep-honey)' }}>{index + 1}</span>
              <textarea className="hub-outcome" value={value} onChange={(e) => onOutcome(index, e.target.value)} rows={2} />
            </div>
          ))}
        </div>
        <div className="card">
          <Eyebrow>Weekly time budget</Eyebrow>
          {TIME_BUDGET.map((row) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '0.5rem 0', borderBottom: '1px solid rgba(45,30,47,0.1)', fontSize: '0.92rem' }}>
              <span>{row.label}</span>
              <strong style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem' }}>{row.hours}</strong>
            </div>
          ))}
          <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.85rem' }}>{TIME_BUDGET_NOTE}</p>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        <div>
          <h3 className="hub-h3" style={{ marginTop: 0 }}>The week&apos;s rhythm</h3>
          <div className="hub-kv">
            {WEEK_RHYTHM.map((row) => (
              <span key={row.when} style={{ display: 'contents' }}>
                <span className="hub-kvk">{row.when}</span>
                <span>{row.what}</span>
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="hub-h3" style={{ marginTop: 0 }}>Traffic light</h3>
          {TRAFFIC_LIGHT.map((row) => (
            <div key={row.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
              <span className={`hub-pill hub-pill--${row.id}`}>{row.label}</span>
              <span style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>{row.meaning}</span>
            </div>
          ))}
        </div>
      </div>

      {FIRST_WEEK_CHECKLIST.length ? (
        <div className="card" style={{ marginBottom: '1.6rem' }}>
          <Eyebrow>First-week launch checklist</Eyebrow>
          {FIRST_WEEK_CHECKLIST.map((item) => (
            <label className="hub-ck" key={item.id}>
              <input type="checkbox" checked={Boolean(checks[item.id])} onChange={() => onCheck(item.id)} />
              <span><strong>{item.date}</strong> · {item.text}</span>
            </label>
          ))}
        </div>
      ) : null}

      <h3 className="hub-h3">Friday review · six questions</h3>
      <ol style={{ paddingLeft: '1.2rem', lineHeight: 1.7, marginBottom: '1.4rem' }}>
        {FRIDAY_QUESTIONS.map((q) => <li key={q}>{q}</li>)}
      </ol>
      <h3 className="hub-h3">Priority order</h3>
      <ol style={{ paddingLeft: '1.2rem', lineHeight: 1.7 }}>
        {PRIORITY_ORDER.map((item) => <li key={item}>{item}</li>)}
      </ol>
    </section>
  );
}

export function TimelinePanel({ mlis }) {
  const {
    TIMELINE_NOTE, TIMELINE_COLUMNS, WORKSTREAMS, MILESTONES,
    EDUCATION_SPRINT, TRIDENT_CONTROLS,
  } = useHub();
  return (
    <section>
      <Eyebrow>Planning baseline · August 24, 2026</Eyebrow>
      <h1 className="hub-title">Timeline &amp; milestones</h1>
      <p className="hub-lede">{TIMELINE_NOTE}</p>
      <div className="hub-scroll" style={{ marginBottom: '2rem' }}>
        <table className="hub-tb hub-timeline">
          <thead>
            <tr>
              <th>Workstream</th>
              {TIMELINE_COLUMNS.map((col) => <th key={col}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {WORKSTREAMS.map((row) => (
              <tr key={row.id}>
                <td><strong>{row.label}</strong></td>
                {row.span ? (
                  <td colSpan={TIMELINE_COLUMNS.length}>{row.span}</td>
                ) : (
                  row.cells.map((cell, i) => <td key={`${row.id}-${i}`}>{cell}</td>)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="hub-h3">Milestones and escalation triggers</h3>
      <table className="hub-tb" style={{ marginBottom: '2rem' }}>
        <thead>
          <tr><th>Date</th><th>Required result</th><th>Escalation trigger</th></tr>
        </thead>
        <tbody>
          {MILESTONES.map((m) => (
            <tr key={m.date}>
              <td><strong>{m.date}</strong><div className="muted" style={{ fontSize: '0.7rem' }}>{m.label}</div></td>
              <td>{m.result}</td>
              <td>{m.trigger}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="hub-h3">Six-week education sprint</h3>
      {EDUCATION_SPRINT.map((wk) => (
        <div key={wk.week} style={{ display: 'grid', gridTemplateColumns: '14px 1fr', gap: 12, marginBottom: 10 }}>
          <span className="hub-dot" />
          <p style={{ margin: 0 }}><strong>{wk.week}</strong> {wk.title} {wk.detail}</p>
        </div>
      ))}
      <h3 className="hub-h3">MLIS shortlist</h3>
      {Array.isArray(mlis) && mlis.length ? (
        <div style={{ marginBottom: '1.4rem' }}>
          {mlis.map((p) => (
            <div key={p.id} style={{ padding: '0.65rem 0', borderBottom: '1px solid rgba(45,30,47,0.1)' }}>
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
        <p className="muted" style={{ marginBottom: '1.4rem' }}>
          Set <code>AIRTABLE_TBL_MLIS</code> (and optional <code>AIRTABLE_CAREER_BASE_ID</code>) after creating an MLIS Programs table. Until then this list stays empty by design.
        </p>
      )}
      <h3 className="hub-h3">Ongoing Trident controls</h3>
      <ul>
        {TRIDENT_CONTROLS.map((item) => (
          <li key={item} style={{ display: 'grid', gridTemplateColumns: '14px 1fr', gap: 12, marginBottom: 8 }}>
            <span className="hub-dot" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ApplyPanel({ jobs, onCopy }) {
  const { APPLICATION_BANK_LEDE, APPLICATION_TRACKS, STANDING_INSTRUCTIONS, matchJobToTrack } = useHub();
  const activeJobs = Array.isArray(jobs) ? jobs.filter((j) => !['Rejected', 'Withdrawn'].includes(j.status)) : [];
  return (
    <section>
      <Eyebrow>Ready to send</Eyebrow>
      <h1 className="hub-title">Application bank</h1>
      <p className="hub-lede">{APPLICATION_BANK_LEDE}</p>

      <div className="card" style={{ marginBottom: '1.6rem' }}>
        <Eyebrow>Live opportunities · Airtable</Eyebrow>
        {jobs === null ? (
          <p className="muted">Not connected. Opportunities load from the Writing / Creative Airtable base when configured.</p>
        ) : activeJobs.length === 0 ? (
          <p className="muted">No active applications (or the Opportunities table is empty).</p>
        ) : (
          activeJobs.map((job) => {
            const matched = matchJobToTrack(job.track, APPLICATION_TRACKS);
            return (
              <div key={job.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '0.7rem 0', borderBottom: '1px solid rgba(45,30,47,0.1)' }}>
                <div>
                  <strong>{job.roleTitle}</strong>
                  <span className="muted" style={{ marginLeft: 8 }}>· {job.company}</span>
                  <div className="muted" style={{ fontSize: '0.75rem' }}>
                    {job.track || 'Untracked'} {matched ? `· maps to ${matched.title.split(' · ')[0]}` : ''} · {job.remote ? 'Remote' : job.location}
                  </div>
                </div>
                <StatusPill status={job.status} />
              </div>
            );
          })
        )}
      </div>

      {APPLICATION_TRACKS.map((track) => (
        <div key={track.id} style={{ marginBottom: '1.6rem' }}>
          <h3 className="hub-h3">{track.title}</h3>
          {(track.bullets || []).map((bullet) => <CopyLine key={bullet} text={bullet} onCopy={onCopy} />)}
        </div>
      ))}

      {STANDING_INSTRUCTIONS.length ? (
        <>
          <h3 className="hub-h3">Standing instructions · read before every submission</h3>
          {STANDING_INSTRUCTIONS.map((item) => (
            <p key={item} style={{ maxWidth: '68ch', marginBottom: '0.7rem' }}>{item}</p>
          ))}
        </>
      ) : null}
    </section>
  );
}

export function ResumePanel({ resumes, onCopy }) {
  const {
    RESUME_HEADER, RESUME_SUMMARY, RESUME_COMPETENCIES, RESUME_EXPERIENCE,
    RESUME_EDUCATION, RESUME_LEADERSHIP, RESUME_SKILLS, COVER_LETTER_SKELETON,
    CASE_STUDY_SELECTOR, PARA_TWO_TEMPLATE,
  } = useHub();
  return (
    <section>
      <Eyebrow>Master version</Eyebrow>
      <h1 className="hub-title">Résumé &amp; letters</h1>
      <p className="hub-lede">The master résumé, the cover-letter skeleton, and the selector that decides which story goes in paragraph two.</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.2rem' }}>
        <a className="btn btn--outline" href="/resumes/resume-track-a-flagship-executive-ats.pdf" target="_blank" rel="noopener noreferrer">Track A — Flagship ATS</a>
        <a className="btn btn--outline" href="/resumes/resume-track-b-executive-networking.pdf" target="_blank" rel="noopener noreferrer">Track B — Networking</a>
        <Link href="/portfolio" className="btn btn--ghost">Public /portfolio</Link>
      </div>
      {Array.isArray(resumes) && resumes.length ? (
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.4rem' }}>
          {resumes.map((r) => (
            <li key={r.id} style={{ marginBottom: 8 }}>
              <a href={r.fileUrl || '#'} target="_blank" rel="noopener noreferrer">{r.versionName || r.track}</a>
              <span className="muted" style={{ marginLeft: 8, fontSize: '0.75rem' }}>{r.targetRole}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted" style={{ marginBottom: '1.4rem' }}>Airtable resume vault empty or not connected — public PDFs above still work. Spec Word files were not auto-shipped.</p>
      )}

      {RESUME_HEADER.name ? (
        <div className="card" style={{ marginBottom: '1.4rem' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>{RESUME_HEADER.name}</h2>
          <p className="muted" style={{ marginBottom: '0.35rem' }}>{RESUME_HEADER.headline}</p>
          <p style={{ fontSize: '0.88rem' }}>{RESUME_HEADER.location}</p>
          <p style={{ fontSize: '0.88rem' }}>{RESUME_HEADER.phone} · {RESUME_HEADER.email} · {RESUME_HEADER.linkedin}</p>
        </div>
      ) : (
        <p className="muted" style={{ marginBottom: '1.4rem' }}>Master résumé loads from the local Career Command packet.</p>
      )}
      {RESUME_SUMMARY ? (
        <>
          <h3 className="hub-h3">Professional summary</h3>
          <CopyLine text={RESUME_SUMMARY} onCopy={onCopy} />
        </>
      ) : null}
      {RESUME_COMPETENCIES.length ? (
        <>
          <h3 className="hub-h3">Core competencies</h3>
          <p>{RESUME_COMPETENCIES.join(' · ')}</p>
        </>
      ) : null}
      {RESUME_EXPERIENCE.length ? (
        <>
          <h3 className="hub-h3">Professional experience</h3>
          {RESUME_EXPERIENCE.map((job) => (
            <div key={job.title} style={{ marginBottom: '1.1rem' }}>
              <strong>{job.title}</strong>
              <div className="muted" style={{ fontSize: '0.8rem', marginBottom: 6 }}>{job.dates}{job.note ? ` · ${job.note}` : ''}</div>
              {(job.bullets || []).map((b) => <CopyLine key={b} text={b} onCopy={onCopy} />)}
            </div>
          ))}
        </>
      ) : null}
      {RESUME_EDUCATION.length ? (
        <>
          <h3 className="hub-h3">Education</h3>
          {RESUME_EDUCATION.map((ed) => (
            <p key={ed.credential} style={{ marginBottom: '0.4rem' }}><strong>{ed.credential}</strong> — {ed.detail}</p>
          ))}
        </>
      ) : null}
      {RESUME_LEADERSHIP ? <p className="muted" style={{ marginTop: '0.6rem' }}>{RESUME_LEADERSHIP}</p> : null}
      {RESUME_SKILLS.length ? (
        <>
          <h3 className="hub-h3">Technical skills</h3>
          {RESUME_SKILLS.map((row) => (
            <p key={row.group}><strong>{row.group}.</strong> {row.items}</p>
          ))}
        </>
      ) : null}

      {COVER_LETTER_SKELETON.greeting || COVER_LETTER_SKELETON.p1 ? (
        <>
          <h3 className="hub-h3">Cover letter · skeleton</h3>
          <div className="card">
            {COVER_LETTER_SKELETON.greeting ? <p>{COVER_LETTER_SKELETON.greeting}</p> : null}
            {COVER_LETTER_SKELETON.p1 ? <CopyLine text={COVER_LETTER_SKELETON.p1} onCopy={onCopy} /> : null}
            {COVER_LETTER_SKELETON.p2 ? <CopyLine text={COVER_LETTER_SKELETON.p2} onCopy={onCopy} /> : null}
            {COVER_LETTER_SKELETON.p3 ? <CopyLine text={COVER_LETTER_SKELETON.p3} onCopy={onCopy} /> : null}
            {COVER_LETTER_SKELETON.close ? <CopyLine text={COVER_LETTER_SKELETON.close} onCopy={onCopy} /> : null}
            {(COVER_LETTER_SKELETON.notes || []).map((n) => <p className="muted" key={n} style={{ fontSize: '0.85rem' }}>{n}</p>)}
          </div>
        </>
      ) : null}

      <h3 className="hub-h3">Case study selector</h3>
      <table className="hub-tb">
        <thead><tr><th>Posting emphasis</th><th>Use</th><th>Proof points</th></tr></thead>
        <tbody>
          {CASE_STUDY_SELECTOR.map((row) => (
            <tr key={row.emphasis}><td>{row.emphasis}</td><td>{row.use}</td><td>{row.proof}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="muted" style={{ marginTop: '0.9rem' }}>{PARA_TWO_TEMPLATE}</p>
    </section>
  );
}

export function CasesPanel() {
  const {
    CASE_STUDIES_LEDE, HUB_CASE_STUDIES, TRUTH_RULE, CASE_BUILD_ORDER,
    INTERVIEW_STRUCTURE, RELEASE_CHECKLIST, READING_KEY,
  } = useHub();
  return (
    <section>
      <Eyebrow>Eight stories · six verified, two planned</Eyebrow>
      <h1 className="hub-title">Case studies</h1>
      <p className="hub-lede">{CASE_STUDIES_LEDE}</p>
      {HUB_CASE_STUDIES.map((cs) => (
        <article className="card" key={cs.id} style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
            <span className={`hub-pill ${cs.status === 'verified' ? 'hub-pill--verified' : 'hub-pill--planned'}`}>{cs.status === 'verified' ? 'Verified' : 'Planned'}</span>
            <h3 className="hub-h3" style={{ margin: 0 }}>Case {cs.number} · {cs.title}</h3>
          </div>
          {(cs.challenge || cs.method || cs.evidence || cs.outcome || cs.useFor) ? (
            <div className="hub-kv">
              {cs.challenge ? <><span className="hub-kvk">Challenge</span><span>{cs.challenge}</span></> : null}
              {cs.method ? <><span className="hub-kvk">Method</span><span>{cs.method}</span></> : null}
              {cs.evidence ? <><span className="hub-kvk">Evidence</span><span>{cs.evidence}</span></> : null}
              {cs.outcome ? <><span className="hub-kvk">Outcome</span><span>{cs.outcome}</span></> : null}
              {cs.useFor ? <><span className="hub-kvk">Use for</span><span>{cs.useFor}</span></> : null}
            </div>
          ) : null}
          {cs.status === 'verified' && cs.publicHref ? (
            <p style={{ marginTop: '0.8rem' }}><Link href={cs.publicHref}>Public page</Link></p>
          ) : null}
        </article>
      ))}
      <p className="muted" style={{ maxWidth: '68ch' }}>{TRUTH_RULE}</p>
      <h3 className="hub-h3">Build order</h3>
      <table className="hub-tb">
        <thead><tr><th>#</th><th>Case</th><th>Status</th><th>Immediate use</th></tr></thead>
        <tbody>
          {CASE_BUILD_ORDER.map((row) => (
            <tr key={row.n}><td>{row.n}</td><td>{row.case}</td><td>{row.status}</td><td>{row.use}</td></tr>
          ))}
        </tbody>
      </table>
      <h3 className="hub-h3">Interview structure · 60 seconds</h3>
      <p>{INTERVIEW_STRUCTURE}</p>
      <h3 className="hub-h3">Release checklist</h3>
      {RELEASE_CHECKLIST.map((item) => (
        <p key={item} style={{ marginBottom: '0.35rem' }}>{item}</p>
      ))}
      <h3 className="hub-h3">Reading key</h3>
      <table className="hub-tb">
        <thead><tr><th>If the need is…</th><th>Start with</th></tr></thead>
        <tbody>
          {READING_KEY.map((row) => (
            <tr key={row.need}><td>{row.need}</td><td>{row.start}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function ArtifactsPanel() {
  const { ARTIFACTS_LEDE, PORTFOLIO_ARTIFACTS } = useHub();
  return (
    <section>
      <Eyebrow>Work samples · available on request</Eyebrow>
      <h1 className="hub-title">Portfolio artifacts</h1>
      <p className="hub-lede">{ARTIFACTS_LEDE}</p>
      {PORTFOLIO_ARTIFACTS.map((art) => (
        <article className="card" key={art.id} style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span className={`hub-pill ${art.status === 'Complete' ? 'hub-pill--verified' : 'hub-pill--planned'}`}>{art.status}</span>
            <h3 className="hub-h3" style={{ margin: 0 }}>{art.title}</h3>
          </div>
          <p style={{ marginTop: '0.7rem' }}>{art.summary}</p>
          {art.sections.map((sec) => (
            <div key={sec.title} style={{ marginTop: '0.85rem' }}>
              <p className="hub-eb">{sec.title}</p>
              <p>{sec.body}</p>
            </div>
          ))}
        </article>
      ))}
    </section>
  );
}

export function OffersPanel() {
  const { OFFERS_LEDE, FLAGSHIP_SERVICES, SPRINT_PRODUCTS, PRODUCT_CONSTRAINT, LADDER_EXPANSION } = useHub();
  return (
    <section>
      <Eyebrow>Midnight Magnolia revenue model</Eyebrow>
      <h1 className="hub-title">Services &amp; products</h1>
      <p className="hub-lede">{OFFERS_LEDE}</p>
      <h3 className="hub-h3">Flagship services</h3>
      <table className="hub-tb">
        <thead><tr><th>Service</th><th>Price</th><th>Deliverable</th></tr></thead>
        <tbody>
          {FLAGSHIP_SERVICES.map((s) => (
            <tr key={s.name}><td>{s.name}</td><td>{s.price}</td><td>{s.deliverable}</td></tr>
          ))}
        </tbody>
      </table>
      <h3 className="hub-h3">Product ladder · sprint set</h3>
      <table className="hub-tb">
        <thead><tr><th>Product</th><th>Price</th><th>Leads to</th></tr></thead>
        <tbody>
          {SPRINT_PRODUCTS.map((p) => (
            <tr key={p.name}><td>{p.name}</td><td>{p.price}</td><td>{p.leadsTo}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="muted" style={{ marginTop: '0.8rem' }}>{PRODUCT_CONSTRAINT}</p>
      <h3 className="hub-h3">Ladder expansion · ten additions</h3>
      {LADDER_EXPANSION.note ? <p className="muted">{LADDER_EXPANSION.note}</p> : null}
      {(LADDER_EXPANSION.digital || []).length ? <p><strong>Digital · Gumroad.</strong> {LADDER_EXPANSION.digital.join(' ')}</p> : null}
      {(LADDER_EXPANSION.print || []).length ? <p><strong>Digital + print · Lulu.</strong> {LADDER_EXPANSION.print.join(' ')}</p> : null}
      {(LADDER_EXPANSION.pod || []).length ? <p><strong>Physical · POD.</strong> {LADDER_EXPANSION.pod.join(' ')}</p> : null}
      {LADDER_EXPANSION.sequencing ? <p>{LADDER_EXPANSION.sequencing}</p> : null}
    </section>
  );
}

export function ConvertPanel() {
  const {
    CONVERSION_LEDE, COMPARABLES, FOUR_MOVES, BUYER_FIELDS,
    FUNNEL_FORMULAS, AUTOMATION_FLOWS, AUTOMATION_BUILD_ORDER,
  } = useHub();
  return (
    <section>
      <Eyebrow>Business Agent addendum</Eyebrow>
      <h1 className="hub-title">Conversion &amp; automation</h1>
      <p className="hub-lede">{CONVERSION_LEDE}</p>
      <h3 className="hub-h3">Comparables</h3>
      {COMPARABLES.map((c) => (
        <div key={c.name} style={{ marginBottom: '0.85rem' }}>
          <p className="hub-eb">{c.tier}</p>
          <p><strong>{c.name}.</strong> {c.note}</p>
        </div>
      ))}
      <h3 className="hub-h3">Four moves</h3>
      <ol style={{ paddingLeft: '1.2rem', lineHeight: 1.7 }}>
        {FOUR_MOVES.map((m) => <li key={m}>{m}</li>)}
      </ol>
      <h3 className="hub-h3">Track per buyer</h3>
      <div className="hub-kv">
        {BUYER_FIELDS.map((f) => (
          <span key={f.key} style={{ display: 'contents' }}>
            <span className="hub-kvk">{f.key}</span>
            <span>{f.value}</span>
          </span>
        ))}
      </div>
      <h3 className="hub-h3">The five formulas</h3>
      <table className="hub-tb">
        <thead><tr><th>Metric</th><th>Tells you</th></tr></thead>
        <tbody>
          {FUNNEL_FORMULAS.map((row) => (
            <tr key={row.metric}><td>{row.metric}</td><td>{row.tells}</td></tr>
          ))}
        </tbody>
      </table>
      <h3 className="hub-h3">Automation flows</h3>
      <table className="hub-tb">
        <thead><tr><th>ID</th><th>Flow</th><th>Trigger → action</th><th>System of record</th></tr></thead>
        <tbody>
          {AUTOMATION_FLOWS.map((f) => (
            <tr key={f.id}><td>{f.id}</td><td>{f.name}</td><td>{f.trigger}</td><td>{f.system}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="muted" style={{ marginTop: '0.85rem' }}>{AUTOMATION_BUILD_ORDER}</p>
    </section>
  );
}

export function BuildPanel() {
  const {
    FLAGSHIP_LEDE, FLAGSHIP_PROJECTS, SHARED_PRINCIPLES,
    PORTFOLIO_RULE, ACCURACY_RULE, FLAGSHIP_NEXT_ACTIONS,
  } = useHub();
  return (
    <section>
      <Eyebrow>Proof-of-work · one ecosystem, three privacy boundaries</Eyebrow>
      <h1 className="hub-title">Three flagship builds</h1>
      <p className="hub-lede">{FLAGSHIP_LEDE}</p>
      {FLAGSHIP_PROJECTS.map((p) => (
        <article className="card" key={p.id} style={{ marginBottom: '1rem' }}>
          <p className="hub-eb">Project {p.number}</p>
          <h3 className="hub-h3" style={{ marginTop: 0 }}>{p.title}</h3>
          <p className="muted">{p.subtitle}</p>
          {(p.proof || p.entities || p.first) ? (
            <div className="hub-kv" style={{ marginTop: '0.8rem' }}>
              {p.proof ? <><span className="hub-kvk">Proof</span><span>{p.proof}</span></> : null}
              {p.entities ? <><span className="hub-kvk">Entities</span><span>{p.entities}</span></> : null}
              {p.first ? <><span className="hub-kvk">First</span><span>{p.first}</span></> : null}
            </div>
          ) : null}
        </article>
      ))}
      <h3 className="hub-h3">Shared design principles</h3>
      {SHARED_PRINCIPLES.map((item) => (
        <p key={item} style={{ display: 'grid', gridTemplateColumns: '14px 1fr', gap: 12 }}>
          <span className="hub-dot" />
          <span>{item}</span>
        </p>
      ))}
      <p><strong>The portfolio rule.</strong> {PORTFOLIO_RULE}</p>
      <p><strong>Accuracy rule.</strong> {ACCURACY_RULE}</p>
      <h3 className="hub-h3">Immediate next actions</h3>
      <ol style={{ paddingLeft: '1.2rem', lineHeight: 1.7 }}>
        {FLAGSHIP_NEXT_ACTIONS.map((a) => <li key={a}>{a}</li>)}
      </ol>
    </section>
  );
}

export function RiskPanel() {
  const { RISK_LEDE, RISKS, CONTINGENCY_STEPS, MINIMUM_VIABLE_WEEK, DATED_TRIGGERS } = useHub();
  return (
    <section>
      <Eyebrow>Preventive, not reactive</Eyebrow>
      <h1 className="hub-title">Risk &amp; contingency</h1>
      <p className="hub-lede">{RISK_LEDE}</p>
      <div className="hub-scroll">
        <table className="hub-tb">
          <thead><tr><th>Risk</th><th>Early warning</th><th>Preventive control</th><th>Corrective response</th></tr></thead>
          <tbody>
            {RISKS.map((r) => (
              <tr key={r.risk}><td>{r.risk}</td><td>{r.warning}</td><td>{r.prevent}</td><td>{r.correct}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="hub-h3">Contingency protocol · seven steps</h3>
      {CONTINGENCY_STEPS.map((s) => (
        <p key={s.n}><strong>{s.n}. {s.title}</strong> {s.body}</p>
      ))}
      <h3 className="hub-h3">Minimum viable week</h3>
      <table className="hub-tb">
        <thead><tr><th>Area</th><th>Floor</th></tr></thead>
        <tbody>
          {MINIMUM_VIABLE_WEEK.map((row) => (
            <tr key={row.area}><td>{row.area}</td><td>{row.floor}</td></tr>
          ))}
        </tbody>
      </table>
      <h3 className="hub-h3">Dated triggers</h3>
      <table className="hub-tb">
        <thead><tr><th>If this happens</th><th>Do this</th><th>Decide by</th></tr></thead>
        <tbody>
          {DATED_TRIGGERS.map((t) => (
            <tr key={t.ifThis}><td>{t.ifThis}</td><td>{t.doThis}</td><td>{t.decideBy}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function ReferencePanel() {
  const {
    REFERENCE_LEDE, ACTIVITY_CODES, RESEARCH_LOG_FIELDS, NEGATIVE_SEARCH_RULE,
    GENEALOGY_TIERS, ASSERTION_LAYERS, ETHICS_GATE, REFERENCE_DISCLAIMER,
  } = useHub();
  return (
    <section>
      <Eyebrow>Research operations &amp; ethics</Eyebrow>
      <h1 className="hub-title">Reference</h1>
      <p className="hub-lede">{REFERENCE_LEDE}</p>
      <h3 className="hub-h3">Activity codes</h3>
      <table className="hub-tb">
        <thead><tr><th>Code</th><th>Meaning</th></tr></thead>
        <tbody>
          {ACTIVITY_CODES.map((c) => (
            <tr key={c.code}><td>{c.code}</td><td>{c.meaning}</td></tr>
          ))}
        </tbody>
      </table>
      <h3 className="hub-h3">Research log · required fields</h3>
      <div className="hub-kv">
        {RESEARCH_LOG_FIELDS.map((f) => (
          <span key={f.key} style={{ display: 'contents' }}>
            <span className="hub-kvk">{f.key}</span>
            <span>{f.value}</span>
          </span>
        ))}
      </div>
      <p className="muted">{NEGATIVE_SEARCH_RULE}</p>
      <h3 className="hub-h3">Genealogy service tiers</h3>
      <table className="hub-tb">
        <thead><tr><th>Tier</th><th>Best for</th><th>Deliverables</th></tr></thead>
        <tbody>
          {GENEALOGY_TIERS.map((t) => (
            <tr key={t.name}><td>{t.name}<div className="muted">{t.price}</div></td><td>{t.bestFor}</td><td>{t.deliverables}</td></tr>
          ))}
        </tbody>
      </table>
      <h3 className="hub-h3">Assertion-to-source architecture</h3>
      {ASSERTION_LAYERS.map((l) => (
        <p key={l.layer}><strong>{l.layer}.</strong> {l.detail}</p>
      ))}
      <h3 className="hub-h3">Ethics gate</h3>
      {ETHICS_GATE.map((item) => (
        <p key={item} style={{ display: 'grid', gridTemplateColumns: '14px 1fr', gap: 12 }}>
          <span className="hub-dot" />
          <span>{item}</span>
        </p>
      ))}
      <p className="muted">{REFERENCE_DISCLAIMER}</p>
    </section>
  );
}

function PacketNotice() {
  const { packetAvailable } = useHub();
  if (packetAvailable) return null;
  return (
    <p className="muted" style={{ fontSize: '0.85rem', marginBottom: '1.2rem' }}>
      Full binder copy stays in local Career Command (<code>CareerSystem/Career-command/private/</code>).
      This checkout shows the shell, Airtable jobs, and public portfolio links.
    </p>
  );
}

export function HubSection({ section, ...props }) {
  let body;
  switch (section) {
    case 'timeline': body = <TimelinePanel mlis={props.mlis} />; break;
    case 'apply': body = <ApplyPanel jobs={props.jobs} onCopy={props.onCopy} />; break;
    case 'resume': body = <ResumePanel resumes={props.resumes} onCopy={props.onCopy} />; break;
    case 'cases': body = <CasesPanel />; break;
    case 'artifacts': body = <ArtifactsPanel />; break;
    case 'offers': body = <OffersPanel />; break;
    case 'convert': body = <ConvertPanel />; break;
    case 'build': body = <BuildPanel />; break;
    case 'risk': body = <RiskPanel />; break;
    case 'ref': body = <ReferencePanel />; break;
    default: body = <TodayPanel outcomes={props.outcomes} onOutcome={props.onOutcome} checks={props.checks} onCheck={props.onCheck} />;
  }
  return (
    <>
      <PacketNotice />
      {body}
    </>
  );
}
