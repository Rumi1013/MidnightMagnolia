/**
 * Canonical service taglines when Wix Bookings returns an empty `tagLine`.
 * Source of truth for copy: data/SERVICE-TAGLINES.md (primary lines).
 */
export const SERVICE_TAGLINE_PRIMARY = {
  'WhollyInspired Publishing Package':
    'Your book, taken seriously — from manuscript to launch.',
  'Free 15-Minute Publishing Consultation':
    'A short, honest conversation about where your book is — and what it needs.',
  'Manuscript Development':
    'Developmental editing for writers who care about the shape, not just the spelling.',
  'KDP Self-Publishing Setup':
    'Your book, live on Amazon — done together, done right the first time.',
  'Book + Journal Bundle Package':
    'Your book and its companion journal — designed as one practice.',
};

export function resolveServiceTagline(serviceName, wixTagLine) {
  const trimmed = (wixTagLine || '').trim();
  if (trimmed) return trimmed;
  return SERVICE_TAGLINE_PRIMARY[serviceName] || '';
}
