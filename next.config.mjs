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
    ];
  },
};

export default nextConfig;
