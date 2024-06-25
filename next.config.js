/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'server.evinnovationsummit.com' },
    ],
  },
};

module.exports = nextConfig;
