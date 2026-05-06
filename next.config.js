/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'maps.googleapis.com'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
