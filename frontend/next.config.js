/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      url: false,
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      http: false,
      https: false,
      assert: false,
      querystring: false,
    }

    return config
  },
}

module.exports = nextConfig
