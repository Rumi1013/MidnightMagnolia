// lib/airtable.js
// Airtable client — two bases, all tables addressed by stable ID.
//
// Base 1: Midnight Operations  (AIRTABLE_OPS_BASE_ID     = appj7TCIoDQke9S7d)
// Base 2: Writing / Creative   (AIRTABLE_WRITING_BASE_ID  = appiZEJmrbIH4lVvE)
//
// Family Tree data lives in Supabase only (free-plan row limits).

import Airtable from 'airtable';

// ── Client factory ─────────────────────────────────────────────
const _bases = {};
function base(baseId) {
  if (!baseId) throw new Error('baseId is required');
  if (!_bases[baseId]) {
    const key = process.env.AIRTABLE_API_KEY;
    if (!key) throw new Error('Missing AIRTABLE_API_KEY');
    _bases[baseId] = new Airtable({ apiKey: key }).base(baseId);
  }
  return _bases[baseId];
}

// Shorthand base references (resolved at call time so env is available)
const opsBase     = () => base(process.env.AIRTABLE_OPS_BASE_ID);
const writingBase = () => base(process.env.AIRTABLE_WRITING_BASE_ID);

// ── Table ID constants ─────────────────────────────────────────
// Ops base
const TBL = {
  SOCIAL_LINKS:       () => process.env.AIRTABLE_TBL_SOCIAL_LINKS       || 'tblz5jJ5A02jNiZeT',
  AFFILIATES:         () => process.env.AIRTABLE_TBL_AFFILIATES          || 'tbldPT7csoJ5ArzQ4',
  PRODUCTS:           () => process.env.AIRTABLE_TBL_PRODUCTS            || 'tblA2WPOZgzeGlEji',
  SERVICES:           () => process.env.AIRTABLE_TBL_SERVICES            || null,
  CONTENT:            () => process.env.AIRTABLE_TBL_CONTENT             || 'tblorZTO0swzz3ekS',
  SALES:              () => process.env.AIRTABLE_TBL_SALES               || 'tblNwu5YXc3hCoJgG',
  CONTACTS:           () => process.env.AIRTABLE_TBL_CONTACTS            || 'tblmV8mw0CyojcOHB',
  AFFILIATE_PIPELINE: () => process.env.AIRTABLE_TBL_AFFILIATE_PIPELINE  || 'tblO9ALbn9Un0b6mX',
  PATREON:            () => process.env.AIRTABLE_TBL_PATREON             || 'tblFSz9A3GHlrX2Fc',
  // Writing base
  POSTS:              () => process.env.AIRTABLE_TBL_POSTS               || 'tbl2FEz1L9Jb7Fj74',
  MANUSCRIPTS:        () => process.env.AIRTABLE_TBL_MANUSCRIPTS         || 'tblwuuzXKB0sQ9Z3T',
  MANUSCRIPT_TASKS:   () => process.env.AIRTABLE_TBL_MANUSCRIPT_TASKS    || 'tblwmFyq3sBAIQLop',
  BOOKS:              () => process.env.AIRTABLE_TBL_BOOKS               || 'tblfBJjIOUlPDCz3s',
  RESUMES:            () => process.env.AIRTABLE_TBL_RESUMES             || process.env.AIRTABLE_RESUMESID || 'tblkPLNijXQMQLETB',
  OPPORTUNITIES:      () => process.env.AIRTABLE_TBL_OPPORTUNITIES       || process.env.AIRTABLE_CREATIVE_OPPORTUNITIES || 'tblTh9CIR4mypfBMT',
  INCOME:             () => process.env.AIRTABLE_TBL_INCOME              || 'tblzeepWqmnncq50d',
  /** Optional MLIS programs table (Writing or Career base). Null = not configured. */
  MLIS:               () => process.env.AIRTABLE_TBL_MLIS                || null,
};

// ── Generic helpers ────────────────────────────────────────────
function fetchTable(baseRef, tableId, options = {}) {
  return new Promise((resolve, reject) => {
    const records = [];
    baseRef()(tableId)
      .select({ pageSize: 100, ...options })
      .eachPage(
        (page, next) => { records.push(...page); next(); },
        (err)        => err ? reject(err) : resolve(records),
      );
  });
}

function updateRecord(baseRef, tableId, recordId, fields) {
  return baseRef()(tableId).update(recordId, fields);
}

function airtableString(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function singleSelectFormula(field, value) {
  const v = String(value ?? '').trim();
  return v ? `({${field}} = '${airtableString(v)}')` : '';
}

// ══════════════════════════════════════════════════════════════
// BASE 1 — MIDNIGHT OPERATIONS
// ══════════════════════════════════════════════════════════════

// ── Products ──────────────────────────────────────────────────
export async function getProducts({ liveOnly = false } = {}) {
  const records = await fetchTable(opsBase, TBL.PRODUCTS(), {
    sort:            [{ field: 'Priority', direction: 'asc' }],
    filterByFormula: liveOnly ? "({Live} = 1)" : '',
  });
  return records.map(r => ({
    id:            r.id,
    name:          r.fields['Product Name']        ?? '',
    code:          r.fields['Product Code']        ?? '',
    category:      r.fields['Category']            ?? '',
    price:         r.fields['Price']               ?? 0,
    buildStage:    r.fields['Build Stage']         ?? 'Not Started',
    platform:      r.fields['Platform']            ?? [],
    contentDone:   r.fields['Content Done']        ?? false,
    designDone:    r.fields['Design Done']         ?? false,
    live:          r.fields['Live']                ?? false,
    stanUrl:       r.fields['Stan Store URL']      ?? '',
    priority:      r.fields['Priority']            ?? 'Medium',
    upsellsTo:     r.fields['Upsells To']          ?? '',
    estRevenue:    r.fields['Est Monthly Revenue'] ?? 0,
    unitsMtd:      r.fields['Units Sold MTD']      ?? 0,
    targetAudience:r.fields['Target Audience']     ?? '',
    notes:         r.fields['Notes / Next Action'] ?? '',
  }));
}
export const getProductTracker = getProducts; // legacy alias

// ── Services (Wix Bookings inventory tracker) ─────────────────
// Returns null when AIRTABLE_TBL_SERVICES env var is unset — the dashboard
// uses that signal to show a "Not Connected" hint with import instructions.
export async function getServices({ liveOnly = false } = {}) {
  const tableId = TBL.SERVICES();
  if (!tableId) return null;
  const records = await fetchTable(opsBase, tableId, {
    sort:            [{ field: 'Priority', direction: 'asc' }],
    filterByFormula: liveOnly ? "({Live} = 1)" : '',
  });
  return records.map(r => ({
    id:              r.id,
    name:            r.fields['Service Name']         ?? '',
    tagline:         r.fields['Tagline']              ?? '',
    category:        r.fields['Category']             ?? '',
    price:           r.fields['Price']                ?? '',
    durationMinutes: r.fields['Duration (min)']       ?? null,
    buildStage:      r.fields['Build Stage']          ?? 'Live',
    hasImage:        r.fields['Has Image']            ?? false,
    hasDescription:  r.fields['Has Description']      ?? false,
    hasTagline:      r.fields['Has Tagline']          ?? false,
    live:            r.fields['Live']                 ?? true,
    bookingUrl:      r.fields['Booking URL']          ?? '',
    priority:        r.fields['Priority']             ?? 'Medium',
    notes:           r.fields['Notes / Next Action']  ?? '',
  }));
}

// ── Content Items ─────────────────────────────────────────────
export async function getContentItems({ excludePublished = true } = {}) {
  const records = await fetchTable(opsBase, TBL.CONTENT(), {
    sort: [
      { field: 'Publish Date', direction: 'asc' },
      { field: 'Status',       direction: 'asc' },
    ],
    filterByFormula: excludePublished ? "NOT({Status} = 'Published')" : '',
  });
  return records.map(r => ({
    id:          r.id,
    title:       r.fields['Title']           ?? '',
    contentType: r.fields['Content Type']    ?? '',
    status:      r.fields['Status']          ?? 'Idea',
    publishDate: r.fields['Publish Date']    ?? null,
    platforms:   r.fields['Platform(s)']     ?? [],
    pillar:      r.fields['Content Pillar']  ?? '',
    hook:        r.fields['Hook / Opening Line'] ?? '',
    cta:         r.fields['CTA']             ?? '',
    themeTags:   r.fields['Theme Tag']       ?? [],
    energy:      r.fields['Energy Required'] ?? '',
    copyUrl:     r.fields['Copy URL']        ?? '',
    visualUrl:   r.fields['Visual URL']      ?? '',
  }));
}
export const getContentPipeline = getContentItems; // legacy alias

// ── Sales Log ─────────────────────────────────────────────────
export async function getSalesLog({ month } = {}) {
  const records = await fetchTable(opsBase, TBL.SALES(), {
    sort:            [{ field: 'Sale Date', direction: 'desc' }],
    filterByFormula: singleSelectFormula('Month', month),
  });
  return records.map(r => ({
    id:          r.id,
    saleDate:    r.fields['Sale Date']           ?? null,
    amount:      r.fields['Amount']              ?? 0,
    platform:    r.fields['Platform']            ?? '',
    source:      r.fields['Source']              ?? '',
    month:       r.fields['Month']               ?? '',
    productName: r.fields['Product Name (text)'] ?? '',
    notes:       r.fields['Notes']               ?? '',
  }));
}

// ── Contacts ──────────────────────────────────────────────────
export async function getContacts({ status } = {}) {
  const records = await fetchTable(opsBase, TBL.CONTACTS(), {
    sort:            [{ field: 'Subscribed Date', direction: 'desc' }],
    filterByFormula: singleSelectFormula('Status', status),
  });
  return records.map(r => ({
    id:             r.id,
    email:          r.fields['Email']               ?? '',
    firstName:      r.fields['First Name']          ?? '',
    lastName:       r.fields['Last Name']           ?? '',
    subscribedVia:  r.fields['Subscribed Via']      ?? '',
    subscribedDate: r.fields['Subscribed Date']     ?? null,
    status:         r.fields['Status']              ?? 'Active',
    tags:           r.fields['Tags']                ?? [],
    totalSpent:     r.fields['Total Spent']         ?? 0,
    isBuyer:        r.fields['Buyer']               ?? false,
    isPatreon:      r.fields['Patreon Member']      ?? false,
    isMagnolia:     r.fields['Magnolia Circle (Stan)'] ?? false,
  }));
}

// ── Affiliates (simple list — tbldPT7csoJ5ArzQ4) ─────────────
export async function getAffiliates() {
  const records = await fetchTable(opsBase, TBL.AFFILIATES(), {
    sort: [{ field: 'Tier', direction: 'asc' }],
  });
  return records.map(r => ({
    id:         r.id,
    name:       r.fields['Name']       ?? '',
    tier:       r.fields['Tier']       ?? 2,
    score:      r.fields['Score']      ?? '',
    status:     r.fields['Status']     ?? 'Not Contacted',
    contact:    r.fields['Contact']    ?? '',
    action:     r.fields['Action']     ?? '',
    notes:      r.fields['Notes']      ?? '',
    commission: r.fields['Commission'] ?? '',
    priority:   r.fields['Priority']   ?? 'medium',
  }));
}
export const getAffiliatePartners = getAffiliates; // legacy alias

// ── Affiliate Pipeline (full CRM — tblO9ALbn9Un0b6mX) ─────────
export async function getAffiliatePipeline({ status } = {}) {
  const records = await fetchTable(opsBase, TBL.AFFILIATE_PIPELINE(), {
    sort: [
      { field: 'Tier',      direction: 'asc' },
      { field: 'Fit Score', direction: 'desc' },
    ],
    filterByFormula: singleSelectFormula('Outreach Status', status),
  });
  return records.map(r => ({
    id:             r.id,
    name:           r.fields['Partner Name']         ?? '',
    category:       r.fields['Category']             ?? '',
    tier:           r.fields['Tier']                 ?? 'Tier 2',
    fitScore:       r.fields['Fit Score']            ?? 0,
    status:         r.fields['Outreach Status']      ?? 'Not Started',
    email:          r.fields['Contact Email']        ?? '',
    platformUrl:    r.fields['Platform URL']         ?? '',
    commission:     r.fields['Commission Rate']      ?? 0,
    commissionOwed: r.fields['Commission Owed']      ?? 0,
    revenueGen:     r.fields['Revenue Generated']    ?? 0,
    outreachDate:   r.fields['Outreach Date']        ?? null,
    followUpDate:   r.fields['Follow-up Date']       ?? null,
    emailDraft:     r.fields['Outreach Email Draft'] ?? '',
    audienceSize:   r.fields['Audience Size']        ?? '',
    notes:          r.fields['Notes']                ?? '',
  }));
}

// ── Patreon Members ───────────────────────────────────────────
export async function getPatreonMembers({ status = 'Active' } = {}) {
  const records = await fetchTable(opsBase, TBL.PATREON(), {
    sort:            [{ field: 'Join Date', direction: 'asc' }],
    filterByFormula: singleSelectFormula('Status', status),
  });
  return records.map(r => ({
    id:              r.id,
    name:            r.fields['Member Name']             ?? '',
    tier:            r.fields['Tier']                    ?? '',
    joinDate:        r.fields['Join Date']               ?? null,
    status:          r.fields['Status']                  ?? 'Active',
    monthsActive:    r.fields['Months Active']           ?? 0,
    altarKeeperSlot: r.fields['Altar Keeper Slot']       ?? null,
    lastContentDate: r.fields['Last Content Delivered']  ?? null,
    lastSessionDate: r.fields['Last Session Date']       ?? null,
    nextSessionDue:  r.fields['Next Session Due']        ?? null,
    notes:           r.fields['Notes']                   ?? '',
    platform:        r.fields['Platform']                ?? 'Patreon',
  }));
}

// ── Social Links Registry ─────────────────────────────────────
export async function getSocialLinks({ status } = {}) {
  const records = await fetchTable(opsBase, TBL.SOCIAL_LINKS(), {
    sort:            [{ field: 'Priority', direction: 'asc' }],
    filterByFormula: singleSelectFormula('Status', status),
  });
  return records.map(r => ({
    id:          r.id,
    platform:    r.fields['Platform']                ?? '',
    handle:      r.fields['Handle / Username']       ?? '',
    url:         r.fields['Full URL']                ?? '',
    status:      r.fields['Status']                  ?? 'Planned',
    role:        r.fields['Role in Funnel']          ?? '',
    followers:   r.fields['Followers / Subscribers'] ?? 0,
    linkInBio:   r.fields['Link in Bio Points To']   ?? '',
    photoStatus: r.fields['Profile Photo Status']    ?? 'Not Set',
    priority:    r.fields['Priority']                ?? 'Medium',
    notes:       r.fields['Notes']                   ?? '',
  }));
}

// ══════════════════════════════════════════════════════════════
// BASE 2 — WRITING / CREATIVE
// ══════════════════════════════════════════════════════════════

// ── Posts (blog, Dusk Letters, social) ───────────────────────
export async function getPosts({ status, type } = {}) {
  const filters = [];
  if (status) filters.push(singleSelectFormula('Status', status));
  if (type)   filters.push(singleSelectFormula('Type', type));
  const formula = filters.length > 1 ? `AND(${filters.join(',')})` : filters[0] ?? '';

  const records = await fetchTable(writingBase, TBL.POSTS(), {
    sort:            [{ field: 'Publish Date', direction: 'desc' }],
    filterByFormula: formula,
  });
  return records.map(r => ({
    id:          r.id,
    title:       r.fields['Title']        ?? '',
    type:        r.fields['Type']         ?? '',
    status:      r.fields['Status']       ?? 'Draft',
    publishDate: r.fields['Publish Date'] ?? null,
    platform:    r.fields['Platform']     ?? [],
    wordCount:   r.fields['Word Count']   ?? 0,
    url:         r.fields['URL']          ?? '',
    notes:       r.fields['Notes']        ?? '',
  }));
}

// ── Manuscripts ───────────────────────────────────────────────
export async function getManuscripts() {
  const records = await fetchTable(writingBase, TBL.MANUSCRIPTS(), {
    sort: [{ field: 'Priority', direction: 'asc' }],
  });
  return records.map(r => ({
    id:          r.id,
    title:       r.fields['Title']          ?? '',
    genre:       r.fields['Genre']          ?? '',
    wordCount:   r.fields['Word Count']     ?? 0,
    wordGoal:    r.fields['Word Goal']      ?? 0,
    status:      r.fields['Status']         ?? 'Drafting',
    priority:    r.fields['Priority']       ?? 'Medium',
    targetPub:   r.fields['Target Publication'] ?? '',
    dueDate:     r.fields['Due Date']       ?? null,
    notes:       r.fields['Notes']          ?? '',
  }));
}

// ── Manuscript Tasks ──────────────────────────────────────────
export async function getManuscriptTasks({ manuscriptId } = {}) {
  const records = await fetchTable(writingBase, TBL.MANUSCRIPT_TASKS(), {
    sort:            [{ field: 'Due Date', direction: 'asc' }],
    filterByFormula: manuscriptId ? singleSelectFormula('Manuscript', manuscriptId) : "NOT({Done} = 1)",
  });
  return records.map(r => ({
    id:     r.id,
    task:   r.fields['Task']   ?? '',
    done:   r.fields['Done']   ?? false,
    dueDate:r.fields['Due Date'] ?? null,
    notes:  r.fields['Notes']  ?? '',
  }));
}

// ── Books (KDP / published) ───────────────────────────────────
export async function getBooks() {
  const records = await fetchTable(writingBase, TBL.BOOKS(), {
    sort: [{ field: 'Published Date', direction: 'desc' }],
  });
  return records.map(r => ({
    id:            r.id,
    title:         r.fields['Title']          ?? '',
    author:        r.fields['Author']         ?? '',
    isbn:          r.fields['ISBN']           ?? '',
    platform:      r.fields['Platform']       ?? '',
    status:        r.fields['Status']         ?? '',
    publishedDate: r.fields['Published Date'] ?? null,
    price:         r.fields['Price']          ?? 0,
    royaltyMtd:    r.fields['Royalty MTD']    ?? 0,
    kdpUrl:        r.fields['KDP URL']        ?? '',
    notes:         r.fields['Notes']          ?? '',
  }));
}

// ── Resumes ───────────────────────────────────────────────────
export async function getResumes() {
  const records = await fetchTable(writingBase, TBL.RESUMES(), {
    sort:            [{ field: 'Track', direction: 'asc' }],
    filterByFormula: "({Status} = 'Active')",
  });
  return records.map(r => ({
    id:              r.id,
    versionName:     r.fields['Version Name']        ?? '',
    track:           r.fields['Track']               ?? '',
    versionNumber:   r.fields['Version Number']      ?? '',
    targetRole:      r.fields['Target Role Type']    ?? '',
    differentiators: r.fields['Key Differentiators'] ?? '',
    fileUrl:         r.fields['File URL']            ?? '',
    status:          r.fields['Status']              ?? 'Active',
    notes:           r.fields['Notes']               ?? '',
  }));
}
export const getResumeVault = getResumes; // alias

// ── Creative Opportunities (jobs, residencies, fellowships) ───
export async function getOpportunities({ status, track } = {}) {
  const filters = [];
  if (status) filters.push(singleSelectFormula('Status', status));
  if (track)  filters.push(singleSelectFormula('Track', track));
  const formula = filters.length > 1 ? `AND(${filters.join(',')})` : filters[0] ?? '';

  const records = await fetchTable(writingBase, TBL.OPPORTUNITIES(), {
    sort:            [{ field: 'Applied Date', direction: 'desc' }],
    filterByFormula: formula,
  });
  return records.map(r => ({
    id:            r.id,
    roleTitle:     r.fields['Role Title']          ?? '',
    company:       r.fields['Company']             ?? r.fields['Organization'] ?? '',
    track:         r.fields['Track']               ?? '',
    salaryMin:     r.fields['Salary Min']          ?? 0,
    salaryMax:     r.fields['Salary Max']          ?? 0,
    remote:        r.fields['Remote']              ?? false,
    location:      r.fields['Location']            ?? '',
    status:        r.fields['Status']              ?? 'Researching',
    appliedDate:   r.fields['Applied Date']        ?? null,
    deadline:      r.fields['Deadline']            ?? null,
    resumeVersion: r.fields['Resume Version']      ?? '',
    jobUrl:        r.fields['Job Posting URL']     ?? r.fields['URL'] ?? '',
    matchScore:    r.fields['Match Score']         ?? 0,
    followUpDate:  r.fields['Follow-up Date']      ?? null,
    notes:         r.fields['Notes']               ?? '',
  }));
}
export const getJobApplications = getOpportunities; // alias

// ── MLIS programs (optional table) ────────────────────────────
export async function getMlisPrograms() {
  const tableId = TBL.MLIS();
  if (!tableId) return null;
  const baseId = process.env.AIRTABLE_CAREER_BASE_ID || process.env.AIRTABLE_WRITING_BASE_ID;
  if (!baseId) return null;
  const records = await fetchTable(() => base(baseId), tableId, {
    sort: [{ field: 'Priority', direction: 'asc' }],
  });
  return records.map((r) => ({
    id:            r.id,
    programName:   r.fields['Program Name'] ?? r.fields['Name'] ?? '',
    institution:   r.fields['Institution'] ?? r.fields['School'] ?? '',
    priority:      r.fields['Priority'] ?? '',
    alaAccredited: Boolean(r.fields['ALA Accredited'] ?? r.fields['ALA']),
    hbcu:          Boolean(r.fields['HBCU']),
    inStateTuition: Boolean(r.fields['In-State'] ?? r.fields['In-State Tuition']),
    format:        r.fields['Format'] ?? '',
    notes:         r.fields['Notes'] ?? '',
  }));
}

// ── Income Tracking ───────────────────────────────────────────
export async function getIncomeTracking({ limit = 12 } = {}) {
  const records = await fetchTable(writingBase, TBL.INCOME(), {
    sort:     [{ field: 'Month', direction: 'desc' }],
    pageSize: Math.min(limit, 100),
  });
  return records.map(r => ({
    id:             r.id,
    month:          r.fields['Month']                  ?? '',
    stanRevenue:    r.fields['Stan Store Revenue']     ?? 0,
    bmacRevenue:
      r.fields['BMAC Revenue'] ??
      r.fields['Buy Me a Coffee Revenue'] ??
      r.fields['BMAC'] ??
      0,
    patreonRevenue: r.fields['Patreon Revenue']        ?? 0,
    gumroadRevenue: r.fields['Gumroad Revenue']        ?? 0,
    kdpRoyalties:   r.fields['KDP Royalties']          ?? 0,
    otherRevenue:   r.fields['Other Revenue']          ?? 0,
    totalRevenue:   r.fields['Total Revenue']          ?? 0,
    newSubscribers: r.fields['New Subscribers']        ?? 0,
    goalGap:        r.fields['Gap to Goal']            ?? 0,
    pctOfGoal:      r.fields['% of Goal']              ?? 0,
    topProduct:     r.fields['Top Performing Product'] ?? '',
    reflection:     r.fields['Reflection']             ?? '',
  }));
}
export const getMonthlyRevenue = getIncomeTracking; // alias

// ══════════════════════════════════════════════════════════════
// UPDATE HELPERS
// ══════════════════════════════════════════════════════════════
export const updateAffiliate      = (id, f) => updateRecord(opsBase,     TBL.AFFILIATES(),         id, f);
export const updateAffiliatePipe  = (id, f) => updateRecord(opsBase,     TBL.AFFILIATE_PIPELINE(), id, f);
export const updateContentItem    = (id, f) => updateRecord(opsBase,     TBL.CONTENT(),            id, f);
export const updateProduct        = (id, f) => updateRecord(opsBase,     TBL.PRODUCTS(),           id, f);
export const updateService        = (id, f) => {
  const tableId = TBL.SERVICES();
  if (!tableId) throw new Error('AIRTABLE_TBL_SERVICES not configured');
  return updateRecord(opsBase, tableId, id, f);
};
export const updateOpportunity    = (id, f) => updateRecord(writingBase, TBL.OPPORTUNITIES(),      id, f);
export const updateResume         = (id, f) => updateRecord(writingBase, TBL.RESUMES(),            id, f);
export const updateManuscriptTask = (id, f) => updateRecord(writingBase, TBL.MANUSCRIPT_TASKS(),   id, f);
