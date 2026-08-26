/** Command Hub public shell. Full binder extract is gitignored local-first. */

export const STORAGE_KEY = 'mm-command-hub-v1';

export const HUB_NAV = [
  {
    group: 'Daily',
    items: [
      { id: 'today', label: 'Today' },
      { id: 'timeline', label: 'Timeline & milestones' },
    ],
  },
  {
    group: 'Applying',
    items: [
      { id: 'apply', label: 'Application bank' },
      { id: 'resume', label: 'Résumé & letters' },
      { id: 'cases', label: 'Case studies' },
      { id: 'artifacts', label: 'Portfolio artifacts' },
    ],
  },
  {
    group: 'Selling',
    items: [
      { id: 'offers', label: 'Services & products' },
      { id: 'convert', label: 'Conversion & automation' },
    ],
  },
  {
    group: 'Building',
    items: [{ id: 'build', label: 'Three flagship builds' }],
  },
  {
    group: 'Guardrails',
    items: [
      { id: 'risk', label: 'Risk & contingency' },
      { id: 'ref', label: 'Reference' },
    ],
  },
];

export { SPRINT, GOALS, DEFAULT_OUTCOMES, TIME_BUDGET, TIME_BUDGET_NOTE, WEEK_RHYTHM, TRAFFIC_LIGHT, FIRST_WEEK_CHECKLIST, FRIDAY_QUESTIONS, PRIORITY_ORDER, WEEKLY_QUESTION } from './today';
export { TIMELINE_NOTE, TIMELINE_COLUMNS, WORKSTREAMS, MILESTONES, EDUCATION_SPRINT, TRIDENT_CONTROLS } from './timeline';
export {
  APPLICATION_BANK_LEDE,
  APPLICATION_TRACKS,
  STANDING_INSTRUCTIONS,
  RESUME_HEADER,
  RESUME_SUMMARY,
  RESUME_COMPETENCIES,
  RESUME_EXPERIENCE,
  RESUME_EDUCATION,
  RESUME_LEADERSHIP,
  RESUME_SKILLS,
  COVER_LETTER_SKELETON,
  CASE_STUDY_SELECTOR,
  PARA_TWO_TEMPLATE,
  matchJobToTrack,
} from './applicationBank';
export {
  CASE_STUDIES_LEDE,
  HUB_CASE_STUDIES,
  TRUTH_RULE,
  CASE_BUILD_ORDER,
  INTERVIEW_STRUCTURE,
  RELEASE_CHECKLIST,
  READING_KEY,
} from './caseStudies';
export { ARTIFACTS_LEDE, PORTFOLIO_ARTIFACTS } from './artifacts';
export { OFFERS_LEDE, FLAGSHIP_SERVICES, SPRINT_PRODUCTS, PRODUCT_CONSTRAINT, LADDER_EXPANSION } from './offers';
export {
  CONVERSION_LEDE,
  COMPARABLES,
  FOUR_MOVES,
  BUYER_FIELDS,
  FUNNEL_FORMULAS,
  AUTOMATION_FLOWS,
  AUTOMATION_BUILD_ORDER,
} from './conversion';
export {
  FLAGSHIP_LEDE,
  FLAGSHIP_PROJECTS,
  SHARED_PRINCIPLES,
  PORTFOLIO_RULE,
  ACCURACY_RULE,
  FLAGSHIP_NEXT_ACTIONS,
} from './flagshipBuilds';
export { RISK_LEDE, RISKS, CONTINGENCY_STEPS, MINIMUM_VIABLE_WEEK, DATED_TRIGGERS } from './risk';
export {
  REFERENCE_LEDE,
  ACTIVITY_CODES,
  RESEARCH_LOG_FIELDS,
  NEGATIVE_SEARCH_RULE,
  GENEALOGY_TIERS,
  ASSERTION_LAYERS,
  ETHICS_GATE,
  REFERENCE_DISCLAIMER,
} from './reference';
