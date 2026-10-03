/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'static.wixstatic.com' },
      { protocol: 'https', hostname: 'wixmp-*.wixmp.com' },
    ],
  },
  /**
   * Send apex → www when both hostnames hit this deployment.
   * In your DNS: `www` → CNAME to your host (e.g. Vercel); apex → A/ALIAS per host docs.
   *
   * Important: only one site can use `www.midnight-magnolia.com`. If Wix currently owns
   * that hostname, repoint DNS to this app and move Wix to a subdomain (or retire it).
   */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'midnight-magnolia.com' }],
        destination: 'https://www.midnight-magnolia.com/:path*',
        permanent: true,
      },
      // Legacy Wix paths — keep visitors inside the Next front door
      { source: '/booking-calendar', destination: '/services', permanent: false },
      { source: '/bookings', destination: '/services', permanent: false },
      { source: '/booking', destination: '/services', permanent: false },
      { source: '/post/:slug', destination: '/blog/:slug', permanent: false },
    ];
  },
  /**
   * Wix Headless OAuth returns code/state in the URL hash, so callbacks must
   * hit a browser page. Keep the public paths under /api/auth/* for the
   * documented redirect URI shape, and rewrite them to Pages Router screens.
   */
  async rewrites() {
    return [
      { source: '/api/auth/login', destination: '/auth/login' },
      { source: '/api/auth/callback', destination: '/auth/callback' },
    ];
  },
};

export default nextConfig;
