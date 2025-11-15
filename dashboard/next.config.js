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
  },
  
  // Compress output
  compress: true,
  
  // Generate ETags
  generateEtags: true,
  
  // React strict mode
  reactStrictMode: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  },
};

module.exports = nextConfig;
