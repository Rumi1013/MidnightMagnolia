/** Public-safe flagship titles from the Verified Three Flagship Projects Build Guide.
 *  Full brief: docs/FLAGSHIP_BUILD_GUIDE.md
 *  Canonical PDF stays outside git (Project Specs). Not live products until built.
 */

export const FLAGSHIP_LEDE =
  'Build for real Midnight Magnolia use first. Portfolio demonstration is the second benefit, never the first reason.';

export const FLAGSHIP_PROJECTS = [
  {
    id: 'institute',
    number: 1,
    title: 'Magnolia Institute Resource Library',
    subtitle: 'Community care & recovery information system',
    proof: 'Searchable database + vetting workflow + operations dashboard',
    entities: 'resource, category, location, eligibility, accessibility, verification, change log, submission',
    first: 'Taxonomy and ERD, then about 20 well-verified seed records, then the public directory and a pending-review form.',
  },
  {
    id: 'roots',
    number: 2,
    title: 'Magnolia Roots Digital Archive',
    subtitle: 'Genealogy, community contribution & research services',
    proof: 'Relational archive + contribution/request forms + research log',
    entities: 'individual, relationship, place, source, assertion, research log, contribution, research request',
    first: 'Public/privacy rules before import. Sanitized starter archive of deceased ancestors only. Do not seed the Obsidian vault from genealogy_people.',
  },
  {
    id: 'press',
    number: 3,
    title: 'Press Event Command',
    subtitle: 'Event, author & audience operations · capstone',
    proof: 'Registration/CRM workflow + automations + event dashboard',
    entities: 'event, contact, registration, tag/segment, speaker, communication, automation run, issue log',
    first: 'One real or demonstration Press event as the pilot. Event, contact, and registration model, then pages and the registration API.',
  },
];

export const SHARED_PRINCIPLES = [
  'Build for real use first. Portfolio demonstration is the second benefit.',
  'One case-study structure everywhere: challenge → role → architecture → build → governance → outcome.',
  'Separate public, internal, and restricted data. Never publish a sensitive record merely because a form was submitted.',
  'Human review at every meaningful approval point: resource verification, genealogy publication, sensitive data movement.',
  'Label reconstructed historical systems honestly. Distinguish original work from the modern implementation.',
  'Expose enough architecture for a recruiter to inspect the work — without exposing private data, credentials, or production secrets.',
];

export const PORTFOLIO_RULE =
  'Every flagship project must carry at least three forms of proof: a working or interactive artifact, visible system architecture and documentation, and sanitized technical evidence — a schema, workflow, research log, sample dataset, or repository.';

export const ACCURACY_RULE =
  'Separate evidence from inference. An assertion links to its source; a conclusion says which sources support it and which contradict it. Living-person data stays private by default.';

export const FLAGSHIP_NEXT_ACTIONS = [
  'Write one project brief for Institute, Roots, and Press using the shared case-study template.',
  'Confirm the production data platform and what existing Midnight Magnolia infrastructure will be reused.',
  'Build the Institute taxonomy and ERD first.',
  'Identify about 20 safe, current resource records for the Institute MVP.',
  'Identify the first deceased/historical genealogy records appropriate for a public archive.',
  'Define one real or demonstration Press event as the Event Command pilot.',
  'Capture proof as the systems are built: screenshots, schemas, tests, and decisions.',
];
