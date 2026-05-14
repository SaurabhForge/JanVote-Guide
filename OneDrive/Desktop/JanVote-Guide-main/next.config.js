/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  turbopack: {
    root: path.resolve(__dirname),
  },
};

module.exports = nextConfig;
