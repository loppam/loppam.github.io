import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { transformWithEsbuild } from 'vite';

const origin = 'https://lopam.pario.la';
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// Reuse the content source without introducing a second set of project metadata.
export async function portfolioPages() {
  const source = await readFile(new URL('../src/content/site.ts', import.meta.url), 'utf8');
  const { code } = await transformWithEsbuild(source, 'site.ts', { loader: 'ts', format: 'esm' });
  const { cases } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
  return [
    ...cases.map(item => ({ path: `/work/${item.slug}`, title: `${item.title} case study · LOPAM`, description: item.lede })),
    { path: '/writings', title: 'Writing · LOPAM', description: 'Notes on frontend engineering and product implementation by Pariola Ololade.' },
    { path: '/update', title: 'LOPAM Update - Admin', description: 'Local portfolio draft editor.', noindex: true },
  ];
}

export function pageHtml(template, page) {
  const values = { description: page.description, 'og:title': page.title, 'og:description': page.description, 'og:url': origin + page.path, 'twitter:title': page.title, 'twitter:description': page.description, robots: page.noindex ? 'noindex, nofollow' : 'index, follow' };
  return template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?\s*>/, `<link rel="canonical" href="${origin + page.path}" />`)
    .replace(/<meta\s+(?:name|property)="([^"]+)"\s+content="[^"]*"\s*\/?\s*>/g, (tag, key) => values[key] ? tag.replace(/content="[^"]*"/, `content="${escape(values[key])}"`) : tag);
}

export function portfolioHtmlPlugin() {
  return {
    name: 'portfolio-route-html',
    apply: 'build',
    async closeBundle() {
      const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
      for (const page of await portfolioPages()) {
        const directory = new URL(`../dist${page.path}/`, import.meta.url);
        await mkdir(directory, { recursive: true });
        await writeFile(new URL('index.html', directory), pageHtml(template, page));
      }
    },
  };
}
