const STORAGE_KEY = "career-command-v1";
const SCHEMA_VERSION = 2;
const ATS_METHOD = "keyword-coverage-v1";
const EVIDENCE_TYPES = ["third-party","authored-work-sample","self-reported","operational-artifact"];
const VERIFICATION_STATUSES = ["verified","partial","needs-verification"];
const CONFIDENTIALITY = ["public","excerpt","interview-only"];
const AUTHORSHIP = ["confirmed","pending","shared"];
const GAP_TYPES = ["attendance-reports","award-accounting","usage-adoption","evaluation-testimonial","grades-rubrics","dated-completion"];
const METADATA_KEYS = ["evidenceType","verificationStatus","confidentiality","sourcePath","sourceUrl","sourceDate","authorshipStatus","supportedClaim","supportedMetric","corroborationNeeded","gapTypes","targetRoleLanes","portfolioSuitable","interviewSuitable","resumeSuitable","categories"];

const tabs = [
  ["overview","Overview"],["opportunities","Opportunities"],["assets","Résumés & proof"],["interviews","Interviews"],
  ["relocation","Relocation"],["markets","Markets"],["templates","Templates"],["data","Data & settings"]
];
const statuses = ["Research","Saved","Applied","Recruiter Screen","Hiring Manager","Interviewing","Final Round","Offer","Accepted","Rejected","Withdrawn","Closed"];
let state;
let activeTab = typeof location === "undefined" ? "overview" : location.hash.slice(1) || "overview";
let assetFilters = { lane:"", verification:"", capability:"", use:"" };

const $ = (selector, root=document) => root.querySelector(selector);
const esc = (value="") => String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
const money = value => value ? new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(value) : "—";
const today = () => new Date().toISOString().slice(0,10);
const normalize = value => String(value||"").toLowerCase().replace(/[^a-z0-9]+/g,"").trim();
const splitList = value => String(value||"").split("|").map(x=>x.trim()).filter(Boolean);
const badgeClass = status => status==="verified"?"good":status==="partial"?"warn":"warn";

export function duplicateKey(opp) {
  return normalize(opp.requisitionId) || [opp.company,opp.title,opp.location].map(normalize).join("|");
}
export function transitionScore(opp, profile, market) {
  const salary = Number(opp.salaryMax || opp.salaryMin || 0);
  const annualNeed = ((Number(profile.fixedMonthlyObligations)+Number(profile.monthlyLivingEstimate)+(market?.rentReference||0)+Number(profile.monthlyMarginTarget))*12)/(1-Number(profile.taxRateEstimate||0));
  const salaryScore = salary ? Math.min(100,Math.round((salary/annualNeed)*100)) : 0;
  const support = Math.min(100,Math.round(((Number(opp.relocation||0)+Number(opp.signOn||0))/10000)*100));
  return Math.round((Number(opp.fitScore||0)*.45)+(salaryScore*.45)+(support*.10));
}
export function csvRows(opportunities) {
  const fields = ["id","requisitionId","company","title","lane","location","marketId","workModel","salaryMin","salaryMax","relocation","signOn","fitScore","status","dateFound","dateApplied","resumeId","coverLetter","postingSaved","confirmationNumber","applicationNotes","evidenceIds","nextAction","nextActionDate","url","notes"];
  const quote = value => `"${String(Array.isArray(value)?value.join("|"):(value??"")).replaceAll('"','""')}"`;
  return [fields.map(quote).join(","),...opportunities.map(row=>fields.map(field=>quote(row[field])).join(","))].join("\n");
}

export function normalizeAchievement(record={}) {
  const evidencePath = record.evidencePath || record.sourcePath || "";
  const verificationStatus = VERIFICATION_STATUSES.includes(record.verificationStatus)
    ? record.verificationStatus
    : (record.approved ? "verified" : "needs-verification");
  const confidentiality = CONFIDENTIALITY.includes(record.confidentiality) ? record.confidentiality : "excerpt";
  return {
    id: record.id || "",
    title: record.title || "",
    summary: record.summary || "",
    metrics: record.metrics || "",
    evidencePath,
    approved: Boolean(record.approved),
    categories: Array.isArray(record.categories) ? record.categories : [],
    evidenceType: EVIDENCE_TYPES.includes(record.evidenceType) ? record.evidenceType : (record.approved ? "authored-work-sample" : "self-reported"),
    verificationStatus,
    confidentiality,
    sourcePath: record.sourcePath || evidencePath,
    sourceUrl: record.sourceUrl || "",
    sourceDate: record.sourceDate || "",
    authorshipStatus: AUTHORSHIP.includes(record.authorshipStatus) ? record.authorshipStatus : "pending",
    supportedClaim: record.supportedClaim || record.summary || "",
    supportedMetric: record.supportedMetric || "",
    corroborationNeeded: record.corroborationNeeded || "",
    gapTypes: Array.isArray(record.gapTypes) ? record.gapTypes.filter(g => GAP_TYPES.includes(g)) : [],
    targetRoleLanes: Array.isArray(record.targetRoleLanes) ? record.targetRoleLanes : [],
    portfolioSuitable: record.portfolioSuitable ?? confidentiality === "public",
    interviewSuitable: record.interviewSuitable ?? true,
    resumeSuitable: record.resumeSuitable ?? (verificationStatus === "verified" && confidentiality !== "interview-only")
  };
}

export function normalizeOpportunity(record={}) {
  return {
    resumeId: "",
    coverLetter: "Not started",
    postingSaved: false,
    confirmationNumber: "",
    applicationNotes: "",
    postingText: "",
    requiredKeywords: [],
    preferredKeywords: [],
    evidenceIds: [],
    ...record,
    postingSaved: Boolean(record.postingSaved),
    requiredKeywords: Array.isArray(record.requiredKeywords) ? record.requiredKeywords : splitList(record.requiredKeywords),
    preferredKeywords: Array.isArray(record.preferredKeywords) ? record.preferredKeywords : splitList(record.preferredKeywords),
    evidenceIds: Array.isArray(record.evidenceIds) ? record.evidenceIds : splitList(record.evidenceIds)
  };
}

export function normalizeResume(record={}) {
  return {
    id: record.id || "",
    name: record.name || "",
    version: record.version || "",
    lane: record.lane || "",
    targetTitles: Array.isArray(record.targetTitles) ? record.targetTitles : [],
    keywords: Array.isArray(record.keywords) ? record.keywords : [],
    atsScore: Number(record.atsScore || 0),
    lastUpdated: record.lastUpdated || "",
    status: record.status || "Draft",
    filePath: record.filePath || "",
    notes: record.notes || ""
  };
}

function blank(value) {
  return value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
}

export function mergeAchievementSeed(current=[], seeded=[]) {
  const byId = new Map(current.map(record => [record.id, record]));
  const merged = seeded.map(seed => {
    const existing = byId.get(seed.id);
    if (!existing) return normalizeAchievement(seed);
    const placeholder = /^(Add verified|Link only verified)/.test(existing.metrics || "");
    if (placeholder) return normalizeAchievement({ ...existing, ...seed });
    const filled = { ...seed, ...existing };
    for (const key of METADATA_KEYS) {
      if (blank(existing[key]) && !blank(seed[key])) filled[key] = seed[key];
    }
    if (blank(existing.evidencePath) && seed.evidencePath) filled.evidencePath = seed.evidencePath;
    return normalizeAchievement(filled);
  });
  const seededIds = new Set(seeded.map(record => record.id));
  return merged.concat(current.filter(record => !seededIds.has(record.id)).map(normalizeAchievement));
}

export function migrateState(raw={}, seed={}) {
  const state = {
    schemaVersion: SCHEMA_VERSION,
    updatedAt: raw.updatedAt || seed.updatedAt || new Date().toISOString(),
    profile: { ...(seed.profile || {}), ...(raw.profile || {}) },
    roleLanes: (raw.roleLanes?.length ? raw.roleLanes : seed.roleLanes) || [],
    resumes: (raw.resumes || seed.resumes || []).map(normalizeResume),
    achievements: mergeAchievementSeed(raw.achievements || [], seed.achievements || []),
    markets: raw.markets?.length ? raw.markets : (seed.markets || []),
    opportunities: (raw.opportunities || []).map(normalizeOpportunity),
    interviews: Array.isArray(raw.interviews) ? raw.interviews : (seed.interviews || []),
    weeklySprints: raw.weeklySprints?.length ? raw.weeklySprints : (seed.weeklySprints || []),
    templates: raw.templates?.length ? raw.templates : (seed.templates || []),
    sources: raw.sources?.length ? raw.sources : (seed.sources || []),
    atsAnalyses: Array.isArray(raw.atsAnalyses) ? raw.atsAnalyses : []
  };
  return state;
}

export function filterAchievements(achievements=[], filters={}) {
  return achievements.filter(record => {
    if (filters.lane && !(record.targetRoleLanes || []).includes(filters.lane)) return false;
    if (filters.verification && record.verificationStatus !== filters.verification) return false;
    if (filters.capability) {
      const term = normalize(filters.capability);
      const hay = normalize([record.title, ...(record.categories || []), record.supportedClaim].join(" "));
      if (!hay.includes(term)) return false;
    }
    if (filters.use === "public" && !record.portfolioSuitable && record.confidentiality !== "public") return false;
    if (filters.use === "excerpt" && record.confidentiality !== "excerpt") return false;
    if (filters.use === "interview-only" && record.confidentiality !== "interview-only") return false;
    return true;
  });
}

export function listProofGaps(achievements=[]) {
  return achievements
    .filter(record => record.verificationStatus !== "verified" || (record.gapTypes || []).length || record.corroborationNeeded)
    .map(record => ({
      id: record.id,
      title: record.title,
      verificationStatus: record.verificationStatus,
      supportedMetric: record.supportedMetric,
      corroborationNeeded: record.corroborationNeeded,
      gapTypes: record.gapTypes || [],
      confidentiality: record.confidentiality
    }));
}

export function tokenizeKeywords(list=[]) {
  return [...new Set((Array.isArray(list) ? list : splitList(list)).map(item => String(item).trim()).filter(Boolean))];
}

function splitSectionList(block="") {
  return block
    .split(/\n|;|•|\u2022|\|/)
    .map(line => line.replace(/^[\-\*\d\.\)\s]+/, "").trim())
    .filter(line => line && line.length < 80 && !/^(and|or|the)$/i.test(line));
}

export function extractPostingKeywords(text="") {
  const source = String(text || "");
  if (!source.trim()) return { required: [], preferred: [] };
  const requiredBlock = source.match(/required(?:\s+qualifications)?(?:\s+skills)?\s*[:\-]?\s*([\s\S]*?)(?=preferred|nice\s*to\s*have|responsibilities|about\s+the\s+role|$)/i);
  const preferredBlock = source.match(/(?:preferred|nice\s*to\s*have)(?:\s+qualifications)?(?:\s+skills)?\s*[:\-]?\s*([\s\S]*?)(?=required|responsibilities|about\s+the\s+role|benefits|$)/i);
  let required = requiredBlock ? splitSectionList(requiredBlock[1]) : [];
  let preferred = preferredBlock ? splitSectionList(preferredBlock[1]) : [];
  if (!required.length && !preferred.length) {
    preferred = splitSectionList(source).slice(0, 20);
  }
  return { required: tokenizeKeywords(required), preferred: tokenizeKeywords(preferred) };
}

function corpusHas(corpus, keyword) {
  const needle = normalize(keyword);
  if (!needle || needle.length < 2) return false;
  return corpus.includes(needle);
}

function resumeCorpus(resume={}) {
  return normalize([resume.name, resume.version, resume.notes, ...(resume.keywords || []), ...(resume.targetTitles || [])].join(" "));
}

function evidenceCorpus(record={}) {
  return normalize([record.title, record.summary, record.supportedClaim, record.supportedMetric, record.metrics, ...(record.categories || [])].join(" "));
}

export function detectFormattingRisks(resume={}) {
  const risks = [];
  const notes = String(resume.notes || "").toLowerCase();
  const path = String(resume.filePath || "").toLowerCase();
  if (/\.pdf$/.test(path)) risks.push("PDF may hide selectable text depending on export settings; prefer a clean .docx for ATS parsing when the employer allows it.");
  if (/table|multi-?column|text box|header.?footer graphic|image-based/i.test(notes)) risks.push("Notes mention layout features that often reduce ATS readability.");
  if (!resume.keywords?.length) risks.push("Résumé record has no keyword list; coverage can only use titles and notes until keywords are added.");
  if (!resume.filePath) risks.push("Missing file path makes version control and re-export checks harder.");
  return risks;
}

export function analyzeAts({ resume, opportunity, achievements=[], requiredKeywords, preferredKeywords }) {
  if (!resume || !opportunity) throw new Error("ATS analysis requires one résumé and one opportunity.");
  const extracted = extractPostingKeywords(opportunity.postingText || "");
  const required = tokenizeKeywords(requiredKeywords?.length ? requiredKeywords : (opportunity.requiredKeywords?.length ? opportunity.requiredKeywords : extracted.required));
  const preferred = tokenizeKeywords(preferredKeywords?.length ? preferredKeywords : (opportunity.preferredKeywords?.length ? opportunity.preferredKeywords : extracted.preferred));
  if (!required.length && !preferred.length) {
    throw new Error("Add a saved posting text or required/preferred keywords before scoring. No universal ATS score is invented.");
  }

  const linkedIds = new Set(opportunity.evidenceIds || []);
  const linked = achievements.filter(record => linkedIds.has(record.id));
  const supportPool = linked.length ? linked : achievements.filter(record => record.resumeSuitable || record.verificationStatus === "verified");
  const rCorpus = resumeCorpus(resume);
  const supportTexts = supportPool.map(evidenceCorpus);

  const classify = keywords => {
    const covered = [];
    const missing = [];
    const weaklySupported = [];
    for (const keyword of keywords) {
      const onResume = corpusHas(rCorpus, keyword);
      const verifiedSupport = supportPool.some(record => record.verificationStatus === "verified" && corpusHas(evidenceCorpus(record), keyword));
      const anyEvidence = supportTexts.some(text => corpusHas(text, keyword));
      if (onResume || anyEvidence || verifiedSupport) {
        covered.push(keyword);
        if (!verifiedSupport) weaklySupported.push(keyword);
      } else {
        missing.push(keyword);
      }
    }
    return { covered, missing, weaklySupported };
  };

  const req = classify(required);
  const pref = classify(preferred);
  const requiredCoveragePct = required.length ? Math.round((req.covered.length / required.length) * 100) : null;
  const preferredCoveragePct = preferred.length ? Math.round((pref.covered.length / preferred.length) * 100) : null;
  const formattingRisks = detectFormattingRisks(resume);
  const findings = [
    required.length ? `Required keyword coverage: ${req.covered.length}/${required.length} (${requiredCoveragePct}%).` : "No required keywords supplied.",
    preferred.length ? `Preferred keyword coverage: ${pref.covered.length}/${preferred.length} (${preferredCoveragePct}%).` : "No preferred keywords supplied.",
    req.missing.length ? `Missing required: ${req.missing.join("; ")}.` : "No missing required keywords.",
    [...req.weaklySupported, ...pref.weaklySupported].length ? `Weakly supported (on résumé or evidence without verified corroboration): ${[...new Set([...req.weaklySupported, ...pref.weaklySupported])].join("; ")}.` : "No weakly supported keywords flagged.",
    formattingRisks.length ? `Formatting/readability risks: ${formattingRisks.join(" ")}` : "No formatting risks flagged from résumé metadata."
  ].join(" ");

  return {
    id: `ATS-${Date.now()}`,
    resumeId: resume.id,
    opportunityId: opportunity.id,
    analyzedAt: new Date().toISOString(),
    method: ATS_METHOD,
    requiredKeywords: required,
    preferredKeywords: preferred,
    requiredCovered: req.covered,
    preferredCovered: pref.covered,
    missingRequired: req.missing,
    missingPreferred: pref.missing,
    weaklySupported: [...new Set([...req.weaklySupported, ...pref.weaklySupported])],
    formattingRisks,
    requiredCoveragePct,
    preferredCoveragePct,
    findings
  };
}

export function validateImport(imported) {
  const version = Number(imported?.schemaVersion);
  if (![1, 2].includes(version)) throw new Error("This is not a Career Command v1/v2 backup.");
  const required = ["profile","markets","opportunities","interviews","templates"];
  if (required.some(key => !imported[key])) throw new Error("This is not a Career Command backup.");
  const keys = new Set();
  for (const opportunity of imported.opportunities) {
    const key = duplicateKey(opportunity);
    if (keys.has(key)) throw new Error(`Duplicate opportunity in import: ${opportunity.company} — ${opportunity.title}`);
    keys.add(key);
  }
  return true;
}

async function init() {
  const seed = await fetch("data/career-data.json").then(r => r.json());
  let raw;
  try { raw = JSON.parse(localStorage.getItem(STORAGE_KEY)) || seed; } catch { raw = seed; }
  state = migrateState(raw, seed);
  save();
  renderTabs();
  render();
  $("#export-header").addEventListener("click", exportJson);
}

function save() {
  state.schemaVersion = SCHEMA_VERSION;
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  $("#save-state").textContent = `Saved ${new Date().toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`;
}

function renderTabs() {
  $("#tabs").innerHTML = tabs.map(([id,label])=>`<button class="tab" data-tab="${id}" aria-selected="${id===activeTab}">${label}</button>`).join("");
  $("#tabs").addEventListener("click",event=>{
    const button=event.target.closest("[data-tab]"); if(!button)return;
    activeTab=button.dataset.tab; history.replaceState(null,"",`#${activeTab}`); renderTabs(); render();
  },{once:true});
}

function render() {
  const views={overview:renderOverview,opportunities:renderOpportunities,assets:renderAssets,interviews:renderInterviews,relocation:renderRelocation,markets:renderMarkets,templates:renderTemplates,data:renderData};
  views[activeTab]?.();
}

function page(title,subtitle,body,action="") {
  $("#app").innerHTML=`<section class="page-head"><div><h2>${title}</h2><p>${subtitle}</p></div>${action}</section>${body}`;
}

function renderOverview() {
  const p=state.profile, apps=state.opportunities.filter(o=>o.status==="Applied").length;
  const active=state.opportunities.filter(o=>["Recruiter Screen","Hiring Manager","Interviewing","Final Round"].includes(o.status)).length;
  const offers=state.opportunities.filter(o=>["Offer","Accepted"].includes(o.status)).length;
  const week=state.weeklySprints.at(-1) || {applications:0,networking:0,prepBlocks:0};
  const due=state.opportunities.filter(o=>o.nextActionDate && o.nextActionDate<=today() && !["Rejected","Withdrawn","Closed","Accepted"].includes(o.status));
  const gaps=listProofGaps(state.achievements).length;
  const metrics=[["Salary target",`${money(p.salaryTargetMin)}–${money(p.salaryTargetMax).replace("$","")}`,"Primary comfortable band"],["Fixed monthly floor",money(p.fixedMonthlyObligations),"Mortgage share + car"],["Weekly pace",`${week.applications} / ${p.weeklyApplicationTarget}`,`${p.weeklyApplicationMin}–${p.weeklyApplicationMax} strong applications`],["Proof gaps",`${gaps}`,"Claims still needing corroboration"]];
  page("Overview","The next actions that move the search toward a transition-financing offer.",`
    <div class="grid metrics">${metrics.map(m=>`<article class="card"><div class="metric-label">${m[0]}</div><div class="metric-value">${m[1]}</div><div class="metric-note">${m[2]}</div></article>`).join("")}</div>
    <div class="grid two" style="margin-top:1rem">
      <article class="card"><h3>This week</h3><div class="progress"><span style="width:${Math.min(100,week.applications/p.weeklyApplicationTarget*100)}%"></span></div><p><strong>${week.applications}</strong> applications · <strong>${week.networking}</strong> networking contacts · <strong>${week.prepBlocks}</strong> prep blocks</p><button id="update-week" class="button light">Update weekly count</button></article>
      <article class="card"><h3>Pipeline</h3><p><strong>${state.opportunities.length}</strong> tracked · <strong>${apps}</strong> applied · <strong>${active}</strong> active interviews · <strong>${offers}</strong> offers</p><p class="muted">Keep applying while interviews are underway. One row per requisition. ATS scores are job-specific only.</p></article>
    </div>
    <div class="section-title"><h3>Action center</h3><span class="badge ${due.length?"warn":"good"}">${due.length} due</span></div>
    <div class="table-wrap"><table><thead><tr><th>Company</th><th>Role</th><th>Status</th><th>Next action</th><th>Due</th></tr></thead><tbody>${due.length?due.sort((a,b)=>a.nextActionDate.localeCompare(b.nextActionDate)).map(o=>`<tr><td>${esc(o.company)}</td><td>${esc(o.title)}</td><td><span class="badge">${esc(o.status)}</span></td><td>${esc(o.nextAction)}</td><td>${esc(o.nextActionDate)}</td></tr>`).join(""):`<tr><td colspan="5" class="empty">No overdue or due-today actions.</td></tr>`}</tbody></table></div>`);
  $("#update-week").onclick=showWeekDialog;
}

function showWeekDialog() {
  const week=state.weeklySprints.at(-1); const d=dialog("Update this week",`<form id="week-form" class="form-grid"><label class="field"><span>Week of</span><input name="weekOf" type="date" value="${week.weekOf}" required></label><label class="field"><span>Applications</span><input name="applications" type="number" min="0" value="${week.applications}"></label><label class="field"><span>Networking</span><input name="networking" type="number" min="0" value="${week.networking}"></label><label class="field"><span>Prep blocks</span><input name="prepBlocks" type="number" min="0" value="${week.prepBlocks}"></label><label class="field wide"><span>Notes</span><input name="notes" value="${esc(week.notes)}"></label></form>`,`<button class="button secondary" data-close>Cancel</button><button class="button" form="week-form">Save</button>`);
  $("#week-form",d).onsubmit=e=>{e.preventDefault();Object.assign(week,Object.fromEntries(new FormData(e.target)));["applications","networking","prepBlocks"].forEach(k=>week[k]=Number(week[k]));save();d.close();render();};
}

function renderOpportunities() {
  page("Opportunities","Duplicate-safe tracking: requisition ID first, otherwise company + title + location.",`<div class="toolbar"><label class="field"><span>Search</span><input id="opp-search" placeholder="Company, title, market"></label><label class="field"><span>Status</span><select id="opp-status"><option value="">All statuses</option>${statuses.map(s=>`<option>${s}</option>`).join("")}</select></label></div><div id="opp-table"></div>`,`<button id="add-opp" class="button">Add opportunity</button>`);
  const update=()=>{
    const term=normalize($("#opp-search").value),status=$("#opp-status").value;
    const rows=state.opportunities.filter(o=>(!status||o.status===status)&&(!term||normalize(Object.values(o).join(" ")).includes(term)));
    $("#opp-table").innerHTML=`<div class="table-wrap"><table><thead><tr><th>Company / Role</th><th>Market</th><th>Application package</th><th>Status</th><th>Fit / Transition</th><th>Next action</th><th></th></tr></thead><tbody>${rows.map(o=>{const m=state.markets.find(x=>x.id===o.marketId),score=transitionScore(o,state.profile,m),resume=state.resumes?.find(r=>r.id===o.resumeId),evidenceCount=(o.evidenceIds||[]).length,latest=state.atsAnalyses.filter(a=>a.opportunityId===o.id&&a.resumeId===o.resumeId).at(-1);return `<tr><td><strong>${esc(o.company)}</strong><br>${esc(o.title)}<br><span class="muted">${esc(o.requisitionId||o.id)}</span></td><td>${esc(o.location)}<br><span class="muted">${o.salaryMin||o.salaryMax?`${money(o.salaryMin)}–${money(o.salaryMax).replace("$","")}`:"Salary: verify"}</span></td><td>${resume?esc(`${resume.name} · ${resume.version}`):"Résumé not assigned"}<br><span class="muted">Cover letter: ${esc(o.coverLetter||"Not started")} · Posting ${o.postingSaved?"saved":"not saved"} · Evidence ${evidenceCount}${latest?` · ATS req ${latest.requiredCoveragePct ?? "—"}% / pref ${latest.preferredCoveragePct ?? "—"}%`:""}</span></td><td><span class="badge">${esc(o.status)}</span></td><td>${o.fitScore}% / <strong>${score}%</strong></td><td>${esc(o.nextAction)}<br><span class="muted">${esc(o.nextActionDate)}</span></td><td><button class="button light small" data-edit="${o.id}">Edit</button></td></tr>`}).join("")||`<tr><td colspan="7" class="empty">No matching opportunities.</td></tr>`}</tbody></table></div>`;
    document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>showOpportunityDialog(state.opportunities.find(o=>o.id===b.dataset.edit)));
  };
  $("#opp-search").oninput=update; $("#opp-status").onchange=update; $("#add-opp").onclick=()=>showOpportunityDialog(); update();
}

function showOpportunityDialog(existing) {
  const o=normalizeOpportunity(existing||{id:"",requisitionId:"",company:"",title:"",lane:"business-systems",location:"",marketId:"charlotte",workModel:"Hybrid",salaryMin:0,salaryMax:0,relocation:0,signOn:0,fitScore:70,status:"Research",dateFound:today(),dateApplied:"",nextAction:"",nextActionDate:today(),url:"",notes:""});
  const field=(label,name,type="text",wide=false)=>`<label class="field ${wide?"wide":""}"><span>${label}</span><input name="${name}" type="${type}" value="${esc(o[name])}"></label>`;
  const evidenceChecks=(state.achievements||[]).map(a=>`<label class="check-row"><input type="checkbox" name="evidenceIds" value="${esc(a.id)}" ${(o.evidenceIds||[]).includes(a.id)?"checked":""}><span><strong>${esc(a.id)}</strong> ${esc(a.title)} <span class="muted">(${esc(a.verificationStatus)} · ${esc(a.confidentiality)})</span></span></label>`).join("");
  const d=dialog(existing?"Edit opportunity":"Add opportunity",`<form id="opp-form" class="form-grid">${field("Company *","company")}${field("Job title *","title")}${field("Requisition ID","requisitionId")}${field("Location *","location")}<label class="field"><span>Market</span><select name="marketId">${state.markets.map(m=>`<option value="${m.id}" ${m.id===o.marketId?"selected":""}>${esc(m.name)}</option>`).join("")}</select></label><label class="field"><span>Lane</span><select name="lane">${state.roleLanes.map(l=>`<option value="${l.id}" ${l.id===o.lane?"selected":""}>${esc(l.name)}</option>`).join("")}</select></label><label class="field"><span>Work model</span><select name="workModel">${["Remote","Hybrid","On-site","Flexible","Unknown"].map(x=>`<option ${x===o.workModel?"selected":""}>${x}</option>`).join("")}</select></label>${field("Salary min","salaryMin","number")}${field("Salary max","salaryMax","number")}${field("Relocation support","relocation","number")}${field("Sign-on bonus","signOn","number")}${field("Fit score (0–100)","fitScore","number")}<label class="field"><span>Status</span><select name="status">${statuses.map(x=>`<option ${x===o.status?"selected":""}>${x}</option>`).join("")}</select></label>${field("Date found","dateFound","date")}${field("Date applied","dateApplied","date")}<div class="wide callout"><strong>Application package</strong><br><span class="muted">Track what was submitted; never store passwords, SSNs, demographic disclosures, or background-check data.</span></div><label class="field wide"><span>Résumé version</span><select name="resumeId"><option value="">Not assigned</option>${(state.resumes||[]).map(r=>`<option value="${r.id}" ${r.id===o.resumeId?"selected":""}>${esc(r.name)} · ${esc(r.version)}</option>`).join("")}</select></label><label class="field"><span>Cover letter</span><select name="coverLetter">${["Not started","Not required","Drafting","Ready","Submitted"].map(x=>`<option ${x===o.coverLetter?"selected":""}>${x}</option>`).join("")}</select></label><label class="field"><span><input name="postingSaved" type="checkbox" ${o.postingSaved?"checked":""} style="width:auto"> Posting saved</span></label>${field("Confirmation / reference number","confirmationNumber")}<label class="field wide"><span>Saved job posting text (for job-specific ATS analysis)</span><textarea name="postingText">${esc(o.postingText||"")}</textarea></label><label class="field wide"><span>Required keywords (separate with |)</span><input name="requiredKeywords" value="${esc((o.requiredKeywords||[]).join(" | "))}"></label><label class="field wide"><span>Preferred keywords (separate with |)</span><input name="preferredKeywords" value="${esc((o.preferredKeywords||[]).join(" | "))}"></label><div class="wide"><span class="field-label">Relevant evidence for this package</span><div class="check-list">${evidenceChecks||`<p class="muted">No evidence records yet.</p>`}</div></div>${field("Next action *","nextAction","text",true)}${field("Next action date","nextActionDate","date")}${field("Posting URL","url","url",true)}<label class="field wide"><span>Application answers and tailoring notes (non-sensitive only)</span><textarea name="applicationNotes">${esc(o.applicationNotes||"")}</textarea></label><label class="field wide"><span>General notes</span><textarea name="notes">${esc(o.notes)}</textarea></label><p id="duplicate-warning" class="callout wide" hidden></p></form>`,`<button class="button secondary" data-close>Cancel</button>${existing?`<button class="button danger" id="delete-opp">Delete</button><button class="button light" id="run-ats" type="button">Run ATS analysis</button>`:""}<button class="button" form="opp-form">Save</button>`);
  const collectRecord = fd => {
    const evidenceIds = [...d.querySelectorAll('input[name="evidenceIds"]:checked')].map(input => input.value);
    const record = normalizeOpportunity({
      ...o,
      ...Object.fromEntries(fd),
      postingSaved: fd.has("postingSaved"),
      requiredKeywords: splitList(fd.get("requiredKeywords")),
      preferredKeywords: splitList(fd.get("preferredKeywords")),
      evidenceIds
    });
    ["salaryMin","salaryMax","relocation","signOn","fitScore"].forEach(k => record[k] = Number(record[k] || 0));
    return record;
  };
  $("#opp-form",d).onsubmit=e=>{
    e.preventDefault();
    const record=collectRecord(new FormData(e.target));
    const dupe=state.opportunities.find(x=>x.id!==record.id&&duplicateKey(x)===duplicateKey(record));
    if(dupe){const w=$("#duplicate-warning",d);w.hidden=false;w.textContent=`Duplicate blocked: ${dupe.id} already tracks this requisition or company/title/location.`;return;}
    if(!record.company||!record.title||!record.location||!record.nextAction)return;
    if(!record.id)record.id=`OPP-${String(Math.max(0,...state.opportunities.map(x=>Number(x.id.replace(/\D/g,""))||0))+1).padStart(4,"0")}`;
    const i=state.opportunities.findIndex(x=>x.id===record.id);
    i>=0?state.opportunities.splice(i,1,record):state.opportunities.unshift(record);
    save();d.close();render();
  };
  if(existing){
    $("#delete-opp",d).onclick=()=>{if(confirm(`Delete ${o.id}? Export a backup first if you may need it later.`)){state.opportunities=state.opportunities.filter(x=>x.id!==o.id);state.interviews=state.interviews.filter(x=>x.opportunityId!==o.id);state.atsAnalyses=state.atsAnalyses.filter(x=>x.opportunityId!==o.id);save();d.close();render();}};
    $("#run-ats",d).onclick=()=>{
      try {
        const draft=collectRecord(new FormData($("#opp-form",d)));
        const resume=state.resumes.find(r=>r.id===draft.resumeId);
        if(!resume) throw new Error("Assign a résumé version before running ATS analysis.");
        const analysis=analyzeAts({resume, opportunity:draft, achievements:state.achievements});
        state.atsAnalyses.push(analysis);
        const i=state.opportunities.findIndex(x=>x.id===draft.id);
        if(i>=0) state.opportunities.splice(i,1,draft);
        save();
        alert(`Saved ${analysis.method} for ${resume.id} × ${draft.id}.\nRequired: ${analysis.requiredCoveragePct ?? "—"}%\nPreferred: ${analysis.preferredCoveragePct ?? "—"}%\n\n${analysis.findings}`);
        d.close(); render();
      } catch (error) {
        alert(error.message);
      }
    };
  }
}

function renderAssets() {
  const resumes=state.resumes||[];
  const filtered=filterAchievements(state.achievements||[], assetFilters);
  const gaps=listProofGaps(state.achievements||[]);
  const capabilities=[...new Set((state.achievements||[]).flatMap(a=>a.categories||[]))].sort();
  page("Résumés & proof","Reference the real documents, control versions, and connect verified evidence to applications.",`
    <div class="callout"><strong>Document rule:</strong> Career Command stores metadata and paths. Editable documents remain in the existing résumé and achievement folders. ATS coverage is always job-specific — never a universal résumé grade.</div>
    <div class="section-title"><h3>Résumé library</h3><span class="badge">${resumes.filter(r=>r.status==="Active").length} active</span></div>
    <div class="table-wrap"><table><thead><tr><th>Résumé</th><th>Lane / target titles</th><th>Keywords</th><th>Job-specific ATS</th><th>File reference</th><th></th></tr></thead><tbody>${resumes.map(r=>{const analyses=state.atsAnalyses.filter(a=>a.resumeId===r.id); const latest=analyses.at(-1); return `<tr><td><strong>${esc(r.name)}</strong><br>${esc(r.version)} · <span class="badge">${esc(r.status)}</span><br><span class="muted">Updated ${esc(r.lastUpdated)}</span></td><td>${esc(state.roleLanes.find(l=>l.id===r.lane)?.name||r.lane)}<br><span class="muted">${(r.targetTitles||[]).map(esc).join(" · ")}</span></td><td>${(r.keywords||[]).map(esc).join(" · ")}</td><td>${latest?`Req ${latest.requiredCoveragePct ?? "—"}% / Pref ${latest.preferredCoveragePct ?? "—"}%<br><span class="muted">${esc(latest.opportunityId)} · ${esc(latest.analyzedAt.slice(0,10))} · ${esc(latest.method)}</span>`:"Not scored against a posting"}</td><td><code>${esc(r.filePath)}</code></td><td><button class="button light small" data-resume="${r.id}">Edit</button></td></tr>`;}).join("")}</tbody></table></div>

    <div class="section-title"><div><h3>Job-specific ATS analyses</h3><span class="muted">One résumé × one saved posting. No invented universal score.</span></div></div>
    <div class="table-wrap"><table><thead><tr><th>Date</th><th>Résumé</th><th>Opportunity</th><th>Required</th><th>Preferred</th><th>Gaps / risks</th><th>Method</th></tr></thead><tbody>${(state.atsAnalyses||[]).slice().reverse().map(a=>{const resume=resumes.find(r=>r.id===a.resumeId); const opp=state.opportunities.find(o=>o.id===a.opportunityId); return `<tr><td>${esc(a.analyzedAt.slice(0,10))}</td><td>${esc(resume?`${resume.name} · ${resume.version}`:a.resumeId)}</td><td>${esc(opp?`${opp.company} — ${opp.title}`:a.opportunityId)}</td><td>${a.requiredCoveragePct ?? "—"}%<br><span class="muted">${(a.missingRequired||[]).length} missing</span></td><td>${a.preferredCoveragePct ?? "—"}%<br><span class="muted">${(a.missingPreferred||[]).length} missing</span></td><td><span class="muted">${esc((a.weaklySupported||[]).slice(0,4).join("; ")||"None weak")}</span><br>${(a.formattingRisks||[]).map(risk=>`<span class="badge warn">${esc(risk.slice(0,48))}${risk.length>48?"…":""}</span>`).join(" ")}</td><td>${esc(a.method)}</td></tr>`;}).join("")||`<tr><td colspan="7" class="empty">No job-specific analyses yet. Edit an opportunity, save posting keywords, assign a résumé, then run ATS analysis.</td></tr>`}</tbody></table></div>

    <div class="section-title"><div><h3>Achievement & evidence bank</h3><span class="muted">Career claims are separated into verified evidence, authored work samples, and items that still need corroboration.</span></div><div class="button-row"><a class="button light small" href="/evidence-registry" target="_blank" rel="noopener">Open evidence registry</a><a class="button light small" href="/master-achievement-library">Download Word library</a></div></div>
    <div class="toolbar" id="evidence-filters">
      <label class="field"><span>Role lane</span><select id="filter-lane"><option value="">All lanes</option>${state.roleLanes.map(l=>`<option value="${l.id}" ${assetFilters.lane===l.id?"selected":""}>${esc(l.name)}</option>`).join("")}</select></label>
      <label class="field"><span>Verification</span><select id="filter-verification"><option value="">All statuses</option>${VERIFICATION_STATUSES.map(s=>`<option value="${s}" ${assetFilters.verification===s?"selected":""}>${esc(s)}</option>`).join("")}</select></label>
      <label class="field"><span>Capability</span><select id="filter-capability"><option value="">All capabilities</option>${capabilities.map(c=>`<option value="${esc(c)}" ${assetFilters.capability===c?"selected":""}>${esc(c)}</option>`).join("")}</select></label>
      <label class="field"><span>Public use</span><select id="filter-use"><option value="">All classifications</option><option value="public" ${assetFilters.use==="public"?"selected":""}>Public / portfolio</option><option value="excerpt" ${assetFilters.use==="excerpt"?"selected":""}>Excerpt only</option><option value="interview-only" ${assetFilters.use==="interview-only"?"selected":""}>Interview only</option></select></label>
    </div>
    <div class="grid two">${filtered.map(a=>`<article class="card"><div class="button-row"><span class="badge ${badgeClass(a.verificationStatus)}">${esc(a.verificationStatus)}</span><span class="badge">${esc(a.confidentiality)}</span><span class="badge">${esc(a.evidenceType)}</span></div><h3 style="margin-top:.6rem">${esc(a.title)}</h3><p>${esc(a.summary)}</p><p><strong>Supported claim:</strong> ${esc(a.supportedClaim||"—")}</p><p><strong>Supported metric:</strong> ${esc(a.supportedMetric||"None yet")}</p><p><strong>Corroboration needed:</strong> ${esc(a.corroborationNeeded||"None listed")}</p><p class="muted">${(a.categories||[]).map(esc).join(" · ")} · Lanes: ${(a.targetRoleLanes||[]).map(id=>esc(state.roleLanes.find(l=>l.id===id)?.name||id)).join(" · ")||"—"}</p><p class="muted">Portfolio ${a.portfolioSuitable?"yes":"no"} · Interview ${a.interviewSuitable?"yes":"no"} · Résumé ${a.resumeSuitable?"yes":"no"} · Authorship ${esc(a.authorshipStatus)}${a.sourceDate?` · ${esc(a.sourceDate)}`:""}</p><p><code>${esc(a.sourcePath||a.evidencePath)}</code>${a.sourceUrl?`<br><a href="${esc(a.sourceUrl)}" target="_blank" rel="noopener">Source URL</a>`:""}</p><button class="button light small" data-achievement="${a.id}">Edit</button></article>`).join("")||`<article class="card"><p class="empty">No evidence matches these filters.</p></article>`}</div>

    <div class="section-title"><h3>Proof gaps</h3><span class="badge warn">${gaps.length} open</span></div>
    <div class="table-wrap"><table><thead><tr><th>Claim</th><th>Status</th><th>Supported metric</th><th>Gap types still needed</th><th>Corroboration notes</th></tr></thead><tbody>${gaps.map(g=>`<tr><td><strong>${esc(g.id)}</strong><br>${esc(g.title)}<br><span class="muted">${esc(g.confidentiality)}</span></td><td><span class="badge ${badgeClass(g.verificationStatus)}">${esc(g.verificationStatus)}</span></td><td>${esc(g.supportedMetric||"—")}</td><td>${(g.gapTypes||[]).map(type=>`<span class="badge warn">${esc(type)}</span>`).join(" ")||"—"}</td><td>${esc(g.corroborationNeeded||"—")}</td></tr>`).join("")||`<tr><td colspan="5" class="empty">No open proof gaps.</td></tr>`}</tbody></table></div>`,
    `<button id="add-resume" class="button">Add résumé record</button>`);
  $("#add-resume").onclick=()=>showResumeDialog();
  document.querySelectorAll("[data-resume]").forEach(b=>b.onclick=()=>showResumeDialog(resumes.find(r=>r.id===b.dataset.resume)));
  document.querySelectorAll("[data-achievement]").forEach(b=>b.onclick=()=>showAchievementDialog(state.achievements.find(a=>a.id===b.dataset.achievement)));
  ["lane","verification","capability","use"].forEach(key=>{
    const el=$(`#filter-${key}`);
    if(!el)return;
    el.onchange=()=>{assetFilters[key]=el.value;render();};
  });
}

function showResumeDialog(existing){
  const r=normalizeResume(existing||{id:"",name:"",version:"",lane:"business-systems",targetTitles:[],keywords:[],atsScore:0,lastUpdated:today(),status:"Draft",filePath:"",notes:""});
  const d=dialog(existing?"Edit résumé record":"Add résumé record",`<form id="resume-form" class="form-grid"><label class="field wide"><span>Name</span><input name="name" value="${esc(r.name)}" required></label><label class="field"><span>Version</span><input name="version" value="${esc(r.version)}" required></label><label class="field"><span>Status</span><select name="status">${["Active","Draft","Reference","Archived"].map(x=>`<option ${x===r.status?"selected":""}>${x}</option>`).join("")}</select></label><label class="field"><span>Role lane</span><select name="lane">${state.roleLanes.map(l=>`<option value="${l.id}" ${l.id===r.lane?"selected":""}>${esc(l.name)}</option>`).join("")}</select></label><label class="field"><span>Legacy ATS field (unused for scoring)</span><input name="atsScore" type="number" min="0" max="100" value="${r.atsScore||0}"></label><label class="field"><span>Last updated</span><input name="lastUpdated" type="date" value="${esc(r.lastUpdated)}"></label><label class="field wide"><span>Target titles (separate with |)</span><input name="targetTitles" value="${esc((r.targetTitles||[]).join(" | "))}"></label><label class="field wide"><span>Keywords (separate with |)</span><input name="keywords" value="${esc((r.keywords||[]).join(" | "))}"></label><label class="field wide"><span>File path</span><input name="filePath" value="${esc(r.filePath)}" required></label><label class="field wide"><span>Notes</span><textarea name="notes">${esc(r.notes)}</textarea></label><p class="muted wide">Job-specific ATS analysis lives on the opportunity package. Do not treat the legacy ATS field as a verified score.</p></form>`,`<button class="button secondary" data-close>Cancel</button><button class="button" form="resume-form">Save</button>`);
  $("#resume-form",d).onsubmit=e=>{
    e.preventDefault();
    const fd=new FormData(e.target);
    const record=normalizeResume({
      ...r,
      ...Object.fromEntries(fd),
      atsScore:Number(fd.get("atsScore")||0),
      targetTitles:splitList(fd.get("targetTitles")),
      keywords:splitList(fd.get("keywords"))
    });
    if(!record.id)record.id=`RES-${String(Math.max(0,...state.resumes.map(x=>Number(x.id.replace(/\D/g,""))||0))+1).padStart(3,"0")}`;
    const at=state.resumes.findIndex(x=>x.id===record.id);
    at>=0?state.resumes.splice(at,1,record):state.resumes.push(record);
    save();d.close();render();
  };
}

function showAchievementDialog(a){
  const record=normalizeAchievement(a);
  const d=dialog("Edit achievement evidence",`<form id="achievement-form" class="form-grid">
    <label class="field wide"><span>Title</span><input name="title" value="${esc(record.title)}"></label>
    <label class="field wide"><span>Summary</span><textarea name="summary">${esc(record.summary)}</textarea></label>
    <label class="field wide"><span>Supported claim</span><textarea name="supportedClaim">${esc(record.supportedClaim)}</textarea></label>
    <label class="field wide"><span>Supported metric</span><input name="supportedMetric" value="${esc(record.supportedMetric)}"></label>
    <label class="field wide"><span>Verified metrics notes</span><textarea name="metrics">${esc(record.metrics)}</textarea></label>
    <label class="field"><span>Evidence type</span><select name="evidenceType">${EVIDENCE_TYPES.map(x=>`<option value="${x}" ${x===record.evidenceType?"selected":""}>${x}</option>`).join("")}</select></label>
    <label class="field"><span>Verification status</span><select name="verificationStatus">${VERIFICATION_STATUSES.map(x=>`<option value="${x}" ${x===record.verificationStatus?"selected":""}>${x}</option>`).join("")}</select></label>
    <label class="field"><span>Confidentiality</span><select name="confidentiality">${CONFIDENTIALITY.map(x=>`<option value="${x}" ${x===record.confidentiality?"selected":""}>${x}</option>`).join("")}</select></label>
    <label class="field"><span>Authorship</span><select name="authorshipStatus">${AUTHORSHIP.map(x=>`<option value="${x}" ${x===record.authorshipStatus?"selected":""}>${x}</option>`).join("")}</select></label>
    <label class="field"><span>Source date</span><input name="sourceDate" type="date" value="${esc(record.sourceDate)}"></label>
    <label class="field wide"><span>Source path</span><input name="sourcePath" value="${esc(record.sourcePath||record.evidencePath)}"></label>
    <label class="field wide"><span>Source URL</span><input name="sourceUrl" type="url" value="${esc(record.sourceUrl)}"></label>
    <label class="field wide"><span>Categories (separate with |)</span><input name="categories" value="${esc((record.categories||[]).join(" | "))}"></label>
    <label class="field wide"><span>Target role lanes</span><div class="check-list">${state.roleLanes.map(l=>`<label class="check-row"><input type="checkbox" name="targetRoleLanes" value="${l.id}" ${(record.targetRoleLanes||[]).includes(l.id)?"checked":""}><span>${esc(l.name)}</span></label>`).join("")}</div></label>
    <label class="field wide"><span>Corroboration still needed</span><textarea name="corroborationNeeded">${esc(record.corroborationNeeded)}</textarea></label>
    <label class="field wide"><span>Proof gap types</span><div class="check-list">${GAP_TYPES.map(g=>`<label class="check-row"><input type="checkbox" name="gapTypes" value="${g}" ${(record.gapTypes||[]).includes(g)?"checked":""}><span>${esc(g)}</span></label>`).join("")}</div></label>
    <label class="field"><span><input name="portfolioSuitable" type="checkbox" ${record.portfolioSuitable?"checked":""} style="width:auto"> Portfolio suitable</span></label>
    <label class="field"><span><input name="interviewSuitable" type="checkbox" ${record.interviewSuitable?"checked":""} style="width:auto"> Interview suitable</span></label>
    <label class="field"><span><input name="resumeSuitable" type="checkbox" ${record.resumeSuitable?"checked":""} style="width:auto"> Résumé suitable</span></label>
    <label class="field"><span><input name="approved" type="checkbox" ${record.approved?"checked":""} style="width:auto"> Legacy approved flag</span></label>
  </form>`,`<button class="button secondary" data-close>Cancel</button><button class="button" form="achievement-form">Save</button>`);
  $("#achievement-form",d).onsubmit=e=>{
    e.preventDefault();
    const fd=new FormData(e.target);
    const next=normalizeAchievement({
      ...record,
      ...Object.fromEntries(fd),
      categories: splitList(fd.get("categories")),
      targetRoleLanes: [...d.querySelectorAll('input[name="targetRoleLanes"]:checked')].map(input=>input.value),
      gapTypes: [...d.querySelectorAll('input[name="gapTypes"]:checked')].map(input=>input.value),
      portfolioSuitable: fd.has("portfolioSuitable"),
      interviewSuitable: fd.has("interviewSuitable"),
      resumeSuitable: fd.has("resumeSuitable"),
      approved: fd.has("approved") || fd.get("verificationStatus")==="verified",
      evidencePath: fd.get("sourcePath") || record.evidencePath
    });
    Object.assign(a, next);
    save(); d.close(); render();
  };
}

function renderInterviews() {
  const active=state.interviews.filter(i=>!['Completed','Cancelled'].includes(i.status));
  page("Interview pipeline","Track every conversation, stage, preparation task, and follow-up.",`<div class="grid metrics"><article class="card"><div class="metric-label">Active processes</div><div class="metric-value">${new Set(active.map(i=>i.opportunityId)).size}</div></article><article class="card"><div class="metric-label">Scheduled events</div><div class="metric-value">${active.length}</div></article><article class="card"><div class="metric-label">Thank-yous due</div><div class="metric-value">${state.interviews.filter(i=>i.status==="Completed"&&!i.thankYouSent).length}</div></article><article class="card"><div class="metric-label">Goal</div><div class="metric-value">${state.profile.activeInterviewGoal}</div></article></div><div class="section-title"><h3>Interview events</h3></div><div class="table-wrap"><table><thead><tr><th>Company / Role</th><th>Stage</th><th>When</th><th>Status</th><th>Prep / next step</th><th></th></tr></thead><tbody>${state.interviews.map(i=>{const o=state.opportunities.find(o=>o.id===i.opportunityId);return `<tr><td>${esc(o?.company||"Unlinked")}<br>${esc(o?.title||i.opportunityId)}</td><td>${esc(i.stage)}</td><td>${esc(i.scheduledAt)}</td><td><span class="badge">${esc(i.status)}</span></td><td>${esc(i.nextStep)}</td><td><button class="button light small" data-interview="${i.id}">Edit</button></td></tr>`}).join("")||`<tr><td colspan="6" class="empty">No interviews yet. Add one when a screen is scheduled.</td></tr>`}</tbody></table></div>`,`<button id="add-interview" class="button">Add interview</button>`);
  $("#add-interview").onclick=()=>showInterviewDialog(); document.querySelectorAll("[data-interview]").forEach(b=>b.onclick=()=>showInterviewDialog(state.interviews.find(i=>i.id===b.dataset.interview)));
}

function showInterviewDialog(existing){
  if(!state.opportunities.length)return alert("Add an opportunity first.");
  const i=existing||{id:"",opportunityId:state.opportunities[0].id,stage:"Recruiter Screen",scheduledAt:"",interviewers:"",prepNotes:"",thankYouSent:false,status:"Scheduled",nextStep:"Prepare STAR stories"};
  const d=dialog(existing?"Edit interview":"Add interview",`<form id="interview-form" class="form-grid"><label class="field wide"><span>Opportunity</span><select name="opportunityId">${state.opportunities.map(o=>`<option value="${o.id}" ${o.id===i.opportunityId?"selected":""}>${esc(o.company)} — ${esc(o.title)}</option>`).join("")}</select></label><label class="field"><span>Stage</span><select name="stage">${["Recruiter Screen","Hiring Manager","Panel","Technical / Case","Final Round","Offer Conversation"].map(x=>`<option ${x===i.stage?"selected":""}>${x}</option>`).join("")}</select></label><label class="field"><span>Date and time</span><input name="scheduledAt" type="datetime-local" value="${esc(i.scheduledAt)}"></label><label class="field"><span>Status</span><select name="status">${["Scheduled","Completed","Rescheduled","Cancelled"].map(x=>`<option ${x===i.status?"selected":""}>${x}</option>`).join("")}</select></label><label class="field wide"><span>Interviewers</span><input name="interviewers" value="${esc(i.interviewers)}"></label><label class="field wide"><span>Prep notes</span><textarea name="prepNotes">${esc(i.prepNotes)}</textarea></label><label class="field wide"><span>Next step</span><input name="nextStep" value="${esc(i.nextStep)}"></label><label class="field"><span><input name="thankYouSent" type="checkbox" ${i.thankYouSent?"checked":""} style="width:auto"> Thank-you sent</span></label></form>`,`<button class="button secondary" data-close>Cancel</button><button class="button" form="interview-form">Save</button>`);
  $("#interview-form",d).onsubmit=e=>{e.preventDefault();const fd=new FormData(e.target),record={...i,...Object.fromEntries(fd),thankYouSent:fd.has("thankYouSent")};if(!record.id)record.id=`INT-${String(state.interviews.length+1).padStart(4,"0")}`;const at=state.interviews.findIndex(x=>x.id===record.id);at>=0?state.interviews.splice(at,1,record):state.interviews.unshift(record);const opp=state.opportunities.find(o=>o.id===record.opportunityId);if(opp&&opp.status==="Applied")opp.status="Recruiter Screen";save();d.close();render();};
}

function renderRelocation(){
  const p=state.profile;const candidates=state.opportunities.map(o=>{const market=state.markets.find(m=>m.id===o.marketId);return {o,market,score:transitionScore(o,p,market)};}).filter(x=>x.o.salaryMin||x.o.salaryMax).sort((a,b)=>b.score-a.score);
  const takeHome=salary=>salary*(1-p.taxRateEstimate)/12;
  page("Relocation & offer screen","Test whether an offer funds the transition after obligations, rent, living costs, and margin.",`<div class="callout"><strong>Acceptance test:</strong> estimated take-home must cover ${money(p.fixedMonthlyObligations)} fixed obligations + market rent + ${money(p.monthlyLivingEstimate)} living costs + ${money(p.monthlyMarginTarget)} margin.</div><div class="section-title"><h3>Scored opportunities</h3><span class="muted">45% fit · 45% salary coverage · 10% transition support</span></div><div class="table-wrap"><table><thead><tr><th>Opportunity</th><th>Salary used</th><th>Est. take-home</th><th>Est. monthly remainder</th><th>Transition score</th></tr></thead><tbody>${candidates.map(({o,market,score})=>{const salary=o.salaryMax||o.salaryMin,remainder=takeHome(salary)-p.fixedMonthlyObligations-(market?.rentReference||0)-p.monthlyLivingEstimate;return `<tr><td><strong>${esc(o.company)}</strong><br>${esc(o.title)}<br><span class="muted">${esc(market?.name||o.location)}</span></td><td>${money(salary)}</td><td>${money(takeHome(salary))}</td><td><span class="badge ${remainder>=p.monthlyMarginTarget?"good":"warn"}">${money(remainder)}</span></td><td><strong>${score}%</strong></td></tr>`}).join("")||`<tr><td colspan="5" class="empty">Add salary data to score opportunities.</td></tr>`}</tbody></table></div><p class="muted">Planning estimate only. Taxes, benefits, debt, rent, and household responsibilities must be confirmed before accepting an offer.</p>`);
}

function renderMarkets(){
  page("Target markets","Run the search across markets, then let response rates and real offers guide the location decision.",`<div class="grid three">${state.markets.sort((a,b)=>b.score-a.score).map(m=>`<article class="card market"><div><h4>${esc(m.name)}</h4><span class="badge">${esc(m.priority)}</span><p>${esc(m.salaryTarget)} target · ${money(m.rentReference)} rent reference</p><p class="muted">${m.employers.map(esc).join(" · ")}</p><p><strong>${m.weeklyAllocation}</strong> planned applications/week</p></div><div class="market-score">${m.score}</div></article>`).join("")}</div>`);
}

function renderTemplates(){
  page("Reusable templates","Copy, personalize, and keep the approved version here so the search does not restart from scratch.",`<div class="grid two">${state.templates.map(t=>`<article class="card"><span class="badge">${esc(t.type)}</span><h3 style="margin-top:.6rem">${esc(t.name)}</h3><p class="template-body">${esc(t.body)}</p><button class="button light small" data-copy="${t.id}">Copy</button></article>`).join("")}</div>`);
  document.querySelectorAll("[data-copy]").forEach(b=>b.onclick=async()=>{const t=state.templates.find(x=>x.id===b.dataset.copy);await navigator.clipboard.writeText(t.body);b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1200);});
}

function renderData(){
  const p=state.profile;page("Data & settings","The shipped JSON file is the baseline; browser storage is the working copy; exports are portable backups.",`<div class="grid two"><article class="card"><h3>Import / export</h3><p class="muted">Export before major changes. JSON preserves everything including evidence metadata and ATS analyses; CSV exports the opportunity table.</p><div class="toolbar"><button id="export-json" class="button">Export JSON</button><button id="export-csv" class="button light">Export opportunities CSV</button><label class="button secondary" style="display:inline-block">Import JSON<input id="import-json" type="file" accept="application/json,.json" hidden></label></div></article><article class="card"><h3>Source lineage</h3>${state.sources.map(s=>`<p><strong>${esc(s.name)}</strong><br><span class="muted">${esc(s.role)}</span></p>`).join("")}</article></div><div class="section-title"><h3>Planning assumptions</h3></div><form id="profile-form" class="card form-grid"><label class="field"><span>Salary floor</span><input name="salaryFloor" type="number" value="${p.salaryFloor}"></label><label class="field"><span>Target minimum</span><input name="salaryTargetMin" type="number" value="${p.salaryTargetMin}"></label><label class="field"><span>Target maximum</span><input name="salaryTargetMax" type="number" value="${p.salaryTargetMax}"></label><label class="field"><span>Fixed monthly obligations</span><input name="fixedMonthlyObligations" type="number" step=".01" value="${p.fixedMonthlyObligations}"></label><label class="field"><span>Living-cost estimate</span><input name="monthlyLivingEstimate" type="number" value="${p.monthlyLivingEstimate}"></label><label class="field"><span>Monthly margin target</span><input name="monthlyMarginTarget" type="number" value="${p.monthlyMarginTarget}"></label><label class="field"><span>Estimated tax rate</span><input name="taxRateEstimate" type="number" min="0" max=".6" step=".01" value="${p.taxRateEstimate}"></label><label class="field"><span>Weekly application target</span><input name="weeklyApplicationTarget" type="number" value="${p.weeklyApplicationTarget}"></label><label class="field"><span>Active interview goal</span><input name="activeInterviewGoal" type="number" value="${p.activeInterviewGoal}"></label><div><button class="button">Save settings</button></div></form><div class="section-title"><h3>Reset</h3></div><article class="card danger-zone"><p>Reset removes this browser’s working copy and reloads the shipped baseline. Export first if you need the current data.</p><button id="reset-data" class="button danger">Reset local data</button></article>`);
  $("#export-json").onclick=exportJson;$("#export-csv").onclick=()=>download("career-command-opportunities.csv",csvRows(state.opportunities),"text/csv");$("#import-json").onchange=importJson;$("#profile-form").onsubmit=e=>{e.preventDefault();Object.assign(p,Object.fromEntries(new FormData(e.target)));Object.keys(p).forEach(k=>{if(typeof state.profile[k]==="number")p[k]=Number(p[k]);});save();render();};$("#reset-data").onclick=()=>{if(confirm("Reset the local working copy to the shipped baseline?")){localStorage.removeItem(STORAGE_KEY);location.reload();}};
}

function dialog(title,body,actions){const d=document.createElement("dialog");d.innerHTML=`<div class="dialog-body"><div class="page-head"><div><h2>${title}</h2></div><button class="button light small" data-close aria-label="Close">Close</button></div>${body}<div class="dialog-actions">${actions}</div></div>`;document.body.append(d);d.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>d.close());d.addEventListener("close",()=>d.remove());d.showModal();return d;}
function download(name,content,type){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
function exportJson(){download(`career-command-backup-${today()}.json`,JSON.stringify(state,null,2),"application/json");}
async function importJson(event){
  const file=event.target.files[0]; if(!file)return;
  try {
    const imported=JSON.parse(await file.text());
    validateImport(imported);
    const seed=await fetch("data/career-data.json").then(r=>r.json());
    state=migrateState(imported, seed);
    save(); render(); alert("Import complete. v1 backups are upgraded in place without discarding your rows.");
  } catch(error) {
    alert(`Import failed: ${error.message}`);
  }
  event.target.value="";
}

if (typeof window !== "undefined") init().catch(error=>{$("#app").innerHTML=`<div class="callout"><strong>Could not load Career Command.</strong><br>${esc(error.message)}<br>Start it with <code>npm start</code> instead of opening index.html directly.</div>`;});
