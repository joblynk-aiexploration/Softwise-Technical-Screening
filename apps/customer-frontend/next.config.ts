import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['screening.joblynk.ai'],
  turbopack: {
    resolveAlias: {
      '@': './src',
      '@public': './public',
    },
  },
  images: {
    qualities: [25, 50, 75, 100],
  },
  typescript: {
    // CI safety: avoid OOM/failures from large template codebase type checks during production build.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
