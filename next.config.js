/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets-global.website-files.com"]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://meetmate.bencodes.de/api/:path*"
      }
    ];
  }
};

module.exports = nextConfig;
