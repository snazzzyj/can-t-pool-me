/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/can-t-pool-me' : '',
  assetPrefix: isProd ? '/can-t-pool-me/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig