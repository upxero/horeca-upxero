// craco.config.js
const path = require("path");
require("dotenv").config();

const isDevServer = process.env.NODE_ENV !== "production";

const config = {
  enableHealthCheck: false,   // uitgeschakeld
  enableVisualEdits: false,   // uitgeschakeld
};

// Geen setupDevServer of babelMetadataPlugin
let setupDevServer;
let babelMetadataPlugin;

// Geen health check plugins
let WebpackHealthPlugin;
let setupHealthEndpoints;
let healthPluginInstance;

const webpackConfig = {
  eslint: {
    configure: {
      extends: ["plugin:react-hooks/recommended"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/build/**',
          '**/dist/**',
          '**/coverage/**',
          '**/public/**',
        ],
      };

      // health plugin is uit
      return webpackConfig;
    },
  },
};

// visual edits is uit
// webpackConfig.babel = {...} // niets toevoegen

webpackConfig.devServer = (devServerConfig) => {
  // niks toevoegen
  return devServerConfig;
};

module.exports = webpackConfig;

