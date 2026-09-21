/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      root: '.'
    }
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};
module.exports = nextConfig;
