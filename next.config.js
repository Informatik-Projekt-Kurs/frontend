/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets-global.website-files.com", "files.readme.io", "github.githubassets.com"]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_DOMAIN}/api/:path*`
      },
      {
        source: "/graphql",
        destination: `${process.env.BACKEND_DOMAIN}/graphql`
      }
    ];
  }
};

module.exports = nextConfig;
