/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["./src/scripts/tableau.embedding.3.latest.js"],
  experimental: {
    urlImports: ["https://public.tableau.com"],
  },
};

module.exports = nextConfig;
