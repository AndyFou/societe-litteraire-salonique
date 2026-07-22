// Next only rewrites paths inside <Link>/next-image with the configured
// basePath — plain <img src> strings are left alone. On GitHub Pages the site
// lives under /<repo>/, so a root-relative "/covers/38.jpg" would resolve to the
// domain root and 404. Run every root-relative asset path through this.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function asset(path: string) {
  return path.startsWith('/') ? `${basePath}${path}` : path
}
