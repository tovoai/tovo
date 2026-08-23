const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.tovoai.com' },
      { protocol: 'https', hostname: 'tovoai.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/cdn-proxy/:path*',
        destination: 'https://shypmvpylzsfkaqynknk.supabase.co/storage/v1/object/public/post_images/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
