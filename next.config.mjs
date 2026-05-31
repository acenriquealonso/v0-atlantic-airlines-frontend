/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Important for Vercel: prevent static generation of API routes that need DB
  experimental: {
    isrFlushToDisk: false,
  },
  // Ensure MongoDB driver is treated as external (not bundled)
  serverExternalPackages: ["mongodb"],
}

export default nextConfig
