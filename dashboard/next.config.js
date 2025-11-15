/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable optimizations
  swcMinify: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Compress output
  compress: true,
  
  // Generate ETags
  generateEtags: true,
  
  // React strict mode
  reactStrictMode: true,
  
  // Experimental features
  experimental: {
    // Enable React Server Components
    serverActions: true,
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  },
};

module.exports = nextConfig;
