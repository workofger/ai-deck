/** @type {import('next').NextConfig} */
const nextConfig = {
  // Base path for deployment at /ia-deck
  basePath: '/ia-deck',
  
  // Asset prefix for CDN/subdirectory deployment
  assetPrefix: '/ia-deck',
  
  // Output as standalone for easier deployment
  output: 'standalone',
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  
  // Trailing slash for better compatibility
  trailingSlash: true,
};

module.exports = nextConfig;
