/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Brand artwork is shipped as static files in /public. The on-demand
    // image optimizer is unavailable in some hosting/preview environments,
    // so serve these assets directly to guarantee they always render.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'static.wixstatic.com' },
      { protocol: 'https', hostname: 'wixmp-*.wixmp.com' },
    ],
  },
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
