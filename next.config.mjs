import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const basePath = "http://localhost:3000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  cleanDistDir: true,
  /**
   * Custom Webpack Config
   * https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
   */
  webpack(config, options) {
    const { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack } =
      options;

    // Do not run type checking twice:
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return config;
  },
};

export default nextConfig;
