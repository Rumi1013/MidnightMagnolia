/** Public case titles + portfolio hrefs. Full Hub narratives stay in the local packet. */

export const CASE_STUDIES_LEDE =
  'Eight stories: six verified, two still planned. Public pages are linked. Compact Hub copy loads from the local Career Command packet.';

export const HUB_CASE_STUDIES = [
  {
    id: 'case-1',
    number: 1,
    status: 'verified',
    title: 'Records governance & remote digitization',
    publicHref: '/portfolio/records-digitization',
    challenge: '',
    method: '',
    evidence: '',
    outcome: '',
    useFor: '',
  },
  {
    id: 'case-2',
    number: 2,
    status: 'verified',
    title: 'Statewide documentation & referral platform',
    publicHref: '/portfolio/statewide-documentation',
    challenge: '',
    method: '',
    evidence: '',
    outcome: '',
    useFor: '',
  },
  {
    id: 'case-3',
    number: 3,
    status: 'verified',
    title: 'Community resource database',
    publicHref: '/portfolio/community-resource-database',
    challenge: '',
    method: '',
    evidence: '',
    outcome: '',
    useFor: '',
  },
  {
    id: 'case-4',
    number: 4,
    status: 'verified',
    title: 'Program onboarding & SOP system',
    publicHref: '/portfolio/program-onboarding',
    challenge: '',
    method: '',
    evidence: '',
    outcome: '',
    useFor: '',
  },
  {
    id: 'case-5',
    number: 5,
    status: 'verified',
    title: 'Public engagement & communications governance',
    publicHref: '/portfolio/communications-governance',
    challenge: '',
    method: '',
    evidence: '',
    outcome: '',
    useFor: '',
  },
  {
    id: 'case-6',
    number: 6,
    status: 'verified',
    title: 'Grant compliance & program reporting',
    publicHref: '/portfolio/grant-compliance',
    challenge: '',
    method: '',
    evidence: '',
    outcome: '',
    useFor: '',
  },
  {
    id: 'case-7',
    number: 7,
    status: 'planned',
    title: 'Vincent-Phifer genealogy & digital archive',
    publicHref: '/portfolio',
    challenge: '',
    method: '',
    evidence: '',
    outcome: 'Not yet evidenced. Do not present as completed work.',
    useFor: '',
  },
  {
    id: 'case-8',
    number: 8,
    status: 'planned',
    title: 'Midnight Magnolia three-project ecosystem',
    publicHref: '/portfolio',
    challenge: '',
    method: '',
    evidence: '',
    outcome: 'Not yet evidenced. Do not present as completed work.',
    useFor: '',
  },
];

export const TRUTH_RULE =
  'Completed work and planned proof-of-work must never be blended. The Vincent-Phifer and three-project ecosystem cases are described as planned or in development until the artifacts and evidence actually exist.';

export const CASE_BUILD_ORDER = [
  { n: 1, case: 'Records governance', status: 'Verified', use: 'Applications · digital-organization services' },
  { n: 2, case: 'Onboarding & SOPs', status: 'Verified', use: 'Workflow services · program-ops roles' },
  { n: 3, case: 'Communications governance', status: 'Verified', use: 'Comms roles · client deliverables' },
  { n: 4, case: 'Vincent-Phifer', status: 'Build V1', use: 'Genealogy services · Roots · MLIS evidence' },
  { n: 5, case: 'Magnolia Institute', status: 'Planned', use: 'Directory service · information-system portfolio' },
  { n: 6, case: 'Press Event Command', status: 'Capstone', use: 'Automation · CRM · event-operations portfolio' },
];

export const INTERVIEW_STRUCTURE =
  'The problem was… I was responsible for… I created… The evidence I can show is… The result or value was…';

export const RELEASE_CHECKLIST = [
  'The challenge is one sentence.',
  'My role is explicit.',
  'Trigger, actions, system of record, outputs and failure handling are visible.',
  'At least one artifact can be shown.',
  'No credentials, private customer data, or production secrets appear.',
  'Confidential details are excluded.',
  'Outcome language matches verified records — observed, not promised.',
  'The next action is clear.',
];

export const READING_KEY = [
  { need: 'Records / information governance', start: 'Case 1' },
  { need: 'Knowledge management / public information', start: 'Case 2' },
  { need: 'Resource directory / community database', start: 'Case 3' },
  { need: 'Program operations / onboarding', start: 'Case 4' },
  { need: 'Communications / public engagement', start: 'Case 5' },
  { need: 'Grants / compliance / reporting', start: 'Case 6' },
  { need: 'Genealogy / archives / MLIS', start: 'Case 7' },
  { need: 'Technical systems / automation portfolio', start: 'Case 8' },
];
