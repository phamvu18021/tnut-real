/** @type {import('next').NextConfig} */
const TerserPlugin = require("terser-webpack-plugin");

const nextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Loại bỏ console.log
              drop_debugger: true // Loại bỏ debugger
            },
            format: {
              comments: false // Loại bỏ comment
            }
          },
          extractComments: false // Không tạo file riêng cho comment
        })
      );
    }
    return config;
  },
  swcMinify: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["nologin.tnut.vn", "10.10.51.16"] // Add the domains you want to allow here
  }
};

module.exports = nextConfig;
