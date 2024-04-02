/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets-global.website-files.com"]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_DOMAIN}/api/:path*`
      }
    ];
  }
};

module.exports = nextConfig;
