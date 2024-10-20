/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
module.exports = {

    webpack: (config) => {
      config.resolve.fallback = { fs: false };
      return config;
    },
    publicRuntimeConfig: {
      treeSitterWasmPath: '/tree-sitter.wasm',
    },
};