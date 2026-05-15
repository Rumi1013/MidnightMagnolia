import crypto from 'crypto';

const TOKEN_HEADER = 'x-mm-admin-token';

function configuredToken() {
  return process.env.MM_DASHBOARD_TOKEN || process.env.DASHBOARD_ADMIN_TOKEN || '';
}

function requestToken(req) {
  const headerToken = req.headers[TOKEN_HEADER];
  if (typeof headerToken === 'string' && headerToken.trim()) {
    return headerToken.trim();
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

export function isAdminRequest(req) {
  const expected = configuredToken();
  if (!expected) {
    return process.env.NODE_ENV !== 'production';
  }

  const actual = requestToken(req);
  return Boolean(actual) && constantTimeEqual(actual, expected);
}

export function requireAdmin(req, res) {
  if (isAdminRequest(req)) return true;

  const missingConfig = !configuredToken();
  res.status(missingConfig ? 503 : 401).json({
    error: missingConfig
      ? 'Dashboard admin token is not configured'
      : 'Admin authorization required',
  });
  return false;
}
