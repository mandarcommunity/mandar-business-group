/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Prevent Next from climbing out of the web directory
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};
module.exports = nextConfig;
