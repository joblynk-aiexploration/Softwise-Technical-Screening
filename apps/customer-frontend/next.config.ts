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
};

export default nextConfig;
