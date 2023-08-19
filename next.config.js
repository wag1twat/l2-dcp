/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  useFileSystemPublicRoutes: true,
  swcMinify: false,
  publicRuntimeConfig: {
    version: process.env.VERSION,
  },
};

module.exports = nextConfig;
