// The base path is empty for local dev and Vercel, and set to the repo name by
// the GitHub Pages workflow (which serves the site under /<repo>/). Everything
// that references a root-relative asset runs it through lib/asset.ts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a plain folder of static HTML (out/) so it can be served by GitHub Pages.
  output: 'export',
  basePath: basePath || undefined,
  // No Next image optimization server exists on Pages; we use plain <img> anyway.
  images: { unoptimized: true },
}

export default nextConfig
