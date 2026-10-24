import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const card = read('public/Ololade-Pariola.vcf');
assert.ok(card.endsWith('\r\n'), 'vCard must end with CRLF');
assert.ok(!/(?<!\r)\n|\r(?!\n)/.test(card), 'vCard must use CRLF exclusively');
for (const line of card.split('\r\n')) assert.ok(Buffer.byteLength(line) <= 75, 'vCard physical lines must fit 75 octets');
const unfolded = card.replace(/\r\n[ \t]/g, '');
for (const field of ['BEGIN:VCARD', 'VERSION:3.0', 'N:Pariola;Ololade;;;', 'FN:Pariola Ololade', 'TITLE:Software Engineer & Founder', 'ORG:LOPAM', 'END:VCARD']) {
  assert.ok(unfolded.split('\r\n').includes(field), `Missing contact field: ${field}`);
}
assert.ok(!/^TEL[;:]/m.test(unfolded), 'No public phone number has been approved');
const content = read('src/content/site.ts');
for (const field of ['email', 'github', 'linkedin', 'x']) {
  const value = content.match(new RegExp(`\\b${field}: "([^"]+)"`))?.[1];
  assert.ok(value && unfolded.includes(value), `vCard ${field} must match shared profile`);
}
const html = read('dist/meet/index.html');
for (const expected of [
  '<title>Ololade Pariola — Software Engineer &amp; Founder | LOPAM</title>',
  'rel="canonical" href="https://lopam.pario.la/meet"',
  'property="og:url" content="https://lopam.pario.la/meet"',
  'property="og:image" content="https://lopam.pario.la/meet/og.jpg"',
  'name="twitter:card" content="summary_large_image"',
  'name="twitter:image" content="https://lopam.pario.la/meet/og.jpg"',
]) assert.ok(html.includes(expected), `Initial /meet HTML missing ${expected}`);
assert.ok(read('dist/index.html').includes('rel="canonical" href="https://lopam.pario.la/"'), 'Homepage canonical must remain unchanged');
assert.ok(read('dist/index.html').includes('content="summary"'), 'Homepage card type must remain unchanged');
assert.ok(read('public/sitemap.xml').includes('<loc>https://lopam.pario.la/meet</loc>'));
const { rewrites } = JSON.parse(read('vercel.json'));
assert.equal(rewrites.find(r => r.source === '/meet')?.destination, '/meet/index.html');
assert.equal(rewrites.at(-1).destination, '/index.html', 'Keep portfolio SPA fallback');
for (const asset of ['og.jpg', 'ololade-360.avif', 'ololade-720.avif', 'ololade-360.webp', 'ololade-720.webp']) {
  assert.ok(existsSync(new URL(`../dist/meet/${asset}`, import.meta.url)), `Missing deployed asset: ${asset}`);
}
assert.equal(read('dist/Ololade-Pariola.vcf'), card);
console.log('PASS: vCard fields, CRLF/folding, shared contact parity, built metadata, assets, sitemap, and route rewrites.');
