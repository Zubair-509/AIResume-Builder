/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self';"
          }
        ]
      }
    ];
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
    serverComponentsExternalPackages: [],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable webpack optimizations for development
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Enable persistent caching for faster rebuilds
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };

      // Optimize module resolution
      config.resolve.symlinks = false;

      // Enable parallel processing
      config.parallelism = require('os').cpus().length;

      // Optimize chunk splitting for development
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },
  // Enable development optimizations
  onDemandEntries: {
    // Keep pages in memory longer
    maxInactiveAge: 60 * 1000 * 60, // 1 hour
    // Compile more pages simultaneously
    pagesBufferLength: 5,
  },
  // Optimize development server
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
};

module.exports = nextConfig;