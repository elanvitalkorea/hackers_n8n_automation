/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Fast Refresh 비활성화 (개발 환경 디버깅용)
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.next'],
      }
    }
    return config
  },
}

module.exports = nextConfig

