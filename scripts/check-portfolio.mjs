import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { portfolioPages, pageHtml } from './portfolio-html.mjs';
const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const { rewrites } = JSON.parse(await read('vercel.json'));
for (const page of await portfolioPages()) {
  const html = await read(`dist${page.path}/index.html`);
  assert.ok(html.includes(`<title>${page.title}</title>`), page.path);
  assert.ok(html.includes(`rel="canonical" href="https://lopam.pario.la${page.path}"`), page.path);
  assert.ok(html.includes(`property="og:url" content="https://lopam.pario.la${page.path}"`), page.path);
  assert.ok(html.includes('type="module"'), 'Static metadata must retain the application entry');
  assert.equal(rewrites.find(rule => rule.source === page.path)?.destination, `${page.path}/index.html`);
  if (page.noindex) assert.ok(html.includes('content="noindex, nofollow"'));
}
assert.ok(pageHtml('<title>old</title><meta name="description" content="old"/>', { title: 'A & B', description: '"quoted" <text>', path: '/test' }).includes('&quot;quoted&quot; &lt;text&gt;'), 'Metadata must be escaped');
console.log('PASS: built portfolio route titles, canonicals, Open Graph URLs, script entries, robots, rewrites, and escaping.');
