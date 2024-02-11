/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets-global.website-files.com"]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*"
      }
    ];
  }
};

module.exports = nextConfig;
