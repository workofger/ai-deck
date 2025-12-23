/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for SFTP deployment
  output: 'export',
  
  // Base path for deployment at /ia-deck
  basePath: '/ia-deck',
  
  // Asset prefix
  assetPrefix: '/ia-deck',
  
  // Trailing slash for static hosting
  trailingSlash: true,
  
  images: {
    // Use unoptimized images for static export
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
