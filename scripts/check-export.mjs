// Post-build guard: crawl the exported HTML in out/ and confirm every internal
// link and asset actually resolves — so a "works locally, 404s live" mistake
// (usually a root-relative path that skipped lib/asset.ts under the Pages
// subpath) fails the build instead of deploying broken.
//
// Run after `next build` (output: 'export'). Reads NEXT_PUBLIC_BASE_PATH to know
// which paths are "internal" and how they should be prefixed.

import { readdir, readFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'

const OUT = 'out'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else out.push(p)
  }
  return out
}

async function exists(p) {
  try {
    await stat(p)
    return true
  } catch {
    return false
  }
}

const htmlFiles = (await walk(OUT)).filter((f) => f.endsWith('.html'))
const problems = []
let checked = 0

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  const urls = new Set()
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) urls.add(m[1])

  for (let url of urls) {
    // Skip anything not a same-site navigational/asset path.
    if (/^(https?:)?\/\//.test(url)) continue
    if (url.startsWith('data:') || url.startsWith('mailto:') || url.startsWith('#') || url === '')
      continue
    url = url.split('#')[0].split('?')[0]
    if (!url.startsWith('/')) continue // relative — none expected, skip

    checked++

    // Under a base path, every internal path must carry it. A bare "/covers/x"
    // is the exact bug this guard exists to catch.
    if (basePath && url !== basePath && !url.startsWith(basePath + '/')) {
      problems.push(`${file}\n    not prefixed with base path "${basePath}": ${url}`)
      continue
    }

    const relPath = (basePath ? url.slice(basePath.length) : url).replace(/^\//, '')

    if (extname(relPath)) {
      if (!(await exists(join(OUT, relPath)))) problems.push(`${file}\n    missing asset: ${url}`)
    } else {
      const asFile = join(OUT, relPath ? `${relPath}.html` : 'index.html')
      const asDir = join(OUT, relPath, 'index.html')
      if (!(await exists(asFile)) && !(await exists(asDir)))
        problems.push(`${file}\n    missing route: ${url}`)
    }
  }
}

if (problems.length) {
  console.error(`\n✗ Export check FAILED — ${problems.length} broken reference(s):\n`)
  for (const p of problems) console.error('  • ' + p)
  console.error('\nThe deploy is blocked; the currently-live site stays up.\n')
  process.exit(1)
}

console.log(
  `✓ Export check passed — ${checked} internal links/assets across ${htmlFiles.length} pages all resolve.`,
)
