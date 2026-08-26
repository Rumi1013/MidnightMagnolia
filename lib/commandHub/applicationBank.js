/** Public-safe application tracks. Résumé body and bullets stay in the local packet. */

export const APPLICATION_BANK_LEDE =
  'Airtable opportunities appear below. Track titles are public; copy-ready bullets load from the local Career Command packet.';

export const APPLICATION_TRACKS = [
  {
    id: 'track-01',
    matchKeys: ['information governance', 'records', 'knowledge management', 'ig', 'digitization'],
    title: 'Track 01 · Information governance · records · knowledge management',
    bullets: [],
  },
  {
    id: 'track-02',
    matchKeys: ['program operations', 'grant', 'compliance', 'operations'],
    title: 'Track 02 · Program operations · grant compliance',
    bullets: [],
  },
  {
    id: 'track-03',
    matchKeys: ['communications', 'executive', 'board', 'comms'],
    title: 'Track 03 · Communications · executive & board support',
    bullets: [],
  },
  {
    id: 'track-04',
    matchKeys: ['public sector', 'government', 'municipal', 'state'],
    title: 'Track 04 · Public sector · government affairs',
    bullets: [],
  },
  {
    id: 'track-05',
    matchKeys: ['technology', 'ai', 'automation', 'workflow', 'sql'],
    title: 'Track 05 · Technology · AI-enabled workflow',
    bullets: [],
  },
];

export const STANDING_INSTRUCTIONS = [];

export const RESUME_HEADER = {
  name: '',
  headline: '',
  location: '',
  phone: '',
  email: '',
  linkedin: '',
};

export const RESUME_SUMMARY = '';

export const RESUME_COMPETENCIES = [];

export const RESUME_EXPERIENCE = [];

export const RESUME_EDUCATION = [];

export const RESUME_LEADERSHIP = '';

export const RESUME_SKILLS = [];

export const COVER_LETTER_SKELETON = {
  greeting: '',
  p1: '',
  p2: '',
  p3: '',
  close: '',
  notes: [],
};

export const CASE_STUDY_SELECTOR = [];

export const PARA_TWO_TEMPLATE =
  'A relevant example is [CASE]. The challenge was [PROBLEM]. I [ACTION]. The result was [VERIFIED OUTCOME], and I can provide [ARTIFACT] as a work sample.';

export function matchJobToTrack(jobTrack, tracks = APPLICATION_TRACKS) {
  const raw = String(jobTrack || '').toLowerCase();
  if (!raw) return null;
  const list = Array.isArray(tracks) && tracks.length ? tracks : APPLICATION_TRACKS;
  return list.find((track) => Array.isArray(track.matchKeys) && track.matchKeys.some((key) => raw.includes(key))) || null;
}
