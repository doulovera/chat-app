/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/chat',
      destination: '/',
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
