import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_COOKIE = 'mm_dashboard_admin';
const ADMIN_HEADER = 'x-mm-admin-token';

function configuredToken(): string {
  return process.env.MM_DASHBOARD_TOKEN || process.env.DASHBOARD_ADMIN_TOKEN || '';
}

function requestAdminToken(request: NextRequest): string {
  const header = request.headers.get(ADMIN_HEADER);
  if (header?.trim()) return header.trim();

  const auth = request.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice('Bearer '.length).trim();

  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  if (cookie?.trim()) return cookie.trim();

  return '';
}

function tokensMatch(actual: string, expected: string): boolean {
  if (!actual || !expected || actual.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Pages Router middleware: soft gate for private dashboard APIs in production.
 * `/dashboard` HTML still loads so the unlock form can run; APIs require token.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDashboardPage =
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/') ||
    pathname === '/career-command' ||
    pathname.startsWith('/career-command/');
  const isAdminApi =
    pathname.startsWith('/api/tasks') ||
    pathname.startsWith('/api/genealogy') ||
    pathname.startsWith('/api/notion') ||
    pathname.startsWith('/api/airtable') ||
    pathname.startsWith('/api/wix/data');

  if (isDashboardPage) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  if (!isAdminApi) {
    return NextResponse.next();
  }

  const expected = configuredToken();
  if (!expected) {
    // Match requireAdmin: allow in non-production when token unset
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.next();
    }
    return NextResponse.json(
      { error: 'Dashboard admin token is not configured' },
      { status: 503 },
    );
  }

  const actual = requestAdminToken(request);
  if (!tokensMatch(actual, expected)) {
    return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/career-command',
    '/career-command/:path*',
    '/api/tasks',
    '/api/tasks/:path*',
    '/api/genealogy',
    '/api/genealogy/:path*',
    '/api/notion/:path*',
    '/api/airtable/:path*',
    '/api/wix/data',
    '/api/wix/data/:path*',
  ],
};
