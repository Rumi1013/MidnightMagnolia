import crypto from 'crypto';

const SECRET_HEADER = 'x-mm-automation-secret';

function configuredSecret() {
  return process.env.MM_AUTOMATION_WEBHOOK_SECRET || '';
}

function requestSecret(req) {
  const headerSecret = req.headers[SECRET_HEADER];
  if (typeof headerSecret === 'string' && headerSecret.trim()) {
    return headerSecret.trim();
  }

  const auth = req.headers.authorization;
  if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
    return auth.slice('Bearer '.length).trim();
  }

  return '';
}

function constantTimeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function requireAutomationSecret(req, res) {
  const expected = configuredSecret();
  if (!expected) {
    res.status(503).json({ error: 'Automation webhook secret is not configured' });
    return false;
  }

  const actual = requestSecret(req);
  if (actual && constantTimeEqual(actual, expected)) return true;

  res.status(401).json({ error: 'Automation authorization required' });
  return false;
}
